+++
title = "npm help"
date = 2024-10-06T15:42:19+08:00
weight = 220
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-help](https://docs.npmjs.com/cli/v10/commands/npm-help)

Get help on npm

​	获取 npm 帮助

Version 10.9.0 (Latest)

## Synopsis



```bash
npm help <term> [<terms..>]
alias: hlep
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## Description

If supplied a topic, then show the appropriate documentation page.

​	如果提供了主题，则显示相应的文档页面。

If the topic does not exist, or if multiple terms are provided, then npm will run the `help-search` command to find a match. Note that, if `help-search` finds a single subject, then it will run `help` on that topic, so unique matches are equivalent to specifying a topic name.

​	如果主题不存在，或者提供了多个术语，则 npm 将运行 `help-search` 命令以查找匹配项。请注意，如果 `help-search` 找到单个主题，则它将运行 `help` 命令来显示该主题的帮助，因此唯一的匹配项等同于指定一个主题名称。

## Configuration

### `viewer`

- Default: "man" on Posix, "browser" on Windows
- 默认值：在 Posix 系统上为 "man"，在 Windows 上为 "browser"
- Type: String

The program to use to view help content.

​	用于查看帮助内容的程序。

Set to `"browser"` to view html help content in the default web browser.

​	设置为 `"browser"` 可在默认的网页浏览器中查看 HTML 帮助内容。

## See Also

- [npm](https://docs.npmjs.com/cli/v10/commands/npm)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npm help-search](https://docs.npmjs.com/cli/v10/commands/npm-help-search)