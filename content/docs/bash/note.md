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
lx@lxm:~$ echo "\"Go\" is a programming language."
"Go" is a programming language.
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
> ​	`set -o errexit`：相当于 `#!/usr/bin/bash -e`，任何命令失败时，脚本立即退出。
>
> ​	`set -o nounset`：相当于 `#!/usr/bin/bash -u`，在脚本中使用未定义的变量时立即退出。

```sh
lx@lxm:~/testDir/shell$ chmod u+x bash_o_pipefail_option.sh
lx@lxm:~/testDir/shell$ ./bash_o_pipefail_option.sh 
Starting script...
ls: cannot access '/nonexistent_directory': No such file or directory
```

（b）使用`#!/usr/bin/env`。 

> 说明：因不同系统上的解释器路径可能不同，使用`#!/usr/bin/env`的方式可以提高脚本的兼容性。

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
> ​	其他选项`-x`、`-u`用法和`-e`类似，这里不再赘述。



### Shell命令

#### 保留字

​	共22个。以下单词在未加引号的情况下， 被识别为保留字。

​	可通过在命令行上执行`compgen -k`得到：

```sh
if      then      elif      else    fi        time
for     in        until     while   do        done
case    esac      coproc    select  function  
{        }        [[        ]]      !
```



#### 简单命令

​	第一个单词为要执行的命令名称，其余单词为该命令的参数或选项，单词之间使用空格进行分隔，即仅有一个命令。

> 选项，实际上是参数的一部分！

​	简单命令的返回状态，是由`POSIX 1003.1`中的`waitpid`函数提供的退出状态码，若简单命令被信号n终止，则退出状态码为`128+n`。

> 说明：`128+n`的状态码
>
> ​	新建`wait_exit_status.sh`，其内容如下：
>
> ```sh
> #!/usr/bin/env bash
> 
> echo "This is a test script."
> echo -n "Enter a number(>=0):"
> read num
> 
> if [ $num -eq 0 ]; then
>     # 正常退出
>     echo "Normal exit"
>     exit 0
> elif [ $num -gt 0 ]; then
>     # 模拟被信号终止
>     # (需要手动发送信号，可以用 `kill -9 <PID>` 终止该脚本)
>     sleep 100 &
>     PID=$!
>     echo "Background PID is $PID"
>     kill -$num $PID
>     wait $PID
> fi
> ```
>
> ```sh
> lx@lxm:~/testDir/shell$ chmod u+x wait_exit_status.sh
> lx@lxm:~/testDir/shell$ ./wait_exit_status.sh 
> This is a test script.
> Enter a number(>=0):9
> Background PID is 11820
> ./wait_exit_status.sh: line 18: 11820 Killed                  sleep 100
> lx@lxm:~/testDir/shell$ echo "Exit status: $?"
> Exit status: 137
> lx@lxm:~/testDir/shell$ ./wait_exit_status.sh 
> This is a test script.
> Enter a number(>=0):10
> Background PID is 12158
> ./wait_exit_status.sh: line 18: 12158 User defined signal 1   sleep 100
> lx@lxm:~/testDir/shell$ echo "Exit status: $?"
> Exit status: 138
> lx@lxm:~/testDir/shell$ 
> ```
>
> ​	可见，退出状态码 137 = 128 + 9，138 = 128 + 10。
>

###### 简单命令示例

```sh
# 打印当前目录
pwd

# 列出当前目录中的文件和目录
ls
# 或
ls -l

# 显示文件内容
cat filename.txt

# 创建一个新目录
mkdir new_directory

# 删除一个文件
rm filename.txt

# 移动或重命名文件
mv old_filename.txt new_filename.txt

# 复制文件
cp source.txt destination.txt

# 显示当前日期和时间
date 
# 或 
date +"%Y年%m月%d日 %H:%M"
date +"%Y/%m/%d"

# 设置环境变量
export MY_VARIABLE="I LOVE YOU,LINUX SHELL!"

# 显示磁盘使用情况
df -h

# 压缩文件
tar -czvf archive.tar.gz /path/to/directory

# 解压缩文件
tar -xzvf archive.tar.gz

# 查看进程列表
ps aux
ps -aux
```



