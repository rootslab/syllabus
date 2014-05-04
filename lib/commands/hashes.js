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
        , ooo = Bolgia.circles
        ;

    return {

        hdel : function ( key, fields ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HDEL', arguments );
            }
            return encode( 'HDEL', key, fields, parseInt );
        }

        , hexists : function ( key, field ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HEXISTS', arguments );
            }
            return encode( 'BITCOUNT', key, field, parseInt );
        }

        , hget : function ( key, field ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HGET', arguments );
            }
            return encode( 'HGET', key, field );
        }

        , hgetall : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HGET', arguments );
            }
            return encode( 'HGET', key, field ); // TODO hash
        }

        , hincrby : function ( key, field, integer ) {
            var me = this
                n = integer ? integer : '0'
                ;
            if ( key && field ) {
                return encode( 'HINCRBY', key, [ field, n ], parseInt );
            }
            return error( 'HINCRBY', arguments );
        }

        , hincrbyfloat : function ( key, field, float ) {
            var me = this
                n = float ? float : '0'
                ;
            if ( key && field ) {
                return encode( 'HINCRBYFLOAT', key, [ field, n ], parseFloat );
            }
            return error( 'HINCRBYFLOAT', arguments );
        }

        , hkeys : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HKEYS', arguments );
            }
            return encode( 'HKEYS', key );
        }

        , hlen : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HLEN', arguments );
            }
            return encode( 'HLEN', key, parseInt );
        }

        , hmget : function ( key, fields ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HMGET', arguments );
            }
            return encode( 'HMGET', key, fields );
        }

        , hmset : function ( key, obj ) {
            var me = this
                , list = obj
                , p = null
                ;
            switch ( toString( obj ) ) {
                case ooo.obj:
                    list = toArray( obj );
                case ooo.arr:
                    return encode( 'HMSET', key, list );
                break;
                default:
                    return error( 'HMSET', arguments );
                break;
            };
        }

        , hset : function ( key, field, value ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HSET', arguments );
            }
            return encode( 'HSET', key, [ field, value ], parseInt );
        }

        , hsetnx : function ( key, field, value ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'HSETNX', arguments );
            }
            return encode( 'HSETNX', key, [ field, value ], parseInt );
        }

        , hvals : function ( key ) {
            var me = this
                , list = null
                ;
            if ( ! key ) {
                return error( 'HVALS', arguments );
            }
            return encode( 'HVALS', key );
        }

    };

}
