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

        psubscribe : function ( patterns ) {
            var me = this
                ;
            if ( ! patterns ) {
                return error( 'PSUBSCRIBE', arguments );
            }
            if ( isArray( patterns ) ) {
                return encode( 'PSUBSCRIBE', patterns.shift(), patterns );
            }
            return encode( 'PSUBSCRIBE', patterns );
        }

        , pubsub : {

            channels : function ( pattern ) {
                var me = this
                    ;
                if ( ! pattern ) {
                    return encode( 'PUBSUB', 'CHANNELS' );
                }
                return encode( 'PUBSUB', 'CHANNELS', pattern );
            }

            , numsub : function ( channels ) {
                var me = this
                    , list = null
                    ;
                if ( ! channels ) {
                    return encode( 'PUBSUB', 'NUMSUB' );
                }
                return encode( 'PUBSUB', 'NUMSUB', channels );
            }

            , numpat : function () {
                var me = this
                    ;
                return encode( 'PUBSUB', 'NUMPAT', parseInt );
            }

        }

        , publish : function ( channel, message ) {
            var me = this
                ;
            if ( ! channel ) {
                return error( 'PUBLISH', arguments );
            }
            return encode( 'PUBLISH', channel, message, parseInt );
        }

        , punsubscribe : function ( patterns ) {
            var me = this
                ;
            if ( ! patterns ) {
                return encode( 'PUNSUBSCRIBE' );
            }
            if ( isArray( patterns ) ) {
                return encode( 'PUNSUBSCRIBE', patterns.shift(), patterns );
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
                return encode( 'SUBSCRIBE', channels.shift(), channels );
            }
            return encode( 'SUBSCRIBE', channels );
        }

        , unsubscribe : function ( channels ) {
            var me = this
                ;
            if ( ! channels ) {
                return encode( 'UNSUBSCRIBE' );
            }
            if ( isArray( channels ) ) {
                return encode( 'UNSUBSCRIBE', channels.shift(), channels );
            }
            return encode( 'UNSUBSCRIBE', channels );
        }

    };

};
