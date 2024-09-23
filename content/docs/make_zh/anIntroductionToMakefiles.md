+++
title = "2 Makefiles的简介"
date = 2023-08-21T17:02:47+08:00
weight = 20
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 2 An Introduction to Makefiles - 2 Makefiles的简介

https://www.gnu.org/software/make/manual/make.html#Introduction

​	要告诉 `make` 如何操作，您需要一个名为 *makefile* 的文件。通常，makefile 告诉 `make` 如何编译和链接程序。

​	在本章中，我们将讨论一个简单的 makefile，描述了如何编译和链接一个由八个 C 源文件和三个头文件组成的文本编辑器。makefile 还可以告诉 `make` 如何在明确要求时运行其他命令（例如，删除某些文件作为清理操作）。要查看一个更复杂的 makefile 示例，请参阅 [复杂的 Makefile 示例](https://www.gnu.org/software/make/manual/make.html#Complex-Makefile)。

​	当 `make` 重新编译编辑器时，每个更改的 C 源文件都必须重新编译。如果头文件发生了变化，包含该头文件的每个 C 源文件都必须重新编译以确保安全。每次编译都会产生一个与源文件相对应的目标文件。最后，如果任何源文件已被重新编译，那么无论是新生成的还是保存在先前编译中的所有目标文件都必须链接在一起，以生成新的可执行编辑器。



## 2.1 规则的样子



​	一个简单的 makefile 由以下形式的“规则”组成：

```
target … : prerequisites …
        recipe
        …
        …
```

​	一个 *目标* 通常是由程序生成的文件的名称；目标的示例是可执行文件或目标文件。目标还可以是要执行的操作的名称，例如 ‘clean’（参见 [伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets)）。

​	一个 *先决条件* 是用作创建目标输入的文件。目标通常依赖于多个文件。

​	一个 *命令* 是 `make` 执行的操作。一个命令可能有多个命令，可以在同一行上或每个命令单独占一行。**请注意：**您需要在每个命令行的开头放置一个制表符！这是一个容易让人犯错的地方。如果您喜欢在命令前加上制表符以外的字符，可以将 `.RECIPEPREFIX` 变量设置为其他字符（参见 [其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)）。

​	通常，一个规则在具有先决条件的情况下编写配方，并在任何先决条件更改时创建目标文件。然而，为目标指定一个带有命令的规则不一定需要先决条件。例如，与目标 ‘clean’ 关联的删除命令的规则没有先决条件。

​	然后，一个 *规则* 解释了何时以及如何重新生成特定规则的目标文件。`make` 根据先决条件上的配方执行操作，以创建或更新目标。规则还可以解释何时以及如何执行操作。请参见 [编写规则](https://www.gnu.org/software/make/manual/make.html#Rules)。

​	一个 makefile 可能包含除规则以外的其他文本，但是一个简单的 makefile 只需要包含规则即可。规则可能看起来比模板中所示要复杂一些，但基本上都符合这种模式。



## 2.2 一个简单的 Makefile



​	以下是一个描述可执行文件 `edit` 依赖于八个对象文件的简单 makefile，这些对象文件又依赖于八个 C 源文件和三个头文件。

​	在此示例中，所有的 C 文件都包括 `defs.h`，但只有定义编辑命令的文件包括 `command.h`，而仅更改编辑器缓冲区的底层文件包括 `buffer.h`。

```
edit : main.o kbd.o command.o display.o \
       insert.o search.o files.o utils.o
        cc -o edit main.o kbd.o command.o display.o \
                   insert.o search.o files.o utils.o

main.o : main.c defs.h
        cc -c main.c
kbd.o : kbd.c defs.h command.h
        cc -c kbd.c
command.o : command.c defs.h command.h
        cc -c command.c
display.o : display.c defs.h buffer.h
        cc -c display.c
insert.o : insert.c defs.h buffer.h
        cc -c insert.c
search.o : search.c defs.h buffer.h
        cc -c search.c
files.o : files.c defs.h buffer.h command.h
        cc -c files.c
utils.o : utils.c defs.h
        cc -c utils.c
clean :
        rm edit main.o kbd.o command.o display.o \
           insert.o search.o files.o utils.o
```

​	我们使用反斜杠/换行将每一行长语句分成两行；这相当于使用一行长语句，但更容易阅读。请参阅 [分割长语句](https://www.gnu.org/software/make/manual/make.html#Splitting-Lines)。

​	要使用此 makefile 创建名为 `edit` 的可执行文件，请键入：

```
make
```

​	要使用此 makefile 从目录中删除可执行文件和所有对象文件，请键入：

```
make clean
```

​	在示例 makefile 中，目标包括可执行文件 ‘edit’，以及对象文件 ‘main.o’ 和 ‘kbd.o’。先决条件是文件，如 ‘main.c’ 和 ‘defs.h’。实际上，每个 ‘.o’ 文件既是目标又是先决条件。配方包括 ‘cc -c main.c’ 和 ‘cc -c kbd.c’。

​	当目标是文件时，如果其任何先决条件发生变化，则需要重新编译或重新链接它。此外，任何自动生成的先决条件都应首先更新。在此示例中，‘edit’ 依赖于八个对象文件中的每一个；对象文件 ‘main.o’ 依赖于源文件 ‘main.c’ 和头文件 ‘defs.h’。

​	每一行包含一个目标和先决条件的规则后面可能会跟随一个配方。这些配方说明如何更新目标文件。配方的每一行开头都必须有一个制表符（或由 `.RECIPEPREFIX` 变量指定的字符；参见 [其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)），以将配方与 makefile 中的其他行区分开来。（请记住，`make` 并不了解配方的工作方式。您需要提供能够正确更新目标文件的配方。`make` 所做的就是在目标文件需要更新时执行您指定的配方。）

​	目标 ‘clean’ 不是一个文件，而只是一个操作的名称。由于通常不希望执行此规则中的操作，‘clean’ 不是任何其他规则的先决条件。因此，除非您明确告诉它，否则 `make` 永远不会执行任何与之相关的操作。请注意，此规则不仅不是先决条件，也没有任何先决条件，因此规则的唯一目的是运行指定的配方。不引用文件但只是操作的目标称为 *伪目标*。请参阅 [伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets) 了解有关此类目标的信息。请参阅 [配方中的错误](https://www.gnu.org/software/make/manual/make.html#Errors)，了解如何让 `make` 忽略 `rm` 或任何其他命令的错误。





## 2.3 `make` 如何处理 Makefile 



​	默认情况下，`make` 从第一个目标开始（不包括名称以 ‘.’ 开头但同时包含一个或多个 ‘/’ 的目标）。这被称为 *默认目标*。(*目标* 是 `make` 最终努力更新的目标。您可以使用命令行覆盖此行为（参见 [指定目标的参数](https://www.gnu.org/software/make/manual/make.html#Goals)）或使用 `.DEFAULT_GOAL` 特殊变量（参见 [其他特殊变量](https://www.gnu.org/software/make/manual/make.html#Special-Variables)）。

​	在前一节简单示例中，默认目标是更新可执行程序 `edit`；因此，我们将该规则放在第一位。

​	因此，当您执行以下命令时：

```
make
```

​	`make` 会读取当前目录中的 makefile，并从处理第一个规则开始。在示例中，这个规则用于重新链接 `edit`；但是在 `make` 能够完全处理此规则之前，它必须处理 `edit` 依赖于的文件的规则，而在这种情况下是对象文件。这些文件中的每一个都会根据其自己的规则进行处理。这些规则表示通过编译其源文件来更新每个 ‘.o’ 文件。如果源文件或任何作为先决条件命名的头文件中的任何一个比目标文件新，或者目标文件不存在，则必须执行重新编译。

​	处理其他规则是因为其目标出现在目标的先决条件中。如果某些其他规则不被目标（或任何其所依赖的内容等）所依赖，那么该规则不会被处理，除非您告诉 `make` 这样做（使用命令如 `make clean`）。

​	在重新编译对象文件之前，`make` 会考虑更新其先决条件，即源文件和头文件。此 makefile 不会为它们指定任何操作 - ‘.c’ 和 ‘.h’ 文件不是任何规则的目标 - 因此 `make` 不会为这些文件执行任何操作。但是 `make` 将根据其自己的规则在此时更新自动生成的 C 程序，例如由 Bison 或 Yacc 生成的程序。

​	在重新编译需要的任何对象文件之后，`make` 决定是否重新链接 `edit`。如果文件 `edit` 不存在，或者任何对象文件比它要新，则必须这样做。如果刚刚重新编译了对象文件，则现在它比 `edit` 要新，因此重新链接 `edit`。

​	因此，如果我们更改文件 `insert.c` 并运行 `make`，`make` 将编译该文件以更新 `insert.o`，然后链接 `edit`。如果我们更改文件 `command.h` 并运行 `make`，`make` 将重新编译对象文件 `kbd.o`、`command.o` 和 `files.o`，然后链接文件 `edit`。





## 2.4 使用变量使 Makefile 更简洁



​	在我们的示例中，我们不得不在 `edit` 的规则中两次列出所有对象文件（在此重复显示）：

```
edit : main.o kbd.o command.o display.o \
              insert.o search.o files.o utils.o
        cc -o edit main.o kbd.o command.o display.o \
                   insert.o search.o files.o utils.o
```

​	这种重复是容易出错的；如果向系统中添加了新的对象文件，我们可能会将其添加到一个列表中，然后忘记另一个列表。我们可以通过使用变量来消除风险并简化 makefile。*变量* 允许在一个地方定义一次文本字符串，并在稍后的多个位置替换它（参见 [如何使用变量](https://www.gnu.org/software/make/manual/make.html#Using-Variables)）。

​	在每个 makefile 中定义一个名为 `objects`、`OBJECTS`、`objs`、`OBJS`、`obj` 或 `OBJ` 的变量，这是标准做法，它是所有对象文件名称的列表。我们将在 makefile 中使用类似下面这样的行来定义这样一个变量 `objects`：

```
objects = main.o kbd.o command.o display.o \
          insert.o search.o files.o utils.o
```

​	然后，在我们想要放置对象文件名称列表的每个位置，我们可以通过写 ‘$(objects)’ 来替换变量的值（参见 [如何使用变量](https://www.gnu.org/software/make/manual/make.html#Using-Variables)）。

​	以下是在使用变量的情况下整个简单 makefile 的外观：

```
objects = main.o kbd.o command.o display.o \
          insert.o search.o files.o utils.o

edit : $(objects)
        cc -o edit $(objects)
main.o : main.c defs.h
        cc -c main.c
kbd.o : kbd.c defs.h command.h
        cc -c kbd.c
command.o : command.c defs.h command.h
        cc -c command.c
display.o : display.c defs.h buffer.h
        cc -c display.c
insert.o : insert.c defs.h buffer.h
        cc -c insert.c
search.o : search.c defs.h buffer.h
        cc -c search.c
files.o : files.c defs.h buffer.h command.h
        cc -c files.c
utils.o : utils.c defs.h
        cc -c utils.c
clean :
        rm edit $(objects)
```





## 2.5 让 `make` 推导配方

​	不需要为编译各个 C 源文件的个别配方提供明确的说明，因为 `make` 可以自行推导出它们：它具有从相应命名的 ‘.c’ 文件到 ‘.o’ 文件的隐式规则，使用 ‘cc -c’ 命令进行编译。例如，它将使用配方 ‘cc -c main.c -o main.o’ 将 `main.c` 编译为 `main.o`。因此，我们可以从对象文件的规则中省略配方。请参阅 [使用隐式规则](https://www.gnu.org/software/make/manual/make.html#Implicit-Rules)。

​	当这种方式自动使用 ‘.c’ 文件时，它也会自动将其添加到先决条件列表中。因此，我们可以省略先决条件中的 ‘.c’ 文件，前提是省略配方。

​	以下是带有这两个更改的完整示例，以及上述建议的变量 `objects`：

```
objects = main.o kbd.o command.o display.o \
          insert.o search.o files.o utils.o

edit : $(objects)
        cc -o edit $(objects)

main.o : defs.h
kbd.o : defs.h command.h
command.o : defs.h command.h
display.o : defs.h buffer.h
insert.o : defs.h buffer.h
search.o : defs.h buffer.h
files.o : defs.h buffer.h command.h
utils.o : defs.h

.PHONY : clean
clean :
        rm edit $(objects)
```

​	这就是我们在实际实践中编写 makefile 的方式。（与 ‘clean’ 相关的复杂性在其他地方描述。请参阅 [伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets) 和 [配方中的错误](https://www.gnu.org/software/make/manual/make.html#Errors)。）

​	由于隐式规则非常方便，它们非常重要。您会经常看到它们被频繁使用。



## 2.6 另一种 Makefile 风格



​	当一个 makefile 的对象仅由隐式规则创建时，可以使用另一种替代的 makefile 风格。在这种风格的 makefile 中，您可以根据它们的先决条件将条目分组，而不是根据它们的目标。以下是这种风格的示例：

```
objects = main.o kbd.o command.o display.o \
          insert.o search.o files.o utils.o

edit : $(objects)
        cc -o edit $(objects)

$(objects) : defs.h
kbd.o command.o files.o : command.h
display.o insert.o search.o files.o : buffer.h
```

​	在这里，`defs.h` 是所有对象文件的先决条件；`command.h` 和 `buffer.h` 是它们各自所列的特定对象文件的先决条件。

​	这是否更好是一个口味问题：它更紧凑，但有些人不喜欢它，因为他们认为在一个地方放置有关每个目标的所有信息更清晰。



## 2.7 清理目录的规则

​	编译程序不是您可能想要编写规则的唯一事情。makefile 通常还说明如何做一些除编译程序之外的其他事情：例如，如何删除所有对象文件和可执行文件，以便目录变得“干净”。

​	以下是如何编写示例编辑器的 `make` 规则：

```
clean:
        rm edit $(objects)
```

​	实际上，我们可能希望以稍微复杂的方式编写规则，以处理未预料到的情况。我们将这样做：

```
.PHONY : clean
clean :
        -rm edit $(objects)
```

​	这可以防止 `make` 由于存在名为 `clean` 的实际文件而变得混乱，并导致它忽略来自 `rm` 的错误。 （请参阅 [伪目标](https://www.gnu.org/software/make/manual/make.html#Phony-Targets) 和 [配方中的错误](https://www.gnu.org/software/make/manual/make.html#Errors)。）

​	像这样的规则不应该放在 makefile 的开头，因为我们不希望它成为默认情况下运行的规则！因此，在示例 makefile 中，我们希望重新编译编辑器的 `edit` 规则保持默认目标。

​	由于 `clean` 不是 `edit` 的先决条件，如果我们不带任何参数地输入 `make` 命令，这个规则将根本不会运行。为了使该规则运行，我们必须键入 `make clean`。参见[如何运行 `make`](https://www.gnu.org/software/make/manual/make.html#Running)。