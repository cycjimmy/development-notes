# Ajax

## 1 Ajax基本概念介绍
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
* `open(method, url, async)`
    * method:发送请求的方法 GET/POST
    * url:请求地址
    * async:请求异步 默认为true，可以不填写
* `send(string)`
    * get请求的string参数可以不填写（在Url中）
* `setRequestHeader()`
    * setRequestHeader方法一定要写在open和send之间

#### 1.3.3 XMLHttpRequest取得响应的几个方法
* `responseText`: 获得字符串形式的响应数据
* `responseXML`: 获得XML形式的响应数据
* `status`: 以数字形式返回HTTP状态码
* `statusText`: 以文本形式返回HTTP状态码
* `getAllResponseHeader()`: 获取所有的响应报头
* `getResponseHeader(string)`: 查询响应报头中某个字段的值
* `onreadystatechange(fn)`: 监听`readyState`属性的变化
    * `readyState`属性
        * `0`: 请求为初始化，`open`还没有调用
        * `1`: 服务器连接已建立，`open`已经调用了
        * `2`: 请求已接收，也就是接收到头信息了
        * `3`: 请求处理中，也就是接收到响应主体了
        * `4`: 请求已完成，且响应已就绪，也就是响应完成了

    ```javascript
        request.onreadystatechange = function() {
            if (request.readyState===4 && request.status===200) {
                console.log('请求成功：' + responseText);
            } 
        }
    ```
    
#### 1.3.4 Ajax+php创建一个简单实例
##### 实例简介
* 纯html页面，用来实现员工查询和新建页面
* php页面，用来实现查询员工和新建员工的后台接口

##### php简介
* php是一种创建动态交互性站点的**服务器端脚本语言**
    * 开源
    * 免费
    * 使用广泛
    * 入门简单
* php能够生成动态页面内容
* php能够创建、打开、读取、写入、删除以及关闭服务器上的文件
* php能够接收表单数据
* php能够发送并取回cookies
* php能够添加、删除、修改数据库中的数据
* php能够限制用户访问网站中的某些页面
* ...
* php开发环境：[XAMPP](https://www.apachefriends.org/)

### 1.4 JSON
#### 1.4.1 JSON基本概念
* JSON：JavaScript对象表示法(JavaScript Object Notation)
* JSON是储存和交换文本信息的语法，类似XML。采用键值对的方式来组织，易于人们阅读和编写，同时也易于机器解析和生成
* JSON是独立于语言的，也就是说不管什么语言，都可以解析JSON，只需要按照JSON的规则来就行

#### 1.4.2 JSON与XML比较
* JSON的长度比XML格式小
* JSON读写的速度更快
* JSON可以使用JavaScript内建的方法直接进行解析，转换成JavaScript对象，非常方便

#### 1.4.3 JSON语法
* JSON数据的书写格式是:名称/值对
    * 例如：`"name": "郭靖"`
* JSON的值可以是下面这些类型：
    * 数字（整数或浮点数）
    * 字符串（在双引号中）
    * 逻辑值（true或false）
    * 数组（在方括号中）
    * 对象（在花括号中）
    * null
* 示例：

    ```json
    {
        "staff": [
            {"name": "洪七", "age": 70},
            {"name": "郭靖", "age": 35},
            {"name": "黄蓉", "age": 30}
        ]
    }
    ```

#### 1.4.4 JSON解析
* eval
    * 在代码中使用eval是很危险的，eval会执行json中的函数，特别是用它执行第三方json数据时，其中可能包含恶意代码
* JSON.parse
    * JSON.parse只解析字符串本身，不会执行其中函数，还可以捕获JSON中的语法错误，推荐使用
    
#### 1.4.5 JSON校验
* [JSONLint](http://jsonlint.com/)

## 2 用jquery实现Ajax
* `jQuery.ajax([settings])`
    * `type`: 类型,"POST"或"GET",默认为"GET"
    * `url`: 发送请求的地址
    * `data`: 是一个对象，连同请求发送到服务器的数据
    * `dataType`: 预期服务器返回的数据类型。如果不指定，jQuery将自动根据HTTP包MIME信息来智能判断，－般我们采用json格式，可以设置为"json"
    * `success`: 是－个方法,请求成功后的回调函数。传入返回后的数据，以及包含成功代码的字符串
    * `error`: 是－个方法，请求失败时调用此函数，传入XMLHttpRequest对象
* 示例

    ```javascript
    $("#save").click(function(){ 
		$.ajax({ 
		    type: "POST", 	
			url: "serverjson.php",
			data: {
				name: $("#staffName").val(), 
				number: $("#staffNumber").val(), 
				sex: $("#staffSex").val(), 
				job: $("#staffJob").val()
			},
			dataType: "json",
			success: function(data){
				if (data.success) { 
					$("#createResult").html(data.msg);
				} else {
					$("#createResult").html("出现错误：" + data.msg);
				}  
			},
			error: function(jqXHR){     
			   alert("发生错误：" + jqXHR.status);  
			} 
		});
	});
    ```

## 3 跨域
### 3.1 什么是跨域
* 一个域名地址的组成：以 http://www.abc.com:8080/scripts/jquery.js 为例
    * 协议(http://)
    * 子域名(www)
    * 主域名(abc.com)
    * 端口号(8080)
    * 请求资源地址(scripts/jquery.js)
* 当协议、子域名、主域名、端口号中任意一个不同，都算作不同域
* 不同域之间相互请求组员，就算作“跨域”
* JavaScript出于安全方面的考虑，不允许跨域调用其他页面的对象。简单的理解就是因为JavaScript同源策略的限制，a.com域名下的js无法操作b.com或是c.a.com域名下的对象。

### 3.2 处理跨域的方法
#### 3.2.1 代理
* 通过在同域名的web服务器端创建一个代理（后端处理）

#### 3.2.2 JSONP
* JSONP可用于解决主流浏览器的跨域数据访问问题
* 局限性：只对GET请求有效，不支持POST请求

#### 3.2.3 XHR2
* HTMLS提供的XMLHttpRequest Level2已经实现了跨域访问以及其他的－些新功能
* IElO以下的版本都不支持
* 在服务器端做－些小小的改造即可(php)
    * `header('Access-Control-Allow-Origin:*')`
    * `header('Access-Control-Allow-Methods:POST,GET')`














