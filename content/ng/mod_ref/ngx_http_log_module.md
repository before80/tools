+++
title = "ngx_http_log_module"
date = 2023-08-15T08:16:14+08:00
weight = 310
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_log_module

https://nginx.org/en/docs/http/ngx_http_log_module.html

The `ngx_http_log_module` module writes request logs in the specified format.

Requests are logged in the context of a location where processing ends. It may be different from the original location, if an [internal redirect]({{< ref "ng/mod_ref/ngx_http_core_module#internal">}}) happens during request processing.



## Example Configuration



```
log_format compression '$remote_addr - $remote_user [$time_local] '
                       '"$request" $status $bytes_sent '
                       '"$http_referer" "$http_user_agent" "$gzip_ratio"';

access_log /spool/logs/nginx-access.log compression buffer=32k;
```





## Directives



### access_log

  Syntax:`access_log path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]];` `access_log off;`

  Default: `access_log logs/access.log combined;`

  Context: `http`, `server`, `location`, `if in location`, `limit_except`


Sets the path, format, and configuration for a buffered log write. Several logs can be specified on the same configuration level. Logging to [syslog](https://nginx.org/en/docs/syslog.html) can be configured by specifying the “`syslog:`” prefix in the first parameter. The special value `off` cancels all `access_log` directives on the current level. If the format is not specified then the predefined “`combined`” format is used.

If either the `buffer` or `gzip` (1.3.10, 1.2.7) parameter is used, writes to log will be buffered.

The buffer size must not exceed the size of an atomic write to a disk file. For FreeBSD this size is unlimited.



When buffering is enabled, the data will be written to the file:

- if the next log line does not fit into the buffer;
- if the buffered data is older than specified by the `flush` parameter (1.3.10, 1.2.7);
- when a worker process is [re-opening](https://nginx.org/en/docs/control.html) log files or is shutting down.



If the `gzip` parameter is used, then the buffered data will be compressed before writing to the file. The compression level can be set between 1 (fastest, less compression) and 9 (slowest, best compression). By default, the buffer size is equal to 64K bytes, and the compression level is set to 1. Since the data is compressed in atomic blocks, the log file can be decompressed or read by “`zcat`” at any time.

Example:

```
access_log /path/to/log.gz combined gzip flush=5m;
```





For gzip compression to work, nginx must be built with the zlib library.



The file path can contain variables (0.7.6+), but such logs have some constraints:

- the [user]({{< ref "ng/mod_ref/ngx_core_module#user">}}) whose credentials are used by worker processes should have permissions to create files in a directory with such logs;

- buffered writes do not work;

- the file is opened and closed for each log write. However, since the descriptors of frequently used files can be stored in a [cache]({{< ref "ng/mod_ref/ngx_http_log_module#open_log_file_cache">}}), writing to the old file can continue during the time specified by the [open_log_file_cache]({{< ref "ng/mod_ref/ngx_http_log_module#open_log_file_cache">}}) directive’s `valid` parameter

- during each log write the existence of the request’s

   

  root directory

   

  is checked, and if it does not exist the log is not created. It is thus a good idea to specify both

   

  root

   

  and

   

  ```
  access_log
  ```

   

  on the same configuration level:

  ```
  server {
      root       /spool/vhost/data/$host;
      access_log /spool/vhost/logs/$host;
      ...
  ```



The `if` parameter (1.7.0) enables conditional logging. A request will not be logged if the `condition` evaluates to “0” or an empty string. In the following example, the requests with response codes 2xx and 3xx will not be logged:

```
map $status $loggable {
    ~^[23]  0;
    default 1;
}

access_log /path/to/access.log combined if=$loggable;
```





### log_format

  Syntax:`log_format name [escape=default|json|none] string ...;`

  Default: `log_format combined "...";`

  Context: `http`


Specifies log format.



The `escape` parameter (1.11.8) allows setting `json` or `default` characters escaping in variables, by default, `default` escaping is used. The `none` value (1.13.10) disables escaping.



For `default` escaping, characters “`"`”, “`\`”, and other characters with values less than 32 (0.7.0) or above 126 (1.1.6) are escaped as “`\xXX`”. If the variable value is not found, a hyphen (“`-`”) will be logged.



For `json` escaping, all characters not allowed in JSON [strings](https://datatracker.ietf.org/doc/html/rfc8259#section-7) will be escaped: characters “`"`” and “`\`” are escaped as “`\"`” and “`\\`”, characters with values less than 32 are escaped as “`\n`”, “`\r`”, “`\t`”, “`\b`”, “`\f`”, or “`\u00XX`”.

The log format can contain common variables, and variables that exist only at the time of a log write:

- `$bytes_sent`

  the number of bytes sent to a client

- `$connection`

  connection serial number

- `$connection_requests`

  the current number of requests made through a connection (1.1.18)

- `$msec`

  time in seconds with a milliseconds resolution at the time of the log write

- `$pipe`

  “`p`” if request was pipelined, “`.`” otherwise

- `$request_length`

  request length (including request line, header, and request body)

- `$request_time`

  request processing time in seconds with a milliseconds resolution; time elapsed between the first bytes were read from the client and the log write after the last bytes were sent to the client

- `$status`

  response status

- `$time_iso8601`

  local time in the ISO 8601 standard format

- `$time_local`

  local time in the Common Log Format



In the modern nginx versions variables [$status]({{< ref "ng/mod_ref/ngx_http_core_module#var_status">}}) (1.3.2, 1.2.2), [$bytes_sent]({{< ref "ng/mod_ref/ngx_http_core_module#var_bytes_sent">}}) (1.3.8, 1.2.5), [$connection]({{< ref "ng/mod_ref/ngx_http_core_module#var_connection">}}) (1.3.8, 1.2.5), [$connection_requests]({{< ref "ng/mod_ref/ngx_http_core_module#var_connection_requests">}}) (1.3.8, 1.2.5), [$msec]({{< ref "ng/mod_ref/ngx_http_core_module#var_msec">}}) (1.3.9, 1.2.6), [$request_time]({{< ref "ng/mod_ref/ngx_http_core_module#var_request_time">}}) (1.3.9, 1.2.6), [$pipe]({{< ref "ng/mod_ref/ngx_http_core_module#var_pipe">}}) (1.3.12, 1.2.7), [$request_length]({{< ref "ng/mod_ref/ngx_http_core_module#var_request_length">}}) (1.3.12, 1.2.7), [$time_iso8601](https://nginx.org/en/docs/http/ngx_http_core_module.html#var_time_iso8601) (1.3.12, 1.2.7), and [$time_local]({{< ref "ng/mod_ref/ngx_http_core_module#var_time_local">}}) (1.3.12, 1.2.7) are also available as common variables.



Header lines sent to a client have the prefix “`sent_http_`”, for example, `$sent_http_content_range`.

The configuration always includes the predefined “`combined`” format:

```
log_format combined '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';
```





### open_log_file_cache

  Syntax:`open_log_file_cache max=N [inactive=time] [min_uses=N] [valid=time];` `open_log_file_cache off;`

  Default: `open_log_file_cache off;`

  Context: `http`, `server`, `location`


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