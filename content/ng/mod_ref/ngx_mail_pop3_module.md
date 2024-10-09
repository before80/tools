+++
title = "ngx_mail_pop3_module"
date = 2023-08-15T08:21:48+08:00
weight = 640
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# Module ngx_mail_pop3_module

https://nginx.org/en/docs/mail/ngx_mail_pop3_module.html



## Directives



### pop3_auth

  Syntax:`pop3_auth method ...;`

  Default: `pop3_auth plain;`

  Context: `mail`, `server`


Sets permitted methods of authentication for POP3 clients. Supported methods are:

- `plain`

  [USER/PASS](https://datatracker.ietf.org/doc/html/rfc1939), [AUTH PLAIN](https://datatracker.ietf.org/doc/html/rfc4616), [AUTH LOGIN](https://datatracker.ietf.org/doc/html/draft-murchison-sasl-login-00)

- `apop`

  [APOP](https://datatracker.ietf.org/doc/html/rfc1939). In order for this method to work, the password must be stored unencrypted.

- `cram-md5`

  [AUTH CRAM-MD5](https://datatracker.ietf.org/doc/html/rfc2195). In order for this method to work, the password must be stored unencrypted.

- `external`

  [AUTH EXTERNAL](https://datatracker.ietf.org/doc/html/rfc4422) (1.11.6).



Plain text authentication methods (`USER/PASS`, `AUTH PLAIN`, and `AUTH LOGIN`) are always enabled, though if the `plain` method is not specified, `AUTH PLAIN` and `AUTH LOGIN` will not be automatically included in [pop3_capabilities](https://nginx.org/en/docs/mail/ngx_mail_pop3_module.html#pop3_capabilities).



### pop3_capabilities

  Syntax:`pop3_capabilities extension ...;`

  Default: `pop3_capabilities TOP USER UIDL;`

  Context: `mail`, `server`


Sets the [POP3 protocol](https://datatracker.ietf.org/doc/html/rfc2449) extensions list that is passed to the client in response to the `CAPA` command. The authentication methods specified in the [pop3_auth](https://nginx.org/en/docs/mail/ngx_mail_pop3_module.html#pop3_auth) directive ([SASL](https://datatracker.ietf.org/doc/html/rfc2449) extension) and [STLS](https://datatracker.ietf.org/doc/html/rfc2595) are automatically added to this list depending on the [starttls](https://nginx.org/en/docs/mail/ngx_mail_ssl_module.html#starttls) directive value.

It makes sense to specify the extensions supported by the POP3 backends to which the clients are proxied (if these extensions are related to commands used after the authentication, when nginx transparently proxies the client connection to the backend).

The current list of standardized extensions is published at [www.iana.org](http://www.iana.org/assignments/pop3-extension-mechanism).