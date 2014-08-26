/*
 * SERVER mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , parseIntArray = Abaco.parseIntArray
        , Bolgia = require( 'bolgia' )
        , doString = Bolgia.doString
        , reveal = Bolgia.reveal
        , ooo = Bolgia.circles
        , ostr = ooo.str
        , isArray = Array.isArray
        /*
         * Utility function to parse CLIENT LIST result,
         * Redis reply to CLIENT LIST command, is a unique string
         * formatted as follows:
         * - one client connection per line (separated by LF)
         * - each line is composed of a succession of property=value 
         *   fields separated by a space character.
         */
        , parseClientList =  function ( data ) {
            var rows = String( data ).split( '\n' )
                , i = 0
                , row = rows[ 0 ]
                , rlen = rows.length
                , fields = null
                , f = 0
                , flen = 0
                , entry = null
                , k = null
                , v = null
                , client = {}
                , clist = []
                ;

            for ( ; i < rlen - 1; row = rows[ ++i ], f = 0, client = {} ) {
                fields = row.split( ' ' );
                flen = fields.length;
                for ( ; f < flen; ) {
                    entry = fields[ f++ ].split( '=' );
                    k = entry[ 0 ];
                    v = entry[ 1 ];
                    // check for empty string '' values
                    if ( v === '' ) {
                        client[ k ] = '';
                        continue;
                    }
                    // convert Strings representing numbers to Numbers.
                    client[ k ] = ( doString( + v ) === ooo.num ) ? + v : v;
                }
                clist.push( client );
            }
            return clist;
        }
         /*
          * Utility fn to parse INFO reply into an obj/hash.
          * Reply to INFO command is a collection of text lines. Lines contains
          * a section name (starting with a # character) or a property.
          * All the properties are in the form of "field:value\r\n".
          * See http://redis.io/commands/info.
          */
        , parseRedisInfo = function ( data ) {
            var str = String( data )
                // skip first 2 bytes : '# '
                , sections = str.slice( 2, str.length ).split( '\r\n# ' )
                , slen = sections.length
                , section = null
                , line = null
                , s = 0
                , p = 1
                , props = {}
                , entry =null
                , k = null
                , v = null
                , info = {}
                ;

            for ( ; s < slen; p = 1, props = {} ) {
                section = sections[ s++ ].split( '\r\n' );
                info[ section[ 0 ] ] = props;
                // skip last empty result, ''
                for ( ; p < section.length - 1; ) {
                    line = section[ p++ ];
                    entry = line.split( ':' );
                    k = entry[ 0 ];
                    v = entry[ 1 ];
                    if ( v === '' ) {
                        props[ k ] = '';
                        continue;
                    }
                    // convert Strings representing numbers to Numbers.
                    props[ k ] = isNaN( + v ) ? v : + v;
                }
            }
            return info;
        }
        // debug object reply, simple string reply, one line
        , parseDebugObject = function ( data ) {
            var str = String( data )
                // ignore first element, 'Value'
                , line = str.split( ' ' ).slice( 1 )
                , llen = line.length
                , l = 0
                , entry = null
                , k = null
                , v = null
                , dbg = {}
                ;

            for ( ; l < llen; ++l ) {
                entry = line[ l ].split( ':' );
                k = entry[ 0 ];
                v = entry[ 1 ];
                if ( v === '' ) {
                    dbg[ k ] = '';
                    continue;
                }
                // convert Strings that representing numbers to Numbers.
                dbg[ k ] = isNaN( + v ) ? v : + v;
            }
            return dbg;
        }
        // CONFIG GET reply is a list of field/value pairs
        , parseConfigGet = function ( arr ) {
            var a = isArray( arr ) ? arr : []
                , alen = a.length
                , i = 0
                , k = null
                , v = null
                , entries = {}
                ;
            // convert Strings to Numbers and Booleans.
            for ( ; i < alen; ) {
                k = String( a[ i++ ] );
                v = a[ i++ ];
                switch ( v ) {
                    case '':
                        entries[ k ] = '';
                    break;
                    case 'yes':
                        entries[ k ] = true;
                    break;
                    case 'no':
                        entries[ k ] = false;
                    break;
                    default:
                        entries[ k ] = isNaN( + v ) ? v : + v;
                    break;
                }
            }
            return entries;
        }
        /*
         * ROLE reply:
         *
         * for MASTER:   [ 'master', 155, [ [ '127.0.0.1', 6380, 155 ], [ '127.0.0.1', 6381, 155 ] ] ] ]
         * for SLAVE:    [ 'slave','127.0.0.1', 6379,'connected', 379 ] ]
         * for SENTINEL: [ sentinel, [ 'master_name_1', ,,,, 'master_name_N' ] ]
         *
         */
        , parseRoleReply = function ( arr ) {
            var a = isArray( arr ) ? arr : []
                , alen = a.length
                , type = null
                ;
            if ( ! alen ) return;
            reveal( a );
            type = a[ 0 ];
            switch ( type ) {
                case 'master':
                    return {
                        type : type
                        , replica_offset :  a[ 1 ]
                        , connected_slaves : a[ 2 ]
                    };
                case 'slave':
                    return {
                        type : type
                        , master_ip : a[ 1 ]
                        , master_port : a[ 2 ]
                        , replica_status :  a[ 3 ]
                        , replica_offset : a[ 4 ]
                    };
                case 'sentinel':
                    return {
                        type : type
                        , master_names : a[ 1 ]
                    };
            }
        }
        ;

    return {

        bgrewriteaof : function ( cback ) {
            return encode( 'BGREWRITEAOF', null, cback );
        }

        , bgsave : function ( cback ) {
            return encode( 'BGSAVE', null, cback );
        }

        , client : {

            getname : function ( cback ) {
                return encode( 'CLIENT', 'GETNAME', null, cback );
            }

            , kill : function ( key, ip, port, cback ) {
                if ( ! ip ) return error( 'CLIENT KILL', arguments );
                return encode( 'CLIENT', 'KILL', [ ip, port ], null, cback );
            }

            , list : function ( cback ) {
                return encode( 'CLIENT', 'LIST', parseClientList, cback );
            }

            , pause : function ( timeout, cback ) {
                return encode( 'CLIENT', 'PAUSE', timeout, null, cback );
            }

            , setname : function ( key, cback ) {
                if ( ! key ) return error( 'CLIENT SETNAME', arguments );
                return encode( 'CLIENT', 'SETNAME', key, null, cback );
            }

        }

        , cluster : {
            slots : function ( cback ) {
                return encode( 'CLUSTER', 'SLOTS', null, cback );
            }
        }

        // use COMMAND LIST instead of COMMAND 
        , command : {

            count : function ( cback ) {
                return encode( 'COMMAND', 'COUNT', parseIntArray, cback );
            }
            , getkeys : function ( command, cback ) {
                var stype = doString( command )
                    , list = command
                    ;
                if ( stype === ostr ) list = command.split( ' ' );
                return ( isArray( list ) && list.length ) ?
                       encode( 'COMMAND', 'GETKEYS', list, null, cback ) :
                       error( 'COMMAND GETKEYS', arguments );
            }
            , info : function ( keys, cback ) {
                return ( ! keys || ( isArray( keys ) && ! keys.length ) ) ?
                       error( 'COMMAND INFO', arguments ) :
                       encode( 'COMMAND', 'INFO', keys, null, cback )
                       ;
            }
            // custom, a placeholder for command
            , list : function ( cback ) {
                return encode( 'COMMAND', null, cback );
            }
        }

        , config : {

            get : function ( key, cback ) {
                if ( ! key ) return error( 'CONFIG GET', arguments );
                return encode( 'CONFIG', 'GET', key, parseConfigGet, cback );
            }

            , resetstat : function ( cback ) {
                return encode( 'CONFIG', 'RESETSTAT', null, cback );
            }

            , rewrite : function ( cback ) {
                return encode( 'CONFIG', 'REWRITE', null, cback );
            }

            , set : function ( key, value, cback ) {
                if ( ! key ) return error( 'CONFIG SET', arguments );
                return encode( 'CONFIG', 'SET', [ key, value ], null, cback );
            }

        }

        , dbsize : function ( cback ) {
            return encode( 'DBSIZE', parseIntArray, cback );
        }

        , debug : {

            object : function ( key, cback ) {
                if ( ! key ) return error( 'DEBUG OBJECT', arguments );
                return encode( 'DEBUG', 'OBJECT', key, parseDebugObject, cback );
            }

            , segfault : function ( cback ) {
                return encode( 'DEBUG', 'SEGFAULT', null, cback );
            }

        }

        , flushall : function ( cback ) {
            return encode( 'FLUSHALL', parseIntArray, cback );
        }

        , flushdb : function ( cback ) {
            return encode( 'FLUSHDB', null, cback );
        }

        , info : function ( section, cback ) {
            if ( section ) return encode( 'INFO', section, parseRedisInfo, cback );
            return encode( 'INFO', parseRedisInfo, cback );
        }

        , lastsave : function ( cback ) {
            return encode( 'LASTSAVE', parseIntArray, cback );
        }

        , monitor : function ( cback ) {
            var result = encode( 'MONITOR', null, cback )
                ;
            // set special command shortcut
            result.isMonitor = 1;
            return result;
        }

        , role : function ( cback ) {
            return encode( 'ROLE', parseRoleReply, cback );
        }

        , save : function ( cback ) {
            return encode( 'SAVE', null, cback );
        }

        , shutdown : function ( opt, cback ) {
            switch ( opt ) {
                case 'SAVE':
                case 'NOSAVE':
                    return encode( 'SHUTDOWN', opt. null, cback );
                default:
                    return encode( 'SHUTDOWN', null, cback );
            }
        }

        , slaveof : function ( host, port, cback ) {
            if ( ! host ) return error( 'SLAVEOF', arguments );
            return encode( 'SLAVEOF', host, port, null, cback );
        }

        , slowlog : {

            get : function ( value, cback ) {
                if ( isNaN( + value ) ) return error( 'SLOWLOG GET', arguments );
                return encode( 'SLOWLOG', 'GET', reveal, cback );
            }

            , len : function ( cback ) {
                return encode( 'SLOWLOG', 'LEN', null, cback );
            }

            , reset : function ( cback ) {
                return encode( 'SLOWLOG', 'RESET', null, cback );
            }

        }

        , sync : function () {
            // NOTE: disabled, intended for slave replication.
            return error( 'SYNC', arguments );
        }

        , time : function ( cback ) {
            return encode( 'TIME', parseIntArray, cback );
        }

    };

};