+++
title = "ngx_http_api_module"
date = 2023-08-15T08:12:07+08:00
weight = 40
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## Module ngx_http_api_module

https://nginx.org/en/docs/http/ngx_http_api_module.html



The `ngx_http_api_module` module (1.13.3) provides REST API for accessing various status information, configuring upstream server groups on-the-fly, and managing [key-value pairs](https://nginx.org/en/docs/http/ngx_http_keyval_module.html) without the need of reconfiguring nginx.



The module supersedes the [ngx_http_status_module](../ngx_http_status_module) and [ngx_http_upstream_conf_module](../ngx_http_upstream_conf_module) modules.



When using the `PATCH` or `POST` methods, make sure that the payload does not exceed the [buffer size]({{< ref "ng/mod_ref/ngx_http_core_module#client_body_buffer_size">}}) for reading the client request body, otherwise, the 413 (Request Entity Too Large) error may be returned.



This module is available as part of our [commercial subscription](http://nginx.com/products/).





## Example Configuration



```
http {
    upstream backend {
        zone http_backend 64k;

        server backend1.example.com weight=5;
        server backend2.example.com;
    }

    proxy_cache_path /data/nginx/cache_backend keys_zone=cache_backend:10m;

    server {
        server_name backend.example.com;

        location / {
            proxy_pass  http://backend;
            proxy_cache cache_backend;

            health_check;
        }

        status_zone server_backend;
    }

    keyval_zone zone=one:32k state=one.keyval;
    keyval $arg_text $text zone=one;

    server {
        listen 127.0.0.1;

        location /api {
            api write=on;
            allow 127.0.0.1;
            deny all;
        }
    }
}

stream {
    upstream backend {
        zone stream_backend 64k;

        server backend1.example.com:12345 weight=5;
        server backend2.example.com:12345;
    }

    server {
        listen      127.0.0.1:12345;
        proxy_pass  backend;
        status_zone server_backend;
        health_check;
    }
}
```

All API requests include a supported API [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) in the URI. Examples of API requests with this configuration:

```
http://127.0.0.1/api/8/
http://127.0.0.1/api/8/nginx
http://127.0.0.1/api/8/connections
http://127.0.0.1/api/8/http/requests
http://127.0.0.1/api/8/http/server_zones/server_backend
http://127.0.0.1/api/8/http/caches/cache_backend
http://127.0.0.1/api/8/http/upstreams/backend
http://127.0.0.1/api/8/http/upstreams/backend/servers/
http://127.0.0.1/api/8/http/upstreams/backend/servers/1
http://127.0.0.1/api/8/http/keyvals/one?key=arg1
http://127.0.0.1/api/8/stream/
http://127.0.0.1/api/8/stream/server_zones/server_backend
http://127.0.0.1/api/8/stream/upstreams/
http://127.0.0.1/api/8/stream/upstreams/backend
http://127.0.0.1/api/8/stream/upstreams/backend/servers/1
```





## Directives



### api

  Syntax:`api [write=on|off];`

  Default: —

  Context: `location`


Turns on the REST API interface in the surrounding location. Access to this location should be [limited]({{< ref "ng/mod_ref/ngx_http_core_module#satisfy">}}).

The `write` parameter determines whether the API is read-only or read-write. By default, the API is read-only.



All API requests should contain a supported API version in the URI. If the request URI equals the location prefix, the list of supported API versions is returned. The current API version is “`8`”.

The optional “`fields`” argument in the request line specifies which fields of the requested objects will be output:

```
http://127.0.0.1/api/8/nginx?fields=version,build
```





### status_zone

  Syntax:  `status_zone zone;`

  Default: —

  Context: `server`, `location`, `if in location`


This directive appeared in version 1.13.12.

Enables collection of virtual [http]({{< ref "ng/mod_ref/ngx_http_core_module#server">}}) or [stream](https://nginx.org/en/docs/stream/ngx_stream_core_module.html#server) server status information in the specified `zone`. Several servers may share the same zone.



Starting from 1.17.0, status information can be collected per [location]({{< ref "ng/mod_ref/ngx_http_core_module#location">}}). The special value `off` disables statistics collection in nested location blocks. Note that the statistics is collected in the context of a location where processing ends. It may be different from the original location, if an [internal redirect]({{< ref "ng/mod_ref/ngx_http_core_module#internal">}}) happens during request processing.



## Compatibility



- Detailed failure counters were added to SSL statistics in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 8 (1.23.2).
- The `ssl` data for each HTTP [upstream]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream">}}), [server zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_server_zone">}}), and stream [upstream]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream">}}), [server zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_server_zone">}}), were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 8 (1.21.6).
- The `codes` data in `responses` for each HTTP [upstream]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream">}}), [server zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_server_zone">}}), and [location zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_location_zone">}}) were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 7.
- The [/stream/limit_conns/]({{< ref "ng/mod_ref/ngx_http_api_module#stream_limit_conns_">}}) data were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 6.
- The [/http/limit_conns/]({{< ref "ng/mod_ref/ngx_http_api_module#http_limit_conns_">}}) data were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 6.
- The [/http/limit_reqs/]({{< ref "ng/mod_ref/ngx_http_api_module#http_limit_reqs_">}}) data were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 6.
- The “`expire`” parameter of a [key-value](https://nginx.org/en/docs/http/ngx_http_keyval_module.html) pair can be [set]({{< ref "ng/mod_ref/ngx_http_api_module#postHttpKeyvalZoneData">}}) or [changed]({{< ref "ng/mod_ref/ngx_http_api_module#patchHttpKeyvalZoneKeyValue">}}) since [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 5.
- The [/resolvers/]({{< ref "ng/mod_ref/ngx_http_api_module#resolvers_">}}) data were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 5.
- The [/http/location_zones/]({{< ref "ng/mod_ref/ngx_http_api_module#http_location_zones_">}}) data were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 5.
- The `path` and `method` fields of [nginx error object]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}}) were removed in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 4. These fields continue to exist in earlier api versions, but show an empty value.
- The [/stream/zone_sync/]({{< ref "ng/mod_ref/ngx_http_api_module#stream_zone_sync_">}}) data were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 3.
- The [drain]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream_conf_server">}}) parameter was added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 2.
- The [/stream/keyvals/]({{< ref "ng/mod_ref/ngx_http_api_module#stream_keyvals_">}}) data were added in [version]({{< ref "ng/mod_ref/ngx_http_api_module#api_version">}}) 2.





## Endpoints



### `/`

