###Syllabus
[![build status](https://secure.travis-ci.org/rootslab/syllabus.png?branch=master)](http://travis-ci.org/rootslab/syllabus) 
[![NPM version](https://badge.fury.io/js/syllabus.png)](http://badge.fury.io/js/syllabus)

[![NPM](https://nodei.co/npm/syllabus.png?downloads=true&stars=true)](https://nodei.co/npm/syllabus/)

[![NPM](https://nodei.co/npm-dl/syllabus.png)](https://nodei.co/npm/syllabus/)

> **_Syllabus_**, a collection of helpers mix-ins to encode  __Redis__ commands, builded upon __[Sermone](https://github.com/rootslab/sermone)__.

> Now __[169](#syllabus-commands)__ Redis commands mix-ins are implemented.

###Install

```bash
$ npm install syllabus [-g]
// clone repo
$ git clone git@github.com:rootslab/syllabus.git
```

> __require__ .

```javascript
var Syllabus  = require( 'syllabus' );
```

###Run Tests

```bash
$ cd syllabus/
$ npm test
```
###Constructor

> Create an instance. Optionally it is possible to enable
> development / informational mode, with a Boolean true.

```javascript
var s = Syllabus( [ Boolean develop ] )
```

###Sample Usage

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
     *   rtype: '+',
     *   since: [ 1, 0, 0 ],
     *   hint: 'PING',
     *   url: 'http://redis.io/commands/ping'
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
    , info : function ( String cmd )  : Object

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
     * and of keywords types.
     */
    , size : function () : Number
}
```
-------------------------------------------------------------------------------------------------

###Syllabus Commands

__Types:__
- [Keys](#keys) : _23 commands_.
- [Strings](#strings) : _26 commands_.
- [Hashes](#hashes) : _14 commands_.
- [Lists](#lists) : _17 commands_.
- [Sets](#sets) : _15 commands_.
- [Sorted Sets](#sorted-sets) : _20 commands_.
- [HyperLogLog](#hyperloglog) : _3 commands_.
- [PubSub](#pubsub) : _8 commands_.
- [Transactions](#transactions) : _5 commands_.
- [Scripting](#scripting) : _6 commands_.
- [Connection](#connection) : _5 commands_.
- [Server](#server) : _27 commands_.

> Every Syllabus command returns an obj/hash:

```javascript
obj = {
 /*
  * an info property about the number of multibulk
  * generated by the encoding.
  */
  'bulks' : 2

  // original command
  , 'cmd' : 'GET'

 /*
  * encoded command for the  Redis Protocol,
  * ready for being sent to socket
  */
  , ecmd: '*2\r\n$3\r\nGET\r\n$1\r\n1\r\n'

 /*
  * An utility function to parse data replied by Redis
  * after sending a command. For default is an echo function
  * ( it returns input as output ), otherwise depending on
  * command the function could be Abaco#parseInt,
  * Abaco#parseFloat, etc..
  */
  , 'fn' : function ( Object data )  : Object
}
```

####KEYS

> _Redis [Keys](http://redis.io/commands#generic), 23 commands + 1 empty parent command_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'del' : function ( Number key | String key | Array keys ) : Object

'dump' : function ( Number key | String key ) : Object

'exists' : function ( Number key | String key ) : Object

'expire' : function ( Number key | String key, Number seconds ) : Object

'expireat' : function ( Number key | String key, Number unixtime ) : Object

'keys' : function ( [ String pattern ] ) : Object

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
'migrate' : function( Number key | String key, Array args | Object opt ) : Object

'move' : function ( Number key | String key, String db | Number db ) : Object

'object' : {

    'encoding' : function ( Number key | String key ) : Object

    'idletime' : function ( Number key | String key ) : Object

    'refcount' : function ( Number key | String key ) : Object
}

'persist' : function ( Number key | String key ) : Object

'pexpire' : function ( Number key | String key, Number millis ) : Object

'pexpireat' : function ( Number key | String key, Number unixtime ) : Object

'pttl' : function ( Number key | String key ) : Object

'randomkey' : function () : Object

'rename' : function ( Number key | String key, String name | Number name ) : Object

'renamenx' : function ( Number key | String key, String name | Number name ) : Object

/*
 * RESTORE gets a single Buffer as the last argument, like a reply from DUMP.
 *
 * Original Redis Command is:
 *
 * RESTORE key ttl serialized-value
 *
 */
'restore' : function ( Number key | String key, Number ttl, Buffer data ) : Object

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
'scan' : function ( String cursor | Number cursor, Object opt | Array args ) : Object

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
'sort' : function ( Number key | String key, Object opt | Array args ) : Object

'ttl' : function ( Number key | String key ) : Object

'type' : function ( Number key | String key ) : Object

```
_[Back to Index](#syllabus-commands)_

####STRINGS

> _Redis [Strings](http://redis.io/commands#string), 26 commands + 1 empty parent command_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'append' : function ( Number key | String key, Number value | String value ) : Object

'bitcount' : function ( Number key | String key [, Array range ] ) : Object

'bittop' : { 

    'and' : function ( String dest | Number dest, Number key | String key | Array keys ) : Object

    'not' : function ( String dest | Number dest, Number key | String key | Array keys ) : Object

    'or' : function ( String dest | Number dest, Number key | String key | Array keys ) : Object

    'xor' : function ( String dest | Number dest, Number key | String key | Array keys ) : Object
}

'bitpos' : function ( Number key | String key, Number pos | String pos [, Array range ] ) : Object

'decr' : function ( Number key | String key ) : Object

'decrby' : function ( Number key | String key, Number integer | String integer ) : Object

'get' : function ( Number key | String key ) : Object

'getbit' : function ( Number key | String key, Number offset | String offset ) : Object

'getrange' : function ( Number key | String key, String start | Number start, String end | Number end ) : Object

'getset' : function ( Number key | String key, Number value | String value ) : Object

'incr' : function ( Number key | String key ) : Object

'incrby' : function ( Number key | String key, Number integer | String integer ) : Object

'incrbyfloat' : function ( Number key | String key, String float | Number float ) : Object

'mget' : function ( Number key | String key | Array keys ) : Object

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
'mset' : function ( Array args | Object fvalues ) : Object

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
'msetnx' : function ( Array args | Object fvalues ) : Object

'psetex' : function ( Number key | String key, String millis | Number millis, Number val | String val ) : Object

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
'set' : function ( Number key | String key, Number val | String val [, Array args | Object options ] ) : Object

'setbit' : function ( Number key | String key, Number offset | String offset, Number val | String val ) : Object

'setex' : function ( Number key | String key, Number secs | String secs, Number value | String value ) : Object

'setnx' : function ( Number key | String key, Number value | String value ) : Object

'setrange' : function ( Number start | String start, Number offset | String offset, Number val | String val ) : Object

'strlen' : function ( Number key | String key ) : Object

```
_[Back to Index](#syllabus-commands)_

####HASHES

> _Redis [Hashes](http://redis.io/commands#hash), 14 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'hdel' : function ( Number key | String key, String field | Array fields ) : Object

'hexists' : function ( Number key | String key, String field ) : Object

'hget' : function ( Number key | String key, String field ) : Object

'hgetall' : function ( Number key | String key ) : Object

'hincrby' : function ( Number key | String key, String field, Number integer | String integer ) : Object

'hincrbyfloat' : function ( Number key | String key, String field, Number float | String float ) : Object

'hkeys' : function ( Number key | String key ) : Object

'hlen' : function ( Number key | String key ) : Object

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
'hmset' : function ( Number key | array key, Array fvalues | Object fvalues ) : Object

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
'hscan' : function ( Number key | String key, Number cursor | String cursor, Object opt | Array args ) : Object

'hset' : function ( Number key | String key, String field, Number value | String value ) : Object

'hsetnx' : function ( Number key | String key, String field, Number value | String value ) : Object

'hvals' : function ( Number key | String key ) : Object

```
_[Back to Index](#syllabus-commands)_

####LISTS

> _Redis [Lists](http://redis.io/commands#list), 17 commands_. 

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'blpop' : function ( Number key | String key, Number timeout | String timeout ) : Object

'brpop' : function ( Number key | String key, Number timeout | String timeout ) : Object

'brpoplpush' : function ( Number src | String src, Number dest | String dest, Number timeout | String timeout ) : Object

'lindex' : function ( Number key | String key, Number index | String index ) : Object

'linsert' : function ( Number key | String key, String pos, Number pivot | String pivot, Number val | String val ) : Object

'llen' : function ( Number key | String key ) : Object

'lpop' : function ( Number key | String key ) : Object

'lpush' : function ( Number src | String src, String value | Array values ) : Object

'lpushx' : function ( Number src | String src, String value ) : Object

'lrange' : function ( Number key | String key, Number start | String start, Number stop | String stop ) : Object

'lrem' : function ( Number key | String key, Number count | String count, Number val | String val ) : Object

'lset' : function ( Number key | String key, Number index | String index, Number val | String val ) : Object

'ltrim' : function ( Number key | String key, Number start | String start, Number stop | String stop ) : Object

'rpop' : function ( Number key | String key ) : Object

'rpoplpush' : function ( Number src | String src, Number dest | String dest ) : Object

'rpush' : function ( Number src | String src, String value | Array values ) : Object

'rpushx' : function ( Number src | String src, Number value | String value ) : Object

```
_[Back to Index](#syllabus-commands)_

####SETS

> _Redis [Sets](http://redis.io/commands#set), 15 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'sadd' : function ( Number key | String key, String member | Array members ) : Object

'scard' : function ( Number key | String key ) : Object

'sdiff' : function ( Number key | String key | Array keys ) : Object

'sdiffstore' : function ( Number dest | String dest, Number key | String key | Array keys ) : Object

'sinter' : function ( Number key | String key | Array keys ) : Object

'sinterstore' : function ( Number dest | String dest, Number key | String key | Array keys ) : Object

'sismember' : function ( Number key | String key, String member | Array members ) : Object

'smove' : function ( Number src | String src, Number dest | String dest, Number member | String member ) : Object

'smembers' : function ( Number key | String key ) : Object

'spop' : function ( Number key | String key ) : Object

'srandmember' : function ( Number key | String key, Number count | String count ) : Object

'srem' : function ( Number key | String key, Number member | String members | Array members ) : Object

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
'sscan' : function ( Number key | String key, Number cursor | String cursor, Object opt | Array args ) : Object

'sunion' : function ( Number key | String key | Array keys ) : Object

'sunionstore' : function ( Number dest | String dest, Number key | String key | Array keys ) : Object

```
_[Back to Index](#syllabus-commands)_

####SORTED SETS

> _Redis [Sorted Sets](http://redis.io/commands#sorted_set), 20 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'zcount' : function (  ) : Object

'zadd' : function (  ) : Object

'zcard' : function (  ) : Object

'zincrby' : function (  ) : Object

'zinterstore' : function (  ) : Object

'zlexcount' : function (  ) : Object

'zrevrank' : function (  ) : Object

'zrange' : function (  ) : Object

'zrangebylex' : function (  ) : Object

'zrangebyscore' : function (  ) : Object

'zrank' : function (  ) : Object

'zrem' : function (  ) : Object

'zremrangebylex' : function (  ) : Object

'zremrangebyrank' : function (  ) : Object

'zremrangebyscore' : function (  ) : Object

'zrevrange' : function (  ) : Object

'zrevrangebyscore' : function (  ) : Object

'zscan' : function (  ) : Object

'zscore' : function (  ) : Object

'zunionstore' : function (  ) : Object

```
_[Back to Index](#syllabus-commands)_

####HYPERLOGLOG

> _Redis [HyperLogLog](http://redis.io/commands#hyperloglog), 3 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'pfadd' : function ( Number key | String key, String channel | Array channels ) : Object

'pfcount' : function ( Number key | String key, Array keys ) : Object

'pfmerge' : function ( Number dest | String dest, String source | Array sources ) : Object

```
_[Back to Index](#syllabus-commands)_

####PUBSUB

> _Redis [PubSub](http://redis.io/commands#pubsub), 8 commands + 1 empty parent command_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'psubscribe' : function ( String pattern | Array patterns ) : Object

'publish' : function ( String channel, String message ) : Object

'pubsub' : {

    'channels' : function ( [ String pattern ] ) : Object

    'numpat' : function () : Object

    'numsub' : function ( String channel | Array channels ) : Object
}

'punsubscribe' : function ( String pattern | Array patterns ) : Object

'subscribe' : function ( Number channel | String channel | Array channels ) : Object

'unsubscribe' : function ( [ String channel | Array channels ] ) : Object

```
_[Back to Index](#syllabus-commands)_

####TRANSACTIONS

> _Redis [Transactions](http://redis.io/commands#transactions), 5 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'discard' : function () : Object

'exec' : function () : Object

'multi' : function () : Object

'watch' : function ( Number key | String key | Array keys ) : Object

'unwatch' : function () : Object

```
_[Back to Index](#syllabus-commands)_

####SCRIPTING

> _Redis [Scripting](http://redis.io/commands#scripting), 6 commands + 1 empty parent command_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'eval' : function (  ) : Object

'evalsha' : function (  ) : Object

'script' : {

    'exists' : function (  ) : Object

    'flush' : function (  ) : Object

    'kill' : function (  ) : Object

    'load' : function (  ) : Object
}

```
_[Back to Index](#syllabus-commands)_

####CONNECTION

> _Redis [Connection](http://redis.io/commands#connection), 5 commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'auth' : function ( String password ) : Object

'echo' : function ( Number string | String string ) : Object

'ping' : function () : Object

'quit' : function () : Object

'select' : function ( Number db | String db ) : Object

```
_[Back to Index](#syllabus-commands)_

####SERVER

> _Redis [Server](http://redis.io/commands#server), 27 commands + 4 empty parent commands_.

> Arguments within [ ] are optional, '|' indicates multiple type for argument.

```javascript

// NOTE: first mix-in argument, generally the "key", could be a Number, but not 0, use '0' instead.

'bgrewriteaof' : function () : Object

'bgsave' : function () : Object

'client' : {

    'getname' : function () : Object

    'kill' : function ( Number key | String key, Number ip | String ip, Number port | String port ) : Object

    'list' : function () : Object

    'pause' : function ( Number millis | String millis ) : Object

    'setname' : function ( Number name | String name ) : Object
}

'config' : {

    'get' : function ( String param ) : Object

    'resetstat' : function () : Object

    'rewrite' : function () : Object

    'set' : function ( String param, Number value | String value ) : Object
}

'dbsize' : function () : Object

'debug' : {

    'object' : function ( Number key | String key ) : Object 

    'segfault' : function () : Object
}

'flushall' : function () : Object

'flushdb' : function () : Object

'info' : function ( [ String section ] ) : Object

'lastsave' : function () : Object

'monitor' : function () : Object

'save' : function () : Object

'shutdown' : function ( [ String opt ] ) : Object

'slaveof' : function ( String host, Number port | String port ) : Object

'slowlog' : {

    'get' : function ( Number integer | String integer ) : Object

    'len' : function () : Object

    'reset' : function () : Object
}

'sync' : function () : Object

'time' : function () : Object
```
_[Back to Index](#syllabus-commands)_

------------------------------------------------------------------------


### MIT License

> Copyright (c) 2014 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

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
> SOFTWARE OR THE USE OR OTHER DEALINGS IN T