+++
title = "ngx_stream_limit_conn_module"
date = 2023-08-15T08:22:57+08:00
weight = 760
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_stream_limit_conn_module

https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html



The `ngx_stream_limit_conn_module` module (1.9.3) is used to limit the number of connections per the defined key, in particular, the number of connections from a single IP address.



## Example Configuration



```
stream {
    limit_conn_zone $binary_remote_addr zone=addr:10m;

    ...

    server {

        ...

        limit_conn           addr 1;
        limit_conn_log_level error;
    }
}
```





## Directives



### limit_conn

  Syntax:`limit_conn zone number;`

  Default: —

  Context: `stream`, `server`


Sets the shared memory zone and the maximum allowed number of connections for a given key value. When this limit is exceeded, the server will close the connection. For example, the directives

```
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    ...
    limit_conn addr 1;
}
```

allow only one connection per an IP address at a time.

When several `limit_conn` directives are specified, any configured limit will apply.

These directives are inherited from the previous configuration level if and only if there are no `limit_conn` directives defined on the current level.



### limit_conn_dry_run

  Syntax:`limit_conn_dry_run on | off;`

  Default: `limit_conn_dry_run off;`

  Context: `stream`, `server`


This directive appeared in version 1.17.6.

Enables the dry run mode. In this mode, the number of connections is not limited, however, in the shared memory zone, the number of excessive connections is accounted as usual.



### limit_conn_log_level

  Syntax:`limit_conn_log_level info | notice | warn | error;`

  Default: `limit_conn_log_level error;`

  Context: `stream`, `server`


Sets the desired logging level for cases when the server limits the number of connections.



### limit_conn_zone

  Syntax:`limit_conn_zone key zone=name:size;`

  Default: —

  Context: `stream`


Sets parameters for a shared memory zone that will keep states for various keys. In particular, the state includes the current number of connections. The `key` can contain text, variables, and their combinations (1.11.2). Connections with an empty key value are not accounted. Usage example:

```
limit_conn_zone $binary_remote_addr zone=addr:10m;
```

Here, the key is a client IP address set by the `$binary_remote_addr` variable. The size of `$binary_remote_addr` is 4 bytes for IPv4 addresses or 16 bytes for IPv6 addresses. The stored state always occupies 32 or 64 bytes on 32-bit platforms and 64 bytes on 64-bit platforms. One megabyte zone can keep about 32 thousand 32-byte states or about 16 thousand 64-byte states. If the zone storage is exhausted, the server will close the connection.



Additionally, as part of our [commercial subscription](http://nginx.com/products/), the [status information]({{< ref "ng/mod_ref/ngx_http_api_module#stream_limit_conns_">}}) for each such shared memory zone can be [obtained]({{< ref "ng/mod_ref/ngx_http_api_module#getStreamLimitConnZone">}}) or [reset]({{< ref "ng/mod_ref/ngx_http_api_module#deleteStreamLimitConnZoneStat">}}) with the [API](https://nginx.org/en/docs/http/ngx_http_api_module.html) since 1.17.7.





## Embedded Variables



- `$limit_conn_status`

  keeps the result of limiting the number of connections (1.17.6): `PASSED`, `REJECTED`, or `REJECTED_DRY_RUN`