Supported methods:`GET` - Return list of root endpointsReturns a list of root endpoints.Possible responses:200 - Success, returns an array of strings404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/nginx`

  Supported methods:`GET` - Return status of nginx running instanceReturns nginx version, build name, address, number of configuration reloads, IDs of master and worker processes.Request parameters:`fields` (`string`, optional)Limits which fields of nginx running instance will be output.Possible responses:200 - Success, returns [nginx]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_object">}})404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/processes`

  Supported methods:`GET` - Return nginx processes statusReturns the number of abnormally terminated and respawned child processes.Possible responses:200 - Success, returns [Processes]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_processes">}})404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset nginx processes statisticsResets counters of abnormally terminated and respawned child processes.Possible responses:204 - Success404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/connections`

  Supported methods:`GET` - Return client connections statisticsReturns statistics of client connections.Request parameters:`fields` (`string`, optional)Limits which fields of the connections statistics will be output.Possible responses:200 - Success, returns [Connections]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_connections">}})404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset client connections statisticsResets statistics of accepted and dropped client connections.Possible responses:204 - Success404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/slabs/`

  Supported methods:`GET` - Return status of all slabsReturns status of slabs for each shared memory zone with slab allocator.Request parameters:`fields` (`string`, optional)Limits which fields of slab zones will be output. If the “`fields`” value is empty, then only zone names will be output.Possible responses:200 - Success, returns a collection of "[Shared memory zone with slab allocator]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_slab_zone">}})" objects for all slabs404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/slabs/{slabZoneName}`

  Parameters common for all methods:`slabZoneName` (`string`, required)The name of the shared memory zone with slab allocator.Supported methods:`GET` - Return status of a slabReturns status of slabs for a particular shared memory zone with slab allocator.Request parameters:`fields` (`string`, optional)Limits which fields of the slab zone will be output.Possible responses:200 - Success, returns [Shared memory zone with slab allocator]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_slab_zone">}})404 - Slab not found (`SlabNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset slab statisticsResets the “`reqs`” and “`fails`” metrics for each memory slot.Possible responses:204 - Success404 - Slab not found (`SlabNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/`

  Supported methods:`GET` - Return list of HTTP-related endpointsReturns a list of first level HTTP endpoints.Possible responses:200 - Success, returns an array of strings404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/requests`

  Supported methods:`GET` - Return HTTP requests statisticsReturns status of client HTTP requests.Request parameters:`fields` (`string`, optional)Limits which fields of client HTTP requests statistics will be output.Possible responses:200 - Success, returns [HTTP Requests]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_requests">}})404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset HTTP requests statisticsResets the number of total client HTTP requests.Possible responses:204 - Success404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/server_zones/`

  Supported methods:`GET` - Return status of all HTTP server zonesReturns status information for each HTTP [server zone]({{< ref "ng/mod_ref/ngx_http_api_module#status_zone">}}).Request parameters:`fields` (`string`, optional)Limits which fields of server zones will be output. If the “`fields`” value is empty, then only server zone names will be output.Possible responses:200 - Success, returns a collection of "[HTTP Server Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_server_zone">}})" objects for all HTTP server zones404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/server_zones/{httpServerZoneName}`

  Parameters common for all methods:`httpServerZoneName` (`string`, required)The name of an HTTP server zone.Supported methods:`GET` - Return status of an HTTP server zoneReturns status of a particular HTTP server zone.Request parameters:`fields` (`string`, optional)Limits which fields of the server zone will be output.Possible responses:200 - Success, returns [HTTP Server Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_server_zone">}})404 - Server zone not found (`ServerZoneNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics for an HTTP server zoneResets statistics of accepted and discarded requests, responses, received and sent bytes, counters of SSL handshakes and session reuses in a particular HTTP server zone.Possible responses:204 - Success404 - Server zone not found (`ServerZoneNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/location_zones/`

  Supported methods:`GET` - Return status of all HTTP location zonesReturns status information for each HTTP [location zone]({{< ref "ng/mod_ref/ngx_http_api_module#status_zone_location">}}).Request parameters:`fields` (`string`, optional)Limits which fields of location zones will be output. If the “`fields`” value is empty, then only zone names will be output.Possible responses:200 - Success, returns a collection of "[HTTP Location Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_location_zone">}})" objects for all HTTP location zones404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/location_zones/{httpLocationZoneName}`

  Parameters common for all methods:`httpLocationZoneName` (`string`, required)The name of an HTTP [location zone]({{< ref "ng/mod_ref/ngx_http_api_module#status_zone_location">}}).Supported methods:`GET` - Return status of an HTTP location zoneReturns status of a particular HTTP [location zone]({{< ref "ng/mod_ref/ngx_http_api_module#status_zone_location">}}).Request parameters:`fields` (`string`, optional)Limits which fields of the location zone will be output.Possible responses:200 - Success, returns [HTTP Location Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_location_zone">}})404 - Location zone not found (`LocationZoneNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics for a location zone.Resets statistics of accepted and discarded requests, responses, received and sent bytes in a particular location zone.Possible responses:204 - Success404 - Location zone not found (`LocationZoneNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/caches/`

  Supported methods:`GET` - Return status of all cachesReturns status of each cache configured by [proxy_cache_path]({{< ref "ng/mod_ref/ngx_http_proxy_module#proxy_cache_path">}}) and other “`*_cache_path`” directives.

  Request parameters:

  `fields` (`string`, optional)

  Limits which fields of cache zones will be output. If the “`fields`” value is empty, then only names of cache zones will be output.

  Possible responses:

  - 200 - Success, returns a collection of "[HTTP Cache]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_cache">}})" objects for all HTTP caches

  - 404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/caches/{httpCacheZoneName}`

  Parameters common for all methods:`httpCacheZoneName` (`string`, required)The name of the cache zone.Supported methods:`GET` - Return status of a cacheReturns status of a particular cache.Request parameters:`fields` (`string`, optional)Limits which fields of the cache zone will be output.Possible responses:200 - Success, returns [HTTP Cache]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_cache">}})404 - Cache not found (`CacheNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset cache statisticsResets statistics of cache hits/misses in a particular cache zone.Possible responses:204 - Success404 - Cache not found (`CacheNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/limit_conns/`

  Supported methods:`GET` - Return status of all HTTP limit_conn zonesReturns status information for each HTTP [limit_conn zone]({{< ref "ng/mod_ref/ngx_http_limit_conn_module#limit_conn_zone">}}).Request parameters:`fields` (`string`, optional)Limits which fields of limit_conn zones will be output. If the “`fields`” value is empty, then only zone names will be output.Possible responses:200 - Success, returns a collection of "[HTTP Connections Limiting]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_limit_conn_zone">}})" objects for all HTTP limit conns404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/limit_conns/{httpLimitConnZoneName}`

  Parameters common for all methods:`httpLimitConnZoneName` (`string`, required)The name of a [limit_conn zone]({{< ref "ng/mod_ref/ngx_http_limit_conn_module#limit_conn_zone">}}).Supported methods:`GET` - Return status of an HTTP limit_conn zoneReturns status of a particular HTTP [limit_conn zone]({{< ref "ng/mod_ref/ngx_http_limit_conn_module#limit_conn_zone">}}).Request parameters:`fields` (`string`, optional)Limits which fields of the [limit_conn zone]({{< ref "ng/mod_ref/ngx_http_limit_conn_module#limit_conn_zone">}}) will be output.Possible responses:200 - Success, returns [HTTP Connections Limiting]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_limit_conn_zone">}})404 - limit_conn not found (`LimitConnNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics for an HTTP limit_conn zoneResets the connection limiting statistics.Possible responses:204 - Success404 - limit_conn not found (`LimitConnNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/limit_reqs/`

  Supported methods:`GET` - Return status of all HTTP limit_req zonesReturns status information for each HTTP [limit_req zone]({{< ref "ng/mod_ref/ngx_http_limit_req_module#limit_req_zone">}}).Request parameters:`fields` (`string`, optional)Limits which fields of limit_req zones will be output. If the “`fields`” value is empty, then only zone names will be output.Possible responses:200 - Success, returns a collection of "[HTTP Requests Rate Limiting]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_limit_req_zone">}})" objects for all HTTP limit reqs404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/limit_reqs/{httpLimitReqZoneName}`

  Parameters common for all methods:`httpLimitReqZoneName` (`string`, required)The name of a [limit_req zone]({{< ref "ng/mod_ref/ngx_http_limit_req_module#limit_req_zone">}}).Supported methods:`GET` - Return status of an HTTP limit_req zoneReturns status of a particular HTTP [limit_req zone]({{< ref "ng/mod_ref/ngx_http_limit_req_module#limit_req_zone">}}).Request parameters:`fields` (`string`, optional)Limits which fields of the [limit_req zone]({{< ref "ng/mod_ref/ngx_http_limit_req_module#limit_req_zone">}}) will be output.Possible responses:200 - Success, returns [HTTP Requests Rate Limiting]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_limit_req_zone">}})404 - limit_req not found (`LimitReqNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics for an HTTP limit_req zoneResets the requests limiting statistics.Possible responses:204 - Success404 - limit_req not found (`LimitReqNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/upstreams/`

  Supported methods:`GET` - Return status of all HTTP upstream server groupsReturns status of each HTTP upstream server group and its servers.Request parameters:`fields` (`string`, optional)Limits which fields of upstream server groups will be output. If the “`fields`” value is empty, only names of upstreams will be output.Possible responses:200 - Success, returns a collection of "[HTTP Upstream]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream">}})" objects for all HTTP upstreams404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/upstreams/{httpUpstreamName}/`

  Parameters common for all methods:`httpUpstreamName` (`string`, required)The name of an HTTP upstream server group.Supported methods:`GET` - Return status of an HTTP upstream server groupReturns status of a particular HTTP upstream server group and its servers.Request parameters:`fields` (`string`, optional)Limits which fields of the upstream server group will be output.Possible responses:200 - Success, returns [HTTP Upstream]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream">}})400 - Upstream is static (`UpstreamStatic`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics of an HTTP upstream server groupResets the statistics for each upstream server in an upstream server group and queue statistics.Possible responses:204 - Success400 - Upstream is static (`UpstreamStatic`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/upstreams/{httpUpstreamName}/servers/`

  Parameters common for all methods:`httpUpstreamName` (`string`, required)The name of an upstream server group.Supported methods:`GET` - Return configuration of all servers in an HTTP upstream server groupReturns configuration of each server in a particular HTTP upstream server group.Possible responses:200 - Success, returns an array of [HTTP Upstream Servers]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`POST` - Add a server to an HTTP upstream server groupAdds a new server to an HTTP upstream server group. Server parameters are specified in the JSON format.Request parameters:`postHttpUpstreamServer` ([HTTP Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream_conf_server">}}), required)Address of a new server and other optional parameters in the JSON format. The “`ID`”, “`backup`”, and “`service`” parameters cannot be changed.Possible responses:201 - Created, returns [HTTP Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), invalid “`parameter`” value (`UpstreamConfFormatError`), missing “`server`” argument (`UpstreamConfFormatError`), unknown parameter “`name`” (`UpstreamConfFormatError`), nested object or list (`UpstreamConfFormatError`), “`error`” while parsing (`UpstreamBadAddress`), service upstream “`host`” may not have port (`UpstreamBadAddress`), service upstream “`host`” requires domain name (`UpstreamBadAddress`), invalid “`weight`” (`UpstreamBadWeight`), invalid “`max_conns`” (`UpstreamBadMaxConns`), invalid “`max_fails`” (`UpstreamBadMaxFails`), invalid “`fail_timeout`” (`UpstreamBadFailTimeout`), invalid “`slow_start`” (`UpstreamBadSlowStart`), reading request body failed `BodyReadError`), route is too long (`UpstreamBadRoute`), “`service`” is empty (`UpstreamBadService`), no resolver defined to resolve (`UpstreamConfNoResolver`), upstream “`name`” has no backup (`UpstreamNoBackup`), upstream “`name`” memory exhausted (`UpstreamOutOfMemory`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})409 - Entry exists (`EntryExists`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})415 - JSON error (`JsonError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/upstreams/{httpUpstreamName}/servers/{httpUpstreamServerId}`

  Parameters common for all methods:`httpUpstreamName` (`string`, required)The name of the upstream server group.`httpUpstreamServerId` (`string`, required)The ID of the server.Supported methods:`GET` - Return configuration of a server in an HTTP upstream server groupReturns configuration of a particular server in the HTTP upstream server group.Possible responses:200 - Success, returns [HTTP Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), invalid server ID (`UpstreamBadServerId`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Server with ID “`id`” does not exist (`UpstreamServerNotFound`), unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`PATCH` - Modify a server in an HTTP upstream server groupModifies settings of a particular server in an HTTP upstream server group. Server parameters are specified in the JSON format.Request parameters:`patchHttpUpstreamServer` ([HTTP Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream_conf_server">}}), required)Server parameters, specified in the JSON format. The “`ID`”, “`backup`”, and “`service`” parameters cannot be changed.Possible responses:200 - Success, returns [HTTP Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), invalid “`parameter`” value (`UpstreamConfFormatError`), unknown parameter “`name`” (`UpstreamConfFormatError`), nested object or list (`UpstreamConfFormatError`), “`error`” while parsing (`UpstreamBadAddress`), invalid “`server`” argument (`UpstreamBadAddress`), invalid server ID (`UpstreamBadServerId`), invalid “`weight`” (`UpstreamBadWeight`), invalid “`max_conns`” (`UpstreamBadMaxConns`), invalid “`max_fails`” (`UpstreamBadMaxFails`), invalid “`fail_timeout`” (`UpstreamBadFailTimeout`), invalid “`slow_start`” (`UpstreamBadSlowStart`), reading request body failed `BodyReadError`), route is too long (`UpstreamBadRoute`), “`service`” is empty (`UpstreamBadService`), server “`ID`” address is immutable (`UpstreamServerImmutable`), server “`ID`” weight is immutable (`UpstreamServerWeightImmutable`), upstream “`name`” memory exhausted (`UpstreamOutOfMemory`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Server with ID “`id`” does not exist (`UpstreamServerNotFound`), unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})415 - JSON error (`JsonError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Remove a server from an HTTP upstream server groupRemoves a server from an HTTP upstream server group.Possible responses:200 - Success, returns an array of [HTTP Upstream Servers]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), invalid server ID (`UpstreamBadServerId`), server “`id`” not removable (`UpstreamServerImmutable`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Server with ID “`id`” does not exist (`UpstreamServerNotFound`), unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/keyvals/`

  Supported methods:`GET` - Return key-value pairs from all HTTP keyval zonesReturns key-value pairs for each HTTP keyval shared memory [zone]({{< ref "ng/mod_ref/ngx_http_keyval_module#keyval_zone">}}).Request parameters:`fields` (`string`, optional)If the “`fields`” value is empty, then only HTTP keyval zone names will be output.Possible responses:200 - Success, returns a collection of "[HTTP Keyval Shared Memory Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_keyval_zone">}})" objects for all HTTP keyvals404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/http/keyvals/{httpKeyvalZoneName}`

  Parameters common for all methods:`httpKeyvalZoneName` (`string`, required)The name of an HTTP keyval shared memory zone.Supported methods:`GET` - Return key-value pairs from an HTTP keyval zoneReturns key-value pairs stored in a particular HTTP keyval shared memory [zone]({{< ref "ng/mod_ref/ngx_http_keyval_module#keyval_zone">}}).Request parameters:`key` (`string`, optional)Get a particular key-value pair from the HTTP keyval zone.Possible responses:200 - Success, returns [HTTP Keyval Shared Memory Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_keyval_zone">}})404 - Keyval not found (`KeyvalNotFound`), keyval key not found (`KeyvalKeyNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`POST` - Add a key-value pair to the HTTP keyval zoneAdds a new key-value pair to the HTTP keyval shared memory [zone]({{< ref "ng/mod_ref/ngx_http_keyval_module#keyval_zone">}}). Several key-value pairs can be entered if the HTTP keyval shared memory zone is empty.Request parameters:`Key-value` ([HTTP Keyval Shared Memory Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_keyval_zone_post_patch">}}), required)A key-value pair is specified in the JSON format. Several key-value pairs can be entered if the HTTP keyval shared memory zone is empty. Expiration time in milliseconds can be specified for a key-value pair with the `expire` parameter which overrides the [`timeout`]({{< ref "ng/mod_ref/ngx_http_keyval_module#keyval_timeout">}}) parameter of the [keyval_zone]({{< ref "ng/mod_ref/ngx_http_keyval_module#keyval_zone">}}) directive.Possible responses:201 - Created400 - Invalid JSON (`KeyvalFormatError`), invalid key format (`KeyvalFormatError`), key required (`KeyvalFormatError`), keyval timeout is not enabled (`KeyvalFormatError`), only one key can be added (`KeyvalFormatError`), reading request body failed `BodyReadError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Keyval not found (`KeyvalNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})409 - Entry exists (`EntryExists`), key already exists (`KeyvalKeyExists`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})413 - Request Entity Too Large, returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})415 - JSON error (`JsonError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`PATCH` - Modify a key-value or delete a keyChanges the value of the selected key in the key-value pair, deletes a key by setting the key value to `null`, changes expiration time of a key-value pair. If [synchronization](https://nginx.org/en/docs/stream/ngx_stream_zone_sync_module.html#zone_sync) of keyval zones in a cluster is enabled, deletes a key only on a target cluster node. Expiration time in milliseconds can be specified for a key-value pair with the `expire` parameter which overrides the [`timeout`]({{< ref "ng/mod_ref/ngx_http_keyval_module#keyval_timeout">}}) parameter of the [keyval_zone]({{< ref "ng/mod_ref/ngx_http_keyval_module#keyval_zone">}}) directive.Request parameters:`httpKeyvalZoneKeyValue` ([HTTP Keyval Shared Memory Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_http_keyval_zone_post_patch">}}), required)A new value for the key is specified in the JSON format.Possible responses:204 - Success400 - Invalid JSON (`KeyvalFormatError`), key required (`KeyvalFormatError`), keyval timeout is not enabled (`KeyvalFormatError`), only one key can be updated (`KeyvalFormatError`), reading request body failed `BodyReadError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Keyval not found (`KeyvalNotFound`), keyval key not found (`KeyvalKeyNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})413 - Request Entity Too Large, returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})415 - JSON error (`JsonError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Empty the HTTP keyval zoneDeletes all key-value pairs from the HTTP keyval shared memory [zone]({{< ref "ng/mod_ref/ngx_http_keyval_module#keyval_zone">}}). If [synchronization](https://nginx.org/en/docs/stream/ngx_stream_zone_sync_module.html#zone_sync) of keyval zones in a cluster is enabled, empties the keyval zone only on a target cluster node.Possible responses:204 - Success404 - Keyval not found (`KeyvalNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/`

  Supported methods:`GET` - Return list of stream-related endpointsReturns a list of first level stream endpoints.Possible responses:200 - Success, returns an array of strings404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/server_zones/`

  Supported methods:`GET` - Return status of all stream server zonesReturns status information for each stream [server zone]({{< ref "ng/mod_ref/ngx_http_api_module#status_zone">}}).Request parameters:`fields` (`string`, optional)Limits which fields of server zones will be output. If the “`fields`” value is empty, then only server zone names will be output.Possible responses:200 - Success, returns a collection of "[Stream Server Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_server_zone">}})" objects for all stream server zones404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/server_zones/{streamServerZoneName}`

  Parameters common for all methods:`streamServerZoneName` (`string`, required)The name of a stream server zone.Supported methods:`GET` - Return status of a stream server zoneReturns status of a particular stream server zone.Request parameters:`fields` (`string`, optional)Limits which fields of the server zone will be output.Possible responses:200 - Success, returns [Stream Server Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_server_zone">}})404 - Server zone not found (`ServerZoneNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics for a stream server zoneResets statistics of accepted and discarded connections, sessions, received and sent bytes, counters of SSL handshakes and session reuses in a particular stream server zone.Possible responses:204 - Success404 - Server zone not found (`ServerZoneNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/limit_conns/`

  Supported methods:`GET` - Return status of all stream limit_conn zonesReturns status information for each stream [limit_conn zone](https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html#limit_conn_zone).Request parameters:`fields` (`string`, optional)Limits which fields of limit_conn zones will be output. If the “`fields`” value is empty, then only zone names will be output.Possible responses:200 - Success, returns a collection of "[Stream Connections Limiting]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_limit_conn_zone">}})" objects for all stream limit conns404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/limit_conns/{streamLimitConnZoneName}`

  Parameters common for all methods:`streamLimitConnZoneName` (`string`, required)The name of a [limit_conn zone](https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html#limit_conn_zone).Supported methods:`GET` - Return status of an stream limit_conn zoneReturns status of a particular stream [limit_conn zone](https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html#limit_conn_zone).Request parameters:`fields` (`string`, optional)Limits which fields of the [limit_conn zone](https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html#limit_conn_zone) will be output.Possible responses:200 - Success, returns [Stream Connections Limiting]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_limit_conn_zone">}})404 - limit_conn not found (`LimitConnNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics for a stream limit_conn zoneResets the connection limiting statistics.Possible responses:204 - Success404 - limit_conn not found (`LimitConnNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/upstreams/`

  Supported methods:`GET` - Return status of all stream upstream server groupsReturns status of each stream upstream server group and its servers.Request parameters:`fields` (`string`, optional)Limits which fields of upstream server groups will be output. If the “`fields`” value is empty, only names of upstreams will be output.Possible responses:200 - Success, returns a collection of "[Stream Upstream]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream">}})" objects for all stream upstreams404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/upstreams/{streamUpstreamName}/`

  Parameters common for all methods:`streamUpstreamName` (`string`, required)The name of a stream upstream server group.Supported methods:`GET` - Return status of a stream upstream server groupReturns status of a particular stream upstream server group and its servers.Request parameters:`fields` (`string`, optional)Limits which fields of the upstream server group will be output.Possible responses:200 - Success, returns [Stream Upstream]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream">}})400 - Upstream is static (`UpstreamStatic`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics of a stream upstream server groupResets the statistics for each upstream server in an upstream server group.Possible responses:204 - Success400 - Upstream is static (`UpstreamStatic`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/upstreams/{streamUpstreamName}/servers/`

  Parameters common for all methods:`streamUpstreamName` (`string`, required)The name of an upstream server group.Supported methods:`GET` - Return configuration of all servers in a stream upstream server groupReturns configuration of each server in a particular stream upstream server group.Possible responses:200 - Success, returns an array of [Stream Upstream Servers]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`POST` - Add a server to a stream upstream server groupAdds a new server to a stream upstream server group. Server parameters are specified in the JSON format.Request parameters:`postStreamUpstreamServer` ([Stream Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream_conf_server">}}), required)Address of a new server and other optional parameters in the JSON format. The “`ID`”, “`backup`”, and “`service`” parameters cannot be changed.Possible responses:201 - Created, returns [Stream Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), invalid “`parameter`” value (`UpstreamConfFormatError`), missing “`server`” argument (`UpstreamConfFormatError`), unknown parameter “`name`” (`UpstreamConfFormatError`), nested object or list (`UpstreamConfFormatError`), “`error`” while parsing (`UpstreamBadAddress`), no port in server “`host`” (`UpstreamBadAddress`), service upstream “`host`” may not have port (`UpstreamBadAddress`), service upstream “`host`” requires domain name (`UpstreamBadAddress`), invalid “`weight`” (`UpstreamBadWeight`), invalid “`max_conns`” (`UpstreamBadMaxConns`), invalid “`max_fails`” (`UpstreamBadMaxFails`), invalid “`fail_timeout`” (`UpstreamBadFailTimeout`), invalid “`slow_start`” (`UpstreamBadSlowStart`), “`service`” is empty (`UpstreamBadService`), no resolver defined to resolve (`UpstreamConfNoResolver`), upstream “`name`” has no backup (`UpstreamNoBackup`), upstream “`name`” memory exhausted (`UpstreamOutOfMemory`), reading request body failed `BodyReadError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})409 - Entry exists (`EntryExists`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})415 - JSON error (`JsonError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/upstreams/{streamUpstreamName}/servers/{streamUpstreamServerId}`

  Parameters common for all methods:`streamUpstreamName` (`string`, required)The name of the upstream server group.`streamUpstreamServerId` (`string`, required)The ID of the server.Supported methods:`GET` - Return configuration of a server in a stream upstream server groupReturns configuration of a particular server in the stream upstream server group.Possible responses:200 - Success, returns [Stream Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), invalid server ID (`UpstreamBadServerId`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), server with ID “`id`” does not exist (`UpstreamServerNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`PATCH` - Modify a server in a stream upstream server groupModifies settings of a particular server in a stream upstream server group. Server parameters are specified in the JSON format.Request parameters:`patchStreamUpstreamServer` ([Stream Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream_conf_server">}}), required)Server parameters, specified in the JSON format. The “`ID`”, “`backup`”, and “`service`” parameters cannot be changed.Possible responses:200 - Success, returns [Stream Upstream Server]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), invalid “`parameter`” value (`UpstreamConfFormatError`), unknown parameter “`name`” (`UpstreamConfFormatError`), nested object or list (`UpstreamConfFormatError`), “`error`” while parsing (`UpstreamBadAddress`), invalid “`server`” argument (`UpstreamBadAddress`), no port in server “`host`” (`UpstreamBadAddress`), invalid server ID (`UpstreamBadServerId`), invalid “`weight`” (`UpstreamBadWeight`), invalid “`max_conns`” (`UpstreamBadMaxConns`), invalid “`max_fails`” (`UpstreamBadMaxFails`), invalid “`fail_timeout`” (`UpstreamBadFailTimeout`), invalid “`slow_start`” (`UpstreamBadSlowStart`), reading request body failed `BodyReadError`), “`service`” is empty (`UpstreamBadService`), server “`ID`” address is immutable (`UpstreamServerImmutable`), server “`ID`” weight is immutable (`UpstreamServerWeightImmutable`), upstream “`name`” memory exhausted (`UpstreamOutOfMemory`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Server with ID “`id`” does not exist (`UpstreamServerNotFound`), unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})415 - JSON error (`JsonError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Remove a server from a stream upstream server groupRemoves a server from a stream server group.Possible responses:200 - Success, returns an array of [Stream Upstream Servers]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_upstream_conf_server">}})400 - Upstream is static (`UpstreamStatic`), invalid server ID (`UpstreamBadServerId`), server “`id`” not removable (`UpstreamServerImmutable`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Server with ID “`id`” does not exist (`UpstreamServerNotFound`), unknown version (`UnknownVersion`), upstream not found (`UpstreamNotFound`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/keyvals/`

  Supported methods:`GET` - Return key-value pairs from all stream keyval zonesReturns key-value pairs for each stream keyval shared memory [zone](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_zone).Request parameters:`fields` (`string`, optional)If the “`fields`” value is empty, then only stream keyval zone names will be output.Possible responses:200 - Success, returns a collection of "[Stream Keyval Shared Memory Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_keyval_zone">}})" objects for all stream keyvals404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/keyvals/{streamKeyvalZoneName}`

  Parameters common for all methods:`streamKeyvalZoneName` (`string`, required)The name of a stream keyval shared memory zone.Supported methods:`GET` - Return key-value pairs from a stream keyval zoneReturns key-value pairs stored in a particular stream keyval shared memory [zone](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_zone).Request parameters:`key` (`string`, optional)Get a particular key-value pair from the stream keyval zone.Possible responses:200 - Success, returns [Stream Keyval Shared Memory Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_keyval_zone">}})404 - Keyval not found (`KeyvalNotFound`), keyval key not found (`KeyvalKeyNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`POST` - Add a key-value pair to the stream keyval zoneAdds a new key-value pair to the stream keyval shared memory [zone](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_zone). Several key-value pairs can be entered if the stream keyval shared memory zone is empty.Request parameters:`Key-value` ([Stream Keyval Shared Memory Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_keyval_zone_post_patch">}}), required)A key-value pair is specified in the JSON format. Several key-value pairs can be entered if the stream keyval shared memory zone is empty. Expiration time in milliseconds can be specified for a key-value pair with the `expire` parameter which overrides the [`timeout`](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_timeout) parameter of the [keyval_zone](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_zone) directive.Possible responses:201 - Created400 - Invalid JSON (`KeyvalFormatError`), invalid key format (`KeyvalFormatError`), key required (`KeyvalFormatError`), keyval timeout is not enabled (`KeyvalFormatError`), only one key can be added (`KeyvalFormatError`), reading request body failed `BodyReadError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Keyval not found (`KeyvalNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})409 - Entry exists (`EntryExists`), key already exists (`KeyvalKeyExists`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})413 - Request Entity Too Large, returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})415 - JSON error (`JsonError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`PATCH` - Modify a key-value or delete a keyChanges the value of the selected key in the key-value pair, deletes a key by setting the key value to `null`, changes expiration time of a key-value pair. If [synchronization](https://nginx.org/en/docs/stream/ngx_stream_zone_sync_module.html#zone_sync) of keyval zones in a cluster is enabled, deletes a key only on a target cluster node. Expiration time is specified in milliseconds with the `expire` parameter which overrides the [`timeout`](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_timeout) parameter of the [keyval_zone](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_zone) directive.Request parameters:`streamKeyvalZoneKeyValue` ([Stream Keyval Shared Memory Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_keyval_zone_post_patch">}}), required)A new value for the key is specified in the JSON format.Possible responses:204 - Success400 - Invalid JSON (`KeyvalFormatError`), key required (`KeyvalFormatError`), keyval timeout is not enabled (`KeyvalFormatError`), only one key can be updated (`KeyvalFormatError`), reading request body failed `BodyReadError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})404 - Keyval not found (`KeyvalNotFound`), keyval key not found (`KeyvalKeyNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})413 - Request Entity Too Large, returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})415 - JSON error (`JsonError`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Empty the stream keyval zoneDeletes all key-value pairs from the stream keyval shared memory [zone](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_zone). If [synchronization](https://nginx.org/en/docs/stream/ngx_stream_zone_sync_module.html#zone_sync) of keyval zones in a cluster is enabled, empties the keyval zone only on a target cluster node.Possible responses:204 - Success404 - Keyval not found (`KeyvalNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/stream/zone_sync/`

  Supported methods:`GET` - Return sync status of a nodeReturns synchronization status of a cluster node.Possible responses:200 - Success, returns [Stream Zone Sync Node]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_zone_sync">}})404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/resolvers/`

  Supported methods:`GET` - Return status for all resolver zonesReturns status information for each [resolver zone]({{< ref "ng/mod_ref/ngx_http_core_module#resolver_status_zone">}}).Request parameters:`fields` (`string`, optional)Limits which fields of resolvers statistics will be output.Possible responses:200 - Success, returns a collection of "[Resolver Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_resolver_zone">}})" objects for all resolvers404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/resolvers/{resolverZoneName}`

  Parameters common for all methods:`resolverZoneName` (`string`, required)The name of a resolver zone.Supported methods:`GET` - Return statistics of a resolver zoneReturns statistics stored in a particular resolver [zone]({{< ref "ng/mod_ref/ngx_http_core_module#resolver_status_zone">}}).Request parameters:`fields` (`string`, optional)Limits which fields of the resolver zone will be output (requests, responses, or both).Possible responses:200 - Success, returns [Resolver Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_resolver_zone">}})404 - Resolver zone not found (`ResolverZoneNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset statistics for a resolver zone.Resets statistics in a particular resolver zone.Possible responses:204 - Success404 - Resolver zone not found (`ResolverZoneNotFound`), unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})

### `/ssl`

  Supported methods:`GET` - Return SSL statisticsReturns SSL statistics.Request parameters:`fields` (`string`, optional)Limits which fields of SSL statistics will be output.Possible responses:200 - Success, returns [SSL]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_ssl_object">}})404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})`DELETE` - Reset SSL statisticsResets counters of SSL handshakes and session reuses.Possible responses:204 - Success404 - Unknown version (`UnknownVersion`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})405 - Method disabled (`MethodDisabled`), returns [Error]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_error">}})





