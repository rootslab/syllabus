/*
 * Exports all files containing commands mixins.
 */

module.exports = ( function () {
    var log = console.log
        , Bolgia = require( 'bolgia' )
        , ooo = Bolgia.circles
        , toString = Bolgia.toString
        , isArray = Array.isArray
        , keys = Object.keys
        , files = [
            'keys' 
            // , 'strings'
            , 'hashes'
            // , 'lists'
            , 'sets'
            // , 'sortedsets'
            , 'hyperloglog'
            // , 'pubsub'
            , 'transactions'
            , 'scripting'
            , 'connection'
            // , 'server'
        ]
        , f = 0
        , flen = files.length
        , file = files[ 0 ]
        // object to store command infos mix-ins
        , infos = {}
        , info = null
        ;

    for ( ; f < flen; file = files[ ++f ] ) {
        info = require( './' + file ).infos;
        Bolgia.mix( infos, info );
    };

    return infos;

} )();