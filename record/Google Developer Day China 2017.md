# Google Developer Day China 2017

***
(20171213)

## 09:30 ~ 10:30 开幕主题演讲(301)
(略)

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


## 02:00 ~ 02:30 Firebase 中的新增功能(302)
(略)

## 03:00 ~ 03:30 Firebase 功能更新 构建更好的应用(305)
* 使用Firebase App Indexing
* 遇到问题怎么办？
  * stackoverflow
  * google group
  * firebase 的"问题排查"功能: 一年有10次免费的咨询机会，有专人为你解答

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

```javascript

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

## 04:30 ~ 05:00 使用 Actions on Google 开发对话式智能助理应用(302)
## 05:15 ~ 05:45 使用 AMP 构建电子商务网站(302)
## 06:00 ~ 06:30 用户体验提升：Material Design 的基础对用户体验有何影响(302)

***
(20171214)

## 10:00 ~ 10:30 亲身体验 Android Things 并打造您自己的 IoT 设备
## 10:45 ~ 11:15 PWA 框架和工具
## 11:30 ~ 12:30 午餐

## 12:30 ~ 01:00 开放源代码框架 TensorFlow
## 01:15 ~ 01:45 Google Cloud Platform 基础知识：导览
## 02:00 ~ 02:30 TensorFlow Lite: TensorFlow for Mobile
## 02:45 ~ 03:00 茶歇
## 03:00 ~ 03:30 机器学习 API 介绍及实况演示
## 03:45 ~ 04:15 什么是网络的未来潮流？
## 04:30 ~ 05:00 为数十亿用户打造产品 or 借助 Android Things 构建量产 IoT 设备


