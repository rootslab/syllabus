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
                 , isArr = isArray( patterns )
               ;
            if ( ! patterns ) return error( 'PSUBSCRIBE', arguments );
            if ( isArr ) {
                if ( ! patterns.length ) return error( 'PSUBSCRIBE', arguments );
                result = encode( 'PSUBSCRIBE', patterns.slice( 0, 1 ), patterns.slice( 1 ), null, cback );
            } else {
                result = encode( 'PSUBSCRIBE', patterns, null, cback );
            }
            // set special command shortcut
            result.isSubscription = 1;
            result.expectedMessages = result.bulks - 1;
            return result;
        }

        , punsubscribe : function ( patterns, cback ) {
            var me = this
                , result = null
                ;
           if ( ! patterns ) {
                result = encode( 'PUNSUBSCRIBE', null, cback );
            } else if ( isArray( patterns ) ) {
                if ( channels.length ) {
                    result = encode( 'PUNSUBSCRIBE', patterns.slice( 0, 1 ), patterns.slice( 1 ), null, cback );
                } else {
                    result = encode( 'PUNSUBSCRIBE', null, cback );
                }
            } else {
                result = encode( 'PUNSUBSCRIBE', patterns, null, cback );
            }
            // set special command shortcut
            result.isSubscription = 1;
            result.isUnsubscription = 1;
            // set expected number of message replies
            result.expectedMessages = result.bulks - 1;
            return result;
        }

        , subscribe : function ( channels, cback ) {
            var me = this
                , result = null
                , isArr = isArray( channels )
                ;
            if ( ! channels ) return error( 'SUBSCRIBE', arguments );
            if ( isArr ) {
                if ( ! channels.length ) return error( 'SUBSCRIBE', arguments );
                result = encode( 'SUBSCRIBE', channels.slice( 0, 1 ), channels.slice( 1 ), null, cback );
            } else {
                result = encode( 'SUBSCRIBE', channels, null, cback );
            }
            // set special command shortcut
            result.isSubscription = 1;
            result.expectedMessages = result.bulks - 1;
            return result;
        }

        , unsubscribe : function ( channels, cback ) {
            var me = this
                , result = null
                ;
            if ( ! channels ) {
                result = encode( 'UNSUBSCRIBE', null, cback );
            } else if ( isArray( channels ) ) {
                if ( channels.length ) {
                    result = encode( 'UNSUBSCRIBE', channels.slice( 0, 1 ), channels.slice( 1 ), null, cback );
                } else {
                    result = encode( 'UNSUBSCRIBE', null, cback );
                }
            } else {
                result = encode( 'UNSUBSCRIBE', channels, null, cback );
            }
            // set special command shortcut
            result.isSubscription = 1;
            result.isUnsubscription = 1;
            // set expected number of message replies
            result.expectedMessages = result.bulks - 1;
            return result;
        }

    };

};
