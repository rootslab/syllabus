/*
 * STRINGS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , Bolgia = require( 'bolgia' )
        , parseInt = Abaco.parseInt
        , parseFloat = Abaco.parseFloat
        , toString = Bolgia.toString
        , toArray = Bolgia.toArray
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        ;

    return {

        append : function ( key, value, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'APPEND', arguments );
            }
            return encode( 'APPEND', key, value, parseInt, cback );
        }

        , bitcount : function ( key, range, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'BITCOUNT', arguments );
            }
            if ( range && isArray( range ) ) {
                return encode( 'BITCOUNT', key, range, parseInt, cback );
            }
            return encode( 'BITCOUNT', key, parseInt, cback );
        }

        , bitop : {

            and : function ( dest, keys, cback ) {
                var me = this
                    , list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'AND', list, null, cback );
                }
                return error( 'BITOP AND', arguments );
            }

            , or : function ( dest, keys, cback ) {
                var me = this
                    , list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'OR', list, null, cback );
                }
                return error( 'BITOP OR', arguments );
            }

            , xor : function ( dest, keys, cback ) {
                var me = this
                    , list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'XOR', list, null, cback );
                }
                return error( 'BITOP XOR', arguments );
            }

            , not : function ( dest, key, cback ) {
                var me = this
                    , list = []
                    ;
                if ( dest && key ) {
                    list = [ dest, key ]
                    return encode( 'BITOP', 'NOT', list, null, cback );
                }
                return error( 'BITOP NOT', arguments );
            }

        }

        , bitpos : function ( key, bit, range, cback ) {
            var me = this
                , list = [ bit ? 1 : 0 ]
                ;
            if ( ! key ) {
                return error( 'BITPOS', arguments );
            }
            if ( range && isArray( range ) ) {
                list.push( range[ 0 ], range[ 1 ] );
            }
            return encode( 'BITPOS', key, list, parseInt, cback );
        }

        , decr : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'DECR', arguments );
            }
            return encode( 'DECR', key, parseInt, cback );
        }

        , decrby : function ( key, integer, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'DECR', arguments );
            }
            return encode( 'DECR', key, integer, parseInt, cback );
        }

        , get : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'GET', arguments );
            }
            return encode( 'GET', key, null, cback );
        }

        , getbit : function ( key, offset, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'GETBIT', arguments );
            }
            return encode( 'GETBIT', key, offset, parseInt, cback );
        }

        , getrange : function ( key, start, end, cback ) {
            var me = this
                , list = null
                ;
            if ( key ) {
                list = [ + start, + end ];
                return encode( 'GETRANGE', key, list, null, cback );
            }
            return error( 'GETRANGE', arguments );
        }

        , getset : function ( key, value, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'GETSET', arguments );
            }
            return encode( 'GETSET', key, value, null, cback );
        }

        , incr : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'INCR', arguments );
            }
            return encode( 'INCR', key, parseInt, cback );
        }

        , incrby : function ( key, integer, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'INCRBY', arguments );
            }
            return encode( 'INCRBY', key, integer, parseInt, cback );
        }

        , incrbyfloat : function ( key, float, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'INCRBYFLOAT', arguments );
            }
            return encode( 'INCRBYFLOAT', key, float, parseFloat, cback );
        }

        , mget : function ( keys, cback ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'MGET', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'MGET', keys.shift(), keys, null, cback );
            }
            return encode( 'MGET', keys );
        } 

        , mset : function ( obj, cback ) {
            var me = this
                , p = null
                , list = obj
                ;

            switch ( toString( obj ) ) {
                case ooo.obj:
                    list = toArray( obj );
                case ooo.arr:
                    return encode( 'MSET', list.shift(), list, null, cback );
                break;
                default:
                    return error( 'MSET', arguments );
                break;
            };
        }

        , msetnx : function ( obj, cback ) {
            var me = this
                ,  p = null
                , list = obj
                ;
 
            switch( toString( obj ) ) {
                case ooo.obj:
                    list = toArray( obj );
                case ooo.arr:
                    return encode( 'MSETNX', list.shift(), list, parseInt, cback );
                break;
                default:
                    return error( 'MSETNX', arguments );
                break;
            };
        }

        , psetex : function ( key, millis, value, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PSETEX', arguments );
            }
            return encode( 'PSETEX', key, [ millis, value ], null, cback );
        }

        , set : function ( key, value, opt, cback ) {
            var me = this
                , list = null
                ;

            if ( ! key ) { return error( 'SET', arguments ); }

            switch ( toString( opt ) ) {
                case ooo.arr:
                    return encode( 'SET', key, [ value ].concat( opt ), null, cback );
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
                    return encode( 'SET', key, list, null, cback );
                break;
                default:
                    return encode( 'SET', key, value, null, cback );
                break;
            };
        }

        , setbit : function ( key, offset, value, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SETBIT', arguments );
            }
            return encode( 'SETBIT', key, [ + offset, value ], parseInt, cback );
        }

        , setex : function ( key, secs, value, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SETEX', arguments );
            }
            return encode( 'SETEX', key, [ secs, value ], null, cback );
        }

        , setnx : function ( key, value, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SETNX', arguments );
            }
            return encode( 'SETNX', key, value, parseInt, cback );
        }

        , setrange : function ( key, offset, value, cback ) {
            var me = this
                , list = null
                ;
            if ( key ) {
                return encode( 'SETRANGE', key, [ offset, value ], parseInt, cback );
            }
            return error( 'SETRANGE', arguments );
        }

        , strlen : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'STRLEN', arguments );
            }
            return encode( 'STRLEN', key, parseInt, cback );
        }

    };

};
