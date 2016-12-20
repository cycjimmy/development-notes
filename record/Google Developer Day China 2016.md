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
* angular cli
* 测试
  * Augury（第三方chrome插件）

***

## Angular 主题演讲 (10:30-11:30 F7明珠厅)

### 组件架构
* angular中所有东西都是组件（目前angular的核心概念）
* **component = html + css + class**

### 性能表现
* 文件体积
  * 更小
  * 懒加载使首屏加载代码更少
* 速度
  * 执行更快
  * 操作量更少
  * 内存压力更低
  * ...
  
#### Interpreted Templates 解释模板 （angular 1）
* html/css/js 输入 =>
* Template Compiler 模板编译器 => 
* Change Detection 变化检测（包括下面3个时期） => 
  * DI Runtime 依赖注入执行期
  * Change Detection Runtime 变化检测执行期
  * View Runtime 视图执行期
* Renderer 渲染器输出

#### Compiler Generates Code 编译生成代码（angular 2）
* html/css/js 输入 =>
* Compiler 编译器（JIT模式 和 预AOT模式） => 
  * just in time 实时编译 （开发阶段）
  * ahead of time 预AOT编译器 （无需浏览器内部解析或编译，build阶段使用） 
* View 视图

#### lazy loading 懒加载
* Route 路由 <= **Lazy Loading Boundary 懒加载边界** => Component 组件

#### Change detection strategies 变化检测策略
* Always 始终（默认）
* On push 推进
* Detached 分离

#### 其他性能提升
* Web Workers
* Service Workers
* ...


## Progressive Web Apps: 概念、优势及方法(10:30-11:30 F5长江厅)
（未参加）

***

## Angular 中国完整报告(12:30-13:30 F7明珠厅)
（略）

## 使用 Material Design 走向成功(12:30-13:30 3F3B)
（未参加）

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
（未参加）

## 深度参与：可安装的应用与通知推送机制(14:30-15:30 F5长江厅)
### Progressive Web Apps（PWA 渐进式网页应用）
* Reliable 
  * 稳定可靠：可快速加载完毕，即使离线或者网络不可靠，也能正常运行
* Fast 快速运行：
  * 动画流畅播放，用户滚动浏览时不卡顿，导航顺畅无碍
* Engaging 便于互动：
  * 可以从主屏幕启动，还可以发送推送消息

#### Add To Home Screen
* Was Broken 想法与现实
  * 需要用户操作
    * 选项藏在菜单深处
  * 它会在哪里启动呢？
    * 这要取决于书签
  * 是否能离线运行？
    * 用户并未期待能离线运行

* 导入离线清单可实现离线缓存机制

  ```html
  <link rel="manifest" href="/manifest.json">
  ```

* Automatically Prompting the User
  * Offline 离线
    * 使用Service Worker确保**离线体验**
  * Manifest 清单
    * 定义**要启动的对象**及启动方式
  * Engaged 投入
    * **用户真正投入到应用中**，并频繁使用应用

* A Promise to the User 对用户的承诺
  * Works Offline 离线也可运行
  * Consistent Experience 提供一致的体验
  * The User is Engaged 用户真正投入到应用中

### 利用推送通知与用户深度互动
* 网站推送通知（不需要打开浏览器）

#### 通知剖析 
* 通知时机的把握：要合时
  * 用户确实需要
  * 而且就是现在
* 通知内容：要精确
  * 通知中包含**具体的信息，而且用户确有必要了解这些信息或据以采取行动**
* 通知中的内容和人物：要切实相关
  * 所通知的信息来自对用户重要的人或来源
  
* 推送通知时必须思考的问题
  * 通知是否足够重要，有必要**中断**用户体验？
* 例子：
  * 几个正面例子：
    * 推送时间清晰
    * 推送内容简洁明确
    * ...
  * 几个反例：
    * “您的信用卡进行了消费”
    * “您收到了一条消息”（用户一脸懵逼）
    * “已经成功安装了应用”
    * ...

