# AngularJS

## 基本概念与用法实例
先来一个hello world

```html
<!DOCTYPE html>
<html ng-app>
<!--ng-app告诉angular引擎从这里开始是它应该管理的内容-->
    <body>
        <div ng-controller="helloAngular">
        <!--ng-controller设置控制器Controller-->
            <p>{{greeting.text}},angular</p>
        </div>
    </body>
    <script src="angular-1.0.3/angular.min.js"></script>
    <script src="helloAngular.js"></script>
</html>
```

```javascript
function helloAngular ($scope) { 
//helloAngular是controller
//Angular会使用$injector自动注入$scope对象
    $scope.greeting = {text: 'Hello'};//这是Model
}


//下面是用模块的写法
var myModule = angular.module("helloAngular", []);
myModule.controller("helloAngularController", ['$scope', function helloAngular ($scope) { //告诉angular需要注入$scope
    $scope.greeting = {text: 'Hello'};
}]);
//用上面这种写法html文件需要相应改
//ng-app属性的值需赋值为模块名(这里为helloAngular)
//ng-controller属性的值需赋值为调节器名(这里为helloAngularController)

```

* MVC：作为DataModel的$scope
    * $scope充当MVC中Data-Model角色
    * $scope是一个POJO(Plain Old JavaScript Object)
    * $scope提供了一些工具方法$watch()/$apply()
    * $scope是表达式的执行环境（作用域）
    * **$scope是一个树形结构，与DOM标签平行**
        * $scope以元素属性的形式被绑定在对应的HTML标签上

            ```javascript
            angular.element($0).scope()
            ```
            
    * **子$scope对象会继承父$scope上的属性**
    * 每一个Angular应用只有一个根$scope对象(一般位于ng-app上)
    * **$scope可以传播事件，类似DOM事件，可以向上也可以向下**
    * $scope的生命周期
        * Creation 
        * Watcher registration 注册事件
        * Model mutation 
        * Mutation observation 观察者模式
        * Scope destruction 销毁
* 依赖注入DI
    * 用构造器实现依赖注入
    * 除了自动注入$scope之外，还可以自动注入$location、$window等，包括自定义的service，都可以注入
    * 依赖注入一般用在controller和factory中
* 模块化Module
    * 模块是Service、Directive、Filter、配置信息的集合
        * Module
            * config
                * routes
            * filter
            * directive
            * factory | server | provider | value
            * controller
    * 使用angular.module(...)来创建或者获取模块
    * 模块之间可以互相依赖
    * 模块可以动态加载
    * 切分成小模块便于进行单元测试和集成测试
    * **medules are containers**
        
        ```html
        <html ng-app="moduleName">
        ```
        
        * angular.module(): 一切都从定义模块开始
        * 通用的对象和功能使用service
        * 与DOM操作相关的内容放在Directive里面
        * Contorller负责把所有东西**粘合**起来，比较复杂的业务逻辑也放在Controller里面
* Service
    * service是一些**单例的对象或者function**，用来完成一些通用的功能
    * Angular内置了很多Service [http://docs.angularjs.org/api/](http://docs.angularjs.org/api/)
    * 内置的Service都以$符号开头，自定义的Service最好规避$符号
    * 如果你需要某个service，你只要申明即可，angular会帮你**自动注入**，angular使用**构造器注入**的方式：
        
        ```javascript
        var MyController = function ($location) {...};
        MyController.$inject = ['$location'];
        myModule.controller('MyController', MyController);
        ```
        
        ```javascript
        var myService = function ($http) {...};
        myModule.factory('myService', ['$http', myService]);
        ```
        
* Filter 过滤
* Two way DataBinding 双向数据绑定
* Directive 指令
* Unit Testing & E2E Testing 
    * JTestDriver
    * Jasmine

## 核心原理解析

### HTML Parser & Directives
指令的目的是用来自定义HTML标签，指令时一种标记，用来告诉HTML Parser 这里需要编译

* 指令命名规则：推荐使用中划线分隔的写法，例如

    ```html
    <input ng-bind="name">
    ```

* 指令形式

    ```html
    <my-dir></my-dir>
    <span my-dir="exp"></span>
    <!--directive:my-dir exp -->
    <span class="my-dir: exp;"></span>
    ```

* Parser的本质：JS版的**编译器** 
* 指令操作(这是使用Angular封装ui组件的基础) [示例](http://docs.angularjs.org/guide/directive)
    * 指令嵌套
    * 指令处理HTML元素
    * 指令之间的交互

### Two way DataBinding

### Dependency Injection
### Module & Controller & Service
