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
                , result = encode( 'DISCARD', null, cback )
                ;
            // set special command shortcut
            result.isDiscard = 1;
            return result;
        }

        , exec : function ( cback ) {
           var me = this
                , result = encode( 'EXEC', null, cback )
                ;
            // set special command shortcut
            result.isExec = 1;
            return result;
        }

        , multi : function ( cback ) {
            var me = this
                , result = encode( 'MULTI', null, cback )
                ;
            // set special command shortcut
            result.isMulti = 1;
            return result;
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
                return encode( 'WATCH', keys.slice( 0, 1 ), keys.slice( 1 ), null, cback );
            }
            return encode( 'WATCH', keys, null, cback );
        }

    };

};