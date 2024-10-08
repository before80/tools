+++
title = "npm ls"
date = 2024-10-06T15:43:38+08:00
weight = 320
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-ls](https://docs.npmjs.com/cli/v10/commands/npm-ls)

List installed packages

​	列出已安装的软件包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm ls <package-spec>

alias: list
```

## Description

This command will print to stdout all the versions of packages that are installed, as well as their dependencies when `--all` is specified, in a tree structure.

​	该命令将会以树结构打印所有已安装软件包的版本信息，以及当指定 `--all` 参数时显示其依赖项，输出到标准输出（stdout）。

Note: to get a "bottoms up" view of why a given package is included in the tree at all, use [`npm explain`](https://docs.npmjs.com/cli/v10/commands/npm-explain).

​	注意：要查看某个软件包出现在依赖树中的原因，可以使用 [`npm explain`](https://docs.npmjs.com/cli/v10/commands/npm-explain)。

Positional arguments are `name@version-range` identifiers, which will limit the results to only the paths to the packages named. Note that nested packages will *also* show the paths to the specified packages. For example, running `npm ls promzard` in npm's source tree will show:

​	位置参数 `name@version-range` 标识符可以将结果限制为指定软件包的路径。注意，嵌套的包也会显示到指定包的路径。例如，在 npm 的源代码树中运行 `npm ls promzard` 将显示如下内容：

```bash
npm@10.9.0 /path/to/npm
└─┬ init-package-json@0.0.4
  └── promzard@0.1.5
```

It will print out extraneous, missing, and invalid packages.

​	该命令还会打印额外的、缺失的和无效的软件包。

If a project specifies git urls for dependencies these are shown in parentheses after the `name@version` to make it easier for users to recognize potential forks of a project.

​	如果项目中指定了依赖的 git URL，则这些信息会显示在 `name@version` 之后的括号中，以便用户更容易地识别项目的可能分支。

The tree shown is the logical dependency tree, based on package dependencies, not the physical layout of your `node_modules` folder.

​	显示的树是逻辑依赖树，基于软件包的依赖关系，而非 `node_modules` 文件夹的实际物理结构。

When run as `ll` or `la`, it shows extended information by default.

​	当以 `ll` 或 `la` 运行时，默认显示扩展信息。

## 注意：设计更改即将进行 Note: Design Changes Pending

The `npm ls` command's output and behavior made a *ton* of sense when npm created a `node_modules` folder that naively nested every dependency. In such a case, the logical dependency graph and physical tree of packages on disk would be roughly identical.

​	当 npm 创建一个 `node_modules` 文件夹并天真地嵌套每个依赖项时，`npm ls` 命令的输出和行为非常合理。在这种情况下，逻辑依赖关系图和磁盘上软件包的物理树结构大致相同。

With the advent of automatic install-time deduplication of dependencies in npm v3, the `ls` output was modified to display the logical dependency graph as a tree structure, since this was more useful to most users. However, without using `npm ls -l`, it became impossible to show *where* a package was actually installed much of the time!

​	随着 npm v3 中引入的自动安装时的依赖项去重功能，`ls` 输出被修改为显示逻辑依赖关系图的树结构，因为对大多数用户来说，这种方式更有用。然而，如果不使用 `npm ls -l`，在大多数情况下就无法显示软件包的实际安装位置！

With the advent of automatic installation of `peerDependencies` in npm v7, this gets even more curious, as `peerDependencies` are logically "underneath" their dependents in the dependency graph, but are always physically at or above their location on disk.

​	随着 npm v7 中引入的 `peerDependencies` 自动安装功能，这变得更加复杂，因为 `peerDependencies` 在依赖关系图中逻辑上位于其依赖项的“下方”，但在磁盘上的位置总是在其上方或与之同级。

Also, in the years since npm got an `ls` command (in version 0.0.2!), dependency graphs have gotten much larger as a general rule. Therefore, in order to avoid dumping an excessive amount of content to the terminal, `npm ls` now only shows the *top* level dependencies, unless `--all` is provided.

​	此外，自从 npm 得到 `ls` 命令（版本 0.0.2！）以来，依赖关系图总体上变得越来越大。因此，为了避免向终端输出过多的内容，`npm ls` 现在仅显示顶级依赖项，除非提供了 `--all` 参数。

A thorough re-examination of the use cases, intention, behavior, and output of this command, is currently underway. Expect significant changes to at least the default human-readable `npm ls` output in npm v8.

​	目前正在全面重新审视该命令的用例、意图、行为和输出。请在 npm v8 中期待对默认的 `npm ls` 可读输出进行重大更改。

## 配置选项 Configuration

### `all`

- Default: false
- Type: Boolean

When running `npm outdated` and `npm ls`, setting `--all` will show all outdated or installed packages, rather than only those directly depended upon by the current project.

​	在运行 `npm outdated` 和 `npm ls` 时，设置 `--all` 将显示所有过时的或已安装的软件包，而不仅仅是当前项目直接依赖的那些软件包。

### `json`

- Default: false
- Type: Boolean

Whether or not to output JSON data, rather than the normal output.

​	是否以 JSON 数据格式输出，而不是普通输出。

- In `npm pkg set` it enables parsing set values with JSON.parse() before saving them to your `package.json`.
- 在 `npm pkg set` 中，启用此选项会在保存到 `package.json` 之前，通过 JSON.parse() 解析设置的值。

Not supported by all npm commands.

​	并非所有 npm 命令都支持此选项。

### `long`

- Default: false
- Type: Boolean

Show extended information in `ls`, `search`, and `help-search`.

​	在 `ls`、`search` 和 `help-search` 中显示扩展信息。

### `parseable`

- Default: false
- Type: Boolean

Output parseable results from commands that write to standard output. For `npm search`, this will be tab-separated table format.

​	输出可解析的结果到标准输出。对于 `npm search`，将以制表符分隔的表格格式输出。

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	以“全局”模式操作，使软件包安装到 `prefix` 文件夹，而不是当前工作目录。有关行为差异的详细信息，请参阅 [文件夹配置](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 软件包安装到 `{prefix}/lib/node_modules` 文件夹，而不是当前工作目录。

- bin files are linked to `{prefix}/bin`
- 可执行文件链接到 `{prefix}/bin`。
- man pages are linked to `{prefix}/share/man`
- 手册页链接到 `{prefix}/share/man`。

### `depth`

- Default: `Infinity` if `--all` is set, otherwise `1`
- 默认值：`Infinity`（如果设置了 `--all`），否则为 `1`
- Type: null or Number

The depth to go when recursing packages for `npm ls`.

​	递归软件包时 `npm ls` 的深度。

If not set, `npm ls` will show only the immediate dependencies of the root project. If `--all` is set, then npm will show all dependencies by default.

​	如果未设置，`npm ls` 只会显示根项目的直接依赖项。若设置了 `--all`，npm 将默认显示所有依赖项。

### `omit`

- Default: 'dev' if the `NODE_ENV` environment variable is set to 'production', otherwise empty.
- 默认值：如果 `NODE_ENV` 环境变量设置为 `production`，则为 'dev'，否则为空。
- Type: "dev", "optional", or "peer" (can be set multiple times)
- 类型："dev"、"optional" 或 "peer"（可多次设置）

Dependency types to omit from the installation tree on disk.

​	从磁盘上的安装树中省略的依赖项类型。

Note that these dependencies *are* still resolved and added to the `package-lock.json` or `npm-shrinkwrap.json` file. They are just not physically installed on disk.

​	注意，这些依赖项仍会被解析，并添加到 `package-lock.json` 或 `npm-shrinkwrap.json` 文件中。它们只是不会被物理安装到磁盘上。

If a package type appears in both the `--include` and `--omit` lists, then it will be included.

​	如果 `--include` 和 `--omit` 列表中同时出现某个依赖类型，则该类型的依赖项将被包含。

If the resulting omit list includes `'dev'`, then the `NODE_ENV` environment variable will be set to `'production'` for all lifecycle scripts.

​	如果结果中的省略列表包括 `'dev'`，则所有生命周期脚本的 `NODE_ENV` 环境变量将被设置为 `'production'`。

### `include`

- Default:
- Type: "prod", "dev", "optional", or "peer" (can be set multiple times)
- 类型："prod"、"dev"、"optional" 或 "peer"（可多次设置）

Option that allows for defining which types of dependencies to install.

​	允许定义要安装的依赖项类型的选项。

This is the inverse of `--omit=<type>`.

​	这是 `--omit=<type>` 的反向操作。

Dependency types specified in `--include` will not be omitted, regardless of the order in which omit/include are specified on the command-line.

​	命令行上指定的依赖类型将不会被省略，无论 omit/include 的顺序如何。

### `link`

- Default: false
- Type: Boolean

Used with `npm ls`, limiting output to only those packages that are linked.

​	与 `npm ls` 一起使用时，仅限输出那些被链接的包。

### `package-lock-only`

- Default: false
- Type: Boolean

If set to true, the current operation will only use the `package-lock.json`, ignoring `node_modules`.

​	如果设置为 true，当前操作将仅使用 `package-lock.json`，忽略 `node_modules`。

For `update` this means only the `package-lock.json` will be updated, instead of checking `node_modules` and downloading dependencies.

​	对于 `update` 命令，这意味着将只更新 `package-lock.json`，而不会检查 `node_modules` 或下载依赖项。

For `list` this means the output will be based on the tree described by the `package-lock.json`, rather than the contents of `node_modules`.

​	对于 `list` 命令，这意味着输出将基于 `package-lock.json` 描述的树结构，而不是 `node_modules` 的内容。

### `unicode`

- Default: false on windows, true on mac/unix systems with a unicode locale, as defined by the `LC_ALL`, `LC_CTYPE`, or `LANG` environment variables.
- 默认值：在 Windows 系统上为 false，在带有 Unicode 区域设置的 mac/unix 系统上（由 `LC_ALL`、`LC_CTYPE` 或 `LANG` 环境变量定义）为 true。
- Type: Boolean

When set to true, npm uses unicode characters in the tree output. When false, it uses ascii characters instead of unicode glyphs.

​	设置为 true 时，npm 使用 Unicode 字符在树输出中显示。若为 false，则使用 ASCII 字符替代 Unicode 字形。

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可多次设置）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	启用在当前项目的配置工作区上下文中运行命令，同时仅限运行由此配置选项定义的工作区。

Valid values for the `workspace` config are either:

对于 `workspace` 配置的有效值，可以是：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将导致选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在 `npm init` 命令中设置时，可以将其设置为尚不存在的工作区文件夹，以创建该文件夹，并将其设置为项目中一个全新的工作区。

This value is not exported to the environment for child processes.

​	该值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true 以在**所有**配置的工作区上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	明确设置为 false 将导致 `install` 等命令完全忽略工作区。当未显式设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（如 install、update 等）将把工作区链接到 `node_modules` 文件夹中。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作的命令（如 test、exec、publish 等）将对根项目执行，除非在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

该值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	当工作区被启用时，包含工作区根项目。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	若为 false，通过 `workspace` 配置显式指定各个工作区，或通过 `workspaces` 标志指定所有工作区时，将导致 npm 仅对指定的工作区操作，而不操作根项目。

This value is not exported to the environment for child processes.

​	该值不会导出到子进程的环境中。

### `install-links`

- Default: false
- Type: Boolean

When set file: protocol dependencies will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.

​	设置此值时，file 协议依赖项将被打包并作为常规依赖项安装，而不是创建符号链接。此选项对工作区无效。

## See Also

- [package spec](https://docs.npmjs.com/cli/v10/using-npm/package-spec)
- [npm explain](https://docs.npmjs.com/cli/v10/commands/npm-explain)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm explain](https://docs.npmjs.com/cli/v10/commands/npm-explain)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm link](https://docs.npmjs.com/cli/v10/commands/npm-link)
- [npm prune](https://docs.npmjs.com/cli/v10/commands/npm-prune)
- [npm outdated](https://docs.npmjs.com/cli/v10/commands/npm-outdated)
- [npm update](https://docs.npmjs.com/cli/v10/commands/npm-update)