#### 管道

​	管道的格式



#### 命令列表

​	什么是命令列表



#### 复合命令

​	什么是复合命令

##### 循环结构

###### until

​	until的用法

```sh
until test-commands; do
	consequent-commands; 
done
```

> 注意：当`test-commands`不成立时，才执行`consequent-commands`。

​	until的示例

​	新建`loop_until_to_count.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

count=1

until [ $count -gt 5 ]; do
    echo "Count is: $count"
    ((count++))
done
```

> 为什么使用 `((count++))`？
>
> ​	首先解释下，`((count++))` 是一种算术扩展，它对变量 `count` 进行自增操作。
>
> ​	还有其他方式吗？
>
> ​	好吧，我们先来看下，其他还有哪些方式吧：
>
> - `expr`，一个外部命令，可用于计算表达式，还是以自增变量为例： `count=$(expr $count + 1)`
> - `let`，一个内置命令，可用于执行算术运算，还是以自增变量为例： `let count++`
> - `variable=$((...))`，用于算术扩展，还是以自增变量为例：`count=$((count + 1))`
>
> ​	那为什么使用它呢？
>
> 1. **简洁性**：这种语法简单明了，适合于进行单步算术操作。
> 2. **性能**：`((...))` 在 Bash 中比使用 `expr` 或 `let` 更高效，因为它直接在 shell 中进行计算，而不是调用外部命令。
> 3. **可读性**：它的语法类似于 C 语言和其他编程语言的算术操作符，使得脚本更加直观和可读。

```sh
lx@lxm:~/testDir/shell$ chmod u+x loop_until_to_count.sh 
lx@lxm:~/testDir/shell$ ./loop_until_to_count.sh 
Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5
```

###### while

​	while的用法

```sh
while test-commands; do
	consequent-commands; 
done
```

> 注意：当`test-commands`成立时，才执行`consequent-commands`。

​	while的示例

​	新建`loop_while_to_count.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

count=1

while [ $count -lt 5 ]; do
    echo "Count is: $count"
    ((count++))
done
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x loop_while_to_count.sh 
lx@lxm:~/testDir/shell$ ./loop_while_to_count.sh 
Count is: 1
Count is: 2
Count is: 3
Count is: 4
```



###### for

​	for的用法

```sh
for name [ [in [words …] ] ; ] do
	commands; 
done
```

​	for的示例

​	（1）遍历字符串列表，新建`loop_for_to_iterate_string.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

for color in red green blue; do
    echo "Color: $color"
done
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x loop_for_to_iterate_string.sh 
lx@lxm:~/testDir/shell$ ./loop_for_to_iterate_string.sh 
Color: red
Color: green
Color: blue
```

​	（2）遍历文件列表，新建`loop_for_to_iterate_filelist.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

for file in ./for_test_dir/*; do
    echo "Processing $file"
done
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x loop_for_to_iterate_filelist.sh 
lx@lxm:~/testDir/shell$ ./loop_for_to_iterate_filelist.sh 
Processing ./for_test_dir/test_file1.txt
Processing ./for_test_dir/test_file2.xls
Processing ./for_test_dir/test_file3.md
```

​	（3）遍历数组，新建`loop_for_to_iterate_array.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

fruits=("apple" "banana" "cherry")

# 使用 @
echo "Using @:"
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# 使用 *
echo "Using *:"
for fruit in "${fruits[*]}"; do
    echo "Fruit: $fruit"
done

# 使用 @ 没有引号
echo "Using @ without quotes:"
for fruit in ${fruits[@]}; do
    echo "Fruit: $fruit"
done

# 使用 * 没有引号
echo "Using * without quotes:"
for fruit in ${fruits[*]}; do
    echo "Fruit: $fruit"
done
```

