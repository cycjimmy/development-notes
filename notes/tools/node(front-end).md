# node & npm 自用前端实用工具总结
 
## 1 起步

### 1.1 安装 nodeJs & npm
初次可直接从官网下载安装(内含最新版的 nodejs 和 npm) [https://nodejs.org](https://nodejs.org)

### 1.2 管理 nodeJs 版本
1. 安装 n 模块
    ```shell
    $ sudo npm install -g n
    ```

2. 升级 nodeJs
    ```shell
    # Use or install the latest official release:
    $ n latest
    
    # Use or install the stable official release:
    $ n stable
    
    # Use or install the latest LTS official release:
    $ n lts
    ```

3. 切换 nodeJs 版本
    ```shell
    $ n
    
      4.6.0
    ο 6.8.0
    ```
    
4. 删除 nodeJs 版本
    ```shell
    $ n rm 0.9.4
    ```

5. n 模块 github 地址：[https://github.com/tj/n](https://github.com/tj/n)

6. **注意：windows 系统不适用以上方法**
    * windows 直接在官网下载最新版本，覆盖安装来升级 nodeJs 版本
    * win10自带的 Ubuntu bash 代码行也可以试一下（未测试过）

### 1.3 MAC系统 npm 需要管理员权限问题(未测试)
```shell
$ sudo chown -R $USER /usr/local   
```

### 1.4 win使用`nvm-windows`安装&管理node版本
1. 安装[nvm-windows](https://github.com/coreybutler/nvm-windows)
2. 在命令行输入nvm验证安装成功
3. 常用命令

    ```shell
    # 查看已安裝的Node版本
    $ nvm list
    
    # 查看提供哪些Node版本
    $ nvm list available
    
    # 安裝指定的Node版本
    $ nvm install [version]
    
    # 指定使用Node版本
    $ nvm use [version]
    ```

## 2 管理 npm 模块管理器
### 2.1 升级 npm 的版本 
* 通用
    ```shell
    $ npm install npm@latest -g
    ```
    
* windows 平台插件： [npm-windows-upgrade](https://github.com/felixrieseberg/npm-windows-upgrade)
    ```shell
    $ npm i -g npm-windows-upgrade
    $ npm-windows-upgrade
    ```

### 2.2 升级 npm 依赖包
[npm-check](https://github.com/dylang/npm-check)是用来检查npm依赖包是否有更新、错误以及是否在使用的，可以方便的使用npm-check进行包的更新

1. 安装npm-check

    ```shell
    $ npm install -g npm-check
    ```

2. 检查全局的 npm 包是否可升级

    ```shell
    $ npm-check -u -g
    ```

### 2.3 淘宝NPM镜像`cnpm` (不推荐，用yarn代替)
1. 安装`cnpm`

    ```shell
    $ npm install -g cnpm --registry=https://registry.npm.taobao.org
    ```
  
2. 用cnpm安装模块

    ```shell
    $ cnpm install [name]
    ```

### 2.4 npm 个人常用命令
```shell
# 查看 npm 的版本
$ npm -v

# 为npm init设置默认值
$ npm set init-author-name 'cycjimmy'
$ npm set init-author-email 'cycjimmy@gmail.com'
$ npm set init-author-url 'https://github.com/cycjimmy'
$ npm set init-license 'MIT'

# 初始化生成一个package.json文件。
# 使用 -y 可以跳过提问阶段，直接生成package.json文件
$ npm init -y

# 列出当前项目安装的所有模块包
$ npm ls --depth=0

# npm install默认会安装dependencies字段和devDependencies字段中的所有依赖包
$ npm i
# 针对国内可以加上参数
$ npm --registry=https://registry.npm.taobao.org i 

# 安装依赖包
# –save：添加到dependencies，可简化为-S
# –save-dev: 添加到devDependencies，可简化为-D
$ sudo npm i -g [package name]
$ npm i [package name]
$ npm i [package name] -S
$ npm i [package name] -D

# 更新依赖包
# -S表示保存新的依赖包版本号到package.json
$ npm update <package name> -S
# npm update只更新顶层依赖包，而不更新依赖的依赖，如果想递归更新取，使用下面的命令
$ npm --depth 9999 update

# 卸载依赖包
$ npm uninstall [package name]
$ npm uninstall [package name] -global

# 执行任务
$ npm run [task name]
```

[其他比较详细的npm命令查看 ](http://javascript.ruanyifeng.com/nodejs/npm.html)

### 2.5 用yarn取代npm
[Yarn](https://yarnpkg.com/) is a package manager for your code.

1. 安装yarn

    ```shell
    $ npm install -g yarn
    ```
    
2. yarn常用命令
    ```shell
    # npm init =>
    $ yarn init
    
    # npm install =>
    $ yarn install 
    $ yarn install --force     #强制所有包重新下载
    
    # npm install --save [package] =>
    $ yarn add [package]
    
    # npm install --save-dev [package] =>
    $ yarn add [package] --dev
    
    # npm install --global [package] =>
    $ yarn global add [package]
    
    # rm -rf node_modules && npm install =>
    $ yarn upgrade [package]
    
    # npm uninstall --save [package] =>
    # npm uninstall --save-dev [package] =>
    $ yarn remove [package]
    
    # npm cache clean =>
    $ yarn cache clean
    
    # 针对国内的设置
    $ yarn config set registry https://registry.npm.taobao.org
    ```

### 2.6 国内抓取node-sass失败的解决方案

```shell
# 使用淘宝镜像
$ SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass
```
