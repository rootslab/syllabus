/*
 * Syllabus, a collection of mix-ins for Redis commands.
 *
 * Copyright(c) 2014 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Syllabus = ( function () {
    var log = console.log
        // load redis commands mix-ins
        , commands = require( './commands/' )
        ;
    return {
        commands : commands
    };
} )();

