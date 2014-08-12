module.exports = ( function () {
    var fs = require( 'fs' )
        , util = require( 'util' )
        , Bolgia = require( 'bolgia' )
        , Camphora = require( 'camphora' )
        , Sermone = require( 'sermone' )
        , slice = Array.prototype.slice
        , improve = Bolgia.improve
        , ooo = Bolgia.circles
        , ostr = ooo.str
        , oarr = ooo.arr
        , ofun = ooo.fun
        , doString = Bolgia.doString
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
                , wfn = function ( f, eat ) {
                    return function () {
                        eat( f.apply( f, arguments ) );
                    };
                }
                ;
            for ( h in hash ) {
                if ( doString( hash[ h ] ) === ooo.obj ) {
                    wrap( hash[ h ], eat );
                    continue;
                }
                hash[ h ] = wfn( hash[ h ], eat );
            }
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
            if ( cache_cfg ) lua_cache = Camphora( cache_cfg );
            // set cache property
            me.cache = lua_cache;
            fs.readdir( file_cfg.filepath, function ( err, files ) {
                if ( err ) return next( [ error( 'SCRIPT LOAD', arguments, err.message ) ] );
                var flen = files.length
                    , list = []
                    , k = 0
                    , j = 0
                    ;
                files.forEach( function ( el ) {
                    lua_cache.load( el, file_cfg, function ( err, entry ) {
                        var script = entry ? ( entry.data ? entry.data + '' : null ) : null
                            ;
                        // empty script or error
                        if ( ! script ) {
                            if ( err ) list.push( error( 'SCRIPT LOAD', arguments, err.message ) );
                            else {
                                // empty script, delete from cache
                                lua_cache.delete( entry.kdigest || entry.key );
                                list.push( error( 'SCRIPT LOAD', arguments, '"' + el + '" script is an empty file.' ) );
                            }
                        } else {
                            list.push( encode( 'SCRIPT', 'LOAD', script, null, function ( is_err_reply, data ) {
                                var digest = data + ''
                                    ;
                                // Redis returns error, delete entry from cache and return
                                if ( is_err_reply ) lua_cache.delete( entry.kdigest || entry.key );
                                // on script load callback
                                onLoad( is_err_reply, entry.key, digest, script, ++j === flen );
                            } ) );
                        }
                        if ( ++k === flen ) next( list );
                    } );
                } );
            } );
        }
        , script : {
            flush : function ( cback, fback ) {
                var next = typeof fback === 'function' ? fback : emptyFn
                    ;
                if ( lua_cache ) next( lua_cache.clear() );
                else next();
                return encode( 'SCRIPT','FLUSH', null, cback );
            }
            , load : function ( key, data, cback, lback ) {
                var next = typeof lback === 'function' ? lback : emptyFn
                    ;
                if ( ! key || ! data ) {
                    next();
                    return error( 'SCRIPT LOAD', arguments, emsg_wa );
                }
                next( lua_cache.update( key, data ) );
                return encode( 'SCRIPT', 'LOAD', data, null, cback );
            }
            , run : function ( sname, keys, args, cback ) {
                var s = doString( sname ) === ostr
                    , k = doString( keys ) === oarr
                    , a = doString( args ) === oarr
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
                , fn = doString( eat ) === ofun ? eat : null
                ;
            if ( ! fn ) return false;
            if ( script ) {
                wrap( script, fn );
                return true;
            }
            return false;
        }
    };

} )();