/*
 * Exports all files containing commands mixins.
 */

module.exports = ( function () {
    var log = console.log
        , Bolgia = require( 'bolgia' )
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
            // , 'scripting'
            , 'connection'
            // , 'server'
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
        ;

    for ( ; f < flen; file = files[ ++f ] ) {
        commands = require( './' + file ).commands( encode, error );
        Bolgia.mix( syllabus, commands );
        types[ file ] = keys( commands );
    };

    return {
        commands : syllabus
        , types : types
        , encode : encode
    }

} )();