+++
title = "npm prefix"
date = 2024-10-06T15:44:21+08:00
weight = 390
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-prefix](https://docs.npmjs.com/cli/v10/commands/npm-prefix)

Display prefix



Version 10.9.0 (Latest)

## Synopsis



```bash
npm prefix [-g]
```

Note: This command is unaware of workspaces.

## Description

Print the local prefix to standard output. This is the closest parent directory to contain a `package.json` file or `node_modules` directory, unless `-g` is also specified.

If `-g` is specified, this will be the value of the global prefix. See [`npm config`](https://docs.npmjs.com/cli/v10/commands/npm-config) for more detail.

## Example



```bash
npm prefix
/usr/local/projects/foo
```



```bash
npm prefix -g
/usr/local
```

## Configuration

### `global`

- Default: false
- Type: Boolean

Operates in "global" mode, so that packages are installed into the `prefix` folder instead of the current working directory. See [folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders) for more on the differences in behavior.

- packages are installed into the `{prefix}/lib/node_modules` folder, instead of the current working directory.
- bin files are linked to `{prefix}/bin`
- man pages are linked to `{prefix}/share/man`

## See Also

- [npm root](https://docs.npmjs.com/cli/v10/commands/npm-root)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)