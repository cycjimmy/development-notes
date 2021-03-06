# [npm-scripts](https://docs.npmjs.com/misc/scripts)

受到[《也许你并不需要 Gulp，Grunt》](http://www.w3ctrain.com/2016/02/27/why-npm-scripts/)这篇文章的启发，决定自己搭建一个适合自己项目的npm-build

***

**状态：写到一半觉得还是不足以满足自己的实际要求，转而研究gulp中**

***

## 基本目录结构
* src/
    * index.html
    * images/
    * ts/
    * js/
    * sass/
    * css/
    * media/
* dist/
    * index.html
    * images/
    * js/
    * css/
    * media/
* package.json

### 需求
1. sass自动编译成css并自动扩展css3
2. typescript自动编译成js
3. js代码检查
4. 自动压缩(html、css、js、图片)
5. 复制文件到相应目录
6. web服务器

*** 

## 创建 package.json
在项目目录中

```shell 
$ npm init
```

## 安装npm包
* [node-sass](https://github.com/sass/node-sass) (SCSS => CSS)

    ```shell
    $ npm i node-sass -D
    ```

* [Autoprefix](https://www.npmjs.com/package/autoprefixer) CSS with PostCSS (自动扩展css)

    ```shell
    $ npm i postcss-cli autoprefixer -D 
    ```

* eslint

    ```shell
    $ npm i eslint -D 
    ```

* 压缩 JavaScript files [uglify-js](https://github.com/mishoo/UglifyJS2)

    ```shell
    $ npm i uglify-js -D
    ```
    
* 压缩图片
    ```shell
    $ npm i imagemin-cli -D
    ```

* 复制文件
    ```shell
    $ npm install -D copy
    ```

* BrowserSync(开启一个本地服务器，自动更新文件，自动在浏览器中同步点击，滚动效果)

    ```shell
    $ npm i browser-sync -D
    ```

* 监听文件的变动

    ```shell
    $ npm i onchange -D
    ```

* parallelshell(允许同时执行多个任务)

    ```shell
    $ npm i parallelshell -D
    ```

## 在package.json中创建scripts
在scripts中创建的任务都能用 `$ npm run [taskname]` 执行

* 把src/sass下的所有scss文件都编译成css，放在src/style下面

    ```json
    "scripts": {
        ...,
        "sass": "node-sass src/sass -o src/style --indent-type tab",
        ...
    }
    ```
    
* 把src/style下的所有css 以'> 5%'为参数适配浏览器
    ```json
    "scripts": {
        ...,
        "autoprefixer": "postcss -u autoprefixer -r src/style/*",
        ...
    }
    ```

（未完）







