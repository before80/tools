+++
title = "scripts"
date = 2024-10-06T17:21:43+08:00
weight = 60
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/using-npm/scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)

How npm handles the "scripts" field

​	npm 如何处理 `"scripts"` 字段

Version 10.9.0 (Latest)

## Description

The `"scripts"` property of your `package.json` file supports a number of built-in scripts and their preset life cycle events as well as arbitrary scripts. These all can be executed by running `npm run-script <stage>` or `npm run <stage>` for short. *Pre* and *post* commands with matching names will be run for those as well (e.g. `premyscript`, `myscript`, `postmyscript`). Scripts from dependencies can be run with `npm explore <pkg> -- npm run <stage>`.

​	`package.json` 文件中的 `"scripts"` 属性支持多种内置脚本及其预设的生命周期事件，同时也支持自定义脚本。所有这些脚本都可以通过 `npm run-script <stage>` 或简写 `npm run <stage>` 来执行。与这些脚本名称匹配的 `pre` 和 `post` 命令也会被执行（例如 `premyscript`、`myscript`、`postmyscript`）。还可以使用 `npm explore <pkg> -- npm run <stage>` 运行依赖包中的脚本。

## 前置 & 后置脚本 Pre & Post Scripts

To create "pre" or "post" scripts for any scripts defined in the `"scripts"` section of the `package.json`, simply create another script *with a matching name* and add "pre" or "post" to the beginning of them.

​	要为 `package.json` 的 `"scripts"` 字段中定义的任何脚本创建 "pre" 或 "post" 脚本，只需创建一个具有相同名称的脚本，并在它们的开头加上 "pre" 或 "post" 即可。

```json
{
  "scripts": {
    "precompress": "{{ executes BEFORE the `compress` script }}",
    "compress": "{{ run command to compress files }}",
    "postcompress": "{{ executes AFTER `compress` script }}"
  }
}
```

In this example `npm run compress` would execute these scripts as described.

​	在这个例子中，执行 `npm run compress` 将会按顺序执行这些脚本。

## 生命周期脚本 Life Cycle Scripts

There are some special life cycle scripts that happen only in certain situations. These scripts happen in addition to the `pre<event>`, `post<event>`, and `<event>` scripts.

​	某些特殊的生命周期脚本只在特定情况下运行。这些脚本是在 `pre<event>`、`post<event>` 和 `<event>` 脚本之外运行的。

- `prepare`, `prepublish`, `prepublishOnly`, `prepack`, `postpack`, `dependencies`

**prepare** (since `npm@4.0.0`)

- Runs BEFORE the package is packed, i.e. during `npm publish` and `npm pack`
- 在包打包之前运行，即在 `npm publish` 和 `npm pack` 时运行。
- Runs on local `npm install` without any arguments
- 本地执行 `npm install` 时，无需任何参数就会运行。
- Runs AFTER `prepublish`, but BEFORE `prepublishOnly`
- 在 `prepublish` 之后、`prepublishOnly` 之前运行。
- NOTE: If a package being installed through git contains a `prepare` script, its `dependencies` and `devDependencies` will be installed, and the prepare script will be run, before the package is packaged and installed.
- 注意：如果通过 git 安装的包包含 `prepare` 脚本，则在该包被打包并安装之前，npm 会安装其 `dependencies` 和 `devDependencies`，然后运行 `prepare` 脚本。
- As of `npm@7` these scripts run in the background. To see the output, run with: `--foreground-scripts`.
- 自 `npm@7` 开始，这些脚本在后台运行。要查看输出，请使用：`--foreground-scripts`。

**prepublish** (DEPRECATED)

- Does not run during `npm publish`, but does run during `npm ci` and `npm install`. See below for more info.
- 不会在 `npm publish` 时运行，但会在 `npm ci` 和 `npm install` 时运行。更多信息请参见下文。

**prepublishOnly**

- Runs BEFORE the package is prepared and packed, ONLY on `npm publish`.
- 在包被准备和打包之前运行，仅在 `npm publish` 时运行。

**prepack**

- Runs BEFORE a tarball is packed (on "`npm pack`", "`npm publish`", and when installing a git dependency).
- 在打包（如 `npm pack`、`npm publish` 和通过 git 安装依赖时）之前运行。
- NOTE: "`npm run pack`" is NOT the same as "`npm pack`". "`npm run pack`" is an arbitrary user defined script name, where as, "`npm pack`" is a CLI defined command.
- 注意：`npm run pack` 与 `npm pack` 并不同。`npm run pack` 是用户自定义的脚本，而 `npm pack` 是 npm CLI 定义的命令。

**postpack**

- Runs AFTER the tarball has been generated but before it is moved to its final destination (if at all, publish does not save the tarball locally)
- 在 tarball 文件生成之后、但在其被移至最终位置之前运行（如果有，则发布操作不会将 tarball 保存到本地）。

**dependencies**

