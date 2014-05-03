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

        pfadd : function ( key, elements ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'PFADD', arguments );
            }
            return encode( 'PFADD', key, elements, parseInt );
        }

        , pfcount : function ( keys ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'PFCOUNT', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'PFCOUNT', keys.shift(), keys );
            }
            return encode( 'PFCOUNT', keys, parseInt );
        }

        , pfmerge : function ( dest, sources ) {
            var me = this
                ;
            if ( ! dest ) {
                return error( 'PFMERGE', arguments );
            }
            return encode( 'PFMERGE', dest, sources );
        }

    };

};
