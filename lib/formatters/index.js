module.exports = ( function () {
    var log = console.log
        , Bolgia = require( 'bolgia' )
        , doString = Bolgia.doString
        , improve = Bolgia.improve
        , ooo = Bolgia.circles
        , ostr = ooo.str
        , oarr = ooo.arr
        ;
    return {
        // for monitor events / messages
        monitor : function ( mmsg ) {
            if ( doString( mmsg ) !== ostr ) return;
            var mlen = mmsg.length
                , s = 0
                , t = 0
                // unix time in millis
                , utime = 0
                , secs = 0
                . msecs = 0
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
            utime = + stime.slice( 0, t ) * 1000;
            t = mmsg.indexOf( '.' );
            secs = + stime.slice( 0, t );
            msecs = + stime.slice( t + 1, s - 1 );
            t = mmsg.indexOf( ']' );
            command = mmsg.slice( t + 2 );
            saddress = mmsg.slice( s + 1, t );
            t = saddress.indexOf( ' ' )
            db = + saddress.slice( 0, t );
            address = saddress.slice( t + 1 ).split( ':' );
            return {
                ip : address[ 0 ]
                , port : + address[ 1 ]
                , db : db
                , cmd : command
                , utime : utime
                , time : [ secs, msecs ]
            };
        }
        // for pubsub events / messages
        , message : function ( msg ) {
            if ( doString( msg ) !== oarr ) return;
            if ( msg.length < 3 ) return;
            var isMsg = msg[ 0 ] === 'message'
                , result = {
                    type: msg[ 0 ]
                    , chan : msg[ 1 ] 
                }
            return improve( isMsg ? { msg : msg[ 2 ] } : { subs : msg[ 2 ] }, result );
        }
    };
} )();