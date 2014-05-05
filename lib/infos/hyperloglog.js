/*
 * HYPERLOGLOG info mix-ins.
 */

exports.infos = ( function () {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , isArray = Array.isArray
        ;

    return {

        pfadd : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : [ 2, 8, 9 ]
            , hint : 'DISCARD'
        }

        , pfcount : {
            rtype : ':'
            , always : [ 'OK' ]
            , since : [ 2, 8, 9 ]
            , hint : 'DISCARD'
        }

        , pfmerge : {
            rtype : '$'
            , always : [ 'OK' ]
            , since : [ 2, 8, 9 ]
            , hint : 'DISCARD'
        }

    };

} )();