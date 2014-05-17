/*
 * HASHES mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , parseFloat = Abaco.parseFloat
        , Bolgia = require( 'bolgia' )
        , toArray = Bolgia.toArray
        , toString = Bolgia.toString
        , toHash = Bolgia.toHash
        , ooo = Bolgia.circles
        ;

    return {

        hdel : function ( key, fields, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HDEL', arguments );
            }
            return encode( 'HDEL', key, fields, parseInt, cback );
        }

        , hexists : function ( key, field, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HEXISTS', arguments );
            }
            return encode( 'HEXISTS', key, field, parseInt, cback );
        }

        , hget : function ( key, field, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HGET', arguments );
            }
            return encode( 'HGET', key, field, null, cback );
        }

        , hgetall : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HGETALL', arguments );
            }
            return encode( 'HGETALL', key, toHash, cback );
        }

        , hincrby : function ( key, field, integer, cback ) {
            var me = this
                , n = integer ? integer : '0'
                ;
            if ( key && field ) {
                return encode( 'HINCRBY', key, [ field, n ], parseInt, cback );
            }
            return error( 'HINCRBY', arguments );
        }

        , hincrbyfloat : function ( key, field, float, cback ) {
            var me = this
                , n = float ? float : '0'
                ;
            if ( key && field ) {
                return encode( 'HINCRBYFLOAT', key, [ field, n ], parseFloat, cback );
            }
            return error( 'HINCRBYFLOAT', arguments );
        }

        , hkeys : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HKEYS', arguments );
            }
            return encode( 'HKEYS', key, null, cback );
        }

        , hlen : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HLEN', arguments );
            }
            return encode( 'HLEN', key, parseInt, cback );
        }

        , hmget : function ( key, fields, cback ) {
           var me = this
                ;
            if ( ! key ) {
                return error( 'HMGET', arguments );
            }
            return encode( 'HMGET', key, fields, toHash, cback );
        }

        , hmset : function ( key, obj, cback ) {
            var me = this
                , list = obj
                , p = null
                ;
            switch ( toString( obj ) ) {
                case ooo.obj:
                    list = toArray( obj );
                case ooo.arr:
                    return encode( 'HMSET', key, list, null, cback );
                break;
                default:
                    return error( 'HMSET', arguments );
                break;
            };
        }

        , hscan : function ( key, cursor, opt, cback ) {
            var me = this
                , list = opt
                , match = null
                , count = null
                ;

            if ( ! key || isNaN( + cursor ) ) {
                return error( 'HSCAN', arguments );
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
                    return encode( 'HSCAN', key, cursor, list, null, cback );
                break;
                default:
                    return error( 'HSCAN', arguments );
                break;
            };
        }

        , hset : function ( key, field, value, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HSET', arguments );
            }
            return encode( 'HSET', key, [ field, value ], parseInt, cback );
        }

        , hsetnx : function ( key, field, value, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HSETNX', arguments );
            }
            return encode( 'HSETNX', key, [ field, value ], parseInt, cback );
        }

        , hvals : function ( key, cback ) {
            var me = this
                , list = null
                ;
            if ( ! key ) {
                return error( 'HVALS', arguments );
            }
            return encode( 'HVALS', key, null, cback );
        }

    };

}
