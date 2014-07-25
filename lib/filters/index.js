module.exports = ( function () {
    var log = console.log
        , isArray = Array.isArray
        ;
    return {
        '*' : require( './all.js' )
    }
    ;
} )();