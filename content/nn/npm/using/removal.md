+++
title = "removal"
date = 2024-10-06T17:22:58+08:00
weight = 110
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/using-npm/removal](https://docs.npmjs.com/cli/v10/using-npm/removal)

Cleaning the Slate

​	清理 Slate

Version 10.9.0 (Latest)

## Synopsis

So sad to see you go.

​	很遗憾看到你要卸载 npm。

```bash
sudo npm uninstall npm -g
```

Or, if that fails, please proceed to more severe uninstalling methods.

​	如果以上命令无法卸载，请继续使用更彻底的卸载方法。

## 更彻底的卸载 More Severe Uninstalling

Usually, the above instructions are sufficient. That will remove npm, but leave behind anything you've installed.

​	通常，以上指令已经足够卸载 npm。这将卸载 npm 本身，但会保留所有你安装过的内容。

If that doesn't work, or if you require more drastic measures, continue reading.

​	如果这种方法不起作用，或者你需要更彻底的清理措施，请继续阅读。

Note that this is only necessary for globally-installed packages. Local installs are completely contained within a project's `node_modules` folder. Delete that folder, and everything is gone unless a package's install script is particularly ill-behaved.

​	注意，这些措施仅针对全局安装的包。局部安装的包完全包含在项目的 `node_modules` 文件夹中。只需删除该文件夹，所有内容都会被清除（除非某些包的安装脚本行为异常）。

This assumes that you installed node and npm in the default place. If you configured node with a different `--prefix`, or installed npm with a different prefix setting, then adjust the paths accordingly, replacing `/usr/local` with your install prefix.

​	以下假设你在默认位置安装了 node 和 npm。如果你使用了不同的 `--prefix` 参数配置 node，或者使用了不同的前缀设置安装 npm，那么请相应地调整路径，将 `/usr/local` 替换为你的安装前缀。

To remove everything npm-related manually:

​	要手动移除与 npm 相关的所有内容，请执行以下命令：

```bash
rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/npm*
```

If you installed things *with* npm, then your best bet is to uninstall them with npm first, and then install them again once you have a proper install. This can help find any symlinks that are lying around:

​	如果你使用 npm 安装了其他内容，最好的方法是先用 npm 卸载它们，然后在正确安装 npm 后再重新安装。这有助于找到遗留的符号链接（symlinks）：

```bash
ls -laF /usr/local/{lib/node{,/.npm},bin,share/man} | grep npm
```

Prior to version 0.3, npm used shim files for executables and node modules. To track those down, you can do the following:

​	在 0.3 版本之前，npm 使用了可执行文件和 node 模块的 shim 文件。要追踪这些文件，你可以执行以下命令：

```bash
find /usr/local/{lib/node,bin} -exec grep -l npm \{\} \; ;
```

## See also

- [npm uninstall](https://docs.npmjs.com/cli/v10/commands/npm-uninstall)
- [npm prune](https://docs.npmjs.com/cli/v10/commands/npm-prune)