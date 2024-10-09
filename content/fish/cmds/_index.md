+++
title = "cmds"
date = 2024-10-09T13:41:30+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

# Commands

This is a list of all the commands fish ships with.

Broadly speaking, these fall into a few categories:

## Keywords

Core language keywords that make up the syntax, like

- [if](https://fishshell.com/docs/current/cmds/if.html) for conditions.
- [for](https://fishshell.com/docs/current/cmds/for.html) and [while](https://fishshell.com/docs/current/cmds/while.html) for loops.
- [break](https://fishshell.com/docs/current/cmds/break.html) and [continue](https://fishshell.com/docs/current/cmds/continue.html) to control loops.
- [function](https://fishshell.com/docs/current/cmds/function.html) to define functions.
- [return](https://fishshell.com/docs/current/cmds/return.html) to return a status from a function.
- [begin](https://fishshell.com/docs/current/cmds/begin.html) to begin a block and [end](https://fishshell.com/docs/current/cmds/end.html) to end any block (including ifs and loops).
- [and](https://fishshell.com/docs/current/cmds/and.html), [or](https://fishshell.com/docs/current/cmds/or.html) and [not](https://fishshell.com/docs/current/cmds/not.html) to combine commands logically.
- [switch](https://fishshell.com/docs/current/cmds/switch.html) and [case](https://fishshell.com/docs/current/cmds/case.html) to make multiple blocks depending on the value of a variable.
- [command](https://fishshell.com/docs/current/cmds/command.html) or [builtin](https://fishshell.com/docs/current/cmds/builtin.html) to tell fish what sort of thing to execute
- [time](https://fishshell.com/docs/current/cmds/time.html) to time execution
- [exec](https://fishshell.com/docs/current/cmds/exec.html) tells fish to replace itself with a command.

## Tools

Builtins to do a task, like

- [cd](https://fishshell.com/docs/current/cmds/cd.html) to change the current directory.
- [echo](https://fishshell.com/docs/current/cmds/echo.html) or [printf](https://fishshell.com/docs/current/cmds/printf.html) to produce output.
- [set_color](https://fishshell.com/docs/current/cmds/set_color.html) to colorize output.
- [set](https://fishshell.com/docs/current/cmds/set.html) to set, query or erase variables.
- [read](https://fishshell.com/docs/current/cmds/read.html) to read input.
- [string](https://fishshell.com/docs/current/cmds/string.html) for string manipulation.
- [math](https://fishshell.com/docs/current/cmds/math.html) does arithmetic.
- [argparse](https://fishshell.com/docs/current/cmds/argparse.html) to make arguments easier to handle.
- [count](https://fishshell.com/docs/current/cmds/count.html) to count arguments.
- [type](https://fishshell.com/docs/current/cmds/type.html) to find out what sort of thing (command, builtin or function) fish would call, or if it exists at all.
- [test](https://fishshell.com/docs/current/cmds/test.html) checks conditions like if a file exists or a string is empty.
- [contains](https://fishshell.com/docs/current/cmds/contains.html) to see if a list contains an entry.
- [eval](https://fishshell.com/docs/current/cmds/eval.html) and [source](https://fishshell.com/docs/current/cmds/source.html) to run fish code from a string or file.
- [status](https://fishshell.com/docs/current/cmds/status.html) to get shell information, like whether it’s interactive or a login shell, or which file it is currently running.
- [abbr](https://fishshell.com/docs/current/cmds/abbr.html) manages [Abbreviations](https://fishshell.com/docs/current/interactive.html#abbreviations).
- [bind](https://fishshell.com/docs/current/cmds/bind.html) to change bindings.
- [complete](https://fishshell.com/docs/current/cmds/complete.html) manages [completions](https://fishshell.com/docs/current/interactive.html#tab-completion).
- [commandline](https://fishshell.com/docs/current/cmds/commandline.html) to get or change the commandline contents.
- [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html) to easily change fish’s configuration, like the prompt or colorscheme.
- [random](https://fishshell.com/docs/current/cmds/random.html) to generate random numbers or pick from a list.

## Known functions

Known functions are a customization point. You can change them to change how your fish behaves. This includes:

- [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) and [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) and [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html) to print your prompt.
- [fish_command_not_found](https://fishshell.com/docs/current/cmds/fish_command_not_found.html) to tell fish what to do when a command is not found.
- [fish_title](https://fishshell.com/docs/current/cmds/fish_title.html) to change the terminal’s title.
- [fish_greeting](https://fishshell.com/docs/current/cmds/fish_greeting.html) to show a greeting when fish starts.

## Helper functions

Some helper functions, often to give you information for use in your prompt:

- [fish_git_prompt](https://fishshell.com/docs/current/cmds/fish_git_prompt.html) and [fish_hg_prompt](https://fishshell.com/docs/current/cmds/fish_hg_prompt.html) to print information about the current git or mercurial repository.
- [fish_vcs_prompt](https://fishshell.com/docs/current/cmds/fish_vcs_prompt.html) to print information for either.
- [fish_svn_prompt](https://fishshell.com/docs/current/cmds/fish_svn_prompt.html) to print information about the current svn repository.
- [fish_status_to_signal](https://fishshell.com/docs/current/cmds/fish_status_to_signal.html) to give a signal name from a return status.
- [prompt_pwd](https://fishshell.com/docs/current/cmds/prompt_pwd.html) to give the current directory in a nicely formatted and shortened way.
- [prompt_login](https://fishshell.com/docs/current/cmds/prompt_login.html) to describe the current login, with user and hostname, and to explain if you are in a chroot or connected via ssh.
- [prompt_hostname](https://fishshell.com/docs/current/cmds/prompt_hostname.html) to give the hostname, shortened for use in the prompt.
- [fish_is_root_user](https://fishshell.com/docs/current/cmds/fish_is_root_user.html) to check if the current user is an administrator user like root.
- [fish_add_path](https://fishshell.com/docs/current/cmds/fish_add_path.html) to easily add a path to $PATH.
- [alias](https://fishshell.com/docs/current/cmds/alias.html) to quickly define wrapper functions (“aliases”).
- [fish_delta](https://fishshell.com/docs/current/cmds/fish_delta.html) to show what you have changed from the default configuration.

## Helper commands

fish also ships some things as external commands so they can be easily called from elsewhere.

This includes [fish_indent](https://fishshell.com/docs/current/cmds/fish_indent.html) to format fish code and [fish_key_reader](https://fishshell.com/docs/current/cmds/fish_key_reader.html) to show you what escape sequence a keypress produces.

## The full list

And here is the full list:

- [_ - call fish’s translations](https://fishshell.com/docs/current/cmds/_.html)
- [abbr - manage fish abbreviations](https://fishshell.com/docs/current/cmds/abbr.html)
- [alias - create a function](https://fishshell.com/docs/current/cmds/alias.html)
- [and - conditionally execute a command](https://fishshell.com/docs/current/cmds/and.html)
- [argparse - parse options passed to a fish script or function](https://fishshell.com/docs/current/cmds/argparse.html)
- [begin - start a new block of code](https://fishshell.com/docs/current/cmds/begin.html)
- [bg - send jobs to background](https://fishshell.com/docs/current/cmds/bg.html)
- [bind - handle fish key bindings](https://fishshell.com/docs/current/cmds/bind.html)
- [block - temporarily block delivery of events](https://fishshell.com/docs/current/cmds/block.html)
- [break - stop the current inner loop](https://fishshell.com/docs/current/cmds/break.html)
- [breakpoint - launch debug mode](https://fishshell.com/docs/current/cmds/breakpoint.html)
- [builtin - run a builtin command](https://fishshell.com/docs/current/cmds/builtin.html)
- [case - conditionally execute a block of commands](https://fishshell.com/docs/current/cmds/case.html)
- [cd - change directory](https://fishshell.com/docs/current/cmds/cd.html)
- [cdh - change to a recently visited directory](https://fishshell.com/docs/current/cmds/cdh.html)
- [command - run a program](https://fishshell.com/docs/current/cmds/command.html)
- [commandline - set or get the current command line buffer](https://fishshell.com/docs/current/cmds/commandline.html)
- [complete - edit command-specific tab-completions](https://fishshell.com/docs/current/cmds/complete.html)
- [contains - test if a word is present in a list](https://fishshell.com/docs/current/cmds/contains.html)
- [continue - skip the remainder of the current iteration of the current inner loop](https://fishshell.com/docs/current/cmds/continue.html)
- [count - count the number of elements of a list](https://fishshell.com/docs/current/cmds/count.html)
- [dirh - print directory history](https://fishshell.com/docs/current/cmds/dirh.html)
- [dirs - print directory stack](https://fishshell.com/docs/current/cmds/dirs.html)
- [disown - remove a process from the list of jobs](https://fishshell.com/docs/current/cmds/disown.html)
- [echo - display a line of text](https://fishshell.com/docs/current/cmds/echo.html)
- [else - execute command if a condition is not met](https://fishshell.com/docs/current/cmds/else.html)
- [emit - emit a generic event](https://fishshell.com/docs/current/cmds/emit.html)
- [end - end a block of commands](https://fishshell.com/docs/current/cmds/end.html)
- [eval - evaluate the specified commands](https://fishshell.com/docs/current/cmds/eval.html)
- [exec - execute command in current process](https://fishshell.com/docs/current/cmds/exec.html)
- [exit - exit the shell](https://fishshell.com/docs/current/cmds/exit.html)
- [false - return an unsuccessful result](https://fishshell.com/docs/current/cmds/false.html)
- [fg - bring job to foreground](https://fishshell.com/docs/current/cmds/fg.html)
- [fish - the friendly interactive shell](https://fishshell.com/docs/current/cmds/fish.html)
- [fish_add_path - add to the path](https://fishshell.com/docs/current/cmds/fish_add_path.html)
- [fish_breakpoint_prompt - define the prompt when stopped at a breakpoint](https://fishshell.com/docs/current/cmds/fish_breakpoint_prompt.html)
- [fish_clipboard_copy - copy text to the system’s clipboard](https://fishshell.com/docs/current/cmds/fish_clipboard_copy.html)
- [fish_clipboard_paste - get text from the system’s clipboard](https://fishshell.com/docs/current/cmds/fish_clipboard_paste.html)
- [fish_command_not_found - what to do when a command wasn’t found](https://fishshell.com/docs/current/cmds/fish_command_not_found.html)
- [fish_config - start the web-based configuration interface](https://fishshell.com/docs/current/cmds/fish_config.html)
- [fish_default_key_bindings - set emacs key bindings for fish](https://fishshell.com/docs/current/cmds/fish_default_key_bindings.html)
- [fish_delta - compare functions and completions to the default](https://fishshell.com/docs/current/cmds/fish_delta.html)
- [fish_git_prompt - output git information for use in a prompt](https://fishshell.com/docs/current/cmds/fish_git_prompt.html)
- [fish_greeting - display a welcome message in interactive shells](https://fishshell.com/docs/current/cmds/fish_greeting.html)
- [fish_hg_prompt - output Mercurial information for use in a prompt](https://fishshell.com/docs/current/cmds/fish_hg_prompt.html)
- [fish_indent - indenter and prettifier](https://fishshell.com/docs/current/cmds/fish_indent.html)
- [fish_is_root_user - check if the current user is root](https://fishshell.com/docs/current/cmds/fish_is_root_user.html)
- [fish_key_reader - explore what characters keyboard keys send](https://fishshell.com/docs/current/cmds/fish_key_reader.html)
- [fish_mode_prompt - define the appearance of the mode indicator](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html)
- [fish_opt - create an option specification for the argparse command](https://fishshell.com/docs/current/cmds/fish_opt.html)
- [fish_prompt - define the appearance of the command line prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html)
- [fish_right_prompt - define the appearance of the right-side command line prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html)
- [fish_status_to_signal - convert exit codes to human-friendly signals](https://fishshell.com/docs/current/cmds/fish_status_to_signal.html)
- [fish_svn_prompt - output Subversion information for use in a prompt](https://fishshell.com/docs/current/cmds/fish_svn_prompt.html)
- [fish_title - define the terminal’s title](https://fishshell.com/docs/current/cmds/fish_title.html)
- [fish_update_completions - update completions using manual pages](https://fishshell.com/docs/current/cmds/fish_update_completions.html)
- [fish_vcs_prompt - output version control system information for use in a prompt](https://fishshell.com/docs/current/cmds/fish_vcs_prompt.html)
- [fish_vi_key_bindings - set vi key bindings for fish](https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html)
- [for - perform a set of commands multiple times](https://fishshell.com/docs/current/cmds/for.html)
- [funced - edit a function interactively](https://fishshell.com/docs/current/cmds/funced.html)
- [funcsave - save the definition of a function to the user’s autoload directory](https://fishshell.com/docs/current/cmds/funcsave.html)
- [function - create a function](https://fishshell.com/docs/current/cmds/function.html)
- [functions - print or erase functions](https://fishshell.com/docs/current/cmds/functions.html)
- [help - display fish documentation](https://fishshell.com/docs/current/cmds/help.html)
- [history - show and manipulate command history](https://fishshell.com/docs/current/cmds/history.html)
- [if - conditionally execute a command](https://fishshell.com/docs/current/cmds/if.html)
- [isatty - test if a file descriptor is a terminal](https://fishshell.com/docs/current/cmds/isatty.html)
- [jobs - print currently running jobs](https://fishshell.com/docs/current/cmds/jobs.html)
- [math - perform mathematics calculations](https://fishshell.com/docs/current/cmds/math.html)
- [nextd - move forward through directory history](https://fishshell.com/docs/current/cmds/nextd.html)
- [not - negate the exit status of a job](https://fishshell.com/docs/current/cmds/not.html)
- [open - open file in its default application](https://fishshell.com/docs/current/cmds/open.html)
- [or - conditionally execute a command](https://fishshell.com/docs/current/cmds/or.html)
- [path - manipulate and check paths](https://fishshell.com/docs/current/cmds/path.html)
- [popd - move through directory stack](https://fishshell.com/docs/current/cmds/popd.html)
- [prevd - move backward through directory history](https://fishshell.com/docs/current/cmds/prevd.html)
- [printf - display text according to a format string](https://fishshell.com/docs/current/cmds/printf.html)
- [prompt_hostname - print the hostname, shortened for use in the prompt](https://fishshell.com/docs/current/cmds/prompt_hostname.html)
- [prompt_login - describe the login suitable for prompt](https://fishshell.com/docs/current/cmds/prompt_login.html)
- [prompt_pwd - print pwd suitable for prompt](https://fishshell.com/docs/current/cmds/prompt_pwd.html)
- [psub - perform process substitution](https://fishshell.com/docs/current/cmds/psub.html)
- [pushd - push directory to directory stack](https://fishshell.com/docs/current/cmds/pushd.html)
- [pwd - output the current working directory](https://fishshell.com/docs/current/cmds/pwd.html)
- [random - generate random number](https://fishshell.com/docs/current/cmds/random.html)
- [read - read line of input into variables](https://fishshell.com/docs/current/cmds/read.html)
- [realpath - convert a path to an absolute path without symlinks](https://fishshell.com/docs/current/cmds/realpath.html)
- [return - stop the current inner function](https://fishshell.com/docs/current/cmds/return.html)
- [set - display and change shell variables](https://fishshell.com/docs/current/cmds/set.html)
- [set_color - set the terminal color](https://fishshell.com/docs/current/cmds/set_color.html)
- [source - evaluate contents of file](https://fishshell.com/docs/current/cmds/source.html)
- [status - query fish runtime information](https://fishshell.com/docs/current/cmds/status.html)
- [string - manipulate strings](https://fishshell.com/docs/current/cmds/string.html)
- [string-collect - join strings into one](https://fishshell.com/docs/current/cmds/string-collect.html)
- [string-escape - escape special characters](https://fishshell.com/docs/current/cmds/string-escape.html)
- [string-join - join strings with delimiter](https://fishshell.com/docs/current/cmds/string-join.html)
- [string-join0 - join strings with zero bytes](https://fishshell.com/docs/current/cmds/string-join0.html)
- [string-length - print string lengths](https://fishshell.com/docs/current/cmds/string-length.html)
- [string-lower - convert strings to lowercase](https://fishshell.com/docs/current/cmds/string-lower.html)
- [string-match - match substrings](https://fishshell.com/docs/current/cmds/string-match.html)
- [string-pad - pad strings to a fixed width](https://fishshell.com/docs/current/cmds/string-pad.html)
- [string-repeat - multiply a string](https://fishshell.com/docs/current/cmds/string-repeat.html)
- [string-replace - replace substrings](https://fishshell.com/docs/current/cmds/string-replace.html)
- [string-shorten - shorten strings to a width, with an ellipsis](https://fishshell.com/docs/current/cmds/string-shorten.html)
- [string-split - split strings by delimiter](https://fishshell.com/docs/current/cmds/string-split.html)
- [string-split0 - split on zero bytes](https://fishshell.com/docs/current/cmds/string-split0.html)
- [string-sub - extract substrings](https://fishshell.com/docs/current/cmds/string-sub.html)
- [string-trim - remove trailing whitespace](https://fishshell.com/docs/current/cmds/string-trim.html)
- [string-unescape - expand escape sequences](https://fishshell.com/docs/current/cmds/string-unescape.html)
- [string-upper - convert strings to uppercase](https://fishshell.com/docs/current/cmds/string-upper.html)
- [suspend - suspend the current shell](https://fishshell.com/docs/current/cmds/suspend.html)
- [switch - conditionally execute a block of commands](https://fishshell.com/docs/current/cmds/switch.html)
- [test - perform tests on files and text](https://fishshell.com/docs/current/cmds/test.html)
- [time - measure how long a command or block takes](https://fishshell.com/docs/current/cmds/time.html)
- [trap - perform an action when the shell receives a signal](https://fishshell.com/docs/current/cmds/trap.html)
- [true - return a successful result](https://fishshell.com/docs/current/cmds/true.html)
- [type - locate a command and describe its type](https://fishshell.com/docs/current/cmds/type.html)
- [ulimit - set or get resource usage limits](https://fishshell.com/docs/current/cmds/ulimit.html)
- [umask - set or get the file creation mode mask](https://fishshell.com/docs/current/cmds/umask.html)
- [vared - interactively edit the value of an environment variable](https://fishshell.com/docs/current/cmds/vared.html)
- [wait - wait for jobs to complete](https://fishshell.com/docs/current/cmds/wait.html)
- [while - perform a set of commands multiple times](https://fishshell.com/docs/current/cmds/while.html)