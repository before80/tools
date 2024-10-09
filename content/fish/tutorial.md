+++
title = "教程"
date = 2024-10-09T13:37:26+08:00
type = "docs"
weight = 20
description = ""
isCJKLanguage = true
draft = false

+++

> 原文：[https://fishshell.com/docs/current/tutorial.html](https://fishshell.com/docs/current/tutorial.html)

# Tutorial 教程

## 为什么选择 fish？ Why fish?

Fish is a fully-equipped command line shell (like bash or zsh) that is smart and user-friendly. Fish supports powerful features like syntax highlighting, autosuggestions, and tab completions that just work, with nothing to learn or configure.

​	fish 是一个功能齐全的命令行 shell（如 bash 或 zsh），它智能且用户友好。fish 支持强大的功能，例如语法高亮、自动建议和 Tab 补全，开箱即用，无需学习或配置。

If you want to make your command line more productive, more useful, and more fun, without learning a bunch of arcane syntax and configuration options, then fish might be just what you’re looking for!

​	如果你想让你的命令行更高效、更实用并且更有趣，而无需学习一堆复杂的语法和配置选项，那么 fish 可能正是你所寻找的！

## 入门 Getting started

Once installed, just type in `fish` into your current shell to try it out!

​	安装后，只需在当前 shell 中输入 `fish` 尝试一下！

You will be greeted by the standard fish prompt, which means you are all set up and can start using fish:

​	你将看到标准的 fish 提示符，这意味着你已经设置好并可以开始使用 fish 了：

```
> fish
Welcome to fish, the friendly interactive shell
Type help for instructions on how to use fish
you@hostname ~>

```

This prompt that you see above is the fish default prompt: it shows your username, hostname, and working directory. - to change this prompt see [how to change your prompt](https://fishshell.com/docs/current/interactive.html#prompt) - to switch to fish permanently see [Default Shell](https://fishshell.com/docs/current/index.html#default-shell).

​	上面显示的提示符是 fish 的默认提示符：它显示了你的用户名、主机名和工作目录。- 要更改此提示符，请参阅[如何更改你的提示符](https://fishshell.com/docs/current/interactive.html#prompt) - 要永久切换到 fish，请参阅[默认 Shell](https://fishshell.com/docs/current/index.html#default-shell)。

From now on, we’ll pretend your prompt is just a `>` to save space.

​	从现在开始，我们将假设你的提示符是一个 `>` 来节省空间。

## 学习 fish Learning fish

This tutorial assumes a basic understanding of command line shells and Unix commands, and that you have a working copy of fish.

​	本教程假设你对命令行 shell 和 Unix 命令有基本的了解，并且你有一个可用的 fish 版本。

If you have a strong understanding of other shells, and want to know what fish does differently, search for the magic phrase *unlike other shells*, which is used to call out important differences.

​	如果你对其他 shell 有深刻的理解，并且想知道 fish 与它们有什么不同，可以搜索 *unlike other shells* 这个关键短语，用于标出重要的差异。

Or, if you want a quick overview over the differences to other shells like Bash, see [Fish For Bash Users](https://fishshell.com/docs/current/fish_for_bash_users.html#fish-for-bash-users).

​	或者，如果你想快速了解 fish 与其他 shell（如 Bash）的区别，请参阅 [Fish For Bash Users](https://fishshell.com/docs/current/fish_for_bash_users.html#fish-for-bash-users)。

For the full, detailed description of how to use fish interactively, see [Interactive Use](https://fishshell.com/docs/current/interactive.html#interactive).

​	要全面了解如何交互式使用 fish，请参阅 [Interactive Use](https://fishshell.com/docs/current/interactive.html#interactive)。

For a comprehensive description of fish’s scripting language, see [The Fish Language](https://fishshell.com/docs/current/language.html#language).

​	要详细了解 fish 的脚本语言，请参阅 [The Fish Language](https://fishshell.com/docs/current/language.html#language)。

## 运行命令 Running Commands

Fish runs commands like other shells: you type a command, followed by its arguments. Spaces are separators:

​	fish 与其他 shell 类似：你输入命令，后跟其参数。空格用作分隔符：

```
> echo hello world
hello world

```

This runs the command `echo` with the arguments `hello` and `world`. In this case that’s the same as one argument `hello world`, but in many cases it’s not. If you need to pass an argument that includes a space, you can [escape](https://fishshell.com/docs/current/language.html#escapes) with a backslash, or [quote](https://fishshell.com/docs/current/language.html#quotes) it using single or double quotes:

​	这运行了 `echo` 命令，参数为 `hello` 和 `world`。在这个例子中，这与一个参数 `hello world` 是一样的，但在许多情况下并不是这样。如果你需要传递包含空格的参数，你可以使用反斜杠进行[转义](https://fishshell.com/docs/current/language.html#escapes)或使用单引号或双引号[引用](https://fishshell.com/docs/current/language.html#quotes)它：

```
> mkdir My\ Files
# Makes a directory called "My Files", with a space in the name
# 创建一个名为 "My Files" 的目录，名称中带有空格
> cp ~/Some\ File 'My Files'
# Copies a file called "Some File" in the home directory to "My Files"
# 将名为 "Some File" 的文件从主目录复制到 "My Files"
> ls "My Files"
Some File

```

## 获取帮助 Getting Help

Run `help` to open fish’s help in a web browser, and `man` with the page (like `fish-language`) to open it in a man page. You can also ask for help with a specific command, for example, `help set` to open in a web browser, or `man set` to see it in the terminal.

​	运行 `help` 可以在浏览器中打开 fish 的帮助，使用 `man` 和页面名（如 `fish-language`）可以在手册页中打开它。你还可以针对特定命令请求帮助，例如 `help set` 在浏览器中打开，或者 `man set` 在终端中查看。

```
> man set
set - handle shell variables
  Synopsis...

```

To open this section, use `help getting-help`.

​	要打开此部分，请使用 `help getting-help`。

Fish works by running commands, which are often also installed on your computer. Usually these commands also provide help in the man system, so you can get help for them there. Try `man ls` to get help on your computer’s `ls` command.

​	fish 通过运行命令来工作，而这些命令通常也已安装在你的计算机上。通常这些命令也在手册系统中提供帮助，因此你可以在那找到帮助。尝试 `man ls` 以获取有关你计算机上的 `ls` 命令的帮助。

## 语法高亮 Syntax Highlighting

You’ll quickly notice that fish performs syntax highlighting as you type. Invalid commands are colored red by default:

​	你很快会注意到 fish 在你输入时执行语法高亮。无效命令默认显示为红色：

```
> /bin/mkd
```

A command may be invalid because it does not exist, or refers to a file that you cannot execute. When the command becomes valid, it is shown in a different color:

​	一个命令可能无效的原因是它不存在，或者它指向了你无法执行的文件。当命令有效时，它会以不同的颜色显示：

```
> /bin/mkdir

```

Valid file paths are underlined as you type them:

​	有效的文件路径在输入时会被下划线标记：

```
> cat ~/somefi
```

This tells you that there exists a file that starts with `somefi`, which is useful feedback as you type.

​	这表明存在一个以 `somefi` 开头的文件，这在你输入时是有用的反馈。

These colors, and many more, can be changed by running `fish_config`, or by modifying [color variables](https://fishshell.com/docs/current/interactive.html#variables-color) directly.

​	这些颜色以及更多选项可以通过运行 `fish_config` 进行更改，或者通过直接修改[颜色变量](https://fishshell.com/docs/current/interactive.html#variables-color)。

For example, if you want to disable (almost) all coloring:

​	例如，如果你想禁用（几乎）所有的颜色：

```
fish_config theme choose none

```

This picks the “none” theme. To see all thes:

​	这会选择 "none" 主题。要查看所有主题：

```
fish_config theme show

```

Just running `fish_config` will open up a browser interface that allows you to pick from the available themes.

​	只需运行 `fish_config` 将打开一个浏览器界面，允许你从可用主题中进行选择。

## 通配符 Wildcards

Fish supports the familiar wildcard `*`. To list all JPEG files:

​	fish 支持常见的通配符 `*`。列出所有 JPEG 文件：

```
> ls *.jpg
lena.jpg
meena.jpg
santa maria.jpg

```

You can include multiple wildcards:

​	你可以包含多个通配符：

```
> ls l*.p*
lena.png
lesson.pdf

```

The recursive wildcard `**` searches directories recursively:

​	递归通配符 `**` 可以递归搜索目录：

```
> ls /var/**.log
/var/log/system.log
/var/run/sntp.log

```

If that directory traversal is taking a long time, you can Conol+C out of it.

​	如果目录遍历耗时过长，你可以使用 Control+C 中断它。

For more, see [Wildcards](https://fishshell.com/docs/current/language.html#expand-wildcard).

​	更多内容请参见 [通配符](https://fishshell.com/docs/current/language.html#expand-wildcard

## 管道与重定向 Pipes and Redirections

You can pipe between commands with the usual vertical bar:

​	你可以使用常见的竖线符 `|` 在命令之间使用管道：

```
> echo hello world | wc
      1       2      12

```

stdin and stdout can be redirected via the familiar `<` and `>`. stderr is redirected with a `2>`.

​	stdin 和 stdout 可以通过常见的 `<` 和 `>` 进行重定向。stderr 可以用 `2>` 进行重定向。

```
> grep fish < /etc/shells > ~/output.txt 2> ~/errors.txt

```

To redirect stdout and stderr into one file, you can use `&>`:

​	要将 stdout 和 stderr 重定向到同一个文件，可以使用 `&>`：

```
> make &> make_output.txt

```

For more, see [Input and output redirections](https://fishshell.com/docs/current/language.html#redirects) and [Pipes](https://fishshell.com/docs/current/language.html#pipes).

​	更多内容请参见 [输入输出重定向](https://fishshell.com/docs/current/language.html#redirects) 和 [管道](https://fishshell.com/docs/current/language.html#pipes)。

## 自动建议 Autosuggestions

As you type fish will suggest commands to the right of the cursor, in gray. For example:

​	在你输入时，fish 会在光标右侧以灰色建议命令。例如：

```
> /bin/hostname
```

It knows about paths and options:

​	它了解路径和选项：

```
> grep --ignore-case
```

And history too. Type a command once, and you can re-summon it by just typing a few letters:

​	它还会记住历史记录。输入一次命令后，只需输入几个字母就可以再次调用它：

```
> rsync -avze ssh . myname@somelonghost.com:/some/long/path/doo/dee/doo/dee/doo
```

To accept the autosuggestion, hit → (right arrow) or Control+F. To accept a single word of the autosuggestion, Alt+→ (right arrow). If the autosuggestion is not what you want, just ignore it.

​	要接受自动建议，→（右箭头）或 Control+F。要接受自动建议的一个单词，按 Alt+→（右箭头）。如果自动建议不是你想要的，只需忽略它。

If you don’t like autosuggestions, you can disable them by setting `$fish_autosuggestion_enabled` to 0:

​	如果你不喜欢自动建议，可以通过设置 `$fish_autosuggestion_enabled` 为 0 来禁用它：

```
set -g fish_autosuggestion_enabled 0

```

## Tab 补全 Tab Completions

A rich set of tab completions work “out of the box”.

​	丰富的 Tab 补全功能可以“开箱即用”。

Press Tab and fish will attempt to complete the command, argument, or path:

​	按下 Tab 键，fish 会尝试补全命令、参数或路径：

```
> /priTab => /private/
```

If there’s more than one possibility, it will list them:

​	如果有多个可能性，它会列出它们：

```
> ~/stuff/sTab
~/stuff/script.sh  (command)  ~/stuff/sources/  (directory)
```

Hit tab again to cycle through the possibilities. The part in parentheses there (that “command” and “directory”) is the completion description. It’s just a short hint to explain what kind of argument it is.

​	再次按下 Tab 键可循环浏览可能性。括号中的部分（如 "command" 和 "directory"）是补全描述。它只是一个简短的提示，用来解释这是什么类型的参数。

fish can also complete many commands, like git branches:

​	fish 还可以补全许多命令，例如 git 分支：

```
> git merge prTab => git merge prompt_designer
> git checkout bTab
builtin_list_io_merge (Branch)  builtin_set_color (Branch) busted_events (Tag)
```

Try hitting tab and see what fish can do!

​	试着按下 Tab 键，看看 fish 能做什么！

## 变量 Variables

Like other shells, a dollar sign followed by a variable name is replaced with the value of that variable:

​	像其他 shell 一样，变量名前加上美元符号会被替换为该变量的值：

```
> echo My home directory is $HOME
My home directory is /home/tutorial

```

This is known as variable substitution, and it also happens in double quotes, but not single quotes:

​	这被称为变量替换，且它同样适用于双引号中，但在单引号中不会发生替换：

```
> echo "My current directory is $PWD"
My current directory is /home/tutorial
> echo 'My current directory is $PWD'
My current directory is $PWD

```

Unlike other shells, fish has an ordinary command to set variables: `set`, which takes a variable name, and then its value.

​	与其他 shell 不同，fish 有一个普通的命令来设置变量：`set`，它接受一个变量名，然后是它的值。

```
> set name 'Mister Noodle'
> echo $name
Mister Noodle

```

(Notice the quotes: without them, `Mister` and `Noodle` would have been separate arguments, and `$name` would have been made into a list of two elements.)

​	（注意引号：如果没有引号，`Mister` 和 `Noodle` 会被视为两个独立的参数，`$name` 会变成一个包含两个元素的列表。）

Unlike other shells, variables are not further split after substitution:

​	与其他 shell 不同，变量在替换后不会进一步分割：

```
> mkdir $name
> ls
Mister Noodle

```

In bash, this would have created two directories “Mister” and “Noodle”. In fish, it created only one: the variable had the value “Mister Noodle”, so that is the argument that was passed to `mkdir`, spaces and all.

​	在 bash 中，这会创建两个目录 "Mister" 和 "Noodle"。但在 fish 中，它只创建了一个目录："Mister Noodle"，因为变量的值是 “Mister Noodle”，所以 `mkdir` 接收到的参数就是带有空格的完整字符串。

You can erase (or “delete”) a variable with `-e` or `--erase`

​	你可以使用 `-e` 或 `--erase` 来删除（或“清除”）一个变量：

```
> set -e MyVariable
> env | grep MyVariable
(no output)

```

For more, see [Variable expansion](https://fishshell.com/docs/current/language.html#expand-variable).

​	更多内容请参见 [变量扩展](https://fishshell.com/docs/current/language.html#expand-variable)。

## 导出（Shell 变量） Exports (Shell Variables)

Sometimes you need to have a variable available to an external command, often as a setting. For example many programs like `git` or `man` read the `$PAGER` variable to figure out your preferred pager (the program that lets you scroll text). Other variables used like this include `$BROWSER`, `$LANG` (to configure your language) and `$PATH`. You’ll note these are written in ALLCAPS, but that’s just a convention.

​	有时候你需要让变量可用于外部命令，通常作为一种设置。例如，许多程序如 `git` 或 `man` 使用 `$PAGER` 变量来确定你首选的分页器（显示长文本的程序）。其他常用的变量包括 `$BROWSER`，`$LANG`（用于配置语言）和 `$PATH`。你会注意到这些变量通常是全大写的，但这只是一个惯例。

To give a variable to an external command, it needs to be “exported”. This is done with a flag to `set`, either `--export` or just `-x`.

​	要将变量提供给外部命令，需要将其“导出”。这可以通过 `set` 命令的 `--export` 或 `-x` 标志来实现。

```
> set -x MyVariable SomeValue
> env | grep MyVariable
MyVariable=SomeValue

```

It can also be unexported with `--unexport` or `-u`.

​	也可以使用 `--unexport` 或 `-u` 取消导出。

This works the other way around as well! If fish is started by something else, it inherits that parents exported variables. So if your terminal emulator starts fish, and it exports `$LANG` set to `en_US.UTF-8`, fish will receive that setting. And whatever started your terminal emulator also gave *it* some variables that it will then pass on unless it specifically decides not to. This is how fish usually receives the values for things like `$LANG`, `$PATH` and `$TERM`, without you having to specify them again.

​	这也可以反过来用！如果 fish 是由其他进程启动的，它会继承父进程导出的变量。所以，如果你的终端模拟器启动了 fish，并导出了设置为 `en_US.UTF-8` 的 `$LANG`，fish 将接收该设置。无论启动你的终端模拟器的是什么进程，它也会将某些变量传递给 fish，除非它明确决定不传递。这就是 fish 通常接收到 `$LANG`、`$PATH` 和 `$TERM` 等变量值的方式，而你不必再次指定它们。

Exported variables can be local or global or universal - “exported” is not a [scope](https://fishshell.com/docs/current/language.html#variables-scope)! Usually you’d make them global via `set -gx MyVariable SomeValue`.

​	导出的变量可以是局部、全局或通用的——“导出”并不是一个 [作用域](https://fishshell.com/docs/current/language.html#variables-scope)！通常，你可以通过 `set -gx MyVariable SomeValue` 将它们设置为全局变量。

For more, see [Exporting variables](https://fishshell.com/docs/current/language.html#variables-export).

​	更多内容请参见 [导出变量](https://fishshell.com/docs/current/language.html#variables-export)。



## 列表 Lists

The `set` command above used quotes to ensure that `Mister Noodle` was one argument. If it had been two arguments, then `name` would have been a list of length 2. In fact, all variables in fish are really lists, that can contain any number of values, or none at all.

​	上面的 `set` 命令使用引号确保 `Mister Noodle` 是一个参数。如果它是两个参数，那么 `name` 将是一个长度为 2 的列表。事实上，fish 中的所有变量实际上都是列表，可以包含任意数量的值，或者为空。

Some variables, like `$PWD`, only have one value. By convention, we talk about that variable’s value, but we really mean its first (and only) value.

​	一些变量（如 `$PWD`）只有一个值。按惯例，我们说这是该变量的值，但实际上是它的第一个（也是唯一一个）值。

Other variables, like `$PATH`, really do have multiple values. During variable expansion, the variable expands to become multiple arguments:

​	其他变量（如 `$PATH`）确实包含多个值。在变量扩展时，该变量会扩展为多个参数：

```
> echo $PATH
/usr/bin /bin /usr/sbin /sbin /usr/local/bin

```

Variables whose name ends in “PATH” are automatically split on colons to become lists. They are joined using colons when exported to subcommands. This is for compatibility with other tools, which expect $PATH to use colons. You can also explicitly add this quirk to a variable with `set --path`, or remove it with `set --unpath`.

​	以 "PATH" 结尾的变量会自动按冒号分割成列表。当导出给子命令时，它们会使用冒号连接。这是为了与其他工具兼容，它们期望 `$PATH` 使用冒号分隔。你还可以使用 `set --path` 显式添加这一特性，或使用 `set --unpath` 移除它。

Lists cannot contain other lists: there is no recursion. A variable is a list of strings, full stop.

​	列表不能包含其他列表：没有递归。一个变量就是一个字符串列表，仅此而已。

Get the length of a list with `count`:

​	使用 `count` 获取列表的长度：

```
> count $PATH
5

```

You can append (or prepend) to a list by setting the list to itself, with some additional arguments. Here we append /usr/local/bin to $PATH:

​	你可以通过设置列表为其自身加上一些附加参数来追加（或前置）到列表中。这里我们将 `/usr/local/bin` 追加到 `$PATH`：

```
> set PATH $PATH /usr/local/bin

```

You can access individual elements with square brackets. Indexing starts at 1 from the beginning, and -1 from the end:

​	你可以使用方括号访问单个元素。索引从 1 开始，倒数从 -1 开始：

```
> echo $PATH
/usr/bin /bin /usr/sbin /sbin /usr/local/bin
> echo $PATH[1]
/usr/bin
> echo $PATH[-1]
/usr/local/bin

```

You can also access ranges of elements, known as “slices”:

​	你也可以访问元素的范围，称为“切片”：

```
> echo $PATH[1..2]
/usr/bin /bin
> echo $PATH[-1..2]
/usr/local/bin /sbin /usr/sbin /bin

```

You can iterate over a list (or a slice) with a for loop:

​	你可以使用 `for` 循环遍历列表（或切片）：

```
for val in $PATH
  echo "entry: $val"
end
# Will print:
# entry: /usr/bin/
# entry: /bin
# entry: /usr/sbin
# entry: /sbin
# entry: /usr/local/bin

```

Lists adjacent to other lists or strings are expanded as [cartesian products](https://fishshell.com/docs/current/language.html#cartesian-product) unless quoted (see [Variable expansion](https://fishshell.com/docs/current/language.html#expand-variable)):

​	与其他列表或字符串相邻的列表在展开时会成为 [笛卡尔积](https://fishshell.com/docs/current/language.html#cartesian-product)，除非它们被引号引起来（参见 [变量扩展](https://fishshell.com/docs/current/language.html#expand-variable)）：

```
> set a 1 2 3
> set 1 a b c
> echo $a$1
1a 2a 3a 1b 2b 3b 1c 2c 3c
> echo $a" banana"
1 banana 2 banana 3 banana
> echo "$a banana"
1 2 3 banana

```

This is similar to [Brace expansion](https://fishshell.com/docs/current/language.html#expand-brace).

​	这类似于 [Brace expansion](https://fishshell.com/docs/current/language.html#expand-brace)。

For more, see [Lists](https://fishshell.com/docs/current/language.html#variables-lists).

​	更多内容请参见 [列表](https://fishshell.com/docs/current/language.html#variables-lists)。

## 命令替换 Command Substitutions

Command substitutions use the output of one command as an argument to another. Unlike other shells, fish does not use backticks `` for command substitutions. Instead, it uses parentheses with or without a dollar:

​	命令替换使用一个命令的输出作为另一个命令的参数。与其他 shell 不同，fish 不使用反引号 `` 来表示命令替换，而是使用带或不带美元符号的括号：

```
> echo In (pwd), running $(uname)
In /home/tutorial, running FreeBSD

```

A common idiom is to capture the output of a command in a variable:

​	一个常见的用法是将命令的输出存储到变量中：

```
> set os (uname)
> echo $os
Linux

```

Command substitutions without a dollar are not expanded within quotes, so the version with a dollar is simpler:

​	不带美元符号的命令替换不会在引号中展开，因此带有美元符号的版本更为简洁：

```
> touch "testing_$(date +%s).txt"
> ls *.txt
testing_1360099791.txt

```

Unlike other shells, fish does not split command substitutions on any whitespace (like spaces or tabs), only newlines. Usually this is a big help because unix commands operate on a line-by-line basis. Sometimes it can be an issue with commands like `pkg-config` that print what is meant to be multiple arguments on a single line. To split it on spaces too, use `string split`.

​	与其他 shell 不同，fish 不会根据空白字符（如空格或制表符）拆分命令替换的输出，只会根据换行符进行拆分。通常这对我们有帮助，因为 Unix 命令通常按行操作。但有时，像 `pkg-config` 这样打印多参数在同一行上的命令可能会引发问题。要按空格进行拆分，可以使用 `string split`。

```
> printf '%s\n' (pkg-config --libs gio-2.0)
-lgio-2.0 -lgobject-2.0 -lglib-2.0
> printf '%s\n' (pkg-config --libs gio-2.0 | string split -n " ")
-lgio-2.0
-lgobject-2.0
-lglib-2.0

```

If you need a command substitutions output as one argument, without any splits, use quoted command substitution:

​	如果你需要命令替换的输出作为一个参数且不进行任何拆分，请使用带引号的命令替换：

```
> echo "first line
second line" > myfile
> set myfile "$(cat myfile)"
> printf '|%s|' $myfile
|first line
second line|

```

For more, see [Command substitution](https://fishshell.com/docs/current/language.html#expand-command-substitution).

​	更多内容请参见 [命令替换](https://fishshell.com/docs/current/language.html#expand-command-substitution)。

## 命令分隔符（分号） Separating Commands (Semicolon)

Like other shells, fish allows multiple commands either on separate lines or the same line.

​	与其他 shell 类似，fish 允许你在同一行或不同行上输入多个命令。

To write them on the same line, use the semicolon (“;”). That means the following two examples are equivalent:

​	要在同一行上输入多个命令，请使用分号（`;`）。这意味着以下两个示例是等效的：

```
echo fish; echo chips

# or
echo fish
echo chips

```

This is useful interactively to enter multiple commands. In a script it’s easier to read if the commands are on separate lines.

​	这在交互式使用时很有用，可以同时输入多个命令。在脚本中，分开书写命令会使代码更易读。

## 退出状态 Exit Status

When a command exits, it returns a status code as a non-negative integer (that’s a whole number >= 0).

​	当命令退出时，它返回一个状态码，即非负整数（即 >= 0 的整数）。

Unlike other shells, fish stores the exit status of the last command in `$status` instead of `$?`.

​	与其他 shell 不同，fish 使用 `$status` 而不是 `$?` 来存储最后一个命令的退出状态。

```
> false
> echo $status
1

```

This indicates how the command fared - 0 usually means success, while the others signify kinds of failure. For instance fish’s `set --query` returns the number of variables it queried that weren’t set - `set --query PATH` usually returns 0, `set --query arglbargl boogagoogoo` usually returns 2.

​	这表示命令执行的结果——0 通常表示成功，其他数字表示各种失败。例如，fish 的 `set --query` 返回它查询的未设置变量的数量——`set --query PATH` 通常返回 0，而 `set --query arglbargl boogagoogoo` 通常返回 2。

There is also a `$pipestatus` list variable for the exit statuses [[1\]](https://fishshell.com/docs/current/tutorial.html#id3) of processes in a pipe.

​	fish 还提供了一个 `$pipestatus` 列表变量，用于存储管道中的所有进程的退出状态。

For more, see [The status variable](https://fishshell.com/docs/current/language.html#variables-status).

​	更多内容请参见 [状态变量](https://fishshell.com/docs/current/language.html#variables-status)。

[[1](https://fishshell.com/docs/current/tutorial.html#id2)] 

or “stati” if you prefer, or “statūs” if you’ve time-travelled from ancient Rome or work as a latin teacher



## 组合器 Combiners (And, Or, Not)

fish supports the familiar `&&` and `||` to combine commands, and `!` to negate them:

​	fish 支持常见的 `&&` 和 `||` 来组合命令，并支持 `!` 来取反命令：

```
> ./configure && make && sudo make install

```

Here, `make` is only executed if `./configure` succeeds (returns 0), and `sudo make install` is only executed if both `./configure` and `make` succeed.

​	这里 `make` 只在 `./configure` 成功时执行，而 `sudo make install` 只在 `./configure` 和 `make` 都成功时执行。

fish also supports [and](https://fishshell.com/docs/current/cmds/and.html), [or](https://fishshell.com/docs/current/cmds/or.html), and [not](https://fishshell.com/docs/current/cmds/not.html). The first two are job modifiers and have lower precedence. Example usage:

​	fish 还支持 [and](https://fishshell.com/docs/current/cmds/and.html)、[or](https://fishshell.com/docs/current/cmds/or.html) 和 [not](https://fishshell.com/docs/current/cmds/not.html)。前两个是作业修饰符，优先级较低。示例用法：

```
> cp file1 file1_bak && cp file2 file2_bak; and echo "Backup successful"; or echo "Backup failed"
Backup failed

```

As mentioned in [the section on the semicolon](https://fishshell.com/docs/current/tutorial.html#tut-semicolon), this can also be written in multiple lines, like so:

​	如 [分号部分](https://fishshell.com/docs/current/tutorial.html#tut-semicolon) 所述，这也可以分多行书写：

```
cp file1 file1_bak && cp file2 file2_bak
and echo "Backup successful"
or echo "Backup failed"

```



## 条件语句 Conditionals (If, Else, Switch)

Use [if](https://fishshell.com/docs/current/cmds/if.html) and [else](https://fishshell.com/docs/current/cmds/else.html) to conditionally execute code, based on the exit status of a command.

​	使用 [if](https://fishshell.com/docs/current/cmds/if.html) 和 [else](https://fishshell.com/docs/current/cmds/else.html) 来根据命令的退出状态有条件地执行代码。

```
if grep fish /etc/shells
    echo Found fish
else if grep bash /etc/shells
    echo Found bash
else
    echo Got nothing
end

```

To compare strings or numbers or check file properties (whether a file exists or is writeable and such), use [test](https://fishshell.com/docs/current/cmds/test.html), like

​	要比较字符串或数字或检查文件属性（如文件是否存在或可写等），请使用 [test](https://fishshell.com/docs/current/cmds/test.html)，例如：

```
if test "$fish" = "flounder"
    echo FLOUNDER
end

# or

if test "$number" -gt 5
    echo $number is greater than five
else
    echo $number is five or less
end

# or

# This test is true if the path /etc/hosts exists
# - it could be a file or directory or symlink (or possibly something else).
if test -e /etc/hosts
    echo We most likely have a hosts file
else
    echo We do not have a hosts file
end

```

[Combiners](https://fishshell.com/docs/current/tutorial.html#tut-combiners) can also be used to make more complex conditions, like

​	你也可以使用 [组合器](https://fishshell.com/docs/current/tutorial.html#tut-combiners) 来构建更复杂的条件，例如：

```
if command -sq fish; and grep fish /etc/shells
    echo fish is installed and configured
end

```

For even more complex conditions, use [begin](https://fishshell.com/docs/current/cmds/begin.html) and [end](https://fishshell.com/docs/current/cmds/end.html) to group parts of them.

​	对于更复杂的条件语句，可以使用 [begin](https://fishshell.com/docs/current/cmds/begin.html) 和 [end](https://fishshell.com/docs/current/cmds/end.html) 来分组。

There is also a [switch](https://fishshell.com/docs/current/cmds/switch.html) command:

​	fish 还支持 [switch](https://fishshell.com/docs/current/cmds/switch.html) 命令：

```
switch (uname)
case Linux
    echo Hi Tux!
case Darwin
    echo Hi Hexley!
case FreeBSD NetBSD DragonFly
    echo Hi Beastie!
case '*'
    echo Hi, stranger!
end

```

As you see, [case](https://fishshell.com/docs/current/cmds/case.html) does not fall through, and can accept multiple arguments or (quoted) wildcards.

​	如你所见，`case` 不会自动向下传递，并且可以接受多个参数或（带引号的）通配符。

For more, see [Conditions](https://fishshell.com/docs/current/language.html#syntax-conditional).

​	更多内容请参见 [条件语句](https://fishshell.com/docs/current/language.html#syntax-conditional)。

## 函数 Functions

A fish function is a list of commands, which may optionally take arguments. Unlike other shells, arguments are not passed in “numbered variables” like `$1`, but instead in a single list `$argv`. To create a function, use the [function](https://fishshell.com/docs/current/cmds/function.html) builtin:

​	fish 的函数是一组命令，它们可以选择性地接收参数。与其他 shell 不同，参数不会通过类似 `$1` 这样的 "编号变量" 传递，而是通过一个名为 `$argv` 的单一列表传递。要创建一个函数，请使用 [function](https://fishshell.com/docs/current/cmds/function.html) 内置命令：

```
function say_hello
    echo Hello $argv
end
say_hello
# prints: Hello
say_hello everybody!
# prints: Hello everybody!

```

Unlike other shells, fish does not have aliases or special prompt syntax. Functions take their place. [[2\]](https://fishshell.com/docs/current/tutorial.html#id5)

​	与其他 shell 不同，fish 没有别名（alias）或特殊的提示符语法。函数代替了它们的作用。

You can list the names of all functions with the [functions](https://fishshell.com/docs/current/cmds/functions.html) builtin (note the plural!). fish starts out with a number of functions:

​	你可以通过 [functions](https://fishshell.com/docs/current/cmds/functions.html) 内置命令列出所有函数的名称（注意这个是复数形式！）。fish 起初有很多函数：

```
> functions
N_, abbr, alias, bg, cd, cdh, contains_seq, dirh, dirs, disown, down-or-search, edit_command_buffer, export, fg, fish_add_path, fish_breakpoint_prompt, fish_clipboard_copy, fish_clipboard_paste, fish_config, fish_default_key_bindings, fish_default_mode_prompt, fish_git_prompt, fish_hg_prompt, fish_hybrid_key_bindings, fish_indent, fish_is_root_user, fish_job_summary, fish_key_reader, fish_md5, fish_mode_prompt, fish_npm_helper, fish_opt, fish_print_git_action, fish_print_hg_root, fish_prompt, fish_sigtrap_handler, fish_svn_prompt, fish_title, fish_update_completions, fish_vcs_prompt, fish_vi_cursor, fish_vi_key_bindings, funced, funcsave, grep, help, history, hostname, isatty, kill, la, ll, ls, man, nextd, open, popd, prevd, prompt_hostname, prompt_pwd, psub, pushd, realpath, seq, setenv, suspend, trap, type, umask, up-or-search, vared, wait

```

You can see the source for any function by passing its name to `functions`:

​	你可以通过将函数名称传递给 `functions` 来查看函数的源代码：

```
> functions ls
function ls --description 'List contents of directory'
    command ls -G $argv
end

```

For more, see [Functions](https://fishshell.com/docs/current/language.html#syntax-function).

​	更多内容请参见 [函数](https://fishshell.com/docs/current/language.html#syntax-function)。

[[2](https://fishshell.com/docs/current/tutorial.html#id4)] 

There is a function called [alias](https://fishshell.com/docs/current/cmds/alias.html), but it’s just a shortcut to make functions. fish also provides [abbreviations](https://fishshell.com/docs/current/interactive.html#abbreviations), through the [abbr](https://fishshell.com/docs/current/cmds/abbr.html#cmd-abbr) command.

​	fish 也有一个名为 [alias](https://fishshell.com/docs/current/cmds/alias.html) 的函数，但它只是创建函数的快捷方式。fish 还提供了通过 [abbr](https://fishshell.com/docs/current/cmds/abbr.html#cmd-abbr) 命令实现的 [缩写](https://fishshell.com/docs/current/interactive.html#abbreviations)。

## 循环 Loops

While loops:

​	while 循环：

```
while true
    echo "Loop forever"
end
# Prints:
# Loop forever
# Loop forever
# Loop forever
# yes, this really will loop forever. Unless you abort it with ctrl-c.

```

For loops can be used to iterate over a list. For example, a list of files:

​	for 循环可以用于遍历一个列表。例如，遍历一个文件列表：

```
for file in *.txt
    cp $file $file.bak
end

```

Iterating over a list of numbers can be done with `seq`:

​	你可以使用 `seq` 来迭代一个数字列表：

```
for x in (seq 5)
    touch file_$x.txt
end

```

For more, see [Loops and blocks](https://fishshell.com/docs/current/language.html#syntax-loops-and-blocks).

​	更多内容请参见 [循环和块](https://fishshell.com/docs/current/language.html#syntax-loops-and-blocks)。

## 提示符 Prompt

Unlike other shells, there is no prompt variable like `PS1`. To display your prompt, fish executes the [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) function and uses its output as the prompt. And if it exists, fish also executes the [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) function and uses its output as the right prompt.

​	与其他 shell 不同，fish 没有类似 `PS1` 的提示符变量。要显示你的提示符，fish 会执行 [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) 函数并使用它的输出作为提示符。如果存在 [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) 函数，fish 也会执行它，并将其输出作为右侧提示符。

You can define your own prompt from the command line:

​	你可以直接从命令行定义自己的提示符：

```
> function fish_prompt; echo "New Prompt % "; end
New Prompt % _

```

Then, if you are happy with it, you can save it to disk by typing `funcsave fish_prompt`. This saves the prompt in `~/.config/fish/functions/fish_prompt.fish`. (Or, if you want, you can create that file manually from the start.)

​	如果你对此满意，可以通过输入 `funcsave fish_prompt` 将其保存到磁盘。这样会将提示符保存到 `~/.config/fish/functions/fish_prompt.fish` 文件中。（或者你可以直接从头手动创建该文件。）

Multiple lines are OK. Colors can be set via [set_color](https://fishshell.com/docs/current/cmds/set_color.html), passing it named ANSI colors, or hex RGB values:

​	多行提示符是可以的。可以通过 [set_color](https://fishshell.com/docs/current/cmds/set_color.html) 设置颜色，传递命名的 ANSI 颜色或十六进制 RGB 值：

```
function fish_prompt
    set_color purple
    date "+%m/%d/%y"
    set_color F00
    echo (pwd) '>' (set_color normal)
end

```

This prompt would look like:

​	这个提示符的显示效果为：

```
02/06/13
/home/tutorial > _
```

You can choose among some sample prompts by running `fish_config` for a web UI or `fish_config prompt` for a simpler version inside your terminal.

​	你可以通过运行 `fish_config` 选择一些示例提示符，或者通过运行 `fish_config prompt` 在终端内选择一个更简单的版本。

## $PATH

`$PATH` is an environment variable containing the directories that fish searches for commands. Unlike other shells, $PATH is a [list](https://fishshell.com/docs/current/tutorial.html#tut-lists), not a colon-delimited string.

​	`$PATH` 是一个包含 fish 搜索命令的目录列表的环境变量。与其他 shell 不同，$PATH 是一个 [列表](https://fishshell.com/docs/current/tutorial.html#tut-lists)，而不是一个以冒号分隔的字符串。

Fish takes care to set `$PATH` to a default, but typically it is just inherited from fish’s parent process and is set to a value that makes sense for the system - see [Exports](https://fishshell.com/docs/current/tutorial.html#tut-exports).

​	fish 会确保为 `$PATH` 设置一个默认值，但通常它只是继承自 fish 的父进程，并被设置为对系统有意义的值——参见 [导出变量](https://fishshell.com/docs/current/tutorial.html#tut-exports)。

To prepend /usr/local/bin and /usr/sbin to `$PATH`, you can write:

​	要将 `/usr/local/bin` 和 `/usr/sbin` 添加到 `$PATH` 的开头，你可以写：

```
> set PATH /usr/local/bin /usr/sbin $PATH

```

To remove /usr/local/bin from `$PATH`, you can write:

​	要从 `$PATH` 中移除 `/usr/local/bin`，你可以写：

```
> set PATH (string match -v /usr/local/bin $PATH)

```

For compatibility with other shells and external commands, $PATH is a [path variable](https://fishshell.com/docs/current/language.html#variables-path), and so will be joined with colons (not spaces) when you quote it:

​	为了兼容其他 shell 和外部命令，$PATH 是一个 [路径变量](https://fishshell.com/docs/current/language.html#variables-path)，因此在你引用它时会用冒号（而不是空格）连接：

```
> echo "$PATH"
/usr/local/sbin:/usr/local/bin:/usr/bin

```

and it will be exported like that, and when fish starts it splits the $PATH it receives into a list on colon.

​	fish 启动时，会将它收到的 $PATH 拆分为一个列表，并按冒号分隔。

You can do so directly in `config.fish`, like you might do in other shells with `.profile`. See [this example](https://fishshell.com/docs/current/tutorial.html#path-example).

​	你可以直接在 `config.fish` 中这样做，类似于其他 shell 中的 `.profile`。请参见 [这个例子](https://fishshell.com/docs/current/tutorial.html#path-example)。

A faster way is to use the [fish_add_path](https://fishshell.com/docs/current/cmds/fish_add_path.html) function, which adds given directories to the path if they aren’t already included. It does this by modifying the `$fish_user_paths` [universal variable](https://fishshell.com/docs/current/tutorial.html#tut-universal), which is automatically prepended to `$PATH`. For example, to permanently add `/usr/local/bin` to your `$PATH`, you could write:

​	一种更快的方式是使用 [fish_add_path](https://fishshell.com/docs/current/cmds/fish_add_path.html) 函数，它会在给定目录未被包含时添加到路径中。它通过修改 `$fish_user_paths` [全局变量](https://fishshell.com/docs/current/tutorial.html#tut-universal) 实现，这个变量会自动添加到 `$PATH` 的开头。例如，要永久添加 `/usr/local/bin` 到你的 `$PATH`，你可以写：

```
> fish_add_path /usr/local/bin

```

The advantage is that you don’t have to go mucking around in files: just run this once at the command line, and it will affect the current session and all future instances too. You can also add this line to [config.fish](https://fishshell.com/docs/current/tutorial.html#tut-config), as it only adds the component if necessary.

​	优点是你不需要在文件中反复编辑：只需在命令行中运行一次，它将影响当前会话和所有未来的实例。你也可以将这行代码添加到 [config.fish](https://fishshell.com/docs/current/tutorial.html#tut-config) 中，因为它只会在必要时添加组件。

Or you can modify $fish_user_paths yourself, but you should be careful *not* to append to it unconditionally in config.fish, or it will grow longer and longer.

​	你也可以手动修改 $fish_user_paths，但你应该注意不要在 config.fish 中无条件地追加它，否则它会变得越来越长。



## 启动（在哪里找到 .bashrc？） Startup (Where’s .bashrc?)

Fish starts by executing commands in `~/.config/fish/config.fish`. You can create it if it does not exist.

​	fish 启动时会执行 `~/.config/fish/config.fish` 中的命令。如果该文件不存在，你可以创建它。

It is possible to directly create functions and variables in `config.fish` file, using the commands shown above. For example:

​	你可以直接在 `config.fish` 文件中创建函数和变量，使用上面展示的命令。例如：

```
> cat ~/.config/fish/config.fish

set -x PATH $PATH /sbin/

function ll
    ls -lh $argv
end

```

However, it is more common and efficient to use autoloading functions and universal variables.

​	不过，更常见和高效的方法是使用自动加载函数和全局变量。

If you want to organize your configuration, fish also reads commands in .fish files in `~/.config/fish/conf.d/`. See [Configuration Files](https://fishshell.com/docs/current/language.html#configuration) for the details.

​	如果你想组织配置，fish 也会读取 `~/.config/fish/conf.d/` 中的 .fish 文件。有关详细信息，请参见 [配置文件](https://fishshell.com/docs/current/language.html#configuration)。

## 自动加载函数 Autoloading Functions

When fish encounters a command, it attempts to autoload a function for that command, by looking for a file with the name of that command in `~/.config/fish/functions/`.

​	当 fish 遇到一个命令时，它会尝试自动加载该命令的函数，通过在 `~/.config/fish/functions/` 中查找与命令同名的文件来实现。

For example, if you wanted to have a function `ll`, you would add a text file `ll.fish` to `~/.config/fish/functions`:

​	例如，如果你想创建一个 `ll` 函数，你可以将一个名为 `ll.fish` 的文本文件添加到 `~/.config/fish/functions/` 目录中：

```
> cat ~/.config/fish/functions/ll.fish
function ll
    ls -lh $argv
end

```

This is the preferred way to define your prompt as well:

​	这是定义你的提示符的首选方式：

```
> cat ~/.config/fish/functions/fish_prompt.fish
function fish_prompt
    echo (pwd) "> "
end

```

See the documentation for [funced](https://fishshell.com/docs/current/cmds/funced.html) and [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html) for ways to create these files automatically, and [$fish_function_path](https://fishshell.com/docs/current/language.html#syntax-function-autoloading) to control their location.

​	参见 [funced](https://fishshell.com/docs/current/cmds/funced.html) 和 [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html) 的文档，了解如何自动创建这些文件，以及如何通过 [$fish_function_path](https://fishshell.com/docs/current/language.html#syntax-function-autoloading) 控制它们的位置。

## 全局变量 Universal Variables

A universal variable is a variable whose value is shared across all instances of fish, now and in the future – even after a reboot. You can make a variable universal with `set -U`:

​	全局变量是一个值在所有 fish 实例中共享的变量，即使重新启动后依然有效。你可以使用 `set -U` 来将变量设为全局变量：

```
> set -U EDITOR vim

```

Now in another shell:

​	现在在另一个 shell 中：

```
> echo $EDITOR
vim

```

## 想了解更多？ Ready for more?

If you want to learn more about fish, there is [lots of detailed documentation](https://fishshell.com/docs/current/index.html#intro), the [official gitter channel](https://gitter.im/fish-shell/fish-shell), an [official mailing list](https://lists.sourceforge.net/lists/listinfo/fish-users), and the [github page](https://github.com/fish-shell/fish-shell/).

​	如果你想深入学习 fish，可以查看[丰富的详细文档](https://fishshell.com/docs/current/index.html#intro)、访问[官方 Gitter 频道](https://gitter.im/fish-shell/fish-shell)、加入[官方邮件列表](https://lists.sourceforge.net/lists/listinfo/fish-users)，或者浏览 [GitHub 页面](https://github.com/fish-shell/fish-shell/)。