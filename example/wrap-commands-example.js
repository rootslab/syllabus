#!/usr/bin/env node

/* 
 * Syllabus, wrap commands with a function.
 */

var log = console.log
    , util = require( 'util' )
    , Syllabus = require( '../' )()
    // commands
    , commands = Syllabus.commands
    // a function wrapper for commands results
    , fn = function( ocmd ) {
        log( '- wrapper gets argument:\n', util.inspect( ocmd, false, 1, true ), '\n' );
    }
    ;

log( '\n- wrapping Syllabus commands with a dummy function..' );

Syllabus.wrap( fn );

commands.ping();