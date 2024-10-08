+++
title = "package.json"
date = 2024-10-06T17:13:24+08:00
weight = 50
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

> 原文：[https://docs.npmjs.com/cli/v10/configuring-npm/package-json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)

Specifics of npm's package.json handling

​	npm 的 `package.json` 处理细节

Version 10.9.0 (Latest)

## Description

This document is all you need to know about what's required in your package.json file. It must be actual JSON, not just a JavaScript object literal.

​	本文件包含了有关 `package.json` 文件中必要内容的所有信息。`package.json` 文件必须是实际的 JSON 格式，而不仅仅是 JavaScript 对象字面量。

A lot of the behavior described in this document is affected by the config settings described in [`config`](https://docs.npmjs.com/cli/v10/using-npm/config).

​	本文档中描述的许多行为都会受到 [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) 中配置设置的影响。

## name

If you plan to publish your package, the *most* important things in your package.json are the name and version fields as they will be required. The name and version together form an identifier that is assumed to be completely unique. Changes to the package should come along with changes to the version. If you don't plan to publish your package, the name and version fields are optional.

​	如果你计划发布你的包，那么 `package.json` 中最重要的字段是 `name` 和 `version`，因为它们是必填项。名称和版本共同构成了一个假定完全唯一的标识符。对于包的更改应该伴随版本的更改。如果你不打算发布你的包，`name` 和 `version` 字段是可选的。

The name is what your thing is called.

​	`name` 是指你的包的名称。

Some rules:

​	一些规则如下：

- The name must be less than or equal to 214 characters. This includes the scope for scoped packages.
- `name` 长度必须小于等于 214 个字符。对于作用域包（scoped packages），这包括作用域部分。
- The names of scoped packages can begin with a dot or an underscore. This is not permitted without a scope.
- 作用域包的名称可以以点或下划线开头。对于非作用域包，这是不允许的。
- New packages must not have uppercase letters in the name.
- 新包的名称中不能包含大写字母。
- The name ends up being part of a URL, an argument on the command line, and a folder name. Therefore, the name can't contain any non-URL-safe characters.
- `name` 会成为 URL 的一部分、命令行中的参数和文件夹名称。因此，名称不能包含任何非 URL 安全字符。

Some tips:

​	一些提示：

- Don't use the same name as a core Node module.
- 不要使用与 Node 核心模块相同的名称。
- Don't put "js" or "node" in the name. It's assumed that it's js, since you're writing a package.json file, and you can specify the engine using the "[engines](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines)" field. (See below.)
- 不要在名称中包含 "js" 或 "node"。因为你正在编写 `package.json` 文件，已经默认它是 JS 文件了。你可以使用 "[engines](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines)" 字段指定 Node.js 版本（见下文）。
- The name will probably be passed as an argument to require(), so it should be something short, but also reasonably descriptive.
- `name` 可能会作为 `require()` 的参数，因此它应该简短且具有描述性。
- You may want to check the npm registry to see if there's something by that name already, before you get too attached to it. https://www.npmjs.com/
- 在命名前可以先检查 npm 注册表，看看是否已经有同名包：https://www.npmjs.com/

A name can be optionally prefixed by a scope, e.g. `@myorg/mypackage`. See [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope) for more detail.

​	`name` 可以选择性地使用作用域前缀，例如 `@myorg/mypackage`。更多详情见 [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope)。

## version

If you plan to publish your package, the *most* important things in your package.json are the name and version fields as they will be required. The name and version together form an identifier that is assumed to be completely unique. Changes to the package should come along with changes to the version. If you don't plan to publish your package, the name and version fields are optional.

​	如果你计划发布你的包，那么 `package.json` 中最重要的字段是 `name` 和 `version`，因为它们是必填项。名称和版本共同构成了一个假定完全唯一的标识符。对于包的更改应该伴随版本的更改。如果你不打算发布你的包，`name` 和 `version` 字段是可选的。

Version must be parseable by [node-semver](https://github.com/npm/node-semver), which is bundled with npm as a dependency. (`npm install semver` to use it yourself.)

​	版本必须能够被 [node-semver](https://github.com/npm/node-semver) 解析，`node-semver` 是 npm 的依赖之一。（可以自行安装 `npm install semver` 使用它）。

## description

Put a description in it. It's a string. This helps people discover your package, as it's listed in `npm search`.

​	在 `description` 中填写描述内容。它是一个字符串。这有助于人们在 `npm search` 中发现你的包。

## keywords

Put keywords in it. It's an array of strings. This helps people discover your package as it's listed in `npm search`.

​	在 `keywords` 中填写关键字。它是一个字符串数组。这有助于人们在 `npm search` 中发现你的包。

## homepage

The URL to the project homepage.

​	填写项目主页的 URL。

Example:

​	示例：

```json
"homepage": "https://github.com/owner/project#readme"
```

## bugs

The URL to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package.

​	填写项目的 issue 跟踪 URL 和/或应报告问题的电子邮件地址。对于遇到问题的用户来说，这些信息非常有帮助。

It should look like this:

​	它应如下所示：

```json
{
  "bugs": {
    "url": "https://github.com/owner/project/issues",
    "email": "project@hostname.com"
  }
}
```

You can specify either one or both values. If you want to provide only a URL, you can specify the value for "bugs" as a simple string instead of an object.

​	你可以只填写 URL 或者只填写 email，或者同时填写这两项。如果只提供一个 URL，可以将 `bugs` 的值设置为简单字符串，而不是对象。

If a URL is provided, it will be used by the `npm bugs` command.

​	如果提供了 URL，则 `npm bugs` 命令会使用它。

## license

You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it.

​	你应当在 `license` 字段中指定包的许可协议，这样用户就知道如何使用它，并了解你所设置的限制。

If you're using a common license such as BSD-2-Clause or MIT, add a current SPDX license identifier for the license you're using, like this:

​	如果你使用常见的许可协议，例如 BSD-2-Clause 或 MIT，请使用当前的 SPDX 许可标识符，像这样：

```json
{
  "license": "BSD-3-Clause"
}
```

You can check [the full list of SPDX license IDs](https://spdx.org/licenses/). Ideally you should pick one that is [OSI](https://opensource.org/licenses/) approved.

​	你可以查看 [SPDX 许可标识符的完整列表](https://spdx.org/licenses/)。理想情况下，你应选择一个 [OSI](https://opensource.org/licenses/) 批准的许可协议。

If your package is licensed under multiple common licenses, use an [SPDX license expression syntax version 2.0 string](https://spdx.dev/specifications/), like this:

​	如果你的包使用多种常见许可协议，请使用 [SPDX 许可表达式语法 2.0](https://spdx.dev/specifications/)，像这样：

```json
{
  "license": "(ISC OR GPL-3.0)"
}
```

If you are using a license that hasn't been assigned an SPDX identifier, or if you are using a custom license, use a string value like this one:

​	如果你使用未分配 SPDX 标识符的许可协议，或使用自定义许可协议，可以使用如下格式的字符串：

```json
{
  "license": "SEE LICENSE IN <filename>"
}
```

Then include a file named `<filename>` at the top level of the package.

​	然后在包的顶层目录中包含一个名为 `<filename>` 的文件。

Some old packages used license objects or a "licenses" property containing an array of license objects:

​	一些旧的包使用了 `license` 对象或 `licenses` 属性来包含许可对象数组：

```json
// Not valid metadata{  "license" : {    "type" : "ISC",    "url" : "https://opensource.org/licenses/ISC"  }}
// Not valid metadata{  "licenses" : [    {      "type": "MIT",      "url": "https://www.opensource.org/licenses/mit-license.php"    },    {      "type": "Apache-2.0",      "url": "https://opensource.org/licenses/apache2.0.php"    }  ]}
```

Those styles are now deprecated. Instead, use SPDX expressions, like this:

​	这些风格现已被弃用。请改用 SPDX 表达式，如下：

```json
{
  "license": "ISC"
}
```



```json
{
  "license": "(MIT OR Apache-2.0)"
}
```

Finally, if you do not wish to grant others the right to use a private or unpublished package under any terms:

​	最后，如果你不希望他人在任何条款下使用某个私有或未发布的包：

```json
{
  "license": "UNLICENSED"
}
```

Consider also setting `"private": true` to prevent accidental publication.

​	你还可以考虑设置 `"private": true`，以防止意外发布。

## people fields: author, contributors

The "author" is one person. "contributors" is an array of people. A "person" is an object with a "name" field and optionally "url" and "email", like this:

​	`author` 字段表示一个人。`contributors` 字段是表示多人的数组。一个“人”是包含 `name` 字段的对象，可选地包括 `url` 和 `email`，如下所示：

```json
{
  "name": "Barney Rubble",
  "email": "b@rubble.com",
  "url": "http://barnyrubble.tumblr.com/"
}
```

Or you can shorten that all into a single string, and npm will parse it for you:

​	或者，你可以将它简化为单个字符串，npm 会为你解析它：

```json
{
  "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
}
```

Both email and url are optional either way.

​	不管哪种方式，`email` 和 `url` 都是可选的。

npm also sets a top-level "maintainers" field with your npm user info.

​	npm 还会设置一个顶级字段 `"maintainers"`，其中包含你的 npm 用户信息。

## funding

You can specify an object containing a URL that provides up-to-date information about ways to help fund development of your package, a string URL, or an array of objects and string URLs:

​	你可以指定一个包含 URL 的对象，该 URL 提供了有关如何帮助资助开发包的最新信息，或者直接使用字符串 URL，或者对象和字符串 URL 的数组：

```json
{
  "funding": {
    "type": "individual",
    "url": "http://example.com/donate"
  }
}
```



```json
{
  "funding": {
    "type": "patreon",
    "url": "https://www.patreon.com/my-account"
  }
}
```



```json
{
  "funding": "http://example.com/donate"
}
```



```json
{
  "funding": [
    {
      "type": "individual",
      "url": "http://example.com/donate"
    },
    "http://example.com/donateAlso",
    {
      "type": "patreon",
      "url": "https://www.patreon.com/my-account"
    }
  ]
}
```

Users can use the `npm fund` subcommand to list the `funding` URLs of all dependencies of their project, direct and indirect. A shortcut to visit each funding URL is also available when providing the project name such as: `npm fund <projectname>` (when there are multiple URLs, the first one will be visited)

​	用户可以使用 `npm fund` 子命令列出项目直接和间接依赖项的 `funding` URL。提供项目名称时，还可以使用快捷方式访问每个资金 URL，例如：`npm fund <projectname>`（当有多个 URL 时，将访问第一个 URL）。

## files

The optional `files` field is an array of file patterns that describes the entries to be included when your package is installed as a dependency. File patterns follow a similar syntax to `.gitignore`, but reversed: including a file, directory, or glob pattern (`*`, `**/*`, and such) will make it so that file is included in the tarball when it's packed. Omitting the field will make it default to `["*"]`, which means it will include all files.

​	可选的 `files` 字段是描述包作为依赖项安装时要包含的文件条目的文件模式数组。文件模式的语法类似于 `.gitignore`，但方向相反：包括文件、目录或通配符模式（`*`、`**/*` 等）将使该文件包含在打包的 tarball 中。如果省略该字段，将默认为 `["*"]`，即将包含所有文件。

Some special files and directories are also included or excluded regardless of whether they exist in the `files` array (see below).

​	某些特殊文件和目录即使存在于 `files` 数组中，也会被包含或排除（见下文）。

You can also provide a `.npmignore` file in the root of your package or in subdirectories, which will keep files from being included. At the root of your package it will not override the "files" field, but in subdirectories it will. The `.npmignore` file works just like a `.gitignore`. If there is a `.gitignore` file, and `.npmignore` is missing, `.gitignore`'s contents will be used instead.

​	你还可以在包根目录或子目录中提供 `.npmignore` 文件，以防止文件被包含。在包的根目录中，它不会覆盖 `files` 字段，但在子目录中会。`.npmignore` 文件的工作方式与 `.gitignore` 类似。如果存在 `.gitignore` 文件，而 `.npmignore` 缺失，则会使用 `.gitignore` 的内容。

Certain files are always included, regardless of settings:

​	某些文件总是会被包含在内，无论设置如何：

- `package.json`

- `README`
- `LICENSE` / `LICENCE`
- The file in the "main" field `main` 字段中指定的文件
- The file(s) in the "bin" field `bin` 字段中指定的文件

`README` & `LICENSE` can have any case and extension.

​	`README` 和 `LICENSE` 文件可以使用任何大小写和扩展名。

Some files are always ignored by default:

​	某些文件默认总是被忽略：

- `*.orig`
- `.*.swp`
- `.DS_Store`
- `._*`
- `.git`
- `.hg`
- `.lock-wscript`
- `.npmrc`
- `.svn`
- `.wafpickle-N`
- `CVS`
- `config.gypi`
- `node_modules`
- `npm-debug.log`
- `package-lock.json` (use [`npm-shrinkwrap.json`](https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json) if you wish it to be published) （如果希望发布它，请使用 [`npm-shrinkwrap.json`](https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json)）
- `pnpm-lock.yaml`
- `yarn.lock`

Most of these ignored files can be included specifically if included in the `files` globs. Exceptions to this are:

​	这些被忽略的文件大多数情况下可以通过在 `files` 字段的通配符中显式包含来被包括进去。例外情况如下：

- `.git`

- `.npmrc`
- `node_modules`
- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`

These can not be included.

​	这些文件不能被包含。

## exports

The "exports" provides a modern alternative to "main" allowing multiple entry points to be defined, conditional entry resolution support between environments, and preventing any other entry points besides those defined in "exports". This encapsulation allows module authors to clearly define the public interface for their package. For more details see the [node.js documentation on package entry points](https://nodejs.org/api/packages.html#package-entry-points)

​	`exports` 提供了 `main` 字段的现代替代方案，可以定义多个入口点，支持在不同环境间进行条件入口解析，并且仅允许访问 `exports` 中定义的入口点。此封装允许模块作者清楚地定义其包的公共接口。更多详情请参阅 [Node.js 关于包入口点的文档](https://nodejs.org/api/packages.html#package-entry-points)。

## main

The main field is a module ID that is the primary entry point to your program. That is, if your package is named `foo`, and a user installs it, and then does `require("foo")`, then your main module's exports object will be returned.

​	`main` 字段是模块 ID，它是程序的主入口点。也就是说，如果你的包名为 `foo`，用户安装它之后使用 `require("foo")`，那么你的 `main` 模块的 `exports` 对象将被返回。

This should be a module relative to the root of your package folder.

​	此字段应该是相对于包根目录的模块路径。

For most modules, it makes the most sense to have a main script and often not much else.

​	对于大多数模块来说，通常有一个主脚本，其他文件内容很少。

If `main` is not set, it defaults to `index.js` in the package's root folder.

​	如果没有设置 `main` 字段，默认为包根目录下的 `index.js` 文件。

## browser

If your module is meant to be used client-side the browser field should be used instead of the main field. This is helpful to hint users that it might rely on primitives that aren't available in Node.js modules. (e.g. `window`)

​	如果你的模块是用于客户端环境的，则应使用 `browser` 字段代替 `main` 字段。这可以提示用户该模块可能依赖于在 Node.js 模块中不可用的对象（例如 `window`）。

## bin

A lot of packages have one or more executable files that they'd like to install into the PATH. npm makes this pretty easy (in fact, it uses this feature to install the "npm" executable.)

​	许多包有一个或多个可执行文件希望安装到 `PATH` 中。npm 提供了简单的方法来实现这一点（实际上，它使用这个功能来安装 `npm` 可执行文件）。

To use this, supply a `bin` field in your package.json which is a map of command name to local file name. When this package is installed globally, that file will be either linked inside the global bins directory or a cmd (Windows Command File) will be created which executes the specified file in the `bin` field, so it is available to run by `name` or `name.cmd` (on Windows PowerShell). When this package is installed as a dependency in another package, the file will be linked where it will be available to that package either directly by `npm exec` or by name in other scripts when invoking them via `npm run-script`.

​	为此，可以在 `package.json` 中提供 `bin` 字段，它是命令名称到本地文件名的映射。当该包被全局安装时，该文件要么会被链接到全局 `bin` 目录中，要么在 Windows 上会创建一个 cmd 文件，该 cmd 文件会执行 `bin` 字段中指定的文件，因此可以通过 `name` 或 `name.cmd`（在 Windows PowerShell 中）来运行它。当该包作为另一个包的依赖项安装时，该文件将被链接到该包中，使其可以通过 `npm exec` 或其他脚本中的 `npm run-script` 调用来使用。

For example, myapp could have this:

​	例如，`myapp` 的配置如下：

```json
{
  "bin": {
    "myapp": "bin/cli.js"
  }
}
```

So, when you install myapp, in case of unix-like OS it'll create a symlink from the `cli.js` script to `/usr/local/bin/myapp` and in case of windows it will create a cmd file usually at `C:\Users\{Username}\AppData\Roaming\npm\myapp.cmd` which runs the `cli.js` script.

​	因此，在 Unix 类系统中，当安装 `myapp` 时，会创建从 `cli.js` 脚本到 `/usr/local/bin/myapp` 的符号链接；而在 Windows 系统中，通常会在 `C:\Users\{用户名}\AppData\Roaming\npm\myapp.cmd` 中创建一个 cmd 文件，该文件运行 `cli.js` 脚本。

If you have a single executable, and its name should be the name of the package, then you can just supply it as a string. For example:

​	如果只有一个可执行文件，并且它的名称应该与包名称相同，那么可以仅将其作为字符串提供。例如：

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": "path/to/program"
}
```

would be the same as this:

​	这相当于：

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": {
    "my-program": "path/to/program"
  }
}
```

Please make sure that your file(s) referenced in `bin` starts with `#!/usr/bin/env node`, otherwise the scripts are started without the node executable!

​	请确保 `bin` 字段中引用的文件以 `#!/usr/bin/env node` 开头，否则脚本将不会使用 `node` 可执行文件启动！

Note that you can also set the executable files using [directories.bin](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#directoriesbin).

​	请注意，你也可以使用 [directories.bin](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#directoriesbin) 设置可执行文件。

See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders#executables) for more info on executables.

​	更多关于可执行文件的信息，请参阅 [文件夹](https://docs.npmjs.com/cli/v10/configuring-npm/folders#executables)。

## man

Specify either a single file or an array of filenames to put in place for the `man` program to find.

​	可以指定一个文件或一个文件名数组，以便 `man` 程序查找到这些文件。

If only a single file is provided, then it's installed such that it is the result from `man <pkgname>`, regardless of its actual filename. For example:

​	如果只提供了一个文件，则无论实际文件名是什么，它都会作为 `man <pkgname>` 命令的结果。例如：

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": "./man/doc.1"
}
```

would link the `./man/doc.1` file in such that it is the target for `man foo`

将会将 `./man/doc.1` 文件链接为 `man foo` 命令的目标。

If the filename doesn't start with the package name, then it's prefixed. So, this:

​	如果文件名不以包名开头，则会被添加前缀。例如：

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": ["./man/foo.1", "./man/bar.1"]
}
```

will create files to do `man foo` and `man foo-bar`.

将创建用于 `man foo` 和 `man foo-bar` 的文件。

Man files must end with a number, and optionally a `.gz` suffix if they are compressed. The number dictates which man section the file is installed into.

​	man 文件必须以数字结尾，如果它们是压缩文件，可以选择性地加上 `.gz` 后缀。数字决定了文件被安装到哪个 man 区段。

```json
{
  "name": "foo",
  "version": "1.2.3",
  "description": "A packaged foo fooer for fooing foos",
  "main": "foo.js",
  "man": ["./man/foo.1", "./man/foo.2"]
}
```

will create entries for `man foo` and `man 2 foo`

将创建 `man foo` 和 `man 2 foo` 的条目。

## directories

The CommonJS [Packages](http://wiki.commonjs.org/wiki/Packages/1.0) spec details a few ways that you can indicate the structure of your package using a `directories` object. If you look at [npm's package.json](https://registry.npmjs.org/npm/latest), you'll see that it has directories for doc, lib, and man.

​	CommonJS [Packages](http://wiki.commonjs.org/wiki/Packages/1.0) 规范详细介绍了如何使用 `directories` 对象指示包的结构。如果查看 [npm 的 package.json](https://registry.npmjs.org/npm/latest)，你会看到它包含 `doc`、`lib` 和 `man` 目录。

In the future, this information may be used in other creative ways.

​	将来，这些信息可能会用于其他创新用途。

### directories.bin

If you specify a `bin` directory in `directories.bin`, all the files in that folder will be added.

​	如果在 `directories.bin` 中指定了 `bin` 目录，该文件夹中的所有文件都会被添加。

Because of the way the `bin` directive works, specifying both a `bin` path and setting `directories.bin` is an error. If you want to specify individual files, use `bin`, and for all the files in an existing `bin` directory, use `directories.bin`.

​	由于 `bin` 指令的工作方式，同时指定 `bin` 路径和 `directories.bin` 是错误的。如果要指定单个文件，请使用 `bin`；如果要包括 `bin` 目录中的所有文件，请使用 `directories.bin`。

### directories.man

A folder that is full of man pages. Sugar to generate a "man" array by walking the folder.

​	包含满是 man 页面的文件夹。通过遍历文件夹生成 `man` 数组。

## repository

Specify the place where your code lives. This is helpful for people who want to contribute. If the git repo is on GitHub, then the `npm repo` command will be able to find you.

​	指定代码所在的位置。这对于希望贡献代码的人来说很有帮助。如果 git 仓库位于 GitHub 上，`npm repo` 命令将能够找到你。

Do it like this:

​	配置如下：

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/npm/cli.git"
  }
}
```

The URL should be a publicly available (perhaps read-only) URL that can be handed directly to a VCS program without any modification. It should not be a URL to an html project page that you put in your browser. It's for computers.

​	该 URL 应该是可公开访问（可能是只读）的 URL，可以直接提供给 VCS 程序，而无需任何修改。它不应该是指向 HTML 项目页面的 URL（浏览器中访问的那种），而是供计算机使用的 URL。

For GitHub, GitHub gist, Bitbucket, or GitLab repositories you can use the same shortcut syntax you use for `npm install`:

​	对于 GitHub、GitHub gist、Bitbucket 或 GitLab 仓库，你可以使用与 `npm install` 相同的简写语法：

```json
{  "repository": "npm/npm",
  "repository": "github:user/repo",
  "repository": "gist:11081aaa281",
  "repository": "bitbucket:user/repo",
  "repository": "gitlab:user/repo"}
```

If the `package.json` for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives:

​	如果你的 `package.json` 不在根目录中（例如它是 monorepo 的一部分），你可以指定它所在的目录：

```json
{
  "repository": {
    "type": "git",
    "url": "git+https://github.com/npm/cli.git",
    "directory": "workspaces/libnpmpublish"
  }
}
```

## scripts

The "scripts" property is a dictionary containing script commands that are run at various times in the lifecycle of your package. The key is the lifecycle event, and the value is the command to run at that point.

​	`scripts` 属性是一个包含在包生命周期中各个时刻运行的脚本命令的字典。键是生命周期事件，值是该时刻运行的命令。

See [`scripts`](https://docs.npmjs.com/cli/v10/using-npm/scripts) to find out more about writing package scripts.

​	请参阅 [`scripts`](https://docs.npmjs.com/cli/v10/using-npm/scripts) 以了解有关编写包脚本的更多信息。

## config

A "config" object can be used to set configuration parameters used in package scripts that persist across upgrades. For instance, if a package had the following:

​	“config” 对象可用于设置包脚本中使用的配置参数，并且这些参数在升级时会持久化保存。例如，如果某个包具有以下配置：

```json
{
  "name": "foo",
  "config": {
    "port": "8080"
  }
}
```

It could also have a "start" command that referenced the `npm_package_config_port` environment variable.

​	它还可以有一个“start”命令，该命令引用 `npm_package_config_port` 环境变量。

## dependencies

Dependencies are specified in a simple object that maps a package name to a version range. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or git URL.

​	依赖项是一个简单的对象，它将包名映射到一个版本范围。版本范围是一个字符串，可以包含一个或多个用空格分隔的描述符。依赖项还可以使用 tarball（压缩包）或 git URL 进行指定。

**Please do not put test harnesses or transpilers or other "development" time tools in your `dependencies` object.** See `devDependencies`, below.

​	**请不要在 `dependencies` 对象中放置测试工具、代码转换工具或其他“开发”时使用的工具。** 请参阅下文中的 `devDependencies`。

See [semver](https://github.com/npm/node-semver#versions) for more details about specifying version ranges.

​	有关指定版本范围的更多详细信息，请参阅 [semver](https://github.com/npm/node-semver#versions)。

- `version` Must match `version` exactly
- `version` 必须与 `version` 完全匹配

- `>version` Must be greater than `version`
- `>version` 必须大于 `version`
- `>=version` etc
- `<version`
- `<=version`
- `~version` "Approximately equivalent to version" See [semver](https://github.com/npm/node-semver#versions)
- `~version` “大约等于 version” 参阅 [semver](https://github.com/npm/node-semver#versions)
- `^version` "Compatible with version" See [semver](https://github.com/npm/node-semver#versions)
- `^version` “与 version 兼容” 参阅 [semver](https://github.com/npm/node-semver#versions)
- `1.2.x` 1.2.0, 1.2.1, etc., but not 1.3.0
- `1.2.x` 1.2.0、1.2.1 等等，但不包括 1.3.0
- `http://...` See 'URLs as Dependencies' below
- `http://...` 请参阅下面的“URL 作为依赖项”
- `*` Matches any version
- `*` 匹配任意版本
- `""` (just an empty string) Same as `*`
- `""` （仅为空字符串）同 `*`
- `version1 - version2` Same as `>=version1 <=version2`.
- `version1 - version2` 等同于 `>=version1 <=version2`
- `range1 || range2` Passes if either range1 or range2 are satisfied.
- `range1 || range2` 如果 range1 或 range2 中的任意一个满足则通过
- `git...` See 'Git URLs as Dependencies' below
- `git...` 请参阅下面的“Git URL 作为依赖项”
- `user/repo` See 'GitHub URLs' below
- `user/repo` 请参阅下面的“GitHub URL”
- `tag` A specific version tagged and published as `tag` See [`npm dist-tag`](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)
- `tag` 作为特定的版本标签发布的 `tag` 参阅 [`npm dist-tag`](https://docs.npmjs.com/cli/v10/commands/npm-dist-tag)
- `path/path/path` See [Local Paths](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#local-paths) below
- `path/path/path` 请参阅下面的 [本地路径](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#local-paths)
- `npm:@scope/pkg@version` Custom alias for a pacakge See [`package-spec`](https://docs.npmjs.com/cli/v10/using-npm/package-spec#aliases)
- `npm:@scope/pkg@version` 自定义别名用于指定包 参阅 [`package-spec`](https://docs.npmjs.com/cli/v10/using-npm/package-spec#aliases)

For example, these are all valid:

​	例如，以下这些都是有效的依赖项：

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl",
    "kpg": "npm:pkg@1.0.0"
  }
}
```

### URL 作为依赖项 URLs as Dependencies

You may specify a tarball URL in place of a version range.

​	你可以用 tarball URL 替代版本范围。

This tarball will be downloaded and installed locally to your package at install time.

​	这个 tarball 文件将在安装时被下载并本地安装到你的包中。

### Git URL 作为依赖项 Git URLs as Dependencies

Git URLs are of the form:

​	Git URL 的格式如下：

```bash
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
```

`<protocol>` is one of `git`, `git+ssh`, `git+http`, `git+https`, or `git+file`.

​	`<protocol>` 可以是 `git`、`git+ssh`、`git+http`、`git+https` 或 `git+file`。

​	`<protocol>` 可以是 `git`、`git+ssh`、`git+http`、`git+https` 或 `git+file`。f `#<commit-ish>` is provided, it will be used to clone exactly that commit. If the commit-ish has the format `#semver:<semver>`, `<semver>` can be any valid semver range or exact version, and npm will look for any tags or refs matching that range in the remote repository, much as it would for a registry dependency. If neither `#<commit-ish>` or `#semver:<semver>` is specified, then the default branch is used.

​	如果提供了 `#<commit-ish>`，它将用于克隆该特定提交。如果 `commit-ish` 格式为 `#semver:<semver>`，则 `<semver>` 可以是任意有效的 semver 范围或确切版本，npm 会在远程仓库中查找与该范围匹配的标签或引用，就像注册表依赖项一样。如果既未指定 `#<commit-ish>`，也未指定 `#semver:<semver>`，则使用默认分支。

​	Examples:

​	示例：

```bash
git+ssh://git@github.com:npm/cli.git#v1.0.27
git+ssh://git@github.com:npm/cli#semver:^5.0
git+https://isaacs@github.com/npm/cli.git
git://github.com/npm/cli.git#v1.0.27
```

When installing from a `git` repository, the presence of certain fields in the `package.json` will cause npm to believe it needs to perform a build. To do so your repository will be cloned into a temporary directory, all of its deps installed, relevant scripts run, and the resulting directory packed and installed.

​	从 `git` 仓库安装时，如果 `package.json` 中存在某些字段，会导致 npm 认为需要执行构建。此时，你的仓库会被克隆到一个临时目录中，所有依赖项将被安装，相关脚本会运行，最终结果目录会被打包并安装。

This flow will occur if your git dependency uses `workspaces`, or if any of the following scripts are present:

​	如果你的 git 依赖项使用了 `workspaces`，或者存在以下任一脚本时，会触发该流程：

- `build`

- `prepare`
- `prepack`
- `preinstall`
- `install`
- `postinstall`

If your git repository includes pre-built artifacts, you will likely want to make sure that none of the above scripts are defined, or your dependency will be rebuilt for every installation.

​	如果你的 git 仓库中包含预构建的工件，请确保上述脚本均未定义，否则每次安装时都将重新构建依赖项。

### GitHub URLs

As of version 1.1.65, you can refer to GitHub URLs as just "foo": "user/foo-project". Just as with git URLs, a `commit-ish` suffix can be included. For example:

​	从版本 1.1.65 开始，你可以将 GitHub URL 写作 `user/foo-project`。与 Git URL 一样，也可以包含 `commit-ish` 后缀。例如：

```json
{
  "name": "foo",
  "version": "0.0.0",
  "dependencies": {
    "express": "expressjs/express",
    "mocha": "mochajs/mocha#4727d357ea",
    "module": "user/repo#feature/branch"
  }
}
```

### 本地路径 Local Paths

As of version 2.0.0 you can provide a path to a local directory that contains a package. Local paths can be saved using `npm install -S` or `npm install --save`, using any of these forms:

​	从版本 2.0.0 开始，你可以提供指向包含包文件的本地目录路径。可以使用 `npm install -S` 或 `npm install --save` 命令将本地路径保存到任意以下形式：

```bash
../foo/bar
~/foo/bar
./foo/bar
/foo/bar
```

in which case they will be normalized to a relative path and added to your `package.json`. For example:

这些路径将被规范化为相对路径并添加到 `package.json` 中。例如：

```json
{
  "name": "baz",
  "dependencies": {
    "bar": "file:../foo/bar"
  }
}
```

This feature is helpful for local offline development and creating tests that require npm installing where you don't want to hit an external server, but should not be used when publishing your package to the public registry.

​	此功能有助于本地离线开发和创建需要 npm 安装的测试，而无需连接外部服务器，但不应在将包发布到公共注册表时使用。

*note*: Packages linked by local path will not have their own dependencies installed when `npm install` is ran in this case. You must run `npm install` from inside the local path itself.

​	*注意*：在这种情况下，通过本地路径链接的包在运行 `npm install` 时不会安装它们自己的依赖项。你必须在本地路径内部运行 `npm install`。

## devDependencies

If someone is planning on downloading and using your module in their program, then they probably don't want or need to download and build the external test or documentation framework that you use.

​	如果有人计划下载并在他们的程序中使用你的模块，那么他们可能不希望或不需要下载和构建你所使用的外部测试框架或文档框架。

In this case, it's best to map these additional items in a `devDependencies` object.

​	在这种情况下，最好将这些额外的项目映射到 `devDependencies` 对象中。

These things will be installed when doing `npm link` or `npm install` from the root of a package, and can be managed like any other npm configuration param. See [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) for more on the topic.

​	当从包的根目录运行 `npm link` 或 `npm install` 时，这些项目将会被安装，并且可以像管理任何其他 npm 配置参数一样进行管理。请参阅 [config](https://docs.npmjs.com/cli/v10/using-npm/config) 了解更多信息。

For build steps that are not platform-specific, such as compiling CoffeeScript or other languages to JavaScript, use the `prepare` script to do this, and make the required package a devDependency.

​	对于不特定于平台的构建步骤（例如将 CoffeeScript 或其他语言编译为 JavaScript），使用 `prepare` 脚本来完成，并将所需的包设置为 devDependency。

For example:

​	例如：

```json
{
  "name": "ethopia-waza",
  "description": "a delightfully fruity coffee varietal",
  "version": "1.2.3",
  "devDependencies": {
    "coffee-script": "~1.6.3"
  },
  "scripts": {
    "prepare": "coffee -o lib/ -c src/waza.coffee"
  },
  "main": "lib/waza.js"
}
```

The `prepare` script will be run before publishing, so that users can consume the functionality without requiring them to compile it themselves. In dev mode (ie, locally running `npm install`), it'll run this script as well, so that you can test it easily.

​	`prepare` 脚本将在发布前运行，因此用户可以使用该功能，而无需自己编译。在开发模式（即本地运行 `npm install`）下，它也会运行此脚本，以便你可以轻松测试。

## peerDependencies

In some cases, you want to express the compatibility of your package with a host tool or library, while not necessarily doing a `require` of this host. This is usually referred to as a *plugin*. Notably, your module may be exposing a specific interface, expected and specified by the host documentation.

​	在某些情况下，你希望表达你的包与主工具或库的兼容性，但不一定需要 `require` 该主库。这通常被称为*插件*。值得注意的是，你的模块可能正在暴露一个特定的接口，该接口由主库文档指定。

For example:

​	例如：

```json
{
  "name": "tea-latte",
  "version": "1.3.5",
  "peerDependencies": {
    "tea": "2.x"
  }
}
```

This ensures your package `tea-latte` can be installed *along* with the second major version of the host package `tea` only. `npm install tea-latte` could possibly yield the following dependency graph:

​	这可以确保你的包 `tea-latte` 只能与 `tea` 主包的第二个大版本一起安装。`npm install tea-latte` 可能会生成如下依赖图：

```bash
├── tea-latte@1.3.5
└── tea@2.2.0
```

In npm versions 3 through 6, `peerDependencies` were not automatically installed, and would raise a warning if an invalid version of the peer dependency was found in the tree. As of npm v7, peerDependencies *are* installed by default.

​	在 npm 3 到 6 版本中，`peerDependencies` 不会被自动安装，并且如果树中发现无效版本的对等依赖项，会显示警告。自 npm v7 起，对等依赖项默认会被安装。

Trying to install another plugin with a conflicting requirement may cause an error if the tree cannot be resolved correctly. For this reason, make sure your plugin requirement is as broad as possible, and not to lock it down to specific patch versions.

​	如果尝试安装另一个具有冲突要求的插件，并且无法正确解析依赖树，则可能会导致错误。因此，请确保插件的依赖要求尽可能宽泛，而不是锁定到特定的小版本号。

Assuming the host complies with [semver](https://semver.org/), only changes in the host package's major version will break your plugin. Thus, if you've worked with every 1.x version of the host package, use `"^1.0"` or `"1.x"` to express this. If you depend on features introduced in 1.5.2, use `"^1.5.2"`.

​	假设主包遵循 [语义化版本](https://semver.org/)（semver），则主包的主版本号变化才会破坏你的插件。如果你兼容主包的所有 1.x 版本，请使用 `"^1.0"` 或 `"1.x"` 来表达这一点。如果你依赖主包在 1.5.2 引入的功能，请使用 `"^1.5.2"`。

## peerDependenciesMeta

The `peerDependenciesMeta` field serves to provide npm more information on how your peer dependencies are to be used. Specifically, it allows peer dependencies to be marked as optional. Npm will not automatically install optional peer dependencies. This allows you to integrate and interact with a variety of host packages without requiring all of them to be installed.

​	`peerDependenciesMeta` 字段用于向 npm 提供更多关于如何使用对等依赖项的信息。具体来说，它允许将对等依赖项标记为可选。Npm 不会自动安装可选的对等依赖项。这使你可以与多个主包集成并交互，而无需安装所有主包。

For example:

​	例如：

```json
{
  "name": "tea-latte",
  "version": "1.3.5",
  "peerDependencies": {
    "tea": "2.x",
    "soy-milk": "1.2"
  },
  "peerDependenciesMeta": {
    "soy-milk": {
      "optional": true
    }
  }
}
```

## bundleDependencies

This defines an array of package names that will be bundled when publishing the package.

​	此字段定义了一个包名称数组，当发布该包时，这些包将被捆绑在一起。

In cases where you need to preserve npm packages locally or have them available through a single file download, you can bundle the packages in a tarball file by specifying the package names in the `bundleDependencies` array and executing `npm pack`.

​	在需要本地保存 npm 包或通过单个文件下载包的情况下，可以在 `bundleDependencies` 数组中指定要捆绑的包名称，并执行 `npm pack` 来将这些包捆绑到一个 tarball 文件中。

For example:

​	例如：

If we define a package.json like this:

​	如果我们定义如下的 package.json：

```json
{
  "name": "awesome-web-framework",
  "version": "1.0.0",
  "bundleDependencies": ["renderized", "super-streams"]
}
```

we can obtain `awesome-web-framework-1.0.0.tgz` file by running `npm pack`. This file contains the dependencies `renderized` and `super-streams` which can be installed in a new project by executing `npm install awesome-web-framework-1.0.0.tgz`. Note that the package names do not include any versions, as that information is specified in `dependencies`.

​	执行 `npm pack` 命令可以生成 `awesome-web-framework-1.0.0.tgz` 文件。该文件包含了 `renderized` 和 `super-streams` 依赖，可以通过执行 `npm install awesome-web-framework-1.0.0.tgz` 在新项目中安装这些依赖。注意，这些包名中不包含任何版本号，因为版本信息在 `dependencies` 中指定。

If this is spelled `"bundledDependencies"`, then that is also honored.

​	如果使用 `"bundledDependencies"` 拼写，它也同样会生效。

Alternatively, `"bundleDependencies"` can be defined as a boolean value. A value of `true` will bundle all dependencies, a value of `false` will bundle none.

​	另外，`"bundleDependencies"` 可以定义为布尔值。值为 `true` 时表示捆绑所有依赖项，值为 `false` 时表示不捆绑任何依赖项。

## optionalDependencies

If a dependency can be used, but you would like npm to proceed if it cannot be found or fails to install, then you may put it in the `optionalDependencies` object. This is a map of package name to version or URL, just like the `dependencies` object. The difference is that build failures do not cause installation to fail. Running `npm install --omit=optional` will prevent these dependencies from being installed.

​	如果某个依赖项是可选的，并且在未找到或安装失败时仍希望 npm 继续执行，则可以将其放在 `optionalDependencies` 对象中。与 `dependencies` 对象类似，该对象是包名称到版本或 URL 的映射。不同的是，构建失败不会导致安装失败。执行 `npm install --omit=optional` 会阻止这些依赖项的安装。

It is still your program's responsibility to handle the lack of the dependency. For example, something like this:

​	程序仍然需要处理缺少依赖项的情况。例如，可以使用如下代码：

```js
try {  var foo = require("foo");  var fooVersion = require("foo/package.json").version;} catch (er) {  foo = null;}if (notGoodFooVersion(fooVersion)) {  foo = null;}
// .. then later in your program ..
if (foo) {  foo.doFooThings();}
```

Entries in `optionalDependencies` will override entries of the same name in `dependencies`, so it's usually best to only put in one place.

​	`optionalDependencies` 中的条目会覆盖 `dependencies` 中相同名称的条目，因此通常最好只在一个地方定义它们。

## overrides

If you need to make specific changes to dependencies of your dependencies, for example replacing the version of a dependency with a known security issue, replacing an existing dependency with a fork, or making sure that the same version of a package is used everywhere, then you may add an override.

​	如果需要对依赖项的依赖项进行特定更改，例如用一个没有安全问题的版本替换依赖项的版本、用一个分支替换现有依赖项或确保在整个项目中使用相同版本的包，则可以使用覆盖项（override）。

Overrides provide a way to replace a package in your dependency tree with another version, or another package entirely. These changes can be scoped as specific or as vague as desired.

​	覆盖项提供了一种将依赖树中的某个包替换为另一个版本或完全替换为另一个包的方法。这些更改可以根据需要指定得非常具体或非常模糊。

Overrides are only considered in the root `package.json` file for a project. Overrides in installed dependencies (including [workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)) are not considered in dependency tree resolution. Published packages may dictate their resolutions by pinning dependencies or using an [`npm-shrinkwrap.json`](https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json) file.

​	覆盖项仅在项目根目录的 `package.json` 文件中生效。已安装依赖项（包括 [workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)）中的覆盖项不会在依赖树解析时被考虑。已发布的包可以通过固定依赖项或使用 [`npm-shrinkwrap.json`](https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json) 文件来规定其解析规则。

To make sure the package `foo` is always installed as version `1.0.0` no matter what version your dependencies rely on:

​	为了确保无论依赖项依赖的是哪个版本，都始终安装 `foo` 的版本 `1.0.0`：

```json
{
  "overrides": {
    "foo": "1.0.0"
  }
}
```

The above is a short hand notation, the full object form can be used to allow overriding a package itself as well as a child of the package. This will cause `foo` to always be `1.0.0` while also making `bar` at any depth beyond `foo` also `1.0.0`:

​	上面的语法是一种简写形式，完整的对象形式可以用于允许覆盖包本身以及包的子项。这将导致 `foo` 始终为 `1.0.0`，同时使 `bar`（位于 `foo` 之后的任何深度）也为 `1.0.0`：

```json
{
  "overrides": {
    "foo": {
      ".": "1.0.0",
      "bar": "1.0.0"
    }
  }
}
```

To only override `foo` to be `1.0.0` when it's a child (or grandchild, or great grandchild, etc) of the package `bar`:

​	若仅在 `foo` 是 `bar` 的子包（或孙子包，或更深层次的子包）时，将其覆盖为 `1.0.0`：

```json
{
  "overrides": {
    "bar": {
      "foo": "1.0.0"
    }
  }
}
```

Keys can be nested to any arbitrary length. To override `foo` only when it's a child of `bar` and only when `bar` is a child of `baz`:

​	可以任意嵌套键的长度。例如，当 `foo` 是 `bar` 的子项且 `bar` 是 `baz` 的子项时，才覆盖 `foo`：

```json
{
  "overrides": {
    "baz": {
      "bar": {
        "foo": "1.0.0"
      }
    }
  }
}
```

The key of an override can also include a version, or range of versions. To override `foo` to `1.0.0`, but only when it's a child of `bar@2.0.0`:

​	覆盖项的键也可以包含版本或版本范围。例如，仅当 `foo` 是 `bar@2.0.0` 的子项时，才将其覆盖为 `1.0.0`：

```json
{
  "overrides": {
    "bar@2.0.0": {
      "foo": "1.0.0"
    }
  }
}
```

You may not set an override for a package that you directly depend on unless both the dependency and the override itself share the exact same spec. To make this limitation easier to deal with, overrides may also be defined as a reference to a spec for a direct dependency by prefixing the name of the package you wish the version to match with a `$`.

​	你不能为直接依赖项设置覆盖项，除非依赖项和覆盖项本身的规范完全相同。为了更容易处理这种限制，覆盖项也可以定义为对直接依赖项规范的引用，只需在你希望版本匹配的包名称前加上 `$`。

```json
{
  "dependencies": {
    "foo": "^1.0.0"
  },
  "overrides": {
    // BAD, will throw an EOVERRIDE error
    // "foo": "^2.0.0"
    // GOOD, specs match so override is allowed
    // "foo": "^1.0.0"
    // BEST, the override is defined as a reference to the dependency
    "foo": "$foo",
    // the referenced package does not need to match the overridden one
    "bar": "$foo"
  }
}
```

## engines

You can specify the version of node that your stuff works on:

​	你可以指定你的程序在某个 Node.js 版本上运行：

```json
{
  "engines": {
    "node": ">=0.10.3 <15"
  }
}
```

And, like with dependencies, if you don't specify the version (or if you specify "*" as the version), then any version of node will do.

​	与依赖项类似，如果未指定版本（或指定版本为 `"*"`），则任何 Node.js 版本都可以运行。

You can also use the "engines" field to specify which versions of npm are capable of properly installing your program. For example:

​	你还可以使用 `engines` 字段指定 npm 的哪些版本可以正确安装你的程序。例如：

```json
{
  "engines": {
    "npm": "~1.0.20"
  }
}
```

Unless the user has set the [`engine-strict` config](https://docs.npmjs.com/cli/v10/using-npm/config#engine-strict) flag, this field is advisory only and will only produce warnings when your package is installed as a dependency.

​	除非用户已设置 [`engine-strict` 配置](https://docs.npmjs.com/cli/v10/using-npm/config#engine-strict)标志，否则该字段仅作提示作用，当包作为依赖项被安装时，只会产生警告。

## os

You can specify which operating systems your module will run on:

​	你可以指定模块可以在哪些操作系统上运行：

```json
{
  "os": ["darwin", "linux"]
}
```

You can also block instead of allowing operating systems, just prepend the blocked os with a '!':

​	你也可以阻止某些操作系统，只需在要阻止的操作系统前添加 `!`：

```json
{
  "os": ["!win32"]
}
```

The host operating system is determined by `process.platform`

​	主机操作系统通过 `process.platform` 来确定。

It is allowed to both block and allow an item, although there isn't any good reason to do this.

​	允许同时阻止和允许某项，但这样做并无太大意义。

## cpu

If your code only runs on certain cpu architectures, you can specify which ones.

​	如果你的代码仅能在某些 CPU 架构上运行，你可以指定这些架构：

```json
{
  "cpu": ["x64", "ia32"]
}
```

Like the `os` option, you can also block architectures:

​	与 `os` 选项类似，你也可以阻止某些架构：

```json
{
  "cpu": ["!arm", "!mips"]
}
```

The host architecture is determined by `process.arch`

​	主机的架构通过 `process.arch` 确定。

## devEngines

The `devEngines` field aids engineers working on a codebase to all be using the same tooling.

​	`devEngines` 字段可以帮助工程师在开发相同代码库时使用相同的工具。

You can specify a `devEngines` property in your `package.json` which will run before `install`, `ci`, and `run` commands.

​	你可以在 `package.json` 中指定一个 `devEngines` 属性，它将在 `install`、`ci` 和 `run` 命令之前执行。

> Note: `engines` and `devEngines` differ in object shape. They also function very differently. `engines` is designed to alert the user when a dependency uses a differening npm or node version that the project it's being used in, whereas `devEngines` is used to alert people interacting with the source code of a project.
>
> ​	注意：`engines` 和 `devEngines` 的对象结构不同，功能也不同。`engines` 旨在当依赖项使用的 npm 或 node 版本与项目不同步时提醒用户，而 `devEngines` 用于提醒与项目源码交互的人员。

The supported keys under the `devEngines` property are `cpu`, `os`, `libc`, `runtime`, and `packageManager`. Each property can be an object or an array of objects. Objects must contain `name`, and optionally can specify `version`, and `onFail`. `onFail` can be `warn`, `error`, or `ignore`, and if left undefined is of the same value as `error`. `npm` will assume that you're running with `node`. Here's an example of a project that will fail if the environment is not `node` and `npm`. If you set `runtime.name` or `packageManager.name` to any other string, it will fail within the npm CLI.

​	`devEngines` 属性下支持的键包括 `cpu`、`os`、`libc`、`runtime` 和 `packageManager`。每个属性可以是一个对象或对象数组。对象必须包含 `name`，还可以选择性地指定 `version` 和 `onFail`。`onFail` 可以是 `warn`、`error` 或 `ignore`。如果未定义，则默认为 `error`。npm 将假定你正在使用 `node`。以下是一个示例，如果环境不是 `node` 和 `npm`，则项目将失败。 如果将 `runtime.name` 或 `packageManager.name` 设置为其他字符串，npm CLI 将会失败。

```json
{
  "devEngines": {
    "runtime": {
      "name": "node",
      "onFail": "error"
    },
    "packageManager": {
      "name": "npm",
      "onFail": "error"
    }
  }
}
```

## private

If you set `"private": true` in your package.json, then npm will refuse to publish it.

​	如果在 `package.json` 中设置 `"private": true`，npm 将拒绝发布它。

This is a way to prevent accidental publication of private repositories. If you would like to ensure that a given package is only ever published to a specific registry (for example, an internal registry), then use the `publishConfig` dictionary described below to override the `registry` config param at publish-time.

​	这是防止意外发布私有存储库的方式。如果你希望某个包仅发布到特定的注册表（例如内部注册表），可以使用下文描述的 `publishConfig` 字典来覆盖发布时的 `registry` 配置参数。

## publishConfig

This is a set of config values that will be used at publish-time. It's especially handy if you want to set the tag, registry or access, so that you can ensure that a given package is not tagged with "latest", published to the global public registry or that a scoped module is private by default.

​	这是一个配置值的集合，将在发布时使用。如果你想设置 tag、registry 或 access 属性，这非常方便，这样可以确保某个包不会标记为 “latest”、不会发布到全局公共注册表，或者确保作用域模块默认是私有的。

See [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) to see the list of config options that can be overridden.

​	请参阅 [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) 以查看可覆盖的配置选项列表。

## workspaces

The optional `workspaces` field is an array of file patterns that describes locations within the local file system that the install client should look up to find each [workspace](https://docs.npmjs.com/cli/v10/using-npm/workspaces) that needs to be symlinked to the top level `node_modules` folder.

​	可选的 `workspaces` 字段是一个文件模式数组，用于描述本地文件系统中安装客户端应查找的每个 [workspace](https://docs.npmjs.com/cli/v10/using-npm/workspaces) 的位置，并将其符号链接到顶层的 `node_modules` 文件夹中。

It can describe either the direct paths of the folders to be used as workspaces or it can define globs that will resolve to these same folders.

​	它可以描述作为工作区的文件夹的直接路径，也可以定义能解析到这些文件夹的模式。

In the following example, all folders located inside the folder `./packages` will be treated as workspaces as long as they have valid `package.json` files inside them:

​	在以下示例中，只要位于 `./packages` 文件夹内的所有文件夹中包含有效的 `package.json` 文件，它们都会被视为工作区：

```json
{
  "name": "workspace-example",
  "workspaces": ["./packages/*"]
}
```

See [`workspaces`](https://docs.npmjs.com/cli/v10/using-npm/workspaces) for more examples.

​	有关更多示例，请参阅 [`workspaces`](https://docs.npmjs.com/cli/v10/using-npm/workspaces)。

## DEFAULT VALUES

npm will default some values based on package contents.

​	npm 会根据包内容默认一些值。

- `"scripts": {"start": "node server.js"}`

  If there is a `server.js` file in the root of your package, then npm will default the `start` command to `node server.js`.

  如果包的根目录中有一个 `server.js` 文件，那么 npm 会将 `start` 命令默认设置为 `node server.js`。

- `"scripts":{"install": "node-gyp rebuild"}`

  If there is a `binding.gyp` file in the root of your package and you have not defined an `install` or `preinstall` script, npm will default the `install` command to compile using node-gyp.

  如果包的根目录中有一个 `binding.gyp` 文件，并且未定义 `install` 或 `preinstall` 脚本，npm 会默认使用 node-gyp 进行编译。

- `"contributors": [...]`

  If there is an `AUTHORS` file in the root of your package, npm will treat each line as a `Name <email> (url)` format, where email and url are optional. Lines which start with a `#` or are blank, will be ignored.

  如果包的根目录中有一个 `AUTHORS` 文件，npm 会将文件中的每一行视为 `Name <email> (url)` 格式，其中 email 和 url 是可选的。以 `#` 开头的行或空行将被忽略。

## SEE ALSO

- [semver](https://github.com/npm/node-semver#versions)
- [workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [npm init](https://docs.npmjs.com/cli/v10/commands/npm-init)
- [npm version](https://docs.npmjs.com/cli/v10/commands/npm-version)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npm help](https://docs.npmjs.com/cli/v10/commands/npm-help)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm publish](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [npm uninstall](https://docs.npmjs.com/cli/v10/commands/npm-uninstall)