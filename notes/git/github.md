# GitHub

##  快捷键
* `t` 搜索文件
* `s` 光标定位到搜索窗口
* `w` 选择分支
* `r` 快速引用
* `g n` Go to Notifications
* `g d` Go to Dashboard
* `g c` Go to Code
* `g i` Go to Issues
* `g p` Go to Pull Requests
* `g d` Go to Wiki
* `?` 查看快捷键

## GitHub Pages
1. 在仓库里新建一个名为“gh-pages”的分支
2. 在分支里放上自己的静态网页，同步到github，完成
3. 访问域名 https://\[userName\].github.io/\[repositoryName\] 即可看到自己上传的静态页面

## GitHub上代码行语法高亮tag
* 个人常用
    * HTML
    * JavaScript
    * CSS
    * SCSS
    * TypeScript
    * Shell
    * Text
    * Markdown
* [全部tag](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml)

## github桌面
[下载地址](https://desktop.github.com/)

windows版国内安装时常会出问题，可以去[http://download.csdn.net/user/devsplash](http://download.csdn.net/user/devsplash)下载离线安装包，感谢up。

## github api
* [GitHub 开发指南](http://wiki.jikexueyuan.com/project/github-developer-guides/)

## Github访问加速
* 工具 => [githubhost.jar](./githubhost.jar)
* 使用
  * 运行
  ```shell
  # 进入所在目录
  $ cd [githubhost所在目录]
  
  # 运行jar包
  $ java -jar githubhost.jar
  ```
  * 浏览器输入`127.0.0.1:8880`，等待分析运行
  * 将运行结果在hosts文件中更新
    * win: `C:\Windows\System32\drivers\etc`
    * mac: `/private/etc`

## 相关资料
* [你真的会使用Github吗？](https://segmentfault.com/a/1190000008867338)
