/*
 * TRANSACTIONS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , isArray = Array.isArray
        ;

    return {

        discard : function ( cback ) {
            var me = this
                ;
            return encode( 'DISCARD', null, cback );
        }

        , exec : function ( cback ) {
            var me = this
                ;
            return encode( 'EXEC', null, cback );
        }

        , multi : function ( cback ) {
            var me = this
                ;
            return encode( 'MULTI', null, cback );
        }

        , unwatch : function ( cback ) {
            var me = this
                ;
            return encode( 'UNWATCH', null, cback );
        }

        , watch : function ( keys, cback ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'WATCH', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'WATCH', keys.shift(), keys, null, cback );
            }
            return encode( 'WATCH', keys, null, cback );
        }

    };

};