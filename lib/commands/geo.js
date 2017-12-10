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
        // GEORADIUS, GEORADIUSBYMEMBER
        , zrange = function ( is ) {
            var cmd = is ? 'GEORADIUS' : 'GEORADIUSBYMEMBER'
                ;
            return function ( key, start, stop, withscores, cback ) {
                var ws = withscores
                    , list = [ start, stop ]
                    ;
                if ( key === undefined ) return error( 'ZRANGE', arguments );
                return encode( cmd, key, ws ? list.concat( 'WITHSCORES' ) : list, null, cback );
            }
            ;
        }
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

        , georadius : function ( key, lon, lat, radius, unit, opt, cback ) {
            var list = [ lon, lat, radius, unit ]
                ;
            if ( key === undefined ) return error( 'GEORADIUS', arguments );
            if ( doString( opt ) === oobj ) { 
                if ( doString( opt.with ) === oarr ) list = list.concat( opt.with );
                if ( doString( opt.count ) === onum ) list = list.concat( 'COUNT' ).concat( opt.count );
                if ( doString( opt.order ) === ostr ) list = list.concat( opt.order );
                if ( doString( opt.store ) === ostr ) list = list.concat( 'STORE' ).concat( opt.store );
                if ( doString( opt.storedist ) === ooo.str ) list = list.concat( 'STOREDIST' ).concat( opt.storedist );
            }
            console.log( list, doString( opt ) === oobj  )
            //console.log( encode( 'GEORADIUS', key, list, null, cback ) )
            return encode( 'GEORADIUS', key, list, null, cback );
        }

        , georadiusbymember : function ( key, member, radius, unit, opt, cback ) {
            var list = [ member, radius, unit ]
                ;
            if ( key === undefined ) return error( 'GEORADIUSBYMEMBER', arguments );
            if ( doString( opt ) === oobj ) { 
                if ( doString( opt.with ) === oarr ) list = list.concat( opt.with );
                if ( doString( opt.count ) === onum ) list = list.concat( 'COUNT' ).concat( opt.count );
                if ( doString( opt.order ) === ostr ) list = list.concat( opt.order );
                if ( doString( opt.store ) === ostr ) list = list.concat( 'STORE' ).concat( opt.store );
                if ( doString( opt.storedist ) === ooo.str ) list = list.concat( 'STOREDIST' ).concat( opt.storedist );
            }
            return encode( 'GEORADIUSBYMEMBER', key, list, null, cback );
        }
    };

};
