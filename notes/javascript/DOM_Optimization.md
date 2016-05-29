# DOM Optimization (DOM优化)

DOM访问和操作是现代网页应用中很重要的一部分。但每次你通过“桥梁”，也就是从ECMAScript到DOM时，都会被收取“过路费”。为减少DOM编程中的性能损失，具体要注意的有：

***

### 1.Minimize DOM access, and try to work as much as possible in JavaScript. (最小化DOM访问，在javascript端做尽可能多的事。)

```javascript
//slower
function innerHTMLLoop() {  
	for (var count = 0; count < 15000; count++) {  
		document.getElementById('here').innerHTML += 'a';  
	}  
};

//faster
function innerHTMLLoop2() {  
	var content = '';  
		for (var count = 0; count < 15000; count++) {  
			content += 'a';  
		}  
	document.getElementById('here').innerHTML += content;  
};
```
***

### 2.Use local variables to store DOM references you'll access repeatedly. (在反复访问的地方使用局部变量存放DOM引用。)

一般来说，对于任何类型的**DOM**访问，如果同一个**DOM属性或方法**被访问**一次以上**，最好使用一个**局部变量**缓存此**DOM**成员。

当遍历一个集合时，第一个优化是将集合引用存储于**局部变量**，并在循环之外缓存**length**属性。

然后，如果在循环体中**多次访问**同一个集合元素，那么使用**局部变量**缓存它。

```javascript
// slow
//循环体中有3次DOM查询！太慢了
function collectionGlobal() {  
	var coll = document.getElementsByTagName_r('div'),  
	len = coll.length,  
	name = '';  
	for (var count = 0; count < len; count++) {  
		name = document.getElementsByTagName_r('div')[count].nodeName;  
		name = document.getElementsByTagName_r('div')[count].nodeType;  
		name = document.getElementsByTagName_r('div')[count].tagName; 
		//3次DOM查询
	}  
	return name; 
}; 


// faster
//将html集合缓存为局部变量coll，在循环体中查询3次已被缓存的局部变量，速度快】
function collectionLocal() {  
	var coll = document.getElementsByTagName_r('div'),  
	len = coll.length,  
	name = '';  
	for (var count = 0; count < len; count++) {  
		name = coll[count].nodeName;  
		name = coll[count].nodeType;  
		name = coll[count].tagName;  
	}  
	return name; 
};


// fastest
//coll[count]在循环体中出现了3次，所以将coll[count]缓存成局部变量el，进一步提高速度
function collectionNodesLocal() {  
	var coll = document.getElementsByTagName_r('div'),  
	len = coll.length,  
	name = '',  
	el = null;  
	for (var count = 0; count < len; count++) {  
		el = coll[count];  
		name = el.nodeName;  
		name = el.nodeType;  
		name = el.tagName;  
	}  
	return name;  
};  


```


***

### 3.Be careful when dealing with HTMLcollections because theyrepresent the live, underlying document. Cache the collection lengthinto a variable and use it when iterating, and make a copy of the collection into an array for heavy work on collections.   (小心地处理HTML集合，因为他们表现出“存在性”，总是对底层文档重新查询。将集合length属性缓存到一个变量中，在迭代中使用这个变。如果经常操作这个集合，可以将集体拷贝到数组中。)

#### HTML集合有：
* document.getElementsByName()  
* document.getElementsByClassName()  
* document.getElementsByTagName_r()  
* document.images --> 页面中所有的\<img\>元素
* document.links --> 所有的\<a\>元素
* document.forms --> 所有表单
* document.forms[0].elements --> 页面中第一个表单的所有字段

这些方法和属性返回**HTMLCollection对象**，是一种类似数组的列表。
它们不是数组（因为它们没有诸如**push()**或**slice()**之类的方法），但是提供了一个**length**属性，和数组一样你可以使用索引访问列表中的元素。例如，**document.images[1]**返回集合中的第**2**个元素。


```javascript
var alldivs = document.getElementsByTagName_r('div'); 
for (var i = 0; i < alldivs.length; i++) {
	document.body.appendChild(document.createElement('div'));
}  
```
这段代码看上去只是简单地倍增了页面中div元素的数量。它遍历现有div，每次创建一个新的div 并附加到body上面。
但实际上这是个死循环，因为循环终止条件**alldivs.length**在每次迭代中都会增加，它反映出底层文档的当前状态。

正确的做法：将一个HTML集合拷贝给一个数组。

