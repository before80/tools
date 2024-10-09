+++
title = "ngx_http_ssl_module"
date = 2023-08-15T08:19:07+08:00
weight = 490
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_ssl_module

https://nginx.org/en/docs/http/ngx_http_ssl_module.html



The `ngx_http_ssl_module` module provides the necessary support for HTTPS.

This module is not built by default, it should be enabled with the `--with-http_ssl_module` configuration parameter.

This module requires the [OpenSSL](http://www.openssl.org/) library.





## Example Configuration

To reduce the processor load it is recommended to

- set the number of [worker processes]({{< ref "ng/mod_ref/ngx_core_module#worker_processes">}}) equal to the number of processors,
- enable [keep-alive]({{< ref "ng/mod_ref/ngx_http_core_module#keepalive_timeout">}}) connections,
- enable the [shared]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_session_cache_shared">}}) session cache,
- disable the [built-in]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_session_cache_builtin">}}) session cache,
- and possibly increase the session [lifetime]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_session_timeout">}}) (by default, 5 minutes):



```
worker_processes auto;

http {

    ...

    server {
        listen              443 ssl;
        keepalive_timeout   70;

        ssl_protocols       TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
        ssl_ciphers         AES128-SHA:AES256-SHA:RC4-SHA:DES-CBC3-SHA:RC4-MD5;
        ssl_certificate     /usr/local/nginx/conf/cert.pem;
        ssl_certificate_key /usr/local/nginx/conf/cert.key;
        ssl_session_cache   shared:SSL:10m;
        ssl_session_timeout 10m;

        ...
    }
```





## Directives



### ssl

  Syntax:  `ssl on | off;`

  Default: `ssl off;`

  Context: `http`, `server`


This directive was made obsolete in version 1.15.0 and was removed in version 1.25.1. The `ssl` parameter of the [listen]({{< ref "ng/mod_ref/ngx_http_core_module#listen">}}) directive should be used instead.



### ssl_buffer_size

  Syntax:`ssl_buffer_size size;`

  Default: `ssl_buffer_size 16k;`

  Context: `http`, `server`


This directive appeared in version 1.5.9.

Sets the size of the buffer used for sending data.

By default, the buffer size is 16k, which corresponds to minimal overhead when sending big responses. To minimize Time To First Byte it may be beneficial to use smaller values, for example:

```
ssl_buffer_size 4k;
```





### ssl_certificate

  Syntax:`ssl_certificate file;`

  Default: —

  Context: `http`, `server`


Specifies a `file` with the certificate in the PEM format for the given virtual server. If intermediate certificates should be specified in addition to a primary certificate, they should be specified in the same file in the following order: the primary certificate comes first, then the intermediate certificates. A secret key in the PEM format may be placed in the same file.

Since version 1.11.0, this directive can be specified multiple times to load certificates of different types, for example, RSA and ECDSA:

```
server {
    listen              443 ssl;
    server_name         example.com;

    ssl_certificate     example.com.rsa.crt;
    ssl_certificate_key example.com.rsa.key;

    ssl_certificate     example.com.ecdsa.crt;
    ssl_certificate_key example.com.ecdsa.key;

    ...
}
```



Only OpenSSL 1.0.2 or higher supports separate [certificate chains](https://nginx.org/en/docs/http/configuring_https_servers.html#chains) for different certificates. With older versions, only one certificate chain can be used.



Since version 1.15.9, variables can be used in the `file` name when using OpenSSL 1.0.2 or higher:

```
ssl_certificate     $ssl_server_name.crt;
ssl_certificate_key $ssl_server_name.key;
```

Note that using variables implies that a certificate will be loaded for each SSL handshake, and this may have a negative impact on performance.



The value `data`:`$variable` can be specified instead of the `file` (1.15.10), which loads a certificate from a variable without using intermediate files. Note that inappropriate use of this syntax may have its security implications, such as writing secret key data to [error log]({{< ref "ng/mod_ref/ngx_core_module#error_log">}}).

It should be kept in mind that due to the HTTPS protocol limitations for maximum interoperability virtual servers should listen on [different IP addresses](https://nginx.org/en/docs/http/configuring_https_servers.html#name_based_https_servers).



### ssl_certificate_key

  Syntax:`ssl_certificate_key file;`

  Default: —

  Context: `http`, `server`


Specifies a `file` with the secret key in the PEM format for the given virtual server.

The value `engine`:`name`:`id` can be specified instead of the `file` (1.7.9), which loads a secret key with a specified `id` from the OpenSSL engine `name`.



The value `data`:`$variable` can be specified instead of the `file` (1.15.10), which loads a secret key from a variable without using intermediate files. Note that inappropriate use of this syntax may have its security implications, such as writing secret key data to [error log]({{< ref "ng/mod_ref/ngx_core_module#error_log">}}).

Since version 1.15.9, variables can be used in the `file` name when using OpenSSL 1.0.2 or higher.



### ssl_ciphers

  Syntax:  `ssl_ciphers ciphers;`

  Default: `ssl_ciphers HIGH:!aNULL:!MD5;`

  Context: `http`, `server`


Specifies the enabled ciphers. The ciphers are specified in the format understood by the OpenSSL library, for example:

```
ssl_ciphers ALL:!aNULL:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
```



The full list can be viewed using the “`openssl ciphers`” command.



The previous versions of nginx used [different](https://nginx.org/en/docs/http/configuring_https_servers.html#compatibility) ciphers by default.





### ssl_client_certificate

  Syntax:`ssl_client_certificate file;`

  Default: —

  Context: `http`, `server`


Specifies a `file` with trusted CA certificates in the PEM format used to [verify]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_verify_client">}}) client certificates and OCSP responses if [ssl_stapling]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_stapling">}}) is enabled.

The list of certificates will be sent to clients. If this is not desired, the [ssl_trusted_certificate]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_trusted_certificate">}}) directive can be used.



### ssl_conf_command

  Syntax:`ssl_conf_command name value;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 1.19.4.

Sets arbitrary OpenSSL configuration [commands](https://www.openssl.org/docs/man1.1.1/man3/SSL_CONF_cmd.html).

The directive is supported when using OpenSSL 1.0.2 or higher.



Several `ssl_conf_command` directives can be specified on the same level:

```
ssl_conf_command Options PrioritizeChaCha;
ssl_conf_command Ciphersuites TLS_CHACHA20_POLY1305_SHA256;
```

These directives are inherited from the previous configuration level if and only if there are no `ssl_conf_command` directives defined on the current level.



Note that configuring OpenSSL directly might result in unexpected behavior.





### ssl_crl

  Syntax:  `ssl_crl file;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 0.8.7.

Specifies a `file` with revoked certificates (CRL) in the PEM format used to [verify]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_verify_client">}}) client certificates.



### ssl_dhparam

  Syntax:`ssl_dhparam file;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 0.7.2.

Specifies a `file` with DH parameters for DHE ciphers.

By default no parameters are set, and therefore DHE ciphers will not be used.

Prior to version 1.11.0, builtin parameters were used by default.





### ssl_early_data

  Syntax:`ssl_early_data on | off;`

  Default: `ssl_early_data off;`

  Context: `http`, `server`


This directive appeared in version 1.15.3.

Enables or disables TLS 1.3 [early data](https://datatracker.ietf.org/doc/html/rfc8446#section-2.3).

Requests sent within early data are subject to [replay attacks](https://datatracker.ietf.org/doc/html/rfc8470). To protect against such attacks at the application layer, the [$ssl_early_data]({{< ref "ng/mod_ref/ngx_http_ssl_module#var_ssl_early_data">}}) variable should be used.



```
proxy_set_header Early-Data $ssl_early_data;
```



The directive is supported when using OpenSSL 1.1.1 or higher (1.15.4) and [BoringSSL](https://boringssl.googlesource.com/boringssl/).





### ssl_ecdh_curve

  Syntax:`ssl_ecdh_curve curve;`

  Default: `ssl_ecdh_curve auto;`

  Context: `http`, `server`


This directive appeared in versions 1.1.0 and 1.0.6.

Specifies a `curve` for ECDHE ciphers.

When using OpenSSL 1.0.2 or higher, it is possible to specify multiple curves (1.11.0), for example:

```
ssl_ecdh_curve prime256v1:secp384r1;
```



The special value `auto` (1.11.0) instructs nginx to use a list built into the OpenSSL library when using OpenSSL 1.0.2 or higher, or `prime256v1` with older versions.



Prior to version 1.11.0, the `prime256v1` curve was used by default.





When using OpenSSL 1.0.2 or higher, this directive sets the list of curves supported by the server. Thus, in order for ECDSA certificates to work, it is important to include the curves used in the certificates.





### ssl_ocsp

  Syntax:`ssl_ocsp on | off | leaf;`

  Default: `ssl_ocsp off;`

  Context: `http`, `server`


This directive appeared in version 1.19.0.

Enables OCSP validation of the client certificate chain. The `leaf` parameter enables validation of the client certificate only.

For the OCSP validation to work, the [ssl_verify_client]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_verify_client">}}) directive should be set to `on` or `optional`.

To resolve the OCSP responder hostname, the [resolver]({{< ref "ng/mod_ref/ngx_http_core_module#resolver">}}) directive should also be specified.

Example:

```
ssl_verify_client on;
ssl_ocsp          on;
resolver          192.0.2.1;
```





### ssl_ocsp_cache

  Syntax:`ssl_ocsp_cache off | [shared:name:size];`

  Default: `ssl_ocsp_cache off;`

  Context: `http`, `server`


This directive appeared in version 1.19.0.

Sets `name` and `size` of the cache that stores client certificates status for OCSP validation. The cache is shared between all worker processes. A cache with the same name can be used in several virtual servers.

The `off` parameter prohibits the use of the cache.



### ssl_ocsp_responder

  Syntax:`ssl_ocsp_responder url;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 1.19.0.

Overrides the URL of the OCSP responder specified in the “[Authority Information Access](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.2.1)” certificate extension for [validation]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_ocsp">}}) of client certificates.

Only “`http://`” OCSP responders are supported:

```
ssl_ocsp_responder http://ocsp.example.com/;
```





### ssl_password_file

  Syntax:`ssl_password_file file;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 1.7.3.

Specifies a `file` with passphrases for [secret keys]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_certificate_key">}}) where each passphrase is specified on a separate line. Passphrases are tried in turn when loading the key.

Example:

```
http {
    ssl_password_file /etc/keys/global.pass;
    ...

    server {
        server_name www1.example.com;
        ssl_certificate_key /etc/keys/first.key;
    }

    server {
        server_name www2.example.com;

        # named pipe can also be used instead of a file
        ssl_password_file /etc/keys/fifo;
        ssl_certificate_key /etc/keys/second.key;
    }
}
```





### ssl_prefer_server_ciphers

  Syntax:`ssl_prefer_server_ciphers on | off;`

  Default: `ssl_prefer_server_ciphers off;`

  Context: `http`, `server`


Specifies that server ciphers should be preferred over client ciphers when using the SSLv3 and TLS protocols.



### ssl_protocols

  Syntax:`ssl_protocols [SSLv2] [SSLv3] [TLSv1] [TLSv1.1] [TLSv1.2] [TLSv1.3];`

  Default: `ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;`

  Context: `http`, `server`


Enables the specified protocols.

The `TLSv1.1` and `TLSv1.2` parameters (1.1.13, 1.0.12) work only when OpenSSL 1.0.1 or higher is used.



The `TLSv1.3` parameter (1.13.0) works only when OpenSSL 1.1.1 or higher is used.



The `TLSv1.3` parameter is used by default since 1.23.4.





### ssl_reject_handshake

  Syntax:`ssl_reject_handshake on | off;`

  Default: `ssl_reject_handshake off;`

  Context: `http`, `server`


This directive appeared in version 1.19.4.

If enabled, SSL handshakes in the [server]({{< ref "ng/mod_ref/ngx_http_core_module#server">}}) block will be rejected.

For example, in the following configuration, SSL handshakes with server names other than `example.com` are rejected:

```
server {
    listen               443 ssl default_server;
    ssl_reject_handshake on;
}

server {
    listen              443 ssl;
    server_name         example.com;
    ssl_certificate     example.com.crt;
    ssl_certificate_key example.com.key;
}
```





### ssl_session_cache

  Syntax:`ssl_session_cache off | none | [builtin[:size]] [shared:name:size];`

  Default: `ssl_session_cache none;`

  Context: `http`, `server`


Sets the types and sizes of caches that store session parameters. A cache can be of any of the following types:

- `off`

  the use of a session cache is strictly prohibited: nginx explicitly tells a client that sessions may not be reused.

- `none`

  the use of a session cache is gently disallowed: nginx tells a client that sessions may be reused, but does not actually store session parameters in the cache.

- `builtin`

  a cache built in OpenSSL; used by one worker process only. The cache size is specified in sessions. If size is not given, it is equal to 20480 sessions. Use of the built-in cache can cause memory fragmentation.

- `shared`

  a cache shared between all worker processes. The cache size is specified in bytes; one megabyte can store about 4000 sessions. Each shared cache should have an arbitrary name. A cache with the same name can be used in several virtual servers. It is also used to automatically generate, store, and periodically rotate TLS session ticket keys (1.23.2) unless configured explicitly using the [ssl_session_ticket_key]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_session_ticket_key">}}) directive.



Both cache types can be used simultaneously, for example:

```
ssl_session_cache builtin:1000 shared:SSL:10m;
```

but using only shared cache without the built-in cache should be more efficient.



### ssl_session_ticket_key

  Syntax:`ssl_session_ticket_key file;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 1.5.7.

Sets a `file` with the secret key used to encrypt and decrypt TLS session tickets. The directive is necessary if the same key has to be shared between multiple servers. By default, a randomly generated key is used.

If several keys are specified, only the first key is used to encrypt TLS session tickets. This allows configuring key rotation, for example:

```
ssl_session_ticket_key current.key;
ssl_session_ticket_key previous.key;
```



The `file` must contain 80 or 48 bytes of random data and can be created using the following command:

```
openssl rand 80 > ticket.key
```

Depending on the file size either AES256 (for 80-byte keys, 1.11.8) or AES128 (for 48-byte keys) is used for encryption.



### ssl_session_tickets

  Syntax:`ssl_session_tickets on | off;`

  Default: `ssl_session_tickets on;`

  Context: `http`, `server`


This directive appeared in version 1.5.9.

Enables or disables session resumption through [TLS session tickets](https://datatracker.ietf.org/doc/html/rfc5077).



### ssl_session_timeout

  Syntax:`ssl_session_timeout time;`

  Default: `ssl_session_timeout 5m;`

  Context: `http`, `server`


Specifies a time during which a client may reuse the session parameters.



### ssl_stapling

  Syntax:`ssl_stapling on | off;`

  Default: `ssl_stapling off;`

  Context: `http`, `server`


This directive appeared in version 1.3.7.

Enables or disables [stapling of OCSP responses](https://datatracker.ietf.org/doc/html/rfc6066#section-8) by the server. Example:

```
ssl_stapling on;
resolver 192.0.2.1;
```



For the OCSP stapling to work, the certificate of the server certificate issuer should be known. If the [ssl_certificate]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_certificate">}}) file does not contain intermediate certificates, the certificate of the server certificate issuer should be present in the [ssl_trusted_certificate]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_trusted_certificate">}}) file.

