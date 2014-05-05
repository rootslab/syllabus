/*
 * TRANSACTIONS info mix-ins.
 */

exports.infos = ( function () {

    return {

        psubscribe : {
            rtype : '*'
            , since : [ 2, 0, 0 ]
            , hint : 'PSUBSCRIBE pattern [pattern ...]'
        }

        , pubsub : {

            channels : {
                rtype : '*'
                , since : [ 2, 8, 0 ]
                , hint : 'PUBSUB CHANNELS [pattern]'
            }

            , numsub : {
                rtype : '*'
                , since : [ 2, 8, 0 ]
                , hint : 'PUBSUB NUMSUB [channel-1 ... channel-N]'
            }

            , numpat : {
                rtype : ':'
                , since : [ 2, 8, 0 ]
                , hint : 'PUBSUB NUMPAT'
            }

        }

        , publish : {
            rtype : ':'
            , since : [ 2, 0, 0 ]
            , hint : 'PUBLISH channel message'
        }

        , punsubscribe : {
            rtype : '*'
            , since : [ 2, 0, 0 ]
            , hint : 'PUNSUBSCRIBE [pattern [pattern ...]]'
        }

        , subscribe : {
            rtype : '*'
            , since : [ 2, 0, 0 ]
            , hint : 'SUBSCRIBE channel [channel ...]'
        }

        , unsubscribe : {
            rtype : '*'
            , since : [ 2, 0, 0 ]
            , hint : 'UNSUBSCRIBE [channel [channel ...]]'
        }

    };

} )();