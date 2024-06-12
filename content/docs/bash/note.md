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

​	即，`\`。

​	`\`可以保留紧随其后的下一个字符的原始值，但不包括换行符。

> 注意，若`\`紧随其后的下一个字符是换行符，则`\`相当于续行符，且`\`并不会出现在最后的字符串中。

##### 单引号

​	单引号中不能再出现单引号，即使其前面有`\`。

​	例如，

```sh
lx@lxm:~$ echo 'It\'s a cat.'
```

​	将会有以下效果：

```sh
lx@lxm:~$ echo 'It\'s a cat.'
> 
```

​	即会有一个`>`等着你继续输入，直到你输入一个单引号。

```sh
lx@lxm:~$ echo 'It\'s a cat.'
> Yes, a cute cat.' 
It\s a cat.
Yes, a cute cat.
lx@lxm:~$ 
```

​	但，我们也会发现，即使在单引号中使用`\'`的添加了一个`'`，最终输出的字符串中也没有`'`。

##### 双引号

​	双引号中是否可以再出现双引号？

=> 可以，但需要使用`\`进行转义。

```sh
lx@lxm:~$ echo "\"Go\" is a programming lanugage."
"Go" is a programming lanugage.
```



##### ANSI-C 引用

##### 特定区域设置翻译

#### 注释

​	以`#`开头的行是注释行。

​	以`#!`开头则是用于指定程序的解释器。`#!`之后加不加空格都可以，标准做法是不加空格！`#!`的使用方式有：

（a）直接指定解释器路径（或加选项）。

（a.a）不加选项：

```sh
#!/usr/bin/bash

#!/usr/bin/python3

#!/usr/bin/perl
```

（a.b）加选项

```sh
# -f 是 AWK 的一个选项，用于告诉 AWK 解释器从文件中读取 AWK 程序
#!/usr/bin/awk -f

# -e 是 Bash 的一个选项，用于控制脚本在遇到错误时的行为。
# 即，-e 选项告诉解释器在脚本中任何命令失败时（即返回非零退出状态）立即退出。
# 这对于编写可靠的脚本非常有用，因为它可以防止脚本继续运行并在发生错误时导致不可预测的结果
#!/usr/bin/bash -e

# -x：开启调试模式。在执行每一条命令之前打印该命令
#!/usr/bin/bash -x

# -u：在脚本中使用未定义变量时立即退出，并显示错误信息
#!/usr/bin/bash -u

# -o pipefail：确保管道中的每个命令都成功时才认为整个管道成功。如果任意命令失败，则整个管道失败。
#!/usr/bin/bash -e -o pipefail
```

`#!/usr/bin/bash -e`示例

​	新建`bash_e_option.sh`文件，其内容如下：

```sh
#!/usr/bin/bash -e

echo "Starting script..."
false
echo "This will not be printed."
```

> 说明：`false` 是一个总是返回非零状态的命令。因为使用了 `-e` 选项，当 `false` 命令失败时，脚本会立即退出，后续的命令不会被执行。

```sh
lx@lxm:~/testDir/shell$ chmod u+x bash_e_option.sh
lx@lxm:~/testDir/shell$ ./bash_e_option.sh
Starting script...
```

​	可以看到，脚本在 `false` 命令失败后立即退出，`"This will not be printed."` 不会被打印。



`#!/usr/bin/bash -x`示例

​	新建`bash_x_option.sh`文件，其内容如下：

```sh
#!/usr/bin/bash -x

echo "Starting script..."
ls /nonexistent
echo "This will be printed."
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x bash_x_option.sh
lx@lxm:~/testDir/shell$ ./bash_x_option.sh
+ echo 'Starting script...'
Starting script...
+ ls /nonexistent
ls: cannot access '/nonexistent': No such file or directory
+ echo 'This will be printed.'
This will be printed.
```

`#!/usr/bin/bash -u`示例：

​	新建`bash_u_option.sh`文件，其内容如下：

```sh
#!/usr/bin/bash -u

echo "Starting script..."
echo $UNDEFINED_VARIABLE
echo "This will not be printed."
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x bash_u_option.sh
lx@lxm:~/testDir/shell$ ./bash_u_option.sh
Starting script...
./bash_u_option.sh: line 4: UNDEFINED_VARIABLE: unbound variable
```

`#!/usr/bin/bash -e -o pipefail`示例

​	新建`bash_o_pipefail_option.sh`文件，其内容如下：

```sh
#!/usr/bin/bash

# Enable pipefail and errexit options
set -o pipefail
set -o errexit
# set -o errexit 等效于 set -e 或 #!/usr/bin/bash -e

echo "Starting script..."

# This command will fail
ls /nonexistent_directory | grep "some_pattern"

# This line will not be executed if the above command fails
echo "This will not be printed if the previous command fails."
```

> 说明：`set -o pipefail` 仅确保管道中的任何命令失败会导致整个管道返回非零状态，但不会自动退出脚本。为了使脚本在管道命令失败时退出，需要结合 `set -e`（或 `set -o errexit`）选项。
>
> ​	另外，
>
> ​	`set -o errexit`：相当于 `/usr/bin/bash -e`，任何命令失败时，脚本立即退出。
>
> ​	`set -o nounset`：相当于 `/usr/bin/bash -u`，在脚本中使用未定义的变量时立即退出。