```javascript
//循环拷贝给一个数组方法
function toArray(coll) {  
	for (var i = 0, a = [], len = coll.length; i < len; i++) { 
	//循环的时候,将coll.length使用局部变量len存放
	//不建议用数组的length属性做循环判断条件。
	//访问集合的length比数组的length还要慢，因为它意味着每次都要重新运行查询过程.
		a[i] = coll[i];  
	}
	return a;  
}  

//将html集合拷贝给一个数组arr
var coll = document.getElementsByTagName_r('div');  
var arr = toArray(coll);

//下面给出3种方案

//slower
//如果仍然使用coll.length作为结束条件，每次循环都仍需查询DOM。
function loopCollection () {  
	for (var count = 0; count < coll.length; count++) { 
		//code
	}
}；


//faster
//arr.length和coll.length是相等的，用arr.length代替coll.length，省去了每次循环对DOM的查询
function loopCopiedArray () {  
	for (var count = 0; count < arr.length; count++) { 
		//code
	} 
}；


//faster
//将html集合缓存成局部变量，并在循环之外缓存length属性
function loopCacheLengthCollection () {  
	var coll = document.getElementsByTagName_r('div'),  
	    len = coll.length;  
	for (var count = 0; count < len; count++) {
		//code
	}
}；


```


***

### 4.Use faster APIs when available, such as querySelectorAll() and firstElementChild.  可能的话，使用速度更快的API，诸如querySelectorAll()和firstElementChild。
识别DOM中的元素时，开发者经常需要更精细的控制，而不仅是**getElementById()**和**getElementsByTagName_r()**之类的函数。有时你结合这些函数调用并迭代操作它们返回的节点，以获取所需要的元素，这一精细的过程可能造成效率低下.

另一方面，使用**CSS选择器**是一个便捷的确定节点的方法，因为开发者已经对CSS很熟悉了。许多JavaScript库为此提供了API，而且最新的浏览器提供了一个名为**querySelectorAll()**的原生浏览器DOM函数。显然这种方法比使用JavaScript和DOM迭代并缩小元素列表的方法要快。

如下所示：

```javascript
var elements = document.querySelectorAll('#menu a');

```

elements的值将包含一个引用列表，指向那些具有id="menu"属性的元素。函数**querySelectorAll()**接收一个CSS选择器字符串参数并返回一个**NodeList**——由符合条件的节点构成的类数组对象。

此函数**不返回HTML集合**，所以返回的节点不呈现文档的“存在性结构”。这就避免了本章前面提到的HTML集合所固有的性能问题（以及潜在的逻辑问题）。***【第四点废话了这么多句话，这边才是重点，一句话能用querySelectorAll()就用呗】***

如果不使用**querySelectorAll()**，达到同样的目标的代码会冗长一些：

```javascript
var elements = document.getElementById('menu').getElementsByTagName_r('a');

```
这种情况下elements将是一个**HTML集合**，所以如果想得到与**querySelectorAll()**同样的返回值类型的话,你还需要将它拷贝到一个数组中。

***

### 5.Be mindful of repaints and reflows; batch style changes, manipulate the DOM tree "offline," and cache and minimize access to layout information.  注意重绘和重排版；批量修改风格，离线操作DOM树，缓存并减少对布局信息的访问。

当浏览器下载完所有页面HTML标记，JavaScript，CSS，图片之后，它解析文件并创建两个内部数据结构：一棵DOM树（表示页面结构），一棵渲染树（表示DOM节点如何显示）。

#### 重排版的情况：
* 添加或删除可见的DOM元素
* 元素位置改变
* 元素尺寸改变（因为边距，填充，边框宽度，宽度，高度等属性改变）
* 内容改变，例如文本改变或图片被另一个不同尺寸的所替代
* 最初的页面渲染
* 浏览器窗口改变尺寸

#### (1)批量修改

重排版和重绘代价昂贵，所以，提高程序响应速度一个好策略是减少此类操作发生的机会。为减少发生
次数，你应该将多个DOM和风格改变合并到一个批次中一次性执行。

```javascript
//分3步修改 浪费性能
var el = document.getElementById('mydiv');  
el.style.borderLeft = '1px';  
el.style.borderRight = '2px';  
el.style.padding = '5px';  


//better  
var el = document.getElementById('mydiv');  
el.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px;';  


//如果你打算保持当前的风格，你可以将它附加在cssText 字符串的后面。  
el.style.cssText += '; border-left: 1px;';  

//or
//添加class，交给CSS样式处理
var el = document.getElementById('mydiv');  
el.className = 'active';

```

