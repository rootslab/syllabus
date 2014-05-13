/*
 * TRANSACTIONS info mix-ins.
 */

exports.infos = ( function () {

    return {

        blpop : {
            rtype : '$'
            , since : '2.0.0'
            , hint : 'BLPOP key [key ...] timeout'
            , descr : 'Remove and get the first element in a list, or block until one is available.'
        }

        , brpop : {
            rtype : '$'
            , since : '2.0.0'
            , hint : 'BRPOP key [key ...] timeout'
            , descr : 'Remove and get the last element in a list, or block until one is available.'
        }

        , brpoplpush : {
            rtype : '$'
            , since : '2.2.0'
            , hint : 'BRPOPLPUSH source destination timeout'
            , descr : 'Pop a value from a list, push it to another list and return it; or block until one is available.'
        }

        , lindex : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'LINDEX key index'
            , descr : 'Get an element from a list by its index.'
        }

        , linsert : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'LINSERT key BEFORE|AFTER pivot value'
            , descr : 'Insert an element before or after another element in a list.'
        }

        , llen : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'LLEN key'
            , descr : 'Get the length of a list.'
        }

        , lpop : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'LPOP key'
            , descr : 'Remove and get the first element in a list.'
        }

        , lpush : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'LPUSH key value [value ...]'
            , descr : 'Prepend one or multiple values to a list.'
        }

        , lpushx : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'LPUSHX key value'
            , descr : 'Prepend a value to a list, only if the list exists.'
        }

        , lrange : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'LRANGE key start stop'
            , descr : 'Get a range of elements from a list.'
        }

        , lrem : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'LREM key count value'
            , descr : 'Remove elements from a list.'
        }

        , lset : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'LSET key index value'
            , descr : 'Set the value of an element in a list by its index.'
        }

        , ltrim : {
            rtype : '+'
            , since : '1.0.0'
            , hint : 'LTRIM key start stop'
            , descr : 'Trim a list to the specified range.'
        }

        , rpop : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'RPOP key'
            , descr : 'Remove and get the last element in a list.'
        }

        , rpoplpush : {
            rtype : '$'
            , since : '1.2.0'
            , hint : 'RPOPLPUSH source destination'
            , descr : 'Remove the last element in a list, append it to another list and return it.'
        }

        , rpush : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'RPUSH key value [value ...]'
            , descr : 'Append one or multiple values to a list.'
        }

        , rpushx : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'RPUSHX key value [value ...]'
            , descr : 'Append a value to a list, only if the list exists.'
        }

    };

} )();