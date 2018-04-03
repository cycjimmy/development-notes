# WebStorm 

[Download](https://www.jetbrains.com/webstorm/)

***

## 激活
* 方法1: 试用
  1.将系统时间调整到未来的一个时间。比如整到2080年。
  2.点击打开软件，点击**“Evaluate for free for 30 days”**，激活成功。
  3.接下来就可以进入webstorm使用了
  4.把时间调回当前时间不影响webstrom的使用
* ~~方法2: 选择 `license server` 输入： `http://idea.imsxm.com/`~~
* ~~方法3: 选择 `license server` 输入： `http://idea.iteblog.com/key.php`~~
* 方法4: 选择 `license server` 输入： `http://idea.codebeta.cn`

## win64位的问题
1. 首先安装64位jdk
  * 下载:[http://www.oracle.com/technetwork/java/javase/downloads](http://www.oracle.com/technetwork/java/javase/downloads)
2. 设置系统变量
  * 计算机>属性
  * 高级系统设置
  * 环境变量
  * 查找有没有`JAVA_HOME`变量
    * 有的话点>编辑
    * 没有的话>新建变量名：JAVA_HOME
  * 变量值：`D:\Program Files\Java\jdk1.8.0_112` (安装jdk的位置)
3. 完成以上步骤应该就可以打开 WebStorm64 了


## 设置内存，解决卡顿
1. 找到WebStorm.exe.vmoptions这个文件（64位改对应文件）
  * webstorm安装主目录 > bin > WebStorm.exe.vmoptions
2. 设置内存
  * 找到文件中的Xms和Xmx，将后面的数据修改为大点的数据。



