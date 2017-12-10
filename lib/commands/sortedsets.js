/*
 * SORTED SETS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , parseIntArray = Abaco.parseIntArray
        , parseFloatArray = Abaco.parseFloatArray
        , Bolgia = require( 'bolgia' )
        , toArray = Bolgia.toArray
        , doString = Bolgia.doString
        , ooo = Bolgia.circles
        , onul = ooo.nul
        , onum = ooo.num
        , ound = ooo.und
        , oobj = ooo.obj
        , oarr = ooo.arr
        , ostr = ostr
        , isArray = Array.isArray
        // ZINTERSTORE, ZUNIONSTORE
        , zstore = function ( intersect ) {
            var cmd = intersect ? 'ZINTERSTORE' : 'ZUNIONSTORE'
                ;
            return function ( dest, keys, weights, aggregate, cback ) {
                var k = isArray( keys )
                    , klen = 0
                    , w = isArray( keys )
                    , opt = aggregate
                    , list = null
                    ;
                if ( k && w && ( ( klen = k.length ) === w.length ) ) {
                    list = [ klen ].concat( keys ).concat( [ 'WEIGHTS' ].concat( weights ) );
                    if ( doString( opt ) === ostr ) list.push( 'AGGREGATE', opt );
                    return encode( cmd, dest, list, parseIntArray, cback );
                }
                return error( cmd, arguments );
            }
            ;
        }
        // ZRANGE, ZREVRANGE
        , zrange = function ( is ) {
            var cmd = is ? 'ZRANGE' : 'ZREVRANGE'
                ;
            return function ( key, start, stop, withscores, cback ) {
                var ws = withscores
                    , list = [ start, stop ]
                    ;
                if ( key === undefined ) return error( 'ZRANGE', arguments );
                return encode( cmd, key, ws ? list.concat( 'WITHSCORES' ) : list, null, cback );
            }
            ;
        }
        ;

    return {

        zadd : function ( key, scores, cback ) {
            var list = scores
                ;
            if ( key === undefined ) return error( 'ZADD', arguments );
            switch ( doString( scores ) ) {
                case oobj:
                    list = toArray( scores );
                case oarr:
                    return encode( 'ZADD', key, list, parseIntArray, cback );
                default:
                    return error( 'ZADD', arguments );
            }
        }

        , zcard : function ( key, cback ) {
            if ( key === undefined ) return error( 'ZCARD', arguments );
            return encode( 'ZCARD', key, parseIntArray, cback );
        }

        , zcount : function ( key, min, max, cback ) {
            if ( key === undefined ) return error( 'ZCOUNT', arguments );
            return encode( 'ZCOUNT', key, [ min, max ], parseIntArray, cback );
        }

        , zincrby : function ( key, float, member, cback ) {
            var f = float ? float : '0'
                ;
            // NOTE : it returns a double precision float, represented as string
            if ( key === undefined ) return error( 'ZINCRBY', arguments );
            return encode( 'ZINCRBY', key, [ f, member ], parseFloatArray, cback );
        }

        , zinterstore : zstore( true )

        , zlexcount : function ( key, min, max, cback ) {
            if ( key === undefined ) return error( 'ZLEXCOUNT', arguments );
            return encode( 'ZLEXCOUNT', key, [ min, max ], parseIntArray, cback );
        }

        , zrange : zrange( true )

        , zrangebylex : function ( key, min, max, limit, cback ) {
            var list = [ min, max ];
            if ( key === undefined ) return error( 'ZRANGEBYLEX', arguments );
            if ( isArray( limit ) ) list.concat( 'LIMIT' ).concat( limit );
            return encode( 'ZRANGEBYLEX', key, list, null, cback );
        }

        , zrevrangebylex : function ( key, min, max, limit, cback ) {
            var list = [ min, max ];
            if ( key === undefined ) return error( 'ZREVRANGEBYLEX', arguments );
            if ( isArray( limit ) ) list.concat( 'LIMIT' ).concat( limit );
            return encode( 'ZREVRANGEBYLEX', key, list, null, cback );
        }

        , zrangebyscore : function ( key, min, max, withscores, limit, cback ) {
            var list = [ min, max ];
            if ( key === undefined ) return error( 'ZRANGEBYSCORE', arguments );
            if ( withscores ) list.push( 'WITHSCORES' );
            if ( isArray( limit ) ) list = list.concat( 'LIMIT' ).concat( limit );
            return encode( 'ZRANGEBYSCORE', key, list, null, cback );
        }

        , zrank : function ( key, member, cback ) {
            // NOTE : it returns an integer reply or null/nil ($-1 bulk reply)
            if ( key === undefined ) return error( 'ZRANK', arguments );
            return encode( 'ZRANK', key, member, parseIntArray, cback );
        }

        , zrem : function ( key, members, cback ) {
            if ( key === undefined ) return error( 'ZREM', arguments );
            return encode( 'ZREM', key, members, parseIntArray, cback );
        }

        , zremrangebylex : function ( key, min, max, cback ) {
            if ( key === undefined ) return error( 'ZREMRANGEBYLEX', arguments );
            return encode( 'ZREMRANGEBYLEX', key, [ min, max ], parseIntArray, cback );
        }

        , zremrangebyrank : function ( key, start, stop, cback ) {
            if ( key === undefined ) return error( 'ZREMRANGEBYRANK', arguments );
            return encode( 'ZREMRANGEBYRANK', key, [ start, stop ], parseIntArray, cback );
        }

        , zremrangebyscore : function ( key, min, max, cback ) {
            if ( key === undefined ) return error( 'ZREMRANGEBYSCORE', arguments );
            return encode( 'ZREMRANGEBYSCORE', key, [ min, max ], parseIntArray, cback );
        }
        
        , zrevrange : zrange( false )

        , zrevrangebyscore : function ( key, start, stop, withscores, limit, cback ) {
            var list = [ start, stop ]
                ;
            if ( key === undefined )  return error( 'ZREVRANGEBYSCORE', arguments );
            if ( withscores ) list.push( 'WITHSCORES' );
            if ( isArray( limit ) ) list = list.concat( 'LIMIT' ).concat( limit );
            return encode( 'ZREVRANGEBYSCORE', key, list, null, cback );
        }

        , zrevrank : function ( key, member, cback ) {
            // NOTE : it returns an integer reply or null/nil ($-1 bulk reply)
            if ( key === undefined ) return error( 'ZREVRANK', arguments );
            return encode( 'ZREVRANK', key, member, parseIntArray, cback );
        }

        , zscan : function ( key, cursor, opt, cback ) {
            var list = null
                , match = null
                , count = null
                , ctype = null
                ;

            if ( ( key === undefined ) || isNaN( + cursor ) ) return error( 'ZSCAN', arguments );
            switch ( doString( opt ) ) {
                case oobj:
                    list = [];
                    match = opt.match;
                    count = opt.count;
                    ctype = doString( count );
                    if ( doString( match ) === ostr ) list.push( 'MATCH', match );
                    if ( ctype === ostr || ctype === onum ) list.push( 'COUNT', count );
                case oarr:
                    return encode( 'ZSCAN', key, [ cursor ].concat( list || opt ), null, cback );
                case onul:
                case ound:
                    return encode( 'ZSCAN', key, [ cursor ], null, cback );
                default:
                    return error( 'ZSCAN', arguments );
            }
        }

        , zscore : function ( key, member, cback ) {
            // NOTE : it returns a double precision float, represented as string
            if ( key === undefined ) return error( 'ZSCORE', arguments );
            return encode( 'ZSCORE', key, member, parseFloatArray, cback );
        }

        , zunionstore : zstore( false )

    };

};