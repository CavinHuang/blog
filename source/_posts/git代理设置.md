---
title: git代理设置
date: 2020-12-18 17:11:11
tags:
 - 工具
 - git
 - git代理
category:
 - 工具
 - git
---

git 和本地的internet代理是不通用的，需要给git设置单独的代理

```bash
git config --global http.proxy http://127.0.0.1:1080

git config --global https.proxy https://127.0.0.1:1080

git config --global --unset http.proxy

git config --global --unset https.proxy

npm config delete proxy

git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'

```
如果设置了代理用来拉代码，而本地用的是内网的gitlab之类的，需要删除git代理之后才有用哦！

