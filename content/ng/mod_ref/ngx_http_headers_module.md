+++
title = "ngx_http_headers_module"
date = 2023-08-15T08:14:54+08:00
weight = 220
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

## Module ngx_http_headers_module

https://nginx.org/en/docs/http/ngx_http_headers_module.html



The `ngx_http_headers_module` module allows adding the “Expires” and “Cache-Control” header fields, and arbitrary fields, to a response header.



## Example Configuration



```
expires    24h;
expires    modified +24h;
expires    @24h;
expires    0;
expires    -1;
expires    epoch;
expires    $expires;
add_header Cache-Control private;
```





## Directives



### add_header

  Syntax:  `add_header name value [always];`

  Default: —

  Context: `http`, `server`, `location`, `if in location`


Adds the specified field to a response header provided that the response code equals 200, 201 (1.3.10), 204, 206, 301, 302, 303, 304, 307 (1.1.16, 1.0.13), or 308 (1.13.0). Parameter value can contain variables.

There could be several `add_header` directives. These directives are inherited from the previous configuration level if and only if there are no `add_header` directives defined on the current level.

If the `always` parameter is specified (1.7.5), the header field will be added regardless of the response code.



### add_trailer

  Syntax:  `add_trailer name value [always];`

  Default: —

  Context: `http`, `server`, `location`, `if in location`


This directive appeared in version 1.13.2.

Adds the specified field to the end of a response provided that the response code equals 200, 201, 206, 301, 302, 303, 307, or 308. Parameter value can contain variables.

There could be several `add_trailer` directives. These directives are inherited from the previous configuration level if and only if there are no `add_trailer` directives defined on the current level.

If the `always` parameter is specified the specified field will be added regardless of the response code.



### expires

  Syntax:`expires [modified] time;` `expires epoch | max | off;`

  Default: `expires off;`

  Context: `http`, `server`, `location`, `if in location`


Enables or disables adding or modifying the “Expires” and “Cache-Control” response header fields provided that the response code equals 200, 201 (1.3.10), 204, 206, 301, 302, 303, 304, 307 (1.1.16, 1.0.13), or 308 (1.13.0). The parameter can be a positive or negative [time](https://nginx.org/en/docs/syntax.html).

The time in the “Expires” field is computed as a sum of the current time and `time` specified in the directive. If the `modified` parameter is used (0.7.0, 0.6.32) then the time is computed as a sum of the file’s modification time and the `time` specified in the directive.

In addition, it is possible to specify a time of day using the “`@`” prefix (0.7.9, 0.6.34):

```
expires @15h30m;
```



The contents of the “Cache-Control” field depends on the sign of the specified time:

- time is negative — “Cache-Control: no-cache”.
- time is positive or zero — “Cache-Control: max-age=`t`”, where `t` is a time specified in the directive, in seconds.



The `epoch` parameter sets “Expires” to the value “`Thu, 01 Jan 1970 00:00:01 GMT`”, and “Cache-Control” to “`no-cache`”.

The `max` parameter sets “Expires” to the value “`Thu, 31 Dec 2037 23:55:55 GMT`”, and “Cache-Control” to 10 years.

The `off` parameter disables adding or modifying the “Expires” and “Cache-Control” response header fields.

The last parameter value can contain variables (1.7.9):

```
map $sent_http_content_type $expires {
    default         off;
    application/pdf 42d;
    ~image/         max;
}

expires $expires;
```