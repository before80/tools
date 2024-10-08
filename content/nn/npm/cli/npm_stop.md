+++
title = "npm stop"
date = 2024-10-06T15:46:57+08:00
weight = 550
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)

Stop a package

​	停止一个包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm stop [-- <args>]
```

## Description

This runs a predefined command specified in the "stop" property of a package's "scripts" object.

​	此命令运行在包的“scripts”对象中的“stop”属性指定的预定义命令。

Unlike with [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start), there is no default script that will run if the `"stop"` property is not defined.

​	与 [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start) 不同，如果未定义 `"stop"` 属性，则不会运行任何默认脚本。

## 示例 Example



```json
{
  "scripts": {
    "stop": "node bar.js"
  }
}
```



```bash
npm stop
> npm@x.x.x stop> node bar.js
(bar.js output would be here)
```

## Configuration

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 true，npm 不会运行 package.json 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	请注意，明确打算运行特定脚本的命令，如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`，在 `ignore-scripts` 设置为 true 的情况下仍会运行其预期脚本，但它们不会运行任何前置或后置脚本。

### `script-shell`

- Default: '/bin/sh' on POSIX systems, 'cmd.exe' on Windows
- 默认值：在 POSIX 系统上为 `/bin/sh`，在 Windows 上为 `cmd.exe`
- Type: null or String

The shell to use for scripts run with the `npm exec`, `npm run` and `npm init <package-spec>` commands.

​	用于 `npm exec`、`npm run` 和 `npm init <package-spec>` 命令运行脚本的 shell。

## See Also

- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm test](https://docs.npmjs.com/cli/v10/commands/npm-test)
- [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)