## Response Objects



### nginx

General information about nginx:

- `version` (`string`)

  Version of nginx.

- `build` (`string`)

  Name of nginx build.

- `address` (`string`)

  The address of the server that accepted status request.

- `generation` (`integer`)

  The total number of configuration [reloads](https://nginx.org/en/docs/control.html#reconfiguration).

- `load_timestamp` (`string`)

  Time of the last reload of configuration, in the ISO 8601 format with millisecond resolution.

- `timestamp` (`string`)

  Current time in the ISO 8601 format with millisecond resolution.

- `pid` (`integer`)

  The ID of the worker process that handled status request.

- `ppid` (`integer`)

  The ID of the master process that started the [worker process]({{< ref "ng/mod_ref/ngx_http_status_module#pid">}}).

Example:

```
{
  "nginx" : {
    "version" : "1.21.6",
    "build" : "nginx-plus-r27",
    "address" : "206.251.255.64",
    "generation" : 6,
    "load_timestamp" : "2022-06-28T11:15:44.467Z",
    "timestamp" : "2022-06-28T09:26:07.305Z",
    "pid" : 32212,
    "ppid" : 32210
  }
}
```

### Processes

- `respawned` (`integer`)

  The total number of abnormally terminated and respawned child processes.

Example:

```
{
  "respawned" : 0
}
```

### Connections

The number of accepted, dropped, active, and idle connections.

- `accepted` (`integer`)

  The total number of accepted client connections.

- `dropped` (`integer`)

  The total number of dropped client connections.

- `active` (`integer`)

  The current number of active client connections.

- `idle` (`integer`)

  The current number of idle client connections.

Example:

```
{
  "accepted" : 4968119,
  "dropped" : 0,
  "active" : 5,
  "idle" : 117
}
```

### SSL

- `handshakes` (`integer`)

  The total number of successful SSL handshakes.

- `handshakes_failed` (`integer`)

  The total number of failed SSL handshakes.

- `session_reuses` (`integer`)

  The total number of session reuses during SSL handshake.

- `no_common_protocol` (`integer`)

  The number of SSL handshakes failed because of no common protocol.

- `no_common_cipher` (`integer`)

  The number of SSL handshakes failed because of no shared cipher.

- `handshake_timeout` (`integer`)

  The number of SSL handshakes failed because of a timeout.

- `peer_rejected_cert` (`integer`)

  The number of failed SSL handshakes when nginx presented the certificate to the client but it was rejected with a corresponding alert message.

- `verify_failures`

  SSL certificate verification errors`no_cert` (`integer`)A client did not provide the required certificate.`expired_cert` (`integer`)An expired or not yet valid certificate was presented by a client.`revoked_cert` (`integer`)A revoked certificate was presented by a client.`hostname_mismatch` (`integer`)Server's certificate doesn't match the hostname.`other` (`integer`)Other SSL certificate verification errors.

Example:

```
{
  "handshakes" : 79572,
  "handshakes_failed" : 21025,
  "session_reuses" : 15762,
  "no_common_protocol" : 4,
  "no_common_cipher" : 2,
  "handshake_timeout" : 0,
  "peer_rejected_cert" : 0,
  "verify_failures" : {
    "no_cert" : 0,
    "expired_cert" : 2,
    "revoked_cert" : 1,
    "hostname_mismatch" : 2,
    "other" : 1
  }
}
```

### Shared memory zone with slab allocator

### Shared memory zone with slab allocator

- `pages`

  The number of free and used memory pages.`used` (`integer`)The current number of used memory pages.`free` (`integer`)The current number of free memory pages.

- `slots`

  Status data for memory slots (8, 16, 32, 64, 128, etc.)A collection of "[Memory Slot]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_slab_zone_slot">}})" objects

