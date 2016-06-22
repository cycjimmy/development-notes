# Ajax

## 1 基本概念介绍
### 1.1 Ajax简介
* Ajax的全称
    * Asynchronous Javascript and XML
    * 异步的Javascript 和 XML
* Ajax不是某一种编程语言
    * 是一种在无需重新加载整个网页的情况之下，能够更新部分网页的技术
* 利用Ajax异步操作页面需要：
    * 运用HTML和CSS来实现页面，表达信息
    * 运用XMLHttpRequest和web服务器进行数据的异步交换
    * 运用javascript操作DOM，实现动态局部刷新

### 1.2 HTTP请求
#### 1.2.1 什么是http
* http是计算机通过网络进行通信的规则
* http是一种无状态的协议（不建立持久的连接）

#### 1.2.2 一个完整的http请求过程，通常有下面7个步骤：
* 建立TCP连接
* Web浏览器向Web服务器发送请求命令
* Web浏览器发送请求头信息
* Web服务器应答
* Web服务器发送应答头信息
* Web服务器向浏览器发送数据
* Web服务器关闭TCP连接

#### 1.2.3 一个http请求一般由四部分组成：
* http请求的方法或动作（比如是GET还是POST请求）
    * get（幂等）
        * 一般用于信息获取
        * 使用URL传递参数
        * 对所发送信息的数量有限制，一般在2000个字符
    * post
        * 一般用于修改服务器上的资源
        * 对所发送信息的数量无限制
* 正在请求的URL（总得知道请求的地址是什么吧）
* 请求头（包含一些客户端环境信息，身份验证信息等）
* 请求体（也就是请求正文，请求正文中可以包含客户提交的查询字符串信息，表单信息等）

#### 1.2.4 一个http响应一般由三部分组成：
* 一个数字和文字组成的状态码（用来显示请求时成功还是失败）
    * 状态码由3位数字构成，其中首位数字定义了状态的类型
        * 1xx:信息类，表示收到Web浏览器请求，正在进一步的处理中
        * 2xx:成功，表示用户请求被正确接收、理解和处理
            * 例如：200 OK
        * 3xx:重定向，表示请求没有成功，客户必须采取进一步的动作
        * 4xx:客户端错误，表示客户端提交的请求有错误
            * 例如：404 NOT FOUND，意味着请求中所引用的文档不存在
        * 5xx:服务器错误，表示服务器不能完成对请求的处理
* 响应头（响应头也和请求头一样包含许多有用的信息，例如服务器类型、日期时间、内容类型和长度等）
* 响应体（也就是响应正文）
    
### 1.3 XMLHttpRequest
#### 1.3.1 XMLHttpRequest对象创建

```javascript
var request = new XMLHttpRequest();
```

#### 1.3.2 XMLHttpRequest发送请求的几个方法
* open(method, url, async)
    * method:发送请求的方法 GET/POST
    * url:请求地址
    * async:请求异步 默认为true，可以不填写
* send(string)
    * get请求的string参数可以不填写（在Url中）
* setRequestHeader()
    * setRequestHeader方法一定要写在open和send之间

#### 1.3.3 XMLHttpRequest取得响应的几个方法
* responseText: 获得字符串形式的响应数据
* responseXML: 获得XML形式的响应数据
* status: 以数字形式返回HTTP状态码
* statusText: 以文本形式返回HTTP状态码
* getAllResponseHeader(): 获取所有的响应报头
* getResponseHeader(string): 查询响应报头中某个字段的值
* onreadystatechange(fn): 监听readyState属性的变化
    * readyState属性
        * 0: 请求为初始化，open还没有调用
        * 1: 服务器连接已建立，open已经调用了
        * 2: 请求已接收，也就是接收到头信息了
        * 3: 请求处理中，也就是接收到响应主体了
        * 4: 请求已完成，且响应已就绪，也就是响应完成了

    ```javascript
        request.onreadystatechange = function() {
            if (request.readyState===4 && request.status===200) {
                console.log('请求成功：' + responseText);
            } 
        }
    ```





















