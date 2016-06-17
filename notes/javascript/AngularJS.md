# AngularJS

## 简介
* [https://angularjs.org/](https://angularjs.org/)
* [http://www.apjs.net/](http://www.apjs.net/)
* [http://www.angularjs.cn/](http://www.angularjs.cn/)

### AngularJs核心特性
* MVC(Model←→Controller←→View)
    * Model: 数据模型层
    * View: 视图层，负责展示
    * Controller: 业务逻辑和控制逻辑
    * 好处: 职责清晰，代码模块化
* 模块化Module
* 指令系统(指令的本质：类似于taglib)
* 双向数据绑定

## 前端开发环境
* 代码编辑工具
    * Sublime Text
    * WebStorm
* 断点调试工具
    * chrome 插件 Batarang
* 版本管理工具
    * git
* 代码合并和混淆工具
    * grunt
* 依赖管理工具
    * bower
* 单元测试工具
    * karma
    * jasmine
        * describe(string, function) 这个函数表示分组，也就是一组测试用例
        * it(string, function) 这个函数表示单个测试用例
        * expect(espression) 表示期望expression这个表达式具有某个值或者具有某种行为
        * to\*\*\*(arg) 这个函数表示匹配
* 集成测试工具
    * protractor
        * 专门为AngularJS定制的一款集成测试工具
        * 基于WebDriverJS
        * [https://github.com/angular/protractor](https://github.com/angular/protractor)


## 初探基本概念与用法实例

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
* 依赖注入DI(Dependency Injection)
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


## 基本概念具体讲解

### 1 MVC

* 为什么需要MVC
    * 代码规模越来越大，切分职责是大势所趋
    * 为了复用：很多逻辑是一模一样的
    * 为了后期维护方便：修改一块功能不影响其他功能
    * **MVC只是手段，终极目标是模块化和复用**
* 前端MVC的困难
    * 浏览器运行脚本：浏览器加载脚本→加载完成之后JIT编译执行
    * 操作DOM的代码必须等待整个页面全部加载完成
    * 多个JS文件之间如果出现互相依赖，程序员必须自己解决
    * JS的原型继承也给前端编程带来了很多困难
* AngularJS语境下的MVC是如何实现的？
    * AngularJS中的controller
        * controller使用过程中的注意点
            * 不要试图去复用Controller，一个控制器一般只负责一小块试图（公共的控制器功能放在service中，不要用一个通用的控制器继承）
            * 不要在Controller中操作DOM，这不是控制器的职责
            * 不要再Controller里面做数据格式化，ng有很好用的表单控件
            * 不要在Controller里面做数据过滤操作，ng有$filter服务
            * 一般来说，**Controller是不会互相调用的**，控制器之间的交互会通过事件进行
    * 复用Module
    * 利用directive实现View的复用
    * **AngularJS中MVC是借助于$scope实现的**
        * $scope充当MVC中Data-Model角色
        * $scope是一个POJO(Plain Old JavaScript Object)
        * $scope提供了一些工具方法$watch()/$apply()
        * $scope是表达式的执行环境（作用域）
        * $scope是一个树形结构，与**DOM标签平行**
            * $scope以元素属性的形式被绑定在对应的HTML标签上

                ```javascript
                angular.element($0).scope()
                ```

        * 子$scope对象会继承父$scope上的**属性和方法**
        * 每一个Angular应用只有一个根$scope对象(一般位于ng-app上)
        * **$scope可以传播事件，类似DOM事件，可以向上也可以向下**
            * $emit() 向上传播，影响同层及上层
            * $broadcast 向下传播，影响同层及下层
        * $scope不仅是MVC的基础，也是后面实现双向数据绑定的基础
        * 可以用angular.element($0).scope()进行调试
        * $scope的生命周期
            * Creation 创建
            * Watcher registration 注册监控
            * Model mutation 检测模型变化
            * Mutation observation 观察者模式[观察模型有没有脏]
            * Scope destruction 销毁[自动销毁 or 手动销毁]

### 2 模块化与依赖注入(路由、模块、依赖注入)

* AngularJS的模块化实现
* 一个完整的项目结构是什么样的
    * root [folder]
        * app [folder]
            * css [folder]
            * framework [folder]
            * imgs [folder]
            * js [folder]
                * app.js | 作为启动点的js
                * controllers.js
                * directives.js
                * filters.js
                * services.js
            * tpls [folder] | 放一些html模板片段
            * index.html | 应用的主html文件
        * node_modules [folder]
        * package.json | npm配置项
* 使用ngRoute进行视图之间的路由
    * $routeProvider
* ng官方推荐的模块切分方式是什么？
    * 任何一个ng应用都是由控制器、指令、服务、路由、过滤器等有限的模块类型构成的
    * 控制器、指令、服务、路由、过滤器分别放在一个模块里面（可借助于grunt合并）
    * 用一个总的app模块作为入口点，它一栏其他所有模块
* 一切都是从模块开始的
* 模块之间的依赖应该怎么做？ （依赖注入）


### 3 双向数据绑定
* 取值表达式与ng-bind指令
    * 取值表达式 {{...}} 【在angularJS的库还没有加载到页面中的时候，会显示花括号形式源代码】
    * ng-bind="..." 【不会显示花括号形式代码，一般在index首屏使用】
* 动态切换标签样式
* ng-show和ng-hide
* ng-class
	* 可以接收表达式
* ngAnimate

### 4 路由
#### 4.1 为什么要用路由
* Ajax请求不会留下history记录
* 用户无法直接通过URL进入应用中的指定页面（保存书签，链接分享给朋友）
* Ajax对SEO是个灾难

#### 4.2 用ngRoute进行视图之间的路由
* 有多层嵌套路由时，可使用[UI-Router](https://github.com/angular-ui/ui-router)

#### 4.3 前端路由的基本原理
* 哈希#
* HTML5中心的history API
* 路由的核心是给应用定义“状态”
* 使用路由机制会影响到应用的整体编码方式（需要预先定义好状态）
* 考虑兼容性问题与“优雅降级”

### 5 指令
#### 5.1 最简单的指令hello
* 匹配模式restrict
	* 对应4种模式
		* A 表示作为属性匹配（默认）
	
			```html
			<div hello></div>
			```
			
		* E 表示作为元素匹配
	
			```html
			<hello></hello>
			```
			
		* M 表示作为注释匹配
	
			```html
			<!-- dircetive:hello -->
			<div></div>
			```
			
		* C 表示作为样式匹配
	
			```html
			<div class="hello"></div>
			```
	* 推荐使用元素和属性的方式使用指令
	* 当需要创建带有自己的模板的指令时，使用元素的方式创建指令
	* 当需要为已有的HTML标签添加功能时，使用属性的方式创建指令
		
* 模板template
	* 使用template，直接编写HTML
	* 用templateUrl可以指定独立html模板路径，就不需要我们把HTML代码写在JS里了
	* $templateCache用来缓存模板，以便于用在其他地方
* replace transclude
	* replace为true时，模板内容替换原内容
	* transclude为true时，原内容会被放到模板中属性为ng-transclude的标签内[这是一个非常重要的配置项，可以实现指令互相嵌套]

#### 5.2 comile与link(操作元素、添加CSS样式、绑定事件)
* 三个阶段
	* 加载阶段
		* 加载angular.js，找到ng-app指令，确定应用边界
	* 编译阶段
		* 遍历DOM，找到所有指令
		* 根据指令代码中的template、replace、transclude装换DOM结构
		* 如果存在compile函数则调用
	* 链接阶段
		* 对每一条指令运行link函数
		* link函数一般用来**操作DOM**，绑定事件监听器，绑定作用域
* 几个注意点：
	* compile函数用来对模板自身进行转换，而link函数负责在模型和视图之间进行动态关联
	* 作用域在链接阶段才会被绑定到编译之后的link函数上
	* compile可以返回preLink和postLink函数，而link函数只会返回postLink函数
	* 如果需要修改DOM结构，应该在postLink中来做，如果在preLink中做会导致错误
	* 大多数时候我们只要编写link函数即可

#### 5.3 指令与控制器之间的交互
* link函数的参数
    * scope
    * element
    * attr
        * 注意HTML里用驼峰法则写的属性在js attr调用的时候变为小写，不然会报错

#### 5.4 指令间的交互

#### 5.5 scope的类型与独立scope
* 设定设置项 scope: {}, 就创建了独立的scope

#### 5.6 scope的绑定策略
* @ 
    * 把当前属性作为**字符串**传递。
    * 还可以绑定来自外层scope的值，在属性值中插入{{}}即可
* = 
    * 与父scope中的属性进行**双向绑定**
* & 
    * 传递一个来自父scope的**函数**，稍后调用
    
#### 5.7 AngularJS内置指令
* a
* form
    * 原生form表单不能嵌套，angular的form可以嵌套
    * angular为form扩展了自动校验，防止重复提交等功能
    * angular对input元素的type进行了扩展，提供了以下几种类型
        * text
        * number
        * url
        * email
        * radio
        * checkbox
        * hidden
        * button
        * submit
        * reset
    * angular为表单内置了几种css样式
        * ng-valid
        * ng-invalid
        * ng-pristine
        * ng-dirty
    * angular内置校验器
        * require
        * minlength
        * maxlength
* ng-app 告诉angular入口在哪
* ng-bind 数据模型的双向绑定
* ng-事件
* ng-include 可用来缓存模板
* script

#### 5.8 自定义指令和第三方指令库
* 自定义指令：Expander
* 第三方指令库：[angular-ui](http://angular-ui.github.io/)
    * 常用组件：ng-grid


### 6 Service和Provider
#### 6.1 使用$http服务（angular内置的service，类似$ajax）

    ```javascript
    var myModule=angular.module("MyModule",[]);
    myModule.controller('LoadDataCtrl', ['$scope','$http', function($scope,$http){
        $http({
            method: 'GET',
            url: 'data.json'
        }).success(function(data, status, headers, config) {
            console.log("success...");
            console.log(data);
            $scope.users=data;
        }).error(function(data, status, headers, config) {
            console.log("error...");
        });
    }]);
    ```

#### 6.2 Service的特性
* Service都是**单例**的
* Service由$injector负责实例化（不需要自己去NEW实例）
* Service在整个应用的生命周期中存在，可以用来**共享数据**
* 在需要使用的地方利用**依赖注入**机制注入Service
* 自定义的Service需要写在内置的Service后面
* 内置Service的命名以$符号开头，自定义Service应该避免

#### 6.3 Service、Factory、Provider本质上都是Provider
* angular里三者只是参数的格式或数据不同，本质上都是Provider
* Provider模式是“策略模式”+“抽象工厂模式”的混合体

#### 6.4 使用$filter服务
* $filter是用来进行数据格式化的专用服务
* AngularJS内置了9个filter
    * currency 货币
    * date 日期
    * filter
    * json
    * limitTo
    * lowercase 小写
    * number 
    * orderBy 排序
    * uppercase 大写
* filter可以嵌套使用（用管道符号 | 分隔）
* filter是可以传递参数的
* 用户可以定义自己的filter
    
    ```javascript
    var myModule=angular.module("MyModule",[]);
    myModule.filter('filter1',function(){
        return function(item){
            //...
        }
    });  
    ```

#### 6.5 其他内置的Service介绍
* $compile 编译服务
* $filter 数据格式化工具
* $interval
* $timeout
* $locale 国际化
* $location 监控浏览器地址栏变化
* $log 日志
* $parse
* $http 封装了Ajax

### 7 实际工作流程
* 界面原型设计
* 切分功能模块并建立目录结构
* 编写UI（可使用angular-ui、bootstrap等）
    * UIRouter
    * ngGrid
    * 表单校验
    * ...
* 编写Controller
* 编写Service
* 编写Filter
* ...
* 单元测试和集成测试



## 核心原理解析
### 1 AngularJS的启动过程分析
* 启动过程概述
    * 用自执行函数的形式让整个代码在加载完成之后立即执行
    * 检查是不是多次导入Angular\[window.angular.bootstrap\]
* 启动方式1：自动启动
* 启动方式2：手动启动
* 启动方式3：多个ng-app
* 绑定jquery
* 全局对象angular(injector方法)
* publishExternalAPI(angular)
* 调用setupModuleLoader(window)函数建立模块机制
* 注册内核provider(两个最重要的provider：$parse与$rootScope)
* angularInit：防止多次初始化ng-app
* bootstrap：创建injector、拉起内核和启动模块、调用compile服务

### 2 依赖注入原理分析：Provider与Injector

### 3 指令的执行过程分析

### 4 $scope与双向数据绑定分析







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
* 脏值检测原理
* 由于脏值检测，使用angular时需要注意一些问题：
    * 监控的表达式不要过于复杂，表达式数量不要太多
    * 监听函数内不要有DOM操作，那样会显著降低性能
    * 不能互相监听对方会修改的属性，以免形成交叉引用
    * 主席ng默认的TTL是10次
    * **深拷贝式的脏值检测会消耗更多内存**（复杂的大型JSON数据尤其如此）

### Dependency Injection
* 每一个angular应用都有一个injector
* injector负责自动处理依赖关系、实例化对象
* 对用户代码来说，injector是透明的
* injector会自动分析函数签名，注入所需要的对象
* 申明依赖关系的三种方式 [http://docs.angularjs.org/guide/di](http://docs.angularjs.org/guide/di)
* DI可以用在不同的地方，主要用在controller和factory中

### Module & Controller & Service



## ng控件开发

## TDD和前端自动化测试