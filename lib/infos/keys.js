/*
 * KEYS info mix-ins.
 */

exports.infos = ( function () {

    return {

        del : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'DEL key [key ...]'
        }

        , dump : {
            rtype : '$'
            , since : '2.6.0'
            , hint : 'DUMP key'
        }

        , exists : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'EXISTS key'
        }

        , expire : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'EXPIRE key seconds'
        }

        , expireat : {
            rtype : ':'
            , since : '1.2.0'
            , hint : 'EXPIREAT key timestamp'
        }
        
        , keys : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'KEYS pattern'
        }

        , migrate : {
            rtype : '+'
            , since : '2.6.0'
            , hint : 'MIGRATE host port key destination-db timeout [COPY] [REPLACE]'
        }

        , move : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'MOVE key db'
        }

        , object : {

            refcount : {
                rtype : ':'
                , since : '2.2.3'
                , hint : 'OBJECT REFCOUNT <key>'
            }

            , encoding : {
                rtype : '$'
                , since : '2.2.3'
                , hint : 'OBJECT ENCODING <key>'
            }

            , idletime : {
                rtype : ':'
                , since : '2.2.3'
                , hint : 'OBJECT IDLETIME <key>'
            }

        }

        , persist : {
            rtype : ':'
            , since : '2.2.0'
            , hint : 'PERSIST key'
        }

        , pexpire : {
            rtype : ':'
            , since : '2.6.0'
            , hint : 'PEXPIRE key milliseconds'
        }

        , pexpireat : {
            rtype : ':'
            , since : '2.6.0'
            , hint : 'PEXPIREAT key milliseconds-timestamp'
        }

        , pttl : {
            rtype : ':'
            , since : '2.6.0'
            , hint : 'PTTL key'
        }
        , randomkey : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'RANDOMKEY'
        }

        , rename : {
            rtype : '+'
            , since : '1.0.0'
            , hint : 'RENAME key newkey'
        }

        , renamenx : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'RENAMENX key newkey'
        }

        , restore : {
           rtype : '+'
            , since : '2.6.0'
            , hint : 'RESTORE key ttl serialized-value'
        }

        , scan : {
            rtype : '*'
            , since : '2.8.0'
            , hint : 'SCAN cursor [MATCH pattern] [COUNT count]'
        }

        , sort : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]'
        }

        , ttl : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'TTL key'
        }

        , type : {
            rtype : '+'
            , since : '1.0.0'
            , hint : 'TYPE key'
        }

    };

} )();