```sh
lx@lxm:~/testDir/shell$ chmod u+x bash_o_pipefail_option.sh
lx@lxm:~/testDir/shell$ ./bash_o_pipefail_option.sh 
Starting script...
ls: cannot access '/nonexistent_directory': No such file or directory
```

（b）使用`/usr/bin/env`。 

> 说明：因不同系统上的解释器路径可能不同，使用`/usr/bin/env`的方式可以提高脚本的兼容性。

（b.a）无选项

```sh
#!/usr/bin/env bash

#!/usr/bin/env python3

#!/usr/bin/env perl
```

（b.b）加选项

> 是否可以直接加选项？
>
> => 不可以。请看以下错误示例：
>
> ```sh
> # 错误示例
> #!/usr/bin/env bash -e
> ```
>
> `#!/usr/bin/env bash -e`示例
>
> ​	新建`env_bash_e_option.sh`文件，其内容如下：
>
> ```sh
> #!/usr/bin/env bash -e
> 
> echo "Starting script..."
> false
> echo "This will not be printed."
> ```
>
> > 说明：`false` 是一个总是返回非零状态的命令。因为使用了 `-e` 选项，当 `false` 命令失败时，脚本会立即退出，后续的命令不会被执行。
>
> ```sh
> lx@lxm:~/testDir/shell$ chmod u+x env_bash_e_option.sh
> lx@lxm:~/testDir/shell$ ./env_bash_e_option.sh 
> /usr/bin/env: ‘bash -e’: No such file or directory
> /usr/bin/env: use -[v]S to pass options in shebang lines
> ```
>
> ​	按照错误提示，我们先修改成`#!/usr/bin/env -S bash -e`：
>
> ```sh
> #!/usr/bin/env -S bash -e
> 
> echo "Starting script..."
> false
> echo "This will not be printed."
> ```
>
> ```sh
> lx@lxm:~/testDir/shell$ ./env_bash_e_option.sh 
> Starting script...
> ```
>
> ​	再修改成`#!/usr/bin/env -vS bash -e`：
>
> ```sh
> #!/usr/bin/env -vS bash -e
> 
> echo "Starting script..."
> false
> echo "This will not be printed."
> ```
>
> ```sh
> lx@lxm:~/testDir/shell$ ./env_bash_e_option.sh 
> split -S:  ‘bash -e’
>  into:    ‘bash’
>      &    ‘-e’
> executing: bash
>    arg[0]= ‘bash’
>    arg[1]= ‘-e’
>    arg[2]= ‘./env_bash_e_option.sh’
> Starting script...
> ```
>
> ​	我们可以发现，通过`#!/usr/bin/env -S bash -e`确实可以向`bash`传递`-e`选项，而`#!/usr/bin/env -vS bash -e`可以进一步打印出详细信息。
>
> ​	其他选项`-x`、`-u`用法和`-e`类似，这里不在赘述。



### Shell命令

##### 保留字

​	共24个。以下单词在未加引号的情况下， 被识别为保留字。

```sh
if      then      elif      else    fi        time
for     in        until     while   do        done
case    esac      coproc    select  function  
{        }        [[        ]]      !
```



##### 简单命令

​	第一个单词为要执行的命令名称，其余单词为该命令的参数，单词之间使用空格进行分隔。

​	简单命令的返回状态，是由`POSIX 1003.1`中的`waitpid`函数提供的退出状态码，若简单命令被信号n终止，则退出状态码为`128+n`。

说明下`128+n`

​	新建`wait_exit_status.sh`，其内容如下：

```sh
#!/usr/bin/env bash

echo "This is a test script."
echo -n "Enter a number(>=0):"
read num

if [ $num -eq 0 ]; then
    # 正常退出
    echo "Normal exit"
    exit 0
elif [ $num -gt 0 ]; then
    # 模拟被信号终止
    # (需要手动发送信号，可以用 `kill -9 <PID>` 终止该脚本)
    sleep 100 &
    PID=$!
    echo "Background PID is $PID"
    kill -$num $PID
    wait $PID
fi
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x wait_exit_status.sh
lx@lxm:~/testDir/shell$ ./wait_exit_status.sh 
This is a test script.
Enter a number(>=0):9
Background PID is 11820
./wait_exit_status.sh: line 18: 11820 Killed                  sleep 100
lx@lxm:~/testDir/shell$ echo "Exit status: $?"
Exit status: 137
lx@lxm:~/testDir/shell$ ./wait_exit_status.sh 
This is a test script.
Enter a number(>=0):10
Background PID is 12158
./wait_exit_status.sh: line 18: 12158 User defined signal 1   sleep 100
lx@lxm:~/testDir/shell$ echo "Exit status: $?"
Exit status: 138
lx@lxm:~/testDir/shell$ 
```

​	可见，137 = 128 + 9，138 = 128 + 10。

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