+++
title = "ngx_stream_log_module"
date = 2023-08-15T08:23:09+08:00
weight = 770
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_stream_log_module

https://nginx.org/en/docs/stream/ngx_stream_log_module.html



The `ngx_stream_log_module` module (1.11.4) writes session logs in the specified format.



## Example Configuration



```
log_format basic '$remote_addr [$time_local] '
                 '$protocol $status $bytes_sent $bytes_received '
                 '$session_time';

access_log /spool/logs/nginx-access.log basic buffer=32k;
```





## Directives



### access_log

  Syntax:`access_log path format [buffer=size] [gzip[=level]] [flush=time] [if=condition];` `access_log off;`

  Default: `access_log off;`

  Context: `stream`, `server`


Sets the path, [format](https://nginx.org/en/docs/stream/ngx_stream_log_module.html#log_format), and configuration for a buffered log write. Several logs can be specified on the same configuration level. Logging to [syslog](https://nginx.org/en/docs/syslog.html) can be configured by specifying the “`syslog:`” prefix in the first parameter. The special value `off` cancels all `access_log` directives on the current level.

If either the `buffer` or `gzip` parameter is used, writes to log will be buffered.

The buffer size must not exceed the size of an atomic write to a disk file. For FreeBSD this size is unlimited.



When buffering is enabled, the data will be written to the file:

- if the next log line does not fit into the buffer;
- if the buffered data is older than specified by the `flush` parameter;
- when a worker process is [re-opening](https://nginx.org/en/docs/control.html) log files or is shutting down.



If the `gzip` parameter is used, then the buffered data will be compressed before writing to the file. The compression level can be set between 1 (fastest, less compression) and 9 (slowest, best compression). By default, the buffer size is equal to 64K bytes, and the compression level is set to 1. Since the data is compressed in atomic blocks, the log file can be decompressed or read by “`zcat`” at any time.

Example:

```
access_log /path/to/log.gz basic gzip flush=5m;
```





For gzip compression to work, nginx must be built with the zlib library.



The file path can contain variables, but such logs have some constraints:

- the [user]({{< ref "ng/mod_ref/ngx_core_module#user">}}) whose credentials are used by worker processes should have permissions to create files in a directory with such logs;
- buffered writes do not work;
- the file is opened and closed for each log write. However, since the descriptors of frequently used files can be stored in a [cache](https://nginx.org/en/docs/stream/ngx_stream_log_module.html#open_log_file_cache), writing to the old file can continue during the time specified by the [open_log_file_cache](https://nginx.org/en/docs/stream/ngx_stream_log_module.html#open_log_file_cache) directive’s `valid` parameter



The `if` parameter enables conditional logging. A session will not be logged if the `condition` evaluates to “0” or an empty string.



### log_format

  Syntax:`log_format name [escape=default|json|none] string ...;`

  Default: —

  Context: `stream`


Specifies the log format, for example:

```
log_format proxy '$remote_addr [$time_local] '
                 '$protocol $status $bytes_sent $bytes_received '
                 '$session_time "$upstream_addr" '
                 '"$upstream_bytes_sent" "$upstream_bytes_received" "$upstream_connect_time"';
```





The `escape` parameter (1.11.8) allows setting `json` or `default` characters escaping in variables, by default, `default` escaping is used. The `none` parameter (1.13.10) disables escaping.



For `default` escaping, characters “`"`”, “`\`”, and other characters with values less than 32 or above 126 are escaped as “`\xXX`”. If the variable value is not found, a hyphen (“`-`”) will be logged.



For `json` escaping, all characters not allowed in JSON [strings](https://datatracker.ietf.org/doc/html/rfc8259#section-7) will be escaped: characters “`"`” and “`\`” are escaped as “`\"`” and “`\\`”, characters with values less than 32 are escaped as “`\n`”, “`\r`”, “`\t`”, “`\b`”, “`\f`”, or “`\u00XX`”.



### open_log_file_cache

  Syntax:`open_log_file_cache max=N [inactive=time] [min_uses=N] [valid=time];` `open_log_file_cache off;`

  Default: `open_log_file_cache off;`

  Context: `stream`, `server`


Defines a cache that stores the file descriptors of frequently used logs whose names contain variables. The directive has the following parameters:

- `max`

  sets the maximum number of descriptors in a cache; if the cache becomes full the least recently used (LRU) descriptors are closed

- `inactive`

  sets the time after which the cached descriptor is closed if there were no access during this time; by default, 10 seconds

- `min_uses`

  sets the minimum number of file uses during the time defined by the `inactive` parameter to let the descriptor stay open in a cache; by default, 1

- `valid`

  sets the time after which it should be checked that the file still exists with the same name; by default, 60 seconds

- `off`

  disables caching



Usage example:

```
open_log_file_cache max=1000 inactive=20s valid=1m min_uses=2;
```