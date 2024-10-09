+++
title = "nginx 如何处理请求"
date = 2023-08-14T16:54:54+08:00
weight = 140
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# How nginx processes a request - nginx 如何处理请求

https://nginx.org/en/docs/http/request_processing.html

## 基于名称的虚拟服务器 Name-based virtual servers

nginx first decides which *server* should process the request. Let’s start with a simple configuration where all three virtual servers listen on port *:80:

​	nginx 首先决定由哪个 *server* 来处理请求。让我们从一个简单的配置开始，其中所有三个虚拟服务器都监听端口 *:80*：

```
server {
    listen      80;
    server_name example.org www.example.org;
    ...
}

server {
    listen      80;
    server_name example.net www.example.net;
    ...
}

server {
    listen      80;
    server_name example.com www.example.com;
    ...
}
```



In this configuration nginx tests only the request’s header field “Host” to determine which server the request should be routed to. If its value does not match any server name, or the request does not contain this header field at all, then nginx will route the request to the default server for this port. In the configuration above, the default server is the first one — which is nginx’s standard default behaviour. It can also be set explicitly which server should be default, with the `default_server` parameter in the [listen](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen) directive:

​	在这个配置中，nginx 仅通过检查请求的 “Host” 头字段来确定该请求应路由到哪个服务器。如果其值与任何服务器名称不匹配，或者请求中根本没有包含该头字段，则 nginx 会将请求路由到该端口的默认服务器。在上述配置中，默认服务器是第一个——这是 nginx 的标准默认行为。也可以通过在 [listen](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen) 指令中使用 `default_server` 参数显式指定默认服务器：

```
server {
    listen      80 default_server;
    server_name example.net www.example.net;
    ...
}
```



The `default_server` parameter has been available since version 0.8.21. In earlier versions the `default` parameter should be used instead.

​	`default_server` 参数自 0.8.21 版本以来可用。在较早的版本中，应该使用 `default` 参数。

Note that the default server is a property of the listen port and not of the server name. More about this later.

​	请注意，默认服务器是监听端口的属性，而不是服务器名称的属性。稍后我们将对此进行更详细的讨论。

## 如何阻止处理未定义服务器名称的请求 How to prevent processing requests with undefined server names

If requests without the “Host” header field should not be allowed, a server that just drops the requests can be defined:

​	如果不希望处理不带 “Host” 头字段的请求，可以定义一个只丢弃这些请求的服务器：

```
server {
    listen      80;
    server_name "";
    return      444;
}
```

Here, the server name is set to an empty string that will match requests without the “Host” header field, and a special nginx’s non-standard code 444 is returned that closes the connection.

​	在这里，服务器名称被设置为空字符串，这将匹配所有不带 “Host” 头字段的请求，并返回 nginx 的非标准状态码 444 来关闭连接。

Since version 0.8.48, this is the default setting for the server name, so the `server_name ""` can be omitted. In earlier versions, the machine’s *hostname* was used as a default server name.

​	自 0.8.48 版本起，这是服务器名称的默认设置，因此可以省略 `server_name ""`。在较早版本中，机器的 *主机名* 被用作默认服务器名称。



## 混合基于名称和基于 IP 的虚拟服务器 Mixed name-based and IP-based virtual servers

Let’s look at a more complex configuration where some virtual servers listen on different addresses:

​	让我们看看一个更复杂的配置，其中一些虚拟服务器监听不同的地址：

```
server {
    listen      192.168.1.1:80;
    server_name example.org www.example.org;
    ...
}

server {
    listen      192.168.1.1:80;
    server_name example.net www.example.net;
    ...
}

server {
    listen      192.168.1.2:80;
    server_name example.com www.example.com;
    ...
}
```

