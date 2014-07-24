/*
 * TRANSACTIONS info mix-ins.
 */

exports.infos = ( function () {

    return {

        psubscribe : {
            rtype : '*'
            , since : '2.0.0'
            , hint : 'PSUBSCRIBE pattern [pattern ...]'
            , descr : 'Listen for messages published to channels matching the given patterns.'
            , action : [ 'read' ]
        }

        , pubsub : {

            channels : {
                rtype : '*'
                , since : '2.8.0'
                , hint : 'PUBSUB CHANNELS [pattern]'
                , descr : 'Lists the currently active channels.'
                , url : 'http://redis.io/commands/pubsub'
                , action : [ 'read' ]
            }

            , numsub : {
                rtype : '*'
                , since : '2.8.0'
                , hint : 'PUBSUB NUMSUB [channel-1 ... channel-N]'
                , descr : 'Returns the number of subscribers (not counting clients subscribed to patterns) for the specified channels.'
                , url : 'http://redis.io/commands/pubsub'
                , action : [ 'read' ]
            }

            , numpat : {
                rtype : ':'
                , since : '2.8.0'
                , hint : 'PUBSUB NUMPAT'
                , descr : 'Returns the total number of patterns all the clients are subscribed to.'
                , url : 'http://redis.io/commands/pubsub'
                , action : [ 'read' ]
            }

        }

        , publish : {
            rtype : ':'
            , since : '2.0.0'
            , hint : 'PUBLISH channel message'
            , descr : 'Post a message to a channel.'
            , action : [ 'read' ]
        }

        , punsubscribe : {
            rtype : '*'
            , since : '2.0.0'
            , hint : 'PUNSUBSCRIBE [pattern [pattern ...]]'
            , descr : 'Stop listening for messages posted to channels matching the given patterns.'
            , action : [ 'read' ]
        }

        , subscribe : {
            rtype : '*'
            , since : '2.0.0'
            , hint : 'SUBSCRIBE channel [channel ...]'
            , descr : 'Listen for messages published to the given channels.'
            , action : [ 'read' ]
        }

        , unsubscribe : {
            rtype : '*'
            , since : '2.0.0'
            , hint : 'UNSUBSCRIBE [channel [channel ...]]'
            , descr : 'Stop listening for messages posted to the given channels.'
            , action : [ 'read' ]
        }

    };

} )();