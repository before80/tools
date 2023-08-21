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



​	一个*规则*出现在Makefile中，它说明何时以及如何重新生成特定的文件，称为规则的*目标*（通常每个规则通常只有一个目标）。它列出了目标的其他作为*先决条件*的文件，以及用于创建或更新目标的*配方*。

​	规则的顺序不重要，除了确定*默认目标*：如果您没有另外指定目标，`make` 要考虑的目标。默认目标是第一个Makefile中的第一个规则的第一个目标。有两个例外：以句点开头的目标不是默认目标，除非它还包含一个或多个斜杠 ‘/’；以及定义模式规则的目标不会影响默认目标。（参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)。）

​	因此，通常我们会将Makefile的第一个规则编写为编译整个程序或由Makefile描述的所有程序的规则（通常使用一个名为 'all' 的目标）。请参阅[用于指定目标的参数](https://www.gnu.org/software/make/manual/make.html#Goals)。

## 4.1 规则示例 

​	以下是一个规则示例：

```makefile
foo.o : foo.c defs.h       # module for twiddling the frobs
        cc -c -g foo.c
```

​	它的目标是 foo.o，它的先决条件是 foo.c 和 defs.h。它在配方中有一个命令：‘cc -c -g foo.c’。配方以制表符开头以将其标识为配方。

​	这个规则传达了两个信息： 

- 如何判断 foo.o 是否过时：如果它不存在，或者如果 foo.c 或 defs.h 的修改时间较新。
- 如何更新文件 foo.o：通过运行所述的 `cc`。配方没有明确提到 defs.h，但我们假设 foo.c 包括它，这就是为什么将 defs.h 添加到先决条件的原因。





## 4.2 规则语法

​	一般来说，规则的样式如下：

```makefile
targets : prerequisites
        recipe
        …
```

或者像这样：

```makefile
targets : prerequisites ; recipe
        recipe
        …
```

​	目标是文件名，用空格分隔。可以使用通配符字符（参见[在文件名中使用通配符字符](https://www.gnu.org/software/make/manual/make.html#Wildcards)）和形式为 a(m) 的名称，其中 a 表示存档文件，m 表示存档文件 a 中的成员（参见[用于目标的存档成员](https://www.gnu.org/software/make/manual/make.html#Archive-Members)）。通常，每个规则只有一个目标，但偶尔会有多个目标的原因（参见[规则中的多个目标](https://www.gnu.org/software/make/manual/make.html#Multiple-Targets)）。

​	配方行以制表符字符开头（或者是 `.RECIPEPREFIX` 变量的值的第一个字符；参见[其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)）。第一行配方可以出现在先决条件的后面，带有制表符字符，或者可以出现在同一行上，带有分号。无论哪种方式，效果都是一样的。在配方的语法中还有其他差异。请参阅[在规则中编写配方](https://www.gnu.org/software/make/manual/make.html#Recipes)。

​	由于美元符号用于开始 `make` 变量引用，因此如果您确实希望在目标或先决条件中使用美元符号，您必须写两个美元符号，即 ‘`$$`’（参见[如何使用变量](https://www.gnu.org/software/make/manual/make.html#Using-Variables)）。如果您启用了二次展开（参见[二次展开](https://www.gnu.org/software/make/manual/make.html#Secondary-Expansion)），并且您希望在先决条件列表中出现一个字面的美元符号，您实际上必须写 *四个* 美元符号（‘`$$$$`’）。

​	您可以通过插入反斜杠后跟换行符来拆分一行，但这不是必需的，因为 `make` 在Makefile中的行长度上没有限制。

​	规则向 `make` 传达两个信息：目标何时过时，以及在必要时如何更新它们。

​	过时的标准是根据先决条件来指定的，先决条件由用空格分隔的文件名组成。（通配符和存档成员（参见[使用 `make` 更新存档文件](https://www.gnu.org/software/make/manual/make.html#Archives)）也可以在这里使用。）如果目标不存在，或者如果它的修改时间早于任何先决条件（通过比较最后修改时间），则目标过时。这个想法是目标文件的内容是根据先决条件中的信息计算的，所以如果任何先决条件发生变化，现有目标文件的内容就不再必然有效。

​	如何更新是通过配方来指定的。这是一个或多个由shell（通常是 'sh'）执行的行，但具有一些额外的功能（参见[在规则中编写配方](https://www.gnu.org/software/make/manual/make.html#Recipes)）。



## 4.3 先决条件的类型



​	GNU `make` 理解两种不同类型的先决条件：普通先决条件（在上一节中描述）和*仅顺序*先决条件。普通先决条件提出了两个声明：首先，它规定了调用配方的顺序：目标的所有先决条件的配方将在目标的配方开始之前完成。其次，它规定了依赖关系：如果任何先决条件比目标新，则目标被视为过时，必须重新构建。

​	通常情况下，这正是您想要的：如果目标的先决条件已更新，那么目标也应该被更新。

​	偶尔，您可能希望确保在目标之前构建一个先决条件，但是*不希望*如果先决条件被更新就强制更新目标。*仅顺序*先决条件用于创建此类型的关系。可以通过在先决条件列表中放置管道符（`|`）来指定仅顺序先决条件：管道符左侧的任何先决条件都是普通的；管道符右侧的任何先决条件都是仅顺序的：

```makefile
targets : normal-prerequisites | order-only-prerequisites
```

​	当然，普通先决条件部分可能为空。此外，您仍然可以为同一个目标声明多行先决条件：它们会适当地附加（普通先决条件会附加到普通先决条件列表，仅顺序先决条件会附加到仅顺序先决条件列表）。请注意，如果将同一个文件同时声明为普通和仅顺序的先决条件，普通先决条件会优先（因为它们的行为是仅顺序先决条件的严格超集）。

​	仅顺序先决条件在确定目标是否过时时永远不会被检查；即使将标记为伪目标的仅顺序先决条件（参见[伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)）也不会导致目标被重新构建。

​	考虑一个示例，其中您的目标将放置在一个单独的目录中，而该目录在运行 `make` 之前可能不存在。在这种情况下，您希望在将任何目标放入其中之前创建目录，但是因为目录的时间戳会在添加、删除或重命名文件时更改，我们当然不希望在目录的时间戳更改时重新构建所有目标。管理这种情况的一种方法是使用仅顺序先决条件：将目录设置为所有目标的仅顺序先决条件：

```makefile
OBJDIR := objdir
OBJS := $(addprefix $(OBJDIR)/,foo.o bar.o baz.o)

$(OBJDIR)/%.o : %.c
        $(COMPILE.c) $(OUTPUT_OPTION) $<

all: $(OBJS)

$(OBJS): | $(OBJDIR)

$(OBJDIR):
        mkdir $(OBJDIR)
```

​	现在，如果需要，在构建任何 'o' 文件之前将运行创建 objdir 目录的规则，但如果 objdir 目录的时间戳发生变化，不会构建任何 'o' 文件。



## 4.4 在文件名中使用通配符字符

​	一个单一的文件名可以使用*通配符字符*来指定许多文件。`make` 中的通配符字符包括 ‘`*`’、‘`?`’ 和 ‘`[…]`’，与 Bourne shell 中的相同。例如，`*.c` 指定了所有文件名（在工作目录中），其名称以 ‘`.c`’ 结尾。

​	如果一个表达式匹配多个文件，那么结果将被排序。然而，多个表达式不会被全局排序。例如，`*.c` `*.h` 将列出所有文件名以 ‘`.c`’ 结尾的文件，排序后，接着是所有文件名以 ‘`.h`’ 结尾的文件，也排序后。

​	文件名开头的字符 ‘`~`’ 也具有特殊的意义。如果它单独出现，或者跟着一个斜杠，它代表您的主目录。例如，`~/bin` 展开为 `/home/you/bin`。如果 ‘`~`’ 后跟一个单词，该字符串代表由该单词命名的用户的主目录。例如，`~john/bin` 展开为 `/home/john/bin`。在没有为每个用户设置主目录的系统上（如 MS-DOS 或 MS-Windows），可以通过设置环境变量 HOME 来模拟此功能。

​	在目标和先决条件中，`make` 会自动执行通配符扩展。在配方中，通配符扩展由 shell 负责。在其他上下文中，只有在您使用 `wildcard` 函数显式请求时，通配符扩展才会发生。

​	通配符字符的特殊意义可以通过在其前面加上反斜杠来关闭。因此，`foo\*bar` 将引用一个特定的文件，其名称由 ‘foo’、一个星号和 ‘bar’ 组成。 



### 4.4.1 通配符示例 

​	通配符可以用在规则的配方中，它们会被 shell 扩展。例如，这里有一个规则来删除所有目标文件：

```makefile
clean:
        rm -f *.o
```

​	通配符在规则的先决条件中也很有用。使用下面的规则，在上次打印文件后，‘make print’ 将打印所有已更改的 ‘.c’ 文件：

```makefile
print: *.c
        lpr -p $?
        touch print
```

​	此规则将 `print` 用作一个空目标文件；参见[用空目标文件记录事件](https://www.gnu.org/software/make/manual/make.html#Empty-Targets)。（自动变量 ‘$?’ 用于仅打印已更改的文件；参见[自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)。）

​	在定义变量时，通配符扩展不会发生。因此，如果您这样写：

```makefile
objects = *.o
```

那么变量 `objects` 的值将是实际的字符串 ‘*.o’。但是，如果您在目标或先决条件中使用 `objects` 的值，通配符扩展将在那里发生。如果在配方中使用 `objects` 的值，shell 可能会在运行配方时执行通配符扩展。要将 `objects` 设置为扩展结果，可以使用：

```makefile
objects := $(wildcard *.o)
```

​	参见[函数 `wildcard`](https://www.gnu.org/software/make/manual/make.html#Wildcard-Function)。



### 4.4.2 使用通配符的陷阱 



​	现在是一个使用通配符扩展的简单方法的例子，它不会按照你的预期工作。假设你想说可执行文件 foo 是从目录中的所有目标文件创建的，你会写这样：

```makefile
objects = *.o

foo : $(objects)
        cc -o foo $(CFLAGS) $(objects)
```

​	变量 `objects` 的值是实际的字符串 ‘`*.o`’。通配符扩展发生在 ‘foo’ 的规则中，所以每个 *现有的* ‘`.o`’ 文件都会成为 ‘foo’ 的先决条件，并在必要时重新编译。

​	但是，如果您删除了所有 ‘`.o`’ 文件呢？当通配符没有匹配的文件时，它会保持原样，所以 ‘foo’ 将依赖于奇怪命名的文件 `*.o`。由于不太可能存在这样的文件，`make` 将会给您一个错误，表示无法确定如何制作 `*.o`。这不是您想要的！

​	实际上，通过通配符扩展可以获得所需的结果，但您需要更复杂的技巧，包括 `wildcard` 函数和字符串替换。参见[函数 `wildcard`](https://www.gnu.org/software/make/manual/make.html#Wildcard-Function)。

​	Microsoft 操作系统（MS-DOS 和 MS-Windows）使用反斜杠在路径名中分隔目录，如下所示：

```makefile
  c:\foo\bar\baz.c
```

​	这相当于 Unix 风格的 c:/foo/bar/baz.c（c: 部分是所谓的驱动器字母）。当 `make` 在这些系统上运行时，它支持反斜杠以及 Unix 风格的正斜杠作为路径名中的分隔符。然而，此支持不包括通配符扩展，其中反斜杠是引用字符。因此，在这些情况下，您*必须*使用 Unix 风格的斜杠。



### 4.4.3 函数 `wildcard` 

​	通配符扩展在规则中自动发生。但是，在设置变量或函数的参数中，通常不会发生通配符扩展。如果要在这些地方进行通配符扩展，需要使用 `wildcard` 函数，如下所示：

```makefile
$(wildcard pattern…)
```

​	此字符串在 makefile 中的任何地方使用时，将被现有文件名称匹配给定文件名模式之一的名称的以空格分隔的列表替换。如果没有现有文件名与模式匹配，则该模式将从 `wildcard` 函数的输出中省略。请注意，这与规则中未匹配的通配符行为不同，规则中的通配符行为是按原样使用而不是被忽略的（参见[使用通配符的陷阱](https://www.gnu.org/software/make/manual/make.html#Wildcard-Pitfall)）。

​	与规则中的通配符扩展一样，`wildcard` 函数的结果也是经过排序的。但是，每个单独的表达式都是分别排序的，因此 ‘`$(wildcard *.c *.h)`’ 将扩展为所有匹配 ‘`.c`’ 的文件，排序后，接着是所有匹配 ‘`.h`’ 的文件，也排序后。

​	`wildcard` 函数的一个用途是获取目录中所有 C 源文件的列表，如下所示：

```makefile
$(wildcard *.c)
```

​	我们可以通过将结果中的 ‘.c’ 后缀替换为 ‘.o’，将 C 源文件列表更改为对象文件列表，如下所示：

```makefile
$(patsubst %.c,%.o,$(wildcard *.c))
```

（在这里，我们还使用了另一个函数 `patsubst`。参见[用于字符串替换和分析的函数](https://www.gnu.org/software/make/manual/make.html#Text-Functions)。）

​	因此，可以编写一个用于编译目录中的所有 C 源文件，然后将它们链接在一起的 makefile，如下所示：

```makefile
objects := $(patsubst %.c,%.o,$(wildcard *.c))

foo : $(objects)
        cc -o foo $(objects)
```

（这利用了编译 C 程序的隐含规则，因此不需要为编译文件编写显式规则。参见[变量的两种风格](https://www.gnu.org/software/make/manual/make.html#Flavors)，有关 ‘:=’ 的说明，它是 ‘=’ 的变体。）



## 4.5 在目录中搜索先决条件

​	在大型系统中，通常希望将源代码放在与二进制文件分开的目录中。`make` 的*目录搜索*功能可以通过自动在多个目录中搜索来查找先决条件。当您在目录之间重新分发文件时，您不需要更改单个规则，只需更改搜索路径。 





### 4.5.1 `VPATH`：搜索所有先决条件的路径 



​	`make` 变量 `VPATH` 的值指定了 `make` 应该搜索的目录列表。通常情况下，这些目录应该包含不在当前目录中的先决条件文件；但是，`make` 将 `VPATH` 用作规则的先决条件和目标的搜索列表。

​	因此，如果一个目标或先决条件列出的文件在当前目录中不存在，`make` 将在 `VPATH` 中列出的目录中搜索具有相同名称的文件。如果在其中一个目录中找到文件，那么该文件可能成为先决条件（见下文）。规则可以将先决条件列表中的文件名指定为如果所有文件都存在于当前目录中。参见[使用目录搜索编写配方](https://www.gnu.org/software/make/manual/make.html#Recipes_002fSearch)。

​	在 `VPATH` 变量中，目录名称由冒号或空格分隔。列出目录的顺序是 `make` 在搜索中遵循的顺序。（在 MS-DOS 和 MS-Windows 上，分号用作目录名称中的分隔符，因为冒号可以在驱动器字母之后在路径名本身中使用。）

例如，

```makefile
VPATH = src:../headers
```

​	指定了一个包含两个目录 src 和 `../headers` 的路径，`make` 将按照该顺序进行搜索。

​	使用这个 `VPATH` 值，以下规则，

```makefile
foo.o : foo.c
```

将被解释为如果写成如下：

```makefile
foo.o : src/foo.c
```

假设文件 foo.c 在当前目录中不存在，但在目录 src 中找到。



### 4.5.2 `vpath` 指令



​	类似于 `VPATH` 变量，但更有选择性的是 `vpath` 指令（注意小写），它允许您为特定类别的文件名指定搜索路径：与特定模式匹配的文件名。因此，您可以为一类文件名提供特定的搜索目录，为其他文件名提供其他目录（或无目录）。

​	`vpath` 指令有三种形式：

- `vpath pattern directories`

  为与模式匹配的文件名指定搜索路径目录。搜索路径 `directories` 是一个由目录组成的列表，用冒号（在 MS-DOS 和 MS-Windows 上是分号）或空格分隔，就像在 `VPATH` 变量中使用的搜索路径一样。

- `vpath pattern`

  清除与模式相关联的搜索路径。

- `vpath`

  清除以前使用 `vpath` 指令指定的所有搜索路径。

​	`vpath` 模式是一个包含 ‘%’ 字符的字符串。该字符串必须与正在搜索的先决条件的文件名相匹配，‘%’ 字符与零个或多个字符的任意序列匹配（与模式规则中的模式相同；参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)）。例如，`%.h` 匹配以 `.h` 结尾的文件。（如果没有 ‘%’，则模式必须完全与先决条件匹配，这在很少有用。）

​	`vpath` 指令中的 ‘%’ 字符可以用前置的反斜杠（‘\’）进行引用。否则引用 ‘%’ 字符的反斜杠可以用更多的反斜杠进行引用。在比较文件名之前，从模式中删除不会用于引用 ‘%’ 字符或其他反斜杠的反斜杠。没有危险引用 ‘%’ 字符的反斜杠保持不变。

​	当先决条件在当前目录中不存在时，如果 `vpath` 指令中的模式与先决条件文件的名称匹配，那么该指令中的目录会被搜索，就像在 `VPATH` 变量中的目录一样。

例如，

```makefile
vpath %.h ../headers
```

告诉 `make` 在目录 ../headers 中查找任何以 .h 结尾的先决条件，如果在当前目录中找不到文件。

​	如果多个 `vpath` 模式与先决条件文件的名称匹配，则 `make` 会逐一处理每个匹配的 `vpath` 指令，搜索每个指令中提到的所有目录。`make` 按照它们在 makefile 中出现的顺序处理多个 `vpath` 指令；具有相同模式的多个指令是相互独立的。

因此，

```makefile
vpath %.c foo
vpath %   blish
vpath %.c bar
```

将在 foo、然后是 blish、然后是 bar 中查找以 ‘.c’ 结尾的文件，而

```makefile
vpath %.c foo:bar
vpath %   blish
```

将在 foo、然后是 bar、然后是 blish 中查找以 ‘.c’ 结尾的文件。



### 4.5.3 执行目录搜索的算法



​	当通过目录搜索找到一个先决条件时，无论是通用的还是选择性的，找到的路径名可能并不是 `make` 在先决条件列表中实际提供给您的路径名。有时候通过目录搜索发现的路径会被丢弃。

​	`make` 用于决定是否保留或丢弃通过目录搜索找到的路径的算法如下： 

1. 如果目标文件在 makefile 中指定的路径上不存在，执行目录搜索。
3. 如果目录搜索成功，该路径被保留，并且该文件被暂时存储为目标。
5. 使用相同的方法检查该目标的所有先决条件。
4. 在处理完先决条件后，目标可能需要或不需要重新构建： 
   1. 如果目标*不需要*重新构建，则通过目录搜索找到的文件的路径用于包含该目标的任何先决条件列表。简而言之，如果 `make` 不需要重新构建目标，则使用通过目录搜索找到的路径。
   3. 如果目标*需要*重新构建（已过时），则通过目录搜索找到的路径将被*丢弃*，并且目标将使用在 makefile 中指定的文件名进行重新构建。简而言之，如果 `make` 必须重新构建，则目标将在本地重新构建，而不是通过目录搜索找到的目录中重新构建。

​	这个算法可能看起来复杂，但在实践中，它通常正是您所希望的。

​	`make` 的其他版本使用了一个更简单的算法：如果文件不存在，并且通过目录搜索找到它，那么无论目标是否需要构建，都将始终使用该路径名。因此，如果目标被重新构建，它将在通过目录搜索找到的路径名处创建。

​	如果事实上，这是您希望某些或所有目录的行为，您可以使用 `GPATH` 变量将其通知给 `make`。

​	`GPATH` 与 `VPATH` 具有相同的语法和格式（即由空格或冒号分隔的路径名列表）。如果在通过目录搜索在也出现在 `GPATH` 中的目录中找到一个过时的目标，则不会丢弃该路径名。将使用扩展的路径重新构建目标。



### 4.5.4 使用目录搜索编写配方



​	当通过目录搜索在另一个目录中找到先决条件时，这不能更改规则的配方；它们将按照编写的方式执行。因此，您必须仔细编写配方，以便在 `make` 找到先决条件的目录中查找它们。

​	这是使用*自动变量*来实现的，例如 ‘`$^`’（见[自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)）。例如，‘`$^`’ 的值是规则的所有先决条件的列表，包括它们的目录名称，以及 ‘$@’ 的值是目标。因此：

```makefile
foo.o : foo.c
        cc -c $(CFLAGS) $^ -o $@
```

（变量 `CFLAGS` 存在，以便您可以通过隐式规则指定 C 编译的标志；我们在此处使用它是为了保持一致性，以便它会对所有 C 编译均产生影响；参见[隐式规则使用的变量](https://www.gnu.org/software/make/manual/make.html#Implicit-Variables)。）

​	通常，先决条件还包括头文件，您不希望在配方中提到。自动变量 ‘`$<`’ 仅为第一个先决条件：

```makefile
VPATH = src:../headers
foo.o : foo.c defs.h hack.h
        cc -c $(CFLAGS) $< -o $@
```





### 4.5.5 目录搜索和隐含规则



​	在指定了 `VPATH` 或 `vpath` 中的目录中搜索的过程也会在考虑隐含规则时发生（见[使用隐含规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)）。

​	例如，当文件 foo.o 没有显式规则时，`make` 会考虑隐含规则，比如说如果存在文件 foo.c，则内置规则会编译它。如果在当前目录中缺少这样的文件，则会在适当的目录中搜索它。如果 foo.c 存在（或在 makefile 中提到）在任何一个目录中，就会应用用于 C 编译的隐含规则。

​	隐含规则的配方通常使用自动变量作为必要性的一部分；因此，它们会使用目录搜索找到的文件名，无需额外的努力。



### 4.5.6 用于链接库的目录搜索



​	目录搜索在使用链接器的库时以特殊方式应用。当您编写一个名为 ‘-lname’ 形式的先决条件时，这种特殊功能就会发挥作用。（您可以通过先决条件通常是文件名来发现某些奇怪的事情，而库的*文件名*通常看起来像 libname.a，而不是像 ‘-lname’。）

​	当先决条件的名称具有 ‘-lname’ 形式时，`make` 会通过搜索文件 libname.so 来处理它，如果找不到该文件，则会在当前目录中搜索文件 libname.a，以及在匹配的 `vpath` 搜索路径和 `VPATH` 搜索路径中搜索，然后在目录 /lib、/usr/lib 和前缀/lib（通常为 /usr/local/lib，但是 MS-DOS/MS-Windows 版本的 `make` 的行为与前缀被定义为 DJGPP 安装树的根相同）中搜索。

​	例如，如果您的系统上有 /usr/lib/libcurses.a 库（没有 /usr/lib/libcurses.so 文件），则

```makefile
foo : foo.c -lcurses
        cc $^ -o $@
```

会在 foo 比 foo.c 或 /usr/lib/libcurses.a 旧时执行命令 ‘cc foo.c /usr/lib/libcurses.a -o foo’。

​	虽然默认的要搜索的文件集是 libname.so 和 libname.a，但这可以通过 `.LIBPATTERNS` 变量进行自定义。此变量值中的每个单词都是一个模式字符串。当看到类似 ‘-lname’ 的先决条件时，`make` 将会将列表中每个模式中的百分号替换为名称，并使用每个库文件名执行上述目录搜索。

​	`.LIBPATTERNS` 的默认值是 ‘lib%.so lib%.a’，这提供了上述默认行为。

​	您可以通过将此变量设置为空值来完全关闭链接库扩展。



## 4.6 虚拟目标 



​	虚拟目标是一个实际上不是文件名的目标；相反，它只是在明确请求进行构建时要执行的配方的名称。使用虚拟目标有两个原因：避免与同名文件冲突，以及提高性能。

​	如果您编写一个规则，其配方不会创建目标文件，则每当目标需要重新构建时，都会执行该配方。以下是一个示例：

```makefile
clean:
        rm *.o temp
```

​	由于 `rm` 命令不会创建名为 clean 的文件，因此可能永远不会存在这样的文件。因此，每当您输入 ‘make clean’ 时，`rm` 命令都会被执行。

​	在这个示例中，如果在此目录中创建了一个名为 clean 的文件，clean 目标将无法正常工作。由于它没有先决条件，clean 将始终被视为已更新，并且其配方将不会被执行。为避免此问题，您可以通过将其声明为 `.PHONY` 的先决条件（参见[特殊内置目标名称](https://www.gnu.org/software/make/manual/make.html#Special-Targets)）来显式地声明该目标为虚拟目标：

```makefile
.PHONY: clean
clean:
        rm *.o temp
```

​	完成此操作后，‘make clean’ 将在是否存在名为 clean 的文件的情况下都运行该配方。

​	`.PHONY` 的先决条件始终被解释为字面目标名称，从不解释为模式（即使它们包含 ‘%’ 字符）。为了始终重新构建模式规则，考虑使用“强制目标”（参见[没有配方或先决条件的规则](https://www.gnu.org/software/make/manual/make.html#Force-Targets)）。

​	虚拟目标在与 `make` 的递归调用一起使用时也很有用（参见[递归使用 `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)）。在这种情况下，makefile 通常会包含一个变量，其中列出了要构建的多个子目录。处理这种情况的简单方法是定义一个具有循环遍历子目录的配方的规则，如下所示：

```makefile
SUBDIRS = foo bar baz

subdirs:
        for dir in $(SUBDIRS); do \
          $(MAKE) -C $$dir; \
        done
```

​	然而，这种方法存在问题。首先，忽略子 make 中检测到的任何错误，这样即使其中一个失败，它也将继续构建其余的目录。这可以通过添加 shell 命令来注意错误并退出来克服，但是在使用 `-k` 选项调用 `make` 时，它也会执行此操作，这是不合适的。其次，更重要的是，您无法充分利用 `make` 并行构建目标的能力（参见[并行执行](https://www.gnu.org/software/make/manual/make.html#Parallel)），因为只有一个规则。每个单独的 makefile 的目标将在并行构建，但一次只有一个子目录会被构建。

​	通过将子目录声明为 `.PHONY` 目标（您必须这样做，因为子目录显然总是存在的；否则它不会被构建），您可以解决这些问题：

```makefile
SUBDIRS = foo bar baz

.PHONY: subdirs $(SUBDIRS)

subdirs: $(SUBDIRS)

$(SUBDIRS):
        $(MAKE) -C $@

foo: baz
```

​	在这里，我们还声明了在完成 baz 子目录之后才能构建 foo 子目录；当尝试并行构建时，此类关系声明尤其重要。

​	隐含规则搜索（参见[使用隐含规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)）对 `.PHONY` 目标不起作用。这就是为什么将目标声明为 `.PHONY` 对性能有好处的原因，即使您不担心实际文件的存在。

​	虚拟目标不应该是实际目标文件的先决条件；如果是这样，其配方将在每次 `make` 考虑该文件时运行。只要虚拟目标不是实际目标的先决条件，虚拟目标的配方将仅在显式地请求时才运行。

​	您不应该将一个包含在内的 makefile 声明为虚拟目标。虚拟目标不意味着代表真实文件，因为该目标始终被认为是过时的，`make` 将总是重新构建它，然后重新执行自身（参见[如何重新生成 Makefile](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)）。为避免这种情况，如果被标记为虚拟目标的包含文件被重新构建，`make` 不会重新执行自身。

​	虚拟目标可以有先决条件。当一个目录包含多个程序时，最方便的做法是在一个 makefile `./Makefile` 中描述所有的程序。由于默认情况下，将被重新构建的目标是 makefile 中的第一个目标，因此通常将其作为名为 `all` 的虚拟目标，并将所有的单独程序作为其先决条件。例如：

```makefile
all : prog1 prog2 prog3
.PHONY : all

prog1 : prog1.o utils.o
        cc -o prog1 prog1.o utils.o

prog2 : prog2.o
        cc -o prog2 prog2.o

prog3 : prog3.o sort.o utils.o
        cc -o prog3 prog3.o sort.o utils.o
```

​	现在您可以只输入 `make` 来重新生成所有三个程序，或者将要重新生成的程序作为参数指定（例如 `make prog1 prog3`）。虚拟目标不会被继承：虚拟目标的先决条件本身不会被视为虚拟目标，除非显式声明为虚拟目标。

​	当一个虚拟目标是另一个虚拟目标的先决条件时，它将作为另一个目标的子例程。例如，这里的 `make cleanall` 将删除对象文件、差异文件和文件 program：

```makefile
.PHONY: cleanall cleanobj cleandiff

cleanall : cleanobj cleandiff
        rm program

cleanobj :
        rm *.o

cleandiff :
        rm *.diff
```



## 4.7 无配方或先决条件的规则 



​	如果一个规则没有先决条件或配方，并且规则的目标是一个不存在的文件，那么 `make` 会假设每当运行其规则时，目标已被更新。这意味着所有依赖于这个目标的目标都将始终运行其配方。

​	下面的示例将说明这一点：

```makefile
clean: FORCE
        rm $(objects)
FORCE:
```

​	在这里，目标 'FORCE' 满足特殊条件，因此依赖于它的 'clean' 目标被强制运行其配方。'FORCE' 的名称没有什么特别之处，但通常以这种方式使用。

​	正如你所看到的，以这种方式使用 'FORCE' 与使用 '.PHONY: clean' 具有相同的结果。

​	使用 '.PHONY' 更加明确和高效。然而，其他版本的 `make` 不支持 '.PHONY'；因此，在许多 makefile 中都会出现 'FORCE'。参见 [伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)。



## 4.8 用空目标文件记录事件 



​	*空目标* 是伪目标的一种变体；它用于保存你不时明确请求的动作的配方。与伪目标不同，这个目标文件实际上可以存在；但是文件的内容无关紧要，通常为空。

​	空目标文件的目的是通过其最后修改时间来记录规则配方的最后执行时间。这样做是因为配方中的某个命令是用于更新目标文件的 `touch` 命令。

​	空目标文件应该有一些先决条件（否则就没有意义）。当你要重新生成空目标时，如果任何先决条件比目标更新，那么配方将被执行；换句话说，如果先决条件自上次重新生成目标以来发生了变化。以下是一个示例：

```makefile
print: foo.c bar.c
        lpr -p $?
        touch print
```

​	在这个规则中，当自上次 'make print' 以来任何源文件都发生了变化时，`lpr` 命令将被执行。自动变量 '$?' 被用于仅打印那些已更改的文件（参见 [自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)）。



## 4.9 特殊的内置目标名称

​	如果特定名称出现为目标，则具有特殊含义。

- `.PHONY`

  特殊目标 `.PHONY` 的先决条件被视为伪目标。在考虑此类目标时，`make` 将无条件地运行其配方，无论是否存在具有该名称的文件以及其最后修改时间如何。参见 [伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)。

- `.SUFFIXES`

  特殊目标 `.SUFFIXES` 的先决条件是用于检查后缀规则的后缀列表。参见 [过时的后缀规则](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules)。

- `.DEFAULT`

  为 `.DEFAULT` 指定的配方用于在未找到规则的情况下构建任何目标（无论是显式规则还是隐式规则）。参见 [定义备用默认规则](https://www.gnu.org/software/make/manual/make.html#Last-Resort)。如果指定了 `.DEFAULT` 配方，对于在规则中作为先决条件但不作为目标的每个文件，都将以其代表的文件名代表其执行配方。参见 [隐式规则搜索算法](https://www.gnu.org/software/make/manual/make.html#Implicit-Rule-Search)。

- `.PRECIOUS`

  `.PRECIOUS` 依赖的目标将获得以下特殊处理：如果在执行其配方时 `make` 被终止或中断，目标不会被删除。参见 [中断或终止 `make`](https://www.gnu.org/software/make/manual/make.html#Interrupts)。此外，如果目标是中间文件，它将在不再需要它后不会被删除，这与通常的做法不同。参见 [隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。在这方面，它与 `.SECONDARY` 特殊目标重叠。你还可以将隐式规则的目标模式（例如‘%.o’）作为 `.PRECIOUS` 的先决条件文件，以保留使用目标模式匹配该文件名的规则创建的中间文件。

- `.INTERMEDIATE`

  `.INTERMEDIATE` 依赖的目标被视为中间文件。参见 [隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。没有先决条件的 `.INTERMEDIATE` 不产生任何效果。

- `.NOTINTERMEDIATE`

  特殊目标 `.NOTINTERMEDIATE` 的先决条件从不被视为中间文件。参见 [隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。没有先决条件的 `.NOTINTERMEDIATE` 导致所有目标被视为非中间文件。如果先决条件是目标模式，那么使用该模式规则构建的目标不会被视为中间文件。

- `.SECONDARY`

  `.SECONDARY` 依赖的目标被视为中间文件，但它们永远不会被自动删除。参见 [隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。`.SECONDARY` 可用于避免某些不寻常情况下的冗余重新构建。例如：

  ```makefile
hello.bin: hello.o bye.o
          $(CC) -o $@ $^
  
  %.o: %.c
          $(CC) -c -o $@ $<
  
  .SECONDARY: hello.o bye.o
  ```
  
  假设 `hello.bin` 对于源文件来说是最新的，*但是*对象文件 `hello.o` 丢失。没有 `.SECONDARY`，`make` 将重新构建 `hello.o`，然后重新构建 `hello.bin`，即使源文件没有更改。通过将 `hello.o` 声明为 `.SECONDARY`，`make` 将不需要重新构建它，也不需要重新构建 `hello.bin`。当然，如果其中一个源文件进行了更新，则所有对象文件都将被重新构建，以便可以成功创建 `hello.bin`。没有先决条件的 `.SECONDARY` 导致所有目标被视为中间目标（即不会删除目标，因为它被视为中间文件）。

- `.SECONDEXPANSION`

  如果在 makefile 的任何地方提及了 `.SECONDEXPANSION` 作为目标，那么在读取所有 makefile 后，所有在其后定义的先决条件列表将在第二次展开。参见 [Secondary Expansion](https://www.gnu.org/software/make/manual/make.html#Secondary-Expansion)。

- `.DELETE_ON_ERROR`

  如果在 makefile 的任何地方提及了 `.DELETE_ON_ERROR` 作为目标，那么如果规则的目标发生更改且其配方以非零退出状态退出，`make` 将删除目标，就像在收到信号时一样。参见 [错误的配方](https://www.gnu.org/software/make/manual/make.html#Errors)。

- `.IGNORE`

  如果为 `.IGNORE` 指定了先决条件，那么 `make` 将忽略执行这些特定文件的配方中的错误。将忽略 `.IGNORE` 的配方（如果有）。如果没有先决条件地作为目标提及 `.IGNORE`，则表示在执行所有文件的配方之前不要打印任何配方。此对 ‘.IGNORE’ 的使用仅出于历史兼容性而支持。由于这会影响 makefile 中的每个配方，因此它不是非常有用；我们建议您使用更选择性的方式来忽略特定配方中的错误。参见 [错误的配方](https://www.gnu.org/software/make/manual/make.html#Errors)。

- `.LOW_RESOLUTION_TIME`

  如果为 `.LOW_RESOLUTION_TIME` 指定了先决条件，`make` 将假定这些文件由生成低分辨率时间戳的命令创建。将忽略 `.LOW_RESOLUTION_TIME` 目标的配方。许多现代文件系统的高分辨率文件时间戳降低了 `make` 错误地认为文件是最新的机会。不幸的是，一些主机不提供设置高分辨率文件时间戳的方法，因此显式设置文件的时间戳的命令（如 ‘cp -p’）必须丢弃其子秒部分。如果文件是由这样的命令创建的，您应将其列为 `.LOW_RESOLUTION_TIME` 的先决条件，以便 `make` 不会错误地认为文件已过时。例如：

  ```makefile
.LOW_RESOLUTION_TIME: dst
  dst: src
          cp -p src dst
  ```
  
  由于 ‘cp -p’ 丢弃了 src 的时间戳的子秒部分，所以即使它是最新的，dst 通常也比 src 旧。`.LOW_RESOLUTION_TIME` 行使 `make` 将 dst 视为最新的，如果其时间戳在与 src 的时间戳相同的第一秒的开始处。由于存档格式的限制，存档成员时间戳始终是低分辨率的。您不需要将存档成员列为 `.LOW_RESOLUTION_TIME` 的先决条件，因为 `make` 会自动执行此操作。

- `.SILENT`

  如果为 `.SILENT` 指定了先决条件，那么 `make` 将在执行这些特定文件的配方之前不会打印用于重新制作它们的配方。将忽略 `.SILENT` 目标的配方。如果没有先决条件地作为目标提及 `.SILENT`，则表示在执行它们之前不要打印任何配方。您还可以使用更选择性的方法来静音特定配方命令行。参见 [配方回显](https://www.gnu.org/software/make/manual/make.html#Echoing)。如果要在特定 `make` 运行的所有配方中都取消静音，请使用 ‘-s’ 或 ‘--silent’ 选项（参见 [选项总览](https://www.gnu.org/software/make/manual/make.html#Options-Summary)）。

- `.EXPORT_ALL_VARIABLES`

  仅通过作为目标提及此项，`make` 将默认导出所有变量给子进程。这是与使用不带参数的 `export` 相同的一种选择。参见 [将变量传递给子 `make`](https://www.gnu.org/software/make/manual/make.html#Variables_002fRecursion)。

- `.NOTPARALLEL`

  如果没有先决条件地作为目标提及 `.NOTPARALLEL`，则在此次 `make` 调用中，所有目标都将串行运行，即使给定了 ‘-j’ 选项。任何递归调用的 `make` 命令仍将并行运行配方（除非其 makefile 也包含此目标）。如果 `.NOTPARALLEL` 有目标作为先决条件，则这些目标的所有先决条件都将串行运行。这在列出的目标之间添加了 `.WAIT`。参见 [禁用并行执行](https://www.gnu.org/software/make/manual/make.html#Parallel-Disable)。

- `.ONESHELL`

  如果为 `.ONESHELL` 指定了目标，那么构建目标时，配方的所有行都将传递给单个 shell 调用，而不是单独调用每一行。参见 [配方执行](https://www.gnu.org/software/make/manual/make.html#Execution)。

- `.POSIX`

  如果为 `.POSIX` 指定了目标，那么将以 POSIX 符合模式解析和运行 makefile。这*不*意味着只有符合 POSIX 的 makefile 将被接受：所有高级的 GNU `make` 特性仍然可用。相反，此目标会使 `make` 在 `make` 的默认行为与 POSIX 不同的地方表现出 POSIX 所要求的行为。特别地，如果提到了此目标，那么会像 shell 已经传递了 `-e` 标志一样调用配方：在配方中的第一个失败的命令将立即导致配方失败。

​	在任何目标中定义的隐式规则后缀也算作特殊目标，如果它出现为目标，两个后缀的连接也是特殊目标，例如 ‘.c.o’。这些目标是后缀规则，一种已过时的定义隐式规则的方式（但仍广泛使用）。原则上，任何目标名称都可以是这种方式的特殊目标，如果将其分为两个部分并将两个部分都添加到后缀列表中。实际上，后缀通常以 ‘.’ 开头，因此这些特殊目标名称也以 ‘.’ 开头。参见 [过时的后缀规则](https://www.gnu.org/software/make/manual/make.html#Suffix-Rules)。



## 4.10 一条规则中的多个目标

​	当显式规则具有多个目标时，可以以两种可能的方式之一处理它们：作为独立目标或作为分组目标。它们的处理方式由在目标列表之后出现的分隔符确定。

### 独立目标的规则

​	使用标准目标分隔符 `:` 的规则定义独立目标。这等效于为每个目标编写相同的规则，具有重复的先决条件和配方。通常，配方会使用自动变量，如‘$@’，以指定正在构建的目标。

​	独立目标的规则在两种情况下很有用：

- 您只希望有先决条件，没有配方。例如：

  ```makefile
  kbd.o command.o files.o: command.h
  ```

  为每个三个目标文件添加了一个额外的先决条件。它等同于编写：

  ```makefile
  kbd.o: command.h
  command.o: command.h
  files.o: command.h
  ```

- 类似的配方适用于所有目标。自动变量 ‘$@’ 可用于将特定目标替换为命令中的内容（参见 [自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)）。例如：

  ```makefile
  bigoutput littleoutput : text.g
          generate text.g -$(subst output,,$@) > $@
  ```


等效于：

```makefile
  bigoutput : text.g
          generate text.g -big > bigoutput
  littleoutput : text.g
          generate text.g -little > littleoutput
```

在这里，我们假设假设的程序 `generate` 生成两种类型的输出，一个是给定 ‘-big’，另一个是给定 ‘-little’。参见 [字符串替换和分析函数](https://www.gnu.org/software/make/manual/make.html#Text-Functions)，以了解 `subst` 函数的解释。

​	假设您想根据目标的先决条件进行变化，就像变量 ‘$@’ 允许您在配方中变化一样。您无法在普通规则中的多个目标中这样做，但可以在*静态模式规则*中这样做。参见 [静态模式规则](https://www.gnu.org/software/make/manual/make.html#Static-Pattern)。

### 分组目标的规则



​	如果您有一个配方从单个调用中生成多个文件，您可以通过声明规则使用*分组目标*来表示这种关系。分组目标规则使用分隔符 `&:`（这里的‘&’用于表示“全部”）。

​	当 `make` 构建任何一个分组目标时，它会理解组中的所有其他目标也会因配方调用而更新。此外，如果只有一些分组目标已过时或丢失，则 `make` 将意识到运行配方将更新所有目标。最后，如果任何分组目标已过时，则所有分组目标都被视为过时。

​	作为示例，此规则定义了一个分组目标：

```
foo bar biz &: baz boz
        echo $^ > foo
        echo $^ > bar
        echo $^ > biz
```

​	在执行分组目标的配方期间，自动变量 ‘$@’ 被设置为触发规则的组中特定目标的名称。在分组目标规则的配方中依赖于此变量时必须小心使用。

​	与独立目标不同，分组目标规则 *必须* 包含一个配方。然而，属于分组目标的目标也可以出现在没有配方的独立目标规则定义中。

​	每个目标只能有一个与之关联的配方。如果一个分组目标出现在独立目标规则中，或者出现在另一个带有配方的分组目标规则中，将会得到警告，并且后者的配方将替换前者的配方。此外，目标将从前一个组中删除，并仅出现在新组中。

​	如果希望目标出现在多个组中，那么在声明包含该目标的所有组时，必须使用双冒号分隔符 `&::`。独立地考虑每个分组的双冒号分隔目标，并且每个分组双冒号规则的配方最多执行一次，如果其多个目标中至少一个需要更新，则执行。



## 4.11 一个目标的多个规则



​	一个文件可以是多个规则的目标。所有规则中提到的所有先决条件都会合并成一个目标的先决条件列表。如果目标比任何规则中的任何先决条件都要旧，那么就会执行配方。

​	对于一个文件只能有一个要执行的配方。如果有多个规则为同一个文件提供配方，`make` 将使用最后一个给出的规则，并打印错误消息。（作为特殊情况，如果文件名以点开头，则不会打印错误消息。这种奇怪的行为仅用于与其他 `make` 实现的兼容性...您应避免使用它）。有时候在同一个目标中具有多个规则的配方很有用，这些规则在 makefile 的不同部分中定义；您可以使用*双冒号规则*（参见[双冒号规则](https://www.gnu.org/software/make/manual/make.html#Double_002dColon)）来实现这一点。

​	可以使用仅有先决条件的额外规则，以一次给多个文件提供一些额外的先决条件。例如，makefile 常常有一个变量，比如 `objects`，其中包含正在构建的系统中所有编译器输出文件的列表。一种简单的方法来表示如果 `config.h` 更改，则所有这些文件都必须重新编译，是写如下内容：

```makefile
objects = foo.o bar.o
foo.o : defs.h
bar.o : defs.h test.h
$(objects) : config.h
```

​	这可以在不更改真正指定如何制作目标文件的规则的情况下插入或删除，这是一种方便的形式，如果您希望间歇性地添加附加先决条件时可以使用。

​	另一个细节是，附加的先决条件可以使用通过命令行参数设置的变量来指定（参见[覆盖变量](https://www.gnu.org/software/make/manual/make.html#Overriding)）。例如，

```makefile
extradeps=
$(objects) : $(extradeps)
```

意味着命令 `make extradeps=foo.h` 将会将 `foo.h` 视为每个目标文件的先决条件，但普通的 `make` 不会这样做。

​	如果一个目标的所有显式规则都没有配方，那么 `make` 会搜索适用的隐式规则来找到一个配方，参见[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。





## 4.12 静态模式规则



​	*静态模式规则*是指定多个目标并基于目标名称构造每个目标的先决条件名称的规则。它们比具有多个目标的普通规则更通用，因为目标的先决条件不必相同。它们的先决条件必须是*类似的*，但不一定是*相同的*。





### 4.12.1 静态模式规则的语法 

​	下面是静态模式规则的语法：

```makefile
targets …: target-pattern: prereq-patterns …
        recipe
        …
```

​	目标列表指定规则适用于的目标。这些目标可以包含通配符，就像普通规则的目标一样（参见[在文件名中使用通配符字符](https://www.gnu.org/software/make/manual/make.html#Wildcards)）。

​	目标模式和先决条件模式说明如何计算每个目标的先决条件。每个目标与目标模式匹配，以提取目标名称的一部分，称为*词根*。这个词根被替换为每个先决条件模式，以生成先决条件名称（每个来自每个先决条件模式）。

​	每个模式通常只包含字符 ‘%’ 一次。当目标模式与目标匹配时，‘%’ 可以匹配目标名称的任何部分；这部分被称为*词根*。模式的其余部分必须完全匹配。例如，目标 `foo.o` 与模式 `%.o` 匹配，词根为 ‘foo’。目标 `foo.c` 和 `foo.out` 不匹配该模式。

​	每个目标的先决条件的名称是通过将词根替换为先决条件模式中的 ‘%’ 来制作的。例如，如果一个先决条件模式是 `%.c`，那么将词根 ‘foo’ 替换为它会得到先决条件名 `foo.c`。编写一个不包含 ‘%’ 的先决条件模式是合法的；那么这个先决条件对于所有目标都是相同的。

​	在模式规则中的 ‘%’ 字符可以用前面的反斜杠（‘\’）引用。否则会引用 ‘%’ 字符的反斜杠可以用更多的反斜杠进行引用。在文件名比较或将词根替换到模式中之前，从模式中删除了引用 ‘%’ 字符的反斜杠。没有危险引用 ‘%’ 字符的反斜杠将不受影响。例如，模式 `the\%weird\\%pattern\\` 具有在操作 ‘%’ 字符之前的 ‘the%weird\’，以及在其后的 ‘pattern\’。最后两个反斜杠保持不变，因为它们不会影响任何 ‘%’ 字符。

​	以下是一个示例，从对应的 `.c` 文件编译出 `foo.o` 和 `bar.o`：

```makefile
objects = foo.o bar.o

all: $(objects)

$(objects): %.o: %.c
        $(CC) -c $(CFLAGS) $< -o $@
```

​	这里，‘`$<`’ 是自动变量，保存了先决条件的名称，‘`$@`’ 是自动变量，保存了目标的名称；参见[自动变量](https://www.gnu.org/software/make/manual/make.html#Automatic-Variables)。

​	每个指定的目标必须与目标模式匹配；如果不匹配，将会发出警告。如果有一个文件列表，其中只有一些文件与模式匹配，您可以使用 `filter` 函数来删除不匹配的文件名（参见[用于字符串替换和分析的函数](https://www.gnu.org/software/make/manual/make.html#Text-Functions)）：

```makefile
files = foo.elc bar.o lose.o

$(filter %.o,$(files)): %.o: %.c
        $(CC) -c $(CFLAGS) $< -o $@
$(filter %.elc,$(files)): %.elc: %.el
        emacs -f batch-byte-compile $<
```

​	在这个示例中，`$(filter %.o,$(files))` 的结果是 `bar.o` 和 `lose.o`，第一个静态模式规则导致这些目标文件通过编译相应的 C 源文件来更新。`$(filter %.elc,$(files))` 的结果是 `foo.elc`，因此该文件是从 `foo.el` 制作的。

​	另一个示例展示了如何在静态模式规则中使用 `$*`：

```makefile
bigoutput littleoutput : %output : text.g
        generate text.g -$* > $@
```

​	当运行 `generate` 命令时，`$*` 将展开为词根，即 ‘big’ 或 ‘little’。



### 4.12.2 静态模式规则与隐式规则对比

​	静态模式规则与作为模式规则定义的隐式规则有很多共同之处（参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)）。两者都有一个目标模式和构造先决条件名称的模式。区别在于 `make` 如何决定规则适用的*时间*。

​	隐式规则*可以*适用于与其模式匹配的任何目标，但*只有*在目标没有明确指定配方，且只有在可以找到先决条件时才适用。如果有多个隐式规则适用，只有一个适用；选择取决于规则的顺序。

​	相比之下，静态模式规则适用于您在规则中指定的精确的目标列表。它不能适用于任何其他目标，而且它无论如何都会适用于每个指定的目标。如果有两个冲突的规则适用，并且都有配方，那么就会出错。

​	静态模式规则之所以更好，是因为以下原因：

- 您可能希望为一些不能在语法上进行分类但可以在显式列表中给出的文件覆盖通常的隐式规则。
- 如果您不能确定所使用的目录的确切内容，您可能不确定哪些其他无关的文件可能会导致 `make` 使用错误的隐式规则。选择可能取决于隐式规则搜索的顺序。使用静态模式规则，就没有不确定性：每个规则都适用于精确指定的目标。





## 4.13 双冒号规则



​	*双冒号*规则是在目标名称后使用‘::’而不是‘:’编写的显式规则。当相同的目标在多个规则中出现时，它们与普通规则处理方式不同。具有双冒号的模式规则具有完全不同的含义（参见[匹配任意模式规则](https://www.gnu.org/software/make/manual/make.html#Match_002dAnything-Rules)）。

​	当一个目标在多个规则中出现时，所有规则必须是相同类型的：要么全是普通规则，要么全是双冒号规则。如果它们是双冒号规则，每个规则都相互独立。如果目标比该规则的任何先决条件都要旧，将执行每个双冒号规则的配方。如果该规则没有先决条件，其配方总是会被执行（即使目标已经存在）。这可能导致执行零个、任意个或所有双冒号规则。

​	具有相同目标的双冒号规则实际上是完全独立的。每个双冒号规则都是单独处理的，就像具有不同目标的规则一样。

​	目标的双冒号规则按照它们在 makefile 中出现的顺序执行。然而，双冒号规则真正有意义的情况是执行配方的顺序无关紧要的情况。

​	双冒号规则有些隐晦，而且通常并不常用；它们为在更新目标时使用的方法因所需的先决条件文件不同而有所不同提供了一种机制，而这种情况很少见。

​	每个双冒号规则都应该指定一个配方；如果没有，如果适用，将会使用隐式规则。参见[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。



## 4.14 自动生成先决条件

​	在程序的 makefile 中，许多您需要编写的规则通常只表示某个目标文件依赖于某个头文件。例如，如果 `main.c` 通过 `#include` 使用 `defs.h`，您可以编写：

```
main.o: defs.h
```

​	您需要这个规则，以便 `make` 知道每当 `defs.h` 更改时，它必须重新制作 `main.o`。您可以看到，对于一个大型程序，您必须在 makefile 中编写几十个这样的规则。而且，每次添加或删除 `#include` 时，您都必须非常小心地更新 makefile。

​	为了避免这种麻烦，大多数现代 C 编译器可以通过查看源文件中的 `#include` 行来自动生成这些规则。通常，这是通过使用编译器的‘-M’选项来实现的。例如，命令：

```
cc -M main.c
```

会生成输出：

```
main.o : main.c defs.h
```

​	因此，您不再需要自己编写所有这些规则。编译器会为您执行。

​	请注意，这样的规则构成了在 makefile 中提及 `main.o`，因此它永远不会被隐式规则搜索视为中间文件。这意味着 `make` 在使用文件后永远不会删除它；参见[隐式规则链](https://www.gnu.org/software/make/manual/make.html#Chained-Rules)。

​	在旧的 `make` 程序中，传统做法是使用此编译器特性，通过类似 ‘make depend’ 的命令按需生成先决条件。该命令会创建一个名为 `depend` 的文件，其中包含所有自动生成的先决条件；然后 makefile 可以使用 `include` 来读取它们（参见[包含其他 makefile](https://www.gnu.org/software/make/manual/make.html#Include)）。

​	在 GNU `make` 中，重新制作 makefile 的功能使这种做法过时了——您永远不需要明确告诉 `make` 重新生成先决条件，因为它总是会重新生成任何过期的 makefile。参见[如何重新制作 makefile](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)。

​	我们推荐用于自动生成先决条件的做法是为每个源文件编写一个相应的 makefile。对于每个源文件 `name.c`，都有一个名为 `name.d` 的 makefile，其中列出了目标文件 `name.o` 依赖的文件。这样只有发生更改的源文件需要重新扫描以生成新的先决条件。

​	以下是从名为 `name.c` 的 C 源文件生成先决条件文件（即 makefile）`name.d` 的模式规则：

```
%.d: %.c
        @set -e; rm -f $@; \
         $(CC) -M $(CPPFLAGS) $< > $@.$$$$; \
         sed 's,\($*\)\.o[ :]*,\1.o $@ : ,g' < $@.$$$$ > $@; \
         rm -f $@.$$$$
```

​	有关定义模式规则的信息，请参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)。 shell 中的 ‘-e’ 标志会导致在 `$(CC)` 命令（或任何其他命令）失败（退出并返回非零状态）时立即退出。

​	对于 GNU C 编译器，您可能希望使用 ‘-MM’ 标志而不是 ‘-M’。这会省略对系统头文件的先决条件。有关详细信息，请参见 [控制预处理器的选项](https://gcc.gnu.org/onlinedocs/gcc/Preprocessor-Options.html#Preprocessor-Options)。

​	`sed` 命令的目的是将（例如）：

```
main.o : main.c defs.h
```

转换为：

```
main.o main.d : main.c defs.h
```

​	这使得每个 ‘.d’ 文件依赖于相应的 ‘.o’ 文件依赖的所有源文件和头文件。然后，`make` 知道每当任何源文件或头文件发生更改时，必须重新生成先决条件。

​	一旦您定义了重新制作 ‘.d’ 文件的规则，然后可以使用 `include` 指令将它们全部读入。参见[包含其他 makefile](https://www.gnu.org/software/make/manual/make.html#Include)。例如：

```
sources = foo.c bar.c

include $(sources:.c=.d)
```

（此示例使用替代变量引用将源文件列表 ‘foo.c bar.c’ 转换为先决条件 makefile 列表 ‘foo.d bar.d’。有关替代变量引用的完整信息，请参见[替代引用](https://www.gnu.org/software/make/manual/make.html#Substitution-Refs)。）由于 ‘.d’ 文件像其他任何 makefile 一样，`make` 会根据需要重新制作它们，您不需要做其他工作。参见[如何重新制作 makefile](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)。

​	请注意，‘.d’ 文件包含目标定义；请务必将 `include` 指令放置在第一个默认目标之后，以免随机对象文件成为默认目标。参见[make 的工作原理](https://www.gnu.org/software/make/manual/make.html#How-Make-Works)。