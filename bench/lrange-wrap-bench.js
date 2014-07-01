#!/usr/bin/env node

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , syllabus = require( '../' )()
    , commands = syllabus.commands
    , key = 'KEY_FOR_LRANGE'
    , args = [ 0, 99 ]
    , fn = function ( v ) { return v; }
    , zn = function ( v ) { return v; }
    , i = 0
    , l = 1024 * 1024
    , stime = 0
    , etime = 0
    , result = commands.lrange( key, args[ 0 ], args[ 1 ], fn, zn )
    , gbits = 0
    , cnt = 0
    , list = []
    ;

log( '- #wrap Syllabus commands with a function that mimics command sending.' );

log( '- run LRANGE command %d times', l );

// dummy function for sending commands
syllabus.wrap( function ( ocmd ) {
    if ( ocmd.err ) {
        // emit error
    }
    // push command to client command queue
    list.push( ocmd );
    // if ready write to socket
    // ..
    if ( ++cnt === l ) {
        etime = ( Date.now() - stime ) / 1000;
        gbits = result.ecmd.length * l / 128 / 1024 / 1024;

        log( '- time elapsed: %d secs', etime );
        log( '- total data encoded: %d Gbits', gbits.toFixed( 3 ) );
        log( '- data encoding rate: %d Gbit/sec', ( gbits / etime ).toFixed( 3 ) );
        log( '- operation rate: %d Kops/sec', ( l / etime / 1024 ).toFixed( 2 ) );
    }
} );

stime = Date.now();

for ( ; i < l; ++i ) {
    commands.lrange( key, args[ 0 ], args[ 1 ], fn, zn );
};