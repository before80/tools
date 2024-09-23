+++
title = "1 命令帮助"
date = 2023-10-10T13:49:02+08:00
weight = 1
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 1 命令帮助

## 如何获取指定命令的帮助文档？

​	可以通过`man`、`info`、`type`、`which`、`apropos`、`help`、`whatis`等命令，在命令行中获取指定命令的帮助文档。

​	Ubuntu 22.04 可以通过以下链接，在浏览器中查看相关命令以及其他的帮助文档：

- https://manpages.ubuntu.com/manpages/jammy/en/man1/[命令].1.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man1/ls.1.html](https://manpages.ubuntu.com/manpages/jammy/en/man1/ls.1.html)
- https://manpages.ubuntu.com/manpages/jammy/en/man2/[系统调用].2.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man2/fork.2.html](https://manpages.ubuntu.com/manpages/jammy/en/man2/fork.2.html)
- https://manpages.ubuntu.com/manpages/jammy/en/man3/[库调用].3.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man3/abs.3.html](https://manpages.ubuntu.com/manpages/jammy/en/man3/abs.3.html)
- https://manpages.ubuntu.com/manpages/jammy/en/man4/[特殊文件].4.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man4/tty.4.html](https://manpages.ubuntu.com/manpages/jammy/en/man4/tty.4.html)
- https://manpages.ubuntu.com/manpages/jammy/en/man5/[文件].5.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man5/passwd.5.html](https://manpages.ubuntu.com/manpages/jammy/en/man5/passwd.5.html)
- https://manpages.ubuntu.com/manpages/jammy/en/man6/[游戏].6.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man6/spring.6.html](https://manpages.ubuntu.com/manpages/jammy/en/man6/spring.6.html)
- https://manpages.ubuntu.com/manpages/jammy/en/man7/[杂项].7.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man7/man.7.html](https://manpages.ubuntu.com/manpages/jammy/en/man7/man.7.html)
- https://manpages.ubuntu.com/manpages/jammy/en/man8/[系统管理命令].8.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man8/selinux.8.html](https://manpages.ubuntu.com/manpages/jammy/en/man8/selinux.8.html)
- https://manpages.ubuntu.com/manpages/jammy/en/man9/[内核例程].9.html，例如：[https://manpages.ubuntu.com/manpages/jammy/en/man9/baycom.9.html](https://manpages.ubuntu.com/manpages/jammy/en/man9/baycom.9.html)



## man命令中的页面类型

- 1   Executable programs or shell commands
- 1   可执行程序或shell命令
- 2   System calls (functions provided by the kernel)
- 2   系统调用（由内核提供的函数）
- 3   Library calls (functions within program libraries)
- 3   库调用（程序库内的函数）
- 4   Special files (usually found in `/dev`)
- 4   特殊文件（通常在`/dev`目录下找到）
- 5   File formats and conventions, e.g. `/etc/passwd`
- 5   文件格式和约定，例如`/etc/passwd`
- 6   Games
- 6   游戏
- 7   Miscellaneous  (including  macro  packages  and  conventions),  e.g. `man`(7), `groff`(7),`man-pages`(7)
- 7   杂项（包括宏包和约定），例如`man`(7)，`groff`(7)，`man-pages`(7)
- 8   System administration commands (usually only for root)
- 8   系统管理命令（通常仅供root用户使用）
- 9   Kernel routines [Non standard]
- 9   内核例程【非标准】



## 为什么我在Ubuntu 22.04 的命令行中执行 `man type` 会提示 "No manual entry for type"?

​	在Ubuntu中，type命令的帮助文档位于/usr/share/man/man1/type.1.gz文件中，若不存在该文件则执行`man type` 将不会显示`type`命令的帮助文档。我们可以通过以下命令查看下是否存在type.1.gz文件：

```bash
cd /usr/share/man/man1
find -type f -name "type.*"
```

