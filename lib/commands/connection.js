/*
 * CONNECTION mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , isArray = Array.isArray
        ;

    return {

        auth : function ( passwd, cback ) {
            var me = this
                ;
            return encode( 'AUTH', passwd, null, cback );
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
                ;
            return encode( 'QUIT', null, cback );
        }

        , select : function ( db, cback ) {
            var me = this
                ;
            return encode( 'SELECT', db, null, cback );
        }

    };

};