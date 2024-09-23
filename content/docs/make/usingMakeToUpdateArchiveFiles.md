+++
title = "11 Using `make` to Update Archive Files"
date = 2023-08-21T17:06:15+08:00
weight = 100
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 11 Using `make` to Update Archive Files

https://www.gnu.org/software/make/manual/make.html#Archives



*Archive files* are files containing named sub-files called *members*; they are maintained with the program `ar` and their main use is as subroutine libraries for linking.







## 11.1 Archive Members as Targets



An individual member of an archive file can be used as a target or prerequisite in `make`. You specify the member named member in archive file archive as follows:

```
archive(member)
```

This construct is available only in targets and prerequisites, not in recipes! Most programs that you might use in recipes do not support this syntax and cannot act directly on archive members. Only `ar` and other programs specifically designed to operate on archives can do so. Therefore, valid recipes to update an archive member target probably must use `ar`. For example, this rule says to create a member hack.o in archive foolib by copying the file hack.o:

```
foolib(hack.o) : hack.o
        ar cr foolib hack.o
```

In fact, nearly all archive member targets are updated in just this way and there is an implicit rule to do it for you. **Please note:** The ‘c’ flag to `ar` is required if the archive file does not already exist.

To specify several members in the same archive, you can write all the member names together between the parentheses. For example:

```
foolib(hack.o kludge.o)
```

is equivalent to:

```
foolib(hack.o) foolib(kludge.o)
```



You can also use shell-style wildcards in an archive member reference. See [Using Wildcard Characters in File Names](https://www.gnu.org/software/make/manual/make.html#Wildcards). For example, ‘foolib(*.o)’ expands to all existing members of the foolib archive whose names end in ‘.o’; perhaps ‘foolib(hack.o) foolib(kludge.o)’.





## 11.2 Implicit Rule for Archive Member Targets

Recall that a target that looks like a(m) stands for the member named m in the archive file a.

When `make` looks for an implicit rule for such a target, as a special feature it considers implicit rules that match (m), as well as those that match the actual target a(m).

This causes one special rule whose target is (%) to match. This rule updates the target a(m) by copying the file m into the archive. For example, it will update the archive member target foo.a(bar.o) by copying the *file* bar.o into the archive foo.a as a *member* named bar.o.

When this rule is chained with others, the result is very powerful. Thus, ‘make "foo.a(bar.o)"’ (the quotes are needed to protect the ‘(’ and ‘)’ from being interpreted specially by the shell) in the presence of a file bar.c is enough to cause the following recipe to be run, even without a makefile:

```
cc -c bar.c -o bar.o
ar r foo.a bar.o
rm -f bar.o
```

Here `make` has envisioned the file bar.o as an intermediate file. See [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules).

Implicit rules such as this one are written using the automatic variable ‘$%’. See [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables).

An archive member name in an archive cannot contain a directory name, but it may be useful in a makefile to pretend that it does. If you write an archive member target foo.a(dir/file.o), `make` will perform automatic updating with this recipe:

```
ar r foo.a dir/file.o
```

which has the effect of copying the file dir/file.o into a member named file.o. In connection with such usage, the automatic variables `%D` and `%F` may be useful.

- [Updating Archive Symbol Directories](https://www.gnu.org/software/make/manual/make.html#Archive-Symbols)





### 11.2.1 Updating Archive Symbol Directories



An archive file that is used as a library usually contains a special member named __.SYMDEF that contains a directory of the external symbol names defined by all the other members. After you update any other members, you need to update __.SYMDEF so that it will summarize the other members properly. This is done by running the `ranlib` program:

```
ranlib archivefile
```

Normally you would put this command in the rule for the archive file, and make all the members of the archive file prerequisites of that rule. For example,

```
libfoo.a: libfoo.a(x.o y.o …)
        ranlib libfoo.a
```

The effect of this is to update archive members x.o, y.o, etc., and then update the symbol directory member __.SYMDEF by running `ranlib`. The rules for updating the members are not shown here; most likely you can omit them and use the implicit rule which copies files into the archive, as described in the preceding section.

This is not necessary when using the GNU `ar` program, which updates the __.SYMDEF member automatically.





## 11.3 Dangers When Using Archives



The built-in rules for updating archives are incompatible with parallel builds. These rules (required by the POSIX standard) add each object file into the archive as it’s compiled. When parallel builds are enabled this allows multiple `ar` commands to be updating the same archive simultaneously, which is not supported.

If you want to use parallel builds with archives you can override the default rules by adding these lines to your makefile:

```
(%) : % ;
%.a : ; $(AR) $(ARFLAGS) $@ $?
```

The first line changes the rule that updates an individual object in the archive to do nothing, and the second line changes the default rule for building an archive to update all the outdated objects (`$?`) in one command.

Of course you will still need to declare the prerequisites of your library using the archive syntax:

```
libfoo.a: libfoo.a(x.o y.o …)
```

If you prefer to write an explicit rule you can use:

```
libfoo.a: libfoo.a(x.o y.o …)
        $(AR) $(ARFLAGS) $@ $?
```





## 11.4 Suffix Rules for Archive Files



You can write a special kind of suffix rule for dealing with archive files. See [Old-Fashioned Suffix Rules](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules), for a full explanation of suffix rules. Archive suffix rules are obsolete in GNU `make`, because pattern rules for archives are a more general mechanism (see [Implicit Rule for Archive Member Targets](https://www.gnu.org/software/make/manual/make.html#Archive-Update)). But they are retained for compatibility with other `make`s.

To write a suffix rule for archives, you simply write a suffix rule using the target suffix ‘.a’ (the usual suffix for archive files). For example, here is the old-fashioned suffix rule to update a library archive from C source files:

```
.c.a:
        $(CC) $(CFLAGS) $(CPPFLAGS) -c $< -o $*.o
        $(AR) r $@ $*.o
        $(RM) $*.o
```

This works just as if you had written the pattern rule:

```
(%.o): %.c
        $(CC) $(CFLAGS) $(CPPFLAGS) -c $< -o $*.o
        $(AR) r $@ $*.o
        $(RM) $*.o
```

In fact, this is just what `make` does when it sees a suffix rule with ‘.a’ as the target suffix. Any double-suffix rule ‘.x.a’ is converted to a pattern rule with the target pattern ‘(%.o)’ and a prerequisite pattern of ‘%.x’.

Since you might want to use ‘.a’ as the suffix for some other kind of file, `make` also converts archive suffix rules to pattern rules in the normal way (see [Old-Fashioned Suffix Rules](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules)). Thus a double-suffix rule ‘.x.a’ produces two pattern rules: ‘(%.o): %.x’ and ‘%.a: %.x’.