+++
title = "npm edit"
date = 2024-10-06T15:41:30+08:00
weight = 160
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-edit](https://docs.npmjs.com/cli/v10/commands/npm-edit)

Edit an installed package



Version 10.9.0 (Latest)

## Synopsis



```bash
npm edit <pkg>[/<subpkg>...]
```

Note: This command is unaware of workspaces.

## Description

Selects a dependency in the current project and opens the package folder in the default editor (or whatever you've configured as the npm `editor` config -- see [`npm-config`](https://docs.npmjs.com/npm-config).)

After it has been edited, the package is rebuilt so as to pick up any changes in compiled packages.

For instance, you can do `npm install connect` to install connect into your package, and then `npm edit connect` to make a few changes to your locally installed copy.

## Configuration

### `editor`

- Default: The EDITOR or VISUAL environment variables, or '%SYSTEMROOT%\notepad.exe' on Windows, or 'vi' on Unix systems
- Type: String

The command to run for `npm edit` and `npm config edit`.

## See Also

- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm explore](https://docs.npmjs.com/cli/v10/commands/npm-explore)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)