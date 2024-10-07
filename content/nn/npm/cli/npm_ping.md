+++
title = "npm ping"
date = 2024-10-06T15:44:10+08:00
weight = 370
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-ping](https://docs.npmjs.com/cli/v10/commands/npm-ping)

Ping npm registry



Version 10.9.0 (Latest)

## Synopsis



```bash
npm ping
```

Note: This command is unaware of workspaces.

## Description

Ping the configured or given npm registry and verify authentication. If it works it will output something like:



```bash
npm notice PING https://registry.npmjs.org/
npm notice PONG 255ms
```

otherwise you will get an error:



```bash
npm notice PING http://foo.com/
npm ERR! code E404
npm ERR! 404 Not Found - GET http://www.foo.com/-/ping?write=true
```

## Configuration

### `registry`

- Default: "https://registry.npmjs.org/"
- Type: URL

The base URL of the npm registry.

## See Also

- [npm doctor](https://docs.npmjs.com/cli/v10/commands/npm-doctor)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)