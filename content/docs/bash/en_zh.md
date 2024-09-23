+++
title = "英中对照版——Bash参考手册"
date = 2023-07-19T10:33:16+08:00
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++



# Bash Reference Manual - Bash参考手册

> 原文：[https://www.gnu.org/software/bash/manual/bash.html](https://www.gnu.org/software/bash/manual/bash.html)



# Bash特性 - Bash Features

This text is a brief description of the features that are present in the Bash shell (version 5.2, 19 September 2022). The Bash home page is http://www.gnu.org/software/bash/.

​	本文是对Bash Shell（版本5.2，2022年9月19日）中的特性的简要描述。Bash的主页是http://www.gnu.org/software/bash/。

This is Edition 5.2, last updated 19 September 2022, of The GNU Bash Reference Manual, for `Bash`, Version 5.2.

​	本手册是Bash参考手册5.2版，最近更新于2022年9月19日，适用于`Bash`版本5.2。

Bash contains features that appear in other popular shells, and some features that only appear in Bash. Some of the shells that Bash has borrowed concepts from are the Bourne Shell (sh), the Korn Shell (ksh), and the C-shell (csh and its successor, tcsh). The following menu breaks the features up into categories, noting which features were inspired by other shells and which are specific to Bash.

​	Bash包含其他流行Shell中的特性，还有一些只在Bash中出现的特性。Bash借鉴了其他Shell的概念，包括Bourne Shell（sh）、Korn Shell（ksh）和C Shell（csh及其后继者tcsh）。下面的菜单将这些特性分成了几个类别，并指出哪些特性受其他Shell启发，哪些特性是特定于Bash的。

This manual is meant as a brief introduction to features found in Bash. The Bash manual page should be used as the definitive reference on shell behavior.

​	本手册旨在对Bash中的特性进行简要介绍。Bash手册页应作为关于Shell行为的权威参考。



## 1 简介




### 1.1 什么是 Bash？

Bash is the shell, or command language interpreter, for the GNU operating system. The name is an acronym for the `Bourne-Again SHell`, a pun on Stephen Bourne, the author of the direct ancestor of the current Unix shell `sh`, which appeared in the Seventh Edition Bell Labs Research version of Unix.

​	Bash是GNU操作系统的shell或命令语言解释器。其名称是`Bourne-Again SHell`的首字母缩写，是对当前Unix shell  `sh`的直接祖先的作者Stephen Bourne的一个双关语，该shell出现在第七版贝尔实验室研究版Unix中。

Bash is largely compatible with `sh` and incorporates useful features from the Korn shell `ksh` and the C shell `csh`. It is intended to be a conformant implementation of the IEEE POSIX Shell and Tools portion of the IEEE POSIX specification (IEEE Standard 1003.1). It offers functional improvements over `sh` for both interactive and programming use.

​	Bash与`sh`基本兼容，并吸收了Korn shell（`ksh`）和C shell（`csh`）中的有用特性。它旨在成为IEEE POSIX Shell and Tools部分（IEEE标准1003.1）的一个符合实现。对于交互和编程使用，它比sh提供了功能上的改进。

While the GNU operating system provides other shells, including a version of `csh`, Bash is the default shell. Like other GNU software, Bash is quite portable. It currently runs on nearly every version of Unix and a few other operating systems - independently-supported ports exist for MS-DOS, OS/2, and Windows platforms.

​	尽管GNU操作系统提供了其他shell，包括`csh`的版本，但Bash是默认的shell。与其他GNU软件一样，Bash非常易于移植。它目前可以运行在几乎所有版本的Unix和一些其他操作系统上，也有独立支持的端口适用于MS-DOS、OS/2和Windows平台。





### 1.2 什么是 shell？

At its base, a shell is simply a macro processor that executes commands. The term macro processor means functionality where text and symbols are expanded to create larger expressions.

​	从根本上说，shell只是一个执行命令的宏处理器。宏处理器是指将文本和符号扩展以创建更大表达式的功能。

A Unix shell is both a command interpreter and a programming language. As a command interpreter, the shell provides the user interface to the rich set of GNU utilities. The programming language features allow these utilities to be combined. Files containing commands can be created, and become commands themselves. These new commands have the same status as system commands in directories such as /bin, allowing users or groups to establish custom environments to automate their common tasks.

​	Unix shell既是命令解释器，也是一种编程语言。作为命令解释器，shell为用户接口提供了丰富的GNU工具集。编程语言的特性允许组合这些实用程序。可以创建包含命令的文件，并使其成为命令本身。这些新命令在/bin等目录中具有与系统命令相同的状态，允许用户或组建立自定义环境来自动化常见任务。

Shells may be used interactively or non-interactively. In interactive mode, they accept input typed from the keyboard. When executing non-interactively, shells execute commands read from a file.

​	shell可以用于交互或非交互使用。在交互模式下，它接受从键盘输入的命令。在非交互模式下，shell执行从文件中读取的命令。

A shell allows execution of GNU commands, both synchronously and asynchronously. The shell waits for synchronous commands to complete before accepting more input; asynchronous commands continue to execute in parallel with the shell while it reads and executes additional commands. The *redirection* constructs permit fine-grained control of the input and output of those commands. Moreover, the shell allows control over the contents of commands' environments.

​	shell允许同步和异步地执行GNU命令。在等待同步命令完成之前，shell会等待以接受更多输入；异步命令在shell读取和执行其他命令时继续并行执行。*重定向*构造允许对这些命令的输入和输出进行精细控制。此外，shell还允许控制命令环境的内容。

Shells also provide a small set of built-in commands (*builtins*) implementing functionality impossible or inconvenient to obtain via separate utilities. For example, `cd`, `break`, `continue`, and `exec` cannot be implemented outside of the shell because they directly manipulate the shell itself. The `history`, `getopts`, `kill`, or `pwd` builtins, among others, could be implemented in separate utilities, but they are more convenient to use as builtin commands. All of the shell builtins are described in subsequent sections.

​	Shell还提供了一小组内置命令（*builtins*），用于实现通过独立实用程序无法实现或不方便实现的功能。例如，`cd`、`break`、`continue`和`exec`无法在shell外部实现，因为它们直接操作shell本身。`history`、`getopts`、`kill`或`pwd`等内置命令可以实现为独立实用程序，但作为内置命令使用更加方便。本手册后续的章节将介绍所有shell内置命令。

While executing commands is essential, most of the power (and complexity) of shells is due to their embedded programming languages. Like any high-level language, the shell provides variables, flow control constructs, quoting, and functions.

​	虽然执行命令至关重要，但shell的大部分功能（和复杂性）都源于其嵌入的编程语言。与任何高级语言一样，shell提供变量、流程控制结构、引用和函数。

Shells offer features geared specifically for interactive use rather than to augment the programming language. These interactive features include job control, command line editing, command history and aliases. Each of these features is described in this manual.

​	Shell提供的功能主要面向交互使用，而不是为编程语言增加功能。这些交互功能包括作业控制、命令行编辑、命令历史记录和别名。本手册中将介绍每个功能的详细信息。





## 2 定义

These definitions are used throughout the remainder of this manual.

​	本手册的其余部分将使用以下定义。

- `POSIX`

  A family of open system standards based on Unix. Bash is primarily concerned with the Shell and Utilities portion of the POSIX 1003.1 standard.

  基于Unix的一系列开放系统标准。Bash主要与POSIX 1003.1标准的Shell and Utilities部分相关。

- `blank`

  A space or tab character.

  空格或制表符字符。

- `builtin`

  A command that is implemented internally by the shell itself, rather than by an executable program somewhere in the file system.

  由shell本身内部实现的命令，而不是由文件系统中的可执行程序实现的命令。

- `control operator`

  A `token` that performs a control function. It is a `newline` or one of the following: `||`, `&&`, `&`, `;`, `;;`, `;&`, `;;&`, `|`, `|&`, `(`, or `)`.

  执行控制功能的`token`。它是`换行符`或以下之一：`||`、`&&`、`&`、`;`、`;;`、`;&`、`;;&`、`|`、`|&`、`(`或`)`。

- `exit status`

  The value returned by a command to its caller. The value is restricted to eight bits, so the maximum value is 255.

  命令返回给其调用者的值。该值限制为8位，因此最大值为255。

- `field`

  A unit of text that is the result of one of the shell expansions. After expansion, when executing a command, the resulting fields are used as the command name and arguments.

  一段文本单元，是shell扩展的结果之一。在执行命令时，生成的字段用作命令名称和参数。

- `filename`

  A string of characters used to identify a file.

  用于标识文件的字符串。

- `job`

  A set of processes comprising a pipeline, and any processes descended from it, that are all in the same process group.

  由一组进程组成的流水线及其所有派生进程，它们都属于同一个进程组。

- `job control`

  A mechanism by which users can selectively stop (suspend) and restart (resume) execution of processes.

  用户可以选择停止（挂起）和重新启动（恢复）进程执行的机制。

- `metacharacter`

  A character that, when unquoted, separates words. A metacharacter is a `space`, `tab`, `newline`, or one of the following characters: `|`, `&`, `;`, `(`, `)`, `<`, or `>`.

  未引用时用于分隔单词的字符。元字符包括空格、制表符、换行符，以及以下字符：`|`、`&`、`;`、`(`、`)`、`<`或`>`。

- `name`

  A `word` consisting solely of letters, numbers, and underscores, and beginning with a letter or underscore. `Name`s are used as shell variable and function names. Also referred to as an `identifier`.

  由字母、数字和下划线组成的单词，以字母或下划线开头。`name`被用作shell变量和函数的名称。也被称为“标识符”。

- `operator`

  A `control operator` or a `redirection operator`. See [Redirections](#36-重定向), for a list of redirection operators. Operators contain at least one unquoted `metacharacter`.

  是控制操作符或重定向操作符。请参阅[Redirections](#36-重定向)获取重定向操作符的列表。操作符包含至少一个未引用的`metacharacter`。

- `process group`

  A collection of related processes each having the same process group ID.

  一组相关的进程，每个进程具有相同的进程组ID。

- `process group ID`

  A unique identifier that represents a `process group` during its lifetime.

  在其生命周期中代表`process group`的唯一标识符。

- `reserved word`

  A `word` that has a special meaning to the shell. Most reserved words introduce shell flow control constructs, such as `for` and `while`.

  一种对shell具有特殊含义的`word`。大多数保留字引入了shell流控制结构，例如`for`和`while`。

- `return status`

  A synonym for `exit status`.

  `exit status`的同义词

- `signal`

  A mechanism by which a process may be notified by the kernel of an event occurring in the system.

  一种机制，用于使进程可以被内核通知系统中发生的事件。

- `special builtin`

  A shell builtin command that has been classified as special by the POSIX standard.

  由POSIX标准分类为特殊的shell内置命令。

- `token`

  A sequence of characters considered a single unit by the shell. It is either a `word` or an `operator`.

  shell中被视为单个单位的字符序列，可以是`word`或`operator`。

- `word`

  A sequence of characters treated as a unit by the shell. Words may not include unquoted `metacharacters`.
  
  shell中被视为单个单位的字符序列。单词不包括未引用的`metacharacters`。





## 3 Shell基本特性



Bash is an acronym for `Bourne-Again SHell`. The Bourne shell is the traditional Unix shell originally written by Stephen Bourne. All of the Bourne shell builtin commands are available in Bash, The rules for evaluation and quoting are taken from the POSIX specification for the `standard` Unix shell.

​	Bash是“Bourne-Again SHell”的首字母缩写。Bourne shell是由Stephen Bourne最初编写的传统Unix shell。Bash提供了Bourne shell的所有内置命令。Bash的求值和引用规则遵循POSIX规范中的“标准”Unix shell。

This chapter briefly summarizes the shell's `building blocks`: commands, control structures, shell functions, shell *parameters*, shell expansions, *redirections*, which are a way to direct input and output from and to named files, and how the shell executes commands.

​	本章简要介绍了shell的“构建块（`building blocks`）”：命令、控制结构、shell函数、shell参数、shell扩展、重定向（一种从命名文件中将输入和输出导向的方法）以及shell如何执行命令。




### 3.1 Shell语法

When the shell reads input, it proceeds through a sequence of operations. If the input indicates the beginning of a comment, the shell ignores the comment symbol (`#`), and the rest of that line.

​	当shell读取输入时，它按照一系列操作进行处理。如果输入指示开始一个注释，shell会忽略注释符号（`#`）及其后的内容。

Otherwise, roughly speaking, the shell reads its input and divides the input into words and operators, employing the quoting rules to select which meanings to assign various words and characters.

​	否则，大致来说，shell会读取输入并将其分割为单词和操作符，使用引用规则来确定对各个单词和字符赋予的含义。

The shell then parses these tokens into commands and other constructs, removes the special meaning of certain words or characters, expands others, redirects input and output as needed, executes the specified command, waits for the command's exit status, and makes that exit status available for further inspection or processing.

​	然后，shell将这些标记解析为命令和其他结构，消除某些单词或字符的特殊含义，对其他单词进行扩展，根据需要重定向输入和输出，执行指定的命令，等待命令的退出状态，并将该退出状态可供进一步检查或处理。



#### 3.1.1 Shell操作

The following is a brief description of the shell's operation when it reads and executes a command. Basically, the shell does the following:

​	以下是shell读取和执行命令时的操作简要描述。基本上，shell会执行以下操作： 

1. Reads its input from a file (see [Shell Scripts](#38-shell-脚本)), from a string supplied as an argument to the -c invocation option (see [Invoking Bash](#61-调用bash)), or from the user's terminal.
2. 从文件中读取输入（参见[Shell脚本](#38-shell-脚本)），或从作为-c调用选项的参数提供的字符串中读取输入（参见[调用Bash](#61-调用bash)），或从用户终端读取输入。#32-shell命令
3. Breaks the input into words and operators, obeying the quoting rules described in [Quoting](#312-引用-quoting). These tokens are separated by `metacharacters`. Alias expansion is performed by this step (see [Aliases](#66-别名)).
4. 按照[引用](#312-引用-quoting)中描述的引用规则，将输入分割为单词和操作符。这些标记由`metacharacters`分隔。此步骤会执行别名扩展（参见[别名](#66-别名)）。
5. Parses the tokens into simple and compound commands (see [Shell Commands](#32-shell命令)).
6. 将标记解析为简单命令和复合命令（参见[Shell命令](#32-shell命令)）。
7. Performs the various shell expansions (see [Shell Expansions](#35-shell-扩展)), breaking the expanded tokens into lists of filenames (see [Filename Expansion](#358-文件名扩展)) and commands and arguments.
8. 执行各种shell扩展（参见[Shell扩展](#35-shell-扩展)），将扩展后的标记分解为文件名列表（参见[文件名扩展](#358-文件名扩展)）以及命令和参数。
9. Performs any necessary redirections (see [Redirections](#36-重定向)) and removes the redirection operators and their operands from the argument list.
10. 执行必要的重定向（参见[重定向](#36-重定向)），并从参数列表中删除重定向操作符及其操作数。
11. Executes the command (see [Executing Commands](#37-执行命令)).
12. 执行命令（参见[执行命令](#37-执行命令)）。
13. Optionally waits for the command to complete and collects its exit status (see [Exit Status](#375-退出状态)).
14. 可选地等待命令完成并收集其退出状态（参见[退出状态](#375-退出状态)）。





#### 3.1.2 引用 Quoting



Quoting is used to remove the special meaning of certain characters or words to the shell. Quoting can be used to disable special treatment for special characters, to prevent reserved words from being recognized as such, and to prevent parameter expansion.

​	引用用于取消shell对某些字符或单词的特殊含义。引用可用于禁用特殊字符的特殊处理，防止保留字被识别为保留字，并防止参数扩展。

Each of the shell metacharacters (see [Definitions](#2-定义)) has special meaning to the shell and must be quoted if it is to represent itself. When the command history expansion facilities are being used (see [History Expansion](#93-历史记录扩展)), the *history expansion* character, usually `!`, must be quoted to prevent history expansion. See [Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities), for more details concerning history expansion.

​	每个shell元字符（参见[定义](#2-定义)）对于shell都具有特殊含义，如果要表示字符本身，则必须对其进行引用。当使用命令历史扩展功能时（参见[历史扩展](#93-历史记录扩展)），通常使用的历史扩展字符（通常是`!`）必须被引用，以防止历史扩展。有关历史扩展的更多详细信息，请参见[Shell历史功能](#91-bash-历史记录功能-bash-history-facilities)。

There are three quoting mechanisms: the *escape character*, single quotes, and double quotes.

​	有三种引用机制：*转义字符*、单引号和双引号。





##### 3.1.2.1 转义字符

A non-quoted backslash `\` is the Bash escape character. It preserves the literal value of the next character that follows, with the exception of `newline`. If a `\newline` pair appears, and the backslash itself is not quoted, the `\newline` is treated as a line continuation (that is, it is removed from the input stream and effectively ignored).

​	一个未被引用的反斜杠（`\`）是Bash的转义字符。它保留紧随其后的下一个字符的原始值，但不包括换行符。如果出现`\newline`对，并且反斜杠本身未被引用，则`\newline`会被视为行继续符（即，它会从输入流中移除并被忽略）。



##### 3.1.2.2 单引号

Enclosing characters in single quotes (`'`) preserves the literal value of each character within the quotes. A single quote may not occur between single quotes, even when preceded by a backslash.

​	用单引号（`'`）括起来的字符会保留括号内每个字符的原始值。单引号不能在单引号内部出现，即使其前面有反斜杠。



##### 3.1.2.3 双引号

Enclosing characters in double quotes (`"`) preserves the literal value of all characters within the quotes, with the exception of `$`, \`, `\`, and, when history expansion is enabled, `!`. When the shell is in POSIX mode (see [Bash POSIX Mode](#611-bash的posix模式)), the `!` has no special meaning within double quotes, even when history expansion is enabled. The characters `$` and \` retain their special meaning within double quotes (see [Shell Expansions](#35-shell-扩展)). The backslash retains its special meaning only when followed by one of the following characters: `$`, \`, `"`, `\`, or `newline`. Within double quotes, backslashes that are followed by one of these characters are removed. Backslashes preceding characters without a special meaning are left unmodified. A double quote may be quoted within double quotes by preceding it with a backslash. If enabled, history expansion will be performed unless an `!` appearing in double quotes is escaped using a backslash. The backslash preceding the `!` is not removed.

​	用双引号（`"`）括起来的字符会保留括号内所有字符的原始值，但会除去`$`、`, `\`和在启用历史扩展的情况下的`!`。在POSIX模式下（参见[Bash POSIX Mode](#611-bash的posix模式)），`!`在双引号内没有特殊含义，即使启用历史扩展。`$`和\`在双引号内保留它们的特殊含义（参见[Shell扩展](#35-shell-扩展)）。反斜杠仅在后面跟着以下字符之一时保留其特殊含义：`$`、\`, `"`、`\`或换行符。在双引号内，后跟这些字符的反斜杠会被移除。没有特殊含义的字符之前的反斜杠会保持不变。双引号内的双引号可以通过在其前面加上反斜杠进行引用。如果启用了历史扩展，除非在双引号内出现的`!`被反斜杠转义，否则会执行历史扩展。前面跟着`!`的反斜杠不会被移除。

The special parameters `*` and `@` have special meaning when in double quotes (see [Shell Parameter Expansion](#353-shell参数扩展)).

​	在双引号内，特殊参数`*`和`@`具有特殊含义（参见[Shell参数扩展](#353-shell参数扩展))。





##### 3.1.2.4 ANSI-C 引用 ANSI-C Quoting



Character sequences of the form $`string` are treated as a special kind of single quotes. The sequence expands to string, with backslash-escaped characters in string replaced as specified by the ANSI C standard. Backslash escape sequences, if present, are decoded as follows:

​	形式为$`string`的字符序列被视为特殊类型的单引号。该序列会根据ANSI C标准进行扩展，其中字符串中的反斜杠转义字符按照指定的规则进行替换。如果存在反斜杠转义序列，则按照以下方式解码：

 

- `\a`

  alert (bell)

  警告（响铃）

- `\b`

  backspace

  退格

- `\e`

- `\E`

  an escape character (not ANSI C)

  转义字符（非ANSI C标准）

- `\f`

  form feed

  换页符

- `\n`

  newline

  换行符

- `\r`

  carriage return

  回车符

- `\t`

  horizontal tab

  水平制表符

- `\v`

  vertical tab

  垂直制表符

- `\\`

  backslash

  反斜杠

- `\'`

  single quote

  单引号

- `\"`

  double quote

  双引号

- `\?`

  question mark

  问号

- `\nnn`

  the eight-bit character whose value is the octal value nnn (one to three octal digits)

  8bit字符，其值为八进制值nnn（一个到三个八进制数字）

- `\xHH`

  the eight-bit character whose value is the hexadecimal value HH (one or two hex digits)

  8bit字符，其值为十六进制值HH（一个或两个十六进制数字）

- `\uHHHH`

  the Unicode (ISO/IEC 10646) character whose value is the hexadecimal value HHHH (one to four hex digits)

  Unicode（ISO/IEC 10646）字符，其值为十六进制值HHHH（一个到四个十六进制数字）

- `\UHHHHHHHH`

  the Unicode (ISO/IEC 10646) character whose value is the hexadecimal value HHHHHHHH (one to eight hex digits)

  Unicode（ISO/IEC 10646）字符，其值为十六进制值HHHHHHHH（一个到八个十六进制数字）

- `\cx`

  a control-x character
  
  控制-x字符

The expanded result is single-quoted, as if the dollar sign had not been present.

​	扩展后的结果被视为单引号，就像没有美元符号一样。





##### 3.1.2.5 特定区域设置翻译 Locale-Specific Translation



Prefixing a double-quoted string with a dollar sign (`$`), such as `$"hello, world"`, will cause the string to be translated according to the current locale. The `gettext` infrastructure performs the lookup and translation, using the `LC_MESSAGES`, `TEXTDOMAINDIR`, and `TEXTDOMAIN` shell variables, as explained below. See the gettext documentation for additional details not covered here. If the current locale is `C` or `POSIX`, if there are no translations available, of if the string is not translated, the dollar sign is ignored. Since this is a form of double quoting, the string remains double-quoted by default, whether or not it is translated and replaced. If the `noexpand_translation` option is enabled using the `shopt` builtin (see [The Shopt Builtin](#432--shopt内置命令)), translated strings are single-quoted instead of double-quoted.

​	在双引号中，如果字符串前缀为美元符号（`$`），例如`$"hello, world"`，将根据当前的区域设置对该字符串进行翻译。`gettext`基础设施执行查找和翻译，并使用`LC_MESSAGES`、`TEXTDOMAINDIR`和`TEXTDOMAIN` shell变量，如下所述。有关此处未涵盖的其他详细信息，请参阅gettext文档。如果当前的区域设置是`C`或`POSIX`，或者如果没有可用的翻译，或者字符串未被翻译，美元符号将被忽略。由于这是双引号的一种形式，所以无论是否被翻译和替换，该字符串默认都保持双引号。如果启用了`noexpand_translation`选项（使用`shopt`内置命令，参见[The Shopt Builtin](#432--shopt内置命令)），则翻译后的字符串将使用单引号而不是双引号。

The rest of this section is a brief overview of how you use gettext to create translations for strings in a shell script named scriptname. There are more details in the gettext documentation.

​	本节的其余部分是关于如何使用gettext为shell脚本创建字符串的翻译的简要概述。关于gettext的更多细节，请参阅gettext文档。




#### 创建国际化脚本



Once you've marked the strings in your script that you want to translate using $"...", you create a gettext "template" file using the command

​	一旦你在脚本中用$"..."标记了要进行翻译的字符串，你可以使用以下命令创建一个gettext的"模板"文件：

```
bash --dump-po-strings scriptname > domain.pot
```

The domain is your *message domain*. It's just an arbitrary string that's used to identify the files gettext needs, like a package or script name. It needs to be unique among all the message domains on systems where you install the translations, so gettext knows which translations correspond to your script. You'll use the template file to create translations for each target language. The template file conventionally has the suffix `.pot`.

​	域是你的*消息域*。它只是一个用于标识gettext所需的文件的任意字符串，就像一个包或脚本名一样。在安装翻译的系统中，它需要在所有消息域中保持唯一，以便gettext知道哪些翻译对应于你的脚本。你将使用模板文件为每种目标语言创建翻译。模板文件通常具有后缀.pot。

You copy this template file to a separate file for each target language you want to support (called "PO" files, which use the suffix `.po`). PO files use various naming conventions, but when you are working to translate a template file into a particular language, you first copy the template file to a file whose name is the language you want to target, with the `.po` suffix. For instance, the Spanish translations of your strings would be in a file named `es.po`, and to get started using a message domain named "example," you would run

​	然后，将此模板文件复制到每个你想支持的目标语言的单独文件中（称为"PO"文件，使用后缀.po）。PO文件使用各种命名约定，但在将模板文件翻译成特定语言时，首先将模板文件复制到文件名为你想要的目标语言的文件中，并添加.po后缀。例如，你的字符串的西班牙语翻译将在名为es.po的文件中，而在使用名为"example"的消息域开始时，你将运行：

```
cp example.pot es.po
```

Ultimately, PO files are often named domain.po and installed in directories that contain multiple translation files for a particular language.

​	PO文件通常被命名为domain.po，并安装在包含特定语言多个翻译文件的目录中。

Whichever naming convention you choose, you will need to translate the strings in the PO files into the appropriate languages. This has to be done manually.

​	不论选择哪种命名约定，你都需要手动将PO文件中的字符串翻译为相应的语言。

When you have the translations and PO files complete, You'll use the gettext tools to produce what are called "MO" files, which are compiled versions of the PO files the gettext tools use to look up translations efficiently. MO files are also called "message catalog" files. You use the `msgfmt` program to do this. For instance, if you had a file with Spanish translations, you could run

​	完成翻译和PO文件后，你将使用gettext工具生成所谓的"MO"文件，这些文件是gettext工具用于高效查找翻译的PO文件的编译版本。MO文件也被称为"message catalog"文件。你可以使用`msgfmt`程序来完成这个工作。例如，如果有一个包含西班牙语翻译的文件，你可以运行：

```
msgfmt -o es.mo es.po
```

to produce the corresponding MO file.

来生成相应的MO文件。

Once you have the MO files, you decide where to install them and use the `TEXTDOMAINDIR` shell variable to tell the gettext tools where they are. Make sure to use the same message domain to name the MO files as you did for the PO files when you install them.

​	一旦你有了MO文件，你决定将它们安装在哪里，并使用`TEXTDOMAINDIR` shell变量告诉gettext工具它们的位置。确保在安装它们时，使用与PO文件相同的消息域来命名MO文件。



Your users will use the `LANG` or `LC_MESSAGES` shell variables to select the desired language.

​	你的用户将使用`LANG`或`LC_MESSAGES` shell变量来选择所需的语言。

You set the `TEXTDOMAIN` variable to the script's message domain. As above, you use the message domain to name your translation files.

​	你将`TEXTDOMAIN`变量设置为脚本的消息域。与上面一样，你将使用消息域来命名你的翻译文件。

You, or possibly your users, set the `TEXTDOMAINDIR` variable to the name of a directory where the message catalog files are stored. If you install the message files into the system's standard message catalog directory, you don't need to worry about this variable.

​	你或者可能是你的用户将`TEXTDOMAINDIR`变量设置为包含消息目录文件的目录的名称。如果将消息文件安装到系统的标准消息目录目录中，你就不需要担心这个变量。

The directory where the message catalog files are stored varies between systems. Some use the message catalog selected by the `LC_MESSAGES` shell variable. Others create the name of the message catalog from the value of the `TEXTDOMAIN` shell variable, possibly adding the `.mo` suffix. If you use the `TEXTDOMAIN` variable, you may need to set the `TEXTDOMAINDIR` variable to the location of the message catalog files, as above. It's common to use both variables in this fashion: `$TEXTDOMAINDIR`/`$LC_MESSAGES`/LC_MESSAGES/`$TEXTDOMAIN`.mo.

​	消息目录文件的存储位置因系统而异。有些使用由`LC_MESSAGES` shell变量选择的消息目录。其他人根据`TEXTDOMAIN` shell变量的值创建消息目录的名称，可能还会添加`.mo`后缀。如果使用了`TEXTDOMAIN`变量，可能需要将`TEXTDOMAINDIR`变量设置为消息目录文件的位置，如上所述。通常以这种方式同时使用两个变量：`$TEXTDOMAINDIR`/`$LC_MESSAGES`/LC_MESSAGES/`$TEXTDOMAIN`.mo。

If you used that last convention, and you wanted to store the message catalog files with Spanish (es) and Esperanto (eo) translations into a local directory you use for custom translation files, you could run

​	如果你使用了上述最后的约定，并且你希望将包含西班牙语（es）和世界语（eo）翻译的消息目录文件存储在用于自定义翻译文件的本地目录中，你可以运行：

```
TEXTDOMAIN=example
TEXTDOMAINDIR=/usr/local/share/locale

cp es.mo ${TEXTDOMAINDIR}/es/LC_MESSAGES/${TEXTDOMAIN}.mo
cp eo.mo ${TEXTDOMAINDIR}/eo/LC_MESSAGES/${TEXTDOMAIN}.mo
```

When all of this is done, and the message catalog files containing the compiled translations are installed in the correct location, your users will be able to see translated strings in any of the supported languages by setting the `LANG` or `LC_MESSAGES` environment variables before running your script.

​	当所有这些都完成后，包含编译翻译的消息目录文件安装在正确的位置后，你的用户将能够通过在运行脚本之前设置`LANG`或`LC_MESSAGES`环境变量来查看支持语言中的翻译字符串。



#### 3.1.3 注释



In a non-interactive shell, or an interactive shell in which the `interactive_comments` option to the `shopt` builtin is enabled (see [The Shopt Builtin](#432--shopt内置命令)), a word beginning with `#` causes that word and all remaining characters on that line to be ignored. An interactive shell without the `interactive_comments` option enabled does not allow comments. The `interactive_comments` option is on by default in interactive shells. See [Interactive Shells](#63-交互式shell), for a description of what makes a shell interactive.

​	在非交互式shell中，或启用了`shopt`内置命令的`interactive_comments`选项的交互式shell（参见[The Shopt Builtin](#432--shopt内置命令)），以`#`开头的单词将导致忽略该单词及该行上的所有其余字符。如果交互式shell未启用`interactive_comments`选项，则不允许使用注释。`interactive_comments`选项在交互式shell中默认为打开状态。有关什么使shell变为交互式的描述，请参见[Interactive Shells](#63-交互式shell)。



### 3.2 Shell命令



A simple shell command such as `echo a b c` consists of the command itself followed by arguments, separated by spaces.

​	一个简单的shell命令，例如`echo a b c`，由命令本身后跟由空格分隔的参数组成。

More complex shell commands are composed of simple commands arranged together in a variety of ways: in a pipeline in which the output of one command becomes the input of a second, in a loop or conditional construct, or in some other grouping.

​	更复杂的shell命令由一系列简单的命令组合在一起，方式多种多样：在管道中，其中一个命令的输出成为第二个命令的输入，在循环或条件结构中，或在某种其他分组中。



#### 3.2.1 保留字



Reserved words are words that have special meaning to the shell. They are used to begin and end the shell's compound commands.

​	保留字是对shell具有特殊含义的单词。它们用于开始和结束shell的复合命令。

The following words are recognized as reserved when unquoted and the first word of a command (see below for exceptions):

​	以下单词在未加引号的情况下被识别为保留字，并且作为命令的第一个单词（有关异常情况，请参见下文）：

| `if`   | `then` | `elif`   | `else`   | `fi`       | `time` |
| ------ | ------ | -------- | -------- | ---------- | ------ |
| `for`  | `in`   | `until`  | `while`  | `do`       | `done` |
| `case` | `esac` | `coproc` | `select` | `function` |        |
| `{`    | `}`    | `[[`     | `]]`     | `!`        |        |

`in` is recognized as a reserved word if it is the third word of a `case` or `select` command. `in` and `do` are recognized as reserved words if they are the third word in a `for` command.

如果`in`是`case`或`select`命令的第三个单词，则`in`将被识别为保留字。如果`in`和`do`是`for`命令的第三个单词，则它们也将被识别为保留字。



#### 3.2.2 简单命令



A simple command is the kind of command encountered most often. It's just a sequence of words separated by `blank`s, terminated by one of the shell's control operators (see [Definitions](#2-定义)). The first word generally specifies a command to be executed, with the rest of the words being that command's arguments.

​	简单命令是最常遇到的类型的命令。它只是一系列由`blank`分隔的单词，由shell的控制运算符（参见[Definitions](#2-定义)）之一终止。第一个单词通常指定要执行的命令，其余的单词是该命令的参数。

The return status (see [Exit Status](#375-退出状态)) of a simple command is its exit status as provided by the POSIX 1003.1 `waitpid` function, or 128+n if the command was terminated by signal n.

​	简单命令的返回状态（参见[Exit Status](#375-退出状态)）是由POSIX 1003.1 `waitpid`函数提供的退出状态，如果命令被信号n终止，则为128+n。



#### 3.2.3 管道



A `pipeline` is a sequence of one or more commands separated by one of the control operators `|` or `|&`.

​	管道是由一个或多个命令序列组成，由控制运算符`|`或`|&`分隔。



The format for a pipeline is

​	管道的格式为

```
[time [-p]] [!] command1 [ | or |& command2 ] …
```

The output of each command in the pipeline is connected via a pipe to the input of the next command. That is, each command reads the previous command's output. This connection is performed before any redirections specified by command1.

​	管道中每个命令的输出通过管道连接到下一个命令的输入。也就是说，每个命令读取前一个命令的输出。这个连接是在由command1指定的任何重定向之前执行的。

If `|&` is used, command1's standard error, in addition to its standard output, is connected to command2's standard input through the pipe; it is shorthand for `2>&1 |`. This implicit redirection of the standard error to the standard output is performed after any redirections specified by command1.

​	如果使用`|&`，除了将command1的标准输出连接到command2的标准输入之外，还将command1的标准错误连接到command2的标准输入；它相当于`2>&1 |`。将标准错误隐式重定向到标准输出是在由command1指定的任何重定向之后执行的。

The reserved word `time` causes timing statistics to be printed for the pipeline once it finishes. The statistics currently consist of elapsed (wall-clock) time and user and system time consumed by the command's execution. The -p option changes the output format to that specified by POSIX. When the shell is in POSIX mode (see [Bash POSIX Mode](#611-bash的posix模式)), it does not recognize `time` as a reserved word if the next token begins with a `-`. The `TIMEFORMAT` variable may be set to a format string that specifies how the timing information should be displayed. See [Bash Variables](#52-bash-变量), for a description of the available formats. The use of `time` as a reserved word permits the timing of shell builtins, shell functions, and pipelines. An external `time` command cannot time these easily.

​	保留字`time`会导致在管道完成后打印计时统计信息。目前的统计信息包括命令执行消耗的经过时间（挂钟时间）以及用户和系统时间。-p选项会将输出格式更改为POSIX指定的格式。当shell处于POSIX模式时（参见[Bash POSIX Mode](#611-bash的posix模式)），如果下一个标记以`-`开头，它不会将`time`识别为保留字。`TIMEFORMAT`变量可以设置为指定如何显示计时信息的格式字符串。有关可用格式的描述，请参见[Bash Variables](#52-bash-变量)。将`time`用作保留字允许计时shell内置命令、shell函数和管道。外部的`time`命令无法轻松计时这些命令。

When the shell is in POSIX mode (see [Bash POSIX Mode](#611-bash的posix模式)), `time` may be followed by a newline. In this case, the shell displays the total user and system time consumed by the shell and its children. The `TIMEFORMAT` variable may be used to specify the format of the time information.

​	当shell处于POSIX模式（参见[Bash POSIX Mode](#611-bash的posix模式)）时，`time`之后可以跟着一个换行符。在这种情况下，shell会显示shell及其子进程所消耗的总用户和系统时间。`TIMEFORMAT`变量可用于指定时间信息的格式。

If the pipeline is not executed asynchronously (see [Lists of Commands](#324-命令列表)), the shell waits for all commands in the pipeline to complete.

​	如果管道不是异步执行的（参见[Lists of Commands](#324-命令列表)），则shell会等待管道中的所有命令完成。

Each command in a multi-command pipeline, where pipes are created, is executed in its own *subshell*, which is a separate process (see [Command Execution Environment](#373-命令执行环境)). If the `lastpipe` option is enabled using the `shopt` builtin (see [The Shopt Builtin](#432--shopt内置命令)), the last element of a pipeline may be run by the shell process when job control is not active.

​	在创建管道的多个命令的每个命令中，将创建管道时，都会在自己的*子shell*中执行，这是一个单独的进程（参见[Command Execution Environment](#373-命令执行环境)）。如果使用`shopt`内置命令启用`lastpipe`选项（参见[The Shopt Builtin](#432--shopt内置命令)），则当作业控制未激活时，管道的最后一个元素可能由shell进程运行。

The exit status of a pipeline is the exit status of the last command in the pipeline, unless the `pipefail` option is enabled (see [The Set Builtin](#431-内置命令set)). If `pipefail` is enabled, the pipeline's return status is the value of the last (rightmost) command to exit with a non-zero status, or zero if all commands exit successfully. If the reserved word `!` precedes the pipeline, the exit status is the logical negation of the exit status as described above. The shell waits for all commands in the pipeline to terminate before returning a value.

​	管道的退出状态是管道中最后一个命令的退出状态，除非启用了`pipefail`选项（参见[The Set Builtin](#431-内置命令set)）。如果启用了`pipefail`，则管道的返回状态是最后一个（最右边）退出状态为非零的命令的值，如果所有命令都成功退出，则为零。如果管道之前有保留字`!`，则退出状态是上述退出状态的逻辑否定。shell会等待管道中的所有命令终止后再返回一个值。



#### 3.2.4 命令列表



A `list` is a sequence of one or more pipelines separated by one of the operators `;`, `&`, `&&`, or `||`, and optionally terminated by one of `;`, `&`, or a `newline`.

​	列表是由一个或多个以`;`、`&`、`&&`或`||`分隔的管道组成的序列，可选地以`;`、`&`或换行符终止。

Of these list operators, `&&` and `||` have equal precedence, followed by `;` and `&`, which have equal precedence.

​	在这些列表运算符中，`&&`和`||`具有相同的优先级，其次是`;`和`&`，它们具有相同的优先级。

A sequence of one or more newlines may appear in a `list` to delimit commands, equivalent to a semicolon.

​	列表中可以出现一个或多个换行符，用于分隔命令，等效于分号。

If a command is terminated by the control operator `&`, the shell executes the command asynchronously in a subshell. This is known as executing the command in the *background*, and these are referred to as *asynchronous* commands. The shell does not wait for the command to finish, and the return status is 0 (true). When job control is not active (see [Job Control](#7-作业控制)), the standard input for asynchronous commands, in the absence of any explicit redirections, is redirected from `/dev/null`.

​	如果命令由控制运算符`&`终止，则shell在子shell中异步执行该命令。这称为在*后台*中执行该命令，这些命令称为*异步*命令。shell不会等待命令完成，并且返回状态为0（真）。当未激活作业控制（参见[Job Control](#7-作业控制)）时，异步命令的标准输入在缺少任何显式重定向的情况下，会被重定向到`/dev/null`。

Commands separated by a `;` are executed sequentially; the shell waits for each command to terminate in turn. The return status is the exit status of the last command executed.

​	由分号分隔的命令按顺序依次执行；shell等待每个命令依次终止。返回状态是最后一个执行的命令的退出状态。

AND and OR lists are sequences of one or more pipelines separated by the control operators `&&` and `||`, respectively. AND and OR lists are executed with left associativity.

​	AND和OR列表是由控制运算符`&&`和`||`分隔的一个或多个管道序列。AND和OR列表使用左关联。

An AND list has the form

```
command1 && command2
```

command2 is executed if, and only if, command1 returns an exit status of zero (success).

An OR list has the form

```
command1 || command2
```

command2 is executed if, and only if, command1 returns a non-zero exit status.

The return status of AND and OR lists is the exit status of the last command executed in the list.





#### 3.2.5 复合命令



Compound commands are the shell programming language constructs. Each construct begins with a reserved word or control operator and is terminated by a corresponding reserved word or operator. Any redirections (see [Redirections](#36-重定向)) associated with a compound command apply to all commands within that compound command unless explicitly overridden.

​	复合命令是shell编程语言的构造。每个构造都以保留字或控制运算符开始，并以相应的保留字或运算符结束。与复合命令相关的任何重定向（参见[Redirections](#36-重定向)）都适用于该复合命令中的所有命令，除非显式覆盖。

In most cases a list of commands in a compound command's description may be separated from the rest of the command by one or more newlines, and may be followed by a newline in place of a semicolon.

​	在大多数情况下，复合命令描述中的命令列表可以与其余命令由一个或多个换行符分隔，并且可以用换行符代替分号。

Bash provides looping constructs, conditional commands, and mechanisms to group commands and execute them as a unit.

​	Bash提供了循环结构、条件命令和将命令分组并作为一个单元执行的机制。







##### 3.2.5.1 循环结构

Bash supports the following looping constructs.

​	Bash支持以下循环结构。

Note that wherever a `;` appears in the description of a command's syntax, it may be replaced with one or more newlines.

​	注意，在命令语法描述中，无论何处出现分号，都可以将其替换为一个或多个换行符。

- `until`

  The syntax of the `until` command is:`until test-commands; do consequent-commands; done `Execute consequent-commands as long as test-commands has an exit status which is not zero. The return status is the exit status of the last command executed in consequent-commands, or zero if none was executed.

  `until`命令的语法为：`until test-commands; do consequent-commands; done`。只要test-commands的退出状态不为零（成功），就执行consequent-commands。返回状态是consequent-commands中执行的最后一个命令的退出状态，如果没有执行命令，则为零。

- `while`

  The syntax of the `while` command is:`while test-commands; do consequent-commands; done `Execute consequent-commands as long as test-commands has an exit status of zero. The return status is the exit status of the last command executed in consequent-commands, or zero if none was executed.

  `while`命令的语法为：`while test-commands; do consequent-commands; done`。只要test-commands的退出状态为零，就执行consequent-commands。返回状态是consequent-commands中执行的最后一个命令的退出状态，如果没有执行命令，则为零。

- `for`

  The syntax of the `for` command is:`for name [ [in [words …] ] ; ] do commands; done `Expand words (see [Shell Expansions](#35-shell-扩展)), and execute commands once for each member in the resultant list, with name bound to the current member. If `in words` is not present, the `for` command executes the commands once for each positional parameter that is set, as if `in "$@"` had been specified (see [Special Parameters](#342-特殊参数)).The return status is the exit status of the last command that executes. If there are no items in the expansion of words, no commands are executed, and the return status is zero.An alternate form of the `for` command is also supported:`for (( expr1 ; expr2 ; expr3 )) ; do commands ; done `First, the arithmetic expression expr1 is evaluated according to the rules described below (see [Shell Arithmetic](#65-shell-算术)). The arithmetic expression expr2 is then evaluated repeatedly until it evaluates to zero. Each time expr2 evaluates to a non-zero value, commands are executed and the arithmetic expression expr3 is evaluated. If any expression is omitted, it behaves as if it evaluates to 1. The return value is the exit status of the last command in commands that is executed, or false if any of the expressions is invalid.
  
  `for`命令的语法为：`for name [ [in [words …] ] ; ] do commands; done`。扩展words（参见[Shell Expansions](#35-shell-扩展)），并为结果列表中的每个成员绑定name，对于结果列表中的每个成员，执行commands一次。如果没有出现`in words`，则`for`命令对每个已设置的位置参数执行commands，就好像指定了`in "$@"`一样（参见[Special Parameters](#342-特殊参数)）。返回状态是执行的最后一个命令的退出状态。如果扩展的words中没有项，则不执行任何命令，并且返回状态为零。也支持`for`命令的另一种形式：`for (( expr1 ; expr2 ; expr3 )) ; do commands ; done`。首先根据下面描述的规则计算算术表达式expr1（参见[Shell Arithmetic](#65-shell-算术)）。然后重复计算算术表达式expr2，直到它计算为零。每次expr2计算为非零值时，都会执行commands，并计算算术表达式expr3。如果省略了任何表达式，则它的行为就像它计算为1一样。返回值是执行的最后一个命令在commands中的退出状态，如果任何表达式无效，则为false。

The `break` and `continue` builtins (see [Bourne Shell Builtins](#41-bourne-shell-builtins)) may be used to control loop execution.

​	`break`和`continue`内置命令（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）可用于控制循环执行。





##### 3.2.5.2 条件结构



- `if`

  The syntax of the `if` command is:

  ```sh
  if test-commands; then
    consequent-commands;
  [elif more-test-commands; then
    more-consequents;]
  [else alternate-consequents;]
  fi
  ```

  The test-commands list is executed, and if its return status is zero, the consequent-commands list is executed. If test-commands returns a non-zero status, each `elif` list is executed in turn, and if its exit status is zero, the corresponding more-consequents is executed and the command completes. If `else alternate-consequents` is present, and the final command in the final `if` or `elif` clause has a non-zero exit status, then alternate-consequents is executed. The return status is the exit status of the last command executed, or zero if no condition tested true.

  `if`命令的语法为：

  ```sh
  if test-commands; then
    consequent-commands;
  [elif more-test-commands; then
    more-consequents;]
  [else alternate-consequents;]
  fi
  ```

  执行test-commands列表，如果其返回状态为零，则执行consequent-commands列表。如果test-commands返回非零状态，则按顺序执行每个`elif`列表，如果其退出状态为零，则执行相应的more-consequents，并完成命令。如果存在`else alternate-consequents`，并且最后一个`if`或`elif`子句中的最后一个命令具有非零退出状态，则执行alternate-consequents。返回状态是执行的最后一个命令的退出状态，如果没有条件为真，则为零。

- `case`

  The syntax of the `case` command is:

  `case`命令的语法为：

  ```sh
  case word in
      [ [(] pattern [| pattern]…) command-list ;;]…
  esac
  ```

   will selectively execute the command-list corresponding to the first pattern that matches word. The match is performed according to the rules described below in [Pattern Matching](#3581-模式匹配). If the `nocasematch` shell option (see the description of `shopt` in [The Shopt Builtin](#432--shopt内置命令)) is enabled, the match is performed without regard to the case of alphabetic characters. The `|` is used to separate multiple patterns, and the `)` operator terminates a pattern list. A list of patterns and an associated command-list is known as a clause.Each clause must be terminated with `;;`, `;&`, or `;;&`. The word undergoes tilde expansion, parameter expansion, command substitution, arithmetic expansion, and quote removal (see [Shell Parameter Expansion](#353-shell参数扩展)) before matching is attempted. Each pattern undergoes tilde expansion, parameter expansion, command substitution, arithmetic expansion, process substitution, and quote removal.There may be an arbitrary number of `case` clauses, each terminated by a `;;`, `;&`, or `;;&`. The first pattern that matches determines the command-list that is executed. It's a common idiom to use `*` as the final pattern to define the default case, since that pattern will always match.Here is an example using `case` in a script that could be used to describe one interesting feature of an animal:

  `case`命令将根据与word匹配的第一个模式有选择地执行相应的command-list。匹配是根据下面在[Pattern Matching](#3581-模式匹配)中描述的规则进行的。如果启用了`nocasematch` shell选项（请参见[The Shopt Builtin](#432--shopt内置命令)中的`shopt`描述），则执行匹配时不考虑字母大小写。`|`用于分隔多个模式，`)`运算符终止模式列表。每个模式列表和相关联的命令列表被称为clause。每个clause必须用`;;`、`;&`或`;;&`终止。在尝试匹配之前，word经历波浪线扩展、参数扩展、命令替换、算术扩展和引号删除（参见[Shell Parameter Expansion](#353-shell参数扩展)）。每个模式经历波浪线扩展、参数扩展、命令替换、算术扩展、进程替换和引号删除。可以有任意数量的`case` clauses，每个以`;;`、`;&`或`;;&`终止。第一个匹配的模式确定要执行的command-list。通常使用`*`作为最后一个模式定义默认情况，因为该模式始终匹配。以下是使用`case`的一个示例，其中脚本可用于描述动物的一个有趣特征：

  ```sh
  echo -n "Enter the name of an animal: "
  read ANIMAL
  echo -n "The $ANIMAL has "
  case $ANIMAL in
    horse | dog | cat) echo -n "four";;
    man | kangaroo ) echo -n "two";;
    *) echo -n "an unknown number of";;
  esac
  echo " legs."
  ```

  If the `;;` operator is used, no subsequent matches are attempted after the first pattern match. Using `;&` in place of `;;` causes execution to continue with the command-list associated with the next clause, if any. Using `;;&` in place of `;;` causes the shell to test the patterns in the next clause, if any, and execute any associated command-list on a successful match, continuing the case statement execution as if the pattern list had not matched.The return status is zero if no pattern is matched. Otherwise, the return status is the exit status of the command-list executed.

  如果使用了`;;`运算符，则在第一个模式匹配后不会尝试后续的匹配。将`;&`用于替换`;;`会导致执行继续到与下一个clause关联的command-list（如果有的话）。将`;;&`用于替换`;;`会导致shell在下一个clause中测试模式，并在成功匹配后执行任何相关联的command-list，继续执行case语句，就像未匹配模式列表一样。返回状态是零，如果没有模式匹配。否则，返回状态是执行的最后一个command-list的退出状态。

- `select`

  The `select` construct allows the easy generation of menus. It has almost the same syntax as the `for` command:

  `select`结构允许轻松生成菜单。它的语法与`for`命令几乎相同：

  ```sh
  select name [in words …]; do commands; done
  ```

  The list of words following `in` is expanded, generating a list of items, and the set of expanded words is printed on the standard error output stream, each preceded by a number. If the `in words` is omitted, the positional parameters are printed, as if `in "$@"` had been specified. `select` then displays the `PS3` prompt and reads a line from the standard input. If the line consists of a number corresponding to one of the displayed words, then the value of name is set to that word. If the line is empty, the words and prompt are displayed again. If `EOF` is read, the `select` command completes and returns 1. Any other value read causes name to be set to null. The line read is saved in the variable `REPLY`.The commands are executed after each selection until a `break` command is executed, at which point the `select` command completes.Here is an example that allows the user to pick a filename from the current directory, and displays the name and index of the file selected.

  在`in words`后面的words进行扩展，生成一系列项，并在标准错误输出流上打印一组扩展后的words，每个前面带有一个数字。如果省略了`in words`，则打印位置参数，就像指定了`in "$@"`一样。然后，`select`显示`PS3`提示，并从标准输入中读取一行。如果该行包含与显示的单词之一相对应的数字，则将name的值设置为该单词。如果行为空，则再次显示单词和提示。如果读取到`EOF`，则`select`命令完成并返回1。读取到的任何其他值都会导致name被设置为空。读取的行保存在变量`REPLY`中。每次选择后执行命令，直到执行`break`命令为止，此时`select`命令完成。以下是一个示例，允许用户从当前目录中选择一个文件名，并显示所选文件的名称和索引：

  ```sh
  select fname in *;
  do
  	echo you picked $fname \($REPLY\)
  	break;
  done
  ```

  

- `((…))`

  ```sh
  (( expression ))
  ```

  The arithmetic expression is evaluated according to the rules described below (see [Shell Arithmetic](#65-shell-算术)). The expression undergoes the same expansions as if it were within double quotes, but double quote characters in expression are not treated specially are removed. If the value of the expression is non-zero, the return status is 0; otherwise the return status is 1.

  根据下面描述的规则（参见[Shell 算术](#65-shell-算术)），计算算术表达式。表达式会经历与双引号括起来的表达式相同的扩展，但是表达式中的双引号字符不会被特殊处理，而是被删除。如果表达式的值非零，则返回状态为0；否则返回状态为1。

- `[[…]]`

  ```sh
  [[ expression ]]
  ```
  
  Return a status of 0 or 1 depending on the evaluation of the conditional expression expression. Expressions are composed of the primaries described below in [Bash Conditional Expressions](#64-bash-条件表达式). The words between the `[[` and `]]` do not undergo word splitting and filename expansion. The shell performs tilde expansion, parameter and variable expansion, arithmetic expansion, command substitution, process substitution, and quote removal on those words (the expansions that would occur if the words were enclosed in double quotes). Conditional operators such as `-f` must be unquoted to be recognized as primaries.When used with `[[`, the `<` and `>` operators sort lexicographically using the current locale.When the `==` and `!=` operators are used, the string to the right of the operator is considered a pattern and matched according to the rules described below in [Pattern Matching](#3581-模式匹配), as if the `extglob` shell option were enabled. The `=` operator is identical to `==`. If the `nocasematch` shell option (see the description of `shopt` in [The Shopt Builtin](#432--shopt内置命令)) is enabled, the match is performed without regard to the case of alphabetic characters. The return value is 0 if the string matches (`==`) or does not match (`!=`) the pattern, and 1 otherwise.If you quote any part of the pattern, using any of the shell's quoting mechanisms, the quoted portion is matched literally. This means every character in the quoted portion matches itself, instead of having any special pattern matching meaning.An additional binary operator, `=~`, is available, with the same precedence as `==` and `!=`. When you use `=~`, the string to the right of the operator is considered a POSIX extended regular expression pattern and matched accordingly (using the POSIX `regcomp` and `regexec` interfaces usually described in *regex*(3)). The return value is 0 if the string matches the pattern, and 1 if it does not. If the regular expression is syntactically incorrect, the conditional expression returns 2. If the `nocasematch` shell option (see the description of `shopt` in [The Shopt Builtin](#432--shopt内置命令)) is enabled, the match is performed without regard to the case of alphabetic characters.You can quote any part of the pattern to force the quoted portion to be matched literally instead of as a regular expression (see above). If the pattern is stored in a shell variable, quoting the variable expansion forces the entire pattern to be matched literally.The pattern will match if it matches any part of the string. If you want to force the pattern to match the entire string, anchor the pattern using the `^` and `$` regular expression operators.For example, the following will match a line (stored in the shell variable `line`) if there is a sequence of characters anywhere in the value consisting of any number, including zero, of characters in the `space` character class, immediately followed by zero or one instances of `a`, then a `b`:
  
  根据条件表达式expression的评估结果返回0或1的状态。表达式由下面描述的原语组成（参见[Bash条件表达式](#64-bash-条件表达式)）。`[[`和`]]`之间的单词不会进行词分割和文件名扩展。Shell会在这些单词上执行波浪号展开、参数和变量展开、算术展开、命令替换、进程替换和引号删除（如果这些单词被双引号括起来的话）。条件操作符如`-f`必须不带引号才能被识别为原语。当与`[[`一起使用时，`<`和`>`运算符按照当前区域设置进行按字典排序。当使用`==`和`!=`运算符时，右边的字符串被视为模式，并根据下面描述的规则进行匹配（就像启用了`extglob` shell选项一样）。`=`运算符与`==`完全相同。如果启用了`nocasematch` shell选项（参见[The Shopt Builtin](#432--shopt内置命令)中的描述），则匹配时不考虑字母字符的大小写。如果字符串匹配（`==`）或不匹配（`!=`）模式，则返回值为0；否则返回值为1。如果你在模式的任意部分上使用了任何一种Shell的引用机制来引用，被引用的部分将被按字面意义匹配。这意味着引用部分中的每个字符都与其自身匹配，而不具有任何特殊的模式匹配意义。另外，还有一个附加的二进制运算符`=~`，其优先级与`==`和`!=`相同。当使用`=~`时，右边的字符串被视为POSIX扩展正则表达式模式，并相应地进行匹配（通常使用POSIX `regcomp` 和 `regexec` 接口来描述 *regex*(3)）。如果字符串匹配模式，则返回值为0；如果不匹配，则返回值为1。如果正则表达式在语法上不正确，则条件表达式返回2。如果启用了`nocasematch` shell选项（参见[The Shopt Builtin](#432--shopt内置命令)中的描述），则匹配时不考虑字母字符的大小写。你可以引用模式的任意部分，以强制匹配引用部分的字面意义，而不是作为正则表达式进行匹配（参见上文）。如果模式存储在Shell变量中，引用变量扩展会强制整个模式被按字面意义匹配。模式将匹配字符串中的任何部分。如果要强制模式匹配整个字符串，请使用`^`和`$`正则表达式运算符锚定模式。例如，下面的模式将匹配一个字符串（存储在Shell变量`line`中），如果该值中有任意数量（包括零个）属于`space`字符类的字符的序列，紧接着零个或一个`a`，然后是一个`b`：
  
  ```sh
  [[ $line =~ [[:space:]]*(a)?b ]]
  ```
  
  That means values for `line` like `aab`, ` aaaaaab`, `xaby`, and ` ab` will all match, as will a line containing a `b` anywhere in its value.If you want to match a character that's special to the regular expression grammar (`^$|[]()\.*+?`), it has to be quoted to remove its special meaning. This means that in the pattern `xxx.txt`, the `.` matches any character in the string (its usual regular expression meaning), but in the pattern `"xxx.txt"`, it can only match a literal `.`.Likewise, if you want to include a character in your pattern that has a special meaning to the regular expression grammar, you must make sure it's not quoted. If you want to anchor a pattern at the beginning or end of the string, for instance, you cannot quote the `^` or `$` characters using any form of shell quoting.If you want to match `initial string` at the start of a line, the following will work:
  
  这意味着像`aab`、` aaaaaab`、`xaby`和` ab`这样的`line`的值都会匹配，包括在其值中包含`b`的行。如果要匹配正则表达式语法中的特殊字符（`^$|[]()\.*+?`），必须对其进行引用以去除其特殊含义。这意味着在模式`xxx.txt`中，`.`匹配字符串中的任意字符（其通常的正则表达式含义），但在模式`"xxx.txt"`中，它只能匹配字面的`.`。同样，如果要在模式中包含一个对正则表达式语法有特殊含义的字符，必须确保它没有被引用。例如，如果要在字符串的开头或结尾锚定模式，不能使用任何形式的Shell引用对`^`或`$`字符进行引用。如果要在行的开头匹配`initial string`，可以使用以下代码：
  
  ```sh
  [[ $line =~ ^"initial string" ]]
  ```
  
  but this will not:
  
  但是以下代码不行：
  
  ```sh
  [[ $line =~ "^initial string" ]]
  ```
  
  because in the second example the `^` is quoted and doesn't have its usual special meaning.It is sometimes difficult to specify a regular expression properly without using quotes, or to keep track of the quoting used by regular expressions while paying attention to shell quoting and the shell's quote removal. Storing the regular expression in a shell variable is often a useful way to avoid problems with quoting characters that are special to the shell. For example, the following is equivalent to the pattern used above:
  
  因为在第二个示例中，`^`被引用并且失去了其通常的特殊含义。有时候在不使用引号的情况下正确指定正则表达式是困难的，或者在注意Shell引用和引号删除的同时跟踪正则表达式使用的引号是困难的。将正则表达式存储在Shell变量中通常是避免引号问题的有用方式。例如，以下代码等效于上面使用的模式：
  
  ```sh
  pattern='[[:space:]]*(a)?b'
  [[ $line =~ $pattern ]]
  ```
  
  Shell programmers should take special care with backslashes, since backslashes are used by both the shell and regular expressions to remove the special meaning from the following character. This means that after the shell's word expansions complete (see [Shell Expansions](#35-shell-扩展)), any backslashes remaining in parts of the pattern that were originally not quoted can remove the special meaning of pattern characters. If any part of the pattern is quoted, the shell does its best to ensure that the regular expression treats those remaining backslashes as literal, if they appeared in a quoted portion.The following two sets of commands are *not* equivalent:
  
  Shell程序员应特别注意反斜杠，因为反斜杠同时被Shell和正则表达式用于去除其后字符的特殊含义。这意味着在Shell的单词展开完成后（参见[Shell扩展](#35-shell-扩展)），原本没有引用的模式部分中的任何剩余反斜杠都会去除模式字符的特殊含义。如果模式的任何部分被引用，Shell会尽力确保正则表达式将那些剩余的反斜杠视为字面值，如果它们出现在引用的部分中。以下两组命令*不*等效：
  
  ```sh
  pattern='\.'
  
  [[ . =~ $pattern ]]
  [[ . =~ \. ]]
  
  [[ . =~ "$pattern" ]]
  [[ . =~ '\.' ]]
  ```
  
  The first two matches will succeed, but the second two will not, because in the second two the backslash will be part of the pattern to be matched. In the first two examples, the pattern passed to the regular expression parser is `\.`. The backslash removes the special meaning from `.`, so the literal `.` matches. In the second two examples, the pattern passed to the regular expression parser has the backslash quoted (e.g., `\\\.`), which will not match the string, since it does not contain a backslash. If the string in the first examples were anything other than `.`, say `a`, the pattern would not match, because the quoted `.` in the pattern loses its special meaning of matching any single character.Bracket expressions in regular expressions can be sources of errors as well, since characters that are normally special in regular expressions lose their special meanings between brackets. However, you can use bracket expressions to match special pattern characters without quoting them, so they are sometimes useful for this purpose.Though it might seem like a strange way to write it, the following pattern will match a `.` in the string:
  
  前两个匹配将成功，但后两个不会，因为在后两个中，反斜杠将成为要匹配的模式的一部分。在前两个示例中，传递给正则表达式解析器的模式是`\.`。反斜杠去除了`.`的特殊含义，因此匹配字面的`.`。在后两个示例中，传递给正则表达式解析器的模式将反斜杠进行了引用（例如，`\\\.`），这不会匹配字符串，因为它不包含反斜杠。如果第一个示例中的字符串不是`.`，而是其他字符，比如`a`，那么模式将不会匹配，因为模式中引用的`.`失去了其匹配任意单个字符的特殊含义。正则表达式中的方括号表达式也可能导致错误，因为在方括号之间通常具有特殊含义的字符在正则表达式中失去了其特殊含义。然而，你可以使用方括号表达式匹配特殊的模式字符而无需对其进行引用，因此它们有时用于此目的。虽然这可能看起来是一种奇怪的写法，但以下模式将在字符串中匹配一个`.`：
  
  ```sh
  [[ . =~ [.] ]]
  ```
  
  The shell performs any word expansions before passing the pattern to the regular expression functions, so you can assume that the shell's quoting takes precedence. As noted above, the regular expression parser will interpret any unquoted backslashes remaining in the pattern after shell expansion according to its own rules. The intention is to avoid making shell programmers quote things twice as much as possible, so shell quoting should be sufficient to quote special pattern characters where that's necessary.The array variable `BASH_REMATCH` records which parts of the string matched the pattern. The element of `BASH_REMATCH` with index 0 contains the portion of the string matching the entire regular expression. Substrings matched by parenthesized subexpressions within the regular expression are saved in the remaining `BASH_REMATCH` indices. The element of `BASH_REMATCH` with index n is the portion of the string matching the nth parenthesized subexpression.Bash sets `BASH_REMATCH` in the global scope; declaring it as a local variable will lead to unexpected results.Expressions may be combined using the following operators, listed in decreasing order of precedence:`( expression )`Returns the value of expression. This may be used to override the normal precedence of operators.`! expression`True if expression is false.`expression1 && expression2`True if both expression1 and expression2 are true.`expression1 || expression2`True if either expression1 or expression2 is true.The `&&` and `||` operators do not evaluate expression2 if the value of expression1 is sufficient to determine the return value of the entire conditional expression.
  
  Shell在将模式传递给正则表达式函数之前执行任何单词展开，因此可以假设Shell的引用优先于正则表达式的引用。如上所述，正则表达式解析器将根据自己的规则解释Shell展开后模式中的任何未引用的反斜杠。这样做的目的是尽量避免让Shell程序员对事物进行两次引用，因此Shell引用应足以引用需要的特殊模式字符。数组变量`BASH_REMATCH`记录了与模式匹配的字符串的哪些部分。索引为0的`BASH_REMATCH`元素包含与整个正则表达式匹配的部分。正则表达式中的带括号的子表达式匹配的子字符串保存在剩余的`BASH_REMATCH`索引中。索引为n的`BASH_REMATCH`元素是与第n个带括号的子表达式匹配的部分。Bash将`BASH_REMATCH`设置为全局作用域；将其声明为局部变量将导致意外结果。可以使用以下运算符将表达式组合起来，按优先级递减的顺序列出：`( expression )`返回expression的值。这可用于覆盖运算符的正常优先级。`! expression`如果expression为假，则返回真。`expression1 && expression2`如果expression1和expression2都为真，则返回真。`expression1 || expression2`如果expression1或expression2为真，则返回真。如果expression1的值足以确定整个条件表达式的返回值，则不评估expression2的值。





##### 3.2.5.3 命令分组



Bash provides two ways to group a list of commands to be executed as a unit. When commands are grouped, redirections may be applied to the entire command list. For example, the output of all the commands in the list may be redirected to a single stream.

​	Bash提供了两种将一系列命令分组执行的方式。当命令分组时，可以将重定向应用于整个命令列表。例如，所有命令列表中的命令的输出可以重定向到一个单一的流。

- `()`

  ```sh
  ( list )
  ```

  Placing a list of commands between parentheses forces the shell to create a subshell (see [Command Execution Environment](#373-命令执行环境)), and each of the commands in list is executed in that subshell environment. Since the list is executed in a subshell, variable assignments do not remain in effect after the subshell completes.

  在圆括号之间放置一系列命令会强制Shell创建一个子shell（参见[命令执行环境](#373-命令执行环境)），并在该子shell环境中执行列表中的每个命令。由于列表在子shell中执行，变量赋值在子shell完成后不会保持有效。

- `{}`

  ```sh
  { list; }
  ```
  
  Placing a list of commands between curly braces causes the list to be executed in the current shell context. No subshell is created. The semicolon (or newline) following list is required.
  
  在花括号之间放置一系列命令会导致列表在当前Shell上下文中执行。不会创建子shell。列表之后的分号（或换行符）是必需的。

In addition to the creation of a subshell, there is a subtle difference between these two constructs due to historical reasons. The braces are reserved words, so they must be separated from the list by `blank`s or other shell metacharacters. The parentheses are operators, and are recognized as separate tokens by the shell even if they are not separated from the list by whitespace.

​	除了创建子shell之外，这两种结构由于历史原因存在微妙的差别。花括号是保留字，因此必须用`空格`或其他Shell元字符与列表分开。圆括号是运算符，即使它们与列表之间没有空格分开，Shell也会将它们识别为单独的标记。

The exit status of both of these constructs is the exit status of list.

​	这两种结构的退出状态是列表的退出状态。



#### 3.2.6 协程 Coprocesses



A `coprocess` is a shell command preceded by the `coproc` reserved word. A coprocess is executed asynchronously in a subshell, as if the command had been terminated with the `&` control operator, with a two-way pipe established between the executing shell and the coprocess.

​	`coprocess`是一个以`coproc`保留字开头的Shell命令。协程在一个子shell中异步执行，就像使用`&`控制操作符终止命令一样，并在执行的Shell和协程之间建立了一个双向管道。

The syntax for a coprocess is:

​	协程的语法如下：

```
coproc [NAME] command [redirections]
```

This creates a coprocess named NAME. command may be either a simple command (see [Simple Commands](#322-简单命令)) or a compound command (see [Compound Commands](#325-复合命令)). NAME is a shell variable name. If NAME is not supplied, the default name is `COPROC`.

​	这创建了一个名为NAME的协程。command可以是一个简单命令（参见[简单命令](#322-简单命令)）或一个复合命令（参见[复合命令](#325-复合命令)）。NAME是一个Shell变量名。如果未提供NAME，则默认名称为`COPROC`。

The recommended form to use for a coprocess is

​	建议使用以下形式来创建协程：

```
coproc NAME { command; }
```

This form is recommended because simple commands result in the coprocess always being named `COPROC`, and it is simpler to use and more complete than the other compound commands.

​	建议使用此形式，因为简单的命令会导致协处理器始终被命名为`COPROC`，而且它比其他复合命令更简单易用且更完整。

There are other forms of coprocesses:

​	还有其他形式的协程：

```
coproc NAME compound-command
coproc compound-command
coproc simple-command
```

If command is a compound command, NAME is optional. The word following `coproc` determines whether that word is interpreted as a variable name: it is interpreted as NAME if it is not a reserved word that introduces a compound command. If command is a simple command, NAME is not allowed; this is to avoid confusion between NAME and the first word of the simple command.

​	如果command是一个复合命令，NAME是可选的。`coproc`后面的单词决定该单词是否被解释为变量名：如果它不是引入复合命令的保留字，则它将被解释为NAME。如果command是一个简单命令，则不允许使用NAME；这是为了避免NAME与简单命令的第一个单词之间的混淆。

When the coprocess is executed, the shell creates an array variable (see [Arrays](#67-数组)) named NAME in the context of the executing shell. The standard output of command is connected via a pipe to a file descriptor in the executing shell, and that file descriptor is assigned to NAME[0]. The standard input of command is connected via a pipe to a file descriptor in the executing shell, and that file descriptor is assigned to NAME[1]. This pipe is established before any redirections specified by the command (see [Redirections](#36-重定向)). The file descriptors can be utilized as arguments to shell commands and redirections using standard word expansions. Other than those created to execute command and process substitutions, the file descriptors are not available in subshells.

​	当执行协程时，Shell在执行Shell的上下文中创建一个名为NAME的数组变量（参见[数组](#67-数组)）。command的标准输出通过管道连接到执行Shell中的一个文件描述符，并将该文件描述符分配给NAME[0]。command的标准输入通过管道连接到执行Shell中的一个文件描述符，并将该文件描述符分配给NAME[1]。这个管道在命令指定的任何重定向之前建立（参见[重定向](#36-重定向)）。文件描述符可以使用标准的单词展开作为Shell命令和重定向的参数。除了用于执行command和处理替换的文件描述符之外，文件描述符在子shell中不可用。

The process ID of the shell spawned to execute the coprocess is available as the value of the variable `NAME_PID`. The `wait` builtin command may be used to wait for the coprocess to terminate.

​	执行协程的Shell生成的进程ID可作为变量`NAME_PID`的值使用。`wait`内置命令可用于等待协程终止。

Since the coprocess is created as an asynchronous command, the `coproc` command always returns success. The return status of a coprocess is the exit status of command.

​	由于协程被创建为异步命令，所以`coproc`命令总是返回成功。协程的返回状态是command的退出状态。





#### 3.2.7 GNU Parallel

There are ways to run commands in parallel that are not built into Bash. GNU Parallel is a tool to do just that.

​	有一些不内置于Bash的方法可以并行运行命令。GNU Parallel是一个可以实现这一目的的工具。

GNU Parallel, as its name suggests, can be used to build and run commands in parallel. You may run the same command with different arguments, whether they are filenames, usernames, hostnames, or lines read from files. GNU Parallel provides shorthand references to many of the most common operations (input lines, various portions of the input line, different ways to specify the input source, and so on). Parallel can replace `xargs` or feed commands from its input sources to several different instances of Bash.

​	GNU Parallel正如其名，可以用于构建和并行运行命令。您可以使用不同的参数运行相同的命令，无论是文件名、用户名、主机名还是从文件中读取的行。GNU Parallel为许多常见操作提供了简写引用（输入行、输入行的各种部分、指定输入源的不同方式等）。Parallel可以替代`xargs`，或者将命令从其输入源传递给多个不同的Bash实例。

For a complete description, refer to the GNU Parallel documentation, which is available at https://www.gnu.org/software/parallel/parallel_tutorial.html.

​	有关详细信息，请参阅GNU Parallel文档，该文档可在https://www.gnu.org/software/parallel/parallel_tutorial.html上获得。





### 3.3 Shell 函数



Shell functions are a way to group commands for later execution using a single name for the group. They are executed just like a "regular" command. When the name of a shell function is used as a simple command name, the list of commands associated with that function name is executed. Shell functions are executed in the current shell context; no new process is created to interpret them.

​	Shell函数是一种将命令分组以便以后使用单个名称执行的方法。它们的执行方式与“普通”命令相同。当Shell函数的名称被用作简单命令名称时，与该函数名称关联的命令列表将被执行。Shell函数在当前Shell上下文中执行；不会创建新的进程来解释它们。

Functions are declared using this syntax:

​	使用以下语法声明函数：

```
fname () compound-command [ redirections ]
```

或

```
function fname [()] compound-command [ redirections ]
```

This defines a shell function named fname. The reserved word `function` is optional. If the `function` reserved word is supplied, the parentheses are optional. The *body* of the function is the compound command compound-command (see [Compound Commands](#325-复合命令)). That command is usually a list enclosed between { and }, but may be any compound command listed above. If the `function` reserved word is used, but the parentheses are not supplied, the braces are recommended. compound-command is executed whenever fname is specified as the name of a simple command. When the shell is in POSIX mode (see [Bash POSIX Mode](#611-bash的posix模式)), fname must be a valid shell name and may not be the same as one of the special builtins (see [Special Builtins](#44-特殊内置命令)). In default mode, a function name can be any unquoted shell word that does not contain `$`. Any redirections (see [Redirections](#36-重定向)) associated with the shell function are performed when the function is executed. A function definition may be deleted using the -f option to the `unset` builtin (see [Bourne Shell Builtins](#41-bourne-shell-builtins)).

​	这定义了一个名为fname的Shell函数。`function`保留字是可选的。如果提供了`function`保留字，则括号是可选的。函数的*主体*是复合命令compound-command（参见[复合命令](#325-复合命令)）。该命令通常是在{和}之间的列表，但可以是上面列出的任何复合命令。如果使用了`function`保留字，但未提供括号，则建议使用花括号。只有在指定了简单命令的名称时，才能在POSIX模式下执行Shell时使用`function`保留字。在默认模式下，函数名称可以是任何未引用的Shell单词，且不包含`$`。在Shell函数执行时，与Shell函数相关的任何重定向（参见[重定向](#36-重定向)）在执行函数时执行。可以使用`unset`内置命令的`-f`选项来删除函数定义（参见[Bourne Shell内置命令](#41-bourne-shell-builtins)）。

The exit status of a function definition is zero unless a syntax error occurs or a readonly function with the same name already exists. When executed, the exit status of a function is the exit status of the last command executed in the body.

​	函数定义的退出状态为零，除非发生语法错误或已存在具有相同名称的只读函数。执行函数时，函数的退出状态是主体中最后一个命令的退出状态。

Note that for historical reasons, in the most common usage the curly braces that surround the body of the function must be separated from the body by `blank`s or newlines. This is because the braces are reserved words and are only recognized as such when they are separated from the command list by whitespace or another shell metacharacter. Also, when using the braces, the list must be terminated by a semicolon, a `&`, or a newline.

​	请注意，出于历史原因，最常见的用法是将花括号与函数的主体分开，通过`空格`或换行符。这是因为花括号是保留字，只有在它们与命令列表之间由空格或其他Shell元字符分隔时，才会被识别为保留字。此外，当使用花括号时，列表必须以分号、`&`或换行符结尾。

When a function is executed, the arguments to the function become the positional parameters during its execution (see [Positional Parameters](#341-位置参数)). The special parameter `#` that expands to the number of positional parameters is updated to reflect the change. Special parameter `0` is unchanged. The first element of the `FUNCNAME` variable is set to the name of the function while the function is executing.

​	当执行函数时，函数的参数在其执行过程中成为位置参数（参见[位置参数](#341-位置参数)）。特殊参数`#`展开为位置参数的数量，并根据变化进行更新。特殊参数`0`保持不变。在函数执行期间，`FUNCNAME`变量的第一个元素被设置为函数的名称。

All other aspects of the shell execution environment are identical between a function and its caller with these exceptions: the `DEBUG` and `RETURN` traps are not inherited unless the function has been given the `trace` attribute using the `declare` builtin or the `-o functrace` option has been enabled with the `set` builtin, (in which case all functions inherit the `DEBUG` and `RETURN` traps), and the `ERR` trap is not inherited unless the `-o errtrace` shell option has been enabled. See [Bourne Shell Builtins](#41-bourne-shell-builtins), for the description of the `trap` builtin.

​	除了以下几点之外，函数和其调用者之间的Shell执行环境的其他方面是相同的：除非函数已被赋予使用`declare`内置命令设置`trace`属性或者使用`set`内置命令启用了`-o functrace`选项（在这种情况下，所有函数都继承`DEBUG`和`RETURN`陷阱），否则`DEBUG`和`RETURN`陷阱不会被继承，并且只有启用了`-o errtrace` Shell选项才会继承`ERR`陷阱。有关`trap`内置命令的说明，请参见[Bourne Shell内置命令](#41-bourne-shell-builtins)。

The `FUNCNEST` variable, if set to a numeric value greater than 0, defines a maximum function nesting level. Function invocations that exceed the limit cause the entire command to abort.

​	如果将`FUNCNEST`变量设置为大于0的数字值，则定义了最大函数嵌套级别。超过限制的函数调用将导致整个命令中止。

If the builtin command `return` is executed in a function, the function completes and execution resumes with the next command after the function call. Any command associated with the `RETURN` trap is executed before execution resumes. When a function completes, the values of the positional parameters and the special parameter `#` are restored to the values they had prior to the function's execution. If a numeric argument is given to `return`, that is the function's return status; otherwise the function's return status is the exit status of the last command executed before the `return`.

​	如果在函数中执行了内置命令`return`，则函数执行完成后，执行将恢复到函数调用之后的下一个命令。在恢复执行之前，将执行与`RETURN`陷阱相关联的任何命令。函数完成后，位置参数和特殊参数`#`的值将恢复为函数执行之前的值。如果`return`的参数是数字，则为函数的返回状态；否则，函数的返回状态是`return`之前执行的最后一条命令的退出状态。

Variables local to the function may be declared with the `local` builtin (*local variables*). Ordinarily, variables and their values are shared between a function and its caller. These variables are visible only to the function and the commands it invokes. This is particularly important when a shell function calls other functions.

​	函数内部的变量可以使用`local`内置命令（*局部变量*）进行声明。通常情况下，变量和它们的值在函数和其调用者之间共享。这些变量只对函数和它调用的命令可见。当Shell函数调用其他函数时，这一点尤为重要。

In the following description, the *current scope* is a currently- executing function. Previous scopes consist of that function's caller and so on, back to the "global" scope, where the shell is not executing any shell function. Consequently, a local variable at the current local scope is a variable declared using the `local` or `declare` builtins in the function that is currently executing.

​	在以下描述中，*当前作用域*是当前正在执行的函数。之前的作用域包括该函数的调用者，以此类推，直到“全局”作用域，其中Shell不执行任何Shell函数。因此，当前局部作用域中的局部变量是在当前执行的函数中使用`local`或`declare`内置命令声明的变量。

Local variables "shadow" variables with the same name declared at previous scopes. For instance, a local variable declared in a function hides a global variable of the same name: references and assignments refer to the local variable, leaving the global variable unmodified. When the function returns, the global variable is once again visible.

​	局部变量“遮蔽”在之前作用域中声明的具有相同名称的变量。例如，函数中声明的局部变量会隐藏具有相同名称的全局变量：引用和赋值引用局部变量，不会修改全局变量。函数返回后，全局变量再次可见。

The shell uses *dynamic scoping* to control a variable's visibility within functions. With dynamic scoping, visible variables and their values are a result of the sequence of function calls that caused execution to reach the current function. The value of a variable that a function sees depends on its value within its caller, if any, whether that caller is the "global" scope or another shell function. This is also the value that a local variable declaration "shadows", and the value that is restored when the function returns.

​	Shell使用*动态作用域*来控制函数内变量的可见性。对于动态作用域，可见变量及其值是由导致执行到达当前函数的函数调用序列决定的。函数所见的变量的值取决于其在调用者内的值，无论该调用者是"全局"作用域还是另一个Shell函数。这也是局部变量声明所"遮蔽"的值，以及在函数返回时恢复的值。

For example, if a variable `var` is declared as local in function `func1`, and `func1` calls another function `func2`, references to `var` made from within `func2` will resolve to the local variable `var` from `func1`, shadowing any global variable named `var`.

​	例如，如果在函数`func1`中将变量`var`声明为局部变量，并且`func1`调用另一个函数`func2`，则从`func2`内部对`var`的引用将解析为来自`func1`的局部变量`var`，遮蔽了任何名为`var`的全局变量。

The following script demonstrates this behavior. When executed, the script displays

以下脚本演示了这种行为。执行脚本时，将显示：

```sh
In func2, var = func1 local
```

```sh
func1()
{
    local var='func1 local'
    func2
}

func2()
{
    echo "In func2, var = $var"
}

var=global
func1
```

The `unset` builtin also acts using the same dynamic scope: if a variable is local to the current scope, `unset` will unset it; otherwise the unset will refer to the variable found in any calling scope as described above. If a variable at the current local scope is unset, it will remain so (appearing as unset) until it is reset in that scope or until the function returns. Once the function returns, any instance of the variable at a previous scope will become visible. If the unset acts on a variable at a previous scope, any instance of a variable with that name that had been shadowed will become visible (see below how `localvar_unset`shell option changes this behavior).

​	`unset`内置命令也使用相同的动态作用域：如果一个变量是当前作用域的局部变量，`unset`将对其进行取消设置；否则，取消设置将引用在任何调用作用域中找到的变量，如上述所述。如果取消设置操作作用于先前作用域中的变量，则任何被遮蔽的具有相同名称的变量实例将变为可见（请参阅下面的`localvar_unset`Shell选项如何更改此行为）。

Function names and definitions may be listed with the -f option to the `declare` (`typeset`) builtin command (see [Bash Builtin Commands](#42-bash-内置命令)). The -F option to `declare` or `typeset` will list the function names only (and optionally the source file and line number, if the `extdebug` shell option is enabled). Functions may be exported so that child shell processes (those created when executing a separate shell invocation) automatically have them defined with the -f option to the `export` builtin (see [Bourne Shell Builtins](#41-bourne-shell-builtins)).

​	使用`declare`（`typeset`）内置命令的`-f`选项，可以列出函数的名称和定义（参见[Bash内置命令](#42-bash-内置命令)）。`declare`或`typeset`的`-F`选项将仅列出函数名称（以及可选的源文件和行号，如果启用了`extdebug` Shell选项）。函数可以被导出，以便子Shell进程（在执行单独的Shell调用时创建的进程）自动将其定义为`export`内置命令的`-f`选项（参见[Bourne Shell内置命令](#41-bourne-shell-builtins)）。

Functions may be recursive. The `FUNCNEST` variable may be used to limit the depth of the function call stack and restrict the number of function invocations. By default, no limit is placed on the number of recursive calls.

​	函数可以是递归的。可以使用`FUNCNEST`变量来限制函数调用栈的深度和函数调用的数量。默认情况下，递归调用的数量没有限制。





### 3.4 Shell 参数



A *parameter* is an entity that stores values. It can be a `name`, a number, or one of the special characters listed below. A *variable* is a parameter denoted by a `name`. A variable has a `value` and zero or more `attributes`. Attributes are assigned using the `declare` builtin command (see the description of the `declare` builtin in [Bash Builtin Commands](#42-bash-内置命令)).

​	Shell参数是存储值的实体。它可以是`名称`、数字或下面列出的特殊字符之一。*变量*是由`名称`表示的参数。变量具有一个`值`和零个或多个`属性`。使用`declare`内置命令分配属性给变量（请参阅[Bash内置命令](#42-bash-内置命令)中对`declare`内置命令的描述）。

A parameter is set if it has been assigned a value. The null string is a valid value. Once a variable is set, it may be unset only by using the `unset` builtin command.

​	如果参数已经被赋值，则设置了该参数。空字符串是一个有效的值。一旦设置了变量，只能使用`unset`内置命令将其取消设置。

A variable may be assigned to by a statement of the form

​	一个变量可以通过以下形式的语句进行赋值：

```
name=[value]
```

If value is not given, the variable is assigned the null string. All values undergo tilde expansion, parameter and variable expansion, command substitution, arithmetic expansion, and quote removal (see [Shell Parameter Expansion](#353-shell参数扩展)). If the variable has its `integer` attribute set, then value is evaluated as an arithmetic expression even if the `$((…))` expansion is not used (see [Arithmetic Expansion](#355-算术扩展-arithmetic-expansion)). Word splitting and filename expansion are not performed. Assignment statements may also appear as arguments to the `alias`, `declare`, `typeset`, `export`, `readonly`, and `local` builtin commands (*declaration* commands). When in POSIX mode (see [Bash POSIX Mode](#611-bash的posix模式)), these builtins may appear in a command after one or more instances of the `command` builtin and retain these assignment statement properties.

​	如果没有给出value，则该变量被赋予空字符串。所有值都要经过`~`扩展、参数和变量扩展、命令替换、算术扩展和引号移除（参见[Shell参数扩展](#353-shell参数扩展)）。如果变量设置了`整数`属性，则value将被解释为算术表达式，即使没有使用`$((...))`扩展（参见[算术扩展](#355-算术扩展-arithmetic-expansion)）。不会执行字拆分和文件名扩展。赋值语句也可以作为`alias`、`declare`、`typeset`、`export`、`readonly`和`local`内置命令（*声明*命令）的参数出现。在POSIX模式下（参见[Bash POSIX模式](#611-bash的posix模式)），这些内置命令可以在一个或多个`command`内置命令实例之后出现，并保留这些赋值语句的属性。

In the context where an assignment statement is assigning a value to a shell variable or array index (see [Arrays](#67-数组)), the `+=` operator can be used to append to or add to the variable's previous value. This includes arguments to builtin commands such as `declare` that accept assignment statements (declaration commands). When `+=` is applied to a variable for which the `integer` attribute has been set, value is evaluated as an arithmetic expression and added to the variable's current value, which is also evaluated. When `+=` is applied to an array variable using compound assignment (see [Arrays](#67-数组)), the variable's value is not unset (as it is when using `=`), and new values are appended to the array beginning at one greater than the array's maximum index (for indexed arrays), or added as additional key-value pairs in an associative array. When applied to a string-valued variable, value is expanded and appended to the variable's value.

​	在将值分配给Shell变量或数组索引（参见[数组](#67-数组)）的赋值语句上下文中，可以使用`+=`运算符来追加到或添加到变量的先前值。这包括作为接受赋值语句的参数（声明命令）的内置命令的参数，例如`declare`。如果为设置了`整数`属性的变量应用`+=`运算符，则value将作为算术表达式进行求值，并添加到变量的当前值中，该值也将进行求值。当将`+=`运用于使用复合赋值（参见[数组](#67-数组)）的数组变量时，变量的值不会被取消设置（与使用`=`时相反），新值将从数组的最大索引加1处开始添加（对于索引数组），或作为附加的键-值对添加到关联数组中。当应用于字符串值的变量时，value会进行扩展，并附加到变量的值上。

A variable can be assigned the `nameref` attribute using the -n option to the `declare` or `local` builtin commands (see [Bash Builtin Commands](#42-bash-内置命令)) to create a *nameref*, or a reference to another variable. This allows variables to be manipulated indirectly. Whenever the nameref variable is referenced, assigned to, unset, or has its attributes modified (other than using or changing the nameref attribute itself), the operation is actually performed on the variable specified by the nameref variable's value. A nameref is commonly used within shell functions to refer to a variable whose name is passed as an argument to the function. For instance, if a variable name is passed to a shell function as its first argument, running

​	可以使用`declare`或`typeset`的`-n`选项将变量分配为具有`nameref`属性的内置命令`declare`或`local`（请参阅[Bash内置命令](#42-bash-内置命令)）中，以创建*名字引用*或对其他变量的引用。这允许间接操作变量。无论何时引用、分配、取消设置或更改属性除使用或更改`nameref`属性本身之外的nameref变量，实际上执行的操作是在nameref变量的值指定的变量上执行的。名字引用通常在Shell函数内部用于引用作为其第一个参数传递给函数的变量名。例如，如果一个变量名作为第一个参数传递给Shell函数，运行以下命令：

```
declare -n ref=$1
```

inside the function creates a nameref variable `ref` whose value is the variable name passed as the first argument. References and assignments to `ref`, and changes to its attributes, are treated as references, assignments, and attribute modifications to the variable whose name was passed as `$1`.

函数内部创建一个名字引用变量`ref`，其值是作为第一个参数传递的变量名。对`ref`的引用、赋值和属性更改被视为对通过`$1`传递的变量名所引用的变量的引用、赋值和属性更改。

If the control variable in a `for` loop has the nameref attribute, the list of words can be a list of shell variables, and a name reference will be established for each word in the list, in turn, when the loop is executed. Array variables cannot be given the nameref attribute. However, nameref variables can reference array variables and subscripted array variables. Namerefs can be unset using the -n option to the `unset` builtin (see [Bourne Shell Builtins](#41-bourne-shell-builtins)). Otherwise, if `unset` is executed with the name of a nameref variable as an argument, the variable referenced by the nameref variable will be unset.

如果`for`循环中的控制变量具有`nameref`属性，则单词列表可以是一系列Shell变量，并且在执行循环时，将为列表中的每个单词依次建立一个名称引用。数组变量不能被赋予`nameref`属性。然而，名字引用变量可以引用数组变量和带下标的数组变量。可以使用`unset`内置命令的`-n`选项来取消名字引用（请参见[Bourne Shell内置命令](#41-bourne-shell-builtins)）。否则，如果使用nameref变量的名称作为参数执行`unset`，则将取消设置由nameref变量引用的变量。




#### 3.4.1 位置参数



A *positional parameter* is a parameter denoted by one or more digits, other than the single digit `0`. Positional parameters are assigned from the shell's arguments when it is invoked, and may be reassigned using the `set` builtin command. Positional parameter `N` may be referenced as `${N}`, or as `$N` when `N` consists of a single digit. Positional parameters may not be assigned to with assignment statements. The `set` and `shift` builtins are used to set and unset them (see [Shell Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Shell-Builtin-Commands)). The positional parameters are temporarily replaced when a shell function is executed (see [Shell Functions](#33-shell-函数)).

​	*位置参数* 是由一个或多个数字表示的参数，除了单个数字`0`之外。当Shell被调用时，位置参数从Shell的参数中分配，并可以使用`set`内置命令进行重新分配。位置参数`N`可以被引用为`${N}`，或者当`N`只包含一个数字时，可以简写为`$N`。位置参数不能通过赋值语句进行赋值。`set`和`shift`内置命令用于设置和取消设置它们（参见[Shell内置命令](https://www.gnu.org/software/bash/manual/bash.html#Shell-Builtin-Commands)）。在执行Shell函数时，位置参数会临时替换（参见[Shell函数](#33-shell-函数)）。

When a positional parameter consisting of more than a single digit is expanded, it must be enclosed in braces.

​	当扩展由多个数字组成的位置参数时，它必须用花括号括起来。





#### 3.4.2 特殊参数



The shell treats several parameters specially. These parameters may only be referenced; assignment to them is not allowed.

​	Shell对一些参数进行特殊处理。这些参数只能被引用，不允许对它们进行赋值。

- `*`

  ($*) Expands to the positional parameters, starting from one. When the expansion is not within double quotes, each positional parameter expands to a separate word. In contexts where it is performed, those words are subject to further word splitting and filename expansion. When the expansion occurs within double quotes, it expands to a single word with the value of each parameter separated by the first character of the `IFS` special variable. That is, `"$*"` is equivalent to `"$1c$2c…"`, where c is the first character of the value of the `IFS` variable. If `IFS` is unset, the parameters are separated by spaces. If `IFS` is null, the parameters are joined without intervening separators.

  ($*) 扩展为从1开始的位置参数。当扩展不在双引号内时，每个位置参数都会扩展为一个单独的单词。在执行扩展的上下文中，这些单词会进一步进行字拆分和文件名扩展。当扩展在双引号内时，它会扩展为一个单词，其中每个参数的值由`IFS`特殊变量的第一个字符分隔。也就是说，`"$*"`等效于`"$1c$2c…"`，其中c是`IFS`变量值的第一个字符。如果`IFS`未设置，则参数以空格分隔。如果`IFS`为空，则参数连接在一起，没有分隔符。

- `@`

  ($@) Expands to the positional parameters, starting from one. In contexts where word splitting is performed, this expands each positional parameter to a separate word; if not within double quotes, these words are subject to word splitting. In contexts where word splitting is not performed, this expands to a single word with each positional parameter separated by a space. When the expansion occurs within double quotes, and word splitting is performed, each parameter expands to a separate word. That is, `"$@"` is equivalent to `"$1" "$2" …`. If the double-quoted expansion occurs within a word, the expansion of the first parameter is joined with the beginning part of the original word, and the expansion of the last parameter is joined with the last part of the original word. When there are no positional parameters, `"$@"` and `$@` expand to nothing (i.e., they are removed).

  ($@) 扩展为从1开始的位置参数。在进行字拆分的上下文中，这将把每个位置参数扩展为一个单独的单词；如果不在双引号内，这些单词会进行字拆分。在不进行字拆分的上下文中，它会扩展为一个单词，其中每个位置参数由空格分隔。当扩展在双引号内，并进行字拆分时，每个参数都会扩展为一个单独的单词。也就是说，`"$@"`等效于`"$1" "$2" …`。如果双引号扩展发生在一个单词内部，则第一个参数的扩展与原始单词的起始部分连接在一起，最后一个参数的扩展与原始单词的最后部分连接在一起。当没有位置参数时，`"$@"`和`$@`都扩展为空（即它们被移除）。

- `#`

  ($#) Expands to the number of positional parameters in decimal.

  ($#) 扩展为十进制中的位置参数数量。

- `?`

  ($?) Expands to the exit status of the most recently executed foreground pipeline.

  ($?) 扩展为最近执行的前台管道的退出状态。

- `-`

  ($-, a hyphen.) Expands to the current option flags as specified upon invocation, by the `set` builtin command, or those set by the shell itself (such as the -i option).

  ($-,一个连字符) 扩展为在调用时指定的当前选项标志，由`set`内置命令指定，或由Shell本身设置（如-i选项）。

- `$`

  ($$) Expands to the process ID of the shell. In a subshell, it expands to the process ID of the invoking shell, not the subshell.

  ($$) 扩展为Shell的进程ID。在子Shell中，它扩展为调用Shell的进程ID，而不是子Shell的进程ID。

- `!`

  ($!) Expands to the process ID of the job most recently placed into the background, whether executed as an asynchronous command or using the `bg` builtin (see [Job Control Builtins](#7-作业控制-Builtins)).

  ($!) 扩展为最近放入后台的作业的进程ID，无论是作为异步命令还是使用`bg`内置命令执行的作业（参见[作业控制内置命令](#7-作业控制-Builtins)）。

- `0`

  ($0) Expands to the name of the shell or shell script. This is set at shell initialization. If Bash is invoked with a file of commands (see [Shell Scripts](#38-shell-脚本)), `$0` is set to the name of that file. If Bash is started with the -c option (see [Invoking Bash](#61-调用bash)), then `$0` is set to the first argument after the string to be executed, if one is present. Otherwise, it is set to the filename used to invoke Bash, as given by argument zero.
  
  ($0) 扩展为Shell或Shell脚本的名称。这在Shell初始化时设置。如果使用命令文件启动Bash（参见[Shell脚本](#38-shell-脚本)），则`$0`设置为该文件的名称。如果使用-c选项启动Bash（参见[调用Bash](#61-调用bash)），那么如果存在的话，`$0`设置为执行字符串后的第一个参数。否则，它设置为用于调用Bash的文件名，由第零个参数给出。





### 3.5 Shell 扩展



Expansion is performed on the command line after it has been split into `token`s. There are seven kinds of expansion performed:

​	扩展是在命令行被分割为`token`之后进行的。执行七种类型的扩展：

- brace expansion
- tilde expansion
- parameter and variable expansion
- command substitution
- arithmetic expansion
- word splitting
- filename expansion
- 花括号扩展
- 波浪号扩展
- 参数和变量扩展
- 命令替换
- 算术扩展
- 字符串拆分
- 文件名扩展

The order of expansions is: brace expansion; tilde expansion, parameter and variable expansion, arithmetic expansion, and command substitution (done in a left-to-right fashion); word splitting; and filename expansion.

​	扩展的顺序是：花括号扩展；波浪号扩展、参数和变量扩展、算术扩展和命令替换（按从左到右的顺序进行）；字符串拆分；文件名扩展。

On systems that can support it, there is an additional expansion available: *process substitution*. This is performed at the same time as tilde, parameter, variable, and arithmetic expansion and command substitution.

​	在可以支持的系统上，还有一种额外的扩展可用：*进程替换*。这在进行波浪号、参数、变量和算术扩展以及命令替换时同时进行。

After these expansions are performed, quote characters present in the original word are removed unless they have been quoted themselves (*quote removal*).

​	这些扩展完成后，会移除原始单词中的引号字符，除非它们已被引用（*引号移除*）。

Only brace expansion, word splitting, and filename expansion can increase the number of words of the expansion; other expansions expand a single word to a single word. The only exceptions to this are the expansions of `"$@"` and `$*` (see [Special Parameters](#342-特殊参数)), and `"${name[@]}"` and `${name[*]}` (see [Arrays](#67-数组)).

​	只有花括号扩展、字符串拆分和文件名扩展可以增加扩展的单词数量；其他扩展将单个单词扩展为单个单词。唯一的例外是`"$@"`和`$*`的扩展（参见[特殊参数](#342-特殊参数)），以及`"${name[@]}"`和`${name[*]}`的扩展（参见[数组](#67-数组)）。

After all expansions, `quote removal` (see [Quote Removal](#359-引号删除-quote-removal)) is performed.

​	在所有扩展完成后，会执行`引号移除`（参见[引号移除](#359-引号删除-quote-removal)）操作。



#### 3.5.1 花括号扩展



Brace expansion is a mechanism by which arbitrary strings may be generated. This mechanism is similar to *filename expansion* (see [Filename Expansion](#358-文件名扩展)), but the filenames generated need not exist. Patterns to be brace expanded take the form of an optional preamble, followed by either a series of comma-separated strings or a sequence expression between a pair of braces, followed by an optional postscript. The preamble is prefixed to each string contained within the braces, and the postscript is then appended to each resulting string, expanding left to right.

​	花括号扩展是一种生成任意字符串的机制。该机制类似于*文件名扩展*（参见[文件名扩展](#358-文件名扩展)），但生成的文件名可以不存在。用于进行花括号扩展的模式采用可选的前导部分，后面是逗号分隔的字符串序列或者位于花括号之间的序列表达式，然后是可选的尾部。前导部分被添加到花括号内的每个字符串之前，然后尾部被追加到每个结果字符串之后，从左到右进行扩展。

Brace expansions may be nested. The results of each expanded string are not sorted; left to right order is preserved. For example,

​	花括号扩展可以嵌套。每个扩展字符串的结果不排序，保持从左到右的顺序。例如，

```
bash$ echo a{d,c,b}e
ade ace abe
```

A sequence expression takes the form `{x..y[..incr]}`, where x and y are either integers or letters, and incr, an optional increment, is an integer. When integers are supplied, the expression expands to each number between x and y, inclusive. Supplied integers may be prefixed with `0` to force each term to have the same width. When either x or y begins with a zero, the shell attempts to force all generated terms to contain the same number of digits, zero-padding where necessary. When letters are supplied, the expression expands to each character lexicographically between x and y, inclusive, using the default C locale. Note that both x and y must be of the same type (integer or letter). When the increment is supplied, it is used as the difference between each term. The default increment is 1 or -1 as appropriate.

​	序列表达式采用`{x..y[..incr]}`的形式，其中x和y可以是整数或字母，incr是可选的增量，是一个整数。当提供整数时，表达式会扩展为x和y之间的每个数字，包括x和y。提供的整数可以以`0`作为前缀，以强制每个项具有相同的宽度。当x或y以零开头时，Shell会尝试强制所有生成的项包含相同数量的数字，必要时用零填充。当提供字母时，表达式会以默认的C语言环境在x和y之间按字典顺序扩展为每个字符。注意x和y必须是相同类型的（整数或字母）。如果提供了增量，它将用作每个项之间的差异。默认的增量是1或-1，视情况而定。

Brace expansion is performed before any other expansions, and any characters special to other expansions are preserved in the result. It is strictly textual. Bash does not apply any syntactic interpretation to the context of the expansion or the text between the braces.

​	花括号扩展是在任何其他扩展之前执行的，其他扩展中的特殊字符在结果中保留。它是严格文本处理的。Bash不对扩展的上下文或花括号之间的文本进行任何语法解释。

A correctly-formed brace expansion must contain unquoted opening and closing braces, and at least one unquoted comma or a valid sequence expression. Any incorrectly formed brace expansion is left unchanged.

​	正确形式的花括号扩展必须包含未引用的开放和闭合花括号，并且至少包含一个未引用的逗号或有效的序列表达式。任何格式不正确的花括号扩展将保持不变。

A { or `,` may be quoted with a backslash to prevent its being considered part of a brace expression. To avoid conflicts with parameter expansion, the string `${` is not considered eligible for brace expansion, and inhibits brace expansion until the closing `}`.

​	通过使用反斜杠对`{`或`,`进行引用，可以防止其被视为花括号表达式的一部分。为避免与参数扩展冲突，字符串`${`不被视为适用于花括号扩展，并且会阻止花括号扩展直到闭合的`}`。

This construct is typically used as shorthand when the common prefix of the strings to be generated is longer than in the above example:

​	当字符串的公共前缀比上面的示例中更长时，通常会使用此结构作为简写：

```
mkdir /usr/local/src/bash/{old,new,dist,bugs}
```

或者

```
chown root /usr/{ucb/{ex,edit},lib/{ex?.?*,how_ex}}
```





#### 3.5.2 波浪号扩展



If a word begins with an unquoted tilde character (`~`), all of the characters up to the first unquoted slash (or all characters, if there is no unquoted slash) are considered a *tilde-prefix*. If none of the characters in the tilde-prefix are quoted, the characters in the tilde-prefix following the tilde are treated as a possible *login name*. If this login name is the null string, the tilde is replaced with the value of the `HOME` shell variable. If `HOME` is unset, the home directory of the user executing the shell is substituted instead. Otherwise, the tilde-prefix is replaced with the home directory associated with the specified login name.

​	如果一个单词以未引用的波浪号字符（`~`）开头，则直到第一个未引用的斜杠（或所有字符，如果没有未引用的斜杠）的所有字符都被视为*波浪号前缀*。如果波浪号前缀中的所有字符都没有被引用，那么波浪号后面的字符被视为可能的*登录名*。如果此登录名为空字符串，则波浪号将被替换为`HOME`的值。如果`HOME`未设置，则替换为执行Shell的用户的主目录。否则，波浪号前缀将被替换为与指定登录名关联的主目录。

If the tilde-prefix is `~+`, the value of the shell variable `PWD` replaces the tilde-prefix. If the tilde-prefix is `~-`, the value of the shell variable `OLDPWD`, if it is set, is substituted.

​	如果波浪号前缀是`~+`，则将其替换为Shell变量`PWD`的值。如果波浪号前缀是`~-`，并且如果已设置，将其替换为Shell变量`OLDPWD`的值。

If the characters following the tilde in the tilde-prefix consist of a number N, optionally prefixed by a `+` or a `-`, the tilde-prefix is replaced with the corresponding element from the directory stack, as it would be displayed by the `dirs` builtin invoked with the characters following tilde in the tilde-prefix as an argument (see [The Directory Stack](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)). If the tilde-prefix, sans the tilde, consists of a number without a leading `+` or `-`, `+` is assumed.

​	如果波浪号后面的字符组成数字N，可选地以`+`或`-`为前缀，那么波浪号前缀将被替换为与目录栈中的相应元素相对应的元素，就像通过将波浪号前缀中的字符作为参数调用`dirs`内置命令来显示的那样（参见[目录栈](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)）。如果没有波浪号的前缀，那么假定它是一个不带有前导`+`或`-`的数字，假定`+`是前缀。

If the login name is invalid, or the tilde expansion fails, the word is left unchanged.

​	如果登录名无效，或波浪号扩展失败，则保持单词不变。

Each variable assignment is checked for unquoted tilde-prefixes immediately following a `:` or the first `=`. In these cases, tilde expansion is also performed. Consequently, one may use filenames with tildes in assignments to `PATH`, `MAILPATH`, and `CDPATH`, and the shell assigns the expanded value.

​	每个变量赋值在`:`或第一个`=`后面立即检查未引用的波浪号前缀。在这些情况下，也会执行波浪号扩展。因此，可以在`PATH`、`MAILPATH`和`CDPATH`的赋值中使用带有波浪号的文件名，Shell将分配扩展后的值。

The following table shows how Bash treats unquoted tilde-prefixes:

​	下表显示了Bash如何处理未引用的波浪号前缀：

- `~`

  The value of `$HOME`

  `$HOME`的值

- `~/foo`

  $HOME/foo

- `~fred/foo`

  The subdirectory `foo` of the home directory of the user `fred`

  用户`fred`的主目录的子目录`foo`

- `~+/foo`

  $PWD/foo

- `~-/foo`

  `${OLDPWD-'~-'}/foo`

- `~N`

  The string that would be displayed by `dirs +N`

  `dirs +N`显示的字符串

- `~+N`

  The string that would be displayed by `dirs +N`

  `dirs +N`显示的字符串

- `~-N`

  The string that would be displayed by `dirs -N`
  
  `dirs -N`显示的字符串

Bash also performs tilde expansion on words satisfying the conditions of variable assignments (see [Shell Parameters](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)) when they appear as arguments to simple commands. Bash does not do this, except for the declaration commands listed above, when in POSIX mode.

​	当作为简单命令的参数出现时，Bash还会对满足变量赋值条件（参见[Shell参数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)）的单词执行波浪号扩展。在POSIX模式下，除了上述列出的声明命令外，Bash不会执行此操作。



#### 3.5.3 Shell参数扩展



The `$` character introduces parameter expansion, command substitution, or arithmetic expansion. The parameter name or symbol to be expanded may be enclosed in braces, which are optional but serve to protect the variable to be expanded from characters immediately following it which could be interpreted as part of the name.

​	`$`字符引入参数扩展、命令替换或算术扩展。要扩展的参数名称或符号可以用花括号括起来，花括号是可选的，但用于保护要扩展的变量，使其不会被其后的字符解释为名称的一部分。

When braces are used, the matching ending brace is the first `}` not escaped by a backslash or within a quoted string, and not within an embedded arithmetic expansion, command substitution, or parameter expansion.

​	当使用花括号时，匹配的结束花括号是第一个未被反斜杠转义或位于引号字符串内的`}`，并且不在嵌套的算术扩展、命令替换或参数扩展中。

The basic form of parameter expansion is ${parameter}. The value of parameter is substituted. The parameter is a shell parameter as described above (see [Shell Parameters](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)) or an array reference (see [Arrays](#67-数组)). The braces are required when parameter is a positional parameter with more than one digit, or when parameter is followed by a character that is not to be interpreted as part of its name.

​	参数扩展的基本形式是`${parameter}`。将替换参数的值。参数是如上所述的Shell参数（参见[Shell参数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)）或数组引用（参见[数组](#67-数组)）。当参数是一个带有多个数字的位置参数时，需要使用花括号，或者当参数后面跟着的字符不被解释为其名称的一部分时。

If the first character of parameter is an exclamation point (!), and parameter is not a nameref, it introduces a level of indirection. Bash uses the value formed by expanding the rest of parameter as the new parameter; this is then expanded and that value is used in the rest of the expansion, rather than the expansion of the original parameter. This is known as `indirect expansion`. The value is subject to tilde expansion, parameter expansion, command substitution, and arithmetic expansion. If parameter is a nameref, this expands to the name of the variable referenced by parameter instead of performing the complete indirect expansion. The exceptions to this are the expansions of `${!prefix*}` and `${!name[@]}` described below. The exclamation point must immediately follow the left brace in order to introduce indirection.

​	如果参数的第一个字符是感叹号（!），并且参数不是`nameref`，它引入了间接扩展的一层。Bash使用扩展参数的其余部分形成的值作为新参数进行扩展；然后对该值进行扩展，并在扩展的其余部分中使用该值，而不是原始参数的扩展。这被称为`间接扩展`。该值会经过波浪号扩展、参数扩展、命令替换和算术扩展。如果参数是`nameref`，它将扩展为由参数引用的变量的名称，而不执行完全的间接扩展。对于`${!prefix*}`和`${!name[@]}`的扩展，这些是例外情况。感叹号必须紧跟在左花括号之后，以引入间接扩展。

In each of the cases below, word is subject to tilde expansion, parameter expansion, command substitution, and arithmetic expansion.

​	在下面的每种情况中，单词都会经过波浪号扩展、参数扩展、命令替换和算术扩展：

When not performing substring expansion, using the form described below (e.g., `:-`), Bash tests for a parameter that is unset or null. Omitting the colon results in a test only for a parameter that is unset. Put another way, if the colon is included, the operator tests for both parameter's existence and that its value is not null; if the colon is omitted, the operator tests only for existence.

​	在不进行子字符串扩展时，使用下面描述的形式（例如，`:-`），Bash会检查未设置或为空的参数。省略冒号只会测试未设置的参数。换句话说，如果包括冒号，运算符会同时测试参数的存在性和其值不为空；如果省略冒号，则运算符只测试存在性。

- `${parameter:-word}`

  If parameter is unset or null, the expansion of word is substituted. Otherwise, the value of parameter is substituted.

  在不进行子字符串扩展时，使用下面描述的形式（例如，`:-`），Bash会检查未设置或为空的参数。省略冒号只会测试未设置的参数。换句话说，如果包括冒号，运算符会同时测试参数的存在性和其值不为空；如果省略冒号，则运算符只测试存在性。

  ```sh
  $ v=123
  $ echo ${v-unset}
  123
  ```

  

- `${parameter:=word}`

  If parameter is unset or null, the expansion of word is assigned to parameter. The value of parameter is then substituted. Positional parameters and special parameters may not be assigned to in this way.

  如果参数未设置或为空，则将`word`的扩展赋值给参数。然后替换为参数的值。在这种方式下，位置参数和特殊参数不能以这种方式赋值。

  ```sh
  $ var=
  $ : ${var:=DEFAULT}
  $ echo $var
  DEFAULT
  ```

- `${parameter:?word}`

  If parameter is null or unset, the expansion of word (or a message to that effect if word is not present) is written to the standard error and the shell, if it is not interactive, exits. Otherwise, the value of parameter is substituted.

  如果参数为空或未设置，则将`word`的扩展（或者如果未提供`word`，则是相关的消息）写入标准错误流，并且如果Shell不是交互式的，则退出。否则，替换为参数的值。

  ```sh
  $ var=
  $ : ${var:?var is unset or null}
  bash: var: var is unset or null
  ```

  

- `${parameter:+word}`

  If parameter is null or unset, nothing is substituted, otherwise the expansion of word is substituted.

  如果参数为空或未设置，则不进行替换；否则替换为`word`的扩展。

  ```sh
  $ var=123
  $ echo ${var:+var is set and not null}
  var is set and not null
  ```

  

- `${parameter:offset}`

- `${parameter:offset:length}`

  This is referred to as Substring Expansion. It expands to up to length characters of the value of parameter starting at the character specified by offset. If parameter is `@` or `*`, an indexed array subscripted by `@` or `*`, or an associative array name, the results differ as described below. If length is omitted, it expands to the substring of the value of parameter starting at the character specified by offset and extending to the end of the value. length and offset are arithmetic expressions (see [Shell Arithmetic](#65-shell-算术)).If offset evaluates to a number less than zero, the value is used as an offset in characters from the end of the value of parameter. If length evaluates to a number less than zero, it is interpreted as an offset in characters from the end of the value of parameter rather than a number of characters, and the expansion is the characters between offset and that result. Note that a negative offset must be separated from the colon by at least one space to avoid being confused with the `:-` expansion.Here are some examples illustrating substring expansion on parameters and subscripted arrays:

  这被称为子字符串扩展。它会根据偏移量从参数的值中的指定字符开始，扩展为长度不超过`length`个字符的子字符串。如果参数是`@`或`*`，用`@`或`*`作为索引的数组或关联数组名称，则结果与下面描述的不同。如果省略了长度，则它会扩展为从偏移量指定的字符开始，延伸到值的结尾的子字符串。长度和偏移量是算术表达式（参见[Shell算术](#65-shell-算术)）。如果偏移量的计算结果为负数，则该值从参数值的末尾起使用作为偏移量。如果长度的计算结果为负数，则它被解释为从参数值的末尾起的字符偏移量，而不是字符的数量，并且扩展是偏移量和该结果之间的字符。注意，负偏移量必须与冒号之间至少有一个空格分开，以避免与`:-`扩展混淆。以下是一些示例，说明了如何在参数和索引数组上进行子字符串扩展：

  ```sh
  $ string=01234567890abcdefgh
  $ echo ${string:7}
  7890abcdefgh
  $ echo ${string:7:0}
  
  $ echo ${string:7:2}
  78
  $ echo ${string:7:-2}
  7890abcdef
  $ echo ${string: -7}
  bcdefgh
  $ echo ${string: -7:0}
  
  $ echo ${string: -7:2}
  bc
  $ echo ${string: -7:-2}
  bcdef
  $ set -- 01234567890abcdefgh
  $ echo ${1:7}
  7890abcdefgh
  $ echo ${1:7:0}
  
  $ echo ${1:7:2}
  78
  $ echo ${1:7:-2}
  7890abcdef
  $ echo ${1: -7}
  bcdefgh
  $ echo ${1: -7:0}
  
  $ echo ${1: -7:2}
  bc
  $ echo ${1: -7:-2}
  bcdef
  $ array[0]=01234567890abcdefgh
  $ echo ${array[0]:7}
  7890abcdefgh
  $ echo ${array[0]:7:0}
  
  $ echo ${array[0]:7:2}
  78
  $ echo ${array[0]:7:-2}
  7890abcdef
  $ echo ${array[0]: -7}
  bcdefgh
  $ echo ${array[0]: -7:0}
  
  $ echo ${array[0]: -7:2}
  bc
  $ echo ${array[0]: -7:-2}
  bcdef
  ```

  If parameter is `@` or `*`, the result is length positional parameters beginning at offset. A negative offset is taken relative to one greater than the greatest positional parameter, so an offset of -1 evaluates to the last positional parameter. It is an expansion error if length evaluates to a number less than zero.The following examples illustrate substring expansion using positional parameters:

  如果参数是`@`或`*`，则结果是从偏移量开始的长度个位置参数。负偏移量相对于最大位置参数加一进行计算，因此偏移量为-1时表示最后一个位置参数。如果长度计算结果为负数，则它是相对于参数值的末尾的字符偏移量，而不是字符的数量，扩展是偏移量和该结果之间的字符。

  ```sh
  $ set -- 1 2 3 4 5 6 7 8 9 0 a b c d e f g h
  $ echo ${@:7}
  7 8 9 0 a b c d e f g h
  $ echo ${@:7:0}
  
  $ echo ${@:7:2}
  7 8
  $ echo ${@:7:-2}
  bash: -2: substring expression < 0
  $ echo ${@: -7:2}
  b c
  $ echo ${@:0}
  ./bash 1 2 3 4 5 6 7 8 9 0 a b c d e f g h
  $ echo ${@:0:2}
  ./bash 1
  $ echo ${@: -7:0}
  ```

  if parameter is an indexed array name subscripted by `@` or `*`, the result is the length members of the array beginning with `${parameter[offset]}`. A negative offset is taken relative to one greater than the maximum index of the specified array. It is an expansion error if length evaluates to a number less than zero.These examples show how you can use substring expansion with indexed arrays:

  如果参数是数组名称，索引为`@`或`*`，则结果是指定数组中的每个成员。如果参数是索引为负数的索引数组名称，则该数字相对于指定数组的最大索引加一进行计算。如果长度计算结果为负数，则它是相对于参数值的末尾的字符偏移量，而不是字符的数量，扩展是偏移量和该结果之间的字符。

  ```sh
  $ array=(0 1 2 3 4 5 6 7 8 9 0 a b c d e f g h)
  $ echo ${array[@]:7}
  7 8 9 0 a b c d e f g h
  $ echo ${array[@]:7:2}
  7 8
  $ echo ${array[@]: -7:2}
  b c
  $ echo ${array[@]: -7:-2}
  bash: -2: substring expression < 0
  $ echo ${array[@]:0}
  0 1 2 3 4 5 6 7 8 9 0 a b c d e f g h
  $ echo ${array[@]:0:2}
  0 1
  $ echo ${array[@]: -7:0}
  ```

  Substring expansion applied to an associative array produces undefined results.Substring indexing is zero-based unless the positional parameters are used, in which case the indexing starts at 1 by default. If offset is 0, and the positional parameters are used, `$0` is prefixed to the list.

  如果参数是关联数组名称，则子字符串扩展的结果未定义。子字符串的索引从零开始，除非使用位置参数，此时索引默认从1开始。如果偏移量为0，并且使用了位置参数，则列表中会添加`$0`。

- `${!prefix*}`

- `${!prefix@}`

  Expands to the names of variables whose names begin with prefix, separated by the first character of the `IFS` special variable. When `@` is used and the expansion appears within double quotes, each variable name expands to a separate word.

  扩展为以`prefix`开头的变量名称，由`IFS`特殊变量的第一个字符分隔。当使用`@`并且扩展出现在双引号内时，每个变量名称会扩展为一个单独的单词。

- `${!name[@]}`

- `${!name[*]}`

  If name is an array variable, expands to the list of array indices (keys) assigned in name. If name is not an array, expands to 0 if name is set and null otherwise. When `@` is used and the expansion appears within double quotes, each key expands to a separate word.

  如果`name`是数组变量，则扩展为分配给`name`的数组索引（键）的列表。如果`name`不是数组，则如果`name`被设置，扩展为0；否则为空。当使用`@`并且扩展出现在双引号内时，每个键会扩展为一个单独的单词。

- `${#parameter}`

  The length in characters of the expanded value of parameter is substituted. If parameter is `*` or `@`, the value substituted is the number of positional parameters. If parameter is an array name subscripted by `*` or `@`, the value substituted is the number of elements in the array. If parameter is an indexed array name subscripted by a negative number, that number is interpreted as relative to one greater than the maximum index of parameter, so negative indices count back from the end of the array, and an index of -1 references the last element.

  替换为参数的扩展值的字符长度。如果参数是`*`或`@`，则替换的值是位置参数的数量。如果参数是由`*`或`@`作为索引的数组名称，则替换的值是数组中的元素数量。如果参数是由负数作为索引的索引数组名称，则该数字相对于参数的最大索引加一进行计算，因此负索引从数组的末尾开始计数，-1索引引用最后一个元素。

- `${parameter#word}`

- `${parameter##word}`

  The word is expanded to produce a pattern and matched according to the rules described below (see [Pattern Matching](#3581-模式匹配)). If the pattern matches the beginning of the expanded value of parameter, then the result of the expansion is the expanded value of parameter with the shortest matching pattern (the `#` case) or the longest matching pattern (the `##` case) deleted. If parameter is `@` or `*`, the pattern removal operation is applied to each positional parameter in turn, and the expansion is the resultant list. If parameter is an array variable subscripted with `@` or `*`, the pattern removal operation is applied to each member of the array in turn, and the expansion is the resultant list.

  `word`被扩展为模式，并根据下面描述的规则进行匹配（参见[模式匹配](#3581-模式匹配)）。如果模式与参数的扩展值的开头匹配，则扩展的结果是参数的扩展值中最短匹配模式（`#`情况）或最长匹配模式（`##`情况）被删除。如果参数是`@`或`*`，则模式删除操作将逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则模式删除操作将逐个应用于数组的每个成员，并且扩展是结果列表。

- `${parameter%word}`

- `${parameter%%word}`

  The word is expanded to produce a pattern and matched according to the rules described below (see [Pattern Matching](#3581-模式匹配)). If the pattern matches a trailing portion of the expanded value of parameter, then the result of the expansion is the value of parameter with the shortest matching pattern (the `%` case) or the longest matching pattern (the `%%` case) deleted. If parameter is `@` or `*`, the pattern removal operation is applied to each positional parameter in turn, and the expansion is the resultant list. If parameter is an array variable subscripted with `@` or `*`, the pattern removal operation is applied to each member of the array in turn, and the expansion is the resultant list.

  `word`被扩展为模式，并根据下面描述的规则进行匹配（参见[模式匹配](#3581-模式匹配)）。如果模式与参数的扩展值的尾部匹配，则扩展的结果是参数的值中最短匹配模式（`%`情况）或最长匹配模式（`%%`情况）被删除。如果参数是`@`或`*`，则模式删除操作将逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则模式删除操作将逐个应用于数组的每个成员，并且扩展是结果列表。

- `${parameter/pattern/string}`

- `${parameter//pattern/string}`

- `${parameter/#pattern/string}`

- `${parameter/%pattern/string}`

  The pattern is expanded to produce a pattern just as in filename expansion. Parameter is expanded and the longest match of pattern against its value is replaced with string. string undergoes tilde expansion, parameter and variable expansion, arithmetic expansion, command and process substitution, and quote removal. The match is performed according to the rules described below (see [Pattern Matching](#3581-模式匹配)).In the first form above, only the first match is replaced. If there are two slashes separating parameter and pattern (the second form above), all matches of pattern are replaced with string. If pattern is preceded by `#` (the third form above), it must match at the beginning of the expanded value of parameter. If pattern is preceded by `%` (the fourth form above), it must match at the end of the expanded value of parameter. If the expansion of string is null, matches of pattern are deleted. If string is null, matches of pattern are deleted and the `/` following pattern may be omitted.If the `patsub_replacement` shell option is enabled using `shopt`, any unquoted instances of `&` in string are replaced with the matching portion of pattern. This is intended to duplicate a common `sed` idiom.Quoting any part of string inhibits replacement in the expansion of the quoted portion, including replacement strings stored in shell variables. Backslash will escape `&` in string; the backslash is removed in order to permit a literal `&` in the replacement string. Users should take care if string is double-quoted to avoid unwanted interactions between the backslash and double-quoting, since backslash has special meaning within double quotes. Pattern substitution performs the check for unquoted `&` after expanding string, so users should ensure to properly quote any occurrences of `&` they want to be taken literally in the replacement and ensure any instances of `&` they want to be replaced are unquoted.For instance,

  `pattern`被扩展为模式，就像文件名扩展一样。参数被扩展，并且匹配模式与参数的值的最长匹配部分被替换为`string`。`string`会经过波浪号扩展、参数和变量扩展、命令和进程替换以及引号移除。匹配按照下面描述的规则进行（参见[模式匹配](#3581-模式匹配)）。在上述的第一种形式中，只会替换第一次匹配。如果有两个斜杠分隔参数和模式（第二种形式），则所有模式的匹配都会替换为`string`。如果模式以`#`开头（第三种形式），则它必须匹配参数的扩展值的开头。如果模式以`%`开头（第四种形式），则它必须匹配参数的扩展值的尾部。如果`string`的扩展结果为空，则删除模式的匹配。如果`string`为空，则删除模式的匹配，并且可以省略跟在模式后面的`/`。如果使用`shopt`启用了`patsub_replacement` shell选项，则`string`中的任何未引用的`&`都会被替换为模式的匹配部分。这旨在复制常见的`sed`习惯用法。引用`string`的任何部分都会阻止在引用部分的扩展中进行替换，包括存储在Shell变量中的替换字符串。反斜杠将转义`string`中的`&`；反斜杠将被删除，以允许替换字符串中包含一个字面的`&`。如果字符串中的`&`被引用，模式替换会在扩展`string`之后执行检查，因此用户应该确保正确引用了他们希望在替换中以字面形式保留的`&`，并确保他们希望被替换的任何`&`都未被引用。例如，

  ```sh
  var=abcdef
  rep='& '
  echo ${var/abc/& }
  echo "${var/abc/& }"
  echo ${var/abc/$rep}
  echo "${var/abc/$rep}"
  ```

  will display four lines of "abc def", while

  会显示四行“abc def”，而

  ```sh
  var=abcdef
  rep='& '
  echo ${var/abc/\& }
  echo "${var/abc/\& }"
  echo ${var/abc/"& "}
  echo ${var/abc/"$rep"}
  ```

  will display four lines of "& def". Like the pattern removal operators, double quotes surrounding the replacement string quote the expanded characters, while double quotes enclosing the entire parameter substitution do not, since the expansion is performed in a context that doesn't take any enclosing double quotes into account.Since backslash can escape `&`, it can also escape a backslash in the replacement string. This means that `\\` will insert a literal backslash into the replacement, so these two `echo` commands

  会显示四行“& def”。与模式删除运算符一样，双引号引起替换字符串时，引号中的字符扩展为一个单词，而包围整个参数替换的双引号则不会，因为扩展是在不考虑任何封闭双引号的上下文中执行的。由于反斜杠可以转义`&`，它也可以转义替换字符串中的反斜杠。这意味着`\\`将插入一个字面的反斜杠到替换中，所以这两个`echo`命令

  ```sh
  var=abcdef
  rep='\\&xyz'
  echo ${var/abc/\\&xyz}
  echo ${var/abc/$rep}
  ```

  will both output `\abcxyzdef`.It should rarely be necessary to enclose only string in double quotes.If the `nocasematch` shell option (see the description of `shopt` in [The Shopt Builtin](#432--shopt内置命令)) is enabled, the match is performed without regard to the case of alphabetic characters. If parameter is `@` or `*`, the substitution operation is applied to each positional parameter in turn, and the expansion is the resultant list. If parameter is an array variable subscripted with `@` or `*`, the substitution operation is applied to each member of the array in turn, and the expansion is the resultant list.

  都会输出`\abcxyzdef`。很少需要仅将`string`用双引号括起来。如果启用了`nocasematch` shell选项（参见[内置的shopt命令](#432--shopt内置命令)的描述），则匹配将忽略字母字符的大小写。如果参数是`@`或`*`，则替换操作将逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则替换操作将逐个应用于数组的每个成员，并且扩展是结果列表。

- `${parameter^pattern}`

- `${parameter^^pattern}`

- `${parameter,pattern}`

- `${parameter,,pattern}`

  This expansion modifies the case of alphabetic characters in parameter. The pattern is expanded to produce a pattern just as in filename expansion. Each character in the expanded value of parameter is tested against pattern, and, if it matches the pattern, its case is converted. The pattern should not attempt to match more than one character.The `^` operator converts lowercase letters matching pattern to uppercase; the `,` operator converts matching uppercase letters to lowercase. The `^^` and `,,` expansions convert each matched character in the expanded value; the `^` and `,` expansions match and convert only the first character in the expanded value. If pattern is omitted, it is treated like a `?`, which matches every character.If parameter is `@` or `*`, the case modification operation is applied to each positional parameter in turn, and the expansion is the resultant list. If parameter is an array variable subscripted with `@` or `*`, the case modification operation is applied to each member of the array in turn, and the expansion is the resultant list.

  此扩展修改参数中的字母字符的大小写。`pattern`被扩展为模式，就像文件名扩展一样。参数的扩展值中的每个字符与`pattern`进行比较，如果匹配`pattern`，则更改其大小写。`^`操作符将匹配`pattern`的小写字母转换为大写；`,`操作符将匹配的大写字母转换为小写。`^^`和`,,`扩展会转换扩展值中每个匹配的字符；`^`和`,`扩展只匹配并转换扩展值中的第一个字符。如果省略`pattern`，它被视为`?`，与每个字符都匹配。如果参数是`@`或`*`，则大小写修改操作将逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则大小写修改操作将逐个应用于数组的每个成员，并且扩展是结果列表。

- `${parameter@operator}`

  The expansion is either a transformation of the value of parameter or information about parameter itself, depending on the value of operator. Each operator is a single letter:
  
  扩展是参数值的转换或关于参数本身的信息，这取决于运算符的值。每个运算符都是一个单个字母：
  
  `U`The expansion is a string that is the value of parameter with lowercase alphabetic characters converted to uppercase.`u`The expansion is a string that is the value of parameter with the first character converted to uppercase, if it is alphabetic.`L`The expansion is a string that is the value of parameter with uppercase alphabetic characters converted to lowercase.`Q`The expansion is a string that is the value of parameter quoted in a format that can be reused as input.`E`The expansion is a string that is the value of parameter with backslash escape sequences expanded as with the `$'…'` quoting mechanism.`P`The expansion is a string that is the result of expanding the value of parameter as if it were a prompt string (see [Controlling the Prompt](#69-控制提示符)).`A`The expansion is a string in the form of an assignment statement or `declare` command that, if evaluated, will recreate parameter with its attributes and value.`K`Produces a possibly-quoted version of the value of parameter, except that it prints the values of indexed and associative arrays as a sequence of quoted key-value pairs (see [Arrays](#67-数组)).`a`The expansion is a string consisting of flag values representing parameter's attributes.`k`Like the `K` transformation, but expands the keys and values of indexed and associative arrays to separate words after word splitting.
  
  `U`：扩展为参数值的字符串，其中小写字母转换为大写。
  
  `u`：扩展为参数值的字符串，其中第一个字符如果是字母则转换为大写。
  
  `L`：扩展为参数值的字符串，其中大写字母转换为小写。
  
  `Q`：扩展为以可以重用作为输入的格式引用的参数值的字符串。
  
  `E`：扩展为参数值的字符串，其中反斜杠转义序列会像`$'...'`引用机制一样展开。
  
  `P`：扩展为扩展参数的值，好像它是一个提示字符串（参见[控制提示符](#69-控制提示符)）。
  
  `A`：扩展为一个字符串，形式为一个赋值语句或`declare`命令，如果评估，将重新创建具有其属性和值的参数。
  
  `K`：生成参数值的可能带引号的版本，除了以引号分隔的索引和关联数组的值以键-值对的形式打印（参见[数组](#67-数组)）。
  
  `a`：扩展为由表示参数属性的标志值组成的字符串。
  
  `k`：像`K`转换一样，但会将索引和关联数组的键和值扩展为分隔的单词。
  
  If parameter is `@` or `*`, the operation is applied to each positional parameter in turn, and the expansion is the resultant list. If parameter is an array variable subscripted with `@` or `*`, the operation is applied to each member of the array in turn, and the expansion is the resultant list.
  
  The result of the expansion is subject to word splitting and filename expansion as described below.
  
  如果参数是`@`或`*`，则操作会逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则操作会逐个应用于数组的每个成员，并且扩展是结果列表。
  
  扩展的结果受到单词分割和文件名扩展的影响，如下所述。





#### 3.5.4 命令替换 Command Substitution



Command substitution allows the output of a command to replace the command itself. Command substitution occurs when a command is enclosed as follows:

​	命令替换允许命令的输出替换为命令本身。命令替换发生在命令被包围的情况下：

```
$(command)
```

或

```
`command`
```

Bash performs the expansion by executing command in a subshell environment and replacing the command substitution with the standard output of the command, with any trailing newlines deleted. Embedded newlines are not deleted, but they may be removed during word splitting. The command substitution `$(cat file)` can be replaced by the equivalent but faster `$(< file)`.

​	Bash通过在子shell环境中执行命令并用命令的标准输出替换命令替换来执行扩展，删除任何尾随的换行符。嵌入的换行符不会被删除，但在分词过程中可能会被移除。命令替换`$(cat file)`可以被等效但更快的`$(< file)`替换。

When the old-style backquote form of substitution is used, backslash retains its literal meaning except when followed by `$`, \`, or `\`. The first backquote not preceded by a backslash terminates the command substitution. When using the `$(command)` form, all characters between the parentheses make up the command; none are treated specially.

​	当使用旧样式的反引号形式进行替换时，反斜杠保留其字面含义，除非后面跟着`$`、`\`或`\`。第一个没有前置反斜杠的反引号终止命令替换。使用`$(command)`形式时，圆括号内的所有字符都组成命令；没有特殊处理。

Command substitutions may be nested. To nest when using the backquoted form, escape the inner backquotes with backslashes.

​	命令替换可以嵌套。当使用反引号形式时，通过反斜杠转义内部反引号来嵌套。

If the substitution appears within double quotes, word splitting and filename expansion are not performed on the results.

​	如果替换出现在双引号内，将不会对结果执行单词分割和文件名扩展。



#### 3.5.5 算术扩展 Arithmetic Expansion



Arithmetic expansion allows the evaluation of an arithmetic expression and the substitution of the result. The format for arithmetic expansion is:

​	算术扩展允许对算术表达式进行求值并替换结果。算术扩展的格式为：

```
$(( expression ))
```

The expression undergoes the same expansions as if it were within double quotes, but double quote characters in expression are not treated specially and are removed. All tokens in the expression undergo parameter and variable expansion, command substitution, and quote removal. The result is treated as the arithmetic expression to be evaluated. Arithmetic expansions may be nested.

​	表达式遵循与双引号内的表达式相同的扩展规则，但是表达式中的双引号字符不会特殊对待，并且会被删除。表达式中的所有标记都会经历参数和变量扩展、命令替换和引号删除。结果被视为要求值的算术表达式。算术扩展可以嵌套。

The evaluation is performed according to the rules listed below (see [Shell Arithmetic](#65-shell-算术)). If the expression is invalid, Bash prints a message indicating failure to the standard error and no substitution occurs.

​	根据以下规则执行计算（参见[Shell算术](#65-shell-算术)）。如果表达式无效，Bash会向标准错误输出打印一个指示失败的消息，并且不进行替换。



#### 3.5.6 进程替换 Process Substitution



Process substitution allows a process's input or output to be referred to using a filename. It takes the form of

​	进程替换允许使用文件名引用进程的输入或输出。它采用以下形式：

```
<(list)
```

或

```
>(list)
```

The process list is run asynchronously, and its input or output appears as a filename. This filename is passed as an argument to the current command as the result of the expansion. If the `>(list)` form is used, writing to the file will provide input for list. If the `<(list)` form is used, the file passed as an argument should be read to obtain the output of list. Note that no space may appear between the `<` or `>` and the left parenthesis, otherwise the construct would be interpreted as a redirection. Process substitution is supported on systems that support named pipes (FIFOs) or the /dev/fd method of naming open files.

进程列表以异步方式运行，并且其输入或输出显示为文件名。该文件名作为扩展的结果作为参数传递给当前命令。如果使用`>(list)`形式，则写入文件将提供给list的输入。如果使用`<(list)`形式，则应该读取作为参数传递的文件以获取list的输出。请注意，`<`或`>`与左括号之间不能有空格，否则将将该结构解释为重定向。进程替换在支持命名管道（FIFO）或以/dev/fd方法命名打开文件的系统上受支持。

When available, process substitution is performed simultaneously with parameter and variable expansion, command substitution, and arithmetic expansion.

​	如果可用，进程替换将与参数和变量扩展、命令替换和算术扩展同时进行。





#### 3.5.7 单词分割 Word Splitting



The shell scans the results of parameter expansion, command substitution, and arithmetic expansion that did not occur within double quotes for word splitting.

​	Shell对未在双引号内发生的参数扩展、命令替换和算术扩展的结果进行单词分割。

The shell treats each character of `$IFS` as a delimiter, and splits the results of the other expansions into words using these characters as field terminators. If `IFS` is unset, or its value is exactly `<space><tab><newline>`, the default, then sequences of `<space>`, `<tab>`, and `<newline>` at the beginning and end of the results of the previous expansions are ignored, and any sequence of `IFS` characters not at the beginning or end serves to delimit words. If `IFS` has a value other than the default, then sequences of the whitespace characters `space`, `tab`, and `newline` are ignored at the beginning and end of the word, as long as the whitespace character is in the value of `IFS` (an `IFS` whitespace character). Any character in `IFS` that is not `IFS` whitespace, along with any adjacent `IFS` whitespace characters, delimits a field. A sequence of `IFS` whitespace characters is also treated as a delimiter. If the value of `IFS` is null, no word splitting occurs.

​	Shell将`$IFS`的每个字符视为分隔符，并使用这些字符作为字段终止符将其他扩展的结果分割为单词。如果`IFS`未设置，或其值正好为`<space><tab><newline>`（默认值），则忽略前一扩展结果的开头和结尾处的`<space>`、`<tab>`和`<newline>`序列，并且不在开头或结尾处的`IFS`字符序列用于分隔单词。如果`IFS`的值不是默认值，则忽略单词开头和结尾处的空白字符（即`space`、`tab`和`newline`），只要空白字符位于`IFS`值（即`IFS`中的空白字符）中。不在开头或结尾的`IFS`空白字符与字段分隔符一起用于分隔字段。连续的`IFS`空白字符序列也被视为分隔符。如果`IFS`的值为空，则不进行单词分割。

Explicit null arguments (`""` or `''`) are retained and passed to commands as empty strings. Unquoted implicit null arguments, resulting from the expansion of parameters that have no values, are removed. If a parameter with no value is expanded within double quotes, a null argument results and is retained and passed to a command as an empty string. When a quoted null argument appears as part of a word whose expansion is non-null, the null argument is removed. That is, the word `-d''` becomes `-d` after word splitting and null argument removal.

​	显式的null 参数（`""`或`''`）会被保留并作为空字符串传递给命令。未加引号的隐式空参数（由没有值的参数展开而来）将被删除。如果没有值的参数在双引号内展开，将产生一个空参数，并作为空字符串保留并传递给命令。当引号引起的空参数出现在其展开结果非空的单词中时，空参数将被删除。也就是说，单词`-d''`在经历单词分割和空参数删除后变为`-d`。

Note that if no expansion occurs, no splitting is performed.

​	注意，如果没有发生扩展，将不进行单词分割。



#### 3.5.8 文件名扩展



After word splitting, unless the -f option has been set (see [The Set Builtin](#431-内置命令set)), Bash scans each word for the characters `*`, `?`, and `[`. If one of these characters appears, and is not quoted, then the word is regarded as a pattern, and replaced with an alphabetically sorted list of filenames matching the pattern (see [Pattern Matching](#3581-模式匹配)). If no matching filenames are found, and the shell option `nullglob` is disabled, the word is left unchanged. If the `nullglob` option is set, and no matches are found, the word is removed. If the `failglob` shell option is set, and no matches are found, an error message is printed and the command is not executed. If the shell option `nocaseglob` is enabled, the match is performed without regard to the case of alphabetic characters.

​	在单词分割之后，除非设置了`-f`选项（参见[内置的set命令](#431-内置命令set)），Bash会对每个单词进行文件名扩展，查找其中是否包含`*`、`?`和`[`字符。如果其中一个字符出现且没有被引用，那么该单词被视为模式，并替换为与该模式匹配的按字母顺序排序的文件列表（参见[模式匹配](#3581-模式匹配)）。如果找不到匹配的文件名，并且shell选项`nullglob`被禁用，则保持该单词不变。如果设置了`nullglob`选项并且找不到匹配的文件名，则删除该单词。如果设置了`failglob` shell选项并且找不到匹配的文件名，则打印错误消息，并且不执行命令。如果启用了`nocaseglob` shell选项，将忽略字母字符的大小写进行匹配。

When a pattern is used for filename expansion, the character `.` at the start of a filename or immediately following a slash must be matched explicitly, unless the shell option `dotglob` is set. In order to match the filenames `.` and `..`, the pattern must begin with `.` (for example, `.?`), even if `dotglob` is set. If the `globskipdots` shell option is enabled, the filenames `.` and `..` are never matched, even if the pattern begins with a `.`. When not matching filenames, the `.` character is not treated specially.

​	当使用文件名扩展的模式时，文件名的开头为`.`的字符或紧跟在斜杠后面的`.`字符必须显式匹配，除非设置了`dotglob`选项。为了匹配文件名`.`和`..`，模式必须以`.`开头（例如`.?`），即使设置了`dotglob`选项。如果启用了`globskipdots` shell选项，则文件名`.`和`..`永远不会匹配，即使模式以`.`开头。当不匹配文件名时，`.`字符不会被特殊处理。

When matching a filename, the slash character must always be matched explicitly by a slash in the pattern, but in other matching contexts it can be matched by a special pattern character as described below (see [Pattern Matching](#3581-模式匹配)).

​	在匹配文件名时，斜杠字符必须始终由模式中的斜杠显式匹配，但在其他匹配上下文中，它可以由特殊的模式字符进行匹配，如下所述（参见[模式匹配](#3581-模式匹配)）。

See the description of `shopt` in [The Shopt Builtin](#432--shopt内置命令), for a description of the `nocaseglob`, `nullglob`, `globskipdots`, `failglob`, and `dotglob` options.

​	有关`shopt`的说明，请参阅[内置的shopt命令](#432--shopt内置命令)，了解`nocaseglob`、`nullglob`、`globskipdots`、`failglob`和`dotglob`选项的说明。

The `GLOBIGNORE` shell variable may be used to restrict the set of file names matching a pattern. If `GLOBIGNORE` is set, each matching file name that also matches one of the patterns in `GLOBIGNORE` is removed from the list of matches. If the `nocaseglob` option is set, the matching against the patterns in `GLOBIGNORE` is performed without regard to case. The filenames . and .. are always ignored when `GLOBIGNORE` is set and not null. However, setting `GLOBIGNORE` to a non-null value has the effect of enabling the `dotglob` shell option, so all other filenames beginning with a `.` will match. To get the old behavior of ignoring filenames beginning with a `.`, make `.*` one of the patterns in `GLOBIGNORE`. The `dotglob` option is disabled when `GLOBIGNORE` is unset.

​	可以使用`GLOBIGNORE` shell变量来限制与模式匹配的文件名集。如果设置了`GLOBIGNORE`，则匹配到的每个文件名如果也与`GLOBIGNORE`中的模式之一匹配，则将其从匹配列表中删除。如果设置了`nocaseglob`选项，则对`GLOBIGNORE`中的模式进行匹配时，不考虑大小写。当设置了`GLOBIGNORE`并且不为null时，`. `和`.. `始终被忽略。但是，将`GLOBIGNORE`设置为非空值会导致启用`dotglob` shell选项，因此所有以`.`开头的其他文件名都会匹配。要获得忽略以`.`开头的文件名的旧行为，请将`.* `设置为`GLOBIGNORE`中的模式。当`GLOBIGNORE`未设置时，禁用`dotglob`选项。



##### 3.5.8.1 模式匹配



Any character that appears in a pattern, other than the special pattern characters described below, matches itself. The NUL character may not occur in a pattern. A backslash escapes the following character; the escaping backslash is discarded when matching. The special pattern characters must be quoted if they are to be matched literally.

​	模式中出现的除特殊模式字符（如下所述）之外的任何字符都与自身匹配。模式中不能包含NUL字符。反斜杠可以转义后面的字符；匹配时将丢弃转义的反斜杠。特殊模式字符如果要按字面意义匹配，则必须用引号引起来。

The special pattern characters have the following meanings:

​	特殊模式字符具有以下含义：

- `*`

  Matches any string, including the null string. When the `globstar` shell option is enabled, and `*` is used in a filename expansion context, two adjacent `*`s used as a single pattern will match all files and zero or more directories and subdirectories. If followed by a `/`, two adjacent `*`s will match only directories and subdirectories.

  匹配任何字符串，包括空字符串。当启用`globstar` shell选项，并且在文件名扩展上下文中使用`*`时，两个相邻的`*`作为一个模式将匹配所有文件和零个或多个目录和子目录。如果跟在`/`后面，两个相邻的`*`将只匹配目录和子目录。

- `?`

  Matches any single character.

  匹配任何单个字符。

- `[…]`

  Matches any one of the enclosed characters. A pair of characters separated by a hyphen denotes a range expression; any character that falls between those two characters, inclusive, using the current locale's collating sequence and character set, is matched. If the first character following the `[` is a `!` or a `^` then any character not enclosed is matched. A `-` may be matched by including it as the first or last character in the set. A `]` may be matched by including it as the first character in the set. The sorting order of characters in range expressions, and the characters included in the range, are determined by the current locale and the values of the `LC_COLLATE` and `LC_ALL` shell variables, if set.For example, in the default C locale, `[a-dx-z]` is equivalent to `[abcdxyz]`. Many locales sort characters in dictionary order, and in these locales `[a-dx-z]` is typically not equivalent to `[abcdxyz]`; it might be equivalent to `[aBbCcDdxYyZz]`, for example. To obtain the traditional interpretation of ranges in bracket expressions, you can force the use of the C locale by setting the `LC_COLLATE` or `LC_ALL` environment variable to the value `C`, or enable the `globasciiranges` shell option.Within `[` and `]`, *character classes* can be specified using the syntax `[:`class`:]`, where class is one of the following classes defined in the POSIX standard:
  
  匹配括号内的任何一个字符。由连字符分隔的一对字符表示一个范围表达式；符合当前区域设置的字符排序和字符集的任何字符都会匹配。如果`[`后面的第一个字符是`!`或`^`，则匹配未被括起来的任何字符。`-`可以通过将其包含在集合的第一个或最后一个字符来匹配。`[`可以通过将其作为集合的第一个字符来匹配。范围表达式中字符的排序顺序以及范围中包含的字符由当前区域设置和`LC_COLLATE`和`LC_ALL` shell变量的值（如果设置）决定。例如，在默认的C区域设置中，`[a-dx-z]`等同于`[abcdxyz]`。许多区域设置按字典顺序对字符进行排序，在这些区域设置中，`[a-dx-z]`通常不等同于`[abcdxyz]`；例如，它可能等同于`[aBbCcDdxYyZz]`。要获得括号表达式中范围的传统解释，可以通过将`LC_COLLATE`或`LC_ALL`环境变量设置为值`C`或启用`globasciiranges` shell选项来强制使用C区域设置。在`[`和`]`之间，可以使用*字符类*来指定字符类，语法为`[:`class`:]`，其中class是POSIX标准中定义的以下类之一：
  
  ```
  alnum   alpha   ascii   blank   cntrl   digit   graph   lower
  print   punct   space   upper   word    xdigit
  ```
  
  A character class matches any character belonging to that class. The `word` character class matches letters, digits, and the character `_`.Within `[` and `]`, an *equivalence class* can be specified using the syntax `[=`c`=]`, which matches all characters with the same collation weight (as defined by the current locale) as the character c.Within `[` and `]`, the syntax `[.`symbol`.]` matches the collating symbol symbol.
  
  字符类匹配属于该类的任何字符。*等价类*可以使用语法`[=`c`=]`指定，其中c是具有相同排序权重的所有字符（根据当前区域设置）的字符。在`[`和`]`之间，语法`[.`symbol`.]`匹配排序符号symbol。

If the `extglob` shell option is enabled using the `shopt` builtin, the shell recognizes several extended pattern matching operators. In the following description, a pattern-list is a list of one or more patterns separated by a `|`. When matching filenames, the `dotglob` shell option determines the set of filenames that are tested, as described above. Composite patterns may be formed using one or more of the following sub-patterns:

​	如果使用`shopt`内置命令启用了`extglob` shell选项，那么shell将识别几个扩展的模式匹配运算符。在下面的描述中，模式列表是由`|`分隔的一个或多个模式的列表。在匹配文件名时，`dotglob` shell选项决定要测试的文件名集合，如上所述。可以使用以下子模式来形成复合模式：

- `?(pattern-list)`

  Matches zero or one occurrence of the given patterns.

  匹配给定模式的零个或一个实例。

- `*(pattern-list)`

  Matches zero or more occurrences of the given patterns.

  匹配给定模式的零个或多个实例。

- `+(pattern-list)`

  Matches one or more occurrences of the given patterns.

  匹配给定模式的一个或多个实例。

- `@(pattern-list)`

  Matches one of the given patterns.

  匹配给定模式之一。

- `!(pattern-list)`

  Matches anything except one of the given patterns.
  
  匹配除给定模式之外的任何内容。

The `extglob` option changes the behavior of the parser, since the parentheses are normally treated as operators with syntactic meaning. To ensure that extended matching patterns are parsed correctly, make sure that `extglob` is enabled before parsing constructs containing the patterns, including shell functions and command substitutions.

​	`extglob`选项会更改解析器的行为，因为括号通常被视为具有句法含义的运算符。为了确保正确解析扩展匹配模式，请确保在解析包含模式的结构（包括shell函数和命令替换）之前启用了`extglob`。

When matching filenames, the `dotglob` shell option determines the set of filenames that are tested: when `dotglob` is enabled, the set of filenames includes all files beginning with `.`, but the filenames `.` and `..` must be matched by a pattern or sub-pattern that begins with a dot; when it is disabled, the set does not include any filenames beginning with “.” unless the pattern or sub-pattern begins with a `.`. As above, `.` only has a special meaning when matching filenames.

​	在匹配文件名时，`dotglob` shell选项确定要测试的文件名集合：当`dotglob`被启用时，文件名集合包括以`.`开头的所有文件，但是文件名`.`和`..`必须由以点开头的模式或子模式匹配；当禁用时，该集合不包括以“.”开头的任何文件名，除非模式或子模式以`.`开头。如上所述，`.`仅在匹配文件名时具有特殊意义。

Complicated extended pattern matching against long strings is slow, especially when the patterns contain alternations and the strings contain multiple matches. Using separate matches against shorter strings, or using arrays of strings instead of a single long string, may be faster.

​	复杂的针对长字符串的扩展模式匹配速度较慢，特别是当模式包含选择项并且字符串包含多个匹配项时。使用针对较短字符串的单独匹配，或者使用字符串数组而不是单个长字符串，可能会更快。



#### 3.5.9 引号删除 Quote Removal

After the preceding expansions, all unquoted occurrences of the characters `\`, `'`, and `"` that did not result from one of the above expansions are removed.

​	在前述扩展之后，将删除所有未加引号的出现的字符`\`、`'`和`"`，这些字符不是由上述扩展之一产生的。



### 3.6 重定向



Before a command is executed, its input and output may be *redirected* using a special notation interpreted by the shell. *Redirection* allows commands` file handles to be duplicated, opened, closed, made to refer to different files, and can change the files the command reads from and writes to. Redirection may also be used to modify file handles in the current shell execution environment. The following redirection operators may precede or appear anywhere within a simple command or may follow a command. Redirections are processed in the order they appear, from left to right.

​	在执行命令之前，可以使用Shell解释的特殊符号对其输入和输出进行*重定向*。*重定向*允许命令的文件句柄被复制、打开、关闭、指向不同文件，并且可以更改命令读取和写入的文件。重定向还可以用于修改当前Shell执行环境中的文件句柄。下面的重定向运算符可以在简单命令之前、之中的任何位置出现，或者可以跟在命令之后。重定向按从左到右的顺序处理。

Each redirection that may be preceded by a file descriptor number may instead be preceded by a word of the form {varname}. In this case, for each redirection operator except >&- and <&-, the shell will allocate a file descriptor greater than 10 and assign it to {varname}. If >&- or <&- is preceded by {varname}, the value of varname defines the file descriptor to close. If {varname} is supplied, the redirection persists beyond the scope of the command, allowing the shell programmer to manage the file descriptor's lifetime manually. The `varredir_close` shell option manages this behavior (see [The Shopt Builtin](#432--shopt内置命令)).

​	可以用形式为{varname}的单词来替代可能由文件描述符之前的数字替代。在这种情况下，对于除了>&-和<&-之外的每个重定向运算符，Shell将分配一个大于10的文件描述符，并将其分配给{varname}。如果>&-或<&-之前带有{varname}，则varname的值定义要关闭的文件描述符。如果提供了{varname}，则重定向会持续超出命令的范围，允许Shell程序员手动管理文件描述符的生命周期。`varredir_close` shell选项管理此行为（参见[内置的shopt命令](#432--shopt内置命令)）。

In the following descriptions, if the file descriptor number is omitted, and the first character of the redirection operator is `<`, the redirection refers to the standard input (file descriptor 0). If the first character of the redirection operator is `>`, the redirection refers to the standard output (file descriptor 1).

​	在下面的描述中，如果省略了文件描述符，并且重定向运算符号的第一个字符是`<`，则重定向引用标准输入（文件描述符0）。如果重定向运算符号的第一个字符是`>`，则重定向引用标准输出（文件描述符1）。

The word following the redirection operator in the following descriptions, unless otherwise noted, is subjected to brace expansion, tilde expansion, parameter expansion, command substitution, arithmetic expansion, quote removal, filename expansion, and word splitting. If it expands to more than one word, Bash reports an error.

​	以下描述中重定向运算符号后面的单词（除非另有说明）将经历花括号扩展、波浪线扩展、参数扩展、命令替换、算术扩展、引号删除、文件名扩展和单词分割。如果它扩展为多个单词，Bash会报告一个错误。

Note that the order of redirections is significant. For example, the command

​	请注意，重定向的顺序很重要。例如，命令

```
ls > dirlist 2>&1
```

directs both standard output (file descriptor 1) and standard error (file descriptor 2) to the file dirlist, while the command

​	将标准输出（文件描述符1）和标准错误（文件描述符2）都重定向到文件dirlist，而命令

```
ls 2>&1 > dirlist
```

directs only the standard output to file dirlist, because the standard error was made a copy of the standard output before the standard output was redirected to dirlist.

仅将标准输出重定向到文件dirlist，因为在将标准输出重定向到dirlist之前，标准错误已经复制了标准输出。

Bash handles several filenames specially when they are used in redirections, as described in the following table. If the operating system on which Bash is running provides these special files, bash will use them; otherwise it will emulate them internally with the behavior described below.

​	Bash在处理特定的文件名时会特殊处理它们，如下表所述。如果Bash运行的操作系统提供了这些特殊文件，bash将使用它们；否则，它将在内部模拟这些行为。

- `/dev/fd/fd`

  If fd is a valid integer, file descriptor fd is duplicated.

  如果fd是一个有效的整数，将复制文件描述符fd。

- `/dev/stdin`

  File descriptor 0 is duplicated.

  复制文件描述符0。

- `/dev/stdout`

  File descriptor 1 is duplicated.

  复制文件描述符1。

- `/dev/stderr`

  File descriptor 2 is duplicated.

  复制文件描述符2。

- `/dev/tcp/host/port`

  If host is a valid hostname or Internet address, and port is an integer port number or service name, Bash attempts to open the corresponding TCP socket.

  如果host是一个有效的主机名或Internet地址，且port是一个整数端口号或服务名，则Bash尝试打开相应的TCP套接字。

- `/dev/udp/host/port`

  If host is a valid hostname or Internet address, and port is an integer port number or service name, Bash attempts to open the corresponding UDP socket.
  
  如果host是一个有效的主机名或Internet地址，且port是一个整数端口号或服务名，则Bash尝试打开相应的UDP套接字。

A failure to open or create a file causes the redirection to fail.

​	打开或创建文件失败会导致重定向失败。

Redirections using file descriptors greater than 9 should be used with care, as they may conflict with file descriptors the shell uses internally.

​	使用大于9的文件描述符进行重定向时应谨慎，因为它们可能与Shell在内部使用的文件描述符发生冲突。






#### 3.6.1 重定向输入

Redirection of input causes the file whose name results from the expansion of word to be opened for reading on file descriptor `n`, or the standard input (file descriptor 0) if `n` is not specified.

​	输入重定向会导致以word展开的文件名在文件描述符n上被打开以进行读取，如果未指定n，则使用标准输入（文件描述符0）。

The general format for redirecting input is:

​	重定向输入的一般格式为：

```
[n]<word
```

#### 3.6.2 重定向输出

Redirection of output causes the file whose name results from the expansion of word to be opened for writing on file descriptor n, or the standard output (file descriptor 1) if n is not specified. If the file does not exist it is created; if it does exist it is truncated to zero size.

​	输出重定向会导致以word展开的文件名在文件描述符n上被打开以进行写入，如果未指定n，则使用标准输出（文件描述符1）。如果文件不存在，则创建它；如果文件存在，则将其截断为零大小。

The general format for redirecting output is:

​	重定向输出的一般格式为：

```
[n]>[|]word
```

If the redirection operator is `>`, and the `noclobber` option to the `set` builtin has been enabled, the redirection will fail if the file whose name results from the expansion of word exists and is a regular file. If the redirection operator is `>|`, or the redirection operator is `>` and the `noclobber` option is not enabled, the redirection is attempted even if the file named by word exists.

​	如果重定向运算符为`>`，并且已启用了`set`内置命令的`noclobber`选项，则如果以word展开的文件存在且为常规文件，则重定向将失败。如果重定向运算符为`>|`，或者重定向运算符为`>`且未启用`noclobber`选项，则尝试重定向，即使word指定的文件已存在。

#### 3.6.3 追加重定向输出

Redirection of output in this fashion causes the file whose name results from the expansion of word to be opened for appending on file descriptor n, or the standard output (file descriptor 1) if n is not specified. If the file does not exist it is created.

​	以这种方式进行的输出重定向会导致以word展开的文件名在文件描述符n上以追加方式打开，如果未指定n，则使用标准输出（文件描述符1）。如果文件不存在，则创建它。

The general format for appending output is:

​	追加输出的一般格式为：

```
[n]>>word
```

#### 3.6.4 重定向标准输出和标准错误输出

This construct allows both the standard output (file descriptor 1) and the standard error output (file descriptor 2) to be redirected to the file whose name is the expansion of word.

​	此结构允许将标准输出（文件描述符1）和标准错误输出（文件描述符2）都重定向到以word展开的文件名。

There are two formats for redirecting standard output and standard error:

​	重定向标准输出和标准错误的两种格式为：

```
&>word
```

和

```
>&word
```

Of the two forms, the first is preferred. This is semantically equivalent to

其中第一种形式更常用。这在语义上等同于

```
>word 2>&1
```

When using the second form, word may not expand to a number or `-`. If it does, other redirection operators apply (see Duplicating File Descriptors below) for compatibility reasons.

​	使用第二种形式时，word不能展开为数字或`-`。如果展开为数字或`-`，则适用其他重定向运算符（参见下面的复制文件描述符）。出于兼容性原因，word不会展开为数字或`-`。

#### 3.6.5 追加标准输出和标准错误输出

This construct allows both the standard output (file descriptor 1) and the standard error output (file descriptor 2) to be appended to the file whose name is the expansion of word.

​	此结构允许将标准输出（文件描述符1）和标准错误输出（文件描述符2）都追加到以word展开的文件名。

The format for appending standard output and standard error is:

​	追加标准输出和标准错误的格式为：

```
&>>word
```

This is semantically equivalent to

​	这在语义上等同于

```
>>word 2>&1
```

(see Duplicating File Descriptors below).

（参见下面的复制文件描述符）。

#### 3.6.6 Here Documents

This type of redirection instructs the shell to read input from the current source until a line containing only word (with no trailing blanks) is seen. All of the lines read up to that point are then used as the standard input (or file descriptor n if n is specified) for a command.

​	这种类型的重定向指示Shell从当前源读取输入，直到看到只包含word（无尾随空白）的行为止。然后，到目前为止读取的所有行都被用作命令的标准输入（或者如果指定了n，则为文件描述符n）。

The format of here-documents is:

​	Here文档的格式为：

```
[n]<<[-]word
        here-document
delimiter
```

No parameter and variable expansion, command substitution, arithmetic expansion, or filename expansion is performed on word. If any part of word is quoted, the delimiter is the result of quote removal on word, and the lines in the here-document are not expanded. If word is unquoted, all lines of the here-document are subjected to parameter expansion, command substitution, and arithmetic expansion, the character sequence `\newline` is ignored, and `\` must be used to quote the characters `\`, `$`, and \`.

​	对于word，不执行参数和变量展开、命令替换、算术展开或文件名扩展。如果word的任何部分都带引号，则定界符是对word执行引号删除的结果，并且Here文档中的行不会被展开。如果word没有带引号，则Here文档的所有行都会经过参数展开、命令替换和算术展开，字符序列`\newline`被忽略，必须使用`\`来引用字符`\`、`$`和\`。

If the redirection operator is `<<-`, then all leading tab characters are stripped from input lines and the line containing delimiter. This allows here-documents within shell scripts to be indented in a natural fashion.

​	如果重定向运算符为`<<-`，则会从输入行和包含定界符的行中删除所有前导制表符。这样，Shell脚本中的Here文档可以以自然方式进行缩进。

#### 3.6.7 Here Strings

A variant of here documents, the format is:

​	Here文档的一种变体，格式为

```
[n]<<< word
```

The word undergoes tilde expansion, parameter and variable expansion, command substitution, arithmetic expansion, and quote removal. Filename expansion and word splitting are not performed. The result is supplied as a single string, with a newline appended, to the command on its standard input (or file descriptor n if n is specified).

​	word经过波浪线展开、参数和变量展开、命令替换、算术展开和引号删除。不执行文件名扩展和单词分割。结果被作为单个字符串附加了换行符，提供给命令作为其标准输入（或者如果指定了n，则为文件描述符n）。

#### 3.6.8 复制文件描述符

The redirection operator

​	重定向运算符

```
[n]<&word
```

is used to duplicate input file descriptors. If word expands to one or more digits, the file descriptor denoted by n is made to be a copy of that file descriptor. If the digits in word do not specify a file descriptor open for input, a redirection error occurs. If word evaluates to `-`, file descriptor n is closed. If n is not specified, the standard input (file descriptor 0) is used.

用于复制输入文件描述符。如果word展开为一个或多个数字，则文件描述符n将被设置为该文件描述符的副本。如果word中的数字未指定用于输入的文件描述符，则会出现重定向错误。如果word评估为`-`，则关闭文件描述符n。如果未指定n，则使用标准输入（文件描述符0）。

​	操作符

```
[n]>&word
```

is used similarly to duplicate output file descriptors. If n is not specified, the standard output (file descriptor 1) is used. If the digits in word do not specify a file descriptor open for output, a redirection error occurs. If word evaluates to `-`, file descriptor n is closed. As a special case, if n is omitted, and word does not expand to one or more digits or `-`, the standard output and standard error are redirected as described previously.

用于类似地复制输出文件描述符。如果未指定n，则使用标准输出（文件描述符1）。如果word中的数字未指定用于输出的文件描述符，则会出现重定向错误。如果word评估为`-`，则关闭文件描述符n。作为特例，如果省略了n，并且word没有展开为一个或多个数字或`-`，则会按照前面描述的方式重定向标准输出和标准错误。

#### 3.6.9 移动文件描述符

The redirection operator

​	重定向运算符

```
[n]<&digit-
```

moves the file descriptor digit to file descriptor n, or the standard input (file descriptor 0) if n is not specified. digit is closed after being duplicated to n.

将文件描述符digit移动到文件描述符n，如果未指定n，则移动到标准输入（文件描述符0）。在复制到n之后，将关闭digit。

Similarly, the redirection operator

​	类似地，重定向运算符

```
[n]>&digit-
```

moves the file descriptor digit to file descriptor n, or the standard output (file descriptor 1) if n is not specified.

将文件描述符digit移动到文件描述符n，如果未指定n，则移动到标准输出（文件描述符1）。

#### 3.6.10 为读取和写入打开文件描述符

The redirection operator

​	重定向运算符

```
[n]<>word
```

causes the file whose name is the expansion of word to be opened for both reading and writing on file descriptor n, or on file descriptor 0 if n is not specified. If the file does not exist, it is created.

会导致以word展开的文件名在文件描述符n上同时以读取和写入的方式打开，如果未指定n，则在文件描述符0上打开。如果文件不存在，则创建它。



### 3.7 执行命令




#### 3.7.1 简单命令展开 Simple Command Expansion



When a simple command is executed, the shell performs the following expansions, assignments, and redirections, from left to right, in the following order.

​	当执行简单命令时，Shell按照从左到右的顺序执行以下展开、赋值和重定向操作：

1. The words that the parser has marked as variable assignments (those preceding the command name) and redirections are saved for later processing.
2. 将解析器标记为变量赋值（位于命令名称之前）和重定向的单词保存以供后续处理。
3. The words that are not variable assignments or redirections are expanded (see [Shell Expansions](#35-shell-扩展)). If any words remain after expansion, the first word is taken to be the name of the command and the remaining words are the arguments.
4. 对不是变量赋值或重定向的单词进行展开（参见[Shell扩展](#35-shell-扩展)）。如果展开后仍有单词剩余，则将第一个单词作为命令名称，剩余的单词作为参数。
5. Redirections are performed as described above (see [Redirections](#36-重定向)).
6. 执行重定向，如上所述（参见[重定向](#36-重定向)）。
7. The text after the `=` in each variable assignment undergoes tilde expansion, parameter expansion, command substitution, arithmetic expansion, and quote removal before being assigned to the variable.
8. 在将文本赋值给变量之前，对每个变量赋值中等号后面的文本进行波浪线展开、参数展开、命令替换、算术展开和引号删除。

If no command name results, the variable assignments affect the current shell environment. In the case of such a command (one that consists only of assignment statements and redirections), assignment statements are performed before redirections. Otherwise, the variables are added to the environment of the executed command and do not affect the current shell environment. If any of the assignments attempts to assign a value to a readonly variable, an error occurs, and the command exits with a non-zero status.

​	如果没有命令名称结果，变量赋值会影响当前的Shell环境。对于这种命令（只包含赋值语句和重定向的命令），在执行重定向之前执行赋值语句。否则，变量将添加到执行的命令的环境中，并且不会影响当前的Shell环境。如果任何赋值尝试将值赋给只读变量，将会出现错误，并且命令以非零状态退出。

If no command name results, redirections are performed, but do not affect the current shell environment. A redirection error causes the command to exit with a non-zero status.

​	如果没有命令名称结果，将执行重定向，但不会影响当前的Shell环境。如果发生重定向错误，命令将以非零状态退出。

If there is a command name left after expansion, execution proceeds as described below. Otherwise, the command exits. If one of the expansions contained a command substitution, the exit status of the command is the exit status of the last command substitution performed. If there were no command substitutions, the command exits with a status of zero.

​	如果展开后仍然有命令名称剩余，执行过程如下所述。否则，命令退出。如果展开中包含命令替换，则命令的退出状态是最后一个命令替换的退出状态。如果没有命令替换，则命令以零状态退出。





#### 3.7.2 命令搜索和执行



After a command has been split into words, if it results in a simple command and an optional list of arguments, the following actions are taken.

​	将命令分割为单词后，如果结果是一个简单命令和一个可选的参数列表，则执行以下操作： 

1. If the command name contains no slashes, the shell attempts to locate it. If there exists a shell function by that name, that function is invoked as described in [Shell Functions](#33-shell-函数).
2. 如果命令名称不包含斜杠，则Shell尝试定位它。如果存在与该名称相同的Shell函数，则调用该函数（参见[Shell函数](#33-shell-函数)）。
3. If the name does not match a function, the shell searches for it in the list of shell builtins. If a match is found, that builtin is invoked.
4. 如果名称不匹配函数，则Shell在Shell内置命令列表中搜索它。如果找到匹配项，则调用该内置命令。
5. If the name is neither a shell function nor a builtin, and contains no slashes, Bash searches each element of `$PATH` for a directory containing an executable file by that name. Bash uses a hash table to remember the full pathnames of executable files to avoid multiple `PATH` searches (see the description of `hash` in [Bourne Shell Builtins](#41-bourne-shell-builtins)). A full search of the directories in `$PATH` is performed only if the command is not found in the hash table. If the search is unsuccessful, the shell searches for a defined shell function named `command_not_found_handle`. If that function exists, it is invoked in a separate execution environment with the original command and the original command's arguments as its arguments, and the function's exit status becomes the exit status of that subshell. If that function is not defined, the shell prints an error message and returns an exit status of 127.
6. 如果名称既不是Shell函数也不是内置命令，并且不包含斜杠，则Bash会在`$PATH`列表的每个元素中搜索包含该名称的可执行文件目录。Bash使用哈希表来记住可执行文件的完整路径名，以避免多次搜索`PATH`（参见[Bourne Shell内置命令](#41-bourne-shell-builtins)中`hash`的描述）。只有在哈希表中找不到命令时才会执行对`PATH`中目录的完全搜索。如果搜索失败，则Shell会搜索名为`command_not_found_handle`的已定义Shell函数。如果该函数存在，则在单独的执行环境中调用它，参数为原始命令及其原始命令的参数，并且该函数的退出状态成为该子shell的退出状态。如果未定义该函数，则Shell打印错误消息，并返回退出状态为127。
7. If the search is successful, or if the command name contains one or more slashes, the shell executes the named program in a separate execution environment. Argument 0 is set to the name given, and the remaining arguments to the command are set to the arguments supplied, if any.
8. 如果搜索成功，或者命令名称包含一个或多个斜杠，则Shell在单独的执行环境中执行指定的程序。参数0被设置为给定的名称，剩余的参数设置为提供的参数（如果有）。
9. If this execution fails because the file is not in executable format, and the file is not a directory, it is assumed to be a *shell script* and the shell executes it as described in [Shell Scripts](#38-shell-脚本).
10. 如果执行失败，因为文件不是可执行格式，且文件不是目录，则假定它是一个*Shell脚本*，Shell将按照[Shell脚本](#38-shell-脚本)中的描述执行它。
11. If the command was not begun asynchronously, the shell waits for the command to complete and collects its exit status.
12. 如果命令未以异步方式启动，则Shell等待命令完成并收集其退出状态。





#### 3.7.3 命令执行环境



The shell has an *execution environment*, which consists of the following:

​	Shell具有一个*执行环境*，包括以下内容：

- open files inherited by the shell at invocation, as modified by redirections supplied to the `exec` builtin
- Shell在调用时继承的打开文件，以及通过`exec`内置命令提供的重定向所修改的文件
- the current working directory as set by `cd`, `pushd`, or `popd`, or inherited by the shell at invocation
- 由`cd`、`pushd`或`popd`设置的当前工作目录，或在调用时由Shell继承的目录
- the file creation mode mask as set by `umask` or inherited from the shell's parent
- 由`umask`设置的文件创建模式掩码，或从Shell的父进程继承的模式掩码
- current traps set by `trap`
- 由`trap`设置的当前陷阱
- shell parameters that are set by variable assignment or with `set` or inherited from the shell's parent in the environment
- 通过变量赋值、`set`或从Shell的父进程继承的参数设置
- shell functions defined during execution or inherited from the shell's parent in the environment
- 在执行期间定义的Shell函数或从Shell的父进程继承的函数
- options enabled at invocation (either by default or with command-line arguments) or by `set`
- 在调用时启用的选项（默认情况下或通过命令行参数）或通过`set`启用的选项
- options enabled by `shopt` (see [The Shopt Builtin](#432--shopt内置命令))
- 通过`shopt`启用的选项（参见[内置命令shopt](#432--shopt内置命令)）
- shell aliases defined with `alias` (see [Aliases](#66-别名))
- 使用`alias`定义的Shell别名（参见[别名](#66-别名)）
- various process IDs, including those of background jobs (see [Lists of Commands](#324-命令列表)), the value of `$$`, and the value of `$PPID`
- 各种进程ID，包括后台作业的ID（参见[命令列表](#324-命令列表)）、`$$`的值和`$PPID`的值

When a simple command other than a builtin or shell function is to be executed, it is invoked in a separate execution environment that consists of the following. Unless otherwise noted, the values are inherited from the shell.

​	除非另有说明，否则在执行简单命令时，如果不是内置命令或Shell函数，将在一个独立的执行环境中调用它，该环境包括以下内容。这些值除非另有说明，否则都是从Shell继承的。 

- the shell's open files, plus any modifications and additions specified by redirections to the command
- Shell的打开文件，以及通过重定向到命令指定的任何修改和添加
- the current working directory
- 当前工作目录
- the file creation mode mask
- 文件创建模式掩码
- shell variables and functions marked for export, along with variables exported for the command, passed in the environment (see [Environment](#374-环境))
- 标记为导出的Shell变量和函数，以及通过环境传递给命令的导出变量（参见[环境](#374-环境)）
- traps caught by the shell are reset to the values inherited from the shell's parent, and traps ignored by the shell are ignored
- Shell中捕获的陷阱将被重置为从Shell的父进程继承的值，而Shell忽略的陷阱将被忽略

A command invoked in this separate environment cannot affect the shell's execution environment.

​	在这个独立的环境中调用的命令无法影响Shell的执行环境。

A *subshell* is a copy of the shell process.

​	*子Shell* 是Shell进程的副本。

Command substitution, commands grouped with parentheses, and asynchronous commands are invoked in a subshell environment that is a duplicate of the shell environment, except that traps caught by the shell are reset to the values that the shell inherited from its parent at invocation. Builtin commands that are invoked as part of a pipeline are also executed in a subshell environment. Changes made to the subshell environment cannot affect the shell's execution environment.

​	命令替换、带括号的命令组合和异步命令在子Shell环境中调用，该环境是Shell环境的副本，除了Shell捕获的陷阱被重置为Shell在启动时从其父进程继承的值。作为管道的一部分执行的内置命令也在子Shell环境中执行。对子Shell环境进行的更改不会影响Shell的执行环境。

Subshells spawned to execute command substitutions inherit the value of the -e option from the parent shell. When not in POSIX mode, Bash clears the -e option in such subshells.

​	生成用于执行命令替换的子Shell继承父Shell的-e选项的值。在非POSIX模式下，Bash会在此类子Shell中清除-e选项。

If a command is followed by a `&` and job control is not active, the default standard input for the command is the empty file /dev/null. Otherwise, the invoked command inherits the file descriptors of the calling shell as modified by redirections.

​	如果命令后面跟着`&`并且作业控制未激活，则命令的默认标准输入是空文件`/dev/null`。否则，调用的命令将继承由重定向修改的调用Shell的文件描述符。



#### 3.7.4 环境



When a program is invoked it is given an array of strings called the *environment*. This is a list of name-value pairs, of the form `name=value`.

​	当调用一个程序时，它会获得一个名为*环境*的字符串数组。这是一个以`name=value`形式表示的名称-值对列表。

Bash provides several ways to manipulate the environment. On invocation, the shell scans its own environment and creates a parameter for each name found, automatically marking it for `export` to child processes. Executed commands inherit the environment. The `export` and `declare -x` commands allow parameters and functions to be added to and deleted from the environment. If the value of a parameter in the environment is modified, the new value becomes part of the environment, replacing the old. The environment inherited by any executed command consists of the shell's initial environment, whose values may be modified in the shell, less any pairs removed by the `unset` and `export -n` commands, plus any additions via the `export` and `declare -x` commands.

​	Bash提供了多种方法来操作环境。在启动时，Shell扫描自己的环境并为每个找到的名称创建一个参数，自动将其标记为导出到子进程。执行的命令继承环境。`export`和`declare -x`命令允许将参数和函数添加到环境中，并从环境中删除它们。如果修改环境中的参数的值，新值将成为环境的一部分，替换旧值。由任何执行的命令继承的环境包括Shell的初始环境，其值可以在Shell中进行修改，减去由`unset`和`export -n`命令删除的任何对，以及通过`export`和`declare -x`命令添加的任何附加对。

The environment for any simple command or function may be augmented temporarily by prefixing it with parameter assignments, as described in [Shell Parameters](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters). These assignment statements affect only the environment seen by that command.

​	任何简单命令或函数的环境可以通过在其前面加上参数赋值来临时增加，如[Shell参数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)中所述。这些赋值语句仅影响该命令所见的环境。

If the -k option is set (see [The Set Builtin](#431-内置命令set)), then all parameter assignments are placed in the environment for a command, not just those that precede the command name.

​	如果设置了-k选项（参见[内置命令set](#431-内置命令set)），则所有的参数赋值都会放置在命令的环境中，而不仅仅是在命令名称之前的赋值。

When Bash invokes an external command, the variable `$_` is set to the full pathname of the command and passed to that command in its environment.

​	当Bash调用外部命令时，变量`$_`被设置为命令的完整路径名，并在其环境中传递给该命令。





#### 3.7.5 退出状态



The exit status of an executed command is the value returned by the `waitpid` system call or equivalent function. Exit statuses fall between 0 and 255, though, as explained below, the shell may use values above 125 specially. Exit statuses from shell builtins and compound commands are also limited to this range. Under certain circumstances, the shell will use special values to indicate specific failure modes.

​	执行的命令的退出状态是由`waitpid`系统调用或等效函数返回的值。退出状态的范围在0到255之间，然而，如下所述，Shell可能会对大于125的值使用特殊含义。Shell内置命令和复合命令的退出状态也限制在此范围内。在某些情况下，Shell将使用特殊值来指示特定的失败模式。

For the shell's purposes, a command which exits with a zero exit status has succeeded. A non-zero exit status indicates failure. This seemingly counter-intuitive scheme is used so there is one well-defined way to indicate success and a variety of ways to indicate various failure modes. When a command terminates on a fatal signal whose number is N, Bash uses the value 128+N as the exit status.

​	对于Shell来说，以零退出状态的命令表示成功。非零退出状态表示失败。这种看似反直觉的方案是为了有一个明确的指示成功的方式，以及多种指示不同失败模式的方式。当命令因为编号为N的致命信号而终止时，Bash使用值128+N作为退出状态。

If a command is not found, the child process created to execute it returns a status of 127. If a command is found but is not executable, the return status is 126.

​	如果找不到命令，则用于执行命令的子进程返回状态127。如果找到命令但无法执行，则返回状态为126。

If a command fails because of an error during expansion or redirection, the exit status is greater than zero.

​	如果命令因为展开或重定向期间的错误而失败，则退出状态大于零。

The exit status is used by the Bash conditional commands (see [Conditional Constructs](#3252-条件结构)) and some of the list constructs (see [Lists of Commands](#324-命令列表)).

​	退出状态用于Bash条件命令（参见[条件结构](#3252-条件结构)）和某些列表结构（参见[命令列表](#324-命令列表)）。

All of the Bash builtins return an exit status of zero if they succeed and a non-zero status on failure, so they may be used by the conditional and list constructs. All builtins return an exit status of 2 to indicate incorrect usage, generally invalid options or missing arguments.

​	所有Bash内置命令如果成功则返回退出状态0，失败则返回非零状态，因此它们可以被条件和列表结构使用。所有的内置命令在用法不正确、通常为无效的选项或缺少参数时返回退出状态2。

The exit status of the last command is available in the special parameter $? (see [Special Parameters](#342-特殊参数)).

​	最后一个命令的退出状态在特殊参数`$?`中可用（参见[特殊参数](#342-特殊参数)）。





#### 3.7.6 信号



When Bash is interactive, in the absence of any traps, it ignores `SIGTERM` (so that `kill 0` does not kill an interactive shell), and `SIGINT` is caught and handled (so that the `wait` builtin is interruptible). When Bash receives a `SIGINT`, it breaks out of any executing loops. In all cases, Bash ignores `SIGQUIT`. If job control is in effect (see [Job Control](#7-作业控制)), Bash ignores `SIGTTIN`, `SIGTTOU`, and `SIGTSTP`.

​	当Bash处于交互模式时，在没有任何陷阱的情况下，它会忽略`SIGTERM`（以便`kill 0`不会杀死交互式Shell），并且会捕获和处理`SIGINT`（以便可中断`wait`内置命令）。当Bash接收到`SIGINT`时，它会跳出正在执行的任何循环。在所有情况下，Bash都会忽略`SIGQUIT`。如果启用了作业控制（参见[作业控制](#7-作业控制)），Bash会忽略`SIGTTIN`、`SIGTTOU`和`SIGTSTP`。

Non-builtin commands started by Bash have signal handlers set to the values inherited by the shell from its parent. When job control is not in effect, asynchronous commands ignore `SIGINT` and `SIGQUIT` in addition to these inherited handlers. Commands run as a result of command substitution ignore the keyboard-generated job control signals `SIGTTIN`, `SIGTTOU`, and `SIGTSTP`.

​	由Bash启动的非内置命令的信号处理程序被设置为从其父Shell继承的值。当未启用作业控制时，异步命令除了继承的处理程序之外还会忽略`SIGINT`和`SIGQUIT`。作为命令替换结果运行的命令会忽略由键盘生成的作业控制信号`SIGTTIN`、`SIGTTOU`和`SIGTSTP`。

The shell exits by default upon receipt of a `SIGHUP`. Before exiting, an interactive shell resends the `SIGHUP` to all jobs, running or stopped. Stopped jobs are sent `SIGCONT` to ensure that they receive the `SIGHUP`. To prevent the shell from sending the `SIGHUP` signal to a particular job, it should be removed from the jobs table with the `disown` builtin (see [Job Control Builtins](#7-作业控制-Builtins)) or marked to not receive `SIGHUP` using `disown -h`.

​	Shell在收到`SIGHUP`时默认退出。在退出之前，交互式Shell会重新发送`SIGHUP`给所有运行或停止的作业。已停止的作业会收到`SIGCONT`以确保它们接收到`SIGHUP`。为了防止Shell向特定作业发送`SIGHUP`信号，可以使用`disown`内置命令将其从作业列表中删除（参见[作业控制内置命令](#7-作业控制-Builtins)），或者使用`disown -h`将其标记为不接收`SIGHUP`。

If the `huponexit` shell option has been set with `shopt` (see [The Shopt Builtin](#432--shopt内置命令)), Bash sends a `SIGHUP` to all jobs when an interactive login shell exits.

​	如果使用`shopt`设置了`huponexit` Shell选项（参见[内置命令shopt](#432--shopt内置命令)），当交互式登录Shell退出时，Bash会向所有作业发送`SIGHUP`。

If Bash is waiting for a command to complete and receives a signal for which a trap has been set, the trap will not be executed until the command completes. When Bash is waiting for an asynchronous command via the `wait` builtin, the reception of a signal for which a trap has been set will cause the `wait` builtin to return immediately with an exit status greater than 128, immediately after which the trap is executed.

​	如果Bash正在等待命令完成，并收到已设置陷阱的信号，则陷阱将在命令完成后才执行。当Bash通过`wait`内置命令等待异步命令时，收到已设置陷阱的信号将导致`wait`内置命令立即返回大于128的退出状态，之后立即执行陷阱。

When job control is not enabled, and Bash is waiting for a foreground command to complete, the shell receives keyboard-generated signals such as `SIGINT` (usually generated by `^C`) that users commonly intend to send to that command. This happens because the shell and the command are in the same process group as the terminal, and `^C` sends `SIGINT` to all processes in that process group. See [Job Control](#7-作业控制), for a more in-depth discussion of process groups.

​	当未启用作业控制并且Bash正在等待前台命令完成时，Shell会接收由键盘生成的信号，如`SIGINT`（通常由`^C`生成），这通常是用户希望发送给该命令的信号。这是因为Shell和命令与终端处于同一进程组中，`^C`会向该进程组中的所有进程发送`SIGINT`。有关进程组的更详细讨论，请参见[作业控制](#7-作业控制)。

When Bash is running without job control enabled and receives `SIGINT` while waiting for a foreground command, it waits until that foreground command terminates and then decides what to do about the `SIGINT`:

​	当Bash在未启用作业控制的情况下运行，并在等待前台命令时接收到`SIGINT`时，它会等待该前台命令终止，然后决定如何处理`SIGINT`： 

1. If the command terminates due to the `SIGINT`, Bash concludes that the user meant to end the entire script, and acts on the `SIGINT` (e.g., by running a `SIGINT` trap or exiting itself);
2. 如果命令由于`SIGINT`而终止，Bash认为用户意图结束整个脚本，并对`SIGINT`进行处理（例如，运行`SIGINT`陷阱或自行退出）；
3. If the pipeline does not terminate due to `SIGINT`, the program handled the `SIGINT` itself and did not treat it as a fatal signal. In that case, Bash does not treat `SIGINT` as a fatal signal, either, instead assuming that the `SIGINT` was used as part of the program's normal operation (e.g., `emacs` uses it to abort editing commands) or deliberately discarded. However, Bash will run any trap set on `SIGINT`, as it does with any other trapped signal it receives while it is waiting for the foreground command to complete, for compatibility.
4. 如果管道没有因`SIGINT`而终止，程序自身处理了`SIGINT`并且没有将其视为致命信号。在这种情况下，Bash也不会将`SIGINT`视为致命信号，而是假定`SIGINT`是作为程序正常操作的一部分（例如，`emacs`使用它来中止编辑命令）或者故意丢弃的。然而，Bash将运行在等待前台命令完成时设置的任何陷阱，就像在接收到其他任何陷阱信号时一样，以保持兼容性。





### 3.8 Shell 脚本



A shell script is a text file containing shell commands. When such a file is used as the first non-option argument when invoking Bash, and neither the -c nor -s option is supplied (see [Invoking Bash](#61-调用bash)), Bash reads and executes commands from the file, then exits. This mode of operation creates a non-interactive shell. The shell first searches for the file in the current directory, and looks in the directories in `$PATH` if not found there.

​	Shell脚本是包含Shell命令的文本文件。当在调用Bash时将这样的文件用作第一个非选项参数，并且没有提供`-c`或`-s`选项（参见[调用Bash](#61-调用bash)），Bash会从文件中读取并执行命令，然后退出。这种操作模式创建了一个非交互式的Shell。Shell首先在当前目录中搜索该文件，如果在当前目录中找不到，则在`$PATH`中的目录中查找。

When Bash runs a shell script, it sets the special parameter `0` to the name of the file, rather than the name of the shell, and the positional parameters are set to the remaining arguments, if any are given. If no additional arguments are supplied, the positional parameters are unset.

​	当Bash运行Shell脚本时，它将特殊参数`0`设置为文件名，而不是Shell的名称，并且如果给定了其他参数，则将位置参数设置为剩余的参数。如果没有提供额外的参数，则未设置位置参数。

A shell script may be made executable by using the `chmod` command to turn on the execute bit. When Bash finds such a file while searching the `$PATH` for a command, it creates a new instance of itself to execute it. In other words, executing

​	可以使用`chmod`命令将Shell脚本设置为可执行。当Bash在`$PATH`中搜索命令时找到这样的文件时，它会创建一个新的实例来执行它。换句话说，执行

```
filename arguments
```

is equivalent to executing

相当于执行

```
bash filename arguments
```

if `filename` is an executable shell script. This subshell reinitializes itself, so that the effect is as if a new shell had been invoked to interpret the script, with the exception that the locations of commands remembered by the parent (see the description of `hash` in [Bourne Shell Builtins](#41-bourne-shell-builtins)) are retained by the child.

如果`filename`是一个可执行的Shell脚本。这个子Shell会重新初始化自己，所以效果就像是调用一个新的Shell来解释脚本，除了父Shell记住的命令位置（参见[Bourne Shell内置命令](#41-bourne-shell-builtins)中`hash`的描述）由子Shell保留。

Most versions of Unix make this a part of the operating system's command execution mechanism. If the first line of a script begins with the two characters `#!`, the remainder of the line specifies an interpreter for the program and, depending on the operating system, one or more optional arguments for that interpreter. Thus, you can specify Bash, `awk`, Perl, or some other interpreter and write the rest of the script file in that language.

​	Unix的大多数版本将此作为操作系统的命令执行机制的一部分。如果脚本的第一行以`#!`两个字符开头，那么行的其余部分指定了程序的解释器，并且根据操作系统的不同，可能还有一个或多个可选的解释器参数。因此，您可以指定Bash、`awk`、Perl或其他解释器，并在该语言中编写剩余的脚本文件。

The arguments to the interpreter consist of one or more optional arguments following the interpreter name on the first line of the script file, followed by the name of the script file, followed by the rest of the arguments supplied to the script. The details of how the interpreter line is split into an interpreter name and a set of arguments vary across systems. Bash will perform this action on operating systems that do not handle it themselves. Note that some older versions of Unix limit the interpreter name and a single argument to a maximum of 32 characters, so it's not portable to assume that using more than one argument will work.

​	解释器的参数由脚本文件的第一行的解释器名称后面的一个或多个可选参数组成，然后是脚本文件的名称，然后是传递给脚本的其余参数。解释器行如何分割为解释器名称和一组参数的细节因系统而异。Bash将在不处理的操作系统上执行此操作。请注意，某些旧版本的Unix将解释器名称和单个参数限制为最多32个字符，因此不能假定使用多个参数是可移植的。

Bash scripts often begin with `#! /bin/bash` (assuming that Bash has been installed in /bin), since this ensures that Bash will be used to interpret the script, even if it is executed under another shell. It's a common idiom to use `env` to find `bash` even if it's been installed in another directory: `#!/usr/bin/env bash` will find the first occurrence of `bash` in `$PATH`.

​	Bash脚本通常以`#! /bin/bash`开头（假设Bash已安装在/bin中），这样可以确保使用Bash解释脚本，即使在另一个Shell下执行也是如此。使用`env`查找`bash`是常见的习惯用法，即使它已安装在另一个目录中：`#!/usr/bin/env bash`将在`$PATH`中找到第一个出现的`bash`。





## 4 Shell 内置命令

Builtin commands are contained within the shell itself. When the name of a builtin command is used as the first word of a simple command (see [Simple Commands](#322-简单命令)), the shell executes the command directly, without invoking another program. Builtin commands are necessary to implement functionality impossible or inconvenient to obtain with separate utilities.

​	内置命令包含在Shell内部。当内置命令的名称用作简单命令的第一个单词时（参见[简单命令](#322-简单命令)），Shell直接执行该命令，而不是调用另一个程序。内置命令是为了实现不可能或不方便使用单独的实用工具获得的功能。

This section briefly describes the builtins which Bash inherits from the Bourne Shell, as well as the builtin commands which are unique to or have been extended in Bash.

​	本节简要描述了Bash从Bourne Shell继承的内置命令，以及Bash特有的或已扩展的内置命令。

Several builtin commands are described in other chapters: builtin commands which provide the Bash interface to the job control facilities (see [Job Control Builtins](#7-作业控制-Builtins)), the directory stack (see [Directory Stack Builtins](#681-目录栈内置命令)), the command history (see [Bash History Builtins](#92-bash历史内置命令), and the programmable completion facilities (see [Programmable Completion Builtins](#87-可编程完成内置命令)).

​	其他章节中描述了几个内置命令：提供Bash与作业控制功能的内置命令（参见[作业控制内置命令](#72-作业控制内置命令)），目录栈（参见[目录栈内置命令](#681-目录栈内置命令)），命令历史记录（参见[Bash历史记录内置命令](#92-bash历史内置命令）和可编程完成功能（参见[可编程完成内置命令](#87-可编程完成内置命令)）。

Many of the builtins have been extended by POSIX or Bash.

​	许多内置命令已经被POSIX或Bash扩展。

Unless otherwise noted, each builtin command documented as accepting options preceded by `-` accepts `--` to signify the end of the options. The `:`, `true`, `false`, and `test`/`[` builtins do not accept options and do not treat `--` specially. The `exit`, `logout`, `return`, `break`, `continue`, `let`, and `shift` builtins accept and process arguments beginning with `-` without requiring `--`. Other builtins that accept arguments but are not specified as accepting options interpret arguments beginning with `-` as invalid options and require `--` to prevent this interpretation.

​	除非另有说明，每个内置命令文档中都以`-`开头的选项都接受`--`来表示选项的结束。`:`、`true`、`false`和`test`/`[`内置命令不接受选项，也不特别处理`--`。`exit`、`logout`、`return`、`break`、`continue`、`let`和`shift`内置命令接受并处理以`-`开头的参数，而不需要`--`。其他接受参数但未指定接受选项的内置命令将参数的以`-`开头视为无效选项，并要求`--`来防止此解释。






### 4.1 Bourne Shell Builtins

The following shell builtin commands are inherited from the Bourne Shell. These commands are implemented as specified by the POSIX standard.

​	下面的内置命令是从 Bourne Shell 继承的。这些命令按照 POSIX 标准的规定实现。

- `: (a colon)`

  ```
  : [arguments]
  ```

  Do nothing beyond expanding arguments and performing redirections. The return status is zero.

  除了扩展参数和执行重定向外，什么也不做。返回状态为零。

- `. (a period)`

  ```
  . filename [arguments]
  ```

  Read and execute commands from the filename argument in the current shell context. If filename does not contain a slash, the `PATH` variable is used to find filename, but filename does not need to be executable. When Bash is not in POSIX mode, it searches the current directory if filename is not found in `$PATH`. If any arguments are supplied, they become the positional parameters when filename is executed. Otherwise the positional parameters are unchanged. If the -T option is enabled, `.` inherits any trap on `DEBUG`; if it is not, any `DEBUG` trap string is saved and restored around the call to `.`, and `.` unsets the `DEBUG` trap while it executes. If -T is not set, and the sourced file changes the `DEBUG` trap, the new value is retained when `.` completes. The return status is the exit status of the last command executed, or zero if no commands are executed. If filename is not found, or cannot be read, the return status is non-zero. This builtin is equivalent to `source`.

  在当前 Shell 上下文中读取并执行文件名参数中的命令。如果文件名不包含斜杠，则使用 `PATH` 变量来查找文件名，但文件名不需要是可执行的。当 Bash 不处于 POSIX 模式时，如果在 `$PATH` 中找不到文件名，则在当前目录中搜索它。如果提供了任何参数，则在执行文件名时它们成为位置参数。否则，位置参数保持不变。如果启用了 `-T` 选项，则 `.` 继承 `DEBUG` 陷阱；如果没有，则会保存和恢复 `DEBUG` 陷阱，并在调用 `.` 时取消设置 `DEBUG` 陷阱。如果未设置 `-T`，并且源文件更改了 `DEBUG` 陷阱，则在 `.` 完成后保留新值。返回状态是最后执行的命令的退出状态，如果没有执行命令，则为零。如果找不到文件名，或无法读取文件，则返回状态为非零。此内置命令等效于 `source`。

- `break`

  ```
  break [n]
  ```

  Exit from a `for`, `while`, `until`, or `select` loop. If n is supplied, the nth enclosing loop is exited. n must be greater than or equal to 1. The return status is zero unless n is not greater than or equal to 1.

  退出 `for`、`while`、`until` 或 `select` 循环。如果提供了 n，将退出第 n 个外层循环。n 必须大于或等于 1。返回状态为零，除非 n 不大于或等于 1。

- `cd`

  ```
  cd [-L|[-P [-e]] [-@] [directory]
  ```

  Change the current working directory to directory. If directory is not supplied, the value of the `HOME` shell variable is used. If the shell variable `CDPATH` exists, it is used as a search path: each directory name in `CDPATH` is searched for directory, with alternative directory names in `CDPATH` separated by a colon (`:`). If directory begins with a slash, `CDPATH` is not used.The -P option means to not follow symbolic links: symbolic links are resolved while `cd` is traversing directory and before processing an instance of `..` in directory.By default, or when the -L option is supplied, symbolic links in directory are resolved after `cd` processes an instance of `..` in directory.If `..` appears in directory, it is processed by removing the immediately preceding pathname component, back to a slash or the beginning of directory.If the -e option is supplied with -P and the current working directory cannot be successfully determined after a successful directory change, `cd` will return an unsuccessful status.On systems that support it, the -@ option presents the extended attributes associated with a file as a directory.If directory is `-`, it is converted to `$OLDPWD` before the directory change is attempted.If a non-empty directory name from `CDPATH` is used, or if `-` is the first argument, and the directory change is successful, the absolute pathname of the new working directory is written to the standard output.If the directory change is successful, `cd` sets the value of the `PWD` environment variable to the new directory name, and sets the `OLDPWD` environment variable to the value of the current working directory before the change.The return status is zero if the directory is successfully changed, non-zero otherwise.

  将当前工作目录更改为目录。如果未提供目录，则使用 `HOME` shell 变量的值。如果存在 `CDPATH` shell 变量，则使用它作为搜索路径：在 `CDPATH` 中的每个目录名称中搜索目录，`CDPATH` 中的备选目录名称用冒号（`:`）分隔。如果目录以斜杠开头，则不使用 `CDPATH`。`-P` 选项表示不跟随符号链接：当 `cd` 遍历目录并在处理目录中的 `..` 实例之前，解析符号链接。默认情况下（或提供 `-L` 选项时），`cd` 在处理目录中的 `..` 实例之后解析符号链接。如果目录中出现 `..`，则通过删除前一个路径名组件来处理它，直到斜杠或目录开始为止。如果使用 `-P` 选项和 `-e`，并且在成功更改目录后无法成功确定当前工作目录，则 `cd` 将返回一个失败状态。在支持的系统上，`-@` 选项将以目录的形式呈现与文件关联的扩展属性。如果目录为 `-`，则在尝试更改目录之前将其转换为 `$OLDPWD`。如果使用 `CDPATH` 中的非空目录名，或者如果 `-` 是第一个参数，并且目录更改成功，则新工作目录的绝对路径名将写入标准输出。如果目录更改成功，则 `cd` 将 `PWD` 环境变量的值设置为新目录名，并将 `OLDPWD` 环境变量设置为更改之前的当前工作目录的值。如果目录成功更改，则返回状态为零，否则为非零。

- `continue`

  ```
  continue [n]
  ```

  Resume the next iteration of an enclosing `for`, `while`, `until`, or `select` loop. If n is supplied, the execution of the nth enclosing loop is resumed. n must be greater than or equal to 1. The return status is zero unless n is not greater than or equal to 1.

  继续执行下一个 `for`、`while`、`until` 或 `select` 循环的迭代。如果提供了 n，将恢复执行第 n 个外层循环。n 必须大于或等于 1。返回状态为零，除非 n 不大于或等于 1。

- `eval`

  ```
  eval [arguments]
  ```

  The arguments are concatenated together into a single command, which is then read and executed, and its exit status returned as the exit status of `eval`. If there are no arguments or only empty arguments, the return status is zero.

  将参数连接成一个单个命令，然后读取并执行该命令，并将其退出状态作为 `eval` 的退出状态返回。如果没有参数或只有空参数，返回状态为零。

- `exec`

  ```
  exec [-cl] [-a name] [command [arguments]]
  ```

  If command is supplied, it replaces the shell without creating a new process. If the -l option is supplied, the shell places a dash at the beginning of the zeroth argument passed to command. This is what the `login` program does. The -c option causes command to be executed with an empty environment. If -a is supplied, the shell passes name as the zeroth argument to command. If command cannot be executed for some reason, a non-interactive shell exits, unless the `execfail` shell option is enabled. In that case, it returns failure. An interactive shell returns failure if the file cannot be executed. A subshell exits unconditionally if `exec` fails. If no command is specified, redirections may be used to affect the current shell environment. If there are no redirection errors, the return status is zero; otherwise the return status is non-zero.

  如果提供了命令，则它会替换当前的 shell 而不创建新的进程。如果提供了 `-l` 选项，shell 会在传递给命令的第一个参数的零号参数前面放置一个破折号。这就是 `login` 程序所做的。`-c` 选项使命令在一个空环境中执行。如果提供了 `-a`，则 shell 将名称作为零号参数传递给命令。如果由于某种原因无法执行命令，则非交互式 shell 退出，除非启用了 `execfail` shell 选项。在这种情况下，它返回失败。如果文件无法执行，则交互式 shell 返回失败。如果 `exec` 失败，子 shell 将无条件退出。如果未指定命令，则可以使用重定向来影响当前的 shell 环境。如果没有重定向错误，则返回状态为零；否则返回状态为非零。

- `exit`

  ```
  exit [n]
  ```

  Exit the shell, returning a status of n to the shell's parent. If n is omitted, the exit status is that of the last command executed. Any trap on `EXIT` is executed before the shell terminates.

  退出 Shell，并将状态 n 返回给 Shell 的父进程。如果省略了 n，则退出状态为最后执行的命令的状态。Shell 终止之前，会执行任何 `EXIT` 陷阱。

- `export`

  ```
  export [-fn] [-p] [name[=value]]
  ```

  Mark each name to be passed to child processes in the environment. If the -f option is supplied, the names refer to shell functions; otherwise the names refer to shell variables. The -n option means to no longer mark each name for export. If no names are supplied, or if the -p option is given, a list of names of all exported variables is displayed. The -p option displays output in a form that may be reused as input. If a variable name is followed by =value, the value of the variable is set to value.The return status is zero unless an invalid option is supplied, one of the names is not a valid shell variable name, or -f is supplied with a name that is not a shell function.

  在环境中标记每个名称以传递给子进程。如果提供了 `-f` 选项，则名称引用 shell 函数；否则名称引用 shell 变量。`-n` 选项表示不再标记每个名称用于导出。如果未提供名称，或者提供了 `-p` 选项，则显示所有导出变量的名称列表。其他选项可用于将输出限制为一部分导出名称集。`-p` 选项以可重用作为输入的形式显示输出。如果变量名称后跟 `=value`，则将变量的值设置为 value。返回状态为零，除非提供了无效选项、一个名称不是有效的 shell 变量名称，或者 `-f` 选项与不是 shell 函数的名称一起提供。

- `getopts`

  ```
  getopts optstring name [arg …]
  ```

  `getopts` is used by shell scripts to parse positional parameters. optstring contains the option characters to be recognized; if a character is followed by a colon, the option is expected to have an argument, which should be separated from it by whitespace. The colon (`:`) and question mark (`?`) may not be used as option characters. Each time it is invoked, `getopts` places the next option in the shell variable name, initializing name if it does not exist, and the index of the next argument to be processed into the variable `OPTIND`. `OPTIND` is initialized to 1 each time the shell or a shell script is invoked. When an option requires an argument, `getopts` places that argument into the variable `OPTARG`. The shell does not reset `OPTIND` automatically; it must be manually reset between multiple calls to `getopts` within the same shell invocation if a new set of parameters is to be used.When the end of options is encountered, `getopts` exits with a return value greater than zero. `OPTIND` is set to the index of the first non-option argument, and name is set to `?`.`getopts` normally parses the positional parameters, but if more arguments are supplied as arg values, `getopts` parses those instead.`getopts` can report errors in two ways. If the first character of optstring is a colon, silent error reporting is used. In normal operation, diagnostic messages are printed when invalid options or missing option arguments are encountered. If the variable `OPTERR` is set to 0, no error messages will be displayed, even if the first character of `optstring` is not a colon.If an invalid option is seen, `getopts` places `?` into name and, if not silent, prints an error message and unsets `OPTARG`. If `getopts` is silent, the option character found is placed in `OPTARG` and no diagnostic message is printed.If a required argument is not found, and `getopts` is not silent, a question mark (`?`) is placed in name, `OPTARG` is unset, and a diagnostic message is printed. If `getopts` is silent, then a colon (`:`) is placed in name and `OPTARG` is set to the option character found.

  `getopts` 用于解析位置参数的 shell 脚本。选项字符串包含要识别的选项字符；如果字符后面跟着冒号，则该选项应具有参数，参数应与其以空格分隔。冒号（`:`）和问号（`?`）不能用作选项字符。每次调用它时，`getopts` 将下一个选项放入 shell 变量名称中，并将下一个要处理的参数的索引放入变量 `OPTIND` 中。`OPTIND` 每次 Shell 或 Shell 脚本被调用时都会初始化为 1。当一个选项需要一个参数时，`getopts` 将该参数放入变量 `OPTARG` 中。Shell 不会自动重置 `OPTIND`；如果在同一次 Shell 调用中多次调用 `getopts`，需要手动重置它，以便使用新的参数集。遇到选项结束时，`getopts` 以大于零的返回值退出。`OPTIND` 设置为第一个非选项参数的索引，并且名称设置为 `?`。`getopts` 通常解析位置参数，但如果提供了更多的参数作为参数值，则 `getopts` 将解析这些参数。

  `getopts` 可以以两种方式报告错误。如果选项字符串的第一个字符是冒号，则使用静默错误报告。在正常操作中，当遇到无效选项或缺少选项参数时，将打印诊断消息。如果变量 `OPTERR` 设置为 0，则不会显示错误消息，即使选项字符串的第一个字符不是冒号。如果看到无效选项，则 `getopts` 将 `?` 放入名称中，并且如果不是静默的，打印一个错误消息并取消设置 `OPTARG`。如果 `getopts` 是静默的，则找到的选项字符放入 `OPTARG`，并且不打印诊断消息。

  如果未找到所需的参数，并且 `getopts` 不是静默的，则将问号（`?`）放入名称中，将 `OPTARG` 取消设置，并打印一个诊断消息。如果 `getopts` 是静默的，则将冒号（`:`）放入名称中，并将 `OPTARG` 设置为找到的选项字符。

- `hash`

  ```
  hash [-r] [-p filename] [-dt] [name]
  ```

  Each time `hash` is invoked, it remembers the full pathnames of the commands specified as name arguments, so they need not be searched for on subsequent invocations. The commands are found by searching through the directories listed in `$PATH`. Any previously-remembered pathname is discarded. The -p option inhibits the path search, and filename is used as the location of name. The -r option causes the shell to forget all remembered locations. The -d option causes the shell to forget the remembered location of each name. If the -t option is supplied, the full pathname to which each name corresponds is printed. If multiple name arguments are supplied with -t, the name is printed before the hashed full pathname. The -l option causes output to be displayed in a format that may be reused as input. If no arguments are given, or if only -l is supplied, information about remembered commands is printed. The return status is zero unless a name is not found or an invalid option is supplied.

  每次调用 `hash` 时，它会记住作为名称参数指定的命令的完整路径名，因此不需要在后续调用中搜索它们。通过在 `$PATH` 中列出的目录中进行搜索来找到这些命令。任何先前记住的路径名都将被丢弃。`-p` 选项阻止路径搜索，并使用文件名作为名称的位置。`-r` 选项导致 shell 忘记所有已记住的位置。`-d` 选项导致 shell 忘记每个名称的记住位置。如果提供了 `-t` 选项，则打印每个名称对应的完整路径名。如果使用 `-t` 提供多个名称参数，则在打印散列的完整路径名之前打印名称。`-l` 选项导致以可重用作为输入的格式显示输出。如果没有给出参数，或仅提供了 `-l`，则打印有关已记住的命令的信息。返回状态为零，除非找不到名称或提供了无效选项。

- `pwd`

  ```
  pwd [-LP]
  ```

  Print the absolute pathname of the current working directory. If the -P option is supplied, the pathname printed will not contain symbolic links. If the -L option is supplied, the pathname printed may contain symbolic links. The return status is zero unless an error is encountered while determining the name of the current directory or an invalid option is supplied.

  打印当前工作目录的绝对路径名。如果提供了 `-P` 选项，则打印的路径名不包含符号链接。如果提供了 `-L` 选项，则打印的路径名可能包含符号链接。返回状态为零，除非在确定当前目录的名称时遇到错误或提供了无效选项。

- `readonly`

  ```
  readonly [-aAf] [-p] [name[=value]] …
  ```

  Mark each name as readonly. The values of these names may not be changed by subsequent assignment. If the -f option is supplied, each name refers to a shell function. The -a option means each name refers to an indexed array variable; the -A option means each name refers to an associative array variable. If both options are supplied, -A takes precedence. If no name arguments are given, or if the -p option is supplied, a list of all readonly names is printed. The other options may be used to restrict the output to a subset of the set of readonly names. The -p option causes output to be displayed in a format that may be reused as input. If a variable name is followed by =value, the value of the variable is set to value. The return status is zero unless an invalid option is supplied, one of the name arguments is not a valid shell variable or function name, or the -f option is supplied with a name that is not a shell function.

  将每个名称标记为只读。后续赋值操作无法更改这些名称的值。如果提供了 `-f` 选项，则每个名称引用一个 shell 函数。`-a` 选项表示每个名称引用一个索引数组变量；`-A` 选项表示每个名称引用一个关联数组变量。如果两个选项都提供了，`-A` 优先。如果没有给出名称参数，或者提供了 `-p` 选项，则打印所有只读名称的列表。其他选项可用于将输出限制为只读名称集的子集。`-p` 选项导致输出以可重用作为输入的格式显示。如果变量名称后跟 `=value`，则将变量的值设置为值。返回状态为零，除非提供了无效选项、其中一个名称参数不是有效的 shell 变量或函数名称，或者提供了 `-f` 选项与不是 shell 函数的名称。

- `return`

  ```
  return [n]
  ```

  Cause a shell function to stop executing and return the value n to its caller. If n is not supplied, the return value is the exit status of the last command executed in the function. If `return` is executed by a trap handler, the last command used to determine the status is the last command executed before the trap handler. If `return` is executed during a `DEBUG` trap, the last command used to determine the status is the last command executed by the trap handler before `return` was invoked. `return` may also be used to terminate execution of a script being executed with the `.` (`source`) builtin, returning either n or the exit status of the last command executed within the script as the exit status of the script. If n is supplied, the return value is its least significant 8 bits. Any command associated with the `RETURN` trap is executed before execution resumes after the function or script. The return status is non-zero if `return` is supplied a non-numeric argument or is used outside a function and not during the execution of a script by `.` or `source`.

  使一个 shell 函数停止执行并将值 n 返回给其调用者。如果未提供 n，则返回值为函数中最后执行的命令的退出状态。如果 `return` 是由陷阱处理程序执行的，则用于确定状态的最后一个命令是陷阱处理程序之前执行的最后一个命令。如果 `return` 在 `DEBUG` 陷阱期间执行，则用于确定状态的最后一个命令是在调用 `return` 之前陷阱处理程序执行的最后一个命令。`return` 还可用于终止使用 `.`（`source`）内置命令执行的脚本的执行，将 n 或脚本中最后执行的命令的退出状态作为脚本的退出状态。如果提供了 n，则返回值为其最低有效的 8 位。在函数或脚本完成执行后，在函数或脚本之后恢复执行之前，将执行与 `RETURN` 陷阱关联的任何命令。如果 `return` 提供了非数字参数，或者在函数外部使用而不是在 `.` 或 `source` 执行脚本的过程中，则返回状态为非零。

- `shift`

  ```
  shift [n]
  ```

  Shift the positional parameters to the left by n. The positional parameters from n+1 … `$#` are renamed to `$1` … `$#`-n. Parameters represented by the numbers `$#` down to `$#`-n+1 are unset. n must be a non-negative number less than or equal to `$#`. If n is zero or greater than `$#`, the positional parameters are not changed. If n is not supplied, it is assumed to be 1. The return status is zero unless n is greater than `$#` or less than zero, non-zero otherwise.

  将位置参数向左移动 n 个位置。从 n+1 到 `$#` 的位置参数被重命名为 `$1` 到 `$#`-n。由数字 `$#` 到 `$#`-n+1 表示的参数被取消设置。n 必须是非负数且不大于或等于 `$#` 的数字。如果 n 是零或大于 `$#`，则不会更改位置参数。如果未提供 n，则假定为 1。返回状态为零，除非 n 大于 `$#` 或小于零，否则为非零。

- `test`

- `[`

  ```sh
  test expr
  ```

  Evaluate a conditional expression expr and return a status of 0 (true) or 1 (false). Each operator and operand must be a separate argument. Expressions are composed of the primaries described below in [Bash Conditional Expressions](#64-bash-条件表达式). `test` does not accept any options, nor does it accept and ignore an argument of -- as signifying the end of options.

  `test`命令用于求值条件表达式`expr`并返回状态0（真）或1（假）。每个运算符和操作数必须是单独的参数。表达式由下面在[Bash条件表达式](#64-bash-条件表达式)中描述的基元组成。`test`命令不接受任何选项，并且不接受并忽略`--`作为选项的结束符。

  When the `[` form is used, the last argument to the command must be a `]`.Expressions may be combined using the following operators, listed in decreasing order of precedence. The evaluation depends on the number of arguments; see below. Operator precedence is used when there are five or more arguments.

  当使用`[`形式时，命令的最后一个参数必须是`]`。可以使用以下运算符组合表达式，按优先级递减的顺序列出。求值取决于参数的数量；请参见下面的说明。当有五个或更多的参数时，使用运算符优先级。

  `! expr`: True if expr is false.如果`expr`为假，则为真。

  `( expr )`: Returns the value of expr. This may be used to override the normal precedence of operators.返回`expr`的值。这可以用于覆盖运算符的正常优先级。

  `expr1 -a expr2`: True if both expr1 and expr2 are true.如果`expr1`和`expr2`都为真，则为真。

  `expr1 -o expr2`: True if either expr1 or expr2 is true.如果`expr1`或`expr2`为真，则为真。

  The `test` and `[` builtins evaluate conditional expressions using a set of rules based on the number of arguments.

  `test`和`[`内置命令使用基于参数数量的一组规则来求值条件表达式。 

  0 arguments: The expression is false.表达式为假。

  1 argument: The expression is true if, and only if, the argument is not null.如果且仅当参数不为空时，表达式为真。

  2 arguments: If the first argument is `!`, the expression is true if and only if the second argument is null. If the first argument is one of the unary conditional operators (see [Bash Conditional Expressions](#64-bash-条件表达式)), the expression is true if the unary test is true. If the first argument is not a valid unary operator, the expression is false.如果第一个参数是`!`，则表达式为真，如果且仅当第二个参数为空时。如果第一个参数是一种一元条件运算符（参见[Bash条件表达式](#64-bash-条件表达式)），则如果一元测试为真，则表达式为真。如果第一个参数不是有效的一元运算符，则表达式为假。

  3 arguments: The following conditions are applied in the order listed.按照下面列出的顺序应用以下条件：

  - If the second argument is one of the binary conditional operators (see [Bash Conditional Expressions](#64-bash-条件表达式)), the result of the expression is the result of the binary test using the first and third arguments as operands. The `-a` and `-o` operators are considered binary operators when there are three arguments.

  - 如果第二个参数是二元条件运算符之一（参见[Bash条件表达式](#64-bash-条件表达式)），则表达式的结果是使用第一个和第三个参数作为操作数的二元测试的结果。当有三个参数时，`-a`和`-o`运算符被视为二元运算符。

  - If the first argument is `!`, the value is the negation of the two-argument test using the second and third arguments.

  - 如果第一个参数是`!`，则值是使用第二个和第三个参数进行的二元测试的否定结果。

  - If the first argument is exactly `(` and the third argument is exactly `)`, the result is the one-argument test of the second argument.

  - 如果第一个参数恰好是`(`，且第三个参数恰好是`)`，则结果是对第二个参数进行的一元测试。

  - Otherwise, the expression is false.

  - 否则，表达式为假。

  4 arguments: The following conditions are applied in the order listed.按照下面列出的顺序应用以下条件：

  - If the first argument is `!`, the result is the negation of the three-argument expression composed of the remaining arguments.

  - 如果第一个参数是`!`，则结果是由剩余参数组成的三元表达式的否定结果。

  - If the first argument is exactly `(` and the fourth argument is exactly `)`, the result is the two-argument test of the second and third arguments.

  - 如果第一个参数恰好是`(`，且第四个参数恰好是`)`，则结果是对第二个和第三个参数进行的两元测试。

  - Otherwise, the expression is parsed and evaluated according to precedence using the rules listed above.

  - 否则，按照上面列出的规则解析和评估表达式。

  5 or more arguments: The expression is parsed and evaluated according to precedence using the rules listed above.When used with `test` or `[`, the `<` and `>` operators sort lexicographically using ASCII ordering.按照上面列出的规则解析和评估表达式。当与`test`或`[`一起使用时，`<`和`>`运算符按照ASCII排序进行比较。

- `times`

  ```
  times
  ```

  Print out the user and system times used by the shell and its children. The return status is zero.

  打印出shell及其子进程使用的用户时间和系统时间。返回状态为零。

- `trap`

  ```
  trap [-lp] [arg] [sigspec …]
  ```

  The commands in arg are to be read and executed when the shell receives signal sigspec. If arg is absent (and there is a single sigspec) or equal to `-`, each specified signal's disposition is reset to the value it had when the shell was started. If arg is the null string, then the signal specified by each sigspec is ignored by the shell and commands it invokes. If arg is not present and -p has been supplied, the shell displays the trap commands associated with each sigspec. If no arguments are supplied, or only -p is given, `trap` prints the list of commands associated with each signal number in a form that may be reused as shell input. The -l option causes the shell to print a list of signal names and their corresponding numbers. Each sigspec is either a signal name or a signal number. Signal names are case insensitive and the `SIG` prefix is optional.If a sigspec is `0` or `EXIT`, arg is executed when the shell exits. If a sigspec is `DEBUG`, the command arg is executed before every simple command, `for` command, `case` command, `select` command, every arithmetic `for` command, and before the first command executes in a shell function. Refer to the description of the `extdebug` option to the `shopt` builtin (see [The Shopt Builtin](#432--shopt内置命令)) for details of its effect on the `DEBUG` trap. If a sigspec is `RETURN`, the command arg is executed each time a shell function or a script executed with the `.` or `source` builtins finishes executing.If a sigspec is `ERR`, the command arg is executed whenever a pipeline (which may consist of a single simple command), a list, or a compound command returns a non-zero exit status, subject to the following conditions. The `ERR` trap is not executed if the failed command is part of the command list immediately following an `until` or `while` keyword, part of the test following the `if` or `elif` reserved words, part of a command executed in a `&&` or `||` list except the command following the final `&&` or `||`, any command in a pipeline but the last, or if the command's return status is being inverted using `!`. These are the same conditions obeyed by the `errexit` (-e) option.Signals ignored upon entry to the shell cannot be trapped or reset. Trapped signals that are not being ignored are reset to their original values in a subshell or subshell environment when one is created.The return status is zero unless a sigspec does not specify a valid signal.

  在shell接收到信号`sigspec`时，读取并执行参数`arg`中的命令。如果`arg`不存在（且只有一个`sigspec`）或等于`-`，则将重置每个指定信号的处理方式为shell启动时的值。如果`arg`为空字符串，则shell忽略由`sigspec`指定的信号并且不执行相关命令。如果`arg`不存在并且提供了`-p`选项，则shell显示与每个`sigspec`相关联的陷阱命令。如果没有提供参数，或只提供了`-p`选项，则`trap`打印出每个信号编号相关联的命令列表，以便可以作为shell输入重用。`-l`选项导致shell打印出信号名称及其对应的编号。每个`sigspec`可以是信号名称或信号编号。信号名称不区分大小写，且`SIG`前缀是可选的。如果`sigspec`是`0`或`EXIT`，则在shell退出时执行`arg`。如果`sigspec`是`DEBUG`，则在每个简单命令、`for`命令、`case`命令、`select`命令、每个算术`for`命令之前以及在shell函数中的第一个命令执行之前执行命令`arg`。有关其对`DEBUG`陷阱的影响的详细信息，请参阅`shopt`内置命令的`extdebug`选项的描述（参见[The Shopt Builtin](#432--shopt内置命令)）。如果`sigspec`是`RETURN`，则每次shell函数或使用`.``source`内置命令执行的脚本完成执行时都会执行命令`arg`。如果`sigspec`是`ERR`，则在管道（可能由单个简单命令）、列表或复合命令返回非零退出状态时执行命令`arg`，但受以下条件限制。如果失败的命令是紧接在`until`或`while`关键字之后的命令列表的一部分，或者是在`if`或`elif`保留字之后的测试的一部分，或者是在`&&`或`||`列表中执行的命令（除了最后的命令之后的命令），或者是管道中除了最后的命令之外的任何命令，或者命令的返回状态通过`!`进行取反，则不会执行`ERR`陷阱。这些条件与`errexit`（-e）选项遵循相同的规则。进入shell时被忽略的信号无法被捕获或重置。在创建子shell或子shell环境时，未被忽略的陷阱信号会被重置为其原始值。除非`sigspec`未指定有效信号，否则返回状态为零。

- `umask`

  ```
  umask [-p] [-S] [mode]
  ```

  Set the shell process's file creation mask to mode. If mode begins with a digit, it is interpreted as an octal number; if not, it is interpreted as a symbolic mode mask similar to that accepted by the `chmod` command. If mode is omitted, the current value of the mask is printed. If the -S option is supplied without a mode argument, the mask is printed in a symbolic format. If the -p option is supplied, and mode is omitted, the output is in a form that may be reused as input. The return status is zero if the mode is successfully changed or if no mode argument is supplied, and non-zero otherwise.Note that when the mode is interpreted as an octal number, each number of the umask is subtracted from `7`. Thus, a umask of `022` results in permissions of `755`.

  将shell进程的文件创建掩码设置为`mode`。如果`mode`以数字开头，则将其解释为八进制数；如果不是，则将其解释为类似于`chmod`命令接受的符号模式掩码。如果省略`mode`，则打印出掩码的当前值。如果提供了`-S`选项但没有提供`mode`参数，则以符号格式打印出掩码。如果提供了`-p`选项，并且省略了`mode`，则输出的格式可重用为输入。如果成功更改了模式或没有提供模式参数，则返回状态为零，否则为非零。请注意，当将模式解释为八进制数时，每个数字都从`7`中减去掩码的数字。因此，`022`的掩码结果为`755`。

  - 

- `unset`

  ```
  unset [-fnv] [name]
  ```
  
  Remove each variable or function name. If the -v option is given, each name refers to a shell variable and that variable is removed. If the -f option is given, the names refer to shell functions, and the function definition is removed. If the -n option is supplied, and name is a variable with the `nameref` attribute, name will be unset rather than the variable it references. -n has no effect if the -f option is supplied. If no options are supplied, each name refers to a variable; if there is no variable by that name, a function with that name, if any, is unset. Readonly variables and functions may not be unset. Some shell variables lose their special behavior if they are unset; such behavior is noted in the description of the individual variables. The return status is zero unless a name is readonly or may not be unset.
  
  移除每个变量或函数名。如果提供了`-v`选项，则每个名称都是指向shell变量的引用，并且该变量将被移除。如果提供了`-f`选项，则名称引用shell函数，并且函数定义将被移除。如果提供了`-n`选项，并且`name`是具有`nameref`属性的变量，则将取消设置`name`而不是取消设置该变量引用的变量。如果未提供`-n`选项，则`-f`选项不起作用。如果没有提供选项，则每个名称都是指向变量的引用；如果没有该名称的变量，则移除具有该名称的函数（如果有）。只读变量和函数无法取消设置。取消设置会导致某些shell变量失去其特殊行为；有关各个变量的说明中会提到此类行为。返回状态为零，除非名称是只读的或不可取消设置。





### 4.2 Bash 内置命令

This section describes builtin commands which are unique to or have been extended in Bash. Some of these commands are specified in the POSIX standard.

​	本节描述了在Bash中特有或扩展的内置命令。其中一些命令在POSIX标准中进行了规定。

- `alias`

  ```
  alias [-p] [name[=value] …]
  ```

  Without arguments or with the -p option, `alias` prints the list of aliases on the standard output in a form that allows them to be reused as input. If arguments are supplied, an alias is defined for each name whose value is given. If no value is given, the name and value of the alias is printed. Aliases are described in [Aliases](#66-别名).

  如果没有参数或带有-p选项，`alias`会以可以被重复使用作为输入的形式将别名列表打印到标准输出。如果提供了参数，则为每个给定值的名称定义一个别名。如果没有给定值，则打印别名的名称和值。别名的详细信息请参阅[Aliases](#66-别名)。

- `bind`

  ```
  bind [-m keymap] [-lpsvPSVX]
  bind [-m keymap] [-q function] [-u function] [-r keyseq]
  bind [-m keymap] -f filename
  bind [-m keymap] -x keyseq:shell-command
  bind [-m keymap] keyseq:function-name
  bind [-m keymap] keyseq:readline-command
  bind readline-command-line
  ```

  Display current Readline (see [Command Line Editing](#8-命令行编辑)) key and function bindings, bind a key sequence to a Readline function or macro, or set a Readline variable. Each non-option argument is a command as it would appear in a Readline initialization file (see [Readline Init File](#83-readline-初始化文件)), but each binding or command must be passed as a separate argument; e.g., `"\C-x\C-r":re-read-init-file`.

  显示当前的Readline（参见[Command Line Editing](#8-命令行编辑)）键和函数绑定，将键序列绑定到Readline函数或宏，或者设置一个Readline变量。每个非选项参数都是一个命令，就像它在Readline初始化文件中出现的那样（参见[Readline Init File](#83-readline-初始化文件)），但是每个绑定或命令必须作为单独的参数传递；例如，`"\C-x\C-r":re-read-init-file`。

  Options, if supplied, have the following meanings:

  如果提供了选项，具有以下含义：

  `-m keymap`: Use keymap as the keymap to be affected by the subsequent bindings. Acceptable keymap names are `emacs`, `emacs-standard`, `emacs-meta`, `emacs-ctlx`, `vi`, `vi-move`, `vi-command`, and `vi-insert`. `vi` is equivalent to `vi-command` (`vi-move` is also a synonym); `emacs` is equivalent to `emacs-standard`.

  `-m keymap`：将keymap用作随后绑定所影响的键映射。可接受的键映射名称有`emacs`、`emacs-standard`、`emacs-meta`、`emacs-ctlx`、`vi`、`vi-move`、`vi-command`和`vi-insert`。`vi`等效于`vi-command`（`vi-move`也是一个同义词）；`emacs`等效于`emacs-standard`。

  `-l`: List the names of all Readline functions.

  `-l`：列出所有Readline函数的名称。

  `-p`: Display Readline function names and bindings in such a way that they can be used as input or in a Readline initialization file.

  `-p`：以可以作为输入或Readline初始化文件中的绑定来显示Readline函数的名称和绑定。

  `-P`: List current Readline function names and bindings.

  `-P`：列出当前的Readline函数名称和绑定。

  `-v`: Display Readline variable names and values in such a way that they can be used as input or in a Readline initialization file.

  `-v`：以可以作为输入或Readline初始化文件中的变量来显示Readline变量的名称和值。

  `-V`: List current Readline variable names and values.

  `-V`：列出当前的Readline变量名称和值。

  `-s`: Display Readline key sequences bound to macros and the strings they output in such a way that they can be used as input or in a Readline initialization file.

  `-s`：以可以作为输入或Readline初始化文件中的宏绑定的键序列和它们输出的字符串来显示Readline绑定的键序列。

  `-S`: Display Readline key sequences bound to macros and the strings they output.

  `-S`：显示绑定到宏的Readline键序列和它们的字符串输出。

  `-f filename`: Read key bindings from filename.

  `-f filename`：从filename中读取键绑定。

  `-q function`: Query about which keys invoke the named function.

  `-q function`：查询调用命名函数的键。

  `-u function`: Unbind all keys bound to the named function.

  `-u function`：取消绑定到命名函数的所有键。

  `-r keyseq`: Remove any current binding for keyseq.

  `-r keyseq`：移除键序列的任何当前绑定。

  `-x keyseq:shell-command`: Cause shell-command to be executed whenever keyseq is entered. When shell-command is executed, the shell sets the `READLINE_LINE` variable to the contents of the Readline line buffer and the `READLINE_POINT` and `READLINE_MARK` variables to the current location of the insertion point and the saved insertion point (the mark), respectively. The shell assigns any numeric argument the user supplied to the `READLINE_ARGUMENT` variable. If there was no argument, that variable is not set. If the executed command changes the value of any of `READLINE_LINE`, `READLINE_POINT`, or `READLINE_MARK`, those new values will be reflected in the editing state.

  `-x keyseq:shell-command`：每当输入keyseq时，执行shell-command。当执行shell-command时，shell将`READLINE_LINE`变量设置为Readline行缓冲区的内容，将`READLINE_POINT`和`READLINE_MARK`变量分别设置为插入点的当前位置和保存的插入点（标记）的位置。shell将用户提供的任何数值参数分配给`READLINE_ARGUMENT`变量。如果没有参数，该变量不设置。如果执行的命令更改了`READLINE_LINE`、`READLINE_POINT`或`READLINE_MARK`的任何值，这些新值将反映在编辑状态中。

  `-X`: List all key sequences bound to shell commands and the associated commands in a format that can be reused as input.

  `-X`：以可重复使用的格式列出绑定到shell命令和相关命令的所有键序列。

  The return status is zero unless an invalid option is supplied or an error occurs.

  返回状态为零，除非提供了无效的选项或发生错误。

- `builtin`

  ```
  builtin [shell-builtin [args]]
  ```

  Run a shell builtin, passing it args, and return its exit status. This is useful when defining a shell function with the same name as a shell builtin, retaining the functionality of the builtin within the function. The return status is non-zero if shell-builtin is not a shell builtin command.

  运行一个内置的shell命令，传递给它args，并返回其退出状态。当使用与shell内置命令相同的名称定义一个shell函数时，保留内置功能在函数中。如果shell-builtin不是一个shell内置命令，则返回非零退出状态。

- `caller`

  ```
  caller [expr]
  ```

  Returns the context of any active subroutine call (a shell function or a script executed with the `.` or `source` builtins).Without expr, `caller` displays the line number and source filename of the current subroutine call. If a non-negative integer is supplied as expr, `caller` displays the line number, subroutine name, and source file corresponding to that position in the current execution call stack. This extra information may be used, for example, to print a stack trace. The current frame is frame 0.The return value is 0 unless the shell is not executing a subroutine call or expr does not correspond to a valid position in the call stack.

  返回任何活动子程序调用的上下文（shell函数或使用`.`或`source`内置执行的脚本）。如果没有expr，则`caller`显示当前子程序调用的行号和源文件名。如果提供了非负整数作为expr，`caller`显示当前执行调用栈中该位置对应的行号、子程序名称和源文件。可以使用此附加信息，例如打印栈跟踪。当前帧为帧0。返回值为0，除非shell未执行子程序调用或expr不对应于调用栈中的有效位置。

- `command`

  ```
  command [-pVv] command [arguments …]
  ```

  Runs command with arguments ignoring any shell function named command. Only shell builtin commands or commands found by searching the `PATH` are executed. If there is a shell function named `ls`, running `command ls` within the function will execute the external command `ls` instead of calling the function recursively. The -p option means to use a default value for `PATH` that is guaranteed to find all of the standard utilities. The return status in this case is 127 if command cannot be found or an error occurred, and the exit status of command otherwise.If either the -V or -v option is supplied, a description of command is printed. The -v option causes a single word indicating the command or file name used to invoke command to be displayed; the -V option produces a more verbose description. In this case, the return status is zero if command is found, and non-zero if not.

  运行带有参数的`command`，忽略任何名为`command`的shell函数。只执行shell内置命令或通过搜索`PATH`找到的命令。如果存在名为`ls`的shell函数，在函数内部运行`command ls`将执行外部命令`ls`，而不是递归调用函数。`-p`选项表示使用默认值为`PATH`，该值可以确保找到所有标准工具。在这种情况下，如果无法找到`command`或发生错误，返回状态为127；否则为`command`的退出状态。如果提供了`-V`或`-v`选项，将打印关于`command`的描述。`-v`选项会显示表示调用`command`的命令或文件名的单词；`-V`选项会产生更详细的描述。在这种情况下，如果找到`command`，返回状态为零，否则为非零。

- `declare`

  ```
  declare [-aAfFgiIlnrtux] [-p] [name[=value] …]
  ```

  Declare variables and give them attributes. If no names are given, then display the values of variables instead.

  声明变量并给它们赋予属性。如果没有给出名称，则显示变量的值。

  The -p option will display the attributes and values of each name. When -p is used with name arguments, additional options, other than -f and -F, are ignored.

  `-p`选项将显示每个名称的属性和值。当与名称参数一起使用`-p`时，除了`-f`和`-F`之外的其他选项将被忽略。

  When -p is supplied without name arguments, `declare` will display the attributes and values of all variables having the attributes specified by the additional options. If no other options are supplied with -p, `declare` will display the attributes and values of all shell variables. The -f option will restrict the display to shell functions.

  当不带名称参数提供`-p`时，`declare`将显示具有由其他选项指定的属性的所有变量的属性和值。如果没有提供其他选项，则`declare`将显示所有shell变量的属性和值。`-f`选项将限制显示为shell函数。

  The -F option inhibits the display of function definitions; only the function name and attributes are printed. If the `extdebug` shell option is enabled using `shopt` (see [The Shopt Builtin](#432--shopt内置命令)), the source file name and line number where each name is defined are displayed as well. -F implies -f.

  `-F`选项禁止显示函数定义；只打印函数名称和属性。如果使用`shopt`启用了`extdebug` shell选项（参见[The Shopt Builtin](#432--shopt内置命令)），还会显示定义每个名称的源文件名和行号。`-F`隐含了`-f`。

  The -g option forces variables to be created or modified at the global scope, even when `declare` is executed in a shell function. It is ignored in all other cases.

  `-g`选项强制在shell函数中创建或修改变量时将其创建或修改为全局作用域。在其他情况下，该选项被忽略。

  The -I option causes local variables to inherit the attributes (except the `nameref` attribute) and value of any existing variable with the same name at a surrounding scope. If there is no existing variable, the local variable is initially unset.

  `-I`选项使本地变量继承环绕作用域中具有相同名称的任何现有变量的属性（除了`nameref`属性）和值。如果没有现有的变量，则本地变量最初未设置。

  The following options can be used to restrict output to variables with the specified attributes or to give variables attributes:

  以下选项可用于将输出限制为具有指定属性的变量或给变量添加属性：

  `-a`: Each name is an indexed array variable (see [Arrays](#67-数组)).

  `-a`：每个名称是索引数组变量（参见[Arrays](#67-数组)）。

  `-A`: Each name is an associative array variable (see [Arrays](#67-数组)).

  `-A`：每个名称是关联数组变量（参见[Arrays](#67-数组)）。

  `-f`: Use function names only.

  `-f`：仅使用函数名称。

  `-i`: The variable is to be treated as an integer; arithmetic evaluation (see [Shell Arithmetic](#65-shell-算术)) is performed when the variable is assigned a value.

  `-i`：将变量视为整数；在为变量赋值时执行算术运算（参见[Shell Arithmetic](#65-shell-算术)）。

  `-l`: When the variable is assigned a value, all upper-case characters are converted to lower-case. The upper-case attribute is disabled.

  `-l`：当为变量赋值时，将所有大写字符转换为小写。禁用大写属性。

  `-n`: Give each name the `nameref` attribute, making it a name reference to another variable. That other variable is defined by the value of name. All references, assignments, and attribute modifications to name, except for those using or changing the -n attribute itself, are performed on the variable referenced by name's value. The nameref attribute cannot be applied to array variables.

  `-n`：给每个名称添加`nameref`属性，将其作为对另一个变量的名称引用。另一个变量由名称的值定义。除了使用或更改`-n`属性本身的引用、赋值和属性修改之外的所有引用、赋值和属性修改，都在由名称的值引用的变量上执行。`nameref`属性不能应用于数组变量。

  `-r`: Make names readonly. These names cannot then be assigned values by subsequent assignment statements or unset.

  `-r`：使名称只读。这些名称无法通过后续的赋值语句或`unset`语句赋值。

  `-t`: Give each name the `trace` attribute. Traced functions inherit the `DEBUG` and `RETURN` traps from the calling shell. The trace attribute has no special meaning for variables.

  `-t`：给每个名称添加`trace`属性。跟踪的函数继承调用shell的`DEBUG`和`RETURN`陷阱。对于变量，跟踪属性没有特殊含义。

  `-u`: When the variable is assigned a value, all lower-case characters are converted to upper-case. The lower-case attribute is disabled.

  `-u`：当为变量赋值时，将所有小写字符转换为大写。禁用小写属性。

  `-x`: Mark each name for export to subsequent commands via the environment.

  `-x`：将每个名称标记为通过环境导出给后续的命令。

  Using `+` instead of `-` turns off the attribute instead, with the exceptions that `+a` and `+A` may not be used to destroy array variables and `+r` will not remove the readonly attribute. When used in a function, `declare` makes each name local, as with the `local` command, unless the -g option is used. If a variable name is followed by =value, the value of the variable is set to value.

  使用`+`而不是`-`来关闭属性，但以下例外情况：`+a`和`+A`不能用于销毁数组变量，`+r`不会删除只读属性。在函数中使用`declare`时，每个名称都被视为局部变量，就像使用`local`命令一样，除非使用了`-g`选项。如果变量名后跟`=`和`value`，则变量的值将设置为`value`。

  When using -a or -A and the compound assignment syntax to create array variables, additional attributes do not take effect until subsequent assignments.

  在使用`-a`或`-A`和复合赋值语法创建数组变量时，其他属性在后续赋值之前不会生效。

  The return status is zero unless an invalid option is encountered, an attempt is made to define a function using `-f foo=bar`, an attempt is made to assign a value to a readonly variable, an attempt is made to assign a value to an array variable without using the compound assignment syntax (see [Arrays](#67-数组)), one of the names is not a valid shell variable name, an attempt is made to turn off readonly status for a readonly variable, an attempt is made to turn off array status for an array variable, or an attempt is made to display a non-existent function with -f.

  返回状态为零，除非遇到无效的选项，尝试使用`-f foo=bar`定义函数，尝试给只读变量赋值，尝试在没有使用复合赋值语法的情况下给数组变量赋值（参见[Arrays](#67-数组)），其中一个名称不是有效的shell变量名，尝试关闭只读变量的只读状态，尝试关闭数组变量的数组状态，或尝试使用`-f`显示不存在的函数。

  - `echo`

    ```
    echo [-neE] [arg …]
    ```

    Output the args, separated by spaces, terminated with a newline. The return status is 0 unless a write error occurs. If -n is specified, the trailing newline is suppressed. If the -e option is given, interpretation of the following backslash-escaped characters is enabled. The -E option disables the interpretation of these escape characters, even on systems where they are interpreted by default. The `xpg_echo` shell option may be used to dynamically determine whether or not `echo` expands these escape characters by default. `echo` does not interpret -- to mean the end of options.

    ​	输出参数arg，以空格分隔，并以换行符结束。返回状态为0，除非发生写入错误。如果指定了`-n`选项，则不会输出尾随的换行符。如果使用了`-e`选项，则启用对以下转义字符的解释。`-E`选项禁用对这些转义字符的解释，即使在默认情况下系统会解释它们。可以使用`xpg_echo` shell选项动态确定`echo`是否默认扩展这些转义字符。`echo`不解释`--`表示选项结束的含义。

    `echo` interprets the following escape sequences:

    ​	`echo`解释以下转义序列：

      `\a`: alert (bell)

      `	\b`: backspace

      `\c`: suppress further output

      `\e`

      `\E`: escape

      `\f`: form feed

      `\n`: new line

      `\r`: carriage return

      `\t: `horizontal tab

      `\v`: vertical tab

      `\\`: backslash

      `\a`：警告（响铃）

      `\b`：退格

      `\c`：禁止后续输出

      `\e`、`\E`：转义字符

      `\f`：换页

      `\n`：换行

      `\r`：回车

      `\t`：水平制表符

      `\v`：垂直制表符

      `\\`：反斜杠

  

  `\0nnn`: the eight-bit character whose value is the octal value nnn (zero to three octal digits)

  `\0nnn`：八进制值为nnn的八位字符（零到三个八进制数字）

  `\xHH`: the eight-bit character whose value is the hexadecimal value HH (one or two hex digits)

  `\xHH`：十六进制值为HH的八位字符（一个或两个十六进制数字）

  `\uHHHH`: the Unicode (ISO/IEC 10646) character whose value is the hexadecimal value HHHH (one to four hex digits)

  `\uHHHH`：十六进制值为HHHH的Unicode（ISO/IEC 10646）字符（一个到四个十六进制数字）

  `\UHHHHHHHH`: the Unicode (ISO/IEC 10646) character whose value is the hexadecimal value HHHHHHHH (one to eight hex digits)

  `\UHHHHHHHH`：十六进制值为HHHHHHHH的Unicode（ISO/IEC 10646）字符（一个到八个十六进制数字）

- `enable`

  ```
  enable [-a] [-dnps] [-f filename] [name …]
  ```

  Enable and disable builtin shell commands. Disabling a builtin allows a disk command which has the same name as a shell builtin to be executed without specifying a full pathname, even though the shell normally searches for builtins before disk commands. 

  ​	启用或禁用shell内置命令。禁用内置命令允许执行与shell内置同名的磁盘命令，而无需指定完整路径名，即使在shell通常在磁盘命令之前搜索内置命令。

  If `-n` is used, the names become disabled. Otherwise names are enabled. For example, to use the `test` binary found via `$PATH` instead of the shell builtin version, type `enable -n test`.If the `-p` option is supplied, or no name arguments appear, a list of shell builtins is printed. With no other arguments, the list consists of all enabled shell builtins. The -a option means to list each builtin with an indication of whether or not it is enabled.

  ​	如果使用了`-n`，则禁用名称。否则，启用名称。例如，要使用通过`$PATH`找到的`test`二进制文件而不是shell内置版本，输入`enable -n test`。如果提供了`-p`选项或没有指定名称参数，将打印一个shell内置命令列表。如果没有其他参数，列表包含所有已启用的shell内置命令。`-a`选项表示要列出每个内置命令，并指示其是否已启用。

  The `-f` option means to load the new builtin command name from shared object filename, on systems that support dynamic loading. Bash will use the value of the `BASH_LOADABLES_PATH` variable as a colon-separated list of directories in which to search for filename. The default is system-dependent. The `-d` option will delete a builtin loaded with `-f`.

  ​	`-f`选项表示从支持动态加载的共享对象文件中加载新的内置命令名称。Bash将使用`BASH_LOADABLES_PATH`变量的值作为冒号分隔的目录列表，在其中搜索filename。默认值取决于系统。`-d`选项将删除使用`-f`加载的内置命令。

  If there are no options, a list of the shell builtins is displayed. The -s option restricts `enable` to the POSIX special builtins. If `-s` is used with `-f`, the new builtin becomes a special builtin (see [Special Builtins](#44-特殊内置命令)).

  ​	如果没有选项，将显示shell内置命令列表。`-s`选项将`enable`限制为POSIX特殊内置命令。如果使用`-s`和`-f`一起，新的内置命令将成为特殊内置命令（参见[Special Builtins](#44-特殊内置命令)）。

  If no options are supplied and a name is not a shell builtin, `enable` will attempt to load name from a shared object named name, as if the command were `enable -f name name`.The return status is zero unless a name is not a shell builtin or there is an error loading a new builtin from a shared object.

  ​	如果未提供选项并且名称不是shell内置命令，`enable`将尝试从名为`name`的共享对象中加载`name`，就像命令是`enable -f name name`一样。返回状态为零，除非名称不是shell内置命令或从共享对象加载新的内置命令时出现错误。

- `help`

  ```
  help [-dms] [pattern]
  ```

  Display helpful information about builtin commands. If pattern is specified, `help` gives detailed help on all commands matching pattern, otherwise a list of the builtins is printed.Options, if supplied, have the following meanings:

  ​	显示有关内置命令的帮助信息。如果指定了pattern，`help`会详细显示与pattern匹配的所有命令的帮助信息；否则，打印内置命令列表。如果提供了选项，具有以下含义：

  `-d`: Display a short description of each pattern

  `-m`: Display the description of each pattern in a manpage-like format

  `-s`: Display only a short usage synopsis for each pattern

  The return status is zero unless no command matches pattern.

  `-d`：显示每个pattern的简短描述。

  `-m`：以类似于man页的格式显示每个pattern的描述。

  `-s`：仅显示每个pattern的简短用法摘要。

  返回状态为零，除非没有命令与pattern匹配。

- `let`

  ```
  let expression [expression …]
  ```

  The `let` builtin allows arithmetic to be performed on shell variables. Each expression is evaluated according to the rules given below in [Shell Arithmetic](#65-shell-算术). If the last expression evaluates to 0, `let` returns 1; otherwise 0 is returned.

  ​	`let`内置命令允许对shell变量进行算术运算。根据[Shell Arithmetic](#65-shell-算术)中给出的规则，对每个表达式进行求值。如果最后一个表达式求值为0，则`let`返回1；否则返回0。

- `local`

  ```
  local [option] name[=value] …
  ```

  For each argument, a local variable named name is created, and assigned value. The option can be any of the options accepted by `declare`. `local` can only be used within a function; it makes the variable name have a visible scope restricted to that function and its children. If name is `-`, the set of shell options is made local to the function in which `local` is invoked: shell options changed using the `set` builtin inside the function are restored to their original values when the function returns. The restore is effected as if a series of `set` commands were executed to restore the values that were in place before the function. The return status is zero unless `local` is used outside a function, an invalid name is supplied, or name is a readonly variable.

  ​	对于每个参数，创建一个名为name的局部变量，并赋予value。选项可以是`declare`命令接受的任何选项。`local`只能在函数内部使用；它使变量name的可见范围限制为该函数及其子函数。如果name为`-`，则将shell选项集限制为调用`local`的函数：在函数内部使用`set`内置命令更改的shell选项在函数返回时将恢复为其原始值。恢复操作效果上等同于执行一系列的`set`命令以恢复在函数之前处于有效状态的值。返回状态为零，除非在函数外部使用`local`，提供了无效的name，或name是只读变量。

- `logout`

  ```
  logout [n]
  ```

  Exit a login shell, returning a status of n to the shell's parent.

  ​	退出登录shell，将状态n返回给shell的父进程。

- `mapfile`

  ```
  mapfile [-d delim] [-n count] [-O origin] [-s count]
      [-t] [-u fd] [-C callback] [-c quantum] [array]
  ```

  Read lines from the standard input into the indexed array variable array, or from file descriptor fd if the -u option is supplied. The variable `MAPFILE` is the default array. Options, if supplied, have the following meanings:

  ​	从标准输入或文件描述符fd（如果提供了`-u`选项）中读取行，并将其存储到索引数组变量array中。变量`MAPFILE`是默认的数组。如果提供了选项，具有以下含义：

  `-d`: The first character of delim is used to terminate each input line, rather than newline. If delim is the empty string, `mapfile` will terminate a line when it reads a NUL character.`-n`Copy at most count lines. If count is 0, all lines are copied.

  `-d`：使用delim的第一个字符来终止每一行的读取，而不是使用换行符。如果delim为空字符串，则`mapfile`将在读取到NUL字符时终止一行的读取。`-n`：最多复制count行。如果count为0，则复制所有行。

  `-O`: Begin assigning to array at index origin. The default index is 0.

  `-s`: Discard the first count lines read.

  `-t`: Remove a trailing delim (default newline) from each line read.

  `-u`: Read lines from file descriptor fd instead of the standard input.

  `-C`: Evaluate callback each time quantum lines are read. The -c option specifies quantum.

  `-c`: Specify the number of lines read between each call to callback.

  `-O`：从origin索引开始向数组分配。默认索引为0。

  `-s`：丢弃读取的前count行。

  `-t`：从每一行的末尾删除尾随的delim（默认为换行符）。

  `-u`：从文件描述符fd而不是标准输入读取行。

  `-C`：每次读取quantum行时，计算回调函数。`-c`选项指定quantum。

  `-c`：指定在每次调用回调函数之间读取的行数。

  If -C is specified without -c, the default quantum is 5000. When callback is evaluated, it is supplied the index of the next array element to be assigned and the line to be assigned to that element as additional arguments. callback is evaluated after the line is read but before the array element is assigned.

  ​	如果指定了`-C`而没有指定`-c`，则默认的quantum为5000。当计算回调函数时，将传递给它下一个要分配的数组元素的索引和要分配给该元素的行作为附加参数。回调函数在读取行后但在分配数组元素之前进行计算。

  If not supplied with an explicit origin, `mapfile` will clear array before assigning to it.`mapfile` returns successfully unless an invalid option or option argument is supplied, array is invalid or unassignable, or array is not an indexed array.

  ​	如果没有提供显式的origin，`mapfile`将在分配给数组之前清空array。`mapfile`成功返回，除非提供了无效的选项或选项参数，array无效或无法分配，或array不是索引数组。

- `printf`

  ```
  printf [-v var] format [arguments]
  ```

  Write the formatted arguments to the standard output under the control of the format. The -v option causes the output to be assigned to the variable var rather than being printed to the standard output.

  ​	根据format的控制，将格式化的参数写入标准输出。`-v`选项使输出被分配给变量var，而不是打印到标准输出。

  The format is a character string which contains three types of objects: plain characters, which are simply copied to standard output, character escape sequences, which are converted and copied to the standard output, and format specifications, each of which causes printing of the next successive argument. In addition to the standard `printf(1)` formats, `printf` interprets the following extensions:

  ​	format是一个包含三种类型对象的字符串：普通字符，它们只是复制到标准输出；字符转义序列，它们被转换并复制到标准输出；格式说明符，每个说明符都会导致打印下一个连续的参数。除了标准的`printf(1)`格式外，`printf`还解释以下扩展：

  `%b`: Causes `printf` to expand backslash escape sequences in the corresponding argument in the same way as `echo -e` (see [Bash Builtin Commands](#42-bash-内置命令)).

  `%b`：导致`printf`以与`echo -e`（参见[Bash Builtin Commands](#42-bash-内置命令)）相同的方式扩展相应的参数。

  `%q`: Causes `printf` to output the corresponding argument in a format that can be reused as shell input.

  `%q`：导致`printf`以可以重新用作shell输入的格式输出相应的参数。

  `%Q`: like `%q`, but applies any supplied precision to the argument before quoting it.

  `%Q`：与`%q`相似，但在引用参数之前应用任何指定的精度。

  `%(datefmt)T`: Causes `printf` to output the date-time string resulting from using datefmt as a format string for `strftime`(3). The corresponding argument is an integer representing the number of seconds since the epoch. Two special argument values may be used: -1 represents the current time, and -2 represents the time the shell was invoked. If no argument is specified, conversion behaves as if -1 had been given. This is an exception to the usual `printf` behavior.

  ​	`%(datefmt)T`：导致`printf`以使用datefmt作为`strftime`(3)的格式字符串生成的日期时间字符串输出。相应的参数是一个整数，表示自纪元以来的秒数。可以使用两个特殊的参数值：-1表示当前时间，-2表示shell被调用的时间。如果未指定参数，则转换的行为就像给定了-1一样。这是对通常`printf`行为的例外。

  The %b, %q, and %T directives all use the field width and precision arguments from the format specification and write that many bytes from (or use that wide a field for) the expanded argument, which usually contains more characters than the original.

  ​	%b、%q和%T指令都使用格式说明符中的字段宽度和精度参数，并从扩展的参数中写入（或使用相应的字段）这么多字节，而扩展的参数通常包含比原始参数更多的字符。

  Arguments to non-string format specifiers are treated as C language constants, except that a leading plus or minus sign is allowed, and if the leading character is a single or double quote, the value is the ASCII value of the following character.The format is reused as necessary to consume all of the arguments. If the format requires more arguments than are supplied, the extra format specifications behave as if a zero value or null string, as appropriate, had been supplied. The return value is zero on success, non-zero on failure.

  ​	非字符串格式说明符的参数被视为C语言常量，但允许前导加号或减号，并且如果前导字符是单引号或双引号，那么值是后面字符的ASCII值。根据需要重用format来使用所有参数。如果格式需要的参数多于提供的参数，则额外的格式说明符的行为就像提供了零值或空字符串一样。成功时返回值为零，失败时返回非零值。

- `read`

  ```
  read [-ers] [-a aname] [-d delim] [-i text] [-n nchars]
      [-N nchars] [-p prompt] [-t timeout] [-u fd] [name …]
  ```

  One line is read from the standard input, or from the file descriptor fd supplied as an argument to the -u option, split into words as described above in [Word Splitting](#357-单词分割-word-splitting), and the first word is assigned to the first name, the second word to the second name, and so on. If there are more words than names, the remaining words and their intervening delimiters are assigned to the last name. If there are fewer words read from the input stream than names, the remaining names are assigned empty values. The characters in the value of the `IFS` variable are used to split the line into words using the same rules the shell uses for expansion (described above in [Word Splitting](#357-单词分割-word-splitting)). The backslash character `\` may be used to remove any special meaning for the next character read and for line continuation.

  从标准输入读取一行，或从作为-u选项的参数提供的文件描述符fd中读取一行，按照[Word Splitting](#357-单词分割-word-splitting)中描述的方式拆分为单词，并将第一个单词赋值给第一个名称，第二个单词赋值给第二个名称，依此类推。如果单词数量多于名称数量，则将剩余的单词及其分隔符赋值给最后一个名称。如果从输入流中读取的单词数量少于名称数量，则剩余的名称将被赋值为空值。使用`IFS`变量的值中的字符来使用与shell在扩展中使用的相同规则将行分割为单词（在[Word Splitting](#357-单词分割-word-splitting)中描述）。反斜杠字符`\`可用于取消下一个字符读取的任何特殊含义，并用于换行。

  Options, if supplied, have the following meanings:

  如果提供了选项，具有以下含义：

  `-a aname`: The words are assigned to sequential indices of the array variable aname, starting at 0. All elements are removed from aname before the assignment. Other name arguments are ignored.

  `-a aname`：将单词按顺序分配给索引数组变量aname，从0开始。在分配之前，从aname中删除所有元素。其他名称参数将被忽略。

  `-d delim`: The first character of delim is used to terminate the input line, rather than newline. If delim is the empty string, `read` will terminate a line when it reads a NUL character.

  `-d delim`：使用delim的第一个字符来终止输入行，而不是使用换行符。如果delim为空字符串，则`read`将在读取到NUL字符时终止一行的读取。

  `-e`: Readline (see [Command Line Editing](#8-命令行编辑)) is used to obtain the line. Readline uses the current (or default, if line editing was not previously active) editing settings, but uses Readline's default filename completion.

  `-e`：使用Readline（参见[Command Line Editing](#8-命令行编辑)）获取行。Readline使用当前（或默认，如果之前没有启用行编辑）的编辑设置，但使用Readline的默认文件名补全。

  `-i text`: If Readline is being used to read the line, text is placed into the editing buffer before editing begins.

  `-i text`：如果使用Readline读取行，编辑开始之前将文本放入编辑缓冲区。

  `-n nchars`: `read` returns after reading nchars characters rather than waiting for a complete line of input, but honors a delimiter if fewer than nchars characters are read before the delimiter.

  `-n nchars`：`read`在读取nchars个字符后返回，而不是等待完整的输入行，但如果在读取到分隔符之前读取的字符少于nchars个，则遵循分隔符。

  `-N nchars`: `read` returns after reading exactly nchars characters rather than waiting for a complete line of input, unless EOF is encountered or `read` times out. Delimiter characters encountered in the input are not treated specially and do not cause `read` to return until nchars characters are read. The result is not split on the characters in `IFS`; the intent is that the variable is assigned exactly the characters read (with the exception of backslash; see the -r option below).

  `-N nchars`：`read`在读取完全匹配nchars个字符后返回，而不是等待完整的输入行，除非遇到EOF或`read`超时。输入中遇到的分隔符字符不被特殊处理，直到读取nchars个字符后`read`才返回。结果不会根据`IFS`中的字符进行分割；意图是变量被赋值为精确读取的字符（除了反斜杠；参见下面的-r选项）。

  `-p prompt`: Display prompt, without a trailing newline, before attempting to read any input. The prompt is displayed only if input is coming from a terminal.

  `-p prompt`：在尝试读取任何输入之前，显示无尾随换行符的提示符。只有在输入来自终端时才显示提示符。

  `-r`: If this option is given, backslash does not act as an escape character. The backslash is considered to be part of the line. In particular, a backslash-newline pair may not then be used as a line continuation.

  `-r`：如果给出此选项，反斜杠不会作为转义字符。反斜杠被视为行的一部分。特别是，不能使用反斜杠换行对作为行继续进行分行。

  `-s`: Silent mode. If input is coming from a terminal, characters are not echoed.

  `-s`：静默模式。如果输入来自终端，则不会回显字符。

  `-t timeout`: Cause `read` to time out and return failure if a complete line of input (or a specified number of characters) is not read within timeout seconds. timeout may be a decimal number with a fractional portion following the decimal point. This option is only effective if `read` is reading input from a terminal, pipe, or other special file; it has no effect when reading from regular files. If `read` times out, `read` saves any partial input read into the specified variable name. If timeout is 0, `read` returns immediately, without trying to read any data. The exit status is 0 if input is available on the specified file descriptor, or the read will return EOF, non-zero otherwise. The exit status is greater than 128 if the timeout is exceeded.

  `-t timeout`：如果未在timeout秒内读取到完整的输入行（或指定数量的字符），则导致`read`超时并返回失败。timeout可以是带有小数部分的小数。只有当`read`从终端、管道或其他特殊文件读取输入时，此选项才有效；当从常规文件读取时，此选项无效。如果`read`超时，`read`会将读取到的任何部分输入保存到指定的变量名中。如果timeout为0，则`read`立即返回，而不尝试读取任何数据。如果在指定的文件描述符上有可用输入，或者读取将返回EOF，则退出状态为0；否则，退出状态非零。如果超过超时时间，则退出状态大于128。

  `-u fd`: Read input from file descriptor fd.If no names are supplied, the line read, without the ending delimiter but otherwise unmodified, is assigned to the variable `REPLY`. The exit status is zero, unless end-of-file is encountered, `read` times out (in which case the status is greater than 128), a variable assignment error (such as assigning to a readonly variable) occurs, or an invalid file descriptor is supplied as the argument to -u.

  `-u fd`：从文件描述符fd读取输入。如果未提供名称，则将读取的行（不包括结束分隔符，但其他方面不变）分配给变量`REPLY`。除非遇到文件结束符，`read`超时（此时状态大于128），发生变量赋值错误（例如将只读变量赋值），或者提供了无效的文件描述符作为-u的参数，否则退出状态为零。

- `readarray`

  ```
  readarray [-d delim] [-n count] [-O origin] [-s count]
      [-t] [-u fd] [-C callback] [-c quantum] [array]
  ```

  Read lines from the standard input into the indexed array variable array, or from file descriptor fd if the -u option is supplied.A synonym for `mapfile`.

  将标准输入中的行读取到索引数组变量array中，或者如果提供了-u选项，则从文件描述符fd中读取。是`mapfile`的同义词。

- `source`

  ```
  source filename
  ```

  A synonym for `.` (see [Bourne Shell Builtins](#41-bourne-shell-builtins)).

  是`.`的同义词（参见[Bourne Shell Builtins](#41-bourne-shell-builtins))。

- `type`

  ```
  type [-afptP] [name …]
  ```

  For each name, indicate how it would be interpreted if used as a command name.If the `-t` option is used, `type` prints a single word which is one of `alias`, `function`, `builtin`, `file` or `keyword`, if name is an alias, shell function, shell builtin, disk file, or shell reserved word, respectively. If the name is not found, then nothing is printed, and `type` returns a failure status.

  对于每个名称，指示如果将其用作命令名称，它将如何被解释。如果使用了`-t`选项，`type`打印一个单词，可以是`alias`、`function`、`builtin`、`file`或`keyword`，如果name是别名、shell函数、shell内置命令、磁盘文件或shell保留字，则分别返回相应的值。如果未找到该名称，则不打印任何内容，并且`type`返回失败状态。

  If the -p option is used, `type` either returns the name of the disk file that would be executed, or nothing if -t would not return `file`.

  如果使用了`-p`选项，`type`要么返回将要执行的磁盘文件的名称，要么如果`-t`不返回`file`，则不返回任何内容。

  The `-P` option forces a path search for each name, even if `-t` would not return `file`.If a command is hashed, `-p` and `-P` print the hashed value, which is not necessarily the file that appears first in `$PATH`.If the `-a` option is used, `type` returns all of the places that contain an executable named file. This includes aliases and functions, if and only if the `-p` option is not also used.

  `-P`选项会强制对每个名称进行路径搜索，即使`-t`不会返回`file`。如果命令已经进行了哈希处理，`-p`和`-P`会打印哈希值，该值不一定是在`$PATH`中首先出现的文件。如果使用了`-a`选项，`type`会返回包含名为file的可执行文件的所有位置。只有在不使用`-p`选项时才包括别名和函数。

  If the `-f` option is used, `type` does not attempt to find shell functions, as with the `command` builtin.The return status is zero if all of the names are found, non-zero if any are not found.

  如果使用了`-f`选项，`type`不会尝试查找shell函数，与`command`内置命令相同。如果所有名称都被找到，则返回状态为零，如果有任何名称未找到，则返回非零。

- `typeset`

  ```
  typeset [-afFgrxilnrtux] [-p] [name[=value] …]
  ```

  The `typeset` command is supplied for compatibility with the Korn shell. It is a synonym for the `declare` builtin command.

  `typeset`命令是为了与Korn shell兼容而提供的。它是`declare`内置命令的同义词。

- `ulimit`

  ```
  ulimit [-HS] -a
  ulimit [-HS] [-bcdefiklmnpqrstuvxPRT] [limit]
  ```

  `ulimit` provides control over the resources available to processes started by the shell, on systems that allow such control. If an option is given, it is interpreted as follows:

  `ulimit`在允许对进程可用资源进行控制的系统上，为shell启动的进程提供控制。如果给出选项，解释如下：

  `-S`: Change and report the soft limit associated with a resource.

  `-H`: Change and report the hard limit associated with a resource.

  `-a`: All current limits are reported; no limits are set.

  `-b`: The maximum socket buffer size.`-c`The maximum size of core files created.

  `-d`: The maximum size of a process's data segment.

  `-e`: The maximum scheduling priority ("nice").

  `-f`: The maximum size of files written by the shell and its children.

  `-i`: The maximum number of pending signals.

  `-k`: The maximum number of kqueues that may be allocated.

  `-l`: The maximum size that may be locked into memory.

  `-m`: The maximum resident set size (many systems do not honor this limit).

  `-n`: The maximum number of open file descriptors (most systems do not allow this value to be set).

  `-p`: The pipe buffer size.

  `-q`: The maximum number of bytes in POSIX message queues.

  `-r`: The maximum real-time scheduling priority.

  `-s`: The maximum stack size.

  `-t`: The maximum amount of cpu time in seconds.

  `-u`: The maximum number of processes available to a single user.

  `-v`: The maximum amount of virtual memory available to the shell, and, on some systems, to its children.

  `-x`: The maximum number of file locks.

  `-P`: The maximum number of pseudoterminals.

  `-R`: The maximum time a real-time process can run before blocking, in microseconds.

  `-S`：更改和报告与资源相关联的软限制。

  `-H`：更改和报告与资源相关联的硬限制。

  `-a`：报告所有当前限制；不设置限制。

  `-b`：套接字缓冲区的最大大小。`-c`：创建的核心文件的最大大小。

  `-d`：进程数据段的最大大小。

  `-e`：调度优先级的最大值（"nice"）。

  `-f`：shell及其子进程写入的文件的最大大小。

  `-i`：挂起信号的最大数目。

  `-k`：可分配的kqueue的最大数目。

  `-l`：可以锁定到内存中的最大大小。

  `-m`：最大常驻集大小（许多系统不遵守此限制）。

  `-n`：打开文件描述符的最大数目（大多数系统不允许设置此值）。

  `-p`：管道缓冲区的大小。

  `-q`：POSIX消息队列中的字节数的最大数目。

  `-r`：实时调度优先级的最大值。

  `-s`：栈大小的最大值。

  `-t`：CPU时间的最大量。

  `-u`：单个用户可用的进程的最大数目。

  `-v`：shell及其子进程可用的虚拟内存的最大量，以及在某些系统上可用的内存。

  `-x`：文件锁的最大数目。

  `-P`：伪终端的最大数目。

  `-R`：实时进程在阻塞之前可以运行的最长时间，以微秒为单位。

  `-T`: The maximum number of threads.If limit is given, and the -a option is not used, limit is the new value of the specified resource. The special limit values `hard`, `soft`, and `unlimited` stand for the current hard limit, the current soft limit, and no limit, respectively. A hard limit cannot be increased by a non-root user once it is set; a soft limit may be increased up to the value of the hard limit. Otherwise, the current value of the soft limit for the specified resource is printed, unless the -H option is supplied. When more than one resource is specified, the limit name and unit, if appropriate, are printed before the value. When setting new limits, if neither -H nor -S is supplied, both the hard and soft limits are set. If no option is given, then -f is assumed. Values are in 1024-byte increments, except for -t, which is in seconds; -R, which is in microseconds; -p, which is in units of 512-byte blocks; -P, -T, -b, -k, -n and -u, which are unscaled values; and, when in POSIX Mode (see [Bash POSIX Mode](#611-bash的posix模式)), -c and -f, which are in 512-byte increments.The return status is zero unless an invalid option or argument is supplied, or an error occurs while setting a new limit.

  `-T`：线程的最大数目。如果提供了limit，并且未使用-a选项，则limit是指定资源的新值。特殊的limit值`hard`、`soft`和`unlimited`分别表示当前的硬限制、软限制和无限制。一旦设置了硬限制，非root用户就无法将其增加；软限制可以增加到硬限制的值。否则，打印指定资源的当前软限制的值，除非提供了-H选项。当指定多个资源时，在值之前打印限制名称和单位（如果适用）。在设置新限制时，如果未提供-H或-S，将同时设置硬限制和软限制。如果未提供任何选项，则默认为-f。值以1024字节为增量，除了-t，以秒为单位；-R，以微秒为单位；-p，以512字节块为单位；-P、-T、-b、-k、-n和-u为未缩放的值；在POSIX模式下（参见[Bash POSIX Mode](#611-bash的posix模式)）的-c和-f，以512字节为增量。除非提供了无效的选项或参数，或在设置新限制时发生错误，否则返回状态为零。

- `unalias`

  ```
  unalias [-a] [name … ]
  ```
  
  Remove each name from the list of aliases. If -a is supplied, all aliases are removed. Aliases are described in [Aliases](#66-别名).
  
  从别名列表中移除每个名称。如果提供了`-a`，则移除所有别名。别名在[Aliases](#66-别名)中描述。





### 4.3 修改Shell行为








#### 4.3.1 内置命令`set`

This builtin is so complicated that it deserves its own section. `set` allows you to change the values of shell options and set the positional parameters, or to display the names and values of shell variables.

​	这个内置命令非常复杂，值得有一个独立的部分来介绍。`set`命令允许你改变Shell选项的值，设置位置参数，或者显示Shell变量的名称和值。

- `set`

  ```
  set [-abefhkmnptuvxBCEHPT] [-o option-name] [--] [-] [argument …]
  set [+abefhkmnptuvxBCEHPT] [+o option-name] [--] [-] [argument …]
  ```
  
  If no options or arguments are supplied, `set` displays the names and values of all shell variables and functions, sorted according to the current locale, in a format that may be reused as input for setting or resetting the currently-set variables. Read-only variables cannot be reset. In POSIX mode, only shell variables are listed.
  
  如果没有提供选项或参数，`set`会以当前语言环境为基准，按照排序顺序显示所有Shell变量和函数的名称和值，以一种格式显示，可以重新用作设置或重置当前设置的变量的输入。只读变量无法重置。在POSIX模式下，只列出Shell变量。
  
  When options are supplied, they set or unset shell attributes. Options, if specified, have the following meanings:
  
  当提供选项时，它们用于设置或取消Shell属性。如果指定了选项，则具有以下含义：
  
  `-a`: Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands.
  
  `-a`：每个创建或修改的变量或函数都被赋予导出属性，并标记为导出到后续命令的环境中。
  
  `-b`: Cause the status of terminated background jobs to be reported immediately, rather than before printing the next primary prompt.
  
  `-b`：导致终止的后台作业的状态立即报告，而不是在打印下一个主提示符之前。
  
  `-e`: Exit immediately if a pipeline (see [Pipelines](#323-管道)), which may consist of a single simple command (see [Simple Commands](#322-简单命令)), a list (see [Lists of Commands](#324-命令列表)), or a compound command (see [Compound Commands](#325-复合命令)) returns a non-zero status. The shell does not exit if the command that fails is part of the command list immediately following a `while` or `until` keyword, part of the test in an `if` statement, part of any command executed in a `&&` or `||` list except the command following the final `&&` or `||`, any command in a pipeline but the last, or if the command's return status is being inverted with `!`. If a compound command other than a subshell returns a non-zero status because a command failed while -e was being ignored, the shell does not exit. A trap on `ERR`, if set, is executed before the shell exits.
  
  This option applies to the shell environment and each subshell environment separately (see [Command Execution Environment](#373-命令执行环境)), and may cause subshells to exit before executing all the commands in the subshell.If a compound command or shell function executes in a context where -e is being ignored, none of the commands executed within the compound command or function body will be affected by the -e setting, even if -e is set and a command returns a failure status. 
  
  If a compound command or shell function sets -e while executing in a context where -e is ignored, that setting will not have any effect until the compound command or the command containing the function call completes.
  
  `-f`: Disable filename expansion (globbing).
  
  `-f`：禁用文件名扩展（通配）。
  
  `-h`: Locate and remember (hash) commands as they are looked up for execution. This option is enabled by default.
  
  `-h`：在查找执行命令时定位并记住（哈希）它们。此选项默认启用。
  
  `-k`: All arguments in the form of assignment statements are placed in the environment for a command, not just those that precede the command name.
  
  `-k`：所有以赋值语句形式的参数都被放置在命令的环境中，而不仅仅是在命令名之前的参数。
  
  `-m`: Job control is enabled (see [Job Control](#7-作业控制)). All processes run in a separate process group. When a background job completes, the shell prints a line containing its exit status.
  
  `-m`：启用作业控制（参见[Job Control](#7-作业控制)）。所有进程运行在单独的进程组中。当后台作业完成时，Shell会打印一行包含其退出状态的信息。
  
  `-n`: Read commands but do not execute them. This may be used to check a script for syntax errors. This option is ignored by interactive shells.
  
  `-n`：读取命令但不执行。这可用于检查脚本的语法错误。此选项在交互式Shell中被忽略。
  
  `-o option-name`: Set the option corresponding to option-name:
  
  `-o 选项名称`：设置与选项名称对应的选项： 
  
  
  
  - `allexport`: Same as `-a`.
  
  - `braceexpand`: Same as `-B`.
  
  - `emacs`: Use an `emacs`-style line editing interface (see [Command Line Editing](#8-命令行编辑)). This also affects the editing interface used for `read -e`.
  - `errexit`: Same as `-e`.
  
  - `errtrace`: Same as `-E`.
  
  - `functrace`: Same as `-T`.
  
  - `hashall`: Same as `-h`.
  
  - `histexpand`: Same as `-H`.
  
  - `history`: Enable command history, as described in [Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities). This option is on by default in interactive shells.
  
  - `ignoreeof`: An interactive shell will not exit upon reading EOF.
  
  - `keyword`: Same as `-k`.
  
  - `monitor`: Same as `-m`.
  
  - `noclobber`: Same as `-C`.
  
  - `noexec`: Same as `-n`.
  
  - `noglob`: Same as `-f`.
  
  - `nolog`: Currently ignored.
  
  - `notify`: Same as `-b`.
  
  - `nounset`: Same as `-u`.
  
  - `onecmd`: Same as `-t`.
  
  - `physical`: Same as `-P`.
  
  - `pipefail`: If set, the return value of a pipeline is the value of the last (rightmost) command to exit with a non-zero status, or zero if all commands in the pipeline exit successfully. This option is disabled by default.
  
  - `posix`: Change the behavior of Bash where the default operation differs from the POSIX standard to match the standard (see [Bash POSIX Mode](#611-bash的posix模式)). This is intended to make Bash behave as a strict superset of that standard.
  
  - `privileged`: Same as `-p`.
  
  - `verbose`: Same as `-v`.
  
  - `vi: `Use a `vi`-style line editing interface. This also affects the editing interface used for `read -e`.
  
  - `xtrace`: Same as `-x`.
  
  - `allexport`：等同于`-a`。
  
  - `braceexpand`：等同于`-B`。
  - `emacs`：使用`emacs`风格的行编辑界面（参见[Command Line Editing](#8-命令行编辑)）。这也会影响到`read -e`使用的编辑界面。
  - `errexit`：等同于`-e`。
  - `errtrace`：等同于`-E`。
  - `functrace`：等同于`-T`。
  - `hashall`：等同于`-h`。
  - `histexpand`：等同于`-H`。
  - `history`：启用命令历史记录，如[Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities)中所述。此选项在交互式Shell中默认开启。
  - `ignoreeof`：交互式Shell在读取EOF时不会退出。
  - `keyword`：等同于`-k`。
  - `monitor`：等同于`-m`。
  - `noclobber`：等同于`-C`。
  - `noexec`：等同于`-n`。
  - `noglob`：等同于`-f`。
  - `nolog`：当前被忽略。
  - `notify`：等同于`-b`。
  - `nounset`：等同于`-u`。
  - `onecmd`：等同于`-t`。
  - `physical`：等同于`-P`。
  - `pipefail`：如果设置了该选项，则管道的返回值是最后一个（最右边）以非零状态退出的命令的值，如果管道中的所有命令都成功退出，则返回值为零。此选项默认禁用。
  - `posix`：更改Bash的行为，使其与POSIX标准不同的默认操作匹配，以符合该标准（参见[Bash POSIX Mode](#611-bash的posix模式)）。这旨在使Bash行为与该标准的严格超集一致。
  - `privileged`：等同于`-p`。
  - `verbose`：等同于`-v`。
  - `vi`：使用`vi`风格的行编辑界面。这也会影响到`read -e`使用的编辑界面。
  - `xtrace`：等同于`-x`。
  
  
  
  `-p`: Turn on privileged mode. In this mode, the `$BASH_ENV` and `$ENV` files are not processed, shell functions are not inherited from the environment, and the `SHELLOPTS`, `BASHOPTS`, `CDPATH` and `GLOBIGNORE` variables, if they appear in the environment, are ignored. If the shell is started with the effective user (group) id not equal to the real user (group) id, and the -p option is not supplied, these actions are taken and the effective user id is set to the real user id. If the -p option is supplied at startup, the effective user id is not reset. Turning this option off causes the effective user and group ids to be set to the real user and group ids.
  
  `-p`：启用特权模式。在此模式下，不会处理`$BASH_ENV`和`$ENV`文件，Shell函数不会从环境中继承，并且忽略环境中的`SHELLOPTS`、`BASHOPTS`、`CDPATH`和`GLOBIGNORE`变量。如果Shell的有效用户（组）ID不等于真实用户（组）ID，并且未提供`-p`选项，则执行这些操作，并将有效用户ID设置为真实用户ID。如果在启动时提供了`-p`选项，则不会重置有效用户ID。关闭此选项会将有效用户和组ID设置为真实用户和组ID。
  
  `-r`: Enable restricted shell mode. This option cannot be unset once it has been set.
  
  `-r`：启用受限Shell模式。一旦设置了此选项，就无法取消设置。
  
  `-t`: Exit after reading and executing one command.
  
  `-t`：在读取并执行一条命令后退出。
  
  `-u`: Treat unset variables and parameters other than the special parameters `@` or `*`, or array variables subscripted with `@` or `*`, as an error when performing parameter expansion. An error message will be written to the standard error, and a non-interactive shell will exit.
  
  `-u`：对于未设置的变量和参数（除了特殊参数`@`或`*`，或者以`@`或`*`为下标的数组变量），在执行参数扩展时将其视为错误。错误消息将被写入标准错误，非交互式Shell将退出。
  
  `-v`: Print shell input lines as they are read.
  
  `-v`：打印Shell的输入行。
  
  `-x`: Print a trace of simple commands, `for` commands, `case` commands, `select` commands, and arithmetic `for` commands and their arguments or associated word lists after they are expanded and before they are executed. The value of the `PS4` variable is expanded and the resultant value is printed before the command and its expanded arguments.
  
  `-x`：在扩展之后、执行之前，打印简单命令、`for`命令、`case`命令、`select`命令和算术`for`命令及其参数或关联的单词列表的跟踪信息。将扩展后的`PS4`变量的值展开并打印在命令及其展开后的参数之前。
  
  `-B`: The shell will perform brace expansion (see [Brace Expansion](#351-花括号扩展)). This option is on by default.
  
  `-B`：Shell将执行大括号扩展（参见[Brace Expansion](#351-花括号扩展)）。此选项默认开启。
  
  `-C`: Prevent output redirection using `>`, `>&`, and `<>` from overwriting existing files.
  
  `-C`：防止使用`>`、`>&`和`<>`进行输出重定向时覆盖现有文件。
  
  `-E`: If set, any trap on `ERR` is inherited by shell functions, command substitutions, and commands executed in a subshell environment. The `ERR` trap is normally not inherited in such cases.
  
  `-E`：如果设置了该选项，则`ERR`陷阱将被Shell函数、命令替换和在子Shell环境中执行的命令继承。通常情况下，`ERR`陷阱在这些情况下不会被继承。
  
  `-H`: Enable `!` style history substitution (see [History Expansion](#93-历史记录扩展)). This option is on by default for interactive shells.
  
  `-H`：启用`!`风格的历史替换（参见[History Expansion](#93-历史记录扩展)）。此选项在交互式Shell中默认开启。
  
  `-P`: If set, do not resolve symbolic links when performing commands such as `cd` which change the current directory. The physical directory is used instead. By default, Bash follows the logical chain of directories when performing commands which change the current directory.
  
  `-P`：如果设置了该选项，则在执行诸如`cd`更改当前目录的命令时，不会解析符号链接。而是使用物理目录。默认情况下，Bash在执行更改当前目录的命令时遵循目录的逻辑链。
  
  For example, if /usr/sys is a symbolic link to /usr/local/sys then:
  
  例如，如果`/usr/sys`是指向`/usr/local/sys`的符号链接，则：
  
  ```sh
  $ cd /usr/sys; echo $PWD
  /usr/sys
  $ cd ..; pwd
  /usr
  ```
  
  If `set -P` is on, then:
  
  如果打开了`set -P`，则：
  
  ```sh
  $ cd /usr/sys; echo $PWD
  /usr/local/sys
  $ cd ..; pwd
  /usr/local
  ```
  
  `-T`: If set, any trap on `DEBUG` and `RETURN` are inherited by shell functions, command substitutions, and commands executed in a subshell environment. The `DEBUG` and `RETURN` traps are normally not inherited in such cases.
  
  `-T`：如果设置了该选项，则`DEBUG`和`RETURN`陷阱将被Shell函数、命令替换和在子Shell环境中执行的命令继承。通常情况下，`DEBUG`和`RETURN`陷阱在这些情况下不会被继承。
  
  `--`: If no arguments follow this option, then the positional parameters are unset. Otherwise, the positional parameters are set to the arguments, even if some of them begin with a `-`.
  
  `--`：如果此选项后没有跟随任何参数，则位置参数将被取消设置。否则，位置参数将设置为这些参数，即使其中一些参数以`-`开头。
  
  `-`: Signal the end of options, cause all remaining arguments to be assigned to the positional parameters. The -x and -v options are turned off. If there are no arguments, the positional parameters remain unchanged.
  
  `-`：标志选项的结束，导致所有剩余的参数都被分配给位置参数。关闭`-x`和`-v`选项。如果没有参数，则位置参数保持不变。
  
  Using `+` rather than `-` causes these options to be turned off. The options can also be used upon invocation of the shell. The current set of options may be found in `$-`.The remaining N arguments are positional parameters and are assigned, in order, to `$1`, `$2`, … `$N`. 
  
  使用`+`而不是`-`会关闭这些选项。这些选项也可以在Shell启动时使用。当前设置的选项可以在`$-`中找到。剩余的N个参数是位置参数，按顺序分配给`$1`、`$2`、…`$N`。
  
  The special parameter `#` is set to N.The return status is always zero unless an invalid option is supplied.
  
  特殊参数`#`的值被设置为N。除非提供了无效的选项，否则返回状态始终为零。





#### 4.3.2  `shopt`内置命令

This builtin allows you to change additional shell optional behavior.

​	这个内置命令允许你改变其他可选的Shell行为。

- `shopt`

  ```
  shopt [-pqsu] [-o] [optname …]
  ```
  
  Toggle the values of settings controlling optional shell behavior. The settings can be either those listed below, or, if the -o option is used, those available with the -o option to the `set` builtin command (see [The Set Builtin](#431-内置命令set)). With no options, or with the -p option, a list of all settable options is displayed, with an indication of whether or not each is set; if optnames are supplied, the output is restricted to those options. The -p option causes output to be displayed in a form that may be reused as input. Other options have the following meanings:
  
  切换控制可选Shell行为的设置的值。这些设置可以是下面列出的选项，或者如果使用了`-o`选项，则可以是`set`内置命令（参见[内置命令`set`](https://chat.openai.com/c/afdf90c9-b0cc-4043-9b72-a06269cc6bcd#431内置命令set)）的`-o`选项可用的选项。如果没有选项或使用了`-p`选项，则会显示所有可设置选项的列表，并指示每个选项是否设置；如果提供了`optname`，则输出将限制为这些选项。`-p`选项会以可重用为输入的形式显示输出。其他选项的含义如下：
  
  `-s`: Enable (set) each optname.
  
  `-s`：启用（设置）每个`optname`。
  
  `-u`：Disable (unset) each optname.
  
  `-u`：禁用（取消设置）每个`optname`。
  
  `-q`: Suppresses normal output; the return status indicates whether the optname is set or unset. If multiple optname arguments are given with -q, the return status is zero if all optnames are enabled; non-zero otherwise.
  
  `-q`：抑制正常输出；返回状态指示`optname`是否设置或未设置。如果使用`-q`给出了多个`optname`参数，则如果所有`optname`都已启用，则返回状态为零；否则为非零。
  
  `-o`: Restricts the values of optname to be those defined for the -o option to the `set` builtin (see [The Set Builtin](#431-内置命令set)).
  
  `-o`：将`optname`的值限制为`set`内置命令（参见[内置命令`set`](https://chat.openai.com/c/afdf90c9-b0cc-4043-9b72-a06269cc6bcd#431内置命令set)）的`-o`选项定义的值。
  
  If either -s or -u is used with no optname arguments, `shopt` shows only those options which are set or unset, respectively.
  
  如果`-s`或`-u`与没有`optname`参数一起使用，则`shopt`仅显示设置或未设置的选项。
  
  Unless otherwise noted, the `shopt` options are disabled (off) by default.
  
  除非另有说明，`shopt`选项默认禁用（关闭）。
  
  The return status when listing options is zero if all optnames are enabled, non-zero otherwise. When setting or unsetting options, the return status is zero unless an optname is not a valid shell option.
  
  列出选项时，如果所有`optname`都已启用，则返回状态为零，否则为非零。设置或取消设置选项时，除非`optname`不是一个有效的Shell选项，否则返回状态为零。
  
  The list of `shopt` options is:
  
  `shopt`选项列表如下：
  
  
  
  `assoc_expand_once`: If set, the shell suppresses multiple evaluation of associative array subscripts during arithmetic expression evaluation, while executing builtins that can perform variable assignments, and while executing builtins that perform array dereferencing.
  
  `assoc_expand_once`：如果设置，Shell在算术表达式求值期间抑制对关联数组下标的多次求值，同时执行可以进行变量赋值的内置命令，并执行执行数组解引用的内置命令。
  
  `autocd`: If set, a command name that is the name of a directory is executed as if it were the argument to the `cd` command. This option is only used by interactive shells.
  
  `autocd`：如果设置，以目录名为命令名的命令将被执行，就像它是`cd`命令的参数一样。此选项仅由交互式Shell使用。
  
  `cdable_vars`：If this is set, an argument to the `cd` builtin command that is not a directory is assumed to be the name of a variable whose value is the directory to change to.
  
  `cdable_vars`：如果设置，对于`cd`内置命令的参数，如果不是一个目录，则假定它是一个变量的名称，其值是要切换到的目录。
  
  `cdspell`: If set, minor errors in the spelling of a directory component in a `cd` command will be corrected. The errors checked for are transposed characters, a missing character, and a character too many. If a correction is found, the corrected path is printed, and the command proceeds. This option is only used by interactive shells.
  
  `cdspell`：如果设置，`cd`命令中目录组成部分的拼写错误将被纠正。检查的错误包括字符转置、缺失字符和多余字符。如果发现修正，将打印修正后的路径，并继续执行命令。此选项仅由交互式Shell使用。
  
  `checkhash`: If this is set, Bash checks that a command found in the hash table exists before trying to execute it. If a hashed command no longer exists, a normal path search is performed.
  
  `checkhash`：如果设置，Bash在尝试执行哈希表中找到的命令之前检查命令是否存在。如果哈希的命令不再存在，则执行正常的路径搜索。
  
  `checkjobs`: If set, Bash lists the status of any stopped and running jobs before exiting an interactive shell. If any jobs are running, this causes the exit to be deferred until a second exit is attempted without an intervening command (see [Job Control](#7-作业控制)). The shell always postpones exiting if any jobs are stopped.
  
  `checkjobs`：如果设置，Bash在退出交互式Shell之前列出所有停止和正在运行的作业的状态。如果有任何作业正在运行，这会导致退出被推迟，直到尝试在没有中间命令的情况下进行第二次退出（参见[作业控制](https://www.gnu.org/software/bash/manual/bash.html#作业控制)）。如果有任何作业停止，Shell总是推迟退出。
  
  `checkwinsize`: If set, Bash checks the window size after each external (non-builtin) command and, if necessary, updates the values of `LINES` and `COLUMNS`. This option is enabled by default.
  
  `checkwinsize`：如果设置，Bash在每个外部（非内置）命令之后检查窗口大小，并在必要时更新`LINES`和`COLUMNS`的值。此选项默认启用。
  
  `cmdhist`: If set, Bash attempts to save all lines of a multiple-line command in the same history entry. This allows easy re-editing of multi-line commands. This option is enabled by default, but only has an effect if command history is enabled (see [Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities)).
  
  `cmdhist`：如果设置，Bash尝试将多行命令的所有行保存在同一个历史条目中。这样可以轻松重新编辑多行命令。此选项默认启用，但仅在命令历史记录启用时才有效（参见[命令历史记录](https://www.gnu.org/software/bash/manual/bash.html#命令历史记录)）。
  
  `compat31` 
  
  `compat32` 
  
  `compat40` 
  
  `compat41` 
  
  `compat42` 
  
  `compat43` 
  
  `compat44`: These control aspects of the shell's compatibility mode (see [Shell Compatibility Mode](#612-shell-compatibility-mode)).
  
  `compat44`：控制Shell的兼容模式的一些方面（参见[Shell兼容模式](#612-shell-compatibility-mode)）。
  
  `complete_fullquote`: If set, Bash quotes all shell metacharacters in filenames and directory names when performing completion. If not set, Bash removes metacharacters such as the dollar sign from the set of characters that will be quoted in completed filenames when these metacharacters appear in shell variable references in words to be completed. This means that dollar signs in variable names that expand to directories will not be quoted; however, any dollar signs appearing in filenames will not be quoted, either. This is active only when bash is using backslashes to quote completed filenames. This variable is set by default, which is the default Bash behavior in versions through 4.2.
  
  `complete_fullquote`：如果设置，Bash在执行补全时引用文件名和目录名中的所有Shell元字符。如果未设置，Bash会从要补全的单词中移除Shell变量引用中的元字符，例如美元符号。这意味着不会引用扩展到目录的变量名中的美元符号；但是，文件名中的任何美元符号也不会被引用。这仅在Bash使用反斜杠引用补全的文件名时生效。此变量默认设置，这是Bash版本通过4.2时的默认行为。
  
  `direxpand`: If set, Bash replaces directory names with the results of word expansion when performing filename completion. This changes the contents of the Readline editing buffer. If not set, Bash attempts to preserve what the user typed.
  
  `direxpand`：如果设置了该选项，则在执行文件名补全时，Bash会将目录名替换为单词展开的结果。这会更改Readline编辑缓冲区的内容。如果未设置该选项，则Bash会尝试保留用户键入的内容。
  
  `dirspell`: If set, Bash attempts spelling correction on directory names during word completion if the directory name initially supplied does not exist.
  
  `dirspell`：如果设置了该选项，则在单词补全期间，如果最初提供的目录名称不存在，Bash会尝试对目录名称进行拼写纠正。
  
  `dotglob`: If set, Bash includes filenames beginning with a `.` in the results of filename expansion. The filenames `.` and `..` must always be matched explicitly, even if `dotglob` is set.
  
  `dotglob`：如果设置了该选项，则在文件名展开的结果中包括以`.`开头的文件名。文件名`.`和`..`始终需要显式匹配，即使设置了`dotglob`。
  
  `execfail`: If this is set, a non-interactive shell will not exit if it cannot execute the file specified as an argument to the `exec` builtin command. An interactive shell does not exit if `exec` fails.
  
  `execfail`：如果设置了该选项，则非交互式Shell在无法执行作为`exec`内置命令参数指定的文件时不会退出。如果`exec`失败，交互式Shell不会退出。
  
  `expand_aliases`: If set, aliases are expanded as described below under Aliases, [Aliases](#66-别名). This option is enabled by default for interactive shells.
  
  `expand_aliases`：如果设置了该选项，则按照下面的[别名](#66-别名)中所述进行别名扩展。此选项在交互式Shell中默认启用。
  
  `extdebug`: If set at shell invocation, or in a shell startup file, arrange to execute the debugger profile before the shell starts, identical to the `--debugger` option. If set after invocation, behavior intended for use by debuggers is enabled:
  
  `extdebug`：如果在Shell启动时设置了该选项，或者在Shell启动文件中设置了该选项，Shell在启动之前会执行调试器配置文件，与`--debugger`选项相同。如果在启动后设置了该选项，则启用供调试器使用的行为： 
  
  - The -F option to the `declare` builtin (see [Bash Builtin Commands](#42-bash-内置命令)) displays the source file name and line number corresponding to each function name supplied as an argument.
  
  - `declare`内置命令（参见[内置命令`declare`](https://chat.openai.com/c/afdf90c9-b0cc-4043-9b72-a06269cc6bcd#43.2.3)）的`-F`选项显示与每个函数名作为参数所对应的源文件名和行号。
  
  - If the command run by the `DEBUG` trap returns a non-zero value, the next command is skipped and not executed.
  
  - 如果由`DEBUG`陷阱运行的命令返回非零值，则跳过下一条命令而不执行。
  
  - If the command run by the `DEBUG` trap returns a value of 2, and the shell is executing in a subroutine (a shell function or a shell script executed by the `.` or `source` builtins), the shell simulates a call to `return`.`BASH_ARGC` and `BASH_ARGV` are updated as described in their descriptions (see [Bash Variables](#52-bash-变量)).
  
  - 如果由`DEBUG`陷阱运行的命令返回值为2，并且Shell正在执行子例程（Shell函数或由内置命令`.`或`source`执行的Shell脚本），则Shell模拟对`return`的调用。`BASH_ARGC`和`BASH_ARGV`将根据它们的描述更新，如其描述所示（参见[Bash变量](#52-bash-变量)）。
  
  - Function tracing is enabled: command substitution, shell functions, and subshells invoked with `( command )` inherit the `DEBUG` and `RETURN` traps.
  
  - 启用函数跟踪：命令替换、Shell函数和使用`( command )`调用的子Shell继承`DEBUG`和`RETURN`陷阱。
  
  - Error tracing is enabled: command substitution, shell functions, and subshells invoked with `( command )` inherit the `ERR` trap.
  
  - 启用错误跟踪：命令替换、Shell函数和使用`( command )`调用的子Shell继承`ERR`陷阱。
  
  
  
  
  `extglob`: If set, the extended pattern matching features described above (see [Pattern Matching](#3581-模式匹配)) are enabled.
  
  `extglob`：如果设置了该选项，则启用上面描述的[扩展模式匹配特性](#3581-模式匹配)。
  
  `extquote`: If set, `$'string'` and `$"string"` quoting is performed within `${parameter}` expansions enclosed in double quotes. This option is enabled by default.
  
  `extquote`：如果设置了该选项，则在双引号括起来的`${parameter}`扩展内执行`$'string'`和`$"string"`引用。此选项默认启用。
  
  `failglob`: If set, patterns which fail to match filenames during filename expansion result in an expansion error.
  
  `failglob`：如果设置了该选项，则在文件名展开期间，无法匹配文件名的模式导致展开错误。
  
  `force_fignore`If set, the suffixes specified by the `FIGNORE` shell variable cause words to be ignored when performing word completion even if the ignored words are the only possible completions. See [Bash Variables](#52-bash-变量), for a description of `FIGNORE`. This option is enabled by default.
  
  `force_fignore`：如果设置了该选项，并且`FIGNORE` Shell变量指定的后缀在执行单词补全时导致要忽略的单词，即使被忽略的单词是唯一可能的补全项，也会被忽略。有关`FIGNORE`的描述，请参见[Bash变量](#52-bash-变量)。此选项默认启用。
  
  `globasciiranges`: If set, range expressions used in pattern matching bracket expressions (see [Pattern Matching](#3581-模式匹配)) behave as if in the traditional C locale when performing comparisons. That is, the current locale's collating sequence is not taken into account, so `b` will not collate between `A` and `B`, and upper-case and lower-case ASCII characters will collate together.
  
  `globasciiranges`：如果设置了该选项，则在模式匹配的括号表达式（参见[模式匹配](#3581-模式匹配)）中使用的范围表达式在比较时的行为类似于传统的C语言环境。也就是说，不考虑当前区域设置的排序序列，因此`b`不会排在`A`和`B`之间，大写字母和小写字母的ASCII字符将进行排序。
  
  `globskipdots`: If set, filename expansion will never match the filenames `.` and `..`, even if the pattern begins with a `.`. This option is enabled by default.
  
  `globskipdots`：如果设置了该选项，则文件名展开将永远不会匹配文件名`.`和`..`，即使模式以`.`开头。此选项默认启用。
  
  `globstar`: If set, the pattern `**` used in a filename expansion context will match all files and zero or more directories and subdirectories. If the pattern is followed by a `/`, only directories and subdirectories match.
  
  `globstar`：如果设置了该选项，则在文件名展开上下文中使用的模式`**`将匹配所有文件、零个或多个目录和子目录。如果模式后跟`/`，则只匹配目录和子目录。
  
  `gnu_errfmt`: If set, shell error messages are written in the standard GNU error message format.
  
  `gnu_errfmt`：如果设置了该选项，则Shell错误消息以标准的GNU错误消息格式编写。
  
  `histappend`: If set, the history list is appended to the file named by the value of the `HISTFILE` variable when the shell exits, rather than overwriting the file.
  
  `histappend`：如果设置了该选项，则在Shell退出时，历史记录列表将附加到`HISTFILE`变量指定的文件中，而不是覆盖该文件。
  
  `histreedit`: If set, and Readline is being used, a user is given the opportunity to re-edit a failed history substitution.
  
  `histreedit`：如果设置了该选项，并且正在使用Readline，则允许用户重新编辑失败的历史记录替换。
  
  `histverify`: If set, and Readline is being used, the results of history substitution are not immediately passed to the shell parser. Instead, the resulting line is loaded into the Readline editing buffer, allowing further modification.
  
  `histverify`：如果设置了该选项，并且正在使用Readline，则历史记录替换的结果不会立即传递给Shell解析器。相反，结果行加载到Readline编辑缓冲区中，允许进一步修改。
  
  `hostcomplete`: If set, and Readline is being used, Bash will attempt to perform hostname completion when a word containing a `@` is being completed (see [Letting Readline Type For You](#846-让-readline-为你键入)). This option is enabled by default.
  
  `hostcomplete`：如果设置了该选项，并且正在使用Readline，当正在进行单词补全的单词中包含`@`时，Bash将尝试执行主机名补全（参见[让Readline为您键入](#846-让-readline-为你键入)）。此选项默认启用。
  
  `huponexit`: If set, Bash will send `SIGHUP` to all jobs when an interactive login shell exits (see [Signals](#376-信号)).
  
  `huponexit`：如果设置了该选项，并且交互式登录Shell退出时，Bash将向所有作业发送`SIGHUP`信号（参见[信号](#376-信号)）。
  
  `inherit_errexit`: If set, command substitution inherits the value of the `errexit` option, instead of unsetting it in the subshell environment. This option is enabled when POSIX mode is enabled.
  
  `inherit_errexit`：如果设置了该选项，则命令替换在子Shell环境中继承`errexit`选项的值，而不是在子Shell环境中取消设置该选项。在启用POSIX模式时，此选项被启用。
  
  `interactive_comments`: Allow a word beginning with `#` to cause that word and all remaining characters on that line to be ignored in an interactive shell. This option is enabled by default.
  
  `interactive_comments`: 允许以`#`开头的单词在交互式 shell 中被忽略，以及忽略该行上的所有剩余字符。此选项默认启用。
  
  `lastpipe`: If set, and job control is not active, the shell runs the last command of a pipeline not executed in the background in the current shell environment.
  
  `lastpipe`: 如果设置了该选项，并且作业控制未激活，Shell 在当前 Shell 环境中运行管道的最后一个未在后台执行的命令。
  
  `lithist`: If enabled, and the `cmdhist` option is enabled, multi-line commands are saved to the history with embedded newlines rather than using semicolon separators where possible.
  
  `lithist`: 如果启用了该选项，并且启用了 `cmdhist` 选项，则多行命令将保存到历史记录中，而不是使用分号作为分隔符。
  
  `localvar_inherit`: If set, local variables inherit the value and attributes of a variable of the same name that exists at a previous scope before any new value is assigned. The `nameref` attribute is not inherited.
  
  `localvar_inherit`: 如果设置了该选项，局部变量将继承在之前作用域中具有相同名称的变量的值和属性，然后再分配新值。`nameref` 属性不会被继承。
  
  `localvar_unset`: If set, calling `unset` on local variables in previous function scopes marks them so subsequent lookups find them unset until that function returns. This is identical to the behavior of unsetting local variables at the current function scope.
  
  `localvar_unset`: 如果设置了该选项，在先前的函数作用域中对局部变量调用 `unset` 将标记它们，以便在函数返回之前，后续的查找将发现它们未设置。这与在当前函数作用域中取消设置局部变量的行为相同。
  
  `login_shell`: The shell sets this option if it is started as a login shell (see [Invoking Bash](#61-调用bash)). The value may not be changed.
  
  `login_shell`: 如果 Shell 作为登录 Shell 启动，则设置此选项（参见[Invoking Bash](#61-调用bash)）。该值不可更改。
  
  `mailwarn`: If set, and a file that Bash is checking for mail has been accessed since the last time it was checked, the message `"The mail in mailfile has been read"` is displayed.
  
  `mailwarn`: 如果设置了该选项，并且 Bash 在上次检查以来访问了用于检查邮件的文件，则显示消息 `"The mail in mailfile has been read"`。
  
  `no_empty_cmd_completion`: If set, and Readline is being used, Bash will not attempt to search the `PATH` for possible completions when completion is attempted on an empty line.
  
  `no_empty_cmd_completion`: 如果设置了该选项，并且正在使用 Readline，当尝试在空行上进行补全时，Bash 不会尝试在 `PATH` 中搜索可能的补全项。
  
  `nocaseglob`: If set, Bash matches filenames in a case-insensitive fashion when performing filename expansion.
  
  `nocaseglob`: 如果设置了该选项，Bash 在执行文件名扩展时以不区分大小写的方式匹配文件名。
  
  `nocasematch`: If set, Bash matches patterns in a case-insensitive fashion when performing matching while executing `case` or `[[` conditional commands (see [Conditional Constructs](#3252-条件结构), when performing pattern substitution word expansions, or when filtering possible completions as part of programmable completion.
  
  `nocasematch`: 如果设置了该选项，Bash 在执行 `case` 或 `[[` 条件命令（参见[Conditional Constructs](#3252-条件结构)）时以不区分大小写的方式匹配模式，以及在执行模式替换单词扩展或作为可编程补全的一部分过滤可能的补全项时。
  
  `noexpand_translation`: If set, Bash encloses the translated results of $"..." quoting in single quotes instead of double quotes. If the string is not translated, this has no effect.
  
  `noexpand_translation`: 如果设置了该选项，Bash 在 $"..." 引用的翻译结果中使用单引号而不是双引号。如果字符串没有被翻译，这将没有影响。
  
  `nullglob`: If set, Bash allows filename patterns which match no files to expand to a null string, rather than themselves.
  
  `nullglob`: 如果设置了该选项，Bash 允许未匹配任何文件的文件名模式扩展为空字符串，而不是它们自己。
  
  `patsub_replacement`: If set, Bash expands occurrences of `&` in the replacement string of pattern substitution to the text matched by the pattern, as described above (see [Shell Parameter Expansion](#353-shell参数扩展)). This option is enabled by default.
  
  `patsub_replacement`: 如果设置了该选项，Bash 将替换模式替换的替换字符串中的 `&` 为与该模式匹配的文本，如上所述（参见[Shell Parameter Expansion](#353-shell参数扩展)）。此选项默认启用。
  
  `progcomp`: If set, the programmable completion facilities (see [Programmable Completion](#86-可编程自动完成)) are enabled. This option is enabled by default.
  
  `progcomp`: 如果设置了该选项，将启用可编程补全功能（参见[Programmable Completion](#86-可编程自动完成)）。此选项默认启用。
  
  `progcomp_alias`: If set, and programmable completion is enabled, Bash treats a command name that doesn't have any completions as a possible alias and attempts alias expansion. If it has an alias, Bash attempts programmable completion using the command word resulting from the expanded alias.
  
  `progcomp_alias`: 如果设置了该选项，并且启用了可编程补全，Bash 将把没有任何补全项的命令名称视为可能的别名，并尝试进行别名扩展。如果存在别名，Bash 将尝试使用扩展的别名结果作为命令单词进行可编程补全。
  
  `promptvars`: If set, prompt strings undergo parameter expansion, command substitution, arithmetic expansion, and quote removal after being expanded as described below (see [Controlling the Prompt](#69-控制提示符)). This option is enabled by default.
  
  `promptvars`: 如果设置了该选项，在扩展后，提示字符串将经历参数扩展、命令替换、算术扩展和去除引号的过程，如下所述（参见[Controlling the Prompt](#69-控制提示符)）。此选项默认启用。
  
  `restricted_shell`: The shell sets this option if it is started in restricted mode (see [The Restricted Shell](#610-受限制的shell)). The value may not be changed. This is not reset when the startup files are executed, allowing the startup files to discover whether or not a shell is restricted.
  
  `restricted_shell`: 如果 Shell 在受限模式下启动，则设置此选项（参见[The Restricted Shell](#610-受限制的shell)）。该值不可更改。在执行启动文件时不会重置该选项，从而允许启动文件发现是否限制了 Shell。
  
  `shift_verbose`: If this is set, the `shift` builtin prints an error message when the shift count exceeds the number of positional parameters.
  
  `shift_verbose`: 如果设置了该选项，`shift` 内置命令在移位计数超过位置参数的数量时会打印错误消息。
  
  `sourcepath`: If set, the `.` (`source`) builtin uses the value of `PATH` to find the directory containing the file supplied as an argument. This option is enabled by default.
  
  `sourcepath`: 如果设置了该选项，`.` (`source`) 内置命令将使用 `PATH` 的值来查找包含作为参数提供的文件的目录。此选项默认启用。
  
  `varredir_close`: If set, the shell automatically closes file descriptors assigned using the `{varname}` redirection syntax (see [Redirections](#36-重定向)) instead of leaving them open when the command completes.
  
  `varredir_close`: 如果设置了该选项，Shell 在命令完成时会自动关闭使用 `{varname}` 重定向语法（参见[Redirections](#36-重定向)）分配的文件描述符，而不是在命令完成时将它们保持打开状态。
  
  `xpg_echo`: If set, the `echo` builtin expands backslash-escape sequences by default.
  
  `xpg_echo`: 如果设置了该选项，`echo` 内置命令默认会展开反斜杠转义序列。





### 4.4 特殊内置命令



For historical reasons, the POSIX standard has classified several builtin commands as *special*. When Bash is executing in POSIX mode, the special builtins differ from other builtin commands in three respects:

​	出于历史原因，POSIX 标准将几个内置命令分类为*特殊命令*。当 Bash 在 POSIX 模式下执行时，特殊内置命令在以下三个方面与其他内置命令不同： 

1. Special builtins are found before shell functions during command lookup.
2. If a special builtin returns an error status, a non-interactive shell exits.
3. Assignment statements preceding the command stay in effect in the shell environment after the command completes.
4. 在命令查找期间，特殊内置命令在 shell 函数之前找到。
5. 如果特殊内置命令返回错误状态，非交互式 shell 将退出。
6. 在命令完成后，命令之前的赋值语句在 shell 环境中保持生效。

When Bash is not executing in POSIX mode, these builtins behave no differently than the rest of the Bash builtin commands. The Bash POSIX mode is described in [Bash POSIX Mode](#611-bash的posix模式).

​	当 Bash 不在 POSIX 模式下执行时，这些内置命令的行为与其他 Bash 内置命令没有区别。Bash POSIX 模式的说明见[Bash POSIX 模式](#611-bash的posix模式)。

These are the POSIX special builtins:

​	以下是 POSIX 的特殊内置命令：

```sh
break : . continue eval exec exit export readonly return set
shift trap unset
```





## 5 Shell 变量

This chapter describes the shell variables that Bash uses. Bash automatically assigns default values to a number of variables.

​	本章描述了 Bash 使用的 shell 变量。Bash 自动为多个变量分配默认值。






### 5.1 Bourne Shell 变量

Bash uses certain shell variables in the same way as the Bourne shell. In some cases, Bash assigns a default value to the variable.

​	Bash 使用某些 Bourne shell 中的 shell 变量。在某些情况下，Bash 会为变量分配默认值。

- `CDPATH`

  A colon-separated list of directories used as a search path for the `cd` builtin command.

  以冒号分隔的目录列表，用作 `cd` 内置命令的搜索路径。

- `HOME`

  The current user's home directory; the default for the `cd` builtin command. The value of this variable is also used by tilde expansion (see [Tilde Expansion](#352-波浪号扩展)).

  当前用户的主目录；`cd` 内置命令的默认值。该变量的值也用于波浪线扩展（参见[Tilde Expansion](#352-波浪号扩展)）。

- `IFS`

  A list of characters that separate fields; used when the shell splits words as part of expansion.

  字段分隔符列表；在 shell 拆分单词时使用。

- `MAIL`

  If this parameter is set to a filename or directory name and the `MAILPATH` variable is not set, Bash informs the user of the arrival of mail in the specified file or Maildir-format directory.

  如果将此参数设置为文件名或目录名，并且未设置 `MAILPATH` 变量，则 Bash 会通知用户邮件到达指定的文件或 Maildir 格式目录。

- `MAILPATH`

  A colon-separated list of filenames which the shell periodically checks for new mail. Each list entry can specify the message that is printed when new mail arrives in the mail file by separating the filename from the message with a `?`. When used in the text of the message, `$_` expands to the name of the current mail file.

  以冒号分隔的文件名列表，shell 定期检查其中的新邮件。每个列表条目都可以通过使用 `?` 将文件名与消息分隔来指定在邮件文件中到达新邮件时要打印的消息。在消息的文本中使用 `$_` 可以展开为当前邮件文件的名称。

- `OPTARG`

  The value of the last option argument processed by the `getopts` builtin.

  `getopts` 内置命令处理的最后一个选项参数的值。

- `OPTIND`

  The index of the last option argument processed by the `getopts` builtin.

  `getopts` 内置命令处理的最后一个选项参数的索引。

- `PATH`

  A colon-separated list of directories in which the shell looks for commands. A zero-length (null) directory name in the value of `PATH` indicates the current directory. A null directory name may appear as two adjacent colons, or as an initial or trailing colon.

  以冒号分隔的目录列表，shell 在其中查找命令。`PATH` 的值中的零长度（空）目录名称表示当前目录。空目录名称可以出现为两个相邻的冒号，或者作为初始或尾随冒号。

- `PS1`

  The primary prompt string. The default value is `\s-\v\$ `. See [Controlling the Prompt](#69-控制提示符), for the complete list of escape sequences that are expanded before `PS1` is displayed.

  主提示字符串。默认值为 `\s-\v\$ `。在显示 `PS1` 之前，会展开所有转义序列。完整的转义序列列表请参见[Controlling the Prompt](#69-控制提示符)。

- `PS2`

  The secondary prompt string. The default value is `> `. `PS2` is expanded in the same way as `PS1` before being displayed.
  
  次要提示字符串。默认值为 `> `。在显示 `PS2` 之前，会像展开 `PS1` 一样进行展开。





### 5.2 Bash 变量

These variables are set or used by Bash, but other shells do not normally treat them specially.

​	这些变量由 Bash 设置或使用，但其他 shell 通常不会对它们特殊处理。

A few variables used by Bash are described in different chapters: variables for controlling the job control facilities (see [Job Control Variables](#7-作业控制-Variables)).

​	Bash 使用的一些变量在不同的章节中进行了描述：用于控制作业控制功能的变量（参见[作业控制变量](#7-作业控制-Variables)）。

- `_`

  ($_, an underscore.) At shell startup, set to the pathname used to invoke the shell or shell script being executed as passed in the environment or argument list. Subsequently, expands to the last argument to the previous simple command executed in the foreground, after expansion. Also set to the full pathname used to invoke each command executed and placed in the environment exported to that command. When checking mail, this parameter holds the name of the mail file.

  （`$_`，下划线）在 shell 启动时，设置为用于调用环境或参数列表中传递的正在执行的 shell 或 shell 脚本的路径名。随后，在展开之后，扩展为前台执行的上一个简单命令的最后一个参数。还设置为执行的每个命令的完整路径名，并放置在导出给该命令的环境中。在检查邮件时，此参数保存邮件文件的名称。

- `BASH`

  The full pathname used to execute the current instance of Bash.

  用于执行当前 Bash 实例的完整路径名。

- `BASHOPTS`

  A colon-separated list of enabled shell options. Each word in the list is a valid argument for the -s option to the `shopt` builtin command (see [The Shopt Builtin](#432--shopt内置命令)). The options appearing in `BASHOPTS` are those reported as `on` by `shopt`. If this variable is in the environment when Bash starts up, each shell option in the list will be enabled before reading any startup files. This variable is readonly.

  以冒号分隔的启用的 shell 选项列表。列表中的每个单词都是 `shopt` 内置命令的 -s 选项的有效参数（参见[shopt 内置命令](#432--shopt内置命令)）。在 `BASHOPTS` 中出现的选项是由 `shopt` 报告为 `on` 的选项。如果此变量在 Bash 启动时存在于环境中，在读取任何启动文件之前，列表中的每个 shell 选项都将被启用。此变量为只读。

- `BASHPID`

  Expands to the process ID of the current Bash process. This differs from `$$` under certain circumstances, such as subshells that do not require Bash to be re-initialized. Assignments to `BASHPID` have no effect. If `BASHPID` is unset, it loses its special properties, even if it is subsequently reset.

  扩展为当前 Bash 进程的进程 ID。这与某些情况下的 `$$` 不同，例如不需要重新初始化 Bash 的子 shell。对 `BASHPID` 的赋值没有影响。如果 `BASHPID` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_ALIASES`

  An associative array variable whose members correspond to the internal list of aliases as maintained by the `alias` builtin. (see [Bourne Shell Builtins](#41-bourne-shell-builtins)). Elements added to this array appear in the alias list; however, unsetting array elements currently does not cause aliases to be removed from the alias list. If `BASH_ALIASES` is unset, it loses its special properties, even if it is subsequently reset.

  一个关联数组变量，其成员对应 `alias` 内置命令维护的内部别名列表（参见[Bourne Shell 内置命令](#41-bourne-shell-builtins)）。添加到此数组的元素将出现在别名列表中；但是，当前取消设置数组元素不会导致别名从别名列表中删除。如果 `BASH_ALIASES` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_ARGC`

  An array variable whose values are the number of parameters in each frame of the current bash execution call stack. The number of parameters to the current subroutine (shell function or script executed with `.` or `source`) is at the top of the stack. When a subroutine is executed, the number of parameters passed is pushed onto `BASH_ARGC`. The shell sets `BASH_ARGC` only when in extended debugging mode (see [The Shopt Builtin](#432--shopt内置命令) for a description of the `extdebug` option to the `shopt` builtin). Setting `extdebug` after the shell has started to execute a script, or referencing this variable when `extdebug` is not set, may result in inconsistent values.

  一个数组变量，其值是当前 bash 执行调用栈中每个帧中的参数数目。当前子例程（shell 函数或使用 `.` 或 `source` 执行的脚本）的参数数目在栈的顶部。执行子例程时，传递的参数数目被推入 `BASH_ARGC`。只有在扩展调试模式下（参见[shopt 内置命令](#432--shopt内置命令)的 `extdebug` 选项的描述）时，shell 才设置 `BASH_ARGC`。在脚本开始执行后设置 `extdebug` 或在 `extdebug` 未设置时引用此变量可能导致值不一致。

- `BASH_ARGV`

  An array variable containing all of the parameters in the current bash execution call stack. The final parameter of the last subroutine call is at the top of the stack; the first parameter of the initial call is at the bottom. When a subroutine is executed, the parameters supplied are pushed onto `BASH_ARGV`. The shell sets `BASH_ARGV` only when in extended debugging mode (see [The Shopt Builtin](#432--shopt内置命令) for a description of the `extdebug` option to the `shopt` builtin). Setting `extdebug` after the shell has started to execute a script, or referencing this variable when `extdebug` is not set, may result in inconsistent values.

  一个数组变量，其中包含当前 bash 执行调用栈中的所有参数。最后一个子例程调用的参数位于栈的顶部；初始调用的第一个参数位于底部。执行子例程时，提供的参数被推入 `BASH_ARGV`。只有在扩展调试模式下（参见[shopt 内置命令](#432--shopt内置命令)的 `extdebug` 选项的描述）时，shell 才设置 `BASH_ARGV`。在脚本开始执行后设置 `extdebug` 或在 `extdebug` 未设置时引用此变量可能导致值不一致。

- `BASH_ARGV0`

  When referenced, this variable expands to the name of the shell or shell script (identical to `$0`; See [Special Parameters](#342-特殊参数), for the description of special parameter 0). Assignment to `BASH_ARGV0` causes the value assigned to also be assigned to `$0`. If `BASH_ARGV0` is unset, it loses its special properties, even if it is subsequently reset.

  引用时，此变量扩展为 shell 或 shell 脚本的名称（与 `$0` 相同；有关特殊参数 0 的描述，请参见[特殊参数](#342-特殊参数)）。对 `BASH_ARGV0` 的赋值也会将值分配给 `$0`。如果 `BASH_ARGV0` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_CMDS`

  An associative array variable whose members correspond to the internal hash table of commands as maintained by the `hash` builtin (see [Bourne Shell Builtins](#41-bourne-shell-builtins)). Elements added to this array appear in the hash table; however, unsetting array elements currently does not cause command names to be removed from the hash table. If `BASH_CMDS` is unset, it loses its special properties, even if it is subsequently reset.

  一个关联数组变量，其成员对应 `hash` 内置命令维护的内部命令哈希表（参见[Bourne Shell 内置命令](#41-bourne-shell-builtins)）。添加到此数组的元素将出现在哈希表中；但是，当前取消设置数组元素不会导致命令名称从哈希表中删除。如果 `BASH_CMDS` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_COMMAND`

  The command currently being executed or about to be executed, unless the shell is executing a command as the result of a trap, in which case it is the command executing at the time of the trap. If `BASH_COMMAND` is unset, it loses its special properties, even if it is subsequently reset.

  当前正在执行或即将执行的命令，除非 shell 作为陷阱的结果执行命令，在这种情况下，它是陷阱发生时的命令。如果 `BASH_COMMAND` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_COMPAT`

  The value is used to set the shell's compatibility level. See [Shell Compatibility Mode](#612-shell-compatibility-mode), for a description of the various compatibility levels and their effects. The value may be a decimal number (e.g., 4.2) or an integer (e.g., 42) corresponding to the desired compatibility level. If `BASH_COMPAT` is unset or set to the empty string, the compatibility level is set to the default for the current version. If `BASH_COMPAT` is set to a value that is not one of the valid compatibility levels, the shell prints an error message and sets the compatibility level to the default for the current version. The valid values correspond to the compatibility levels described below (see [Shell Compatibility Mode](#612-shell-compatibility-mode)). For example, 4.2 and 42 are valid values that correspond to the `compat42` `shopt` option and set the compatibility level to 42. The current version is also a valid value.

  此值用于设置 shell 的兼容性级别。有关各种兼容性级别及其影响的描述，请参见[Shell Compatibility Mode](#612-shell-compatibility-mode)。该值可以是十进制数（例如，4.2）或整数（例如，42），对应于所需的兼容性级别。如果 `BASH_COMPAT` 未设置或设置为空字符串，则兼容性级别将设置为当前版本的默认值。如果 `BASH_COMPAT` 设置为不是有效兼容性级别之一的值，则 shell 打印错误消息并将兼容性级别设置为当前版本的默认值。有效值对应于下面描述的兼容性级别（参见[Shell Compatibility Mode](#612-shell-compatibility-mode)）。例如，4.2 和 42 是有效值，对应于 `compat42` 的 `shopt` 选项，并将兼容性级别设置为 42。当前版本也是一个有效值。

- `BASH_ENV`

  If this variable is set when Bash is invoked to execute a shell script, its value is expanded and used as the name of a startup file to read before executing the script. See [Bash Startup Files](#62-bash启动文件-bash-startup-files).

  如果在调用 Bash 执行 shell 脚本时设置了此变量，则其值会扩展并用作在执行脚本之前读取的启动文件的名称。有关详细信息，请参见[Bash 启动文件](#62-bash启动文件-bash-startup-files)。

- `BASH_EXECUTION_STRING`

  The command argument to the -c invocation option.

  传递给 -c 选项的命令参数。

- `BASH_LINENO`

  An array variable whose members are the line numbers in source files where each corresponding member of `FUNCNAME` was invoked. `${BASH_LINENO[$i]}` is the line number in the source file (`${BASH_SOURCE[$i+1]}`) where `${FUNCNAME[$i]}` was called (or `${BASH_LINENO[$i-1]}` if referenced within another shell function). Use `LINENO` to obtain the current line number.

  一个数组变量，其成员是源文件中每个相应的 `FUNCNAME` 成员被调用的行号。`${BASH_LINENO[$i]}` 是源文件（`${BASH_SOURCE[$i+1]}`）中调用 `${FUNCNAME[$i]}` 的行号（或者在另一个 shell 函数内引用时为 `${BASH_LINENO[$i-1]}`）。使用 `LINENO` 获取当前行号。

- `BASH_LOADABLES_PATH`

  A colon-separated list of directories in which the shell looks for dynamically loadable builtins specified by the `enable` command.

  以冒号分隔的目录列表，用于指定 `enable` 命令加载的动态可加载内置命令。

- `BASH_REMATCH`

  An array variable whose members are assigned by the `=~` binary operator to the `[[` conditional command (see [Conditional Constructs](#3252-条件结构)). The element with index 0 is the portion of the string matching the entire regular expression. The element with index n is the portion of the string matching the nth parenthesized subexpression.

  一个数组变量，其成员由 `=~` 二进制运算符分配给 `[[` 条件命令（参见[条件构造](#3252-条件结构)）。索引为 0 的元素是与整个正则表达式匹配的部分。索引为 n 的元素是与第 n 个括号子表达式匹配的部分。

- `BASH_SOURCE`

  An array variable whose members are the source filenames where the corresponding shell function names in the `FUNCNAME` array variable are defined. The shell function `${FUNCNAME[$i]}` is defined in the file `${BASH_SOURCE[$i]}` and called from `${BASH_SOURCE[$i+1]}`

  一个数组变量，其成员是 `FUNCNAME` 数组变量中相应的 shell 函数名所定义的源文件名。`${FUNCNAME[$i]}` 在文件 `${BASH_SOURCE[$i]}` 中定义，并从 `${BASH_SOURCE[$i+1]}` 调用。

- `BASH_SUBSHELL`

  Incremented by one within each subshell or subshell environment when the shell begins executing in that environment. The initial value is 0. If `BASH_SUBSHELL` is unset, it loses its special properties, even if it is subsequently reset.

  在每个子 shell 或子 shell 环境中增加一。初始值为 0。如果 `BASH_SUBSHELL` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_VERSINFO`

  A readonly array variable (see [Arrays](#67-数组)) whose members hold version information for this instance of Bash. The values assigned to the array members are as follows:

  

  - `BASH_VERSINFO[0]`: The major version number (the *release*). 主版本号（*release*）。

  - `BASH_VERSINFO[1]`: The minor version number (the *version*).次版本号（*version*）。

  - `BASH_VERSINFO[2]`: The patch level. 补丁级别。

  - `BASH_VERSINFO[3]`: The build version.构建版本。

  - `BASH_VERSINFO[4]`: The release status (e.g., `beta1`).发布状态（例如 `beta1`）。

  - `BASH_VERSINFO[5]`: The value of `MACHTYPE`.`MACHTYPE` 的值。

  

- `BASH_VERSION`

  The version number of the current instance of Bash.

  当前 Bash 实例的版本号。

- `BASH_XTRACEFD`

  If set to an integer corresponding to a valid file descriptor, Bash will write the trace output generated when `set -x` is enabled to that file descriptor. This allows tracing output to be separated from diagnostic and error messages. The file descriptor is closed when `BASH_XTRACEFD` is unset or assigned a new value. Unsetting `BASH_XTRACEFD` or assigning it the empty string causes the trace output to be sent to the standard error. Note that setting `BASH_XTRACEFD` to 2 (the standard error file descriptor) and then unsetting it will result in the standard error being closed.

  如果设置为与有效文件描述符对应的整数，Bash 将把启用 `set -x` 时生成的跟踪输出写入该文件描述符。这样可以将跟踪输出与诊断和错误消息分开。当 `BASH_XTRACEFD` 未设置或赋予新值时，文件描述符将关闭。将 `BASH_XTRACEFD` 取消设置或将其赋值为空字符串将导致跟踪输出发送到标准错误。请注意，将 `BASH_XTRACEFD` 设置为 2（标准错误文件描述符），然后取消设置它将导致关闭标准错误。

- `CHILD_MAX`

  Set the number of exited child status values for the shell to remember. Bash will not allow this value to be decreased below a POSIX-mandated minimum, and there is a maximum value (currently 8192) that this may not exceed. The minimum value is system-dependent.

  设置 shell 记住的已退出子进程状态值的数量。Bash 不允许将此值减少到 POSIX 规定的最小值，并且有一个最大值（当前为 8192）不能超过该值。最小值取决于系统。

- `COLUMNS`

  Used by the `select` command to determine the terminal width when printing selection lists. Automatically set if the `checkwinsize` option is enabled (see [The Shopt Builtin](#432--shopt内置命令)), or in an interactive shell upon receipt of a `SIGWINCH`.

  `select` 命令用于确定打印选择列表时的终端宽度。如果启用了 `checkwinsize` 选项（参见[shopt 内置命令](#432--shopt内置命令)），或在交互式 shell 接收到 `SIGWINCH` 信号时自动设置。

- `COMP_CWORD`

  An index into `${COMP_WORDS}` of the word containing the current cursor position. This variable is available only in shell functions invoked by the programmable completion facilities (see [Programmable Completion](#86-可编程自动完成)).

  `${COMP_WORDS}` 中包含当前光标位置所在单词的索引。此变量仅在由可编程补全功能调用的 shell 函数中可用（参见[可编程补全](#86-可编程自动完成)）。

- `COMP_LINE`

  The current command line. This variable is available only in shell functions and external commands invoked by the programmable completion facilities (see [Programmable Completion](#86-可编程自动完成)).

  当前命令行。此变量仅在由可编程补全功能调用的 shell 函数和外部命令中可用（参见[可编程补全](#86-可编程自动完成)）。

- `COMP_POINT`

  The index of the current cursor position relative to the beginning of the current command. If the current cursor position is at the end of the current command, the value of this variable is equal to `${#COMP_LINE}`. This variable is available only in shell functions and external commands invoked by the programmable completion facilities (see [Programmable Completion](#86-可编程自动完成)).

  当前光标位置相对于当前命令开头的索引。如果当前光标位置位于当前命令的末尾，则该变量的值等于 `${#COMP_LINE}`。此变量仅在由可编程补全功能调用的 shell 函数和外部命令中可用（参见[可编程补全](#86-可编程自动完成)）。

- `COMP_TYPE`

  Set to an integer value corresponding to the type of completion attempted that caused a completion function to be called: `TAB`, for normal completion, `?`, for listing completions after successive tabs, `!`, for listing alternatives on partial word completion, `@`, to list completions if the word is not unmodified, or `%`, for menu completion. This variable is available only in shell functions and external commands invoked by the programmable completion facilities (see [Programmable Completion](#86-可编程自动完成)).

  设置为与尝试的补全类型对应的整数值，导致调用补全函数：`TAB` 表示正常补全，`?` 表示连续按制表符后的补全列表，`!` 表示部分单词补全时列出替代项，`@` 表示如果单词未被修改，则列出补全项，`%` 表示菜单补全。此变量仅在由可编程补全功能调用的 shell 函数和外部命令中可用（参见[可编程补全](#86-可编程自动完成)）。

- `COMP_KEY`

  The key (or final key of a key sequence) used to invoke the current completion function.

  用于调用当前补全函数的键（或键序列的最后一个键）。

- `COMP_WORDBREAKS`

  The set of characters that the Readline library treats as word separators when performing word completion. If `COMP_WORDBREAKS` is unset, it loses its special properties, even if it is subsequently reset.

  在执行单词补全时，Readline 库将其视为单词分隔符的字符集合。如果 `COMP_WORDBREAKS` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `COMP_WORDS`

  An array variable consisting of the individual words in the current command line. The line is split into words as Readline would split it, using `COMP_WORDBREAKS` as described above. This variable is available only in shell functions invoked by the programmable completion facilities (see [Programmable Completion](#86-可编程自动完成)).

  由当前命令行中的单词组成的数组变量。该行按照 Readline 的分割规则进行分割，使用 `COMP_WORDBREAKS` 如上所述。此变量仅在由可编程补全功能调用的 shell 函数中可用（参见[可编程补全](#86-可编程自动完成)）。

- `COMPREPLY`

  An array variable from which Bash reads the possible completions generated by a shell function invoked by the programmable completion facility (see [Programmable Completion](#86-可编程自动完成)). Each array element contains one possible completion.

  一个数组变量，Bash 从可编程补全功能调用的 shell 函数生成的可能补全选项中读取。每个数组元素包含一个可能的补全选项。

- `COPROC`

  An array variable created to hold the file descriptors for output from and input to an unnamed coprocess (see [Coprocesses](#326-协程-coprocesses)).

  一个数组变量，用于保存匿名协程的输出和输入的文件描述符（参见[协程](#326-协程-coprocesses)）。

- `DIRSTACK`

  An array variable containing the current contents of the directory stack. Directories appear in the stack in the order they are displayed by the `dirs` builtin. Assigning to members of this array variable may be used to modify directories already in the stack, but the `pushd` and `popd` builtins must be used to add and remove directories. Assignment to this variable will not change the current directory. If `DIRSTACK` is unset, it loses its special properties, even if it is subsequently reset.

  一个数组变量，包含目录栈的当前内容。目录按照 `dirs` 内置命令显示的顺序出现在栈中。可以对此数组变量的成员进行赋值以修改已在栈中的目录，但必须使用 `pushd` 和 `popd` 内置命令来添加和删除目录。对此变量的赋值不会改变当前目录。如果 `DIRSTACK` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `EMACS`

  If Bash finds this variable in the environment when the shell starts with value `t`, it assumes that the shell is running in an Emacs shell buffer and disables line editing.

  如果 Bash 在启动 shell 时在环境中找到此变量并且值为 `t`，它会假设 shell 在 Emacs shell 缓冲区中运行，并禁用行编辑。

- `ENV`

  Expanded and executed similarly to `BASH_ENV` (see [Bash Startup Files](#62-bash启动文件-bash-startup-files)) when an interactive shell is invoked in POSIX Mode (see [Bash POSIX Mode](#611-bash的posix模式)).

  当以 POSIX 模式调用交互式 shell 时，会展开并执行类似于 `BASH_ENV` 的变量（参见[Bash 启动文件](#62-bash启动文件-bash-startup-files)）。

- `EPOCHREALTIME`

  Each time this parameter is referenced, it expands to the number of seconds since the Unix Epoch as a floating point value with micro-second granularity (see the documentation for the C library function `time` for the definition of Epoch). Assignments to `EPOCHREALTIME` are ignored. If `EPOCHREALTIME` is unset, it loses its special properties, even if it is subsequently reset.

  每次引用此参数时，它会展开为自 Unix 纪元以来的秒数，以带有微秒精度的浮点值表示（有关纪元的定义，请参阅 C 库函数 `time` 的文档）。对 `EPOCHREALTIME` 的赋值将被忽略。如果 `EPOCHREALTIME` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `EPOCHSECONDS`

  Each time this parameter is referenced, it expands to the number of seconds since the Unix Epoch (see the documentation for the C library function `time` for the definition of Epoch). Assignments to `EPOCHSECONDS` are ignored. If `EPOCHSECONDS` is unset, it loses its special properties, even if it is subsequently reset.

  每次引用此参数时，它会展开为自 Unix 纪元以来的秒数（有关纪元的定义，请参阅 C 库函数 `time` 的文档）。对 `EPOCHSECONDS` 的赋值将被忽略。如果 `EPOCHSECONDS` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `EUID`

  The numeric effective user id of the current user. This variable is readonly.

  当前用户的有效用户 ID。此变量只读。

- `EXECIGNORE`

  A colon-separated list of shell patterns (see [Pattern Matching](#3581-模式匹配)) defining the list of filenames to be ignored by command search using `PATH`. Files whose full pathnames match one of these patterns are not considered executable files for the purposes of completion and command execution via `PATH` lookup. This does not affect the behavior of the `[`, `test`, and `[[` commands. Full pathnames in the command hash table are not subject to `EXECIGNORE`. Use this variable to ignore shared library files that have the executable bit set, but are not executable files. The pattern matching honors the setting of the `extglob` shell option.

  一个以冒号分隔的模式列表（参见[模式匹配](#3581-模式匹配)），定义在使用 `PATH` 进行命令搜索时要忽略的文件名列表。与这些模式的全路径名匹配的文件不会被视为可执行文件，因此不会用于补全和通过 `PATH` 查找执行命令。这不会影响 `[`、`test` 和 `[[` 命令的行为。命令哈希表中的完整路径名不受 `EXECIGNORE` 影响。可以使用此变量来忽略具有可执行位设置但不是可执行文件的共享库文件。模式匹配遵守 `extglob` shell 选项的设置。

- `FCEDIT`

  The editor used as a default by the -e option to the `fc` builtin command.

  由 `fc` 内置命令的 `-e` 选项使用的默认编辑器。

- `FIGNORE`

  A colon-separated list of suffixes to ignore when performing filename completion. A filename whose suffix matches one of the entries in `FIGNORE` is excluded from the list of matched filenames. A sample value is `.o:~`

  一个以冒号分隔的后缀列表，用于执行文件名补全时忽略的后缀。文件名的后缀与 `FIGNORE` 中的任何条目匹配，则会从匹配的文件名列表中排除。示例值为 `.o:~`。

- `FUNCNAME`

  An array variable containing the names of all shell functions currently in the execution call stack. The element with index 0 is the name of any currently-executing shell function. The bottom-most element (the one with the highest index) is `"main"`. This variable exists only when a shell function is executing. Assignments to `FUNCNAME` have no effect. If `FUNCNAME` is unset, it loses its special properties, even if it is subsequently reset.This variable can be used with `BASH_LINENO` and `BASH_SOURCE`. Each element of `FUNCNAME` has corresponding elements in `BASH_LINENO` and `BASH_SOURCE` to describe the call stack. For instance, `${FUNCNAME[$i]}` was called from the file `${BASH_SOURCE[$i+1]}` at line number `${BASH_LINENO[$i]}`. The `caller` builtin displays the current call stack using this information.

  一个数组变量，包含当前执行调用栈中所有 shell 函数的名称。索引为 0 的元素是当前正在执行的任何 shell 函数的名称。底部元素（最高索引的元素）是 `"main"`。此变量仅在执行 shell 函数时存在。对 `FUNCNAME` 的赋值没有效果。如果 `FUNCNAME` 未设置，则失去其特殊属性，即使随后重新设置也是如此。此变量可与 `BASH_LINENO` 和 `BASH_SOURCE` 配合使用。`FUNCNAME` 的每个元素与 `BASH_LINENO` 和 `BASH_SOURCE` 中的元素相对应，以描述调用栈。例如，`${FUNCNAME[$i]}` 是从文件 `${BASH_SOURCE[$i+1]}` 的行号 `${BASH_LINENO[$i]}` 处调用的。使用 `caller` 内置命令可以显示当前的调用栈信息。

- `FUNCNEST`

  If set to a numeric value greater than 0, defines a maximum function nesting level. Function invocations that exceed this nesting level will cause the current command to abort.

  如果设置为大于 0 的数值，则定义了最大函数嵌套级别。超过此嵌套级别的函数调用将导致当前命令终止。

- `GLOBIGNORE`

  A colon-separated list of patterns defining the set of file names to be ignored by filename expansion. If a file name matched by a filename expansion pattern also matches one of the patterns in `GLOBIGNORE`, it is removed from the list of matches. The pattern matching honors the setting of the `extglob` shell option.

  一个以冒号分隔的模式列表，定义了文件名展开时要忽略的文件名集合。如果文件名匹配文件名展开模式，并且还与 `GLOBIGNORE` 中的模式之一匹配，则它将从匹配列表中移除。模式匹配遵循 `extglob` shell 选项的设置。

- `GROUPS`

  An array variable containing the list of groups of which the current user is a member. Assignments to `GROUPS` have no effect. If `GROUPS` is unset, it loses its special properties, even if it is subsequently reset.

  一个数组变量，包含当前用户所属的组列表。对 `GROUPS` 的赋值没有效果。如果 `GROUPS` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `histchars`

  Up to three characters which control history expansion, quick substitution, and tokenization (see [History Expansion](#93-历史记录扩展)). The first character is the *history expansion* character, that is, the character which signifies the start of a history expansion, normally `!`. The second character is the character which signifies `quick substitution` when seen as the first character on a line, normally `^`. The optional third character is the character which indicates that the remainder of the line is a comment when found as the first character of a word, usually `#`. The history comment character causes history substitution to be skipped for the remaining words on the line. It does not necessarily cause the shell parser to treat the rest of the line as a comment.

  控制历史扩展、快速替换和标记化的字符（参见[历史交互](#93-历史记录扩展)）。第一个字符是*历史扩展*字符，即表示历史扩展开始的字符，通常为 `!`。第二个字符是*快速替换*字符，当作为行首的第一个字符出现时表示快速替换，通常为 `^`。可选的第三个字符是*注释*字符，当作为单词的第一个字符出现时表示该行的其余部分是注释，通常为 `#`。历史注释字符导致历史替换跳过该行上其余的单词。但不一定会导致 shell 解释器将该行其余部分视为注释。

- `HISTCMD`

  The history number, or index in the history list, of the current command. Assignments to `HISTCMD` are ignored. If `HISTCMD` is unset, it loses its special properties, even if it is subsequently reset.

  当前命令的历史编号或历史列表中的索引。对 `HISTCMD` 的赋值将被忽略。如果 `HISTCMD` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `HISTCONTROL`

  A colon-separated list of values controlling how commands are saved on the history list. If the list of values includes `ignorespace`, lines which begin with a space character are not saved in the history list. A value of `ignoredups` causes lines which match the previous history entry to not be saved. A value of `ignoreboth` is shorthand for `ignorespace` and `ignoredups`. A value of `erasedups` causes all previous lines matching the current line to be removed from the history list before that line is saved. Any value not in the above list is ignored. If `HISTCONTROL` is unset, or does not include a valid value, all lines read by the shell parser are saved on the history list, subject to the value of `HISTIGNORE`. The second and subsequent lines of a multi-line compound command are not tested, and are added to the history regardless of the value of `HISTCONTROL`.

  一个以冒号分隔的值列表，控制在历史列表中保存命令的方式。如果值列表中包含 `ignorespace`，则以空格字符开头的行不会被保存在历史列表中。值为 `ignoredups` 的行将不会保存与前一个历史项匹配的行。值为 `ignoreboth` 是 `ignorespace` 和 `ignoredups` 的简写。值为 `erasedups` 将在保存该行之前从历史列表中删除与当前行匹配的所有前一个行。不在上述列表中的任何值都将被忽略。如果 `HISTCONTROL` 未设置，或者不包含有效值，则 shell 解释器读取的所有行都会保存在历史列表中，但受 `HISTIGNORE` 值的影响。多行复合命令的第二行及后续行不受测试，不管 `HISTCONTROL` 的值如何，都会被添加到历史列表中。

- `HISTFILE`

  The name of the file to which the command history is saved. The default value is ~/.bash_history.

  命令历史记录保存的文件名。默认值为 `~/.bash_history`。

- `HISTFILESIZE`

  The maximum number of lines contained in the history file. When this variable is assigned a value, the history file is truncated, if necessary, to contain no more than that number of lines by removing the oldest entries. The history file is also truncated to this size after writing it when a shell exits. If the value is 0, the history file is truncated to zero size. Non-numeric values and numeric values less than zero inhibit truncation. The shell sets the default value to the value of `HISTSIZE` after reading any startup files.

  历史文件中包含的最大行数。当给该变量赋值后，历史文件会被截断，如果有必要，以包含不超过该行数的最旧条目。当 shell 退出时，历史文件也会被截断至该大小。如果值为 0，则历史文件被截断为零大小。非数值的值和小于零的数值会禁止截断。在读取任何启动文件后，shell 将默认值设置为 `HISTSIZE` 的值。

- `HISTIGNORE`

  A colon-separated list of patterns used to decide which command lines should be saved on the history list. Each pattern is anchored at the beginning of the line and must match the complete line (no implicit `*` is appended). Each pattern is tested against the line after the checks specified by `HISTCONTROL` are applied. In addition to the normal shell pattern matching characters, `&` matches the previous history line. `&` may be escaped using a backslash; the backslash is removed before attempting a match. The second and subsequent lines of a multi-line compound command are not tested, and are added to the history regardless of the value of `HISTIGNORE`. The pattern matching honors the setting of the `extglob` shell option.`HISTIGNORE` subsumes the function of `HISTCONTROL`. A pattern of `&` is identical to `ignoredups`, and a pattern of `[ ]*` is identical to `ignorespace`. Combining these two patterns, separating them with a colon, provides the functionality of `ignoreboth`.

  一个以冒号分隔的模式列表，用于决定哪些命令行应保存在历史列表中。每个模式都锚定在行首，并且必须与完整行匹配（不会自动附加隐式的 `*`）。在执行 `HISTCONTROL` 指定的检查后，每个模式都与行进行测试。除了常规 shell 模式匹配字符外，`&` 匹配前一个历史行。`&` 可以使用反斜杠进行转义；在尝试匹配之前将删除反斜杠。多行复合命令的第二行及后续行不受测试，不管 `HISTCONTROL` 的值如何，都会被添加到历史列表中。模式匹配遵循 `extglob` shell 选项的设置。`HISTIGNORE` 综合了 `HISTCONTROL` 的功能。`&` 模式与 `ignoredups` 相同，`[ ]*` 模式与 `ignorespace` 相同。将这两个模式组合起来，用冒号分隔，就提供了 `ignoreboth` 的功能。

- `HISTSIZE`

  The maximum number of commands to remember on the history list. If the value is 0, commands are not saved in the history list. Numeric values less than zero result in every command being saved on the history list (there is no limit). The shell sets the default value to 500 after reading any startup files.

  历史列表中要记住的命令的最大数量。如果值为 0，则命令不会保存在历史列表中。小于零的数值会导致每个命令都保存在历史列表中（没有限制）。在读取任何启动文件后，shell 将默认值设置为 500。

- `HISTTIMEFORMAT`

  If this variable is set and not null, its value is used as a format string for `strftime` to print the time stamp associated with each history entry displayed by the `history` builtin. If this variable is set, time stamps are written to the history file so they may be preserved across shell sessions. This uses the history comment character to distinguish timestamps from other history lines.

  如果设置并且不为空，其值将用作 `strftime` 的格式字符串，用于打印 `history` 内置命令显示的每个历史条目相关联的时间戳。如果设置了此变量，时间戳将写入历史文件，以便在不同的 shell 会话之间保留。这将使用历史注释字符来区分时间戳和其他历史行。

- `HOSTFILE`

  Contains the name of a file in the same format as /etc/hosts that should be read when the shell needs to complete a hostname. The list of possible hostname completions may be changed while the shell is running; the next time hostname completion is attempted after the value is changed, Bash adds the contents of the new file to the existing list. If `HOSTFILE` is set, but has no value, or does not name a readable file, Bash attempts to read /etc/hosts to obtain the list of possible hostname completions. When `HOSTFILE` is unset, the hostname list is cleared.

  包含与 /etc/hosts 格式相同的文件名，当 shell 需要完成主机名时，将读取该文件。在 shell 运行时，可能会更改可能的主机名完成列表；在更改值后，当尝试主机名完成时，Bash 将把新文件的内容添加到现有列表中。如果设置了 `HOSTFILE`，但没有值，或者没有命名可读取的文件，则 Bash 会尝试读取 /etc/hosts 以获取可能的主机名完成列表。当 `HOSTFILE` 未设置时，主机名列表会被清除。

- `HOSTNAME`

  The name of the current host.

  当前主机的名称。

- `HOSTTYPE`

  A string describing the machine Bash is running on.

  描述 Bash 所在计算机的字符串。

- `IGNOREEOF`

  Controls the action of the shell on receipt of an `EOF` character as the sole input. If set, the value denotes the number of consecutive `EOF` characters that can be read as the first character on an input line before the shell will exit. If the variable exists but does not have a numeric value, or has no value, then the default is 10. If the variable does not exist, then `EOF` signifies the end of input to the shell. This is only in effect for interactive shells.

  控制 shell 在仅接收到 `EOF` 字符作为唯一输入时的行为。如果设置，该值表示可以连续读取 `EOF` 字符的次数，而不会导致 shell 退出。如果该变量存在但没有数值，或者没有值，则默认值为 10。如果该变量不存在，则 `EOF` 表示 shell 输入的结束。这仅在交互式 shell 中生效。

- `INPUTRC`

  The name of the Readline initialization file, overriding the default of ~/.inputrc.

  Readline 初始化文件的名称，覆盖默认值 `~/.inputrc`。

- `INSIDE_EMACS`

  If Bash finds this variable in the environment when the shell starts, it assumes that the shell is running in an Emacs shell buffer and may disable line editing depending on the value of `TERM`.

  如果在 shell 启动时在环境中找到了此变量，Bash 将假定 shell 在 Emacs shell 缓冲区中运行，并根据 `TERM` 的值可能禁用行编辑。

- `LANG`

  Used to determine the locale category for any category not specifically selected with a variable starting with `LC_`.

  用于确定未使用以 `LC_` 开头的变量明确选择的任何类别的区域设置。

- `LC_ALL`

  This variable overrides the value of `LANG` and any other `LC_` variable specifying a locale category.

  此变量会覆盖 `LANG` 和任何指定区域设置类别的其他 `LC_` 变量的值。

- `LC_COLLATE`

  This variable determines the collation order used when sorting the results of filename expansion, and determines the behavior of range expressions, equivalence classes, and collating sequences within filename expansion and pattern matching (see [Filename Expansion](#358-文件名扩展)).

  此变量确定排序文件名展开结果时使用的排序顺序，并确定文件名展开和模式匹配中范围表达式、等价类和排序序列的行为（参见[文件名展开](#358-文件名扩展)）。

- `LC_CTYPE`

  This variable determines the interpretation of characters and the behavior of character classes within filename expansion and pattern matching (see [Filename Expansion](#358-文件名扩展)).

  此变量确定文件名展开和模式匹配中字符的解释和字符类的行为（参见[文件名展开](#358-文件名扩展)）。

- `LC_MESSAGES`

  This variable determines the locale used to translate double-quoted strings preceded by a `$` (see [Locale-Specific Translation](#3125-特定区域设置翻译-locale-specific-translation)).

  此变量确定用于翻译由 `$` 前缀的双引号括起来的字符串的区域设置（参见[区域设置特定的翻译](#3125-特定区域设置翻译-locale-specific-translation)）。

- `LC_NUMERIC`

  This variable determines the locale category used for number formatting.

  此变量确定用于数字格式化的区域设置类别。

- `LC_TIME`

  This variable determines the locale category used for data and time formatting.

  此变量确定用于日期和时间格式化的区域设置类别。

- `LINENO`

  The line number in the script or shell function currently executing. If `LINENO` is unset, it loses its special properties, even if it is subsequently reset.

  当前执行的脚本或 shell 函数中的行号。如果 `LINENO` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `LINES`

  Used by the `select` command to determine the column length for printing selection lists. Automatically set if the `checkwinsize` option is enabled (see [The Shopt Builtin](#432--shopt内置命令)), or in an interactive shell upon receipt of a `SIGWINCH`.

  `select` 命令使用此变量来确定打印选择列表的列长度。如果启用了 `checkwinsize` 选项（参见[Shopt 内置命令](#432--shopt内置命令)），或者在交互式 shell 中收到 `SIGWINCH` 信号时，将自动设置该值。

- `MACHTYPE`

  A string that fully describes the system type on which Bash is executing, in the standard GNU cpu-company-system format.

  一个字符串，完整描述了 Bash 所在系统类型，采用标准 GNU cpu-company-system 格式。

- `MAILCHECK`

  How often (in seconds) that the shell should check for mail in the files specified in the `MAILPATH` or `MAIL` variables. The default is 60 seconds. When it is time to check for mail, the shell does so before displaying the primary prompt. If this variable is unset, or set to a value that is not a number greater than or equal to zero, the shell disables mail checking.

  shell 检查在 `MAILPATH` 或 `MAIL` 变量指定的文件中是否有新邮件的频率（以秒为单位）。默认值为 60 秒。在检查邮件的时间到达之前，shell 会在显示主提示符之前进行检查。如果该变量未设置，或者设置为不大于零的非数值，shell 将禁用邮件检查。

- `MAPFILE`

  An array variable created to hold the text read by the `mapfile` builtin when no variable name is supplied.

  一个数组变量，当 `mapfile` 内置命令没有提供变量名称时，用于保存读取的文本。

- `OLDPWD`

  The previous working directory as set by the `cd` builtin.

  上一个工作目录，由 `cd` 内置命令设置。

- `OPTERR`

  If set to the value 1, Bash displays error messages generated by the `getopts` builtin command.

  如果设置为值 1，Bash 会显示由 `getopts` 内置命令生成的错误消息。

- `OSTYPE`

  A string describing the operating system Bash is running on.

  一个字符串，描述 Bash 所运行的操作系统。

- `PIPESTATUS`

  An array variable (see [Arrays](#67-数组)) containing a list of exit status values from the processes in the most-recently-executed foreground pipeline (which may contain only a single command).

  一个数组变量（参见[数组](#67-数组)），包含最近执行的前台管道中（可能仅包含一个命令）进程的退出状态值列表。

- `POSIXLY_CORRECT`

  If this variable is in the environment when Bash starts, the shell enters POSIX mode (see [Bash POSIX Mode](#611-bash的posix模式)) before reading the startup files, as if the --posix invocation option had been supplied. If it is set while the shell is running, Bash enables POSIX mode, as if the command

  ```sh
  set -o posix
  ```

  had been executed. When the shell enters POSIX mode, it sets this variable if it was not already set.

  如果在 Bash 启动时环境中存在此变量，shell 会在读取启动文件之前进入 POSIX 模式（参见[Bash POSIX 模式](#611-bash的posix模式)），就像已经提供了 `--posix` 命令选项一样。如果在 shell 运行时设置了该变量，Bash 会启用 POSIX 模式，就像执行了命令 

  ```sh
  set -o posix
  ```

   一样。当 shell 进入 POSIX 模式时，如果尚未设置该变量，它会将此变量设置为已设置状态。

- `PPID`

  The process ID of the shell's parent process. This variable is readonly.

  shell 的父进程的进程 ID。此变量只读。

- `PROMPT_COMMAND`

  If this variable is set, and is an array, the value of each set element is interpreted as a command to execute before printing the primary prompt (`$PS1`). If this is set but not an array variable, its value is used as a command to execute instead.

  如果此变量被设置并且是一个数组，每个元素的值将被解释为在打印主提示符（`$PS1`）之前执行的命令。如果设置了该变量，但它不是一个数组变量，则其值将被用作替代执行的命令。

- `PROMPT_DIRTRIM`

  If set to a number greater than zero, the value is used as the number of trailing directory components to retain when expanding the `\w` and `\W` prompt string escapes (see [Controlling the Prompt](#69-控制提示符)). Characters removed are replaced with an ellipsis.

  如果设置为大于零的数值，该值将用作在扩展 `\w` 和 `\W` 提示字符串转义时要保留的尾部目录组件的数量（参见[控制提示符](#69-控制提示符)）。删除的字符将用省略号替换。

- `PS0`

  The value of this parameter is expanded like `PS1` and displayed by interactive shells after reading a command and before the command is executed.

  此参数的值会像 `PS1` 一样扩展，并在交互式 shell 读取命令后、命令执行之前显示。

- `PS3`

  The value of this variable is used as the prompt for the `select` command. If this variable is not set, the `select` command prompts with `#? `

  此变量的值将用作 `select` 命令的提示符。如果未设置此变量，`select` 命令会提示 `#?`

- `PS4`

  The value of this parameter is expanded like `PS1` and the expanded value is the prompt printed before the command line is echoed when the -x option is set (see [The Set Builtin](#431-内置命令set)). The first character of the expanded value is replicated multiple times, as necessary, to indicate multiple levels of indirection. The default is `+ `.

  此参数的值会像 `PS1` 一样扩展，扩展后的值是在设置 -x 选项时（参见[set 内置命令](#431-内置命令set)）在命令行回显之前打印的提示。扩展值的第一个字符会根据需要复制多次，以指示多个间接层级。默认值为 `+ `。

- `PWD`

  The current working directory as set by the `cd` builtin.

  当前的工作目录，由 `cd` 内置命令设置。

- `RANDOM`

  Each time this parameter is referenced, it expands to a random integer between 0 and 32767. Assigning a value to this variable seeds the random number generator. If `RANDOM` is unset, it loses its special properties, even if it is subsequently reset.

  每次引用此参数时，它会扩展为一个介于 0 和 32767 之间的随机整数。给此变量赋值将种子化随机数生成器。如果 `RANDOM` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `READLINE_ARGUMENT`

  Any numeric argument given to a Readline command that was defined using `bind -x` (see [Bash Builtin Commands](#42-bash-内置命令) when it was invoked.

  给使用 `bind -x` 定义的 Readline 命令传递的任何数值参数（参见[Bash 内置命令](#42-bash-内置命令)中的 `bind`）。

- `READLINE_LINE`

  The contents of the Readline line buffer, for use with `bind -x` (see [Bash Builtin Commands](#42-bash-内置命令)).

  Readline 行缓冲区的内容，供 `bind -x` 使用（参见[Bash 内置命令](#42-bash-内置命令)中的 `bind`）。

- `READLINE_MARK`

  The position of the *mark* (saved insertion point) in the Readline line buffer, for use with `bind -x` (see [Bash Builtin Commands](#42-bash-内置命令)). The characters between the insertion point and the mark are often called the *region*.

  Readline 行缓冲区中 *标记*（保存的插入点）的位置，供 `bind -x` 使用（参见[Bash 内置命令](#42-bash-内置命令)中的 `bind`）。插入点和标记之间的字符通常称为*区域*。

- `READLINE_POINT`

  The position of the insertion point in the Readline line buffer, for use with `bind -x` (see [Bash Builtin Commands](#42-bash-内置命令)).

  Readline 行缓冲区中插入点的位置，供 `bind -x` 使用（参见[Bash 内置命令](#42-bash-内置命令)中的 `bind`）。

- `REPLY`

  The default variable for the `read` builtin.

  `read` 内置命令的默认变量。

- `SECONDS`

  This variable expands to the number of seconds since the shell was started. Assignment to this variable resets the count to the value assigned, and the expanded value becomes the value assigned plus the number of seconds since the assignment. The number of seconds at shell invocation and the current time are always determined by querying the system clock. If `SECONDS` is unset, it loses its special properties, even if it is subsequently reset.

  此变量扩展为自 shell 启动以来经过的秒数。对此变量的赋值会将计数重置为赋值的值，并且扩展值变为赋值的值加上赋值后经过的秒数。在 shell 启动时的秒数和当前时间始终是通过查询系统时钟来确定的。如果 `SECONDS` 未设置，它会失去其特殊属性，即使随后重新设置也是如此。

- `SHELL`

  This environment variable expands to the full pathname to the shell. If it is not set when the shell starts, Bash assigns to it the full pathname of the current user's login shell.

  此环境变量扩展为 shell 的完整路径名。如果在 shell 启动时没有设置它，Bash 会将当前用户的登录 shell 的完整路径名赋给它。

- `SHELLOPTS`

  A colon-separated list of enabled shell options. Each word in the list is a valid argument for the -o option to the `set` builtin command (see [The Set Builtin](#431-内置命令set)). The options appearing in `SHELLOPTS` are those reported as `on` by `set -o`. If this variable is in the environment when Bash starts up, each shell option in the list will be enabled before reading any startup files. This variable is readonly.

  一个以冒号分隔的启用的 shell 选项列表。列表中的每个单词都是 `set` 内置命令的 `-o` 选项的有效参数（参见[set 内置命令](#431-内置命令set)）。`SHELLOPTS` 中出现的选项是由 `set -o` 报告为 `on` 的选项。如果在 Bash 启动时环境中存在此变量，将在读取任何启动文件之前启用列表中的每个 shell 选项。此变量只读。

- `SHLVL`

  Incremented by one each time a new instance of Bash is started. This is intended to be a count of how deeply your Bash shells are nested.

  每次启动新的 Bash 实例时递增一次。这用于计算你的 Bash shell 嵌套深度的计数。

- `SRANDOM`

  This variable expands to a 32-bit pseudo-random number each time it is referenced. The random number generator is not linear on systems that support /dev/urandom or `arc4random`, so each returned number has no relationship to the numbers preceding it. The random number generator cannot be seeded, so assignments to this variable have no effect. If `SRANDOM` is unset, it loses its special properties, even if it is subsequently reset.

  每次引用此参数时，它会扩展为一个 32 位的伪随机数。在支持 /dev/urandom 或 `arc4random` 的系统上，随机数生成器是非线性的，因此返回的每个数与其前面的数没有任何关系。随机数生成器无法种子化，因此对此变量的赋值无效。如果 `SRANDOM` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `TIMEFORMAT`

  The value of this parameter is used as a format string specifying how the timing information for pipelines prefixed with the `time` reserved word should be displayed. The `%` character introduces an escape sequence that is expanded to a time value or other information. The escape sequences and their meanings are as follows; the braces denote optional portions.`%%`A literal `%`.`%[p][l]R`The elapsed time in seconds.`%[p][l]U`The number of CPU seconds spent in user mode.`%[p][l]S`The number of CPU seconds spent in system mode.`%P`The CPU percentage, computed as (%U + %S) / %R.The optional p is a digit specifying the precision, the number of fractional digits after a decimal point. A value of 0 causes no decimal point or fraction to be output. At most three places after the decimal point may be specified; values of p greater than 3 are changed to 3. If p is not specified, the value 3 is used.The optional `l` specifies a longer format, including minutes, of the form MMmSS.FFs. The value of p determines whether or not the fraction is included.If this variable is not set, Bash acts as if it had the value

  ```sh
  $'\nreal\t%3lR\nuser\t%3lU\nsys\t%3lS'
  ```

  If the value is null, no timing information is displayed. A trailing newline is added when the format string is displayed.

  此参数的值用作格式字符串，指定前缀带有 `time` 保留字的管道的定时信息应如何显示。`%` 字符引入一个转义序列，该序列会扩展为时间值或其他信息。转义序列及其含义如下；大括号表示可选部分。`%%` 一个字面 `%`。`%[p][l]R` 经过的秒数。`%[p][l]U` 用户模式下的 CPU 秒数。`%[p][l]S` 系统模式下的 CPU 秒数。`%P` CPU 百分比，计算方式为 (%U + %S) / %R。可选的 `p` 是指定精度的数字，小数点后的小数位数。值为 0 时不输出小数点或小数位。最多可以指定三位小数点后的数字；大于 3 的 p 值会被更改为 3。如果未指定 p，则使用值 3。可选的 `l` 指定较长的格式，包括分钟，格式为 MMmSS.FFs。p 的值决定是否包含小数部分。如果未设置此变量，Bash 表现得好像它的值为 

  ```sh
  $'\nreal\t%3lR\nuser\t%3lU\nsys\t%3lS'
  ```

  。如果该值为 null，则不显示定时信息。在显示格式字符串时，会添加尾随换行符。

- `TMOUT`

  If set to a value greater than zero, `TMOUT` is treated as the default timeout for the `read` builtin (see [Bash Builtin Commands](#42-bash-内置命令)). The `select` command (see [Conditional Constructs](#3252-条件结构)) terminates if input does not arrive after `TMOUT` seconds when input is coming from a terminal.In an interactive shell, the value is interpreted as the number of seconds to wait for a line of input after issuing the primary prompt. Bash terminates after waiting for that number of seconds if a complete line of input does not arrive.

  如果设置为大于零的值，`TMOUT` 会被视为 `read` 内置命令（参见[Bash 内置命令](#42-bash-内置命令)）的默认超时时间。当输入来自终端时，如果 `TMOUT` 秒内没有输入，`select` 命令（参见[条件结构](#3252-条件结构)）将终止。在交互式 shell 中，该值被解释为发出主提示符后等待输入行的秒数。如果在那段时间内没有完整的输入行，Bash 会终止。

- `TMPDIR`

  If set, Bash uses its value as the name of a directory in which Bash creates temporary files for the shell's use.

  如果设置了，Bash 将使用其值作为目录的名称，在该目录中创建供 shell 使用的临时文件。

- `UID`

  The numeric real user id of the current user. This variable is readonly.
  
  当前用户的实际用户 ID。此变量只读。





## 6 Bash 特性

This chapter describes features unique to Bash.

​	本章介绍Bash独有的特性




### 6.1 调用Bash

```
bash [long-opt] [-ir] [-abefhkmnptuvxdBCDHP] [-o option]
    [-O shopt_option] [argument …]
bash [long-opt] [-abefhkmnptuvxdBCDHP] [-o option]
    [-O shopt_option] -c string [argument …]
bash [long-opt] -s [-abefhkmnptuvxdBCDHP] [-o option]
    [-O shopt_option] [argument …]
```

All of the single-character options used with the `set` builtin (see [The Set Builtin](#431-内置命令set)) can be used as options when the shell is invoked. In addition, there are several multi-character options that you can use. These options must appear on the command line before the single-character options to be recognized.

​	调用shell时，可以使用所有与`set`内置命令（参见[set内置命令](#431-内置命令set)）一起使用的单字符选项作为选项。此外，还有一些多字符选项可供使用。这些选项必须出现在命令行中，在单字符选项之前才能被识别。

- `--debugger`

  Arrange for the debugger profile to be executed before the shell starts. Turns on extended debugging mode (see [The Shopt Builtin](#432--shopt内置命令) for a description of the `extdebug` option to the `shopt` builtin).

  ​	安排在shell启动之前执行调试器配置文件。启用扩展调试模式（请参阅[The Shopt Builtin](#432--shopt内置命令)以了解`shopt`内置命令的`extdebug`选项的描述）。  

- `--dump-po-strings`

  A list of all double-quoted strings preceded by `$` is printed on the standard output in the GNU `gettext` PO (portable object) file format. Equivalent to -D except for the output format.

  ​	将所有由`$`前缀的双引号括起来的字符串以GNU `gettext` PO（便携式对象）文件格式打印到标准输出。与-D相当，除了输出格式。

- `--dump-strings`

  Equivalent to -D.

  等同于-D。

- `--help`

  Display a usage message on standard output and exit successfully.

  ​	在标准输出上显示用法信息并成功退出。

- `--init-file filename`

- `--rcfile filename`

  Execute commands from filename (instead of ~/.bashrc) in an interactive shell.

  ​	在交互式shell中执行来自文件名的命令（而不是`~/.bashrc`）。

- `--login`

  Equivalent to `-l`.

  等同于`-l`。

- `--noediting`

  Do not use the GNU Readline library (see [Command Line Editing](#8-命令行编辑)) to read command lines when the shell is interactive.

  当shell为交互式时，不使用GNU Readline库（参见[命令行编辑](#8-命令行编辑)）读取命令行。

- `--noprofile`

  Don't load the system-wide startup file /etc/profile or any of the personal initialization files `~/.bash_profile`, `~/.bash_login`, or `~/.profile` when Bash is invoked as a login shell.

  当Bash作为登录shell被调用时，不加载系统范围的启动文件/etc/profile或任何个人初始化文件`~/.bash_profile`，`~/.bash_login`或`~/.profile`。

- `--norc`

  Don't read the ~/.bashrc initialization file in an interactive shell. This is on by default if the shell is invoked as `sh`.

  在交互式shell中不读取~/.bashrc初始化文件。如果以`sh`命令调用shell，则默认启用此选项。

- `--posix`

  Change the behavior of Bash where the default operation differs from the POSIX standard to match the standard. This is intended to make Bash behave as a strict superset of that standard. See [Bash POSIX Mode](#611-bash的posix模式), for a description of the Bash POSIX mode.

  将Bash的行为更改为与POSIX标准不同的默认操作以匹配标准。这旨在使Bash的行为成为该标准的严格超集。有关Bash POSIX模式的描述，请参见[Bash POSIX模式](#611-bash的posix模式)。

- `--restricted`

  Make the shell a restricted shell (see [The Restricted Shell](#610-受限制的shell)).

  将shell设为受限shell（参见[受限shell](#610-受限制的shell)）。

- `--verbose`

  Equivalent to `-v`. Print shell input lines as they`re read.

  等同于`-v`。在读取时将shell输入行打印出来。

- `--version`

  Show version information for this instance of Bash on the standard output and exit successfully.
  
  在标准输出上显示此Bash实例的版本信息，并成功退出。

There are several single-character options that may be supplied at invocation which are not available with the `set` builtin.

​	在调用时可能提供的几个单字符选项在`set`内置命令中不可用。

- `-c`

  Read and execute commands from the first non-option argument command_string, then exit. If there are arguments after the command_string, the first argument is assigned to `$0` and any remaining arguments are assigned to the positional parameters. The assignment to `$0` sets the name of the shell, which is used in warning and error messages.

  从第一个非选项参数command_string中读取并执行命令，然后退出。如果命令字符串之后还有参数，则将第一个参数赋给`$0`，并将其余参数赋给位置参数。对`$0`的赋值设置了shell的名称，用于警告和错误消息。

- `-i`

  Force the shell to run interactively. Interactive shells are described in [Interactive Shells](#63-交互式shell).

  强制shell以交互方式运行。有关交互式shell的描述，请参见[交互式shell](#63-交互式shell)。

- `-l`

  Make this shell act as if it had been directly invoked by login. When the shell is interactive, this is equivalent to starting a login shell with `exec -l bash`. When the shell is not interactive, the login shell startup files will be executed. `exec bash -l` or `exec bash --login` will replace the current shell with a Bash login shell. See [Bash Startup Files](#62-bash启动文件-bash-startup-files), for a description of the special behavior of a login shell.

  使此shell的行为就像直接通过login启动它一样。当shell是交互式的时，这等同于以`exec -l bash`启动登录shell。当shell不是交互式的时，将执行登录shell的启动文件。`exec bash -l`或`exec bash --login`将用Bash登录shell替换当前shell。有关登录shell的特殊行为的描述，请参见[Bash启动文件](#62-bash启动文件-bash-startup-files)。

- `-r`

  Make the shell a restricted shell (see [The Restricted Shell](#610-受限制的shell)).

  将shell设为受限shell（参见[受限shell](#610-受限制的shell)）。

- `-s`

  If this option is present, or if no arguments remain after option processing, then commands are read from the standard input. This option allows the positional parameters to be set when invoking an interactive shell or when reading input through a pipe.

  如果存在此选项，或者在选项处理之后没有剩余参数，则从标准输入读取命令。此选项允许在调用交互式shell或通过管道读取输入时设置位置参数。

- `-D`

  A list of all double-quoted strings preceded by `$` is printed on the standard output. These are the strings that are subject to language translation when the current locale is not `C` or `POSIX` (see [Locale-Specific Translation](#3125-特定区域设置翻译-locale-specific-translation)). This implies the -n option; no commands will be executed.

  将所有由`$`前缀的双引号括起来的字符串打印到标准输出。这些是在当前区域设置不是`C`或`POSIX`（参见[区域特定的转换](#3125-特定区域设置翻译-locale-specific-translation)）的情况下可能会进行语言转换的字符串。这意味着-n选项；不会执行任何命令。

- `[-+]O [shopt_option]`

  shopt_option is one of the shell options accepted by the `shopt` builtin (see [The Shopt Builtin](#432--shopt内置命令)). If shopt_option is present, -O sets the value of that option; +O unsets it. If shopt_option is not supplied, the names and values of the shell options accepted by `shopt` are printed on the standard output. If the invocation option is +O, the output is displayed in a format that may be reused as input.

  shopt_option是`shopt`内置命令接受的shell选项之一（参见[shopt内置命令](#432--shopt内置命令)）。如果提供了shopt_option，则`-O`设置该选项的值；`+O`取消设置它。如果没有提供shopt_option，则在标准输出上打印`shopt`接受的shell选项的名称和值。如果调用选项为`+O`，则输出以可重用为输入的格式显示。

- `--`

  A `--` signals the end of options and disables further option processing. Any arguments after the `--` are treated as filenames and arguments.
  
  `--`表示选项的结束，并禁用进一步的选项处理。`--`之后的任何参数都被视为文件名和参数。



A *login* shell is one whose first character of argument zero is `-`, or one invoked with the --login option.

*登录shell* 是其参数零的第一个字符为`-`的shell，或者是使用--login选项调用的shell。



An *interactive* shell is one started without non-option arguments, unless -s is specified, without specifying the -c option, and whose input and output are both connected to terminals (as determined by `isatty(3)`), or one started with the -i option. See [Interactive Shells](#63-交互式shell), for more information.

*交互式shell* 是没有非选项参数启动的shell，除非指定了-s选项，并且没有指定-c选项，并且其输入和输出都连接到终端（由`isatty(3)`确定），或者是使用-i选项启动的shell。有关更多信息，请参见[交互式shell](#63-交互式shell)。

If arguments remain after option processing, and neither the -c nor the -s option has been supplied, the first argument is assumed to be the name of a file containing shell commands (see [Shell Scripts](#38-shell-脚本)). When Bash is invoked in this fashion, `$0` is set to the name of the file, and the positional parameters are set to the remaining arguments. Bash reads and executes commands from this file, then exits. Bash's exit status is the exit status of the last command executed in the script. If no commands are executed, the exit status is 0.

​	如果选项处理后还有参数，并且未提供`-c`或`-s`选项，则假定第一个参数是包含shell命令的文件的名称（参见[Shell脚本](#38-shell-脚本)）。以这种方式调用Bash时，`$0`被设置为文件的名称，并将位置参数设置为剩余的参数。Bash从该文件读取并执行命令，然后退出。Bash的退出状态是在脚本中执行的最后一个命令的退出状态。如果未执行任何命令，则退出状态为0。





### 6.2 Bash启动文件 Bash Startup Files



This section describes how Bash executes its startup files. If any of the files exist but cannot be read, Bash reports an error. Tildes are expanded in filenames as described above under Tilde Expansion (see [Tilde Expansion](#352-波浪号扩展)).

​	本节描述Bash如何执行其启动文件。如果任何文件存在但无法读取，Bash将报告错误。文件名中的波浪号将根据上面的"波浪号展开"（参见[Tilde Expansion](#352-波浪号扩展)）的描述进行展开。

Interactive shells are described in [Interactive Shells](#63-交互式shell).

​	交互式shell的详细描述请参见[交互式shell](#63-交互式shell)。



#### 作为交互式登录shell调用，或使用--login选项

When Bash is invoked as an interactive login shell, or as a non-interactive shell with the --login option, it first reads and executes commands from the file /etc/profile, if that file exists. After reading that file, it looks for `~/.bash_profile`, `~/.bash_login`, and `~/.profile,` in that order, and reads and executes commands from the first one that exists and is readable. The --noprofile option may be used when the shell is started to inhibit this behavior.

​	当Bash作为交互式登录shell被调用，或作为使用`--login`选项的非交互式shell被调用时，它首先从文件`/etc/profile`中读取并执行命令（如果该文件存在）。读取完该文件后，它会查找`~/.bash_profile`、`~/.bash_login`和`~/.profile`文件，按顺序读取并执行第一个存在且可读的文件。可以在启动shell时使用`--noprofile`选项来阻止这种行为。

When an interactive login shell exits, or a non-interactive login shell executes the `exit` builtin command, Bash reads and executes commands from the file ~/.bash_logout, if it exists.

​	当交互式登录shell退出，或者非交互式登录shell执行`exit`内置命令时，如果文件`~/.bash_logout`存在，Bash将从该文件读取并执行命令。



#### 作为交互式非登录shell调用

When an interactive shell that is not a login shell is started, Bash reads and executes commands from ~/.bashrc, if that file exists. This may be inhibited by using the --norc option. The --rcfile file option will force Bash to read and execute commands from file instead of ~/.bashrc.

​	当启动交互式shell但不是登录shell时，Bash从`~/.bashrc`文件中读取并执行命令（如果该文件存在）。可以使用`--norc`选项来阻止这一行为。`--rcfile`选项将强制Bash从指定的文件而不是`~/.bashrc`读取并执行命令。

So, typically, your `~/.bash_profile` contains the line

​	因此，通常你的`~/.bash_profile`包含以下行：

```
if [ -f ~/.bashrc ]; then . ~/.bashrc; fi
```

after (or before) any login-specific initializations.

在（或之前）任何特定于登录的初始化之后



#### 非交互式调用

When Bash is started non-interactively, to run a shell script, for example, it looks for the variable `BASH_ENV` in the environment, expands its value if it appears there, and uses the expanded value as the name of a file to read and execute. Bash behaves as if the following command were executed:

​	当以非交互方式启动Bash，例如运行一个shell脚本时，它会在环境中查找变量`BASH_ENV`，如果存在该变量，则展开其值，并将展开的值用作要读取和执行的文件名。Bash的行为就像执行了以下命令：

```
if [ -n "$BASH_ENV" ]; then . "$BASH_ENV"; fi
```

but the value of the `PATH` variable is not used to search for the filename.

但不使用`PATH`变量搜索文件名。

As noted above, if a non-interactive shell is invoked with the --login option, Bash attempts to read and execute commands from the login shell startup files.

​	正如上面提到的，如果以`--login`选项调用非交互shell，Bash会尝试从登录shell的启动文件中读取并执行命令。

#### 使用名称`sh`调用

If Bash is invoked with the name `sh`, it tries to mimic the startup behavior of historical versions of `sh` as closely as possible, while conforming to the POSIX standard as well.

​	如果使用名称`sh`调用Bash，则尽量模仿历史版本的`sh`的启动行为，同时也符合POSIX标准。

When invoked as an interactive login shell, or as a non-interactive shell with the --login option, it first attempts to read and execute commands from /etc/profile and ~/.profile, in that order. The --noprofile option may be used to inhibit this behavior. When invoked as an interactive shell with the name `sh`, Bash looks for the variable `ENV`, expands its value if it is defined, and uses the expanded value as the name of a file to read and execute. Since a shell invoked as `sh` does not attempt to read and execute commands from any other startup files, the --rcfile option has no effect. A non-interactive shell invoked with the name `sh` does not attempt to read any other startup files.

​	当作为交互式登录shell，或作为使用`--login`选项的非交互式shell调用时，它首先尝试从`/etc/profile`和`~/.profile`文件中读取并执行命令，按照这个顺序。可以使用--noprofile选项来阻止这种行为。当以`sh`的名称作为交互式shell调用时，Bash会查找变量`ENV`，如果定义了该变量，则展开其值，并将展开的值用作要读取和执行的文件名。由于以`sh`的名称调用的shell不尝试从任何其他启动文件中读取和执行命令，因此--rcfile选项无效。以`sh`的名称调用的非交互式shell不会尝试读取任何其他启动文件。

When invoked as `sh`, Bash enters POSIX mode after the startup files are read.

​	当以`sh`的名称调用时，Bash在读取启动文件后进入POSIX模式。



#### 在POSIX模式下调用

When Bash is started in POSIX mode, as with the --posix command line option, it follows the POSIX standard for startup files. In this mode, interactive shells expand the `ENV` variable and commands are read and executed from the file whose name is the expanded value. No other startup files are read.

​	当使用`--posix`命令行选项启动Bash时，它遵循POSIX标准的启动文件规则。在此模式下，交互式shell展开`ENV`变量，并从文件中读取和执行命令，文件名为展开后的值。不读取其他任何启动文件。



#### 被远程shell守护进程调用

Bash attempts to determine when it is being run with its standard input connected to a network connection, as when executed by the historical remote shell daemon, usually `rshd`, or the secure shell daemon `sshd`. If Bash determines it is being run non-interactively in this fashion, it reads and executes commands from ~/.bashrc, if that file exists and is readable. It will not do this if invoked as `sh`. The --norc option may be used to inhibit this behavior, and the --rcfile option may be used to force another file to be read, but neither `rshd` nor `sshd` generally invoke the shell with those options or allow them to be specified.

​	Bash试图确定它是否在非交互式模式下运行，例如由历史远程shell守护进程（通常是`rshd`）或安全shell守护进程`sshd`执行时，其标准输入连接到网络连接。如果Bash确定以这种方式在非交互模式下运行，它会从`~/.bashrc`文件中读取并执行命令（如果该文件存在且可读）。如果以`sh`的名称调用，则不会执行此操作。可以使用--norc选项来阻止此行为，`--rcfile`选项可用于强制读取另一个文件，但通常`rshd`和`sshd`不会以这些选项调用shell或允许指定它们。



#### 使用不相等的有效和真实UID/GID调用 Invoked with unequal effective and real UID/GIDs

If Bash is started with the effective user (group) id not equal to the real user (group) id, and the -p option is not supplied, no startup files are read, shell functions are not inherited from the environment, the `SHELLOPTS`, `BASHOPTS`, `CDPATH`, and `GLOBIGNORE` variables, if they appear in the environment, are ignored, and the effective user id is set to the real user id. If the -p option is supplied at invocation, the startup behavior is the same, but the effective user id is not reset.

​	如果Bash以有效用户（组）ID不等于真实用户（组）ID的状态启动，并且未提供-p选项，则不读取启动文件，不继承环境中的shell函数，忽略`SHELLOPTS`、`BASHOPTS`、`CDPATH`和`GLOBIGNORE`变量（如果它们在环境中出现），并将有效用户ID设置为真实用户ID。如果在调用时提供了-p选项，则启动行为相同，但不会重置有效用户ID。



### 6.3 交互式Shell

#### 6.3.1 什么是交互式Shell？

An interactive shell is one started without non-option arguments (unless -s is specified) and without specifying the -c option, whose input and error output are both connected to terminals (as determined by `isatty(3)`), or one started with the -i option.

​	交互式Shell是指在没有非选项参数的情况下启动的Shell（除非使用了`-s`选项），且没有使用`-c`选项，并且其输入和错误输出都连接到终端（通过`isatty(3)`确定），或者使用了`-i`选项启动的Shell。

An interactive shell generally reads from and writes to a user's terminal.

​	交互式Shell通常从用户的终端读取并输出信息。

The -s invocation option may be used to set the positional parameters when an interactive shell is started.

​	可以使用`-s`选项来设置交互式Shell启动时的位置参数。





#### 6.3.2 此Shell是否为交互式？

To determine within a startup script whether or not Bash is running interactively, test the value of the `-` special parameter. It contains `i` when the shell is interactive. For example:

​	在启动脚本中，要确定Bash是否以交互式方式运行，可以测试特殊参数`-`的值。当Shell是交互式时，该参数包含字符`i`。例如：

```
case "$-" in
*i*)	echo This shell is interactive ;;
*)	echo This shell is not interactive ;;
esac
```

Alternatively, startup scripts may examine the variable `PS1`; it is unset in non-interactive shells, and set in interactive shells. Thus:

​	或者，启动脚本可以检查变量`PS1`的值；在非交互式Shell中，该变量未设置，在交互式Shell中设置了该变量。因此：

```
if [ -z "$PS1" ]; then
        echo This shell is not interactive
else
        echo This shell is interactive
fi
```





#### 6.3.3 交互式Shell行为

When the shell is running interactively, it changes its behavior in several ways.

​	当Shell以交互式方式运行时，它的行为发生变化。

1. Startup files are read and executed as described in [Bash Startup Files](#62-bash启动文件-bash-startup-files).
2. 启动文件按照[Bash启动文件](#62-bash启动文件-bash-startup-files)中描述的方式被读取和执行。
3. Job Control (see [Job Control](#7-作业控制)) is enabled by default. When job control is in effect, Bash ignores the keyboard-generated job control signals `SIGTTIN`, `SIGTTOU`, and `SIGTSTP`.
4. 作业控制（参见[作业控制](#7-作业控制)）默认启用。当作业控制生效时，Bash忽略键盘生成的作业控制信号`SIGTTIN`、`SIGTTOU`和`SIGTSTP`。
5. Bash expands and displays `PS1` before reading the first line of a command, and expands and displays `PS2` before reading the second and subsequent lines of a multi-line command. Bash expands and displays `PS0` after it reads a command but before executing it. See [Controlling the Prompt](#69-控制提示符), for a complete list of prompt string escape sequences.
6. Bash在读取命令的第一行之前，扩展和显示`PS1`，在读取多行命令的第二行及其后续行之前，扩展和显示`PS2`。Bash在读取命令后但在执行之前，扩展和显示`PS0`。完整的提示字符串转义序列列表请参见[控制提示符](#69-控制提示符)。
7. Bash executes the values of the set elements of the `PROMPT_COMMAND` array variable as commands before printing the primary prompt, `$PS1` (see [Bash Variables](#52-bash-变量)).
8. Bash在打印主提示符`$PS1`之前，执行`PROMPT_COMMAND`数组变量的所有set元素的值作为命令（参见[Bash变量](#52-bash-变量)）。
9. Readline (see [Command Line Editing](#8-命令行编辑)) is used to read commands from the user's terminal.
10. 使用Readline（参见[命令行编辑](#8-命令行编辑)）从用户的终端读取命令。
11. Bash inspects the value of the `ignoreeof` option to `set -o` instead of exiting immediately when it receives an `EOF` on its standard input when reading a command (see [The Set Builtin](#431-内置命令set)).
12. Bash检查`set -o`命令的`ignoreeof`选项的值，而不是在读取命令时立即退出，当它的标准输入上收到`EOF`时（参见[set内置命令](#431-内置命令set)）。
13. Command history (see [Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities)) and history expansion (see [History Expansion](#93-历史记录扩展)) are enabled by default. Bash will save the command history to the file named by `$HISTFILE` when a shell with history enabled exits.
14. 默认启用命令历史记录（参见[Bash历史记录功能](#91-bash-历史记录功能-bash-history-facilities)）和历史扩展（参见[历史扩展](#93-历史记录扩展)）。Bash在启用历史记录的Shell退出时将命令历史记录保存到由`$HISTFILE`指定的文件中。
15. Alias expansion (see [Aliases](#66-别名)) is performed by default.
16. 默认执行别名展开（参见[别名](#66-别名)）。
17. In the absence of any traps, Bash ignores `SIGTERM` (see [Signals](#376-信号)).
18. 在没有任何陷阱（trap）的情况下，Bash忽略`SIGTERM`信号（参见[信号](#376-信号)）。
19. In the absence of any traps, `SIGINT` is caught and handled (see [Signals](#376-信号)). `SIGINT` will interrupt some shell builtins.
20. 在没有任何陷阱（trap）的情况下，Bash捕获并处理`SIGINT`信号（参见[信号](#376-信号)）。`SIGINT`会中断某些Shell内置命令。
21. An interactive login shell sends a `SIGHUP` to all jobs on exit if the `huponexit` shell option has been enabled (see [Signals](#376-信号)).
22. 交互式登录Shell在退出时向所有作业发送`SIGHUP`信号，如果已启用`huponexit` Shell选项（参见[信号](#376-信号)）。
23. The -n invocation option is ignored, and `set -n` has no effect (see [The Set Builtin](#431-内置命令set)).
24. 忽略-n启动选项，并且`set -n`无效（参见[set内置命令](#431-内置命令set)）。
25. Bash will check for mail periodically, depending on the values of the `MAIL`, `MAILPATH`, and `MAILCHECK` shell variables (see [Bash Variables](#52-bash-变量)).
26. Bash将定期检查邮件，这取决于`MAIL`、`MAILPATH`和`MAILCHECK` Shell变量的值（参见[Bash变量](#52-bash-变量)）。
27. Expansion errors due to references to unbound shell variables after `set -u` has been enabled will not cause the shell to exit (see [The Set Builtin](#431-内置命令set)).
28. 在启用了`set -u`后，由于引用了未绑定的Shell变量而导致的扩展错误不会导致Shell退出（参见[set内置命令](#431-内置命令set)）。
29. The shell will not exit on expansion errors caused by var being unset or null in `${var:?word}` expansions (see [Shell Parameter Expansion](#353-shell参数扩展)).
30. 在`${var:?word}`扩展中，由于var未设置或为空而导致的扩展错误，Shell不会退出（参见[Shell参数扩展](#353-shell参数扩展)）。
31. Redirection errors encountered by shell builtins will not cause the shell to exit.
32. 由Shell内置命令遇到的重定向错误不会导致Shell退出。
33. When running in POSIX mode, a special builtin returning an error status will not cause the shell to exit (see [Bash POSIX Mode](#611-bash的posix模式)).
34. 在POSIX模式下运行时，特殊内置命令返回错误状态不会导致Shell退出（参见[Bash POSIX模式](#611-bash的posix模式)）。
35. A failed `exec` will not cause the shell to exit (see [Bourne Shell Builtins](#41-bourne-shell-builtins)).
36. `exec`失败不会导致Shell退出（参见[Bourne Shell内置命令](#41-bourne-shell-builtins)）。
37. Parser syntax errors will not cause the shell to exit.
38. 解析器语法错误不会导致Shell退出。
39. If the `cdspell` shell option is enabled, the shell will attempt simple spelling correction for directory arguments to the `cd` builtin (see the description of the `cdspell` option to the `shopt` builtin in [The Shopt Builtin](#432--shopt内置命令)). The `cdspell` option is only effective in interactive shells.
40. 如果启用了`cdspell` Shell选项，则Shell会尝试对`cd`内置命令的目录参数进行简单的拼写纠正（参见[The Shopt Builtin](#432--shopt内置命令)中对`cdspell`选项的描述）。`cdspell`选项仅在交互式Shell中有效。
41. The shell will check the value of the `TMOUT` variable and exit if a command is not read within the specified number of seconds after printing `$PS1` (see [Bash Variables](#52-bash-变量)).
42. Shell将检查`TMOUT`变量的值，并在在打印`$PS1`后指定的秒数内未读取命令时退出（参见[Bash变量](#52-bash-变量)）。





### 6.4 Bash 条件表达式



Conditional expressions are used by the `[[` compound command (see [Conditional Constructs](#3252-条件结构)) and the `test` and `[` builtin commands (see [Bourne Shell Builtins](#41-bourne-shell-builtins)). The `test` and `[` commands determine their behavior based on the number of arguments; see the descriptions of those commands for any other command-specific actions.

​	条件表达式由`[[`复合命令（参见[条件构造](#3252-条件结构)）和`test`以及`[`内置命令（参见[Bourne Shell内置命令](#41-bourne-shell-builtins)）使用。`test`和`[`命令根据其参数数量确定其行为；有关这些命令的其他特定行为，请参阅这些命令的描述。

Expressions may be unary or binary, and are formed from the following primaries. Unary expressions are often used to examine the status of a file. There are string operators and numeric comparison operators as well. Bash handles several filenames specially when they are used in expressions. If the operating system on which Bash is running provides these special files, Bash will use them; otherwise it will emulate them internally with this behavior: If the file argument to one of the primaries is of the form /dev/fd/N, then file descriptor N is checked. If the file argument to one of the primaries is one of /dev/stdin, /dev/stdout, or /dev/stderr, file descriptor 0, 1, or 2, respectively, is checked.

​	表达式可以是一元的或二元的，并且由以下原语形成。一元表达式通常用于检查文件的状态。还有字符串运算符和数值比较运算符。当在表达式中使用时，Bash会对某些文件名进行特殊处理。如果Bash运行的操作系统提供了这些特殊文件，则Bash将使用它们；否则，Bash会在内部模拟它们的行为：如果一个原语的文件参数是形式为`/dev/fd/N`，则会检查文件描述符N。如果一个原语的文件参数是`/dev/stdin`、`/dev/stdout`或`/dev/stderr`之一，则分别检查文件描述符0、1或2。

When used with `[[`, the `<` and `>` operators sort lexicographically using the current locale. The `test` command uses ASCII ordering.	

​	当与`[[`一起使用时，`<`和`>`运算符使用当前语言环境进行字典排序。`test`命令使用ASCII排序。

Unless otherwise specified, primaries that operate on files follow symbolic links and operate on the target of the link, rather than the link itself.

​	除非另有说明，对文件进行操作的原语会跟随符号链接并对链接目标进行操作，而不是链接本身。

- `-a file`

  True if file exists.

  如果文件存在，则为真。

- `-b file`

  True if file exists and is a block special file.

  如果文件存在且是块特殊文件，则为真。

- `-c file`

  True if file exists and is a character special file.

  如果文件存在且是字符特殊文件，则为真。

- `-d file`

  True if file exists and is a directory.

  如果文件存在且是目录，则为真。

- `-e file`

  True if file exists.

  如果文件存在，则为真。

- `-f file`

  True if file exists and is a regular file.

  如果文件存在且是普通文件，则为真。

- `-g file`

  True if file exists and its set-group-id bit is set.

  如果文件存在且设置了组ID位，则为真。

- `-h file`

  True if file exists and is a symbolic link.

  如果文件存在且是符号链接，则为真。

- `-k file`

  True if file exists and its "sticky" bit is set.

  如果文件存在且设置了"粘滞"位，则为真。

- `-p file`

  True if file exists and is a named pipe (FIFO).

  如果文件存在且是命名管道（FIFO），则为真。

- `-r file`

  True if file exists and is readable.

  如果文件存在且可读，则为真。

- `-s file`

  True if file exists and has a size greater than zero.

  如果文件存在且大小大于零，则为真。

- `-t fd`

  True if file descriptor fd is open and refers to a terminal.

  如果文件描述符fd是打开的，并且指向终端，则为真。

- `-u file`

  True if file exists and its set-user-id bit is set.

  如果文件存在且设置了用户ID位，则为真。

- `-w file`

  True if file exists and is writable.

  如果文件存在且可写，则为真。

- `-x file`

  True if file exists and is executable.

  如果文件存在且可执行，则为真。

- `-G file`

  True if file exists and is owned by the effective group id.

  如果文件存在且属于有效组ID，则为真。

- `-L file`

  True if file exists and is a symbolic link.

  如果文件存在且是符号链接，则为真。

- `-N file`

  True if file exists and has been modified since it was last read.

  如果文件存在且自上次读取以来已被修改，则为真。

- `-O file`

  True if file exists and is owned by the effective user id.

  如果文件存在且属于有效用户ID，则为真。

- `-S file`

  True if file exists and is a socket.

  如果文件存在且是套接字，则为真。

- `file1 -ef file2`

  True if file1 and file2 refer to the same device and inode numbers.

  如果file1和file2引用相同的设备和inode号，则为真。

- `file1 -nt file2`

  True if file1 is newer (according to modification date) than file2, or if file1 exists and file2 does not.

  如果file1比file2新（根据修改日期），或者file1存在而file2不存在，则为真。

- `file1 -ot file2`

  True if file1 is older than file2, or if file2 exists and file1 does not.

  如果file1比file2旧，或者file2存在而file1不存在，则为真。

- `-o optname`

  True if the shell option optname is enabled. The list of options appears in the description of the -o option to the `set` builtin (see [The Set Builtin](#431-内置命令set)).

  如果Shell选项optname已启用，则为真。选项列表在`set`内置命令的-o选项描述中（参见[set内置命令](#431-内置命令set)）。

- `-v varname`

  True if the shell variable varname is set (has been assigned a value).

  如果Shell变量varname已设置（已分配了值），则为真。

- `-R varname`

  True if the shell variable varname is set and is a name reference.

  如果Shell变量varname已设置，并且是名称引用，则为真。

- `-z string`

  True if the length of string is zero.

  如果字符串的长度为零，则为真。

- `-n string`

- `string`

  True if the length of string is non-zero.

  如果字符串的长度不为零，则为真。

- `string1 == string2`

- `string1 = string2`

  True if the strings are equal. When used with the `[[` command, this performs pattern matching as described above (see [Conditional Constructs](#3252-条件结构)).`=` should be used with the `test` command for POSIX conformance.

  如果字符串相等，则为真。当与`[[`命令一起使用时，这执行如上所述的模式匹配（参见[条件构造](#3252-条件结构)）。为了符合POSIX，应在`test`命令中使用`=`。

- `string1 != string2`

  True if the strings are not equal.

  如果字符串不相等，则为真。

- `string1 < string2`

  True if string1 sorts before string2 lexicographically.

  如果string1按字典顺序排在string2之前，则为真。

- `string1 > string2`

  True if string1 sorts after string2 lexicographically.

  如果string1按字典顺序排在string2之后，则为真。

- `arg1 OP arg2`

  `OP` is one of `-eq`, `-ne`, `-lt`, `-le`, `-gt`, or `-ge`. These arithmetic binary operators return true if arg1 is equal to, not equal to, less than, less than or equal to, greater than, or greater than or equal to arg2, respectively. Arg1 and arg2 may be positive or negative integers. When used with the `[[` command, Arg1 and Arg2 are evaluated as arithmetic expressions (see [Shell Arithmetic](#65-shell-算术)).
  
  `OP`可以是`-eq`、`-ne`、`-lt`、`-le`、`-gt`或`-ge`之一。这些算术二元运算符在arg1等于、不等于、小于、小于等于、大于、大于等于arg2时返回true。Arg1和arg2可以是正整数或负整数。当与`[[`命令一起使用时，Arg1和Arg2将作为算术表达式进行计算（参见[Shell算术](#65-shell-算术)）。





### 6.5 Shell 算术



The shell allows arithmetic expressions to be evaluated, as one of the shell expansions or by using the `((` compound command, the `let` builtin, or the -i option to the `declare` builtin.

​	Shell允许对算术表达式进行求值，可以作为shell扩展的一部分，也可以使用`((`复合命令、`let`内置命令或`declare`内置命令的`-i`选项来进行求值。

Evaluation is done in fixed-width integers with no check for overflow, though division by 0 is trapped and flagged as an error. The operators and their precedence, associativity, and values are the same as in the C language. The following list of operators is grouped into levels of equal-precedence operators. The levels are listed in order of decreasing precedence.

​	计算结果是在固定宽度的整数范围内进行的，没有检查溢出，但除以0会被捕获并标记为错误。运算符及其优先级、结合性和值与C语言相同。以下运算符列表按优先级递减的顺序分为相等优先级运算符级别。

- `id++ id--`

  variable post-increment and post-decrement

  变量后增量和后减量

- `++id --id`

  variable pre-increment and pre-decrement

  变量前增量和前减量

- `- +`

  unary minus and plus

  一元负号和正号

- `! ~`

  logical and bitwise negation

  逻辑和位求反

- `**`

  exponentiation

  指数运算

- `* / %`

  multiplication, division, remainder

  乘法、除法、取模

- `+ -`

  addition, subtraction

  加法、减法

- `<< >>`

  left and right bitwise shifts

  左位移和右位移

- `<= >= < >`

  comparison

  比较运算

- `== !=`

  equality and inequality

  相等和不相等

- `&`

  bitwise AND

  位与

- `^`

  bitwise exclusive OR

  位异或

- `|`

  bitwise OR

  位或

- `&&`

  logical AND

  逻辑与

- `||`

  logical OR

  逻辑或

- `expr ? expr : expr`

  conditional operator

  条件运算符

- `= *= /= %= += -= <<= >>= &= ^= |=`

  assignment

  赋值运算符

- `expr1 , expr2`

  comma
  
  逗号运算符

Shell variables are allowed as operands; parameter expansion is performed before the expression is evaluated. Within an expression, shell variables may also be referenced by name without using the parameter expansion syntax. A shell variable that is null or unset evaluates to 0 when referenced by name without using the parameter expansion syntax. The value of a variable is evaluated as an arithmetic expression when it is referenced, or when a variable which has been given the `integer` attribute using `declare -i` is assigned a value. A null value evaluates to 0. A shell variable need not have its `integer` attribute turned on to be used in an expression.

​	Shell变量可以作为操作数；在表达式求值之前，会进行参数展开。在表达式内部，也可以直接按名称引用Shell变量，无需使用参数展开语法。当通过名称引用一个空或未设置的Shell变量时，会被解释为0，而不使用参数展开语法。当引用变量的值时，它会被当作算术表达式进行求值，或者当给一个通过`declare -i`设置了`integer`属性的变量赋值时。空值将被解释为0。一个Shell变量不需要打开其`integer`属性即可在表达式中使用。

Integer constants follow the C language definition, without suffixes or character constants. Constants with a leading 0 are interpreted as octal numbers. A leading `0x` or `0X` denotes hexadecimal. Otherwise, numbers take the form [base`#`]n, where the optional base is a decimal number between 2 and 64 representing the arithmetic base, and n is a number in that base. If base`#` is omitted, then base 10 is used. When specifying n, if a non-digit is required, the digits greater than 9 are represented by the lowercase letters, the uppercase letters, `@`, and `_`, in that order. If base is less than or equal to 36, lowercase and uppercase letters may be used interchangeably to represent numbers between 10 and 35.

​	整数常量遵循C语言的定义，没有后缀或字符常量。以0开头的常量被解释为八进制数。以`0x`或`0X`开头表示十六进制数。否则，数字采用形式[base`#`]n，其中可选的base是一个表示算术基数的2到64之间的十进制数，n是该基数下的一个数字。如果省略base`#`，则使用十进制数。在指定n时，如果需要一个非数字字符，大于9的数字按小写字母、大写字母、`@`和`_`的顺序来表示。如果base小于或等于36，则可以使用小写和大写字母来交替表示10到35之间的数字。

Operators are evaluated in order of precedence. Sub-expressions in parentheses are evaluated first and may override the precedence rules above.

​	运算符按照优先级顺序进行求值。括号中的子表达式首先进行求值，并可能覆盖上述的优先级规则。





### 6.6 别名



*Aliases* allow a string to be substituted for a word when it is used as the first word of a simple command. The shell maintains a list of aliases that may be set and unset with the `alias` and `unalias` builtin commands.

​	*别名* 允许在简单命令的第一个单词中使用字符串替换。Shell维护一个可以使用`alias`和`unalias`内置命令设置和取消设置的别名列表。

The first word of each simple command, if unquoted, is checked to see if it has an alias. If so, that word is replaced by the text of the alias. The characters `/`, `$`, \`, `=` and any of the shell metacharacters or quoting characters listed above may not appear in an alias name. The replacement text may contain any valid shell input, including shell metacharacters. The first word of the replacement text is tested for aliases, but a word that is identical to an alias being expanded is not expanded a second time. This means that one may alias `ls` to `"ls -F"`, for instance, and Bash does not try to recursively expand the replacement text. If the last character of the alias value is a `blank`, then the next command word following the alias is also checked for alias expansion.

​	每个简单命令的第一个单词（如果未被引用）将被检查是否有别名。如果有别名，该单词将被替换为别名的文本。字符`/`、`$`、`\`、`=`以及上面列出的任何Shell元字符或引用字符都不能出现在别名名称中。替换文本可以包含任何有效的Shell输入，包括Shell元字符。替换文本的第一个单词也会被检查是否有别名，但是如果一个单词与正在展开的别名完全相同，则不会再次展开。这意味着可以将`ls`定义为`"ls -F"`，Bash不会尝试递归展开替换文本。如果别名值的最后一个字符是空格，则别名后面的下一个命令单词也会被检查是否进行别名展开。

Aliases are created and listed with the `alias` command, and removed with the `unalias` command.

​	可以使用`alias`命令创建和列出别名，并使用`unalias`命令删除别名。

There is no mechanism for using arguments in the replacement text, as in `csh`. If arguments are needed, use a shell function (see [Shell Functions](#33-shell-函数)).

​	在替换文本中没有使用类似于`csh`的参数机制。如果需要使用参数，请使用Shell函数（参见[Shell函数](#33-shell-函数)）。

Aliases are not expanded when the shell is not interactive, unless the `expand_aliases` shell option is set using `shopt` (see [The Shopt Builtin](#432--shopt内置命令)).

​	在Shell不是交互式时，别名不会被展开，除非使用`shopt`设置了`expand_aliases` Shell选项（参见[The Shopt Builtin](#432--shopt内置命令)）。

The rules concerning the definition and use of aliases are somewhat confusing. Bash always reads at least one complete line of input, and all lines that make up a compound command, before executing any of the commands on that line or the compound command. Aliases are expanded when a command is read, not when it is executed. Therefore, an alias definition appearing on the same line as another command does not take effect until the next line of input is read. The commands following the alias definition on that line are not affected by the new alias. This behavior is also an issue when functions are executed. Aliases are expanded when a function definition is read, not when the function is executed, because a function definition is itself a command. As a consequence, aliases defined in a function are not available until after that function is executed. To be safe, always put alias definitions on a separate line, and do not use `alias` in compound commands.

​	关于别名定义和使用的规则有些混乱。Bash在执行任何命令之前，总是至少读取一行完整的输入和构成复合命令的所有行。别名在命令读取时被展开，而不是在执行时展开。因此，出现在另一个命令同一行上的别名定义在下一行输入被读取之前不会生效。该行上别名定义之后的命令不受新别名的影响。这个行为也适用于函数的执行。当读取函数定义时，别名被展开，而不是在函数执行时展开，因为函数定义本身就是一个命令。因此，在函数中定义的别名在执行该函数之后才可用。为了安全起见，始终将别名定义放在单独的一行，并且不要在复合命令中使用`alias`。

For almost every purpose, shell functions are preferred over aliases.

​	几乎在所有情况下，Shell函数比别名更为推荐。





### 6.7 数组



Bash provides one-dimensional indexed and associative array variables. Any variable may be used as an indexed array; the `declare` builtin will explicitly declare an array. There is no maximum limit on the size of an array, nor any requirement that members be indexed or assigned contiguously. Indexed arrays are referenced using integers (including arithmetic expressions (see [Shell Arithmetic](#65-shell-算术))) and are zero-based; associative arrays use arbitrary strings. Unless otherwise noted, indexed array indices must be non-negative integers.

​	Bash提供了一维索引数组和关联数组变量。任何变量都可以用作索引数组；`declare`内置命令可以显式声明一个数组。数组大小没有最大限制，成员不需要按顺序进行索引或赋值。索引数组使用整数（包括算术表达式（参见[Shell算术](#65-shell-算术)）），索引从0开始；关联数组使用任意字符串。除非另有说明，索引数组索引必须是非负整数。

An indexed array is created automatically if any variable is assigned to using the syntax

​	如果使用以下语法将任何变量赋值：

```
name[subscript]=value
```

The subscript is treated as an arithmetic expression that must evaluate to a number. To explicitly declare an array, use

则会自动创建一个索引数组。子脚本将被视为必须求值为数字的算术表达式。要显式声明一个数组，请使用：

```
declare -a name
```

The syntax

也可以接受语法：

```
declare -a name[subscript]
```

is also accepted; the subscript is ignored.

子脚本将被忽略。

Associative arrays are created using

​	使用以下方式创建关联数组：

```
declare -A name
```

Attributes may be specified for an array variable using the `declare` and `readonly` builtins. Each attribute applies to all members of an array.

​	可以使用`declare`和`readonly`内置命令为数组变量指定属性。每个属性都适用于数组的所有成员。

Arrays are assigned to using compound assignments of the form

​	数组可以使用以下形式的复合赋值来进行赋值：

```
name=(value1 value2 … )
```

where each value may be of the form `[subscript]=`string. Indexed array assignments do not require anything but string. When assigning to indexed arrays, if the optional subscript is supplied, that index is assigned to; otherwise the index of the element assigned is the last index assigned to by the statement plus one. Indexing starts at zero.

其中每个值都可以是`[subscript]=`string的形式。索引数组的赋值不需要指定任何东西，只需要字符串即可。在对索引数组赋值时，如果提供了可选的子脚本，该索引将被分配；否则，分配的元素索引是语句中已分配的最后一个索引加一。索引从0开始。

Each value in the list undergoes all the shell expansions described above (see [Shell Expansions](#35-shell-扩展)).

​	列表中的每个值都要经过上面描述的所有Shell扩展（参见[Shell扩展](#35-shell-扩展)）。

When assigning to an associative array, the words in a compound assignment may be either assignment statements, for which the subscript is required, or a list of words that is interpreted as a sequence of alternating keys and values: name=(key1 value1 key2 value2 … ). These are treated identically to name=( [key1]=value1 [key2]=value2 … ). The first word in the list determines how the remaining words are interpreted; all assignments in a list must be of the same type. When using key/value pairs, the keys may not be missing or empty; a final missing value is treated like the empty string.

​	当对关联数组赋值时，复合赋值中的单词可以是赋值语句，其中需要子脚本，或者是一系列交替键和值的单词列表：name=(key1 value1 key2 value2 … )。它们与name=( [key1]=value1 [key2]=value2 … )是完全一样的。列表中的第一个单词决定了如何解释其余单词；列表中的所有赋值必须是相同类型的。当使用键/值对时，键不能缺失或为空；最后缺失的值会被视为空字符串。

This syntax is also accepted by the `declare` builtin. Individual array elements may be assigned to using the `name[subscript]=value` syntax introduced above.

​	这个语法也可以被`declare`内置命令接受。可以使用上面介绍的`name[subscript]=value`语法来给各个数组元素赋值。

When assigning to an indexed array, if name is subscripted by a negative number, that number is interpreted as relative to one greater than the maximum index of name, so negative indices count back from the end of the array, and an index of -1 references the last element.

​	当对索引数组进行赋值时，如果name带有一个负数的子脚本，那么该数字将被解释为相对于name的最大索引加一，因此负索引会从数组末尾开始计数，索引-1指向最后一个元素。

The `+=` operator will append to an array variable when assigning using the compound assignment syntax; see [Shell Parameters](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters) above.

​	使用复合赋值语法对数组变量进行赋值时，`+=`运算符将在数组变量末尾追加值；参见上面的[Shell参数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)。

Any element of an array may be referenced using `${name[subscript]}`. The braces are required to avoid conflicts with the shell's filename expansion operators. If the subscript is `@` or `*`, the word expands to all members of the array name. These subscripts differ only when the word appears within double quotes. If the word is double-quoted, `${name[*]}` expands to a single word with the value of each array member separated by the first character of the `IFS` variable, and `${name[@]}` expands each element of name to a separate word. When there are no array members, `${name[@]}` expands to nothing. If the double-quoted expansion occurs within a word, the expansion of the first parameter is joined with the beginning part of the original word, and the expansion of the last parameter is joined with the last part of the original word. This is analogous to the expansion of the special parameters `@` and `*`. `${#name[subscript]}` expands to the length of `${name[subscript]}`. If subscript is `@` or `*`, the expansion is the number of elements in the array. If the subscript used to reference an element of an indexed array evaluates to a number less than zero, it is interpreted as relative to one greater than the maximum index of the array, so negative indices count back from the end of the array, and an index of -1 refers to the last element.

​	可以使用`${name[subscript]}`引用数组中的任何元素。大括号是必需的，以避免与Shell的文件名展开运算符冲突。如果子脚本是`@`或`*`，则单词展开为数组name的所有成员。这些子脚本在单词出现在双引号内时才会有所不同。如果单词被双引号引起来，`${name[*]}`会展开为一个单词，其中每个数组成员的值由`IFS`变量的第一个字符分隔，并且`${name[@]}`会将name的每个元素展开为单独的单词。当数组没有成员时，`${name[@]}`会展开为一个空字符串。如果双引号展开出现在单词中，第一个参数的展开将与原始单词的前半部分连接在一起，最后一个参数的展开将与原始单词的后半部分连接在一起。这类似于特殊参数`@`和`*`的展开。`${#name[subscript]}`展开为`${name[subscript]}`的长度。如果子脚本是`@`或`*`，展开为数组中元素的数量。如果用于引用索引数组的元素的子脚本求值为负数，则将其解释为相对于数组的最大索引加一，因此负索引会从数组末尾开始计数，索引`-1`指向最后一个元素。

Referencing an array variable without a subscript is equivalent to referencing with a subscript of 0. Any reference to a variable using a valid subscript is legal, and `bash` will create an array if necessary.

​	引用一个没有子脚本的数组变量等同于使用子脚本0来引用。使用有效子脚本对变量进行引用是合法的，如果需要，`bash`会创建一个数组。

An array variable is considered set if a subscript has been assigned a value. The null string is a valid value.

​	一个数组变量被视为设置过，如果给一个子脚本赋了一个值。空字符串是一个有效的值。

It is possible to obtain the keys (indices) of an array as well as the values. `${!name[@]}` and `${!name[*]}` expand to the indices assigned in array variable name. The treatment when in double quotes is similar to the expansion of the special parameters `@` and `*` within double quotes.

​	可以获取数组的键（索引）和值。`${!name[@]}`和`${!name[*]}`扩展为数组变量name中的索引。当在双引号内时，其处理类似于双引号内的特殊参数`@`和`*`的展开。

The `unset` builtin is used to destroy arrays. `unset name[subscript]` destroys the array element at index subscript. Negative subscripts to indexed arrays are interpreted as described above. Unsetting the last element of an array variable does not unset the variable. `unset name`, where name is an array, removes the entire array. `unset name[subscript]` behaves differently depending on the array type when given a subscript of `*` or `@`. When name is an associative array, it removes the element with key `*` or `@`. If name is an indexed array, `unset` removes all of the elements, but does not remove the array itself.

​	使用`unset`内置命令来销毁数组。`unset name[subscript]`会销毁索引为subscript的数组元素。对于索引数组，负的子脚本将被解释如上所述。取消设置数组变量的最后一个元素并不会取消设置该变量本身。`unset name`中，name是一个数组时，会删除整个数组。`unset name[subscript]`的行为取决于数组类型，当给定`*`或`@`子脚本时。当name是关联数组时，它会删除具有键`*`或`@`的元素。如果name是索引数组，`unset`会删除所有元素，但不会删除数组本身。

When using a variable name with a subscript as an argument to a command, such as with `unset`, without using the word expansion syntax described above, the argument is subject to the shell's filename expansion. If filename expansion is not desired, the argument should be quoted.

​	当将带有子脚本的变量名作为命令的参数使用（例如使用`unset`），而不使用上述描述的单词展开语法时，参数将受到Shell的文件名展开的影响。如果不希望进行文件名展开，应将参数放在引号中。

The `declare`, `local`, and `readonly` builtins each accept a -a option to specify an indexed array and a -A option to specify an associative array. If both options are supplied, -A takes precedence. The `read` builtin accepts a -a option to assign a list of words read from the standard input to an array, and can read values from the standard input into individual array elements. The `set` and `declare` builtins display array values in a way that allows them to be reused as input.

​	`declare`、`local`和`readonly`内置命令都可以使用`-a`选项来指定索引数组，`-A`选项来指定关联数组。如果两个选项都提供，`-A`优先。`read`内置命令可以使用`-a`选项将从标准输入读取的单词列表分配给数组，并且可以将从标准输入读取的值读入各个数组元素。`set`和`declare`内置命令以一种允许它们作为输入重新使用的方式显示数组值。





### 6.8 目录栈



The directory stack is a list of recently-visited directories. The `pushd` builtin adds directories to the stack as it changes the current directory, and the `popd` builtin removes specified directories from the stack and changes the current directory to the directory removed. The `dirs` builtin displays the contents of the directory stack. The current directory is always the "top" of the directory stack.

​	目录栈是一个存储最近访问的目录的列表。`pushd`内置命令在更改当前目录时将目录添加到栈中，`popd`内置命令从栈中移除指定的目录，并将当前目录更改为被移除的目录。`dirs`内置命令显示目录栈的内容。当前目录始终位于目录栈的顶部。

The contents of the directory stack are also visible as the value of the `DIRSTACK` shell variable.

​	目录栈的内容也可以通过`DIRSTACK` shell变量的值来查看。








#### 6.8.1 目录栈内置命令

- `dirs`

  ```
  dirs [-clpv] [+N | -N]
  ```

  Display the list of currently remembered directories. Directories are added to the list with the `pushd` command; the `popd` command removes directories from the list. The current directory is always the first directory in the stack.

  显示当前记忆的目录列表。使用`pushd`命令将目录添加到列表中，`popd`命令从列表中移除目录。当前目录始终是栈中的第一个目录。

  - `-c`: Clears the directory stack by deleting all of the elements.

  - `-l`: Produces a listing using full pathnames; the default listing format uses a tilde to denote the home directory.

  - `-p`: Causes `dirs` to print the directory stack with one entry per line.

  - `-v`: Causes `dirs` to print the directory stack with one entry per line, prefixing each entry with its index in the stack.

  - `+N`: Displays the Nth directory (counting from the left of the list printed by `dirs` when invoked without options), starting with zero.

  - `-N`: Displays the Nth directory (counting from the right of the list printed by `dirs` when invoked without options), starting with zero.

  - `-c`：清除目录栈，删除所有元素。

  - `-l`：以完整路径名的形式产生列表；默认的列表格式使用波浪符号表示家目录。
  - `-p`：使`dirs`按每行一个条目的格式打印目录栈。
  - `-v`：使`dirs`按每行一个条目的格式打印目录栈，并在每个条目前加上其在栈中的索引。
  - `+N`：显示第N个目录（从`dirs`打印的列表的左侧开始计数，从零开始）。
  - `-N`：显示第N个目录（从`dirs`打印的列表的右侧开始计数，从零开始）。

- `popd`

  ```
  popd [-n] [+N | -N]
  ```

  Removes elements from the directory stack. The elements are numbered from 0 starting at the first directory listed by `dirs`; that is, `popd` is equivalent to `popd +0`.When no arguments are given, `popd` removes the top directory from the stack and changes to the new top directory.

  ​	从目录栈中移除元素。元素从0开始编号，从`dirs`列出的第一个目录开始计数；也就是说，`popd`等同于`popd +0`。当没有给出参数时，`popd`将从栈中移除顶部目录，并切换到新的顶部目录。

  Arguments, if supplied, have the following meanings:

  ​	如果提供了参数，则参数的含义如下：

  - `-n`: Suppresses the normal change of directory when removing directories from the stack, so that only the stack is manipulated.

  - `+N`: Removes the Nth directory (counting from the left of the list printed by `dirs`), starting with zero, from the stack.

  - `-N`: Removes the Nth directory (counting from the right of the list printed by `dirs`), starting with zero, from the stack.

  - `-n`：在从栈中移除目录时，禁止正常的目录更改，只对栈进行操作。

    `+N`：从栈中移除第N个目录（从`dirs`打印的列表的左侧开始计数，从零开始）。

    `-N`：从栈中移除第N个目录（从`dirs`打印的列表的右侧开始计数，从零开始）。

  

  If the top element of the directory stack is modified, and the -n option was not supplied, `popd` uses the `cd` builtin to change to the directory at the top of the stack. If the `cd` fails, `popd` returns a non-zero value.

  ​	如果目录栈的顶部元素被修改，并且未提供`-n`选项，`popd`会使用`cd`内置命令切换到栈顶的目录。如果`cd`失败，`popd`将返回一个非零值。

  Otherwise, `popd` returns an unsuccessful status if an invalid option is encountered, the directory stack is empty, or a non-existent directory stack entry is specified.

  ​	否则，如果遇到无效选项、目录栈为空或指定了不存在的目录栈条目，则`popd`返回一个失败状态。

  If the `popd` command is successful, Bash runs `dirs` to show the final contents of the directory stack, and the return status is 0.

  ​	如果`popd`命令成功，Bash会运行`dirs`以显示目录栈的最终内容，并且返回状态为0。

- `pushd`

  ```
  pushd [-n] [+N | -N | dir]
  ```
  
  Adds a directory to the top of the directory stack, or rotates the stack, making the new top of the stack the current working directory. With no arguments, `pushd` exchanges the top two elements of the directory stack.
  
  ​	将一个目录添加到目录栈的顶部，或者旋转栈，使得新的栈顶成为当前工作目录。如果没有提供参数，`pushd`交换目录栈的前两个元素。
  
  Arguments, if supplied, have the following meanings:
  
  ​	如果提供了参数，参数的含义如下：
  
  - `-n`Suppresses the normal change of directory when rotating or adding directories to the stack, so that only the stack is manipulated.
  
  - `+N`Brings the Nth directory (counting from the left of the list printed by `dirs`, starting with zero) to the top of the list by rotating the stack.
  
  - `-N`Brings the Nth directory (counting from the right of the list printed by `dirs`, starting with zero) to the top of the list by rotating the stack.
  
  - `dir`Makes dir be the top of the stack.
  
  - `-n`：在旋转或添加目录到栈中时，禁止正常的目录更改，只对栈进行操作。
  
    `+N`：将第N个目录（从`dirs`打印的列表的左侧开始计数，从零开始）旋转到列表的顶部。
  
    `-N`：将第N个目录（从`dirs`打印的列表的右侧开始计数，从零开始）旋转到列表的顶部。
  
    `dir`：使dir成为栈的顶部。
  
  
  
  After the stack has been modified, if the -n option was not supplied, `pushd` uses the `cd` builtin to change to the directory at the top of the stack. If the `cd` fails, `pushd` returns a non-zero value.
  
  ​	修改栈后，如果未提供`-n`选项，`pushd`将使用`cd`内置命令切换到栈顶的目录。如果`cd`失败，`pushd`将返回一个非零值。
  
  Otherwise, if no arguments are supplied, `pushd` returns 0 unless the directory stack is empty. When rotating the directory stack, `pushd` returns 0 unless the directory stack is empty or a non-existent directory stack element is specified.
  
  ​	否则，如果没有提供参数，`pushd`除非目录栈为空，否则将返回0。在旋转目录栈时，`pushd`除非目录栈为空或指定了不存在的目录栈元素，否则将返回0。
  
  If the `pushd` command is successful, Bash runs `dirs` to show the final contents of the directory stack.
  
  ​	如果`pushd`命令成功，Bash会运行`dirs`以显示目录栈的最终内容。





### 6.9 控制提示符



Bash examines the value of the array variable `PROMPT_COMMAND` just before printing each primary prompt. If any elements in `PROMPT_COMMAND` are set and non-null, Bash executes each value, in numeric order, just as if it had been typed on the command line.

​	Bash在打印每个主提示符之前检查数组变量`PROMPT_COMMAND`的值。如果`PROMPT_COMMAND`中的任何元素被设置且非空，Bash会按照数字顺序执行每个值，就像它们在命令行上被输入一样。

In addition, the following table describes the special characters which can appear in the prompt variables `PS0`, `PS1`, `PS2`, and `PS4`:

​	此外，以下表格描述了可以出现在提示变量`PS0`、`PS1`、`PS2`和`PS4`中的特殊字符：

- `\a`

  A bell character.

  响铃字符。

- `\d`

  The date, in "Weekday Month Date" format (e.g., "Tue May 26").

  日期，以“星期 月份 日期”格式显示（例如，“Tue May 26”）。

- `\D{format}`

  The format is passed to `strftime`(3) and the result is inserted into the prompt string; an empty format results in a locale-specific time representation. The braces are required.

  `format`参数会传递给`strftime`(3)，并将结果插入到提示字符串中；如果`format`为空，则会显示地区特定的时间表示。大括号是必需的。

- `\e`

  An escape character.

  转义字符。

- `\h`

  The hostname, up to the first `.`.

  主机名，截取第一个`.`之前的部分。

- `\H`

  The hostname.

  主机名。

- `\j`

  The number of jobs currently managed by the shell.

  shell当前管理的作业数。

- `\l`

  The basename of the shell's terminal device name.

  shell的终端设备名的基本名称。

- `\n`

  A newline.

  换行符。

- `\r`

  A carriage return.

  回车符

- `\s`

  The name of the shell, the basename of `$0` (the portion following the final slash).

  shell的名称，即`$0`（最后一个斜杠之后的部分）的基本名称。

- `\t`

  The time, in 24-hour HH:MM:SS format.

  时间，以24小时HH:MM:SS格式显示。

- `\T`

  The time, in 12-hour HH:MM:SS format.

  时间，以12小时HH:MM:SS格式显示。

- `\@`

  The time, in 12-hour am/pm format.

  时间，以12小时am/pm格式显示。

- `\A`

  The time, in 24-hour HH:MM format.

  时间，以24小时HH:MM格式显示。

- `\u`

  The username of the current user.

  当前用户的用户名。

- `\v`

  The version of Bash (e.g., 2.00)

  Bash的版本（例如，2.00）。

- `\V`

  The release of Bash, version + patchlevel (e.g., 2.00.0)

  Bash的版本和修订号（例如，2.00.0）。

- `\w`

  The value of the `PWD` shell variable (`$PWD`), with `$HOME` abbreviated with a tilde (uses the `$PROMPT_DIRTRIM` variable).

  `PWD` shell变量（`$PWD`）的值，如果在`$HOME`前缩写，则使用波浪符号（使用`$PROMPT_DIRTRIM`变量）。

- `\W`

  The basename of `$PWD`, with `$HOME` abbreviated with a tilde.

  `$PWD`的基本名称，如果在`$HOME`前缩写，则使用波浪符号。

- `\!`

  The history number of this command.

  当前命令的历史记录编号。

- `\#`

  The command number of this command.

  当前命令的命令编号。

- `\$`

  If the effective uid is 0, `#`, otherwise `$`.

  如果有效的用户ID是0，则显示`#`，否则显示`$`。

- `\nnn`

  The character whose ASCII code is the octal value nnn.

  八进制值为nnn的ASCII码字符。

- `\\`

  A backslash.

  反斜杠。

- `\[`

  Begin a sequence of non-printing characters. This could be used to embed a terminal control sequence into the prompt.

  开始一个非打印字符序列。这可用于将终端控制序列嵌入到提示符中。

- `\]`

  End a sequence of non-printing characters.
  
  结束一个非打印字符序列。

The command number and the history number are usually different: the history number of a command is its position in the history list, which may include commands restored from the history file (see [Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities)), while the command number is the position in the sequence of commands executed during the current shell session.

​	命令编号和历史记录编号通常是不同的：命令的历史记录编号是它在历史记录列表中的位置，可能包括从历史记录文件中恢复的命令（参见[Bash历史记录功能](#91-bash-历史记录功能-bash-history-facilities)），而命令编号是在当前shell会话期间执行的命令序列中的位置。

After the string is decoded, it is expanded via parameter expansion, command substitution, arithmetic expansion, and quote removal, subject to the value of the `promptvars` shell option (see [The Shopt Builtin](#432--shopt内置命令)). This can have unwanted side effects if escaped portions of the string appear within command substitution or contain characters special to word expansion.

​	在解码字符串后，它通过参数扩展、命令替换、算术扩展和引号移除进行展开，这取决于`promptvars` shell选项的值（参见[内置命令Shopt](#432--shopt内置命令)）。如果转义的字符串部分出现在命令替换中或包含对单词扩展特殊的字符，这可能会产生意外的副作用。





### 6.10 受限制的Shell



If Bash is started with the name `rbash`, or the --restricted or -r option is supplied at invocation, the shell becomes restricted. A restricted shell is used to set up an environment more controlled than the standard shell. A restricted shell behaves identically to `bash` with the exception that the following are disallowed or not performed:

​	如果Bash以名称`rbash`启动，或在启动时提供`--restricted`或`-r`选项，那么Shell将变为受限制的。受限制的Shell用于建立比标准Shell更受控制的环境。受限制的Shell的行为与`bash`完全相同，除了以下操作被禁止或不执行：

 

- Changing directories with the `cd` builtin.
- Setting or unsetting the values of the `SHELL`, `PATH`, `HISTFILE`, `ENV`, or `BASH_ENV` variables.
- Specifying command names containing slashes.
- Specifying a filename containing a slash as an argument to the `.` builtin command.
- Specifying a filename containing a slash as an argument to the `history` builtin command.
- Specifying a filename containing a slash as an argument to the -p option to the `hash` builtin command.
- Importing function definitions from the shell environment at startup.
- Parsing the value of `SHELLOPTS` from the shell environment at startup.
- Redirecting output using the `>`, `>|`, `<>`, `>&`, `&>`, and `>>` redirection operators.
- Using the `exec` builtin to replace the shell with another command.
- Adding or deleting builtin commands with the -f and -d options to the `enable` builtin.
- Using the `enable` builtin command to enable disabled shell builtins.
- Specifying the -p option to the `command` builtin.
- Turning off restricted mode with `set +r` or `shopt -u restricted_shell`.
- 使用`cd`内置命令更改目录。
- 设置或取消设置`SHELL`、`PATH`、`HISTFILE`、`ENV`或`BASH_ENV`变量的值。
- 指定包含斜杠的命令名称。
- 将包含斜杠的文件名作为`.`内置命令的参数。
- 将包含斜杠的文件名作为`history`内置命令的参数。
- 将包含斜杠的文件名作为`hash`内置命令的`-p`选项的参数。
- 在启动时从Shell环境导入函数定义。
- 在启动时从Shell环境解析`SHELLOPTS`的值。
- 使用`>`, `>|`, `<>`, `>&`, `&>`, 和 `>>` 重定向操作符进行输出重定向。
- 使用`exec`内置命令用另一个命令替换Shell。
- 使用`enable`内置命令的`-f`和`-d`选项来添加或删除内置命令。
- 使用`enable`内置命令使禁用的Shell内置命令重新启用。
- 使用`command`内置命令的`-p`选项。
- 使用`set +r`或`shopt -u restricted_shell`取消受限制模式。

These restrictions are enforced after any startup files are read.

​	这些限制在读取任何启动文件后执行。

When a command that is found to be a shell script is executed (see [Shell Scripts](#38-shell-脚本)), `rbash` turns off any restrictions in the shell spawned to execute the script.

​	当执行被发现是Shell脚本的命令（参见[Shell脚本](#38-shell-脚本)），`rbash`会关闭在执行脚本的Shell中的任何限制。

The restricted shell mode is only one component of a useful restricted environment. It should be accompanied by setting `PATH` to a value that allows execution of only a few verified commands (commands that allow shell escapes are particularly vulnerable), changing the current directory to a non-writable directory other than `$HOME` after login, not allowing the restricted shell to execute shell scripts, and cleaning the environment of variables that cause some commands to modify their behavior (e.g., `VISUAL` or `PAGER`).

​	受限制的Shell模式只是有用的受限制环境的一个组成部分。它应该配合将`PATH`设置为允许执行仅有几个经过验证的命令（允许Shell转义的命令特别容易受到攻击），在登录后将当前目录更改为非可写目录（除了`$HOME`），不允许受限制的Shell执行Shell脚本，并清理导致某些命令修改其行为的环境变量（例如`VISUAL`或`PAGER`）。

Modern systems provide more secure ways to implement a restricted environment, such as `jails`, `zones`, or `containers`.

​	现代系统提供了更安全的实现受限制环境的方式，比如`jails`、`zones`或`containers`。





### 6.11 Bash的POSIX模式



Starting Bash with the --posix command-line option or executing `set -o posix` while Bash is running will cause Bash to conform more closely to the POSIX standard by changing the behavior to match that specified by POSIX in areas where the Bash default differs.

​	通过使用`--posix`命令行选项启动Bash或在Bash运行时执行`set -o posix`，Bash将更接近POSIX标准，改变行为以匹配POSIX在Bash默认行为有所不同的领域。

When invoked as `sh`, Bash enters POSIX mode after reading the startup files.

​	当以`sh`命令启动Bash时，Bash在读取启动文件后进入POSIX模式。

The following list is what's changed when `POSIX mode` is in effect:

​	以下是`POSIX模式`生效时的更改： 

1. Bash ensures that the `POSIXLY_CORRECT` variable is set.
2. Bash确保设置`POSIXLY_CORRECT`变量。
3. When a command in the hash table no longer exists, Bash will re-search `$PATH` to find the new location. This is also available with `shopt -s checkhash`.
4. 当哈希表中的命令不存在时，Bash将重新搜索`$PATH`以找到新位置。这也可以使用`shopt -s checkhash`来实现。
5. Bash will not insert a command without the execute bit set into the command hash table, even if it returns it as a (last-ditch) result from a `$PATH` search.
6. Bash不会将没有执行位设置的命令插入到命令哈希表中，即使它将其作为（最后的）`$PATH`搜索的结果返回。
7. The message printed by the job control code and builtins when a job exits with a non-zero status is `Done(status)`.
8. 作业控制代码和内置命令在作业以非零状态退出时打印的消息是`Done(status)`。
9. The message printed by the job control code and builtins when a job is stopped is `Stopped(signame)`, where signame is, for example, `SIGTSTP`.
10. 作业控制代码和内置命令在作业停止时打印的消息是`Stopped(signame)`，其中signame是例如`SIGTSTP`。
11. Alias expansion is always enabled, even in non-interactive shells.
12. 别名扩展始终启用，即使在非交互式Shell中也是如此。
13. Reserved words appearing in a context where reserved words are recognized do not undergo alias expansion.
14. 在保留字被识别的上下文中出现的保留字不会经历别名扩展。
15. Alias expansion is performed when initially parsing a command substitution. The default mode generally defers it, when enabled, until the command substitution is executed. This means that command substitution will not expand aliases that are defined after the command substitution is initially parsed (e.g., as part of a function definition).
16. 当最初解析命令替换时，会执行别名扩展。默认模式通常会将其推迟，启用时直到执行命令替换时才会执行。这意味着命令替换将不会扩展在命令替换最初解析后定义的别名（例如，作为函数定义的一部分）。
17. The POSIX `PS1` and `PS2` expansions of `!` to the history number and `!!` to `!` are enabled, and parameter expansion is performed on the values of `PS1` and `PS2` regardless of the setting of the `promptvars` option.
18. POSIX `PS1`和`PS2`中的`!`扩展为历史编号和`!!`扩展为`!`，并且对`PS1`和`PS2`的值执行参数扩展，而不考虑`promptvars`选项的设置。
19. The POSIX startup files are executed (`$ENV`) rather than the normal Bash files.
20. 执行POSIX启动文件（`$ENV`）而不是正常的Bash文件。
21. Tilde expansion is only performed on assignments preceding a command name, rather than on all assignment statements on the line.
22. 波浪号扩展仅对出现在命令名称前的赋值执行，而不是对行上的所有赋值执行。
23. The default history file is ~/.sh_history (this is the default value of `$HISTFILE`).
24. 默认的历史文件是`~/.sh_history`（这是`$HISTFILE`的默认值）。
25. Redirection operators do not perform filename expansion on the word in the redirection unless the shell is interactive.
26. 除非Shell是交互式的，否则重定向操作符不会对重定向中的单词执行文件名扩展。
27. Redirection operators do not perform word splitting on the word in the redirection.
28. 重定向操作符不会对重定向中的单词执行词法分割。
29. Function names must be valid shell `name`s. That is, they may not contain characters other than letters, digits, and underscores, and may not start with a digit. Declaring a function with an invalid name causes a fatal syntax error in non-interactive shells.
30. 函数名必须是有效的Shell名称。也就是说，它们不能包含除字母、数字和下划线之外的字符，并且不能以数字开头。在非交互式Shell中，使用无效的名称声明函数会导致致命的语法错误。
31. Function names may not be the same as one of the POSIX special builtins.
32. 函数名不能与POSIX特殊内置命令相同。
33. POSIX special builtins are found before shell functions during command lookup.
34. 在命令查找期间，POSIX特殊内置命令优先于Shell函数找到。
35. When printing shell function definitions (e.g., by `type`), Bash does not print the `function` keyword.
36. 打印Shell函数定义时（例如通过`type`），Bash不打印`function`关键字。
37. Literal tildes that appear as the first character in elements of the `PATH` variable are not expanded as described above under [Tilde Expansion](#352-波浪号扩展).
38. 在`PATH`变量的元素中作为第一个字符出现的直接波浪号不会被扩展，如上文[Tilde Expansion](#352-波浪号扩展)所述。
39. The `time` reserved word may be used by itself as a command. When used in this way, it displays timing statistics for the shell and its completed children. The `TIMEFORMAT` variable controls the format of the timing information.
40. `time`保留字可以单独用作命令。当以这种方式使用时，它显示Shell及其已完成子进程的时间统计信息。`TIMEFORMAT`变量控制时间信息的格式。
41. When parsing and expanding a ${…} expansion that appears within double quotes, single quotes are no longer special and cannot be used to quote a closing brace or other special character, unless the operator is one of those defined to perform pattern removal. In this case, they do not have to appear as matched pairs.
42. 在解析和扩展双引号内的`${…}`扩展时，单引号不再是特殊字符，不能用于引用闭合大括号或其他特殊字符，除非操作符是被定义为执行模式移除的操作符。在这种情况下，它们不必成对出现。
43. The parser does not recognize `time` as a reserved word if the next token begins with a `-`.
44. 如果下一个标记以`-`开头，解析器不会将`time`视为保留字。
45. The `!` character does not introduce history expansion within a double-quoted string, even if the `histexpand` option is enabled.
46. 在双引号字符串内，即使启用了`histexpand`选项，`!`字符也不会引入历史扩展。
47. If a POSIX special builtin returns an error status, a non-interactive shell exits. The fatal errors are those listed in the POSIX standard, and include things like passing incorrect options, redirection errors, variable assignment errors for assignments preceding the command name, and so on.
48. 如果POSIX特殊内置命令返回错误状态，非交互式Shell将退出。致命错误是POSIX标准中列出的错误，包括传递不正确的选项、重定向错误、在命令名称前进行赋值的变量赋值错误等等。
49. A non-interactive shell exits with an error status if a variable assignment error occurs when no command name follows the assignment statements. A variable assignment error occurs, for example, when trying to assign a value to a readonly variable.
50. 如果在赋值语句后没有命令名，非交互式Shell将在变量赋值错误时退出。例如，尝试向只读变量赋值时会发生变量赋值错误。
51. A non-interactive shell exits with an error status if a variable assignment error occurs in an assignment statement preceding a special builtin, but not with any other simple command. For any other simple command, the shell aborts execution of that command, and execution continues at the top level ("the shell shall not perform any further processing of the command in which the error occurred").
52. 如果在特殊内置命令前的赋值语句中出现变量赋值错误，非交互式Shell将退出，但在任何其他简单命令中不会。对于任何其他简单命令，Shell将中止该命令的执行，并在顶层继续执行（“Shell不得对发生错误的命令执行任何进一步的处理”）。
53. A non-interactive shell exits with an error status if the iteration variable in a `for` statement or the selection variable in a `select` statement is a readonly variable.
54. 如果`for`语句中的迭代变量或`select`语句中的选择变量是只读变量，非交互式Shell将退出。
55. Non-interactive shells exit if filename in `.` filename is not found.
56. 在`.` filename`中`filename`的文件名未找到时，非交互式Shell将退出。
57. Non-interactive shells exit if a syntax error in an arithmetic expansion results in an invalid expression.
58. 如果算术扩展中的语法错误导致无效表达式，非交互式Shell将退出。
59. Non-interactive shells exit if a parameter expansion error occurs.
60. 如果参数扩展错误发生，非交互式Shell将退出。
61. Non-interactive shells exit if there is a syntax error in a script read with the `.` or `source` builtins, or in a string processed by the `eval` builtin.
62. 如果`source`内置命令读取的脚本或`eval`内置命令处理的字符串中存在语法错误，非交互式Shell将退出。
63. While variable indirection is available, it may not be applied to the `#` and `?` special parameters.
64. 虽然变量间接引用可用，但不能应用于`#`和`?`特殊参数。
65. Expanding the `*` special parameter in a pattern context where the expansion is double-quoted does not treat the `$*` as if it were double-quoted.
66. 在扩展为双引号的模式上下文中扩展`*`特殊参数时，不将`$*`视为已扩展为双引号。
67. Assignment statements preceding POSIX special builtins persist in the shell environment after the builtin completes.
68. POSIX特殊内置命令之前的赋值语句在内置完成后会保留在Shell环境中。
69. The `command` builtin does not prevent builtins that take assignment statements as arguments from expanding them as assignment statements; when not in POSIX mode, assignment builtins lose their assignment statement expansion properties when preceded by `command`.
70. `command`内置命令不会阻止带有赋值语句作为参数的内置命令将其作为赋值语句扩展；当不在POSIX模式下时，如果在`command`之前的赋值内置命令，那么在其之前它会失去赋值语句扩展属性。
71. The `bg` builtin uses the required format to describe each job placed in the background, which does not include an indication of whether the job is the current or previous job.
72. `bg`内置命令使用所需的格式来描述放在后台的每个作业，其中不包括该作业是否是当前或上一个作业的指示。
73. The output of `kill -l` prints all the signal names on a single line, separated by spaces, without the `SIG` prefix.
74. `kill -l`的输出打印所有信号名称在一行上，用空格分隔，没有`SIG`前缀。
75. The `kill` builtin does not accept signal names with a `SIG` prefix.
76. `kill`内置命令不接受带有`SIG`前缀的信号名称。
77. The `export` and `readonly` builtin commands display their output in the format required by POSIX.
78. `export`和`readonly`内置命令以POSIX要求的格式显示它们的输出。
79. The `trap` builtin displays signal names without the leading `SIG`.
80. `trap`内置命令显示没有前缀`SIG`的信号名称。
81. The `trap` builtin doesn't check the first argument for a possible signal specification and revert the signal handling to the original disposition if it is, unless that argument consists solely of digits and is a valid signal number. If users want to reset the handler for a given signal to the original disposition, they should use `-` as the first argument.
82. `trap`内置命令不检查第一个参数是否可能是信号规范，并在如果它是，则将信号处理恢复为原始状态，除非该参数仅由数字组成并且是一个有效的信号编号。如果用户想要将给定信号的处理程序重置为原始状态，则应使用`-`作为第一个参数。
83. `trap -p` displays signals whose dispositions are set to SIG_DFL and those that were ignored when the shell started.
84. `trap -p`显示将信号处理状态设置为SIG_DFL以及在Shell启动时忽略的信号。
85. The `.` and `source` builtins do not search the current directory for the filename argument if it is not found by searching `PATH`.
86. `.`和`source`内置命令如果在`PATH`中找不到文件名参数，则不会搜索当前目录。
87. Enabling POSIX mode has the effect of setting the `inherit_errexit` option, so subshells spawned to execute command substitutions inherit the value of the -e option from the parent shell. When the `inherit_errexit` option is not enabled, Bash clears the -e option in such subshells.
88. 启用POSIX模式会导致设置`inherit_errexit`选项，因此用于执行命令替换的子Shell会继承来自父Shell的`-e`选项的值。当未启用`inherit_errexit`选项时，这样的子Shell会清除`-e`选项。
89. Enabling POSIX mode has the effect of setting the `shift_verbose` option, so numeric arguments to `shift` that exceed the number of positional parameters will result in an error message.
90. 启用POSIX模式会导致设置`shift_verbose`选项，因此`shift`的数值参数如果超过位置参数的数量将导致错误消息。
91. When the `alias` builtin displays alias definitions, it does not display them with a leading `alias ` unless the -p option is supplied.
92. 当不提供`-p`选项时，`alias`内置命令在显示别名定义时不会显示前缀`alias`。
93. When the `set` builtin is invoked without options, it does not display shell function names and definitions.
94. 当没有选项调用`set`内置命令时，不会显示Shell函数名称和定义。
95. When the `set` builtin is invoked without options, it displays variable values without quotes, unless they contain shell metacharacters, even if the result contains nonprinting characters.
96. 当没有选项调用`set`内置命令时，显示变量值时不会显示引号，除非它们包含Shell元字符，即使结果包含非打印字符。
97. When the `cd` builtin is invoked in logical mode, and the pathname constructed from `$PWD` and the directory name supplied as an argument does not refer to an existing directory, `cd` will fail instead of falling back to physical mode.
98. 当在逻辑模式下调用`cd`内置命令，并且从`$PWD`和作为参数提供的目录名构建的路径名不引用现有目录时，`cd`将失败而不是退回到物理模式。
99. When the `cd` builtin cannot change a directory because the length of the pathname constructed from `$PWD` and the directory name supplied as an argument exceeds `PATH_MAX` when all symbolic links are expanded, `cd` will fail instead of attempting to use only the supplied directory name.
100. 当因为所有符号链接被展开而导致从`$PWD`和作为参数提供的目录名构建的路径名长度超过`PATH_MAX`时，`cd`将失败而不是尝试仅使用提供的目录名。
101. The `pwd` builtin verifies that the value it prints is the same as the current directory, even if it is not asked to check the file system with the -P option.
102. `pwd`内置命令验证其打印的值是否与当前目录相同，即使未要求使用`-P`选项检查文件系统。
103. When listing the history, the `fc` builtin does not include an indication of whether or not a history entry has been modified.
104. 列出历史记录时，`fc`内置命令不包括历史记录条目是否已被修改的指示。
105. The default editor used by `fc` is `ed`.
106. `fc`默认使用的编辑器是`ed`。
107. The `type` and `command` builtins will not report a non-executable file as having been found, though the shell will attempt to execute such a file if it is the only so-named file found in `$PATH`.
108. `type`和`command`内置命令将不会报告找到一个不可执行的文件，尽管如果Shell只找到一个这样的文件，则会尝试执行该文件。
109. The `vi` editing mode will invoke the `vi` editor directly when the `v` command is run, instead of checking `$VISUAL` and `$EDITOR`.
110. 在`vi`编辑模式下，运行`v`命令时，`vi`编辑器将直接调用，而不是检查`$VISUAL`和`$EDITOR`。
111. When the `xpg_echo` option is enabled, Bash does not attempt to interpret any arguments to `echo` as options. Each argument is displayed, after escape characters are converted.
112. 启用`xpg_echo`选项时，Bash不会尝试将`echo`的任何参数解释为选项。每个参数在转义字符被转换后显示。
113. The `ulimit` builtin uses a block size of 512 bytes for the -c and -f options.
114. `ulimit`内置命令在`-c`和`-f`选项上使用512字节的块大小。
115. The arrival of `SIGCHLD` when a trap is set on `SIGCHLD` does not interrupt the `wait` builtin and cause it to return immediately. The trap command is run once for each child that exits.
116. 当在`SIGCHLD`上设置陷阱时，`SIGCHLD`到达不会中断`wait`内置命令并导致它立即返回。陷阱命令会对每个退出的子进程运行一次。
117. The `read` builtin may be interrupted by a signal for which a trap has been set. If Bash receives a trapped signal while executing `read`, the trap handler executes and `read` returns an exit status greater than 128.
118. `read`内置命令可能被设置了陷阱的信号中断。如果在执行`read`时Bash接收到受限制信号，则陷阱处理程序会执行，并且`read`返回一个大于128的退出状态。
119. The `printf` builtin uses `double` (via `strtod`) to convert arguments corresponding to floating point conversion specifiers, instead of `long double` if it's available. The `L` length modifier forces `printf` to use `long double` if it's available.
120. `printf`内置命令使用`double`（通过`strtod`）来转换与浮点数转换说明符相对应的参数，如果可用，则使用`long double`。如果可用，则`L`长度修饰符会强制`printf`使用`long double`。
121. Bash removes an exited background process's status from the list of such statuses after the `wait` builtin is used to obtain it.
122. Bash在使用`wait`内置命令获取已完成进程的状态后会从此类状态列表中移除已退出的后台进程的状态。

There is other POSIX behavior that Bash does not implement by default even when in POSIX mode. Specifically:

​	还有一些Bash默认情况下不实现的其他POSIX行为，即使在POSIX模式下也是如此。具体包括：

1. The `fc` builtin checks `$EDITOR` as a program to edit history entries if `FCEDIT` is unset, rather than defaulting directly to `ed`. `fc` uses `ed` if `EDITOR` is unset.
2. `fc`内置命令在编辑历史记录条目时会检查`$EDITOR`作为编辑程序，如果未设置`FCEDIT`，而不是直接默认为`ed`。如果`EDITOR`未设置，`fc`将使用`ed`。
3. As noted above, Bash requires the `xpg_echo` option to be enabled for the `echo` builtin to be fully conformant.
4. 如前所述，Bash需要启用`xpg_echo`选项才能使`echo`内置命令完全符合规范。

Bash can be configured to be POSIX-conformant by default, by specifying the --enable-strict-posix-default to `configure` when building (see [Optional Features](https://www.gnu.org/software/bash/manual/bash.html#Optional-Features)).

​	Bash可以通过在构建时在`configure`中指定`--enable-strict-posix-default`来配置为默认符合POSIX规范（参见[Optional Features](https://www.gnu.org/software/bash/manual/bash.html#Optional-Features)）。





### 6.12 Shell Compatibility Mode



Bash-4.0 introduced the concept of a *shell compatibility level*, specified as a set of options to the shopt builtin (`compat31`, `compat32`, `compat40`, `compat41`, and so on). There is only one current compatibility level – each option is mutually exclusive. The compatibility level is intended to allow users to select behavior from previous versions that is incompatible with newer versions while they migrate scripts to use current features and behavior. It's intended to be a temporary solution.

​	Bash-4.0引入了*shell兼容性级别*的概念，通过一组shopt内置命令选项（`compat31`、`compat32`、`compat40`、`compat41`等）来指定。只有一个当前的兼容性级别 - 每个选项是互斥的。兼容性级别旨在允许用户选择先前版本的行为，这些行为与新版本不兼容，同时将脚本迁移到使用当前功能和行为。这是一个临时解决方案。

This section does not mention behavior that is standard for a particular version (e.g., setting `compat32` means that quoting the rhs of the regexp matching operator quotes special regexp characters in the word, which is default behavior in bash-3.2 and subsequent versions).

​	本节不涉及特定版本的标准行为（例如，设置`compat32`意味着在`bash-3.2`及以后版本中引用`[[`命令的正则表达式匹配运算符（=~）的rhs时没有特殊效果）。

If a user enables, say, `compat32`, it may affect the behavior of other compatibility levels up to and including the current compatibility level. The idea is that each compatibility level controls behavior that changed in that version of Bash, but that behavior may have been present in earlier versions. For instance, the change to use locale-based comparisons with the `[[` command came in bash-4.1, and earlier versions used ASCII-based comparisons, so enabling `compat32` will enable ASCII-based comparisons as well. That granularity may not be sufficient for all uses, and as a result users should employ compatibility levels carefully. Read the documentation for a particular feature to find out the current behavior.

​	如果用户启用了例如`compat32`，它可能会影响其他兼容性级别的行为，包括当前的兼容性级别。每个兼容性级别控制在该Bash版本中发生的行为更改，但这种行为可能在较早的版本中存在。例如，使用基于区域设置的比较来执行`[[`命令的更改是在`bash-4.1`中引入的，而较早的版本使用基于ASCII的比较，因此启用`compat32`也会启用基于ASCII的比较。这种粒度可能对所有用途都不够充分，因此用户应谨慎使用兼容性级别。要了解当前行为，请阅读特定功能的文档。

Bash-4.3 introduced a new shell variable: `BASH_COMPAT`. The value assigned to this variable (a decimal version number like 4.2, or an integer corresponding to the `compat`NN option, like 42) determines the compatibility level.

​	Bash-4.3引入了一个新的Shell变量：`BASH_COMPAT`。分配给此变量的值（一个十进制版本号，如4.2，或对应于`compat`NN选项的整数，如42）确定兼容性级别。

Starting with bash-4.4, Bash has begun deprecating older compatibility levels. Eventually, the options will be removed in favor of `BASH_COMPAT`.

​	从`bash-4.4`开始，Bash开始弃用旧的兼容性级别。最终，这些选项将被`BASH_COMPAT`取代。

Bash-5.0 is the final version for which there will be an individual shopt option for the previous version. Users should use `BASH_COMPAT` on bash-5.0 and later versions.

​	`bash-5.0`是最后一个为上一个版本提供单独的shopt选项的版本。用户应该在`bash-5.0`及更高版本中使用`BASH_COMPAT`。

The following table describes the behavior changes controlled by each compatibility level setting. The `compat`NN tag is used as shorthand for setting the compatibility level to NN using one of the following mechanisms. For versions prior to bash-5.0, the compatibility level may be set using the corresponding `compat`NN shopt option. For bash-4.3 and later versions, the `BASH_COMPAT` variable is preferred, and it is required for bash-5.1 and later versions.

​	以下表格描述了每个兼容性级别设置控制的行为更改。使用`compat`NN标记作为简写方式，使用以下机制之一将兼容性级别设置为NN。对于`bash-5.0`之前的版本，可以使用相应的`compat`NN shopt选项来设置兼容性级别。对于`bash-4.3`及更高版本，首选`BASH_COMPAT`变量，并且`bash-5.1`及更高版本需要使用它。

- `compat31`

  - quoting the rhs of the `[[` command's regexp matching operator (=~) has no special effect
  - 引用`[[`命令的正则表达式匹配运算符（=~）的rhs不会产生特殊效果。

- `compat32`

  - interrupting a command list such as "a ; b ; c" causes the execution of the next command in the list (in bash-4.0 and later versions, the shell acts as if it received the interrupt, so interrupting one command in a list aborts the execution of the entire list)
  - 中断一个命令列表（例如 "a ; b ; c"）会导致执行列表中的下一个命令（在`bash-4.0`及更高版本中，Shell会像收到中断一样处理，因此中断列表中的一个命令会中止整个列表的执行）。

- `compat40`

  - the `<` and `>` operators to the `[[` command do not consider the current locale when comparing strings; they use ASCII ordering. Bash versions prior to bash-4.1 use ASCII collation and strcmp(3); bash-4.1 and later use the current locale's collation sequence and strcoll(3).
  - `[[`命令中的`<`和`>`操作符在比较字符串时不考虑当前区域设置；它们使用ASCII排序。`bash-4.1`之前的Bash版本使用ASCII排序和strcmp(3)；`bash-4.1`及更高版本使用当前区域设置的排序序列和strcoll(3)。

- `compat41`

  - in posix mode, `time` may be followed by options and still be recognized as a reserved word (this is POSIX interpretation 267)
  - 在posix模式下，`time`可以在后面跟随选项，仍然会被识别为保留字（这是POSIX解释267）。
  - in posix mode, the parser requires that an even number of single quotes occur in the word portion of a double-quoted ${…} parameter expansion and treats them specially, so that characters within the single quotes are considered quoted (this is POSIX interpretation 221)
  - 在posix模式下，解析器要求在双引号${…}参数扩展的单词部分中的单引号成对出现偶数次，并且对它们进行特殊处理，以使单引号内的字符被视为已引用（这是POSIX解释221）。

- `compat42`

  - the replacement string in double-quoted pattern substitution does not undergo quote removal, as it does in versions after bash-4.2
  - 双引号模式替换中的替换字符串不会进行引号删除，如在`bash-4.2`之后的版本中一样。
  - in posix mode, single quotes are considered special when expanding the word portion of a double-quoted ${…} parameter expansion and can be used to quote a closing brace or other special character (this is part of POSIX interpretation 221); in later versions, single quotes are not special within double-quoted word expansions
  - 在posix模式下，当扩展双引号`${…}`参数扩展的单词部分时，单引号被视为特殊字符，并可用于引用右括号或其他特殊字符（这是POSIX解释221）；在后续版本中，在双引号中的单引号在扩展时不再是特殊字符。

- `compat43`

  - the shell does not print a warning message if an attempt is made to use a quoted compound assignment as an argument to declare (e.g., declare -a foo=`(1 2)`). Later versions warn that this usage is deprecated
  - 如果尝试将引号复合赋值作为declare的参数（例如`declare -a foo=`(1 2)`）使用，Shell不会打印警告消息。在后续版本中，会警告此用法已弃用。
  - word expansion errors are considered non-fatal errors that cause the current command to fail, even in posix mode (the default behavior is to make them fatal errors that cause the shell to exit)
  - 单词扩展错误被视为非致命错误，即使在posix模式下也会导致当前命令失败（默认行为是使它们成为导致Shell退出的致命错误）。
  - when executing a shell function, the loop state (while/until/etc.) is not reset, so `break` or `continue` in that function will break or continue loops in the calling context. Bash-4.4 and later reset the loop state to prevent this
  - 执行Shell函数时，循环状态（while/until等）不会被重置，因此在该函数中的`break`或`continue`将中断或继续调用上下文中的循环。`bash-4.4`及更高版本会重置循环状态以防止这种情况发生。

- `compat44`

  - the shell sets up the values used by `BASH_ARGV` and `BASH_ARGC` so they can expand to the shell's positional parameters even if extended debugging mode is not enabled
  - Shell设置了用于`BASH_ARGV`和`BASH_ARGC`的值，以便即使未启用扩展调试模式，它们也可以扩展为Shell的位置参数。
  - a subshell inherits loops from its parent context, so `break` or `continue` will cause the subshell to exit. Bash-5.0 and later reset the loop state to prevent the exit
  - 子Shell继承了父上下文中的循环，因此`break`或`continue`将导致子Shell退出。`bash-5.0`及更高版本重置循环状态以防止退出。
  - variable assignments preceding builtins like `export` and `readonly` that set attributes continue to affect variables with the same name in the calling environment even if the shell is not in posix mode
  - 在不是posix模式的情况下，设置属性的变量赋值在Shell不是posix模式时，继续影响调用环境中具有相同名称的变量。

- `compat50 (set using BASH_COMPAT)`

  - Bash-5.1 changed the way `$RANDOM` is generated to introduce slightly more randomness. If the shell compatibility level is set to 50 or lower, it reverts to the method from bash-5.0 and previous versions, so seeding the random number generator by assigning a value to `RANDOM` will produce the same sequence as in bash-5.0
  - `bash-5.1`更改了生成`$RANDOM`的方式，引入了稍微更多的随机性。如果Shell兼容性级别设置为50或更低，则会恢复到`bash-5.0`及之前版本的方法，因此通过给`RANDOM`分配一个值来初始化随机数生成器会产生与`bash-5.0`相同的序列。
  - If the command hash table is empty, Bash versions prior to bash-5.1 printed an informational message to that effect, even when producing output that can be reused as input. Bash-5.1 suppresses that message when the -l option is supplied.
  - 如果命令哈希表为空，则`bash-5.1`之前的Bash版本会打印一条信息，即使产生的输出可以重新用作输入。当提供了-l选项时，`bash-5.1`不会显示该消息。

- `compat51 (set using BASH_COMPAT)`

  - The `unset` builtin will unset the array `a` given an argument like `a[@]`. Bash-5.2 will unset an element with key `@` (associative arrays) or remove all the elements without unsetting the array (indexed arrays)
  - `unset`内置命令将会删除数组`a`，给定类似`a[@]`的参数。`bash-5.2`将会删除具有键`@`（关联数组）的元素，或者删除所有元素而不会删除数组（索引数组）。
  - arithmetic commands ( ((...)) ) and the expressions in an arithmetic for statement can be expanded more than onceexpressions used as arguments to arithmetic operators in the `[[` conditional command can be expanded more than once
  - 算术命令（((...))）和算术for语句中的表达式可以扩展多次；用作`[[`条件命令中算术运算符的参数的表达式可以扩展多次。
  - the expressions in substring parameter brace expansion can be expanded more than once
  - 子字符串参数花括号扩展中的表达式可以扩展多次。
  - the expressions in the `$(( ... ))` word expansion can be expanded more than oncearithmetic expressions used as indexed array subscripts can be expanded more than once
  - `$(( ... ))`单词扩展中的表达式可以扩展多次；用作索引数组下标的算术表达式也可以扩展多次。
  - `test -v`, when given an argument of `A[@]`, where A is an existing associative array, will return true if the array has any set elements. Bash-5.2 will look for and report on a key named `@`
  - `test -v`，给定参数`A[@]`，其中A是一个已存在的关联数组，如果数组有任何已设置的元素，则返回true。`bash-5.2`将寻找并报告名为`@`的键。
  - the `${parameter[:]=value}` word expansion will return value, before any variable-specific transformations have been performed (e.g., converting to lowercase). Bash-5.2 will return the final value assigned to the variable.
  - `${parameter[:]=value}`单词扩展将在执行任何变量特定的转换（例如转换为小写）之前返回value。`bash-5.2`将返回分配给变量的最终值。
  - Parsing command substitutions will behave as if extended glob (see [The Shopt Builtin](#432--shopt内置命令)) is enabled, so that parsing a command substitution containing an extglob pattern (say, as part of a shell function) will not fail. This assumes the intent is to enable extglob before the command is executed and word expansions are performed. It will fail at word expansion time if extglob hasn't been enabled by the time the command is executed.
  - 解析命令替换时将表现得好像启用了扩展模式（参见[The Shopt Builtin](#432--shopt内置命令)），因此解析包含extglob模式的命令替换（例如作为Shell函数的一部分）不会失败。这假设意图是在执行命令和进行单词扩展之前启用extglob模式。如果在执行命令时还未启用extglob，则在单词扩展时将失败。





## 7 作业控制

This chapter discusses what job control is, how it works, and how Bash allows you to access its facilities.

​	本章讨论作业控制是什么，它是如何工作的，以及Bash如何允许您访问其功能。





### 7.1 作业控制基础



Job control refers to the ability to selectively stop (suspend) the execution of processes and continue (resume) their execution at a later point. A user typically employs this facility via an interactive interface supplied jointly by the operating system kernel's terminal driver and Bash.

​	作业控制是指有选择地停止（暂停）进程的执行并在以后的某个时间点继续（恢复）其执行。用户通常通过操作系统内核的终端驱动程序和Bash共同提供的交互界面来使用此功能。

The shell associates a job with each pipeline. It keeps a table of currently executing jobs, which may be listed with the `jobs` command. When Bash starts a job asynchronously, it prints a line that looks like:

​	Shell将每个管道与一个作业相关联。它保持当前正在执行的作业的列表，并可以使用`jobs`命令列出这些作业。当Bash以异步方式启动作业时，它会打印一行，看起来像这样：

```
[1] 25647
```

indicating that this job is job number 1 and that the process ID of the last process in the pipeline associated with this job is 25647. All of the processes in a single pipeline are members of the same job. Bash uses the job abstraction as the basis for job control.

表示该作业是作业编号为1，并且与该作业关联的管道中的最后一个进程的进程ID为25647。单个管道中的所有进程都是同一作业的成员。Bash使用作业抽象作为作业控制的基础。

To facilitate the implementation of the user interface to job control, the operating system maintains the notion of a current terminal process group ID. Members of this process group (processes whose process group ID is equal to the current terminal process group ID) receive keyboard-generated signals such as `SIGINT`. These processes are said to be in the foreground. Background processes are those whose process group ID differs from the terminal's; such processes are immune to keyboard-generated signals. Only foreground processes are allowed to read from or, if the user so specifies with `stty tostop`, write to the terminal. Background processes which attempt to read from (write to when `stty tostop` is in effect) the terminal are sent a `SIGTTIN` (`SIGTTOU`) signal by the kernel's terminal driver, which, unless caught, suspends the process.

​	为了方便实现作业控制的用户接口，操作系统维护了当前终端进程组ID的概念。该进程组的成员（其进程组ID等于当前终端进程组ID）接收键盘生成的信号，例如`SIGINT`。这些进程称为前台进程。后台进程是其进程组ID与终端的不同的进程；这样的进程对键盘生成的信号免疫。只有前台进程允许从终端读取或（如果用户通过`stty tostop`指定）写入。后台进程如果尝试从终端读取（在`stty tostop`生效时写入）将被内核的终端驱动程序发送`SIGTTIN`（`SIGTTOU`）信号，除非捕获，否则会挂起该进程。

If the operating system on which Bash is running supports job control, Bash contains facilities to use it. Typing the *suspend* character (typically `^Z`, Control-Z) while a process is running causes that process to be stopped and returns control to Bash. Typing the *delayed suspend* character (typically `^Y`, Control-Y) causes the process to be stopped when it attempts to read input from the terminal, and control to be returned to Bash. The user then manipulates the state of this job, using the `bg` command to continue it in the background, the `fg` command to continue it in the foreground, or the `kill` command to kill it. A `^Z` takes effect immediately, and has the additional side effect of causing pending output and typeahead to be discarded.

​	如果支持Bash运行的操作系统支持作业控制，Bash包含使用它的功能。在进程运行时键入*暂停* 字符（通常为`^Z`，Control-Z）会导致该进程停止并将控制权返回给Bash。键入 *延迟暂停* 字符（通常为`^Y`，Control-Y）会导致进程在尝试从终端读取输入时停止，并将控制权返回给Bash。然后用户可以使用`bg`命令将作业继续在后台运行，使用`fg`命令将作业继续在前台运行，或者使用`kill`命令将其终止。`^Z`立即生效，并且附加的副作用是导致未决的输出和预读被丢弃。

There are a number of ways to refer to a job in the shell. The character `%` introduces a job specification (*jobspec*).

​	在Shell中有许多引用作业的方式。字符`％`引入了作业规范（ *jobspec* ）。

Job number `n` may be referred to as `%n`. The symbols `%%` and `%+` refer to the shell's notion of the current job, which is the last job stopped while it was in the foreground or started in the background. A single `%` (with no accompanying job specification) also refers to the current job. The previous job may be referenced using `%-`. If there is only a single job, `%+` and `%-` can both be used to refer to that job. In output pertaining to jobs (e.g., the output of the `jobs` command), the current job is always flagged with a `+`, and the previous job with a `-`.

​	作业号`n`可以表示为`％n`。符号`%%`和`%+`指的是Shell对当前作业的概念，即最后一个在前台停止或在后台启动的作业。只有`％`（没有随附的作业规范）也指代当前作业。可以使用`%-`引用上一个作业。如果只有一个作业，则`%+`和`%-`都可以用于指代该作业。在与作业相关的输出中（例如，`jobs`命令的输出），当前作业始终带有`+`标志，上一个作业带有`-`标志。

A job may also be referred to using a prefix of the name used to start it, or using a substring that appears in its command line. For example, `%ce` refers to a stopped job whose command name begins with `ce`. Using `%?ce`, on the other hand, refers to any job containing the string `ce` in its command line. If the prefix or substring matches more than one job, Bash reports an error.

​	作业还可以使用其启动名称的前缀或出现在其命令行中的子字符串来引用。例如，`％ce`引用了一个其命令名称以`ce`开头的停止作业。然而，使用`％?ce`指的是包含字符串`ce`的任何作业。如果前缀或子字符串匹配多个作业，Bash会报告错误。

Simply naming a job can be used to bring it into the foreground: `%1` is a synonym for `fg %1`, bringing job 1 from the background into the foreground. Similarly, `%1 &` resumes job 1 in the background, equivalent to `bg %1`

​	仅仅命名一个作业可用于将其带入前台：`％1`是将作业1从后台带入前台的同义词。类似地，`％1＆`会在后台恢复作业1，相当于`bg％1`。

The shell learns immediately whenever a job changes state. Normally, Bash waits until it is about to print a prompt before reporting changes in a job's status so as to not interrupt any other output. If the -b option to the `set` builtin is enabled, Bash reports such changes immediately (see [The Set Builtin](#431-内置命令set)). Any trap on `SIGCHLD` is executed for each child process that exits.

​	Shell立即得知作业更改状态。通常，Bash在打印提示之前等待报告作业状态的更改，以不中断其他输出。如果启用`set`内置命令的-b选项，则Bash会立即报告此类更改（请参阅[The Set Builtin](#431-内置命令set)）。每个子进程退出时，`SIGCHLD`的任何陷阱都会被执行。

If an attempt to exit Bash is made while jobs are stopped, (or running, if the `checkjobs` option is enabled – see [The Shopt Builtin](#432--shopt内置命令)), the shell prints a warning message, and if the `checkjobs` option is enabled, lists the jobs and their statuses. The `jobs` command may then be used to inspect their status. If a second attempt to exit is made without an intervening command, Bash does not print another warning, and any stopped jobs are terminated.

​	如果在作业暂停时（或如果启用了`checkjobs`选项，则在运行时）尝试退出Bash，则Shell会打印一条警告消息，如果启用了`checkjobs`选项，则列出作业及其状态。然后可以使用`jobs`命令检查它们的状态。如果在没有中间命令的情况下再次尝试退出，则Bash不会打印另一个警告，并且任何已停止的作业都将终止。

When the shell is waiting for a job or process using the `wait` builtin, and job control is enabled, `wait` will return when the job changes state. The -f option causes `wait` to wait until the job or process terminates before returning.

​	当Shell使用`wait`内置命令等待作业或进程，并且启用了作业控制时，`wait`将在作业更改状态时返回。-f选项导致`wait`在作业或进程终止之前等待。





### 7.2 作业控制内置命令

- `bg`

  ```
  bg [jobspec …]
  ```

  Resume each suspended job jobspec in the background, as if it had been started with `&`. If jobspec is not supplied, the current job is used. The return status is zero unless it is run when job control is not enabled, or, when run with job control enabled, any jobspec was not found or specifies a job that was started without job control.

  将每个挂起的作业（jobspec）在后台恢复运行，就像使用 `&` 启动它一样。如果未提供 jobspec，则使用当前作业。返回状态为零，除非在未启用作业控制时运行，或在启用作业控制的情况下，找不到 jobspec 或指定的作业是在没有作业控制的情况下启动的。

- `fg`

  ```
  fg [jobspec]
  ```

  Resume the job jobspec in the foreground and make it the current job. If jobspec is not supplied, the current job is used. The return status is that of the command placed into the foreground, or non-zero if run when job control is disabled or, when run with job control enabled, jobspec does not specify a valid job or jobspec specifies a job that was started without job control.

  将作业（jobspec）在前台恢复运行，并将其设置为当前作业。如果未提供 jobspec，则使用当前作业。返回状态是被放在前台的命令的状态，或者在禁用作业控制时运行或在启用作业控制的情况下 jobspec 未指定有效作业或指定了在没有作业控制的情况下启动的作业。

- `jobs`

  ```
  jobs [-lnprs] [jobspec]
  jobs -x command [arguments]
  ```

  The first form lists the active jobs. The options have the following meanings:

  第一种形式列出所有活动作业。选项的含义如下：

  - `-l`:  List process IDs in addition to the normal information.

  - `-n`:  Display information only about jobs that have changed status since the user was last notified of their status.

  - `-p`:  List only the process ID of the job's process group leader.

  - `-r`:  Display only running jobs.

  - `-s`: Display only stopped jobs.
  - `-l`：除了常规信息外，还列出进程 ID。
  - `-n`：仅显示自上次用户上次通知其状态以来更改状态的作业信息。
  - `-p`：仅列出作业的进程组组长的进程 ID。
  - `-r`：仅显示正在运行的作业。
  - `-s`：仅显示停止的作业。

  

  If jobspec is given, output is restricted to information about that job. If jobspec is not supplied, the status of all jobs is listed.

  如果提供了 jobspec，则输出仅限于有关该作业的信息。如果未提供 jobspec，则列出所有作业的状态。

  If the -x option is supplied, `jobs` replaces any jobspec found in command or arguments with the corresponding process group ID, and executes command, passing it arguments, returning its exit status.

  如果提供了 `-x` 选项，则 `jobs` 将任何在 command 或 arguments 中找到的 jobspec 替换为相应的进程组 ID，并执行 command，并传递其参数，返回其退出状态。

- `kill`

  ```
  kill [-s sigspec] [-n signum] [-sigspec] jobspec or pid
  kill -l|-L [exit_status]
  ```

  Send a signal specified by sigspec or signum to the process named by job specification jobspec or process ID pid. sigspec is either a case-insensitive signal name such as `SIGINT` (with or without the `SIG` prefix) or a signal number; signum is a signal number. If sigspec and signum are not present, `SIGTERM` is used. The -l option lists the signal names. If any arguments are supplied when -l is given, the names of the signals corresponding to the arguments are listed, and the return status is zero. exit_status is a number specifying a signal number or the exit status of a process terminated by a signal. The -L option is equivalent to -l. The return status is zero if at least one signal was successfully sent, or non-zero if an error occurs or an invalid option is encountered.

  向由作业规范 jobspec 或进程 ID pid 指定的进程发送由 sigspec 或 signum 指定的信号。sigspec 可以是大小写不敏感的信号名称，例如 `SIGINT`（带或不带 `SIG` 前缀），也可以是信号编号；signum 是信号编号。如果 sigspec 和 signum 都不存在，则使用 `SIGTERM` 信号。`-l` 选项列出信号名称。如果在给出 `-l` 时提供了任何参数，则列出与参数对应的信号名称，并返回状态为零。exit_status 是指定信号编号或由信号终止的进程的退出状态的数字。`-L` 选项等效于 `-l`。如果成功发送了至少一个信号，则返回状态为零，否则如果发生错误或遇到无效选项，则返回非零。

- `wait`

  ```
  wait [-fn] [-p varname] [jobspec or pid …]
  ```

  Wait until the child process specified by each process ID pid or job specification jobspec exits and return the exit status of the last command waited for. If a job spec is given, all processes in the job are waited for. If no arguments are given, `wait` waits for all running background jobs and the last-executed process substitution, if its process id is the same as $!, and the return status is zero. If the -n option is supplied, `wait` waits for a single job from the list of pids or jobspecs or, if no arguments are supplied, any job, to complete and returns its exit status. If none of the supplied arguments is a child of the shell, or if no arguments are supplied and the shell has no unwaited-for children, the exit status is 127. If the -p option is supplied, the process or job identifier of the job for which the exit status is returned is assigned to the variable varname named by the option argument. The variable will be unset initially, before any assignment. This is useful only when the -n option is supplied. Supplying the -f option, when job control is enabled, forces `wait` to wait for each pid or jobspec to terminate before returning its status, instead of returning when it changes status. If neither jobspec nor pid specifies an active child process of the shell, the return status is 127. If `wait` is interrupted by a signal, the return status will be greater than 128, as described above (see [Signals](#376-信号)). Otherwise, the return status is the exit status of the last process or job waited for.

  等待由每个进程 ID pid 或作业规范 jobspec 指定的子进程退出，并返回最后等待的命令的退出状态。如果给出作业规范，则等待该作业中的所有进程。如果未提供任何参数，则 `wait` 等待所有正在运行的后台作业和最后执行的进程替代，如果其进程 ID 与 `$!` 相同，则返回状态为零。如果提供了 `-n` 选项，则 `wait` 等待来自 pid 或 jobspecs 列表中的单个作业，如果未提供任何参数，则等待任何作业完成，并返回其退出状态。如果提供的参数不是 shell 的子进程，或者如果没有提供参数且 shell 没有未等待的子进程，则退出状态为 127。如果提供了 `-p` 选项，则返回的退出状态为该选项参数指定的变量 varname 的进程或作业标识符。在任何赋值之前，该变量最初为未设置状态。这仅在提供 `-n` 选项时有用。在启用作业控制时，提供 `-f` 选项会强制 `wait` 在返回其状态之前等待每个 pid 或 jobspec 终止，而不是在其更改状态时返回。如果 jobspec 和 pid 都不指定 shell 的活动子进程，则返回状态为 127。如果 `wait` 被信号中断，则返回状态将大于 128，如上述所述（请参阅[Signals](#376-信号)）。否则，返回状态为最后一个等待的进程或作业的退出状态。

- `disown`

  ```
  disown [-ar] [-h] [jobspec … | pid … ]
  ```

  Without options, remove each jobspec from the table of active jobs. If the -h option is given, the job is not removed from the table, but is marked so that `SIGHUP` is not sent to the job if the shell receives a `SIGHUP`. If jobspec is not present, and neither the -a nor the -r option is supplied, the current job is used. If no jobspec is supplied, the -a option means to remove or mark all jobs; the -r option without a jobspec argument restricts operation to running jobs.

  在没有选项的情况下，从活动作业表中删除每个 jobspec。如果给出了 `-h` 选项，则该作业不会从表中删除，但是如果 Shell 接收到 `SIGHUP`，则会将其标记为不发送给作业。如果没有 jobspec 存在，且未提供 `-a` 或 `-r` 选项，则使用当前作业。如果未提供 jobspec，则 `-a` 选项意味着删除或标记所有作业；没有 jobspec 参数的 `-r` 选项将操作限制为运行中的作业。

- `suspend`

  ```
  suspend [-f]
  ```
  
  Suspend the execution of this shell until it receives a `SIGCONT` signal. A login shell, or a shell without job control enabled, cannot be suspended; the -f option can be used to override this and force the suspension. The return status is 0 unless the shell is a login shell or job control is not enabled and -f is not supplied.
  
  暂停此 Shell 的执行，直到收到 `SIGCONT` 信号。登录 Shell 或未启用作业控制的 Shell 无法暂停；`-f` 选项可用于覆盖此设置并强制挂起。返回状态为 0，除非 Shell 是登录 Shell 或未启用作业控制且未提供 `-f`。

When job control is not active, the `kill` and `wait` builtins do not accept jobspec arguments. They must be supplied process IDs.

​	当作业控制未激活时，`kill` 和 `wait` 内置命令不接受作业规范（jobspec）参数。必须提供进程 ID。





### 7.3 作业控制变量

- `auto_resume`

  This variable controls how the shell interacts with the user and job control. If this variable exists then single word simple commands without redirections are treated as candidates for resumption of an existing job. There is no ambiguity allowed; if there is more than one job beginning with the string typed, then the most recently accessed job will be selected. The name of a stopped job, in this context, is the command line used to start it. If this variable is set to the value `exact`, the string supplied must match the name of a stopped job exactly; if set to `substring`, the string supplied needs to match a substring of the name of a stopped job. The `substring` value provides functionality analogous to the `%?` job ID (see [Job Control Basics](#7-作业控制-Basics)). If set to any other value, the supplied string must be a prefix of a stopped job's name; this provides functionality analogous to the `%` job ID.
  
  此变量控制Shell与用户和作业控制的交互方式。如果此变量存在，则不带重定向的单词简单命令将被视为恢复现有作业的候选项。不允许任何歧义；如果有多个以输入的字符串开头的作业，则选择最近访问的作业。在此上下文中，已停止作业的名称是启动它的命令行。如果此变量设置为值 `exact`，则所提供的字符串必须与已停止作业的名称完全匹配；如果设置为 `substring`，则所提供的字符串需要与已停止作业名称的子字符串匹配。`substring` 值提供类似于 `%?` 作业 ID（见 [作业控制基础](#7-作业控制-Basics)）。如果设置为其他任何值，则所提供的字符串必须是已停止作业名称的前缀；这提供了类似于 `%` 作业 ID 的功能。







## 8 命令行编辑

This chapter describes the basic features of the GNU command line editing interface. Command line editing is provided by the Readline library, which is used by several different programs, including Bash. Command line editing is enabled by default when using an interactive shell, unless the --noediting option is supplied at shell invocation. Line editing is also used when using the -e option to the `read` builtin command (see [Bash Builtin Commands](#42-bash-内置命令)). By default, the line editing commands are similar to those of Emacs. A vi-style line editing interface is also available. Line editing can be enabled at any time using the -o emacs or -o vi options to the `set` builtin command (see [The Set Builtin](#431-内置命令set)), or disabled using the +o emacs or +o vi options to `set`.

​	本章描述GNU命令行编辑接口的基本特性。命令行编辑由Readline库提供，多个不同的程序使用它，包括Bash。当使用交互式Shell时，默认情况下启用命令行编辑，除非在Shell调用时提供了 `--noediting` 选项。在使用 `read` 内置命令时（参见[Bash内置命令](#42-bash-内置命令)），也会使用行编辑。默认情况下，行编辑命令类似于Emacs的命令。还提供了Vi风格的行编辑接口。可以随时使用 `-o emacs` 或 `-o vi` 选项来启用行编辑，或使用 `+o emacs` 或 `+o vi` 选项来禁用行编辑，这些选项是 `set` 内置命令的一部分（参见 [set 内置命令](#431-内置命令set)）。






### 8.1 命令行编辑简介 Introduction to Line Editing

The following paragraphs describe the notation used to represent keystrokes.

​	以下段落描述了表示按键的符号约定。

The text C-k is read as `Control-K` and describes the character produced when the `k` key is pressed while the Control key is depressed.

​	文本 `C-k` 表示按下 `k` 键同时按下 Control 键时产生的字符。

The text M-k is read as `Meta-K` and describes the character produced when the Meta key (if you have one) is depressed, and the `k` key is pressed. The Meta key is labeled `ALT` on many keyboards. On keyboards with two keys labeled `ALT` (usually to either side of the space bar), the `ALT` on the left side is generally set to work as a Meta key. The `ALT` key on the right may also be configured to work as a Meta key or may be configured as some other modifier, such as a Compose key for typing accented characters.

​	文本 `M-k` 表示在按下 Meta 键（如果您有的话）的同时按下 `k` 键时产生的字符。在许多键盘上，Meta 键标记为 `ALT`。对于带有两个标记为 `ALT` 的键的键盘（通常位于空格键的两侧），左侧的 `ALT` 通常被设置为工作为 Meta 键。右侧的 `ALT` 键也可以被配置为工作为 Meta 键，或者可以被配置为其他修饰键，比如用于输入带重音字符的组合键。

If you do not have a Meta or `ALT` key, or another key working as a Meta key, the identical keystroke can be generated by typing `ESC` *first*, and then typing `k`. Either process is known as *metafying* the `k` key.

​	如果您没有 Meta 键或 `ALT` 键，或者没有其他工作为 Meta 键的键，那么可以通过首先键入 `ESC`，然后再键入 `k` 来生成相同的按键。无论哪种方式，都被称为将 `k` 键转换为 Meta 键。

The text M-C-k is read as `Meta-Control-k` and describes the character produced by *metafying* C-k.

​	文本 `M-C-k` 表示在将 C-k 转换为 Meta 键后产生的字符。

In addition, several keys have their own names. Specifically, `DEL`, `ESC`, `LFD`, `SPC`, `RET`, and `TAB` all stand for themselves when seen in this text, or in an init file (see [Readline Init File](#83-readline-初始化文件)). If your keyboard lacks a `LFD` key, typing `C-j` will produce the desired character. The `RET` key may be labeled `Return` or `Enter` on some keyboards.

​	此外，有几个按键有自己的名称。具体来说，`DEL`，`ESC`，`LFD`，`SPC`，`RET` 和 `TAB` 在本文或初始化文件（参见[Readline Init File](#83-readline-初始化文件)）中表示它们自己。如果您的键盘缺少 `LFD` 键，按下 `C-j` 将产生所需的字符。`RET` 键可能在某些键盘上标记为 `Return` 或 `Enter`。





### 8.2 Readline 交互



Often during an interactive session you type in a long line of text, only to notice that the first word on the line is misspelled. The Readline library gives you a set of commands for manipulating the text as you type it in, allowing you to just fix your typo, and not forcing you to retype the majority of the line. Using these editing commands, you move the cursor to the place that needs correction, and delete or insert the text of the corrections. Then, when you are satisfied with the line, you simply press `RET`. You do not have to be at the end of the line to press `RET`; the entire line is accepted regardless of the location of the cursor within the line.

​	在交互式会话期间，通常会输入一长行文本，但在发现行首单词拼写错误时，您只想纠正拼写错误，而不是重新输入大部分行。Readline 库为您提供了一组命令，以便在输入文本时对其进行操作，让您可以移动光标到需要更正的位置，并删除或插入更正的文本。然后，当您对整行满意时，只需按下 `RET` 即可。您不必在行尾按下 `RET`；无论光标在行中的位置如何，整行都会被接受。











#### 8.2.1 Readline 基本编辑



In order to enter characters into the line, simply type them. The typed character appears where the cursor was, and then the cursor moves one space to the right. If you mistype a character, you can use your erase character to back up and delete the mistyped character.

​	为了在行中输入字符，只需直接键入它们。键入的字符将出现在光标所在位置，然后光标向右移动一个空格。如果您输入错误字符，可以使用擦除字符来后退并删除错误的字符。

Sometimes you may mistype a character, and not notice the error until you have typed several other characters. In that case, you can type C-b to move the cursor to the left, and then correct your mistake. Afterwards, you can move the cursor to the right with C-f.

​	有时候您可能会输入错误的字符，但直到您键入其他几个字符后才注意到错误。在这种情况下，您可以键入C-b将光标向左移动，然后更正错误。之后，您可以使用C-f将光标向右移动。

When you add text in the middle of a line, you will notice that characters to the right of the cursor are `pushed over` to make room for the text that you have inserted. Likewise, when you delete text behind the cursor, characters to the right of the cursor are `pulled back` to fill in the blank space created by the removal of the text. A list of the bare essentials for editing the text of an input line follows.

​	当您在一行中间添加文本时，您会注意到光标右侧的字符会被“挤过去”以腾出空间插入您插入的文本。同样，当您删除光标后的文本时，光标右侧的字符会“拉回来”以填补删除文本后留下的空白空间。下面列出了编辑输入行文本的基本要点。

- C-b

  Move back one character.

  向后移动一个字符。

- C-f

  Move forward one character.

  向前移动一个字符。

- `DEL` or `Backspace`

  Delete the character to the left of the cursor.

  删除光标左侧的字符。

- C-d

  Delete the character underneath the cursor.

  删除光标下的字符。

- Printing characters

  Insert the character into the line at the cursor.

  在光标处插入字符。

- C-_ or C-x C-u

  Undo the last editing command. You can undo all the way back to an empty line.
  
  撤消上一个编辑命令。您可以撤消到空行为止。

(Depending on your configuration, the `Backspace` key might be set to delete the character to the left of the cursor and the `DEL` key set to delete the character underneath the cursor, like C-d, rather than the character to the left of the cursor.)

（根据您的配置，`Backspace`键可能被设置为删除光标左侧的字符，而`DEL`键设置为删除光标下的字符，而不是光标左侧的字符，就像C-d一样。）



#### 8.2.2 Readline 移动命令

The above table describes the most basic keystrokes that you need in order to do editing of the input line. For your convenience, many other commands have been added in addition to C-b, C-f, C-d, and `DEL`. Here are some commands for moving more rapidly about the line.

​	上表描述了您需要的最基本按键来对输入行进行编辑。为了方便起见，除了C-b、C-f、C-d和`DEL`之外，还添加了许多其他命令。下面是一些用于更快地移动输入行的命令。

- C-a

  Move to the start of the line.

  移动到行的开头。

- C-e

  Move to the end of the line.

  移动到行的末尾。

- M-f

  Move forward a word, where a word is composed of letters and digits.

  向前移动一个单词，其中一个单词由字母和数字组成。

- M-b

  Move backward a word.

  向后移动一个单词。

- C-l

  Clear the screen, reprinting the current line at the top.
  
  清屏，将当前行重新打印在顶部。

Notice how C-f moves forward a character, while M-f moves forward a word. It is a loose convention that control keystrokes operate on characters while meta keystrokes operate on words.

​	请注意，C-f向前移动一个字符，而M-f向前移动一个单词。这是一种宽松的约定，即控制按键用于字符，而元按键用于单词。





#### 8.2.3 Readline Killing Commands



*Killing* text means to delete the text from the line, but to save it away for later use, usually by *yanking* (re-inserting) it back into the line. (`Cut` and `paste` are more recent jargon for `kill` and `yank`.)

​	“删除”文本意味着从行中删除文本，但将其保存以备后用，通常是通过“插入”（重新插入）回到行中。 （“剪切”和“粘贴”是更近期的术语，用于代替“删除”和“插入”。）

If the description for a command says that it `kills` text, then you can be sure that you can get the text back in a different (or the same) place later.

​	如果某个命令的描述说它“删除”文本，那么您可以确定可以在稍后的不同（或相同）位置得到该文本。

When you use a kill command, the text is saved in a *kill-ring*. Any number of consecutive kills save all of the killed text together, so that when you yank it back, you get it all. The kill ring is not line specific; the text that you killed on a previously typed line is available to be yanked back later, when you are typing another line.

​	使用kill命令时，文本保存在一个“kill-ring”中。连续的多次删除将所有删除的文本保存在一起，因此当您重新插入时，您可以得到所有文本。kill ring不是特定于某一行的；您在先前键入的行上删除的文本在您键入另一行时可供稍后重新插入。

Here is the list of commands for killing text.

​	以下是用于删除文本的命令列表。

- C-k

  Kill the text from the current cursor position to the end of the line.

  从光标当前位置删除到行尾的文本。

- M-d

  Kill from the cursor to the end of the current word, or, if between words, to the end of the next word. Word boundaries are the same as those used by M-f.

  从光标到当前单词的末尾删除文本，或者如果位于单词之间，则删除到下一个单词的末尾。单词边界与M-f使用的相同。

- M-DEL

  Kill from the cursor to the start of the current word, or, if between words, to the start of the previous word. Word boundaries are the same as those used by M-b.

  从光标到当前单词的开头删除文本，或者如果位于单词之间，则删除到上一个单词的开头。单词边界与M-b使用的相同。

- C-w

  Kill from the cursor to the previous whitespace. This is different than M-DEL because the word boundaries differ.
  
  从光标到前面的空格删除文本。与M-DEL不同，因为单词边界不同。

Here is how to *yank* the text back into the line. Yanking means to copy the most-recently-killed text from the kill buffer.

​	以下是如何将文本“粘贴”回到行中。粘贴意味着将最近删除的文本从删除缓冲区复制回来。

- C-y

  Yank the most recently killed text back into the buffer at the cursor.

  将最近删除的文本从缓冲区插入到光标处。

- M-y

  Rotate the kill-ring, and yank the new top. You can only do this if the prior command is C-y or M-y.
  
  旋转kill-ring，并插入新的顶部。只有在先前的命令是C-y或M-y时才能这样做。





#### 8.2.4 Readline 参数

You can pass numeric arguments to Readline commands. Sometimes the argument acts as a repeat count, other times it is the *sign* of the argument that is significant. If you pass a negative argument to a command which normally acts in a forward direction, that command will act in a backward direction. For example, to kill text back to the start of the line, you might type `M-- C-k`.

​	您可以向Readline命令传递数值参数。有时参数作为重复计数，其他时候参数的*符号*是重要的。如果您向通常朝向前方向运行的命令传递负参数，该命令将以向后方向运行。例如，要删除文本直到行的开头，您可以键入`M-- C-k`。

The general way to pass numeric arguments to a command is to type meta digits before the command. If the first `digit` typed is a minus sign (`-`), then the sign of the argument will be negative. Once you have typed one meta digit to get the argument started, you can type the remainder of the digits, and then the command. For example, to give the C-d command an argument of 10, you could type `M-1 0 C-d`, which will delete the next ten characters on the input line.

​	向命令传递数值参数的一般方法是在命令之前键入元数字。如果第一个键入的`数字`是负号（`-`），则参数的符号将为负。一旦您键入一个元数字以启动参数，您可以键入其余数字，然后再键入命令。例如，要给C-d命令传递10个参数，可以键入`M-1 0 C-d`，这将删除输入行上的下一个十个字符。





#### 8.2.5 在历史记录中搜索命令

Readline provides commands for searching through the command history (see [Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities)) for lines containing a specified string. There are two search modes: *incremental* and *non-incremental*.

​	Readline提供了在命令历史记录（参见[Bash历史记录功能](#91-bash-历史记录功能-bash-history-facilities)）中搜索包含指定字符串的行的命令。有两种搜索模式：*增量搜索* 和 *非增量搜索* 。

Incremental searches begin before the user has finished typing the search string. As each character of the search string is typed, Readline displays the next entry from the history matching the string typed so far. An incremental search requires only as many characters as needed to find the desired history entry. To search backward in the history for a particular string, type C-r. Typing C-s searches forward through the history. The characters present in the value of the `isearch-terminators` variable are used to terminate an incremental search. If that variable has not been assigned a value, the `ESC` and C-J characters will terminate an incremental search. C-g will abort an incremental search and restore the original line. When the search is terminated, the history entry containing the search string becomes the current line.

​	增量搜索在用户完成输入搜索字符串之前开始。每键入搜索字符串的一个字符，Readline会显示与迄今为止键入的字符串匹配的历史记录的下一个条目。增量搜索仅需要找到所需历史记录条目所需的字符。要向后搜索特定字符串的历史记录，请键入C-r。键入C-s将向前搜索历史记录。增量搜索使用`isearch-terminators`变量值中存在的字符来终止搜索。如果该变量尚未被赋值，则`ESC`和C-J字符将终止增量搜索。C-g将中止增量搜索并恢复原始行。搜索终止后，包含搜索字符串的历史记录条目成为当前行。

To find other matching entries in the history list, type C-r or C-s as appropriate. This will search backward or forward in the history for the next entry matching the search string typed so far. Any other key sequence bound to a Readline command will terminate the search and execute that command. For instance, a `RET` will terminate the search and accept the line, thereby executing the command from the history list. A movement command will terminate the search, make the last line found the current line, and begin editing.

​	要查找历史记录列表中的其他匹配条目，请键入相应的C-r或C-s。这将根据迄今为止键入的搜索字符串向后或向前搜索历史记录，以查找下一个匹配的条目。任何其他绑定到Readline命令的键序列都将终止搜索并执行该命令。例如，按`RET`将终止搜索并接受该行，从而执行历史记录列表中的命令。移动命令将终止搜索，使找到的最后一行成为当前行，并开始编辑。

Readline remembers the last incremental search string. If two C-rs are typed without any intervening characters defining a new search string, any remembered search string is used.

​	Readline会记住最后的增量搜索字符串。如果连续键入两个C-r而没有中间字符定义新的搜索字符串，则将使用任何记住的搜索字符串。

Non-incremental searches read the entire search string before starting to search for matching history lines. The search string may be typed by the user or be part of the contents of the current line.

​	非增量搜索在开始搜索匹配历史记录行之前读取整个搜索字符串。搜索字符串可以由用户键入，也可以是当前行内容的一部分。





### 8.3 Readline 初始化文件



Although the Readline library comes with a set of Emacs-like keybindings installed by default, it is possible to use a different set of keybindings. Any user can customize programs that use Readline by putting commands in an *inputrc* file, conventionally in their home directory. The name of this file is taken from the value of the shell variable `INPUTRC`. If that variable is unset, the default is ~/.inputrc. If that file does not exist or cannot be read, the ultimate default is /etc/inputrc. The `bind` builtin command can also be used to set Readline keybindings and variables. See [Bash Builtin Commands](#42-bash-内置命令).

​	尽管Readline库默认安装了一组类似Emacs的键绑定，但可以使用不同的键绑定。任何用户都可以通过将命令放入*inputrc*文件（通常位于用户的主目录中）来自定义使用Readline的程序。此文件的名称取自shell变量`INPUTRC`的值。如果该变量未设置，则默认为~/.inputrc。如果该文件不存在或无法读取，则最终默认为/etc/inputrc。`bind`内置命令也可以用于设置Readline键绑定和变量。请参阅[Bash内置命令](#42-bash-内置命令)。

When a program which uses the Readline library starts up, the init file is read, and the key bindings are set.

​	当使用Readline库的程序启动时，会读取init文件并设置键绑定。

In addition, the `C-x C-r` command re-reads this init file, thus incorporating any changes that you might have made to it.

​	此外，`C-x C-r`命令重新读取此init文件，从而合并您可能对其进行的任何更改。







#### 8.3.1 Readline 初始化文件语法

There are only a few basic constructs allowed in the Readline init file. Blank lines are ignored. Lines beginning with a `#` are comments. Lines beginning with a `$` indicate conditional constructs (see [Conditional Init Constructs](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Init-Constructs)). Other lines denote variable settings and key bindings.

​	Readline初始化文件中只允许几个基本结构。空行将被忽略。以`#`开头的行是注释行。以`$`开头的行表示条件结构（参见[条件初始化结构](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Init-Constructs)）。其他行表示变量设置和键绑定。

- 变量设置

  You can modify the run-time behavior of Readline by altering the values of variables in Readline using the `set` command within the init file. The syntax is simple:

  您可以通过在init文件中使用`set`命令修改Readline的变量值，从而修改Readline的运行时行为。语法很简单：

  ```
  set variable value
  ```

  Here, for example, is how to change from the default Emacs-like key binding to use `vi` line editing commands:

  例如，以下是如何从默认的Emacs-like键绑定更改为使用`vi`行编辑命令的示例：

  ```
  set editing-mode vi
  ```

  Variable names and values, where appropriate, are recognized without regard to case. Unrecognized variable names are ignored.

  变量名和值（如果适用）的识别不区分大小写。未被识别的变量名将被忽略。

  Boolean variables (those that can be set to on or off) are set to on if the value is null or empty, on (case-insensitive), or 1. Any other value results in the variable being set to off.

  布尔变量（可以设置为开启或关闭的变量）如果值为null或空、on（不区分大小写）或1，则设置为开启。任何其他值将导致变量被设置为关闭。

  The `bind -V` command lists the current Readline variable names and values. See [Bash Builtin Commands](#42-bash-内置命令).

  `bind -V`命令列出当前Readline变量名和值。请参阅[Bash内置命令](#42-bash-内置命令)。

  A great deal of run-time behavior is changeable with the following variables.

  使用以下变量可以更改许多运行时行为。

  `active-region-start-color`: A string variable that controls the text color and background when displaying the text in the active region (see the description of `enable-active-region` below). This string must not take up any physical character positions on the display, so it should consist only of terminal escape sequences. It is output to the terminal before displaying the text in the active region. This variable is reset to the default value whenever the terminal type changes. The default value is the string that puts the terminal in standout mode, as obtained from the terminal's terminfo description. A sample value might be `\e[01;33m`.

  `active-region-start-color`：一个字符串变量，控制显示活动区域（参见下面的`enable-active-region`描述）中的文本的文本颜色和背景。此字符串不能占据显示器上的任何物理字符位置，因此它只应包含终端转义序列。它在显示活动区域中的文本之前输出到终端。每当终端类型更改时，此变量会重置为默认值。默认值是将终端置于显着模式的字符串，从终端的terminfo描述获取。示例值可能是`\e[01;33m`。

  `active-region-end-color`: A string variable that "undoes" the effects of `active-region-start-color` and restores "normal" terminal display appearance after displaying text in the active region. This string must not take up any physical character positions on the display, so it should consist only of terminal escape sequences. It is output to the terminal after displaying the text in the active region. This variable is reset to the default value whenever the terminal type changes. The default value is the string that restores the terminal from standout mode, as obtained from the terminal's terminfo description. A sample value might be `\e[0m`.

  `active-region-end-color`：一个字符串变量，用于"撤销" `active-region-start-color`的效果，并在显示活动区域中的文本之后恢复"正常"终端显示外观。此字符串不能占据显示器上的任何物理字符位置，因此它只应包含终端转义序列。它在显示活动区域中的文本之后输出到终端。每当终端类型更改时，此变量会重置为默认值。默认值是从终端的terminfo描述获取的将终端从显着模式恢复的字符串。示例值可能是`\e[0m`。

  `bell-style`: Controls what happens when Readline wants to ring the terminal bell. If set to `none`, Readline never rings the bell. If set to `visible`, Readline uses a visible bell if one is available. If set to `audible` (the default), Readline attempts to ring the terminal's bell.

  `bell-style`：控制当Readline希望响起终端响铃时会发生什么。如果设置为`none`，Readline将永不响铃。如果设置为`visible`，Readline将使用可见响铃（如果可用）。如果设置为`audible`（默认），Readline将尝试响铃终端的响铃。

  `bind-tty-special-chars`If set to `on` (the default), Readline attempts to bind the control characters treated specially by the kernel's terminal driver to their Readline equivalents.

  `bind-tty-special-chars`：如果设置为`on`（默认），Readline将尝试将内核终端驱动程序特别处理的控制字符绑定到它们的Readline等效字符。

  `blink-matching-paren`: If set to `on`, Readline attempts to briefly move the cursor to an opening parenthesis when a closing parenthesis is inserted. The default is `off`.

  `blink-matching-paren`：如果设置为`on`，Readline尝试在插入关闭括号时将光标短暂地移到开括号。默认值为`off`。

  `colored-completion-prefix`：If set to `on`, when listing completions, Readline displays the common prefix of the set of possible completions using a different color. The color definitions are taken from the value of the `LS_COLORS` environment variable. If there is a color definition in `LS_COLORS` for the custom suffix `readline-colored-completion-prefix`, Readline uses this color for the common prefix instead of its default. The default is `off`.

  `colored-completion-prefix`：如果设置为`on`，在列出完成项时，Readline会使用不同的颜色显示可能完成项的公共前缀。颜色定义取自`LS_COLORS`环境变量的值。如果`LS_COLORS`中对自定义后缀`readline-colored-completion-prefix`进行了颜色定义，则Readline将使用此颜色作为公共前缀的颜色，而不是其默认颜色。默认值为`off`。

  `colored-stats`: If set to `on`, Readline displays possible completions using different colors to indicate their file type. The color definitions are taken from the value of the `LS_COLORS` environment variable. The default is `off`.

  `colored-stats`：如果设置为`on`，Readline将使用不同的颜色显示可能的完成项，以指示它们的文件类型。颜色定义取自`LS_COLORS`环境变量的值。默认值为`off`。

  `comment-begin`: The string to insert at the beginning of the line when the `insert-comment` command is executed. The default value is `"#"`.

  `comment-begin`：执行`insert-comment`命令时，在行的开头插入的字符串。默认值为`"#"`。

  `completion-display-width`: The number of screen columns used to display possible matches when performing completion. The value is ignored if it is less than 0 or greater than the terminal screen width. A value of 0 will cause matches to be displayed one per line. The default value is -1.

  `completion-display-width`：在执行完成时用于显示可能匹配项的屏幕列数。如果值小于0或大于终端屏幕宽度，则忽略该值。值为0将导致每行显示一个匹配项。默认值为-1。

  `completion-ignore-case`: If set to `on`, Readline performs filename matching and completion in a case-insensitive fashion. The default value is `off`.

  `completion-ignore-case`：如果设置为`on`，Readline将以不区分大小写的方式进行文件名匹配和完成。默认值为`off`。

  `completion-map-case`: If set to `on`, and completion-ignore-case is enabled, Readline treats hyphens (`-`) and underscores (`_`) as equivalent when performing case-insensitive filename matching and completion. The default value is `off`.

  `completion-map-case`：如果设置为`on`，并且启用了`completion-ignore-case`，Readline在执行不区分大小写的文件名匹配和完成时将连字符（`-`）和下划线（`_`）视为相同。默认值为`off`。

  `completion-prefix-display-length`The length in characters of the common prefix of a list of possible completions that is displayed without modification. When set to a value greater than zero, common prefixes longer than this value are replaced with an ellipsis when displaying possible completions.

  `completion-prefix-display-length`：在显示可能完成项时，显示未经修改的可能完成项列表的公共前缀的长度（可能为空）。当设置为大于零的值时，超过此值的公共前缀在显示可能完成项时将替换为省略号。

  `completion-query-items`The number of possible completions that determines when the user is asked whether the list of possibilities should be displayed. If the number of possible completions is greater than or equal to this value, Readline will ask whether or not the user wishes to view them; otherwise, they are simply listed. This variable must be set to an integer value greater than or equal to zero. A zero value means Readline should never ask; negative values are treated as zero. The default limit is `100`.

  `completion-query-items`：确定是否要询问用户是否应显示可能完成项列表的可能完成项数目。如果可能完成项数目大于或等于此值，Readline将询问用户是否希望查看它们；否则，它们将仅列出。此变量必须设置为大于或等于零的整数值。零值意味着Readline永远不会询问；负值视为零。默认限制为`100`。

  `convert-meta`If set to `on`, Readline will convert characters with the eighth bit set to an ASCII key sequence by stripping the eighth bit and prefixing an `ESC` character, converting them to a meta-prefixed key sequence. The default value is `on`, but will be set to `off` if the locale is one that contains eight-bit characters. This variable is dependent on the `LC_CTYPE` locale category, and may change if the locale is changed.

  `convert-meta`：如果设置为`on`，Readline将转换具有第八位设置的字符为ASCII键序列，通过去除第八位并在前面添加一个`ESC`字符，将其转换为带元前缀的键序列。默认值为`on`，但如果区域设置中包含八位字符，则将其设置为`off`。该变量依赖于`LC_CTYPE`区域设置类别，如果更改区域设置，则可能会更改此变量的值。

  `disable-completion`If set to `On`, Readline will inhibit word completion. Completion characters will be inserted into the line as if they had been mapped to `self-insert`. The default is `off`.

  `disable-completion`：如果设置为`On`，Readline将禁止单词完成。完成字符将被插入到行中，就像它们已被映射到`self-insert`一样。默认值为`off`。

  `echo-control-characters`When set to `on`, on operating systems that indicate they support it, Readline echoes a character corresponding to a signal generated from the keyboard. The default is `on`.

  `echo-control-characters`：当设置为`on`时，在支持的操作系统上，Readline会回显与键盘生成的信号相对应的字符。默认值为`on`。

  `editing-mode`The `editing-mode` variable controls which default set of key bindings is used. By default, Readline starts up in Emacs editing mode, where the keystrokes are most similar to Emacs. This variable can be set to either `emacs` or `vi`.

  `editing-mode`：`editing-mode`变量控制使用哪个默认的键绑定集。默认情况下，Readline以Emacs编辑模式启动，其中按键与Emacs最相似。此变量可以设置为`emacs`或`vi`。

  `emacs-mode-string`If the show-mode-in-prompt variable is enabled, this string is displayed immediately before the last line of the primary prompt when emacs editing mode is active. The value is expanded like a key binding, so the standard set of meta- and control prefixes and backslash escape sequences is available. Use the `\1` and `\2` escapes to begin and end sequences of non-printing characters, which can be used to embed a terminal control sequence into the mode string. The default is `@`.

  `emacs-mode-string`：如果启用了show-mode-in-prompt变量，则在激活emacs编辑模式时，在主提示的最后一行之前立即显示此字符串。该值会像键绑定一样展开，因此可以使用标准的元和控制前缀以及反斜杠转义序列。使用`\1`和`\2`转义序列来开始和结束非打印字符序列，这可以用于将终端控制序列嵌入到模式字符串中。默认值为`@`。

  `enable-active-region`The *point* is the current cursor position, and *mark* refers to a saved cursor position (see [Commands For Moving](https://www.gnu.org/software/bash/manual/bash.html#Commands-For-Moving)). The text between the point and mark is referred to as the *region*. When this variable is set to `On`, Readline allows certain commands to designate the region as *active*. When the region is active, Readline highlights the text in the region using the value of the `active-region-start-color`, which defaults to the string that enables the terminal's standout mode. The active region shows the text inserted by bracketed-paste and any matching text found by incremental and non-incremental history searches. The default is `On`.

  `enable-active-region`：*point*是当前光标位置，*mark*是保存的光标位置（参见[Commands For Moving](https://www.gnu.org/software/bash/manual/bash.html#Commands-For-Moving)）。点和标记之间的文本称为*region*。当此变量设置为`On`时，Readline允许某些命令指定该区域为*active*。当区域处于活动状态时，Readline使用`active-region-start-color`的值来突出显示区域中的文本，默认值为启用终端的显着模式的字符串。活动区域显示由方括号粘贴插入的文本以及增量和非增量历史搜索找到的任何匹配文本。默认值为`On`。

  `enable-bracketed-paste`When set to `On`, Readline configures the terminal to insert each paste into the editing buffer as a single string of characters, instead of treating each character as if it had been read from the keyboard. This is called putting the terminal into *bracketed paste mode*; it prevents Readline from executing any editing commands bound to key sequences appearing in the pasted text. The default is `On`.

  `enable-bracketed-paste`：当设置为`On`时，Readline会将终端配置为将每个粘贴的内容作为单个字符字符串插入到编辑缓冲区中，而不是将每个字符视为从键盘读取的字符。这称为将终端置于*bracketed paste mode*，它会阻止Readline执行绑定到粘贴文本中出现的按键序列的任何编辑命令。默认值为`On`。

  `enable-keypad`When set to `on`, Readline will try to enable the application keypad when it is called. Some systems need this to enable the arrow keys. The default is `off`.

  `enable-keypad`：当设置为`on`时，Readline将尝试在调用时启用应用程序键盘。某些系统需要这样做以启用箭头键。默认值为`off`。

  `enable-meta-key`When set to `on`, Readline will try to enable any meta modifier key the terminal claims to support when it is called. On many terminals, the meta key is used to send eight-bit characters. The default is `on`.

  `enable-meta-key`：当设置为`on`时，Readline将在调用时尝试启用终端声称支持的任何元修饰键。在许多终端上，元键用于发送八位字符。默认值为`on`。

  `expand-tilde`If set to `on`, tilde expansion is performed when Readline attempts word completion. The default is `off`.

  `expand-tilde`：如果设置为`on`，则在Readline尝试进行单词完成时，会执行波浪线展开。默认值为`off`。

  `history-preserve-point`If set to `on`, the history code attempts to place the point (the current cursor position) at the same location on each history line retrieved with `previous-history` or `next-history`. The default is `off`.

  `history-preserve-point`：如果设置为`on`，历史记录代码将尝试将点（当前光标位置）放置在使用`previous-history`或`next-history`检索的每行历史记录的相同位置。默认值为`off`。

  `history-size`Set the maximum number of history entries saved in the history list. If set to zero, any existing history entries are deleted and no new entries are saved. If set to a value less than zero, the number of history entries is not limited. By default, the number of history entries is not limited. If an attempt is made to set history-size to a non-numeric value, the maximum number of history entries will be set to 500.

  `history-size`：设置保存在历史记录列表中的最大历史记录条目数。如果设置为零，将删除任何现有的历史记录条目，并且不保存新的条目。如果设置为小于零的值，则历史记录条目的数量不受限制。默认情况下，历史记录条目的数量不受限制。如果尝试将history-size设置为非数字值，则将最大历史记录条目数设置为500。

  `horizontal-scroll-mode`This variable can be set to either `on` or `off`. Setting it to `on` means that the text of the lines being edited will scroll horizontally on a single screen line when they are longer than the width of the screen, instead of wrapping onto a new screen line. This variable is automatically set to `on` for terminals of height 1. By default, this variable is set to `off`.

  `horizontal-scroll-mode`：此变量可以设置为`on`或`off`。将其设置为`on`表示正在编辑的行的文本在屏幕宽度小于屏幕宽度时在单个屏幕行上水平滚动，而不是换行到新的屏幕行。对于高度为1的终端，此变量将自动设置为`on`。默认情况下，此变量设置为`off`。

  `input-meta`If set to `on`, Readline will enable eight-bit input (it will not clear the eighth bit in the characters it reads), regardless of what the terminal claims it can support. The default value is `off`, but Readline will set it to `on` if the locale contains eight-bit characters. The name `meta-flag` is a synonym for this variable. This variable is dependent on the `LC_CTYPE` locale category, and may change if the locale is changed.

  `input-meta`：如果设置为`on`，Readline将启用八位输入（在读取的字符中不会清除第八位），而不管终端声称支持什么。默认值为`off`，但如果区域设置包含八位字符，则Readline将其设置为`on`。名称`meta-flag`是此变量的同义词。此变量依赖于`LC_CTYPE`区域设置类别，如果更改区域设置，则可能会更改此变量的值。

  `isearch-terminators`The string of characters that should terminate an incremental search without subsequently executing the character as a command (see [Searching for Commands in the History](https://www.gnu.org/software/bash/manual/bash.html#Searching)). If this variable has not been given a value, the characters `ESC` and C-J will terminate an incremental search.

  `isearch-terminators`：应终止增量搜索的字符的字符串，而不会随后将字符作为命令执行（参见[搜索历史记录中的命令](https://www.gnu.org/software/bash/manual/bash.html#Searching)）。如果此变量没有被赋予一个值，字符`ESC`和C-J将终止增量搜索。

  `keymap`Sets Readline's idea of the current keymap for key binding commands. Built-in `keymap` names are `emacs`, `emacs-standard`, `emacs-meta`, `emacs-ctlx`, `vi`, `vi-move`, `vi-command`, and `vi-insert`. `vi` is equivalent to `vi-command` (`vi-move` is also a synonym); `emacs` is equivalent to `emacs-standard`. Applications may add additional names. The default value is `emacs`. The value of the `editing-mode` variable also affects the default keymap.

  `keymap`：为键绑定命令设置Readline的当前键映射。内置`keymap`名称为`emacs`、`emacs-standard`、`emacs-meta`、`emacs-ctlx`、`vi`、`vi-move`、`vi-command`和`vi-insert`。`vi`相当于`vi-command`（`vi-move`也是一个同义词）；`emacs`相当于`emacs-standard`。应用程序可以添加额外的名称。默认值为`emacs`。`editing-mode`变量的值也会影响默认键映射。

  `keyseq-timeout`Specifies the duration Readline will wait for a character when reading an ambiguous key sequence (one that can form a complete key sequence using the input read so far, or can take additional input to complete a longer key sequence). If no input is received within the timeout, Readline will use the shorter but complete key sequence. Readline uses this value to determine whether or not input is available on the current input source (`rl_instream` by default). The value is specified in milliseconds, so a value of 1000 means that Readline will wait one second for additional input. If this variable is set to a value less than or equal to zero, or to a non-numeric value, Readline will wait until another key is pressed to decide which key sequence to complete. The default value is `500`.

  `keyseq-timeout`：指定Readline在读取不明确的键序列（可以使用到目前为止的输入形成完整的键序列，或者可以接受附加输入以完成较长的键序列）时等待字符的持续时间。如果在超时时间内没有收到输入，Readline将使用较短但完整的键序列。Readline使用此值来确定当前输入源（默认情况下为`rl_instream`）是否有输入可用。该值以毫秒为单位指定，因此值为1000表示Readline将等待一秒钟的附加输入。如果此变量设置为小于或等于零的值，或者设置为非数字值，则Readline将等待按下另一个键来决定要完成哪个键序列。默认值为`500`。

  `mark-directories`If set to `on`, completed directory names have a slash appended. The default is `on`.

  `mark-directories`：如果设置为`on`，已完成的目录名称将附加一个斜杠。默认值为`on`。

  `mark-modified-lines`This variable, when set to `on`, causes Readline to display an asterisk (`*`) at the start of history lines which have been modified. This variable is `off` by default.

  `mark-modified-lines`：当设置为`on`时，Readline会在已被修改的历史记录行的开头显示一个星号（`*`）。默认情况下，此变量为`off`。

  `mark-symlinked-directories`If set to `on`, completed names which are symbolic links to directories have a slash appended (subject to the value of `mark-directories`). The default is `off`.

  `mark-symlinked-directories`：如果设置为`on`，已完成的名称是指向目录的符号链接，则附加一个斜杠（取决于`mark-directories`的值）。默认值为`off`。

  `match-hidden-files`This variable, when set to `on`, causes Readline to match files whose names begin with a `.` (hidden files) when performing filename completion. If set to `off`, the leading `.` must be supplied by the user in the filename to be completed. This variable is `on` by default.

  `match-hidden-files`：当设置为`on`时，Readline在执行文件名完成时匹配以`.`开头的文件（隐藏文件）。如果设置为`off`，则必须由用户在要完成的文件名中提供前导`.`。默认情况下，此变量为`on`。

  `menu-complete-display-prefix`If set to `on`, menu completion displays the common prefix of the list of possible completions (which may be empty) before cycling through the list. The default is `off`.

  `menu-complete-display-prefix`：如果设置为`on`，菜单完成将在循环显示列表之前显示可能完成项列表（可能为空）的公共前缀。默认值为`off`。

  `output-meta`If set to `on`, Readline will display characters with the eighth bit set directly rather than as a meta-prefixed escape sequence. The default is `off`, but Readline will set it to `on` if the locale contains eight-bit characters. This variable is dependent on the `LC_CTYPE` locale category, and may change if the locale is changed.

  `output-meta`：如果设置为`on`，Readline将直接显示第八位设置的字符，而不是作为带有元前缀的转义序列。默认值为`off`，但如果区域设置包含八位字符，则Readline将其设置为`on`。此变量依赖于`LC_CTYPE`区域设置类别，如果更改区域设置，则可能会更改此变量的值。

  `page-completions`If set to `on`, Readline uses an internal `more`-like pager to display a screenful of possible completions at a time. This variable is `on` by default.

  `page-completions`：如果设置为`on`，Readline将使用类似`more`的内部分页程序一次显示一屏幕可能的完成项。默认情况下，此变量为`on`。

  `print-completions-horizontally`If set to `on`, Readline will display completions with matches sorted horizontally in alphabetical order, rather than down the screen. The default is `off`.

  `print-completions-horizontally`：如果设置为`on`，Readline将以字母顺序水平显示匹配的完成项，而不是在屏幕上向下显示。默认值为`off`。

  `revert-all-at-newline`If set to `on`, Readline will undo all changes to history lines before returning when `accept-line` is executed. By default, history lines may be modified and retain individual undo lists across calls to `readline()`. The default is `off`.

  `revert-all-at-newline`：如果设置为`on`，Readline将在执行`accept-line`时返回之前撤消所有对历史记录行的更改。默认情况下，历史记录行可以在对`readline()`的调用之间被修改并保留各自的撤消列表。默认值为`off`。

  `show-all-if-ambiguous`This alters the default behavior of the completion functions. If set to `on`, words which have more than one possible completion cause the matches to be listed immediately instead of ringing the bell. The default value is `off`.

  `show-all-if-ambiguous`：这改变了完成函数的默认行为。如果设置为`on`，具有多个可能完成的单词会导致立即列出匹配项，而不会响铃。默认值为`off`。

  `show-all-if-unmodified`This alters the default behavior of the completion functions in a fashion similar to show-all-if-ambiguous. If set to `on`, words which have more than one possible completion without any possible partial completion (the possible completions don't share a common prefix) cause the matches to be listed immediately instead of ringing the bell. The default value is `off`.

  `show-all-if-unmodified`：这改变了完成函数的默认行为，类似于`show-all-if-ambiguous`。如果设置为`on`，没有可能的部分完成（可能完成不共享公共前缀）的单词会导致立即列出匹配项，而不会响铃。默认值为`off`。

  `show-mode-in-prompt`If set to `on`, add a string to the beginning of the prompt indicating the editing mode: emacs, vi command, or vi insertion. The mode strings are user-settable (e.g., emacs-mode-string). The default value is `off`.

  `show-mode-in-prompt`：如果设置为`on`，则在提示的开头添加一个字符串，指示编辑模式：emacs、vi命令或vi插入。模式字符串是可由用户设置的（例如，emacs-mode-string）。默认值为`off`。

  `skip-completed-text`If set to `on`, this alters the default completion behavior when inserting a single match into the line. It's only active when performing completion in the middle of a word. If enabled, Readline does not insert characters from the completion that match characters after point in the word being completed, so portions of the word following the cursor are not duplicated. For instance, if this is enabled, attempting completion when the cursor is after the `e` in `Makefile` will result in `Makefile` rather than `Makefilefile`, assuming there is a single possible completion. The default value is `off`.

  `skip-completed-text`：如果设置为`on`，则在向行中插入单个匹配项时，会更改默认的完成行为。仅在单词的中间执行完成时才激活它。如果启用，Readline不会插入与正在完成的单词中光标后面的字符相匹配的完成字符，因此不会复制光标后面的单词部分。例如，如果启用此功能，并且光标在`Makefile`的`e`之后时尝试完成，结果将是`Makefile`而不是`Makefilefile`，假设只有一个可能的完成项。默认值为`off`。

  `vi-cmd-mode-string`If the show-mode-in-prompt variable is enabled, this string is displayed immediately before the last line of the primary prompt when vi editing mode is active and in command mode. The value is expanded like a key binding, so the standard set of meta- and control prefixes and backslash escape sequences is available. Use the `\1` and `\2` escapes to begin and end sequences of non-printing characters, which can be used to embed a terminal control sequence into the mode string. The default is `(cmd)`.

  `vi-cmd-mode-string`：如果启用了show-mode-in-prompt变量，则在激活vi编辑模式和命令模式时，在主提示的最后一行之前立即显示此字符串。该值会像键绑定一样展开，因此可以使用标准的元和控制前缀以及反斜杠转义序列。使用`\1`和`\2`转义序列来开始和结束非打印字符序列，这可以用于将终端控制序列嵌入到模式字符串中。默认值为`(cmd)`。

  `vi-ins-mode-string`If the show-mode-in-prompt variable is enabled, this string is displayed immediately before the last line of the primary prompt when vi editing mode is active and in insertion mode. The value is expanded like a key binding, so the standard set of meta- and control prefixes and backslash escape sequences is available. Use the `\1` and `\2` escapes to begin and end sequences of non-printing characters, which can be used to embed a terminal control sequence into the mode string. The default is `(ins)`.

  `vi-ins-mode-string`：如果启用了show-mode-in-prompt变量，则在激活vi编辑模式和插入模式时，在主提示的最后一行之前立即显示此字符串。该值会像键绑定一样展开，因此可以使用标准的元和控制前缀以及反斜杠转义序列。使用`\1`和`\2`转义序列来开始和结束非打印字符序列，这可以用于将终端控制序列嵌入到模式字符串中。默认值为`(ins)`。

  `visible-stats`If set to `on`, a character denoting a file's type is appended to the filename when listing possible completions. The default is `off`.

  `visible-stats`：如果设置为`on`，则在列出可能完成项时，会在文件名后附加表示文件类型的字符。默认值为`off`。

   

- 键绑定

  The syntax for controlling key bindings in the init file is simple. First you need to find the name of the command that you want to change. The following sections contain tables of the command name, the default keybinding, if any, and a short description of what the command does.
  
  在初始化文件中控制键绑定的语法很简单。首先，您需要找到要更改的命令的名称。以下部分包含命令名称、默认键绑定（如果有）以及命令功能的简短描述的表格。
  
  Once you know the name of the command, simply place on a line in the init file the name of the key you wish to bind the command to, a colon, and then the name of the command. There can be no space between the key name and the colon – that will be interpreted as part of the key name. The name of the key can be expressed in different ways, depending on what you find most comfortable.
  
  一旦您知道命令的名称，只需在初始化文件中的一行上放置您希望绑定到命令的键的名称、冒号，然后是命令的名称。键的名称可以用不同的方式表示，具体取决于您最舒服的方式。
  
  In addition to command names, Readline allows keys to be bound to a string that is inserted when the key is pressed (a macro).
  
  除了命令名称，Readline还允许将键绑定到在按键时插入的字符串（宏）。
  
  The `bind -p` command displays Readline function names and bindings in a format that can be put directly into an initialization file. See [Bash Builtin Commands](#42-bash-内置命令).
  
  `bind -p` 命令以可直接放入初始化文件的格式显示 Readline 函数名称和绑定。请参阅 [Bash 内置命令](#42-bash-内置命令)。
  
  - keyname: function-name or macro 键名：函数名称或宏
  
    keyname is the name of a key spelled out in English. For example:
  
    键名是用英文拼写出的按键名称。例如：
  
    ```
    Control-u: universal-argument
    Meta-Rubout: backward-kill-word
    Control-o: "> output"
    ```
  
    In the example above, C-u is bound to the function `universal-argument`, M-DEL is bound to the function `backward-kill-word`, and C-o is bound to run the macro expressed on the right hand side (that is, to insert the text `> output` into the line).A number of symbolic character names are recognized while processing this key binding syntax: DEL, ESC, ESCAPE, LFD, NEWLINE, RET, RETURN, RUBOUT, SPACE, SPC, and TAB.
  
    在上面的示例中，C-u 绑定到函数 `universal-argument`，M-DEL 绑定到函数 `backward-kill-word`，C-o 绑定到执行右边表达式的宏（即将文本 `> output` 插入到行中）。处理此键绑定语法时，会识别一些符号字符名称：DEL、ESC、ESCAPE、LFD、NEWLINE、RET、RETURN、RUBOUT、SPACE、SPC 和 TAB。
  
  - "keyseq": function-name or macro "键序列"：函数名称或宏
  
    keyseq differs from keyname above in that strings denoting an entire key sequence can be specified, by placing the key sequence in double quotes. Some GNU Emacs style key escapes can be used, as in the following example, but the special character names are not recognized.
  
    "键序列" 与上面的键名不同，可以指定表示整个键序列的字符串，只需将键序列放在双引号中。一些 GNU Emacs 风格的键逃逸也可以使用，如下面的示例所示，但不识别特殊字符名称。
    
    ```
    "\C-u": universal-argument
    "\C-x\C-r": re-read-init-file
    "\e[11~": "Function Key 1"
    ```
  
    In the above example, C-u is again bound to the function `universal-argument` (just as it was in the first example), `C-x C-r` is bound to the function `re-read-init-file`, and `ESC [ 1 1 ~` is bound to insert the text `Function Key 1`.
    
    在上面的示例中，C-u 再次绑定到函数 `universal-argument`（与第一个示例中的一样），`C-x C-r` 绑定到函数 `re-read-init-file`，`ESC [ 1 1 ~` 绑定到插入文本 `Function Key 1`。
    
    
  
  The following GNU Emacs style escape sequences are available when specifying key sequences:
  
  GNU Emacs 风格的逃逸序列在指定键序列时提供以下选项：
  
  - `\C-`：控制前缀
  - `\M-`：元前缀
  - `\e`：转义字符
  - `\\`：反斜杠
  - `\"\"`：双引号
  - `\'\'`：单引号或撇号
  
  
  
  In addition to the GNU Emacs style escape sequences, a second set of backslash escapes is available:
  
  ​	除了 GNU Emacs 风格的逃逸序列外，还提供第二组反斜杠逃逸：
  
  
  
  - `\a`：警报（响铃）
  - `\b`：退格
  - `\d`：删除
  - `\f`：换页符
  - `\n`：换行
  - `\r`：回车
  - `\t`：水平制表符
  - `\v`：垂直制表符
  - `\nnn`：八位字符，其值为八进制值 nnn（一到三位数）
  - `\xHH`：八位字符，其值为十六进制值 HH（一到两位十六进制数）
  
  
  
  When entering the text of a macro, single or double quotes must be used to indicate a macro definition. Unquoted text is assumed to be a function name. In the macro body, the backslash escapes described above are expanded. Backslash will quote any other character in the macro text, including `"` and `'`. For example, the following binding will make `C-x \` insert a single `\` into the line:
  
  ​	在输入宏文本时，必须使用单引号或双引号来表示宏定义。未引用的文本被视为函数名。在宏体中，会展开上述反斜杠逃逸。反斜杠将对宏文本中的任何其他字符进行转义，包括 `"` 和 `'`。例如，以下绑定将使 `C-x \` 插入一个单独的 `\` 到行中：
  
  ```
  "\C-x\\": "\\"
  ```
  
  





#### 8.3.2 条件初始化结构

Readline implements a facility similar in spirit to the conditional compilation features of the C preprocessor which allows key bindings and variable settings to be performed as the result of tests. There are four parser directives used.

​	Readline 实现了一种类似于 C 预处理器的条件编译功能，允许根据测试的结果执行键绑定和变量设置。有四个解析器指令用于此目的。

- `$if`

  The `$if` construct allows bindings to be made based on the editing mode, the terminal being used, or the application using Readline. The text of the test, after any comparison operator, extends to the end of the line; unless otherwise noted, no characters are required to isolate it.

  `$if` 结构允许基于编辑模式、使用的终端或使用 Readline 的应用程序进行绑定。测试的文本，在任何比较运算符之后，延伸到行的末尾；除非另有说明，不需要任何字符来隔离它。

  `mode`: The `mode=` form of the `$if` directive is used to test whether Readline is in `emacs` or `vi` mode. This may be used in conjunction with the `set keymap` command, for instance, to set bindings in the `emacs-standard` and `emacs-ctlx` keymaps only if Readline is starting out in `emacs` mode.

  `mode`：`$if` 指令的 `mode=` 形式用于测试 Readline 是否处于 `emacs` 或 `vi` 模式。例如，这可与 `set keymap` 命令一起使用，只有当 Readline 在 `emacs` 模式下启动时，才设置 `emacs-standard` 和 `emacs-ctlx` 键映射中的绑定。

  `term`: The `term=` form may be used to include terminal-specific key bindings, perhaps to bind the key sequences output by the terminal's function keys. The word on the right side of the `=` is tested against both the full name of the terminal and the portion of the terminal name before the first `-`. This allows `sun` to match both `sun` and `sun-cmd`, for instance.

  `term`：`term=` 形式可用于包含特定于终端的键绑定，也许是为了绑定终端功能键输出的键序列。`=` 右侧的单词将与终端的完整名称和第一个 `-` 前的终端名称部分进行匹配。这允许 `sun` 匹配 `sun` 和 `sun-cmd`，例如。

  `version`: The `version` test may be used to perform comparisons against specific Readline versions. The `version` expands to the current Readline version. The set of comparison operators includes `=` (and `==`), `!=`, `<=`, `>=`, `<`, and `>`. The version number supplied on the right side of the operator consists of a major version number, an optional decimal point, and an optional minor version (e.g., `7.1`). If the minor version is omitted, it is assumed to be `0`. The operator may be separated from the string `version` and from the version number argument by whitespace. The following example sets a variable if the Readline version being used is 7.0 or newer:

  `version`：`version` 测试可用于与特定的 Readline 版本进行比较。`version` 展开为当前的 Readline 版本。可用的比较运算符包括 `=`（和 `==`）、`!=`、`<=`、`>=`、`<` 和 `>`。运算符右侧提供的版本号包括主版本号、可选的小数点和可选的次版本号（例如 `7.1`）。如果省略次版本号，则默认为 `0`。运算符可以与字符串 `version` 和版本号参数之间用空格分隔。以下示例设置一个变量，如果使用的 Readline 版本是 7.0 或更高版本：

  ```
  $if version >= 7.0
  set show-mode-in-prompt on
  $endif
  ```

  `application`: The application construct is used to include application-specific settings. Each program using the Readline library sets the application name, and you can test for a particular value. This could be used to bind key sequences to functions useful for a specific program. For instance, the following command adds a key sequence that quotes the current or previous word in Bash:

  `application`：application 结构用于包含特定于应用程序的设置。每个使用 Readline 库的程序都会设置应用程序名称，您可以测试特定的值。这可用于将键序列绑定到特定程序有用的功能上。例如，以下命令添加了一个键序列，用于在 Bash 中引用当前或前一个单词：

  ```
  $if Bash
  # Quote the current or previous word
  "\C-xq": "\eb\"\ef\""
  $endif
  ```

  `variable`: The variable construct provides simple equality tests for Readline variables and values. The permitted comparison operators are `=`, `==`, and `!=`. The variable name must be separated from the comparison operator by whitespace; the operator may be separated from the value on the right hand side by whitespace. Both string and boolean variables may be tested. Boolean variables must be tested against the values on and off. The following example is equivalent to the `mode=emacs` test described above:

  `variable`：variable 结构提供了对 Readline 变量和值的简单等式测试。允许使用的比较运算符有 `=`、`==` 和 `!=`。变量名必须与比较运算符用空格分隔；运算符可以与右侧值用空格分隔。可以测试字符串和布尔变量。布尔变量必须根据 on 和 off 进行测试。以下示例等同于上面描述的 `mode=emacs` 测试：

  ```
  $if editing-mode == emacs
  set show-mode-in-prompt on
  $endif
  ```

  

- `$endif`

  This command, as seen in the previous example, terminates an `$if` command.

  正如前面的示例中所见，此命令终止 `$if` 命令。

- `$else`

  Commands in this branch of the `$if` directive are executed if the test fails.

  如果测试失败，则执行 `$if` 指令的此分支中的命令。

- `$include`

  This directive takes a single filename as an argument and reads commands and bindings from that file. For example, the following directive reads from /etc/inputrc:
  
  此指令以单个文件名作为参数，并从该文件中读取命令和绑定。例如，以下指令从 /etc/inputrc 中读取：
  
  ```
  $include /etc/inputrc
  ```
  
  





#### 8.3.3 示例初始化文件

Here is an example of an inputrc file. This illustrates key binding, variable assignment, and conditional syntax.

​	以下是一个 inputrc 文件的示例。这展示了键绑定、变量赋值和条件语法。

```
# This file controls the behaviour of line input editing for
# programs that use the GNU Readline library.  Existing
# programs include FTP, Bash, and GDB.
# 以下是一个 inputrc 文件的示例。
# 这控制着使用 GNU Readline 库的程序中的行输入编辑行为。
# 现有的程序包括 FTP、Bash 和 GDB。
#
# You can re-read the inputrc file with C-x C-r.
# Lines beginning with '#' are comments.
# 您可以使用 C-x C-r 重新读取 inputrc 文件。以 '#' 开头的行是注释。
#
# First, include any system-wide bindings and variable
# assignments from /etc/Inputrc
# 首先，包括来自 /etc/Inputrc 的任何系统范围的绑定和变量赋值。
$include /etc/Inputrc

#
# Set various bindings for emacs mode.
# 为 emacs 模式设置不同的绑定。

set editing-mode emacs 

$if mode=emacs

Meta-Control-h:	backward-kill-word	Text after the function name is ignored

#
# Arrow keys in keypad mode
# 下面是在小键盘模式下的箭头键绑定
#
#"\M-OD":        backward-char
#"\M-OC":        forward-char
#"\M-OA":        previous-history
#"\M-OB":        next-history
#
# Arrow keys in ANSI mode
# 在 ANSI 模式下的箭头键绑定
#
"\M-[D":        backward-char
"\M-[C":        forward-char
"\M-[A":        previous-history
"\M-[B":        next-history
#
# Arrow keys in 8 bit keypad mode
# 在 8 位小键盘模式下的箭头键绑定
#
#"\M-\C-OD":       backward-char
#"\M-\C-OC":       forward-char
#"\M-\C-OA":       previous-history
#"\M-\C-OB":       next-history
#
# Arrow keys in 8 bit ANSI mode
# 在 8 位 ANSI 模式下的箭头键绑定
#
#"\M-\C-[D":       backward-char
#"\M-\C-[C":       forward-char
#"\M-\C-[A":       previous-history
#"\M-\C-[B":       next-history

C-q: quoted-insert

$endif

# An old-style binding.  This happens to be the default.
# 旧式绑定。这也是默认设置。
TAB: complete

# Macros that are convenient for shell interaction
# 对于与 shell 交互方便的宏
$if Bash
# edit the path
# 编辑路径
"\C-xp": "PATH=${PATH}\e\C-e\C-a\ef\C-f"
# prepare to type a quoted word --
# insert open and close double quotes
# and move to just after the open quote
# 准备输入引号包裹的单词 --
# 插入开头和结尾的双引号
# 并移到开头引号的后面
"\C-x\"": "\"\"\C-b"
# insert a backslash (testing backslash escapes
# in sequences and macros)
# 插入反斜杠（测试反斜杠转义
# 在序列和宏中）
"\C-x\\": "\\"
# Quote the current or previous word
# 引用当前或上一个单词
"\C-xq": "\eb\"\ef\""
# Add a binding to refresh the line, which is unbound
# 添加一个刷新行的绑定，该绑定未绑定
"\C-xr": redraw-current-line
# Edit variable on current line.
# 在当前行编辑变量。
"\M-\C-v": "\C-a\C-k$\C-y\M-\C-e\C-a\C-y="
$endif

# use a visible bell if one is available
# 使用可见的提示音（可用时）
set bell-style visible

# don't strip characters to 7 bits when reading
# 在读取时不要将字符截断为7位
set input-meta on

# allow iso-latin1 characters to be inserted rather
# than converted to prefix-meta sequences
# 允许插入 ISO-Latin1 字符，而不是转换为前缀-Meta序列
set convert-meta off

# display characters with the eighth bit set directly
# rather than as meta-prefixed characters
# 直接显示具有第八位设置的字符，而不是作为Meta前缀字符显示
set output-meta on

# if there are 150 or more possible completions for a word,
# ask whether or not the user wants to see all of them
# 如果单词有150个或更多的可能完成项，
# 询问用户是否要查看所有完成项
set completion-query-items 150

# For FTP
# 对于FTP
$if Ftp
"\C-xg": "get \M-?"
"\C-xt": "put \M-?"
"\M-.": yank-last-arg
$endif
```





### 8.4 可绑定的 Readline 命令

This section describes Readline commands that may be bound to key sequences. You can list your key bindings by executing `bind -P` or, for a more terse format, suitable for an inputrc file, `bind -p`. (See [Bash Builtin Commands](#42-bash-内置命令).) Command names without an accompanying key sequence are unbound by default.

​	本节描述可以绑定到键序列的 Readline 命令。您可以通过执行 `bind -P` 或者更简洁的格式 `bind -p`（适用于 inputrc 文件），列出您的键绑定。(参见[Bash 内置命令](#42-bash-内置命令)。) 默认情况下，没有附带键序列的命令是未绑定的。

In the following descriptions, *point* refers to the current cursor position, and *mark* refers to a cursor position saved by the `set-mark` command. The text between the point and mark is referred to as the *region*.

​	在以下描述中，*point* 指的是当前光标位置，*mark* 指的是由 `set-mark` 命令保存的光标位置。光标和标记之间的文本被称为*区域*。




#### 8.4.1 光标移动命令

- `beginning-of-line (C-a)`

  Move to the start of the current line.

  移动到当前行的开头。

- `end-of-line (C-e)`

  Move to the end of the line.

  移动到当前行的末尾。

- `forward-char (C-f)`

  Move forward a character.

  向前移动一个字符。

- `backward-char (C-b)`

  Move back a character.

  向后移动一个字符。

- `forward-word (M-f)`

  Move forward to the end of the next word. Words are composed of letters and digits.

  向前移动到下一个单词的末尾。单词由字母和数字组成。

- `backward-word (M-b)`

  Move back to the start of the current or previous word. Words are composed of letters and digits.

  向后移动到当前或前一个单词的开头。单词由字母和数字组成。

- `shell-forward-word (M-C-f)`

  Move forward to the end of the next word. Words are delimited by non-quoted shell metacharacters.

  向前移动到下一个单词的末尾。单词由未加引号的 shell 元字符界定。

- `shell-backward-word (M-C-b)`

  Move back to the start of the current or previous word. Words are delimited by non-quoted shell metacharacters.

  向后移动到当前或前一个单词的开头。单词由未加引号的 shell 元字符界定。

- `previous-screen-line ()`

  Attempt to move point to the same physical screen column on the previous physical screen line. This will not have the desired effect if the current Readline line does not take up more than one physical line or if point is not greater than the length of the prompt plus the screen width.

  尝试将光标移动到上一个物理屏幕行上的相同列。如果当前的 Readline 行不占据超过一个物理行，或者光标位置不大于提示符加上屏幕宽度的长度，则此命令不会起作用。

- `next-screen-line ()`

  Attempt to move point to the same physical screen column on the next physical screen line. This will not have the desired effect if the current Readline line does not take up more than one physical line or if the length of the current Readline line is not greater than the length of the prompt plus the screen width.

  尝试将光标移动到下一个物理屏幕行上的相同列。如果当前的 Readline 行不占据超过一个物理行，或者当前 Readline 行的长度不大于提示符加上屏幕宽度的长度，则此命令不会起作用。

- `clear-display (M-C-l)`

  Clear the screen and, if possible, the terminal's scrollback buffer, then redraw the current line, leaving the current line at the top of the screen.

  清除屏幕，并如果可能，清除终端的回滚缓冲区，然后重新绘制当前行，将当前行置于屏幕顶部。

- `clear-screen (C-l)`

  Clear the screen, then redraw the current line, leaving the current line at the top of the screen.

  清除屏幕，然后重新绘制当前行，将当前行置于屏幕顶部。

- `redraw-current-line ()`

  Refresh the current line. By default, this is unbound.
  
  刷新当前行。默认情况下，此命令未绑定。





#### 8.4.2 历史记录操作命令

- `accept-line (Newline or Return)`

  Accept the line regardless of where the cursor is. If this line is non-empty, add it to the history list according to the setting of the `HISTCONTROL` and `HISTIGNORE` variables. If this line is a modified history line, then restore the history line to its original state.

  接受当前行，无论光标在什么位置。如果此行非空，则根据 `HISTCONTROL` 和 `HISTIGNORE` 变量的设置将其添加到历史列表中。如果此行是修改过的历史行，则将历史行恢复为其原始状态。

- `previous-history (C-p)`

  Move `back` through the history list, fetching the previous command.

  向后移动并从历史列表中获取上一条命令。

- `next-history (C-n)`

  Move `forward` through the history list, fetching the next command.

  向前移动并从历史列表中获取下一条命令。

- `beginning-of-history (M-<)`

  Move to the first line in the history.

  移动到历史的第一行。

- `end-of-history (M->)`

  Move to the end of the input history, i.e., the line currently being entered.

  移动到输入历史的末尾，即当前正在输入的行。

- `reverse-search-history (C-r)`

  Search backward starting at the current line and moving `up` through the history as necessary. This is an incremental search. This command sets the region to the matched text and activates the mark.

  从当前行开始向后搜索，并根据需要移动到历史记录中的上一条命令。这是一个递增搜索。此命令设置区域以匹配的文本，并激活标记。

- `forward-search-history (C-s)`

  Search forward starting at the current line and moving `down` through the history as necessary. This is an incremental search. This command sets the region to the matched text and activates the mark.

  从当前行开始向前搜索，并根据需要移动到历史记录中的下一条命令。这是一个递增搜索。此命令设置区域以匹配的文本，并激活标记。

- `non-incremental-reverse-search-history (M-p)`

  Search backward starting at the current line and moving `up` through the history as necessary using a non-incremental search for a string supplied by the user. The search string may match anywhere in a history line.

  从当前行开始向后搜索，并根据需要使用用户提供的非递增搜索字符串移动到历史记录中的上一条命令。搜索字符串可以匹配历史行中的任何位置。

- `non-incremental-forward-search-history (M-n)`

  Search forward starting at the current line and moving `down` through the history as necessary using a non-incremental search for a string supplied by the user. The search string may match anywhere in a history line.

  从当前行开始向前搜索，并根据需要使用用户提供的非递增搜索字符串移动到历史记录中的下一条命令。搜索字符串可以匹配历史行中的任何位置。

- `history-search-forward ()`

  Search forward through the history for the string of characters between the start of the current line and the point. The search string must match at the beginning of a history line. This is a non-incremental search. By default, this command is unbound.

  从当前行的开头到光标位置之间搜索历史记录中的字符串。搜索字符串必须匹配历史行的开头。这是一个非递增搜索。默认情况下，此命令未绑定。

- `history-search-backward ()`

  Search backward through the history for the string of characters between the start of the current line and the point. The search string must match at the beginning of a history line. This is a non-incremental search. By default, this command is unbound.

  从当前行的开头到光标位置之间向后搜索历史记录中的字符串。搜索字符串必须匹配历史行的开头。这是一个非递增搜索。默认情况下，此命令未绑定。

- `history-substring-search-forward ()`

  Search forward through the history for the string of characters between the start of the current line and the point. The search string may match anywhere in a history line. This is a non-incremental search. By default, this command is unbound.

  从当前行的开头到光标位置之间向前搜索历史记录中的字符串。搜索字符串可以匹配历史行中的任何位置。这是一个非递增搜索。默认情况下，此命令未绑定。

- `history-substring-search-backward ()`

  Search backward through the history for the string of characters between the start of the current line and the point. The search string may match anywhere in a history line. This is a non-incremental search. By default, this command is unbound.

  从当前行的开头到光标位置之间向后搜索历史记录中的字符串。搜索字符串可以匹配历史行中的任何位置。这是一个非递增搜索。默认情况下，此命令未绑定。

- `yank-nth-arg (M-C-y)`

  Insert the first argument to the previous command (usually the second word on the previous line) at point. With an argument n, insert the nth word from the previous command (the words in the previous command begin with word 0). A negative argument inserts the nth word from the end of the previous command. Once the argument n is computed, the argument is extracted as if the `!n` history expansion had been specified.

  在光标位置插入前一条命令的第一个参数（通常是前一行的第二个单词）。如果提供了参数 n，则插入前一条命令的第 n 个单词（前一条命令的单词从单词 0 开始）。负数参数将插入前一条命令的倒数第 n 个单词。一旦计算出参数 n，则提取参数就像指定了 `!n` 历史扩展一样。

- `yank-last-arg (M-. or M-_)`

  Insert last argument to the previous command (the last word of the previous history entry). With a numeric argument, behave exactly like `yank-nth-arg`. Successive calls to `yank-last-arg` move back through the history list, inserting the last word (or the word specified by the argument to the first call) of each line in turn. Any numeric argument supplied to these successive calls determines the direction to move through the history. A negative argument switches the direction through the history (back or forward). The history expansion facilities are used to extract the last argument, as if the `!$` history expansion had been specified.

  在光标位置插入前一条命令的最后一个参数（前一条历史记录条目的最后一个单词）。通过数字参数，表现与 `yank-nth-arg` 完全相同。连续调用 `yank-last-arg` 将在历史列表中向后移动，依次插入每一行的最后一个单词（或由第一个调用的参数指定的单词）。连续调用这些命令并提供任何数字参数，将决定历史记录的遍历方向（向后或向前）。历史扩展工具用于提取最后一个参数，就像指定了 `!$` 历史扩展一样。

- `operate-and-get-next (C-o)`

  Accept the current line for return to the calling application as if a newline had been entered, and fetch the next line relative to the current line from the history for editing. A numeric argument, if supplied, specifies the history entry to use instead of the current line.

  接受当前行以返回给调用应用程序，就像输入换行符一样，并从历史中获取相对于当前行的下一行以进行编辑。如果提供了数字参数，则使用该历史条目代替当前行。

- `fetch-history ()`

  With a numeric argument, fetch that entry from the history list and make it the current line. Without an argument, move back to the first entry in the history list.
  
  使用数字参数从历史列表中获取相应的条目，并将其设为当前行。如果没有参数，则返回到历史列表中的第一个条目。





#### 8.4.3 文本修改命令

- `*end-of-file* (usually C-d)`

  The character indicating end-of-file as set, for example, by `stty`. If this character is read when there are no characters on the line, and point is at the beginning of the line, Readline interprets it as the end of input and returns EOF.

  表示文件结束的字符，例如通过 `stty` 设置。如果在行上没有字符，且光标位于行的开头时读取此字符，Readline 将将其解释为输入的结束，并返回 EOF。

- `delete-char (C-d)`

  Delete the character at point. If this function is bound to the same character as the tty EOF character, as C-d commonly is, see above for the effects.

  删除光标位置的字符。如果将此函数绑定到与 tty 的 EOF 字符相同的字符（通常是 C-d），请参阅上面的效果说明。

- `backward-delete-char (Rubout)`

  Delete the character behind the cursor. A numeric argument means to kill the characters instead of deleting them.

  删除光标后面的字符。数字参数表示删除字符而不是杀死字符。

- `forward-backward-delete-char ()`

  Delete the character under the cursor, unless the cursor is at the end of the line, in which case the character behind the cursor is deleted. By default, this is not bound to a key.

  删除光标下的字符，除非光标在行的末尾，在这种情况下，删除光标后面的字符。默认情况下，此命令未绑定到任何键。

- `quoted-insert (C-q or C-v)`

  Add the next character typed to the line verbatim. This is how to insert key sequences like C-q, for example.

  逐字添加下一个键入的字符到行中。这是插入类似 C-q 的键序列的方法。

- `self-insert (a, b, A, 1, !, …)`

  Insert yourself.

  插入字符本身。

- `bracketed-paste-begin ()`

  This function is intended to be bound to the "bracketed paste" escape sequence sent by some terminals, and such a binding is assigned by default. It allows Readline to insert the pasted text as a single unit without treating each character as if it had been read from the keyboard. The characters are inserted as if each one was bound to `self-insert` instead of executing any editing commands.Bracketed paste sets the region (the characters between point and the mark) to the inserted text. It uses the concept of an *active mark*: when the mark is active, Readline redisplay uses the terminal's standout mode to denote the region.

  此函数旨在绑定到一些终端发送的“括号粘贴”转义序列，并且默认情况下已分配此绑定。它允许 Readline 将粘贴的文本作为单个单元插入，而不是将每个字符视为从键盘读取。这些字符被插入，就像每个字符都绑定到 `self-insert` 而不是执行任何编辑命令。括号粘贴设置区域（光标与标记之间的字符）为插入的文本。它使用“活动标记”的概念：当标记处于活动状态时，Readline 重显示使用终端的反白显示模式来表示区域。

- `transpose-chars (C-t)`

  Drag the character before the cursor forward over the character at the cursor, moving the cursor forward as well. If the insertion point is at the end of the line, then this transposes the last two characters of the line. Negative arguments have no effect.

  将光标前面的字符拖移到光标处的字符上，并将光标向前移动。如果插入点在行的末尾，则会交换行的最后两个字符。负数参数没有影响。

- `transpose-words (M-t)`

  Drag the word before point past the word after point, moving point past that word as well. If the insertion point is at the end of the line, this transposes the last two words on the line.

  将光标前的单词移到光标后的单词上，并将光标移到该单词之后。如果插入点在行的末尾，则会交换行的最后两个单词。

- `upcase-word (M-u)`

  Uppercase the current (or following) word. With a negative argument, uppercase the previous word, but do not move the cursor.

  将当前（或后面的）单词转换为大写。使用负数参数时，将前一个单词转换为大写，但不移动光标。

- `downcase-word (M-l)`

  Lowercase the current (or following) word. With a negative argument, lowercase the previous word, but do not move the cursor.

  将当前（或后面的）单词转换为小写。使用负数参数时，将前一个单词转换为小写，但不移动光标。

- `capitalize-word (M-c)`

  Capitalize the current (or following) word. With a negative argument, capitalize the previous word, but do not move the cursor.

  将当前（或后面的）单词的首字母大写。使用负数参数时，将前一个单词的首字母大写，但不移动光标。

- `overwrite-mode ()`

  Toggle overwrite mode. With an explicit positive numeric argument, switches to overwrite mode. With an explicit non-positive numeric argument, switches to insert mode. This command affects only `emacs` mode; `vi` mode does overwrite differently. Each call to `readline()` starts in insert mode.In overwrite mode, characters bound to `self-insert` replace the text at point rather than pushing the text to the right. Characters bound to `backward-delete-char` replace the character before point with a space.By default, this command is unbound.
  
  切换覆盖模式。通过显式的正数数字参数，切换到覆盖模式。通过显式的非正数数字参数，切换到插入模式。此命令仅影响 `emacs` 模式；`vi` 模式以不同的方式执行覆盖。每次调用 `readline()` 时都会以插入模式开始。在覆盖模式下，绑定为 `self-insert` 的字符将替换点处的文本，而不是将文本向右推动。绑定为 `backward-delete-char` 的字符将用空格替换点前面的字符。默认情况下，此命令未绑定。





#### 8.4.4 剪切和粘贴 Killing And Yanking

- `kill-line (C-k)`

  Kill the text from point to the end of the line. With a negative numeric argument, kill backward from the cursor to the beginning of the current line.

  从光标到行尾的文本被剪切。如果提供了负数数字参数，则从光标到当前行的开头进行剪切。

- `backward-kill-line (C-x Rubout)`

  Kill backward from the cursor to the beginning of the current line. With a negative numeric argument, kill forward from the cursor to the end of the current line.

  从光标向行的开头进行剪切。如果提供了负数数字参数，则从光标向当前行的末尾进行剪切。

- `unix-line-discard (C-u)`

  Kill backward from the cursor to the beginning of the current line.

  从光标向行的开头进行剪切。

- `kill-whole-line ()`

  Kill all characters on the current line, no matter where point is. By default, this is unbound.

  剪切当前行的所有字符，无论光标在什么位置。默认情况下，此命令未绑定。

- `kill-word (M-d)`

  Kill from point to the end of the current word, or if between words, to the end of the next word. Word boundaries are the same as `forward-word`.

  从光标位置剪切到当前单词的末尾，或者如果光标位于单词之间，则剪切到下一个单词的末尾。单词边界与 `forward-word` 相同。

- `backward-kill-word (M-DEL)`

  Kill the word behind point. Word boundaries are the same as `backward-word`.

  剪切光标后的单词。单词边界与 `backward-word` 相同。

- `shell-kill-word (M-C-d)`

  Kill from point to the end of the current word, or if between words, to the end of the next word. Word boundaries are the same as `shell-forward-word`.

  从光标位置剪切到当前单词的末尾，或者如果光标位于单词之间，则剪切到下一个单词的末尾。单词边界与 `shell-forward-word` 相同。

- `shell-backward-kill-word ()`

  Kill the word behind point. Word boundaries are the same as `shell-backward-word`.

  剪切光标后的单词。单词边界与 `shell-backward-word` 相同。

- `shell-transpose-words (M-C-t)`

  Drag the word before point past the word after point, moving point past that word as well. If the insertion point is at the end of the line, this transposes the last two words on the line. Word boundaries are the same as `shell-forward-word` and `shell-backward-word`.

  将光标前的单词移到光标后的单词上，并将光标移到该单词之后。如果插入点在行的末尾，则会交换行的最后两个单词。单词边界与 `shell-forward-word` 和 `shell-backward-word` 相同。

- `unix-word-rubout (C-w)`

  Kill the word behind point, using white space as a word boundary. The killed text is saved on the kill-ring.

  使用空格作为单词边界剪切光标后的单词。被剪切的文本保存在 kill-ring 中。

- `unix-filename-rubout ()`

  Kill the word behind point, using white space and the slash character as the word boundaries. The killed text is saved on the kill-ring.

  使用空格和斜杠字符作为单词边界剪切光标后的单词。被剪切的文本保存在 kill-ring 中。

- `delete-horizontal-space ()`

  Delete all spaces and tabs around point. By default, this is unbound.

  删除光标周围的所有空格和制表符。默认情况下，此命令未绑定。

- `kill-region ()`

  Kill the text in the current region. By default, this command is unbound.

  剪切当前区域中的文本。默认情况下，此命令未绑定。

- `copy-region-as-kill ()`

  Copy the text in the region to the kill buffer, so it can be yanked right away. By default, this command is unbound.

  将区域中的文本复制到 kill 缓冲区，以便可以立即粘贴。默认情况下，此命令未绑定。

- `copy-backward-word ()`

  Copy the word before point to the kill buffer. The word boundaries are the same as `backward-word`. By default, this command is unbound.

  将光标前的单词复制到 kill 缓冲区。单词边界与 `backward-word` 相同。默认情况下，此命令未绑定。

- `copy-forward-word ()`

  Copy the word following point to the kill buffer. The word boundaries are the same as `forward-word`. By default, this command is unbound.

  将光标后的单词复制到 kill 缓冲区。单词边界与 `forward-word` 相同。默认情况下，此命令未绑定。

- `yank (C-y)`

  Yank the top of the kill ring into the buffer at point.

  将 kill 环中的内容粘贴到光标处的缓冲区。

- `yank-pop (M-y)`

  Rotate the kill-ring, and yank the new top. You can only do this if the prior command is `yank` or `yank-pop`.
  
  旋转 kill 环，并粘贴新的顶部内容。仅在先前的命令是 `yank` 或 `yank-pop` 时可以执行此操作。





#### 8.4.5 指定数值参数

- `digit-argument (M-0, M-1, … M--)`

  Add this digit to the argument already accumulating, or start a new argument. M-- starts a negative argument.

  将此数字添加到已经累积的参数中，或开始一个新的参数。M-- 表示一个负数参数。

- `universal-argument ()`

  This is another way to specify an argument. If this command is followed by one or more digits, optionally with a leading minus sign, those digits define the argument. If the command is followed by digits, executing `universal-argument` again ends the numeric argument, but is otherwise ignored. As a special case, if this command is immediately followed by a character that is neither a digit nor minus sign, the argument count for the next command is multiplied by four. The argument count is initially one, so executing this function the first time makes the argument count four, a second time makes the argument count sixteen, and so on. By default, this is not bound to a key.
  
  这是另一种指定参数的方式。如果在该命令后跟一个或多个数字，可选择带有负号的前导符号，这些数字定义了参数。如果该命令后跟数字，再次执行 `universal-argument` 将结束数值参数，但忽略其他情况。作为特例，如果该命令紧接着跟着一个既不是数字也不是负号的字符，下一条命令的参数计数将乘以四。参数计数最初为一，因此第一次执行此函数将参数计数设置为四，第二次设置为十六，依此类推。默认情况下，该命令未绑定到键。





#### 8.4.6 让 Readline 为你键入

- `complete (TAB)`

  Attempt to perform completion on the text before point. The actual completion performed is application-specific. Bash attempts completion treating the text as a variable (if the text begins with `$`), username (if the text begins with `~`), hostname (if the text begins with `@`), or command (including aliases and functions) in turn. If none of these produces a match, filename completion is attempted.

  尝试对光标之前的文本进行自动补全。实际的补全操作是应用程序特定的。对于 Bash，它会依次尝试将文本视为变量（如果文本以 `$` 开头），用户名（如果文本以 `~` 开头），主机名（如果文本以 `@` 开头）或命令（包括别名和函数）。如果这些都没有匹配，则尝试进行文件名补全。

- `possible-completions (M-?)`

  List the possible completions of the text before point. When displaying completions, Readline sets the number of columns used for display to the value of `completion-display-width`, the value of the environment variable `COLUMNS`, or the screen width, in that order.

  列出光标之前的文本可能的自动补全选项。在显示补全选项时，Readline 将显示的列数设置为 `completion-display-width` 的值，环境变量 `COLUMNS` 的值或屏幕宽度，按此顺序。

- `insert-completions (M-*)`

  Insert all completions of the text before point that would have been generated by `possible-completions`.

  插入光标之前所有可能的自动补全选项。

- `menu-complete ()`

  Similar to `complete`, but replaces the word to be completed with a single match from the list of possible completions. Repeated execution of `menu-complete` steps through the list of possible completions, inserting each match in turn. At the end of the list of completions, the bell is rung (subject to the setting of `bell-style`) and the original text is restored. An argument of n moves n positions forward in the list of matches; a negative argument may be used to move backward through the list. This command is intended to be bound to `TAB`, but is unbound by default.

  类似于 `complete`，但用单个匹配项替换要补全的单词。重复执行 `menu-complete` 将在可能的补全列表中依次插入每个匹配项。在补全列表的末尾，会响铃（取决于 `bell-style` 的设置），并恢复原始文本。n 个参数将 n 个位置前进或后退。这个命令原本是要绑定到 `TAB` 键，但默认情况下未绑定。

- `menu-complete-backward ()`

  Identical to `menu-complete`, but moves backward through the list of possible completions, as if `menu-complete` had been given a negative argument.

  与 `menu-complete` 相同，但向后移动可能的补全列表，就像给 `menu-complete` 一个负数参数一样。

- `delete-char-or-list ()`

  Deletes the character under the cursor if not at the beginning or end of the line (like `delete-char`). If at the end of the line, behaves identically to `possible-completions`. This command is unbound by default.

  如果不在行的开头或结尾，则删除光标下的字符（类似于 `delete-char`）。如果在行的末尾，则与 `possible-completions` 表现相同。默认情况下，此命令未绑定。

- `complete-filename (M-/)`

  Attempt filename completion on the text before point.

  尝试对光标之前的文本进行文件名补全。

- `possible-filename-completions (C-x /)`

  List the possible completions of the text before point, treating it as a filename.

  列出光标之前的文本可能的文件名补全选项。

- `complete-username (M-~)`

  Attempt completion on the text before point, treating it as a username.

  尝试对光标之前的文本进行用户名补全。

- `possible-username-completions (C-x ~)`

  List the possible completions of the text before point, treating it as a username.

  列出光标之前的文本可能的用户名补全选项。

- `complete-variable (M-$)`

  Attempt completion on the text before point, treating it as a shell variable.

  尝试对光标之前的文本进行 Shell 变量补全。

- `possible-variable-completions (C-x $)`

  List the possible completions of the text before point, treating it as a shell variable.

  列出光标之前的文本可能的 Shell 变量补全选项。

- `complete-hostname (M-@)`

  Attempt completion on the text before point, treating it as a hostname.

  尝试对光标之前的文本进行主机名补全。

- `possible-hostname-completions (C-x @)`

  List the possible completions of the text before point, treating it as a hostname.

  列出光标之前的文本可能的主机名补全选项。

- `complete-command (M-!)`

  Attempt completion on the text before point, treating it as a command name. Command completion attempts to match the text against aliases, reserved words, shell functions, shell builtins, and finally executable filenames, in that order.

  尝试对光标之前的文本进行命令名补全。命令补全尝试将文本与别名、保留字、Shell 函数、Shell 内置命令以及最后是可执行文件名依次进行匹配。

- `possible-command-completions (C-x !)`

  List the possible completions of the text before point, treating it as a command name.

  列出光标之前的文本可能的命令名补全选项。

- `dynamic-complete-history (M-TAB)`

  Attempt completion on the text before point, comparing the text against lines from the history list for possible completion matches.

  尝试对光标之前的文本进行动态历史记录补全，比对历史记录列表中的文本，找到可能的匹配项。

- `dabbrev-expand ()`

  Attempt menu completion on the text before point, comparing the text against lines from the history list for possible completion matches.

  尝试对光标之前的文本进行菜单补全，比对历史记录列表中的文本，找到可能的匹配项。

- `complete-into-braces (M-{)`

  Perform filename completion and insert the list of possible completions enclosed within braces so the list is available to the shell (see [Brace Expansion](#351-花括号扩展)).
  
  执行文件名补全，并在大括号内插入可能的补全列表，使列表对 Shell 可见（参见 [Brace Expansion](#351-花括号扩展)）。





#### 8.4.7 键盘宏

- `start-kbd-macro (C-x ()`

  Begin saving the characters typed into the current keyboard macro.

  开始保存当前键盘宏中键入的字符。

- `end-kbd-macro (C-x ))`

  Stop saving the characters typed into the current keyboard macro and save the definition.

  停止保存当前键盘宏中键入的字符并保存定义。

- `call-last-kbd-macro (C-x e)`

  Re-execute the last keyboard macro defined, by making the characters in the macro appear as if typed at the keyboard.

  通过使宏中的字符显示为键盘上键入的字符，重新执行最后一个定义的键盘宏。

- `print-last-kbd-macro ()`

  Print the last keyboard macro defined in a format suitable for the inputrc file.
  
  以适用于 inputrc 文件的格式打印最后一个定义的键盘宏。





#### 8.4.8 一些杂项命令

- `re-read-init-file (C-x C-r)`

  Read in the contents of the inputrc file, and incorporate any bindings or variable assignments found there.

  重新读取 inputrc 文件的内容，并包含其中找到的任何绑定或变量赋值。

- `abort (C-g)`

  Abort the current editing command and ring the terminal's bell (subject to the setting of `bell-style`).

  中止当前的编辑命令并响铃终端的铃声（取决于 `bell-style` 的设置）。

- `do-lowercase-version (M-A, M-B, M-x, …)`

  If the metafied character x is upper case, run the command that is bound to the corresponding metafied lower case character. The behavior is undefined if x is already lower case.

  如果 metafied 字符 x 是大写的，则运行绑定到相应 metafied 小写字符的命令。如果 x 已经是小写的，则行为未定义。

- `prefix-meta (ESC)`

  Metafy the next character typed. This is for keyboards without a meta key. Typing `ESC f` is equivalent to typing M-f.

  将下一个键入的字符转换为 meta 键字符。这适用于没有 meta 键的键盘。输入 `ESC f` 等同于输入 M-f。

- `undo (C-_ or C-x C-u)`

  Incremental undo, separately remembered for each line.

  增量撤消，每行单独记忆。

- `revert-line (M-r)`

  Undo all changes made to this line. This is like executing the `undo` command enough times to get back to the beginning.

  撤消对该行所做的所有更改。这相当于执行足够多次 `undo` 命令，使得回到最开始的状态。

- `tilde-expand (M-&)`

  Perform tilde expansion on the current word.

  对当前单词执行波浪线扩展（tilde expansion）。

- `set-mark (C-@)`

  Set the mark to the point. If a numeric argument is supplied, the mark is set to that position.

  将标记设置为当前光标位置。如果提供了一个数字参数，标记会被设置为该位置。

- `exchange-point-and-mark (C-x C-x)`

  Swap the point with the mark. The current cursor position is set to the saved position, and the old cursor position is saved as the mark.

  交换光标和标记的位置。当前光标位置设置为保存的位置，旧的光标位置保存为标记。

- `character-search (C-])`

  A character is read and point is moved to the next occurrence of that character. A negative argument searches for previous occurrences.

  读取一个字符，并将光标移到该字符的下一个出现位置。负数参数搜索前面的出现位置。

- `character-search-backward (M-C-])`

  A character is read and point is moved to the previous occurrence of that character. A negative argument searches for subsequent occurrences.

  读取一个字符，并将光标移到该字符的前一个出现位置。负数参数搜索后面的出现位置。

- `skip-csi-sequence ()`

  Read enough characters to consume a multi-key sequence such as those defined for keys like Home and End. Such sequences begin with a Control Sequence Indicator (CSI), usually ESC-[. If this sequence is bound to "\e[", keys producing such sequences will have no effect unless explicitly bound to a Readline command, instead of inserting stray characters into the editing buffer. This is unbound by default, but usually bound to ESC-[.

  读取足够的字符以消耗类似于 Home 和 End 等键定义的多键序列。这些序列通常以控制序列指示符（CSI）开始，通常为 ESC-[。如果该序列绑定为 "\e["，则产生这些序列的键将不会产生效果，除非明确绑定到 Readline 命令，而不是将杂乱的字符插入到编辑缓冲区。默认情况下，此命令未绑定，但通常绑定到 ESC-[。

- `insert-comment (M-#)`

  Without a numeric argument, the value of the `comment-begin` variable is inserted at the beginning of the current line. If a numeric argument is supplied, this command acts as a toggle: if the characters at the beginning of the line do not match the value of `comment-begin`, the value is inserted, otherwise the characters in `comment-begin` are deleted from the beginning of the line. In either case, the line is accepted as if a newline had been typed. The default value of `comment-begin` causes this command to make the current line a shell comment. If a numeric argument causes the comment character to be removed, the line will be executed by the shell.

  如果没有数字参数，则在当前行的开头插入 `comment-begin` 变量的值。如果提供了数字参数，则此命令将充当切换：如果行首的字符与 `comment-begin` 的值不匹配，则插入该值，否则从行首删除 `comment-begin` 中的字符。无论哪种情况，该行都被接受，就像键入了一个新行一样。`comment-begin` 的默认值使此命令将当前行设置为 Shell 注释。如果数字参数导致注释字符被移除，则该行将由 Shell 执行。

- `dump-functions ()`

  Print all of the functions and their key bindings to the Readline output stream. If a numeric argument is supplied, the output is formatted in such a way that it can be made part of an inputrc file. This command is unbound by default.

  将所有函数及其键绑定打印到 Readline 输出流中。如果提供了数字参数，则输出以适合作为 inputrc 文件的一部分的格式进行格式化。默认情况下，此命令未绑定。

- `dump-variables ()`

  Print all of the settable variables and their values to the Readline output stream. If a numeric argument is supplied, the output is formatted in such a way that it can be made part of an inputrc file. This command is unbound by default.

  将所有可设置的变量及其值打印到 Readline 输出流中。如果提供了数字参数，则输出以适合作为 inputrc 文件的一部分的格式进行格式化。默认情况下，此命令未绑定。

- `dump-macros ()`

  Print all of the Readline key sequences bound to macros and the strings they output. If a numeric argument is supplied, the output is formatted in such a way that it can be made part of an inputrc file. This command is unbound by default.

  将所有绑定到宏的 Readline 键序列及其输出字符串打印出来。如果提供了数字参数，则输出以适合作为 inputrc 文件的一部分的格式进行格式化。默认情况下，此命令未绑定。

- `spell-correct-word (C-x s)`

  Perform spelling correction on the current word, treating it as a directory or filename, in the same way as the `cdspell` shell option. Word boundaries are the same as those used by `shell-forward-word`.

  对当前单词执行拼写纠正，将其视为目录或文件名，与 `cdspell` Shell 选项相同。单词边界与 `shell-forward-word` 使用的相同。

- `glob-complete-word (M-g)`

  The word before point is treated as a pattern for pathname expansion, with an asterisk implicitly appended. This pattern is used to generate a list of matching file names for possible completions.

  将光标之前的单词视为路径名扩展的模式，隐含地附加一个星号。该模式用于生成可能的补全项的匹配文件名列表。

- `glob-expand-word (C-x *)`

  The word before point is treated as a pattern for pathname expansion, and the list of matching file names is inserted, replacing the word. If a numeric argument is supplied, a `*` is appended before pathname expansion.

  将光标之前的单词视为路径名扩展的模式，并插入匹配文件名的列表，替换该单词。如果提供了数字参数，则在路径名扩展之前附加一个 `*`。

- `glob-list-expansions (C-x g)`

  The list of expansions that would have been generated by `glob-expand-word` is displayed, and the line is redrawn. If a numeric argument is supplied, a `*` is appended before pathname expansion.

  显示由 `glob-expand-word` 生成的扩展列表，并重绘该行。如果提供了数字参数，则在路径名扩展之前附加一个 `*`。

- `display-shell-version (C-x C-v)`

  Display version information about the current instance of Bash.

  显示有关当前 Bash 实例的版本信息。

- `shell-expand-line (M-C-e)`

  Expand the line as the shell does. This performs alias and history expansion as well as all of the shell word expansions (see [Shell Expansions](#35-shell-扩展)).

  以 Shell 的方式展开行。这将执行别名和历史记录扩展，以及所有 Shell 单词扩展（参见 [Shell Expansions](#35-shell-扩展)）。

- `history-expand-line (M-^)`

  Perform history expansion on the current line.

  对当前行执行历史记录扩展。

- `magic-space ()`

  Perform history expansion on the current line and insert a space (see [History Expansion](#93-历史记录扩展)).

  在当前行上执行历史扩展，并插入一个空格（参见[历史扩展](#93-历史记录扩展)）。

- `alias-expand-line ()`

  Perform alias expansion on the current line (see [Aliases](#66-别名)).

  在当前行上执行别名扩展（参见[别名](#66-别名)）。

- `history-and-alias-expand-line ()`

  Perform history and alias expansion on the current line.

  在当前行上执行历史和别名扩展。

- `insert-last-argument (M-. or M-_)`

  A synonym for `yank-last-arg`.

  `yank-last-arg` 的同义词。

- `edit-and-execute-command (C-x C-e)`

  Invoke an editor on the current command line, and execute the result as shell commands. Bash attempts to invoke `$VISUAL`, `$EDITOR`, and `emacs` as the editor, in that order.
  
  在当前命令行上调用编辑器，并将结果作为 Shell 命令执行。Bash 尝试按顺序调用 `$VISUAL`，`$EDITOR` 和 `emacs` 作为编辑器。





### 8.5 Readline vi 模式

While the Readline library does not have a full set of `vi` editing functions, it does contain enough to allow simple editing of the line. The Readline `vi` mode behaves as specified in the POSIX standard.

​	虽然 Readline 库没有完整的 `vi` 编辑功能集，但它包含足够的功能来允许对行进行简单的编辑。Readline 的 `vi` 模式遵循 POSIX 标准的规定。

In order to switch interactively between `emacs` and `vi` editing modes, use the `set -o emacs` and `set -o vi` commands (see [The Set Builtin](#431-内置命令set)). The Readline default is `emacs` mode.

​	为了在 `emacs` 和 `vi` 编辑模式之间进行交互切换，请使用 `set -o emacs` 和 `set -o vi` 命令（参见 [The Set Builtin](#431-内置命令set)）。Readline 默认是 `emacs` 模式。

When you enter a line in `vi` mode, you are already placed in `insertion` mode, as if you had typed an `i`. Pressing `ESC` switches you into `command` mode, where you can edit the text of the line with the standard `vi` movement keys, move to previous history lines with `k` and subsequent lines with `j`, and so forth.

​	当您进入 `vi` 模式的行时，已经处于 `插入` 模式，就像您键入了一个 `i`。按下 `ESC` 键会切换到 `命令` 模式，在该模式下，您可以使用标准的 `vi` 移动键来编辑行的文本，使用 `k` 键移到上一个历史行，使用 `j` 键移到后续历史行，等等。





### 8.6 可编程自动完成



When word completion is attempted for an argument to a command for which a completion specification (a compspec) has been defined using the `complete` builtin (see [Programmable Completion Builtins](#87-可编程完成内置命令)), the programmable completion facilities are invoked.

​	当尝试对一个命令的参数进行单词完成时，如果使用`complete`内置命令定义了一个完成规范（compspec），那么可编程自动完成功能将被调用。

First, the command name is identified. If a compspec has been defined for that command, the compspec is used to generate the list of possible completions for the word. If the command word is the empty string (completion attempted at the beginning of an empty line), any compspec defined with the -E option to `complete` is used. If the command word is a full pathname, a compspec for the full pathname is searched for first. If no compspec is found for the full pathname, an attempt is made to find a compspec for the portion following the final slash. If those searches do not result in a compspec, any compspec defined with the -D option to `complete` is used as the default. If there is no default compspec, Bash attempts alias expansion on the command word as a final resort, and attempts to find a compspec for the command word from any successful expansion

​	首先，识别命令名称。如果已为该命令定义了compspec，则将使用该compspec来生成该单词的可能完成列表。如果命令单词是空字符串（在空行的开头尝试完成），则将使用任何使用`complete`命令定义的-E选项的compspec。如果命令单词是完整路径名，则首先搜索完整路径名的compspec。如果在完整路径名中没有找到compspec，则尝试为最后一个斜杠后面的部分找到compspec。如果这些搜索未生成compspec，则将使用使用`complete`命令定义的-D选项的任何compspec作为默认值。如果没有默认的compspec，则Bash将在最后的情况下尝试对命令单词进行别名扩展，并尝试从任何成功的扩展中找到compspec。

Once a compspec has been found, it is used to generate the list of matching words. If a compspec is not found, the default Bash completion described above (see [Letting Readline Type For You](#846-让-readline-为你键入)) is performed.

找到compspec后，将使用它来生成匹配的单词列表。如果未找到compspec，则执行上述默认Bash完成（参见[让Readline为您输入](#846-让-readline-为你键入)）。

First, the actions specified by the compspec are used. Only matches which are prefixed by the word being completed are returned. When the -f or -d option is used for filename or directory name completion, the shell variable `FIGNORE` is used to filter the matches. See [Bash Variables](#52-bash-变量), for a description of `FIGNORE`.

​	首先使用compspec指定的操作。只返回与正在完成的单词有相同前缀的匹配项。当用于文件名或目录名完成的-f或-d选项时，将使用shell变量`FIGNORE`来过滤匹配项。有关`FIGNORE`的说明，请参见[Bash变量](#52-bash-变量)。

Any completions specified by a filename expansion pattern to the -G option are generated next. The words generated by the pattern need not match the word being completed. The `GLOBIGNORE` shell variable is not used to filter the matches, but the `FIGNORE` shell variable is used.

​	接下来，根据-G选项指定的文件名扩展模式生成任何完成。模式生成的单词不需要与正在完成的单词匹配。不使用`GLOBIGNORE` shell变量来过滤匹配项，但使用`FIGNORE` shell变量。

Next, the string specified as the argument to the -W option is considered. The string is first split using the characters in the `IFS` special variable as delimiters. Shell quoting is honored within the string, in order to provide a mechanism for the words to contain shell metacharacters or characters in the value of `IFS`. Each word is then expanded using brace expansion, tilde expansion, parameter and variable expansion, command substitution, and arithmetic expansion, as described above (see [Shell Expansions](#35-shell-扩展)). The results are split using the rules described above (see [Word Splitting](#357-单词分割-word-splitting)). The results of the expansion are prefix-matched against the word being completed, and the matching words become the possible completions.

​	然后，考虑作为-W选项参数指定的字符串。首先使用`IFS`特殊变量中的字符作为分隔符来拆分该字符串。字符串内部的shell引用被尊重，以提供包含shell元字符或`IFS`值中字符的单词的机制。然后，使用大括号扩展、波浪线扩展、参数和变量扩展、命令替换和算术扩展来扩展每个单词，如上面所述（参见[Shell扩展](#35-shell-扩展)）。然后使用上面描述的规则对结果进行拆分（参见[单词拆分](#357-单词分割-word-splitting)）。然后，将扩展的结果与正在完成的单词进行前缀匹配，匹配的单词成为可能的完成项。

After these matches have been generated, any shell function or command specified with the -F and -C options is invoked. When the command or function is invoked, the `COMP_LINE`, `COMP_POINT`, `COMP_KEY`, and `COMP_TYPE` variables are assigned values as described above (see [Bash Variables](#52-bash-变量)). If a shell function is being invoked, the `COMP_WORDS` and `COMP_CWORD` variables are also set. When the function or command is invoked, the first argument ($1) is the name of the command whose arguments are being completed, the second argument ($2) is the word being completed, and the third argument ($3) is the word preceding the word being completed on the current command line. No filtering of the generated completions against the word being completed is performed; the function or command has complete freedom in generating the matches.

​	在生成这些匹配项后，将调用使用-F和-C选项指定的任何shell函数或命令。当调用命令或函数时，将如上所述为`COMP_LINE`、`COMP_POINT`、`COMP_KEY`和`COMP_TYPE`变量分配值（参见[Bash变量](#52-bash-变量)）。如果调用的是shell函数，则还设置`COMP_WORDS`和`COMP_CWORD`变量。当调用函数或命令时，第一个参数（$1）是正在完成其参数的命令的名称，第二个参数（$2）是正在完成的单词，第三个参数（$3）是当前命令行上正在完成的单词之前的单词。不对生成的完成项进行与正在完成的单词匹配的过滤；函数或命令在生成匹配项时具有完全自由。

Any function specified with -F is invoked first. The function may use any of the shell facilities, including the `compgen` and `compopt` builtins described below (see [Programmable Completion Builtins](#87-可编程完成内置命令)), to generate the matches. It must put the possible completions in the `COMPREPLY` array variable, one per array element.

​	首先调用使用-F指定的函数。函数可以使用任何shell工具，包括下面描述的`compgen`和`compopt`内置命令，来生成匹配项。它必须将可能的完成项放入`COMPREPLY`数组变量中，每个数组元素一个。

Next, any command specified with the -C option is invoked in an environment equivalent to command substitution. It should print a list of completions, one per line, to the standard output. Backslash may be used to escape a newline, if necessary.

​	接下来，将在等效于命令替换的环境中调用使用-C选项指定的任何命令。它应该将完成项的列表打印到标准输出中，每行一个。如果需要，可以使用反斜杠来转义换行符。

After all of the possible completions are generated, any filter specified with the -X option is applied to the list. The filter is a pattern as used for pathname expansion; a `&` in the pattern is replaced with the text of the word being completed. A literal `&` may be escaped with a backslash; the backslash is removed before attempting a match. Any completion that matches the pattern will be removed from the list. A leading `!` negates the pattern; in this case any completion not matching the pattern will be removed. If the `nocasematch` shell option (see the description of `shopt` in [The Shopt Builtin](#432--shopt内置命令)) is enabled, the match is performed without regard to the case of alphabetic characters.

​	在生成所有可能的完成项后，将应用使用-X选项指定的任何过滤器到列表中。过滤器是用于路径名扩展的模式；模式中的`&`将替换为正在完成的单词的文本。字面上的`&`可以使用反斜杠转义；反斜杠在尝试匹配之前被移除。与模式匹配的任何完成项都将从列表中删除。在这种情况下，以`!`开头的模式是否定的；在这种情况下，与模式不匹配的任何完成项都将被删除。如果启用了`nocasematch` shell选项（参见[The Shopt Builtin](#432--shopt内置命令)中对`shopt`的说明），则执行匹配时不考虑字母字符的大小写。

Finally, any prefix and suffix specified with the -P and -S options are added to each member of the completion list, and the result is returned to the Readline completion code as the list of possible completions.

​	最后，将为完成列表的每个成员添加使用-P和-S选项指定的前缀和后缀，并将结果作为可能完成的列表返回给Readline的完成代码。

If the previously-applied actions do not generate any matches, and the -o dirnames option was supplied to `complete` when the compspec was defined, directory name completion is attempted.

​	如果先前应用的操作未生成任何匹配项，并且在定义compspec时提供了-o dirnames选项，则尝试目录名完成。

If the -o plusdirs option was supplied to `complete` when the compspec was defined, directory name completion is attempted and any matches are added to the results of the other actions.

​	如果在定义compspec时提供了-o plusdirs选项，则会尝试目录名完成，并将任何匹配项添加到其他操作的结果中。

By default, if a compspec is found, whatever it generates is returned to the completion code as the full set of possible completions. The default Bash completions are not attempted, and the Readline default of filename completion is disabled. If the -o bashdefault option was supplied to `complete` when the compspec was defined, the default Bash completions are attempted if the compspec generates no matches. If the -o default option was supplied to `complete` when the compspec was defined, Readline's default completion will be performed if the compspec (and, if attempted, the default Bash completions) generate no matches.

​	默认情况下，如果找到compspec，则将其生成的内容作为完成代码的全部可能完成项返回。不尝试默认的Bash完成，也禁用Readline默认的文件名完成。如果在定义compspec时提供了-o bashdefault选项，则如果compspec未生成匹配项，则尝试默认的Bash完成。如果在定义compspec时提供了-o default选项，则如果compspec（以及如果尝试了默认的Bash完成）未生成匹配项，则执行Readline的默认完成。

When a compspec indicates that directory name completion is desired, the programmable completion functions force Readline to append a slash to completed names which are symbolic links to directories, subject to the value of the mark-directories Readline variable, regardless of the setting of the mark-symlinked-directories Readline variable.

​	当compspec指示需要目录名完成时，可编程完成函数会强制Readline在完成的名称后追加斜杠，即使完成的名称是指向目录的符号链接，这取决于mark-directories Readline变量的值，而不受mark-symlinked-directories Readline变量设置的影响。

There is some support for dynamically modifying completions. This is most useful when used in combination with a default completion specified with -D. It's possible for shell functions executed as completion handlers to indicate that completion should be retried by returning an exit status of 124. If a shell function returns 124, and changes the compspec associated with the command on which completion is being attempted (supplied as the first argument when the function is executed), programmable completion restarts from the beginning, with an attempt to find a new compspec for that command. This allows a set of completions to be built dynamically as completion is attempted, rather than being loaded all at once.

​	对于动态修改完成项，提供了一些支持。当与使用-D指定的默认完成组合使用时，这非常有用。作为完成处理程序执行的shell函数可以通过返回退出状态为124来指示应重新尝试完成。如果shell函数返回124，并且更改了与正在尝试完成的命令相关联的compspec（在函数执行时作为第一个参数提供），则可编程完成将从头开始重新启动，尝试为该命令找到新的compspec。这允许在尝试完成时动态构建完成集，而不是一次性加载所有完成。

For instance, assuming that there is a library of compspecs, each kept in a file corresponding to the name of the command, the following default completion function would load completions dynamically:

​	例如，假设存在一组compspecs，每个compspec都保存在与命令名称相对应的文件中，以下默认完成函数将动态加载完成：

```
_completion_loader()
{
    . "/etc/bash_completion.d/$1.sh" >/dev/null 2>&1 && return 124
}
complete -D -F _completion_loader -o bashdefault -o default
```





### 8.7 可编程完成内置命令



Three builtin commands are available to manipulate the programmable completion facilities: one to specify how the arguments to a particular command are to be completed, and two to modify the completion as it is happening.

​	有三个内置命令可用于操作可编程完成功能：一个用于指定如何完成特定命令的参数，另外两个用于在完成过程中修改完成行为。

- `compgen`

  ```
  compgen [option] [word]
  ```

  Generate possible completion matches for word according to the options, which may be any option accepted by the `complete` builtin with the exception of -p and -r, and write the matches to the standard output. When using the -F or -C options, the various shell variables set by the programmable completion facilities, while available, will not have useful values.

  根据选项生成单词的可能完成匹配，并将匹配结果写入标准输出。选项可以是`complete`内置命令接受的任何选项，除了-p和-r。使用-F或-C选项时，虽然可编程完成工具设置的各种shell变量可用，但它们的值可能无用。

  The matches will be generated in the same way as if the programmable completion code had generated them directly from a completion specification with the same flags. If word is specified, only those completions matching word will be displayed.The return value is true unless an invalid option is supplied, or no matches were generated.

  生成的匹配项将与如果可编程完成代码直接从具有相同标志的完成规范生成它们的方式相同。如果指定了单词，则只显示与单词匹配的完成项。除非提供了无效的选项或未生成匹配项，否则返回值为真。

- `complete`

  ```
  complete [-abcdefgjksuv] [-o comp-option] [-DEI] [-A action] [-G globpat]
  [-W wordlist] [-F function] [-C command] [-X filterpat]
  [-P prefix] [-S suffix] name [name …]
  complete -pr [-DEI] [name …]
  ```

  Specify how arguments to each name should be completed. If the -p option is supplied, or if no options are supplied, existing completion specifications are printed in a way that allows them to be reused as input. The -r option removes a completion specification for each name, or, if no names are supplied, all completion specifications. The -D option indicates that other supplied options and actions should apply to the “default” command completion; that is, completion attempted on a command for which no completion has previously been defined. The -E option indicates that other supplied options and actions should apply to “empty” command completion; that is, completion attempted on a blank line. The -I option indicates that other supplied options and actions should apply to completion on the initial non-assignment word on the line, or after a command delimiter such as `;` or `|`, which is usually command name completion. If multiple options are supplied, the -D option takes precedence over -E, and both take precedence over -I. If any of -D, -E, or -I are supplied, any other name arguments are ignored; these completions only apply to the case specified by the option.

  指定如何完成每个名称的参数。如果提供了-p选项，或者未提供任何选项，则以允许它们作为输入被重新使用的方式打印现有的完成规范。-r选项删除每个名称的完成规范，或者如果未提供名称，则删除所有的完成规范。-D选项指示其他提供的选项和操作应用于“默认”命令完成；即尝试对未定义完成的命令进行完成。-E选项指示其他提供的选项和操作应用于“空白”命令完成；即在空白行上尝试完成。-I选项指示其他提供的选项和操作应用于行中的初始非赋值单词，或者在命令分隔符（如;或|）之后，通常是命令名称完成。如果提供了多个选项，则-D选项优先于-E选项，二者优先于-I选项。如果提供了-D、-E或-I中的任何一个，将忽略任何其他名称参数；这些完成仅适用于选项指定的情况。

  The process of applying these completion specifications when word completion is attempted is described above (see [Programmable Completion](#86-可编程自动完成)).Other options, if specified, have the following meanings. The arguments to the -G, -W, and -X options (and, if necessary, the -P and -S options) should be quoted to protect them from expansion before the `complete` builtin is invoked.

  在尝试进行单词完成时，应用这些完成规范的过程如上所述（见[可编程完成](#86-可编程自动完成)）。如果指定了其他选项，则具有以下含义。在调用`complete`内置之前，应用于-G、-W和-X选项（如有必要，还包括-P和-S选项）的参数应进行引用以保护它们免受扩展。

  `-o comp-option`: The comp-option controls several aspects of the compspec's behavior beyond the simple generation of completions. comp-option may be one of:

  `-o comp-option`：comp-option控制compspec的行为方式，除了简单地生成完成项之外。comp-option可以是以下之一：

  - `bashdefault`: Perform the rest of the default Bash completions if the compspec generates no matches.

  - `default`: Use Readline's default filename completion if the compspec generates no matches.

  - `dirnames`: Perform directory name completion if the compspec generates no matches.

  - `filenames`: Tell Readline that the compspec generates filenames, so it can perform any filename-specific processing (like adding a slash to directory names, quoting special characters, or suppressing trailing spaces). This option is intended to be used with shell functions specified with -F.

  - `noquote`: Tell Readline not to quote the completed words if they are filenames (quoting filenames is the default).

  - `nosort`: Tell Readline not to sort the list of possible completions alphabetically.

  - `nospace`: Tell Readline not to append a space (the default) to words completed at the end of the line.

  - `plusdirs`: After any matches defined by the compspec are generated, directory name completion is attempted and any matches are added to the results of the other actions.
  - `bashdefault`：如果compspec未生成匹配项，则执行其余默认Bash完成。
  - `default`：如果compspec未生成匹配项，则使用Readline的默认文件名完成。
  - `dirnames`：如果compspec未生成匹配项，则执行目录名完成。
  - `filenames`：告诉Readline，compspec生成文件名，因此可以执行任何文件名特定处理（例如向目录名添加斜杠，引用特殊字符或抑制尾随空格）。此选项旨在与使用-F指定的shell函数一起使用。
  - `noquote`：告诉Readline不要引用已完成的单词，如果它们是文件名（引用文件名是默认的）。
  - `nosort`：告诉Readline不要对可能完成列表按字母顺序排序。
  - `nospace`：告诉Readline不要在行尾完成的单词后附加空格（默认情况下）。
  - `plusdirs`：在生成由compspec定义的任何匹配项后，尝试目录名完成，并将任何匹配项添加到其他操作的结果中。

  

  `-A action`: The action may be one of the following to generate a list of possible completions: action可以是以下之一，用于生成可能完成项列表：

  - `alias`: Alias names. May also be specified as -a.

  - `arrayvar`: Array variable names.

  - `binding`: Readline key binding names (see [Bindable Readline Commands](https://www.gnu.org/software/bash/manual/bash.html#Bindable-Readline-Commands)).

  - `builtin`: Names of shell builtin commands. May also be specified as -b.

  - `command`: Command names. May also be specified as -c.

  - `directory`: Directory names. May also be specified as -d.

  - `disabled`: Names of disabled shell builtins.

  - `enabled`: Names of enabled shell builtins.

  - `export`: Names of exported shell variables. May also be specified as -e.

  - `file`: File names. May also be specified as -f.

  - `function`: Names of shell functions.

  - `group`: Group names. May also be specified as -g.

  - `helptopic`: Help topics as accepted by the `help` builtin (see [Bash Builtin Commands](#42-bash-内置命令)).

  - `hostname`: Hostnames, as taken from the file specified by the `HOSTFILE` shell variable (see [Bash Variables](#52-bash-变量)).

  - `job`: Job names, if job control is active. May also be specified as -j.

  - `keyword`: Shell reserved words. May also be specified as -k.

  - `running`: Names of running jobs, if job control is active.

  - `service`: Service names. May also be specified as -s.

  - `setopt`: Valid arguments for the -o option to the `set` builtin (see [The Set Builtin](#431-内置命令set)).

  - `shopt`: Shell option names as accepted by the `shopt` builtin (see [Bash Builtin Commands](#42-bash-内置命令)).

  - `signal`: Signal names.

  - `stopped`: Names of stopped jobs, if job control is active.

  - `user`: User names. May also be specified as -u.

  - `variable`: Names of all shell variables. May also be specified as -v.
  - `alias`：别名名称。也可以指定为-a。
  - `arrayvar`：数组变量名称。
  - `binding`：Readline键绑定名称（见[可绑定的Readline命令](https://www.gnu.org/software/bash/manual/bash.html#Bindable-Readline-Commands)）。
  - `builtin`：Shell内置命令的名称。也可以指定为-b。
  - `command`：命令名称。也可以指定为-c。
  - `directory`：目录名称。也可以指定为-d。
  - `disabled`：已禁用的Shell内置命令的名称。
  - `enabled`：已启用的Shell内置命令的名称。
  - `export`：已导出的Shell变量的名称。也可以指定为-e。
  - `file`：文件名。也可以指定为-f。
  - `function`：Shell函数的名称。
  - `group`：组名称。也可以指定为-g。
  - `helptopic`：`help`内置命令接受的帮助主题（见[Bash内置命令](#42-bash-内置命令)）。
  - `hostname`：主机名，从`HOSTFILE` shell变量指定的文件中获取（见[Bash变量](#52-bash-变量)）。
  - `job`：作业名称（如果作业控制处于活动状态）。也可以指定为-j。
  - `keyword`：Shell保留字。也可以指定为-k。
  - `running`：运行中的作业名称（如果作业控制处于活动状态）。
  - `service`：服务名称。也可以指定为-s。
  - `setopt`：`set`内置命令的-o选项的有效参数（见[set内置命令](#431-内置命令set)）。
  - `shopt`：`shopt`内置命令接受的Shell选项名称（见[Bash内置命令](#42-bash-内置命令)）。
  - `signal`：信号名称。
  - `stopped`：已停止的作业名称（如果作业控制处于活动状态）。
  - `user`：用户名称。也可以指定为-u。
  - `variable`：所有Shell变量的名称。也可以指定为-v。

  

  `-C command`: command is executed in a subshell environment, and its output is used as the possible completions. Arguments are passed as with the -F option.

  `-C command`：在子shell环境中执行command，并将其输出用作可能的完成项。参数传递方式与-F选项相同。

  `-F function`: The shell function function is executed in the current shell environment. When it is executed, `$1` is the name of the command whose arguments are being completed, `$2` is the word being completed, and $3 is the word preceding the word being completed, as described above (see [Programmable Completion](#86-可编程自动完成)). When it finishes, the possible completions are retrieved from the value of the `COMPREPLY` array variable.

  `-F function`：在当前shell环境中执行shell函数function。在执行时，`$1`是正在完成其参数的命令的名称，`$2`是正在完成的单词，$3是正在完成的单词之前的单词，如上所述（见[可编程完成](#86-可编程自动完成)）。执行完成后，可能的完成项从`COMPREPLY`数组变量的值中检索。

  `-G globpat`: The filename expansion pattern globpat is expanded to generate the possible completions.

  `-G globpat`：文件名扩展模式globpat会扩展为生成可能的完成项。

  `-P prefix`: prefix is added at the beginning of each possible completion after all other options have been applied.

  `-P prefix`：在应用了所有其他选项后，将prefix添加到每个可能的完成项的开头。

  `-S suffix`: suffix is appended to each possible completion after all other options have been applied.

  `-S suffix`：在应用了所有其他选项后，将suffix附加到每个可能的完成项。

  `-W wordlist`: The wordlist is split using the characters in the `IFS` special variable as delimiters, and each resultant word is expanded. The possible completions are the members of the resultant list which match the word being completed.

  `-W wordlist`：使用`IFS`特殊变量中的字符作为分隔符拆分wordlist，然后展开每个结果单词。可能的完成项是与正在完成的单词匹配的结果列表的成员。

  `-X filterpat`: filterpat is a pattern as used for filename expansion. It is applied to the list of possible completions generated by the preceding options and arguments, and each completion matching filterpat is removed from the list. A leading `!` in filterpat negates the pattern; in this case, any completion not matching filterpat is removed.

  `-X filterpat`：filterpat是用于文件名扩展的模式。它应用于由前面的选项和参数生成的可能完成列表，每个与filterpat匹配的完成项都将从列表中删除。filterpat中的前导`!`表示否定模式；在这种情况下，任何与filterpat不匹配的完成项都将被删除。

  

  The return value is true unless an invalid option is supplied, an option other than -p or -r is supplied without a name argument, an attempt is made to remove a completion specification for a name for which no specification exists, or an error occurs adding a completion specification.

  除非提供了无效的选项，否则返回值为真；或者提供了除-p或-r以外的选项，但没有提供名称参数；或者尝试删除不存在规范的名称的完成；或者发生添加完成规范的错误。

- `compopt`

  ```
  compopt [-o option] [-DEI] [+o option] [name]
  ```
  
  Modify completion options for each name according to the options, or for the currently-executing completion if no names are supplied. If no options are given, display the completion options for each name or the current completion. The possible values of option are those valid for the `complete` builtin described above. The -D option indicates that other supplied options should apply to the “default” command completion; that is, completion attempted on a command for which no completion has previously been defined. The -E option indicates that other supplied options should apply to “empty” command completion; that is, completion attempted on a blank line. The -I option indicates that other supplied options should apply to completion on the initial non-assignment word on the line, or after a command delimiter such as `;` or `|`, which is usually command name completion.
  
  根据选项修改每个名称的完成选项，或者如果未提供名称，则修改当前执行的完成选项。如果未给出选项，则显示每个名称或当前完成的完成选项。选项的可能值与上述`complete`内置命令中的有效选项相同。-D选项指示其他提供的选项应用于“默认”命令完成；即尝试对未定义完成的命令进行完成。-E选项指示其他提供的选项应用于“空白”命令完成；即在空白行上尝试完成。-I选项指示其他提供的选项应用于行中的初始非赋值单词，或者在命令分隔符（如;或|）之后，通常是命令名称完成。
  
  If multiple options are supplied, the -D option takes precedence over -E, and both take precedence over -I
  
  如果提供了多个选项，则-D选项优先于-E选项，二者优先于-I选项。
  
  The return value is true unless an invalid option is supplied, an attempt is made to modify the options for a name for which no completion specification exists, or an output error occurs.
  
  返回值为真，除非提供了无效的选项，尝试修改不存在规范的名称的选项，或者输出错误发生。





### 8.8 可编程完成示例

The most common way to obtain additional completion functionality beyond the default actions `complete` and `compgen` provide is to use a shell function and bind it to a particular command using `complete -F`.

​	除了`complete`和`compgen`提供的默认操作外，获得附加完成功能最常见的方法是使用一个shell函数，并将其绑定到特定命令上，使用`complete -F`。

The following function provides completions for the `cd` builtin. It is a reasonably good example of what shell functions must do when used for completion. This function uses the word passed as `$2` to determine the directory name to complete. You can also use the `COMP_WORDS` array variable; the current word is indexed by the `COMP_CWORD` variable.

​	以下函数为`cd`内置命令提供了完成功能。这是一个相当不错的示例，展示了在完成中使用shell函数必须做的事情。该函数使用传递的单词作为`$2`来确定要完成的目录名称。也可以使用`COMP_WORDS`数组变量；当前的单词由`COMP_CWORD`变量索引。

The function relies on the `complete` and `compgen` builtins to do much of the work, adding only the things that the Bash `cd` does beyond accepting basic directory names: tilde expansion (see [Tilde Expansion](#352-波浪号扩展)), searching directories in $CDPATH, which is described above (see [Bourne Shell Builtins](#41-bourne-shell-builtins)), and basic support for the `cdable_vars` shell option (see [The Shopt Builtin](#432--shopt内置命令)). `_comp_cd` modifies the value of IFS so that it contains only a newline to accommodate file names containing spaces and tabs – `compgen` prints the possible completions it generates one per line.

​	这个函数依赖于`complete`和`compgen`内置命令来完成大部分工作，只添加了Bash `cd`完成的基本目录名称接受以外的功能：波浪号扩展（参见[波浪号扩展](#352-波浪号扩展)），在$CDPATH中搜索目录（如上所述，参见[Bourne Shell内置命令](#41-bourne-shell-builtins)），以及对`cdable_vars` shell选项的基本支持（参见[shopt内置命令](#432--shopt内置命令)）。`_comp_cd`修改IFS的值，以便其中仅包含换行符，以适应包含空格和制表符的文件名 - `compgen`将其生成的可能完成打印为每行一个。

Possible completions go into the COMPREPLY array variable, one completion per array element. The programmable completion system retrieves the completions from there when the function returns.

​	可能的完成项放入COMPREPLY数组变量中，每个数组元素一个完成项。当函数返回时，可编程完成系统从这里检索完成项。

```
# A completion function for the cd builtin
# based on the cd completion function from the bash_completion package
# 一个用于cd内置命令的完成函数
# 基于bash_completion软件包中的cd完成函数
_comp_cd()
{
    local IFS=$' \t\n'    # normalize IFS
    local cur _skipdot _cdpath
    local i j k

    # Tilde expansion, which also expands tilde to full pathname
    # 波浪号扩展，还将波浪号扩展为完整路径名
    case "$2" in
    \~*)    eval cur="$2" ;;
    *)      cur=$2 ;;
    esac

    # no cdpath or absolute pathname -- straight directory completion
    # 没有cdpath或绝对路径名 - 直接进行目录完成
    if [[ -z "${CDPATH:-}" ]] || [[ "$cur" == @(./*|../*|/*) ]]; then
        # compgen prints paths one per line; could also use while loop
        # compgen按行打印路径; 也可以使用while循环
        IFS=$'\n'
        COMPREPLY=( $(compgen -d -- "$cur") )
        IFS=$' \t\n'
    # CDPATH+directories in the current directory if not in CDPATH
    else
    # CDPATH + 在CDPATH中不存在的当前目录中的目录
        IFS=$'\n'
        _skipdot=false
        # preprocess CDPATH to convert null directory names to .
        # 预处理CDPATH以将空目录名转换为.
        _cdpath=${CDPATH/#:/.:}
        _cdpath=${_cdpath//::/:.:}
        _cdpath=${_cdpath/%:/:.}
        for i in ${_cdpath//:/$'\n'}; do
            if [[ $i -ef . ]]; then _skipdot=true; fi
            k="${#COMPREPLY[@]}"
            for j in $( compgen -d -- "$i/$cur" ); do
                COMPREPLY[k++]=${j#$i/}        # cut off directory # 去掉目录
            done
        done
        $_skipdot || COMPREPLY+=( $(compgen -d -- "$cur") )
        IFS=$' \t\n'
    fi

    # variable names if appropriate shell option set and no completions
    # 适用于适当的shell选项，并且没有完成项的情况下变量名
    if shopt -q cdable_vars && [[ ${#COMPREPLY[@]} -eq 0 ]]; then
        COMPREPLY=( $(compgen -v -- "$cur") )
    fi

    return 0
}
```

We install the completion function using the -F option to `complete`:

​	我们使用`complete`的-F选项安装完成函数：

```
# Tell readline to quote appropriate and append slashes to directories;
# use the bash default completion for other arguments
# 告诉Readline对适当的内容进行引用，并为目录添加斜杠；
# 对其他参数使用bash默认的完成
complete -o filenames -o nospace -o bashdefault -F _comp_cd cd
```

Since we'd like Bash and Readline to take care of some of the other details for us, we use several other options to tell Bash and Readline what to do. The -o filenames option tells Readline that the possible completions should be treated as filenames, and quoted appropriately. That option will also cause Readline to append a slash to filenames it can determine are directories (which is why we might want to extend `_comp_cd` to append a slash if we're using directories found via CDPATH: Readline can't tell those completions are directories). The -o nospace option tells Readline to not append a space character to the directory name, in case we want to append to it. The -o bashdefault option brings in the rest of the "Bash default" completions – possible completions that Bash adds to the default Readline set. These include things like command name completion, variable completion for words beginning with `$` or `${`, completions containing pathname expansion patterns (see [Filename Expansion](#358-文件名扩展)), and so on.

​	由于我们希望Bash和Readline帮助我们处理一些其他细节，我们使用了几个其他选项来告诉Bash和Readline要做什么。-o filenames选项告诉Readline将可能的完成视为文件名，并适当地引用它们。该选项还会导致Readline为它能确定是目录的文件名添加斜杠（这就是为什么我们可能希望扩展`_comp_cd`以在使用CDPATH找到的目录时添加斜杠：Readline不能确定这些完成是目录）。-o nospace选项告诉Readline在目录名后不要附加空格字符，以防我们想要附加内容。-o bashdefault选项引入了“Bash默认”完成的其余部分 - 可能的完成由Bash添加到默认的Readline集中。这些包括命令名称完成，以$或${开头的单词的变量完成，包含路径名扩展模式的完成（参见[文件名扩展](#358-文件名扩展)）等。

Once installed using `complete`, `_comp_cd` will be called every time we attempt word completion for a `cd` command.

​	一旦使用`complete`安装，每次我们尝试为`cd`命令进行单词完成时，都会调用`_comp_cd`。

Many more examples – an extensive collection of completions for most of the common GNU, Unix, and Linux commands – are available as part of the bash_completion project. This is installed by default on many GNU/Linux distributions. Originally written by Ian Macdonald, the project now lives at https://github.com/scop/bash-completion/. There are ports for other systems such as Solaris and Mac OS X.

​	更多示例 - 大多数常见的GNU、Unix和Linux命令的广泛完成集合 - 可在bash_completion项目的一部分中找到。这在许多GNU/Linux发行版上默认安装。该项目最初由Ian Macdonald编写，现在位于https://github.com/scop/bash-completion/。还有其他系统的端口，如Solaris和Mac OS X。

An older version of the bash_completion package is distributed with bash in the examples/complete subdirectory.

​	bash_completion软件包的旧版本在bash的examples/complete子目录中分发。







## 9 交互式使用历史记录 Using History Interactively

This chapter describes how to use the GNU History Library interactively, from a user's standpoint. It should be considered a user's guide. For information on using the GNU History Library in other programs, see the GNU Readline Library Manual.

​	本章描述如何从用户的角度交互式地使用 GNU 历史记录库。它应被视为用户指南。关于如何在其他程序中使用 GNU 历史记录库，请参阅 GNU Readline Library 手册。



### 9.1 Bash 历史记录功能 Bash History Facilities



When the -o history option to the `set` builtin is enabled (see [The Set Builtin](#431-内置命令set)), the shell provides access to the *command history*, the list of commands previously typed. The value of the `HISTSIZE` shell variable is used as the number of commands to save in a history list. The text of the last `$HISTSIZE` commands (default 500) is saved. The shell stores each command in the history list prior to parameter and variable expansion but after history expansion is performed, subject to the values of the shell variables `HISTIGNORE` and `HISTCONTROL`.

​	当启用 `set` 内置命令的 `-o history` 选项（参见 [内置命令 set](#431-内置命令set)）时，shell 将提供*命令历史记录*，即之前输入的命令列表。`HISTSIZE` shell 变量的值用作历史记录列表中保存的命令数。默认情况下，保存最后 `$HISTSIZE` 条命令（默认值为 500）。Shell 在执行参数和变量扩展之前，但在执行历史扩展之后，将每个命令存储在历史记录列表中，受 `HISTIGNORE` 和 `HISTCONTROL` 这两个 shell 变量的影响。

When the shell starts up, the history is initialized from the file named by the `HISTFILE` variable (default ~/.bash_history). The file named by the value of `HISTFILE` is truncated, if necessary, to contain no more than the number of lines specified by the value of the `HISTFILESIZE` variable. When a shell with history enabled exits, the last `$HISTSIZE` lines are copied from the history list to the file named by `$HISTFILE`. If the `histappend` shell option is set (see [Bash Builtin Commands](#42-bash-内置命令)), the lines are appended to the history file, otherwise the history file is overwritten. If `HISTFILE` is unset, or if the history file is unwritable, the history is not saved. After saving the history, the history file is truncated to contain no more than `$HISTFILESIZE` lines. If `HISTFILESIZE` is unset, or set to null, a non-numeric value, or a numeric value less than zero, the history file is not truncated.

​	当 shell 启动时，历史记录将从 `HISTFILE` 变量指定的文件中初始化（默认为 ~/.bash_history）。`HISTFILE` 的值指定的文件名可能会被截断，以确保不超过 `HISTFILESIZE` 变量值指定的行数。当启用历史记录的 shell 退出时，最后 `$HISTSIZE` 行将从历史记录列表复制到 `$HISTFILE` 指定的文件中。如果设置了 `histappend` shell 选项（参见 [内置命令 Bash](#42-bash-内置命令)），这些行将追加到历史文件中，否则将覆盖历史文件。如果 `HISTFILE` 未设置，或历史文件不可写入，历史记录将不会被保存。保存历史记录后，历史文件将被截断，以确保不超过 `$HISTFILESIZE` 行。如果 `HISTFILESIZE` 未设置，或设置为空值，或设置为非数字值，或设置为小于零的数字值，历史文件将不会被截断。

If the `HISTTIMEFORMAT` is set, the time stamp information associated with each history entry is written to the history file, marked with the history comment character. When the history file is read, lines beginning with the history comment character followed immediately by a digit are interpreted as timestamps for the following history entry.

​	如果设置了 `HISTTIMEFORMAT`，则与每个历史记录条目相关联的时间戳信息将写入历史文件，并用历史注释字符标记。读取历史文件时，以历史注释字符后紧接着一个数字的行将被解释为后续历史记录条目的时间戳。

The builtin command `fc` may be used to list or edit and re-execute a portion of the history list. The `history` builtin may be used to display or modify the history list and manipulate the history file. When using command-line editing, search commands are available in each editing mode that provide access to the history list (see [Commands For Manipulating The History](https://www.gnu.org/software/bash/manual/bash.html#Commands-For-History)).

​	内置命令 `fc` 可用于列出、编辑和重新执行历史记录列表的一部分。内置命令 `history` 可用于显示或修改历史记录列表并操作历史文件。在使用命令行编辑时，每个编辑模式中都提供了搜索命令，用于访问历史记录列表（参见 [操作历史记录的命令](https://www.gnu.org/software/bash/manual/bash.html#Commands-For-History)）。

The shell allows control over which commands are saved on the history list. The `HISTCONTROL` and `HISTIGNORE` variables may be set to cause the shell to save only a subset of the commands entered. The `cmdhist` shell option, if enabled, causes the shell to attempt to save each line of a multi-line command in the same history entry, adding semicolons where necessary to preserve syntactic correctness. The `lithist` shell option causes the shell to save the command with embedded newlines instead of semicolons. The `shopt` builtin is used to set these options. See [The Shopt Builtin](#432--shopt内置命令), for a description of `shopt`.

​	Shell 允许控制哪些命令保存在历史记录列表中。可以设置 `HISTCONTROL` 和 `HISTIGNORE` 变量，以使 shell 仅保存输入的命令的子集。如果启用了 `cmdhist` shell 选项，则 shell 尝试将多行命令的每行保存在同一个历史记录条目中，并在必要时添加分号以保持语法正确性。`lithist` shell 选项使 shell 保存带有嵌入换行符的命令而不是分号。`shopt` 内置命令用于设置这些选项。参见 [内置命令 shopt](#432--shopt内置命令) 以了解 `shopt` 的描述。





### 9.2 Bash历史内置命令



Bash provides two builtin commands which manipulate the history list and history file.

​	Bash提供了两个内置命令来操作历史记录列表和历史记录文件。

- `fc`

  ```
  fc [-e ename] [-lnr] [first] [last]
  fc -s [pat=rep] [command]
  ```

  The first form selects a range of commands from first to last from the history list and displays or edits and re-executes them. Both first and last may be specified as a string (to locate the most recent command beginning with that string) or as a number (an index into the history list, where a negative number is used as an offset from the current command number).

  第一种形式从历史记录列表中选择从first到last的命令，并显示或编辑并重新执行它们。first和last都可以被指定为一个字符串（用于定位以该字符串开头的最近的命令）或一个数字（历史记录列表中的索引，负数用作当前命令编号的偏移量）。

  When listing, a first or last of 0 is equivalent to -1 and -0 is equivalent to the current command (usually the `fc` command); otherwise 0 is equivalent to -1 and -0 is invalid.

  在列出命令时，first或last为0等同于-1，而-0等同于当前命令（通常是`fc`命令）；否则0等同于-1，-0无效。

  If last is not specified, it is set to first. If first is not specified, it is set to the previous command for editing and -16 for listing. If the -l flag is given, the commands are listed on standard output. The -n flag suppresses the command numbers when listing. The -r flag reverses the order of the listing. Otherwise, the editor given by ename is invoked on a file containing those commands. If ename is not given, the value of the following variable expansion is used: `${FCEDIT:-${EDITOR:-vi}}`. This says to use the value of the `FCEDIT` variable if set, or the value of the `EDITOR` variable if that is set, or `vi` if neither is set. When editing is complete, the edited commands are echoed and executed.

  如果未指定last，则它将被设置为first。如果未指定first，则对于编辑，它将被设置为上一条命令，并对于列表，它将被设置为-16。如果给出了-l标志，则命令将列在标准输出中。-n标志在列出时不显示命令编号。-r标志反转列出顺序。否则，将使用ename指定的编辑器打开包含这些命令的文件。如果未给出ename，则使用以下变量展开的值：`${FCEDIT:-${EDITOR:-vi}}`。这意味着如果已设置`FCEDIT`变量，则使用该值；否则，如果设置了`EDITOR`变量，则使用该值；如果两者都未设置，则使用`vi`。编辑完成后，编辑后的命令将被回显并执行。

  In the second form, command is re-executed after each instance of pat in the selected command is replaced by rep. command is interpreted the same as first above.A useful alias to use with the `fc` command is `r='fc -s'`, so that typing `r cc` runs the last command beginning with `cc` and typing `r` re-executes the last command (see [Aliases](#66-别名)).

  在第二种形式中，每次在选定的命令中找到pat的实例时，command都会被重新执行，并替换为rep。command的解释与上面的first相同。一个与`fc`命令一起使用的有用别名是`r='fc -s'`，这样键入`r cc`将运行以`cc`开头的最后一条命令，键入`r`将重新执行上一条命令（参见[别名](#66-别名)）。

- `history`

  ```
  history [n]
  history -c
  history -d offset
  history -d start-end
  history [-anrw] [filename]
  history -ps arg
  ```
  
  With no options, display the history list with line numbers. Lines prefixed with a `*` have been modified. An argument of n lists only the last n lines. If the shell variable `HISTTIMEFORMAT` is set and not null, it is used as a format string for strftime to display the time stamp associated with each displayed history entry. No intervening blank is printed between the formatted time stamp and the history line.Options, if supplied, have the following meanings:
  
  如果没有选项，将显示带有行号的历史记录列表。以`*`为前缀的行已经被修改。参数n只列出最后n行。如果shell变量`HISTTIMEFORMAT`被设置且不为空，则它将用作一个strftime格式字符串，用于显示与每个显示的历史记录条目相关联的时间戳。格式化时间戳和历史记录行之间不会打印空格。如果提供了选项，则它们有以下含义：
  
  - `-c`: Clear the history list. This may be combined with the other options to replace the history list completely.
  
  - `-d offset`: Delete the history entry at position offset. If offset is positive, it should be specified as it appears when the history is displayed. If offset is negative, it is interpreted as relative to one greater than the last history position, so negative indices count back from the end of the history, and an index of `-1` refers to the current `history -d` command.
  
  - `-d start-end`: Delete the range of history entries between positions start and end, inclusive. Positive and negative values for start and end are interpreted as described above.
  
  - `-a`: Append the new history lines to the history file. These are history lines entered since the beginning of the current Bash session, but not already appended to the history file.
  
  - `-n`: Append the history lines not already read from the history file to the current history list. These are lines appended to the history file since the beginning of the current Bash session.
  
  - `-r`: Read the history file and append its contents to the history list.
  
  - `-w`: Write out the current history list to the history file.
  
  - `-p`: Perform history substitution on the args and display the result on the standard output, without storing the results in the history list.
  
  - `-s`: The args are added to the end of the history list as a single entry.
  - `-c`：清除历史记录列表。这可以与其他选项组合，以完全替换历史记录列表。
  - `-d offset`：删除位于偏移量位置的历史记录条目。如果offset是正数，则应指定在显示历史记录时显示的值。如果offset是负数，则解释为相对于最后一个历史位置的一个大于一的偏移量，因此负索引从历史记录的末尾开始计数，索引为`-1`指的是当前`history -d`命令。
  - `-d start-end`：删除位置在start和end之间（包括start和end）的历史记录条目。对于start和end的正值和负值解释与上述相同。
  - `-a`：将新的历史记录行追加到历史记录文件。这些是自当前Bash会话开始以来输入的历史记录行，但尚未追加到历史记录文件中。
  - `-n`：将尚未从历史记录文件读取的历史记录行追加到当前历史记录列表。这些是自当前Bash会话开始以来附加到历史记录文件的行。
  - `-r`：读取历史记录文件并将其内容追加到历史记录列表中。
  - `-w`：将当前历史记录列表写入历史记录文件。
  - `-p`：在args上执行历史替换，并在标准输出中显示结果，而不将结果存储在历史记录列表中。
  - `-s`：将args添加到历史记录列表的末尾，作为单个条目。
  
  
  
  If a filename argument is supplied when any of the -w, -r, -a, or -n options is used, Bash uses filename as the history file. If not, then the value of the `HISTFILE` variable is used.The return value is 0 unless an invalid option is encountered, an error occurs while reading or writing the history file, an invalid offset or range is supplied as an argument to -d, or the history expansion supplied as an argument to -p fails.
  
  ​	如果在使用-w、-r、-a或-n选项时提供了文件名参数，则Bash将filename用作历史记录文件。如果没有提供，则使用`HISTFILE`变量的值。返回值为0，除非遇到无效选项，读取或写入历史记录文件时出现错误，提供了无效的-d参数偏移量或范围，或者作为-p参数提供的历史扩展失败。





### 9.3 历史记录扩展



The History library provides a history expansion feature that is similar to the history expansion provided by `csh`. This section describes the syntax used to manipulate the history information.

​	历史记录库提供了一个历史记录扩展功能，类似于`csh`提供的历史记录扩展。本节描述了用于操作历史信息的语法。

History expansions introduce words from the history list into the input stream, making it easy to repeat commands, insert the arguments to a previous command into the current input line, or fix errors in previous commands quickly.

​	历史记录扩展将历史记录列表中的命令引入到输入流中，使得重复执行命令、将先前命令的参数插入到当前输入行或快速修复先前命令中的错误变得容易。

History expansion is performed immediately after a complete line is read, before the shell breaks it into words, and is performed on each line individually. Bash attempts to inform the history expansion functions about quoting still in effect from previous lines.

​	历史扩展是在完整行被读取后立即执行的，之后shell将其分解成单词，并在每行单独执行。Bash试图通知历史扩展函数前面行中仍然有效的引用。

History expansion takes place in two parts. The first is to determine which line from the history list should be used during substitution. The second is to select portions of that line for inclusion into the current one. The line selected from the history is called the *event*, and the portions of that line that are acted upon are called *words*. Various *modifiers* are available to manipulate the selected words. The line is broken into words in the same fashion that Bash does, so that several words surrounded by quotes are considered one word. History expansions are introduced by the appearance of the history expansion character, which is `!` by default.

​	历史扩展分为两个部分。第一个是确定在替换期间应该使用历史记录列表中的哪一行。第二个是选择该行的部分并包含到当前行中。从历史记录中选择的行称为*事件*，对该行进行操作的部分称为*单词*。各种*修饰符*可用于操作所选单词。行的分解方式与Bash相同，因此由引号括起来的多个单词被视为一个单词。历史扩展通过历史扩展字符（默认为`!`）的出现引入。

History expansion implements shell-like quoting conventions: a backslash can be used to remove the special handling for the next character; single quotes enclose verbatim sequences of characters, and can be used to inhibit history expansion; and characters enclosed within double quotes may be subject to history expansion, since backslash can escape the history expansion character, but single quotes may not, since they are not treated specially within double quotes.

​	历史扩展实现了类似于shell的引用约定：反斜杠可用于删除下一个字符的特殊处理；单引号用于包围字符的原样序列，并可用于禁止历史扩展；而在双引号内部的字符可能会受到历史扩展的影响，因为反斜杠可以转义历史扩展字符，但单引号不可以，因为在双引号内部不会对其进行特殊处理。

When using the shell, only `\` and `'` may be used to escape the history expansion character, but the history expansion character is also treated as quoted if it immediately precedes the closing double quote in a double-quoted string.

​	在使用shell时，仅`\`和`'`可用于转义历史扩展字符，但如果历史扩展字符紧跟在双引号中的闭合引号之前，则历史扩展字符也会被视为被引用。

Several shell options settable with the `shopt` builtin (see [The Shopt Builtin](#432--shopt内置命令)) may be used to tailor the behavior of history expansion. If the `histverify` shell option is enabled, and Readline is being used, history substitutions are not immediately passed to the shell parser. Instead, the expanded line is reloaded into the Readline editing buffer for further modification. If Readline is being used, and the `histreedit` shell option is enabled, a failed history expansion will be reloaded into the Readline editing buffer for correction. The -p option to the `history` builtin command may be used to see what a history expansion will do before using it. The -s option to the `history` builtin may be used to add commands to the end of the history list without actually executing them, so that they are available for subsequent recall. This is most useful in conjunction with Readline.

​	可以使用`shopt`内置命令（参见[The Shopt Builtin](#432--shopt内置命令)）设置的几个shell选项来定制历史扩展的行为。如果启用了`histverify` shell选项，并且使用了Readline，历史替换不会立即传递给shell解析器。相反，扩展后的行会重新加载到Readline编辑缓冲区中进行进一步修改。如果正在使用Readline，并且启用了`histreedit` shell选项，那么失败的历史扩展将被重新加载到Readline编辑缓冲区中进行修正。可以使用`history`内置命令的-p选项来查看历史扩展在使用之前会做什么。可以使用`history`内置命令的-s选项将命令添加到历史列表的末尾，而不实际执行它们，以便它们可供随后调用。这在与Readline一起使用时最有用。

The shell allows control of the various characters used by the history expansion mechanism with the `histchars` variable, as explained above (see [Bash Variables](#52-bash-变量)). The shell uses the history comment character to mark history timestamps when writing the history file.

​	Shell允许使用`histchars`变量控制历史扩展机制使用的各种字符，如上所述（参见[Bash Variables](#52-bash-变量)）。当写入历史文件时，Shell使用历史注释字符来标记历史时间戳。



#### 9.3.1 事件设计符 Event Designators

An event designator is a reference to a command line entry in the history list. Unless the reference is absolute, events are relative to the current position in the history list.

​	事件设计符是对历史记录列表中的命令行条目的引用。除非引用是绝对的，否则事件是相对于历史记录列表中的当前位置的。

- `!`

  Start a history substitution, except when followed by a space, tab, the end of the line, `=` or `(` (when the `extglob` shell option is enabled using the `shopt` builtin).

  事件设计符是对历史记录列表中的命令行条目的引用。除非引用是绝对的，否则事件是相对于历史记录列表中的当前位置的。

- `!n`

  Refer to command line n.

  引用第n条命令行。

- `!-n`

  Refer to the command n lines back.

  引用n行之前的命令。

- `!!`

  Refer to the previous command. This is a synonym for `!-1`.

  引用前一条命令。这是`!-1`的同义词。

- `!string`

  Refer to the most recent command preceding the current position in the history list starting with string.

  引用历史记录列表中当前位置之前最近以string开头的命令。

- `!?string[?]`

  Refer to the most recent command preceding the current position in the history list containing string. The trailing `?` may be omitted if the string is followed immediately by a newline. If string is missing, the string from the most recent search is used; it is an error if there is no previous search string.

  引用历史记录列表中当前位置之前最近包含string的命令。如果string后面紧跟一个换行符，则可以省略尾随的`?`。如果缺少string，则使用最近的搜索字符串；如果没有先前的搜索字符串，则出现错误。

- `^string1^string2^`

  Quick Substitution. Repeat the last command, replacing string1 with string2. Equivalent to `!!:s^string1^string2^`.

  快速替换。重复上一条命令，并将string1替换为string2。相当于`!!:s^string1^string2^`。

- `!#`

  The entire command line typed so far.
  
  到目前为止输入的整个命令行。





#### 9.3.2 单词设计符 Word Designators

Word designators are used to select desired words from the event. A `:` separates the event specification from the word designator. It may be omitted if the word designator begins with a `^`, `$`, `*`, `-`, or `%`. Words are numbered from the beginning of the line, with the first word being denoted by 0 (zero). Words are inserted into the current line separated by single spaces.

​	单词设计符用于从事件中选择所需的单词。`:`用于将事件说明与单词设计符分隔开。如果单词设计符以`^`，`$`，`*`，`-`或`%`开头，则可以省略`:`。单词从行的开头编号，第一个单词用0（零）表示。插入到当前行的单词之间用单个空格分隔。

For example,

例如，

- `!!`

  designates the preceding command. When you type this, the preceding command is repeated in toto.

  表示前一个命令。当您键入此命令时，前一个命令将完全重复。

- `!!:$`

  designates the last argument of the preceding command. This may be shortened to `!$`.

  表示前一个命令的最后一个参数。可以缩写为`!$`。

- `!fi:2`

  designates the second argument of the most recent command starting with the letters `fi`.
  
  表示以字母`fi`开头的最近一条命令的第二个参数。

Here are the word designators:

以下是单词设计符：

- `0 (zero)`

  The `0`th word. For many applications, this is the command word.

  第0个单词。对于许多应用程序，这是命令单词。

- `n`

  The nth word.

  第n个单词。

- `^`

  The first argument; that is, word 1.

  第一个参数；即第1个单词。

- `$`

  The last argument.

  最后一个参数。

- `%`

  The first word matched by the most recent `?string?` search, if the search string begins with a character that is part of a word.

  由最近的`?string?`搜索匹配的第一个单词，如果搜索字符串以单词的一部分开头。

- `x-y`

  A range of words; `-y` abbreviates `0-y`.

  由最近的`?string?`搜索匹配的第一个单词，如果搜索字符串以单词的一部分开头。

- `*`

  All of the words, except the `0`th. This is a synonym for `1-$`. It is not an error to use `*` if there is just one word in the event; the empty string is returned in that case.

  所有单词，不包括第0个。这相当于`1-$`。如果事件中只有一个单词，则使用`*`不会报错；在这种情况下，返回空字符串。

- `x*`

  Abbreviates `x-$`

  缩写为`x-$`。

- `x-`

  Abbreviates `x-$` like `x*`, but omits the last word. If `x` is missing, it defaults to 0.
  
  缩写为`x-$`，类似于`x*`，但省略最后一个单词。如果缺少`x`，默认为0。

If a word designator is supplied without an event specification, the previous command is used as the event.

​	如果提供了单词设计符而没有事件说明，则使用上一条命令作为事件。





#### 9.3.3 修饰符

After the optional word designator, you can add a sequence of one or more of the following modifiers, each preceded by a `:`. These modify, or edit, the word or words selected from the history event.

​	在可选的单词设计符之后，可以添加一个或多个以下修饰符序列，每个修饰符之前有一个`:`。这些修饰符修改或编辑从历史事件中选择的单词或单词组。

- `h`

  Remove a trailing pathname component, leaving only the head.

  移除尾部的路径名组件，仅保留头部。

- `t`

  Remove all leading pathname components, leaving the tail.

  移除所有前导路径名组件，仅保留尾部。

- `r`

  Remove a trailing suffix of the form `.suffix`, leaving the basename.

  移除尾部的后缀形式`.suffix`，仅保留基本名称。

- `e`

  Remove all but the trailing suffix.

  仅保留尾部的后缀。

- `p`

  Print the new command but do not execute it.

  打印新命令，但不执行它。

- `q`

  Quote the substituted words, escaping further substitutions.

  引用替换的单词，对后续替换进行转义。

- `x`

  Quote the substituted words as with `q`, but break into words at spaces, tabs, and newlines. The `q` and `x` modifiers are mutually exclusive; the last one supplied is used.

  与`q`相同，引用替换的单词，但在空格、制表符和换行符处断开成单词。`q`和`x`修饰符是互斥的；使用最后提供的那个。

- `s/old/new/`

  Substitute new for the first occurrence of old in the event line. Any character may be used as the delimiter in place of `/`. The delimiter may be quoted in old and new with a single backslash. If `&` appears in new, it is replaced by old. A single backslash will quote the `&`. If old is null, it is set to the last old substituted, or, if no previous history substitutions took place, the last string in a !?string`[?]` search. If new is null, each matching old is deleted. The final delimiter is optional if it is the last character on the input line.

  用new替换事件行中第一次出现的old。可以使用任何字符代替`/`作为分隔符。分隔符可以在old和new中用单个反斜杠进行转义。如果new中出现`&`，它将被old替换。一个单个反斜杠将引用`&`。如果old为空，则将其设置为最后一次替换的old，或者如果没有进行先前的历史替换，则设置为!?string`[?]`搜索中的最后一个字符串。如果new为空，则删除每个匹配的old。如果分隔符是输入行上的最后一个字符，则最后一个分隔符是可选的。

- `&`

  Repeat the previous substitution.

  重复上一次的替换。

- `g`

- `a`

  Cause changes to be applied over the entire event line. Used in conjunction with `s`, as in `gs/old/new/`, or with `&`.

  将更改应用于整个事件行。与`s`一起使用，例如`gs/old/new/`，或与`&`一起使用。

- `G`

  Apply the following `s` or `&` modifier once to each word in the event.
  
  对事件中的每个单词应用以下`s`或`&`修饰符一次。





## 10 安装 Bash

This chapter provides basic instructions for installing Bash on the various supported platforms. The distribution supports the GNU operating systems, nearly every version of Unix, and several non-Unix systems such as BeOS and Interix. Other independent ports exist for MS-DOS, OS/2, and Windows platforms.

​	本章提供在不同支持的平台上安装 Bash 的基本说明。该发行版支持 GNU 操作系统，几乎支持每个版本的 Unix，以及一些非 Unix 系统，如 BeOS 和 Interix。还存在其他独立的端口用于 MS-DOS、OS/2 和 Windows 平台。






### 10.1 基本安装



These are installation instructions for Bash.

​	以下是 Bash 的安装说明。

The simplest way to compile Bash is:

​	编译 Bash 最简单的方法是：

1. `cd` to the directory containing the source code and type `./configure` to configure Bash for your system. If you're using `csh` on an old version of System V, you might need to type `sh ./configure` instead to prevent `csh` from trying to execute `configure` itself.

2. 切换到包含源代码的目录，然后键入 `./configure` 来配置适合您系统的 Bash。如果您正在旧版本的 System V 上使用 `csh`，您可能需要键入 `sh ./configure` 以防止 `csh` 尝试执行 `configure`。

   运行 `configure` 需要一些时间。运行时，它会打印消息，告知它正在检查哪些功能。

   Running `configure` takes some time. While running, it prints messages telling which features it is checking for.

3. Type `make` to compile Bash and build the `bashbug` bug reporting script.

4. 键入 `make` 来编译 Bash 并构建 `bashbug` 错误报告脚本。

5. Optionally, type `make tests` to run the Bash test suite.

6. 可选地，键入 `make tests` 来运行 Bash 测试套件。

7. Type `make install` to install `bash` and `bashbug`. This will also install the manual pages and Info file, message translation files, some supplemental documentation, a number of example loadable builtin commands, and a set of header files for developing loadable builtins. You may need additional privileges to install `bash` to your desired destination, so `sudo make install` might be required. More information about controlling the locations where `bash` and other files are installed is below (see [Installation Names](https://www.gnu.org/software/bash/manual/bash.html#Installation-Names)).

8. 键入 `make install` 来安装 `bash` 和 `bashbug`。这还将安装手册页面和 Info 文件、消息翻译文件、一些辅助文档、一组示例可加载内置命令，以及用于开发可加载内置命令的一组头文件。您可能需要额外的权限来将 `bash` 安装到所需的目标位置，因此可能需要使用 `sudo make install`。有关控制 `bash` 和其他文件安装位置的更多信息请参见下面的内容（见 [Installation Names](https://www.gnu.org/software/bash/manual/bash.html#Installation-Names)）。

The `configure` shell script attempts to guess correct values for various system-dependent variables used during compilation. It uses those values to create a Makefile in each directory of the package (the top directory, the builtins, doc, po, and support directories, each directory under lib, and several others). It also creates a config.h file containing system-dependent definitions. Finally, it creates a shell script named `config.status` that you can run in the future to recreate the current configuration, a file config.cache that saves the results of its tests to speed up reconfiguring, and a file config.log containing compiler output (useful mainly for debugging `configure`). If at some point config.cache contains results you don't want to keep, you may remove or edit it.

`configure` shell 脚本会尝试猜测各种依赖于系统的编译变量的正确值。它使用这些值在软件包的每个目录（顶级目录、内置命令、文档、po 和 support 目录、lib 下的每个目录以及其他几个目录）中创建 Makefile。它还会创建一个包含系统相关定义的 config.h 文件。最后，它会创建一个名为 `config.status` 的 shell 脚本，您可以在将来运行它以重新创建当前配置，一个保存其测试结果的文件 config.cache，以加快重新配置的速度，以及一个包含编译器输出的文件 config.log（主要用于调试 `configure`）。如果 config.cache 包含您不希望保留的结果，可以删除或编辑它。

To find out more about the options and arguments that the `configure` script understands, type

要了解 `configure` 脚本了解的选项和参数的更多信息，请在 Bash 源目录中的 Bash 提示符处键入

```
bash-4.2$ ./configure --help
```

at the Bash prompt in your Bash source directory.

If you want to build Bash in a directory separate from the source directory – to build for multiple architectures, for example – just use the full path to the configure script. The following commands will build bash in a directory under /usr/local/build from the source code in /usr/local/src/bash-4.4:

如果要在与源目录分开的目录中构建 Bash（例如，为多个架构构建），只需使用 configure 脚本的完整路径。以下命令将在 /usr/local/build 目录下从 /usr/local/src/bash-4.4 源代码构建 bash：

```
mkdir /usr/local/build/bash-4.4
cd /usr/local/build/bash-4.4
bash /usr/local/src/bash-4.4/configure
make
```

See [Compiling For Multiple Architectures](https://www.gnu.org/software/bash/manual/bash.html#Compiling-For-Multiple-Architectures) for more information about building in a directory separate from the source.

​	有关在与源码分开的目录中构建的更多信息，请参阅[为多个架构编译](https://www.gnu.org/software/bash/manual/bash.html#Compiling-For-Multiple-Architectures)。

If you need to do unusual things to compile Bash, please try to figure out how `configure` could check whether or not to do them, and mail diffs or instructions to [bash-maintainers@gnu.org](mailto:bash-maintainers@gnu.org) so they can be considered for the next release.

​	如果需要进行不寻常的编译工作，请尝试弄清楚 `configure` 如何检查是否要执行它们，并将差异或说明发送到 [bash-maintainers@gnu.org](mailto:bash-maintainers@gnu.org) ，以便它们可以考虑在下一个版本中使用。

The file configure.ac is used to create `configure` by a program called Autoconf. You only need configure.ac if you want to change it or regenerate `configure` using a newer version of Autoconf. If you do this, make sure you are using Autoconf version 2.69 or newer.

​	configure.ac 文件用于使用名为 Autoconf 的程序创建 `configure`。只有在想要更改它或使用更新版本的 Autoconf 重新生成 `configure` 时才需要 configure.ac。如果这样做，请确保您使用的是 Autoconf 版本 2.69 或更高版本。

You can remove the program binaries and object files from the source code directory by typing `make clean`. To also remove the files that `configure` created (so you can compile Bash for a different kind of computer), type `make distclean`.

​	您可以通过键入 `make clean` 从源码目录中删除程序二进制文件和对象文件。要删除 `configure` 创建的文件（以便您可以为不同类型的计算机编译 Bash），请键入 `make distclean`。





### 10.2 编译器和选项

Some systems require unusual options for compilation or linking that the `configure` script does not know about. You can give `configure` initial values for variables by setting them in the environment. Using a Bourne-compatible shell, you can do that on the command line like this:

​	某些系统需要编译或链接的非常规选项，这些选项 `configure` 脚本不知道。您可以通过在环境中设置这些变量来为 `configure` 提供变量的初始值。使用 Bourne 兼容的 shell，您可以在命令行上这样做：

```
CC=c89 CFLAGS=-O2 LIBS=-lposix ./configure
```

On systems that have the `env` program, you can do it like this:

​	在具有 `env` 程序的系统上，可以这样做：

```
env CPPFLAGS=-I/usr/local/include LDFLAGS=-s ./configure
```

The configuration process uses GCC to build Bash if it is available.

​	配置过程使用 GCC 来构建 Bash（如果可用）。





### 10.3 为多种架构进行编译

You can compile Bash for more than one kind of computer at the same time, by placing the object files for each architecture in their own directory. To do this, you must use a version of `make` that supports the `VPATH` variable, such as GNU `make`. `cd` to the directory where you want the object files and executables to go and run the `configure` script from the source directory (see [Basic Installation](#101-基本安装)). You may need to supply the --srcdir=PATH argument to tell `configure` where the source files are. `configure` automatically checks for the source code in the directory that `configure` is in and in `..`.

​	您可以同时为多种类型的计算机编译 Bash，方法是将每种架构的对象文件放在自己的目录中。要做到这一点，您必须使用支持 `VPATH` 变量的 `make` 版本，比如 GNU `make`。切换到希望对象文件和可执行文件进入的目录，并从源目录运行 `configure` 脚本（参见[基本安装](#101-基本安装)）。您可能需要提供 --srcdir=PATH 参数告诉 `configure` 源文件的位置。`configure` 会自动在它所在的目录和 `..` 中检查源代码。

If you have to use a `make` that does not support the `VPATH` variable, you can compile Bash for one architecture at a time in the source code directory. After you have installed Bash for one architecture, use `make distclean` before reconfiguring for another architecture.

​	如果您必须使用不支持 `VPATH` 变量的 `make`，则可以在源代码目录中一次为一个架构编译 Bash。在为一种架构安装了 Bash 之后，在为另一种架构重新配置之前，请使用 `make distclean`。

Alternatively, if your system supports symbolic links, you can use the support/mkclone script to create a build tree which has symbolic links back to each file in the source directory. Here's an example that creates a build directory in the current directory from a source directory /usr/gnu/src/bash-2.0:

​	或者，如果您的系统支持符号链接，您可以使用 support/mkclone 脚本创建一个构建目录，其中有一个符号链接返回到源目录中的每个文件。以下是一个示例，在当前目录中创建一个构建目录，该构建目录源自 /usr/gnu/src/bash-2.0：

```
bash /usr/gnu/src/bash-2.0/support/mkclone -s /usr/gnu/src/bash-2.0 .
```

The `mkclone` script requires Bash, so you must have already built Bash for at least one architecture before you can create build directories for other architectures.

​	或者，如果您的系统支持符号链接，您可以使用 support/mkclone 脚本创建一个构建目录，其中有一个符号链接返回到源目录中的每个文件。以下是一个示例，在当前目录中创建一个构建目录，该构建目录源自 /usr/gnu/src/bash-2.0：





### 10.4 安装名称

By default, `make install` will install into /usr/local/bin, /usr/local/man, etc.; that is, the *installation prefix* defaults to /usr/local. You can specify an installation prefix other than /usr/local by giving `configure` the option --prefix=PATH, or by specifying a value for the `prefix` `make` variable when running `make install` (e.g., `make install prefix=PATH`). The `prefix` variable provides a default for `exec_prefix` and other variables used when installing bash.

​	默认情况下，`make install` 将安装到 /usr/local/bin、/usr/local/man 等目录；即 *安装前缀*  默认为 /usr/local。您可以通过给 `configure` 选项 --prefix=PATH 或在运行 `make install` 时指定 `prefix` `make` 变量的值来指定安装前缀（例如 `make install prefix=PATH`）。`prefix` 变量为安装 bash 时使用的 `exec_prefix` 和其他变量提供了默认值。

You can specify separate installation prefixes for architecture-specific files and architecture-independent files. If you give `configure` the option --exec-prefix=PATH, `make install` will use PATH as the prefix for installing programs and libraries. Documentation and other data files will still use the regular prefix.

​	您可以为架构特定的文件和与架构无关的文件指定单独的安装前缀。如果为 `configure` 提供 --exec-prefix=PATH 选项，`make install` 将使用 PATH 作为安装程序和库的前缀。文档和其他数据文件仍将使用常规前缀。

If you would like to change the installation locations for a single run, you can specify these variables as arguments to `make`: `make install exec_prefix=/` will install `bash` and `bashbug` into /bin instead of the default /usr/local/bin.

​	如果要在单个运行中更改安装位置，可以将这些变量作为 `make` 的参数来指定：`make install exec_prefix=/` 将 `bash` 和 `bashbug` 安装到 /bin，而不是默认的 /usr/local/bin。

If you want to see the files bash will install and where it will install them without changing anything on your system, specify the variable `DESTDIR` as an argument to `make`. Its value should be the absolute directory path you'd like to use as the root of your sample installation tree. For example,

​	如果要查看 bash 将安装的文件以及它们的安装位置，而不在系统上更改任何内容，请将变量 `DESTDIR` 指定为 `make` 的参数。它的值应该是样本安装树的根的绝对目录路径。例如，

```
mkdir /fs1/bash-install
make install DESTDIR=/fs1/bash-install
```

will install `bash` into /fs1/bash-install/usr/local/bin/bash, the documentation into directories within /fs1/bash-install/usr/local/share, the example loadable builtins into /fs1/bash-install/usr/local/lib/bash, and so on. You can use the usual `exec_prefix` and `prefix` variables to alter the directory paths beneath the value of `DESTDIR`.

​	将 `bash` 安装到 /fs1/bash-install/usr/local/bin/bash，将文档安装到 /fs1/bash-install/usr/local/share 中的目录，将示例可加载内置命令安装到 /fs1/bash-install/usr/local/lib/bash 等等。您可以使用常规的 `exec_prefix` 和 `prefix` 变量来更改 `DESTDIR` 的值之下的目录路径。

The GNU Makefile standards provide a more complete description of these variables and their effects.

​	GNU Makefile 标准提供了这些变量及其影响的更完整的描述。



### 10.5 指定系统类型

There may be some features `configure` can not figure out automatically, but needs to determine by the type of host Bash will run on. Usually `configure` can figure that out, but if it prints a message saying it can not guess the host type, give it the --host=TYPE option. `TYPE` can either be a short name for the system type, such as `sun4`, or a canonical name with three fields: `CPU-COMPANY-SYSTEM` (e.g., `i386-unknown-freebsd4.2`).

​	有些功能 `configure` 无法自动确定，但需要根据 Bash 将运行的主机类型来确定。通常，`configure` 可以找出它，但如果它打印出一条消息说无法猜测主机类型，则给它传递 `--host=TYPE` 选项。`TYPE` 可以是系统类型的简短名称，例如 `sun4`，或具有三个字段的规范名称：`CPU-COMPANY-SYSTEM`（例如 `i386-unknown-freebsd4.2`）。

See the file support/config.sub for the possible values of each field.

​	请参阅文件 support/config.sub，了解每个字段可能的值。





### 10.6 共享默认设置

If you want to set default values for `configure` scripts to share, you can create a site shell script called `config.site` that gives default values for variables like `CC`, `cache_file`, and `prefix`. `configure` looks for PREFIX/share/config.site if it exists, then PREFIX/etc/config.site if it exists. Or, you can set the `CONFIG_SITE` environment variable to the location of the site script. A warning: the Bash `configure` looks for a site script, but not all `configure` scripts do.

​	如果要设置默认值，以供 `configure` 脚本共享，可以创建一个名为 `config.site` 的站点 shell 脚本，为变量如 `CC`、`cache_file` 和 `prefix` 提供默认值。`configure` 首先查找 PREFIX/share/config.site，如果存在，则查找 PREFIX/etc/config.site。或者，您可以将 `CONFIG_SITE` 环境变量设置为站点脚本的位置。警告：Bash 的 `configure` 会寻找站点脚本，但并不是所有的 `configure` 脚本都会这样做。



### 10.7 操作控制

`configure` recognizes the following options to control how it operates.

​	`configure` 识别以下选项来控制其操作方式。

- `--cache-file=file`

  Use and save the results of the tests in file instead of ./config.cache. Set file to /dev/null to disable caching, for debugging `configure`.

  将测试的结果使用 file 保存在 ./config.cache 中，而不是使用 ./config.cache。将 file 设置为 /dev/null 可以禁用缓存，用于调试 `configure`。

- `--help`

  Print a summary of the options to `configure`, and exit.

  打印关于 `configure` 选项的摘要，并退出。

- `--quiet`

- `--silent`

- `-q`

  Do not print messages saying which checks are being made.

  不要打印提示正在进行哪些检查的消息。

- `--srcdir=dir`

  Look for the Bash source code in directory dir. Usually `configure` can determine that directory automatically.

  在目录 dir 中查找 Bash 源代码。通常，`configure` 可以自动确定该目录。

- `--version`

  Print the version of Autoconf used to generate the `configure` script, and exit.
  
  打印生成 `configure` 脚本的 Autoconf 版本，并退出。

`configure` also accepts some other, not widely used, boilerplate options. `configure --help` prints the complete list.

​	`configure` 还接受一些其他不常用的样板选项。`configure --help` 打印完整列表。





### 10.8 可选功能

The Bash `configure` has a number of --enable-feature options, where feature indicates an optional part of Bash. There are also several --with-package options, where package is something like `bash-malloc` or `purify`. To turn off the default use of a package, use --without-package. To configure Bash without a feature that is enabled by default, use --disable-feature.

​	Bash 的 `configure` 有许多 --enable-feature 选项，其中 feature 表示 Bash 的可选部分。还有几个 --with-package 选项，其中 package 是诸如 `bash-malloc` 或 `purify` 的东西。要关闭默认使用的包，使用 --without-package。要在默认启用的情况下配置 Bash，使用 --disable-feature。

Here is a complete list of the --enable- and --with- options that the Bash `configure` recognizes.

​	下面是 Bash 的 `configure` 可识别的 --enable- 和 --with- 选项的完整列表。

- `--with-afs`

  Define if you are using the Andrew File System from Transarc.

  如果使用来自 Transarc 的 Andrew 文件系统，请定义。

- `--with-bash-malloc`

  Use the Bash version of `malloc` in the directory lib/malloc. This is not the same `malloc` that appears in GNU libc, but an older version originally derived from the 4.2 BSD `malloc`. This `malloc` is very fast, but wastes some space on each allocation. This option is enabled by default. The NOTES file contains a list of systems for which this should be turned off, and `configure` disables this option automatically for a number of systems.

  在目录 lib/malloc 中使用 Bash 版本的 `malloc`。这不是出现在 GNU libc 中的 `malloc`，而是最初来源于 4.2 BSD 的 `malloc` 的较旧版本。这个 `malloc` 非常快，但在每次分配时浪费一些空间。此选项默认启用。NOTES 文件中列出了应该关闭此选项的系统的列表，`configure` 会自动在许多系统上禁用此选项。

- `--with-curses`

  Use the curses library instead of the termcap library. This should be supplied if your system has an inadequate or incomplete termcap database.

  使用 curses 库而不是 termcap 库。如果您的系统的 termcap 数据库不足或不完整，则应提供此选项。

- `--with-gnu-malloc`

  A synonym for `--with-bash-malloc`.

- `--with-installed-readline[=PREFIX]`

  Define this to make Bash link with a locally-installed version of Readline rather than the version in lib/readline. This works only with Readline 5.0 and later versions. If PREFIX is `yes` or not supplied, `configure` uses the values of the make variables `includedir` and `libdir`, which are subdirectories of `prefix` by default, to find the installed version of Readline if it is not in the standard system include and library directories. If PREFIX is `no`, Bash links with the version in lib/readline. If PREFIX is set to any other value, `configure` treats it as a directory pathname and looks for the installed version of Readline in subdirectories of that directory (include files in PREFIX/`include` and the library in PREFIX/`lib`).

  定义此选项以使 Bash 链接到本地安装的 Readline 版本，而不是位于 lib/readline 中的版本。这仅适用于 Readline 5.0 及更高版本。如果 PREFIX 是 `yes` 或未提供，则 `configure` 使用 make 变量 `includedir` 和 `libdir` 的值，这些值默认是 `prefix` 的子目录，以查找不在标准系统包含和库目录中的已安装版本的 Readline。如果 PREFIX 是 `no`，Bash 将链接到 lib/readline 中的版本。如果 PREFIX 设置为任何其他值，`configure` 将将其视为目录路径名，并在该目录的子目录中查找已安装的 Readline 版本（include 文件位于 PREFIX/include，库位于 PREFIX/lib）。

- `--with-libintl-prefix[=PREFIX]`

  Define this to make Bash link with a locally-installed version of the libintl library instead of the version in lib/intl.

  定义此选项以使 Bash 链接到本地安装的 libintl 库版本，而不是 lib/intl 中的版本。

- `--with-libiconv-prefix[=PREFIX]`

  Define this to make Bash look for libiconv in PREFIX instead of the standard system locations. There is no version included with Bash.

  定义此选项以在 PREFIX 中查找 libiconv，而不是在标准系统位置中查找。Bash 中没有包含版本。

- `--enable-minimal-config`

  This produces a shell with minimal features, close to the historical Bourne shell.
  
  这将生成一个具有最小功能的 shell，接近历史上的 Bourne shell。

There are several --enable- options that alter how Bash is compiled, linked, and installed, rather than changing run-time features.

​	以下是改变Bash编译、链接和安装方式的一些 --enable- 选项，而不是改变运行时功能。

- `--enable-largefile`

  Enable support for [large files](http://www.unix.org/version2/whatsnew/lfs20mar.html) if the operating system requires special compiler options to build programs which can access large files. This is enabled by default, if the operating system provides large file support.

  如果操作系统需要特殊的编译器选项来构建能够访问大文件的程序，请启用对[大文件的支持](http://www.unix.org/version2/whatsnew/lfs20mar.html)。如果操作系统提供了大文件支持，则默认启用此选项。

- `--enable-profiling`

  This builds a Bash binary that produces profiling information to be processed by `gprof` each time it is executed.

  这将构建一个 Bash 二进制文件，每次执行时都会产生 `gprof` 处理的性能分析信息。

- `--enable-separate-helpfiles`

  Use external files for the documentation displayed by the `help` builtin instead of storing the text internally.

  使用外部文件来存储由 `help` 内置命令显示的文档，而不是在内部存储文本。

- `--enable-static-link`

  This causes Bash to be linked statically, if `gcc` is being used. This could be used to build a version to use as root's shell.
  
  如果正在使用 `gcc`，则会导致 Bash 静态链接。这可用于构建用作 root 的 shell 版本。

The `minimal-config` option can be used to disable all of the following options, but it is processed first, so individual options may be enabled using `enable-feature`.

​	`minimal-config` 选项可用于禁用以下所有选项，但它首先处理，因此可以使用 `enable-feature` 启用单个选项。

All of the following options except for `alt-array-implementation`, `disabled-builtins`, `direxpand-default`, `strict-posix-default`, and `xpg-echo-default` are enabled by default, unless the operating system does not provide the necessary support.

​	除了 `alt-array-implementation`、`disabled-builtins`、`direxpand-default`、`strict-posix-default` 和 `xpg-echo-default` 之外，以下所有选项默认启用，除非操作系统不提供必要的支持。

- `--enable-alias`

  Allow alias expansion and include the `alias` and `unalias` builtins (see [Aliases](#66-别名)).

  允许别名展开，并包含 `alias` 和 `unalias` 内置命令（参见[别名](#66-别名)）。

- `--enable-alt-array-implementation`

  This builds bash using an alternate implementation of arrays (see [Arrays](#67-数组)) that provides faster access at the expense of using more memory (sometimes many times more, depending on how sparse an array is).

  使用数组的备用实现构建 bash（参见[数组](#67-数组)），它提供更快的访问速度，但会使用更多的内存（取决于数组的稀疏程度，有时可能多得多）。

- `--enable-arith-for-command`

  Include support for the alternate form of the `for` command that behaves like the C language `for` statement (see [Looping Constructs](https://www.gnu.org/software/bash/manual/bash.html#Looping-Constructs)).

  包含对 `for` 命令的替代形式的支持，该替代形式的行为类似于 C 语言的 `for` 语句（参见[循环结构](https://www.gnu.org/software/bash/manual/bash.html#Looping-Constructs)）。

- `--enable-array-variables`

  Include support for one-dimensional array shell variables (see [Arrays](#67-数组)).

  包含对一维数组 shell 变量的支持（参见[数组](#67-数组)）。

- `--enable-bang-history`

  Include support for `csh`-like history substitution (see [History Expansion](#93-历史记录扩展)).

  包含对类似于 `csh` 的历史替换的支持（参见[历史交互](#93-历史记录扩展)）。

- `--enable-brace-expansion`

  Include `csh`-like brace expansion ( `b{a,b}c` → `bac bbc` ). See [Brace Expansion](#351-花括号扩展), for a complete description.

  包含对类似于 `csh` 的花括号扩展的支持（ `b{a,b}c` → `bac bbc` ）。参见[花括号扩展](#351-花括号扩展)获取完整的描述。

- `--enable-casemod-attributes`

  Include support for case-modifying attributes in the `declare` builtin and assignment statements. Variables with the `uppercase` attribute, for example, will have their values converted to uppercase upon assignment.

  在 `declare` 内置命令和赋值语句中包含支持大小写修改属性。例如，带有 `uppercase` 属性的变量在赋值时将其值转换为大写。

- `--enable-casemod-expansion`

  Include support for case-modifying word expansions.

  包含支持大小写修改的单词扩展。

- `--enable-command-timing`

  Include support for recognizing `time` as a reserved word and for displaying timing statistics for the pipeline following `time` (see [Pipelines](#323-管道)). This allows pipelines as well as shell builtins and functions to be timed.

  包含识别 `time` 作为保留字并显示紧随 `time` 的管道的时间统计信息的支持（参见[管道](#323-管道)）。这允许对管道以及 shell 内置命令和函数进行计时。

- `--enable-cond-command`

  Include support for the `[[` conditional command. (see [Conditional Constructs](#3252-条件结构)).

  包含 `[[` 条件命令的支持（参见[条件结构](#3252-条件结构)）。

- `--enable-cond-regexp`

  Include support for matching POSIX regular expressions using the `=~` binary operator in the `[[` conditional command. (see [Conditional Constructs](#3252-条件结构)).

  包含在 `[[` 条件命令中使用 `=~` 二元运算符匹配 POSIX 正则表达式的支持（参见[条件结构](#3252-条件结构)）。

- `--enable-coprocesses`

  Include support for coprocesses and the `coproc` reserved word (see [Pipelines](#323-管道)).

  包含对协程和 `coproc` 保留字的支持（参见[管道](#323-管道)）。

- `--enable-debugger`

  Include support for the bash debugger (distributed separately).

  包含对 Bash 调试器的支持（单独分发）。

- `--enable-dev-fd-stat-broken`

  If calling `stat` on /dev/fd/N returns different results than calling `fstat` on file descriptor N, supply this option to enable a workaround. This has implications for conditional commands that test file attributes.

  如果在 /dev/fd/N 上调用 `stat` 返回的结果与在文件描述符 N 上调用 `fstat` 返回的结果不同，请使用此选项启用解决方法。这会影响测试文件属性的条件命令。

- `--enable-direxpand-default`

  Cause the `direxpand` shell option (see [The Shopt Builtin](#432--shopt内置命令)) to be enabled by default when the shell starts. It is normally disabled by default.

  导致 `direxpand` shell 选项（参见[The Shopt Builtin](#432--shopt内置命令)）在 shell 启动时默认启用。通常情况下，默认情况下它是禁用的。

- `--enable-directory-stack`

  Include support for a `csh`-like directory stack and the `pushd`, `popd`, and `dirs` builtins (see [The Directory Stack](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)).

  包含对类似于 `csh` 的目录栈和 `pushd`、`popd` 和 `dirs` 内置命令的支持（参见[目录栈](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)）。

- `--enable-disabled-builtins`

  Allow builtin commands to be invoked via `builtin xxx` even after `xxx` has been disabled using `enable -n xxx`. See [Bash Builtin Commands](#42-bash-内置命令), for details of the `builtin` and `enable` builtin commands.

  允许通过 `builtin xxx` 调用内置命令，即使使用 `enable -n xxx` 禁用了 `xxx`。有关 `builtin` 和 `enable` 内置命令的详细信息，请参阅[Bash 内置命令](#42-bash-内置命令)。

- `--enable-dparen-arithmetic`

  Include support for the `((…))` command (see [Conditional Constructs](#3252-条件结构)).

  包含对 `((…))` 命令的支持（参见[条件结构](#3252-条件结构)）。

- `--enable-extended-glob`

  Include support for the extended pattern matching features described above under [Pattern Matching](#3581-模式匹配).

  包含对上面 [Pattern Matching](#3581-模式匹配) 下描述的扩展模式匹配功能的支持。

- `--enable-extended-glob-default`

  Set the default value of the `extglob` shell option described above under [The Shopt Builtin](#432--shopt内置命令) to be enabled.

  将 `extglob` shell 选项的默认值设置为启用（参见[The Shopt Builtin](#432--shopt内置命令)）。

- `--enable-function-import`

  Include support for importing function definitions exported by another instance of the shell from the environment. This option is enabled by default.

  包含支持从环境中导入另一个实例的 shell 导出的函数定义的支持。此选项默认启用。

- `--enable-glob-asciirange-default`

  Set the default value of the `globasciiranges` shell option described above under [The Shopt Builtin](#432--shopt内置命令) to be enabled. This controls the behavior of character ranges when used in pattern matching bracket expressions.

  将 `globasciiranges` shell 选项的默认值设置为启用（参见[The Shopt Builtin](#432--shopt内置命令)）。这控制在模式匹配方括号表达式中使用字符范围的行为。

- `--enable-help-builtin`

  Include the `help` builtin, which displays help on shell builtins and variables (see [Bash Builtin Commands](#42-bash-内置命令)).

  包含 `help` 内置命令，用于显示关于 shell 内置命令和变量的帮助信息（参见[Bash 内置命令](#42-bash-内置命令)）。

- `--enable-history`

  Include command history and the `fc` and `history` builtin commands (see [Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities)).

  包含命令历史和 `fc`、`history` 内置命令（参见[Bash 历史功能](#91-bash-历史记录功能-bash-history-facilities)）。

- `--enable-job-control`

  This enables the job control features (see [Job Control](#7-作业控制)), if the operating system supports them.

  如果操作系统支持作业控制，则启用作业控制功能（参见[Job Control](#7-作业控制)）。

- `--enable-multibyte`

  This enables support for multibyte characters if the operating system provides the necessary support.

  如果操作系统提供必要的支持，则启用对多字节字符的支持。

- `--enable-net-redirections`

  This enables the special handling of filenames of the form `/dev/tcp/host/port` and `/dev/udp/host/port` when used in redirections (see [Redirections](#36-重定向)).

  如果操作系统支持，则启用在重定向中使用 `/dev/tcp/host/port` 和 `/dev/udp/host/port` 形式的文件名的特殊处理（参见[Redirections](#36-重定向)）。

- `--enable-process-substitution`

  This enables process substitution (see [Process Substitution](https://www.gnu.org/software/bash/manual/bash.html#Process-Substitution)) if the operating system provides the necessary support.

  如果操作系统支持，则启用在重定向中使用 `/dev/tcp/host/port` 和 `/dev/udp/host/port` 形式的文件名的特殊处理（参见[Redirections](#36-重定向)）。

- `--enable-progcomp`

  Enable the programmable completion facilities (see [Programmable Completion](#86-可编程自动完成)). If Readline is not enabled, this option has no effect.

  启用可编程的完成功能（参见[Programmable Completion](#86-可编程自动完成)）。如果未启用 Readline，此选项不起作用。

- `--enable-prompt-string-decoding`

  Turn on the interpretation of a number of backslash-escaped characters in the `$PS0`, `$PS1`, `$PS2`, and `$PS4` prompt strings. See [Controlling the Prompt](#69-控制提示符), for a complete list of prompt string escape sequences.

  打开对 `$PS0`、`$PS1`、`$PS2` 和 `$PS4` 提示字符串中许多反斜杠转义字符的解释。请参阅[控制提示符](#69-控制提示符)，以获取提示字符串转义序列的完整列表。

- `--enable-readline`

  Include support for command-line editing and history with the Bash version of the Readline library (see [Command Line Editing](#8-命令行编辑)).

  包含对 BASH 版本 Readline 库的命令行编辑和历史记录的支持（参见[Command Line Editing](#8-命令行编辑)）。

- `--enable-restricted`

  Include support for a *restricted shell*. If this is enabled, Bash, when called as `rbash`, enters a restricted mode. See [The Restricted Shell](#610-受限制的shell), for a description of restricted mode.

  包含对 *受限制的 shell* 的支持。如果启用，当调用为 `rbash` 时，Bash 将进入受限模式。参见[受限制的 Shell](#610-受限制的shell)以了解受限模式的描述。

- `--enable-select`

  Include the `select` compound command, which allows the generation of simple menus (see [Conditional Constructs](#3252-条件结构)).

  包含 `select` 复合命令，允许生成简单菜单（参见[条件结构](#3252-条件结构)）。

- `--enable-single-help-strings`

  Store the text displayed by the `help` builtin as a single string for each help topic. This aids in translating the text to different languages. You may need to disable this if your compiler cannot handle very long string literals.

  将 `help` 内置命令显示的文本存储为每个帮助主题的单个字符串。这有助于将文本翻译成不同的语言。如果编译器无法处理非常长的字符串文字，则可能需要禁用此选项。

- `--enable-strict-posix-default`

  Make Bash POSIX-conformant by default (see [Bash POSIX Mode](#611-bash的posix模式)).

  使 Bash 默认符合 POSIX（参见[Bash POSIX 模式](#611-bash的posix模式)）。

- `--enable-translatable-strings`

  Enable support for `$"string"` translatable strings (see [Locale-Specific Translation](#3125-特定区域设置翻译-locale-specific-translation)).

  启用支持 `$"string"` 可翻译字符串（参见[特定于区域设置的翻译](#3125-特定区域设置翻译-locale-specific-translation)）。

- `--enable-usg-echo-default`

  A synonym for `--enable-xpg-echo-default`.

  `--enable-xpg-echo-default` 的同义词。

- `--enable-xpg-echo-default`

  Make the `echo` builtin expand backslash-escaped characters by default, without requiring the -e option. This sets the default value of the `xpg_echo` shell option to `on`, which makes the Bash `echo` behave more like the version specified in the Single Unix Specification, version 3. See [Bash Builtin Commands](#42-bash-内置命令), for a description of the escape sequences that `echo` recognizes.
  
  默认情况下，使 `echo` 内置命令在不需要 -e 选项的情况下展开反斜杠转义字符。这将将 `xpg_echo` shell 选项的默认值设置为 `on`，使 Bash `echo` 表现更像 Single Unix Specification 版本 3 中指定的版本。请参阅[Bash 内置命令](#42-bash-内置命令)，了解 `echo` 可识别的转义序列的描述。

The file config-top.h contains C Preprocessor `#define` statements for options which are not settable from `configure`. Some of these are not meant to be changed; beware of the consequences if you do. Read the comments associated with each definition for more information about its effect.

​	文件 config-top.h 包含不可从 `configure` 设置的 C 预处理器 `#define` 语句。其中一些不应该更改；如果您这样做，要注意可能产生的后果。请阅读与每个定义相关的注释，以获取有关其影响的更多信息。





## 附录 A: 报告 Bug

Please report all bugs you find in Bash. But first, you should make sure that it really is a bug, and that it appears in the latest version of Bash. The latest version of Bash is always available for FTP from [ftp://ftp.gnu.org/pub/gnu/bash/](ftp://ftp.gnu.org/pub/gnu/bash/) and from http://git.savannah.gnu.org/cgit/bash.git/snapshot/bash-master.tar.gz.

​	请报告您在 Bash 中发现的所有 Bug。但是，请首先确保确实存在 Bug，并且它出现在最新版本的 Bash 中。最新版本的 Bash 可以通过 FTP 从 [ftp://ftp.gnu.org/pub/gnu/bash/](javascript:void(0)) 和 http://git.savannah.gnu.org/cgit/bash.git/snapshot/bash-master.tar.gz 下载。

Once you have determined that a bug actually exists, use the `bashbug` command to submit a bug report. If you have a fix, you are encouraged to mail that as well! Suggestions and `philosophical` bug reports may be mailed to [bug-bash@gnu.org](mailto:bug-bash@gnu.org) or posted to the Usenet newsgroup `gnu.bash.bug`.

​	一旦您确定 Bug 确实存在，可以使用 `bashbug` 命令提交 Bug 报告。如果您有修复建议，欢迎一起发送！您也可以将建议和哲学性的 Bug 报告发送至 [bug-bash@gnu.org](mailto:bug-bash@gnu.org)，或者发布到 Usenet 新闻组 `gnu.bash.bug`。

All bug reports should include:

​	所有 Bug 报告应包括：

- The version number of Bash.
- The hardware and operating system.
- The compiler used to compile Bash.
- A description of the bug behaviour.
- A short script or `recipe` which exercises the bug and may be used to reproduce it.
- Bash 的版本号。
- 硬件和操作系统信息。
- 用于编译 Bash 的编译器。
- Bug 行为的描述。
- 可用于重现 Bug 的简短脚本或 `recipe`。

`bashbug` inserts the first three items automatically into the template it provides for filing a bug report.

​	`bashbug` 会自动将前三个项目插入提供给您用于提交 Bug 报告的模板中。

Please send all reports concerning this manual to [bug-bash@gnu.org](mailto:bug-bash@gnu.org).

​	请将所有与本手册有关的报告发送至 [bug-bash@gnu.org](mailto:bug-bash@gnu.org)。





## 附录 B: 与 Bourne Shell 的主要区别

Bash implements essentially the same grammar, parameter and variable expansion, redirection, and quoting as the Bourne Shell. Bash uses the POSIX standard as the specification of how these features are to be implemented. There are some differences between the traditional Bourne shell and Bash; this section quickly details the differences of significance. A number of these differences are explained in greater depth in previous sections. This section uses the version of `sh` included in SVR4.2 (the last version of the historical Bourne shell) as the baseline reference.

​	Bash 实现了与 Bourne Shell 基本相同的语法、参数和变量展开、重定向和引用。Bash 使用 POSIX 标准作为实现这些特性的规范。Bourne Shell 和 Bash 之间存在一些差异；本节快速介绍了主要的区别。其中一些差异在之前的章节中有更详细的解释。本节以 SVR4.2（历史上 Bourne Shell 的最后版本）中包含的 `sh` 版本作为基准参考。

- Bash is POSIX-conformant, even where the POSIX specification differs from traditional `sh` behavior (see [Bash POSIX Mode](#611-bash的posix模式)).

- Bash是符合POSIX标准的，即使在POSIX规范与传统`sh`行为不同的情况下也是如此（参见[Bash POSIX Mode](#611-bash的posix模式)）。

- Bash has multi-character invocation options (see [Invoking Bash](#61-调用bash)).

- Bash具有多字符调用选项（参见[Invoking Bash](#61-调用bash)）。

- Bash has command-line editing (see [Command Line Editing](#8-命令行编辑)) and the `bind` builtin.

- Bash具有命令行编辑功能（参见[Command Line Editing](#8-命令行编辑)）和`bind`内置命令。

- Bash provides a programmable word completion mechanism (see [Programmable Completion](#86-可编程自动完成)), and builtin commands `complete`, `compgen`, and `compopt`, to manipulate it.

- Bash提供了可编程的单词补全机制（参见[Programmable Completion](#86-可编程自动完成)），以及内置命令`complete`，`compgen`和`compopt`来操作它。

- Bash has command history (see [Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities)) and the `history` and `fc` builtins to manipulate it. The Bash history list maintains timestamp information and uses the value of the `HISTTIMEFORMAT` variable to display it.

- Bash具有命令历史记录功能（参见[Bash History Facilities](#91-bash-历史记录功能-bash-history-facilities)），以及用于操作它的`history`和`fc`内置命令。 Bash历史记录列表会保留时间戳信息，并使用`HISTTIMEFORMAT`变量的值来显示它。

- Bash implements `csh`-like history expansion (see [History Expansion](#93-历史记录扩展)).

- Bash实现了类似`csh`的历史扩展（参见[History Expansion](#93-历史记录扩展)）。

- Bash has one-dimensional array variables (see [Arrays](#67-数组)), and the appropriate variable expansions and assignment syntax to use them. Several of the Bash builtins take options to act on arrays. Bash provides a number of built-in array variables.

- Bash具有一维数组变量（参见[Arrays](#67-数组)），以及适用于使用它们的相应变量扩展和赋值语法。 Bash内置命令中的几个可以使用选项来操作数组。 Bash提供了许多内置数组变量。

- The `$'…'` quoting syntax, which expands ANSI-C backslash-escaped characters in the text between the single quotes, is supported (see [ANSI-C Quoting](https://www.gnu.org/software/bash/manual/bash.html#ANSI_002dC-Quoting)).

- 支持`$'…'`引用语法，可以在单引号之间的文本中扩展ANSI-C反斜杠转义字符（参见[ANSI-C Quoting](https://www.gnu.org/software/bash/manual/bash.html#ANSI_002dC-Quoting)）。

- Bash supports the `$"…"` quoting syntax to do locale-specific translation of the characters between the double quotes. The -D, --dump-strings, and --dump-po-strings invocation options list the translatable strings found in a script (see [Locale-Specific Translation](#3125-特定区域设置翻译-locale-specific-translation)).

- Bash支持`$"…"`引用语法，用于对双引号之间的字符进行本地化翻译。使用`-D`、`--dump-strings`和`--dump-po-strings`调用选项，可以列出脚本中的可翻译字符串（参见[Locale-Specific Translation](#3125-特定区域设置翻译-locale-specific-translation)）。

- Bash implements the `!` keyword to negate the return value of a pipeline (see [Pipelines](#323-管道)). Very useful when an `if` statement needs to act only if a test fails. The Bash `-o pipefail` option to `set` will cause a pipeline to return a failure status if any command fails.

- Bash实现了`!`关键字来否定管道的返回值（参见[Pipelines](#323-管道)）。当`if`语句只在测试失败时才需要执行时，这非常有用。Bash的`-o pipefail`选项可导致管道返回失败状态，如果任何命令失败，则会返回失败状态。

- Bash has the `time` reserved word and command timing (see [Pipelines](#323-管道)). The display of the timing statistics may be controlled with the `TIMEFORMAT` variable.

- Bash具有`time`保留字和命令计时功能（参见[Pipelines](#323-管道)）。使用`TIMEFORMAT`变量可以控制计时统计信息的显示。

- Bash implements the `for (( expr1 ; expr2 ; expr3 ))` arithmetic for command, similar to the C language (see [Looping Constructs](https://www.gnu.org/software/bash/manual/bash.html#Looping-Constructs)).

- Bash实现了类似C语言的`for (( expr1 ; expr2 ; expr3 ))`循环命令（参见[Looping Constructs](https://www.gnu.org/software/bash/manual/bash.html#Looping-Constructs)）。

- Bash includes the `select` compound command, which allows the generation of simple menus (see [Conditional Constructs](#3252-条件结构)).

- Bash包含`select`复合命令，允许生成简单的菜单（参见[Conditional Constructs](#3252-条件结构)）。

- Bash includes the `[[` compound command, which makes conditional testing part of the shell grammar (see [Conditional Constructs](#3252-条件结构)), including optional regular expression matching.

- Bash包含`[[`复合命令，使条件测试成为shell语法的一部分（参见[Conditional Constructs](#3252-条件结构)），包括可选的正则表达式匹配。

- Bash provides optional case-insensitive matching for the `case` and `[[` constructs.

- Bash为`case`和`[[`结构提供可选的不区分大小写匹配。

- Bash includes brace expansion (see [Brace Expansion](#351-花括号扩展)) and tilde expansion (see [Tilde Expansion](#352-波浪号扩展)).

- Bash包含花括号展开（参见[Brace Expansion](#351-花括号扩展)）和波浪号展开（参见[Tilde Expansion](#352-波浪号扩展)）。

- Bash implements command aliases and the `alias` and `unalias` builtins (see [Aliases](#66-别名)).

- Bash实现了命令别名和`alias`、`unalias`内置命令（参见[Aliases](#66-别名)）。

- Bash provides shell arithmetic, the `((` compound command (see [Conditional Constructs](#3252-条件结构)), and arithmetic expansion (see [Shell Arithmetic](#65-shell-算术)).

- Bash提供了shell算术，`((`复合命令（参见[Conditional Constructs](#3252-条件结构)）和算术扩展（参见[Shell Arithmetic](#65-shell-算术)）。

- Variables present in the shell's initial environment are automatically exported to child processes. The Bourne shell does not normally do this unless the variables are explicitly marked using the `export` command.

- 在shell的初始环境中存在的变量会自动导出到子进程。Bourne shell通常不会这样做，除非使用`export`命令明确标记变量。

- Bash supports the `+=` assignment operator, which appends to the value of the variable named on the left hand side.

- Bash支持`+=`赋值运算符，用于将值附加到左边的变量。

- Bash includes the POSIX pattern removal `%`, `#`, `%%` and `##` expansions to remove leading or trailing substrings from variable values (see [Shell Parameter Expansion](#353-shell参数扩展)).

- Bash包括POSIX模式移除操作符`%`、`#`、`%%`和`##`，用于从变量值中移除前导或后缀子字符串（参见[Shell Parameter Expansion](#353-shell参数扩展)）。

- The expansion `${#xx}`, which returns the length of `${xx}`, is supported (see [Shell Parameter Expansion](#353-shell参数扩展)).

- 扩展`${#xx}`，用于返回`${xx}`的长度，被支持（参见[Shell Parameter Expansion](#353-shell参数扩展)）。

- The expansion `${var:`offset`[:`length`]}`, which expands to the substring of `var`'s value of length length, beginning at offset, is present (see [Shell Parameter Expansion](#353-shell参数扩展)).

- 扩展`${var:offset[:length]}`，用于返回`var`值的长度为length的子字符串，从offset开始（参见[Shell Parameter Expansion](#353-shell参数扩展)）。

- The expansion `${var/[/]`pattern`[/`replacement`]}`, which matches pattern and replaces it with replacement in the value of var, is available (see [Shell Parameter Expansion](#353-shell参数扩展)).

- 扩展`${var/[pattern[/replacement]]}`，用于匹配pattern并在var值中用replacement替换它（参见[Shell Parameter Expansion](#353-shell参数扩展)）。

- The expansion `${!prefix*}` expansion, which expands to the names of all shell variables whose names begin with prefix, is available (see [Shell Parameter Expansion](#353-shell参数扩展)).

- 扩展`${!prefix*}`，用于展开所有变量名以prefix开头的shell变量的名称（参见[Shell Parameter Expansion](#353-shell参数扩展)）。

- Bash has indirect variable expansion using `${!word}` (see [Shell Parameter Expansion](#353-shell参数扩展)).

- Bash通过`${!word}`实现了间接变量展开（参见[Shell Parameter Expansion](#353-shell参数扩展)）。

- Bash can expand positional parameters beyond `$9` using `${num}`.

- Bash可以通过`${num}`来扩展超过`$9`的位置参数。

- The POSIX `$()` form of command substitution is implemented (see [Command Substitution](https://www.gnu.org/software/bash/manual/bash.html#Command-Substitution)), and preferred to the Bourne shell's \`\`  (which is also implemented for backwards compatibility).

- Bash实现了POSIX `$()`命令替换形式（参见[Command Substitution](https://www.gnu.org/software/bash/manual/bash.html#Command-Substitution)），并推荐使用而不是Bourne shell的  \`\` 后者也为了向后兼容而实现）。

- Bash has process substitution (see [Process Substitution](https://www.gnu.org/software/bash/manual/bash.html#Process-Substitution)).

- Bash具有进程替换功能（参见[Process Substitution](https://www.gnu.org/software/bash/manual/bash.html#Process-Substitution)）。

- Bash automatically assigns variables that provide information about the current user (`UID`, `EUID`, and `GROUPS`), the current host (`HOSTTYPE`, `OSTYPE`, `MACHTYPE`, and `HOSTNAME`), and the instance of Bash that is running (`BASH`, `BASH_VERSION`, and `BASH_VERSINFO`). See [Bash Variables](#52-bash-变量), for details.

- Bash自动为当前用户（`UID`、`EUID`和`GROUPS`）、当前主机（`HOSTTYPE`、`OSTYPE`、`MACHTYPE`和`HOSTNAME`）和运行的Bash实例（`BASH`、`BASH_VERSION`和`BASH_VERSINFO`）分配变量。详见[Bash Variables](#52-bash-变量)。

- The `IFS` variable is used to split only the results of expansion, not all words (see [Word Splitting](#357-单词分割-word-splitting)). This closes a longstanding shell security hole.

- `IFS`变量用于仅拆分扩展的结果，而不是所有单词（参见[Word Splitting](#357-单词分割-word-splitting)）。这关闭了一个长期存在的shell安全漏洞。

- The filename expansion bracket expression code uses `!` and `^` to negate the set of characters between the brackets. The Bourne shell uses only `!`.

- 文件名展开方括号表达式代码使用`!`和`^`来否定括号之间字符的集合。Bourne shell仅使用`!`。

- Bash implements the full set of POSIX filename expansion operators, including character classes, equivalence classes, and collating symbols (see [Filename Expansion](#358-文件名扩展)).

- Bash实现了一整套POSIX文件名展开运算符，包括字符类、等价类和排序符号（参见[Filename Expansion](#358-文件名扩展)）。

- Bash implements extended pattern matching features when the `extglob` shell option is enabled (see [Pattern Matching](#3581-模式匹配)).

- 当启用`extglob` shell选项时，Bash实现了扩展的模式匹配功能（参见[Pattern Matching](#3581-模式匹配)）。

- It is possible to have a variable and a function with the same name; `sh` does not separate the two name spaces.

- 可以同时使用变量和同名函数；`sh`不会将两个名称空间分开。

- Bash functions are permitted to have local variables using the `local` builtin, and thus useful recursive functions may be written (see [Bash Builtin Commands](#42-bash-内置命令)).

- Bash函数允许使用`local`内置命令来定义局部变量，从而可以编写有用的递归函数（参见[Bash Builtin Commands](#42-bash-内置命令)）。

- Variable assignments preceding commands affect only that command, even builtins and functions (see [Environment](#374-环境)). In `sh`, all variable assignments preceding commands are global unless the command is executed from the file system.

- 前置的变量赋值仅影响该命令，即使是内置命令和函数（参见[Environment](#374-环境)）。在`sh`中，除非命令从文件系统中执行，否则所有前置的变量赋值都是全局的。

- Bash performs filename expansion on filenames specified as operands to input and output redirection operators (see [Redirections](#36-重定向)).

- Bash会在作为输入和输出重定向操作符的操作数指定的文件名上执行文件名展开（参见[Redirections](#36-重定向)）。

- Bash contains the `<>` redirection operator, allowing a file to be opened for both reading and writing, and the `&>` redirection operator, for directing standard output and standard error to the same file (see [Redirections](#36-重定向)).

- Bash包含`<>`重定向操作符，允许同时为读和写打开文件，并且包含`&>`重定向操作符，用于将标准输出和标准错误重定向到同一个文件（参见[Redirections](#36-重定向)）。

- Bash includes the `<<<` redirection operator, allowing a string to be used as the standard input to a command.

- Bash包含`<<<`重定向操作符，允许将字符串用作命令的标准输入。

- Bash implements the `[n]<&word` and `[n]>&word` redirection operators, which move one file descriptor to another.

- Bash实现了`[n]<&word`和`[n]>&word`重定向操作符，用于将一个文件描述符移动到另一个文件描述符。

- Bash treats a number of filenames specially when they are used in redirection operators (see [Redirections](#36-重定向)).

- 当在重定向操作符中使用特定文件名时，Bash会对其进行特殊处理（参见[Redirections](#36-重定向)）。

- Bash can open network connections to arbitrary machines and services with the redirection operators (see [Redirections](#36-重定向)).

- Bash可以使用重定向操作符打开到任意机器和服务的网络连接（参见[Redirections](#36-重定向)）。

- The `noclobber` option is available to avoid overwriting existing files with output redirection (see [The Set Builtin](#431-内置命令set)). The `>|` redirection operator may be used to override `noclobber`.

- 可用`noclobber`选项来避免使用输出重定向覆盖现有文件（参见[The Set Builtin](#431-内置命令set)）。可以使用`>|`重定向操作符来覆盖`noclobber`。

- The Bash `cd` and `pwd` builtins (see [Bourne Shell Builtins](#41-bourne-shell-builtins)) each take -L and -P options to switch between logical and physical modes.

- Bash的`cd`和`pwd`内置命令（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）都可以使用-L和-P选项在逻辑模式和物理模式之间切换。

- Bash allows a function to override a builtin with the same name, and provides access to that builtin's functionality within the function via the `builtin` and `command` builtins (see [Bash Builtin Commands](#42-bash-内置命令)).

- Bash允许函数覆盖具有相同名称的内置命令，并且通过`builtin`和`command`内置命令在函数内访问内置命令的功能（参见[Bash Builtin Commands](#42-bash-内置命令)）。

- The `command` builtin allows selective disabling of functions when command lookup is performed (see [Bash Builtin Commands](#42-bash-内置命令)).

- `command`内置命令允许在执行命令查找时选择性地禁用函数（参见[Bash Builtin Commands](#42-bash-内置命令)）。

- Individual builtins may be enabled or disabled using the `enable` builtin (see [Bash Builtin Commands](#42-bash-内置命令)).

- 可以使用`enable`内置命令来启用或禁用单个内置命令（参见[Bash Builtin Commands](#42-bash-内置命令)）。

- The Bash `exec` builtin takes additional options that allow users to control the contents of the environment passed to the executed command, and what the zeroth argument to the command is to be (see [Bourne Shell Builtins](#41-bourne-shell-builtins)).

- Bash的`exec`内置命令接受附加选项，允许用户控制传递给执行的命令的环境内容，以及将命令的第0个参数设置为什么（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）。

- Shell functions may be exported to children via the environment using `export -f` (see [Shell Functions](#33-shell-函数)).

- 使用`export -f`可以将shell函数导出到子进程的环境中（参见[Shell Functions](#33-shell-函数)）。

- The Bash `export`, `readonly`, and `declare` builtins can take a -f option to act on shell functions, a -p option to display variables with various attributes set in a format that can be used as shell input, a -n option to remove various variable attributes, and `name=value` arguments to set variable attributes and values simultaneously.

- Bash的`export`、`readonly`和`declare`内置命令可以使用`-f`选项来操作shell函数，使用`-p`选项以可以用作shell输入的格式显示具有各种属性设置的变量，使用`-n`选项来删除各种变量属性，以及通过`name=value`参数同时设置变量属性和值。

- The Bash `hash` builtin allows a name to be associated with an arbitrary filename, even when that filename cannot be found by searching the `$PATH`, using `hash -p` (see [Bourne Shell Builtins](#41-bourne-shell-builtins)).

- Bash的`hash`内置命令允许将名称与任意文件名关联，即使在`$PATH`中无法找到该文件名，可以使用`hash -p`（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）。

- Bash includes a `help` builtin for quick reference to shell facilities (see [Bash Builtin Commands](#42-bash-内置命令)).

- Bash包含了`help`内置命令，用于快速查阅shell功能（参见[Bash Builtin Commands](#42-bash-内置命令)）。

- The `printf` builtin is available to display formatted output (see [Bash Builtin Commands](#42-bash-内置命令)).

- 可以使用`printf`内置命令显示格式化输出（参见[Bash Builtin Commands](#42-bash-内置命令)）。

- The Bash `read` builtin (see [Bash Builtin Commands](#42-bash-内置命令)) will read a line ending in `\` with the -r option, and will use the `REPLY` variable as a default if no non-option arguments are supplied. The Bash `read` builtin also accepts a prompt string with the -p option and will use Readline to obtain the line when given the -e option. The `read` builtin also has additional options to control input: the -s option will turn off echoing of input characters as they are read, the -t option will allow `read` to time out if input does not arrive within a specified number of seconds, the -n option will allow reading only a specified number of characters rather than a full line, and the -d option will read until a particular character rather than newline.

- Bash的`read`内置命令（参见[Bash Builtin Commands](#42-bash-内置命令)）在使用-r选项时会读取以`\`结尾的行，并且如果没有提供非选项参数，则会使用`REPLY`变量作为默认值。Bash的`read`内置命令还接受一个-p选项作为提示字符串，并在给定-e选项时使用Readline来获取输入行。`read`内置命令还有其他控制输入的选项：-s选项用于关闭读取输入字符时的回显，-t选项允许`read`在指定的秒数内超时，如果输入未及时到达，则-n选项只允许读取指定数量的字符，而不是整行，并且-d选项将读取直到特定字符而不是换行符。

- The `return` builtin may be used to abort execution of scripts executed with the `.` or `source` builtins (see [Bourne Shell Builtins](#41-bourne-shell-builtins)).

- 可以使用`return`内置命令来中止使用`.`或`source`内置命令执行的脚本的执行（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）。

- Bash includes the `shopt` builtin, for finer control of shell optional capabilities (see [The Shopt Builtin](#432--shopt内置命令)), and allows these options to be set and unset at shell invocation (see [Invoking Bash](#61-调用bash)).

- Bash包含了`shopt`内置命令，用于更精细地控制shell的可选功能（参见[The Shopt Builtin](#432--shopt内置命令)），并允许在shell启动时设置和取消这些选项（参见[Invoking Bash](#61-调用bash)）。

- Bash has much more optional behavior controllable with the `set` builtin (see [The Set Builtin](#431-内置命令set)).

- Bash具有许多可选的行为，可以通过`set`内置命令进行控制（参见[The Set Builtin](#431-内置命令set)）。

- The `-x` (xtrace) option displays commands other than simple commands when performing an execution trace (see [The Set Builtin](#431-内置命令set)).

- `-x`（xtrace）选项在执行跟踪时显示除简单命令以外的命令（参见[The Set Builtin](#431-内置命令set)）。

- The `test` builtin (see [Bourne Shell Builtins](#41-bourne-shell-builtins)) is slightly different, as it implements the POSIX algorithm, which specifies the behavior based on the number of arguments.

- `test`内置命令（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）略有不同，因为它实现了POSIX算法，该算法根据参数的数量指定行为。

- Bash includes the `caller` builtin, which displays the context of any active subroutine call (a shell function or a script executed with the `.` or `source` builtins). This supports the Bash debugger.

- Bash包含`caller`内置命令，用于显示任何活动子例程调用（shell函数或使用`.`或`source`内置命令执行的脚本）的上下文。这支持Bash调试器。

- The `trap` builtin (see [Bourne Shell Builtins](#41-bourne-shell-builtins)) allows a `DEBUG` pseudo-signal specification, similar to `EXIT`. Commands specified with a `DEBUG` trap are executed before every simple command, `for` command, `case` command, `select` command, every arithmetic `for` command, and before the first command executes in a shell function. The `DEBUG` trap is not inherited by shell functions unless the function has been given the `trace` attribute or the `functrace` option has been enabled using the `shopt` builtin. The `extdebug` shell option has additional effects on the `DEBUG` trap.

- `trap` 内置命令（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）允许使用 `DEBUG` 伪信号规范，类似于 `EXIT`。指定了 `DEBUG` 陷阱的命令会在每个简单命令、`for` 命令、`case` 命令、`select` 命令、每个算术 `for` 命令以及在 shell 函数中第一个命令执行之前被执行。`DEBUG` 陷阱不会被 shell 函数继承，除非函数已经被赋予 `trace` 属性，或者通过 `shopt` 内置命令启用了 `functrace` 选项。`extdebug` shell 选项对 `DEBUG` 陷阱有额外的影响。

  The `trap` builtin (see [Bourne Shell Builtins](#41-bourne-shell-builtins)) allows an `ERR` pseudo-signal specification, similar to `EXIT` and `DEBUG`. Commands specified with an `ERR` trap are executed after a simple command fails, with a few exceptions. The `ERR` trap is not inherited by shell functions unless the `-o errtrace` option to the `set` builtin is enabled.

  `trap` 内置命令（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）允许使用 `ERR` 伪信号规范，类似于 `EXIT` 和 `DEBUG`。指定了 `ERR` 陷阱的命令会在简单命令失败后被执行，但有几个例外情况。`ERR` 陷阱不会被 shell 函数继承，除非使用 `set` 内置命令启用了 `-o errtrace` 选项。
  
  The `trap` builtin (see [Bourne Shell Builtins](#41-bourne-shell-builtins)) allows a `RETURN` pseudo-signal specification, similar to `EXIT` and `DEBUG`. Commands specified with a `RETURN` trap are executed before execution resumes after a shell function or a shell script executed with `.` or `source` returns. The `RETURN` trap is not inherited by shell functions unless the function has been given the `trace` attribute or the `functrace` option has been enabled using the `shopt` builtin.

  `trap` 内置命令（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）允许使用 `RETURN` 伪信号规范，类似于 `EXIT` 和 `DEBUG`。指定了 `RETURN` 陷阱的命令会在 shell 函数或使用 `.` 或 `source` 内置命令执行的 shell 脚本返回后恢复执行之前被执行。`RETURN` 陷阱不会被 shell 函数继承，除非函数已经被赋予 `trace` 属性，或者通过 `shopt` 内置命令启用了 `functrace` 选项。

- The Bash `type` builtin is more extensive and gives more information about the names it finds (see [Bash Builtin Commands](#42-bash-内置命令)).

- Bash 的 `type` 内置命令更为广泛，并提供有关所找到的名称的更多信息（参见[Bash Builtin Commands](#42-bash-内置命令)）。

- The Bash `umask` builtin permits a -p option to cause the output to be displayed in the form of a `umask` command that may be reused as input (see [Bourne Shell Builtins](#41-bourne-shell-builtins)).

- Bash 的 `umask` 内置命令允许使用 `-p` 选项，以使输出以 `umask` 命令的形式显示，可以重新用作输入（参见[Bourne Shell Builtins](#41-bourne-shell-builtins)）。

- Bash implements a `csh`-like directory stack, and provides the `pushd`, `popd`, and `dirs` builtins to manipulate it (see [The Directory Stack](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)). Bash also makes the directory stack visible as the value of the `DIRSTACK` shell variable.

- Bash 实现了类似于 `csh` 的目录栈，并提供了 `pushd`、`popd` 和 `dirs` 内置命令来对其进行操作（参见[The Directory Stack](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)）。Bash 还将目录栈可见化为 `DIRSTACK` shell 变量的值。

- Bash interprets special backslash-escaped characters in the prompt strings when interactive (see [Controlling the Prompt](#69-控制提示符)).

- 在交互模式下，Bash 会解释提示字符串中的特殊反斜杠转义字符（参见[Controlling the Prompt](#69-控制提示符)）。

- The Bash restricted mode is more useful (see [The Restricted Shell](#610-受限制的shell)); the SVR4.2 shell restricted mode is too limited.

- Bash 的受限模式更加实用（参见[The Restricted Shell](#610-受限制的shell)）；而 SVR4.2 shell 的受限模式太过有限。

- The `disown` builtin can remove a job from the internal shell job table (see [Job Control Builtins](#7-作业控制-Builtins)) or suppress the sending of `SIGHUP` to a job when the shell exits as the result of a `SIGHUP`.

- `disown` 内置命令可以从内部 shell 作业表中删除作业（参见[Job Control Builtins](#7-作业控制-Builtins)），或在 shell 退出时作为 `SIGHUP` 结果而不发送 `SIGHUP` 给作业。

- Bash includes a number of features to support a separate debugger for shell scripts.

- Bash 包含许多用于支持单独的 shell 脚本调试器的功能。

- The SVR4.2 shell has two privilege-related builtins (`mldmode` and `priv`) not present in Bash.

- SVR4.2 shell 有两个与特权相关的内置命令（`mldmode` 和 `priv`），而 Bash 中没有这些命令。

- Bash does not have the `stop` or `newgrp` builtins.

- Bash 不具有 `stop` 或 `newgrp` 内置命令。

- Bash does not use the `SHACCT` variable or perform shell accounting.

- Bash 不使用 `SHACCT` 变量，也不执行 shell 账户管理。

- The SVR4.2 `sh` uses a `TIMEOUT` variable like Bash uses `TMOUT`.

- SVR4.2 `sh` 使用类似于 Bash 使用的 `TMOUT` 的 `TIMEOUT` 变量。


More features unique to Bash may be found in [Bash Features](https://www.gnu.org/software/bash/manual/bash.html#Bash-Features).

​	Bash 的更多独特功能可以在[Bash Features](https://www.gnu.org/software/bash/manual/bash.html#Bash-Features)中找到。



### B.1 与 SVR4.2 Shell 的实现差异

Since Bash is a completely new implementation, it does not suffer from many of the limitations of the SVR4.2 shell. For instance:

​	由于 Bash 是一个全新的实现，因此它没有许多 SVR4.2 shell 的限制。例如： 

- Bash does not fork a subshell when redirecting into or out of a shell control structure such as an `if` or `while` statement.
- Bash does not allow unbalanced quotes. The SVR4.2 shell will silently insert a needed closing quote at `EOF` under certain circumstances. This can be the cause of some hard-to-find errors.
- The SVR4.2 shell uses a baroque memory management scheme based on trapping `SIGSEGV`. If the shell is started from a process with `SIGSEGV` blocked (e.g., by using the `system()` C library function call), it misbehaves badly.
- In a questionable attempt at security, the SVR4.2 shell, when invoked without the -p option, will alter its real and effective UID and GID if they are less than some magic threshold value, commonly 100. This can lead to unexpected results.
- The SVR4.2 shell does not allow users to trap `SIGSEGV`, `SIGALRM`, or `SIGCHLD`.
- The SVR4.2 shell does not allow the `IFS`, `MAILCHECK`, `PATH`, `PS1`, or `PS2` variables to be unset.
- The SVR4.2 shell treats `^` as the undocumented equivalent of `|`.
- Bash allows multiple option arguments when it is invoked (`-x -v`); the SVR4.2 shell allows only one option argument (`-xv`). In fact, some versions of the shell dump core if the second argument begins with a `-`.
- The SVR4.2 shell exits a script if any builtin fails; Bash exits a script only if one of the POSIX special builtins fails, and only for certain failures, as enumerated in the POSIX standard.
- The SVR4.2 shell behaves differently when invoked as `jsh` (it turns on job control).
- Bash 在将输入或输出重定向到 shell 控制结构（例如 `if` 或 `while` 语句）时不会创建子 shell。
- Bash 不允许不平衡的引号。在某些情况下，SVR4.2 shell 会在 `EOF` 处自动插入所需的闭合引号，这可能导致一些难以发现的错误。
- SVR4.2 shell 使用了一种基于捕获 `SIGSEGV` 的复杂内存管理方案。如果从阻塞 `SIGSEGV` 的进程（例如通过使用 `system()` C 库函数调用）启动 shell，则其行为会变得不正常。
- 为了尝试提高安全性，当没有使用 `-p` 选项启动 SVR4.2 shell 时，如果其实际和有效的 UID 和 GID 小于某个魔术阈值（通常为 100），它会将其修改。这可能导致意外结果。
- SVR4.2 shell 不允许用户捕获 `SIGSEGV`、`SIGALRM` 或 `SIGCHLD`。
- SVR4.2 shell 不允许取消设置 `IFS`、`MAILCHECK`、`PATH`、`PS1` 或 `PS2` 变量。
- SVR4.2 shell 将 `^` 视为未记录的 `|` 的等效字符。
- Bash 允许在启动时使用多个选项参数（`-x -v`）；而 SVR4.2 shell 仅允许一个选项参数（`-xv`）。事实上，某些版本的 shell 如果第二个参数以 `-` 开头，则会导致核心转储。
- SVR4.2 shell 如果任何内置命令失败，会退出脚本；而 Bash 仅在 POSIX 特殊内置命令之一失败时才退出脚本，并且仅对特定的失败情况进行了列举，这在 POSIX 标准中有所说明。
- 当作为 `jsh` 调用时，SVR4.2 shell 的行为不同（它会开启作业控制）。





## 附录 C：GNU 自由文档许可证

Version 1.3, 3 November 2008

```
Copyright © 2000, 2001, 2002, 2007, 2008 Free Software Foundation, Inc.
http://fsf.org/

Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.
```

1. PREAMBLE

   The purpose of this License is to make a manual, textbook, or other functional and useful document *free* in the sense of freedom: to assure everyone the effective freedom to copy and redistribute it, with or without modifying it, either commercially or noncommercially. Secondarily, this License preserves for the author and publisher a way to get credit for their work, while not being considered responsible for modifications made by others.

   This License is a kind of “copyleft”, which means that derivative works of the document must themselves be free in the same sense. It complements the GNU General Public License, which is a copyleft license designed for free software.

   We have designed this License in order to use it for manuals for free software, because free software needs free documentation: a free program should come with manuals providing the same freedoms that the software does. But this License is not limited to software manuals; it can be used for any textual work, regardless of subject matter or whether it is published as a printed book. We recommend this License principally for works whose purpose is instruction or reference.

2. APPLICABILITY AND DEFINITIONS

   This License applies to any manual or other work, in any medium, that contains a notice placed by the copyright holder saying it can be distributed under the terms of this License. Such a notice grants a world-wide, royalty-free license, unlimited in duration, to use that work under the conditions stated herein. The “Document”, below, refers to any such manual or work. Any member of the public is a licensee, and is addressed as “you”. You accept the license if you copy, modify or distribute the work in a way requiring permission under copyright law.

   A “Modified Version” of the Document means any work containing the Document or a portion of it, either copied verbatim, or with modifications and/or translated into another language.

   A “Secondary Section” is a named appendix or a front-matter section of the Document that deals exclusively with the relationship of the publishers or authors of the Document to the Document's overall subject (or to related matters) and contains nothing that could fall directly within that overall subject. (Thus, if the Document is in part a textbook of mathematics, a Secondary Section may not explain any mathematics.) The relationship could be a matter of historical connection with the subject or with related matters, or of legal, commercial, philosophical, ethical or political position regarding them.

   The “Invariant Sections” are certain Secondary Sections whose titles are designated, as being those of Invariant Sections, in the notice that says that the Document is released under this License. If a section does not fit the above definition of Secondary then it is not allowed to be designated as Invariant. The Document may contain zero Invariant Sections. If the Document does not identify any Invariant Sections then there are none.

   The “Cover Texts” are certain short passages of text that are listed, as Front-Cover Texts or Back-Cover Texts, in the notice that says that the Document is released under this License. A Front-Cover Text may be at most 5 words, and a Back-Cover Text may be at most 25 words.

   A “Transparent” copy of the Document means a machine-readable copy, represented in a format whose specification is available to the general public, that is suitable for revising the document straightforwardly with generic text editors or (for images composed of pixels) generic paint programs or (for drawings) some widely available drawing editor, and that is suitable for input to text formatters or for automatic translation to a variety of formats suitable for input to text formatters. A copy made in an otherwise Transparent file format whose markup, or absence of markup, has been arranged to thwart or discourage subsequent modification by readers is not Transparent. An image format is not Transparent if used for any substantial amount of text. A copy that is not “Transparent” is called “Opaque”.

   Examples of suitable formats for Transparent copies include plain ASCII without markup, Texinfo input format, LaTeX input format, SGML or XML using a publicly available DTD, and standard-conforming simple HTML, PostScript or PDF designed for human modification. Examples of transparent image formats include PNG, XCF and JPG. Opaque formats include proprietary formats that can be read and edited only by proprietary word processors, SGML or XML for which the DTD and/or processing tools are not generally available, and the machine-generated HTML, PostScript or PDF produced by some word processors for output purposes only.

   The “Title Page” means, for a printed book, the title page itself, plus such following pages as are needed to hold, legibly, the material this License requires to appear in the title page. For works in formats which do not have any title page as such, “Title Page” means the text near the most prominent appearance of the work's title, preceding the beginning of the body of the text.

   The “publisher” means any person or entity that distributes copies of the Document to the public.

   A section “Entitled XYZ” means a named subunit of the Document whose title either is precisely XYZ or contains XYZ in parentheses following text that translates XYZ in another language. (Here XYZ stands for a specific section name mentioned below, such as “Acknowledgements”, “Dedications”, “Endorsements”, or “History”.) To “Preserve the Title” of such a section when you modify the Document means that it remains a section “Entitled XYZ” according to this definition.

   The Document may include Warranty Disclaimers next to the notice which states that this License applies to the Document. These Warranty Disclaimers are considered to be included by reference in this License, but only as regards disclaiming warranties: any other implication that these Warranty Disclaimers may have is void and has no effect on the meaning of this License.

3. VERBATIM COPYING

   You may copy and distribute the Document in any medium, either commercially or noncommercially, provided that this License, the copyright notices, and the license notice saying this License applies to the Document are reproduced in all copies, and that you add no other conditions whatsoever to those of this License. You may not use technical measures to obstruct or control the reading or further copying of the copies you make or distribute. However, you may accept compensation in exchange for copies. If you distribute a large enough number of copies you must also follow the conditions in section 3.

   You may also lend copies, under the same conditions stated above, and you may publicly display copies.

4. COPYING IN QUANTITY

   If you publish printed copies (or copies in media that commonly have printed covers) of the Document, numbering more than 100, and the Document's license notice requires Cover Texts, you must enclose the copies in covers that carry, clearly and legibly, all these Cover Texts: Front-Cover Texts on the front cover, and Back-Cover Texts on the back cover. Both covers must also clearly and legibly identify you as the publisher of these copies. The front cover must present the full title with all words of the title equally prominent and visible. You may add other material on the covers in addition. Copying with changes limited to the covers, as long as they preserve the title of the Document and satisfy these conditions, can be treated as verbatim copying in other respects.

   If the required texts for either cover are too voluminous to fit legibly, you should put the first ones listed (as many as fit reasonably) on the actual cover, and continue the rest onto adjacent pages.

   If you publish or distribute Opaque copies of the Document numbering more than 100, you must either include a machine-readable Transparent copy along with each Opaque copy, or state in or with each Opaque copy a computer-network location from which the general network-using public has access to download using public-standard network protocols a complete Transparent copy of the Document, free of added material. If you use the latter option, you must take reasonably prudent steps, when you begin distribution of Opaque copies in quantity, to ensure that this Transparent copy will remain thus accessible at the stated location until at least one year after the last time you distribute an Opaque copy (directly or through your agents or retailers) of that edition to the public.

   It is requested, but not required, that you contact the authors of the Document well before redistributing any large number of copies, to give them a chance to provide you with an updated version of the Document.

5. MODIFICATIONS

   You may copy and distribute a Modified Version of the Document under the conditions of sections 2 and 3 above, provided that you release the Modified Version under precisely this License, with the Modified Version filling the role of the Document, thus licensing distribution and modification of the Modified Version to whoever possesses a copy of it. In addition, you must do these things in the Modified Version:

   1. Use in the Title Page (and on the covers, if any) a title distinct from that of the Document, and from those of previous versions (which should, if there were any, be listed in the History section of the Document). You may use the same title as a previous version if the original publisher of that version gives permission.
   2. List on the Title Page, as authors, one or more persons or entities responsible for authorship of the modifications in the Modified Version, together with at least five of the principal authors of the Document (all of its principal authors, if it has fewer than five), unless they release you from this requirement.
   3. State on the Title page the name of the publisher of the Modified Version, as the publisher.
   4. Preserve all the copyright notices of the Document.
   5. Add an appropriate copyright notice for your modifications adjacent to the other copyright notices.
   6. Include, immediately after the copyright notices, a license notice giving the public permission to use the Modified Version under the terms of this License, in the form shown in the Addendum below.
   7. Preserve in that license notice the full lists of Invariant Sections and required Cover Texts given in the Document's license notice.
   8. Include an unaltered copy of this License.
   9. Preserve the section Entitled “History”, Preserve its Title, and add to it an item stating at least the title, year, new authors, and publisher of the Modified Version as given on the Title Page. If there is no section Entitled “History” in the Document, create one stating the title, year, authors, and publisher of the Document as given on its Title Page, then add an item describing the Modified Version as stated in the previous sentence.
   10. Preserve the network location, if any, given in the Document for public access to a Transparent copy of the Document, and likewise the network locations given in the Document for previous versions it was based on. These may be placed in the “History” section. You may omit a network location for a work that was published at least four years before the Document itself, or if the original publisher of the version it refers to gives permission.
   11. For any section Entitled “Acknowledgements” or “Dedications”, Preserve the Title of the section, and preserve in the section all the substance and tone of each of the contributor acknowledgements and/or dedications given therein.
   12. Preserve all the Invariant Sections of the Document, unaltered in their text and in their titles. Section numbers or the equivalent are not considered part of the section titles.
   13. Delete any section Entitled “Endorsements”. Such a section may not be included in the Modified Version.
   14. Do not retitle any existing section to be Entitled “Endorsements” or to conflict in title with any Invariant Section.
   15. Preserve any Warranty Disclaimers.

   If the Modified Version includes new front-matter sections or appendices that qualify as Secondary Sections and contain no material copied from the Document, you may at your option designate some or all of these sections as invariant. To do this, add their titles to the list of Invariant Sections in the Modified Version's license notice. These titles must be distinct from any other section titles.

   You may add a section Entitled “Endorsements”, provided it contains nothing but endorsements of your Modified Version by various parties—for example, statements of peer review or that the text has been approved by an organization as the authoritative definition of a standard.

   You may add a passage of up to five words as a Front-Cover Text, and a passage of up to 25 words as a Back-Cover Text, to the end of the list of Cover Texts in the Modified Version. Only one passage of Front-Cover Text and one of Back-Cover Text may be added by (or through arrangements made by) any one entity. If the Document already includes a cover text for the same cover, previously added by you or by arrangement made by the same entity you are acting on behalf of, you may not add another; but you may replace the old one, on explicit permission from the previous publisher that added the old one.

   The author(s) and publisher(s) of the Document do not by this License give permission to use their names for publicity for or to assert or imply endorsement of any Modified Version.

6. COMBINING DOCUMENTS

   You may combine the Document with other documents released under this License, under the terms defined in section 4 above for modified versions, provided that you include in the combination all of the Invariant Sections of all of the original documents, unmodified, and list them all as Invariant Sections of your combined work in its license notice, and that you preserve all their Warranty Disclaimers.

   The combined work need only contain one copy of this License, and multiple identical Invariant Sections may be replaced with a single copy. If there are multiple Invariant Sections with the same name but different contents, make the title of each such section unique by adding at the end of it, in parentheses, the name of the original author or publisher of that section if known, or else a unique number. Make the same adjustment to the section titles in the list of Invariant Sections in the license notice of the combined work.

   In the combination, you must combine any sections Entitled “History” in the various original documents, forming one section Entitled “History”; likewise combine any sections Entitled “Acknowledgements”, and any sections Entitled “Dedications”. You must delete all sections Entitled “Endorsements.”

7. COLLECTIONS OF DOCUMENTS

   You may make a collection consisting of the Document and other documents released under this License, and replace the individual copies of this License in the various documents with a single copy that is included in the collection, provided that you follow the rules of this License for verbatim copying of each of the documents in all other respects.

   You may extract a single document from such a collection, and distribute it individually under this License, provided you insert a copy of this License into the extracted document, and follow this License in all other respects regarding verbatim copying of that document.

8. AGGREGATION WITH INDEPENDENT WORKS

   A compilation of the Document or its derivatives with other separate and independent documents or works, in or on a volume of a storage or distribution medium, is called an “aggregate” if the copyright resulting from the compilation is not used to limit the legal rights of the compilation's users beyond what the individual works permit. When the Document is included in an aggregate, this License does not apply to the other works in the aggregate which are not themselves derivative works of the Document.

   If the Cover Text requirement of section 3 is applicable to these copies of the Document, then if the Document is less than one half of the entire aggregate, the Document's Cover Texts may be placed on covers that bracket the Document within the aggregate, or the electronic equivalent of covers if the Document is in electronic form. Otherwise they must appear on printed covers that bracket the whole aggregate.

9. TRANSLATION

   Translation is considered a kind of modification, so you may distribute translations of the Document under the terms of section 4. Replacing Invariant Sections with translations requires special permission from their copyright holders, but you may include translations of some or all Invariant Sections in addition to the original versions of these Invariant Sections. You may include a translation of this License, and all the license notices in the Document, and any Warranty Disclaimers, provided that you also include the original English version of this License and the original versions of those notices and disclaimers. In case of a disagreement between the translation and the original version of this License or a notice or disclaimer, the original version will prevail.

   If a section in the Document is Entitled “Acknowledgements”, “Dedications”, or “History”, the requirement (section 4) to Preserve its Title (section 1) will typically require changing the actual title.

10. TERMINATION

    You may not copy, modify, sublicense, or distribute the Document except as expressly provided under this License. Any attempt otherwise to copy, modify, sublicense, or distribute it is void, and will automatically terminate your rights under this License.

    However, if you cease all violation of this License, then your license from a particular copyright holder is reinstated (a) provisionally, unless and until the copyright holder explicitly and finally terminates your license, and (b) permanently, if the copyright holder fails to notify you of the violation by some reasonable means prior to 60 days after the cessation.

    Moreover, your license from a particular copyright holder is reinstated permanently if the copyright holder notifies you of the violation by some reasonable means, this is the first time you have received notice of violation of this License (for any work) from that copyright holder, and you cure the violation prior to 30 days after your receipt of the notice.

    Termination of your rights under this section does not terminate the licenses of parties who have received copies or rights from you under this License. If your rights have been terminated and not permanently reinstated, receipt of a copy of some or all of the same material does not give you any rights to use it.

11. FUTURE REVISIONS OF THIS LICENSE

    The Free Software Foundation may publish new, revised versions of the GNU Free Documentation License from time to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address new problems or concerns. See http://www.gnu.org/copyleft/.

    Each version of the License is given a distinguishing version number. If the Document specifies that a particular numbered version of this License “or any later version” applies to it, you have the option of following the terms and conditions either of that specified version or of any later version that has been published (not as a draft) by the Free Software Foundation. If the Document does not specify a version number of this License, you may choose any version ever published (not as a draft) by the Free Software Foundation. If the Document specifies that a proxy can decide which future versions of this License can be used, that proxy's public statement of acceptance of a version permanently authorizes you to choose that version for the Document.

12. RELICENSING

    “Massive Multiauthor Collaboration Site” (or “MMC Site”) means any World Wide Web server that publishes copyrightable works and also provides prominent facilities for anybody to edit those works. A public wiki that anybody can edit is an example of such a server. A “Massive Multiauthor Collaboration” (or “MMC”) contained in the site means any set of copyrightable works thus published on the MMC site.

    “CC-BY-SA” means the Creative Commons Attribution-Share Alike 3.0 license published by Creative Commons Corporation, a not-for-profit corporation with a principal place of business in San Francisco, California, as well as future copyleft versions of that license published by that same organization.

    “Incorporate” means to publish or republish a Document, in whole or in part, as part of another Document.

    An MMC is “eligible for relicensing” if it is licensed under this License, and if all works that were first published under this License somewhere other than this MMC, and subsequently incorporated in whole or in part into the MMC, (1) had no cover texts or invariant sections, and (2) were thus incorporated prior to November 1, 2008.

    The operator of an MMC Site may republish an MMC contained in the site under CC-BY-SA on the same site at any time before August 1, 2009, provided the MMC is eligible for relicensing.



### 附录：如何在您的文档中使用本许可证

To use this License in a document you have written, include a copy of the License in the document and put the following copyright and license notices just after the title page:

​	要在您编写的文档中使用本许可证，请在文档中包含一份许可证的副本，并在标题页之后加入以下版权和许可声明：

```
 Copyright (C)  year  your name.
  Permission is granted to copy, distribute and/or modify this document
  under the terms of the GNU Free Documentation License, Version 1.3
  or any later version published by the Free Software Foundation;
  with no Invariant Sections, no Front-Cover Texts, and no Back-Cover
  Texts.  A copy of the license is included in the section entitled ``GNU
  Free Documentation License''.
```

If you have Invariant Sections, Front-Cover Texts and Back-Cover Texts, replace the “with…Texts.” line with this:

​	如果您的文档中包含不变的章节、封面文字和封底文字，请使用以下语句替换上述“with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.”行：

```
    with the Invariant Sections being list their titles, with
    the Front-Cover Texts being list, and with the Back-Cover Texts
    being list.
```

If you have Invariant Sections without Cover Texts, or some other combination of the three, merge those two alternatives to suit the situation.

​	如果您的文档中包含不变的章节但不包含封面文字和封底文字，或者包含其他三者的组合，请合并两种备选方案以适应情况。

If your document contains nontrivial examples of program code, we recommend releasing these examples in parallel under your choice of free software license, such as the GNU General Public License, to permit their use in free software.

​	如果您的文档包含复杂的程序代码示例，我们建议以您选择的自由软件许可证（例如GNU通用公共许可证）同时发布这些示例，以便允许它们在自由软件中使用。