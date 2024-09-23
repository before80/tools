+++
title = "12 Extending GNU `make`"
date = 2023-08-21T17:06:45+08:00
weight = 120
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## 12 Extending GNU `make`

https://www.gnu.org/software/make/manual/make.html#Extending-make



GNU `make` provides many advanced capabilities, including many useful functions. However, it does not contain a complete programming language and so it has limitations. Sometimes these limitations can be overcome through use of the `shell` function to invoke a separate program, although this can be inefficient.

In cases where the built-in capabilities of GNU `make` are insufficient to your requirements there are two options for extending `make`. On systems where it’s provided, you can utilize GNU Guile as an embedded scripting language (see [GNU Guile Integration](https://www.gnu.org/software/make/manual/make.html#Guile-Integration)). On systems which support dynamically loadable objects, you can write your own extension in any language (which can be compiled into such an object) and load it to provide extended capabilities (see [The `load` Directive](https://www.gnu.org/software/make/manual/make.html#load-Directive)).







## 12.1 GNU Guile Integration



GNU `make` may be built with support for GNU Guile as an embedded extension language. Guile implements the Scheme language. A review of GNU Guile and the Scheme language and its features is beyond the scope of this manual: see the documentation for GNU Guile and Scheme.

You can determine if `make` contains support for Guile by examining the `.FEATURES` variable; it will contain the word guile if Guile support is available.

The Guile integration provides one new `make` function: `guile`. The `guile` function takes one argument which is first expanded by `make` in the normal fashion, then passed to the GNU Guile evaluator. The result of the evaluator is converted into a string and used as the expansion of the `guile` function in the makefile.

In addition, GNU `make` exposes Guile procedures for use in Guile scripts.

- [Conversion of Guile Types](https://www.gnu.org/software/make/manual/make.html#Guile-Types)
- [Interfaces from Guile to `make`](https://www.gnu.org/software/make/manual/make.html#Guile-Interface)
- [Example Using Guile in `make`](https://www.gnu.org/software/make/manual/make.html#Guile-Example)





### 12.1.1 Conversion of Guile Types



There is only one “data type” in `make`: a string. GNU Guile, on the other hand, provides a rich variety of different data types. An important aspect of the interface between `make` and GNU Guile is the conversion of Guile data types into `make` strings.

This conversion is relevant in two places: when a makefile invokes the `guile` function to evaluate a Guile expression, the result of that evaluation must be converted into a make string so it can be further evaluated by `make`. And secondly, when a Guile script invokes one of the procedures exported by `make` the argument provided to the procedure must be converted into a string.

The conversion of Guile types into `make` strings is as below:

- `#f`

  False is converted into the empty string: in `make` conditionals the empty string is considered false.

- `#t`

  True is converted to the string ‘#t’: in `make` conditionals any non-empty string is considered true.

- `symbol`

- `number`

  A symbol or number is converted into the string representation of that symbol or number.

- `character`

  A printable character is converted to the same character.

- `string`

  A string containing only printable characters is converted to the same string.

- `list`

  A list is converted recursively according to the above rules. This implies that any structured list will be flattened (that is, a result of ‘'(a b (c d) e)’ will be converted to the `make` string ‘a b c d e’).

- `other`

  Any other Guile type results in an error. In future versions of `make`, other Guile types may be converted.

The translation of ‘#f’ (to the empty string) and ‘#t’ (to the non-empty string ‘#t’) is designed to allow you to use Guile boolean results directly as `make` boolean conditions. For example:

```
$(if $(guile (access? "myfile" R_OK)),$(info myfile exists))
```

As a consequence of these conversion rules you must consider the result of your Guile script, as that result will be converted into a string and parsed by `make`. If there is no natural result for the script (that is, the script exists solely for its side-effects), you should add ‘#f’ as the final expression in order to avoid syntax errors in your makefile.





### 12.1.2 Interfaces from Guile to `make`



In addition to the `guile` function available in makefiles, `make` exposes some procedures for use in your Guile scripts. At startup `make` creates a new Guile module, `gnu make`, and exports these procedures as public interfaces from that module:

- `gmk-expand`

  This procedure takes a single argument which is converted into a string. The string is expanded by `make` using normal `make` expansion rules. The result of the expansion is converted into a Guile string and provided as the result of the procedure.

- `gmk-eval`

  This procedure takes a single argument which is converted into a string. The string is evaluated by `make` as if it were a makefile. This is the same capability available via the `eval` function (see [The `eval` Function](https://www.gnu.org/software/make/manual/make.html#Eval-Function)). The result of the `gmk-eval` procedure is always the empty string.Note that `gmk-eval` is not quite the same as using `gmk-expand` with the `eval` function: in the latter case the evaluated string will be expanded *twice*; first by `gmk-expand`, then again by the `eval` function.





### 12.1.3 Example Using Guile in `make`



Here is a very simple example using GNU Guile to manage writing to a file. These Guile procedures simply open a file, allow writing to the file (one string per line), and close the file. Note that because we cannot store complex values such as Guile ports in `make` variables, we’ll keep the port as a global variable in the Guile interpreter.

You can create Guile functions easily using `define`/`endef` to create a Guile script, then use the `guile` function to internalize it:

```
define GUILEIO
;; A simple Guile IO library for GNU Make

(define MKPORT #f)

(define (mkopen name mode)
  (set! MKPORT (open-file name mode))
  #f)

(define (mkwrite s)
  (display s MKPORT)
  (newline MKPORT)
  #f)

(define (mkclose)
  (close-port MKPORT)
  #f)

#f
endef

# Internalize the Guile IO functions
$(guile $(GUILEIO))
```

If you have a significant amount of Guile support code, you might consider keeping it in a different file (e.g., guileio.scm) and then loading it in your makefile using the `guile` function:

```
$(guile (load "guileio.scm"))
```

An advantage to this method is that when editing guileio.scm, your editor will understand that this file contains Scheme syntax rather than makefile syntax.

Now you can use these Guile functions to create files. Suppose you need to operate on a very large list, which cannot fit on the command line, but the utility you’re using accepts the list as input as well:

```
prog: $(PREREQS)
        @$(guile (mkopen "tmp.out" "w")) \
         $(foreach X,$^,$(guile (mkwrite "$(X)"))) \
         $(guile (mkclose))
        $(LINK) < tmp.out
```

A more comprehensive suite of file manipulation procedures is possible of course. You could, for example, maintain multiple output files at the same time by choosing a symbol for each one and using it as the key to a hash table, where the value is a port, then returning the symbol to be stored in a `make` variable.





## 12.2 Loading Dynamic Objects



**Warning:** The `load` directive and extension capability is considered a “technology preview” in this release of GNU Make. We encourage you to experiment with this feature and we appreciate any feedback on it. However we cannot guarantee to maintain backward-compatibility in the next release. Consider using GNU Guile instead for extending GNU Make (see [The `guile` Function](https://www.gnu.org/software/make/manual/make.html#Guile-Function)).

Many operating systems provide a facility for dynamically loading compiled objects. If your system provides this facility, GNU `make` can make use of it to load dynamic objects at runtime, providing new capabilities which may then be invoked by your makefile.

The `load` directive is used to load a dynamic object. Once the object is loaded, a “setup” function will be invoked to allow the object to initialize itself and register new facilities with GNU `make`. A dynamic object might include new `make` functions, for example, and the “setup” function would register them with GNU `make`’s function handling system.

- [The `load` Directive](https://www.gnu.org/software/make/manual/make.html#load-Directive)
- [How Loaded Objects Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Loaded-Objects)
- [Loaded Object Interface](https://www.gnu.org/software/make/manual/make.html#Loaded-Object-API)
- [Example Loaded Object](https://www.gnu.org/software/make/manual/make.html#Loaded-Object-Example)





### 12.2.1 The `load` Directive



Objects are loaded into GNU `make` by placing the `load` directive into your makefile. The syntax of the `load` directive is as follows:



```
load object-file …
```

or:

```
load object-file(symbol-name) …
```

The file object-file is dynamically loaded by GNU `make`. If object-file does not include a directory path then it is first looked for in the current directory. If it is not found there, or a directory path is included, then system-specific paths will be searched. If the load fails for any reason, `make` will print a message and exit.

If the load succeeds `make` will invoke an initializing function.

If symbol-name is provided, it will be used as the name of the initializing function.

If no symbol-name is provided, the initializing function name is created by taking the base file name of object-file, up to the first character which is not a valid symbol name character (alphanumerics and underscores are valid symbol name characters). To this prefix will be appended the suffix `_gmk_setup`.

More than one object file may be loaded with a single `load` directive, and both forms of `load` arguments may be used in the same directive.

The initializing function will be provided the file name and line number of the invocation of the `load` operation. It should return a value of type `int`, which must be `0` on failure and non-`0` on success. If the return value is `-1`, then GNU Make will *not* attempt to rebuild the object file (see [How Loaded Objects Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Loaded-Objects)).

For example:

```
load ../mk_funcs.so
```

will load the dynamic object ../mk_funcs.so. After the object is loaded, `make` will invoke the function (assumed to be defined by the shared object) `mk_funcs_gmk_setup`.

On the other hand:

```
load ../mk_funcs.so(init_mk_func)
```

will load the dynamic object ../mk_funcs.so. After the object is loaded, `make` will invoke the function `init_mk_func`.

Regardless of how many times an object file appears in a `load` directive, it will only be loaded (and its setup function will only be invoked) once.



After an object has been successfully loaded, its file name is appended to the `.LOADED` variable.



If you would prefer that failure to load a dynamic object not be reported as an error, you can use the `-load` directive instead of `load`. GNU `make` will not fail and no message will be generated if an object fails to load. The failed object is not added to the `.LOADED` variable, which can then be consulted to determine if the load was successful.





### 12.2.2 How Loaded Objects Are Remade



Loaded objects undergo the same re-make procedure as makefiles (see [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)). If any loaded object is recreated, then `make` will start from scratch and re-read all the makefiles, and reload the object files again. It is not necessary for the loaded object to do anything special to support this.

It’s up to the makefile author to provide the rules needed for rebuilding the loaded object.





### 12.2.3 Loaded Object Interface



**Warning:** For this feature to be useful your extensions will need to invoke various functions internal to GNU `make`. The programming interfaces provided in this release should not be considered stable: functions may be added, removed, or change calling signatures or implementations in future versions of GNU `make`.

To be useful, loaded objects must be able to interact with GNU `make`. This interaction includes both interfaces the loaded object provides to makefiles and also interfaces `make` provides to the loaded object to manipulate `make`’s operation.

The interface between loaded objects and `make` is defined by the gnumake.h C header file. All loaded objects written in C should include this header file. Any loaded object not written in C will need to implement the interface defined in this header file.

Typically, a loaded object will register one or more new GNU `make` functions using the `gmk_add_function` routine from within its setup function. The implementations of these `make` functions may make use of the `gmk_expand` and `gmk_eval` routines to perform their tasks, then optionally return a string as the result of the function expansion.



#### Loaded Object Licensing



Every dynamic extension should define the global symbol `plugin_is_GPL_compatible` to assert that it has been licensed under a GPL-compatible license. If this symbol does not exist, `make` emits a fatal error and exits when it tries to load your extension.

The declared type of the symbol should be `int`. It does not need to be in any allocated section, though. The code merely asserts that the symbol exists in the global scope. Something like this is enough:

```
int plugin_is_GPL_compatible;
```



#### Data Structures

- `gmk_floc`

  This structure represents a filename/location pair. It is provided when defining items, so GNU `make` can inform the user later where the definition occurred if necessary.



#### Registering Functions



There is currently one way for makefiles to invoke operations provided by the loaded object: through the `make` function call interface. A loaded object can register one or more new functions which may then be invoked from within the makefile in the same way as any other function.

Use `gmk_add_function` to create a new `make` function. Its arguments are as follows:

- `name`

  The function name. This is what the makefile should use to invoke the function. The name must be between 1 and 255 characters long and it may only contain alphanumeric, period (‘.’), dash (‘-’), and underscore (‘_’) characters. It may not begin with a period.

- `func_ptr`

  A pointer to a function that `make` will invoke when it expands the function in a makefile. This function must be defined by the loaded object.

- `min_args`

  The minimum number of arguments the function will accept. Must be between 0 and 255. GNU `make` will check this and fail before invoking `func_ptr` if the function was invoked with too few arguments.

- `max_args`

  The maximum number of arguments the function will accept. Must be between 0 and 255. GNU `make` will check this and fail before invoking `func_ptr` if the function was invoked with too many arguments. If the value is 0, then any number of arguments is accepted. If the value is greater than 0, then it must be greater than or equal to `min_args`.

- `flags`

  Flags that specify how this function will operate; the desired flags should be OR’d together. If the `GMK_FUNC_NOEXPAND` flag is given then the function arguments will not be expanded before the function is called; otherwise they will be expanded first.



#### Registered Function Interface



A function registered with `make` must match the `gmk_func_ptr` type. It will be invoked with three parameters: `name` (the name of the function), `argc` (the number of arguments to the function), and `argv` (an array of pointers to arguments to the function). The last pointer (that is, `argv[argc]`) will be null (`0`).

The return value of the function is the result of expanding the function. If the function expands to nothing the return value may be null. Otherwise, it must be a pointer to a string created with `gmk_alloc`. Once the function returns, `make` owns this string and will free it when appropriate; it cannot be accessed by the loaded object.



#### GNU `make` Facilities

There are some facilities exported by GNU `make` for use by loaded objects. Typically these would be run from within the setup function and/or the functions registered via `gmk_add_function`, to retrieve or modify the data `make` works with.

- `gmk_expand`

  This function takes a string and expands it using `make` expansion rules. The result of the expansion is returned in a nil-terminated string buffer. The caller is responsible for calling `gmk_free` with a pointer to the returned buffer when done.

- `gmk_eval`

  This function takes a buffer and evaluates it as a segment of makefile syntax. This function can be used to define new variables, new rules, etc. It is equivalent to using the `eval` `make` function.

Note that there is a difference between `gmk_eval` and calling `gmk_expand` with a string using the `eval` function: in the latter case the string will be expanded *twice*; once by `gmk_expand` and then again by the `eval` function. Using `gmk_eval` the buffer is only expanded once, at most (as it’s read by the `make` parser).



#### Memory Management

Some systems allow for different memory management schemes. Thus you should never pass memory that you’ve allocated directly to any `make` function, nor should you attempt to directly free any memory returned to you by any `make` function. Instead, use the `gmk_alloc` and `gmk_free` functions.

In particular, the string returned to `make` by a function registered using `gmk_add_function` *must* be allocated using `gmk_alloc`, and the string returned from the `make` `gmk_expand` function *must* be freed (when no longer needed) using `gmk_free`.

- `gmk_alloc`

  Return a pointer to a newly-allocated buffer. This function will always return a valid pointer; if not enough memory is available `make` will exit. `gmk_alloc` does not initialize allocated memory.

- `gmk_free`

  Free a buffer returned to you by `make`. Once the `gmk_free` function returns the string will no longer be valid. If NULL is passed to `gmk_free`, no operation is performed.





### 12.2.4 Example Loaded Object



Let’s suppose we wanted to write a new GNU `make` function that would create a temporary file and return its name. We would like our function to take a prefix as an argument. First we can write the function in a file mk_temp.c:

```
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>

#include <gnumake.h>

int plugin_is_GPL_compatible;

char *
gen_tmpfile(const char *nm, int argc, char **argv)
{
  int fd;

  /* Compute the size of the filename and allocate space for it.  */
  int len = strlen (argv[0]) + 6 + 1;
  char *buf = gmk_alloc (len);

  strcpy (buf, argv[0]);
  strcat (buf, "XXXXXX");

  fd = mkstemp(buf);
  if (fd >= 0)
    {
      /* Don't leak the file descriptor.  */
      close (fd);
      return buf;
    }

  /* Failure.  */
  fprintf (stderr, "mkstemp(%s) failed: %s\n", buf, strerror (errno));
  gmk_free (buf);
  return NULL;
}

int
mk_temp_gmk_setup (const gmk_floc *floc)
{
  printf ("mk_temp plugin loaded from %s:%lu\n", floc->filenm, floc->lineno);
  /* Register the function with make name "mk-temp".  */
  gmk_add_function ("mk-temp", gen_tmpfile, 1, 1, 1);
  return 1;
}
```

Next, we will write a Makefile that can build this shared object, load it, and use it:

```
all:
        @echo Temporary file: $(mk-temp tmpfile.)

load mk_temp.so

mk_temp.so: mk_temp.c
        $(CC) -shared -fPIC -o $@ $<
```

On MS-Windows, due to peculiarities of how shared objects are produced, the compiler needs to scan the *import library* produced when building `make`, typically called libgnumake-version.dll.a, where version is the version of the load object API. So the recipe to produce a shared object will look on Windows like this (assuming the API version is 1):

```
mk_temp.dll: mk_temp.c
        $(CC) -shared -o $@ $< -lgnumake-1
```

Now when you run `make` you’ll see something like:

```
$ make
mk_temp plugin loaded from Makefile:4
cc -shared -fPIC -o mk_temp.so mk_temp.c
Temporary filename: tmpfile.A7JEwd
```