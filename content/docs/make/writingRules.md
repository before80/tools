+++
title = "4 编写规则"
date = 2023-08-21T17:03:28+08:00
weight = 40
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 4 Writing Rules - 4 编写规则

https://www.gnu.org/software/make/manual/make.html#Rules



A *rule* appears in the makefile and says when and how to remake certain files, called the rule’s *targets* (most often only one per rule). It lists the other files that are the *prerequisites* of the target, and the *recipe* to use to create or update the target.

​	一个*规则*出现在Makefile中，它说明何时以及如何重新生成特定的文件，称为规则的*目标*（通常每个规则通常只有一个目标）。它列出了目标的其他作为*先决条件*的文件，以及用于创建或更新目标的*配方*。

The order of rules is not significant, except for determining the *default goal*: the target for `make` to consider, if you do not otherwise specify one. The default goal is the first target of the first rule in the first makefile. There are two exceptions: a target starting with a period is not a default unless it also contains one or more slashes, ‘/’; and, a target that defines a pattern rule has no effect on the default goal. (See [Defining and Redefining Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules).)

​	规则的顺序不重要，除了确定*默认目标*：如果您没有另外指定目标，`make` 要考虑的目标。默认目标是第一个Makefile中的第一个规则的第一个目标。有两个例外：以句点开头的目标不是默认目标，除非它还包含一个或多个斜杠 ‘/’；以及定义模式规则的目标不会影响默认目标。（参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)。）

