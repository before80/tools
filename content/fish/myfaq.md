+++
title = "个人使用FAQ"
date = 2024-10-15T10:28:42+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## 为什么我安装了node却被提示找不到该命令？

​	你需要将node的安装路径添加到fish的fish_user_paths变量中，该fish变量的值会自动添加到系统环境变量`PATH`之前，例如：

```sh
set -U fish_user_paths /home/lx/.nvm/versions/node/v20.17.0/bin $fish_user_paths
```

然后执行：

```sh
exec fish
```

或者重新启动一个fish终端，已生效已配置fish变量，这样以来你就可以在fish终端中找到node的命令了。

## 如何清空fish_user_paths变量中的某一个配置项？

​	例如，你可以这样删除`/home/lx/xx`

```sh
set -U fish_user_paths (string match -v "/home/lx/xx" $fish_user_paths)
```

​	当然，如果fish_user_paths中的配置项，比较少，你完全可以重新配置，例如：

```sh
set -U fish_user_paths /home/lx/.nvm/versions/node/v20.17.0/bin
```

> 注意：
>
> `set -U fish_user_paths /home/lx/.nvm/versions/node/v20.17.0/bin`和`set -U fish_user_paths /home/lx/.nvm/versions/node/v20.17.0/bin $fish_user_paths`这两条命令是由区别的，前者是重新设置fish_user_path，后者是以往fish_user_paths前面插入新配置项。