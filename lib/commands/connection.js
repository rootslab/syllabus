/*
 * CONNECTION mix-ins.
 */

exports.commands = function ( encode, error ) {

    return {

        auth : function ( passwd, cback ) {
            var me = this
                , result = encode( 'AUTH', passwd, null, cback )
                ;
            // set special command shortcut
            result.isAuth = 1;
            return result;
        }

        , echo : function ( message, cback ) {
            var me = this
                ;
            if ( ! message ) {
                return error( 'ECHO', arguments );
            }
            return encode( 'ECHO', message, null, cback );
        }

        , ping : function ( cback ) {
            var me = this
                ;
            return encode( 'PING', null, cback );
        }

        , quit : function ( cback ) {
            var me = this
                , result = encode( 'QUIT', null, cback )
                ;
            // set special command shortcut
            result.isQuit = 1;
            return result;
        }

        , select : function ( db, cback ) {
            var me = this
                , result = encode( 'SELECT', db, null, cback )
                ;
            result.isSelect = 1;
            return result;
        }

    };

};