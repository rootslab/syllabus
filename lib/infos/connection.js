/*
 * CONNECTION info mix-ins.
 */

exports.infos = ( function () {

    return {

        auth : {
            rtype : '+'
            , since :'1.0.0'
            , hint : 'AUTH password'
            , descr : 'Authenticate to the server.'
        }

        , echo : {
            rtype : '$'
            , since : '1.0.0'
            , hint : 'ECHO message'
            , descr : 'Echo the given string.'
        }

        , ping : {
            rtype : '+|$|*'
            , since :'1.0.0'
            , hint : 'PING'
            , descr : 'Ping the server.'
        }

        , quit : {
            rtype : '+'
            , since : '1.0.0'
            , hint : 'QUIT'
            , always : [ 'OK' ]
            , descr : 'Close the connection.'
        }

        , select : {
            rtype : '$'
            , since : '1.0.0'
            , hint :'SELECT index'
            , descr : 'Change the selected database for the current connection.'
        }

    };

} )();