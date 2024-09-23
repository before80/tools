+++
title = "按照功能分类"
date = 2023-10-10T18:58:42+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 按照功能分类

## 命令帮助

man

info

help

apropos

## 软件包管理

- [yum](../yum) -  Yellowdog Updater Modified. yum  is an interactive, rpm based, package manager. It can automatically perform system updates, including dependency analysis and obsolete processing based on "repository" metadata. It can also perform  installation  of new packages, removal of old packages and perform queries on the installed and/or available packages among many other commands/services (see below). yum is similar to other high level  package  managers like apt-get and smart.

  While there are some graphical interfaces directly to the yum code, more recent graphical interface development is happening with PackageKit and the gnome-packagekit application.

- [dpkg](../dpkg) - package manager for Debian. 

- [apt](../apt) - command-line interface. apt provides a high-level commandline interface for the package management system. It is intended as an end user interface and enables some options better suited for interactive usage by default compared to more specialized  APT tools like apt-get(8) and apt-cache(8).

  Much like apt itself, its manpage is intended as an end user interface and as such only mentions the most used  commands and options partly to not duplicate information in multiple places and partly to avoid overwhelming  readers with a cornucopia of options and details. 

- [apt-get](../apt-get) - APT package handling utility -- command-line interface. apt-get is the command-line tool for handling packages, and may be considered the user's "back-end" to other tools using the  APT library. Several "front-end" interfaces exist, such as aptitude(8), synaptic(8) and wajig(1).

  Unless the -h, or --help option is given, one of the commands below must be present.

- [apt-cdrom]() - APT CD-ROM management utility. apt-cdrom is used to add a new CD-ROM to APT's list of available sources.  apt-cdrom takes care of determining the structure  of the disc as well as correcting for several possible mis-burns and verifying the index files.

  It is necessary to use apt-cdrom to add CDs to the APT system; it cannot be done by hand. Furthermore each disc in a multi-CD  set must be inserted and scanned separately to account for possible mis-burns.

  Unless the -h, or --help option is given, one of the commands below must be present.

- apt-ftparchive

- apturl-gtk

- apt-sortpkgs

- apt-dcon

- apt-extracttemplates

- apt-mark

- [apt-cache](../apt-cache) - apt-cache - query the APT cache. apt-cache performs a variety of operations on APT's package cache.  apt-cache does not manipulate the state of the system but does provide operations to search and generate interesting output from the package metadata. The metadata is acquired and updated via the 'update' command of e.g.  apt-get, so that it can be outdated if the last update is too long ago, but in exchange apt-cache works independently of the availability of the configured sources (e.g. offline).   Unless the -h, or --help option is given, one of the commands below must be present.

- [apt-config](../apt-config) - APT Configuration Query program. apt-config is an internal program used by various portions of the APT suite to provide consistent configurability. It accesses the main configuration file /etc/apt/apt.conf in a manner that is easy to use for scripted applications. Unless the -h, or --help option is given, one of the commands below must be present.

- [apt-key](../apt-key) - Deprecated APT key management utility. apt-key is used to manage the list of keys used by apt to authenticate packages. Packages which have been authenticated using these keys will be considered trusted.   Use of apt-key is deprecated, except for the use of apt-key del in maintainer scripts to remove existing keys from the main keyring. If such usage of apt-key is desired the additional installation of the GNU Privacy Guard suite (packaged in gnupg)  is required.  apt-key(8) will last be available in Debian 11 and Ubuntu 22.04.

- apturl

- [aptitude](../aptitude) - high-level interface to the package manager. aptitude is a text-based interface to the Debian GNU/Linux package system. It allows the user to view the list of packages and to perform package management tasks such as installing, upgrading, and removing packages. Actions may be performed from a visual interface or from the command-line.

  

## 查找文件

find

locate

which

findmnt

## 文件操作



## 文本处理



## 文件权限管理



## 查看文件内容



## 用户管理





进程管理

服务管理

