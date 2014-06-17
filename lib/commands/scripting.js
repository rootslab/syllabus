/*
 * SCRIPTING mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , Bolgia = require( 'bolgia' )
        , parseIntArray = Abaco.parseIntArray
        , toString = Bolgia.toString
        , ooo = Bolgia.circles
        ;

    return {

        eval : function ( script, keys, args, cback ) {
            var me = this
                , s = toString( script ) === ooo.str
                , k = toString( keys ) === ooo.arr
                , a = toString( args ) === ooo.arr
                , list = null
                ;
            if ( s && k && a ) {
                list = [ keys.length ].concat( keys ).concat( args );
                return encode( 'EVAL', script, list, null, cback );
            }
            return error( 'EVAL', arguments );
        }

        , evalsha : function ( sha, keys, args, cback ) {
            var me = this
                , s = toString( sha ) === ooo.str
                , k = toString( keys ) === ooo.arr
                , a = toString( args ) === ooo.arr
                , list = null
                , result = null
                ;
            if ( s && k && a ) {
                list = [ keys.length ].concat( keys ).concat( args );
                result = encode( 'EVALSHA', sha, list, null, cback );
                result.isEvalSHA = 1;
                return result;
            }
            return error( 'EVALSHA', arguments );
        }

        , script : {

            exists : function ( scripts, cback ) {
                var me = this
                    ;
                if ( ! scripts ) {
                    return error( 'SCRIPT EXISTS', arguments );
                }
                return encode( 'SCRIPT','EXISTS', scripts, parseIntArray, cback );
            }

            , flush : function ( cback ) {
                var me = this
                    ;
                return encode( 'SCRIPT','FLUSH', null, cback );
            }

            , kill : function ( cback ) {
                var me = this
                    ;
                return encode( 'SCRIPT', 'KILL', null, cback );
            }

            , load : function ( script, cback ) {
                var me = this
                    ;
                if ( ! script ) {
                    return error( 'SCRIPT LOAD', arguments );
                }
                return encode( 'SCRIPT', 'LOAD', script, null, cback );
            }

        }

    };

};