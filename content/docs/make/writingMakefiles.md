+++
title = "3 编写 Makefile"
date = 2023-08-21T17:03:11+08:00
weight = 30
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 3 Writing Makefiles - 3 编写 Makefile

https://www.gnu.org/software/make/manual/make.html#Makefiles



The information that tells `make` how to recompile a system comes from reading a data base called the *makefile*.

​	告诉 `make` 如何重新编译系统的信息来自于读取一个称为 *makefile* 的数据库。

## 3.1 Makefile 包含什么 3.1 What Makefiles Contain

Makefiles contain five kinds of things: *explicit rules*, *implicit rules*, *variable definitions*, *directives*, and *comments*. Rules, variables, and directives are described at length in later chapters.

​	Makefile 包含五种类型的内容：*显式规则*、*隐式规则*、*变量定义*、*指令* 和 *注释*。规则、变量和指令在后面的章节中有详细描述。

- An *explicit rule* says when and how to remake one or more files, called the rule’s *targets*. It lists the other files that the targets depend on, called the *prerequisites* of the target, and may also give a recipe to use to create or update the targets. See [Writing Rules](https://www.gnu.org/software/make/manual/make.html#Rules).

- *显式规则* 指定何时以及如何重新生成一个或多个文件，这些文件称为规则的 *目标*。它列出了目标所依赖的其他文件，称为目标的 *先决条件*，还可以提供用于创建或更新目标的配方。参见[编写规则](https://www.gnu.org/software/make/manual/make.html#Rules)。

- An *implicit rule* says when and how to remake a class of files based on their names. It describes how a target may depend on a file with a name similar to the target and gives a recipe to create or update such a target. See [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules).

- *隐式规则* 指定何时以及如何基于它们的名称重新生成一类文件。它描述了一个目标可能依赖于一个与目标类似的文件，并给出了创建或更新这样一个目标的配方。参见[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。

- A *variable definition* is a line that specifies a text string value for a variable that can be substituted into the text later. The simple makefile example shows a variable definition for `objects` as a list of all object files (see [Variables Make Makefiles Simpler](https://www.gnu.org/software/make/manual/make.html#Variables-Simplify)).

- *变量定义* 是一行，为一个变量指定了一个文本字符串值，可以在以后的文本中进行替换。简单的 Makefile 示例显示了一个变量定义，即将 `objects` 定义为所有目标文件的列表（参见[变量使 Makefile 更简洁](https://www.gnu.org/software/make/manual/make.html#Variables-Simplify)）。

- A *directive* is an instruction for `make` to do something special while reading the makefile. These include:

- *指令* 是一个指令，让 `make` 在读取 makefile 时执行一些特殊操作。这些操作包括：

  - Reading another makefile (see [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include)).
  - 读取另一个 makefile（参见[包含其他 Makefile](https://www.gnu.org/software/make/manual/make.html#Include)）。
  - Deciding (based on the values of variables) whether to use or ignore a part of the makefile (see [Conditional Parts of Makefiles](https://www.gnu.org/software/make/manual/make.html#Conditionals)).
  - 基于变量的值决定是否使用或忽略 makefile 的一部分（参见[条件性部分的 Makefile](https://www.gnu.org/software/make/manual/make.html#Conditionals)）。
  - Defining a variable from a verbatim string containing multiple lines (see [Defining Multi-Line Variables](https://www.gnu.org/software/make/manual/make.html#Multi_002dLine)).
  - 从包含多行的逐字字符串中定义变量（参见[定义多行变量](https://www.gnu.org/software/make/manual/make.html#Multi_002dLine)）。

- ‘#’ in a line of a makefile starts a *comment*. It and the rest of the line are ignored, except that a trailing backslash not escaped by another backslash will continue the comment across multiple lines. A line containing just a comment (with perhaps spaces before it) is effectively blank, and is ignored. If you want a literal `#`, escape it with a backslash (e.g., `\#`). Comments may appear on any line in the makefile, although they are treated specially in certain situations.

- 在 makefile 的一行中，'#' 开始一个*注释*。它和行的其余部分都会被忽略，但是除非使用另一个反斜杠进行转义的尾随反斜杠，否则会将尾随反斜杠继续跨越多行。只包含注释（可能在其前面有空格）的行在实际上是空的，并被忽略。如果要输入文字 `#`，请使用反斜杠进行转义（例如，`\#`）。注释可以出现在 makefile 的任何行上，尽管在某些情况下会被特殊处理。

  You cannot use comments within variable references or function calls: any instance of `#` will be treated literally (rather than as the start of a comment) inside a variable reference or function call.

  你不能在变量引用或函数调用内使用注释：在变量引用或函数调用内，任何 `#` 实例将被视为文字（而不是注释的开头）。

  Comments within a recipe are passed to the shell, just as with any other recipe text. The shell decides how to interpret it: whether or not this is a comment is up to the shell.

  在配方中的注释会传递给 shell，就像其他任何配方文本一样。shell 决定如何解释它：这是否是注释取决于 shell。

  Within a `define` directive, comments are not ignored during the definition of the variable, but rather kept intact in the value of the variable. When the variable is expanded they will either be treated as `make` comments or as recipe text, depending on the context in which the variable is evaluated.

  在 `define` 指令内，注释在定义变量期间不会被忽略，而是在变量的值中保持完整。当展开变量时，它们将被视为 `make` 注释或配方文本，取决于评估变量的上下文。

- [Splitting Long Lines](https://www.gnu.org/software/make/manual/make.html#Splitting-Lines)

- [分割长行](https://www.gnu.org/software/make/manual/make.html#Splitting-Lines)






### 3.1.1 Splitting Long Lines



Makefiles use a “line-based” syntax in which the newline character is special and marks the end of a statement. GNU `make` has no limit on the length of a statement line, up to the amount of memory in your computer.

​	Makefile 使用“基于行”的语法，其中换行符是特殊的，标志着语句的结束。GNU `make` 没有对语句行的长度限制，可以达到计算机内存的上限。

However, it is difficult to read lines which are too long to display without wrapping or scrolling. So, you can format your makefiles for readability by adding newlines into the middle of a statement: you do this by escaping the internal newlines with a backslash (`\`) character. Where we need to make a distinction we will refer to “physical lines” as a single line ending with a newline (regardless of whether it is escaped) and a “logical line” being a complete statement including all escaped newlines up to the first non-escaped newline.

​	然而，对于过长以至于无法在不换行或滚动的情况下显示的行，很难阅读。因此，您可以通过在语句的中间添加换行来使您的 Makefile 更易读：您可以使用反斜杠（`\`）字符来转义内部换行符。在需要区分的情况下，我们将将“物理行”指代为以换行符结尾的单行（无论是否转义），而“逻辑行”则是包括所有转义换行符直到第一个非转义换行符的完整语句。

The way in which backslash/newline combinations are handled depends on whether the statement is a recipe line or a non-recipe line. Handling of backslash/newline in a recipe line is discussed later (see [Splitting Recipe Lines](https://www.gnu.org/software/make/manual/make.html#Splitting-Recipe-Lines)).

​	反斜杠/换行组合的处理方式取决于语句是配方行还是非配方行。在配方行中处理反斜杠/换行将在稍后讨论（参见[分割配方行](https://www.gnu.org/software/make/manual/make.html#Splitting-Recipe-Lines)）。

Outside of recipe lines, backslash/newlines are converted into a single space character. Once that is done, all whitespace around the backslash/newline is condensed into a single space: this includes all whitespace preceding the backslash, all whitespace at the beginning of the line after the backslash/newline, and any consecutive backslash/newline combinations.

​	在配方行之外，反斜杠/换行将转换为一个单独的空格字符。完成后，反斜杠/换行周围的所有空格都将压缩为一个空格：这包括反斜杠之前的所有空格，反斜杠/换行之后行首的所有空格，以及任何连续的反斜杠/换行组合。

If the `.POSIX` special target is defined then backslash/newline handling is modified slightly to conform to POSIX.2: first, whitespace preceding a backslash is not removed and second, consecutive backslash/newlines are not condensed.

​	如果定义了`.POSIX` 特殊目标，则会稍微修改反斜杠/换行的处理以符合 POSIX.2：首先，反斜杠之前的空格不会被移除，其次，连续的反斜杠/换行不会被压缩。

#### 不添加空格的分割 Splitting Without Adding Whitespace



If you need to split a line but do *not* want any whitespace added, you can utilize a subtle trick: replace your backslash/newline pairs with the three characters dollar sign, backslash, and newline:

​	如果需要分割一行，但又不想添加任何空格，您可以使用一个微妙的技巧：将反斜杠/换行对替换为三个字符：美元符号、反斜杠和换行：

```makefile
var := one$\
       word
```

After `make` removes the backslash/newline and condenses the following line into a single space, this is equivalent to:

​	在`make`去除反斜杠/换行并将以下行压缩为单个空格后，这等同于：

```makefile
var := one$ word
```

Then `make` will perform variable expansion. The variable reference ‘$ ’ refers to a variable with the one-character name “ ” (space) which does not exist, and so expands to the empty string, giving a final assignment which is the equivalent of:

​	然后`make`将执行变量展开。变量引用‘$’指的是一个名为“”（空格）的单字符变量，该变量不存在，因此展开为空字符串，从而得到等效的最终赋值：

```makefile
var := oneword
```





## 3.2 给您的 Makefile 命名 3.2 What Name to Give Your Makefile



By default, when `make` looks for the makefile, it tries the following names, in order: GNUmakefile, makefile and Makefile.

​	默认情况下，当 `make` 查找 Makefile 时，它会按顺序尝试以下名称：GNUmakefile、makefile 和 Makefile。

Normally you should call your makefile either makefile or Makefile. (We recommend Makefile because it appears prominently near the beginning of a directory listing, right near other important files such as README.) The first name checked, GNUmakefile, is not recommended for most makefiles. You should use this name if you have a makefile that is specific to GNU `make`, and will not be understood by other versions of `make`. Other `make` programs look for makefile and Makefile, but not GNUmakefile.

​	通常，您应该将您的 Makefile 命名为 makefile 或 Makefile。（我们建议使用 Makefile，因为它在目录列表的开头部分明显可见，就在其他重要文件（例如 README）附近。）第一个被检查的名称 GNUmakefile，对于大多数 Makefile 不推荐使用。只有当您有一个特定于 GNU `make` 的 Makefile，并且其他版本的 `make` 不会理解它时，才应该使用这个名称。其他 `make` 程序会查找 makefile 和 Makefile，但不会查找 GNUmakefile。

If `make` finds none of these names, it does not use any makefile. Then you must specify a goal with a command argument, and `make` will attempt to figure out how to remake it using only its built-in implicit rules. See [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules).

​	如果 `make` 没有找到这些名称中的任何一个，它将不使用任何 Makefile。然后，您必须使用命令参数指定一个目标，`make` 将尝试仅使用其内置的隐式规则来确定如何重新生成它。请参阅[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。

If you want to use a nonstandard name for your makefile, you can specify the makefile name with the ‘-f’ or ‘--file’ option. The arguments ‘-f name’ or ‘--file=name’ tell `make` to read the file name as the makefile. If you use more than one ‘-f’ or ‘--file’ option, you can specify several makefiles. All the makefiles are effectively concatenated in the order specified. The default makefile names GNUmakefile, makefile and Makefile are not checked automatically if you specify ‘-f’ or ‘--file’.

​	如果您想为您的 Makefile 使用非标准名称，您可以使用 `-f` 或 `--file` 选项指定 Makefile 名称。参数 `-f name` 或 `--file=name` 告诉 `make` 将文件名读取为 Makefile。如果使用多个 `-f` 或 `--file` 选项，可以指定多个 Makefile。所有的 Makefile 将按照指定的顺序有效地串联在一起。默认的 Makefile 名称 GNUmakefile、makefile 和 Makefile 在使用 `-f` 或 `--file` 时不会自动检查。



## 3.3 包含其他 Makefile 3.3 Including Other Makefiles



The `include` directive tells `make` to suspend reading the current makefile and read one or more other makefiles before continuing. The directive is a line in the makefile that looks like this:

​	`include` 指令告诉 `make` 暂停读取当前的 Makefile 并在继续之前读取一个或多个其他的 Makefile。该指令是 Makefile 中的一行，格式如下：

```makefile
include filenames…
```

filenames can contain shell file name patterns. If filenames is empty, nothing is included and no error is printed.

filenames 可以包含 shell 文件名模式。如果 filenames 为空，将不会包含任何内容，并且不会打印错误。

Extra spaces are allowed and ignored at the beginning of the line, but the first character must not be a tab (or the value of `.RECIPEPREFIX`)—if the line begins with a tab, it will be considered a recipe line. Whitespace is required between `include` and the file names, and between file names; extra whitespace is ignored there and at the end of the directive. A comment starting with ‘#’ is allowed at the end of the line. If the file names contain any variable or function references, they are expanded. See [How to Use Variables](https://www.gnu.org/software/make/manual/make.html#Using-Variables).

​	在行首允许并忽略额外的空格，但第一个字符不能是制表符（或 `.RECIPEPREFIX` 的值） - 如果行以制表符开头，它将被视为配方行。在 `include` 和文件名之间需要有空白，以及在文件名之间；额外的空白将被忽略，包括指令结尾的位置。在行尾允许以 `#` 开头的注释。如果文件名包含任何变量或函数引用，它们会被展开。请参阅[如何使用变量](https://www.gnu.org/software/make/manual/make.html#Using-Variables)。

For example, if you have three .mk files, a.mk, b.mk, and c.mk, and `$(bar)` expands to `bish bash`, then the following expression

​	例如，如果您有三个 .mk 文件，a.mk、b.mk 和 c.mk，且 `$(bar)` 展开为 `bish bash`，那么以下表达式

```makefile
include foo *.mk $(bar)
```

is equivalent to

等同于

```makefile
include foo a.mk b.mk c.mk bish bash
```

When `make` processes an `include` directive, it suspends reading of the containing makefile and reads from each listed file in turn. When that is finished, `make` resumes reading the makefile in which the directive appears.

​	当 `make` 处理 `include` 指令时，它会暂停读取包含它的 Makefile，并依次从每个列出的文件中读取。完成后，`make` 将继续读取包含该指令的 Makefile。

One occasion for using `include` directives is when several programs, handled by individual makefiles in various directories, need to use a common set of variable definitions (see [Setting Variables](https://www.gnu.org/software/make/manual/make.html#Setting)) or pattern rules (see [Defining and Redefining Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)).

​	在使用 `include` 指令的一种情况是，当由各个目录中的单独 Makefile 处理的多个程序需要使用共同的变量定义（参见[设置变量](https://www.gnu.org/software/make/manual/make.html#Setting)）或模式规则（参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)）时。

Another such occasion is when you want to generate prerequisites from source files automatically; the prerequisites can be put in a file that is included by the main makefile. This practice is generally cleaner than that of somehow appending the prerequisites to the end of the main makefile as has been traditionally done with other versions of `make`. See [Generating Prerequisites Automatically](https://www.gnu.org/software/make/manual/make.html#Automatic-Prerequisites).

​	另一个使用场景是当您希望自动生成源文件的先决条件时；可以将这些先决条件放在一个由主 Makefile 包含的文件中。这通常比使用其他版本的 `make` 传统做法中的追加方式更为清晰。请参阅[自动生成先决条件](https://www.gnu.org/software/make/manual/make.html#Automatic-Prerequisites)。

If the specified name does not start with a slash (or a drive letter and colon when GNU Make is compiled with MS-DOS / MS-Windows path support), and the file is not found in the current directory, several other directories are searched. First, any directories you have specified with the ‘-I’ or ‘--include-dir’ options are searched (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)). Then the following directories (if they exist) are searched, in this order: prefix/include (normally /usr/local/include [1](https://www.gnu.org/software/make/manual/make.html#FOOT1)) /usr/gnu/include, /usr/local/include, /usr/include.

​	如果指定的名称不以斜杠开头（或在使用具有 MS-DOS / MS-Windows 路径支持的 GNU Make 编译时，不以驱动器号和冒号开头），且在当前目录中找不到文件，则会搜索其他几个目录。首先，会搜索您使用 `-I` 或 `--include-dir` 选项指定的任何目录（参见[选项概要](https://www.gnu.org/software/make/manual/make.html#Options-Summary)）。然后按照以下顺序搜索以下目录（如果存在）：prefix/include（通常是 /usr/local/include [1](https://www.gnu.org/software/make/manual/make.html#FOOT1)) /usr/gnu/include，/usr/local/include，/usr/include。

The `.INCLUDE_DIRS` variable will contain the current list of directories that make will search for included files. See [Other Special Variables](https://www.gnu.org/software/make/manual/make.html#Special-Variables).

​	`.INCLUDE_DIRS` 变量将包含 `make` 将搜索包含文件的当前列表。请参阅[其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)。

You can avoid searching in these default directories by adding the command line option `-I` with the special value `-` (e.g., `-I-`) to the command line. This will cause `make` to forget any already-set include directories, including the default directories.

​	您可以通过在命令行中添加特殊值 `-`（例如 `-I-`）的 `-I` 选项来避免在这些默认目录中搜索，默认情况下会搜索这些默认目录。这将使 `make` 忽略已经设置的包含目录，包括默认目录。

If an included makefile cannot be found in any of these directories it is not an immediately fatal error; processing of the makefile containing the `include` continues. Once it has finished reading makefiles, `make` will try to remake any that are out of date or don’t exist. See [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles). Only after it has failed to find a rule to remake the makefile, or it found a rule but the recipe failed, will `make` diagnose the missing makefile as a fatal error.

​	如果任何这些目录中都找不到所包含的 Makefile，这不是立即致命的错误；继续处理包含 `include` 的 Makefile。一旦完成读取 Makefile，`make` 将尝试重新生成任何已过期或不存在的 Makefile。请参阅[如何重新生成 Makefile](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)。只有在找不到重新生成 Makefile 的规则，或者找到了规则但配方失败时，`make` 才会将丢失的 Makefile 诊断为致命错误。

If you want `make` to simply ignore a makefile which does not exist or cannot be remade, with no error message, use the `-include` directive instead of `include`, like this:

​	如果要让 `make` 忽略不存在或无法重新生成的 Makefile，而不显示任何错误消息，请使用 `-include` 指令而不是 `include`，如下所示：

```makefile
-include filenames…
```

This acts like `include` in every way except that there is no error (not even a warning) if any of the filenames (or any prerequisites of any of the filenames) do not exist or cannot be remade.

​	这与 `include` 在所有方面都类似，但是如果任何文件名（或任何文件名的任何先决条件）不存在或无法重新生成，都不会出现错误（甚至不会有警告）。

For compatibility with some other `make` implementations, `sinclude` is another name for `-include`.

​	为了与其他一些 `make` 实现兼容，`sinclude` 是 `-include` 的另一个名称。



## 3.4 变量 `MAKEFILES` 3.4 The Variable `MAKEFILES`



If the environment variable `MAKEFILES` is defined, `make` considers its value as a list of names (separated by whitespace) of additional makefiles to be read before the others. This works much like the `include` directive: various directories are searched for those files (see [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include)). In addition, the default goal is never taken from one of these makefiles (or any makefile included by them) and it is not an error if the files listed in `MAKEFILES` are not found.

​	如果环境变量 `MAKEFILES` 被定义，`make` 将其值视为其他要在其他 Makefile 之前读取的一个或多个名称（用空格分隔）。这与 `include` 指令类似：将搜索各个目录以获取这些文件（参见[包含其他 Makefile](https://www.gnu.org/software/make/manual/make.html#Include)）。此外，默认目标从这些 Makefile 中的任何一个（或由它们包含的任何 Makefile）中永远不会取出，并且如果在 `MAKEFILES` 中列出的文件找不到，也不会报错。

The main use of `MAKEFILES` is in communication between recursive invocations of `make` (see [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)). It usually is not desirable to set the environment variable before a top-level invocation of `make`, because it is usually better not to mess with a makefile from outside. However, if you are running `make` without a specific makefile, a makefile in `MAKEFILES` can do useful things to help the built-in implicit rules work better, such as defining search paths (see [Searching Directories for Prerequisites](https://www.gnu.org/software/make/manual/make.html#Directory-Search)).

​	`MAKEFILES` 的主要用途是在递归调用 `make` 之间进行通信（参见[递归使用 `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)）。通常情况下，在顶层调用 `make` 之前设置环境变量通常是不可取的，因为最好不要从外部干扰 Makefile。然而，如果您在没有特定 Makefile 的情况下运行 `make`，`MAKEFILES` 中的 Makefile 可以执行有助于内置隐式规则更好地工作的有用操作，例如定义搜索路径（参见[为先决条件搜索目录](https://www.gnu.org/software/make/manual/make.html#Directory-Search)）。

Some users are tempted to set `MAKEFILES` in the environment automatically on login, and program makefiles to expect this to be done. This is a very bad idea, because such makefiles will fail to work if run by anyone else. It is much better to write explicit `include` directives in the makefiles. See [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include).

​	一些用户会在登录时自动设置环境变量 `MAKEFILES`，并编写使 Makefile 预期这样做的程序。这是一个非常糟糕的想法，因为这样的 Makefile 将无法由其他人运行。更好的做法是在 Makefile 中编写明确的 `include` 指令。请参阅[包含其他 Makefile](https://www.gnu.org/software/make/manual/make.html#Include)。



## 3.5 如何重新生成 Makefile 3.5 How Makefiles Are Remade



Sometimes makefiles can be remade from other files, such as RCS or SCCS files. If a makefile can be remade from other files, you probably want `make` to get an up-to-date version of the makefile to read in.

​	有时，Makefile 可以从其他文件重新生成，例如 RCS 或 SCCS 文件。如果可以从其他文件重新生成 Makefile，则可能希望 `make` 获取最新版本的 Makefile 以供阅读。

To this end, after reading in all makefiles `make` will consider each as a goal target, in the order in which they were processed, and attempt to update it. If parallel builds (see [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel)) are enabled then makefiles will be rebuilt in parallel as well.

​	为此，在读取所有 Makefile 后，`make` 将依次将每个 Makefile 视为一个目标目标，以它们被处理的顺序，并尝试更新它。如果启用并行构建（参见[并行执行](https://www.gnu.org/software/make/manual/make.html#Parallel)），则也会并行重新构建 Makefile。

If a makefile has a rule which says how to update it (found either in that very makefile or in another one) or if an implicit rule applies to it (see [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)), it will be updated if necessary. After all makefiles have been checked, if any have actually been changed, `make` starts with a clean slate and reads all the makefiles over again. (It will also attempt to update each of them over again, but normally this will not change them again, since they are already up to date.) Each restart will cause the special variable `MAKE_RESTARTS` to be updated (see [Other Special Variables](https://www.gnu.org/software/make/manual/make.html#Special-Variables)).

​	如果 Makefile 具有规则说明如何更新它（在该 Makefile 本身中找到，或在其他 Makefile 中找到），或者如果适用隐式规则（参见[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)），则会在必要时进行更新。在检查了所有 Makefile 之后，如果任何一个实际上已更改，`make` 将从干净的状态开始，并重新读取所有 Makefile。（它还会尝试重新更新每一个 Makefile，但通常这不会再次更改它们，因为它们已经是最新的。）每次重新启动都会导致特殊变量 `MAKE_RESTARTS` 被更新（参见[其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)）。

If you know that one or more of your makefiles cannot be remade and you want to keep `make` from performing an implicit rule search on them, perhaps for efficiency reasons, you can use any normal method of preventing implicit rule look-up to do so. For example, you can write an explicit rule with the makefile as the target, and an empty recipe (see [Using Empty Recipes](https://www.gnu.org/software/make/manual/make.html#Empty-Recipes)).

​	如果您知道一个或多个 Makefile 无法重新生成，并且希望出于效率原因阻止 `make` 对它们执行隐式规则搜索，您可以使用任何正常的方法来阻止隐式规则查找。例如，可以编写一个以 Makefile 为目标的显式规则，并使用空的配方（参见[使用空的配方](https://www.gnu.org/software/make/manual/make.html#Empty-Recipes)）。

If the makefiles specify a double-colon rule to remake a file with a recipe but no prerequisites, that file will always be remade (see [Double-Colon Rules](https://www.gnu.org/software/make/manual/make.html#Double_002dColon)). In the case of makefiles, a makefile that has a double-colon rule with a recipe but no prerequisites will be remade every time `make` is run, and then again after `make` starts over and reads the makefiles in again. This would cause an infinite loop: `make` would constantly remake the makefile and restart, and never do anything else. So, to avoid this, `make` will **not** attempt to remake makefiles which are specified as targets of a double-colon rule with a recipe but no prerequisites.

​	如果 Makefile 指定了一个双冒号规则，以使用配方但没有先决条件重新生成文件，那么该文件将始终重新生成（参见[双冒号规则](https://www.gnu.org/software/make/manual/make.html#Double_002dColon)）。在 Makefile 的情况下，具有双冒号规则的 Makefile，带有配方但没有先决条件，将在每次运行 `make` 时都重新生成，然后在 `make` 重新启动并再次读取 Makefile 之后再次重新生成。这将导致一个无限循环：`make` 将不断重新生成 Makefile 并重新启动，永远不会做其他任何事情。因此，为了避免这种情况，`make` **不会** 尝试重新生成指定为双冒号规则的目标的 Makefile，其中包含配方但没有先决条件。

Phony targets (see [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)) have the same effect: they are never considered up-to-date and so an included file marked as phony would cause `make` to restart continuously. To avoid this `make` will not attempt to remake makefiles which are marked phony.

​	虚拟目标（参见[虚拟目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)）具有相同的效果：它们永远不会被认为是最新的，因此标记为虚拟的包含文件将导致 `make` 不断重新启动。为了避免这种情况，`make` 不会尝试重新生成标记为虚拟的 Makefile。

You can take advantage of this to optimize startup time: if you know you don’t need your Makefile to be remade you can prevent make from trying to remake it by adding either:

​	您可以利用这一点来优化启动时间：如果您知道您不需要重新生成您的 Makefile，可以通过添加以下内容来阻止 `make` 尝试重新生成它：

```makefile
.PHONY: Makefile
```

or:

或者：

```makefile
Makefile:: ;
```

If you do not specify any makefiles to be read with ‘-f’ or ‘--file’ options, `make` will try the default makefile names; see [What Name to Give Your Makefile](https://www.gnu.org/software/make/manual/make.html#Makefile-Names). Unlike makefiles explicitly requested with ‘-f’ or ‘--file’ options, `make` is not certain that these makefiles should exist. However, if a default makefile does not exist but can be created by running `make` rules, you probably want the rules to be run so that the makefile can be used.

​	如果未使用 `-f` 或 `--file` 选项指定任何 Makefile 进行阅读，`make` 将尝试默认的 Makefile 名称；请参阅[给您的 Makefile 命名](https://www.gnu.org/software/make/manual/make.html#Makefile-Names)。与使用 ‘-f’ 或 ‘--file’ 选项显式请求的 Makefile 不同，`make` 并不确定这些 Makefile 是否应该存在。但是，如果默认的 Makefile 不存在，但可以通过运行 `make` 规则创建它，那么您可能希望运行规则以便可以使用 Makefile。

Therefore, if none of the default makefiles exists, `make` will try to make each of them until it succeeds in making one, or it runs out of names to try. Note that it is not an error if `make` cannot find or make any makefile; a makefile is not always necessary.

​	因此，如果默认的 Makefile 都不存在，`make` 将尝试逐个制作每个 Makefile，直到成功制作一个，或者尝试的名称用尽为止。需要注意的是，如果 `make` 无法找到或制作任何 Makefile，这不是错误；并非始终需要 Makefile。

When you use the ‘-t’ or ‘--touch’ option (see [Instead of Executing Recipes](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution)), you would not want to use an out-of-date makefile to decide which targets to touch. So the ‘-t’ option has no effect on updating makefiles; they are really updated even if ‘-t’ is specified. Likewise, ‘-q’ (or ‘--question’) and ‘-n’ (or ‘--just-print’) do not prevent updating of makefiles, because an out-of-date makefile would result in the wrong output for other targets. Thus, ‘make -f mfile -n foo’ will update mfile, read it in, and then print the recipe to update foo and its prerequisites without running it. The recipe printed for foo will be the one specified in the updated contents of mfile.

​	当您使用 `‘-t’` 或 `‘--touch’` 选项（请参见[替代执行配方](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution)）时，您不希望使用过时的 Makefile 决定要触摸哪些目标。因此，`‘-t’` 选项不会影响更新 Makefile；即使指定了 `‘-t’`，它们也将被真正更新。同样，`‘-q’`（或 `‘--question’`）和 `‘-n’`（或 `‘--just-print’`）不会阻止更新 Makefile，因为过时的 Makefile 会导致其他目标的输出错误。因此，`‘make -f mfile -n foo’` 将更新 mfile，然后读取它，并打印更新 foo 及其先决条件所需的配方，而不运行它。对于 foo 打印的配方将是更新内容中指定的那个。

However, on occasion you might actually wish to prevent updating of even the makefiles. You can do this by specifying the makefiles as goals in the command line as well as specifying them as makefiles. When the makefile name is specified explicitly as a goal, the options ‘-t’ and so on do apply to them.

​	然而，偶尔情况下，您可能实际上希望甚至阻止更新 Makefile。您可以通过在命令行中将 Makefile 作为目标来实现这一点，以及将它们指定为 Makefile。当显式将 Makefile 名称指定为目标时，选项 ‘-t’ 等会适用于它们。

Thus, ‘make -f mfile -n mfile foo’ would read the makefile mfile, print the recipe needed to update it without actually running it, and then print the recipe needed to update foo without running that. The recipe for foo will be the one specified by the existing contents of mfile.

​	因此，`make -f mfile -n mfile foo` 将读取 Makefile mfile，打印所需的配方以更新它，而不实际运行它，然后打印所需的配方以更新 foo，而不运行它。对于 foo 的配方将是 mfile 更新内容中指定的那个。





## 3.6 覆盖另一个 Makefile 的一部分 3.6 Overriding Part of Another Makefile



Sometimes it is useful to have a makefile that is mostly just like another makefile. You can often use the ‘include’ directive to include one in the other, and add more targets or variable definitions. However, it is invalid for two makefiles to give different recipes for the same target. But there is another way.

​	有时，具有与另一个 Makefile 几乎完全相同的 Makefile 非常有用。通常情况下，您可以使用 `include` 指令将其中一个包含在另一个中，并添加更多的目标或变量定义。但是，如果两个 Makefile 为同一目标提供不同的配方，那么是无效的。但是还有另一种方法。

In the containing makefile (the one that wants to include the other), you can use a match-anything pattern rule to say that to remake any target that cannot be made from the information in the containing makefile, `make` should look in another makefile. See [Defining and Redefining Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules), for more information on pattern rules.

​	在包含 Makefile（希望包含其他 Makefile 的那个）中，您可以使用任意匹配模式规则来指示 `make` 在需要重新制作不能从包含 Makefile 中的信息中制作的任何目标时，应查找另一个 Makefile。有关模式规则的更多信息，请参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)。

For example, if you have a makefile called Makefile that says how to make the target ‘foo’ (and other targets), you can write a makefile called GNUmakefile that contains:

​	例如，如果您有一个名为 Makefile 的 Makefile，其中说明如何制作目标 ‘foo’（以及其他目标），那么您可以编写一个名为 GNUmakefile 的 Makefile，其中包含以下内容：

```makefile
foo:
        frobnicate > foo

%: force
        @$(MAKE) -f Makefile $@
force: ;
```

If you say ‘make foo’, `make` will find GNUmakefile, read it, and see that to make foo, it needs to run the recipe ‘frobnicate > foo’. If you say ‘make bar’, `make` will find no way to make bar in GNUmakefile, so it will use the recipe from the pattern rule: ‘make -f Makefile bar’. If Makefile provides a rule for updating bar, `make` will apply the rule. And likewise for any other target that GNUmakefile does not say how to make.

​	如果您说 `make foo`，`make` 将找到 GNUmakefile，读取它，并看到要制作 foo，需要运行配方 `frobnicate > foo`。如果您说 `make bar`，`make` 将在 GNUmakefile 中找不到制作 bar 的方法，因此它将使用模式规则的配方：`make -f Makefile bar`。如果 Makefile 提供了更新 bar 的规则，`make` 将应用该规则。对于 GNUmakefile 没有说明如何制作的任何其他目标，也是如此。

The way this works is that the pattern rule has a pattern of just ‘%’, so it matches any target whatever. The rule specifies a prerequisite force, to guarantee that the recipe will be run even if the target file already exists. We give the force target an empty recipe to prevent `make` from searching for an implicit rule to build it—otherwise it would apply the same match-anything rule to force itself and create a prerequisite loop!

​	这种工作原理是模式规则具有模式 ‘%’ 的模式规则，因此它可以匹配任何目标。规则指定了一个先决条件 force，以确保即使目标文件已经存在，也会运行该配方。我们给 force 目标一个空的配方，以防止 `make` 搜索构建它的隐式规则 - 否则它将对 force 自身应用相同的匹配任何规则，并创建一个先决条件循环！



## 3.7 `make` 如何读取 Makefile 3.7 How `make` Reads a Makefile



GNU `make` does its work in two distinct phases. During the first phase it reads all the makefiles, included makefiles, etc. and internalizes all the variables and their values and implicit and explicit rules, and builds a dependency graph of all the targets and their prerequisites. During the second phase, `make` uses this internalized data to determine which targets need to be updated and run the recipes necessary to update them.

​	GNU `make` 在两个不同的阶段中进行工作。在第一阶段中，它读取所有的 Makefile、包含的 Makefile 等，并内部化所有的变量和它们的值，以及隐式和显式规则，并构建所有目标及其先决条件的依赖图。在第二阶段中，`make` 使用这些内部化的数据来确定哪些目标需要更新，并运行必要的配方来更新它们。

It’s important to understand this two-phase approach because it has a direct impact on how variable and function expansion happens; this is often a source of some confusion when writing makefiles. Below is a summary of the different constructs that can be found in a makefile, and the phase in which expansion happens for each part of the construct.

​	了解这种两阶段的方法很重要，因为它对变量和函数展开的发生方式产生直接影响；这通常是编写 Makefile 时一些困惑的来源。下面是在 Makefile 中可能遇到的不同构造的摘要，以及每个构造的展开的阶段。

We say that expansion is *immediate* if it happens during the first phase: `make` will expand that part of the construct as the makefile is parsed. We say that expansion is *deferred* if it is not immediate. Expansion of a deferred construct part is delayed until the expansion is used: either when it is referenced in an immediate context, or when it is needed during the second phase.

​	我们说，在第一阶段，展开是*立即*发生的，如果在第一阶段期间发生展开，`make` 将在解析 Makefile 时展开该构造的那部分内容。我们说，在第一阶段，展开是*延迟*的，如果不是立即展开。延迟构造部分的展开会延迟到展开使用它时：要么在立即上下文中引用它时，要么在第二阶段需要它时。

You may not be familiar with some of these constructs yet. You can reference this section as you become familiar with them, in later chapters.

​	您可能还不熟悉其中一些构造。随着您熟悉它们，以后的章节中可以参考此部分。

### 变量赋值 Variable Assignment

Variable definitions are parsed as follows:

​	变量定义按以下方式解析：

```makefile
immediate = deferred
immediate ?= deferred
immediate := immediate
immediate ::= immediate
immediate :::= immediate-with-escape
immediate += deferred or immediate
immediate != immediate

define immediate
  deferred
endef

define immediate =
  deferred
endef

define immediate ?=
  deferred
endef

define immediate :=
  immediate
endef

define immediate ::=
  immediate
endef

define immediate :::=
  immediate-with-escape
endef

define immediate +=
  deferred or immediate
endef

define immediate !=
  immediate
endef
```

For the append operator ‘+=’, the right-hand side is considered immediate if the variable was previously set as a simple variable (‘:=’ or ‘::=’), and deferred otherwise.

​	对于附加运算符 `‘+=’`，右侧在变量之前如果变量以简单变量（‘:=’ 或 ‘::=’）设置过，则被视为立即展开，否则为延迟展开。

For the immediate-with-escape operator ‘:::=’, the value on the right-hand side is immediately expanded but then escaped (that is, all instances of `$` in the result of the expansion are replaced with `$$`).

​	对于带转义的立即展开运算符 `‘:::=’`，右侧的值会立即展开，但然后被转义（也就是说，在展开结果中的所有 `$` 实例都会替换为 `$$`）。

For the shell assignment operator ‘!=’, the right-hand side is evaluated immediately and handed to the shell. The result is stored in the variable named on the left, and that variable is considered a recursively expanded variable (and will thus be re-evaluated on each reference).

​	对于 shell 赋值运算符 `‘!=’`，右侧会立即计算并传递给 shell。结果存储在左侧命名的变量中，并且该变量被视为递归展开变量（因此将在每次引用时重新评估）。

### 条件指令 Conditional Directives



Conditional directives are parsed immediately. This means, for example, that automatic variables cannot be used in conditional directives, as automatic variables are not set until the recipe for that rule is invoked. If you need to use automatic variables in a conditional directive you *must* move the condition into the recipe and use shell conditional syntax instead.

​	条件指令会立即解析。这意味着，例如，不能在条件指令中使用自动变量，因为自动变量在调用该规则的配方被调用之前不会设置。如果需要在条件指令中使用自动变量，您必须将条件移到配方中，并使用 shell 条件语法。

### 规则定义 Rule Definition

A rule is always expanded the same way, regardless of the form:

​	规则总是以相同的方式展开，无论形式如何：

```makefile
immediate : immediate ; deferred
        deferred
```

That is, the target and prerequisite sections are expanded immediately, and the recipe used to build the target is always deferred. This is true for explicit rules, pattern rules, suffix rules, static pattern rules, and simple prerequisite definitions.

​	也就是说，目标和先决条件部分立即展开，用于构建目标的配方总是延迟展开。这适用于显式规则、模式规则、后缀规则、静态模式规则和简单的先决条件定义。



## 3.8 Makefile 的解析方式 3.8 How Makefiles Are Parsed

GNU `make` parses makefiles line-by-line. Parsing proceeds using the following steps:

​	GNU `make` 逐行解析 Makefile。解析进行以下步骤：

1. Read in a full logical line, including backslash-escaped lines (see [Splitting Long Lines](https://www.gnu.org/software/make/manual/make.html#Splitting-Lines)).
2. Remove comments (see [What Makefiles Contain](https://www.gnu.org/software/make/manual/make.html#Makefile-Contents)).
3. If the line begins with the recipe prefix character and we are in a rule context, add the line to the current recipe and read the next line (see [Recipe Syntax](https://www.gnu.org/software/make/manual/make.html#Recipe-Syntax)).
4. Expand elements of the line which appear in an *immediate* expansion context (see [How `make` Reads a Makefile](https://www.gnu.org/software/make/manual/make.html#Reading-Makefiles)).
5. Scan the line for a separator character, such as ‘:’ or ‘=’, to determine whether the line is a macro assignment or a rule (see [Recipe Syntax](https://www.gnu.org/software/make/manual/make.html#Recipe-Syntax)).
6. Internalize the resulting operation and read the next line.
7. 读取完整的逻辑行，包括反斜杠转义的行（请参见[拆分长行](https://www.gnu.org/software/make/manual/make.html#Splitting-Lines)）。
8. 删除注释（请参见[Makefile 的内容](https://www.gnu.org/software/make/manual/make.html#Makefile-Contents)）。
9. 如果行以配方前缀字符开头且我们处于规则上下文中，则将该行添加到当前配方，并读取下一行（请参见[配方语法](https://www.gnu.org/software/make/manual/make.html#Recipe-Syntax)）。
10. 展开出现在*立即*展开上下文中的行的元素（请参见[make 如何读取 Makefile](https://www.gnu.org/software/make/manual/make.html#Reading-Makefiles)）。
11. 扫描行以查找分隔符字符，例如 ‘:’ 或 ‘=’，以确定行是宏赋值还是规则（请参见[配方语法](https://www.gnu.org/software/make/manual/make.html#Recipe-Syntax)）。
12. 将生成的操作内部化，并读取下一行。

An important consequence of this is that a macro can expand to an entire rule, *if it is one line long*. This will work:

​	这的一个重要结论是，宏可以展开为整个规则，*如果它只有一行长*。这将起作用：

```makefile
myrule = target : ; echo built

$(myrule)
```

However, this will not work because `make` does not re-split lines after it has expanded them:

​	然而，这不起作用，因为 `make` 在展开它们后不会重新拆分行：

```makefile
define myrule
target:
        echo built
endef

$(myrule)
```

The above makefile results in the definition of a target ‘target’ with prerequisites ‘echo’ and ‘built’, as if the makefile contained `target: echo built`, rather than a rule with a recipe. Newlines still present in a line after expansion is complete are ignored as normal whitespace.

​	上述 Makefile 会导致定义一个名为 ‘target’ 的目标，其中包含先决条件 ‘echo’ 和 ‘built’，就好像 Makefile 包含 `target: echo built` 而不是一个包含配方的规则。在展开完成后仍然存在于行中的换行符将像普通空格一样被忽略。

In order to properly expand a multi-line macro you must use the `eval` function: this causes the `make` parser to be run on the results of the expanded macro (see [The `eval` Function](https://www.gnu.org/software/make/manual/make.html#Eval-Function)).

​	为了正确展开多行宏，您必须使用 `eval` 函数：这会导致在展开后的宏结果上运行 `make` 解析器（请参见[eval 函数](https://www.gnu.org/software/make/manual/make.html#Eval-Function)）。



## 3.9 二次展开 3.9 Secondary Expansion



Previously we learned that GNU `make` works in two distinct phases: a read-in phase and a target-update phase (see [How `make` Reads a Makefile](https://www.gnu.org/software/make/manual/make.html#Reading-Makefiles)). GNU Make also has the ability to enable a *second expansion* of the prerequisites (only) for some or all targets defined in the makefile. In order for this second expansion to occur, the special target `.SECONDEXPANSION` must be defined before the first prerequisite list that makes use of this feature.

​	前面我们了解到 GNU `make` 的工作方式分为两个不同的阶段：读取阶段和目标更新阶段（请参见[make 如何读取 Makefile](https://www.gnu.org/software/make/manual/make.html#Reading-Makefiles)）。GNU Make 还具有启用对一些或所有目标定义的先决条件进行 *第二次展开* 的功能。为了使这种第二次展开发生，必须在使用此功能的第一个先决条件列表之前定义特殊目标 `.SECONDEXPANSION`。

If `.SECONDEXPANSION` is defined then when GNU `make` needs to check the prerequisites of a target, the prerequisites are expanded a *second time*. In most circumstances this secondary expansion will have no effect, since all variable and function references will have been expanded during the initial parsing of the makefiles. In order to take advantage of the secondary expansion phase of the parser, then, it’s necessary to *escape* the variable or function reference in the makefile. In this case the first expansion merely un-escapes the reference but doesn’t expand it, and expansion is left to the secondary expansion phase. For example, consider this makefile:

​	如果定义了 `.SECONDEXPANSION`，那么当 GNU `make` 需要检查目标的先决条件时，先决条件会进行 *第二次展开*。在大多数情况下，这种次级展开不会产生影响，因为所有变量和函数引用都将在初始解析 Makefile 时展开。为了利用解析器的第二次展开阶段，您需要在 Makefile 中 *转义* 变量或函数引用。在这种情况下，第一次展开仅仅是取消转义引用，而不会展开它，展开留给第二次展开阶段。例如，请考虑以下的 Makefile：

```makefile
.SECONDEXPANSION:
ONEVAR = onefile
TWOVAR = twofile
myfile: $(ONEVAR) $$(TWOVAR)
```

After the first expansion phase the prerequisites list of the myfile target will be `onefile` and `$(TWOVAR)`; the first (unescaped) variable reference to ONEVAR is expanded, while the second (escaped) variable reference is simply unescaped, without being recognized as a variable reference. Now during the secondary expansion the first word is expanded again but since it contains no variable or function references it remains the value onefile, while the second word is now a normal reference to the variable TWOVAR, which is expanded to the value twofile. The final result is that there are two prerequisites, onefile and twofile.

​	经过第一次展开阶段后，myfile 目标的先决条件列表将是 `onefile` 和 `$(TWOVAR)`；第一个（未转义）的变量引用 ONEVAR 被展开，而第二个（转义）的变量引用仅被取消转义，而不会被识别为变量引用。现在，在第二次展开期间，第一个单词再次展开，但由于其中不包含变量或函数引用，它仍然是 onefile 的值，而第二个单词现在是对变量 TWOVAR 的正常引用，它被展开为 twofile 的值。最终结果是存在两个先决条件，即 onefile 和 twofile。

Obviously, this is not a very interesting case since the same result could more easily have been achieved simply by having both variables appear, unescaped, in the prerequisites list. One difference becomes apparent if the variables are reset; consider this example:

​	显然，这不是一个非常有趣的案例，因为通过在先决条件列表中仅以非转义方式列出两个变量，更容易地实现相同的结果。如果变量被重新设置，一个区别变得明显；请考虑以下示例：

```makefile
.SECONDEXPANSION:
AVAR = top
onefile: $(AVAR)
twofile: $$(AVAR)
AVAR = bottom
```

Here the prerequisite of onefile will be expanded immediately, and resolve to the value top, while the prerequisite of twofile will not be full expanded until the secondary expansion and yield a value of bottom.

​	在这里，onefile 的先决条件将立即展开，并解析为值 top，而 twofile 的先决条件将在第二次展开之前不会完全展开，并解析为值 bottom。

This is marginally more exciting, but the true power of this feature only becomes apparent when you discover that secondary expansions always take place within the scope of the automatic variables for that target. This means that you can use variables such as `$@`, `$*`, etc. during the second expansion and they will have their expected values, just as in the recipe. All you have to do is defer the expansion by escaping the `$`. Also, secondary expansion occurs for both explicit and implicit (pattern) rules. Knowing this, the possible uses for this feature increase dramatically. For example:

​	这可能更令人兴奋一些，但是只有在您发现二次展开始终发生在目标的自动变量范围内时，此功能的真正威力才会显现出来。这意味着您可以在第二次展开中使用诸如 `$@`、`$*` 等变量，它们将具有其预期的值，就像在配方中一样。您所要做的就是通过转义 `$` 来延迟展开。另外，次级展开适用于显式和隐式（模式）规则。了解这一点后，对于此功能的可能用途会大大增加。例如：

```makefile
.SECONDEXPANSION:
main_OBJS := main.o try.o test.o
lib_OBJS := lib.o api.o

main lib: $$($$@_OBJS)
```

Here, after the initial expansion the prerequisites of both the main and lib targets will be `$($@_OBJS)`. During the secondary expansion, the `$@` variable is set to the name of the target and so the expansion for the main target will yield `$(main_OBJS)`, or `main.o try.o test.o`, while the secondary expansion for the lib target will yield `$(lib_OBJS)`, or `lib.o api.o`.

​	在这里，初始展开后，main 和 lib 目标的先决条件将是 `$($@_OBJS)`。在第二次展开期间，`$@` 变量将设置为目标的名称，因此 main 目标的展开将生成 `$(main_OBJS)`，或 `main.o try.o test.o`，而 lib 目标的第二次展开将生成 `$(lib_OBJS)`，或 `lib.o api.o`。

You can also mix in functions here, as long as they are properly escaped:

​	您还可以在这里混合使用函数，只要它们被正确转义：

```makefile
main_SRCS := main.c try.c test.c
lib_SRCS := lib.c api.c

.SECONDEXPANSION:
main lib: $$(patsubst %.c,%.o,$$($$@_SRCS))
```

This version allows users to specify source files rather than object files, but gives the same resulting prerequisites list as the previous example.

​	此版本允许用户指定源文件而不是对象文件，但生成与前一个示例相同的先决条件列表。

Evaluation of automatic variables during the secondary expansion phase, especially of the target name variable `$$@`, behaves similarly to evaluation within recipes. However, there are some subtle differences and “corner cases” which come into play for the different types of rule definitions that `make` understands. The subtleties of using the different automatic variables are described below.

​	在次级展开阶段，特别是目标名称变量 `$$@` 的自动变量评估与在配方中的评估类似。然而，对于 `make` 理解的不同类型的规则定义，会出现一些微妙的差异和“边界情况”。使用不同自动变量的微妙之处在下面描述。

### 显式规则的二次展开 Secondary Expansion of Explicit Rules



During the secondary expansion of explicit rules, `$$@` and `$$%` evaluate, respectively, to the file name of the target and, when the target is an archive member, the target member name. The `$$<` variable evaluates to the first prerequisite in the first rule for this target. `$$^` and `$$+` evaluate to the list of all prerequisites of rules *that have already appeared* for the same target (`$$+` with repetitions and `$$^` without). The following example will help illustrate these behaviors:

​	在显式规则的二次展开过程中，`$$@` 和 `$$%` 分别求值为目标的文件名，而当目标是存档成员时，求值为目标成员的名称。`$$<` 变量求值为此目标的第一个先决条件，即第一个规则的第一个先决条件。`$$^` 和 `$$+` 求值为已经出现的相同目标的规则的所有先决条件列表（`$$+` 包含重复，`$$^` 不包含）。以下示例将有助于说明这些行为：

```
.SECONDEXPANSION:

foo: foo.1 bar.1 $$< $$^ $$+    # line #1

foo: foo.2 bar.2 $$< $$^ $$+    # line #2

foo: foo.3 bar.3 $$< $$^ $$+    # line #3
```

In the first prerequisite list, all three variables (`$$<`, `$$^`, and `$$+`) expand to the empty string. In the second, they will have values `foo.1`, `foo.1 bar.1`, and `foo.1 bar.1` respectively. In the third they will have values `foo.1`, `foo.1 bar.1 foo.2 bar.2`, and `foo.1 bar.1 foo.2 bar.2 foo.1 foo.1 bar.1 foo.1 bar.1` respectively.

​	在第一个先决条件列表中，所有三个变量（`$$<`、`$$^` 和 `$$+`）展开为空字符串。在第二个先决条件列表中，它们的值分别为 `foo.1`、`foo.1 bar.1` 和 `foo.1 bar.1`。在第三个先决条件列表中，它们的值分别为 `foo.1`、`foo.1 bar.1 foo.2 bar.2` 和 `foo.1 bar.1 foo.2 bar.2 foo.1 foo.1 bar.1 foo.1 bar.1`。

Rules undergo secondary expansion in makefile order, except that the rule with the recipe is always evaluated last.

​	规则按照 Makefile 的顺序进行二次展开，但配方的规则总是最后被评估。

The variables `$$?` and `$$*` are not available and expand to the empty string.

​	变量 `$$?` 和 `$$*` 不可用，会展开为空字符串。



### 静态模式规则的二次展开 Secondary Expansion of Static Pattern Rules



Rules for secondary expansion of static pattern rules are identical to those for explicit rules, above, with one exception: for static pattern rules the `$$*` variable is set to the pattern stem. As with explicit rules, `$$?` is not available and expands to the empty string.

​	静态模式规则的二次展开规则与上述显式规则相同，只有一个例外：对于静态模式规则，`$$*` 变量设置为模式的前缀。与显式规则一样，`$$?` 不可用，会展开为空字符串。

### 隐式规则的二次展开 Secondary Expansion of Implicit Rules



As `make` searches for an implicit rule, it substitutes the stem and then performs secondary expansion for every rule with a matching target pattern. The value of the automatic variables is derived in the same fashion as for static pattern rules. As an example:

​	当 `make` 搜索隐式规则时，它会替换 stem（模式的前缀），然后对于每个具有匹配目标模式的规则进行二次展开。自动变量的值的派生方式与静态模式规则相同。以下示例：

```
.SECONDEXPANSION:

foo: bar

foo foz: fo%: bo%

%oo: $$< $$^ $$+ $$*
```

When the implicit rule is tried for target foo, `$$<` expands to bar, `$$^` expands to bar boo, `$$+` also expands to bar boo, and `$$*` expands to f.

​	当隐式规则尝试为目标 foo 进行匹配时，`$$<` 展开为 bar，`$$^` 展开为 bar boo，`$$+` 也展开为 bar boo，而 `$$*` 展开为 f。

Note that the directory prefix (D), as described in [Implicit Rule Search Algorithm](https://www.gnu.org/software/make/manual/make.html#Implicit-Rule-Search), is appended (after expansion) to all the patterns in the prerequisites list. As an example:

​	请注意，目录前缀（D），如[隐式规则搜索算法](https://www.gnu.org/software/make/manual/make.html#Implicit-Rule-Search)中所述，在所有先决条件列表中的模式上（在展开后）附加。以下示例：

```
.SECONDEXPANSION:

/tmp/foo.o:

%.o: $$(addsuffix /%.c,foo bar) foo.h
        @echo $^
```

The prerequisite list printed, after the secondary expansion and directory prefix reconstruction, will be /tmp/foo/foo.c /tmp/bar/foo.c foo.h. If you are not interested in this reconstruction, you can use `$$*` instead of `%` in the prerequisites list.

​	经过二次展开和目录前缀重建后，打印的先决条件列表将是 /tmp/foo/foo.c /tmp/bar/foo.c foo.h。如果不关心此重建过程，可以在先决条件列表中使用 `$$*` 替代 `%`。