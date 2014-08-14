#!/usr/bin/env node

/* 
 * Syllabus, #init cache test.
 */

exports.test = function ( done, assertions ) {

    var log = console.log
        , util = require( 'util' )
        , Syllabus = require( '../' )()
        // commands
        , lua = Syllabus.lua
        , sname = [ 'script_name_0', 'script_name_1', 'script_name_2' ]
        , sdata = 'script_data'
        // empty function
        , fn = function () {}
        // listeners
        , onFileProcessed = function (  is_err_reply, name, digest, txt, is_last ) {
        }
        , onCacheLoad = function ( commands ) {
            log( '- all script files have been loaded into the cache.' );
            assertions.isOK( lua.cache !== null );

            log( '- execute lua.script#load( %s, %s, %s )', sname[ 0 ], sdata, fn );
            lua.script.load( sname[ 0 ], sdata, fn, function ( entry ) {
                log( '- check script entry:', sname[ 0 ] );
                assertions.isDeepEqual( lua.cache.read( sname[ 0 ] ), entry );
            } )

            log( '- execute lua.script#load( %s, %s, %s )', sname[ 1 ], sdata, fn );
            lua.script.load( sname[ 1 ], sdata, fn, function ( entry ) {
                log( '- check script entry:', sname[ 1 ] );
                assertions.isDeepEqual( lua.cache.read( sname[ 1 ] ), entry );
            } );

            log( '- execute lua.script#load( %s, %s, %s )', sname[ 2 ], sdata, fn );
            lua.script.load( sname[ 2 ], sdata, fn, function ( entry ) {
                log( '- check script entry:', sname[ 2 ] );
                assertions.isDeepEqual( lua.cache.read( sname[ 2 ] ), entry );
            } );

            assertions.isOK( lua.cache.size()[ 0 ] >= 3 );

            log( '- execute Syllabus.lua.script#flush.' );
            lua.script.flush( fn, function ( k ) {
                log( '- check number of element evicted from cache (%d).', k );
                assertions.isOK( k >= 3 );
            } );

            log( '- check if the cache is empty.' );
            assertions.isOK( lua.cache.size()[ 0 ] = [ 0, 0 ] );
        }
        , file_opt = {
        }
        , cache_opt = {
        }
        , exit = typeof done === 'function' ? done : function () {}
        ;

    log( '- execute #init to initialize/reveal hidden LUA script cache.' );
    lua.init( onCacheLoad, onFileProcessed, file_opt, cache_opt );

    exit();

};