- Runs AFTER any operations that modify the `node_modules` directory IF changes occurred.
- 在任何操作修改 `node_modules` 目录之后运行（如果有变更发生）。
- Does NOT run in global mode
- 不会在全局模式下运行。

### Prepare and Prepublish

**Deprecation Note: prepublish**

弃用说明：prepublish

Since `npm@1.1.71`, the npm CLI has run the `prepublish` script for both `npm publish` and `npm install`, because it's a convenient way to prepare a package for use (some common use cases are described in the section below). It has also turned out to be, in practice, [very confusing](https://github.com/npm/npm/issues/10074). As of `npm@4.0.0`, a new event has been introduced, `prepare`, that preserves this existing behavior. A *new* event, `prepublishOnly` has been added as a transitional strategy to allow users to avoid the confusing behavior of existing npm versions and only run on `npm publish` (for instance, running the tests one last time to ensure they're in good shape).

​	自 `npm@1.1.71` 起，npm CLI 会在 `npm publish` 和 `npm install` 时运行 `prepublish` 脚本，因为这是准备包以供使用的方便方式（在下文中描述了一些常见用例）。然而，这在实践中被证明非常混乱。自 `npm@4.0.0` 起，引入了一个新事件 `prepare`，以保留现有的行为。同时引入了一个新的 `prepublishOnly` 事件，作为一种过渡策略，以便用户能够避免现有 npm 版本的混淆行为，并且仅在 `npm publish` 时运行（例如，在最后一次运行测试，以确保包处于良好状态）。

See https://github.com/npm/npm/issues/10074 for a much lengthier justification, with further reading, for this change.

​	请参见 [GitHub 讨论](https://github.com/npm/npm/issues/10074)，了解此更改的详细理由及更多阅读材料。

**Use Cases**

使用场景

If you need to perform operations on your package before it is used, in a way that is not dependent on the operating system or architecture of the target system, use a `prepublish` script. This includes tasks such as:

​	如果需要在包被使用之前执行操作，并且这些操作与目标系统的操作系统或架构无关，可以使用 `prepublish` 脚本。这包括如下任务：

- Compiling CoffeeScript source code into JavaScript.
- 将 CoffeeScript 源代码编译为 JavaScript。

- Creating minified versions of JavaScript source code.
- 创建 JavaScript 源代码的压缩版本。
- Fetching remote resources that your package will use.
- 获取包使用的远程资源。

The advantage of doing these things at `prepublish` time is that they can be done once, in a single place, thus reducing complexity and variability. Additionally, this means that:

​	在 `prepublish` 时执行这些任务的优势在于它们可以在一个地方完成一次，从而降低复杂性和差异性。此外，这意味着：

- You can depend on `coffee-script` as a `devDependency`, and thus your users don't need to have it installed.
- 可以将 `coffee-script` 作为 `devDependency`，因此用户不需要安装它。
- You don't need to include minifiers in your package, reducing the size for your users.
- 无需在包中包含压缩工具，从而减小包的大小。
- You don't need to rely on your users having `curl` or `wget` or other system tools on the target machines.
- 无需依赖目标机器上是否安装 `curl` 或 `wget` 等系统工具。

### Dependencies

The `dependencies` script is run any time an `npm` command causes changes to the `node_modules` directory. It is run AFTER the changes have been applied and the `package.json` and `package-lock.json` files have been updated.

​	`dependencies` 脚本会在任何 `npm` 命令导致 `node_modules` 目录发生更改时运行。它会在更改应用之后以及 `package.json` 和 `package-lock.json` 文件更新之后运行。

## 生命周期操作顺序 Life Cycle Operation Order

### `npm cache add`

- `prepare`

### `npm ci`

- `preinstall`
- `install`
- `postinstall`
- `prepublish`
- `preprepare`
- `prepare`
- `postprepare`

These all run after the actual installation of modules into `node_modules`, in order, with no internal actions happening in between

​	这些操作都在将模块实际安装到 `node_modules` 目录之后按顺序运行，没有其他内部操作发生在它们之间。

### `npm diff`

- `prepare`

### `npm install`

These also run when you run `npm install -g <pkg-name>`

- `preinstall`
- `install`
- `postinstall`
- `prepublish`
- `preprepare`
- `prepare`
- `postprepare`

If there is a `binding.gyp` file in the root of your package and you haven't defined your own `install` or `preinstall` scripts, npm will default the `install` command to compile using node-gyp via `node-gyp rebuild`



These are run from the scripts of `<pkg-name>`

### `npm pack`

- `prepack`
- `prepare`
- `postpack`

### `npm publish`

- `prepublishOnly`
- `prepack`
- `prepare`
- `postpack`
- `publish`
- `postpublish`

### `npm rebuild`

- `preinstall`
- `install`
- `postinstall`
- `prepare`

`prepare` is only run if the current directory is a symlink (e.g. with linked packages)

### `npm restart`

If there is a `restart` script defined, these events are run, otherwise `stop` and `start` are both run if present, including their `pre` and `post` iterations)

