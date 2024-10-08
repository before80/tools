+++
title = "npx"
date = 2024-10-06T15:48:20+08:00
weight = 660
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npx](https://docs.npmjs.com/cli/v10/commands/npx)

Run a command from a local or remote npm package

​	从本地或远程 npm 包运行命令

Version 10.9.0 (Latest)

## Synopsis



```bash
npx -- <pkg>[@<version>] [args...]
npx --package=<pkg>[@<version>] -- <cmd> [args...]
npx -c '<cmd> [args...]'
npx --package=foo -c '<cmd> [args...]'
```

## Description

This command allows you to run an arbitrary command from an npm package (either one installed locally, or fetched remotely), in a similar context as running it via `npm run`.

​	此命令允许你从 npm 包（无论是本地安装的包还是远程获取的包）运行任意命令，类似于通过 `npm run` 运行它的上下文。

Whatever packages are specified by the `--package` option will be provided in the `PATH` of the executed command, along with any locally installed package executables. The `--package` option may be specified multiple times, to execute the supplied command in an environment where all specified packages are available.

​	通过 `--package` 选项指定的任何包将被添加到执行命令的 `PATH` 中，以及任何本地安装的包可执行文件。`--package` 选项可以多次指定，以在一个所有指定包都可用的环境中执行所提供的命令。

If any requested packages are not present in the local project dependencies, then they are installed to a folder in the npm cache, which is added to the `PATH` environment variable in the executed process. A prompt is printed (which can be suppressed by providing either `--yes` or `--no`).

​	如果任何请求的包在本地项目依赖项中不存在，则会将它们安装到 npm 缓存中的文件夹，并将其添加到执行进程中的 `PATH` 环境变量中。会打印提示（可以通过提供 `--yes` 或 `--no` 来抑制）。

Package names provided without a specifier will be matched with whatever version exists in the local project. Package names with a specifier will only be considered a match if they have the exact same name and version as the local dependency.

​	未指定版本的包名称将与本地项目中存在的版本进行匹配。带有版本说明符的包名称仅在它们与本地依赖项具有完全相同的名称和版本时才会被视为匹配。

If no `-c` or `--call` option is provided, then the positional arguments are used to generate the command string. If no `--package` options are provided, then npm will attempt to determine the executable name from the package specifier provided as the first positional argument according to the following heuristic:

​	如果没有提供 `-c` 或 `--call` 选项，则位置参数用于生成命令字符串。如果没有提供 `--package` 选项，则 npm 将根据以下启发式规则尝试确定可执行文件名称：

- If the package has a single entry in its `bin` field in `package.json`, or if all entries are aliases of the same command, then that command will be used.
- 如果包的 `package.json` 中的 `bin` 字段有一个条目，或者所有条目都是同一命令的别名，则将使用该命令。

- If the package has multiple `bin` entries, and one of them matches the unscoped portion of the `name` field, then that command will be used.
- 如果包有多个 `bin` 条目，并且其中一个与 `name` 字段的非范围部分匹配，则将使用该命令。
- If this does not result in exactly one option (either because there are no bin entries, or none of them match the `name` of the package), then `npm exec` exits with an error.
- 如果这导致没有准确的一个选项（因为没有 bin 条目，或者没有一个与包的 `name` 匹配），则 `npm exec` 将退出并显示错误。

To run a binary *other than* the named binary, specify one or more `--package` options, which will prevent npm from inferring the package from the first command argument.

要运行*非*指定名称的可执行文件，请指定一个或多个 `--package` 选项，这将防止 npm 从第一个命令参数推断出包。

## `npx` vs `npm exec`

When run via the `npx` binary, all flags and options *must* be set prior to any positional arguments. When run via `npm exec`, a double-hyphen `--` flag can be used to suppress npm's parsing of switches and options that should be sent to the executed command.

​	通过 `npx` 可执行文件运行时，所有标志和选项*必须*在任何位置参数之前设置。通过 `npm exec` 运行时，可以使用双破折号 `--` 标志来抑制 npm 对应发送到执行命令的开关和选项的解析。

For example:

​	例如：

```
$ npx foo@latest bar --package=@npmcli/foo
```

In this case, npm will resolve the `foo` package name, and run the following command:

​	在这种情况下，npm 将解析 `foo` 包名称，并运行以下命令：

```
$ foo bar --package=@npmcli/foo
```

Since the `--package` option comes *after* the positional arguments, it is treated as an argument to the executed command.

​	由于 `--package` 选项在位置参数*之后*，因此它被视为执行命令的参数。

In contrast, due to npm's argument parsing logic, running this command is different:

​	相反，由于 npm 的参数解析逻辑，运行以下命令是不同的：

```
$ npm exec foo@latest bar --package=@npmcli/foo
```

In this case, npm will parse the `--package` option first, resolving the `@npmcli/foo` package. Then, it will execute the following command in that context:

​	在这种情况下，npm 将首先解析 `--package` 选项，解析 `@npmcli/foo` 包。然后，它将在该上下文中执行以下命令：

```
$ foo@latest bar
```

The double-hyphen character is recommended to explicitly tell npm to stop parsing command line options and switches. The following command would thus be equivalent to the `npx` command above:

​	建议使用双破折号字符明确告诉 npm 停止解析命令行选项和开关。因此，以下命令将与上述 `npx` 命令等效：

```
$ npm exec -- foo@latest bar --package=@npmcli/foo
```

## 示例 Examples

Run the version of `tap` in the local dependencies, with the provided arguments:

​	在本地依赖项中运行 `tap` 的版本，并提供参数：



```bash
$ npm exec -- tap --bail test/foo.js
$ npx tap --bail test/foo.js
```

Run a command *other than* the command whose name matches the package name by specifying a `--package` option:

​	通过指定 `--package` 选项，运行一个*非*与包名称匹配的命令：



```bash
$ npm exec --package=foo -- bar --bar-argument
# ~ or ~
$ npx --package=foo bar --bar-argument
```

Run an arbitrary shell script, in the context of the current project:

​	在当前项目的上下文中运行任意 Shell 脚本：



```bash
$ npm x -c 'eslint && say "hooray, lint passed"'
$ npx -c 'eslint && say "hooray, lint passed"'
```

## 与旧版 npx 的兼容性 Compatibility with Older npx Versions

The `npx` binary was rewritten in npm v7.0.0, and the standalone `npx` package deprecated at that time. `npx` uses the `npm exec` command instead of a separate argument parser and install process, with some affordances to maintain backwards compatibility with the arguments it accepted in previous versions.

​	`npx` 可执行文件在 npm v7.0.0 中被重写，独立的 `npx` 包在那时被弃用。`npx` 使用 `npm exec` 命令，而不是单独的参数解析器和安装过程，并进行了某些适配以保持与先前版本接受的参数的向后兼容性。

This resulted in some shifts in its functionality:

​	这导致其功能发生了一些变化：

- Any `npm` config value may be provided.
- 可以提供任何 `npm` 配置值。

- To prevent security and user-experience problems from mistyping package names, `npx` prompts before installing anything. Suppress this prompt with the `-y` or `--yes` option.
- 为了防止因拼写包名称而导致的安全性和用户体验问题，`npx` 在安装任何东西之前会提示。使用 `-y` 或 `--yes` 选项抑制此提示。
- The `--no-install` option is deprecated, and will be converted to `--no`.
- `--no-install` 选项已被弃用，将被转换为 `--no`。
- Shell fallback functionality is removed, as it is not advisable.
- 删除了 Shell 回退功能，因为这并不建议。
- The `-p` argument is a shorthand for `--parseable` in npm, but shorthand for `--package` in npx. This is maintained, but only for the `npx` executable.
- `-p` 参数是 npm 中 `--parseable` 的简写，但在 npx 中是 `--package` 的简写。这一点保持不变，但仅适用于 `npx` 可执行文件。
- The `--ignore-existing` option is removed. Locally installed bins are always present in the executed process `PATH`.
- 删除了 `--ignore-existing` 选项。 本地安装的可执行文件始终存在于执行进程的 `PATH` 中。
- The `--npm` option is removed. `npx` will always use the `npm` it ships with.
- 删除了 `--npm` 选项。`npx` 将始终使用其随附的 `npm`。
- The `--node-arg` and `-n` options have been removed. Use [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#node_optionsoptions) instead: e.g., `NODE_OPTIONS="--trace-warnings --trace-exit" npx foo --random=true`
- 删除了 `--node-arg` 和 `-n` 选项。使用 [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#node_optionsoptions) 代替：例如，`NODE_OPTIONS="--trace-warnings --trace-exit" npx foo --random=true`。
- The `--always-spawn` option is redundant, and thus removed.
- `--always-spawn` 选项是多余的，因此被删除。
- The `--shell` option is replaced with `--script-shell`, but maintained in the `npx` executable for backwards compatibility.
- `--shell` 选项替换为 `--script-shell`，但在 `npx` 可执行文件中保持向后兼容。

## See Also

- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm test](https://docs.npmjs.com/cli/v10/commands/npm-test)
- [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npm exec](https://docs.npmjs.com/cli/v10/commands/npm-exec)