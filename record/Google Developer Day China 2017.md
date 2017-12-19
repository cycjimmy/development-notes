# Google Developer Day China 2017

(20171213)

***

## 09:30 ~ 10:30 开幕主题演讲(301)
(略)

***

## 10:45 ~ 11:15 渐进式网页应用：快速、集成、可靠并且具有吸引力
### 渐进式网页应用应具有以下特点：
* 快速
* 集成
  * 网络推送通知
* 可靠
  * Service Worker
  * HTTPS
* 有吸引力

### Service Worker： 客户端Javascript代理
```text
客户端 ←→ Service Worker ←→ 网络服务器
                ↑
                ↓
               缓存
```

 * 目前多种浏览器已经支持Service Worker
 * 实现推送功能
   1. 服务器
   2. 推送通知终端
   3. ServiceWorker.js
     ```javascript ServiceWorker.js
     onpush = function(event) {
       var data = event.data.json();
       self.registration.showNotification(data.title, data.options);
     };
     ```
   4. 用户收到推送通知

### HTTPS: 网站和用户之前的安全连接
* 保障用户的安全
  * 身份
  * 机密性
  * 完整性

### 实现渐进式网页应用的三种方法
* 从头构建
* 简单版本
* 单一功能

***

## 12:30 ~ 01:00 渐进式网页应用构建详解(302)
### Manifest
```html
<link rel="manifest" href="/manifest.json">
```
* [https://developer.mozilla.org/en-US/docs/Web/Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

### Service Worker
* 生命周期
  ```text
               ┌→ 激活 ←→ 空闲 ←→ 中止
  注册 ←→ 安装 ←┤
               └→ 错误
  ```

* 适用于**第二次**加载
* 注册 Service Worker
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      // registration worked
      console.log('Registration succeeded.');
    }).catch(function(err) {
      // registration failed
      console.log('Registration failed with ' + err);
    });
}
```
* 添加一个 install Event 处理程序
```javascript
self.addEventListener('install', function(event) {
  return self.skipWaiting();
});
```
```javascript
self.addEventListener('activate', function(event) {
  event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }));
      })
    );
});
```
* 添加一个 fetch Event 处理程序
```javascript
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          return response || fetch(event.request);
        });
    );
  });
```
* 作用域
  * 不要将Service Worker文件与其他JS放在同一个目录下，以防出现问题. E.g. navigator.serviceWorker.register('~~/scripts~~/sw.js')

### 缓存、回退到网络的设计

### 一个库帮助你完成
[https://workboxjs.org](https://workboxjs.org)

### 其他资源
* [您的第一个 Progressive Web App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/index.html)
* [调试 Service Worker](https://codelabs.developers.google.com/codelabs/debugging-service-workers/index.html)
* [网络推送通知](https://codelabs.developers.google.com/codelabs/push-notifications/)
* [利用 PaymentRequest Api 实现无缝付款](https://codelabs.developers.google.com/codelabs/payment-request-api/index.html)

***

## 01:15 ~ 01:45 如何使用 Firebase：构建通用翻译工具(301)
### 传统移动应用
```text
应用 ←→ 计算 ←→ Cloud API
```

### 为了构建这款Firebase应用，我们将使用
* Cloud Storage
* Cloud Firestore: 文档数据库
* Cloud Functions: 可以添加一些机器学习功能
  * Cloud Speech API
  * Cloud Translation API

### 我们不需要服务器
```text
                                 ┌- Firestore
应用 + Firebase SDK ←→ Firebase -┼- Storage
                                 └- Cloud Functions -- Cloud
```

### 平台选择
* iOS
  ```swift
  pod 'Firebase/Core'
  ...
  FIRApp.configure()
  ```

* Android
  ```java
  compile 'com.google.firebase:firebase-core:9.0.2'
  ...
  apply plugin:'com.google.gms.google-services'
  ```

* Web
  ```html
  <script src=".../firebase.js"></script>

  <script>
  var config = {...};
  firebase.initializeApp(config);
  </script>
  ```

* C++

### 连接 Firebase
* Cloud Storage
  ```html
  <!--Html-->
  <input type="file" id="file" />
  <button id="submit">Upload Audio!</button>
  ```

  ```javascript
  // Javascript
  var ipt_File = document.querySelector('#file');
  var btn_Submit = document.querySelector('#submit');

  btn_Submit.addEventListener('click', function() {
    // Gets files from input
    var file = ipt_File.files[0];

    var ref = firebase.storage().ref(`speech/${userId}`);

    // Upload to Firebase
    ref.put(file)
       .then(function(snapshot) {
           console.log('Uploaded!');
           var audio_url = snapshot.downloadURL;
       });
  });
  ```
* Cloud Firestore
  ```html
  <!--Html-->
  <div id="output"></div>
  ```

  ```javascript
  // Javascript
  var div_Output = document.querySelector('#output');

  var language = 'zh-CN';
  var firestore = firebase.firestore();
  var user = userid;

  var userDocument = firestore.collection('translations/' + user.uid);

  userDocument.onSnapshot(snapshot => {
    if (snapshot.exists) {
      div_Output.innerHTML = snapshot.get(language);
    }
  });
  ```
* Cloud Functions
  * Cloud Speech Api
    ```javascript
    var functions = require('firebase-functions');
    var speechClient = require('@google-cloud/speech')();
    var firestoreClient = require('@google-cloud/firestore')();

    exports.speech = function.storage.object().onChange(event => {
      var gcsObject = event.data;
      var request = {
        audio: {
          url: 'gs://' + gcsObject.bucket + '/' + gcsObject.name
        },
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz : 16000,
          languageCode: 'en-US'
        }
      };

      return speechClient.recognize(request)
                .then(data => {
                  var transcription = data[0].results.map(result => result.alternatives[0].transcript).join('\n');

                  return firestoreClient.doc(`translations/${gcsObject.name}`)
                          .set({
                            language: 'en-US',
                            text: transcription
                          });
                });
    });
    ```

  * Cloud Translation Api
    ```javascript
    var functions = require('firebase-functions');
    var translateClient = require('@google-cloud/translate')();
    var firestoreClient = require('@google-cloud/firestore')();

    exports.translate = functions.firestore
      .document('transcriptions/{user}')
      .onWrite(event => {
        var snapshot = event.data;
        var user = event.params.user;

        if (snapshot.exists) {
          var value = snapshot.get('text');

          return translateClient.translate(value, 'zh-CN')
            .then(data => {
              return firestoreClient.doc(`translation/${user}`)
                .set({
                  'zh-CN': data[0]
                });
            });
        }
      });
    ```

### 发布 Firebase Hosting

### firebase 托管
```shell
// Initialize the Firebase Project
$ firebase init

// Serve the app locally
$ firebase serve