In this configuration, nginx first tests the IP address and port of the request against the [listen](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen) directives of the [server](https://nginx.org/en/docs/http/ngx_http_core_module.html#server) blocks. It then tests the “Host” header field of the request against the [server_name](https://nginx.org/en/docs/http/ngx_http_core_module.html#server_name) entries of the [server](https://nginx.org/en/docs/http/ngx_http_core_module.html#server) blocks that matched the IP address and port. If the server name is not found, the request will be processed by the default server. For example, a request for `www.example.com` received on the 192.168.1.1:80 port will be handled by the default server of the 192.168.1.1:80 port, i.e., by the first server, since there is no `www.example.com` defined for this port.

​	在此配置中，nginx 首先根据请求的 IP 地址和端口匹配 [server](https://nginx.org/en/docs/http/ngx_http_core_module.html#server) 块的 [listen](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen) 指令。然后，nginx 根据匹配的服务器块中的 [server_name](https://nginx.org/en/docs/http/ngx_http_core_module.html#server_name) 条目与请求的 “Host” 头字段进行匹配。如果未找到匹配的服务器名称，则该请求将由默认服务器处理。例如，接收到 192.168.1.1:80 端口上的 `www.example.com` 请求时，将由 192.168.1.1:80 端口的默认服务器处理，即第一个服务器，因为该端口上没有定义 `www.example.com`。

As already stated, a default server is a property of the listen port, and different default servers may be defined for different ports:

​	如前所述，默认服务器是监听端口的属性，并且可以为不同的端口定义不同的默认服务器：

```
server {
    listen      192.168.1.1:80;
    server_name example.org www.example.org;
    ...
}

server {
    listen      192.168.1.1:80 default_server;
    server_name example.net www.example.net;
    ...
}

server {
    listen      192.168.1.2:80 default_server;
    server_name example.com www.example.com;
    ...
}
```





## 简单的 PHP 站点配置 A simple PHP site configuration

Now let’s look at how nginx chooses a *location* to process a request for a typical, simple PHP site:

​	现在让我们看一下 nginx 如何选择 *location* 来处理一个典型的、简单的 PHP 站点请求：

```
server {
    listen      80;
    server_name example.org www.example.org;
    root        /data/www;

    location / {
        index   index.html index.php;
    }

    location ~* \.(gif|jpg|png)$ {
        expires 30d;
    }

    location ~ \.php$ {
        fastcgi_pass  localhost:9000;
        fastcgi_param SCRIPT_FILENAME
                      $document_root$fastcgi_script_name;
        include       fastcgi_params;
    }
}
```



nginx first searches for the most specific prefix location given by literal strings regardless of the listed order. In the configuration above the only prefix location is “`/`” and since it matches any request it will be used as a last resort. Then nginx checks locations given by regular expression in the order listed in the configuration file. The first matching expression stops the search and nginx will use this location. If no regular expression matches a request, then nginx uses the most specific prefix location found earlier.

​	nginx 首先根据字符串字面量查找最具体的前缀位置（prefix location），而不考虑配置文件中的顺序。在上述配置中，唯一的前缀位置是 “`/`”，因为它匹配任何请求，因此会作为最后的选择。然后 nginx 按照配置文件中列出的顺序检查由正则表达式给出的位置（location）。第一个匹配的表达式会停止搜索，nginx 将使用该位置。如果没有正则表达式匹配请求，那么 nginx 会使用之前找到的最具体的前缀位置。

Note that locations of all types test only a URI part of request line without arguments. This is done because arguments in the query string may be given in several ways, for example:

​	请注意，所有类型的位置（location）仅测试请求行的 URI 部分，而不包括参数。这是因为查询字符串中的参数可以用多种方式传递，例如：

```
/index.php?user=john&page=1
/index.php?page=1&user=john
```

Besides, anyone may request anything in the query string:

​	此外，查询字符串中可以包含任何内容：

```
/index.php?page=1&something+else&user=john
```



Now let’s look at how requests would be processed in the configuration above:

​	现在让我们看看在上述配置中如何处理请求：

- A request “`/logo.gif`” is matched by the prefix location “`/`” first and then by the regular expression “`\.(gif|jpg|png)$`”, therefore, it is handled by the latter location. Using the directive “`root /data/www`” the request is mapped to the file `/data/www/logo.gif`, and the file is sent to the client.
- 请求 “`/logo.gif`” 首先被前缀位置 “`/`” 匹配，然后被正则表达式 “`\.(gif|jpg|png)$`” 匹配，因此由后者处理。使用 “`root /data/www`” 指令，该请求被映射到文件 `/data/www/logo.gif`，文件将被发送到客户端。
- A request “`/index.php`” is also matched by the prefix location “`/`” first and then by the regular expression “`\.(php)$`”. Therefore, it is handled by the latter location and the request is passed to a FastCGI server listening on localhost:9000. The [fastcgi_param](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param) directive sets the FastCGI parameter `SCRIPT_FILENAME` to “`/data/www/index.php`”, and the FastCGI server executes the file. The variable `$document_root` is equal to the value of the [root](https://nginx.org/en/docs/http/ngx_http_core_module.html#root) directive and the variable `$fastcgi_script_name` is equal to the request URI, i.e. “`/index.php`”.
- 请求 “`/index.php`” 也首先被前缀位置 “`/`” 匹配，然后被正则表达式 “`\.(php)$`” 匹配。因此由后者处理，该请求被转发到监听 localhost:9000 的 FastCGI 服务器。 [fastcgi_param](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_param) 指令将 FastCGI 参数 `SCRIPT_FILENAME` 设置为 “`/data/www/index.php`”，FastCGI 服务器执行该文件。变量 `$document_root` 等于 [root](https://nginx.org/en/docs/http/ngx_http_core_module.html#root) 指令的值，变量 `$fastcgi_script_name` 等于请求 URI，即 “`/index.php`”。
- A request “`/about.html`” is matched by the prefix location “`/`” only, therefore, it is handled in this location. Using the directive “`root /data/www`” the request is mapped to the file `/data/www/about.html`, and the file is sent to the client.
- 请求 “`/about.html`” 仅被前缀位置 “`/`” 匹配，因此在此位置处理。使用 “`root /data/www`” 指令，该请求被映射到文件 `/data/www/about.html`，文件将被发送到客户端。
- Handling a request “`/`” is more complex. It is matched by the prefix location “`/`” only, therefore, it is handled by this location. Then the [index](https://nginx.org/en/docs/http/ngx_http_index_module.html#index) directive tests for the existence of index files according to its parameters and the “`root /data/www`” directive. If the file `/data/www/index.html` does not exist, and the file `/data/www/index.php` exists, then the directive does an internal redirect to “`/index.php`”, and nginx searches the locations again as if the request had been sent by a client. As we saw before, the redirected request will eventually be handled by the FastCGI server.
- 处理请求 “`/`” 更为复杂。该请求仅被前缀位置 “`/`” 匹配，因此由此位置处理。然后 [index](https://nginx.org/en/docs/http/ngx_http_index_module.html#index) 指令根据其参数和 “`root /data/www`” 指令测试索引文件是否存在。如果 `/data/www/index.html` 文件不存在，而 `/data/www/index.php` 文件存在，则该指令会执行到 “`/index.php`” 的内部重定向，并且 nginx 会像请求是由客户端发送的那样重新搜索位置。正如之前所述，重定向的请求最终会由 FastCGI 服务器处理。



written by Igor Sysoev edited by Brian Mercer 