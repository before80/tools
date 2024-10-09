+++
title = "ngx_http_rewrite_module"
date = 2023-08-15T08:18:07+08:00
weight = 420
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_rewrite_module

https://nginx.org/en/docs/http/ngx_http_rewrite_module.html



The `ngx_http_rewrite_module` module is used to change request URI using PCRE regular expressions, return redirects, and conditionally select configurations.

The [break]({{< ref "ng/mod_ref/ngx_http_rewrite_module#break">}}), [if]({{< ref "ng/mod_ref/ngx_http_rewrite_module#if">}}), [return]({{< ref "ng/mod_ref/ngx_http_rewrite_module#return">}}), [rewrite]({{< ref "ng/mod_ref/ngx_http_rewrite_module#rewrite">}}), and [set]({{< ref "ng/mod_ref/ngx_http_rewrite_module#set">}}) directives are processed in the following order:

- the directives of this module specified on the [server]({{< ref "ng/mod_ref/ngx_http_core_module#server">}}) level are executed sequentially;
- repeatedly:
  - a [location]({{< ref "ng/mod_ref/ngx_http_core_module#location">}}) is searched based on a request URI;
  - the directives of this module specified inside the found location are executed sequentially;
  - the loop is repeated if a request URI was [rewritten]({{< ref "ng/mod_ref/ngx_http_rewrite_module#rewrite">}}), but not more than [10 times]({{< ref "ng/mod_ref/ngx_http_core_module#internal">}}).





## Directives



### break

  Syntax:  `break;`

  Default: —

  Context: `server`, `location`, `if`


Stops processing the current set of `ngx_http_rewrite_module` directives.

If a directive is specified inside the [location]({{< ref "ng/mod_ref/ngx_http_core_module#location">}}), further processing of the request continues in this location.

Example:

```
if ($slow) {
    limit_rate 10k;
    break;
}
```





### if

  Syntax:`if (condition) { ... }`

  Default: —

  Context: `server`, `location`


The specified `condition` is evaluated. If true, this module directives specified inside the braces are executed, and the request is assigned the configuration inside the `if` directive. Configurations inside the `if` directives are inherited from the previous configuration level.

A condition may be any of the following:

- a variable name; false if the value of a variable is an empty string or “0”;

  Before version 1.0.1, any string starting with “`0`” was considered a false value.

- comparison of a variable with a string using the “`=`” and “`!=`” operators;

- matching of a variable against a regular expression using the “`~`” (for case-sensitive matching) and “`~*`” (for case-insensitive matching) operators. Regular expressions can contain captures that are made available for later reuse in the `$1`..`$9` variables. Negative operators “`!~`” and “`!~*`” are also available. If a regular expression includes the “`}`” or “`;`” characters, the whole expressions should be enclosed in single or double quotes.

- checking of a file existence with the “`-f`” and “`!-f`” operators;

- checking of a directory existence with the “`-d`” and “`!-d`” operators;

- checking of a file, directory, or symbolic link existence with the “`-e`” and “`!-e`” operators;

- checking for an executable file with the “`-x`” and “`!-x`” operators.



Examples:

```
if ($http_user_agent ~ MSIE) {
    rewrite ^(.*)$ /msie/$1 break;
}

if ($http_cookie ~* "id=([^;]+)(?:;|$)") {
    set $id $1;
}

if ($request_method = POST) {
    return 405;
}

if ($slow) {
    limit_rate 10k;
}

if ($invalid_referer) {
    return 403;
}
```



A value of the `$invalid_referer` embedded variable is set by the [valid_referers]({{< ref "ng/mod_ref/ngx_http_referer_module#valid_referers">}}) directive.





### return

  Syntax:`return code [text];` `return code URL;` `return URL;`

  Default: —

  Context: `server`, `location`, `if`


Stops processing and returns the specified `code` to a client. The non-standard code 444 closes a connection without sending a response header.

Starting from version 0.8.42, it is possible to specify either a redirect URL (for codes 301, 302, 303, 307, and 308) or the response body `text` (for other codes). A response body text and redirect URL can contain variables. As a special case, a redirect URL can be specified as a URI local to this server, in which case the full redirect URL is formed according to the request scheme (`$scheme`) and the [server_name_in_redirect]({{< ref "ng/mod_ref/ngx_http_core_module#server_name_in_redirect">}}) and [port_in_redirect]({{< ref "ng/mod_ref/ngx_http_core_module#port_in_redirect">}}) directives.

In addition, a `URL` for temporary redirect with the code 302 can be specified as the sole parameter. Such a parameter should start with the “`http://`”, “`https://`”, or “`$scheme`” string. A `URL` can contain variables.



