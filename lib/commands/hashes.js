/*
 * HASHES mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , Bolgia = require( 'bolgia' )
        , parseIntArray = Abaco.parseIntArray
        , parseFloatArray = Abaco.parseFloatArray
        , toArray = Bolgia.toArray
        , doString = Bolgia.doString
        , toHash = Bolgia.toHash
        , ooo = Bolgia.circles
        , onul = ooo.nul
        , ound = ooo.und
        , oobj = ooo.obj
        , oarr = ooo.arr
        , ostr = ooo.str
        , onum = ooo.num
        ;

    return {

        hdel : function ( key, fields, cback ) {
            if ( key === undefined ) return error( 'HDEL', arguments );
            return encode( 'HDEL', key, fields, parseIntArray, cback );
        }

        , hexists : function ( key, field, cback ) {
            if ( key === undefined ) return error( 'HEXISTS', arguments );
            return encode( 'HEXISTS', key, field, parseIntArray, cback );
        }

        , hget : function ( key, field, cback ) {
            if ( key === undefined ) return error( 'HGET', arguments );
            return encode( 'HGET', key, field, null, cback );
        }

        , hgetall : function ( key, cback ) {
            if ( key === undefined ) return error( 'HGETALL', arguments );
            return encode( 'HGETALL', key, toHash, cback );
        }

        , hincrby : function ( key, field, integer, cback ) {
            var n = integer ? integer : '0'
                ;
            if ( key === undefined ) return error( 'HINCRBY', arguments );
            else return encode( 'HINCRBY', key, [ field, n ], parseIntArray, cback );
        }

        , hincrbyfloat : function ( key, field, float, cback ) {
            var n = float ? float : '0'
                ;
            if ( key === undefined ) return  error( 'HINCRBYFLOAT', arguments );
            else return encode( 'HINCRBYFLOAT', key, [ field, n ], parseFloatArray, cback );
        }

        , hkeys : function ( key, cback ) {
            if ( key === undefined ) return error( 'HKEYS', arguments );
            return encode( 'HKEYS', key, null, cback );
        }

        , hlen : function ( key, cback ) {
            if ( key === undefined ) return error( 'HLEN', arguments );
            return encode( 'HLEN', key, parseIntArray, cback );
        }

        , hmget : function ( key, fields, cback ) {
            if ( key === undefined ) return error( 'HMGET', arguments );
            return encode( 'HMGET', key, fields, toHash, cback );
        }

        , hmset : function ( key, obj, cback ) {
            var list = obj
                ;
            if ( key === undefined ) return error( 'HMSET', arguments );
            switch ( doString( obj ) ) {
                case oobj:
                    list = toArray( obj );
                case oarr:
                    return encode( 'HMSET', key, list, null, cback );
                default:
                    return error( 'HMSET', arguments );
            }
        }

        , hscan : function ( key, cursor, opt, cback ) {
            var list = null
                , match = null
                , count = null
                , ctype = null
                ;

            if ( ( key === undefined ) || isNaN( + cursor ) ) return error( 'HSCAN', arguments );

            switch ( doString( opt ) ) {
                case oobj:
                    list = [];
                    match = opt.match;
                    count = opt.count;
                    ctype = doString( count );
                    if ( doString( match ) === ostr ) list.push( 'MATCH', match );
                    if ( ctype === ostr || ctype === onum ) list.push( 'COUNT', count );
                case oarr:
                    return encode( 'HSCAN', key, [ cursor ].concat( list || opt ), null, cback );
                case onul:
                case ound:
                    return encode( 'HSCAN', key, [ cursor ], null, cback );
                default:
                    return error( 'HSCAN', arguments );
            }
        }

        , hset : function ( key, field, value, cback ) {
            if ( key === undefined ) return error( 'HSET', arguments );
            return encode( 'HSET', key, [ field, value ], parseIntArray, cback );
        }

        , hsetnx : function ( key, field, value, cback ) {
            if ( key === undefined ) return error( 'HSETNX', arguments );
            return encode( 'HSETNX', key, [ field, value ], parseIntArray, cback );
        }

        , hstrlen : function ( key, field, cback ) {
            if ( key === undefined ) return error( 'HSTRLEN', arguments );
            return encode( 'HSTRLEN', key, field, null, cback );
        }

        , hvals : function ( key, cback ) {
            if ( key === undefined ) return error( 'HVALS', arguments );
            return encode( 'HVALS', key, null, cback );
        }

    };

};