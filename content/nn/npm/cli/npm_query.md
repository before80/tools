+++
title = "npm query"
date = 2024-10-06T15:44:51+08:00
weight = 430
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-query](https://docs.npmjs.com/cli/v10/commands/npm-query)

Dependency selector query

​	依赖选择器查询

Version 10.9.0 (Latest)

## Synopsis



```bash
npm query <selector>
```

## Description

The `npm query` command allows for usage of css selectors in order to retrieve an array of dependency objects.

​	`npm query` 命令允许使用 CSS 选择器来检索依赖对象数组。

## 将 npm 查询通过管道传输到其他命令 Piping npm query to other commands



```bash
# find all dependencies with postinstall scripts & uninstall them
# 查找所有具有 postinstall 脚本的依赖项并卸载它们
npm query ":attr(scripts, [postinstall])" | jq 'map(.name)|join("\n")' -r | xargs -I {} npm uninstall {}
# find all git dependencies & explain who requires them
# 查找所有 git 依赖项并解释谁需要它们
npm query ":type(git)" | jq 'map(.name)' | xargs -I {} npm why {}
```

## 扩展使用案例和查询 Extended Use Cases & Queries



```stylus
// all deps*
// all direct deps:root > *
// direct production deps:root > .prod
// direct development deps:root > .dev
// any peer dep of a direct deps:root > * > .peer
// any workspace dep.workspace
// all workspaces that depend on another workspace.workspace > .workspace
// all workspaces that have peer deps.workspace:has(.peer)
// any dep named "lodash"// equivalent to [name="lodash"]#lodash
// any deps named "lodash" & within semver range ^"1.2.3"#lodash@^1.2.3// equivalent to...[name="lodash"]:semver(^1.2.3)
// get the hoisted node for a given semver range#lodash@^1.2.3:not(:deduped)
// querying deps with a specific version#lodash@2.1.5// equivalent to...[name="lodash"][version="2.1.5"]
// has any deps:has(*)
// deps with no other deps (ie. "leaf" nodes):empty
// manually querying git dependencies[repository^=github:],[repository^=git:],[repository^=https://github.com],[repository^=http://github.com],[repository^=https://github.com],[repository^=+git:...]
// querying for all git dependencies:type(git)
// get production dependencies that aren't also dev deps.prod:not(.dev)
// get dependencies with specific licenses[license=MIT], [license=ISC]
// find all packages that have @ruyadorno as a contributor:attr(contributors, [email=ruyadorno@github.com])
```

## 示例响应输出 Example Response Output

- an array of dependency objects is returned which can contain multiple copies of the same package which may or may not have been linked or deduped
- 返回一个依赖对象数组，该数组可能包含同一包的多个副本，这些副本可能已经链接或去重。



```json
[
  {
    "name": "",
    "version": "",
    "description": "",
    "homepage": "",
    "bugs": {},
    "author": {},
    "license": {},
    "funding": {},
    "files": [],
    "main": "",
    "browser": "",
    "bin": {},
    "man": [],
    "directories": {},
    "repository": {},
    "scripts": {},
    "config": {},
    "dependencies": {},
    "devDependencies": {},
    "optionalDependencies": {},
    "bundledDependencies": {},
    "peerDependencies": {},
    "peerDependenciesMeta": {},
    "engines": {},
    "os": [],
    "cpu": [],
    "workspaces": {},
    "keywords": [],
    ...
  },
  ...
```

## 期望特定数量的结果 Expecting a certain number of results

One common use of `npm query` is to make sure there is only one version of a certain dependency in your tree. This is especially common for ecosystems like that rely on `typescript` where having state split across two different but identically-named packages causes bugs. You can use the `--expect-results` or `--expect-result-count` in your setup to ensure that npm will exit with an exit code if your tree doesn't look like you want it to.

​	`npm query` 的一个常见用途是确保您的树中只有一个特定依赖项的版本。这在依赖于 `typescript` 的生态系统中特别常见，因为两个不同但同名的包的状态分散会导致错误。您可以在设置中使用 `--expect-results` 或 `--expect-result-count` 以确保如果您的树不符合预期，npm 将以错误代码退出。



```sh
$ npm query '#react' --expect-result-count=1
```

Perhaps you want to quickly check if there are any production dependencies that could be updated:

​	也许您想快速检查是否有任何可以更新的生产依赖项：



```sh
$ npm query ':root>:outdated(in-range).prod' --no-expect-results
```

## 仅限包锁模式 Package lock only mode

If package-lock-only is enabled, only the information in the package lock (or shrinkwrap) is loaded. This means that information from the package.json files of your dependencies will not be included in the result set (e.g. description, homepage, engines).

​	如果启用了 package-lock-only，则仅加载包锁（或 shrinkwrap）中的信息。这意味着来自依赖项的 package.json 文件的信息将不包含在结果集中（例如，描述、主页、引擎）。

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

### `workspace`

- Default:
- Type: String (can be set multiple times)

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

此值不会导出到子进程的环境中。

### `package-lock-only`

- Default: false
- Type: Boolean

If set to true, the current operation will only use the `package-lock.json`, ignoring `node_modules`.

​	如果设置为 true，则当前操作将仅使用 `package-lock.json`，忽略 `node_modules`。

For `update` this means only the `package-lock.json` will be updated, instead of checking `node_modules` and downloading dependencies.

​	对于 `update`，这意味着仅更新 `package-lock.json`，而不是检查 `node_modules` 并下载依赖项。

For `list` this means the output will be based on the tree described by the `package-lock.json`, rather than the contents of `node_modules`.

​	对于 `list`，这意味着输出将基于 `package-lock.json` 描述的树，而不是 `node_modules` 的内容。

### `expect-results`

- Default: null
- Type: null or Boolean

Tells npm whether or not to expect results from the command. Can be either true (expect some results) or false (expect no results).

​	告诉 npm 是否期望命令的结果。可以为 true（期望一些结果）或 false（不期望结果）。

This config can not be used with: `expect-result-count`

​	此配置不能与 `expect-result-count` 一起使用。

### `expect-result-count`

- Default: null
- Type: null or Number

Tells to expect a specific number of results from the command.

​	告诉命令期望的结果数量。

This config can not be used with: `expect-results`

​	此配置不能与 `expect-results` 一起使用。

# See Also

- [dependency selectors](https://docs.npmjs.com/cli/v10/using-npm/dependency-selectors)