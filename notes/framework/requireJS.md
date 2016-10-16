# requireJS

## 1 建立目录结构
* 推荐的项目脚本目录结构
    * www/
        * index.html
        * js/
            * app/
                * sub.js
                * ...
            * lib/
                * jquery.js
                * canvas.js
                * ...
            * app.js
            * require.js
        * style/
        * ...

## 2 加载requireJS
* 在HTML中引入requireJS文件

    ```html
    <script data-main="js/app" src="js/require.js"></script>
    ```

* data-main表示主JS文件的入口点（这里是js/app.js这个文件）

## 3 在入口文件一开始中编写文件
* requirejs.config

    ```javaScript
    requirejs.config({
        //By default load any module IDs from js/lib
        baseUrl: 'js/lib',
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension since
        //the paths config could be for a directory.
        paths: {
            app: '../app'
        }
    });
    ```

* 引入文件，写主程序

    ```javaScript
    // Start the main app logic.
    requirejs(['jquery', 'canvas', 'app/sub'],
    function   ($, canvas, sub) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
    });
    ```

## 4 定义模块

***

进行中...