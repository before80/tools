+++
title = "ngx_mail_auth_http_module"
date = 2023-08-15T08:21:07+08:00
weight = 610
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# Module ngx_mail_auth_http_module

https://nginx.org/en/docs/mail/ngx_mail_auth_http_module.html



## Directives



### auth_http

  Syntax:`auth_http URL;`

  Default: —

  Context: `mail`, `server`


Sets the URL of the HTTP authentication server. The protocol is described [below](https://nginx.org/en/docs/mail/ngx_mail_auth_http_module.html#protocol).



### auth_http_header

  Syntax:`auth_http_header header value;`

  Default: —

  Context: `mail`, `server`


Appends the specified header to requests sent to the authentication server. This header can be used as the shared secret to verify that the request comes from nginx. For example:

```
auth_http_header X-Auth-Key "secret_string";
```





### auth_http_pass_client_cert

  Syntax:`auth_http_pass_client_cert on | off;`

  Default: `auth_http_pass_client_cert off;`

  Context: `mail`, `server`


This directive appeared in version 1.7.11.

Appends the “Auth-SSL-Cert” header with the [client](https://nginx.org/en/docs/mail/ngx_mail_ssl_module.html#ssl_verify_client) certificate in the PEM format (urlencoded) to requests sent to the authentication server.



### auth_http_timeout

  Syntax:`auth_http_timeout time;`

  Default: `auth_http_timeout 60s;`

  Context: `mail`, `server`


Sets the timeout for communication with the authentication server.



## Protocol

The HTTP protocol is used to communicate with the authentication server. The data in the response body is ignored, the information is passed only in the headers.

Examples of requests and responses:

Request:

```
GET /auth HTTP/1.0
Host: localhost
Auth-Method: plain # plain/apop/cram-md5/external
Auth-User: user
Auth-Pass: password
Auth-Protocol: imap # imap/pop3/smtp
Auth-Login-Attempt: 1
Client-IP: 192.0.2.42
Client-Host: client.example.org
```

Good response:

```
HTTP/1.0 200 OK
Auth-Status: OK
Auth-Server: 198.51.100.1
Auth-Port: 143
```

Bad response:

```
HTTP/1.0 200 OK
Auth-Status: Invalid login or password
Auth-Wait: 3
```



If there is no “Auth-Wait” header, an error will be returned and the connection will be closed. The current implementation allocates memory for each authentication attempt. The memory is freed only at the end of a session. Therefore, the number of invalid authentication attempts in a single session must be limited — the server must respond without the “Auth-Wait” header after 10-20 attempts (the attempt number is passed in the “Auth-Login-Attempt” header).

When the APOP or CRAM-MD5 are used, request-response will look as follows:

```
GET /auth HTTP/1.0
Host: localhost
Auth-Method: apop
Auth-User: user
Auth-Salt: <238188073.1163692009@mail.example.com>
Auth-Pass: auth_response
Auth-Protocol: imap
Auth-Login-Attempt: 1
Client-IP: 192.0.2.42
Client-Host: client.example.org
```

Good response:

```
HTTP/1.0 200 OK
Auth-Status: OK
Auth-Server: 198.51.100.1
Auth-Port: 143
Auth-Pass: plain-text-pass
```



If the “Auth-User” header exists in the response, it overrides the username used to authenticate with the backend.

For the SMTP, the response additionally takes into account the “Auth-Error-Code” header — if exists, it is used as a response code in case of an error. Otherwise, the 535 5.7.0 code will be added to the “Auth-Status” header.

For example, if the following response is received from the authentication server:

```
HTTP/1.0 200 OK
Auth-Status: Temporary server problem, try again later
Auth-Error-Code: 451 4.3.0
Auth-Wait: 3
```

then the SMTP client will receive an error

```
451 4.3.0 Temporary server problem, try again later
```



If proxying SMTP does not require authentication, the request will look as follows:

```
GET /auth HTTP/1.0
Host: localhost
Auth-Method: none
Auth-User:
Auth-Pass:
Auth-Protocol: smtp
Auth-Login-Attempt: 1
Client-IP: 192.0.2.42
Client-Host: client.example.org
Auth-SMTP-Helo: client.example.org
Auth-SMTP-From: MAIL FROM: <>
Auth-SMTP-To: RCPT TO: <postmaster@mail.example.com>
```



For the SSL/TLS client connection (1.7.11), the “Auth-SSL” header is added, and “Auth-SSL-Verify” will contain the result of client certificate verification, if [enabled](https://nginx.org/en/docs/mail/ngx_mail_ssl_module.html#ssl_verify_client): “`SUCCESS`”, “`FAILED:` `reason`”, and “`NONE`” if a certificate was not present.

Prior to version 1.11.7, the “`FAILED`” result did not contain the `reason` string.

When the client certificate was present, its details are passed in the following request headers: “Auth-SSL-Subject”, “Auth-SSL-Issuer”, “Auth-SSL-Serial”, and “Auth-SSL-Fingerprint”. If [auth_http_pass_client_cert](https://nginx.org/en/docs/mail/ngx_mail_auth_http_module.html#auth_http_pass_client_cert) is enabled, the certificate itself is passed in the “Auth-SSL-Cert” header. The protocol and cipher of the established connection are passed in the “Auth-SSL-Protocol” and “Auth-SSL-Cipher” headers (1.21.2). The request will look as follows:

```
GET /auth HTTP/1.0
Host: localhost
Auth-Method: plain
Auth-User: user
Auth-Pass: password
Auth-Protocol: imap
Auth-Login-Attempt: 1
Client-IP: 192.0.2.42
Auth-SSL: on
Auth-SSL-Protocol: TLSv1.3
Auth-SSL-Cipher: TLS_AES_256_GCM_SHA384
Auth-SSL-Verify: SUCCESS
Auth-SSL-Subject: /CN=example.com
Auth-SSL-Issuer: /CN=example.com
Auth-SSL-Serial: C07AD56B846B5BFF
Auth-SSL-Fingerprint: 29d6a80a123d13355ed16b4b04605e29cb55a5ad
```





When the [PROXY protocol](https://nginx.org/en/docs/mail/ngx_mail_core_module.html#proxy_protocol) is used, its details are passed in the following request headers: “Proxy-Protocol-Addr”, “Proxy-Protocol-Port”, “Proxy-Protocol-Server-Addr”, and “Proxy-Protocol-Server-Port” (1.19.8).