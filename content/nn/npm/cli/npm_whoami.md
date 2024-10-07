+++
title = "npm whoami"
date = 2024-10-06T15:48:15+08:00
weight = 650
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-whoami](https://docs.npmjs.com/cli/v10/commands/npm-whoami)

Display npm username



Version 10.9.0 (Latest)

## Synopsis



```bash
npm whoami
```

Note: This command is unaware of workspaces.

## Description

Display the npm username of the currently logged-in user.

If logged into a registry that provides token-based authentication, then connect to the `/-/whoami` registry endpoint to find the username associated with the token, and print to standard output.

If logged into a registry that uses Basic Auth, then simply print the `username` portion of the authentication string.

## Configuration

### `registry`

- Default: "https://registry.npmjs.org/"
- Type: URL

The base URL of the npm registry.

## See Also

- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm adduser](https://docs.npmjs.com/cli/v10/commands/npm-adduser)