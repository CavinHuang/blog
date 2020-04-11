---
title: centos7 源码编译安装mysql5.7
date: 2018-05-05 13:58:03
tags:
  - centos7
  - redis
  - Mysql
category:
  - 服务器操作
  - mysql
---
## 1.准备工作

首先需要准备mysql的源码包，最新版本是5.7.12
下载地址为：
[http://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.12.tar.gz](http://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.12.tar.gz)
<!--more-->
同时，mysql 5.7需要boost 1.59以及以上版本，需要在sourceforge上下载。地址为：
[http://www.boost.org/users/download/](http://www.boost.org/users/download/)

安装之前最好检查一下是否已安装了mysql和boost
```bash
rpm -qa | grep mysql    #查看系统自带mysql
yum -y remove mysql-*   #卸载mysql
rpm -e --nodeps mysql-5.1.73-3.el6_5.x86_64 #卸载mysql
rpm -qa | grep boost    #查看系统自带boost
yum -y remove boost-*   #卸载boost
rpm -e --nodeps boost-filesystem-1.41.0-11.el6_1.2.x86_64 #卸载boost
```
然后安装其它得依赖包：
```bash
yum install gcc gcc-c++ ncurses ncurses-devel bison libgcrypt perl cmake
```
## 2.准备安装

首先将boost库解压出来
```bash
tar -zxvf boost_1_59_0.tar.gz
```
然后拷贝到一个目录中
```bash
mv boost_1_59_0 /usr/local/boost
```
然后创建用户组以及用户
```bash
cat /etc/group | grep mysql     #查看是否存在mysql用户组
cat /etc/passwd | grep mysql    #查看是否存在mysql用户
groupadd mysql                  #创建用户组
useradd -r -g mysql mysql       #创建用户
```
上面得工作完成以后，就可以开始编译mysql了，当然，先将mysql的源码解压出来：
```bash
tar xzvf mysql-5.7.12.tar.gz
cd mysql-5.7.12
```
使用cmake和make命令来进行编译
```bash
cmake . -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DMYSQL_DATADIR=/usr/local/mysql/data -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DMYSQL_TCP_PORT=3306 -DMYSQL_USER=mysql -DWITH_MYISAM_STORAGE_ENGINE=1 -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_ARCHIVE_STORAGE_ENGINE=1 -DWITH_BLACKHOLE_STORAGE_ENGINE=1 -DWITH_MEMORY_STORAGE_ENGINE=1 -DENABLE_DOWNLOADS=1 -DDOWNLOAD_BOOST=1 -DWITH_BOOST=/usr/local/boost

make
```
编译会消耗较多的时间，期间可以喝杯茶，或者来创建几个目录，因为我们指定编译参数得时候，指定了mysql得数据存储的目录，因此，这个时候可以先把目录都创建出来：

```bash
mkdir /usr/local/mysql
mkdir /usr/local/mysql/data
mkdir /usr/local/mysql/logs
mkdir /usr/local/mysql/pids
```
最后还有重要得一步，需要将目录得所有权交给mysql用户
```bash
chown -R mysql:mysql /usr/local/mysql  #需要root权限
```

编译完成后执行make install 安装即可
随后，我们需要配置/etc/my.cnf文件：
```bash
vim /etc/my.cnf                                          
```
然后写入参数，最终如下；
```bash
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html

[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
datadir=/usr/local/mysql/data
socket=/usr/local/mysql/mysql.sock

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

log-error=/usr/local/mysql/logs/mysqld.log
pid-file=/usr/local/mysql/pids/mysqld.pid                                       
```
## 3.性能调优
由于编译的时间是在太长了，这个地方的性能调优不涉及任何的sql优化，只针对一点：使用jemalloc来替换默认的内存管理
首先我们需要从网站上下载jemalloc，官网地址：
[http://www.canonware.com/jemalloc/](http://www.canonware.com/jemalloc/)

从github上可以下载最新的源码：
[https://github.com/jemalloc/jemalloc/releases](https://github.com/jemalloc/jemalloc/releases)

编译jemalloc：
```bash
./configure --libdir=/usr/local/lib
make
make install
```
为了保证能够找到jemalloc库，我们需要设置一下库路径，
```bash
echo "/usr/local/lib" > /etc/ld.so.conf.d/usr_local_lib.conf
ldconfig //执行这个命令可以刷新库路径
```
我们有两种方式来使用jemalloc来优化mysql
在编译的时候加入参数：
```bash
-DCMAKE_EXE_LINKER_FLAGS="-ljemalloc" -DWITH_SAFEMALLOC=OFF
```
然后重新编译一遍。
也可以修改 /usr/local/mysql/bin/mysqld_safe
在# executing mysqld_safe 下面加上
```bash
LD_PRELOAD=/usr/local/lib/libjemalloc.so
```
## 4.其它配置
通常我们需要重启服务器，最好在重启服务器的时候就启动mysql
```bash
cp support-files/mysql.server /etc/init.d/mysqld
chmod a+x /etc/init.d/mysqld #需要root权限
```
然后将mysql添加到环境变量，修改/etc/profile文件
```bash
vim /etc/profile   #需要root
#在文件的最后面加入
#mysql path
export PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH
```
最后执行 `source /etc/profile`

随后我们也需要多数据库进行初始化操作。自 mysql5.7 开始，初始化系统表不再使用 mysql_install_db 工具, 而是使用 mysqld –initialize-insecure –user=mysql , 其中 –initialize 表示默认生成一个安全的密码, –initialize-insecure 表示不生成密码, 密码为空
```bash
mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
```
现在可以启动mysql 服务器：
```bash
chkconfig mysqld on
```
最后我们将root密码修改一下：
```bash
mysql -u root
mysql> use mysql;
mysql>update user set authentication_string=password('123456') where user='root' and Host = 'localhost';
mysql> FLUSH PRIVILEGES;
```
特别提醒注意的一点是，新版的mysql数据库下的user表中已经没有Password字段了

而是将加密后的用户密码存储于authentication_string字段
## 5.tips
执行make命令的时候可以加-j（多进程）参数来加快编译速度
make -j “cpu 核数”

比如已知CPU是4核心的，可以使用：
make -j 4
