+++
title = "ngx_stream_keyval_module"
date = 2023-08-15T08:22:48+08:00
weight = 750
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_stream_keyval_module

https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html



The `ngx_stream_keyval_module` module (1.13.7) creates variables with values taken from key-value pairs managed by the [API]({{< ref "ng/mod_ref/ngx_http_api_module#stream_keyvals_">}}) or a variable that can also be set with [njs](https://github.com/nginx/njs-examples/).



This module is available as part of our [commercial subscription](http://nginx.com/products/).





## Example Configuration



```
http {

    server {
        ...
        location /api {
            api write=on;
        }
    }
}

stream {

    keyval_zone zone=one:32k state=/var/lib/nginx/state/one.keyval;
    keyval      $ssl_server_name $name zone=one;

    server {
        listen              12345 ssl;
        proxy_pass          $name;
        ssl_certificate     /usr/local/nginx/conf/cert.pem;
        ssl_certificate_key /usr/local/nginx/conf/cert.key;
    }
}
```





## Directives



### keyval

  Syntax:`keyval key $variable zone=name;`

  Default: —

  Context: `stream`


Creates a new `$variable` whose value is looked up by the `key` in the key-value database. Matching rules are defined by the [`type`](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_type) parameter of the [`keyval_zone`](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval_zone) directive. The database is stored in a shared memory zone specified by the `zone` parameter.



### keyval_zone

  Syntax:`keyval_zone zone=name:size [state=file] [timeout=time] [type=string|ip|prefix] [sync];`

  Default: —

  Context: `stream`


Sets the `name` and `size` of the shared memory zone that keeps the key-value database. Key-value pairs are managed by the [API]({{< ref "ng/mod_ref/ngx_http_api_module#stream_keyvals_">}}).



The optional `state` parameter specifies a `file` that keeps the current state of the key-value database in the JSON format and makes it persistent across nginx restarts. Changing the file content directly should be avoided.

Examples:

```
keyval_zone zone=one:32k state=/var/lib/nginx/state/one.keyval; # path for Linux
keyval_zone zone=one:32k state=/var/db/nginx/state/one.keyval;  # path for FreeBSD
```





The optional `timeout` parameter (1.15.0) sets the time after which key-value pairs are removed from the zone.



The optional `type` parameter (1.17.1) activates an extra index optimized for matching the key of a certain type and defines matching rules when evaluating a [keyval](https://nginx.org/en/docs/stream/ngx_stream_keyval_module.html#keyval) `$variable`.

The index is stored in the same shared memory zone and thus requires additional storage.



- `type=string`

  default, no index is enabled; variable lookup is performed using exact match of the record key and a search key

- `type=ip`

  the search key is the textual representation of IPv4 or IPv6 address or CIDR range; to match a record key, the search key must belong to a subnet specified by a record key or exactly match an IP address

- `type=prefix`

  variable lookup is performed using prefix match of a record key and a search key (1.17.5); to match a record key, the record key must be a prefix of the search key





The optional `sync` parameter (1.15.0) enables [synchronization](https://nginx.org/en/docs/stream/ngx_stream_zone_sync_module.html#zone_sync) of the shared memory zone. The synchronization requires the `timeout` parameter to be set.

If the synchronization is enabled, removal of key-value pairs (no matter [one]({{< ref "ng/mod_ref/ngx_http_api_module#patchStreamKeyvalZoneKeyValue">}}) or [all]({{< ref "ng/mod_ref/ngx_http_api_module#deleteStreamKeyvalZoneData">}})) will be performed only on a target cluster node. The same key-value pairs on other cluster nodes will be removed upon `timeout`.