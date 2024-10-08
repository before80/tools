+++
title = "ngx_stream_upstream_hc_module"
date = 2023-08-15T08:25:06+08:00
weight = 890
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_stream_upstream_hc_module

https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html



The `ngx_stream_upstream_hc_module` module (1.9.0) allows enabling periodic health checks of the servers in a [group](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#upstream). The server group must reside in the [shared memory](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#zone).

If a health check fails, the server will be considered unhealthy. If several health checks are defined for the same group of servers, a single failure of any check will make the corresponding server be considered unhealthy. Client connections are not passed to unhealthy servers and servers in the “checking” state.



This module is available as part of our [commercial subscription](http://nginx.com/products/).





## Example Configuration



```
upstream tcp {
    zone upstream_tcp 64k;

    server backend1.example.com:12345 weight=5;
    server backend2.example.com:12345 fail_timeout=5s slow_start=30s;
    server 192.0.2.1:12345            max_fails=3;

    server backup1.example.com:12345  backup;
    server backup2.example.com:12345  backup;
}

server {
    listen     12346;
    proxy_pass tcp;
    health_check;
}
```

With this configuration, nginx will check the ability to establish a TCP connection to each server in the `tcp` group every five seconds. When a connection to the server cannot be established, the health check will fail, and the server will be considered unhealthy.

Health checks can be configured for the UDP protocol:

```
upstream dns_upstream {

    zone   dns_zone 64k;

    server dns1.example.com:53;
    server dns2.example.com:53;
    server dns3.example.com:53;
}

server {
    listen       53 udp;
    proxy_pass   dns_upstream;
    health_check udp;
}
```

In this case, the absence of ICMP “`Destination Unreachable`” message is expected in reply to the sent string “`nginx health check`”.

Health checks can also be configured to test data obtained from the server. Tests are configured separately using the [match](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#match) directive and referenced in the `match` parameter of the [health_check](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#health_check) directive.



## Directives



### health_check

  Syntax:`health_check [parameters];`

  Default: —

  Context: `server`


Enables periodic health checks of the servers in a [group](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#upstream).

The following optional parameters are supported:

- `interval`=`time`

  sets the interval between two consecutive health checks, by default, 5 seconds.

- `jitter`=`time`

  sets the time within which each health check will be randomly delayed, by default, there is no delay.

- `fails`=`number`

  sets the number of consecutive failed health checks of a particular server after which this server will be considered unhealthy, by default, 1.

- `passes`=`number`

  sets the number of consecutive passed health checks of a particular server after which the server will be considered healthy, by default, 1.

- `mandatory` [`persistent`]

  sets the initial “checking” state for a server until the first health check is completed (1.11.7). Client connections are not passed to servers in the “checking” state. If the parameter is not specified, the server will be initially considered healthy.The `persistent` parameter (1.21.1) sets the initial “up” state for a server after reload if the server was considered healthy before reload.

- `match`=`name`

  specifies the `match` block configuring the tests that a successful connection should pass in order for a health check to pass. By default, for TCP, only the ability to establish a TCP connection with the server is checked. For [UDP](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#health_check_udp), the absence of ICMP “`Destination Unreachable`” message is expected in reply to the sent string “`nginx health check`”.Prior to version 1.11.7, by default, UDP health check required a [match](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#hc_match) block with the [send](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#match_send) and [expect](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#match_expect) parameters.

- `port`=`number`

  defines the port used when connecting to a server to perform a health check (1.9.7). By default, equals the [server](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#server) port.

- `udp`

  specifies that the `UDP` protocol should be used for health checks instead of the default `TCP` protocol (1.9.13).





### health_check_timeout

  Syntax:`health_check_timeout timeout;`

  Default: `health_check_timeout 5s;`

  Context: `stream`, `server`


Overrides the [proxy_timeout](https://nginx.org/en/docs/stream/ngx_stream_proxy_module.html#proxy_timeout) value for health checks.



### match

  Syntax:`match name { ... }`

  Default: —

  Context: `stream`


Defines the named test set used to verify server responses to health checks.

The following parameters can be configured:

- `send` `string`;

  sends a `string` to the server;

- `expect` `string` | `~` `regex`;

  a literal string (1.9.12) or a regular expression that the data obtained from the server should match. The regular expression is specified with the preceding “`~*`” modifier (for case-insensitive matching), or the “`~`” modifier (for case-sensitive matching).

Both `send` and `expect` parameters can contain hexadecimal literals with the prefix “`\x`” followed by two hex digits, for example, “`\x80`” (1.9.12).

Health check is passed if:

- the TCP connection was successfully established;
- the `string` from the `send` parameter, if specified, was sent;
- the data obtained from the server matched the string or regular expression from the `expect` parameter, if specified;
- the time elapsed does not exceed the value specified in the [health_check_timeout](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#health_check_timeout) directive.



Example:

```
upstream backend {
    zone     upstream_backend 10m;
    server   127.0.0.1:12345;
}

match http {
    send     "GET / HTTP/1.0\r\nHost: localhost\r\n\r\n";
    expect ~ "200 OK";
}

server {
    listen       12346;
    proxy_pass   backend;
    health_check match=http;
}
```





Only the first [proxy_buffer_size](https://nginx.org/en/docs/stream/ngx_stream_proxy_module.html#proxy_buffer_size) bytes of data obtained from the server are examined.