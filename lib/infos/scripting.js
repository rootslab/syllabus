/*
 * SCRIPTING info mix-ins.
 */

exports.infos = ( function () {

    return {

        eval : {
            rtype : '*'
            , since : '2.6.0'
            , hint : 'EVAL script numkeys key [key ...] arg [arg ...]'
            , descr : 'Execute a Lua script server side.'
        }

        , evalsha : {
            rtype : '*'
            , since : '2.6.0'
            , hint : 'EVALSHA sha1 numkeys key [key ...] arg [arg ...]'
            , descr : 'Execute a Lua script server side.'
        }

        , script : {

            exists : {
                rtype : '*'
                , since : '2.6.0'
                , hint : 'SCRIPT EXISTS script [script ...]'
                , descr : 'Check existence of scripts in the script cache.'
            }

            , flush : {
                rtype : '+'
                , since : '2.6.0'
                , hint : 'SCRIPT FLUSH'
                , descr : 'Remove all the scripts from the script cache.'
            }

            , kill : {
                rtype : '+'
                , since : '2.6.0'
                , hint : 'SCRIPT KILL'
                , descr : 'Kill the script currently in execution.'
            }

            , load : {
                rtype : '$'
                , since : '2.6.0'
                , hint : 'SCRIPT LOAD script'
                , descr : 'Load the specified Lua script into the script cache.'
            }

        }

    };

} )();