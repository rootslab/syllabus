/*
 * SERVER info mix-ins.
 */

exports.infos = ( function () {

    return {

        bgrewriteaof : {
            rtype : '$'
            , always : [ 'OK' ]
            , since : '1.0.0'
            , hint : 'BGREWRITEAOF'
            , descr : 'Asynchronously rewrite the append-only file.'
        }

        , bgsave : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'BGSAVE'
            , descr : 'Asynchronously save the dataset to disk.'
        }

        , client : {

            kill : {
                rtype : '+'
                , since : '2.4.0'
                , hint : 'CLIENT KILL ip:port'
                , descr : 'Kill the connection of a client.'
            }

            , getname : {
                rtype : '$'
                , since : '2.6.9'
                , hint : 'CLIENT GETNAME'
                , descr : 'Get the current connection name.'
            }

            , list : {
                rtype : '$'
                , since : '2.4.0'
                , hint : 'CLIENT LIST'
                , descr : 'Get the list of client connections.'
            }

            , pause : {
                rtype : '+'
                , since : '2.9.50'
                , hint : 'CLIENT PAUSE timeout'
                , descr : 'Stop processing commands from clients for some time.'
            }

            , setname : {
                rtype : '+'
                , since : '2.6.9'
                , hint : 'CLIENT SETNAME connection-name'
                , descr : 'Set the current connection name.'
            }

        }
        , cluster :{
            slots : {
                rtype : '*'
                , since : '3.0.0'
                , hint : 'CLUSTER SLOTS'
                , descr : 'Get array of Cluster slot to node mappings'
            }
        }
        // use COMMAND LIST instead of COMMAND 
        , command : {

            // list, a placeholder for COMMAND
            list : {
                rtype : '*'
                , since : '2.8.13'
                , hint : 'COMMAND'
                , descr : 'Get array of Redis command details'
            }

            , count : {
                rtype : ':'
                , since : '2.8.13'
                , hint : 'COMMAND COUNT'
                , descr : 'Get total number of Redis commands.'
            }

            , getkeys : {
                rtype : '*'
                , since : '2.8.13'
                , hint : 'COMMAND GETKEYS MSET a b c d e f'
                , descr : 'Extract keys given a full Redis command.'
            }

            , info : {
                rtype : '*'
                , since : '2.8.13'
                , hint : 'COMMAND INFO command-name [command-name ...]'
                , descr : 'Get array of specific Redis command details.'
            }
        }

        , config : {

            get : {
                rtype : '*'
                , since : '2.0.0'
                , hint : 'CONFIG GET parameter'
                , descr : 'Get the value of a configuration parameter.'
            }

            , resetstat : {
                rtype : '+'
                , since : '2.0.0'
                , hint : 'CONFIG RESETSTAT'
                , descr : 'Asynchronously rewrite the append-only file.'
            }

            , rewrite : {
                rtype : '+'
                , since : '2.8.0'
                , hint : 'CONFIG REWRITE'
                , descr : 'Rewrite the configuration file with the in memory configuration.'
            }

            , set : {
                rtype : '+'
                , since : '2.0.0'
                , hint : 'CONFIG SET parameter value'
                , descr : 'Set a configuration parameter to the given value.'
            }

        }

        , dbsize : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'DBSIZE'
            , descr : 'Return the number of keys in the selected database.'
        }

        , debug : {

            object : {
                rtype : '+'
                , since : '1.0.0'
                , hint : 'DEBUG OBJECT key'
                , descr : 'Get debugging information about a key. It should not be used by clients. Check the OBJECT command instead.'
            }

            , segfault : {
                rtype : '+'
                , since : '2.0.0'
                , hint : 'DEBUG SEGFAULT'
                , descr : 'Make the server crash.'
            }

        }

        , flushall : {
            rtype : '+'
            , always : [ 'OK' ]
            , since : '1.0.0'
            , hint : 'FLUSHALL'
            , descr : 'Remove all keys from all databases.'
        }

        , flushdb : {
            rtype : '+'
            , always : [ 'OK' ]
            , since : '1.0.0'
            , hint : 'FLUSHDB'
            , descr : 'Remove all keys from the current database.'
        }

        , info : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'INFO [section]'
            , descr : 'Get information and statistics about the server.'
        }

        , lastsave : {
            rtype : ':'
            , since : '1.0.0'
            , hint : 'LASTSAVE'
            , descr : 'Get the UNIX time stamp of the last successful save to disk.'
        }

        , monitor : {
            rtype : '*'
            , since : '1.0.0'
            , hint : 'MONITOR'
            , descr : 'Listen for all requests received by the server in real time.'
        }

        , role : {
            rtype : '*'
            , since : '2.8.12'
            , hint : 'ROLE'
            , descr : 'Return the role of the instance in the context of replication.'
        }

        , save : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'SAVE'
            , descr : 'Synchronously save the dataset to disk'
        }

        , shutdown : {
            rtype : '+'
            , since : '2.0.0'
            , hint : 'SHUTDOWN [NOSAVE] [SAVE]'
            , descr : 'Synchronously save the dataset to disk and then shut down the server.'
        }

        , slaveof : {
            rtype : '+'
            , since : '1.0.0'
            , hint : 'SLAVEOF host port'
            , descr : 'Make the server a slave of another instance, or promote it as master.'
        }

        , slowlog : {

            get : {
                rtype : '*'
                , since : '2.2.12'
                , hint : 'SLOWLOG GET [argument]'
                , descr : 'Read the Redis slow queries log.'
                , url : 'http://redis.io/commands/slowlog'
            }

            , len : {
                rtype : ':'
                , since : '2.2.12'
                , hint : 'SLOWLOG LEN'
                , descr : 'Get the Redis slow queries log length.'
                , url : 'http://redis.io/commands/slowlog'
            }

            , reset : {
                rtype : '$'
                , always : [ 'OK' ]
                , since : '2.2.12'
                , hint : 'SLOWLOG RESET'
                , descr : 'Reset the Redis slow queries log.'
                , url : 'http://redis.io/commands/slowlog'
           }

        }

        , sync : {
            rtype : 'raw data'
            , since : '2.0.0'
            , hint : 'SYNC'
            , descr : 'Internal command used for replication.'
        }

        , time : {
            rtype : '*'
            , since : '2.6.0'
            , hint : 'TIME'
            , descr : 'Return the current server time.'
        }

    };

} )();