+++
title = "_npmrc"
date = 2024-10-06T17:12:51+08:00
weight = 30
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/configuring-npm/npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)

The npm config files

​	npm 配置文件

Version 10.9.0 (Latest)

## Description

npm gets its config settings from the command line, environment variables, and `npmrc` files.

​	npm 的配置设置来源于命令行、环境变量和 `npmrc` 文件。

The `npm config` command can be used to update and edit the contents of the user and global npmrc files.

​	`npm config` 命令可用于更新和编辑用户和全局 npmrc 文件的内容。

For a list of available configuration options, see [config](https://docs.npmjs.com/cli/v10/using-npm/config).

​	要查看可用的配置选项列表，请参阅 [config](https://docs.npmjs.com/cli/v10/using-npm/config)。

## Files

The four relevant files are:

​	与配置相关的四个文件如下：

- per-project config file (`/path/to/my/project/.npmrc`)
- 每个项目的配置文件 (`/path/to/my/project/.npmrc`)

- per-user config file (`~/.npmrc`)
- 每个用户的配置文件 (`~/.npmrc`)
- global config file (`$PREFIX/etc/npmrc`)
- 全局配置文件 (`$PREFIX/etc/npmrc`)
- npm builtin config file (`/path/to/npm/npmrc`)
- npm 内置配置文件 (`/path/to/npm/npmrc`)

All npm config files are an ini-formatted list of `key = value` parameters. Environment variables can be replaced using `${VARIABLE_NAME}`. For example:

​	所有的 npm 配置文件都是以 ini 格式编写的 `key = value` 参数列表。环境变量可以通过 `${VARIABLE_NAME}` 来替换。例如：

```bash
cache = ${HOME}/.npm-packages
```

Each of these files is loaded, and config options are resolved in priority order. For example, a setting in the userconfig file would override the setting in the globalconfig file.

​	这些文件将按优先级顺序加载，并解析配置选项。例如，用户配置文件中的设置会覆盖全局配置文件中的设置。

Array values are specified by adding "[]" after the key name. For example:

​	数组值通过在键名后面添加 "[]" 来指定。例如：

```bash
key[] = "first value"
key[] = "second value"
```

### 注释 Comments

Lines in `.npmrc` files are interpreted as comments when they begin with a `;` or `#` character. `.npmrc` files are parsed by [npm/ini](https://github.com/npm/ini), which specifies this comment syntax.

​	当 `.npmrc` 文件中的行以 `;` 或 `#` 字符开头时，这些行将被解释为注释。`.npmrc` 文件由 [npm/ini](https://github.com/npm/ini) 解析，该库指定了这种注释语法。

For example:

​	例如：

```bash
# last modified: 01 Jan 2016
# 最后修改时间：2016年1月1日
; Set a new registry for a scoped package
; 为 scoped 包设置新的 registry
@myscope:registry=https://mycustomregistry.example.org
```

### 每个项目的配置文件 Per-project config file

When working locally in a project, a `.npmrc` file in the root of the project (ie, a sibling of `node_modules` and `package.json`) will set config values specific to this project.

​	在项目中进行本地操作时，位于项目根目录（即 `node_modules` 和 `package.json` 的同级目录）中的 `.npmrc` 文件将设置特定于该项目的配置值。

Note that this only applies to the root of the project that you're running npm in. It has no effect when your module is published. For example, you can't publish a module that forces itself to install globally, or in a different location.

​	注意，这仅适用于运行 npm 的项目根目录。当你的模块被发布时，它不会生效。例如，你无法发布一个强制自己全局安装或安装在不同位置的模块。

Additionally, this file is not read in global mode, such as when running `npm install -g`.

​	此外，该文件不会在全局模式下被读取，比如运行 `npm install -g` 时。



### 每个用户的配置文件 Per-user config file

`$HOME/.npmrc` (or the `userconfig` param, if set in the environment or on the command line)

​	`$HOME/.npmrc`（或如果在环境中设置了 `userconfig` 参数，则为该参数的值）

### 全局配置文件 Global config file

`$PREFIX/etc/npmrc` (or the `globalconfig` param, if set above): This file is an ini-file formatted list of `key = value` parameters. Environment variables can be replaced as above.

​	`$PREFIX/etc/npmrc`（或如果上面设置了 `globalconfig` 参数，则为该参数的值）：该文件是一个以 ini 格式编写的 `key = value` 参数列表。环境变量可以像上面那样被替换。

### 内置配置文件 Built-in config file

```
path/to/npm/itself/npmrc
```

This is an unchangeable "builtin" configuration file that npm keeps consistent across updates. Set fields in here using the `./configure` script that comes with npm. This is primarily for distribution maintainers to override default configs in a standard and consistent manner.

​	这是一个不可更改的 “内置” 配置文件，npm 在更新时会保持其一致性。可以使用 npm 附带的 `./configure` 脚本在此处设置字段。这主要用于分发维护人员以标准和一致的方式覆盖默认配置。

## 认证相关配置 Auth related configuration

The settings `_auth`, `_authToken`, `username` and `_password` must all be scoped to a specific registry. This ensures that `npm` will never send credentials to the wrong host.

​	`_auth`、`_authToken`、`username` 和 `_password` 等设置都必须与特定的 registry 相关联。这样可以确保 `npm` 永远不会将凭据发送到错误的主机。

The full list is:

​	完整列表如下：

- `_auth` (base64 authentication string)（base64 编码的认证字符串）
- `_authToken` (authentication token)（认证令牌）
- `username`
- `_password`
- `email`
- `certfile` (path to certificate file) （证书文件路径）
- `keyfile` (path to key file)（密钥文件路径）

In order to scope these values, they must be prefixed by a URI fragment. If the credential is meant for any request to a registry on a single host, the scope may look like `//registry.npmjs.org/:`. If it must be scoped to a specific path on the host that path may also be provided, such as `//my-custom-registry.org/unique/path:`.

​	为了设置这些值的作用域，它们必须带有 URI 片段作为前缀。如果凭据是针对单个主机上所有 registry 的请求，那么作用域可以是 `//registry.npmjs.org/:`。如果必须限定在主机上的特定路径上，也可以提供该路径，例如 `//my-custom-registry.org/unique/path:`。

```bash
; bad config_authToken=MYTOKEN
; good config@myorg:registry=https://somewhere-else.com/myorg@another:registry=https://somewhere-else.com/another//registry.npmjs.org/:_authToken=MYTOKEN
; would apply to both @myorg and @another//somewhere-else.com/:_authToken=MYTOKEN
; would apply only to @myorg//somewhere-else.com/myorg/:_authToken=MYTOKEN1
; would apply only to @another//somewhere-else.com/another/:_authToken=MYTOKEN2
```

## See also

- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [config](https://docs.npmjs.com/cli/v10/using-npm/config)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npm](https://docs.npmjs.com/cli/v10/commands/npm)