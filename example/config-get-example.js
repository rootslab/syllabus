var log = console.log
    , util = require( 'util' )
    , Syllabus = require( '../' )()
    // reply from "CONFIG GET *"
    , reply = [
        'dbfilename', 'dump.rdb',
        'requirepass', '',
        'masterauth', '',
        'unixsocket', '',
        'logfile', '',
        'pidfile', '/var/run/redis.pid',
        'maxmemory', '0',
        'maxmemory-samples','3',
        'timeout', '0',
        'tcp-keepalive', '0',
        'auto-aof-rewrite-percentage', '0',
        'auto-aof-rewrite-min-size', '67108864',
        'hash-max-ziplist-entries', '512',
        'hash-max-ziplist-value', '64',
        'list-max-ziplist-entries', '512',
        'list-max-ziplist-value', '64',
        'set-max-intset-entries', '512',
        'zset-max-ziplist-entries', '128',
        'zset-max-ziplist-value', '64',
        'lua-time-limit', '5000',
        'slowlog-log-slower-than', '10000',
        'slowlog-max-len', '128',
        'port', '6379',
        'tcp-backlog', '511',
        'databases', '16',
        'repl-ping-slave-period', '10',
        'repl-timeout', '60',
        'repl-backlog-size', '1048576',
        'repl-backlog-ttl', '3600',
        'maxclients', '3984',
        'watchdog-period', '0',
        'slave-priority', '0',
        'min-slaves-to-write', '0',
        'min-slaves-max-lag', '10',
        'hz', '10',
        'no-appendfsync-on-rewrite', 'no',
        'slave-serve-stale-data', 'yes',
        'slave-read-only', 'yes',
        'stop-writes-on-bgsave-error', 'yes',
        'daemonize', 'no',
        'rdbcompression', 'yes',
        'rdbchecksum', 'yes',
        'activerehashing', 'yes',
        'repl-disable-tcp-nodelay', 'no',
        'aof-rewrite-incremental-fsync', 'yes',
        'appendonly', 'no',
        'dir', '/tmp',
        'maxmemory-policy', 'volatile-lru',
        'appendfsync', 'everysec',
        'save', '3600 1 300 100 60 10000',
        'loglevel', 'notice',
        'client-output-buffer-limit', 'normal 0 0 0 slave 268435456 67108864 60 pubsub 33554432 8388608 60',
        'unixsocketperm', '0',
        'slaveof', '',
        'notify-keyspace-events', '',
        'bind', ''
    ]
    // encode command
    , cfg_get_cmd = Syllabus.commands.config.get( '*' )
    // use resulting utility fn to convert array
    , hash = cfg_get_cmd.fn( reply )
    ;

log( '- reply from "CONFIG GET *":\n', util.inspect( reply, false, 1, true ) );

log( '- fn(hash) result:\n', util.inspect( hash, false, 1, true ) );