+++
title = "ngx_http_limit_conn_module"
date = 2023-08-15T08:15:58+08:00
weight = 290
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_limit_conn_module

https://nginx.org/en/docs/http/ngx_http_limit_conn_module.html



The `ngx_http_limit_conn_module` module is used to limit the number of connections per the defined key, in particular, the number of connections from a single IP address.

Not all connections are counted. A connection is counted only if it has a request being processed by the server and the whole request header has already been read.



## Example Configuration



```
http {
    limit_conn_zone $binary_remote_addr zone=addr:10m;

    ...

    server {

        ...

        location /download/ {
            limit_conn addr 1;
        }
```





## Directives



### limit_conn

  Syntax:  `limit_conn zone number;`

  Default: —

  Context: `http`, `server`, `location`


Sets the shared memory zone and the maximum allowed number of connections for a given key value. When this limit is exceeded, the server will return the [error]({{< ref "ng/mod_ref/ngx_http_limit_conn_module#limit_conn_status">}}) in reply to a request. For example, the directives

```
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    location /download/ {
        limit_conn addr 1;
    }
```

allow only one connection per an IP address at a time.

In HTTP/2 and HTTP/3, each concurrent request is considered a separate connection.



There could be several `limit_conn` directives. For example, the following configuration will limit the number of connections to the server per a client IP and, at the same time, the total number of connections to the virtual server:

```
limit_conn_zone $binary_remote_addr zone=perip:10m;
limit_conn_zone $server_name zone=perserver:10m;

server {
    ...
    limit_conn perip 10;
    limit_conn perserver 100;
}
```



These directives are inherited from the previous configuration level if and only if there are no `limit_conn` directives defined on the current level.



### limit_conn_dry_run

  Syntax:`limit_conn_dry_run on | off;`

  Default: `limit_conn_dry_run off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.17.6.

Enables the dry run mode. In this mode, the number of connections is not limited, however, in the shared memory zone, the number of excessive connections is accounted as usual.



### limit_conn_log_level

  Syntax:`limit_conn_log_level info | notice | warn | error;`

  Default: `limit_conn_log_level error;`

  Context: `http`, `server`, `location`


This directive appeared in version 0.8.18.

Sets the desired logging level for cases when the server limits the number of connections.



### limit_conn_status

  Syntax:  `limit_conn_status code;`

  Default: `limit_conn_status 503;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.3.15.

Sets the status code to return in response to rejected requests.



### limit_conn_zone

  Syntax:`limit_conn_zone key zone=name:size;`

  Default: —

  Context: `http`


Sets parameters for a shared memory zone that will keep states for various keys. In particular, the state includes the current number of connections. The `key` can contain text, variables, and their combination. Requests with an empty key value are not accounted.

Prior to version 1.7.6, a `key` could contain exactly one variable.

Usage example:

```
limit_conn_zone $binary_remote_addr zone=addr:10m;
```

Here, a client IP address serves as a key. Note that instead of `$remote_addr`, the `$binary_remote_addr` variable is used here. The `$remote_addr` variable’s size can vary from 7 to 15 bytes. The stored state occupies either 32 or 64 bytes of memory on 32-bit platforms and always 64 bytes on 64-bit platforms. The `$binary_remote_addr` variable’s size is always 4 bytes for IPv4 addresses or 16 bytes for IPv6 addresses. The stored state always occupies 32 or 64 bytes on 32-bit platforms and 64 bytes on 64-bit platforms. One megabyte zone can keep about 32 thousand 32-byte states or about 16 thousand 64-byte states. If the zone storage is exhausted, the server will return the [error]({{< ref "ng/mod_ref/ngx_http_limit_conn_module#limit_conn_status">}}) to all further requests.



Additionally, as part of our [commercial subscription](http://nginx.com/products/), the [status information]({{< ref "ng/mod_ref/ngx_http_api_module#http_limit_conns_">}}) for each such shared memory zone can be [obtained]({{< ref "ng/mod_ref/ngx_http_api_module#getHttpLimitConnZone">}}) or [reset]({{< ref "ng/mod_ref/ngx_http_api_module#deleteHttpLimitConnZoneStat">}}) with the [API](https://nginx.org/en/docs/http/ngx_http_api_module.html) since 1.17.7.





### limit_zone

  Syntax:`limit_zone name $variable size;`

  Default: —

  Context: `http`


This directive was made obsolete in version 1.1.8 and was removed in version 1.7.6. An equivalent [limit_conn_zone]({{< ref "ng/mod_ref/ngx_http_limit_conn_module#limit_conn_zone">}}) directive with a changed syntax should be used instead:

`limit_conn_zone` `$variable` `zone`=`name`:`size`;





## Embedded Variables



### `$limit_conn_status`

  keeps the result of limiting the number of connections (1.17.6): `PASSED`, `REJECTED`, or `REJECTED_DRY_RUN`