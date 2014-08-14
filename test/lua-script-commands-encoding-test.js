#!/usr/bin/env node

/* 
 * Syllabus, lua scripts commands test.
 */

exports.test = function ( done, assertions ) {

    var log = console.log
        , crypto = require( 'crypto' )
        , util = require( 'util' )
        , Syllabus = require( '../' )()
        // commands
        , lua = Syllabus.lua
        , result = null
        , cmd = null
        , sname = 'script_name'
        , sdata = 'script_data'
        , ddigest = crypto.createHash( 'sha1' ).update( sdata, 'binary' ).digest( 'hex' )
        , keys = [ 1, 2, 3 ]
        , args = [ 'a', 'b', 'c' ]
        , list = [ keys.length ].concat( keys ).concat( args )
        // empty fn
        , fn = function () {}
        , exit = typeof done === 'function' ? done : function () {}
        ;

    log( '- execute Syllabus.lua.script#load( %s, %s, %s )', sname, sdata, fn );
    result = lua.script.load( sname, sdata, fn );

    log( '- check if SCRIPT LOAD result is properly encoded.' );
    cmd = Syllabus.encode( 'SCRIPT', 'LOAD', sdata, null, fn );
    assertions.isDeepEqual( result, cmd );

    log( '- LUA cache should be hidden (null) until #init is called.' );
    assertions.isEqual( lua.cache, null );

    log( '- execute lua.script#run with a script name that is present in the lua.cache.' );
    result = lua.script.run( sname, keys, args, null, fn );

    log( '- execute lua.script#run and check encoded EVALSHA command (correct data digest).' );
    cmd = Syllabus.encode( 'EVALSHA', ddigest, list, null, fn );
    // now compare results
    assertions.isDeepEqual( result.ecmd, cmd.ecmd );

    log( '- execute lua.script#run with a script name that is not present in the LUA cache.' );
    result = lua.script.run( 'script_no_name', [], [], null, fn );

    log( '- result should contain an Error property.' );
    assertions.isOK( result.err instanceof Error );

    log( '- execute Syllabus.lua.script#flush.' );
    result = lua.script.flush( fn );

    log( '- check if SCRIPT FLUSH result is properly encoded.' );
    assertions.isDeepEqual( result, Syllabus.encode( 'SCRIPT', 'FLUSH', null, fn ) );

    exit();

};