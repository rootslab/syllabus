#!/usr/bin/env node

/* 
 * Syllabus, #wrap lua scripts commands test.
 */

exports.test = function ( done, assertions ) {

    var log = console.log
        , util = require( 'util' )
        , inspect = util.inspect
        , Bolgia = require( 'bolgia' )
        , toString = Bolgia.toString
        , count = Bolgia.count
        , ooo = Bolgia.circles
        , oobj = ooo.obj
        , Syllabus = require( '../' )()
        // commands
        , lua = Syllabus.lua
        // a function wrapper
        , fn = function( ocmd ) {
            --c;
            log( '  > cmd %s: %s.', inspect( cnt, false, 1, true ), inspect( ocmd.ecmd || ocmd.cmd, false, 1, true ) );
        }
        , c = 0
        , cnt = 0
        , scan = function ( hash ) {
            var h = null
                ;
            for ( h in hash ) {
                if ( toString( hash[ h ] ) === oobj ) {
                    scan( hash[ h ] );
                    continue;
                }
                ++c;
                ++cnt;
                hash[ h ]();
            }
        }
        , exit = typeof done === 'function' ? done : function () {}
        ;

    log( '- #wrap Syllabus LUA script commands with a dummy function.' );

    lua.wrap( fn );

    log( '- scan Syllabus.lua.script and encode without arguments.' );

    scan( lua.script );

    log( '- check number of command scanned. should be: %s.', inspect( count( lua.script, true ), false, 1, true ) );
    assertions.isEqual( cnt, count( lua.script, true ) );

    log( '- check if all LUA script methods have been wrapped.' );
    assertions.isEqual( c, 0 );

    exit();
};