#### Web Push Protocol 网络推送协议
  * Voluntary Application Service Identification (VAPID 自愿性应用服务身份证明)
    * Public Key 公钥: 有公钥才能订阅
    * Private Key 私钥: 有私钥才能发送消息
  * Generating VAPID Keys
    * 自行生成
      
      ```javascript
      var curve = crypto.createECDH('prime256v1');
      curve.generateKeys();
      ```
    
    * 使用库
      * [https://github.com/web-push-libs/web-push](https://github.com/web-push-libs/web-push)

#### 订阅和退订何时提示？
* 明确具体、告知背景信息**由用户发起**
* 不让用户感到惊讶
* 为用户提供**丰富的选项** （重要）

#### 使用网络推送协议发送消息
* 加密消息
  * 订阅密钥/有效负载 => AES128 => 加密的消息
* Remember: JSONified Subscription Object
* Remember: VAPID

#### 其他
* 通知也可以有操作按钮
  * 让用户无需打开应用，即可轻松完成任务，如：
    * Like 点赞
    * Tweet 转发
    * Confirm or cancel reservations 确认或取消预定

### 创造更好的互动环境（小总结）
* 添加**manifest.json**以实现“添加到主屏幕”功能
* 确保通知**合时**、**精确**、**切实相关**
* **征求用户同意**时要告知背景信息
* 让用户获得**极佳的使用体验**

### What's Next? （更多实用资源）
* [网络推送通知入门指南](https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/)
* [对数据有效负载进行加密](https://developers.google.cn/web/updates/2016/03/web-push-encryption)
* [Chrome中的VAPID](https://developers.google.cn/web/updates/2016/07/web-push-interop-wins)

***

## Progressive Web Apps 工具：Lighthouse 及其他产品(15:30-16:30 F5长江厅)
* lighthouse：chrome插件（一个测试优化工具，主要测试首屏）
  * 部分检测项目
    * 当用户禁用scripts时，页面的渲染情况
    * 是否启用HTTPS
    * 是否注册Service Worker
    * Manifest清单相关检测
    * 离线可用
    * ...

### PWA优化
* Server-side rendering 服务器端渲染
  * 提高第一次页面渲染速度
  * 内容不再依赖于JavaScript
* Adding a Service Worker
  * Make it work offline
  * 切记：Service Worker是一个不断更新的服务！

### 浏览器开发者工具：应用程序面板
* 可以一站式完成所有Service Worker的debug过程

### 相关链接
* [iFixit 客户代码样例](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo)
* [Lighthouse 项目主页](https://github.com/GoogleChrome/lighthouse)
* [\[视频\]实用Service Worker实现实时加载](https://www.youtube.com/watch?v=jCKZDTtUA2A)
* [PWA代码实验室](https://codelabs.developers.google.com/pwa-dev-summit)


***

## 使用 Angular 构建 Progressive Web Apps(16:30-17:30 F5长江厅)
* app shell Generation 生成
  * 核心代码
    * `app.ts`中注入AppShell模块
    
      ```typescript
      import {AppShellModule} from '@angular/app-shell';
      import {NgModule} from '@angular/core';
      import {CommonModule} from '@angular/common';
      
      import {RootComponent} from './root';
      //import ...
  
      @NgModule({
        bootstrap: [RootComponent],
        declarations: [
          RootComponent,
          //...
        ],
        imports: [
          AppShellModule,
          CommonModule,
          //...
        ],
      })
      export class AppModule {}
      ```
  
    * `*shellRender` 和 `*shellNoRender`
      
      ```html
      <main class="main" *shellNoRender>
        <weather-card *ngFor="let city of cities" [city]="city"></weather-card>
      </main>
      <main class="main" *shellRender>
        <h2>Loading...</h2>
      </main>
      ```
  
  * Output：Dom Tree & Critical path CSS
    
    
* service worker
  * Registration 注册
  
    ```html
    <script defer>
      if (navigator['serviceWorker']) {
        navigator.serviceWorker.register('/worker-basic.js').then(() => {
          console.log('Angular service worker installed')
        }, err => {
          console.error('Angular service worker error:', err);
        });
      }
    </script>
    ```
  
  * ngsw-manifest.json 清单(例)
  
    ```json
    {
      "routing": {
        "routes": {
          "/": {
            "prefix": false
          }
        },
        "index": "/index.html"
      }
    }
    ```
  
  * 利用angular-cli工具生成`manifest.webmanifest`文件
  
  
* push 推送
  * 注入 ServiceWorkerModule 服务工模块
    
      ```typescript
      //import ...
    
      @NgModule({
        bootstrap: [AppComponent],
        imports: [
          BrowserModule,
          RouterModule.forRoot([]),
          AppShellModule.runtime(),
          CommonModule,
          ServiceWorkerModule,
          //...
        ],
      })
      export class AppModule {}
      ```
  
  * registerForPush 推送注册
  
    ```typescript
    NgServiceWorker.registerForPush();
    ```
  
  * Push Observable 推送可见
  
    ```typescript
    NgServiceWorker.push : Observable<message>
    ```
    
  * Push Messages 推送信息
    
    ```typescript
    export class AppComponent {
      push;
      msgs;
      constructor(sw: NgServiceWorker){
        if (sw) {
          sw.registerForPush().subscribe(reg => {
            this.push = reg.toJSON();
          });
          this.msgs = sw.push.scan((msgs, value) => {
            msgs.push(value);
            return msgs;
          }, []);
        }
      }
    }
    ```
  
* demo
  * Today's Code
    * [https://github.com/StephenFluin/2016-pwa-shanghai](https://github.com/StephenFluin/2016-pwa-shanghai)
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









