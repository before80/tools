+++
title = "ngx_http_hls_module"
date = 2023-08-15T08:15:04+08:00
weight = 230
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_hls_module

https://nginx.org/en/docs/http/ngx_http_hls_module.html



The `ngx_http_hls_module` module provides HTTP Live Streaming (HLS) server-side support for MP4 and MOV media files. Such files typically have the `.mp4`, `.m4v`, `.m4a`, `.mov`, or `.qt` filename extensions. The module supports H.264 video codec, AAC and MP3 audio codecs.

For each media file, two URIs are supported:

- A playlist URI with the “

  ```
  .m3u8
  ```

  ” filename extension. The URI can accept optional arguments:

  - “`start`” and “`end`” define playlist boundaries in seconds (1.9.0).
  - “`offset`” shifts an initial playback position to the time offset in seconds (1.9.0). A positive value sets a time offset from the beginning of the playlist. A negative value sets a time offset from the end of the last fragment in the playlist.
  - “`len`” defines the fragment length in seconds.

- A fragment URI with the “

  ```
  .ts
  ```

  ” filename extension. The URI can accept optional arguments:

  - “`start`” and “`end`” define fragment boundaries in seconds.





This module is available as part of our [commercial subscription](http://nginx.com/products/).





## Example Configuration



```
location / {
    hls;
    hls_fragment            5s;
    hls_buffers             10 10m;
    hls_mp4_buffer_size     1m;
    hls_mp4_max_buffer_size 5m;
    root /var/video/;
}
```

With this configuration, the following URIs are supported for the “`/var/video/test.mp4`” file:

```
http://hls.example.com/test.mp4.m3u8?offset=1.000&start=1.000&end=2.200
http://hls.example.com/test.mp4.m3u8?len=8.000
http://hls.example.com/test.mp4.ts?start=1.000&end=2.200
```





## Directives



### hls

  Syntax:  `hls;`

  Default: —

  Context: `location`


Turns on HLS streaming in the surrounding location.



### hls_buffers

  Syntax:  `hls_buffers number size;`

  Default: `hls_buffers 8 2m;`

  Context: `http`, `server`, `location`


Sets the maximum `number` and `size` of buffers that are used for reading and writing data frames.



### hls_forward_args

  Syntax:`hls_forward_args on | off;`

  Default: `hls_forward_args off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.5.12.

Adds arguments from a playlist request to URIs of fragments. This may be useful for performing client authorization at the moment of requesting a fragment, or when protecting an HLS stream with the [ngx_http_secure_link_module](../ngx_http_secure_link_module) module.

For example, if a client requests a playlist `http://example.com/hls/test.mp4.m3u8?a=1&b=2`, the arguments `a=1` and `b=2` will be added to URIs of fragments after the arguments `start` and `end`:

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:15
#EXT-X-PLAYLIST-TYPE:VOD

#EXTINF:9.333,
test.mp4.ts?start=0.000&end=9.333&a=1&b=2
#EXTINF:7.167,
test.mp4.ts?start=9.333&end=16.500&a=1&b=2
#EXTINF:5.416,
test.mp4.ts?start=16.500&end=21.916&a=1&b=2
#EXTINF:5.500,
test.mp4.ts?start=21.916&end=27.416&a=1&b=2
#EXTINF:15.167,
test.mp4.ts?start=27.416&end=42.583&a=1&b=2
#EXTINF:9.626,
test.mp4.ts?start=42.583&end=52.209&a=1&b=2

#EXT-X-ENDLIST
```



If an HLS stream is protected with the [ngx_http_secure_link_module](../ngx_http_secure_link_module) module, `$uri` should not be used in the [secure_link_md5](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html#secure_link_md5) expression because this will cause errors when requesting the fragments. [Base URI]({{< ref "ng/mod_ref/ngx_http_map_module#map">}}) should be used instead of `$uri` (`$hls_uri` in the example):

```
http {
    ...

    map $uri $hls_uri {
        ~^(?<base_uri>.*).m3u8$ $base_uri;
        ~^(?<base_uri>.*).ts$   $base_uri;
        default                 $uri;
    }

    server {
        ...

        location /hls/ {
            hls;
            hls_forward_args on;

            alias /var/videos/;

            secure_link $arg_md5,$arg_expires;
            secure_link_md5 "$secure_link_expires$hls_uri$remote_addr secret";

            if ($secure_link = "") {
                return 403;
            }

            if ($secure_link = "0") {
                return 410;
            }
        }
    }
}
```





### hls_fragment

  Syntax:  `hls_fragment time;`

  Default: `hls_fragment 5s;`

  Context: `http`, `server`, `location`


Defines the default fragment length for playlist URIs requested without the “`len`” argument.



### hls_mp4_buffer_size

  Syntax:  `hls_mp4_buffer_size size;`

  Default: `hls_mp4_buffer_size 512k;`

  Context: `http`, `server`, `location`


Sets the initial `size` of the buffer used for processing MP4 and MOV files.



### hls_mp4_max_buffer_size

  Syntax:`hls_mp4_max_buffer_size size;`

  Default: `hls_mp4_max_buffer_size 10m;`

  Context: `http`, `server`, `location`


During metadata processing, a larger buffer may become necessary. Its size cannot exceed the specified `size`, or else nginx will return the server error 500 (Internal Server Error), and log the following message:

```
"/some/movie/file.mp4" mp4 moov atom is too large:
12583268, you may want to increase hls_mp4_max_buffer_size
```