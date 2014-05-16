/*
 * HYPERLOGLOG mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
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
                return encode( 'PFCOUNT', keys.shift(), keys, parseInt, cback );
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