Example:

```
{
  "pages" : {
    "used" : 1143,
    "free" : 2928
  },
  "slots" : {
    "8" : {
      "used" : 0,
      "free" : 0,
      "reqs" : 0,
      "fails" : 0
    },
    "16" : {
      "used" : 0,
      "free" : 0,
      "reqs" : 0,
      "fails" : 0
    },
    "32" : {
      "used" : 0,
      "free" : 0,
      "reqs" : 0,
      "fails" : 0
    },
    "64" : {
      "used" : 1,
      "free" : 63,
      "reqs" : 1,
      "fails" : 0
    },
    "128" : {
      "used" : 0,
      "free" : 0,
      "reqs" : 0,
      "fails" : 0
    },
    "256" : {
      "used" : 18078,
      "free" : 178,
      "reqs" : 1635736,
      "fails" : 0
    }
  }
}
```

### Memory Slot

- `used` (`integer`)

  The current number of used memory slots.

- `free` (`integer`)

  The current number of free memory slots.

- `reqs` (`integer`)

  The total number of attempts to allocate memory of specified size.

- `fails` (`integer`)

  The number of unsuccessful attempts to allocate memory of specified size.

- HTTP Requests:

  - `total` (`integer`)

    The total number of client requests.

  - `current` (`integer`)

    The current number of client requests.

  Example:

  ```
  {
    "total" : 10624511,
    "current" : 4
  }
  ```

  ### HTTP Server Zone

  - `processing` (`integer`)

    The number of client requests that are currently being processed.

  - `requests` (`integer`)

    The total number of client requests received from clients.

  - `responses`

    The total number of responses sent to clients, the number of responses with status codes “`1xx`”, “`2xx`”, “`3xx`”, “`4xx`”, and “`5xx`”, and the number of responses per each status code.`1xx` (`integer`)The number of responses with “`1xx`” status codes.`2xx` (`integer`)The number of responses with “`2xx`” status codes.`3xx` (`integer`)The number of responses with “`3xx`” status codes.`4xx` (`integer`)The number of responses with “`4xx`” status codes.`5xx` (`integer`)The number of responses with “`5xx`” status codes.`codes`The number of responses per each status code.`codeNumber` (`integer`)The number of responses with this particular status code.`total` (`integer`)The total number of responses sent to clients.

  - `discarded` (`integer`)

    The total number of requests completed without sending a response.

  - `received` (`integer`)

    The total number of bytes received from clients.

  - `sent` (`integer`)

    The total number of bytes sent to clients.

  - `ssl`

    `handshakes` (`integer`)The total number of successful SSL handshakes.`handshakes_failed` (`integer`)The total number of failed SSL handshakes.`session_reuses` (`integer`)The total number of session reuses during SSL handshake.`no_common_protocol` (`integer`)The number of SSL handshakes failed because of no common protocol.`no_common_cipher` (`integer`)The number of SSL handshakes failed because of no shared cipher.`handshake_timeout` (`integer`)The number of SSL handshakes failed because of a timeout.`peer_rejected_cert` (`integer`)The number of failed SSL handshakes when nginx presented the certificate to the client but it was rejected with a corresponding alert message.`verify_failures`SSL certificate verification errors`no_cert` (`integer`)A client did not provide the required certificate.`expired_cert` (`integer`)An expired or not yet valid certificate was presented by a client.`revoked_cert` (`integer`)A revoked certificate was presented by a client.`other` (`integer`)Other SSL certificate verification errors.

  Example:

  ```
  {
    "processing" : 1,
    "requests" : 706690,
    "responses" : {
      "1xx" : 0,
      "2xx" : 699482,
      "3xx" : 4522,
      "4xx" : 907,
      "5xx" : 266,
      "codes" : {
        "200" : 699482,
        "301" : 4522,
        "404" : 907,
        "503" : 266
      },
      "total" : 705177
    },
    "discarded" : 1513,
    "received" : 172711587,
    "sent" : 19415530115,
    "ssl" : {
      "handshakes" : 104303,
      "handshakes_failed" : 1421,
      "session_reuses" : 54645,
      "no_common_protocol" : 4,
      "no_common_cipher" : 2,
      "handshake_timeout" : 0,
      "peer_rejected_cert" : 0,
      "verify_failures" : {
        "no_cert" : 0,
        "expired_cert" : 2,
        "revoked_cert" : 1,
        "other" : 1
      }
    }
  }
  ```

  ### HTTP Location Zone

  - `requests` (`integer`)

    The total number of client requests received from clients.

  - `responses`

    The total number of responses sent to clients, the number of responses with status codes “`1xx`”, “`2xx`”, “`3xx`”, “`4xx`”, and “`5xx`”, and the number of responses per each status code.`1xx` (`integer`)The number of responses with “`1xx`” status codes.`2xx` (`integer`)The number of responses with “`2xx`” status codes.`3xx` (`integer`)The number of responses with “`3xx`” status codes.`4xx` (`integer`)The number of responses with “`4xx`” status codes.`5xx` (`integer`)The number of responses with “`5xx`” status codes.`codes`The number of responses per each status code.`codeNumber` (`integer`)The number of responses with this particular status code.`total` (`integer`)The total number of responses sent to clients.

  - `discarded` (`integer`)

    The total number of requests completed without sending a response.

  - `received` (`integer`)

    The total number of bytes received from clients.

  - `sent` (`integer`)

    The total number of bytes sent to clients.

  Example:

  ```
  {
    "requests" : 706690,
    "responses" : {
      "1xx" : 0,
      "2xx" : 699482,
      "3xx" : 4522,
      "4xx" : 907,
      "5xx" : 266,
      "codes" : {
        "200" : 112674,
        "301" : 4522,
        "404" : 2504,
        "503" : 266
      },
      "total" : 705177
    },
    "discarded" : 1513,
    "received" : 172711587,
    "sent" : 19415530115
  }
  ```

  ### HTTP Cache

  - `size` (`integer`)

    The current size of the cache.

  - `max_size` (`integer`)

    The limit on the maximum size of the cache specified in the configuration.

  - `cold` (`boolean`)

    A boolean value indicating whether the “cache loader” process is still loading data from disk into the cache.

  - `hit`

    `responses` (`integer`)The total number of [valid]({{< ref "ng/mod_ref/ngx_http_proxy_module#proxy_cache_valid">}}) responses read from the cache.`bytes` (`integer`)The total number of bytes read from the cache.

  - `stale`

    - `responses` (`integer`)The total number of expired responses read from the cache (see [proxy_cache_use_stale]({{< ref "ng/mod_ref/ngx_http_proxy_module#proxy_cache_use_stale">}}) and other “`*_cache_use_stale`” directives).

    - `bytes` (`integer`)The total number of bytes read from the cache.

  - `updating`

    - `responses` (`integer`)

      The total number of expired responses read from the cache while responses were being updated (see [proxy_cache_use_stale]({{< ref "ng/mod_ref/ngx_http_proxy_module#proxy_cache_use_stale_updating">}}) and other “`*_cache_use_stale`” directives).

    - `bytes` (`integer`)

      The total number of bytes read from the cache.

  - `revalidated`

    - `responses` (`integer`)

      The total number of expired and revalidated responses read from the cache (see [proxy_cache_revalidate]({{< ref "ng/mod_ref/ngx_http_proxy_module#proxy_cache_revalidate">}}) and other “`*_cache_revalidate`” directives.

    - `bytes` (`integer`)

      The total number of bytes read from the cache.

  - `miss`

    - `responses` (`integer`)

      The total number of responses not found in the cache.`bytes` (`integer`)The total number of bytes read from the proxied server.`responses_written` (`integer`)The total number of responses written to the cache.

    - `bytes_written` (`integer`)

      The total number of bytes written to the cache.

  - `expired`

    - `responses` (`integer`)

      The total number of expired responses not taken from the cache.`bytes` (`integer`)The total number of bytes read from the proxied server.`responses_written` (`integer`)The total number of responses written to the cache.

    - `bytes_written` (`integer`)

      The total number of bytes written to the cache.

  - `bypass`

    - `responses` (`integer`)

      The total number of responses not looked up in the cache due to the [proxy_cache_bypass]({{< ref "ng/mod_ref/ngx_http_proxy_module#proxy_cache_bypass">}}) and other “`*_cache_bypass`” directives.`bytes` (`integer`)The total number of bytes read from the proxied server.`responses_written` (`integer`)The total number of responses written to the cache.

    - `bytes_written` (`integer`)

      The total number of bytes written to the cache.

  Example:

  ```
  {
    "size" : 530915328,
    "max_size" : 536870912,
    "cold" : false,
    "hit" : {
      "responses" : 254032,
      "bytes" : 6685627875
    },
    "stale" : {
      "responses" : 0,
      "bytes" : 0
    },
    "updating" : {
      "responses" : 0,
      "bytes" : 0
    },
    "revalidated" : {
      "responses" : 0,
      "bytes" : 0
    },
    "miss" : {
      "responses" : 1619201,
      "bytes" : 53841943822
    },
    "expired" : {
      "responses" : 45859,
      "bytes" : 1656847080,
      "responses_written" : 44992,
      "bytes_written" : 1641825173
    },
    "bypass" : {
      "responses" : 200187,
      "bytes" : 5510647548,
      "responses_written" : 200173,
      "bytes_written" : 44992
    }
  }
  ```

  ### HTTP Connections Limiting

  - `passed` (`integer`)

    The total number of connections that were neither limited nor accounted as limited.

  - `rejected` (`integer`)

    The total number of connections that were rejected.

  - `rejected_dry_run` (`integer`)

    The total number of connections accounted as rejected in the [dry run]({{< ref "ng/mod_ref/ngx_http_limit_conn_module#limit_conn_dry_run">}}) mode.

  Example:

  ```
  {
    "passed" : 15,
    "rejected" : 0,
    "rejected_dry_run" : 2
  }
  ```

  ### HTTP Requests Rate Limiting

  - `passed` (`integer`)

    The total number of requests that were neither limited nor accounted as limited.

  - `delayed` (`integer`)

    The total number of requests that were delayed.

  - `rejected` (`integer`)

    The total number of requests that were rejected.

  - `delayed_dry_run` (`integer`)

    The total number of requests accounted as delayed in the [dry run]({{< ref "ng/mod_ref/ngx_http_limit_req_module#limit_req_dry_run">}}) mode.

  - `rejected_dry_run` (`integer`)

    The total number of requests accounted as rejected in the [dry run]({{< ref "ng/mod_ref/ngx_http_limit_req_module#limit_req_dry_run">}}) mode.

  Example:

  ```
  {
    "passed" : 15,
    "delayed" : 4,
    "rejected" : 0,
    "delayed_dry_run" : 1,
    "rejected_dry_run" : 2
  }
  ```

  ### HTTP Upstream

  - `peers`

    An array of:

    - `id` (`integer`)

      The ID of the server.

    - `server` (`string`)

      An [address]({{< ref "ng/mod_ref/ngx_http_upstream_module#server">}}) of the server.

    - `service` (`string`)

      The [service]({{< ref "ng/mod_ref/ngx_http_upstream_module#service">}}) parameter value of the [server]({{< ref "ng/mod_ref/ngx_http_upstream_module#server">}}) directive.

    - `name` (`string`)

      The name of the server specified in the [server]({{< ref "ng/mod_ref/ngx_http_upstream_module#server">}}) directive.

    - `backup` (`boolean`)

      A boolean value indicating whether the server is a [backup]({{< ref "ng/mod_ref/ngx_http_upstream_module#backup">}}) server.

    - `weight` (`integer`)

      [Weight]({{< ref "ng/mod_ref/ngx_http_upstream_module#weight">}}) of the server.

    - `state` (`string`)

      Current state, which may be one of “`up`”, “`draining`”, “`down`”, “`unavail`”, “`checking`”, and “`unhealthy`”.`active` (`integer`)The current number of active connections.

    

    - `ssl`

      `handshakes` (`integer`)The total number of successful SSL handshakes.

    `handshakes_failed` (`integer`)The total number of failed SSL handshakes.

    `session_reuses` (`integer`)The total number of session reuses during SSL handshake.

    `no_common_protocol` (`integer`)The number of SSL handshakes failed because of no common protocol.

    `handshake_timeout` (`integer`)The number of SSL handshakes failed because of a timeout.

    `peer_rejected_cert` (`integer`)The number of failed SSL handshakes when nginx presented the certificate to the upstream server but it was rejected with a corresponding alert message.

    `verify_failures`SSL certificate verification errors`expired_cert` (`integer`)An expired or not yet valid certificate was presented by an upstream server.

    `revoked_cert` (`integer`)A revoked certificate was presented by an upstream server.

    `hostname_mismatch` (`integer`)Server's certificate doesn't match the hostname.

    `other` (`integer`)Other SSL certificate verification errors.

    `max_conns` (`integer`)The [max_conns]({{< ref "ng/mod_ref/ngx_http_upstream_module#max_conns">}}) limit for the server.

    `requests` (`integer`)The total number of client requests forwarded to this server.

    `responses`

    `1xx` (`integer`)The number of responses with “`1xx`” status codes.

    `2xx` (`integer`)The number of responses with “`2xx`” status codes.

    `3xx` (`integer`)The number of responses with “`3xx`” status codes.

    `4xx` (`integer`)The number of responses with “`4xx`” status codes.

    `5xx` (`integer`)The number of responses with “`5xx`” status codes.

    `codes`The number of responses per each status code.

    `codeNumber` (`integer`)The number of responses with this particular status code.

    `total` (`integer`)The total number of responses obtained from this server.

    `sent` (`integer`)The total number of bytes sent to this server.

    `received` (`integer`)The total number of bytes received from this server.

    `fails` (`integer`)The total number of unsuccessful attempts to communicate with the server.

    `unavail` (`integer`)How many times the server became unavailable for client requests (state “`unavail`”) due to the number of unsuccessful attempts reaching the [max_fails]({{< ref "ng/mod_ref/ngx_http_upstream_module#max_fails">}}) threshold.

    `health_checks` 

    `checks` (`integer`)The total number of [health check]({{< ref "ng/mod_ref/ngx_http_upstream_hc_module#health_check">}}) requests made.

    `fails` (`integer`)The number of failed health checks.

    `unhealthy` (`integer`)How many times the server became unhealthy (state “`unhealthy`”).

    `last_passed` (`boolean`)Boolean indicating if the last health check request was successful and passed [tests]({{< ref "ng/mod_ref/ngx_http_upstream_hc_module#match">}}).

    `downtime` (`integer`)Total time the server was in the “`unavail`”, “`checking`”, and “`unhealthy`” states.`downstart` (`string`)The time when the server became “`unavail`”, “`checking`”, or “`unhealthy`”, in the ISO 8601 format with millisecond resolution.

    `selected` (`string`)The time when the server was last selected to process a request, in the ISO 8601 format with millisecond resolution.

    `header_time` (`integer`)The average time to get the [response header]({{< ref "ng/mod_ref/ngx_http_upstream_module#var_upstream_header_time">}}) from the server.

    `response_time` (`integer`)The average time to get the [full response]({{< ref "ng/mod_ref/ngx_http_upstream_module#var_upstream_response_time">}}) from the server.

  - `keepalive` (`integer`)

    The current number of idle [keepalive]({{< ref "ng/mod_ref/ngx_http_upstream_module#keepalive">}}) connections.

  - `zombies` (`integer`)

    The current number of servers removed from the group but still processing active client requests.

  - `zone` (`string`)

    The name of the shared memory [zone]({{< ref "ng/mod_ref/ngx_http_upstream_module#zone">}}) that keeps the group’s configuration and run-time state.

  - `queue`

    For the requests [queue]({{< ref "ng/mod_ref/ngx_http_upstream_module#queue">}}), the following data are provided:`size` (`integer`)The current number of requests in the queue.`max_size` (`integer`)The maximum number of requests that can be in the queue at the same time.`overflows` (`integer`)The total number of requests rejected due to the queue overflow.

  Example:

  ```
  {
    "upstream_backend" : {
      "peers" : [
        {
          "id" : 0,
          "server" : "10.0.0.1:8088",
          "name" : "10.0.0.1:8088",
          "backup" : false,
          "weight" : 5,
          "state" : "up",
          "active" : 0,
          "ssl" : {
            "handshakes" : 620311,
            "handshakes_failed" : 3432,
            "session_reuses" : 36442,
            "no_common_protocol" : 4,
            "handshake_timeout" : 0,
            "peer_rejected_cert" : 0,
            "verify_failures" : {
              "expired_cert" : 2,
              "revoked_cert" : 1,
              "hostname_mismatch" : 2,
              "other" : 1
            }
          },
          "max_conns" : 20,
          "requests" : 667231,
          "header_time" : 20,
          "response_time" : 36,
          "responses" : {
            "1xx" : 0,
            "2xx" : 666310,
            "3xx" : 0,
            "4xx" : 915,
            "5xx" : 6,
            "codes" : {
              "200" : 666310,
              "404" : 915,
              "503" : 6
            },
            "total" : 667231
          },
          "sent" : 251946292,
          "received" : 19222475454,
          "fails" : 0,
          "unavail" : 0,
          "health_checks" : {
            "checks" : 26214,
            "fails" : 0,
            "unhealthy" : 0,
            "last_passed" : true
          },
          "downtime" : 0,
          "downstart" : "2022-06-28T11:09:21.602Z",
          "selected" : "2022-06-28T15:01:25.000Z"
        },
        {
          "id" : 1,
          "server" : "10.0.0.1:8089",
          "name" : "10.0.0.1:8089",
          "backup" : true,
          "weight" : 1,
          "state" : "unhealthy",
          "active" : 0,
          "max_conns" : 20,
          "requests" : 0,
          "responses" : {
            "1xx" : 0,
            "2xx" : 0,
            "3xx" : 0,
            "4xx" : 0,
            "5xx" : 0,
            "codes" : {
            },
            "total" : 0
          },
          "sent" : 0,
          "received" : 0,
          "fails" : 0,
          "unavail" : 0,
          "health_checks" : {
            "checks" : 26284,
            "fails" : 26284,
            "unhealthy" : 1,
            "last_passed" : false
          },
          "downtime" : 262925617,
          "downstart" : "2022-06-28T11:09:21.602Z",
          "selected" : "2022-06-28T15:01:25.000Z"
        }
      ],
      "keepalive" : 0,
      "zombies" : 0,
      "zone" : "upstream_backend"
    }
  }
  ```

  ### HTTP Upstream Server

  Dynamically configurable parameters of an HTTP upstream server:

  - `id` (`integer`)

    The ID of the HTTP upstream server. The ID is assigned automatically and cannot be changed.

  - `server` (`string`)

    Same as the [address]({{< ref "ng/mod_ref/ngx_http_upstream_module#server">}}) parameter of the HTTP upstream server. When adding a server, it is possible to specify it as a domain name. In this case, changes of the IP addresses that correspond to a domain name will be monitored and automatically applied to the upstream configuration without the need of restarting nginx. This requires the [resolver]({{< ref "ng/mod_ref/ngx_http_core_module#resolver">}}) directive in the “`http`” block. See also the [resolve]({{< ref "ng/mod_ref/ngx_http_upstream_module#resolve">}}) parameter of the HTTP upstream server.

  - `service` (`string`)

    Same as the [service]({{< ref "ng/mod_ref/ngx_http_upstream_module#service">}}) parameter of the HTTP upstream server. This parameter cannot be changed.

  - `weight` (`integer`)

    Same as the [weight]({{< ref "ng/mod_ref/ngx_http_upstream_module#weight">}}) parameter of the HTTP upstream server.

  - `max_conns` (`integer`)

    Same as the [max_conns]({{< ref "ng/mod_ref/ngx_http_upstream_module#max_conns">}}) parameter of the HTTP upstream server.

  - `max_fails` (`integer`)

    Same as the [max_fails]({{< ref "ng/mod_ref/ngx_http_upstream_module#max_fails">}}) parameter of the HTTP upstream server.

  - `fail_timeout` (`string`)

    Same as the [fail_timeout]({{< ref "ng/mod_ref/ngx_http_upstream_module#fail_timeout">}}) parameter of the HTTP upstream server.

  - `slow_start` (`string`)

    Same as the [slow_start]({{< ref "ng/mod_ref/ngx_http_upstream_module#slow_start">}}) parameter of the HTTP upstream server.

  - `route` (`string`)

    Same as the [route]({{< ref "ng/mod_ref/ngx_http_upstream_module#route">}}) parameter of the HTTP upstream server.

  - `backup` (`boolean`)

    When `true`, adds a [backup]({{< ref "ng/mod_ref/ngx_http_upstream_module#backup">}}) server. This parameter cannot be changed.

  - `down` (`boolean`)

    Same as the [down]({{< ref "ng/mod_ref/ngx_http_upstream_module#down">}}) parameter of the HTTP upstream server.

  - `drain` (`boolean`)

    Same as the [drain]({{< ref "ng/mod_ref/ngx_http_upstream_module#drain">}}) parameter of the HTTP upstream server.

  - `parent` (`string`)

    Parent server ID of the resolved server. The ID is assigned automatically and cannot be changed.

  - `host` (`string`)

    Hostname of the resolved server. The hostname is assigned automatically and cannot be changed.

  Example:

  ```
  {
    "id" : 1,
    "server" : "10.0.0.1:8089",
    "weight" : 4,
    "max_conns" : 0,
    "max_fails" : 0,
    "fail_timeout" : "10s",
    "slow_start" : "10s",
    "route" : "",
    "backup" : true,
    "down" : true
  }
  ```

  ### HTTP Keyval Shared Memory Zone

  Contents of an HTTP keyval shared memory zone when using the GET method.

  Example:

  ```
  {
    "key1" : "value1",
    "key2" : "value2",
    "key3" : "value3"
  }
  ```

  ### HTTP Keyval Shared Memory Zone

  Contents of an HTTP keyval shared memory zone when using the POST or PATCH methods.

  Example:

  ```
  {
    "key1" : "value1",
    "key2" : "value2",
    "key3" : {
      "value" : "value3",
      "expire" : 30000
    }
  }
  ```

  ### Stream Server Zone

  - `processing` (`integer`)

    The number of client connections that are currently being processed.

  - `connections` (`integer`)

    The total number of connections accepted from clients.

  - `sessions`

    The total number of completed sessions, and the number of sessions completed with status codes “`2xx`”, “`4xx`”, or “`5xx`”.`2xx` (`integer`)The total number of sessions completed with [status codes](https://nginx.org/en/docs/stream/ngx_stream_core_module.html#var_status) “`2xx`”.`4xx` (`integer`)The total number of sessions completed with [status codes](https://nginx.org/en/docs/stream/ngx_stream_core_module.html#var_status) “`4xx`”.`5xx` (`integer`)The total number of sessions completed with [status codes](https://nginx.org/en/docs/stream/ngx_stream_core_module.html#var_status) “`5xx`”.`total` (`integer`)The total number of completed client sessions.

  - `discarded` (`integer`)

    The total number of connections completed without creating a session.

  - `received` (`integer`)

    The total number of bytes received from clients.

  - `sent` (`integer`)

    The total number of bytes sent to clients.

  - `ssl`

    `handshakes` (`integer`)The total number of successful SSL handshakes.`handshakes_failed` (`integer`)The total number of failed SSL handshakes.`session_reuses` (`integer`)The total number of session reuses during SSL handshake.`no_common_protocol` (`integer`)The number of SSL handshakes failed because of no common protocol.`no_common_cipher` (`integer`)The number of SSL handshakes failed because of no shared cipher.`handshake_timeout` (`integer`)The number of SSL handshakes failed because of a timeout.`peer_rejected_cert` (`integer`)The number of failed SSL handshakes when nginx presented the certificate to the client but it was rejected with a corresponding alert message.`verify_failures`SSL certificate verification errors`no_cert` (`integer`)A client did not provide the required certificate.`expired_cert` (`integer`)An expired or not yet valid certificate was presented by a client.`revoked_cert` (`integer`)A revoked certificate was presented by a client.`other` (`integer`)Other SSL certificate verification errors.

  Example:

  ```
  {
    "dns" : {
      "processing" : 1,
      "connections" : 155569,
      "sessions" : {
        "2xx" : 155564,
        "4xx" : 0,
        "5xx" : 0,
        "total" : 155569
      },
      "discarded" : 0,
      "received" : 4200363,
      "sent" : 20489184,
      "ssl" : {
        "handshakes" : 76455,
        "handshakes_failed" : 432,
        "session_reuses" : 28770,
        "no_common_protocol" : 4,
        "no_common_cipher" : 2,
        "handshake_timeout" : 0,
        "peer_rejected_cert" : 0,
        "verify_failures" : {
          "no_cert" : 0,
          "expired_cert" : 2,
          "revoked_cert" : 1,
          "other" : 1
        }
      }
    }
  }
  ```

  ### Stream Connections Limiting

  - `passed` (`integer`)

    The total number of connections that were neither limited nor accounted as limited.

  - `rejected` (`integer`)

    The total number of connections that were rejected.

  - `rejected_dry_run` (`integer`)

    The total number of connections accounted as rejected in the [dry run](https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html#limit_conn_dry_run) mode.

  Example:

  ```
  {
    "passed" : 15,
    "rejected" : 0,
    "rejected_dry_run" : 2
  }
  ```

  ### Stream Upstream

  - `peers`

    An array of:`id` (`integer`)The ID of the server.`server` (`string`)An [address](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#server) of the server.`service` (`string`)The [service](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#service) parameter value of the [server](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#server) directive.`name` (`string`)The name of the server specified in the [server](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#server) directive.`backup` (`boolean`)A boolean value indicating whether the server is a [backup](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#backup) server.`weight` (`integer`)[Weight](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#weight) of the server.`state` (`string`)Current state, which may be one of “`up`”, “`down`”, “`unavail`”, “`checking`”, or “`unhealthy`”.`active` (`integer`)The current number of connections.

    `ssl`

    `handshakes` (`integer`)The total number of successful SSL handshakes.`handshakes_failed` (`integer`)The total number of failed SSL handshakes.`session_reuses` (`integer`)The total number of session reuses during SSL handshake.`no_common_protocol` (`integer`)The number of SSL handshakes failed because of no common protocol.`handshake_timeout` (`integer`)The number of SSL handshakes failed because of a timeout.`peer_rejected_cert` (`integer`)The number of failed SSL handshakes when nginx presented the certificate to the upstream server but it was rejected with a corresponding alert message.`verify_failures`SSL certificate verification errors`expired_cert` (`integer`)An expired or not yet valid certificate was presented by an upstream server.`revoked_cert` (`integer`)A revoked certificate was presented by an upstream server.`hostname_mismatch` (`integer`)Server's certificate doesn't match the hostname.`other` (`integer`)Other SSL certificate verification errors.`max_conns` (`integer`)The [max_conns](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#max_conns) limit for the server.`connections` (`integer`)The total number of client connections forwarded to this server.`connect_time` (`integer`)The average time to connect to the upstream server.`first_byte_time` (`integer`)The average time to receive the first byte of data.`response_time` (`integer`)The average time to receive the last byte of data.`sent` (`integer`)The total number of bytes sent to this server.`received` (`integer`)The total number of bytes received from this server.`fails` (`integer`)The total number of unsuccessful attempts to communicate with the server.`unavail` (`integer`)How many times the server became unavailable for client connections (state “`unavail`”) due to the number of unsuccessful attempts reaching the [max_fails](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#max_fails) threshold.`health_checks` `checks` (`integer`)The total number of [health check](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#health_check) requests made.`fails` (`integer`)The number of failed health checks.`unhealthy` (`integer`)How many times the server became unhealthy (state “`unhealthy`”).`last_passed` (`boolean`)Boolean indicating whether the last health check request was successful and passed [tests](https://nginx.org/en/docs/stream/ngx_stream_upstream_hc_module.html#match).`downtime` (`integer`)Total time the server was in the “`unavail`”, “`checking`”, and “`unhealthy`” states.`downstart` (`string`)The time when the server became “`unavail`”, “`checking`”, or “`unhealthy`”, in the ISO 8601 format with millisecond resolution.`selected` (`string`)The time when the server was last selected to process a connection, in the ISO 8601 format with millisecond resolution.

  - `zombies` (`integer`)

    The current number of servers removed from the group but still processing active client connections.

  - `zone` (`string`)

    The name of the shared memory [zone](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#zone) that keeps the group’s configuration and run-time state.

  Example:

  ```
  {
    "dns" : {
      "peers" : [
        {
          "id" : 0,
          "server" : "10.0.0.1:12347",
          "name" : "10.0.0.1:12347",
          "backup" : false,
          "weight" : 5,
          "state" : "up",
          "active" : 0,
          "ssl" : {
            "handshakes" : 200,
            "handshakes_failed" : 4,
            "session_reuses" : 189,
            "no_common_protocol" : 4,
            "handshake_timeout" : 0,
            "peer_rejected_cert" : 0,
            "verify_failures" : {
              "expired_cert" : 2,
              "revoked_cert" : 1,
              "hostname_mismatch" : 2,
              "other" : 1
            }
          },
          "max_conns" : 50,
          "connections" : 667231,
          "sent" : 251946292,
          "received" : 19222475454,
          "fails" : 0,
          "unavail" : 0,
          "health_checks" : {
            "checks" : 26214,
            "fails" : 0,
            "unhealthy" : 0,
            "last_passed" : true
          },
          "downtime" : 0,
          "downstart" : "2022-06-28T11:09:21.602Z",
          "selected" : "2022-06-28T15:01:25.000Z"
        },
        {
          "id" : 1,
          "server" : "10.0.0.1:12348",
          "name" : "10.0.0.1:12348",
          "backup" : true,
          "weight" : 1,
          "state" : "unhealthy",
          "active" : 0,
          "max_conns" : 50,
          "connections" : 0,
          "sent" : 0,
          "received" : 0,
          "fails" : 0,
          "unavail" : 0,
          "health_checks" : {
            "checks" : 26284,
            "fails" : 26284,
            "unhealthy" : 1,
            "last_passed" : false
          },
          "downtime" : 262925617,
          "downstart" : "2022-06-28T11:09:21.602Z",
          "selected" : "2022-06-28T15:01:25.000Z"
        }
      ],
      "zombies" : 0,
      "zone" : "dns"
    }
  }
  ```

  ### Stream Upstream Server

  Dynamically configurable parameters of a stream upstream server:

  - `id` (`integer`)

    The ID of the stream upstream server. The ID is assigned automatically and cannot be changed.

  - `server` (`string`)

    Same as the [address](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#server) parameter of the stream upstream server. When adding a server, it is possible to specify it as a domain name. In this case, changes of the IP addresses that correspond to a domain name will be monitored and automatically applied to the upstream configuration without the need of restarting nginx. This requires the [resolver](https://nginx.org/en/docs/stream/ngx_stream_core_module.html#resolver) directive in the “`stream`” block. See also the [resolve](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#resolve) parameter of the stream upstream server.

  - `service` (`string`)

    Same as the [service](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#service) parameter of the stream upstream server. This parameter cannot be changed.

  - `weight` (`integer`)

    Same as the [weight](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#weight) parameter of the stream upstream server.

  - `max_conns` (`integer`)

    Same as the [max_conns](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#max_conns) parameter of the stream upstream server.

  - `max_fails` (`integer`)

    Same as the [max_fails](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#max_fails) parameter of the stream upstream server.

  - `fail_timeout` (`string`)

    Same as the [fail_timeout](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#fail_timeout) parameter of the stream upstream server.

  - `slow_start` (`string`)

    Same as the [slow_start](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#slow_start) parameter of the stream upstream server.

  - `backup` (`boolean`)

    When `true`, adds a [backup](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#backup) server. This parameter cannot be changed.

  - `down` (`boolean`)

    Same as the [down](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#down) parameter of the stream upstream server.

  - `parent` (`string`)

    Parent server ID of the resolved server. The ID is assigned automatically and cannot be changed.

  - `host` (`string`)

    Hostname of the resolved server. The hostname is assigned automatically and cannot be changed.

  Example:

  ```
  {
    "id" : 0,
    "server" : "10.0.0.1:12348",
    "weight" : 1,
    "max_conns" : 0,
    "max_fails" : 1,
    "fail_timeout" : "10s",
    "slow_start" : 0,
    "backup" : false,
    "down" : false
  }
  ```

  ### Stream Keyval Shared Memory Zone

  Contents of a stream keyval shared memory zone when using the GET method.

  Example:

  ```
  {
    "key1" : "value1",
    "key2" : "value2",
    "key3" : "value3"
  }
  ```

  ### Stream Keyval Shared Memory Zone

  Contents of a stream keyval shared memory zone when using the POST or PATCH methods.

  Example:

  ```
  {
    "key1" : "value1",
    "key2" : "value2",
    "key3" : {
      "value" : "value3",
      "expire" : 30000
    }
  }
  ```

  ### Stream Zone Sync Node

  - `zones`

    Synchronization information per each shared memory zone.A collection of "[Sync Zone]({{< ref "ng/mod_ref/ngx_http_api_module#def_nginx_stream_zone_sync_zone">}})" objects

  - `status`

    Synchronization information per node in a cluster.
    
    - `bytes_in` (`integer`)
    
      The number of bytes received by this node.
    
    - `msgs_in` (`integer`)
    
      The number of messages received by this node.
    
    - `msgs_out` (`integer`)
    
      The number of messages sent by this node.
    
    - `bytes_out` (`integer`)
    
      The number of bytes sent by this node.
    
    - `nodes_online` (`integer`)
    
      The number of peers this node is connected to.

  Example:

  ```
  {
    "zones" : {
      "zone1" : {
        "records_pending" : 2061,
        "records_total" : 260575
      },
      "zone2" : {
        "records_pending" : 0,
        "records_total" : 14749
      }
    },
    "status" : {
      "bytes_in" : 1364923761,
      "msgs_in" : 337236,
      "msgs_out" : 346717,
      "bytes_out" : 1402765472,
      "nodes_online" : 15
    }
  }
  ```

  ### Sync Zone

  Synchronization status of a shared memory zone.

  - `records_pending` (`integer`)

    The number of records that need to be sent to the cluster.

  - `records_total` (`integer`)

    The total number of records stored in the shared memory zone.

  ### Resolver Zone

  Statistics of DNS requests and responses per particular resolver zone.

  - `requests`

    - `name` (`integer`)

      The total number of requests to resolve names to addresses.

    - `srv` (`integer`)

      The total number of requests to resolve SRV records.

    - `addr` (`integer`)

      The total number of requests to resolve addresses to names.

  - `responses`

    - `noerror` (`integer`)
    
      The total number of successful responses.
    
    - `formerr` (`integer`)
    
      The total number of FORMERR (`Format error`) responses.
    
    - `servfail` (`integer`)
    
      The total number of SERVFAIL (`Server failure`) responses.
    
    - `nxdomain` (`integer`)
    
      The total number of NXDOMAIN (`Host not found`) responses.
    
    - `notimp` (`integer`)
    
      The total number of NOTIMP (`Unimplemented`) responses.
    
    - `refused` (`integer`)
    
      The total number of REFUSED (`Operation refused`) responses.
    
    - `timedout` (`integer`)
    
      The total number of timed out requests.
    
    - `unknown` (`integer`)
    
      The total number of requests completed with an unknown error.

  Example:

  ```
  {
    "resolver_zone1" : {
      "requests" : {
        "name" : 25460,
        "srv" : 130,
        "addr" : 2580
      },
      "responses" : {
        "noerror" : 26499,
        "formerr" : 0,
        "servfail" : 3,
        "nxdomain" : 0,
        "notimp" : 0,
        "refused" : 0,
        "timedout" : 243,
        "unknown" : 478
      }
    }
  }
  ```

  ### Error

  nginx error object.

  - `error`

    - `status` (`integer`)

      HTTP error code.

    - `text` (`string`)

      Error description.

    - `code` (`string`)

      Internal nginx error code.

  - `request_id` (`string`)

    The ID of the request, equals the value of the [$request_id]({{< ref "ng/mod_ref/ngx_http_core_module#var_request_id">}}) variable.

  - `href` (`string`)

    Link to reference documentation.