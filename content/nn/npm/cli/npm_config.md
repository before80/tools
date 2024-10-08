+++
title = "npm config"
date = 2024-10-06T15:40:35+08:00
weight = 90
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-config](https://docs.npmjs.com/cli/v10/commands/npm-config)

Manage the npm configuration files

​	管理 npm 配置文件

Version 10.9.0 (Latest)

## Synopsis



```bash
npm config set <key>=<value> [<key>=<value> ...]npm config get [<key> [<key> ...]]npm config delete <key> [<key> ...]npm config list [--json]npm config editnpm config fix
alias: c
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## Description

npm gets its config settings from the command line, environment variables, `npmrc` files, and in some cases, the `package.json` file.

​	npm 的配置设置来自命令行、环境变量、`npmrc` 文件以及在某些情况下的 `package.json` 文件。

See [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) for more information about the npmrc files.

​	有关 npmrc 文件的更多信息，请参见 [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)。

See [config](https://docs.npmjs.com/cli/v10/using-npm/config) for a more thorough explanation of the mechanisms involved, and a full list of config options available.

​	有关涉及机制的更详细解释以及可用配置选项的完整列表，请参见 [config](https://docs.npmjs.com/cli/v10/using-npm/config)。

The `npm config` command can be used to update and edit the contents of the user and global npmrc files.

​	`npm config` 命令可用于更新和编辑用户和全局 npmrc 文件的内容。

## 子命令 Sub-commands

Config supports the following sub-commands:

​	配置支持以下子命令：

### set



```bash
npm config set key=value [key=value...]
npm set key=value [key=value...]
```

Sets each of the config keys to the value provided. Modifies the user configuration file unless [`location`](https://docs.npmjs.com/cli/v10/commands/npm-config#location) is passed.

​	将每个配置键设置为提供的值。修改用户配置文件，除非传递了 [`location`](https://docs.npmjs.com/cli/v10/commands/npm-config#location)。

If value is omitted, the key will be removed from your config file entirely.

​	如果省略值，则该键将完全从您的配置文件中删除。

Note: for backwards compatibility, `npm config set key value` is supported as an alias for `npm config set key=value`.

​	注意：为了向后兼容，`npm config set key value` 被支持作为 `npm config set key=value` 的别名。

### get



```bash
npm config get [key ...]
npm get [key ...]
```

Echo the config value(s) to stdout.

​	将配置值回显到标准输出。

If multiple keys are provided, then the values will be prefixed with the key names.

​	如果提供了多个键，则值将以键名为前缀。

If no keys are provided, then this command behaves the same as `npm config list`.

​	如果未提供键，则此命令的行为与 `npm config list` 相同。

### list



```bash
npm config list
```

Show all the config settings. Use `-l` to also show defaults. Use `--json` to show the settings in json format.

​	显示所有配置设置。使用 `-l` 也显示默认值。使用 `--json` 以 JSON 格式显示设置。

### delete



```bash
npm config delete key [key ...]
```

Deletes the specified keys from all configuration files.

​	从所有配置文件中删除指定的键。

### edit



```bash
npm config edit
```

Opens the config file in an editor. Use the `--global` flag to edit the global config.

​	在编辑器中打开配置文件。使用 `--global` 标志以编辑全局配置。

### fix



```bash
npm config fix
```

Attempts to repair invalid configuration items. Usually this means attaching authentication config (i.e. `_auth`, `_authToken`) to the configured `registry`.

​	尝试修复无效的配置项。通常这意味着将认证配置（即 `_auth`、`_authToken`）附加到配置的 `registry`。

## Configuration

### `json`

- Default: false
- Type: Boolean

Whether or not to output JSON data, rather than the normal output.

​	是否输出 JSON 数据，而不是正常输出。

- In `npm pkg set` it enables parsing set values with JSON.parse() before saving them to your `package.json`.
- 在 `npm pkg set` 中，它启用在保存到 `package.json` 之前使用 JSON.parse() 解析设置的值。

Not supported by all npm commands.

​	并非所有 npm 命令都支持此功能。

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	以 "全局" 模式运行，以便将软件包安装到 `prefix` 文件夹中，而不是当前工作目录中。有关行为差异的更多信息，请参见 [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 软件包安装到 `{prefix}/lib/node_modules` 文件夹，而不是当前工作目录。
- bin files are linked to `{prefix}/bin`
- 可执行文件链接到 `{prefix}/bin`
- man pages are linked to `{prefix}/share/man`
- 手册页链接到 `{prefix}/share/man`

### `editor`

- Default: The EDITOR or VISUAL environment variables, or '%SYSTEMROOT%\notepad.exe' on Windows, or 'vi' on Unix systems
- 默认值：EDITOR 或 VISUAL 环境变量，或者在 Windows 上为 '%SYSTEMROOT%\notepad.exe'，在 Unix 系统上为 'vi'
- Type: String

The command to run for `npm edit` and `npm config edit`.

​	要为 `npm edit` 和 `npm config edit` 运行的命令。

### `location`

- Default: "user" unless `--global` is passed, which will also set this value to "global"
- 默认值："user"，除非传递了 `--global`，这也将把此值设置为 "global"
- Type: "global", "user", or "project"

When passed to `npm config` this refers to which config file to use.

​	传递给 `npm config` 时，指的是使用哪个配置文件。

When set to "global" mode, packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	当设置为 "global" 模式时，软件包安装到 `prefix` 文件夹中，而不是当前工作目录。有关行为差异的更多信息，请参见 [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 软件包安装到 `{prefix}/lib/node_modules` 文件夹，而不是当前工作目录。
- bin files are linked to `{prefix}/bin`
- 可执行文件链接到 `{prefix}/bin`
- man pages are linked to `{prefix}/share/man`
- 手册页链接到 `{prefix}/share/man`

### `long`

- Default: false
- Type: Boolean

Show extended information in `ls`, `search`, and `help-search`.

​	在 `ls`、`search` 和 `help-search` 中显示扩展信息。

## See Also

- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm](https://docs.npmjs.com/cli/v10/commands/npm)