// Deploy to YOUR_APP.firebaseapp.com
$ firsbase deploy
```

### 相关链接
* [Firebase 网站](https://firebase.google.cn)
* [Github代码段](https://github.com/mimming/zero-to-app-universal-translator)

***

## 02:00 ~ 02:30 Firebase 中的新增功能(302)
(略)

***

## 03:00 ~ 03:30 Firebase 功能更新 构建更好的应用(305)
* 使用Firebase App Indexing
* 遇到问题怎么办？
  * stackoverflow
  * google group
  * firebase 的"问题排查"功能: 一年有10次免费的咨询机会，有专人为你解答

***

## 03:45 ~ 04:15 使用 Firebase 了解和发展您的现有应用(301)
### 应用发布之后改如何？
应用的第一版可能不是最佳版本，开发者们发布之后要想办法改进应用体验，保持竞争力

### 如何确诊生产环境的应用缺陷
* 崩溃 crashes
* 停顿画面 Unresponsiveness
* 资源用量 Resource Usage
* 一般错误 General Errors

#### 崩溃报告
* Crash Reporting: 现有的Firebase崩溃报告方案
  * 自动崩溃报告分类
  * 包括Firebase分析结合
* Crashlytics: Firebase崩溃报告的未来
  * 支持 Unity/ 安卓 NDK
  * 搜索崩溃报告和问题
  * 目前还在测试版
  * 包括Firebase Functions 结合

#### 生产环境监控
只有生产环境监控才能完全理解用户所体验的问题
* 性能监控控制台
  * 自动测量应用启动时间、HTTP/HTTPS 网络请求等
  * 自定性能监控项目

### 理解用户互动
* 收应用操作的回馈
  * 免费、无限使用
  * 可将咨询输入bigQuery来做更多的分析

### 灵活的应用修改解决方案
* 在生产环境种调整应用操作
* 准确针对用户群体

```swift
// 下载远程配置的参数
RemoteConfig.remoteConfig().fetch { (status, error) in
  if let error = error { print(error) }
  self.setAppearance()
}

// 使用下载的参数
func setAppearance() {
  RemoteConfig.remoteConfig().activateFetched()
  let configValue = RemoteConfig.remoteConfig()["color_scheme"]
  if configValue.stringValue == "dark" {
    colorScheme = .dark
  } else {
    colorScheme = .light
  }
}
```

### 动态链接
* 使用Smart URL 让现有和潜在的用户们分享应用内容
* 通过动态链接安装应用后还可显示链接内容

### 预测用户行为
* 与 A/B 测试、 分析、远程配置结合使用
* 预测可能会流失的用户

### 例子代码
* [https://github.com/firebase/quickstart-ios](https://github.com/firebase/quickstart-ios)
* [https://github.com/firebase/quickstart-android](https://github.com/firebase/quickstart-android)
* [https://github.com/firebase/quickstart-js](https://github.com/firebase/quickstart-js)

***

## 04:30 ~ 05:00 使用 Actions on Google 开发对话式智能助理应用(302)
* 智能音响设备和移动应用: 与智能助理交互的界面(Google Home、 Mini、 Max和其他等等)
* Google 智能助理: 您可以与Google进行对话，帮助您完成一些任务。
* Actions on Google: 开发者可以对智能助理进行扩展(通过智能助理应用)

### DialogFlow
* Intent 匹配: 将用户的话语与 intent匹配并归类
* 实体抽取: 识别用户口头表达的关键字词和短语

```text
用户说 ————————→ “给我找一个自己动手 ——————————→ 智能应用助理
 ↑              做奶油煎饼卷的菜谱”                 ↓
用户                                      “给我找一个自己动手
 ↑                                        做奶油煎饼卷的菜谱”
 |     “这是我能找到               实体：           ↓
响应 ←— 的最好答案”  ←— Webhook ←— 自己动手   ←— DialogFlow
                                奶油煎饼卷
