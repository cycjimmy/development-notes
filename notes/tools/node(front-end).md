# node & npm 自用前端实用工具总结
 
## 1 起步

### 1.1 安装 nodeJs & npm
初次可直接从官网下载安装(内含最新版的 nodejs 和 npm) [https://nodejs.org](https://nodejs.org)

### 1.2 管理 nodeJs 版本
1. 安装 n 模块
    ```c
    $ sudo npm install -g n
    ```

2. 升级 nodeJs
    ```c
    # Use or install the latest official release:
    $ n latest
    
    # Use or install the stable official release:
    $ n stable
    
    # Use or install the latest LTS official release:
    $ n lts
    ```

3. 切换 nodeJs 版本
    ```c
    $ n
    
      4.6.0
    ο 6.8.0
    ```
    
4. 删除 nodeJs 版本
    ```c
    $ n rm 0.9.4
    ```

5. n 模块 github 地址：[https://github.com/tj/n](https://github.com/tj/n)

6. **注意：windows 系统不适用以上方法**
    * windows 直接在官网下载最新版本，覆盖安装来升级 nodeJs 版本
    * win10自带的 Ubuntu bash 代码行也可以试一下（未测试过）

### 1.3 MAC系统 npm 需要管理员权限问题(未测试)
```bash
$ sudo chown -R $USER /usr/local   
```

## 2 管理 npm 模块管理器
### 2.1 升级 npm 的版本 
* 通用
    ```c
    $ npm install npm@latest -g
    ```
    
* windows 平台插件： [npm-windows-upgrade](https://github.com/felixrieseberg/npm-windows-upgrade)
    ```c
    $ npm i -g npm-windows-upgrade
    $ npm-windows-upgrade
    ```

### 2.2 升级 npm 依赖包
[npm-check](https://github.com/dylang/npm-check)是用来检查npm依赖包是否有更新、错误以及是否在使用的，可以方便的使用npm-check进行包的更新
1. 安装npm-check
    ```c
    $ npm install -g npm-check
    ```

2. 检查全局的 npm 包是否可升级
    ```c
    $ npm-check -u -g
    ```

### 2.3 npm 个人常用命令
```
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

# 安装依赖包
# –save：添加到dependencies，可简化为-S
# –save-dev: 添加到devDependencies，可简化为-D
$ sudo npm i -g <package name>
$ npm i <package name>
$ npm i <package name> -S
$ npm i <package name> -D

# 更新依赖包
# -S表示保存新的依赖包版本号到package.json
$ npm update <package name> -S
# npm update只更新顶层依赖包，而不更新依赖的依赖，如果想递归更新取，使用下面的命令
$ npm --depth 9999 update

# 卸载依赖包
$ npm uninstall <package name>
$ npm uninstall <package name> -global

# 执行任务
$ npm run <task name>
```

[其他比较详细的npm命令查看 ](http://javascript.ruanyifeng.com/nodejs/npm.html)

