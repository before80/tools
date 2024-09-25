+++
title = "在Ubuntu24.04上安装wine"
date = 2024-09-25T11:37:55+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++



## 安装步骤

```sh
sudo dpkg --add-architecture i386

sudo mkdir -pm755 /etc/apt/keyrings
sudo wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key

sudo add-apt-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ lunar main'

sudo apt install --install-recommends winehq-stable

# 若遇到下载中断，可使用以下命令继续下载

sudo apt install --fix-missing --install-recommends winehq-stable
```

参见：[https://gitlab.winehq.org/wine/wine/-/wikis/Debian-Ubuntu](https://gitlab.winehq.org/wine/wine/-/wikis/Debian-Ubuntu)



## 使用wine打开HBuilder X

​	右击`HBuilderX.exe`，在弹出的菜单中选择用`Wine Windows Program Loader`打开：

![image-20240925115421776](/home/lx/Hugos/tools/content/linux/installWineOnUbuntu2404_img/image-20240925115421776.png)

![image-20240925115451124](/home/lx/Hugos/tools/content/linux/installWineOnUbuntu2404_img/image-20240925115451124.png)

## 使用wine打开微信

```sh
wine WeChatSetup.exe
```

默认位置直接点击安装即可。（也许你和我一样，在思考路径：`C:\Program files\...`不是不存在么？）