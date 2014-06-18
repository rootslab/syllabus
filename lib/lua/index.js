module.exports = ( function () {
    var log = console.log
        , fs = require( 'fs' )
        , util = require( 'util' )
        , Bolgia = require( 'bolgia' )
        , Camphora = require( 'camphora' )
        , Sermone = require( 'sermone' )
        , slice = Array.prototype.slice
        , improve = Bolgia.improve
        , ooo = Bolgia.circles
        , toString = Bolgia.toString
        , encode = Sermone.encode
         // fn to build a reply obj with error
        , emsg_wa = 'wrong number/type of arguments for "%s" command.'
        , error = function ( cname, cargs, emsg ) {
            return {
                cmd : cname
                , arg : slice.call( cargs )
                , err : new Error( util.format( 'Syllabus LUA Cache, %s: %s', cname, emsg ) )
            };
        }
        , wrap = function ( hash, eat ) {
            var h = null
                ;
            for ( h in hash ) {
                if ( toString( hash[ h ] ) === ooo.obj ) {
                    wrap( hash[ h ], eat );
                    continue;
                }
                hash[ h ] = ( function ( f ) {
                    return function () {
                        eat( f.apply( f, arguments ) );
                    };
                } )( hash[ h ] );
            };
        }
        , lua_cache = Camphora( {
            capacity : 128
        } )
        // Camphora file #load defualt options
        , file_load_opt = {
            payload : true
            , basename : true
        }
        ;

    return {
        cache : function () {
            return lua_cache;
        }
        // load lua script from filesystem
        , init : function ( cback, opt ) {
            var cfg = improve( opt || {}, file_load_opt )
                , next = typeof cback === 'function' ? cback : function () {}
                ;
            fs.readdir( __dirname + '/scripts', function ( err, files ) {
                if ( err ) return next( [ error( 'SCRIPT LOAD', arguments, err.message ) ] );
                var flen = files.length
                    , list = []
                    , k = 0
                    ;
                files.forEach( function ( el, i, arr ) {
                    lua_cache.load( __dirname + '/scripts/' + el, cfg, function ( err, entry ) {
                        var script = entry ? entry.data + '' : null
                            ;
                        // empty script or error
                        if ( ! script ) {
                            if ( err ) {
                                list.push( error( 'SCRIPT LOAD', arguments, err.message ) );
                            } else {
                                // empty script, delete from cache
                                lua_cache.delete( entry.kdigest );
                                list.push( error( 'SCRIPT LOAD', arguments, '"' + el + '" script is an empty file.' ) );
                            }
                        } else {
                            list.push( encode( 'SCRIPT', 'LOAD', script ) );
                        }
                        if ( ++k === flen ) {
                            next( list );
                        }
                    } );
                } );
            } );
        }
        , script : {
            flush : function ( cback ) {
                var me = this
                    ;
                lua_cache.clear();
                return encode( 'SCRIPT','FLUSH', null, cback );
            }
            , load : function ( key, data, cback ) {
                var me = this
                    ;
                if ( ! key || ! data ) {
                    return error( 'SCRIPT LOAD', arguments, emsg_wa );
                }
                lua_cache.update( key, data );
                return encode( 'SCRIPT', 'LOAD', data, null, cback );
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
        , wrap : function ( eat ) {
            var me = this
                , script = me.script
                , fn = toString( eat ) === ooo.fun ? eat : null
                ;
            if ( ! fn ) {
                return false;
            }
            if ( script ) {
                wrap( script, fn );
                return true;
            }
            return false;
        }
    };

} )();