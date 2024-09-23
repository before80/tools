+++
title = "15 Incompatibilities and Missing Features"
date = 2023-08-21T17:08:09+08:00
weight = 150
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 15 Incompatibilities and Missing Features

https://www.gnu.org/software/make/manual/make.html#Missing

The `make` programs in various other systems support a few features that are not implemented in GNU `make`. The POSIX.2 standard (IEEE Standard 1003.2-1992) which specifies `make` does not require any of these features.

- A target of the form ‘file((entry))’ stands for a member of archive file file. The member is chosen, not by name, but by being an object file which defines the linker symbol entry.

  This feature was not put into GNU `make` because of the non-modularity of putting knowledge into `make` of the internal format of archive file symbol tables. See [Updating Archive Symbol Directories](https://www.gnu.org/software/make/manual/make.html#Archive-Symbols).

- Suffixes (used in suffix rules) that end with the character ‘~’ have a special meaning to System V `make`; they refer to the SCCS file that corresponds to the file one would get without the ‘~’. For example, the suffix rule ‘.c~.o’ would make the file n.o from the SCCS file s.n.c. For complete coverage, a whole series of such suffix rules is required. See [Old-Fashioned Suffix Rules](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules).

  In GNU `make`, this entire series of cases is handled by two pattern rules for extraction from SCCS, in combination with the general feature of rule chaining. See [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules).

- In System V and 4.3 BSD `make`, files found by `VPATH` search (see [Searching Directories for Prerequisites](https://www.gnu.org/software/make/manual/make.html#Directory-Search)) have their names changed inside recipes. We feel it is much cleaner to always use automatic variables and thus make this feature unnecessary.

- In some Unix `make`s, the automatic variable `$*` appearing in the prerequisites of a rule has the amazingly strange “feature” of expanding to the full name of the *target of that rule*. We cannot imagine what went on in the minds of Unix `make` developers to do this; it is utterly inconsistent with the normal definition of `$*`.

- In some Unix `make`s, implicit rule search (see [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)) is apparently done for *all* targets, not just those without recipes. This means you can do:

  ```
  foo.o:
          cc -c foo.c
  ```

  and Unix `make` will intuit that foo.o depends on foo.c.

  We feel that such usage is broken. The prerequisite properties of `make` are well-defined (for GNU `make`, at least), and doing such a thing simply does not fit the model.

- GNU `make` does not include any built-in implicit rules for compiling or preprocessing EFL programs. If we hear of anyone who is using EFL, we will gladly add them.

- It appears that in SVR4 `make`, a suffix rule can be specified with no recipe, and it is treated as if it had an empty recipe (see [Using Empty Recipes](https://www.gnu.org/software/make/manual/make.html#Empty-Recipes)). For example:

  ```
  .c.a:
  ```

  will override the built-in .c.a suffix rule.

  We feel that it is cleaner for a rule without a recipe to always simply add to the prerequisite list for the target. The above example can be easily rewritten to get the desired behavior in GNU `make`:

  ```
  .c.a: ;
  ```

- Some versions of `make` invoke the shell with the ‘-e’ flag, except under ‘-k’ (see [Testing the Compilation of a Program](https://www.gnu.org/software/make/manual/make.html#Testing)). The ‘-e’ flag tells the shell to exit as soon as any program it runs returns a nonzero status. We feel it is cleaner to write each line of the recipe to stand on its own and not require this special treatment.