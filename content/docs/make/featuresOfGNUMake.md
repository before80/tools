+++
title = "14 Features of GNU `make`"
date = 2023-08-21T17:07:44+08:00
weight = 140
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 14 Features of GNU `make`

https://www.gnu.org/software/make/manual/make.html#Features



Here is a summary of the features of GNU `make`, for comparison with and credit to other versions of `make`. We consider the features of `make` in 4.2 BSD systems as a baseline. If you are concerned with writing portable makefiles, you should not use the features of `make` listed here, nor the ones in [Incompatibilities and Missing Features](https://www.gnu.org/software/make/manual/make.html#Missing).

Many features come from the version of `make` in System V.

- The `VPATH` variable and its special meaning. See [Searching Directories for Prerequisites](https://www.gnu.org/software/make/manual/make.html#Directory-Search). This feature exists in System V `make`, but is undocumented. It is documented in 4.3 BSD `make` (which says it mimics System V’s `VPATH` feature).
- Included makefiles. See [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include). Allowing multiple files to be included with a single directive is a GNU extension.
- Variables are read from and communicated via the environment. See [Variables from the Environment](https://www.gnu.org/software/make/manual/make.html#Environment).
- Options passed through the variable `MAKEFLAGS` to recursive invocations of `make`. See [Communicating Options to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Options_002fRecursion).
- The automatic variable `$%` is set to the member name in an archive reference. See [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables).
- The automatic variables `$@`, `$*`, `$<`, `$%`, and `$?` have corresponding forms like `$(@F)` and `$(@D)`. We have generalized this to `$^` as an obvious extension. See [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables).
- Substitution variable references. See [Basics of Variable References](https://www.gnu.org/software/make/manual/make.html#Reference).
- The command line options ‘-b’ and ‘-m’, accepted and ignored. In System V `make`, these options actually do something.
- Execution of recursive commands to run `make` via the variable `MAKE` even if ‘-n’, ‘-q’ or ‘-t’ is specified. See [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion).
- Support for suffix ‘.a’ in suffix rules. See [Suffix Rules for Archive Files](https://www.gnu.org/software/make/manual/make.html#Archive-Suffix-Rules). This feature is obsolete in GNU `make`, because the general feature of rule chaining (see [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)) allows one pattern rule for installing members in an archive (see [Implicit Rule for Archive Member Targets](https://www.gnu.org/software/make/manual/make.html#Archive-Update)) to be sufficient.
- The arrangement of lines and backslash/newline combinations in recipes is retained when the recipes are printed, so they appear as they do in the makefile, except for the stripping of initial whitespace.

The following features were inspired by various other versions of `make`. In some cases it is unclear exactly which versions inspired which others.

- Pattern rules using ‘%’. This has been implemented in several versions of `make`. We’re not sure who invented it first, but it’s been spread around a bit. See [Defining and Redefining Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules).
- Rule chaining and implicit intermediate files. This was implemented by Stu Feldman in his version of `make` for AT&T Eighth Edition Research Unix, and later by Andrew Hume of AT&T Bell Labs in his `mk` program (where he terms it “transitive closure”). We do not really know if we got this from either of them or thought it up ourselves at the same time. See [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules).
- The automatic variable `$^` containing a list of all prerequisites of the current target. We did not invent this, but we have no idea who did. See [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables). The automatic variable `$+` is a simple extension of `$^`.
- The “what if” flag (‘-W’ in GNU `make`) was (as far as we know) invented by Andrew Hume in `mk`. See [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution).
- The concept of doing several things at once (parallelism) exists in many incarnations of `make` and similar programs, though not in the System V or BSD implementations. See [Recipe Execution](https://www.gnu.org/software/make/manual/make.html#Execution).
- A number of different build tools that support parallelism also support collecting output and displaying as a single block. See [Output During Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Output).
- Modified variable references using pattern substitution come from SunOS 4. See [Basics of Variable References](https://www.gnu.org/software/make/manual/make.html#Reference). This functionality was provided in GNU `make` by the `patsubst` function before the alternate syntax was implemented for compatibility with SunOS 4. It is not altogether clear who inspired whom, since GNU `make` had `patsubst` before SunOS 4 was released.
- The special significance of ‘+’ characters preceding recipe lines (see [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution)) is mandated by IEEE Standard 1003.2-1992 (POSIX.2).
- The ‘+=’ syntax to append to the value of a variable comes from SunOS 4 `make`. See [Appending More Text to Variables](https://www.gnu.org/software/make/manual/make.html#Appending).
- The syntax ‘archive(mem1 mem2…)’ to list multiple members in a single archive file comes from SunOS 4 `make`. See [Archive Members as Targets](https://www.gnu.org/software/make/manual/make.html#Archive-Members).
- The `-include` directive to include makefiles with no error for a nonexistent file comes from SunOS 4 `make`. (But note that SunOS 4 `make` does not allow multiple makefiles to be specified in one `-include` directive.) The same feature appears with the name `sinclude` in SGI `make` and perhaps others.
- The `!=` shell assignment operator exists in many BSD of `make` and is purposefully implemented here to behave identically to those implementations.
- Various build management tools are implemented using scripting languages such as Perl or Python and thus provide a natural embedded scripting language, similar to GNU `make`’s integration of GNU Guile.

The remaining features are inventions new in GNU `make`:

- Use the ‘-v’ or ‘--version’ option to print version and copyright information.

- Use the ‘-h’ or ‘--help’ option to summarize the options to `make`.

- Simply-expanded variables. See [The Two Flavors of Variables](https://www.gnu.org/software/make/manual/make.html#Flavors).

- Pass command line variable assignments automatically through the variable `MAKE` to recursive `make` invocations. See [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion).

- Use the ‘-C’ or ‘--directory’ command option to change directory. See [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary).

- Make verbatim variable definitions with `define`. See [Defining Multi-Line Variables](https://www.gnu.org/software/make/manual/make.html#Multi_002dLine).

- Declare phony targets with the special target `.PHONY`.

  Andrew Hume of AT&T Bell Labs implemented a similar feature with a different syntax in his `mk` program. This seems to be a case of parallel discovery. See [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets).

- Manipulate text by calling functions. See [Functions for Transforming Text](https://www.gnu.org/software/make/manual/make.html#Functions).

- Use the ‘-o’ or ‘--old-file’ option to pretend a file’s modification-time is old. See [Avoiding Recompilation of Some Files](https://www.gnu.org/software/make/manual/make.html#Avoiding-Compilation).

- Conditional execution.

  This feature has been implemented numerous times in various versions of `make`; it seems a natural extension derived from the features of the C preprocessor and similar macro languages and is not a revolutionary concept. See [Conditional Parts of Makefiles](https://www.gnu.org/software/make/manual/make.html#Conditionals).

- Specify a search path for included makefiles. See [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include).

- Specify extra makefiles to read with an environment variable. See [The Variable `MAKEFILES`](https://www.gnu.org/software/make/manual/make.html#MAKEFILES-Variable).

- Strip leading sequences of ‘./’ from file names, so that ./file and file are considered to be the same file.

- Use a special search method for library prerequisites written in the form ‘-lname’. See [Directory Search for Link Libraries](https://www.gnu.org/software/make/manual/make.html#Libraries_002fSearch).

- Allow suffixes for suffix rules (see [Old-Fashioned Suffix Rules](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules)) to contain any characters. In other versions of `make`, they must begin with ‘.’ and not contain any ‘/’ characters.

- Keep track of the current level of `make` recursion using the variable `MAKELEVEL`. See [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion).

- Provide any goals given on the command line in the variable `MAKECMDGOALS`. See [Arguments to Specify the Goals](https://www.gnu.org/software/make/manual/make.html#Goals).

- Specify static pattern rules. See [Static Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Static-Pattern).

- Provide selective `vpath` search. See [Searching Directories for Prerequisites](https://www.gnu.org/software/make/manual/make.html#Directory-Search).

- Provide computed variable references. See [Basics of Variable References](https://www.gnu.org/software/make/manual/make.html#Reference).

- Update makefiles. See [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles). System V `make` has a very, very limited form of this functionality in that it will check out SCCS files for makefiles.

- Various new built-in implicit rules. See [Catalogue of Built-In Rules](https://www.gnu.org/software/make/manual/make.html#Catalogue-of-Rules).

- Load dynamic objects which can modify the behavior of `make`. See [Loading Dynamic Objects](https://www.gnu.org/software/make/manual/make.html#Loading-Objects).