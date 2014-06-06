/*
 * KEYS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseIntArray = Abaco.parseIntArray
        , Bolgia = require( 'bolgia' )
        , toString = Bolgia.toString
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        ;

    return {

        del : function ( keys, cback ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'DEL', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'DEL', keys.slice( 0, 1 ), keys.slice( 1 ), parseIntArray, cback );
            }
            return encode( 'DEL', keys, parseIntArray, cback );
        }

        , dump : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'DUMP', arguments );
            }
            return encode( 'DUMP', key, null, cback );
        }

        , exists : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'DUMP', arguments );
            }
            return encode( 'EXISTS', key, parseIntArray, cback );
        }

        , expire : function ( key, seconds, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'EXPIRE', arguments );
            }
            return encode( 'EXPIRE', key, + seconds, parseIntArray, cback );
        }

        , expireat : function ( key, unixtime, cback ) {
            var me = this
                , tstamp = null
                ;
            if ( ! key ) {
                return error( 'EXPIREAT', arguments );
            }
            if ( + unixtime ) {
                tstamp = ( + unixtime / 1000 ).toFixed( 0 );
            }
            return encode( 'EXPIREAT', key, tstamp, parseIntArray, cback );
        }

        , keys : function ( pattern, cback ) {
            var me = this
                ;
            if ( ! pattern ) {
                return error( 'KEYS', arguments );
            }
            return encode( 'KEYS', pattern, null, cback );
        }

        , migrate : function ( key, opt, cback ) {
            var me = this
                , list = null
                ;

            if ( ! key ) {
                return error( 'MIGRATE', arguments );
            }

            switch ( toString( opt ) ) {
                case ooo.arr:
                    if ( opt.length < 5 ) {
                        return error( 'MIGRATE', arguments );
                    }
                    // orig args -> host port key destination-db timeout [COPY] [REPLACE]
                    list = opt.slice( 0, 2 ).concat( key ).concat( opt.slice( 2 ) );
                    return encode( 'MIGRATE', list, null, cback );
                break;
                case ooo.obj:
                    list = [ opt.port, key, opt.db, opt.timeout, opt.action ];
                    return encode( 'MIGRATE', opt.host, list, null, cback );
                break;
                default:
                    return error( 'MIGRATE', arguments );
                break;
            };
        }

        , move : function ( key, db, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'MOVE', arguments );
            }
            return encode( 'MOVE', key, db, parseIntArray, cback );
        }

        , object : {

            refcount : function ( key, cback ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'OBJECT REFCOUNT', arguments ); 
                }
                return encode( 'OBJECT', 'REFCOUNT', key, parseIntArray, cback );
            }

            , encoding : function ( key, cback ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'OBJECT ENCODING', arguments );
                }
                return encode( 'OBJECT', 'ENCODING', key, null, cback );
            }

            , idletime : function ( key, cback ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'OBJECT IDLETIME', arguments );
                }
                return encode( 'OBJECT', 'IDLETIME', key, parseIntArray, cback );
            }

        }

        , persist : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PERSIST', arguments );
            }
            return encode( 'PERSIST', key, parseIntArray, cback );
        }

        , pexpire : function ( key, millis, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PEXPIRE', arguments );
            }
            return encode( 'PEXPIRE', key, millis, parseIntArray, cback );
        }

        , pexpireat : function ( key, unixtime, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PEXPIREAT', arguments );
            }
            return encode( 'PEXPIREAT', key, unixtime, parseIntArray, cback );
        }

        , pttl : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PTTL', arguments );
            }
            return encode( 'PTTL', key, parseIntArray, cback );
        }
        , randomkey : function ( cback ) {
            var me = this
                ;
            return encode( 'RANDOMKEY', null, cback );
        }

        , rename : function ( key, name, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'RENAME', arguments );
            }
            return encode( 'RENAME', key, name, parseIntArray, cback );
        }

        , renamenx : function ( key, name, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'RENAMENX', arguments );
            }
            return encode( 'RENAMENX', key, name, parseIntArray, cback );
        }

        , restore : function ( key, ttl, buffer, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'RESTORE', arguments );
            }
            return encode( 'RESTORE', key, [ ttl, buffer ], null, cback );
        }

        , scan : function ( cursor, opt, cback ) {
            var me = this
                , list = opt
                , match = null
                , count = null
                ;

            if ( isNaN( + cursor ) ) {
                return error( 'SCAN', arguments );
            }

            switch ( toString( opt ) ) {
                case ooo.obj:
                    list = [];
                    match = opt.match;
                    count = opt.count;
                    if ( toString( match ) === ooo.str ) {
                        list.push( 'MATCH', match );
                    }
                    if ( ( toString( count ) === ooo.str ) ||
                         ( toString( count ) === ooo.num ) ) {
                        list.push( 'COUNT', count );
                    }
                case ooo.arr:
                    return encode( 'SCAN', cursor, list, null, cback );
                break;
                default:
                    return error( 'SCAN', arguments );
                break;
            };
        }

        , sort : function ( key, opt, cback ) {
            var me = this
                , list = opt
                , order = null
                , limit = null
                , by = null
                , get = null
                , store = null
                , len = 0
                , el = null
                , i = 0
                ;

            if ( ! key ) {
                return error( 'SORT', arguments );
            }

            switch ( toString( opt ) ) {
                case ooo.obj:
                    // shortcuts
                    order = opt.order;
                    limit = opt.limit;
                    by = opt.by;
                    get = opt.get;
                    store = opt.store;
                    list = [];
                    // check properties
                    if ( toString( order ) === ooo.str ) {
                        if ( /^ALPHA|ASC|DESC$/i.test( order ) ) {
                            list.push( order );
                        }
                    }
                    if ( toString( limit ) === ooo.arr ) {
                        if ( limit.length >> 1 ){
                            list.push( 'LIMIT', limit[ 0 ], limit[ 1 ] );
                        }
                    }
                    if ( toString( by ) === ooo.str ) {
                        list.push( 'BY', by );
                    }
                    if ( toString( get ) === ooo.arr ) {
                        len = get.length;
                        for ( ; i < len; ) {
                            el = get[ i++ ];
                            if ( toString( el ) === ooo.str ) {
                                list.push( 'GET', el );
                            }
                        };
                    }
                    if ( toString( store ) === ooo.str ) {
                        list.push( 'STORE', store );
                    }
                case ooo.arr:
                    return encode( 'SORT', key, list, null, cback );
                break;
                default:
                    return error( 'SORT', arguments );
                break;
            };
        }

        , ttl : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'TTL', arguments );
            }
            return encode( 'TTL', key, parseIntArray, cback );
        }

        , type : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'TYPE', arguments );
            }
            return encode( 'TYPE', key, null, cback );
        }

    };

};
