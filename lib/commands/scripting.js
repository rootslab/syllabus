/*
 * SCRIPTING mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , parseFloat = Abaco.parseFloat
        , Bolgia = require( 'bolgia' )
        , toArray = Bolgia.toArray
        , toString = Bolgia.toString
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        ;

    return {

        eval : function ( script, keys, args ) {
            var me = this
                , s = toString( script ) === ooo.str
                , k = toString( keys ) === ooo.arr
                , a = toString( args ) === ooo.arr
                , list = null
                ;
            if ( s && k && a ) {
                list = [ k.length ].concat( keys ).concat( args );
                return encode( 'EVAL', script, list );
            }
            return error( 'EVAL', arguments );
        }

        , evalsha : function ( sha, keys, args ) {
            var me = this
                , s = toString( sha ) === ooo.str
                , k = toString( keys ) === ooo.arr
                , a = toString( args ) === ooo.arr
                , list = null
                ;
            if ( s && k && a ) {
                list = [ k.length ].concat( keys ).concat( args );
                return encode( 'EVALSHA', script, list );
            }
            return error( 'EVALSHA', arguments );
        }

        , script : {

            exists : function ( scripts ) {
                var me = this
                    ;
                if ( ! scripts ) {
                    return error( 'SCRIPT EXISTS', arguments );
                }
                return encode( 'SCRIPT','EXISTS', scripts );
            }

            , flush : function () {
                var me = this
                    ;
                return encode( 'SCRIPT','FLUSH' );
            }

            , kill : function () {
                var me = this
                    ;
                return encode( 'SCRIPT', 'KILL' );
            }

            , load : function ( script ) {
                var me = this
                    ;
                if ( ! script ) {
                    return error( 'SCRIPT LOAD', arguments );
                }
                return encode( 'SCRIPT', 'LOAD', script );
            }

        }

    };

};