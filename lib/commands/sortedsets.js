/*
 * SORTED SETS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseIntArray = Abaco.parseIntArray
        , parseFloatArray = Abaco.parseFloatArray
        , Bolgia = require( 'bolgia' )
        , toArray = Bolgia.toArray
        , toString = Bolgia.toString
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        ;

    return {

        zadd : function ( key, scores, cback ) {
            var me = this
                , list = scores
                ;
            if ( ! key ) {
                return error( 'ZADD', arguments );
            }
            switch ( toString( scores ) ) {
                case ooo.obj:
                    list = toArray( scores );
                case ooo.arr:
                    return encode( 'ZADD', key, list, parseIntArray, cback );
                break;
                default:
                    return error( 'ZADD', arguments );
                break;
            };
        }

        , zcard : function ( key, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZCARD', arguments );
            }
            return encode( 'ZCARD', key, parseIntArray, cback );
        }

        , zcount : function ( key, min, max, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZCOUNT', arguments );
            }
            return encode( 'ZCOUNT', key, [ min, max ], parseIntArray, cback );
        }

        , zincrby : function ( key, float, member, cback ) {
            var me = this
                , f = float ? float : '0'
                ;
            if ( key && member ) {
                // NOTE : it returns a double precision float, represented as string
                return encode( 'ZINCRBY', key, [ f, member ], parseFloatArray, cback );
            }
            return error( 'ZINCRBY', arguments );
        }

        , zinterstore : function ( dest, keys, weights, aggregate, cback ) {
            var me = this
                , k = isArray( keys )
                , klen = 0
                , w = isArray( keys )
                , opt = aggregate
                , list = null
                ;
            if ( k && w && ( ( klen = k.length ) === w.length ) ) {
                list = [ klen ].concat( keys ).concat( [ 'WEIGHTS' ].concat( weights ) );
                if ( toString( opt ) === ooo.str ) {
                    list.push( 'AGGREGATE', opt );
                }
                return encode( 'ZINTERSTORE', dest, list, parseIntArray, cback );
            }
            return error( 'ZINTERSTORE', arguments );
        }

        , zlexcount : function ( key, min, max, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZLEXCOUNT', arguments );
            }
            return encode( 'ZLEXCOUNT', key, [ min, max ], parseIntArray, cback );
        }

        , zrange : function ( key, start, stop, withscores, cback ) {
            var me = this
                , ws = withscores
                , list = [ start, stop ]
                ;
            if ( ! key ) {
                return error( 'ZRANGE', arguments );
            }
            return encode( 'ZRANGE', key, ws ? list.concat( 'WITHSCORES' ) : list, null, cback );
        }

        , zrangebylex : function ( key, min, max, limit, cback ) {
            var me = this
                , l = isArray( limit )
                , list = null
                ;
            if ( ! key ) {
                return error( 'ZRANGEBYLEX', arguments );
            }
            list = [ min, max ];
            if ( l ) {
                list.concat( 'LIMIT' ).concat( limit );
            }
            return encode( 'ZRANGEBYLEX', key, list, null, cback );
        }

        , zrangebyscore : function ( key, min, max, withscores, limit, cback ) {
            var me = this
                , ws = withscores
                , list = [ min, max ]
                , l = isArray( limit )
                ;
            if ( ! key ) {
                return error( 'ZRANGEBYSCORE', arguments );
            }
            if ( ws ) {
                list.push( 'WITHSCORES' );
            }
            if ( l ) {
                list = list.concat( 'LIMIT' ).concat( limit );
            }
            return encode( 'ZRANGEBYSCORE', key, list, null, cback );
        }

        , zrank : function ( key, member, cback ) {
            var me = this
                ;
            if ( key && member ) {
                // NOTE : it returns an integer reply or null/nil ($-1 bulk reply)
                return encode( 'ZRANK', key, member, parseIntArray, cback );
            }
            return error( 'ZRANK', arguments );
        }

        , zrem : function ( key, members, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZREM', arguments );
            }
            return encode( 'ZREM', key, members, parseIntArray, cback );
        }

        , zremrangebylex : function ( key, min, max, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZREMRANGEBYLEX', arguments );
            }
            return encode( 'ZREMRANGEBYLEX', key, [ min, max ], parseIntArray, cback );
        }

        , zremrangebyrank : function ( key, start, stop, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZREMRANGEBYRANK', arguments );
            }
            return encode( 'ZREMRANGEBYRANK', key, [ start, stop ], parseIntArray, cback );
        }

        , zremrangebyscore : function ( key, min, max, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZREMRANGEBYSCORE', arguments );
            }
            return encode( 'ZREMRANGEBYSCORE', key, [ min, max ], parseIntArray, cback );
        }
        
        , zrevrange : function ( key, start, stop, withscores, cback ) {
            var me = this
                , ws = withscores
                , list = [ start, stop ]
                ;
            if ( ! key ) {
                return error( 'ZREVRANGE', arguments );
            }
            return encode( 'ZREVRANGE', key, ws ? list.concat( 'WITHSCORES' ) : list, null, cback );
        }

        , zrevrangebyscore : function ( key, start, stop, withscores, limit, cback ) {
            var me = this
                , ws = withscores
                , list = [ start, stop ]
                , l = isArray( limit )
                ;
            if ( ! key ) {
                return error( 'ZREVRANGEBYSCORE', arguments );
            }
            if ( ws ) {
                list.push( 'WITHSCORES' );
            }
            if ( l ) {
                list = list.concat( 'LIMIT' ).concat( limit );
            }
            return encode( 'ZREVRANGEBYSCORE', key, list, null, cback );
        }

        , zrevrank : function ( key, member, cback ) {
            var me = this
                ;
            if ( key && member ) {
                // NOTE : it returns an integer reply or null/nil ($-1 bulk reply)
                return encode( 'ZREVRANK', key, member, parseIntArray, cback );
            }
            return error( 'ZREVRANK', arguments );
        }

        , zscan : function ( key, cursor, opt, cback ) {
            var me = this
                , list = opt
                , match = null
                , count = null
                ;

            if ( ! key || isNaN( + cursor ) ) {
                return error( 'ZSCAN', arguments );
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
                    return encode( 'ZSCAN', key, cursor, list, null, cback );
                break;
                default:
                    return error( 'ZSCAN', arguments );
                break;
            };
        }

        , zscore : function ( key, member, cback ) {
            var me = this
                ;
            if ( key && member ) {
                // NOTE : it returns a double precision float, represented as string
                return encode( 'ZSCORE', key, member, parseFloatArray, cback );
            }
            return error( 'ZSCORE', arguments );
        }

        , zunionstore : function ( dest, keys, weights, aggregate, cback ) {
            var me = this
                , k = isArray( keys )
                , klen = 0
                , w = isArray( keys )
                , opt = aggregate
                , list = null
                ;
            if ( k && w && ( ( klen = k.length ) === w.length ) ) {
                list = [ klen ].concat( keys ).concat( [ 'WEIGHTS' ].concat( weights ) );
                if ( toString( opt ) === ooo.str ) {
                    list.push( 'AGGREGATE', opt );
                }
                return encode( 'ZUNIONSTORE', dest, list, parseIntArray, cback );
            }
            return error( 'ZUNIONSTORE', arguments );
        }

    };

};