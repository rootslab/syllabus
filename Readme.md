###Syllabus
[![build status](https://secure.travis-ci.org/rootslab/syllabus.png?branch=master)](http://travis-ci.org/rootslab/syllabus) 
[![NPM version](https://badge.fury.io/js/syllabus.png)](http://badge.fury.io/js/syllabus)

[![NPM](https://nodei.co/npm/syllabus.png?downloads=true&stars=true)](https://nodei.co/npm/syllabus/)

[![NPM](https://nodei.co/npm-dl/syllabus.png)](https://nodei.co/npm/syllabus/)

> **_Syllabus_**, a collection of mix-ins for __Redis__ commands, builded upon __[Sermone](https://github.com/rootslab/sermone)__.

> Now __[169](#syllabus.commands)__ Redis commands mix-ins are implemented.

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
     *   since: '1.0.0',
     *   hint: 'PING',
     *   url: 'http://redis.io/commands/ping'
     *   descr: 'Ping the server.'
     * }
     *
     * NOTE:
     *  - 'name' is the mix-in method name.
     *  - 'args' refers to the number of arguments expected by the command
     *     mix-in method, not by the original Redis command.
     *  - 'sub' collects command direct child(ren) for commands like: 
     *     OBJECT REFCOUNT, PUBSUB CHANNELS, etc..
     *  - 'hint' is the Redis command infos, not the signature of mix-in method. 
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
     * and of keywords types.
     */
    , size : function () : Number
}
```

###Syllabus Redis Commands

<a name="syllabus.commands"/>
> _Syllabus.commands:_

```javascript
{   
    // keys
    'type' : function(  ){ },
    'ttl' : function(  ){ },
    'sort' : function(  ){ },
    'scan' : function(  ){ },
    'restore' : function(  ){ },
    'renamenx' : function(  ){ },
    'rename' : function(  ){ },
    'randomkey' : function(  ){ },
    'pttl' : function(  ){ },
    'pexpireat' : function(  ){ },
    'pexpire' : function(  ){ },
    'persist' : function(  ){ },
    'object' : {
        'refcount' : function(  ){ },
        'encoding' : function(  ){ },
        'idletime' : function(  ){ }
    },
    'move' : function(  ){ },
    'migrate' : function(  ){ },
    'keys' : function(  ){ },
    'expireat' : function(  ){ },
    'expire' : function(  ){ },
    'exists' : function(  ){ },
    'dump' : function(  ){ },
    'del' : function(  ){ },

     // strings
    'append' : function(  ){ },
    'bitcount' : function(  ){ },
    'bittop' : { 
        'and' : function(  ){ },
        'or' : function(  ){ },
        'xor' : function(  ){ },
        'not' : function(  ){ }
    },
    'bitpos' : function(  ){ },
    'decr' : function(  ){ },
    'decrby' : function(  ){ },
    'get' : function(  ){ },
    'getbit' : function(  ){ },
    'getrange' : function(  ){ },
    'getset' : function(  ){ },
    'incr' : function(  ){ },
    'incrby' : function(  ){ },
    'incrbyfloat' : function(  ){ },
    'mget' : function(  ){ },
    'mset' : function(  ){ },
    'msetnx' : function(  ){ },
    'psetex' : function(  ){ },
    'set' : function(  ){ },
    'setbit' : function(  ){ },
    'setex' : function(  ){ },
    'setnx' : function(  ){ },
    'setrange' : function(  ){ },
    'strlen' : function(  ){ },

    // hashes
    'hdel' : function(  ){ },
    'hget' : function(  ){ },
    'hgetall' : function(  ){ },
    'hexists' : function(  ){ },
    'hincrby' : function(  ){ },
    'hincrbyfloat' : function(  ){ },
    'hkeys' : function(  ){ },
    'hlen' : function(  ){ },
    'hmget' : function(  ){ },
    'hmset' : function(  ){ },
    'hscan' : function(  ){ },
    'hset' : function(  ){ },
    'hsetnx' : function(  ){ },
    'hvals' : function(  ){ },

    // lists
    'blpop' : function(  ){ },
    'brpop' : function(  ){ },
    'brpoplpush' : function(  ){ },
    'lindex' : function(  ){ },
    'linsert' : function(  ){ },
    'llen' : function(  ){ },
    'lpop' : function(  ){ },
    'lpush' : function(  ){ },
    'lpushx' : function(  ){ },
    'lrange' : function(  ){ },
    'lrem' : function(  ){ },
    'lset' : function(  ){ },
    'ltrim' : function(  ){ },
    'rpop' : function(  ){ },
    'rpoplpush' : function(  ){ },
    'rpush' : function(  ){ },
    'rpushx' : function(  ){ },

    // sets
    'sadd' : function(  ){ },
    'scard' : function(  ){ },
    'sdiff' : function(  ){ },
    'sdiffstore' : function(  ){ },
    'sinter' : function(  ){ },
    'sinterstore' : function(  ){ },
    'sismember' : function(  ){ },
    'smove' : function(  ){ },
    'smembers' : function(  ){ },
    'spop' : function(  ){ },
    'srandmember' : function(  ){ },
    'srem' : function(  ){ },
    'sscan' : function(  ){ },
    'sunion' : function(  ){ },
    'sunionstore' : function(  ){ },

    // hyperloglog
    'pfadd' : function(  ){ },
    'pfcount' : function(  ){ },
    'pfmerge' : function(  ){ },

    // sorted sets
    'zcount' : function(  ){ },
    'zadd' : function(  ){ },
    'zcard' : function(  ){ },
    'zincrby' : function(  ){ },
    'zinterstore' : function(  ){ },
    'zlexcount' : function(  ){ },
    'zrevrank' : function(  ){ },
    'zrange' : function(  ){ },
    'zrangebylex' : function(  ){ },
    'zrangebyscore' : function(  ){ },
    'zrank' : function(  ){ },
    'zrem' : function(  ){ },
    'zremrangebylex' : function(  ){ },
    'zremrangebyrank' : function(  ){ },
    'zremrangebyscore' : function(  ){ },
    'zrevrange' : function(  ){ },
    'zrevrangebyscore' : function(  ){ },
    'zscan' : function(  ){ },
    'zscore' : function(  ){ },
    'zunionstore' : function(  ){ },

    // pubsub
    'psubscribe' : function(  ){ },
    'publish' : function(  ){ },
    'pubsub' : {
        'channels' : function(  ){ },
        'numsub' : function(  ){ },
        'numpat' : function(  ){ },
    },
    'punsubscribe' : function(  ){ },
    'subscribe' : function(  ){ },
    'unsubscribe' : function(  ){ },
    
    // transactions
    'watch' : function(  ){ },
    'unwatch' : function(  ){ },
    'multi' : function(  ){ },
    'exec' : function(  ){ },
    'discard' : function(  ){ },

    // scripting
    'eval' : function(  ){ },
    'evalsha' : function(  ){ },
    'script' : {
        'exists' : function(  ){ },
        'flush' : function(  ){ },
        'kill' : function(  ){ },
        'load' : function(  ){ },
    },

    // server
    'auth' : function(  ){ },
    'bgrewriteaof' : function(  ){ },
    'bgsave' : function(  ){ },
    'client' : {
        'getname' : function(  ){ },
        'kill' : function(  ){ },
        'list' : function(  ){ },
        'pause' : function(  ){ },
        'setname' : function(  ){ },
    },
    'config' : {
        'get' : function(  ){ },
        'resetstat' : function(  ){ },
        'rewrite' : function(  ){ },
        'set' : function(  ){ },
    },
    'dbsize' : function(  ){ },
    'debug' : {
        'object' : function(  ){ }, 
        'segfault' : function(  ){ },
    },
    'flushall' : function(  ){ },
    'flushdb' : function(  ){ },
    'echo' : function(  ){ },
    'info' : function(  ){ },
    'lastsave' : function(  ){ },
    'monitor' : function(  ){ },
    'ping' : function(  ){ },
    'quit' : function(  ){ },
    'save' : function(  ){ },
    'select' : function(  ){ },
    'shutdown' : function(  ){ },
    'slaveof' : function(  ){ },
    'slowlog' : {
        'get' : function(  ){ },
        'len' : function(  ){ },
        'reset' : function(  ){ },
    },
    'sync' : function(  ){ },
    'time' : function(  ){ }
}
```

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