```

* [actionsDesign](https://developers.google.com/actions/design/)
* [支持不同的表面功能](https://developers.google.com/actions/assistant/surface-capabilities)
  * Audio_Output
  * Screen_Output
* [丰富的响应](https://developers.google.com/actions/assistant/responses)
  * 显示文字
  * 建议提示框
  * 基础卡片
* [列表和轮播用作选择](https://developers.google.com/actions/assistant/responses)
  * 用于轻松选择(<10个项目)
  * 用于比较(<30个项目)
* [语音合成标记语言](https://developers.google.com/actions/reference/ssml)
  ```markup
  <speak>
    Hello
    <audio src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg" />
    With SSML,
    <prosody rate="fast">you can change the speed of speech.</prosody>
    <prosody pitch="high">You can alter the pitch.</prosody>
    <prosody volume="loud">You can make it loud or soft.</prosody>
    <prosody rate="fast" pitch="low" volume="x-loud">Or all three things at once!</prosody>
    <break/>
    But<say-as interpret-as="ordinal"></say-as>,
    you can make me spell colors like blue<break time="0.5s"/>
    <say-as interpret-as="characters">blue</say-as>.
  </speak>
  ```
* [询问更多信息](https://developers.google.com/actions/assistant/helpers#user_information)
  * e.g:
    * 问：“为我推荐一家本地书店”
    * 答：“为了找到附近的书店，我要从Google上获得您的邮政编码。这样可以吗？”

    ```javascript
    let permission = app.SupportedPermissions.DEVICE_PRECISE_LOCATION;
    app.askForPermissions('To find bookstores near you', permission);
    ```

  |                         | Google Home                        | Mobile Device                      |
  |:------------------------|:-----------------------------------|:-----------------------------------|
  | NAME                    | Registered device user's full name | Registered device user's full name |
  | DEVICE_COARSE_LOCATION  | Zip code and city                  | N/A                                |
  | DEVICE_PRECISE_LOCATION | Coordinates and street address     | Coordinates                        |

* [将账号与您的OAuth2服务器链接](https://developers.google.com/actions/identity/)
  * Grant type
  * Client information
  * Configure your client (optional)
  * Testing instructions
* [与用户交易](https://developers.google.com/actions/identity/)
  * 构建订单
  * 使用Google提供的支付方式
  * 使用您的支付处理商(Stripe、Braintree或Vantiv, 将来会有更多)
  * 更新订单状态
* [智能家居](https://developers.google.com/actions/smarthome/)
* [Google Assistant SDK](https://developers.google.com/assistant/sdk/)
  * 通过对话查找:
    * 显式触发
    * 隐式触发
  * 在Google智能助理目录中查找

### something useful
* [一些模板](https://developers.google.com/actions/templates/)
  * [Trivia](https://developers.google.com/actions/templates/trivia)
  * [Personality Quiz](https://developers.google.com/actions/templates/personality-quiz)
  * [Flash Cards](https://developers.google.com/actions/templates/flash-cards)
* [Codelabs](https://codelabs.developers.google.com/)

***

## 05:15 ~ 05:45 使用 AMP 构建电子商务网站(302)
### AMP是什么
* 如今的用户非常注重性能并且会根据自己的体验采取行动...
  * 53%的移动网站访问者会在加载时间超过3秒时离开
  * 79%的买家体验过网站性能不佳后不会再来
  * 7%的转化率下降，只因加载时间延迟1秒
* 但移动网站经常无法满足这些需求
  * 加载速度慢
  * 页面无响应
  * 内容被广告取代
* AMP: 一个旨在实现更好的网络的开放源代码举措，提高网站的加载速度、美观性和盈利能力
  * AMP HTML
  * AMP JS
  * AMP Cache
* AMP 不允许自定义JS(iframe和一些表达式除外)
* AMP的一些常用标记示例
  * 轮播 <amp-carousel>
    ```html
    <amp-carousel
      width="1024"
      height="480"
      layout="responsive"
      type="slides"
      autoplay>
      <amp-img
        src="destiny.jpg"
        layout="fill">
      </amp-img>
      <amp-img
        src="wowzers.jpg"
        layout="fill">
      </amp-img>
    </amp-carousel>
    ```
  * 边栏 <amp-sidebar>
    ```html
    <amp-sidebar
      id="sidebar"
      layout="nodisplay"
      side="right">
      <amp-img class="amp-close-image">
      </amp-img>
      <ul>
        <li><a href="/">Home</a></li>
        <li>Socks</li>
        <li>Shoes</li>
        <li>Toes</li>
      </ul>
    </amp-sidebar>
    ```
* 通过CSS实现设计自定义和灵活性

### 创建电子商务网站
* 先将那些页面转换成AMP页面？只有您了解自己业务的所有权衡和限制
  * 因素1: 用户历程
    * 用户到达您的着陆页的速度越快，您可以利用消息接触的用户就会越多。
  * 因素2: 功能支持
    * 首页：
      * 图像和视频
      * 导航
      * 优惠和精选
    * 商品浏览页
      * 动态数据
      * 服务器端排序和筛选
    * 商品详情页
      * 动态数据
      * 带缩略图的轮播
      * "add to cart"按钮
      * 评论
      * 推荐商品
      * 通过表单协调轮播
    * 购物车与结账
      * 表单验证
      * 付款

### 创建动态AMP
* 可以通过两种方式将页面设为动态
  1. 页面变化以响应用户操作
  2. 从服务器检索的内容显示在页面上

#### <amp-bind>
* 更改页面内容
* 响应用户操作
* 使用数据绑定和表达式

* E.g.
  1. 状态
    ```html
    <!--
    Define a state called "foo" with property "bar"
    -->

    <amp-state id="foo">
      <script type="application/json">
        {"bar": "Hello"}
      </script>
    </amp-state>
    ```

  2. 绑定
    ```html
    <!--
    Bind text to the expression "foo.bar + baz"
    -->

    <p [text]="foo.bar + baz">
      Hello World.
    </p>
    ```

  3. 突变
    ```html
    <!--
    Tap to change the value of baz.
    -->

    <button on="tap:AMP.setState({baz:'Shanghai!'})">
      Say 'Hello Shanghai!'
    </button>
    ```

#### <amp-list> 使用
* 数据json
  ```javascript
  {
    "items": [
      {
        "id": 8,
        "name": "Caliper Brakes",
        "description": "Makes your bike stop",
        "price": 2750,
        "image": "product-8.jpg"
      },
      {
        "id": 10,
        "name": "Wheel Set",
        "description": "New model: they're round!",
        "price": 3100,
        "image": "product-10.jpg"
      }
    ]
  }
  ```
* 绑定和状态变更
  ```html
  <amp-state id="products">
    <script type="application/json">
      {
        "category": "all"
      }
    </script>
  </amp-state>

  <select
    name="categories"
    on="change:AMP.setState({category: event.value})">
    <option value="all">all</option>
    <option value="bikes">bikes</option>
    <option value="accessories">accessories</option>
    <option value="components">components</option>
  </select>
  ```
* 显示list
  ```html
  <amp-list
    src="api/products-components.json"
    [src]="'api/products-'+ products.category + '.json'"
    height="1000"
    width="300"
    layout="responsive">

    <template type="amp-mustache">
      <a href="product-details.amp.html">
        <amp-img
          src="../img/product/{{image}}"
          height="300"
          width="300"
          layout="responsive">
        </amp-img>
        <h2>{{name}}</h2>
        <p>{{description}}</p>
        <p>{{price}}</p>
      </a>
    </template>
  </amp-list>
  ```

### Something useful
* [AMP start 模板](https://ampstart.com/): 快速开始构建电子商务网站
* [通过示例学习AMP](https://ampbyexample.com/): 了解并尝试AMP组件

***

## 06:00 ~ 06:30 用户体验提升：Material Design 的基础对用户体验有何影响(302)
* 人因: 人与计算机互动的方式
  * 触摸、滑动、语音、开关、按钮、键盘、视觉、声音
* 设计模式: 需要注意人因的设计方式
  * 菜单、按钮、工具栏、图像
* 惯例: 有助于实现一致体验的规范、测量值、用途和行为定义
  * 56dp工具栏、 类型缩放、 “向上”按钮
* 组件: 设计模式、惯例和设计系统构建块的可以立即使用的表现形式

### Material 精髓
1. 高度
  * 心智模式: 用户如何看待您的界面
    * 实现一种尽可能接近心智模式有助于理解用户已经了解的东西
    * 带给数字界面的显而易见性
  * 视觉层次结构
  * 紧迫性与即时性
2. 墨水
  * 颜色系统

3. 网格
  * 补充内容
  * 传递与效率
  * 导航性与遍历
4. 排版系统
  * 交互性
  * 视觉层次结构
  * 信息分类
5. 移动
  * 心智模式

Tips:
1. 墨水不会在现实世界中的物体上产生涟漪，但指示您在触摸东西的指示器对模拟现实世界互动至关重要。
2. 用户一般不会测量他们在现实世界中移动物体的速度，但他们会注意到您的应用中的移动与现实不相符的情况。

* Other: 为什么花这么多时间介绍 Material Design?
  * 在核心层面，系统基于我们对世界已有的了解
  * 我们可以利用这些来打造富有表现力、以人为本的独特体验。

***
(20171214)

***

## 10:00 ~ 10:30 亲身体验 Android Things 并打造您自己的 IoT 设备(302)
### [开始](https://g.co/dev/androidthings-start)
* 组装: 摄像头
* 组装: 触摸显示屏
* 组装: 彩虹帽配件 (对齐然后压下去)
* 复查你的工作
  * 验证你的开发板电源有电
    * You may need a USB hub
  * 检查验证显示屏有boot logo
    * If not, it's not connected properly.
* 设置你的开发板
  1. Go to [https://partner.android.com/things/console](https://partner.android.com/things/console)
  2. Click **Menu** in the upper left, then click **Tools**.
  3. Download the **Onboarding Tool** and unzip it.
  4. In a terminal or shell window, run the executable for your platform.(linux, mac, or windows)
  5. Follow the instructions on screen and make these choices:
    * Install Android Things on a board
    * NXP Pico i.MX7D
    * Use a custom image(the one you downloaded)

* 设置你的开发板细节步骤(windows)([官方设置说明](https://developer.android.com/things/hardware/imx7d.html))
  * Find your Android SDK location in Android Studio:
    * **Configure > SDK Manager > Android SDK Location**
  * Add it to your **PATH** environment variable
  * Verify you can see the board in a command prompt:
    * **fastboot devices -l**
  * Unzip the image you downloaded from the Android Things console
  * Run the Extracted **flash-all.bat** file:
    * **./flash-all.bat**

* Set up Wi-Fi:
```shell
$ adb shell am startservice \
    -n com,google.wifisetup/.WifiSetupService \
    -a WifiSetupService.Connect \
    -e ssid <SSID> \
    -e passphrase <PASSPHRASE>
```

### 在写开发代码之前先...
* Disable Instant Run in Android Studio:
  * Android Studio > Preferences > Build, Execution, Deployment > Instant Run
* Make sure your board booted properly.
* 检查显示屏有Android Things Launcher.

### Coding
```java
dependencies {
  compileOnly 'com.google.android.things:androidthings:...'
}
```

```xml
<application ...>
  <uses-library android:name="com.google.android.things" />

  <activity ...>
    ...
    <!-- Launch activity automatically on boot -->
    <intent-filter>
      <action android:name="android.intent.action.MAIN" />
      <category android:name="android.intent.category.IOT_LAUNCHER" />
      <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
  </activity>
</application>
```

```java
// Open a peripheral connection
PeripheralManagerService service = new PeripheralManagerService();
Gpio button = service.openGpio(GPIO_PIN_NAME);

// Configure the peripheral
button.setDirection(Gpio.DIRECTION_IN);
button.setEdgeTriggerType(Gpio.EDGE_FALLING);

