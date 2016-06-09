# LESS
 CSS动态语言

## 编译工具
* Koala
* node.js
* 浏览器端编译

***

## LESS语法

头部仍然不能忘记申明编码格式

```less
@charset "utf-8";
```

### 1.注释

```less
/*这种形式会被编译保留*/
//这种形式不会被编译保留
```

### 2.变量
@\[变量名\]\:\[value\];

```less
@fontColor: red;

.word {
	color: @fontColor;
}
```

变量也有作用域，局部变量可写在混合模式的{}中间

### 3.混合Mixin
* 不带参数的混合（mixin）变量：和普通class写法类似

不带参数的混合变量也可以加括号，此时编译的时候不会生成该class的样式

```less
.border {
	border: 5px solid green;
}
.box {
	width: 100px;
	height: 100px;
	
	.border;//不需要加括号
}
```

* 带参数的混合

```less
.border(@border_width) {
	border: @border_width solid green;
}
.box {
	width: 100px;
	height: 100px;
	
	.border(30px);
}
```

* 带参数的混合（可设定默认值）

```less
.border(@border_width:10px) {
	border: @border_width solid yellow;
}
.box {
	width: 100px;
	height: 100px;
	
	.border(30px);
}
.box2 {
	width: 200px;
	height: 200px;
	
	.border();//默认用10px
}
```

### 4.匹配模式

相当于JS中的if，满足条件后才能匹配

比如用CSS画一个三角

```less
.triangle(top, @width: 5px, @color: red ) {
	//关键词为top时用这个样式（三角朝上）
	border-width: @width;
	border-color: transparent transparent @color transparent;
	border-style: dashed dashed solid dashed;
}
.triangle(bottom, @width: 5px, @color: red ) {
	//关键词为bottom时用这个样式（三角朝下）
	border-width: @width;
	border-color: @color transparent transparent transparent;
	border-style: solid dashed dashed dashed;
}
.triangle(left, @width: 5px, @color: red ) {
	//关键词为left时用这个样式（三角朝左）
	border-width: @width;
	border-color: transparent @color transparent transparent;
	border-style: dashed solid dashed dashed;
}
.triangle(right, @width: 5px, @color: red ) {
	//关键词为right时用这个样式（三角朝右）
	border-width: @width;
	border-color: transparent transparent transparent @color;
	border-style: dashed dashed dashed solid;
}
.triangle(@_, @width: 5px, @color: red ) {
	//公用样式，参数名为"@_"(固定)
	//且原先的变量"@width" "@color"必须带上
	width: 0;
	height: 0;
	overflow: hidden;
}

.down-icon {
	.triangle(bottom,10px);
}

```

### 5.运算
任何数字、颜色或者变量都可以参与运算（+ - * /），运算应该被包裹在括号中

```less
@font-big: 20px;

.word {
	font-size: @font-big + 2;
	//只要一个带单位就行
}

```

### 6.嵌套规则
* 一般嵌套
* 两种特殊嵌套
	* &对伪类使用 | hover、focus等
	* &对链接的使用 | 例如 &-item

另外，**嵌套最好不要超过三层**

```html
<ul class="list">
	<li><a href="#">条目1</a><span>xxxx-xx-xx<span></li>
	<li><a href="#">条目2</a><span>xxxx-xx-xx<span></li>
	<li><a href="#">条目3</a><span>xxxx-xx-xx<span></li>
	<li><a href="#">条目4</a><span>xxxx-xx-xx<span></li>
	<li><a href="#">条目4</a><span>xxxx-xx-xx<span></li>
</ul>
```
```less
.list {
	width: 600px;
	margin: 30px auto;
	padding: 0;
	list-style: none;
	
	li {
		height: 30px;
		line-height: 30px;
		margin-bottom: 5px;
	}
	
	a {
		float: left;
		
		//和sass一样，&代表他的上一层选择器
		&:hover {
			color:red;
		}
	}
	
	span {
		float: left;
	}

}
```

### 7.@arguments变量
@arguments包含了所有传递进来的参数

如果你不想单独处理每一个参数的话就可以像这样写：

```less
.border_arg(@width: 30px, @color: red, @style: solid) {
	border: @arguments;
}

.box {
	width: 200px;
	height: 100px;
	
	.border_arg(40px);
}
```

### 8.避免编译

有时候我们需要

* 输出一些不正确的CSS语法
* 使用一些LESS不认识的专有语法

我们可以在字符串前加上一个~'\[code\]'

```less
.box {
	width: ~'calc(300px-30px)';
}
```

### 9.!important关键字
* 会为该混合样式中的所有样式带上!important关键字
* 一般在调试的时候使用

### 10.导入

* 导入一个LESS文件
* 导入一个CSS文件 

```less
//导入一个reset.less，可以不加扩展名
@import "reset";

//导入一个reset.css
@import(less) "reset.css";
```




