/*
 * KEYS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , Bolgia = require( 'bolgia' )
        , toString = Bolgia.toString
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        ;

    return {

        del : function ( keys ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'DEL', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'DEL', keys.shift(), keys, parseInt );
            }
            return encode( 'DEL', keys, parseInt );
        }

        , dump : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'DUMP', arguments );
            }
            return encode( 'DUMP', key );
        }

        , exists : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'DUMP', arguments );
            }
            return encode( 'EXISTS', key, parseInt );
        }

        , expire : function ( key, seconds ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'EXPIRE', arguments );
            }
            return encode( 'EXPIRE', key, + seconds, parseInt );
        }

        , expireat : function ( key, unixtime ) {
            var me = this
                tstamp = null
                ;
            if ( ! key ) {
                return error( 'EXPIREAT', arguments );
            }
            if ( + unixtime ) {
                tstamp = ( + unixtime / 1000 ).toFixed( 0 );
            }
            return encode( 'EXPIREAT', key, tstamp, parseInt );
        }

        , keys : function ( pattern ) {
            var me = this
                ;
            if ( ! pattern ) {
                return error( 'KEYS', arguments );
            }
            return encode( 'KEYS', pattern );
        }

        , migrate : function ( key, opt ) {
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
                    return encode( 'MIGRATE', list );
                break;
                case ooo.obj:
                    list = [ opt.port, key, opt.db, timeout, opt.action ];
                    return encode( 'MIGRATE', opt.host, list );
                break;
                default:
                    return error( 'MIGRATE', arguments );
                break;
            };
        }

        , move : function ( key, db ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'MOVE', arguments );
            }
            return encode( 'MOVE', key, db, parseInt );
        }

        , object : {

            refcount : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'OBJECT REFCOUNT', arguments ); 
                }
                return encode( 'OBJECT', 'REFCOUNT', key, parseInt );
            }

            , encoding : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'OBJECT ENCODING', arguments );
                }
                return encode( 'OBJECT', 'ENCODING', key );
            }

            , idletime : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'OBJECT IDLETIME', arguments );
                }
                return encode( 'OBJECT', 'IDLETIME', key, parseInt );
            }

        }

        , persist : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PERSIST', arguments );
            }
            return encode( 'PERSIST', key, parseInt );
        }

        , pexpire : function ( key, millis ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PEXPIRE', arguments );
            }
            return encode( 'PEXPIRE', key, + millis, parseInt );
        }

        , pexpireat : function ( key, unixtime ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PEXPIREAT', arguments );
            }
            return encode( 'PEXPIREAT', key, + unixtime, parseInt );
        }

        , pttl : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PTTL', arguments );
            }
            return encode( 'PTTL', key, parseInt );
        }
        , randomkey : function () {
            var me = this
                ;
            return encode( 'RANDOMKEY' );
        }

        , rename : function ( key, str ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'RENAME', arguments );
            }
            return encode( 'RENAME', key, str, parseInt );
        }

        , renamenx : function ( key, name ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'RENAMENX', arguments );
            }
            return encode( 'RENAMENX', key, name, parseInt );
        }

        , restore : function ( key, ttl, buffer ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'RESTORE', arguments );
            }
            return encode( 'RESTORE', key, [ ttl, buffer ] );
        }

        , scan : function ( cursor, opt ) {
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
                    if ( toString( count ) === ooo.str ) {
                        list.push( 'COUNT', count );
                    }
                case ooo.arr:
                    return encode( 'SCAN', cursor, list );
                break;
                default:
                    return error( 'SCAN', arguments );
                break;
            };
        }

        , sort : function ( key, opt ) {
            var me = this
                , list = []
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
                case ooo.arr:
                    return encode( 'SORT', key, opt );
                break;
                case ooo.obj:
                    // shortcuts
                    order = opt.order;
                    limit = opt.limit;
                    by = opt.by;
                    get = opt.get;
                    store = opt.store;
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
                    return encode( 'SORT', key, list );
                break;
                default:
                    return error( 'SORT', arguments );
                break;
            };
        }

        , ttl : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'TTL', arguments );
            }
            return encode( 'TTL', key, parseInt );
        }

        , type : function ( key ) {
            var me = this
                ;
            if ( ! key ) { return error( 'TYPE', arguments ); }
            return encode( 'TYPE', key );
        }

    };

};
