+++
title = "npm ci"
date = 2024-10-06T15:40:20+08:00
weight = 70
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-ci](https://docs.npmjs.com/cli/v10/commands/npm-ci)

Clean install a project

​	清洁安装一个项目

Version 10.9.0 (Latest)

## Synopsis



```bash
npm ci

aliases: clean-install, ic, install-clean, isntall-clean
```

## Description

This command is similar to [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install), except it's meant to be used in automated environments such as test platforms, continuous integration, and deployment -- or any situation where you want to make sure you're doing a clean install of your dependencies.

​	此命令类似于 [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install)，但它旨在用于自动化环境，例如测试平台、持续集成和部署——或任何需要确保干净安装依赖项的情况。

The main differences between using `npm install` and `npm ci` are:

​	使用 `npm install` 和 `npm ci` 的主要区别如下：

- The project **must** have an existing `package-lock.json` or `npm-shrinkwrap.json`.
- 项目 **必须** 具有现有的 `package-lock.json` 或 `npm-shrinkwrap.json` 文件。

- If dependencies in the package lock do not match those in `package.json`, `npm ci` will exit with an error, instead of updating the package lock.
- 如果包锁中的依赖项与 `package.json` 中的不匹配，`npm ci` 将以错误退出，而不是更新包锁。
- `npm ci` can only install entire projects at a time: individual dependencies cannot be added with this command.
- `npm ci` 只能一次安装整个项目：无法通过此命令添加单个依赖项。
- If a `node_modules` is already present, it will be automatically removed before `npm ci` begins its install.
- 如果已存在 `node_modules`，在 `npm ci` 开始安装之前，它会被自动删除。
- It will never write to `package.json` or any of the package-locks: installs are essentially frozen.
- 它绝不会写入 `package.json` 或任何包锁文件：安装实际上是被冻结的。

NOTE: If you create your `package-lock.json` file by running `npm install` with flags that can affect the shape of your dependency tree, such as `--legacy-peer-deps` or `--install-links`, you *must* provide the same flags to `npm ci` or you are likely to encounter errors. An easy way to do this is to run, for example, `npm config set legacy-peer-deps=true --location=project` and commit the `.npmrc` file to your repo.

​	注意：如果通过使用可能影响依赖树形状的标志（如 `--legacy-peer-deps` 或 `--install-links`）运行 `npm install` 创建 `package-lock.json` 文件，则 *必须* 为 `npm ci` 提供相同的标志，否则可能会遇到错误。一个简单的方法是运行例如 `npm config set legacy-peer-deps=true --location=project` 并将 `.npmrc` 文件提交到您的代码库中。

## 示例 Example

Make sure you have a package-lock and an up-to-date install:

​	确保您有一个 package-lock 并进行最新安装：



```bash
$ cd ./my/npm/project
$ npm install
added 154 packages in 10s
$ ls | grep package-lock
```

Run `npm ci` in that project

​	在该项目中运行 `npm ci`：



```bash
$ npm ci
added 154 packages in 5s
```

Configure Travis CI to build using `npm ci` instead of `npm install`:

​	配置 Travis CI 使用 `npm ci` 而不是 `npm install` 进行构建：



```bash
# .travis.yml
install:
- npm ci
# keep the npm cache around to speed up installs
# 保持 npm 缓存以加快安装速度
cache:
  directories:
  - "$HOME/.npm"
```

## Configuration

### `install-strategy`

- Default: "hoisted"
- Type: "hoisted", "nested", "shallow", or "linked"

Sets the strategy for installing packages in node_modules. hoisted (default): Install non-duplicated in top-level, and duplicated as necessary within directory structure. nested: (formerly --legacy-bundling) install in place, no hoisting. shallow (formerly --global-style) only install direct deps at top-level. linked: (experimental) install in node_modules/.store, link in place, unhoisted.

​	设置在 node_modules 中安装包的策略。hoisted（默认）：在顶层安装不重复的包，并根据需要在目录结构中安装重复的包。nested（以前称为 --legacy-bundling）：原地安装，不进行提升。shallow（以前称为 --global-style）：仅在顶层安装直接依赖项。linked（实验性）：在 node_modules/.store 中安装，链接在原地，不提升。

### `legacy-bundling`

- Default: false
- Type: Boolean
- DEPRECATED: This option has been deprecated in favor of `--install-strategy=nested`
- 已弃用： 此选项已被弃用，建议使用 `--install-strategy=nested`

Instead of hoisting package installs in `node_modules`, install packages in the same manner that they are depended on. This may cause very deep directory structures and duplicate package installs as there is no de-duplicating. Sets `--install-strategy=nested`.

​	不提升 `node_modules` 中的包安装，而是以其依赖的相同方式安装包。这可能会导致非常深的目录结构和重复的包安装，因为没有去重。设置为 `--install-strategy=nested`。

### `global-style`

- Default: false
- Type: Boolean
- DEPRECATED: This option has been deprecated in favor of `--install-strategy=shallow`
- 已弃用： 此选项已被弃用，建议使用 `--install-strategy=shallow`

Only install direct dependencies in the top level `node_modules`, but hoist on deeper dependencies. Sets `--install-strategy=shallow`.

​	仅在顶层 `node_modules` 中安装直接依赖项，但对更深层的依赖项进行提升。设置为 `--install-strategy=shallow`。

### `omit`

- Default: 'dev' if the `NODE_ENV` environment variable is set to 'production', otherwise empty.
- 默认值：如果 `NODE_ENV` 环境变量设置为 'production'，则为 'dev'，否则为空。
- Type: "dev", "optional", or "peer" (can be set multiple times)
- 类型： "dev"、"optional" 或 "peer"（可以多次设置）

Dependency types to omit from the installation tree on disk.

​	在磁盘的安装树中要省略的依赖类型。

Note that these dependencies *are* still resolved and added to the `package-lock.json` or `npm-shrinkwrap.json` file. They are just not physically installed on disk.

​	注意，这些依赖项 *仍然* 会被解析并添加到 `package-lock.json` 或 `npm-shrinkwrap.json` 文件中。它们只是在磁盘上未被物理安装。

If a package type appears in both the `--include` and `--omit` lists, then it will be included.

​	如果某个包类型同时出现在 `--include` 和 `--omit` 列表中，则该包将被包含。

If the resulting omit list includes `'dev'`, then the `NODE_ENV` environment variable will be set to `'production'` for all lifecycle scripts.

​	如果结果的省略列表中包含 `'dev'`，则 `NODE_ENV` 环境变量将为所有生命周期脚本设置为 `'production'`。

### `include`

- Default:
- Type: "prod", "dev", "optional", or "peer" (can be set multiple times)
- 类型： "prod"、"dev"、"optional" 或 "peer"（可以多次设置）

Option that allows for defining which types of dependencies to install.

​	允许定义要安装的依赖类型的选项。

This is the inverse of `--omit=<type>`.

​	这是 `--omit=<type>` 的反向操作。

Dependency types specified in `--include` will not be omitted, regardless of the order in which omit/include are specified on the command-line.

​	在 `--include` 中指定的依赖类型将不会被省略，无论在命令行中省略/包含的顺序如何。

### `strict-peer-deps`

- Default: false
- Type: Boolean

If set to `true`, and `--legacy-peer-deps` is not set, then *any* conflicting `peerDependencies` will be treated as an install failure, even if npm could reasonably guess the appropriate resolution based on non-peer dependency relationships.

​	如果设置为 `true`，并且未设置 `--legacy-peer-deps`，则 *任何* 冲突的 `peerDependencies` 将被视为安装失败，即使 npm 可以根据非 peer 依赖关系合理推测适当的解决方案。

By default, conflicting `peerDependencies` deep in the dependency graph will be resolved using the nearest non-peer dependency specification, even if doing so will result in some packages receiving a peer dependency outside the range set in their package's `peerDependencies` object.

​	默认情况下，依赖图中深处的冲突 `peerDependencies` 将使用最近的非 peer 依赖项规范进行解决，即使这样会导致某些包接收到超出其 `peerDependencies` 对象中设定范围的 peer 依赖项。

When such an override is performed, a warning is printed, explaining the conflict and the packages involved. If `--strict-peer-deps` is set, then this warning is treated as a failure.

​	当执行此类覆盖时，会打印警告，解释冲突及相关包。如果设置了 `--strict-peer-deps`，则此警告将被视为失败。

### `foreground-scripts`

- Default: `false` unless when using `npm pack` or `npm publish` where it defaults to `true`
- 默认值： `false`，除非在使用 `npm pack` 或 `npm publish` 时，默认为 `true`
- Type: Boolean

Run all build scripts (ie, `preinstall`, `install`, and `postinstall`) scripts for installed packages in the foreground process, sharing standard input, output, and error with the main npm process.

​	在前台进程中运行所有构建脚本（即 `preinstall`、`install` 和 `postinstall`）的脚本，标准输入、输出和错误与主 npm 进程共享。

Note that this will generally make installs run slower, and be much noisier, but can be useful for debugging.

​	注意，这通常会使安装运行得更慢，并且会产生更多的输出，但在调试时可能会很有用。

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 true，npm 将不会运行 package.json 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	注意，明确旨在运行特定脚本的命令，例如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script` 仍会运行其预定脚本，即使设置了 `ignore-scripts`，但不会运行任何前置或后置脚本。

### `audit`

- Default: true
- Type: Boolean

When "true" submit audit reports alongside the current npm command to the default registry and all registries configured for scopes. See the documentation for [`npm audit`](https://docs.npmjs.com/cli/v10/commands/npm-audit) for details on what is submitted.

​	当为 "true" 时，将审计报告与当前 npm 命令一起提交到默认注册表和所有为作用域配置的注册表。有关提交内容的详细信息，请参阅 [`npm audit`](https://docs.npmjs.com/cli/v10/commands/npm-audit) 的文档。

### `bin-links`

- Default: true
- Type: Boolean

Tells npm to create symlinks (or `.cmd` shims on Windows) for package executables.

​	告知 npm 为包可执行文件创建符号链接（或 Windows 上的 `.cmd` shim）。

Set to false to have it not do this. This can be used to work around the fact that some file systems don't support symlinks, even on ostensibly Unix systems.

​	设置为 false 以禁用此功能。这可用于解决某些文件系统不支持符号链接的问题，即使在表面上是 Unix 系统的情况下。

### `fund`

- Default: true
- Type: Boolean

When "true" displays the message at the end of each `npm install` acknowledging the number of dependencies looking for funding. See [`npm fund`](https://docs.npmjs.com/cli/v10/commands/npm-fund) for details.

​	当为 "true" 时，在每次 `npm install` 结束时显示一条消息，确认有多少依赖项在寻求资金。有关详细信息，请参阅 [`npm fund`](https://docs.npmjs.com/cli/v10/commands/npm-fund)。

### `dry-run`

- Default: false
- Type: Boolean

Indicates that you don't want npm to make any changes and that it should only report what it would have done. This can be passed into any of the commands that modify your local installation, eg, `install`, `update`, `dedupe`, `uninstall`, as well as `pack` and `publish`.

​	表示您不希望 npm 进行任何更改，只需报告它本来会做什么。这可以传递给任何修改您本地安装的命令，例如 `install`、`update`、`dedupe`、`uninstall`，以及 `pack` 和 `publish`。

Note: This is NOT honored by other network related commands, eg `dist-tags`, `owner`, etc.

​	注意：其他网络相关命令（如 `dist-tags`、`owner` 等）不会遵循此选项。

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型： 字符串（可以多次设置）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	允许在当前项目的配置工作区上下文中运行命令，同时仅运行此配置选项定义的工作区。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值包括：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder)
- 父工作区目录路径（将选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在设置为 `npm init` 命令时，可以设置为尚不存在的工作区的文件夹，以创建该文件夹并将其设置为项目中的全新工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true 以在 **所有** 配置的工作区上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	显式设置为 false 将导致像 `install` 这样的命令完全忽略工作区。当没有显式设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（install、update 等）将把工作区链接到 `node_modules` 文件夹中。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 进行其他操作的命令（test、exec、publish 等）将作用于根项目，*除非* 在 `workspace` 配置中指定一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	当为命令启用工作区时，包含工作区根目录。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当为命令启用工作区时，包含工作区根目录。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `install-links`

- Default: false
- Type: Boolean

When set file: protocol dependencies will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.

​	当设置为 file: 协议依赖项将作为常规依赖项打包和安装，而不是创建符号链接。此选项对工作区没有影响。

## See Also

- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)