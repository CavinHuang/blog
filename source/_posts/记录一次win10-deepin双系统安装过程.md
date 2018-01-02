---
title: 记录一次win10+deepin双系统安装过程
date: 2017-10-31 22:44:54
tags:
  - linux
category: '系统折腾'
---

由于各种线上线下环境不统一，导致痛苦以日激增，身为折腾党，当然不能忍，所以开始了deepin linux折腾之旅，为什么选择deepin，别问为什么，因为它长得好看。。。废话不多说，开始咯

 - 1. 首先下载deepIn linux 镜像[官网，点这里][1] 当前版本15.4.1
 - 2. 下载deepIn U盘启动制作工具 [地址][2]
 - 3. 准备一个大于4G的空U盘，自己备份哦
 - 4. 在电脑上准备一个大于30G的空余磁盘，不用格式化
 - 5. 制作启动优盘，非常简单只要选择下载的镜像和选择自己的启动U盘即可
 - 6. 安装开始咯，首先重启电脑，进入bois，设置启动U盘是第一启动盘，这里注意华硕笔记本，如果识别不到U盘，可以在security-》secure boot menu 设置secure boot control为disable就可以识别U盘咯
 - 7. 进入deepin 引导界面 选中第一个install deepin
 - 8. 接下来是输入密码等等
 - 9. 到这里是选择安装位置了，选择你刚才空出来的磁盘，点继续安装，等待安装，重启，进入磁盘启动界面，华硕按esc建，进入deepin引导界面，选中第一个，按e进入命令编辑界面在quiet后面加空格，加acpi=off，按f10重载引导。
 - 10. 好了进入界面了。输入密码进入桌面了，打开终端
 ```sh
 $ sudo su
 # sudo gedit /etc/default/grub
```
 - 11. 在quiet后面加空格再加nouveau.modeset=0
 - 12. 在终端输入sudo update-grub (必须联网哦)
 - 13. 按照8重新进入桌面，恭喜你已经安装成功了哦，enjoy！！
  [1]: https://www.deepin.org/download/
  [2]: https://www.deepin.org/original/deepin-boot-maker/
