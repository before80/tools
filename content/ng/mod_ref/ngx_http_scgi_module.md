+++
title = "ngx_http_scgi_module"
date = 2023-08-15T08:18:15+08:00
weight = 430
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_scgi_module

https://nginx.org/en/docs/http/ngx_http_scgi_module.html



The `ngx_http_scgi_module` module allows passing requests to an SCGI server.



## Example Configuration



```
location / {
    include   scgi_params;
    scgi_pass localhost:9000;
}
```





## Directives



### scgi_bind

  Syntax:`scgi_bind address [transparent] | off;`

  Default: —

  Context: `http`, `server`, `location`


Makes outgoing connections to an SCGI server originate from the specified local IP address with an optional port (1.11.2). Parameter value can contain variables (1.3.12). The special value `off` (1.3.12) cancels the effect of the `scgi_bind` directive inherited from the previous configuration level, which allows the system to auto-assign the local IP address and port.



The `transparent` parameter (1.11.0) allows outgoing connections to an SCGI server originate from a non-local IP address, for example, from a real IP address of a client:

```
scgi_bind $remote_addr transparent;
```

In order for this parameter to work, it is usually necessary to run nginx worker processes with the [superuser]({{< ref "ng/mod_ref/ngx_core_module#user">}}) privileges. On Linux it is not required (1.13.8) as if the `transparent` parameter is specified, worker processes inherit the `CAP_NET_RAW` capability from the master process. It is also necessary to configure kernel routing table to intercept network traffic from the SCGI server.



### scgi_buffer_size

  Syntax:  `scgi_buffer_size size;`

  Default: `scgi_buffer_size 4k|8k;`

  Context: `http`, `server`, `location`


Sets the `size` of the buffer used for reading the first part of the response received from the SCGI server. This part usually contains a small response header. By default, the buffer size is equal to one memory page. This is either 4K or 8K, depending on a platform. It can be made smaller, however.



### scgi_buffering

  Syntax:  `scgi_buffering on | off;`

  Default: `scgi_buffering on;`

  Context: `http`, `server`, `location`


Enables or disables buffering of responses from the SCGI server.

When buffering is enabled, nginx receives a response from the SCGI server as soon as possible, saving it into the buffers set by the [scgi_buffer_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffer_size">}}) and [scgi_buffers]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffers">}}) directives. If the whole response does not fit into memory, a part of it can be saved to a [temporary file]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_temp_path">}}) on the disk. Writing to temporary files is controlled by the [scgi_max_temp_file_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_max_temp_file_size">}}) and [scgi_temp_file_write_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_temp_file_write_size">}}) directives.

When buffering is disabled, the response is passed to a client synchronously, immediately as it is received. nginx will not try to read the whole response from the SCGI server. The maximum size of the data that nginx can receive from the server at a time is set by the [scgi_buffer_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffer_size">}}) directive.

Buffering can also be enabled or disabled by passing “`yes`” or “`no`” in the “X-Accel-Buffering” response header field. This capability can be disabled using the [scgi_ignore_headers]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_ignore_headers">}}) directive.



### scgi_buffers

  Syntax:  `scgi_buffers number size;`

  Default: `scgi_buffers 8 4k|8k;`

  Context: `http`, `server`, `location`


Sets the `number` and `size` of the buffers used for reading a response from the SCGI server, for a single connection. By default, the buffer size is equal to one memory page. This is either 4K or 8K, depending on a platform.



### scgi_busy_buffers_size

  Syntax:  `scgi_busy_buffers_size size;`

  Default: `scgi_busy_buffers_size 8k|16k;`

  Context: `http`, `server`, `location`


When [buffering]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffering">}}) of responses from the SCGI server is enabled, limits the total `size` of buffers that can be busy sending a response to the client while the response is not yet fully read. In the meantime, the rest of the buffers can be used for reading the response and, if needed, buffering part of the response to a temporary file. By default, `size` is limited by the size of two buffers set by the [scgi_buffer_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffer_size">}}) and [scgi_buffers]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffers">}}) directives.



### scgi_cache

  Syntax:  `scgi_cache zone | off;`

  Default: `scgi_cache off;`

  Context: `http`, `server`, `location`


Defines a shared memory zone used for caching. The same zone can be used in several places. Parameter value can contain variables (1.7.9). The `off` parameter disables caching inherited from the previous configuration level.



