+++
title = "npm search"
date = 2024-10-06T17:57:07+08:00
weight = 500
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-search](https://docs.npmjs.com/cli/v10/commands/npm-search)

Search for packages

​	搜索包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm search <search term> [<search term> ...]
aliases: find, s, se
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## Description

Search the registry for packages matching the search terms. `npm search` performs a linear, incremental, lexically-ordered search through package metadata for all files in the registry. If your terminal has color support, it will further highlight the matches in the results. This can be disabled with the config item `color`

​	在注册表中搜索与搜索词匹配的包。`npm search` 会在注册表中的所有文件的包元数据中进行线性、增量、按字典顺序的搜索。如果您的终端支持颜色，它会进一步高亮显示结果中的匹配项。可以通过配置项 `color` 禁用此功能。

Additionally, using the `--searchopts` and `--searchexclude` options paired with more search terms will include and exclude further patterns. The main difference between `--searchopts` and the standard search terms is that the former does not highlight results in the output and you can use them more fine-grained filtering. Additionally, you can add both of these to your config to change default search filtering behavior.

​	此外，使用 `--searchopts` 和 `--searchexclude` 选项配合更多搜索词，可以包含和排除更多模式。`--searchopts` 与标准搜索词的主要区别在于前者不会在输出中高亮结果，并且您可以使用它们进行更细粒度的过滤。此外，您可以将这两者都添加到配置中，以更改默认的搜索过滤行为。

Search also allows targeting of maintainers in search results, by prefixing their npm username with `=`.

​	搜索还允许在搜索结果中定位维护者，通过在其 npm 用户名之前加上 `=` 前缀。

If a term starts with `/`, then it's interpreted as a regular expression and supports standard JavaScript RegExp syntax. In this case search will ignore a trailing `/` . (Note you must escape or quote many regular expression characters in most shells.)

​	如果一个术语以 `/` 开头，则它被解释为正则表达式，并支持标准 JavaScript RegExp 语法。在这种情况下，搜索将忽略尾随的 `/`。 （注意，您必须在大多数 shell 中转义或引用许多正则表达式字符。）

## 配置 Configuration

### `json`

- Default: false
- Type: Boolean

Whether or not to output JSON data, rather than the normal output.

​	是否输出 JSON 数据，而不是正常输出。

- In `npm pkg set` it enables parsing set values with JSON.parse() before saving them to your `package.json`.
- 在 `npm pkg set` 中，它允许在保存到您的 `package.json` 之前使用 JSON.parse() 解析设置的值。

Not supported by all npm commands.

​	并非所有 npm 命令都支持此功能。

### `color`

- Default: true unless the NO_COLOR environ is set to something other than '0'
- 默认值：true，除非 NO_COLOR 环境变量被设置为非 '0' 的其他值
- Type: "always" or Boolean

If false, never shows colors. If `"always"` then always shows colors. If true, then only prints color codes for tty file descriptors.

​	如果为 false，则永远不显示颜色。如果为 `"always"`，则始终显示颜色。如果为 true，则仅在 tty 文件描述符上打印颜色代码。

### `parseable`

- Default: false
- Type: Boolean

Output parseable results from commands that write to standard output. For `npm search`, this will be tab-separated table format.

​	从写入标准输出的命令中输出可解析的结果。对于 `npm search`，这将是以制表符分隔的表格格式。

### `description`

- Default: true
- Type: Boolean

Show the description in `npm search`

​	在 `npm search` 中显示描述。

### `searchlimit`

- Default: 20
- Type: Number

Number of items to limit search results to. Will not apply at all to legacy searches.

​	限制搜索结果的项数。对于遗留搜索，此限制无效。

### `searchopts`

- Default: ""
- Type: String

Space-separated options that are always passed to search.

​	始终传递给搜索的以空格分隔的选项。

### `searchexclude`

- Default: ""
- Type: String

Space-separated options that limit the results from search.

​	以空格分隔的选项，限制搜索结果。

### `registry`

- Default: "https://registry.npmjs.org/"
- Type: URL

The base URL of the npm registry.

​	npm 注册表的基本 URL。

### `prefer-online`

- Default: false
- Type: Boolean

If true, staleness checks for cached data will be forced, making the CLI look for updates immediately even for fresh package data.

​	如果为 true，将强制检查缓存数据的过时性，使 CLI 立即查找更新，即使是新鲜的包数据。

### `prefer-offline`

- Default: false
- Type: Boolean

If true, staleness checks for cached data will be bypassed, but missing data will be requested from the server. To force full offline mode, use `--offline`.

​	如果为 true，将跳过缓存数据的过时性检查，但缺失的数据将从服务器请求。要强制全离线模式，请使用 `--offline`。

### `offline`

- Default: false
- Type: Boolean

Force offline mode: no network requests will be done during install. To allow the CLI to fill in missing cache data, see `--prefer-offline`.

​	强制离线模式：安装期间将不进行网络请求。要允许 CLI 填充缺失的缓存数据，请参见 `--prefer-offline`。

## See Also

- [npm registry](https://docs.npmjs.com/cli/v10/using-npm/registry)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm view](https://docs.npmjs.com/cli/v10/commands/npm-view)
- [npm cache](https://docs.npmjs.com/cli/v10/commands/npm-cache)
- https://npm.im/npm-registry-fetch