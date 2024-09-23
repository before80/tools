+++
title = "9 How to Run `make`"
date = 2023-08-21T17:05:23+08:00
weight = 90
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 9 How to Run `make`

https://www.gnu.org/software/make/manual/make.html#Running

A makefile that says how to recompile a program can be used in more than one way. The simplest use is to recompile every file that is out of date. Usually, makefiles are written so that if you run `make` with no arguments, it does just that.

But you might want to update only some of the files; you might want to use a different compiler or different compiler options; you might want just to find out which files are out of date without changing them.

By giving arguments when you run `make`, you can do any of these things and many others.



The exit status of `make` is always one of three values:

- `0`

  The exit status is zero if `make` is successful.

- `2`

  The exit status is two if `make` encounters any errors. It will print messages describing the particular errors.

- `1`

  The exit status is one if you use the ‘-q’ flag and `make` determines that some target is not already up to date. See [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution).







## 9.1 Arguments to Specify the Makefile



The way to specify the name of the makefile is with the ‘-f’ or ‘--file’ option (‘--makefile’ also works). For example, ‘-f altmake’ says to use the file altmake as the makefile.

If you use the ‘-f’ flag several times and follow each ‘-f’ with an argument, all the specified files are used jointly as makefiles.

If you do not use the ‘-f’ or ‘--file’ flag, the default is to try GNUmakefile, makefile, and Makefile, in that order, and use the first of these three which exists or can be made (see [Writing Makefiles](https://www.gnu.org/software/make/manual/make.html#Makefiles)).





## 9.2 Arguments to Specify the Goals



The *goals* are the targets that `make` should strive ultimately to update. Other targets are updated as well if they appear as prerequisites of goals, or prerequisites of prerequisites of goals, etc.

By default, the goal is the first target in the makefile (not counting targets that start with a period). Therefore, makefiles are usually written so that the first target is for compiling the entire program or programs they describe. If the first rule in the makefile has several targets, only the first target in the rule becomes the default goal, not the whole list. You can manage the selection of the default goal from within your makefile using the `.DEFAULT_GOAL` variable (see [Other Special Variables](https://www.gnu.org/software/make/manual/make.html#Special-Variables)).

You can also specify a different goal or goals with command line arguments to `make`. Use the name of the goal as an argument. If you specify several goals, `make` processes each of them in turn, in the order you name them.

Any target in the makefile may be specified as a goal (unless it starts with ‘-’ or contains an ‘=’, in which case it will be parsed as a switch or variable definition, respectively). Even targets not in the makefile may be specified, if `make` can find implicit rules that say how to make them.



`Make` will set the special variable `MAKECMDGOALS` to the list of goals you specified on the command line. If no goals were given on the command line, this variable is empty. Note that this variable should be used only in special circumstances.

An example of appropriate use is to avoid including .d files during `clean` rules (see [Generating Prerequisites Automatically](https://www.gnu.org/software/make/manual/make.html#Automatic-Prerequisites)), so `make` won’t create them only to immediately remove them again:

```
sources = foo.c bar.c

ifeq (,$(filter clean,$(MAKECMDGOALS))
include $(sources:.c=.d)
endif
```

One use of specifying a goal is if you want to compile only a part of the program, or only one of several programs. Specify as a goal each file that you wish to remake. For example, consider a directory containing several programs, with a makefile that starts like this:

```
.PHONY: all
all: size nm ld ar as
```

If you are working on the program `size`, you might want to say ‘make size’ so that only the files of that program are recompiled.

Another use of specifying a goal is to make files that are not normally made. For example, there may be a file of debugging output, or a version of the program that is compiled specially for testing, which has a rule in the makefile but is not a prerequisite of the default goal.

Another use of specifying a goal is to run the recipe associated with a phony target (see [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)) or empty target (see [Empty Target Files to Record Events](https://www.gnu.org/software/make/manual/make.html#Empty-Targets)). Many makefiles contain a phony target named clean which deletes everything except source files. Naturally, this is done only if you request it explicitly with ‘make clean’. Following is a list of typical phony and empty target names. See [Standard Targets for Users](https://www.gnu.org/software/make/manual/make.html#Standard-Targets), for a detailed list of all the standard target names which GNU software packages use.

- all

  Make all the top-level targets the makefile knows about.

- clean

  Delete all files that are normally created by running `make`.

- mostlyclean

  Like ‘clean’, but may refrain from deleting a few files that people normally don’t want to recompile. For example, the ‘mostlyclean’ target for GCC does not delete libgcc.a, because recompiling it is rarely necessary and takes a lot of time.

- distclean

  

- realclean

  

- clobber

  Any of these targets might be defined to delete *more* files than ‘clean’ does. For example, this would delete configuration files or links that you would normally create as preparation for compilation, even if the makefile itself cannot create these files.

- install

  Copy the executable file into a directory that users typically search for commands; copy any auxiliary files that the executable uses into the directories where it will look for them.

- print

  Print listings of the source files that have changed.

- tar

  Create a tar file of the source files.

- shar

  Create a shell archive (shar file) of the source files.

- dist

  Create a distribution file of the source files. This might be a tar file, or a shar file, or a compressed version of one of the above, or even more than one of the above.

- TAGS

  Update a tags table for this program.

- check

  

- test

  Perform self tests on the program this makefile builds.





## 9.3 Instead of Executing Recipes



The makefile tells `make` how to tell whether a target is up to date, and how to update each target. But updating the targets is not always what you want. Certain options specify other activities for `make`.

- ‘-n’

- ‘--just-print’

- ‘--dry-run’

- ‘--recon’

  “No-op”. Causes `make` to print the recipes that are needed to make the targets up to date, but not actually execute them. Note that some recipes are still executed, even with this flag (see [How the `MAKE` Variable Works](https://www.gnu.org/software/make/manual/make.html#MAKE-Variable)). Also any recipes needed to update included makefiles are still executed (see [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)).

- ‘-t’

- ‘--touch’

  “Touch”. Marks targets as up to date without actually changing them. In other words, `make` pretends to update the targets but does not really change their contents; instead only their modified times are updated.

- ‘-q’

- ‘--question’

  “Question”. Silently check whether the targets are up to date, but do not execute recipes; the exit code shows whether any updates are needed.

- ‘-W file’

- ‘--what-if=file’

- ‘--assume-new=file’

- ‘--new-file=file’

  “What if”. Each ‘-W’ flag is followed by a file name. The given files’ modification times are recorded by `make` as being the present time, although the actual modification times remain the same. You can use the ‘-W’ flag in conjunction with the ‘-n’ flag to see what would happen if you were to modify specific files.

With the ‘-n’ flag, `make` prints the recipe that it would normally execute but usually does not execute it.

With the ‘-t’ flag, `make` ignores the recipes in the rules and uses (in effect) the command `touch` for each target that needs to be remade. The `touch` command is also printed, unless ‘-s’ or `.SILENT` is used. For speed, `make` does not actually invoke the program `touch`. It does the work directly.

With the ‘-q’ flag, `make` prints nothing and executes no recipes, but the exit status code it returns is zero if and only if the targets to be considered are already up to date. If the exit status is one, then some updating needs to be done. If `make` encounters an error, the exit status is two, so you can distinguish an error from a target that is not up to date.

It is an error to use more than one of these three flags in the same invocation of `make`.



The ‘-n’, ‘-t’, and ‘-q’ options do not affect recipe lines that begin with ‘+’ characters or contain the strings ‘$(MAKE)’ or ‘${MAKE}’. Note that only the line containing the ‘+’ character or the strings ‘$(MAKE)’ or ‘${MAKE}’ is run regardless of these options. Other lines in the same rule are not run unless they too begin with ‘+’ or contain ‘$(MAKE)’ or ‘${MAKE}’ (See [How the `MAKE` Variable Works](https://www.gnu.org/software/make/manual/make.html#MAKE-Variable).)



The ‘-t’ flag prevents phony targets (see [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)) from being updated, unless there are recipe lines beginning with ‘+’ or containing ‘$(MAKE)’ or ‘${MAKE}’.

The ‘-W’ flag provides two features:

- If you also use the ‘-n’ or ‘-q’ flag, you can see what `make` would do if you were to modify some files.
- Without the ‘-n’ or ‘-q’ flag, when `make` is actually executing recipes, the ‘-W’ flag can direct `make` to act as if some files had been modified, without actually running the recipes for those files.

Note that the options ‘-p’ and ‘-v’ allow you to obtain other information about `make` or about the makefiles in use (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)).





## 9.4 Avoiding Recompilation of Some Files



Sometimes you may have changed a source file but you do not want to recompile all the files that depend on it. For example, suppose you add a macro or a declaration to a header file that many other files depend on. Being conservative, `make` assumes that any change in the header file requires recompilation of all dependent files, but you know that they do not need to be recompiled and you would rather not waste the time waiting for them to compile.

If you anticipate the problem before changing the header file, you can use the ‘-t’ flag. This flag tells `make` not to run the recipes in the rules, but rather to mark the target up to date by changing its last-modification date. You would follow this procedure:

1. Use the command ‘make’ to recompile the source files that really need recompilation, ensuring that the object files are up-to-date before you begin.
2. Make the changes in the header files.
3. Use the command ‘make -t’ to mark all the object files as up to date. The next time you run `make`, the changes in the header files will not cause any recompilation.

If you have already changed the header file at a time when some files do need recompilation, it is too late to do this. Instead, you can use the ‘-o file’ flag, which marks a specified file as “old” (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)). This means that the file itself will not be remade, and nothing else will be remade on its account. Follow this procedure:

1. Recompile the source files that need compilation for reasons independent of the particular header file, with ‘make -o headerfile’. If several header files are involved, use a separate ‘-o’ option for each header file.
2. Touch all the object files with ‘make -t’.





## 9.5 Overriding Variables



An argument that contains ‘=’ specifies the value of a variable: ‘v=x’ sets the value of the variable v to x. If you specify a value in this way, all ordinary assignments of the same variable in the makefile are ignored; we say they have been *overridden* by the command line argument.

The most common way to use this facility is to pass extra flags to compilers. For example, in a properly written makefile, the variable `CFLAGS` is included in each recipe that runs the C compiler, so a file foo.c would be compiled something like this:

```
cc -c $(CFLAGS) foo.c
```

Thus, whatever value you set for `CFLAGS` affects each compilation that occurs. The makefile probably specifies the usual value for `CFLAGS`, like this:

```
CFLAGS=-g
```

Each time you run `make`, you can override this value if you wish. For example, if you say ‘make CFLAGS='-g -O'’, each C compilation will be done with ‘cc -c -g -O’. (This also illustrates how you can use quoting in the shell to enclose spaces and other special characters in the value of a variable when you override it.)

The variable `CFLAGS` is only one of many standard variables that exist just so that you can change them this way. See [Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables), for a complete list.

You can also program the makefile to look at additional variables of your own, giving the user the ability to control other aspects of how the makefile works by changing the variables.

When you override a variable with a command line argument, you can define either a recursively-expanded variable or a simply-expanded variable. The examples shown above make a recursively-expanded variable; to make a simply-expanded variable, write ‘:=’ or ‘::=’ instead of ‘=’. But, unless you want to include a variable reference or function call in the *value* that you specify, it makes no difference which kind of variable you create.

There is one way that the makefile can change a variable that you have overridden. This is to use the `override` directive, which is a line that looks like this: ‘override variable = value’ (see [The `override` Directive](https://www.gnu.org/software/make/manual/make.html#Override-Directive)).





## 9.6 Testing the Compilation of a Program



Normally, when an error happens in executing a shell command, `make` gives up immediately, returning a nonzero status. No further recipes are executed for any target. The error implies that the goal cannot be correctly remade, and `make` reports this as soon as it knows.

When you are compiling a program that you have just changed, this is not what you want. Instead, you would rather that `make` try compiling every file that can be tried, to show you as many compilation errors as possible.



On these occasions, you should use the ‘-k’ or ‘--keep-going’ flag. This tells `make` to continue to consider the other prerequisites of the pending targets, remaking them if necessary, before it gives up and returns nonzero status. For example, after an error in compiling one object file, ‘make -k’ will continue compiling other object files even though it already knows that linking them will be impossible. In addition to continuing after failed shell commands, ‘make -k’ will continue as much as possible after discovering that it does not know how to make a target or prerequisite file. This will always cause an error message, but without ‘-k’, it is a fatal error (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)).

The usual behavior of `make` assumes that your purpose is to get the goals up to date; once `make` learns that this is impossible, it might as well report the failure immediately. The ‘-k’ flag says that the real purpose is to test as much as possible of the changes made in the program, perhaps to find several independent problems so that you can correct them all before the next attempt to compile. This is why Emacs’ M-x compile command passes the ‘-k’ flag by default.





## 9.7 Temporary Files



In some situations, `make` will need to create its own temporary files. These files must not be disturbed while `make` is running, including all recursively-invoked instances of `make`.



If the environment variable `MAKE_TMPDIR` is set then all temporary files created by `make` will be placed there.



If `MAKE_TMPDIR` is not set, then the standard location for temporary files for the current operating system will be used. For POSIX systems this will be the location set in the `TMPDIR` environment variable, or else the system’s default location (e.g., /tmp) is used. On Windows, first `TMP` then `TEMP` will be checked, then `TMPDIR`, and finally the system default temporary file location will be used.

Note that this directory must already exist or `make` will fail: `make` will not attempt to create it.

These variables *cannot* be set from within a makefile: GNU `make` must have access to this location before it begins reading the makefiles.





## 9.8 Summary of Options



Here is a table of all the options `make` understands:

- ‘-b’

  

- ‘-m’

  These options are ignored for compatibility with other versions of `make`.

- ‘-B’

  

- ‘--always-make’

  Consider all targets out-of-date. GNU `make` proceeds to consider targets and their prerequisites using the normal algorithms; however, all targets so considered are always remade regardless of the status of their prerequisites. To avoid infinite recursion, if `MAKE_RESTARTS` (see [Other Special Variables](https://www.gnu.org/software/make/manual/make.html#Special-Variables)) is set to a number greater than 0 this option is disabled when considering whether to remake makefiles (see [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)).

- ‘-C dir’

  

- ‘--directory=dir’

  Change to directory dir before reading the makefiles. If multiple ‘-C’ options are specified, each is interpreted relative to the previous one: ‘-C / -C etc’ is equivalent to ‘-C /etc’. This is typically used with recursive invocations of `make` (see [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)).

- ‘-d’

  Print debugging information in addition to normal processing. The debugging information says which files are being considered for remaking, which file-times are being compared and with what results, which files actually need to be remade, which implicit rules are considered and which are applied—everything interesting about how `make` decides what to do. The `-d` option is equivalent to ‘--debug=a’ (see below).

- ‘--debug[=options]’

  Print debugging information in addition to normal processing. Various levels and types of output can be chosen. With no arguments, print the “basic” level of debugging. Possible arguments are below; only the first character is considered, and values must be comma- or space-separated.`a (*all*)`All types of debugging output are enabled. This is equivalent to using ‘-d’.`b (*basic*)`Basic debugging prints each target that was found to be out-of-date, and whether the build was successful or not.`v (*verbose*)`A level above ‘basic’; includes messages about which makefiles were parsed, prerequisites that did not need to be rebuilt, etc. This option also enables ‘basic’ messages.`i (*implicit*)`Prints messages describing the implicit rule searches for each target. This option also enables ‘basic’ messages.`j (*jobs*)`Prints messages giving details on the invocation of specific sub-commands.`m (*makefile*)`By default, the above messages are not enabled while trying to remake the makefiles. This option enables messages while rebuilding makefiles, too. Note that the ‘all’ option does enable this option. This option also enables ‘basic’ messages.`p (*print*)`Prints the recipe to be executed, even when the recipe is normally silent (due to `.SILENT` or ‘@’). Also prints the makefile name and line number where the recipe was defined.`w (*why*)`Explains why each target must be remade by showing which prerequisites are more up to date than the target.`n (*none*)`Disable all debugging currently enabled. If additional debugging flags are encountered after this they will still take effect.

- ‘-e’

  

- ‘--environment-overrides’

  Give variables taken from the environment precedence over variables from makefiles. See [Variables from the Environment](https://www.gnu.org/software/make/manual/make.html#Environment).

- ‘-E string’

- ‘--eval=string’

  Evaluate string as makefile syntax. This is a command-line version of the `eval` function (see [The `eval` Function](https://www.gnu.org/software/make/manual/make.html#Eval-Function)). The evaluation is performed after the default rules and variables have been defined, but before any makefiles are read.

- ‘-f file’

  

- ‘--file=file’

  

- ‘--makefile=file’

  Read the file named file as a makefile. See [Writing Makefiles](https://www.gnu.org/software/make/manual/make.html#Makefiles).

- ‘-h’

  

- ‘--help’

  Remind you of the options that `make` understands and then exit.

- ‘-i’

  

- ‘--ignore-errors’

  Ignore all errors in recipes executed to remake files. See [Errors in Recipes](https://www.gnu.org/software/make/manual/make.html#Errors).

- ‘-I dir’

  

- ‘--include-dir=dir’

  Specifies a directory dir to search for included makefiles. See [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include). If several ‘-I’ options are used to specify several directories, the directories are searched in the order specified. If the directory dir is a single dash (`-`) then any already-specified directories up to that point (including the default directory paths) will be discarded. You can examine the current list of directories to be searched via the `.INCLUDE_DIRS` variable.

- ‘-j [jobs]’

  

- ‘--jobs[=jobs]’

  Specifies the number of recipes (jobs) to run simultaneously. With no argument, `make` runs as many recipes simultaneously as possible. If there is more than one ‘-j’ option, the last one is effective. See [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel), for more information on how recipes are run. Note that this option is ignored on MS-DOS.

- ‘--jobserver-style=[style]’

  Chooses the style of jobserver to use. This option only has effect if parallel builds are enabled (see [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel)). On POSIX systems style can be one of `fifo` (the default) or `pipe`. On Windows the only acceptable style is `sem` (the default). This option is useful if you need to use an older versions of GNU `make`, or a different tool that requires a specific jobserver style.

- ‘-k’

  

- ‘--keep-going’

  Continue as much as possible after an error. While the target that failed, and those that depend on it, cannot be remade, the other prerequisites of these targets can be processed all the same. See [Testing the Compilation of a Program](https://www.gnu.org/software/make/manual/make.html#Testing).

- ‘-l [load]’

  

- ‘--load-average[=load]’

  

- ‘--max-load[=load]’

  Specifies that no new recipes should be started if there are other recipes running and the load average is at least load (a floating-point number). With no argument, removes a previous load limit. See [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel).

- ‘-L’

  

- ‘--check-symlink-times’

  On systems that support symbolic links, this option causes `make` to consider the timestamps on any symbolic links in addition to the timestamp on the file referenced by those links. When this option is provided, the most recent timestamp among the file and the symbolic links is taken as the modification time for this target file.

- ‘-n’

  

- ‘--just-print’

  

- ‘--dry-run’

  

- ‘--recon’

  Print the recipe that would be executed, but do not execute it (except in certain circumstances). See [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution).

- ‘-o file’

  

- ‘--old-file=file’

  

- ‘--assume-old=file’

  Do not remake the file file even if it is older than its prerequisites, and do not remake anything on account of changes in file. Essentially the file is treated as very old and its rules are ignored. See [Avoiding Recompilation of Some Files](https://www.gnu.org/software/make/manual/make.html#Avoiding-Compilation).

- ‘-O[type]’

  

- ‘--output-sync[=type]’

  Ensure that the complete output from each recipe is printed in one uninterrupted sequence. This option is only useful when using the `--jobs` option to run multiple recipes simultaneously (see [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel)) Without this option output will be displayed as it is generated by the recipes.With no type or the type ‘target’, output from the entire recipe of each target is grouped together. With the type ‘line’, output from each line in the recipe is grouped together. With the type ‘recurse’, the output from an entire recursive make is grouped together. With the type ‘none’, no output synchronization is performed. See [Output During Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Output).

- ‘-p’

  

- ‘--print-data-base’

  Print the data base (rules and variable values) that results from reading the makefiles; then execute as usual or as otherwise specified. This also prints the version information given by the ‘-v’ switch (see below). To print the data base without trying to remake any files, use ‘make -qp’. To print the data base of predefined rules and variables, use ‘make -p -f /dev/null’. The data base output contains file name and line number information for recipe and variable definitions, so it can be a useful debugging tool in complex environments.

- ‘-q’

  

- ‘--question’

  “Question mode”. Do not run any recipes, or print anything; just return an exit status that is zero if the specified targets are already up to date, one if any remaking is required, or two if an error is encountered. See [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution).

- ‘-r’

  

- ‘--no-builtin-rules’

  Eliminate use of the built-in implicit rules (see [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)). You can still define your own by writing pattern rules (see [Defining and Redefining Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)). The ‘-r’ option also clears out the default list of suffixes for suffix rules (see [Old-Fashioned Suffix Rules](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules)). But you can still define your own suffixes with a rule for `.SUFFIXES`, and then define your own suffix rules. Note that only *rules* are affected by the `-r` option; default variables remain in effect (see [Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)); see the ‘-R’ option below.

- ‘-R’

  

- ‘--no-builtin-variables’

  Eliminate use of the built-in rule-specific variables (see [Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)). You can still define your own, of course. The ‘-R’ option also automatically enables the ‘-r’ option (see above), since it doesn’t make sense to have implicit rules without any definitions for the variables that they use.

- ‘-s’

  

- ‘--silent’

  

- ‘--quiet’

  Silent operation; do not print the recipes as they are executed. See [Recipe Echoing](https://www.gnu.org/software/make/manual/make.html#Echoing).

- ‘-S’

  

- ‘--no-keep-going’

  

- ‘--stop’

  Cancel the effect of the ‘-k’ option. This is never necessary except in a recursive `make` where ‘-k’ might be inherited from the top-level `make` via `MAKEFLAGS` (see [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)) or if you set ‘-k’ in `MAKEFLAGS` in your environment.

- ‘--shuffle[=mode]’

  This option enables a form of fuzz-testing of prerequisite relationships. When parallelism is enabled (‘-j’) the order in which targets are built becomes less deterministic. If prerequisites are not fully declared in the makefile this can lead to intermittent and hard-to-track-down build failures.The ‘--shuffle’ option forces `make` to purposefully reorder goals and prerequisites so target/prerequisite relationships still hold, but ordering of prerequisites of a given target are reordered as described below.The order in which prerequisites are listed in automatic variables is not changed by this option.The `.NOTPARALLEL` pseudo-target disables shuffling for that makefile. Also any prerequisite list which contains `.WAIT` will not be shuffled. See [Disabling Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Disable).The ‘--shuffle=’ option accepts these values:`random`Choose a random seed for the shuffle. This is the default if no mode is specified. The chosen seed is also provided to sub-`make` commands. The seed is included in error messages so that it can be re-used in future runs to reproduce the problem or verify that it has been resolved.`reverse`Reverse the order of goals and prerequisites, rather than a random shuffle.`seed`Use ‘random’ shuffle initialized with the specified seed value. The seed is an integer.`none`Disable shuffling. This negates any previous ‘--shuffle’ options.

- ‘-t’

  

- ‘--touch’

  Touch files (mark them up to date without really changing them) instead of running their recipes. This is used to pretend that the recipes were done, in order to fool future invocations of `make`. See [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution).

- ‘--trace’

  Show tracing information for `make` execution. Using `--trace` is shorthand for `--debug=print,why`.

- ‘-v’

  

- ‘--version’

  Print the version of the `make` program plus a copyright, a list of authors, and a notice that there is no warranty; then exit.

- ‘-w’

  

- ‘--print-directory’

  Print a message containing the working directory both before and after executing the makefile. This may be useful for tracking down errors from complicated nests of recursive `make` commands. See [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion). (In practice, you rarely need to specify this option since ‘make’ does it for you; see [The ‘--print-directory’ Option](https://www.gnu.org/software/make/manual/make.html#g_t_002dw-Option).)

- ‘--no-print-directory’

  Disable printing of the working directory under `-w`. This option is useful when `-w` is turned on automatically, but you do not want to see the extra messages. See [The ‘--print-directory’ Option](https://www.gnu.org/software/make/manual/make.html#g_t_002dw-Option).

- ‘-W file’

  

- ‘--what-if=file’

  

- ‘--new-file=file’

  

- ‘--assume-new=file’

  Pretend that the target file has just been modified. When used with the ‘-n’ flag, this shows you what would happen if you were to modify that file. Without ‘-n’, it is almost the same as running a `touch` command on the given file before running `make`, except that the modification time is changed only in the imagination of `make`. See [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution).

- ‘--warn-undefined-variables’

  Issue a warning message whenever `make` sees a reference to an undefined variable. This can be helpful when you are trying to debug makefiles which use variables in complex ways.