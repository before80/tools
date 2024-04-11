+++
title = "基础"
date = 2024-04-08T14:41:07+08:00
weight = 10
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

## 镜像

### 拉取镜像

> Tips:
>
> ​	`docker pull` 命令是 `docker image pull` 的别名。

```cmd
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

示例

```
# 拉取最新的版本的 Nginx 镜像
docker pull nginx:latest

# 拉取带有的5.7.44标签的 MySQL 镜像
docker pull mysql:5.7.44

# 拉取带有的1.22.2-alpine标签的 golang 镜像
docker pull golang:1.22.2-alpine
```



### 删除镜像

> Tips:
>
> ​	`docker rmi` 命令是 `docker image rm`、`docker image remove` 的别名。

```cmd
docker rmi [OPTIONS] <image_name>[<:tag_name>] [<image_name>[<:tag_name>]...]
```

### 构建镜像

> Tips:
>
> ​	`docker build` 命令是 `docker image build`、`docker buildx build`、`docker builder build`的别名。

用法：

```cmd
docker build [OPTIONS] PATH
```



```cmd
# -t 和 --tag 标记一样
# 在Dockerfile所在文件的目录下进行构建镜像，默认tag_name 是 latest，
# 以下命令中的最后一个 . 表示当前构建上下文所在的路径
docker build --tag <image_name>[<:tag_name>] .
docker build -t <image_name>[<:tag_name>] .

# 指定Dockerfile文件名，在其所在的目录下进行构建镜像，默认tag_name  是 latest
docker build --tag <image_name>[<:tag_name>] -f <Dockerfile_name> .
docker build -t <image_name>[<:tag_name>] -f <Dockerfile_name> .
docker build -t <image_name>[<:tag_name>] -f /some/dir/<Dockerfile_name>  /some/dir
```

### 列出镜像

> Tips:
>
> ​	`docker images` 命令是 `docker image ls`的别名。

#### 普通方式

```cmd
# 列出镜像列表，不包含隐藏的
docker images
docker image ls

# 列出所有镜像列表，包含隐藏的
docker images -a
docker image ls -a

# 使列表中的镜像ID为完整长度
docker images --no-trunc
docker image ls --no-trunc

# 使列表中包含镜像摘要 DIGEST
docker images --digests
```

#### 只列出短镜像ID

```cmd
docker images -q
```

#### 只列出长的镜像ID
```cmd
docker images -q --no-trunc
```

#### 按给定镜像名称和标签列出镜像

```cmd
# 按给定的镜像名称和标签列出镜像
docker images <image_name>[:<tag_name>]


# 按给定的部分镜像名称和部分标签列出镜像，使用了 * , 这种方式类似于以下的使用 -f=reference 标记的命令
docker images <sub_image_name*>[:<sub_tag_name*>]
docker images <*sub_image_name>[:*<sub_tag_name>]
```

#### 使用过滤方式列出镜像

```cmd
# 过滤镜像，使用 reference 过滤器 (意思：模式匹配)
# -f 和 --filter 标记一样
docker images -f "reference='<sub_image_name*>[:<sub_tag_name*>]'"
docker images -f "reference='<*sub_image_name>[:*<sub_tag_name>]'"

# 过滤镜像，使用 dangling 过滤器 (意思：是否是未标记的镜像，应该就是隐藏的镜像)
docker images -f "dangling=true"
docker images -f "dangling=false"

# 过滤镜像，使用 before  过滤器 (意思：在此之前创建的镜像，但不包括此)
docker images -f "before=<image_name>[:<tag_name>] | <image_id> | <image_name@digest>"

# 过滤镜像，使用 since  过滤器 (意思：在此之后创建的镜像，但不包括此)
docker images -f "since=<image_name>[:<tag_name>] | <image_id> | <image_name@digest>"

# 过滤镜像，使用 label  过滤器 (意思：label是这样的。这里的label是一种元数据，用于向镜像中添加自定义的信息，
# 查看镜像的元数据可以使用 docker inspect <image_id>，其中Config.Lables字段下的字段就是label，
# 常见的label有 maintainer（nginx 镜像中有），
# 也可以使用 `docker inspect --format='{{json .Config.Labels}}' <image_id>` 获取到这些label)
docker images -f "label=<key> | <key>=<value>"
```

##### 多个  -f 或 --filter 并用的情况

​	多个  -f 或 --filter 并用的情况，表示或的意思，即只要满足其中之一的过滤条件就列出。

#### 指定列表的输出格式

##### 有效占位符

| Placeholder     | Description                              |
| --------------- | ---------------------------------------- |
| `.ID`           | Image ID                                 |
| `.Repository`   | Image repository                         |
| `.Tag`          | Image tag                                |
| `.Digest`       | Image digest                             |
| `.CreatedSince` | Elapsed time since the image was created |
| `.CreatedAt`    | Time when the image was created          |
| `.Size`         | Image disk size                          |

##### 以列表格式输出

```cmd
docker images --format "[table] {{.ID}}<separator>{{.Repository}}<separator>{{.Tag}}<separator>{{.Digest}}<separator>{{.CreatedSince}}<separator>{{.CreatedAt}}<separator>{{.Size}}"
```

示例

```cmd
# 示例1：
docker images --format table

