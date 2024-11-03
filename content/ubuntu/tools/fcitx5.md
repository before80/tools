+++
title = "fcitx5 中文拼音"
date = 2024-11-03T09:14:06+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++



​	直接参见：[https://www.debuggerx.com/2023/09/20/fcitx5-customizer/](https://www.debuggerx.com/2023/09/20/fcitx5-customizer/)

部分摘录如下：

> ​	[Fcitx](https://wiki.archlinuxcn.org/wiki/Fcitx) (Flexible Input Method Framework) ──即小企鹅输入法，它是一个以 GPL 方式发布的输入法平台,是在 Linux 操作系统中常用的中文输入法。它的优点是，短小精悍、跟程序的兼容性比较好。而 [Fcitx5](https://wiki.archlinuxcn.org/wiki/Fcitx5) 则是 Fcitx 的接替版本，其 slogen 是 [maybe a new fcitx.](https://github.com/fcitx/fcitx5) 但是初始状态下的 Fcitx5 由于词库的缺失以及默认配置与很多人的习惯不同，所以需要进行一些修改和配置才能获得比较好的体验，于是我创建了一个专门用于优化 Fcitx5 的脚本——[fcitx5_customizer](https://github.com/debuggerx01/fcitx5_customizer)。
>
> **使用方法**
>
> ```sh
> # 完全自定义
> bash fcitx5_customizer.sh
> 
> # 使用推荐配置
> bash fcitx5_customizer.sh recommend
> 
> # 在线运行
> bash -c "$(curl -fsSL https://www.debuggerx.com/fcitx5_customizer/fcitx5_customizer.sh)"
> 
> # 在线运行并使用推荐配置
> curl -sSL https://www.debuggerx.com/fcitx5_customizer/fcitx5_customizer.sh | bash -s -- recommend
> ```
>
> **优化后使用技巧**
>
> > 当应用`配置快速输入`优化项后，可以利用快速输入(默认按V键进入该模式)来输入标点、特殊符号、时间日期，以及实现数字转大写金额等功能