// Attach callback for input events
button.registerGpioCallback(new GpioCallback() {
  @Override
  public boolean onGpioEdge(Gpio gpio) {
    Log.i(TAG, "GPIO changed");

    // Return true to continue listening to events
    return true;
  }
});
```

### 一些学习案例
* [外围设备输入输出示例 Peripheral I/O](https://bit.ly/codelab-peripherals)
  * 学习内容：
    * 新建Android Things应用 Create a new Android Things app projects
    * 外围设备输入输出通信 Communicate with hardware using Peripheral I/O
    * 整合应用外围设备输入输出库的驱动器 Integrate drivers from the Peripheral Driver Library
* [气象台示例 Weather Station](https://bit.ly/codelab-weatherstation)
  * 学习内容：
    * 整合应用外围设备输入输出库的驱动器 using Peripheral I/O and driver libraries
    * 注加传感器 Registering sensors
* TensorFlow 图像分类示例 Image Classifier
  * Download the sample in Android Studio
    * New > Import Sample... > "Things Tensor Flow image classifier sample"
  * try to run the sample and see that it works.
  * 了解更多 Explore the codelab later on your own:
    * [https://bit.ly/codelab-classifier](https://bit.ly/codelab-classifier)

### 相关社区
* [Android Things SDK](https://developer.android.com/things)
* [Android Things Samples](https://github.com/androidthings)
* [Hackster.io Community](https://hackster.io/google)
* [Google's IoT Developers Community](https://g.co/iotdev)

***

## 10:45 ~ 11:15 PWA 框架和工具(302)
### PWA 工具的状态
### PWA 工具的目标和理念
* 完美的PWA
  * 快速
  * 可靠
  * 有吸引力
* 工具有何作用:
  * 节省用户时间
  * 节省用户带宽
  * 浏览器定制
### 单一页面应用
* PWA背后的技术
  * 清单
  * Service Worker
  * 优质应用

### 最佳做法
* Manifest
  * 让浏览器和网页了解你的应用
  * 默认生成
  * 帮助您制定决策的工具
* Service Worker
```text
                            ┌→ 已终止
           ┌→ 激活 ←→ 空闲 ←—┤
  —→ 安装 ←┤                 └→ 获取/销毁
           └→ 错误
```
* 文件缓存
  * 安装时/安装后
  * 运行时
  * 高级缓存策略
* 推送通知
  * 包装器函数和帮助程序
* 代码生成
  * 提供更快的完成工作所需的代码
    * 天然快速
    * 天然优质
    * 利用原生指标构建管理

### PWA 工具
* 通用工具
  * Chrome Dev Tool
  * Workbox: 渐进式网页应用的JavaScript库
    * 离线缓存
    * 离线分析
    * 后台同步
  * webpack 离线插件
    * 文件缓存
      * 提前
      * 延后
      * 可选
* 框架特定工具
  * pinterset/service-workers: 用于创建/测试/体验 Service Worker 的工具集合
    * 代码生成
    * service worker 模拟环境生成器
  * sw-precache 和 sw-toolbox: 用于构建Service Worker 的实用程序和工具
    * 其目标和价值与Workbox相同
    * 模块化、灵活性和可扩展性较低
    * 被当今许多CLI和工具采用
* 完全自定义

* [HNPWA](https://hnpwa.com/): 20多家黑客新闻客户端实现PWA

### PWA目标
* 简化精神模型
  * 缓存很难，不妨专注于用例
  * Service Worker 的生命周期管理很困难，不妨让工具来处理
  * 这像不像我所习惯的网页开发？
* 处理边缘情况
  * 如果您的应用在 Service Worker 安装期间断开连接，该怎么办？
  * 如果您的用户拥有理想的连接，又会如何？
  * 如果你不控制Api的缓存标题，将会如何？
* 节省时间
  * 大量代码
  * 大量 DevOps
  * 大量投入

### 专用工具
* React
  * [create-react-app](https://github.com/facebookincubator/create-react-app)
    * Service Worker 和网络应用清单生成
    * 缓存优先策略

  ```shell
  $ yarn global add create-react-app
  $ create-react-app my-react-app
  $ cd my-react-app
  $ yarn build
  ```

* Preact
  * [preact-cli](https://github.com/developit/preact-cli)
    * 应用创建
    * index.html App Shell 生成
    * 自动为浏览器列表添加前缀
    * 针对服务器推送的firebase配置
    * 由sw-precache驱动

  ```shell
  $ yarn global add preact-cli
  $ preact create my-preact-app
  $ cd my-preact-app
  $ yarn build
  ```

* Polymer
  * [polymer-cli](https://github.com/Polymer/polymer-cli)
    * 清单生成和可选的Service Worker
    * 三种发行版
      * es5-bundled
      * es6-bundled
      * es6-unbundled
    * PRPL模式

  ```shell
  $ yarn global add bower polymer-cli
  $ mkdir my-polymer-app
  $ cd my-polymer-app
  $ polymer init
    > polymer-2-starter-kit
  $ polymer build
  ```

* Vue
  * [vue-cli](https://github.com/vuejs/vue-cli) 和 [vuejs-templates/pwa](https://github.com/vuejs-templates/pwa)
    * 应用创建
    * 清单、ServiceWorker 和 App Shell 生成
    * 智能加载所需的Javascript、CSS和网页字体

  ```shell
  $ yarn global add vue-cli
  $ vue init pwa my-vue-project

  # Guided setup
  $ cd my-vue-project
  $ yarn
  $ yarn build
  ```

* Angular
  * [@angular-cli](https://github.com/angular/angular-cli)
    * 应用创建
    * Service Worker 生成
    * 声明的基于json的配置
    * 推送通知和声明周期事件

  ```shell
  $ yarn global add @angular-cli
  $ ng new my-angular-app --service-worker
  $ cd my-angular-app
  $ ng build -prod
  ```

* 其他重要项目
  * PWA.rocks
  * PWA Builder
  * Angular - ng-pwa-tools

### 一些建议
* 务必勾选Application标签
  * Service Worker是一款功能强大的API，不仅可以及时刷新页面，更能提升页面性能，它可以超越您对省时省事 + 刷新的期望
  * 查阅 Rob Dodson 的指南: [https://bit.ly/debugging-sw](https://bit.ly/debugging-sw)
* 使用工具处理
  * 这些工具可以为您漂亮地完成工作，请尽可能使用他们的设计功能
* 不要单纯依靠开发工具
  * 限制并不够
  * 离线复选框不会影响WebSockets
* 端对端的 Service Worker 测试
  * 考虑测试 Service Worker 的状态有可能很重要
  * 请查阅
    * [https://bit.ly/pinterest-sw-mock](https://bit.ly/pinterest-sw-mock)
    * [https://bit.ly/angular-pwa-harness](https://bit.ly/angular-pwa-harness)
* 保持最新

***

## 12:30 ~ 01:00 开放源代码框架 TensorFlow(301)
> 共同目标: 机器学让未来变得更美好

> TensorFlow的目标: 使机器学习收益与所有人

### 目前的TensorFlow
* TensorFlow 的命名
  * Tensor 多维数组
  * Flow 流动
* TensorFlow: 开放的机器学习平台
  * 快速，灵活，支持生产环境的开源机器学习软件包
  * 可用在科研以及生产系统内
  * 可以在CPU、GPU、Cloud TPU、Android、iOS、Raspberry Pi上运作，并不断支持更多硬件平台
  * Apache 2.0 License

### TensorFlow 性能
* 性能数字
  * 运用 Intel MKL-DNN 训练卷积神经网络(CNN)**速度提高 3.6x, 推断速度提高2x**
  * 递归神经指导网络(RNN tutorial model) + CuDNN **速度提高 2.8x**
  * 谷歌翻译(Google Translate)**推断速度提高 2.6x**
* 第二代TPU: 适用于神经网络训练与推断
  * 每秒180万亿次浮点运算, 64千兆的内存
  * 多个TPU设计连接在一起

### TensorFlow 适用性
```text
 ┌———————————————————————┐
 |   Canned Estimators   | ←— Models in a box
 └———————————————————————┘
 ┌———————————┐┌——————————┐
 | Estimator || tf.keras | ←—┐
 └———————————┘└——————————┘   ├— Build models
 ┌———————————————————————┐   |
 |       tf.layers       | ←—┘
 └———————————————————————┘
 ┌———————————————————————┐┌——————————————┐┌—————┐
 |    Python Frontend    || C++ Frontend || ... |
 └———————————————————————┘└——————————————┘└—————┘
 ┌——————————————————————————————————————————————┐
 |   TensorFlow Distributed Execution Engine    |
 └——————————————————————————————————————————————┘
