---
title: 'git push出现git remote: error: hook declined to update'
date: 2018-04-20 16:17:34
tags:
 - git
category:
 - git操作记录
---

在提交一个项目的commit时，push的时候，报错：
<!--more-->
```bash
Counting objects: 237, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (226/226), done.
Writing objects: 100% (237/237), 19.60 MiB | 1.25 MiB/s, done.
Total 237 (delta 129), reused 0 (delta 0)

# 错误原因在这里是因为 不小心把日志文件加入了版本控制，而文件有过大，超过了git服务器的要求
remote: warning: Large files detected.
remote: error: File log/node-app.stdout.log is 172.8 MB; this exceeds file size limit of 100.0 MB
remote: error: hook declined to update refs/heads/dev

To https://*******.git
 ! [remote rejected] dev -> dev (hook declined)
error: failed to push some refs to 'https://*******.git'

```
原因是有一个文件超过了git服务器对文件大小的限制。
删掉本地文件，再推，还是报错。回滚，再推，还是同样的错误。
最后发现是这个大文件已经保存到了log中，因此无论怎么删改，这个文件没有从log中剔除就总会报出相同的错误。所以要在日志中把这个文件删除即可。

命令如下：
```
git filter-branch -f --index-filter "git rm -rf --cached --ignore-unmatch xxx.rar" -- --all
```
执行命令以后，git会rewrite之前的分支
```bash
Rewrite 40ba48857e0d99764f12337ce254adea8ce6bf47 (33/69) (29 seconds passed, remaining 31 predicted)    rm 'log/node-app.stdout.log'
Rewrite bce9fd849f88a7474493e780d671060789fa06ab (33/69) (29 seconds passed, remaining 31 predicted)    rm 'log/node-app.stdout.log'
Rewrite fc9fdb29e482ac7232288cc030a1fccbc4272daf (35/69) (31 seconds passed, remaining 30 predicted)    rm 'log/node-app.stdout.log'
```
然后再Push即可。
