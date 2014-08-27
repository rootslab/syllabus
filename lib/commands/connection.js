/*
 * CONNECTION mix-ins.
 */

exports.commands = function ( encode, error ) {

    return {

        auth : function ( passwd, cback ) {
            var result = encode( 'AUTH', passwd, null, cback )
                ;
            // set special command shortcut
            result.isAuth = 1;
            return result;
        }

        , echo : function ( message, cback ) {
            return message ? encode( 'ECHO', message, null, cback ) : error( 'ECHO', arguments );
        }

        , ping : function ( message, cback ) {
            var legacy = ! message || ( typeof message === 'function' )
                // if legacy, send PING as usual, message is intepreted as the callback
                , result = legacy ? encode( 'PING', null, message ) : encode( 'PING', message, null, cback )
                ;
            // set special command shortcut
            result.isPing = 1;
            return result;
        }

        , quit : function ( cback ) {
            var result = encode( 'QUIT', null, cback )
                ;
            // set special command shortcut
            result.isQuit = 1;
            return result;
        }

        , select : function ( db, cback ) {
            var result = encode( 'SELECT', db, null, cback )
                ;
            // set special command shortcut
            result.isSelect = 1;
            return result;
        }

    };

};