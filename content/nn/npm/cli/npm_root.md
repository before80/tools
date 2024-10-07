+++
title = "npm root"
date = 2024-10-06T15:45:43+08:00
weight = 470
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-root](https://docs.npmjs.com/cli/v10/commands/npm-root)

Display npm root



Version 10.9.0 (Latest)

## Synopsis



```bash
npm root
```

Note: This command is unaware of workspaces.

## Description

Print the effective `node_modules` folder to standard out.

Useful for using npm in shell scripts that do things with the `node_modules` folder. For example:



```bash
#!/bin/bash
global_node_modules="$(npm root --global)"
echo "Global packages installed in: ${global_node_modules}"
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

- [npm prefix](https://docs.npmjs.com/cli/v10/commands/npm-prefix)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)