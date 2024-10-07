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



Version 10.9.0 (Latest)

## Synopsis



```bash
npm test [-- <args>]
aliases: tst, t
```

## Description

This runs a predefined command specified in the `"test"` property of a package's `"scripts"` object.

## Example



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

## Configuration

### `ignore-scripts`

- Default: false
- Type: Boolean

If true, npm does not run scripts specified in package.json files.

Note that commands explicitly intended to run a particular script, such as `npm start`, `npm stop`, `npm restart`, `npm test`, and `npm run-script` will still run their intended script if `ignore-scripts` is set, but they will *not* run any pre- or post-scripts.

### `script-shell`

- Default: '/bin/sh' on POSIX systems, 'cmd.exe' on Windows
- Type: null or String

The shell to use for scripts run with the `npm exec`, `npm run` and `npm init <package-spec>` commands.

## See Also

- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)