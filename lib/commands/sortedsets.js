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
                f = float ? float : '0'
                ;
            if ( key && member ) {
                // NOTE : it returns a double precision float, represented as string
                return encode( 'ZINCRBY', key, [ f, member ], parseFloat );
            }
            return error( 'ZINCRBY', arguments );
        }

        // TODO
        , zinterstore : function () {
            var me = this
                ;
            return error( 'ZINTERSTORE', 'TODO' );
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

        // TODO
        , zrangebylex : function () {
            var me = this
                ;
            return error( 'ZRANGEBYLEX', 'TODO' );
        }

        // TODO
        , zrangebyscore : function () {
            var me = this
                ;
            return error( 'ZRANGEBYSCORE', 'TODO' );
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

        // TODO
        , zrevrangebyscore : function () {
            var me = this
                ;
            return error( 'ZREVRANGEBYSCORE', 'TODO' );
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

        // TODO
        , zunionstore : function () {
            var me = this
                ;
            return error( 'ZUNIONSTORE', 'TODO' );
        }

    };

};