+++
title = "针对 bash 用户的 Fish 入门指南"
date = 2024-10-09T13:37:26+08:00
type = "docs"
weight = 20
description = ""
isCJKLanguage = true
draft = false

+++

> 原文：[https://fishshell.com/docs/current/fish_for_bash_users.html](https://fishshell.com/docs/current/fish_for_bash_users.html)

# Fish for bash users 针对 bash 用户的 Fish 入门指南

This is to give you a quick overview if you come from bash (or to a lesser extent other shells like zsh or ksh) and want to know how fish differs. Fish is intentionally not POSIX-compatible and as such some of the things you are used to work differently.

​	如果你来自 bash（或者稍微了解 zsh 或 ksh），并想知道 fish 有哪些不同之处，这篇指南能快速为你提供概览。Fish 刻意没有遵循 POSIX 标准，因此你习惯的一些操作方式在 fish 中会有所不同。

Many things are similar - they both fundamentally expand commandlines to execute commands, have pipes, redirections, variables, globs, use command output in various ways. This document is there to quickly show you the differences.

​	尽管如此，很多内容还是类似的——两者都会扩展命令行以执行命令、支持管道、重定向、变量、通配符，还可以通过多种方式使用命令输出。本文旨在快速展示这些不同点。



## 命令替换 Command substitutions

Fish spells command substitutions as `$(command)` or `(command)`, but not ``command``.

​	Fish 的命令替换使用 `$(command)` 或 `(command)`，而不是使用反引号 `command`。

In addition, it only splits them on newlines instead of $IFS. If you want to split on something else, use [string split](https://fishshell.com/docs/current/cmds/string-split.html), [string split0](https://fishshell.com/docs/current/cmds/string-split.html) or [string collect](https://fishshell.com/docs/current/cmds/string-collect.html). If those are used as the last command in a command substitution the splits they create are carried over. So:

​	此外，fish 只在新行处进行拆分，而不会基于 $IFS 进行拆分。如果你需要按其他方式拆分，请使用 [string split](https://fishshell.com/docs/current/cmds/string-split.html)、[string split0](https://fishshell.com/docs/current/cmds/string-split.html) 或 [string collect](https://fishshell.com/docs/current/cmds/string-collect.html)。如果这些命令是命令替换中的最后一个命令，它们产生的拆分将被保留。因此：

```
for i in (find . -print0 | string split0)

```

will correctly handle all possible filenames.

​	可以正确处理所有可能的文件名。

## 变量 Variables

Fish sets and erases variables with [set](https://fishshell.com/docs/current/cmds/set.html) instead of `VAR=VAL` and a variety of separate builtins like `declare` and `unset` and `export`. `set` takes options to determine the scope and exportedness of a variable:

​	Fish 使用 [set](https://fishshell.com/docs/current/cmds/set.html) 来设置和删除变量，而不是 `VAR=VAL` 和像 `declare`、`unset` 和 `export` 这样独立的内置命令。`set` 可以通过选项确定变量的作用域和是否导出：

```
# Define $PAGER global and exported,
# so this is like ``export PAGER=less``
# 定义全局且导出的 $PAGER
set -gx PAGER less

# Define $alocalvariable only locally,
# 定义局部变量 $alocalvariable
# like ``local alocalvariable=foo``
set -l alocalvariable foo

```

or to erase variables:

​	或者删除变量：

```
set -e PAGER

```

`VAR=VAL` statements are available as environment overrides:

​	`VAR=VAL` 语句也可以作为环境变量的覆盖：

```
PAGER=cat git log

```

Fish does not perform word splitting. Once a variable has been set to a value, that value stays as it is, so double-quoting variable expansions isn’t the necessity it is in bash. [[1\]](https://fishshell.com/docs/current/fish_for_bash_users.html#id3)

​	Fish 不会进行单词拆分。一旦变量被设置为某个值，这个值将保持不变，因此在 fish 中双引号扩展变量并不是像 bash 那样必须的。

For instance, here’s ba

​	例如，这是 bash 中的代码：

```
> foo="bar baz"
> printf '"%s"\n' $foo
# will print two lines, because we didn't double-quote
# this is word splitting
# 输出两行，因为没有双引号进行包裹
"bar"
"baz"

```

And here is fish:

​	而在 fish 中：

```
> set foo "bar baz"
> printf '"%s"\n' $foo
# foo was set as one element, so it will be passed as one element, so this is one line
# foo 被设置为一个元素，所以它将作为一个元素传递，这是单行输出

"bar baz"

```

All variables are “arrays” (we use the term “lists”), and expanding a variable expands to all its elements, with each element as its own argument (like bash’s `"${var[@]}"`:

​	所有变量都是“数组”（在 fish 中称为“列表”），展开变量时会展开为其所有元素，每个元素作为一个单独的参数（类似于 bash 的 `"${var[@]}"`）：

```
> set var "foo bar" banana
> printf %s\n $var
foo bar
banana

```

Specific elements of a list can be selected:

​	你可以选择列表的特定元素：

```
echo $list[5..7]

```

The arguments to `set` are ordinary, so you can also set a variable to the output of a command:

​	`set` 的参数是普通的，因此你也可以将变量设置为命令的输出：

```
# Set lines to all the lines in file, one element per line
# 将文件中的每一行作为一个元素设置为 lines
set lines (cat file)

```

or a mixture of literal values and output:

​	或者结合文字值和命令输出：

```
> set numbers 1 2 3 (seq 5 8) 9
> printf '%s\n' $numbers
1
2
3
5
6
7
8
9

```

A `=` is unnecessary and unhelpful with `set` - `set foo = bar` will set the variable “foo” to two values: “=” and “bar”. `set foo=bar` will print an error.

​	`=` 对 `set` 没有帮助，也不是必要的——`set foo = bar` 会将变量 “foo” 设置为两个值：“=” 和 “bar”。`set foo=bar` 会输出一个错误。

See [Shell variables](https://fishshell.com/docs/current/language.html#variables) for more.

​	参见 [Shell 变量](https://fishshell.com/docs/current/language.html#variables) 了解更多。

[[1](https://fishshell.com/docs/current/fish_for_bash_users.html#id2)] 

zsh also does not perform word splitting by default (the SH_WORD_SPLIT option controls this)

​	zsh 默认也不会执行单词拆分（由 SH_WORD_SPLIT 选项控制）。



## 通配符 Wildcards (globs)

Fish only supports the `*` and `**` glob (and the deprecated `?` glob) as syntax. If a glob doesn’t match it fails the command (like with bash’s `failglob`) unless the command is `for`, `set` or `count` or the glob is used with an environment override (`VAR=* command`), in which case it expands to nothing (like with bash’s `nullglob` option).

​	Fish 仅支持 `*` 和 `**` 通配符（以及已弃用的 `?` 通配符）。如果通配符没有匹配到文件，它会使命令失败（类似 bash 的 `failglob`），除非该命令是 `for`、`set` 或 `count`，或者通配符用于环境变量覆盖（`VAR=* command`），此时它会扩展为空（类似 bash 的 `nullglob` 选项）。

Globbing doesn’t happen on expanded variables, so:

​	变量扩展不会进行通配符匹配，因此：

```
set foo "*"
echo $foo

```

will not match any files.

​	不会匹配任何文件。

There are no options to control globbing so it always behaves like that.

​	没有选项可以控制通配符匹配，它始终以这种方式工作。

See [Wildcards](https://fishshell.com/docs/current/language.html#expand-wildcard) for more.

​	参见 [通配符](https://fishshell.com/docs/current/language.html#expand-wildcard) 了解更多。

## 引号 Quoting

Fish has two quoting styles: `""` and `''`. Variables are expanded in double-quotes, nothing is expanded in single-quotes.

​	Fish 有两种引号风格：`""` 和 `''`。变量会在双引号中展开，而在单引号中则不会展开。

There is no `$''`, instead the sequences that would transform are transformed *when unquoted*:

​	没有 `$''`，而是未加引号时会自动转换转义序列：

```
> echo a\nb
a
b

```

See [Quotes](https://fishshell.com/docs/current/language.html#quotes) for more.

​	参见 [引号](https://fishshell.com/docs/current/language.html#quotes) 了解更多。

## 字符串操作 String manipulation

Fish does not have `${foo%bar}`, `${foo#bar}` and `${foo/bar/baz}`. Instead string manipulation is done by the [string](https://fishshell.com/docs/current/cmds/string.html) builtin.

​	Fish 没有 `${foo%bar}`、`${foo#bar}` 和 `${foo/bar/baz}`。取而代之的是使用 [string](https://fishshell.com/docs/current/cmds/string.html) 内置命令来进行字符串操作。

For example, to replace “bar” with “baz”:

​	例如，替换 “bar” 为 “baz”：

```
> string replace bar baz "bar luhrmann"
baz luhrmann

```

It can also split strings:

​	还可以进行字符串拆分：

```
> string split "," "foo,bar"
foo
bar

```

Match regular expressions as a replacement for `grep`:

​	使用正则表达式匹配，作为 `grep` 的替代：

```
> echo bababa | string match -r 'aba$'
aba

```

Pad strings to a given width, with arbitrary characters:

​	填充字符串到指定宽度，使用任意字符：

```
> string pad -c x -w 20 "foo"
xxxxxxxxxxxxxxxxxfoo

```

Make strings lower/uppercase:

​	将字符串转换为小写/大写：

```
> string lower Foo
foo

> string upper Foo
FOO

```

repeat strings, trim strings, escape strings or print a string’s length or width (in terminal cells).

​	Fish 还可以重复字符串、修剪字符串、转义字符串，或输出字符串的长度或宽度（以终端单元格计）。

## 特殊变量 Special variables

Some bash variables and their closest fish equivalent:

​	一些 bash 特殊变量及其在 fish 中的近似等价物：

- `$*`, `$@`, `$1` and so on: `$argv`

- `$?`: `$status`
- `$$`: `$fish_pid`
- `$#`: No variable, instead use `count $argv` 没有对应的变量，可以使用 `count $argv`
- `$!`: `$last_pid`
- `$0`: `status filename`
- `$-`: Mostly `status is-interactive` and `status is-login` 主要对应 `status is-interactive` 和 `status is-login`

## 进程替换 Process substitution

Instead of `<(command)` fish uses `(command | psub)`. There is no equivalent to `>(command)`.

​	Fish 使用 `(command | psub)` 来替代 bash 中的 `<(command)`。没有对应 `>(command)` 的等价替代。

Note that both of these are bashisms, and most things can easily be expressed without. E.g. instead of:

​	需要注意的是，这些都是 bash 的扩展语法，很多操作其实可以不使用这些特殊语法实现。例如，代替以下代码：

```
source (command | psub)

```

just us

​	你可以使用：

```
command | source

```

as fish’s [source](https://fishshell.com/docs/current/cmds/source.html) can read from stdin.

​	因为 fish 的 [source](https://fishshell.com/docs/current/cmds/source.html) 可以从标准输入读取。

## Heredocs

Fish does not have `<<EOF` “heredocs”. Instead of

​	Fish 没有 `<<EOF` 形式的 heredocs。可以使用以下方式代替：

```
cat <<EOF
some string
some more string
EOF

```

use:

​	改为：

```
printf %s\n "some string" "some more string"

```

or:

​	或者：

```
echo "some string
some more string"

# or if you want the quotes on separate lines:
# 或者如果你希望每一行都带有引号：

echo "\
some string
some more string\
"

```

Quotes are followed across newlines.

​	引号会在换行符之间保持连接。

What “heredocs” do is:

​	Heredocs 实际上是以下几个步骤的组合：

1. Read/interpret the string, with special rules, up to the terminator. [[2\]](https://fishshell.com/docs/current/fish_for_bash_users.html#id5) 按照特殊规则读取并解释字符串，直到找到终止符。
2. Write the resulting string to a temporary file. 将结果字符串写入一个临时文件。
3. Start the command the heredoc is attached to with that file as stdin. 启动附带 heredoc 的命令，并将该文件作为标准输入传递给它。

This means it is essentially the same as just reading from a pipe, so:

​	这与通过管道读取数据的方式是基本相同的，因此可以使用：

```
echo "foo" | cat

```

is mostly the same as

​	这与下面的代码效果相同：

```
cat <<EOF
foo
EOF

```

Just like with heredocs, the command has to be prepared to read from stdin. Sometimes this requires special options to be used, often giving a filename of `-` turns it on.

​	同样地，命令必须准备好从标准输入读取数据，有时需要使用特殊选项来启用这种行为，通常指定文件名为 `-` 会启用这种特性。

For example:

​	例如：

```
echo "xterm
rxvt-unicode" | pacman --remove -

# is the same as (the `-` makes pacman read arguments from stdin)
pacman --remove xterm rxvt-unicode

```

and could be written in other shells as

​	与以下 bash 代码等效：

```
# This "-" is still necessary - the heredoc is *also* passed over stdin!
pacman --remove - << EOF
xterm
rxvt-unicode
EOF

```

So heredocs really are just minor syntactical sugar that introduces a lot of special rules, which is why fish doesn’t have them. Pipes are a core concept, and are simpler and compose nicer.

​	Heredocs 只是一些小语法糖，虽然引入了很多特殊规则，但这也是为什么 fish 没有它们的原因。管道是核心概念，它们更简单且组合得更好。

[[2](https://fishshell.com/docs/current/fish_for_bash_users.html#id4)] 

For example, the “EOF” is just a convention, the terminator can be an arbitrary string, something like “THISISTHEEND” also works. And using `<<-` trims leading *tab* characters (but not other whitespace), so you can indent the lines, but only with tabs. Substitutions (variables, commands) are done on the heredoc by default, but not if the terminator is quoted: `cat << "EOF"`.

​	例如，"EOF" 只是一个约定，终止符可以是任意字符串，比如 "THISISTHEEND" 也能工作。而使用 `<<-` 会去除前导 *tab* 字符（但不会去除其他空白字符），因此你可以使用 tab 来缩进这些行。默认情况下，heredoc 会进行替换（变量、命令），但如果终止符被引用，如 `cat << "EOF"`，则不会进行替换。

## 测试 Test (`test`, `[`, `[[`)

Fish has a POSIX-compatible `test` or `[` builtin. There is no `[[` and `test` does not accept `==` as a synonym for `=`. It can compare floating point numbers, however.

​	Fish 提供了一个 POSIX 兼容的 `test` 或 `[` 内置命令。Fish 不支持 `[[`，且 `test` 中不能使用 `==` 作为 `=` 的同义词。不过，Fish 可以比较浮点数。

`set -q` can be used to determine if a variable exists or has a certain number of elements (`set -q foo[2]`).

​	你可以使用 `set -q` 来确定一个变量是否存在或是否有某个元素（例如 `set -q foo[2]`）。

## 算术运算 Arithmetic Expansion

Fish does not have `$((i+1))` arithmetic expansion, computation is handled by [math](https://fishshell.com/docs/current/cmds/math.html):

​	Fish 没有 `$((i+1))` 这样的算术扩展，取而代之的是使用 [math](https://fishshell.com/docs/current/cmds/math.html) 进行计算：

```
math $i + 1

```

Unlike bash’s arithmetic, it can handle floating point numbers:

​	与 bash 的算术不同，fish 还可以处理浮点数：

```
> math 5 / 2
2.5

```

And also has some functions, like for trigonometry:

​	Fish 还提供一些数学函数，如三角函数：

```
> math cos 2 x pi
1

```

You can pass arguments to `math` separately like above or in quotes. Because fish uses `()` parentheses for [command substitutions](https://fishshell.com/docs/current/fish_for_bash_users.html#bash-command-substitutions), quoting is needed if you want to use them in your expression:

​	你可以通过传递参数给 `math` 进行运算。因为 fish 使用 `()` 作为 [命令替换](https://fishshell.com/docs/current/fish_for_bash_users.html#bash-command-substitutions) 的语法，因此如果要在表达式中使用括号，需要使用引号：

```
> math '(5 + 2) * 4'

```

Both `*` and `x` are valid ways to spell multiplication, but `*` needs to be quoted because it looks like a [glob](https://fishshell.com/docs/current/fish_for_bash_users.html#bash-globs).

​	`*` 和 `x` 都可以用来表示乘法，不过由于 `*` 看起来像通配符，所以需要加引号。

## 提示符 Prompts

Fish does not use the `$PS1`, `$PS2` and so on variables. Instead the prompt is the output of the [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) function, plus the [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html) function if vi-mode is enabled and the [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) function for the right prompt.

​	Fish 不使用 `$PS1`、`$PS2` 等变量。提示符的显示是通过 [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) 函数的输出，此外，如果启用了 vi 模式，fish 还会运行 [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html)，并通过 [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) 显示右侧提示符。

As an example, here’s a relatively simple bash prompt:

​	例如，这是一段简单的 bash 提示符：

```
# <$HOSTNAME> <$PWD in blue> <Prompt Sign in Yellow> <Rest in default light white>
PS1='\h\[\e[1;34m\]\w\[\e[m\] \[\e[1;32m\]\$\[\e[m\] '

```

and a rough fish equivalent:

​	在 fish 中的等效代码：

```
function fish_prompt
    set -l prompt_symbol '$'
    fish_is_root_user; and set prompt_symbol '#'

    echo -s (prompt_hostname) \
    (set_color blue) (prompt_pwd) \
    (set_color yellow) $prompt_symbol (set_color normal)
end

```

This shows a few differences:

​	可以看到几个不同点：

- Fish provides [set_color](https://fishshell.com/docs/current/cmds/set_color.html) to color text. It can use the 16 named colors and also RGB sequences (so you could also use `set_color 5555FF`) Fish 提供了 [set_color](https://fishshell.com/docs/current/cmds/set_color.html) 来设置颜色。它可以使用 16 种命名颜色，还可以使用 RGB 序列（例如 `set_color 5555FF`）。

- Instead of introducing specific escapes like `\h` for the hostname, the prompt is simply a function. To achieve the effect of `\h`, fish provides helper functions like [prompt_hostname](https://fishshell.com/docs/current/cmds/prompt_hostname.html), which prints a shortened version of the hostname. Fish 使用函数来生成提示符，取代了特定的转义字符。要实现类似 `\h` 这样的主机名输出，fish 提供了 [prompt_hostname](https://fishshell.com/docs/current/cmds/prompt_hostname.html) 这样的帮助函数。
- Fish offers other helper functions for adding things to the prompt, like [fish_vcs_prompt](https://fishshell.com/docs/current/cmds/fish_vcs_prompt.html) for adding a display for common version control systems (git, mercurial, svn), and [prompt_pwd](https://fishshell.com/docs/current/cmds/prompt_pwd.html) for showing a shortened `$PWD` (the user’s home directory becomes `~` and any path component is shortened). Fish 提供了其他生成提示符的帮助函数，例如 [fish_vcs_prompt](https://fishshell.com/docs/current/cmds/fish_vcs_prompt.html) 用于显示常见版本控制系统的状态（git、mercurial、svn），[prompt_pwd](https://fishshell.com/docs/current/cmds/prompt_pwd.html) 用于显示缩短后的 `$PWD`（用户的主目录变为 `~`，路径的其余部分会缩短）。

The default prompt is reasonably full-featured and its code can be read via `type fish_prompt`.

​	Fish 的默认提示符功能强大，可以通过运行 `type fish_prompt` 查看它的代码。

Fish does not have `$PS2` for continuation lines, instead it leaves the lines indented to show that the commandline isn’t complete yet.

​	Fish 没有 `$PS2` 来显示续行提示符，而是通过缩进来显示命令行还未完成。

## 块与循环 Blocks and loops

Fish’s blocking constructs look a little different. They all start with a word, end in `end` and don’t have a second starting word:

​	Fish 的块结构看起来有些不同。所有块以一个关键字开始，以 `end` 结束，并且没有第二个起始关键字：

```
for i in 1 2 3; do
   echo $i
done

# becomes

for i in 1 2 3
   echo $i
end

while true; do
   echo Weeee
done

# becomes

while true
   echo Weeeeeee
end

{
   echo Hello
}

# becomes

begin
   echo Hello
end

if true; then
   echo Yes I am true
else
   echo "How is true not true?"
fi

# becomes

if true
   echo Yes I am true
else
   echo "How is true not true?"
end

foo() {
   echo foo
}

# becomes

function foo
    echo foo
end

# (bash allows the word "function",
#  but this is an extension)

```

Fish does not have an `until`. Use `while not` or `while !`.

​	Fish 没有 `until` 语法。你可以使用 `while not` 或 `while !`。

## 子 Shell Subshells

Bash has a feature called “subshells”, where it will start another shell process for certain things. That shell will then be independent and e.g. any changes it makes to variables won’t be visible in the main shell.

​	Bash 具有“子 shell”功能，它会在某些情况下启动另一个 shell 进程。这意味着子 shell 是独立的，任何对变量的更改都不会影响主 shell。

This includes things like:

​	例如：

```
# A list of commands in `()` parentheses
# 使用 `()` 括号的命令列表
(foo; bar) | baz

# Both sides of a pipe
# 管道的两端都会运行在子 shell 中
foo | while read -r bar; do
    # This will not be visible outside of the loop.
    # 该变量在循环外部不可见
    VAR=VAL
    # This background process will not be, either
    # 后台进程也不会可见
    baz &
done

```

`()` subshells are often confused with `{}` grouping, which does *not* use a subshell. When you just need to group, you can use `begin; end` in fish:

​	`()` 子 shell 通常与 `{}` 分组混淆，后者并不会启动子 shell。仅仅需要分组时，可以在 fish 中使用 `begin; end`：

```
(foo; bar) | baz
# when it should really have been:
# 实际上应该是：
{ foo; bar; } | baz
# becomes
# 转换为 fish 语法：
begin; foo; bar; end | baz

```

The pipe will simply be run in the same process, so `while read` loops can set variables outside:

​	管道会在同一进程中运行，因此 `while read` 循环可以在外部设置变量：

```
foo | while read bar
    set -g VAR VAL
    baz &
end

echo $VAR # will print VAL
jobs # will show "baz"

```

Subshells are also frequently confused with [command substitutions](https://fishshell.com/docs/current/fish_for_bash_users.html#bash-command-substitutions), which bash writes as ``command`` or `$(command)` and fish writes as `$(command)` or `(command)`. Bash also *uses* subshells to implement them.

​	子 shell 也经常与 [命令替换](https://fishshell.com/docs/current/fish_for_bash_users.html#bash-command-substitutions) 混淆，bash 使用 `command` 或 `$(command)`，而 fish 使用 `$(command)` 或 `(command)`。bash 还会使用子 shell 来实现它们。

The isolation can usually be achieved by just scoping variables (with `set -l`), but if you really do need to run your code in a new shell environment you can always use `fish -c 'your code here'` to do so explicitly.

​	通常通过设置局部变量（使用 `set -l`）就能实现隔离，但如果你确实需要在新的 shell 环境中运行代码，你可以显式使用 `fish -c 'your code here'`。

## 内置命令和其他命令 Builtins and other commands

By now it has become apparent that fish puts much more of a focus on its builtins and external commands rather than its syntax. So here are some helpful builtins and their rough equivalent in bash:

​	到目前为止，显然 fish 更注重内置命令和外部命令，而不是语法。以下是一些有用的内置命令及其在 bash 中的大致等价物：

- [string](https://fishshell.com/docs/current/cmds/string.html) - this replaces most of the string transformation (`${i%foo}` et al) and can also be used instead of `grep` and `sed` and such. [string](https://fishshell.com/docs/current/cmds/string.html) - 替代大多数字符串操作（如 `${i%foo}` 等），也可以替代 `grep` 和 `sed` 等。

- [math](https://fishshell.com/docs/current/cmds/math.html) - this replaces `$((i + 1))` arithmetic and can also do floats and some simple functions (sine and friends). [math](https://fishshell.com/docs/current/cmds/math.html) - 替代 `$((i + 1))` 的算术运算，并且可以处理浮点数和一些简单的函数（如正弦函数等）。
- [argparse](https://fishshell.com/docs/current/cmds/argparse.html) - this can handle a script’s option parsing, for which bash would probably use `getopt` (zsh provides `zparseopts`). [argparse](https://fishshell.com/docs/current/cmds/argparse.html) - 处理脚本的选项解析，在 bash 中可能使用 `getopt`，在 zsh 中可以使用 `zparseopts`。
- [count](https://fishshell.com/docs/current/cmds/count.html) can be used to count things and therefore replaces `$#` and can be used instead of `wc`. [count](https://fishshell.com/docs/current/cmds/count.html) - 计算项目数量，替代 `$#`，也可以代替 `wc`。
- [status](https://fishshell.com/docs/current/cmds/status.html) provides information about the shell status, e.g. if it’s interactive or what the current linenumber is. This replaces `$-` and `$BASH_LINENO` and other variables. [status](https://fishshell.com/docs/current/cmds/status.html) - 提供关于 shell 状态的信息，例如是否是交互式 shell 或当前行号，替代 `$-` 和 `$BASH_LINENO` 以及其他变量。
- `seq(1)` can be used as a replacement for `{1..10}` range expansion. If your OS doesn’t ship a `seq` fish includes a replacement function.  `seq(1)` - 可替代 `{1..10}` 范围展开。如果你的操作系统没有 `seq`，fish 提供了一个替代函数。

## 其他功能 Other facilities

Bash has `set -x` or `set -o xtrace` to print all commands that are being executed. In fish, this would be enabled by setting [`fish_trace`](https://fishshell.com/docs/current/language.html#envvar-fish_trace).

​	Bash 中的 `set -x` 或 `set -o xtrace` 用于打印所有执行的命令。在 fish 中，可以通过设置 [`fish_trace`](https://fishshell.com/docs/current/language.html#envvar-fish_trace) 来启用该功能。

Or, if your intention is to *profile* how long each line of a script takes, you can use `fish --profile` - see the [page for the fish command](https://fishshell.com/docs/current/cmds/fish.html).

​	或者，如果你想 *分析* 脚本中每行执行的时间，可以使用 `fish --profile`，详见 [fish 命令文档](https://fishshell.com/docs/current/cmds/fish.html)。