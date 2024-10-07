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



Version 10.9.0 (Latest)

## Synopsis



```bash
npm restart [-- <args>]
```

## Description

This restarts a project. It is equivalent to running `npm run-script restart`.

If the current project has a `"restart"` script specified in `package.json`, then the following scripts will be run:

1. prerestart
2. restart
3. postrestart

If it does *not* have a `"restart"` script specified, but it does have `stop` and/or `start` scripts, then the following scripts will be run:

1. prerestart
2. prestop
3. stop
4. poststop
5. prestart
6. start
7. poststart
8. postrestart

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
- [npm test](https://docs.npmjs.com/cli/v10/commands/npm-test)
- [npm start](https://docs.npmjs.com/cli/v10/commands/npm-start)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)