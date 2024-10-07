+++
title = "npm logout"
date = 2024-10-06T15:43:30+08:00
weight = 310
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-logout](https://docs.npmjs.com/cli/v10/commands/npm-logout)

Log out of the registry



Version 10.9.0 (Latest)

## Synopsis



```bash
npm logout
```

Note: This command is unaware of workspaces.

## Description

When logged into a registry that supports token-based authentication, tell the server to end this token's session. This will invalidate the token everywhere you're using it, not just for the current environment.

When logged into a legacy registry that uses username and password authentication, this will clear the credentials in your user configuration. In this case, it will *only* affect the current environment.

If `--scope` is provided, this will find the credentials for the registry connected to that scope, if set.

## Configuration

### `registry`

- Default: "https://registry.npmjs.org/"
- Type: URL

The base URL of the npm registry.

### `scope`

- Default: the scope of the current project, if any, or ""
- Type: String

Associate an operation with a scope for a scoped registry.

Useful when logging in to or out of a private registry:



```bash
# log in, linking the scope to the custom registrynpm login --scope=@mycorp --registry=https://registry.mycorp.com
# log out, removing the link and the auth tokennpm logout --scope=@mycorp
```

This will cause `@mycorp` to be mapped to the registry for future installation of packages specified according to the pattern `@mycorp/package`.

This will also cause `npm init` to create a scoped package.



```bash
# accept all defaults, and create a package named "@foo/whatever",
# instead of just named "whatever"
npm init --scope=@foo --yes
```

## See Also

- [npm adduser](https://docs.npmjs.com/cli/v10/commands/npm-adduser)
- [npm registry](https://docs.npmjs.com/cli/v10/using-npm/registry)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npm whoami](https://docs.npmjs.com/cli/v10/commands/npm-whoami)