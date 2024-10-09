+++
title = "Frequently asked questions"
date = 2024-10-09T13:37:26+08:00
type = "docs"
weight = 20
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://fishshell.com/docs/current/faq.html](https://fishshell.com/docs/current/faq.html)

## bash（或其他 shell）中等效的命令是什么？ What is the equivalent to this thing from bash (or other shells)?

See [Fish for bash users](https://fishshell.com/docs/current/fish_for_bash_users.html#fish-for-bash-users)

## 如何设置或清除环境变量？ How do I set or clear an environment variable?

Use the [set](https://fishshell.com/docs/current/cmds/set.html) command:

​	使用 [set](https://fishshell.com/docs/current/cmds/set.html) 命令：

```
set -x key value # typically set -gx key value
set -e key

```

Since fish 3.1 you can set an environment variable for just one command using the `key=value some command` syntax, like in other shells. The two lines below behave identically - unlike other shells, fish will output `value` both times:

​	自 fish 3.1 版本起，你可以像其他 shell 一样使用 `key=value some command` 语法仅为某个命令设置环境变量。下面两行命令的行为相同——与其他 shell 不同的是，fish 两次都会输出 `value`：

```
key=value echo $key
begin; set -lx key value; echo $key; end

```

Note that “exported” is not a [scope](https://fishshell.com/docs/current/language.html#variables-scope), but an additional bit of state. A variable can be global and exported or local and exported or even universal and exported. Typically it makes sense to make an exported variable global.

​	注意，“exported” 并不是一种 [作用域](https://fishshell.com/docs/current/language.html#variables-scope)，而是一种附加状态。变量可以是全局并导出，也可以是局部并导出，甚至是通用并导出。通常情况下，导出的变量应该是全局的。

## 如何检查某个变量是否已定义？ How do I check whether a variable is defined?

Use `set -q var`. For example, `if set -q var; echo variable defined; end`. To check multiple variables you can combine with `and` and `or` like so:

​	使用 `set -q var`。例如，`if set -q var; echo variable defined; end`。要检查多个变量，可以用 `and` 和 `or` 组合：

```
if set -q var1; or set -q var2
    echo either variable defined
end

```

Keep in mind that a defined variable could also be empty, either by having no elements (if set like `set var`) or only empty elements (if set like `set var ""`). Read on for how to deal with those.

​	请注意，一个已定义的变量也可能为空，比如没有元素（如果使用 `set var` 设置）或只有空元素（如果使用 `set var ""` 设置）。继续阅读，了解如何处理这些情况。

## 如何检查变量是否为空？ How do I check whether a variable is not empty?

Use `string length -q -- $var`. For example, `if string length -q -- $var; echo not empty; end`. Note that `string length` will interpret a list of multiple variables as a disjunction (meaning any/or):

​	使用 `string length -q -- $var`。例如，`if string length -q -- $var; echo not empty; end`。请注意，`string length` 会将多个变量列表视为一个并列关系（意味着任何/或）：

```
if string length -q -- $var1 $var2 $var3
    echo at least one of these variables is not empty
end

```

Alternatively, use `test -n "$var"`, but remember that **the variable must be double-quoted**. For example, `if test -n "$var"; echo not empty; end`. The `test` command provides its own and (-a) and or (-o):

​	另外，也可以使用 `test -n "$var"`，但请记住 **变量必须使用双引号**。例如，`if test -n "$var"; echo not empty; end`。`test` 命令提供了自己的 `and`（-a）和 `or`（-o）选项：

```
if test -n "$var1" -o -n "$var2" -o -n "$var3"
    echo at least one of these variables is not empty
end

```

If you want to know if a variable has *no elements*, use `set -q var[1]`.

​	如果你想知道一个变量是否没有元素，可以使用 `set -q var[1]`。

## 为什么 `set -Ux`（导出的通用变量）似乎不起作用？ Why doesn’t `set -Ux` (exported universal variables) seem to work?

A global variable of the same name already exists.

​	因为已存在同名的全局变量。

Environment variables such as `EDITOR` or `TZ` can be set universally using `set -Ux`. However, if there is an environment variable already set before fish starts (such as by login scripts or system administrators), it is imported into fish as a global variable. The [variable scopes](https://fishshell.com/docs/current/language.html#variables-scope) are searched from the “inside out”, which means that local variables are checked first, followed by global variables, and finally universal variables.

​	像 `EDITOR` 或 `TZ` 这样的环境变量可以通过 `set -Ux` 设置为通用变量。但是，如果在 fish 启动前（比如通过登录脚本或系统管理员）已有环境变量被设置，它会被 fish 作为全局变量引入。[变量作用域](https://fishshell.com/docs/current/language.html#variables-scope) 是从“内部到外部”搜索的，这意味着首先检查局部变量，然后是全局变量，最后是通用变量。

This means that the global value takes precedence over the universal value.

​	这意味着全局变量的值优先于通用变量的值。

To avoid this problem, consider changing the setting which fish inherits. If this is not possible, add a statement to your [configuration file](https://fishshell.com/docs/current/language.html#configuration) (usually `~/.config/fish/config.fish`):

​	要避免此问题，可以尝试更改 fish 继承的设置。如果这不可能，请在 [配置文件](https://fishshell.com/docs/current/language.html#configuration)（通常是 `~/.config/fish/config.fish`）中添加一条语句：

```
set -gx EDITOR vim

```

## 如何在每次登录时运行命令？fish 的等效 `.bashrc` 或 `.profile` 是什么？ How do I run a command every login? What’s fish’s equivalent to .bashrc or .profile?

Edit the file `~/.config/fish/config.fish`, creating it if it does not exist (Note the leading period).

​	编辑 `~/.config/fish/config.fish` 文件，如果文件不存在则创建它（注意前面的点号）。

> The “~/.config” part of this can be set via $XDG_CONFIG_HOME, that’s just the default.
>
> 	“~/.config” 部分可以通过 $XDG_CONFIG_HOME 进行设置，这只是默认值。

Unlike .bashrc and .profile, this file is always read, even in non-interactive or login shells.

​	与 `.bashrc` 和 `.profile` 不同，此文件总是会被读取，即使在非交互式或登录 shell 中。

To do something only in interactive shells, check `status is-interactive` like:

​	要仅在交互式 shell 中执行某些操作，可以检查 `status is-interactive`，例如：

```
if status is-interactive
    # use the coolbeans theme
    fish_config theme choose coolbeans
end

```



## 如何设置我的提示符？ How do I set my prompt?

The prompt is the output of the `fish_prompt` function. Put it in `~/.config/fish/functions/fish_prompt.fish`. For example, a simple prompt is:

​	提示符是 `fish_prompt` 函数的输出。将它放在 `~/.config/fish/functions/fish_prompt.fish` 中。例如，一个简单的提示符如下：

```
function fish_prompt
    set_color $fish_color_cwd
    echo -n (prompt_pwd)
    set_color normal
    echo -n ' > '
end

```

You can also use the Web configuration tool, [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html), to preview and choose from a gallery of sample prompts.

​	你也可以使用 Web 配置工具 [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html) 来预览并从样例提示符库中进行选择。

Or you can use fish_config from the commandline:

​	你还可以在命令行中使用 `fish_config`：

```
> fish_config prompt show
# displays all the prompts fish ships with
> fish_config prompt choose disco
# loads the disco prompt in the current shell
> fish_config prompt save
# makes the change permanent

```

If you want to modify your existing prompt, you can use [funced](https://fishshell.com/docs/current/cmds/funced.html) and [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html) like:

​	如果你想修改现有的提示符，可以使用 [funced](https://fishshell.com/docs/current/cmds/funced.html) 和 [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html)，例如：

```
>_ funced fish_prompt
# This opens up your editor (set in $EDITOR).
# Modify the function,
# save the file and repeat to your liking.
# Once you are happy with it:
>_ funcsave fish_prompt

```

This also applies to [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) and [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html).

​	这同样适用于 [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) 和 [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html)。

## 为什么我的提示符显示 `[I]`？ Why does my prompt show a `[I]`?

That’s the [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html). It is displayed by default when you’ve activated vi mode using `fish_vi_key_bindings`.

​	这是 [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html)。当你通过 `fish_vi_key_bindings` 激活 vi 模式时，它会默认显示。

If you haven’t activated vi mode on purpose, you might have installed a third-party theme or plugin that does it.

​	如果你不是有意激活 vi 模式，可能是你安装了第三方主题或插件导致的。

If you want to change or disable this display, modify the `fish_mode_prompt` function, for instance via [funced](https://fishshell.com/docs/current/cmds/funced.html).

​	如果你想更改或禁用此显示，可以修改 `fish_mode_prompt` 函数，例如通过 [funced](https://fishshell.com/docs/current/cmds/funced.html) 进行修改。

## 如何自定义我的语法高亮颜色？ How do I customize my syntax highlighting colors?

Use the web configuration tool, [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html), or alter the [fish_color family of environment variables](https://fishshell.com/docs/current/interactive.html#variables-color).

​	使用 Web 配置工具 [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html)，或者修改 [fish_color 系列环境变量](https://fishshell.com/docs/current/interactive.html#variables-color)。

You can also use `fish_config` on the commandline, like:

​	你还可以在命令行中使用 `fish_config`：

```
> fish_config theme show
# to demonstrate all the colorschemes
> fish_config theme choose coolbeans
# to load the "coolbeans" theme
> fish_config theme save
# to make the change permanent

```

## 如何更改问候消息？ How do I change the greeting message?

Change the value of the variable `fish_greeting` or create a [fish_greeting](https://fishshell.com/docs/current/cmds/fish_greeting.html) function. For example, to remove the greeting use:

​	更改 `fish_greeting` 变量的值或创建一个 [fish_greeting](https://fishshell.com/docs/current/cmds/fish_greeting.html) 函数。例如，要移除问候语，可以使用：

```
set -U fish_greeting

```

Or if you prefer not to use a universal variable, use:

​	或者如果你不想使用通用变量，可以在 [config.fish](https://fishshell.com/docs/current/language.html#configuration) 中使用：

```
set -g fish_greeting

```

in [config.fish](https://fishshell.com/docs/current/language.html#configuration).

## 如何从历史记录中运行命令？ How do I run a command from history?

Type some part of the command, and then hit the ↑ (up) or ↓ (down) arrow keys to navigate through history matches, or press Control+R to open the history in a searchable pager. In this pager you can press Control+R or Control+S to move to older or younger history respectively.

​	输入命令的一部分，然后按 ↑（上）或 ↓（下）箭头键在匹配的历史记录中导航，或按 Control+R 在可搜索的分页器中打开历史记录。在此分页器中，你可以按 Control+R 或 Control+S 移动到较早或较晚的历史记录。

Additional default key bindings include Control+P (up) and Control+N (down). See [Searchable command history](https://fishshell.com/docs/current/interactive.html#history-search) for more information.

​	其他默认的键绑定包括 Control+P（上）和 Control+N（下）。请参见 [可搜索的命令历史记录](https://fishshell.com/docs/current/interactive.html#history-search) 获取更多信息。

## 为什么历史替换（如“!$”等）不起作用？ Why doesn’t history substitution (“!$” etc.) work?

Because history substitution is an awkward interface that was invented before interactive line editing was even possible. Instead of adding this pseudo-syntax, fish opts for nice history searching and recall features. Switching requires a small change of habits: if you want to modify an old line/word, first recall it, then edit.

​	因为历史替换是一种尴尬的交互方式，发明它的时候还没有交互式行编辑功能。与其引入这种伪语法，fish 更倾向于提供良好的历史记录搜索和回调功能。切换到 fish 需要稍微改变一下习惯：如果你想修改旧行或单词，先回调它，然后再进行编辑。

As a special case, most of the time history substitution is used as `sudo !!`. In that case just press Alt+S, and it will recall your last commandline with `sudo` prefixed (or toggle a `sudo` prefix on the current commandline if there is anything).

​	对于一些特殊情况，大多数时候历史替换用作 `sudo !!`。这种情况下，只需按 Alt+S，它会将上次命令行回调并加上 `sudo` 前缀（或者在当前命令行前加上 `sudo` 前缀，如果已经有命令的话）。

In general, fish’s history recall works like this:

​	一般来说，fish 的历史记录回调功能如下：

- Like other shells, the Up arrow, ↑ recalls whole lines, starting from the last executed line. A single press replaces “!!”, later presses replace “!-3” and the like.
- 像其他 shell 一样，按上箭头键（↑）可以回调整行命令，从最近执行的命令开始。单次按键替代了“!!”命令，多次按键相当于“!-3”等命令。
- If the line you want is far back in the history, type any part of the line and then press Up one or more times. This will filter the recalled lines to ones that include this text, and you will get to the line you want much faster. This replaces “!vi”, “!?bar.c” and the like.
- 如果你想要回调的命令位于历史记录的较远处，可以输入该命令的任意部分，然后按上箭头键（↑）一或多次。这样就会过滤出包含该文本的命令行，从而更快找到你要的命令。这相当于替代了“!vi”、“!?bar.c”等命令。
- Alt+↑ recalls individual arguments, starting from the last argument in the last executed line. A single press replaces “!$”, later presses replace “!!:4” and such. As an alternate key binding, Alt+. can be used.
- Alt + ↑ 可以回调单个参数，从最近执行命令的最后一个参数开始。单次按键相当于“!$”，多次按键相当于“!!:4”等命令。替代键绑定为 Alt + .。
- If the argument you want is far back in history (e.g. 2 lines back - that’s a lot of words!), type any part of it and then press Alt+↑. This will show only arguments containing that part and you will get what you want much faster. Try it out, this is very convenient!
- 如果你想要的参数在历史记录中较远（例如在两行之前，这意味着需要匹配很多词！），可以输入该参数的任意部分，然后按 Alt + ↑。这样就只会显示包含该部分的参数，并且你会更快地找到你想要的参数。试试看，这非常方便！
- If you want to reuse several arguments from the same line (“!!:3*” and the like), consider recalling the whole line and removing what you don’t need (Alt+D and Alt+Backspace are your friends).
- 如果你想从同一行中重用多个参数（例如“!!:3*”等），考虑回调整行命令并删除不需要的部分（Alt + D 和 Alt + Backspace 是你的好帮手）。

See [documentation](https://fishshell.com/docs/current/interactive.html#editor) for more details about line editing in fish.

​	更多关于 fish 行编辑的详细信息，请参阅 [文档](https://fishshell.com/docs/current/interactive.html#editor)。

## 如何运行子命令？反引号不起作用！ How do I run a subcommand? The backtick doesn’t work!

`fish` uses parentheses for subcommands. For example:

​	`fish` 使用圆括号来表示子命令。例如：

```
for i in (ls)
    echo $i
end

```

It also supports the familiar `$()` syntax, even in quotes. Backticks are not supported because they are discouraged even in POSIX shells. They nest poorly and are hard to tell from single quotes (`''`).

​	它也支持常见的 `$()` 语法，即使在引号中也可以使用。由于反引号在 POSIX shell 中也不推荐使用，因此 fish 不支持反引号。因为反引号嵌套时表现不佳，并且容易与单引号 (`''`) 混淆。

## 我的命令（pkg-config）输出了一个长字符串？ My command (pkg-config) gives its output as a single long string?

Unlike other shells, fish splits command substitutions only on newlines, not spaces or tabs or the characters in $IFS.

​	与其他 shell 不同，fish 的命令替换仅在换行符处进行分割，而不会在空格、制表符或 `$IFS` 中的字符处分割。

That means if you run

​	这意味着如果你运行：

```
count (printf '%s ' a b c)

```

It will print `1`, because the “a b c “ is used in one piece. But if you do

​	它会输出 `1`，因为 “a b c” 被视为一个整体。但如果你执行：

```
count (printf '%s\n' a b c)

```

it will print `3`, because it gave `count` the arguments “a”, “b” and “c” separately.

​	它会输出 `3`，因为 `count` 接收了三个单独的参数 “a”、“b” 和 “c”。

In the overwhelming majority of cases, splitting on spaces is unwanted, so this is an improvement. This is why you hear about problems with filenames with spaces, after all.

​	在绝大多数情况下，按空格分割是不需要的，因此这是一个改进。你可能会听说关于文件名中包含空格的问题，这就是原因之一。

However sometimes, especially with `pkg-config` and related tools, splitting on spaces is needed.

​	不过有时，尤其是在使用 `pkg-config` 和相关工具时，确实需要按空格分割。

In these cases use `string split -n " "` like:

​	在这些情况下，可以使用 `string split -n " "` 例如：

```
g++ example_01.cpp (pkg-config --cflags --libs gtk+-2.0 | string split -n " ")

```

The `-n` is so empty elements are removed like POSIX shells would do.

​	`-n` 选项可以移除空元素，就像 POSIX shell 所做的那样。

## 如何获取命令的退出状态？ How do I get the exit status of a command?

Use the `$status` variable. This replaces the `$?` variable used in other shells.

​	使用 `$status` 变量。这替代了其他 shell 中的 `$?` 变量。

```
somecommand
if test $status -eq 7
    echo "That's my lucky number!"
end

```

If you are just interested in success or failure, you can run the command directly as the if-condition:

​	如果你只对成功或失败感兴趣，可以直接将命令作为 if 条件运行：

```
if somecommand
    echo "Command succeeded"
else
    echo "Command failed"
end

```

Or if you just want to do one command in case the first succeeded or failed, use `and` or `or`:

​	或者，如果你只想在第一个命令成功或失败时执行另一个命令，可以使用 `and` 或 `or`：

```
somecommand
or someothercommand

```

See the [Conditions](https://fishshell.com/docs/current/language.html#syntax-conditional) and the documentation for [test](https://fishshell.com/docs/current/cmds/test.html) and [if](https://fishshell.com/docs/current/cmds/if.html) for more information.

​	更多信息请参阅 [条件](https://fishshell.com/docs/current/language.html#syntax-conditional)、[test](https://fishshell.com/docs/current/cmds/test.html) 和 [if](https://fishshell.com/docs/current/cmds/if.html) 文档。

## 我的命令显示 “No matches for wildcard” 但在 bash 中可以正常工作 My command prints “No matches for wildcard” but works in bash

In short: [quote](https://fishshell.com/docs/current/language.html#quotes) or [escape](https://fishshell.com/docs/current/language.html#escapes) the wildcard:

​	简而言之：引用（[quote](https://fishshell.com/docs/current/language.html#quotes)）或转义（[escape](https://fishshell.com/docs/current/language.html#escapes)）通配符：

```
scp user@ip:/dir/"string-*"

```

When fish sees an unquoted `*`, it performs [wildcard expansion](https://fishshell.com/docs/current/language.html#expand-wildcard). That means it tries to match filenames to the given string.

​	当 fish 看到未加引号的 `*` 时，会执行 [通配符扩展](https://fishshell.com/docs/current/language.html#expand-wildcard)。这意味着它会尝试将文件名与给定字符串匹配。

If the wildcard doesn’t match any files, fish prints an error instead of running the command:

​	如果通配符没有匹配到任何文件，fish 会打印错误，而不是执行命令：

```
> echo *this*does*not*exist
fish: No matches for wildcard '*this*does*not*exist'. See `help expand`.
echo *this*does*not*exist
     ^

```

Now, bash also tries to match files in this case, but when it doesn’t find a match, it passes along the literal wildcard string instead.

​	bash 也会在这种情况下尝试匹配文件名，但当没有匹配时，它会传递字面上的通配符字符串。

That means that commands like the above

​	这意味着像下面这样的命令：

```
scp user@ip:/dir/string-*

```

or

```
apt install postgres-*

```

appear to work, because most of the time the string doesn’t match and so it passes along the `string-*`, which is then interpreted by the receiving program.

似乎是可行的，因为大多数时候字符串无法匹配文件名，因此会直接传递 `string-*`，随后由接收程序解释。

But it also means that these commands can stop working at any moment once a matching file is encountered (because it has been created or the command is executed in a different working directory), and to deal with that bash needs workarounds like

​	但这也意味着这些命令可能在匹配到文件时突然停止工作（例如文件被创建或命令在不同的工作目录中执行时）。为了处理这种情况，bash 需要以下类似的解决方案：

```
for f in ./*.mpg; do
      # We need to test if the file really exists because
      # the wildcard might have failed to match.
      # 我们需要测试文件是否真的存在，因为
      # 通配符可能没有匹配成功。
      test -f "$f" || continue
      mympgviewer "$f"
done

```

(from http://mywiki.wooledge.org/BashFAQ/004)

For these reasons, fish does not do this, and instead expects asterisks to be quoted or escaped if they aren’t supposed to be expanded.

​	因此，fish 并不会这样做，而是希望当星号不需要扩展时加上引号或转义。

This is similar to bash’s “failglob” option.

​	这与 bash 的 “failglob” 选项类似。

## 我不小心输入了一个目录路径，fish 变更了目录。发生了什么？ I accidentally entered a directory path and fish changed directory. What happened?

If fish is unable to locate a command with a given name, and it starts with `.`, `/` or `~`, fish will test if a directory of that name exists. If it does, it assumes that you want to change your directory. For example, the fastest way to switch to your home directory is to simply press `~` and enter.

​	如果 fish 无法定位到给定名称的命令，并且该命令以 “.”、“/” 或 “~” 开头，fish 会测试该名称是否为现有的目录。如果是，则它会假定你希望变更到该目录。例如，切换到主目录的最快方式是按 `~` 并回车。

## open 命令不起作用 The open command doesn’t work.

The `open` command uses the MIME type database and the `.desktop` files used by Gnome and KDE to identify filetypes and default actions. If at least one of these environments is installed, but the open command is not working, this probably means that the relevant files are installed in a non-standard location. Consider [asking for more help](https://fishshell.com/docs/current/index.html#more-help).

​	`open` 命令使用 MIME 类型数据库和 Gnome、KDE 使用的 `.desktop` 文件来识别文件类型和默认操作。如果安装了至少一个此类环境，但 open 命令仍无法正常工作，这可能意味着相关文件安装在非标准位置。考虑[寻求更多帮助](https://fishshell.com/docs/current/index.html#more-help)。



## 为什么在 fish 作为我的登录 shell 时 SSH/SCP/rsync 无法正常连接？ Why won’t SSH/SCP/rsync connect properly when fish is my login shell?

This problem may show up as messages like “`Received message too long`”, “`open terminal failed: not a terminal`”, “`Bad packet length`”, or “`Connection refused`” with strange output in `ssh_exchange_identification` messages in the debug log.

​	这个问题可能会表现为 “`Received message too long`”、 “`open terminal failed: not a terminal`”、 “`Bad packet length`” 或 `ssh_exchange_identification` 调试日志中的奇怪输出，如 “`Connection refused`”。

This usually happens because fish reads the [user configuration file](https://fishshell.com/docs/current/language.html#configuration) (`~/.config/fish/config.fish`) *always*, whether it’s in an interactive or login or non-interactive or non-login shell.

​	通常是因为 fish 总是读取 [用户配置文件](https://fishshell.com/docs/current/language.html#configuration)（`~/.config/fish/config.fish`），无论是交互式、登录、非交互式还是非登录 shell。

This simplifies matters, but it also means when config.fish generates output, it will do that even in non-interactive shells like the one ssh/scp/rsync start when they connect.

​	这种做法简化了操作，但也意味着当 `config.fish` 生成输出时，即使是在 ssh/scp/rsync 启动的非交互式 shell 中也会如此。

Anything in config.fish that produces output should be guarded with `status is-interactive` (or `status is-login` if you prefer):

​	`config.fish` 中的任何产生输出的内容都应该使用 `status is-interactive`（或者如果你愿意可以使用 `status is-login`）进行保护：

```
if status is-interactive
  ...
end

```

The same applies for example when you start `tmux` in config.fish without guards, which will cause a message like `sessions should be nested with care, unset $TMUX to force`.

​	同样，如果在 `config.fish` 中没有保护地启动 `tmux`，也会导致类似 `sessions should be nested with care, unset $TMUX to force` 的消息。

## 我遇到了奇怪的图形故障（阶梯效应、鬼字符、光标位置错误等）？ I’m getting weird graphical glitches (a staircase effect, ghost characters, cursor in the wrong position,…)?

In a terminal, the application running inside it and the terminal itself need to agree on the width of characters in order to handle cursor movement.

​	在终端中，终端内部运行的应用程序和终端本身需要对字符宽度达成一致才能正确处理光标移动。

This is more important to fish than other shells because features like syntax highlighting and autosuggestions are implemented by moving the cursor.

​	对于 fish 来说，这比其他 shell 更重要，因为诸如语法高亮和自动补全等功能都是通过移动光标来实现的。

Sometimes, there is disagreement on the width. There are numerous causes and fixes for this:

​	有时关于字符宽度存在分歧。引起这种问题的原因和解决方案如下：

- It is possible the character is simply too new for your system to know - in this case you need to refrain from using it.
- 可能是因为该字符对于你的系统来说太新了——在这种情况下，你需要避免使用它。
- Fish or your terminal might not know about the character or handle it wrong - in this case fish or your terminal needs to be fixed, or you need to update to a fixed version.
- fish 或你的终端可能不知道该字符的宽度或处理不当——在这种情况下，你需要修复 fish 或终端，或者升级到修复后的版本。
- The character has an “ambiguous” width and fish thinks that means a width of X while your terminal thinks it’s Y. In this case you either need to change your terminal’s configuration or set $fish_ambiguous_width to the correct value.
- 该字符具有“模糊”宽度，而 fish 认为它的宽度是 X，而你的终端认为是 Y。在这种情况下，你需要更改终端的配置，或者将 `$fish_ambiguous_width` 变量设置为正确的值。
- The character is an emoji and the host system only supports Unicode 8, while you are running the terminal on a system that uses Unicode >= 9. In this case set $fish_emoji_width to 2.
- 该字符是一个表情符号，而主机系统只支持 Unicode 8，但你的终端使用的是 Unicode >= 9。在这种情况下，将 `$fish_emoji_width` 变量设置为 2。

This also means that a few things are unsupportable:

​	这也意味着某些情况是无法支持的：

- Non-monospace fonts - there is *no way* for fish to figure out what width a specific character has as it has no influence on the terminal’s font rendering.
- 非等宽字体——fish **无法**判断具体字符的宽度，因为它无法影响终端的字体渲染。
- Different widths for multiple ambiguous width characters - there is no way for fish to know which width you assign to each character.
- 多个模糊宽度字符的不同宽度——fish 无法知道你为每个字符指定的宽度。



## 卸载 fish - Uninstalling fish

If you want to uninstall fish, first make sure fish is not set as your shell. Run `chsh -s /bin/bash` if you are not sure.

​	如果你想卸载 fish，首先请确保 fish 未被设置为默认 shell。如果不确定，可以运行 `chsh -s /bin/bash` 命令。

If you installed it with a package manager, just use that package manager’s uninstall function. If you built fish yourself, assuming you installed it to /usr/local, do this:

​	如果你是使用包管理器安装的 fish，只需使用包管理器的卸载功能即可。如果你是自行编译安装的，并且假设安装路径为 `/usr/local`，请执行以下命令：

```
rm -Rf /usr/local/etc/fish /usr/local/share/fish ~/.config/fish
rm /usr/local/share/man/man1/fish*.1
cd /usr/local/bin
rm -f fish fish_indent

```

## 我在哪里可以找到 fish 的额外工具？ Where can I find extra tools for fish?

The fish user community extends fish in unique and useful ways via scripts that aren’t always appropriate for bundling with the fish package. Typically because they solve a niche problem unlikely to appeal to a broad audience. You can find those extensions, including prompts, themes and useful functions, in various third-party repositories. These include:

​	fish 用户社区通过脚本独特地扩展了 fish 的功能，但这些脚本通常并不适合直接与 fish 一起打包发布。通常原因在于它们仅解决了少数人遇到的问题，可能不会吸引大多数用户。你可以在各种第三方存储库中找到这些扩展，包括提示符、主题和有用的函数，例如：

- [Fisher](https://github.com/jorgebucaran/fisher)
- [Fundle](https://github.com/tuvistavie/fundle)
- [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish)
- [Tacklebox](https://github.com/justinmayer/tacklebox)

This is not an exhaustive list and the fish project has no opinion regarding the merits of the repositories listed above or the scripts found therein.

​	这并不是一个详尽的列表，fish 项目也不对以上列出的存储库或其中的脚本的优劣发表任何意见。