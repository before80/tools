+++
title = "7 Conditional Parts of Makefiles"
date = 2023-08-21T17:04:46+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 7 Conditional Parts of Makefiles

https://www.gnu.org/software/make/manual/make.html#Conditionals



A *conditional* directive causes part of a makefile to be obeyed or ignored depending on the values of variables. Conditionals can compare the value of one variable to another, or the value of a variable to a constant string. Conditionals control what `make` actually “sees” in the makefile, so they *cannot* be used to control recipes at the time of execution.







## 7.1 Example of a Conditional

The following example of a conditional tells `make` to use one set of libraries if the `CC` variable is ‘gcc’, and a different set of libraries otherwise. It works by controlling which of two recipe lines will be used for the rule. The result is that ‘CC=gcc’ as an argument to `make` changes not only which compiler is used but also which libraries are linked.

```
libs_for_gcc = -lgnu
normal_libs =

foo: $(objects)
ifeq ($(CC),gcc)
        $(CC) -o foo $(objects) $(libs_for_gcc)
else
        $(CC) -o foo $(objects) $(normal_libs)
endif
```

This conditional uses three directives: one `ifeq`, one `else` and one `endif`.

The `ifeq` directive begins the conditional, and specifies the condition. It contains two arguments, separated by a comma and surrounded by parentheses. Variable substitution is performed on both arguments and then they are compared. The lines of the makefile following the `ifeq` are obeyed if the two arguments match; otherwise they are ignored.

The `else` directive causes the following lines to be obeyed if the previous conditional failed. In the example above, this means that the second alternative linking command is used whenever the first alternative is not used. It is optional to have an `else` in a conditional.

The `endif` directive ends the conditional. Every conditional must end with an `endif`. Unconditional makefile text follows.

As this example illustrates, conditionals work at the textual level: the lines of the conditional are treated as part of the makefile, or ignored, according to the condition. This is why the larger syntactic units of the makefile, such as rules, may cross the beginning or the end of the conditional.

When the variable `CC` has the value ‘gcc’, the above example has this effect:

```
foo: $(objects)
        $(CC) -o foo $(objects) $(libs_for_gcc)
```

When the variable `CC` has any other value, the effect is this:

```
foo: $(objects)
        $(CC) -o foo $(objects) $(normal_libs)
```

Equivalent results can be obtained in another way by conditionalizing a variable assignment and then using the variable unconditionally:

```
libs_for_gcc = -lgnu
normal_libs =

ifeq ($(CC),gcc)
  libs=$(libs_for_gcc)
else
  libs=$(normal_libs)
endif

foo: $(objects)
        $(CC) -o foo $(objects) $(libs)
```





## 7.2 Syntax of Conditionals



The syntax of a simple conditional with no `else` is as follows:

```
conditional-directive
text-if-true
endif
```

The text-if-true may be any lines of text, to be considered as part of the makefile if the condition is true. If the condition is false, no text is used instead.

The syntax of a complex conditional is as follows:

```
conditional-directive
text-if-true
else
text-if-false
endif
```

or:

```
conditional-directive-one
text-if-one-is-true
else conditional-directive-two
text-if-two-is-true
else
text-if-one-and-two-are-false
endif
```

There can be as many “`else` conditional-directive” clauses as necessary. Once a given condition is true, text-if-true is used and no other clause is used; if no condition is true then text-if-false is used. The text-if-true and text-if-false can be any number of lines of text.

The syntax of the conditional-directive is the same whether the conditional is simple or complex; after an `else` or not. There are four different directives that test different conditions. Here is a table of them:

- `ifeq (arg1, arg2)`

- `ifeq 'arg1' 'arg2'`

- `ifeq "arg1" "arg2"`

- `ifeq "arg1" 'arg2'`

