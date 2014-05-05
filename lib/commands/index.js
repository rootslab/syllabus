/*
 * Exports all files containing commands mixins.
 */

module.exports = ( function () {
    var log = console.log
        , Bolgia = require( 'bolgia' )
        , ooo = Bolgia.circles
        , toString = Bolgia.toString
        // load command encoder
        , Sermone = require( 'sermone' )
        , encode = Sermone.encode
        , keys = Object.keys
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
                , arg : cargs
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
        ;

    for ( ; f < flen; file = files[ ++f ] ) {
        commands = require( './' + file ).commands( encode, error );
        Bolgia.mix( syllabus, commands );
        types[ file ] = collect( commands );
    };

    return {
        commands : syllabus
        , types : types
        , encode : encode
    }

} )();