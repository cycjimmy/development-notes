# Svn Command

## 安装svn
```shell script
$ brew install svn
```

## 使用
### 检出操作
```shell script
$ svn checkout svn://192.168.1.1/cycjimmy
$ svn checkout https://192.168.1.1/cycjimmy
```

### 查看历史信息
```shell script
# 显示所有的信息
$ svn log

# 查看特定的某两个版本之间的信息
$ svn log -r 6:8

# 查看某一个文件的版本修改信息
$ svn log cycjimmy/HelloWorld.html 
```

```shell script
# 比较工作文件与缓存在 .svn 的"原始"拷贝
$ svn diff

# 比较工作拷贝和版本库中特定版本号的文件
$ svn diff -r 3 cycjimmy.txt

# 比较版本库与版本库
$ svn diff -r 2:3 cycjimmy.txt
```

```shell script
# 检查一个过去版本，不查看他们的区别
$ svn cat -r 版本号 cycjimmy.txt
```

```shell script
# 不下载文件到本地目录的情况下来察看目录中的文件
$ svn list
$ svn list https://192.168.0.1/cycjimmy
```

### 修改和提交
```shell
$ svn status                           # 查看状态
$ svn diff                             # 查看变更内容
$ svn add <file>                       # 跟踪指定文件
$ svn commit -m "commit message"       # 提交文件
```

## 相关资料
* [SVN教程(runoob)](https://www.runoob.com/svn/svn-tutorial.html)
