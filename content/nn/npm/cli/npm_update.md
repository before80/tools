+++
title = "npm update"
date = 2024-10-06T15:47:54+08:00
weight = 620
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-update](https://docs.npmjs.com/cli/v10/commands/npm-update)

Update packages

​	更新包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm update [<pkg>...]

aliases: up, upgrade, udpate
```

## Description

This command will update all the packages listed to the latest version (specified by the [`tag` config](https://docs.npmjs.com/cli/v10/using-npm/config#tag)), respecting the semver constraints of both your package and its dependencies (if they also require the same package).

​	此命令将更新列出的所有包到最新版本（由 [`tag` 配置](https://docs.npmjs.com/cli/v10/using-npm/config#tag) 指定），并遵循您包及其依赖项的 semver 约束（如果它们也要求同一个包）。

It will also install missing packages.

​	它还将安装缺失的包。

If the `-g` flag is specified, this command will update globally installed packages.

​	如果指定了 `-g` 标志，此命令将更新全局安装的包。

If no package name is specified, all packages in the specified location (global or local) will be updated.

​	如果未指定包名，将更新指定位置（全局或本地）的所有包。

Note that by default `npm update` will not update the semver values of direct dependencies in your project `package.json`. If you want to also update values in `package.json` you can run: `npm update --save` (or add the `save=true` option to a [configuration file](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) to make that the default behavior).

​	请注意，默认情况下，`npm update` 不会更新您项目 `package.json` 中直接依赖项的 semver 值。如果您还想更新 `package.json` 中的值，可以运行：`npm update --save`（或在 [配置文件](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) 中添加 `save=true` 选项，使其成为默认行为）。

## 示例 Example

For the examples below, assume that the current package is `app` and it depends on dependencies, `dep1` (`dep2`, .. etc.). The published versions of `dep1` are:

​	对于以下示例，假设当前包是 `app`，并且它依赖于 `dep1`（`dep2` 等等）。`dep1` 的发布版本如下：



```json
{
  "dist-tags": { "latest": "1.2.2" },
  "versions": [
    "1.2.2",
    "1.2.1",
    "1.2.0",
    "1.1.2",
    "1.1.1",
    "1.0.0",
    "0.4.1",
    "0.4.0",
    "0.2.0"
  ]
}
```

### 插入符依赖 Caret Dependencies

If `app`'s `package.json` contains:

​	如果 `app` 的 `package.json` 包含：



```json
"dependencies": {
  "dep1": "^1.1.1"
}
```

Then `npm update` will install `dep1@1.2.2`, because `1.2.2` is `latest` and `1.2.2` satisfies `^1.1.1`.

​	那么 `npm update` 将安装 `dep1@1.2.2`，因为 `1.2.2` 是 `latest`，并且 `1.2.2` 满足 `^1.1.1`。

### 波浪号依赖 Tilde Dependencies

However, if `app`'s `package.json` contains:

​	然而，如果 `app` 的 `package.json` 包含：



```json
"dependencies": {
  "dep1": "~1.1.1"
}
```

In this case, running `npm update` will install `dep1@1.1.2`. Even though the `latest` tag points to `1.2.2`, this version does not satisfy `~1.1.1`, which is equivalent to `>=1.1.1 <1.2.0`. So the highest-sorting version that satisfies `~1.1.1` is used, which is `1.1.2`.

​	在这种情况下，运行 `npm update` 将安装 `dep1@1.1.2`。尽管 `latest` 标签指向 `1.2.2`，但该版本不满足 `~1.1.1`，其等价于 `>=1.1.1 <1.2.0`。因此，满足 `~1.1.1` 的最高排序版本是 `1.1.2`。

### 小于 1.0.0 的插入符依赖 Caret Dependencies below 1.0.0

Suppose `app` has a caret dependency on a version below `1.0.0`, for example:

​	假设 `app` 对一个小于 `1.0.0` 的版本有插入符依赖，例如：



```json
"dependencies": {
  "dep1": "^0.2.0"
}
```

`npm update` will install `dep1@0.2.0`.

​	`npm update` 将安装 `dep1@0.2.0`。

If the dependence were on `^0.4.0`:

​	如果依赖为 `^0.4.0`：



```json
"dependencies": {
  "dep1": "^0.4.0"
}
```

Then `npm update` will install `dep1@0.4.1`, because that is the highest-sorting version that satisfies `^0.4.0` (`>= 0.4.0 <0.5.0`)

​	那么 `npm update` 将安装 `dep1@0.4.1`，因为这是满足 `^0.4.0`（`>= 0.4.0 <0.5.0`）的最高排序版本。

### 子依赖 Subdependencies

Suppose your app now also has a dependency on `dep2`

​	假设您的应用现在还有对 `dep2` 的依赖：



```json
{
  "name": "my-app",
  "dependencies": {
    "dep1": "^1.0.0",
    "dep2": "1.0.0"
  }
}
```

and `dep2` itself depends on this limited range of `dep1`

​	而 `dep2` 自身依赖于 `dep1` 的这个有限范围：



```json
{
  "name": "dep2",
  "dependencies": {
    "dep1": "~1.1.1"
  }
}
```

Then `npm update` will install `dep1@1.1.2` because that is the highest version that `dep2` allows. npm will prioritize having a single version of `dep1` in your tree rather than two when that single version can satisfy the semver requirements of multiple dependencies in your tree. In this case if you really did need your package to use a newer version you would need to use `npm install`.

​	那么 `npm update` 将安装 `dep1@1.1.2`，因为这是 `dep2` 允许的最高版本。npm 会优先选择在您的树中拥有 `dep1` 的单一版本，而不是两个版本，当该单一版本可以满足您树中多个依赖的 semver 要求时。如果您确实需要您的包使用一个更新的版本，您需要使用 `npm install`。

### 更新全局安装的包 Updating Globally-Installed Packages

`npm update -g` will apply the `update` action to each globally installed package that is `outdated` -- that is, has a version that is different from `wanted`.

​	`npm update -g` 将对每个标记为 `outdated` 的全局安装包执行 `update` 操作——即，版本与 `wanted` 不同的包。

Note: Globally installed packages are treated as if they are installed with a caret semver range specified. So if you require to update to `latest` you may need to run `npm install -g [<pkg>...]`

​	注意：全局安装的包被视为安装了指定插入符 semver 范围的包。因此，如果您需要更新到 `latest`，可能需要运行 `npm install -g [<pkg>...]`

NOTE: If a package has been upgraded to a version newer than `latest`, it will be *downgraded*.

​	注意：如果某个包已升级到比 `latest` 更新的版本，它将被 *降级*。

## 配置 Configuration

### `save`

- Default: `true` unless when using `npm update` where it defaults to `false`
- 默认：`true`，除非使用 `npm update`，此时默认值为 `false`
- Type: Boolean

Save installed packages to a `package.json` file as dependencies.

​	将已安装的包保存到 `package.json` 文件中作为依赖项。

When used with the `npm rm` command, removes the dependency from `package.json`.

​	与 `npm rm` 命令一起使用时，从 `package.json` 中移除依赖项。

Will also prevent writing to `package-lock.json` if set to `false`.

​	如果设置为 `false`，还将防止写入 `package-lock.json`。

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	以“全局”模式操作，因此包安装到 `prefix` 文件夹而不是当前工作目录。有关行为差异的更多信息，请参见 [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 包安装到 `{prefix}/lib/node_modules` 文件夹，而不是当前工作目录。

- bin files are linked to `{prefix}/bin`
- 二进制文件链接到 `{prefix}/bin`
- man pages are linked to `{prefix}/share/man`
- 手册页链接到 `{prefix}/share/man`

### `install-strategy`

- Default: "hoisted"
- Type: "hoisted", "nested", "shallow", or "linked"

Sets the strategy for installing packages in node_modules. hoisted (default): Install non-duplicated in top-level, and duplicated as necessary within directory structure. nested: (formerly --legacy-bundling) install in place, no hoisting. shallow (formerly --global-style) only install direct deps at top-level. linked: (experimental) install in node_modules/.store, link in place, unhoisted.

​	设置在 node_modules 中安装包的策略。hoisted（默认）：在顶层安装非重复包，并在目录结构中根据需要重复安装。nested：（以前称为 --legacy-bundling）就地安装，不进行提升。shallow（以前称为 --global-style）只在顶层安装直接依赖。linked：（实验性）在 node_modules/.store 中安装，就地链接，未提升。

### `legacy-bundling`

- Default: false
- Type: Boolean
- DEPRECATED: This option has been deprecated in favor of `--install-strategy=nested`
- 已弃用：此选项已被 `--install-strategy=nested` 取代

Instead of hoisting package installs in `node_modules`, install packages in the same manner that they are depended on. This may cause very deep directory structures and duplicate package installs as there is no de-duplicating. Sets `--install-strategy=nested`.

​	不在 `node_modules` 中提升包安装，而是以依赖的方式安装包。这可能导致非常深的目录结构和重复的包安装，因为没有去重。设置 `--install-strategy=nested`。

### `global-style`

- Default: false
- Type: Boolean
- DEPRECATED: This option has been deprecated in favor of `--install-strategy=shallow`
- 已弃用：此选项已被 `--install-strategy=shallow` 取代

Only install direct dependencies in the top level `node_modules`, but hoist on deeper dependencies. Sets `--install-strategy=shallow`.

​	仅在顶层 `node_modules` 中安装直接依赖，但对更深层的依赖进行提升。设置 `--install-strategy=shallow`。

### `omit`

- Default: 'dev' if the `NODE_ENV` environment variable is set to 'production', otherwise empty.
- 默认：'dev'（如果 `NODE_ENV` 环境变量设置为 'production'），否则为空。
- Type: "dev", "optional", or "peer" (can be set multiple times)
- 类型：“dev”、“optional” 或 “peer”（可以多次设置）

Dependency types to omit from the installation tree on disk.

​	要从磁盘上的安装树中省略的依赖项类型。

Note that these dependencies *are* still resolved and added to the `package-lock.json` or `npm-shrinkwrap.json` file. They are just not physically installed on disk.

​	请注意，这些依赖项 *仍然* 会被解析并添加到 `package-lock.json` 或 `npm-shrinkwrap.json` 文件中。它们只是不会物理安装到磁盘上。

If a package type appears in both the `--include` and `--omit` lists, then it will be included.

​	如果某个包类型同时出现在 `--include` 和 `--omit` 列表中，则会被包括在内。

If the resulting omit list includes `'dev'`, then the `NODE_ENV` environment variable will be set to `'production'` for all lifecycle scripts.

​	如果最终的省略列表包含 `'dev'`，则 `NODE_ENV` 环境变量将为所有生命周期脚本设置为 `'production'`。

### `include`

- Default:
- Type: "prod", "dev", "optional", or "peer" (can be set multiple times)

Option that allows for defining which types of dependencies to install.

​	允许定义要安装哪些类型依赖项的选项。

This is the inverse of `--omit=<type>`.

​	这是 `--omit=<type>` 的逆操作。

Dependency types specified in `--include` will not be omitted, regardless of the order in which omit/include are specified on the command-line.

​	在 `--include` 中指定的依赖项类型将不会被省略，无论在命令行中指定的省略/包含的顺序如何。

### `strict-peer-deps`

- Default: false
- Type: Boolean

If set to `true`, and `--legacy-peer-deps` is not set, then *any* conflicting `peerDependencies` will be treated as an install failure, even if npm could reasonably guess the appropriate resolution based on non-peer dependency relationships.

​	如果设置为 `true`，并且未设置 `--legacy-peer-deps`，则 *任何* 冲突的 `peerDependencies` 将被视为安装失败，即使 npm 能够根据非 peer 依赖关系合理地猜测适当的解析。By default, conflicting `peerDependencies` deep in the dependency graph will be resolved using the nearest non-peer dependency specification, even if doing so will result in some packages receiving a peer dependency outside the range set in their package's `peerDependencies` object.

​	默认情况下，依赖图中的冲突 `peerDependencies` 将使用最近的非 peer 依赖项规范来解决，即使这样做会导致某些包在其 `peerDependencies` 对象中接收到超出范围的 peer 依赖。

When such an override is performed, a warning is printed, explaining the conflict and the packages involved. If `--strict-peer-deps` is set, then this warning is treated as a failure.

​	当进行这样的覆盖时，会打印警告，说明冲突和涉及的包。如果设置了 `--strict-peer-deps`，则此警告将被视为失败。

### `package-lock`

- Default: true
- Type: Boolean

If set to false, then ignore `package-lock.json` files when installing. This will also prevent *writing* `package-lock.json` if `save` is true.

​	如果设置为 false，则在安装时忽略 `package-lock.json` 文件。如果 `save` 为 true，这也将防止写入 `package-lock.json`。

### `foreground-scripts`

- Default: `false` unless when using `npm pack` or `npm publish` where it defaults to `true`
- 默认值：`false`，除非在使用 `npm pack` 或 `npm publish` 时，此时默认为 `true`
- Type: Boolean

Run all build scripts (ie, `preinstall`, `install`, and `postinstall`) scripts for installed packages in the foreground process, sharing standard input, output, and error with the main npm process.

​	在前台进程中运行所有已安装包的构建脚本（即 `preinstall`、`install` 和 `postinstall`），与主 npm 进程共享标准输入、输出和错误。

Note that this will generally make installs run slower, and be much noisier, but can be useful for debugging.

​	请注意，这通常会使安装运行得更慢，并且噪音更大，但对于调试很有用。

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 true，npm 将不运行 `package.json` 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	请注意，明确意图运行特定脚本的命令，例如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script` 将仍然运行它们预期的脚本，即使设置了 `ignore-scripts`，但它们不会运行任何前置或后置脚本。

### `audit`

- Default: true
- Type: Boolean

When "true" submit audit reports alongside the current npm command to the default registry and all registries configured for scopes. See the documentation for [`npm audit`](https://docs.npmjs.com/cli/v10/commands/npm-audit) for details on what is submitted.

​	当为 "true" 时，将审计报告与当前 npm 命令一起提交到默认注册表和所有为作用域配置的注册表。有关提交内容的详细信息，请参见 [`npm audit`](https://docs.npmjs.com/cli/v10/commands/npm-audit) 文档。

### `bin-links`

- Default: true
- Type: Boolean

Tells npm to create symlinks (or `.cmd` shims on Windows) for package executables.

​	告诉 npm 为包可执行文件创建符号链接（或在 Windows 上创建 `.cmd` 代理）。

Set to false to have it not do this. This can be used to work around the fact that some file systems don't support symlinks, even on ostensibly Unix systems.

​	设置为 false 以不执行此操作。这可以用于解决某些文件系统不支持符号链接的问题，即使在表面上是 Unix 系统。

### `fund`

- Default: true
- Type: Boolean

When "true" displays the message at the end of each `npm install` acknowledging the number of dependencies looking for funding. See [`npm fund`](https://docs.npmjs.com/cli/v10/commands/npm-fund) for details.

​	当为 "true" 时，在每次 `npm install` 结束时显示一条消息，确认有多少依赖项在寻求资金。有关详细信息，请参见 [`npm fund`](https://docs.npmjs.com/cli/v10/commands/npm-fund)。

### `dry-run`

- Default: false
- Type: Boolean

Indicates that you don't want npm to make any changes and that it should only report what it would have done. This can be passed into any of the commands that modify your local installation, eg, `install`, `update`, `dedupe`, `uninstall`, as well as `pack` and `publish`.

​	指示您不希望 npm 做出任何更改，而只报告它本来会做什么。可以将此选项传递给任何修改您本地安装的命令，例如 `install`、`update`、`dedupe`、`uninstall`，以及 `pack` 和 `publish`。

Note: This is NOT honored by other network related commands, eg `dist-tags`, `owner`, etc.

​	注意：其他与网络相关的命令，例如 `dist-tags`、`owner` 等，将不遵守此设置。

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以多次设置）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	启用在当前项目的配置工作区上下文中运行命令，同时仅过滤通过此配置选项定义的工作区。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值为：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	当为 `npm init` 命令设置时，可以设置为尚不存在的工作区文件夹，以创建该文件夹并将其设置为项目中的全新工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true，以在 **所有** 配置的工作区上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	显式将此设置为 false 将导致 `install` 等命令完全忽略工作区。未显式设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（install、update 等）将工作区链接到 `node_modules` 文件夹。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作的命令（test、exec、publish 等）将作用于根项目，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	当为命令启用工作区时，包含工作区根。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当为 false 时，通过 `workspace` 配置指定单个工作区或通过 `workspaces` 标志指定所有工作区将导致 npm 仅对指定的工作区进行操作，而不对根项目进行操作。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `install-links`

- Default: false
- Type: Boolean

When set file: protocol dependencies will be packed and installed as regular dependencies instead of creating a symlink. This option has no effect on workspaces.

​	设置为 file: 协议依赖项将作为常规依赖项打包和安装，而不是创建符号链接。此选项对工作区没有影响。

## See Also

- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm outdated](https://docs.npmjs.com/cli/v10/commands/npm-outdated)
- [npm shrinkwrap](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap)
- [npm registry](https://docs.npmjs.com/cli/v10/using-npm/registry)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm ls](https://docs.npmjs.com/cli/v10/commands/npm-ls)