——————————————————————————————————————————————————
 ┌———————┐┌———————┐┌———————————┐┌———————┐┌——————┐
 |  CPU  ||  GPU  ||  Android  ||  iOS  || ...  |
 └———————┘└———————┘└———————————┘└———————┘└——————┘
```

### [TensorFlow Serving](https://github.com/tensorflow/serving)
> TensorFlow Serving is a flexible, high-performance serving system for machine learning models, designed for production environments.

* Datasets 接口
  * Data sources and functional transformations

### TensorFlow Lite:
> A lightweight machine learning library for mobile and embedded devices.

* Easier
* Faster
* Smaller

### TensorFlow Eager Execution: TensorFlow 模型运行的方式

### Future directions of ML: learn2learn
有了百倍的机器能量，我们没有理由固守我们的成见

### 一些资源
* [Tutorials and code](https://www.tensorflow.org/)
* Intro to Deep Learning with TensorFlow
  * [Udacity class](https://goo.gl/iHssII)
* [Stanford's CS231n](https://cs231n.github.io)
* [Udacity's Machine Learning Nanodegree](https://goo.gl/ODpXj4)
* Totally new to ML?
  * [Recipes](https://goo.gl/KewA03)

***

## 01:15 ~ 01:45 Google Cloud Platform 基础知识：导览(302)
Google Cloud: 利用Google的创新应对您的挑战

* 网络、基础设施
  * 分层深度防御安全性
  * 硬件基础设施: 从堆叠底部一直到顶部
    * 用途特定的芯片
    * 用途特定的服务器
    * 用途特定的储存设施
    * 用途特定的网络
    * 用途特定的数据中心
  * 我们从头构建网络
    * 利用全球网络，但是只需要为您需要的内容付费
    * 分层深度防御
    * 借助行业领先的基础设施加快创新速度
* 利用 Google Cloud 进行机器学习
  * 使用我们的模型
    * 利用 Google 的领域专业知识
    * 不需要工具或者专业知识
    * 利用 Google 的投资
      * Cloud Translate API
      * Cloud Speech API
      * Cloud Natural Language API
      * Cloud Video Intelligence
      * Cloud Vision API
        * 面部检测
        * 徽标识别
        * 标签识别
        * 露骨内容检测
        * OCR
        * 地标识别
      * Cloud Jobs API
      * Cloud Machine Learning Engine: 完全托管式机器学习基础设施
    * 开放源代码提供技术支持: TensorFlow
      * 由 Google Brain 团队创建
      * 多种部署选项
        * 移动设备, 桌面设备, 服务器, 云
        * CPU, GPU, Raspberry Pi
      * 张量处理单元(TPU)
  * 训练您的模型
    * 自行构建专门的领域专业知识
    * 使用 Google 工具构建和训练模型
* 应用开发
  * 应用开发为什么这么困难？
  * 让开发者专注于编写代码
    * 原型
    * 生产
    * 全球规模
      * 大规模提供容器和无服务器解决方案
        * 全球规模的平台即服务: AppEngine
        * 容器化应用管理: Kubernetes Engine
        * 无服务器应用、Google 基础设施: Cloud Functions
  * 我们编写操作书籍, 并且..**不加修饰**

***

## 02:00 ~ 02:30 TensorFlow Lite: TensorFlow for Mobile(302)
### Why small devices?
* Challenges
  * Resources
    * Bandwidth
    * Memory
    * Computation
  * Heterogeneity
    * GPUs
    * CPUs
    * DSPs
    * ...

### What is TensorFlow Lite?
> TensorFlow works well on **large** devices.
> TensorFlow Lite is focused on **small** devices.


* 其他序列化的数据库
  * [FlatBuffers](https://github.com/google/flatbuffers)
    * Open source Google project
    * Originally designed for video games
    * Similar to protobufs except:
      * More memory efficient
      * No-unmarshalling step(mmap)
      * Less code

* What is TensorFlow Lite?
  * Core builtin ops
    * NEON on ARM
    * Float & quantized
    * Many kernels optimized for our mobile apps
  * Pre-fused activations and biases
  * C API for custom ops
* NeuralNetwork API
  * Part of Android Framework

### How do I use it?
#### Coding
* TensorFlow Lite @ Training
  ```c
  # Standard TensorFlow graph build
  input = tf.placeholder(name="image", ...)
  # ...
  output = tf.identity(curr, name="class")

  # Test that model is mobile compatible
  _ = tflite.Convert(sess.graph_def, [input1], [output])

  # Training Loop
  # ...

  # Save model
  # ...

  # Output the model
  tflite_model = tflite.Convert(sess.graph_def, [input1], [output])
  open("awesome_model.tflite", "w").write(tflite_model)
  ```

* Android - App Gradle File
  ```java
  application {
    ...
    aaptoptions {
      noCompress 'tflite'
    }
  }

  repositories {
    maven {
      url 'https://google.bintray.com/tensorflow'
    }
  }

  dependencies {
    ...
    compile 'org.tensorflow-lite:+'
  }
  ```

* C++ API
  ```c++
  // Mmap the model.
  auto model = FlatBufferModel::BuildFromFile("awesome_model.tflite");
  // Builtin operator op -> kernel resolver
  tflite::ops::builtin::BuiltinOpResolver builtins;
  // build an interpreter for the model.
  auto std::unique_ptr<tflite::Interpreter> interpreter;
  tflite::InterpreterBuilder(*model, builtins)(&interpreter);

  interpreter->ResizeInputTensor(0, {1, 240, 240, 3});
  interpreter->AllocateTensors();
  // Fill buffer
  if(float* input_buffer =
      interpreter->type_tensor<float>(interpreter->inputs()[0])) {
  }

  // Run the inference
  interpreter->Invoke();
  // Read the output
  if(float* one_hot_output =
      interpreter->type_tensor<float>(interpreter->outputs()[0])) {
    // map to label, etc.
  }
  ```

* Java API
  ```java
  import org.tensorflow.lite.Interpreter;

  try (Interpreter tflite = new Interpreter("/tmp/awesome_model.tflite")) {
    Object[] inputs = {imageByteArray};
    Map<Integer, Object> outputs = new HashMap<Integer, Object>();
    outputs.put(0, outputClassByteArray);
    tflite.run(inputs, outputs);
  }
  ```

* TensorFlow Lite C Extension API
  ```c
  void* (*init)(TfLiteContext* context, const char* buffer, size_t length);
  void (*free)(TfLiteContext* context, void* buffer);
  TfLiteStatus (*prepare)(TfLiteContext* centext, TfLiteNode* node);
  TfLiteStatus (*invoke)(TfLiteContext* context, TfLiteNode* node);
  ```

### 相关链接
* [Code @](https://github.com/tensorflow/tensorflow)
* [Documentation @](https://www.tensorflow.org)

***

## 03:00 ~ 03:30 机器学习 API 介绍及实况演示(301)
> 机器学习是从**范例**和**经验**中学习

### 我们可以通过两种方法来帮助您从机器学习中获益
* 使用您自己的数据训练模型
  * TensorFlow
  * Cloud 机器学习引擎
* 以API形式使用机器学习
  * Cloud Vision API
  * Cloud Speech API
  * Cloud Natural Language API
  * Cloud Translation API
  * 云视频智能

### Cloud Vision API
* 功能
  * 标签检测
  * 面部检测
    ```javascript
    "faceAnnotations": [{
      "detectionConfidence": 0.93,
      "boundingPoly": {
        "vertices": [{
          "x": 743,
          "y": 449
        }, ...]
      },
      "panAngle": 4.1,
      "tiltAngle": -19.4,
      "landmark": [{
        "type": "LEFT_EYE",
        "position": {...}
      }, ...],
      "joyLikelihood": "VERY_LIKELY"
      //  ↑
      // Also detects: surprise, anger, sorrow, headwear, blur, exposure

    }, ...]
    ```
  * OCR
  * 露骨内容检测
  * 地标检测
    ```javascript
    "landmarkAnnotations": [{
      "mid": "/m/0348s6",
      "description": "Paris Hotel and Casino",
      "score": 80,
      "boundingPoly": {
        "vertices": [{
          "x": 117,
          "y": 479
        }, ...]
      },
      "locations": [{
        "latLng": {
          "latitude": 36.11221,
          "longitude": -115.172596
        }
        //  ↑
        // This is the location of Las Vegas
      }]


    }]
    ```
  * 徽标检测

* Vision Api 更多特征
  * 裁剪提示: 建议的照片裁剪尺寸
  * 网页注释: 从互联网上搜索图像的更多详情
  * 文档文本注释: 改善对大文本块的OCR

* 使用您自己的图像在浏览器中试一试:
  * [Cloud ML Vision API](https://cloud.google.com/vision/)

### Cloud Speech API
* 使用Cloud Speech API的案例
  * Azar: 200亿次人际配对
  * google 翻译
  * airbnb

* 在浏览器中试一试:
  * [Cloud Speech API](https://cloud.google.com/speech/)

* 语音时间戳 在音频中搜索文本
  ```javascript
  {
    "transcript": "Hello GDD China!",
    "confidence": 0.96596134,
    "words": [{
      "word": "Hello",
      "startTime": "1.400s",
      "endTime": "1.800s"
    },{
      "word": "GDD",
      "startTime": "1.800s",
      "endTime": "2.300s"
    }, ...]
  }
  ```

* 调用API
  ```java
  from google.cloud import translate

  translate_client = translate.Client()

  result = translate_client.translate(
    "I'd like the fried octopus please",
    target_language="ja")

  print("Translation: " + result['translatedText'])
  # Translation: 私は揚げたタコをお願いします
  ```

* **神经网络机器**翻译(循环神经网络)
  * 了解详情: [bit.ly/nyt-ai-awakening](https://bit.ly/nyt-ai-awakening)

### Natural Language API
> 从文本中提取实体、态度和语法
#### 实现
1. 提取实体
> **Joanne "Jo" Rowling**, 笔名 **J.K. Rowling** 和 **Robert Galbraith**, 是一位**英国**小说家、编剧家和电影制片人，其著作以《哈利·波特》魔幻系列作品最为著名

```javascript
{
  "name": "Joanne 'Jo' Rowling",
  "type": "PERSON",
  "metadata": {
    "mid": "/m/042xh",
    "wikipedia_url": "http://en.wikipedia.org/wiki/J._K._Rowling"
  }
}
```
```javascript
{
  "name": "British",
  "type": "LOCATION",
  "metadata": {
    "mid": "/m/07ssc",
    "wikipedia_url": "http://en.wikipedia.org/wiki/United_Kingdom"
  }
}
```
2. 分析态度
> 菜很好吃，我肯定还会再来！

```javascript
{
  "documentSentiment": {
    "score": 0.8,
    "magnitude": 0.8
  }
}
```

3. 分析语法(目前支持英语、西班牙语、日语)

#### 使用Cloud Natural Language API 和 Apps Script 分析 Google Sheet 中的文本
```text
app ——→ Google Sheets ←—→ Natural Language API
```
* [相关资料](https://cloud.google.com/blog/big-data/2017/12/analyzing-text-in-a-google-sheet-using-cloud-natural-language-api-and-apps-script)

#### 使用您自己的文本在浏览器中试一试:
* [Cloud Natural Language API](https://cloud.google.com/natural-language/)

### Video Intelligence API
> 以镜头、帧或者视频层级理解视频的实体

* 工作原理
  ```text
                 ┌—————————————→  基于构建的前端  ←—————————————┐
                 |                 App Engine                 |
                 |                              视频元数据      |
  视频内容 ——→ 云端储存 ——→  Cloud    ——→ 智能视频 ———————————→ 云端存储
             (全长视频)    Functions                        (视频注释JSON)
  ```

* Video API 响应: 标签检测
  ```javascript
  {
    "description": "Bird's-eye view",
    "language_code": "en-us",
    "locations": {
      "segment": {
        "start_time_offset": 74905212,
        "end_time_offset": 73740392,
      },
      "confidence": 0.96653205
    }
  }
  ```

* 使用您自己的图像在浏览器中试一试:
  * [Cloud Video Intelligence API](https://cloud.google.com/video-intelligence/)

### 相关链接
* 在浏览器中试用API
  * [Vision](https://cloud.google.com/vision/)
  * [Speech](https://cloud.google.com/speech/)
  * [Natural Language](https://cloud.google.com/natural-language/)
  * [Translation](https://cloud.google.com/translation/)
  * [Video](https://cloud.google.com/video-intelligence/)
* [演示代码](https://github.com/sararob/ml-talk-demos)
* [Video API 演示应用](https://github.com/sararob/video-intelligence-demo)

***

## 03:45 ~ 04:15 什么是网络的未来潮流？(301)
或者说探索 [about://flags](about://flags)

### 渐进式网页应用
* 沉浸式全屏PWA
  * 在屏幕上向PWA提供应有的显示空间
  * 案例: 手机访问 [Paper Planes](https://paperplanes.world/)
  * 现在您可以在PWA的网络应用清单中将`display`属性设为`"fullscreen"`
  * [bit.ly/display-fullscreen](https://bit.ly/display-fullscreen)
* 改进了“添加到主屏幕”
  * 手机上的“真正”应用
  * 现在用户可以在应用抽屉式导航栏中或通过搜索应用来找到PWA，应用图标和应用名称均可以更新
  * 根据网络应用清单的范围，我们为PWA创建了一个Android Intent过滤器来定义应当在上面时机打开网络应用

### Web Share API
> 分享即关爱

* 原生的分享对话框
  ```javascript
  navigator.share({
    title: document.title,
    text: 'Hello World',
    url: window.location
  })
  .then(() => console.log('Successful share'))
  .catch(error => console.log('Error sharing: ', error));
  ```

* [相关资料](https://bit.ly/web-share)

### 网络推送通知
在 macOS 上不再是“异族”，现已融入 macOS 通知中心

* 通过 Notifications API 发送的网络推送通知直接在 macOS 原生通知中心内显示
* 更好的实现与平台的集成，遵循 macOS 系统勿扰模式设置的规则
* [相关资料](https://bit.ly/macos-notifications)

### 导航预加载
无需等待 Service Worker 启动

* Service Worker 导航预加载: 初始试用更快速的PWA
  * 导航预加载是一项全新的实验性功能，利用这项功能，您可以实现：用户发出GET导航请求时，系统在Service Worker启动的同时启动网络请求
  * 虽然这不能避免启动延迟，但却可以消除网络请求受阻的现象，从而让用户能够更快获取内容

* coding
  ```javascript
  addEventListener('activate', event => {
    event.waitUntil(async function() {
      // Feature-detect
      if (self.registration.navigationPreload) {
        // Enable navigation preloads!
        await self.registration.navigationPreload.enable();
      }
    }());
  });

  addEventListener('fetch', event => {
    event.respondWith(async function() {
      // Respond from the cache if we can
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;

      // Else, use the preloaded response, if it's there
      const response = await event.preloadResponse;
      if (response) return response;

      // Else try the network.
      return fetch(event.request);
    }());
  });
  ```

* [相关资料](https://bit.ly/navigation-preload)

### 一键注册 自动登陆
> 只需点按一下就能创建账户
> 之前登陆过的用户可以自动登陆

* 注册意味着“麻烦事”
  * 登陆步骤繁琐 注册更加繁琐
  * 如果您忘记了所选的服务商，联盟也爱莫能助
  * 用户选择安全系数低的密码，要不然可能会忘记密码
* 一键注册 API
  * 在所有浏览器上都有效
  * 在移动网络上创建账号有新方法了，只需点按一下即可基于 OpenYOLO，使用Google 电子邮箱地址创建账户
  * 支持使用之前选择的信息实现回访用户自动登陆，从而立竿见影的进行个性化
* coding
  ```javascript
  const options = {
    supportedAuthMethods: [
      'https://accounts.google.com',
      'smartlock://id-and-password'
    ],
    supportedIdTokenProviders: [{
      url: 'https://accounts.google.com',
      clientId: ID
    }]
  };

  const handleResult = (credentials) => {
    authenticateWithToken(credentials.idToken);
    // Send to server, sign in/up, issue session, else auto-fill data in form
    // Use cancel() to dismiss
  };

  // Auto sign-in, use disableAutoSignIn() when user signs out
  googleyolo.retrieve(options).then(handleResult);

  // Auto sign-up
  googleyolo,hint(options).then(handleResult);
  ```
* [相关资料](https://developers.google.com/identity/one-tap/)

### 存储空间评估(了解存储空间使用情况)
开发者经常遇到这个问题: 存储空间是否足够支持我执行目前的操作？现在这个问题已经得到解决
```javascript
navigator.storage.estimate()
  .then((estimate) => {
    console.log(`You are currently using an estimated ${estimate.usage} of your total ${estimate.quota}.`);
  });
