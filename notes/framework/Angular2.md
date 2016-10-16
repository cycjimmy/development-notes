# Angular2开发

## 起步

* 安装[python](https://www.python.org/)

* node版本检查

    ~~angular-cli要求node版本是**4.x.x**，官方起步教程要求**5.x.x**~~ v6.8.0已测试可用
    

* 更新npm到**3.x.x**版本
    
    这个是官方要求的，**2.x.x**版本无法安装angular-cli


    ```shell
    $ npm i -g npm@latest
    ```

* 全局安装typescript

    ```shell
    $ npm i -g typescript typings
    
    # 如typings安装出错，使用下方安装
    $ npm i -g typings
    $ typings install 
    ```

* 全局安装node-sass
    
    非必要，因为安装cli的时候要用，而且很多次都在那边出错，所以先手动安装个应该没什么坏处
    
    ```shell
    $ npm i -g node-sass
    
    # 如上面的typings安装出错，使用下方安装
    $ npm i -g typings
    # typings install 
    ```

* 全局安装angular-cli

    成功失败全看脸orz

    ```shell
    $ npm i -g angular-cli
    ```
    

* 创建ng2项目

    ```shell
    $ ng new <project-name>
    
    # 对已建好的工程文件夹
    $ cd ...
    $ ng init
    ```
    
    这边基本都卡在`Installing packages for tooling via npm.`，尝试以下代码手动安装npm包
    
    ```shell
    $ npm cache clear
    $ npm install
    ```



