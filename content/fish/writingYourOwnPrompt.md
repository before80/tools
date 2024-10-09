+++
title = "Writing your own prompt"
date = 2024-10-09T13:37:26+08:00
type = "docs"
weight = 20
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://fishshell.com/docs/current/prompt.html](https://fishshell.com/docs/current/prompt.html)

# Writing your own prompt

Fish ships a number of prompts that you can view with the [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html) command, and many users have shared their prompts online.

However, you can also write your own, or adjust an existing prompt. This is a good way to get used to fish’s [scripting language](https://fishshell.com/docs/current/language.html).

Unlike other shells, fish’s prompt is built by running a function - [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html). Or, more specifically, three functions:

- [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html), which is the main prompt function
- [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html), which is shown on the right side of the terminal.
- [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html), which is shown if [vi-mode](https://fishshell.com/docs/current/interactive.html#vi-mode) is used.

These functions are run, and whatever they print is displayed as the prompt (minus one trailing newline).

Here, we will just be writing a simple fish_prompt.

## Our first prompt

Let’s look at a very simple example:

```
function fish_prompt
    echo $PWD '>'
end

```

This prints the current working directory ([`PWD`](https://fishshell.com/docs/current/language.html#envvar-PWD)) and a `>` symbol to show where the prompt ends. The `>` is [quoted](https://fishshell.com/docs/current/language.html#quotes) because otherwise it would signify a [redirection](https://fishshell.com/docs/current/language.html#redirects).

Because we’ve used [echo](https://fishshell.com/docs/current/cmds/echo.html), it adds spaces between the two so it ends up looking like (assuming `_` is your cursor):

```
/home/tutorial >_
```

## Formatting

`echo` adds spaces between its arguments. If you don’t want those, you can use [string join](https://fishshell.com/docs/current/cmds/string-join.html) like this:

```
function fish_prompt
    string join '' -- $PWD '>'
end

```

The `--` indicates to `string` that no options can come after it, in case we extend this with something that can start with a `-`.

There are other ways to remove the space, including `echo -s` and [printf](https://fishshell.com/docs/current/cmds/printf.html).

## Adding colo(u)r

This prompt is functional, but a bit boring. We could add some color.

Fortunately, fish offers the [set_color](https://fishshell.com/docs/current/cmds/set_color.html) command, so you can do:

```
echo (set_color red)foo

```

`set_color` can also handle RGB colors like `set_color 23b455`, and other formatting options including bold and italics.

So, taking our previous prompt and adding some color:

```
function fish_prompt
    string join '' -- (set_color green) $PWD (set_color normal) '>'
end

```

A “normal” color tells the terminal to go back to its normal formatting options.

What `set_color` does internally is to print an escape sequence that tells the terminal to change color. So if you see something like:

```
echo \e\[31mfoo

```

that could just be `set_color red`.

## Shortening the working directory

This is fine, but our [`PWD`](https://fishshell.com/docs/current/language.html#envvar-PWD) can be a bit long, and we are typically only interested in the last few directories. We can shorten this with the [prompt_pwd](https://fishshell.com/docs/current/cmds/prompt_pwd.html) helper that will give us a shortened working directory:

```
function fish_prompt
    string join '' -- (set_color green) (prompt_pwd) (set_color normal) '>'
end

```

`prompt_pwd` takes options to control how much to shorten. For instance, if we want to display the last two directories, we’d use `prompt_pwd --full-length-dirs 2`:

```
function fish_prompt
    string join '' -- (set_color green) (prompt_pwd --full-length-dirs 2) (set_color normal) '>'
end

```

With a current directory of “/home/tutorial/Music/Lena Raine/Oneknowing”, this would print

```
~/M/Lena Raine/Oneknowing>_
```

## Status

One important bit of information that every command returns is the [status](https://fishshell.com/docs/current/language.html#variables-status). This is a whole number from 0 to 255, and usually it is used as an error code - 0 if the command returned successfully, or a number from 1 to 255 if not.

It’s useful to display this in your prompt, but showing it when it’s 0 seems kind of wasteful.

First of all, since every command (except for [set](https://fishshell.com/docs/current/cmds/set.html)) changes the status, you need to store it for later use as the first thing in your prompt. Use a [local variable](https://fishshell.com/docs/current/language.html#variables-scope) so it will be confined to your prompt function:

```
set -l last_status $status

```

And after that, you can set a string if it not zero:

```
# Prompt status only if it's not 0
set -l stat
if test $last_status -ne 0
    set stat (set_color red)"[$last_status]"(set_color normal)
end

```

And to print it, we add it to our `string join`:

```
string join '' -- (set_color green) (prompt_pwd) (set_color normal) $stat '>'

```

If `$last_status` was 0, `$stat` is empty, and so it will simply disappear.

So our entire prompt is now:

```
function fish_prompt
    set -l last_status $status
    # Prompt status only if it's not 0
    set -l stat
    if test $last_status -ne 0
        set stat (set_color red)"[$last_status]"(set_color normal)
    end

    string join '' -- (set_color green) (prompt_pwd) (set_color normal) $stat '>'
end

```

And it looks like:

```
~/M/L/Oneknowing[1]>_
```

after we run `false` (which returns 1).

## Where to go from here?

We have now built a simple but working and usable prompt, but of course more can be done.

- Fish offers more helper functions: - `prompt_login` to describe the user/hostname/container or `prompt_hostname` to describe just the host - `fish_is_root_user` to help with changing the symbol for root. - `fish_vcs_prompt` to show version control information (or `fish_git_prompt` / `fish_hg_prompt` / `fish_svn_prompt` to limit it to specific systems)
- You can add a right prompt by changing [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) or a vi-mode prompt by changing [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html).
- Some prompts have interesting or advanced features - Add the time when the prompt was printed - Show various integrations like python’s venv - Color the parts differently.

You can look at fish’s sample prompts for inspiration. Open up [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html), find one you like and pick it. For example:

```
fish_config prompt show # <- shows all the sample prompts
fish_config prompt choose disco # <- this picks the "disco" prompt for this session
funced fish_prompt # <- opens fish_prompt in your editor, and reloads it once the editor exits
```

