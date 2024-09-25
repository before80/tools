+++
title = "在Ubuntu24.04上安装VirtualBox"
date = 2024-09-25T16:03:33+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++



```sh
# 
wget -O- https://www.virtualbox.org/download/oracle_vbox_2016.asc | sudo gpg --yes --output /usr/share/keyrings/oracle-virtualbox-2016.gpg --dearmor


echo "deb [arch=amd64 signed-by=/usr/share/keyrings/oracle-virtualbox-2016.gpg] http://download.virtualbox.org/virtualbox/debian $(. /etc/os-release && echo "$VERSION_CODENAME") contrib" | sudo tee /etc/apt/sources.list.d/virtualbox.list

# 更新软件包列表
sudo apt update

# 搜索最新版本的VirtualBox
sudo apt-cache search virtualbox

# 好像目前没法安装
# sudo apt install virtualbox-7.1

# 遇到错误时，接着运行以下
# sudo apt --fix-broken install

# 算了，直接使用以下命令安装
sudo apt install virtualbox
```

​	弹出以下内容

![image-20240925163635117](/home/lx/Hugos/tools/content/linux/installVirtualBoxOnUbuntu2404_img/image-20240925163635117.png)

> Your system has UEFI Secure Boot enable.
>
> ​	您的系统启用了 UEFI 安全启动。
>
> UEFI Secure Boot requires additional configuration to work with third-party drivers.  
>
> ​	UEFI 安全启动在使用第三方驱动程序时需要额外的配置。
>
> The system will assist you in configuring UEFI Secure Boot. To permit the use of third-party drivers, a new Machine-Owner Key (MOK)   has been generated. This key now needs to be enrolled in your system's firmware.        
>
> ​	系统将协助您配置 UEFI 安全启动。为了允许使用第三方驱动程序，已生成一个新的机器所有者密钥 (MOK)。现在需要将此密钥注册到您的系统固件中。
>
> To ensure that this change is being made by you as an authorized user, and not by an attacker, you must choose a password now and then confirm the change after reboot using the same password, in both the "Enroll MOK" and "Change Secure Boot state" menus that will be presented to you when this system reboots.         
>
> ​	为了确保这一变更由您这位授权用户而非攻击者发起，您必须现在选择一个密码，并在重启后使用同一密码确认变更，在重启时呈现给您的“注册 MOK”和“更改安全启动状态”菜单中。                                                                                 
>
> If you proceed but do not confirm the password upon reboot, Ubuntu will still be able to boot on your system but any hardware that requires third-party drivers to work correctly may not be usable.  
>
> ​	如果您继续操作但不在重启后确认密码，Ubuntu 仍能够在您的系统上启动，但任何需要第三方驱动程序才能正常工作的硬件可能无法使用。

​	点击`确定` （即按 `Enter`键）。

​	接着弹出：

![image-20240925164119098](/home/lx/Hugos/tools/content/linux/installVirtualBoxOnUbuntu2404_img/image-20240925164119098.png)

​	输入一个密码：`zlx920`

![image-20240925164231822](/home/lx/Hugos/tools/content/linux/installVirtualBoxOnUbuntu2404_img/image-20240925164231822.png)

​	接着输入相同的密码：`zlx920`

​	提示密码必须有8到16个字符：

![image-20240925164321001](/home/lx/Hugos/tools/content/linux/installVirtualBoxOnUbuntu2404_img/image-20240925164321001.png)

​	接着输入新的密码：`zlx920@@`，按`Enter`键进入。

​	查看是否已经安装：

```sh
sudo dpkg -L virtualbox
```