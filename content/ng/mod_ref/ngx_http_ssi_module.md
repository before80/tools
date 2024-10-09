+++
title = "ngx_http_ssi_module"
date = 2023-08-15T08:19:00+08:00
weight = 480
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# Module ngx_http_ssi_module

https://nginx.org/en/docs/http/ngx_http_ssi_module.html



The `ngx_http_ssi_module` module is a filter that processes SSI (Server Side Includes) commands in responses passing through it. Currently, the list of supported SSI commands is incomplete.



## Example Configuration



```
location / {
    ssi on;
    ...
}
```





## Directives



### ssi

  Syntax:  `ssi on | off;`

  Default: `ssi off;`

  Context: `http`, `server`, `location`, `if in location`


Enables or disables processing of SSI commands in responses.



### ssi_last_modified

  Syntax:`ssi_last_modified on | off;`

  Default: `ssi_last_modified off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.5.1.

Allows preserving the “Last-Modified” header field from the original response during SSI processing to facilitate response caching.

By default, the header field is removed as contents of the response are modified during processing and may contain dynamically generated elements or parts that are changed independently of the original response.



### ssi_min_file_chunk

  Syntax:  `ssi_min_file_chunk size;`

  Default: `ssi_min_file_chunk 1k;`

  Context: `http`, `server`, `location`


Sets the minimum `size` for parts of a response stored on disk, starting from which it makes sense to send them using [sendfile]({{< ref "ng/mod_ref/ngx_http_core_module#sendfile">}}).



### ssi_silent_errors

  Syntax:`ssi_silent_errors on | off;`

  Default: `ssi_silent_errors off;`

  Context: `http`, `server`, `location`


If enabled, suppresses the output of the “`[an error occurred while processing the directive]`” string if an error occurred during SSI processing.



### ssi_types

  Syntax:  `ssi_types mime-type ...;`

  Default: `ssi_types text/html;`

  Context: `http`, `server`, `location`


Enables processing of SSI commands in responses with the specified MIME types in addition to “`text/html`”. The special value “`*`” matches any MIME type (0.8.29).



### ssi_value_length

  Syntax:  `ssi_value_length length;`

  Default: `ssi_value_length 256;`

  Context: `http`, `server`, `location`


Sets the maximum length of parameter values in SSI commands.



## SSI Commands

SSI commands have the following generic format:

```
<!--# command parameter1=value1 parameter2=value2 ... -->
```



The following commands are supported:

- `block`

  Defines a block that can be used as a stub in the `include` command. The block can contain other SSI commands. The command has the following parameter:`name`block name.Example:`<!--# block name="one" --> stub <!--# endblock --> `

- `config`

  Sets some parameters used during SSI processing, namely:`errmsg`a string that is output if an error occurs during SSI processing. By default, the following string is output:`[an error occurred while processing the directive] ` `timefmt`a format string passed to the `strftime()` function used to output date and time. By default, the following format is used:`"%A, %d-%b-%Y %H:%M:%S %Z" `The “`%s`” format is suitable to output time in seconds.

- `echo`

  Outputs the value of a variable. The command has the following parameters:`var`the variable name.`encoding`the encoding method. Possible values include `none`, `url`, and `entity`. By default, `entity` is used.`default`a non-standard parameter that sets a string to be output if a variable is undefined. By default, “`(none)`” is output. The command`<!--# echo var="name" default="no" --> `replaces the following sequence of commands:`<!--# if expr="$name" --><!--# echo var="name" --><!--#       else -->no<!--# endif --> `

- `if`

  Performs a conditional inclusion. The following commands are supported:`<!--# if expr="..." --> ... <!--# elif expr="..." --> ... <!--# else --> ... <!--# endif --> `Only one level of nesting is currently supported. The command has the following parameter:`expr`expression. An expression can be:variable existence check:`<!--# if expr="$name" --> `comparison of a variable with a text:`<!--# if expr="$name = text" --> <!--# if expr="$name != text" --> `comparison of a variable with a regular expression:`<!--# if expr="$name = /text/" --> <!--# if expr="$name != /text/" --> `If a `text` contains variables, their values are substituted. A regular expression can contain positional and named captures that can later be used through variables, for example:`<!--# if expr="$name = /(.+)@(?P<domain>.+)/" -->    <!--# echo var="1" -->    <!--# echo var="domain" --> <!--# endif --> `

- `include`

  Includes the result of another request into a response. The command has the following parameters:`file`specifies an included file, for example:`<!--# include file="footer.html" --> ` `virtual`specifies an included request, for example:`<!--# include virtual="/remote/body.php?argument=value" --> `Several requests specified on one page and processed by proxied or FastCGI/uwsgi/SCGI/gRPC servers run in parallel. If sequential processing is desired, the `wait` parameter should be used.`stub`a non-standard parameter that names the block whose content will be output if the included request results in an empty body or if an error occurs during the request processing, for example:`<!--# block name="one" --> <!--# endblock --> <!--# include virtual="/remote/body.php?argument=value" stub="one" --> `The replacement block content is processed in the included request context.`wait`a non-standard parameter that instructs to wait for a request to fully complete before continuing with SSI processing, for example:`<!--# include virtual="/remote/body.php?argument=value" wait="yes" --> ` `set`a non-standard parameter that instructs to write a successful result of request processing to the specified variable, for example:`<!--# include virtual="/remote/body.php?argument=value" set="one" --> `The maximum size of the response is set by the [subrequest_output_buffer_size]({{< ref "ng/mod_ref/ngx_http_core_module#subrequest_output_buffer_size">}}) directive (1.13.10):`location /remote/ {    subrequest_output_buffer_size 64k;    ... } `Prior to version 1.13.10, only the results of responses obtained using the [ngx_http_proxy_module](../ngx_http_proxy_module), [ngx_http_memcached_module](../ngx_http_memcached_module), [ngx_http_fastcgi_module](../ngx_http_fastcgi_module) (1.5.6), [ngx_http_uwsgi_module](../ngx_http_uwsgi_module) (1.5.6), and [ngx_http_scgi_module](../ngx_http_scgi_module) (1.5.6) modules could be written into variables. The maximum size of the response was set with the [proxy_buffer_size]({{< ref "ng/mod_ref/ngx_http_proxy_module#proxy_buffer_size">}}), [memcached_buffer_size]({{< ref "ng/mod_ref/ngx_http_memcached_module#memcached_buffer_size">}}), [fastcgi_buffer_size]({{< ref "ng/mod_ref/ngx_http_fastcgi_module#fastcgi_buffer_size">}}), [uwsgi_buffer_size]({{< ref "ng/mod_ref/ngx_http_uwsgi_module#uwsgi_buffer_size">}}), and [scgi_buffer_size]({{< ref "ng/mod_ref/ngx_http_scgi_module#scgi_buffer_size">}}) directives.

- `set`

  Sets a value of a variable. The command has the following parameters:`var`the variable name.`value`the variable value. If an assigned value contains variables, their values are substituted.





## Embedded Variables

The `ngx_http_ssi_module` module supports two embedded variables:

- `$date_local`

  current time in the local time zone. The format is set by the `config` command with the `timefmt` parameter.

- `$date_gmt`

  current time in GMT. The format is set by the `config` command with the `timefmt` parameter.