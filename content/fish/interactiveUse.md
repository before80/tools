+++
title = "交互使用"
date = 2024-10-09T13:37:26+08:00
type = "docs"
weight = 20
description = ""
isCJKLanguage = true
draft = false

+++

> 原文：[https://fishshell.com/docs/current/interactive.html](https://fishshell.com/docs/current/interactive.html)

# Interactive use

Fish prides itself on being really nice to use interactively. That’s down to a few features we’ll explain in the next few sections.

​	Fish 以其良好的交互体验而著称。接下来的几个部分将介绍一些关键功能。

Fish is used by giving commands in the fish language, see [The Fish Language](https://fishshell.com/docs/current/language.html#language) for information on that.

​	Fish 使用 fish 语言执行命令，有关详细信息，请参阅 [Fish 语言](https://fishshell.com/docs/current/language.html#language)。

## 帮助 Help

Fish has an extensive help system. Use the [help](https://fishshell.com/docs/current/cmds/help.html) command to obtain help on a specific subject or command. For instance, writing `help syntax` displays the [syntax section](https://fishshell.com/docs/current/language.html#syntax) of this documentation.

​	Fish 提供了广泛的帮助系统。使用 [help](https://fishshell.com/docs/current/cmds/help.html) 命令可以获得有关特定主题或命令的帮助。例如，输入 `help syntax` 会显示此文档的 [语法部分](https://fishshell.com/docs/current/language.html#syntax)。

Fish also has man pages for its commands, and translates the help pages to man pages. For example, `man set` will show the documentation for `set` as a man page.

​	Fish 的命令也有手册页，并且帮助页面会翻译成手册页。例如，`man set` 会以手册页形式显示 `set` 命令的文档。

Help on a specific builtin can also be obtained with the `-h` parameter. For instance, to obtain help on the [fg](https://fishshell.com/docs/current/cmds/fg.html) builtin, either type `fg -h` or `help fg`.

​	你还可以通过 `-h` 参数获取特定内置命令的帮助。例如，获取 [fg](https://fishshell.com/docs/current/cmds/fg.html) 内置命令的帮助，可以输入 `fg -h` 或 `help fg`。

The main page can be viewed via `help index` (or just `help`) or `man fish-doc`. The tutorial can be viewed with `help tutorial` or `man fish-tutorial`.

​	主页面可以通过 `help index`（或仅输入 `help`）或 `man fish-doc` 查看。教程可通过 `help tutorial` 或 `man fish-tutorial` 查看。



## 自动建议 Autosuggestions

fish suggests commands as you type, based on [command history](https://fishshell.com/docs/current/interactive.html#history-search), completions, and valid file paths. As you type commands, you will see a suggestion offered after the cursor, in a muted gray color (which can be changed with the `fish_color_autosuggestion` variable).

​	Fish 会根据 [命令历史](https://fishshell.com/docs/current/interactive.html#history-search)、完成项和有效文件路径，在你输入时建议命令。输入命令时，你会看到光标后面出现一个灰色的建议（可以通过 `fish_color_autosuggestion` 变量修改颜色）。

To accept the autosuggestion (replacing the command line contents), press → or Control+F. To accept the first suggested word, press Alt+→ or Alt+F. If the autosuggestion is not what you want, just ignore it: it won’t execute unless you accept it.

​	要接受自动建议（替换当前命令行的内容），按 → 或 Control+F。要接受第一个建议的单词，按 Alt+→ 或 Alt+F。如果自动建议不是你想要的，只需忽略它：除非你接受，否则不会执行。

Autosuggestions are a powerful way to quickly summon frequently entered commands, by typing the first few characters. They are also an efficient technique for navigating through directory hierarchies.

​	自动建议是快速调用经常输入的命令的强大方式，只需输入前几个字符即可。它们也是高效的目录导航技术。

If you don’t like autosuggestions, you can disable them by setting `$fish_autosuggestion_enabled` to 0:

​	如果你不喜欢自动建议，可以通过将 `$fish_autosuggestion_enabled` 设置为 0 来禁用它：

```
set -g fish_autosuggestion_enabled 0

```



## Tab 补全 Tab Completion

Tab completion is a time saving feature of any modern shell. When you type Tab, fish tries to guess the rest of the word under the cursor. If it finds just one possibility, it inserts it. If it finds more, it inserts the longest unambiguous part and then opens a menu (the “pager”) that you can navigate to find what you’re looking for.

​	Tab 补全是任何现代 shell 的节省时间功能。当你按下 Tab 键时，Fish 会尝试猜测光标下单词的其余部分。如果只找到一个可能性，它将自动插入。如果找到多个，Fish 会插入最长的不明确部分，然后打开一个菜单（称为“分页器”），你可以导航来找到所需内容。

The pager can be navigated with the arrow keys, Page Up / Page Down, Tab or Shift+Tab. Pressing Control+S (the `pager-toggle-search` binding - / in vi-mode) opens up a search menu that you can use to filter the list.

​	分页器可以通过方向键、Page Up / Page Down、Tab 或 Shift+Tab 导航。按 Control+S（即 `pager-toggle-search` 绑定 - vi 模式下为 `/`）可以打开搜索菜单，供你过滤列表。

Fish provides some general purpose completions, like for commands, variable names, usernames or files.

​	Fish 提供了一些通用的补全功能，例如命令、变量名、用户名或文件的补全。

It also provides a large number of program specific scripted completions. Most of these completions are simple options like the `-l` option for `ls`, but a lot are more advanced. For example:

​	它还提供了大量特定程序的脚本补全。大多数补全项是简单的选项，比如 `ls` 的 `-l` 选项，但有些补全项更为高级。例如：

- `man` and `whatis` show the installed manual pages as completions. `man` 和 `whatis` 显示已安装的手册页作为补全项。

- `make` uses targets in the Makefile in the current directory as completions. `make` 使用当前目录中的 Makefile 目标作为补全项。
- `mount` uses mount points specified in fstab as completions. `mount` 使用 fstab 中指定的挂载点作为补全项。
- `apt`, `rpm` and `yum` show installed or installable packages `apt`、`rpm` 和 `yum` 显示已安装或可安装的软件包。

You can also write your own completions or install some you got from someone else. For that, see [Writing your own completions](https://fishshell.com/docs/current/completions.html#completion-own).

​	你也可以编写自己的补全脚本或安装他人的补全脚本。有关这方面的更多信息，请参阅 [编写你自己的补全项](https://fishshell.com/docs/current/completions.html#completion-own)。

Completion scripts are loaded on demand, just like [functions are](https://fishshell.com/docs/current/language.html#syntax-function-autoloading). The difference is the `$fish_complete_path` [list](https://fishshell.com/docs/current/language.html#variables-lists) is used instead of `$fish_function_path`. Typically you can drop new completions in ~/.config/fish/completions/name-of-command.fish and fish will find them automatically.

​	补全脚本按需加载，就像 [函数](https://fishshell.com/docs/current/language.html#syntax-function-autoloading) 一样。区别在于，使用 `$fish_complete_path` [列表](https://fishshell.com/docs/current/language.html#variables-lists) 而不是 `$fish_function_path`。通常，你可以将新的补全脚本放在 `~/.config/fish/completions/name-of-command.fish`，Fish 会自动找到它们。



## 语法高亮 Syntax highlighting

Fish interprets the command line as it is typed and uses syntax highlighting to provide feedback. The most important feedback is the detection of potential errors. By default, errors are marked red.

​	Fish 会在输入时解释命令行，并通过语法高亮提供反馈。最重要的反馈是检测潜在的错误。默认情况下，错误会被标记为红色。

Detected errors include:

​	检测到的错误包括：

- Non-existing commands. 不存在的命令。

- Reading from or appending to a non-existing file. 从不存在的文件读取或向其追加内容。
- Incorrect use of output redirects 不正确的输出重定向。
- Mismatched parenthesis 括号不匹配。

To customize the syntax highlighting, you can set the environment variables listed in the [Variables for changing highlighting colors](https://fishshell.com/docs/current/interactive.html#variables-color) section.

​	要自定义语法高亮，可以设置 [语法高亮颜色变量](https://fishshell.com/docs/current/interactive.html#variables-color) 中列出的环境变量。

Fish also provides pre-made color themes you can pick with [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html). Running just `fish_config` opens a browser interface, or you can use `fish_config theme` in the terminal.

​	Fish 还提供了一些预设的配色主题，你可以使用 [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html) 选择。仅运行 `fish_config` 会打开一个浏览器界面，或者你可以在终端中使用 `fish_config theme`。

For example, to disable nearly all coloring:

​	例如，要禁用几乎所有颜色：

```
fish_config theme choose none

```

Or, to see all themes, right in your terminal:

​	或者，在终端中查看所有主题：

```
fish_config theme show

```



### 语法高亮变量 Syntax highlighting variables

The colors used by fish for syntax highlighting can be configured by changing the values of various variables. The value of these variables can be one of the colors accepted by the [set_color](https://fishshell.com/docs/current/cmds/set_color.html) command. The modifier switches accepted by `set_color` like `--bold`, `--dim`, `--italics`, `--reverse` and `--underline` are also accepted.

​	Fish 用于语法高亮的颜色可以通过更改各种变量的值来配置。这些变量的值可以是 [set_color](https://fishshell.com/docs/current/cmds/set_color.html) 命令接受的颜色。`set_color` 接受的修饰符（如 `--bold`、`--dim`、`--italics`、`--reverse` 和 `--underline`）也同样适用。

Example: to make errors highlighted and red, use:

​	示例：要将错误高亮为粗体红色，请使用：

```
set fish_color_error red --bold

```

The following variables are available to change the highlighting colors in fish:

​	以下变量可用于更改 Fish 的高亮颜色：

| Variable                   | Meaning                                                      |
| -------------------------- | ------------------------------------------------------------ |
| fish_color_normal          | default color 默认颜色                                       |
| fish_color_command         | commands like echo 像 `echo` 这样的命令                      |
| fish_color_keyword         | keywords like if - this falls back on the command color if unset 像 `if` 这样的关键字 - 如果未设置，则回退到命令颜色 |
| fish_color_quote           | quoted text like `"abc"` 引号中的文本，例如 `"abc"`          |
| fish_color_redirection     | IO redirections like >/dev/null IO 重定向，例如 `>/dev/null` |
| fish_color_end             | process separators like `;` and `&` 进程分隔符，如 `;` 和 `&` |
| fish_color_error           | syntax errors 语法错误                                       |
| fish_color_param           | ordinary command parameters 普通命令参数                     |
| fish_color_valid_path      | parameters that are filenames (if the file exists) 文件名参数（如果文件存在） |
| fish_color_option          | options starting with “-”, up to the first “--” parameter 以“-”开头的选项，直到第一个 “--” 参数 |
| fish_color_comment         | comments like ‘# important’ 注释，如 `# 重要`                |
| fish_color_selection       | selected text in vi visual mode vi 可视模式下选中文本的颜色  |
| fish_color_operator        | parameter expansion operators like `*` and `~` 参数扩展运算符，如 `*` 和 `~` |
| fish_color_escape          | character escapes like `\n` and `\x70` 字符转义，如 `\n` 和 `\x70` |
| fish_color_autosuggestion  | autosuggestions (the proposed rest of a command) 自动建议（建议的命令剩余部分） |
| fish_color_cwd             | the current working directory in the default prompt 默认提示符中当前工作目录 |
| fish_color_cwd_root        | the current working directory in the default prompt for the root user 以 root 用户身份运行时，默认提示符中的当前工作目录 |
| fish_color_user            | the username in the default prompt 默认提示符中的用户名      |
| fish_color_host            | the hostname in the default prompt 默认提示符中的主机名      |
| fish_color_host_remote     | the hostname in the default prompt for remote sessions (like ssh) 远程会话中的主机名（例如 ssh） |
| fish_color_status          | the last command’s nonzero exit code in the default prompt 默认提示符中上一条命令的非零退出代码 |
| fish_color_cancel          | the ‘^C’ indicator on a canceled command 取消命令时的 `^C` 指示符 |
| fish_color_search_match    | history search matches and selected pager items (background only) 历史搜索匹配项和选中的分页器项（仅背景） |
| fish_color_history_current | the current position in the history for commands like `dirh` and `cdh` `dirh` 和 `cdh` 命令中历史的当前位置 |

If a variable isn’t set or is empty, fish usually tries `$fish_color_normal`, except for:

​	如果某个变量没有设置或为空，Fish 通常会尝试使用 `$fish_color_normal`，除了：

- `$fish_color_keyword`, where it tries `$fish_color_command` first. `$fish_color_keyword`，它首先尝试 `$fish_color_command`。

- `$fish_color_option`, where it tries `$fish_color_param` first. `$fish_color_option`，它首先尝试 `$fish_color_param`。
- For `$fish_color_valid_path`, if that doesn’t have a color, but only modifiers, it adds those to the color that would otherwise be used, like `$fish_color_param`. But if valid paths have a color, it uses that and adds in modifiers from the other color.
- 对于 `$fish_color_valid_path`，如果该变量没有颜色，但只有修饰符，它会将这些修饰符添加到将使用的其他颜色上，例如 `$fish_color_param`。但如果有效路径有颜色，则使用该颜色，并从其他颜色中添加修饰符。



### 分页器颜色变量 Pager color variables

fish will sometimes present a list of choices in a table, called the pager.

​	Fish 有时会在表格中呈现一个选择列表，称为分页器。

Example: to set the background of each pager row, use:

​	示例：要设置每一行的分页器背景颜色，可以使用：

```
set fish_pager_color_background --background=white

```

To have black text on alternating white and gray backgrounds:

​	要在白色和灰色背景上显示黑色文字：

```
set fish_pager_color_prefix black
set fish_pager_color_completion black
set fish_pager_color_description black
set fish_pager_color_background --background=white
set fish_pager_color_secondary_background --background=brwhite

```

Variables affecting the pager cors:

​	影响分页器颜色的变量如下：

| Variable                               | Meaning                                                      |
| -------------------------------------- | ------------------------------------------------------------ |
| fish_pager_color_progress              | the progress bar at the bottom left corner 左下角进度条的颜色 |
| fish_pager_color_background            | the background color of a line 行的背景颜色                  |
| fish_pager_color_prefix                | the prefix string, i.e. the string that is to be completed 前缀字符串，即要补全的字符串 |
| fish_pager_color_completion            | the completion itself, i.e. the proposed rest of the string 补全本身，即字符串的建议部分 |
| fish_pager_color_description           | the completion description 补全描述                          |
| fish_pager_color_selected_background   | background of the selected completion 选中补全项的背景       |
| fish_pager_color_selected_prefix       | prefix of the selected completion 选中补全项的前缀           |
| fish_pager_color_selected_completion   | suffix of the selected completion 选中补全项的后缀           |
| fish_pager_color_selected_description  | description of the selected completion 选中补全项的描述      |
| fish_pager_color_secondary_background  | background of every second unselected completion 每第二个未选中补全项的背景 |
| fish_pager_color_secondary_prefix      | prefix of every second unselected completion 每第二个未选中补全项的前缀 |
| fish_pager_color_secondary_completion  | suffix of every second unselected completion 每第二个未选中补全项的后缀 |
| fish_pager_color_secondary_description | description of every second unselected completion 每第二个未选中补全项的描述 |

When the secondary or selected variables aren’t set or are empty, the normal variables are used, except for `$fish_pager_color_selected_background`, where the background of `$fish_color_search_match` is tried first.

​	当未设置或为空时，Fish 会使用正常变量，除了 `$fish_pager_color_selected_background`，它首先尝试使用 `$fish_color_search_match` 的背景。



## 缩写 Abbreviations

To avoid needless typing, a frequently-run command like `git checkout` can be abbreviated to `gco` using the [abbr](https://fishshell.com/docs/current/cmds/abbr.html) command.

​	为了减少不必要的输入，可以使用 [abbr](https://fishshell.com/docs/current/cmds/abbr.html) 命令将常用命令缩写。例如，可以将 `git checkout` 缩写为 `gco`：

```
abbr -a gco git checkout

```

After entering `gco` and pressing Space or Enter, a `gco` in command position will turn into `git checkout` in the command line. If you want to use a literal `gco` sometimes, use Control+Space [[1\]](https://fishshell.com/docs/current/interactive.html#id5).

​	输入 `gco` 后，按下空格或回车键，命令行中的 `gco` 会自动变成 `git checkout`。如果你有时想使用字面上的 `gco`，可以按 Control+空格 [[1\]](https://fishshell.com/docs/current/interactive.html#id5)。

This is a lot more powerful, for example you can make going up a number of directories easier with this:

​	这个功能非常强大，例如，你可以通过以下方式简化回到多个目录的操作：

```
function multicd
    echo cd (string repeat -n (math (string length -- $argv[1]) - 1) ../)
end
abbr --add dotdot --regex '^\.\.+$' --function multicd

```

Now, `..` transforms to `cd ../`, while `...` turns into `cd ../../` and `....` expands to `cd ../../../`.

​	现在，输入 `..` 会转换为 `cd ../`，而 `...` 会变成 `cd ../../`，`....` 会扩展为 `cd ../../../`。

The advantage over aliases is that you can see the actual command before using it, add to it or change it, and the actual command will be stored in history.

​	与别名的优势在于，你可以在使用前看到实际命令，可以对其进行修改或添加，且实际命令会被记录到历史中。

[[1](https://fishshell.com/docs/current/interactive.html#id4)] 

Any binding that executes the `expand-abbr` or `execute` [bind function](https://fishshell.com/docs/current/cmds/bind.html) will expand abbreviations. By default Control+Space is bound to just inserting a space.

​	任何执行 `expand-abbr` 或 `execute` [bind 函数](https://fishshell.com/docs/current/cmds/bind.html) 的绑定都会扩展缩写。默认情况下，Control+空格键只绑定插入一个空格。

## 可编程标题 Programmable title

When using most virtual terminals, it is possible to set the message displayed in the titlebar of the terminal window. This can be done automatically in fish by defining the [fish_title](https://fishshell.com/docs/current/cmds/fish_title.html) function. The [fish_title](https://fishshell.com/docs/current/cmds/fish_title.html) function is executed before and after a new command is executed or put into the foreground and the output is used as a titlebar message. The [status current-command](https://fishshell.com/docs/current/cmds/status.html) builtin will always return the name of the job to be put into the foreground (or `fish` if control is returning to the shell) when the [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) function is called. The first argument to fish_title will contain the most recently executed foreground command as a string.

​	在使用大多数虚拟终端时，可以设置显示在终端窗口标题栏中的消息。可以通过定义 [fish_title](https://fishshell.com/docs/current/cmds/fish_title.html) 函数在 Fish 中自动完成此操作。每当执行一个新命令或将其放入前台时，[fish_title](https://fishshell.com/docs/current/cmds/fish_title.html) 函数会运行，其输出将作为标题栏信息显示。当调用 [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) 函数时，内置的 [status current-command](https://fishshell.com/docs/current/cmds/status.html) 始终返回要放入前台的作业名称（如果控制返回到 Shell，则为 `fish`）。`fish_title` 的第一个参数将包含最近执行的前台命令的字符串。

The default fish title shows the hostname if connected via ssh, the currently running command (unless it is fish) and the current working directory. All of this is shortened to not make the tab too wide.

​	默认的 Fish 标题在通过 SSH 连接时显示主机名，当前运行的命令（除非是 Fish）以及当前工作目录。这些信息会被缩短，以防止标签过宽。

Examples:

​	示例：

To show the last command and working directory in the title:

​	显示最后的命令和工作目录在标题中：

```
function fish_title
    # `prompt_pwd` shortens the title. This helps prevent tabs from becoming very wide.
    # `prompt_pwd` 缩短了标题，防止标签过宽。
    echo $argv[1] (prompt_pwd)
    pwd
end

```



## 可编程提示符 Programmable prompt

When it is fish’s turn to ask for input (like after it started or the command ended), it will show a prompt. It does this by running the [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) and [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) functions.

​	当 Fish 轮到请求输入时（例如启动后或命令结束后），它将显示提示符。它通过运行 [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) 和 [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) 函数来完成此操作。

The output of the former is displayed on the left and the latter’s output on the right side of the terminal. The output of [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html) will be prepended on the left, though the default function only does this when in [vi-mode](https://fishshell.com/docs/current/interactive.html#vi-mode).

​	前者的输出显示在终端的左侧，后者的输出显示在终端的右侧。虽然默认函数仅在 [vi 模式](https://fishshell.com/docs/current/interactive.html#vi-mode) 下执行，[fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html) 的输出也会在左侧预先显示。



## 可配置的欢迎信息 Configurable greeting

When it is started interactively, fish tries to run the [fish_greeting](https://fishshell.com/docs/current/cmds/fish_greeting.html) function. The default fish_greeting prints a simple greeting. You can change its text by changing the `$fish_greeting` variable, for instance using a [universal variable](https://fishshell.com/docs/current/language.html#variables-universal):

​	当 Fish 以交互方式启动时，它会尝试运行 [fish_greeting](https://fishshell.com/docs/current/cmds/fish_greeting.html) 函数。默认的 `fish_greeting` 打印一个简单的欢迎信息。你可以通过更改 `$fish_greeting` 变量来自定义文本，例如使用 [通用变量](https://fishshell.com/docs/current/language.html#variables-universal)：

```
set -U fish_greeting

```

or you can set it [globally](https://fishshell.com/docs/current/language.html#variables-scope) in [config.fish](https://fishshell.com/docs/current/language.html#configuration):

​	或者你可以在 [config.fish](https://fishshell.com/docs/current/language.html#configuration) 中[全局](https://fishshell.com/docs/current/language.html#variables-scope)设置它：

```
set -g fish_greeting 'Hey, stranger!'

```

or you can script it by changing the function:

​	你也可以通过更改函数来编写脚本：

```
function fish_greeting
    random choice "Hello!" "Hi" "G'day" "Howdy"
end

```

save this in config.fish or [a function file](https://fishshell.com/docs/current/language.html#syntax-function-autoloading). You can also use [funced](https://fishshell.com/docs/current/cmds/funced.html) and [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html) to edit it easily.

​	将此保存到 config.fish 或 [函数文件](https://fishshell.com/docs/current/language.html#syntax-function-autoloading) 中。你也可以使用 [funced](https://fishshell.com/docs/current/cmds/funced.html) 和 [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html) 轻松编辑它。



## 私密模式 Private mode

If `$fish_private_mode` is set to a non-empty value, commands will not be written to the history file on disk.

​	如果 `$fish_private_mode` 设置为非空值，则命令不会被写入磁盘上的历史文件。

You can also launch with `fish --private` (or `fish -P` for short). This both hides old history and prevents writing history to disk. This is useful to avoid leaking personal information (e.g. for screencasts) or when dealing with sensitive information.

​	你也可以使用 `fish --private`（或简写 `fish -P`）启动。这不仅会隐藏旧历史记录，还会阻止将历史记录写入磁盘。这在避免泄露个人信息（例如用于录屏）或处理敏感信息时很有用。

You can query the variable `fish_private_mode` (`if test -n "$fish_private_mode" ...`) if you would like to respect the user’s wish for privacy and alter the behavior of your own fish scripts.

​	如果你想尊重用户的隐私意愿并修改你自己的 Fish 脚本行为，可以查询 `fish_private_mode` 变量（`if test -n "$fish_private_mode" ...`）。



## 命令行编辑器 Command line editor

The fish editor features copy and paste, a [searchable history](https://fishshell.com/docs/current/interactive.html#history-search) and many editor functions that can be bound to special keyboard shortcuts.

​	Fish 编辑器支持复制和粘贴、[可搜索的历史记录](https://fishshell.com/docs/current/interactive.html#history-search)以及许多可以绑定到特定键盘快捷键的编辑功能。

Like bash and other shells, fish includes two sets of keyboard shortcuts (or key bindings): one inspired by the Emacs text editor, and one by the Vi text editor. The default editing mode is Emacs. You can switch to Vi mode by running [fish_vi_key_bindings](https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html) and switch back with [fish_default_key_bindings](https://fishshell.com/docs/current/cmds/fish_default_key_bindings.html). You can also make your own key bindings by creating a function and setting the `fish_key_bindings` variable to its name. For example:

​	与 Bash 和其他 Shell 类似，Fish 提供了两套键盘快捷键（或称为键绑定）：一种基于 Emacs 文本编辑器，另一种基于 Vi 文本编辑器。默认编辑模式是 Emacs 模式。你可以运行 [fish_vi_key_bindings](https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html) 切换到 Vi 模式，再通过 [fish_default_key_bindings](https://fishshell.com/docs/current/cmds/fish_default_key_bindings.html) 切换回 Emacs 模式。你还可以通过创建一个函数并将 `fish_key_bindings` 变量设置为其名称来自定义键绑定。例如：

```
function fish_hybrid_key_bindings --description \
"Vi-style bindings that inherit emacs-style bindings in all modes"
    for mode in default insert visual
        fish_default_key_bindings -M $mode
    end
    fish_vi_key_bindings --no-erase
end
set -g fish_key_bindings fish_hybrid_key_bindings

```

While the key bindings included with fish include many of the shortcuts popular from the respective text editors, they are not a complete implementation. They include a shortcut to open the current command line in your preferred editor (Alt+E by default) if you need the full power of your editor.

​	Fish 包含的键绑定涵盖了许多流行文本编辑器的快捷键，但并不完全实现所有功能。它还包括一个快捷键，可以用你喜欢的编辑器打开当前命令行（默认是 Alt+E），如果你需要使用编辑器的完整功能。



### 共享的键绑定 Shared bindings

Some bindings are common across Emacs and Vi mode, because they aren’t text editing bindings, or because what Vi/Vim does for a particular key doesn’t make sense for a shell.

​	有些键绑定在 Emacs 和 Vi 模式之间是共享的，因为它们不是文本编辑绑定，或者 Vi/Vim 对某个键的行为在 Shell 中不适用。

- Tab [completes](https://fishshell.com/docs/current/interactive.html#tab-completion) the current token. Shift+Tab completes the current token and starts the pager’s search mode. Tab is the same as Control+I. Tab [补全](https://fishshell.com/docs/current/interactive.html#tab-completion) 当前的 token。Shift+Tab 补全当前 token 并启动分页器的搜索模式。Tab 相当于 Control+I。

- ← (Left) and → (Right) move the cursor left or right by one character. If the cursor is already at the end of the line, and an autosuggestion is available, → accepts the autosuggestion. ←（左箭头）和 →（右箭头）将光标左移或右移一个字符。如果光标已在行末，并且有自动建议，则按 → 接受该建议。
- Enter executes the current commandline or inserts a newline if it’s not complete yet (e.g. a `)` or `end` is missing). Enter 执行当前命令行，或在命令未完成时（例如缺少 `)` 或 `end`）插入换行符。
- Alt+Enter inserts a newline at the cursor position.Alt+Enter 在光标位置插入换行符。
- Alt+← and Alt+→ move the cursor one word left or right (to the next space or punctuation mark), or moves forward/backward in the directory history if the command line is empty. If the cursor is already at the end of the line, and an autosuggestion is available, Alt+→ (or Alt+F) accepts the first word in the suggestion. Alt+← 和 Alt+→ 将光标左移或右移一个单词（到下一个空格或标点符号），如果命令行为空，则在目录历史记录中前进/后退。如果光标已在行末，并且有自动建议，则按 Alt+→（或 Alt+F）接受建议中的第一个单词。
- Control+← and Control+→ move the cursor one word left or right. These accept one word of the autosuggestion - the part they’d move over. Control+← 和 Control+→ 将光标左移或右移一个单词。它们会接受建议中的一个单词，即它们移动范围内的部分。
- Shift+← and Shift+→ move the cursor one word left or right, without stopping on punctuation. These accept one big word of the autosuggestion. Shift+← 和 Shift+→ 将光标左移或右移一个单词，不会在标点处停下。它们会接受建议中的大单词。
- ↑ (Up) and ↓ (Down) (or Control+P and Control+N for emacs aficionados) search the command history for the previous/next command containing the string that was specified on the commandline before the search was started. If the commandline was empty when the search started, all commands match. See the [history](https://fishshell.com/docs/current/interactive.html#history-search) section for more information on history searching. ↑（上箭头）和 ↓（下箭头）（或 Emacs 粉丝的 Control+P 和 Control+N）在命令历史中搜索前/后一个包含在开始搜索前在命令行中指定的字符串的命令。如果搜索开始时命令行为空，则所有命令匹配。有关历史搜索的更多信息，请参见 [历史记录](https://fishshell.com/docs/current/interactive.html#history-search) 部分。
- Alt+↑ and Alt+↓ search the command history for the previous/next token containing the token under the cursor before the search was started. If the commandline was not on a token when the search started, all tokens match. See the [history](https://fishshell.com/docs/current/interactive.html#history-search) section for more information on history searching. Alt+↑ 和 Alt+↓ 在命令历史中搜索前/后一个包含开始搜索时光标下的 token 的 token。如果搜索开始时命令行不在 token 上，则所有 token 匹配。更多信息请参见 [历史记录](https://fishshell.com/docs/current/interactive.html#history-search)。
- Control+C interrupt/kill whatever is running (SIGINT). Control+C 中断/终止正在运行的进程（SIGINT）。
- Control+D delete one character to the right of the cursor. If the command line is empty, Control+D will exit fish. Control+D 删除光标右侧的一个字符。如果命令行为空，Control+D 将退出 Fish。
- Control+U removes contents from the beginning of line to the cursor (moving it to the [killring](https://fishshell.com/docs/current/interactive.html#killring)). Control+U 删除从行首到光标的内容（将其移至 [killring](https://fishshell.com/docs/current/interactive.html#killring)）。
- Control+L clears and repaints the screen. Control+L 清除并重绘屏幕。
- Control+W removes the previous path component (everything up to the previous “/”, “:” or “@”) (moving it to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring)). Control+W 删除前一个路径组件（直到上一个 “/”、“:” 或 “@” ）（将其移至 [复制与粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)）。
- Control+X copies the current buffer to the system’s clipboard, Control+V inserts the clipboard contents. (see [fish_clipboard_copy](https://fishshell.com/docs/current/cmds/fish_clipboard_copy.html) and [fish_clipboard_paste](https://fishshell.com/docs/current/cmds/fish_clipboard_paste.html)) Control+X 将当前缓冲区复制到系统剪贴板，Control+V 插入剪贴板内容。（参见 [fish_clipboard_copy](https://fishshell.com/docs/current/cmds/fish_clipboard_copy.html) 和 [fish_clipboard_paste](https://fishshell.com/docs/current/cmds/fish_clipboard_paste.html)）
- Alt+D moves the next word to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring). Alt+D 将下一个单词移至 [复制与粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)。
- Alt+H (or F1) shows the manual page for the current command, if one exists. Alt+H（或 F1）显示当前命令的手册页（如果有）。
- Alt+L lists the contents of the current directory, unless the cursor is over a directory argument, in which case the contents of that directory will be listed. Alt+L 列出当前目录的内容，除非光标位于一个目录参数上，此时列出该目录的内容。
- Alt+O opens the file at the cursor in a pager. Alt+O 在分页器中打开光标处的文件。
- Alt+P adds the string `&| less;` to the end of the job under the cursor. The result is that the output of the command will be paged. Alt+P 将字符串 `&| less;` 添加到光标下的作业末尾。这样命令的输出将被分页。
- Alt+W prints a short description of the command under the cursor. Alt+W 打印光标下命令的简短描述。
- Alt+E edit the current command line in an external editor. The editor is chosen from the first available of the `$VISUAL` or `$EDITOR` variables. Alt+E 在外部编辑器中编辑当前命令行。编辑器从 `$VISUAL` 或 `$EDITOR` 变量的第一个可用值中选择。
- Alt+V Same as Alt+E. Alt+V 与 Alt+E 相同。
- Alt+S Prepends `sudo` to the current commandline. If the commandline is empty, prepend `sudo` to the last commandline. Alt+S 在当前命令行前添加 `sudo`。如果命令行为空，则在上一个命令行前添加 `sudo`。
- Control+Space Inserts a space without expanding an [abbreviation](https://fishshell.com/docs/current/interactive.html#abbreviations). For vi-mode this only applies to insert-mode. Control+Space 插入空格而不扩展 [缩写](https://fishshell.com/docs/current/interactive.html#abbreviations)。对于 Vi 模式，这仅适用于插入模式。



### Emacs mode commands

To enable emacs mode, use [fish_default_key_bindings](https://fishshell.com/docs/current/cmds/fish_default_key_bindings.html). This is also the default.

​	要启用 Emacs 模式，请使用 [fish_default_key_bindings](https://fishshell.com/docs/current/cmds/fish_default_key_bindings.html)。这也是默认模式。

- Home or Control+A moves the cursor to the beginning of the line. Home 或 Control+A 将光标移动到行首。

- End or Control+E moves to the end of line. If the cursor is already at the end of the line, and an autosuggestion is available, End or Control+E accepts the autosuggestion. End 或 Control+E 将光标移动到行尾。如果光标已经在行尾，并且有自动建议，End 或 Control+E 将接受自动建议。
- Control+B, Control+F move the cursor one character left or right or accept the autosuggestion just like the ← (Left) and → (Right) shared bindings (which are available as well). Control+B、Control+F 分别将光标向左或向右移动一个字符，或与 ←（左）和 →（右）共享绑定一样接受自动建议。
- Control+N, Control+P move the cursor up/down or through history, like the up and down arrow shared bindings. Control+N、Control+P 向上/向下移动光标，或通过历史记录导航，与共享绑定中的上箭头和下箭头一样。
- Delete or Backspace removes one character forwards or backwards respectively. This also goes for Control+H, which is indistinguishable from backspace. Delete 或 Backspace 分别向前或向后删除一个字符。Control+H 与 Backspace 无法区分，也执行删除。
- Alt+Backspace removes one word backwards. Alt+Backspace 向后删除一个单词。
- Alt+< moves to the beginning of the commandline, Alt+> moves to the end. Alt+< 移动到命令行的开头，Alt+> 移动到命令行的末尾。
- Control+K deletes from the cursor to the end of line (moving it to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring)). Control+K 从光标处删除到行尾（并将其移动到 [复制与粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)）。
- Escape and Control+G cancel the current operation. Immediately after an unambiguous completion this undoes it. Escape 和 Control+G 取消当前操作。在明确的补全之后立即执行此操作将撤销它。
- Alt+C capitalizes the current word. Alt+C 将当前单词首字母大写。
- Alt+U makes the current word uppercase. Alt+U 将当前单词全部转换为大写。
- Control+T transposes the last two characters. Control+T 交换最后两个字符的位置。
- Alt+T transposes the last two words. Alt+T 交换最后两个单词的位置。
- Control+Z, Control+_ (Control+/ on some terminals) undo the most recent edit of the line. Control+Z 或 Control+_（某些终端上为 Control+/）撤销最近一次对行的编辑。
- Alt+/ reverts the most recent undo. Alt+/ 撤销最近一次撤销操作。
- Control+R opens the history in a pager. This will show history entries matching the search, a few at a time. Pressing Control+R again will search older entries, pressing Control+S (that otherwise toggles pager search) will go to newer entries. The search bar will always be selected. Control+R 在分页器中打开历史记录。它会显示匹配搜索的历史条目，每次显示几个条目。再次按下 Control+R 会搜索较早的条目，按下 Control+S（通常切换分页器搜索）会显示较新的条目。搜索栏将始终被选中。

You can change these key bindings using the [bind](https://fishshell.com/docs/current/cmds/bind.html) builtin.

​	你可以使用 [bind](https://fishshell.com/docs/current/cmds/bind.html) 内置命令更改这些键绑定。



### Vi 模式命令 Vi mode commands

Vi mode allows for the use of Vi-like commands at the prompt. Initially, [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) is active. Escape enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). The commands available in command, insert and visual mode are described below. Vi mode shares [some bindings](https://fishshell.com/docs/current/interactive.html#shared-binds) with [Emacs mode](https://fishshell.com/docs/current/interactive.html#emacs-mode).

​	Vi 模式允许在提示符中使用类似 Vi 的命令。初始状态下，[插入模式](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) 是活动的。按 Escape 进入 [命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)。以下是命令模式、插入模式和可视模式下可用的命令。Vi 模式与 [Emacs 模式](https://fishshell.com/docs/current/interactive.html#emacs-mode) 共享 [一些键绑定](https://fishshell.com/docs/current/interactive.html#shared-binds)。

To enable vi mode, use [fish_vi_key_bindings](https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html). It is also possible to add all emacs-mode bindings to vi-mode by using something like:

​	要启用 Vi 模式，请使用 [fish_vi_key_bindings](https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html)。你还可以通过以下方法将 Emacs 模式的所有绑定添加到 Vi 模式中：

```
function fish_user_key_bindings
    # Execute this once per mode that emacs bindings should be used in
    # 为要在 Emacs 模式中使用的每个模式执行此操作
    fish_default_key_bindings -M insert

    # Then execute the vi-bindings so they take precedence when there's a conflict.
    # Without --no-erase fish_vi_key_bindings will default to
    # resetting all bindings.
    # The argument specifies the initial mode (insert, "default" or visual).
    # 然后执行 vi 绑定，这样当发生冲突时，vi 绑定会优先。
    # 如果没有 --no-erase，fish_vi_key_bindings 将默认重置所有绑定。
    # 参数指定初始模式（插入、"default" 或可视模式）。
    fish_vi_key_bindings --no-erase insert
end

```

When in vi-mode, the [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html) function will display a mode indicator to the left of the prompt. To disable this feature, override it with an empty function. To display the mode elsewhere (like in your right prompt), use the output of the `fish_default_mode_prompt` function.

​	当 fish 处于 vi 模式时，[fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html) 函数会在提示符左侧显示一个模式指示符。要禁用此功能，可以使用一个空函数覆盖它。若要在其他地方显示模式（如在右侧提示符），可以使用 `fish_default_mode_prompt` 函数的输出。

When a binding switches the mode, it will repaint the mode-prompt if it exists, and the rest of the prompt only if it doesn’t. So if you want a mode-indicator in your `fish_prompt`, you need to erase `fish_mode_prompt` e.g. by adding an empty file at `~/.config/fish/functions/fish_mode_prompt.fish`. (Bindings that change the mode are supposed to call the repaint-mode bind function, see [bind](https://fishshell.com/docs/current/cmds/bind.html))

​	当按键绑定切换模式时，如果存在模式提示符，它会重新绘制该提示符；如果不存在，则只会重新绘制提示符的其他部分。因此，如果你希望在 `fish_prompt` 中显示模式指示符，你需要删除 `fish_mode_prompt`，例如在 `~/.config/fish/functions/fish_mode_prompt.fish` 中添加一个空文件。（更改模式的按键绑定应该调用 `repaint-mode` 绑定函数，详见 [bind](https://fishshell.com/docs/current/cmds/bind.html)）

The `fish_vi_cursor` function will be used to change the cursor’s shape depending on the mode in supported terminals. The following snippet can be used to manually configure cursors after enabling vi-mode:

​	`fish_vi_cursor` 函数可根据终端支持的模式更改光标的形状。启用 vi 模式后，你可以使用以下代码片段手动配置光标：

```
# Emulates vim's cursor shape behavior
# Set the normal and visual mode cursors to a block
# 模拟 vim 的光标形状行为
# 设置普通模式和可视模式光标为块状
set fish_cursor_default block

# Set the insert mode cursor to a line
# 设置插入模式光标为线条
set fish_cursor_insert line

# Set the replace mode cursors to an underscore
# 设置替换模式光标为下划线
set fish_cursor_replace_one underscore
set fish_cursor_replace underscore

# Set the external cursor to a line. The external cursor appears when a command is started.
# The cursor shape takes the value of fish_cursor_default when fish_cursor_external is not specified.
# 设置外部光标为线条。当命令启动时显示外部光标。
# 如果没有指定 fish_cursor_external，光标形状将采用 fish_cursor_default 的值。
set fish_cursor_external line

# The following variable can be used to configure cursor shape in
# visual mode, but due to fish_cursor_default, is redundant here
# 这个变量可以用来配置可视模式下的光标形状，但由于有 fish_cursor_default，这里多余
set fish_cursor_visual block

```

Additionally, `blink` can be added after each of the cursor shape parameters to set a blinking cursor in the specified shape.

​	另外，你可以在每个光标形状参数后添加 `blink`，设置闪烁光标。

Fish knows the shapes “block”, “line” and “underscore”, other values will be ignored.

​	Fish 识别的光标形状有 “block”（块状）、“line”（线条）和 “underscore”（下划线），其他值会被忽略。

If the cursor shape does not appear to be changing after setting the above variables, it’s likely your terminal emulator does not support the capabilities necessary to do this. It may also be the case, however, that `fish_vi_cursor` has not detected your terminal’s features correctly (for example, if you are using `tmux`). If this is the case, you can force `fish_vi_cursor` to set the cursor shape by setting `$fish_vi_force_cursor` in `config.fish`. You’ll have to restart fish for any changes to take effect. If cursor shape setting remains broken after this, it’s almost certainly an issue with your terminal emulator, and not fish.

​	如果设置了上述变量后光标形状未更改，可能是你的终端模拟器不支持所需的功能。也可能是 `fish_vi_cursor` 未正确检测到你的终端功能（例如，如果你使用 `tmux`）。如果是这种情况，你可以通过在 `config.fish` 中设置 `$fish_vi_force_cursor` 来强制 `fish_vi_cursor` 设置光标形状。你需要重启 fish 以使更改生效。如果光标形状设置仍然无效，几乎可以肯定问题出在终端模拟器上，而不是 fish。

#### 命令模式 Command mode

Command mode is also known as normal mode.

​	命令模式也称为正常模式。

- h moves the cursor left. h 向左移动光标。

- l moves the cursor right. l 向右移动光标。
- k and j search the command history for the previous/next command containing the string that was specified on the commandline before the search was started. If the commandline was empty when the search started, all commands match. See the [history](https://fishshell.com/docs/current/interactive.html#history-search) section for more information on history searching. In multi-line commands, they move the cursor up and down respectively. k 和 j 在命令历史记录中搜索包含在开始搜索之前输入的字符串的上一个/下一个命令。如果开始搜索时命令行为空，所有命令都会匹配。有关历史搜索的更多信息，请参见 [history](https://fishshell.com/docs/current/interactive.html#history-search) 部分。在多行命令中，它们分别向上和向下移动光标。
- i enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) at the current cursor position. i 在当前光标位置进入[插入模式](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)。
- Shift+I enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) at the beginning of the line. Shift+I 在行首进入[插入模式](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)。
- v enters [visual mode](https://fishshell.com/docs/current/interactive.html#vi-mode-visual) at the current cursor position. v 在当前光标位置进入[可视模式](https://fishshell.com/docs/current/interactive.html#vi-mode-visual)。
- a enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) after the current cursor position. a 在当前光标位置之后进入[插入模式](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)。
- Shift+A enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) at the end of the line. Shift+A 在行尾进入[插入模式](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)。
- o inserts a new line under the current one and enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) o 在当前行下方插入一行并进入[插入模式](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)。
- O (capital-“o”) inserts a new line above the current one and enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) O（大写 “O”）在当前行上方插入一行并进入[插入模式](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)。
- 0 (zero) moves the cursor to beginning of line (remaining in command mode). 0（零）将光标移至行首（保持在命令模式）。
- d+d deletes the current line and moves it to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring). d+d 删除当前行并将其移动到[剪切粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)。
- Shift+D deletes text after the current cursor position and moves it to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring). Shift+D 删除当前光标位置之后的文本并将其移动到[剪切粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)。
- p pastes text from the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring). p 从[剪切粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)粘贴文本。
- u undoes the most recent edit of the command line. u 撤销命令行中最近的编辑。
- Control+R redoes the most recent edit. Control+R 重做最近的编辑。
- [ and ] search the command history for the previous/next token containing the token under the cursor before the search was started. See the [history](https://fishshell.com/docs/current/interactive.html#history-search) section for more information on history searching. [ 和 ] 在命令历史记录中搜索包含在开始搜索之前光标下的标记的上一个/下一个标记。有关历史搜索的更多信息，请参见 [history](https://fishshell.com/docs/current/interactive.html#history-search) 部分。
- / opens the history in a pager. This will show history entries matching the search, a few at a time. Pressing it again will search older entries, pressing Control+S (that otherwise toggles pager search) will go to newer entries. The search bar will always be selected. / 在分页器中打开历史记录。这将显示与搜索匹配的历史记录条目，一次显示几条。再次按下它将搜索较旧的条目，按 Control+S（原本用于切换分页器搜索）将转到较新的条目。搜索栏始终处于选中状态。
- Backspace moves the cursor left. Backspace 向左移动光标。
- g / G moves the cursor to the beginning/end of the commandline, respectively. g / G 分别将光标移至命令行的开头/结尾。
- :q exits fish. 退出 fish。

#### 



#### 插入模式 Insert mode

- Escape enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). Escape 进入[命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)。
- Backspace removes one character to the left. Backspace 删除光标左侧的一个字符。



#### 可视模式 Visual mode

- ← (Left) and → (Right) extend the selection backward/forward by one character. ←（左）和 →（右）分别向后/向前扩展选择一个字符。
- h moves the cursor left. h 向左移动光标。
- l moves the cursor right. l 向右移动光标。
- k moves the cursor up. k 向上移动光标。
- j moves the cursor down. j 向下移动光标。
- b and w extend the selection backward/forward by one word. b 和 w 分别向后/向前扩展选择一个单词。
- d and x move the selection to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring) and enter [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). d 和 x 将选择内容移到[剪切粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)，并进入[命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)。
- Escape and Control+C enter [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). Escape 和 Control+C 进入[命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)。
- c and s remove the selection and switch to insert mode. c 和 s 删除选择内容并切换到插入模式。
- X moves the entire line to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring), and enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). X 将整行移动到[剪切粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)，并进入[命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)。
- y copies the selection to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring), and enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). y 将选择内容复制到[剪切粘贴（Kill Ring）](https://fishshell.com/docs/current/interactive.html#killring)，并进入[命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)。
- ~ toggles the case (upper/lower) on the selection, and enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). ~ 切换选择内容的大小写（大写/小写），并进入[命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)。
- `"*y` copies the selection to the clipboard, and enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command).  `"*y` 将选择内容复制到剪贴板，并进入[命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)。



### 自定义绑定 Custom bindings

In addition to the standard bindings listed here, you can also define your own with [bind](https://fishshell.com/docs/current/cmds/bind.html):

​	除了这里列出的标准按键绑定外，你还可以使用 [bind](https://fishshell.com/docs/current/cmds/bind.html) 自定义你的按键绑定：

```
# Just clear the commandline on control-c
# 在按下 control-c 时清空命令行
bind \cc 'commandline -r ""'

```

Put `bind` statements into [config.fish](https://fishshell.com/docs/current/language.html#configuration) or a function called `fish_user_key_bindings`.

​	将 `bind` 语句放入 [config.fish](https://fishshell.com/docs/current/language.html#configuration) 或名为 `fish_user_key_bindings` 的函数中。

If you change your mind on a binding and want to go back to fish’s default, you can simply erase it again:

​	如果你改变了对某个绑定的想法并希望恢复 fish 的默认绑定，只需再次删除它：

```
bind --erase \cc

```

Fish remembers its preset bindings and so it will take effect again. This saves you from having to remember what it was before and add it again yourself.

​	Fish 记住其预设绑定，因此它会再次生效。这可以省去你记住原始绑定并手动添加的麻烦。

If you use [vi bindings](https://fishshell.com/docs/current/interactive.html#vi-mode), note that `bind` will by default bind keys in [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). To bind something in [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert):

​	如果你使用 [vi 按键绑定](https://fishshell.com/docs/current/interactive.html#vi-mode)，请注意，`bind` 默认会在[命令模式](https://fishshell.com/docs/current/interactive.html#vi-mode-command)中绑定按键。要在[插入模式](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)中绑定某个按键，可以这样做：

```
bind --mode insert \cc 'commandline -r ""'

```



#### 按键序列 Key sequences

The terminal tells fish which keys you pressed by sending some sequences of bytes to describe that key. For some keys, this is easy - pressing a simply means the terminal sends “a”. In others it’s more complicated and terminals disagree on which they send.

​	终端通过发送一些字节序列来告知 fish 你按下了哪些按键。对于某些按键来说很简单——按下字母 a 时，终端就会发送 "a"。而对于其他按键则更为复杂，不同的终端发送的序列可能会有所不同。

In these cases, [fish_key_reader](https://fishshell.com/docs/current/cmds/fish_key_reader.html) can tell you how to write the key sequence for your terminal. Just start it and press the keys you are interested in:

​	在这些情况下，[fish_key_reader](https://fishshell.com/docs/current/cmds/fish_key_reader.html) 可以告诉你如何为你的终端编写按键序列。只需启动它并按下你感兴趣的按键：

```
> fish_key_reader # pressing control-c
Press a key:
Press [ctrl-C] again to exit
bind \cC 'do something'

> fish_key_reader # pressing the right-arrow
Press a key:
bind \e\[C 'do something'

```

Note that some key combinations are indistinguishable or unbindable. For instance control-i *is the same* as the tab key. This is a terminal limitation that fish can’t do anything about. When `fish_key_reader` prints the same sequence for two different keys, then that is because your terminal sends the same sequence for them.

​	请注意，有些按键组合是无法区分或无法绑定的。例如，control-i *与 Tab 键相同*。这是终端的局限性，fish 无法处理。当 `fish_key_reader` 为两个不同的按键打印相同的序列时，说明你的终端对它们发送了相同的序列。

Also, Escape is the same thing as Alt in a terminal. To distinguish between pressing Escape and then another key, and pressing Alt and that key (or an escape sequence the key sends), fish waits for a certain time after seeing an escape character. This is configurable via the [`fish_escape_delay_ms`](https://fishshell.com/docs/current/language.html#envvar-fish_escape_delay_ms) variable.

​	此外，在终端中，Escape 与 Alt 是相同的。为了区分按下 Escape 后再按另一个键，和按住 Alt 再按那个键（或按键发送的 escape 序列），fish 在看到 escape 字符后会等待一段时间。这可以通过 [`fish_escape_delay_ms`](https://fishshell.com/docs/current/language.html#envvar-fish_escape_delay_ms) 变量进行配置。

If you want to be able to press Escape and then a character and have it count as Alt+that character, set it to a higher value, e.g.:

​	如果你希望按下 Escape 后再按一个字符时将其视为 Alt+该字符，请将其设置为更大的值，例如：

```
set -g fish_escape_delay_ms 100

```

Similarly, to disambiguate *other* keypresses where you’ve bound a subsequence and a longer sequence, fish has [`fish_sequence_key_delay_ms`](https://fishshell.com/docs/current/language.html#envvar-fish_sequence_key_delay_ms):

​	同样，为了区分*其他*按键，当你绑定了一个子序列和一个更长的序列时，fish 提供了 [`fish_sequence_key_delay_ms`](https://fishshell.com/docs/current/language.html#envvar-fish_sequence_key_delay_ms)：

```
# This binds "jk" to switch to normal mode in vi-mode.
# If you kept it like that, every time you press "j",
# fish would wait for a "k" or other key to disambiguate
# 这会绑定 "jk" 在 vi 模式中切换到普通模式。
# 如果保持不变，每次按下 "j" 时，
# fish 都会等待 "k" 或其他按键来区分
bind -M insert -m default jk cancel repaint-mode

# After setting this, fish only waits 200ms for the "k",
# or decides to treat the "j" as a separate sequence, inserting it.
# 设置此值后，fish 只会等待 200 毫秒以获取 "k"，
# 或决定将 "j" 视为单独的序列并插入它。
set -g fish_sequence_key_delay_ms 200

```



### 复制和粘贴 Copy and paste (Kill Ring)

Fish uses an Emacs-style kill ring for copy and paste functionality. For example, use Control+K (kill-line) to cut from the current cursor position to the end of the line. The string that is cut (a.k.a. killed in emacs-ese) is inserted into a list of kills, called the kill ring. To paste the latest value from the kill ring (emacs calls this “yanking”) use Control+Y (the `yank` input function). After pasting, use Alt+Y (`yank-pop`) to rotate to the previous kill.

​	Fish 使用 Emacs 风格的 kill ring 来实现复制和粘贴功能。例如，使用 Control+K（kill-line）从当前光标位置到行尾进行剪切。被剪切的字符串（在 Emacs 术语中称为 "killed"）会插入到一个剪切列表中，称为 kill ring。要从 kill ring 中粘贴最新的值（在 Emacs 中称为 "yanking"），使用 Control+Y（`yank` 输入功能）。粘贴后，使用 Alt+Y（`yank-pop`）循环到之前的剪切内容。

Copy and paste from outside are also supported, both via the Control+X / Control+V bindings (the `fish_clipboard_copy` and `fish_clipboard_paste` functions [[2\]](https://fishshell.com/docs/current/interactive.html#id8)) and via the terminal’s paste function, for which fish enables “Bracketed Paste Mode”, so it can tell a paste from manually entered text. In addition, when pasting inside single quotes, pasted single quotes and backslashes are automatically escaped so that the result can be used as a single token simply by closing the quote after. Kill ring entries are stored in `fish_killring` variable.

​	Fish 也支持从外部进行复制和粘贴，可以通过 Control+X / Control+V 绑定（`fish_clipboard_copy` 和 `fish_clipboard_paste` 函数 [[2\]](https://fishshell.com/docs/current/interactive.html#id8)）或通过终端的粘贴功能。Fish 启用了“括号粘贴模式”，以便区分粘贴内容与手动输入的文本。此外，当在单引号内粘贴时，粘贴的单引号和反斜杠会自动转义，以便粘贴结果作为一个单独的标记，只需关闭引号即可使用。kill ring 条目存储在 `fish_killring` 变量中。

The commands `begin-selection` and `end-selection` (unbound by default; used for selection in vi visual mode) control text selection together with cursor movement commands that extend the current selection. The variable [`fish_cursor_selection_mode`](https://fishshell.com/docs/current/language.html#envvar-fish_cursor_selection_mode) can be used to configure if that selection should include the character under the cursor (`inclusive`) or not (`exclusive`). The default is `exclusive`, which works well with any cursor shape. For vi mode, and particularly for the `block` or `underscore` cursor shapes you may prefer `inclusive`.

​	`begin-selection` 和 `end-selection` 命令（默认未绑定；用于 vi 可视模式中的选择）与扩展当前选择的光标移动命令一起控制文本选择。[`fish_cursor_selection_mode`](https://fishshell.com/docs/current/language.html#envvar-fish_cursor_selection_mode) 变量可以配置该选择是否应包括光标下的字符（`inclusive`）或不包括（`exclusive`）。默认是 `exclusive`，适用于所有光标形状。对于 vi 模式，尤其是 `block` 或 `underscore` 光标形状，你可能更喜欢 `inclusive`。

[[2](https://fishshell.com/docs/current/interactive.html#id7)] 

These rely on external tools. Currently xsel, xclip, wl-copy/wl-paste and pbcopy/pbpaste are supported.

​	这些依赖外部工具。目前支持 xsel、xclip、wl-copy/wl-paste 和 pbcopy/pbpaste。



### 多行编辑 Multiline editing

The fish commandline editor can be used to work on commands that are several lines long. There are three ways to make a command span more than a single line:

​	Fish 命令行编辑器可以处理多行命令。有三种方法可以让命令跨越多行：

- Pressing the Enter key while a block of commands is unclosed, such as when one or more block commands such as `for`, `begin` or `if` do not have a corresponding [end](https://fishshell.com/docs/current/cmds/end.html) command. 当命令块未闭合时按 Enter 键，例如一个或多个 `for`、`begin` 或 `if` 块没有对应的 [end](https://fishshell.com/docs/current/cmds/end.html) 命令。

- Pressing Alt+Enter instead of pressing the Enter key. 按下 Alt+Enter 而不是按 Enter 键。
- By inserting a backslash (`\`) character before pressing the Enter key, escaping the newline. 在按 Enter 键前插入反斜杠（`\`），以转义换行符。

The fish commandline editor works exactly the same in single line mode and in multiline mode. To move between lines use the left and right arrow keys and other such keyboard shortcuts.

​	Fish 命令行编辑器在单行模式和多行模式下的工作方式完全相同。要在行间移动，请使用左右箭头键以及其他快捷键。



### 可搜索的命令历史 Searchable command history

After a command has been executed, it is remembered in the history list. Any duplicate history items are automatically removed. By pressing the up and down keys, you can search forwards and backwards in the history. If the current command line is not empty when starting a history search, only the commands containing the string entered into the command line are shown.

​	命令执行后，它会被记录在历史列表中。任何重复的历史记录条目都会自动删除。通过按上下键，你可以在历史记录中向前或向后搜索。如果在启动历史搜索时当前命令行不为空，则只会显示包含命令行中输入字符串的命令。

By pressing Alt+↑ and Alt+↓, a history search is also performed, but instead of searching for a complete commandline, each commandline is broken into separate elements just like it would be before execution, and the history is searched for an element matching that under the cursor.

​	通过按 Alt+↑ 和 Alt+↓，也可以执行历史搜索，但与搜索完整命令行不同，每个命令行会被拆分成与执行前一样的独立元素，历史记录将会搜索与光标下元素匹配的历史条目。

For more complicated searches, you can press Ctrl+R to open a pager that allows you to search the history. It shows a limited number of entries in one page, press Ctrl+R [[3\]](https://fishshell.com/docs/current/interactive.html#id11) again to move to the next page and Ctrl+S [[4\]](https://fishshell.com/docs/current/interactive.html#id12) to move to the previous page. You can change the text to refine your search.

​	对于更复杂的搜索，你可以按 Ctrl+R 打开一个分页器，允许你搜索历史记录。分页器一次显示有限数量的条目，再次按下 Ctrl+R [[3\]](https://fishshell.com/docs/current/interactive.html#id11) 进入下一页，按 Ctrl+S [[4\]](https://fishshell.com/docs/current/interactive.html#id12) 进入上一页。你可以通过更改文本来调整搜索结果。

History searches are case-insensitive unless the search string contains an uppercase character. You can stop a search to edit your search string by pressing Esc or Page Down.

​	历史搜索对大小写不敏感，除非搜索字符串中包含大写字符。按下 Esc 或 Page Down 可以停止搜索并编辑你的搜索字符串。

Prefixing the commandline with a space will prevent the entire line from being stored in the history. It will still be available for recall until the next command is executed, but will not be stored on disk. This is to allow you to fix misspellings and such.

​	在命令行前加一个空格，可以防止该行被存储在历史记录中。直到执行下一条命令前，你仍然可以回忆起它，但它不会被存储到磁盘中。这是为了让你修正拼写错误等。

The command history is stored in the file `~/.local/share/fish/fish_history` (or `$XDG_DATA_HOME/fish/fish_history` if that variable is set) by default. However, you can set the `fish_history` environment variable to change the name of the history session (resulting in a `<session>_history` file); both before starting the shell and while the shell is running.

​	命令历史记录默认存储在 `~/.local/share/fish/fish_history`（如果设置了 `$XDG_DATA_HOME` 则存储在 `$XDG_DATA_HOME/fish/fish_history`）文件中。不过，你可以通过设置 `fish_history` 环境变量来更改历史会话的名称（会生成一个 `<session>_history` 文件）；这可以在启动 shell 前设置，也可以在 shell 运行时设置。

See the [history](https://fishshell.com/docs/current/cmds/history.html) command for other manipulations.

​	有关其他操作，请参见 [history](https://fishshell.com/docs/current/cmds/history.html) 命令。

Examples:

​	示例：

To search for previous entries containing the word ‘make’, type `make` in the console and press the up key.

​	要搜索以前包含 "make" 的条目，在控制台中输入 `make` 并按上键。

If the commandline reads `cd m`, place the cursor over the `m` character and press Alt+↑ to search for previously typed words containing ‘m’.

​	如果命令行显示 `cd m`，将光标放在 `m` 字符上，然后按 Alt+↑ 以搜索以前输入的包含 "m" 的单词。

[[3](https://fishshell.com/docs/current/interactive.html#id9)] 

Or another binding that triggers the `history-pager` input function. See [bind](https://fishshell.com/docs/current/cmds/bind.html) for a list.

​	或其他触发 `history-pager` 输入功能的绑定。有关更多信息，请参见 [bind](https://fishshell.com/docs/current/cmds/bind.html)。

[[4](https://fishshell.com/docs/current/interactive.html#id10)] 

Or another binding that triggers the `pager-toggle-search` input function.

​	或其他触发 `pager-toggle-search` 输入功能的绑定。

## 导航目录 Navigating directories

Navigating directories is usually done with the [cd](https://fishshell.com/docs/current/cmds/cd.html) command, but fish offers some advanced features as well.

​	导航目录通常使用 [cd](https://fishshell.com/docs/current/cmds/cd.html) 命令，但 fish 也提供了一些高级功能。

The current working directory can be displayed with the [pwd](https://fishshell.com/docs/current/cmds/pwd.html) command, or the `$PWD` [special variable](https://fishshell.com/docs/current/language.html#variables-special). Usually your prompt already does this.

​	当前工作目录可以通过 [pwd](https://fishshell.com/docs/current/cmds/pwd.html) 命令或 `$PWD` [特殊变量](https://fishshell.com/docs/current/language.html#variables-special) 显示。通常你的提示符已经显示了这一点。

### 目录历史 Directory history

Fish automatically keeps a trail of the recent visited directories with [cd](https://fishshell.com/docs/current/cmds/cd.html) by storing this history in the `dirprev` and `dirnext` variables.

​	Fish 会自动跟踪使用 [cd](https://fishshell.com/docs/current/cmds/cd.html) 访问的最近目录，将该历史存储在 `dirprev` 和 `dirnext` 变量中。

Several commands are provided to interact with this directory history:

​	提供了几个命令与该目录历史交互：

- [dirh](https://fishshell.com/docs/current/cmds/dirh.html) prints the history [dirh](https://fishshell.com/docs/current/cmds/dirh.html) 打印历史记录。

- [cdh](https://fishshell.com/docs/current/cmds/cdh.html) displays a prompt to quickly navigate the history [cdh](https://fishshell.com/docs/current/cmds/cdh.html) 显示一个提示符，允许快速导航历史记录。
- [prevd](https://fishshell.com/docs/current/cmds/prevd.html) moves backward through the history. It is bound to Alt+← [prevd](https://fishshell.com/docs/current/cmds/prevd.html) 向后移动历史记录，默认绑定为 Alt+←。
- [nextd](https://fishshell.com/docs/current/cmds/nextd.html) moves forward through the history. It is bound to Alt+→  [nextd](https://fishshell.com/docs/current/cmds/nextd.html) 向前移动历史记录，默认绑定为 Alt+→。



### 目录栈 Directory stack

Another set of commands, usually also available in other shells like bash, deal with the directory stack. Stack handling is not automatic and needs explicit calls of the following commands:

​	另一组命令，通常也在其他 shell（如 bash）中可用，处理目录栈。栈处理不是自动的，需要显式调用以下命令：

- [dirs](https://fishshell.com/docs/current/cmds/dirs.html) prints the stack [dirs](https://fishshell.com/docs/current/cmds/dirs.html) 打印栈。

- [pushd](https://fishshell.com/docs/current/cmds/pushd.html) adds a directory on top of the stack and makes it the current working directory [pushd](https://fishshell.com/docs/current/cmds/pushd.html) 将目录添加到栈顶部并将其设为当前工作目录。
- [popd](https://fishshell.com/docs/current/cmds/popd.html) removes the directory on top of the stack and changes the current working directory [popd](https://fishshell.com/docs/current/cmds/popd.html) 移除栈顶部的目录并更改当前工作目录。