/*
 * SORTED SETS mix-ins.
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
        , isArray = Array.isArray
        ;

    return {

        zadd : function ( key, scores ) {
            var me = this
                , list = scores
                , p = null
                ;
            if ( ! key ) {
                return error( 'ZADD', arguments );
            }
            switch ( toString( scores ) ) {
                case ooo.obj:
                    list = toArray( scores );
                case ooo.arr:
                    return encode( 'ZADD', key, list, parseInt );
                break;
                default:
                    return error( 'ZADD', arguments );
                break;
            };
        }

        , zcard : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZCARD', arguments );
            }
            return encode( 'ZCARD', key, parseInt );
        }

        , zcount : function ( key, min, max ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZCOUNT', arguments );
            }
            return encode( 'ZCOUNT', key, [ min, max ], parseInt );
        }

        , zincrby : function ( key, float, member ) {
            var me = this
                , f = float ? float : '0'
                ;
            if ( key && member ) {
                // NOTE : it returns a double precision float, represented as string
                return encode( 'ZINCRBY', key, [ f, member ], parseFloat );
            }
            return error( 'ZINCRBY', arguments );
        }

        , zinterstore : function ( dest, keys, weights, aggregate ) {
            var me = this
                , k = isArray( keys )
                , klen = 0
                , w = isArray( keys )
                , opt = aggregate
                , list = null
                ;
            if ( k && w && ( ( klen = k.length ) === w.length ) ) {
                list = [ klen ].concat( keys ).concat( [ 'WEIGHTS' ].concat( weights ) );
                if ( opt && ( toString( aggr ) === ooo.str ) ) {
                    list.push( 'AGGREGATE', opt );
                }
                return encode( 'ZINTERSTORE', dest, list, parseInt );
            }
            return error( 'ZINTERSTORE', arguments );
        }

        , zlexcount : function ( key, min, max ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZLEXCOUNT', arguments );
            }
            return encode( 'ZLEXCOUNT', key, [ min, max ], parseInt );
        }

        , zrange : function ( key, start, stop, withscores ) {
            var me = this
                , ws = withscores
                , list = [ start, stop ]
                ;
            if ( ! key ) {
                return error( 'ZRANGE', arguments );
            }
            return encode( 'ZRANGE', key, ws ? list.concat( 'WITHSCORES' ) : list );
        }

        , zrangebylex : function ( key, min, max, limit ) {
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
            return encode( 'ZRANGEBYLEX', key, list );
        }

        , zrangebyscore : function ( key, min, max, withscores, limit ) {
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
            return encode( 'ZRANGEBYSCORE', key, list );
        }

        , zrank : function ( key, member ) {
            var me = this
                ;
            if ( key && member ) {
                // NOTE : it returns an integer reply or null/nil ($-1 bulk reply)
                return encode( 'ZRANK', key, member, parseInt );
            }
            return error( 'ZRANK', arguments );
        }

        , zrem : function ( key, members ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZREM', arguments );
            }
            return encode( 'ZREM', key, members, parseInt );
        }

        , zremrangebylex : function ( key, min, max ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZREMRANGEBYLEX', arguments );
            }
            return encode( 'ZREMRANGEBYLEX', key, [ min, max ], parseInt );
        }

        , zremrangebyrank : function ( key, start, stop ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZREMRANGEBYRANK', arguments );
            }
            return encode( 'ZREMRANGEBYRANK', key, [ start, stop ], parseInt );
        }

        , zremrangebyscore : function ( key, min, max ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'ZREMRANGEBYSCORE', arguments );
            }
            return encode( 'ZREMRANGEBYSCORE', key, [ min, max ], parseInt );
        }
        
        , zrevrange : function ( key, start, stop, withscores ) {
            var me = this
                , ws = withscores
                , list = [ start, stop ]
                ;
            if ( ! key ) {
                return error( 'ZREVRANGE', arguments );
            }
            return encode( 'ZREVRANGE', key, ws ? list.concat( 'WITHSCORES' ) : list );
        }

        , zrevrangebyscore : function ( key, start, stop, withscores, limit ) {
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
            return encode( 'ZREVRANGEBYSCORE', key, list );
        }

        , zrevrank : function ( key, member ) {
            var me = this
                ;
            if ( key && member ) {
                // NOTE : it returns an integer reply or null/nil ($-1 bulk reply)
                return encode( 'ZREVRANK', key, member, parseInt );
            }
            return error( 'ZREVRANK', arguments );
        }

        , zscan : function ( key, cursor, opt ) {
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
                    return encode( 'ZSCAN', key, cursor, list );
                break;
                default:
                    return error( 'ZSCAN', arguments );
                break;
            };
        }

        , zscore : function ( key, member ) {
            var me = this
                ;
            if ( key && member ) {
                // NOTE : it returns a double precision float, represented as string
                return encode( 'ZSCORE', key, member, parseFloat );
            }
            return error( 'ZSCORE', arguments );
        }

        , zunionstore : function ( dest, keys, weights, aggregate ) {
            var me = this
                , k = isArray( keys )
                , klen = 0
                , w = isArray( keys )
                , opt = aggregate
                , list = null
                ;
            if ( k && w && ( ( klen = k.length ) === w.length ) ) {
                list = [ klen ].concat( keys ).concat( [ 'WEIGHTS' ].concat( weights ) );
                if ( opt && ( toString( aggr ) === ooo.str ) ) {
                    list.push( 'AGGREGATE', opt );
                }
                return encode( 'ZUNIONSTORE', dest, list, parseInt );
            }
            return error( 'ZUNIONSTORE', arguments );
        }

    };

};