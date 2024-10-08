+++
title = "npm root"
date = 2024-10-06T15:45:43+08:00
weight = 470
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-root](https://docs.npmjs.com/cli/v10/commands/npm-root)

Display npm root

​	显示 npm 根目录

Version 10.9.0 (Latest)

## Synopsis



```bash
npm root
```

Note: This command is unaware of workspaces.

​	注意：此命令不识别工作区。

## Description

Print the effective `node_modules` folder to standard out.

​	将有效的 `node_modules` 文件夹打印到标准输出。

Useful for using npm in shell scripts that do things with the `node_modules` folder. For example:

​	在需要使用 `node_modules` 文件夹的 shell 脚本中非常有用。例如：



```bash
#!/bin/bash
global_node_modules="$(npm root --global)"
echo "Global packages installed in: ${global_node_modules}"
```

## 配置 Configuration

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	在“全局”模式下操作，因此包将安装到 `prefix` 文件夹，而不是当前工作目录。有关行为差异的更多信息，请参见 [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 包安装到 `{prefix}/lib/node_modules` 文件夹，而不是当前工作目录。
- bin files are linked to `{prefix}/bin`
- 可执行文件链接到 `{prefix}/bin`
- man pages are linked to `{prefix}/share/man`
- 手册页链接到 `{prefix}/share/man`

## See Also

- [npm prefix](https://docs.npmjs.com/cli/v10/commands/npm-prefix)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)