#!/usr/bin/env node

/* 
 * Syllabus, #wrap lua scripts commands test.
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
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
        };
    }
    ;

log( '- #wrap Syllabus LUA script commands with a dummy function.' );

lua.wrap( fn );

log( '- scan Syllabus.lua.script.' );

scan( lua.script );

log( '- check number of command scanned. should be:', count( lua.script, true ) );
assert.equal( cnt, count( lua.script, true ) );

log( '- check if all LUA script methods have been wrapped.' );
assert.equal( c, 0 );
