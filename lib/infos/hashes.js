/*
 * HASHES info mix-ins.
 */

exports.infos = ( function () {

    return {

        hdel : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'HDEL key field [field ...]'
            , descr : 'Delete one or more hash fields.'
            , action : [ 'write'  ]
        }

        , hexists : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.0.0'
            , hint : 'HEXISTS key field'
            , descr : 'Determine if a hash field exists.'
            , action : [ 'read'  ]
        }

        , hget : {
            rtype : '$'
            , since : '2.0.0'
            , hint : 'HGET key field'
            , descr : 'Get the value of a hash field.'
            , action : [ 'read'  ]

        }

        , hgetall : {
            rtype : '*'
            , since : '2.0.0'
            , hint : 'HGETALL key'
            , descr : 'Get all the fields and values in a hash.'
            , action : [ 'read'  ]
        }

        , hincrby : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'HINCRBY key field increment'
            , descr : 'Increment the integer value of a hash field by the given number.'
            , action : [ 'read', 'write' ]
        }

        , hincrbyfloat : {
            rtype : '$'
            , since : '2.0.0'
            , hint : 'HINCRBYFLOAT key field increment'
            , descr : 'Increment the float value of a hash field by the given amount.'
            , action : [ 'read', 'write' ]
        }

        , hkeys : {
            rtype : '*'
            , since : '2.0.0'
            , hint : 'HKEYS key'
            , descr : 'Get all the fields in a hash.'
            , action : [ 'read' ]
        }

        , hlen : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'HLEN key'
            , descr : 'Get the number of fields in a hash.'
            , action : [ 'read' ]
        }

        , hmget : {
            rtype : '*'
            , since : '2.0.0'
            , hint : 'HMGET key field [field ...]'
            , descr : 'Get the values of all the given hash fields.'
            , action : [ 'read' ]
        }

        , hmset : {
            rtype : '+'
            , since : '2.0.0'
            , hint : 'HMSET key field value [field value ...]'
            , descr : 'Set multiple hash fields to multiple values.'
            , action : [ 'read', 'write' ]
        }

        , hscan : {
            rtype : '*'
            , since : '2.8.0'
            , hint : 'HSCAN key cursor [MATCH pattern] [COUNT count]'
            , descr : 'Incrementally iterate hash fields and associated values.'
            , action : [ 'read' ]
        }

        , hset : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.0.0'
            , hint : 'HSET key field value'
            , descr : 'Set the string value of a hash field.'
            , action : [ 'read', 'write' ]
        }

        , hsetnx : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.0.0'
            , hint : 'HSETNX key field value'
            , descr : 'Set the value of a hash field, only if the field does not exist.'
            , action : [ 'read', 'write' ]
        }

        , hvals : {
            rtype : '*'
            , since : '2.0.0'
            , hint : 'HVALS key'
            , descr : 'Get all the values in a hash.'
            , action : [ 'read' ]
        }

    };

} ) ();