# 示例2：
docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Digest}}\t{{.CreatedSince}}\t{{.CreatedAt}}\t{{.Size}}"

# 示例3：
docker images --format "{{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Digest}}\t{{.CreatedSince}}\t{{.CreatedAt}}\t{{.Size}}"

# 示例4：
docker images --format "table {{.ID}}->{{.Repository}}->{{.Tag}}->{{.Digest}}->{{.CreatedSince}}->{{.CreatedAt}}->{{.Size}}"

# 示例5：
docker images --format "table {{json .ID}}\t{{json .Repository}}\t{{json .Size}}"
```



##### 以JSON格式输出

示例

```cmd
# 示例1：
docker images --format json
# 示例2：
docker images --format "{{json .ID}} {{json .Repository}}"
```



## 容器

> Tips:
>
> ​	`docker create` 命令是 `docker container create`的别名。
>
> ​	有些常见的单字符OPTIONS可以合并一起书写，例如：`-i` 和 `-t` ，可以合并成`-it`；

### 创建容器

用法

```cmd
docker create [OPTIONS] IMAGE [COMMAND] [ARG...]
```

​	OPTIONS大概有100个，常见的有：

- `-e`，`--env`：用于设置容器中的环境变量
- `--env-file`：读入到容器中的环境变量文件
- `--name`：为容器指定名称
- `-h`，`--hostname`：用于设置容器主机名
- `--cpus`：用于设置容器主机使用的CPU 数量
- `-m`， `--memory`：用于对容器使用的内存进行限制
- `--dns`：用于设置容器使用的 DNS 服务器
- `-i`：保持容器的 STDIN 打开
- `-t`：给容器分配一个伪终端
- `--expose`：暴露一个或多个端口
- `--ip`：设置容器的IPv4 地址（例如 172.30.100.104）
- `--ip6`：设置容器的IPv6 地址（例如 2001:db8::33）
- `-p`： 将容器的端口发布到主机
- `--rm`：退出容器时自动移除容器
- `--tmpfs`：挂载tmpfs目录
- `-v`：绑定挂载卷
- `--mout`： 将文件系统挂载到容器中
- `--volume-driver`：容器的可选卷驱动程序
- `--volumes-from`：从指定容器挂载卷
- `-w`，`--workdir`：指定容器内的工作目录

### 启动容器

#### 方式1

​	需先存在容器。

> Tips:
>
> ​	`docker start` 命令是 `docker container start`的别名。

用法：

```cmd
docker start [OPTIONS] CONTAINER [CONTAINER...]
```

​	其中的 `CONTAINER` 可以是 容器ID 或 容器名称（即使用 `--name` 指定的容器名称）。

示例

```cmd
docker start c2c064f75c87

docker start golang
```

#### 方式2

​	没有容器的情况下，将创建容器和启动容器一起操作。

用法：

```cmd
docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

​	其中的`OPTIONS`和 `docker create` 的`OPTIONS`命令一样。

### 重新启动容器

> Tips:
>
> ​	`docker restart` 命令是 `docker container restart`的别名。

```cmd
docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

| Option         | Default | Description                                                  |
| -------------- | ------- | ------------------------------------------------------------ |
| `-s, --signal` |         | Signal to send to the container 发送到容器的[信号](https://man7.org/linux/man-pages/man7/signal.7.html) |
| `-t, --time`   |         | Seconds to wait before killing the container 在终止容器之前等待几秒钟 |

### 停止容器

#### 方式1

> Tips:
>
> ​	`docker stop` 命令是 `docker container stop`的别名。

```cmd
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

