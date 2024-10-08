+++
title = "npm run-script"
date = 2024-10-06T15:45:55+08:00
weight = 480
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)

Run arbitrary package scripts

​	运行任意包脚本

Version 10.9.0 (Latest)

## Synopsis



```bash
npm run-script <command> [-- <args>]
aliases: run, rum, urn
```

## Description

This runs an arbitrary command from a package's `"scripts"` object. If no `"command"` is provided, it will list the available scripts.

​	此命令从包的 `"scripts"` 对象中运行任意命令。如果未提供 `"command"`，将列出可用的脚本。

`run[-script]` is used by the test, start, restart, and stop commands, but can be called directly, as well. When the scripts in the package are printed out, they're separated into lifecycle (test, start, restart) and directly-run scripts.

​	`run[-script]` 被测试、启动、重启和停止命令使用，但也可以直接调用。当包中的脚本被打印时，它们被分为生命周期（测试、启动、重启）和直接运行的脚本。

Any positional arguments are passed to the specified script. Use `--` to pass `-`-prefixed flags and options which would otherwise be parsed by npm.

​	任何位置参数都将传递给指定的脚本。使用 `--` 来传递以 `-` 开头的标志和选项，这些标志和选项将被 npm 解析。

For example:

​	例如：

```bash
npm run test -- --grep="pattern"
```

The arguments will only be passed to the script specified after `npm run` and not to any `pre` or `post` script.

​	这些参数将仅传递给 `npm run` 后指定的脚本，而不会传递给任何 `pre` 或 `post` 脚本。

The `env` script is a special built-in command that can be used to list environment variables that will be available to the script at runtime. If an "env" command is defined in your package, it will take precedence over the built-in.

​	`env` 脚本是一个特殊的内置命令，可以用于列出在运行时可用的环境变量。如果在您的包中定义了一个 "env" 命令，它将优先于内置命令。

In addition to the shell's pre-existing `PATH`, `npm run` adds `node_modules/.bin` to the `PATH` provided to scripts. Any binaries provided by locally-installed dependencies can be used without the `node_modules/.bin` prefix. For example, if there is a `devDependency` on `tap` in your package, you should write:

​	除了 shell 的预先存在的 `PATH`，`npm run` 还会将 `node_modules/.bin` 添加到提供给脚本的 `PATH` 中。可以使用本地安装的依赖提供的任何二进制文件，而无需使用 `node_modules/.bin` 前缀。例如，如果您的包中有一个对 `tap` 的 `devDependency`，您应该写：



```bash
"scripts": {"test": "tap test/*.js"}
```

instead of

​	而不是



```bash
"scripts": {"test": "node_modules/.bin/tap test/*.js"}
```

