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
        }

        , exec : {
            rtype : '*'
            , since : '1.2.0'
            , hint : 'EXEC'
        }

        , multi : {
            rtype : '+'
            , always : [ 'OK' ]
            , since : '1.2.0'
            , hint : 'MULTI'
        }

        , unwatch : {
            rtype : '+'
            , always : [ 'OK' ]
            , since : '2.2.0'
            , hint : 'UNWATCH'
        }

        , watch : {
            rtype : '+|$'
            , always : [ 'OK' ]
            , since : '2.2.0'
            , hint : 'WATCH'
        }

    };

} )();