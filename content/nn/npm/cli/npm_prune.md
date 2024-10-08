+++
title = "npm prune"
date = 2024-10-06T15:44:39+08:00
weight = 410
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-prune](https://docs.npmjs.com/cli/v10/commands/npm-prune)

Remove extraneous packages

​	删除多余的包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm prune [[<@scope>/]<pkg>...]
```

## Description

This command removes "extraneous" packages. If a package name is provided, then only packages matching one of the supplied names are removed.

​	该命令用于删除“多余”的包。如果提供了包名称，则仅删除与提供的名称匹配的包。

Extraneous packages are those present in the `node_modules` folder that are not listed as any package's dependency list.

​	多余的包是指存在于 `node_modules` 文件夹中，但不在任何包的依赖列表中的包。

If the `--omit=dev` flag is specified or the `NODE_ENV` environment variable is set to `production`, this command will remove the packages specified in your `devDependencies`.

​	如果指定了 `--omit=dev` 标志，或将 `NODE_ENV` 环境变量设置为 `production`，该命令将删除您 `devDependencies` 中指定的包。

If the `--dry-run` flag is used then no changes will actually be made.

​	如果使用 `--dry-run` 标志，则不会实际进行任何更改。

If the `--json` flag is used, then the changes `npm prune` made (or would have made with `--dry-run`) are printed as a JSON object.

​	如果使用 `--json` 标志，则 `npm prune` 所做的更改（或在使用 `--dry-run` 时将要进行的更改）将以 JSON 对象的形式打印出来。

In normal operation, extraneous modules are pruned automatically, so you'll only need this command with the `--production` flag. However, in the real world, operation is not always "normal". When crashes or mistakes happen, this command can help clean up any resulting garbage.

​	在正常操作中，多余的模块会自动被修剪，因此您只需在使用 `--production` 标志时使用此命令。然而，在现实世界中，操作并不总是“正常”的。当崩溃或错误发生时，此命令可以帮助清理任何由此产生的垃圾。

## 配置 Configuration

### `omit`

- Default: 'dev' if the `NODE_ENV` environment variable is set to 'production', otherwise empty.
- 默认值：如果 `NODE_ENV` 环境变量设置为 'production' 则为 'dev'，否则为空。
- Type: "dev", "optional", or "peer" (can be set multiple times)
- 类型：“dev”、“optional”或“peer”（可以设置多次）

Dependency types to omit from the installation tree on disk.

​	要从磁盘上的安装树中省略的依赖类型。

Note that these dependencies *are* still resolved and added to the `package-lock.json` or `npm-shrinkwrap.json` file. They are just not physically installed on disk.

​	请注意，这些依赖*仍然*被解析并添加到 `package-lock.json` 或 `npm-shrinkwrap.json` 文件中。它们只是没有物理安装在磁盘上。

If a package type appears in both the `--include` and `--omit` lists, then it will be included.

​	如果在 `--include` 和 `--omit` 列表中都出现了某种包类型，则将包含该类型。

If the resulting omit list includes `'dev'`, then the `NODE_ENV` environment variable will be set to `'production'` for all lifecycle scripts.

​	如果结果省略列表中包括 `'dev'`，则 `NODE_ENV` 环境变量将为所有生命周期脚本设置为 `'production'`。

### `include`

- Default:
- Type: "prod", "dev", "optional", or "peer" (can be set multiple times)
- 类型：“prod”、“dev”、“optional”或“peer”（可以设置多次）

Option that allows for defining which types of dependencies to install.

​	允许定义要安装的依赖类型的选项。

This is the inverse of `--omit=<type>`.

​	这是 `--omit=<type>` 的反义词。

Dependency types specified in `--include` will not be omitted, regardless of the order in which omit/include are specified on the command-line.

​	在 `--include` 中指定的依赖类型将不会被省略，无论在命令行中省略/include 的顺序如何。

### `dry-run`

- Default: false
- Type: Boolean

Indicates that you don't want npm to make any changes and that it should only report what it would have done. This can be passed into any of the commands that modify your local installation, eg, `install`, `update`, `dedupe`, `uninstall`, as well as `pack` and `publish`.

​	表示您不希望 npm 进行任何更改，只想报告它将要做什么。这可以传递给任何修改您本地安装的命令，例如 `install`、`update`、`dedupe`、`uninstall`，以及 `pack` 和 `publish`。

Note: This is NOT honored by other network related commands, eg `dist-tags`, `owner`, etc.

​	注意：这不会被其他与网络相关的命令，例如 `dist-tags`、`owner` 等所遵循。

### `json`

- Default: false
- Type: Boolean

Whether or not to output JSON data, rather than the normal output.

​	是否输出 JSON 数据，而不是正常输出。

- In `npm pkg set` it enables parsing set values with JSON.parse() before saving them to your `package.json`.
- 在 `npm pkg set` 中，它允许在保存到 `package.json` 之前使用 JSON.parse() 解析设置的值。

Not supported by all npm commands.

​	并非所有 npm 命令都支持。

### `foreground-scripts`

- Default: `false` unless when using `npm pack` or `npm publish` where it defaults to `true`
- 默认值：`false`，除非在使用 `npm pack` 或 `npm publish` 时，默认为 `true`
- Type: Boolean

Run all build scripts (ie, `preinstall`, `install`, and `postinstall`) scripts for installed packages in the foreground process, sharing standard input, output, and error with the main npm process.

​	在前台进程中为已安装包运行所有构建脚本（即 `preinstall`、`install` 和 `postinstall`），与主 npm 进程共享标准输入、输出和错误。

Note that this will generally make installs run slower, and be much noisier, but can be useful for debugging.

​	请注意，这通常会使安装速度变慢，并且会产生更多噪音，但对于调试很有用。

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为真，则 npm 不会运行在 package.json 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	请注意，明确意图运行特定脚本的命令，例如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`，如果设置了 `ignore-scripts`，仍会运行它们的目标脚本，但不会运行任何前置或后置脚本。

### `workspace`

- Default:
- Type: String (can be set multiple times)

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	允许在当前项目的已配置工作区的上下文中运行命令，同时仅运行此配置选项定义的工作区。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值为：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将选择该文件夹内的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在为 `npm init` 命令设置时，可以将其设置为尚不存在的工作区文件夹，以在项目中创建该文件夹并将其设置为全新的工作区。

This value is not exported to the environment for child processes.

​	该值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true 以在 **所有** 配置的工作区中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	显式将其设置为 false 将导致类似 `install` 的命令完全忽略工作区。当未显式设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（install、update 等）将工作区链接到 `node_modules` 文件夹。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作的命令（test、exec、publish 等）将操作根项目，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	该值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	在为命令启用工作区时，包含工作区根。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当为 false 时，通过 `workspace` 配置指定单个工作区，或通过 `workspaces` 标志指定所有工作区，将导致 npm 仅在指定的工作区上操作，而不是根项目。

This value is not exported to the environment for child processes.

​	该值不会导出到子进程的环境中。

### `install-links`

- Default: false
- Type: Boolean

When set file: protocol dependencies will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.

​	当设置为时，文件协议的依赖项将作为常规依赖项打包和安装，而不是创建符号链接。此选项对工作区没有影响。

## See Also

- [npm uninstall](https://docs.npmjs.com/cli/v10/commands/npm-uninstall)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm ls](https://docs.npmjs.com/cli/v10/commands/npm-ls)