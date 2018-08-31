---
title: 记一次linux超级用户和普通用户出现的差错
date: 2017-09-15T08:53:31.000Z
tags:
  - liunx
  - root
  - 用户
  - 用户组
category:
  - 服务器纪实
  - 文件权限
---

项目上线，原以为只是简单的root启动服务器即可，没想到，日志突然以root超级用户写入，并且一直习惯755权限，不大不小刚刚好，本身问题不大，但是运行ngnix的用户却是www，所以导致日志无法写入，无法读取。后经过
<!--more-->

```sh
chown root httpd
chmod u+s httpd
```

普通用户启动等操作，均无效。

偶然记起，此次supervisor启动守护进程似乎并没有指定user，而是直接root启动，最后在supervisor的配置中加上

```sh
user=www
```

随即正常运行.....
