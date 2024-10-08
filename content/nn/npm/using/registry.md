+++
title = "注册表 registry"
date = 2024-10-06T17:20:46+08:00
weight = 10
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/using-npm/registry](https://docs.npmjs.com/cli/v10/using-npm/registry)

The JavaScript Package Registry

​	JavaScript 包注册表

Version 10.9.0 (Latest)

## Description

To resolve packages by name and version, npm talks to a registry website that implements the CommonJS Package Registry specification for reading package info.

​	为了根据包名和版本解析包信息，npm 会与实现了 CommonJS 包注册表规范的注册表网站进行通信，以读取包信息。

npm is configured to use the **npm public registry** at [https://registry.npmjs.org](https://registry.npmjs.org/) by default. Use of the npm public registry is subject to terms of use available at https://docs.npmjs.com/policies/terms.

​	npm 默认配置使用 **npm 公共注册表**，地址为 [https://registry.npmjs.org](https://registry.npmjs.org/)。使用 npm 公共注册表需遵守其使用条款，详见 https://docs.npmjs.com/policies/terms。

You can configure npm to use any compatible registry you like, and even run your own registry. Use of someone else's registry may be governed by their terms of use.

​	你可以配置 npm 使用任何兼容的注册表，甚至可以运行自己的注册表。使用他人的注册表可能受其使用条款的约束。

npm's package registry implementation supports several write APIs as well, to allow for publishing packages and managing user account information.

​	npm 的包注册表实现还支持多个写入 API，用于发布包和管理用户账户信息。

The npm public registry is powered by a CouchDB database, of which there is a public mirror at https://skimdb.npmjs.com/registry.

​	npm 公共注册表基于 CouchDB 数据库，并在 https://skimdb.npmjs.com/registry 提供了一个公开镜像。

The registry URL used is determined by the scope of the package (see [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope). If no scope is specified, the default registry is used, which is supplied by the [`registry` config](https://docs.npmjs.com/cli/v10/using-npm/config#registry) parameter. See [`npm config`](https://docs.npmjs.com/cli/v10/commands/npm-config), [`npmrc`](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc), and [`config`](https://docs.npmjs.com/cli/v10/using-npm/config) for more on managing npm's configuration. Authentication configuration such as auth tokens and certificates are configured specifically scoped to an individual registry. See [Auth Related Configuration](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc#auth-related-configuration)

​	注册表 URL 的使用由包的 scope（作用域）决定（请参阅 [`scope`](https://docs.npmjs.com/cli/v10/using-npm/scope)）。如果未指定作用域，则使用默认注册表，该注册表由 [`registry` 配置项](https://docs.npmjs.com/cli/v10/using-npm/config#registry) 参数提供。有关 npm 配置管理的更多信息，请参阅 [`npm config`](https://docs.npmjs.com/cli/v10/commands/npm-config)、[`npmrc`](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) 和 [`config`](https://docs.npmjs.com/cli/v10/using-npm/config)。与身份验证相关的配置（如身份验证令牌和证书）会专门配置在单个注册表的作用域中。详见 [身份验证相关配置](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc#auth-related-configuration)。

When the default registry is used in a package-lock or shrinkwrap it has the special meaning of "the currently configured registry". If you create a lock file while using the default registry you can switch to another registry and npm will install packages from the new registry, but if you create a lock file while using a custom registry packages will be installed from that registry even after you change to another registry.

​	当包锁文件（package-lock）或 shrinkwrap 文件中使用默认注册表时，它的特殊含义是“当前配置的注册表”。如果在使用默认注册表时创建了锁文件，则你可以切换到其他注册表，并从新注册表中安装包。但如果是在使用自定义注册表时创建的锁文件，即使之后切换到其他注册表，仍会从创建时的注册表中安装包。

## npm 会向注册表发送关于我的哪些信息？ Does npm send any information about me back to the registry?

Yes.

​	会发送一些信息。

When making requests of the registry npm adds two headers with information about your environment:

​	在请求注册表时，npm 会添加两个带有关于你环境信息的请求头：

- `Npm-Scope` – If your project is scoped, this header will contain its scope. In the future npm hopes to build registry features that use this information to allow you to customize your experience for your organization.
- `Npm-Scope` – 如果你的项目是有作用域的，此请求头将包含其作用域。未来 npm 希望利用此信息构建注册表功能，以便为你的组织定制使用体验。
- `Npm-In-CI` – Set to "true" if npm believes this install is running in a continuous integration environment, "false" otherwise. This is detected by looking for the following environment variables: `CI`, `TDDIUM`, `JENKINS_URL`, `bamboo.buildKey`. If you'd like to learn more you may find the [original PR](https://github.com/npm/npm-registry-client/pull/129) interesting. This is used to gather better metrics on how npm is used by humans, versus build farms.
- `Npm-In-CI` – 如果 npm 认为当前安装是在持续集成环境中运行，则设置为“true”，否则为“false”。这是通过检测以下环境变量来实现的：`CI`、`TDDIUM`、`JENKINS_URL`、`bamboo.buildKey`。如果你想了解更多，可以查看 [原始 PR](https://github.com/npm/npm-registry-client/pull/129)。此信息用于更好地区分 npm 是由人类使用还是由构建工具（如持续集成工具）使用。

The npm registry does not try to correlate the information in these headers with any authenticated accounts that may be used in the same requests.

​	npm 注册表不会尝试将这些请求头中的信息与同一请求中使用的任何身份认证账户进行关联。

## 如何防止我的包发布到官方注册表？ How can I prevent my package from being published in the official registry?

Set `"private": true` in your `package.json` to prevent it from being published at all, or `"publishConfig":{"registry":"http://my-internal-registry.local"}` to force it to be published only to your internal/private registry.

​	在 `package.json` 中设置 `"private": true` 以防止包被发布，或者使用 `"publishConfig":{"registry":"http://my-internal-registry.local"}` 强制包仅发布到你的内部/私有注册表。

See [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) for more info on what goes in the package.json file.

​	有关 `package.json` 文件中内容的更多信息，请参阅 [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)。

## 我（以及他人）发布的包在哪里可以找到？ Where can I find my (and others') published packages?

https://www.npmjs.com/

## See also

- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [config](https://docs.npmjs.com/cli/v10/using-npm/config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm developers](https://docs.npmjs.com/cli/v10/using-npm/developers)