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

## redis操作
### 检测是否有安装redis-cli和redis-server
```bash
[root@localhost bin]# whereis redis-cli
redis-cli: /usr/bin/redis-cli

[root@localhost bin]# whereis redis-server
redis-server: /usr/bin/redis-server
```
### 检测后台进程是否存在
```bash
ps -ef |grep redis
```
### 检测redis端口
```bash
netstat -lntp | grep 6379
```
### 使用redis-cli客户端检测连接是否正常
```bash
redis-cli
127.0.0.1:6379> keys *
(empty list or set)
127.0.0.1:6379> set key "hello world"
OK
127.0.0.1:6379> get key
"hello world"
```
### 停止redis
#### 使用客户端
```bash
redis-cli shutdown
```
#### 因为Redis可以妥善处理SIGTERM信号，所以直接kill -9也是可以的
```bash
kill -9 PID
```
