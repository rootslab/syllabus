/*
 * HYPERLOGLOG mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , isArray = Array.isArray
        ;

    return {

        pfadd : function ( key, elements, cback ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PFADD', arguments );
            }
            return encode( 'PFADD', key, elements, parseInt, cback );
        }

        , pfcount : function ( keys, cback ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'PFCOUNT', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'PFCOUNT', keys.slice( 0, 1 ), keys.slice( 1 ), parseInt, cback );
            }
            return encode( 'PFCOUNT', keys, parseInt, cback );
        }

        , pfmerge : function ( dest, sources, cback ) {
            var me = this
                ;
            if ( ! dest ) {
                return error( 'PFMERGE', arguments );
            }
            return encode( 'PFMERGE', dest, sources, null, cback );
        }

    };

};