```
* [相关资料](https://bit.ly/storage-estimation)

### 与媒体相关的API
#### Image Capture API
更改相机设置 放大重要内容

* Image Capture API 可以捕捉静止图像，以及配置缩放级别等相机硬件设置。
* coding
  ```javascript
  const track = mediaStream.getVideoTracks()[0];
  const capabilities = track.getCapabilities();
  const settings = track.getSettings();
  const input = document.querySelector('input[type="range"]');

  input.min = capabilities.zoom.min;
  input.max = capabilities.zoom.max;
  input.step = capabilities.zoom.step;
  input.value = settings.zoom;
  input.oninput = (event) => {
    track.applyConstraints({
      advanced: [
        {zoom: event.target.value}
      ]
    });
  };
  ```
* 相关资料
  * [bit.ly/image-capture](https://bit.ly/image-capture)
  * [bit.ly/image-capture-api](https://bit.ly/image-capture-api)

#### Shape Detection API 让手机摄像头的智能程度登峰造极
利用 Shape Detection API， 您可以检测面孔、读取条形码，以及运行光学字符识别技术(OCR)

```javascript
// The <video>'s srcObject is a MediaStream
const faceDetector = new FaceDetector({fastMode: true});
const textDetector = new TextDetector();
const barcodeDetector = new BarcodeDetector();

