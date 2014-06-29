#!/usr/bin/env node

/* 
 * Syllabus development mode test
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Bolgia = require( 'bolgia' )
    , ooo = Bolgia.circles
    , toString = Bolgia.toString
    , Syllabus = require( '../' )
    , commands = null
    , t = null
    , v1 = '1.0.0'
    , n = 0
    , k = 0
    ;

log( '- creating a syllabus in development mode with string %s.', v1 );

t = Syllabus( v1 );
commands = t.commands;

log( '- check existence of #encode, #stick and #size methods.' );

assert.ok( toString( t.encode ) === ooo.fun );
assert.ok( toString( t.stick ) === ooo.fun );
assert.ok( toString( t.size ) === ooo.fun );

log( '- run #stick to add #info to all commands.' );

n = t.stick();

log( '- check existence of #info for all commands.' );

var scan = function ( obj, otype ) {
    var c = null
        , cmd = null
        ;
    for ( c in obj ) {
        cmd = obj[ c ];
        // log( c, toString( cmd.info ) === ooo.fun )
        if ( toString( cmd ) === ooo.obj ) {
            scan( cmd, otype );
            continue;
        }
        ++k;
        assert.ok( toString( cmd.info ) === otype, util.inspect( cmd, false, 1, true ) );
    };
};

scan( commands, ooo.fun );

log( '- check the number of scanned commands, expected (%d).', t.size().commands );

assert.ok( k, n );
assert.ok( t.size().commands, k );

log( '- run #unstick to remove #info method property from all commands (%d).', t.size().commands );

assert.ok( t.stick( 0 ), n );

log( '- check if #info was removed from all commands.' );

scan( commands, ooo.und );