+++
title = "npm cache"
date = 2024-10-06T15:40:15+08:00
weight = 60
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/commands/npm-cache](https://docs.npmjs.com/cli/v10/commands/npm-cache)

Manipulates packages cache

​	操作包缓存

Version 10.9.0 (Latest)

## Synopsis



```bash
npm cache add <package-spec>
npm cache clean [<key>]
npm cache ls [<name>@<version>]
npm cache verify
```

Note: This command is unaware of workspaces.

​	注意：此命令不支持工作区。

## Description

Used to add, list, or clean the npm cache folder.

​	用于添加、列出或清理 npm 缓存文件夹。

- add: Add the specified packages to the local cache. This command is primarily intended to be used internally by npm, but it can provide a way to add data to the local installation cache explicitly.
- **add**：将指定的包添加到本地缓存。此命令主要用于 npm 的内部操作，但也可以提供一种明确地将数据添加到本地安装缓存的方法。

- clean: Delete all data out of the cache folder. Note that this is typically unnecessary, as npm's cache is self-healing and resistant to data corruption issues.
- **clean**：删除缓存文件夹中的所有数据。请注意，这通常是不必要的，因为 npm 的缓存是自愈的，并且能够抵御数据损坏问题。
- verify: Verify the contents of the cache folder, garbage collecting any unneeded data, and verifying the integrity of the cache index and all cached data.
- **verify**：验证缓存文件夹的内容，清理任何不必要的数据，并验证缓存索引及所有缓存数据的完整性。

## Details

npm stores cache data in an opaque directory within the configured `cache`, named `_cacache`. This directory is a [`cacache`](http://npm.im/cacache)-based content-addressable cache that stores all http request data as well as other package-related data. This directory is primarily accessed through `pacote`, the library responsible for all package fetching as of npm@5.

​	npm 在配置的 `cache` 目录中的一个不透明目录 `_cacache` 中存储缓存数据。该目录是一个基于 [`cacache`](http://npm.im/cacache) 的内容可寻址缓存，存储所有 HTTP 请求数据以及其他与包相关的数据。此目录主要通过 `pacote` 访问，`pacote` 是负责从 npm@5 开始获取所有包的库。

All data that passes through the cache is fully verified for integrity on both insertion and extraction. Cache corruption will either trigger an error, or signal to `pacote` that the data must be refetched, which it will do automatically. For this reason, it should never be necessary to clear the cache for any reason other than reclaiming disk space, thus why `clean` now requires `--force` to run.

​	所有经过缓存的数据在插入和提取时都进行完整性验证。缓存损坏将触发错误，或向 `pacote` 发出信号，表明必须重新获取数据，`pacote` 会自动执行此操作。因此，除了为了回收磁盘空间外，通常不需要清理缓存，这也是 `clean` 现在需要 `--force` 参数才能运行的原因。

There is currently no method exposed through npm to inspect or directly manage the contents of this cache. In order to access it, `cacache` must be used directly.

​	目前，npm 没有提供直接检查或管理此缓存内容的方法。要访问它，必须直接使用 `cacache`。

npm will not remove data by itself: the cache will grow as new packages are installed.

​	npm 不会自动删除数据：缓存会随着新包的安装而增长。

## 关于缓存设计的说明 A note about the cache's design

The npm cache is strictly a cache: it should not be relied upon as a persistent and reliable data store for package data. npm makes no guarantee that a previously-cached piece of data will be available later, and will automatically delete corrupted contents. The primary guarantee that the cache makes is that, if it does return data, that data will be exactly the data that was inserted.

​	npm 缓存严格来说是一个缓存：不应将其视为持久可靠的包数据存储。npm 不保证之前缓存的数据在之后会可用，并会自动删除损坏的内容。缓存的主要保证是，如果返回数据，该数据将与插入时的数据完全相同。

To run an offline verification of existing cache contents, use `npm cache verify`.

​	要离线验证现有缓存内容，请使用 `npm cache verify`。

## 配置 Configuration

### `cache`

- Default: Windows: `%LocalAppData%\npm-cache`, Posix: `~/.npm`
- 默认值：Windows: `%LocalAppData%\npm-cache`，Posix: `~/.npm`
- Type: Path

The location of npm's cache directory.

​	npm 缓存目录的位置。

## See Also

- [package spec](https://docs.npmjs.com/cli/v10/using-npm/package-spec)
- [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders)
- [npm config](https://docs.npmjs.com/cli/v10/commands/npm-config)
- [npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc)
- [npm install](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [npm publish](https://docs.npmjs.com/cli/v10/commands/npm-publish)
- [npm pack](https://docs.npmjs.com/cli/v10/commands/npm-pack)
- https://npm.im/cacache
- https://npm.im/pacote
- https://npm.im/@npmcli/arborist
- https://npm.im/make-fetch-happen