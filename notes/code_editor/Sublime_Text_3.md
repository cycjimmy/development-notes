# Sublime Text 3

[Download](http://www.sublimetext.com/)

***

## 注册码

```
—– BEGIN LICENSE —–
TwitterInc
200 User License
EA7E-890007
1D77F72E 390CDD93 4DCBA022 FAF60790
61AA12C0 A37081C5 D0316412 4584D136
94D7F7D4 95BC8C1C 527DA828 560BB037
D1EDDD8C AE7B379F 50C9D69D B35179EF
2FE898C4 8E4277A8 555CE714 E1FB0E43
D5D52613 C3D12E98 BC49967F 7652EED2
9D2D2E61 67610860 6D338B72 5CF95C69
E36B85CC 84991F19 7575D828 470A92AB
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
* ESlint JS检查