### scgi_cache_background_update

  Syntax:`scgi_cache_background_update on | off;`

  Default: `scgi_cache_background_update off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.11.10.

Allows starting a background subrequest to update an expired cache item, while a stale cached response is returned to the client. Note that it is necessary to [allow]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_use_stale_updating">}}) the usage of a stale cached response when it is being updated.



### scgi_cache_bypass

  Syntax:`scgi_cache_bypass string ...;`

  Default: —

  Context: `http`, `server`, `location`


Defines conditions under which the response will not be taken from a cache. If at least one value of the string parameters is not empty and is not equal to “0” then the response will not be taken from the cache:

```
scgi_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
scgi_cache_bypass $http_pragma    $http_authorization;
```

Can be used along with the [scgi_no_cache]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_no_cache">}}) directive.



### scgi_cache_key

  Syntax:  `scgi_cache_key string;`

  Default: —

  Context: `http`, `server`, `location`


Defines a key for caching, for example

```
scgi_cache_key localhost:9000$request_uri;
```





### scgi_cache_lock

  Syntax:  `scgi_cache_lock on | off;`

  Default: `scgi_cache_lock off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.1.12.

When enabled, only one request at a time will be allowed to populate a new cache element identified according to the [scgi_cache_key]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_key">}}) directive by passing a request to an SCGI server. Other requests of the same cache element will either wait for a response to appear in the cache or the cache lock for this element to be released, up to the time set by the [scgi_cache_lock_timeout]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_lock_timeout">}}) directive.



### scgi_cache_lock_age

  Syntax:  `scgi_cache_lock_age time;`

  Default: `scgi_cache_lock_age 5s;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.7.8.

If the last request passed to the SCGI server for populating a new cache element has not completed for the specified `time`, one more request may be passed to the SCGI server.



### scgi_cache_lock_timeout

  Syntax:`scgi_cache_lock_timeout time;`

  Default: `scgi_cache_lock_timeout 5s;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.1.12.

Sets a timeout for [scgi_cache_lock]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_lock">}}). When the `time` expires, the request will be passed to the SCGI server, however, the response will not be cached.

Before 1.7.8, the response could be cached.





### scgi_cache_max_range_offset

  Syntax:`scgi_cache_max_range_offset number;`

  Default: —

  Context: `http`, `server`, `location`


This directive appeared in version 1.11.6.

Sets an offset in bytes for byte-range requests. If the range is beyond the offset, the range request will be passed to the SCGI server and the response will not be cached.



### scgi_cache_methods

  Syntax:`scgi_cache_methods GET | HEAD | POST ...;`

  Default: `scgi_cache_methods GET HEAD;`

  Context: `http`, `server`, `location`


If the client request method is listed in this directive then the response will be cached. “`GET`” and “`HEAD`” methods are always added to the list, though it is recommended to specify them explicitly. See also the [scgi_no_cache]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_no_cache">}}) directive.



### scgi_cache_min_uses

  Syntax:`scgi_cache_min_uses number;`

  Default: `scgi_cache_min_uses 1;`

  Context: `http`, `server`, `location`


Sets the `number` of requests after which the response will be cached.



### scgi_cache_path

  Syntax:`scgi_cache_path path [levels=levels] [use_temp_path=on|off] keys_zone=name:size [inactive=time] [max_size=size] [min_free=size] [manager_files=number] [manager_sleep=time] [manager_threshold=time] [loader_files=number] [loader_sleep=time] [loader_threshold=time] [purger=on|off] [purger_files=number] [purger_sleep=time] [purger_threshold=time];`

  Default: —

  Context: `http`


Sets the path and other parameters of a cache. Cache data are stored in files. The file name in a cache is a result of applying the MD5 function to the [cache key]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_key">}}). The `levels` parameter defines hierarchy levels of a cache: from 1 to 3, each level accepts values 1 or 2. For example, in the following configuration

```
scgi_cache_path /data/nginx/cache levels=1:2 keys_zone=one:10m;
```

file names in a cache will look like this:

```
/data/nginx/cache/c/29/b7f54b2df7773722d382f4809d65029c
```



