/*
 * HYPERLOGLOG mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , parseIntArray = Abaco.parseIntArray
        , isArray = Array.isArray
        ;

    return {

        pfadd : function ( key, elements, cback ) {
            if ( ! key ) return error( 'PFADD', arguments );
            return encode( 'PFADD', key, elements, parseIntArray, cback );
        }

        , pfcount : function ( keys, cback ) {
            if ( ! keys ) return error( 'PFCOUNT', arguments );
            if ( isArray( keys ) ) return encode( 'PFCOUNT', keys.slice( 0, 1 ), keys.slice( 1 ), parseIntArray, cback );
            return encode( 'PFCOUNT', keys, parseIntArray, cback );
        }

        , pfmerge : function ( dest, sources, cback ) {
            if ( ! dest ) return error( 'PFMERGE', arguments );
            return encode( 'PFMERGE', dest, sources, null, cback );
        }

        , pfselftest : function ( cback ) {
            return encode( 'PFSELFTEST', null, cback );
        }

    };

};
