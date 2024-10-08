+++
title = "ngx_http_mp4_module"
date = 2023-08-15T08:16:47+08:00
weight = 350
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_mp4_module



https://nginx.org/en/docs/http/ngx_http_mp4_module.html



The `ngx_http_mp4_module` module provides pseudo-streaming server-side support for MP4 files. Such files typically have the `.mp4`, `.m4v`, or `.m4a` filename extensions.

Pseudo-streaming works in alliance with a compatible media player. The player sends an HTTP request to the server with the start time specified in the query string argument (named simply `start` and specified in seconds), and the server responds with the stream such that its start position corresponds to the requested time, for example:

```
http://example.com/elephants_dream.mp4?start=238.88
```

This allows performing a random seeking at any time, or starting playback in the middle of the timeline.

To support seeking, H.264-based formats store metadata in a so-called “moov atom”. It is a part of the file that holds the index information for the whole file.

To start playback, the player first needs to read metadata. This is done by sending a special request with the `start=0` argument. A lot of encoding software insert the metadata at the end of the file. This is suboptimal for pseudo-streaming, because the player has to download the entire file before starting playback. If the metadata are located at the beginning of the file, it is enough for nginx to simply start sending back the file contents. If the metadata are located at the end of the file, nginx must read the entire file and prepare a new stream so that the metadata come before the media data. This involves some CPU, memory, and disk I/O overhead, so it is a good idea to [prepare an original file for pseudo-streaming](https://github.com/flowplayer/flowplayer/wiki/7.1.1-video-file-correction) in advance, rather than having nginx do this on every such request.

The module also supports the `end` argument of an HTTP request (1.5.13) which sets the end point of playback. The `end` argument can be specified with the `start` argument or separately:

```
http://example.com/elephants_dream.mp4?start=238.88&end=555.55
```



For a matching request with a non-zero `start` or `end` argument, nginx will read the metadata from the file, prepare the stream with the requested time range, and send it to the client. This has the same overhead as described above.



If the `start` argument points to a non-key video frame, the beginning of such video will be broken. To fix this issue, the video [can](https://nginx.org/en/docs/http/ngx_http_mp4_module.html#mp4_start_key_frame) be prepended with the key frame before `start` point and with all intermediate frames between them. These frames will be hidden from playback using an edit list (1.21.4).

If a matching request does not include the `start` and `end` arguments, there is no overhead, and the file is sent simply as a static resource. Some players also support byte-range requests, and thus do not require this module.

This module is not built by default, it should be enabled with the `--with-http_mp4_module` configuration parameter.

If a third-party mp4 module was previously used, it should be disabled.



A similar pseudo-streaming support for FLV files is provided by the [ngx_http_flv_module](../ngx_http_flv_module) module.



## Example Configuration



```
location /video/ {
    mp4;
    mp4_buffer_size       1m;
    mp4_max_buffer_size   5m;
    mp4_limit_rate        on;
    mp4_limit_rate_after  30s;
}
```





## Directives



### mp4

  Syntax:  `mp4;`

  Default: —

  Context: `location`


Turns on module processing in a surrounding location.



### mp4_buffer_size

  Syntax:  `mp4_buffer_size size;`

  Default: `mp4_buffer_size 512K;`

  Context: `http`, `server`, `location`


Sets the initial `size` of the buffer used for processing MP4 files.



### mp4_max_buffer_size

  Syntax:  `mp4_max_buffer_size size;`

  Default: `mp4_max_buffer_size 10M;`

  Context: `http`, `server`, `location`


During metadata processing, a larger buffer may become necessary. Its size cannot exceed the specified `size`, or else nginx will return the 500 (Internal Server Error) server error, and log the following message:

```
"/some/movie/file.mp4" mp4 moov atom is too large:
12583268, you may want to increase mp4_max_buffer_size
```





### mp4_limit_rate

  Syntax:`mp4_limit_rate on | off | factor;`

  Default: `mp4_limit_rate off;`

  Context: `http`, `server`, `location`


Limits the rate of response transmission to a client. The rate is limited based on the average bitrate of the MP4 file served. To calculate the rate, the bitrate is multiplied by the specified `factor`. The special value “`on`” corresponds to the factor of 1.1. The special value “`off`” disables rate limiting. The limit is set per a request, and so if a client simultaneously opens two connections, the overall rate will be twice as much as the specified limit.



This directive is available as part of our [commercial subscription](http://nginx.com/products/).





### mp4_limit_rate_after

  Syntax:`mp4_limit_rate_after time;`

  Default: `mp4_limit_rate_after 60s;`

  Context: `http`, `server`, `location`


Sets the initial amount of media data (measured in playback time) after which the further transmission of the response to a client will be rate limited.



This directive is available as part of our [commercial subscription](http://nginx.com/products/).





### mp4_start_key_frame

  Syntax:`mp4_start_key_frame on | off;`

  Default: `mp4_start_key_frame off;`

  Context: `http`, `server`, `location`


This directive appeared in version 1.21.4.

Forces output video to always start with a key video frame. If the `start` argument does not point to a key frame, initial frames are hidden using an mp4 edit list. Edit lists are supported by major players and browsers such as Chrome, Safari, QuickTime and ffmpeg, partially supported by Firefox.