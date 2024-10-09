+++
title = "ngx_http_gzip_static_module"
date = 2023-08-15T08:14:46+08:00
weight = 210
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_gzip_static_module

https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html



The `ngx_http_gzip_static_module` module allows sending precompressed files with the “`.gz`” filename extension instead of regular files.

This module is not built by default, it should be enabled with the `--with-http_gzip_static_module` configuration parameter.



## Example Configuration



```
gzip_static  on;
gzip_proxied expired no-cache no-store private auth;
```





## Directives



### gzip_static

  Syntax:`gzip_static on | off | always;`

  Default: `gzip_static off;`

  Context: `http`, `server`, `location`


Enables (“`on`”) or disables (“`off`”) checking the existence of precompressed files. The following directives are also taken into account: [gzip_http_version]({{< ref "ng/mod_ref/ngx_http_gzip_module#gzip_http_version">}}), [gzip_proxied]({{< ref "ng/mod_ref/ngx_http_gzip_module#gzip_proxied">}}), [gzip_disable]({{< ref "ng/mod_ref/ngx_http_gzip_module#gzip_disable">}}), and [gzip_vary]({{< ref "ng/mod_ref/ngx_http_gzip_module#gzip_vary">}}).

With the “`always`” value (1.3.6), gzipped file is used in all cases, without checking if the client supports it. It is useful if there are no uncompressed files on the disk anyway or the [ngx_http_gunzip_module](../ngx_http_gunzip_module) is used.

The files can be compressed using the `gzip` command, or any other compatible one. It is recommended that the modification date and time of original and compressed files be the same.