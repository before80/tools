+++
title = "npm help-search"
date = 2024-10-06T15:42:28+08:00
weight = 230
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-help-search](https://docs.npmjs.com/cli/v10/commands/npm-help-search)

Search npm help documentation



Version 10.9.0 (Latest)

## Synopsis



```bash
npm help-search <text>
```

Note: This command is unaware of workspaces.

## Description

This command will search the npm markdown documentation files for the terms provided, and then list the results, sorted by relevance.

If only one result is found, then it will show that help topic.

If the argument to `npm help` is not a known help topic, then it will call `help-search`. It is rarely if ever necessary to call this command directly.

## Configuration

### `long`

- Default: false
- Type: Boolean

Show extended information in `ls`, `search`, and `help-search`.

## See Also

- [npm](https://docs.npmjs.com/cli/v10/commands/npm)
- [npm help](https://docs.npmjs.com/cli/v10/commands/npm-help)