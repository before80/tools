+++
title = "npm outdated"
date = 2024-10-06T15:43:52+08:00
weight = 340
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-outdated](https://docs.npmjs.com/cli/v10/commands/npm-outdated)

Check for outdated packages

​	检查过时的包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm outdated [<package-spec> ...]
```

## Description

This command will check the registry to see if any (or, specific) installed packages are currently outdated.

​	此命令将检查注册表，查看任何（或特定）已安装的包是否当前已过时。

By default, only the direct dependencies of the root project and direct dependencies of your configured *workspaces* are shown. Use `--all` to find all outdated meta-dependencies as well.

​	默认情况下，仅显示根项目的直接依赖项和您配置的 *工作区* 的直接依赖项。使用 `--all` 选项可查找所有过时的元依赖项。

In the output:

​	在输出中：

- `wanted` is the maximum version of the package that satisfies the semver range specified in `package.json`. If there's no available semver range (i.e. you're running `npm outdated --global`, or the package isn't included in `package.json`), then `wanted` shows the currently-installed version.
- `wanted` 是满足 `package.json` 中指定的 semver 范围的包的最大版本。如果没有可用的 semver 范围（例如，您正在运行 `npm outdated --global`，或者该包未包含在 `package.json` 中），则 `wanted` 显示当前安装的版本。

- `latest` is the version of the package tagged as latest in the registry. Running `npm publish` with no special configuration will publish the package with a dist-tag of `latest`. This may or may not be the maximum version of the package, or the most-recently published version of the package, depending on how the package's developer manages the latest [dist-tag](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag).
- `latest` 是在注册表中标记为最新的包的版本。运行 `npm publish` 时，如果没有特殊配置，将以 `latest` 的 dist-tag 发布该包。根据包的开发者如何管理最新的 [dist-tag](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)，这可能是包的最大版本，也可能是最近发布的版本。
- `location` is where in the physical tree the package is located.
- `location` 是包在物理树中的位置。
- `depended by` shows which package depends on the displayed dependency
- `depended by` 显示哪个包依赖于所显示的依赖项。
- `package type` (when using `--long` / `-l`) tells you whether this package is a `dependency` or a dev/peer/optional dependency. Packages not included in `package.json` are always marked `dependencies`.
- `package type`（当使用 `--long` / `-l` 时）告诉您该包是 `dependency` 还是 dev/peer/optional 依赖项。未包含在 `package.json` 中的包始终标记为 `dependencies`。
- `homepage` (when using `--long` / `-l`) is the `homepage` value contained in the package's packument
- `homepage`（当使用 `--long` / `-l` 时）是包的 packument 中包含的 `homepage` 值。
- Red means there's a newer version matching your semver requirements, so you should update now.
- 红色表示有一个更新的版本与您的 semver 要求匹配，因此您应该立即更新。
- Yellow indicates that there's a newer version *above* your semver requirements (usually new major, or new 0.x minor) so proceed with caution.
- 黄色表示有一个更新的版本 *高于* 您的 semver 要求（通常是新的主版本，或新的 0.x 次版本），因此请谨慎处理。

## 示例 An example



```bash
$ npm outdated
Package      Current   Wanted   Latest  Location                  Depended by
glob          5.0.15   5.0.15    6.0.1  node_modules/glob         dependent-package-name
nothingness    0.0.3      git      git  node_modules/nothingness  dependent-package-name
npm            3.5.1    3.5.2    3.5.1  node_modules/npm          dependent-package-name
local-dev      0.0.3   linked   linked  local-dev                 dependent-package-name
once           1.3.2    1.3.3    1.3.3  node_modules/once         dependent-package-name
```

With these `dependencies`:

​	与这些 `dependencies`：



```json
{
  "glob": "^5.0.15",
  "nothingness": "github:othiym23/nothingness#master",
  "npm": "^3.5.1",
  "once": "^1.3.1"
}
```

A few things to note:

需要注意的几点：

- `glob` requires `^5`, which prevents npm from installing `glob@6`, which is outside the semver range.
- `glob` 需要 `^5`，这阻止了 npm 安装 `glob@6`，因为它超出了 semver 范围。

- Git dependencies will always be reinstalled, because of how they're specified. The installed committish might satisfy the dependency specifier (if it's something immutable, like a commit SHA), or it might not, so `npm outdated` and `npm update` have to fetch Git repos to check. This is why currently doing a reinstall of a Git dependency always forces a new clone and install.
- Git 依赖项将始终被重新安装，因为它们的指定方式。安装的提交可能满足依赖项说明（如果它是不可变的，例如提交 SHA），也可能不满足，因此 `npm outdated` 和 `npm update` 需要获取 Git 仓库进行检查。这就是目前重新安装 Git 依赖项总是强制执行新克隆和安装的原因。
- `npm@3.5.2` is marked as "wanted", but "latest" is `npm@3.5.1` because npm uses dist-tags to manage its `latest` and `next` release channels. `npm update` will install the *newest* version, but `npm install npm` (with no semver range) will install whatever's tagged as `latest`.
- `npm@3.5.2` 被标记为“想要”，但“最新”是 `npm@3.5.1`，因为 npm 使用 dist-tags 管理其 `latest` 和 `next` 发布通道。`npm update` 将安装 *最新* 版本，但 `npm install npm`（没有 semver 范围）将安装标记为 `latest` 的版本。
- `once` is just plain out of date. Reinstalling `node_modules` from scratch or running `npm update` will bring it up to spec.
- `once` 明显过时。重新从头安装 `node_modules` 或运行 `npm update` 将使其符合规范。

## 配置 Configuration

### `all`

- Default: false
- Type: Boolean

When running `npm outdated` and `npm ls`, setting `--all` will show all outdated or installed packages, rather than only those directly depended upon by the current project.

​	在运行 `npm outdated` 和 `npm ls` 时，设置 `--all` 将显示所有过时或已安装的包，而不仅仅是当前项目直接依赖的包。

### `json`

- Default: false
- Type: Boolean

Whether or not to output JSON data, rather than the normal output.

​	是否输出 JSON 数据，而不是正常输出。

- In `npm pkg set` it enables parsing set values with JSON.parse() before saving them to your `package.json`.
- 在 `npm pkg set` 中，它允许在保存到 `package.json` 之前使用 JSON.parse() 解析设置的值。

Not supported by all npm commands.

​	并非所有 npm 命令都支持。

### `long`

- Default: false
- Type: Boolean

Show extended information in `ls`, `search`, and `help-search`.

​	在 `ls`、`search` 和 `help-search` 中显示扩展信息。

### `parseable`

- Default: false
- Type: Boolean

Output parseable results from commands that write to standard output. For `npm search`, this will be tab-separated table format.

​	从写入标准输出的命令中输出可解析的结果。对于 `npm search`，这将是制表符分隔的表格格式。

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

​	在“全局”模式下操作，因此包将安装到 `prefix` 文件夹，而不是当前工作目录。有关行为差异的更多信息，请参见 [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)。

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- 包安装到 `{prefix}/lib/node_modules` 文件夹，而不是当前工作目录。
- bin files are linked to `{prefix}/bin`
- bin 文件链接到 `{prefix}/bin`
- man pages are linked to `{prefix}/share/man`
- man 页面链接到 `{prefix}/share/man`

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以多次设置）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	在当前项目的配置工作区上下文中运行命令，同时仅按此配置选项定义的工作区进行过滤。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值包括：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将选择该文件夹内的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在为 `npm init` 命令设置时，这可以设置为尚不存在的工作区文件夹，以在项目中创建该文件夹并将其设置为全新的工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

## See Also

- [package spec](https://docs.npmjs.com/cli/v10/using-npm/package-spec)
- [npm update](https://docs.npmjs.com/cli/v10/commands/npm-update)
- [npm dist-tag](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)
- [npm registry](https://docs.npmjs.com/cli/v10/using-npm/registry)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)