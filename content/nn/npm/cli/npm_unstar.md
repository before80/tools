+++
title = "npm unstar"
date = 2024-10-06T15:47:45+08:00
weight = 610
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-unstar](https://docs.npmjs.com/cli/v10/commands/npm-unstar)

Remove an item from your favorite packages



Version 10.9.0 (Latest)

## Synopsis



```bash
npm unstar [<package-spec>...]
```

Note: This command is unaware of workspaces.

## Description

"Unstarring" a package is the opposite of [`npm star`](https://docs.npmjs.com/cli/v10/commands/npm-star), it removes an item from your list of favorite packages.

## More

There's also these extra commands to help you manage your favorite packages:

### Star

You can "star" a package using [`npm star`](https://docs.npmjs.com/cli/v10/commands/npm-star)

### Listing stars

You can see all your starred packages using [`npm stars`](https://docs.npmjs.com/cli/v10/commands/npm-stars)

## Configuration

### `registry`

- Default: "https://registry.npmjs.org/"
- Type: URL

The base URL of the npm registry.

### `unicode`

- Default: false on windows, true on mac/unix systems with a unicode locale, as defined by the `LC_ALL`, `LC_CTYPE`, or `LANG` environment variables.
- Type: Boolean

When set to true, npm uses unicode characters in the tree output. When false, it uses ascii characters instead of unicode glyphs.

### `otp`

- Default: null
- Type: null or String

This is a one-time password from a two-factor authenticator. It's needed when publishing or changing package permissions with `npm access`.

If not set, and a registry response fails with a challenge for a one-time password, npm will prompt on the command line for one.

## See Also

- [npm star](https://docs.npmjs.com/cli/v10/commands/npm-star)
- [npm stars](https://docs.npmjs.com/cli/v10/commands/npm-stars)
- [npm view](https://docs.npmjs.com/cli/v10/commands/npm-view)
- [npm whoami](https://docs.npmjs.com/cli/v10/commands/npm-whoami)
- [npm adduser](https://docs.npmjs.com/cli/v10/commands/npm-adduser)