For a resolution of the OCSP responder hostname, the [resolver]({{< ref "ng/mod_ref/ngx_http_core_module#resolver">}}) directive should also be specified.



### ssl_stapling_file

  Syntax:`ssl_stapling_file file;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 1.3.7.

When set, the stapled OCSP response will be taken from the specified `file` instead of querying the OCSP responder specified in the server certificate.

The file should be in the DER format as produced by the “`openssl ocsp`” command.



### ssl_stapling_responder

  Syntax:`ssl_stapling_responder url;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 1.3.7.

Overrides the URL of the OCSP responder specified in the “[Authority Information Access](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.2.1)” certificate extension.

Only “`http://`” OCSP responders are supported:

```
ssl_stapling_responder http://ocsp.example.com/;
```





### ssl_stapling_verify

  Syntax:`ssl_stapling_verify on | off;`

  Default: `ssl_stapling_verify off;`

  Context: `http`, `server`


This directive appeared in version 1.3.7.

Enables or disables verification of OCSP responses by the server.

For verification to work, the certificate of the server certificate issuer, the root certificate, and all intermediate certificates should be configured as trusted using the [ssl_trusted_certificate]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_trusted_certificate">}}) directive.



### ssl_trusted_certificate

  Syntax:`ssl_trusted_certificate file;`

  Default: —

  Context: `http`, `server`


