/*
 * GEO mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , Bolgia = require( 'bolgia' )
        , parseIntArray = Abaco.parseIntArray
        , parseFloatArray = Abaco.parseFloatArray
        , doString = Bolgia.doString
        , toArray = Bolgia.toArray
        , ooo = Bolgia.circles
        , oobj = ooo.obj
        , oarr = ooo.arr
        , ostr = ooo.str
        , onum = ooo.num
        , isArray = Array.isArray
        ;

    return {

        geoadd : function ( key, gpoints, cback ) {
            // 3 elements in gpoints array [ longitude, latitude, member-name ]
            if ( isArray( gpoints ) && ( gpoints.length % 3 === 0 ) && ( key !== undefined ) )
                return encode( 'GEOADD', key, gpoints, parseIntArray, cback );
            return error( 'GEOADD', arguments );
        }

        , geohash : function ( key, members, cback ) {
            if ( key === undefined ) return error( 'GEOHASH', arguments );
            return encode( 'GEOHASH', key, members, null, cback );
        }

        , geodist : function ( key, members, unit, cback ) {
            if ( key === undefined ) return error( 'GEODIST', arguments );
            if ( unit ) 
                if ( isArray( members ) ) members.push( unit );
                else members = [ members, unit ]
            return encode( 'GEODIST', key, members, parseFloatArray, cback );
        }

        , geopos : function ( key, members, cback ) {
            if ( key === undefined ) return error( 'GEOPOS', arguments );
            return encode( 'GEOPOS', key, members, parseFloatArray, cback );
        }
    };

};
