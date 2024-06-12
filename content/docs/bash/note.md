+++
title = "bash 笔记"
date = 2024-06-11T12:15:47+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## 简介

什么是 Bash？
什么是 shell？

## 定义

## Shell基本特性

### Shell语法

#### Shell操作

#### 引用

##### 转义字符

##### 单引号

##### 双引号

##### ANSI-C 引用

##### 特定区域设置翻译

#### 注释

### Shell命令

##### 保留字

##### 简单命令

##### 管道

##### 命令列表

##### 复合命令

###### 循环结构



###### 条件结构



###### 命令分组



#### 协程 Coprocesses

#### GNU Parallel

### Shell 函数

### Shell 参数

#### 位置参数

#### 特殊参数

### Shell 扩展

#### 花括号扩展

#### 波浪号扩展

#### Shell参数扩展

##### 命令替换

##### 算术扩展

##### 进程替换

##### 单词分割

##### 文件名扩展

###### 模式匹配

##### 引号删除

### 重定向

#### 重定向输入

#### 重定向输出

#### 追加重定向输出

#### 重定向标准输出和标准错误输出

#### 追加标准输出和标准错误输出

#### Here Documents

#### Here Strings

#### 复制文件描述符

#### 移动文件描述符

#### 为读取和写入打开文件描述符

### 执行命令

#### 简单命令展开

#### 命令搜索和执行

#### 命令执行环境

#### 环境

#### 退出状态

#### 信号

### Shell 脚本

## Shell 内置命令

### Bourne Shell Builtins

### Bash 内置命令

### 修改Shell行为

#### 内置命令set

#### shopt内置命令

### 特殊内置命令

## Shell 变量

### Bourne Shell 变量

### Bash 变量

## Bash 特性

### 调用Bash

### Bash启动文件

 作为交互式登录shell调用，或使用–login选项
 作为交互式非登录shell调用
 非交互式调用
 使用名称sh调用
 在POSIX模式下调用
 被远程shell守护进程调用
 使用不相等的有效和真实UID/GID调用 Invoked with unequal effective and real UID/GIDs

### 交互式Shell

#### 什么是交互式Shell？

#### 此Shell是否为交互式？

#### 交互式Shell行为

### Bash 条件表达式

### Shell 算术

### 别名

### 数组

### 目录栈

#### 目录栈内置命令

### 控制提示符

### 受限制的Shell

### Bash的POSIX模式

### Shell Compatibility Mode

## 作业控制

### 作业控制基础

### 作业控制内置命令

### 作业控制变量

## 命令行编辑

### 命令行编辑简介

### Readline 交互

Readline 基本编辑
Readline 移动命令
Readline Killing Commands
Readline 参数
在历史记录中搜索命令

### Readline 初始化文件

Readline 初始化文件语法
条件初始化结构
示例初始化文件

### 可绑定的 Readline 命令

光标移动命令
历史记录操作命令
文本修改命令
剪切和粘贴 Killing And Yanking
指定数值参数
让 Readline 为你键入
键盘宏
一些杂项命令

### Readline vi 模式

### 可编程自动完成

### 可编程完成内置命令

### 可编程完成示例

## 交互式使用历史记录

### Bash 历史记录功能

### Bash历史内置命令

### 历史记录扩展

#### 事件设计符 Event Designators

#### 单词设计符 Word Designators

#### 修饰符

## 安装 Bash

### 基本安装

### 编译器和选项

### 为多种架构进行编译

### 安装名称

### 指定系统类型

### 共享默认设置

### 操作控制

### 可选功能

1附录 A: 报告 Bug
1附录 B: 与 Bourne Shell 的主要区别
 B.1 与 SVR4.2 Shell 的实现差异
1附录 C：GNU 自由文档许可证
 附录：如何在您的文档中使用本许可证