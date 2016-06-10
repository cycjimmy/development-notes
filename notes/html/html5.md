# html5

## html5语法
* DOCTYPE及字符编码
	* DOCTYPE

		```html
		<!DOCTYPE html>
		```
		 
	* 字符编码

		```html
		<meta charset="utf-8">
		``` 
		
	* 设置语言
		
		```html
		<html lang="zh-cn">
		``` 
		
* 大小写都可以 | 但为了规范，一般还是小写
* 布尔值
	* checked等
* 可以省略引号 | 但为了规范，一般还是用双引号

## 新增及删除标签
* 新增标签
	* 结构标签
		* section
		* article
		* aside
		* header
		* hgroup
		* footer
		* nav
		* figure
	* 表单标签
		* email
		* url
		* number
		* range
		* date pickers
			* date
			* month
			* week
			* time
			* datetime
			* datetime-local 
		* search
		* color 
	* 媒体标签
		* video
		* audio
		* embed 
	* 其他功能标签
		* mark 标注
		* progress 进度条 
		* time 时间
			* datetime属性 datatime="0000-00-00T00:00Z"
			* pubdate属性 布尔值 表示这是一个发布时间
		* ruby 注音
		* rt
		* wbr 软换行
		* canvas 画布 配合JS使用
		* command 命令
		* details 
		* datalist 提示输入框 将一个input通过list属性与一个datalist关联（input的list属性值等于datalist的id值）
			* option 
		* keygen 密钥
		* output 输出值
		* source
		* menu
			* menu的type属性 | 只规定类型，但没有相应的CSS样式，样式还得我们自己写
				* toolbar类型 工具条类型
				* contextmenu类型 右键显示上下文形式
				* list类型 列表类型
* 删除标签
	* 可以用css代替的标签
		* basefont
		* big
		* center
		* font
		* s
		* strike
		* tt
		* u
	* 不再使用frame框架
		* frameset
		* frame
		* noframes
	* 只有个别浏览器支持的标签
		* applet
		* bgsound
		* blink
		* marquee
	* 其他不常用的标签
		* rb → ruby
		* acronym → abbr
		* dir → ul
		* isindex → form & input
		* listing → pre
		* xmp → code
		* nextid → guids
		* plaintex → "text/plian"(无格式正文)MIME类型

## 新增及废除属性
* 新增属性
	* 表单属性
	* 列表属性
		* start 有序列表的起始值

			```html
			<ol start="50" recersed>
				<li>第50个</li>
				<li>第49个</li>
				<li>第48个</li>
			</ol>
			```

		* recersed 倒序
	* 链接属性
		* media 对相应设备进行优化

			```html
			<a media="handheld" href="#">手持</a>
			<a media="tv" href="#">电视</a>
			```
			
		* hreflang 链接网址的语言
			* hreflang="zh" 表示这是一个中文链接
		* ref 链接网址的类型
			* ref="external" 表示这是一个外部链接
	* 其他属性
	* iframe框架属性
		
		```html
		<iframe seamless srcdoc="<h1>这边写的内容会替换掉后面的src内容</h1>" sandbox src="http://www.baidu.com"></iframe>
		```
		 
		* seamless 无边距无边框的框架 布尔值
		* srcdoc 定义框架里的内容
		* sandbox	规定内嵌框架受到严格安全限制 | 布尔值或可选值
			* 限制内容
				* 禁止在框架中提交表单
				* 禁止在框架中运行javascript脚本
				* 禁止相同的源，默认异源
			* 可选值
				* allow-forms 允许提交表单
				* allow-same-origin 允许是相同的源
				* allow-scripts 允许使用脚本
				* allow-top-navigation 允许使外面的页面进行跳转
	* 脚本属性
		* defer 推迟执行 | 当脚本下载完不执行，整个页面下载完才执行
			
			```html
			<script defer src="js/main.js"></script>
			```
			
		* async 异步执行 | 立刻执行脚本，且不阻止浏览器解析下面的内容
			```html
			<script async src="js/main.js"></script>
			```
			
	* css属性
		* scoped 内嵌CSS样式属性 只对标签内部元素才有效

			```html
			<div>
				//下面的style只对该div底下的元素起作用
				<style type="text/css" scoped>
					h3 {
						color: red;
					}
				</style>
				
				<h3>hello</h3>
			</div>
			```
			
	* 其他属性
		* manifest 离线缓存
		
			```html
				<html manifest="cache.manifest">
			```
			
		* charset 字符集
		
			```html
				<meta charset="utf-8">
			```

		* sizes 大小
		
			```html
				<link rel="icon" href="favicon.gif" type="image/gif" sizes="16x16">
			```
			
		* target 目标 
		
			```html
				<base href="http://localhost/" target="_blank">
			```
* 删除属性
	* 可以用css代替的属性
	* 多余属性
	* 其他属性


## 全局属性

以下属性对任意一个标签都可以使用

* data-* 自定义属性
* hidden 隐藏
* spellcheck 语法纠错
* tabindex tab顺序，tab键按照自己设置的顺序跳转输入框
* contenteditable 可编辑
* desginMode JS属性，打开这个属性，内容可编辑

	```javascript
		window.document.designMode = 'on';
		//on表示页面上所有内容都可以被编辑
	```


