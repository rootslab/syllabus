/*
 * Exports all files containing commands mixins.
 */

module.exports = ( function () {
    var Bolgia = require( 'bolgia' )
        , mix = Bolgia.mix
        , files = [
            'connection'
            , 'geo'
            , 'hashes'
            , 'hyperloglog'
            , 'keys'
            , 'lists'
            , 'pubsub'
            , 'scripting'
            , 'server'
            , 'sets'
            , 'sortedsets'
            , 'strings'
            , 'transactions'
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
        mix( infos, info );
    }

    return infos;

} )();