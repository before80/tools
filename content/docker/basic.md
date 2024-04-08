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
docker pull <iamge_name>[<:tag_name>]
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
> ​	`docker rmi` 命令是 `docker image rm` 的别名。

```cmd
docker image rm <image_name>[<:tag_name>]
docker rmi <image_name>[<:tag_name>]
```

### 构建镜像

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
> ​	`docker rmi` 命令是 `docker image rm` 的别名。
>
> ​	`docker images` 命令是 `docker image ls`的别名。

#### 普通方式

```cmd
# 列出镜像列表，不包含隐藏的
docker imags
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

# 过滤镜像，使用 before  过滤器 (意思：在此之前创建的镜像)
docker images -f "before=<image_name>[:<tag_name>] | <image_id> | <image_name@digest>"

# 过滤镜像，使用 since  过滤器 (意思：在此之后创建的镜像)
docker images -f "since=<image_name>[:<tag_name>] | <image_id> | <image_name@digest>"

# 过滤镜像，使用 label  过滤器 (意思：label是这样的。这里的label是一种元数据，用于向镜像中添加自定义的信息，
# 查看镜像的元数据可以使用 docker inspect <image_id>，其中Config.Lables字段下的字段就是label，
# 常见的label有 maintainer（nginx 镜像中有），
# 也可以使用 docker inspect --format='{{json .Config.Labels}}' <image_id> 获取到这些label)
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



##### 以json格式输出

示例

```
# 示例1：
docker images --format json
# 示例2：
docker images --format "{{json .ID}} {{json .Repository}}"
```



## 容器

> Tips:
>
> 

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



## 密钥



## 节点



## 服务



## 任务



## 插件

