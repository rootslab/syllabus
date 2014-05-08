#!/usr/bin/env node

/* 
 * Syllabus parse DEBUG OPJECT reply example
 */

var log = console.log
    , util = require( 'util' )
    // get Syllabus in develop mode
    , Syllabus = require( '../' )()
    , commands = Syllabus.commands
    // use a DEBUG OBJECT reply from Redis
    , do_reply = "Value at:0x7fafca486270 refcount:1 encoding:ziplist serializedlength:27 lru:1540258 lru_seconds_idle:29480 ciao:"
    // build command obj/hash
    , do_cmd = commands.debug.object( 'blah' )
    , dobj = do_cmd.fn( do_reply )
    ;

log( util.inspect( dobj, false, 1, true ) );