This directive appeared in version 1.3.7.

Specifies a `file` with trusted CA certificates in the PEM format used to [verify]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_verify_client">}}) client certificates and OCSP responses if [ssl_stapling]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_stapling">}}) is enabled.

In contrast to the certificate set by [ssl_client_certificate]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_client_certificate">}}), the list of these certificates will not be sent to clients.



### ssl_verify_client

  Syntax:`ssl_verify_client on | off | optional | optional_no_ca;`

  Default: `ssl_verify_client off;`

  Context: `http`, `server`


Enables verification of client certificates. The verification result is stored in the [$ssl_client_verify]({{< ref "ng/mod_ref/ngx_http_ssl_module#var_ssl_client_verify">}}) variable.

The `optional` parameter (0.8.7+) requests the client certificate and verifies it if the certificate is present.

The `optional_no_ca` parameter (1.3.8, 1.2.5) requests the client certificate but does not require it to be signed by a trusted CA certificate. This is intended for the use in cases when a service that is external to nginx performs the actual certificate verification. The contents of the certificate is accessible through the [$ssl_client_cert]({{< ref "ng/mod_ref/ngx_http_ssl_module#var_ssl_client_cert">}}) variable.



### ssl_verify_depth

  Syntax:`ssl_verify_depth number;`

  Default: `ssl_verify_depth 1;`

  Context: `http`, `server`


