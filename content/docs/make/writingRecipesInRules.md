+++
title = "5 Writing Recipes in Rules"
date = 2023-08-21T17:03:42+08:00
weight = 50
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# 5 Writing Recipes in Rules

https://www.gnu.org/software/make/manual/make.html#Recipes



The recipe of a rule consists of one or more shell command lines to be executed, one at a time, in the order they appear. Typically, the result of executing these commands is that the target of the rule is brought up to date.

Users use many different shell programs, but recipes in makefiles are always interpreted by /bin/sh unless the makefile specifies otherwise. See [Recipe Execution](https://www.gnu.org/software/make/manual/make.html#Execution).







## 5.1 Recipe Syntax



Makefiles have the unusual property that there are really two distinct syntaxes in one file. Most of the makefile uses `make` syntax (see [Writing Makefiles](https://www.gnu.org/software/make/manual/make.html#Makefiles)). However, recipes are meant to be interpreted by the shell and so they are written using shell syntax. The `make` program does not try to understand shell syntax: it performs only a very few specific translations on the content of the recipe before handing it to the shell.

Each line in the recipe must start with a tab (or the first character in the value of the `.RECIPEPREFIX` variable; see [Other Special Variables](https://www.gnu.org/software/make/manual/make.html#Special-Variables)), except that the first recipe line may be attached to the target-and-prerequisites line with a semicolon in between. *Any* line in the makefile that begins with a tab and appears in a “rule context” (that is, after a rule has been started until another rule or variable definition) will be considered part of a recipe for that rule. Blank lines and lines of just comments may appear among the recipe lines; they are ignored.

Some consequences of these rules include:

- A blank line that begins with a tab is not blank: it’s an empty recipe (see [Using Empty Recipes](https://www.gnu.org/software/make/manual/make.html#Empty-Recipes)).
- A comment in a recipe is not a `make` comment; it will be passed to the shell as-is. Whether the shell treats it as a comment or not depends on your shell.
- A variable definition in a “rule context” which is indented by a tab as the first character on the line, will be considered part of a recipe, not a `make` variable definition, and passed to the shell.
- A conditional expression (`ifdef`, `ifeq`, etc. see [Syntax of Conditionals](https://www.gnu.org/software/make/manual/make.html#Conditional-Syntax)) in a “rule context” which is indented by a tab as the first character on the line, will be considered part of a recipe and be passed to the shell.

- [Splitting Recipe Lines](https://www.gnu.org/software/make/manual/make.html#Splitting-Recipe-Lines)
- [Using Variables in Recipes](https://www.gnu.org/software/make/manual/make.html#Variables-in-Recipes)





### 5.1.1 Splitting Recipe Lines



One of the few ways in which `make` does interpret recipes is checking for a backslash just before the newline. As in normal makefile syntax, a single logical recipe line can be split into multiple physical lines in the makefile by placing a backslash before each newline. A sequence of lines like this is considered a single recipe line, and one instance of the shell will be invoked to run it.

However, in contrast to how they are treated in other places in a makefile (see [Splitting Long Lines](https://www.gnu.org/software/make/manual/make.html#Splitting-Lines)), backslash/newline pairs are *not* removed from the recipe. Both the backslash and the newline characters are preserved and passed to the shell. How the backslash/newline is interpreted depends on your shell. If the first character of the next line after the backslash/newline is the recipe prefix character (a tab by default; see [Other Special Variables](https://www.gnu.org/software/make/manual/make.html#Special-Variables)), then that character (and only that character) is removed. Whitespace is never added to the recipe.

For example, the recipe for the all target in this makefile:

```
all :
        @echo no\
space
        @echo no\
        space
        @echo one \
        space
        @echo one\
         space
```

consists of four separate shell commands where the output is:

```
nospace
nospace
one space
one space
```

As a more complex example, this makefile:

```
all : ; @echo 'hello \
        world' ; echo "hello \
    world"
```

will invoke one shell with a command of:

```
echo 'hello \
world' ; echo "hello \
    world"
```

which, according to shell quoting rules, will yield the following output:

```
hello \
world
hello     world
```

Notice how the backslash/newline pair was removed inside the string quoted with double quotes (`"…"`), but not from the string quoted with single quotes (`'…'`). This is the way the default shell (/bin/sh) handles backslash/newline pairs. If you specify a different shell in your makefiles it may treat them differently.

Sometimes you want to split a long line inside of single quotes, but you don’t want the backslash/newline to appear in the quoted content. This is often the case when passing scripts to languages such as Perl, where extraneous backslashes inside the script can change its meaning or even be a syntax error. One simple way of handling this is to place the quoted string, or even the entire command, into a `make` variable then use the variable in the recipe. In this situation the newline quoting rules for makefiles will be used, and the backslash/newline will be removed. If we rewrite our example above using this method:

```
HELLO = 'hello \
world'

all : ; @echo $(HELLO)
```

we will get output like this:

```
hello world
```

If you like, you can also use target-specific variables (see [Target-specific Variable Values](https://www.gnu.org/software/make/manual/make.html#Target_002dspecific)) to obtain a tighter correspondence between the variable and the recipe that uses it.





### 5.1.2 Using Variables in Recipes



The other way in which `make` processes recipes is by expanding any variable references in them (see [Basics of Variable References](https://www.gnu.org/software/make/manual/make.html#Reference)). This occurs after make has finished reading all the makefiles and the target is determined to be out of date; so, the recipes for targets which are not rebuilt are never expanded.

Variable and function references in recipes have identical syntax and semantics to references elsewhere in the makefile. They also have the same quoting rules: if you want a dollar sign to appear in your recipe, you must double it (‘$$’). For shells like the default shell, that use dollar signs to introduce variables, it’s important to keep clear in your mind whether the variable you want to reference is a `make` variable (use a single dollar sign) or a shell variable (use two dollar signs). For example:

```
LIST = one two three
all:
        for i in $(LIST); do \
            echo $$i; \
        done
```

results in the following command being passed to the shell:

```
for i in one two three; do \
    echo $i; \
done
```

which generates the expected result:

```
one
two
three
```





## 5.2 Recipe Echoing



Normally `make` prints each line of the recipe before it is executed. We call this *echoing* because it gives the appearance that you are typing the lines yourself.

When a line starts with ‘@’, the echoing of that line is suppressed. The ‘@’ is discarded before the line is passed to the shell. Typically you would use this for a command whose only effect is to print something, such as an `echo` command to indicate progress through the makefile:

```
@echo About to make distribution files
```



When `make` is given the flag ‘-n’ or ‘--just-print’ it only echoes most recipes, without executing them. See [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary). In this case even the recipe lines starting with ‘@’ are printed. This flag is useful for finding out which recipes `make` thinks are necessary without actually doing them.



The ‘-s’ or ‘--silent’ flag to `make` prevents all echoing, as if all recipes started with ‘@’. A rule in the makefile for the special target `.SILENT` without prerequisites has the same effect (see [Special Built-in Target Names](https://www.gnu.org/software/make/manual/make.html#Special-Targets)).





## 5.3 Recipe Execution



When it is time to execute recipes to update a target, they are executed by invoking a new sub-shell for each line of the recipe, unless the `.ONESHELL` special target is in effect (see [Using One Shell](https://www.gnu.org/software/make/manual/make.html#One-Shell)) (In practice, `make` may take shortcuts that do not affect the results.)



**Please note:** this implies that setting shell variables and invoking shell commands such as `cd` that set a context local to each process will not affect the following lines in the recipe.[3](https://www.gnu.org/software/make/manual/make.html#FOOT3) If you want to use `cd` to affect the next statement, put both statements in a single recipe line. Then `make` will invoke one shell to run the entire line, and the shell will execute the statements in sequence. For example:

```
foo : bar/lose
        cd $(<D) && gobble $(<F) > ../$@
```

Here we use the shell AND operator (`&&`) so that if the `cd` command fails, the script will fail without trying to invoke the `gobble` command in the wrong directory, which could cause problems (in this case it would certainly cause ../foo to be truncated, at least).

- [Using One Shell](https://www.gnu.org/software/make/manual/make.html#One-Shell)
- [Choosing the Shell](https://www.gnu.org/software/make/manual/make.html#Choosing-the-Shell)





### 5.3.1 Using One Shell



Sometimes you would prefer that all the lines in the recipe be passed to a single invocation of the shell. There are generally two situations where this is useful: first, it can improve performance in makefiles where recipes consist of many command lines, by avoiding extra processes. Second, you might want newlines to be included in your recipe command (for example perhaps you are using a very different interpreter as your `SHELL`). If the `.ONESHELL` special target appears anywhere in the makefile then *all* recipe lines for each target will be provided to a single invocation of the shell. Newlines between recipe lines will be preserved. For example:

```
.ONESHELL:
foo : bar/lose
        cd $(<D)
        gobble $(<F) > ../$@
```

would now work as expected even though the commands are on different recipe lines.

If `.ONESHELL` is provided, then only the first line of the recipe will be checked for the special prefix characters (‘@’, ‘-’, and ‘+’). Subsequent lines will include the special characters in the recipe line when the `SHELL` is invoked. If you want your recipe to start with one of these special characters you’ll need to arrange for them to not be the first characters on the first line, perhaps by adding a comment or similar. For example, this would be a syntax error in Perl because the first ‘@’ is removed by make:

```
.ONESHELL:
SHELL = /usr/bin/perl
.SHELLFLAGS = -e
show :
        @f = qw(a b c);
        print "@f\n";
```

However, either of these alternatives would work properly:

```
.ONESHELL:
SHELL = /usr/bin/perl
.SHELLFLAGS = -e
show :
        # Make sure "@" is not the first character on the first line
        @f = qw(a b c);
        print "@f\n";
```

or

```
.ONESHELL:
SHELL = /usr/bin/perl
.SHELLFLAGS = -e
show :
        my @f = qw(a b c);
        print "@f\n";
```

As a special feature, if `SHELL` is determined to be a POSIX-style shell, the special prefix characters in “internal” recipe lines will be *removed* before the recipe is processed. This feature is intended to allow existing makefiles to add the `.ONESHELL` special target and still run properly without extensive modifications. Since the special prefix characters are not legal at the beginning of a line in a POSIX shell script this is not a loss in functionality. For example, this works as expected:

```
.ONESHELL:
foo : bar/lose
        @cd $(@D)
        @gobble $(@F) > ../$@
```

Even with this special feature, however, makefiles with `.ONESHELL` will behave differently in ways that could be noticeable. For example, normally if any line in the recipe fails, that causes the rule to fail and no more recipe lines are processed. Under `.ONESHELL` a failure of any but the final recipe line will not be noticed by `make`. You can modify `.SHELLFLAGS` to add the `-e` option to the shell which will cause any failure anywhere in the command line to cause the shell to fail, but this could itself cause your recipe to behave differently. Ultimately you may need to harden your recipe lines to allow them to work with `.ONESHELL`.





### 5.3.2 Choosing the Shell



The program used as the shell is taken from the variable `SHELL`. If this variable is not set in your makefile, the program /bin/sh is used as the shell. The argument(s) passed to the shell are taken from the variable `.SHELLFLAGS`. The default value of `.SHELLFLAGS` is `-c` normally, or `-ec` in POSIX-conforming mode.



Unlike most variables, the variable `SHELL` is never set from the environment. This is because the `SHELL` environment variable is used to specify your personal choice of shell program for interactive use. It would be very bad for personal choices like this to affect the functioning of makefiles. See [Variables from the Environment](https://www.gnu.org/software/make/manual/make.html#Environment).

Furthermore, when you do set `SHELL` in your makefile that value is *not* exported in the environment to recipe lines that `make` invokes. Instead, the value inherited from the user’s environment, if any, is exported. You can override this behavior by explicitly exporting `SHELL` (see [Communicating Variables to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Variables_002fRecursion)), forcing it to be passed in the environment to recipe lines.



However, on MS-DOS and MS-Windows the value of `SHELL` in the environment **is** used, since on those systems most users do not set this variable, and therefore it is most likely set specifically to be used by `make`. On MS-DOS, if the setting of `SHELL` is not suitable for `make`, you can set the variable `MAKESHELL` to the shell that `make` should use; if set it will be used as the shell instead of the value of `SHELL`.



#### Choosing a Shell in DOS and Windows



Choosing a shell in MS-DOS and MS-Windows is much more complex than on other systems.



On MS-DOS, if `SHELL` is not set, the value of the variable `COMSPEC` (which is always set) is used instead.



The processing of lines that set the variable `SHELL` in Makefiles is different on MS-DOS. The stock shell, command.com, is ridiculously limited in its functionality and many users of `make` tend to install a replacement shell. Therefore, on MS-DOS, `make` examines the value of `SHELL`, and changes its behavior based on whether it points to a Unix-style or DOS-style shell. This allows reasonable functionality even if `SHELL` points to command.com.

If `SHELL` points to a Unix-style shell, `make` on MS-DOS additionally checks whether that shell can indeed be found; if not, it ignores the line that sets `SHELL`. In MS-DOS, GNU `make` searches for the shell in the following places:

1. In the precise place pointed to by the value of `SHELL`. For example, if the makefile specifies ‘SHELL = /bin/sh’, `make` will look in the directory /bin on the current drive.
2. In the current directory.
3. In each of the directories in the `PATH` variable, in order.

In every directory it examines, `make` will first look for the specific file (sh in the example above). If this is not found, it will also look in that directory for that file with one of the known extensions which identify executable files. For example .exe, .com, .bat, .btm, .sh, and some others.

If any of these attempts is successful, the value of `SHELL` will be set to the full pathname of the shell as found. However, if none of these is found, the value of `SHELL` will not be changed, and thus the line that sets it will be effectively ignored. This is so `make` will only support features specific to a Unix-style shell if such a shell is actually installed on the system where `make` runs.

Note that this extended search for the shell is limited to the cases where `SHELL` is set from the Makefile; if it is set in the environment or command line, you are expected to set it to the full pathname of the shell, exactly as things are on Unix.

The effect of the above DOS-specific processing is that a Makefile that contains ‘SHELL = /bin/sh’ (as many Unix makefiles do), will work on MS-DOS unaltered if you have e.g. sh.exe installed in some directory along your `PATH`.







## 5.4 Parallel Execution



GNU `make` knows how to execute several recipes at once. Normally, `make` will execute only one recipe at a time, waiting for it to finish before executing the next. However, the ‘-j’ or ‘--jobs’ option tells `make` to execute many recipes simultaneously. You can inhibit parallelism for some or all targets from within the makefile (see [Disabling Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Disable)).

On MS-DOS, the ‘-j’ option has no effect, since that system doesn’t support multi-processing.

If the ‘-j’ option is followed by an integer, this is the number of recipes to execute at once; this is called the number of *job slots*. If there is nothing looking like an integer after the ‘-j’ option, there is no limit on the number of job slots. The default number of job slots is one, which means serial execution (one thing at a time).

Handling recursive `make` invocations raises issues for parallel execution. For more information on this, see [Communicating Options to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Options_002fRecursion).

If a recipe fails (is killed by a signal or exits with a nonzero status), and errors are not ignored for that recipe (see [Errors in Recipes](https://www.gnu.org/software/make/manual/make.html#Errors)), the remaining recipe lines to remake the same target will not be run. If a recipe fails and the ‘-k’ or ‘--keep-going’ option was not given (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)), `make` aborts execution. If make terminates for any reason (including a signal) with child processes running, it waits for them to finish before actually exiting.



When the system is heavily loaded, you will probably want to run fewer jobs than when it is lightly loaded. You can use the ‘-l’ option to tell `make` to limit the number of jobs to run at once, based on the load average. The ‘-l’ or ‘--max-load’ option is followed by a floating-point number. For example,

```
-l 2.5
```

will not let `make` start more than one job if the load average is above 2.5. The ‘-l’ option with no following number removes the load limit, if one was given with a previous ‘-l’ option.

More precisely, when `make` goes to start up a job, and it already has at least one job running, it checks the current load average; if it is not lower than the limit given with ‘-l’, `make` waits until the load average goes below that limit, or until all the other jobs finish.

By default, there is no load limit.

- [Disabling Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Disable)
- [Output During Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Output)
- [Input During Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Input)





### 5.4.1 Disabling Parallel Execution



If a makefile completely and accurately defines the dependency relationships between all of its targets, then `make` will correctly build the goals regardless of whether parallel execution is enabled or not. This is the ideal way to write makefiles.

However, sometimes some or all of the targets in a makefile cannot be executed in parallel and it’s not feasible to add the prerequisites needed to inform `make`. In that case the makefile can use various methods to disable parallel execution.



If the `.NOTPARALLEL` special target with no prerequisites is specified anywhere then the entire instance of `make` will be run serially, regardless of the parallel setting. For example:

```
all: one two three
one two three: ; @sleep 1; echo $@

.NOTPARALLEL:
```

Regardless of how `make` is invoked, the targets one, two, and three will be run serially.

If the `.NOTPARALLEL` special target has prerequisites, then each of those prerequisites will be considered a target and all prerequisites of these targets will be run serially. Note that only when building this target will the prerequisites be run serially: if some other target lists the same prerequisites and is not in `.NOTPARALLEL` then these prerequisites may be run in parallel. For example:

```
all: base notparallel

base: one two three
notparallel: one two three

one two three: ; @sleep 1; echo $@

.NOTPARALLEL: notparallel
```

Here ‘make -j base’ will run the targets one, two, and three in parallel, while ‘make -j notparallel’ will run them serially. If you run ‘make -j all’ then they *will* be run in parallel since base lists them as prerequisites and is not serialized.

The `.NOTPARALLEL` target should not have commands.



Finally you can control the serialization of specific prerequisites in a fine-grained way using the `.WAIT` special target. When this target appears in a prerequisite list and parallel execution is enabled, `make` will not build any of the prerequisites to the *right* of `.WAIT` until all prerequisites to the *left* of `.WAIT` have completed. For example:

```
all: one two .WAIT three
one two three: ; @sleep 1; echo $@
```

If parallel execution is enabled, `make` will try to build one and two in parallel but will not try to build three until both are complete.

As with targets provided to `.NOTPARALLEL`, `.WAIT` takes effect only when building the target in whose prerequisite list it appears. If the same prerequisites are present in other targets, without `.WAIT`, then they may still be run in parallel. Because of this, neither `.NOTPARALLEL` with targets nor `.WAIT` are as reliable for controlling parallel execution as defining a prerequisite relationship. However they are easy to use and may be sufficient in less complex situations.

The `.WAIT` prerequisite will not be present in any of the automatic variables for the rule.

You can create an actual target `.WAIT` in your makefile for portability but this is not required to use this feature. If a `.WAIT` target is created it should not have prerequisites or commands.

The `.WAIT` feature is also implemented in other versions of `make` and it’s specified in the POSIX standard for `make`.





### 5.4.2 Output During Parallel Execution



When running several recipes in parallel the output from each recipe appears as soon as it is generated, with the result that messages from different recipes may be interspersed, sometimes even appearing on the same line. This can make reading the output very difficult.



To avoid this you can use the ‘--output-sync’ (‘-O’) option. This option instructs `make` to save the output from the commands it invokes and print it all once the commands are completed. Additionally, if there are multiple recursive `make` invocations running in parallel, they will communicate so that only one of them is generating output at a time.

If working directory printing is enabled (see [The ‘--print-directory’ Option](https://www.gnu.org/software/make/manual/make.html#g_t_002dw-Option)), the enter/leave messages are printed around each output grouping. If you prefer not to see these messages add the ‘--no-print-directory’ option to `MAKEFLAGS`.

There are four levels of granularity when synchronizing output, specified by giving an argument to the option (e.g., ‘-Oline’ or ‘--output-sync=recurse’).

- `none`

  This is the default: all output is sent directly as it is generated and no synchronization is performed.

- `line`

  Output from each individual line of the recipe is grouped and printed as soon as that line is complete. If a recipe consists of multiple lines, they may be interspersed with lines from other recipes.

- `target`

  Output from the entire recipe for each target is grouped and printed once the target is complete. This is the default if the `--output-sync` or `-O` option is given with no argument.

- `recurse`

  Output from each recursive invocation of `make` is grouped and printed once the recursive invocation is complete.

Regardless of the mode chosen, the total build time will be the same. The only difference is in how the output appears.

The ‘target’ and ‘recurse’ modes both collect the output of the entire recipe of a target and display it uninterrupted when the recipe completes. The difference between them is in how recipes that contain recursive invocations of `make` are treated (see [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)). For all recipes which have no recursive lines, the ‘target’ and ‘recurse’ modes behave identically.

If the ‘recurse’ mode is chosen, recipes that contain recursive `make` invocations are treated the same as other targets: the output from the recipe, including the output from the recursive `make`, is saved and printed after the entire recipe is complete. This ensures output from all the targets built by a given recursive `make` instance are grouped together, which may make the output easier to understand. However it also leads to long periods of time during the build where no output is seen, followed by large bursts of output. If you are not watching the build as it proceeds, but instead viewing a log of the build after the fact, this may be the best option for you.

If you are watching the output, the long gaps of quiet during the build can be frustrating. The ‘target’ output synchronization mode detects when `make` is going to be invoked recursively, using the standard methods, and it will not synchronize the output of those lines. The recursive `make` will perform the synchronization for its targets and the output from each will be displayed immediately when it completes. Be aware that output from recursive lines of the recipe are not synchronized (for example if the recursive line prints a message before running `make`, that message will not be synchronized).

The ‘line’ mode can be useful for front-ends that are watching the output of `make` to track when recipes are started and completed.

Some programs invoked by `make` may behave differently if they determine they’re writing output to a terminal versus a file (often described as “interactive” vs. “non-interactive” modes). For example, many programs that can display colorized output will not do so if they determine they are not writing to a terminal. If your makefile invokes a program like this then using the output synchronization options will cause the program to believe it’s running in “non-interactive” mode even though the output will ultimately go to the terminal.





### 5.4.3 Input During Parallel Execution



Two processes cannot both take input from the same device at the same time. To make sure that only one recipe tries to take input from the terminal at once, `make` will invalidate the standard input streams of all but one running recipe. If another recipe attempts to read from standard input it will usually incur a fatal error (a ‘Broken pipe’ signal).

It is unpredictable which recipe will have a valid standard input stream (which will come from the terminal, or wherever you redirect the standard input of `make`). The first recipe run will always get it first, and the first recipe started after that one finishes will get it next, and so on.

We will change how this aspect of `make` works if we find a better alternative. In the mean time, you should not rely on any recipe using standard input at all if you are using the parallel execution feature; but if you are not using this feature, then standard input works normally in all recipes.





## 5.5 Errors in Recipes



After each shell invocation returns, `make` looks at its exit status. If the shell completed successfully (the exit status is zero), the next line in the recipe is executed in a new shell; after the last line is finished, the rule is finished.

If there is an error (the exit status is nonzero), `make` gives up on the current rule, and perhaps on all rules.

Sometimes the failure of a certain recipe line does not indicate a problem. For example, you may use the `mkdir` command to ensure that a directory exists. If the directory already exists, `mkdir` will report an error, but you probably want `make` to continue regardless.



To ignore errors in a recipe line, write a ‘-’ at the beginning of the line’s text (after the initial tab). The ‘-’ is discarded before the line is passed to the shell for execution.

For example,

```
clean:
        -rm -f *.o
```



This causes `make` to continue even if `rm` is unable to remove a file.



When you run `make` with the ‘-i’ or ‘--ignore-errors’ flag, errors are ignored in all recipes of all rules. A rule in the makefile for the special target `.IGNORE` has the same effect, if there are no prerequisites. This is less flexible but sometimes useful.

When errors are to be ignored, because of either a ‘-’ or the ‘-i’ flag, `make` treats an error return just like success, except that it prints out a message that tells you the status code the shell exited with, and says that the error has been ignored.

When an error happens that `make` has not been told to ignore, it implies that the current target cannot be correctly remade, and neither can any other that depends on it either directly or indirectly. No further recipes will be executed for these targets, since their preconditions have not been achieved.



Normally `make` gives up immediately in this circumstance, returning a nonzero status. However, if the ‘-k’ or ‘--keep-going’ flag is specified, `make` continues to consider the other prerequisites of the pending targets, remaking them if necessary, before it gives up and returns nonzero status. For example, after an error in compiling one object file, ‘make -k’ will continue compiling other object files even though it already knows that linking them will be impossible. See [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary).

The usual behavior assumes that your purpose is to get the specified targets up to date; once `make` learns that this is impossible, it might as well report the failure immediately. The ‘-k’ option says that the real purpose is to test as many of the changes made in the program as possible, perhaps to find several independent problems so that you can correct them all before the next attempt to compile. This is why Emacs’ `compile` command passes the ‘-k’ flag by default.



Usually when a recipe line fails, if it has changed the target file at all, the file is corrupted and cannot be used—or at least it is not completely updated. Yet the file’s time stamp says that it is now up to date, so the next time `make` runs, it will not try to update that file. The situation is just the same as when the shell is killed by a signal; see [Interrupting or Killing `make`](https://www.gnu.org/software/make/manual/make.html#Interrupts). So generally the right thing to do is to delete the target file if the recipe fails after beginning to change the file. `make` will do this if `.DELETE_ON_ERROR` appears as a target. This is almost always what you want `make` to do, but it is not historical practice; so for compatibility, you must explicitly request it.





## 5.6 Interrupting or Killing `make`



If `make` gets a fatal signal while a shell is executing, it may delete the target file that the recipe was supposed to update. This is done if the target file’s last-modification time has changed since `make` first checked it.

The purpose of deleting the target is to make sure that it is remade from scratch when `make` is next run. Why is this? Suppose you type Ctrl-c while a compiler is running, and it has begun to write an object file foo.o. The Ctrl-c kills the compiler, resulting in an incomplete file whose last-modification time is newer than the source file foo.c. But `make` also receives the Ctrl-c signal and deletes this incomplete file. If `make` did not do this, the next invocation of `make` would think that foo.o did not require updating—resulting in a strange error message from the linker when it tries to link an object file half of which is missing.



You can prevent the deletion of a target file in this way by making the special target `.PRECIOUS` depend on it. Before remaking a target, `make` checks to see whether it appears on the prerequisites of `.PRECIOUS`, and thereby decides whether the target should be deleted if a signal happens. Some reasons why you might do this are that the target is updated in some atomic fashion, or exists only to record a modification-time (its contents do not matter), or must exist at all times to prevent other sorts of trouble.

Although `make` does its best to clean up there are certain situations in which cleanup is impossible. For example, `make` may be killed by an uncatchable signal. Or, one of the programs make invokes may be killed or crash, leaving behind an up-to-date but corrupt target file: `make` will not realize that this failure requires the target to be cleaned. Or `make` itself may encounter a bug and crash.

For these reasons it’s best to write *defensive recipes*, which won’t leave behind corrupted targets even if they fail. Most commonly these recipes create temporary files rather than updating the target directly, then rename the temporary file to the final target name. Some compilers already behave this way, so that you don’t need to write a defensive recipe.





## 5.7 Recursive Use of `make`



Recursive use of `make` means using `make` as a command in a makefile. This technique is useful when you want separate makefiles for various subsystems that compose a larger system. For example, suppose you have a sub-directory subdir which has its own makefile, and you would like the containing directory’s makefile to run `make` on the sub-directory. You can do it by writing this:

```
subsystem:
        cd subdir && $(MAKE)
```

or, equivalently, this (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)):

```
subsystem:
        $(MAKE) -C subdir
```



You can write recursive `make` commands just by copying this example, but there are many things to know about how they work and why, and about how the sub-`make` relates to the top-level `make`. You may also find it useful to declare targets that invoke recursive `make` commands as ‘.PHONY’ (for more discussion on when this is useful, see [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)).



For your convenience, when GNU `make` starts (after it has processed any `-C` options) it sets the variable `CURDIR` to the pathname of the current working directory. This value is never touched by `make` again: in particular note that if you include files from other directories the value of `CURDIR` does not change. The value has the same precedence it would have if it were set in the makefile (by default, an environment variable `CURDIR` will not override this value). Note that setting this variable has no impact on the operation of `make` (it does not cause `make` to change its working directory, for example).

- [How the `MAKE` Variable Works](https://www.gnu.org/software/make/manual/make.html#MAKE-Variable)
- [Communicating Variables to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Variables_002fRecursion)
- [Communicating Options to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Options_002fRecursion)
- [The ‘--print-directory’ Option](https://www.gnu.org/software/make/manual/make.html#g_t_002dw-Option)





### 5.7.1 How the `MAKE` Variable Works



Recursive `make` commands should always use the variable `MAKE`, not the explicit command name ‘make’, as shown here:

```
subsystem:
        cd subdir && $(MAKE)
```

The value of this variable is the file name with which `make` was invoked. If this file name was /bin/make, then the recipe executed is ‘cd subdir && /bin/make’. If you use a special version of `make` to run the top-level makefile, the same special version will be executed for recursive invocations.



As a special feature, using the variable `MAKE` in the recipe of a rule alters the effects of the ‘-t’ (‘--touch’), ‘-n’ (‘--just-print’), or ‘-q’ (‘--question’) option. Using the `MAKE` variable has the same effect as using a ‘+’ character at the beginning of the recipe line. See [Instead of Executing the Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution). This special feature is only enabled if the `MAKE` variable appears directly in the recipe: it does not apply if the `MAKE` variable is referenced through expansion of another variable. In the latter case you must use the ‘+’ token to get these special effects.

Consider the command ‘make -t’ in the above example. (The ‘-t’ option marks targets as up to date without actually running any recipes; see [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution).) Following the usual definition of ‘-t’, a ‘make -t’ command in the example would create a file named subsystem and do nothing else. What you really want it to do is run ‘cd subdir && make -t’; but that would require executing the recipe, and ‘-t’ says not to execute recipes.

The special feature makes this do what you want: whenever a recipe line of a rule contains the variable `MAKE`, the flags ‘-t’, ‘-n’ and ‘-q’ do not apply to that line. Recipe lines containing `MAKE` are executed normally despite the presence of a flag that causes most recipes not to be run. The usual `MAKEFLAGS` mechanism passes the flags to the sub-`make` (see [Communicating Options to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Options_002fRecursion)), so your request to touch the files, or print the recipes, is propagated to the subsystem.





### 5.7.2 Communicating Variables to a Sub-`make`



Variable values of the top-level `make` can be passed to the sub-`make` through the environment by explicit request. These variables are defined in the sub-`make` as defaults, but they do not override variables defined in the makefile used by the sub-`make` unless you use the ‘-e’ switch (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)).

To pass down, or *export*, a variable, `make` adds the variable and its value to the environment for running each line of the recipe. The sub-`make`, in turn, uses the environment to initialize its table of variable values. See [Variables from the Environment](https://www.gnu.org/software/make/manual/make.html#Environment).

Except by explicit request, `make` exports a variable only if it is either defined in the environment initially, or if set on the command line and its name consists only of letters, numbers, and underscores.



The value of the `make` variable `SHELL` is not exported. Instead, the value of the `SHELL` variable from the invoking environment is passed to the sub-`make`. You can force `make` to export its value for `SHELL` by using the `export` directive, described below. See [Choosing the Shell](https://www.gnu.org/software/make/manual/make.html#Choosing-the-Shell).

The special variable `MAKEFLAGS` is always exported (unless you unexport it). `MAKEFILES` is exported if you set it to anything.

`make` automatically passes down variable values that were defined on the command line, by putting them in the `MAKEFLAGS` variable. See [Communicating Options to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Options_002fRecursion).

Variables are *not* normally passed down if they were created by default by `make` (see [Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)). The sub-`make` will define these for itself.



If you want to export specific variables to a sub-`make`, use the `export` directive, like this:

```
export variable …
```

If you want to *prevent* a variable from being exported, use the `unexport` directive, like this:

```
unexport variable …
```

In both of these forms, the arguments to `export` and `unexport` are expanded, and so could be variables or functions which expand to a (list of) variable names to be (un)exported.

As a convenience, you can define a variable and export it at the same time by doing:

```
export variable = value
```

has the same result as:

```
variable = value
export variable
```

and

```
export variable := value
```

has the same result as:

```
variable := value
export variable
```

Likewise,

```
export variable += value
```

is just like:

```
variable += value
export variable
```

See [Appending More Text to Variables](https://www.gnu.org/software/make/manual/make.html#Appending).

You may notice that the `export` and `unexport` directives work in `make` in the same way they work in the shell, `sh`.

If you want all variables to be exported by default, you can use `export` by itself:

```
export
```

This tells `make` that variables which are not explicitly mentioned in an `export` or `unexport` directive should be exported. Any variable given in an `unexport` directive will still *not* be exported.



The behavior elicited by an `export` directive by itself was the default in older versions of GNU `make`. If your makefiles depend on this behavior and you want to be compatible with old versions of `make`, you can add the special target `.EXPORT_ALL_VARIABLES` to your makefile instead of using the `export` directive. This will be ignored by old `make`s, while the `export` directive will cause a syntax error.

When using `export` by itself or `.EXPORT_ALL_VARIABLES` to export variables by default, only variables whose names consist solely of alphanumerics and underscores will be exported. To export other variables you must specifically mention them in an `export` directive.

Adding a variable’s value to the environment requires it to be expanded. If expanding a variable has side-effects (such as the `info` or `eval` or similar functions) then these side-effects will be seen every time a command is invoked. You can avoid this by ensuring that such variables have names which are not exportable by default. However, a better solution is to *not* use this “export by default” facility at all, and instead explicitly `export` the relevant variables by name.

You can use `unexport` by itself to tell `make` *not* to export variables by default. Since this is the default behavior, you would only need to do this if `export` had been used by itself earlier (in an included makefile, perhaps). You **cannot** use `export` and `unexport` by themselves to have variables exported for some recipes and not for others. The last `export` or `unexport` directive that appears by itself determines the behavior for the entire run of `make`.



As a special feature, the variable `MAKELEVEL` is changed when it is passed down from level to level. This variable’s value is a string which is the depth of the level as a decimal number. The value is ‘0’ for the top-level `make`; ‘1’ for a sub-`make`, ‘2’ for a sub-sub-`make`, and so on. The incrementation happens when `make` sets up the environment for a recipe.

The main use of `MAKELEVEL` is to test it in a conditional directive (see [Conditional Parts of Makefiles](https://www.gnu.org/software/make/manual/make.html#Conditionals)); this way you can write a makefile that behaves one way if run recursively and another way if run directly by you.



You can use the variable `MAKEFILES` to cause all sub-`make` commands to use additional makefiles. The value of `MAKEFILES` is a whitespace-separated list of file names. This variable, if defined in the outer-level makefile, is passed down through the environment; then it serves as a list of extra makefiles for the sub-`make` to read before the usual or specified ones. See [The Variable `MAKEFILES`](https://www.gnu.org/software/make/manual/make.html#MAKEFILES-Variable).





### 5.7.3 Communicating Options to a Sub-`make`



Flags such as ‘-s’ and ‘-k’ are passed automatically to the sub-`make` through the variable `MAKEFLAGS`. This variable is set up automatically by `make` to contain the flag letters that `make` received. Thus, if you do ‘make -ks’ then `MAKEFLAGS` gets the value ‘ks’.

As a consequence, every sub-`make` gets a value for `MAKEFLAGS` in its environment. In response, it takes the flags from that value and processes them as if they had been given as arguments. See [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary). This means that, unlike other environment variables, `MAKEFLAGS` specified in the environment take precedence over `MAKEFLAGS` specified in the makefile.

The value of `MAKEFLAGS` is a possibly empty group of characters representing single-letter options that take no argument, followed by a space and any options that take arguments or which have long option names. If an option has both single-letter and long options, the single-letter option is always preferred. If there are no single-letter options on the command line, then the value of `MAKEFLAGS` starts with a space.



Likewise variables defined on the command line are passed to the sub-`make` through `MAKEFLAGS`. Words in the value of `MAKEFLAGS` that contain ‘=’, `make` treats as variable definitions just as if they appeared on the command line. See [Overriding Variables](https://www.gnu.org/software/make/manual/make.html#Overriding).



The options ‘-C’, ‘-f’, ‘-o’, and ‘-W’ are not put into `MAKEFLAGS`; these options are not passed down.



The ‘-j’ option is a special case (see [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel)). If you set it to some numeric value ‘N’ and your operating system supports it (most any UNIX system will; others typically won’t), the parent `make` and all the sub-`make`s will communicate to ensure that there are only ‘N’ jobs running at the same time between them all. Note that any job that is marked recursive (see [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution)) doesn’t count against the total jobs (otherwise we could get ‘N’ sub-`make`s running and have no slots left over for any real work!)

If your operating system doesn’t support the above communication, then no ‘-j’ is added to `MAKEFLAGS`, so that sub-`make`s run in non-parallel mode. If the ‘-j’ option were passed down to sub-`make`s you would get many more jobs running in parallel than you asked for. If you give ‘-j’ with no numeric argument, meaning to run as many jobs as possible in parallel, this is passed down, since multiple infinities are no more than one.

If you do not want to pass the other flags down, you must change the value of `MAKEFLAGS`, for example like this:

```
subsystem:
        cd subdir && $(MAKE) MAKEFLAGS=
```



The command line variable definitions really appear in the variable `MAKEOVERRIDES`, and `MAKEFLAGS` contains a reference to this variable. If you do want to pass flags down normally, but don’t want to pass down the command line variable definitions, you can reset `MAKEOVERRIDES` to empty, like this:

```
MAKEOVERRIDES =
```

This is not usually useful to do. However, some systems have a small fixed limit on the size of the environment, and putting so much information into the value of `MAKEFLAGS` can exceed it. If you see the error message ‘Arg list too long’, this may be the problem. (For strict compliance with POSIX.2, changing `MAKEOVERRIDES` does not affect `MAKEFLAGS` if the special target ‘.POSIX’ appears in the makefile. You probably do not care about this.)



A similar variable `MFLAGS` exists also, for historical compatibility. It has the same value as `MAKEFLAGS` except that it does not contain the command line variable definitions, and it always begins with a hyphen unless it is empty (`MAKEFLAGS` begins with a hyphen only when it begins with an option that has no single-letter version, such as ‘--warn-undefined-variables’). `MFLAGS` was traditionally used explicitly in the recursive `make` command, like this:

```
subsystem:
        cd subdir && $(MAKE) $(MFLAGS)
```

but now `MAKEFLAGS` makes this usage redundant. If you want your makefiles to be compatible with old `make` programs, use this technique; it will work fine with more modern `make` versions too.



The `MAKEFLAGS` variable can also be useful if you want to have certain options, such as ‘-k’ (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)), set each time you run `make`. You simply put a value for `MAKEFLAGS` in your environment. You can also set `MAKEFLAGS` in a makefile, to specify additional flags that should also be in effect for that makefile. (Note that you cannot use `MFLAGS` this way. That variable is set only for compatibility; `make` does not interpret a value you set for it in any way.)

When `make` interprets the value of `MAKEFLAGS` (either from the environment or from a makefile), it first prepends a hyphen if the value does not already begin with one. Then it chops the value into words separated by blanks, and parses these words as if they were options given on the command line (except that ‘-C’, ‘-f’, ‘-h’, ‘-o’, ‘-W’, and their long-named versions are ignored; and there is no error for an invalid option).

If you do put `MAKEFLAGS` in your environment, you should be sure not to include any options that will drastically affect the actions of `make` and undermine the purpose of makefiles and of `make` itself. For instance, the ‘-t’, ‘-n’, and ‘-q’ options, if put in one of these variables, could have disastrous consequences and would certainly have at least surprising and probably annoying effects.

If you’d like to run other implementations of `make` in addition to GNU `make`, and hence do not want to add GNU `make`-specific flags to the `MAKEFLAGS` variable, you can add them to the `GNUMAKEFLAGS` variable instead. This variable is parsed just before `MAKEFLAGS`, in the same way as `MAKEFLAGS`. When `make` constructs `MAKEFLAGS` to pass to a recursive `make` it will include all flags, even those taken from `GNUMAKEFLAGS`. As a result, after parsing `GNUMAKEFLAGS` GNU `make` sets this variable to the empty string to avoid duplicating flags during recursion.

It’s best to use `GNUMAKEFLAGS` only with flags which won’t materially change the behavior of your makefiles. If your makefiles require GNU Make anyway then simply use `MAKEFLAGS`. Flags such as ‘--no-print-directory’ or ‘--output-sync’ may be appropriate for `GNUMAKEFLAGS`.





### 5.7.4 The ‘--print-directory’ Option



If you use several levels of recursive `make` invocations, the ‘-w’ or ‘--print-directory’ option can make the output a lot easier to understand by showing each directory as `make` starts processing it and as `make` finishes processing it. For example, if ‘make -w’ is run in the directory /u/gnu/make, `make` will print a line of the form:

```
make: Entering directory `/u/gnu/make'.
```

before doing anything else, and a line of the form:

```
make: Leaving directory `/u/gnu/make'.
```

when processing is completed.



Normally, you do not need to specify this option because ‘make’ does it for you: ‘-w’ is turned on automatically when you use the ‘-C’ option, and in sub-`make`s. `make` will not automatically turn on ‘-w’ if you also use ‘-s’, which says to be silent, or if you use ‘--no-print-directory’ to explicitly disable it.





## 5.8 Defining Canned Recipes



When the same sequence of commands is useful in making various targets, you can define it as a canned sequence with the `define` directive, and refer to the canned sequence from the recipes for those targets. The canned sequence is actually a variable, so the name must not conflict with other variable names.

Here is an example of defining a canned recipe:

```
define run-yacc =
yacc $(firstword $^)
mv y.tab.c $@
endef
```



Here `run-yacc` is the name of the variable being defined; `endef` marks the end of the definition; the lines in between are the commands. The `define` directive does not expand variable references and function calls in the canned sequence; the ‘$’ characters, parentheses, variable names, and so on, all become part of the value of the variable you are defining. See [Defining Multi-Line Variables](https://www.gnu.org/software/make/manual/make.html#Multi_002dLine), for a complete explanation of `define`.

The first command in this example runs Yacc on the first prerequisite of whichever rule uses the canned sequence. The output file from Yacc is always named y.tab.c. The second command moves the output to the rule’s target file name.

To use the canned sequence, substitute the variable into the recipe of a rule. You can substitute it like any other variable (see [Basics of Variable References](https://www.gnu.org/software/make/manual/make.html#Reference)). Because variables defined by `define` are recursively expanded variables, all the variable references you wrote inside the `define` are expanded now. For example:

```
foo.c : foo.y
        $(run-yacc)
```

‘foo.y’ will be substituted for the variable ‘$^’ when it occurs in `run-yacc`’s value, and ‘foo.c’ for ‘$@’.

This is a realistic example, but this particular one is not needed in practice because `make` has an implicit rule to figure out these commands based on the file names involved (see [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)).



In recipe execution, each line of a canned sequence is treated just as if the line appeared on its own in the rule, preceded by a tab. In particular, `make` invokes a separate sub-shell for each line. You can use the special prefix characters that affect command lines (‘@’, ‘-’, and ‘+’) on each line of a canned sequence. See [Writing Recipes in Rules](https://www.gnu.org/software/make/manual/make.html#Recipes). For example, using this canned sequence:

```
define frobnicate =
@echo "frobnicating target $@"
frob-step-1 $< -o $@-step-1
frob-step-2 $@-step-1 -o $@
endef
```

`make` will not echo the first line, the `echo` command. But it *will* echo the following two recipe lines.

On the other hand, prefix characters on the recipe line that refers to a canned sequence apply to every line in the sequence. So the rule:

```
frob.out: frob.in
        @$(frobnicate)
```

does not echo *any* recipe lines. (See [Recipe Echoing](https://www.gnu.org/software/make/manual/make.html#Echoing), for a full explanation of ‘@’.)





## 5.9 Using Empty Recipes



It is sometimes useful to define recipes which do nothing. This is done simply by giving a recipe that consists of nothing but whitespace. For example:

```
target: ;
```

defines an empty recipe for target. You could also use a line beginning with a recipe prefix character to define an empty recipe, but this would be confusing because such a line looks empty.



You may be wondering why you would want to define a recipe that does nothing. One reason this is useful is to prevent a target from getting implicit recipes (from implicit rules or the `.DEFAULT` special target; see [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules) and see [Defining Last-Resort Default Rules](https://www.gnu.org/software/make/manual/make.html#Last-Resort)).

Empty recipes can also be used to avoid errors for targets that will be created as a side-effect of another recipe: if the target does not exist the empty recipe ensures that `make` won’t complain that it doesn’t know how to build the target, and `make` will assume the target is out of date.

You may be inclined to define empty recipes for targets that are not actual files, but only exist so that their prerequisites can be remade. However, this is not the best way to do that, because the prerequisites may not be remade properly if the target file actually does exist. See [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets), for a better way to do this.