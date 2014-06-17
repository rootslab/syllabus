module.exports = ( function () {
    var log = console.log
        , util = require( 'util' )
        , Bolgia = require( 'bolgia' )
        , Camphora = require( 'camphora' )
        , Sermone = require( 'sermone' )
        , slice = Array.prototype.slice
        , mix = Bolgia.mix
        , ooo = Bolgia.circles
        , toString = Bolgia.toString
        , encode = Sermone.encode
         // fn to build a reply obj with error
        , emsg_wa = 'wrong number/type of arguments for "%s" command.'
        , error = function ( cname, cargs, emsg ) {
            return {
                cmd : cname
                , arg : slice.call( cargs )
                , err : new Error( util.format( 'Syllabus LUA Cache, ' + emsg, cname ) )
            };
        }
        , lua_cache = Camphora( {
            capacity : 1024
        } )
        ;

    return {
        cache : function () {
            return lua_cache;
        }
        , scripts : {
            load : function ( key, data, cback ) {
                var me = this
                    ;
                if ( ! key || ! data ) {
                    return error( 'SCRIPT LOAD', arguments, emsg_wa );
                }
                lua_cache.update( key, data );
                return encode( 'SCRIPT', 'LOAD', data, null, cback );
            }
            , flush : function ( cback ) {
                var me = this
                    ;
                lua_cache.clear();
                return encode( 'SCRIPT','FLUSH', null, cback );
            }
            , run : function ( key, keys, args, cback ) {
                var me = this
                    , s = toString( key ) === ooo.str
                    , k = toString( keys ) === ooo.arr
                    , a = toString( args ) === ooo.arr
                    , list = null
                    , result = null
                    , entry = lua_cache.read( key )
                    , ddigest = entry.ddigest
                    ;

                if ( ! ddigest ) {
                    return error( 'EVALSHA', arguments, '"%s": no data was found for script "' + key + '"' );
                }

                if ( s && k && a ) {
                    list = [ keys.length ].concat( keys ).concat( args );
                    result = encode( 'EVALSHA', ddigest, list, null, cback );
                    result.isEvalSHA = 1;
                    return result;
                }
                return error( 'EVALSHA', arguments, emsg_wa );
            }
        }
    };

} )();