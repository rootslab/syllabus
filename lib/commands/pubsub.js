/*
 * PUBSUB mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , parseFloat = Abaco.parseFloat
        , Bolgia = require( 'bolgia' )
        , toString = Bolgia.toString
        , ooo = Bolgia.circles
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
                return encode( 'PUBSUB', 'NUMPAT', parseInt, cback );
            }

        }

        , publish : function ( channel, message, cback ) {
            var me = this
                ;
            if ( ! channel ) {
                return error( 'PUBLISH', arguments );
            }
            return encode( 'PUBLISH', channel, message, parseInt, cback );
        }

        , psubscribe : function ( patterns ) {
            var me = this
                ;
            if ( ! patterns ) {
                return error( 'PSUBSCRIBE', arguments );
            }
            if ( isArray( patterns ) ) {
                return encode( 'PSUBSCRIBE', patterns.shift(), patterns, null, cback );
            }
            return encode( 'PSUBSCRIBE', patterns );
        }

        , punsubscribe : function ( patterns ) {
            var me = this
                ;
            if ( isArray( patterns ) ) {
                return encode( 'PUNSUBSCRIBE', patterns.shift(), patterns, null );
            }
            return encode( 'PUNSUBSCRIBE', patterns );
        }

        , subscribe : function ( channels ) {
            var me = this
                ;
            if ( ! channels ) {
                return error( 'SUBSCRIBE', arguments );
            }
            if ( isArray( channels ) ) {
                return encode( 'SUBSCRIBE', channels.shift(), channels, null );
            }
            return encode( 'SUBSCRIBE', channels, null );
        }

        , unsubscribe : function ( channels ) {
            var me = this
                ;
            if ( isArray( channels ) ) {
                return encode( 'UNSUBSCRIBE', channels.shift(), channels, null );
            }
            return encode( 'UNSUBSCRIBE', channels, null );
        }

    };

};
