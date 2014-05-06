/*
 * Syllabus, a collection of helpers mix-ins to encode Redis_commands, builded upon Sermone.
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;

exports.Syllabus = function ( develop ) {

    var log = console.log
        , Bolgia = require( 'bolgia' )
        , ooo = Bolgia.circles
        , toString = Bolgia.toString
        , count = Bolgia.count
        , mix = Bolgia.mix
        , keys = Object.keys

        // load redis commands and infos mix-ins
        , syllabus = Bolgia.update( {}, require( './commands/' ) )
        , types = syllabus.types

        , infos = develop ? Bolgia.update( {}, require( './infos/' ) ) : {}

        // Redis URL
        , url_redis_cmd = 'http://redis.io/commands'

        // build commands info objects scanning mix-ins
        , info = function ( cname ) {
            var carr = cname ? cname.toLowerCase().split( ' ' ) : []
                , c = 0
                , o = syllabus.commands
                , x = infos
                , cmd = carr[ 0 ]
                , result = {
                    req : cname
                    , name : undefined
                    , args : -1
                    , type : undefined
                    , cmd : undefined
                    , sub : []
                }
                , t = null
                ;

            for ( t in types) {
                if ( ~ types[ t ].indexOf( cmd ) ) {
                    // set command category type
                    result.type = t;
                    for ( ; c < carr.length; cmd = carr[ ++c ] ) {
                        o = o[ cmd ];
                        if ( ! o ) {
                            break;
                        }
                        if ( x ) {
                            x = x[ cmd ];
                        }
                    };
                    switch ( toString( o ) ) {
                        case ooo.obj:
                            /*
                             * o is an object not a function, scan
                             * to get direct children sub-commands.
                             */
                            for ( c in o ) {
                                result.sub.push( c.toUpperCase() );
                            };
                        break;
                        default:
                            // fn, get the number of arguments
                            result.args = o ? o.length : -1;
                            Bolgia.update( result, x );
                        break;
                    };
                    result.name = carr.join( '.' ) // carr[ 0 ];
                    result.cmd = cname.toUpperCase();
                    // build redis.io url
                    result.url = url_redis_cmd + '/' + carr[ 0 ].toLowerCase();
                    break;
                }
            };

            return result;
        }

        /*
         * Recursively scan and add/remove info method 
         * property to all commands, also composite ones
         * like OBJECT REFCOUNT..
         */
        , stick = function ( enable, obj, prefix ) {
            var p = prefix || ''
                , en = ( toString( enable ) === ooo.und ) ? true : enable
                , o = null
                , obj = obj || syllabus.commands
                , el = null
                , fname = null
                // count parent and child commands
                , cnt = 0
                ;
            for ( o in obj ) {
                el = obj[ o ];
                fname = p ? ( p + ' ' + o ) : String( o );
                switch ( toString( el ) ) {
                    case ooo.fun:
                        if ( ! en ) {
                            delete( el.info );
                            ++cnt;
                            continue;
                        }
                        el.info = info.bind( this, fname );
                        ++cnt;
                    break;
                    case ooo.obj:
                        cnt += stick( en, el, fname );
                    break;
                };
            };
            return cnt;
        }

        , size = function () {
            var commands = syllabus.commands
                , types = syllabus.types
                // count non-obj properties ( leafs )
                , c = count( syllabus.commands, true )
                , t = null
                , result = {
                    commands : c
                    , types : {
                    }
                }
                ;

            for ( t in types ) {
                result.types[ t ] = count( types[ t ] );
            };

            return result;
        }
        ;

    return develop ?
           Bolgia.update( syllabus, { info : info , stick : stick, size : size } ) :
           syllabus
           ;
};
