# windows server 环境下搭建我的运行环境

## 安装
* [iisnode](https://github.com/Azure/iisnode/)
* ~~[NodeJs](https://nodejs.org/)~~
* [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
* [Url-rewrite](http://www.iis.net/downloads/microsoft/url-rewrite)
* [Git](https://git-scm.com/)
* [Sublime](https://www.sublimetext.com/)

## 配置Git
### 创建公钥
* 首先启动一个Git Bash窗口（非Windows用户直接打开终端）
* 执行
	```shell
	$ cd ~/.ssh
	```
	如果返回“… No such file or directory”，说明没有生成过SSH Key，直接进入第4步。否则进入第3步备份!
* 备份原始公钥
* 生成新的Key：
	```shell
	$ ssh-keygen -t rsa
	# or
	$ ssh-keygen -t rsa -C "cycjimmy@gmail.com"
	```
* 一路回车（一般不需要做额外设置） 
* 提交公钥：
	* 找到.ssh文件夹，用文本编辑器打开“id_rsa.pub”文件，复制内容到剪贴板。
  * 打开 [https://github.com/settings/ssh](https://github.com/settings/ssh) ，点击 `Add SSH Key` 按钮，粘贴进去保存即可。
  
## [npm相关设置](https://github.com/cycjimmy/development-notes/blob/master/notes/tools/node(front-end).md)