| Option         | Default | Description                                                  |
| -------------- | ------- | ------------------------------------------------------------ |
| `-s, --signal` |         | Signal to send to the container 发送到容器的[信号](https://man7.org/linux/man-pages/man7/signal.7.html) |
| `-t, --time`   |         | Seconds to wait before killing the container 在终止容器之前等待几秒钟 |

​	容器内的主进程将收到 `SIGTERM`，并在宽限期后收到  `SIGKILL` 。第一个信号可以使用容器的 Dockerfile 中的 `STOPSIGNAL` 指令进行更改，也可以用 `docker run` 命令中的 `--stop-signal` 选项指定.

#### 方式2

> Tips:
>
> ​	`docker kill` 命令是 `docker container kill `的别名。

```cmd
docker kill [OPTIONS] CONTAINER [CONTAINER...]
```

| Option         | Default | Description                                                  |
| -------------- | ------- | ------------------------------------------------------------ |
| `-s, --signal` |         | Signal to send to the container 发送到容器的Signal to send to the container 发送到容器的[信号](https://man7.org/linux/man-pages/man7/signal.7.html) |

​	该命令默认是向容器内的主进程发送 `SIGKILL` 信号，也可以使用 `-s, --signal` 选项指定的信号。其中的信号可以是格式为 `SIG<NAME>` 的信号名称，例如 `SIGINT` ，也可以是与内核系统调用表中的位置匹配的无符号数字，例如 `2` .

​	虽然默认 ( `SIGKILL` ) 信号将终止容器，但通过 `--signal` 设置的信号可能是非终止信号，具体取决于容器的主进程。例如，大多数情况下 `SIGHUP` 信号将是非终止的，容器收到该信号后将继续运行。

​	`SIG` 前缀是可选的，因此以下示例是等效的：

```
docker kill --signal=SIGHUP my_container
docker kill --signal=HUP my_container
docker kill --signal=1 my_container
```



### 删除容器

> Tips:
>
> ​	`docker rm` 命令是 `docker container rm`、`docker container remove`的别名。

```cmd
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```

| Option          | Default | Description                                                  |
| --------------- | ------- | ------------------------------------------------------------ |
| `-f, --force`   |         | Force the removal of a running container (uses SIGKILL)  强制移除正在运行的容器（使用 SIGKILL[信号](https://man7.org/linux/man-pages/man7/signal.7.html)） |
| `-l, --link`    |         | Remove the specified link  删除指定的链接                    |
| `-v, --volumes` |         | Remove anonymous volumes associated with the container  删除与容器关联的匿名卷 |

### 重新命名容器

> Tips:
>
> ​	`docker rename` 命令是 `docker container rename`的别名。

```cmd
docker rename CONTAINER NEW_NAME
```

示例

```cmd
docker rename my_container new_my_container
```



### 在主机和容器间复制内容

> Tips:
>
> ​	`docker cp` 命令是 `docker container cp`的别名。

```cmd
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH
# 或
docker cp [OPTIONS] SRC_PATH CONTAINER:DEST_PATH
```

​	该 `docker cp` 命令将  `SRC_PATH` 的内容复制到 `DEST_PATH` 。你可以将内容`从容器的文件系统复制到宿主机`，也可以`从宿主机文件系统复制到容器内`。如果 `SRC_PATH` 或 `DEST_PATH` 指定为`-`  ，则还可以将 tar 存档从 `STDIN`流入或流出到 `STDOUT` 。 `CONTAINER` 可以是正在运行或停止的容器。 `SRC_PATH` 、 `DEST_PATH` 可以是文件或目录的路径。

 	该 `docker cp` 命令假定容器路径相对于容器 `/` 的（根）目录。这意味着提供初始正斜杠是可选的；该命令将  `compassionate_darwin:tmp/foo/myfile.txt` 和 `compassionate_darwin:/tmp/foo/myfile.txt` 视为相同路径下的文件。宿主机路径可以是绝对值或相对值。该命令将本地计算机的相对路径解释为相对于运行的 `docker cp` 当前工作目录。

示例

```
# 将宿主机的文件复制到容器内
docker cp ./some_file CONTAINER:/work

# 将容器内的文件复制到宿主机中
docker cp CONTAINER:/var/logs/ /tmp/app_logs
```

> 注意
>
> ​	无法复制某些系统文件，例如 `/proc` 、 `/sys` 、 `/dev` 、[tmpfs](https://docs.docker.com/reference/cli/docker/container/run/#tmpfs)下的资源以及用户在容器中创建的挂载。

### 查看容器

```cmd

```



## 存储

### 存储类型

```cmd
# 创建卷
docker volume create <volume_name>
# 查看卷列表
docker volume list
# 删除卷
docker volume 
```



## 网络

### 网络类型

```cmd
# 创建网络

```

创建网络

## 密钥



## 节点



## 服务



## 任务



## 插件

