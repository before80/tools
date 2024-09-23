+++
title = "howToUseVariables"
date = 2023-08-21T17:04:11+08:00
weight = 60
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 6 How to Use Variables

https://www.gnu.org/software/make/manual/make.html#Using-Variables



A *variable* is a name defined in a makefile to represent a string of text, called the variable’s *value*. These values are substituted by explicit request into targets, prerequisites, recipes, and other parts of the makefile. (In some other versions of `make`, variables are called *macros*.)

Variables and functions in all parts of a makefile are expanded when read, except for in recipes, the right-hand sides of variable definitions using ‘=’, and the bodies of variable definitions using the `define` directive. The value a variable expands to is that of its most recent definition at the time of expansion. In other words, variables are dynamically scoped.

Variables can represent lists of file names, options to pass to compilers, programs to run, directories to look in for source files, directories to write output in, or anything else you can imagine.

A variable name may be any sequence of characters not containing ‘:’, ‘#’, ‘=’, or whitespace. However, variable names containing characters other than letters, numbers, and underscores should be considered carefully, as in some shells they cannot be passed through the environment to a sub-`make` (see [Communicating Variables to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Variables_002fRecursion)). Variable names beginning with ‘.’ and an uppercase letter may be given special meaning in future versions of `make`.

Variable names are case-sensitive. The names ‘foo’, ‘FOO’, and ‘Foo’ all refer to different variables.

