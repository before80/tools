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



​	告诉 `make` 如何重新编译系统的信息来自于读取一个称为 *makefile* 的数据库。

## 3.1 Makefile 包含什么

​	Makefile 包含五种类型的内容：*显式规则*、*隐式规则*、*变量定义*、*指令* 和 *注释*。规则、变量和指令在后面的章节中有详细描述。

- *显式规则* 指定何时以及如何重新生成一个或多个文件，这些文件称为规则的 *目标*。它列出了目标所依赖的其他文件，称为目标的 *先决条件*，还可以提供用于创建或更新目标的配方。参见[编写规则](https://www.gnu.org/software/make/manual/make.html#Rules)。

- *隐式规则* 指定何时以及如何基于它们的名称重新生成一类文件。它描述了一个目标可能依赖于一个与目标类似的文件，并给出了创建或更新这样一个目标的配方。参见[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。

- *变量定义* 是一行，为一个变量指定了一个文本字符串值，可以在以后的文本中进行替换。简单的 Makefile 示例显示了一个变量定义，即将 `objects` 定义为所有目标文件的列表（参见[变量使 Makefile 更简洁](https://www.gnu.org/software/make/manual/make.html#Variables-Simplify)）。

- *指令* 是一个指令，让 `make` 在读取 makefile 时执行一些特殊操作。这些操作包括：

  - 读取另一个 makefile（参见[包含其他 Makefile](https://www.gnu.org/software/make/manual/make.html#Include)）。
  - 基于变量的值决定是否使用或忽略 makefile 的一部分（参见[条件性部分的 Makefile](https://www.gnu.org/software/make/manual/make.html#Conditionals)）。
  - 从包含多行的逐字字符串中定义变量（参见[定义多行变量](https://www.gnu.org/software/make/manual/make.html#Multi_002dLine)）。

- 在 makefile 的一行中，'#' 开始一个*注释*。它和行的其余部分都会被忽略，但是除非使用另一个反斜杠进行转义的尾随反斜杠，否则会将尾随反斜杠继续跨越多行。只包含注释（可能在其前面有空格）的行在实际上是空的，并被忽略。如果要输入文字 `#`，请使用反斜杠进行转义（例如，`\#`）。注释可以出现在 makefile 的任何行上，尽管在某些情况下会被特殊处理。

  你不能在变量引用或函数调用内使用注释：在变量引用或函数调用内，任何 `#` 实例将被视为文字（而不是注释的开头）。

  在配方中的注释会传递给 shell，就像其他任何配方文本一样。shell 决定如何解释它：这是否是注释取决于 shell。

  在 `define` 指令内，注释在定义变量期间不会被忽略，而是在变量的值中保持完整。当展开变量时，它们将被视为 `make` 注释或配方文本，取决于评估变量的上下文。

  






### 3.1.1 分割长行



​	Makefile 使用“基于行”的语法，其中换行符是特殊的，标志着语句的结束。GNU `make` 没有对语句行的长度限制，可以达到计算机内存的上限。

​	然而，对于过长以至于无法在不换行或滚动的情况下显示的行，很难阅读。因此，您可以通过在语句的中间添加换行来使您的 Makefile 更易读：您可以使用反斜杠（`\`）字符来转义内部换行符。在需要区分的情况下，我们将将“物理行”指代为以换行符结尾的单行（无论是否转义），而“逻辑行”则是包括所有转义换行符直到第一个非转义换行符的完整语句。

​	反斜杠/换行组合的处理方式取决于语句是配方行还是非配方行。在配方行中处理反斜杠/换行将在稍后讨论（参见[分割配方行](https://www.gnu.org/software/make/manual/make.html#Splitting-Recipe-Lines)）。

​	在配方行之外，反斜杠/换行将转换为一个单独的空格字符。完成后，反斜杠/换行周围的所有空格都将压缩为一个空格：这包括反斜杠之前的所有空格，反斜杠/换行之后行首的所有空格，以及任何连续的反斜杠/换行组合。

​	如果定义了`.POSIX` 特殊目标，则会稍微修改反斜杠/换行的处理以符合 POSIX.2：首先，反斜杠之前的空格不会被移除，其次，连续的反斜杠/换行不会被压缩。

#### 不添加空格的分割



​	如果需要分割一行，但又不想添加任何空格，您可以使用一个微妙的技巧：将反斜杠/换行对替换为三个字符：美元符号、反斜杠和换行：

```makefile
var := one$\
       word
```

​	在`make`去除反斜杠/换行并将以下行压缩为单个空格后，这等同于：

```makefile
var := one$ word
```

​	然后`make`将执行变量展开。变量引用‘$’指的是一个名为“”（空格）的单字符变量，该变量不存在，因此展开为空字符串，从而得到等效的最终赋值：

```makefile
var := oneword
```





## 3.2 给您的 Makefile 命名



​	默认情况下，当 `make` 查找 Makefile 时，它会按顺序尝试以下名称：GNUmakefile、makefile 和 Makefile。

​	通常，您应该将您的 Makefile 命名为 makefile 或 Makefile。（我们建议使用 Makefile，因为它在目录列表的开头部分明显可见，就在其他重要文件（例如 README）附近。）第一个被检查的名称 GNUmakefile，对于大多数 Makefile 不推荐使用。只有当您有一个特定于 GNU `make` 的 Makefile，并且其他版本的 `make` 不会理解它时，才应该使用这个名称。其他 `make` 程序会查找 makefile 和 Makefile，但不会查找 GNUmakefile。

​	如果 `make` 没有找到这些名称中的任何一个，它将不使用任何 Makefile。然后，您必须使用命令参数指定一个目标，`make` 将尝试仅使用其内置的隐式规则来确定如何重新生成它。请参阅[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。

​	如果您想为您的 Makefile 使用非标准名称，您可以使用 `-f` 或 `--file` 选项指定 Makefile 名称。参数 `-f name` 或 `--file=name` 告诉 `make` 将文件名读取为 Makefile。如果使用多个 `-f` 或 `--file` 选项，可以指定多个 Makefile。所有的 Makefile 将按照指定的顺序有效地串联在一起。默认的 Makefile 名称 GNUmakefile、makefile 和 Makefile 在使用 `-f` 或 `--file` 时不会自动检查。



## 3.3 包含其他 Makefile 



​	`include` 指令告诉 `make` 暂停读取当前的 Makefile 并在继续之前读取一个或多个其他的 Makefile。该指令是 Makefile 中的一行，格式如下：

```makefile
include filenames…
```

filenames 可以包含 shell 文件名模式。如果 filenames 为空，将不会包含任何内容，并且不会打印错误。

​	在行首允许并忽略额外的空格，但第一个字符不能是制表符（或 `.RECIPEPREFIX` 的值） - 如果行以制表符开头，它将被视为配方行。在 `include` 和文件名之间需要有空白，以及在文件名之间；额外的空白将被忽略，包括指令结尾的位置。在行尾允许以 `#` 开头的注释。如果文件名包含任何变量或函数引用，它们会被展开。请参阅[如何使用变量](https://www.gnu.org/software/make/manual/make.html#Using-Variables)。

​	例如，如果您有三个 .mk 文件，a.mk、b.mk 和 c.mk，且 `$(bar)` 展开为 `bish bash`，那么以下表达式

```makefile
include foo *.mk $(bar)
```

等同于

```makefile
include foo a.mk b.mk c.mk bish bash
```

​	当 `make` 处理 `include` 指令时，它会暂停读取包含它的 Makefile，并依次从每个列出的文件中读取。完成后，`make` 将继续读取包含该指令的 Makefile。

​	在使用 `include` 指令的一种情况是，当由各个目录中的单独 Makefile 处理的多个程序需要使用共同的变量定义（参见[设置变量](https://www.gnu.org/software/make/manual/make.html#Setting)）或模式规则（参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)）时。

​	另一个使用场景是当您希望自动生成源文件的先决条件时；可以将这些先决条件放在一个由主 Makefile 包含的文件中。这通常比使用其他版本的 `make` 传统做法中的追加方式更为清晰。请参阅[自动生成先决条件](https://www.gnu.org/software/make/manual/make.html#Automatic-Prerequisites)。

​	如果指定的名称不以斜杠开头（或在使用具有 MS-DOS / MS-Windows 路径支持的 GNU Make 编译时，不以驱动器号和冒号开头），且在当前目录中找不到文件，则会搜索其他几个目录。首先，会搜索您使用 `-I` 或 `--include-dir` 选项指定的任何目录（参见[选项概要](https://www.gnu.org/software/make/manual/make.html#Options-Summary)）。然后按照以下顺序搜索以下目录（如果存在）：prefix/include（通常是 /usr/local/include [1](https://www.gnu.org/software/make/manual/make.html#FOOT1)) /usr/gnu/include，/usr/local/include，/usr/include。

​	`.INCLUDE_DIRS` 变量将包含 `make` 将搜索包含文件的当前列表。请参阅[其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)。

​	您可以通过在命令行中添加特殊值 `-`（例如 `-I-`）的 `-I` 选项来避免在这些默认目录中搜索，默认情况下会搜索这些默认目录。这将使 `make` 忽略已经设置的包含目录，包括默认目录。

​	如果任何这些目录中都找不到所包含的 Makefile，这不是立即致命的错误；继续处理包含 `include` 的 Makefile。一旦完成读取 Makefile，`make` 将尝试重新生成任何已过期或不存在的 Makefile。请参阅[如何重新生成 Makefile](https://www.gnu.org/software/make/manual/make.html#Remaking-Makefiles)。只有在找不到重新生成 Makefile 的规则，或者找到了规则但配方失败时，`make` 才会将丢失的 Makefile 诊断为致命错误。

​	如果要让 `make` 忽略不存在或无法重新生成的 Makefile，而不显示任何错误消息，请使用 `-include` 指令而不是 `include`，如下所示：

```makefile
-include filenames…
```

​	这与 `include` 在所有方面都类似，但是如果任何文件名（或任何文件名的任何先决条件）不存在或无法重新生成，都不会出现错误（甚至不会有警告）。

​	为了与其他一些 `make` 实现兼容，`sinclude` 是 `-include` 的另一个名称。



## 3.4 变量 `MAKEFILES` 



​	如果环境变量 `MAKEFILES` 被定义，`make` 将其值视为其他要在其他 Makefile 之前读取的一个或多个名称（用空格分隔）。这与 `include` 指令类似：将搜索各个目录以获取这些文件（参见[包含其他 Makefile](https://www.gnu.org/software/make/manual/make.html#Include)）。此外，默认目标从这些 Makefile 中的任何一个（或由它们包含的任何 Makefile）中永远不会取出，并且如果在 `MAKEFILES` 中列出的文件找不到，也不会报错。

​	`MAKEFILES` 的主要用途是在递归调用 `make` 之间进行通信（参见[递归使用 `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)）。通常情况下，在顶层调用 `make` 之前设置环境变量通常是不可取的，因为最好不要从外部干扰 Makefile。然而，如果您在没有特定 Makefile 的情况下运行 `make`，`MAKEFILES` 中的 Makefile 可以执行有助于内置隐式规则更好地工作的有用操作，例如定义搜索路径（参见[为先决条件搜索目录](https://www.gnu.org/software/make/manual/make.html#Directory-Search)）。

​	一些用户会在登录时自动设置环境变量 `MAKEFILES`，并编写使 Makefile 预期这样做的程序。这是一个非常糟糕的想法，因为这样的 Makefile 将无法由其他人运行。更好的做法是在 Makefile 中编写明确的 `include` 指令。请参阅[包含其他 Makefile](https://www.gnu.org/software/make/manual/make.html#Include)。



## 3.5 如何重新生成 Makefile 



​	有时，Makefile 可以从其他文件重新生成，例如 RCS 或 SCCS 文件。如果可以从其他文件重新生成 Makefile，则可能希望 `make` 获取最新版本的 Makefile 以供阅读。

​	为此，在读取所有 Makefile 后，`make` 将依次将每个 Makefile 视为一个目标目标，以它们被处理的顺序，并尝试更新它。如果启用并行构建（参见[并行执行](https://www.gnu.org/software/make/manual/make.html#Parallel)），则也会并行重新构建 Makefile。

​	如果 Makefile 具有规则说明如何更新它（在该 Makefile 本身中找到，或在其他 Makefile 中找到），或者如果适用隐式规则（参见[使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)），则会在必要时进行更新。在检查了所有 Makefile 之后，如果任何一个实际上已更改，`make` 将从干净的状态开始，并重新读取所有 Makefile。（它还会尝试重新更新每一个 Makefile，但通常这不会再次更改它们，因为它们已经是最新的。）每次重新启动都会导致特殊变量 `MAKE_RESTARTS` 被更新（参见[其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)）。

​	如果您知道一个或多个 Makefile 无法重新生成，并且希望出于效率原因阻止 `make` 对它们执行隐式规则搜索，您可以使用任何正常的方法来阻止隐式规则查找。例如，可以编写一个以 Makefile 为目标的显式规则，并使用空的配方（参见[使用空的配方](https://www.gnu.org/software/make/manual/make.html#Empty-Recipes)）。

​	如果 Makefile 指定了一个双冒号规则，以使用配方但没有先决条件重新生成文件，那么该文件将始终重新生成（参见[双冒号规则](https://www.gnu.org/software/make/manual/make.html#Double_002dColon)）。在 Makefile 的情况下，具有双冒号规则的 Makefile，带有配方但没有先决条件，将在每次运行 `make` 时都重新生成，然后在 `make` 重新启动并再次读取 Makefile 之后再次重新生成。这将导致一个无限循环：`make` 将不断重新生成 Makefile 并重新启动，永远不会做其他任何事情。因此，为了避免这种情况，`make` **不会** 尝试重新生成指定为双冒号规则的目标的 Makefile，其中包含配方但没有先决条件。

​	虚拟目标（参见[虚拟目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)）具有相同的效果：它们永远不会被认为是最新的，因此标记为虚拟的包含文件将导致 `make` 不断重新启动。为了避免这种情况，`make` 不会尝试重新生成标记为虚拟的 Makefile。

​	您可以利用这一点来优化启动时间：如果您知道您不需要重新生成您的 Makefile，可以通过添加以下内容来阻止 `make` 尝试重新生成它：

```makefile
.PHONY: Makefile
```

或者：

```makefile
Makefile:: ;
```

​	如果未使用 `-f` 或 `--file` 选项指定任何 Makefile 进行阅读，`make` 将尝试默认的 Makefile 名称；请参阅[给您的 Makefile 命名](https://www.gnu.org/software/make/manual/make.html#Makefile-Names)。与使用 ‘-f’ 或 ‘--file’ 选项显式请求的 Makefile 不同，`make` 并不确定这些 Makefile 是否应该存在。但是，如果默认的 Makefile 不存在，但可以通过运行 `make` 规则创建它，那么您可能希望运行规则以便可以使用 Makefile。

​	因此，如果默认的 Makefile 都不存在，`make` 将尝试逐个制作每个 Makefile，直到成功制作一个，或者尝试的名称用尽为止。需要注意的是，如果 `make` 无法找到或制作任何 Makefile，这不是错误；并非始终需要 Makefile。

​	当您使用 `‘-t’` 或 `‘--touch’` 选项（请参见[替代执行配方](https://www.gnu.org/software/make/manual/make.html#Instead-of-Execution)）时，您不希望使用过时的 Makefile 决定要触摸哪些目标。因此，`‘-t’` 选项不会影响更新 Makefile；即使指定了 `‘-t’`，它们也将被真正更新。同样，`‘-q’`（或 `‘--question’`）和 `‘-n’`（或 `‘--just-print’`）不会阻止更新 Makefile，因为过时的 Makefile 会导致其他目标的输出错误。因此，`‘make -f mfile -n foo’` 将更新 mfile，然后读取它，并打印更新 foo 及其先决条件所需的配方，而不运行它。对于 foo 打印的配方将是更新内容中指定的那个。

​	然而，偶尔情况下，您可能实际上希望甚至阻止更新 Makefile。您可以通过在命令行中将 Makefile 作为目标来实现这一点，以及将它们指定为 Makefile。当显式将 Makefile 名称指定为目标时，选项 ‘-t’ 等会适用于它们。

​	因此，`make -f mfile -n mfile foo` 将读取 Makefile mfile，打印所需的配方以更新它，而不实际运行它，然后打印所需的配方以更新 foo，而不运行它。对于 foo 的配方将是 mfile 更新内容中指定的那个。





## 3.6 覆盖另一个 Makefile 的一部分 



​	有时，具有与另一个 Makefile 几乎完全相同的 Makefile 非常有用。通常情况下，您可以使用 `include` 指令将其中一个包含在另一个中，并添加更多的目标或变量定义。但是，如果两个 Makefile 为同一目标提供不同的配方，那么是无效的。但是还有另一种方法。

​	在包含 Makefile（希望包含其他 Makefile 的那个）中，您可以使用任意匹配模式规则来指示 `make` 在需要重新制作不能从包含 Makefile 中的信息中制作的任何目标时，应查找另一个 Makefile。有关模式规则的更多信息，请参见[定义和重新定义模式规则](https://www.gnu.org/software/make/manual/make.html#Pattern-Rules)。

​	例如，如果您有一个名为 Makefile 的 Makefile，其中说明如何制作目标 ‘foo’（以及其他目标），那么您可以编写一个名为 GNUmakefile 的 Makefile，其中包含以下内容：

```makefile
foo:
        frobnicate > foo

%: force
        @$(MAKE) -f Makefile $@
force: ;
```

​	如果您说 `make foo`，`make` 将找到 GNUmakefile，读取它，并看到要制作 foo，需要运行配方 `frobnicate > foo`。如果您说 `make bar`，`make` 将在 GNUmakefile 中找不到制作 bar 的方法，因此它将使用模式规则的配方：`make -f Makefile bar`。如果 Makefile 提供了更新 bar 的规则，`make` 将应用该规则。对于 GNUmakefile 没有说明如何制作的任何其他目标，也是如此。

​	这种工作原理是模式规则具有模式 ‘%’ 的模式规则，因此它可以匹配任何目标。规则指定了一个先决条件 force，以确保即使目标文件已经存在，也会运行该配方。我们给 force 目标一个空的配方，以防止 `make` 搜索构建它的隐式规则 - 否则它将对 force 自身应用相同的匹配任何规则，并创建一个先决条件循环！



## 3.7 `make` 如何读取 Makefile 



​	GNU `make` 在两个不同的阶段中进行工作。在第一阶段中，它读取所有的 Makefile、包含的 Makefile 等，并内部化所有的变量和它们的值，以及隐式和显式规则，并构建所有目标及其先决条件的依赖图。在第二阶段中，`make` 使用这些内部化的数据来确定哪些目标需要更新，并运行必要的配方来更新它们。

​	了解这种两阶段的方法很重要，因为它对变量和函数展开的发生方式产生直接影响；这通常是编写 Makefile 时一些困惑的来源。下面是在 Makefile 中可能遇到的不同构造的摘要，以及每个构造的展开的阶段。

​	我们说，在第一阶段，展开是*立即*发生的，如果在第一阶段期间发生展开，`make` 将在解析 Makefile 时展开该构造的那部分内容。我们说，在第一阶段，展开是*延迟*的，如果不是立即展开。延迟构造部分的展开会延迟到展开使用它时：要么在立即上下文中引用它时，要么在第二阶段需要它时。

​	您可能还不熟悉其中一些构造。随着您熟悉它们，以后的章节中可以参考此部分。

### 变量赋值 

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

​	对于附加运算符 `‘+=’`，右侧在变量之前如果变量以简单变量（‘:=’ 或 ‘::=’）设置过，则被视为立即展开，否则为延迟展开。

​	对于带转义的立即展开运算符 `‘:::=’`，右侧的值会立即展开，但然后被转义（也就是说，在展开结果中的所有 `$` 实例都会替换为 `$$`）。or the shell assignment operator ‘!=’, the right-hand side is evaluated immediately and handed to the shell. The result is stored in the variable named on the left, and that variable is considered a recursively expanded variable (and will thus be re-evaluated on each reference).

​	对于 shell 赋值运算符 `‘!=’`，右侧会立即计算并传递给 shell。结果存储在左侧命名的变量中，并且该变量被视为递归展开变量（因此将在每次引用时重新评估）。

### 条件指令 



​	条件指令会立即解析。这意味着，例如，不能在条件指令中使用自动变量，因为自动变量在调用该规则的配方被调用之前不会设置。如果需要在条件指令中使用自动变量，您必须将条件移到配方中，并使用 shell 条件语法。

### 规则定义 

​	规则总是以相同的方式展开，无论形式如何：

```makefile
immediate : immediate ; deferred
        deferred
```

​	也就是说，目标和先决条件部分立即展开，用于构建目标的配方总是延迟展开。这适用于显式规则、模式规则、后缀规则、静态模式规则和简单的先决条件定义。



## 3.8 Makefile 的解析方式 

​	GNU `make` 逐行解析 Makefile。解析进行以下步骤：

1. 读取完整的逻辑行，包括反斜杠转义的行（请参见[拆分长行](https://www.gnu.org/software/make/manual/make.html#Splitting-Lines)）。
8. 删除注释（请参见[Makefile 的内容](https://www.gnu.org/software/make/manual/make.html#Makefile-Contents)）。
9. 如果行以配方前缀字符开头且我们处于规则上下文中，则将该行添加到当前配方，并读取下一行（请参见[配方语法](https://www.gnu.org/software/make/manual/make.html#Recipe-Syntax)）。
10. 展开出现在*立即*展开上下文中的行的元素（请参见[make 如何读取 Makefile](https://www.gnu.org/software/make/manual/make.html#Reading-Makefiles)）。
11. 扫描行以查找分隔符字符，例如 ‘:’ 或 ‘=’，以确定行是宏赋值还是规则（请参见[配方语法](https://www.gnu.org/software/make/manual/make.html#Recipe-Syntax)）。
12. 将生成的操作内部化，并读取下一行。

​	这的一个重要结论是，宏可以展开为整个规则，*如果它只有一行长*。这将起作用：

```makefile
myrule = target : ; echo built

$(myrule)
```

​	然而，这不起作用，因为 `make` 在展开它们后不会重新拆分行：

```makefile
define myrule
target:
        echo built
endef

$(myrule)
```

​	上述 Makefile 会导致定义一个名为 ‘target’ 的目标，其中包含先决条件 ‘echo’ 和 ‘built’，就好像 Makefile 包含 `target: echo built` 而不是一个包含配方的规则。在展开完成后仍然存在于行中的换行符将像普通空格一样被忽略。

​	为了正确展开多行宏，您必须使用 `eval` 函数：这会导致在展开后的宏结果上运行 `make` 解析器（请参见[eval 函数](https://www.gnu.org/software/make/manual/make.html#Eval-Function)）。



## 3.9 二次展开



​	前面我们了解到 GNU `make` 的工作方式分为两个不同的阶段：读取阶段和目标更新阶段（请参见[make 如何读取 Makefile](https://www.gnu.org/software/make/manual/make.html#Reading-Makefiles)）。GNU Make 还具有启用对一些或所有目标定义的先决条件进行 *第二次展开* 的功能。为了使这种第二次展开发生，必须在使用此功能的第一个先决条件列表之前定义特殊目标 `.SECONDEXPANSION`。

​	如果定义了 `.SECONDEXPANSION`，那么当 GNU `make` 需要检查目标的先决条件时，先决条件会进行 *第二次展开*。在大多数情况下，这种次级展开不会产生影响，因为所有变量和函数引用都将在初始解析 Makefile 时展开。为了利用解析器的第二次展开阶段，您需要在 Makefile 中 *转义* 变量或函数引用。在这种情况下，第一次展开仅仅是取消转义引用，而不会展开它，展开留给第二次展开阶段。例如，请考虑以下的 Makefile：

```makefile
.SECONDEXPANSION:
ONEVAR = onefile
TWOVAR = twofile
myfile: $(ONEVAR) $$(TWOVAR)
```

​	经过第一次展开阶段后，myfile 目标的先决条件列表将是 `onefile` 和 `$(TWOVAR)`；第一个（未转义）的变量引用 ONEVAR 被展开，而第二个（转义）的变量引用仅被取消转义，而不会被识别为变量引用。现在，在第二次展开期间，第一个单词再次展开，但由于其中不包含变量或函数引用，它仍然是 onefile 的值，而第二个单词现在是对变量 TWOVAR 的正常引用，它被展开为 twofile 的值。最终结果是存在两个先决条件，即 onefile 和 twofile。

​	显然，这不是一个非常有趣的案例，因为通过在先决条件列表中仅以非转义方式列出两个变量，更容易地实现相同的结果。如果变量被重新设置，一个区别变得明显；请考虑以下示例：

```makefile
.SECONDEXPANSION:
AVAR = top
onefile: $(AVAR)
twofile: $$(AVAR)
AVAR = bottom
```

​	在这里，onefile 的先决条件将立即展开，并解析为值 top，而 twofile 的先决条件将在第二次展开之前不会完全展开，并解析为值 bottom。

​	这可能更令人兴奋一些，但是只有在您发现二次展开始终发生在目标的自动变量范围内时，此功能的真正威力才会显现出来。这意味着您可以在第二次展开中使用诸如 `$@`、`$*` 等变量，它们将具有其预期的值，就像在配方中一样。您所要做的就是通过转义 `$` 来延迟展开。另外，次级展开适用于显式和隐式（模式）规则。了解这一点后，对于此功能的可能用途会大大增加。例如：

```makefile
.SECONDEXPANSION:
main_OBJS := main.o try.o test.o
lib_OBJS := lib.o api.o

main lib: $$($$@_OBJS)
```

​	在这里，初始展开后，main 和 lib 目标的先决条件将是 `$($@_OBJS)`。在第二次展开期间，`$@` 变量将设置为目标的名称，因此 main 目标的展开将生成 `$(main_OBJS)`，或 `main.o try.o test.o`，而 lib 目标的第二次展开将生成 `$(lib_OBJS)`，或 `lib.o api.o`。

​	您还可以在这里混合使用函数，只要它们被正确转义：

```makefile
main_SRCS := main.c try.c test.c
lib_SRCS := lib.c api.c

.SECONDEXPANSION:
main lib: $$(patsubst %.c,%.o,$$($$@_SRCS))
```

​	此版本允许用户指定源文件而不是对象文件，但生成与前一个示例相同的先决条件列表。

​	在次级展开阶段，特别是目标名称变量 `$$@` 的自动变量评估与在配方中的评估类似。然而，对于 `make` 理解的不同类型的规则定义，会出现一些微妙的差异和“边界情况”。使用不同自动变量的微妙之处在下面描述。

### 显式规则的二次展开



​	在显式规则的二次展开过程中，`$$@` 和 `$$%` 分别求值为目标的文件名，而当目标是存档成员时，求值为目标成员的名称。`$$<` 变量求值为此目标的第一个先决条件，即第一个规则的第一个先决条件。`$$^` 和 `$$+` 求值为已经出现的相同目标的规则的所有先决条件列表（`$$+` 包含重复，`$$^` 不包含）。以下示例将有助于说明这些行为：

```makefile
.SECONDEXPANSION:

foo: foo.1 bar.1 $$< $$^ $$+    # line #1

foo: foo.2 bar.2 $$< $$^ $$+    # line #2

foo: foo.3 bar.3 $$< $$^ $$+    # line #3
```

​	在第一个先决条件列表中，所有三个变量（`$$<`、`$$^` 和 `$$+`）展开为空字符串。在第二个先决条件列表中，它们的值分别为 `foo.1`、`foo.1 bar.1` 和 `foo.1 bar.1`。在第三个先决条件列表中，它们的值分别为 `foo.1`、`foo.1 bar.1 foo.2 bar.2` 和 `foo.1 bar.1 foo.2 bar.2 foo.1 foo.1 bar.1 foo.1 bar.1`。

​	规则按照 Makefile 的顺序进行二次展开，但配方的规则总是最后被评估。

​	变量 `$$?` 和 `$$*` 不可用，会展开为空字符串。



### 静态模式规则的二次展开 



​	静态模式规则的二次展开规则与上述显式规则相同，只有一个例外：对于静态模式规则，`$$*` 变量设置为模式的前缀。与显式规则一样，`$$?` 不可用，会展开为空字符串。

### 隐式规则的二次展开



​	当 `make` 搜索隐式规则时，它会替换 stem（模式的前缀），然后对于每个具有匹配目标模式的规则进行二次展开。自动变量的值的派生方式与静态模式规则相同。以下示例：

```makefile
.SECONDEXPANSION:

foo: bar

foo foz: fo%: bo%

%oo: $$< $$^ $$+ $$*
```

​	当隐式规则尝试为目标 foo 进行匹配时，`$$<` 展开为 bar，`$$^` 展开为 bar boo，`$$+` 也展开为 bar boo，而 `$$*` 展开为 f。

​	请注意，目录前缀（D），如[隐式规则搜索算法](https://www.gnu.org/software/make/manual/make.html#Implicit-Rule-Search)中所述，在所有先决条件列表中的模式上（在展开后）附加。以下示例：

```makefile
.SECONDEXPANSION:

/tmp/foo.o:

%.o: $$(addsuffix /%.c,foo bar) foo.h
        @echo $^
```

​	经过二次展开和目录前缀重建后，打印的先决条件列表将是 `/tmp/foo/foo.c` `/tmp/bar/foo.c` `foo.h`。如果不关心此重建过程，可以在先决条件列表中使用 `$$*` 替代 `%`。