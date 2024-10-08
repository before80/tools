+++
title = "npm init"
date = 2024-10-06T15:42:40+08:00
weight = 250
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-init](https://docs.npmjs.com/cli/v10/commands/npm-init)

Create a package.json file

​	创建 package.json 文件

Version 10.9.0 (Latest)

## Synopsis



```bash
npm init <package-spec> (same as `npx create-<package-spec>`)
npm init <@scope> (same as `npx <@scope>/create`)

aliases: create, innit
```

## Description

`npm init <initializer>` can be used to set up a new or existing npm package.

​	`npm init <initializer>` 可用于设置一个新的或现有的 npm 包。

`initializer` in this case is an npm package named `create-<initializer>`, which will be installed by [`npm-exec`](https://docs.npmjs.com/cli/v10/commands/npm-exec), and then have its main bin executed -- presumably creating or updating `package.json` and running any other initialization-related operations.

​	在这种情况下，`initializer` 是一个名为 `create-<initializer>` 的 npm 包，它将通过 [`npm-exec`](https://docs.npmjs.com/cli/v10/commands/npm-exec) 安装，并执行其主二进制文件——预计会创建或更新 `package.json` 并运行任何其他与初始化相关的操作。

The init command is transformed to a corresponding `npm exec` operation as follows:

​	init 命令被转换为相应的 `npm exec` 操作，如下所示：

- `npm init foo` -> `npm exec create-foo`

- `npm init @usr/foo` -> `npm exec @usr/create-foo`
- `npm init @usr` -> `npm exec @usr/create`
- `npm init @usr@2.0.0` -> `npm exec @usr/create@2.0.0`
- `npm init @usr/foo@2.0.0` -> `npm exec @usr/create-foo@2.0.0`

If the initializer is omitted (by just calling `npm init`), init will fall back to legacy init behavior. It will ask you a bunch of questions, and then write a package.json for you. It will attempt to make reasonable guesses based on existing fields, dependencies, and options selected. It is strictly additive, so it will keep any fields and values that were already set. You can also use `-y`/`--yes` to skip the questionnaire altogether. If you pass `--scope`, it will create a scoped package.

​	如果省略了初始化器（只调用 `npm init`），init 将回退到传统的初始化行为。它将询问您一系列问题，然后为您写入一个 package.json。它将根据现有字段、依赖关系和所选选项进行合理的猜测。它是严格增量的，因此将保留已经设置的任何字段和值。您还可以使用 `-y`/`--yes` 完全跳过问卷。如果传递 `--scope`，将创建一个作用域包。

*Note:* if a user already has the `create-<initializer>` package globally installed, that will be what `npm init` uses. If you want npm to use the latest version, or another specific version you must specify it:

​	*注意：* 如果用户已经全局安装了 `create-<initializer>` 包，那么 `npm init` 将使用该包。如果您希望 npm 使用最新版本或其他特定版本，必须指定它：

- `npm init foo@latest` # fetches and runs the latest `create-foo` from the registry
- `npm init foo@latest` # 从注册表获取并运行最新的 `create-foo`

- `npm init foo@1.2.3` # runs `create-foo@1.2.3` specifically
- `npm init foo@1.2.3` # 特别运行 `create-foo@1.2.3`

### 

### 转发其他选项 Forwarding additional options

Any additional options will be passed directly to the command, so `npm init foo -- --hello` will map to `npm exec -- create-foo --hello`.

​	任何额外的选项将直接传递给命令，因此 `npm init foo -- --hello` 将映射到 `npm exec -- create-foo --hello`。

To better illustrate how options are forwarded, here's a more evolved example showing options passed to both the **npm cli** and a create package, both following commands are equivalent:

​	为了更好地说明选项是如何转发的，以下是一个更复杂的示例，显示了选项传递给 **npm cli** 和创建包，以下两个命令是等效的：

- `npm init foo -y --registry=<url> -- --hello -a`

- `npm exec -y --registry=<url> -- create-foo --hello -a`

## 示例 Examples

Create a new React-based project using [`create-react-app`](https://npm.im/create-react-app):

​	使用 [`create-react-app`](https://npm.im/create-react-app) 创建一个新的基于 React 的项目：

```bash
$ npm init react-app ./my-react-app
```

Create a new `esm`-compatible package using [`create-esm`](https://npm.im/create-esm):

​	使用 [`create-esm`](https://npm.im/create-esm) 创建一个新的 `esm` 兼容包：

```bash
$ mkdir my-esm-lib && cd my-esm-lib
$ npm init esm --yes
```

Generate a plain old package.json using legacy init:

​	使用传统初始化生成一个普通的 package.json：

```bash
$ mkdir my-npm-pkg && cd my-npm-pkg
$ git init
$ npm init
```

Generate it without having it ask any questions:

​	生成它而不询问任何问题：

```bash
$ npm init -y
```

## 工作区支持 Workspaces support

It's possible to create a new workspace within your project by using the `workspace` config option. When using `npm init -w <dir>` the cli will create the folders and boilerplate expected while also adding a reference to your project `package.json` `"workspaces": []` property in order to make sure that new generated **workspace** is properly set up as such.

​	可以通过使用 `workspace` 配置选项在项目中创建一个新的工作区。当使用 `npm init -w <dir>` 时，cli 将创建预期的文件夹和模板，同时在您的项目 `package.json` 中添加对 `"workspaces": []` 属性的引用，以确保新生成的 **workspace** 被正确设置。

Given a project with no workspaces, e.g:

​	给定一个没有工作区的项目，例如：

```bash
.
+-- package.json
```

You may generate a new workspace using the legacy init:

​	您可以使用传统初始化生成一个新的工作区：

```bash
$ npm init -w packages/a
```

That will generate a new folder and `package.json` file, while also updating your top-level `package.json` to add the reference to this new workspace:

​	这将生成一个新文件夹和 `package.json` 文件，同时更新您的顶级 `package.json` 以添加对这个新工作区的引用：

```bash
.
+-- package.json
`-- packages
   `-- a
       `-- package.json
```

The workspaces init also supports the `npm init <initializer> -w <dir>` syntax, following the same set of rules explained earlier in the initial **Description** section of this page. Similar to the previous example of creating a new React-based project using [`create-react-app`](https://npm.im/create-react-app), the following syntax will make sure to create the new react app as a nested **workspace** within your project and configure your `package.json` to recognize it as such:

​	工作区初始化还支持 `npm init <initializer> -w <dir>` 语法，遵循本页初始 **描述** 部分中解释的相同规则。类似于使用 [`create-react-app`](https://npm.im/create-react-app) 创建新的基于 React 的项目的先前示例，以下语法将确保将新的 react 应用程序作为嵌套 **workspace** 创建在您的项目中，并配置您的 `package.json` 以将其识别为：

```bash
npm init -w packages/my-react-app react-app .
```

This will make sure to generate your react app as expected, one important consideration to have in mind is that `npm exec` is going to be run in the context of the newly created folder for that workspace, and that's the reason why in this example the initializer uses the initializer name followed with a dot to represent the current directory in that context, e.g: `react-app .`:

​	这将确保按预期生成您的 react 应用程序，值得考虑的重要因素是 `npm exec` 将在为该工作区创建的新文件夹的上下文中运行，这就是为什么在此示例中初始化器使用初始化器名称后跟一个点来表示该上下文中的当前目录，例如：`react-app .`：

```bash
.
+-- package.json
`-- packages
   +-- a
   |   `-- package.json
   `-- my-react-app
       +-- README
       +-- package.json
       `-- ...
```

## 配置 Configuration

### `init-author-name`

- Default: ""
- Type: String

The value `npm init` should use by default for the package author's name.

​	`npm init` 默认应使用的包作者名称值。

### `init-author-url`

- Default: ""
- Type: "" or URL

The value `npm init` should use by default for the package author's homepage.

​	`npm init` 默认应使用的包作者主页值。

### `init-license`

- Default: "ISC"
- Type: String

The value `npm init` should use by default for the package license.

​	`npm init` 默认应使用的包许可值。

### `init-module`

- Default: "~/.npm-init.js"
- Type: Path

A module that will be loaded by the `npm init` command. See the documentation for the [init-package-json](https://github.com/npm/init-package-json) module for more information, or [npm init](https://docs.npmjs.com/cli/v10/commands/npm-init).

​	将由 `npm init` 命令加载的模块。有关更多信息，请参阅 [init-package-json](https://github.com/npm/init-package-json) 模块的文档或 [npm init](https://docs.npmjs.com/cli/v10/commands/npm-init)。

### `init-version`

- Default: "1.0.0"
- Type: SemVer string

The value that `npm init` should use by default for the package version number, if not already set in package.json.

​	如果在 package.json 中尚未设置，`npm init` 默认应使用的包版本号值。

### `yes`

- Default: null
- Type: null or Boolean

Automatically answer "yes" to any prompts that npm might print on the command line.

​	自动回答 npm 可能在命令行上打印的任何提示的 "yes"。

### `force`

- Default: false
- Type: Boolean

Removes various protections against unfortunate side effects, common mistakes, unnecessary performance degradation, and malicious input.

​	删除对不幸副作用、常见错误、不必要的性能下降和恶意输入的各种保护。

- Allow clobbering non-npm files in global installs.
- 允许在全局安装中覆盖非 npm 文件。
- Allow the `npm version` command to work on an unclean git repository.
- 允许 `npm version` 命令在不干净的 git 存储库上工作。
- Allow deleting the cache folder with `npm cache clean`.
- 允许使用 `npm cache clean` 删除缓存文件夹。
- Allow installing packages that have an `engines` declaration requiring a different version of npm.
- 允许安装具有 `engines` 声明的包，该声明要求不同版本的 npm。
- Allow installing packages that have an `engines` declaration requiring a different version of `node`, even if `--engine-strict` is enabled.
- 允许安装具有 `engines` 声明的包，该声明要求不同版本的 `node`，即使启用了 `--engine-strict`。
- Allow `npm audit fix` to install modules outside your stated dependency range (including SemVer-major changes).
- 允许 `npm audit fix` 在您声明的依赖范围之外安装模块（包括 SemVer-major 更改）。
- Allow unpublishing all versions of a published package.
- 允许取消发布已发布包的所有版本。
- Allow conflicting peerDependencies to be installed in the root project.
- 允许在根项目中安装冲突的 peerDependencies。
- Implicitly set `--yes` during `npm init`.
- 在 `npm init` 期间隐式设置 `--yes`。
- Allow clobbering existing values in `npm pkg`
- 允许覆盖 `npm pkg` 中的现有值。
- Allow unpublishing of entire packages (not just a single version).
- 允许取消发布整个包（而不仅仅是单个版本）。

If you don't have a clear idea of what you want to do, it is strongly recommended that you do not use this option!

​	如果您不清楚想做什么，强烈建议您不要使用此选项！

### `scope`

- Default: the scope of the current project, if any, or ""
- Type: String

Associate an operation with a scope for a scoped registry.

​	将操作与范围关联以进行范围注册。

Useful when logging in to or out of a private registry:

​	在登录或注销私有注册时很有用：

```bash
# log in, linking the scope to the custom registry
# 登录，将范围链接到自定义注册
npm login --scope=@mycorp --registry=https://registry.mycorp.com
# log out, removing the link and the auth token
# 登出，删除链接和认证令牌
npm logout --scope=@mycorp
```

This will cause `@mycorp` to be mapped to the registry for future installation of packages specified according to the pattern `@mycorp/package`.

​	这将导致 `@mycorp` 被映射到注册，以便将来安装根据模式 `@mycorp/package` 指定的包。

This will also cause `npm init` to create a scoped package.

​	这还将导致 `npm init` 创建一个作用域包。

```bash
# accept all defaults, and create a package named "@foo/whatever",
# instead of just named "whatever"
# 接受所有默认值，并创建一个名为 "@foo/whatever" 的包，
# 而不仅仅是命名为 "whatever"
npm init --scope=@foo --yes
```

### `workspace`

- Default:
- Type: String (can be set multiple times)

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	在当前项目的配置工作区上下文中运行命令，同时通过仅运行此配置选项定义的工作区进行筛选。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值可以是：

- Workspace names 工作区名称
- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将导致选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	当为 `npm init` 命令设置时，这可以设置为尚不存在的工作区的文件夹，以创建该文件夹并将其设置为项目中的新工作区。

This value is not exported to the environment for child processes.

​	该值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true 以在 **所有** 配置的工作区的上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	明确将其设置为 false 将导致类似 `install` 的命令完全忽略工作区。当未明确设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（安装、更新等）将在 `node_modules` 文件夹中链接工作区。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作的命令（测试、执行、发布等）将在根项目上操作，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	该值不会导出到子进程的环境中。

### `workspaces-update`

- Default: true
- Type: Boolean

If set to true, the npm cli will run an update after operations that may possibly change the workspaces installed to the `node_modules` folder.

​	如果设置为 true，npm cli 在可能更改安装到 `node_modules` 文件夹的工作区之后将运行更新。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	在为命令启用工作区时，包括工作区根。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当为 false 时，通过 `workspace` 配置指定单个工作区，或通过 `workspaces` 标志指定所有工作区，将导致 npm 仅对指定的工作区进行操作，而不对根项目进行操作。

This value is not exported to the environment for child processes.

​	该值不会导出到子进程的环境中。

## See Also

- [package spec](https://docs.npmjs.com/cli/v10/using-npm/package-spec)
- [init-package-json module](http://npm.im/init-package-json)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npm version](https://docs.npmjs.com/cli/v10/commands/npm-version)
- [npm scope](https://docs.npmjs.com/cli/v10/using-npm/scope)
- [npm exec](https://docs.npmjs.com/cli/v10/commands/npm-exec)
- [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)