> `@`和`*`
>
> ​	`"${array[@]}"`：将数组的每个元素作为独立的参数。
>
> ​	`"${array[*]}"`：将整个数组作为一个单一的字符串，元素之间用空格分隔。
>
> ​	`@` 和 `*` 在双引号内和双引号外的行为不同。
>
> ​	`@` 保留每个数组元素的独立性。
>
> ​	`*` 将所有数组元素合并成一个字符串，默认用空格分隔。
>
> ​	在 Bash 中，数组元素在传递给 `for` 循环时始终作为字符串处理，无论它们在数组中是什么类型。因此，无论是 `${mixed_array[@]}` 还是 `"${mixed_array[@]}"`，元素的类型都会被视为字符串。
>
> ​	在 Bash 中，所有变量默认都是字符串类型，Bash 并不像其他编程语言（如 Python 或 C）那样具备直接的强类型检测机制。

```sh
lx@lxm:~/testDir/shell$ chmod u+x ./loop_for_to_iterate_array.sh 
lx@lxm:~/testDir/shell$ ./loop_for_to_iterate_array.sh 
Using @:
Fruit: apple
Fruit: banana
Fruit: cherry
Using *:
Fruit: apple banana cherry
lx@lxm:~/testDir/shell$ ./loop_for_to_iterate_array.sh 
Using @:
Fruit: apple
Fruit: banana
Fruit: cherry
Using *:
Fruit: apple banana cherry
Using @ without quotes:
Fruit: apple
Fruit: banana
Fruit: cherry
Using * without quotes:
Fruit: apple
Fruit: banana
Fruit: cherry
```

​	（4）遍历`$@`、`@*`，新建`loop_for_to_iterate_dollar.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

# 统计输入的命令行参数个数
echo "The number of arguements: $#"

# 打印所有传入的命令行参数，使用 $*
echo "Using \$*:"
for arg in "$*"; do
    echo "Argument: $arg"
done

echo "Using \$* without quotes:"
for arg in $*; do
    echo "Argument: $arg"
done

# 打印所有传入的命令行参数，使用 $@
echo "Using \$@:"
for arg in "$@"; do
    echo "Argument: $arg"
done

echo "Using \$@ without quotes:"
for arg in $@; do
    echo "Argument: $arg"
done
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x loop_for_to_iterate_dollar.sh 
lx@lxm:~/testDir/shell$ ./loop_for_to_iterate_dollar.sh a b c d e
The number of arguements: 5
Using $*:
Argument: a b c d e
Using $* without quotes:
Argument: a
Argument: b
Argument: c
Argument: d
Argument: e
Using $@:
Argument: a
Argument: b
Argument: c
Argument: d
Argument: e
Using $@ without quotes:
Argument: a
Argument: b
Argument: c
Argument: d
Argument: e
```

​	（5）使用 C 风格的 for 循环，新建`loop_for_to_with_c_style.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

for ((i=1; i<=5; i++)); do
    echo "Number: $i"
done
```

> `((...))`：双圆括号用于执行算术运算，并且允许在其中使用算术运算符（如 `+`, `-`, `*`, `/` 等）


```sh
lx@lxm:~/testDir/shell$ chmod u+x loop_for_to_with_c_style.sh 
lx@lxm:~/testDir/shell$ ./loop_for_to_with_c_style.sh 
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5
```

###### 	break和continue内置命令

​	break的语法

```sh
break [n]
```

> `n` 是一个可选的正整数，指定要退出的嵌套层级。默认值是 `1`，即退出最内层循环。

​	continue的语法

```sh
continue [n]
```

> `n` 是一个可选的正整数，指定要跳过的嵌套层级。默认值是 `1`，即跳过最内层循环的当前迭代。

break的示例