Therefore, we usually write the makefile so that the first rule is the one for compiling the entire program or all the programs described by the makefile (often with a target called ‘all’). See [Arguments to Specify the Goals](https://www.gnu.org/software/make/manual/make.html#Goals).

​	因此，通常我们会将Makefile的第一个规则编写为编译整个程序或由Makefile描述的所有程序的规则（通常使用一个名为 'all' 的目标）。请参阅[用于指定目标的参数](https://www.gnu.org/software/make/manual/make.html#Goals)。

## 4.1 规则示例 4.1 Rule Example

Here is an example of a rule:

​	以下是一个规则示例：

```
foo.o : foo.c defs.h       # module for twiddling the frobs
        cc -c -g foo.c
```

Its target is foo.o and its prerequisites are foo.c and defs.h. It has one command in the recipe: ‘cc -c -g foo.c’. The recipe starts with a tab to identify it as a recipe.

​	它的目标是 foo.o，它的先决条件是 foo.c 和 defs.h。它在配方中有一个命令：‘cc -c -g foo.c’。配方以制表符开头以将其标识为配方。

This rule says two things:

​	这个规则传达了两个信息： 

- How to decide whether foo.o is out of date: it is out of date if it does not exist, or if either foo.c or defs.h is more recent than it.
- 如何判断 foo.o 是否过时：如果它不存在，或者如果 foo.c 或 defs.h 的修改时间较新。
- How to update the file foo.o: by running `cc` as stated. The recipe does not explicitly mention defs.h, but we presume that foo.c includes it, and that is why defs.h was added to the prerequisites.
- 如何更新文件 foo.o：通过运行所述的 `cc`。配方没有明确提到 defs.h，但我们假设 foo.c 包括它，这就是为什么将 defs.h 添加到先决条件的原因。





## 4.2 规则语法 4.2 Rule Syntax

In general, a rule looks like this:

​	一般来说，规则的样式如下：

```
targets : prerequisites
        recipe
        …
```

or like this:

或者像这样：

```
targets : prerequisites ; recipe
        recipe
        …
```

The targets are file names, separated by spaces. Wildcard characters may be used (see [Using Wildcard Characters in File Names](https://www.gnu.org/software/make/manual/make.html#Wildcards)) and a name of the form a(m) represents member m in archive file a (see [Archive Members as Targets](https://www.gnu.org/software/make/manual/make.html#Archive-Members)). Usually there is only one target per rule, but occasionally there is a reason to have more (see [Multiple Targets in a Rule](https://www.gnu.org/software/make/manual/make.html#Multiple-Targets)).

​	目标是文件名，用空格分隔。可以使用通配符字符（参见[在文件名中使用通配符字符](https://www.gnu.org/software/make/manual/make.html#Wildcards)）和形式为 a(m) 的名称，其中 a 表示存档文件，m 表示存档文件 a 中的成员（参见[用于目标的存档成员](https://www.gnu.org/software/make/manual/make.html#Archive-Members)）。通常，每个规则只有一个目标，但偶尔会有多个目标的原因（参见[规则中的多个目标](https://www.gnu.org/software/make/manual/make.html#Multiple-Targets)）。

The recipe lines start with a tab character (or the first character in the value of the `.RECIPEPREFIX` variable; see [Other Special Variables](https://www.gnu.org/software/make/manual/make.html#Special-Variables)). The first recipe line may appear on the line after the prerequisites, with a tab character, or may appear on the same line, with a semicolon. Either way, the effect is the same. There are other differences in the syntax of recipes. See [Writing Recipes in Rules](https://www.gnu.org/software/make/manual/make.html#Recipes).

​	配方行以制表符字符开头（或者是 `.RECIPEPREFIX` 变量的值的第一个字符；参见[其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)）。第一行配方可以出现在先决条件的后面，带有制表符字符，或者可以出现在同一行上，带有分号。无论哪种方式，效果都是一样的。在配方的语法中还有其他差异。请参阅[在规则中编写配方](https://www.gnu.org/software/make/manual/make.html#Recipes)。

Because dollar signs are used to start `make` variable references, if you really want a dollar sign in a target or prerequisite you must write two of them, ‘`$$`’ (see [How to Use Variables](https://www.gnu.org/software/make/manual/make.html#Using-Variables)). If you have enabled secondary expansion (see [Secondary Expansion](https://www.gnu.org/software/make/manual/make.html#Secondary-Expansion)) and you want a literal dollar sign in the prerequisites list, you must actually write *four* dollar signs (‘`$$$$`’).

​	由于美元符号用于开始 `make` 变量引用，因此如果您确实希望在目标或先决条件中使用美元符号，您必须写两个美元符号，即 ‘`$$`’（参见[如何使用变量](https://www.gnu.org/software/make/manual/make.html#Using-Variables)）。如果您启用了二次展开（参见[二次展开](https://www.gnu.org/software/make/manual/make.html#Secondary-Expansion)），并且您希望在先决条件列表中出现一个字面的美元符号，您实际上必须写 *四个* 美元符号（‘`$$$$`’）。

You may split a long line by inserting a backslash followed by a newline, but this is not required, as `make` places no limit on the length of a line in a makefile.

​	您可以通过插入反斜杠后跟换行符来拆分一行，但这不是必需的，因为 `make` 在Makefile中的行长度上没有限制。

A rule tells `make` two things: when the targets are out of date, and how to update them when necessary.

​	规则向 `make` 传达两个信息：目标何时过时，以及在必要时如何更新它们。

The criterion for being out of date is specified in terms of the prerequisites, which consist of file names separated by spaces. (Wildcards and archive members (see [Using `make` to Update Archive Files](https://www.gnu.org/software/make/manual/make.html#Archives)) are allowed here too.) A target is out of date if it does not exist or if it is older than any of the prerequisites (by comparison of last-modification times). The idea is that the contents of the target file are computed based on information in the prerequisites, so if any of the prerequisites changes, the contents of the existing target file are no longer necessarily valid.

​	过时的标准是根据先决条件来指定的，先决条件由用空格分隔的文件名组成。（通配符和存档成员（参见[使用 `make` 更新存档文件](https://www.gnu.org/software/make/manual/make.html#Archives)）也可以在这里使用。）如果目标不存在，或者如果它的修改时间早于任何先决条件（通过比较最后修改时间），则目标过时。这个想法是目标文件的内容是根据先决条件中的信息计算的，所以如果任何先决条件发生变化，现有目标文件的内容就不再必然有效。

How to update is specified by a recipe. This is one or more lines to be executed by the shell (normally ‘sh’), but with some extra features (see [Writing Recipes in Rules](https://www.gnu.org/software/make/manual/make.html#Recipes)).

​	如何更新是通过配方来指定的。这是一个或多个由shell（通常是 'sh'）执行的行，但具有一些额外的功能（参见[在规则中编写配方](https://www.gnu.org/software/make/manual/make.html#Recipes)）。



## 4.3 先决条件的类型 4.3 Types of Prerequisites



There are two different types of prerequisites understood by GNU `make`: normal prerequisites, described in the previous section, and *order-only* prerequisites. A normal prerequisite makes two statements: first, it imposes an order in which recipes will be invoked: the recipes for all prerequisites of a target will be completed before the recipe for the target is started. Second, it imposes a dependency relationship: if any prerequisite is newer than the target, then the target is considered out-of-date and must be rebuilt.

​	GNU `make` 理解两种不同类型的先决条件：普通先决条件（在上一节中描述）和*仅顺序*先决条件。普通先决条件提出了两个声明：首先，它规定了调用配方的顺序：目标的所有先决条件的配方将在目标的配方开始之前完成。其次，它规定了依赖关系：如果任何先决条件比目标新，则目标被视为过时，必须重新构建。

Normally, this is exactly what you want: if a target’s prerequisite is updated, then the target should also be updated.

​	通常情况下，这正是您想要的：如果目标的先决条件已更新，那么目标也应该被更新。

Occasionally you may want to ensure that a prerequisite is built before a target, but *without* forcing the target to be updated if the prerequisite is updated. *Order-only* prerequisites are used to create this type of relationship. Order-only prerequisites can be specified by placing a pipe symbol (`|`) in the prerequisites list: any prerequisites to the left of the pipe symbol are normal; any prerequisites to the right are order-only:

​	偶尔，您可能希望确保在目标之前构建一个先决条件，但是*不希望*如果先决条件被更新就强制更新目标。*仅顺序*先决条件用于创建此类型的关系。可以通过在先决条件列表中放置管道符（`|`）来指定仅顺序先决条件：管道符左侧的任何先决条件都是普通的；管道符右侧的任何先决条件都是仅顺序的：

```
targets : normal-prerequisites | order-only-prerequisites
```

The normal prerequisites section may of course be empty. Also, you may still declare multiple lines of prerequisites for the same target: they are appended appropriately (normal prerequisites are appended to the list of normal prerequisites; order-only prerequisites are appended to the list of order-only prerequisites). Note that if you declare the same file to be both a normal and an order-only prerequisite, the normal prerequisite takes precedence (since they have a strict superset of the behavior of an order-only prerequisite).

​	当然，普通先决条件部分可能为空。此外，您仍然可以为同一个目标声明多行先决条件：它们会适当地附加（普通先决条件会附加到普通先决条件列表，仅顺序先决条件会附加到仅顺序先决条件列表）。请注意，如果将同一个文件同时声明为普通和仅顺序的先决条件，普通先决条件会优先（因为它们的行为是仅顺序先决条件的严格超集）。

Order-only prerequisites are never checked when determining if the target is out of date; even order-only prerequisites marked as phony (see [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)) will not cause the target to be rebuilt.

​	仅顺序先决条件在确定目标是否过时时永远不会被检查；即使将标记为伪目标的仅顺序先决条件（参见[伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)）也不会导致目标被重新构建。

Consider an example where your targets are to be placed in a separate directory, and that directory might not exist before `make` is run. In this situation, you want the directory to be created before any targets are placed into it but, because the timestamps on directories change whenever a file is added, removed, or renamed, we certainly don’t want to rebuild all the targets whenever the directory’s timestamp changes. One way to manage this is with order-only prerequisites: make the directory an order-only prerequisite on all the targets:

​	考虑一个示例，其中您的目标将放置在一个单独的目录中，而该目录在运行 `make` 之前可能不存在。在这种情况下，您希望在将任何目标放入其中之前创建目录，但是因为目录的时间戳会在添加、删除或重命名文件时更改，我们当然不希望在目录的时间戳更改时重新构建所有目标。管理这种情况的一种方法是使用仅顺序先决条件：将目录设置为所有目标的仅顺序先决条件：

```
OBJDIR := objdir
OBJS := $(addprefix $(OBJDIR)/,foo.o bar.o baz.o)

$(OBJDIR)/%.o : %.c
        $(COMPILE.c) $(OUTPUT_OPTION) $<

all: $(OBJS)

$(OBJS): | $(OBJDIR)

$(OBJDIR):
        mkdir $(OBJDIR)
```

Now the rule to create the objdir directory will be run, if needed, before any ‘.o’ is built, but no ‘.o’ will be built because the objdir directory timestamp changed.

​	现在，如果需要，在构建任何 'o' 文件之前将运行创建 objdir 目录的规则，但如果 objdir 目录的时间戳发生变化，不会构建任何 'o' 文件。



## 4.4 在文件名中使用通配符字符 4.4 Using Wildcard Characters in File Names



A single file name can specify many files using *wildcard characters*. The wildcard characters in `make` are ‘`*`’, ‘`?`’ and ‘`[…]`’, the same as in the Bourne shell. For example, `*.c` specifies a list of all the files (in the working directory) whose names end in ‘`.c`’.

​	一个单一的文件名可以使用*通配符字符*来指定许多文件。`make` 中的通配符字符包括 ‘`*`’、‘`?`’ 和 ‘`[…]`’，与 Bourne shell 中的相同。例如，`*.c` 指定了所有文件名（在工作目录中），其名称以 ‘`.c`’ 结尾。

If an expression matches multiple files then the results will be sorted.[2](https://www.gnu.org/software/make/manual/make.html#FOOT2) However multiple expressions will not be globally sorted. For example, `*.c` `*.h` will list all the files whose names end in ‘`.c`’, sorted, followed by all the files whose names end in ‘`.h`’, sorted.

​	如果一个表达式匹配多个文件，那么结果将被排序。然而，多个表达式不会被全局排序。例如，`*.c` `*.h` 将列出所有文件名以 ‘`.c`’ 结尾的文件，排序后，接着是所有文件名以 ‘`.h`’ 结尾的文件，也排序后。

The character ‘`~`’ at the beginning of a file name also has special significance. If alone, or followed by a slash, it represents your home directory. For example ~/bin expands to /home/you/bin. If the ‘~’ is followed by a word, the string represents the home directory of the user named by that word. For example ~john/bin expands to /home/john/bin. On systems which don’t have a home directory for each user (such as MS-DOS or MS-Windows), this functionality can be simulated by setting the environment variable HOME.

​	文件名开头的字符 ‘`~`’ 也具有特殊的意义。如果它单独出现，或者跟着一个斜杠，它代表您的主目录。例如，`~/bin` 展开为 `/home/you/bin`。如果 ‘`~`’ 后跟一个单词，该字符串代表由该单词命名的用户的主目录。例如，`~john/bin` 展开为 `/home/john/bin`。在没有为每个用户设置主目录的系统上（如 MS-DOS 或 MS-Windows），可以通过设置环境变量 HOME 来模拟此功能。

Wildcard expansion is performed by `make` automatically in targets and in prerequisites. In recipes, the shell is responsible for wildcard expansion. In other contexts, wildcard expansion happens only if you request it explicitly with the `wildcard` function.

​	在目标和先决条件中，`make` 会自动执行通配符扩展。在配方中，通配符扩展由 shell 负责。在其他上下文中，只有在您使用 `wildcard` 函数显式请求时，通配符扩展才会发生。

The special significance of a wildcard character can be turned off by preceding it with a backslash. Thus, `foo\*bar` would refer to a specific file whose name consists of ‘foo’, an asterisk, and ‘bar’.

​	通配符字符的特殊意义可以通过在其前面加上反斜杠来关闭。因此，`foo\*bar` 将引用一个特定的文件，其名称由 ‘foo’、一个星号和 ‘bar’ 组成。 



### 4.4.1 通配符示例 4.4.1 Wildcard Examples

Wildcards can be used in the recipe of a rule, where they are expanded by the shell. For example, here is a rule to delete all the object files:

​	通配符可以用在规则的配方中，它们会被 shell 扩展。例如，这里有一个规则来删除所有目标文件：

```
clean:
        rm -f *.o
```



Wildcards are also useful in the prerequisites of a rule. With the following rule in the makefile, ‘make print’ will print all the ‘.c’ files that have changed since the last time you printed them:

​	通配符在规则的先决条件中也很有用。使用下面的规则，在上次打印文件后，‘make print’ 将打印所有已更改的 ‘.c’ 文件：

```
print: *.c
        lpr -p $?
        touch print
```

This rule uses print as an empty target file; see [Empty Target Files to Record Events](https://www.gnu.org/software/make/manual/make.html#Empty-Targets). (The automatic variable ‘$?’ is used to print only those files that have changed; see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables).)

​	此规则将 `print` 用作一个空目标文件；参见[用空目标文件记录事件](https://www.gnu.org/software/make/manual/make.html#Empty-Targets)。（自动变量 ‘$?’ 用于仅打印已更改的文件；参见[自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)。）

Wildcard expansion does not happen when you define a variable. Thus, if you write this:

​	在定义变量时，通配符扩展不会发生。因此，如果您这样写：

```
objects = *.o
```

then the value of the variable `objects` is the actual string ‘*.o’. However, if you use the value of `objects` in a target or prerequisite, wildcard expansion will take place there. If you use the value of `objects` in a recipe, the shell may perform wildcard expansion when the recipe runs. To set `objects` to the expansion, instead use:

那么变量 `objects` 的值将是实际的字符串 ‘*.o’。但是，如果您在目标或先决条件中使用 `objects` 的值，通配符扩展将在那里发生。如果在配方中使用 `objects` 的值，shell 可能会在运行配方时执行通配符扩展。要将 `objects` 设置为扩展结果，可以使用：

```
objects := $(wildcard *.o)
```

See [The Function `wildcard`](https://www.gnu.org/software/make/manual/make.html#Wildcard-Function).

​	参见[函数 `wildcard`](https://www.gnu.org/software/make/manual/make.html#Wildcard-Function)。



### 4.4.2 使用通配符的陷阱 4.4.2 Pitfalls of Using Wildcards



Now here is an example of a naive way of using wildcard expansion, that does not do what you would intend. Suppose you would like to say that the executable file foo is made from all the object files in the directory, and you write this:

```
objects = *.o

foo : $(objects)
        cc -o foo $(CFLAGS) $(objects)
```

The value of `objects` is the actual string ‘*.o’. Wildcard expansion happens in the rule for foo, so that each *existing* ‘.o’ file becomes a prerequisite of foo and will be recompiled if necessary.

​	变量 `objects` 的值是实际的字符串 ‘`*.o`’。通配符扩展发生在 ‘foo’ 的规则中，所以每个 *现有的* ‘`.o`’ 文件都会成为 ‘foo’ 的先决条件，并在必要时重新编译。

But what if you delete all the ‘.o’ files? When a wildcard matches no files, it is left as it is, so then foo will depend on the oddly-named file *.o. Since no such file is likely to exist, `make` will give you an error saying it cannot figure out how to make *.o. This is not what you want!

​	但是，如果您删除了所有 ‘`.o`’ 文件呢？当通配符没有匹配的文件时，它会保持原样，所以 ‘foo’ 将依赖于奇怪命名的文件 `*.o`。由于不太可能存在这样的文件，`make` 将会给您一个错误，表示无法确定如何制作 `*.o`。这不是您想要的！

Actually it is possible to obtain the desired result with wildcard expansion, but you need more sophisticated techniques, including the `wildcard` function and string substitution. See [The Function `wildcard`](https://www.gnu.org/software/make/manual/make.html#Wildcard-Function).

​	实际上，通过通配符扩展可以获得所需的结果，但您需要更复杂的技巧，包括 `wildcard` 函数和字符串替换。参见[函数 `wildcard`](https://www.gnu.org/software/make/manual/make.html#Wildcard-Function)。

Microsoft operating systems (MS-DOS and MS-Windows) use backslashes to separate directories in pathnames, like so:

​	Microsoft 操作系统（MS-DOS 和 MS-Windows）使用反斜杠在路径名中分隔目录，如下所示：

```
  c:\foo\bar\baz.c
```

This is equivalent to the Unix-style c:/foo/bar/baz.c (the c: part is the so-called drive letter). When `make` runs on these systems, it supports backslashes as well as the Unix-style forward slashes in pathnames. However, this support does *not* include the wildcard expansion, where backslash is a quote character. Therefore, you *must* use Unix-style slashes in these cases.

​	这相当于 Unix 风格的 c:/foo/bar/baz.c（c: 部分是所谓的驱动器字母）。当 `make` 在这些系统上运行时，它支持反斜杠以及 Unix 风格的正斜杠作为路径名中的分隔符。然而，此支持不包括通配符扩展，其中反斜杠是引用字符。因此，在这些情况下，您*必须*使用 Unix 风格的斜杠。



### 4.4.3 函数 `wildcard` 4.4.3 The Function `wildcard`

Wildcard expansion happens automatically in rules. But wildcard expansion does not normally take place when a variable is set, or inside the arguments of a function. If you want to do wildcard expansion in such places, you need to use the `wildcard` function, like this:

​	通配符扩展在规则中自动发生。但是，在设置变量或函数的参数中，通常不会发生通配符扩展。如果要在这些地方进行通配符扩展，需要使用 `wildcard` 函数，如下所示：

```
$(wildcard pattern…)
```

This string, used anywhere in a makefile, is replaced by a space-separated list of names of existing files that match one of the given file name patterns. If no existing file name matches a pattern, then that pattern is omitted from the output of the `wildcard` function. Note that this is different from how unmatched wildcards behave in rules, where they are used verbatim rather than ignored (see [Pitfalls of Using Wildcards](https://www.gnu.org/software/make/manual/make.html#Wildcard-Pitfall)).

​	此字符串在 makefile 中的任何地方使用时，将被现有文件名称匹配给定文件名模式之一的名称的以空格分隔的列表替换。如果没有现有文件名与模式匹配，则该模式将从 `wildcard` 函数的输出中省略。请注意，这与规则中未匹配的通配符行为不同，规则中的通配符行为是按原样使用而不是被忽略的（参见[使用通配符的陷阱](https://www.gnu.org/software/make/manual/make.html#Wildcard-Pitfall)）。

As with wildcard expansion in rules, the results of the `wildcard` function are sorted. But again, each individual expression is sorted separately, so ‘$(wildcard *.c *.h)’ will expand to all files matching ‘.c’, sorted, followed by all files matching ‘.h’, sorted.

​	与规则中的通配符扩展一样，`wildcard` 函数的结果也是经过排序的。但是，每个单独的表达式都是分别排序的，因此 ‘`$(wildcard *.c *.h)`’ 将扩展为所有匹配 ‘`.c`’ 的文件，排序后，接着是所有匹配 ‘`.h`’ 的文件，也排序后。

One use of the `wildcard` function is to get a list of all the C source files in a directory, like this:

​	`wildcard` 函数的一个用途是获取目录中所有 C 源文件的列表，如下所示：

```
$(wildcard *.c)
```

We can change the list of C source files into a list of object files by replacing the ‘.c’ suffix with ‘.o’ in the result, like this:

​	我们可以通过将结果中的 ‘.c’ 后缀替换为 ‘.o’，将 C 源文件列表更改为对象文件列表，如下所示：

```
$(patsubst %.c,%.o,$(wildcard *.c))
```

(Here we have used another function, `patsubst`. See [Functions for String Substitution and Analysis](https://www.gnu.org/software/make/manual/make.html#Text-Functions).)

（在这里，我们还使用了另一个函数 `patsubst`。参见[用于字符串替换和分析的函数](https://www.gnu.org/software/make/manual/make.html#Text-Functions)。）

Thus, a makefile to compile all C source files in the directory and then link them together could be written as follows:

​	因此，可以编写一个用于编译目录中的所有 C 源文件，然后将它们链接在一起的 makefile，如下所示：

```
objects := $(patsubst %.c,%.o,$(wildcard *.c))

foo : $(objects)
        cc -o foo $(objects)
```

(This takes advantage of the implicit rule for compiling C programs, so there is no need to write explicit rules for compiling the files. See [The Two Flavors of Variables](https://www.gnu.org/software/make/manual/make.html#Flavors), for an explanation of ‘:=’, which is a variant of ‘=’.)

（这利用了编译 C 程序的隐含规则，因此不需要为编译文件编写显式规则。参见[变量的两种风格](https://www.gnu.org/software/make/manual/make.html#Flavors)，有关 ‘:=’ 的说明，它是 ‘=’ 的变体。）



## 4.5 在目录中搜索先决条件 4.5 Searching Directories for Prerequisites

For large systems, it is often desirable to put sources in a separate directory from the binaries. The *directory search* features of `make` facilitate this by searching several directories automatically to find a prerequisite. When you redistribute the files among directories, you do not need to change the individual rules, just the search paths.

​	在大型系统中，通常希望将源代码放在与二进制文件分开的目录中。`make` 的*目录搜索*功能可以通过自动在多个目录中搜索来查找先决条件。当您在目录之间重新分发文件时，您不需要更改单个规则，只需更改搜索路径。 





### 4.5.1 `VPATH`：搜索所有先决条件的路径 4.5.1 `VPATH`: Search Path for All Prerequisites



The value of the `make` variable `VPATH` specifies a list of directories that `make` should search. Most often, the directories are expected to contain prerequisite files that are not in the current directory; however, `make` uses `VPATH` as a search list for both prerequisites and targets of rules.

​	`make` 变量 `VPATH` 的值指定了 `make` 应该搜索的目录列表。通常情况下，这些目录应该包含不在当前目录中的先决条件文件；但是，`make` 将 `VPATH` 用作规则的先决条件和目标的搜索列表。

Thus, if a file that is listed as a target or prerequisite does not exist in the current directory, `make` searches the directories listed in `VPATH` for a file with that name. If a file is found in one of them, that file may become the prerequisite (see below). Rules may then specify the names of files in the prerequisite list as if they all existed in the current directory. See [Writing Recipes with Directory Search](https://www.gnu.org/software/make/manual/make.html#Recipes_002fSearch).

​	因此，如果一个目标或先决条件列出的文件在当前目录中不存在，`make` 将在 `VPATH` 中列出的目录中搜索具有相同名称的文件。如果在其中一个目录中找到文件，那么该文件可能成为先决条件（见下文）。规则可以将先决条件列表中的文件名指定为如果所有文件都存在于当前目录中。参见[使用目录搜索编写配方](https://www.gnu.org/software/make/manual/make.html#Recipes_002fSearch)。

In the `VPATH` variable, directory names are separated by colons or blanks. The order in which directories are listed is the order followed by `make` in its search. (On MS-DOS and MS-Windows, semi-colons are used as separators of directory names in `VPATH`, since the colon can be used in the pathname itself, after the drive letter.)

​	在 `VPATH` 变量中，目录名称由冒号或空格分隔。列出目录的顺序是 `make` 在搜索中遵循的顺序。（在 MS-DOS 和 MS-Windows 上，分号用作目录名称中的分隔符，因为冒号可以在驱动器字母之后在路径名本身中使用。）

For example,

例如，

```
VPATH = src:../headers
```

specifies a path containing two directories, src and ../headers, which `make` searches in that order.

​	指定了一个包含两个目录 src 和 `../headers` 的路径，`make` 将按照该顺序进行搜索。

With this value of `VPATH`, the following rule,

​	使用这个 `VPATH` 值，以下规则，

```
foo.o : foo.c
```

is interpreted as if it were written like this:

将被解释为如果写成如下：

```
foo.o : src/foo.c
```

assuming the file foo.c does not exist in the current directory but is found in the directory src.

假设文件 foo.c 在当前目录中不存在，但在目录 src 中找到。



### 4.5.2 `vpath` 指令 4.5.2 The `vpath` Directive



Similar to the `VPATH` variable, but more selective, is the `vpath` directive (note lower case), which allows you to specify a search path for a particular class of file names: those that match a particular pattern. Thus you can supply certain search directories for one class of file names and other directories (or none) for other file names.

​	类似于 `VPATH` 变量，但更有选择性的是 `vpath` 指令（注意小写），它允许您为特定类别的文件名指定搜索路径：与特定模式匹配的文件名。因此，您可以为一类文件名提供特定的搜索目录，为其他文件名提供其他目录（或无目录）。

There are three forms of the `vpath` directive:

​	`vpath` 指令有三种形式：

- `vpath pattern directories`

  Specify the search path directories for file names that match pattern.The search path, directories, is a list of directories to be searched, separated by colons (semi-colons on MS-DOS and MS-Windows) or blanks, just like the search path used in the `VPATH` variable.

  为与模式匹配的文件名指定搜索路径目录。搜索路径 `directories` 是一个由目录组成的列表，用冒号（在 MS-DOS 和 MS-Windows 上是分号）或空格分隔，就像在 `VPATH` 变量中使用的搜索路径一样。

- `vpath pattern`

  Clear out the search path associated with pattern.

  清除与模式相关联的搜索路径。

- `vpath`

  Clear all search paths previously specified with `vpath` directives.
  
  清除以前使用 `vpath` 指令指定的所有搜索路径。

A `vpath` pattern is a string containing a ‘%’ character. The string must match the file name of a prerequisite that is being searched for, the ‘%’ character matching any sequence of zero or more characters (as in pattern rules; see [Defining and Redefining Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)). For example, `%.h` matches files that end in `.h`. (If there is no ‘%’, the pattern must match the prerequisite exactly, which is not useful very often.)

​	`vpath` 模式是一个包含 ‘%’ 字符的字符串。该字符串必须与正在搜索的先决条件的文件名相匹配，‘%’ 字符与零个或多个字符的任意序列匹配（与模式规则中的模式相同；参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)）。例如，`%.h` 匹配以 `.h` 结尾的文件。（如果没有 ‘%’，则模式必须完全与先决条件匹配，这在很少有用。）

‘%’ characters in a `vpath` directive’s pattern can be quoted with preceding backslashes (‘\’). Backslashes that would otherwise quote ‘%’ characters can be quoted with more backslashes. Backslashes that quote ‘%’ characters or other backslashes are removed from the pattern before it is compared to file names. Backslashes that are not in danger of quoting ‘%’ characters go unmolested.

​	`vpath` 指令中的 ‘%’ 字符可以用前置的反斜杠（‘\’）进行引用。否则引用 ‘%’ 字符的反斜杠可以用更多的反斜杠进行引用。在比较文件名之前，从模式中删除不会用于引用 ‘%’ 字符或其他反斜杠的反斜杠。没有危险引用 ‘%’ 字符的反斜杠保持不变。

When a prerequisite fails to exist in the current directory, if the pattern in a `vpath` directive matches the name of the prerequisite file, then the directories in that directive are searched just like (and before) the directories in the `VPATH` variable.

​	当先决条件在当前目录中不存在时，如果 `vpath` 指令中的模式与先决条件文件的名称匹配，那么该指令中的目录会被搜索，就像在 `VPATH` 变量中的目录一样。

For example,

例如，

```
vpath %.h ../headers
```

tells `make` to look for any prerequisite whose name ends in .h in the directory ../headers if the file is not found in the current directory.

告诉 `make` 在目录 ../headers 中查找任何以 .h 结尾的先决条件，如果在当前目录中找不到文件。

If several `vpath` patterns match the prerequisite file’s name, then `make` processes each matching `vpath` directive one by one, searching all the directories mentioned in each directive. `make` handles multiple `vpath` directives in the order in which they appear in the makefile; multiple directives with the same pattern are independent of each other.

​	如果多个 `vpath` 模式与先决条件文件的名称匹配，则 `make` 会逐一处理每个匹配的 `vpath` 指令，搜索每个指令中提到的所有目录。`make` 按照它们在 makefile 中出现的顺序处理多个 `vpath` 指令；具有相同模式的多个指令是相互独立的。

Thus,

因此，

```
vpath %.c foo
vpath %   blish
vpath %.c bar
```

will look for a file ending in ‘.c’ in foo, then blish, then bar, while

将在 foo、然后是 blish、然后是 bar 中查找以 ‘.c’ 结尾的文件，而

```
vpath %.c foo:bar
vpath %   blish
```

will look for a file ending in ‘.c’ in foo, then bar, then blish.

将在 foo、然后是 bar、然后是 blish 中查找以 ‘.c’ 结尾的文件。



### 4.5.3 执行目录搜索的算法 4.5.3 How Directory Searches are Performed



When a prerequisite is found through directory search, regardless of type (general or selective), the pathname located may not be the one that `make` actually provides you in the prerequisite list. Sometimes the path discovered through directory search is thrown away.

​	当通过目录搜索找到一个先决条件时，无论是通用的还是选择性的，找到的路径名可能并不是 `make` 在先决条件列表中实际提供给您的路径名。有时候通过目录搜索发现的路径会被丢弃。

The algorithm `make` uses to decide whether to keep or abandon a path found via directory search is as follows:

​	`make` 用于决定是否保留或丢弃通过目录搜索找到的路径的算法如下： 

1. If a target file does not exist at the path specified in the makefile, directory search is performed.
2. 如果目标文件在 makefile 中指定的路径上不存在，执行目录搜索。
3. If the directory search is successful, that path is kept and this file is tentatively stored as the target.
4. 如果目录搜索成功，该路径被保留，并且该文件被暂时存储为目标。
5. All prerequisites of this target are examined using this same method.
6. 使用相同的方法检查该目标的所有先决条件。
7. After processing the prerequisites, the target may or may not need to be rebuilt:
8. 在处理完先决条件后，目标可能需要或不需要重新构建： 
   1. If the target does *not* need to be rebuilt, the path to the file found during directory search is used for any prerequisite lists which contain this target. In short, if `make` doesn’t need to rebuild the target then you use the path found via directory search.
   2. 如果目标*不需要*重新构建，则通过目录搜索找到的文件的路径用于包含该目标的任何先决条件列表。简而言之，如果 `make` 不需要重新构建目标，则使用通过目录搜索找到的路径。
   3. If the target *does* need to be rebuilt (is out-of-date), the pathname found during directory search is *thrown away*, and the target is rebuilt using the file name specified in the makefile. In short, if `make` must rebuild, then the target is rebuilt locally, not in the directory found via directory search.
   4. 如果目标*需要*重新构建（已过时），则通过目录搜索找到的路径将被*丢弃*，并且目标将使用在 makefile 中指定的文件名进行重新构建。简而言之，如果 `make` 必须重新构建，则目标将在本地重新构建，而不是通过目录搜索找到的目录中重新构建。

This algorithm may seem complex, but in practice it is quite often exactly what you want.

​	这个算法可能看起来复杂，但在实践中，它通常正是您所希望的。

Other versions of `make` use a simpler algorithm: if the file does not exist, and it is found via directory search, then that pathname is always used whether or not the target needs to be built. Thus, if the target is rebuilt it is created at the pathname discovered during directory search.

​	`make` 的其他版本使用了一个更简单的算法：如果文件不存在，并且通过目录搜索找到它，那么无论目标是否需要构建，都将始终使用该路径名。因此，如果目标被重新构建，它将在通过目录搜索找到的路径名处创建。

If, in fact, this is the behavior you want for some or all of your directories, you can use the `GPATH` variable to indicate this to `make`.

​	如果事实上，这是您希望某些或所有目录的行为，您可以使用 `GPATH` 变量将其通知给 `make`。

`GPATH` has the same syntax and format as `VPATH` (that is, a space- or colon-delimited list of pathnames). If an out-of-date target is found by directory search in a directory that also appears in `GPATH`, then that pathname is not thrown away. The target is rebuilt using the expanded path.

​	`GPATH` 与 `VPATH` 具有相同的语法和格式（即由空格或冒号分隔的路径名列表）。如果在通过目录搜索在也出现在 `GPATH` 中的目录中找到一个过时的目标，则不会丢弃该路径名。将使用扩展的路径重新构建目标。



### 4.5.4 使用目录搜索编写配方 4.5.4 Writing Recipes with Directory Search



When a prerequisite is found in another directory through directory search, this cannot change the recipe of the rule; they will execute as written. Therefore, you must write the recipe with care so that it will look for the prerequisite in the directory where `make` finds it.

​	当通过目录搜索在另一个目录中找到先决条件时，这不能更改规则的配方；它们将按照编写的方式执行。因此，您必须仔细编写配方，以便在 `make` 找到先决条件的目录中查找它们。

This is done with the *automatic variables* such as ‘`$^`’ (see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)). For instance, the value of ‘`$^`’ is a list of all the prerequisites of the rule, including the names of the directories in which they were found, and the value of ‘$@’ is the target. Thus:

​	这是使用*自动变量*来实现的，例如 ‘`$^`’（见[自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)）。例如，‘`$^`’ 的值是规则的所有先决条件的列表，包括它们的目录名称，以及 ‘$@’ 的值是目标。因此：

```
foo.o : foo.c
        cc -c $(CFLAGS) $^ -o $@
```

(The variable `CFLAGS` exists so you can specify flags for C compilation by implicit rules; we use it here for consistency so it will affect all C compilations uniformly; see [Variables Used by Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables).)

（变量 `CFLAGS` 存在，以便您可以通过隐式规则指定 C 编译的标志；我们在此处使用它是为了保持一致性，以便它会对所有 C 编译均产生影响；参见[隐式规则使用的变量](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)。）

Often the prerequisites include header files as well, which you do not want to mention in the recipe. The automatic variable ‘`$<`’ is just the first prerequisite:

​	通常，先决条件还包括头文件，您不希望在配方中提到。自动变量 ‘`$<`’ 仅为第一个先决条件：

```
VPATH = src:../headers
foo.o : foo.c defs.h hack.h
        cc -c $(CFLAGS) $< -o $@
```





### 4.5.5 目录搜索和隐含规则 4.5.5 Directory Search and Implicit Rules



The search through the directories specified in `VPATH` or with `vpath` also happens during consideration of implicit rules (see [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)).

​	在指定了 `VPATH` 或 `vpath` 中的目录中搜索的过程也会在考虑隐含规则时发生（见[使用隐含规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)）。

For example, when a file foo.o has no explicit rule, `make` considers implicit rules, such as the built-in rule to compile foo.c if that file exists. If such a file is lacking in the current directory, the appropriate directories are searched for it. If foo.c exists (or is mentioned in the makefile) in any of the directories, the implicit rule for C compilation is applied.

​	例如，当文件 foo.o 没有显式规则时，`make` 会考虑隐含规则，比如说如果存在文件 foo.c，则内置规则会编译它。如果在当前目录中缺少这样的文件，则会在适当的目录中搜索它。如果 foo.c 存在（或在 makefile 中提到）在任何一个目录中，就会应用用于 C 编译的隐含规则。

The recipes of implicit rules normally use automatic variables as a matter of necessity; consequently they will use the file names found by directory search with no extra effort.

​	隐含规则的配方通常使用自动变量作为必要性的一部分；因此，它们会使用目录搜索找到的文件名，无需额外的努力。



### 4.5.6 用于链接库的目录搜索 4.5.6 Directory Search for Link Libraries



Directory search applies in a special way to libraries used with the linker. This special feature comes into play when you write a prerequisite whose name is of the form ‘-lname’. (You can tell something strange is going on here because the prerequisite is normally the name of a file, and the *file name* of a library generally looks like libname.a, not like ‘-lname’.)

​	目录搜索在使用链接器的库时以特殊方式应用。当您编写一个名为 ‘-lname’ 形式的先决条件时，这种特殊功能就会发挥作用。（您可以通过先决条件通常是文件名来发现某些奇怪的事情，而库的*文件名*通常看起来像 libname.a，而不是像 ‘-lname’。）

When a prerequisite’s name has the form ‘-lname’, `make` handles it specially by searching for the file libname.so, and, if it is not found, for the file libname.a in the current directory, in directories specified by matching `vpath` search paths and the `VPATH` search path, and then in the directories /lib, /usr/lib, and prefix/lib (normally /usr/local/lib, but MS-DOS/MS-Windows versions of `make` behave as if prefix is defined to be the root of the DJGPP installation tree).

​	当先决条件的名称具有 ‘-lname’ 形式时，`make` 会通过搜索文件 libname.so 来处理它，如果找不到该文件，则会在当前目录中搜索文件 libname.a，以及在匹配的 `vpath` 搜索路径和 `VPATH` 搜索路径中搜索，然后在目录 /lib、/usr/lib 和前缀/lib（通常为 /usr/local/lib，但是 MS-DOS/MS-Windows 版本的 `make` 的行为与前缀被定义为 DJGPP 安装树的根相同）中搜索。

For example, if there is a /usr/lib/libcurses.a library on your system (and no /usr/lib/libcurses.so file), then

​	例如，如果您的系统上有 /usr/lib/libcurses.a 库（没有 /usr/lib/libcurses.so 文件），则

```
foo : foo.c -lcurses
        cc $^ -o $@
```

would cause the command ‘cc foo.c /usr/lib/libcurses.a -o foo’ to be executed when foo is older than foo.c or than /usr/lib/libcurses.a.

会在 foo 比 foo.c 或 /usr/lib/libcurses.a 旧时执行命令 ‘cc foo.c /usr/lib/libcurses.a -o foo’。

Although the default set of files to be searched for is libname.so and libname.a, this is customizable via the `.LIBPATTERNS` variable. Each word in the value of this variable is a pattern string. When a prerequisite like ‘-lname’ is seen, `make` will replace the percent in each pattern in the list with name and perform the above directory searches using each library file name.

​	虽然默认的要搜索的文件集是 libname.so 和 libname.a，但这可以通过 `.LIBPATTERNS` 变量进行自定义。此变量值中的每个单词都是一个模式字符串。当看到类似 ‘-lname’ 的先决条件时，`make` 将会将列表中每个模式中的百分号替换为名称，并使用每个库文件名执行上述目录搜索。

The default value for `.LIBPATTERNS` is ‘lib%.so lib%.a’, which provides the default behavior described above.

​	`.LIBPATTERNS` 的默认值是 ‘lib%.so lib%.a’，这提供了上述默认行为。

You can turn off link library expansion completely by setting this variable to an empty value.

​	您可以通过将此变量设置为空值来完全关闭链接库扩展。



## 4.6 虚拟目标 4.6 Phony Targets



A phony target is one that is not really the name of a file; rather it is just a name for a recipe to be executed when you make an explicit request. There are two reasons to use a phony target: to avoid a conflict with a file of the same name, and to improve performance.

​	虚拟目标是一个实际上不是文件名的目标；相反，它只是在明确请求进行构建时要执行的配方的名称。使用虚拟目标有两个原因：避免与同名文件冲突，以及提高性能。

If you write a rule whose recipe will not create the target file, the recipe will be executed every time the target comes up for remaking. Here is an example:

​	如果您编写一个规则，其配方不会创建目标文件，则每当目标需要重新构建时，都会执行该配方。以下是一个示例：

```
clean:
        rm *.o temp
```

Because the `rm` command does not create a file named clean, probably no such file will ever exist. Therefore, the `rm` command will be executed every time you say ‘make clean’.

​	由于 `rm` 命令不会创建名为 clean 的文件，因此可能永远不会存在这样的文件。因此，每当您输入 ‘make clean’ 时，`rm` 命令都会被执行。

In this example, the clean target will not work properly if a file named clean is ever created in this directory. Since it has no prerequisites, clean would always be considered up to date and its recipe would not be executed. To avoid this problem you can explicitly declare the target to be phony by making it a prerequisite of the special target `.PHONY` (see [Special Built-in Target Names](https://www.gnu.org/software/make/manual/make.html#Special-Targets)) as follows:

​	在这个示例中，如果在此目录中创建了一个名为 clean 的文件，clean 目标将无法正常工作。由于它没有先决条件，clean 将始终被视为已更新，并且其配方将不会被执行。为避免此问题，您可以通过将其声明为 `.PHONY` 的先决条件（参见[特殊内置目标名称](https://www.gnu.org/software/make/manual/make.html#Special-Targets)）来显式地声明该目标为虚拟目标：

```
.PHONY: clean
clean:
        rm *.o temp
```

Once this is done, ‘make clean’ will run the recipe regardless of whether there is a file named clean.

​	完成此操作后，‘make clean’ 将在是否存在名为 clean 的文件的情况下都运行该配方。

Prerequisites of `.PHONY` are always interpreted as literal target names, never as patterns (even if they contain ‘%’ characters). To always rebuild a pattern rule consider using a “force target” (see [Rules without Recipes or Prerequisites](https://www.gnu.org/software/make/manual/make.html#Force-Targets)).

​	`.PHONY` 的先决条件始终被解释为字面目标名称，从不解释为模式（即使它们包含 ‘%’ 字符）。为了始终重新构建模式规则，考虑使用“强制目标”（参见[没有配方或先决条件的规则](https://www.gnu.org/software/make/manual/make.html#Force-Targets)）。

Phony targets are also useful in conjunction with recursive invocations of `make` (see [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)). In this situation the makefile will often contain a variable which lists a number of sub-directories to be built. A simplistic way to handle this is to define one rule with a recipe that loops over the sub-directories, like this:

​	虚拟目标在与 `make` 的递归调用一起使用时也很有用（参见[递归使用 `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)）。在这种情况下，makefile 通常会包含一个变量，其中列出了要构建的多个子目录。处理这种情况的简单方法是定义一个具有循环遍历子目录的配方的规则，如下所示：

```
SUBDIRS = foo bar baz

subdirs:
        for dir in $(SUBDIRS); do \
          $(MAKE) -C $$dir; \
        done
```

There are problems with this method, however. First, any error detected in a sub-make is ignored by this rule, so it will continue to build the rest of the directories even when one fails. This can be overcome by adding shell commands to note the error and exit, but then it will do so even if `make` is invoked with the `-k` option, which is unfortunate. Second, and perhaps more importantly, you cannot take full advantage of `make`’s ability to build targets in parallel (see [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel)), since there is only one rule. Each individual makefile’s targets will be built in parallel, but only one sub-directory will be built at a time.

​	然而，这种方法存在问题。首先，忽略子 make 中检测到的任何错误，这样即使其中一个失败，它也将继续构建其余的目录。这可以通过添加 shell 命令来注意错误并退出来克服，但是在使用 `-k` 选项调用 `make` 时，它也会执行此操作，这是不合适的。其次，更重要的是，您无法充分利用 `make` 并行构建目标的能力（参见[并行执行](https://www.gnu.org/software/make/manual/make.html#Parallel)），因为只有一个规则。每个单独的 makefile 的目标将在并行构建，但一次只有一个子目录会被构建。

By declaring the sub-directories as `.PHONY` targets (you must do this as the sub-directory obviously always exists; otherwise it won’t be built) you can remove these problems:

​	通过将子目录声明为 `.PHONY` 目标（您必须这样做，因为子目录显然总是存在的；否则它不会被构建），您可以解决这些问题：

```
SUBDIRS = foo bar baz

.PHONY: subdirs $(SUBDIRS)

subdirs: $(SUBDIRS)

$(SUBDIRS):
        $(MAKE) -C $@

foo: baz
```

Here we’ve also declared that the foo sub-directory cannot be built until after the baz sub-directory is complete; this kind of relationship declaration is particularly important when attempting parallel builds.

​	在这里，我们还声明了在完成 baz 子目录之后才能构建 foo 子目录；当尝试并行构建时，此类关系声明尤其重要。

The implicit rule search (see [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)) is skipped for `.PHONY` targets. This is why declaring a target as `.PHONY` is good for performance, even if you are not worried about the actual file existing.

​	隐含规则搜索（参见[使用隐含规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)）对 `.PHONY` 目标不起作用。这就是为什么将目标声明为 `.PHONY` 对性能有好处的原因，即使您不担心实际文件的存在。

A phony target should not be a prerequisite of a real target file; if it is, its recipe will be run every time `make` considers that file. As long as a phony target is never a prerequisite of a real target, the phony target recipe will be executed only when the phony target is a specified goal (see [Arguments to Specify the Goals](https://www.gnu.org/software/make/manual/make.html#Goals)).

​	虚拟目标不应该是实际目标文件的先决条件；如果是这样，其配方将在每次 `make` 考虑该文件时运行。只要虚拟目标不是实际目标的先决条件，虚拟目标的配方将仅在显式地请求时才运行。

You should not declare an included makefile as phony. Phony targets are not intended to represent real files, and because the target is always considered out of date make will always rebuild it then re-execute itself (see [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)). To avoid this, `make` will not re-execute itself if an included file marked as phony is re-built.

​	您不应该将一个包含在内的 makefile 声明为虚拟目标。虚拟目标不意味着代表真实文件，因为该目标始终被认为是过时的，`make` 将总是重新构建它，然后重新执行自身（参见[如何重新生成 Makefile](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)）。为避免这种情况，如果被标记为虚拟目标的包含文件被重新构建，`make` 不会重新执行自身。

Phony targets can have prerequisites. When one directory contains multiple programs, it is most convenient to describe all of the programs in one makefile ./Makefile. Since the target remade by default will be the first one in the makefile, it is common to make this a phony target named ‘all’ and give it, as prerequisites, all the individual programs. For example:

​	虚拟目标可以有先决条件。当一个目录包含多个程序时，最方便的做法是在一个 makefile `./Makefile` 中描述所有的程序。由于默认情况下，将被重新构建的目标是 makefile 中的第一个目标，因此通常将其作为名为 `all` 的虚拟目标，并将所有的单独程序作为其先决条件。例如：

```
all : prog1 prog2 prog3
.PHONY : all

prog1 : prog1.o utils.o
        cc -o prog1 prog1.o utils.o

prog2 : prog2.o
        cc -o prog2 prog2.o

prog3 : prog3.o sort.o utils.o
        cc -o prog3 prog3.o sort.o utils.o
```

Now you can say just ‘make’ to remake all three programs, or specify as arguments the ones to remake (as in ‘make prog1 prog3’). Phoniness is not inherited: the prerequisites of a phony target are not themselves phony, unless explicitly declared to be so.

​	现在您可以只输入 `make` 来重新生成所有三个程序，或者将要重新生成的程序作为参数指定（例如 `make prog1 prog3`）。虚拟目标不会被继承：虚拟目标的先决条件本身不会被视为虚拟目标，除非显式声明为虚拟目标。

When one phony target is a prerequisite of another, it serves as a subroutine of the other. For example, here ‘make cleanall’ will delete the object files, the difference files, and the file program:

​	当一个虚拟目标是另一个虚拟目标的先决条件时，它将作为另一个目标的子例程。例如，这里的 `make cleanall` 将删除对象文件、差异文件和文件 program：

```
.PHONY: cleanall cleanobj cleandiff

cleanall : cleanobj cleandiff
        rm program

cleanobj :
        rm *.o

cleandiff :
        rm *.diff
```



在执行 `make cleanall` 时，将运行 `cleanobj` 和 `cleandiff` 的配方。 ？？

## 4.7 无配方或先决条件的规则 4.7 Rules without Recipes or Prerequisites



If a rule has no prerequisites or recipe, and the target of the rule is a nonexistent file, then `make` imagines this target to have been updated whenever its rule is run. This implies that all targets depending on this one will always have their recipe run.

​	如果一个规则没有先决条件或配方，并且规则的目标是一个不存在的文件，那么 `make` 会假设每当运行其规则时，目标已被更新。这意味着所有依赖于这个目标的目标都将始终运行其配方。

An example will illustrate this:

​	下面的示例将说明这一点：

```
clean: FORCE
        rm $(objects)
FORCE:
```

Here the target ‘FORCE’ satisfies the special conditions, so the target clean that depends on it is forced to run its recipe. There is nothing special about the name ‘FORCE’, but that is one name commonly used this way.

​	在这里，目标 'FORCE' 满足特殊条件，因此依赖于它的 'clean' 目标被强制运行其配方。'FORCE' 的名称没有什么特别之处，但通常以这种方式使用。

As you can see, using ‘FORCE’ this way has the same results as using ‘.PHONY: clean’.

​	正如你所看到的，以这种方式使用 'FORCE' 与使用 '.PHONY: clean' 具有相同的结果。

Using ‘.PHONY’ is more explicit and more efficient. However, other versions of `make` do not support ‘.PHONY’; thus ‘FORCE’ appears in many makefiles. See [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets).

​	使用 '.PHONY' 更加明确和高效。然而，其他版本的 `make` 不支持 '.PHONY'；因此，在许多 makefile 中都会出现 'FORCE'。参见 [伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)。



## 4.8 用空目标文件记录事件 4.8 Empty Target Files to Record Events



The *empty target* is a variant of the phony target; it is used to hold recipes for an action that you request explicitly from time to time. Unlike a phony target, this target file can really exist; but the file’s contents do not matter, and usually are empty.

​	*空目标* 是伪目标的一种变体；它用于保存你不时明确请求的动作的配方。与伪目标不同，这个目标文件实际上可以存在；但是文件的内容无关紧要，通常为空。

The purpose of the empty target file is to record, with its last-modification time, when the rule’s recipe was last executed. It does so because one of the commands in the recipe is a `touch` command to update the target file.

​	空目标文件的目的是通过其最后修改时间来记录规则配方的最后执行时间。这样做是因为配方中的某个命令是用于更新目标文件的 `touch` 命令。

The empty target file should have some prerequisites (otherwise it doesn’t make sense). When you ask to remake the empty target, the recipe is executed if any prerequisite is more recent than the target; in other words, if a prerequisite has changed since the last time you remade the target. Here is an example:

​	空目标文件应该有一些先决条件（否则就没有意义）。当你要重新生成空目标时，如果任何先决条件比目标更新，那么配方将被执行；换句话说，如果先决条件自上次重新生成目标以来发生了变化。以下是一个示例：

```
print: foo.c bar.c
        lpr -p $?
        touch print
```

With this rule, ‘make print’ will execute the `lpr` command if either source file has changed since the last ‘make print’. The automatic variable ‘$?’ is used to print only those files that have changed (see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)).

​	在这个规则中，当自上次 'make print' 以来任何源文件都发生了变化时，`lpr` 命令将被执行。自动变量 '$?' 被用于仅打印那些已更改的文件（参见 [自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)）。



## 4.9 特殊的内置目标名称 4.9 Special Built-in Target Names

Certain names have special meanings if they appear as targets.

​	如果特定名称出现为目标，则具有特殊含义。

- `.PHONY`

  The prerequisites of the special target `.PHONY` are considered to be phony targets. When it is time to consider such a target, `make` will run its recipe unconditionally, regardless of whether a file with that name exists or what its last-modification time is. See [Phony Targets](https://www.gnu.org/software/make/manual/make.html#Phony-Targets).

  特殊目标 `.PHONY` 的先决条件被视为伪目标。在考虑此类目标时，`make` 将无条件地运行其配方，无论是否存在具有该名称的文件以及其最后修改时间如何。参见 [伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)。

- `.SUFFIXES`

  The prerequisites of the special target `.SUFFIXES` are the list of suffixes to be used in checking for suffix rules. See [Old-Fashioned Suffix Rules](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules).

  特殊目标 `.SUFFIXES` 的先决条件是用于检查后缀规则的后缀列表。参见 [过时的后缀规则](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules)。

- `.DEFAULT`

  The recipe specified for `.DEFAULT` is used for any target for which no rules are found (either explicit rules or implicit rules). See [Defining Last-Resort Default Rules](https://www.gnu.org/software/make/manual/make.html#Last-Resort). If a `.DEFAULT` recipe is specified, every file mentioned as a prerequisite, but not as a target in a rule, will have that recipe executed on its behalf. See [Implicit Rule Search Algorithm](https://www.gnu.org/software/make/manual/make.html#Implicit-Rule-Search).

  为 `.DEFAULT` 指定的配方用于在未找到规则的情况下构建任何目标（无论是显式规则还是隐式规则）。参见 [定义备用默认规则](https://www.gnu.org/software/make/manual/make.html#Last-Resort)。如果指定了 `.DEFAULT` 配方，对于在规则中作为先决条件但不作为目标的每个文件，都将以其代表的文件名代表其执行配方。参见 [隐式规则搜索算法](https://www.gnu.org/software/make/manual/make.html#Implicit-Rule-Search)。

- `.PRECIOUS`

  The targets which `.PRECIOUS` depends on are given the following special treatment: if `make` is killed or interrupted during the execution of their recipes, the target is not deleted. See [Interrupting or Killing `make`](https://www.gnu.org/software/make/manual/make.html#Interrupts). Also, if the target is an intermediate file, it will not be deleted after it is no longer needed, as is normally done. See [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules). In this latter respect it overlaps with the `.SECONDARY` special target.You can also list the target pattern of an implicit rule (such as ‘%.o’) as a prerequisite file of the special target `.PRECIOUS` to preserve intermediate files created by rules whose target patterns match that file’s name.

  `.PRECIOUS` 依赖的目标将获得以下特殊处理：如果在执行其配方时 `make` 被终止或中断，目标不会被删除。参见 [中断或终止 `make`](https://www.gnu.org/software/make/manual/make.html#Interrupts)。此外，如果目标是中间文件，它将在不再需要它后不会被删除，这与通常的做法不同。参见 [隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。在这方面，它与 `.SECONDARY` 特殊目标重叠。你还可以将隐式规则的目标模式（例如‘%.o’）作为 `.PRECIOUS` 的先决条件文件，以保留使用目标模式匹配该文件名的规则创建的中间文件。

- `.INTERMEDIATE`

  The targets which `.INTERMEDIATE` depends on are treated as intermediate files. See [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules). `.INTERMEDIATE` with no prerequisites has no effect.

  `.INTERMEDIATE` 依赖的目标被视为中间文件。参见 [隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。没有先决条件的 `.INTERMEDIATE` 不产生任何效果。

- `.NOTINTERMEDIATE`

  Prerequisites of the special target `.NOTINTERMEDIATE` are never considered intermediate files. See [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules). `.NOTINTERMEDIATE` with no prerequisites causes all targets to be treated as not intermediate.If the prerequisite is a target pattern then targets that are built using that pattern rule are not considered intermediate.

  特殊目标 `.NOTINTERMEDIATE` 的先决条件从不被视为中间文件。参见 [隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。没有先决条件的 `.NOTINTERMEDIATE` 导致所有目标被视为非中间文件。如果先决条件是目标模式，那么使用该模式规则构建的目标不会被视为中间文件。

- `.SECONDARY`

  The targets which `.SECONDARY` depends on are treated as intermediate files, except that they are never automatically deleted. See [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules).`.SECONDARY` can be used to avoid redundant rebuilds in some unusual situations. For example:

  `.SECONDARY` 依赖的目标被视为中间文件，但它们永远不会被自动删除。参见 [隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。`.SECONDARY` 可用于避免某些不寻常情况下的冗余重新构建。例如：

  ```makefile
  hello.bin: hello.o bye.o
          $(CC) -o $@ $^
  
  %.o: %.c
          $(CC) -c -o $@ $<
  
  .SECONDARY: hello.o bye.o
  ```

  Suppose hello.bin is up to date in regards to the source files, *but* the object file hello.o is missing. Without `.SECONDARY` make would rebuild hello.o then rebuild hello.bin even though the source files had not changed. By declaring hello.o as `.SECONDARY` `make` will not need to rebuild it and won’t need to rebuild hello.bin either. Of course, if one of the source files *were* updated then all object files would be rebuilt so that the creation of hello.bin could succeed.`.SECONDARY` with no prerequisites causes all targets to be treated as secondary (i.e., no target is removed because it is considered intermediate).

  假设 `hello.bin` 对于源文件来说是最新的，*但是*对象文件 `hello.o` 丢失。没有 `.SECONDARY`，`make` 将重新构建 `hello.o`，然后重新构建 `hello.bin`，即使源文件没有更改。通过将 `hello.o` 声明为 `.SECONDARY`，`make` 将不需要重新构建它，也不需要重新构建 `hello.bin`。当然，如果其中一个源文件进行了更新，则所有对象文件都将被重新构建，以便可以成功创建 `hello.bin`。没有先决条件的 `.SECONDARY` 导致所有目标被视为中间目标（即不会删除目标，因为它被视为中间文件）。

- `.SECONDEXPANSION`

  If `.SECONDEXPANSION` is mentioned as a target anywhere in the makefile, then all prerequisite lists defined *after* it appears will be expanded a second time after all makefiles have been read in. See [Secondary Expansion](https://www.gnu.org/software/make/manual/make.html#Secondary-Expansion).

  如果在 makefile 的任何地方提及了 `.SECONDEXPANSION` 作为目标，那么在读取所有 makefile 后，所有在其后定义的先决条件列表将在第二次展开。参见 [Secondary Expansion](https://www.gnu.org/software/make/manual/make.html#Secondary-Expansion)。

- `.DELETE_ON_ERROR`

  If `.DELETE_ON_ERROR` is mentioned as a target anywhere in the makefile, then `make` will delete the target of a rule if it has changed and its recipe exits with a nonzero exit status, just as it does when it receives a signal. See [Errors in Recipes](https://www.gnu.org/software/make/manual/make.html#Errors).

  如果在 makefile 的任何地方提及了 `.DELETE_ON_ERROR` 作为目标，那么如果规则的目标发生更改且其配方以非零退出状态退出，`make` 将删除目标，就像在收到信号时一样。参见 [错误的配方](https://www.gnu.org/software/make/manual/make.html#Errors)。

- `.IGNORE`

  If you specify prerequisites for `.IGNORE`, then `make` will ignore errors in execution of the recipe for those particular files. The recipe for `.IGNORE` (if any) is ignored.If mentioned as a target with no prerequisites, `.IGNORE` says to ignore errors in execution of recipes for all files. This usage of ‘.IGNORE’ is supported only for historical compatibility. Since this affects every recipe in the makefile, it is not very useful; we recommend you use the more selective ways to ignore errors in specific recipes. See [Errors in Recipes](https://www.gnu.org/software/make/manual/make.html#Errors).

  如果为 `.IGNORE` 指定了先决条件，那么 `make` 将忽略执行这些特定文件的配方中的错误。将忽略 `.IGNORE` 的配方（如果有）。如果没有先决条件地作为目标提及 `.IGNORE`，则表示在执行所有文件的配方之前不要打印任何配方。此对 ‘.IGNORE’ 的使用仅出于历史兼容性而支持。由于这会影响 makefile 中的每个配方，因此它不是非常有用；我们建议您使用更选择性的方式来忽略特定配方中的错误。参见 [错误的配方](https://www.gnu.org/software/make/manual/make.html#Errors)。

- `.LOW_RESOLUTION_TIME`

  If you specify prerequisites for `.LOW_RESOLUTION_TIME`, `make` assumes that these files are created by commands that generate low resolution time stamps. The recipe for the `.LOW_RESOLUTION_TIME` target are ignored.The high resolution file time stamps of many modern file systems lessen the chance of `make` incorrectly concluding that a file is up to date. Unfortunately, some hosts do not provide a way to set a high resolution file time stamp, so commands like ‘cp -p’ that explicitly set a file’s time stamp must discard its sub-second part. If a file is created by such a command, you should list it as a prerequisite of `.LOW_RESOLUTION_TIME` so that `make` does not mistakenly conclude that the file is out of date. For example:

  如果为 `.LOW_RESOLUTION_TIME` 指定了先决条件，`make` 将假定这些文件由生成低分辨率时间戳的命令创建。将忽略 `.LOW_RESOLUTION_TIME` 目标的配方。许多现代文件系统的高分辨率文件时间戳降低了 `make` 错误地认为文件是最新的机会。不幸的是，一些主机不提供设置高分辨率文件时间戳的方法，因此显式设置文件的时间戳的命令（如 ‘cp -p’）必须丢弃其子秒部分。如果文件是由这样的命令创建的，您应将其列为 `.LOW_RESOLUTION_TIME` 的先决条件，以便 `make` 不会错误地认为文件已过时。例如：

  ```makefile
  .LOW_RESOLUTION_TIME: dst
  dst: src
          cp -p src dst
  ```

  Since ‘cp -p’ discards the sub-second part of src’s time stamp, dst is typically slightly older than src even when it is up to date. The `.LOW_RESOLUTION_TIME` line causes `make` to consider dst to be up to date if its time stamp is at the start of the same second that src’s time stamp is in.Due to a limitation of the archive format, archive member time stamps are always low resolution. You need not list archive members as prerequisites of `.LOW_RESOLUTION_TIME`, as `make` does this automatically.

  由于 ‘cp -p’ 丢弃了 src 的时间戳的子秒部分，所以即使它是最新的，dst 通常也比 src 旧。`.LOW_RESOLUTION_TIME` 行使 `make` 将 dst 视为最新的，如果其时间戳在与 src 的时间戳相同的第一秒的开始处。由于存档格式的限制，存档成员时间戳始终是低分辨率的。您不需要将存档成员列为 `.LOW_RESOLUTION_TIME` 的先决条件，因为 `make` 会自动执行此操作。

- `.SILENT`

  If you specify prerequisites for `.SILENT`, then `make` will not print the recipe used to remake those particular files before executing them. The recipe for `.SILENT` is ignored.If mentioned as a target with no prerequisites, `.SILENT` says not to print any recipes before executing them. You may also use more selective ways to silence specific recipe command lines. See [Recipe Echoing](https://www.gnu.org/software/make/manual/make.html#Echoing). If you want to silence all recipes for a particular run of `make`, use the ‘-s’ or ‘--silent’ option (see [Summary of Options](https://www.gnu.org/software/make/manual/make.html#Options-Summary)).

  如果为 `.SILENT` 指定了先决条件，那么 `make` 将在执行这些特定文件的配方之前不会打印用于重新制作它们的配方。将忽略 `.SILENT` 目标的配方。如果没有先决条件地作为目标提及 `.SILENT`，则表示在执行它们之前不要打印任何配方。您还可以使用更选择性的方法来静音特定配方命令行。参见 [配方回显](https://www.gnu.org/software/make/manual/make.html#Echoing)。如果要在特定 `make` 运行的所有配方中都取消静音，请使用 ‘-s’ 或 ‘--silent’ 选项（参见 [选项总览](https://www.gnu.org/software/make/manual/make.html#Options-Summary)）。

- `.EXPORT_ALL_VARIABLES`

  Simply by being mentioned as a target, this tells `make` to export all variables to child processes by default. This is an alternative to using `export` with no arguments. See [Communicating Variables to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Variables_002fRecursion).

  仅通过作为目标提及此项，`make` 将默认导出所有变量给子进程。这是与使用不带参数的 `export` 相同的一种选择。参见 [将变量传递给子 `make`](https://www.gnu.org/software/make/manual/make.html#Variables_002fRecursion)。

- `.NOTPARALLEL`

  If `.NOTPARALLEL` is mentioned as a target with no prerequisites, all targets in this invocation of `make` will be run serially, even if the ‘-j’ option is given. Any recursively invoked `make` command will still run recipes in parallel (unless its makefile also contains this target).If `.NOTPARALLEL` has targets as prerequisites, then all the prerequisites of those targets will be run serially. This implicitly adds a `.WAIT` between each prerequisite of the listed targets. See [Disabling Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Disable).

  如果没有先决条件地作为目标提及 `.NOTPARALLEL`，则在此次 `make` 调用中，所有目标都将串行运行，即使给定了 ‘-j’ 选项。任何递归调用的 `make` 命令仍将并行运行配方（除非其 makefile 也包含此目标）。如果 `.NOTPARALLEL` 有目标作为先决条件，则这些目标的所有先决条件都将串行运行。这在列出的目标之间添加了 `.WAIT`。参见 [禁用并行执行](https://www.gnu.org/software/make/manual/make.html#Parallel-Disable)。

- `.ONESHELL`

  If `.ONESHELL` is mentioned as a target, then when a target is built all lines of the recipe will be given to a single invocation of the shell rather than each line being invoked separately. See [Recipe Execution](https://www.gnu.org/software/make/manual/make.html#Execution).

  如果为 `.ONESHELL` 指定了目标，那么构建目标时，配方的所有行都将传递给单个 shell 调用，而不是单独调用每一行。参见 [配方执行](https://www.gnu.org/software/make/manual/make.html#Execution)。

- `.POSIX`

  If `.POSIX` is mentioned as a target, then the makefile will be parsed and run in POSIX-conforming mode. This does *not* mean that only POSIX-conforming makefiles will be accepted: all advanced GNU `make` features are still available. Rather, this target causes `make` to behave as required by POSIX in those areas where `make`’s default behavior differs.In particular, if this target is mentioned then recipes will be invoked as if the shell had been passed the `-e` flag: the first failing command in a recipe will cause the recipe to fail immediately.
  
  如果为 `.POSIX` 指定了目标，那么将以 POSIX 符合模式解析和运行 makefile。这*不*意味着只有符合 POSIX 的 makefile 将被接受：所有高级的 GNU `make` 特性仍然可用。相反，此目标会使 `make` 在 `make` 的默认行为与 POSIX 不同的地方表现出 POSIX 所要求的行为。特别地，如果提到了此目标，那么会像 shell 已经传递了 `-e` 标志一样调用配方：在配方中的第一个失败的命令将立即导致配方失败。

Any defined implicit rule suffix also counts as a special target if it appears as a target, and so does the concatenation of two suffixes, such as ‘.c.o’. These targets are suffix rules, an obsolete way of defining implicit rules (but a way still widely used). In principle, any target name could be special in this way if you break it in two and add both pieces to the suffix list. In practice, suffixes normally begin with ‘.’, so these special target names also begin with ‘.’. See [Old-Fashioned Suffix Rules](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules).

​	在任何目标中定义的隐式规则后缀也算作特殊目标，如果它出现为目标，两个后缀的连接也是特殊目标，例如 ‘.c.o’。这些目标是后缀规则，一种已过时的定义隐式规则的方式（但仍广泛使用）。原则上，任何目标名称都可以是这种方式的特殊目标，如果将其分为两个部分并将两个部分都添加到后缀列表中。实际上，后缀通常以 ‘.’ 开头，因此这些特殊目标名称也以 ‘.’ 开头。参见 [过时的后缀规则](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules)。



## 4.10 一条规则中的多个目标 4.10 Multiple Targets in a Rule

When an explicit rule has multiple targets they can be treated in one of two possible ways: as independent targets or as grouped targets. The manner in which they are treated is determined by the separator that appears after the list of targets.

​	当显式规则具有多个目标时，可以以两种可能的方式之一处理它们：作为独立目标或作为分组目标。它们的处理方式由在目标列表之后出现的分隔符确定。

### 独立目标的规则 Rules with Independent Targets

Rules that use the standard target separator, `:`, define independent targets. This is equivalent to writing the same rule once for each target, with duplicated prerequisites and recipes. Typically, the recipe would use automatic variables such as ‘$@’ to specify which target is being built.

​	使用标准目标分隔符 `:` 的规则定义独立目标。这等效于为每个目标编写相同的规则，具有重复的先决条件和配方。通常，配方会使用自动变量，如‘$@’，以指定正在构建的目标。

Rules with independent targets are useful in two cases:

​	独立目标的规则在两种情况下很有用：

- You want just prerequisites, no recipe. For example:

- 您只希望有先决条件，没有配方。例如：

  ```
  kbd.o command.o files.o: command.h
  ```

  gives an additional prerequisite to each of the three object files mentioned. It is equivalent to writing:

  为每个三个目标文件添加了一个额外的先决条件。它等同于编写：

  ```
  kbd.o: command.h
  command.o: command.h
  files.o: command.h
  ```

- Similar recipes work for all the targets. The automatic variable ‘$@’ can be used to substitute the particular target to be remade into the commands (see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)). For example:

- 类似的配方适用于所有目标。自动变量 ‘$@’ 可用于将特定目标替换为命令中的内容（参见 [自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)）。例如：

  ```
bigoutput littleoutput : text.g
          generate text.g -$(subst output,,$@) > $@
```
  
is equivalent to
  
等效于：
  
```
  bigoutput : text.g
          generate text.g -big > bigoutput
  littleoutput : text.g
          generate text.g -little > littleoutput
```
  
Here we assume the hypothetical program `generate` makes two types of output, one if given ‘-big’ and one if given ‘-little’. See [Functions for String Substitution and Analysis](https://www.gnu.org/software/make/manual/make.html#Text-Functions), for an explanation of the `subst` function.
  
在这里，我们假设假设的程序 `generate` 生成两种类型的输出，一个是给定 ‘-big’，另一个是给定 ‘-little’。参见 [字符串替换和分析函数](https://www.gnu.org/software/make/manual/make.html#Text-Functions)，以了解 `subst` 函数的解释。

Suppose you would like to vary the prerequisites according to the target, much as the variable ‘$@’ allows you to vary the recipe. You cannot do this with multiple targets in an ordinary rule, but you can do it with a *static pattern rule*. See [Static Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Static-Pattern).

​	假设您想根据目标的先决条件进行变化，就像变量 ‘$@’ 允许您在配方中变化一样。您无法在普通规则中的多个目标中这样做，但可以在*静态模式规则*中这样做。参见 [静态模式规则](https://www.gnu.org/software/make/manual/make.html#Static-Pattern)。

### 分组目标的规则 Rules with Grouped Targets



If instead of independent targets you have a recipe that generates multiple files from a single invocation, you can express that relationship by declaring your rule to use *grouped targets*. A grouped target rule uses the separator `&:` (the ‘&’ here is used to imply “all”).

​	如果您有一个配方从单个调用中生成多个文件，您可以通过声明规则使用*分组目标*来表示这种关系。分组目标规则使用分隔符 `&:`（这里的‘&’用于表示“全部”）。

When `make` builds any one of the grouped targets, it understands that all the other targets in the group are also updated as a result of the invocation of the recipe. Furthermore, if only some of the grouped targets are out of date or missing `make` will realize that running the recipe will update all of the targets. Finally, if any of the grouped targets are out of date, all the grouped targets are considered out of date.

​	当 `make` 构建任何一个分组目标时，它会理解组中的所有其他目标也会因配方调用而更新。此外，如果只有一些分组目标已过时或丢失，则 `make` 将意识到运行配方将更新所有目标。最后，如果任何分组目标已过时，则所有分组目标都被视为过时。

As an example, this rule defines a grouped target:

​	作为示例，此规则定义了一个分组目标：

```
foo bar biz &: baz boz
        echo $^ > foo
        echo $^ > bar
        echo $^ > biz
```

During the execution of a grouped target’s recipe, the automatic variable ‘$@’ is set to the name of the particular target in the group which triggered the rule. Caution must be used if relying on this variable in the recipe of a grouped target rule.

​	在执行分组目标的配方期间，自动变量 ‘$@’ 被设置为触发规则的组中特定目标的名称。在分组目标规则的配方中依赖于此变量时必须小心使用。

Unlike independent targets, a grouped target rule *must* include a recipe. However, targets that are members of a grouped target may also appear in independent target rule definitions that do not have recipes.

​	与独立目标不同，分组目标规则 *必须* 包含一个配方。然而，属于分组目标的目标也可以出现在没有配方的独立目标规则定义中。

Each target may have only one recipe associated with it. If a grouped target appears in either an independent target rule or in another grouped target rule with a recipe, you will get a warning and the latter recipe will replace the former recipe. Additionally the target will be removed from the previous group and appear only in the new group.

​	每个目标只能有一个与之关联的配方。如果一个分组目标出现在独立目标规则中，或者出现在另一个带有配方的分组目标规则中，将会得到警告，并且后者的配方将替换前者的配方。此外，目标将从前一个组中删除，并仅出现在新组中。

If you would like a target to appear in multiple groups, then you must use the double-colon grouped target separator, `&::` when declaring all of the groups containing that target. Grouped double-colon targets are each considered independently, and each grouped double-colon rule’s recipe is executed at most once, if at least one of its multiple targets requires updating.

​	如果希望目标出现在多个组中，那么在声明包含该目标的所有组时，必须使用双冒号分隔符 `&::`。独立地考虑每个分组的双冒号分隔目标，并且每个分组双冒号规则的配方最多执行一次，如果其多个目标中至少一个需要更新，则执行。



## 4.11 一个目标的多个规则 4.11 Multiple Rules for One Target



One file can be the target of several rules. All the prerequisites mentioned in all the rules are merged into one list of prerequisites for the target. If the target is older than any prerequisite from any rule, the recipe is executed.

​	一个文件可以是多个规则的目标。所有规则中提到的所有先决条件都会合并成一个目标的先决条件列表。如果目标比任何规则中的任何先决条件都要旧，那么就会执行配方。

There can only be one recipe to be executed for a file. If more than one rule gives a recipe for the same file, `make` uses the last one given and prints an error message. (As a special case, if the file’s name begins with a dot, no error message is printed. This odd behavior is only for compatibility with other implementations of `make`… you should avoid using it). Occasionally it is useful to have the same target invoke multiple recipes which are defined in different parts of your makefile; you can use *double-colon rules* (see [Double-Colon Rules](https://www.gnu.org/software/make/manual/make.html#Double_002dColon)) for this.

​	对于一个文件只能有一个要执行的配方。如果有多个规则为同一个文件提供配方，`make` 将使用最后一个给出的规则，并打印错误消息。（作为特殊情况，如果文件名以点开头，则不会打印错误消息。这种奇怪的行为仅用于与其他 `make` 实现的兼容性...您应避免使用它）。有时候在同一个目标中具有多个规则的配方很有用，这些规则在 makefile 的不同部分中定义；您可以使用*双冒号规则*（参见[双冒号规则](https://www.gnu.org/software/make/manual/make.html#Double_002dColon)）来实现这一点。

An extra rule with just prerequisites can be used to give a few extra prerequisites to many files at once. For example, makefiles often have a variable, such as `objects`, containing a list of all the compiler output files in the system being made. An easy way to say that all of them must be recompiled if config.h changes is to write the following:

​	可以使用仅有先决条件的额外规则，以一次给多个文件提供一些额外的先决条件。例如，makefile 常常有一个变量，比如 `objects`，其中包含正在构建的系统中所有编译器输出文件的列表。一种简单的方法来表示如果 `config.h` 更改，则所有这些文件都必须重新编译，是写如下内容：

```
objects = foo.o bar.o
foo.o : defs.h
bar.o : defs.h test.h
$(objects) : config.h
```

This could be inserted or taken out without changing the rules that really specify how to make the object files, making it a convenient form to use if you wish to add the additional prerequisite intermittently.

​	这可以在不更改真正指定如何制作目标文件的规则的情况下插入或删除，这是一种方便的形式，如果您希望间歇性地添加附加先决条件时可以使用。

Another wrinkle is that the additional prerequisites could be specified with a variable that you set with a command line argument to `make` (see [Overriding Variables](https://www.gnu.org/software/make/manual/make.html#Overriding)). For example,

​	另一个细节是，附加的先决条件可以使用通过命令行参数设置的变量来指定（参见[覆盖变量](https://www.gnu.org/software/make/manual/make.html#Overriding)）。例如，

```
extradeps=
$(objects) : $(extradeps)
```

means that the command ‘make extradeps=foo.h’ will consider foo.h as a prerequisite of each object file, but plain ‘make’ will not.

意味着命令 `make extradeps=foo.h` 将会将 `foo.h` 视为每个目标文件的先决条件，但普通的 `make` 不会这样做。

If none of the explicit rules for a target has a recipe, then `make` searches for an applicable implicit rule to find one see [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)).

​	如果一个目标的所有显式规则都没有配方，那么 `make` 会搜索适用的隐式规则来找到一个配方，参见[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。





## 4.12 静态模式规则 4.12 Static Pattern Rules



*Static pattern rules* are rules which specify multiple targets and construct the prerequisite names for each target based on the target name. They are more general than ordinary rules with multiple targets because the targets do not have to have identical prerequisites. Their prerequisites must be *analogous*, but not necessarily *identical*.

​	*静态模式规则*是指定多个目标并基于目标名称构造每个目标的先决条件名称的规则。它们比具有多个目标的普通规则更通用，因为目标的先决条件不必相同。它们的先决条件必须是*类似的*，但不一定是*相同的*。





### 4.12.1 静态模式规则的语法 4.12.1 Syntax of Static Pattern Rules

Here is the syntax of a static pattern rule:

​	下面是静态模式规则的语法：

```
targets …: target-pattern: prereq-patterns …
        recipe
        …
```

The targets list specifies the targets that the rule applies to. The targets can contain wildcard characters, just like the targets of ordinary rules (see [Using Wildcard Characters in File Names](https://www.gnu.org/software/make/manual/make.html#Wildcards)).

​	目标列表指定规则适用于的目标。这些目标可以包含通配符，就像普通规则的目标一样（参见[在文件名中使用通配符字符](https://www.gnu.org/software/make/manual/make.html#Wildcards)）。

The target-pattern and prereq-patterns say how to compute the prerequisites of each target. Each target is matched against the target-pattern to extract a part of the target name, called the *stem*. This stem is substituted into each of the prereq-patterns to make the prerequisite names (one from each prereq-pattern).

​	目标模式和先决条件模式说明如何计算每个目标的先决条件。每个目标与目标模式匹配，以提取目标名称的一部分，称为*词根*。这个词根被替换为每个先决条件模式，以生成先决条件名称（每个来自每个先决条件模式）。

Each pattern normally contains the character ‘%’ just once. When the target-pattern matches a target, the ‘%’ can match any part of the target name; this part is called the *stem*. The rest of the pattern must match exactly. For example, the target foo.o matches the pattern ‘%.o’, with ‘foo’ as the stem. The targets foo.c and foo.out do not match that pattern.

​	每个模式通常只包含字符 ‘%’ 一次。当目标模式与目标匹配时，‘%’ 可以匹配目标名称的任何部分；这部分被称为*词根*。模式的其余部分必须完全匹配。例如，目标 `foo.o` 与模式 `%.o` 匹配，词根为 ‘foo’。目标 `foo.c` 和 `foo.out` 不匹配该模式。

The prerequisite names for each target are made by substituting the stem for the ‘%’ in each prerequisite pattern. For example, if one prerequisite pattern is %.c, then substitution of the stem ‘foo’ gives the prerequisite name foo.c. It is legitimate to write a prerequisite pattern that does not contain ‘%’; then this prerequisite is the same for all targets.

​	每个目标的先决条件的名称是通过将词根替换为先决条件模式中的 ‘%’ 来制作的。例如，如果一个先决条件模式是 `%.c`，那么将词根 ‘foo’ 替换为它会得到先决条件名 `foo.c`。编写一个不包含 ‘%’ 的先决条件模式是合法的；那么这个先决条件对于所有目标都是相同的。

‘%’ characters in pattern rules can be quoted with preceding backslashes (‘\’). Backslashes that would otherwise quote ‘%’ characters can be quoted with more backslashes. Backslashes that quote ‘%’ characters or other backslashes are removed from the pattern before it is compared to file names or has a stem substituted into it. Backslashes that are not in danger of quoting ‘%’ characters go unmolested. For example, the pattern the\%weird\\%pattern\\ has ‘the%weird\’ preceding the operative ‘%’ character, and ‘pattern\\’ following it. The final two backslashes are left alone because they cannot affect any ‘%’ character.

​	在模式规则中的 ‘%’ 字符可以用前面的反斜杠（‘\’）引用。否则会引用 ‘%’ 字符的反斜杠可以用更多的反斜杠进行引用。在文件名比较或将词根替换到模式中之前，从模式中删除了引用 ‘%’ 字符的反斜杠。没有危险引用 ‘%’ 字符的反斜杠将不受影响。例如，模式 `the\%weird\\%pattern\\` 具有在操作 ‘%’ 字符之前的 ‘the%weird\’，以及在其后的 ‘pattern\’。最后两个反斜杠保持不变，因为它们不会影响任何 ‘%’ 字符。

Here is an example, which compiles each of foo.o and bar.o from the corresponding .c file:

​	以下是一个示例，从对应的 `.c` 文件编译出 `foo.o` 和 `bar.o`：

```
objects = foo.o bar.o

all: $(objects)

$(objects): %.o: %.c
        $(CC) -c $(CFLAGS) $< -o $@
```

Here ‘`$<`’ is the automatic variable that holds the name of the prerequisite and ‘`$@`’ is the automatic variable that holds the name of the target; see [Automatic Variables](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables).

​	这里，‘`$<`’ 是自动变量，保存了先决条件的名称，‘`$@`’ 是自动变量，保存了目标的名称；参见[自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)。

Each target specified must match the target pattern; a warning is issued for each target that does not. If you have a list of files, only some of which will match the pattern, you can use the `filter` function to remove non-matching file names (see [Functions for String Substitution and Analysis](https://www.gnu.org/software/make/manual/make.html#Text-Functions)):

​	每个指定的目标必须与目标模式匹配；如果不匹配，将会发出警告。如果有一个文件列表，其中只有一些文件与模式匹配，您可以使用 `filter` 函数来删除不匹配的文件名（参见[用于字符串替换和分析的函数](https://www.gnu.org/software/make/manual/make.html#Text-Functions)）：

```
files = foo.elc bar.o lose.o

$(filter %.o,$(files)): %.o: %.c
        $(CC) -c $(CFLAGS) $< -o $@
$(filter %.elc,$(files)): %.elc: %.el
        emacs -f batch-byte-compile $<
```

In this example the result of ‘`$(filter %.o,$(files))`’ is bar.o lose.o, and the first static pattern rule causes each of these object files to be updated by compiling the corresponding C source file. The result of ‘`$(filter %.elc,$(files))`’ is foo.elc, so that file is made from foo.el.

​	在这个示例中，`$(filter %.o,$(files))` 的结果是 `bar.o` 和 `lose.o`，第一个静态模式规则导致这些目标文件通过编译相应的 C 源文件来更新。`$(filter %.elc,$(files))` 的结果是 `foo.elc`，因此该文件是从 `foo.el` 制作的。

Another example shows how to use `$*` in static pattern rules:

​	另一个示例展示了如何在静态模式规则中使用 `$*`：

```
bigoutput littleoutput : %output : text.g
        generate text.g -$* > $@
```

When the `generate` command is run, `$*` will expand to the stem, either ‘big’ or ‘little’.

​	当运行 `generate` 命令时，`$*` 将展开为词根，即 ‘big’ 或 ‘little’。



### 4.12.2 静态模式规则与隐式规则对比 4.12.2 Static Pattern Rules versus Implicit Rules

A static pattern rule has much in common with an implicit rule defined as a pattern rule (see [Defining and Redefining Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)). Both have a pattern for the target and patterns for constructing the names of prerequisites. The difference is in how `make` decides *when* the rule applies.

​	静态模式规则与作为模式规则定义的隐式规则有很多共同之处（参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)）。两者都有一个目标模式和构造先决条件名称的模式。区别在于 `make` 如何决定规则适用的*时间*。

An implicit rule *can* apply to any target that matches its pattern, but it *does* apply only when the target has no recipe otherwise specified, and only when the prerequisites can be found. If more than one implicit rule appears applicable, only one applies; the choice depends on the order of rules.

​	隐式规则*可以*适用于与其模式匹配的任何目标，但*只有*在目标没有明确指定配方，且只有在可以找到先决条件时才适用。如果有多个隐式规则适用，只有一个适用；选择取决于规则的顺序。

By contrast, a static pattern rule applies to the precise list of targets that you specify in the rule. It cannot apply to any other target and it invariably does apply to each of the targets specified. If two conflicting rules apply, and both have recipes, that’s an error.

​	相比之下，静态模式规则适用于您在规则中指定的精确的目标列表。它不能适用于任何其他目标，而且它无论如何都会适用于每个指定的目标。如果有两个冲突的规则适用，并且都有配方，那么就会出错。

The static pattern rule can be better than an implicit rule for these reasons:

​	静态模式规则之所以更好，是因为以下原因：

- You may wish to override the usual implicit rule for a few files whose names cannot be categorized syntactically but can be given in an explicit list.
- 您可能希望为一些不能在语法上进行分类但可以在显式列表中给出的文件覆盖通常的隐式规则。
- If you cannot be sure of the precise contents of the directories you are using, you may not be sure which other irrelevant files might lead `make` to use the wrong implicit rule. The choice might depend on the order in which the implicit rule search is done. With static pattern rules, there is no uncertainty: each rule applies to precisely the targets specified.
- 如果您不能确定所使用的目录的确切内容，您可能不确定哪些其他无关的文件可能会导致 `make` 使用错误的隐式规则。选择可能取决于隐式规则搜索的顺序。使用静态模式规则，就没有不确定性：每个规则都适用于精确指定的目标。





## 4.13 双冒号规则 4.13 Double-Colon Rules



*Double-colon* rules are explicit rules written with ‘::’ instead of ‘:’ after the target names. They are handled differently from ordinary rules when the same target appears in more than one rule. Pattern rules with double-colons have an entirely different meaning (see [Match-Anything Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Match_002dAnything-Rules)).

​	*双冒号*规则是在目标名称后使用‘::’而不是‘:’编写的显式规则。当相同的目标在多个规则中出现时，它们与普通规则处理方式不同。具有双冒号的模式规则具有完全不同的含义（参见[匹配任意模式规则](https://www.gnu.org/software/make/manual/make.html#Match_002dAnything-Rules)）。

When a target appears in multiple rules, all the rules must be the same type: all ordinary, or all double-colon. If they are double-colon, each of them is independent of the others. Each double-colon rule’s recipe is executed if the target is older than any prerequisites of that rule. If there are no prerequisites for that rule, its recipe is always executed (even if the target already exists). This can result in executing none, any, or all of the double-colon rules.

​	当一个目标在多个规则中出现时，所有规则必须是相同类型的：要么全是普通规则，要么全是双冒号规则。如果它们是双冒号规则，每个规则都相互独立。如果目标比该规则的任何先决条件都要旧，将执行每个双冒号规则的配方。如果该规则没有先决条件，其配方总是会被执行（即使目标已经存在）。这可能导致执行零个、任意个或所有双冒号规则。

Double-colon rules with the same target are in fact completely separate from one another. Each double-colon rule is processed individually, just as rules with different targets are processed.

​	具有相同目标的双冒号规则实际上是完全独立的。每个双冒号规则都是单独处理的，就像具有不同目标的规则一样。

The double-colon rules for a target are executed in the order they appear in the makefile. However, the cases where double-colon rules really make sense are those where the order of executing the recipes would not matter.

​	目标的双冒号规则按照它们在 makefile 中出现的顺序执行。然而，双冒号规则真正有意义的情况是执行配方的顺序无关紧要的情况。

Double-colon rules are somewhat obscure and not often very useful; they provide a mechanism for cases in which the method used to update a target differs depending on which prerequisite files caused the update, and such cases are rare.

​	双冒号规则有些隐晦，而且通常并不常用；它们为在更新目标时使用的方法因所需的先决条件文件不同而有所不同提供了一种机制，而这种情况很少见。

Each double-colon rule should specify a recipe; if it does not, an implicit rule will be used if one applies. See [Using Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules).

​	每个双冒号规则都应该指定一个配方；如果没有，如果适用，将会使用隐式规则。参见[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。



## 4.14 自动生成先决条件 4.14 Generating Prerequisites Automatically

In the makefile for a program, many of the rules you need to write often say only that some object file depends on some header file. For example, if main.c uses defs.h via an `#include`, you would write:

​	在程序的 makefile 中，许多您需要编写的规则通常只表示某个目标文件依赖于某个头文件。例如，如果 `main.c` 通过 `#include` 使用 `defs.h`，您可以编写：

```
main.o: defs.h
```

You need this rule so that `make` knows that it must remake main.o whenever defs.h changes. You can see that for a large program you would have to write dozens of such rules in your makefile. And, you must always be very careful to update the makefile every time you add or remove an `#include`.

​	您需要这个规则，以便 `make` 知道每当 `defs.h` 更改时，它必须重新制作 `main.o`。您可以看到，对于一个大型程序，您必须在 makefile 中编写几十个这样的规则。而且，每次添加或删除 `#include` 时，您都必须非常小心地更新 makefile。

To avoid this hassle, most modern C compilers can write these rules for you, by looking at the `#include` lines in the source files. Usually this is done with the ‘-M’ option to the compiler. For example, the command:

​	为了避免这种麻烦，大多数现代 C 编译器可以通过查看源文件中的 `#include` 行来自动生成这些规则。通常，这是通过使用编译器的‘-M’选项来实现的。例如，命令：

```
cc -M main.c
```

generates the output:

会生成输出：

```
main.o : main.c defs.h
```

Thus you no longer have to write all those rules yourself. The compiler will do it for you.

​	因此，您不再需要自己编写所有这些规则。编译器会为您执行。

Note that such a rule constitutes mentioning main.o in a makefile, so it can never be considered an intermediate file by implicit rule search. This means that `make` won’t ever remove the file after using it; see [Chains of Implicit Rules](https://www.gnu.org/software/make/manual/make.html#Chained-Rules).

​	请注意，这样的规则构成了在 makefile 中提及 `main.o`，因此它永远不会被隐式规则搜索视为中间文件。这意味着 `make` 在使用文件后永远不会删除它；参见[隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。

With old `make` programs, it was traditional practice to use this compiler feature to generate prerequisites on demand with a command like ‘make depend’. That command would create a file depend containing all the automatically-generated prerequisites; then the makefile could use `include` to read them in (see [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include)).

​	在旧的 `make` 程序中，传统做法是使用此编译器特性，通过类似 ‘make depend’ 的命令按需生成先决条件。该命令会创建一个名为 `depend` 的文件，其中包含所有自动生成的先决条件；然后 makefile 可以使用 `include` 来读取它们（参见[包含其他 makefile](https://www.gnu.org/software/make/manual/make.html#Include)）。

In GNU `make`, the feature of remaking makefiles makes this practice obsolete—you need never tell `make` explicitly to regenerate the prerequisites, because it always regenerates any makefile that is out of date. See [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles).

​	在 GNU `make` 中，重新制作 makefile 的功能使这种做法过时了——您永远不需要明确告诉 `make` 重新生成先决条件，因为它总是会重新生成任何过期的 makefile。参见[如何重新制作 makefile](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)。

The practice we recommend for automatic prerequisite generation is to have one makefile corresponding to each source file. For each source file name.c there is a makefile name.d which lists what files the object file name.o depends on. That way only the source files that have changed need to be rescanned to produce the new prerequisites.

​	我们推荐用于自动生成先决条件的做法是为每个源文件编写一个相应的 makefile。对于每个源文件 `name.c`，都有一个名为 `name.d` 的 makefile，其中列出了目标文件 `name.o` 依赖的文件。这样只有发生更改的源文件需要重新扫描以生成新的先决条件。

Here is the pattern rule to generate a file of prerequisites (i.e., a makefile) called name.d from a C source file called name.c:

​	以下是从名为 `name.c` 的 C 源文件生成先决条件文件（即 makefile）`name.d` 的模式规则：

```
%.d: %.c
        @set -e; rm -f $@; \
         $(CC) -M $(CPPFLAGS) $< > $@.$$$$; \
         sed 's,\($*\)\.o[ :]*,\1.o $@ : ,g' < $@.$$$$ > $@; \
         rm -f $@.$$$$
```

See [Defining and Redefining Pattern Rules](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules), for information on defining pattern rules. The ‘-e’ flag to the shell causes it to exit immediately if the `$(CC)` command (or any other command) fails (exits with a nonzero status).

​	有关定义模式规则的信息，请参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)。 shell 中的 ‘-e’ 标志会导致在 `$(CC)` 命令（或任何其他命令）失败（退出并返回非零状态）时立即退出。

With the GNU C compiler, you may wish to use the ‘-MM’ flag instead of ‘-M’. This omits prerequisites on system header files. See [Options Controlling the Preprocessor](https://gcc.gnu.org/onlinedocs/gcc/Preprocessor-Options.html#Preprocessor-Options) in Using GNU CC, for details.

​	对于 GNU C 编译器，您可能希望使用 ‘-MM’ 标志而不是 ‘-M’。这会省略对系统头文件的先决条件。有关详细信息，请参见 [控制预处理器的选项](https://gcc.gnu.org/onlinedocs/gcc/Preprocessor-Options.html#Preprocessor-Options)。

The purpose of the `sed` command is to translate (for example):

​	`sed` 命令的目的是将（例如）：

```
main.o : main.c defs.h
```

into:

转换为：

```
main.o main.d : main.c defs.h
```

This makes each ‘.d’ file depend on all the source and header files that the corresponding ‘.o’ file depends on. `make` then knows it must regenerate the prerequisites whenever any of the source or header files changes.

​	这使得每个 ‘.d’ 文件依赖于相应的 ‘.o’ 文件依赖的所有源文件和头文件。然后，`make` 知道每当任何源文件或头文件发生更改时，必须重新生成先决条件。

Once you’ve defined the rule to remake the ‘.d’ files, you then use the `include` directive to read them all in. See [Including Other Makefiles](https://www.gnu.org/software/make/manual/make.html#Include). For example:

​	一旦您定义了重新制作 ‘.d’ 文件的规则，然后可以使用 `include` 指令将它们全部读入。参见[包含其他 makefile](https://www.gnu.org/software/make/manual/make.html#Include)。例如：

```
sources = foo.c bar.c

include $(sources:.c=.d)
```

(This example uses a substitution variable reference to translate the list of source files ‘foo.c bar.c’ into a list of prerequisite makefiles, ‘foo.d bar.d’. See [Substitution References](https://www.gnu.org/software/make/manual/make.html#Substitution-Refs), for full information on substitution references.) Since the ‘.d’ files are makefiles like any others, `make` will remake them as necessary with no further work from you. See [How Makefiles Are Remade](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles).

（此示例使用替代变量引用将源文件列表 ‘foo.c bar.c’ 转换为先决条件 makefile 列表 ‘foo.d bar.d’。有关替代变量引用的完整信息，请参见[替代引用](https://www.gnu.org/software/make/manual/make.html#Substitution-Refs)。）由于 ‘.d’ 文件像其他任何 makefile 一样，`make` 会根据需要重新制作它们，您不需要做其他工作。参见[如何重新制作 makefile](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)。

Note that the ‘.d’ files contain target definitions; you should be sure to place the `include` directive *after* the first, default goal in your makefiles or run the risk of having a random object file become the default goal. See [How `make` Processes a Makefile](https://www.gnu.org/software/make/manual/make.html#How-Make-Works).

​	请注意，‘.d’ 文件包含目标定义；请务必将 `include` 指令放置在第一个默认目标之后，以免随机对象文件成为默认目标。参见[make 的工作原理](https://www.gnu.org/software/make/manual/make.html#How-Make-Works)。