+++
title = "npm start"
date = 2024-10-06T15:46:41+08:00
weight = 540
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-start](https://docs.npmjs.com/cli/v10/commands/npm-start)

Start a package

​	启动一个包

Version 10.9.0 (Latest)

## Synopsis



```bash
npm start [-- <args>]
```

## Description

This runs a predefined command specified in the `"start"` property of a package's `"scripts"` object.

​	这将运行在包的 `"scripts"` 对象中指定的 `"start"` 属性的预定义命令。

If the `"scripts"` object does not define a `"start"` property, npm will run `node server.js`.

​	如果 `"scripts"` 对象未定义 `"start"` 属性，npm 将运行 `node server.js`。

Note that this is different from the default node behavior of running the file specified in a package's `"main"` attribute when evoking with `node .`

​	请注意，这与默认的 Node 行为不同，后者在使用 `node .` 时运行包的 `"main"` 属性中指定的文件。

As of [`npm@2.0.0`](https://blog.npmjs.org/post/98131109725/npm-2-0-0), you can use custom arguments when executing scripts. Refer to [`npm run-script`](https://docs.npmjs.com/cli/v10/commands/npm-run-script) for more details.

​	从 [`npm@2.0.0`](https://blog.npmjs.org/post/98131109725/npm-2-0-0) 开始，您可以在执行脚本时使用自定义参数。有关更多详细信息，请参见 [`npm run-script`](https://docs.npmjs.com/cli/v10/commands/npm-run-script)。

## 示例 Example



```json
{
  "scripts": {
    "start": "node foo.js"
  }
}
```



```bash
npm start
> npm@x.x.x start> node foo.js
(foo.js output would be here)
```

## 配置 Configuration

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

​	如果为 true，npm 将不运行 `package.json` 文件中指定的脚本。

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

​	请注意，明确意图运行特定脚本的命令，例如 `npm start`、`npm stop`、`npm restart`、`npm test` 和 `npm run-script`，将仍然运行它们预期的脚本，即使设置了 `ignore-scripts`，但它们不会运行任何前置或后置脚本。

### `script-shell`

- Default: '/bin/sh' on POSIX systems, 'cmd.exe' on Windows
- 默认值：POSIX 系统上为 '/bin/sh'，Windows 上为 'cmd.exe'
- Type: null or String

The shell to use for scripts run with the `npm exec`, `npm run` and `npm init <package-spec>` commands.

​	用于通过 `npm exec`、`npm run` 和 `npm init <package-spec>` 命令运行脚本的 shell。

## See Also

- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm test](https://docs.npmjs.com/cli/v10/commands/npm-test)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)