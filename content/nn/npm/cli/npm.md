+++
title = "npm"
date = 2024-10-06T15:39:27+08:00
weight =10
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm](https://docs.npmjs.com/cli/v10/commands/npm)

javascript package manager

​	javascript 包管理器

Version 10.9.0 (Latest)

## 概述 Synopsis



```bash
npm
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## 版本 Version

10.9.0

## 描述 Description

npm is the package manager for the Node JavaScript platform. It puts modules in place so that node can find them, and manages dependency conflicts intelligently.

​	npm 是 Node JavaScript 平台的包管理器。它将模块放置到正确的位置，以便 Node 能够找到它们，并智能地管理依赖冲突。

It is extremely configurable to support a variety of use cases. Most commonly, you use it to publish, discover, install, and develop node programs.

​	它具有极高的可配置性，以支持各种用例。最常见的使用方式是发布、发现、安装和开发 Node 程序。

Run `npm help` to get a list of available commands.

​	运行 `npm help` 可以获得可用命令的列表。

## 重要信息 Important

npm comes preconfigured to use npm's public registry at [https://registry.npmjs.org](https://registry.npmjs.org/) by default. Use of the npm public registry is subject to terms of use available at https://docs.npmjs.com/policies/terms.

​	npm 默认配置为使用 npm 的公共注册表 [https://registry.npmjs.org](https://registry.npmjs.org/)。使用 npm 公共注册表需要遵守 https://docs.npmjs.com/policies/terms 上的使用条款。

You can configure npm to use any compatible registry you like, and even run your own registry. Use of someone else's registry is governed by their terms of use.

​	您可以配置 npm 使用任何兼容的注册表，甚至可以运行自己的注册表。使用其他人的注册表受其使用条款的约束。

## 介绍 Introduction

You probably got npm because you want to install stuff.

​	您可能是因为想要安装一些东西而获得 npm。

The very first thing you will most likely want to run in any node program is `npm install` to install its dependencies.

​	您在任何 Node 程序中最有可能首先运行的命令是 `npm install` 来安装其依赖项。

You can also run `npm install blerg` to install the latest version of "blerg". Check out [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install) for more info. It can do a lot of stuff.

​	您也可以运行 `npm install blerg` 来安装最新版本的 “blerg”。有关更多信息，请查看 [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install)。它可以做很多事情。

Use the `npm search` command to show everything that's available in the public registry. Use `npm ls` to show everything you've installed.

​	使用 `npm search` 命令可以显示公共注册表中所有可用的内容。使用 `npm ls` 可以显示您已安装的所有内容。

## 依赖项 Dependencies

If a package lists a dependency using a git URL, npm will install that dependency using the [`git`](https://github.com/git-guides/install-git) command and will generate an error if it is not installed.

​	如果一个包使用 Git URL 列出了依赖项，npm 将使用 [`git`](https://github.com/git-guides/install-git) 命令安装该依赖项，如果未安装则会生成错误。

If one of the packages npm tries to install is a native node module and requires compiling of C++ Code, npm will use [node-gyp](https://github.com/nodejs/node-gyp) for that task. For a Unix system, [node-gyp](https://github.com/nodejs/node-gyp) needs Python, make and a buildchain like GCC. On Windows, Python and Microsoft Visual Studio C++ are needed. For more information visit [the node-gyp repository](https://github.com/nodejs/node-gyp) and the [node-gyp Wiki](https://github.com/nodejs/node-gyp/wiki).

​	如果 npm 尝试安装的其中一个包是本地 Node 模块，并且需要编译 C++ 代码，npm 将使用 [node-gyp](https://github.com/nodejs/node-gyp) 来完成此任务。在 Unix 系统上，`node-gyp` 需要 Python、make 和类似 GCC 的构建工具。在 Windows 上，需要 Python 和 Microsoft Visual Studio C++。有关更多信息，请访问 [node-gyp 仓库](https://github.com/nodejs/node-gyp) 和 [node-gyp Wiki](https://github.com/nodejs/node-gyp/wiki)。

## 目录 Directories

See [`folders`](https://docs.npmjs.com/cli/v10/configuring-npm/folders) to learn about where npm puts stuff.

​	有关 npm 存放文件位置的信息，请参见 [`folders`](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

In particular, npm has two modes of operation:

​	特别地，npm 有两种操作模式：

- local mode: npm installs packages into the current project directory, which defaults to the current working directory. Packages install to `./node_modules`, and bins to `./node_modules/.bin`.
- 本地模式：npm 将包安装到当前项目目录，默认为当前工作目录。包安装到 `./node_modules`，可执行文件安装到 `./node_modules/.bin`。
- global mode: npm installs packages into the install prefix at `$npm_config_prefix/lib/node_modules` and bins to `$npm_config_prefix/bin`.
- 全局模式：npm 将包安装到安装前缀 `$npm_config_prefix/lib/node_modules` 中，并将可执行文件安装到 `$npm_config_prefix/bin` 中。

Local mode is the default. Use `-g` or `--global` on any command to run in global mode instead.

​	本地模式是默认模式。可以在任何命令上使用 `-g` 或 `--global` 来改为全局模式运行。

## 开发者使用 Developer Usage

If you're using npm to develop and publish your code, check out the following help topics:

​	如果您使用 npm 开发和发布代码，请查看以下帮助主题：

- json: Make a package.json file. See [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json).
- json：创建一个 package.json 文件。请参见 [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)。

- link: Links your current working code into Node's path, so that you don't have to reinstall every time you make a change. Use [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link) to do this.
- link：将您当前的工作代码链接到 Node 的路径中，以便您在每次更改时无需重新安装。使用 [`npm link`](https://docs.npmjs.com/cli/v10/commands/npm-link) 来执行此操作。
- install: It's a good idea to install things if you don't need the symbolic link. Especially, installing other peoples code from the registry is done via [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install)
- install：如果您不需要符号链接，安装东西是个好主意。特别是，从注册表安装其他人的代码是通过 [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install) 完成的。
- adduser: Create an account or log in. When you do this, npm will store credentials in the user config file.
- adduser：创建一个帐户或登录。当您执行此操作时，npm 会在用户配置文件中存储凭据。
- publish: Use the [`npm publish`](https://docs.npmjs.com/cli/v10/commands/npm-publish) command to upload your code to the registry.
- publish：使用 [`npm publish`](https://docs.npmjs.com/cli/v10/commands/npm-publish) 命令将您的代码上传到注册表。

### 配置 Configuration

npm is extremely configurable. It reads its configuration options from 5 places.

​	npm 的可配置性极高。它从五个地方读取其配置选项。

- Command line switches: Set a config with `--key val`. All keys take a value, even if they are booleans (the config parser doesn't know what the options are at the time of parsing). If you do not provide a value (`--key`) then the option is set to boolean `true`.
- 命令行参数：使用 `--key val` 设置配置。所有键都需要一个值，即使它们是布尔值（配置解析器在解析时并不知道选项是什么）。如果您不提供值（`--key`），则该选项将被设置为布尔值 `true`。

- Environment Variables: Set any config by prefixing the name in an environment variable with `npm_config_`. For example, `export npm_config_key=val`.
- 环境变量：通过在环境变量中将名称前缀为 `npm_config_` 来设置任何配置。例如，`export npm_config_key=val`。
- User Configs: The file at `$HOME/.npmrc` is an ini-formatted list of configs. If present, it is parsed. If the `userconfig` option is set in the cli or env, that file will be used instead.
- 用户配置：位于 `$HOME/.npmrc` 的文件是一个 ini 格式的配置列表。如果存在，它将被解析。如果在 CLI 或环境中设置了 `userconfig` 选项，则将使用该文件。
- Global Configs: The file found at `./etc/npmrc` (relative to the global prefix will be parsed if it is found. See [`npm prefix`](https://docs.npmjs.com/cli/v10/commands/npm-prefix) for more info on the global prefix. If the `globalconfig` option is set in the cli, env, or user config, then that file is parsed instead.
- 全局配置：在全局前缀处找到的文件 `./etc/npmrc`（相对于全局前缀）将被解析。如果在 CLI、环境或用户配置中设置了 `globalconfig` 选项，则将解析该文件。
- Defaults: npm's default configuration options are defined in `lib/utils/config/definitions.js`. These must not be changed.
- 默认值：npm 的默认配置选项在 `lib/utils/config/definitions.js` 中定义。这些不得更改。

See [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) for much much more information.

​	有关更多信息，请参见 [`config`](https://docs.npmjs.com/cli/v10/using-npm/config)。

## 贡献 Contributions

Patches welcome!

​	欢迎补丁！

If you would like to help, but don't know what to work on, read the [contributing guidelines](https://github.com/npm/cli/blob/latest/CONTRIBUTING.md) and check the issues list.

​	如果您想提供帮助，但不知道该做什么，请阅读 [贡献指南](https://github.com/npm/cli/blob/latest/CONTRIBUTING.md) 并检查问题列表。

## 错误报告 Bugs

When you find issues, please report them: https://github.com/npm/cli/issues

​	当您发现问题时，请报告它们：https://github.com/npm/cli/issues

Please be sure to follow the template and bug reporting guidelines.

​	请确保遵循模板和错误报告指南。

## 功能请求 Feature Requests

Discuss new feature ideas on our discussion forum:

​	在我们的讨论论坛上讨论新功能的想法：

- https://github.com/orgs/community/discussions/categories/npm

Or suggest formal RFC proposals:

​	或者建议正式的 RFC 提案：

- https://github.com/npm/rfcs

## See Also

- [npm help](https://docs.npmjs.com/cli/v10/commands/npm-help)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm prefix](https://docs.npmjs.com/cli/v10/commands/npm-prefix)
- [npm publish](https://docs.npmjs.com/cli/v10/commands/npm-publish)