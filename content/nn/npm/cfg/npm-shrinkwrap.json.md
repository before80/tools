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



Version 10.9.0 (Latest)

## Description

`npm-shrinkwrap.json` is a file created by [`npm shrinkwrap`](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap). It is identical to `package-lock.json`, with one major caveat: Unlike `package-lock.json`, `npm-shrinkwrap.json` may be included when publishing a package.

The recommended use-case for `npm-shrinkwrap.json` is applications deployed through the publishing process on the registry: for example, daemons and command-line tools intended as global installs or `devDependencies`. It's strongly discouraged for library authors to publish this file, since that would prevent end users from having control over transitive dependency updates.

If both `package-lock.json` and `npm-shrinkwrap.json` are present in a package root, `npm-shrinkwrap.json` will be preferred over the `package-lock.json` file.

For full details and description of the `npm-shrinkwrap.json` file format, refer to the manual page for [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json).

## See also

- [npm shrinkwrap](https://docs.npmjs.com/cli/v10/commands/npm-shrinkwrap)
- [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)