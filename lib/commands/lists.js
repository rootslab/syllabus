/*
 * LISTS mix-ins.
 */

exports.commands = function ( encode, error ) {
    var Abaco = require( 'abaco' )
        , parseIntArray = Abaco.parseIntArray
        , isArray = Array.isArray
        ;

    return {

        blpop : function ( keys, timeout, cback ) {
            var t = + timeout || 0
                , list = keys
                ;
            if ( ! list ) return error( 'BLPOP', arguments );
            if ( isArray( list ) && list.length ) {
                list.push( t );
                return encode( 'BLPOP', list.slice( 0 ,1 ), list.slice( 1 ), null, cback );
            }
            return encode( 'BLPOP', list, t, null, cback );
        }

        , brpop : function ( keys, timeout, cback ) {
            var t = + timeout || 0
                , list = keys
                ;
            if ( ! list ) return error( 'BRPOP', arguments );
            if ( isArray( list ) && list.length ) {
                list.push( t );
                return encode( 'BRPOP', list.slice( 0 ,1 ), list.slice( 1 ), null, cback );
            }
            return encode( 'BRPOP', list, t, null, cback );
        }

        , brpoplpush : function ( source, dest, timeout, cback ) {
            var t = + timeout || 0
                ;
            if ( source && dest ) return encode( 'BRPOPLPUSH', source, [ dest, t ], null, cback );
            return error( 'BRPOPLPUSH', arguments );
        }

        , lindex : function ( key, index, cback ) {
            if ( ! key ) return error( 'LINDEX', arguments );
            return encode( 'LINDEX', key, index, null, cback );
        }

        , linsert : function ( key, pos, pivot, value, cback ) {
            if ( key && arguments.length >> 2 ) return encode( 'LINSERT', key, [ pos, pivot, value ], parseIntArray, cback );
            return error( 'LINSERT', arguments );
        }

        , llen : function ( key, cback ) {
            if ( ! key ) return error( 'LLEN', arguments );
            return encode( 'LLEN', key, parseIntArray, cback );
        }

        , lpop : function ( key, cback ) {
            if ( ! key ) return error( 'LPOP', arguments );
            return encode( 'LPOP', key, null, cback );
        }

        , lpush : function ( key, values, cback ) {
            if ( key && values ) return encode( 'LPUSH', key, values, parseIntArray, cback );
            return error( 'LPUSH', arguments );
        }

        , lpushx : function ( key, value, cback ) {
            if ( ! key ) return error( 'LPUSHX', arguments );
            return encode( 'LPUSHX', key, value, parseIntArray, cback );
        }

        , lrange : function ( key, start, stop, cback ) {
            if ( ! key ) return error( 'LRANGE', arguments );
            return encode( 'LRANGE', key, [ start, stop ], null, cback );
        }

        , lrem : function ( key, count, value, cback ) {
            if ( ! key ) return error( 'LREM', arguments );
            return encode( 'LREM', key, [ count, value ], parseIntArray, cback );
        }

        , lset : function ( key, index, value, cback ) {
            if ( ! key ) return error( 'LSET', arguments );
            return encode( 'LSET', key, [ index, value ], parseIntArray, cback );
        }

        , ltrim : function ( key, start, stop, cback ) {
            if ( ! key ) return error( 'LTRIM', arguments );
            return encode( 'LTRIM', key, [ start, stop ], null, cback );
        }

        , rpop : function ( key, cback ) {
            if ( ! key ) return error( 'RPOP', arguments );
            return encode( 'RPOP', key, null, cback );
        }

        , rpoplpush : function ( source, dest, cback ) {
            if ( source && dest ) return encode( 'RPOPLPUSH', source, dest, null, cback );
            return error( 'RPOPLPUSH', arguments );
        }

        , rpush : function ( key, values, cback ) {
            if ( key && values ) return encode( 'RPUSH', key, values, parseIntArray, cback );
            return error( 'RPUSH', arguments );
        }

        , rpushx : function ( key, value, cback ) {
            if ( ! key ) return error( 'RPUSHX', arguments );
            return encode( 'RPUSHX', key, value, parseIntArray, cback );
        }

    };

};
