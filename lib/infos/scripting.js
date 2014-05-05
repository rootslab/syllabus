/*
 * SCRIPTING info mix-ins.
 */

exports.infos = ( function () {

    return {

        eval : {
            rtype : '*'
            , since : [ 2, 6, 0 ]
            , hint : 'EVAL script numkeys key [key ...] arg [arg ...]'
        }

        , evalsha : {
            rtype : '*'
            , since : '2.6.0'
            , hint : 'EVALSHA sha1 numkeys key [key ...] arg [arg ...]'
        }

        , script : {

            exists : {
                rtype : '*'
                , since : [ 2, 6, 0 ]
                , hint : 'SCRIPT EXISTS script [script ...]'
            }

            , flush : {
                rtype : '+'
                , since : [ 2, 6, 0 ]
                , hint : 'SCRIPT FLUSH'
            }

            , kill : {
                rtype : '+'
                , since : [ 2, 6, 0 ]
                , hint : 'SCRIPT KILL'
            }

            , load : {
                rtype : '$'
                , since : [ 2, 6, 0 ]
                , hint : 'DISCARD'
            }

        }

    };

} )();