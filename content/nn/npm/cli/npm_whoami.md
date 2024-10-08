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

​	显示 npm 用户名

Version 10.9.0 (Latest)

## Synopsis



```bash
npm whoami
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## Description

Display the npm username of the currently logged-in user.

​	显示当前登录用户的 npm 用户名。

If logged into a registry that provides token-based authentication, then connect to the `/-/whoami` registry endpoint to find the username associated with the token, and print to standard output.

​	如果登录到提供基于令牌的身份验证的注册表，则连接到 `/-/whoami` 注册表端点以查找与该令牌关联的用户名，并打印到标准输出。

If logged into a registry that uses Basic Auth, then simply print the `username` portion of the authentication string.

​	如果登录到使用基本身份验证的注册表，则只需打印身份验证字符串中的 `username` 部分。

## 配置 Configuration

### `registry`

- Default: "https://registry.npmjs.org/"
- Type: URL

The base URL of the npm registry.

​	npm 注册表的基本 URL。

## See Also

- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm adduser](https://docs.npmjs.com/cli/v10/commands/npm-adduser)