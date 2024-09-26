+++
title = "软件包管理"
date = 2024-09-26T08:38:57+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## apt命令

​	`apt` 是较新的推荐工具，简化了以前的 `apt-get` 和 `apt-cache` 操作，主要用于管理软件包。

### sudo apt update

​	从软件源获取最新的软件包信息，更新软件包列表。

> 工作原理
>
> ​	当运行 `sudo apt update` 时，APT 包管理器会从配置的包源（通常在 `/etc/apt/sources.list` 和 `/etc/apt/sources.list.d/` 中定义）下载最新的软件包列表。这些列表包含了每个包的名称、版本号、依赖关系等信息。这些列表信息随后被存储到本地，以便在使用 `apt install` 或 `apt upgrade` 等命令时知道从哪里获取最新的软件包。
>
> 更新的内容
>
> ​	APT 从软件源下载的软件包信息主要包括：
>
> 1. **可用软件包的名称**
>
> 2. **软件包的版本号**
>
> 3. **软件包的依赖关系**
>
> 4. **软件包的下载地址**
>
> 5. **软件包的校验和**
>
>    这些信息让 APT 知道当前有哪些软件包可用，以及哪些软件包需要更新。
>
> 本地存储位置
>
> ​	APT 将从软件源下载的包信息保存在 `/var/lib/apt/lists/` 目录下。该目录中存储了多个与软件源对应的文件，每个文件都包含了特定源中的软件包信息。
>
> 具体文件：
>
> - `/var/lib/apt/lists/partial/`：临时存放下载中或未完成的文件。
> - `/var/lib/apt/lists/`：完整的软件包列表文件。这些文件包含软件包的名称、版本号、描述和依赖等信息，分别对应每个配置的软件源。
>
> 具体文件例子
>
> ​	假设你有一个 Ubuntu 官方软件源（比如 `archive.ubuntu.com`），在运行 `sudo apt update` 后，你会在 `/var/lib/apt/lists/` 目录下看到文件名类似于：
>
> - `archive.ubuntu.com_ubuntu_dists_noble_InRelease`
> - `archive.ubuntu.com_ubuntu_dists_noble-backports_universe_binary-amd64_Packages`
>
> 这些文件存储了对应源的包列表信息。例如，`Packages` 文件包含了该源中可用的所有软件包的详细列表，而 `InRelease` 文件则包含了源的签名信息和部分元数据。



### sudo apt upgrade

​	升级所有软件包，将系统中的所有软件包更新到最新版本。

> 

### sudo apt install pkg_name

​	安装指定的软件包

### sudo apt remove pkg_name

​	删除软件包，但保留配置文件

### sudo apt purge pkg_name

​	彻底删除软件包及其配置文件

### sudo apt list 

​	查看所有软件包

### sudo apt list --installed

​	查看已安装的软件包

### sudo apt list --upgradable

​	查看已安装的软件包中可升级的软件包

### sudo apt autoremove

​	自动删除已安装的软件包中无用的软件包

## apt-get命令

### sudo apt-get update

​	更新软件包列表。

### sudo apt-get upgrade

​	升级所有软件包。

### sudo apt-get install pkg_name

​	安装软件包。

### sudo apt-get remove pkg_name

​	删除软件包。

### sudo apt-get purge pkg_name

​	彻底删除软件包及配置文件。

### sudo apt-get -f install

​	修复依赖关系。

### sudo apt-get clean

​	清理缓存

## apt-add-repository命令

参见：[https://manned.org/man/ubuntu-noble/apt-add-repository.1](https://manned.org/man/ubuntu-noble/apt-add-repository.1)

-  添加一个 APT 仓库：

  ```sh
  apt-add-repository repository_spec
  ```

  

 - 移除一个 APT 仓库：
   
   ```sh
   apt-add-repository --remove repository_spec
   ```
   
   
   
 - 添加一个 APT 仓库之后更新包缓存：
   
   ```sh
   apt-add-repository --update repository_spec
   ```
   
   
   
 - 开启源码包：
   
   ```sh
   apt-add-repository --enable-source repository_spec
   ```
   
   

## apt-cache命令

- 在当前的软件源中查找一个软件包：
   
   ```sh
   apt-cache search pkg_name
   ```
   
   
   
 - 显示指定软件包的相关信息：
   
   ```sh
   apt-cache show pkg_name
   ```
   
   
   
 - 查看一个软件包是否安装或是否为最新：
   
   ```sh
   apt-cache policy pkg_name
   ```
   
   
   
 - 显示一个软件包的依赖项：
   
   ```sh
   apt-cache depends pkg_name
   ```
   
   
   
 - 列出依赖指定软件包的所有软件包：
   
   ```sh
   apt-cache rdepends pkg_name
   ```
   
   

## apt-config命令



## apt-key命令

- 列出可信密钥：
   apt-key list

 - 向可信密钥库中添加一个密钥：
   apt-key add public_key_file.asc

 - 从可信密钥库中移除一个密钥：
   apt-key del key_id

 - 向可信密钥库中添加一个远程密钥：
   wget -qO - https://host.tld/filename.key | apt-key add -

 - 指定密钥 ID, 从密钥服务器中添加一个密钥：
   apt-key adv --keyserver pgp.mit.edu --recv KEYID



## apt-mark命令

- 将一个软件包标记为自动安装：
  
   ```sh
   sudo apt-mark auto pkg_name
   ```
   
   
   
 - 将一个软件包保持在当前版本，防止对其更新：
   
   ```sh
   sudo apt-mark hold pkg_name
   ```
   
   
   
 - 允许对一个软件包更新：
   
   ```sh
   sudo apt-mark unhold pkg_name
   ```
   
   
   
 - 列出手动安装的软件包：
   
   ```sh
   apt-mark showmanual
   ```
   
   
   
 - 列出保持当前版本而不更新的软件包：
   
   ```sh
   apt-mark showhold
   ```
   
   

## dpkg命令

- Install a package:
   dpkg -i path/to/file.deb

 - Remove a package:
   dpkg -r package

 - List installed packages:
   dpkg -l pattern

 - List a package's contents:
   dpkg -L package

 - List contents of a local package file:
   dpkg -c path/to/file.deb

 - Find out which package owns a file:
   dpkg -S path/to/file

## aptitude命令

- 同步可用软件包及其版本列表，在运行后续 aptitude 命令前，应该首先运行该命令：
   aptitude update

 - 安装一个新的软件包及其依赖：
   aptitude install 软件包

 - 查找一个软件包：
   aptitude search 软件包

 - 查找一个已安装的软件包（?installed 是一个 aptitude 搜索项）：
   aptitude search '?installed(软件包)'

 - 移除一个软件包并移除所有依赖它的软件包：
   aptitude remove 软件包

 - 更新已安装软件包到最新版本：
   aptitude upgrade

 - 更新已安装的软件包（类似于 aptitude upgrade 命令），移除过时的软件包并安装额外的软件包以满足新的软件包依赖项：
   aptitude full-upgrade

 - 锁定一个已安装的软件包以便阻止它自动升级：
   aptitude hold '?installed(软件包)'

