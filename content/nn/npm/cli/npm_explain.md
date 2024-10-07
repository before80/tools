+++
title = "npm explain"
date = 2024-10-06T15:41:43+08:00
weight = 180
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-explain](https://docs.npmjs.com/cli/v10/commands/npm-explain)

Explain installed packages



Version 10.9.0 (Latest)

## Synopsis



```bash
npm explain <package-spec>
alias: why
```

## Description

This command will print the chain of dependencies causing a given package to be installed in the current project.

If one or more package specs are provided, then only packages matching one of the specifiers will have their relationships explained.

The package spec can also refer to a folder within `./node_modules`

For example, running `npm explain glob` within npm's source tree will show:



```bash
glob@7.1.6node_modules/glob  glob@"^7.1.4" from the root project
glob@7.1.1 devnode_modules/tacks/node_modules/glob  glob@"^7.0.5" from rimraf@2.6.2  node_modules/tacks/node_modules/rimraf    rimraf@"^2.6.2" from tacks@1.3.0    node_modules/tacks      dev tacks@"^1.3.0" from the root project
```

To explain just the package residing at a specific folder, pass that as the argument to the command. This can be useful when trying to figure out exactly why a given dependency is being duplicated to satisfy conflicting version requirements within the project.



```bash
$ npm explain node_modules/nyc/node_modules/find-up
find-up@3.0.0 dev
node_modules/nyc/node_modules/find-up
  find-up@"^3.0.0" from nyc@14.1.1
  node_modules/nyc
    nyc@"^14.1.1" from tap@14.10.8
    node_modules/tap
      dev tap@"^14.10.8" from the root project
```

## Configuration

### `json`

- Default: false
- Type: Boolean

Whether or not to output JSON data, rather than the normal output.

- In `npm pkg set` it enables parsing set values with JSON.parse() before saving them to your `package.json`.

Not supported by all npm commands.

### `workspace`

- Default:
- Type: String (can be set multiple times)

Enable running a command in the context of the configured workspaces of the current project while filtering by running only the workspaces defined by this configuration option.

Valid values for the `workspace` config are either:

- Workspace names
- Path to a workspace directory
- Path to a parent workspace directory (will result in selecting all workspaces within that folder)

When set for the `npm init` command, this may be set to the folder of a workspace which does not yet exist, to create the folder and set it up as a brand new workspace within the project.

This value is not exported to the environment for child processes.

## See Also

- [package spec](https://docs.npmjs.com/cli/v10/using-npm/package-spec)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm ls](https://docs.npmjs.com/cli/v10/commands/npm-ls)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm link](https://docs.npmjs.com/cli/v10/commands/npm-link)
- [npm prune](https://docs.npmjs.com/cli/v10/commands/npm-prune)
- [npm outdated](https://docs.npmjs.com/cli/v10/commands/npm-outdated)
- [npm update](https://docs.npmjs.com/cli/v10/commands/npm-update)