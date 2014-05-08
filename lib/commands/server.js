/*
 * SERVER mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , parseFloat = Abaco.parseFloat
        , Bolgia = require( 'bolgia' )
        , toArray = Bolgia.toArray
        , toString = Bolgia.toString
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        /*
         * Utility function to parse CLIENT LIST result,
         * Command returns a unique string, formatted as follows:
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

            for ( ; i < rlen ; row = rows[ ++i ], f = 0, client = {} ) {
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
                    client[ k ] = ( toString( + v ) === ooo.num ) ? + v : v;
                };
                clist.push( client );
            };
            return clist;
        }
        ;

    return {

        bgrewriteaof : function () {
            var me = this
                ;
            return encode( 'BGREWRITEAOF' );
        }

        , bgsave : function () {
            var me = this
                ;
            return encode( 'BGSAVE' );
        }

        , client : {

            getname : function () {
                var me = this
                    ;
                return encode( 'CLIENT', 'GETNAME' );
            }

            , kill : function ( key, ip, port ) {
                var me = this
                    ;
                if ( ! ip ) {
                    return error( 'CLIENT KILL', arguments );
                }
                return encode( 'CLIENT', 'KILL', [ ip, port ] );
            }

            , list : function () {
                var me = this
                    ;
                // add utility fn to parse CLIENT LIST result
                return encode( 'CLIENT', 'LIST', parseClientList );
            }

            , pause : function ( timeout ) {
                var me = this
                    ;
                return encode( 'CLIENT', 'PAUSE', timeout );
            }

            , setname : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'CLIENT SETNAME', arguments );
                }
                return encode( 'CLIENT', 'SETNAME', key );
            }

        }

        , config : {

            get : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'CONFIG GET', arguments );
                }
                return encode( 'CONFIG', 'GET', key );
            }

            , resetstat : function () {
                var me = this
                    ;
                return encode( 'CONFIG', 'RESETSTAT' );
            }

            , rewrite : function () {
                var me = this
                    ;
                return encode( 'CONFIG', 'REWRITE' );
            }

            , set : function ( key, value ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'CONFIG SET', arguments );
                }
                return encode( 'CONFIG', 'SET', [ key, value ] );
            }

        }

        , dbsize : function () {
            var me = this
                ;
            return encode( 'DBSIZE', parseInt );
        }

        , debug : {

            object : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'DEBUG OBJECT', arguments );
                }
                return encode( 'DEBUG', 'OBJECT', key );
            }

            , segfault : function () {
                var me = this
                    ;
                return encode( 'DEBUG', 'SEGFAULT' );
            }

        }

        , flushall : function () {
            var me = this
                ;
            return encode( 'FLUSHALL', parseInt );
        }

        , flushdb : function () {
            var me = this
                ;
            return encode( 'FLUSHDB' );
        }

        , info : function ( section ) {
            // TODO: add utility fn to parse INFO result
            var me = this
                ;
                if ( section ) {
                    return encode( 'INFO', section );
                }
            return encode( 'INFO' );
        }

        , lastsave : function () {
            var me = this
                ;
            return encode( 'LASTSAVE', parseInt );
        }

        , monitor : function () {
            var me = this
                ;
            return encode( 'MONITOR' );
        }

        , save : function () {
            var me = this
                ;
            return encode( 'SAVE' );
        }

        , shutdown : function ( opt ) {
            var me = this
                ;
            switch ( opt ) {
                case 'SAVE':
                case 'NOSAVE':
                    return encode( 'SHUTDOWN', opt );
                break;
                default:
                    return encode( 'SHUTDOWN' );
                break;
            };
        }

        , slaveof : function ( host, port ) {
            var me = this
                ;
            if ( ! host ) {
                return error( 'SLAVEOF', arguments );
            }
            return encode( 'SLAVEOF', host, port );
        }

        , slowlog : {

            get : function ( value ) {
                var me = this
                    ;
                if ( isNaN( + value ) ) {
                    return error( 'SLOWLOG GET', arguments );
                }
                // TODO: add utility fn to parse SLOWLOG GET result
                return encode( 'SLOWLOG', 'GET' );
            }

            , len : function () {
                var me = this
                    ;
                return encode( 'SLOWLOG', 'LEN' );
            }

            , reset : function () {
               var me = this
                    ;
                return encode( 'SLOWLOG', 'RESET' );
            }

        }

        , sync : function () {
            // NOTE: disabled, intended for slave replication.
            return error( 'SYNC' );
        }

        , time : function () {
            var me = this
                , parseTimeReply = function ( reply ) {
                    if ( isArray( reply ) ) {
                        reply[ 0 ] = Abaco.parseInt( reply[ 0 ] );
                        reply[ 1 ] = Abaco.parseInt( reply[ 1 ] );
                    }
                    return reply;
                }
                ;
            return encode( 'TIME', parseTimeReply );
        }

    };

};