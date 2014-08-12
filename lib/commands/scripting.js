/*
 * SCRIPTING mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , Bolgia = require( 'bolgia' )
        , parseIntArray = Abaco.parseIntArray
        , doString = Bolgia.doString
        , ooo = Bolgia.circles
        , oarr = ooo.arr
        , ostr = ooo.str
        ;

    return {

        eval : function ( script, keys, args, cback ) {
            var s = doString( script ) === ostr
                , k = doString( keys ) === oarr
                , a = doString( args ) === oarr
                , list = null
                ;
            if ( s && k && a ) {
                list = [ keys.length ].concat( keys ).concat( args );
                return encode( 'EVAL', script, list, null, cback );
            }
            return error( 'EVAL', arguments );
        }

        , evalsha : function ( sha, keys, args, cback ) {
            var s = doString( sha ) === ostr
                , k = doString( keys ) === oarr
                , a = doString( args ) === oarr
                , list = null
                , result = null
                ;
            if ( s && k && a ) {
                list = [ keys.length ].concat( keys ).concat( args );
                result = encode( 'EVALSHA', sha, list, null, cback );
                result.isEvalSHA = 1;
                result.digest = sha;
                return result;
            }
            return error( 'EVALSHA', arguments );
        }

        , script : {

            exists : function ( scripts, cback ) {
                if ( ! scripts ) return error( 'SCRIPT EXISTS', arguments );
                return encode( 'SCRIPT','EXISTS', scripts, parseIntArray, cback );
            }

            , flush : function ( cback ) {
                return encode( 'SCRIPT','FLUSH', null, cback );
            }

            , kill : function ( cback ) {
                return encode( 'SCRIPT', 'KILL', null, cback );
            }

            , load : function ( script, cback ) {
                if ( ! script ) return error( 'SCRIPT LOAD', arguments );
                return encode( 'SCRIPT', 'LOAD', script, null, cback );
            }

        }

    };

};