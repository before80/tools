+++
title = "npm test"
date = 2024-10-06T15:47:09+08:00
weight = 570
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-test](https://docs.npmjs.com/cli/v10/commands/npm-test)

Test a package

​	测试包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm test [-- <args>]
aliases: tst, t
```

## Description

This runs a predefined command specified in the `"test"` property of a package's `"scripts"` object.

​	该命令运行在包的 `"scripts"` 对象中指定的 `"test"` 属性的预定义命令。

## 示例 Example



```json
{
  "scripts": {
    "test": "node test.js"
  }
}
```



```bash
npm test> npm@x.x.x test> node test.js
(test.js output would be here)
```

## 配置 Configuration

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 true，npm 将不运行在 package.json 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	请注意，显式意图运行特定脚本的命令，例如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`，如果设置了 `ignore-scripts`，仍将运行其预期的脚本，但它们将 *不* 运行任何前置或后置脚本。

### `script-shell`

- Default: '/bin/sh' on POSIX systems, 'cmd.exe' on Windows
- 默认值：POSIX 系统为 '/bin/sh'，Windows 为 'cmd.exe'
- Type: null or String

The shell to use for scripts run with the `npm exec`, `npm run` and `npm init <package-spec>` commands.

​	运行 `npm exec`、`npm run` 和 `npm init <package-spec>` 命令时使用的 shell。

## See Also

- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)