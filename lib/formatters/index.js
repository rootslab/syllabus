module.exports = ( function () {
    var log = console.log
        , Bolgia = require( 'bolgia' )
        , doString = Bolgia.doString
        , ooo = Bolgia.circles
        , ostr = ooo.str
        ;
    return {
        // for monitor events / messages
        monitor : function ( mmsg ) {
            if ( doString( mmsg ) !== ostr ) return;
            var mlen = mmsg.length
                , s = 0
                , t = 0
                , time = 0
                , address = [ null, 0 ]
                , db = 0
                , command = ''
                , args = ''
                , stime = null
                , saddress = null
                ;
            if ( ! mlen ) return;
            s = mmsg.indexOf( '[' );
            stime = mmsg.slice( 0, s - 1 );
            t = stime.length - 3;
            time = [ stime.slice( 0, t ) * 1000, stime.slice( t ) / 1000 ];
            t = mmsg.indexOf( ']' );
            command = mmsg.slice( t + 2 );
            saddress = mmsg.slice( s + 1, t );
            t = saddress.indexOf( ' ' )
            db = + saddress.slice( 0, t );
            address = saddress.slice( t + 1 ).split( ':' );
            return {
                ip : address[ 0 ]
                , port : + address[ 1 ]
                , utime : time[ 0 ]
                , msecs :time[ 1 ]
                , db : db
                , cmd : command
            };
        }
    };
} )();