Sets the verification depth in the client certificates chain.



Error Processing

The `ngx_http_ssl_module` module supports several non-standard error codes that can be used for redirects using the [error_page]({{< ref "ng/mod_ref/ngx_http_core_module#error_page">}}) directive:

- 495

  an error has occurred during the client certificate verification;

- 496

  a client has not presented the required certificate;

- 497

  a regular request has been sent to the HTTPS port.



The redirection happens after the request is fully parsed and the variables, such as `$request_uri`, `$uri`, `$args` and others, are available.



## Embedded Variables

The `ngx_http_ssl_module` module supports embedded variables:

### `$ssl_alpn_protocol`

  returns the protocol selected by ALPN during the SSL handshake, or an empty string otherwise (1.21.4);

### `$ssl_cipher`

  returns the name of the cipher used for an established SSL connection;

### `$ssl_ciphers`

  returns the list of ciphers supported by the client (1.11.7). Known ciphers are listed by names, unknown are shown in hexadecimal, for example:`AES128-SHA:AES256-SHA:0x00ff `The variable is fully supported only when using OpenSSL version 1.0.2 or higher. With older versions, the variable is available only for new sessions and lists only known ciphers.

### `$ssl_client_escaped_cert`

  returns the client certificate in the PEM format (urlencoded) for an established SSL connection (1.13.5);

