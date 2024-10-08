+++
title = "ngx_http_perl_module"
date = 2023-08-15T08:16:55+08:00
weight = 360
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Module ngx_http_perl_module

https://nginx.org/en/docs/http/ngx_http_perl_module.html



The `ngx_http_perl_module` module is used to implement location and variable handlers in Perl and insert Perl calls into SSI.

This module is not built by default, it should be enabled with the `--with-http_perl_module` configuration parameter.

This module requires [Perl](https://www.perl.org/get.html) version 5.6.1 or higher. The C compiler should be compatible with the one used to build Perl.





## Known Issues

The module is experimental, caveat emptor applies.

In order for Perl to recompile the modified modules during reconfiguration, it should be built with the `-Dusemultiplicity=yes` or `-Dusethreads=yes` parameters. Also, to make Perl leak less memory at run time, it should be built with the `-Dusemymalloc=no` parameter. To check the values of these parameters in an already built Perl (preferred values are specified in the example), run:

```
$ perl -V:usemultiplicity -V:usemymalloc
usemultiplicity='define';
usemymalloc='n';
```



Note that after rebuilding Perl with the new `-Dusemultiplicity=yes` or `-Dusethreads=yes` parameters, all binary Perl modules will have to be rebuilt as well — they will just stop working with the new Perl.

There is a possibility that the main process and then worker processes will grow in size after every reconfiguration. If the main process grows to an unacceptable size, the [live upgrade](https://nginx.org/en/docs/control.html#upgrade) procedure can be applied without changing the executable file.

While the Perl module is performing a long-running operation, such as resolving a domain name, connecting to another server, or querying a database, other requests assigned to the current worker process will not be processed. It is thus recommended to perform only such operations that have predictable and short execution time, such as accessing the local file system.



## Example Configuration



```
http {

    perl_modules perl/lib;
    perl_require hello.pm;

    perl_set $msie6 '

        sub {
            my $r = shift;
            my $ua = $r->header_in("User-Agent");

            return "" if $ua =~ /Opera/;
            return "1" if $ua =~ / MSIE [6-9]\.\d+/;
            return "";
        }

    ';

    server {
        location / {
            perl hello::handler;
        }
    }
```



The `perl/lib/hello.pm` module:

```
package hello;

use nginx;

sub handler {
    my $r = shift;

    $r->send_http_header("text/html");
    return OK if $r->header_only;

    $r->print("hello!\n<br/>");

    if (-f $r->filename or -d _) {
        $r->print($r->uri, " exists!\n");
    }

    return OK;
}

1;
__END__
```





## Directives



### perl

  Syntax:`perl module::function|'sub { ... }';`

  Default: —

  Context: `location`, `limit_except`


Sets a Perl handler for the given location.



### perl_modules

  Syntax:`perl_modules path;`

  Default: —

  Context: `http`


Sets an additional path for Perl modules.



### perl_require

  Syntax:`perl_require module;`

  Default: —

  Context: `http`


Defines the name of a module that will be loaded during each reconfiguration. Several `perl_require` directives can be present.



### perl_set

  Syntax:`perl_set $variable module::function|'sub { ... }';`

  Default: —

  Context: `http`


Installs a Perl handler for the specified variable.



Calling Perl from SSI

An SSI command calling Perl has the following format:

```
<!--# perl sub="module::function" arg="parameter1" arg="parameter2" ...
-->
```





The $r Request Object Methods



- `$r->args`

  returns request arguments.

- `$r->filename`

  returns a filename corresponding to the request URI.

- `$r->has_request_body(handler)`

  returns 0 if there is no body in a request. If there is a body, the specified handler is set for the request and 1 is returned. After reading the request body, nginx will call the specified handler. Note that the handler function should be passed by reference. Example:`package hello; use nginx; sub handler {    my $r = shift;     if ($r->request_method ne "POST") {        return DECLINED;    }     if ($r->has_request_body(\&post)) {        return OK;    }     return HTTP_BAD_REQUEST; } sub post {    my $r = shift;     $r->send_http_header;     $r->print("request_body: \"", $r->request_body, "\"<br/>");    $r->print("request_body_file: \"", $r->request_body_file, "\"<br/>\n");     return OK; } 1; __END__ `

- `$r->allow_ranges`

  enables the use of byte ranges when sending responses.

- `$r->discard_request_body`

  instructs nginx to discard the request body.

- `$r->header_in(field)`

  returns the value of the specified client request header field.

- `$r->header_only`

  determines whether the whole response or only its header should be sent to the client.

- `$r->header_out(field, value)`

  sets a value for the specified response header field.

- `$r->internal_redirect(uri)`

  does an internal redirect to the specified `uri`. An actual redirect happens after the Perl handler execution is completed.Since version 1.17.2, the method accepts escaped URIs and supports redirections to named locations.

- `$r->log_error(errno, message)`

  writes the specified `message` into the [error_log]({{< ref "ng/mod_ref/ngx_core_module#error_log">}}). If `errno` is non-zero, an error code and its description will be appended to the message.

- `$r->print(text, ...)`

  passes data to a client.

- `$r->request_body`

  returns the client request body if it has not been written to a temporary file. To ensure that the client request body is in memory, its size should be limited by [client_max_body_size]({{< ref "ng/mod_ref/ngx_http_core_module#client_max_body_size">}}), and a sufficient buffer size should be set using [client_body_buffer_size]({{< ref "ng/mod_ref/ngx_http_core_module#client_body_buffer_size">}}).

- `$r->request_body_file`

  returns the name of the file with the client request body. After the processing, the file should be removed. To always write a request body to a file, [client_body_in_file_only]({{< ref "ng/mod_ref/ngx_http_core_module#client_body_in_file_only">}}) should be enabled.

- `$r->request_method`

  returns the client request HTTP method.

- `$r->remote_addr`

  returns the client IP address.

- `$r->flush`

  immediately sends data to the client.

- `$r->sendfile(name[, offset[, length]])`

  sends the specified file content to the client. Optional parameters specify the initial offset and length of the data to be transmitted. The actual data transmission happens after the Perl handler has completed.

- `$r->send_http_header([type])`

  sends the response header to the client. The optional `type` parameter sets the value of the “Content-Type” response header field. If the value is an empty string, the “Content-Type” header field will not be sent.

- `$r->status(code)`

  sets a response code.

- `$r->sleep(milliseconds, handler)`

  sets the specified handler and stops request processing for the specified time. In the meantime, nginx continues to process other requests. After the specified time has elapsed, nginx will call the installed handler. Note that the handler function should be passed by reference. In order to pass data between handlers, `$r->variable()` should be used. Example:`package hello; use nginx; sub handler {    my $r = shift;     $r->discard_request_body;    $r->variable("var", "OK");    $r->sleep(1000, \&next);     return OK; } sub next {    my $r = shift;     $r->send_http_header;    $r->print($r->variable("var"));     return OK; } 1; __END__ `

- `$r->unescape(text)`

  decodes a text encoded in the “%XX” form.

- `$r->uri`

  returns a request URI.

- `$r->variable(name[, value])`

  returns or sets the value of the specified variable. Variables are local to each request.