/*
 * SETS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , parseIntArray = Abaco.parseIntArray
        , Bolgia = require( 'bolgia' )
        , doString = Bolgia.doString
        , ooo = Bolgia.circles
        , onul = ooo.nul
        , ound = ooo.und
        , oobj = ooo.obj
        , oarr = ooo.arr
        , ostr = ooo.str
        , onum = ooo.num
        , isArray = Array.isArray
        ;

    return {

        sadd : function ( key, members, cback ) {
            if ( key && members ) return encode( 'SADD', key, members, parseIntArray, cback );
            return error( 'SADD', arguments );
        }

        , scard : function ( key, cback ) {
            if ( ! key ) return error( 'SCARD', arguments );
            return encode( 'SCARD', key, parseIntArray, cback );
        }

        , sdiff : function ( keys, cback ) {
            if ( ! keys ) return error( 'SDIFF', arguments );
            if ( isArray( keys ) ) return encode( 'SDIFF', keys.slice( 0, 1 ), keys.slice( 1 ), null, cback );
            return encode( 'SDIFF', keys );
        }

        , sdiffstore : function ( dest, keys, cback ) {
            if ( ! dest ) return error( 'SDIFFSTORE', arguments );
            return encode( 'SDIFFSTORE', dest, keys, null, cback );
        }

        , sinter : function ( keys, cback ) {
            if ( ! keys ) return error( 'SINTER', arguments );
            if ( isArray( keys ) ) return encode( 'SINTER', keys.slice( 0, 1 ), keys.slice( 1 ), null, cback );
            return encode( 'SINTER', keys );
        }

        , sinterstore : function ( dest, keys, cback ) {
            if ( ! dest ) return error( 'SINTERSTORE', arguments );
            return encode( 'SINTERSTORE', dest, keys, null, cback );
        }

        , sismember : function ( key, member, cback ) {
            if ( ! key ) return error( 'SISMEMBER', arguments );
            return encode( 'SISMEMBER', key, member, parseIntArray, cback );
        }

        , smembers : function ( key, cback ) {
            if ( ! key ) return error( 'SMEMBERS', arguments );
            return encode( 'SMEMBERS', key, null, cback );
        }

        , smove : function ( source, dest, member, cback ) {
            if ( source && dest )return encode( 'SMOVE', source, [ dest, member ], parseIntArray, cback );
            return error( 'SMOVE', arguments );
        }

        , spop : function ( key, cback ) {
            if ( ! key )return error( 'SPOP', arguments );
            return encode( 'SPOP', key, null, cback );
        }

        , srandmember : function ( key, count, cback ) {
            if ( ! key ) return error( 'SRANDMEMBER', arguments );
            return encode( 'SRANDMEMBER', key, count, null, cback );
        }

        , srem : function ( key, members, cback ) {
            if ( ! key )return error( 'SREM', arguments );
            return encode( 'SREM', key, members, parseIntArray, cback );
        }

        , sscan : function ( key, cursor, opt, cback ) {
            var list = null
                , match = null
                , count = null
                , ctype = null
                ;

            if ( ! key || isNaN( + cursor ) ) return error( 'SSCAN', arguments );

            switch ( doString( opt ) ) {
                case oobj:
                    list = [];
                    match = opt.match;
                    count = opt.count;
                    ctype = doString( count );
                    if ( doString( match ) === ostr ) list.push( 'MATCH', match );
                    if ( ctype === ostr || ctype === onum ) list.push( 'COUNT', count );
                case oarr:
                    return encode( 'SSCAN', key, [ cursor ].concat( list || opt ), null, cback );
                case onul:
                case ound:
                    return encode( 'SSCAN', key, [ cursor ], null, cback );
                default:
                    return error( 'SSCAN', arguments );
            }
        }

        , sunion : function ( keys, cback ) {
            if ( ! keys ) return error( 'SUNION', arguments );
            if ( isArray( keys ) ) return encode( 'SUNION', keys.slice( 0, 1 ), keys.slice( 1 ), null, cback );
            return encode( 'SUNION', keys );
        }

        , sunionstore : function ( dest, keys, cback ) {
            if ( ! dest ) return error( 'SUNIONSTORE', arguments );
            return encode( 'SUNIONSTORE', dest, keys, null, cback );
        }

    };

};