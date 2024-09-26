+++
title = "用户和权限管理"
date = 2024-09-26T08:39:05+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++



## useradd

> Create a new user. See also: `users`, `userdel`, `usermod`. More information: https://manned.org/useradd.创建新用户。 参见: `users` ， `userdel` ， `usermod` 。 更多信息:https://manned.org/useradd。

- Create a new user: 

  创建新用户:

```sh
sudo useradd username
```

- Create a new user with the specified user ID:

  用指定的用户ID创建一个新用户。

```sh
sudo useradd --uid id username
```

- Create a new user with the specified shell:

  使用指定的shell创建一个新用户:

```sh
sudo useradd --shell path/to/shell username
```

- Create a new user belonging to additional groups (mind the lack of whitespace):

  创建一个属于其他组的新用户(注意缺少空格):

```sh
sudo useradd --groups group1,group2,... username
```

- Create a new user with the default home directory:

  使用默认的主目录创建一个新用户:

```sh
sudo useradd --create-home username
```

- Create a new user with the home directory filled by template directory files:

  创建一个新用户，主目录由模板目录文件填充:

```sh
sudo useradd --skel path/to/template_directory --create-home username
```

- Create a new system user without the home directory:

  创建一个没有主目录的新系统用户。

```sh
sudo useradd --system username
```

## userdel

> Remove a user account or remove a user from a group. See also: `users`, `useradd`, `usermod`. More information: https://manned.org/userdel.
>
> 删除用户帐户或从组中删除用户。 参见: `users` ， `useradd` ， `usermod` 。 更多信息:https://manned.org/userdel。

- Remove a user: 

  删除用户:

```sh
sudo userdel username
```

- Remove a user in other root directory:

  删除其他根目录下的用户:

```sh
sudo userdel --root path/to/other/root username
```

- Remove a user along with the home directory and mail spool:

  删除用户以及主目录和邮件假脱机:

```sh
sudo userdel --remove username
```

## usermod

> Modify a user account. See also: `users`, `useradd`, `userdel`. More information: https://manned.org/usermod.
>
> 修改用户帐号。 参见: `users` ， `useradd` ， `userdel` 。 更多信息:https://manned.org/usermod。

- Change a username: 

  修改用户名:

```sh
sudo usermod --login new_username username
```

- Change a user ID: 

  修改用户ID:

```sh
sudo usermod --uid id username
```

- Change a user shell: 

  修改用户shell:

```sh
sudo usermod --shell path/to/shell username
```

- Add a user to supplementary groups (mind the lack of whitespace):

  将用户添加到补充组(注意缺少空格):

```sh
sudo usermod --append --groups group1,group2,... username
```

- Change a user home directory:

  修改用户的主目录:

```sh
sudo usermod --move-home --home path/to/new_home username
```

## adduser

> User addition utility. More information: https://manned.org/adduser.
>
> 用户添加实用程序。 更多信息:https://manned.org/adduser。

- Create a new user with a default home directory and prompt the user to set a password:

  创建一个带有默认主目录的新用户，并提示用户设置密码:

```sh
adduser username
```

- Create a new user without a home directory:

  创建一个没有主目录的新用户。

```sh
adduser --no-create-home username
```

- Create a new user with a home directory at the specified path:

  创建一个新用户，主目录在指定路径下。

```sh
adduser --home path/to/home username
```

- Create a new user with the specified shell set as the login shell:

  创建一个新用户，并将指定的shell设置为登录shell。

```sh
adduser --shell path/to/shell username
```

- Create a new user belonging to the specified group:

  创建属于指定组的新用户。

```sh
adduser --ingroup group username
```

## addgroup



## groupadd

> Add user groups to the system. See also: `groups`, `groupdel`, `groupmod`. More information: https://manned.org/groupadd.
>
> 向系统中添加用户组。 参见: `groups` ， `groupdel` ， `groupmod` 。 更多信息:https://manned.org/groupadd。

- Create a new group: 

  创建一个新组:

```sh
sudo groupadd group_name
```

- Create a new system group:

  创建一个新的系统组:

```sh
sudo groupadd --system group_name
```

- Create a new group with the specific groupid:

  用指定的groupid创建一个新组:

```sh
sudo groupadd --gid id group_name
```

## groupdel

> Delete existing user groups from the system. See also: `groups`, `groupadd`, `groupmod`. More information: https://manned.org/groupdel.
>
> 删除系统中已存在的用户组。 参见: `groups` ， `groupadd` ， `groupmod` 。 更多信息:https://manned.org/groupdel。

- Delete an existing group:

  删除已存在的组。

```sh
sudo groupdel group_name
```

## groupmod

> Modify existing user groups in the system. See also: `groups`, `groupadd`, `groupdel`. More information: https://manned.org/groupmod.
>
> 修改系统中已存在的用户组。 参见: `groups` ， `groupadd` ， `groupdel` 。 更多信息:https://manned.org/groupmod。

- Change the group name: 

  修改组名:

```sh
sudo groupmod --new-name new_group group_name
```

- Change the group ID: 

  修改组ID:

```sh
sudo groupmod --gid new_id group_name
```



## id



## passwd



## su



## sudo



## chown



## chgrp





## chmod





## umask



## setfacl



## getfacl

