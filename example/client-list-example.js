#!/usr/bin/env node

/* 
 * Syllabus parse CLIENT LIST reply example
 */

var log = console.log
    , util = require( 'util' )
    // get Syllabus in develop mode
    , Syllabus = require( '../' )()
    // use a CLIENT LIST reply from Redis
    , str = "addr=127.0.0.1:36070 fd=6 name= age=2439 idle=2416 flags=N db=0 sub=0 psub=0 multi=-1 \
qbuf=0 qbuf-free=0 obl=0 oll=0 omem=0 events=r cmd=client\naddr=127.0.0.1:36175 fd=7 na\
me= age=4 idle=0 flags=N db=0 sub=0 psub=0 multi=-1 qbuf=0 qbuf-free=32768 obl=0 oll=0 o\
mem=0 events=r cmd=client"
    , commands = Syllabus.commands
    , obj = commands.client.list()
    , clist = obj.fn( str );
    ;

log( '\n- CLIENT LIST mix-in result:\n', util.inspect( obj, false, 1, true ) );

log( '\n- CLIENT LIST fn(reply data), %d client(s):\n', clist.length, util.inspect( clist, false, 1, true ) );