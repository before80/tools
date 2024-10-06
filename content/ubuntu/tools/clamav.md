+++
title = "ClamAV"
date = 2024-10-06T10:57:58+08:00
weight = 0
type = "docs"
description = "ClamAV 是一个开源的杀毒软件，专门为 Unix 系统设计。它支持检测多种类型的恶意软件，如病毒、木马、间谍软件等。"
isCJKLanguage = true
draft = false

+++

## 安装ClamAV

```sh
sudo apt update
sudo apt install clamav clamav-daemon
```

## 手动扫描文件夹

```sh
sudo clamscan -r /path/to/directory
```

## 更新病毒库

```sh
sudo freshclam
```

## 启动实时扫描守护进程

```sh
sudo systemctl start clamav-daemon
```

## 关闭 ClamAV 守护进程

```sh
sudo systemctl stop clamav-daemon
```

## 禁用ClamAV自动启动

```sh
sudo systemctl disable clamav-daemon
```

