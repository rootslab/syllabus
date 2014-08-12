/*
 * STRINGS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , Bolgia = require( 'bolgia' )
        , parseIntArray = Abaco.parseIntArray
        , parseFloatArray = Abaco.parseFloatArray
        , doString = Bolgia.doString
        , toArray = Bolgia.toArray
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        ;

    return {

        append : function ( key, value, cback ) {
            if ( ! key ) {
                return error( 'APPEND', arguments );
            }
            return encode( 'APPEND', key, value, parseIntArray, cback );
        }

        , bitcount : function ( key, range, cback ) {
            if ( ! key ) {
                return error( 'BITCOUNT', arguments );
            }
            if ( range && isArray( range ) ) {
                return encode( 'BITCOUNT', key, range, parseIntArray, cback );
            }
            return encode( 'BITCOUNT', key, parseIntArray, cback );
        }

        , bitop : {

            and : function ( dest, keys, cback ) {
                var list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'AND', list, null, cback );
                }
                return error( 'BITOP AND', arguments );
            }

            , or : function ( dest, keys, cback ) {
                var list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'OR', list, null, cback );
                }
                return error( 'BITOP OR', arguments );
            }

            , xor : function ( dest, keys, cback ) {
                var list = null
                    ;
                if ( dest && keys ) {
                    list = [ dest ].concat( keys );
                    return encode( 'BITOP', 'XOR', list, null, cback );
                }
                return error( 'BITOP XOR', arguments );
            }

            , not : function ( dest, key, cback ) {
                var list = []
                    ;
                if ( dest && key ) {
                    list = [ dest, key ]
                    return encode( 'BITOP', 'NOT', list, null, cback );
                }
                return error( 'BITOP NOT', arguments );
            }

        }

        , bitpos : function ( key, bit, range, cback ) {
            var list = [ bit ? 1 : 0 ]
                ;
            if ( ! key ) return error( 'BITPOS', arguments );
            if ( range && isArray( range ) ) list.push( range[ 0 ], range[ 1 ] );
            return encode( 'BITPOS', key, list, parseIntArray, cback );
        }

        , decr : function ( key, cback ) {
            if ( ! key ) return error( 'DECR', arguments );
            return encode( 'DECR', key, parseIntArray, cback );
        }

        , decrby : function ( key, integer, cback ) {
            if ( ! key ) return error( 'DECR', arguments );
            return encode( 'DECR', key, integer, parseIntArray, cback );
        }

        , get : function ( key, cback ) {
            if ( ! key ) return error( 'GET', arguments );
            return encode( 'GET', key, null, cback );
        }

        , getbit : function ( key, offset, cback ) {
            if ( ! key ) return error( 'GETBIT', arguments );
            return encode( 'GETBIT', key, offset, parseIntArray, cback );
        }

        , getrange : function ( key, start, end, cback ) {
            var list = null
                ;
            if ( key ) {
                list = [ + start, + end ];
                return encode( 'GETRANGE', key, list, null, cback );
            }
            return error( 'GETRANGE', arguments );
        }

        , getset : function ( key, value, cback ) {
            if ( ! key ) return error( 'GETSET', arguments );
            return encode( 'GETSET', key, value, null, cback );
        }

        , incr : function ( key, cback ) {
            if ( ! key ) return error( 'INCR', arguments );
            return encode( 'INCR', key, parseIntArray, cback );
        }

        , incrby : function ( key, integer, cback ) {
            if ( ! key ) return error( 'INCRBY', arguments );
            return encode( 'INCRBY', key, integer, parseIntArray, cback );
        }

        , incrbyfloat : function ( key, float, cback ) {
            if ( ! key ) return error( 'INCRBYFLOAT', arguments );
            return encode( 'INCRBYFLOAT', key, float, parseFloatArray, cback );
        }

        , mget : function ( keys, cback ) {
            if ( ! keys ) return error( 'MGET', arguments );
            if ( isArray( keys ) ) return encode( 'MGET', keys.slice( 0, 1 ), keys.slice( 1 ), null, cback );
            return encode( 'MGET', keys );
        } 

        , mset : function ( obj, cback ) {
            var p = null
                , list = obj
                ;

            switch ( doString( obj ) ) {
                case ooo.obj:
                    list = toArray( obj );
                case ooo.arr:
                    return encode( 'MSET', list.slice( 0, 1 ), list.slice( 1 ), null, cback );
                default:
                    return error( 'MSET', arguments );
            }
        }

        , msetnx : function ( obj, cback ) {
            var  p = null
                , list = obj
                ;
 
            switch( doString( obj ) ) {
                case ooo.obj:
                    list = toArray( obj );
                case ooo.arr:
                    return encode( 'MSETNX', list.shift(), list, parseIntArray, cback );
                default:
                    return error( 'MSETNX', arguments );
            }
        }

        , psetex : function ( key, millis, value, cback ) {
            if ( ! key ) return error( 'PSETEX', arguments );
            return encode( 'PSETEX', key, [ millis, value ], null, cback );
        }

        , set : function ( key, value, opt, cback ) {
            var list = null
                ;

            if ( ! key ) return error( 'SET', arguments );

            switch ( doString( opt ) ) {
                case ooo.arr:
                    return encode( 'SET', key, [ value ].concat( opt ), null, cback );
                case ooo.obj:
                    list = [ value ];
                    if ( doString( opt.ex ) === ooo.num ) {
                        list.push( 'EX', opt.ex );
                    }
                    if ( doString( opt.px ) === ooo.num ) {
                        list.push( 'PX', opt.px );
                    }
                    if ( doString( opt.check ) === ooo.str ) {
                        list.push( opt.check );
                    }
                    return encode( 'SET', key, list, null, cback );
                default:
                    return encode( 'SET', key, value, null, cback );
            }
        }

        , setbit : function ( key, offset, value, cback ) {
            if ( ! key ) return error( 'SETBIT', arguments );
            return encode( 'SETBIT', key, [ + offset, value ], parseIntArray, cback );
        }

        , setex : function ( key, secs, value, cback ) {
            if ( ! key ) return error( 'SETEX', arguments );
            return encode( 'SETEX', key, [ secs, value ], null, cback );
        }

        , setnx : function ( key, value, cback ) {
            if ( ! key ) return error( 'SETNX', arguments );
            return encode( 'SETNX', key, value, parseIntArray, cback );
        }

        , setrange : function ( key, offset, value, cback ) {
            var list = null
                ;
            if ( key ) return encode( 'SETRANGE', key, [ offset, value ], parseIntArray, cback );
            return error( 'SETRANGE', arguments );
        }

        , strlen : function ( key, cback ) {
            if ( ! key ) return error( 'STRLEN', arguments );
            return encode( 'STRLEN', key, parseIntArray, cback );
        }

    };

};
