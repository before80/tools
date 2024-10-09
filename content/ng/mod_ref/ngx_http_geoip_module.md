+++
title = "ngx_http_geoip_module"
date = 2023-08-15T08:14:03+08:00
weight = 170
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_geoip_module

https://nginx.org/en/docs/http/ngx_http_geoip_module.html



The `ngx_http_geoip_module` module (0.8.6+) creates variables with values depending on the client IP address, using the precompiled [MaxMind](http://www.maxmind.com/) databases.

When using the databases with IPv6 support (1.3.12, 1.2.7), IPv4 addresses are looked up as IPv4-mapped IPv6 addresses.

This module is not built by default, it should be enabled with the `--with-http_geoip_module` configuration parameter.

This module requires the [MaxMind GeoIP](http://www.maxmind.com/app/c) library.





## Example Configuration



```
http {
    geoip_country         GeoIP.dat;
    geoip_city            GeoLiteCity.dat;
    geoip_proxy           192.168.100.0/24;
    geoip_proxy           2001:0db8::/32;
    geoip_proxy_recursive on;
    ...
```





## Directives



### geoip_country

  Syntax:`geoip_country file;`

  Default: —

  Context: `http`


Specifies a database used to determine the country depending on the client IP address. The following variables are available when using this database:

- `$geoip_country_code`

  two-letter country code, for example, “`RU`”, “`US`”.

- `$geoip_country_code3`

  three-letter country code, for example, “`RUS`”, “`USA`”.

- `$geoip_country_name`

  country name, for example, “`Russian Federation`”, “`United States`”.





### geoip_city

  Syntax:`geoip_city file;`

  Default: —

  Context: `http`


Specifies a database used to determine the country, region, and city depending on the client IP address. The following variables are available when using this database:

- `$geoip_area_code`

  telephone area code (US only).This variable may contain outdated information since the corresponding database field is deprecated.

- `$geoip_city_continent_code`

  two-letter continent code, for example, “`EU`”, “`NA`”.

- `$geoip_city_country_code`

  two-letter country code, for example, “`RU`”, “`US`”.

- `$geoip_city_country_code3`

  three-letter country code, for example, “`RUS`”, “`USA`”.

- `$geoip_city_country_name`

  country name, for example, “`Russian Federation`”, “`United States`”.

- `$geoip_dma_code`

  DMA region code in US (also known as “metro code”), according to the [geotargeting](https://developers.google.com/adwords/api/docs/appendix/cities-DMAregions) in Google AdWords API.

- `$geoip_latitude`

  latitude.

- `$geoip_longitude`

  longitude.

- `$geoip_region`

  two-symbol country region code (region, territory, state, province, federal land and the like), for example, “`48`”, “`DC`”.

- `$geoip_region_name`

  country region name (region, territory, state, province, federal land and the like), for example, “`Moscow City`”, “`District of Columbia`”.

- `$geoip_city`

  city name, for example, “`Moscow`”, “`Washington`”.

- `$geoip_postal_code`

  postal code.





### geoip_org

  Syntax:`geoip_org file;`

  Default: —

  Context: `http`


This directive appeared in version 1.0.3.

Specifies a database used to determine the organization depending on the client IP address. The following variable is available when using this database:

- `$geoip_org`

  organization name, for example, “The University of Melbourne”.





### geoip_proxy

  Syntax:`geoip_proxy address | CIDR;`

  Default: —

  Context: `http`


This directive appeared in versions 1.3.0 and 1.2.1.

Defines trusted addresses. When a request comes from a trusted address, an address from the “X-Forwarded-For” request header field will be used instead.



### geoip_proxy_recursive

  Syntax:`geoip_proxy_recursive on | off;`

  Default: `geoip_proxy_recursive off;`

  Context: `http`


This directive appeared in versions 1.3.0 and 1.2.1.

If recursive search is disabled then instead of the original client address that matches one of the trusted addresses, the last address sent in “X-Forwarded-For” will be used. If recursive search is enabled then instead of the original client address that matches one of the trusted addresses, the last non-trusted address sent in “X-Forwarded-For” will be used.