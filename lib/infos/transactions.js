/*
 * TRANSACTIONS info mix-ins.
 */

exports.infos = ( function () {

    return {

        discard : {
            rtype : '+'
            , always : [ 'OK' ]
            , since : '2.0.0'
            , hint : 'DISCARD'
            , descr : 'Discard all commands issued after MULTI.'
        }

        , exec : {
            rtype : '*'
            , since : '1.2.0'
            , hint : 'EXEC'
            , descr : 'Execute all commands issued after MULTI.'
        }

        , multi : {
            rtype : '+'
            , always : [ 'OK' ]
            , since : '1.2.0'
            , hint : 'MULTI'
            , descr : 'Mark the start of a transaction block.'
        }

        , unwatch : {
            rtype : '+'
            , always : [ 'OK' ]
            , since : '2.2.0'
            , hint : 'UNWATCH'
            , descr : 'Forget about all watched keys.'
        }

        , watch : {
            rtype : '+|$'
            , always : [ 'OK' ]
            , since : '2.2.0'
            , hint : 'WATCH key [key ...]'
            , descr : 'Watch the given keys to determine execution of the MULTI/EXEC block.'
        }

    };

} )();