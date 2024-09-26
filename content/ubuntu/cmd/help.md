+++
title = "操作帮助"
date = 2024-09-26T10:51:19+08:00
weight = 1
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## `--help`命令选项

​	大多数命令提供了 `--help` 选项来显示简明的帮助信息。这通常比 `man` 页面短且更直观。

​	使用方法：

```sh
<命令名> --help
```

例如:

```sh
ls --help
```



## man命令

### man cmd_name

​	`man` 命令用于查看命令的手册页，它提供了关于某个命令的详细文档，包括用途、选项和用法示例。

​	使用方法：

```sh
man <命令名>
```

​	例如：

```sh
man ls
```

​	这将显示 `ls` 命令的手册页，解释其用途、常用选项和具体用法。

> man命令所在文档的路径？

## info命令

### info cmd_name

​	`info` 命令类似于 `man` 命令，但它通常提供更详细的文档和更多的结构化信息。某些 GNU 工具可能在 `info` 中比 `man` 提供更详细的解释。

使用方法：

```sh
info <命令名>
```

例如：

```sh
info ls
```

## apropos命令

### apropos keyword

​	`apropos` 命令可以帮助你查找与某个关键词相关的命令或功能。它会搜索手册页的`标题`和`描述`，并返回与该关键词相关的命令。

使用方法：

```sh
apropos <关键词>
```

例如：

```sh
apropos copy
```



## help命令

### help builtin_cmd_name

​	对于一些 shell 内置命令（如 `cd`、`echo`、`exit` 等），可以使用 `help` 命令查看这些命令的帮助信息。

​	使用方法：

```sh
help <shell 内置命令>
```

​	例如：

```sh
help cd
```

## tldr命令

### tldr cmd_name

​	`tldr` 提供了简洁的命令说明和常见用法示例，适合快速上手使用。你需要先安装 `tldr`：

​	安装：

```sh
sudo apt install tldr
```

​	使用方法：

```sh
tldr <命令名>
```

​	例如：

```sh
lx@lxm:~/Hugos/tools$ tldr tar
tar

归档实用程序。
通常与压缩方法结合使用，例如 gzip 或 bzip2.
更多信息：https://www.gnu.org/software/tar.

 - 创建存档并将其写入文件：
   tar cf target.tar 文件1 文件2 ...

 - 创建一个 gzip 压缩文件并将其写入文件：
   tar czf target.tar.gz file1 file2 ...

 - 使用相对路径从目录创建一个 gzip 压缩文件：
   tar czf target.tar.gz --directory=path/to/directory .

 - 详细地将（压缩的）存档文件提取到当前目录中：
   tar xvf source.tar[.gz|.bz2|.xz]

 - 将（压缩的）存档文件解压缩到目标目录中：
   tar xf source.tar[.gz|.bz2|.xz] --directory=directory

 - 创建压缩存档并将其写入文件，使用存档后缀确定压缩程序：
   tar caf target.tar.xz file1 file2 ...

 - 详细列出 tar 文件的内容：
   tar tvf source.tar

 - 从存档文件中提取与模式匹配的文件：
   tar xf source.tar --wildcards "*.html"
```

​	这会显示 `tar` 命令的简明示例和用法。

## whatis命令

### whatis

​	`whatis` 命令显示简短的手册页描述，它可以快速提供命令的摘要信息。

​	使用方法：

```sh
whatis <命令名>
```

​	例如：

```sh
whatis ls
```

## which命令

### which cmd_name

​	`which`：查找某个命令的可执行文件路径。

```sh
which <命令名>
```

​	例如：

```sh
which ls
```

## whereis命令

### whereis cmd_name

​	`whereis`：查找命令的可执行文件、源代码和手册页的位置。

```sh
whereis <命令名>
```

​	例如：

```sh
whereis ls
```

## compgen命令

​	`compgen` 是 Bash 内置的一个命令，它主要用于生成可能的命令、文件名、选项或关键字的列表。通过这个命令，我们可以获取系统中可用的命令、自定义的别名、函数以及关键字等信息。

compgen 的作用

- **命令补全:** `compgen` 生成的列表可以用于命令行工具的自动补全功能，提高输入效率。
- **脚本编写:** 在编写 shell 脚本时，`compgen` 可以帮助我们动态生成命令列表，实现更灵活的脚本。
- **系统管理:** 通过 `compgen`，我们可以获取系统中所有的命令、别名等信息，方便系统管理和故障排查。

​	`compgen` 可以通过各种选项来控制输出的内容。以下是 `compgen` 常用选项及其作用的详细说明：

| 选项        | 作用                                                     |
| ----------- | -------------------------------------------------------- |
| `-a`        | 列出所有别名（aliases）                                  |
| `-b`        | 列出所有 shell 内置命令（builtins）                      |
| `-c`        | 列出所有可以执行的命令（可执行文件）                     |
| `-d`        | 列出目录名（directory names）                            |
| `-e`        | 列出所有环境变量（environment variables）                |
| `-f`        | 列出文件名（filenames）                                  |
| `-k`        | 列出所有 shell 关键字（keywords）                        |
| `-u`        | 列出用户（user names）                                   |
| `-A <type>` | 列出指定类型的项（alias、builtin、command 等）           |
| `-p`        | 列出所有 shell 函数（shell functions）                   |
| `-v`        | 列出所有 shell 变量（shell variables），包含所有环境变量 |

​	使用方法：

```
# 列出所有的内置命令
compgen -b

# 显示所有可以执行的命令：
compgen -c

# 列出所有别名：
compgen -a

# 列出所有可以运行的函数：
compgen -A function

# 列出所有 shell 的保留关键字：
compgen -k

# 查看以 'ls' 开头的所有可用命令和别名：
compgen -ac ls
```

