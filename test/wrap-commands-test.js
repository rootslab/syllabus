#!/usr/bin/env node

/* 
 * Syllabus, #wrap commands test.
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
        , commands = Syllabus.commands
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

    log( '- #wrap Syllabus commands with a dummy function.' );

    Syllabus.wrap( fn );

    log( '- scan all Syllabus.commands and encode without arguments.' );

    scan( commands );

    log( '- check number of command scanned. should be: %s.', inspect( count( commands, true ), false, 1, true ) );
    assertions.isEqual( cnt, count( commands, true ) );

    log( '- check if all commands have been wrapped.' );
    assertions.isEqual( c, 0 );

    exit();

};