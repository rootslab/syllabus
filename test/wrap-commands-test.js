#!/usr/bin/env node

/* 
 * Syllabus, #wrap commands test.
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
    , commands = Syllabus.commands
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

log( '- #wrap Syllabus commands with a dummy function.' );

Syllabus.wrap( fn );

log( '- scan Syllabus.commands.' );

scan( commands );

log( '- check number of command scanned. should be:', count( commands, true ) );
assert.equal( cnt, count( commands, true ) );

log( '- check if all commands have been wrapped.' );
assert.equal( c, 0 );
