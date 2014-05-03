/*
 * SETS mix-ins.
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

        sadd : function ( key, members ) {
            var me = this
                ;
            if ( key && members ) {
                return encode( 'SADD', key, members, parseInt );
            }
            return error( 'SADD', arguments );
        }

        , scard : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SCARD', arguments );
            }
            return encode( 'SCARD', key, parseInt );
        }

        , sdiff : function ( keys ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'SDIFF', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'SDIFF', keys.shift(), keys );
            }
            return encode( 'SDIFF', keys );
        }

        , sdiffstore : function ( dest, keys ) {
            var me = this
                ;
            if ( ! dest ) {
                return error( 'SDIFFSTORE', arguments );
            }
            return encode( 'SDIFFSTORE', dest, keys );
        }

        , sinter : function ( keys ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'SINTER', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'SINTER', keys.shift(), keys );
            }
            return encode( 'SINTER', keys );
        }

        , sinterstore : function ( dest, keys ) {
            var me = this
                ;
            if ( ! dest ) {
                return error( 'SINTERSTORE', arguments );
            }
            return encode( 'SINTERSTORE', dest, keys );
        }

        , sismember : function ( key, member ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SISMEMBER', arguments );
            }
            return encode( 'SISMEMBER', key, member, parseInt );
        }

        , smembers : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SMEMBERS', arguments );
            }
            return encode( 'SMEMBERS', key );
        }

        , smove : function ( source, dest, member ) {
            var me = this
                ;
            if ( source && dest ) {
                return encode( 'SMOVE', source, [ dest, member ], parseInt );
            }
            return error( 'SMOVE', arguments );
        }

        , spop : function ( key ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SPOP', arguments );
            }
            return encode( 'SPOP', key );
        }

        , srandmember : function ( key, count ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SRANDMEMBER', arguments );
            }
            return encode( 'SRANDMEMBER', key, count );
        }

        , srem : function ( key, members ) {
            var me = this
                ;
            if ( ! key ) {
                return error( 'SREM', arguments );
            }
            return encode( 'SREM', key, members, parseInt );
        }

        , sunion : function ( keys ) {
            var me = this
                ;
            if ( ! keys ) {
                return error( 'SUNION', arguments );
            }
            if ( isArray( keys ) ) {
                return encode( 'SUNION', keys.shift(), keys );
            }
            return encode( 'SUNION', keys );
        }

        , sunionstore : function ( dest, keys ) {
            var me = this
                ;
            if ( ! dest ) {
                return error( 'SUNIONSTORE', arguments );
            }
            return encode( 'SUNIONSTORE', dest, keys );
        }

        , sscan : function ( key, cursor, opt ) {
            var me = this
                , list = opt
                , match = null
                , count = null
                ;

            if ( ! key || isNaN( + cursor ) ) {
                return error( 'SSCAN', arguments );
            }
            switch ( toString( opt ) ) {
                case ooo.obj:
                    list = [];
                    match = opt.match;
                    count = opt.count;
                    if ( toString( match ) === ooo.str ) {
                        list.push( 'MATCH', match );
                    }
                    if ( toString( count ) === ooo.str ) {
                        list.push( 'COUNT', count );
                    }
                case ooo.arr:
                    return encode( 'SSCAN', key, cursor, list );
                break;
                default:
                    return error( 'SSCAN', arguments );
                break;
            };
        }

    };

};