The actual shell your script is run within is platform dependent. By default, on Unix-like systems it is the `/bin/sh` command, on Windows it is `cmd.exe`. The actual shell referred to by `/bin/sh` also depends on the system. You can customize the shell with the [`script-shell` config](https://docs.npmjs.com/cli/v10/using-npm/config#script-shell).

​	您的脚本运行的实际 shell 依赖于平台。默认情况下，在类 Unix 系统上，它是 `/bin/sh` 命令，在 Windows 上是 `cmd.exe`。`/bin/sh` 所指的实际 shell 也取决于系统。您可以使用 [`script-shell` 配置](https://docs.npmjs.com/cli/v10/using-npm/config#script-shell) 自定义 shell。

Scripts are run from the root of the package folder, regardless of what the current working directory is when `npm run` is called. If you want your script to use different behavior based on what subdirectory you're in, you can use the `INIT_CWD` environment variable, which holds the full path you were in when you ran `npm run`.

​	脚本从包文件夹的根目录运行，无论在调用 `npm run` 时当前工作目录是什么。如果您希望您的脚本根据所处的子目录使用不同的行为，可以使用 `INIT_CWD` 环境变量，它保存了您运行 `npm run` 时所处的完整路径。

`npm run` sets the `NODE` environment variable to the `node` executable with which `npm` is executed.

​	`npm run` 将 `NODE` 环境变量设置为执行 `npm` 时使用的 `node` 可执行文件。

If you try to run a script without having a `node_modules` directory and it fails, you will be given a warning to run `npm install`, just in case you've forgotten.

​	如果您尝试在没有 `node_modules` 目录的情况下运行脚本并且失败，将会收到一个警告，提示您运行 `npm install`，以防您忘记了。

## 工作区支持 Workspaces support

You may use the [`workspace`](https://docs.npmjs.com/cli/v10/using-npm/config#workspace) or [`workspaces`](https://docs.npmjs.com/cli/v10/using-npm/config#workspaces) configs in order to run an arbitrary command from a package's `"scripts"` object in the context of the specified workspaces. If no `"command"` is provided, it will list the available scripts for each of these configured workspaces.

​	您可以使用 [`workspace`](https://docs.npmjs.com/cli/v10/using-npm/config#workspace) 或 [`workspaces`](https://docs.npmjs.com/cli/v10/using-npm/config#workspaces) 配置，以便在指定工作区的上下文中从包的 `"scripts"` 对象中运行任意命令。如果未提供 `"command"`，将列出这些配置工作区的可用脚本。

Given a project with configured workspaces, e.g:

​	给定一个配置工作区的项目，例如：



```bash
.
+-- package.json
`-- packages
   +-- a
   |   `-- package.json
   +-- b
   |   `-- package.json
   `-- c
       `-- package.json
```

Assuming the workspace configuration is properly set up at the root level `package.json` file. e.g:

​	假设工作区配置在根级的 `package.json` 文件中正确设置，例如：



```bash
{
    "workspaces": [ "./packages/*" ]
}
```

And that each of the configured workspaces has a configured `test` script, we can run tests in all of them using the [`workspaces` config](https://docs.npmjs.com/cli/v10/using-npm/config#workspaces):

​	并且每个配置的工作区都有一个配置的 `test` 脚本，我们可以使用 [`workspaces` 配置](https://docs.npmjs.com/cli/v10/using-npm/config#workspaces) 在它们中运行测试：

```
npm test --workspaces
```

### 过滤工作区 Filtering workspaces

It's also possible to run a script in a single workspace using the `workspace` config along with a name or directory path:

​	也可以使用 `workspace` 配置以及名称或目录路径在单个工作区中运行脚本：

```
npm test --workspace=a
```

The `workspace` config can also be specified multiple times in order to run a specific script in the context of multiple workspaces. When defining values for the `workspace` config in the command line, it also possible to use `-w` as a shorthand, e.g:

​	`workspace` 配置也可以多次指定，以便在多个工作区的上下文中运行特定脚本。在命令行中定义 `workspace` 配置的值时，也可以使用 `-w` 作为简写，例如：

```
npm test -w a -w b
```

This last command will run `test` in both `./packages/a` and `./packages/b` packages.

​	该命令将在 `./packages/a` 和 `./packages/b` 包中运行 `test`。

## 配置Configuration

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以多次设置）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration optio

​	在当前项目的配置工作区的上下文中运行命令，同时通过仅运行此配置选项定义的工作区进行过滤。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值可以是：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录的路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录的路径（将选择该文件夹内的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在 `npm init` 命令中设置时，可以设置为尚不存在的工作区文件夹，以创建该文件夹并将其设置为项目中的全新工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true 以在 **所有** 配置的工作区的上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	显式将此设置为 false 将导致 `install` 等命令完全忽略工作区。当未明确设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 操作 `node_modules` 树的命令（install、update 等）将在 `node_modules` 文件夹中链接工作区。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 其他命令（test、exec、publish 等）将在根项目上运行，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	在命令启用工作区时包含工作区根。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当为 false 时，通过 `workspace` 配置指定单个工作区，或通过 `workspaces` 标志指定所有工作区，将使 npm 仅对指定的工作区进行操作，而不对根项目进行操作。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `if-present`

- Default: false
- Type: Boolean

If true, npm will not exit with an error code when `run-script` is invoked for a script that isn't defined in the `scripts` section of `package.json`. This option can be used when it's desirable to optionally run a script when it's present and fail if the script fails. This is useful, for example, when running scripts that may only apply for some builds in an otherwise generic CI setup.

​	如果为 true，当为未在 `package.json` 的 `scripts` 部分定义的脚本调用 `run-script` 时，npm 将不会以错误代码退出。此选项可用于在希望可选地运行某个脚本时使用（当该脚本存在时），并在脚本失败时失败。这在运行可能仅适用于某些构建的脚本时很有用，例如在其他通用 CI 设置中。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 true，npm 不会运行在 package.json 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	注意，明确旨在运行特定脚本的命令，例如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`，如果设置了 `ignore-scripts`，仍会运行其预期的脚本，但它们将 *不* 运行任何 pre 或 post 脚本。

### `foreground-scripts`

- Default: `false` unless when using `npm pack` or `npm publish` where it defaults to `true`
- 默认值：`false`，但在使用 `npm pack` 或 `npm publish` 时默认值为 `true`
- Type: Boolean

Run all build scripts (ie, `preinstall`, `install`, and `postinstall`) scripts for installed packages in the foreground process, sharing standard input, output, and error with the main npm process.

​	在前台进程中运行所有已安装包的构建脚本（即 `preinstall`、`install` 和 `postinstall`），与主 npm 进程共享标准输入、输出和错误。

Note that this will generally make installs run slower, and be much noisier, but can be useful for debugging.

​	注意，这通常会使安装运行得更慢，并且会更加嘈杂，但在调试时可能很有用。

### `script-shell`

- Default: '/bin/sh' on POSIX systems, 'cmd.exe' on Windows
- 默认值：在 POSIX 系统上为 '/bin/sh'，在 Windows 上为 'cmd.exe'
- Type: null or String

The shell to use for scripts run with the `npm exec`, `npm run` and `npm init <package-spec>` commands.

​	用于通过 `npm exec`、`npm run` 和 `npm init <package-spec>` 命令运行脚本的 shell。

## See Also

- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm test](https://docs.npmjs.com/cli/v10/commands/npm-test)
- [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)