A cached response is first written to a temporary file, and then the file is renamed. Starting from version 0.8.9, temporary files and the cache can be put on different file systems. However, be aware that in this case a file is copied across two file systems instead of the cheap renaming operation. It is thus recommended that for any given location both cache and a directory holding temporary files are put on the same file system. A directory for temporary files is set based on the `use_temp_path` parameter (1.7.10). If this parameter is omitted or set to the value `on`, the directory set by the [scgi_temp_path]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_temp_path">}}) directive for the given location will be used. If the value is set to `off`, temporary files will be put directly in the cache directory.

In addition, all active keys and information about data are stored in a shared memory zone, whose `name` and `size` are configured by the `keys_zone` parameter. One megabyte zone can store about 8 thousand keys.

As part of [commercial subscription](http://nginx.com/products/), the shared memory zone also stores extended cache [information]({{< ref "ng/mod_ref/ngx_http_api_module#http_caches_">}}), thus, it is required to specify a larger zone size for the same number of keys. For example, one megabyte zone can store about 4 thousand keys.



Cached data that are not accessed during the time specified by the `inactive` parameter get removed from the cache regardless of their freshness. By default, `inactive` is set to 10 minutes.



The special “cache manager” process monitors the maximum cache size set by the `max_size` parameter, and the minimum amount of free space set by the `min_free` (1.19.1) parameter on the file system with cache. When the size is exceeded or there is not enough free space, it removes the least recently used data. The data is removed in iterations configured by `manager_files`, `manager_threshold`, and `manager_sleep` parameters (1.11.5). During one iteration no more than `manager_files` items are deleted (by default, 100). The duration of one iteration is limited by the `manager_threshold` parameter (by default, 200 milliseconds). Between iterations, a pause configured by the `manager_sleep` parameter (by default, 50 milliseconds) is made.

A minute after the start the special “cache loader” process is activated. It loads information about previously cached data stored on file system into a cache zone. The loading is also done in iterations. During one iteration no more than `loader_files` items are loaded (by default, 100). Besides, the duration of one iteration is limited by the `loader_threshold` parameter (by default, 200 milliseconds). Between iterations, a pause configured by the `loader_sleep` parameter (by default, 50 milliseconds) is made.

Additionally, the following parameters are available as part of our [commercial subscription](http://nginx.com/products/):



- `purger`=`on`|`off`

  Instructs whether cache entries that match a [wildcard key]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_purge">}}) will be removed from the disk by the cache purger (1.7.12). Setting the parameter to `on` (default is `off`) will activate the “cache purger” process that permanently iterates through all cache entries and deletes the entries that match the wildcard key.

- `purger_files`=`number`

  Sets the number of items that will be scanned during one iteration (1.7.12). By default, `purger_files` is set to 10.

- `purger_threshold`=`number`

  Sets the duration of one iteration (1.7.12). By default, `purger_threshold` is set to 50 milliseconds.

- `purger_sleep`=`number`

  Sets a pause between iterations (1.7.12). By default, `purger_sleep` is set to 50 milliseconds.





In versions 1.7.3, 1.7.7, and 1.11.10 cache header format has been changed. Previously cached responses will be considered invalid after upgrading to a newer nginx version.





### scgi_cache_purge

  Syntax:`scgi_cache_purge string ...;`

  Default: —

  Context: `http`, `server`, `location`


This directive appeared in version 1.5.7.

Defines conditions under which the request will be considered a cache purge request. If at least one value of the string parameters is not empty and is not equal to “0” then the cache entry with a corresponding [cache key]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_key">}}) is removed. The result of successful operation is indicated by returning the 204 (No Content) response.

If the [cache key]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_key">}}) of a purge request ends with an asterisk (“`*`”), all cache entries matching the wildcard key will be removed from the cache. However, these entries will remain on the disk until they are deleted for either [inactivity]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_path">}}), or processed by the [cache purger]({{< ref "ng/mod_ref/ngx_http_scgi_module#purger">}}) (1.7.12), or a client attempts to access them.

Example configuration:

```
scgi_cache_path /data/nginx/cache keys_zone=cache_zone:10m;

map $request_method $purge_method {
    PURGE   1;
    default 0;
}

server {
    ...
    location / {
        scgi_pass        backend;
        scgi_cache       cache_zone;
        scgi_cache_key   $uri;
        scgi_cache_purge $purge_method;
    }
}
```



