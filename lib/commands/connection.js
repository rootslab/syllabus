/*
 * CONNECTION mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , isArray = Array.isArray
        ;

    return {

        auth : function ( passwd ) {
            var me = this
                ;
            return encode( 'AUTH', passwd );
        }

        , echo : function ( message ) {
            var me = this
                ;
            if ( ! message ) {
                return error( 'ECHO', arguments );
            }
            return encode( 'ECHO', message );
        }

        , ping : function () {
            var me = this
                ;
            return encode( 'PING' );
        }

        , quit : function () {
            var me = this
                ;
            return encode( 'QUIT' );
        }

        , select : function ( db ) {
            var me = this
                ;
            return encode( 'SELECT', db );
        }

    };

};