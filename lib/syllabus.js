/*
 * Syllabus, a collection of mix-ins for Redis commands.
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Syllabus = ( function () {
    var log = console.log
        , Bolgia = require( 'bolgia' )
        , ooo = Bolgia.circles
        , toString = Bolgia.toString
        , mix = Bolgia.mix
        // load redis commands and infos mix-ins
        , syllabus = require( './commands/' )
        , types = syllabus.types
        , infos = require( './infos/' )
        // Redis URL
        , url_redis_cmd = 'http://redis.io/commands'
        // build commands info objects scanning  mix-ins
        , scan = function ( cname ) {
            var carr = cname ? cname.toLowerCase().split( ' ' ) : []
                , c = 0
                , o = syllabus.commands
                , x = infos
                , cmd = carr[ 0 ]
                , result = {
                    name : undefined
                    , args : -1
                    , type : undefined
                    , cmd : undefined
                    , sub : []
                }
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
                            // get the number of fn arguments
                            result.args = o ? o.length : -1;
                        break;
                    };
                    result.name = carr[ 0 ];
                    result.cmd = cname.toUpperCase();
                    if ( x !== infos ) {
                        Bolgia.update( result, x );
                    }
                    result.url = url_redis_cmd + '/' + cname;
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
                        el.info = scan.bind( this, fname );
                        ++cnt;
                    break;
                    case ooo.obj:
                        stick( en, el, fname );
                    break;
                };
            };
            return cnt;
        }
        ;

        // update syllabus with info and stick methods
        Bolgia.update( syllabus, {
            info : scan
            , stick : stick
        } );

    return syllabus;

} )();