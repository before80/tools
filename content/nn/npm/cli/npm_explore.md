+++
title = "npm explore"
date = 2024-10-06T15:41:56+08:00
weight = 190
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-explore](https://docs.npmjs.com/cli/v10/commands/npm-explore)

Browse an installed package



Version 10.9.0 (Latest)

## Synopsis



```bash
npm explore <pkg> [ -- <command>]
```

Note: This command is unaware of workspaces.

## Description

Spawn a subshell in the directory of the installed package specified.

If a command is specified, then it is run in the subshell, which then immediately terminates.

This is particularly handy in the case of git submodules in the `node_modules` folder:



```bash
npm explore some-dependency -- git pull origin master
```

Note that the package is *not* automatically rebuilt afterwards, so be sure to use `npm rebuild <pkg>` if you make any changes.

## Configuration

### `shell`

- Default: SHELL environment variable, or "bash" on Posix, or "cmd.exe" on Windows
- Type: String

The shell to run for the `npm explore` command.

## See Also

- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm edit](https://docs.npmjs.com/cli/v10/commands/npm-edit)
- [npm rebuild](https://docs.npmjs.com/cli/v10/commands/npm-rebuild)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)