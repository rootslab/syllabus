/*
 * TRANSACTIONS info mix-ins.
 */

exports.infos = ( function () {

    return {

        append : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'APPEND key value'
            , descr : 'Append a value to a key.'
        }

        , bitcount : {
            rtype : ':'
            , since : '2.6.0'
            , hint : 'BITCOUNT key [start] [end]'
            , descr : 'Count set bits in a string.'
        }

        , bitop : {

            and : {
                rtype : ':'
                , since : '2.6.0'
                , hint : 'BITOP AND destkey srckey1 srckey2 srckey3 ... srckeyN'
                , descr : 'Perform an AND bitwise operation between multiple keys (containing string values) and store the result in the destination key.'
                , url : 'http://redis.io/commands/bitop'
            }

            , or : {
                rtype : ':'
                , since : '2.6.0'
                , hint : 'BITOP OR destkey srckey1 srckey2 srckey3 ... srckeyN'
                , descr : 'Perform an OR bitwise operation between multiple keys (containing string values) and store the result in the destination key..'
                , url : 'http://redis.io/commands/bitop'
            }

            , xor : {
                rtype : ':'
                , since : '2.6.0'
                , hint : 'BITOP XOR destkey srckey1 srckey2 srckey3 ... srckeyN'
                , descr : 'Perform a XOR bitwise operation between multiple keys (containing string values) and store the result in the destination key..'
                , url : 'http://redis.io/commands/bitop'
            }

            , not : {
                rtype : ':'
                , since : '2.6.0'
                , hint : 'BITOP NOT destkey srckey'
                , descr : 'Perform a NOT bitwise operation between multiple keys (containing string values) and store the result in the destination key..'
                , url : 'http://redis.io/commands/bitop'
            }

        }

        , bitpos : {
            rtype : ':'
            , since : '2.8.7'
            , hint : 'BITPOS key bit [start] [end]'
            , descr : 'Find first bit set or clear in a string.'
        }

        , decr : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'DECR key'
            , descr : 'Decrement the integer value of a key by one.'
        }

        , decrby : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'DECRBY key decrement'
            , descr : 'Decrement the integer value of a key by the given number.'
        }

        , get : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'GET key'
            , descr : 'Get the value of a key.'
        }

        , getbit : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'GETBIT key offset'
            , descr : 'Returns the bit value at offset in the string value stored at key.'
        }

        , getrange : {
            rtype : '$'
            , since : '2.4.0'
            , hint : 'GETRANGE key start end'
            , descr : 'Get a substring of the string stored at a key.'
        }

        , getset : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'GETRANGE key value'
            , descr : 'Set the string value of a key and return its old value.'
        }

        , incr : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'INCR key'
            , descr : 'Increment the integer value of a key by one.'
        }

        , incrby : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'INCRBY key increment'
            , descr : 'Increment the integer value of a key by the given amount.'
        }

        , incrbyfloat : {
            rtype : '+'
            , since : '2.6.0'
            , hint : 'INCRBYFLOAT key increment'
            , descr : 'Increment the float value of a key by the given amount.'
        }

        , mget : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'MGET key [key ...]'
            , descr : 'Get the values of all the given keys.'
        }

        , mset : {
            rtype : '+'
            , since : '1.0.1'
            , hint : 'MSET key value [key value ...]'
            , descr : 'Set multiple keys to multiple values.'
        }

        , msetnx : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.0.0'
            , hint : 'MSETNX key value [key value ...]'
            , descr : 'Set multiple keys to multiple values, only if none of the keys exist.'
        }

        , psetex : {
            rtype : '$'
            , since : '2.6.0'
            , hint : 'PSETEX key milliseconds value'
            , descr : 'Set the value and expiration in milliseconds of a key.'
        }

        , set : {
            rtype : '+|$'
            , since : '1.0.0'
            , hint : 'SET key value [EX seconds] [PX milliseconds] [NX|XX]'
            , descr : 'Set the string value of a key.'
        }

        , setbit : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'SETBIT key offset value'
            , descr : 'Sets or clears the bit at offset in the string value stored at key.'
        }

        , setex : {
            rtype : '$'
            , since : '2.0.0'
            , hint : 'SETEX key seconds value'
            , descr : 'Set the value and expiration of a key..'
        }

        , setnx : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '1.0.0'
            , hint : 'SETNX key value'
            , descr : 'Set the value of a key, only if the key does not exist.'
        }

        , setrange : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'SETRANGE key offset value'
            , descr : 'Overwrite part of a string at key starting at the specified offset.'
        }

        , strlen : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'STRLEN key'
            , descr : 'Get the length of the value stored in a key.'
        }

    };

} )();
