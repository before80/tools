+++
title = "npm shrinkwrap"
date = 2024-10-06T15:46:33+08:00
weight = 510
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap)

Lock down dependency versions for publication



Version 10.9.0 (Latest)

## Synopsis



```bash
npm shrinkwrap
```

Note: This command is unaware of workspaces.

## Description

This command repurposes `package-lock.json` into a publishable `npm-shrinkwrap.json` or simply creates a new one. The file created and updated by this command will then take precedence over any other existing or future `package-lock.json` files. For a detailed explanation of the design and purpose of package locks in npm, see [package-lock-json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json).

## See Also

- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [npm-shrinkwrap.json](https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json)
- [npm ls](https://docs.npmjs.com/cli/v10/commands/npm-ls)