- `ifeq 'arg1' "arg2"`

  Expand all variable references in arg1 and arg2 and compare them. If they are identical, the text-if-true is effective; otherwise, the text-if-false, if any, is effective.Often you want to test if a variable has a non-empty value. When the value results from complex expansions of variables and functions, expansions you would consider empty may actually contain whitespace characters and thus are not seen as empty. However, you can use the `strip` function (see [Functions for String Substitution and Analysis](https://www.gnu.org/software/make/manual/make.html#Text-Functions)) to avoid interpreting whitespace as a non-empty value. For example:`ifeq ($(strip $(foo)),) text-if-empty endif `will evaluate text-if-empty even if the expansion of `$(foo)` contains whitespace characters.

- `ifneq (arg1, arg2)`

- `ifneq 'arg1' 'arg2'`

- `ifneq "arg1" "arg2"`

- `ifneq "arg1" 'arg2'`

- `ifneq 'arg1' "arg2"`

  Expand all variable references in arg1 and arg2 and compare them. If they are different, the text-if-true is effective; otherwise, the text-if-false, if any, is effective.

- `ifdef variable-name`

  The `ifdef` form takes the *name* of a variable as its argument, not a reference to a variable. If the value of that variable has a non-empty value, the text-if-true is effective; otherwise, the text-if-false, if any, is effective. Variables that have never been defined have an empty value. The text variable-name is expanded, so it could be a variable or function that expands to the name of a variable. For example:`bar = true foo = bar ifdef $(foo) frobozz = yes endif `The variable reference `$(foo)` is expanded, yielding `bar`, which is considered to be the name of a variable. The variable `bar` is not expanded, but its value is examined to determine if it is non-empty.Note that `ifdef` only tests whether a variable has a value. It does not expand the variable to see if that value is nonempty. Consequently, tests using `ifdef` return true for all definitions except those like `foo =`. To test for an empty value, use `ifeq ($(foo),)`. For example,`bar = foo = $(bar) ifdef foo frobozz = yes else frobozz = no endif `sets ‘frobozz’ to ‘yes’, while:`foo = ifdef foo frobozz = yes else frobozz = no endif `sets ‘frobozz’ to ‘no’.

- `ifndef variable-name`

  If the variable variable-name has an empty value, the text-if-true is effective; otherwise, the text-if-false, if any, is effective. The rules for expansion and testing of variable-name are identical to the `ifdef` directive.

Extra spaces are allowed and ignored at the beginning of the conditional directive line, but a tab is not allowed. (If the line begins with a tab, it will be considered part of a recipe for a rule.) Aside from this, extra spaces or tabs may be inserted with no effect anywhere except within the directive name or within an argument. A comment starting with ‘#’ may appear at the end of the line.

The other two directives that play a part in a conditional are `else` and `endif`. Each of these directives is written as one word, with no arguments. Extra spaces are allowed and ignored at the beginning of the line, and spaces or tabs at the end. A comment starting with ‘#’ may appear at the end of the line.

Conditionals affect which lines of the makefile `make` uses. If the condition is true, `make` reads the lines of the text-if-true as part of the makefile; if the condition is false, `make` ignores those lines completely. It follows that syntactic units of the makefile, such as rules, may safely be split across the beginning or the end of the conditional.

`make` evaluates conditionals when it reads a makefile. Consequently, you cannot use automatic variables in the tests of conditionals because they are not defined until recipes are run (see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)).

To prevent intolerable confusion, it is not permitted to start a conditional in one makefile and end it in another. However, you may write an `include` directive within a conditional, provided you do not attempt to terminate the conditional inside the included file.





## 7.3 Conditionals that Test Flags

You can write a conditional that tests `make` command flags such as ‘-t’ by using the variable `MAKEFLAGS` together with the `findstring` function (see [Functions for String Substitution and Analysis](https://www.gnu.org/software/make/manual/make.html#Text-Functions)). This is useful when `touch` is not enough to make a file appear up to date.

Recall that `MAKEFLAGS` will put all single-letter options (such as ‘-t’) into the first word, and that word will be empty if no single-letter options were given. To work with this, it’s helpful to add a value at the start to ensure there’s a word: for example ‘-$(MAKEFLAGS)’.

The `findstring` function determines whether one string appears as a substring of another. If you want to test for the ‘-t’ flag, use ‘t’ as the first string and the first word of `MAKEFLAGS` as the other.

For example, here is how to arrange to use ‘ranlib -t’ to finish marking an archive file up to date:

```
archive.a: …
ifneq (,$(findstring t,$(firstword -$(MAKEFLAGS))))
        +touch archive.a
        +ranlib -t archive.a
else
        ranlib archive.a
endif
```

The ‘+’ prefix marks those recipe lines as “recursive” so that they will be executed despite use of the ‘-t’ flag. See [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion).