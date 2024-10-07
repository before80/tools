+++
title = "folders"
date = 2024-10-06T17:12:22+08:00
weight = 20
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/configuring-npm/folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)

Folder Structures Used by npm

​	npm 使用的文件夹结构

Version 10.9.0 (Latest)

## Description

npm puts various things on your computer. That's its job.

​	npm 会在你的计算机上放置各种文件。这就是它的工作。

This document will tell you what it puts where.

​	本文档将向你介绍它在各个位置放置了哪些文件。

### tl;dr

- Local install (default): puts stuff in `./node_modules` of the current package root.
- 本地安装（默认）：将文件放置在当前包根目录的 `./node_modules` 文件夹中。
- Global install (with `-g`): puts stuff in /usr/local or wherever node is installed.
- 全局安装（使用 `-g` 选项）：将文件放置在 `/usr/local` 或 Node.js 安装的位置。
- Install it **locally** if you're going to `require()` it.
- 如果你要在代码中 `require()` 某个包，请**本地**安装它。
- Install it **globally** if you're going to run it on the command line.
- 如果你要在命令行中运行某个包，请**全局**安装它。
- If you need both, then install it in both places, or use `npm link`.
- 如果两种场景都需要，请在两个位置都安装，或者使用 `npm link`。

### prefix 配置 prefix Configuration

