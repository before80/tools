+++
title = "从源码构建 nginx"
date = 2024-10-09T08:50:15+08:00
weight = 20
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# Building nginx from Sources - 从源码构建 nginx

> 原文：https://nginx.org/en/docs/configure.html
>

The build is configured using the `configure` command. It defines various aspects of the system, including the methods nginx is allowed to use for connection processing. At the end it creates a `Makefile`.

The `configure` command supports the following parameters:



- `--help`

  prints a help message.

- `--prefix=*path*`

  defines a directory that will keep server files. This same directory will also be used for all relative paths set by `configure` (except for paths to libraries sources) and in the `nginx.conf` configuration file. It is set to the `/usr/local/nginx` directory by default.

- `--sbin-path=*path*`

  sets the name of an nginx executable file. This name is used only during installation. By default the file is named `*prefix*/sbin/nginx`.

- `--modules-path=*path*`

  defines a directory where nginx dynamic modules will be installed. By default the `*prefix*/modules` directory is used.

- `--conf-path=*path*`

  sets the name of an `nginx.conf` configuration file. If needs be, nginx can always be started with a different configuration file, by specifying it in the command-line parameter `-c *file*`. By default the file is named `*prefix*/conf/nginx.conf`.

- `--error-log-path=*path*`

  sets the name of the primary error, warnings, and diagnostic file. After installation, the file name can always be changed in the `nginx.conf` configuration file using the [error_log](https://nginx.org/en/docs/ngx_core_module.html#error_log) directive. By default the file is named `*prefix*/logs/error.log`.

- `--pid-path=*path*`

  sets the name of an `nginx.pid` file that will store the process ID of the main process. After installation, the file name can always be changed in the `nginx.conf` configuration file using the [pid](https://nginx.org/en/docs/ngx_core_module.html#pid) directive. By default the file is named `*prefix*/logs/nginx.pid`.

- `--lock-path=*path*`

  sets a prefix for the names of lock files. After installation, the value can always be changed in the `nginx.conf` configuration file using the [lock_file](https://nginx.org/en/docs/ngx_core_module.html#lock_file) directive. By default the value is `*prefix*/logs/nginx.lock`.

- `--user=*name*`

  sets the name of an unprivileged user whose credentials will be used by worker processes. After installation, the name can always be changed in the `nginx.conf` configuration file using the [user](https://nginx.org/en/docs/ngx_core_module.html#user) directive. The default user name is nobody.

- `--group=*name*`

  sets the name of a group whose credentials will be used by worker processes. After installation, the name can always be changed in the `nginx.conf` configuration file using the [user](https://nginx.org/en/docs/ngx_core_module.html#user) directive. By default, a group name is set to the name of an unprivileged user.

- `--build=*name*`

  sets an optional nginx build name.

- `--builddir=*path*`

  sets a build directory.

- `--with-select_module` `--without-select_module`

  enables or disables building a module that allows the server to work with the `select()` method. This module is built automatically if the platform does not appear to support more appropriate methods such as kqueue, epoll, or /dev/poll.

- `--with-poll_module` `--without-poll_module`

  enables or disables building a module that allows the server to work with the `poll()` method. This module is built automatically if the platform does not appear to support more appropriate methods such as kqueue, epoll, or /dev/poll.

- `--with-threads`

  enables the use of [thread pools](https://nginx.org/en/docs/ngx_core_module.html#thread_pool).

- `--with-file-aio`

  enables the use of [asynchronous file I/O](https://nginx.org/en/docs/http/ngx_http_core_module.html#aio) (AIO) on FreeBSD and Linux.

- `--with-http_ssl_module`

  enables building a module that adds the [HTTPS protocol support](https://nginx.org/en/docs/http/ngx_http_ssl_module.html) to an HTTP server. This module is not built by default. The OpenSSL library is required to build and run this module.

- `--with-http_v2_module`

  enables building a module that provides support for [HTTP/2](https://nginx.org/en/docs/http/ngx_http_v2_module.html). This module is not built by default.

- `--with-http_v3_module`

  enables building a module that provides support for [HTTP/3](https://nginx.org/en/docs/http/ngx_http_v3_module.html). This module is not built by default. An SSL library that provides HTTP/3 support is recommended to build and run this module, such as [BoringSSL](https://boringssl.googlesource.com/boringssl), [LibreSSL](https://www.libressl.org/), or [QuicTLS](https://github.com/quictls/openssl). Otherwise, if using the OpenSSL library, OpenSSL compatibility layer will be used that does not support QUIC [early data](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_early_data).

- `--with-http_realip_module`

  enables building the [ngx_http_realip_module](https://nginx.org/en/docs/http/ngx_http_realip_module.html) module that changes the client address to the address sent in the specified header field. This module is not built by default.

- `--with-http_addition_module`

  enables building the [ngx_http_addition_module](https://nginx.org/en/docs/http/ngx_http_addition_module.html) module that adds text before and after a response. This module is not built by default.

- `--with-http_xslt_module` `--with-http_xslt_module=dynamic`

  enables building the [ngx_http_xslt_module](https://nginx.org/en/docs/http/ngx_http_xslt_module.html) module that transforms XML responses using one or more XSLT stylesheets. This module is not built by default. The [libxml2](http://xmlsoft.org/) and [libxslt](http://xmlsoft.org/XSLT/) libraries are required to build and run this module.

- `--with-http_image_filter_module` `--with-http_image_filter_module=dynamic`

  enables building the [ngx_http_image_filter_module](https://nginx.org/en/docs/http/ngx_http_image_filter_module.html) module that transforms images in JPEG, GIF, PNG, and WebP formats. This module is not built by default.

- `--with-http_geoip_module` `--with-http_geoip_module=dynamic`

  enables building the [ngx_http_geoip_module](https://nginx.org/en/docs/http/ngx_http_geoip_module.html) module that creates variables depending on the client IP address and the precompiled [MaxMind](http://www.maxmind.com/) databases. This module is not built by default.

- `--with-http_sub_module`

  enables building the [ngx_http_sub_module](https://nginx.org/en/docs/http/ngx_http_sub_module.html) module that modifies a response by replacing one specified string by another. This module is not built by default.

- `--with-http_dav_module`

  enables building the [ngx_http_dav_module](https://nginx.org/en/docs/http/ngx_http_dav_module.html) module that provides file management automation via the WebDAV protocol. This module is not built by default.

- `--with-http_flv_module`

  enables building the [ngx_http_flv_module](https://nginx.org/en/docs/http/ngx_http_flv_module.html) module that provides pseudo-streaming server-side support for Flash Video (FLV) files. This module is not built by default.

- `--with-http_mp4_module`

  enables building the [ngx_http_mp4_module](https://nginx.org/en/docs/http/ngx_http_mp4_module.html) module that provides pseudo-streaming server-side support for MP4 files. This module is not built by default.

- `--with-http_gunzip_module`

  enables building the [ngx_http_gunzip_module](https://nginx.org/en/docs/http/ngx_http_gunzip_module.html) module that decompresses responses with “`Content-Encoding: gzip`” for clients that do not support “gzip” encoding method. This module is not built by default.

- `--with-http_gzip_static_module`

  enables building the [ngx_http_gzip_static_module](https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html) module that enables sending precompressed files with the “`.gz`” filename extension instead of regular files. This module is not built by default.

- `--with-http_auth_request_module`

  enables building the [ngx_http_auth_request_module](https://nginx.org/en/docs/http/ngx_http_auth_request_module.html) module that implements client authorization based on the result of a subrequest. This module is not built by default.

- `--with-http_random_index_module`

  enables building the [ngx_http_random_index_module](https://nginx.org/en/docs/http/ngx_http_random_index_module.html) module that processes requests ending with the slash character (‘`/`’) and picks a random file in a directory to serve as an index file. This module is not built by default.

- `--with-http_secure_link_module`

  enables building the [ngx_http_secure_link_module](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html) module. This module is not built by default.

- `--with-http_degradation_module`

  enables building the `ngx_http_degradation_module` module. This module is not built by default.

- `--with-http_slice_module`

  enables building the [ngx_http_slice_module](https://nginx.org/en/docs/http/ngx_http_slice_module.html) module that splits a request into subrequests, each returning a certain range of response. The module provides more effective caching of big responses. This module is not built by default.

- `--with-http_stub_status_module`

  enables building the [ngx_http_stub_status_module](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html) module that provides access to basic status information. This module is not built by default.

- `--without-http_charset_module`

  disables building the [ngx_http_charset_module](https://nginx.org/en/docs/http/ngx_http_charset_module.html) module that adds the specified charset to the “Content-Type” response header field and can additionally convert data from one charset to another.

- `--without-http_gzip_module`

  disables building a module that [compresses responses](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) of an HTTP server. The zlib library is required to build and run this module.

- `--without-http_ssi_module`

  disables building the [ngx_http_ssi_module](https://nginx.org/en/docs/http/ngx_http_ssi_module.html) module that processes SSI (Server Side Includes) commands in responses passing through it.

- `--without-http_userid_module`

  disables building the [ngx_http_userid_module](https://nginx.org/en/docs/http/ngx_http_userid_module.html) module that sets cookies suitable for client identification.

- `--without-http_access_module`

  disables building the [ngx_http_access_module](https://nginx.org/en/docs/http/ngx_http_access_module.html) module that allows limiting access to certain client addresses.

- `--without-http_auth_basic_module`

  disables building the [ngx_http_auth_basic_module](https://nginx.org/en/docs/http/ngx_http_auth_basic_module.html) module that allows limiting access to resources by validating the user name and password using the “HTTP Basic Authentication” protocol.

- `--without-http_mirror_module`

  disables building the [ngx_http_mirror_module](https://nginx.org/en/docs/http/ngx_http_mirror_module.html) module that implements mirroring of an original request by creating background mirror subrequests.

- `--without-http_autoindex_module`

  disables building the [ngx_http_autoindex_module](https://nginx.org/en/docs/http/ngx_http_autoindex_module.html) module that processes requests ending with the slash character (‘`/`’) and produces a directory listing in case the [ngx_http_index_module](https://nginx.org/en/docs/http/ngx_http_index_module.html) module cannot find an index file.

- `--without-http_geo_module`

  disables building the [ngx_http_geo_module](https://nginx.org/en/docs/http/ngx_http_geo_module.html) module that creates variables with values depending on the client IP address.

- `--without-http_map_module`

  disables building the [ngx_http_map_module](https://nginx.org/en/docs/http/ngx_http_map_module.html) module that creates variables with values depending on values of other variables.

- `--without-http_split_clients_module`

  disables building the [ngx_http_split_clients_module](https://nginx.org/en/docs/http/ngx_http_split_clients_module.html) module that creates variables for A/B testing.

- `--without-http_referer_module`

  disables building the [ngx_http_referer_module](https://nginx.org/en/docs/http/ngx_http_referer_module.html) module that can block access to a site for requests with invalid values in the “Referer” header field.

- `--without-http_rewrite_module`

  disables building a module that allows an HTTP server to [redirect requests and change URI of requests](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html). The PCRE library is required to build and run this module.

- `--without-http_proxy_module`

  disables building an HTTP server [proxying module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html).

- `--without-http_fastcgi_module`

  disables building the [ngx_http_fastcgi_module](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html) module that passes requests to a FastCGI server.

- `--without-http_uwsgi_module`

  disables building the [ngx_http_uwsgi_module](https://nginx.org/en/docs/http/ngx_http_uwsgi_module.html) module that passes requests to a uwsgi server.

- `--without-http_scgi_module`

  disables building the [ngx_http_scgi_module](https://nginx.org/en/docs/http/ngx_http_scgi_module.html) module that passes requests to an SCGI server.

- `--without-http_grpc_module`

  disables building the [ngx_http_grpc_module](https://nginx.org/en/docs/http/ngx_http_grpc_module.html) module that passes requests to a gRPC server.

- `--without-http_memcached_module`

  disables building the [ngx_http_memcached_module](https://nginx.org/en/docs/http/ngx_http_memcached_module.html) module that obtains responses from a memcached server.

- `--without-http_limit_conn_module`

  disables building the [ngx_http_limit_conn_module](https://nginx.org/en/docs/http/ngx_http_limit_conn_module.html) module that limits the number of connections per key, for example, the number of connections from a single IP address.

- `--without-http_limit_req_module`

  disables building the [ngx_http_limit_req_module](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html) module that limits the request processing rate per key, for example, the processing rate of requests coming from a single IP address.

- `--without-http_empty_gif_module`

  disables building a module that [emits single-pixel transparent GIF](https://nginx.org/en/docs/http/ngx_http_empty_gif_module.html).

- `--without-http_browser_module`

  disables building the [ngx_http_browser_module](https://nginx.org/en/docs/http/ngx_http_browser_module.html) module that creates variables whose values depend on the value of the “User-Agent” request header field.

- `--without-http_upstream_hash_module`

  disables building a module that implements the [hash](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#hash) load balancing method.

- `--without-http_upstream_ip_hash_module`

  disables building a module that implements the [ip_hash](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#ip_hash) load balancing method.

- `--without-http_upstream_least_conn_module`

  disables building a module that implements the [least_conn](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#least_conn) load balancing method.

- `--without-http_upstream_random_module`

  disables building a module that implements the [random](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#random) load balancing method.

- `--without-http_upstream_keepalive_module`

  disables building a module that provides [caching of connections](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive) to upstream servers.

- `--without-http_upstream_zone_module`

  disables building a module that makes it possible to store run-time state of an upstream group in a shared memory [zone](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#zone).

- `--with-http_perl_module` `--with-http_perl_module=dynamic`

  enables building the [embedded Perl module](https://nginx.org/en/docs/http/ngx_http_perl_module.html). This module is not built by default.

- `--with-perl_modules_path=*path*`

  defines a directory that will keep Perl modules.

- `--with-perl=*path*`

  sets the name of the Perl binary.

- `--http-log-path=*path*`

  sets the name of the primary request log file of the HTTP server. After installation, the file name can always be changed in the `nginx.conf` configuration file using the [access_log](https://nginx.org/en/docs/http/ngx_http_log_module.html#access_log) directive. By default the file is named `*prefix*/logs/access.log`.

- `--http-client-body-temp-path=*path*`

  defines a directory for storing temporary files that hold client request bodies. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [client_body_temp_path](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_body_temp_path) directive. By default the directory is named `*prefix*/client_body_temp`.

- `--http-proxy-temp-path=*path*`

  defines a directory for storing temporary files with data received from proxied servers. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [proxy_temp_path](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_temp_path) directive. By default the directory is named `*prefix*/proxy_temp`.

- `--http-fastcgi-temp-path=*path*`

  defines a directory for storing temporary files with data received from FastCGI servers. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [fastcgi_temp_path](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_temp_path) directive. By default the directory is named `*prefix*/fastcgi_temp`.

- `--http-uwsgi-temp-path=*path*`

  defines a directory for storing temporary files with data received from uwsgi servers. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [uwsgi_temp_path](https://nginx.org/en/docs/http/ngx_http_uwsgi_module.html#uwsgi_temp_path) directive. By default the directory is named `*prefix*/uwsgi_temp`.

- `--http-scgi-temp-path=*path*`

  defines a directory for storing temporary files with data received from SCGI servers. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [scgi_temp_path](https://nginx.org/en/docs/http/ngx_http_scgi_module.html#scgi_temp_path) directive. By default the directory is named `*prefix*/scgi_temp`.

- `--without-http`

  disables the [HTTP](https://nginx.org/en/docs/http/ngx_http_core_module.html) server.

- `--without-http-cache`

  disables HTTP cache.

- `--with-mail` `--with-mail=dynamic`

  enables POP3/IMAP4/SMTP [mail proxy](https://nginx.org/en/docs/mail/ngx_mail_core_module.html) server.

- `--with-mail_ssl_module`

  enables building a module that adds the [SSL/TLS protocol support](https://nginx.org/en/docs/mail/ngx_mail_ssl_module.html) to the mail proxy server. This module is not built by default. The OpenSSL library is required to build and run this module.

- `--without-mail_pop3_module`

  disables the [POP3](https://nginx.org/en/docs/mail/ngx_mail_pop3_module.html) protocol in mail proxy server.

- `--without-mail_imap_module`

  disables the [IMAP](https://nginx.org/en/docs/mail/ngx_mail_imap_module.html) protocol in mail proxy server.

- `--without-mail_smtp_module`

  disables the [SMTP](https://nginx.org/en/docs/mail/ngx_mail_smtp_module.html) protocol in mail proxy server.

- `--with-stream` `--with-stream=dynamic`

  enables building the [stream module](https://nginx.org/en/docs/stream/ngx_stream_core_module.html) for generic TCP/UDP proxying and load balancing. This module is not built by default.

- `--with-stream_ssl_module`

  enables building a module that adds the [SSL/TLS protocol support](https://nginx.org/en/docs/stream/ngx_stream_ssl_module.html) to the stream module. This module is not built by default. The OpenSSL library is required to build and run this module.

- `--with-stream_realip_module`

  enables building the [ngx_stream_realip_module](https://nginx.org/en/docs/stream/ngx_stream_realip_module.html) module that changes the client address to the address sent in the PROXY protocol header. This module is not built by default.

- `--with-stream_geoip_module` `--with-stream_geoip_module=dynamic`

  enables building the [ngx_stream_geoip_module](https://nginx.org/en/docs/stream/ngx_stream_geoip_module.html) module that creates variables depending on the client IP address and the precompiled [MaxMind](http://www.maxmind.com/) databases. This module is not built by default.

- `--with-stream_ssl_preread_module`

  enables building the [ngx_stream_ssl_preread_module](https://nginx.org/en/docs/stream/ngx_stream_ssl_preread_module.html) module that allows extracting information from the [ClientHello](https://datatracker.ietf.org/doc/html/rfc5246#section-7.4.1.2) message without terminating SSL/TLS. This module is not built by default.

- `--without-stream_limit_conn_module`

  disables building the [ngx_stream_limit_conn_module](https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html) module that limits the number of connections per key, for example, the number of connections from a single IP address.

- `--without-stream_access_module`

  disables building the [ngx_stream_access_module](https://nginx.org/en/docs/stream/ngx_stream_access_module.html) module that allows limiting access to certain client addresses.

- `--without-stream_geo_module`

  disables building the [ngx_stream_geo_module](https://nginx.org/en/docs/stream/ngx_stream_geo_module.html) module that creates variables with values depending on the client IP address.

- `--without-stream_map_module`

  disables building the [ngx_stream_map_module](https://nginx.org/en/docs/stream/ngx_stream_map_module.html) module that creates variables with values depending on values of other variables.

- `--without-stream_split_clients_module`

  disables building the [ngx_stream_split_clients_module](https://nginx.org/en/docs/stream/ngx_stream_split_clients_module.html) module that creates variables for A/B testing.

- `--without-stream_return_module`

  disables building the [ngx_stream_return_module](https://nginx.org/en/docs/stream/ngx_stream_return_module.html) module that sends some specified value to the client and then closes the connection.

- `--without-stream_set_module`

  disables building the [ngx_stream_set_module](https://nginx.org/en/docs/stream/ngx_stream_set_module.html) module that sets a value for a variable.

- `--without-stream_upstream_hash_module`

  disables building a module that implements the [hash](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#hash) load balancing method.

- `--without-stream_upstream_least_conn_module`

  disables building a module that implements the [least_conn](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#least_conn) load balancing method.

- `--without-stream_upstream_random_module`

  disables building a module that implements the [random](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#random) load balancing method.

- `--without-stream_upstream_zone_module`

  disables building a module that makes it possible to store run-time state of an upstream group in a shared memory [zone](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#zone).

- `--with-google_perftools_module`

  enables building the [ngx_google_perftools_module](https://nginx.org/en/docs/ngx_google_perftools_module.html) module that enables profiling of nginx worker processes using [Google Performance Tools](https://github.com/gperftools/gperftools). The module is intended for nginx developers and is not built by default.

- `--with-cpp_test_module`

  enables building the `ngx_cpp_test_module` module.

- `--add-module=*path*`

  enables an external module.

- `--add-dynamic-module=*path*`

  enables an external dynamic module.

- `--with-compat`

  enables dynamic modules compatibility.

- `--with-cc=*path*`

  sets the name of the C compiler.

- `--with-cpp=*path*`

  sets the name of the C preprocessor.

- `--with-cc-opt=*parameters*`

  sets additional parameters that will be added to the CFLAGS variable. When using the system PCRE library under FreeBSD, `--with-cc-opt="-I /usr/local/include"` should be specified. If the number of files supported by `select()` needs to be increased it can also be specified here such as this: `--with-cc-opt="-D FD_SETSIZE=2048"`.

- `--with-ld-opt=*parameters*`

  sets additional parameters that will be used during linking. When using the system PCRE library under FreeBSD, `--with-ld-opt="-L /usr/local/lib"` should be specified.

- `--with-cpu-opt=*cpu*`

  enables building per specified CPU: `pentium`, `pentiumpro`, `pentium3`, `pentium4`, `athlon`, `opteron`, `sparc32`, `sparc64`, `ppc64`.

- `--without-pcre`

  disables the usage of the PCRE library.

- `--with-pcre`

  forces the usage of the PCRE library.

- `--with-pcre=*path*`

  sets the path to the sources of the PCRE library. The library distribution needs to be downloaded from the [PCRE](http://www.pcre.org/) site and extracted. The rest is done by nginx’s `./configure` and `make`. The library is required for regular expressions support in the [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location) directive and for the [ngx_http_rewrite_module](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html) module.

- `--with-pcre-opt=*parameters*`

  sets additional build options for PCRE.

- `--with-pcre-jit`

  builds the PCRE library with “just-in-time compilation” support (1.1.12, the [pcre_jit](https://nginx.org/en/docs/ngx_core_module.html#pcre_jit) directive).

- `--without-pcre2`

  disables use of the PCRE2 library instead of the original PCRE library (1.21.5).

- `--with-zlib=*path*`

  sets the path to the sources of the zlib library. The library distribution needs to be downloaded from the [zlib](http://zlib.net/) site and extracted. The rest is done by nginx’s `./configure` and `make`. The library is required for the [ngx_http_gzip_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) module.

- `--with-zlib-opt=*parameters*`

  sets additional build options for zlib.

- `--with-zlib-asm=*cpu*`

  enables the use of the zlib assembler sources optimized for one of the specified CPUs: `pentium`, `pentiumpro`.

- `--with-libatomic`

  forces the libatomic_ops library usage.

- `--with-libatomic=*path*`

  sets the path to the libatomic_ops library sources.

- `--with-openssl=*path*`

  sets the path to the OpenSSL library sources.

- `--with-openssl-opt=*parameters*`

  sets additional build options for OpenSSL.

- `--with-debug`

  enables the [debugging log](https://nginx.org/en/docs/debugging_log.html).



Example of parameters usage (all of this needs to be typed in one line):

```
./configure
    --sbin-path=/usr/local/nginx/nginx
    --conf-path=/usr/local/nginx/nginx.conf
    --pid-path=/usr/local/nginx/nginx.pid
    --with-http_ssl_module
    --with-pcre=../pcre2-10.39
    --with-zlib=../zlib-1.3
```



After configuration, nginx is compiled and installed using `make`.