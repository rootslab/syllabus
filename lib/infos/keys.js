/*
 * KEYS info mix-ins.
 */

exports.infos = ( function () {

    return {

        del : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'DEL key [key ...]'
            , descr : 'Delete a key.'
            , action : [ 'read', 'write' ]
        }

        , dump : {
            rtype : '$'
            , since : '2.6.0'
            , hint : 'DUMP key'
            , descr : 'Return a serialized version of the value stored at the specified key..'
            , action : [ 'read' ]
        }

        , exists : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '1.0.0'
            , hint : 'EXISTS key'
            , descr : 'Determine if a key exists.'
            , action : [ 'read' ]
        }

        , expire : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '1.0.0'
            , hint : 'EXPIRE key seconds'
            , descr : 'Set a key\'s time to live in seconds.'
            , action : [ 'read', 'write' ]
        }

        , expireat : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '1.2.0'
            , hint : 'EXPIREAT key timestamp'
            , descr : 'Set the expiration for a key as a UNIX timestamp.'
            , action : [ 'read', 'write' ]
        }

        , keys : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'KEYS pattern'
            , descr : 'Find all keys matching the given pattern.'
            , action : [ 'read' ]
        }

        , migrate : {
            rtype : '+'
            , since : '2.6.0'
            , hint : 'MIGRATE host port key destination-db timeout [COPY] [REPLACE]'
            , descr : 'Atomically transfer a key from a Redis instance to another one.'
            , action : [ 'read', 'write' ]
        }

        , move : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '1.0.0'
            , hint : 'MOVE key db'
            , descr : 'Move a key to another database.'
            , action : [ 'read', 'write' ]
        }

        , object : {

            refcount : {
                rtype : ':'
                , since : '2.2.3'
                , hint : 'OBJECT REFCOUNT <key>'
                , descr : 'It returns the number of references of the value associated with the specified key. This command is mainly useful for debugging.'
                , url : 'http://redis.io/commands/object'
                , action : [ 'read' ]
            }

            , encoding : {
                rtype : '$'
                , since : '2.2.3'
                , hint : 'OBJECT ENCODING <key>'
                , descr : 'It returns the kind of internal representation used in order to store the value associated with a key.'
                , url : 'http://redis.io/commands/object'
                , action : [ 'read' ]
        }

            , idletime : {
                rtype : ':'
                , since : '2.2.3'
                , hint : 'OBJECT IDLETIME <key>'
                , descr : 'It returns the number of seconds since the object stored at the specified key is idle (not requested by read or write operations).'
                , url : 'http://redis.io/commands/object'
                , action : [ 'read' ]
            }

        }

        , persist : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.2.0'
            , hint : 'PERSIST key'
            , descr : 'Remove the expiration from a key.'
            , action : [ 'read', 'write' ]
        }

        , pexpire : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.6.0'
            , hint : 'PEXPIRE key milliseconds'
            , descr : 'Set a key\'s time to live in milliseconds.'
            , action : [ 'read', 'write' ]
        }

        , pexpireat : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.6.0'
            , hint : 'PEXPIREAT key milliseconds-timestamp'
            , descr : 'Set the expiration for a key as a UNIX timestamp specified in milliseconds.'
            , action : [ 'read', 'write' ]
        }

        , pttl : {
            rtype : ':'
            , since : '2.6.0'
            , hint : 'PTTL key'
            , descr : 'Get the time to live for a key in milliseconds.'
            , action : [ 'read' ]
        }

        , randomkey : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'RANDOMKEY'
            , descr : 'Return a random key from the keyspace.'
            , action : [ 'read' ]
        }

        , rename : {
            rtype : '+'
            , since : '1.0.0'
            , hint : 'RENAME key newkey'
            , descr : 'Rename a key.'
            , action : [ 'read', 'write' ]
        }

        , renamenx : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '1.0.0'
            , hint : 'RENAMENX key newkey'
            , descr : 'Rename a key, only if the new key does not exist.'
            , action : [ 'read', 'write' ]
        }

        , restore : {
            rtype : '+'
            , since : '2.6.0'
            , hint : 'RESTORE key ttl serialized-value'
            , descr : 'Create a key using the provided serialized value, previously obtained using DUMP.'
            , action : [ 'read', 'write' ]
        }

        , scan : {
            rtype : '*'
            , since : '2.8.0'
            , hint : 'SCAN cursor [MATCH pattern] [COUNT count]'
            , descr : 'Incrementally iterate the keys space.'
            , action : [ 'read' ]
        }

        , sort : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]'
            , descr : 'Sort the elements in a list, set or sorted set.'
            , action : [ 'read', 'write' ]
        }

        , ttl : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'TTL key'
            , descr : 'Get the time to live for a key.'
            , action : [ 'read' ]
        }

        , type : {
            rtype : '+'
            , since : '1.0.0'
            , hint : 'TYPE key'
            , descr : 'Determine the type stored at key.'
            , action : [ 'read' ]
        }

    };

} )();