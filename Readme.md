###Σ Syllabus

[![NPM VERSION](http://img.shields.io/npm/v/syllabus.svg?style=flat)](https://www.npmjs.org/package/syllabus)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/syllabus)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/syllabus.svg?style=flat)](https://codeclimate.com/github/rootslab/syllabus)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/syllabus.svg?style=flat)](https://codeclimate.com/github/rootslab/syllabus)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/syllabus#mit-license)

[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/syllabus.svg?style=flat)](http://travis-ci.org/rootslab/syllabus)
[![BUILD STATUS](http://img.shields.io/david/rootslab/syllabus.svg?style=flat)](https://david-dm.org/rootslab/syllabus)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/syllabus.svg?style=flat)](https://david-dm.org/rootslab/syllabus#info=devDependencies)
[![NPM DOWNLOADS](http://img.shields.io/npm/dm/syllabus.svg?style=flat)](http://npm-stat.com/charts.html?package=syllabus)

[![NPM GRAPH1](https://nodei.co/npm-dl/syllabus.png)](https://nodei.co/npm/syllabus/)

[![NPM GRAPH2](https://nodei.co/npm/syllabus.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/syllabus/)

[![status](https://sourcegraph.com/api/repos/github.com/rootslab/syllabus/.badges/status.png)](https://sourcegraph.com/github.com/rootslab/syllabus)
[![views](https://sourcegraph.com/api/repos/github.com/rootslab/syllabus/.counters/views.png)](https://sourcegraph.com/github.com/rootslab/syllabus)
[![views 24h](https://sourcegraph.com/api/repos/github.com/rootslab/syllabus/.counters/views-24h.png)](https://sourcegraph.com/github.com/rootslab/syllabus)

> **_Σ Syllabus_**, a collection of helpers mix-ins to encode  __Redis__ commands and to decode __Redis__ replies, builded upon __[Sermone](https://github.com/rootslab/sermone)__. Moreover, Syllabus mantains a __cache__ for __LUA__ scripts, using the __[Camphora](https://github.com/rootslab/camphora)__ module. See __Syllabus.lua__ property.

> It also uses the __[Hoar](https://github.com/rootslab/hoar)__ module to handle semantic versioning, then __[Bolgia](https://github.com/rootslab/bolgia)__ and __[Abaco](https://github.com/rootslab/abaco)__ modules to get some utilities.

> __NOTE:__ If you need to handle bindings between _**Syllabus**_ commands and _**Redis**_ replies, take a look at __[♎ Libra](https://github.com/rootslab/libra)__, it uses __[Train](https://github.com/rootslab/train)__ queue under the hood, to get a simple _**rollback mechanism**_ for commands, and to gain some performances in some particular situations.

> __NOTE__: If you need a full-featured __Redis__ client, built with the help of __[♎ Libra](https://github.com/rootslab/libra)__ and __[Σ Syllabus](https://github.com/rootslab/syllabus)__ modules, try __[♠ Spade](https://github.com/rootslab/spade)__.

> Now __[176](#syllabus-commands)__ Redis commands mix-ins are implemented.

###Table of Contents

- __[Install](#install)__
- __[Run Tests](#run-tests)__
- __[Run Benchmarks](#run-benchmarks)__
- __[Constructor](#constructor)__
- __[Sample Usage](#sample-usage)__
- __[Properties, Methods](#properties-methods)__
- __[Syllabus Commands](#syllabus-commands)__
   - __[Keys](#keys)__
   - __[Strings](#strings)__
   - __[Hashes](#hashes)__
   - __[Lists](#lists)__
   - __[Sets](#sets)__
   - __[Sorted Sets](#sorted-sets)__
   - __[HyperLogLog](#hyperloglog)__
   - __[PubSub](#pubsub)__
   - __[Transactions](#transactions)__
   - __[Scripting](#scripting)__
   - __[Connection](#connection)__
   - __[Server](#server)__
- __[MIT License](#mit-license)__

-----------------------------------------------------------------------

###Install

```bash
$ npm install syllabus [-g]
// clone repo
$ git clone git@github.com:rootslab/syllabus.git
```
> __require__:

```javascript
var Syllabus  = require( 'syllabus' );
```

###Run Tests

```bash
$ cd syllabus/
$ npm test
```

###Run Benchmarks

```bash
$ cd syllabus/
$ npm run-script bench
```

###Constructor

> Create an instance.
> __Optionally__ it is possible to:
  - enable development / informational mode, with a boolean.
  - enable development mode and restrict commands available for a
    particular __Redis__ version, passing a __Semver__ string
    like __"1.0.0"__.

```javascript
var s = Syllabus( [ Boolean develop | String semver ] )
```

###Sample Usage

> Create a normal syllabus, then some syllabus in development mode.

```javascript
var log = console.log
    // production use
    , syll = Syllabus()
    // enable development mode
    , full = Syllabus( true )
    , recent = Syllabus( '2.6.0' )
    , old = Syllabus( '2.4.0' )
    , ancient = Syllabus( '1.0.0' )
    ;

log( full.size() );
log( recent.size() );
log( old.size() );
log( ancient.size() );
```
> See [examples](example/).

###Properties, Methods

> Arguments within [ ] are optional.

```javascript

Syllabus : {
    /*
     * A collection of Redis commands mix-ins.
     */
    commands : { .. }

    /*
     * Redis commands categories/keywords.
     */
    , types : { .. }

    /*
     * Use raw encoding for commands.
     * It accepts 4 different signatures.
     * See Sermone#encode.
     */
    , encode : Function

    /*
     * Wrap all Syllabus commands with a function that gets
     * as argument the result object from the command encoding.
     *
     * NOTE: It is useful to automatically enqueue or write
     * an encoded command to a socket.
     * See usage example in Spade code: https://github.com/rootslab/spade
     */
    , wrap : function ( Function wrapper ) : Boolean

    lua : {
      /*
       * The current initialized cache object/hash for LUA scripts,
       * a Camphora instance.
       * 
       * NOTE: This property will remain hidden/empty until you call
       * the #init method to explicitly show the LUA cache for scripts.
       */
      cache : null | Camphora

      /*
       * Initiliazing LUA script cache. Load all the files
       * found in the './lib/lua/scripts' directory, into the
       * cache; then encode all SCRIPT LOAD commands with
       * resulting data from files.
       * Optionally you could pass a config hash, as the last
       * argument, to create a new cache instance.
       *
       * - All script files are loaded in the local cache, a list
       *   of SCRIPT LOAD encoded commands will be passed to this
       *   callback.
       *
       * 'onCacheLoaded' : function ( Array commands )
       *
       * - This callback will be executed after that the script file
       *   will be loaded into the local cache and successfully
       *   processed by Redis.
       *
       * 'onFileProcessed' : function ( Boolean is_err_reply, String scr_name, String scr_digest, String scr_txt, Boolean isLast )
       *
       * Syllabus default options are:
       *
       * 'cache_init_opt' : (default cache is pre-initialized with this options)
       * {
       *    capacity : 128
       *    , encrypt_keys : false
       *    , algorithm : 'sha1'
       *    , input_encoding : 'binary'
       *    , output_encoding : 'hex'
       * }
       *
       * See Camphora constructor options at https://github.com/rootslab/camphora#options.
       *
       * 'file_load_opt' :
       * {
       *    // set encoding to utf8
       *    encoding : 'utf8'
       *    , flag : 'r'
       *    , payload : true
       *    , filepath : __dirname + '/scripts'
       * }
       *
       * See Camphora#load options at https://github.com/rootslab/camphora#methods.
       */
      , init : function ( Function onCacheLoaded, Function onFileProcessed [, Object file_load_opt [, Object cache_init_opt] ] ) : undefined

      /*
       * SCRIPT commands shortcuts that updating the cache.
       */
      , script : {
          
          /*
           * Flush Syllabus.lua.cache. 'fback' function will be called with the number
           * of elements flushed from the cache.
           * It returns encoded "SCRIPT FLUSH" command for Redis.
           */
          flush : function ( [ Function cback [, Function fback ] ] ) : Object

          /*
           * Load a key/script into the cache.
           * 'lback' function will be called with an argument that represents the entry
           * loaded in the cache, or undefined if an error occurs. 
           * It returns encoded "SCRIPT LOAD data" command for Redis. 
           */
          , load : function ( String key, String data [, Function cback [, Function lback ] ] ) : Object

          /*
           * Run a LUA script from the cache using its key/name.
           * It returns encoded "EVALSHA digest" command.
           */
          , run : function ( String sname, Array keys, Array args [, Function cback ] ) : Object
      }
      
      /*
       * Wrap Syllabus.lua.scripts commands with a function that gets
       * as argument the result object from the command encoding.
       *
       * NOTE: It is useful to automatically enqueue or write
       * an encoded command to a socket.
       * See usage example in Spade code: https//github.com/rootslab/spade
       */
      , wrap: function ( fn ) : Boolean
      
      /*
       * an hash of utilities to format special replies.
       */
      , formatters: {
          /*
           * format/convert a string like:
           *
           * - 'monitor 1404871788.612598 [0 127.0.0.1:35604] "ping"'
           * 
           * to an object/hash:
           *
           * {
           *  ip: '127.0.0.1',
           *  port: 47573,
           *  db: 0,
           *  cmd: '"ping"',
           *  utime: 1405478664248,
           *  time: [ 1405478664, 248185 ]
           * }
           *
           */
          monitor : function ( String message ) : Object

          /*
           * Format/convert a pubsub message to an object.
           *
           * NOTE: the 'formatter' function converts an Array like:
           *
           * - [ unsubscribe, 'channel', 0 ]
           *
           * to an object/hash:
           *
           * {
           *  type : 'unsubscribe'
           *  , chan : 'channel'
           *  . subs : 0
           * }
           *
           * - [ 'message', 'channel', 'Hello folks!' ]
           *
           * to an object/hash:
           *
           * {
           *  type : 'message'
           *  , chan : 'channel'
           *  . msg : 'Hello folks!!'
           * }
           */
         , message : function ( Array message ) : Object
      }

    }

    /* NOTE: methods below exist only in develop mode. */

    /*
     * Get some infos about a command.
     * 
     * Example: Syllabus.info( 'PiNg' );
     *
     * Output is:
     *
     * { 
     *   req: 'PiNg',
     *   name: 'ping',
     *   args: 0,
     *   type: 'connection',
     *   cmd: 'PING',
     *   sub: [],
     *   url: 'http://redis.io/commands/ping'
     *   rtype: '+|$|*',
     *   since: '1.0.0',
     *   hint: 'PING',
     *   descr: 'Ping the server.'
     * }
     *
     * NOTE:
     *
     *  - 'name' is the mix-in method name.
     *
     *  - 'args' refers to the number of arguments expected by the command
     *     mix-in method, not by the original Redis command.
     *
     *  - 'sub' collects command direct child(ren) for commands like: 
     *     OBJECT REFCOUNT, PUBSUB CHANNELS, etc..
     *
     *  - 'hint' is the Redis command infos, not the signature of mix-in method.
     *
     *  - 'since' indicates the Redis version from which the command is available.
     *
     *  - 'rtype' is the reply type expected from Redis, when the command will
     *     be write to socket.
     *     Redis reply types are:
     *       - ':' or integer reply.
     *       - '+' or simple string reply.
     *       - '$' or bulk string reply.
     *       - '*' or multibulk reply.
     *       - '-' or error reply.
     *
     */
    , info : function ( String cmd ) : Object

    /*
     * Stick or unstick the #info method to every
     * command function.
     *
     * It returns the number of commands/items that
     * were updated.
     * 
     * Example: Syllabus.commands.object.info();
     *
     * NOTE: use false to unstick.
     */
    , stick : function ( [ Boolean enable ] ) : Number

    /*
     * Get the current number of commands in the syllabus
     * and of keywords types, #size method counts also empty
     * parent commands.
     */
    , size : function () : Number

    /*
     * the current version / semver string specified , or '*'
     */
    , semver : String
}
```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

###Syllabus Commands

__Types:__
- [Keys](#keys) : _23 commands_.
- [Strings](#strings) : _26 commands_.
- [Hashes](#hashes) : _14 commands_.
- [Lists](#lists) : _17 commands_.
- [Sets](#sets) : _15 commands_.
- [Sorted Sets](#sorted-sets) : _20 commands_.
- [HyperLogLog](#hyperloglog) : _4 commands_.
- [PubSub](#pubsub) : _8 commands_.
- [Transactions](#transactions) : _5 commands_.
- [Scripting](#scripting) : _6 commands_.
- [Connection](#connection) : _5 commands_.
- [Server](#server) : _33 commands_.

> __NOTE:__ empty parent commands like DEBUG, CLIENT, .., are not counted.

> Every Syllabus command returns an obj/hash like this:

```javascript
obj = {
 /*
  * an info property about the number of multibulk
  * generated by the encoding.
  */
  bulks : 2

  // original command
  , cmd : 'GET'

 /*
  * encoded command for the  Redis Protocol,
  * ready for being sent to socket
  */
  , ecmd: '*2\r\n$3\r\nGET\r\n$1\r\n1\r\n'

 /*
  * 'fn' is an utility function to parse data replied by Redis after sending
  * a command. For default is Bolgia#reveal function ( it converts Buffers to
  * String and Numbers ), otherwise, depending on the command, the function
  * could be also Abaco#parseIntArray, Abaco#parseFloatArray, etc..
  */
  , fn : function ( Object data ) : Object

  /*
   * 'zn' is the callback function placeholder, for defaults it's an empty function;
   * it could be specified passing a function as the last argument to any of command
   * methods.
   * See signatures below to check the correct syntax of a particular command.
   */
  , zn : function ( err, data, fn ) : undefined
}
```

> if an __error__ occurred while encoding a command, the obj/hash will be something like:

```javascript
obj = {
  // command
  , cmd : 'GET'

  // current arguments for command mix-in
  , arg : Array

  // current Error instance
  , err : Error
}
```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####KEYS

> _Redis [Keys](http://redis.io/commands#generic), 23 commands + 1 empty parent command_.

> Arguments within [ ] are optional, '|' indicates multiple type for an argument.

```javascript

'del' : function ( Number key | String key | Array keys [, Function cback ] ) : Object

'dump' : function ( Number key | String key [, Function cback ] ) : Object

'exists' : function ( Number key | String key [, Function cback ] ) : Object

'expire' : function ( Number key | String key, Number seconds [, Function cback ] ) : Object

'expireat' : function ( Number key | String key, Number unixtime [, Function cback ] ) : Object

'keys' : function ( [ String pattern [, Function cback ] ] ) : Object

/*
 * migrate accepts an Array or on option Object:
 *
 * opt = {
 *   host : String
 *   , port : Number | String
 *   , db : Number | String
 *   , timeout : Number | String
 *   , action : [ String ]
 * }
 *
 * Original Redis command is:
 *
 * 'MIGRATE host port key destination-db timeout [COPY] [REPLACE]'
 *
 */
'migrate' : function( Number key | String key, Array args | Object opt [, Function cback ] ) : Object

'move' : function ( Number key | String key, String db | Number db [, Function cback ] ) : Object

'object' : {

    'encoding' : function ( Number key | String key [, Function cback ] ) : Object

    'idletime' : function ( Number key | String key [, Function cback ] ) : Object

    'refcount' : function ( Number key | String key [, Function cback ] ) : Object
}

'persist' : function ( Number key | String key [, Function cback ] ) : Object

'pexpire' : function ( Number key | String key, Number millis [, Function cback ] ) : Object

'pexpireat' : function ( Number key | String key, Number unixtime [, Function cback ] ) : Object

'pttl' : function ( Number key | String key [, Function cback ] ) : Object

'randomkey' : function ( [ Function cback ] ) : Object

'rename' : function ( Number key | String key, String name | Number name [, Function cback ] ) : Object

'renamenx' : function ( Number key | String key, String name | Number name [, Function cback ] ) : Object

/*
 * RESTORE gets a single Buffer as the last argument, like a reply from DUMP.
 *
 * Original Redis Command is:
 *
 * RESTORE key ttl serialized-value
 *
 */
'restore' : function ( Number key | String key, Number ttl, Buffer data [, Function cback ] ) : Object

/*
 * scan accepts an Array or on option Object:
 *
 * opt = {
 *   cursor : Number | String
 *   , match : String
 *   , count : Number | String
 * }
 *
 * Original Redis command is:
 *
 * SCAN cursor [MATCH pattern] [COUNT count]
 */
'scan' : function ( Number cursor | String cursor, Object opt | Array args [, Function cback ] ) : Object

/*
 * sort accepts an Array or on option Object:
 *
 * opt = {
 *   by : String
 *   , limit : Array
 *   , get : Array
 *   , order : String ( ASC | DESC | ALPHA )
 *   , store : Number | String
 * }
 * 
 * Original Redis command is:
 *
 * SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
 */
'sort' : function ( Number key | String key, Object opt | Array args [, Function cback ] ) : Object

'ttl' : function ( Number key | String key [, Function cback ] ) : Object

'type' : function ( Number key | String key [, Function cback ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####STRINGS

> _Redis [Strings](http://redis.io/commands#string), 26 commands + 1 empty parent command_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'append' : function ( Number key | String key, Number value | String value [, Function cback ] ) : Object

'bitcount' : function ( Number key | String key [, Array range [, Function cback ] ] ) : Object

'bittop' : { 

    'and' : function ( Number dest | String dest, Number key | String key | Array keys [, Function cback ] ) : Object

    'not' : function ( Number dest | String dest, Number key | String key | Array keys [, Function cback ] ) : Object

    'or' : function ( Number dest | String dest, Number key | String key | Array keys [, Function cback ] ) : Object

    'xor' : function ( Number dest | String dest, Number key | String key | Array keys [, Function cback ] ) : Object
}

'bitpos' : function ( Number key | String key, Number pos | String pos [, Array range [, Function cback ] ] ) : Object

'decr' : function ( Number key | String key [, Function cback ] ) : Object

'decrby' : function ( Number key | String key, Number integer | String integer [, Function cback ] ) : Object

'get' : function ( Number key | String key [, Function cback ] ) : Object

'getbit' : function ( Number key | String key, Number offset | String offset [, Function cback ] ) : Object

'getrange' : function ( Number key | String key, String start | Number start, String end | Number end [, Function cback ] ) : Object

'getset' : function ( Number key | String key, Number value | String value [, Function cback ] ) : Object

'incr' : function ( Number key | String key [, Function cback ] ) : Object

'incrby' : function ( Number key | String key, Number integer | String integer [, Function cback ] ) : Object

'incrbyfloat' : function ( Number key | String key, String float | Number float [, Function cback ] ) : Object

'mget' : function ( Number key | String key | Array keys [, Function cback ] ) : Object

/*
 * mset accepts an Array of fields and values or an Object:
 *
 * obj = {
 *   key1 : 'value1'
 *   key2 : 'value2'
 *   ..
 * }
 *
 * Original Redis command is:
 *
 * MSET key value [key value ...]
 */
'mset' : function ( Array args | Object fvalues [, Function cback ] ) : Object

/*
 * msetnx accepts an Array of fields and values or an Object:
 *
 * obj = {
 *   key1 : 'value1'
 *   key2 : 'value2'
 *   ..
 * }
 *
 * Original Redis command is:
 *
 * MSETNX key value [key value ...]
 */
'msetnx' : function ( Array args | Object fvalues [, Function cback ] ) : Object

'psetex' : function ( Number key | String key, String millis | Number millis, Number val | String val [, Function cback ] ) : Object

/*
 * set accepts an Array or on option Object:
 *
 * opt = {
 *   ex : String | Number
 *   , px : String | Number
 *   , check : String ( NX | XX )
 * }
 * 
 * Original Redis command is:
 *
 * SET key value [EX seconds] [PX milliseconds] [NX|XX]
 */
'set' : function ( Number key | String key, Number val | String val [, Array args | Object options [, Function cback ] ] ) : Object

'setbit' : function ( Number key | String key, Number offset | String offset, Number val | String val [, Function cback ] ) : Object

'setex' : function ( Number key | String key, Number secs | String secs, Number value | String value [, Function cback ] ) : Object

'setnx' : function ( Number key | String key, Number value | String value [, Function cback ] ) : Object

'setrange' : function ( Number start | String start, Number offset | String offset, Number val | String val [, Function cback ] ) : Object

'strlen' : function ( Number key | String key [, Function cback ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####HASHES

> _Redis [Hashes](http://redis.io/commands#hash), 14 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'hdel' : function ( Number key | String key, String field | Array fields [, Function cback ] ) : Object

'hexists' : function ( Number key | String key, String field [, Function cback ] ) : Object

'hget' : function ( Number key | String key, String field [, Function cback ] ) : Object

/*
 * The fn utility returned by the #hgetall mix-in, is able to
 * recursively convert the array/list reply to an obj/hash.
 * 
 * NOTE: utility fn is Bolgia#toHash, optionally it accepts
 * 3 further args:
 *
 * toHash( Array arr [, Boolean recur [, Object dest [, Boolean convert ] ] ] )
 *
 * - 'recur' id for de/activating recursion on nested arrays.
 * - 'dest' Object could be null, or an object/hast to populate.
 * - 'convert' enables automatic Buffer to String conversion, and
 *    String to Number conversion when it's possible.
 */
'hgetall' : function ( Number key | String key [, Function cback ] ) : Object

'hincrby' : function ( Number key | String key, String field, Number integer | String integer [, Function cback ] ) : Object

'hincrbyfloat' : function ( Number key | String key, String field, Number float | String float [, Function cback ] ) : Object

'hkeys' : function ( Number key | String key [, Function cback ] ) : Object

'hlen' : function ( Number key | String key [, Function cback ] ) : Object

 /*
  * The utility fn returned by the #hmget mix-in, is able to
  * recursively convert the array/list reply to an obj/hash.
  * See #hgetall about Bolgia#toHash.
  */
'hmget' : function ( Number key | String key, String field | Array fields ) : Object

/*
 * hmset accepts an Array of fields and values or an Object:
 *
 * obj = {
 *   key1 : 'value1'
 *   key2 : 'value2'
 *   ..
 * }
 *
 * Original Redis command is:
 *
 * HMSET key field value [field value ...]
 */
'hmset' : function ( Number key | array key, Array fvalues | Object fvalues [, Function cback ] ) : Object

/*
 * hscan accepts an Array or on option Object:
 *
 * opt = {
 *   cursor : Number | String
 *   , match : String
 *   , count : Number | String
 * }
 *
 * Original Redis command is:
 *
 * HSCAN key cursor [MATCH pattern] [COUNT count]
 */
'hscan' : function ( Number key | String key, Number cursor | String cursor, Object opt | Array args [, Function cback ] ) : Object

'hset' : function ( Number key | String key, String field, Number value | String value [, Function cback ] ) : Object

'hsetnx' : function ( Number key | String key, String field, Number value | String value [, Function cback ] ) : Object

'hvals' : function ( Number key | String key [, Function cback ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####LISTS

> _Redis [Lists](http://redis.io/commands#list), 17 commands_. 

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'blpop' : function ( Number key | String key, Number timeout | String timeout [, Function cback ] ) : Object

'brpop' : function ( Number key | String key, Number timeout | String timeout [, Function cback ] ) : Object

'brpoplpush' : function ( Number src | String src, Number dest | String dest, Number timeout | String timeout [, Function cback ] ) : Object

'lindex' : function ( Number key | String key, Number index | String index [, Function cback ] ) : Object

'linsert' : function ( Number key | String key, String pos, Number pivot | String pivot, Number val | String val [, Function cback ] ) : Object

'llen' : function ( Number key | String key [, Function cback ] ) : Object

'lpop' : function ( Number key | String key [, Function cback ] ) : Object

'lpush' : function ( Number src | String src, String value | Array values [, Function cback ] ) : Object

'lpushx' : function ( Number src | String src, String value [, Function cback ] ) : Object

'lrange' : function ( Number key | String key, Number start | String start, Number stop | String stop [, Function cback ] ) : Object

'lrem' : function ( Number key | String key, Number count | String count, Number val | String val [, Function cback ] ) : Object

'lset' : function ( Number key | String key, Number index | String index, Number val | String val [, Function cback ] ) : Object

'ltrim' : function ( Number key | String key, Number start | String start, Number stop | String stop [, Function cback ] ) : Object

'rpop' : function ( Number key | String key [, Function cback ] ) : Object

'rpoplpush' : function ( Number src | String src, Number dest | String dest [, Function cback ] ) : Object

'rpush' : function ( Number src | String src, String value | Array values [, Function cback ] ) : Object

'rpushx' : function ( Number src | String src, Number value | String value [, Function cback ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####SETS

> _Redis [Sets](http://redis.io/commands#set), 15 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'sadd' : function ( Number key | String key, String member | Array members [, Function cback ] ) : Object

'scard' : function ( Number key | String key [, Function cback ] ) : Object

'sdiff' : function ( Number key | String key | Array keys [, Function cback ] ) : Object

'sdiffstore' : function ( Number dest | String dest, Number key | String key | Array keys [, Function cback ] ) : Object

'sinter' : function ( Number key | String key | Array keys [, Function cback ] ) : Object

'sinterstore' : function ( Number dest | String dest, Number key | String key | Array keys [, Function cback ] ) : Object

'sismember' : function ( Number key | String key, String member | Array members [, Function cback ] ) : Object

'smove' : function ( Number src | String src, Number dest | String dest, Number member | String member [, Function cback ] ) : Object

'smembers' : function ( Number key | String key [, Function cback ] ) : Object

'spop' : function ( Number key | String key [, Function cback ] ) : Object

'srandmember' : function ( Number key | String key, Number count | String count [, Function cback ] ) : Object

'srem' : function ( Number key | String key, Number member | String members | Array members [, Function cback ] ) : Object

/*
 * sscan accepts an Array or on option Object:
 *
 * opt = {
 *   cursor : Number | String
 *   , match : String
 *   , count : Number | String
 * }
 *
 * Original Redis command is:
 *
 * SSCAN key cursor [MATCH pattern] [COUNT count]
 */
'sscan' : function ( Number key | String key, Number cursor | String cursor, Object opt | Array args [, Function cback ] ) : Object

'sunion' : function ( Number key | String key | Array keys [, Function cback ] ) : Object

'sunionstore' : function ( Number dest | String dest, Number key | String key | Array keys [, Function cback ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####SORTED SETS

> _Redis [Sorted Sets](http://redis.io/commands#sorted_set), 20 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

/*
 * zadd accepts an Array of scores and members or an Object:
 *
 * obj = {
 *   '1.5' : 'member1'
 *   '2' : 'member2'
 *   ..
 * }
 *
 * Original Redis command is:
 *
 * ZADD key score member [score member ...]
 */
'zadd' : function ( Number key | string key, Array args | Object scores [, Function cback ] ) : Object

'zcard' : function ( Number key | String key [, Function cback ] ) : Object

'zcount' : function ( Number key | String key, Number min | String min, Number max | String max [, Function cback ] ) : Object

'zincrby' : function ( Number key | String key, Number integer | String integer, Number member | String member [, Function cback ] ) : Object

/*
 * zinterstore optionally accepts an array of weights and an aggregate string option.
 *
 * Original Redis command is:
 *
 * ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
 */
'zinterstore' : function ( Number dest | String dest, Array keys [, Array weights [, String aggregate [, Function cback ] ] ] ) : Object

'zlexcount' : function ( Number key | String key, Number min | String min, Number max | String max [, Function cback ] ) : Object

'zrange' : function ( Number key | String key, Number start | String start, Number stop | String stop [, Boolean withscores [, Function cback ] ] ) : Object

/*
 * zrangebylex optionally accepts a limit array containing an offset and a count.
 *
 * Original Redis command is:
 *
 * ZRANGEBYLEX key min max [LIMIT offset count]
 */
'zrangebylex' : function ( Number key | String key, Number min | String min, Number max | String max [, Array limit  [, Function cback ] ] ) : Object

'zrangebyscore' : function ( Number key | String key, Number min | String min, Number max | String max [, Boolean withscores [, Function cback ] ] ) : Object

'zrank' : function ( Number key | String key, Number member | String member [, Function cback ] ) : Object

'zrem' : function ( Number key | String key, Number member | String member | Array members [, Function cback ] ) : Object

'zremrangebylex' : function ( Number key | String key, Number min | String min, Number max | String max [, Function cback ] ) : Object

'zremrangebyrank' : function ( Number key | String key, Number start | String start, Number stop | String stop [, Function cback ] ) : Object

'zremrangebyscore' : function ( Number key | String key, Number min | String min, Number max | String max [, Function cback ] ) : Object

'zrevrank' : function ( Number key | String key, Number member | String member [, Function cback ] ) : Object

'zrevrange' : function ( Number key | String key, Number start | String start, Number stop | String stop [, Boolean withscores [, Function cback ] ] ) : Object

/*
 * zrevrangebyscore optionally accepts a withscores boolean and a limit array containing an offset and a count.
 *
 * Original Redis command is:
 *
 * ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
 */
'zrevrangebyscore' : function ( Number key | String key, Number start | String start, Number stop | String stop [, Boolean withscores [, Array limit [, Function cback ] ] ] ) : Object

/*
 * zscan accepts an Array or on option Object:
 *
 * opt = {
 *   cursor : Number | String
 *   , match : String
 *   , count : Number | String
 * }
 *
 * Original Redis command is:
 *
 * ZSCAN key cursor [MATCH pattern] [COUNT count]
 */
'zscan' : function ( Number key | String key, Number cursor | String cursor, Object opt | Array args [, Function cback ] ) : Object

'zscore' : function ( Number key | String key, Number member | String member [, Function cback ] ) : Object

/*
 * zunionstore optionally accepts an array of weights and an aggregate string option.
 *
 * Original Redis command is:
 *
 * ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
 */
'zunionstore' : function ( Number dest | String dest, Array keys [, Array weights [, String aggregate [, Function cback ] ] ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####HYPERLOGLOG

> _Redis [HyperLogLog](http://redis.io/commands#hyperloglog), 4 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'pfadd' : function ( Number key | String key, String channel | Array channels [, Function cback ] ) : Object

'pfcount' : function ( Number key | String key | Array keys [, Function cback ] ) : Object

'pfmerge' : function ( Number dest | String dest, String source | Array sources [, Function cback ] ) : Object

'pfselftest' : function ( [ Function cback ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####PUBSUB

> _Redis [PubSub](http://redis.io/commands#pubsub), 8 commands + 1 empty parent command_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'publish' : function ( String channel, String message [, Function cback ] ) : Object

'pubsub' : {

    'channels' : function ( [ String pattern [, Function cback ] ] ) : Object

    'numpat' : function ( [ Function cback ] ) : Object

    'numsub' : function ( String channel | Array channels [, Function cback ] ) : Object
}

'psubscribe' : function ( String pattern | Array patterns [, Function cback ] ) : Object

'punsubscribe' : function ( String pattern | Array patterns [, Function cback ] ) : Object

'subscribe' : function ( Number channel | String channel | Array channels [, Function cback ] ) : Object

'unsubscribe' : function ( [ String channel | Array channels [, Function cback ] ] ) : Object

```
> __NOTE__: to unsubscribe from all channels use null or [].

_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####TRANSACTIONS

> _Redis [Transactions](http://redis.io/commands#transactions), 5 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'discard' : function ( [ Function cback ] ) : Object

'exec' : function ( [ Function cback ] ) : Object

'multi' : function ( [ Function cback ] ) : Object

'watch' : function ( Number key | String key | Array keys [, Function cback ] ) : Object

'unwatch' : function ( [ Function cback ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####SCRIPTING

> _Redis [Scripting](http://redis.io/commands#scripting), 6 commands + 1 empty parent command_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

/*
 * eval accepts 2 Arrays of keys and args.
 *
 * Original Redis command is:
 *
 * EVAL script numkeys key [key ...] arg [arg ...]
 */
'eval' : function ( String script, Array keys, Array args [, Function cback ] ) : Object

/*
 * evalsha accepts 2 Arrays of keys and args.
 *
 * Original Redis command is:
 *
 * EVALSHA sha1 numkeys key [key ...] arg [arg ...]
 */
'evalsha' : function ( String sha, Array keys, Array args [, Function cback ] ) : Object

'script' : {

    'exists' : function ( String key | Array keys [, Function cback ] ) : Object

    'flush' : function ( [ Function cback ] ) : Object

    'kill' : function ( [ Function cback ] ) : Object

    'load' : function ( String key [, Function cback ] ) : Object
}

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####CONNECTION

> _Redis [Connection](http://redis.io/commands#connection), 5 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'auth' : function ( String password [, Function cback ] ) : Object

'echo' : function ( Number string | String string [, Function cback ] ) : Object

// legacy ping
'ping' : function ( [ Function cback ] ) : Object

// Redis >= 2.8.x ping, available also in pubsub mode
'ping' : function ( [ String message, [ Function cback ] ] ) : Object

'quit' : function ( [ Function cback ] ) : Object

'select' : function ( Number db | String db [, Function cback ] ) : Object

```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

####SERVER

> _Redis [Server](http://redis.io/commands#server), 33 commands + 6 empty parent commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

'bgrewriteaof' : function ( [ Function cback ] ) : Object

'bgsave' : function ( [ Function cback ] ) : Object

'client' : {

    'getname' : function ( [ Function cback ] ) : Object

    'kill' : function ( Number key | String key, Number ip | String ip, Number port | String port [, Function cback ] ) : Object

    /*
     * The fn utility returned by the #list mix-in, is able to convert
     * the reply to a list/array of hashes/objects, each listing infos 
     * for a distinct client.
     *
     * See http://redis.io/commands/client-list for a full explanation
     * of properties.
     */
    'list' : function ( [ Function cback ] ) : Object

    'pause' : function ( Number millis | String millis [, Function cback ] ) : Object

    'setname' : function ( Number name | String name [, Function cback ] ) : Object
}

'cluster' : {
  'slots' : function ( [ Function cback ] ) : Object
}

'config' : {
    /*
     * The utility fn returned by the #config.get mix-in,
     * converts the array/list reply to an obj/hash, it
     * converts ASCII Strings numbers to Numbers and 
     * strings 'yes' and 'no' to Booleans true/false.
     */
    'get' : function ( String param [, Function cback ] ) : Object

    'resetstat' : function ( [ Function cback ] ) : Object

    'rewrite' : function ( [ Function cback ] ) : Object

    'set' : function ( String param, Number value | String value [, Function cback ] ) : Object
}

'command' : {
    /*
     * COMMAND LIST doesn't exists; it is s a placeholder for COMMAND.
     */
    'list' : function ( [ Function cback ] ) : Object

    'info' : function ( String cmd | Array list [ Function cback ] ) : Object

    'getkeys' : function ( String cmd | Array cmd [, Function cback ] ) : Object

    'count' : function ( [ Function cback ] ) : Object
}

'dbsize' : function ( [ Function cback ] ) : Object

'debug' : {

    'object' : function ( Number key | String key [, Function cback ] ) : Object 

    'segfault' : function ( [ Function cback ] ) : Object
}

'flushall' : function ( [ Function cback ] ) : Object

'flushdb' : function ( [ Function cback ] ) : Object

/*
 * The fn utility returned by the #info mix-in, is able to convert the
 * reply to a 2-level deep hash, first level properties are Sections,
 * at the second level there are section properties.
 *
 * See http://redis.io/commands/info for a full explanation of sections
 * and properties.
 *
 * NOTE: The first argument of the utility fn could be a Buffer or a String.
 */
'info' : function ( [ String section [, Function cback ] ] ) : Object

'lastsave' : function ( [ Function cback ] ) : Object

'monitor' : function ( [ Function cback ] ) : Object

 /*
  * ROLE reply:
  *
  * - for MASTER:   [ 'master', 155, [ [ '127.0.0.1', 6380, 155 ], [ '127.0.0.1', 6381, 155 ] ] ] ]
  * - for SLAVE:    [ 'slave','127.0.0.1', 6379,'connected', 155 ] ]
  * - for SENTINEL: [ sentinel, [ 'master_name_1', ,,,, 'master_name_N' ] ]
  *
  * The utility fn passed to the callback, if applied to data, converts results in this way:
  *
  * - for a master:
  *  {
  *    type: 'master',
  *    replica_offset: 155,
  *    connected_slaves: [ [ '127.0.0.1', 6380, 155 ], [ '127.0.0.1', 6381, 155 ] ]
  *  }
  *
  * - for a slave:
  *  {
  *    type: 'slave',
  *    master_ip: '127.0.0.1',
  *    master_port: 6380,
  *    replica_status: 'connected',
  *    replica_offset: 155
  *  }
  *
  * - for a sentinel:
  *  {
  *    type: 'slave',
  *    master_names : [ 'master_name_1', ,,,, 'master_name_N' ]
  *  }
  */
'role' : function ( [ Function cback ] ) : Object

'save' : function ( [ Function cback ] ) : Object

'shutdown' : function ( [ String opt [, Function cback ] ] ) : Object

'slaveof' : function ( String host, Number port | String port [, Function cback ] ) : Object

'slowlog' : {

    'get' : function ( Number integer | String integer [, Function cback ] ) : Object

    'len' : function ( [ Function cback ] ) : Object

    'reset' : function ( [ Function cback ] ) : Object
}

'sync' : function ( [ Function cback ] ) : Object

'time' : function ( [ Function cback ] ) : Object
```
_[Back to ToC](#table-of-contents)_

----------------------------------------------------------------------

### MIT License

> Copyright (c) 2015 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![GA](https://ga-beacon.appspot.com/UA-53998692-1/syllabus/Readme?pixel)](https://github.com/igrigorik/ga-beacon)
