/*
 * KEYS mix-ins.
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

        del : function ( keys, cback ) {
            if ( ! keys ) return error( 'DEL', arguments );
            if ( isArray( keys ) ) return encode( 'DEL', keys.slice( 0, 1 ), keys.slice( 1 ), parseIntArray, cback );
            return encode( 'DEL', keys, parseIntArray, cback );
        }

        , dump : function ( key, cback ) {
            if ( ! key ) return error( 'DUMP', arguments );
            return encode( 'DUMP', key, null, cback );
        }

        , exists : function ( key, cback ) {
            if ( ! key ) return error( 'DUMP', arguments );
            return encode( 'EXISTS', key, parseIntArray, cback );
        }

        , expire : function ( key, seconds, cback ) {
            if ( ! key ) return error( 'EXPIRE', arguments );
            return encode( 'EXPIRE', key, + seconds, parseIntArray, cback );
        }

        , expireat : function ( key, unixtime, cback ) {
            var tstamp = null
                ;
            if ( ! key ) return error( 'EXPIREAT', arguments );
            if ( + unixtime ) tstamp = ( + unixtime / 1000 ).toFixed( 0 );
            return encode( 'EXPIREAT', key, tstamp, parseIntArray, cback );
        }

        , keys : function ( pattern, cback ) {
            if ( ! pattern ) return error( 'KEYS', arguments );
            return encode( 'KEYS', pattern, null, cback );
        }

        , migrate : function ( key, opt, cback ) {
            var list = null
                ;

            if ( ! key ) return error( 'MIGRATE', arguments );
            
            switch ( doString( opt ) ) {
                case oarr:
                    if ( opt.length < 5 ) return error( 'MIGRATE', arguments );
                    // orig args -> host port key destination-db timeout [COPY] [REPLACE]
                    list = opt.slice( 0, 2 ).concat( key ).concat( opt.slice( 2 ) );
                    return encode( 'MIGRATE', list, null, cback );
                case oobj:
                    list = [ opt.port, key, opt.db, opt.timeout, opt.action ];
                    return encode( 'MIGRATE', opt.host, list, null, cback );
                default:
                    return error( 'MIGRATE', arguments );
            }
        }

        , move : function ( key, db, cback ) {
            if ( ! key ) return error( 'MOVE', arguments );
            return encode( 'MOVE', key, db, parseIntArray, cback );
        }

        , object : {

            refcount : function ( key, cback ) {
                if ( ! key ) return error( 'OBJECT REFCOUNT', arguments ); 
                return encode( 'OBJECT', 'REFCOUNT', key, parseIntArray, cback );
            }

            , encoding : function ( key, cback ) {
                if ( ! key ) return error( 'OBJECT ENCODING', arguments );
                return encode( 'OBJECT', 'ENCODING', key, null, cback );
            }

            , idletime : function ( key, cback ) {
                if ( ! key ) return error( 'OBJECT IDLETIME', arguments );
                return encode( 'OBJECT', 'IDLETIME', key, parseIntArray, cback );
            }

        }

        , persist : function ( key, cback ) {
            if ( ! key ) return error( 'PERSIST', arguments );
            return encode( 'PERSIST', key, parseIntArray, cback );
        }

        , pexpire : function ( key, millis, cback ) {
            if ( ! key ) return error( 'PEXPIRE', arguments );
            return encode( 'PEXPIRE', key, millis, parseIntArray, cback );
        }

        , pexpireat : function ( key, unixtime, cback ) {
            if ( ! key ) return error( 'PEXPIREAT', arguments );
            return encode( 'PEXPIREAT', key, unixtime, parseIntArray, cback );
        }

        , pttl : function ( key, cback ) {
            if ( ! key ) return error( 'PTTL', arguments );
            return encode( 'PTTL', key, parseIntArray, cback );
        }
        , randomkey : function ( cback ) {
            return encode( 'RANDOMKEY', null, cback );
        }

        , rename : function ( key, name, cback ) {
            if ( ! key ) return error( 'RENAME', arguments );
            return encode( 'RENAME', key, name, parseIntArray, cback );
        }

        , renamenx : function ( key, name, cback ) {
            if ( ! key ) return error( 'RENAMENX', arguments );
            return encode( 'RENAMENX', key, name, parseIntArray, cback );
        }

        , restore : function ( key, ttl, buffer, cback ) {
            if ( ! key ) return error( 'RESTORE', arguments );
            return encode( 'RESTORE', key, [ ttl, buffer ], null, cback );
        }

        , scan : function ( cursor, opt, cback ) {
            var list = null
                , match = null
                , count = null
                , ctype = null
                ;

            if ( isNaN( + cursor ) ) return error( 'SCAN', arguments );

            switch ( doString( opt ) ) {
                case oobj:
                    list = [];
                    match = opt.match;
                    count = opt.count;
                    ctype = doString( count );
                    if ( doString( match ) === ostr ) list.push( 'MATCH', match );
                    if ( ctype === ostr || ctype === onum ) list.push( 'COUNT', count );
                case oarr:
                    return encode( 'SCAN', cursor, list || opt, null, cback );
                case onul:
                case ound:
                    return encode( 'SCAN', cursor, [], null, cback );
                default:
                    return error( 'SCAN', arguments );
            }
        }

        , sort : function ( key, opt, cback ) {
            var list = opt
                , order = null
                , limit = null
                , by = null
                , get = null
                , store = null
                , len = 0
                , el = null
                , i = 0
                ;

            if ( ! key ) return error( 'SORT', arguments );

            switch ( doString( opt ) ) {
                case oobj:
                    // shortcuts
                    order = opt.order;
                    limit = opt.limit;
                    by = opt.by;
                    get = opt.get;
                    store = opt.store;
                    list = [];
                    // check properties
                    if ( doString( order ) === ostr ) {
                        if ( /^ALPHA|ASC|DESC$/i.test( order ) ) list.push( order );
                    }
                    if ( doString( limit ) === oarr ) {
                        if ( limit.length >> 1 ) list.push( 'LIMIT', limit[ 0 ], limit[ 1 ] );
                    }
                    if ( doString( by ) === ostr ) list.push( 'BY', by );
                    if ( doString( get ) === oarr ) {
                        len = get.length;
                        for ( ; i < len; ) {
                            el = get[ i++ ];
                            if ( doString( el ) === ostr ) list.push( 'GET', el );
                        }
                    }
                    if ( doString( store ) === ostr ) list.push( 'STORE', store );
                case oarr:
                    return encode( 'SORT', key, list, null, cback );
                default:
                    return error( 'SORT', arguments );
            }
        }

        , ttl : function ( key, cback ) {
            if ( ! key ) return error( 'TTL', arguments );
            return encode( 'TTL', key, parseIntArray, cback );
        }

        , type : function ( key, cback ) {
            if ( ! key ) return error( 'TYPE', arguments );
            return encode( 'TYPE', key, null, cback );
        }

    };

};
