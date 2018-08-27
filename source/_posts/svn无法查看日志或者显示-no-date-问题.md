---
title: svn无法查看日志或者显示(no date)问题
date: 2017-12-22 11:47:23
tags:
  - svn
  - linux
  - 服务器
category:
  - 服务器纪实
  - svn
---

现有配置

在linux上搭建了svn服务器，建立了一个项目。详细搭建可以参考博文。
在svnserve.conf里把这四个前面的#去掉
<!--more-->

```bash
anon-access = read
auth-access = write
password-db = passwd
aythz-db = authz
```
在passwd里设置用户名和密码
在authz里设置了用户组，并且在[/]下设置了* =
错误现象

使用小乌龟show log，出现离线设置，点cancel，显示错误无法读取。
使用eclipse的subeclipse的show history，弹出框报错，错误显示无法获取。
解决方案

把svnserve.conf里的anon-access = read改成anon-access = none，或者新增anon-access = none，都可以。
增加完成点保存，subeclipse刷新即可显示show histroy的内容。
小乌龟若无法显示，是因为存在缓存，则需要清除一下。方法：右键-》TortoiseSvn-》setting-》Saved Data，把这里的日志缓存clear一下即可显示。
