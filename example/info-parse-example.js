#!/usr/bin/env node

/* 
 * Syllabus parse INFO reply example
 */

var log = console.log
    , assert = require( 'assert' )
    , util = require( 'util' )
    , Syllabus = require( '../' )()
    , commands = Syllabus.commands
    ;

var log = console.log
    // encode INFO command
    , info_cmd = Syllabus.commands.info()
    // use a Redis INFO reply
    , info_reply = "# Server\r\nredis_version:2.8.6\r\nredis_git_sha1:6441a41f\r\nredis_git_dirty:0\r\nredis_build_id:bc6d87fd0909959d\r\nredis_mode:standalone\r\nos:Linux 3.11.0-20-generic x86_64\r\narch_bits:64\r\nmultiplexing_api:epoll\r\ngcc_version:4.8.1\r\nprocess_id:5424\r\nrun_id:9570db97c720fcef326fe408970ba207e956b214\r\ntcp_port:6379\r\nuptime_in_seconds:23783\r\nuptime_in_days:0\r\nhz:10\r\nlru_clock:1541784\r\nconfig_file:\r\n\r\n# Clients\r\nconnected_clients:2\r\nclient_longest_output_list:0\r\nclient_biggest_input_buf:0\r\nblocked_clients:0\r\n\r\n# Memory\r\nused_memory:522976\r\nused_memory_human:510.72K\r\nused_memory_rss:2248704\r\nused_memory_peak:521936\r\nused_memory_peak_human:509.70K\r\nused_memory_lua:33792\r\nmem_fragmentation_ratio:4.30\r\nmem_allocator:jemalloc-3.2.0\r\n\r\n# Persistence\r\nloading:0\r\nrdb_changes_since_last_save:0\r\nrdb_bgsave_in_progress:0\r\nrdb_last_save_time:1399526462\r\nrdb_last_bgsave_status:ok\r\nrdb_last_bgsave_time_sec:0\r\nrdb_current_bgsave_time_sec:-1\r\naof_enabled:0\r\naof_rewrite_in_progress:0\r\naof_rewrite_scheduled:0\r\naof_last_rewrite_time_sec:-1\r\naof_current_rewrite_time_sec:-1\r\naof_last_bgrewrite_status:ok\r\naof_last_write_status:ok\r\n\r\n# Stats\r\ntotal_connections_received:3\r\ntotal_commands_processed:7\r\ninstantaneous_ops_per_sec:0\r\nrejected_connections:0\r\nsync_full:0\r\nsync_partial_ok:0\r\nsync_partial_err:0\r\nexpired_keys:0\r\nevicted_keys:0\r\nkeyspace_hits:1\r\nkeyspace_misses:0\r\npubsub_channels:0\r\npubsub_patterns:0\r\nlatest_fork_usec:190\r\n\r\n# Replication\r\nrole:master\r\nconnected_slaves:0\r\nmaster_repl_offset:0\r\nrepl_backlog_active:0\r\nrepl_backlog_size:1048576\r\nrepl_backlog_first_byte_offset:0\r\nrepl_backlog_histlen:0\r\n\r\n# CPU\r\nused_cpu_sys:2.66\r\nused_cpu_user:4.82\r\nused_cpu_sys_children:0.00\r\nused_cpu_user_children:0.00\r\n\r\n# Keyspace\r\ndb0:keys=1,expires=0,avg_ttl=0\r\n"
    , data_reply = new Buffer( info_reply )
    /*
     * Use the utility fn, inside the command hash,
     * to parse Redis reply for INFO command. Data
     * argument could be a Buffer or a String.
     */
    , info_result = info_cmd.fn( data_reply )
    ;

log( '\n- INFO command encoded:\n', util.inspect( info_cmd, false, null, true ) );

log( '\n- Use utility fn to parse a test reply for INFO command:\n', util.inspect( info_result, false, 1, true ), '\n' );

/*

String Parsed ->

# Server
redis_version:2.8.6
redis_git_sha1:6441a41f
redis_git_dirty:0
redis_build_id:bc6d87fd0909959d
redis_mode:standalone
os:Linux 3.11.0-20-generic x86_64
arch_bits:64
multiplexing_api:epoll
gcc_version:4.8.1
process_id:5424
run_id:9570db97c720fcef326fe408970ba207e956b214
tcp_port:6379
uptime_in_seconds:22918
uptime_in_days:0
hz:10
lru_clock:1541698
config_file:

# Clients
connected_clients:1
client_longest_output_list:0
client_biggest_input_buf:0
blocked_clients:0

# Memory
used_memory:502104
used_memory_human:490.34K
used_memory_rss:2248704
used_memory_peak:521936
used_memory_peak_human:509.70K
used_memory_lua:33792
mem_fragmentation_ratio:4.48
mem_allocator:jemalloc-3.2.0

# Persistence
loading:0
rdb_changes_since_last_save:0
rdb_bgsave_in_progress:0
rdb_last_save_time:1399526462
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:0
rdb_current_bgsave_time_sec:-1
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok

# Stats
total_connections_received:2
total_commands_processed:6
instantaneous_ops_per_sec:0
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:0
evicted_keys:0
keyspace_hits:1
keyspace_misses:0
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:190

# Replication
role:master
connected_slaves:0
master_repl_offset:0
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

# CPU
used_cpu_sys:2.59
used_cpu_user:4.62
used_cpu_sys_children:0.00
used_cpu_user_children:0.00

# Keyspace
db0:keys=1,expires=0,avg_ttl=0
*/
