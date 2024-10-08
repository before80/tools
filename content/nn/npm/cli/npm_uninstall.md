+++
title = "npm uninstall"
date = 2024-10-06T15:47:30+08:00
weight = 590
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-uninstall](https://docs.npmjs.com/cli/v10/commands/npm-uninstall)

Remove a package

​	移除包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm uninstall [<@scope>/]<pkg>...

aliases: unlink, remove, rm, r, un
```

## Description

This uninstalls a package, completely removing everything npm installed on its behalf.

​	此命令将卸载一个包，完全移除 npm 为其安装的所有内容。

It also removes the package from the `dependencies`, `devDependencies`, `optionalDependencies`, and `peerDependencies` objects in your `package.json`.

​	它还会从你的 `package.json` 文件中的 `dependencies`、`devDependencies`、`optionalDependencies` 和 `peerDependencies` 对象中移除该包。

Further, if you have an `npm-shrinkwrap.json` or `package-lock.json`, npm will update those files as well.

​	此外，如果你有 `npm-shrinkwrap.json` 或 `package-lock.json`，npm 也会更新这些文件。

`--no-save` will tell npm not to remove the package from your `package.json`, `npm-shrinkwrap.json`, or `package-lock.json` files.

​	`--no-save` 将告诉 npm 不要从你的 `package.json`、`npm-shrinkwrap.json` 或 `package-lock.json` 文件中移除该包。

`--save` or `-S` will tell npm to remove the package from your `package.json`, `npm-shrinkwrap.json`, and `package-lock.json` files. This is the default, but you may need to use this if you have for instance `save=false` in your `npmrc` file

​	`--save` 或 `-S` 将告诉 npm 从你的 `package.json`、`npm-shrinkwrap.json` 和 `package-lock.json` 文件中移除该包。这是默认行为，但如果你在 `npmrc` 文件中设置了 `save=false`，则可能需要使用此选项。

In global mode (ie, with `-g` or `--global` appended to the command), it uninstalls the current package context as a global package. `--no-save` is ignored in this case.

​	在全局模式下（即，在命令后添加 `-g` 或 `--global`），它将当前包上下文卸载为全局包。在这种情况下，`--no-save` 将被忽略。

Scope is optional and follows the usual rules for [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope).

​	范围是可选的，并遵循 [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope) 的通常规则。

## 示例 Examples



```bash
npm uninstall sax
```

`sax` will no longer be in your `package.json`, `npm-shrinkwrap.json`, or `package-lock.json` files.

​	`sax` 将不再出现在你的 `package.json`、`npm-shrinkwrap.json` 或 `package-lock.json` 文件中。

```bash
npm uninstall lodash --no-save
```

`lodash` will not be removed from your `package.json`, `npm-shrinkwrap.json`, or `package-lock.json` files.

​	`lodash` 将不会从你的 `package.json`、`npm-shrinkwrap.json` 或 `package-lock.json` 文件中移除。

## 配置 Configuration

### `save`

- Default: `true` unless when using `npm update` where it defaults to `false`
- 默认值：`true`，但在使用 `npm update` 时默认为 `false`
- Type: Boolean

Save installed packages to a `package.json` file as dependencies.

​	将安装的包保存到 `package.json` 文件中作为依赖项。When used with the `npm rm` command, removes the dependency from `package.json`.

Will also prevent writing to `package-lock.json` if set to `false`.

​	与 `npm rm` 命令一起使用时，从 `package.json` 中移除依赖项。

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	以“全局”模式操作，因此包将安装到 `prefix` 文件夹中，而不是当前工作目录中。有关行为差异的更多信息，请参见 [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 包将安装到 `{prefix}/lib/node_modules` 文件夹中，而不是当前工作目录。

- bin files are linked to `{prefix}/bin`
- bin 文件链接到 `{prefix}/bin`
- man pages are linked to `{prefix}/share/man`
- man 页面链接到 `{prefix}/share/man`

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以多次设置）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	启用在当前项目配置的工作区上下文中运行命令，同时过滤只运行此配置选项定义的工作区。

Valid values for the `workspace` config are either:

​	有效的 `workspace` 配置值为：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在为 `npm init` 命令设置时，可以将其设置为尚不存在的工作区文件夹，以创建该文件夹并将其设置为项目中的新工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true，以在 **所有** 配置的工作区上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	明确设置为 false 将导致类似 `install` 的命令完全忽略工作区。当未明确设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（install、update 等）将把工作区链接到 `node_modules` 文件夹。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 进行其他操作的命令（test、exec、publish 等）将在根项目上操作，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	在命令启用了工作区时，包含工作区根项目。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当设置为 false 时，通过 `workspace` 配置指定单个工作区，或通过 `workspaces` 标志指定所有工作区，将导致 npm 仅在指定的工作区上操作，而不在根项目上操作。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `install-links`

- Default: false
- Type: Boolean

When set file: protocol dependencies will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.

​	当设置为 file: 协议时，依赖项将被打包并作为常规依赖项安装，而不是创建符号链接。此选项对工作区没有影响。

## See Also

- [npm prune](https://docs.npmjs.com/cli/v10/commands/npm-prune)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)