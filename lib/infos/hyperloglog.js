/*
 * HYPERLOGLOG info mix-ins.
 */

exports.infos = ( function () {

    return {

        pfadd : {
            rtype : ':'
            , always : [ 0, 1 ]
            , since : '2.8.9'
            , hint : 'PFADD key element [element ...]'
            , descr : 'Adds the specified elements to the specified HyperLogLog.'
        }

        , pfcount : {
            rtype : ':'
            , since : '2.8.9'
            , hint : 'PFCOUNT key [key ...]'
            , descr : 'Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s.'
        }

        , pfmerge : {
            rtype : '$'
            , always : [ 'OK' ]
            , since : '2.8.9'
            , hint : 'PFMERGE destkey sourcekey [sourcekey ...]'
            , descr : 'Merge N different HyperLogLogs into a single one.'
        }

        , pfselftest : {
            rtype : '$'
            , since : '2.8.13'
            , hint : 'PFSELFTEST'
            , descr : 'This command performs a self-test of the HLL registers implementation.'
        }
    };

} )();