Promise.all([
  faceDetector.detect(video),
  textDetector.detect(video),
  barcodeDetector.detect(video)
])
  .then(([
    detectedFaces = [],
    detectedTexts = [],
    detectedBarcodes = []
  ]) => {
    detectedFaces.forEach((detectedFace) => console.log(detectedFace));
    detectedTexts.forEach((detectedText) => console.log(detectedText));
    detectedBarcodes.forEach((detectedBarcode) => console.log(detectedBarcode));
  });

```

* 相关资料
  * [wicg.github.io/shape-detection-api](https://wicg.github.io/shape-detection-api)
  * [arnellebalane.com/shape-detection-api](https://arnellebalane.com/shape-detection-api)

#### Media Session API 让您的媒体会话变得更有意义
* 向用户显示媒体元数据信息
  * 现在您可以利用 Media Session API 提供应用所播放媒体的元数据，从而对媒体通知进行自定义。
  * 另外，您也可以利用此API处理与媒体相关的事件，例如定位播放位置或更改轨道(这些实践可能来自通知或媒体键)。

* coding
  ```javascript
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Never Gonna Give You Up',
    artist: 'Rick Astley',
    album: 'Whenever You Need Somebody',
    artwork: [
      { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
      { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
      { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
      { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
    ]
  });

  navigator.mediaSession.setActionHandler('play', function() {});
  navigator.mediaSession.setActionHandler('pause', function() {});
  navigator.mediaSession.setActionHandler('seekbackward', function() {});
  navigator.mediaSession.setActionHandler('seekforward', function() {});
  navigator.mediaSession.setActionHandler('previoustrack', function() {});
  navigator.mediaSession.setActionHandler('nexttrack', function() {});
  ```
* [相关资料](https://bit.ly/media-session-api)

#### Media Capabilities API
> 不要为了片面追求4K视频，烧坏用户的电池

* 让媒体在流畅播放的同时实现高能效
  * 利用 Media Capabilities API，网站能够获取与设备解码功能相关的更多信息。
  * 这能够帮助网站开发者在为用户选择媒体流时做出最佳决策。
* coding
  ```javascript
  navigator.mediaCapabilities.query({
    type: 'file',
    video: {
      type: 'video/webm codec=vp9.0',
      height: 1080,
      width: 1920,
      framerate: 24,
      bitrate: 2826848
    },
    audio: {
      type: 'audio/webm codec=opus',
      channels: '2.1',
      samplerate: 44100,
      bitrate: 255236
    }
  })
    .then(res => console.log(res.isSupported, res.isSmoothPlayback, res.isPowerEfficient));
  ```
* [相关资料](https://wicg.github.io/media-capabilities)

#### WebVR
> 需求在真正的现实中得不到满足

* 在浏览器中营造引人入胜的虚拟现实体验
  * WebVR是一种开放标准，让用户能够在您的浏览器中获得虚拟现实体验
  * WebVR的目标是，让所有人，无论用什么设备，都能更轻松地享受虚拟现实体验
* [相关资料](https://w3c.github.io/webvr)

### 与性能相关的API
#### 网络信息 了解速度极限
* 实时获取有意义的网络信息
  * 用例包括: 动态请求慢速网络上的低分辨率资源，这可以与媒体查询相矛盾
    ```javascript
    navigator.connection.addEventListener('change', logNetworkInfo);

    function logNetworkInfo() {
      console.log('type: ' + navigator.connection.type);                         // Network type that browser uses
      console.log('downlink: ' + navigator.connection.downlink + 'Mb/s');        // Effective bandwidth estimate
      console.log('rtt: ' + navigator.connection.rtt + 'ms');                    // Effective round-trip time estimate
      console.log('downlinkMax: ' + navigator.connection.downlinkMax + 'Mb/s');  // Upper bound on the downlink
      console.log('effectiveType: ' + navigator.connection.effectiveType);       // Effective connection type
    };
    ```
  * 媒体查询结果可能显示您的手机支持“Retina”图像，但是在采用2G连接时，获取非“Retina”图像才能提供更好的体验
    ```javascript
    const useRetina = () => {
      const supportsRetina = window.matchMedia(
        '(min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
      ).matches;

      if (supportsRetina && navigator.connection.effectiveType === '4g') {
        // Use Retina graphics
      } else {
        // Use non-Retina graphics
      }
    };

    navigator.connection.onchange = useRetina;
    ```

* [相关资料](https://wicg.github.io/netinfo)

#### Performance API
您一定对页面加载期间究竟发生了什么甚为关心

* Navigation Timing API 获取总体性能数据
  ```javascript
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  const connectTime = perfData.responseEnd - perfData.requestStart;
  const renderTime = perfData.domComplete - perfData.domLoading;

  console.table([
    ['Page load time', pageLoadTime],
    ['Connect time', connectTime],
    ['Render time', renderTime]
  ])
  ```
* Paint Timing API 了解您的网络在向真实用户呈现内容时的渲染速度
  ```javascript
  performance.getEntriesByType('paint').forEach(console.log);

  const observer = new PerformanceObserver((list, obj) => {
    const entries = list.getEntries();

    for (let i = 0; i < entries.length; i++) {
      // Process 'paint' events
    }
  });

  observer.observe({
    entryTypes: ['paint']
  });
  ```
* [相关资料](https://bit.ly/performance-api)

#### Client Hints
了解用户设备的功能

* 根据用户设备调整体验
  * 低内存设备（内存低于512MB的设备和内存在512MB到1GB之间的设备）在新兴市场中的应用非常广泛。根据Chrome的遥测数据，此类设备前台标签上发生的内存不足崩溃事件的数量非常庞大。
  * 提供精简版网页不仅能够改善用户体验，甚至对于确保网页的可用性也是非常有必要的举措
  * 服务器可以通过使用 Accept-CH 响应标头或通过包含 http-equiv 属性的等效元标记来通告对 Client Hints 的支持:
    ```text
    Accept-CH = Device - Memory
    ```
  * Device-Memory 请求标头变量是一个代表客户端设备内存的数字，即内存的估算大小（以GiB为单位）:
    ```text
    Device-Memory = 0.5
    ```
  * 网站可以通过 Javascript APIs 读取这些信息并进行相应调整，例如从服务器请求较淡的纹理。
    ```javascript
    console.log(navigator.deviceMemory);        // 0.5
    console.log(navigator.hardwareConcurrency); // 2
    ```
* [相关资料](http://httpwg.org/http-extensions/draft-ietf-httpbis-client-hints.html)

### 新 Javascript 功能
#### 动态模块导入: 延迟加载 Javascript 代码
在运行时动态加载代码。可用于仅在需要时延迟加载脚本，从而提升应用的性能。
```javascript
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => dialogBox.open())
  .catch(error => {
    // Error handling
  });
});
```

#### 异步生成器函数: 简化流式传输数据的消耗或实现
异步迭代器可用于 for-of 循环以及通过异步迭代器工厂创建自定义异步迭代器
```javascript
async function* getChunkSizes (url) {
  const response = await fetch(url);
  const b = response.body;
  fot await (const chunk of magic(b)) {
    yield chunk.length;
  }
}
```

#### `Promise` 中的 `Finally` 方法
确保系统无论在什么情况下都执行您需要的操作

`Finally`方法现在可以在Promise实例中使用，并且可以在`Promise`被实现或拒绝后调用。

```javascript
const fetchAndDisplay = ({url, element}) => {
  showLoadingSpinner();
  fetch(url)
    .then((response) => response.text())
    .catch((error) => error.message)
    .finally((text) => {
      element.textContent = text;
      hideLoadingSpinner();
      // ...
    });
};
```

### 与硬件相关的API
#### Web Bluetooth 与附近的蓝牙设备安全通信
* 利用Web Bluetooth API，网站能够通过Generic Attribute Profile(GATT)服务发现附件的蓝牙设备并与这些设备通信
* 目前，该API已在Chrome中得到了部分实现，涉及的操作系统包括Android M+、 Linux、 macOS 和 Chrome OS。
* [相关资料](https://bit.ly/web-bluetooth-api)

#### WebUSB 让USB设备服务在网络上公开
* 专门为网络设备设计的访问控制
  * 在网络上使用的设备要经过专门设计，这并不是要公开所有USB设备。
  * 仅限 HTTPS, 必须由用户启动。
  * 已在Chrome中得到了实现，涉及的操作系统包括Android M+、 Linux、 macOS 和 Chrome OS。
* [相关资料](https://bit.ly/web-usb)

### 关注最新消息：
[https://developers.google.com/web/updates/](https://developers.google.com/web/updates/)

***

## 04:30 ~ 05:00 为数十亿用户打造产品(Android)(301)
1. 连接
  * 优化网络连接
    * 规定流量的优先顺序: 文本优先
    * 网络请求去重
    * 根据网络连接性能调整行为
  * 优化图像
    * 在适宜时提供SVG
    * 否则提供 WebP 图像
    * 提供动态图像大小
  * 有用的离线体验
    * 缓存
    * 图像加载库
2. 设备能力
  * 屏幕尺寸
    * 专为中小屏幕构建
    * 针对中低密度屏幕进行优化
    * 通过模拟器配置进行测试
  * 高效利用内存
    * 按可用的RAM调整占用的空间
      ```java
      ActivityManager.isLowRamDevice()
      ActivityManager.getMemoryClass()
      ```
    * 避免长时间运行的进程
    * 使用Android Studio 内存监视器 监测内存使用情况
    * 使用智能存储
      * 有界缓存
        ```java
        getCacheDir()
        ```
      * 允许安装至SD卡
      * 通过应用设置进行衡量
  * 向后兼容性
    * E.g.
      * `targetSdkVersion 27`
      * `minSDKVersion 15`
    * Android 支持库
    * Google Play 服务
3. 流量费用
  * APK大小
    * 图像消耗的数据流量最多
    * 降低代码大小, 使用ProGuard
    * 在 `build.gradle` 中进行以下设置
      ```java
      minifyEnable = true
      shrinkResources = true
      ```
    * 将多个APK作为一个选项
  * 允许用户配置数据流量的使用
4. 电池消耗
  * 避免不需要的唤醒
  * 批处理网络请求
  * 使用 Firebase JobDispatcher
5. 内容
  * 快速自适应式界面
    * 处处提供触摸反馈
    * 界面始终可交互
    * 始终达到 60fps
    * 考虑启动屏幕
  * 页面最佳做法
    * 符合 Material Design
    * 使用设计支持库
  * 本地化
    * 支持用户的语言区域
    * 使用适宜的字体（例如：Noto）
6. [相关资料](https://d.android.com/billions)

