+++
title = "Bash参考手册"
date = 2023-07-19T10:33:16+08:00
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++



# Bash Reference Manual - Bash参考手册

> 原文：[https://www.gnu.org/software/bash/manual/bash.html](https://www.gnu.org/software/bash/manual/bash.html)



# Bash特性

​	本文是对Bash Shell（版本5.2，2022年9月19日）中的特性的简要描述。Bash的主页是http://www.gnu.org/software/bash/。

​	本手册是Bash参考手册5.2版，最近更新于2022年9月19日，适用于`Bash`版本5.2。

​	Bash包含其他流行Shell中的特性，还有一些只在Bash中出现的特性。Bash借鉴了其他Shell的概念，包括Bourne Shell（sh）、Korn Shell（ksh）和C Shell（csh及其后继者tcsh）。下面的菜单将这些特性分成了几个类别，并指出哪些特性受其他Shell启发，哪些特性是特定于Bash的。

​	本手册旨在对Bash中的特性进行简要介绍。Bash手册页应作为关于Shell行为的权威参考。



## 1 简介








### 1.1 什么是 Bash？

​	Bash是GNU操作系统的shell或命令语言解释器。其名称是`Bourne-Again SHell`的首字母缩写，是对当前Unix shell  `sh`的直接祖先的作者Stephen Bourne的一个双关语，该shell出现在第七版贝尔实验室研究版Unix中。

​	Bash与`sh`基本兼容，并吸收了Korn shell（`ksh`）和C shell（`csh`）中的有用特性。它旨在成为IEEE POSIX Shell and Tools部分（IEEE标准1003.1）的一个符合实现。对于交互和编程使用，它比sh提供了功能上的改进。

​	尽管GNU操作系统提供了其他shell，包括cs~h的版本，但Bash是默认的shell。与其他GNU软件一样，Bash非常易于移植。它目前可以运行在几乎所有版本的Unix和一些其他操作系统上，也有独立支持的端口适用于MS-DOS、OS/2和Windows平台。





### 1.2 什么是 shell？

​	从根本上说，shell只是一个执行命令的宏处理器。宏处理器是指将文本和符号扩展以创建更大表达式的功能。

​	Unix shell既是命令解释器，也是一种编程语言。作为命令解释器，shell为用户接口提供了丰富的GNU工具集。编程语言的特性允许组合这些实用程序。可以创建包含命令的文件，并使其成为命令本身。这些新命令在/bin等目录中具有与系统命令相同的状态，允许用户或组建立自定义环境来自动化常见任务。

​	shell可以用于交互或非交互使用。在交互模式下，它接受从键盘输入的命令。在非交互模式下，shell执行从文件中读取的命令。

​	shell允许同步和异步地执行GNU命令。在等待同步命令完成之前，shell会等待以接受更多输入；异步命令在shell读取和执行其他命令时继续并行执行。*重定向*构造允许对这些命令的输入和输出进行精细控制。此外，shell还允许控制命令环境的内容。

​	Shell还提供了一小组内置命令（*builtins*），用于实现通过独立实用程序无法实现或不方便实现的功能。例如，`cd`、`break`、`continue`和`exec`无法在shell外部实现，因为它们直接操作shell本身。`history`、`getopts`、`kill`或`pwd`等内置命令可以实现为独立实用程序，但作为内置命令使用更加方便。本手册后续的章节将介绍所有shell内置命令。

​	虽然执行命令至关重要，但shell的大部分功能（和复杂性）都源于其嵌入的编程语言。与任何高级语言一样，shell提供变量、流程控制结构、引用和函数。

​	Shell提供的功能主要面向交互使用，而不是为编程语言增加功能。这些交互功能包括作业控制、命令行编辑、命令历史记录和别名。本手册中将介绍每个功能的详细信息。





## 2 定义

​	本手册的其余部分将使用以下定义。

- `POSIX`

  基于Unix的一系列开放系统标准。Bash主要与POSIX 1003.1标准的Shell and Utilities部分相关。

- `blank`

  A space or tab character.

  空格或制表符字符。

- `builtin`

  由shell本身内部实现的命令，而不是由文件系统中的可执行程序实现的命令。

- `control operator`

  执行控制功能的`token`。它是`换行符`或以下之一：`||`、`&&`、`&`、`;`、`;;`、`;&`、`;;&`、`|`、`|&`、`(`或`)`。

- `exit status`

  命令返回给其调用者的值。该值限制为8位，因此最大值为255。

- `field`

  一段文本单元，是shell扩展的结果之一。在执行命令时，生成的字段用作命令名称和参数。

- `filename`

  用于标识文件的字符串。

- `job`

  由一组进程组成的流水线及其所有派生进程，它们都属于同一个进程组。

- `job control`

  用户可以选择停止（挂起）和重新启动（恢复）进程执行的机制。

- `metacharacter`

  未引用时用于分隔单词的字符。元字符包括空格、制表符、换行符，以及以下字符：`|`、`&`、`;`、`(`、`)`、`<`或`>`。

- `name`

  由字母、数字和下划线组成的单词，以字母或下划线开头。`name`被用作shell变量和函数的名称。也被称为“标识符”。

- `operator`

  是控制操作符或重定向操作符。请参阅[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)获取重定向操作符的列表。操作符包含至少一个未引用的`metacharacter`。

- `process group`

  一组相关的进程，每个进程具有相同的进程组ID。

- `process group ID`

  在其生命周期中代表`process group`的唯一标识符。

- `reserved word`

  一种对shell具有特殊含义的`word`。大多数保留字引入了shell流控制结构，例如`for`和`while`。

- `return status`

  `exit status`的同义词

- `signal`

  一种机制，用于使进程可以被内核通知系统中发生的事件。

- `special builtin`

  由POSIX标准分类为特殊的shell内建命令。

- `token`

  shell中被视为单个单位的字符序列，可以是`word`或`operator`。

- `word`

  shell中被视为单个单位的字符序列。单词不包括未引用的`metacharacters`。





## 3 Shell基本特性



​	Bash是“Bourne-Again SHell”的首字母缩写。Bourne shell是由Stephen Bourne最初编写的传统Unix shell。Bash提供了Bourne shell的所有内建命令。Bash的求值和引用规则遵循POSIX规范中的“标准”Unix shell。

​	本章简要介绍了shell的“构建块（`building blocks`）”：命令、控制结构、shell函数、shell参数、shell扩展、重定向（一种从命名文件中将输入和输出导向的方法）以及shell如何执行命令。




### 3.1 Shell语法

​	当shell读取输入时，它按照一系列操作进行处理。如果输入指示开始一个注释，shell会忽略注释符号（`#`）及其后的内容。

​	否则，大致来说，shell会读取输入并将其分割为单词和操作符，使用引用规则来确定对各个单词和字符赋予的含义。

​	然后，shell将这些标记解析为命令和其他结构，消除某些单词或字符的特殊含义，对其他单词进行扩展，根据需要重定向输入和输出，执行指定的命令，等待命令的退出状态，并将该退出状态可供进一步检查或处理。



#### 3.1.1 Shell操作

​	以下是shell读取和执行命令时的操作简要描述。基本上，shell会执行以下操作： 

1. 从文件中读取输入（参见[Shell脚本](https://www.gnu.org/software/bash/manual/bash.html#Shell-Scripts)），或从作为-c调用选项的参数提供的字符串中读取输入（参见[调用Bash](https://www.gnu.org/software/bash/manual/bash.html#Invoking-Bash)），或从用户终端读取输入。
3. 按照[引用](https://www.gnu.org/software/bash/manual/bash.html#Quoting)中描述的引用规则，将输入分割为单词和操作符。这些标记由`metacharacters`分隔。此步骤会执行别名扩展（参见[别名](https://www.gnu.org/software/bash/manual/bash.html#Aliases)）。
5. 将标记解析为简单命令和复合命令（参见[Shell命令](https://www.gnu.org/software/bash/manual/bash.html#Shell-Commands)）。
7. 执行各种shell扩展（参见[Shell扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)），将扩展后的标记分解为文件名列表（参见[文件名扩展](https://www.gnu.org/software/bash/manual/bash.html#Filename-Expansion)）以及命令和参数。
9. 执行必要的重定向（参见[重定向](https://www.gnu.org/software/bash/manual/bash.html#Redirections)），并从参数列表中删除重定向操作符及其操作数。
11. 执行命令（参见[执行命令](https://www.gnu.org/software/bash/manual/bash.html#Executing-Commands)）。
13. 可选地等待命令完成并收集其退出状态（参见[退出状态](https://www.gnu.org/software/bash/manual/bash.html#Exit-Status)）。





#### 3.1.2 引用 Quoting



​	引用用于取消shell对某些字符或单词的特殊含义。引用可用于禁用特殊字符的特殊处理，防止保留字被识别为保留字，并防止参数扩展。

​	每个shell元字符（参见[定义](https://www.gnu.org/software/bash/manual/bash.html#Definitions)）对于shell都具有特殊含义，如果要表示字符本身，则必须对其进行引用。当使用命令历史扩展功能时（参见[历史扩展](https://www.gnu.org/software/bash/manual/bash.html#History-Interaction)），通常使用的历史扩展字符（通常是`!`）必须被引用，以防止历史扩展。有关历史扩展的更多详细信息，请参见[Shell历史功能](https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Facilities)。

​	有三种引用机制：*转义字符*、单引号和双引号。





#### 3.1.2.1 转义字符

​	一个未被引用的反斜杠（`\`）是Bash的转义字符。它保留紧随其后的下一个字符的原始值，但不包括换行符。如果出现`\newline`对，并且反斜杠本身未被引用，则`\newline`会被视为行继续符（即，它会从输入流中移除并被忽略）。



#### 3.1.2.2 单引号

​	用单引号（`'`）括起来的字符会保留括号内每个字符的原始值。单引号不能在单引号内部出现，即使其前面有反斜杠。



#### 3.1.2.3 双引号

​	用双引号（`"`）括起来的字符会保留括号内所有字符的原始值，但会除去`$`、`, `\`和在启用历史扩展的情况下的`!`。在POSIX模式下（参见[Bash POSIX Mode](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)），`!`在双引号内没有特殊含义，即使启用历史扩展。`$`和\`在双引号内保留它们的特殊含义（参见[Shell扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)）。反斜杠仅在后面跟着以下字符之一时保留其特殊含义：`$`、\`, `"`、`\`或换行符。在双引号内，后跟这些字符的反斜杠会被移除。没有特殊含义的字符之前的反斜杠会保持不变。双引号内的双引号可以通过在其前面加上反斜杠进行引用。如果启用了历史扩展，除非在双引号内出现的`!`被反斜杠转义，否则会执行历史扩展。前面跟着`!`的反斜杠不会被移除。

​	在双引号内，特殊参数`*`和`@`具有特殊含义（参见[Shell参数扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion))。





#### 3.1.2.4 ANSI-C 引用 ANSI-C Quoting



​	形式为$`string`的字符序列被视为特殊类型的单引号。该序列会根据ANSI C标准进行扩展，其中字符串中的反斜杠转义字符按照指定的规则进行替换。如果存在反斜杠转义序列，则按照以下方式解码：

 

- `\a`

  警告（响铃）

- `\b`

  退格

- `\e`

- `\E`

  转义字符（非ANSI C标准）

- `\f`

  换页符

- `\n`

  换行符

- `\r`

  回车符

- `\t`

  水平制表符

- `\v`

  垂直制表符

- `\\`

  反斜杠

- `\'`

  单引号

- `\"`

  双引号

- `\?`

  问号

- `\nnn`

  8bit字符，其值为八进制值nnn（一个到三个八进制数字）

- `\xHH`

  8bit字符，其值为十六进制值HH（一个或两个十六进制数字）

- `\uHHHH`

  Unicode（ISO/IEC 10646）字符，其值为十六进制值HHHH（一个到四个十六进制数字）

- `\UHHHHHHHH`

  Unicode（ISO/IEC 10646）字符，其值为十六进制值HHHHHHHH（一个到八个十六进制数字）

- `\cx`

  控制-x字符

​	扩展后的结果被视为单引号，就像没有美元符号一样。





#### 3.1.2.5 特定区域设置翻译 Locale-Specific Translation



​	在双引号中，如果字符串前缀为美元符号（`$`），例如`$"hello, world"`，将根据当前的区域设置对该字符串进行翻译。`gettext`基础设施执行查找和翻译，并使用`LC_MESSAGES`、`TEXTDOMAINDIR`和`TEXTDOMAIN` shell变量，如下所述。有关此处未涵盖的其他详细信息，请参阅gettext文档。如果当前的区域设置是`C`或`POSIX`，或者如果没有可用的翻译，或者字符串未被翻译，美元符号将被忽略。由于这是双引号的一种形式，所以无论是否被翻译和替换，该字符串默认都保持双引号。如果启用了`noexpand_translation`选项（使用`shopt`内置命令，参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），则翻译后的字符串将使用单引号而不是双引号。

​	本节的其余部分是关于如何使用gettext为shell脚本创建字符串的翻译的简要概述。关于gettext的更多细节，请参阅gettext文档。




#### 创建国际化脚本



​	一旦你在脚本中用$"..."标记了要进行翻译的字符串，你可以使用以下命令创建一个gettext的"模板"文件：

```
bash --dump-po-strings scriptname > domain.pot
```

​	域是你的*消息域*。它只是一个用于标识gettext所需的文件的任意字符串，就像一个包或脚本名一样。在安装翻译的系统中，它需要在所有消息域中保持唯一，以便gettext知道哪些翻译对应于你的脚本。你将使用模板文件为每种目标语言创建翻译。模板文件通常具有后缀.pot。

​	然后，将此模板文件复制到每个你想支持的目标语言的单独文件中（称为"PO"文件，使用后缀.po）。PO文件使用各种命名约定，但在将模板文件翻译成特定语言时，首先将模板文件复制到文件名为你想要的目标语言的文件中，并添加.po后缀。例如，你的字符串的西班牙语翻译将在名为es.po的文件中，而在使用名为"example"的消息域开始时，你将运行：

```
cp example.pot es.po
```

​	PO文件通常被命名为domain.po，并安装在包含特定语言多个翻译文件的目录中。

​	不论选择哪种命名约定，你都需要手动将PO文件中的字符串翻译为相应的语言。

​	完成翻译和PO文件后，你将使用gettext工具生成所谓的"MO"文件，这些文件是gettext工具用于高效查找翻译的PO文件的编译版本。MO文件也被称为"message catalog"文件。你可以使用`msgfmt`程序来完成这个工作。例如，如果有一个包含西班牙语翻译的文件，你可以运行：

```
msgfmt -o es.mo es.po
```

来生成相应的MO文件。

​	一旦你有了MO文件，你决定将它们安装在哪里，并使用`TEXTDOMAINDIR` shell变量告诉gettext工具它们的位置。确保在安装它们时，使用与PO文件相同的消息域来命名MO文件。



​	你的用户将使用`LANG`或`LC_MESSAGES` shell变量来选择所需的语言。

​	你将`TEXTDOMAIN`变量设置为脚本的消息域。与上面一样，你将使用消息域来命名你的翻译文件。

​	你或者可能是你的用户将`TEXTDOMAINDIR`变量设置为包含消息目录文件的目录的名称。如果将消息文件安装到系统的标准消息目录目录中，你就不需要担心这个变量。

​	消息目录文件的存储位置因系统而异。有些使用由`LC_MESSAGES` shell变量选择的消息目录。其他人根据`TEXTDOMAIN` shell变量的值创建消息目录的名称，可能还会添加`.mo`后缀。如果使用了`TEXTDOMAIN`变量，可能需要将`TEXTDOMAINDIR`变量设置为消息目录文件的位置，如上所述。通常以这种方式同时使用两个变量：`$TEXTDOMAINDIR`/`$LC_MESSAGES`/LC_MESSAGES/`$TEXTDOMAIN`.mo。

​	如果你使用了上述最后的约定，并且你希望将包含西班牙语（es）和世界语（eo）翻译的消息目录文件存储在用于自定义翻译文件的本地目录中，你可以运行：

```
TEXTDOMAIN=example
TEXTDOMAINDIR=/usr/local/share/locale

cp es.mo ${TEXTDOMAINDIR}/es/LC_MESSAGES/${TEXTDOMAIN}.mo
cp eo.mo ${TEXTDOMAINDIR}/eo/LC_MESSAGES/${TEXTDOMAIN}.mo
```

​	当所有这些都完成后，包含编译翻译的消息目录文件安装在正确的位置后，你的用户将能够通过在运行脚本之前设置`LANG`或`LC_MESSAGES`环境变量来查看支持语言中的翻译字符串。



#### 3.1.3 注释



​	在非交互式shell中，或启用了`shopt`内置命令的`interactive_comments`选项的交互式shell（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），以`#`开头的单词将导致忽略该单词及该行上的所有其余字符。如果交互式shell未启用`interactive_comments`选项，则不允许使用注释。`interactive_comments`选项在交互式shell中默认为打开状态。有关什么使shell变为交互式的描述，请参见[Interactive Shells](https://www.gnu.org/software/bash/manual/bash.html#Interactive-Shells)。



### 3.2 Shell命令



​	一个简单的shell命令，例如`echo a b c`，由命令本身后跟由空格分隔的参数组成。

​	更复杂的shell命令由一系列简单的命令组合在一起，方式多种多样：在管道中，其中一个命令的输出成为第二个命令的输入，在循环或条件结构中，或在某种其他分组中。



#### 3.2.1 保留字



​	保留字是对shell具有特殊含义的单词。它们用于开始和结束shell的复合命令。

​	以下单词在未加引号的情况下被识别为保留字，并且作为命令的第一个单词（有关异常情况，请参见下文）：

| `if`   | `then` | `elif`   | `else`   | `fi`       | `time` |
| ------ | ------ | -------- | -------- | ---------- | ------ |
| `for`  | `in`   | `until`  | `while`  | `do`       | `done` |
| `case` | `esac` | `coproc` | `select` | `function` |        |
| `{`    | `}`    | `[[`     | `]]`     | `!`        |        |

如果`in`是`case`或`select`命令的第三个单词，则`in`将被识别为保留字。如果`in`和`do`是`for`命令的第三个单词，则它们也将被识别为保留字。



#### 3.2.2 简单命令



​	简单命令是最常遇到的类型的命令。它只是一系列由`blank`分隔的单词，由shell的控制运算符（参见[Definitions](https://www.gnu.org/software/bash/manual/bash.html#Definitions)）之一终止。第一个单词通常指定要执行的命令，其余的单词是该命令的参数。

​	简单命令的返回状态（参见[Exit Status](https://www.gnu.org/software/bash/manual/bash.html#Exit-Status)）是由POSIX 1003.1 `waitpid`函数提供的退出状态，如果命令被信号n终止，则为128+n。



#### 3.2.3 管道



​	管道是由一个或多个命令序列组成，由控制运算符`|`或`|&`分隔。



​	管道的格式为

```
[time [-p]] [!] command1 [ | or |& command2 ] …
```

​	管道中每个命令的输出通过管道连接到下一个命令的输入。也就是说，每个命令读取前一个命令的输出。这个连接是在由command1指定的任何重定向之前执行的。

​	如果使用`|&`，除了将command1的标准输出连接到command2的标准输入之外，还将command1的标准错误连接到command2的标准输入；它相当于`2>&1 |`。将标准错误隐式重定向到标准输出是在由command1指定的任何重定向之后执行的。

​	保留字`time`会导致在管道完成后打印计时统计信息。目前的统计信息包括命令执行消耗的经过时间（挂钟时间）以及用户和系统时间。-p选项会将输出格式更改为POSIX指定的格式。当shell处于POSIX模式时（参见[Bash POSIX Mode](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)），如果下一个标记以`-`开头，它不会将`time`识别为保留字。`TIMEFORMAT`变量可以设置为指定如何显示计时信息的格式字符串。有关可用格式的描述，请参见[Bash Variables](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)。将`time`用作保留字允许计时shell内置命令、shell函数和管道。外部的`time`命令无法轻松计时这些命令。

​	当shell处于POSIX模式（参见[Bash POSIX Mode](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)）时，`time`之后可以跟着一个换行符。在这种情况下，shell会显示shell及其子进程所消耗的总用户和系统时间。`TIMEFORMAT`变量可用于指定时间信息的格式。

​	如果管道不是异步执行的（参见[Lists of Commands](https://www.gnu.org/software/bash/manual/bash.html#Lists)），则shell会等待管道中的所有命令完成。

​	在创建管道的多个命令的每个命令中，将创建管道时，都会在自己的 *子shell* 中执行，这是一个单独的进程（参见[Command Execution Environment](https://www.gnu.org/software/bash/manual/bash.html#Command-Execution-Environment)）。如果使用`shopt`内置命令启用`lastpipe`选项（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），则当作业控制未激活时，管道的最后一个元素可能由shell进程运行。

​	管道的退出状态是管道中最后一个命令的退出状态，除非启用了`pipefail`选项（参见[The Set Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。如果启用了`pipefail`，则管道的返回状态是最后一个（最右边）退出状态为非零的命令的值，如果所有命令都成功退出，则为零。如果管道之前有保留字`!`，则退出状态是上述退出状态的逻辑否定。shell会等待管道中的所有命令终止后再返回一个值。



#### 3.2.4 命令列表



​	列表是由一个或多个以`；`、`&`、`&&`或`||`分隔的管道组成的序列，可选地以`；`、`&`或换行符终止。

​	在这些列表运算符中，`&&`和`||`具有相同的优先级，其次是`；`和`&`，它们具有相同的优先级。

​	列表中可以出现一个或多个换行符，用于分隔命令，等效于分号。

​	如果命令由控制运算符`&`终止，则shell在子shell中异步执行该命令。这称为在 *后台* 中执行该命令，这些命令称为 *异步* 命令。shell不会等待命令完成，并且返回状态为0（真）。当未激活作业控制（参见[Job Control](https://www.gnu.org/software/bash/manual/bash.html#Job-Control)）时，异步命令的标准输入在缺少任何显式重定向的情况下，会被重定向到`/dev/null`。

​	由分号分隔的命令按顺序依次执行；shell等待每个命令依次终止。返回状态是最后一个执行的命令的退出状态。

​	AND和OR列表是由控制运算符`&&`和`||`分隔的一个或多个管道序列。AND和OR列表使用左关联。

​	AND 列表的格式为

```
command1 && command2
```

仅当 command1 返回零（成功）退出状态时，才会执行 command2。

​	OR 列表的格式为

```
command1 || command2
```

​	仅当 command1 返回非零退出状态时，才会执行 command2。

​	AND 和 OR 列表的返回状态是列表中最后一个执行的命令的退出状态。





#### 3.2.5 复合命令



​	复合命令是shell编程语言的构造。每个构造都以保留字或控制运算符开始，并以相应的保留字或运算符结束。与复合命令相关的任何重定向（参见[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）都适用于该复合命令中的所有命令，除非显式覆盖。

​	在大多数情况下，复合命令描述中的命令列表可以与其余命令由一个或多个换行符分隔，并且可以用换行符代替分号。

​	Bash提供了循环结构、条件命令和将命令分组并作为一个单元执行的机制。







#### 3.2.5.1 循环结构

​	Bash支持以下循环结构。

​	注意，在命令语法描述中，无论何处出现分号，都可以将其替换为一个或多个换行符。

- `until`

  `until`命令的语法为：`until test-commands; do consequent-commands; done`。只要test-commands的退出状态不为零（成功），就执行consequent-commands。返回状态是consequent-commands中执行的最后一个命令的退出状态，如果没有执行命令，则为零。

- `while`

  `while`命令的语法为：`while test-commands; do consequent-commands; done`。只要test-commands的退出状态为零，就执行consequent-commands。返回状态是consequent-commands中执行的最后一个命令的退出状态，如果没有执行命令，则为零。

- `for`

  `for`命令的语法为：`for name [ [in [words …] ] ; ] do commands; done`。扩展words（参见[Shell Expansions](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)），并为结果列表中的每个成员绑定name，对于结果列表中的每个成员，执行commands一次。如果没有出现`in words`，则`for`命令对每个已设置的位置参数执行commands，就好像指定了`in "$@"`一样（参见[Special Parameters](https://www.gnu.org/software/bash/manual/bash.html#Special-Parameters)）。返回状态是执行的最后一个命令的退出状态。如果扩展的words中没有项，则不执行任何命令，并且返回状态为零。也支持`for`命令的另一种形式：`for (( expr1 ; expr2 ; expr3 )) ; do commands ; done`。首先根据下面描述的规则计算算术表达式expr1（参见[Shell Arithmetic](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)）。然后重复计算算术表达式expr2，直到它计算为零。每次expr2计算为非零值时，都会执行commands，并计算算术表达式expr3。如果省略了任何表达式，则它的行为就像它计算为1一样。返回值是执行的最后一个命令在commands中的退出状态，如果任何表达式无效，则为false。

​	`break`和`continue`内置命令（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）可用于控制循环执行。





#### 3.2.5.2 条件结构



- `if`

  ```sh
  if test-commands; then
    consequent-commands;
  [elif more-test-commands; then
    more-consequents;]
  [else alternate-consequents;]
  fi
  ```
  
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

  `case`命令的语法为：

  ```sh
  case word in
      [ [(] pattern [| pattern]…) command-list ;;]…
  esac
  ```
  
  `case`命令将根据与word匹配的第一个模式有选择地执行相应的command-list。匹配是根据下面在[Pattern Matching](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)中描述的规则进行的。如果启用了`nocasematch` shell选项（请参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)中的`shopt`描述），则执行匹配时不考虑字母大小写。`|`用于分隔多个模式，`)`运算符终止模式列表。每个模式列表和相关联的命令列表被称为clause。每个clause必须用`;;`、`;&`或`;;&`终止。在尝试匹配之前，word经历波浪线扩展、参数扩展、命令替换、算术扩展和引号删除（参见[Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。每个模式经历波浪线扩展、参数扩展、命令替换、算术扩展、进程替换和引号删除。可以有任意数量的`case` clauses，每个以`;;`、`;&`或`;;&`终止。第一个匹配的模式确定要执行的command-list。通常使用`*`作为最后一个模式定义默认情况，因为该模式始终匹配。以下是使用`case`的一个示例，其中脚本可用于描述动物的一个有趣特征：

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
  
  如果使用了`;;`运算符，则在第一个模式匹配后不会尝试后续的匹配。将`;&`用于替换`;;`会导致执行继续到与下一个clause关联的command-list（如果有的话）。将`;;&`用于替换`;;`会导致shell在下一个clause中测试模式，并在成功匹配后执行任何相关联的command-list，继续执行case语句，就像未匹配模式列表一样。返回状态是零，如果没有模式匹配。否则，返回状态是执行的最后一个command-list的退出状态。
  
- `select`

  `select`结构允许轻松生成菜单。它的语法与`for`命令几乎相同：

  ```sh
  select name [in words …]; do commands; done
  ```
  
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

  根据下面描述的规则（参见[Shell 算术](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)），计算算术表达式。表达式会经历与双引号括起来的表达式相同的扩展，但是表达式中的双引号字符不会被特殊处理，而是被删除。如果表达式的值非零，则返回状态为0；否则返回状态为1。

- `[[…]]`

  ```sh
  [[ expression ]]
  ```
  
  根据条件表达式expression的评估结果返回0或1的状态。表达式由下面描述的原语组成（参见[Bash条件表达式](https://www.gnu.org/software/bash/manual/bash.html#Bash-Conditional-Expressions)）。`[[`和`]]`之间的单词不会进行词分割和文件名扩展。Shell会在这些单词上执行波浪号展开、参数和变量展开、算术展开、命令替换、进程替换和引号删除（如果这些单词被双引号括起来的话）。条件操作符如`-f`必须不带引号才能被识别为原语。当与`[[`一起使用时，`<`和`>`运算符按照当前区域设置进行按字典排序。当使用`==`和`!=`运算符时，右边的字符串被视为模式，并根据下面描述的规则进行匹配（就像启用了`extglob` shell选项一样）。`=`运算符与`==`完全相同。如果启用了`nocasematch` shell选项（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)中的描述），则匹配时不考虑字母字符的大小写。如果字符串匹配（`==`）或不匹配（`!=`）模式，则返回值为0；否则返回值为1。如果你在模式的任意部分上使用了任何一种Shell的引用机制来引用，被引用的部分将被按字面意义匹配。这意味着引用部分中的每个字符都与其自身匹配，而不具有任何特殊的模式匹配意义。另外，还有一个附加的二进制运算符`=~`，其优先级与`==`和`!=`相同。当使用`=~`时，右边的字符串被视为POSIX扩展正则表达式模式，并相应地进行匹配（通常使用POSIX `regcomp` 和 `regexec` 接口来描述 *regex*(3)）。如果字符串匹配模式，则返回值为0；如果不匹配，则返回值为1。如果正则表达式在语法上不正确，则条件表达式返回2。如果启用了`nocasematch` shell选项（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)中的描述），则匹配时不考虑字母字符的大小写。你可以引用模式的任意部分，以强制匹配引用部分的字面意义，而不是作为正则表达式进行匹配（参见上文）。如果模式存储在Shell变量中，引用变量扩展会强制整个模式被按字面意义匹配。模式将匹配字符串中的任何部分。如果要强制模式匹配整个字符串，请使用`^`和`$`正则表达式运算符锚定模式。例如，下面的模式将匹配一个字符串（存储在Shell变量`line`中），如果该值中有任意数量（包括零个）属于`space`字符类的字符的序列，紧接着零个或一个`a`，然后是一个`b`：
  
  ```sh
  [[ $line =~ [[:space:]]*(a)?b ]]
  ```
  
  这意味着像`aab`、` aaaaaab`、`xaby`和` ab`这样的`line`的值都会匹配，包括在其值中包含`b`的行。如果要匹配正则表达式语法中的特殊字符（`^$|[]()\.*+?`），必须对其进行引用以去除其特殊含义。这意味着在模式`xxx.txt`中，`.`匹配字符串中的任意字符（其通常的正则表达式含义），但在模式`"xxx.txt"`中，它只能匹配字面的`.`。同样，如果要在模式中包含一个对正则表达式语法有特殊含义的字符，必须确保它没有被引用。例如，如果要在字符串的开头或结尾锚定模式，不能使用任何形式的Shell引用对`^`或`$`字符进行引用。如果要在行的开头匹配`initial string`，可以使用以下代码：
  
  ```sh
  [[ $line =~ ^"initial string" ]]
  ```
  
  but this will not:
  
  但是以下代码不行：
  
  ```sh
  [[ $line =~ "^initial string" ]]
  ```
  
  因为在第二个示例中，`^`被引用并且失去了其通常的特殊含义。有时候在不使用引号的情况下正确指定正则表达式是困难的，或者在注意Shell引用和引号删除的同时跟踪正则表达式使用的引号是困难的。将正则表达式存储在Shell变量中通常是避免引号问题的有用方式。例如，以下代码等效于上面使用的模式：
  
  ```sh
  pattern='[[:space:]]*(a)?b'
  [[ $line =~ $pattern ]]
  ```
  
  Shell程序员应特别注意反斜杠，因为反斜杠同时被Shell和正则表达式用于去除其后字符的特殊含义。这意味着在Shell的单词展开完成后（参见[Shell扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)），原本没有引用的模式部分中的任何剩余反斜杠都会去除模式字符的特殊含义。如果模式的任何部分被引用，Shell会尽力确保正则表达式将那些剩余的反斜杠视为字面值，如果它们出现在引用的部分中。以下两组命令*不*等效：
  
  ```sh
  pattern='\.'
  
  [[ . =~ $pattern ]]
  [[ . =~ \. ]]
  
  [[ . =~ "$pattern" ]]
  [[ . =~ '\.' ]]
  ```
  
  前两个匹配将成功，但后两个不会，因为在后两个中，反斜杠将成为要匹配的模式的一部分。在前两个示例中，传递给正则表达式解析器的模式是`\.`。反斜杠去除了`.`的特殊含义，因此匹配字面的`.`。在后两个示例中，传递给正则表达式解析器的模式将反斜杠进行了引用（例如，`\\\.`），这不会匹配字符串，因为它不包含反斜杠。如果第一个示例中的字符串不是`.`，而是其他字符，比如`a`，那么模式将不会匹配，因为模式中引用的`.`失去了其匹配任意单个字符的特殊含义。正则表达式中的方括号表达式也可能导致错误，因为在方括号之间通常具有特殊含义的字符在正则表达式中失去了其特殊含义。然而，你可以使用方括号表达式匹配特殊的模式字符而无需对其进行引用，因此它们有时用于此目的。虽然这可能看起来是一种奇怪的写法，但以下模式将在字符串中匹配一个`.`：
  
  ```sh
  [[ . =~ [.] ]]
  ```
  
  Shell在将模式传递给正则表达式函数之前执行任何单词展开，因此可以假设Shell的引用优先于正则表达式的引用。如上所述，正则表达式解析器将根据自己的规则解释Shell展开后模式中的任何未引用的反斜杠。这样做的目的是尽量避免让Shell程序员对事物进行两次引用，因此Shell引用应足以引用需要的特殊模式字符。数组变量`BASH_REMATCH`记录了与模式匹配的字符串的哪些部分。索引为0的`BASH_REMATCH`元素包含与整个正则表达式匹配的部分。正则表达式中的带括号的子表达式匹配的子字符串保存在剩余的`BASH_REMATCH`索引中。索引为n的`BASH_REMATCH`元素是与第n个带括号的子表达式匹配的部分。Bash将`BASH_REMATCH`设置为全局作用域；将其声明为局部变量将导致意外结果。可以使用以下运算符将表达式组合起来，按优先级递减的顺序列出：`( expression )`返回expression的值。这可用于覆盖运算符的正常优先级。`! expression`如果expression为假，则返回真。`expression1 && expression2`如果expression1和expression2都为真，则返回真。`expression1 || expression2`如果expression1或expression2为真，则返回真。如果expression1的值足以确定整个条件表达式的返回值，则不评估expression2的值。





#### 3.2.5.3 命令分组



​	Bash提供了两种将一系列命令分组执行的方式。当命令分组时，可以将重定向应用于整个命令列表。例如，所有命令列表中的命令的输出可以重定向到一个单一的流。

- `()`

  ```sh
  ( list )
  ```

  在圆括号之间放置一系列命令会强制Shell创建一个子shell（参见[命令执行环境](https://www.gnu.org/software/bash/manual/bash.html#Command-Execution-Environment)），并在该子shell环境中执行列表中的每个命令。由于列表在子shell中执行，变量赋值在子shell完成后不会保持有效。

- `{}`

  ```sh
  { list; }
  ```
  
  在花括号之间放置一系列命令会导致列表在当前Shell上下文中执行。不会创建子shell。列表之后的分号（或换行符）是必需的。

​	除了创建子shell之外，这两种结构由于历史原因存在微妙的差别。花括号是保留字，因此必须用`空格`或其他Shell元字符与列表分开。圆括号是运算符，即使它们与列表之间没有空格分开，Shell也会将它们识别为单独的标记。

​	这两种结构的退出状态是列表的退出状态。



#### 3.2.6 协程 Coprocesses



​	`coprocess`是一个以`coproc`保留字开头的Shell命令。协程在一个子shell中异步执行，就像使用`&`控制操作符终止命令一样，并在执行的Shell和协程之间建立了一个双向管道。

​	协程的语法如下：

```
coproc [NAME] command [redirections]
```

​	这创建了一个名为NAME的协程。command可以是一个简单命令（参见[简单命令](https://www.gnu.org/software/bash/manual/bash.html#Simple-Commands)）或一个复合命令（参见[复合命令](https://www.gnu.org/software/bash/manual/bash.html#Compound-Commands)）。NAME是一个Shell变量名。如果未提供NAME，则默认名称为`COPROC`。

​	建议使用以下形式来创建协程：

```
coproc NAME { command; }
```

​	这创建了一个名为NAME的协程。command可以是一个简单命令（参见[简单命令](https://www.gnu.org/software/bash/manual/bash.html#Simple-Commands)）或一个复合命令（参见[复合命令](https://www.gnu.org/software/bash/manual/bash.html#Compound-Commands)）。NAME是一个Shell变量名。如果未提供NAME，则默认名称为`COPROC`。

​	还有其他形式的协程：

```
coproc NAME compound-command
coproc compound-command
coproc simple-command
```

​	如果command是一个复合命令，NAME是可选的。`coproc`后面的单词决定该单词是否被解释为变量名：如果它不是引入复合命令的保留字，则它将被解释为NAME。如果command是一个简单命令，则不允许使用NAME；这是为了避免NAME与简单命令的第一个单词之间的混淆。

​	当执行协程时，Shell在执行Shell的上下文中创建一个名为NAME的数组变量（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）。command的标准输出通过管道连接到执行Shell中的一个文件描述符，并将该文件描述符分配给NAME[0]。command的标准输入通过管道连接到执行Shell中的一个文件描述符，并将该文件描述符分配给NAME[1]。这个管道在命令指定的任何重定向之前建立（参见[重定向](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）。文件描述符可以使用标准的单词展开作为Shell命令和重定向的参数。除了用于执行command和处理替换的文件描述符之外，文件描述符在子shell中不可用。

​	执行协程的Shell生成的进程ID可作为变量`NAME_PID`的值使用。`wait`内置命令可用于等待协程终止。

​	由于协程被创建为异步命令，所以`coproc`命令总是返回成功。协程的返回状态是command的退出状态。





#### 3.2.7 GNU Parallel

​	有一些不内置于Bash的方法可以并行运行命令。GNU Parallel是一个可以实现这一目的的工具。

​	GNU Parallel正如其名，可以用于构建和并行运行命令。您可以使用不同的参数运行相同的命令，无论是文件名、用户名、主机名还是从文件中读取的行。GNU Parallel为许多常见操作提供了简写引用（输入行、输入行的各种部分、指定输入源的不同方式等）。Parallel可以替代`xargs`，或者将命令从其输入源传递给多个不同的Bash实例。

​	有关详细信息，请参阅GNU Parallel文档，该文档可在https://www.gnu.org/software/parallel/parallel_tutorial.html上获得。





### 3.3 Shell 函数



​	Shell函数是一种将命令分组以便以后使用单个名称执行的方法。它们的执行方式与“普通”命令相同。当Shell函数的名称被用作简单命令名称时，与该函数名称关联的命令列表将被执行。Shell函数在当前Shell上下文中执行；不会创建新的进程来解释它们。

​	使用以下语法声明函数：

```
fname () compound-command [ redirections ]
```

或

```
function fname [()] compound-command [ redirections ]
```

​	这定义了一个名为fname的Shell函数。`function`保留字是可选的。如果提供了`function`保留字，则括号是可选的。函数的*主体*是复合命令compound-command（参见[复合命令](https://www.gnu.org/software/bash/manual/bash.html#Compound-Commands)）。该命令通常是在{和}之间的列表，但可以是上面列出的任何复合命令。如果使用了`function`保留字，但未提供括号，则建议使用花括号。只有在指定了简单命令的名称时，才能在POSIX模式下执行Shell时使用`function`保留字。在默认模式下，函数名称可以是任何未引用的Shell单词，且不包含`$`。在Shell函数执行时，与Shell函数相关的任何重定向（参见[重定向](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）在执行函数时执行。可以使用`unset`内置命令的`-f`选项来删除函数定义（参见[Bourne Shell内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。

​	函数定义的退出状态为零，除非发生语法错误或已存在具有相同名称的只读函数。执行函数时，函数的退出状态是主体中最后一个命令的退出状态。

​	请注意，出于历史原因，最常见的用法是将花括号与函数的主体分开，通过`空格`或换行符。这是因为花括号是保留字，只有在它们与命令列表之间由空格或其他Shell元字符分隔时，才会被识别为保留字。此外，当使用花括号时，列表必须以分号、`&`或换行符结尾。

​	当执行函数时，函数的参数在其执行过程中成为位置参数（参见[位置参数](https://www.gnu.org/software/bash/manual/bash.html#Positional-Parameters)）。特殊参数`#`展开为位置参数的数量，并根据变化进行更新。特殊参数`0`保持不变。在函数执行期间，`FUNCNAME`变量的第一个元素被设置为函数的名称。

​	除了以下几点之外，函数和其调用者之间的Shell执行环境的其他方面是相同的：除非函数已被赋予使用`declare`内置命令设置`trace`属性或者使用`set`内置命令启用了`-o functrace`选项（在这种情况下，所有函数都继承`DEBUG`和`RETURN`陷阱），否则`DEBUG`和`RETURN`陷阱不会被继承，并且只有启用了`-o errtrace` Shell选项才会继承`ERR`陷阱。有关`trap`内置命令的说明，请参见[Bourne Shell内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)。

​	如果将`FUNCNEST`变量设置为大于0的数字值，则定义了最大函数嵌套级别。超过限制的函数调用将导致整个命令中止。

​	如果在函数中执行了内置命令`return`，则函数执行完成后，执行将恢复到函数调用之后的下一个命令。在恢复执行之前，将执行与`RETURN`陷阱相关联的任何命令。函数完成后，位置参数和特殊参数`#`的值将恢复为函数执行之前的值。如果`return`的参数是数字，则为函数的返回状态；否则，函数的返回状态是`return`之前执行的最后一条命令的退出状态。

​	函数内部的变量可以使用`local`内置命令（*局部变量*）进行声明。通常情况下，变量和它们的值在函数和其调用者之间共享。这些变量只对函数和它调用的命令可见。当Shell函数调用其他函数时，这一点尤为重要。

​	在以下描述中，*当前作用域*是当前正在执行的函数。之前的作用域包括该函数的调用者，以此类推，直到“全局”作用域，其中Shell不执行任何Shell函数。因此，当前局部作用域中的局部变量是在当前执行的函数中使用`local`或`declare`内置命令声明的变量。

​	局部变量“遮蔽”在之前作用域中声明的具有相同名称的变量。例如，函数中声明的局部变量会隐藏具有相同名称的全局变量：引用和赋值引用局部变量，不会修改全局变量。函数返回后，全局变量再次可见。

​	Shell使用*动态作用域*来控制函数内变量的可见性。对于动态作用域，可见变量及其值是由导致执行到达当前函数的函数调用序列决定的。函数所见的变量的值取决于其在调用者内的值，无论该调用者是"全局"作用域还是另一个Shell函数。这也是局部变量声明所"遮蔽"的值，以及在函数返回时恢复的值。

​	例如，如果在函数`func1`中将变量`var`声明为局部变量，并且`func1`调用另一个函数`func2`，则从`func2`内部对`var`的引用将解析为来自`func1`的局部变量`var`，遮蔽了任何名为`var`的全局变量。

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

​	`unset`内置命令也使用相同的动态作用域：如果一个变量是当前作用域的局部变量，`unset`将对其进行取消设置；否则，取消设置将引用在任何调用作用域中找到的变量，如上述所述。如果取消设置操作作用于先前作用域中的变量，则任何被遮蔽的具有相同名称的变量实例将变为可见（请参阅下面的`localvar_unset`Shell选项如何更改此行为）。

​	使用`declare`（`typeset`）内置命令的`-f`选项，可以列出函数的名称和定义（参见[Bash内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。`declare`或`typeset`的`-F`选项将仅列出函数名称（以及可选的源文件和行号，如果启用了`extdebug` Shell选项）。函数可以被导出，以便子Shell进程（在执行单独的Shell调用时创建的进程）自动将其定义为`export`内置命令的`-f`选项（参见[Bourne Shell内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。

​	函数可以是递归的。可以使用`FUNCNEST`变量来限制函数调用堆栈的深度和函数调用的数量。默认情况下，递归调用的数量没有限制。





### 3.4 Shell 参数



​	Shell参数是存储值的实体。它可以是`名称`、数字或下面列出的特殊字符之一。*变量*是由`名称`表示的参数。变量具有一个`值`和零个或多个`属性`。使用`declare`内置命令分配属性给变量（请参阅[Bash内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)中对`declare`内置命令的描述）。

​	如果参数已经被赋值，则设置了该参数。空字符串是一个有效的值。一旦设置了变量，只能使用`unset`内置命令将其取消设置。

​	一个变量可以通过以下形式的语句进行赋值：

```
name=[value]
```

​	如果没有给出value，则该变量被赋予空字符串。所有值都要经过`~`扩展、参数和变量扩展、命令替换、算术扩展和引号移除（参见[Shell参数扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。如果变量设置了`整数`属性，则value将被解释为算术表达式，即使没有使用`$((...))`扩展（参见[算术扩展](https://www.gnu.org/software/bash/manual/bash.html#Arithmetic-Expansion)）。不会执行字拆分和文件名扩展。赋值语句也可以作为`alias`、`declare`、`typeset`、`export`、`readonly`和`local`内置命令（*声明*命令）的参数出现。在POSIX模式下（参见[Bash POSIX模式](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)），这些内置命令可以在一个或多个`command`内置命令实例之后出现，并保留这些赋值语句的属性。

​	在将值分配给Shell变量或数组索引（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）的赋值语句上下文中，可以使用`+=`运算符来追加到或添加到变量的先前值。这包括作为接受赋值语句的参数（声明命令）的内置命令的参数，例如`declare`。如果为设置了`整数`属性的变量应用`+=`运算符，则value将作为算术表达式进行求值，并添加到变量的当前值中，该值也将进行求值。当将`+=`运用于使用复合赋值（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）的数组变量时，变量的值不会被取消设置（与使用`=`时相反），新值将从数组的最大索引加1处开始添加（对于索引数组），或作为附加的键-值对添加到关联数组中。当应用于字符串值的变量时，value会进行扩展，并附加到变量的值上。

​	可以使用`declare`或`typeset`的`-n`选项将变量分配为具有`nameref`属性的内置命令`declare`或`local`（请参阅[Bash内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）中，以创建*名字引用*或对其他变量的引用。这允许间接操作变量。无论何时引用、分配、取消设置或更改属性除使用或更改`nameref`属性本身之外的nameref变量，实际上执行的操作是在nameref变量的值指定的变量上执行的。名字引用通常在Shell函数内部用于引用作为其第一个参数传递给函数的变量名。例如，如果一个变量名作为第一个参数传递给Shell函数，运行以下命令：

```
declare -n ref=$1
```

函数内部创建一个名字引用变量`ref`，其值是作为第一个参数传递的变量名。对`ref`的引用、赋值和属性更改被视为对通过`$1`传递的变量名所引用的变量的引用、赋值和属性更改。

如果`for`循环中的控制变量具有`nameref`属性，则单词列表可以是一系列Shell变量，并且在执行循环时，将为列表中的每个单词依次建立一个名称引用。数组变量不能被赋予`nameref`属性。然而，名字引用变量可以引用数组变量和带下标的数组变量。可以使用`unset`内置命令的`-n`选项来取消名字引用（请参见[Bourne Shell内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。否则，如果使用nameref变量的名称作为参数执行`unset`，则将取消设置由nameref变量引用的变量。




#### 3.4.1 位置参数



​	*位置参数* 是由一个或多个数字表示的参数，除了单个数字`0`之外。当Shell被调用时，位置参数从Shell的参数中分配，并可以使用`set`内置命令进行重新分配。位置参数`N`可以被引用为`${N}`，或者当`N`只包含一个数字时，可以简写为`$N`。位置参数不能通过赋值语句进行赋值。`set`和`shift`内置命令用于设置和取消设置它们（参见[Shell内置命令](https://www.gnu.org/software/bash/manual/bash.html#Shell-Builtin-Commands)）。在执行Shell函数时，位置参数会临时替换（参见[Shell函数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Functions)）。

​	当扩展由多个数字组成的位置参数时，它必须用花括号括起来。





#### 3.4.2 特殊参数



​	Shell对一些参数进行特殊处理。这些参数只能被引用，不允许对它们进行赋值。

- `*`

  ($*) 扩展为从1开始的位置参数。当扩展不在双引号内时，每个位置参数都会扩展为一个单独的单词。在执行扩展的上下文中，这些单词会进一步进行字拆分和文件名扩展。当扩展在双引号内时，它会扩展为一个单词，其中每个参数的值由`IFS`特殊变量的第一个字符分隔。也就是说，`"$*"`等效于`"$1c$2c…"`，其中c是`IFS`变量值的第一个字符。如果`IFS`未设置，则参数以空格分隔。如果`IFS`为空，则参数连接在一起，没有分隔符。

- `@`

  ($@) 扩展为从1开始的位置参数。在进行字拆分的上下文中，这将把每个位置参数扩展为一个单独的单词；如果不在双引号内，这些单词会进行字拆分。在不进行字拆分的上下文中，它会扩展为一个单词，其中每个位置参数由空格分隔。当扩展在双引号内，并进行字拆分时，每个参数都会扩展为一个单独的单词。也就是说，`"$@"`等效于`"$1" "$2" …`。如果双引号扩展发生在一个单词内部，则第一个参数的扩展与原始单词的起始部分连接在一起，最后一个参数的扩展与原始单词的最后部分连接在一起。当没有位置参数时，`"$@"`和`$@`都扩展为空（即它们被移除）。

- `#`

  ($#) 扩展为十进制中的位置参数数量。

- `?`

  ($?) 扩展为最近执行的前台管道的退出状态。

- `-`

  ($-,一个连字符) 扩展为在调用时指定的当前选项标志，由`set`内置命令指定，或由Shell本身设置（如-i选项）。

- `$`

  ($$) 扩展为Shell的进程ID。在子Shell中，它扩展为调用Shell的进程ID，而不是子Shell的进程ID。

- `!`

  ($!) 扩展为最近放入后台的作业的进程ID，无论是作为异步命令还是使用`bg`内置命令执行的作业（参见[作业控制内置命令](https://www.gnu.org/software/bash/manual/bash.html#Job-Control-Builtins)）。

- `0`

  ($0) 扩展为Shell或Shell脚本的名称。这在Shell初始化时设置。如果使用命令文件启动Bash（参见[Shell脚本](https://www.gnu.org/software/bash/manual/bash.html#Shell-Scripts)），则`$0`设置为该文件的名称。如果使用-c选项启动Bash（参见[调用Bash](https://www.gnu.org/software/bash/manual/bash.html#Invoking-Bash)），那么如果存在的话，`$0`设置为执行字符串后的第一个参数。否则，它设置为用于调用Bash的文件名，由第零个参数给出。





### 3.5 Shell 扩展



​	扩展是在命令行被分割为`token`之后进行的。执行七种类型的扩展：

- 花括号扩展
- 波浪号扩展
- 参数和变量扩展
- 命令替换
- 算术扩展
- 字符串拆分
- 文件名扩展

​	扩展的顺序是：花括号扩展；波浪号扩展、参数和变量扩展、算术扩展和命令替换（按从左到右的顺序进行）；字符串拆分；文件名扩展。

​	在可以支持的系统上，还有一种额外的扩展可用：*进程替换*。这在进行波浪号、参数、变量和算术扩展以及命令替换时同时进行。

​	这些扩展完成后，会移除原始单词中的引号字符，除非它们已被引用（*引号移除*）。

​	只有花括号扩展、字符串拆分和文件名扩展可以增加扩展的单词数量；其他扩展将单个单词扩展为单个单词。唯一的例外是`"$@"`和`$*`的扩展（参见[特殊参数](https://www.gnu.org/software/bash/manual/bash.html#Special-Parameters)），以及`"${name[@]}"`和`${name[*]}`的扩展（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）。

​	在所有扩展完成后，会执行`引号移除`（参见[引号移除](https://www.gnu.org/software/bash/manual/bash.html#Quote-Removal)）操作。



#### 3.5.1 花括号扩展



​	花括号扩展是一种生成任意字符串的机制。该机制类似于*文件名扩展*（参见[文件名扩展](https://www.gnu.org/software/bash/manual/bash.html#Filename-Expansion)），但生成的文件名可以不存在。用于进行花括号扩展的模式采用可选的前导部分，后面是逗号分隔的字符串序列或者位于花括号之间的序列表达式，然后是可选的尾部。前导部分被添加到花括号内的每个字符串之前，然后尾部被追加到每个结果字符串之后，从左到右进行扩展。

​	花括号扩展可以嵌套。每个扩展字符串的结果不排序，保持从左到右的顺序。例如，

```
bash$ echo a{d,c,b}e
ade ace abe
```

​	序列表达式采用`{x..y[..incr]}`的形式，其中x和y可以是整数或字母，incr是可选的增量，是一个整数。当提供整数时，表达式会扩展为x和y之间的每个数字，包括x和y。提供的整数可以以`0`作为前缀，以强制每个项具有相同的宽度。当x或y以零开头时，Shell会尝试强制所有生成的项包含相同数量的数字，必要时用零填充。当提供字母时，表达式会以默认的C语言环境在x和y之间按字典顺序扩展为每个字符。注意x和y必须是相同类型的（整数或字母）。如果提供了增量，它将用作每个项之间的差异。默认的增量是1或-1，视情况而定。

​	花括号扩展是在任何其他扩展之前执行的，其他扩展中的特殊字符在结果中保留。它是严格文本处理的。Bash不对扩展的上下文或花括号之间的文本进行任何语法解释。

​	正确形式的花括号扩展必须包含未引用的开放和闭合花括号，并且至少包含一个未引用的逗号或有效的序列表达式。任何格式不正确的花括号扩展将保持不变。

​	通过使用反斜杠对`{`或`,`进行引用，可以防止其被视为花括号表达式的一部分。为避免与参数扩展冲突，字符串`${`不被视为适用于花括号扩展，并且会阻止花括号扩展直到闭合的`}`。

​	当字符串的公共前缀比上面的示例中更长时，通常会使用此结构作为简写：

```
mkdir /usr/local/src/bash/{old,new,dist,bugs}
```

或者

```
chown root /usr/{ucb/{ex,edit},lib/{ex?.?*,how_ex}}
```





#### 3.5.2 波浪号扩展



​	如果一个单词以未引用的波浪号字符（`~`）开头，则直到第一个未引用的斜杠（或所有字符，如果没有未引用的斜杠）的所有字符都被视为*波浪号前缀*。如果波浪号前缀中的所有字符都没有被引用，那么波浪号后面的字符被视为可能的*登录名*。如果此登录名为空字符串，则波浪号将被替换为`HOME`的值。如果`HOME`未设置，则替换为执行Shell的用户的主目录。否则，波浪号前缀将被替换为与指定登录名关联的主目录。

​	如果波浪号前缀是`~+`，则将其替换为Shell变量`PWD`的值。如果波浪号前缀是`~-`，并且如果已设置，将其替换为Shell变量`OLDPWD`的值。

​	如果波浪号后面的字符组成数字N，可选地以`+`或`-`为前缀，那么波浪号前缀将被替换为与目录堆栈中的相应元素相对应的元素，就像通过将波浪号前缀中的字符作为参数调用`dirs`内置命令来显示的那样（参见[目录堆栈](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)）。如果没有波浪号的前缀，那么假定它是一个不带有前导`+`或`-`的数字，假定`+`是前缀。

​	如果登录名无效，或波浪号扩展失败，则保持单词不变。

​	每个变量赋值在`:`或第一个`=`后面立即检查未引用的波浪号前缀。在这些情况下，也会执行波浪号扩展。因此，可以在`PATH`、`MAILPATH`和`CDPATH`的赋值中使用带有波浪号的文件名，Shell将分配扩展后的值。

​	下表显示了Bash如何处理未引用的波浪号前缀：

- `~`

  `$HOME`的值

- `~/foo`

  `~fred/foo`

  用户`fred`的主目录的子目录`foo`

- `~+/foo`

  $PWD/foo

- `~-/foo`

  `${OLDPWD-'~-'}/foo`

- `~N`

  `dirs +N`显示的字符串

- `~+N`

  `dirs +N`显示的字符串

- `~-N`

  `dirs -N`显示的字符串

​	当作为简单命令的参数出现时，Bash还会对满足变量赋值条件（参见[Shell参数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)）的单词执行波浪号扩展。在POSIX模式下，除了上述列出的声明命令外，Bash不会执行此操作。



#### 3.5.3 Shell参数扩展



​	`$`字符引入参数扩展、命令替换或算术扩展。要扩展的参数名称或符号可以用花括号括起来，花括号是可选的，但用于保护要扩展的变量，使其不会被其后的字符解释为名称的一部分。

​	当使用花括号时，匹配的结束花括号是第一个未被反斜杠转义或位于引号字符串内的`}`，并且不在嵌套的算术扩展、命令替换或参数扩展中。

​	参数扩展的基本形式是`${parameter}`。将替换参数的值。参数是如上所述的Shell参数（参见[Shell参数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)）或数组引用（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）。当参数是一个带有多个数字的位置参数时，需要使用花括号，或者当参数后面跟着的字符不被解释为其名称的一部分时。

​	如果参数的第一个字符是感叹号（!），并且参数不是`nameref`，它引入了间接扩展的一层。Bash使用扩展参数的其余部分形成的值作为新参数进行扩展；然后对该值进行扩展，并在扩展的其余部分中使用该值，而不是原始参数的扩展。这被称为`间接扩展`。该值会经过波浪号扩展、参数扩展、命令替换和算术扩展。如果参数是`nameref`，它将扩展为由参数引用的变量的名称，而不执行完全的间接扩展。对于`${!prefix*}`和`${!name[@]}`的扩展，这些是例外情况。感叹号必须紧跟在左花括号之后，以引入间接扩展。

​	在下面的每种情况中，单词都会经过波浪号扩展、参数扩展、命令替换和算术扩展：

​	在不进行子字符串扩展时，使用下面描述的形式（例如，`:-`），Bash会检查未设置或为空的参数。省略冒号只会测试未设置的参数。换句话说，如果包括冒号，运算符会同时测试参数的存在性和其值不为空；如果省略冒号，则运算符只测试存在性。

- `${parameter:-word}`

  在不进行子字符串扩展时，使用下面描述的形式（例如，`:-`），Bash会检查未设置或为空的参数。省略冒号只会测试未设置的参数。换句话说，如果包括冒号，运算符会同时测试参数的存在性和其值不为空；如果省略冒号，则运算符只测试存在性。

  ```sh
$ v=123
  $ echo ${v-unset}
  123
  ```
  
  

- `${parameter:=word}`

  如果参数未设置或为空，则将`word`的扩展赋值给参数。然后替换为参数的值。在这种方式下，位置参数和特殊参数不能以这种方式赋值。

  ```sh
  $ var=
  $ : ${var:=DEFAULT}
  $ echo $var
  DEFAULT
  ```
  
- `${parameter:?word}`

  如果参数为空或未设置，则将`word`的扩展（或者如果未提供`word`，则是相关的消息）写入标准错误流，并且如果Shell不是交互式的，则退出。否则，替换为参数的值。

  ```sh
$ var=
  $ : ${var:?var is unset or null}
  bash: var: var is unset or null
  ```
  
  

- `${parameter:+word}`

  如果参数为空或未设置，则不进行替换；否则替换为`word`的扩展。

  ```sh
$ var=123
  $ echo ${var:+var is set and not null}
  var is set and not null
  ```
  
  

- `${parameter:offset}`

- `${parameter:offset:length}`

  这被称为子字符串扩展。它会根据偏移量从参数的值中的指定字符开始，扩展为长度不超过`length`个字符的子字符串。如果参数是`@`或`*`，用`@`或`*`作为索引的数组或关联数组名称，则结果与下面描述的不同。如果省略了长度，则它会扩展为从偏移量指定的字符开始，延伸到值的结尾的子字符串。长度和偏移量是算术表达式（参见[Shell算术](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)）。如果偏移量的计算结果为负数，则该值从参数值的末尾起使用作为偏移量。如果长度的计算结果为负数，则它被解释为从参数值的末尾起的字符偏移量，而不是字符的数量，并且扩展是偏移量和该结果之间的字符。注意，负偏移量必须与冒号之间至少有一个空格分开，以避免与`:-`扩展混淆。以下是一些示例，说明了如何在参数和索引数组上进行子字符串扩展：

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
  
  如果参数是关联数组名称，则子字符串扩展的结果未定义。子字符串的索引从零开始，除非使用位置参数，此时索引默认从1开始。如果偏移量为0，并且使用了位置参数，则列表中会添加`$0`。
  
- `${!prefix*}`

- `${!prefix@}`

  扩展为以`prefix`开头的变量名称，由`IFS`特殊变量的第一个字符分隔。当使用`@`并且扩展出现在双引号内时，每个变量名称会扩展为一个单独的单词。

- `${!name[@]}`

- `${!name[*]}`

  如果`name`是数组变量，则扩展为分配给`name`的数组索引（键）的列表。如果`name`不是数组，则如果`name`被设置，扩展为0；否则为空。当使用`@`并且扩展出现在双引号内时，每个键会扩展为一个单独的单词。

- `${#parameter}`

  替换为参数的扩展值的字符长度。如果参数是`*`或`@`，则替换的值是位置参数的数量。如果参数是由`*`或`@`作为索引的数组名称，则替换的值是数组中的元素数量。如果参数是由负数作为索引的索引数组名称，则该数字相对于参数的最大索引加一进行计算，因此负索引从数组的末尾开始计数，-1索引引用最后一个元素。

- `${parameter#word}`

- `${parameter##word}`

  `word`被扩展为模式，并根据下面描述的规则进行匹配（参见[模式匹配](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)）。如果模式与参数的扩展值的开头匹配，则扩展的结果是参数的扩展值中最短匹配模式（`#`情况）或最长匹配模式（`##`情况）被删除。如果参数是`@`或`*`，则模式删除操作将逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则模式删除操作将逐个应用于数组的每个成员，并且扩展是结果列表。

- `${parameter%word}`

- `${parameter%%word}`

  `word`被扩展为模式，并根据下面描述的规则进行匹配（参见[模式匹配](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)）。如果模式与参数的扩展值的尾部匹配，则扩展的结果是参数的值中最短匹配模式（`%`情况）或最长匹配模式（`%%`情况）被删除。如果参数是`@`或`*`，则模式删除操作将逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则模式删除操作将逐个应用于数组的每个成员，并且扩展是结果列表。

- `${parameter/pattern/string}`

- `${parameter//pattern/string}`

- `${parameter/#pattern/string}`

- `${parameter/%pattern/string}`

  `pattern`被扩展为模式，就像文件名扩展一样。参数被扩展，并且匹配模式与参数的值的最长匹配部分被替换为`string`。`string`会经过波浪号扩展、参数和变量扩展、命令和进程替换以及引号移除。匹配按照下面描述的规则进行（参见[模式匹配](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)）。在上述的第一种形式中，只会替换第一次匹配。如果有两个斜杠分隔参数和模式（第二种形式），则所有模式的匹配都会替换为`string`。如果模式以`#`开头（第三种形式），则它必须匹配参数的扩展值的开头。如果模式以`%`开头（第四种形式），则它必须匹配参数的扩展值的尾部。如果`string`的扩展结果为空，则删除模式的匹配。如果`string`为空，则删除模式的匹配，并且可以省略跟在模式后面的`/`。如果使用`shopt`启用了`patsub_replacement` shell选项，则`string`中的任何未引用的`&`都会被替换为模式的匹配部分。这旨在复制常见的`sed`习惯用法。引用`string`的任何部分都会阻止在引用部分的扩展中进行替换，包括存储在Shell变量中的替换字符串。反斜杠将转义`string`中的`&`；反斜杠将被删除，以允许替换字符串中包含一个字面的`&`。如果字符串中的`&`被引用，模式替换会在扩展`string`之后执行检查，因此用户应该确保正确引用了他们希望在替换中以字面形式保留的`&`，并确保他们希望被替换的任何`&`都未被引用。例如，

  ```sh
  var=abcdef
  rep='& '
  echo ${var/abc/& }
  echo "${var/abc/& }"
  echo ${var/abc/$rep}
  echo "${var/abc/$rep}"
  ```
  
  会显示四行“abc def”，而

  ```sh
  var=abcdef
  rep='& '
  echo ${var/abc/\& }
  echo "${var/abc/\& }"
  echo ${var/abc/"& "}
  echo ${var/abc/"$rep"}
  ```
  
  会显示四行“& def”。与模式删除运算符一样，双引号引起替换字符串时，引号中的字符扩展为一个单词，而包围整个参数替换的双引号则不会，因为扩展是在不考虑任何封闭双引号的上下文中执行的。由于反斜杠可以转义`&`，它也可以转义替换字符串中的反斜杠。这意味着`\\`将插入一个字面的反斜杠到替换中，所以这两个`echo`命令
  
  ```sh
  var=abcdef
  rep='\\&xyz'
  echo ${var/abc/\\&xyz}
  echo ${var/abc/$rep}
  ```
  
  都会输出`\abcxyzdef`。很少需要仅将`string`用双引号括起来。如果启用了`nocasematch` shell选项（参见[内建的shopt命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)的描述），则匹配将忽略字母字符的大小写。如果参数是`@`或`*`，则替换操作将逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则替换操作将逐个应用于数组的每个成员，并且扩展是结果列表。
  
- `${parameter^pattern}`

- `${parameter^^pattern}`

- `${parameter,pattern}`

- `${parameter,,pattern}`

  此扩展修改参数中的字母字符的大小写。`pattern`被扩展为模式，就像文件名扩展一样。参数的扩展值中的每个字符与`pattern`进行比较，如果匹配`pattern`，则更改其大小写。`^`操作符将匹配`pattern`的小写字母转换为大写；`,`操作符将匹配的大写字母转换为小写。`^^`和`,,`扩展会转换扩展值中每个匹配的字符；`^`和`,`扩展只匹配并转换扩展值中的第一个字符。如果省略`pattern`，它被视为`?`，与每个字符都匹配。如果参数是`@`或`*`，则大小写修改操作将逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则大小写修改操作将逐个应用于数组的每个成员，并且扩展是结果列表。

- `${parameter@operator}`

  扩展是参数值的转换或关于参数本身的信息，这取决于运算符的值。每个运算符都是一个单个字母：
  
  `U`：扩展为参数值的字符串，其中小写字母转换为大写。
  
  `u`：扩展为参数值的字符串，其中第一个字符如果是字母则转换为大写。
  
  `L`：扩展为参数值的字符串，其中大写字母转换为小写。
  
  `Q`：扩展为以可以重用作为输入的格式引用的参数值的字符串。
  
  `E`：扩展为参数值的字符串，其中反斜杠转义序列会像`$'...'`引用机制一样展开。
  
  `P`：扩展为扩展参数的值，好像它是一个提示字符串（参见[控制提示符](https://www.gnu.org/software/bash/manual/bash.html#Controlling-the-Prompt)）。
  
  `A`：扩展为一个字符串，形式为一个赋值语句或`declare`命令，如果评估，将重新创建具有其属性和值的参数。
  
  `K`：生成参数值的可能带引号的版本，除了以引号分隔的索引和关联数组的值以键-值对的形式打印（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）。
  
  `a`：扩展为由表示参数属性的标志值组成的字符串。
  
  `k`：像`K`转换一样，但会将索引和关联数组的键和值扩展为分隔的单词。
  
  如果参数是`@`或`*`，则操作会逐个应用于每个位置参数，并且扩展是结果列表。如果参数是使用`@`或`*`作为索引的数组变量，则操作会逐个应用于数组的每个成员，并且扩展是结果列表。
  
  扩展的结果受到单词分割和文件名扩展的影响，如下所述。





#### 3.5.4 命令替换 Command Substitution



​	命令替换允许命令的输出替换为命令本身。命令替换发生在命令被包围的情况下：

```
$(command)
```

或

```
`command`
```

​	Bash通过在子shell环境中执行命令并用命令的标准输出替换命令替换来执行扩展，删除任何尾随的换行符。嵌入的换行符不会被删除，但在分词过程中可能会被移除。命令替换`$(cat file)`可以被等效但更快的`$(< file)`替换。

​	当使用旧样式的反引号形式进行替换时，反斜杠保留其字面含义，除非后面跟着`$`、`\`或`\`。第一个没有前置反斜杠的反引号终止命令替换。使用`$(command)`形式时，圆括号内的所有字符都组成命令；没有特殊处理。

​	命令替换可以嵌套。当使用反引号形式时，通过反斜杠转义内部反引号来嵌套。

​	如果替换出现在双引号内，将不会对结果执行单词分割和文件名扩展。



#### 3.5.5 算术扩展 Arithmetic Expansion



​	算术扩展允许对算术表达式进行求值并替换结果。算术扩展的格式为：

```
$(( expression ))
```

​	表达式遵循与双引号内的表达式相同的扩展规则，但是表达式中的双引号字符不会特殊对待，并且会被删除。表达式中的所有标记都会经历参数和变量扩展、命令替换和引号删除。结果被视为要求值的算术表达式。算术扩展可以嵌套。

​	根据以下规则执行计算（参见[Shell算术](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)）。如果表达式无效，Bash会向标准错误输出打印一个指示失败的消息，并且不进行替换。



#### 3.5.6 进程替换 Process Substitution



​	进程替换允许使用文件名引用进程的输入或输出。它采用以下形式：

```
<(list)
```

或

```
>(list)
```

进程列表以异步方式运行，并且其输入或输出显示为文件名。该文件名作为扩展的结果作为参数传递给当前命令。如果使用`>(list)`形式，则写入文件将提供给list的输入。如果使用`<(list)`形式，则应该读取作为参数传递的文件以获取list的输出。请注意，`<`或`>`与左括号之间不能有空格，否则将将该结构解释为重定向。进程替换在支持命名管道（FIFO）或以/dev/fd方法命名打开文件的系统上受支持。

​	如果可用，进程替换将与参数和变量扩展、命令替换和算术扩展同时进行。





#### 3.5.7 单词分割 Word Splitting



​	Shell对未在双引号内发生的参数扩展、命令替换和算术扩展的结果进行单词分割。

​	Shell将`$IFS`的每个字符视为分隔符，并使用这些字符作为字段终止符将其他扩展的结果分割为单词。如果`IFS`未设置，或其值正好为`<space><tab><newline>`（默认值），则忽略前一扩展结果的开头和结尾处的`<space>`、`<tab>`和`<newline>`序列，并且不在开头或结尾处的`IFS`字符序列用于分隔单词。如果`IFS`的值不是默认值，则忽略单词开头和结尾处的空白字符（即`space`、`tab`和`newline`），只要空白字符位于`IFS`值（即`IFS`中的空白字符）中。不在开头或结尾的`IFS`空白字符与字段分隔符一起用于分隔字段。连续的`IFS`空白字符序列也被视为分隔符。如果`IFS`的值为空，则不进行单词分割。

​	显式的null 参数（`""`或`''`）会被保留并作为空字符串传递给命令。未加引号的隐式空参数（由没有值的参数展开而来）将被删除。如果没有值的参数在双引号内展开，将产生一个空参数，并作为空字符串保留并传递给命令。当引号引起的空参数出现在其展开结果非空的单词中时，空参数将被删除。也就是说，单词`-d''`在经历单词分割和空参数删除后变为`-d`。

​	注意，如果没有发生扩展，将不进行单词分割。



#### 3.5.8 文件名扩展



​	在单词分割之后，除非设置了`-f`选项（参见[内建的set命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)），Bash会对每个单词进行文件名扩展，查找其中是否包含`*`、`?`和`[`字符。如果其中一个字符出现且没有被引用，那么该单词被视为模式，并替换为与该模式匹配的按字母顺序排序的文件列表（参见[模式匹配](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)）。如果找不到匹配的文件名，并且shell选项`nullglob`被禁用，则保持该单词不变。如果设置了`nullglob`选项并且找不到匹配的文件名，则删除该单词。如果设置了`failglob` shell选项并且找不到匹配的文件名，则打印错误消息，并且不执行命令。如果启用了`nocaseglob` shell选项，将忽略字母字符的大小写进行匹配。

​	当使用文件名扩展的模式时，文件名的开头为`.`的字符或紧跟在斜杠后面的`.`字符必须显式匹配，除非设置了`dotglob`选项。为了匹配文件名`.`和`..`，模式必须以`.`开头（例如`.?`），即使设置了`dotglob`选项。如果启用了`globskipdots` shell选项，则文件名`.`和`..`永远不会匹配，即使模式以`.`开头。当不匹配文件名时，`.`字符不会被特殊处理。

​	在匹配文件名时，斜杠字符必须始终由模式中的斜杠显式匹配，但在其他匹配上下文中，它可以由特殊的模式字符进行匹配，如下所述（参见[模式匹配](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)）。

​	有关`shopt`的说明，请参阅[内建的shopt命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)，了解`nocaseglob`、`nullglob`、`globskipdots`、`failglob`和`dotglob`选项的说明。

​	可以使用`GLOBIGNORE` shell变量来限制与模式匹配的文件名集。如果设置了`GLOBIGNORE`，则匹配到的每个文件名如果也与`GLOBIGNORE`中的模式之一匹配，则将其从匹配列表中删除。如果设置了`nocaseglob`选项，则对`GLOBIGNORE`中的模式进行匹配时，不考虑大小写。当设置了`GLOBIGNORE`并且不为null时，`. `和`.. `始终被忽略。但是，将`GLOBIGNORE`设置为非空值会导致启用`dotglob` shell选项，因此所有以`.`开头的其他文件名都会匹配。要获得忽略以`.`开头的文件名的旧行为，请将`.* `设置为`GLOBIGNORE`中的模式。当`GLOBIGNORE`未设置时，禁用`dotglob`选项。



##### 3.5.8.1 模式匹配



​	模式中出现的除特殊模式字符（如下所述）之外的任何字符都与自身匹配。模式中不能包含NUL字符。反斜杠可以转义后面的字符；匹配时将丢弃转义的反斜杠。特殊模式字符如果要按字面意义匹配，则必须用引号引起来。

​	特殊模式字符具有以下含义：

- `*`

  匹配任何字符串，包括空字符串。当启用`globstar` shell选项，并且在文件名扩展上下文中使用`*`时，两个相邻的`*`作为一个模式将匹配所有文件和零个或多个目录和子目录。如果跟在`/`后面，两个相邻的`*`将只匹配目录和子目录。

- `?`

  匹配任何单个字符。

- `[…]`

  匹配括号内的任何一个字符。由连字符分隔的一对字符表示一个范围表达式；符合当前区域设置的字符排序和字符集的任何字符都会匹配。如果`[`后面的第一个字符是`!`或`^`，则匹配未被括起来的任何字符。`-`可以通过将其包含在集合的第一个或最后一个字符来匹配。`[`可以通过将其作为集合的第一个字符来匹配。范围表达式中字符的排序顺序以及范围中包含的字符由当前区域设置和`LC_COLLATE`和`LC_ALL` shell变量的值（如果设置）决定。例如，在默认的C区域设置中，`[a-dx-z]`等同于`[abcdxyz]`。许多区域设置按字典顺序对字符进行排序，在这些区域设置中，`[a-dx-z]`通常不等同于`[abcdxyz]`；例如，它可能等同于`[aBbCcDdxYyZz]`。要获得括号表达式中范围的传统解释，可以通过将`LC_COLLATE`或`LC_ALL`环境变量设置为值`C`或启用`globasciiranges` shell选项来强制使用C区域设置。在`[`和`]`之间，可以使用*字符类*来指定字符类，语法为`[:`class`:]`，其中class是POSIX标准中定义的以下类之一：
  
  ```
  alnum   alpha   ascii   blank   cntrl   digit   graph   lower
  print   punct   space   upper   word    xdigit
  ```
  
  字符类匹配属于该类的任何字符。*等价类*可以使用语法`[=`c`=]`指定，其中c是具有相同排序权重的所有字符（根据当前区域设置）的字符。在`[`和`]`之间，语法`[.`symbol`.]`匹配排序符号symbol。

​	如果使用`shopt`内建命令启用了`extglob` shell选项，那么shell将识别几个扩展的模式匹配运算符。在下面的描述中，模式列表是由`|`分隔的一个或多个模式的列表。在匹配文件名时，`dotglob` shell选项决定要测试的文件名集合，如上所述。可以使用以下子模式来形成复合模式：

- `?(pattern-list)`

  匹配给定模式的零个或一个实例。

- `*(pattern-list)`

  匹配给定模式的零个或多个实例。

- `+(pattern-list)`

  匹配给定模式的一个或多个实例。

- `@(pattern-list)`

  匹配给定模式之一。

- `!(pattern-list)`

  匹配除给定模式之外的任何内容。

​	`extglob`选项会更改解析器的行为，因为括号通常被视为具有句法含义的运算符。为了确保正确解析扩展匹配模式，请确保在解析包含模式的结构（包括shell函数和命令替换）之前启用了`extglob`。

​	在匹配文件名时，`dotglob` shell选项确定要测试的文件名集合：当`dotglob`被启用时，文件名集合包括以`.`开头的所有文件，但是文件名`.`和`..`必须由以点开头的模式或子模式匹配；当禁用时，该集合不包括以“.”开头的任何文件名，除非模式或子模式以`.`开头。如上所述，`.`仅在匹配文件名时具有特殊意义。

​	复杂的针对长字符串的扩展模式匹配速度较慢，特别是当模式包含选择项并且字符串包含多个匹配项时。使用针对较短字符串的单独匹配，或者使用字符串数组而不是单个长字符串，可能会更快。



#### 3.5.9 引号删除 Quote Removal

​	在前述扩展之后，将删除所有未加引号的出现的字符`\`、`'`和`"`，这些字符不是由上述扩展之一产生的。



### 3.6 重定向



​	在执行命令之前，可以使用Shell解释的特殊符号对其输入和输出进行*重定向*。*重定向*允许命令的文件句柄被复制、打开、关闭、指向不同文件，并且可以更改命令读取和写入的文件。重定向还可以用于修改当前Shell执行环境中的文件句柄。下面的重定向运算符可以在简单命令之前、之中的任何位置出现，或者可以跟在命令之后。重定向按从左到右的顺序处理。

​	可以用形式为{varname}的单词来替代可能由文件描述符之前的数字替代。在这种情况下，对于除了>&-和<&-之外的每个重定向运算符，Shell将分配一个大于10的文件描述符，并将其分配给{varname}。如果>&-或<&-之前带有{varname}，则varname的值定义要关闭的文件描述符。如果提供了{varname}，则重定向会持续超出命令的范围，允许Shell程序员手动管理文件描述符的生命周期。`varredir_close` shell选项管理此行为（参见[内建的shopt命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。

​	在下面的描述中，如果省略了文件描述符，并且重定向运算符号的第一个字符是`<`，则重定向引用标准输入（文件描述符0）。如果重定向运算符号的第一个字符是`>`，则重定向引用标准输出（文件描述符1）。

​	以下描述中重定向运算符号后面的单词（除非另有说明）将经历花括号扩展、波浪线扩展、参数扩展、命令替换、算术扩展、引号删除、文件名扩展和单词分割。如果它扩展为多个单词，Bash会报告一个错误。

​	请注意，重定向的顺序很重要。例如，命令

```
ls > dirlist 2>&1
```

​	将标准输出（文件描述符1）和标准错误（文件描述符2）都重定向到文件dirlist，而命令

```
ls 2>&1 > dirlist
```

仅将标准输出重定向到文件dirlist，因为在将标准输出重定向到dirlist之前，标准错误已经复制了标准输出。

​	Bash在处理特定的文件名时会特殊处理它们，如下表所述。如果Bash运行的操作系统提供了这些特殊文件，bash将使用它们；否则，它将在内部模拟这些行为。

- `/dev/fd/fd`

  如果fd是一个有效的整数，将复制文件描述符fd。

- `/dev/stdin`

  复制文件描述符0。

- `/dev/stdout`

  复制文件描述符1。

- `/dev/stderr`

  复制文件描述符2。

- `/dev/tcp/host/port`

  如果host是一个有效的主机名或Internet地址，且port是一个整数端口号或服务名，则Bash尝试打开相应的TCP套接字。

- `/dev/udp/host/port`

  如果host是一个有效的主机名或Internet地址，且port是一个整数端口号或服务名，则Bash尝试打开相应的UDP套接字。

​	打开或创建文件失败会导致重定向失败。

​	使用大于9的文件描述符进行重定向时应谨慎，因为它们可能与Shell在内部使用的文件描述符发生冲突。






#### 3.6.1 重定向输入

​	输入重定向会导致以word展开的文件名在文件描述符n上被打开以进行读取，如果未指定n，则使用标准输入（文件描述符0）。

​	重定向输入的一般格式为：

```
[n]<word
```

#### 3.6.2 重定向输出

​	输出重定向会导致以word展开的文件名在文件描述符n上被打开以进行写入，如果未指定n，则使用标准输出（文件描述符1）。如果文件不存在，则创建它；如果文件存在，则将其截断为零大小。

​	重定向输出的一般格式为：

```
[n]>[|]word
```

​	如果重定向运算符为`>`，并且已启用了`set`内建命令的`noclobber`选项，则如果以word展开的文件存在且为常规文件，则重定向将失败。如果重定向运算符为`>|`，或者重定向运算符为`>`且未启用`noclobber`选项，则尝试重定向，即使word指定的文件已存在。

#### 3.6.3 追加重定向输出

​	以这种方式进行的输出重定向会导致以word展开的文件名在文件描述符n上以追加方式打开，如果未指定n，则使用标准输出（文件描述符1）。如果文件不存在，则创建它。

​	追加输出的一般格式为：

```
[n]>>word
```

#### 3.6.4 重定向标准输出和标准错误输出

​	此结构允许将标准输出（文件描述符1）和标准错误输出（文件描述符2）都重定向到以word展开的文件名。

​	重定向标准输出和标准错误的两种格式为：

```
&>word
```

和

```
>&word
```

其中第一种形式更常用。这在语义上等同于

```
>word 2>&1
```

​	使用第二种形式时，word不能展开为数字或`-`。如果展开为数字或`-`，则适用其他重定向运算符（参见下面的复制文件描述符）。出于兼容性原因，word不会展开为数字或`-`。

#### 3.6.5 追加标准输出和标准错误输出

​	此结构允许将标准输出（文件描述符1）和标准错误输出（文件描述符2）都追加到以word展开的文件名。

​	追加标准输出和标准错误的格式为：

```
&>>word
```

​	这在语义上等同于

```
>>word 2>&1
```

（参见下面的复制文件描述符）。

#### 3.6.6 Here Documents

​	这种类型的重定向指示Shell从当前源读取输入，直到看到只包含word（无尾随空白）的行为止。然后，到目前为止读取的所有行都被用作命令的标准输入（或者如果指定了n，则为文件描述符n）。

​	Here文档的格式为：

```
[n]<<[-]word
        here-document
delimiter
```

​	对于word，不执行参数和变量展开、命令替换、算术展开或文件名扩展。如果word的任何部分都带引号，则定界符是对word执行引号删除的结果，并且Here文档中的行不会被展开。如果word没有带引号，则Here文档的所有行都会经过参数展开、命令替换和算术展开，字符序列`\newline`被忽略，必须使用`\`来引用字符`\`、`$`和\`。

​	如果重定向运算符为`<<-`，则会从输入行和包含定界符的行中删除所有前导制表符。这样，Shell脚本中的Here文档可以以自然方式进行缩进。

#### 3.6.7 Here Strings

​	Here文档的一种变体，格式为

```
[n]<<< word
```

​	word经过波浪线展开、参数和变量展开、命令替换、算术展开和引号删除。不执行文件名扩展和单词分割。结果被作为单个字符串附加了换行符，提供给命令作为其标准输入（或者如果指定了n，则为文件描述符n）。

#### 3.6.8 复制文件描述符

​	重定向运算符

```
[n]<&word
```

用于复制输入文件描述符。如果word展开为一个或多个数字，则文件描述符n将被设置为该文件描述符的副本。如果word中的数字未指定用于输入的文件描述符，则会出现重定向错误。如果word评估为`-`，则关闭文件描述符n。如果未指定n，则使用标准输入（文件描述符0）。

​	操作符

```
[n]>&word
```

用于类似地复制输出文件描述符。如果未指定n，则使用标准输出（文件描述符1）。如果word中的数字未指定用于输出的文件描述符，则会出现重定向错误。如果word评估为`-`，则关闭文件描述符n。作为特例，如果省略了n，并且word没有展开为一个或多个数字或`-`，则会按照前面描述的方式重定向标准输出和标准错误。

#### 3.6.9 移动文件描述符

​	重定向运算符

```
[n]<&digit-
```

将文件描述符digit移动到文件描述符n，如果未指定n，则移动到标准输入（文件描述符0）。在复制到n之后，将关闭digit。

​	类似地，重定向运算符

```
[n]>&digit-
```

将文件描述符digit移动到文件描述符n，如果未指定n，则移动到标准输出（文件描述符1）。

#### 3.6.10 为读取和写入打开文件描述符

​	重定向运算符

```
[n]<>word
```

会导致以word展开的文件名在文件描述符n上同时以读取和写入的方式打开，如果未指定n，则在文件描述符0上打开。如果文件不存在，则创建它。



### 3.7 执行命令




#### 3.7.1 简单命令展开 Simple Command Expansion



​	当执行简单命令时，Shell按照从左到右的顺序执行以下展开、赋值和重定向操作：

1. 将解析器标记为变量赋值（位于命令名称之前）和重定向的单词保存以供后续处理。
3. 对不是变量赋值或重定向的单词进行展开（参见[Shell扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)）。如果展开后仍有单词剩余，则将第一个单词作为命令名称，剩余的单词作为参数。
5. 执行重定向，如上所述（参见[重定向](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）。
7. 在将文本赋值给变量之前，对每个变量赋值中等号后面的文本进行波浪线展开、参数展开、命令替换、算术展开和引号删除。

​	如果没有命令名称结果，变量赋值会影响当前的Shell环境。对于这种命令（只包含赋值语句和重定向的命令），在执行重定向之前执行赋值语句。否则，变量将添加到执行的命令的环境中，并且不会影响当前的Shell环境。如果任何赋值尝试将值赋给只读变量，将会出现错误，并且命令以非零状态退出。

​	如果没有命令名称结果，将执行重定向，但不会影响当前的Shell环境。如果发生重定向错误，命令将以非零状态退出。

​	如果展开后仍然有命令名称剩余，执行过程如下所述。否则，命令退出。如果展开中包含命令替换，则命令的退出状态是最后一个命令替换的退出状态。如果没有命令替换，则命令以零状态退出。





#### 3.7.2 命令搜索和执行



​	将命令分割为单词后，如果结果是一个简单命令和一个可选的参数列表，则执行以下操作： 

1. 如果命令名称不包含斜杠，则Shell尝试定位它。如果存在与该名称相同的Shell函数，则调用该函数（参见[Shell函数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Functions)）。
3. 如果名称不匹配函数，则Shell在Shell内置命令列表中搜索它。如果找到匹配项，则调用该内置命令。
5. 如果名称既不是Shell函数也不是内置命令，并且不包含斜杠，则Bash会在`$PATH`列表的每个元素中搜索包含该名称的可执行文件目录。Bash使用哈希表来记住可执行文件的完整路径名，以避免多次搜索`PATH`（参见[Bourne Shell内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)中`hash`的描述）。只有在哈希表中找不到命令时才会执行对`PATH`中目录的完全搜索。如果搜索失败，则Shell会搜索名为`command_not_found_handle`的已定义Shell函数。如果该函数存在，则在单独的执行环境中调用它，参数为原始命令及其原始命令的参数，并且该函数的退出状态成为该子shell的退出状态。如果未定义该函数，则Shell打印错误消息，并返回退出状态为127。
7. 如果搜索成功，或者命令名称包含一个或多个斜杠，则Shell在单独的执行环境中执行指定的程序。参数0被设置为给定的名称，剩余的参数设置为提供的参数（如果有）。
9. 如果执行失败，因为文件不是可执行格式，且文件不是目录，则假定它是一个*Shell脚本*，Shell将按照[Shell脚本](https://www.gnu.org/software/bash/manual/bash.html#Shell-Scripts)中的描述执行它。
11. 如果命令未以异步方式启动，则Shell等待命令完成并收集其退出状态。





#### 3.7.3 命令执行环境



​	Shell具有一个*执行环境*，包括以下内容：

- Shell在调用时继承的打开文件，以及通过`exec`内建命令提供的重定向所修改的文件
- 由`cd`、`pushd`或`popd`设置的当前工作目录，或在调用时由Shell继承的目录
- 由`umask`设置的文件创建模式掩码，或从Shell的父进程继承的模式掩码
- 由`trap`设置的当前陷阱
- 通过变量赋值、`set`或从Shell的父进程继承的参数设置
- 在执行期间定义的Shell函数或从Shell的父进程继承的函数
- 在调用时启用的选项（默认情况下或通过命令行参数）或通过`set`启用的选项
- 通过`shopt`启用的选项（参见[内建命令shopt](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）
- 使用`alias`定义的Shell别名（参见[别名](https://www.gnu.org/software/bash/manual/bash.html#Aliases)）
- 各种进程ID，包括后台作业的ID（参见[命令列表](https://www.gnu.org/software/bash/manual/bash.html#Lists)）、`$$`的值和`$PPID`的值

​	除非另有说明，否则在执行简单命令时，如果不是内置命令或Shell函数，将在一个独立的执行环境中调用它，该环境包括以下内容。这些值除非另有说明，否则都是从Shell继承的。 

- Shell的打开文件，以及通过重定向到命令指定的任何修改和添加
- 当前工作目录
- 文件创建模式掩码
- 标记为导出的Shell变量和函数，以及通过环境传递给命令的导出变量（参见[环境](https://www.gnu.org/software/bash/manual/bash.html#Environment)）
- Shell中捕获的陷阱将被重置为从Shell的父进程继承的值，而Shell忽略的陷阱将被忽略

​	在这个独立的环境中调用的命令无法影响Shell的执行环境。

​	*子Shell* 是Shell进程的副本。

​	命令替换、带括号的命令组合和异步命令在子Shell环境中调用，该环境是Shell环境的副本，除了Shell捕获的陷阱被重置为Shell在启动时从其父进程继承的值。作为管道的一部分执行的内置命令也在子Shell环境中执行。对子Shell环境进行的更改不会影响Shell的执行环境。

​	生成用于执行命令替换的子Shell继承父Shell的-e选项的值。在非POSIX模式下，Bash会在此类子Shell中清除-e选项。

​	如果命令后面跟着`&`并且作业控制未激活，则命令的默认标准输入是空文件`/dev/null`。否则，调用的命令将继承由重定向修改的调用Shell的文件描述符。



#### 3.7.4 环境



​	当调用一个程序时，它会获得一个名为*环境*的字符串数组。这是一个以`name=value`形式表示的名称-值对列表。

​	Bash提供了多种方法来操作环境。在启动时，Shell扫描自己的环境并为每个找到的名称创建一个参数，自动将其标记为导出到子进程。执行的命令继承环境。`export`和`declare -x`命令允许将参数和函数添加到环境中，并从环境中删除它们。如果修改环境中的参数的值，新值将成为环境的一部分，替换旧值。由任何执行的命令继承的环境包括Shell的初始环境，其值可以在Shell中进行修改，减去由`unset`和`export -n`命令删除的任何对，以及通过`export`和`declare -x`命令添加的任何附加对。

​	任何简单命令或函数的环境可以通过在其前面加上参数赋值来临时增加，如[Shell参数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)中所述。这些赋值语句仅影响该命令所见的环境。

​	如果设置了-k选项（参见[内建命令set](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)），则所有的参数赋值都会放置在命令的环境中，而不仅仅是在命令名称之前的赋值。

​	当Bash调用外部命令时，变量`$_`被设置为命令的完整路径名，并在其环境中传递给该命令。





#### 3.7.5 退出状态



​	执行的命令的退出状态是由`waitpid`系统调用或等效函数返回的值。退出状态的范围在0到255之间，然而，如下所述，Shell可能会对大于125的值使用特殊含义。Shell内置命令和复合命令的退出状态也限制在此范围内。在某些情况下，Shell将使用特殊值来指示特定的失败模式。

​	对于Shell来说，以零退出状态的命令表示成功。非零退出状态表示失败。这种看似反直觉的方案是为了有一个明确的指示成功的方式，以及多种指示不同失败模式的方式。当命令因为编号为N的致命信号而终止时，Bash使用值128+N作为退出状态。

​	如果找不到命令，则用于执行命令的子进程返回状态127。如果找到命令但无法执行，则返回状态为126。

​	如果命令因为展开或重定向期间的错误而失败，则退出状态大于零。

​	退出状态用于Bash条件命令（参见[条件结构](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）和某些列表结构（参见[命令列表](https://www.gnu.org/software/bash/manual/bash.html#Lists)）。

​	所有Bash内置命令如果成功则返回退出状态0，失败则返回非零状态，因此它们可以被条件和列表结构使用。所有的内置命令在用法不正确、通常为无效的选项或缺少参数时返回退出状态2。

​	最后一个命令的退出状态在特殊参数`$?`中可用（参见[特殊参数](https://www.gnu.org/software/bash/manual/bash.html#Special-Parameters)）。





#### 3.7.6 信号



​	当Bash处于交互模式时，在没有任何陷阱的情况下，它会忽略`SIGTERM`（以便`kill 0`不会杀死交互式Shell），并且会捕获和处理`SIGINT`（以便可中断`wait`内建命令）。当Bash接收到`SIGINT`时，它会跳出正在执行的任何循环。在所有情况下，Bash都会忽略`SIGQUIT`。如果启用了作业控制（参见[作业控制](https://www.gnu.org/software/bash/manual/bash.html#Job-Control)），Bash会忽略`SIGTTIN`、`SIGTTOU`和`SIGTSTP`。

​	由Bash启动的非内建命令的信号处理程序被设置为从其父Shell继承的值。当未启用作业控制时，异步命令除了继承的处理程序之外还会忽略`SIGINT`和`SIGQUIT`。作为命令替换结果运行的命令会忽略由键盘生成的作业控制信号`SIGTTIN`、`SIGTTOU`和`SIGTSTP`。

​	Shell在收到`SIGHUP`时默认退出。在退出之前，交互式Shell会重新发送`SIGHUP`给所有运行或停止的作业。已停止的作业会收到`SIGCONT`以确保它们接收到`SIGHUP`。为了防止Shell向特定作业发送`SIGHUP`信号，可以使用`disown`内建命令将其从作业列表中删除（参见[作业控制内建命令](https://www.gnu.org/software/bash/manual/bash.html#Job-Control-Builtins)），或者使用`disown -h`将其标记为不接收`SIGHUP`。

​	如果使用`shopt`设置了`huponexit` Shell选项（参见[内建命令shopt](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），当交互式登录Shell退出时，Bash会向所有作业发送`SIGHUP`。

​	如果Bash正在等待命令完成，并收到已设置陷阱的信号，则陷阱将在命令完成后才执行。当Bash通过`wait`内建命令等待异步命令时，收到已设置陷阱的信号将导致`wait`内建命令立即返回大于128的退出状态，之后立即执行陷阱。

​	当未启用作业控制并且Bash正在等待前台命令完成时，Shell会接收由键盘生成的信号，如`SIGINT`（通常由`^C`生成），这通常是用户希望发送给该命令的信号。这是因为Shell和命令与终端处于同一进程组中，`^C`会向该进程组中的所有进程发送`SIGINT`。有关进程组的更详细讨论，请参见[作业控制](https://www.gnu.org/software/bash/manual/bash.html#Job-Control)。

​	当Bash在未启用作业控制的情况下运行，并在等待前台命令时接收到`SIGINT`时，它会等待该前台命令终止，然后决定如何处理`SIGINT`： 

1. 如果命令由于`SIGINT`而终止，Bash认为用户意图结束整个脚本，并对`SIGINT`进行处理（例如，运行`SIGINT`陷阱或自行退出）；
3. 如果管道没有因`SIGINT`而终止，程序自身处理了`SIGINT`并且没有将其视为致命信号。在这种情况下，Bash也不会将`SIGINT`视为致命信号，而是假定`SIGINT`是作为程序正常操作的一部分（例如，`emacs`使用它来中止编辑命令）或者故意丢弃的。然而，Bash将运行在等待前台命令完成时设置的任何陷阱，就像在接收到其他任何陷阱信号时一样，以保持兼容性。





### 3.8 Shell 脚本



​	Shell脚本是包含Shell命令的文本文件。当在调用Bash时将这样的文件用作第一个非选项参数，并且没有提供`-c`或`-s`选项（参见[调用Bash](https://www.gnu.org/software/bash/manual/bash.html#Invoking-Bash)），Bash会从文件中读取并执行命令，然后退出。这种操作模式创建了一个非交互式的Shell。Shell首先在当前目录中搜索该文件，如果在当前目录中找不到，则在`$PATH`中的目录中查找。

​	当Bash运行Shell脚本时，它将特殊参数`0`设置为文件名，而不是Shell的名称，并且如果给定了其他参数，则将位置参数设置为剩余的参数。如果没有提供额外的参数，则未设置位置参数。

​	可以使用`chmod`命令将Shell脚本设置为可执行。当Bash在`$PATH`中搜索命令时找到这样的文件时，它会创建一个新的实例来执行它。换句话说，执行

```
filename arguments
```

相当于执行

```
bash filename arguments
```

如果`filename`是一个可执行的Shell脚本。这个子Shell会重新初始化自己，所以效果就像是调用一个新的Shell来解释脚本，除了父Shell记住的命令位置（参见[Bourne Shell内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)中`hash`的描述）由子Shell保留。

​	Unix的大多数版本将此作为操作系统的命令执行机制的一部分。如果脚本的第一行以`#!`两个字符开头，那么行的其余部分指定了程序的解释器，并且根据操作系统的不同，可能还有一个或多个可选的解释器参数。因此，您可以指定Bash、`awk`、Perl或其他解释器，并在该语言中编写剩余的脚本文件。

​	解释器的参数由脚本文件的第一行的解释器名称后面的一个或多个可选参数组成，然后是脚本文件的名称，然后是传递给脚本的其余参数。解释器行如何分割为解释器名称和一组参数的细节因系统而异。Bash将在不处理的操作系统上执行此操作。请注意，某些旧版本的Unix将解释器名称和单个参数限制为最多32个字符，因此不能假定使用多个参数是可移植的。

​	Bash脚本通常以`#! /bin/bash`开头（假设Bash已安装在/bin中），这样可以确保使用Bash解释脚本，即使在另一个Shell下执行也是如此。使用`env`查找`bash`是常见的习惯用法，即使它已安装在另一个目录中：`#!/usr/bin/env bash`将在`$PATH`中找到第一个出现的`bash`。





## 4 Shell 内建命令

​	内建命令包含在Shell内部。当内建命令的名称用作简单命令的第一个单词时（参见[简单命令](https://www.gnu.org/software/bash/manual/bash.html#Simple-Commands)），Shell直接执行该命令，而不是调用另一个程序。内建命令是为了实现不可能或不方便使用单独的实用工具获得的功能。

​	本节简要描述了Bash从Bourne Shell继承的内建命令，以及Bash特有的或已扩展的内建命令。

​	其他章节中描述了几个内建命令：提供Bash与作业控制功能的内建命令（参见[作业控制内建命令](https://www.gnu.org/software/bash/manual/bash.html#Job-Control-Builtins)），目录堆栈（参见[目录堆栈内建命令](https://www.gnu.org/software/bash/manual/bash.html#Directory-Stack-Builtins)），命令历史记录（参见[Bash历史记录内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Builtins)）和可编程完成功能（参见[可编程完成内建命令](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion-Builtins)）。

​	许多内建命令已经被POSIX或Bash扩展。

​	除非另有说明，每个内建命令文档中都以`-`开头的选项都接受`--`来表示选项的结束。`:`、`true`、`false`和`test`/`[`内建命令不接受选项，也不特别处理`--`。`exit`、`logout`、`return`、`break`、`continue`、`let`和`shift`内建命令接受并处理以`-`开头的参数，而不需要`--`。其他接受参数但未指定接受选项的内建命令将参数的以`-`开头视为无效选项，并要求`--`来防止此解释。






### 4.1 Bourne Shell Builtins

​	下面的内建命令是从 Bourne Shell 继承的。这些命令按照 POSIX 标准的规定实现。

- `: (a colon)`

  ```
  : [arguments]
  ```

  除了扩展参数和执行重定向外，什么也不做。返回状态为零。

- `. (a period)`

  ```
  . filename [arguments]
  ```

  在当前 Shell 上下文中读取并执行文件名参数中的命令。如果文件名不包含斜杠，则使用 `PATH` 变量来查找文件名，但文件名不需要是可执行的。当 Bash 不处于 POSIX 模式时，如果在 `$PATH` 中找不到文件名，则在当前目录中搜索它。如果提供了任何参数，则在执行文件名时它们成为位置参数。否则，位置参数保持不变。如果启用了 `-T` 选项，则 `.` 继承 `DEBUG` 陷阱；如果没有，则会保存和恢复 `DEBUG` 陷阱，并在调用 `.` 时取消设置 `DEBUG` 陷阱。如果未设置 `-T`，并且源文件更改了 `DEBUG` 陷阱，则在 `.` 完成后保留新值。返回状态是最后执行的命令的退出状态，如果没有执行命令，则为零。如果找不到文件名，或无法读取文件，则返回状态为非零。此内建命令等效于 `source`。

- `break`

  ```
  break [n]
  ```

  退出 `for`、`while`、`until` 或 `select` 循环。如果提供了 n，将退出第 n 个外层循环。n 必须大于或等于 1。返回状态为零，除非 n 不大于或等于 1。

- `cd`

  ```
  cd [-L|[-P [-e]] [-@] [directory]
  ```

  将当前工作目录更改为目录。如果未提供目录，则使用 `HOME` shell 变量的值。如果存在 `CDPATH` shell 变量，则使用它作为搜索路径：在 `CDPATH` 中的每个目录名称中搜索目录，`CDPATH` 中的备选目录名称用冒号（`:`）分隔。如果目录以斜杠开头，则不使用 `CDPATH`。`-P` 选项表示不跟随符号链接：当 `cd` 遍历目录并在处理目录中的 `..` 实例之前，解析符号链接。默认情况下（或提供 `-L` 选项时），`cd` 在处理目录中的 `..` 实例之后解析符号链接。如果目录中出现 `..`，则通过删除前一个路径名组件来处理它，直到斜杠或目录开始为止。如果使用 `-P` 选项和 `-e`，并且在成功更改目录后无法成功确定当前工作目录，则 `cd` 将返回一个失败状态。在支持的系统上，`-@` 选项将以目录的形式呈现与文件关联的扩展属性。如果目录为 `-`，则在尝试更改目录之前将其转换为 `$OLDPWD`。如果使用 `CDPATH` 中的非空目录名，或者如果 `-` 是第一个参数，并且目录更改成功，则新工作目录的绝对路径名将写入标准输出。如果目录更改成功，则 `cd` 将 `PWD` 环境变量的值设置为新目录名，并将 `OLDPWD` 环境变量设置为更改之前的当前工作目录的值。如果目录成功更改，则返回状态为零，否则为非零。

- `continue`

  ```
  continue [n]
  ```

  继续执行下一个 `for`、`while`、`until` 或 `select` 循环的迭代。如果提供了 n，将恢复执行第 n 个外层循环。n 必须大于或等于 1。返回状态为零，除非 n 不大于或等于 1。

- `eval`

  ```
  eval [arguments]
  ```

  将参数连接成一个单个命令，然后读取并执行该命令，并将其退出状态作为 `eval` 的退出状态返回。如果没有参数或只有空参数，返回状态为零。

- `exec`

  ```
  exec [-cl] [-a name] [command [arguments]]
  ```

  如果提供了命令，则它会替换当前的 shell 而不创建新的进程。如果提供了 `-l` 选项，shell 会在传递给命令的第一个参数的零号参数前面放置一个破折号。这就是 `login` 程序所做的。`-c` 选项使命令在一个空环境中执行。如果提供了 `-a`，则 shell 将名称作为零号参数传递给命令。如果由于某种原因无法执行命令，则非交互式 shell 退出，除非启用了 `execfail` shell 选项。在这种情况下，它返回失败。如果文件无法执行，则交互式 shell 返回失败。如果 `exec` 失败，子 shell 将无条件退出。如果未指定命令，则可以使用重定向来影响当前的 shell 环境。如果没有重定向错误，则返回状态为零；否则返回状态为非零。

- `exit`

  ```
  exit [n]
  ```

  退出 Shell，并将状态 n 返回给 Shell 的父进程。如果省略了 n，则退出状态为最后执行的命令的状态。Shell 终止之前，会执行任何 `EXIT` 陷阱。

- `export`

  ```
  export [-fn] [-p] [name[=value]]
  ```

  在环境中标记每个名称以传递给子进程。如果提供了 `-f` 选项，则名称引用 shell 函数；否则名称引用 shell 变量。`-n` 选项表示不再标记每个名称用于导出。如果未提供名称，或者提供了 `-p` 选项，则显示所有导出变量的名称列表。其他选项可用于将输出限制为一部分导出名称集。`-p` 选项以可重用作为输入的形式显示输出。如果变量名称后跟 `=value`，则将变量的值设置为 value。返回状态为零，除非提供了无效选项、一个名称不是有效的 shell 变量名称，或者 `-f` 选项与不是 shell 函数的名称一起提供。

- `getopts`

  ```
  getopts optstring name [arg …]
  ```

  `getopts` 用于解析位置参数的 shell 脚本。选项字符串包含要识别的选项字符；如果字符后面跟着冒号，则该选项应具有参数，参数应与其以空格分隔。冒号（`:`）和问号（`?`）不能用作选项字符。每次调用它时，`getopts` 将下一个选项放入 shell 变量名称中，并将下一个要处理的参数的索引放入变量 `OPTIND` 中。`OPTIND` 每次 Shell 或 Shell 脚本被调用时都会初始化为 1。当一个选项需要一个参数时，`getopts` 将该参数放入变量 `OPTARG` 中。Shell 不会自动重置 `OPTIND`；如果在同一次 Shell 调用中多次调用 `getopts`，需要手动重置它，以便使用新的参数集。遇到选项结束时，`getopts` 以大于零的返回值退出。`OPTIND` 设置为第一个非选项参数的索引，并且名称设置为 `?`。`getopts` 通常解析位置参数，但如果提供了更多的参数作为参数值，则 `getopts` 将解析这些参数。

  `getopts` 可以以两种方式报告错误。如果选项字符串的第一个字符是冒号，则使用静默错误报告。在正常操作中，当遇到无效选项或缺少选项参数时，将打印诊断消息。如果变量 `OPTERR` 设置为 0，则不会显示错误消息，即使选项字符串的第一个字符不是冒号。如果看到无效选项，则 `getopts` 将 `?` 放入名称中，并且如果不是静默的，打印一个错误消息并取消设置 `OPTARG`。如果 `getopts` 是静默的，则找到的选项字符放入 `OPTARG`，并且不打印诊断消息。

  如果未找到所需的参数，并且 `getopts` 不是静默的，则将问号（`?`）放入名称中，将 `OPTARG` 取消设置，并打印一个诊断消息。如果 `getopts` 是静默的，则将冒号（`:`）放入名称中，并将 `OPTARG` 设置为找到的选项字符。

- `hash`

  ```
  hash [-r] [-p filename] [-dt] [name]
  ```

  每次调用 `hash` 时，它会记住作为名称参数指定的命令的完整路径名，因此不需要在后续调用中搜索它们。通过在 `$PATH` 中列出的目录中进行搜索来找到这些命令。任何先前记住的路径名都将被丢弃。`-p` 选项阻止路径搜索，并使用文件名作为名称的位置。`-r` 选项导致 shell 忘记所有已记住的位置。`-d` 选项导致 shell 忘记每个名称的记住位置。如果提供了 `-t` 选项，则打印每个名称对应的完整路径名。如果使用 `-t` 提供多个名称参数，则在打印散列的完整路径名之前打印名称。`-l` 选项导致以可重用作为输入的格式显示输出。如果没有给出参数，或仅提供了 `-l`，则打印有关已记住的命令的信息。返回状态为零，除非找不到名称或提供了无效选项。

- `pwd`

  ```
  pwd [-LP]
  ```

  打印当前工作目录的绝对路径名。如果提供了 `-P` 选项，则打印的路径名不包含符号链接。如果提供了 `-L` 选项，则打印的路径名可能包含符号链接。返回状态为零，除非在确定当前目录的名称时遇到错误或提供了无效选项。

- `readonly`

  ```
  readonly [-aAf] [-p] [name[=value]] …
  ```

  将每个名称标记为只读。后续赋值操作无法更改这些名称的值。如果提供了 `-f` 选项，则每个名称引用一个 shell 函数。`-a` 选项表示每个名称引用一个索引数组变量；`-A` 选项表示每个名称引用一个关联数组变量。如果两个选项都提供了，`-A` 优先。如果没有给出名称参数，或者提供了 `-p` 选项，则打印所有只读名称的列表。其他选项可用于将输出限制为只读名称集的子集。`-p` 选项导致输出以可重用作为输入的格式显示。如果变量名称后跟 `=value`，则将变量的值设置为值。返回状态为零，除非提供了无效选项、其中一个名称参数不是有效的 shell 变量或函数名称，或者提供了 `-f` 选项与不是 shell 函数的名称。

- `return`

  ```
  return [n]
  ```

  使一个 shell 函数停止执行并将值 n 返回给其调用者。如果未提供 n，则返回值为函数中最后执行的命令的退出状态。如果 `return` 是由陷阱处理程序执行的，则用于确定状态的最后一个命令是陷阱处理程序之前执行的最后一个命令。如果 `return` 在 `DEBUG` 陷阱期间执行，则用于确定状态的最后一个命令是在调用 `return` 之前陷阱处理程序执行的最后一个命令。`return` 还可用于终止使用 `.`（`source`）内建命令执行的脚本的执行，将 n 或脚本中最后执行的命令的退出状态作为脚本的退出状态。如果提供了 n，则返回值为其最低有效的 8 位。在函数或脚本完成执行后，在函数或脚本之后恢复执行之前，将执行与 `RETURN` 陷阱关联的任何命令。如果 `return` 提供了非数字参数，或者在函数外部使用而不是在 `.` 或 `source` 执行脚本的过程中，则返回状态为非零。

- `shift`

  ```
  shift [n]
  ```

  将位置参数向左移动 n 个位置。从 n+1 到 `$#` 的位置参数被重命名为 `$1` 到 `$#`-n。由数字 `$#` 到 `$#`-n+1 表示的参数被取消设置。n 必须是非负数且不大于或等于 `$#` 的数字。如果 n 是零或大于 `$#`，则不会更改位置参数。如果未提供 n，则假定为 1。返回状态为零，除非 n 大于 `$#` 或小于零，否则为非零。

- `test`

- `[`

  ```sh
  test expr
  ```

  `test`命令用于求值条件表达式`expr`并返回状态0（真）或1（假）。每个运算符和操作数必须是单独的参数。表达式由下面在[Bash条件表达式](https://www.gnu.org/software/bash/manual/bash.html#Bash-Conditional-Expressions)中描述的基元组成。`test`命令不接受任何选项，并且不接受并忽略`--`作为选项的结束符。

  当使用`[`形式时，命令的最后一个参数必须是`]`。可以使用以下运算符组合表达式，按优先级递减的顺序列出。求值取决于参数的数量；请参见下面的说明。当有五个或更多的参数时，使用运算符优先级。

  `! expr`: 如果`expr`为假，则为真。

  `( expr )`: 返回`expr`的值。这可以用于覆盖运算符的正常优先级。

  `expr1 -a expr2`: 如果`expr1`和`expr2`都为真，则为真。

  `expr1 -o expr2`: 如果`expr1`或`expr2`为真，则为真。

  `test`和`[`内置命令使用基于参数数量的一组规则来求值条件表达式。 

  0 arguments: 表达式为假。

  1 argument: 如果且仅当参数不为空时，表达式为真。

  2 arguments: 如果第一个参数是`!`，则表达式为真，如果且仅当第二个参数为空时。如果第一个参数是一种一元条件运算符（参见[Bash条件表达式](https://www.gnu.org/software/bash/manual/bash.html#Bash-Conditional-Expressions)），则如果一元测试为真，则表达式为真。如果第一个参数不是有效的一元运算符，则表达式为假。

  3 arguments: .按照下面列出的顺序应用以下条件：

  - 如果第二个参数是二元条件运算符之一（参见[Bash条件表达式](https://www.gnu.org/software/bash/manual/bash.html#Bash-Conditional-Expressions)），则表达式的结果是使用第一个和第三个参数作为操作数的二元测试的结果。当有三个参数时，`-a`和`-o`运算符被视为二元运算符。

  - 如果第一个参数是`!`，则值是使用第二个和第三个参数进行的二元测试的否定结果。

  - 如果第一个参数恰好是`(`，且第三个参数恰好是`)`，则结果是对第二个参数进行的一元测试。

  - 否则，表达式为假。

  

4 arguments: 按照下面列出的顺序应用以下条件：

- 如果第一个参数是`!`，则结果是由剩余参数组成的三元表达式的否定结果。
  
- 如果第一个参数恰好是`(`，且第四个参数恰好是`)`，则结果是对第二个和第三个参数进行的两元测试。
  
- 否则，按照上面列出的规则解析和评估表达式。
  

  5 or more arguments: 按照上面列出的规则解析和评估表达式。当与`test`或`[`一起使用时，`<`和`>`运算符按照ASCII排序进行比较。

- `times`

  ```
  times
  ```

  打印出shell及其子进程使用的用户时间和系统时间。返回状态为零。

- `trap`

  ```
  trap [-lp] [arg] [sigspec …]
  ```

  在shell接收到信号`sigspec`时，读取并执行参数`arg`中的命令。如果`arg`不存在（且只有一个`sigspec`）或等于`-`，则将重置每个指定信号的处理方式为shell启动时的值。如果`arg`为空字符串，则shell忽略由`sigspec`指定的信号并且不执行相关命令。如果`arg`不存在并且提供了`-p`选项，则shell显示与每个`sigspec`相关联的陷阱命令。如果没有提供参数，或只提供了`-p`选项，则`trap`打印出每个信号编号相关联的命令列表，以便可以作为shell输入重用。`-l`选项导致shell打印出信号名称及其对应的编号。每个`sigspec`可以是信号名称或信号编号。信号名称不区分大小写，且`SIG`前缀是可选的。如果`sigspec`是`0`或`EXIT`，则在shell退出时执行`arg`。如果`sigspec`是`DEBUG`，则在每个简单命令、`for`命令、`case`命令、`select`命令、每个算术`for`命令之前以及在shell函数中的第一个命令执行之前执行命令`arg`。有关其对`DEBUG`陷阱的影响的详细信息，请参阅`shopt`内置命令的`extdebug`选项的描述（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。如果`sigspec`是`RETURN`，则每次shell函数或使用`.``source`内置命令执行的脚本完成执行时都会执行命令`arg`。如果`sigspec`是`ERR`，则在管道（可能由单个简单命令）、列表或复合命令返回非零退出状态时执行命令`arg`，但受以下条件限制。如果失败的命令是紧接在`until`或`while`关键字之后的命令列表的一部分，或者是在`if`或`elif`保留字之后的测试的一部分，或者是在`&&`或`||`列表中执行的命令（除了最后的命令之后的命令），或者是管道中除了最后的命令之外的任何命令，或者命令的返回状态通过`!`进行取反，则不会执行`ERR`陷阱。这些条件与`errexit`（-e）选项遵循相同的规则。进入shell时被忽略的信号无法被捕获或重置。在创建子shell或子shell环境时，未被忽略的陷阱信号会被重置为其原始值。除非`sigspec`未指定有效信号，否则返回状态为零。

- `umask`

  ```
  umask [-p] [-S] [mode]
  ```

  将shell进程的文件创建掩码设置为`mode`。如果`mode`以数字开头，则将其解释为八进制数；如果不是，则将其解释为类似于`chmod`命令接受的符号模式掩码。如果省略`mode`，则打印出掩码的当前值。如果提供了`-S`选项但没有提供`mode`参数，则以符号格式打印出掩码。如果提供了`-p`选项，并且省略了`mode`，则输出的格式可重用为输入。如果成功更改了模式或没有提供模式参数，则返回状态为零，否则为非零。请注意，当将模式解释为八进制数时，每个数字都从`7`中减去掩码的数字。因此，`022`的掩码结果为`755`。

  - 

- `unset`

  ```
  unset [-fnv] [name]
  ```
  
  移除每个变量或函数名。如果提供了`-v`选项，则每个名称都是指向shell变量的引用，并且该变量将被移除。如果提供了`-f`选项，则名称引用shell函数，并且函数定义将被移除。如果提供了`-n`选项，并且`name`是具有`nameref`属性的变量，则将取消设置`name`而不是取消设置该变量引用的变量。如果未提供`-n`选项，则`-f`选项不起作用。如果没有提供选项，则每个名称都是指向变量的引用；如果没有该名称的变量，则移除具有该名称的函数（如果有）。只读变量和函数无法取消设置。取消设置会导致某些shell变量失去其特殊行为；有关各个变量的说明中会提到此类行为。返回状态为零，除非名称是只读的或不可取消设置。





### 4.2 Bash 内建命令

​	本节描述了在Bash中特有或扩展的内建命令。其中一些命令在POSIX标准中进行了规定。

- `alias`

  ```
  alias [-p] [name[=value] …]
  ```

  如果没有参数或带有-p选项，`alias`会以可以被重复使用作为输入的形式将别名列表打印到标准输出。如果提供了参数，则为每个给定值的名称定义一个别名。如果没有给定值，则打印别名的名称和值。别名的详细信息请参阅[Aliases](https://www.gnu.org/software/bash/manual/bash.html#Aliases)。

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

  显示当前的Readline（参见[Command Line Editing](https://www.gnu.org/software/bash/manual/bash.html#Command-Line-Editing)）键和函数绑定，将键序列绑定到Readline函数或宏，或者设置一个Readline变量。每个非选项参数都是一个命令，就像它在Readline初始化文件中出现的那样（参见[Readline Init File](https://www.gnu.org/software/bash/manual/bash.html#Readline-Init-File)），但是每个绑定或命令必须作为单独的参数传递；例如，`"\C-x\C-r":re-read-init-file`。

  如果提供了选项，具有以下含义：

  `-m keymap`：将keymap用作随后绑定所影响的键映射。可接受的键映射名称有`emacs`、`emacs-standard`、`emacs-meta`、`emacs-ctlx`、`vi`、`vi-move`、`vi-command`和`vi-insert`。`vi`等效于`vi-command`（`vi-move`也是一个同义词）；`emacs`等效于`emacs-standard`。

  `-l`：列出所有Readline函数的名称。

  `-p`：以可以作为输入或Readline初始化文件中的绑定来显示Readline函数的名称和绑定。

  `-P`：列出当前的Readline函数名称和绑定。

  `-v`：以可以作为输入或Readline初始化文件中的变量来显示Readline变量的名称和值。

  `-V`：列出当前的Readline变量名称和值。

  `-s`：以可以作为输入或Readline初始化文件中的宏绑定的键序列和它们输出的字符串来显示Readline绑定的键序列。

  `-S`：显示绑定到宏的Readline键序列和它们的字符串输出。

  `-f filename`：从filename中读取键绑定。

  `-q function`：查询调用命名函数的键。

  `-u function`：取消绑定到命名函数的所有键。

  `-r keyseq`：移除键序列的任何当前绑定。

  `-x keyseq:shell-command`：每当输入keyseq时，执行shell-command。当执行shell-command时，shell将`READLINE_LINE`变量设置为Readline行缓冲区的内容，将`READLINE_POINT`和`READLINE_MARK`变量分别设置为插入点的当前位置和保存的插入点（标记）的位置。shell将用户提供的任何数值参数分配给`READLINE_ARGUMENT`变量。如果没有参数，该变量不设置。如果执行的命令更改了`READLINE_LINE`、`READLINE_POINT`或`READLINE_MARK`的任何值，这些新值将反映在编辑状态中。

  `-X`：以可重复使用的格式列出绑定到shell命令和相关命令的所有键序列。

  返回状态为零，除非提供了无效的选项或发生错误。

- `builtin`

  ```
  builtin [shell-builtin [args]]
  ```

  运行一个内建的shell命令，传递给它args，并返回其退出状态。当使用与shell内建命令相同的名称定义一个shell函数时，保留内建功能在函数中。如果shell-builtin不是一个shell内建命令，则返回非零退出状态。

- `caller`

  ```
  caller [expr]
  ```

  返回任何活动子程序调用的上下文（shell函数或使用`.`或`source`内建执行的脚本）。如果没有expr，则`caller`显示当前子程序调用的行号和源文件名。如果提供了非负整数作为expr，`caller`显示当前执行调用堆栈中该位置对应的行号、子程序名称和源文件。可以使用此附加信息，例如打印堆栈跟踪。当前帧为帧0。返回值为0，除非shell未执行子程序调用或expr不对应于调用堆栈中的有效位置。

- `command`

  ```
  command [-pVv] command [arguments …]
  ```

  运行带有参数的`command`，忽略任何名为`command`的shell函数。只执行shell内建命令或通过搜索`PATH`找到的命令。如果存在名为`ls`的shell函数，在函数内部运行`command ls`将执行外部命令`ls`，而不是递归调用函数。`-p`选项表示使用默认值为`PATH`，该值可以确保找到所有标准工具。在这种情况下，如果无法找到`command`或发生错误，返回状态为127；否则为`command`的退出状态。如果提供了`-V`或`-v`选项，将打印关于`command`的描述。`-v`选项会显示表示调用`command`的命令或文件名的单词；`-V`选项会产生更详细的描述。在这种情况下，如果找到`command`，返回状态为零，否则为非零。

- `declare`

  ```
  declare [-aAfFgiIlnrtux] [-p] [name[=value] …]
  ```

  声明变量并给它们赋予属性。如果没有给出名称，则显示变量的值。

  `-p`选项将显示每个名称的属性和值。当与名称参数一起使用`-p`时，除了`-f`和`-F`之外的其他选项将被忽略。

  当不带名称参数提供`-p`时，`declare`将显示具有由其他选项指定的属性的所有变量的属性和值。如果没有提供其他选项，则`declare`将显示所有shell变量的属性和值。`-f`选项将限制显示为shell函数。

  `-F`选项禁止显示函数定义；只打印函数名称和属性。如果使用`shopt`启用了`extdebug` shell选项（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），还会显示定义每个名称的源文件名和行号。`-F`隐含了`-f`。

  `-g`选项强制在shell函数中创建或修改变量时将其创建或修改为全局作用域。在其他情况下，该选项被忽略。

  `-I`选项使本地变量继承环绕作用域中具有相同名称的任何现有变量的属性（除了`nameref`属性）和值。如果没有现有的变量，则本地变量最初未设置。

  以下选项可用于将输出限制为具有指定属性的变量或给变量添加属性：

  `-a`：每个名称是索引数组变量（参见[Arrays](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）。

  `-A`：每个名称是关联数组变量（参见[Arrays](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）。

  `-f`：仅使用函数名称。

  `-i`：将变量视为整数；在为变量赋值时执行算术运算（参见[Shell Arithmetic](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)）。

  `-l`：当为变量赋值时，将所有大写字符转换为小写。禁用大写属性。

  `-n`：给每个名称添加`nameref`属性，将其作为对另一个变量的名称引用。另一个变量由名称的值定义。除了使用或更改`-n`属性本身的引用、赋值和属性修改之外的所有引用、赋值和属性修改，都在由名称的值引用的变量上执行。`nameref`属性不能应用于数组变量。

  `-r`：使名称只读。这些名称无法通过后续的赋值语句或`unset`语句赋值。

  `-t`：给每个名称添加`trace`属性。跟踪的函数继承调用shell的`DEBUG`和`RETURN`陷阱。对于变量，跟踪属性没有特殊含义。

  `-u`：当为变量赋值时，将所有小写字符转换为大写。禁用小写属性。

  `-x`：将每个名称标记为通过环境导出给后续的命令。

  使用`+`而不是`-`来关闭属性，但以下例外情况：`+a`和`+A`不能用于销毁数组变量，`+r`不会删除只读属性。在函数中使用`declare`时，每个名称都被视为局部变量，就像使用`local`命令一样，除非使用了`-g`选项。如果变量名后跟`=`和`value`，则变量的值将设置为`value`。

  在使用`-a`或`-A`和复合赋值语法创建数组变量时，其他属性在后续赋值之前不会生效。

  返回状态为零，除非遇到无效的选项，尝试使用`-f foo=bar`定义函数，尝试给只读变量赋值，尝试在没有使用复合赋值语法的情况下给数组变量赋值（参见[Arrays](https://www.gnu.org/software/bash/manual/bash.html#Arrays)），其中一个名称不是有效的shell变量名，尝试关闭只读变量的只读状态，尝试关闭数组变量的数组状态，或尝试使用`-f`显示不存在的函数。

  - `echo`

    ```
    echo [-neE] [arg …]
    ```

    输出参数arg，以空格分隔，并以换行符结束。返回状态为0，除非发生写入错误。如果指定了`-n`选项，则不会输出尾随的换行符。如果使用了`-e`选项，则启用对以下转义字符的解释。`-E`选项禁用对这些转义字符的解释，即使在默认情况下系统会解释它们。可以使用`xpg_echo` shell选项动态确定`echo`是否默认扩展这些转义字符。`echo`不解释`--`表示选项结束的含义。

    ​	`echo`解释以下转义序列：

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

  

  `\0nnn`：八进制值为nnn的八位字符（零到三个八进制数字）

  `\xHH`：十六进制值为HH的八位字符（一个或两个十六进制数字）

  `\uHHHH`：十六进制值为HHHH的Unicode（ISO/IEC 10646）字符（一个到四个十六进制数字）

  `\UHHHHHHHH`：十六进制值为HHHHHHHH的Unicode（ISO/IEC 10646）字符（一个到八个十六进制数字）

- `enable`

  ```
  enable [-a] [-dnps] [-f filename] [name …]
  ```

  启用或禁用shell内建命令。禁用内建命令允许执行与shell内建同名的磁盘命令，而无需指定完整路径名，即使在shell通常在磁盘命令之前搜索内建命令。

  如果使用了`-n`，则禁用名称。否则，启用名称。例如，要使用通过`$PATH`找到的`test`二进制文件而不是shell内建版本，输入`enable -n test`。如果提供了`-p`选项或没有指定名称参数，将打印一个shell内建命令列表。如果没有其他参数，列表包含所有已启用的shell内建命令。`-a`选项表示要列出每个内建命令，并指示其是否已启用。

  `-f`选项表示从支持动态加载的共享对象文件中加载新的内建命令名称。Bash将使用`BASH_LOADABLES_PATH`变量的值作为冒号分隔的目录列表，在其中搜索filename。默认值取决于系统。`-d`选项将删除使用`-f`加载的内建命令。

  如果没有选项，将显示shell内建命令列表。`-s`选项将`enable`限制为POSIX特殊内建命令。如果使用`-s`和`-f`一起，新的内建命令将成为特殊内建命令（参见[Special Builtins](https://www.gnu.org/software/bash/manual/bash.html#Special-Builtins)）。

  如果未提供选项并且名称不是shell内建命令，`enable`将尝试从名为`name`的共享对象中加载`name`，就像命令是`enable -f name name`一样。返回状态为零，除非名称不是shell内建命令或从共享对象加载新的内建命令时出现错误。

- `help`

  ```
  help [-dms] [pattern]
  ```

  显示有关内建命令的帮助信息。如果指定了pattern，`help`会详细显示与pattern匹配的所有命令的帮助信息；否则，打印内建命令列表。如果提供了选项，具有以下含义：

  `-d`：显示每个pattern的简短描述。

  `-m`：以类似于man页的格式显示每个pattern的描述。

  `-s`：仅显示每个pattern的简短用法摘要。

  返回状态为零，除非没有命令与pattern匹配。

- `let`

  ```
  let expression [expression …]
  ```

  `let`内建命令允许对shell变量进行算术运算。根据[Shell Arithmetic](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)中给出的规则，对每个表达式进行求值。如果最后一个表达式求值为0，则`let`返回1；否则返回0。

- `local`

  ```
  local [option] name[=value] …
  ```

  对于每个参数，创建一个名为name的局部变量，并赋予value。选项可以是`declare`命令接受的任何选项。`local`只能在函数内部使用；它使变量name的可见范围限制为该函数及其子函数。如果name为`-`，则将shell选项集限制为调用`local`的函数：在函数内部使用`set`内建命令更改的shell选项在函数返回时将恢复为其原始值。恢复操作效果上等同于执行一系列的`set`命令以恢复在函数之前处于有效状态的值。返回状态为零，除非在函数外部使用`local`，提供了无效的name，或name是只读变量。

- `logout`

  ```
  logout [n]
  ```

  退出登录shell，将状态n返回给shell的父进程。

- `mapfile`

  ```
  mapfile [-d delim] [-n count] [-O origin] [-s count]
      [-t] [-u fd] [-C callback] [-c quantum] [array]
  ```

  从标准输入或文件描述符fd（如果提供了`-u`选项）中读取行，并将其存储到索引数组变量array中。变量`MAPFILE`是默认的数组。如果提供了选项，具有以下含义：

  `-d`：使用delim的第一个字符来终止每一行的读取，而不是使用换行符。如果delim为空字符串，则`mapfile`将在读取到NUL字符时终止一行的读取。`-n`：最多复制count行。如果count为0，则复制所有行。

  `-O`：从origin索引开始向数组分配。默认索引为0。

  `-s`：丢弃读取的前count行。

  `-t`：从每一行的末尾删除尾随的delim（默认为换行符）。

  `-u`：从文件描述符fd而不是标准输入读取行。

  `-C`：每次读取quantum行时，计算回调函数。`-c`选项指定quantum。

  `-c`：指定在每次调用回调函数之间读取的行数。

  如果指定了`-C`而没有指定`-c`，则默认的quantum为5000。当计算回调函数时，将传递给它下一个要分配的数组元素的索引和要分配给该元素的行作为附加参数。回调函数在读取行后但在分配数组元素之前进行计算。

  如果没有提供显式的origin，`mapfile`将在分配给数组之前清空array。`mapfile`成功返回，除非提供了无效的选项或选项参数，array无效或无法分配，或array不是索引数组。

- `printf`

  ```
  printf [-v var] format [arguments]
  ```

  根据format的控制，将格式化的参数写入标准输出。`-v`选项使输出被分配给变量var，而不是打印到标准输出。

  format是一个包含三种类型对象的字符串：普通字符，它们只是复制到标准输出；字符转义序列，它们被转换并复制到标准输出；格式说明符，每个说明符都会导致打印下一个连续的参数。除了标准的`printf(1)`格式外，`printf`还解释以下扩展：

  `%b`：导致`printf`以与`echo -e`（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）相同的方式扩展相应的参数。

  `%q`：导致`printf`以可以重新用作shell输入的格式输出相应的参数。

  `%Q`：与`%q`相似，但在引用参数之前应用任何指定的精度。

  `%(datefmt)T`：导致`printf`以使用datefmt作为`strftime`(3)的格式字符串生成的日期时间字符串输出。相应的参数是一个整数，表示自纪元以来的秒数。可以使用两个特殊的参数值：-1表示当前时间，-2表示shell被调用的时间。如果未指定参数，则转换的行为就像给定了-1一样。这是对通常`printf`行为的例外。

  %b、%q和%T指令都使用格式说明符中的字段宽度和精度参数，并从扩展的参数中写入（或使用相应的字段）这么多字节，而扩展的参数通常包含比原始参数更多的字符。

  非字符串格式说明符的参数被视为C语言常量，但允许前导加号或减号，并且如果前导字符是单引号或双引号，那么值是后面字符的ASCII值。根据需要重用format来使用所有参数。如果格式需要的参数多于提供的参数，则额外的格式说明符的行为就像提供了零值或空字符串一样。成功时返回值为零，失败时返回非零值。

- `read`

  ```
  read [-ers] [-a aname] [-d delim] [-i text] [-n nchars]
      [-N nchars] [-p prompt] [-t timeout] [-u fd] [name …]
  ```

  从标准输入读取一行，或从作为-u选项的参数提供的文件描述符fd中读取一行，按照[Word Splitting](https://www.gnu.org/software/bash/manual/bash.html#Word-Splitting)中描述的方式拆分为单词，并将第一个单词赋值给第一个名称，第二个单词赋值给第二个名称，依此类推。如果单词数量多于名称数量，则将剩余的单词及其分隔符赋值给最后一个名称。如果从输入流中读取的单词数量少于名称数量，则剩余的名称将被赋值为空值。使用`IFS`变量的值中的字符来使用与shell在扩展中使用的相同规则将行分割为单词（在[Word Splitting](https://www.gnu.org/software/bash/manual/bash.html#Word-Splitting)中描述）。反斜杠字符`\`可用于取消下一个字符读取的任何特殊含义，并用于换行。

  如果提供了选项，具有以下含义：

  `-a aname`：将单词按顺序分配给索引数组变量aname，从0开始。在分配之前，从aname中删除所有元素。其他名称参数将被忽略。

  `-d delim`：使用delim的第一个字符来终止输入行，而不是使用换行符。如果delim为空字符串，则`read`将在读取到NUL字符时终止一行的读取。

  `-e`：使用Readline（参见[Command Line Editing](https://www.gnu.org/software/bash/manual/bash.html#Command-Line-Editing)）获取行。Readline使用当前（或默认，如果之前没有启用行编辑）的编辑设置，但使用Readline的默认文件名补全。

  `-i text`：如果使用Readline读取行，编辑开始之前将文本放入编辑缓冲区。

  `-n nchars`：`read`在读取nchars个字符后返回，而不是等待完整的输入行，但如果在读取到分隔符之前读取的字符少于nchars个，则遵循分隔符。

  `-N nchars`：`read`在读取完全匹配nchars个字符后返回，而不是等待完整的输入行，除非遇到EOF或`read`超时。输入中遇到的分隔符字符不被特殊处理，直到读取nchars个字符后`read`才返回。结果不会根据`IFS`中的字符进行分割；意图是变量被赋值为精确读取的字符（除了反斜杠；参见下面的-r选项）。

  `-p prompt`：在尝试读取任何输入之前，显示无尾随换行符的提示符。只有在输入来自终端时才显示提示符。

  `-r`：如果给出此选项，反斜杠不会作为转义字符。反斜杠被视为行的一部分。特别是，不能使用反斜杠换行对作为行继续进行分行。

  `-s`：静默模式。如果输入来自终端，则不会回显字符。

  `-t timeout`：如果未在timeout秒内读取到完整的输入行（或指定数量的字符），则导致`read`超时并返回失败。timeout可以是带有小数部分的小数。只有当`read`从终端、管道或其他特殊文件读取输入时，此选项才有效；当从常规文件读取时，此选项无效。如果`read`超时，`read`会将读取到的任何部分输入保存到指定的变量名中。如果timeout为0，则`read`立即返回，而不尝试读取任何数据。如果在指定的文件描述符上有可用输入，或者读取将返回EOF，则退出状态为0；否则，退出状态非零。如果超过超时时间，则退出状态大于128。

  `-u fd`：从文件描述符fd读取输入。如果未提供名称，则将读取的行（不包括结束分隔符，但其他方面不变）分配给变量`REPLY`。除非遇到文件结束符，`read`超时（此时状态大于128），发生变量赋值错误（例如将只读变量赋值），或者提供了无效的文件描述符作为-u的参数，否则退出状态为零。

- `readarray`

  ```
  readarray [-d delim] [-n count] [-O origin] [-s count]
      [-t] [-u fd] [-C callback] [-c quantum] [array]
  ```

  将标准输入中的行读取到索引数组变量array中，或者如果提供了-u选项，则从文件描述符fd中读取。是`mapfile`的同义词。

- `source`

  ```
  source filename
  ```

  是`.`的同义词（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins))。

- `type`

  ```
  type [-afptP] [name …]
  ```

  对于每个名称，指示如果将其用作命令名称，它将如何被解释。如果使用了`-t`选项，`type`打印一个单词，可以是`alias`、`function`、`builtin`、`file`或`keyword`，如果name是别名、shell函数、shell内建命令、磁盘文件或shell保留字，则分别返回相应的值。如果未找到该名称，则不打印任何内容，并且`type`返回失败状态。

  如果使用了`-p`选项，`type`要么返回将要执行的磁盘文件的名称，要么如果`-t`不返回`file`，则不返回任何内容。

  `-P`选项会强制对每个名称进行路径搜索，即使`-t`不会返回`file`。如果命令已经进行了哈希处理，`-p`和`-P`会打印哈希值，该值不一定是在`$PATH`中首先出现的文件。如果使用了`-a`选项，`type`会返回包含名为file的可执行文件的所有位置。只有在不使用`-p`选项时才包括别名和函数。

  如果使用了`-f`选项，`type`不会尝试查找shell函数，与`command`内建命令相同。如果所有名称都被找到，则返回状态为零，如果有任何名称未找到，则返回非零。

- `typeset`

  ```
  typeset [-afFgrxilnrtux] [-p] [name[=value] …]
  ```

  `typeset`命令是为了与Korn shell兼容而提供的。它是`declare`内建命令的同义词。

- `ulimit`

  ```
  ulimit [-HS] -a
  ulimit [-HS] [-bcdefiklmnpqrstuvxPRT] [limit]
  ```

  `ulimit`在允许对进程可用资源进行控制的系统上，为shell启动的进程提供控制。如果给出选项，解释如下：

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

  `-s`：堆栈大小的最大值。

  `-t`：CPU时间的最大量。

  `-u`：单个用户可用的进程的最大数目。

  `-v`：shell及其子进程可用的虚拟内存的最大量，以及在某些系统上可用的内存。

  `-x`：文件锁的最大数目。

  `-P`：伪终端的最大数目。

  `-R`：实时进程在阻塞之前可以运行的最长时间，以微秒为单位。

  `-T`：线程的最大数目。如果提供了limit，并且未使用-a选项，则limit是指定资源的新值。特殊的limit值`hard`、`soft`和`unlimited`分别表示当前的硬限制、软限制和无限制。一旦设置了硬限制，非root用户就无法将其增加；软限制可以增加到硬限制的值。否则，打印指定资源的当前软限制的值，除非提供了-H选项。当指定多个资源时，在值之前打印限制名称和单位（如果适用）。在设置新限制时，如果未提供-H或-S，将同时设置硬限制和软限制。如果未提供任何选项，则默认为-f。值以1024字节为增量，除了-t，以秒为单位；-R，以微秒为单位；-p，以512字节块为单位；-P、-T、-b、-k、-n和-u为未缩放的值；在POSIX模式下（参见[Bash POSIX Mode](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)）的-c和-f，以512字节为增量。除非提供了无效的选项或参数，或在设置新限制时发生错误，否则返回状态为零。

- `unalias`

  ```
  unalias [-a] [name … ]
  ```
  
  从别名列表中移除每个名称。如果提供了`-a`，则移除所有别名。别名在[Aliases](https://www.gnu.org/software/bash/manual/bash.html#Aliases)中描述。





### 4.3 修改Shell行为








#### 4.3.1 内建命令`set`

​	这个内建命令非常复杂，值得有一个独立的部分来介绍。`set`命令允许你改变Shell选项的值，设置位置参数，或者显示Shell变量的名称和值。

- `set`

  ```
  set [-abefhkmnptuvxBCEHPT] [-o option-name] [--] [-] [argument …]
  set [+abefhkmnptuvxBCEHPT] [+o option-name] [--] [-] [argument …]
  ```
  
  如果没有提供选项或参数，`set`会以当前语言环境为基准，按照排序顺序显示所有Shell变量和函数的名称和值，以一种格式显示，可以重新用作设置或重置当前设置的变量的输入。只读变量无法重置。在POSIX模式下，只列出Shell变量。
  
  当提供选项时，它们用于设置或取消Shell属性。如果指定了选项，则具有以下含义：
  
  `-a`：每个创建或修改的变量或函数都被赋予导出属性，并标记为导出到后续命令的环境中。
  
  `-b`：导致终止的后台作业的状态立即报告，而不是在打印下一个主提示符之前。
  
  `-e`: 立即退出，如果一个管道（参见 [Pipelines](https://www.gnu.org/software/bash/manual/bash.html#Pipelines)），其中可能包含一个简单命令（参见 [Simple Commands](https://www.gnu.org/software/bash/manual/bash.html#Simple-Commands)）、一个命令列表（参见 [Lists of Commands](https://www.gnu.org/software/bash/manual/bash.html#Lists)）或一个复合命令（参见 [Compound Commands](https://www.gnu.org/software/bash/manual/bash.html#Compound-Commands)）返回非零状态。如果失败的命令是紧随 `while` 或 `until` 关键字的命令列表的一部分、`if` 语句中的测试的一部分、`&&` 或 `||` 列表中除了最后一个命令外的任何命令、管道中的所有命令除了最后一个命令，或者命令的返回状态被倒置（`!`），则 shell 不会退出。如果复合命令（除了子 shell）在 `-e` 被忽略时返回了非零状态，shell 也不会退出。如果设置了 `ERR` 的陷阱，则在 shell 退出之前会执行该陷阱。
  
  此选项适用于 shell 环境和每个子 shell 环境（参见 [Command Execution Environment](https://www.gnu.org/software/bash/manual/bash.html#Command-Execution-Environment)），可能会导致子 shell 在执行完子 shell 中的所有命令之前退出。如果复合命令或 shell 函数在忽略 `-e` 的情况下执行，在复合命令或函数体中执行的所有命令都不会受 `-e` 设置的影响，即使设置了 `-e` 并且某个命令返回了失败状态。
  
  ​	如果复合命令或 shell 函数在忽略 `-e` 的情况下设置了 `-e`，则该设置直到复合命令或包含函数调用的命令完成后才会生效。
  
  `-f`：禁用文件名扩展（通配）。
  
  `-h`：在查找执行命令时定位并记住（哈希）它们。此选项默认启用。
  
  `-k`：所有以赋值语句形式的参数都被放置在命令的环境中，而不仅仅是在命令名之前的参数。
  
  `-m`：启用作业控制（参见[Job Control](https://www.gnu.org/software/bash/manual/bash.html#Job-Control)）。所有进程运行在单独的进程组中。当后台作业完成时，Shell会打印一行包含其退出状态的信息。
  
  `-n`：读取命令但不执行。这可用于检查脚本的语法错误。此选项在交互式Shell中被忽略。
  
  `-o option-name`：设置与选项名称对应的选项： 
  
  
  
  - allexport`：等同于`-a`。
  
  - `braceexpand`：等同于`-B`。
  - `emacs`：使用`emacs`风格的行编辑界面（参见[Command Line Editing](https://www.gnu.org/software/bash/manual/bash.html#Command-Line-Editing)）。这也会影响到`read -e`使用的编辑界面。
  - `errexit`：等同于`-e`。
  - `errtrace`：等同于`-E`。
  - `functrace`：等同于`-T`。
  - `hashall`：等同于`-h`。
  - `histexpand`：等同于`-H`。
  - `history`：启用命令历史记录，如[Bash History Facilities](https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Facilities)中所述。此选项在交互式Shell中默认开启。
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
  - `posix`：更改Bash的行为，使其与POSIX标准不同的默认操作匹配，以符合该标准（参见[Bash POSIX Mode](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)）。这旨在使Bash行为与该标准的严格超集一致。
  - `privileged`：等同于`-p`。
  - `verbose`：等同于`-v`。
  - `vi`：使用`vi`风格的行编辑界面。这也会影响到`read -e`使用的编辑界面。
  - `xtrace`：等同于`-x`。
  
  
  
  `-p`：启用特权模式。在此模式下，不会处理`$BASH_ENV`和`$ENV`文件，Shell函数不会从环境中继承，并且忽略环境中的`SHELLOPTS`、`BASHOPTS`、`CDPATH`和`GLOBIGNORE`变量。如果Shell的有效用户（组）ID不等于真实用户（组）ID，并且未提供`-p`选项，则执行这些操作，并将有效用户ID设置为真实用户ID。如果在启动时提供了`-p`选项，则不会重置有效用户ID。关闭此选项会将有效用户和组ID设置为真实用户和组ID。
  
  `-r`：启用受限Shell模式。一旦设置了此选项，就无法取消设置。
  
  `-t`：在读取并执行一条命令后退出。
  
  `-u`：对于未设置的变量和参数（除了特殊参数`@`或`*`，或者以`@`或`*`为下标的数组变量），在执行参数扩展时将其视为错误。错误消息将被写入标准错误，非交互式Shell将退出。
  
  `-v`：打印Shell的输入行。
  
  `-x`：在扩展之后、执行之前，打印简单命令、`for`命令、`case`命令、`select`命令和算术`for`命令及其参数或关联的单词列表的跟踪信息。将扩展后的`PS4`变量的值展开并打印在命令及其展开后的参数之前。
  
  `-B`：Shell将执行大括号扩展（参见[Brace Expansion](https://www.gnu.org/software/bash/manual/bash.html#Brace-Expansion)）。此选项默认开启。
  
  `-C`：防止使用`>`、`>&`和`<>`进行输出重定向时覆盖现有文件。
  
  `-E`：如果设置了该选项，则`ERR`陷阱将被Shell函数、命令替换和在子Shell环境中执行的命令继承。通常情况下，`ERR`陷阱在这些情况下不会被继承。
  
  `-H`：启用`!`风格的历史替换（参见[History Expansion](https://www.gnu.org/software/bash/manual/bash.html#History-Interaction)）。此选项在交互式Shell中默认开启。
  
  `-P`：如果设置了该选项，则在执行诸如`cd`更改当前目录的命令时，不会解析符号链接。而是使用物理目录。默认情况下，Bash在执行更改当前目录的命令时遵循目录的逻辑链。
  
  例如，如果`/usr/sys`是指向`/usr/local/sys`的符号链接，则：
  
  ```sh
  $ cd /usr/sys; echo $PWD
  /usr/sys
  $ cd ..; pwd
  /usr
  ```
  
  如果打开了`set -P`，则：
  
  ```sh
  $ cd /usr/sys; echo $PWD
  /usr/local/sys
  $ cd ..; pwd
  /usr/local
  ```
  
  `-T`：如果设置了该选项，则`DEBUG`和`RETURN`陷阱将被Shell函数、命令替换和在子Shell环境中执行的命令继承。通常情况下，`DEBUG`和`RETURN`陷阱在这些情况下不会被继承。
  
  `--`：如果此选项后没有跟随任何参数，则位置参数将被取消设置。否则，位置参数将设置为这些参数，即使其中一些参数以`-`开头。
  
  `-`：标志选项的结束，导致所有剩余的参数都被分配给位置参数。关闭`-x`和`-v`选项。如果没有参数，则位置参数保持不变。
  
  使用`+`而不是`-`会关闭这些选项。这些选项也可以在Shell启动时使用。当前设置的选项可以在`$-`中找到。剩余的N个参数是位置参数，按顺序分配给`$1`、`$2`、…`$N`。
  
  特殊参数`#`的值被设置为N。除非提供了无效的选项，否则返回状态始终为零。





#### 4.3.2  `shopt`内建命令

​	这个内建命令允许你改变其他可选的Shell行为。

- `shopt`

  ```
  shopt [-pqsu] [-o] [optname …]
  ```
  
  切换控制可选Shell行为的设置的值。这些设置可以是下面列出的选项，或者如果使用了`-o`选项，则可以是`set`内建命令（参见[内建命令`set`](https://chat.openai.com/c/afdf90c9-b0cc-4043-9b72-a06269cc6bcd#431内建命令set)）的`-o`选项可用的选项。如果没有选项或使用了`-p`选项，则会显示所有可设置选项的列表，并指示每个选项是否设置；如果提供了`optname`，则输出将限制为这些选项。`-p`选项会以可重用为输入的形式显示输出。其他选项的含义如下：
  
  `-s`：启用（设置）每个`optname`。
  
  `-u`：禁用（取消设置）每个`optname`。
  
  `-q`：抑制正常输出；返回状态指示`optname`是否设置或未设置。如果使用`-q`给出了多个`optname`参数，则如果所有`optname`都已启用，则返回状态为零；否则为非零。
  
  `-o`：将`optname`的值限制为`set`内建命令（参见[内建命令`set`](https://chat.openai.com/c/afdf90c9-b0cc-4043-9b72-a06269cc6bcd#431内建命令set)）的`-o`选项定义的值。
  
  如果`-s`或`-u`与没有`optname`参数一起使用，则`shopt`仅显示设置或未设置的选项。
  
  除非另有说明，`shopt`选项默认禁用（关闭）。
  
  列出选项时，如果所有`optname`都已启用，则返回状态为零，否则为非零。设置或取消设置选项时，除非`optname`不是一个有效的Shell选项，否则返回状态为零。
  
  `shopt`选项列表如下：
  
  
  
  `assoc_expand_once`：如果设置，Shell在算术表达式求值期间抑制对关联数组下标的多次求值，同时执行可以进行变量赋值的内建命令，并执行执行数组解引用的内建命令。
  
  `autocd`：如果设置，以目录名为命令名的命令将被执行，就像它是`cd`命令的参数一样。此选项仅由交互式Shell使用。
  
  `cdable_vars`：如果设置，对于`cd`内建命令的参数，如果不是一个目录，则假定它是一个变量的名称，其值是要切换到的目录。
  
  `cdspell`：如果设置，`cd`命令中目录组成部分的拼写错误将被纠正。检查的错误包括字符转置、缺失字符和多余字符。如果发现修正，将打印修正后的路径，并继续执行命令。此选项仅由交互式Shell使用。
  
  `checkhash`：如果设置，Bash在尝试执行哈希表中找到的命令之前检查命令是否存在。如果哈希的命令不再存在，则执行正常的路径搜索。
  
  `checkjobs`：如果设置，Bash在退出交互式Shell之前列出所有停止和正在运行的作业的状态。如果有任何作业正在运行，这会导致退出被推迟，直到尝试在没有中间命令的情况下进行第二次退出（参见[作业控制](https://www.gnu.org/software/bash/manual/bash.html#作业控制)）。如果有任何作业停止，Shell总是推迟退出。
  
  `checkwinsize`：如果设置，Bash在每个外部（非内建）命令之后检查窗口大小，并在必要时更新`LINES`和`COLUMNS`的值。此选项默认启用。
  
  `cmdhist`：如果设置，Bash尝试将多行命令的所有行保存在同一个历史条目中。这样可以轻松重新编辑多行命令。此选项默认启用，但仅在命令历史记录启用时才有效（参见[命令历史记录](https://www.gnu.org/software/bash/manual/bash.html#命令历史记录)）。
  
  `compat31` 
  
  `compat32` 
  
  `compat40` 
  
  `compat41` 
  
  `compat42` 
  
  `compat43` 
  
  `compat44`：控制Shell的兼容模式的一些方面（参见[Shell兼容模式](https://www.gnu.org/software/bash/manual/bash.html#Shell兼容模式)）。
  
  `complete_fullquote`：如果设置，Bash在执行补全时引用文件名和目录名中的所有Shell元字符。如果未设置，Bash会从要补全的单词中移除Shell变量引用中的元字符，例如美元符号。这意味着不会引用扩展到目录的变量名中的美元符号；但是，文件名中的任何美元符号也不会被引用。这仅在Bash使用反斜杠引用补全的文件名时生效。此变量默认设置，这是Bash版本通过4.2时的默认行为。
  
  `direxpand`：如果设置了该选项，则在执行文件名补全时，Bash会将目录名替换为单词展开的结果。这会更改Readline编辑缓冲区的内容。如果未设置该选项，则Bash会尝试保留用户键入的内容。
  
  `dirspell`：如果设置了该选项，则在单词补全期间，如果最初提供的目录名称不存在，Bash会尝试对目录名称进行拼写纠正。
  
  `dotglob`：如果设置了该选项，则在文件名展开的结果中包括以`.`开头的文件名。文件名`.`和`..`始终需要显式匹配，即使设置了`dotglob`。
  
  `execfail`：如果设置了该选项，则非交互式Shell在无法执行作为`exec`内建命令参数指定的文件时不会退出。如果`exec`失败，交互式Shell不会退出。
  
  `expand_aliases`：如果设置了该选项，则按照下面的[别名](https://www.gnu.org/software/bash/manual/bash.html#Aliases)中所述进行别名扩展。此选项在交互式Shell中默认启用。
  
  `extdebug`：如果在Shell启动时设置了该选项，或者在Shell启动文件中设置了该选项，Shell在启动之前会执行调试器配置文件，与`--debugger`选项相同。如果在启动后设置了该选项，则启用供调试器使用的行为： 
  
  - `declare`内建命令（参见[内建命令`declare`](https://chat.openai.com/c/afdf90c9-b0cc-4043-9b72-a06269cc6bcd#43.2.3)）的`-F`选项显示与每个函数名作为参数所对应的源文件名和行号。
  
  - 如果由`DEBUG`陷阱运行的命令返回非零值，则跳过下一条命令而不执行。
  
  - 如果由`DEBUG`陷阱运行的命令返回值为2，并且Shell正在执行子例程（Shell函数或由内建命令`.`或`source`执行的Shell脚本），则Shell模拟对`return`的调用。`BASH_ARGC`和`BASH_ARGV`将根据它们的描述更新，如其描述所示（参见[Bash变量](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)）。
  
  - 启用函数跟踪：命令替换、Shell函数和使用`( command )`调用的子Shell继承`DEBUG`和`RETURN`陷阱。
  
  - 启用错误跟踪：命令替换、Shell函数和使用`( command )`调用的子Shell继承`ERR`陷阱。
  
  
  
  
  `extglob`：如果设置了该选项，则启用上面描述的[扩展模式匹配特性](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)。
  
  `extquote`：如果设置了该选项，则在双引号括起来的`${parameter}`扩展内执行`$'string'`和`$"string"`引用。此选项默认启用。
  
  `failglob`：如果设置了该选项，则在文件名展开期间，无法匹配文件名的模式导致展开错误。
  
  `force_fignore`：如果设置了该选项，并且`FIGNORE` Shell变量指定的后缀在执行单词补全时导致要忽略的单词，即使被忽略的单词是唯一可能的补全项，也会被忽略。有关`FIGNORE`的描述，请参见[Bash变量](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)。此选项默认启用。
  
  `globasciiranges`：如果设置了该选项，则在模式匹配的括号表达式（参见[模式匹配](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)）中使用的范围表达式在比较时的行为类似于传统的C语言环境。也就是说，不考虑当前区域设置的排序序列，因此`b`不会排在`A`和`B`之间，大写字母和小写字母的ASCII字符将进行排序。
  
  `globskipdots`：如果设置了该选项，则文件名展开将永远不会匹配文件名`.`和`..`，即使模式以`.`开头。此选项默认启用。
  
  `globstar`：如果设置了该选项，则在文件名展开上下文中使用的模式`**`将匹配所有文件、零个或多个目录和子目录。如果模式后跟`/`，则只匹配目录和子目录。
  
  `gnu_errfmt`：如果设置了该选项，则Shell错误消息以标准的GNU错误消息格式编写。
  
  `histappend`：如果设置了该选项，则在Shell退出时，历史记录列表将附加到`HISTFILE`变量指定的文件中，而不是覆盖该文件。
  
  `histreedit`：如果设置了该选项，并且正在使用Readline，则允许用户重新编辑失败的历史记录替换。
  
  `histverify`：如果设置了该选项，并且正在使用Readline，则历史记录替换的结果不会立即传递给Shell解析器。相反，结果行加载到Readline编辑缓冲区中，允许进一步修改。
  
  `hostcomplete`：如果设置了该选项，并且正在使用Readline，当正在进行单词补全的单词中包含`@`时，Bash将尝试执行主机名补全（参见[让Readline为您键入](https://www.gnu.org/software/bash/manual/bash.html#Commands-For-Completion)）。此选项默认启用。
  
  `huponexit`：如果设置了该选项，并且交互式登录Shell退出时，Bash将向所有作业发送`SIGHUP`信号（参见[信号](https://www.gnu.org/software/bash/manual/bash.html#Signals)）。
  
  `inherit_errexit`：如果设置了该选项，则命令替换在子Shell环境中继承`errexit`选项的值，而不是在子Shell环境中取消设置该选项。在启用POSIX模式时，此选项被启用。
  
  `interactive_comments`: 允许以`#`开头的单词在交互式 shell 中被忽略，以及忽略该行上的所有剩余字符。此选项默认启用。
  
  `lastpipe`: 如果设置了该选项，并且作业控制未激活，Shell 在当前 Shell 环境中运行管道的最后一个未在后台执行的命令。
  
  `lithist`: 如果启用了该选项，并且启用了 `cmdhist` 选项，则多行命令将保存到历史记录中，而不是使用分号作为分隔符。
  
  `localvar_inherit`: 如果设置了该选项，局部变量将继承在之前作用域中具有相同名称的变量的值和属性，然后再分配新值。`nameref` 属性不会被继承。
  
  `localvar_unset`: 如果设置了该选项，在先前的函数作用域中对局部变量调用 `unset` 将标记它们，以便在函数返回之前，后续的查找将发现它们未设置。这与在当前函数作用域中取消设置局部变量的行为相同。
  
  `login_shell`: 如果 Shell 作为登录 Shell 启动，则设置此选项（参见[Invoking Bash](https://www.gnu.org/software/bash/manual/bash.html#Invoking-Bash)）。该值不可更改。
  
  `mailwarn`: 如果设置了该选项，并且 Bash 在上次检查以来访问了用于检查邮件的文件，则显示消息 `"The mail in mailfile has been read"`。
  
  `no_empty_cmd_completion`: 如果设置了该选项，并且正在使用 Readline，当尝试在空行上进行补全时，Bash 不会尝试在 `PATH` 中搜索可能的补全项。
  
  `nocaseglob`: 如果设置了该选项，Bash 在执行文件名扩展时以不区分大小写的方式匹配文件名。
  
  `nocasematch`: 如果设置了该选项，Bash 在执行 `case` 或 `[[` 条件命令（参见[Conditional Constructs](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）时以不区分大小写的方式匹配模式，以及在执行模式替换单词扩展或作为可编程补全的一部分过滤可能的补全项时。
  
  `noexpand_translation`: 如果设置了该选项，Bash 在 $"..." 引用的翻译结果中使用单引号而不是双引号。如果字符串没有被翻译，这将没有影响。
  
  `nullglob`: 如果设置了该选项，Bash 允许未匹配任何文件的文件名模式扩展为空字符串，而不是它们自己。
  
  `patsub_replacement`: 如果设置了该选项，Bash 将替换模式替换的替换字符串中的 `&` 为与该模式匹配的文本，如上所述（参见[Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。此选项默认启用。
  
  `progcomp`: 如果设置了该选项，将启用可编程补全功能（参见[Programmable Completion](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。此选项默认启用。
  
  `progcomp_alias`: 如果设置了该选项，并且启用了可编程补全，Bash 将把没有任何补全项的命令名称视为可能的别名，并尝试进行别名扩展。如果存在别名，Bash 将尝试使用扩展的别名结果作为命令单词进行可编程补全。
  
  `promptvars`: 如果设置了该选项，在扩展后，提示字符串将经历参数扩展、命令替换、算术扩展和去除引号的过程，如下所述（参见[Controlling the Prompt](https://www.gnu.org/software/bash/manual/bash.html#Controlling-the-Prompt)）。此选项默认启用。
  
  `restricted_shell`: 如果 Shell 在受限模式下启动，则设置此选项（参见[The Restricted Shell](https://www.gnu.org/software/bash/manual/bash.html#The-Restricted-Shell)）。该值不可更改。在执行启动文件时不会重置该选项，从而允许启动文件发现是否限制了 Shell。
  
  `shift_verbose`: 如果设置了该选项，`shift` 内置命令在移位计数超过位置参数的数量时会打印错误消息。
  
  `sourcepath`: 如果设置了该选项，`.` (`source`) 内置命令将使用 `PATH` 的值来查找包含作为参数提供的文件的目录。此选项默认启用。
  
  `varredir_close`: 如果设置了该选项，Shell 在命令完成时会自动关闭使用 `{varname}` 重定向语法（参见[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）分配的文件描述符，而不是在命令完成时将它们保持打开状态。
  
  `xpg_echo`: 如果设置了该选项，`echo` 内置命令默认会展开反斜杠转义序列。





### 4.4 特殊内置命令



​	出于历史原因，POSIX 标准将几个内置命令分类为 *特殊命令* 。当 Bash 在 POSIX 模式下执行时，特殊内置命令在以下三个方面与其他内置命令不同： 

1. 在命令查找期间，特殊内置命令在 shell 函数之前找到。
5. 如果特殊内置命令返回错误状态，非交互式 shell 将退出。
6. 在命令完成后，命令之前的赋值语句在 shell 环境中保持生效。

​	当 Bash 不在 POSIX 模式下执行时，这些内置命令的行为与其他 Bash 内置命令没有区别。Bash POSIX 模式的说明见[Bash POSIX 模式](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)。

​	以下是 POSIX 的特殊内置命令：

```sh
break : . continue eval exec exit export readonly return set
shift trap unset
```





## 5 Shell 变量

​	本章描述了 Bash 使用的 shell 变量。Bash 自动为多个变量分配默认值。






### 5.1 Bourne Shell 变量

​	Bash 使用某些 Bourne shell 中的 shell 变量。在某些情况下，Bash 会为变量分配默认值。

- `CDPATH`

  以冒号分隔的目录列表，用作 `cd` 内置命令的搜索路径。

- `HOME`

  当前用户的主目录；`cd` 内置命令的默认值。该变量的值也用于波浪线扩展（参见[Tilde Expansion](https://www.gnu.org/software/bash/manual/bash.html#Tilde-Expansion)）。

- `IFS`

  字段分隔符列表；在 shell 拆分单词时使用。

- `MAIL`

  如果将此参数设置为文件名或目录名，并且未设置 `MAILPATH` 变量，则 Bash 会通知用户邮件到达指定的文件或 Maildir 格式目录。

- `MAILPATH`

  以冒号分隔的文件名列表，shell 定期检查其中的新邮件。每个列表条目都可以通过使用 `?` 将文件名与消息分隔来指定在邮件文件中到达新邮件时要打印的消息。在消息的文本中使用 `$_` 可以展开为当前邮件文件的名称。

- `OPTARG`

  `getopts` 内置命令处理的最后一个选项参数的值。

- `OPTIND`

  `getopts` 内置命令处理的最后一个选项参数的索引。

- `PATH`

  以冒号分隔的目录列表，shell 在其中查找命令。`PATH` 的值中的零长度（空）目录名称表示当前目录。空目录名称可以出现为两个相邻的冒号，或者作为初始或尾随冒号。

- `PS1`

  主提示字符串。默认值为 `\s-\v\$ `。在显示 `PS1` 之前，会展开所有转义序列。完整的转义序列列表请参见[Controlling the Prompt](https://www.gnu.org/software/bash/manual/bash.html#Controlling-the-Prompt)。

- `PS2`

  次要提示字符串。默认值为 `> `。在显示 `PS2` 之前，会像展开 `PS1` 一样进行展开。





### 5.2 Bash 变量

​	这些变量由 Bash 设置或使用，但其他 shell 通常不会对它们特殊处理。

​	Bash 使用的一些变量在不同的章节中进行了描述：用于控制作业控制功能的变量（参见[作业控制变量](https://www.gnu.org/software/bash/manual/bash.html#Job-Control-Variables)）。

- `_`

  （`$_`，下划线）在 shell 启动时，设置为用于调用环境或参数列表中传递的正在执行的 shell 或 shell 脚本的路径名。随后，在展开之后，扩展为前台执行的上一个简单命令的最后一个参数。还设置为执行的每个命令的完整路径名，并放置在导出给该命令的环境中。在检查邮件时，此参数保存邮件文件的名称。

- `BASH`

  用于执行当前 Bash 实例的完整路径名。

- `BASHOPTS`

  以冒号分隔的启用的 shell 选项列表。列表中的每个单词都是 `shopt` 内置命令的 -s 选项的有效参数（参见[shopt 内置命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。在 `BASHOPTS` 中出现的选项是由 `shopt` 报告为 `on` 的选项。如果此变量在 Bash 启动时存在于环境中，在读取任何启动文件之前，列表中的每个 shell 选项都将被启用。此变量为只读。

- `BASHPID`

  扩展为当前 Bash 进程的进程 ID。这与某些情况下的 `$$` 不同，例如不需要重新初始化 Bash 的子 shell。对 `BASHPID` 的赋值没有影响。如果 `BASHPID` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_ALIASES`

  一个关联数组变量，其成员对应 `alias` 内置命令维护的内部别名列表（参见[波恩 Shell 内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。添加到此数组的元素将出现在别名列表中；但是，当前取消设置数组元素不会导致别名从别名列表中删除。如果 `BASH_ALIASES` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_ARGC`

  一个数组变量，其值是当前 bash 执行调用堆栈中每个帧中的参数数目。当前子例程（shell 函数或使用 `.` 或 `source` 执行的脚本）的参数数目在堆栈的顶部。执行子例程时，传递的参数数目被推入 `BASH_ARGC`。只有在扩展调试模式下（参见[shopt 内置命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)的 `extdebug` 选项的描述）时，shell 才设置 `BASH_ARGC`。在脚本开始执行后设置 `extdebug` 或在 `extdebug` 未设置时引用此变量可能导致值不一致。

- `BASH_ARGV`

  一个数组变量，其中包含当前 bash 执行调用堆栈中的所有参数。最后一个子例程调用的参数位于堆栈的顶部；初始调用的第一个参数位于底部。执行子例程时，提供的参数被推入 `BASH_ARGV`。只有在扩展调试模式下（参见[shopt 内置命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)的 `extdebug` 选项的描述）时，shell 才设置 `BASH_ARGV`。在脚本开始执行后设置 `extdebug` 或在 `extdebug` 未设置时引用此变量可能导致值不一致。

- `BASH_ARGV0`

  引用时，此变量扩展为 shell 或 shell 脚本的名称（与 `$0` 相同；有关特殊参数 0 的描述，请参见[特殊参数](https://www.gnu.org/software/bash/manual/bash.html#Special-Parameters)）。对 `BASH_ARGV0` 的赋值也会将值分配给 `$0`。如果 `BASH_ARGV0` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_CMDS`

  一个关联数组变量，其成员对应 `hash` 内置命令维护的内部命令哈希表（参见[波恩 Shell 内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。添加到此数组的元素将出现在哈希表中；但是，当前取消设置数组元素不会导致命令名称从哈希表中删除。如果 `BASH_CMDS` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_COMMAND`

  当前正在执行或即将执行的命令，除非 shell 作为陷阱的结果执行命令，在这种情况下，它是陷阱发生时的命令。如果 `BASH_COMMAND` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_COMPAT`

  此值用于设置 shell 的兼容性级别。有关各种兼容性级别及其影响的描述，请参见[Shell Compatibility Mode](https://www.gnu.org/software/bash/manual/bash.html#Shell-Compatibility-Mode)。该值可以是十进制数（例如，4.2）或整数（例如，42），对应于所需的兼容性级别。如果 `BASH_COMPAT` 未设置或设置为空字符串，则兼容性级别将设置为当前版本的默认值。如果 `BASH_COMPAT` 设置为不是有效兼容性级别之一的值，则 shell 打印错误消息并将兼容性级别设置为当前版本的默认值。有效值对应于下面描述的兼容性级别（参见[Shell Compatibility Mode](https://www.gnu.org/software/bash/manual/bash.html#Shell-Compatibility-Mode)）。例如，4.2 和 42 是有效值，对应于 `compat42` 的 `shopt` 选项，并将兼容性级别设置为 42。当前版本也是一个有效值。

- `BASH_ENV`

  如果在调用 Bash 执行 shell 脚本时设置了此变量，则其值会扩展并用作在执行脚本之前读取的启动文件的名称。有关详细信息，请参见[Bash 启动文件](https://www.gnu.org/software/bash/manual/bash.html#Bash-Startup-Files)。

- `BASH_EXECUTION_STRING`

  传递给 -c 选项的命令参数。

- `BASH_LINENO`

  一个数组变量，其成员是源文件中每个相应的 `FUNCNAME` 成员被调用的行号。`${BASH_LINENO[$i]}` 是源文件（`${BASH_SOURCE[$i+1]}`）中调用 `${FUNCNAME[$i]}` 的行号（或者在另一个 shell 函数内引用时为 `${BASH_LINENO[$i-1]}`）。使用 `LINENO` 获取当前行号。

- `BASH_LOADABLES_PATH`

  以冒号分隔的目录列表，用于指定 `enable` 命令加载的动态可加载内建命令。

- `BASH_REMATCH`

  一个数组变量，其成员由 `=~` 二进制运算符分配给 `[[` 条件命令（参见[条件构造](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）。索引为 0 的元素是与整个正则表达式匹配的部分。索引为 n 的元素是与第 n 个括号子表达式匹配的部分。

- `BASH_SOURCE`

  一个数组变量，其成员是 `FUNCNAME` 数组变量中相应的 shell 函数名所定义的源文件名。`${FUNCNAME[$i]}` 在文件 `${BASH_SOURCE[$i]}` 中定义，并从 `${BASH_SOURCE[$i+1]}` 调用。

- `BASH_SUBSHELL`

  在每个子 shell 或子 shell 环境中增加一。初始值为 0。如果 `BASH_SUBSHELL` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `BASH_VERSINFO`

  

  - `BASH_VERSINFO[0]`: The major version number (the *release*). 主版本号（*release*）。

  - `BASH_VERSINFO[1]`: The minor version number (the *version*).次版本号（*version*）。

  - `BASH_VERSINFO[2]`: The patch level. 补丁级别。

  - `BASH_VERSINFO[3]`: The build version.构建版本。

  - `BASH_VERSINFO[4]`: The release status (e.g., `beta1`).发布状态（例如 `beta1`）。

  - `BASH_VERSINFO[5]`: The value of `MACHTYPE`.`MACHTYPE` 的值。

  

- `BASH_VERSION`

  当前 Bash 实例的版本号。

- `BASH_XTRACEFD`

  如果设置为与有效文件描述符对应的整数，Bash 将把启用 `set -x` 时生成的跟踪输出写入该文件描述符。这样可以将跟踪输出与诊断和错误消息分开。当 `BASH_XTRACEFD` 未设置或赋予新值时，文件描述符将关闭。将 `BASH_XTRACEFD` 取消设置或将其赋值为空字符串将导致跟踪输出发送到标准错误。请注意，将 `BASH_XTRACEFD` 设置为 2（标准错误文件描述符），然后取消设置它将导致关闭标准错误。

- `CHILD_MAX`

  设置 shell 记住的已退出子进程状态值的数量。Bash 不允许将此值减少到 POSIX 规定的最小值，并且有一个最大值（当前为 8192）不能超过该值。最小值取决于系统。

- `COLUMNS`

  `select` 命令用于确定打印选择列表时的终端宽度。如果启用了 `checkwinsize` 选项（参见[shopt 内置命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），或在交互式 shell 接收到 `SIGWINCH` 信号时自动设置。

- `COMP_CWORD`

  `${COMP_WORDS}` 中包含当前光标位置所在单词的索引。此变量仅在由可编程补全功能调用的 shell 函数中可用（参见[可编程补全](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。

- `COMP_LINE`

  当前命令行。此变量仅在由可编程补全功能调用的 shell 函数和外部命令中可用（参见[可编程补全](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。

- `COMP_POINT`

  当前光标位置相对于当前命令开头的索引。如果当前光标位置位于当前命令的末尾，则该变量的值等于 `${#COMP_LINE}`。此变量仅在由可编程补全功能调用的 shell 函数和外部命令中可用（参见[可编程补全](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。

- `COMP_TYPE`

  设置为与尝试的补全类型对应的整数值，导致调用补全函数：`TAB` 表示正常补全，`?` 表示连续按制表符后的补全列表，`!` 表示部分单词补全时列出替代项，`@` 表示如果单词未被修改，则列出补全项，`%` 表示菜单补全。此变量仅在由可编程补全功能调用的 shell 函数和外部命令中可用（参见[可编程补全](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。

- `COMP_KEY`

  用于调用当前补全函数的键（或键序列的最后一个键）。

- `COMP_WORDBREAKS`

  在执行单词补全时，Readline 库将其视为单词分隔符的字符集合。如果 `COMP_WORDBREAKS` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `COMP_WORDS`

  由当前命令行中的单词组成的数组变量。该行按照 Readline 的分割规则进行分割，使用 `COMP_WORDBREAKS` 如上所述。此变量仅在由可编程补全功能调用的 shell 函数中可用（参见[可编程补全](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。

- `COMPREPLY`

  一个数组变量，Bash 从可编程补全功能调用的 shell 函数生成的可能补全选项中读取。每个数组元素包含一个可能的补全选项。

- `COPROC`

  一个数组变量，用于保存匿名协程的输出和输入的文件描述符（参见[协程](https://www.gnu.org/software/bash/manual/bash.html#Coprocesses)）。

- `DIRSTACK`

  一个数组变量，包含目录栈的当前内容。目录按照 `dirs` 内置命令显示的顺序出现在栈中。可以对此数组变量的成员进行赋值以修改已在栈中的目录，但必须使用 `pushd` 和 `popd` 内置命令来添加和删除目录。对此变量的赋值不会改变当前目录。如果 `DIRSTACK` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `EMACS`

  如果 Bash 在启动 shell 时在环境中找到此变量并且值为 `t`，它会假设 shell 在 Emacs shell 缓冲区中运行，并禁用行编辑。

- `ENV`

  当以 POSIX 模式调用交互式 shell 时，会展开并执行类似于 `BASH_ENV` 的变量（参见[Bash 启动文件](https://www.gnu.org/software/bash/manual/bash.html#Bash-Startup-Files)）。

- `EPOCHREALTIME`

  每次引用此参数时，它会展开为自 Unix 纪元以来的秒数，以带有微秒精度的浮点值表示（有关纪元的定义，请参阅 C 库函数 `time` 的文档）。对 `EPOCHREALTIME` 的赋值将被忽略。如果 `EPOCHREALTIME` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `EPOCHSECONDS`

  每次引用此参数时，它会展开为自 Unix 纪元以来的秒数（有关纪元的定义，请参阅 C 库函数 `time` 的文档）。对 `EPOCHSECONDS` 的赋值将被忽略。如果 `EPOCHSECONDS` 未设置，则失去其特殊属性，即使随后重新设置它也是如此。

- `EUID`

  当前用户的有效用户 ID。此变量只读。

- `EXECIGNORE`

  一个以冒号分隔的模式列表（参见[模式匹配](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)），定义在使用 `PATH` 进行命令搜索时要忽略的文件名列表。与这些模式的全路径名匹配的文件不会被视为可执行文件，因此不会用于补全和通过 `PATH` 查找执行命令。这不会影响 `[`、`test` 和 `[[` 命令的行为。命令哈希表中的完整路径名不受 `EXECIGNORE` 影响。可以使用此变量来忽略具有可执行位设置但不是可执行文件的共享库文件。模式匹配遵守 `extglob` shell 选项的设置。

- `FCEDIT`

  由 `fc` 内置命令的 `-e` 选项使用的默认编辑器。

- `FIGNORE`

  一个以冒号分隔的后缀列表，用于执行文件名补全时忽略的后缀。文件名的后缀与 `FIGNORE` 中的任何条目匹配，则会从匹配的文件名列表中排除。示例值为 `.o:~`。

- `FUNCNAME`

  一个数组变量，包含当前执行调用栈中所有 shell 函数的名称。索引为 0 的元素是当前正在执行的任何 shell 函数的名称。底部元素（最高索引的元素）是 `"main"`。此变量仅在执行 shell 函数时存在。对 `FUNCNAME` 的赋值没有效果。如果 `FUNCNAME` 未设置，则失去其特殊属性，即使随后重新设置也是如此。此变量可与 `BASH_LINENO` 和 `BASH_SOURCE` 配合使用。`FUNCNAME` 的每个元素与 `BASH_LINENO` 和 `BASH_SOURCE` 中的元素相对应，以描述调用栈。例如，`${FUNCNAME[$i]}` 是从文件 `${BASH_SOURCE[$i+1]}` 的行号 `${BASH_LINENO[$i]}` 处调用的。使用 `caller` 内建命令可以显示当前的调用栈信息。

- `FUNCNEST`

  如果设置为大于 0 的数值，则定义了最大函数嵌套级别。超过此嵌套级别的函数调用将导致当前命令终止。

- `GLOBIGNORE`

  一个以冒号分隔的模式列表，定义了文件名展开时要忽略的文件名集合。如果文件名匹配文件名展开模式，并且还与 `GLOBIGNORE` 中的模式之一匹配，则它将从匹配列表中移除。模式匹配遵循 `extglob` shell 选项的设置。

- `GROUPS`

  一个数组变量，包含当前用户所属的组列表。对 `GROUPS` 的赋值没有效果。如果 `GROUPS` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `histchars`

  控制历史扩展、快速替换和标记化的字符（参见[历史交互](https://www.gnu.org/software/bash/manual/bash.html#History-Interaction)）。第一个字符是*历史扩展*字符，即表示历史扩展开始的字符，通常为 `!`。第二个字符是*快速替换*字符，当作为行首的第一个字符出现时表示快速替换，通常为 `^`。可选的第三个字符是*注释*字符，当作为单词的第一个字符出现时表示该行的其余部分是注释，通常为 `#`。历史注释字符导致历史替换跳过该行上其余的单词。但不一定会导致 shell 解释器将该行其余部分视为注释。

- `HISTCMD`

  当前命令的历史编号或历史列表中的索引。对 `HISTCMD` 的赋值将被忽略。如果 `HISTCMD` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `HISTCONTROL`

  一个以冒号分隔的值列表，控制在历史列表中保存命令的方式。如果值列表中包含 `ignorespace`，则以空格字符开头的行不会被保存在历史列表中。值为 `ignoredups` 的行将不会保存与前一个历史项匹配的行。值为 `ignoreboth` 是 `ignorespace` 和 `ignoredups` 的简写。值为 `erasedups` 将在保存该行之前从历史列表中删除与当前行匹配的所有前一个行。不在上述列表中的任何值都将被忽略。如果 `HISTCONTROL` 未设置，或者不包含有效值，则 shell 解释器读取的所有行都会保存在历史列表中，但受 `HISTIGNORE` 值的影响。多行复合命令的第二行及后续行不受测试，不管 `HISTCONTROL` 的值如何，都会被添加到历史列表中。

- `HISTFILE`

  命令历史记录保存的文件名。默认值为 `~/.bash_history`。

- `HISTFILESIZE`

  历史文件中包含的最大行数。当给该变量赋值后，历史文件会被截断，如果有必要，以包含不超过该行数的最旧条目。当 shell 退出时，历史文件也会被截断至该大小。如果值为 0，则历史文件被截断为零大小。非数值的值和小于零的数值会禁止截断。在读取任何启动文件后，shell 将默认值设置为 `HISTSIZE` 的值。

- `HISTIGNORE`

  一个以冒号分隔的模式列表，用于决定哪些命令行应保存在历史列表中。每个模式都锚定在行首，并且必须与完整行匹配（不会自动附加隐式的 `*`）。在执行 `HISTCONTROL` 指定的检查后，每个模式都与行进行测试。除了常规 shell 模式匹配字符外，`&` 匹配前一个历史行。`&` 可以使用反斜杠进行转义；在尝试匹配之前将删除反斜杠。多行复合命令的第二行及后续行不受测试，不管 `HISTCONTROL` 的值如何，都会被添加到历史列表中。模式匹配遵循 `extglob` shell 选项的设置。`HISTIGNORE` 综合了 `HISTCONTROL` 的功能。`&` 模式与 `ignoredups` 相同，`[ ]*` 模式与 `ignorespace` 相同。将这两个模式组合起来，用冒号分隔，就提供了 `ignoreboth` 的功能。

- `HISTSIZE`

  历史列表中要记住的命令的最大数量。如果值为 0，则命令不会保存在历史列表中。小于零的数值会导致每个命令都保存在历史列表中（没有限制）。在读取任何启动文件后，shell 将默认值设置为 500。

- `HISTTIMEFORMAT`

  如果设置并且不为空，其值将用作 `strftime` 的格式字符串，用于打印 `history` 内置命令显示的每个历史条目相关联的时间戳。如果设置了此变量，时间戳将写入历史文件，以便在不同的 shell 会话之间保留。这将使用历史注释字符来区分时间戳和其他历史行。

- `HOSTFILE`

  包含与 /etc/hosts 格式相同的文件名，当 shell 需要完成主机名时，将读取该文件。在 shell 运行时，可能会更改可能的主机名完成列表；在更改值后，当尝试主机名完成时，Bash 将把新文件的内容添加到现有列表中。如果设置了 `HOSTFILE`，但没有值，或者没有命名可读取的文件，则 Bash 会尝试读取 /etc/hosts 以获取可能的主机名完成列表。当 `HOSTFILE` 未设置时，主机名列表会被清除。

- `HOSTNAME`

  当前主机的名称。

- `HOSTTYPE`

  描述 Bash 所在计算机的字符串。

- `IGNOREEOF`

  控制 shell 在仅接收到 `EOF` 字符作为唯一输入时的行为。如果设置，该值表示可以连续读取 `EOF` 字符的次数，而不会导致 shell 退出。如果该变量存在但没有数值，或者没有值，则默认值为 10。如果该变量不存在，则 `EOF` 表示 shell 输入的结束。这仅在交互式 shell 中生效。

- `INPUTRC`

  Readline 初始化文件的名称，覆盖默认值 `~/.inputrc`。

- `INSIDE_EMACS`

  如果在 shell 启动时在环境中找到了此变量，Bash 将假定 shell 在 Emacs shell 缓冲区中运行，并根据 `TERM` 的值可能禁用行编辑。

- `LANG`

  用于确定未使用以 `LC_` 开头的变量明确选择的任何类别的区域设置。

- `LC_ALL`

  此变量会覆盖 `LANG` 和任何指定区域设置类别的其他 `LC_` 变量的值。

- `LC_COLLATE`

  此变量确定排序文件名展开结果时使用的排序顺序，并确定文件名展开和模式匹配中范围表达式、等价类和排序序列的行为（参见[文件名展开](https://www.gnu.org/software/bash/manual/bash.html#Filename-Expansion)）。

- `LC_CTYPE`

  此变量确定文件名展开和模式匹配中字符的解释和字符类的行为（参见[文件名展开](https://www.gnu.org/software/bash/manual/bash.html#Filename-Expansion)）。

- `LC_MESSAGES`

  此变量确定用于翻译由 `$` 前缀的双引号括起来的字符串的区域设置（参见[区域设置特定的翻译](https://www.gnu.org/software/bash/manual/bash.html#Locale-Translation)）。

- `LC_NUMERIC`

  此变量确定用于数字格式化的区域设置类别。

- `LC_TIME`

  此变量确定用于日期和时间格式化的区域设置类别。

- `LINENO`

  当前执行的脚本或 shell 函数中的行号。如果 `LINENO` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `LINES`

  `select` 命令使用此变量来确定打印选择列表的列长度。如果启用了 `checkwinsize` 选项（参见[Shopt 内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），或者在交互式 shell 中收到 `SIGWINCH` 信号时，将自动设置该值。

- `MACHTYPE`

  一个字符串，完整描述了 Bash 所在系统类型，采用标准 GNU cpu-company-system 格式。

- `MAILCHECK`

  shell 检查在 `MAILPATH` 或 `MAIL` 变量指定的文件中是否有新邮件的频率（以秒为单位）。默认值为 60 秒。在检查邮件的时间到达之前，shell 会在显示主提示符之前进行检查。如果该变量未设置，或者设置为不大于零的非数值，shell 将禁用邮件检查。

- `MAPFILE`

  一个数组变量，当 `mapfile` 内建命令没有提供变量名称时，用于保存读取的文本。

- `OLDPWD`

  上一个工作目录，由 `cd` 内建命令设置。

- `OPTERR`

  如果设置为值 1，Bash 会显示由 `getopts` 内建命令生成的错误消息。

- `OSTYPE`

  一个字符串，描述 Bash 所运行的操作系统。

- `PIPESTATUS`

  一个数组变量（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)），包含最近执行的前台管道中（可能仅包含一个命令）进程的退出状态值列表。

- `POSIXLY_CORRECT`

  ```sh
  set -o posix
  ```
  
  如果在 Bash 启动时环境中存在此变量，shell 会在读取启动文件之前进入 POSIX 模式（参见[Bash POSIX 模式](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)），就像已经提供了 `--posix` 命令选项一样。如果在 shell 运行时设置了该变量，Bash 会启用 POSIX 模式，就像执行了命令 

  ```sh
  set -o posix
  ```

   一样。当 shell 进入 POSIX 模式时，如果尚未设置该变量，它会将此变量设置为已设置状态。
  
- `PPID`

  shell 的父进程的进程 ID。此变量只读。

- `PROMPT_COMMAND`

  如果此变量被设置并且是一个数组，每个元素的值将被解释为在打印主提示符（`$PS1`）之前执行的命令。如果设置了该变量，但它不是一个数组变量，则其值将被用作替代执行的命令。

- `PROMPT_DIRTRIM`

  如果设置为大于零的数值，该值将用作在扩展 `\w` 和 `\W` 提示字符串转义时要保留的尾部目录组件的数量（参见[控制提示符](https://www.gnu.org/software/bash/manual/bash.html#Controlling-the-Prompt)）。删除的字符将用省略号替换。

- `PS0`

  此参数的值会像 `PS1` 一样扩展，并在交互式 shell 读取命令后、命令执行之前显示。

- `PS3`

  此变量的值将用作 `select` 命令的提示符。如果未设置此变量，`select` 命令会提示 `#?`

- `PS4`

  此参数的值会像 `PS1` 一样扩展，扩展后的值是在设置 -x 选项时（参见[set 内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）在命令行回显之前打印的提示。扩展值的第一个字符会根据需要复制多次，以指示多个间接层级。默认值为 `+ `。

- `PWD`

  当前的工作目录，由 `cd` 内建命令设置。

- `RANDOM`

  每次引用此参数时，它会扩展为一个介于 0 和 32767 之间的随机整数。给此变量赋值将种子化随机数生成器。如果 `RANDOM` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `READLINE_ARGUMENT`

  给使用 `bind -x` 定义的 Readline 命令传递的任何数值参数（参见[Bash 内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)中的 `bind`）。

- `READLINE_LINE`

  Readline 行缓冲区的内容，供 `bind -x` 使用（参见[Bash 内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)中的 `bind`）。

- `READLINE_MARK`

  Readline 行缓冲区中 *标记*（保存的插入点）的位置，供 `bind -x` 使用（参见[Bash 内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)中的 `bind`）。插入点和标记之间的字符通常称为*区域*。

- `READLINE_POINT`

  Readline 行缓冲区中插入点的位置，供 `bind -x` 使用（参见[Bash 内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)中的 `bind`）。

- `REPLY`

  `read` 内建命令的默认变量。

- `SECONDS`

  此变量扩展为自 shell 启动以来经过的秒数。对此变量的赋值会将计数重置为赋值的值，并且扩展值变为赋值的值加上赋值后经过的秒数。在 shell 启动时的秒数和当前时间始终是通过查询系统时钟来确定的。如果 `SECONDS` 未设置，它会失去其特殊属性，即使随后重新设置也是如此。

- `SHELL`

  此环境变量扩展为 shell 的完整路径名。如果在 shell 启动时没有设置它，Bash 会将当前用户的登录 shell 的完整路径名赋给它。

- `SHELLOPTS`

  一个以冒号分隔的启用的 shell 选项列表。列表中的每个单词都是 `set` 内建命令的 `-o` 选项的有效参数（参见[set 内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。`SHELLOPTS` 中出现的选项是由 `set -o` 报告为 `on` 的选项。如果在 Bash 启动时环境中存在此变量，将在读取任何启动文件之前启用列表中的每个 shell 选项。此变量只读。

- `SHLVL`

  每次启动新的 Bash 实例时递增一次。这用于计算你的 Bash shell 嵌套深度的计数。

- `SRANDOM`

  每次引用此参数时，它会扩展为一个 32 位的伪随机数。在支持 /dev/urandom 或 `arc4random` 的系统上，随机数生成器是非线性的，因此返回的每个数与其前面的数没有任何关系。随机数生成器无法种子化，因此对此变量的赋值无效。如果 `SRANDOM` 未设置，则失去其特殊属性，即使随后重新设置也是如此。

- `TIMEFORMAT`

  此参数的值用作格式字符串，指定前缀带有 `time` 保留字的管道的定时信息应如何显示。`%` 字符引入一个转义序列，该序列会扩展为时间值或其他信息。转义序列及其含义如下；大括号表示可选部分。`%%` 一个字面 `%`。`%[p][l]R` 经过的秒数。`%[p][l]U` 用户模式下的 CPU 秒数。`%[p][l]S` 系统模式下的 CPU 秒数。`%P` CPU 百分比，计算方式为 (%U + %S) / %R。可选的 `p` 是指定精度的数字，小数点后的小数位数。值为 0 时不输出小数点或小数位。最多可以指定三位小数点后的数字；大于 3 的 p 值会被更改为 3。如果未指定 p，则使用值 3。可选的 `l` 指定较长的格式，包括分钟，格式为 MMmSS.FFs。p 的值决定是否包含小数部分。如果未设置此变量，Bash 表现得好像它的值为 

  ```sh
  $'\nreal\t%3lR\nuser\t%3lU\nsys\t%3lS'
  ```

  。如果该值为 null，则不显示定时信息。在显示格式字符串时，会添加尾随换行符。

- `TMOUT`

  如果设置为大于零的值，`TMOUT` 会被视为 `read` 内建命令（参见[Bash 内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）的默认超时时间。当输入来自终端时，如果 `TMOUT` 秒内没有输入，`select` 命令（参见[条件结构](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）将终止。在交互式 shell 中，该值被解释为发出主提示符后等待输入行的秒数。如果在那段时间内没有完整的输入行，Bash 会终止。

- `TMPDIR`

  如果设置了，Bash 将使用其值作为目录的名称，在该目录中创建供 shell 使用的临时文件。

- `UID`

  当前用户的实际用户 ID。此变量只读。





## 6 Bash 特性

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

​	调用shell时，可以使用所有与`set`内建命令（参见[set内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）一起使用的单字符选项作为选项。此外，还有一些多字符选项可供使用。这些选项必须出现在命令行中，在单字符选项之前才能被识别。

- `--debugger`

  安排在shell启动之前执行调试器配置文件。打开扩展调试模式（参见[shopt内建命令的extdebug选项](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。

- `--dump-po-strings`

  将所有由`$`前缀的双引号括起来的字符串以GNU `gettext` PO（便携式对象）文件格式打印到标准输出。与-D相当，除了输出格式。

- `--dump-strings`

  等同于-D。

- `--help`

  在标准输出上显示用法信息并成功退出。

- `--init-file filename`

- `--rcfile filename`

  在交互式shell中执行来自文件名的命令（而不是`~/.bashrc`）。

- `--login`

  等同于`-l`。

- `--noediting`

  当shell为交互式时，不使用GNU Readline库（参见[命令行编辑](https://www.gnu.org/software/bash/manual/bash.html#Command-Line-Editing)）读取命令行。

- `--noprofile`

  当Bash作为登录shell被调用时，不加载系统范围的启动文件/etc/profile或任何个人初始化文件`~/.bash_profile`，`~/.bash_login`或`~/.profile`。

- `--norc`

  在交互式shell中不读取~/.bashrc初始化文件。如果以`sh`命令调用shell，则默认启用此选项。

- `--posix`

  将Bash的行为更改为与POSIX标准不同的默认操作以匹配标准。这旨在使Bash的行为成为该标准的严格超集。有关Bash POSIX模式的描述，请参见[Bash POSIX模式](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)。

- `--restricted`

  将shell设为受限shell（参见[受限shell](https://www.gnu.org/software/bash/manual/bash.html#The-Restricted-Shell)）。

- `--verbose`

  等同于`-v`。在读取时将shell输入行打印出来。

- `--version`

  在标准输出上显示此Bash实例的版本信息，并成功退出。

​	在调用时可能提供的几个单字符选项在`set`内建命令中不可用。

- `-c`

  从第一个非选项参数command_string中读取并执行命令，然后退出。如果命令字符串之后还有参数，则将第一个参数赋给`$0`，并将其余参数赋给位置参数。对`$0`的赋值设置了shell的名称，用于警告和错误消息。

- `-i`

  强制shell以交互方式运行。有关交互式shell的描述，请参见[交互式shell](https://www.gnu.org/software/bash/manual/bash.html#Interactive-Shells)。

- `-l`

  使此shell的行为就像直接通过login启动它一样。当shell是交互式的时，这等同于以`exec -l bash`启动登录shell。当shell不是交互式的时，将执行登录shell的启动文件。`exec bash -l`或`exec bash --login`将用Bash登录shell替换当前shell。有关登录shell的特殊行为的描述，请参见[Bash启动文件](https://www.gnu.org/software/bash/manual/bash.html#Bash-Startup-Files)。

- `-r`

  将shell设为受限shell（参见[受限shell](https://www.gnu.org/software/bash/manual/bash.html#The-Restricted-Shell)）。

- `-s`

  如果存在此选项，或者在选项处理之后没有剩余参数，则从标准输入读取命令。此选项允许在调用交互式shell或通过管道读取输入时设置位置参数。

- `-D`

  将所有由`$`前缀的双引号括起来的字符串打印到标准输出。这些是在当前区域设置不是`C`或`POSIX`（参见[区域特定的转换](https://www.gnu.org/software/bash/manual/bash.html#Locale-Translation)）的情况下可能会进行语言转换的字符串。这意味着-n选项；不会执行任何命令。

- `[-+]O [shopt_option]`

  shopt_option是`shopt`内建命令接受的shell选项之一（参见[shopt内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。如果提供了shopt_option，则`-O`设置该选项的值；`+O`取消设置它。如果没有提供shopt_option，则在标准输出上打印`shopt`接受的shell选项的名称和值。如果调用选项为`+O`，则输出以可重用为输入的格式显示。

- `--`

  `--`表示选项的结束，并禁用进一步的选项处理。`--`之后的任何参数都被视为文件名和参数。



*登录shell* 是其参数零的第一个字符为`-`的shell，或者是使用--login选项调用的shell。



*交互式shell* 是没有非选项参数启动的shell，除非指定了-s选项，并且没有指定-c选项，并且其输入和输出都连接到终端（由`isatty(3)`确定），或者是使用-i选项启动的shell。有关更多信息，请参见[交互式shell](https://www.gnu.org/software/bash/manual/bash.html#Interactive-Shells)。

​	如果选项处理后还有参数，并且未提供`-c`或`-s`选项，则假定第一个参数是包含shell命令的文件的名称（参见[Shell脚本](https://www.gnu.org/software/bash/manual/bash.html#Shell-Scripts)）。以这种方式调用Bash时，`$0`被设置为文件的名称，并将位置参数设置为剩余的参数。Bash从该文件读取并执行命令，然后退出。Bash的退出状态是在脚本中执行的最后一个命令的退出状态。如果未执行任何命令，则退出状态为0。





### 6.2 Bash启动文件 Bash Startup Files



​	本节描述Bash如何执行其启动文件。如果任何文件存在但无法读取，Bash将报告错误。文件名中的波浪号将根据上面的"波浪号展开"（参见[Tilde Expansion](https://www.gnu.org/software/bash/manual/bash.html#Tilde-Expansion)）的描述进行展开。

​	交互式shell的详细描述请参见[交互式shell](https://www.gnu.org/software/bash/manual/bash.html#Interactive-Shells)。



#### 作为交互式登录shell调用，或使用--login选项

​	当Bash作为交互式登录shell被调用，或作为使用`--login`选项的非交互式shell被调用时，它首先从文件`/etc/profile`中读取并执行命令（如果该文件存在）。读取完该文件后，它会查找`~/.bash_profile`、`~/.bash_login`和`~/.profile`文件，按顺序读取并执行第一个存在且可读的文件。可以在启动shell时使用`--noprofile`选项来阻止这种行为。

​	当交互式登录shell退出，或者非交互式登录shell执行`exit`内建命令时，如果文件`~/.bash_logout`存在，Bash将从该文件读取并执行命令。



#### 作为交互式非登录shell调用

​	当启动交互式shell但不是登录shell时，Bash从`~/.bashrc`文件中读取并执行命令（如果该文件存在）。可以使用`--norc`选项来阻止这一行为。`--rcfile`选项将强制Bash从指定的文件而不是`~/.bashrc`读取并执行命令。

​	因此，通常你的`~/.bash_profile`包含以下行：

```
if [ -f ~/.bashrc ]; then . ~/.bashrc; fi
```

在（或之前）任何特定于登录的初始化之后



#### 非交互式调用

​	当以非交互方式启动Bash，例如运行一个shell脚本时，它会在环境中查找变量`BASH_ENV`，如果存在该变量，则展开其值，并将展开的值用作要读取和执行的文件名。Bash的行为就像执行了以下命令：

```
if [ -n "$BASH_ENV" ]; then . "$BASH_ENV"; fi
```

但不使用`PATH`变量搜索文件名。

​	正如上面提到的，如果以`--login`选项调用非交互shell，Bash会尝试从登录shell的启动文件中读取并执行命令。

#### 使用名称`sh`调用

​	如果使用名称`sh`调用Bash，则尽量模仿历史版本的`sh`的启动行为，同时也符合POSIX标准。

​	当作为交互式登录shell，或作为使用`--login`选项的非交互式shell调用时，它首先尝试从`/etc/profile`和`~/.profile`文件中读取并执行命令，按照这个顺序。可以使用--noprofile选项来阻止这种行为。当以`sh`的名称作为交互式shell调用时，Bash会查找变量`ENV`，如果定义了该变量，则展开其值，并将展开的值用作要读取和执行的文件名。由于以`sh`的名称调用的shell不尝试从任何其他启动文件中读取和执行命令，因此--rcfile选项无效。以`sh`的名称调用的非交互式shell不会尝试读取任何其他启动文件。

​	当以`sh`的名称调用时，Bash在读取启动文件后进入POSIX模式。



#### 在POSIX模式下调用

​	当使用`--posix`命令行选项启动Bash时，它遵循POSIX标准的启动文件规则。在此模式下，交互式shell展开`ENV`变量，并从文件中读取和执行命令，文件名为展开后的值。不读取其他任何启动文件。



#### 被远程shell守护进程调用

​	Bash试图确定它是否在非交互式模式下运行，例如由历史远程shell守护进程（通常是`rshd`）或安全shell守护进程`sshd`执行时，其标准输入连接到网络连接。如果Bash确定以这种方式在非交互模式下运行，它会从`~/.bashrc`文件中读取并执行命令（如果该文件存在且可读）。如果以`sh`的名称调用，则不会执行此操作。可以使用--norc选项来阻止此行为，`--rcfile`选项可用于强制读取另一个文件，但通常`rshd`和`sshd`不会以这些选项调用shell或允许指定它们。



#### 使用不相等的有效和真实UID/GID调用 Invoked with unequal effective and real UID/GIDs

If Bash is started with the effective user (group) id not equal to the real user (group) id, and the -p option is not supplied, no startup files are read, shell functions are not inherited from the environment, the `SHELLOPTS`, `BASHOPTS`, `CDPATH`, and `GLOBIGNORE` variables, if they appear in the environment, are ignored, and the effective user id is set to the real user id. If the -p option is supplied at invocation, the startup behavior is the same, but the effective user id is not reset.

​	如果Bash以有效用户（组）ID不等于真实用户（组）ID的状态启动，并且未提供-p选项，则不读取启动文件，不继承环境中的shell函数，忽略`SHELLOPTS`、`BASHOPTS`、`CDPATH`和`GLOBIGNORE`变量（如果它们在环境中出现），并将有效用户ID设置为真实用户ID。如果在调用时提供了-p选项，则启动行为相同，但不会重置有效用户ID。



### 6.3 交互式Shell

#### 6.3.1 什么是交互式Shell？

​	交互式Shell是指在没有非选项参数的情况下启动的Shell（除非使用了`-s`选项），且没有使用`-c`选项，并且其输入和错误输出都连接到终端（通过`isatty(3)`确定），或者使用了`-i`选项启动的Shell。

​	交互式Shell通常从用户的终端读取并输出信息。

​	可以使用`-s`选项来设置交互式Shell启动时的位置参数。





#### 6.3.2 此Shell是否为交互式？

​	在启动脚本中，要确定Bash是否以交互式方式运行，可以测试特殊参数`-`的值。当Shell是交互式时，该参数包含字符`i`。例如：

```
case "$-" in
*i*)	echo This shell is interactive ;;
*)	echo This shell is not interactive ;;
esac
```

​	或者，启动脚本可以检查变量`PS1`的值；在非交互式Shell中，该变量未设置，在交互式Shell中设置了该变量。因此：

```
if [ -z "$PS1" ]; then
        echo This shell is not interactive
else
        echo This shell is interactive
fi
```





#### 6.3.3 交互式Shell行为

​	当Shell以交互式方式运行时，它的行为发生变化。

1. 启动文件按照[Bash启动文件](https://www.gnu.org/software/bash/manual/bash.html#Bash-Startup-Files)中描述的方式被读取和执行。
3. 作业控制（参见[作业控制](https://www.gnu.org/software/bash/manual/bash.html#Job-Control)）默认启用。当作业控制生效时，Bash忽略键盘生成的作业控制信号`SIGTTIN`、`SIGTTOU`和`SIGTSTP`。
5. Bash在读取命令的第一行之前，扩展和显示`PS1`，在读取多行命令的第二行及其后续行之前，扩展和显示`PS2`。Bash在读取命令后但在执行之前，扩展和显示`PS0`。完整的提示字符串转义序列列表请参见[控制提示符](https://www.gnu.org/software/bash/manual/bash.html#Controlling-the-Prompt)。
7. Bash在打印主提示符`$PS1`之前，执行`PROMPT_COMMAND`数组变量的所有set元素的值作为命令（参见[Bash变量](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)）。
9. 使用Readline（参见[命令行编辑](https://www.gnu.org/software/bash/manual/bash.html#Command-Line-Editing)）从用户的终端读取命令。
11. Bash检查`set -o`命令的`ignoreeof`选项的值，而不是在读取命令时立即退出，当它的标准输入上收到`EOF`时（参见[set内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。
13. 默认启用命令历史记录（参见[Bash历史记录功能](https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Facilities)）和历史扩展（参见[历史扩展](https://www.gnu.org/software/bash/manual/bash.html#History-Interaction)）。Bash在启用历史记录的Shell退出时将命令历史记录保存到由`$HISTFILE`指定的文件中。
15. 默认执行别名展开（参见[别名](https://www.gnu.org/software/bash/manual/bash.html#Aliases)）。
17. 在没有任何陷阱（trap）的情况下，Bash忽略`SIGTERM`信号（参见[信号](https://www.gnu.org/software/bash/manual/bash.html#Signals)）。
19. 在没有任何陷阱（trap）的情况下，Bash捕获并处理`SIGINT`信号（参见[信号](https://www.gnu.org/software/bash/manual/bash.html#Signals)）。`SIGINT`会中断某些Shell内建命令。
21. 交互式登录Shell在退出时向所有作业发送`SIGHUP`信号，如果已启用`huponexit` Shell选项（参见[信号](https://www.gnu.org/software/bash/manual/bash.html#Signals)）。
23. 忽略-n启动选项，并且`set -n`无效（参见[set内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。
25. Bash将定期检查邮件，这取决于`MAIL`、`MAILPATH`和`MAILCHECK` Shell变量的值（参见[Bash变量](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)）。
27. 在启用了`set -u`后，由于引用了未绑定的Shell变量而导致的扩展错误不会导致Shell退出（参见[set内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。
29. 在`${var:?word}`扩展中，由于var未设置或为空而导致的扩展错误，Shell不会退出（参见[Shell参数扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。
31. 由Shell内建命令遇到的重定向错误不会导致Shell退出。
33. 在POSIX模式下运行时，特殊内建命令返回错误状态不会导致Shell退出（参见[Bash POSIX模式](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)）。
35. `exec`失败不会导致Shell退出（参见[Bourne Shell内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。
37. 解析器语法错误不会导致Shell退出。
39. 如果启用了`cdspell` Shell选项，则Shell会尝试对`cd`内建命令的目录参数进行简单的拼写纠正（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)中对`cdspell`选项的描述）。`cdspell`选项仅在交互式Shell中有效。
41. Shell将检查`TMOUT`变量的值，并在在打印`$PS1`后指定的秒数内未读取命令时退出（参见[Bash变量](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)）。

### 6.4 Bash 条件表达式



​	条件表达式由`[[`复合命令（参见[条件构造](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）和`test`以及`[`内建命令（参见[Bourne Shell内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）使用。`test`和`[`命令根据其参数数量确定其行为；有关这些命令的其他特定行为，请参阅这些命令的描述。

​	表达式可以是一元的或二元的，并且由以下原语形成。一元表达式通常用于检查文件的状态。还有字符串运算符和数值比较运算符。当在表达式中使用时，Bash会对某些文件名进行特殊处理。如果Bash运行的操作系统提供了这些特殊文件，则Bash将使用它们；否则，Bash会在内部模拟它们的行为：如果一个原语的文件参数是形式为`/dev/fd/N`，则会检查文件描述符N。如果一个原语的文件参数是`/dev/stdin`、`/dev/stdout`或`/dev/stderr`之一，则分别检查文件描述符0、1或2。

​	当与`[[`一起使用时，`<`和`>`运算符使用当前语言环境进行字典排序。`test`命令使用ASCII排序。

​	除非另有说明，对文件进行操作的原语会跟随符号链接并对链接目标进行操作，而不是链接本身。

- `-a file`

  如果文件存在，则为真。

- `-b file`

  如果文件存在且是块特殊文件，则为真。

- `-c file`

  如果文件存在且是字符特殊文件，则为真。

- `-d file`

  如果文件存在且是目录，则为真。

- `-e file`

  如果文件存在，则为真。

- `-f file`

  如果文件存在且是普通文件，则为真。

- `-g file`

  如果文件存在且设置了组ID位，则为真。

- `-h file`

  如果文件存在且是符号链接，则为真。

- `-k file`

  如果文件存在且设置了"粘滞"位，则为真。

- `-p file`

  如果文件存在且是命名管道（FIFO），则为真。

- `-r file`

  如果文件存在且可读，则为真。

- `-s file`

  如果文件存在且大小大于零，则为真。

- `-t fd`

  如果文件描述符fd是打开的，并且指向终端，则为真。

- `-u file`

  如果文件存在且设置了用户ID位，则为真。

- `-w file`

  如果文件存在且可写，则为真。

- `-x file`

  如果文件存在且可执行，则为真。

- `-G file`

  如果文件存在且属于有效组ID，则为真。

- `-L file`

  如果文件存在且是符号链接，则为真。

- `-N file`

  如果文件存在且自上次读取以来已被修改，则为真。

- `-O file`

  如果文件存在且属于有效用户ID，则为真。

- `-S file`

  如果文件存在且是套接字，则为真。

- `file1 -ef file2`

  如果file1和file2引用相同的设备和inode号，则为真。

- `file1 -nt file2`

  如果file1比file2新（根据修改日期），或者file1存在而file2不存在，则为真。

- `file1 -ot file2`

  如果file1比file2旧，或者file2存在而file1不存在，则为真。

- `-o optname`

  如果Shell选项optname已启用，则为真。选项列表在`set`内建命令的-o选项描述中（参见[set内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。

- `-v varname`

  如果Shell变量varname已设置（已分配了值），则为真。

- `-R varname`

  如果Shell变量varname已设置，并且是名称引用，则为真。

- `-z string`

  如果字符串的长度为零，则为真。

- `-n string`

- `string`

  如果字符串的长度不为零，则为真。

- `string1 == string2`

- `string1 = string2`

  如果字符串相等，则为真。当与`[[`命令一起使用时，这执行如上所述的模式匹配（参见[条件构造](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）。为了符合POSIX，应在`test`命令中使用`=`。

- `string1 != string2`

  如果字符串不相等，则为真。

- `string1 < string2`

  如果string1按字典顺序排在string2之前，则为真。

- `string1 > string2`

  如果string1按字典顺序排在string2之后，则为真。

- `arg1 OP arg2`

  `OP`可以是`-eq`、`-ne`、`-lt`、`-le`、`-gt`或`-ge`之一。这些算术二元运算符在arg1等于、不等于、小于、小于等于、大于、大于等于arg2时返回true。Arg1和arg2可以是正整数或负整数。当与`[[`命令一起使用时，Arg1和Arg2将作为算术表达式进行计算（参见[Shell算术](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)）。





### 6.5 Shell 算术



​	Shell允许对算术表达式进行求值，可以作为shell扩展的一部分，也可以使用`((`复合命令、`let`内建命令或`declare`内建命令的`-i`选项来进行求值。

​	计算结果是在固定宽度的整数范围内进行的，没有检查溢出，但除以0会被捕获并标记为错误。运算符及其优先级、结合性和值与C语言相同。以下运算符列表按优先级递减的顺序分为相等优先级运算符级别。

- `id++ id--`

  变量后增量和后减量

- `++id --id`

  变量前增量和前减量

- `- +`

  一元负号和正号

- `! ~`

  逻辑和位求反

- `**`

  指数运算

- `* / %`

  乘法、除法、取模

- `+ -`

  加法、减法

- `<< >>`

  左位移和右位移

- `<= >= < >`

  比较运算

- `== !=`

  相等和不相等

- `&`

  位与

- `^`

  位异或

- `|`

  位或

- `&&`

  逻辑与

- `||`

  逻辑或

- `expr ? expr : expr`

  条件运算符

- `= *= /= %= += -= <<= >>= &= ^= |=`

  赋值运算符

- `expr1 , expr2`

  逗号运算符

​	Shell变量可以作为操作数；在表达式求值之前，会进行参数展开。在表达式内部，也可以直接按名称引用Shell变量，无需使用参数展开语法。当通过名称引用一个空或未设置的Shell变量时，会被解释为0，而不使用参数展开语法。当引用变量的值时，它会被当作算术表达式进行求值，或者当给一个通过`declare -i`设置了`integer`属性的变量赋值时。空值将被解释为0。一个Shell变量不需要打开其`integer`属性即可在表达式中使用。

​	整数常量遵循C语言的定义，没有后缀或字符常量。以0开头的常量被解释为八进制数。以`0x`或`0X`开头表示十六进制数。否则，数字采用形式[base`#`]n，其中可选的base是一个表示算术基数的2到64之间的十进制数，n是该基数下的一个数字。如果省略base`#`，则使用十进制数。在指定n时，如果需要一个非数字字符，大于9的数字按小写字母、大写字母、`@`和`_`的顺序来表示。如果base小于或等于36，则可以使用小写和大写字母来交替表示10到35之间的数字。

​	运算符按照优先级顺序进行求值。括号中的子表达式首先进行求值，并可能覆盖上述的优先级规则。





### 6.6 别名



*别名* 允许在简单命令的第一个单词中使用字符串替换。Shell维护一个可以使用`alias`和`unalias`内建命令设置和取消设置的别名列表。

​	每个简单命令的第一个单词（如果未被引用）将被检查是否有别名。如果有别名，该单词将被替换为别名的文本。字符`/`、`$`、`\`、`=`以及上面列出的任何Shell元字符或引用字符都不能出现在别名名称中。替换文本可以包含任何有效的Shell输入，包括Shell元字符。替换文本的第一个单词也会被检查是否有别名，但是如果一个单词与正在展开的别名完全相同，则不会再次展开。这意味着可以将`ls`定义为`"ls -F"`，Bash不会尝试递归展开替换文本。如果别名值的最后一个字符是空格，则别名后面的下一个命令单词也会被检查是否进行别名展开。

​	可以使用`alias`命令创建和列出别名，并使用`unalias`命令删除别名。

​	在替换文本中没有使用类似于`csh`的参数机制。如果需要使用参数，请使用Shell函数（参见[Shell函数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Functions)）。

​	在Shell不是交互式时，别名不会被展开，除非使用`shopt`设置了`expand_aliases` Shell选项（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。

​	关于别名定义和使用的规则有些混乱。Bash在执行任何命令之前，总是至少读取一行完整的输入和构成复合命令的所有行。别名在命令读取时被展开，而不是在执行时展开。因此，出现在另一个命令同一行上的别名定义在下一行输入被读取之前不会生效。该行上别名定义之后的命令不受新别名的影响。这个行为也适用于函数的执行。当读取函数定义时，别名被展开，而不是在函数执行时展开，因为函数定义本身就是一个命令。因此，在函数中定义的别名在执行该函数之后才可用。为了安全起见，始终将别名定义放在单独的一行，并且不要在复合命令中使用`alias`。

​	几乎在所有情况下，Shell函数比别名更为推荐。





### 6.7 数组



​	Bash提供了一维索引数组和关联数组变量。任何变量都可以用作索引数组；`declare`内建命令可以显式声明一个数组。数组大小没有最大限制，成员不需要按顺序进行索引或赋值。索引数组使用整数（包括算术表达式（参见[Shell算术](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)）），索引从0开始；关联数组使用任意字符串。除非另有说明，索引数组索引必须是非负整数。

​	如果使用以下语法将任何变量赋值：

```
name[subscript]=value
```

则会自动创建一个索引数组。子脚本将被视为必须求值为数字的算术表达式。要显式声明一个数组，请使用：

```
declare -a name
```

也可以接受语法：

```
declare -a name[subscript]
```

子脚本将被忽略。

​	使用以下方式创建关联数组：

```
declare -A name
```

​	可以使用`declare`和`readonly`内建命令为数组变量指定属性。每个属性都适用于数组的所有成员。

​	数组可以使用以下形式的复合赋值来进行赋值：

```
name=(value1 value2 … )
```

其中每个值都可以是`[subscript]=`string的形式。索引数组的赋值不需要指定任何东西，只需要字符串即可。在对索引数组赋值时，如果提供了可选的子脚本，该索引将被分配；否则，分配的元素索引是语句中已分配的最后一个索引加一。索引从0开始。

​	列表中的每个值都要经过上面描述的所有Shell扩展（参见[Shell扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)）。

​	当对关联数组赋值时，复合赋值中的单词可以是赋值语句，其中需要子脚本，或者是一系列交替键和值的单词列表：name=(key1 value1 key2 value2 … )。它们与name=( [key1]=value1 [key2]=value2 … )是完全一样的。列表中的第一个单词决定了如何解释其余单词；列表中的所有赋值必须是相同类型的。当使用键/值对时，键不能缺失或为空；最后缺失的值会被视为空字符串。

​	这个语法也可以被`declare`内建命令接受。可以使用上面介绍的`name[subscript]=value`语法来给各个数组元素赋值。

​	当对索引数组进行赋值时，如果name带有一个负数的子脚本，那么该数字将被解释为相对于name的最大索引加一，因此负索引会从数组末尾开始计数，索引-1指向最后一个元素。

​	使用复合赋值语法对数组变量进行赋值时，`+=`运算符将在数组变量末尾追加值；参见上面的[Shell参数](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameters)。

​	可以使用`${name[subscript]}`引用数组中的任何元素。大括号是必需的，以避免与Shell的文件名展开运算符冲突。如果子脚本是`@`或`*`，则单词展开为数组name的所有成员。这些子脚本在单词出现在双引号内时才会有所不同。如果单词被双引号引起来，`${name[*]}`会展开为一个单词，其中每个数组成员的值由`IFS`变量的第一个字符分隔，并且`${name[@]}`会将name的每个元素展开为单独的单词。当数组没有成员时，`${name[@]}`会展开为一个空字符串。如果双引号展开出现在单词中，第一个参数的展开将与原始单词的前半部分连接在一起，最后一个参数的展开将与原始单词的后半部分连接在一起。这类似于特殊参数`@`和`*`的展开。`${#name[subscript]}`展开为`${name[subscript]}`的长度。如果子脚本是`@`或`*`，展开为数组中元素的数量。如果用于引用索引数组的元素的子脚本求值为负数，则将其解释为相对于数组的最大索引加一，因此负索引会从数组末尾开始计数，索引`-1`指向最后一个元素。

​	引用一个没有子脚本的数组变量等同于使用子脚本0来引用。使用有效子脚本对变量进行引用是合法的，如果需要，`bash`会创建一个数组。

​	一个数组变量被视为设置过，如果给一个子脚本赋了一个值。空字符串是一个有效的值。

​	可以获取数组的键（索引）和值。`${!name[@]}`和`${!name[*]}`扩展为数组变量name中的索引。当在双引号内时，其处理类似于双引号内的特殊参数`@`和`*`的展开。

​	使用`unset`内建命令来销毁数组。`unset name[subscript]`会销毁索引为subscript的数组元素。对于索引数组，负的子脚本将被解释如上所述。取消设置数组变量的最后一个元素并不会取消设置该变量本身。`unset name`中，name是一个数组时，会删除整个数组。`unset name[subscript]`的行为取决于数组类型，当给定`*`或`@`子脚本时。当name是关联数组时，它会删除具有键`*`或`@`的元素。如果name是索引数组，`unset`会删除所有元素，但不会删除数组本身。

​	当将带有子脚本的变量名作为命令的参数使用（例如使用`unset`），而不使用上述描述的单词展开语法时，参数将受到Shell的文件名展开的影响。如果不希望进行文件名展开，应将参数放在引号中。

​	`declare`、`local`和`readonly`内建命令都可以使用`-a`选项来指定索引数组，`-A`选项来指定关联数组。如果两个选项都提供，`-A`优先。`read`内建命令可以使用`-a`选项将从标准输入读取的单词列表分配给数组，并且可以将从标准输入读取的值读入各个数组元素。`set`和`declare`内建命令以一种允许它们作为输入重新使用的方式显示数组值。





### 6.8 目录栈



​	目录栈是一个存储最近访问的目录的列表。`pushd`内建命令在更改当前目录时将目录添加到栈中，`popd`内建命令从栈中移除指定的目录，并将当前目录更改为被移除的目录。`dirs`内建命令显示目录栈的内容。当前目录始终位于目录栈的顶部。

​	目录栈的内容也可以通过`DIRSTACK` shell变量的值来查看。








#### 6.8.1 目录栈内建命令

- `dirs`

  ```
  dirs [-clpv] [+N | -N]
  ```

  显示当前记忆的目录列表。使用`pushd`命令将目录添加到列表中，`popd`命令从列表中移除目录。当前目录始终是栈中的第一个目录。

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

  从目录栈中移除元素。元素从0开始编号，从`dirs`列出的第一个目录开始计数；也就是说，`popd`等同于`popd +0`。当没有给出参数时，`popd`将从栈中移除顶部目录，并切换到新的顶部目录。

  如果提供了参数，则参数的含义如下：

  - `-n`：在从栈中移除目录时，禁止正常的目录更改，只对栈进行操作。

    `+N`：从栈中移除第N个目录（从`dirs`打印的列表的左侧开始计数，从零开始）。

    `-N`：从栈中移除第N个目录（从`dirs`打印的列表的右侧开始计数，从零开始）。

  
  
  
  如果目录栈的顶部元素被修改，并且未提供`-n`选项，`popd`会使用`cd`内建命令切换到栈顶的目录。如果`cd`失败，`popd`将返回一个非零值。
  
  否则，如果遇到无效选项、目录栈为空或指定了不存在的目录栈条目，则`popd`返回一个失败状态。
  
  如果`popd`命令成功，Bash会运行`dirs`以显示目录栈的最终内容，并且返回状态为0。
  
- `pushd`

  ```
  pushd [-n] [+N | -N | dir]
  ```
  
  将一个目录添加到目录栈的顶部，或者旋转栈，使得新的栈顶成为当前工作目录。如果没有提供参数，`pushd`交换目录栈的前两个元素。
  
  如果提供了参数，参数的含义如下：
  
  - `-n`：在旋转或添加目录到栈中时，禁止正常的目录更改，只对栈进行操作。
  
    `+N`：将第N个目录（从`dirs`打印的列表的左侧开始计数，从零开始）旋转到列表的顶部。
  
    `-N`：将第N个目录（从`dirs`打印的列表的右侧开始计数，从零开始）旋转到列表的顶部。
  
    `dir`：使dir成为栈的顶部。
  
  
  
  
  修改栈后，如果未提供`-n`选项，`pushd`将使用`cd`内建命令切换到栈顶的目录。如果`cd`失败，`pushd`将返回一个非零值。
  
  否则，如果没有提供参数，`pushd`除非目录栈为空，否则将返回0。在旋转目录栈时，`pushd`除非目录栈为空或指定了不存在的目录栈元素，否则将返回0。
  
  如果`pushd`命令成功，Bash会运行`dirs`以显示目录栈的最终内容。





### 6.9 控制提示符



​	Bash在打印每个主提示符之前检查数组变量`PROMPT_COMMAND`的值。如果`PROMPT_COMMAND`中的任何元素被设置且非空，Bash会按照数字顺序执行每个值，就像它们在命令行上被输入一样。

​	此外，以下表格描述了可以出现在提示变量`PS0`、`PS1`、`PS2`和`PS4`中的特殊字符：

- `\a`

  响铃字符。

- `\d`

  日期，以“星期 月份 日期”格式显示（例如，“Tue May 26”）。

- `\D{format}`

  `format`参数会传递给`strftime`(3)，并将结果插入到提示字符串中；如果`format`为空，则会显示地区特定的时间表示。大括号是必需的。

- `\e`

  转义字符。

- `\h`

  主机名，截取第一个`.`之前的部分。

- `\H`

  主机名。

- `\j`

  shell当前管理的作业数。

- `\l`

  shell的终端设备名的基本名称。

- `\n`

  换行符。

- `\r`

  回车符

- `\s`

  shell的名称，即`$0`（最后一个斜杠之后的部分）的基本名称。

- `\t`

  时间，以24小时HH:MM:SS格式显示。

- `\T`

  时间，以12小时HH:MM:SS格式显示。

- `\@`

  时间，以12小时am/pm格式显示。

- `\A`

  时间，以24小时HH:MM格式显示。

- `\u`

  当前用户的用户名。

- `\v`

  Bash的版本（例如，2.00）。

- `\V`

  Bash的版本和修订号（例如，2.00.0）。

- `\w`

  `PWD` shell变量（`$PWD`）的值，如果在`$HOME`前缩写，则使用波浪符号（使用`$PROMPT_DIRTRIM`变量）。

- `\W`

  The basename of `$PWD`, with `$HOME` ith a tilde.

  `$PWD`的基本名称，如果在`$HOME`前缩写，则使用波浪符号。

- `\!`

  The history number of this command.

  当前命令的历史记录编号。

- `\#`

  当前命令的命令编号。

- `\$`

  如果有效的用户ID是0，则显示`#`，否则显示`$`。

- `\nnn`

  八进制值为nnn的ASCII码字符。

- `\\`

  反斜杠。

- `\[`

  开始一个非打印字符序列。这可用于将终端控制序列嵌入到提示符中。

- `\]`

  结束一个非打印字符序列。

​	命令编号和历史记录编号通常是不同的：命令的历史记录编号是它在历史记录列表中的位置，可能包括从历史记录文件中恢复的命令（参见[Bash历史记录功能](https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Facilities)），而命令编号是在当前shell会话期间执行的命令序列中的位置。

​	在解码字符串后，它通过参数扩展、命令替换、算术扩展和引号移除进行展开，这取决于`promptvars` shell选项的值（参见[内建命令Shopt](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。如果转义的字符串部分出现在命令替换中或包含对单词扩展特殊的字符，这可能会产生意外的副作用。





### 6.10 受限制的Shell



​	如果Bash以名称`rbash`启动，或在启动时提供`--restricted`或`-r`选项，那么Shell将变为受限制的。受限制的Shell用于建立比标准Shell更受控制的环境。受限制的Shell的行为与`bash`完全相同，除了以下操作被禁止或不执行：

 

- 使用`cd`内建命令更改目录。
- 设置或取消设置`SHELL`、`PATH`、`HISTFILE`、`ENV`或`BASH_ENV`变量的值。
- 指定包含斜杠的命令名称。
- 将包含斜杠的文件名作为`.`内建命令的参数。
- 将包含斜杠的文件名作为`history`内建命令的参数。
- 将包含斜杠的文件名作为`hash`内建命令的`-p`选项的参数。
- 在启动时从Shell环境导入函数定义。
- 在启动时从Shell环境解析`SHELLOPTS`的值。
- 使用`>`, `>|`, `<>`, `>&`, `&>`, 和 `>>` 重定向操作符进行输出重定向。
- 使用`exec`内建命令用另一个命令替换Shell。
- 使用`enable`内建命令的`-f`和`-d`选项来添加或删除内建命令。
- 使用`enable`内建命令使禁用的Shell内建命令重新启用。
- 使用`command`内建命令的`-p`选项。
- 使用`set +r`或`shopt -u restricted_shell`取消受限制模式。

​	这些限制在读取任何启动文件后执行。

​	当执行被发现是Shell脚本的命令（参见[Shell脚本](https://www.gnu.org/software/bash/manual/bash.html#Shell-Scripts)），`rbash`会关闭在执行脚本的Shell中的任何限制。

​	受限制的Shell模式只是有用的受限制环境的一个组成部分。它应该配合将`PATH`设置为允许执行仅有几个经过验证的命令（允许Shell转义的命令特别容易受到攻击），在登录后将当前目录更改为非可写目录（除了`$HOME`），不允许受限制的Shell执行Shell脚本，并清理导致某些命令修改其行为的环境变量（例如`VISUAL`或`PAGER`）。

​	现代系统提供了更安全的实现受限制环境的方式，比如`jails`、`zones`或`containers`。





### 6.11 Bash的POSIX模式



​	通过使用`--posix`命令行选项启动Bash或在Bash运行时执行`set -o posix`，Bash将更接近POSIX标准，改变行为以匹配POSIX在Bash默认行为有所不同的领域。

​	当以`sh`命令启动Bash时，Bash在读取启动文件后进入POSIX模式。

​	以下是`POSIX模式`生效时的更改： 

1. Bash确保设置`POSIXLY_CORRECT`变量。
3. When a command in the hash table no longer exists, Bash will re-search `$PATH` to find the new location. This is also available with `shopt -s checkhash`.
4. 当哈希表中的命令不存在时，Bash将重新搜索`$PATH`以找到新位置。这也可以使用`shopt -s checkhash`来实现。
5. Bash不会将没有执行位设置的命令插入到命令哈希表中，即使它将其作为（最后的）`$PATH`搜索的结果返回。
7. 作业控制代码和内建命令在作业以非零状态退出时打印的消息是`Done(status)`。
9. 作业控制代码和内建命令在作业停止时打印的消息是`Stopped(signame)`，其中signame是例如`SIGTSTP`。
11. 别名扩展始终启用，即使在非交互式Shell中也是如此。
13. 在保留字被识别的上下文中出现的保留字不会经历别名扩展。
15. 当最初解析命令替换时，会执行别名扩展。默认模式通常会将其推迟，启用时直到执行命令替换时才会执行。这意味着命令替换将不会扩展在命令替换最初解析后定义的别名（例如，作为函数定义的一部分）。
17. POSIX `PS1`和`PS2`中的`!`扩展为历史编号和`!!`扩展为`!`，并且对`PS1`和`PS2`的值执行参数扩展，而不考虑`promptvars`选项的设置。
19. 执行POSIX启动文件（`$ENV`）而不是正常的Bash文件。
21. 波浪号扩展仅对出现在命令名称前的赋值执行，而不是对行上的所有赋值执行。
23. The default history file is ~/.sh_history (this is the default value of `$HISTFILE`).
24. 默认的历史文件是`~/.sh_history`（这是`$HISTFILE`的默认值）。
25. 除非Shell是交互式的，否则重定向操作符不会对重定向中的单词执行文件名扩展。
27. 重定向操作符不会对重定向中的单词执行词法分割。
29. 函数名必须是有效的Shell名称。也就是说，它们不能包含除字母、数字和下划线之外的字符，并且不能以数字开头。在非交互式Shell中，使用无效的名称声明函数会导致致命的语法错误。
31. 函数名不能与POSIX特殊内建命令相同。
33. 在命令查找期间，POSIX特殊内建命令优先于Shell函数找到。
35. 打印Shell函数定义时（例如通过`type`），Bash不打印`function`关键字。
37. 在`PATH`变量的元素中作为第一个字符出现的直接波浪号不会被扩展，如上文[Tilde Expansion](https://www.gnu.org/software/bash/manual/bash.html#Tilde-Expansion)所述。
39. `time`保留字可以单独用作命令。当以这种方式使用时，它显示Shell及其已完成子进程的时间统计信息。`TIMEFORMAT`变量控制时间信息的格式。
41. 在解析和扩展双引号内的`${…}`扩展时，单引号不再是特殊字符，不能用于引用闭合大括号或其他特殊字符，除非操作符是被定义为执行模式移除的操作符。在这种情况下，它们不必成对出现。
43. 如果下一个标记以`-`开头，解析器不会将`time`视为保留字。
45. 在双引号字符串内，即使启用了`histexpand`选项，`!`字符也不会引入历史扩展。
47. 如果POSIX特殊内建命令返回错误状态，非交互式Shell将退出。致命错误是POSIX标准中列出的错误，包括传递不正确的选项、重定向错误、在命令名称前进行赋值的变量赋值错误等等。
49. 如果在赋值语句后没有命令名，非交互式Shell将在变量赋值错误时退出。例如，尝试向只读变量赋值时会发生变量赋值错误。
51. 如果在特殊内建命令前的赋值语句中出现变量赋值错误，非交互式Shell将退出，但在任何其他简单命令中不会。对于任何其他简单命令，Shell将中止该命令的执行，并在顶层继续执行（“Shell不得对发生错误的命令执行任何进一步的处理”）。
53. 如果`for`语句中的迭代变量或`select`语句中的选择变量是只读变量，非交互式Shell将退出。
55. 在`.` filename`中`filename`的文件名未找到时，非交互式Shell将退出。
57. 如果算术扩展中的语法错误导致无效表达式，非交互式Shell将退出。
59. 如果参数扩展错误发生，非交互式Shell将退出。
61. 如果`source`内建命令读取的脚本或`eval`内建命令处理的字符串中存在语法错误，非交互式Shell将退出。
63. 虽然变量间接引用可用，但不能应用于`#`和`?`特殊参数。
65. 在扩展为双引号的模式上下文中扩展`*`特殊参数时，不将`$*`视为已扩展为双引号。
67. POSIX特殊内建命令之前的赋值语句在内建完成后会保留在Shell环境中。
69. `command`内建命令不会阻止带有赋值语句作为参数的内建命令将其作为赋值语句扩展；当不在POSIX模式下时，如果在`command`之前的赋值内建命令，那么在其之前它会失去赋值语句扩展属性。
71. `bg`内建命令使用所需的格式来描述放在后台的每个作业，其中不包括该作业是否是当前或上一个作业的指示。
73. `kill -l`的输出打印所有信号名称在一行上，用空格分隔，没有`SIG`前缀。
75. `kill`内建命令不接受带有`SIG`前缀的信号名称。
77. `export`和`readonly`内建命令以POSIX要求的格式显示它们的输出。
79. `trap`内建命令显示没有前缀`SIG`的信号名称。
81. `trap`内建命令不检查第一个参数是否可能是信号规范，并在如果它是，则将信号处理恢复为原始状态，除非该参数仅由数字组成并且是一个有效的信号编号。如果用户想要将给定信号的处理程序重置为原始状态，则应使用`-`作为第一个参数。
83. `trap -p`显示将信号处理状态设置为SIG_DFL以及在Shell启动时忽略的信号。
85. `.`和`source`内建命令如果在`PATH`中找不到文件名参数，则不会搜索当前目录。
87. 启用POSIX模式会导致设置`inherit_errexit`选项，因此用于执行命令替换的子Shell会继承来自父Shell的`-e`选项的值。当未启用`inherit_errexit`选项时，这样的子Shell会清除`-e`选项。
89. 启用POSIX模式会导致设置`shift_verbose`选项，因此`shift`的数值参数如果超过位置参数的数量将导致错误消息。
91. 当不提供`-p`选项时，`alias`内建命令在显示别名定义时不会显示前缀`alias`。
93. 当没有选项调用`set`内建命令时，不会显示Shell函数名称和定义。
95. 当没有选项调用`set`内建命令时，显示变量值时不会显示引号，除非它们包含Shell元字符，即使结果包含非打印字符。
97. 当在逻辑模式下调用`cd`内建命令，并且从`$PWD`和作为参数提供的目录名构建的路径名不引用现有目录时，`cd`将失败而不是退回到物理模式。
99. 当因为所有符号链接被展开而导致从`$PWD`和作为参数提供的目录名构建的路径名长度超过`PATH_MAX`时，`cd`将失败而不是尝试仅使用提供的目录名。
101. `pwd`内建命令验证其打印的值是否与当前目录相同，即使未要求使用`-P`选项检查文件系统。
103. 列出历史记录时，`fc`内建命令不包括历史记录条目是否已被修改的指示。
105. `fc`默认使用的编辑器是`ed`。
107. `type`和`command`内建命令将不会报告找到一个不可执行的文件，尽管如果Shell只找到一个这样的文件，则会尝试执行该文件。
109. 在`vi`编辑模式下，运行`v`命令时，`vi`编辑器将直接调用，而不是检查`$VISUAL`和`$EDITOR`。
111. 启用`xpg_echo`选项时，Bash不会尝试将`echo`的任何参数解释为选项。每个参数在转义字符被转换后显示。
113. `ulimit`内建命令在`-c`和`-f`选项上使用512字节的块大小。
115. 当在`SIGCHLD`上设置陷阱时，`SIGCHLD`到达不会中断`wait`内建命令并导致它立即返回。陷阱命令会对每个退出的子进程运行一次。
117. `read`内建命令可能被设置了陷阱的信号中断。如果在执行`read`时Bash接收到受限制信号，则陷阱处理程序会执行，并且`read`返回一个大于128的退出状态。
119. `printf`内建命令使用`double`（通过`strtod`）来转换与浮点数转换说明符相对应的参数，如果可用，则使用`long double`。如果可用，则`L`长度修饰符会强制`printf`使用`long double`。
121. Bash在使用`wait`内建命令获取已完成进程的状态后会从此类状态列表中移除已退出的后台进程的状态。

​	还有一些Bash默认情况下不实现的其他POSIX行为，即使在POSIX模式下也是如此。具体包括：

1. `fc`内建命令在编辑历史记录条目时会检查`$EDITOR`作为编辑程序，如果未设置`FCEDIT`，而不是直接默认为`ed`。如果`EDITOR`未设置，`fc`将使用`ed`。
3. 如前所述，Bash需要启用`xpg_echo`选项才能使`echo`内建命令完全符合规范。

​	Bash可以通过在构建时在`configure`中指定`--enable-strict-posix-default`来配置为默认符合POSIX规范（参见[Optional Features](https://www.gnu.org/software/bash/manual/bash.html#Optional-Features)）。





### 6.12 Shell Compatibility Mode



​	Bash-4.0引入了*shell兼容性级别*的概念，通过一组shopt内建命令选项（`compat31`、`compat32`、`compat40`、`compat41`等）来指定。只有一个当前的兼容性级别 - 每个选项是互斥的。兼容性级别旨在允许用户选择先前版本的行为，这些行为与新版本不兼容，同时将脚本迁移到使用当前功能和行为。这是一个临时解决方案。

​	本节不涉及特定版本的标准行为（例如，设置`compat32`意味着在`bash-3.2`及以后版本中引用`[[`命令的正则表达式匹配运算符（=~）的rhs时没有特殊效果）。

​	如果用户启用了例如`compat32`，它可能会影响其他兼容性级别的行为，包括当前的兼容性级别。每个兼容性级别控制在该Bash版本中发生的行为更改，但这种行为可能在较早的版本中存在。例如，使用基于区域设置的比较来执行`[[`命令的更改是在`bash-4.1`中引入的，而较早的版本使用基于ASCII的比较，因此启用`compat32`也会启用基于ASCII的比较。这种粒度可能对所有用途都不够充分，因此用户应谨慎使用兼容性级别。要了解当前行为，请阅读特定功能的文档。

​	Bash-4.3引入了一个新的Shell变量：`BASH_COMPAT`。分配给此变量的值（一个十进制版本号，如4.2，或对应于`compat`NN选项的整数，如42）确定兼容性级别。

​	从`bash-4.4`开始，Bash开始弃用旧的兼容性级别。最终，这些选项将被`BASH_COMPAT`取代。

​	`bash-5.0`是最后一个为上一个版本提供单独的shopt选项的版本。用户应该在`bash-5.0`及更高版本中使用`BASH_COMPAT`。

​	以下表格描述了每个兼容性级别设置控制的行为更改。使用`compat`NN标记作为简写方式，使用以下机制之一将兼容性级别设置为NN。对于`bash-5.0`之前的版本，可以使用相应的`compat`NN shopt选项来设置兼容性级别。对于`bash-4.3`及更高版本，首选`BASH_COMPAT`变量，并且`bash-5.1`及更高版本需要使用它。

- `compat31`

  - 引用`[[`命令的正则表达式匹配运算符（=~）的rhs不会产生特殊效果。
  
- `compat32`

  - 中断一个命令列表（例如 "a ; b ; c"）会导致执行列表中的下一个命令（在`bash-4.0`及更高版本中，Shell会像收到中断一样处理，因此中断列表中的一个命令会中止整个列表的执行）。
  
- `compat40`

  - `[[`命令中的`<`和`>`操作符在比较字符串时不考虑当前区域设置；它们使用ASCII排序。`bash-4.1`之前的Bash版本使用ASCII排序和strcmp(3)；`bash-4.1`及更高版本使用当前区域设置的排序序列和strcoll(3)。
  
- `compat41`

  - 在posix模式下，`time`可以在后面跟随选项，仍然会被识别为保留字（这是POSIX解释267）。
  - 在posix模式下，解析器要求在双引号${…}参数扩展的单词部分中的单引号成对出现偶数次，并且对它们进行特殊处理，以使单引号内的字符被视为已引用（这是POSIX解释221）。
  
- `compat42`

  - 双引号模式替换中的替换字符串不会进行引号删除，如在`bash-4.2`之后的版本中一样。
  - 在posix模式下，当扩展双引号`${…}`参数扩展的单词部分时，单引号被视为特殊字符，并可用于引用右括号或其他特殊字符（这是POSIX解释221）；在后续版本中，在双引号中的单引号在扩展时不再是特殊字符。
  
- `compat43`

  - 如果尝试将引号复合赋值作为declare的参数（例如`declare -a foo=`(1 2)`）使用，Shell不会打印警告消息。在后续版本中，会警告此用法已弃用。
  - 单词扩展错误被视为非致命错误，即使在posix模式下也会导致当前命令失败（默认行为是使它们成为导致Shell退出的致命错误）。
  - 执行Shell函数时，循环状态（while/until等）不会被重置，因此在该函数中的`break`或`continue`将中断或继续调用上下文中的循环。`bash-4.4`及更高版本会重置循环状态以防止这种情况发生。
  
- `compat44`

  - Shell设置了用于`BASH_ARGV`和`BASH_ARGC`的值，以便即使未启用扩展调试模式，它们也可以扩展为Shell的位置参数。
  - 子Shell继承了父上下文中的循环，因此`break`或`continue`将导致子Shell退出。`bash-5.0`及更高版本重置循环状态以防止退出。
  - 在不是posix模式的情况下，设置属性的变量赋值在Shell不是posix模式时，继续影响调用环境中具有相同名称的变量。
  
- `compat50 (set using BASH_COMPAT)`

  - `bash-5.1`更改了生成`$RANDOM`的方式，引入了稍微更多的随机性。如果Shell兼容性级别设置为50或更低，则会恢复到`bash-5.0`及之前版本的方法，因此通过给`RANDOM`分配一个值来初始化随机数生成器会产生与`bash-5.0`相同的序列。
  - 如果命令哈希表为空，则`bash-5.1`之前的Bash版本会打印一条信息，即使产生的输出可以重新用作输入。当提供了-l选项时，`bash-5.1`不会显示该消息。
  
- `compat51 (set using BASH_COMPAT)`

  - `unset`内建命令将会删除数组`a`，给定类似`a[@]`的参数。`bash-5.2`将会删除具有键`@`（关联数组）的元素，或者删除所有元素而不会删除数组（索引数组）。
  - 算术命令（((...))）和算术for语句中的表达式可以扩展多次；用作`[[`条件命令中算术运算符的参数的表达式可以扩展多次。
  - 子字符串参数花括号扩展中的表达式可以扩展多次。
  - `$(( ... ))`单词扩展中的表达式可以扩展多次；用作索引数组下标的算术表达式也可以扩展多次。
  - `test -v`，给定参数`A[@]`，其中A是一个已存在的关联数组，如果数组有任何已设置的元素，则返回true。`bash-5.2`将寻找并报告名为`@`的键。
  - `${parameter[:]=value}`单词扩展将在执行任何变量特定的转换（例如转换为小写）之前返回value。`bash-5.2`将返回分配给变量的最终值。
  - 解析命令替换时将表现得好像启用了扩展模式（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），因此解析包含extglob模式的命令替换（例如作为Shell函数的一部分）不会失败。这假设意图是在执行命令和进行单词扩展之前启用extglob模式。如果在执行命令时还未启用extglob，则在单词扩展时将失败。





## 7 作业控制

​	本章讨论作业控制是什么，它是如何工作的，以及Bash如何允许您访问其功能。





### 7.1 作业控制基础



​	作业控制是指有选择地停止（暂停）进程的执行并在以后的某个时间点继续（恢复）其执行。用户通常通过操作系统内核的终端驱动程序和Bash共同提供的交互界面来使用此功能。

​	Shell将每个管道与一个作业相关联。它保持当前正在执行的作业的列表，并可以使用`jobs`命令列出这些作业。当Bash以异步方式启动作业时，它会打印一行，看起来像这样：

```
[1] 25647
```

表示该作业是作业编号为1，并且与该作业关联的管道中的最后一个进程的进程ID为25647。单个管道中的所有进程都是同一作业的成员。Bash使用作业抽象作为作业控制的基础。

​	为了方便实现作业控制的用户接口，操作系统维护了当前终端进程组ID的概念。该进程组的成员（其进程组ID等于当前终端进程组ID）接收键盘生成的信号，例如`SIGINT`。这些进程称为前台进程。后台进程是其进程组ID与终端的不同的进程；这样的进程对键盘生成的信号免疫。只有前台进程允许从终端读取或（如果用户通过`stty tostop`指定）写入。后台进程如果尝试从终端读取（在`stty tostop`生效时写入）将被内核的终端驱动程序发送`SIGTTIN`（`SIGTTOU`）信号，除非捕获，否则会挂起该进程。

​	如果支持Bash运行的操作系统支持作业控制，Bash包含使用它的功能。在进程运行时键入*暂停* 字符（通常为`^Z`，Control-Z）会导致该进程停止并将控制权返回给Bash。键入 *延迟暂停* 字符（通常为`^Y`，Control-Y）会导致进程在尝试从终端读取输入时停止，并将控制权返回给Bash。然后用户可以使用`bg`命令将作业继续在后台运行，使用`fg`命令将作业继续在前台运行，或者使用`kill`命令将其终止。`^Z`立即生效，并且附加的副作用是导致未决的输出和预读被丢弃。

​	在Shell中有许多引用作业的方式。字符`％`引入了作业规范（ *jobspec* ）。

​	作业号`n`可以表示为`％n`。符号`%%`和`%+`指的是Shell对当前作业的概念，即最后一个在前台停止或在后台启动的作业。只有`％`（没有随附的作业规范）也指代当前作业。可以使用`%-`引用上一个作业。如果只有一个作业，则`%+`和`%-`都可以用于指代该作业。在与作业相关的输出中（例如，`jobs`命令的输出），当前作业始终带有`+`标志，上一个作业带有`-`标志。

​	作业还可以使用其启动名称的前缀或出现在其命令行中的子字符串来引用。例如，`％ce`引用了一个其命令名称以`ce`开头的停止作业。然而，使用`％?ce`指的是包含字符串`ce`的任何作业。如果前缀或子字符串匹配多个作业，Bash会报告错误。

​	仅仅命名一个作业可用于将其带入前台：`％1`是将作业1从后台带入前台的同义词。类似地，`％1＆`会在后台恢复作业1，相当于`bg％1`。

​	Shell立即得知作业更改状态。通常，Bash在打印提示之前等待报告作业状态的更改，以不中断其他输出。如果启用`set`内建命令的-b选项，则Bash会立即报告此类更改（请参阅[The Set Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。每个子进程退出时，`SIGCHLD`的任何陷阱都会被执行。

​	如果在作业暂停时（或如果启用了`checkjobs`选项，则在运行时）尝试退出Bash，则Shell会打印一条警告消息，如果启用了`checkjobs`选项，则列出作业及其状态。然后可以使用`jobs`命令检查它们的状态。如果在没有中间命令的情况下再次尝试退出，则Bash不会打印另一个警告，并且任何已停止的作业都将终止。

​	当Shell使用`wait`内建命令等待作业或进程，并且启用了作业控制时，`wait`将在作业更改状态时返回。-f选项导致`wait`在作业或进程终止之前等待。





### 7.2 作业控制内建命令

- `bg`

  ```
  bg [jobspec …]
  ```

  将每个挂起的作业（jobspec）在后台恢复运行，就像使用 `&` 启动它一样。如果未提供 jobspec，则使用当前作业。返回状态为零，除非在未启用作业控制时运行，或在启用作业控制的情况下，找不到 jobspec 或指定的作业是在没有作业控制的情况下启动的。

- `fg`

  ```
  fg [jobspec]
  ```

  将作业（jobspec）在前台恢复运行，并将其设置为当前作业。如果未提供 jobspec，则使用当前作业。返回状态是被放在前台的命令的状态，或者在禁用作业控制时运行或在启用作业控制的情况下 jobspec 未指定有效作业或指定了在没有作业控制的情况下启动的作业。

- `jobs`

  ```
  jobs [-lnprs] [jobspec]
  jobs -x command [arguments]
  ```

  第一种形式列出所有活动作业。选项的含义如下：

  - `-l`：除了常规信息外，还列出进程 ID。
  - `-n`：仅显示自上次用户上次通知其状态以来更改状态的作业信息。
  - `-p`：仅列出作业的进程组组长的进程 ID。
  - `-r`：仅显示正在运行的作业。
  - `-s`：仅显示停止的作业。

  

  如果提供了 jobspec，则输出仅限于有关该作业的信息。如果未提供 jobspec，则列出所有作业的状态。

  如果提供了 `-x` 选项，则 `jobs` 将任何在 command 或 arguments 中找到的 jobspec 替换为相应的进程组 ID，并执行 command，并传递其参数，返回其退出状态。
  
- `kill`

  ```
  kill [-s sigspec] [-n signum] [-sigspec] jobspec or pid
  kill -l|-L [exit_status]
  ```

  向由作业规范 jobspec 或进程 ID pid 指定的进程发送由 sigspec 或 signum 指定的信号。sigspec 可以是大小写不敏感的信号名称，例如 `SIGINT`（带或不带 `SIG` 前缀），也可以是信号编号；signum 是信号编号。如果 sigspec 和 signum 都不存在，则使用 `SIGTERM` 信号。`-l` 选项列出信号名称。如果在给出 `-l` 时提供了任何参数，则列出与参数对应的信号名称，并返回状态为零。exit_status 是指定信号编号或由信号终止的进程的退出状态的数字。`-L` 选项等效于 `-l`。如果成功发送了至少一个信号，则返回状态为零，否则如果发生错误或遇到无效选项，则返回非零。

- `wait`

  ```
  wait [-fn] [-p varname] [jobspec or pid …]
  ```

  等待由每个进程 ID pid 或作业规范 jobspec 指定的子进程退出，并返回最后等待的命令的退出状态。如果给出作业规范，则等待该作业中的所有进程。如果未提供任何参数，则 `wait` 等待所有正在运行的后台作业和最后执行的进程替代，如果其进程 ID 与 `$!` 相同，则返回状态为零。如果提供了 `-n` 选项，则 `wait` 等待来自 pid 或 jobspecs 列表中的单个作业，如果未提供任何参数，则等待任何作业完成，并返回其退出状态。如果提供的参数不是 shell 的子进程，或者如果没有提供参数且 shell 没有未等待的子进程，则退出状态为 127。如果提供了 `-p` 选项，则返回的退出状态为该选项参数指定的变量 varname 的进程或作业标识符。在任何赋值之前，该变量最初为未设置状态。这仅在提供 `-n` 选项时有用。在启用作业控制时，提供 `-f` 选项会强制 `wait` 在返回其状态之前等待每个 pid 或 jobspec 终止，而不是在其更改状态时返回。如果 jobspec 和 pid 都不指定 shell 的活动子进程，则返回状态为 127。如果 `wait` 被信号中断，则返回状态将大于 128，如上述所述（请参阅[Signals](https://www.gnu.org/software/bash/manual/bash.html#Signals)）。否则，返回状态为最后一个等待的进程或作业的退出状态。

- `disown`

  ```
  disown [-ar] [-h] [jobspec … | pid … ]
  ```

  在没有选项的情况下，从活动作业表中删除每个 jobspec。如果给出了 `-h` 选项，则该作业不会从表中删除，但是如果 Shell 接收到 `SIGHUP`，则会将其标记为不发送给作业。如果没有 jobspec 存在，且未提供 `-a` 或 `-r` 选项，则使用当前作业。如果未提供 jobspec，则 `-a` 选项意味着删除或标记所有作业；没有 jobspec 参数的 `-r` 选项将操作限制为运行中的作业。

- `suspend`

  ```
  suspend [-f]
  ```
  
  暂停此 Shell 的执行，直到收到 `SIGCONT` 信号。登录 Shell 或未启用作业控制的 Shell 无法暂停；`-f` 选项可用于覆盖此设置并强制挂起。返回状态为 0，除非 Shell 是登录 Shell 或未启用作业控制且未提供 `-f`。

​	当作业控制未激活时，`kill` 和 `wait` 内建命令不接受作业规范（jobspec）参数。必须提供进程 ID。





### 7.3 作业控制变量

- `auto_resume`

  此变量控制Shell与用户和作业控制的交互方式。如果此变量存在，则不带重定向的单词简单命令将被视为恢复现有作业的候选项。不允许任何歧义；如果有多个以输入的字符串开头的作业，则选择最近访问的作业。在此上下文中，已停止作业的名称是启动它的命令行。如果此变量设置为值 `exact`，则所提供的字符串必须与已停止作业的名称完全匹配；如果设置为 `substring`，则所提供的字符串需要与已停止作业名称的子字符串匹配。`substring` 值提供类似于 `%?` 作业 ID（见 [作业控制基础](https://www.gnu.org/software/bash/manual/bash.html#Job-Control-Basics)）。如果设置为其他任何值，则所提供的字符串必须是已停止作业名称的前缀；这提供了类似于 `%` 作业 ID 的功能。







## 8 命令行编辑

​	本章描述GNU命令行编辑接口的基本特性。命令行编辑由Readline库提供，多个不同的程序使用它，包括Bash。当使用交互式Shell时，默认情况下启用命令行编辑，除非在Shell调用时提供了 `--noediting` 选项。在使用 `read` 内建命令时（参见[Bash内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)），也会使用行编辑。默认情况下，行编辑命令类似于Emacs的命令。还提供了Vi风格的行编辑接口。可以随时使用 `-o emacs` 或 `-o vi` 选项来启用行编辑，或使用 `+o emacs` 或 `+o vi` 选项来禁用行编辑，这些选项是 `set` 内建命令的一部分（参见 [set 内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。






### 8.1 命令行编辑简介 Introduction to Line Editing

​	以下段落描述了表示按键的符号约定。

​	文本 `C-k` 表示按下 `k` 键同时按下 Control 键时产生的字符。

​	文本 `M-k` 表示在按下 Meta 键（如果您有的话）的同时按下 `k` 键时产生的字符。在许多键盘上，Meta 键标记为 `ALT`。对于带有两个标记为 `ALT` 的键的键盘（通常位于空格键的两侧），左侧的 `ALT` 通常被设置为工作为 Meta 键。右侧的 `ALT` 键也可以被配置为工作为 Meta 键，或者可以被配置为其他修饰键，比如用于输入带重音字符的组合键。

​	如果您没有 Meta 键或 `ALT` 键，或者没有其他工作为 Meta 键的键，那么可以通过首先键入 `ESC`，然后再键入 `k` 来生成相同的按键。无论哪种方式，都被称为将 `k` 键转换为 Meta 键。

​	文本 `M-C-k` 表示在将 C-k 转换为 Meta 键后产生的字符。

​	此外，有几个按键有自己的名称。具体来说，`DEL`，`ESC`，`LFD`，`SPC`，`RET` 和 `TAB` 在本文或初始化文件（参见[Readline Init File](https://www.gnu.org/software/bash/manual/bash.html#Readline-Init-File)）中表示它们自己。如果您的键盘缺少 `LFD` 键，按下 `C-j` 将产生所需的字符。`RET` 键可能在某些键盘上标记为 `Return` 或 `Enter`。





### 8.2 Readline 交互



​	在交互式会话期间，通常会输入一长行文本，但在发现行首单词拼写错误时，您只想纠正拼写错误，而不是重新输入大部分行。Readline 库为您提供了一组命令，以便在输入文本时对其进行操作，让您可以移动光标到需要更正的位置，并删除或插入更正的文本。然后，当您对整行满意时，只需按下 `RET` 即可。您不必在行尾按下 `RET`；无论光标在行中的位置如何，整行都会被接受。



#### 8.2.1 Readline 基本编辑



​	为了在行中输入字符，只需直接键入它们。键入的字符将出现在光标所在位置，然后光标向右移动一个空格。如果您输入错误字符，可以使用擦除字符来后退并删除错误的字符。

​	有时候您可能会输入错误的字符，但直到您键入其他几个字符后才注意到错误。在这种情况下，您可以键入C-b将光标向左移动，然后更正错误。之后，您可以使用C-f将光标向右移动。

​	当您在一行中间添加文本时，您会注意到光标右侧的字符会被“挤过去”以腾出空间插入您插入的文本。同样，当您删除光标后的文本时，光标右侧的字符会“拉回来”以填补删除文本后留下的空白空间。下面列出了编辑输入行文本的基本要点。

- C-b

  向后移动一个字符。

- C-f

  向前移动一个字符。

- `DEL` or `Backspace`

  删除光标左侧的字符。

- C-d

  删除光标下的字符。

- Printing characters

  在光标处插入字符。

- C-_ or C-x C-u

  撤消上一个编辑命令。您可以撤消到空行为止。

（根据您的配置，`Backspace`键可能被设置为删除光标左侧的字符，而`DEL`键设置为删除光标下的字符，而不是光标左侧的字符，就像C-d一样。）



#### 8.2.2 Readline 移动命令

​	上表描述了您需要的最基本按键来对输入行进行编辑。为了方便起见，除了C-b、C-f、C-d和`DEL`之外，还添加了许多其他命令。下面是一些用于更快地移动输入行的命令。

- C-a

  移动到行的开头。

- C-e

  移动到行的末尾。

- M-f

  向前移动一个单词，其中一个单词由字母和数字组成。

- M-b

  向后移动一个单词。

- C-l

  清屏，将当前行重新打印在顶部。

​	请注意，C-f向前移动一个字符，而M-f向前移动一个单词。这是一种宽松的约定，即控制按键用于字符，而元按键用于单词。





#### 8.2.3 Readline Killing Commands



​	“删除”文本意味着从行中删除文本，但将其保存以备后用，通常是通过“插入”（重新插入）回到行中。 （“剪切”和“粘贴”是更近期的术语，用于代替“删除”和“插入”。）

​	如果某个命令的描述说它“删除”文本，那么您可以确定可以在稍后的不同（或相同）位置得到该文本。

​	使用kill命令时，文本保存在一个“kill-ring”中。连续的多次删除将所有删除的文本保存在一起，因此当您重新插入时，您可以得到所有文本。kill ring不是特定于某一行的；您在先前键入的行上删除的文本在您键入另一行时可供稍后重新插入。

​	以下是用于删除文本的命令列表。

- C-k

  从光标当前位置删除到行尾的文本。

- M-d

  从光标到当前单词的末尾删除文本，或者如果位于单词之间，则删除到下一个单词的末尾。单词边界与M-f使用的相同。

- M-DEL

  从光标到当前单词的开头删除文本，或者如果位于单词之间，则删除到上一个单词的开头。单词边界与M-b使用的相同。

- C-w

  从光标到前面的空格删除文本。与M-DEL不同，因为单词边界不同。

​	以下是如何将文本“粘贴”回到行中。粘贴意味着将最近删除的文本从删除缓冲区复制回来。

- C-y

  将最近删除的文本从缓冲区插入到光标处。

- M-y

  旋转kill-ring，并插入新的顶部。只有在先前的命令是C-y或M-y时才能这样做。





#### 8.2.4 Readline 参数

​	您可以向Readline命令传递数值参数。有时参数作为重复计数，其他时候参数的*符号*是重要的。如果您向通常朝向前方向运行的命令传递负参数，该命令将以向后方向运行。例如，要删除文本直到行的开头，您可以键入`M-- C-k`。

​	向命令传递数值参数的一般方法是在命令之前键入元数字。如果第一个键入的`数字`是负号（`-`），则参数的符号将为负。一旦您键入一个元数字以启动参数，您可以键入其余数字，然后再键入命令。例如，要给C-d命令传递10个参数，可以键入`M-1 0 C-d`，这将删除输入行上的下一个十个字符。





#### 8.2.5 在历史记录中搜索命令

​	Readline提供了在命令历史记录（参见[Bash历史记录功能](https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Facilities)）中搜索包含指定字符串的行的命令。有两种搜索模式：*增量搜索* 和 *非增量搜索* 。

​	增量搜索在用户完成输入搜索字符串之前开始。每键入搜索字符串的一个字符，Readline会显示与迄今为止键入的字符串匹配的历史记录的下一个条目。增量搜索仅需要找到所需历史记录条目所需的字符。要向后搜索特定字符串的历史记录，请键入C-r。键入C-s将向前搜索历史记录。增量搜索使用`isearch-terminators`变量值中存在的字符来终止搜索。如果该变量尚未被赋值，则`ESC`和C-J字符将终止增量搜索。C-g将中止增量搜索并恢复原始行。搜索终止后，包含搜索字符串的历史记录条目成为当前行。

​	要查找历史记录列表中的其他匹配条目，请键入相应的C-r或C-s。这将根据迄今为止键入的搜索字符串向后或向前搜索历史记录，以查找下一个匹配的条目。任何其他绑定到Readline命令的键序列都将终止搜索并执行该命令。例如，按`RET`将终止搜索并接受该行，从而执行历史记录列表中的命令。移动命令将终止搜索，使找到的最后一行成为当前行，并开始编辑。

​	Readline会记住最后的增量搜索字符串。如果连续键入两个C-r而没有中间字符定义新的搜索字符串，则将使用任何记住的搜索字符串。

​	非增量搜索在开始搜索匹配历史记录行之前读取整个搜索字符串。搜索字符串可以由用户键入，也可以是当前行内容的一部分。





### 8.3 Readline 初始化文件



​	尽管Readline库默认安装了一组类似Emacs的键绑定，但可以使用不同的键绑定。任何用户都可以通过将命令放入*inputrc*文件（通常位于用户的主目录中）来自定义使用Readline的程序。此文件的名称取自shell变量`INPUTRC`的值。如果该变量未设置，则默认为~/.inputrc。如果该文件不存在或无法读取，则最终默认为/etc/inputrc。`bind`内置命令也可以用于设置Readline键绑定和变量。请参阅[Bash内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)。

​	当使用Readline库的程序启动时，会读取init文件并设置键绑定。

​	此外，`C-x C-r`命令重新读取此init文件，从而合并您可能对其进行的任何更改。







#### 8.3.1 Readline 初始化文件语法

​	Readline初始化文件中只允许几个基本结构。空行将被忽略。以`#`开头的行是注释行。以`$`开头的行表示条件结构（参见[条件初始化结构](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Init-Constructs)）。其他行表示变量设置和键绑定。

- 变量设置

  您可以通过在init文件中使用`set`命令修改Readline的变量值，从而修改Readline的运行时行为。语法很简单：

  ```
set variable value
  ```
  
  例如，以下是如何从默认的Emacs-like键绑定更改为使用`vi`行编辑命令的示例：

  ```
set editing-mode vi
  ```

  变量名和值（如果适用）的识别不区分大小写。未被识别的变量名将被忽略。
  
  布尔变量（可以设置为开启或关闭的变量）如果值为null或空、on（不区分大小写）或1，则设置为开启。任何其他值将导致变量被设置为关闭。

  `bind -V`命令列出当前Readline变量名和值。请参阅[Bash内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)。

  使用以下变量可以更改许多运行时行为。

  `active-region-start-color`：一个字符串变量，控制显示活动区域（参见下面的`enable-active-region`描述）中的文本的文本颜色和背景。此字符串不能占据显示器上的任何物理字符位置，因此它只应包含终端转义序列。它在显示活动区域中的文本之前输出到终端。每当终端类型更改时，此变量会重置为默认值。默认值是将终端置于显着模式的字符串，从终端的terminfo描述获取。示例值可能是`\e[01;33m`。

  `active-region-end-color`：一个字符串变量，用于"撤销" `active-region-start-color`的效果，并在显示活动区域中的文本之后恢复"正常"终端显示外观。此字符串不能占据显示器上的任何物理字符位置，因此它只应包含终端转义序列。它在显示活动区域中的文本之后输出到终端。每当终端类型更改时，此变量会重置为默认值。默认值是从终端的terminfo描述获取的将终端从显着模式恢复的字符串。示例值可能是`\e[0m`。

  `bell-style`：控制当Readline希望响起终端响铃时会发生什么。如果设置为`none`，Readline将永不响铃。如果设置为`visible`，Readline将使用可见响铃（如果可用）。如果设置为`audible`（默认），Readline将尝试响铃终端的响铃。

  `bind-tty-special-chars`：如果设置为`on`（默认），Readline将尝试将内核终端驱动程序特别处理的控制字符绑定到它们的Readline等效字符。

  `blink-matching-paren`：如果设置为`on`，Readline尝试在插入关闭括号时将光标短暂地移到开括号。默认值为`off`。

  `colored-completion-prefix`：如果设置为`on`，在列出完成项时，Readline会使用不同的颜色显示可能完成项的公共前缀。颜色定义取自`LS_COLORS`环境变量的值。如果`LS_COLORS`中对自定义后缀`readline-colored-completion-prefix`进行了颜色定义，则Readline将使用此颜色作为公共前缀的颜色，而不是其默认颜色。默认值为`off`。

  `colored-stats`：如果设置为`on`，Readline将使用不同的颜色显示可能的完成项，以指示它们的文件类型。颜色定义取自`LS_COLORS`环境变量的值。默认值为`off`。

  `comment-begin`：执行`insert-comment`命令时，在行的开头插入的字符串。默认值为`"#"`。

  `completion-display-width`：在执行完成时用于显示可能匹配项的屏幕列数。如果值小于0或大于终端屏幕宽度，则忽略该值。值为0将导致每行显示一个匹配项。默认值为-1。

  `completion-ignore-case`：如果设置为`on`，Readline将以不区分大小写的方式进行文件名匹配和完成。默认值为`off`。

  `completion-map-case`：如果设置为`on`，并且启用了`completion-ignore-case`，Readline在执行不区分大小写的文件名匹配和完成时将连字符（`-`）和下划线（`_`）视为相同。默认值为`off`。

  `completion-prefix-display-length`：在显示可能完成项时，显示未经修改的可能完成项列表的公共前缀的长度（可能为空）。当设置为大于零的值时，超过此值的公共前缀在显示可能完成项时将替换为省略号。

  `completion-query-items`：确定是否要询问用户是否应显示可能完成项列表的可能完成项数目。如果可能完成项数目大于或等于此值，Readline将询问用户是否希望查看它们；否则，它们将仅列出。此变量必须设置为大于或等于零的整数值。零值意味着Readline永远不会询问；负值视为零。默认限制为`100`。

  `convert-meta`：如果设置为`on`，Readline将转换具有第八位设置的字符为ASCII键序列，通过去除第八位并在前面添加一个`ESC`字符，将其转换为带元前缀的键序列。默认值为`on`，但如果区域设置中包含八位字符，则将其设置为`off`。该变量依赖于`LC_CTYPE`区域设置类别，如果更改区域设置，则可能会更改此变量的值。

  `disable-completion`：如果设置为`On`，Readline将禁止单词完成。完成字符将被插入到行中，就像它们已被映射到`self-insert`一样。默认值为`off`。

  `echo-control-characters`：当设置为`on`时，在支持的操作系统上，Readline会回显与键盘生成的信号相对应的字符。默认值为`on`。

  `editing-mode`：`editing-mode`变量控制使用哪个默认的键绑定集。默认情况下，Readline以Emacs编辑模式启动，其中按键与Emacs最相似。此变量可以设置为`emacs`或`vi`。

  `emacs-mode-string`：如果启用了show-mode-in-prompt变量，则在激活emacs编辑模式时，在主提示的最后一行之前立即显示此字符串。该值会像键绑定一样展开，因此可以使用标准的元和控制前缀以及反斜杠转义序列。使用`\1`和`\2`转义序列来开始和结束非打印字符序列，这可以用于将终端控制序列嵌入到模式字符串中。默认值为`@`。

  `enable-active-region`：*point*是当前光标位置，*mark*是保存的光标位置（参见[Commands For Moving](https://www.gnu.org/software/bash/manual/bash.html#Commands-For-Moving)）。点和标记之间的文本称为*region*。当此变量设置为`On`时，Readline允许某些命令指定该区域为*active*。当区域处于活动状态时，Readline使用`active-region-start-color`的值来突出显示区域中的文本，默认值为启用终端的显着模式的字符串。活动区域显示由方括号粘贴插入的文本以及增量和非增量历史搜索找到的任何匹配文本。默认值为`On`。

  `enable-bracketed-paste`：当设置为`On`时，Readline会将终端配置为将每个粘贴的内容作为单个字符字符串插入到编辑缓冲区中，而不是将每个字符视为从键盘读取的字符。这称为将终端置于*bracketed paste mode*，它会阻止Readline执行绑定到粘贴文本中出现的按键序列的任何编辑命令。默认值为`On`。

  `enable-keypad`：当设置为`on`时，Readline将尝试在调用时启用应用程序键盘。某些系统需要这样做以启用箭头键。默认值为`off`。

  `enable-meta-key`：当设置为`on`时，Readline将在调用时尝试启用终端声称支持的任何元修饰键。在许多终端上，元键用于发送八位字符。默认值为`on`。

  `expand-tilde`：如果设置为`on`，则在Readline尝试进行单词完成时，会执行波浪线展开。默认值为`off`。

  `history-preserve-point`：如果设置为`on`，历史记录代码将尝试将点（当前光标位置）放置在使用`previous-history`或`next-history`检索的每行历史记录的相同位置。默认值为`off`。

  `history-size`：设置保存在历史记录列表中的最大历史记录条目数。如果设置为零，将删除任何现有的历史记录条目，并且不保存新的条目。如果设置为小于零的值，则历史记录条目的数量不受限制。默认情况下，历史记录条目的数量不受限制。如果尝试将history-size设置为非数字值，则将最大历史记录条目数设置为500。

  `horizontal-scroll-mode`：此变量可以设置为`on`或`off`。将其设置为`on`表示正在编辑的行的文本在屏幕宽度小于屏幕宽度时在单个屏幕行上水平滚动，而不是换行到新的屏幕行。对于高度为1的终端，此变量将自动设置为`on`。默认情况下，此变量设置为`off`。

  `input-meta`：如果设置为`on`，Readline将启用八位输入（在读取的字符中不会清除第八位），而不管终端声称支持什么。默认值为`off`，但如果区域设置包含八位字符，则Readline将其设置为`on`。名称`meta-flag`是此变量的同义词。此变量依赖于`LC_CTYPE`区域设置类别，如果更改区域设置，则可能会更改此变量的值。

  `isearch-terminators`：应终止增量搜索的字符的字符串，而不会随后将字符作为命令执行（参见[搜索历史记录中的命令](https://www.gnu.org/software/bash/manual/bash.html#Searching)）。如果此变量没有被赋予一个值，字符`ESC`和C-J将终止增量搜索。

  `keymap`：为键绑定命令设置Readline的当前键映射。内置`keymap`名称为`emacs`、`emacs-standard`、`emacs-meta`、`emacs-ctlx`、`vi`、`vi-move`、`vi-command`和`vi-insert`。`vi`相当于`vi-command`（`vi-move`也是一个同义词）；`emacs`相当于`emacs-standard`。应用程序可以添加额外的名称。默认值为`emacs`。`editing-mode`变量的值也会影响默认键映射。

  `keyseq-timeout`：指定Readline在读取不明确的键序列（可以使用到目前为止的输入形成完整的键序列，或者可以接受附加输入以完成较长的键序列）时等待字符的持续时间。如果在超时时间内没有收到输入，Readline将使用较短但完整的键序列。Readline使用此值来确定当前输入源（默认情况下为`rl_instream`）是否有输入可用。该值以毫秒为单位指定，因此值为1000表示Readline将等待一秒钟的附加输入。如果此变量设置为小于或等于零的值，或者设置为非数字值，则Readline将等待按下另一个键来决定要完成哪个键序列。默认值为`500`。

  `mark-directories`：如果设置为`on`，已完成的目录名称将附加一个斜杠。默认值为`on`。

  `mark-modified-lines`：当设置为`on`时，Readline会在已被修改的历史记录行的开头显示一个星号（`*`）。默认情况下，此变量为`off`。

  `mark-symlinked-directories`：如果设置为`on`，已完成的名称是指向目录的符号链接，则附加一个斜杠（取决于`mark-directories`的值）。默认值为`off`。

  `match-hidden-files`：当设置为`on`时，Readline在执行文件名完成时匹配以`.`开头的文件（隐藏文件）。如果设置为`off`，则必须由用户在要完成的文件名中提供前导`.`。默认情况下，此变量为`on`。

  `menu-complete-display-prefix`：如果设置为`on`，菜单完成将在循环显示列表之前显示可能完成项列表（可能为空）的公共前缀。默认值为`off`。

  `output-meta`：如果设置为`on`，Readline将直接显示第八位设置的字符，而不是作为带有元前缀的转义序列。默认值为`off`，但如果区域设置包含八位字符，则Readline将其设置为`on`。此变量依赖于`LC_CTYPE`区域设置类别，如果更改区域设置，则可能会更改此变量的值。

  `page-completions`：如果设置为`on`，Readline将使用类似`more`的内部分页程序一次显示一屏幕可能的完成项。默认情况下，此变量为`on`。

  `print-completions-horizontally`：如果设置为`on`，Readline将以字母顺序水平显示匹配的完成项，而不是在屏幕上向下显示。默认值为`off`。

  `revert-all-at-newline`：如果设置为`on`，Readline将在执行`accept-line`时返回之前撤消所有对历史记录行的更改。默认情况下，历史记录行可以在对`readline()`的调用之间被修改并保留各自的撤消列表。默认值为`off`。

  `show-all-if-ambiguous`：这改变了完成函数的默认行为。如果设置为`on`，具有多个可能完成的单词会导致立即列出匹配项，而不会响铃。默认值为`off`。

  `show-all-if-unmodified`：这改变了完成函数的默认行为，类似于`show-all-if-ambiguous`。如果设置为`on`，没有可能的部分完成（可能完成不共享公共前缀）的单词会导致立即列出匹配项，而不会响铃。默认值为`off`。

  `show-mode-in-prompt`：如果设置为`on`，则在提示的开头添加一个字符串，指示编辑模式：emacs、vi命令或vi插入。模式字符串是可由用户设置的（例如，emacs-mode-string）。默认值为`off`。

  `skip-completed-text`：如果设置为`on`，则在向行中插入单个匹配项时，会更改默认的完成行为。仅在单词的中间执行完成时才激活它。如果启用，Readline不会插入与正在完成的单词中光标后面的字符相匹配的完成字符，因此不会复制光标后面的单词部分。例如，如果启用此功能，并且光标在`Makefile`的`e`之后时尝试完成，结果将是`Makefile`而不是`Makefilefile`，假设只有一个可能的完成项。默认值为`off`。

  `vi-cmd-mode-string`：如果启用了show-mode-in-prompt变量，则在激活vi编辑模式和命令模式时，在主提示的最后一行之前立即显示此字符串。该值会像键绑定一样展开，因此可以使用标准的元和控制前缀以及反斜杠转义序列。使用`\1`和`\2`转义序列来开始和结束非打印字符序列，这可以用于将终端控制序列嵌入到模式字符串中。默认值为`(cmd)`。

  `vi-ins-mode-string`：如果启用了show-mode-in-prompt变量，则在激活vi编辑模式和插入模式时，在主提示的最后一行之前立即显示此字符串。该值会像键绑定一样展开，因此可以使用标准的元和控制前缀以及反斜杠转义序列。使用`\1`和`\2`转义序列来开始和结束非打印字符序列，这可以用于将终端控制序列嵌入到模式字符串中。默认值为`(ins)`。

  `visible-stats`：如果设置为`on`，则在列出可能完成项时，会在文件名后附加表示文件类型的字符。默认值为`off`。

   

- 键绑定

  在初始化文件中控制键绑定的语法很简单。首先，您需要找到要更改的命令的名称。以下部分包含命令名称、默认键绑定（如果有）以及命令功能的简短描述的表格。
  
  一旦您知道命令的名称，只需在初始化文件中的一行上放置您希望绑定到命令的键的名称、冒号，然后是命令的名称。键的名称可以用不同的方式表示，具体取决于您最舒服的方式。
  
  除了命令名称，Readline还允许将键绑定到在按键时插入的字符串（宏）。
  
  `bind -p` 命令以可直接放入初始化文件的格式显示 Readline 函数名称和绑定。请参阅 [Bash 内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)。
  
  - keyname: function-name or macro 键名：函数名称或宏
  
    键名是用英文拼写出的按键名称。例如：
  
    ```
  Control-u: universal-argument
    Meta-Rubout: backward-kill-word
    Control-o: "> output"
    ```
    
    在上面的示例中，C-u 绑定到函数 `universal-argument`，M-DEL 绑定到函数 `backward-kill-word`，C-o 绑定到执行右边表达式的宏（即将文本 `> output` 插入到行中）。处理此键绑定语法时，会识别一些符号字符名称：DEL、ESC、ESCAPE、LFD、NEWLINE、RET、RETURN、RUBOUT、SPACE、SPC 和 TAB。
  
  - "keyseq": function-name or macro "键序列"：函数名称或宏
  
    "键序列" 与上面的键名不同，可以指定表示整个键序列的字符串，只需将键序列放在双引号中。一些 GNU Emacs 风格的键逃逸也可以使用，如下面的示例所示，但不识别特殊字符名称。
  
    ```
    "\C-u": universal-argument
    "\C-x\C-r": re-read-init-file
    "\e[11~": "Function Key 1"
    ```
    
    在上面的示例中，C-u 再次绑定到函数 `universal-argument`（与第一个示例中的一样），`C-x C-r` 绑定到函数 `re-read-init-file`，`ESC [ 1 1 ~` 绑定到插入文本 `Function Key 1`。
  
    
  
  GNU Emacs 风格的逃逸序列在指定键序列时提供以下选项：
  
  - `\C-`：控制前缀
  - `\M-`：元前缀
  - `\e`：转义字符
  - `\\`：反斜杠
  - `\"\"`：双引号
  - `\'\'`：单引号或撇号
  
  
  
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
  
  
  
  ​	在输入宏文本时，必须使用单引号或双引号来表示宏定义。未引用的文本被视为函数名。在宏体中，会展开上述反斜杠逃逸。反斜杠将对宏文本中的任何其他字符进行转义，包括 `"` 和 `'`。例如，以下绑定将使 `C-x \` 插入一个单独的 `\` 到行中：
  
  ```
  "\C-x\\": "\\"
  ```
  
  





#### 8.3.2 条件初始化结构

​	Readline 实现了一种类似于 C 预处理器的条件编译功能，允许根据测试的结果执行键绑定和变量设置。有四个解析器指令用于此目的。

- `$if`

  `$if` 结构允许基于编辑模式、使用的终端或使用 Readline 的应用程序进行绑定。测试的文本，在任何比较运算符之后，延伸到行的末尾；除非另有说明，不需要任何字符来隔离它。

  `mode`：`$if` 指令的 `mode=` 形式用于测试 Readline 是否处于 `emacs` 或 `vi` 模式。例如，这可与 `set keymap` 命令一起使用，只有当 Readline 在 `emacs` 模式下启动时，才设置 `emacs-standard` 和 `emacs-ctlx` 键映射中的绑定。

  `term`：`term=` 形式可用于包含特定于终端的键绑定，也许是为了绑定终端功能键输出的键序列。`=` 右侧的单词将与终端的完整名称和第一个 `-` 前的终端名称部分进行匹配。这允许 `sun` 匹配 `sun` 和 `sun-cmd`，例如。

  `version`：`version` 测试可用于与特定的 Readline 版本进行比较。`version` 展开为当前的 Readline 版本。可用的比较运算符包括 `=`（和 `==`）、`!=`、`<=`、`>=`、`<` 和 `>`。运算符右侧提供的版本号包括主版本号、可选的小数点和可选的次版本号（例如 `7.1`）。如果省略次版本号，则默认为 `0`。运算符可以与字符串 `version` 和版本号参数之间用空格分隔。以下示例设置一个变量，如果使用的 Readline 版本是 7.0 或更高版本：


  ```sh
  $if version >= 7.0
  set show-mode-in-prompt on
  $endif
  ```

  `application`：application 结构用于包含特定于应用程序的设置。每个使用 Readline 库的程序都会设置应用程序名称，您可以测试特定的值。这可用于将键序列绑定到特定程序有用的功能上。例如，以下命令添加了一个键序列，用于在 Bash 中引用当前或前一个单词：

  ```sh
  $if Bash
  # Quote the current or previous word
  "\C-xq": "\eb\"\ef\""
  $endif
  ```

  `variable`：variable 结构提供了对 Readline 变量和值的简单等式测试。允许使用的比较运算符有 `=`、`==` 和 `!=`。变量名必须与比较运算符用空格分隔；运算符可以与右侧值用空格分隔。可以测试字符串和布尔变量。布尔变量必须根据 on 和 off 进行测试。以下示例等同于上面描述的 `mode=emacs` 测试：

  ```sh
  $if editing-mode == emacs
  set show-mode-in-prompt on
  $endif
  ```

  

- `$endif`

  正如前面的示例中所见，此命令终止 `$if` 命令。

- `$else`

  如果测试失败，则执行 `$if` 指令的此分支中的命令。

- `$include`

  此指令以单个文件名作为参数，并从该文件中读取命令和绑定。例如，以下指令从 /etc/inputrc 中读取：
  
  ```
  $include /etc/inputrc
  ```
  
  





#### 8.3.3 示例初始化文件

​	以下是一个 inputrc 文件的示例。这展示了键绑定、变量赋值和条件语法。

  ```
# 以下是一个 inputrc 文件的示例。
# 这控制着使用 GNU Readline 库的程序中的行输入编辑行为。
# 现有的程序包括 FTP、Bash 和 GDB。
#
# 您可以使用 C-x C-r 重新读取 inputrc 文件。以 '#' 开头的行是注释。
#
# 首先，包括来自 /etc/Inputrc 的任何系统范围的绑定和变量赋值。
$include /etc/Inputrc

#
# 为 emacs 模式设置不同的绑定。

set editing-mode emacs 

$if mode=emacs

Meta-Control-h:	backward-kill-word	Text after the function name is ignored

#
# 下面是在小键盘模式下的箭头键绑定
#
#"\M-OD":        backward-char
#"\M-OC":        forward-char
#"\M-OA":        previous-history
#
# 在 ANSI 模式下的箭头键绑定
#
"\M-[D":        backward-char
"\M-[C":        forward-char
"\M-[A":        previous-history
"\M-[B":        next-history
#
# 在 8 位小键盘模式下的箭头键绑定
#
#"\M-\C-OD":       backward-char
#"\M-\C-OC":       forward-char
#"\M-\C-OA":       previous-history
#"\M-\C-OB":       next-history
#
# 在 8 位 ANSI 模式下的箭头键绑定
#
#"\M-\C-[D":       backward-char
#"\M-\C-[C":       forward-char
#"\M-\C-[A":       previous-history
#"\M-\C-[B":       next-history

C-q: quoted-insert

$endif

# 旧式绑定。这也是默认设置。
TAB: complete

# 对于与 shell 交互方便的宏
$if Bash
# edit the path
"\C-xp": "PATH=${PATH}\e\C-e\C-a\ef\C-f"
# 准备输入引号包裹的单词 --
# 插入开头和结尾的双引号
# 并移到开头引号的后面
"\C-x\"": "\"\"\C-b"
# 插入反斜杠（测试反斜杠转义
# 在序列和宏中）
"\C-x\\": "\\"
# 引用当前或上一个单词
"\C-xq": "\eb\"\ef\""
# 添加一个刷新行的绑定，该绑定未绑定
"\C-xr": redraw-current-line
# 在当前行编辑变量。
"\M-\C-v": "\C-a\C-k$\C-y\M-\C-e\C-a\C-y="
$endif

# 使用可见的提示音（可用时）
set bell-style visible

# 在读取时不要将字符截断为7位
set input-meta on

# 允许插入 ISO-Latin1 字符，而不是转换为前缀-Meta序列
set convert-meta off

# 直接显示具有第八位设置的字符，而不是作为Meta前缀字符显示
set output-meta on
# 如果单词有150个或更多的可能完成项，
# 询问用户是否要查看所有完成项
set completion-query-items 150

# 对于FTP
$if Ftp
"\C-xg": "get \M-?"
"\C-xt": "put \M-?"
"\M-.": yank-last-arg
$endif
  ```





### 8.4 可绑定的 Readline 命令

​	本节描述可以绑定到键序列的 Readline 命令。您可以通过执行 `bind -P` 或者更简洁的格式 `bind -p`（适用于 inputrc 文件），列出您的键绑定。(参见[Bash 内置命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)。) 默认情况下，没有附带键序列的命令是未绑定的。

​	在以下描述中，*point* 指的是当前光标位置，*mark* 指的是由 `set-mark` 命令保存的光标位置。光标和标记之间的文本被称为*区域*。




#### 8.4.1 光标移动命令

- `beginning-of-line (C-a)`

  移动到当前行的开头。

- `end-of-line (C-e)`

  移动到当前行的末尾。

- `forward-char (C-f)`

  向前移动一个字符。

- `backward-char (C-b)`

  向后移动一个字符。

- `forward-word (M-f)`

  向前移动到下一个单词的末尾。单词由字母和数字组成。

- `backward-word (M-b)`

  向后移动到当前或前一个单词的开头。单词由字母和数字组成。

- `shell-forward-word (M-C-f)`

  向前移动到下一个单词的末尾。单词由未加引号的 shell 元字符界定。

- `shell-backward-word (M-C-b)`

  向后移动到当前或前一个单词的开头。单词由未加引号的 shell 元字符界定。

- `previous-screen-line ()`

  尝试将光标移动到上一个物理屏幕行上的相同列。如果当前的 Readline 行不占据超过一个物理行，或者光标位置不大于提示符加上屏幕宽度的长度，则此命令不会起作用。

- `next-screen-line ()`

  尝试将光标移动到下一个物理屏幕行上的相同列。如果当前的 Readline 行不占据超过一个物理行，或者当前 Readline 行的长度不大于提示符加上屏幕宽度的长度，则此命令不会起作用。

- `clear-display (M-C-l)`

  清除屏幕，并如果可能，清除终端的回滚缓冲区，然后重新绘制当前行，将当前行置于屏幕顶部。

- `clear-screen (C-l)`

  清除屏幕，然后重新绘制当前行，将当前行置于屏幕顶部。

- `redraw-current-line ()`

  刷新当前行。默认情况下，此命令未绑定。





#### 8.4.2 历史记录操作命令

- `accept-line (Newline or Return)`

  接受当前行，无论光标在什么位置。如果此行非空，则根据 `HISTCONTROL` 和 `HISTIGNORE` 变量的设置将其添加到历史列表中。如果此行是修改过的历史行，则将历史行恢复为其原始状态。

- `previous-history (C-p)`

  向后移动并从历史列表中获取上一条命令。

- `next-history (C-n)`

  向前移动并从历史列表中获取下一条命令。

- `beginning-of-history (M-<)`

  移动到历史的第一行。

- `end-of-history (M->)`

  移动到输入历史的末尾，即当前正在输入的行。

- `reverse-search-history (C-r)`

  从当前行开始向后搜索，并根据需要移动到历史记录中的上一条命令。这是一个递增搜索。此命令设置区域以匹配的文本，并激活标记。

- `forward-search-history (C-s)`

  从当前行开始向前搜索，并根据需要移动到历史记录中的下一条命令。这是一个递增搜索。此命令设置区域以匹配的文本，并激活标记。

- `non-incremental-reverse-search-history (M-p)`

  从当前行开始向后搜索，并根据需要使用用户提供的非递增搜索字符串移动到历史记录中的上一条命令。搜索字符串可以匹配历史行中的任何位置。

- `non-incremental-forward-search-history (M-n)`

  从当前行开始向前搜索，并根据需要使用用户提供的非递增搜索字符串移动到历史记录中的下一条命令。搜索字符串可以匹配历史行中的任何位置。

- `history-search-forward ()`

  从当前行的开头到光标位置之间搜索历史记录中的字符串。搜索字符串必须匹配历史行的开头。这是一个非递增搜索。默认情况下，此命令未绑定。

- `history-search-backward ()`

  从当前行的开头到光标位置之间向后搜索历史记录中的字符串。搜索字符串必须匹配历史行的开头。这是一个非递增搜索。默认情况下，此命令未绑定。

- `history-substring-search-forward ()`

  从当前行的开头到光标位置之间向前搜索历史记录中的字符串。搜索字符串可以匹配历史行中的任何位置。这是一个非递增搜索。默认情况下，此命令未绑定。

- `history-substring-search-backward ()`

  从当前行的开头到光标位置之间向后搜索历史记录中的字符串。搜索字符串可以匹配历史行中的任何位置。这是一个非递增搜索。默认情况下，此命令未绑定。

- `yank-nth-arg (M-C-y)`

  在光标位置插入前一条命令的第一个参数（通常是前一行的第二个单词）。如果提供了参数 n，则插入前一条命令的第 n 个单词（前一条命令的单词从单词 0 开始）。负数参数将插入前一条命令的倒数第 n 个单词。一旦计算出参数 n，则提取参数就像指定了 `!n` 历史扩展一样。

- `yank-last-arg (M-. or M-_)`

  在光标位置插入前一条命令的最后一个参数（前一条历史记录条目的最后一个单词）。通过数字参数，表现与 `yank-nth-arg` 完全相同。连续调用 `yank-last-arg` 将在历史列表中向后移动，依次插入每一行的最后一个单词（或由第一个调用的参数指定的单词）。连续调用这些命令并提供任何数字参数，将决定历史记录的遍历方向（向后或向前）。历史扩展工具用于提取最后一个参数，就像指定了 `!$` 历史扩展一样。

- `operate-and-get-next (C-o)`

  接受当前行以返回给调用应用程序，就像输入换行符一样，并从历史中获取相对于当前行的下一行以进行编辑。如果提供了数字参数，则使用该历史条目代替当前行。

- `fetch-history ()`

  使用数字参数从历史列表中获取相应的条目，并将其设为当前行。如果没有参数，则返回到历史列表中的第一个条目。





#### 8.4.3 文本修改命令

- `*end-of-file* (usually C-d)`

  表示文件结束的字符，例如通过 `stty` 设置。如果在行上没有字符，且光标位于行的开头时读取此字符，Readline 将将其解释为输入的结束，并返回 EOF。

- `delete-char (C-d)`

  删除光标位置的字符。如果将此函数绑定到与 tty 的 EOF 字符相同的字符（通常是 C-d），请参阅上面的效果说明。

- `backward-delete-char (Rubout)`

  删除光标后面的字符。数字参数表示删除字符而不是杀死字符。

- `forward-backward-delete-char ()`

  删除光标下的字符，除非光标在行的末尾，在这种情况下，删除光标后面的字符。默认情况下，此命令未绑定到任何键。

- `quoted-insert (C-q or C-v)`

  逐字添加下一个键入的字符到行中。这是插入类似 C-q 的键序列的方法。

- `self-insert (a, b, A, 1, !, …)`

  Insert yourself.

  插入字符本身。

- `bracketed-paste-begin ()`

  此函数旨在绑定到一些终端发送的“括号粘贴”转义序列，并且默认情况下已分配此绑定。它允许 Readline 将粘贴的文本作为单个单元插入，而不是将每个字符视为从键盘读取。这些字符被插入，就像每个字符都绑定到 `self-insert` 而不是执行任何编辑命令。括号粘贴设置区域（光标与标记之间的字符）为插入的文本。它使用“活动标记”的概念：当标记处于活动状态时，Readline 重显示使用终端的反白显示模式来表示区域。

- `transpose-chars (C-t)`

  将光标前面的字符拖移到光标处的字符上，并将光标向前移动。如果插入点在行的末尾，则会交换行的最后两个字符。负数参数没有影响。

- `transpose-words (M-t)`

  将光标前的单词移到光标后的单词上，并将光标移到该单词之后。如果插入点在行的末尾，则会交换行的最后两个单词。

- `upcase-word (M-u)`

  将当前（或后面的）单词转换为大写。使用负数参数时，将前一个单词转换为大写，但不移动光标。

- `downcase-word (M-l)`

  将当前（或后面的）单词转换为小写。使用负数参数时，将前一个单词转换为小写，但不移动光标。

- `capitalize-word (M-c)`

  将当前（或后面的）单词的首字母大写。使用负数参数时，将前一个单词的首字母大写，但不移动光标。

- `overwrite-mode ()`

  切换覆盖模式。通过显式的正数数字参数，切换到覆盖模式。通过显式的非正数数字参数，切换到插入模式。此命令仅影响 `emacs` 模式；`vi` 模式以不同的方式执行覆盖。每次调用 `readline()` 时都会以插入模式开始。在覆盖模式下，绑定为 `self-insert` 的字符将替换点处的文本，而不是将文本向右推动。绑定为 `backward-delete-char` 的字符将用空格替换点前面的字符。默认情况下，此命令未绑定。





#### 8.4.4 剪切和粘贴 Killing And Yanking

- `kill-line (C-k)`

  从光标到行尾的文本被剪切。如果提供了负数数字参数，则从光标到当前行的开头进行剪切。

- `backward-kill-line (C-x Rubout)`

  从光标向行的开头进行剪切。如果提供了负数数字参数，则从光标向当前行的末尾进行剪切。

- `unix-line-discard (C-u)`

  从光标向行的开头进行剪切。

- `kill-whole-line ()`

  剪切当前行的所有字符，无论光标在什么位置。默认情况下，此命令未绑定。

- `kill-word (M-d)`

  从光标位置剪切到当前单词的末尾，或者如果光标位于单词之间，则剪切到下一个单词的末尾。单词边界与 `forward-word` 相同。

- `backward-kill-word (M-DEL)`

  剪切光标后的单词。单词边界与 `backward-word` 相同。

- `shell-kill-word (M-C-d)`

  从光标位置剪切到当前单词的末尾，或者如果光标位于单词之间，则剪切到下一个单词的末尾。单词边界与 `shell-forward-word` 相同。

- `shell-backward-kill-word ()`

  剪切光标后的单词。单词边界与 `shell-backward-word` 相同。

- `shell-transpose-words (M-C-t)`

  将光标前的单词移到光标后的单词上，并将光标移到该单词之后。如果插入点在行的末尾，则会交换行的最后两个单词。单词边界与 `shell-forward-word` 和 `shell-backward-word` 相同。

- `unix-word-rubout (C-w)`

  使用空格作为单词边界剪切光标后的单词。被剪切的文本保存在 kill-ring 中。

- `unix-filename-rubout ()`

  使用空格和斜杠字符作为单词边界剪切光标后的单词。被剪切的文本保存在 kill-ring 中。

- `delete-horizontal-space ()`

  删除光标周围的所有空格和制表符。默认情况下，此命令未绑定。

- `kill-region ()`

  剪切当前区域中的文本。默认情况下，此命令未绑定。

- `copy-region-as-kill ()`

  将区域中的文本复制到 kill 缓冲区，以便可以立即粘贴。默认情况下，此命令未绑定。

- `copy-backward-word ()`

  将光标前的单词复制到 kill 缓冲区。单词边界与 `backward-word` 相同。默认情况下，此命令未绑定。

- `copy-forward-word ()`

  将光标后的单词复制到 kill 缓冲区。单词边界与 `forward-word` 相同。默认情况下，此命令未绑定。

- `yank (C-y)`

  将 kill 环中的内容粘贴到光标处的缓冲区。

- `yank-pop (M-y)`

  旋转 kill 环，并粘贴新的顶部内容。仅在先前的命令是 `yank` 或 `yank-pop` 时可以执行此操作。





#### 8.4.5 指定数值参数

- `digit-argument (M-0, M-1, … M--)`

  将此数字添加到已经累积的参数中，或开始一个新的参数。M-- 表示一个负数参数。

- `universal-argument ()`

  这是另一种指定参数的方式。如果在该命令后跟一个或多个数字，可选择带有负号的前导符号，这些数字定义了参数。如果该命令后跟数字，再次执行 `universal-argument` 将结束数值参数，但忽略其他情况。作为特例，如果该命令紧接着跟着一个既不是数字也不是负号的字符，下一条命令的参数计数将乘以四。参数计数最初为一，因此第一次执行此函数将参数计数设置为四，第二次设置为十六，依此类推。默认情况下，该命令未绑定到键。





#### 8.4.6 让 Readline 为你键入

- `complete (TAB)`

  尝试对光标之前的文本进行自动补全。实际的补全操作是应用程序特定的。对于 Bash，它会依次尝试将文本视为变量（如果文本以 `$` 开头），用户名（如果文本以 `~` 开头），主机名（如果文本以 `@` 开头）或命令（包括别名和函数）。如果这些都没有匹配，则尝试进行文件名补全。

- `possible-completions (M-?)`

  列出光标之前的文本可能的自动补全选项。在显示补全选项时，Readline 将显示的列数设置为 `completion-display-width` 的值，环境变量 `COLUMNS` 的值或屏幕宽度，按此顺序。

- `insert-completions (M-*)`

  插入光标之前所有可能的自动补全选项。

- `menu-complete ()`

  类似于 `complete`，但用单个匹配项替换要补全的单词。重复执行 `menu-complete` 将在可能的补全列表中依次插入每个匹配项。在补全列表的末尾，会响铃（取决于 `bell-style` 的设置），并恢复原始文本。n 个参数将 n 个位置前进或后退。这个命令原本是要绑定到 `TAB` 键，但默认情况下未绑定。

- `menu-complete-backward ()`

  与 `menu-complete` 相同，但向后移动可能的补全列表，就像给 `menu-complete` 一个负数参数一样。

- `delete-char-or-list ()`

  如果不在行的开头或结尾，则删除光标下的字符（类似于 `delete-char`）。如果在行的末尾，则与 `possible-completions` 表现相同。默认情况下，此命令未绑定。

- `complete-filename (M-/)`

  尝试对光标之前的文本进行文件名补全。

- `possible-filename-completions (C-x /)`

  列出光标之前的文本可能的文件名补全选项。

- `complete-username (M-~)`

  尝试对光标之前的文本进行用户名补全。

- `possible-username-completions (C-x ~)`

  列出光标之前的文本可能的用户名补全选项。

- `complete-variable (M-$)`

  尝试对光标之前的文本进行 Shell 变量补全。

- `possible-variable-completions (C-x $)`

  列出光标之前的文本可能的 Shell 变量补全选项。

- `complete-hostname (M-@)`

  尝试对光标之前的文本进行主机名补全。

- `possible-hostname-completions (C-x @)`

  列出光标之前的文本可能的主机名补全选项。

- `complete-command (M-!)`

  尝试对光标之前的文本进行命令名补全。命令补全尝试将文本与别名、保留字、Shell 函数、Shell 内建命令以及最后是可执行文件名依次进行匹配。

- `possible-command-completions (C-x !)`

  列出光标之前的文本可能的命令名补全选项。

- `dynamic-complete-history (M-TAB)`

  尝试对光标之前的文本进行动态历史记录补全，比对历史记录列表中的文本，找到可能的匹配项。

- `dabbrev-expand ()`

  尝试对光标之前的文本进行菜单补全，比对历史记录列表中的文本，找到可能的匹配项。

- `complete-into-braces (M-{)`

  执行文件名补全，并在大括号内插入可能的补全列表，使列表对 Shell 可见（参见 [Brace Expansion](https://www.gnu.org/software/bash/manual/bash.html#Brace-Expansion)）。





#### 8.4.7 键盘宏

- `start-kbd-macro (C-x ()`

  开始保存当前键盘宏中键入的字符。

- `end-kbd-macro (C-x ))`

  停止保存当前键盘宏中键入的字符并保存定义。

- `call-last-kbd-macro (C-x e)`

  通过使宏中的字符显示为键盘上键入的字符，重新执行最后一个定义的键盘宏。

- `print-last-kbd-macro ()`

  以适用于 inputrc 文件的格式打印最后一个定义的键盘宏。





#### 8.4.8 一些杂项命令

- `re-read-init-file (C-x C-r)`

  重新读取 inputrc 文件的内容，并包含其中找到的任何绑定或变量赋值。

- `abort (C-g)`

  中止当前的编辑命令并响铃终端的铃声（取决于 `bell-style` 的设置）。

- `do-lowercase-version (M-A, M-B, M-x, …)`

  如果 metafied 字符 x 是大写的，则运行绑定到相应 metafied 小写字符的命令。如果 x 已经是小写的，则行为未定义。

- `prefix-meta (ESC)`

  将下一个键入的字符转换为 meta 键字符。这适用于没有 meta 键的键盘。输入 `ESC f` 等同于输入 M-f。

- `undo (C-_ or C-x C-u)`

  增量撤消，每行单独记忆。

- `revert-line (M-r)`

  撤消对该行所做的所有更改。这相当于执行足够多次 `undo` 命令，使得回到最开始的状态。

- `tilde-expand (M-&)`

  对当前单词执行波浪线扩展（tilde expansion）。

- `set-mark (C-@)`

  将标记设置为当前光标位置。如果提供了一个数字参数，标记会被设置为该位置。

- `exchange-point-and-mark (C-x C-x)`

  交换光标和标记的位置。当前光标位置设置为保存的位置，旧的光标位置保存为标记。

- `character-search (C-])`

  读取一个字符，并将光标移到该字符的下一个出现位置。负数参数搜索前面的出现位置。

- `character-search-backward (M-C-])`

  读取一个字符，并将光标移到该字符的前一个出现位置。负数参数搜索后面的出现位置。

- `skip-csi-sequence ()`

  读取足够的字符以消耗类似于 Home 和 End 等键定义的多键序列。这些序列通常以控制序列指示符（CSI）开始，通常为 ESC-[。如果该序列绑定为 "\e["，则产生这些序列的键将不会产生效果，除非明确绑定到 Readline 命令，而不是将杂乱的字符插入到编辑缓冲区。默认情况下，此命令未绑定，但通常绑定到 ESC-[。

- `insert-comment (M-#)`

  如果没有数字参数，则在当前行的开头插入 `comment-begin` 变量的值。如果提供了数字参数，则此命令将充当切换：如果行首的字符与 `comment-begin` 的值不匹配，则插入该值，否则从行首删除 `comment-begin` 中的字符。无论哪种情况，该行都被接受，就像键入了一个新行一样。`comment-begin` 的默认值使此命令将当前行设置为 Shell 注释。如果数字参数导致注释字符被移除，则该行将由 Shell 执行。

- `dump-functions ()`

  将所有函数及其键绑定打印到 Readline 输出流中。如果提供了数字参数，则输出以适合作为 inputrc 文件的一部分的格式进行格式化。默认情况下，此命令未绑定。

- `dump-variables ()`

  将所有可设置的变量及其值打印到 Readline 输出流中。如果提供了数字参数，则输出以适合作为 inputrc 文件的一部分的格式进行格式化。默认情况下，此命令未绑定。

- `dump-macros ()`

  将所有绑定到宏的 Readline 键序列及其输出字符串打印出来。如果提供了数字参数，则输出以适合作为 inputrc 文件的一部分的格式进行格式化。默认情况下，此命令未绑定。

- `spell-correct-word (C-x s)`

  对当前单词执行拼写纠正，将其视为目录或文件名，与 `cdspell` Shell 选项相同。单词边界与 `shell-forward-word` 使用的相同。

- `glob-complete-word (M-g)`

  将光标之前的单词视为路径名扩展的模式，隐含地附加一个星号。该模式用于生成可能的补全项的匹配文件名列表。

- `glob-expand-word (C-x *)`

  将光标之前的单词视为路径名扩展的模式，并插入匹配文件名的列表，替换该单词。如果提供了数字参数，则在路径名扩展之前附加一个 `*`。

- `glob-list-expansions (C-x g)`

  显示由 `glob-expand-word` 生成的扩展列表，并重绘该行。如果提供了数字参数，则在路径名扩展之前附加一个 `*`。

- `display-shell-version (C-x C-v)`

  显示有关当前 Bash 实例的版本信息。

- `shell-expand-line (M-C-e)`

  以 Shell 的方式展开行。这将执行别名和历史记录扩展，以及所有 Shell 单词扩展（参见 [Shell Expansions](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)）。

- `history-expand-line (M-^)`

  对当前行执行历史记录扩展。

- `magic-space ()`

  在当前行上执行历史扩展，并插入一个空格（参见[历史扩展](https://www.gnu.org/software/bash/manual/bash.html#History-Interaction)）。

- `alias-expand-line ()`

  在当前行上执行别名扩展（参见[别名](https://www.gnu.org/software/bash/manual/bash.html#Aliases)）。

- `history-and-alias-expand-line ()`

  在当前行上执行历史和别名扩展。

- `insert-last-argument (M-. or M-_)`

  `yank-last-arg` 的同义词。

- `edit-and-execute-command (C-x C-e)`

  在当前命令行上调用编辑器，并将结果作为 Shell 命令执行。Bash 尝试按顺序调用 `$VISUAL`，`$EDITOR` 和 `emacs` 作为编辑器。





### 8.5 Readline vi 模式

​	虽然 Readline 库没有完整的 `vi` 编辑功能集，但它包含足够的功能来允许对行进行简单的编辑。Readline 的 `vi` 模式遵循 POSIX 标准的规定。

​	为了在 `emacs` 和 `vi` 编辑模式之间进行交互切换，请使用 `set -o emacs` 和 `set -o vi` 命令（参见 [The Set Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。Readline 默认是 `emacs` 模式。

​	当您进入 `vi` 模式的行时，已经处于 `插入` 模式，就像您键入了一个 `i`。按下 `ESC` 键会切换到 `命令` 模式，在该模式下，您可以使用标准的 `vi` 移动键来编辑行的文本，使用 `k` 键移到上一个历史行，使用 `j` 键移到后续历史行，等等。





### 8.6 可编程自动完成



​	当尝试对一个命令的参数进行单词完成时，如果使用`complete`内置命令定义了一个完成规范（compspec），那么可编程自动完成功能将被调用。

​	首先，识别命令名称。如果已为该命令定义了compspec，则将使用该compspec来生成该单词的可能完成列表。如果命令单词是空字符串（在空行的开头尝试完成），则将使用任何使用`complete`命令定义的-E选项的compspec。如果命令单词是完整路径名，则首先搜索完整路径名的compspec。如果在完整路径名中没有找到compspec，则尝试为最后一个斜杠后面的部分找到compspec。如果这些搜索未生成compspec，则将使用使用`complete`命令定义的-D选项的任何compspec作为默认值。如果没有默认的compspec，则Bash将在最后的情况下尝试对命令单词进行别名扩展，并尝试从任何成功的扩展中找到compspec。

找到compspec后，将使用它来生成匹配的单词列表。如果未找到compspec，则执行上述默认Bash完成（参见[让Readline为您输入](https://www.gnu.org/software/bash/manual/bash.html#Commands-For-Completion)）。

​	首先使用compspec指定的操作。只返回与正在完成的单词有相同前缀的匹配项。当用于文件名或目录名完成的-f或-d选项时，将使用shell变量`FIGNORE`来过滤匹配项。有关`FIGNORE`的说明，请参见[Bash变量](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)。

​	接下来，根据-G选项指定的文件名扩展模式生成任何完成。模式生成的单词不需要与正在完成的单词匹配。不使用`GLOBIGNORE` shell变量来过滤匹配项，但使用`FIGNORE` shell变量。

​	然后，考虑作为-W选项参数指定的字符串。首先使用`IFS`特殊变量中的字符作为分隔符来拆分该字符串。字符串内部的shell引用被尊重，以提供包含shell元字符或`IFS`值中字符的单词的机制。然后，使用大括号扩展、波浪线扩展、参数和变量扩展、命令替换和算术扩展来扩展每个单词，如上面所述（参见[Shell扩展](https://www.gnu.org/software/bash/manual/bash.html#Shell-Expansions)）。然后使用上面描述的规则对结果进行拆分（参见[单词拆分](https://www.gnu.org/software/bash/manual/bash.html#Word-Splitting)）。然后，将扩展的结果与正在完成的单词进行前缀匹配，匹配的单词成为可能的完成项。

​	在生成这些匹配项后，将调用使用-F和-C选项指定的任何shell函数或命令。当调用命令或函数时，将如上所述为`COMP_LINE`、`COMP_POINT`、`COMP_KEY`和`COMP_TYPE`变量分配值（参见[Bash变量](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)）。如果调用的是shell函数，则还设置`COMP_WORDS`和`COMP_CWORD`变量。当调用函数或命令时，第一个参数（`$1`）是正在完成其参数的命令的名称，第二个参数（`$2`）是正在完成的单词，第三个参数（`$3`）是当前命令行上正在完成的单词之前的单词。不对生成的完成项进行与正在完成的单词匹配的过滤；函数或命令在生成匹配项时具有完全自由。

​	首先调用使用-F指定的函数。函数可以使用任何shell工具，包括下面描述的`compgen`和`compopt`内置命令，来生成匹配项。它必须将可能的完成项放入`COMPREPLY`数组变量中，每个数组元素一个。

​	接下来，将在等效于命令替换的环境中调用使用-C选项指定的任何命令。它应该将完成项的列表打印到标准输出中，每行一个。如果需要，可以使用反斜杠来转义换行符。

​	在生成所有可能的完成项后，将应用使用-X选项指定的任何过滤器到列表中。过滤器是用于路径名扩展的模式；模式中的`&`将替换为正在完成的单词的文本。字面上的`&`可以使用反斜杠转义；反斜杠在尝试匹配之前被移除。与模式匹配的任何完成项都将从列表中删除。在这种情况下，以`!`开头的模式是否定的；在这种情况下，与模式不匹配的任何完成项都将被删除。如果启用了`nocasematch` shell选项（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)中对`shopt`的说明），则执行匹配时不考虑字母字符的大小写。

​	最后，将为完成列表的每个成员添加使用-P和-S选项指定的前缀和后缀，并将结果作为可能完成的列表返回给Readline的完成代码。

​	如果先前应用的操作未生成任何匹配项，并且在定义compspec时提供了-o dirnames选项，则尝试目录名完成。

​	如果在定义compspec时提供了-o plusdirs选项，则会尝试目录名完成，并将任何匹配项添加到其他操作的结果中。

​	默认情况下，如果找到compspec，则将其生成的内容作为完成代码的全部可能完成项返回。不尝试默认的Bash完成，也禁用Readline默认的文件名完成。如果在定义compspec时提供了-o bashdefault选项，则如果compspec未生成匹配项，则尝试默认的Bash完成。如果在定义compspec时提供了-o default选项，则如果compspec（以及如果尝试了默认的Bash完成）未生成匹配项，则执行Readline的默认完成。

​	当compspec指示需要目录名完成时，可编程完成函数会强制Readline在完成的名称后追加斜杠，即使完成的名称是指向目录的符号链接，这取决于mark-directories Readline变量的值，而不受mark-symlinked-directories Readline变量设置的影响。

​	对于动态修改完成项，提供了一些支持。当与使用-D指定的默认完成组合使用时，这非常有用。作为完成处理程序执行的shell函数可以通过返回退出状态为124来指示应重新尝试完成。如果shell函数返回124，并且更改了与正在尝试完成的命令相关联的compspec（在函数执行时作为第一个参数提供），则可编程完成将从头开始重新启动，尝试为该命令找到新的compspec。这允许在尝试完成时动态构建完成集，而不是一次性加载所有完成。

​	例如，假设存在一组compspecs，每个compspec都保存在与命令名称相对应的文件中，以下默认完成函数将动态加载完成：

```
_completion_loader()
{
    . "/etc/bash_completion.d/$1.sh" >/dev/null 2>&1 && return 124
}
complete -D -F _completion_loader -o bashdefault -o default
```





### 8.7 可编程完成内建命令



​	有三个内建命令可用于操作可编程完成功能：一个用于指定如何完成特定命令的参数，另外两个用于在完成过程中修改完成行为。

- `compgen`

```
  compgen [option] [word]
```

  根据选项生成单词的可能完成匹配，并将匹配结果写入标准输出。选项可以是`complete`内建命令接受的任何选项，除了-p和-r。使用-F或-C选项时，虽然可编程完成工具设置的各种shell变量可用，但它们的值可能无用。

  生成的匹配项将与如果可编程完成代码直接从具有相同标志的完成规范生成它们的方式相同。如果指定了单词，则只显示与单词匹配的完成项。除非提供了无效的选项或未生成匹配项，否则返回值为真。

- `complete`

  ```
  complete [-abcdefgjksuv] [-o comp-option] [-DEI] [-A action] [-G globpat]
  [-W wordlist] [-F function] [-C command] [-X filterpat]
  [-P prefix] [-S suffix] name [name …]
  complete -pr [-DEI] [name …]
  ```

  指定如何完成每个名称的参数。如果提供了-p选项，或者未提供任何选项，则以允许它们作为输入被重新使用的方式打印现有的完成规范。-r选项删除每个名称的完成规范，或者如果未提供名称，则删除所有的完成规范。-D选项指示其他提供的选项和操作应用于“默认”命令完成；即尝试对未定义完成的命令进行完成。-E选项指示其他提供的选项和操作应用于“空白”命令完成；即在空白行上尝试完成。-I选项指示其他提供的选项和操作应用于行中的初始非赋值单词，或者在命令分隔符（如;或|）之后，通常是命令名称完成。如果提供了多个选项，则-D选项优先于-E选项，二者优先于-I选项。如果提供了-D、-E或-I中的任何一个，将忽略任何其他名称参数；这些完成仅适用于选项指定的情况。

  在尝试进行单词完成时，应用这些完成规范的过程如上所述（见[可编程完成](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。如果指定了其他选项，则具有以下含义。在调用`complete`内建之前，应用于-G、-W和-X选项（如有必要，还包括-P和-S选项）的参数应进行引用以保护它们免受扩展。

  `-o comp-option`：comp-option控制compspec的行为方式，除了简单地生成完成项之外。comp-option可以是以下之一：

  - `bashdefault`：如果compspec未生成匹配项，则执行其余默认Bash完成。

  - `default`：如果compspec未生成匹配项，则使用Readline的默认文件名完成。
- `dirnames`：如果compspec未生成匹配项，则执行目录名完成。
  - `filenames`：告诉Readline，compspec生成文件名，因此可以执行任何文件名特定处理（例如向目录名添加斜杠，引用特殊字符或抑制尾随空格）。此选项旨在与使用-F指定的shell函数一起使用。
- `noquote`：告诉Readline不要引用已完成的单词，如果它们是文件名（引用文件名是默认的）。
  - `nosort`：告诉Readline不要对可能完成列表按字母顺序排序。
- `nospace`：告诉Readline不要在行尾完成的单词后附加空格（默认情况下）。
  - `plusdirs`：在生成由compspec定义的任何匹配项后，尝试目录名完成，并将任何匹配项添加到其他操作的结果中。

  

  `-A action`：action可以是以下之一，用于生成可能完成项列表：

  - `alias`：别名名称。也可以指定为-a。

  - `arrayvar`：数组变量名称。
- `binding`：Readline键绑定名称（见[可绑定的Readline命令](https://www.gnu.org/software/bash/manual/bash.html#Bindable-Readline-Commands)）。
  - `builtin`：Shell内建命令的名称。也可以指定为-b。
- `command`：命令名称。也可以指定为-c。
  - `directory`：目录名称。也可以指定为-d。
  - `disabled`：已禁用的Shell内建命令的名称。
  - `enabled`：已启用的Shell内建命令的名称。
  - `export`：已导出的Shell变量的名称。也可以指定为-e。
  - `file`：文件名。也可以指定为-f。
  - `function`：Shell函数的名称。
  - `group`：组名称。也可以指定为-g。
  - `helptopic`：`help`内建命令接受的帮助主题（见[Bash内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。
  - `hostname`：主机名，从`HOSTFILE` shell变量指定的文件中获取（见[Bash变量](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)）。
- `job`：作业名称（如果作业控制处于活动状态）。也可以指定为-j。
  - `keyword`：Shell保留字。也可以指定为-k。
- `running`：运行中的作业名称（如果作业控制处于活动状态）。
  - `service`：服务名称。也可以指定为-s。
- `setopt`：`set`内建命令的-o选项的有效参数（见[set内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。
  - `shopt`：`shopt`内建命令接受的Shell选项名称（见[Bash内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。
- `signal`：信号名称。
  - `stopped`：已停止的作业名称（如果作业控制处于活动状态）。
- `user`：用户名称。也可以指定为-u。
  - `variable`：所有Shell变量的名称。也可以指定为-v。

  

  `-C command`：在子shell环境中执行command，并将其输出用作可能的完成项。参数传递方式与-F选项相同。

  `-F function`：在当前shell环境中执行shell函数function。在执行时，`$1`是正在完成其参数的命令的名称，`$2`是正在完成的单词，$3是正在完成的单词之前的单词，如上所述（见[可编程完成](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。执行完成后，可能的完成项从`COMPREPLY`数组变量的值中检索。

  `-G globpat`：文件名扩展模式globpat会扩展为生成可能的完成项。

  `-P prefix`：在应用了所有其他选项后，将prefix添加到每个可能的完成项的开头。

  `-S suffix`：在应用了所有其他选项后，将suffix附加到每个可能的完成项。

  `-W wordlist`：使用`IFS`特殊变量中的字符作为分隔符拆分wordlist，然后展开每个结果单词。可能的完成项是与正在完成的单词匹配的结果列表的成员。

  `-X filterpat`：filterpat是用于文件名扩展的模式。它应用于由前面的选项和参数生成的可能完成列表，每个与filterpat匹配的完成项都将从列表中删除。filterpat中的前导`!`表示否定模式；在这种情况下，任何与filterpat不匹配的完成项都将被删除。

  

  除非提供了无效的选项，否则返回值为真；或者提供了除-p或-r以外的选项，但没有提供名称参数；或者尝试删除不存在规范的名称的完成；或者发生添加完成规范的错误。

- `compopt`

  ```
  compopt [-o option] [-DEI] [+o option] [name]
  ```
  
  根据选项修改每个名称的完成选项，或者如果未提供名称，则修改当前执行的完成选项。如果未给出选项，则显示每个名称或当前完成的完成选项。选项的可能值与上述`complete`内建命令中的有效选项相同。-D选项指示其他提供的选项应用于“默认”命令完成；即尝试对未定义完成的命令进行完成。-E选项指示其他提供的选项应用于“空白”命令完成；即在空白行上尝试完成。-I选项指示其他提供的选项应用于行中的初始非赋值单词，或者在命令分隔符（如;或|）之后，通常是命令名称完成。
  
  如果提供了多个选项，则-D选项优先于-E选项，二者优先于-I选项。
  
  返回值为真，除非提供了无效的选项，尝试修改不存在规范的名称的选项，或者输出错误发生。





### 8.8 可编程完成示例

​	除了`complete`和`compgen`提供的默认操作外，获得附加完成功能最常见的方法是使用一个shell函数，并将其绑定到特定命令上，使用`complete -F`。

​	以下函数为`cd`内建命令提供了完成功能。这是一个相当不错的示例，展示了在完成中使用shell函数必须做的事情。该函数使用传递的单词作为`$2`来确定要完成的目录名称。也可以使用`COMP_WORDS`数组变量；当前的单词由`COMP_CWORD`变量索引。

​	这个函数依赖于`complete`和`compgen`内建命令来完成大部分工作，只添加了Bash `cd`完成的基本目录名称接受以外的功能：波浪号扩展（参见[波浪号扩展](https://www.gnu.org/software/bash/manual/bash.html#Tilde-Expansion)），在$CDPATH中搜索目录（如上所述，参见[Bourne Shell内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)），以及对`cdable_vars` shell选项的基本支持（参见[shopt内建命令](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。`_comp_cd`修改IFS的值，以便其中仅包含换行符，以适应包含空格和制表符的文件名 - `compgen`将其生成的可能完成打印为每行一个。

​	可能的完成项放入COMPREPLY数组变量中，每个数组元素一个完成项。当函数返回时，可编程完成系统从这里检索完成项。

  ```
# 一个用于cd内建命令的完成函数
# 基于bash_completion软件包中的cd完成函数
_comp_cd()
{
    local IFS=$' \t\n'    # normalize IFS
    local cur _skipdot _cdpath
    local i j k

   # 波浪号扩展，还将波浪号扩展为完整路径名
    case "$2" in
    \~*)    eval cur="$2" ;;
    *)      cur=$2 ;;
    esac
    
    # 没有cdpath或绝对路径名 - 直接进行目录完成
    if [[ -z "${CDPATH:-}" ]] || [[ "$cur" == @(./*|../*|/*) ]]; then
        # compgen按行打印路径; 也可以使用while循环
        IFS=$'\n'
        COMPREPLY=( $(compgen -d -- "$cur") )
        IFS=$' \t\n'
    # CDPATH + 在CDPATH中不存在的当前目录中的目录
    else    
        IFS=$'\n'
        _skipdot=false
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
    
    # 适用于适当的shell选项，并且没有完成项的情况下变量名
    if shopt -q cdable_vars && [[ ${#COMPREPLY[@]} -eq 0 ]]; then
        COMPREPLY=( $(compgen -v -- "$cur") )
    fi
    
    return 0
}
  ```

​	我们使用`complete`的-F选项安装完成函数：

```
# 告诉Readline对适当的内容进行引用，并为目录添加斜杠；
# 对其他参数使用bash默认的完成
complete -o filenames -o nospace -o bashdefault -F _comp_cd cd
```

​	由于我们希望Bash和Readline帮助我们处理一些其他细节，我们使用了几个其他选项来告诉Bash和Readline要做什么。-o filenames选项告诉Readline将可能的完成视为文件名，并适当地引用它们。该选项还会导致Readline为它能确定是目录的文件名添加斜杠（这就是为什么我们可能希望扩展`_comp_cd`以在使用CDPATH找到的目录时添加斜杠：Readline不能确定这些完成是目录）。-o nospace选项告诉Readline在目录名后不要附加空格字符，以防我们想要附加内容。-o bashdefault选项引入了“Bash默认”完成的其余部分 - 可能的完成由Bash添加到默认的Readline集中。这些包括命令名称完成，以$或${开头的单词的变量完成，包含路径名扩展模式的完成（参见[文件名扩展](https://www.gnu.org/software/bash/manual/bash.html#Filename-Expansion)）等。

​	一旦使用`complete`安装，每次我们尝试为`cd`命令进行单词完成时，都会调用`_comp_cd`。

​	更多示例 - 大多数常见的GNU、Unix和Linux命令的广泛完成集合 - 可在bash_completion项目的一部分中找到。这在许多GNU/Linux发行版上默认安装。该项目最初由Ian Macdonald编写，现在位于https://github.com/scop/bash-completion/。还有其他系统的端口，如Solaris和Mac OS X。

​	bash_completion软件包的旧版本在bash的examples/complete子目录中分发。







## 9 交互式使用历史记录

​	本章描述如何从用户的角度交互式地使用 GNU 历史记录库。它应被视为用户指南。关于如何在其他程序中使用 GNU 历史记录库，请参阅 GNU Readline Library 手册。



### 9.1 Bash  历史记录功能



​	当启用 `set` 内建命令的 `-o history` 选项（参见 [内建命令 set](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）时，shell 将提供*命令历史记录*，即之前输入的命令列表。`HISTSIZE` shell 变量的值用作历史记录列表中保存的命令数。默认情况下，保存最后 `$HISTSIZE` 条命令（默认值为 500）。Shell 在执行参数和变量扩展之前，但在执行历史扩展之后，将每个命令存储在历史记录列表中，受 `HISTIGNORE` 和 `HISTCONTROL` 这两个 shell 变量的影响。

​	当 shell 启动时，历史记录将从 `HISTFILE` 变量指定的文件中初始化（默认为 ~/.bash_history）。`HISTFILE` 的值指定的文件名可能会被截断，以确保不超过 `HISTFILESIZE` 变量值指定的行数。当启用历史记录的 shell 退出时，最后 `$HISTSIZE` 行将从历史记录列表复制到 `$HISTFILE` 指定的文件中。如果设置了 `histappend` shell 选项（参见 [内建命令 Bash](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)），这些行将追加到历史文件中，否则将覆盖历史文件。如果 `HISTFILE` 未设置，或历史文件不可写入，历史记录将不会被保存。保存历史记录后，历史文件将被截断，以确保不超过 `$HISTFILESIZE` 行。如果 `HISTFILESIZE` 未设置，或设置为空值，或设置为非数字值，或设置为小于零的数字值，历史文件将不会被截断。

​	如果设置了 `HISTTIMEFORMAT`，则与每个历史记录条目相关联的时间戳信息将写入历史文件，并用历史注释字符标记。读取历史文件时，以历史注释字符后紧接着一个数字的行将被解释为后续历史记录条目的时间戳。

​	内建命令 `fc` 可用于列出、编辑和重新执行历史记录列表的一部分。内建命令 `history` 可用于显示或修改历史记录列表并操作历史文件。在使用命令行编辑时，每个编辑模式中都提供了搜索命令，用于访问历史记录列表（参见 [操作历史记录的命令](https://www.gnu.org/software/bash/manual/bash.html#Commands-For-History)）。

​	Shell 允许控制哪些命令保存在历史记录列表中。可以设置 `HISTCONTROL` 和 `HISTIGNORE` 变量，以使 shell 仅保存输入的命令的子集。如果启用了 `cmdhist` shell 选项，则 shell 尝试将多行命令的每行保存在同一个历史记录条目中，并在必要时添加分号以保持语法正确性。`lithist` shell 选项使 shell 保存带有嵌入换行符的命令而不是分号。`shopt` 内建命令用于设置这些选项。参见 [内建命令 shopt](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin) 以了解 `shopt` 的描述。





### 9.2 Bash历史内建命令



​	Bash提供了两个内建命令来操作历史记录列表和历史记录文件。

- `fc`

```
  fc [-e ename] [-lnr] [first] [last]
  fc -s [pat=rep] [command]
```

  第一种形式从历史记录列表中选择从first到last的命令，并显示或编辑并重新执行它们。first和last都可以被指定为一个字符串（用于定位以该字符串开头的最近的命令）或一个数字（历史记录列表中的索引，负数用作当前命令编号的偏移量）。

  在列出命令时，first或last为0等同于-1，而-0等同于当前命令（通常是`fc`命令）；否则0等同于-1，-0无效。

  如果未指定last，则它将被设置为first。如果未指定first，则对于编辑，它将被设置为上一条命令，并对于列表，它将被设置为-16。如果给出了-l标志，则命令将列在标准输出中。-n标志在列出时不显示命令编号。-r标志反转列出顺序。否则，将使用ename指定的编辑器打开包含这些命令的文件。如果未给出ename，则使用以下变量展开的值：`${FCEDIT:-${EDITOR:-vi}}`。这意味着如果已设置`FCEDIT`变量，则使用该值；否则，如果设置了`EDITOR`变量，则使用该值；如果两者都未设置，则使用`vi`。编辑完成后，编辑后的命令将被回显并执行。

  在第二种形式中，每次在选定的命令中找到pat的实例时，command都会被重新执行，并替换为rep。command的解释与上面的first相同。一个与`fc`命令一起使用的有用别名是`r='fc -s'`，这样键入`r cc`将运行以`cc`开头的最后一条命令，键入`r`将重新执行上一条命令（参见[别名](https://www.gnu.org/software/bash/manual/bash.html#Aliases)）。

- `history`

  ```
  history [n]
  history -c
  history -d offset
  history -d start-end
  history [-anrw] [filename]
  history -ps arg
  ```
  
  如果没有选项，将显示带有行号的历史记录列表。以`*`为前缀的行已经被修改。参数n只列出最后n行。如果shell变量`HISTTIMEFORMAT`被设置且不为空，则它将用作一个strftime格式字符串，用于显示与每个显示的历史记录条目相关联的时间戳。格式化时间戳和历史记录行之间不会打印空格。如果提供了选项，则它们有以下含义：
  
  - `-c`：清除历史记录列表。这可以与其他选项组合，以完全替换历史记录列表。
  - `-d offset`：删除位于偏移量位置的历史记录条目。如果offset是正数，则应指定在显示历史记录时显示的值。如果offset是负数，则解释为相对于最后一个历史位置的一个大于一的偏移量，因此负索引从历史记录的末尾开始计数，索引为`-1`指的是当前`history -d`命令。
  - `-d start-end`：删除位置在start和end之间（包括start和end）的历史记录条目。对于start和end的正值和负值解释与上述相同。
  - `-a`：将新的历史记录行追加到历史记录文件。这些是自当前Bash会话开始以来输入的历史记录行，但尚未追加到历史记录文件中。
  - `-n`：将尚未从历史记录文件读取的历史记录行追加到当前历史记录列表。这些是自当前Bash会话开始以来附加到历史记录文件的行。
  - `-r`：读取历史记录文件并将其内容追加到历史记录列表中。
  - `-w`：将当前历史记录列表写入历史记录文件。
  - `-p`：在args上执行历史替换，并在标准输出中显示结果，而不将结果存储在历史记录列表中。
  - `-s`：将args添加到历史记录列表的末尾，作为单个条目。
  
  
  
  ​	如果在使用-w、-r、-a或-n选项时提供了文件名参数，则Bash将filename用作历史记录文件。如果没有提供，则使用`HISTFILE`变量的值。返回值为0，除非遇到无效选项，读取或写入历史记录文件时出现错误，提供了无效的-d参数偏移量或范围，或者作为-p参数提供的历史扩展失败。





### 9.3 历史记录扩展



​	历史记录库提供了一个历史记录扩展功能，类似于`csh`提供的历史记录扩展。本节描述了用于操作历史信息的语法。

​	历史记录扩展将历史记录列表中的命令引入到输入流中，使得重复执行命令、将先前命令的参数插入到当前输入行或快速修复先前命令中的错误变得容易。

​	历史扩展是在完整行被读取后立即执行的，之后shell将其分解成单词，并在每行单独执行。Bash试图通知历史扩展函数前面行中仍然有效的引用。

​	历史扩展分为两个部分。第一个是确定在替换期间应该使用历史记录列表中的哪一行。第二个是选择该行的部分并包含到当前行中。从历史记录中选择的行称为*事件*，对该行进行操作的部分称为*单词*。各种*修饰符*可用于操作所选单词。行的分解方式与Bash相同，因此由引号括起来的多个单词被视为一个单词。历史扩展通过历史扩展字符（默认为`!`）的出现引入。

​	历史扩展实现了类似于shell的引用约定：反斜杠可用于删除下一个字符的特殊处理；单引号用于包围字符的原样序列，并可用于禁止历史扩展；而在双引号内部的字符可能会受到历史扩展的影响，因为反斜杠可以转义历史扩展字符，但单引号不可以，因为在双引号内部不会对其进行特殊处理。

​	在使用shell时，仅`\`和`'`可用于转义历史扩展字符，但如果历史扩展字符紧跟在双引号中的闭合引号之前，则历史扩展字符也会被视为被引用。

​	可以使用`shopt`内建命令（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）设置的几个shell选项来定制历史扩展的行为。如果启用了`histverify` shell选项，并且使用了Readline，历史替换不会立即传递给shell解析器。相反，扩展后的行会重新加载到Readline编辑缓冲区中进行进一步修改。如果正在使用Readline，并且启用了`histreedit` shell选项，那么失败的历史扩展将被重新加载到Readline编辑缓冲区中进行修正。可以使用`history`内建命令的-p选项来查看历史扩展在使用之前会做什么。可以使用`history`内建命令的-s选项将命令添加到历史列表的末尾，而不实际执行它们，以便它们可供随后调用。这在与Readline一起使用时最有用。

​	Shell允许使用`histchars`变量控制历史扩展机制使用的各种字符，如上所述（参见[Bash Variables](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)）。当写入历史文件时，Shell使用历史注释字符来标记历史时间戳。



#### 9.3.1 事件设计符 Event Designators

​	事件设计符是对历史记录列表中的命令行条目的引用。除非引用是绝对的，否则事件是相对于历史记录列表中的当前位置的。

- `!`

  事件设计符是对历史记录列表中的命令行条目的引用。除非引用是绝对的，否则事件是相对于历史记录列表中的当前位置的。

- `!n`

  引用第n条命令行。

- `!-n`

  引用n行之前的命令。

- `!!`

  引用前一条命令。这是`!-1`的同义词。

- `!string`

  引用历史记录列表中当前位置之前最近以string开头的命令。

- `!?string[?]`

  引用历史记录列表中当前位置之前最近包含string的命令。如果string后面紧跟一个换行符，则可以省略尾随的`?`。如果缺少string，则使用最近的搜索字符串；如果没有先前的搜索字符串，则出现错误。

- `^string1^string2^`

  快速替换。重复上一条命令，并将string1替换为string2。相当于`!!:s^string1^string2^`。

- `!#`

  到目前为止输入的整个命令行。





#### 9.3.2 单词设计符 Word Designators

​	单词设计符用于从事件中选择所需的单词。`:`用于将事件说明与单词设计符分隔开。如果单词设计符以`^`，`$`，`*`，`-`或`%`开头，则可以省略`:`。单词从行的开头编号，第一个单词用0（零）表示。插入到当前行的单词之间用单个空格分隔。

例如，

- `!!`

  表示前一个命令。当您键入此命令时，前一个命令将完全重复。

- `!!:$`

  表示前一个命令的最后一个参数。可以缩写为`!$`。

- `!fi:2`

  表示以字母`fi`开头的最近一条命令的第二个参数。

以下是单词设计符：

- `0 (zero)`

  第0个单词。对于许多应用程序，这是命令单词。

- `n`

  第n个单词。

- `^`

  第一个参数；即第1个单词。

- `$`

  最后一个参数。

- `%`

  由最近的`?string?`搜索匹配的第一个单词，如果搜索字符串以单词的一部分开头。

- `x-y`

  由最近的`?string?`搜索匹配的第一个单词，如果搜索字符串以单词的一部分开头。

- `*`

  所有单词，不包括第0个。这相当于`1-$`。如果事件中只有一个单词，则使用`*`不会报错；在这种情况下，返回空字符串。

- `x*`

  缩写为`x-$`。

- `x-`

  缩写为`x-$`，类似于`x*`，但省略最后一个单词。如果缺少`x`，默认为0。

​	如果提供了单词设计符而没有事件说明，则使用上一条命令作为事件。





#### 9.3.3 修饰符

​	在可选的单词设计符之后，可以添加一个或多个以下修饰符序列，每个修饰符之前有一个`:`。这些修饰符修改或编辑从历史事件中选择的单词或单词组。

- `h`

  移除尾部的路径名组件，仅保留头部。

- `t`

  移除所有前导路径名组件，仅保留尾部。

- `r`

  移除尾部的后缀形式`.suffix`，仅保留基本名称。

- `e`

  仅保留尾部的后缀。

- `p`

  打印新命令，但不执行它。

- `q`

  引用替换的单词，对后续替换进行转义。

- `x`

  与`q`相同，引用替换的单词，但在空格、制表符和换行符处断开成单词。`q`和`x`修饰符是互斥的；使用最后提供的那个。

- `s/old/new/`

  用new替换事件行中第一次出现的old。可以使用任何字符代替`/`作为分隔符。分隔符可以在old和new中用单个反斜杠进行转义。如果new中出现`&`，它将被old替换。一个单个反斜杠将引用`&`。如果old为空，则将其设置为最后一次替换的old，或者如果没有进行先前的历史替换，则设置为!?string`[?]`搜索中的最后一个字符串。如果new为空，则删除每个匹配的old。如果分隔符是输入行上的最后一个字符，则最后一个分隔符是可选的。

- `&`

  重复上一次的替换。

- `g`

- `a`

  将更改应用于整个事件行。与`s`一起使用，例如`gs/old/new/`，或与`&`一起使用。

- `G`

  对事件中的每个单词应用以下`s`或`&`修饰符一次。





## 10 安装 Bash

​	本章提供在不同支持的平台上安装 Bash 的基本说明。该发行版支持 GNU 操作系统，几乎支持每个版本的 Unix，以及一些非 Unix 系统，如 BeOS 和 Interix。还存在其他独立的端口用于 MS-DOS、OS/2 和 Windows 平台。






### 10.1 基本安装



​	以下是 Bash 的安装说明。

​	编译 Bash 最简单的方法是：

1. 切换到包含源代码的目录，然后键入 `./configure` 来配置适合您系统的 Bash。如果您正在旧版本的 System V 上使用 `csh`，您可能需要键入 `sh ./configure` 以防止 `csh` 尝试执行 `configure`。

   运行 `configure` 需要一些时间。运行时，它会打印消息，告知它正在检查哪些功能。

3. 键入 `make` 来编译 Bash 并构建 `bashbug` 错误报告脚本。

5. 可选地，键入 `make tests` 来运行 Bash 测试套件。

7. 键入 `make install` 来安装 `bash` 和 `bashbug`。这还将安装手册页面和 Info 文件、消息翻译文件、一些辅助文档、一组示例可加载内置命令，以及用于开发可加载内置命令的一组头文件。您可能需要额外的权限来将 `bash` 安装到所需的目标位置，因此可能需要使用 `sudo make install`。有关控制 `bash` 和其他文件安装位置的更多信息请参见下面的内容（见 [Installation Names](https://www.gnu.org/software/bash/manual/bash.html#Installation-Names)）。


`configure` shell 脚本会尝试猜测各种依赖于系统的编译变量的正确值。它使用这些值在软件包的每个目录（顶级目录、内置命令、文档、po 和 support 目录、lib 下的每个目录以及其他几个目录）中创建 Makefile。它还会创建一个包含系统相关定义的 config.h 文件。最后，它会创建一个名为 `config.status` 的 shell 脚本，您可以在将来运行它以重新创建当前配置，一个保存其测试结果的文件 config.cache，以加快重新配置的速度，以及一个包含编译器输出的文件 config.log（主要用于调试 `configure`）。如果 config.cache 包含您不希望保留的结果，可以删除或编辑它。

要了解 `configure` 脚本了解的选项和参数的更多信息，请在 Bash 源目录中的 Bash 提示符处键入

  ```
bash-4.2$ ./configure --help
  ```

at the Bash prompt in your Bash source directory.

如果要在与源目录分开的目录中构建 Bash（例如，为多个架构构建），只需使用 configure 脚本的完整路径。以下命令将在 /usr/local/build 目录下从 /usr/local/src/bash-4.4 源代码构建 bash：

```
mkdir /usr/local/build/bash-4.4
cd /usr/local/build/bash-4.4
bash /usr/local/src/bash-4.4/configure
make
```

​	有关在与源码分开的目录中构建的更多信息，请参阅[为多个架构编译](https://www.gnu.org/software/bash/manual/bash.html#Compiling-For-Multiple-Architectures)。

​	如果需要进行不寻常的编译工作，请尝试弄清楚 `configure` 如何检查是否要执行它们，并将差异或说明发送到 [bash-maintainers@gnu.org](mailto:bash-maintainers@gnu.org) ，以便它们可以考虑在下一个版本中使用。

​	configure.ac 文件用于使用名为 Autoconf 的程序创建 `configure`。只有在想要更改它或使用更新版本的 Autoconf 重新生成 `configure` 时才需要 configure.ac。如果这样做，请确保您使用的是 Autoconf 版本 2.69 或更高版本。

​	您可以通过键入 `make clean` 从源码目录中删除程序二进制文件和对象文件。要删除 `configure` 创建的文件（以便您可以为不同类型的计算机编译 Bash），请键入 `make distclean`。





### 10.2 编译器和选项

​	某些系统需要编译或链接的非常规选项，这些选项 `configure` 脚本不知道。您可以通过在环境中设置这些变量来为 `configure` 提供变量的初始值。使用 Bourne 兼容的 shell，您可以在命令行上这样做：

```
CC=c89 CFLAGS=-O2 LIBS=-lposix ./configure
```

​	在具有 `env` 程序的系统上，可以这样做：

```
env CPPFLAGS=-I/usr/local/include LDFLAGS=-s ./configure
```

​	配置过程使用 GCC 来构建 Bash（如果可用）。





### 10.3 为多种架构进行编译

​	您可以同时为多种类型的计算机编译 Bash，方法是将每种架构的对象文件放在自己的目录中。要做到这一点，您必须使用支持 `VPATH` 变量的 `make` 版本，比如 GNU `make`。切换到希望对象文件和可执行文件进入的目录，并从源目录运行 `configure` 脚本（参见[基本安装](https://www.gnu.org/software/bash/manual/bash.html#Basic-Installation)）。您可能需要提供 --srcdir=PATH 参数告诉 `configure` 源文件的位置。`configure` 会自动在它所在的目录和 `..` 中检查源代码。

​	如果您必须使用不支持 `VPATH` 变量的 `make`，则可以在源代码目录中一次为一个架构编译 Bash。在为一种架构安装了 Bash 之后，在为另一种架构重新配置之前，请使用 `make distclean`。

​	或者，如果您的系统支持符号链接，您可以使用 support/mkclone 脚本创建一个构建目录，其中有一个符号链接返回到源目录中的每个文件。以下是一个示例，在当前目录中创建一个构建目录，该构建目录源自 /usr/gnu/src/bash-2.0：

```
bash /usr/gnu/src/bash-2.0/support/mkclone -s /usr/gnu/src/bash-2.0 .
```

​	或者，如果您的系统支持符号链接，您可以使用 support/mkclone 脚本创建一个构建目录，其中有一个符号链接返回到源目录中的每个文件。以下是一个示例，在当前目录中创建一个构建目录，该构建目录源自 /usr/gnu/src/bash-2.0：





### 10.4 安装名称

​	默认情况下，`make install` 将安装到 /usr/local/bin、/usr/local/man 等目录；即 *安装前缀*  默认为 /usr/local。您可以通过给 `configure` 选项 --prefix=PATH 或在运行 `make install` 时指定 `prefix` `make` 变量的值来指定安装前缀（例如 `make install prefix=PATH`）。`prefix` 变量为安装 bash 时使用的 `exec_prefix` 和其他变量提供了默认值。

​	您可以为架构特定的文件和与架构无关的文件指定单独的安装前缀。如果为 `configure` 提供 --exec-prefix=PATH 选项，`make install` 将使用 PATH 作为安装程序和库的前缀。文档和其他数据文件仍将使用常规前缀。

​	如果要在单个运行中更改安装位置，可以将这些变量作为 `make` 的参数来指定：`make install exec_prefix=/` 将 `bash` 和 `bashbug` 安装到 /bin，而不是默认的 /usr/local/bin。

​	如果要查看 bash 将安装的文件以及它们的安装位置，而不在系统上更改任何内容，请将变量 `DESTDIR` 指定为 `make` 的参数。它的值应该是样本安装树的根的绝对目录路径。例如，

```
mkdir /fs1/bash-install
make install DESTDIR=/fs1/bash-install
```

​	将 `bash` 安装到 /fs1/bash-install/usr/local/bin/bash，将文档安装到 /fs1/bash-install/usr/local/share 中的目录，将示例可加载内置命令安装到 /fs1/bash-install/usr/local/lib/bash 等等。您可以使用常规的 `exec_prefix` 和 `prefix` 变量来更改 `DESTDIR` 的值之下的目录路径。

​	GNU Makefile 标准提供了这些变量及其影响的更完整的描述。



### 10.5 指定系统类型

​	有些功能 `configure` 无法自动确定，但需要根据 Bash 将运行的主机类型来确定。通常，`configure` 可以找出它，但如果它打印出一条消息说无法猜测主机类型，则给它传递 `--host=TYPE` 选项。`TYPE` 可以是系统类型的简短名称，例如 `sun4`，或具有三个字段的规范名称：`CPU-COMPANY-SYSTEM`（例如 `i386-unknown-freebsd4.2`）。

​	请参阅文件 support/config.sub，了解每个字段可能的值。





### 10.6 共享默认设置

​	如果要设置默认值，以供 `configure` 脚本共享，可以创建一个名为 `config.site` 的站点 shell 脚本，为变量如 `CC`、`cache_file` 和 `prefix` 提供默认值。`configure` 首先查找 PREFIX/share/config.site，如果存在，则查找 PREFIX/etc/config.site。或者，您可以将 `CONFIG_SITE` 环境变量设置为站点脚本的位置。警告：Bash 的 `configure` 会寻找站点脚本，但并不是所有的 `configure` 脚本都会这样做。



### 10.7 操作控制

​	`configure` 识别以下选项来控制其操作方式。

- `--cache-file=file`

  将测试的结果使用 file 保存在 ./config.cache 中，而不是使用 ./config.cache。将 file 设置为 /dev/null 可以禁用缓存，用于调试 `configure`。

- `--help`

  打印关于 `configure` 选项的摘要，并退出。

- `--quiet`

- `--silent`

- `-q`

  不要打印提示正在进行哪些检查的消息。

- `--srcdir=dir`

  在目录 dir 中查找 Bash 源代码。通常，`configure` 可以自动确定该目录。

- `--version`

  打印生成 `configure` 脚本的 Autoconf 版本，并退出。

​	`configure` 还接受一些其他不常用的样板选项。`configure --help` 打印完整列表。





### 10.8 可选功能

​	Bash 的 `configure` 有许多 --enable-feature 选项，其中 feature 表示 Bash 的可选部分。还有几个 --with-package 选项，其中 package 是诸如 `bash-malloc` 或 `purify` 的东西。要关闭默认使用的包，使用 --without-package。要在默认启用的情况下配置 Bash，使用 --disable-feature。

​	下面是 Bash 的 `configure` 可识别的 --enable- 和 --with- 选项的完整列表。

- `--with-afs`

  如果使用来自 Transarc 的 Andrew 文件系统，请定义。

- `--with-bash-malloc`

  在目录 lib/malloc 中使用 Bash 版本的 `malloc`。这不是出现在 GNU libc 中的 `malloc`，而是最初来源于 4.2 BSD 的 `malloc` 的较旧版本。这个 `malloc` 非常快，但在每次分配时浪费一些空间。此选项默认启用。NOTES 文件中列出了应该关闭此选项的系统的列表，`configure` 会自动在许多系统上禁用此选项。

- `--with-curses`

  使用 curses 库而不是 termcap 库。如果您的系统的 termcap 数据库不足或不完整，则应提供此选项。

- `--with-gnu-malloc`

  A synonym for `--with-bash-malloc`.

- `--with-installed-readline[=PREFIX]`

  定义此选项以使 Bash 链接到本地安装的 Readline 版本，而不是位于 lib/readline 中的版本。这仅适用于 Readline 5.0 及更高版本。如果 PREFIX 是 `yes` 或未提供，则 `configure` 使用 make 变量 `includedir` 和 `libdir` 的值，这些值默认是 `prefix` 的子目录，以查找不在标准系统包含和库目录中的已安装版本的 Readline。如果 PREFIX 是 `no`，Bash 将链接到 lib/readline 中的版本。如果 PREFIX 设置为任何其他值，`configure` 将将其视为目录路径名，并在该目录的子目录中查找已安装的 Readline 版本（include 文件位于 PREFIX/include，库位于 PREFIX/lib）。

- `--with-libintl-prefix[=PREFIX]`

  定义此选项以使 Bash 链接到本地安装的 libintl 库版本，而不是 lib/intl 中的版本。

- `--with-libiconv-prefix[=PREFIX]`

  定义此选项以在 PREFIX 中查找 libiconv，而不是在标准系统位置中查找。Bash 中没有包含版本。

- `--enable-minimal-config`

  这将生成一个具有最小功能的 shell，接近历史上的 Bourne shell。

​	以下是改变Bash编译、链接和安装方式的一些 --enable- 选项，而不是改变运行时功能。

- `--enable-largefile`

  如果操作系统需要特殊的编译器选项来构建能够访问大文件的程序，请启用对[大文件的支持](http://www.unix.org/version2/whatsnew/lfs20mar.html)。如果操作系统提供了大文件支持，则默认启用此选项。

- `--enable-profiling`

  这将构建一个 Bash 二进制文件，每次执行时都会产生 `gprof` 处理的性能分析信息。

- `--enable-separate-helpfiles`

  使用外部文件来存储由 `help` 内建命令显示的文档，而不是在内部存储文本。

- `--enable-static-link`

  如果正在使用 `gcc`，则会导致 Bash 静态链接。这可用于构建用作 root 的 shell 版本。

​	`minimal-config` 选项可用于禁用以下所有选项，但它首先处理，因此可以使用 `enable-feature` 启用单个选项。

​	除了 `alt-array-implementation`、`disabled-builtins`、`direxpand-default`、`strict-posix-default` 和 `xpg-echo-default` 之外，以下所有选项默认启用，除非操作系统不提供必要的支持。

- `--enable-alias`

  Allow alias expansion and include the `alias` and `unalias` builtins (see [Aliases](https://www.gnu.org/software/bash/manual/bash.html#Aliases)).

  允许别名展开，并包含 `alias` 和 `unalias` 内建命令（参见[别名](https://www.gnu.org/software/bash/manual/bash.html#Aliases)）。

- `--enable-alt-array-implementation`

  使用数组的备用实现构建 bash（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)），它提供更快的访问速度，但会使用更多的内存（取决于数组的稀疏程度，有时可能多得多）。

- `--enable-arith-for-command`

  包含对 `for` 命令的替代形式的支持，该替代形式的行为类似于 C 语言的 `for` 语句（参见[循环结构](https://www.gnu.org/software/bash/manual/bash.html#Looping-Constructs)）。

- `--enable-array-variables`

  包含对一维数组 shell 变量的支持（参见[数组](https://www.gnu.org/software/bash/manual/bash.html#Arrays)）。

- `--enable-bang-history`

  包含对类似于 `csh` 的历史替换的支持（参见[历史交互](https://www.gnu.org/software/bash/manual/bash.html#History-Interaction)）。

- `--enable-brace-expansion`

  包含对类似于 `csh` 的花括号扩展的支持（ `b{a,b}c` → `bac bbc` ）。参见[花括号扩展](https://www.gnu.org/software/bash/manual/bash.html#Brace-Expansion)获取完整的描述。

- `--enable-casemod-attributes`

  在 `declare` 内建命令和赋值语句中包含支持大小写修改属性。例如，带有 `uppercase` 属性的变量在赋值时将其值转换为大写。

- `--enable-casemod-expansion`

  包含支持大小写修改的单词扩展。

- `--enable-command-timing`

  包含识别 `time` 作为保留字并显示紧随 `time` 的管道的时间统计信息的支持（参见[管道](https://www.gnu.org/software/bash/manual/bash.html#Pipelines)）。这允许对管道以及 shell 内建命令和函数进行计时。

- `--enable-cond-command`

  包含 `[[` 条件命令的支持（参见[条件结构](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）。

- `--enable-cond-regexp`

  包含在 `[[` 条件命令中使用 `=~` 二元运算符匹配 POSIX 正则表达式的支持（参见[条件结构](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）。

- `--enable-coprocesses`

  包含对协程和 `coproc` 保留字的支持（参见[管道](https://www.gnu.org/software/bash/manual/bash.html#Pipelines)）。

- `--enable-debugger`

  包含对 Bash 调试器的支持（单独分发）。

- `--enable-dev-fd-stat-broken`

  如果在 /dev/fd/N 上调用 `stat` 返回的结果与在文件描述符 N 上调用 `fstat` 返回的结果不同，请使用此选项启用解决方法。这会影响测试文件属性的条件命令。

- `--enable-direxpand-default`

  导致 `direxpand` shell 选项（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）在 shell 启动时默认启用。通常情况下，默认情况下它是禁用的。

- `--enable-directory-stack`

  包含对类似于 `csh` 的目录堆栈和 `pushd`、`popd` 和 `dirs` 内建命令的支持（参见[目录堆栈](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)）。

- `--enable-disabled-builtins`

  允许通过 `builtin xxx` 调用内建命令，即使使用 `enable -n xxx` 禁用了 `xxx`。有关 `builtin` 和 `enable` 内建命令的详细信息，请参阅[Bash 内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)。

- `--enable-dparen-arithmetic`

  Include support for the `((…))` command (see [Conditional Constructs](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)).

  包含对 `((…))` 命令的支持（参见[条件结构](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）。

- `--enable-extended-glob`

  包含对上面 [Pattern Matching](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching) 下描述的扩展模式匹配功能的支持。

- `--enable-extended-glob-default`

  将 `extglob` shell 选项的默认值设置为启用（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。

- `--enable-function-import`

  包含支持从环境中导入另一个实例的 shell 导出的函数定义的支持。此选项默认启用。

- `--enable-glob-asciirange-default`

  将 `globasciiranges` shell 选项的默认值设置为启用（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)）。这控制在模式匹配方括号表达式中使用字符范围的行为。

- `--enable-help-builtin`

  包含 `help` 内建命令，用于显示关于 shell 内建命令和变量的帮助信息（参见[Bash 内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。

- `--enable-history`

  包含命令历史和 `fc`、`history` 内建命令（参见[Bash 历史设施](https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Facilities)）。

- `--enable-job-control`

  如果操作系统支持作业控制，则启用作业控制功能（参见[Job Control](https://www.gnu.org/software/bash/manual/bash.html#Job-Control)）。

- `--enable-multibyte`

  如果操作系统提供必要的支持，则启用对多字节字符的支持。

- `--enable-net-redirections`

  如果操作系统支持，则启用在重定向中使用 `/dev/tcp/host/port` 和 `/dev/udp/host/port` 形式的文件名的特殊处理（参见[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）。

- `--enable-process-substitution`

  如果操作系统支持，则启用在重定向中使用 `/dev/tcp/host/port` 和 `/dev/udp/host/port` 形式的文件名的特殊处理（参见[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）。

- `--enable-progcomp`

  Enable the programmable completion facilities (see [Programmable Completion](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)). If Readline is not enabled, this option has no effect.

  启用可编程的完成功能（参见[Programmable Completion](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)）。如果未启用 Readline，此选项不起作用。

- `--enable-prompt-string-decoding`

  打开对 `$PS0`、`$PS1`、`$PS2` 和 `$PS4` 提示字符串中许多反斜杠转义字符的解释。请参阅[控制提示符](https://www.gnu.org/software/bash/manual/bash.html#Controlling-the-Prompt)，以获取提示字符串转义序列的完整列表。

- `--enable-readline`

  包含对 BASH 版本 Readline 库的命令行编辑和历史记录的支持（参见[Command Line Editing](https://www.gnu.org/software/bash/manual/bash.html#Command-Line-Editing)）。

- `--enable-restricted`

  包含对 *受限制的 shell* 的支持。如果启用，当调用为 `rbash` 时，Bash 将进入受限模式。参见[受限制的 Shell](https://www.gnu.org/software/bash/manual/bash.html#The-Restricted-Shell)以了解受限模式的描述。

- `--enable-select`

  包含 `select` 复合命令，允许生成简单菜单（参见[条件结构](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）。

- `--enable-single-help-strings`

  将 `help` 内建命令显示的文本存储为每个帮助主题的单个字符串。这有助于将文本翻译成不同的语言。如果编译器无法处理非常长的字符串文字，则可能需要禁用此选项。

- `--enable-strict-posix-default`

  使 Bash 默认符合 POSIX（参见[Bash POSIX 模式](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)）。

- `--enable-translatable-strings`

  启用支持 `$"string"` 可翻译字符串（参见[特定于区域设置的翻译](https://www.gnu.org/software/bash/manual/bash.html#Locale-Translation)）。

- `--enable-usg-echo-default`

  `--enable-xpg-echo-default` 的同义词。

- `--enable-xpg-echo-default`

  默认情况下，使 `echo` 内建命令在不需要 -e 选项的情况下展开反斜杠转义字符。这将将 `xpg_echo` shell 选项的默认值设置为 `on`，使 Bash `echo` 表现更像 Single Unix Specification 版本 3 中指定的版本。请参阅[Bash 内建命令](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)，了解 `echo` 可识别的转义序列的描述。

​	文件 config-top.h 包含不可从 `configure` 设置的 C 预处理器 `#define` 语句。其中一些不应该更改；如果您这样做，要注意可能产生的后果。请阅读与每个定义相关的注释，以获取有关其影响的更多信息。





## 附录 A: 报告 Bug

​	请报告您在 Bash 中发现的所有 Bug。但是，请首先确保确实存在 Bug，并且它出现在最新版本的 Bash 中。最新版本的 Bash 可以通过 FTP 从 [ftp://ftp.gnu.org/pub/gnu/bash/](javascript:void(0)) 和 http://git.savannah.gnu.org/cgit/bash.git/snapshot/bash-master.tar.gz 下载。

​	一旦您确定 Bug 确实存在，可以使用 `bashbug` 命令提交 Bug 报告。如果您有修复建议，欢迎一起发送！您也可以将建议和哲学性的 Bug 报告发送至 [bug-bash@gnu.org](mailto:bug-bash@gnu.org)，或者发布到 Usenet 新闻组 `gnu.bash.bug`。

​	所有 Bug 报告应包括：

- Bash 的版本号。
- 硬件和操作系统信息。
- 用于编译 Bash 的编译器。
- Bug 行为的描述。
- 可用于重现 Bug 的简短脚本或 `recipe`。

​	`bashbug` 会自动将前三个项目插入提供给您用于提交 Bug 报告的模板中。

​	请将所有与本手册有关的报告发送至 [bug-bash@gnu.org](mailto:bug-bash@gnu.org)。





## 附录 B: 与 Bourne Shell 的主要区别

​	Bash 实现了与 Bourne Shell 基本相同的语法、参数和变量展开、重定向和引用。Bash 使用 POSIX 标准作为实现这些特性的规范。Bourne Shell 和 Bash 之间存在一些差异；本节快速介绍了主要的区别。其中一些差异在之前的章节中有更详细的解释。本节以 SVR4.2（历史上 Bourne Shell 的最后版本）中包含的 `sh` 版本作为基准参考。

- Bash是符合POSIX标准的，即使在POSIX规范与传统`sh`行为不同的情况下也是如此（参见[Bash POSIX Mode](https://www.gnu.org/software/bash/manual/bash.html#Bash-POSIX-Mode)）。

- Bash具有多字符调用选项（参见[Invoking Bash](https://www.gnu.org/software/bash/manual/bash.html#Invoking-Bash)）。

- Bash具有命令行编辑功能（参见[Command Line Editing](https://www.gnu.org/software/bash/manual/bash.html#Command-Line-Editing)）和`bind`内置命令。

- Bash提供了可编程的单词补全机制（参见[Programmable Completion](https://www.gnu.org/software/bash/manual/bash.html#Programmable-Completion)），以及内置命令`complete`，`compgen`和`compopt`来操作它。

- Bash具有命令历史记录功能（参见[Bash History Facilities](https://www.gnu.org/software/bash/manual/bash.html#Bash-History-Facilities)），以及用于操作它的`history`和`fc`内置命令。 Bash历史记录列表会保留时间戳信息，并使用`HISTTIMEFORMAT`变量的值来显示它。

- Bash实现了类似`csh`的历史扩展（参见[History Expansion](https://www.gnu.org/software/bash/manual/bash.html#History-Interaction)）。

- Bash具有一维数组变量（参见[Arrays](https://www.gnu.org/software/bash/manual/bash.html#Arrays)），以及适用于使用它们的相应变量扩展和赋值语法。 Bash内置命令中的几个可以使用选项来操作数组。 Bash提供了许多内置数组变量。

- 支持`$'…'`引用语法，可以在单引号之间的文本中扩展ANSI-C反斜杠转义字符（参见[ANSI-C Quoting](https://www.gnu.org/software/bash/manual/bash.html#ANSI_002dC-Quoting)）。

- Bash支持`$"…"`引用语法，用于对双引号之间的字符进行本地化翻译。使用`-D`、`--dump-strings`和`--dump-po-strings`调用选项，可以列出脚本中的可翻译字符串（参见[Locale-Specific Translation](https://www.gnu.org/software/bash/manual/bash.html#Locale-Translation)）。

- Bash实现了`!`关键字来否定管道的返回值（参见[Pipelines](https://www.gnu.org/software/bash/manual/bash.html#Pipelines)）。当`if`语句只在测试失败时才需要执行时，这非常有用。Bash的`-o pipefail`选项可导致管道返回失败状态，如果任何命令失败，则会返回失败状态。

- Bash具有`time`保留字和命令计时功能（参见[Pipelines](https://www.gnu.org/software/bash/manual/bash.html#Pipelines)）。使用`TIMEFORMAT`变量可以控制计时统计信息的显示。

- Bash实现了类似C语言的`for (( expr1 ; expr2 ; expr3 ))`循环命令（参见[Looping Constructs](https://www.gnu.org/software/bash/manual/bash.html#Looping-Constructs)）。

- Bash包含`select`复合命令，允许生成简单的菜单（参见[Conditional Constructs](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）。

- Bash包含`[[`复合命令，使条件测试成为shell语法的一部分（参见[Conditional Constructs](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)），包括可选的正则表达式匹配。

- Bash为`case`和`[[`结构提供可选的不区分大小写匹配。

- Bash包含花括号展开（参见[Brace Expansion](https://www.gnu.org/software/bash/manual/bash.html#Brace-Expansion)）和波浪号展开（参见[Tilde Expansion](https://www.gnu.org/software/bash/manual/bash.html#Tilde-Expansion)）。

- Bash实现了命令别名和`alias`、`unalias`内置命令（参见[Aliases](https://www.gnu.org/software/bash/manual/bash.html#Aliases)）。

- Bash提供了shell算术，`((`复合命令（参见[Conditional Constructs](https://www.gnu.org/software/bash/manual/bash.html#Conditional-Constructs)）和算术扩展（参见[Shell Arithmetic](https://www.gnu.org/software/bash/manual/bash.html#Shell-Arithmetic)）。

- 在shell的初始环境中存在的变量会自动导出到子进程。Bourne shell通常不会这样做，除非使用`export`命令明确标记变量。

- Bash支持`+=`赋值运算符，用于将值附加到左边的变量。

- Bash包括POSIX模式移除操作符`%`、`#`、`%%`和`##`，用于从变量值中移除前导或后缀子字符串（参见[Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。

- 扩展`${#xx}`，用于返回`${xx}`的长度，被支持（参见[Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。

- 扩展`${var:offset[:length]}`，用于返回`var`值的长度为length的子字符串，从offset开始（参见[Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。

- 扩展`${var/[pattern[/replacement]]}`，用于匹配pattern并在var值中用replacement替换它（参见[Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。

- 扩展`${!prefix*}`，用于展开所有变量名以prefix开头的shell变量的名称（参见[Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。

- Bash通过`${!word}`实现了间接变量展开（参见[Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)）。

- Bash可以通过`${num}`来扩展超过`$9`的位置参数。

- Bash实现了POSIX `$()`命令替换形式（参见[Command Substitution](https://www.gnu.org/software/bash/manual/bash.html#Command-Substitution)），并推荐使用而不是Bourne shell的  \`\` 后者也为了向后兼容而实现）。

- Bash具有进程替换功能（参见[Process Substitution](https://www.gnu.org/software/bash/manual/bash.html#Process-Substitution)）。

- Bash自动为当前用户（`UID`、`EUID`和`GROUPS`）、当前主机（`HOSTTYPE`、`OSTYPE`、`MACHTYPE`和`HOSTNAME`）和运行的Bash实例（`BASH`、`BASH_VERSION`和`BASH_VERSINFO`）分配变量。详见[Bash Variables](https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables)。

- `IFS`变量用于仅拆分扩展的结果，而不是所有单词（参见[Word Splitting](https://www.gnu.org/software/bash/manual/bash.html#Word-Splitting)）。这关闭了一个长期存在的shell安全漏洞。

- 文件名展开方括号表达式代码使用`!`和`^`来否定括号之间字符的集合。Bourne shell仅使用`!`。

- Bash实现了一整套POSIX文件名展开运算符，包括字符类、等价类和排序符号（参见[Filename Expansion](https://www.gnu.org/software/bash/manual/bash.html#Filename-Expansion)）。

- 当启用`extglob` shell选项时，Bash实现了扩展的模式匹配功能（参见[Pattern Matching](https://www.gnu.org/software/bash/manual/bash.html#Pattern-Matching)）。

- 可以同时使用变量和同名函数；`sh`不会将两个名称空间分开。

- Bash函数允许使用`local`内置命令来定义局部变量，从而可以编写有用的递归函数（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。

- 前置的变量赋值仅影响该命令，即使是内置命令和函数（参见[Environment](https://www.gnu.org/software/bash/manual/bash.html#Environment)）。在`sh`中，除非命令从文件系统中执行，否则所有前置的变量赋值都是全局的。

- Bash会在作为输入和输出重定向操作符的操作数指定的文件名上执行文件名展开（参见[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）。

- Bash包含`<>`重定向操作符，允许同时为读和写打开文件，并且包含`&>`重定向操作符，用于将标准输出和标准错误重定向到同一个文件（参见[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）。

- Bash包含`<<<`重定向操作符，允许将字符串用作命令的标准输入。

- Bash实现了`[n]<&word`和`[n]>&word`重定向操作符，用于将一个文件描述符移动到另一个文件描述符。

- 当在重定向操作符中使用特定文件名时，Bash会对其进行特殊处理（参见[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）。

- Bash可以使用重定向操作符打开到任意机器和服务的网络连接（参见[Redirections](https://www.gnu.org/software/bash/manual/bash.html#Redirections)）。

- 可用`noclobber`选项来避免使用输出重定向覆盖现有文件（参见[The Set Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。可以使用`>|`重定向操作符来覆盖`noclobber`。

- Bash的`cd`和`pwd`内置命令（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）都可以使用-L和-P选项在逻辑模式和物理模式之间切换。

- Bash允许函数覆盖具有相同名称的内置命令，并且通过`builtin`和`command`内置命令在函数内访问内置命令的功能（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。

- `command`内置命令允许在执行命令查找时选择性地禁用函数（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。

- 可以使用`enable`内置命令来启用或禁用单个内置命令（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。

- Bash的`exec`内置命令接受附加选项，允许用户控制传递给执行的命令的环境内容，以及将命令的第0个参数设置为什么（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。

- 使用`export -f`可以将shell函数导出到子进程的环境中（参见[Shell Functions](https://www.gnu.org/software/bash/manual/bash.html#Shell-Functions)）。

- Bash的`export`、`readonly`和`declare`内置命令可以使用`-f`选项来操作shell函数，使用`-p`选项以可以用作shell输入的格式显示具有各种属性设置的变量，使用`-n`选项来删除各种变量属性，以及通过`name=value`参数同时设置变量属性和值。

- Bash的`hash`内置命令允许将名称与任意文件名关联，即使在`$PATH`中无法找到该文件名，可以使用`hash -p`（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。

- Bash包含了`help`内置命令，用于快速查阅shell功能（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。

- 可以使用`printf`内置命令显示格式化输出（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。

- Bash的`read`内置命令（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）在使用-r选项时会读取以`\`结尾的行，并且如果没有提供非选项参数，则会使用`REPLY`变量作为默认值。Bash的`read`内置命令还接受一个-p选项作为提示字符串，并在给定-e选项时使用Readline来获取输入行。`read`内置命令还有其他控制输入的选项：-s选项用于关闭读取输入字符时的回显，-t选项允许`read`在指定的秒数内超时，如果输入未及时到达，则-n选项只允许读取指定数量的字符，而不是整行，并且-d选项将读取直到特定字符而不是换行符。

- 可以使用`return`内置命令来中止使用`.`或`source`内置命令执行的脚本的执行（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。

- Bash包含了`shopt`内置命令，用于更精细地控制shell的可选功能（参见[The Shopt Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Shopt-Builtin)），并允许在shell启动时设置和取消这些选项（参见[Invoking Bash](https://www.gnu.org/software/bash/manual/bash.html#Invoking-Bash)）。

- Bash具有许多可选的行为，可以通过`set`内置命令进行控制（参见[The Set Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。

- `-x`（xtrace）选项在执行跟踪时显示除简单命令以外的命令（参见[The Set Builtin](https://www.gnu.org/software/bash/manual/bash.html#The-Set-Builtin)）。

- `test`内置命令（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）略有不同，因为它实现了POSIX算法，该算法根据参数的数量指定行为。

- Bash包含`caller`内置命令，用于显示任何活动子例程调用（shell函数或使用`.`或`source`内置命令执行的脚本）的上下文。这支持Bash调试器。

- `trap` 内置命令（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）允许使用 `DEBUG` 伪信号规范，类似于 `EXIT`。指定了 `DEBUG` 陷阱的命令会在每个简单命令、`for` 命令、`case` 命令、`select` 命令、每个算术 `for` 命令以及在 shell 函数中第一个命令执行之前被执行。`DEBUG` 陷阱不会被 shell 函数继承，除非函数已经被赋予 `trace` 属性，或者通过 `shopt` 内置命令启用了 `functrace` 选项。`extdebug` shell 选项对 `DEBUG` 陷阱有额外的影响。

  `trap` 内置命令（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）允许使用 `ERR` 伪信号规范，类似于 `EXIT` 和 `DEBUG`。指定了 `ERR` 陷阱的命令会在简单命令失败后被执行，但有几个例外情况。`ERR` 陷阱不会被 shell 函数继承，除非使用 `set` 内置命令启用了 `-o errtrace` 选项。

  `trap` 内置命令（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）允许使用 `RETURN` 伪信号规范，类似于 `EXIT` 和 `DEBUG`。指定了 `RETURN` 陷阱的命令会在 shell 函数或使用 `.` 或 `source` 内置命令执行的 shell 脚本返回后恢复执行之前被执行。`RETURN` 陷阱不会被 shell 函数继承，除非函数已经被赋予 `trace` 属性，或者通过 `shopt` 内置命令启用了 `functrace` 选项。

- Bash 的 `type` 内置命令更为广泛，并提供有关所找到的名称的更多信息（参见[Bash Builtin Commands](https://www.gnu.org/software/bash/manual/bash.html#Bash-Builtins)）。

- Bash 的 `umask` 内置命令允许使用 `-p` 选项，以使输出以 `umask` 命令的形式显示，可以重新用作输入（参见[Bourne Shell Builtins](https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins)）。

- Bash 实现了类似于 `csh` 的目录堆栈，并提供了 `pushd`、`popd` 和 `dirs` 内置命令来对其进行操作（参见[The Directory Stack](https://www.gnu.org/software/bash/manual/bash.html#The-Directory-Stack)）。Bash 还将目录堆栈可见化为 `DIRSTACK` shell 变量的值。

- 在交互模式下，Bash 会解释提示字符串中的特殊反斜杠转义字符（参见[Controlling the Prompt](https://www.gnu.org/software/bash/manual/bash.html#Controlling-the-Prompt)）。

- Bash 的受限模式更加实用（参见[The Restricted Shell](https://www.gnu.org/software/bash/manual/bash.html#The-Restricted-Shell)）；而 SVR4.2 shell 的受限模式太过有限。

- `disown` 内置命令可以从内部 shell 作业表中删除作业（参见[Job Control Builtins](https://www.gnu.org/software/bash/manual/bash.html#Job-Control-Builtins)），或在 shell 退出时作为 `SIGHUP` 结果而不发送 `SIGHUP` 给作业。

- Bash 包含许多用于支持单独的 shell 脚本调试器的功能。

- SVR4.2 shell 有两个与特权相关的内置命令（`mldmode` 和 `priv`），而 Bash 中没有这些命令。

- Bash 不具有 `stop` 或 `newgrp` 内置命令。

- Bash 不使用 `SHACCT` 变量，也不执行 shell 账户管理。

- SVR4.2 `sh` 使用类似于 Bash 使用的 `TMOUT` 的 `TIMEOUT` 变量。


​	Bash 的更多独特功能可以在[Bash Features](https://www.gnu.org/software/bash/manual/bash.html#Bash-Features)中找到。



### B.1 与 SVR4.2 Shell 的实现差异

​	由于 Bash 是一个全新的实现，因此它没有许多 SVR4.2 shell 的限制。例如： 

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

​	如果您的文档中包含不变的章节、封面文字和封底文字，请使用以下语句替换上述“with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.”行：

```
    with the Invariant Sections being list their titles, with
    the Front-Cover Texts being list, and with the Back-Cover Texts
    being list.
```

​	如果您的文档中包含不变的章节但不包含封面文字和封底文字，或者包含其他三者的组合，请合并两种备选方案以适应情况。

​	如果您的文档包含复杂的程序代码示例，我们建议以您选择的自由软件许可证（例如GNU通用公共许可证）同时发布这些示例，以便允许它们在自由软件中使用。