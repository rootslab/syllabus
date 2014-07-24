/*
 * SORTED SETS info mix-ins.
 */

exports.infos = ( function () {

    return {

        zadd : {
            rtype : ':'
            , since : '1.2.0'
            , hint : 'ZADD key score member [score member ...]'
            , descr : 'Add one or more members to a sorted set, or update its score if it already exists.'
             , action : [ 'read', 'write' ]
       }

        , zcard : {
            rtype : ':'
            , since : '1.2.0'
            , hint : 'ZCARD key'
            , descr : 'Get the number of members in a sorted set.'
            , action : [ 'read' ]
        }

        , zcount : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'ZCOUNT key min max'
            , descr : 'Count the members in a sorted set with scores within the given values.'
            , action : [ 'read' ]
        }

        , zincrby : {
            rtype : '$'
            , since : '1.2.0'
            , hint : 'ZINCRBY key increment member'
            , descr : 'Increment the score of a member in a sorted set.'
            , action : [ 'read', 'write' ]
        }

        , zinterstore : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]'
            , descr : 'Intersect multiple sorted sets and store the resulting sorted set in a new key.'
            , action : [ 'read', 'write' ]
        }

        , zlexcount : {
            rtype : ':'
            , since : '2.8.9'
            , hint : 'ZLEXCOUNT key min max'
            , descr : 'Count the number of members in a sorted set between a given lexicographical range.'
            , action : [ 'read' ]
        }

        , zrange : {
            rtype : '*'
            , since : '1.2.0'
            , hint : 'ZRANGE key start stop [WITHSCORES]'
            , descr : 'Return a range of members in a sorted set, by index.'
            , action : [ 'read' ]
        }

        , zrangebylex : {
            rtype : '*'
            , since : '2.8.9'
            , hint : 'Return a range of members in a sorted set, by lexicographical range'
            , descr : 'ZRANGEBYLEX key min max [LIMIT offset count].'
            , action : [ 'read' ]
        }

        , zrangebyscore : {
            rtype : '*'
            , since : '1.0.5'
            , hint : 'ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]'
            , descr : 'Return a range of members in a sorted set, by score.'
            , action : [ 'read' ]
        }

        , zrank : {
            rtype : ':|$'
            , since : '2.0.0'
            , hint : 'ZRANK key member'
            , descr : 'Determine the index of a member in a sorted set.'
            , action : [ 'read' ]
        }

        , zrem : {
            rtype : ':'
            , since : '1.2.0'
            , hint : 'ZREM key member [member ...]'
            , descr : 'Remove one or more members from a sorted set.'
            , action : [ 'read', 'write' ]
        }

        , zremrangebylex : {
            rtype : ':'
            , since : '2.8.9'
            , hint : 'ZREMRANGEBYLEX key min max'
            , descr : 'Remove all members in a sorted set between the given lexicographical range.'
            , action : [ 'read', 'write' ]
        }

        , zremrangebyrank : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'ZREMRANGEBYRANK key start stop'
            , descr : 'Remove all members in a sorted set within the given indexes.'
            , action : [ 'read', 'write' ]
        }

        , zremrangebyscore : {
            rtype : ':'
            , since : '1.2.0'
            , hint : 'ZREMRANGEBYSCORE key min max'
            , descr : 'Remove all members in a sorted set within the given scores.'
            , action : [ 'read', 'write' ]
        }
        
        , zrevrange : {
            rtype : '*'
            , since : '1.2.0'
            , hint : 'ZREVRANGE key start stop [WITHSCORES]'
            , descr : 'Return a range of members in a sorted set, by index, with scores ordered from high to low.'
            , action : [ 'read' ]
        }

        , zrevrangebyscore : {
            rtype : '*'
            , since : '2.2.0'
            , hint : 'ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]'
            , descr : 'Return a range of members in a sorted set, by score, with scores ordered from high to low.'
            , action : [ 'read' ]
        }

        , zrevrank : {
            rtype : ':|$'
            , since : '2.0.0'
            , hint : 'ZREVRANK key member'
            , descr : 'Determine the index of a member in a sorted set, with scores ordered from high to low.'
            , action : [ 'read' ]
        }

        , zscan : {
            rtype : '*'
            , since : '2.8.0'
            , hint : 'ZSCAN key cursor [MATCH pattern] [COUNT count]'
            , descr : 'Incrementally iterate sorted sets elements and associated scores.'
            , action : [ 'read' ]
        }

        , zscore : {
            rtype : '$'
            , since : '1.2.0'
            , hint : 'ZSCORE key member'
            , descr : 'Get the score associated with the given member in a sorted set.'
            , action : [ 'read' ]
        }

        , zunionstore : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]'
            , descr : 'Add multiple sorted sets and store the resulting sorted set in a new key.'
            , action : [ 'read', 'write' ]
        }

    };

} )();