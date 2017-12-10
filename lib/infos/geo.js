/*
 * GEO info mix-ins.
 */

exports.infos = ( function () {

    return {

        geoadd : {
            rtype : ':'
            , since : '3.2.0'
            , hint : 'GEOADD key longitude latitude member [longitude latitude member ...]'
            , descr : 'Add one or more geospatial items in the geospatial index represented using a sorted set.'
        }

        , geodist : {
            rtype : '$'
            , since : '3.2.0'
            , hint : 'GEODIST key member1 member2 [m|km|mi|ft]'
            , descr : 'Returns the distance between two members of a geospatial index'
        }

        , geohash : {
            rtype : '$'
            , since : '3.2.0'
            , hint : 'GEOHASH key member [member ...]'
            , descr : 'Returns members of a geospatial index as standard geohash strings.'
        }

        , geopos : {
            rtype : '*'
            , since : '3.2.0'
            , hint : 'GEOPOS key member [member ...]'
            , descr : 'Returns longitude and latitude of members of a geospatial index.'
        }
        , georadius : {
            rtype : '*'
            , since : '3.2.0'
            , hint : 'GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]'
            , descr : 'Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point.'
        }
        , georadiusbymember : {
            rtype : '*'
            , since : '3.2.0'
            , hint : 'GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]'
            , descr : 'Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member.'
        }

    };

} ) ();