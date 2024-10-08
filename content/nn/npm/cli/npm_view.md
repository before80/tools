+++
title = "npm view"
date = 2024-10-06T15:48:08+08:00
weight = 640
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-view](https://docs.npmjs.com/cli/v10/commands/npm-view)

View registry info

​	查看注册表信息

Version 10.9.0 (Latest)

## Synopsis



```bash
npm view [<package-spec>] [<field>[.subfield]...]
aliases: info, show, v
```

## Description

This command shows data about a package and prints it to stdout.

​	此命令显示有关包的数据并将其打印到标准输出。

As an example, to view information about the `connect` package from the registry, you would run:

​	例如，要查看注册表中 `connect` 包的信息，可以运行：



```bash
npm view connect
```

The default version is `"latest"` if unspecified.

​	如果未指定，默认版本为 `"latest"`。

Field names can be specified after the package descriptor. For example, to show the dependencies of the `ronn` package at version `0.3.5`, you could do the following:

​	字段名称可以在包描述符后面指定。例如，要显示 `ronn` 包版本 `0.3.5` 的依赖项，可以执行以下操作：



```bash
npm view ronn@0.3.5 dependencies
```

By default, `npm view` shows data about the current project context (by looking for a `package.json`). To show field data for the current project use a file path (i.e. `.`):

​	默认情况下，`npm view` 显示当前项目上下文的数据（通过查找 `package.json`）。要显示当前项目的字段数据，可以使用文件路径（即 `.`）：



```bash
npm view . dependencies
```

You can view child fields by separating them with a period. To view the git repository URL for the latest version of `npm`, you would run the following command:

​	您可以通过用句点分隔来查看子字段。要查看最新版本的 `npm` 的 Git 仓库 URL，可以运行以下命令：



```bash
npm view npm repository.url
```

This makes it easy to view information about a dependency with a bit of shell scripting. For example, to view all the data about the version of `opts` that `ronn` depends on, you could write the following:

​	这使得通过一些 Shell 脚本轻松查看依赖项的信息。例如，要查看 `ronn` 依赖的 `opts` 版本的所有数据，可以编写如下命令：



```bash
npm view opts@$(npm view ronn dependencies.opts)
```

For fields that are arrays, requesting a non-numeric field will return all of the values from the objects in the list. For example, to get all the contributor email addresses for the `express` package, you would run:

​	对于数组类型的字段，请求一个非数字字段将返回列表中对象的所有值。例如，要获取 `express` 包的所有贡献者电子邮件地址，可以运行：



```bash
npm view express contributors.email
```

You may also use numeric indices in square braces to specifically select an item in an array field. To just get the email address of the first contributor in the list, you can run:

​	您还可以在方括号中使用数字索引来特定选择数组字段中的项。要仅获取列表中第一位贡献者的电子邮件地址，可以运行：



```bash
npm view express contributors[0].email
```

If the field value you are querying for is a property of an object, you should run:

​	如果您查询的字段值是对象的属性，您应运行：



```bash
npm view express time'[4.8.0]'
```

Multiple fields may be specified, and will be printed one after another. For example, to get all the contributor names and email addresses, you can do this:

​	可以指定多个字段，结果将一个接一个地打印。例如，要获取所有贡献者的姓名和电子邮件地址，可以这样做：



```bash
npm view express contributors.name contributors.email
```

"Person" fields are shown as a string if they would be shown as an object. So, for example, this will show the list of `npm` contributors in the shortened string format. (See [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) for more on this.)

​	如果“人员”字段将作为对象显示，则将显示为字符串。因此，例如，这将以缩略字符串格式显示 `npm` 贡献者的列表。（有关更多信息，请参见 [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)）



```bash
npm view npm contributors
```

If a version range is provided, then data will be printed for every matching version of the package. This will show which version of `jsdom` was required by each matching version of `yui3`:

​	如果提供了版本范围，则将为包的每个匹配版本打印数据。这将显示每个匹配版本的 `yui3` 所需的 `jsdom` 的版本：



```bash
npm view yui3@'>0.5.4' dependencies.jsdom
```

To show the `connect` package version history, you can do this:

​	要显示 `connect` 包的版本历史，可以执行以下操作：



```bash
npm view connect versions
```

## 配置 Configuration

### `json`

- Default: false
- Type: Boolean

Whether or not to output JSON data, rather than the normal output.

​	是否输出 JSON 数据，而不是正常输出。

- In `npm pkg set` it enables parsing set values with JSON.parse() before saving them to your `package.json`.
- 在 `npm pkg set` 中，它启用在将值保存到 `package.json` 之前使用 JSON.parse() 解析设置值。

Not supported by all npm commands.

​	并非所有 npm 命令都支持此选项。

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以多次设置）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	在当前项目的配置工作区上下文中运行命令，同时仅过滤此配置选项定义的工作区。

Valid values for the `workspace` config are either:

`workspace` 配置的有效值可以是：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在 `npm init` 命令中设置时，可以将其设置为尚不存在的工作区文件夹，以在项目中创建该文件夹并将其设置为一个全新的工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true 以在 **所有** 配置工作区的上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	明确将其设置为 false 将导致像 `install` 这样的命令完全忽略工作区。当未明确设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 在 `node_modules` 树上操作的命令（install、update 等）将把工作区链接到 `node_modules` 文件夹中。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作的命令（test、exec、publish 等）将作用于根项目，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	当工作区为命令启用时，包含工作区根目录。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当为 false 时，通过 `workspace` 配置指定单个工作区，或通过 `workspaces` 标志指定所有工作区，将使 npm 仅在指定的工作区上操作，而不在根项目上操作。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

## 输出 Output

If only a single string field for a single version is output, then it will not be colorized or quoted, to enable piping the output to another command. If the field is an object, it will be output as a JavaScript object literal.

​	如果只输出单个版本的单个字符串字段，则不会进行着色或引用，以便将输出通过管道传递给其他命令。如果字段是对象，则将以 JavaScript 对象文字的形式输出。

If the `--json` flag is given, the outputted fields will be JSON.

​	如果提供了 `--json` 标志，则输出的字段将为 JSON。

If the version range matches multiple versions then each printed value will be prefixed with the version it applies to.

​	如果版本范围匹配多个版本，则每个打印值将以适用的版本作为前缀。

If multiple fields are requested, then each of them is prefixed with the field name.

​	如果请求多个字段，则每个字段的名称将作为前缀。

## See Also

- [package spec](https://docs.npmjs.com/cli/v10/using-npm/package-spec)
- [npm search](https://docs.npmjs.com/cli/v10/commands/npm-search)
- [npm registry](https://docs.npmjs.com/cli/v10/using-npm/registry)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm docs](https://docs.npmjs.com/cli/v10/commands/npm-docs)