This functionality is available as part of our [commercial subscription](http://nginx.com/products/).





### scgi_cache_revalidate

  Syntax:`scgi_cache_revalidate on | off;`

  Default: `scgi_cache_revalidate off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.5.7.

Enables revalidation of expired cache items using conditional requests with the “If-Modified-Since” and “If-None-Match” header fields.



### scgi_cache_use_stale

  Syntax:`scgi_cache_use_stale error | timeout | invalid_header | updating | http_500 | http_503 | http_403 | http_404 | http_429 | off ...;`

  Default: `scgi_cache_use_stale off;`

  Context: `http`, `server`, `location`


Determines in which cases a stale cached response can be used when an error occurs during communication with the SCGI server. The directive’s parameters match the parameters of the [scgi_next_upstream]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_next_upstream">}}) directive.

The `error` parameter also permits using a stale cached response if an SCGI server to process a request cannot be selected.



Additionally, the `updating` parameter permits using a stale cached response if it is currently being updated. This allows minimizing the number of accesses to SCGI servers when updating cached data.

Using a stale cached response can also be enabled directly in the response header for a specified number of seconds after the response became stale (1.11.10). This has lower priority than using the directive parameters.

- The “[stale-while-revalidate](https://datatracker.ietf.org/doc/html/rfc5861#section-3)” extension of the “Cache-Control” header field permits using a stale cached response if it is currently being updated.
- The “[stale-if-error](https://datatracker.ietf.org/doc/html/rfc5861#section-4)” extension of the “Cache-Control” header field permits using a stale cached response in case of an error.



To minimize the number of accesses to SCGI servers when populating a new cache element, the [scgi_cache_lock]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_lock">}}) directive can be used.



### scgi_cache_valid

  Syntax:`scgi_cache_valid [code ...] time;`

  Default: —

  Context: `http`, `server`, `location`


Sets caching time for different response codes. For example, the following directives

```
scgi_cache_valid 200 302 10m;
scgi_cache_valid 404      1m;
```

set 10 minutes of caching for responses with codes 200 and 302 and 1 minute for responses with code 404.

If only caching `time` is specified

```
scgi_cache_valid 5m;
```

then only 200, 301, and 302 responses are cached.

In addition, the `any` parameter can be specified to cache any responses:

```
scgi_cache_valid 200 302 10m;
scgi_cache_valid 301      1h;
scgi_cache_valid any      1m;
```



Parameters of caching can also be set directly in the response header. This has higher priority than setting of caching time using the directive.

- The “X-Accel-Expires” header field sets caching time of a response in seconds. The zero value disables caching for a response. If the value starts with the `@` prefix, it sets an absolute time in seconds since Epoch, up to which the response may be cached.
- If the header does not include the “X-Accel-Expires” field, parameters of caching may be set in the header fields “Expires” or “Cache-Control”.
- If the header includes the “Set-Cookie” field, such a response will not be cached.
- If the header includes the “Vary” field with the special value “`*`”, such a response will not be cached (1.7.7). If the header includes the “Vary” field with another value, such a response will be cached taking into account the corresponding request header fields (1.7.7).

Processing of one or more of these response header fields can be disabled using the [scgi_ignore_headers]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_ignore_headers">}}) directive.



### scgi_connect_timeout

  Syntax:`scgi_connect_timeout time;`

  Default: `scgi_connect_timeout 60s;`

  Context: `http`, `server`, `location`


Defines a timeout for establishing a connection with an SCGI server. It should be noted that this timeout cannot usually exceed 75 seconds.



### scgi_force_ranges

  Syntax:`scgi_force_ranges on | off;`

  Default: `scgi_force_ranges off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.7.7.

Enables byte-range support for both cached and uncached responses from the SCGI server regardless of the “Accept-Ranges” field in these responses.



### scgi_hide_header

  Syntax:  `scgi_hide_header field;`

  Default: —

  Context: `http`, `server`, `location`


By default, nginx does not pass the header fields “Status” and “X-Accel-...” from the response of an SCGI server to a client. The `scgi_hide_header` directive sets additional fields that will not be passed. If, on the contrary, the passing of fields needs to be permitted, the [scgi_pass_header]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_pass_header">}}) directive can be used.



### scgi_ignore_client_abort

  Syntax:`scgi_ignore_client_abort on | off;`

  Default: `scgi_ignore_client_abort off;`

  Context: `http`, `server`, `location`


Determines whether the connection with an SCGI server should be closed when a client closes the connection without waiting for a response.



### scgi_ignore_headers

  Syntax:`scgi_ignore_headers field ...;`

  Default: —

  Context: `http`, `server`, `location`


Disables processing of certain response header fields from the SCGI server. The following fields can be ignored: “X-Accel-Redirect”, “X-Accel-Expires”, “X-Accel-Limit-Rate” (1.1.6), “X-Accel-Buffering” (1.1.6), “X-Accel-Charset” (1.1.6), “Expires”, “Cache-Control”, “Set-Cookie” (0.8.44), and “Vary” (1.7.7).

If not disabled, processing of these header fields has the following effect:

- “X-Accel-Expires”, “Expires”, “Cache-Control”, “Set-Cookie”, and “Vary” set the parameters of response [caching]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_valid">}});
- “X-Accel-Redirect” performs an [internal redirect]({{< ref "ng/mod_ref/ngx_http_core_module#internal">}}) to the specified URI;
- “X-Accel-Limit-Rate” sets the [rate limit]({{< ref "ng/mod_ref/ngx_http_core_module#limit_rate">}}) for transmission of a response to a client;
- “X-Accel-Buffering” enables or disables [buffering]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffering">}}) of a response;
- “X-Accel-Charset” sets the desired [charset]({{< ref "ng/mod_ref/ngx_http_charset_module#charset">}}) of a response.





### scgi_intercept_errors

  Syntax:`scgi_intercept_errors on | off;`

  Default: `scgi_intercept_errors off;`

  Context: `http`, `server`, `location`


Determines whether an SCGI server responses with codes greater than or equal to 300 should be passed to a client or be intercepted and redirected to nginx for processing with the [error_page]({{< ref "ng/mod_ref/ngx_http_core_module#error_page">}}) directive.



### scgi_limit_rate

  Syntax:  `scgi_limit_rate rate;`

  Default: `scgi_limit_rate 0;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.7.7.

Limits the speed of reading the response from the SCGI server. The `rate` is specified in bytes per second. The zero value disables rate limiting. The limit is set per a request, and so if nginx simultaneously opens two connections to the SCGI server, the overall rate will be twice as much as the specified limit. The limitation works only if [buffering]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffering">}}) of responses from the SCGI server is enabled.



### scgi_max_temp_file_size

  Syntax:  `scgi_max_temp_file_size size;`

  Default: `scgi_max_temp_file_size 1024m;`

  Context: `http`, `server`, `location`


When [buffering]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffering">}}) of responses from the SCGI server is enabled, and the whole response does not fit into the buffers set by the [scgi_buffer_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffer_size">}}) and [scgi_buffers]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffers">}}) directives, a part of the response can be saved to a temporary file. This directive sets the maximum `size` of the temporary file. The size of data written to the temporary file at a time is set by the [scgi_temp_file_write_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_temp_file_write_size">}}) directive.

The zero value disables buffering of responses to temporary files.



This restriction does not apply to responses that will be [cached]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache">}}) or [stored]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_store">}}) on disk.





### scgi_next_upstream

  Syntax:`scgi_next_upstream error | timeout | invalid_header | http_500 | http_503 | http_403 | http_404 | http_429 | non_idempotent | off ...;`

  Default: `scgi_next_upstream error timeout;`

  Context: `http`, `server`, `location`


Specifies in which cases a request should be passed to the next server:

- `error`

  an error occurred while establishing a connection with the server, passing a request to it, or reading the response header;

- `timeout`

  a timeout has occurred while establishing a connection with the server, passing a request to it, or reading the response header;

- `invalid_header`

  a server returned an empty or invalid response;

- `http_500`

  a server returned a response with the code 500;

- `http_503`

  a server returned a response with the code 503;

- `http_403`

  a server returned a response with the code 403;

- `http_404`

  a server returned a response with the code 404;

- `http_429`

  a server returned a response with the code 429 (1.11.13);

- `non_idempotent`

  normally, requests with a [non-idempotent](https://datatracker.ietf.org/doc/html/rfc7231#section-4.2.2) method (`POST`, `LOCK`, `PATCH`) are not passed to the next server if a request has been sent to an upstream server (1.9.13); enabling this option explicitly allows retrying such requests;

- `off`

  disables passing a request to the next server.



One should bear in mind that passing a request to the next server is only possible if nothing has been sent to a client yet. That is, if an error or timeout occurs in the middle of the transferring of a response, fixing this is impossible.

The directive also defines what is considered an [unsuccessful attempt]({{< ref "ng/mod_ref/ngx_http_upstream_module#max_fails">}}) of communication with a server. The cases of `error`, `timeout` and `invalid_header` are always considered unsuccessful attempts, even if they are not specified in the directive. The cases of `http_500`, `http_503`, and `http_429` are considered unsuccessful attempts only if they are specified in the directive. The cases of `http_403` and `http_404` are never considered unsuccessful attempts.

Passing a request to the next server can be limited by [the number of tries]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_next_upstream_tries">}}) and by [time]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_next_upstream_timeout">}}).



### scgi_next_upstream_timeout

  Syntax:`scgi_next_upstream_timeout time;`

  Default: `scgi_next_upstream_timeout 0;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.7.5.

Limits the time during which a request can be passed to the [next server]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_next_upstream">}}). The `0` value turns off this limitation.



### scgi_next_upstream_tries

  Syntax:`scgi_next_upstream_tries number;`

  Default: `scgi_next_upstream_tries 0;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.7.5.

Limits the number of possible tries for passing a request to the [next server]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_next_upstream">}}). The `0` value turns off this limitation.



### scgi_no_cache

  Syntax:  `scgi_no_cache string ...;`

  Default: —

  Context: `http`, `server`, `location`


Defines conditions under which the response will not be saved to a cache. If at least one value of the string parameters is not empty and is not equal to “0” then the response will not be saved:

```
scgi_no_cache $cookie_nocache $arg_nocache$arg_comment;
scgi_no_cache $http_pragma    $http_authorization;
```

Can be used along with the [scgi_cache_bypass]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_bypass">}}) directive.



### scgi_param

  Syntax:`scgi_param parameter value [if_not_empty];`

  Default: —

  Context: `http`, `server`, `location`


Sets a `parameter` that should be passed to the SCGI server. The `value` can contain text, variables, and their combination. These directives are inherited from the previous configuration level if and only if there are no `scgi_param` directives defined on the current level.

Standard [CGI environment variables](https://datatracker.ietf.org/doc/html/rfc3875#section-4.1) should be provided as SCGI headers, see the `scgi_params` file provided in the distribution:

```
location / {
    include scgi_params;
    ...
}
```



If the directive is specified with `if_not_empty` (1.1.11) then such a parameter will be passed to the server only if its value is not empty:

```
scgi_param HTTPS $https if_not_empty;
```





### scgi_pass

  Syntax:  `scgi_pass address;`

  Default: —

  Context: `location`, `if in location`


Sets the address of an SCGI server. The address can be specified as a domain name or IP address, and a port:

```
scgi_pass localhost:9000;
```

or as a UNIX-domain socket path:

```
scgi_pass unix:/tmp/scgi.socket;
```



If a domain name resolves to several addresses, all of them will be used in a round-robin fashion. In addition, an address can be specified as a [server group](https://nginx.org/en/docs/http/ngx_http_upstream_module.html).

Parameter value can contain variables. In this case, if an address is specified as a domain name, the name is searched among the described [server groups](https://nginx.org/en/docs/http/ngx_http_upstream_module.html), and, if not found, is determined using a [resolver]({{< ref "ng/mod_ref/ngx_http_core_module#resolver">}}).



### scgi_pass_header

  Syntax:  `scgi_pass_header field;`

  Default: —

  Context: `http`, `server`, `location`


Permits passing [otherwise disabled]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_hide_header">}}) header fields from an SCGI server to a client.



### scgi_pass_request_body

  Syntax:`scgi_pass_request_body on | off;`

  Default: `scgi_pass_request_body on;`

  Context: `http`, `server`, `location`


Indicates whether the original request body is passed to the SCGI server. See also the [scgi_pass_request_headers]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_pass_request_headers">}}) directive.



### scgi_pass_request_headers

  Syntax:`scgi_pass_request_headers on | off;`

  Default: `scgi_pass_request_headers on;`

  Context: `http`, `server`, `location`


Indicates whether the header fields of the original request are passed to the SCGI server. See also the [scgi_pass_request_body]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_pass_request_body">}}) directive.



### scgi_read_timeout

  Syntax:  `scgi_read_timeout time;`

  Default: `scgi_read_timeout 60s;`

  Context: `http`, `server`, `location`


Defines a timeout for reading a response from the SCGI server. The timeout is set only between two successive read operations, not for the transmission of the whole response. If the SCGI server does not transmit anything within this time, the connection is closed.



### scgi_request_buffering

  Syntax:`scgi_request_buffering on | off;`

  Default: `scgi_request_buffering on;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.7.11.

Enables or disables buffering of a client request body.

When buffering is enabled, the entire request body is [read]({{< ref "ng/mod_ref/ngx_http_core_module#client_body_buffer_size">}}) from the client before sending the request to an SCGI server.

When buffering is disabled, the request body is sent to the SCGI server immediately as it is received. In this case, the request cannot be passed to the [next server]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_next_upstream">}}) if nginx already started sending the request body.

When HTTP/1.1 chunked transfer encoding is used to send the original request body, the request body will be buffered regardless of the directive value.



### scgi_send_timeout

  Syntax:  `scgi_send_timeout time;`

  Default: `scgi_send_timeout 60s;`

  Context: `http`, `server`, `location`


Sets a timeout for transmitting a request to the SCGI server. The timeout is set only between two successive write operations, not for the transmission of the whole request. If the SCGI server does not receive anything within this time, the connection is closed.



### scgi_socket_keepalive

  Syntax:`scgi_socket_keepalive on | off;`

  Default: `scgi_socket_keepalive off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.15.6.

Configures the “TCP keepalive” behavior for outgoing connections to an SCGI server. By default, the operating system’s settings are in effect for the socket. If the directive is set to the value “`on`”, the `SO_KEEPALIVE` socket option is turned on for the socket.



### scgi_store

  Syntax:`scgi_store on | off | string;`

  Default: `scgi_store off;`

  Context: `http`, `server`, `location`


Enables saving of files to a disk. The `on` parameter saves files with paths corresponding to the directives [alias]({{< ref "ng/mod_ref/ngx_http_core_module#alias">}}) or [root]({{< ref "ng/mod_ref/ngx_http_core_module#root">}}). The `off` parameter disables saving of files. In addition, the file name can be set explicitly using the `string` with variables:

```
scgi_store /data/www$original_uri;
```



The modification time of files is set according to the received “Last-Modified” response header field. The response is first written to a temporary file, and then the file is renamed. Starting from version 0.8.9, temporary files and the persistent store can be put on different file systems. However, be aware that in this case a file is copied across two file systems instead of the cheap renaming operation. It is thus recommended that for any given location both saved files and a directory holding temporary files, set by the [scgi_temp_path]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_temp_path">}}) directive, are put on the same file system.

This directive can be used to create local copies of static unchangeable files, e.g.:

```
location /images/ {
    root              /data/www;
    error_page        404 = /fetch$uri;
}

location /fetch/ {
    internal;

    scgi_pass         backend:9000;
    ...

    scgi_store        on;
    scgi_store_access user:rw group:rw all:r;
    scgi_temp_path    /data/temp;

    alias             /data/www/;
}
```





### scgi_store_access

  Syntax:`scgi_store_access users:permissions ...;`

  Default: `scgi_store_access user:rw;`

  Context: `http`, `server`, `location`


Sets access permissions for newly created files and directories, e.g.:

```
scgi_store_access user:rw group:rw all:r;
```



If any `group` or `all` access permissions are specified then `user` permissions may be omitted:

```
scgi_store_access group:rw all:r;
```





### scgi_temp_file_write_size

  Syntax:  `scgi_temp_file_write_size size;`

  Default: `scgi_temp_file_write_size 8k|16k;`

  Context: `http`, `server`, `location`


Limits the `size` of data written to a temporary file at a time, when buffering of responses from the SCGI server to temporary files is enabled. By default, `size` is limited by two buffers set by the [scgi_buffer_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffer_size">}}) and [scgi_buffers]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffers">}}) directives. The maximum size of a temporary file is set by the [scgi_max_temp_file_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_max_temp_file_size">}}) directive.



### scgi_temp_path

  Syntax:`scgi_temp_path path [level1 [level2 [level3]]];`

  Default: `scgi_temp_path scgi_temp;`

  Context: `http`, `server`, `location`


Defines a directory for storing temporary files with data received from SCGI servers. Up to three-level subdirectory hierarchy can be used underneath the specified directory. For example, in the following configuration

```
scgi_temp_path /spool/nginx/scgi_temp 1 2;
```

a temporary file might look like this:

```
/spool/nginx/scgi_temp/7/45/00000123457
```



See also the `use_temp_path` parameter of the [scgi_cache_path]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_cache_path">}}) directive.