It is traditional to use upper case letters in variable names, but we recommend using lower case letters for variable names that serve internal purposes in the makefile, and reserving upper case for parameters that control implicit rules or for parameters that the user should override with command options (see [Overriding Variables](https://www.gnu.org/software/make/manual/make.html#Overriding)).

A few variables have names that are a single punctuation character or just a few characters. These are the *automatic variables*, and they have particular specialized uses. See [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables).







## 6.1 Basics of Variable References



To substitute a variable’s value, write a dollar sign followed by the name of the variable in parentheses or braces: either ‘$(foo)’ or ‘${foo}’ is a valid reference to the variable `foo`. This special significance of ‘$’ is why you must write ‘$$’ to have the effect of a single dollar sign in a file name or recipe.

Variable references can be used in any context: targets, prerequisites, recipes, most directives, and new variable values. Here is an example of a common case, where a variable holds the names of all the object files in a program:

```
objects = program.o foo.o utils.o
program : $(objects)
        cc -o program $(objects)

$(objects) : defs.h
```

Variable references work by strict textual substitution. Thus, the rule

```
foo = c
prog.o : prog.$(foo)
        $(foo)$(foo) -$(foo) prog.$(foo)
```

could be used to compile a C program prog.c. Since spaces before the variable value are ignored in variable assignments, the value of `foo` is precisely ‘c’. (Don’t actually write your makefiles this way!)

A dollar sign followed by a character other than a dollar sign, open-parenthesis or open-brace treats that single character as the variable name. Thus, you could reference the variable `x` with ‘$x’. However, this practice can lead to confusion (e.g., ‘$foo’ refers to the variable `f` followed by the string `oo`) so we recommend using parentheses or braces around all variables, even single-letter variables, unless omitting them gives significant readability improvements. One place where readability is often improved is automatic variables (see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)).





## 6.2 The Two Flavors of Variables



There are different ways that a variable in GNU `make` can get a value; we call them the *flavors* of variables. The flavors are distinguished in how they handle the values they are assigned in the makefile, and in how those values are managed when the variable is later used and expanded.

- [Recursively Expanded Variable Assignment](https://www.gnu.org/software/make/manual/make.html#Recursive-Assignment)
- [Simply Expanded Variable Assignment](https://www.gnu.org/software/make/manual/make.html#Simple-Assignment)
- [Immediately Expanded Variable Assignment](https://www.gnu.org/software/make/manual/make.html#Immediate-Assignment)
- [Conditional Variable Assignment](https://www.gnu.org/software/make/manual/make.html#Conditional-Assignment)





### 6.2.1 Recursively Expanded Variable Assignment



The first flavor of variable is a *recursively expanded* variable. Variables of this sort are defined by lines using ‘=’ (see [Setting Variables](https://www.gnu.org/software/make/manual/make.html#Setting)) or by the `define` directive (see [Defining Multi-Line Variables](https://www.gnu.org/software/make/manual/make.html#Multi_002dLine)). The value you specify is installed verbatim; if it contains references to other variables, these references are expanded whenever this variable is substituted (in the course of expanding some other string). When this happens, it is called *recursive expansion*.

For example,

```
foo = $(bar)
bar = $(ugh)
ugh = Huh?

all:;echo $(foo)
```

will echo ‘Huh?’: ‘$(foo)’ expands to ‘$(bar)’ which expands to ‘$(ugh)’ which finally expands to ‘Huh?’.

This flavor of variable is the only sort supported by most other versions of `make`. It has its advantages and its disadvantages. An advantage (most would say) is that:

```
CFLAGS = $(include_dirs) -O
include_dirs = -Ifoo -Ibar
```

will do what was intended: when ‘CFLAGS’ is expanded in a recipe, it will expand to ‘-Ifoo -Ibar -O’. A major disadvantage is that you cannot append something on the end of a variable, as in

```
CFLAGS = $(CFLAGS) -O
```

because it will cause an infinite loop in the variable expansion. (Actually `make` detects the infinite loop and reports an error.)

Another disadvantage is that any functions (see [Functions for Transforming Text](https://www.gnu.org/software/make/manual/make.html#Functions)) referenced in the definition will be executed every time the variable is expanded. This makes `make` run slower; worse, it causes the `wildcard` and `shell` functions to give unpredictable results because you cannot easily control when they are called, or even how many times.





### 6.2.2 Simply Expanded Variable Assignment

To avoid the problems and inconveniences of recursively expanded variables, there is another flavor: simply expanded variables.



*Simply expanded variables* are defined by lines using ‘:=’ or ‘::=’ (see [Setting Variables](https://www.gnu.org/software/make/manual/make.html#Setting)). Both forms are equivalent in GNU `make`; however only the ‘::=’ form is described by the POSIX standard (support for ‘::=’ is added to the POSIX standard for POSIX Issue 8).

The value of a simply expanded variable is scanned once, expanding any references to other variables and functions, when the variable is defined. Once that expansion is complete the value of the variable is never expanded again: when the variable is used the value is copied verbatim as the expansion. If the value contained variable references the result of the expansion will contain their values *as of the time this variable was defined*. Therefore,

```
x := foo
y := $(x) bar
x := later
```

is equivalent to

```
y := foo bar
x := later
```

Here is a somewhat more complicated example, illustrating the use of ‘:=’ in conjunction with the `shell` function. (See [The `shell` Function](https://www.gnu.org/software/make/manual/make.html#Shell-Function).) This example also shows use of the variable `MAKELEVEL`, which is changed when it is passed down from level to level. (See [Communicating Variables to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Variables_002fRecursion), for information about `MAKELEVEL`.)



```
ifeq (0,${MAKELEVEL})
whoami    := $(shell whoami)
host-type := $(shell arch)
MAKE := ${MAKE} host-type=${host-type} whoami=${whoami}
endif
```

An advantage of this use of ‘:=’ is that a typical ‘descend into a directory’ recipe then looks like this:

```
${subdirs}:
        ${MAKE} -C $@ all
```

Simply expanded variables generally make complicated makefile programming more predictable because they work like variables in most programming languages. They allow you to redefine a variable using its own value (or its value processed in some way by one of the expansion functions) and to use the expansion functions much more efficiently (see [Functions for Transforming Text](https://www.gnu.org/software/make/manual/make.html#Functions)).



You can also use them to introduce controlled leading whitespace into variable values. Leading whitespace characters are discarded from your input before substitution of variable references and function calls; this means you can include leading spaces in a variable value by protecting them with variable references, like this:

```
nullstring :=
space := $(nullstring) # end of the line
```

Here the value of the variable `space` is precisely one space. The comment ‘# end of the line’ is included here just for clarity. Since trailing space characters are *not* stripped from variable values, just a space at the end of the line would have the same effect (but be rather hard to read). If you put whitespace at the end of a variable value, it is a good idea to put a comment like that at the end of the line to make your intent clear. Conversely, if you do *not* want any whitespace characters at the end of your variable value, you must remember not to put a random comment on the end of the line after some whitespace, such as this:

```
dir := /foo/bar    # directory to put the frobs in
```

Here the value of the variable `dir` is ‘/foo/bar  ’ (with four trailing spaces), which was probably not the intention. (Imagine something like ‘$(dir)/file’ with this definition!)





### 6.2.3 Immediately Expanded Variable Assignment



Another form of assignment allows for immediate expansion, but unlike simple assignment the resulting variable is recursive: it will be re-expanded again on every use. In order to avoid unexpected results, after the value is immediately expanded it will automatically be quoted: all instances of `$` in the value after expansion will be converted into `$$`. This type of assignment uses the ‘:::=’ operator. For example,

```
var = first
OUT :::= $(var)
var = second
```

results in the `OUT` variable containing the text ‘first’, while here:

```
var = one$$two
OUT :::= $(var)
var = three$$four
```

results in the `OUT` variable containing the text ‘one$$two’. The value is expanded when the variable is assigned, so the result is the expansion of the first value of `var`, ‘one$two’; then the value is re-escaped before the assignment is complete giving the final result of ‘one$$two’.

The variable `OUT` is thereafter considered a recursive variable, so it will be re-expanded when it is used.

This seems functionally equivalent to the ‘:=’ / ‘::=’ operators, but there are a few differences:

First, after assignment the variable is a normal recursive variable; when you append to it with ‘+=’ the value on the right-hand side is not expanded immediately. If you prefer the ‘+=’ operator to expand the right-hand side immediately you should use the ‘:=’ / ‘::=’ assignment instead.

Second, these variables are slightly less efficient than simply expanded variables since they do need to be re-expanded when they are used, rather than merely copied. However since all variable references are escaped this expansion simply un-escapes the value, it won’t expand any variables or run any functions.

Here is another example:

```
var = one$$two
OUT :::= $(var)
OUT += $(var)
var = three$$four
```

After this, the value of `OUT` is the text ‘one$$two $(var)’. When this variable is used it will be expanded and the result will be ‘one$two three$four’.

This style of assignment is equivalent to the traditional BSD `make` ‘:=’ operator; as you can see it works slightly differently than the GNU `make` ‘:=’ operator. The `:::=` operator is added to the POSIX specification in Issue 8 to provide portability.





### 6.2.4 Conditional Variable Assignment



There is another assignment operator for variables, ‘?=’. This is called a conditional variable assignment operator, because it only has an effect if the variable is not yet defined. This statement:

```
FOO ?= bar
```

is exactly equivalent to this (see [The `origin` Function](https://www.gnu.org/software/make/manual/make.html#Origin-Function)):

```
ifeq ($(origin FOO), undefined)
  FOO = bar
endif
```

Note that a variable set to an empty value is still defined, so ‘?=’ will not set that variable.





## 6.3 Advanced Features for Reference to Variables



This section describes some advanced features you can use to reference variables in more flexible ways.

- [Substitution References](https://www.gnu.org/software/make/manual/make.html#Substitution-Refs)
- [Computed Variable Names](https://www.gnu.org/software/make/manual/make.html#Computed-Names)





### 6.3.1 Substitution References



A *substitution reference* substitutes the value of a variable with alterations that you specify. It has the form ‘$(var:a=b)’ (or ‘${var:a=b}’) and its meaning is to take the value of the variable var, replace every a at the end of a word with b in that value, and substitute the resulting string.

When we say “at the end of a word”, we mean that a must appear either followed by whitespace or at the end of the value in order to be replaced; other occurrences of a in the value are unaltered. For example:

```
foo := a.o b.o l.a c.o
bar := $(foo:.o=.c)
```

sets ‘bar’ to ‘a.c b.c l.a c.c’. See [Setting Variables](https://www.gnu.org/software/make/manual/make.html#Setting).

A substitution reference is shorthand for the `patsubst` expansion function (see [Functions for String Substitution and Analysis](https://www.gnu.org/software/make/manual/make.html#Text-Functions)): ‘$(var:a=b)’ is equivalent to ‘$(patsubst %a,%b,var)’. We provide substitution references as well as `patsubst` for compatibility with other implementations of `make`.



Another type of substitution reference lets you use the full power of the `patsubst` function. It has the same form ‘$(var:a=b)’ described above, except that now a must contain a single ‘%’ character. This case is equivalent to ‘$(patsubst a,b,$(var))’. See [Functions for String Substitution and Analysis](https://www.gnu.org/software/make/manual/make.html#Text-Functions), for a description of the `patsubst` function. For example:

```
foo := a.o b.o l.a c.o
bar := $(foo:%.o=%.c)
```

sets ‘bar’ to ‘a.c b.c l.a c.c’.





### 6.3.2 Computed Variable Names



Computed variable names are an advanced concept, very useful in more sophisticated makefile programming. In simple situations you need not consider them, but they can be extremely useful.

Variables may be referenced inside the name of a variable. This is called a *computed variable name* or a *nested variable reference*. For example,

```
x = y
y = z
a := $($(x))
```

defines `a` as ‘z’: the ‘$(x)’ inside ‘$($(x))’ expands to ‘y’, so ‘$($(x))’ expands to ‘$(y)’ which in turn expands to ‘z’. Here the name of the variable to reference is not stated explicitly; it is computed by expansion of ‘$(x)’. The reference ‘$(x)’ here is nested within the outer variable reference.

The previous example shows two levels of nesting, but any number of levels is possible. For example, here are three levels:

```
x = y
y = z
z = u
a := $($($(x)))
```

Here the innermost ‘$(x)’ expands to ‘y’, so ‘$($(x))’ expands to ‘$(y)’ which in turn expands to ‘z’; now we have ‘$(z)’, which becomes ‘u’.

References to recursively-expanded variables within a variable name are re-expanded in the usual fashion. For example:

```
x = $(y)
y = z
z = Hello
a := $($(x))
```

defines `a` as ‘Hello’: ‘$($(x))’ becomes ‘$($(y))’ which becomes ‘$(z)’ which becomes ‘Hello’.

Nested variable references can also contain modified references and function invocations (see [Functions for Transforming Text](https://www.gnu.org/software/make/manual/make.html#Functions)), just like any other reference. For example, using the `subst` function (see [Functions for String Substitution and Analysis](https://www.gnu.org/software/make/manual/make.html#Text-Functions)):

```
x = variable1
variable2 := Hello
y = $(subst 1,2,$(x))
z = y
a := $($($(z)))
```

eventually defines `a` as ‘Hello’. It is doubtful that anyone would ever want to write a nested reference as convoluted as this one, but it works: ‘$($($(z)))’ expands to ‘$($(y))’ which becomes ‘$($(subst 1,2,$(x)))’. This gets the value ‘variable1’ from `x` and changes it by substitution to ‘variable2’, so that the entire string becomes ‘$(variable2)’, a simple variable reference whose value is ‘Hello’.

A computed variable name need not consist entirely of a single variable reference. It can contain several variable references, as well as some invariant text. For example,

```
a_dirs := dira dirb
1_dirs := dir1 dir2

a_files := filea fileb
1_files := file1 file2

ifeq "$(use_a)" "yes"
a1 := a
else
a1 := 1
endif

ifeq "$(use_dirs)" "yes"
df := dirs
else
df := files
endif

dirs := $($(a1)_$(df))
```

will give `dirs` the same value as `a_dirs`, `1_dirs`, `a_files` or `1_files` depending on the settings of `use_a` and `use_dirs`.

Computed variable names can also be used in substitution references:

```
a_objects := a.o b.o c.o
1_objects := 1.o 2.o 3.o

sources := $($(a1)_objects:.o=.c)
```

defines `sources` as either ‘a.c b.c c.c’ or ‘1.c 2.c 3.c’, depending on the value of `a1`.

The only restriction on this sort of use of nested variable references is that they cannot specify part of the name of a function to be called. This is because the test for a recognized function name is done before the expansion of nested references. For example,

```
ifdef do_sort
func := sort
else
func := strip
endif

bar := a d b g q c

foo := $($(func) $(bar))
```

attempts to give ‘foo’ the value of the variable ‘sort a d b g q c’ or ‘strip a d b g q c’, rather than giving ‘a d b g q c’ as the argument to either the `sort` or the `strip` function. This restriction could be removed in the future if that change is shown to be a good idea.

You can also use computed variable names in the left-hand side of a variable assignment, or in a `define` directive, as in:

```
dir = foo
$(dir)_sources := $(wildcard $(dir)/*.c)
define $(dir)_print =
lpr $($(dir)_sources)
endef
```

This example defines the variables ‘dir’, ‘foo_sources’, and ‘foo_print’.

Note that *nested variable references* are quite different from *recursively expanded variables* (see [The Two Flavors of Variables](https://www.gnu.org/software/make/manual/make.html#Flavors)), though both are used together in complex ways when doing makefile programming.





## 6.4 How Variables Get Their Values



Variables can get values in several different ways:

- You can specify an overriding value when you run `make`. See [Overriding Variables](https://www.gnu.org/software/make/manual/make.html#Overriding).
- You can specify a value in the makefile, either with an assignment (see [Setting Variables](https://www.gnu.org/software/make/manual/make.html#Setting)) or with a verbatim definition (see [Defining Multi-Line Variables](https://www.gnu.org/software/make/manual/make.html#Multi_002dLine)).
- You can specify a short-lived value with the `let` function (see [The `let` Function](https://www.gnu.org/software/make/manual/make.html#Let-Function)) or with the `foreach` function (see [The `foreach` Function](https://www.gnu.org/software/make/manual/make.html#Foreach-Function)).
- Variables in the environment become `make` variables. See [Variables from the Environment](https://www.gnu.org/software/make/manual/make.html#Environment).
- Several *automatic* variables are given new values for each rule. Each of these has a single conventional use. See [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables).
- Several variables have constant initial values. See [Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables).





## 6.5 Setting Variables



To set a variable from the makefile, write a line starting with the variable name followed by one of the assignment operators ‘=’, ‘:=’, ‘::=’, or ‘:::=’. Whatever follows the operator and any initial whitespace on the line becomes the value. For example,

```
objects = main.o foo.o bar.o utils.o
```

defines a variable named `objects` to contain the value ‘main.o foo.o bar.o utils.o’. Whitespace around the variable name and immediately after the ‘=’ is ignored.

Variables defined with ‘=’ are *recursively expanded* variables. Variables defined with ‘:=’ or ‘::=’ are *simply expanded* variables; these definitions can contain variable references which will be expanded before the definition is made. Variables defined with ‘:::=’ are *immediately expanded* variables. The different assignment operators are described in See [The Two Flavors of Variables](https://www.gnu.org/software/make/manual/make.html#Flavors).

The variable name may contain function and variable references, which are expanded when the line is read to find the actual variable name to use.

There is no limit on the length of the value of a variable except the amount of memory on the computer. You can split the value of a variable into multiple physical lines for readability (see [Splitting Long Lines](https://www.gnu.org/software/make/manual/make.html#Splitting-Lines)).

Most variable names are considered to have the empty string as a value if you have never set them. Several variables have built-in initial values that are not empty, but you can set them in the usual ways (see [Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)). Several special variables are set automatically to a new value for each rule; these are called the *automatic* variables (see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)).

If you’d like a variable to be set to a value only if it’s not already set, then you can use the shorthand operator ‘?=’ instead of ‘=’. These two settings of the variable ‘FOO’ are identical (see [The `origin` Function](https://www.gnu.org/software/make/manual/make.html#Origin-Function)):

```
FOO ?= bar
```

and

```
ifeq ($(origin FOO), undefined)
FOO = bar
endif
```

The shell assignment operator ‘!=’ can be used to execute a shell script and set a variable to its output. This operator first evaluates the right-hand side, then passes that result to the shell for execution. If the result of the execution ends in a newline, that one newline is removed; all other newlines are replaced by spaces. The resulting string is then placed into the named recursively-expanded variable. For example:

```
hash != printf '\043'
file_list != find . -name '*.c'
```

If the result of the execution could produce a `$`, and you don’t intend what follows that to be interpreted as a make variable or function reference, then you must replace every `$` with `$$` as part of the execution. Alternatively, you can set a simply expanded variable to the result of running a program using the `shell` function call. See [The `shell` Function](https://www.gnu.org/software/make/manual/make.html#Shell-Function). For example:

```
hash := $(shell printf '\043')
var := $(shell find . -name "*.c")
```

As with the `shell` function, the exit status of the just-invoked shell script is stored in the `.SHELLSTATUS` variable.





## 6.6 Appending More Text to Variables



Often it is useful to add more text to the value of a variable already defined. You do this with a line containing ‘+=’, like this:

```
objects += another.o
```

This takes the value of the variable `objects`, and adds the text ‘another.o’ to it (preceded by a single space, if it has a value already). Thus:

```
objects = main.o foo.o bar.o utils.o
objects += another.o
```

sets `objects` to ‘main.o foo.o bar.o utils.o another.o’.

Using ‘+=’ is similar to:

```
objects = main.o foo.o bar.o utils.o
objects := $(objects) another.o
```

but differs in ways that become important when you use more complex values.

When the variable in question has not been defined before, ‘+=’ acts just like normal ‘=’: it defines a recursively-expanded variable. However, when there *is* a previous definition, exactly what ‘+=’ does depends on what flavor of variable you defined originally. See [The Two Flavors of Variables](https://www.gnu.org/software/make/manual/make.html#Flavors), for an explanation of the two flavors of variables.

When you add to a variable’s value with ‘+=’, `make` acts essentially as if you had included the extra text in the initial definition of the variable. If you defined it first with ‘:=’ or ‘::=’, making it a simply-expanded variable, ‘+=’ adds to that simply-expanded definition, and expands the new text before appending it to the old value just as ‘:=’ does (see [Setting Variables](https://www.gnu.org/software/make/manual/make.html#Setting), for a full explanation of ‘:=’ or ‘::=’). In fact,

```
variable := value
variable += more
```

is exactly equivalent to:

```
variable := value
variable := $(variable) more
```

On the other hand, when you use ‘+=’ with a variable that you defined first to be recursively-expanded using plain ‘=’ or ‘:::=’, `make` appends the un-expanded text to the existing value, whatever it is. This means that

```
variable = value
variable += more
```

is roughly equivalent to:

```
temp = value
variable = $(temp) more
```

except that of course it never defines a variable called `temp`. The importance of this comes when the variable’s old value contains variable references. Take this common example:

```
CFLAGS = $(includes) -O
…
CFLAGS += -pg # enable profiling
```

The first line defines the `CFLAGS` variable with a reference to another variable, `includes`. (`CFLAGS` is used by the rules for C compilation; see [Catalogue of Built-In Rules](https://www.gnu.org/software/make/manual/make.html#Catalogue-of-Rules).) Using ‘=’ for the definition makes `CFLAGS` a recursively-expanded variable, meaning ‘$(includes) -O’ is *not* expanded when `make` processes the definition of `CFLAGS`. Thus, `includes` need not be defined yet for its value to take effect. It only has to be defined before any reference to `CFLAGS`. If we tried to append to the value of `CFLAGS` without using ‘+=’, we might do it like this:

```
CFLAGS := $(CFLAGS) -pg # enable profiling
```

This is pretty close, but not quite what we want. Using ‘:=’ redefines `CFLAGS` as a simply-expanded variable; this means `make` expands the text ‘$(CFLAGS) -pg’ before setting the variable. If `includes` is not yet defined, we get ‘ -O -pg’, and a later definition of `includes` will have no effect. Conversely, by using ‘+=’ we set `CFLAGS` to the *unexpanded* value ‘$(includes) -O -pg’. Thus we preserve the reference to `includes`, so if that variable gets defined at any later point, a reference like ‘$(CFLAGS)’ still uses its value.





## 6.7 The `override` Directive



If a variable has been set with a command argument (see [Overriding Variables](https://www.gnu.org/software/make/manual/make.html#Overriding)), then ordinary assignments in the makefile are ignored. If you want to set the variable in the makefile even though it was set with a command argument, you can use an `override` directive, which is a line that looks like this:

```
override variable = value
```

or

```
override variable := value
```

To append more text to a variable defined on the command line, use:

```
override variable += more text
```

See [Appending More Text to Variables](https://www.gnu.org/software/make/manual/make.html#Appending).

Variable assignments marked with the `override` flag have a higher priority than all other assignments, except another `override`. Subsequent assignments or appends to this variable which are not marked `override` will be ignored.

The `override` directive was not invented for escalation in the war between makefiles and command arguments. It was invented so you can alter and add to values that the user specifies with command arguments.

For example, suppose you always want the ‘-g’ switch when you run the C compiler, but you would like to allow the user to specify the other switches with a command argument just as usual. You could use this `override` directive:

```
override CFLAGS += -g
```

You can also use `override` directives with `define` directives. This is done as you might expect:

```
override define foo =
bar
endef
```

See [Defining Multi-Line Variables](https://www.gnu.org/software/make/manual/make.html#Multi_002dLine).





## 6.8 Defining Multi-Line Variables



Another way to set the value of a variable is to use the `define` directive. This directive has an unusual syntax which allows newline characters to be included in the value, which is convenient for defining both canned sequences of commands (see [Defining Canned Recipes](https://www.gnu.org/software/make/manual/make.html#Canned-Recipes)), and also sections of makefile syntax to use with `eval` (see [The `eval` Function](https://www.gnu.org/software/make/manual/make.html#Eval-Function)).

The `define` directive is followed on the same line by the name of the variable being defined and an (optional) assignment operator, and nothing more. The value to give the variable appears on the following lines. The end of the value is marked by a line containing just the word `endef`.

Aside from this difference in syntax, `define` works just like any other variable definition. The variable name may contain function and variable references, which are expanded when the directive is read to find the actual variable name to use.

The final newline before the `endef` is not included in the value; if you want your value to contain a trailing newline you must include a blank line. For example in order to define a variable that contains a newline character you must use *two* empty lines, not one:

```
define newline


endef
```

You may omit the variable assignment operator if you prefer. If omitted, `make` assumes it to be ‘=’ and creates a recursively-expanded variable (see [The Two Flavors of Variables](https://www.gnu.org/software/make/manual/make.html#Flavors)). When using a ‘+=’ operator, the value is appended to the previous value as with any other append operation: with a single space separating the old and new values.

You may nest `define` directives: `make` will keep track of nested directives and report an error if they are not all properly closed with `endef`. Note that lines beginning with the recipe prefix character are considered part of a recipe, so any `define` or `endef` strings appearing on such a line will not be considered `make` directives.

```
define two-lines
echo foo
echo $(bar)
endef
```

When used in a recipe, the previous example is functionally equivalent to this:

```
two-lines = echo foo; echo $(bar)
```

since two commands separated by semicolon behave much like two separate shell commands. However, note that using two separate lines means `make` will invoke the shell twice, running an independent sub-shell for each line. See [Recipe Execution](https://www.gnu.org/software/make/manual/make.html#Execution).

If you want variable definitions made with `define` to take precedence over command-line variable definitions, you can use the `override` directive together with `define`:

```
override define two-lines =
foo
$(bar)
endef
```

See [The `override` Directive](https://www.gnu.org/software/make/manual/make.html#Override-Directive).





## 6.9 Undefining Variables



If you want to clear a variable, setting its value to empty is usually sufficient. Expanding such a variable will yield the same result (empty string) regardless of whether it was set or not. However, if you are using the `flavor` (see [The `flavor` Function](https://www.gnu.org/software/make/manual/make.html#Flavor-Function)) and `origin` (see [The `origin` Function](https://www.gnu.org/software/make/manual/make.html#Origin-Function)) functions, there is a difference between a variable that was never set and a variable with an empty value. In such situations you may want to use the `undefine` directive to make a variable appear as if it was never set. For example:

```
foo := foo
bar = bar

undefine foo
undefine bar

$(info $(origin foo))
$(info $(flavor bar))
```

This example will print “undefined” for both variables.

If you want to undefine a command-line variable definition, you can use the `override` directive together with `undefine`, similar to how this is done for variable definitions:

```
override undefine CFLAGS
```





## 6.10 Variables from the Environment



Variables in `make` can come from the environment in which `make` is run. Every environment variable that `make` sees when it starts up is transformed into a `make` variable with the same name and value. However, an explicit assignment in the makefile, or with a command argument, overrides the environment. (If the ‘-e’ flag is specified, then values from the environment override assignments in the makefile. See [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary). But this is not recommended practice.)

Thus, by setting the variable `CFLAGS` in your environment, you can cause all C compilations in most makefiles to use the compiler switches you prefer. This is safe for variables with standard or conventional meanings because you know that no makefile will use them for other things. (Note this is not totally reliable; some makefiles set `CFLAGS` explicitly and therefore are not affected by the value in the environment.)

When `make` runs a recipe, some variables defined in the makefile are placed into the environment of each command `make` invokes. By default, only variables that came from the `make`’s environment or set on its command line are placed into the environment of the commands. You can use the `export` directive to pass other variables. See [Communicating Variables to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Variables_002fRecursion), for full details.

Other use of variables from the environment is not recommended. It is not wise for makefiles to depend for their functioning on environment variables set up outside their control, since this would cause different users to get different results from the same makefile. This is against the whole purpose of most makefiles.



Such problems would be especially likely with the variable `SHELL`, which is normally present in the environment to specify the user’s choice of interactive shell. It would be very undesirable for this choice to affect `make`; so, `make` handles the `SHELL` environment variable in a special way; see [Choosing the Shell](https://www.gnu.org/software/make/manual/make.html#Choosing-the-Shell).





## 6.11 Target-specific Variable Values



Variable values in `make` are usually global; that is, they are the same regardless of where they are evaluated (unless they’re reset, of course). Exceptions to that are variables defined with the `let` function (see [The `let` Function](https://www.gnu.org/software/make/manual/make.html#Let-Function)) or the `foreach` function (see [The `foreach` Function](https://www.gnu.org/software/make/manual/make.html#Foreach-Function), and automatic variables (see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)).

Another exception are *target-specific variable values*. This feature allows you to define different values for the same variable, based on the target that `make` is currently building. As with automatic variables, these values are only available within the context of a target’s recipe (and in other target-specific assignments).

Set a target-specific variable value like this:

```
target … : variable-assignment
```

Target-specific variable assignments can be prefixed with any or all of the special keywords `export`, `unexport`, `override`, or `private`; these apply their normal behavior to this instance of the variable only.

Multiple target values create a target-specific variable value for each member of the target list individually.

The variable-assignment can be any valid form of assignment; recursive (‘=’), simple (‘:=’ or ‘::=’), immediate (‘::=’), appending (‘+=’), or conditional (‘?=’). All variables that appear within the variable-assignment are evaluated within the context of the target: thus, any previously-defined target-specific variable values will be in effect. Note that this variable is actually distinct from any “global” value: the two variables do not have to have the same flavor (recursive vs. simple).

Target-specific variables have the same priority as any other makefile variable. Variables provided on the command line (and in the environment if the ‘-e’ option is in force) will take precedence. Specifying the `override` directive will allow the target-specific variable value to be preferred.

There is one more special feature of target-specific variables: when you define a target-specific variable that variable value is also in effect for all prerequisites of this target, and all their prerequisites, etc. (unless those prerequisites override that variable with their own target-specific variable value). So, for example, a statement like this:

```
prog : CFLAGS = -g
prog : prog.o foo.o bar.o
```

will set `CFLAGS` to ‘-g’ in the recipe for prog, but it will also set `CFLAGS` to ‘-g’ in the recipes that create prog.o, foo.o, and bar.o, and any recipes which create their prerequisites.

Be aware that a given prerequisite will only be built once per invocation of make, at most. If the same file is a prerequisite of multiple targets, and each of those targets has a different value for the same target-specific variable, then the first target to be built will cause that prerequisite to be built and the prerequisite will inherit the target-specific value from the first target. It will ignore the target-specific values from any other targets.





## 6.12 Pattern-specific Variable Values



In addition to target-specific variable values (see [Target-specific Variable Values](https://www.gnu.org/software/make/manual/make.html#Target_002dspecific)), GNU `make` supports pattern-specific variable values. In this form, the variable is defined for any target that matches the pattern specified.

Set a pattern-specific variable value like this:

```
pattern … : variable-assignment
```

where pattern is a %-pattern. As with target-specific variable values, multiple pattern values create a pattern-specific variable value for each pattern individually. The variable-assignment can be any valid form of assignment. Any command line variable setting will take precedence, unless `override` is specified.

For example:

```
%.o : CFLAGS = -O
```

will assign `CFLAGS` the value of ‘-O’ for all targets matching the pattern `%.o`.

If a target matches more than one pattern, the matching pattern-specific variables with longer stems are interpreted first. This results in more specific variables taking precedence over the more generic ones, for example:

```
%.o: %.c
        $(CC) -c $(CFLAGS) $(CPPFLAGS) $< -o $@

lib/%.o: CFLAGS := -fPIC -g
%.o: CFLAGS := -g

all: foo.o lib/bar.o
```

In this example the first definition of the `CFLAGS` variable will be used to update lib/bar.o even though the second one also applies to this target. Pattern-specific variables which result in the same stem length are considered in the order in which they were defined in the makefile.

Pattern-specific variables are searched after any target-specific variables defined explicitly for that target, and before target-specific variables defined for the parent target.





## 6.13 Suppressing Inheritance



As described in previous sections, `make` variables are inherited by prerequisites. This capability allows you to modify the behavior of a prerequisite based on which targets caused it to be rebuilt. For example, you might set a target-specific variable on a `debug` target, then running ‘make debug’ will cause that variable to be inherited by all prerequisites of `debug`, while just running ‘make all’ (for example) would not have that assignment.

Sometimes, however, you may not want a variable to be inherited. For these situations, `make` provides the `private` modifier. Although this modifier can be used with any variable assignment, it makes the most sense with target- and pattern-specific variables. Any variable marked `private` will be visible to its local target but will not be inherited by prerequisites of that target. A global variable marked `private` will be visible in the global scope but will not be inherited by any target, and hence will not be visible in any recipe.

As an example, consider this makefile:

```
EXTRA_CFLAGS =

prog: private EXTRA_CFLAGS = -L/usr/local/lib
prog: a.o b.o
```

Due to the `private` modifier, `a.o` and `b.o` will not inherit the `EXTRA_CFLAGS` variable assignment from the `prog` target.





## 6.14 Other Special Variables



GNU `make` supports some variables that have special properties.

- `MAKEFILE_LIST`

  Contains the name of each makefile that is parsed by `make`, in the order in which it was parsed. The name is appended just before `make` begins to parse the makefile. Thus, if the first thing a makefile does is examine the last word in this variable, it will be the name of the current makefile. Once the current makefile has used `include`, however, the last word will be the just-included makefile.If a makefile named `Makefile` has this content:`name1 := $(lastword $(MAKEFILE_LIST)) include inc.mk name2 := $(lastword $(MAKEFILE_LIST)) all:        @echo name1 = $(name1)        @echo name2 = $(name2) `then you would expect to see this output:`name1 = Makefile name2 = inc.mk `

- `.DEFAULT_GOAL`

  Sets the default goal to be used if no targets were specified on the command line (see [Arguments to Specify the Goals](https://www.gnu.org/software/make/manual/make.html#Goals)). The `.DEFAULT_GOAL` variable allows you to discover the current default goal, restart the default goal selection algorithm by clearing its value, or to explicitly set the default goal. The following example illustrates these cases:`# Query the default goal. ifeq ($(.DEFAULT_GOAL),)  $(warning no default goal is set) endif .PHONY: foo foo: ; @echo $@ $(warning default goal is $(.DEFAULT_GOAL)) # Reset the default goal. .DEFAULT_GOAL := .PHONY: bar bar: ; @echo $@ $(warning default goal is $(.DEFAULT_GOAL)) # Set our own. .DEFAULT_GOAL := foo `This makefile prints:`no default goal is set default goal is foo default goal is bar foo `Note that assigning more than one target name to `.DEFAULT_GOAL` is invalid and will result in an error.

- `MAKE_RESTARTS`

  This variable is set only if this instance of `make` has restarted (see [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)): it will contain the number of times this instance has restarted. Note this is not the same as recursion (counted by the `MAKELEVEL` variable). You should not set, modify, or export this variable.

- `MAKE_TERMOUT`

- `MAKE_TERMERR`

  When `make` starts it will check whether stdout and stderr will show their output on a terminal. If so, it will set `MAKE_TERMOUT` and `MAKE_TERMERR`, respectively, to the name of the terminal device (or `true` if this cannot be determined). If set these variables will be marked for export. These variables will not be changed by `make` and they will not be modified if already set.These values can be used (particularly in combination with output synchronization (see [Output During Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Output)) to determine whether `make` itself is writing to a terminal; they can be tested to decide whether to force recipe commands to generate colorized output for example.If you invoke a sub-`make` and redirect its stdout or stderr it is your responsibility to reset or unexport these variables as well, if your makefiles rely on them.

- `.RECIPEPREFIX`

  The first character of the value of this variable is used as the character make assumes is introducing a recipe line. If the variable is empty (as it is by default) that character is the standard tab character. For example, this is a valid makefile:`.RECIPEPREFIX = > all: > @echo Hello, world `The value of `.RECIPEPREFIX` can be changed multiple times; once set it stays in effect for all rules parsed until it is modified.

- `.VARIABLES`

  Expands to a list of the *names* of all global variables defined so far. This includes variables which have empty values, as well as built-in variables (see [Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)), but does not include any variables which are only defined in a target-specific context. Note that any value you assign to this variable will be ignored; it will always return its special value.

- `.FEATURES`

  Expands to a list of special features supported by this version of `make`. Possible values include, but are not limited to:‘archives’Supports `ar` (archive) files using special file name syntax. See [Using `make` to Update Archive Files](https://www.gnu.org/software/make/manual/make.html#Archives).‘check-symlink’Supports the `-L` (`--check-symlink-times`) flag. See [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary).‘else-if’Supports “else if” non-nested conditionals. See [Syntax of Conditionals](https://www.gnu.org/software/make/manual/make.html#Conditional-Syntax).‘extra-prereqs’Supports the `.EXTRA_PREREQS` special target.‘grouped-target’Supports grouped target syntax for explicit rules. See [Multiple Targets in a Rule](https://www.gnu.org/software/make/manual/make.html#Multiple-Targets).‘guile’Has GNU Guile available as an embedded extension language. See [GNU Guile Integration](https://www.gnu.org/software/make/manual/make.html#Guile-Integration).‘jobserver’Supports “job server” enhanced parallel builds. See [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel).‘jobserver-fifo’Supports “job server” enhanced parallel builds using named pipes. See [Integrating GNU `make`](https://www.gnu.org/software/make/manual/make.html#Integrating-make).‘load’Supports dynamically loadable objects for creating custom extensions. See [Loading Dynamic Objects](https://www.gnu.org/software/make/manual/make.html#Loading-Objects).‘notintermediate’Supports the `.NOTINTERMEDIATE` special target. See [Integrating GNU `make`](https://www.gnu.org/software/make/manual/make.html#Integrating-make).‘oneshell’Supports the `.ONESHELL` special target. See [Using One Shell](https://www.gnu.org/software/make/manual/make.html#One-Shell).‘order-only’Supports order-only prerequisites. See [Types of Prerequisites](https://www.gnu.org/software/make/manual/make.html#Prerequisite-Types).‘output-sync’Supports the `--output-sync` command line option. See [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary).‘second-expansion’Supports secondary expansion of prerequisite lists.‘shell-export’Supports exporting `make` variables to `shell` functions.‘shortest-stem’Uses the “shortest stem” method of choosing which pattern, of multiple applicable options, will be used. See [How Patterns Match](https://www.gnu.org/software/make/manual/make.html#Pattern-Match).‘target-specific’Supports target-specific and pattern-specific variable assignments. See [Target-specific Variable Values](https://www.gnu.org/software/make/manual/make.html#Target_002dspecific).‘undefine’Supports the `undefine` directive. See [Undefining Variables](https://www.gnu.org/software/make/manual/make.html#Undefine-Directive).

- `.INCLUDE_DIRS`

  Expands to a list of directories that `make` searches for included makefiles (see [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include)). Note that modifying this variable’s value does not change the list of directories which are searched.

- `.EXTRA_PREREQS`

  Each word in this variable is a new prerequisite which is added to targets for which it is set. These prerequisites differ from normal prerequisites in that they do not appear in any of the automatic variables (see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)). This allows prerequisites to be defined which do not impact the recipe.Consider a rule to link a program:`myprog: myprog.o file1.o file2.o       $(CC) $(CFLAGS) $(LDFLAGS) -o $@ $^ $(LDLIBS) `Now suppose you want to enhance this makefile to ensure that updates to the compiler cause the program to be re-linked. You can add the compiler as a prerequisite, but you must ensure that it’s not passed as an argument to link command. You’ll need something like this:`myprog: myprog.o file1.o file2.o $(CC)       $(CC) $(CFLAGS) $(LDFLAGS) -o $@ \           $(filter-out $(CC),$^) $(LDLIBS) `Then consider having multiple extra prerequisites: they would all have to be filtered out. Using `.EXTRA_PREREQS` and target-specific variables provides a simpler solution:`myprog: myprog.o file1.o file2.o       $(CC) $(CFLAGS) $(LDFLAGS) -o $@ $^ $(LDLIBS) myprog: .EXTRA_PREREQS = $(CC) `This feature can also be useful if you want to add prerequisites to a makefile you cannot easily modify: you can create a new file such as extra.mk:`myprog: .EXTRA_PREREQS = $(CC) `then invoke `make -f extra.mk -f Makefile`.Setting `.EXTRA_PREREQS` globally will cause those prerequisites to be added to all targets (which did not themselves override it with a target-specific value). Note `make` is smart enough not to add a prerequisite listed in `.EXTRA_PREREQS` as a prerequisite to itself.