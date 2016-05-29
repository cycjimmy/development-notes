## create .gitignore
在git命令行中进入项目所在目录

```git
>touch .gitignore

```
输入 touch .gitignore 在目录中就生成了一个“.gitignore”文件。
然后在”.gitignore” 文件里输入你要忽略的文件夹及其文件就可以了。

## syntax
* \# 以'#'开始的行 被视为注释
* fileName.extensionName 直接忽略某个文件
* 匹配模式最后跟"/"说明要忽略的是目录
* /folderName/ 过滤整个文件夹
* 以星号“*”通配多个字符
	* 例如，*.zip 过滤所有.zip文件
* 以问号“?”通配单个字符
* 以方括号“[]”包含单个字符的匹配列表
* 以叹号“!”表示不忽略(跟踪)匹配到的文件或目录
* 可以使用shell所使用的正则表达式来进行模式匹配
 

## e.g. 常用实例
* .DS_Store
* .sass-cache 
* thumbs.db
* *~
* node_modules
* jspm_packages
* logs
* *.log
* npm-debug.log*
* .publish
* /tmp/
* *.gem
* *.rbc
* /.config



## 官方实例
[github/gitignore](https://github.com/github/gitignore)


