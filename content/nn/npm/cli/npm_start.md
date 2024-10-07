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



Version 10.9.0 (Latest)

## Synopsis



```bash
npm start [-- <args>]
```

## Description

This runs a predefined command specified in the `"start"` property of a package's `"scripts"` object.

If the `"scripts"` object does not define a `"start"` property, npm will run `node server.js`.

Note that this is different from the default node behavior of running the file specified in a package's `"main"` attribute when evoking with `node .`

As of [`npm@2.0.0`](https://blog.npmjs.org/post/98131109725/npm-2-0-0), you can use custom arguments when executing scripts. Refer to [`npm run-script`](https://docs.npmjs.com/cli/v10/commands/npm-run-script) for more details.

## Example



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
- [npm restart](https://docs.npmjs.com/cli/v10/commands/npm-restart)
- [npm stop](https://docs.npmjs.com/cli/v10/commands/npm-stop)