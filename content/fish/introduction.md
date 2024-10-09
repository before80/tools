+++
title = "Introduction"
date = 2024-10-09T13:37:26+08:00
type = "docs"
weight = 20
description = ""
isCJKLanguage = true
draft = false

+++

> 原文：[https://fishshell.com/docs/current/index.html](https://fishshell.com/docs/current/index.html)

This is the documentation for **fish**, the **f**riendly **i**nteractive **sh**ell.

​	这是 **fish** (友好的交互式 shell) 的文档。

A shell is a program that helps you operate your computer by starting other programs. fish offers a command-line interface focused on usability and interactive use.

​	Shell 是一个通过启动其他程序来帮助你操作计算机的程序。fish 提供了一个专注于可用性和交互性的命令行界面。

Some of the special features of fish are:

​	fish 的一些特色功能包括：

- **Extensive UI**: [Syntax highlighting](https://fishshell.com/docs/current/interactive.html#color), [Autosuggestions](https://fishshell.com/docs/current/interactive.html#autosuggestions), [tab completion](https://fishshell.com/docs/current/interactive.html#tab-completion) and selection lists that can be navigated and filtered.
- **丰富的用户界面**：[语法高亮](https://fishshell.com/docs/current/interactive.html#color)、[自动建议](https://fishshell.com/docs/current/interactive.html#autosuggestions)、[Tab 键补全](https://fishshell.com/docs/current/interactive.html#tab-completion) 和可以导航及筛选的选择列表。
- **No configuration needed**: fish is designed to be ready to use immediately, without requiring extensive configuration.
- **无需配置**：fish 旨在开箱即用，不需要复杂的配置。
- **Easy scripting**: New [functions](https://fishshell.com/docs/current/language.html#syntax-function) can be added on the fly. The syntax is easy to learn and use.
- **简单的脚本编写**：可以即时添加新的[函数](https://fishshell.com/docs/current/language.html#syntax-function)。其语法易于学习和使用。

This page explains how to install and set up fish and where to get more information.

​	本页面解释了如何安装和设置 fish 以及获取更多信息的途径。

## Where to go?

If this is your first time using fish, see the [tutorial](https://fishshell.com/docs/current/tutorial.html#tutorial).

​	如果这是你第一次使用 fish，请查看 [教程](https://fishshell.com/docs/current/tutorial.html#tutorial)。

If you are already familiar with other shells like bash and want to see the scripting differences, see [Fish For Bash Users](https://fishshell.com/docs/current/fish_for_bash_users.html#fish-for-bash-users).

​	如果你已经熟悉其他 Shell（如 bash），并希望了解脚本语法的不同之处，请查看 [Bash 用户的 fish 指南](https://fishshell.com/docs/current/fish_for_bash_users.html#fish-for-bash-users)。

For a comprehensive overview of fish’s scripting language, see [The Fish Language](https://fishshell.com/docs/current/language.html#language).

​	如果你需要 fish 脚本语言的综合概述，请参阅 [fish 语言](https://fishshell.com/docs/current/language.html#language)。

For information on using fish interactively, see [Interactive use](https://fishshell.com/docs/current/interactive.html#interactive).

​	如果你想了解如何交互使用 fish，请查看 [交互使用](https://fishshell.com/docs/current/interactive.html#interactive)。

If you need to install fish first, read on, the rest of this document will tell you how to get, install and configure fish.

​	如果你还未安装 fish，请继续阅读，本文的其余部分将告诉你如何获取、安装和配置 fish。

## 安装 Installation

This section describes how to install, uninstall, start, and exit **fish**. It also explains how to make fish the default shell.

​	本节描述了如何安装、卸载、启动和退出 **fish**，还说明了如何将 fish 设置为默认的 Shell。

### 安装 Installation

Up-to-date instructions for installing the latest version of fish are on the [fish homepage](https://fishshell.com/).

​	有关安装最新版本的 fish 的详细说明，请参见 [fish 官方主页](https://fishshell.com/)。

To install the development version of fish, see the instructions on the [project’s GitHub page](https://github.com/fish-shell/fish-shell).

​	若需安装开发版的 fish，请参见项目 [GitHub 页面](https://github.com/fish-shell/fish-shell)上的说明。

### 启动与退出 Starting and Exiting

Once fish has been installed, open a terminal. If fish is not the default shell:

​	安装 fish 后，打开一个终端。如果 fish 不是默认的 shell：

- Type **fish** to start a shell: 输入 **fish** 来启动 shell：

  ```
  > fish
  ```
  
- Type **exit** to end the session: 输入 **exit** 来结束会话：

  ```
  > exit
  ```



### 默认 Shell - Default Shell

There are multiple ways to switch to fish (or any other shell) as your default.

​	切换到 fish（或其他 shell）作为默认 Shell 的方法有多种。

The simplest method is to set your terminal emulator (eg GNOME Terminal, Apple’s Terminal.app, or Konsole) to start fish directly. See its configuration and set the program to start to `/usr/local/bin/fish` (if that’s where fish is installed - substitute another location as appropriate).

​	最简单的方法是将你的终端模拟器（如 GNOME Terminal、Apple 的 Terminal.app 或 Konsole）配置为直接启动 fish。查看其配置，并将启动的程序设置为 `/usr/local/bin/fish`（如果 fish 安装在该位置 - 请根据实际情况替换路径）。

Alternatively, you can set fish as your login shell so that it will be started by all terminal logins, including SSH.

​	或者，你可以将 fish 设置为登录 shell，以便所有终端登录（包括 SSH）都启动它。

> Warning 
>
> Setting fish as your login shell may cause issues, such as an incorrect [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH). Some operating systems, including a number of Linux distributions, require the login shell to be Bourne-compatible and to read configuration from `/etc/profile`. fish may not be suitable as a login shell on these systems.
>
> **警告**：将 fish 设置为登录 shell 可能会导致一些问题，例如 `PATH` 路径配置错误。某些操作系统（包括一些 Linux 发行版）要求登录 shell 与 Bourne 兼容，并从 `/etc/profile` 中读取配置。在这些系统上，fish 可能不适合作为登录 shell。

To change your login shell to fish:

​	要将登录 shell 更改为 fish：

1. Add the shell to `/etc/shells` with: 使用以下命令将 shell 添加到 `/etc/shells`：

   ```
   > echo /usr/local/bin/fish | sudo tee -a /etc/shells
   ```
   
2. Change your default shell with: 使用以下命令更改默认 Shell：

   ```
   > chsh -s /usr/local/bin/fish
   ```

Again, substitute the path to fish for `/usr/local/bin/fish` - see `command -s fish` inside fish. To change it back to another shell, just substitute `/usr/local/bin/fish` with `/bin/bash`, `/bin/tcsh` or `/bin/zsh` as appropriate in the steps above.

​	再次确认 `/usr/local/bin/fish` 是 fish 所在路径 - 可在 fish 中使用 `command -s fish` 来查看路径。要将默认 Shell 更改回其他 Shell，请在上述步骤中将 `/usr/local/bin/fish` 替换为 `/bin/bash`、`/bin/tcsh` 或 `/bin/zsh`。

### 卸载 Uninstalling

For uninstalling fish: see [FAQ: Uninstalling fish](https://fishshell.com/docs/current/faq.html#faq-uninstalling).

​	有关卸载 fish 的说明，请参阅 [FAQ：卸载 fish](https://fishshell.com/docs/current/faq.html#faq-uninstalling)。

### Shebang Line

Because shell scripts are written in many different languages, they need to carry information about which interpreter should be used to execute them. For this, they are expected to have a first line, the shebang line, which names the interpreter executable.

​	由于 Shell 脚本使用多种语言编写，因此它们需要携带关于应使用哪个解释器来执行它们的信息。为此，脚本通常在第一行使用 Shebang 行来指定解释器可执行文件。

A script written in **bash** would need a first line like this:

​	使用 **bash** 编写的脚本需要以下第一行：

```
#!/bin/bash
```

When the shell tells the kernel to execute the file, it will use the interpreter `/bin/bash`.

​	当 Shell 告诉内核执行该文件时，将使用 `/bin/bash` 作为解释器。

For a script written in another language, just replace `/bin/bash` with the interpreter for that language. For example: `/usr/bin/python` for a python script, or `/usr/local/bin/fish` for a fish script, if that is where you have them installed.

​	对于使用其他语言编写的脚本，只需将 `/bin/bash` 替换为该语言的解释器路径即可。例如，Python 脚本可以使用 `/usr/bin/python`，而 fish 脚本可以使用 `/usr/local/bin/fish`（如果你将 fish 安装在该路径）。

If you want to share your script with others, you might want to use **env** to allow for the interpreter to be installed in other locations. For example:

​	如果你想与他人共享你的脚本，建议使用 **env** 来允许解释器安装在其他位置。例如：

```
#!/usr/bin/env fish
echo Hello from fish $version
```

This will call `env`, which then goes through [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) to find a program called “fish”. This makes it work, whether fish is installed in (for example) `/usr/local/bin/fish`, `/usr/bin/fish`, or `~/.local/bin/fish`, as long as that directory is in [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH).

​	这将调用 `env`，其会遍历 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) 来查找名为 “fish” 的程序。这样做可以在 fish 安装在 `/usr/local/bin/fish`、`/usr/bin/fish` 或 `~/.local/bin/fish`（只要该目录位于 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) 中）时都能正常工作。

The shebang line is only used when scripts are executed without specifying the interpreter. For functions inside fish or when executing a script with `fish /path/to/script`, a shebang is not required (but it doesn’t hurt!).

​	Shebang 行仅在脚本执行时未指定解释器时使用。对于 fish 内部的函数或使用 `fish /path/to/script` 执行脚本时，不需要 Shebang（但保留它也无妨）。

When executing files without an interpreter, fish, like other shells, tries your system shell, typically `/bin/sh`. This is needed because some scripts are shipped without a shebang line.

​	在没有指定解释器的情况下执行文件时，fish 和其他 shell 一样，会尝试使用系统 shell（通常是 `/bin/sh`）。这在某些没有 Shebang 行的脚本中是必须的。

## 配置 Configuration

To store configuration write it to a file called `~/.config/fish/config.fish`.

​	要保存配置，将其写入 `~/.config/fish/config.fish` 文件。

`.fish` scripts in `~/.config/fish/conf.d/` are also automatically executed before `config.fish`.

​	`~/.config/fish/conf.d/` 中的 `.fish` 脚本也会在 `config.fish` 之前自动执行。

These files are read on the startup of every shell, whether interactive and/or if they’re login shells. Use `status --is-interactive` and `status --is-login` to do things only in interactive/login shells, respectively.

​	这些文件会在每个 Shell 启动时（无论是交互式还是登录 shell）被读取。使用 `status --is-interactive` 和 `status --is-login` 分别在交互式 / 登录 shell 中执行特定操作。

This is the short version; for a full explanation, like for sysadmins or integration for developers of other software, see [Configuration files](https://fishshell.com/docs/current/language.html#configuration).

​	这只是一个简短的说明；有关更详细的解释（如系统管理员或其他软件开发人员的集成），请参见 [配置文件](https://fishshell.com/docs/current/language.html#configuration)。

If you want to see what you changed over fish’s defaults, see [fish_delta](https://fishshell.com/docs/current/cmds/fish_delta.html).

​	如果你想查看与 fish 默认值的不同配置，请查看 [fish_delta](https://fishshell.com/docs/current/cmds/fish_delta.html)。

### Examples:

To add `~/linux/bin` to PATH variable when using a login shell, add this to `~/.config/fish/config.fish` file:

​	要在登录 shell 中将 `~/linux/bin` 添加到 PATH 变量，请将以下内容添加到 `~/.config/fish/config.fish` 文件中：

```
if status --is-login
    set -gx PATH $PATH ~/linux/bin
end
```

This is just an example; using [fish_add_path](https://fishshell.com/docs/current/cmds/fish_add_path.html) e.g. `fish_add_path ~/linux/bin` which only adds the path if it isn’t included yet is easier.

​	这只是一个例子；使用 [fish_add_path](https://fishshell.com/docs/current/cmds/fish_add_path.html)，例如 `fish_add_path ~/linux/bin`，它只会在路径未包含时添加该路径，更加方便。

To run commands on exit, use an [event handler](https://fishshell.com/docs/current/language.html#event) that is triggered by the exit of the shell:

​	要在退出时运行命令，请使用由 Shell 退出触发的 [事件处理器](https://fishshell.com/docs/current/language.html#event)：

```
function on_exit --on-event fish_exit
    echo fish is now exiting
end
```



## Resources

- The [GitHub page](https://github.com/fish-shell/fish-shell/)
- The official [Gitter channel](https://gitter.im/fish-shell/fish-shell)
- The official mailing list at [fish-users@lists.sourceforge.net](https://lists.sourceforge.net/lists/listinfo/fish-users)

If you have an improvement for fish, you can submit it via the GitHub page.

​	如果你对 fish 有改进建议，可以通过 GitHub 页面提交。