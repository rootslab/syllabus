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
        , emptyFn = function () {}
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
        // options for Camphora constructor
        , camphora_opt = {
            capacity : 128
            , encrypt_keys : false
            , algorithm : 'sha1'
            , output_encoding : 'hex'
            , input_encoding : 'binary'
        }
        // options for Camphora#load.
        , file_load_opt = {
            // set encoding to utf8
            encoding : 'utf8'
            , flag : 'r'
            , payload : true
            , filepath : __dirname + '/scripts'
        }
        , lua_cache = Camphora( camphora_opt )
        ;

    return {
        cache : null
        // load LUA scripts from filesystem
        , init : function ( cback, lback, file_opt, cache_init_opt ) {
            var me = this
                , file_cfg = improve( file_opt || {}, file_load_opt )
                , cache_cfg = cache_init_opt ? improve( cache_init_opt, camphora_opt ) : null
                , next = typeof cback === 'function' ? cback : emptyFn
                , onLoad = typeof lback === 'function' ? lback : emptyFn
                ;
            if ( cache_cfg ) {
                lua_cache = Camphora( cache_cfg );
            }
            // set cache property
            me.cache = lua_cache;
            fs.readdir( file_cfg.filepath, function ( err, files ) {
                if ( err ) return next( [ error( 'SCRIPT LOAD', arguments, err.message ) ] );
                var flen = files.length
                    , list = []
                    , k = 0
                    ;
                files.forEach( function ( el, i, arr ) {
                    lua_cache.load( el, file_cfg, function ( err, entry ) {
                        var script = entry ? ( entry.data ? entry.data + '' : null ) : null
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
                            list.push( encode( 'SCRIPT', 'LOAD', script, null, function ( is_err_reply, data ) {
                                var digest = data + ''
                                    ;
                                if ( is_err_reply ) {
                                    // Redis returns error, delete entry from cache and return
                                    lua_cache.delete( entry.kdigest );
                                }
                                // on script load callback
                                onLoad( is_err_reply, entry.key, digest, script, i === arr.length - 1 );
                            } ) );
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
                if ( lua_cache ) lua_cache.clear();
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
            , run : function ( sname, keys, args, cback ) {
                var me = this
                    , s = toString( sname ) === ooo.str
                    , k = toString( keys ) === ooo.arr
                    , a = toString( args ) === ooo.arr
                    , list = null
                    , result = null
                    , entry = s ? lua_cache.read( sname ) : {}
                    , ddigest = entry.ddigest
                    ;
                if ( ! ddigest ) {
                    // evict empty element if inserted, age is set to -1
                    if ( entry.age ) lua_cache.evict( sname );
                    return error( 'EVALSHA', arguments, 'no data was found for script "' + sname + '"' );
                }

                if ( s && k && a ) {
                    list = [ keys.length ].concat( keys ).concat( args );
                    result = encode( 'EVALSHA', ddigest, list, null, cback );
                    result.isEvalSHA = 1;
                    result.digest = ddigest;
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