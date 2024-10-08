+++
title = "scope"
date = 2024-10-06T17:21:36+08:00
weight = 50
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/using-npm/scope](https://docs.npmjs.com/cli/v10/using-npm/scope)

Scoped packages

​	作用域包

Version 10.9.0 (Latest)

## Description

All npm packages have a name. Some package names also have a scope. A scope follows the usual rules for package names (URL-safe characters, no leading dots or underscores). When used in package names, scopes are preceded by an `@` symbol and followed by a slash, e.g.

​	所有 npm 包都有一个名称。有些包名还包含一个作用域（scope）。作用域遵循包名的常规规则（只允许使用 URL 安全字符，不能以点或下划线开头）。当作用域用于包名时，前面会有一个 `@` 符号，并紧跟一个斜杠，例如：

```bash
@somescope/somepackagename
```

Scopes are a way of grouping related packages together, and also affect a few things about the way npm treats the package.

​	作用域是一种将相关包分组的方式，并且会影响 npm 处理这些包的某些方式。

Each npm user/organization has their own scope, and only you can add packages in your scope. This means you don't have to worry about someone taking your package name ahead of you. Thus it is also a good way to signal official packages for organizations.

​	每个 npm 用户/组织都有自己的作用域，只有你可以向你的作用域中添加包。这意味着你不必担心有人在你之前占用你的包名。因此，作用域也是一种表示组织官方包的好方式。

Scoped packages can be published and installed as of `npm@2` and are supported by the primary npm registry. Unscoped packages can depend on scoped packages and vice versa. The npm client is backwards-compatible with unscoped registries, so it can be used to work with scoped and unscoped registries at the same time.

​	从 `npm@2` 开始，可以发布和安装作用域包，并且它们受主 npm 注册表的支持。无作用域的包可以依赖作用域包，反之亦然。npm 客户端与无作用域注册表兼容，因此它可以同时处理有作用域和无作用域的注册表。

## 安装作用域包 Installing scoped packages

Scoped packages are installed to a sub-folder of the regular installation folder, e.g. if your other packages are installed in `node_modules/packagename`, scoped modules will be installed in `node_modules/@myorg/packagename`. The scope folder (`@myorg`) is simply the name of the scope preceded by an `@` symbol, and can contain any number of scoped packages.

​	作用域包会被安装到常规安装文件夹的子文件夹中。例如，如果你的其他包安装在 `node_modules/packagename`，那么作用域模块将会安装在 `node_modules/@myorg/packagename` 中。作用域文件夹（`@myorg`）只是作用域名称前面加上 `@` 符号，并且可以包含任意数量的作用域包。

A scoped package is installed by referencing it by name, preceded by an `@` symbol, in `npm install`:

​	安装作用域包时，在 `npm install` 中通过在名称前添加 `@` 符号来引用它们，例如：

```bash
npm install @myorg/mypackage
```

Or in `package.json`:

​	或者在 `package.json` 中这样写：

```json
"dependencies": {
  "@myorg/mypackage": "^1.3.0"
}
```

Note that if the `@` symbol is omitted, in either case, npm will instead attempt to install from GitHub; see [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install).

​	请注意，如果在任何一种情况下省略了 `@` 符号，npm 会尝试从 GitHub 安装；请参阅 [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install)。

## 引用作用域包 Requiring scoped packages

Because scoped packages are installed into a scope folder, you have to include the name of the scope when requiring them in your code, e.g.

​	由于作用域包是安装到一个作用域文件夹中，因此你在代码中引用它们时需要包含作用域名称，例如：

```javascript
require("@myorg/mypackage");
```

There is nothing special about the way Node treats scope folders. This simply requires the `mypackage` module in the folder named `@myorg`.

​	Node 处理作用域文件夹时没有什么特殊之处。这只是简单地引入了 `@myorg` 文件夹中的 `mypackage` 模块。

## 发布作用域包 Publishing scoped packages

Scoped packages can be published from the CLI as of `npm@2` and can be published to any registry that supports them, including the primary npm registry.

​	从 `npm@2` 开始，可以通过 CLI 发布作用域包，并可以发布到支持它们的任何注册表，包括主 npm 注册表。

(As of 2015-04-19, and with npm 2.0 or better, the primary npm registry **does** support scoped packages.)

​	（截至 2015-04-19，并且 npm 版本为 2.0 或更高时，主 npm 注册表 **确实** 支持作用域包。）

If you wish, you may associate a scope with a registry; see below.

​	如果你愿意，你可以将一个作用域与注册表关联；请参阅下文。

### 向主 npm 注册表发布公共作用域包 Publishing public scoped packages to the primary npm registry

Publishing to a scope, you have two options:

​	发布到一个作用域时，你有两个选项：

- Publishing to your user scope (example: `@username/module`)
- 发布到你的用户作用域（例如：`@username/module`）
- Publishing to an organization scope (example: `@org/module`)
- 发布到组织作用域（例如：`@org/module`）

If publishing a public module to an organization scope, you must first either create an organization with the name of the scope that you'd like to publish to or be added to an existing organization with the appropriate permissions. For example, if you'd like to publish to `@org`, you would need to create the `org` organization on npmjs.com prior to trying to publish.

​	如果你想向组织作用域发布公共模块，你必须先创建一个与你希望发布的作用域名称相同的组织，或者被添加到具有适当权限的现有组织中。例如，如果你想发布到 `@org`，你需要在尝试发布之前在 npmjs.com 上创建 `org` 组织。

Scoped packages are not public by default. You will need to specify `--access public` with the initial `npm publish` command. This will publish the package and set access to `public` as if you had run `npm access public` after publishing. You do not need to do this when publishing new versions of an existing scoped package.

​	默认情况下，作用域包不是公共的。你需要在初始 `npm publish` 命令中指定 `--access public`。这会发布包，并将访问权限设置为 `public`，就像在发布后运行了 `npm access public` 一样。发布现有作用域包的新版本时不需要这样做。

### 向 npm 注册表发布私有作用域包 Publishing private scoped packages to the npm registry

To publish a private scoped package to the npm registry, you must have an [npm Private Modules](https://docs.npmjs.com/private-modules/intro) account.

​	要向 npm 注册表发布私有作用域包，你必须拥有一个 [npm 私有模块](https://docs.npmjs.com/private-modules/intro) 账户。

You can then publish the module with `npm publish` or `npm publish --access restricted`, and it will be present in the npm registry, with restricted access. You can then change the access permissions, if desired, with `npm access` or on the npmjs.com website.

​	然后你可以使用 `npm publish` 或 `npm publish --access restricted` 发布该模块，它会出现在 npm 注册表中，但具有受限访问权限。之后，如果需要，你可以使用 `npm access` 命令或在 npmjs.com 网站上更改访问权限。

## 将作用域与注册表关联 Associating a scope with a registry

Scopes can be associated with a separate registry. This allows you to seamlessly use a mix of packages from the primary npm registry and one or more private registries, such as [GitHub Packages](https://github.com/features/packages) or the open source [Verdaccio](https://verdaccio.org/) project.

​	作用域可以与一个单独的注册表关联。这使你可以无缝地同时使用来自主 npm 注册表和一个或多个私有注册表（例如 [GitHub Packages](https://github.com/features/packages) 或开源项目 [Verdaccio](https://verdaccio.org/)）的包。

You can associate a scope with a registry at login, e.g.

​	你可以在登录时将一个作用域与一个注册表关联，例如：

```bash
npm login --registry=http://reg.example.com --scope=@myco
```

Scopes have a many-to-one relationship with registries: one registry can host multiple scopes, but a scope only ever points to one registry.

​	作用域与注册表的关系是多对一的：一个注册表可以托管多个作用域，但一个作用域只能指向一个注册表。

You can also associate a scope with a registry using `npm config`:

​	你还可以使用 `npm config` 将作用域与注册表关联：

```bash
npm config set @myco:registry=http://reg.example.com
```

Once a scope is associated with a registry, any `npm install` for a package with that scope will request packages from that registry instead. Any `npm publish` for a package name that contains the scope will be published to that registry instead.

​	一旦将作用域与注册表关联，任何带有该作用域的包的 `npm install` 请求都将从该注册表获取包。任何带有该作用域的包名的 `npm publish` 请求都将发布到该注册表。

## See also

- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm publish](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [npm access](https://docs.npmjs.com/cli/v10/commands/npm-access)
- [npm registry](https://docs.npmjs.com/cli/v10/using-npm/registry)