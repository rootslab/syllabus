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
            , action : [ 'read', 'write' ]
       }

        , bitcount : {
            rtype : ':'
            , since : '2.6.0'
            , hint : 'BITCOUNT key [start] [end]'
            , descr : 'Count set bits in a string.'
            , action : [ 'read' ]
        }

        , bitop : {

            and : {
                rtype : ':'
                , since : '2.6.0'
                , hint : 'BITOP AND destkey srckey1 srckey2 srckey3 ... srckeyN'
                , descr : 'Perform an AND bitwise operation between multiple keys (containing string values) and store the result in the destination key.'
                , url : 'http://redis.io/commands/bitop'
                , action : [ 'read' ]
            }

            , or : {
                rtype : ':'
                , since : '2.6.0'
                , hint : 'BITOP OR destkey srckey1 srckey2 srckey3 ... srckeyN'
                , descr : 'Perform an OR bitwise operation between multiple keys (containing string values) and store the result in the destination key..'
                , url : 'http://redis.io/commands/bitop'
                , action : [ 'read' ]
            }

            , xor : {
                rtype : ':'
                , since : '2.6.0'
                , hint : 'BITOP XOR destkey srckey1 srckey2 srckey3 ... srckeyN'
                , descr : 'Perform a XOR bitwise operation between multiple keys (containing string values) and store the result in the destination key..'
                , url : 'http://redis.io/commands/bitop'
                , action : [ 'read' ]
            }

            , not : {
                rtype : ':'
                , since : '2.6.0'
                , hint : 'BITOP NOT destkey srckey'
                , descr : 'Perform a NOT bitwise operation between multiple keys (containing string values) and store the result in the destination key..'
                , url : 'http://redis.io/commands/bitop'
                , action : [ 'read' ]
            }

        }

        , bitpos : {
            rtype : ':'
            , since : '2.8.7'
            , hint : 'BITPOS key bit [start] [end]'
            , descr : 'Find first bit set or clear in a string.'
            , action : [ 'read' ]
        }

        , decr : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'DECR key'
            , descr : 'Decrement the integer value of a key by one.'
            , action : [ 'read', 'write' ]
        }

        , decrby : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'DECRBY key decrement'
            , descr : 'Decrement the integer value of a key by the given number.'
            , action : [ 'read', 'write' ]
        }

        , get : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'GET key'
            , descr : 'Get the value of a key.'
            , action : [ 'read' ]
        }

        , getbit : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'GETBIT key offset'
            , descr : 'Returns the bit value at offset in the string value stored at key.'
            , action : [ 'read' ]
        }

        , getrange : {
            rtype : '$'
            , since : '2.4.0'
            , hint : 'GETRANGE key start end'
            , descr : 'Get a substring of the string stored at a key.'
            , action : [ 'read' ]
        }

        , getset : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'GETRANGE key value'
            , descr : 'Set the string value of a key and return its old value.'
            , action : [ 'read', 'write' ]
        }

        , incr : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'INCR key'
            , descr : 'Increment the integer value of a key by one.'
            , action : [ 'read', 'write' ]
        }

        , incrby : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'INCRBY key increment'
            , descr : 'Increment the integer value of a key by the given amount.'
            , action : [ 'read', 'write' ]
        }

        , incrbyfloat : {
            rtype : '+'
            , since : '2.6.0'
            , hint : 'INCRBYFLOAT key increment'
            , descr : 'Increment the float value of a key by the given amount.'
            , action : [ 'read', 'write' ]
        }

        , mget : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'MGET key [key ...]'
            , descr : 'Get the values of all the given keys.'
            , action : [ 'read' ]
        }

        , mset : {
            rtype : '+'
            , since : '1.0.1'
            , hint : 'MSET key value [key value ...]'
            , descr : 'Set multiple keys to multiple values.'
            , action : [ 'read', 'write' ]
        }

        , msetnx : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.0.0'
            , hint : 'MSETNX key value [key value ...]'
            , descr : 'Set multiple keys to multiple values, only if none of the keys exist.'
            , action : [ 'read', 'write' ]
        }

        , psetex : {
            rtype : '$'
            , since : '2.6.0'
            , hint : 'PSETEX key milliseconds value'
            , descr : 'Set the value and expiration in milliseconds of a key.'
            , action : [ 'read', 'write' ]
        }

        , set : {
            rtype : '+|$'
            , since : '1.0.0'
            , hint : 'SET key value [EX seconds] [PX milliseconds] [NX|XX]'
            , descr : 'Set the string value of a key.'
            , action : [ 'read', 'write' ]
        }

        , setbit : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'SETBIT key offset value'
            , descr : 'Sets or clears the bit at offset in the string value stored at key.'
            , action : [ 'read', 'write' ]
        }

        , setex : {
            rtype : '$'
            , since : '2.0.0'
            , hint : 'SETEX key seconds value'
            , descr : 'Set the value and expiration of a key..'
            , action : [ 'read', 'write' ]
        }

        , setnx : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '1.0.0'
            , hint : 'SETNX key value'
            , descr : 'Set the value of a key, only if the key does not exist.'
            , action : [ 'read', 'write' ]
        }

        , setrange : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'SETRANGE key offset value'
            , descr : 'Overwrite part of a string at key starting at the specified offset.'
            , action : [ 'read', 'write' ]
        }

        , strlen : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'STRLEN key'
            , descr : 'Get the length of the value stored in a key.'
            , action : [ 'read' ]
        }

    };

} )();
