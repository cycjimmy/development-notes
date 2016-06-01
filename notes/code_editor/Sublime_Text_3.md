#  Sublime Text 3

[Download](http://www.sublimetext.com/)

***

## 注册码

```
—– BEGIN LICENSE —–
Michael Barnes
Single User License
EA7E-821385
8A353C41 872A0D5C DF9B2950 AFF6F667
C458EA6D 8EA3C286 98D1D650 131A97AB
AA919AEC EF20E143 B361B1E7 4C8B7F04
B085E65E 2F5F5360 8489D422 FB8FC1AA
93F6323C FD7F7544 3F39C318 D95E6480
FCCC7561 8A4A1741 68FA4223 ADCEDE07
200C25BE DBBC4855 C4CFB774 C5EC138C
0FEC1CEF D9DCECEC D3A5DAD1 01316C36
—— END LICENSE ——
```

```
—– BEGIN LICENSE —–
Alexey Plutalov
Single User License
EA7E-860776
3DC19CC1 134CDF23 504DC871 2DE5CE55
585DC8A6 253BB0D9 637C87A2 D8D0BA85
AAE574AD BA7D6DA9 2B9773F2 324C5DEF
17830A4E FBCF9D1D 182406E9 F883EA87
E585BBA1 2538C270 E2E857C2 194283CA
7234FF9E D0392F93 1D16E021 F1914917
63909E12 203C0169 3F08FFC8 86D06EA8
73DDAEF0 AC559F30 A6A67947 B60104C6
—— END LICENSE ——

```
***

## 安装/移除/更新插件

### 安装Package Control

1.按**Ctrl+\`**（Mac下为**Control+\`**）调出**console**

2.粘贴以下代码到底部命令行并回车：

```
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```
3.重启Sublime Text 3

4.如果在**Perferences**->**package settings**中看到**package control**这一项，则安装成功

### 安装插件

1.按下**Ctrl+Shift+P**（Mac下为**Command+Shift+P**）调出命令面板

2.输入**install**调出**Install Package**选项并回车

3.在列表中选中要安装的插件

### 移除插件

1.按下**Ctrl+Shift+P**（Mac下为**Command+Shift+P**）调出命令面板

2.输入**remove**调出**Remove Package**选项并回车

3.选择要删除的插件即可



### 更新插件

1.按下**Ctrl+Shift+P**（Mac下为**Command+Shift+P**）调出命令面板

2.输入**upgrade**调出**Upgrade Package**选项并回车

3.如有更新，则会提示更新

***

## 常用插件

* SublimeTmpl 模板制作插件
* SublimeCodeIntel 代码提示
* Emmet 格式化
* Pretty JSON 格式化JSON数据




