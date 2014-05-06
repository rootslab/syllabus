var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    // get Syllabus in develop mode
    , Syllabus = require( '../' )( true )
    // commands
    , commands = Syllabus.commands
    // types
    , types = Syllabus.types
    ;

// log all Syllabus properties
log( util.inspect( Syllabus, false, 3, true ) );