​	新建`loop_break.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

echo "break for (n = default):"
echo -n "Number: "
for ((i=1; i<=10; i++)); do
    if (( i == 5 )); then
        break
    fi
    echo -n "$i "
done

echo
echo "break for (n = default = 1):"
echo -n "Number: "
for ((i=1; i<=10; i++)); do
    if (( i == 5 )); then
        break 1
    fi
    echo -n "$i "
done

echo
echo "break while (n = default):"
echo -n "Number: "
i=0
while [ $i -le 10 ]; do
    # 这里若使用((i++)),则程序就此终止
    ((++i))
    if [ $i -eq 5 ]; then
        break
    fi
    echo -n "$i "
done

echo
echo "break while (n = default = 1):"
echo -n "Number: "
i=0
while [ $i -le 10 ]; do
    # 这里若使用((i++)),则程序就此终止
    ((++i))
    if [ $i -eq 5 ]; then
        break 1
    fi
    echo -n "$i "
done

echo
echo "break until (n = default):"
echo -n "Number: "
i=0
until [ $i -gt 10 ]; do
   # 这里若使用((i++)),则程序就此终止
    ((++i))
    if [ $i -eq 5 ]; then
        break
    fi
    echo -n "$i "
done

echo
echo "break until (n = default = 1):"
echo -n "Number: "
i=0
until [ $i -gt 10 ]; do
    # 这里若使用((i++)),则程序就此终止
    ((++i))
    if [ $i -eq 5 ]; then
        break 1
    fi
    echo -n "$i "
done

echo
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x loop_break.sh 
lx@lxm:~/testDir/shell$ ./loop_break.sh
break for (n = default):
Number: 1 2 3 4 
break for (n = default = 1):
Number: 1 2 3 4 
break while (n = default):
Number: 1 2 3 4 
break while (n = default = 1):
Number: 1 2 3 4 
break until (n = default):
Number: 1 2 3 4 
break until (n = default = 1):
Number: 1 2 3 4
```

continue的示例

​	新建`loop_continue.sh`，其内容如下：

```sh
#!/usr/bin/env -S bash -e

echo "continue for (n = default):"
echo -n "Number: "
for ((i=1; i<=10; i++)); do
    if (( i == 5 )); then
        continue
    fi
    echo -n "$i "
done

echo
echo "continue for (n = default = 1):"
echo -n "Number: "
for ((i=1; i<=10; i++)); do
    if (( i == 5 )); then
        continue 1
    fi
    echo -n "$i "
done

echo
echo "continue while (n = default):"
echo -n "Number: "
i=0
while [ $i -le 10 ]; do
    # 这里若使用((i++)),则程序就此终止
    ((++i))
    if [ $i -eq 5 ]; then
        continue
    fi
    echo -n "$i "
done

echo
echo "continue while (n = default = 1):"
echo -n "Number: "
i=0
while [ $i -le 10 ]; do
    # 这里若使用((i++)),则程序就此终止
    ((++i))
    if [ $i -eq 5 ]; then
        continue 1
    fi
    echo -n "$i "
done

echo
echo "continue until (n = default):"
echo -n "Number: "
i=0
until [ $i -gt 10 ]; do
   # 这里若使用((i++)),则程序就此终止
    ((++i))
    if [ $i -eq 5 ]; then
        continue
    fi
    echo -n "$i "
done

echo
echo "continue until (n = default = 1):"
echo -n "Number: "
i=0
until [ $i -gt 10 ]; do
    # 这里若使用((i++)),则程序就此终止
    ((++i))
    if [ $i -eq 5 ]; then
        continue 1
    fi
    echo -n "$i "
done

echo
```

```sh
lx@lxm:~/testDir/shell$ chmod u+x loop_continue.sh 
lx@lxm:~/testDir/shell$ ./loop_continue.sh 
continue for (n = default):
Number: 1 2 3 4 6 7 8 9 10 
continue for (n = default = 1):
Number: 1 2 3 4 6 7 8 9 10 
continue while (n = default):
Number: 1 2 3 4 6 7 8 9 10 11 
continue while (n = default = 1):
Number: 1 2 3 4 6 7 8 9 10 11 
continue until (n = default):
Number: 1 2 3 4 6 7 8 9 10 11 
continue until (n = default = 1):
Number: 1 2 3 4 6 7 8 9 10 11 
```



##### 条件结构

​	if的用法

​	case的用法

​	select的用法

​	`((...))`的用法

​	`[[...]]`的用法

##### 命令分组

​	`()`和`{}`的区别

#### 协程

​	协程的语法



#### GNU Parallel

### Shell 函数

​	函数声明

​	函数内部变量

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