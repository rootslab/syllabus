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


var q = []
    , eat = ( o ) => {
        log( '\n-> eat:', o )
        q.push( o );
    }
    , ecmd = Syllabus.commands.del( '1' );
    ;

log( '\n-> command DEL with normal encoding:\n', ecmd )

log( '\n-> wrap commands and promisify..' );

Syllabus.wrap( eat, true );

pcmd = Syllabus.commands.del( 1 );

log( '\n-> command DEL is now:', pcmd );

pcmd.then( ( v ) => log( '\n-> Promise result (an array):', v ) );


pcmd = Syllabus.commands.keys( '*' );

log( '\n-> command KEYS is now:', pcmd );

pcmd.spread( ( a, b ) => log( '\n-> Promise result (with spread): ', a, b ) );

// simulate async reply
let wait = 2000
    ;
log( '\n-> waiting to resolve..' )

setTimeout( () => q.pop().pn.rs( [ '"RESOLVED"', '"MINDLESSLY!"' ] ), wait );
setTimeout( () => q.pop().pn.rs( [ '"RESOLVED"', '"MINDLESSLY!"' ] ), wait + 1000 )