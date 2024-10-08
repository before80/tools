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

​	锁定依赖版本以供发布

Version 10.9.0 (Latest)

## Synopsis



```bash
npm shrinkwrap
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## Description

This command repurposes `package-lock.json` into a publishable `npm-shrinkwrap.json` or simply creates a new one. The file created and updated by this command will then take precedence over any other existing or future `package-lock.json` files. For a detailed explanation of the design and purpose of package locks in npm, see [package-lock-json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json).

​	此命令将 `package-lock.json` 重新用途为可发布的 `npm-shrinkwrap.json`，或简单地创建一个新的文件。由此命令创建和更新的文件将优先于任何其他现有或未来的 `package-lock.json` 文件。有关 npm 中包锁的设计和目的的详细说明，请参见 [package-lock-json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)。

## See Also

- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm run-script](https://docs.npmjs.com/cli/v10/commands/npm-run-script)
- [npm scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [npm-shrinkwrap.json](https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json)
- [npm ls](https://docs.npmjs.com/cli/v10/commands/npm-ls)