The [`prefix` config](https://docs.npmjs.com/cli/v10/using-npm/config#prefix) defaults to the location where node is installed. On most systems, this is `/usr/local`. On Windows, it's `%AppData%\npm`. On Unix systems, it's one level up, since node is typically installed at `{prefix}/bin/node` rather than `{prefix}/node.exe`.

​	[`prefix` 配置](https://docs.npmjs.com/cli/v10/using-npm/config#prefix) 的默认值是 Node.js 安装的位置。对于大多数系统来说，这个位置是 `/usr/local`。在 Windows 系统中，它位于 `%AppData%\npm`。在 Unix 系统中，它通常位于上一级目录，因为 Node.js 通常安装在 `{prefix}/bin/node` 目录下，而不是 `{prefix}/node.exe`。

When the `global` flag is set, npm installs things into this prefix. When it is not set, it uses the root of the current package, or the current working directory if not in a package already.

​	当设置 `global` 标志时，npm 会将文件安装到该 `prefix` 路径下。如果未设置 `global` 标志，则会使用当前包的根目录，或者如果当前目录不在某个包中，则使用当前工作目录。

### Node 模块 Node Modules

Packages are dropped into the `node_modules` folder under the `prefix`. When installing locally, this means that you can `require("packagename")` to load its main module, or `require("packagename/lib/path/to/sub/module")` to load other modules.

包会被放置在 `prefix` 目录下的 `node_modules` 文件夹中。本地安装时，你可以使用 `require("packagename")` 来加载它的主模块，或者使用 `require("packagename/lib/path/to/sub/module")` 来加载子模块。

Global installs on Unix systems go to `{prefix}/lib/node_modules`. Global installs on Windows go to `{prefix}/node_modules` (that is, no `lib` folder.)

​	全局安装在 Unix 系统中会放置到 `{prefix}/lib/node_modules`。在 Windows 系统中，全局安装会放置到 `{prefix}/node_modules`（没有 `lib` 文件夹）。

Scoped packages are installed the same way, except they are grouped together in a sub-folder of the relevant `node_modules` folder with the name of that scope prefix by the @ symbol, e.g. `npm install @myorg/package` would place the package in `{prefix}/node_modules/@myorg/package`. See [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope) for more details.

​	作用域包（Scoped packages）与普通包的安装方式相同，只是它们会被放置在对应 `node_modules` 文件夹下的一个子文件夹中，该文件夹的名称由作用域名称前缀（@符号）标识，例如 `npm install @myorg/package` 会将该包放置在 `{prefix}/node_modules/@myorg/package` 中。有关更多详情，请参阅 [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope)。

If you wish to `require()` a package, then install it locally.

​	如果你希望使用 `require()` 来引入一个包，请在本地安装它。

### 可执行文件 Executables

When in global mode, executables are linked into `{prefix}/bin` on Unix, or directly into `{prefix}` on Windows. Ensure that path is in your terminal's `PATH` environment to run them.

​	在全局模式下，可执行文件会被链接到 Unix 系统的 `{prefix}/bin` 目录中，或直接链接到 Windows 系统的 `{prefix}` 目录中。请确保将该路径添加到终端的 `PATH` 环境变量中，以便可以运行这些可执行文件。

When in local mode, executables are linked into `./node_modules/.bin` so that they can be made available to scripts run through npm. (For example, so that a test runner will be in the path when you run `npm test`.)

​	在本地模式下，可执行文件会被链接到 `./node_modules/.bin` 目录中，以便 npm 运行的脚本可以使用它们。（例如，运行 `npm test` 时，测试执行器可以在路径中找到这些可执行文件。）

### 手册页 Man Pages

When in global mode, man pages are linked into `{prefix}/share/man`.

​	在全局模式下，手册页会被链接到 `{prefix}/share/man`。

When in local mode, man pages are not installed.

​	在本地模式下，手册页不会被安装。

Man pages are not installed on Windows systems.

​	在 Windows 系统中，手册页不会被安装。

### 缓存 Cache

See [`npm cache`](https://docs.npmjs.com/cli/v10/commands/npm-cache). Cache files are stored in `~/.npm` on Posix, or `%LocalAppData%/npm-cache` on Windows.

​	请参阅 [`npm cache`](https://docs.npmjs.com/cli/v10/commands/npm-cache)。缓存文件存储在 Posix 系统的 `~/.npm` 中，或 Windows 系统的 `%LocalAppData%/npm-cache` 中。

This is controlled by the [`cache` config](https://docs.npmjs.com/cli/v10/using-npm/config#cache) param.

​	这由 [`cache` 配置](https://docs.npmjs.com/cli/v10/using-npm/config#cache) 参数控制。

### 临时文件 Temp Files

Temporary files are stored by default in the folder specified by the [`tmp` config](https://docs.npmjs.com/cli/v10/using-npm/config#tmp), which defaults to the TMPDIR, TMP, or TEMP environment variables, or `/tmp` on Unix and `c:\windows\temp` on Windows.

​	临时文件默认存储在 [`tmp` 配置](https://docs.npmjs.com/cli/v10/using-npm/config#tmp) 指定的文件夹中，该配置默认为 TMPDIR、TMP 或 TEMP 环境变量，或 Unix 系统中的 `/tmp` 和 Windows 系统中的 `c:\windows\temp`。

Temp files are given a unique folder under this root for each run of the program, and are deleted upon successful exit.

​	临时文件在每次程序运行时都会创建一个唯一的文件夹，并在成功退出时删除。

## 更多信息 More Information

When installing locally, npm first tries to find an appropriate `prefix` folder. This is so that `npm install foo@1.2.3` will install to the sensible root of your package, even if you happen to have `cd`ed into some other folder.

​	在进行本地安装时，npm 会首先尝试查找一个合适的 `prefix` 文件夹。这是为了确保即使你在某个其他文件夹中 `cd` 了，也能将 `npm install foo@1.2.3` 安装到你项目中合适的根目录下。

Starting at the $PWD, npm will walk up the folder tree checking for a folder that contains either a `package.json` file, or a `node_modules` folder. If such a thing is found, then that is treated as the effective "current directory" for the purpose of running npm commands. (This behavior is inspired by and similar to git's .git-folder seeking logic when running git commands in a working dir.)

​	npm 会从当前目录（$PWD）开始，沿着文件夹树向上查找，寻找包含 `package.json` 文件或 `node_modules` 文件夹的文件夹。如果找到这样的文件夹，则将其视为运行 npm 命令时的有效“当前目录”。（此行为受 Git 的 .git 文件夹查找逻辑启发，并与其在工作目录中运行 Git 命令时的行为类似。）

If no package root is found, then the current folder is used.

​	如果未找到包的根目录，则使用当前文件夹。

When you run `npm install foo@1.2.3`, then the package is loaded into the cache, and then unpacked into `./node_modules/foo`. Then, any of foo's dependencies are similarly unpacked into `./node_modules/foo/node_modules/...`.

​	当你运行 `npm install foo@1.2.3` 时，该包会先被加载到缓存中，然后解压到 `./node_modules/foo` 文件夹中。接着，foo 的依赖项也会依次解压到 `./node_modules/foo/node_modules/...` 中。

Any bin files are symlinked to `./node_modules/.bin/`, so that they may be found by npm scripts when necessary.

​	任何二进制文件（bin files）会被链接到 `./node_modules/.bin/` 中，以便在需要时被 npm 脚本找到。

### 全局安装 Global Installation

If the [`global` config](https://docs.npmjs.com/cli/v10/using-npm/config#global) is set to true, then npm will install packages "globally".

​	如果 [`global` 配置](https://docs.npmjs.com/cli/v10/using-npm/config#global) 被设置为 true，则 npm 会全局安装包。

For global installation, packages are installed roughly the same way, but using the folders described above.

​	对于全局安装，包的安装方式大致相同，但使用上文提到的全局文件夹。

### 循环、冲突和文件夹优化 Cycles, Conflicts, and Folder Parsimony

Cycles are handled using the property of node's module system that it walks up the directories looking for `node_modules` folders. So, at every stage, if a package is already installed in an ancestor `node_modules` folder, then it is not installed at the current location.

​	npm 利用 Node.js 模块系统的特性来处理循环依赖，即它会沿着目录查找 `node_modules` 文件夹。因此，在每个阶段，如果某个包已经安装在上级 `node_modules` 文件夹中，则不会在当前目录再次安装该包。

Consider the case above, where `foo -> bar -> baz`. Imagine if, in addition to that, baz depended on bar, so you'd have: `foo -> bar -> baz -> bar -> baz ...`. However, since the folder structure is: `foo/node_modules/bar/node_modules/baz`, there's no need to put another copy of bar into `.../baz/node_modules`, since when baz calls `require("bar")`, it will get the copy that is installed in `foo/node_modules/bar`.

​	例如，考虑以下情形：`foo -> bar -> baz`。如果 baz 也依赖于 bar，则会出现以下依赖关系：`foo -> bar -> baz -> bar -> baz ...`。然而，由于文件夹结构是：`foo/node_modules/bar/node_modules/baz`，因此没有必要在 `.../baz/node_modules` 中再放置一个 bar 的副本，因为当 baz 调用 `require("bar")` 时，它会获取 `foo/node_modules/bar` 中安装的版本。

This shortcut is only used if the exact same version would be installed in multiple nested `node_modules` folders. It is still possible to have `a/node_modules/b/node_modules/a` if the two "a" packages are different versions. However, without repeating the exact same package multiple times, an infinite regress will always be prevented.

​	此优化仅在多个嵌套的 `node_modules` 文件夹中要安装相同版本时生效。如果两个 "a" 包是不同版本，则依然可能出现 `a/node_modules/b/node_modules/a` 结构。但是，无论如何，永远不会出现无限递归。

Another optimization can be made by installing dependencies at the highest level possible, below the localized "target" folder (hoisting). Since version 3, npm hoists dependencies by default.

​	另一种优化是将依赖项安装在尽可能高的目录层级，而不是局限于某个本地的“目标”文件夹下（称为提升，hoisting）。从 npm 3 版本开始，npm 默认会将依赖项提升。

### 示例 Example

Consider this dependency graph:

​	考虑以下依赖关系图：

```bash
foo
+-- blerg@1.2.5
+-- bar@1.2.3
|   +-- blerg@1.x (latest=1.3.7)
|   +-- baz@2.x
|   |   `-- quux@3.x
|   |       `-- bar@1.2.3 (cycle)
|   `-- asdf@*
`-- baz@1.2.3
    `-- quux@3.x
        `-- bar
```

In this case, we might expect a folder structure like this (with all dependencies hoisted to the highest level possible):

​	在这种情况下，我们可以期望如下文件夹结构（所有依赖项尽可能提升到最高层级）：

```bash
foo
+-- node_modules
    +-- blerg (1.2.5) <---[A]
    +-- bar (1.2.3) <---[B]
    |   +-- node_modules
    |       +-- baz (2.0.2) <---[C]
    +-- asdf (2.3.4)
    +-- baz (1.2.3) <---[D]
    +-- quux (3.2.0) <---[E]
```

Since foo depends directly on `bar@1.2.3` and `baz@1.2.3`, those are installed in foo's `node_modules` folder.

​	因为 foo 直接依赖于 `bar@1.2.3` 和 `baz@1.2.3`，所以它们被安装在 foo 的 `node_modules` 文件夹中。

Even though the latest copy of blerg is 1.3.7, foo has a specific dependency on version 1.2.5. So, that gets installed at [A]. Since the parent installation of blerg satisfies bar's dependency on `blerg@1.x`, it does not install another copy under [B].

​	即使 blerg 的最新版本是 1.3.7，foo 明确依赖于 1.2.5 版本。因此，它被安装在 [A] 处。由于父级安装的 blerg 满足了 bar 对 `blerg@1.x` 的依赖，因此不会在 [B] 处安装另一个副本。

Bar [B] also has dependencies on baz and asdf. Because it depends on `baz@2.x`, it cannot re-use the `baz@1.2.3` installed in the parent `node_modules` folder [D], and must install its own copy [C]. In order to minimize duplication, npm hoists dependencies to the top level by default, so asdf is installed under [A].

​	Bar [B] 也依赖于 baz 和 asdf。因为它依赖于 `baz@2.x`，所以无法重用父级 `node_modules` 文件夹中安装的 `baz@1.2.

Underneath bar, the `baz -> quux -> bar` dependency creates a cycle. However, because bar is already in quux's ancestry [B], it does not unpack another copy of bar into that folder. Likewise, quux's [E] folder tree is empty, because its dependency on bar is satisfied by the parent folder copy installed at [B].

​	在 bar 下面，`baz -> quux -> bar` 依赖关系创建了一个循环。然而，由于 bar 已经在 quux 的上层目录树中存在 [B]，所以不会在该文件夹中解压另一个 bar 的副本。同样，quux [E] 的文件夹树是空的，因为其对 bar 的依赖由上层文件夹中的 [B] 处安装的版本满足。

For a graphical breakdown of what is installed where, use `npm ls`.

​	要查看详细的文件夹结构，可以使用 `npm ls`。

### 发布 Publishing

Upon publishing, npm will look in the `node_modules` folder. If any of the items there are not in the `bundleDependencies` array, then they will not be included in the package tarball.

​	发布时，npm 会检查 `node_modules` 文件夹。如果其中的任何项目不在 `bundleDependencies` 数组中，则它们不会包含在包的压缩文件（tarball）中。

This allows a package maintainer to install all of their dependencies (and dev dependencies) locally, but only re-publish those items that cannot be found elsewhere. See [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) for more information.

​	这允许包维护者在本地安装所有的依赖项（包括开发依赖），但仅重新发布无法在其他地方找到的依赖项。有关更多信息，请参阅 [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)。

## See also

- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm pack](https://docs.npmjs.com/cli/v10/commands/npm-pack)
- [npm cache](https://docs.npmjs.com/cli/v10/commands/npm-cache)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [config](https://docs.npmjs.com/cli/v10/using-npm/config)
- [npm publish](https://docs.npmjs.com/cli/v10/commands/npm-publish)