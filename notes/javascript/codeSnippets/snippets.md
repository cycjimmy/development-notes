# 代码片段收集

## Html & Css

### 只用一个标签实现标签最小高度120px，当标签为空时居中显示 `暂无内容` 字样
```html
<body>
<style>
  .main {
    position: relative;
    min-height: 120px;
    background-color: #ddd;
  }
  .main:empty::after{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    content: "暂无内容";
    color: #666;
  }
</style>

<div class="main"></div>
</body>
```
[view](https://cycjimmy.github.io/development-notes/interviewCoding/oneLabel.html)

### div模拟textarea
```html
<body>
<style>
  .mock-textarea {
    width: 200px;
    min-height: 50px;
    padding: 10px;
    
    outline: 0;
    border: 1px solid #ddd;
    cursor: text;
    word-wrap: break-word;
  }
</style>

<div class="mock-textarea" contenteditable>mock textarea</div>
</body>
```
[view](https://cycjimmy.github.io/development-notes/interviewCoding/divMockTextarea.html)

## Javascript 

### 验证(email为例)
```javascript
/**
 * @param emailStr
 * @returns Boolean
 */
let checkMail = emailStr => {
  let 
    filter  = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
  ;
  
  return filter.test(emailStr);
}
```

### 检测是否是微信浏览器
```javascript
/**
 * @returns Boolean
 */
let isWeixin = () => {
  let ua = navigator.userAgent.toLowerCase(); 
  return (ua.match(/MicroMessenger/i) == "micromessenger");
}
```

### 格式化时间戳
```javascript
/**
 * @param timeStamp
 * @returns String
 */
let formatDate = (timeStamp)=> {
  let
    year = timeStamp.getFullYear()
    , mouth = timeStamp.getMonth() + 1
    , day = timeStamp.getDate()
    , hour = timeStamp.getHours()
    , minute = timeStamp.getMinutes()
    , second = timeStamp.getSeconds()
    ;
  
  return year + "-" + mouth + "-" + day + " " + hour + ":" + minute + ":" + second; 
} 
```


