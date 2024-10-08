+++
title = "ngx_http_geo_module"
date = 2023-08-15T08:13:53+08:00
weight = 160
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_geo_module

https://nginx.org/en/docs/http/ngx_http_geo_module.html





The `ngx_http_geo_module` module creates variables with values depending on the client IP address.



## Example Configuration



```
geo $geo {
    default        0;

    127.0.0.1      2;
    192.168.1.0/24 1;
    10.1.0.0/16    1;

    ::1            2;
    2001:0db8::/32 1;
}
```





## Directives



### geo

  Syntax:`geo [$address] $variable { ... }`

  Default: —

  Context: `http`


Describes the dependency of values of the specified variable on the client IP address. By default, the address is taken from the `$remote_addr` variable, but it can also be taken from another variable (0.7.27), for example:

```
geo $arg_remote_addr $geo {
    ...;
}
```





Since variables are evaluated only when used, the mere existence of even a large number of declared “`geo`” variables does not cause any extra costs for request processing.



If the value of a variable does not represent a valid IP address then the “`255.255.255.255`” address is used.

Addresses are specified either as prefixes in CIDR notation (including individual addresses) or as ranges (0.7.23).

IPv6 prefixes are supported starting from versions 1.3.10 and 1.2.7.



The following special parameters are also supported:

- `delete`

  deletes the specified network (0.7.23).

- `default`

  a value set to the variable if the client address does not match any of the specified addresses. When addresses are specified in CIDR notation, “`0.0.0.0/0`” and “`::/0`” can be used instead of `default`. When `default` is not specified, the default value will be an empty string.

- `include`

  includes a file with addresses and values. There can be several inclusions.

- `proxy`

  defines trusted addresses (0.8.7, 0.7.63). When a request comes from a trusted address, an address from the “X-Forwarded-For” request header field will be used instead. In contrast to the regular addresses, trusted addresses are checked sequentially.Trusted IPv6 addresses are supported starting from versions 1.3.0 and 1.2.1.

- `proxy_recursive`

  enables recursive address search (1.3.0, 1.2.1). If recursive search is disabled then instead of the original client address that matches one of the trusted addresses, the last address sent in “X-Forwarded-For” will be used. If recursive search is enabled then instead of the original client address that matches one of the trusted addresses, the last non-trusted address sent in “X-Forwarded-For” will be used.

- `ranges`

  indicates that addresses are specified as ranges (0.7.23). This parameter should be the first. To speed up loading of a geo base, addresses should be put in ascending order.



Example:

```
geo $country {
    default        ZZ;
    include        conf/geo.conf;
    delete         127.0.0.0/16;
    proxy          192.168.100.0/24;
    proxy          2001:0db8::/32;

    127.0.0.0/24   US;
    127.0.0.1/32   RU;
    10.1.0.0/16    RU;
    192.168.1.0/24 UK;
}
```



The `conf/geo.conf` file could contain the following lines:

```
10.2.0.0/16    RU;
192.168.2.0/24 RU;
```



A value of the most specific match is used. For example, for the 127.0.0.1 address the value “`RU`” will be chosen, not “`US`”.

Example with ranges:

```
geo $country {
    ranges;
    default                   ZZ;
    127.0.0.0-127.0.0.0       US;
    127.0.0.1-127.0.0.1       RU;
    127.0.0.1-127.0.0.255     US;
    10.1.0.0-10.1.255.255     RU;
    192.168.1.0-192.168.1.255 UK;
}
```