+++
title = "ngx_http_upstream_module"
date = 2023-08-15T08:19:42+08:00
weight = 550
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_upstream_hc_module

https://nginx.org/en/docs/http/ngx_http_upstream_hc_module.html



The `ngx_http_upstream_hc_module` module allows enabling periodic health checks of the servers in a [group]({{< ref "ng/mod_ref/ngx_http_upstream_module#upstream">}}) referenced in the surrounding location. The server group must reside in the [shared memory]({{< ref "ng/mod_ref/ngx_http_upstream_module#zone">}}).

If a health check fails, the server will be considered unhealthy. If several health checks are defined for the same group of servers, a single failure of any check will make the corresponding server be considered unhealthy. Client requests are not passed to unhealthy servers and servers in the “checking” state.



Please note that most of the variables will have empty values when used with health checks.





This module is available as part of our [commercial subscription](http://nginx.com/products/).





## Example Configuration



```
upstream dynamic {
    zone upstream_dynamic 64k;

    server backend1.example.com      weight=5;
    server backend2.example.com:8080 fail_timeout=5s slow_start=30s;
    server 192.0.2.1                 max_fails=3;

    server backup1.example.com:8080  backup;
    server backup2.example.com:8080  backup;
}

server {
    location / {
        proxy_pass http://dynamic;
        health_check;
    }
}
```

With this configuration, nginx will send “`/`” requests to each server in the `backend` group every five seconds. If any communication error or timeout occurs, or a proxied server responds with the status code other than 2xx or 3xx, the health check will fail, and the server will be considered unhealthy.

Health checks can be configured to test the status code of a response, presence of certain header fields and their values, and the body contents. Tests are configured separately using the [match]({{< ref "ng/mod_ref/ngx_http_upstream_hc_module#match">}}) directive and referenced in the `match` parameter of the [health_check]({{< ref "ng/mod_ref/ngx_http_upstream_hc_module#health_check">}}) directive:

```
http {
    server {
    ...
        location / {
            proxy_pass http://backend;
            health_check match=welcome;
        }
    }

    match welcome {
        status 200;
        header Content-Type = text/html;
        body ~ "Welcome to nginx!";
    }
}
```

This configuration shows that in order for a health check to pass, the response to a health check request should succeed, have status 200, and contain “`Welcome to nginx!`” in the body.



## Directives



### health_check

  Syntax:`health_check [parameters];`

  Default: —

  Context: `location`


Enables periodic health checks of the servers in a [group]({{< ref "ng/mod_ref/ngx_http_upstream_module#upstream">}}) referenced in the surrounding location.

The following optional parameters are supported:

- `interval`=`time`

  sets the interval between two consecutive health checks, by default, 5 seconds.

- `jitter`=`time`

  sets the time within which each health check will be randomly delayed, by default, there is no delay.

- `fails`=`number`

  sets the number of consecutive failed health checks of a particular server after which this server will be considered unhealthy, by default, 1.

- `passes`=`number`

  sets the number of consecutive passed health checks of a particular server after which the server will be considered healthy, by default, 1.

- `uri`=`uri`

  defines the URI used in health check requests, by default, “`/`”.

- `mandatory` [`persistent`]

  sets the initial “checking” state for a server until the first health check is completed (1.11.7). Client requests are not passed to servers in the “checking” state. If the parameter is not specified, the server will be initially considered healthy.The `persistent` parameter (1.19.7) sets the initial “up” state for a server after reload if the server was considered healthy before reload.

- `match`=`name`

  specifies the `match` block configuring the tests that a response should pass in order for a health check to pass. By default, the response should have status code 2xx or 3xx.

- `port`=`number`

  defines the port used when connecting to a server to perform a health check (1.9.7). By default, equals the [server]({{< ref "ng/mod_ref/ngx_http_upstream_module#server">}}) port.

- `type`=`grpc` [`grpc_service`=`name`] [`grpc_status`=`code`]

  enables periodic [health checks](https://github.com/grpc/grpc/blob/master/doc/health-checking.md#grpc-health-checking-protocol) of a gRPC server or a particular gRPC service specified with the optional `grpc_service` parameter (1.19.5). If the server does not support the gRPC Health Checking Protocol, the optional `grpc_status` parameter can be used to specify non-zero gRPC [status](https://github.com/grpc/grpc/blob/master/doc/statuscodes.md#status-codes-and-their-use-in-grpc) (for example, status code “`12`” / “`UNIMPLEMENTED`”) that will be treated as healthy:`health_check mandatory type=grpc grpc_status=12; `The `type`=`grpc` parameter must be specified after all other directive parameters, `grpc_service` and `grpc_status` must follow `type`=`grpc`. The parameter is not compatible with [`uri`]({{< ref "ng/mod_ref/ngx_http_upstream_hc_module#health_check_uri">}}) or [`match`]({{< ref "ng/mod_ref/ngx_http_upstream_hc_module#health_check_match">}}) parameters.

- `keepalive_time`=`time`

  enables [keepalive]({{< ref "ng/mod_ref/ngx_http_upstream_module#keepalive">}}) connections for health checks and specifies the time during which requests can be processed through one keepalive connection (1.21.7). By default keepalive connections are disabled.





### match

  Syntax:`match name { ... }`

  Default: —

  Context: `http`


Defines the named test set used to verify responses to health check requests.

The following items can be tested in a response:

- `status 200;`

  status is 200

- `status ! 500;`

  status is not 500

- `status 200 204;`

  status is 200 or 204

- `status ! 301 302;`

  status is neither 301 nor 302

- `status 200-399;`

  status is in the range from 200 to 399

- `status ! 400-599;`

  status is not in the range from 400 to 599

- `status 301-303 307;`

  status is either 301, 302, 303, or 307



- `header Content-Type = text/html;`

  header contains “Content-Type” with value `text/html`

- `header Content-Type != text/html;`

  header contains “Content-Type” with value other than `text/html`

- `header Connection ~ close;`

  header contains “Connection” with value matching regular expression `close`

- `header Connection !~ close;`

  header contains “Connection” with value not matching regular expression `close`

- `header Host;`

  header contains “Host”

- `header ! X-Accel-Redirect;`

  header lacks “X-Accel-Redirect”



- `body ~ "Welcome to nginx!";`

  body matches regular expression “`Welcome to nginx!`”

- `body !~ "Welcome to nginx!";`

  body does not match regular expression “`Welcome to nginx!`”



- `require` `$variable` `...;`

  all specified variables are not empty and not equal to “0” (1.15.9).



If several tests are specified, the response matches only if it matches all tests.

Only the first 256k of the response body are examined.



Examples:

```
# status is 200, content type is "text/html",
# and body contains "Welcome to nginx!"
match welcome {
    status 200;
    header Content-Type = text/html;
    body ~ "Welcome to nginx!";
}
```



```
# status is not one of 301, 302, 303, or 307, and header does not have "Refresh:"
match not_redirect {
    status ! 301-303 307;
    header ! Refresh;
}
```



```
# status ok and not in maintenance mode
match server_ok {
    status 200-399;
    body !~ "maintenance mode";
}
```



```
# status is 200 or 204
map $upstream_status $good_status {
    200 1;
    204 1;
}

match server_ok {
    require $good_status;
}
```