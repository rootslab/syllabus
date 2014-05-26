#!/usr/bin/env node

/* 
 * Syllabus, wrap commands with a funciton.
 */

var log = console.log
    , util = require( 'util' )
    // get Syllabus in develop mode
    , Syllabus = require( '../' )( true )
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