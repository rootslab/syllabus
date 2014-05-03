/*
 * TRANSACTIONS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , isArray = Array.isArray
        ;

    return {

        discard : function () {
            var me = this
                ;
            return encode( 'DISCARD' );
        }

        , exec : function () {
            var me = this
                ;
            return encode( 'EXEC' );
        }

        , multi : function () {
            var me = this
                ;
            return encode( 'MULTI' );
        }

        , unwatch : function () {
            var me = this
                ;
            return encode( 'UNWATCH' );
        }

        , watch : function ( keys ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'WATCH', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'WATCH', keys.shift(), keys );
            }
            return encode( 'WATCH', keys );
        }

    };

};