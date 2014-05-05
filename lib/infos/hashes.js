/*
 * HASHES info mix-ins.
 */

exports.infos = ( function () {
        ;

    return {

        hdel : {
            rtype : ':'
            , since : [ 2, 0, 0 ]
            , hint : 'HDEL key field [field ...]'
        }

        , hexists : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : [ 2, 0, 0 ]
            , hint : 'HEXISTS key field'
        }

        , hget : {
            rtype : '$'
            , since : [ 2, 0, 0 ]
            , hint : 'HGET key field'
        }

        , hgetall : {
            rtype : '*'
            , since : [ 2, 0, 0 ]
            , hint : 'HGETALL key'
        }

        , hincrby : {
            rtype : ':'
            , since : [ 2, 0, 0 ]
            , hint : 'HINCRBY key field increment'
        }

        , hincrbyfloat : {
            rtype : '$'
            , since : [ 2, 6, 0 ]
            , hint : 'HINCRBYFLOAT key field increment'
        }

        , hkeys : {
            rtype : '*'
            , since : [ 2, 0, 0 ]
            , hint : 'HKEYS key'
        }

        , hlen : {
            rtype : ':'
            , since : [ 2, 0, 0 ]
            , hint : 'HLEN key'
        }

        , hmget : {
            rtype : '*'
            , since : [ 2, 0, 0 ]
            , hint : 'HMGET key field [field ...]'
        }

        , hmset : {
            rtype : '+'
            , since : [ 2, 0, 0 ]
            , hint : 'HMSET key field value [field value ...]'
        }

        , hscan : {
            rtype : '*'
            , since : [ 2, 8, 0 ]
            , hint : 'HSCAN key cursor [MATCH pattern] [COUNT count]'
        }

        , hset : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : [ 2, 0, 0 ]
            , hint : 'HSET key field value'
        }

        , hsetnx : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : [ 2, 0, 0 ]
            , hint : 'HSETNX key field value'
        }

        , hvals : {
            rtype : '*'
            , since : [ 2, 0, 0 ]
            , hint : 'HVALS key'
        }

    };

} ) ();