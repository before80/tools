+++
title = "Nemo"
date = 2024-10-06T10:38:29+08:00
weight = 0
type = "docs"
description = "Nemo 是 Linux Mint 中的默认文件管理器，它基于 Nautilus 开发，但提供了更多高级功能，如双窗格、标签页和更丰富的插件支持。"
isCJKLanguage = true
draft = false

+++



## 安装 Nemo

```sh
sudo apt install nemo
```

## 设置 Nemo 为默认文件管理器（可选）

```sh
xdg-mime default nemo.desktop inode/directory application/x-gnome-saved-search
```



## 已设置Nemo为默认文件管理器后，如何打开之前系统默认的文件管理器`Nautilus`

​	方法1：在终端输入：nautilus

​	方法2：在应用菜单中搜索：nautilus

​	如果已经找不到，可以试下在终端输入：`nautilus --version` 查看下是否真的已经在系统上找不到。在找不到的情况下，可通过：`sudo apt install nautilus`命令重新安装下。