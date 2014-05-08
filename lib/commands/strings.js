/*
 * STRINGS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , parseFloat = Abaco.parseFloat
        , Bolgia = require( 'bolgia' )
        , toString = Bolgia.toString
        , toArray = Bolgia.toArray
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        ;

    return {

        append : function ( key, value ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'APPEND', arguments );
            }
            return encode( 'APPEND', key, value, parseInt );
        }

        , bitcount : function ( key, range ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'BITCOUNT', arguments );
            }
            if ( range && isArray( range ) ) {
                return encode( 'BITCOUNT', key, range, parseInt );
            }
            return encode( 'BITCOUNT', key, parseInt );
        }

        , bitop : {

            and : function ( dest, keys ) {
                var me = this
                    list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'AND', list );
                }
                return error( 'BITOP AND', arguments );
            }

            , or : function ( dest, keys ) {
                var me = this
                    list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'OR', list );
                }
                return error( 'BITOP OR', arguments );
            }

            , xor : function ( dest, keys ) {
                var me = this
                    list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'XOR', list );
                }
                return error( 'BITOP XOR', arguments );
            }

            , not : function ( dest, key ) {
                var me = this
                    , list = []
                    ;
                if ( dest && key ) {
                    list = [ dest, key ]
                    return encode( 'BITOP', 'NOT', list );
                }
                return error( 'BITOP NOT', arguments );
            }

        }

        , bitpos : function ( key, bit, range ) {
            var me = this
                , list = [ bit ? 1 : 0 ]
                ;
            if ( ! key ) {
                return error( 'BITPOS', arguments );
            }
            if ( range && isArray( range ) ) {
                list.push( range[ 0 ], range[ 1 ] );
            }
            return encode( 'BITPOS', key, list, parseInt );
        }

        , decr : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'DECR', arguments );
            }
            return encode( 'DECR', key, parseInt );
        }

        , decrby : function ( key, integer ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'DECR', arguments );
            }
            return encode( 'DECR', key, integer, parseInt );
        }

        , get : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'GET', arguments );
            }
            return encode( 'GET', key );
        }

        , getbit : function ( key, offset ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'GETBIT', arguments );
            }
            return encode( 'GETBIT', key, offset, parseInt );
        }

        , getrange : function ( key, start, end ) {
            var me = this
                , list = null
                ;
            if ( key ) {
                list = [ + start, + end ];
                return encode( 'GETRANGE', key, list );
            }
            return error( 'GETRANGE', arguments );
        }

        , getset : function ( key, value ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'GETSET', arguments );
            }
            return encode( 'GETSET', key, value );
        }

        , incr : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'INCR', arguments );
            }
            return encode( 'INCR', key, parseInt );
        }

        , incrby : function ( key, integer ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'INCRBY', arguments );
            }
            return encode( 'INCRBY', key, integer, parseInt );
        }

        , incrbyfloat : function ( key, float ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'INCRBYFLOAT', arguments );
            }
            return encode( 'INCRBYFLOAT', key, float, parseFloat );
        }

        , mget : function ( keys ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'MGET', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'MGET', keys.shift(), keys );
            }
            return encode( 'MGET', keys );
        } 

        , mset : function ( obj ) {
            var me = this
                p = null
                list = obj
                ;

            switch ( toString( obj ) ) {
                case ooo.obj:
                    list = toArray( obj );
                case ooo.arr:
                    return encode( 'MSET', list.shift(), list );
                break;
                default:
                    return error( 'MSET', arguments );
                break;
            };
        }

        , msetnx : function ( obj ) {
            var me = this
                p = null
                list = obj
                ;
 
            switch( toString( obj ) ) {
                case ooo.obj:
                    list = toArray( obj );
                case ooo.arr:
                    return encode( 'MSETNX', list.shift(), list, parseInt );
                break;
                default:
                    return error( 'MSETNX', arguments );
                break;
            };
        }

        , psetex : function ( key, millis, value ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PSETEX', arguments );
            }
            return encode( 'PSETEX', key, [ millis, value ] );
        }

        , set : function ( key, value, opt ) {
            var me = this
                , list = null
                ;

            if ( ! key ) { return error( 'SET', arguments ); }

            switch ( toString( opt ) ) {
                case ooo.arr:
                    return encode( 'SET', key, [ value ].concat( opt ) );
                break;
                case ooo.obj:
                    list = [ value ];
                    if ( toString( opt.ex ) === ooo.num ) {
                        list.push( 'EX', opt.ex );
                    }
                    if ( toString( opt.px ) === ooo.num ) {
                        list.push( 'PX', opt.px );
                    }
                    if ( toString( opt.check ) === ooo.str ) {
                        list.push( opt.check );
                    }
                    return encode( 'SET', key, list );
                break;
                default:
                    return encode( 'SET', key, value );
                break;
            };
        }

        , setbit : function ( key, offset, value ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SETBIT', arguments );
            }
            return encode( 'SETBIT', key, [ + offset, value ], parseInt );
        }

        , setex : function ( key, secs, value ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SETEX', arguments );
            }
            return encode( 'SETEX', key, [ secs, value ] );
        }

        , setnx : function ( key, value ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SETNX', arguments );
            }
            return encode( 'SETNX', key, value, parseInt );
        }

        , setrange : function ( key, offset, value ) {
            var me = this
                , list = null
                ;
            if ( key ) {
                return encode( 'SETRANGE', key, [ offset, value ], parseInt );
            }
            return error( 'SETRANGE', arguments );
        }

        , strlen : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'STRLEN', arguments );
            }
            return encode( 'STRLEN', key, parseInt );
        }

    };

};
