+++
title = "npm rebuild"
date = 2024-10-06T15:45:01+08:00
weight = 440
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-rebuild](https://docs.npmjs.com/cli/v10/commands/npm-rebuild)

Rebuild a package

​	重建一个包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm rebuild [<package-spec>] ...]

alias: rb
```

## Description

This command does the following:

​	此命令执行以下操作：

1. Execute lifecycle scripts (`preinstall`, `install`, `postinstall`, `prepare`) 执行生命周期脚本（`preinstall`、`install`、`postinstall`、`prepare`）
2. Links bins depending on whether bin links are enabled 根据是否启用 bin 链接来链接可执行文件

This command is particularly useful in scenarios including but not limited to:

​	此命令在以下场景中特别有用，但不限于：

1. Installing a new version of **node.js**, where you need to recompile all your C++ add-ons with the updated binary.安装新版本的 **node.js** 时，需要重新编译所有 C++ 插件以使用更新的二进制文件。
2. Installing with `--ignore-scripts` and `--no-bin-links`, to explicitly choose which packages to build and/or link bins. 使用 `--ignore-scripts` 和 `--no-bin-links` 安装，以明确选择要构建和/或链接的包。

If one or more package specs are provided, then only packages with a name and version matching one of the specifiers will be rebuilt.

​	如果提供了一个或多个包规范，则仅重建名称和版本与其中一个规范匹配的包。

Usually, you should not need to run `npm rebuild` as it is already done for you as part of npm install (unless you suppressed these steps with `--ignore-scripts` or `--no-bin-links`).

​	通常情况下，您不需要运行 `npm rebuild`，因为在 `npm install` 的过程中已经为您完成了这一步（除非您使用 `--ignore-scripts` 或 `--no-bin-links` 抑制了这些步骤）。

If there is a `binding.gyp` file in the root of your package, then npm will use a default install hook:

​	如果您的包根目录中有 `binding.gyp` 文件，则 npm 会使用默认的安装钩子：



```bash
"scripts": {
    "install": "node-gyp rebuild"
}
```

This default behavior is suppressed if the `package.json` has its own `install` or `preinstall` scripts. It is also suppressed if the package specifies `"gypfile": false`

​	如果 `package.json` 有自己的 `install` 或 `preinstall` 脚本，则会抑制此默认行为。如果包中指定了 `"gypfile": false`，也会抑制此行为。

## 配置 Configuration

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	以“全局”模式运行，因此包将安装到 `prefix` 文件夹中，而不是当前工作目录。有关行为差异的更多信息，请参见 [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 包安装到 `{prefix}/lib/node_modules` 文件夹，而不是当前工作目录。

- bin files are linked to `{prefix}/bin`
- 可执行文件链接到 `{prefix}/bin`
- man pages are linked to `{prefix}/share/man`
- 手册页链接到 `{prefix}/share/man`

### `bin-links`

- Default: true
- Type: Boolean

Tells npm to create symlinks (or `.cmd` shims on Windows) for package executables.

​	告诉 npm 为包的可执行文件创建符号链接（在 Windows 上为 `.cmd` shim）。

Set to false to have it not do this. This can be used to work around the fact that some file systems don't support symlinks, even on ostensibly Unix systems.

​	设置为 false 以禁用此操作。此选项可用于解决某些文件系统不支持符号链接的问题，即使在名义上是 Unix 的系统上也是如此。

### `foreground-scripts`

- Default: `false` unless when using `npm pack` or `npm publish` where it defaults to `true`
- 默认值：`false`，除非在使用 `npm pack` 或 `npm publish` 时，其默认值为 `true`
- Type: Boolean

Run all build scripts (ie, `preinstall`, `install`, and `postinstall`) scripts for installed packages in the foreground process, sharing standard input, output, and error with the main npm process.

​	在前台进程中为已安装的包运行所有构建脚本（即 `preinstall`、`install` 和 `postinstall`），与主要的 npm 进程共享标准输入、输出和错误。

Note that this will generally make installs run slower, and be much noisier, but can be useful for debugging.

​	请注意，这通常会使安装速度变慢，并且输出会更嘈杂，但在调试时可能会很有用。

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 true，npm 将不运行 `package.json` 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	请注意，如果设置了 `ignore-scripts`，那么显式意图运行特定脚本的命令，如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`，仍然会运行其预期的脚本，但不会运行任何 pre 或 post 脚本。

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以多次设置）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	允许在当前项目配置的工作区的上下文中运行命令，同时通过仅运行此配置选项定义的工作区来进行过滤。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值为：

- Workspace names
- 工作区名称

- Path to a workspace directory
- 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder)
- 父工作区目录的路径（将选择该文件夹内的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	当为 `npm init` 命令设置时，可以将其设置为尚不存在的工作区文件夹，以在项目内创建该文件夹并将其设置为全新的工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true 以在 **所有** 配置的工作区的上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	显式将其设置为 false 将导致 `install` 等命令完全忽略工作区。当没有明确设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（install、update 等）将把工作区链接到 `node_modules` 文件夹。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作的命令（test、exec、publish 等）将在根项目上操作，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	在命令启用工作区时包括工作区根。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当为 false 时，通过 `workspace` 配置指定单个工作区或通过 `workspaces` 标志指定所有工作区，将导致 npm 仅在指定的工作区上操作，而不在根项目上操作。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `install-links`

- Default: false
- Type: Boolean

When set file: protocol dependencies will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.

​	当设置为文件协议依赖项时，将作为常规依赖项打包和安装，而不是创建符号链接。此选项对工作区没有影响。

## See Also

- [package spec](https://docs.npmjs.com/cli/v10/using-npm/package-spec)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)