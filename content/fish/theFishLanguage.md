+++
title = "The fish language"
date = 2024-10-09T13:37:26+08:00
type = "docs"
weight = 20
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://fishshell.com/docs/current/language.html](https://fishshell.com/docs/current/language.html)

# The fish language

This document is a comprehensive overview of fish’s scripting language.

​	本文档是对Fish脚本语言的全面概述。

For interactive features see [Interactive use](https://fishshell.com/docs/current/interactive.html#interactive).

​	有关交互功能，请参见 [Interactive use](https://fishshell.com/docs/current/interactive.html#interactive)。

## 语法概述 Syntax overview

Shells like fish are used by giving them commands. A command is executed by writing the name of the command followed by any arguments. For example:

​	像Fish这样的Shell用于接收命令。通过输入命令名称及其参数来执行命令。例如：

```
echo hello world

```

[echo](https://fishshell.com/docs/current/cmds/echo.html) command writes its arguments to the screen. In this example the output is `hello world`.

​	[echo](https://fishshell.com/docs/current/cmds/echo.html)命令将其参数写入屏幕。在这个例子中，输出是`hello world`。

Everything in fish is done with commands. There are commands for repeating other commands, commands for assigning variables, commands for treating a group of commands as a single command, etc. All of these commands follow the same basic syntax.

​	Fish中的所有操作都是通过命令完成的。包括重复执行命令、变量赋值、将多个命令作为单个命令处理的命令等。这些命令都遵循相同的基本语法。

Every program on your computer can be used as a command in fish. If the program file is located in one of the [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) directories, you can just type the name of the program to use it. Otherwise the whole filename, including the directory (like `/home/me/code/checkers/checkers` or `../checkers`) is required.

​	计算机中的每个程序都可以在Fish中作为命令使用。如果程序文件位于[`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH)目录之一中，您只需键入程序名称即可使用它。否则，您需要输入包含目录路径的完整文件名（例如 `/home/me/code/checkers/checkers` 或 `../checkers`）。

Here is a list of some useful commands:

​	以下是一些有用的命令列表：

- [cd](https://fishshell.com/docs/current/cmds/cd.html): Change the current directory 更改当前目录

- `ls`: List files and directories 列出文件和目录
- `man`: Display a manual page - try `man ls` to get help on your “ls” command, or `man mv` to get information about “mv”. 显示手册页 - 尝试 `man ls` 获取“ls”命令的帮助，或 `man mv` 获取“mv”的信息。
- `mv`: Move (rename) files 移动（重命名）文件
- `cp`: Copy files 复制文件
- [open](https://fishshell.com/docs/current/cmds/open.html): Open files with the default application associated with each filetype 使用与每个文件类型相关的默认应用程序打开文件
- `less`: Display the contents of files 显示文件内容

Commands and arguments are separated by the space character `' '`. Every command ends with either a newline (by pressing the return key) or a semicolon `;`. Multiple commands can be written on the same line by separating them with semicolons.

​	命令和参数通过空格字符 `' '` 分隔。每个命令以换行符（通过按回车键）或分号 `;` 结束。可以通过用分号分隔将多个命令写在同一行上。

A switch is a very common special type of argument. Switches almost always start with one or more hyphens `-` and alter the way a command operates. For example, the `ls` command usually lists the names of all files and directories in the current working directory. By using the `-l` switch, the behavior of `ls` is changed to not only display the filename, but also the size, permissions, owner, and modification time of each file.

​	Switch是一种非常常见的特殊参数类型。Switch通常以一个或多个连字符 `-` 开头，并改变命令的操作方式。例如，`ls`命令通常列出当前工作目录中的所有文件和目录的名称。通过使用`-l` switch，`ls`命令的行为将改变，不仅显示文件名，还会显示每个文件的大小、权限、所有者和修改时间。

Switches differ between commands and are usually documented on a command’s manual page. There are some switches, however, that are common to most commands. For example, `--help` will usually display a help text, `--version` will usually display the command version, and `-i` will often turn on interactive prompting before taking action. Try `man your-command-here` to get information on your command’s switches.

​	Switch在不同的命令之间有所不同，通常记录在命令的手册页中。但是，有些Switch是大多数命令共有的。例如，`--help` 通常会显示帮助文本，`--version` 通常会显示命令的版本，`-i` 通常会在执行操作之前启动交互提示。可以尝试`man your-command-here`来获取有关命令的Switch信息。

So the basic idea of fish is the same as with other unix shells: It gets a commandline, runs [expansions](https://fishshell.com/docs/current/language.html#expand), and the result is then run as a command.

​	因此，Fish的基本思想与其他UNIX Shell相同：它获取命令行，运行 [扩展](https://fishshell.com/docs/current/language.html#expand)，然后将结果作为命令运行。



## 术语 Terminology

Here we define some of the terms used on this page and throughout the rest of the fish documentation:

​	这里定义了本页及整个Fish文档中使用的一些术语：

- **Argument**: A parameter given to a command. In `echo foo`, the “foo” is an argument. 提供给命令的参数。在 `echo foo` 中，“foo”是一个参数。

- **Builtin**: A command that is implemented by the shell. Builtins are so closely tied to the operation of the shell that it is impossible to implement them as external commands. In `echo foo`, the “echo” is a builtin.由Shell实现的命令。内建命令与Shell的操作密切相关，因此不可能将它们实现为外部命令。在 `echo foo` 中，“echo”是一个内建命令。
- **Command**: A program that the shell can run, or more specifically an external program that the shell runs in another process. External commands are provided on your system, as executable files. In `echo foo` the “echo” is a builtin command, in `command echo foo` the “echo” is an external command, provided by a file like /bin/echo. Shell可以运行的程序，或更具体地说，Shell在另一个进程中运行的外部程序。外部命令作为可执行文件提供。在 `echo foo` 中，“echo”是一个内建命令，在 `command echo foo` 中，“echo”是一个外部命令，由 /bin/echo 之类的文件提供。
- **Function**: A block of commands that can be called as if they were a single command. By using functions, it is possible to string together multiple simple commands into one more advanced command.可以像单个命令一样调用的命令块。通过使用函数，可以将多个简单的命令串联成一个更高级的命令。
- **Job**: A running pipeline or command. 正在运行的管道或命令。
- **Pipeline**: A set of commands strung together so that the output of one command is the input of the next command. `echo foo | grep foo` is a pipeline. 将一组命令串在一起，使得一个命令的输出是下一个命令的输入。`echo foo | grep foo` 是一个管道。
- **Redirection**: An operation that changes one of the input or output streams associated with a job. 更改与作业关联的输入或输出流的操作。
- **Switch** or **Option**: A special kind of argument that alters the behavior of a command. A switch almost always begins with one or two hyphens. In `echo -n foo` the “-n” is an option. 一种特殊的参数，用于改变命令的行为。Switch几乎总是以一个或两个连字符开头。在 `echo -n foo` 中，“-n”是一个选项。



## 引号 Quotes

Sometimes you want to give a command an argument that contains characters special to fish, like spaces or `$` or `*`. To do that, you can use quotes:

​	有时您希望给命令提供一个包含对Fish特殊字符（如空格或 `$` 或 `*`）的参数。为此，您可以使用引号：

```
rm "my file.txt"

```

to remove a file called `my file.txt` instead of trying to remove two files, `my` and `file.txt`.

​	这将删除名为 `my file.txt` 的文件，而不是尝试删除两个文件 `my` 和 `file.txt`。

Fish understands two kinds of quotes: Single (`'`) and double (`"`), and both work slightly differently.

​	Fish理解两种引号：单引号（`'`）和双引号（`"`），两者的工作方式略有不同。

Between single quotes, fish performs no expansions. Between double quotes, fish only performs [variable expansion](https://fishshell.com/docs/current/language.html#expand-variable) and [command substitution](https://fishshell.com/docs/current/language.html#expand-command-substitution) in the `$(command)`. No other kind of expansion (including [brace expansion](https://fishshell.com/docs/current/language.html#expand-brace) or parameter expansion) is performed, and escape sequences (for example, `\n`) are ignored. Within quotes, whitespace is not used to separate arguments, allowing quoted arguments to contain spaces.

​	在单引号之间，Fish不进行任何扩展。在双引号之间，Fish只进行[变量扩展](https://fishshell.com/docs/current/language.html#expand-variable)和[命令替换](https://fishshell.com/docs/current/language.html#expand-command-substitution)。不执行其他类型的扩展（包括[大括号扩展](https://fishshell.com/docs/current/language.html#expand-brace)或参数扩展），且忽略转义序列（例如 `\n`）。在引号内，空格不用于分隔参数，从而允许带有空格的参数。

The only meaningful escape sequences in single quotes are `\'`, which escapes a single quote and `\\`, which escapes the backslash symbol. The only meaningful escapes in double quotes are `\"`, which escapes a double quote, `\$`, which escapes a dollar character, `\` followed by a newline, which deletes the backslash and the newline, and `\\`, which escapes the backslash symbol.

​	在单引号中，唯一有意义的转义序列是 `\'`（转义单引号）和 `\\`（转义反斜杠符号）。在双引号中，唯一有意义的转义是 `\"`（转义双引号），`\$`（转义美元符号），`\` 加换行符删除反斜杠和换行符，以及 `\\`（转义反斜杠符号）。

Single quotes have no special meaning within double quotes and vice versa.

​	单引号在双引号内没有特殊意义，反之亦然。

More examples:

​	更多示例：

```
grep 'enabled)$' foo.txt

```

searches for lines ending in `enabled)` in `foo.txt` (the `$` is special to `grep`: it matches the end of the line).

​	搜索 `foo.txt` 中以 `enabled)` 结尾的行（`$` 对 `grep` 是特殊字符：它匹配行的结尾）。

```
apt install "postgres-*"

```

installs all packages with a name starting with “postgres-”, instead of looking through the current directory for files named “postgres-something”.

​	安装所有名称以 "postgres-" 开头的包，而不是在当前目录中查找名为 "postgres-something" 的文件。

## 转义字符 Escaping Characters

Some characters cannot be written directly on the command line. For these characters, so-called escape sequences are provided. These are:

​	某些字符不能直接在命令行中编写。对于这些字符，提供了所谓的转义序列。以下是常见的转义序列：

- `\a` represents the alert character. 代表警报字符。

- `\e` represents the escape character. 代表转义字符。
- `\f` represents the form feed character. 代表换页字符。
- `\n` represents a newline character. 代表换行符。
- `\r` represents the carriage return character. 代表回车符。
- `\t` represents the tab character. 代表制表符。
- `\v` represents the vertical tab character. 代表垂直制表符。
- `\xHH` or `\XHH`, where `HH` is a hexadecimal number, represents a byte of data with the specified value. For example, `\x9` is the tab character. If you are using a multibyte encoding, this can be used to enter invalid strings. Typically fish is run with the ASCII or UTF-8 encoding, so anything up to `\X7f` is an ASCII character. 其中 `HH` 是一个十六进制数字，代表具有指定值的字节数据。例如，`\x9` 是制表符。如果您使用多字节编码，则可以使用它输入无效的字符串。通常，Fish运行时使用ASCII或UTF-8编码，因此任何到`\X7f`的字符都是ASCII字符。
- `\ooo`, where `ooo` is an octal number, represents the ASCII character with the specified value. For example, `\011` is the tab character. The highest allowed value is `\177`. 其中 `ooo` 是一个八进制数字，代表具有指定值的ASCII字符。例如，`\011` 是制表符。最高允许的值为`\177`。
- `\uXXXX`, where `XXXX` is a hexadecimal number, represents the 16-bit Unicode character with the specified value. For example, `\u9` is the tab character. 其中 `XXXX` 是一个十六进制数字，表示具有指定值的16位Unicode字符。例如，`\u9` 是制表符。
- `\UXXXXXXXX`, where `XXXXXXXX` is a hexadecimal number, represents the 32-bit Unicode character with the specified value. For example, `\U9` is the tab character. The highest allowed value is U10FFFF. 其中 `XXXXXXXX` 是一个十六进制数字，表示具有指定值的32位Unicode字符。例如，`\U9` 是制表符。最高允许的值为 U10FFFF。
- `\cX`, where `X` is a letter of the alphabet, represents the control sequence generated by pressing the control key and the specified letter. For example, `\ci` is the tab character 其中 `X` 是一个字母，代表按下Ctrl键和指定字母时生成的控制序列。例如，`\ci` 是制表符。

Some characters have special meaning to the shell. For example, an apostrophe `'` disables expansion (see [Quotes](https://fishshell.com/docs/current/language.html#quotes)). To tell the shell to treat these characters literally, escape them with a backslash. For example, the command:

​	某些字符对Shell有特殊意义。例如，单引号 `'` 禁用扩展（参见 [Quotes](https://fishshell.com/docs/current/language.html#quotes)）。要告诉Shell按字面意思处理这些字符，请使用反斜杠对它们进行转义。例如，以下命令：

```
echo \'hello world\'

```

outputs `'hello world'` (including the apostrophes), while the command:

​	输出 `'hello world'`（包括单引号），而命令：

```
echo 'hello world'

```

outputs `hello world` (without the apostrophes). In the former case the shell treats the apostrophes as literal `'` characters, while in the latter case it treats them as special expansion modifiers.

​	输出 `hello world`（不带单引号）。在前一种情况下，Shell将单引号视为字面字符 `'`，而在后一种情况下，它将它们视为特殊的扩展修饰符。

The special characters and their escape sequences are:

​	以下是特殊字符及其转义序列的列表：

- `\ ` (backslash space) escapes the space character. This keeps the shell from splitting arguments on the escaped space. （反斜杠加空格）转义空格字符。这样Shell不会在转义的空格上拆分参数。

- `\$` escapes the dollar character. 转义美元符号。
- `\\` escapes the backslash character. 转义反斜杠符号。
- `\*` escapes the star character. 转义星号字符。
- `\?` escapes the question mark character (this is not necessary if the `qmark-noglob` [feature flag](https://fishshell.com/docs/current/language.html#featureflags) is enabled). 转义问号字符（如果启用了`qmark-noglob` [功能标志](https://fishshell.com/docs/current/language.html#featureflags)，则不需要转义）。
- `\~` escapes the tilde character. 转义波浪号字符。
- `\#` escapes the hash character. 转义井号字符。
- `\(` escapes the left parenthesis character. 转义左括号字符。
- `\)` escapes the right parenthesis character. 转义右括号字符。
- `\{` escapes the left curly bracket character. 转义左大括号字符。
- `\}` escapes the right curly bracket character. 转义右大括号字符。
- `\[` escapes the left bracket character. 转义左方括号字符。
- `\]` escapes the right bracket character. 转义右方括号字符。
- `\<` escapes the less than character. 转义小于号字符。
- `\>` escapes the more than character. 转义大于号字符。
- `\&` escapes the ampersand character. 转义和号字符。
- `\|` escapes the vertical bar character. 转义竖线字符。
- `\;` escapes the semicolon character. 转义分号字符。
- `\"` escapes the quote character. 转义双引号字符。
- `\'` escapes the apostrophe character. 转义单引号字符。

As a special case, `\` immediately followed by a literal new line is a “continuation” and tells fish to ignore the line break and resume input at the start of the next line (without introducing any whitespace or terminating a token).

​	一种特殊情况是，`\` 后紧跟一个换行符表示“续行”，这会告诉Fish忽略换行符并在下一行的开始处继续输入（不引入任何空白或终止标记）。



## 输入/输出重定向 Input/Output Redirection

Most programs use three input/output (I/O) streams:

​	大多数程序使用三种输入/输出（I/O）流：

- Standard input (stdin) for reading. Defaults to reading from the keyboard.
- 标准输入（stdin）用于读取。默认情况下从键盘读取。

- Standard output (stdout) for writing output. Defaults to writing to the screen.
- 标准输出（stdout）用于写出输出。默认情况下输出到屏幕。
- Standard error (stderr) for writing errors and warnings. Defaults to writing to the screen.
- 标准错误（stderr）用于写出错误和警告。默认情况下输出到屏幕。

Each stream has a number called the file descriptor (FD): 0 for stdin, 1 for stdout, and 2 for stderr.

​	每个流都有一个称为文件描述符（FD）的编号：stdin是0，stdout是1，stderr是2。

The destination of a stream can be changed using something called *redirection*. For example, `echo hello > output.txt`, redirects the standard output of the `echo` command to a text file.

​	可以使用称为*重定向*的操作更改流的目标。例如，`echo hello > output.txt` 将 `echo` 命令的标准输出重定向到一个文本文件。

- To read standard input from a file, use `<SOURCE_FILE`.
- 从文件读取标准输入，使用 `<SOURCE_FILE`。

- To write standard output to a file, use `>DESTINATION`.
- 将标准输出写入文件，使用 `>DESTINATION`。
- To write standard error to a file, use `2>DESTINATION`. [[1\]](https://fishshell.com/docs/current/language.html#id4)
- 将标准错误写入文件，使用 `2>DESTINATION`。
- To append standard output to a file, use `>>DESTINATION_FILE`.
- 将标准输出追加到文件，使用 `>>DESTINATION_FILE`。
- To append standard error to a file, use `2>>DESTINATION_FILE`.
- 将标准错误追加到文件，使用 `2>>DESTINATION_FILE`。
- To not overwrite (“clobber”) an existing file, use `>?DESTINATION` or `2>?DESTINATION`. This is known as the “noclobber” redirection.
- 若要不覆盖已存在的文件，使用 `>?DESTINATION` 或 `2>?DESTINATION`。这称为“noclobber”重定向。

`DESTINATION` can be one of the following:

​	`DESTINATION` 可以是以下内容之一：

- A filename to write the output to. Often `>/dev/null` to silence output by writing it to the special “sinkhole” file.
- 要写入输出的文件名，通常使用 `>/dev/null` 来通过将输出写入特殊的“黑洞”文件以静音输出。

- An ampersand (`&`) followed by the number of another file descriptor like `&2` for standard error. The output will be written to the destination descriptor.
- 一个和符号（`&`）后跟另一个文件描述符的编号，如 `&2` 代表标准错误。输出将写入目标描述符。
- An ampersand followed by a minus sign (`&-`). The file descriptor will be closed. Note: This may cause the program to fail because its writes will be unsuccessful.
- 一个和符号后跟一个减号（`&-`）。文件描述符将被关闭。注意：这可能导致程序失败，因为它的写入操作将不成功。

As a convenience, the redirection `&>` can be used to direct both stdout and stderr to the same destination. For example, `echo hello &> all_output.txt` redirects both stdout and stderr to the file `all_output.txt`. This is equivalent to `echo hello > all_output.txt 2>&1`.

​	作为方便的做法，可以使用重定向 `&>` 将stdout和stderr重定向到相同的目标。例如，`echo hello &> all_output.txt` 将stdout和stderr都重定向到文件 `all_output.txt`。这等效于 `echo hello > all_output.txt 2>&1`。

Any arbitrary file descriptor can be used in a redirection by prefixing the redirection with the FD number.

​	任意文件描述符都可以通过在重定向前加上FD编号来使用。

- To redirect the input of descriptor N, use `N<DESTINATION`.
- 若要重定向描述符N的输入，使用 `N<DESTINATION`。

- To redirect the output of descriptor N, use `N>DESTINATION`.
- 若要重定向描述符N的输出，使用 `N>DESTINATION`。
- To append the output of descriptor N to a file, use `N>>DESTINATION_FILE`.
- 若要将描述符N的输出追加到文件，使用 `N>>DESTINATION_FILE`。

For example:

例如：

```
# Write `foo`'s standard error (file descriptor 2)
# to a file called "output.stderr":
# 将`foo`的标准错误（文件描述符2）写入一个名为"output.stderr"的文件：
foo 2> output.stderr

# if $num doesn't contain a number,
# this test will be false and print an error,
# so by ignoring the error we can be sure that we're dealing
# with a number in the "if" block:
# 如果$num不包含数字，此测试将为假并打印错误，
# 通过忽略错误，我们可以确保在"if"块中处理的是一个数字：
if test "$num" -gt 2 2>/dev/null
    # do things with $num as a number greater than 2
    # 作为大于2的数字处理$num
else
    # do things if $num is <= 2 or not a number
    # 如果$num <= 2或不是数字，执行其他操作
end

# Save `make`s output in a file:
# 将`make`的输出保存到文件中：
make &>/log

# Redirections stack and can be used with blocks:
# 重定向可以叠加并与代码块一起使用：
begin
    echo stdout
    echo stderr >&2 # <- this goes to stderr! <- 这个输出到标准错误！
end >/dev/null # ignore stdout, so this prints "stderr" 忽略标准输出，只打印"stderr"

```

It is an error to redirect a builtin, function, or block to a file descriptor above 2. However this is supported for external commands.

​	将内建命令、函数或代码块重定向到高于2的文件描述符是错误的，但对外部命令支持该操作。

[[1](https://fishshell.com/docs/current/language.html#id3)] 

Previous versions of fish also allowed specifying this as `^DESTINATION`, but that made another character special so it was deprecated and removed. See [feature flags](https://fishshell.com/docs/current/language.html#featureflags).

​	fish 的早期版本允许通过 `^DESTINATION` 指定重定向，但这导致了另一个字符变得特殊，因此此功能被弃用并移除。请参阅 [功能标志](https://fishshell.com/docs/current/language.html#featureflags) 了解更多信息。

## 管道 Piping

Another way to redirect streams is a *pipe*. A pipe connects streams with each other. Usually the standard output of one command is connected with the standard input of another. This is done by separating commands with the pipe character `|`. For example:

​	另一种重定向流的方式是*管道*。管道用于将一个命令的标准输出连接到另一个命令的标准输入。这是通过使用管道符号 `|` 分隔命令来实现的。例如：

```
cat foo.txt | head

```

The command `cat foo.txt` sends the contents of `foo.txt` to stdout. This output is provided as input for the `head` program, which prints the first 10 lines of its input.

​	这里，`cat foo.txt` 将 `foo.txt` 的内容发送到标准输出，而 `head` 程序会接收此输出并打印其前10行。

It is possible to pipe a different output file descriptor by prepending its FD number and the output redirect symbol to the pipe. For example:

​	你还可以通过在管道前面加上文件描述符编号来重定向不同的输出流。例如：

```
make fish 2>| less

```

will attempt to build `fish`, and any errors will be shown using the `less` pager. [[2\]](https://fishshell.com/docs/current/language.html#id6)

​	这将尝试编译 `fish`，并将任何错误通过 `less` 分页显示。

As a convenience, the pipe `&|` redirects both stdout and stderr to the same process. This is different from bash, which uses `|&`.

​	作为一种方便的方式，可以使用 `&|` 管道同时将stdout和stderr重定向到同一个进程。与Bash不同的是，Fish使用 `&|`，而Bash使用 `|&`。

[[2](https://fishshell.com/docs/current/language.html#id5)] 

A “pager” here is a program that takes output and “paginates” it. `less` doesn’t just do pages, it allows arbitrary scrolling (even back!).

## 组合管道和重定向 Combining pipes and redirections

It is possible to use multiple redirections and a pipe at the same time. In that case, they are read in this order:

​	可以同时使用多个重定向和一个管道。在这种情况下，操作顺序如下：

1. First the pipe is set up. 首先设置管道
2. Then the redirections are evaluated from left-to-right. 然后从左到右评估重定向。

This is important when any redirections reference other file descriptors with the `&N` syntax. When you say `>&2`, that will redirect stdout to where stderr is pointing to *at that time*.

​	这在涉及文件描述符时很重要，特别是使用 `&N` 语法引用其他文件描述符时。比如 `>&2` 会将stdout重定向到当时stderr指向的位置。

Consider this helper function:

```
# Just make a function that prints something to stdout and stderr
# 定义一个函数，打印一些内容到stdout和stderr
function print
    echo out
    echo err >&2
end

```

Now let’s see a few cases:

```
# Redirect both stderr and stdout to less
# (can also be spelt as `&|`)
# 将stderr和stdout都重定向到less
# （可以写作 `&|`）
print 2>&1 | less

# Show the "out" on stderr, silence the "err"
# 将 "out" 输出到stderr，忽略 "err"
print >&2 2>/dev/null

# Silence both
# 忽略所有输出
print >/dev/null 2>&1

```



## 作业控制 Job control

When you start a job in fish, fish itself will pause, and give control of the terminal to the program just started. Sometimes, you want to continue using the commandline, and have the job run in the background. To create a background job, append an `&` (ampersand) to your command. This will tell fish to run the job in the background. Background jobs are very useful when running programs that have a graphical user interface.

​	当你在Fish中启动一个作业时，Fish会暂停自身，并将终端的控制权交给刚刚启动的程序。有时，你可能想继续使用命令行，并让作业在后台运行。要创建后台作业，可以在命令末尾加上 `&`（与号）。这将告诉Fish在后台运行作业。后台作业在运行图形用户界面的程序时非常有用。

Example:

​	例如：

```
emacs &

```

will start the emacs text editor in the background. [fg](https://fishshell.com/docs/current/cmds/fg.html) can be used to bring it into the foreground again when needed.

​	会在后台启动 Emacs 文本编辑器。你可以通过 [fg](https://fishshell.com/docs/current/cmds/fg.html) 命令将其再次调入前台。

Most programs allow you to suspend the program’s execution and return control to fish by pressing Control+Z (also referred to as `^Z`). Once back at the fish commandline, you can start other programs and do anything you want. If you then want you can go back to the suspended command by using the [fg](https://fishshell.com/docs/current/cmds/fg.html) (foreground) command.

​	大多数程序允许你按 `Control+Z`（也称为 `^Z`）暂停程序的执行，并将控制权交还给Fish。一旦返回Fish命令行，你可以启动其他程序并进行其他操作。如果你想重新返回暂停的命令，可以使用 [fg](https://fishshell.com/docs/current/cmds/fg.html) 命令。

If you instead want to put a suspended job into the background, use the [bg](https://fishshell.com/docs/current/cmds/bg.html) command.

​	如果你想将一个暂停的作业放入后台，可以使用 [bg](https://fishshell.com/docs/current/cmds/bg.html) 命令。

To get a listing of all currently started jobs, use the [jobs](https://fishshell.com/docs/current/cmds/jobs.html) command. These listed jobs can be removed with the [disown](https://fishshell.com/docs/current/cmds/disown.html) command.

​	要查看当前启动的所有作业，可以使用 [jobs](https://fishshell.com/docs/current/cmds/jobs.html) 命令。列出的作业可以使用 [disown](https://fishshell.com/docs/current/cmds/disown.html) 命令删除。

At the moment, functions cannot be started in the background. Functions that are stopped and then restarted in the background using the [bg](https://fishshell.com/docs/current/cmds/bg.html) command will not execute correctly.

​	目前，函数不能在后台启动。如果通过 [bg](https://fishshell.com/docs/current/cmds/bg.html) 命令停止并重新启动后台的函数，它将无法正确执行。

If the `&` character is followed by a non-separating character, it is not interpreted as background operator. Separating characters are whitespace and the characters `;<>&|`.

​	如果 `&` 字符后紧跟非分隔字符，则不会被解释为后台操作符。分隔字符包括空格和字符 `;<>&|`。



## 函数 Functions

Functions are programs written in the fish syntax. They group together various commands and their arguments using a single name.

​	函数是使用Fish语法编写的程序。它们将各种命令和参数组合在一起，使用一个名称来调用。

For example, here’s a simple function to list directories:

​	例如，以下是一个简单的函数，用于列出目录内容：

```
function ll
    ls -l $argv
end

```

The first line tells fish to define a function by the name of `ll`, so it can be used by simply writing `ll` on the commandline. The second line tells fish that the command `ls -l $argv` should be called when `ll` is invoked. [$argv](https://fishshell.com/docs/current/language.html#variables-argv) is a [list variable](https://fishshell.com/docs/current/language.html#variables-lists), which always contains all arguments sent to the function. In the example above, these are simply passed on to the `ls` command. The `end` on the third line ends the definition.

​	第一行告诉Fish定义一个名为 `ll` 的函数，这样它可以通过在命令行中简单地输入 `ll` 来调用。第二行告诉Fish，当调用 `ll` 时，应执行命令 `ls -l $argv`。[$argv](https://fishshell.com/docs/current/language.html#variables-argv) 是一个[列表变量](https://fishshell.com/docs/current/language.html#variables-lists)，它包含传递给函数的所有参数。在此示例中，这些参数会传递给 `ls` 命令。第三行中的 `end` 表示定义的结束。

Calling this as `ll /tmp/` will end up running `ls -l /tmp/`, which will list the contents of /tmp.

​	调用 `ll /tmp/` 将实际运行 `ls -l /tmp/`，即列出 /tmp 目录的内容。

This is a kind of function known as an [alias](https://fishshell.com/docs/current/language.html#syntax-aliases).

​	这是所谓的[别名](https://fishshell.com/docs/current/language.html#syntax-aliases)函数。

Fish’s prompt is also defined in a function, called [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html). It is run when the prompt is about to be displayed and its output forms the prompt:

​	fish 的提示符也通过一个名为 [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) 的函数定义。当要显示提示符时，它会运行该函数，其输出将作为提示符的一部分：

```
function fish_prompt
    # A simple prompt. Displays the current directory
    # (which fish stores in the $PWD variable)
    # and then a user symbol - a '►' for a normal user and a '#' for root.
    # 一个简单的提示符。显示当前目录
    # （Fish将其存储在$PWD变量中）
    # 然后是用户符号 - 普通用户显示 '►'，root用户显示 '#'
    set -l user_char '►'
    if fish_is_root_user
        set user_char '#'
    end

    echo (set_color yellow)$PWD (set_color purple)$user_char
end

```

To edit a function, you can use [funced](https://fishshell.com/docs/current/cmds/funced.html), and to save a function [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html). This will store it in a function file that fish will [autoload](https://fishshell.com/docs/current/language.html#syntax-function-autoloading) when needed.

​	要编辑函数，可以使用 [funced](https://fishshell.com/docs/current/cmds/funced.html)，要保存函数使用 [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html)。这会将其存储在一个函数文件中，Fish会在需要时[自动加载](https://fishshell.com/docs/current/language.html#syntax-function-autoloading)该文件。

The [functions](https://fishshell.com/docs/current/cmds/functions.html) builtin can show a function’s current definition (and [type](https://fishshell.com/docs/current/cmds/type.html) will also do if given a function).

​	[functions](https://fishshell.com/docs/current/cmds/functions.html) 内建命令可以显示函数的当前定义（[type](https://fishshell.com/docs/current/cmds/type.html) 命令在给定函数时也会这样做）。

For more information on functions, see the documentation for the [function](https://fishshell.com/docs/current/cmds/function.html) builtin.

​	有关函数的更多信息，请参见 [function](https://fishshell.com/docs/current/cmds/function.html) 内建命令的文档。



### 定义别名 Defining aliases

One of the most common uses for functions is to slightly alter the behavior of an already existing command. For example, one might want to redefine the `ls` command to display colors. The switch for turning on colors on GNU systems is `--color=auto`. An alias around `ls` might look like this:

​	最常见的函数用途之一是稍微改变现有命令的行为。例如，可能有人想重新定义 `ls` 命令，使其显示颜色。在GNU系统中，启用颜色的开关是 `--color=auto`。可以为 `ls` 创建一个别名，如下所示：

```
function ls
    command ls --color=auto $argv
end

```

There are a few important things that need to be noted about aliases:

​	定义别名时需要注意几点：

- Always take care to add the [$argv](https://fishshell.com/docs/current/language.html#variables-argv) variable to the list of parameters to the wrapped command. This makes sure that if the user specifies any additional parameters to the function, they are passed on to the underlying command.
- 一定要将[$argv](https://fishshell.com/docs/current/language.html#variables-argv)变量添加到参数列表中，以确保用户传递给函数的任何额外参数都能传递给底层命令。

- If the alias has the same name as the aliased command, you need to prefix the call to the program with `command` to tell fish that the function should not call itself, but rather a command with the same name. If you forget to do so, the function would call itself until the end of time. Usually fish is smart enough to figure this out and will refrain from doing so (which is hopefully in your interest).
- 如果别名与被封装的命令同名，则需要在程序调用前添加 `command`，告诉Fish函数不应调用自身，而应调用同名命令。如果你忘记了这样做，函数会不断调用自身，直至结束时间。但通常Fish会足够智能，避免这种情况发生。

To easily create a function of this form, you can use the [alias](https://fishshell.com/docs/current/cmds/alias.html) command. Unlike other shells, this just makes functions - fish has no separate concept of an “alias”, we just use the word for a simple wrapping function like this. [alias](https://fishshell.com/docs/current/cmds/alias.html) immediately creates a function. Consider using `alias --save` or [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html) to save the created function into an autoload file instead of recreating the alias each time.

​	要快速创建这种形式的函数，可以使用 [alias](https://fishshell.com/docs/current/cmds/alias.html) 命令。与其他Shell不同，Fish并没有独立的“别名”概念，它仅使用函数。Fish通过 `alias` 立即创建一个函数。建议使用 `alias --save` 或 [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html) 将创建的函数保存到自动加载文件中，而不是每次重启都重新创建别名。

For an alternative, try [abbreviations](https://fishshell.com/docs/current/interactive.html#abbreviations). These are words that are expanded while you type, instead of being actual functions inside the shell.

​	作为一种替代方案，可以尝试 [abbreviations](https://fishshell.com/docs/current/interactive.html#abbreviations)，它们是在你键入时自动扩展为完整命令，而不是实际的函数。



### 自动加载函数 Autoloading functions

Functions can be defined on the commandline or in a configuration file, but they can also be automatically loaded. This has some advantages:

​	函数可以在命令行或配置文件中定义，但也可以自动加载。这具有以下几个优点：

- An autoloaded function becomes available automatically to all running shells.
- 自动加载的函数会自动对所有正在运行的Shell会话可用。

- If the function definition is changed, all running shells will automatically reload the altered version, after a while.
- 如果函数定义发生变化，所有正在运行的Shell会话会在一段时间后自动重新加载更新的版本。
- Startup time and memory usage is improved, etc.
- 启动时间和内存使用量得到改善。

When fish needs to load a function, it searches through any directories in the [list variable](https://fishshell.com/docs/current/language.html#variables-lists) `$fish_function_path` for a file with a name consisting of the name of the function plus the suffix `.fish` and loads the first it finds.

​	当Fish需要加载函数时，它会搜索 [`$fish_function_path`](https://fishshell.com/docs/current/language.html#variables-lists) 变量中的所有目录，寻找一个以函数名称加 `.fish` 后缀的文件，并加载找到的第一个文件。

For example if you try to execute something called `banana`, fish will go through all directories in $fish_function_path looking for a file called `banana.fish` and load the first one it finds.

​	例如，如果你试图执行一个名为 `banana` 的命令，Fish会遍历 `$fish_function_path` 中的所有目录，寻找名为 `banana.fish` 的文件，并加载找到的第一个文件。

By default `$fish_function_path` contains the following:

​	默认情况下，`$fish_function_path` 包含以下几个目录：

- A directory for users to keep their own functions, usually `~/.config/fish/functions` (controlled by the `XDG_CONFIG_HOME` environment variable).
- 用户可以存放自己的函数的目录，通常是 `~/.config/fish/functions`（由 `XDG_CONFIG_HOME` 环境变量控制）。

- A directory for functions for all users on the system, usually `/etc/fish/functions` (really `$__fish_sysconfdir/functions`).
- 系统范围的函数目录，通常是 `/etc/fish/functions`（实际上是 `$__fish_sysconfdir/functions`）。
- Directories for other software to put their own functions. These are in the directories under `$__fish_user_data_dir` (usually `~/.local/share/fish`, controlled by the `XDG_DATA_HOME` environment variable) and in the `XDG_DATA_DIRS` environment variable, in a subdirectory called `fish/vendor_functions.d`. The default value for `XDG_DATA_DIRS` is usually `/usr/share/fish/vendor_functions.d` and `/usr/local/share/fish/vendor_functions.d`.
- 其他软件可以放置函数的目录。这些目录位于 `$__fish_user_data_dir`（通常为 `~/.local/share/fish`，由 `XDG_DATA_HOME` 环境变量控制）下的子目录以及 `XDG_DATA_DIRS` 环境变量中，通常为 `/usr/share/fish/vendor_functions.d` 和 `/usr/local/share/fish/vendor_functions.d`。
- The functions shipped with fish, usually installed in `/usr/share/fish/functions` (really `$__fish_data_dir/functions`).
- fish 自带的函数，通常安装在 `/usr/share/fish/functions`（实际上是 `$__fish_data_dir/functions`）。

If you are unsure, your functions probably belong in `~/.config/fish/functions`.

​	如果不确定自己的函数放在哪个目录，你的函数很可能应该放在 `~/.config/fish/functions`。

As we’ve explained, autoload files are loaded *by name*, so, while you can put multiple functions into one file, the file will only be loaded automatically once you try to execute the one that shares the name.

​	正如所述，自动加载的文件会根据名称来加载，因此虽然你可以将多个函数放在一个文件中，但该文件只会在你尝试执行与其名称匹配的函数时被加载。

Autoloading also won’t work for [event handlers](https://fishshell.com/docs/current/language.html#event), since fish cannot know that a function is supposed to be executed when an event occurs when it hasn’t yet loaded the function. See the [event handlers](https://fishshell.com/docs/current/language.html#event) section for more information.

​	自动加载无法处理 [事件处理程序](https://fishshell.com/docs/current/language.html#event)，因为Fish无法在尚未加载该函数时知道该函数应该在某个事件发生时执行。有关详细信息，请参阅[事件处理程序](https://fishshell.com/docs/current/language.html#event)部分。

If a file of the right name doesn’t define the function, fish will not read other autoload files, instead it will go on to try builtins and finally commands. This allows masking a function defined later in $fish_function_path, e.g. if your administrator has put something into /etc/fish/functions that you want to skip.

​	如果没有找到正确名称的文件，Fish不会读取其他自动加载文件，而是会继续尝试内建命令，最后是外部命令。这允许在 `$fish_function_path` 中屏蔽稍后定义的函数，例如，如果你的管理员在 `/etc/fish/functions` 中放了某些东西，而你不想使用它。

If you are developing another program and want to install fish functions for it, install them to the “vendor” functions directory. As this path varies from system to system, you can use `pkgconfig` to discover it with the output of `pkg-config --variable functionsdir fish`. Your installation system should support a custom path to override the pkgconfig path, as other distributors may need to alter it easily.

​	如果你正在开发另一个程序并希望为其安装Fish函数，请将它们安装到“供应商”函数目录中。由于这个路径在不同系统之间可能不同，你可以使用 `pkgconfig` 通过 `pkg-config --variable functionsdir fish` 来发现它。你的安装系统应支持自定义路径来覆盖 pkgconfig 路径，以便其他发行版可以轻松更改它。

## 注释 Comments

Anything after a `#` until the end of the line is a comment. That means it’s purely for the reader’s benefit, fish ignores it.

​	`#` 号后面的内容到行末的部分是注释。这意味着这些内容仅用于阅读，Fish会忽略它们。

This is useful to explain what and why you are doing something:

​	注释用于解释你在做什么以及为什么要这样做：

```
function ls
    # The function is called ls,
    # so we have to explicitly call `command ls` to avoid calling ourselves.
    # 这个函数叫做ls，
    # 所以我们必须明确调用 `command ls`，以避免调用自身。
    command ls --color=auto $argv
end

```

There are no multiline comments. If you want to make a comment span multiple lines, simply start each line with a `#`.

​	Fish不支持多行注释。如果你想让注释跨多行，只需在每行的开头加上 `#`。

Comments can also appear after a line like so:

​	注释也可以出现在行尾，如下所示：

```
set -gx EDITOR emacs # I don't like vim.

```



## 条件语句 Conditions

Fish has some builtins that let you execute commands only if a specific criterion is met: [if](https://fishshell.com/docs/current/cmds/if.html), [switch](https://fishshell.com/docs/current/cmds/switch.html), [and](https://fishshell.com/docs/current/cmds/and.html) and [or](https://fishshell.com/docs/current/cmds/or.html), and also the familiar [&&/||](https://fishshell.com/docs/current/language.html#syntax-combiners) syntax.

​	Fish有一些内建命令，可以让你在特定条件满足时执行命令：[if](https://fishshell.com/docs/current/cmds/if.html)、[switch](https://fishshell.com/docs/current/cmds/switch.html)、[and](https://fishshell.com/docs/current/cmds/and.html) 和 [or](https://fishshell.com/docs/current/cmds/or.html)，还有常用的[&&/||](https://fishshell.com/docs/current/language.html#syntax-combiners)语法。

### `if` 语句 The `if` statement

The [if](https://fishshell.com/docs/current/cmds/if.html) statement runs a block of commands if the condition was true.

​	[if](https://fishshell.com/docs/current/cmds/if.html) 语句在条件为真时执行一组命令块。

Like other shells, but unlike typical programming languages you might know, the condition here is a *command*. Fish runs it, and if it returns a true [exit status](https://fishshell.com/docs/current/language.html#variables-status) (that’s 0), the if-block is run. For example:

​	与其他Shell类似，但与某些编程语言不同，Fish中的条件实际上是一个*命令*。Fish运行该命令，并根据其返回的退出状态是否为真（即为0），来决定是否执行if块。例如：

```
if test -e /etc/os-release
    cat /etc/os-release
end

```

This uses the [test](https://fishshell.com/docs/current/cmds/test.html) command to see if the file /etc/os-release exists. If it does, it runs `cat`, which prints it on the screen.

​	这使用 [test](https://fishshell.com/docs/current/cmds/test.html) 命令来检查文件 `/etc/os-release` 是否存在。如果存在，它就会运行 `cat`，将文件内容打印到屏幕上。

Unlike other shells, the condition command just ends after the first job, there is no `then` here. Combiners like `and` and `or` extend the condition.

​	与其他Shell不同的是，Fish中的条件命令不需要 `then`，条件命令结束后直接进入块中。

`if` is commonly used with the [test](https://fishshell.com/docs/current/cmds/test.html) command that can check conditions.:

​	`if` 通常与 [test](https://fishshell.com/docs/current/cmds/test.html) 命令一起使用，来检查条件：

```
if test 5 -gt 2
    echo "Yes, 5 is greater than 2"
end

```

`if` can also take `else if` clauses with additional conditions and an [else](https://fishshell.com/docs/current/cmds/else.html) clause that is executed when everything else was false:

​	`if` 还可以带有 `else if` 子句，用于处理额外的条件，还有一个 [else](https://fishshell.com/docs/current/cmds/else.html) 子句，在所有其他条件为假时执行：

```
if test "$number" -gt 10
   echo Your number was greater than 10
else if test "$number" -gt 5
   echo Your number was greater than 5
else if test "$number" -gt 1
   echo Your number was greater than 1
else
   echo Your number was smaller or equal to 1
end

```

The [not](https://fishshell.com/docs/current/cmds/not.html) keyword can be used to invert the status:

​	你可以使用 [not](https://fishshell.com/docs/current/cmds/not.html) 关键字来取反条件：

```
# Just see if the file contains the string "fish" anywhere.
# This executes the `grep` command, which searches for a string,
# and if it finds it returns a status of 0.
# The `not` then turns 0 into 1 or anything else into 0.
# The `-q` switch stops it from printing any matches.
# 检查文件是否包含字符串 "fish"
# 这会执行 `grep` 命令，它搜索一个字符串，
# 如果找到，返回状态码 0。
# 然后 `not` 会将 0 转为 1，其他任何返回值转为 0。
# `-q` 开关会阻止它打印任何匹配内容。
if not grep -q fish myanimals
    echo "You don't have fish!"
else
    echo "You have fish!"
end

```

### `switch` 语句 The `switch` statement

The [switch](https://fishshell.com/docs/current/cmds/switch.html) command is used to execute one of possibly many blocks of commands depending on the value of a string. It can take multiple [case](https://fishshell.com/docs/current/cmds/case.html) blocks that are executed when the string matches. They can take [wildcards](https://fishshell.com/docs/current/language.html#expand-wildcard). For example:

​	[Switch](https://fishshell.com/docs/current/cmds/switch.html) 语句用于根据字符串的值执行不同的命令块。它可以包含多个 [case](https://fishshell.com/docs/current/cmds/case.html) 子句，每个子句都在字符串匹配时执行。Case 子句可以包含通配符。例如：

```
switch (uname)
case Linux
    echo Hi Tux!
case Darwin
    echo Hi Hexley!
case DragonFly '*BSD'
    echo Hi Beastie! # this also works for FreeBSD and NetBSD 这也适用于 FreeBSD 和 NetBSD
case '*'
    echo Hi, stranger!
end

```

Unlike other shells or programming languages, there is no fallthrough - the first matching `case` block is executed and then control jumps out of the `switch`.

​	与其他Shell或编程语言不同，Fish的 `switch` 语句没有“穿透”机制，即一旦匹配到一个 `case` 子句，它会立即跳出 `switch` 语句，而不会继续执行其他 `case` 子句。



### 组合语法 Combiners (`and` / `or` / `&&` / `||`)

For simple checks, you can use combiners. [and](https://fishshell.com/docs/current/cmds/and.html) or `&&` run the second command if the first succeeded, while [or](https://fishshell.com/docs/current/cmds/or.html) or `||` run it if the first failed. For example:

​	对于简单的条件检查，你可以使用组合语法。 [and](https://fishshell.com/docs/current/cmds/and.html) 或 `&&` 在前一个命令成功时执行下一个命令，而 [or](https://fishshell.com/docs/current/cmds/or.html) 或 `||` 则在前一个命令失败时执行。例如：

```
# $XDG_CONFIG_HOME is a standard place to store configuration.
# If it's not set applications should use ~/.config.
# 如果 $XDG_CONFIG_HOME 设置了，就将其赋值给 configdir，否则使用 ~/.config
set -q XDG_CONFIG_HOME; and set -l configdir $XDG_CONFIG_HOME
or set -l configdir ~/.config

```

Note that combiners are *lazy* - only the part that is necessary to determine the final status is run.

​	组合语法是*懒惰*的——只运行必要的部分来确定最终状态。

Compare:

​	比较以下两个例子：

```
if sleep 2; and false
    echo 'How did I get here? This should be impossible'
end

```

and:

```
if false; and sleep 2
    echo 'How did I get here? This should be impossible'
end

```

These do essentially the same thing, but the former takes 2 seconds longer because the `sleep` always needs to run.

​	两者的逻辑几乎相同，但第一个例子会比第二个多花两秒钟，因为 `sleep` 始终会运行。

Or you can have a case where it is necessary to stop early:

​	你也可能遇到一些需要提前停止的情况：

```
if command -sq foo; and foo

```

If this went on after seeing that the command “foo” doesn’t exist, it would try to run `foo` and error because it wasn’t found!

Combiners really just execute step-by-step, so it isn’t recommended to build longer chains of them because they might do something you don’t want. Consider:

​	如果命令 `foo` 不存在，继续运行 `foo` 会导致错误。Fish通过组合语法一步步执行，所以构建更长的语句链可能会产生意想不到的结果。考虑以下情况：

```
test -e /etc/my.config
or echo "OH NO WE NEED A CONFIG FILE"
and return 1

```

This will execute `return 1` also if the `test` succeeded. This is because fish runs `test -e /etc/my.config`, sets `$status` to 0, then skips the `echo`, keeps `$status` at 0, and then executes the `return 1` because $status is still 0.

​	这段代码即使在 `test` 成功的情况下也会执行 `return 1`。这是因为 fish 运行 `test -e /etc/my.config` 后，将 `$status` 设置为 0，然后跳过了 `echo`，保持 `$status` 为 0，接着执行了 `return 1`，因为 `$status` 仍然是 0。

So if you have more complex conditions or want to run multiple things after something failed, consider using an [if](https://fishshell.com/docs/current/language.html#syntax-if). Here that would be:

​	因此，如果你有更复杂的条件，或者希望在某个操作失败后执行多个任务，建议使用 [if](https://fishshell.com/docs/current/language.html#syntax-if)。在这种情况下，可以这样写：

```
if not test -e /etc/my.config
    echo "OH NO WE NEED A CONFIG FILE"
    return 1
end

```



## 循环和块 Loops and blocks

Like most programming language, fish also has the familiar [while](https://fishshell.com/docs/current/cmds/while.html) and [for](https://fishshell.com/docs/current/cmds/for.html) loops.

​	fish 提供了 [while](https://fishshell.com/docs/current/cmds/while.html) 和 [for](https://fishshell.com/docs/current/cmds/for.html) 循环，类似于大多数编程语言。

`while` works like a repeated [if](https://fishshell.com/docs/current/cmds/if.html):

​	`while` 循环类似于重复的 `if` 语句：

```
while true
    echo Still running
    sleep 1
end

```

will print “Still running” once a second. You can abort it with ctrl-c.

​	这段代码每秒钟会打印一次 "正在运行"。你可以通过按 `ctrl-c` 来终止循环。

`for` loops work like in other shells, which is more like python’s for-loops than e.g. C’s:

​	`for` 循环与其他 Shell 类似，且更像 Python 的 `for` 循环，而不是 C 的 `for` 循环：

```
for file in *
    echo file: $file
end

```

will print each file in the current directory. The part after the `in` is just a list of arguments, so you can use any [expansions](https://fishshell.com/docs/current/language.html#expand) there:

​	这段代码会打印当前目录中的每个文件名。`in` 后面的部分是一个参数列表，你可以使用任何 [扩展](https://fishshell.com/docs/current/language.html#expand)：

```
set moreanimals bird fox
for animal in {cat,}fish dog $moreanimals
   echo I like the $animal
end

```

If you need a list of numbers, you can use the `seq` command to create one:

​	如果你需要一个数字列表，可以使用 `seq` 命令来生成：

```
for i in (seq 1 5)
    echo $i
end

```

[break](https://fishshell.com/docs/current/cmds/break.html) is available to break out of a loop, and [continue](https://fishshell.com/docs/current/cmds/continue.html) to jump to the next iteration.

​	你可以使用 [break](https://fishshell.com/docs/current/cmds/break.html) 退出循环，使用 [continue](https://fishshell.com/docs/current/cmds/continue.html) 跳到下一个循环。

[Input and output redirections](https://fishshell.com/docs/current/language.html#redirects) (including [pipes](https://fishshell.com/docs/current/language.html#pipes)) can also be applied to loops:

​	[输入输出重定向](https://fishshell.com/docs/current/language.html#redirects)（包括 [管道](https://fishshell.com/docs/current/language.html#pipes)）也可以应用到循环中：

```
while read -l line
    echo line: $line
end < file

```

In addition there’s a [begin](https://fishshell.com/docs/current/cmds/begin.html) block that just groups commands together so you can redirect to a block or use a new [variable scope](https://fishshell.com/docs/current/language.html#variables-scope) without any repetition:

​	此外，还可以使用 [begin](https://fishshell.com/docs/current/cmds/begin.html) 块来将命令组合在一起，这样可以对整个块进行重定向，或使用新的[变量作用域](https://fishshell.com/docs/current/language.html#variables-scope)：

```
begin
   set -l foo bar # this variable will only be available in this block! 这个变量只在这个块中可用！
end

```



## 参数扩展 Parameter expansion

When fish is given a commandline, it expands the parameters before sending them to the command. There are multiple different kinds of expansions:

​	当Fish接收到一条命令时，它会在将参数传递给命令之前对参数进行扩展处理。Fish支持多种不同类型的扩展：

- [Wildcards](https://fishshell.com/docs/current/language.html#expand-wildcard), to create filenames from patterns - `*.jpg` 用于根据模式匹配文件名，如 `*.jpg`。

- [Variable expansion](https://fishshell.com/docs/current/language.html#expand-variable), to use the value of a variable - `$HOME` 用于获取变量的值，例如 `$HOME`。
- [Command substitution](https://fishshell.com/docs/current/language.html#expand-command-substitution), to use the output of another command - `$(cat /path/to/file)` 使用其他命令的输出作为参数，例如 `$(cat /path/to/file)`。
- [Brace expansion](https://fishshell.com/docs/current/language.html#expand-brace), to write lists with common pre- or suffixes in a shorter way `{/usr,}/bin` 用于以更简洁的方式书写具有相同前缀或后缀的列表，例如 `{/usr,}/bin`。
- [Tilde expansion](https://fishshell.com/docs/current/language.html#expand-home), to turn the `~` at the beginning of paths into the path to the home directory `~/bin` 将 `~` 转换为用户的主目录路径，如 `~/bin`。

Parameter expansion is limited to 524288 items. There is a limit to how many arguments the operating system allows for any command, and 524288 is far above it. This is a measure to stop the shell from hanging doing useless computation.

​	参数扩展限制为 524288 项。操作系统对任何命令的参数数量都有一个限制，而 524288 远超出这个限制。这是一种防止 shell 因进行无用计算而挂起的措施。

### 通配符 Wildcards (“Globbing”)

When a parameter includes an [unquoted](https://fishshell.com/docs/current/language.html#quotes) `*` star (or “asterisk”) or a `?` question mark, fish uses it as a wildcard to match files.

​	当一个参数包含一个[未引用](https://fishshell.com/docs/current/language.html#quotes)的 `*` 星号或 `?` 问号时，Fish会将它们作为通配符来匹配文件。

- `*` matches any number of characters (including zero) in a file name, not including `/`.
- `*` 匹配文件名中的任意数量字符（包括零个字符），但不包括 `/`。

- `**` matches any number of characters (including zero), and also descends into subdirectories. If `**` is a segment by itself, that segment may match zero times, for compatibility with other shells.
- `**` 匹配任意数量字符（包括零个字符），并且会递归到子目录。如果 `**` 是独立的路径段，那么该段可以匹配零次，以兼容其他Shell。
- `?` can match any single character except `/`. This is deprecated and can be disabled via the `qmark-noglob` [feature flag](https://fishshell.com/docs/current/language.html#featureflags), so `?` will just be an ordinary character.
- `?` 可以匹配任意单个字符，除了 `/`（这个特性已废弃，可以通过 `qmark-noglob` [功能标志](https://fishshell.com/docs/current/language.html#featureflags) 来禁用，使 `?` 只是普通字符）。

Wildcard matches are sorted case insensitively. When sorting matches containing numbers, they are naturally sorted, so that the strings ‘1’ ‘5’ and ‘12’ would be sorted like 1, 5, 12.

​	通配符的匹配是大小写不敏感的。当包含数字时，匹配结果会进行自然排序，例如字符串 "1"、"5" 和 "12" 会按1、5、12的顺序排列。

Hidden files (where the name begins with a dot) are not considered when wildcarding unless the wildcard string has a dot in that place.

​	隐藏文件（以 `.` 开头的文件）在通配时不会被考虑，除非通配符字符串中也包含一个点。

Examples:

- `a*` matches any files beginning with an ‘a’ in the current directory. 匹配当前目录中所有以 "a" 开头的文件。
- `**` matches any files and directories in the current directory and all of its subdirectories. 匹配当前目录及其所有子目录中的所有文件和目录。
- `~/.*` matches all hidden files (also known as “dotfiles”) and directories in your home directory. 匹配主目录中的所有隐藏文件（即“点文件”）。

For most commands, if any wildcard fails to expand, the command is not executed, [$status](https://fishshell.com/docs/current/language.html#variables-status) is set to nonzero, and a warning is printed. This behavior is like what bash does with `shopt -s failglob`. There are exceptions, namely [set](https://fishshell.com/docs/current/cmds/set.html) and [path](https://fishshell.com/docs/current/cmds/path.html), overriding variables in [overrides](https://fishshell.com/docs/current/language.html#variables-override), [count](https://fishshell.com/docs/current/cmds/count.html) and [for](https://fishshell.com/docs/current/cmds/for.html). Their globs will instead expand to zero arguments (so the command won’t see them at all), like with `shopt -s nullglob` in bash.

​	对于大多数命令，如果通配符没有扩展成功，则不会执行命令，且会将 [$status](https://fishshell.com/docs/current/language.html#variables-status) 设置为非零值，并打印警告信息。这个行为与Bash中的 `shopt -s failglob` 类似。有一些例外，例如 [set](https://fishshell.com/docs/current/cmds/set.html)、[path](https://fishshell.com/docs/current/cmds/path.html)、[count](https://fishshell.com/docs/current/cmds/count.html) 和 [for](https://fishshell.com/docs/current/cmds/for.html)，这些命令的通配符扩展失败时会扩展为空参数列表（这类似于Bash中的 `shopt -s nullglob`）。

Examples:

​	示例：

```
# List the .foo files, or warns if there aren't any.
ls *.foo

# List the .foo files, if any.
set foos *.foo
if count $foos >/dev/null
    ls $foos
end

```

Unlike bash (by default), fish will not pass on the literal glob character if no match was found, so for a command like `apt install` that does the matching itself, you need to add quotes:

​	与Bash（默认情况下）不同，如果未找到匹配，Fish不会传递通配符的原字符。如果你在使用 `apt install` 等自行匹配的命令时，需要添加引号：

```
apt install "ncurses-*"

```



### 变量扩展 Variable expansion

One of the most important expansions in fish is the “variable expansion”. This is the replacing of a dollar sign (`$`) followed by a variable name with the _value_ of that variable.

​	fish 中最重要的扩展之一是“变量扩展”。变量扩展将美元符号（`$`）加上变量名替换为变量的*值*。

In the simplest case, this is just something like:

​	最简单的情况是：

```
echo $HOME

```

which will replace `$HOME` with the home directory of the current user, and pass it to [echo](https://fishshell.com/docs/current/cmds/echo.html), which will then print it.

​	这会将 `$HOME` 替换为当前用户的主目录，并将其传递给 [echo](https://fishshell.com/docs/current/cmds/echo.html)，然后 `echo` 会打印该值。

Some variables like `$HOME` are already set because fish sets them by default or because fish’s parent process passed them to fish when it started it. You can define your own variables by setting them with [set](https://fishshell.com/docs/current/cmds/set.html):

​	某些变量如 `$HOME` 已经设置好，因为它们是 fish 默认设置的，或是由Fish的父进程在启动时传递给Fish的。你可以通过 [set](https://fishshell.com/docs/current/cmds/set.html) 命令定义自己的变量：

```
set my_directory /home/cooluser/mystuff
ls $my_directory
# shows the contents of /home/cooluser/mystuff

```

For more on how setting variables works, see [Shell variables](https://fishshell.com/docs/current/language.html#variables) and the following sections.

​	有关设置变量的更多信息，请参阅 [Shell变量](https://fishshell.com/docs/current/language.html#variables) 章节和相关部分。

Sometimes a variable has no value because it is undefined or empty, and it expands to nothing:

​	有时变量未定义或为空，因此会扩展为一个空字符串：

```
echo $nonexistentvariable
# Prints no output.

```

To separate a variable name from text you can encase the variable within double-quotes or braces:

​	要将变量名与文本分隔开，可以将变量放在双引号或花括号中：

```
set WORD cat
echo The plural of $WORD is "$WORD"s
# Prints "The plural of cat is cats" because $WORD is set to "cat".
# 输出 "The plural of cat is cats" 因为 $WORD 被设置为 "cat"
echo The plural of $WORD is {$WORD}s
# ditto 结果相同

```

Without the quotes or braces, fish will try to expand a variable called `$WORDs`, which may not exist.

​	如果不使用引号或花括号，fish 会尝试扩展一个名为 `$WORDs` 的变量，这可能并不存在。

The latter syntax `{$WORD}` is a special case of [brace expansion](https://fishshell.com/docs/current/language.html#expand-brace).

​	后一种语法 `{$WORD}` 是[花括号扩展](https://fishshell.com/docs/current/language.html#expand-brace) 的一种特殊情况。

If `$WORD` here is undefined or an empty list, the “s” is not printed. However, it is printed if `$WORD` is the empty string (like after `set WORD ""`).

​	如果 `$WORD` 未定义或是一个空列表，“s”不会被打印出来。然而，如果 `$WORD` 是空字符串（例如执行了 `set WORD ""`），"s" 将被打印。

For more on shell variables, read the [Shell variables](https://fishshell.com/docs/current/language.html#variables) section.

​	有关Shell变量的更多信息，请阅读 [Shell 变量](https://fishshell.com/docs/current/language.html#variables) 部分。

#### 引用变量 Quoting variables

Unlike all the other expansions, variable expansion also happens in double quoted strings. Inside double quotes (`"these"`), variables will always expand to exactly one argument. If they are empty or undefined, it will result in an empty string. If they have one element, they’ll expand to that element. If they have more than that, the elements will be joined with spaces, unless the variable is a [path variable](https://fishshell.com/docs/current/language.html#variables-path) - in that case it will use a colon (`:`) instead [[3\]](https://fishshell.com/docs/current/language.html#id8).

​	与其他扩展不同，变量扩展在双引号字符串中也会发生。在双引号字符串（`"这些内容"`）中，变量总是扩展为一个参数。如果变量为空或未定义，结果将是一个空字符串。如果变量包含一个元素，扩展结果就是该元素；如果变量有多个元素，元素将用空格连接，除非变量是 [路径变量](https://fishshell.com/docs/current/language.html#variables-path) ——在这种情况下，元素将用冒号（`:`）连接 。

Outside of double quotes, variables will expand to as many arguments as they have elements. That means an empty list will expand to nothing, a variable with one element will expand to that element, and a variable with multiple elements will expand to each of those elements separately.

​	在双引号外，变量扩展为与元素数量相等的参数。这意味着空列表会扩展为无参数，一个元素的变量扩展为该元素，而具有多个元素的变量会分别扩展为这些元素。

If a variable expands to nothing, it will cancel out any other strings attached to it. See the [cartesian product](https://fishshell.com/docs/current/language.html#cartesian-product) section for more information.

​	如果一个变量扩展为空，它会使任何与之连接的字符串消失。有关详细信息，请参阅[笛卡尔积](https://fishshell.com/docs/current/language.html#cartesian-product)部分。

Unlike other shells, fish doesn’t do what is known as “Word Splitting”. Once a variable is set to a particular set of elements, those elements expand as themselves. They aren’t split on spaces or newlines or anything:

​	与其他Shell不同，fish 不会进行“单词分割”。一旦变量设置为某个元素集，这些元素将按原样扩展，它们不会按空格或换行符分割。例如：

```
> set foo one\nthing
> echo $foo
one
thing
> printf '|%s|\n' $foo
|one
thing|

```

That means quoting isn’t the absolute necessity it is in other shells. Most of the time, not quoting a variable is correct. The exception is when you need to ensure that the variable is passed as one element, even if it might be unset or have multiple elements. This happens often with [test](https://fishshell.com/docs/current/cmds/test.html):

​	这意味着引用变量在Fish中不是绝对必要的。大多数情况下，不引用变量是正确的做法。例外情况是当你需要确保变量作为单个元素传递时，即使它可能未设置或有多个元素。常见的情况是 [test](https://fishshell.com/docs/current/cmds/test.html) 命令：

```
set -l foo one two three
test -n $foo
# prints an error that it got too many arguments, because it was executed like
test -n one two three

test -n "$foo"
# works, because it was executed like
test -n "one two three"

```

[[3](https://fishshell.com/docs/current/language.html#id7)] 

Unlike bash or zsh, which will join with the first character of $IFS (which usually is space).

​	与Bash或Zsh不同的是，Fish不会根据IFS（内部字段分隔符）进行分割，因此无需像它们那样担心空格分割。

#### 变量的间接扩展 Dereferencing variables

The `$` symbol can also be used multiple times, as a kind of “dereference” operator (the `*` in C or C++), like in the following code:

​	`$` 符号也可以用于多次间接扩展，类似于C或C++中的指针解引用操作（`*`），如下例：

```
set foo a b c
set a 10; set b 20; set c 30
for i in (seq (count $$foo))
    echo $$foo[$i]
end

# Output is:
# 10
# 20
# 30

```

`$$foo[$i]` is “the value of the variable named by `$foo[$i]`.

​	`$$foo[$i]` 表示“变量 `$foo[$i]` 所命名的变量的值”。

When using this feature together with list brackets, the brackets will be used from the inside out. `$$foo[5]` will use the fifth element of `$foo` as a variable name, instead of giving the fifth element of all the variables $foo refers to. That would instead be expressed as `$$foo[1..-1][5]` (take all elements of `$foo`, use them as variable names, then give the fifth element of those).

​	当将这个功能与列表括号结合使用时，括号会从内向外处理。`$$foo[5]` 会使用 `$foo` 的第五个元素作为变量名，而不会获取所有由 `$foo` 引用的变量的第五个元素。要实现这一点，可以写作 `$$foo[1..-1][5]`（取 `$foo` 的所有元素，使用它们作为变量名，然后获取这些变量的第五个元素）。

### Command substitution

A `command substitution` is an expansion that uses the *output* of a command as the arguments to another. For example:

​	`命令替换` 是一种扩展，它使用一个命令的*输出*作为另一个命令的参数。例如：

```
echo (pwd)

```

This executes the [pwd](https://fishshell.com/docs/current/cmds/pwd.html) command, takes its output (more specifically what it wrote to the standard output “stdout” stream) and uses it as arguments to [echo](https://fishshell.com/docs/current/cmds/echo.html). So the inner command (the `pwd`) is run first and has to complete before the outer command can even be started.

​	这会执行 [pwd](https://fishshell.com/docs/current/cmds/pwd.html) 命令，获取其输出（更具体地说，是它写入标准输出“stdout”流的内容），并将其作为 [echo](https://fishshell.com/docs/current/cmds/echo.html) 的参数。因此，内部命令（即 `pwd`）首先运行，且必须完成后外部命令才能启动。

If the inner command prints multiple lines, fish will use each separate line as a separate argument to the outer command. Unlike other shells, the value of `$IFS` is not used [[4\]](https://fishshell.com/docs/current/language.html#id10), fish splits on newlines.

​	如果内部命令打印了多行输出，fish 会将每一行作为外部命令的单独参数。与其他 shell 不同，fish 不使用 `$IFS` 的值 [[4\]](https://fishshell.com/docs/current/language.html#id10)，fish 会按换行符拆分。

A command substitution can also be spelled with a dollar sign like `outercommand $(innercommand)`. This variant is also allowed inside double quotes. When using double quotes, the command output is not split up by lines, but trailing empty lines are still removed.

​	命令替换还可以通过美元符号表示，如 `outercommand $(innercommand)`。这种形式也允许在双引号内使用。在双引号中使用时，命令输出不会按行拆分，但尾部的空行仍然会被移除。

If the output is piped to [string split or string split0](https://fishshell.com/docs/current/cmds/string-split.html) as the last step, those splits are used as they appear instead of splitting lines.

​	如果输出在最后一步被管道传递给 [string split 或 string split0](https://fishshell.com/docs/current/cmds/string-split.html)，则会按照出现的拆分方式而不是按行拆分。

The exit status of the last run command substitution is available in the [status](https://fishshell.com/docs/current/language.html#variables-status) variable if the substitution happens in the context of a [set](https://fishshell.com/docs/current/cmds/set.html) command (so `if set -l (something)` checks if `something` returned true).

​	如果命令替换发生在 [set](https://fishshell.com/docs/current/cmds/set.html) 命令的上下文中，最后运行的命令替换的退出状态可以通过 [status](https://fishshell.com/docs/current/language.html#variables-status) 变量获取（所以 `if set -l (something)` 会检查 `something` 是否返回 true）。

To use only some lines of the output, refer to [slices](https://fishshell.com/docs/current/language.html#expand-slices).

​	要使用输出中的某些行，可以参考 [slices](https://fishshell.com/docs/current/language.html#expand-slices)。

Examples:

​	示例：

```

# Outputs 'image.png'.
# 输出 'image.png'。
echo (basename image.jpg .jpg).png

# Convert all JPEG files in the current directory to the
# PNG format using the 'convert' program.
# 使用 'convert' 程序将当前目录中的所有 JPEG 文件
# 转换为 PNG 格式。
for i in *.jpg; convert $i (basename $i .jpg).png; end

# Set the ``data`` variable to the contents of 'data.txt'
# without splitting it into a list.
# 将 ``data`` 变量设置为 'data.txt' 的内容，
# 而不将其拆分为列表。
set data "$(cat data.txt)"

# Set ``$data`` to the contents of data, splitting on NUL-bytes.
# 将 ``$data`` 设置为数据的内容，并按 NUL 字节拆分。
set data (cat data | string split0)

```

Sometimes you want to pass the output of a command to another command that only accepts files. If it’s just one file, you can usually just pass it via a pipe, like:

​	有时你需要将一个命令的输出传递给另一个只接受文件的命令。如果只是一个文件，通常可以通过管道传递，如：

```
grep fish myanimallist1 | wc -l

```

but if you need multiple or the command doesn’t read from standard input, “process substitution” is useful. Other shells allow this via `foo <(bar) <(baz)`, and fish uses the [psub](https://fishshell.com/docs/current/cmds/psub.html) command:

​	但如果需要多个文件，或命令不从标准输入读取，"进程替换" 会很有用。其他 shell 通过 `foo <(bar) <(baz)` 实现，而 fish 使用 [psub](https://fishshell.com/docs/current/cmds/psub.html) 命令：

```
# Compare just the lines containing "fish" in two files:
diff -u (grep fish myanimallist1 | psub) (grep fish myanimallist2 | psub)

```

This creates a temporary file, stores the output of the command in that file and prints the filename, so it is given to the outer command.

​	这会创建一个临时文件，将命令的输出存储在该文件中，并打印文件名，传递给外部命令。

Fish has a default limit of 100 MiB on the data it will read in a command sustitution. If that limit is reached the command (all of it, not just the command substitution - the outer command won’t be executed at all) fails and `$status` is set to 122. This is so command substitutions can’t cause the system to go out of memory, because typically your operating system has a much lower limit, so reading more than that would be useless and harmful. This limit can be adjusted with the `fish_read_limit` variable (0 meaning no limit). This limit also affects the [read](https://fishshell.com/docs/current/cmds/read.html) command.

​	fish 对命令替换读取的数据设置了 100 MiB 的默认限制。如果达到此限制，命令（包括整个命令，而不仅仅是命令替换——外部命令将完全不会执行）会失败，`$status` 被设置为 122。这是为了防止命令替换导致系统内存不足，因为操作系统的限制通常更低，读取超过此限制的数据可能既无用又有害。这个限制可以通过 `fish_read_limit` 变量调整（0 表示无限制）。此限制也会影响 [read](https://fishshell.com/docs/current/cmds/read.html) 命令。

[[4](https://fishshell.com/docs/current/language.html#id9)] 

One exception: Setting `$IFS` to empty will disable line splitting. This is deprecated, use [string split](https://fishshell.com/docs/current/cmds/string-split.html) instead.

​	一个例外：将 `$IFS` 设置为空将禁用行拆分。这已经被弃用，建议使用 [string split](https://fishshell.com/docs/current/cmds/string-split.html) 代替。

### 花括号扩展 Brace expansion

Curly braces can be used to write comma-separated lists. They will be expanded with each element becoming a new parameter, with the surrounding string attached. This is useful to save on typing, and to separate a variable name from surrounding text.

​	花括号可以用来编写逗号分隔的列表。扩展后，每个元素会成为一个新的参数，并且保留周围的字符串。这种方式有助于减少输入的内容，并帮助在变量名周围添加文本。

Examples:

​	例如：

```
> echo input.{c,h,txt}
input.c input.h input.txt

# Move all files with the suffix '.c' or '.h' to the subdirectory src.
# 将所有以 '.c' 或 '.h' 结尾的文件移动到 src 目录
> mv *.{c,h} src/

# Make a copy of `file` at `file.bak`.
# 在 `file` 位置创建一个 `file.bak` 备份文件
> cp file{,.bak}

> set -l dogs hot cool cute "good "
> echo {$dogs}dog
hotdog cooldog cutedog good dog

```

If there is no “,” or variable expansion between the curly braces, they will not be expanded:

​	如果花括号中没有逗号或变量扩展，fish 不会进行扩展：

```
# This {} isn't special
# 此 {} 没有特殊意义
> echo foo-{}
foo-{}
# This passes "HEAD@{2}" to git
# 这会将 "HEAD@{2}" 传递给 git
> git reset --hard HEAD@{2}
> echo {{a,b}}
{a} {b} # because the inner brace pair is expanded, but the outer isn't. 因为内层的花括号对已扩展，但外层的未扩展。

```

If after expansion there is nothing between the braces, the argument will be removed (see [the cartesian product section](https://fishshell.com/docs/current/language.html#cartesian-product)):

​	如果扩展后，花括号之间没有内容，则该参数会被移除（请参阅[笛卡尔积](https://fishshell.com/docs/current/language.html#cartesian-product) 部分）：

```
> echo foo-{$undefinedvar}
# Output is an empty line, just like a bare `echo`.

```

If there is nothing between a brace and a comma or two commas, it’s interpreted as an empty element:

​	如果在花括号和逗号之间没有内容或有两个逗号，fish 会将其解释为一个空元素：

```
> echo {,,/usr}/bin
/bin /bin /usr/bin

```

To use a “,” as an element, [quote](https://fishshell.com/docs/current/language.html#quotes) or [escape](https://fishshell.com/docs/current/language.html#escapes) it.

​	要将逗号作为元素之一，可以[引用](https://fishshell.com/docs/current/language.html#quotes)或[转义](https://fishshell.com/docs/current/language.html#escapes)它。



### 组合列表（笛卡尔积） Combining lists (Cartesian Product)

When lists are expanded with other parts attached, they are expanded with these parts still attached. Even if two lists are attached to each other, they are expanded in all combinations. This is referred to as the “cartesian product” (like in mathematics), and works basically like [brace expansion](https://fishshell.com/docs/current/language.html#expand-brace).

​	当列表与其他部分组合扩展时，它们会在保留这些部分的情况下扩展。如果两个列表相互组合，它们会进行全部组合扩展。这称为“笛卡尔积”，其行为与[花括号扩展](https://fishshell.com/docs/current/language.html#expand-brace)类似。

Examples:

​	示例：

```
# Brace expansion is the most familiar:
# All elements in the brace combine with the parts outside of the braces
# 花括号扩展是最常见的形式：
# 花括号中的所有元素与外部部分组合
>_ echo {good,bad}" apples"
good apples bad apples

# The same thing happens with variable expansion.
# 变量扩展行为相同
>_ set -l a x y z
>_ set -l b 1 2 3

# $a is {x,y,z}, $b is {1,2,3},
# so this is `echo {x,y,z}{1,2,3}`
# $a 是 {x,y,z}，$b 是 {1,2,3}
# 因此，这相当于 `echo {x,y,z}{1,2,3}`
>_ echo $a$b
x1 y1 z1 x2 y2 z2 x3 y3 z3

# Same thing if something is between the lists
# 如果在列表之间有字符，也可以这样操作
>_ echo $a"-"$b
x-1 y-1 z-1 x-2 y-2 z-2 x-3 y-3 z-3

# Or a brace expansion and a variable
# 也可以同时扩展花括号和变量
>_ echo {x,y,z}$b
x1 y1 z1 x2 y2 z2 x3 y3 z3

# A combined brace-variable expansion
# 组合花括号和变量扩展
>_ echo {$b}word
1word 2word 3word

# Special case: If $c has no elements, this expands to nothing
# 特殊情况：如果 $c 没有任何元素，则扩展为空
>_ echo {$c}word
# Output is an empty line
# 输出是空行
```

Sometimes this may be unwanted, especially that tokens can disappear after expansion. In those cases, you should double-quote variables - `echo "$c"word`.

​	有时这种行为可能是不期望的，尤其是当扩展后参数消失时。在这些情况下，可以对变量使用双引号，如 `echo "$c"word`。

This also happens after [command substitution](https://fishshell.com/docs/current/language.html#expand-command-substitution). To avoid tokens disappearing there, make the inner command return a trailing newline, or store the output in a variable and double-quote it.

​	这也发生在[命令替换](https://fishshell.com/docs/current/language.html#expand-command-substitution)之后。为避免令牌消失，确保内部命令返回一个换行符，或将输出存储在变量中并使用双引号。

E.g.

​	例如：

```
>_ set b 1 2 3
>_ echo (echo x)$b
x1 x2 x3
>_ echo (printf '%s' '')banana
# the printf prints nothing, so this is nothing times "banana",
# which is nothing.
# 由于 printf 什么都不输出，这相当于没有任何元素加上 "banana"，结果是空。
>_ echo (printf '%s\n' '')banana
# the printf prints a newline,
# so the command substitution expands to an empty string,
# so this is `''banana`
# printf 输出了一个换行符，因此命令替换扩展为空字符串，结果是 `banana`
banana

```

This can be quite useful. For example, if you want to go through all the files in all the directories in [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH), use

​	这种方式非常有用。例如，如果你想遍历 `PATH` 中的所有目录中的文件，可以这样做：

```
for file in $PATH/*

```

Because [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) is a list, this expands to all the files in all the directories in it. And if there are no directories in [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH), the right answer here is to expand to no files.

​	因为 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) 是一个列表，所以这会扩展为 `PATH` 中所有目录中的所有文件。如果 `PATH` 中没有目录，正确的行为是扩展为空。



### 切片 Slices

Sometimes it’s necessary to access only some of the elements of a [list](https://fishshell.com/docs/current/language.html#variables-lists) (all fish variables are lists), or some of the lines a [command substitution](https://fishshell.com/docs/current/language.html#expand-command-substitution) outputs. Both are possible in fish by writing a set of indices in brackets, like:

​	有时你只需要访问一个列表的部分元素（fish 中的所有变量都是列表），或者你只想要[命令替换](https://fishshell.com/docs/current/language.html#expand-command-substitution)输出的某些行。在 fish 中，可以通过在方括号中指定一组索引来实现：

```
# Make $var a list of four elements
# 将 $var 设置为一个包含四个元素的列表
set var one two three four
# Print the second:
# 打印第二个元素
echo $var[2]
# prints "two"
# or print the first three:
# 或者打印前三个元素
echo $var[1..3]
# prints "one two three"
# 输出 "one two three"

```

In index brackets, fish understands ranges written like `a..b` (‘a’ and ‘b’ being indices). They are expanded into a sequence of indices from a to b (so `a a+1 a+2 ... b`), going up if b is larger and going down if a is larger. Negative indices can also be used - they are taken from the end of the list, so `-1` is the last element, and `-2` the one before it. If an index doesn’t exist the range is clamped to the next possible index.

​	在索引括号中，fish 支持写作 `a..b` 的范围（`a` 和 `b` 是索引）。这些范围会扩展为从 `a` 到 `b` 的索引序列（例如 `a a+1 a+2 ... b`），如果 `b` 大于 `a`，则范围递增，反之递减。负索引可以用于从列表的末尾开始取值，例如 `-1` 表示列表的最后一个元素，`-2` 表示倒数第二个元素。如果索引超出范围，Fish 会将其限制到最近的有效索引。

If a list has 5 elements the indices go from 1 to 5, so a range of `2..16` will only go from element 2 to element 5.

​	如果列表有 5 个元素，索引从 1 到 5，因此范围 `2..16` 只会从第二个元素扩展到第五个元素。

If the end is negative the range always goes up, so `2..-2` will go from element 2 to 4, and `2..-16` won’t go anywhere because there is no way to go from the second element to one that doesn’t exist, while going up. If the start is negative the range always goes down, so `-2..1` will go from element 4 to 1, and `-16..2` won’t go anywhere because there is no way to go from an element that doesn’t exist to the second element, while going down.

​	如果结束索引为负数，则范围总是递增的。例如，`2..-2` 会从第二个元素到第四个元素，而 `2..-16` 则不会扩展任何元素，因为从第二个元素开始不能达到不存在的第16个元素。类似地，如果起始索引为负数，范围总是递减的。

A missing starting index in a range defaults to 1. This is allowed if the range is the first index expression of the sequence. Similarly, a missing ending index, defaulting to -1 is allowed for the last index in the sequence.

​	可以省略起始索引（默认为 1）或结束索引（默认为 -1），这在范围表达式的起始或结束处是允许的。

Multiple ranges are also possible, separated with a space.

​	还可以通过空格分隔多个范围。

Some examples:

​	一些示例

```
echo (seq 10)[1 2 3]
# Prints: 1 2 3
# 输出：1 2 3

# Limit the command substitution output
# 限制命令替换的输出
echo (seq 10)[2..5]
# Uses elements from 2 to 5
# Output is: 2 3 4 5
# 输出：2 3 4 5

echo (seq 10)[7..]
# Prints: 7 8 9 10
# 输出：7 8 9 10

# Use overlapping ranges:
# 使用重叠的范围：
echo (seq 10)[2..5 1..3]
# Takes elements from 2 to 5 and then elements from 1 to 3
# Output is: 2 3 4 5 1 2 3
# 输出：2 3 4 5 1 2 3

# Reverse output
# 反转输出
echo (seq 10)[-1..1]
# Uses elements from the last output line to
# the first one in reverse direction
# 从最后一行输出到第一行，按逆向使用元素。
# Output is: 10 9 8 7 6 5 4 3 2 1
# 输出：10 9 8 7 6 5 4 3 2 1

# The command substitution has only one line,
# so these will result in empty output:
# 命令替换只有一行输出，因此以下操作会导致空输出：
echo (echo one)[2..-1]
echo (echo one)[-3..1]

```

The same works when setting or expanding variables:

​	这也适用于变量的设置或扩展：

```
# Reverse path variable
# 反转 PATH 变量
set PATH $PATH[-1..1]
# or
set PATH[-1..1] $PATH

# Use only n last items of the PATH
# 只使用 PATH 的最后 n 个条目
set n -3
echo $PATH[$n..-1]

```

Variables can be used as indices for expansion of variables, like so:

​	变量也可以作为扩展变量的索引：

```
set index 2
set letters a b c d
echo $letters[$index] # returns 'b'

```

However using variables as indices for command substitution is currently not supported, so:

​	但目前不支持使用变量作为命令替换的索引，因此：

```
echo (seq 5)[$index] # This won't work 这不起作用

set sequence (seq 5) # It needs to be written on two lines like this. 需要分两行写
echo $sequence[$index] # returns '2'

```

When using indirect variable expansion with multiple `$` (`$$name`), you have to give all indices up to the variable you want to slice:

​	当使用带有多个 `$` 的间接变量扩展时，必须提供直到目标变量的所有索引：

```
> set -l list 1 2 3 4 5
> set -l name list
> echo $$name[1]
1 2 3 4 5
> echo $$name[1..-1][1..3] # or $$name[1][1..3], since $name only has one element. 或 $$name[1][1..3]，因为 $name 只有一个元素
1 2 3

```



### 主目录扩展 Home directory expansion

The `~` (tilde) character at the beginning of a parameter, followed by a username, is expanded into the home directory of the specified user. A lone `~`, or a `~` followed by a slash, is expanded into the home directory of the process owner:

​	当参数的开头是波浪号 (`~`)，并跟随一户名时，Fish 会将其扩展为指定用户的主目录。如果只有一个 `~` 或者 `~` 后面跟随一个斜杠，则扩展为当前用户的主目录。

```
ls ~/Music # lists my music directory 列出当前用户音乐目录的内容

echo ~root # prints root's home directory, probably "/root" 打印 root 用户的主目录，通常为 "/root"

```



### 组合不同的扩展 Combining different expansions

All of the above expansions can be combined. If several expansions result in more than one parameter, all possible combinations are created.

​	前面介绍的各种扩展可以组合使用。如果多个扩展产生了不止一个参数，则所有可能的组合都会被创建。

When combining multiple parameter expansions, expansions are performed in the following order:

​	当组合多个扩展时，扩展按照以下顺序进行：

- Command substitutions 命令替换

- Variable expansions 变量扩展
- Bracket expansion 括号扩展
- Wildcard expansion 通配符扩展

Expansions are performed from right to left, nested bracket expansions are performed from the inside and out.

​	扩展从右向左进行，嵌套的扩展从内向外执行。

Example:

​	例如：

If the current directory contains the files ‘foo’ and ‘bar’, the command `echo a(ls){1,2,3}` will output `abar1 abar2 abar3 afoo1 afoo2 afoo3`.

​	如果当前目录中有文件 'foo' 和 'bar'，命令 `echo a(ls){1,2,3}` 将输出 `abar1 abar2 abar3 afoo1 afoo2 afoo3`。



## Shell variables

Variables are a way to save data and pass it around. They can be used just by the shell, or they can be “[exported](https://fishshell.com/docs/current/language.html#variables-export)”, so that a copy of the variable is available to any external command the shell starts. An exported variable is referred to as an “environment variable”.

​	变量是一种保存数据并传递数据的方式。它们可以仅供 shell 使用，也可以通过“[导出](https://fishshell.com/docs/current/language.html#variables-export)”使变量的副本在 shell 启动的任何外部命令中可用。导出的变量被称为“环境变量”。

To set a variable value, use the [set](https://fishshell.com/docs/current/cmds/set.html) command. A variable name can not be empty and can contain only letters, digits, and underscores. It may begin and end with any of those characters.

​	要设置变量的值，使用 [set](https://fishshell.com/docs/current/cmds/set.html) 命令。变量名不能是空的，并且只能包含字母、数字和下划线。变量名可以以其中任意一个字符开始和结束。

Example:

​	示例：

To set the variable `smurf_color` to the value `blue`, use the command `set smurf_color blue`.

​	要将变量 `smurf_color` 设置为值 `blue`，使用命令 `set smurf_color blue`。

After a variable has been set, you can use the value of a variable in the shell through [variable expansion](https://fishshell.com/docs/current/language.html#expand-variable).

​	设置变量后，你可以通过[变量扩展](https://fishshell.com/docs/current/language.html#expand-variable)在 shell 中使用变量的值。

Example:

​	示例：

```
set smurf_color blue
echo Smurfs are usually $smurf_color
set pants_color red
echo Papa smurf, who is $smurf_color, wears $pants_color pants

```

So you set a variable with `set`, and use it with a `$` and the name.

​	因此，你可以通过 `set` 设置变量，并通过 `$` 和变量名来使用它。



### 变量作用域 Variable Scope

There are four kinds of variables in fish: universal, global, function and local variables.

​	在 fish 中，有四种类型的变量：全局变量、通用变量、函数变量和局部变量。

- Universal variables are shared between all fish sessions a user is running on one computer. They are stored on disk and persist even after reboot.
- 通用变量在同一台计算机上的所有 fish 会话之间共享。它们存储在磁盘上，即使重启后也能保留。

- Global variables are specific to the current fish session. They can be erased by explicitly requesting `set -e`.
- 全局变量仅适用于当前的 fish 会话。可以通过 `set -e` 显式删除它们。
- Function variables are specific to the currently executing function. They are erased (“go out of scope”) when the current function ends. Outside of a function, they don’t go out of scope.
- 函数变量仅适用于当前正在执行的函数。当当前函数结束时，它们会被删除（即“超出作用域”）。在函数外，它们不会超出作用域。
- Local variables are specific to the current block of commands, and automatically erased when a specific block goes out of scope. A block of commands is a series of commands that begins with one of the commands `for`, `while` , `if`, `function`, `begin` or `switch`, and ends with the command `end`. Outside of a block, this is the same as the function scope.
- 局部变量仅适用于当前命令块，并在特定块超出作用域时自动删除。命令块是以 `for`、`while`、`if`、`function`、`begin` 或 `switch` 开头，并以 `end` 结束的一系列命令。在块之外，局部变量的作用域与函数作用域相同。

Variables can be explicitly set to be universal with the `-U` or `--universal` switch, global with `-g` or `--global`, function-scoped with `-f` or `--function` and local to the current block with `-l` or `--local`. The scoping rules when creating or updating a variable are:

​	可以通过 `-U` 或 `--universal` 设置通用变量，通过 `-g` 或 `--global` 设置全局变量，通过 `-f` 或 `--function` 设置函数变量，以及通过 `-l` 或 `--local` 设置局部变量。创建或更新变量时的作用域规则如下：

- When a scope is explicitly given, it will be used. If a variable of the same name exists in a different scope, that variable will not be changed.
- 当明确指定了作用域时，Fish 将使用指定的作用域。如果存在相同名称的变量但作用域不同，则该变量不会受到影响。

- When no scope is given, but a variable of that name exists, the variable of the smallest scope will be modified. The scope will not be changed.
- 当没有指定作用域时，如果同名变量已经存在，Fish 将修改最小作用域的变量，而不会更改该变量的作用域。
- When no scope is given and no variable of that name exists, the variable is created in function scope if inside a function, or global scope if no function is executing.
- 如果没有指定作用域，且该名称的变量不存在，则在函数内部时，变量将在函数作用域内创建；如果没有函数在执行，变量将在全局作用域内创建。

There can be many variables with the same name, but different scopes. When you [use a variable](https://fishshell.com/docs/current/language.html#expand-variable), the smallest scoped variable of that name will be used. If a local variable exists, it will be used instead of the global or universal variable of the same name.

​	可以有多个相同名称但不同作用域的变量。当你[使用变量](https://fishshell.com/docs/current/language.html#expand-variable)时，Fish 会优先使用最小作用域的变量。例如，如果存在局部变量，它将优先于同名的全局或通用变量。

Example:

​	示例：

There are a few possible uses for different scopes.

​	不同作用域有不同的使用场景。

Typically inside functions you should use local scope:

​	通常在函数内部，应该使用局部作用域：

```
function something
    set -l file /path/to/my/file
    if not test -e "$file"
        set file /path/to/my/otherfile
    end
end

# or

function something
    if test -e /path/to/my/file
        set -f file /path/to/my/file
    else
        set -f file /path/to/my/otherfile
    end
end

```

If you want to set something in config.fish, or set something in a function and have it available for the rest of the session, global scope is a good choice:

​	如果你想在 `config.fish` 中设置某些内容，或者在函数中设置内容并希望它在整个会话中都可用，全局作用域是一个不错的选择：

```
# Don't shorten the working directory in the prompt
# 不在提示符中缩短工作目录
set -g fish_prompt_pwd_dir_length 0

# Set my preferred cursor style:
# 设置我偏好的光标样式：
function setcursors
   set -g fish_cursor_default block
   set -g fish_cursor_insert line
   set -g fish_cursor_visual underscore
end

# Set my language
# 设置我的语言
set -gx LANG de_DE.UTF-8

```

If you want to set some personal customization, universal variables are nice:

​	如果你想设置一些个性化定制，全局变量（universal variables）是个不错的选择：

```
# Typically you'd run this interactively, fish takes care of keeping it.
# 通常你会在交互式会话中运行它，fish 会负责保存它
set -U fish_color_autosuggestion 555

```

Here is an example of local vs function-scoped variables:

​	这是局部变量与函数作用域变量的示例：

```
function test-scopes
    begin
        # This is a nice local scope where all variables will die
        # 这是一个很好的局部作用域，所有变量都会在此销毁
        set -l pirate 'There be treasure in them thar hills'
        set -f captain Space, the final frontier
        # If no variable of that name was defined, it is function-local.
        # 如果没有定义该名称的变量，它就是函数局部的。
        set gnu "In the beginning there was nothing, which exploded"
    end

    echo $pirate
    # This will not output anything, since the pirate was local
    # 不会输出任何内容，因为 pirate 是局部变量
    echo $captain
    # This will output the good Captain's speech since $captain had function-scope.
    # 这会输出船长的演讲，因为 captain 是函数作用域变量。
    echo $gnu
    # Will output Sir Terry's wisdom.
    # 会输出 Terry 的智慧之言。
end

```

When a function calls another, local variables aren’t visible:

​	当一个函数调用另一个函数时，局部变量不可见：

```
function shiver
    set phrase 'Shiver me timbers'
end

function avast
    set --local phrase 'Avast, mateys'
    # Calling the shiver function here can not
    # change any variables in the local scope
    # so phrase remains as we set it here.
    # 调用 shiver 函数不会更改局部作用域中的任何变量
    # 因此 phrase 保持我们在这里设置的值。
    shiver
    echo $phrase
end
avast

# Outputs "Avast, mateys"

```

When in doubt, use function-scoped variables. When you need to make a variable accessible everywhere, make it global. When you need to persistently store configuration, make it universal. When you want to use a variable only in a short block, make it local.

​	当不确定时，使用函数作用域变量。当需要使变量在所有地方都可访问时，设置为全局变量。当需要持久存储配置时，设置为全局变量（universal variables）。当仅需要在一个短块中使用变量时，设置为局部变量。

### 覆盖单个命令的变量 Overriding variables for a single command

If you want to override a variable for a single command, you can use “var=val” statements before the command:

​	如果你想为某个命令临时覆盖变量值，可以使用“var=val”语句在命令之前进行设置：

```
# Call git status on another directory
# (can also be done via `git -C somerepo status`)
# 对另一个目录调用 git status
# （也可以通过 `git -C somerepo status` 来实现）
GIT_DIR=somerepo git status

```

Unlike other shells, fish will first set the variable and then perform other expansions on the line, so:

​	与其他 Shell 不同的是，Fish 会先设置变量，然后再执行其他扩展，因此：

```
set foo banana
foo=gagaga echo $foo # prints gagaga, while in other shells it might print "banana" 输出 gagaga，而在其他 Shell 中可能会输出 "banana"

```

Multiple elements can be given in a [brace expansion](https://fishshell.com/docs/current/language.html#expand-brace):

​	可以使用[花括号扩展](https://fishshell.com/docs/current/language.html#expand-brace)为多个元素赋值：

```
# Call bash with a reasonable default path.
# 使用合理的默认路径调用 bash
PATH={/usr,}/{s,}bin bash

```

Or with a [glob](https://fishshell.com/docs/current/language.html#expand-wildcard

​	或者使用[通配符](https://fishshell.com/docs/current/language.html#expand-wildcard)：

```
# Run vlc on all mp3 files in the current directory
# If no file exists it will still be run with no arguments
# 对当前目录下的所有 mp3 文件运行 VLC
# 如果没有 mp3 文件，仍然会运行 VLC，但没有参数
mp3s=*.mp3 vlc $mp3s

```

Unlike other shells, this does *not* inhibit any lookup (aliases or similar). Calling a command after setting a variable override will result in the exact same command being run.

​	与其他 Shell 不同，这种语法不会禁止任何查找（如别名或类似内容）。在设置变量覆盖后调用命令时，Fish 会执行与正常情况下一致的命令。

This syntax is supported since fish 3.1.

​	此语法自 Fish 3.1 起支持。



### 通用变量 Universal Variables

Universal variables are variables that are shared between all the user’s fish sessions on the computer. Fish stores many of its configuration options as universal variables. This means that in order to change fish settings, all you have to do is change the variable value once, and it will be automatically updated for all sessions, and preserved across computer reboots and login/logout.

​	通用变量是用户所有 Fish 会话之间共享的变量。Fish 将许多配置选项作为通用变量存储。也就是说，修改一次变量值后，所有会话都会立即更新，并且重启计算机或登录/登出后，变量仍然会保留。

To see universal variables in action, start two fish sessions side by side, and issue the following command in one of them `set fish_color_cwd blue`. Since `fish_color_cwd` is a universal variable, the color of the current working directory listing in the prompt will instantly change to blue on both terminals.

​	要查看通用变量的效果，可以同时启动两个 Fish 会话，在其中一个会话中运行以下命令 `set fish_color_cwd blue`。由于 `fish_color_cwd` 是一个通用变量，两个终端中当前工作目录的颜色会立刻变为蓝色。

[Universal variables](https://fishshell.com/docs/current/language.html#variables-universal) are stored in the file `.config/fish/fish_variables`. Do not edit this file directly, as your edits may be overwritten. Edit the variables through fish scripts or by using fish interactively instead.

​	[通用变量](https://fishshell.com/docs/current/language.html#variables-universal) 存储在文件 `.config/fish/fish_variables` 中。请不要直接编辑该文件，因为你的修改可能会被覆盖。相反，建议通过 Fish 脚本或在 Fish 中交互地修改变量。

Do not append to universal variables in [config.fish](https://fishshell.com/docs/current/language.html#configuration), because these variables will then get longer with each new shell instance. Instead, simply set them once at the command line.

​	不要在 [config.fish](https://fishshell.com/docs/current/language.html#configuration) 中追加通用变量，因为每次启动新会话时，变量会不断增加。相反，只需在命令行中设置一次即可。



### 导出变量 Exporting variables

Variables in fish can be exported, so they will be inherited by any commands started by fish. In particular, this is necessary for variables used to configure external commands like `PAGER` or `GOPATH`, but also for variables that contain general system settings like `PATH` or `LANGUAGE`. If an external command needs to know a variable, it needs to be exported. Exported variables are also often called “environment variables”.

​	Fish 中的变量可以导出，以便 Fish 启动的任何命令都能继承这些变量。这对于配置外部命令（如 `PAGER` 或 `GOPATH`）或包含系统设置（如 `PATH` 或 `LANGUAGE`）的变量非常重要。如果外部命令需要访问变量，则需要导出该变量。导出的变量通常也称为“环境变量”。

This also applies to fish - when it starts up, it receives environment variables from its parent (usually the terminal). These typically include system configuration like [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) and [locale variables](https://fishshell.com/docs/current/language.html#variables-locale).

​	这也适用于 Fish ——当 Fish 启动时，它会从其父进程（通常是终端）继承环境变量。这些变量通常包括系统配置，如 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) 和 [语言环境变量](https://fishshell.com/docs/current/language.html#variables-locale)。

Variables can be explicitly set to be exported with the `-x` or `--export` switch, or not exported with the `-u` or `--unexport` switch. The exporting rules when setting a variable are similar to the scoping rules for variables - when an option is passed it is respected, otherwise the variable’s existing state is used. If no option is passed and the variable didn’t exist yet it is not exported.

​	可以通过 `-x` 或 `--export` 选项显式设置导出变量，或者通过 `-u` 或 `--unexport` 选项取消导出。设置变量的导出规则与变量的作用域规则类似——当提供选项时，Fish 将遵循该选项；否则将使用变量的现有状态。如果没有传递选项，并且该变量不存在，则不会导出。

As a naming convention, exported variables are in uppercase and unexported variables are in lowercase.

​	作为命名惯例，导出的变量通常使用大写字母，而未导出的变量使用小写字母。

For example:

​	例如：

```
set -gx ANDROID_HOME ~/.android # /opt/android-sdk
set -gx CDPATH . ~ (test -e ~/Videos; and echo ~/Videos)
set -gx EDITOR emacs -nw
set -gx GOPATH ~/dev/go
set -gx GTK2_RC_FILES "$XDG_CONFIG_HOME/gtk-2.0/gtkrc"
set -gx LESSHISTFILE "-"

```

Note: Exporting is not a [scope](https://fishshell.com/docs/current/language.html#variables-scope), but an additional state. It typically makes sense to make exported variables global as well, but local-exported variables can be useful if you need something more specific than [Overrides](https://fishshell.com/docs/current/language.html#variables-override). They are *copied* to functions so the function can’t alter them outside, and still available to commands. Global variables are accessible to functions whether they are exported or not.

​	注意：导出并不是一种[作用域](https://fishshell.com/docs/current/language.html#variables-scope)，而是一种额外的状态。通常导出变量时也会使其成为全局变量，但局部导出变量在需要更细粒度控制时也很有用。局部导出变量会被复制到函数中，因此函数不能修改它们的外部状态，但它们仍然可以用于命令。全局变量是否导出不影响其在函数中的可用性。



### 列表 Lists

Fish can store a list (or an “array” if you wish) of multiple strings inside of variable:

​	Fish 可以将多个字符串存储在变量中形成一个列表（或称为“数组”）。

```
> set mylist first second third
> printf '%s\n' $mylist # prints each element on its own line
first
second
third

```

To access one element of a list, use the index of the element inside of square brackets, like this:

​	要访问列表中的单个元素，请使用方括号中的元素索引：

```
echo $PATH[3]

```

List indices start at 1 in fish, not 0 like in other languages. This is because it requires less subtracting of 1 and many common Unix tools like `seq` work better with it (`seq 5` prints 1 to 5, not 0 to 5). An invalid index is silently ignored resulting in no value (not even an empty string, just no argument at all).

​	在 Fish 中，列表的索引从 1 开始，而不是像其他语言中从 0 开始。这是因为这样减少了对索引减 1 的需要，而且许多常见的 Unix 工具如 `seq` 也是从 1 开始的（例如 `seq 5` 输出 1 到 5）。无效的索引将被忽略，结果为空（既没有空字符串，也没有任何参数）。

If you don’t use any brackets, all the elements of the list will be passed to the command as separate items. This means you can iterate over a list with `for`:

​	如果不使用方括号，列表中的所有元素将作为单独的项传递给命令。这意味着你可以使用 `for` 来遍历列表：

```
for i in $PATH
    echo $i is in the path
end

```

This goes over every directory in [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) separately and prints a line saying it is in the path.

​	这会逐个打印 `PATH` 变量中的每个目录，并输出“目录在路径中”。

To create a variable `smurf`, containing the items `blue` and `small`, simply write:

​	创建包含 `blue` 和 `small` 两个元素的 `smurf` 列表，只需写：

```
set smurf blue small

```

It is also possible to set or erase individual elements of a list:

​	也可以设置或删除列表中的单个元素：

```
# Set smurf to be a list with the elements 'blue' and 'small'
# 将 smurf 设为包含 'blue' 和 'small' 的列表
set smurf blue small

# Change the second element of smurf to 'evil'
# 将 smurf 的第二个元素改为 'evil'
set smurf[2] evil

# Erase the first element
# 删除第一个元素
set -e smurf[1]

# Output 'evil'
# 输出 'evil'
echo $smurf

```

If you specify a negative index when expanding or assigning to a list variable, the index will be taken from the *end* of the list. For example, the index -1 is the last element of the list:

​	如果指定了负索引，则从列表末尾开始取值。例如，索引 `-1` 表示列表中的最后一个元素：

```
> set fruit apple orange banana
> echo $fruit[-1]
banana

> echo $fruit[-2..-1]
orange
banana

> echo $fruit[-1..1] # reverses the list 反转列表
banana
orange
apple

```

As you see, you can use a range of indices, see [slices](https://fishshell.com/docs/current/language.html#expand-slices) for details.

​	正如你所见，可以使用索引范围，更多详情请参阅[切片](https://fishshell.com/docs/current/language.html#expand-slices)部分。

All lists are one-dimensional and can’t contain other lists, although it is possible to fake nested lists using dereferencing - see [variable expansion](https://fishshell.com/docs/current/language.html#expand-variable).

​	所有列表都是一维的，不能包含其他列表，但可以使用间接扩展来模拟嵌套列表——参见[变量扩展](https://fishshell.com/docs/current/language.html#expand-variable)部分。

When a list is exported as an environment variable, it is either space or colon delimited, depending on whether it is a [path variable](https://fishshell.com/docs/current/language.html#variables-path):

​	当列表作为环境变量导出时，它要么通过空格分隔，要么通过冒号分隔，取决于它是否是[路径变量](https://fishshell.com/docs/current/language.html#variables-path)：

```
> set -x smurf blue small
> set -x smurf_PATH forest mushroom
> env | grep smurf
smurf=blue small
smurf_PATH=forest:mushroom

```

Fish automatically creates lists from all environment variables whose name ends in `PATH` (like [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH), [`CDPATH`](https://fishshell.com/docs/current/language.html#envvar-CDPATH) or `MANPATH`), by splitting them on colons. Other variables are not automatically split.

​	Fish 自动将所有以 `PATH` 结尾的环境变量（如 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH)、[`CDPATH`](https://fishshell.com/docs/current/language.html#envvar-CDPATH) 或 `MANPATH`）视为路径变量，并通过冒号进行分割。其他变量不会自动分割。

Lists can be inspected with the [count](https://fishshell.com/docs/current/cmds/count.html) or the [contains](https://fishshell.com/docs/current/cmds/contains.html) commands:

​	可以使用 [count](https://fishshell.com/docs/current/cmds/count.html) 或 [contains](https://fishshell.com/docs/current/cmds/contains.html) 命令来检查列表：

```
> count $smurf
2

> contains blue $smurf
# blue was found, so it exits with status 0
# (without printing anything)
# 找到 'blue'，因此退出状态为 0（不打印任何内容）

> echo $status
0

> contains -i blue $smurf
1

```

A nice thing about lists is that they are passed to commands one element as one argument, so once you’ve set your list, you can just pass it:

​	列表的优点之一是它们以单个元素的形式传递给命令，因此设置好列表后可以直接传递：

```
set -l grep_args -r "my string"
grep $grep_args . # will run the same as `grep -r "my string"` .

```

Unlike other shells, fish does not do “word splitting” - elements in a list stay as they are, even if they contain spaces or tabs.

​	与其他 Shell 不同，Fish 不进行“单词拆分”——列表中的元素保持原样，即使它们包含空格或制表符。

### 参数处理 Argument Handling

An important list is `$argv`, which contains the arguments to a function or script. For example:

​	`$argv` 是一个非常重要的列表变量，它包含了传递给函数或脚本的所有参数。例如：

```
function myfunction
    echo $argv[1]
    echo $argv[3]
end

```

This function takes whatever arguments it gets and prints the first and third:

​	此函数接收传递的参数并打印第一个和第三个参数：

```
> myfunction first second third
first
third

> myfunction apple cucumber banana
apple
banana

```

That covers the positional arguments, but commandline tools often get various options and flags, and $argv would contain them intermingled with the positional arguments. Typical unix argument handling allows short options (`-h`, also grouped like in `ls -lah`), long options (`--help`) and allows those options to take arguments (`--color=auto` or `--position anywhere` or `complete -C"git "`) as well as a `--` separator to signal the end of options. Handling all of these manually is tricky and error-prone.

​	上述例子展示了如何处理位置参数，但命令行工具通常会接收各种选项和标志，而这些内容与位置参数混合在一起。 `$argv` 将包含所有这些参数。通常的 Unix 参数处理方式支持短选项（如 `-h`，也可以组合如 `ls -lah`），长选项（如 `--help`），并且这些选项可能会带有参数（如 `--color=auto` 或 `--position anywhere`）。此外，使用 `--` 分隔符可以表示选项的结束。手动处理这些选项可能既繁琐又容易出错。

A more robust approach to option handling is [argparse](https://fishshell.com/docs/current/cmds/argparse.html), which checks the defined options and puts them into various variables, leaving only the positional arguments in $argv. Here’s a simple example:

​	Fish 提供了一种更健壮的选项处理方法：使用 [argparse](https://fishshell.com/docs/current/cmds/argparse.html) 命令来解析函数的参数。 `argparse` 会检查定义的选项并将它们放入各自的变量中，剩下的位置参数则留在 `$argv` 中。以下是一个简单的示例：

```
function mybetterfunction
    # We tell argparse about -h/--help and -s/--second - these are short and long forms of the same option.
    # The "--" here is mandatory, it tells it from where to read the arguments.
    # 使用 argparse 命令解析 -h/--help 和 -s/--second 选项（这是选项的短形式和长形式）
    # “--” 表示从哪里开始读取参数
    argparse h/help s/second -- $argv
    # exit if argparse failed because it found an option it didn't recognize - it will print an error
    or return
    # 如果 argparse 失败（例如发现未定义的选项），则打印错误信息并退出

    # If -h or --help is given, we print a little help text and return
    # 如果传入了 -h 或 --help 选项，打印帮助文本并退出
    if set -ql _flag_help
        echo "mybetterfunction [-h|--help] [-s|--second] [ARGUMENT ...]"
        return 0
    end

    # If -s or --second is given, we print the second argument,
    # not the first and third.
    # 如果传入了 -s 或 --second 选项，打印第二个参数而不是第一个和第三个
    # (this is also available as _flag_s because of the short version)
    if set -ql _flag_second
        echo $argv[2]
    else
        echo $argv[1]
        echo $argv[3]
    end
end

```

The options will be *removed* from $argv, so $argv[2] is the second *positional* argument now:

​	选项会被 *删除* 出 `$argv`，因此 `$argv[2]` 表示第二个*位置参数*：

```
> mybetterfunction first -s second third
second

```

For more information on argparse, like how to handle option arguments, see [the argparse documentation](https://fishshell.com/docs/current/cmds/argparse.html).

​	有关 `argparse` 的更多信息，如如何处理选项参数，请参阅 [argparse 文档](https://fishshell.com/docs/current/cmds/argparse.html)。



### PATH 变量 PATH variables

Path variables are a special kind of variable used to support colon-delimited path lists including [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH), [`CDPATH`](https://fishshell.com/docs/current/language.html#envvar-CDPATH), `MANPATH`, `PYTHONPATH`, etc. All variables that end in “PATH” (case-sensitive) become PATH variables by default.

​	路径变量（Path Variables）是一种特殊的变量类型，用于支持以冒号分隔的路径列表，例如 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH)、[`CDPATH`](https://fishshell.com/docs/current/language.html#envvar-CDPATH)、`MANPATH` 和 `PYTHONPATH` 等。所有以 “PATH” 结尾的变量（大小写敏感）默认都被视为路径变量。

PATH variables act as normal lists, except they are implicitly joined and split on colons.

​	路径变量的行为与普通列表类似，除了它们会自动在冒号处进行连接和分割。

```
set MYPATH 1 2 3
echo "$MYPATH"
# 1:2:3
set MYPATH "$MYPATH:4:5"
echo $MYPATH
# 1 2 3 4 5
echo "$MYPATH"
# 1:2:3:4:5

```

Path variables will also be exported in the colon form, so `set -x MYPATH 1 2 3` will have external commands see it as `1:2:3`.

​	路径变量导出时会使用冒号分隔，因此 `set -x MYPATH 1 2 3` 时外部命令将看到的变量值为 `1:2:3`。

```
> set -gx MYPATH /bin /usr/bin /sbin
> env | grep MYPATH
MYPATH=/bin:/usr/bin:/sbin

```

This is for compatibility with other tools. Unix doesn’t have variables with multiple elements, the closest thing it has are colon-lists like [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH). For obvious reasons this means no element can contain a `:`.

​	这是为了与其他工具兼容。Unix 不支持多元素变量，最接近的概念就是用冒号分隔的路径列表，例如 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH)。显然，这意味着元素不能包含 `:`。

Variables can be marked or unmarked as PATH variables via the `--path` and `--unpath` options to `set`.

​	可以通过 `set` 命令的 `--path` 和 `--unpath` 选项来标记或取消标记路径变量。



### 特殊变量 Special variables

You can change the settings of fish by changing the values of certain variables.

​	你可以通过更改某些变量的值来更改 fish 的设置。

- PATH: A list of directories in which to search for commands. This is a common unix variable also used by other tools. **PATH**: 一个目录列表，用于搜索命令。这是一个常见的 Unix 变量，其他工具也会使用它。

- CDPATH: A list of directories in which the [cd](https://fishshell.com/docs/current/cmds/cd.html) builtin looks for a new directory. **CDPATH**: 一个目录列表，`[cd](https://fishshell.com/docs/current/cmds/cd.html)` 内建命令会在这些目录中寻找新目录。

- Locale Variables: The locale variables [`LANG`](https://fishshell.com/docs/current/language.html#envvar-LANG), [`LC_ALL`](https://fishshell.com/docs/current/language.html#envvar-LC_ALL), [`LC_COLLATE`](https://fishshell.com/docs/current/language.html#envvar-LC_COLLATE), [`LC_CTYPE`](https://fishshell.com/docs/current/language.html#envvar-LC_CTYPE), [`LC_MESSAGES`](https://fishshell.com/docs/current/language.html#envvar-LC_MESSAGES), [`LC_MONETARY`](https://fishshell.com/docs/current/language.html#envvar-LC_MONETARY), [`LC_NUMERIC`](https://fishshell.com/docs/current/language.html#envvar-LC_NUMERIC), and [`LANG`](https://fishshell.com/docs/current/language.html#envvar-LANG) set the language option for the shell and subprograms. See the section [Locale variables](https://fishshell.com/docs/current/language.html#variables-locale) for more information. **语言区域变量**: 变量如 [`LANG`](https://fishshell.com/docs/current/language.html#envvar-LANG)、[`LC_ALL`](https://fishshell.com/docs/current/language.html#envvar-LC_ALL)、[`LC_COLLATE`](https://fishshell.com/docs/current/language.html#envvar-LC_COLLATE) 等，用于设置 shell 和子程序的语言选项。更多信息请参见[语言区域变量](https://fishshell.com/docs/current/language.html#variables-locale)。

- Color variables: A number of variable starting with the prefixes `fish_color` and `fish_pager_color`. See [Variables for changing highlighting colors](https://fishshell.com/docs/current/interactive.html#variables-color) for more information. **颜色变量**: 变量前缀为 `fish_color` 和 `fish_pager_color`，用于更改高亮颜色。更多信息请参见[改变高亮颜色的变量](https://fishshell.com/docs/current/interactive.html#variables-color)。

- fish_term24bit: If this is set to 1, fish will assume the terminal understands 24-bit RGB color sequences, and won’t translate them to the 256 or 16 color palette. This is often detected automatically. **fish_term24bit**: 如果设置为 1，fish 会假设终端支持 24 位 RGB 颜色，不会将其转换为 256 或 16 色调色板。

- fish_term256: If this is set to 1, fish will assume the terminal understands 256 colors, and won’t translate matching colors down to the 16 color palette. This is usually autodetected. **fish_term256**: 如果设置为 1，fish 会假设终端支持 256 色，不会将匹配的颜色降低到 16 色调色板。

- fish_ambiguous_width: controls the computed width of ambiguous-width characters. This should be set to 1 if your terminal renders these characters as single-width (typical), or 2 if double-width. **fish_ambiguous_width**: 控制双宽字符的显示宽度。如果你的终端将这些字符渲染为单宽字符，请设置为 1；如果是双宽字符，请设置为 2。

- fish_emoji_width: controls whether fish assumes emoji render as 2 cells or 1 cell wide. This is necessary because the correct value changed from 1 to 2 in Unicode 9, and some terminals may not be aware. Set this if you see graphical glitching related to emoji (or other “special” characters). It should usually be auto-detected. **fish_emoji_width**：控制 fish 假设的表情符号渲染宽度为 2 个单元或 1 个单元。这是因为在 Unicode 9 中，正确的值从 1 改为 2，某些终端可能未意识到这一变化。如果你看到与表情符号或其他“特殊”字符相关的图形问题，请设置此项。通常会自动检测。

- fish_autosuggestion_enabled: controls if [Autosuggestions](https://fishshell.com/docs/current/interactive.html#autosuggestions) are enabled. Set it to 0 to disable, anything else to enable. By default they are on. **fish_autosuggestion_enabled**：**fish_autosuggestion_enabled**：控制是否启用[自动建议](https://fishshell.com/docs/current/interactive.html#autosuggestions)。默认开启，设置为 0 可禁用。

- fish_handle_reflow: determines whether fish should try to repaint the commandline when the terminal resizes. In terminals that reflow text this should be disabled. Set it to 1 to enable, anything else to disable. **fish_handle_reflow**：决定 fish 是否在终端大小调整时重新绘制命令行。

- fish_key_bindings: the name of the function that sets up the keyboard shortcuts for the [command-line editor](https://fishshell.com/docs/current/interactive.html#editor). **fish_key_bindings**：设置[命令行编辑器](https://fishshell.com/docs/current/interactive.html#editor)的键盘快捷键函数的名称。

- fish_escape_delay_ms: sets how long fish waits for another key after seeing an escape, to distinguish pressing the escape key from the start of an escape sequence. The default is 30ms. Increasing it increases the latency but allows pressing escape instead of alt for alt+character bindings. For more information, see [the chapter in the bind documentation](https://fishshell.com/docs/current/cmds/bind.html#cmd-bind-escape). **fish_escape_delay_ms**：设置 fish 在检测到 ESC 键后等待的时间，以区分按下 ESC 键和逃逸序列的开始。默认值为 30 毫秒。增加这个值会增加延迟，但允许按下 ESC 键代替 Alt 键用于 Alt+字符绑定。更多信息请参见[绑定文档中的相关章节](https://fishshell.com/docs/current/cmds/bind.html#cmd-bind-escape)。

- fish_sequence_key_delay_ms: sets how long fish waits for another key after seeing a key that is part of a longer sequence, to disambiguate. For instance if you had bound `\cx\ce` to open an editor, fish would wait for this long in milliseconds to see a ctrl-e after a ctrl-x. If the time elapses, it will handle it as a ctrl-x (by default this would copy the current commandline to the clipboard). See also [Key sequences](https://fishshell.com/docs/current/interactive.html#interactive-key-sequences). **fish_sequence_key_delay_ms**：设置 fish 在检测到一部分较长序列的键后等待的时间，用于消歧。例如，如果你绑定了 `\cx\ce` 来打开编辑器，fish 将等待这个时间（毫秒）以检测 ctrl-e。如果超时，它将处理为 ctrl-x（默认情况下，这会将当前命令行复制到剪贴板）。更多信息请参见[按键序列](https://fishshell.com/docs/current/interactive.html#interactive-key-sequences)。

- fish_complete_path: determines where fish looks for completion. When trying to complete for a command, fish looks for files in the directories in this variable. **fish_complete_path**：决定 fish 在何处查找自动补全。

- fish_cursor_selection_mode: controls whether the selection is inclusive or exclusive of the character under the cursor (see [Copy and Paste](https://fishshell.com/docs/current/interactive.html#killring)). **fish_cursor_selection_mode**：控制选择是否包含或排除光标下的字符。更多信息请参见[复制和粘贴](https://fishshell.com/docs/current/interactive.html#killring)。

- fish_function_path: determines where fish looks for functions. When fish [autoloads](https://fishshell.com/docs/current/language.html#syntax-function-autoloading) a function, it will look for files in these directories. **fish_function_path**：决定 fish 在何处查找函数。当 fish [自动加载](https://fishshell.com/docs/current/language.html#syntax-function-autoloading)一个函数时，它会在这些目录中查找文件。

- fish_greeting: the greeting message printed on startup. This is printed by a function of the same name that can be overridden for more complicated changes (see [funced](https://fishshell.com/docs/current/cmds/funced.html)) **fish_greeting**：启动时打印的问候消息。此消息由同名函数打印，可以重写以进行更复杂的更改。更多信息请参见 [funced](https://fishshell.com/docs/current/cmds/funced.html)。

- fish_history: the current history session name. If set, all subsequent commands within an interactive fish session will be logged to a separate file identified by the value of the variable. If unset, the default session name “fish” is used. If set to an empty string, history is not saved to disk (but is still available within the interactive session). **fish_history**：当前历史记录会话的名称。如果设置，则在当前交互式 fish 会话中输入的所有后续命令都将记录到该变量值指定的单独文件中。如果未设置，则使用默认会话名称 “fish”。如果设置为空字符串，历史记录不会保存到磁盘（但在交互式会话中仍然可用）。

- fish_trace: if set and not empty, will cause fish to print commands before they execute, similar to `set -x` in bash. The trace is printed to the path given by the --debug-output option to fish or the [`FISH_DEBUG_OUTPUT`](https://fishshell.com/docs/current/language.html#envvar-FISH_DEBUG_OUTPUT) variable. It goes to stderr by default. **fish_trace**：如果设置且不为空，将导致 fish 在执行命令之前打印它们，类似于 bash 中的 `set -x`。跟踪信息打印到 `--debug-output` 选项指定的路径，或者 `FISH_DEBUG_OUTPUT` 变量指定的路径。默认输出到标准错误（stderr）。

- FISH_DEBUG: Controls which debug categories **fish** enables for output, analogous to the `--debug` option. **FISH_DEBUG**：控制 fish 启用输出的调试类别，类似于 `--debug` 选项。

- FISH_DEBUG_OUTPUT: Specifies a file to direct debug output to. **FISH_DEBUG_OUTPUT**：指定调试输出的文件。

- fish_user_paths: a list of directories that are prepended to [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH). This can be a universal variable. **fish_user_paths**：附加到 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) 的目录列表。可以是一个全局变量。

- umask: the current file creation mask. The preferred way to change the umask variable is through the [umask](https://fishshell.com/docs/current/cmds/umask.html) function. An attempt to set umask to an invalid value will always fail. **umask**：当前文件创建掩码。更改 umask 变量的首选方法是通过 [umask](https://fishshell.com/docs/current/cmds/umask.html) 函数。尝试将 umask 设置为无效值将始终失败。

- BROWSER: your preferred web browser. If this variable is set, fish will use the specified browser instead of the system default browser to display the fish documentation. **BROWSER**：首选的 Web 浏览器。如果设置了此变量，fish 将使用指定的浏览器而不是系统默认浏览器来显示 fish 文档。

Fish also provides additional information through the values of certain environment variables. Most of these variables are read-only and their value can’t be changed with `set`.

​	Fish 还通过某些环境变量提供额外的信息。这些变量大多数是只读的，不能通过 `set` 更改。

- _: the name of the currently running command (though this is deprecated, and the use of `status current-command` is preferred). `_`：当前运行的命令名称（虽然已经弃用，建议使用 `status current-command`）。

- argv: a list of arguments to the shell or function. `argv` is only defined when inside a function call, or if fish was invoked with a list of arguments, like `fish myscript.fish foo bar`. This variable can be changed. **argv**：shell 或函数的参数列表。`argv` 仅在函数调用时定义，或者当 fish 以参数列表调用时（如 `fish myscript.fish foo bar`）。此变量可以更改。

- CMD_DURATION: the runtime of the last command in milliseconds. **CMD_DURATION**：上一个命令的运行时间（毫秒）。

- COLUMNS and LINES: the current size of the terminal in height and width. These values are only used by fish if the operating system does not report the size of the terminal. Both variables must be set in that case otherwise a default of 80x24 will be used. They are updated when the window size changes. **COLUMNS 和 LINES**：终端的当前宽度和高度。这些值仅在操作系统不报告终端大小时由 fish 使用。如果未设置，则默认使用 80x24。在窗口大小更改时会自动更新。

- fish_kill_signal: the signal that terminated the last foreground job, or 0 if the job exited normally. **fish_kill_signal**：终止上一个前台作业的信号，或者如果作业正常退出，则为 0。

- fish_killring: a list of entries in fish’s [kill ring](https://fishshell.com/docs/current/interactive.html#killring) of cut text. **fish_killring**：fish 的[剪切环](https://fishshell.com/docs/current/interactive.html#killring)中包含的剪切文本条目列表。

- fish_read_limit: how many bytes fish will process with [read](https://fishshell.com/docs/current/cmds/read.html) or in a [command substitution](https://fishshell.com/docs/current/language.html#expand-command-substitution). **fish_read_limit**：fish 在 [read](https://fishshell.com/docs/current/cmds/read.html) 或[命令替换](https://fishshell.com/docs/current/language.html#expand-command-substitution)中处理的字节数。

- fish_pid: the process ID (PID) of the shell. **fish_pid**：shell 的进程 ID（PID）。

- history: a list containing the last commands that were entered. **history**：最近输入的命令列表。

- HOME: the user’s home directory. This variable can be changed. **HOME**：用户的主目录。此变量可以更改。

- hostname: the machine’s hostname. **hostname**：机器的主机名。

- IFS: the internal field separator that is used for word splitting with the [read](https://fishshell.com/docs/current/cmds/read.html) builtin. Setting this to the empty string will also disable line splitting in [command substitution](https://fishshell.com/docs/current/language.html#expand-command-substitution). This variable can be changed. **IFS**：用于与 [read](https://fishshell.com/docs/current/cmds/read.html) 内置命令一起进行单词拆分的内部字段分隔符。将此值设置为空字符串也会禁用[命令替换](https://fishshell.com/docs/current/language.html#expand-command-substitution)中的行拆分。此变量可以更改。

- last_pid: the process ID (PID) of the last background process. **last_pid**：最后一个后台进程的进程 ID（PID）。

- PWD: the current working directory. **PWD**：当前工作目录。

- pipestatus: a list of exit statuses of all processes that made up the last executed pipe. See [exit status](https://fishshell.com/docs/current/language.html#variables-status). **pipestatus**：上一个执行管道中所有进程的退出状态列表。更多信息请参见[退出状态](https://fishshell.com/docs/current/language.html#variables-status)。

- SHLVL: the level of nesting of shells. Fish increments this in interactive shells, otherwise it simply passes it along. **SHLVL**：shell 嵌套的层级。Fish 在交互式 shell 中增加此值，否则它只会传递下去。

- status: the [exit status](https://fishshell.com/docs/current/language.html#variables-status) of the last foreground job to exit. If the job was terminated through a signal, the exit status will be 128 plus the signal number. **status**：上一个前台作业的[退出状态](https://fishshell.com/docs/current/language.html#variables-status)。如果作业通过信号终止，退出状态将为 128 加上信号编号。

- status_generation: the “generation” count of `$status`. This will be incremented only when the previous command produced an explicit status. (For example, background jobs will not increment this). **status_generation**：`$status` 的“代”计数。只有当上一个命令产生明确的状态时才会递增。（例如，后台作业不会递增此值）。

- TERM: the type of the current terminal. When fish tries to determine how the terminal works - how many colors it supports, what sequences it sends for keys and other things - it looks at this variable and the corresponding information in the terminfo database (see `man terminfo`).Note: Typically this should not be changed as the terminal sets it to the correct value. **TERM**：当前终端的类型。Fish 通过此变量以及 terminfo 数据库中的相关信息确定终端的工作方式（如支持多少种颜色、发送的按键序列等）。注意：通常不应更改此变量，因为终端会自动设置为正确的值。

- USER: the current username. This variable can be changed. **USER**：当前用户名。此变量可以更改。

- EUID: the current effective user id, set by fish at startup. This variable can be changed. **EUID**：当前的有效用户 ID，fish 启动时设置。此变量可以更改。

- version: the version of the currently running fish (also available as `FISH_VERSION` for backward compatibility). **version**：当前运行的 fish 版本（为了向后兼容，也可以通过 `FISH_VERSION` 获取）。

As a convention, an uppercase name is usually used for exported variables, while lowercase variables are not exported. (`CMD_DURATION` is an exception for historical reasons). This rule is not enforced by fish, but it is good coding practice to use casing to distinguish between exported and unexported variables.

​	通常，导出的变量使用大写名称，而不导出的变量使用小写名称。（`CMD_DURATION` 因历史原因是个例外）。Fish 不强制执行此规则，但建议遵循此惯例，以使用大小写区分导出和未导出的变量。

Fish also uses some variables internally, their name usually starting with `__fish`. These are internal and should not typically be modified directly.

​	Fish 还使用一些内部变量，通常以 `__fish` 开头。通常不应直接修改这些内部变量。



### 状态变量 The status variable

Whenever a process exits, an exit status is returned to the program that started it (usually the shell). This exit status is an integer number, which tells the calling application how the execution of the command went. In general, a zero exit status means that the command executed without problem, but a non-zero exit status means there was some form of problem.

​	每当一个进程退出时，会返回一个退出状态（exit status）给启动它的程序（通常是 shell）。这个退出状态是一个整数，用来告诉调用程序命令的执行情况。通常，0 表示命令成功执行，而非零值表示发生了某种错误。

Fish stores the exit status of the last process in the last job to exit in the `status` variable.

​	Fish 会将最后退出的作业中的最后一个进程的退出状态保存在 `status` 变量中。

If fish encounters a problem while executing a command, the status variable may also be set to a specific value:

​	如果 Fish 在执行命令时遇到问题，`status` 变量也可能会被设置为特定的值：

- 0 is generally the exit status of commands if they successfully performed the requested operation. **0**：通常表示命令成功完成所请求的操作。

- 1 is generally the exit status of commands if they failed to perform the requested operation. **1**：通常表示命令未能完成所请求的操作。
- 121 is generally the exit status of commands if they were supplied with invalid arguments. **121**：通常表示命令由于提供了无效的参数而失败。
- 123 means that the command was not executed because the command name contained invalid characters. **123**：表示命令名称中包含无效字符，命令未执行。
- 124 means that the command was not executed because none of the wildcards in the command produced any matches. **124**：表示命令未执行，因为命令中的通配符没有产生任何匹配项。
- 125 means that while an executable with the specified name was located, the operating system could not actually execute the command. **125**：表示虽然找到了具有指定名称的可执行文件，但操作系统无法执行该命令。
- 126 means that while a file with the specified name was located, it was not executable. **126**：表示虽然找到了具有指定名称的文件，但它不可执行。
- 127 means that no function, builtin or command with the given name could be located. **127**：表示找不到具有给定名称的函数、内置命令或外部命令。

If a process exits through a signal, the exit status will be 128 plus the number of the signal.

​	如果一个进程因信号而退出，退出状态会是 128 加上信号编号。

The status can be negated with [not](https://fishshell.com/docs/current/cmds/not.html) (or `!`), which is useful in a [condition](https://fishshell.com/docs/current/language.html#syntax-conditional). This turns a status of 0 into 1 and any non-zero status into 0.

​	可以使用 [not](https://fishshell.com/docs/current/cmds/not.html)（或 `!`）对状态进行取反，这在条件语句中非常有用。取反会将 0 转为 1，任何非零状态转换为 0。

There is also `$pipestatus`, which is a list of all `status` values of processes in a pipe. One difference is that [not](https://fishshell.com/docs/current/cmds/not.html) applies to `$status`, but not `$pipestatus`, because it loses information.

​	Fish 还提供了 `$pipestatus` 变量，它是一个列表，包含管道中的所有进程的 `status` 值。与 `$status` 不同的是，`not` 对 `$pipestatus` 无效，因为它会丢失信息。

For example:

​	示例：

```
not cat file | grep -q fish
echo status is: $status pipestatus is $pipestatus

```

Here `$status` reflects the status of `grep`, which returns 0 if it found something, negated with `not` (so 1 if it found something, 0 otherwise). `$pipestatus` reflects the status of `cat` (which returns non-zero for example when it couldn’t find the file) and `grep`, without the negation.

​	这里的 `$status` 反映了 `grep` 的状态，如果找到匹配项则返回 0，通过 `not` 取反（因此如果找到则为 1，否则为 0）。`$pipestatus` 反映了 `cat` 和 `grep` 的状态（例如，当找不到文件时，`cat` 返回非零值），但没有取反。

So if both `cat` and `grep` succeeded, `$status` would be 1 because of the `not`, and `$pipestatus` would be 0 and 0.

​	因此，如果 `cat` 和 `grep` 都成功执行，`$status` 会因为 `not` 而为 1，而 `$pipestatus` 将会是两个 0。

It’s possible for the first command to fail while the second succeeds. One common example is when the second program quits early.

​	第一个命令可能失败，而第二个命令成功。一个常见的例子是，当第二个程序提前退出时。

For example, if you have a pipeline like:

​	例如，如果你有这样一个管道：

```
cat file1 file2 | head -n 50

```

This will tell `cat` to print two files, “file1” and “file2”, one after the other, and the `head` will then only print the first 50 lines. In this case you might often see this constellation:

​	这会让 `cat` 顺序打印文件 “file1” 和 “file2”，然后 `head` 只会打印前 50 行。在这种情况下，你可能会看到以下的情况：

```
> cat file1 file2 | head -n 50
# 50 lines of output
> echo $pipestatus
141 0

```

Here, the “141” signifies that `cat` was killed by signal number 13 (128 + 13 == 141) - a `SIGPIPE`. You can also use [`fish_kill_signal`](https://fishshell.com/docs/current/language.html#envvar-fish_kill_signal) to see the signal number. This happens because it was still working, and then `head` closed the pipe, so `cat` received a signal that it didn’t ignore and so it died.

​	这里的 “141” 表示 `cat` 因信号编号 13 被终止（128 + 13 == 141）——这是一个 `SIGPIPE`。你也可以使用 [`fish_kill_signal`](https://fishshell.com/docs/current/language.html#envvar-fish_kill_signal) 查看信号编号。这发生在 `cat` 还在工作，而 `head` 关闭了管道，导致 `cat` 收到了信号并终止。

Whether `cat` here will see a SIGPIPE depends on how long the file is and how much it writes at once, so you might see a pipestatus of “0 0”, depending on the implementation. This is a general unix issue and not specific to fish. Some shells feature a “pipefail” feature that will call a pipeline failed if one of the processes in it failed, and this is a big problem with it.

​	`cat` 是否会接收到 SIGPIPE 取决于文件的长度以及它一次写入了多少内容，因此你可能会看到 `$pipestatus` 为 “0 0”，具体取决于实现。这是一个通用的 Unix 问题，不特定于 fish。某些 shell 具有 "pipefail" 功能，当管道中的某个进程失败时，整个管道会被认为失败，但这可能带来问题。

### 本地变量 Locale Variables

The “locale” of a program is its set of language and regional settings that depend on language and cultural convention. In UNIX, these are made up of several categories. The categories are:

- LANG

  This is the typical environment variable for specifying a locale. A user may set this variable to express the language they speak, their region, and a character encoding. The actual values are specific to their platform, except for special values like `C` or `POSIX`.The value of LANG is used for each category unless the variable for that category was set or LC_ALL is set. So typically you only need to set LANG.An example value might be `en_US.UTF-8` for the american version of english and the UTF-8 encoding, or `de_AT.UTF-8` for the austrian version of german and the UTF-8 encoding. Your operating system might have a `locale` command that you can call as `locale -a` to see a list of defined locales.A UTF-8 encoding is recommended.

  这是用于指定 locale 的典型环境变量。用户可以设置此变量来表达他们所说的语言、所属地区以及字符编码。具体的值因平台而异，除了像 `C` 或 `POSIX` 这样的特殊值。`LANG` 的值用于每个类别，除非为该类别设置了专门的变量或设置了 `LC_ALL`。因此，通常只需设置 `LANG`。一个示例值可能是 `en_US.UTF-8`，代表美式英语和 UTF-8 编码，或者 `de_AT.UTF-8`，代表奥地利德语和 UTF-8 编码。你的操作系统可能有一个 `locale` 命令，可以通过 `locale -a` 来查看已定义的 locales 列表。推荐使用 UTF-8 编码。

- LC_ALL

  Overrides the [`LANG`](https://fishshell.com/docs/current/language.html#envvar-LANG) environment variable and the values of the other `LC_*` variables. If this is set, none of the other variables are used for anything.Usually the other variables should be used instead. Use LC_ALL only when you need to override something.

  覆盖 [`LANG`](https://fishshell.com/docs/current/language.html#envvar-LANG) 环境变量以及其他 `LC_*` 变量的值。如果设置了 `LC_ALL`，其他变量将不再被使用。通常应使用其他变量，只有在需要完全覆盖时才使用 `LC_ALL`。

- LC_COLLATE

  This determines the rules about equivalence of cases and alphabetical ordering: collation.

  该变量决定了大小写的等效性和字母排序规则：排序规则。

- LC_CTYPE

  This determines classification rules, like if the type of character is an alpha, digit, and so on. Most importantly, it defines the text *encoding* - which numbers map to which characters. On modern systems, this should typically be something ending in “UTF-8”.

  决定字符分类规则，如字符类型是字母、数字等。最重要的是，它定义了文本的*编码*——即哪些数字映射到哪些字符。在现代系统上，这通常应该是以 “UTF-8” 结尾的编码。

- LC_MESSAGES

  `LC_MESSAGES` determines the language in which messages are diisplayed.

  `LC_MESSAGES` 决定消息显示的语言。

- LC_MONETARY

  Determines currency, how it is formated, and the symbols used.

  决定货币格式及其使用的符号。

- LC_NUMERIC

  Sets the locale for formatting numbers.

  设置格式化数字的 locale。

- LC_TIME

  Sets the locale for formatting dates and times.
  
  设置格式化日期和时间的 locale。



## 内置命令 Builtin commands

Fish includes a number of commands in the shell directly. We call these “builtins”. These include:

​	Fish 提供了一些内置命令，这些命令在 Shell 中直接实现，称为“内置命令”。包括以下几类：

- Builtins that manipulate the shell state - [cd](https://fishshell.com/docs/current/cmds/cd.html) changes directory, [set](https://fishshell.com/docs/current/cmds/set.html) sets variables **操作 Shell 状态的内置命令**：如 [cd](https://fishshell.com/docs/current/cmds/cd.html)（更改目录）、[set](https://fishshell.com/docs/current/cmds/set.html)（设置变量）。

- Builtins for dealing with data, like [string](https://fishshell.com/docs/current/cmds/string.html) for strings and [math](https://fishshell.com/docs/current/cmds/math.html) for numbers, [count](https://fishshell.com/docs/current/cmds/count.html) for counting lines or arguments, [path](https://fishshell.com/docs/current/cmds/path.html) for dealing with path **处理数据的内置命令**：如 [string](https://fishshell.com/docs/current/cmds/string.html)（处理字符串）、[math](https://fishshell.com/docs/current/cmds/math.html)（处理数字）、[count](https://fishshell.com/docs/current/cmds/count.html)（计数行或参数）、[path](https://fishshell.com/docs/current/cmds/path.html)（处理路径）。
- [status](https://fishshell.com/docs/current/cmds/status.html) for asking about the shell’s status **查询 Shell 状态的命令**：[status](https://fishshell.com/docs/current/cmds/status.html) 用于查询 Shell 的状态。
- [printf](https://fishshell.com/docs/current/cmds/printf.html) and [echo](https://fishshell.com/docs/current/cmds/echo.html) for creating output **生成输出的命令**：[printf](https://fishshell.com/docs/current/cmds/printf.html) 和 [echo](https://fishshell.com/docs/current/cmds/echo.html) 用于生成输出。
- [test](https://fishshell.com/docs/current/cmds/test.html) for checking conditions **检查条件的命令**：[test](https://fishshell.com/docs/current/cmds/test.html) 用于检查条件。
- [argparse](https://fishshell.com/docs/current/cmds/argparse.html) for parsing function arguments **解析函数参数的命令**：[argparse](https://fishshell.com/docs/current/cmds/argparse.html)。
- [source](https://fishshell.com/docs/current/cmds/source.html) to read a script in the current shell (so changes to variables stay) and [eval](https://fishshell.com/docs/current/cmds/eval.html) to execute a string as script **读取脚本并在当前 Shell 中执行的命令**：[source](https://fishshell.com/docs/current/cmds/source.html)（使变量更改保持有效）以及 [eval](https://fishshell.com/docs/current/cmds/eval.html)（将字符串作为脚本执行）。
- [random](https://fishshell.com/docs/current/cmds/random.html) to get random numbers or pick a random element from a list **生成随机数的命令**：[random](https://fishshell.com/docs/current/cmds/random.html) 用于生成随机数或从列表中随机选择一个元素。
- [read](https://fishshell.com/docs/current/cmds/read.html) for reading from a pipe or the terminal **读取管道或终端的命令**：[read](https://fishshell.com/docs/current/cmds/read.html)。

For a list of all builtins, use `builtin -n`.

​	可以使用 `builtin -n` 查看所有内置命令的列表。

For a list of all builtins, functions and commands shipped with fish, see the [list of commands](https://fishshell.com/docs/current/commands.html#commands). The documentation is also available by using the `--help` switch.

​	要查看 Fish 中所有内置命令、函数和可执行命令的完整列表，请访问 [命令列表](https://fishshell.com/docs/current/commands.html#commands)。还可以通过命令的 `--help` 参数查看文档。



## 命令查找 Command lookup

When fish is told to run something, it goes through multiple steps to find it.

​	当 Fish 被要求运行某个命令时，它会经历多个步骤来查找该命令。

If it contains a `/`, fish tries to execute the given file, from the current directory on.

​	如果命令包含 `/`，Fish 会尝试执行该路径指定的文件，从当前目录开始查找。

If it doesn’t contain a `/`, it could be a function, builtin, or external command, and so fish goes through the full lookup.

​	如果命令不包含 `/`，Fish 会依次尝试解析为函数、内置命令或外部命令。具体步骤如下：

In order:

1. It tries to resolve it as a [function](https://fishshell.com/docs/current/language.html#syntax-function). 尝试解析为[函数](https://fishshell.com/docs/current/language.html#syntax-function)：
   - If the function is already known, it uses that 如果函数已经定义，则使用该函数。
   - If there is a file of the name with a “.fish” suffix in [`fish_function_path`](https://fishshell.com/docs/current/language.html#envvar-fish_function_path), it [loads that](https://fishshell.com/docs/current/language.html#syntax-function-autoloading). (If there is more than one file only the first is used) 如果在 [`fish_function_path`](https://fishshell.com/docs/current/language.html#envvar-fish_function_path) 中存在与函数同名的 `.fish` 文件，则加载该文件（如果有多个同名文件，只使用第一个）。
   - If the function is now defined it uses that 如果函数现在已经定义，则使用该函数。
2. It tries to resolve it as a [builtin](https://fishshell.com/docs/current/language.html#builtin-overview). 尝试解析为[内置命令](https://fishshell.com/docs/current/language.html#builtin-overview)。
3. It tries to find an executable file in [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH). 尝试在 [`PATH`](https://fishshell.com/docs/current/language.html#envvar-PATH) 中查找可执行文件：
   - If it finds a file, it tells the kernel to run it. 如果找到文件，Fish 会告诉内核运行它。
   - If the kernel knows how to run the file (e.g. via a `#!` line - `#!/bin/sh` or `#!/usr/bin/python`), it does it. 如果文件包含解释器声明（例如 `#!/bin/sh` 或 `#!/usr/bin/python`），内核会使用该解释器运行文件。
   - If the kernel reports that it couldn’t run it because of a missing interpreter, and the file passes a rudimentary check, fish tells `/bin/sh` to run it. 如果内核报告无法运行文件（例如缺少解释器），并且该文件通过了基本检查，Fish 会告诉 `/bin/sh` 来运行它。

If none of these work, fish runs the function [fish_command_not_found](https://fishshell.com/docs/current/cmds/fish_command_not_found.html) and sets [`status`](https://fishshell.com/docs/current/language.html#envvar-status) to 127.

​	如果以上步骤都失败，Fish 会运行 [fish_command_not_found](https://fishshell.com/docs/current/cmds/fish_command_not_found.html) 并将 [`status`](https://fishshell.com/docs/current/language.html#envvar-status) 设置为 127。

You can use [type](https://fishshell.com/docs/current/cmds/type.html) to see how fish resolved something:

​	你可以使用 [type](https://fishshell.com/docs/current/cmds/type.html) 命令查看 Fish 是如何解析命令的：

```
> type --short --all echo
echo is a builtin
echo is /usr/bin/echo

```



## 查询用户输入 Querying for user input

Sometimes, you want to ask the user for input, for instance to confirm something. This can be done with the [read](https://fishshell.com/docs/current/cmds/read.html) builtin.

​	有时候，你需要向用户请求输入，以确认某些操作。可以使用 [read](https://fishshell.com/docs/current/cmds/read.html) 内置命令来实现。

Let’s make up an example. This function will [glob](https://fishshell.com/docs/current/language.html#expand-wildcard) the files in all the directories it gets as [arguments](https://fishshell.com/docs/current/language.html#variables-argv), and [if](https://fishshell.com/docs/current/language.html#syntax-conditional) there are [more than five](https://fishshell.com/docs/current/cmds/test.html) it will ask the user if it is supposed to show them, but only if it is connected to a terminal:

​	下面是一个示例函数。该函数会[匹配](https://fishshell.com/docs/current/language.html#expand-wildcard)所有目录中的文件，如果文件数量超过 5 个，它会提示用户是否显示这些文件，并且只有在连接到终端时才会提示用户：

```
function show_files
    # This will glob on all arguments. Any non-directories will be ignored.
    # 对所有传入的目录进行匹配，忽略非目录项
    set -l files $argv/*

    # If there are more than 5 files
    # 如果文件数量超过 5 个
    if test (count $files) -gt 5
        # and both stdin (for reading input) and stdout (for writing the prompt)
        # are terminals
        # 并且 stdin（用于读取输入）和 stdout（用于写入提示信息）都是终端
        and isatty stdin
        and isatty stdout
        # Keep asking until we get a valid response
        # 循环询问用户直到得到有效响应
        while read --nchars 1 -l response --prompt-str="Are you sure? (y/n)"
              or return 1 # if the read was aborted with ctrl-c/ctrl-d 如果用户按下 ctrl-c/ctrl-d 终止读取，则退出
            switch $response
                case y Y
                    echo Okay
                    # We break out of the while and go on with the function
                    # 跳出 while 循环，继续执行函数
                    break
                case n N
                    # We return from the function without printing
                    # 不打印文件并退出
                    echo Not showing
                    return 1
                case '*'
                    # We go through the while loop and ask again
                    # 提示无效输入，继续循环
                    echo Not valid input
                    continue
            end
        end
    end

    # And now we print the files
    printf '%s\n' $files
end

```

If you run this as `show_files /`, it will most likely ask you until you press Y/y or N/n. If you run this as `show_files / | cat`, it will print the files without asking. If you run this as `show_files .`, it might just print something without asking because there are fewer than five files.

​	如果你以 `show_files /` 的方式运行它，它可能会多次提示你，直到你按 Y/y 或 N/n 为止。如果你以 `show_files / | cat` 方式运行，它会直接打印文件列表而不询问用户。如果你以 `show_files .` 方式运行，可能因为文件数量少于 5 个而不提示询问。



## Shell 变量和函数命名 Shell variable and function names

The names given to variables and functions (so-called “identifiers”) have to follow certain rules:

​	在 Fish 中，为变量和函数命名（即“标识符”）需要遵循一定的规则：

- A variable name cannot be empty. It can contain only letters, digits, and underscores. It may begin and end with any of those characters.
- **变量名称**：变量名称不能为空，并且只能包含字母、数字和下划线。变量名称可以以这些字符中的任何一个开始和结束。

- A function name cannot be empty. It may not begin with a hyphen (“-”) and may not contain a slash (“/”). All other characters, including a space, are valid. A function name also can’t be the same as a reserved keyword or essential builtin like `if` or `set`.
- **函数名称**：函数名称不能为空，不能以连字符（“-”）开头，也不能包含斜杠（“/”）。函数名称可以包含其他字符（包括空格）。此外，函数名称不能与保留关键字或重要的内置命令（如 `if` 或 `set`）冲突。
- A bind mode name (e.g., `bind -m abc ...`) must be a valid variable name.
- **绑定模式名称**：例如在 `bind -m abc ...` 中的模式名称，必须是一个有效的变量名称。

Other things have other restrictions. For instance what is allowed for file names depends on your system, but at the very least they cannot contain a “/” (because that is the path separator) or NULL byte (because that is how UNIX ends strings).

​	其他对象可能有不同的限制。例如，文件名的限制取决于你的系统，但至少不能包含“/”（因为它是路径分隔符）或 NULL 字节（因为 UNIX 使用 NULL 字节来结束字符串）。



## 配置文件 Configuration files

When fish is started, it reads and runs its configuration files. Where these are depends on build configuration and environment variables.

​	当 fish 启动时，它会读取并运行其配置文件。这些文件的位置取决于构建配置和环境变量。

The main file is `~/.config/fish/config.fish` (or more precisely `$XDG_CONFIG_HOME/fish/config.fish`).

​	主要的文件是 `~/.config/fish/config.fish`（或更准确地说是 `$XDG_CONFIG_HOME/fish/config.fish`）。

Configuration files are run in the following order:

​	配置文件按以下顺序运行：

- Configuration snippets (named `*.fish`) in the directories: 配置片段（命名为 `*.fish`）位于以下目录中：

  - `$__fish_config_dir/conf.d` (by default, `~/.config/fish/conf.d/`)

  - `$__fish_sysconf_dir/conf.d` (by default, `/etc/fish/conf.d/`)

  - Directories for others to ship configuration snippets for their software: 其他人用于为其软件提供配置片段的目录：

    - the directories under `$__fish_user_data_dir` (usually `~/.local/share/fish`, controlled by the `XDG_DATA_HOME` environment variable) `$__fish_user_data_dir` 下的目录（通常是 `~/.local/share/fish`，由 `XDG_DATA_HOME` 环境变量控制）
    - a `fish/vendor_conf.d` directory in the directories listed in `$XDG_DATA_DIRS` (default `/usr/share/fish/vendor_conf.d` and `/usr/local/share/fish/vendor_conf.d`) `$XDG_DATA_DIRS` 列出的目录中的 `fish/vendor_conf.d` 目录（默认是 `/usr/share/fish/vendor_conf.d` 和 `/usr/local/share/fish/vendor_conf.d`）

    These directories are also accessible in `$__fish_vendor_confdirs`. Note that changing that in a running fish won’t do anything as by that point the directories have already been read.
    
    这些目录也可以通过 `$__fish_vendor_confdirs` 访问。请注意，在运行中的 fish 中更改这些目录不会产生任何效果，因为到那时这些目录已经被读取。

  If there are multiple files with the same name in these directories, only the first will be executed. They are executed in order of their filename, sorted (like globs) in a natural order (i.e. “01” sorts before “2”).

  如果这些目录中有多个同名文件，则只有第一个文件会被执行。它们按照文件名的自然顺序执行（如通配符排序，“01” 排在 “2” 之前）。

- System-wide configuration files, where administrators can include initialization for all users on the system - similar to `/etc/profile` for POSIX-style shells - in `$__fish_sysconf_dir` (usually `/etc/fish/config.fish`). 系统范围的配置文件，管理员可以在 `$__fish_sysconf_dir`（通常是 `/etc/fish/config.fish`）中为系统上所有用户包含初始化配置，类似于 POSIX 风格 shell 的 `/etc/profile`。

- User configuration, usually in `~/.config/fish/config.fish` (controlled by the `XDG_CONFIG_HOME` environment variable, and accessible as `$__fish_config_dir`). 用户配置，通常在 `~/.config/fish/config.fish`（由 `XDG_CONFIG_HOME` 环境变量控制，并可以通过 `$__fish_config_dir` 访问）。

`~/.config/fish/config.fish` is sourced *after* the snippets. This is so you can copy snippets and override some of their behavior.

​	`~/.config/fish/config.fish` 在片段之后被加载。这样你可以复制片段并覆盖其中的一些行为。

These files are all executed on the startup of every shell. If you want to run a command only on starting an interactive shell, use the exit status of the command `status --is-interactive` to determine if the shell is interactive. If you want to run a command only when using a login shell, use `status --is-login` instead. This will speed up the starting of non-interactive or non-login shells.

​	这些文件会在每次启动 shell 时执行。如果你只想在交互式 shell 启动时运行命令，可以使用 `status --is-interactive` 的退出状态来判断 shell 是否为交互式。如果你只想在登录 shell 中运行命令，可以使用 `status --is-login`。这将加快非交互式或非登录 shell 的启动速度。

If you are developing another program, you may want to add configuration for all users of fish on a system. This is discouraged; if not carefully written, they may have side-effects or slow the startup of the shell. Additionally, users of other shells won’t benefit from the fish-specific configuration. However, if they are required, you can install them to the “vendor” configuration directory. As this path may vary from system to system, `pkg-config` should be used to discover it: `pkg-config --variable confdir fish`.

​	如果你正在开发另一个程序，可能想为系统上所有的 fish 用户添加配置。一般不建议这样做，因为如果写得不够仔细，可能会产生副作用或减慢 shell 的启动速度。此外，其他 shell 的用户不会受益于这些 fish 特有的配置。然而，如果这些配置是必须的，你可以将它们安装到“vendor”配置目录中。由于此路径可能因系统而异，应使用 `pkg-config` 来发现它：`pkg-config --variable confdir fish`。

For system integration, fish also ships a file called `__fish_build_paths.fish`. This can be customized during build, for instance because your system requires special paths to be used.

​	为了系统集成，fish 还提供了一个名为 `__fish_build_paths.fish` 的文件。此文件可以在构建过程中进行自定义，例如因为你的系统需要使用特殊路径。



## 未来功能标志 Future feature flags

Feature flags are how fish stages changes that might break scripts. Breaking changes are introduced as opt-in, in a few releases they become opt-out, and eventually the old behavior is removed.

​	功能标志是 fish 在引入可能破坏脚本的更改时所采用的阶段性方式。破坏性更改首先作为可选功能引入，在几个版本后变为默认启用，最终旧行为会被移除。

You can see the current list of features via `status features`:

​	你可以通过 `status features` 查看当前的功能列表：

```
> status features
stderr-nocaret          on  3.0 ^ no longer redirects stderr 不再重定向 stderr
qmark-noglob            off 3.0 ? no longer globs 不再作为通配符
regex-easyesc           on  3.1 string replace -r needs fewer \\'s 需要更少的反斜杠
ampersand-nobg-in-token on  3.4 & only backgrounds if followed by a separating character 仅在后跟分隔符时才作为后台操作符

```

Here is what they mean:

​	以下是它们的含义：

- `stderr-nocaret` was introduced in fish 3.0 (and made the default in 3.3). It makes `^` an ordinary character instead of denoting an stderr redirection, to make dealing with quoting and such easier. Use `2>` instead. This can no longer be turned off since fish 3.5. The flag can still be tested for compatibility, but a `no-stderr-nocaret` value will simply be ignored. `stderr-nocaret` 是在 fish 3.0 中引入的（在 3.3 版本中成为默认）。它将 `^` 变为普通字符，而不是表示 stderr 重定向，以简化引号处理等操作。现在应使用 `2>`。从 fish 3.5 起，该标志已无法关闭。该标志仍可用于兼容性测试，但 `no-stderr-nocaret` 值将被忽略。
- `qmark-noglob` was also introduced in fish 3.0. It makes `?` an ordinary character instead of a single-character glob. Use a `*` instead (which will match multiple characters) or find other ways to match files like `find`. `qmark-noglob` 也在 fish 3.0 中引入。它将 `?` 变为普通字符，而不再是单字符通配符。应使用 `*` 来匹配多个字符，或使用其他方法（如 `find`）来匹配文件。
- `regex-easyesc` was introduced in 3.1. It makes it so the replacement expression in `string replace -r` does one fewer round of escaping. Before, to escape a backslash you would have to use `string replace -ra '([ab])' '\\\\\\\\$1'`. After, just `'\\\\$1'` is enough. Check your `string replace` calls if you use this anywhere. `regex-easyesc` 在 3.1 中引入。它使得 `string replace -r` 的替换表达式需要更少的转义。例如，以前要转义反斜杠，你需要使用 `string replace -ra '([ab])' '\\\\\\\\$1'`，而现在只需 `'\\\\$1'` 即可。如果你在代码中使用此功能，请检查你的 `string replace` 调用。
- `ampersand-nobg-in-token` was introduced in fish 3.4. It makes it so a `&` i no longer interpreted as the backgrounding operator in the middle of a token, so dealing with URLs becomes easier. Either put spaces or a semicolon after the `&`. This is recommended formatting anyway, and `fish_indent` will have done it for you already. `ampersand-nobg-in-token` 是在 fish 3.4 中引入的。它使得 `&` 不再在 token 中间解释为后台操作符，这样处理 URL 更加容易。可以在 `&` 后加空格或分号。这也是推荐的格式，`fish_indent` 已经为你处理了。

These changes are introduced off by default. They can be enabled on a per session basis:

​	这些更改默认是关闭的，可以按会话启用：

```
> fish --features qmark-noglob,regex-easyesc

```

or opted into globally for a user:

​	或者为用户全局启用：

```
> set -U fish_features regex-easyesc qmark-noglob

```

Features will only be set on startup, so this variable will only take effect if it is universal or exported.

​	功能标志仅在启动时设置，因此这个变量只有在它是全局变量或导出变量时才会生效。

You can also use the version as a group, so `3.0` is equivalent to “stderr-nocaret” and “qmark-noglob”. Instead of a version, the special group `all` enables all features.

​	你还可以使用版本号作为一组功能标志的快捷方式，例如 `3.0` 等同于启用 “stderr-nocaret” 和 “qmark-noglob”。使用特殊组 `all` 可以启用所有功能。

Prefixing a feature with `no-` turns it off instead. E.g. to reenable the `?` single-character glob:

​	在功能名前加 `no-` 可以关闭相应功能。例如，要重新启用 `?` 作为单字符通配符：

```
set -Ua fish_features no-qmark-noglob

```

Currently, the following features are enabled by default:

​	当前，以下功能默认启用：

- stderr-nocaret - `^` no longer redirects stderr, use `2>`. Enabled by default in fish 3.3.0. No longer changeable since fish 3.5.0.
- **stderr-nocaret** - `^` 不再重定向 stderr，请使用 `2>`。在 fish 3.3.0 中默认启用。从 fish 3.5.0 起不可更改。

- regex-easyesc - `string replace -r` requires fewer backslashes in the replacement part. Enabled by default in fish 3.5.0.
- **regex-easyesc** - `string replace -r` 的替换部分需要更少的反斜杠。在 fish 3.5.0 中默认启用。
- ampersand-nobg-in-token - `&` in the middle of a word is a normal character instead of backgrounding. Enabled by default in fish 3.5.0.
- **ampersand-nobg-in-token** - `&` 在单词中间是普通字符，而不是后台操作符。在 fish 3.5.0 中默认启用。



### 事件处理器 Event handlers

When defining a new function in fish, it is possible to make it into an event handler, i.e. a function that is automatically run when a specific event takes place. Events that can trigger a handler currently are:

​	在 Fish 中定义一个新函数时，可以将其设为事件处理器，即在特定事件发生时自动运行的函数。目前可以触发处理器的事件包括：

- When a signal is delivered 信号（signal）被传递

- When a job exits 作业（job）退出
- When the value of a variable is updated 变量的值被更新
- When the prompt is about to be shown 提示符即将显示

Example:

​	示例：

To specify a signal handler for the WINCH signal, write:

​	要为 WINCH 信号指定一个信号处理器，可以编写如下代码：

```
function my_signal_handler --on-signal WINCH
    echo Got WINCH signal!
end

```

Fish already has the following named events for the `--on-event` switch:

​	Fish 还为 `--on-event` 开关提供了一些预定义的事件名称：

- `fish_prompt` is emitted whenever a new fish prompt is about to be displayed. `fish_prompt`：在每次显示新的 Fish 提示符时发出。

- `fish_preexec` is emitted right before executing an interactive command. The commandline is passed as the first parameter. Not emitted if command is empty. `fish_preexec`：在执行交互式命令之前发出，命令行作为第一个参数传递。如果命令为空，则不触发。
- `fish_posterror` is emitted right after executing a command with syntax errors. The commandline is passed as the first parameter. `fish_posterror`：在执行包含语法错误的命令后发出，命令行作为第一个参数传递。
- `fish_postexec` is emitted right after executing an interactive command. The commandline is passed as the first parameter. Not emitted if command is empty. `fish_postexec`：在执行交互式命令后发出，命令行作为第一个参数传递。如果命令为空，则不触发。
- `fish_exit` is emitted right before fish exits. `fish_exit`：在 Fish 即将退出时发出。
- `fish_cancel` is emitted when a commandline is cleared. `fish_cancel`：当命令行被清除时发出。

Events can be fired with the [emit](https://fishshell.com/docs/current/cmds/emit.html) command, and do not have to be defined before. The names just need to match. For example:

​	可以使用 [emit](https://fishshell.com/docs/current/cmds/emit.html) 命令来触发自定义事件，事件名称只需要匹配即可。例如：

```
function handler --on-event imdone
    echo generator is done $argv
end

function generator
    sleep 1
    # The "imdone" is the name of the event
    # the rest is the arguments to pass to the handler
    emit imdone with $argv
end

```

If there are multiple handlers for an event, they will all be run, but the order might change between fish releases, so you should not rely on it.

​	如果一个事件有多个处理器，所有处理器都会被运行，但运行顺序可能会在 Fish 的不同版本中发生变化，因此不应依赖特定的执行顺序。

Please note that event handlers only become active when a function is loaded, which means you need to otherwise [source](https://fishshell.com/docs/current/cmds/source.html) or execute a function instead of relying on [autoloading](https://fishshell.com/docs/current/language.html#syntax-function-autoloading). One approach is to put it into your [configuration file](https://fishshell.com/docs/current/language.html#configuration).

​	请注意，事件处理器只有在函数加载时才会生效，这意味着你需要通过 [source](https://fishshell.com/docs/current/cmds/source.html) 或直接执行函数，而不能依赖 [自动加载](https://fishshell.com/docs/current/language.html#syntax-function-autoloading)。一种做法是将其放入你的 [配置文件](https://fishshell.com/docs/current/language.html#configuration) 中。

For more information on how to define new event handlers, see the documentation for the [function](https://fishshell.com/docs/current/cmds/function.html) command.

​	要了解如何定义新的事件处理器，可以参考 [function](https://fishshell.com/docs/current/cmds/function.html) 命令的文档。



### 调试 Fish 脚本 Debugging fish scripts

Fish includes basic built-in debugging facilities that allow you to stop execution of a script at an arbitrary point. When this happens you are presented with an interactive prompt where you can execute any fish command to inspect or change state (there are no debug commands as such). For example, you can check or change the value of any variables using [printf](https://fishshell.com/docs/current/cmds/printf.html) and [set](https://fishshell.com/docs/current/cmds/set.html). As another example, you can run [status print-stack-trace](https://fishshell.com/docs/current/cmds/status.html) to see how the current breakpoint was reached. To resume normal execution of the script, simply type [exit](https://fishshell.com/docs/current/cmds/exit.html) or Control+D.

​	Fish 提供了基本的内置调试功能，允许你在脚本的任意点停止执行。当停止执行时，你会看到一个交互式提示符，在此处你可以执行任何 fish 命令来检查或更改状态（并没有特定的调试命令）。例如，你可以使用 [printf](https://fishshell.com/docs/current/cmds/printf.html) 和 [set](https://fishshell.com/docs/current/cmds/set.html) 来检查或更改任何变量的值。另一个例子是，你可以运行 [status print-stack-trace](https://fishshell.com/docs/current/cmds/status.html) 来查看当前断点是如何到达的。要恢复脚本的正常执行，只需输入 [exit](https://fishshell.com/docs/current/cmds/exit.html) 或按 Control+D。

To start a debug session simply insert the [builtin command](https://fishshell.com/docs/current/cmds/breakpoint.html) `breakpoint` at the point in a function or script where you wish to gain control, then run the function or script. Also, the default action of the `TRAP` signal is to call this builtin, meaning a running script can be actively debugged by sending it the `TRAP` signal (`kill -s TRAP <PID>`). There is limited support for interactively setting or modifying breakpoints from this debug prompt: it is possible to insert new breakpoints in (or remove old ones from) other functions by using the `funced` function to edit the definition of a function, but it is not possible to add or remove a breakpoint from the function/script currently loaded and being executed.

​	要开始调试会话，只需在函数或脚本中插入 [builtin 命令](https://fishshell.com/docs/current/cmds/breakpoint.html) `breakpoint`，并运行该函数或脚本。另外，`TRAP` 信号的默认操作是调用此内置命令，这意味着可以通过向运行中的脚本发送 `TRAP` 信号（`kill -s TRAP <PID>`）来主动调试该脚本。调试提示符有一些有限的交互支持，可以在其他函数中插入新的断点（或删除旧的断点），通过使用 `funced` 函数编辑函数定义，但无法在当前加载并执行的函数/脚本中添加或删除断点。

Another way to debug script issues is to set the [`fish_trace`](https://fishshell.com/docs/current/language.html#envvar-fish_trace) variable, e.g. `fish_trace=1 fish_prompt` to see which commands fish executes when running the [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) function.

​	调试脚本问题的另一种方法是设置 [`fish_trace`](https://fishshell.com/docs/current/language.html#envvar-fish_trace) 变量，例如 `fish_trace=1 fish_prompt`，以查看 fish 在运行 [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) 函数时执行了哪些命令。

If you specifically want to debug performance issues, **fish** can be run with the `--profile /path/to/profile.log` option to save a profile to the specified path. This profile log includes a breakdown of how long each step in the execution took. See [fish](https://fishshell.com/docs/current/cmds/fish.html) for more information.

​	如果你想专门调试性能问题，可以使用 `--profile /path/to/profile.log` 选项运行 **fish**，将性能分析记录保存到指定路径。该性能日志包含执行过程中每个步骤所耗费的时间的详细分解。有关更多信息，请参见 [fish](https://fishshell.com/docs/current/cmds/fish.html)。