#### (2)离线操作DOM
```javascript
var data = [  
	{  
		"name": "Nicholas",  
		"url": "http://nczonline.net"  
	},
	{  
		"name": "Ross",  
		"url": "http://techfoolery.com"  
	}  
];  

//一个通用的函数，用于将新数据更新到指定节点中 
function appendDataToElement(appendToElement, data) {  
	var a, li;  
	for (var i = 0, max = data.length; i < max; i++) {  
		a = document.createElement('a');
		a.href = data[i].url;
		a.appendChild(document.createTextNode(data[i].name)); //将data[i].name输入<a>标签内部
		li = document.createElement('li');
		li.appendChild(a);
		appendToElement.appendChild(li);
	}
}; 


//减少重排版的一个方法是通过改变display 属性，临时从文档上移除<ul>元素然后再恢复它。
var ul = document.getElementById('mylist');
ul.style.display = 'none';
appendDataToElement(ul, data);
ul.style.display = 'block';


//在文档之外创建并更新一个文档片断，然后将它附加在原始列表上。 
//文档片断是一个轻量级的document 对象，它被设计专用于更新、移动节点之类的任务 
var fragment = document.createDocumentFragment();  //创建文档片断
appendDataToElement(fragment, data); //将数据插入到文档片断中
document.getElementById('mylist').appendChild(fragment);  //将文档片段插入html中

//创建要更新节点的副本，然后在副本上操作，最后用新节点覆盖老节点
var old = document.getElementById('mylist'); //缓存老节点  
var clone = old.cloneNode(true);  //克隆老节点
appendDataToElement(clone, data);  //将数据增加到clone
old.parentNode.replaceChild(clone, old); //用clone替换原节点

```
推荐尽可能使用**文档片断**（第二种解决方案），因为它涉及最少数量的DOM操作和重排版。
唯一潜在的缺点是，当前文档片断还没有得到充分利用，开发者可能不熟悉此技术。

#### (3)缓存布局信息

尽量减少对布局信息的查询次数，查询时将它赋给局部变量，并用局部变量参与计算。

```javascript

//timeout中的代码
myElement.style.left = 1 + myElement.offsetLeft + 'px';  
myElement.style.top = 1 + myElement.offsetTop + 'px';  
if (myElement.offsetLeft >= 500) {  
	stopAnimation();  
}  
  
//优化后 
current++  
myElement.style.left = current + 'px';  
myElement.style.top = current + 'px';  
if (current >= 500) {  
stopAnimation();  
}  

```


***

### 6.Position absolutely during animations, and use drag and drop proxies. 动画中使用绝对坐标，使用拖放代理。

***

### 7.Use event delegation to minimize the number of event handlers.  使用事件托管技术最小化事件句柄数量

事件托管技术，就是采用冒泡方式，尽量将事件挂载到元素的**父节点**，然后在**父节点统一处理**，减少事件的挂载量。

当页面中存在大量元素，而且每个元素有一个或多个事件句柄与之挂接（例如onclick）时，可能会影响性能。连接每个句柄都是有代价的，无论其形式是加重了页面负担（更多的页面标记和JavaScript代码）还是表现在运行期的运行时间上。你需要访问和修改更多的DOM节点，程序就会更慢，特别是因为事件挂接过程都发生在**onload**（或**DOMContentReady**）事件中，对任何一个富交互网页来说那都是一个繁忙的时间段。挂接事件占用了处理时间，另外，浏览器需要保存每个句柄的记录，占用更多内存。当这些工作结束时，这些事件句柄中的相当一部分根本不需要（因为并不是100%的按钮或者链接都会被用户点到），所以很多工作都是不必要的。

每个事件发生时会经历**捕获**，**到达目标**，**冒泡**，三个阶段。例如：

```html
<!DOCTYPE html>
<html>
	<body>
		<div>
			<ul id="menu">
				<li>
					<a href="menu1.html">menu #1</a>
				</li>
			</ul>
		</div>
	</body>
</html>
```

当用户点击了“menu #1”链接，点击事件首先被\<a\>元素收到。然后它沿着DOM树冒泡，被\<li\>元素收到，然后是\<ul\>，接着是\<div\>，等等，一直到达文档的顶层，甚至window。如果需要在每个li上加监听事件，那么可以加到ul上，因为每次点击li都会冒泡到ul上。



***


#####说明：
* *原文来自网络*
* *经过[cycjimmy](https://github.com/cycjimmy)整合改编 [根据本人理解改编，其中难免有理解偏差，如发现问题请大家指正，谢过]*




