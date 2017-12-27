var log = console.log
    , util = require( 'util' )
    // get Syllabus in develop mode
    , Syllabus = require( '../' )( true )
    // commands
    , commands = Syllabus.commands
    // types
    , types = Syllabus.types
    ;

// log all Syllabus properties
// log( util.inspect( Syllabus, false, 3, true ) );

var eat = ( o ) => {
        log( '-> eat:', o )
        let wait = 3000
            ;
        log( '\n-> now wait for %d secs to resolve..\n', wait / 1000 )
        setTimeout( () => o.pn.rs( '"RESOLVED MINDLESSLY!"' ), wait )
    }
    , ecmd = Syllabus.commands.del( '1' );
    ;

log( '\n-> command normal encoding:\n', ecmd )

log( '\n-> wrap commands and promisify..\n' );

Syllabus.wrap( eat, true );

pcmd = Syllabus.commands.del( '1' );

log( '-> command is now:', pcmd );


pcmd.then( ( v ) => log( '\n-> Promise: %s\n', v ) );