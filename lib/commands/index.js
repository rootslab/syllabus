/*
 * Exports all files containing commands mixins.
 */

module.exports = ( function () {
    var log = console.log
        , util = require( 'util' )
        , Bolgia = require( 'bolgia' )
        , mix = Bolgia.mix
        , ooo = Bolgia.circles
        , toString = Bolgia.toString
        // load command encoder
        , Sermone = require( 'sermone' )
        , encode = Sermone.encode
        , keys = Object.keys
        , slice = Array.prototype.slice
        , files = [
            'keys'
            , 'strings'
            , 'hashes'
            , 'lists'
            , 'sets'
            , 'sortedsets'
            , 'hyperloglog'
            , 'pubsub'
            , 'transactions'
            , 'scripting'
            , 'connection'
            , 'server'
        ]
        , f = 0
        , flen = files.length
        , file = files[ 0 ]
        // object to store commands mix-ins
        , syllabus = {}
        , types = {}
        , commands = null
        // fn to build a reply obj with error
        , error = function ( cname, cargs ) {
            var emsg = 'Syllabus, wrong number of arguments for "%s" command.'
                ;
            return {
                cmd : cname
                , arg : slice.call( cargs )
                , err : new Error( util.format( emsg, cname ) )
            };
        }
        // recursively collect obj property names
        , collect = function ( obj, prefix ) {
            var o = null
                , p = prefix
                , path = null
                , arr = []
                ;
            for ( o in obj ) {
                path =  p ? ( p + ' ' + o ) : o;
                switch ( toString( obj[ o ] ) ) {
                    case ooo.obj:
                        arr.push( path );
                        arr = arr.concat( collect( obj[ o ], path ) );
                    break;
                    default:
                        arr.push( path );
                    break;
                };
            };
            return arr;
        }
        , wrap = function ( hash, eat ) {
            var h = null
                ;
            for ( h in hash ) {
                if ( toString( hash[ h ] ) === ooo.obj ) {
                    wrap( hash[ h ], eat );
                    continue;
                }
                hash[ h ] = ( function ( f ) {
                    return function () {
                        eat( f.apply( f, arguments ) );
                    };
                } )( hash[ h ] );
            };
        }
        ;

    for ( ; f < flen; file = files[ ++f ] ) {
        commands = require( './' + file ).commands( encode, error );
        mix( syllabus, commands );
        types[ file ] = collect( commands );
    };

    return {
        commands : syllabus
        , types : types
        , encode : encode
        , wrap : function ( eat ) {
            var me = this
                , commands = me.commands
                , fn = toString( eat ) === ooo.fun ? eat : null
                ;
            if ( ! fn ) {
                return false;
            }
            if ( commands ) {
                wrap( commands, fn );
                return true;
            }
            return false;
        }
    }

} )();