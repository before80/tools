+++
title = "ngx_http_secure_link_module"
date = 2023-08-15T08:18:22+08:00
weight = 440
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_secure_link_module

https://nginx.org/en/docs/http/ngx_http_secure_link_module.html



The `ngx_http_secure_link_module` module (0.7.18) is used to check authenticity of requested links, protect resources from unauthorized access, and limit link lifetime.

The authenticity of a requested link is verified by comparing the checksum value passed in a request with the value computed for the request. If a link has a limited lifetime and the time has expired, the link is considered outdated. The status of these checks is made available in the `$secure_link` variable.

The module provides two alternative operation modes. The first mode is enabled by the [secure_link_secret]({{< ref "ng/mod_ref/ngx_http_secure_link_module#secure_link_secret">}}) directive and is used to check authenticity of requested links as well as protect resources from unauthorized access. The second mode (0.8.50) is enabled by the [secure_link]({{< ref "ng/mod_ref/ngx_http_secure_link_module#secure_link">}}) and [secure_link_md5](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5) directives and is also used to limit lifetime of links.

This module is not built by default, it should be enabled with the `--with-http_secure_link_module` configuration parameter.



## Directives



### secure_link

  Syntax:  `secure_link expression;`

  Default: —

  Context: `http`, `server`, `location`


Defines a string with variables from which the checksum value and lifetime of a link will be extracted.

Variables used in an `expression` are usually associated with a request; see [example](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5) below.

The checksum value extracted from the string is compared with the MD5 hash value of the expression defined by the [secure_link_md5](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5) directive. If the checksums are different, the `$secure_link` variable is set to an empty string. If the checksums are the same, the link lifetime is checked. If the link has a limited lifetime and the time has expired, the `$secure_link` variable is set to “`0`”. Otherwise, it is set to “`1`”. The MD5 hash value passed in a request is encoded in [base64url](https://datatracker.ietf.org/doc/html/rfc4648#section-5).

If a link has a limited lifetime, the expiration time is set in seconds since Epoch (Thu, 01 Jan 1970 00:00:00 GMT). The value is specified in the expression after the MD5 hash, and is separated by a comma. The expiration time passed in a request is available through the `$secure_link_expires` variable for a use in the [secure_link_md5](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5) directive. If the expiration time is not specified, a link has the unlimited lifetime.



### secure_link_md5

  Syntax:`secure_link_md5 expression;`

  Default: —

  Context: `http`, `server`, `location`


Defines an expression for which the MD5 hash value will be computed and compared with the value passed in a request.

The expression should contain the secured part of a link (resource) and a secret ingredient. If the link has a limited lifetime, the expression should also contain `$secure_link_expires`.

To prevent unauthorized access, the expression may contain some information about the client, such as its address and browser version.

Example:

```
location /s/ {
    secure_link $arg_md5,$arg_expires;
    secure_link_md5 "$secure_link_expires$uri$remote_addr secret";

    if ($secure_link = "") {
        return 403;
    }

    if ($secure_link = "0") {
        return 410;
    }

    ...
}
```

The “`/s/link?md5=_e4Nc3iduzkWRm01TBBNYw&expires=2147483647`” link restricts access to “`/s/link`” for the client with the IP address 127.0.0.1. The link also has the limited lifetime until January 19, 2038 (GMT).

On UNIX, the `md5` request argument value can be obtained as:

```
echo -n '2147483647/s/link127.0.0.1 secret' | \
    openssl md5 -binary | openssl base64 | tr +/ -_ | tr -d =
```





### secure_link_secret

  Syntax:`secure_link_secret word;`

  Default: —

  Context: `location`


Defines a secret `word` used to check authenticity of requested links.

The full URI of a requested link looks as follows:

```
/prefix/hash/link
```

where `hash` is a hexadecimal representation of the MD5 hash computed for the concatenation of the link and secret word, and `prefix` is an arbitrary string without slashes.

If the requested link passes the authenticity check, the `$secure_link` variable is set to the link extracted from the request URI. Otherwise, the `$secure_link` variable is set to an empty string.

Example:

```
location /p/ {
    secure_link_secret secret;

    if ($secure_link = "") {
        return 403;
    }

    rewrite ^ /secure/$secure_link;
}

location /secure/ {
    internal;
}
```

A request of “`/p/5e814704a28d9bc1914ff19fa0c4a00a/link`” will be internally redirected to “`/secure/link`”.

On UNIX, the hash value for this example can be obtained as:

```
echo -n 'linksecret' | openssl md5 -hex
```





## Embedded Variables



- `$secure_link`

  The status of a link check. The specific value depends on the selected operation mode.

- `$secure_link_expires`

  The lifetime of a link passed in a request; intended to be used only in the [secure_link_md5](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5) directive.