+++
title = "1 `make`概述"
date = 2023-08-21T17:02:22+08:00
weight = 10
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 1 Overview of `make` - 1 `make`概述

​	`make` 工具会自动确定需要重新编译的大型程序的哪些部分，并发出重新编译它们的命令。本手册介绍了由Richard Stallman和Roland McGrath实现的GNU `make`。自从版本3.76以来，开发由Paul D. Smith负责。

​	GNU `make` 符合IEEE标准1003.2-1992（POSIX.2）的6.2节。

​	我们的示例展示了C程序，因为它们是最常见的，但您可以将 `make` 与任何编程语言一起使用，只要该语言的编译器可以通过Shell命令运行。实际上，`make` 并不限于程序。您可以使用它来描述任何任务，在该任务中，某些文件必须在其他文件发生更改时自动更新。

### 1.1 如何阅读本手册

​	如果您对 `make` 还不熟悉，或者想要获得一般性的介绍，请阅读每个章节的前几节，跳过后面的部分。在每个章节中，前几节包含介绍性或一般信息，后面的部分包含专业或技术信息。例外的情况是第二章，[Makefile简介](https://www.gnu.org/software/make/manual/make.html#Introduction)，该章的所有内容都是介绍性的。

​	如果您熟悉其他 `make` 程序，请参阅 [GNU `make` 的特性](https://www.gnu.org/software/make/manual/make.html#Features)，其中列出了GNU `make` 的增强功能，以及 [不兼容性和缺失的特性](https://www.gnu.org/software/make/manual/make.html#Missing)，该部分解释了GNU `make` 缺少的一些其他功能。

​	要获取快速摘要，请参阅 [选项摘要](https://www.gnu.org/software/make/manual/make.html#Options-Summary)，[快速参考](https://www.gnu.org/software/make/manual/make.html#Quick-Reference) 和 [特殊内置目标名称](https://www.gnu.org/software/make/manual/make.html#Special-Targets)。

### 1.2 问题和错误 



​	如果您在使用GNU `make` 时遇到问题，或者认为您找到了一个错误，请将其报告给开发人员；我们不能保证做任何事情，但可能会想要修复它。

​	在报告错误之前，请确保您确实找到了真正的错误。仔细重新阅读文档，并查看它是否确实说明您可以执行您正在尝试执行的操作。如果不清楚是否应该能够执行某个操作，请也报告一下；这是文档中的一个错误！

​	在报告错误或尝试自行修复错误之前，请尝试将错误隔离到能够复现问题的最小的 `makefile`。然后将该 `makefile` 和 `make` 给出的确切结果发送给我们，包括任何错误或警告信息。请不要将这些信息进行重新描述：最好将它们剪切并粘贴到您的报告中。在生成这个小的 `makefile` 时，请确保不要在您的命令中使用任何非免费或不寻常的工具：几乎总是可以使用简单的Shell命令模拟这样的工具所做的事情。最后，请确保解释您期望发生的情况；这将帮助我们决定问题是否真的在文档中。

​	一旦您确定了一个明确的问题，您可以通过以下两种方式之一来报告它。要么发送电子邮件到：

```
    bug-make@gnu.org
```

要么使用我们的基于Web的项目管理工具，地址为：

```
    https://savannah.gnu.org/projects/make/
```

​	除了上述信息外，请务必注意包括您正在使用的 `make` 版本号。您可以通过命令 `make --version` 获取此信息。还要确保包括您正在使用的计算机类型和操作系统。获取这些信息的一种方法是查看来自命令 `make --help` 的输出的最后几行。

​	如果您有一个想要提交的代码更改，请参阅 README 文件中的“提交补丁”部分以获取信息。

