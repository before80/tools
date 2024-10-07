+++
title = "Deepin Terminal"
date = 2024-10-07T11:14:03+08:00
weight = 0
type = "docs"
description = "Deepin Terminal 是一个功能更加强大的终端模拟器，它提供了更多的功能，如标签页管理、终端分割等。"
isCJKLanguage = true
draft = false

+++

## 安装

```sh
sudo apt install deepin-terminal
```

## 设置为默认终端

```sh
sudo apt install dconf-cli

gsettings set org.gnome.desktop.default-applications.terminal exec 'deepin-terminal'


gsettings set org.gnome.desktop.default-applications.terminal exec-arg '-x'
```

## 修改回之前系统的默认终端

```sh
# 列出当前的默认终端设置
gsettings get org.gnome.desktop.default-applications.terminal exec

# 假如之前的默认终端是 gnome-terminal，可以使用以下命令恢复
gsettings set org.gnome.desktop.default-applications.terminal exec 'gnome-terminal'

gsettings set org.gnome.desktop.default-applications.terminal exec-arg '-x'

```

