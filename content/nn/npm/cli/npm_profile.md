+++
title = "npm profile"
date = 2024-10-06T15:44:34+08:00
weight = 400
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-profile](https://docs.npmjs.com/cli/v10/commands/npm-profile)

Change settings on your registry profile

​	更改注册表个人资料上的设置

Version 10.9.0 (Latest)

## Synopsis



```bash
npm profile enable-2fa [auth-only|auth-and-writes]
npm profile disable-2fa
npm profile get [<key>]
npm profile set <key> <value>
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## Description

Change your profile information on the registry. Note that this command depends on the registry implementation, so third-party registries may not support this interface.

​	更改您在注册表上的个人资料信息。请注意，此命令依赖于注册表的实现，因此第三方注册表可能不支持此接口。

- `npm profile get [<property>]`: Display all of the properties of your profile, or one or more specific properties. It looks like:
- `npm profile get [<property>]`：显示您的个人资料的所有属性，或一个或多个特定属性。显示的内容如下：



```bash
name: example
email: e@example.com (verified)
two-factor auth: auth-and-writes
fullname: Example User
homepage:
freenode:
twitter:
github:
created: 2015-02-26T01:38:35.892Z
updated: 2017-10-02T21:29:45.922Z
```

- `npm profile set <property> <value>`: Set the value of a profile property. You can set the following properties this way: email, fullname, homepage, freenode, twitter, github
- `npm profile set <property> <value>`：设置个人资料属性的值。您可以通过这种方式设置以下属性：email、fullname、homepage、freenode、twitter、github
- `npm profile set password`: Change your password. This is interactive, you'll be prompted for your current password and a new password. You'll also be prompted for an OTP if you have two-factor authentication enabled.
- `npm profile set password`：更改您的密码。此过程为交互式，您将被提示输入当前密码和新密码。如果您启用了双因素身份验证，还将提示您输入一次性密码（OTP）。
- `npm profile enable-2fa [auth-and-writes|auth-only]`: Enables two-factor authentication. Defaults to `auth-and-writes` mode. Modes are:
- `npm profile enable-2fa [auth-and-writes|auth-only]`：启用双因素身份验证。默认为 `auth-and-writes` 模式。模式包括：
  - `auth-only`: Require an OTP when logging in or making changes to your account's authentication. The OTP will be required on both the website and the command line.
  - `auth-only`：在登录或更改账户身份验证时需要一次性密码（OTP）。在网站和命令行上都需要 OTP。
  - `auth-and-writes`: Requires an OTP at all the times `auth-only` does, and also requires one when publishing a module, setting the `latest` dist-tag, or changing access via `npm access` and `npm owner`.
  - `auth-and-writes`：在所有需要 OTP 的情况下（如 `auth-only`），以及在发布模块、设置 `latest` dist-tag 或通过 `npm access` 和 `npm owner` 更改访问权限时也需要 OTP。
- `npm profile disable-2fa`: Disables two-factor authentication.
- `npm profile disable-2fa`：禁用双因素身份验证。

## Details

Some of these commands may not be available on non npmjs.com registries.

​	某些命令可能在非 npmjs.com 注册表中不可用。

## 配置 Configuration

### `registry`

- Default: "https://registry.npmjs.org/"
- Type: URL

The base URL of the npm registry.

​	npm 注册表的基本 URL。

### `json`

- Default: false
- Type: Boolean

Whether or not to output JSON data, rather than the normal output.

​	是否输出 JSON 数据，而不是正常输出。

- In `npm pkg set` it enables parsing set values with JSON.parse() before saving them to your `package.json`.
- 在 `npm pkg set` 中，它允许在保存到 `package.json` 之前使用 JSON.parse() 解析设置的值。

Not supported by all npm commands.

​	并非所有 npm 命令都支持。

### `parseable`

- Default: false
- Type: Boolean

Output parseable results from commands that write to standard output. For `npm search`, this will be tab-separated table format.

​	从写入标准输出的命令中输出可解析的结果。对于 `npm search`，这将是制表符分隔的表格格式。

### `otp`

- Default: null
- Type: null or String

This is a one-time password from a two-factor authenticator. It's needed when publishing or changing package permissions with `npm access`.

​	这是来自双因素身份验证器的一次性密码。在发布或使用 `npm access` 更改包权限时需要它。

If not set, and a registry response fails with a challenge for a one-time password, npm will prompt on the command line for one.

​	如果未设置，且注册表响应因需要一次性密码而失败，npm 将在命令行上提示输入一次性密码。

## See Also

- [npm adduser](https://docs.npmjs.com/cli/v10/commands/npm-adduser)
- [npm registry](https://docs.npmjs.com/cli/v10/using-npm/registry)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm owner](https://docs.npmjs.com/cli/v10/commands/npm-owner)
- [npm whoami](https://docs.npmjs.com/cli/v10/commands/npm-whoami)
- [npm token](https://docs.npmjs.com/cli/v10/commands/npm-token)