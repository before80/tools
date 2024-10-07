+++
title = "VMware Workstation Pro for Personal Use (For Linux) 17.6"
date = 2024-10-06T19:59:13+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## 下载地址

[https://support.broadcom.com/group/ecx/productfiles?subFamily=VMware%20Workstation%20Pro&displayGroup=VMware%20Workstation%20Pro%2017.0%20for%20Personal%20Use%20(Linux)&release=17.6&os=&servicePk=522392&language=EN](https://support.broadcom.com/group/ecx/productfiles?subFamily=VMware%20Workstation%20Pro&displayGroup=VMware%20Workstation%20Pro%2017.0%20for%20Personal%20Use%20(Linux)&release=17.6&os=&servicePk=522392&language=EN)

## 授予 `.bundle` 文件执行权限

```sh
cd /path/to/your/file   # 替换为你的 .bundle 文件所在的路径
sudo chmod +x filename.bundle
```

## 运行 `.bundle` 安装文件

```
sudo ./filename.bundle
```

## 卸载

```sh
lx@lxm:~/Hugos/tools$ sudo vmware-installer --uninstall-product vmware-workstation
[sudo] lx 的密码： 
All configuration information is about to be removed. Do you wish to
keep your configuration files? You can also input 'quit' or 'q' to
cancel uninstallation. [yes]: yes
```

