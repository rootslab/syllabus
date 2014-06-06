/*
 * PUBSUB mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseIntArray = Abaco.parseIntArray
        , isArray = Array.isArray
        ;

    return {

        pubsub : {

            channels : function ( pattern, cback ) {
                var me = this
                    ;
                if ( ! pattern ) {
                    return encode( 'PUBSUB', 'CHANNELS' );
                }
                return encode( 'PUBSUB', 'CHANNELS', pattern, null, cback );
            }

            , numsub : function ( channels, cback ) {
                var me = this
                    , list = null
                    ;
                if ( ! channels ) {
                    return encode( 'PUBSUB', 'NUMSUB' );
                }
                return encode( 'PUBSUB', 'NUMSUB', channels, null, cback );
            }

            , numpat : function ( cback ) {
                var me = this
                    ;
                return encode( 'PUBSUB', 'NUMPAT', parseIntArray, cback );
            }

        }

        , publish : function ( channel, message, cback ) {
            var me = this
                ;
            if ( ! channel ) {
                return error( 'PUBLISH', arguments );
            }
            return encode( 'PUBLISH', channel, message, parseIntArray, cback );
        }

        , psubscribe : function ( patterns, cback ) {
            var me = this
                , result = null
                ;
            if ( ! patterns ) {
                return error( 'PSUBSCRIBE', arguments );
            }
            if ( isArray( patterns ) ) {
                result = encode( 'PSUBSCRIBE', patterns.slice( 0, 1 ), patterns.slice( 1 ), null, cback );
            } else {
                result = encode( 'PSUBSCRIBE', patterns, null, cback );
            }
            // set special command shortcut
            result.isSubscription = 1;
            return result;
        }

        , punsubscribe : function ( patterns, cback ) {
            var me = this
                , result = null
                ;
           if ( isArray( patterns ) ) {
                result = encode( 'PUNSUBSCRIBE', patterns.slice( 0, 1 ), patterns.slice( 1 ), null, cback );
            } else {
                result = encode( 'PUNSUBSCRIBE', patterns, null, cback );
            }
            // set special command shortcut
            result.isSubscription = 1;
            return result;
        }

        , subscribe : function ( channels, cback ) {
            var me = this
                , result = null
                ;
            if ( ! channels ) {
                return error( 'SUBSCRIBE', arguments );
            }
            if ( isArray( channels ) ) {
                result = encode( 'SUBSCRIBE', channels.slice( 0, 1 ), channels.slice( 1 ), null, cback );
            } else {
                result = encode( 'SUBSCRIBE', channels, null, cback );
            }
            // set special command shortcut
            result.isSubscription = 1;
            return result;
        }

        , unsubscribe : function ( channels, cback ) {
            var me = this
                , result = null
                ;
            if ( isArray( channels ) ) {
                result = encode( 'UNSUBSCRIBE', channels.slice( 0, 1 ), channels.slice( 1 ), null, cback );
            } else {
                result = encode( 'UNSUBSCRIBE', channels, null, cback );
            }
            // set special command shortcut
            result.isSubscription = 1;
            return result;
        }

    };

};
