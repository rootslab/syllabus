/*
 * SERVER mix-ins.
 */

exports.commands = function ( encode, error ) {
    var log = console.log
        , Abaco = require( 'abaco' )
        , parseInt = Abaco.parseInt
        , parseFloat = Abaco.parseFloat
        , Bolgia = require( 'bolgia' )
        , toArray = Bolgia.toArray
        , toString = Bolgia.toString
        , ooo = Bolgia.circles
        , isArray = Array.isArray
        ;

    return {

        bgrewriteaof : function () {
            var me = this
                ;
            return encode( 'BGREWRITEAOF' );
        }

        , bgsave : function () {
            var me = this
                ;
            return encode( 'BGSAVE' );
        }

        , client : {

            getname : function () {
                var me = this
                    ;
                return encode( 'CLIENT', 'GETNAME' );
            }

            , kill : function ( key, ip, port ) {
                var me = this
                    ;
                if ( ! ip ) {
                    return error( 'CLIENT KILL', arguments );
                }
                return encode( 'CLIENT', 'KILL', [ ip, port ] );
            }

            // TODO: add utility fn to parse CLIENT LIST result
            , list : function () {
                var me = this
                    ;
                return encode( 'CLIENT', 'LIST' );
            }

            , pause : function ( timeout ) {
                var me = this
                    ;
                return encode( 'CLIENT', 'PAUSE', timeout );
            }

            , setname : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'CLIENT SETNAME', arguments );
                }
                return encode( 'CLIENT', 'SETNAME', key );
            }

        }

        , config : {

            get : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'CONFIG GET', arguments );
                }
                return encode( 'CONFIG', 'GET', key );
            }

            , resetstat : function () {
                var me = this
                    ;
                return encode( 'CONFIG', 'RESETSTAT' );
            }

            , rewrite : function () {
                var me = this
                    ;
                return encode( 'CONFIG', 'REWRITE' );
            }

            , set : function ( key, value ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'CONFIG SET', arguments );
                }
                return encode( 'CONFIG', 'SET', [ key, value ] );
            }

        }

        , dbsize : function () {
            var me = this
                ;
            return encode( 'DBSIZE', parseInt );
        }

        , debug : {

            object : function ( key ) {
                var me = this
                    ;
                if ( ! key ) {
                    return error( 'DEBUG OBJECT', arguments );
                }
                return encode( 'DEBUG', 'OBJECT', key );
            }

            , segfault : function () {
                var me = this
                    ;
                return encode( 'DEBUG', 'SEGFAULT' );
            }

        }

        , flushall : function () {
            var me = this
                ;
            return encode( 'FLUSHALL', parseInt );
        }

        , flushdb : function () {
            var me = this
                ;
            return encode( 'FLUSHDB' );
        }

        , info : function () {
            // TODO: add utility fn to parse INFO result
            var me = this
                ;
            return encode( 'INFO' );
        }

        , lastsave : function () {
            var me = this
                ;
            return encode( 'LASTSAVE', parseInt );
        }

        , monitor : function () {
            var me = this
                ;
            return encode( 'MONITOR' );
        }

        , save : function () {
            var me = this
                ;
            return encode( 'SAVE' );
        }

        , shutdown : function ( opt ) {
            var me = this
                ;
            switch ( opt ) {
                case 'SAVE':
                case 'NOSAVE':
                    return encode( 'SHUTDOWN', opt );
                break;
                default:
                    return encode( 'SHUTDOWN' );
                break;
            };
        }

        , slaveof : function ( host, port ) {
            var me = this
                ;
            if ( ! host ) {
                return error( 'SLAVEOF', arguments );
            }
            return encode( 'SLAVEOF', host, port );
        }

        , slowlog : {

            get : function ( value ) {
                var me = this
                    ;
                if ( isNaN( + value ) ) {
                    return error( 'SLOWLOG GET', arguments );
                }
                // TODO: add utility fn to parse INFO result
                return encode( 'SLOWLOG', 'GET' );
            }

            , len : function () {
                var me = this
                    ;
                return encode( 'SLOWLOG', 'LEN' );
            }

            , reset : function () {
               var me = this
                    ;
                return encode( 'SLOWLOG', 'RESET' );
            }

        }

        , sync : function () {
            // NOTE: disabled, intended for slave replication.
            return error( 'SYNC' );
        }

        , time : function () {
            var me = this
                ;
            // TODO: add utility fn to parse TIME result
            return encode( 'TIME' );
        }

    };

};