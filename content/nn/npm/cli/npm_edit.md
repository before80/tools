+++
title = "npm edit"
date = 2024-10-06T15:41:30+08:00
weight = 160
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-edit](https://docs.npmjs.com/cli/v10/commands/npm-edit)

Edit an installed package

​	编辑已安装的包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm edit <pkg>[/<subpkg>...]
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## Description

Selects a dependency in the current project and opens the package folder in the default editor (or whatever you've configured as the npm `editor` config -- see [`npm-config`](https://docs.npmjs.com/npm-config).)

​	选择当前项目中的一个依赖项，并在默认编辑器中打开该包文件夹（或您配置为 npm `editor` 配置的任何编辑器——请参见 [`npm-config`](https://docs.npmjs.com/npm-config)）。

After it has been edited, the package is rebuilt so as to pick up any changes in compiled packages.

​	编辑完成后，包将被重建，以便获取编译包中的任何更改。

For instance, you can do `npm install connect` to install connect into your package, and then `npm edit connect` to make a few changes to your locally installed copy.

​	例如，您可以执行 `npm install connect` 将 connect 安装到您的包中，然后执行 `npm edit connect` 对您本地安装的副本进行一些更改。

## 配置 Configuration

### `editor`

- Default: The EDITOR or VISUAL environment variables, or '%SYSTEMROOT%\notepad.exe' on Windows, or 'vi' on Unix systems
- 默认值：EDITOR 或 VISUAL 环境变量，或 Windows 上的 '%SYSTEMROOT%\notepad.exe'，或 Unix 系统上的 'vi'
- Type: String

The command to run for `npm edit` and `npm config edit`.

​	用于 `npm edit` 和 `npm config edit` 的命令。

## See Also

- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm explore](https://docs.npmjs.com/cli/v10/commands/npm-explore)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)