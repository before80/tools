+++
title = "npm restart"
date = 2024-10-06T15:45:21+08:00
weight = 460
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)

Restart a package

​	重启一个包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm restart [-- <args>]
```

## Description

This restarts a project. It is equivalent to running `npm run-script restart`.

​	此命令用于重启一个项目。它相当于运行 `npm run-script restart`。

If the current project has a `"restart"` script specified in `package.json`, then the following scripts will be run:

​	如果当前项目在 `package.json` 中指定了 `"restart"` 脚本，则将按以下顺序运行以下脚本：

1. prerestart
2. restart
3. postrestart

If it does *not* have a `"restart"` script specified, but it does have `stop` and/or `start` scripts, then the following scripts will be run:

​	如果没有指定 `"restart"` 脚本，但有 `stop` 和/或 `start` 脚本，则将按以下顺序运行以下脚本：

1. prerestart
2. prestop
3. stop
4. poststop
5. prestart
6. start
7. poststart
8. postrestart

## 配置 Configuration

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 true，npm 将不运行 `package.json` 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	请注意，如果设置了 `ignore-scripts`，那么显式意图运行特定脚本的命令，如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`，仍然会运行其预期的脚本，但不会运行任何 pre 或 post 脚本。

### `script-shell`

- Default: '/bin/sh' on POSIX systems, 'cmd.exe' on Windows
- 默认值：在 POSIX 系统上为 '/bin/sh'，在 Windows 上为 'cmd.exe'
- Type: null or String

The shell to use for scripts run with the `npm exec`, `npm run` and `npm init <package-spec>` commands.

​	用于通过 `npm exec`、`npm run` 和 `npm init <package-spec>` 命令运行脚本的 shell。

## See Also

- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm test](https://docs.npmjs.com/cli/v10/commands/npm-test)
- [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)