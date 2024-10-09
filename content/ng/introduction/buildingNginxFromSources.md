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

> 原文：[https://nginx.org/en/docs/configure.html](https://nginx.org/en/docs/configure.html)
>

The build is configured using the `configure` command. It defines various aspects of the system, including the methods nginx is allowed to use for connection processing. At the end it creates a `Makefile`.

​	通过 `configure` 命令配置构建过程。该命令定义了系统的各种属性，包括 nginx 允许使用的连接处理方法。最终，它会创建一个 `Makefile` 文件。

The `configure` command supports the following parameters:

​	`configure` 命令支持以下参数：

- `--help`

  prints a help message. 输出帮助信息。

- `--prefix=path`

  defines a directory that will keep server files. This same directory will also be used for all relative paths set by `configure` (except for paths to libraries sources) and in the `nginx.conf` configuration file. It is set to the `/usr/local/nginx` directory by default.

  定义存放服务器文件的目录。该目录也将用于所有 `configure` 设置的相对路径（库源文件路径除外）和 `nginx.conf` 配置文件。默认设置为 `/usr/local/nginx`。

- `--sbin-path=path`

  sets the name of an nginx executable file. This name is used only during installation. By default the file is named `prefix/sbin/nginx`.

  设置 nginx 可执行文件的名称。此名称仅在安装时使用。默认情况下，文件名为 `prefix/sbin/nginx`。

- `--modules-path=path`

  defines a directory where nginx dynamic modules will be installed. By default the `prefix/modules` directory is used.

  定义存放 nginx 动态模块的目录。默认使用 `prefix/modules` 目录。

- `--conf-path=path`

  sets the name of an `nginx.conf` configuration file. If needs be, nginx can always be started with a different configuration file, by specifying it in the command-line parameter `-c *file*`. By default the file is named `prefix/conf/nginx.conf`.

  设置 `nginx.conf` 配置文件的名称。如有需要，可以通过命令行参数 `-c *文件名*` 指定不同的配置文件来启动 nginx。默认文件名为 `prefix/conf/nginx.conf`。

- `--error-log-path=path`

  sets the name of the primary error, warnings, and diagnostic file. After installation, the file name can always be changed in the `nginx.conf` configuration file using the [error_log](https://nginx.org/en/docs/ngx_core_module.html#error_log) directive. By default the file is named `prefix/logs/error.log`.

  设置主错误、警告和诊断文件的名称。安装后可以在 `nginx.conf` 配置文件中使用 [error_log](https://nginx.org/en/docs/ngx_core_module.html#error_log) 指令更改文件名称。默认文件名为 `prefix/logs/error.log`。

- `--pid-path=path`

  sets the name of an `nginx.pid` file that will store the process ID of the main process. After installation, the file name can always be changed in the `nginx.conf` configuration file using the [pid](https://nginx.org/en/docs/ngx_core_module.html#pid) directive. By default the file is named `prefix/logs/nginx.pid`.

  设置存储主进程 ID 的 `nginx.pid` 文件的名称。安装后可以在 `nginx.conf` 配置文件中使用 [pid](https://nginx.org/en/docs/ngx_core_module.html#pid) 指令更改文件名称。默认文件名为 `prefix/logs/nginx.pid`。

- `--lock-path=path`

  sets a prefix for the names of lock files. After installation, the value can always be changed in the `nginx.conf` configuration file using the [lock_file](https://nginx.org/en/docs/ngx_core_module.html#lock_file) directive. By default the value is `prefix/logs/nginx.lock`.

  设置锁文件名称的前缀。安装后可以在 `nginx.conf` 配置文件中使用 [lock_file](https://nginx.org/en/docs/ngx_core_module.html#lock_file) 指令更改该值。默认值为 `prefix/logs/nginx.lock`。

- `--user=*name*`

  sets the name of an unprivileged user whose credentials will be used by worker processes. After installation, the name can always be changed in the `nginx.conf` configuration file using the [user](https://nginx.org/en/docs/ngx_core_module.html#user) directive. The default user name is nobody.

  设置工作进程使用的非特权用户的名称。安装后可以在 `nginx.conf` 配置文件中使用 [user](https://nginx.org/en/docs/ngx_core_module.html#user) 指令更改用户名。默认用户名为 nobody。

- `--group=*name*`

  sets the name of a group whose credentials will be used by worker processes. After installation, the name can always be changed in the `nginx.conf` configuration file using the [user](https://nginx.org/en/docs/ngx_core_module.html#user) directive. By default, a group name is set to the name of an unprivileged user.

  设置工作进程使用的组名。安装后可以在 `nginx.conf` 配置文件中使用 [user](https://nginx.org/en/docs/ngx_core_module.html#user) 指令更改组名。默认情况下，组名设置为非特权用户的名称。

- `--build=*name*`

  sets an optional nginx build name. 设置可选的 nginx 构建名称。

- `--builddir=path`

  sets a build directory. 设置构建目录。

- `--with-select_module` `--without-select_module`

  enables or disables building a module that allows the server to work with the `select()` method. This module is built automatically if the platform does not appear to support more appropriate methods such as kqueue, epoll, or /dev/poll.

  启用或禁用构建支持 `select()` 方法的模块。如果平台不支持如 kqueue、epoll 或 /dev/poll 等更合适的方法，则该模块会自动构建。

- `--with-poll_module` `--without-poll_module`

  enables or disables building a module that allows the server to work with the `poll()` method. This module is built automatically if the platform does not appear to support more appropriate methods such as kqueue, epoll, or /dev/poll.

  启用或禁用构建支持 `poll()` 方法的模块。如果平台不支持如 kqueue、epoll 或 /dev/poll 等更合适的方法，则该模块会自动构建。

- `--with-threads`

  enables the use of [thread pools](https://nginx.org/en/docs/ngx_core_module.html#thread_pool). 启用 [线程池](https://nginx.org/en/docs/ngx_core_module.html#thread_pool) 的使用。

- `--with-file-aio`

  enables the use of [asynchronous file I/O](https://nginx.org/en/docs/http/ngx_http_core_module.html#aio) (AIO) on FreeBSD and Linux.

  启用 FreeBSD 和 Linux 平台上的 [异步文件 I/O](https://nginx.org/en/docs/http/ngx_http_core_module.html#aio)（AIO）。

- `--with-http_ssl_module`

  enables building a module that adds the [HTTPS protocol support](https://nginx.org/en/docs/http/ngx_http_ssl_module.html) to an HTTP server. This module is not built by default. The OpenSSL library is required to build and run this module.

  启用构建将 [HTTPS 协议支持](https://nginx.org/en/docs/http/ngx_http_ssl_module.html) 添加到 HTTP 服务器的模块。该模块默认不构建。此模块的构建和运行需要 OpenSSL 库。

- `--with-http_v2_module`

  enables building a module that provides support for [HTTP/2](https://nginx.org/en/docs/http/ngx_http_v2_module.html). This module is not built by default.

  启用构建支持 [HTTP/2](https://nginx.org/en/docs/http/ngx_http_v2_module.html) 的模块。该模块默认不构建。

- `--with-http_v3_module`

  enables building a module that provides support for [HTTP/3](https://nginx.org/en/docs/http/ngx_http_v3_module.html). This module is not built by default. An SSL library that provides HTTP/3 support is recommended to build and run this module, such as [BoringSSL](https://boringssl.googlesource.com/boringssl), [LibreSSL](https://www.libressl.org/), or [QuicTLS](https://github.com/quictls/openssl). Otherwise, if using the OpenSSL library, OpenSSL compatibility layer will be used that does not support QUIC [early data](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_early_data).

  启用构建支持 [HTTP/3](https://nginx.org/en/docs/http/ngx_http_v3_module.html) 的模块。该模块默认不构建。建议使用支持 HTTP/3 的 SSL 库（如 [BoringSSL](https://boringssl.googlesource.com/boringssl)、[LibreSSL](https://www.libressl.org/) 或 [QuicTLS](https://github.com/quictls/openssl)）进行构建和运行。否则，如果使用 OpenSSL 库，将使用不支持 QUIC [early data](https://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_early_data) 的 OpenSSL 兼容层。

- `--with-http_realip_module`

  enables building the [ngx_http_realip_module](https://nginx.org/en/docs/http/ngx_http_realip_module.html) module that changes the client address to the address sent in the specified header field. This module is not built by default.

  启用构建 [ngx_http_realip_module](https://nginx.org/en/docs/http/ngx_http_realip_module.html) 模块，该模块将客户端地址更改为指定头字段中发送的地址。该模块默认不构建。

- `--with-http_addition_module`

  enables building the [ngx_http_addition_module](https://nginx.org/en/docs/http/ngx_http_addition_module.html) module that adds text before and after a response. This module is not built by default.

  启用构建 [ngx_http_addition_module](https://nginx.org/en/docs/http/ngx_http_addition_module.html) 模块，该模块在响应之前和之后添加文本。该模块默认不构建。

- `--with-http_xslt_module` `--with-http_xslt_module=dynamic`

  enables building the [ngx_http_xslt_module](https://nginx.org/en/docs/http/ngx_http_xslt_module.html) module that transforms XML responses using one or more XSLT stylesheets. This module is not built by default. The [libxml2](http://xmlsoft.org/) and [libxslt](http://xmlsoft.org/XSLT/) libraries are required to build and run this module.

  启用构建 [ngx_http_xslt_module](https://nginx.org/en/docs/http/ngx_http_xslt_module.html) 模块，该模块使用一个或多个 XSLT 样式表转换 XML 响应。该模块默认不构建。构建和运行该模块需要 [libxml2](http://xmlsoft.org/) 和 [libxslt](http://xmlsoft.org/XSLT/) 库。

- `--with-http_image_filter_module` `--with-http_image_filter_module=dynamic`

  enables building the [ngx_http_image_filter_module](https://nginx.org/en/docs/http/ngx_http_image_filter_module.html) module that transforms images in JPEG, GIF, PNG, and WebP formats. This module is not built by default.

  启用构建 [ngx_http_image_filter_module](https://nginx.org/en/docs/http/ngx_http_image_filter_module.html) 模块，该模块可转换 JPEG、GIF、PNG 和 WebP 格式的图像。该模块默认不构建。

- `--with-http_geoip_module` `--with-http_geoip_module=dynamic`

  enables building the [ngx_http_geoip_module](https://nginx.org/en/docs/http/ngx_http_geoip_module.html) module that creates variables depending on the client IP address and the precompiled [MaxMind](http://www.maxmind.com/) databases. This module is not built by default.

  启用构建 [ngx_http_geoip_module](https://nginx.org/en/docs/http/ngx_http_geoip_module.html) 模块，该模块根据客户端 IP 地址和预编译的 [MaxMind](http://www.maxmind.com/) 数据库创建变量。该模块默认不构建。

- `--with-http_sub_module`

  enables building the [ngx_http_sub_module](https://nginx.org/en/docs/http/ngx_http_sub_module.html) module that modifies a response by replacing one specified string by another. This module is not built by default.

  启用构建 [ngx_http_sub_module](https://nginx.org/en/docs/http/ngx_http_sub_module.html) 模块，该模块通过将一个指定字符串替换为另一个字符串来修改响应。该模块默认不构建。

- `--with-http_dav_module`

  enables building the [ngx_http_dav_module](https://nginx.org/en/docs/http/ngx_http_dav_module.html) module that provides file management automation via the WebDAV protocol. This module is not built by default.

  启用构建 [ngx_http_dav_module](https://nginx.org/en/docs/http/ngx_http_dav_module.html) 模块，该模块通过 WebDAV 协议提供文件管理自动化功能。该模块默认不构建。

- `--with-http_flv_module`

  enables building the [ngx_http_flv_module](https://nginx.org/en/docs/http/ngx_http_flv_module.html) module that provides pseudo-streaming server-side support for Flash Video (FLV) files. This module is not built by default.

  启用构建 [ngx_http_flv_module](https://nginx.org/en/docs/http/ngx_http_flv_module.html) 模块，该模块为 Flash 视频（FLV）文件提供伪流服务器端支持。该模块默认不构建。

- `--with-http_mp4_module`

  enables building the [ngx_http_mp4_module](https://nginx.org/en/docs/http/ngx_http_mp4_module.html) module that provides pseudo-streaming server-side support for MP4 files. This module is not built by default.

  启用构建 [ngx_http_mp4_module](https://nginx.org/en/docs/http/ngx_http_mp4_module.html) 模块，该模块为 MP4 文件提供伪流服务器端支持。该模块默认不构建。

- `--with-http_gunzip_module`

  enables building the [ngx_http_gunzip_module](https://nginx.org/en/docs/http/ngx_http_gunzip_module.html) module that decompresses responses with “`Content-Encoding: gzip`” for clients that do not support “gzip” encoding method. This module is not built by default.

  启用构建 [ngx_http_gunzip_module](https://nginx.org/en/docs/http/ngx_http_gunzip_module.html) 模块，该模块为不支持 “gzip” 编码方法的客户端解压带有 “`Content-Encoding: gzip`” 的响应。该模块默认不构建。

- `--with-http_gzip_static_module`

  enables building the [ngx_http_gzip_static_module](https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html) module that enables sending precompressed files with the “`.gz`” filename extension instead of regular files. This module is not built by default.

  启用构建 [ngx_http_gzip_static_module](https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html) 模块，该模块允许发送带有 “`.gz`” 文件扩展名的预压缩文件来代替常规文件。该模块默认不构建。

- `--with-http_auth_request_module`

  enables building the [ngx_http_auth_request_module](https://nginx.org/en/docs/http/ngx_http_auth_request_module.html) module that implements client authorization based on the result of a subrequest. This module is not built by default.

  启用构建 [ngx_http_auth_request_module](https://nginx.org/en/docs/http/ngx_http_auth_request_module.html) 模块，该模块基于子请求的结果实现客户端授权。该模块默认不构建。

- `--with-http_random_index_module`

  enables building the [ngx_http_random_index_module](https://nginx.org/en/docs/http/ngx_http_random_index_module.html) module that processes requests ending with the slash character (‘`/`’) and picks a random file in a directory to serve as an index file. This module is not built by default.

  启用构建 [ngx_http_random_index_module](https://nginx.org/en/docs/http/ngx_http_random_index_module.html) 模块，该模块处理以斜杠（“`/`”）结尾的请求，并从目录中随机选择一个文件作为索引文件进行响应。该模块默认不构建。

- `--with-http_secure_link_module`

  enables building the [ngx_http_secure_link_module](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html) module. This module is not built by default.

  启用构建 [ngx_http_secure_link_module](https://nginx.org/en/docs/http/ngx_http_secure_link_module.html) 模块。该模块默认不构建。

- `--with-http_degradation_module`

  enables building the `ngx_http_degradation_module` module. This module is not built by default.

  启用构建 `ngx_http_degradation_module` 模块。该模块默认不构建。

- `--with-http_slice_module`

  enables building the [ngx_http_slice_module](https://nginx.org/en/docs/http/ngx_http_slice_module.html) module that splits a request into subrequests, each returning a certain range of response. The module provides more effective caching of big responses. This module is not built by default.

  用构建 [ngx_http_slice_module](https://nginx.org/en/docs/http/ngx_http_slice_module.html) 模块，该模块将请求拆分为子请求，每个子请求返回响应的某个范围。该模块提高了大响应的缓存效率。该模块默认不构建。

- `--with-http_stub_status_module`

  enables building the [ngx_http_stub_status_module](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html) module that provides access to basic status information. This module is not built by default.

  启用构建 [ngx_http_stub_status_module](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html) 模块，该模块提供对基本状态信息的访问。默认不构建此模块。

- `--without-http_charset_module`

  disables building the [ngx_http_charset_module](https://nginx.org/en/docs/http/ngx_http_charset_module.html) module that adds the specified charset to the “Content-Type” response header field and can additionally convert data from one charset to another.

  禁用构建 [ngx_http_charset_module](https://nginx.org/en/docs/http/ngx_http_charset_module.html) 模块，该模块将指定的字符集添加到“Content-Type”响应头字段，并且可以将数据从一种字符集转换为另一种字符集。

- `--without-http_gzip_module`

  disables building a module that [compresses responses](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) of an HTTP server. The zlib library is required to build and run this module.

  禁用构建用于 [压缩 HTTP 服务器响应](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) 的模块。该模块需要 zlib 库来构建和运行。

- `--without-http_ssi_module`

  disables building the [ngx_http_ssi_module](https://nginx.org/en/docs/http/ngx_http_ssi_module.html) module that processes SSI (Server Side Includes) commands in responses passing through it.

  禁用构建 [ngx_http_ssi_module](https://nginx.org/en/docs/http/ngx_http_ssi_module.html) 模块，该模块用于处理响应中经过的 SSI（服务器端包含）命令。

- `--without-http_userid_module`

  disables building the [ngx_http_userid_module](https://nginx.org/en/docs/http/ngx_http_userid_module.html) module that sets cookies suitable for client identification.

  禁用构建 [ngx_http_userid_module](https://nginx.org/en/docs/http/ngx_http_userid_module.html) 模块，该模块用于设置适用于客户端识别的 Cookie。

- `--without-http_access_module`

  disables building the [ngx_http_access_module](https://nginx.org/en/docs/http/ngx_http_access_module.html) module that allows limiting access to certain client addresses.

  禁用构建 [ngx_http_access_module](https://nginx.org/en/docs/http/ngx_http_access_module.html) 模块，该模块允许限制特定客户端地址的访问。

- `--without-http_auth_basic_module`

  disables building the [ngx_http_auth_basic_module](https://nginx.org/en/docs/http/ngx_http_auth_basic_module.html) module that allows limiting access to resources by validating the user name and password using the “HTTP Basic Authentication” protocol.

  禁用构建 [ngx_http_auth_basic_module](https://nginx.org/en/docs/http/ngx_http_auth_basic_module.html) 模块，该模块通过验证用户名和密码来限制资源访问，使用的是“HTTP 基本认证”协议。

- `--without-http_mirror_module`

  disables building the [ngx_http_mirror_module](https://nginx.org/en/docs/http/ngx_http_mirror_module.html) module that implements mirroring of an original request by creating background mirror subrequests.

  禁用构建 [ngx_http_mirror_module](https://nginx.org/en/docs/http/ngx_http_mirror_module.html) 模块，该模块通过创建后台镜像子请求来实现原始请求的镜像。

- `--without-http_autoindex_module`

  disables building the [ngx_http_autoindex_module](https://nginx.org/en/docs/http/ngx_http_autoindex_module.html) module that processes requests ending with the slash character (‘`/`’) and produces a directory listing in case the [ngx_http_index_module](https://nginx.org/en/docs/http/ngx_http_index_module.html) module cannot find an index file.

  禁用构建 [ngx_http_autoindex_module](https://nginx.org/en/docs/http/ngx_http_autoindex_module.html) 模块，该模块用于处理以斜杠字符（‘/’）结尾的请求，并在 [ngx_http_index_module](https://nginx.org/en/docs/http/ngx_http_index_module.html) 模块无法找到索引文件时生成目录列表。

- `--without-http_geo_module`

  disables building the [ngx_http_geo_module](https://nginx.org/en/docs/http/ngx_http_geo_module.html) module that creates variables with values depending on the client IP address.

  禁用构建 [ngx_http_geo_module](https://nginx.org/en/docs/http/ngx_http_geo_module.html) 模块，该模块根据客户端 IP 地址创建变量。

- `--without-http_map_module`

  disables building the [ngx_http_map_module](https://nginx.org/en/docs/http/ngx_http_map_module.html) module that creates variables with values depending on values of other variables.

  禁用构建 [ngx_http_map_module](https://nginx.org/en/docs/http/ngx_http_map_module.html) 模块，该模块根据其他变量的值创建变量。

- `--without-http_split_clients_module`

  disables building the [ngx_http_split_clients_module](https://nginx.org/en/docs/http/ngx_http_split_clients_module.html) module that creates variables for A/B testing.

  禁用构建 [ngx_http_split_clients_module](https://nginx.org/en/docs/http/ngx_http_split_clients_module.html) 模块，该模块用于 A/B 测试时创建变量。

- `--without-http_referer_module`

  disables building the [ngx_http_referer_module](https://nginx.org/en/docs/http/ngx_http_referer_module.html) module that can block access to a site for requests with invalid values in the “Referer” header field.

  禁用构建 [ngx_http_referer_module](https://nginx.org/en/docs/http/ngx_http_referer_module.html) 模块，该模块可以阻止带有无效 “Referer” 头字段值的请求访问站点。

- `--without-http_rewrite_module`

  disables building a module that allows an HTTP server to [redirect requests and change URI of requests](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html). The PCRE library is required to build and run this module.

  禁用构建允许 HTTP 服务器 [重定向请求和更改请求 URI](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html) 的模块。构建和运行此模块需要 PCRE 库。

- `--without-http_proxy_module`

  disables building an HTTP server [proxying module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html).

  禁用构建 HTTP 服务器的 [代理模块](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)。

- `--without-http_fastcgi_module`

  disables building the [ngx_http_fastcgi_module](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html) module that passes requests to a FastCGI server.

  禁用构建 [ngx_http_fastcgi_module](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html) 模块，该模块将请求传递给 FastCGI 服务器。

- `--without-http_uwsgi_module`

  disables building the [ngx_http_uwsgi_module](https://nginx.org/en/docs/http/ngx_http_uwsgi_module.html) module that passes requests to a uwsgi server.

  禁用构建 [ngx_http_uwsgi_module](https://nginx.org/en/docs/http/ngx_http_uwsgi_module.html) 模块，该模块将请求传递给 uwsgi 服务器。

- `--without-http_scgi_module`

  disables building the [ngx_http_scgi_module](https://nginx.org/en/docs/http/ngx_http_scgi_module.html) module that passes requests to an SCGI server.

  禁用构建 [ngx_http_scgi_module](https://nginx.org/en/docs/http/ngx_http_scgi_module.html) 模块，该模块将请求传递给 SCGI 服务器。

- `--without-http_grpc_module`

  disables building the [ngx_http_grpc_module](https://nginx.org/en/docs/http/ngx_http_grpc_module.html) module that passes requests to a gRPC server.

  禁用构建 [ngx_http_grpc_module](https://nginx.org/en/docs/http/ngx_http_grpc_module.html) 模块，该模块将请求传递给 gRPC 服务器。

- `--without-http_memcached_module`

  disables building the [ngx_http_memcached_module](https://nginx.org/en/docs/http/ngx_http_memcached_module.html) module that obtains responses from a memcached server.

  禁用构建 [ngx_http_memcached_module](https://nginx.org/en/docs/http/ngx_http_memcached_module.html) 模块，该模块从 memcached 服务器获取响应。

- `--without-http_limit_conn_module`

  disables building the [ngx_http_limit_conn_module](https://nginx.org/en/docs/http/ngx_http_limit_conn_module.html) module that limits the number of connections per key, for example, the number of connections from a single IP address.

  禁用构建 [ngx_http_limit_conn_module](https://nginx.org/en/docs/http/ngx_http_limit_conn_module.html) 模块，该模块限制每个键（例如单个 IP 地址）的连接数。

- `--without-http_limit_req_module`

  disables building the [ngx_http_limit_req_module](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html) module that limits the request processing rate per key, for example, the processing rate of requests coming from a single IP address.

  禁用构建 [ngx_http_limit_req_module](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html) 模块，该模块限制每个键（例如单个 IP 地址）的请求处理速率。

- `--without-http_empty_gif_module`

  disables building a module that [emits single-pixel transparent GIF](https://nginx.org/en/docs/http/ngx_http_empty_gif_module.html).

  禁用构建用于 [发出单像素透明 GIF](https://nginx.org/en/docs/http/ngx_http_empty_gif_module.html) 的模块。

- `--without-http_browser_module`

  disables building the [ngx_http_browser_module](https://nginx.org/en/docs/http/ngx_http_browser_module.html) module that creates variables whose values depend on the value of the “User-Agent” request header field.

  禁用构建 [ngx_http_browser_module](https://nginx.org/en/docs/http/ngx_http_browser_module.html) 模块，该模块根据 “User-Agent” 请求头字段的值创建变量。

- `--without-http_upstream_hash_module`

  disables building a module that implements the [hash](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#hash) load balancing method.

  禁用构建实现 [哈希](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#hash) 负载均衡方法的模块。

- `--without-http_upstream_ip_hash_module`

  disables building a module that implements the [ip_hash](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#ip_hash) load balancing method.

  禁用构建实现 [ip_hash](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#ip_hash) 负载均衡方法的模块。

- `--without-http_upstream_least_conn_module`

  disables building a module that implements the [least_conn](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#least_conn) load balancing method.

  禁用构建实现 [least_conn](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#least_conn) 负载均衡方法的模块。

- `--without-http_upstream_random_module`

  disables building a module that implements the [random](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#random) load balancing method.

  禁用构建实现 [random](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#random) 负载均衡方法的模块。

- `--without-http_upstream_keepalive_module`

  disables building a module that provides [caching of connections](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive) to upstream servers.

  禁用构建用于 [上游服务器连接缓存](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive) 的模块。

- `--without-http_upstream_zone_module`

  disables building a module that makes it possible to store run-time state of an upstream group in a shared memory [zone](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#zone).

  禁用构建该模块，使其能够将上游组的运行时状态存储在共享内存 [zone](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#zone) 中。

- `--with-http_perl_module` `--with-http_perl_module=dynamic`

  enables building the [embedded Perl module](https://nginx.org/en/docs/http/ngx_http_perl_module.html). This module is not built by default.

  启用构建 [嵌入式 Perl 模块](https://nginx.org/en/docs/http/ngx_http_perl_module.html)。默认不构建该模块。

- `--with-perl_modules_path=path`

  defines a directory that will keep Perl modules.

  指定保存 Perl 模块的目录。

- `--with-perl=path`

  sets the name of the Perl binary.

  设置 Perl 二进制文件的名称。

- `--http-log-path=path`

  sets the name of the primary request log file of the HTTP server. After installation, the file name can always be changed in the `nginx.conf` configuration file using the [access_log](https://nginx.org/en/docs/http/ngx_http_log_module.html#access_log) directive. By default the file is named `prefix/logs/access.log`.

  设置 HTTP 服务器的主请求日志文件名称。安装后，可以在 `nginx.conf` 配置文件中使用 [access_log](https://nginx.org/en/docs/http/ngx_http_log_module.html#access_log) 指令更改文件名称。默认情况下，该文件名为 `prefix/logs/access.log`。

- `--http-client-body-temp-path=path`

  defines a directory for storing temporary files that hold client request bodies. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [client_body_temp_path](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_body_temp_path) directive. By default the directory is named `prefix/client_body_temp`.

  定义用于存储包含客户端请求主体的临时文件的目录。安装后，可以在 `nginx.conf` 配置文件中使用 [client_body_temp_path](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_body_temp_path) 指令更改目录名称。默认情况下，目录名为 `prefix/client_body_temp`。

- `--http-proxy-temp-path=path`

  defines a directory for storing temporary files with data received from proxied servers. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [proxy_temp_path](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_temp_path) directive. By default the directory is named `prefix/proxy_temp`.

  定义用于存储从代理服务器接收数据的临时文件的目录。安装后，可以在 `nginx.conf` 配置文件中使用 [proxy_temp_path](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_temp_path) 指令更改目录名称。默认情况下，目录名为 `*prefix*/proxy_temp`。

- `--http-fastcgi-temp-path=path`

  defines a directory for storing temporary files with data received from FastCGI servers. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [fastcgi_temp_path](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_temp_path) directive. By default the directory is named `prefix/fastcgi_temp`.

  定义用于存储从 FastCGI 服务器接收数据的临时文件的目录。安装后，可以在 `nginx.conf` 配置文件中使用 [fastcgi_temp_path](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_temp_path) 指令更改目录名称。默认情况下，目录名为 `*prefix*/fastcgi_temp`。

- `--http-uwsgi-temp-path=path`

  defines a directory for storing temporary files with data received from uwsgi servers. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [uwsgi_temp_path](https://nginx.org/en/docs/http/ngx_http_uwsgi_module.html#uwsgi_temp_path) directive. By default the directory is named `prefix/uwsgi_temp`.

  定义用于存储从 uwsgi 服务器接收数据的临时文件的目录。安装后，可以在 `nginx.conf` 配置文件中使用 [uwsgi_temp_path](https://nginx.org/en/docs/http/ngx_http_uwsgi_module.html#uwsgi_temp_path) 指令更改目录名称。默认情况下，目录名为 `*prefix*/uwsgi_temp`。

- `--http-scgi-temp-path=path`

  defines a directory for storing temporary files with data received from SCGI servers. After installation, the directory can always be changed in the `nginx.conf` configuration file using the [scgi_temp_path](https://nginx.org/en/docs/http/ngx_http_scgi_module.html#scgi_temp_path) directive. By default the directory is named `prefix/scgi_temp`.

  定义用于存储从 SCGI 服务器接收数据的临时文件的目录。安装后，可以在 `nginx.conf` 配置文件中使用 [scgi_temp_path](https://nginx.org/en/docs/http/ngx_http_scgi_module.html#scgi_temp_path) 指令更改目录名称。默认情况下，目录名为 `*prefix*/scgi_temp`。

- `--without-http`

  disables the [HTTP](https://nginx.org/en/docs/http/ngx_http_core_module.html) server.

  禁用 [HTTP](https://nginx.org/en/docs/http/ngx_http_core_module.html) 服务器。

- `--without-http-cache`

  disables HTTP cache.

  禁用 HTTP 缓存。

- `--with-mail` `--with-mail=dynamic`

  enables POP3/IMAP4/SMTP [mail proxy](https://nginx.org/en/docs/mail/ngx_mail_core_module.html) server.

  启用 POP3/IMAP4/SMTP [邮件代理](https://nginx.org/en/docs/mail/ngx_mail_core_module.html)服务器。

- `--with-mail_ssl_module`

  enables building a module that adds the [SSL/TLS protocol support](https://nginx.org/en/docs/mail/ngx_mail_ssl_module.html) to the mail proxy server. This module is not built by default. The OpenSSL library is required to build and run this module.

  启用构建一个为邮件代理服务器添加 [SSL/TLS 协议支持](https://nginx.org/en/docs/mail/ngx_mail_ssl_module.html) 的模块。此模块默认不会被构建。构建和运行此模块需要 OpenSSL 库。

- `--without-mail_pop3_module`

  disables the [POP3](https://nginx.org/en/docs/mail/ngx_mail_pop3_module.html) protocol in mail proxy server.

  禁用邮件代理服务器中的 [POP3](https://nginx.org/en/docs/mail/ngx_mail_pop3_module.html) 协议。

- `--without-mail_imap_module`

  disables the [IMAP](https://nginx.org/en/docs/mail/ngx_mail_imap_module.html) protocol in mail proxy server.

  禁用邮件代理服务器中的 [IMAP](https://nginx.org/en/docs/mail/ngx_mail_imap_module.html) 协议。

- `--without-mail_smtp_module`

  disables the [SMTP](https://nginx.org/en/docs/mail/ngx_mail_smtp_module.html) protocol in mail proxy server.

  禁用邮件代理服务器中的 [SMTP](https://nginx.org/en/docs/mail/ngx_mail_smtp_module.html) 协议。

- `--with-stream` `--with-stream=dynamic`

  enables building the [stream module](https://nginx.org/en/docs/stream/ngx_stream_core_module.html) for generic TCP/UDP proxying and load balancing. This module is not built by default.

  启用构建用于通用 TCP/UDP 代理和负载均衡的 [stream 模块](https://nginx.org/en/docs/stream/ngx_stream_core_module.html)。此模块默认不会被构建。

- `--with-stream_ssl_module`

  enables building a module that adds the [SSL/TLS protocol support](https://nginx.org/en/docs/stream/ngx_stream_ssl_module.html) to the stream module. This module is not built by default. The OpenSSL library is required to build and run this module.

  启用构建一个为 stream 模块添加 [SSL/TLS 协议支持](https://nginx.org/en/docs/stream/ngx_stream_ssl_module.html) 的模块。此模块默认不会被构建。构建和运行此模块需要 OpenSSL 库。

- `--with-stream_realip_module`

  enables building the [ngx_stream_realip_module](https://nginx.org/en/docs/stream/ngx_stream_realip_module.html) module that changes the client address to the address sent in the PROXY protocol header. This module is not built by default.

  启用构建 [ngx_stream_realip_module](https://nginx.org/en/docs/stream/ngx_stream_realip_module.html) 模块，该模块将客户端地址更改为 PROXY 协议头中发送的地址。此模块默认不会被构建。

- `--with-stream_geoip_module` `--with-stream_geoip_module=dynamic`

  enables building the [ngx_stream_geoip_module](https://nginx.org/en/docs/stream/ngx_stream_geoip_module.html) module that creates variables depending on the client IP address and the precompiled [MaxMind](http://www.maxmind.com/) databases. This module is not built by default.

  启用构建 [ngx_stream_geoip_module](https://nginx.org/en/docs/stream/ngx_stream_geoip_module.html) 模块，该模块根据客户端 IP 地址和预编译的 [MaxMind](http://www.maxmind.com/) 数据库创建变量。此模块默认不会被构建。

- `--with-stream_ssl_preread_module`

  enables building the [ngx_stream_ssl_preread_module](https://nginx.org/en/docs/stream/ngx_stream_ssl_preread_module.html) module that allows extracting information from the [ClientHello](https://datatracker.ietf.org/doc/html/rfc5246#section-7.4.1.2) message without terminating SSL/TLS. This module is not built by default.

  启用构建 [ngx_stream_ssl_preread_module](https://nginx.org/en/docs/stream/ngx_stream_ssl_preread_module.html) 模块，该模块允许在不终止 SSL/TLS 的情况下从 [ClientHello](https://datatracker.ietf.org/doc/html/rfc5246#section-7.4.1.2) 消息中提取信息。此模块默认不会被构建。

- `--without-stream_limit_conn_module`

  disables building the [ngx_stream_limit_conn_module](https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html) module that limits the number of connections per key, for example, the number of connections from a single IP address.

  禁用构建 [ngx_stream_limit_conn_module](https://nginx.org/en/docs/stream/ngx_stream_limit_conn_module.html) 模块，该模块用于限制每个键的连接数，例如，来自单个 IP 地址的连接数。

- `--without-stream_access_module`

  disables building the [ngx_stream_access_module](https://nginx.org/en/docs/stream/ngx_stream_access_module.html) module that allows limiting access to certain client addresses.

  禁用构建 [ngx_stream_access_module](https://nginx.org/en/docs/stream/ngx_stream_access_module.html) 模块，该模块允许限制对特定客户端地址的访问。

- `--without-stream_geo_module`

  disables building the [ngx_stream_geo_module](https://nginx.org/en/docs/stream/ngx_stream_geo_module.html) module that creates variables with values depending on the client IP address.

  禁用构建 [ngx_stream_geo_module](https://nginx.org/en/docs/stream/ngx_stream_geo_module.html) 模块，该模块根据客户端 IP 地址创建变量。

- `--without-stream_map_module`

  disables building the [ngx_stream_map_module](https://nginx.org/en/docs/stream/ngx_stream_map_module.html) module that creates variables with values depending on values of other variables.

  禁用构建 [ngx_stream_map_module](https://nginx.org/en/docs/stream/ngx_stream_map_module.html) 模块，该模块根据其他变量的值创建变量。

- `--without-stream_split_clients_module`

  disables building the [ngx_stream_split_clients_module](https://nginx.org/en/docs/stream/ngx_stream_split_clients_module.html) module that creates variables for A/B testing.

  禁用构建 [ngx_stream_split_clients_module](https://nginx.org/en/docs/stream/ngx_stream_split_clients_module.html) 模块，该模块用于 A/B 测试创建变量。

- `--without-stream_return_module`

  disables building the [ngx_stream_return_module](https://nginx.org/en/docs/stream/ngx_stream_return_module.html) module that sends some specified value to the client and then closes the connection.

  禁用构建 [ngx_stream_return_module](https://nginx.org/en/docs/stream/ngx_stream_return_module.html) 模块，该模块向客户端发送指定值并关闭连接。

- `--without-stream_set_module`

  disables building the [ngx_stream_set_module](https://nginx.org/en/docs/stream/ngx_stream_set_module.html) module that sets a value for a variable.

  禁用构建 [ngx_stream_set_module](https://nginx.org/en/docs/stream/ngx_stream_set_module.html) 模块，该模块用于为变量设置值。

- `--without-stream_upstream_hash_module`

  disables building a module that implements the [hash](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#hash) load balancing method.

  禁用构建实现 [hash](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#hash) 负载均衡方法的模块。

- `--without-stream_upstream_least_conn_module`

  disables building a module that implements the [least_conn](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#least_conn) load balancing method.

  禁用构建实现 [least_conn](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#least_conn) 负载均衡方法的模块。

- `--without-stream_upstream_random_module`

  disables building a module that implements the [random](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#random) load balancing method.

  禁用构建实现 [random](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#random) 负载均衡方法的模块。

- `--without-stream_upstream_zone_module`

  disables building a module that makes it possible to store run-time state of an upstream group in a shared memory [zone](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#zone).

  禁用构建使其能够在共享内存 [zone](https://nginx.org/en/docs/stream/ngx_stream_upstream_module.html#zone) 中存储上游组运行时状态的模块。

- `--with-google_perftools_module`

  enables building the [ngx_google_perftools_module](https://nginx.org/en/docs/ngx_google_perftools_module.html) module that enables profiling of nginx worker processes using [Google Performance Tools](https://github.com/gperftools/gperftools). The module is intended for nginx developers and is not built by default.

  启用构建 [ngx_google_perftools_module](https://nginx.org/en/docs/ngx_google_perftools_module.html) 模块，该模块使用 [Google 性能工具](https://github.com/gperftools/gperftools) 来分析 nginx 工作进程的性能。该模块面向 nginx 开发人员，默认不会被构建。

- `--with-cpp_test_module`

  enables building the `ngx_cpp_test_module` module.

  启用构建 `ngx_cpp_test_module` 模块。

- `--add-module=path`

  enables an external module.

  启用外部模块。

- `--add-dynamic-module=path`

  enables an external dynamic module.

  启用外部动态模块。

- `--with-compat`

  enables dynamic modules compatibility.

  启用动态模块兼容性。

- `--with-cc=path`

  sets the name of the C compiler.

  设置 C 编译器的名称。

- `--with-cpp=path`

  sets the name of the C preprocessor.

  设置 C 预处理器的名称。

- `--with-cc-opt=*parameters*`

  sets additional parameters that will be added to the CFLAGS variable. When using the system PCRE library under FreeBSD, `--with-cc-opt="-I /usr/local/include"` should be specified. If the number of files supported by `select()` needs to be increased it can also be specified here such as this: `--with-cc-opt="-D FD_SETSIZE=2048"`.

  设置将添加到 CFLAGS 变量中的附加参数。在 FreeBSD 系统中使用系统 PCRE 库时，应指定 `--with-cc-opt="-I /usr/local/include"`。如果需要增加 `select()` 支持的文件数量，也可以在这里指定，例如：`--with-cc-opt="-D FD_SETSIZE=2048"`。

- `--with-ld-opt=*parameters*`

  sets additional parameters that will be used during linking. When using the system PCRE library under FreeBSD, `--with-ld-opt="-L /usr/local/lib"` should be specified.

  设置链接时使用的附加参数。在 FreeBSD 系统中使用系统 PCRE 库时，应指定 `--with-ld-opt="-L /usr/local/lib"`。

- `--with-cpu-opt=*cpu*`

  enables building per specified CPU: `pentium`, `pentiumpro`, `pentium3`, `pentium4`, `athlon`, `opteron`, `sparc32`, `sparc64`, `ppc64`.

  启用针对特定 CPU 的构建：`pentium`、`pentiumpro`、`pentium3`、`pentium4`、`athlon`、`opteron`、`sparc32`、`sparc64`、`ppc64`。

- `--without-pcre`

  disables the usage of the PCRE library.

  禁用使用 PCRE 库。

- `--with-pcre`

  forces the usage of the PCRE library.

  强制使用 PCRE 库。

- `--with-pcre=path`

  sets the path to the sources of the PCRE library. The library distribution needs to be downloaded from the [PCRE](http://www.pcre.org/) site and extracted. The rest is done by nginx’s `./configure` and `make`. The library is required for regular expressions support in the [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location) directive and for the [ngx_http_rewrite_module](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html) module.

  设置 PCRE 库的源路径。需要从 [PCRE](http://www.pcre.org/) 网站下载库的分发版并解压缩。其余部分由 nginx 的 `./configure` 和 `make` 完成。该库是 [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location) 指令和 [ngx_http_rewrite_module](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html) 模块中正则表达式支持所必需的。

- `--with-pcre-opt=*parameters*`

  sets additional build options for PCRE.

  设置 PCRE 的附加构建选项。

- `--with-pcre-jit`

  builds the PCRE library with “just-in-time compilation” support (1.1.12, the [pcre_jit](https://nginx.org/en/docs/ngx_core_module.html#pcre_jit) directive).

  使用“即时编译”支持构建 PCRE 库（1.1.12，[pcre_jit](https://nginx.org/en/docs/ngx_core_module.html#pcre_jit) 指令）。

- `--without-pcre2`

  disables use of the PCRE2 library instead of the original PCRE library (1.21.5).

  禁用使用 PCRE2 库来代替原始的 PCRE 库（1.21.5）。

- `--with-zlib=path`

  sets the path to the sources of the zlib library. The library distribution needs to be downloaded from the [zlib](http://zlib.net/) site and extracted. The rest is done by nginx’s `./configure` and `make`. The library is required for the [ngx_http_gzip_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) module.

  设置 zlib 库的源路径。需要从 [zlib](http://zlib.net/) 网站下载库的分发版并解压缩。其余部分由 nginx 的 `./configure` 和 `make` 完成。该库是 [ngx_http_gzip_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) 模块所必需的。

- `--with-zlib-opt=*parameters*`

  sets additional build options for zlib.

  设置 zlib 的附加构建选项。

- `--with-zlib-asm=*cpu*`

  enables the use of the zlib assembler sources optimized for one of the specified CPUs: `pentium`, `pentiumpro`.

  启用使用针对以下 CPU 优化的 zlib 汇编源代码：`pentium`、`pentiumpro`。

- `--with-libatomic`

  forces the libatomic_ops library usage.

  强制使用 libatomic_ops 库。

- `--with-libatomic=path`

  sets the path to the libatomic_ops library sources.

  设置 libatomic_ops 库的源路径。

- `--with-openssl=path`

  sets the path to the OpenSSL library sources.

  设置 OpenSSL 库的源路径。

- `--with-openssl-opt=*parameters*`

  sets additional build options for OpenSSL.

  设置 OpenSSL 的附加构建选项。

- `--with-debug`

  enables the [debugging log](https://nginx.org/en/docs/debugging_log.html).
  
  启用 [调试日志](https://nginx.org/en/docs/debugging_log.html)。



Example of parameters usage (all of this needs to be typed in one line):

​	参数使用示例（所有内容需要在一行中输入）：

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

​	配置完成后，使用 `make` 编译并安装 nginx。