Only the following codes could be returned before version 0.7.51: 204, 400, 402 — 406, 408, 410, 411, 413, 416, and 500 — 504.



The code 307 was not treated as a redirect until versions 1.1.16 and 1.0.13.



The code 308 was not treated as a redirect until version 1.13.0.



See also the [error_page]({{< ref "ng/mod_ref/ngx_http_core_module#error_page">}}) directive.



### rewrite

  Syntax:`rewrite regex replacement [flag];`

  Default: —

  Context: `server`, `location`, `if`


If the specified regular expression matches a request URI, URI is changed as specified in the `replacement` string. The `rewrite` directives are executed sequentially in order of their appearance in the configuration file. It is possible to terminate further processing of the directives using flags. If a replacement string starts with “`http://`”, “`https://`”, or “`$scheme`”, the processing stops and the redirect is returned to a client.

An optional `flag` parameter can be one of:

- `last`

  stops processing the current set of `ngx_http_rewrite_module` directives and starts a search for a new location matching the changed URI;

- `break`

  stops processing the current set of `ngx_http_rewrite_module` directives as with the [break]({{< ref "ng/mod_ref/ngx_http_rewrite_module#break">}}) directive;

- `redirect`

  returns a temporary redirect with the 302 code; used if a replacement string does not start with “`http://`”, “`https://`”, or “`$scheme`”;

- `permanent`

  returns a permanent redirect with the 301 code.

The full redirect URL is formed according to the request scheme (`$scheme`) and the [server_name_in_redirect]({{< ref "ng/mod_ref/ngx_http_core_module#server_name_in_redirect">}}) and [port_in_redirect]({{< ref "ng/mod_ref/ngx_http_core_module#port_in_redirect">}}) directives.

Example:

```
server {
    ...
    rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 last;
    rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  last;
    return  403;
    ...
}
```



But if these directives are put inside the “`/download/`” location, the `last` flag should be replaced by `break`, or otherwise nginx will make 10 cycles and return the 500 error:

```
location /download/ {
    rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 break;
    rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  break;
    return  403;
}
```



If a `replacement` string includes the new request arguments, the previous request arguments are appended after them. If this is undesired, putting a question mark at the end of a replacement string avoids having them appended, for example:

```
rewrite ^/users/(.*)$ /show?user=$1? last;
```



If a regular expression includes the “`}`” or “`;`” characters, the whole expressions should be enclosed in single or double quotes.



### rewrite_log

  Syntax:  `rewrite_log on | off;`

  Default: `rewrite_log off;`

  Context: `http`, `server`, `location`, `if`


Enables or disables logging of `ngx_http_rewrite_module` module directives processing results into the [error_log]({{< ref "ng/mod_ref/ngx_core_module#error_log">}}) at the `notice` level.



### set

  Syntax:  `set $variable value;`

  Default: —

  Context: `server`, `location`, `if`


Sets a `value` for the specified `variable`. The `value` can contain text, variables, and their combination.



### uninitialized_variable_warn

  Syntax:`uninitialized_variable_warn on | off;`

  Default: `uninitialized_variable_warn on;`

  Context: `http`, `server`, `location`, `if`


Controls whether warnings about uninitialized variables are logged.



Internal Implementation

The `ngx_http_rewrite_module` module directives are compiled at the configuration stage into internal instructions that are interpreted during request processing. An interpreter is a simple virtual stack machine.

For example, the directives

```
location /download/ {
    if ($forbidden) {
        return 403;
    }

    if ($slow) {
        limit_rate 10k;
    }

    rewrite ^/(download/.*)/media/(.*)\..*$ /$1/mp3/$2.mp3 break;
}
```

will be translated into these instructions:

```
variable $forbidden
check against zero
    return 403
    end of code
variable $slow
check against zero
match of regular expression
copy "/"
copy $1
copy "/mp3/"
copy $2
copy ".mp3"
end of regular expression
end of code
```



Note that there are no instructions for the [limit_rate]({{< ref "ng/mod_ref/ngx_http_core_module#limit_rate">}}) directive above as it is unrelated to the `ngx_http_rewrite_module` module. A separate configuration is created for the [if]({{< ref "ng/mod_ref/ngx_http_rewrite_module#if">}}) block. If the condition holds true, a request is assigned this configuration where `limit_rate` equals to 10k.

The directive

```
rewrite ^/(download/.*)/media/(.*)\..*$ /$1/mp3/$2.mp3 break;
```

can be made smaller by one instruction if the first slash in the regular expression is put inside the parentheses:

```
rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 break;
```

The corresponding instructions will then look like this:

```
match of regular expression
copy $1
copy "/mp3/"
copy $2
copy ".mp3"
end of regular expression
end of code
```