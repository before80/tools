+++
title = "npm-shrinkwrap.json"
date = 2024-10-06T17:13:11+08:00
weight = 40
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json](https://docs.npmjs.com/cli/v10/configuring-npm/npm-shrinkwrap-json)

A publishable lockfile

​	可发布的锁定文件

Version 10.9.0 (Latest)

## Description

`npm-shrinkwrap.json` is a file created by [`npm shrinkwrap`](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap). It is identical to `package-lock.json`, with one major caveat: Unlike `package-lock.json`, `npm-shrinkwrap.json` may be included when publishing a package.

​	`npm-shrinkwrap.json` 是由 [`npm shrinkwrap`](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap) 命令生成的文件。它与 `package-lock.json` 文件完全相同，但有一个重要区别：与 `package-lock.json` 不同，`npm-shrinkwrap.json` 可以在发布包时被包含进去。

The recommended use-case for `npm-shrinkwrap.json` is applications deployed through the publishing process on the registry: for example, daemons and command-line tools intended as global installs or `devDependencies`. It's strongly discouraged for library authors to publish this file, since that would prevent end users from having control over transitive dependency updates.

​	`npm-shrinkwrap.json` 的推荐使用场景是通过注册表发布流程进行部署的应用程序，例如作为全局安装的守护程序和命令行工具，或者 `devDependencies`（开发依赖）。强烈建议库的作者不要发布此文件，因为这会阻止最终用户控制传递依赖项的更新。

If both `package-lock.json` and `npm-shrinkwrap.json` are present in a package root, `npm-shrinkwrap.json` will be preferred over the `package-lock.json` file.

​	如果在包的根目录中同时存在 `package-lock.json` 和 `npm-shrinkwrap.json` 文件，则 `npm-shrinkwrap.json` 将优先于 `package-lock.json` 文件。

For full details and description of the `npm-shrinkwrap.json` file format, refer to the manual page for [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json).

​	有关 `npm-shrinkwrap.json` 文件格式的详细信息和描述，请参阅 [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json) 的手册页。

## See also

- [npm shrinkwrap](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap)
- [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)