/*
 * SETS info mix-ins.
 */

exports.infos = ( function () {
        ;

    return {

        sadd : {
            rtype : ':'
            , since : [ 1, 0, 0 ]
            , hint : 'SADD key member [member ...]'
        }

        , scard : {
            rtype : ':'
            , since : [ 1, 0, 0 ]
            , hint : 'SCARD key'
        }

        , sdiff : {
            rtype : '*'
            , since : [ 1, 0, 0 ]
            , hint : 'SDIFF key [key ...]'
        }

        , sdiffstore : {
            rtype : ':'
            , since : [ 1, 0, 0 ]
            , hint : 'SDIFFSTORE destination key [key ...]'
        }

        , sinter : {
            rtype : '*'
            , since : [ 1, 0, 0 ]
            , hint : 'SINTER key [key ...]'
        }

        , sinterstore : {
            rtype : ':'
            , since : [ 1, 0, 0 ]
            , hint : 'SINTERSTORE destination key [key ...]'
        }

        , sismember : {
            rtype : ':'
            , always: [ 0, 1 ]
            , since : [ 1, 0, 0 ]
            , hint : 'SISMEMBER key member'
        }

        , smembers : {
            rtype : '*'
            , since : [ 1, 0, 0 ]
            , hint : 'SMEMBERS key'
        }

        , smove : {
            rtype : ':'
            , always: [ 0, 1 ]
            , since : [ 1, 0, 0 ]
            , hint : 'SMOVE source destination member'
        }

        , spop : {
            rtype : '$'
            , since : [ 1, 0, 0 ]
            , hint : 'SPOP key'
        }

        , srandmember : {
            rtype : '$'
            , since : [ 1, 0, 0 ]
            , hint : 'SRANDMEMBER key [count]'
        }

        , srem : {
            rtype : ':'
            , since : [ 1, 0, 0 ]
            , hint : 'SREM key member [member ...]'
        }

        , sscan : {
            rtype : '*'
            , since : [ 2, 8, 0 ]
            , hint : 'SSCAN key cursor [MATCH pattern] [COUNT count]'
        }

        , sunion : {
            rtype : '*'
            , since : [ 1, 0, 0 ]
            , hint : 'SUNION key [key ...]'
        }

        , sunionstore : {
            rtype : ':'
            , since : [ 1, 0, 0 ]
            , hint : 'SUNIONSTORE destination key [key ...]'
        }

    };

} ) ();