### `$ssl_client_cert`

  returns the client certificate in the PEM format for an established SSL connection, with each line except the first prepended with the tab character; this is intended for the use in the [proxy_set_header]({{< ref "ng/mod_ref/ngx_http_proxy_module#proxy_set_header">}}) directive;The variable is deprecated, the `$ssl_client_escaped_cert` variable should be used instead.

### `$ssl_client_fingerprint`

  returns the SHA1 fingerprint of the client certificate for an established SSL connection (1.7.1);

### `$ssl_client_i_dn`

  returns the “issuer DN” string of the client certificate for an established SSL connection according to [RFC 2253](https://datatracker.ietf.org/doc/html/rfc2253) (1.11.6);

### `$ssl_client_i_dn_legacy`

  returns the “issuer DN” string of the client certificate for an established SSL connection;Prior to version 1.11.6, the variable name was `$ssl_client_i_dn`.

### `$ssl_client_raw_cert`

  returns the client certificate in the PEM format for an established SSL connection;

### `$ssl_client_s_dn`

  returns the “subject DN” string of the client certificate for an established SSL connection according to [RFC 2253](https://datatracker.ietf.org/doc/html/rfc2253) (1.11.6);

### `$ssl_client_s_dn_legacy`

  returns the “subject DN” string of the client certificate for an established SSL connection;Prior to version 1.11.6, the variable name was `$ssl_client_s_dn`.

### `$ssl_client_serial`

  returns the serial number of the client certificate for an established SSL connection;

### `$ssl_client_v_end`

  returns the end date of the client certificate (1.11.7);

### `$ssl_client_v_remain`

  returns the number of days until the client certificate expires (1.11.7);

### `$ssl_client_v_start`

  returns the start date of the client certificate (1.11.7);

### `$ssl_client_verify`

  returns the result of client certificate verification: “`SUCCESS`”, “`FAILED:` `reason`”, and “`NONE`” if a certificate was not present;Prior to version 1.11.7, the “`FAILED`” result did not contain the `reason` string.

### `$ssl_curve`

  returns the negotiated curve used for SSL handshake key exchange process (1.21.5). Known curves are listed by names, unknown are shown in hexadecimal, for example:`prime256v1 `The variable is supported only when using OpenSSL version 3.0 or higher. With older versions, the variable value will be an empty string.

### `$ssl_curves`

  returns the list of curves supported by the client (1.11.7). Known curves are listed by names, unknown are shown in hexadecimal, for example:`0x001d:prime256v1:secp521r1:secp384r1 `The variable is supported only when using OpenSSL version 1.0.2 or higher. With older versions, the variable value will be an empty string.The variable is available only for new sessions.

### `$ssl_early_data`

  returns “`1`” if TLS 1.3 [early data]({{< ref "ng/mod_ref/ngx_http_ssl_module#ssl_early_data">}}) is used and the handshake is not complete, otherwise “” (1.15.3).

### `$ssl_protocol`

  returns the protocol of an established SSL connection;

### `$ssl_server_name`

  returns the server name requested through [SNI](http://en.wikipedia.org/wiki/Server_Name_Indication) (1.7.0);

### `$ssl_session_id`

  returns the session identifier of an established SSL connection;

### `$ssl_session_reused`

  returns “`r`” if an SSL session was reused, or “`.`” otherwise (1.5.11).