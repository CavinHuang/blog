---
title: linux操作记录(持续记录)
date: 2018-12-13 11:54:19
tags:
  - linux
category:
 - 服务器纪实
 - 日常命令
---

## 重启php-fpm
- 查看php-fpm的master进程号
```bash
# ps aux|grep php-fpm
root     21891  0.0  0.0 112660   960 pts/3    R+   16:18   0:00 grep --color=auto php-fpm
root     42891  0.0  0.1 182796  1220 ?        Ss   4月18   0:19 php-fpm: master process (/Data/apps/php7/etc/php-fpm.conf)
nobody   42892  0.0  0.6 183000  6516 ?        S    4月18   0:07 php-fpm: pool www
nobody   42893  0.0  0.6 183000  6508 ?        S    4月18   0:17 php-fpm: pool www
```
-重启php-fpm:
```bash
kill -USR2 42891
```
