/*
 * CONNECTION info mix-ins.
 */

exports.infos = ( function () {

    return {

        auth : {
            rtype : '+'
            , since : [ 1, 0, 0 ]
            , hint : 'AUTH password'
        }

        , echo : {
            rtype : '$'
            , since : [ 1, 0, 0 ]
            , hint : 'ECHO message'
        }

        , ping : {
            rtype : '+'
            , since : [ 1, 0, 0 ]
            , hint : 'PING'
        }

        , quit : {
            rtype : '+'
            , since : [ 1, 0, 0 ]
            , hint : 'QUIT'
            , always : [ 'OK' ]
        }

        , select : {
            rtype : '$'
            , since : [ 1, 0, 0 ]
            , hint :'SELECT index'
        }

    };

} )();