- `prerestart`
- `restart`
- `postrestart`

### `npm run `

- `pre<user-defined>`
- `<user-defined>`
- `post<user-defined>`

### `npm start`

- `prestart`
- `start`
- `poststart`

If there is a `server.js` file in the root of your package, then npm will default the `start` command to `node server.js`. `prestart` and `poststart` will still run in this case.

### `npm stop`

- `prestop`
- `stop`
- `poststop`

### `npm test`

- `pretest`
- `test`
- `posttest`

### `npm version`

- `preversion`
- `version`
- `postversion`

### A Note on a lack of ](https://docs.npmjs.com/cli/v10/using-npm/scripts#a-note-on-a-lack-of-npm-uninstall-scripts)[`npm uninstall` scripts

While npm v6 had `uninstall` lifecycle scripts, npm v7 does not. Removal of a package can happen for a wide variety of reasons, and there's no clear way to currently give the script enough context to be useful.

Reasons for a package removal include:

- a user directly uninstalled this package
- a user uninstalled a dependant package and so this dependency is being uninstalled
- a user uninstalled a dependant package but another package also depends on this version
- this version has been merged as a duplicate with another version
- etc.

Due to the lack of necessary context, `uninstall` lifecycle scripts are not implemented and will not function.

## User

When npm is run as root, scripts are always run with the effective uid and gid of the working directory owner.

## Environment

Package scripts run in an environment where many pieces of information are made available regarding the setup of npm and the current state of the process.

### path

If you depend on modules that define executable scripts, like test suites, then those executables will be added to the `PATH` for executing the scripts. So, if your package.json has this:



```json
{
  "name": "foo",
  "dependencies": {
    "bar": "0.1.x"
  },
  "scripts": {
    "start": "bar ./test"
  }
}
```

then you could run `npm start` to execute the `bar` script, which is exported into the `node_modules/.bin` directory on `npm install`.

### package.json vars

The package.json fields are tacked onto the `npm_package_` prefix. So, for instance, if you had `{"name":"foo", "version":"1.2.5"}` in your package.json file, then your package scripts would have the `npm_package_name` environment variable set to "foo", and the `npm_package_version` set to "1.2.5". You can access these variables in your code with `process.env.npm_package_name` and `process.env.npm_package_version`, and so on for other fields.

See [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) for more on package configs.

### current lifecycle event

Lastly, the `npm_lifecycle_event` environment variable is set to whichever stage of the cycle is being executed. So, you could have a single script used for different parts of the process which switches based on what's currently happening.

Objects are flattened following this format, so if you had `{"scripts":{"install":"foo.js"}}` in your package.json, then you'd see this in the script:



```bash
process.env.npm_package_scripts_install === "foo.js"
```

## Examples

For example, if your package.json contains this:



```json
{
  "scripts": {
    "install": "scripts/install.js",
    "postinstall": "scripts/install.js"
  }
}
```

then `scripts/install.js` will be called for the install and post-install stages of the lifecycle. Since `scripts/install.js` is running for two different phases, it would be wise in this case to look at the `npm_lifecycle_event` environment variable.

If you want to run a make command, you can do so. This works just fine:



```json
{
  "scripts": {
    "preinstall": "./configure",
    "install": "make && make install",
    "test": "make test"
  }
}
```

## Exiting

Scripts are run by passing the line as a script argument to `sh`.

If the script exits with a code other than 0, then this will abort the process.

Note that these script files don't have to be Node.js or even JavaScript programs. They just have to be some kind of executable file.

## Best Practices

- Don't exit with a non-zero error code unless you *really* mean it. If the failure is minor or only will prevent some optional features, then it's better to just print a warning and exit successfully.
- Try not to use scripts to do what npm can do for you. Read through [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) to see all the things that you can specify and enable by simply describing your package appropriately. In general, this will lead to a more robust and consistent state.
- Inspect the env to determine where to put things. For instance, if the `npm_config_binroot` environment variable is set to `/home/user/bin`, then don't try to install executables into `/usr/local/bin`. The user probably set it up that way for a reason.
- Don't prefix your script commands with "sudo". If root permissions are required for some reason, then it'll fail with that error, and the user will sudo the npm command in question.
- Don't use `install`. Use a `.gyp` file for compilation, and `prepare` for anything else. You should almost never have to explicitly set a preinstall or install script. If you are doing this, please consider if there is another option. The only valid use of `install` or `preinstall` scripts is for compilation which must be done on the target architecture.
- Scripts are run from the root of the package folder, regardless of what the current working directory is when `npm` is invoked. If you want your script to use different behavior based on what subdirectory you're in, you can use the `INIT_CWD` environment variable, which holds the full path you were in when you ran `npm run`.

## See Also

- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npm developers](https://docs.npmjs.com/cli/v10/using-npm/developers)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)