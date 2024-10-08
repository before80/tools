+++
title = "npm install-test"
date = 2024-10-06T15:43:14+08:00
weight = 280
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-install-test](https://docs.npmjs.com/cli/v10/commands/npm-install-test)

Install package(s) and run tests

​	安装软件包并运行测试

Version 10.9.0 (Latest)

## Synopsis



```bash
npm install-test [<package-spec> ...]

alias: it
```

## Description

This command runs an `npm install` followed immediately by an `npm test`. It takes exactly the same arguments as `npm install`.

​	此命令先运行 `npm install`，然后立即运行 `npm test`。它接受与 `npm install` 相同的参数。

## Configuration

### `save`

- Default: `true` unless when using `npm update` where it defaults to `false`
- 默认值：`true`（除非使用 `npm update` 命令时，默认为 `false`）
- Type: Boolean

Save installed packages to a `package.json` file as dependencies.

​	将已安装的软件包保存到 `package.json` 文件中作为依赖项。

When used with the `npm rm` command, removes the dependency from `package.json`.

​	与 `npm rm` 命令一起使用时，会将依赖项从 `package.json` 中删除。

Will also prevent writing to `package-lock.json` if set to `false`.

​	如果设置为 `false`，还会阻止写入 `package-lock.json` 文件。

### `save-exact`

- Default: false
- Type: Boolean

Dependencies saved to package.json will be configured with an exact version rather than using npm's default semver range operator.

​	将依赖项保存到 `package.json` 时，使用精确版本，而不是 npm 的默认语义版本范围操作符。

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	以“全局”模式运行，即软件包会安装到 `prefix` 文件夹，而不是当前工作目录。有关行为差异的更多信息，请参阅 [文件夹](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 软件包安装到 `{prefix}/lib/node_modules` 文件夹，而不是当前工作目录。

- bin files are linked to `{prefix}/bin`
- 可执行文件链接到 `{prefix}/bin`。
- man pages are linked to `{prefix}/share/man`
- 手册页链接到 `{prefix}/share/man`。

### `install-strategy`

- Default: "hoisted"
- Type: "hoisted", "nested", "shallow", or "linked"

Sets the strategy for installing packages in node_modules. hoisted (default): Install non-duplicated in top-level, and duplicated as necessary within directory structure. nested: (formerly --legacy-bundling) install in place, no hoisting. shallow (formerly --global-style) only install direct deps at top-level. linked: (experimental) install in node_modules/.store, link in place, unhoisted.

​	设置在 `node_modules` 中安装软件包的策略。`hoisted`（默认）：将不重复的依赖项安装在顶层，并根据需要在目录结构中安装重复项。`nested`（以前称为 `--legacy-bundling`）：按位置安装，不提升。`shallow`（以前称为 `--global-style`）：仅在顶层安装直接依赖项。`linked`（实验性）：安装在 `node_modules/.store` 中，按位置链接，不提升。

### `legacy-bundling`

- Default: false
- Type: Boolean
- DEPRECATED: This option has been deprecated in favor of `--install-strategy=nested`
- **已弃用**：此选项已弃用，建议使用 `--install-strategy=nested`。

Instead of hoisting package installs in `node_modules`, install packages in the same manner that they are depended on. This may cause very deep directory structures and duplicate package installs as there is no de-duplicating. Sets `--install-strategy=nested`.

​	不提升 `node_modules` 中的软件包安装，而是按照依赖关系顺序安装。可能会导致非常深的目录结构和重复的软件包安装，因为没有去重功能。相当于设置 `--install-strategy=nested`。

### `global-style`

- Default: false
- Type: Boolean
- DEPRECATED: This option has been deprecated in favor of `--install-strategy=shallow`
- **已弃用**：此选项已弃用，建议使用 `--install-strategy=shallow`。

Only install direct dependencies in the top level `node_modules`, but hoist on deeper dependencies. Sets `--install-strategy=shallow`.

​	仅在顶层 `node_modules` 中安装直接依赖项，但会在更深的依赖项上提升。相当于设置 `--install-strategy=shallow`。

### `omit`

- Default: 'dev' if the `NODE_ENV` environment variable is set to 'production', otherwise empty.
- 默认值：如果 `NODE_ENV` 环境变量设置为 `production`，则为 `dev`，否则为空。
- Type: "dev", "optional", or "peer" (can be set multiple times)
- 类型：`dev`、`optional` 或 `peer`（可多次设置）

Dependency types to omit from the installation tree on disk.

​	在磁盘安装树中省略的依赖项类型。

Note that these dependencies *are* still resolved and added to the `package-lock.json` or `npm-shrinkwrap.json` file. They are just not physically installed on disk.

​	请注意，这些依赖项仍然会被解析并添加到 `package-lock.json` 或 `npm-shrinkwrap.json` 文件中，只是不会实际安装到磁盘上。

If a package type appears in both the `--include` and `--omit` lists, then it will be included.

​	如果某个依赖项类型同时出现在 `--include` 和 `--omit` 列表中，则它将被包含。

If the resulting omit list includes `'dev'`, then the `NODE_ENV` environment variable will be set to `'production'` for all lifecycle scripts.

​	如果最终的省略列表中包含 `dev`，则 `NODE_ENV` 环境变量将在所有生命周期脚本中设置为 `production`。

### `include`

- Default:
- Type: "prod", "dev", "optional", or "peer" (can be set multiple times)
- 类型：`prod`、`dev`、`optional` 或 `peer`（可多次设置）

Option that allows for defining which types of dependencies to install.

​	用于定义要安装的依赖项类型的选项。

This is the inverse of `--omit=<type>`.

​	这是 `--omit=<type>` 的逆操作。

Dependency types specified in `--include` will not be omitted, regardless of the order in which omit/include are specified on the command-line.

​	在命令行中指定的依赖项类型不会被省略，无论 `omit/include` 的顺序如何。

### `strict-peer-deps`

- Default: false
- Type: Boolean

If set to `true`, and `--legacy-peer-deps` is not set, then *any* conflicting `peerDependencies` will be treated as an install failure, even if npm could reasonably guess the appropriate resolution based on non-peer dependency relationships.

​	如果设置为 `true`，且未设置 `--legacy-peer-deps`，那么 *任何* 冲突的 `peerDependencies` 都将被视为安装失败，即使 npm 可以合理地根据非 `peer` 依赖关系推测出合适的解决方案。

By default, conflicting `peerDependencies` deep in the dependency graph will be resolved using the nearest non-peer dependency specification, even if doing so will result in some packages receiving a peer dependency outside the range set in their package's `peerDependencies` object.

​	默认情况下，依赖图中深层的冲突 `peerDependencies` 会使用最近的非 `peer` 依赖项规范进行解析，即使这样做会导致某些软件包接收的 `peer` 依赖项超出其 `peerDependencies` 对象中设置的范围。

When such an override is performed, a warning is printed, explaining the conflict and the packages involved. If `--strict-peer-deps` is set, then this warning is treated as a failure.

​	当执行这种覆盖时，会打印警告，解释冲突及涉及的软件包。如果设置了 `--strict-peer-deps`，则此警告将被视为失败。

### `prefer-dedupe`

- Default: false
- Type: Boolean

Prefer to deduplicate packages if possible, rather than choosing a newer version of a dependency.

​	如果可能，更倾向于去重软件包，而不是选择依赖项的较新版本。

### `package-lock`

- Default: true
- Type: Boolean

If set to false, then ignore `package-lock.json` files when installing. This will also prevent *writing* `package-lock.json` if `save` is true.

​	如果设置为 `false`，则安装时忽略 `package-lock.json` 文件。如果 `save` 为 `true`，也将阻止 *写入* `package-lock.json`。

### `package-lock-only`

- Default: false
- Type: Boolean

If set to true, the current operation will only use the `package-lock.json`, ignoring `node_modules`.

​	如果设置为 `true`，当前操作将仅使用 `package-lock.json`，而忽略 `node_modules`。

For `update` this means only the `package-lock.json` will be updated, instead of checking `node_modules` and downloading dependencies.

​	对于 `update` 操作，这意味着只会更新 `package-lock.json`，而不是检查 `node_modules` 并下载依赖项。

For `list` this means the output will be based on the tree described by the `package-lock.json`, rather than the contents of `node_modules`.

​	对于 `list` 操作，这意味着输出将基于 `package-lock.json` 中描述的树，而不是 `node_modules` 的内容。

### `foreground-scripts`

- Default: `false` unless when using `npm pack` or `npm publish` where it defaults to `true`
- 默认值：`false`（除非使用 `npm pack` 或 `npm publish` 时，默认为 `true`）
- Type: Boolean

Run all build scripts (ie, `preinstall`, `install`, and `postinstall`) scripts for installed packages in the foreground process, sharing standard input, output, and error with the main npm process.

​	在前台进程中运行所有构建脚本（即 `preinstall`、`install` 和 `postinstall`）的脚本，与主 npm 进程共享标准输入、输出和错误。

Note that this will generally make installs run slower, and be much noisier, but can be useful for debugging.

​	请注意，这通常会使安装速度变慢，并且输出信息更多，但在调试时非常有用。

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 `true`，npm 将不会运行在 `package.json` 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	请注意，显式用于运行特定脚本的命令（如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`）在 `ignore-scripts` 设置时仍会运行其预期脚本，但不会运行任何 `pre-` 或 `post-` 脚本。

### `audit`

- Default: true
- Type: Boolean

When "true" submit audit reports alongside the current npm command to the default registry and all registries configured for scopes. See the documentation for [`npm audit`](https://docs.npmjs.com/cli/v10/commands/npm-audit) for details on what is submitted.

​	当设置为 `true` 时，会将审计报告提交到默认注册表和所有为作用域配置的注册表。有关提交内容的详细信息，请参阅 [`npm audit`](https://docs.npmjs.com/cli/v10/commands/npm-audit) 文档。

### `bin-links`

- Default: true
- Type: Boolean

Tells npm to create symlinks (or `.cmd` shims on Windows) for package executables.

​	告诉 npm 为软件包可执行文件创建符号链接（或在 Windows 上创建 `.cmd` 绑定）。

Set to false to have it not do this. This can be used to work around the fact that some file systems don't support symlinks, even on ostensibly Unix systems.

​	设置为 `false` 时，不会创建链接。这可以用于解决某些文件系统（即使在表面上是 Unix 系统）不支持符号链接的问题。

### `fund`

- Default: true
- Type: Boolean

When "true" displays the message at the end of each `npm install` acknowledging the number of dependencies looking for funding. See [`npm fund`](https://docs.npmjs.com/cli/v10/commands/npm-fund) for details.

​	当设置为 `true` 时，会在每次 `npm install` 后显示依赖项寻求资金支持的消息。详细信息请参阅 [`npm fund`](https://docs.npmjs.com/cli/v10/commands/npm-fund)。

### `dry-run`

- Default: false
- Type: Boolean

Indicates that you don't want npm to make any changes and that it should only report what it would have done. This can be passed into any of the commands that modify your local installation, eg, `install`, `update`, `dedupe`, `uninstall`, as well as `pack` and `publish`.

​	表示你不希望 npm 进行任何更改，而只是报告它将会做什么。这可以传递给任何会修改本地安装的命令，如 `install`、`update`、`dedupe`、`uninstall`，以及 `pack` 和 `publish`。

Note: This is NOT honored by other network related commands, eg `dist-tags`, `owner`, etc.

​	注意：这不适用于其他网络相关命令，如 `dist-tags`、`owner` 等。

### `cpu`

- Default: null
- Type: null or String

Override CPU architecture of native modules to install. Acceptable values are same as `cpu` field of package.json, which comes from `process.arch`.

​	覆盖要安装的本机模块的 CPU 架构。可接受的值与 `package.json` 中的 `cpu` 字段相同，来自 `process.arch`。

### `os`

- Default: null
- Type: null or String

Override OS of native modules to install. Acceptable values are same as `os` field of package.json, which comes from `process.platform`.

​	覆盖要安装的本机模块的操作系统。可接受的值与 `package.json` 中的 `os` 字段相同，来自 `process.platform`。

### `libc`

- Default: null
- Type: null or String

Override libc of native modules to install. Acceptable values are same as `libc` field of package.json

​	覆盖要安装的本机模块的 libc。可接受的值与 `package.json` 中的 `libc` 字段相同。

### `workspace`

- Default:
- Type: String (can be set multiple times)

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	启用在当前项目配置的工作区上下文中运行命令，并根据配置选项仅运行指定的工作区。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值可以是以下之一：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将导致选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	对于 `npm init` 命令设置时，可以将此选项设置为尚不存在的工作区文件夹，以在项目中创建该文件夹并将其设置为一个全新的工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 `true` 时，在 **所有** 配置的工作区上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	显式设置为 `false` 时，诸如 `install` 等命令将完全忽略工作区。当未显式设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（如 `install`、`update` 等）将链接工作区到 `node_modules` 文件夹中。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作的命令（如 `test`、`exec`、`publish` 等）将操作根项目，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	启用工作区时，是否包含工作区根目录。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	设置为 `false` 时，通过 `workspace` 配置指定单个工作区或通过 `workspaces` 标志指定所有工作区时，npm 只会对指定的工作区进行操作，而不是根项目。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `install-links`

- Default: false
- Type: Boolean

When set file: protocol dependencies will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.

​	设置为 `true` 时，`file:` 协议的依赖项将被打包并作为常规依赖项安装，而不是创建符号链接。此选项对工作区无效。

## See Also

- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm install-ci-test](https://docs.npmjs.com/cli/v10/commands/npm-install-ci-test)
- [npm test](https://docs.npmjs.com/cli/v10/commands/npm-test)