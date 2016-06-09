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
\@\[变量名\]\:\[value\];

```less
@fontColor: red;

.word {
	color: @fontColor;
}
```

### 3.混合
* 不带参数的：和普通class写法类似

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

* 带参数的

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

* 带默认值

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

```less
@font-big: 20px;

.word {
	font-size: @font-big + 2;
	//只要一个带单位就行
}

```

### 6.嵌套规则



***

更新中……


