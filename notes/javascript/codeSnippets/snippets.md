# 代码片段收集

## 验证(email为例)
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

## 检测是否是微信浏览器
```javascript
/**
 * @returns Boolean
 */
let isWeixin = () => {
  let ua = navigator.userAgent.toLowerCase(); 
  return (ua.match(/MicroMessenger/i) == "micromessenger");
}
```

## 格式化时间戳
```javascript
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
