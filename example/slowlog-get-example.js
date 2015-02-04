#!/usr/bin/env node

/* 
 * Syllabus parse SLOWLOG GET reply example
 */

var log = console.log
    , util = require( 'util' )
    // get Syllabus in develop mode
    , Syllabus = require( '../' )()
    , commands = Syllabus.commands
    , isArray = Array.isArray
    // convert all items to Buffers
    , convert = function ( arr ) {
        var a = arr || []
            , alen = a.length
            , el = a[ 0 ]
            , i = 0
            ;
        for ( ; i < alen; el = a[ ++i ] ) {
            if ( isArray( el ) ) {
                convert( el );
                continue;
            }
            a[ i ] = new Buffer( String( el ) );
        }
        return a;
    }
    // use a SLOWLOG GET reply from Redis
    , slowlog_reply = [ [ '14', '1309448221', '15', [ 'PING' ] ], [ '13', '1309448128', '30', [ 'SLOWLOG', 'GET', '100' ] ] ]
    , slowlog_data = convert( slowlog_reply )
    , expected_reply = [ [ 14, 1309448221, 15, [ 'PING' ] ], [ 13, 1309448128, 30, [ 'SLOWLOG', 'GET', 100 ] ] ]
    // build command obj/hash
    , scmd = commands.slowlog.get( 0 )
    // reveal Buffer items with default utility fn ( Bolgia#reveal )
    , list = scmd.fn( slowlog_data )
    ;

log( '\n- slowlog expected reply:\n' );
log( util.inspect( expected_reply, false, 2, true ), '\n' );

log( '\n- slowlog reply:\n' );
log( util.inspect( list, false, 2, true ), '\n' );