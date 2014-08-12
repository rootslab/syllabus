/*
 * SETS info mix-ins.
 */

exports.infos = ( function () {

    return {

        sadd : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'SADD key member [member ...]'
             , descr : 'Add one or more members to a set.'
       }

        , scard : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'SCARD key'
            , descr : 'Get the number of members in a set.'
        }

        , sdiff : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'SDIFF key [key ...]'
            , descr : 'Subtract multiple sets.'
        }

        , sdiffstore : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'SDIFFSTORE destination key [key ...]'
            , descr : 'Subtract multiple sets and store the resulting set in a key.'
        }

        , sinter : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'SINTER key [key ...]'
            , descr : 'Intersect multiple sets.'
        }

        , sinterstore : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'SINTERSTORE destination key [key ...]'
            , descr : 'Intersect multiple sets and store the resulting set in a key.'
        }

        , sismember : {
            rtype : ':'
            , always: [ 0, 1 ]
            , since : '1.0.0'
            , hint : 'SISMEMBER key member'
            , descr : 'Determine if a given value is a member of a set.'
        }

        , smembers : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'SMEMBERS key'
            , descr : 'Get all the members in a set.'
        }

        , smove : {
            rtype : ':'
            , always: [ 0, 1 ]
            , since : '1.0.0'
            , hint : 'SMOVE source destination member'
            , descr : 'Move a member from one set to another.'
        }

        , spop : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'SPOP key'
            , descr : 'Remove and return a random member from a set.'
        }

        , srandmember : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'SRANDMEMBER key [count]'
            , descr : 'Get one or multiple random members from a set.'
        }

        , srem : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'SREM key member [member ...]'
            , descr : 'Remove one or more members from a set.'
        }

        , sscan : {
            rtype : '*'
            , since : '2.8.0'
            , hint : 'SSCAN key cursor [MATCH pattern] [COUNT count]'
            , descr : 'Incrementally iterate Set elements.'
        }

        , sunion : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'SUNION key [key ...]'
            , descr : 'Add multiple sets.'
        }

        , sunionstore : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'SUNIONSTORE destination key [key ...]'
            , descr : 'Add multiple sets and store the resulting set in a key.'
        }

    };

} ) ();