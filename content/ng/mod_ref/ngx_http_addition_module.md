+++
title = "ngx_http_addition_module"
date = 2023-08-15T08:11:45+08:00
weight = 30
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## Module ngx_http_addition_module

https://nginx.org/en/docs/http/ngx_http_addition_module.html



The `ngx_http_addition_module` module is a filter that adds text before and after a response. This module is not built by default, it should be enabled with the `--with-http_addition_module` configuration parameter.



## Example Configuration



```
location / {
    add_before_body /before_action;
    add_after_body  /after_action;
}
```





## Directives



### add_before_body

  Syntax:  `add_before_body uri;`

  Default: —

  Context: `http`, `server`, `location`


Adds the text returned as a result of processing a given subrequest before the response body. An empty string (`""`) as a parameter cancels addition inherited from the previous configuration level.



### add_after_body

  Syntax:  `add_after_body uri;`

  Default: —

  Context: `http`, `server`, `location`


Adds the text returned as a result of processing a given subrequest after the response body. An empty string (`""`) as a parameter cancels addition inherited from the previous configuration level.



### addition_types

  Syntax:`addition_types mime-type ...;`

  Default: `addition_types text/html;`

  Context: `http`, `server`, `location`


This directive appeared in version 0.7.9.

Allows adding text in responses with the specified MIME types, in addition to “`text/html`”. The special value “*” matches any MIME type (0.8.29).