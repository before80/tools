+++
title = "npm exec"
date = 2024-10-06T15:41:37+08:00
weight = 170
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-exec](https://docs.npmjs.com/cli/v10/commands/npm-exec)

Run a command from a local or remote npm package

​	从本地或远程 npm 包中运行命令

Version 10.9.0 (Latest)

## Synopsis



```bash
npm exec -- <pkg>[@<version>] [args...]
npm exec --package=<pkg>[@<version>] -- <cmd> [args...]npm exec -c '<cmd> [args...]'
npm exec --package=foo -c '<cmd> [args...]'

alias: x
```

## Description

This command allows you to run an arbitrary command from an npm package (either one installed locally, or fetched remotely), in a similar context as running it via `npm run`.

​	此命令允许您从 npm 包（无论是本地安装的还是远程获取的）中运行任意命令，类似于通过 `npm run` 运行命令的上下文。

Run without positional arguments or `--call`, this allows you to interactively run commands in the same sort of shell environment that `package.json` scripts are run. Interactive mode is not supported in CI environments when standard input is a TTY, to prevent hangs.

​	在没有位置参数或 `--call` 的情况下运行时，它允许您在与运行 `package.json` 脚本相同的 shell 环境中交互式地运行命令。在标准输入为 TTY 的 CI 环境中不支持交互模式，以防止挂起。

Whatever packages are specified by the `--package` option will be provided in the `PATH` of the executed command, along with any locally installed package executables. The `--package` option may be specified multiple times, to execute the supplied command in an environment where all specified packages are available.

​	通过 `--package` 选项指定的所有包将被添加到执行命令的 `PATH` 中，以及任何本地安装的包可执行文件。可以多次指定 `--package` 选项，以在所有指定包可用的环境中执行提供的命令。

If any requested packages are not present in the local project dependencies, then a prompt is printed, which can be suppressed by providing either `--yes` or `--no`. When standard input is not a TTY or a CI environment is detected, `--yes` is assumed. The requested packages are installed to a folder in the npm cache, which is added to the `PATH` environment variable in the executed process.

​	如果请求的任何包在本地项目依赖中不存在，则会打印提示，可以通过提供 `--yes` 或 `--no` 来抑制。当标准输入不是 TTY 或检测到 CI 环境时，默认假定为 `--yes`。请求的包将安装到 npm 缓存中的一个文件夹中，该文件夹将被添加到执行进程的 `PATH` 环境变量中。

Package names provided without a specifier will be matched with whatever version exists in the local project. Package names with a specifier will only be considered a match if they have the exact same name and version as the local dependency.

​	未带说明符提供的包名将与本地项目中存在的任何版本匹配。带说明符的包名只有在与本地依赖的名称和版本完全相同的情况下才会被视为匹配。

If no `-c` or `--call` option is provided, then the positional arguments are used to generate the command string. If no `--package` options are provided, then npm will attempt to determine the executable name from the package specifier provided as the first positional argument according to the following heuristic:

​	如果没有提供 `-c` 或 `--call` 选项，则位置参数将用于生成命令字符串。如果未提供 `--package` 选项，则 npm 将根据以下启发式方法尝试从作为第一个位置参数提供的包说明符中确定可执行文件的名称：

- If the package has a single entry in its `bin` field in `package.json`, or if all entries are aliases of the same command, then that command will be used.
- 如果包在其 `package.json` 的 `bin` 字段中有单个条目，或者所有条目都是同一命令的别名，则将使用该命令。

- If the package has multiple `bin` entries, and one of them matches the unscoped portion of the `name` field, then that command will be used.
- 如果包有多个 `bin` 条目，且其中一个与 `name` 字段的未作用域部分匹配，则将使用该命令。
- If this does not result in exactly one option (either because there are no bin entries, or none of them match the `name` of the package), then `npm exec` exits with an error.
- 如果这未能产生确切一个选项（要么没有 `bin` 条目，要么都不匹配包的 `name`），则 `npm exec` 将以错误退出。

To run a binary *other than* the named binary, specify one or more `--package` options, which will prevent npm from inferring the package from the first command argument.

要运行 *不同于* 命名二进制文件的二进制文件，请指定一个或多个 `--package` 选项，这将防止 npm 从第一个命令参数推断包。

## `npx` vs `npm exec`

When run via the `npx` binary, all flags and options *must* be set prior to any positional arguments. When run via `npm exec`, a double-hyphen `--` flag can be used to suppress npm's parsing of switches and options that should be sent to the executed command.

​	通过 `npx` 二进制文件运行时，所有标志和选项 *必须* 在任何位置参数之前设置。通过 `npm exec` 运行时，可以使用双短横线 `--` 标志来抑制 npm 对应发送到执行命令的开关和选项的解析。

For example:

​	例如：

```
$ npx foo@latest bar --package=@npmcli/foo
```

In this case, npm will resolve the `foo` package name, and run the following command:

​	在这种情况下，npm 将解析 `foo` 包名，并运行以下命令：

```
$ foo bar --package=@npmcli/foo
```

Since the `--package` option comes *after* the positional arguments, it is treated as an argument to the executed command.

​	由于 `--package` 选项在位置参数 *之后*，因此它被视为执行命令的参数。

In contrast, due to npm's argument parsing logic, running this command is different:

​	相比之下，由于 npm 的参数解析逻辑，运行此命令有所不同：

```
$ npm exec foo@latest bar --package=@npmcli/foo
```

In this case, npm will parse the `--package` option first, resolving the `@npmcli/foo` package. Then, it will execute the following command in that context:

​	在这种情况下，npm 将首先解析 `--package` 选项，解析出 `@npmcli/foo` 包。然后，它将在该上下文中执行以下命令：

```
$ foo@latest bar
```

The double-hyphen character is recommended to explicitly tell npm to stop parsing command line options and switches. The following command would thus be equivalent to the `npx` command above:

​	建议使用双短横线字符明确告知 npm 停止解析命令行选项和开关。因此，以下命令将等同于上面的 `npx` 命令：

```
$ npm exec -- foo@latest bar --package=@npmcli/foo
```

## 配置 Configuration

### `package`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以设置多次）

The package or packages to install for [`npm exec`](https://docs.npmjs.com/cli/v10/commands/npm-exec)

​	[`npm exec`](https://docs.npmjs.com/cli/v10/commands/npm-exec) 要安装的包。

### `call`

- Default: ""
- Type: String

Optional companion option for `npm exec`, `npx` that allows for specifying a custom command to be run along with the installed packages.

​	`npm exec` 和 `npx` 的可选伴随选项，允许指定与已安装包一起运行的自定义命令。



```bash
npm exec --package yo --package generator-node --call "yo node"
```

### `workspace`

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以设置多次）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	在当前项目的配置工作区的上下文中运行命令，同时仅运行此配置选项定义的工作区。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值包括：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录路径
- Path to a parent workspace directory (will result in selecting all workspaces within that folder) 父工作区目录路径（将导致选择该文件夹中的所有工作区）

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

​	在为 `npm init` 命令设置时，可以设置为尚不存在的工作区的文件夹，以创建该文件夹并将其设置为项目中的新工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `workspaces`

- Default: null
- Type: null or Boolean

Set to true to run the command in the context of **all** configured workspaces.

​	设置为 true，以在 **所有** 配置的工作区的上下文中运行命令。

Explicitly setting this to false will cause commands like `install` to ignore workspaces altogether. When not set explicitly:

​	显式将其设置为 false 将导致 `install` 等命令完全忽略工作区。当未显式设置时：

- Commands that operate on the `node_modules` tree (install, update, etc.) will link workspaces into the `node_modules` folder. 
- 对 `node_modules` 树操作的命令（安装、更新等）将工作区链接到 `node_modules` 文件夹。
- Commands that do other things (test, exec, publish, etc.) will operate on the root project, *unless* one or more workspaces are specified in the `workspace` config.
- 执行其他操作的命令（测试、执行、发布等）将操作根项目，*除非* 在 `workspace` 配置中指定了一个或多个工作区。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### `include-workspace-root`

- Default: false
- Type: Boolean

Include the workspace root when workspaces are enabled for a command.

​	在启用工作区的命令中包含工作区根。

When false, specifying individual workspaces via the `workspace` config, or all workspaces via the `workspaces` flag, will cause npm to operate only on the specified workspaces, and not on the root project.

​	当设置为 false 时，通过 `workspace` 配置指定单个工作区，或通过 `workspaces` 标志指定所有工作区，将导致 npm 仅在指定工作区上操作，而不在根项目上操作。

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

## Examples

Run the version of `tap` in the local dependencies, with the provided arguments:

​	在本地依赖中运行 `tap` 的版本，附带提供的参数：

```bash
$ npm exec -- tap --bail test/foo.js
$ npx tap --bail test/foo.js
```

Run a command *other than* the command whose name matches the package name by specifying a `--package` option:

​	通过指定 `--package` 选项，运行与包名匹配的命令 *以外的* 命令：



```bash
$ npm exec --package=foo -- bar --bar-argument
# ~ or ~
$ npx --package=foo bar --bar-argument
```

Run an arbitrary shell script, in the context of the current project:

​	在当前项目上下文中运行任意 shell 脚本：



```bash
$ npm x -c 'eslint && say "hooray, lint passed"'
$ npx -c 'eslint && say "hooray, lint passed"'
```

## 工作区支持 Workspaces support

You may use the [`workspace`](https://docs.npmjs.com/cli/v10/using-npm/config#workspace) or [`workspaces`](https://docs.npmjs.com/cli/v10/using-npm/config#workspaces) configs in order to run an arbitrary command from an npm package (either one installed locally, or fetched remotely) in the context of the specified workspaces. If no positional argument or `--call` option is provided, it will open an interactive subshell in the context of each of these configured workspaces one at a time.

​	您可以使用 [`workspace`](https://docs.npmjs.com/cli/v10/using-npm/config#workspace) 或 [`workspaces`](https://docs.npmjs.com/cli/v10/using-npm/config#workspaces) 配置，以便在指定工作区的上下文中运行来自 npm 包（无论是本地安装的还是远程获取的）的任意命令。如果未提供位置参数或 `--call` 选项，它将在每个配置工作区的上下文中逐一打开交互式子 shell。

Given a project with configured workspaces, e.g:

​	给定一个配置了工作区的项目，例如：



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

​	假设工作区配置在根级别的 `package.json` 文件中正确设置，例如：



```bash
{
    "workspaces": [ "./packages/*" ]
}
```

You can execute an arbitrary command from a package in the context of each of the configured workspaces when using the [`workspaces` config options](https://docs.npmjs.com/cli/v10/using-npm/config#workspace), in this example we're using **eslint** to lint any js file found within each workspace folder:

​	在使用 [`workspaces` 配置选项](https://docs.npmjs.com/cli/v10/using-npm/config#workspace) 时，您可以在每个配置工作区的上下文中执行来自包的任意命令，在这个例子中，我们使用 **eslint** 来检查每个工作区文件夹中找到的任何 js 文件：

```
npm exec --ws -- eslint ./*.js
```

### 过滤工作区 Filtering workspaces

It's also possible to execute a command in a single workspace using the `workspace` config along with a name or directory path:

​	还可以通过 `workspace` 配置及名称或目录路径在单个工作区中执行命令：

```
npm exec --workspace=a -- eslint ./*.js
```

The `workspace` config can also be specified multiple times in order to run a specific script in the context of multiple workspaces. When defining values for the `workspace` config in the command line, it also possible to use `-w` as a shorthand, e.g:

​	`workspace` 配置还可以多次指定，以便在多个工作区的上下文中运行特定脚本。在命令行中定义 `workspace` 配置的值时，也可以使用 `-w` 作为简写，例如：

```
npm exec -w a -w b -- eslint ./*.js
```

This last command will run the `eslint` command in both `./packages/a` and `./packages/b` folders.

​	这条命令将在 `./packages/a` 和 `./packages/b` 中运行。

## 与旧版本 npx 的兼容性 Compatibility with Older npx Versions

The `npx` binary was rewritten in npm v7.0.0, and the standalone `npx` package deprecated at that time. `npx` uses the `npm exec` command instead of a separate argument parser and install process, with some affordances to maintain backwards compatibility with the arguments it accepted in previous versions.

​	`npx` 二进制文件在 npm v7.0.0 中被重写，并且在那时独立的 `npx` 包被弃用。`npx` 使用 `npm exec` 命令，而不是单独的参数解析器和安装过程，并保留了一些功能以维持与早期版本接受的参数的向后兼容性。

This resulted in some shifts in its functionality:

​	这导致其功能发生了一些变化：

- Any `npm` config value may be provided.
- 可以提供任何 `npm` 配置值。

- To prevent security and user-experience problems from mistyping package names, `npx` prompts before installing anything. Suppress this prompt with the `-y` or `--yes` option.
- 为了防止因输入包名称错误而导致的安全和用户体验问题，`npx` 在安装任何内容之前会提示用户。可以使用 `-y` 或 `--yes` 选项抑制此提示。
- The `--no-install` option is deprecated, and will be converted to `--no`.
- `--no-install` 选项已被弃用，并将转换为 `--no`。
- Shell fallback functionality is removed, as it is not advisable.
- 移除了 Shell 回退功能，因为这并不建议使用。
- The `-p` argument is a shorthand for `--parseable` in npm, but shorthand for `--package` in npx. This is maintained, but only for the `npx` executable.
- `-p` 参数在 npm 中是 `--parseable` 的简写，而在 npx 中是 `--package` 的简写。此功能得以保留，但仅适用于 `npx` 可执行文件。
- The `--ignore-existing` option is removed. Locally installed bins are always present in the executed process `PATH`.
- `--ignore-existing` 选项已被移除。已安装的本地可执行文件始终会出现在执行进程的 `PATH` 中。
- The `--npm` option is removed. `npx` will always use the `npm` it ships with.
- `--npm` 选项已被移除。`npx` 将始终使用其随附的 `npm`。
- The `--node-arg` and `-n` options are removed.
- `--node-arg` 和 `-n` 选项已被移除。
- The `--always-spawn` option is redundant, and thus removed.
- `--always-spawn` 选项是多余的，因此已被移除。
- The `--shell` option is replaced with `--script-shell`, but maintained in the `npx` executable for backwards compatibility.
- `--shell` 选项被 `--script-shell` 替代，但在 `npx` 可执行文件中保持不变以确保向后兼容。

  

## 关于缓存的说明 A note on caching

The npm cli utilizes its internal package cache when using the package name specified. You can use the following to change how and when the cli uses this cache. See [`npm cache`](https://docs.npmjs.com/cli/v10/commands/npm-cache) for more on how the cache works.

​	npm CLI 在使用指定的包名称时利用其内部包缓存。您可以使用以下方法更改 CLI 如何以及何时使用此缓存。有关缓存工作原理的更多信息，请参阅 [`npm cache`](https://docs.npmjs.com/cli/v10/commands/npm-cache)。

### prefer-online

Forces staleness checks for packages, making the cli look for updates immediately even if the package is already in the cache.

​	强制检查包的过时状态，即使包已经在缓存中，CLI 也会立即查找更新。

### prefer-offline

Bypasses staleness checks for packages. Missing data will still be requested from the server. To force full offline mode, use `offline`.

​	绕过包的过时状态检查。缺失的数据仍将从服务器请求。要强制完全离线模式，请使用 `offline`。

### offline

Forces full offline mode. Any packages not locally cached will result in an error.

​	强制完全离线模式。任何未在本地缓存中的包将导致错误。

### workspace

- Default:
- Type: String (can be set multiple times)
- 类型：字符串（可以设置多次）

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

​	允许在当前项目的配置工作区的上下文中运行命令，同时仅运行此配置选项定义的工作区。

Valid values for the `workspace` config are either:

​	`workspace` 配置的有效值包括：

- Workspace names 工作区名称

- Path to a workspace directory 工作区目录路径
- Path to a parent workspace directory (will result to selecting all of the nested workspaces) 父工作区目录路径（将选择该文件夹中的所有嵌套工作区）

This value is not exported to the environment for child processes.

​	此值不会导出到子进程的环境中。

### workspaces

- Alias: `--ws`
- Type: Boolean
- Default: `false`

Run scripts in the context of all configured workspaces for the current project.

​	在当前项目的所有配置工作区的上下文中运行脚本。

## See Also

- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm test](https://docs.npmjs.com/cli/v10/commands/npm-test)
- [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
- [npx](https://docs.npmjs.com/cli/v10/commands/npx)