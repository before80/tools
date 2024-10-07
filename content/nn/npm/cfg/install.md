+++
title = "install"
date = 2024-10-06T17:12:04+08:00
weight = 10
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

> 原文：[https://docs.npmjs.com/cli/v10/configuring-npm/install](https://docs.npmjs.com/cli/v10/configuring-npm/install)

Download and install node and npm

​	下载和安装 Node.js 和 npm

Version 10.9.0 (Latest)

## Description

To publish and install packages to and from the public npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer. **We strongly recommend using a Node version manager to install Node.js and npm.** We do not recommend using a Node installer, since the Node installation process installs npm in a directory with local permissions and can cause permissions errors when you run npm packages globally.

​	要将包发布到公共 npm 注册表或从中安装包，必须使用 Node 版本管理器或 Node 安装程序安装 Node.js 和 npm 命令行界面。**我们强烈推荐使用 Node 版本管理器来安装 Node.js 和 npm。** 我们不建议使用 Node 安装程序，因为在安装过程中，npm 会被安装到一个仅具有本地权限的目录中，这可能会导致在全局运行 npm 包时出现权限错误。

## Overview

## 检查你已安装的 npm 和 Node.js 版本 Checking your version of npm and Node.js

To see if you already have Node.js and npm installed and check the installed version, run the following commands:

​	要查看你是否已安装 Node.js 和 npm，并检查它们的版本，可以运行以下命令：

```bash
node -v
npm -v
```

## 使用 Node 版本管理器安装 Node.js 和 npm Using a Node version manager to install Node.js and npm

Node version managers allow you to install and switch between multiple versions of Node.js and npm on your system so you can test your applications on multiple versions of npm to ensure they work for users on different versions. You can [search for them on GitHub](https://github.com/search?q=node+version+manager+archived%3Afalse&type=repositories&ref=advsearch).

​	Node 版本管理器允许你在系统中安装并切换多个 Node.js 和 npm 的版本，这样可以在不同 npm 版本上测试应用程序，以确保它们在不同版本的环境中都能正常工作。你可以在 [GitHub 上搜索它们](https://github.com/search?q=node+version+manager+archived%3Afalse&type=repositories&ref=advsearch)。

## 使用 Node 安装程序安装 Node.js 和 npm Using a Node installer to install Node.js and npm

If you are unable to use a Node version manager, you can use a Node installer to install both Node.js and npm on your system.

​	如果无法使用 Node 版本管理器，你可以使用 Node 安装程序在系统上安装 Node.js 和 npm。

- [Node.js installer](https://nodejs.org/en/download/)
- [NodeSource installer](https://github.com/nodesource/distributions). If you use Linux, we recommend that you use a NodeSource installer. 如果你使用 Linux 系统，我们推荐使用 NodeSource 安装程序。

### OS X 或 Windows 系统安装程序 OS X or Windows Node installers

If you're using OS X or Windows, use one of the installers from the [Node.js download page](https://nodejs.org/en/download/). Be sure to install the version labeled **LTS**. Other versions have not yet been tested with npm.

​	如果你使用 OS X 或 Windows，请使用 [Node.js 下载页面](https://nodejs.org/en/download/)上的安装程序之一。请务必安装标记为 **LTS**（长期支持版）的版本。其他版本尚未经过 npm 的全面测试。

### Linux 或其他操作系统的安装程序 Linux or other operating systems Node installers

If you're using Linux or another operating system, use one of the following installers:

​	如果你使用 Linux 或其他操作系统，请使用以下安装程序之一：

- [NodeSource installer](https://github.com/nodesource/distributions) (recommended)
- [NodeSource 安装程序](https://github.com/nodesource/distributions)（推荐）
- One of the installers on the [Node.js download page](https://nodejs.org/en/download/)
- [Node.js 下载页面](https://nodejs.org/en/download/)上的安装程序之一

Or see [this page](https://nodejs.org/en/download/package-manager/) to install npm for Linux in the way many Linux developers prefer.

​	或查看 [此页面](https://nodejs.org/en/download/package-manager/) 了解 Linux 用户安装 npm 的首选方式。

### 较少使用的操作系统 Less-common operating systems

For more information on installing Node.js on a variety of operating systems, see [this page](https://nodejs.org/en/download/package-manager/).

​	有关在各种操作系统上安装 Node.js 的更多信息，请参阅 [此页面](https://nodejs.org/en/download/package-manager/)。