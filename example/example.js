var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Syllabus = require( '../' )( true )
    , commands = Syllabus.commands
    , types = Syllabus.types
    ;

log( util.inspect( Syllabus, false, 3, true ) );
