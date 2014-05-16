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

        eval : function ( script, keys, args, cback ) {
            var me = this
                , s = toString( script ) === ooo.str
                , k = toString( keys ) === ooo.arr
                , a = toString( args ) === ooo.arr
                , list = null
                ;
            if ( s && k && a ) {
                list = [ k.length ].concat( keys ).concat( args );
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
                ;
            if ( s && k && a ) {
                list = [ k.length ].concat( keys ).concat( args );
                return encode( 'EVALSHA', script, list, null, cback );
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
                return encode( 'SCRIPT','EXISTS', scripts, null, cback );
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
                    return error( 'SCRIPT LOAD', arguments, null, cback );
                }
                return encode( 'SCRIPT', 'LOAD', script, null, cback );
            }

        }

    };

};