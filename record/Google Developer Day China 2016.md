# Google Developer Day China 2016

## 主题演讲(9:00-9:45)
### Progressive Web Apps（PWA）
* 交互缓存，快速启动
* 后台通知
* 快速流畅
* UI尺寸动态调整

### Accelerated Mobile Pages（AMP）加速移动网页

### angular项目
* 核心
	* 申明式模板
	* 变更检测
	* 依赖注入
	* ...
* 其他
	* UI组件 angular material
	* i18n
	* 表单
	* 动画

* 服务器渲染
	* nodejs
	* runtime
	* asp.net

* 开发效率（ts）
	* js超集
	* 强类型
	* 可读性
	* 易上手
	* 功能强大
* agular cli
* 测试

***

## Angular 主题演讲 (10:30-11:30 F7明珠厅)

### 组件架构（angular中所有东西都是组件）
compoment = html+css+class

### 性能
* 文件体积 更小 懒加载
* 速度

* just in time 实时编译
* ahead of time 预（AOT）编译器

* 变化检测策略
	* 始终（默认）
	* 分离
	* ...

### 生态系统

## Progressive Web Apps: 概念、优势及方法(10:30-11:30 F5长江厅)
未参加

***

## Angular 中国完整报告(12:30-13:30 F7明珠厅)
（略）

## 使用 Material Design 走向成功(12:30-13:30 3F3B)
未参加

***

## TypeScript：Angular 的超能力(13:30-14:30 F7明珠厅)

### TypeScript
* why TypeScript
  * Big JavaScript apps are hard.
  * JavaScript alone is not enough.
    * Types -> enforce code contract
    * Module -> isolate to meaningful pieces
  * JavaScript需要根据不同版本浏览器编写不同版本的代码（ES3/ES5/ES6...）
  * TypeScript: A typed superset of JavaScript that compiles to plain JavaScript
  * Any browser. Any host. Any OS.
  * Open Source.
  * Benefits from TypeScript today
    * Compile time type checking
    * Opt-in gradual type system
    * Use future JavaScript feature now

* The TypeScript Language
  * One Input, Targets All
    * ES5/ES6/TS -> TypeScript Compiler -> ES3/ES5/ES6
  * JavaScript **IS** TypeScript
  * 在未定义的对象上调用了一个属性或方法从而产生错误，它很容易被忽略而经常出现
  
* 主要增加强类型，原生的依赖注入
  * js中经常出现在未定义的对象上调用了一个属性或方法从而产生错误，它很容易被忽略
  * Type Checking in Action
    * js中难以判断的情况ts会自动判断
      * Managing nullability in JS is error-prone （是否为空）
      * Non-nullable types provide null/undefined coverage （赋值空）
      * Control flow analysis traces flow for you （控制流分析）

### Getting Started with TypeScript + Angular
* ES6 features make code more readable（ES6可读性更高）
* Decorators separate framework from user code（装饰器将框架与用户代码分离）
* Dependency injection makes use of types（依赖注入）

###  兼容第三方库@types
* 例：安装`lodash`第三方d.ts包

  ```shell
  $ npm install -S @types/lodash
  ```

* 在github上搜索第三方插件d.ts包
  * [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

### demo下载
* [https://github.com/zhengbli/ng-china-2016](https://github.com/zhengbli/ng-china-2016)
                                                                            
***

## 深度学习与艺术(14:30-15:30 3F3B)
未参加

## 深度参与：可安装的应用与通知推送机制(14:30-15:30 F5长江厅) 
(略)

***
   
## Progressive Web Apps 工具：Lighthouse 及其他产品(15:30-16:30 F5长江厅)
* lighthouse：chrome插件
  * 一个测试优化工具，主要测试首屏



***

## 使用 Angular 构建 Progressive Web Apps(16:30-17:30 F5长江厅)
* app shell 生成
* service workers 
* push 推送
* demo
  * Today's Code
    * [https://github.com/StephenFluin/2016-pwa-beijing](https://github.com/StephenFluin/2016-pwa-beijing)
  * Full Angular PWA Sample
    * [https://github.com/alxhub/ng2-weather-pwa](https://github.com/alxhub/ng2-weather-pwa)


***

## Web Apps 的未来(5:30-6:30 F5长江厅)
* 今天的WEB到PWA
* Smart Lock
  * 一键登录功能，网站上登录更加方便，方便登录和管理密码
* Physical Web （物理网）
  * 自动向范围内的设备推送消息，设备到达某些指定位置时，就会收到该推送
* PaymentRequest
  * 基于W3C标准网页端的支付API
* Web Bluetooth
  * 浏览器端的蓝牙API接口
* Web NFC
  * google官方的[Chrome App NFC Library](https://github.com/GoogleChrome/chrome-nfc),可以方便的管理和使用chrome nfc
* [WebVR](https://w3c.github.io/webvr/)
  * 浏览器的VR技术









