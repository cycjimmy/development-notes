## markdown editor
* local
	* for mac [macdown](http://macdown.uranusjr.com)
	* for win10 [MarkPad](http://code52.org/DownmarkerWPF/)

* online
[stackedit](https://stackedit.io) 


***


## markdown syntax
### title 标题
# \# h1
## \#\# h2
### \#\#\# h3
#### \#\#\#\# h4
##### \#\#\#\#\# h5
###### \#\#\#\#\#\# h6

***

### list 列表
* \* li1
	* \* li1.1
		* \* li1.1.1
		* \* li1.1.2
		* \* li1.1.3
	* \* li1.2
	* \* li1.3
* \* li2
* \* li3

1. li1
	* \* li1.1
	* \* li1.2
2. li2
3. li3

***
### quote 引用
> \> blockquote q

***
### link 链接
 \[link_name\]\(url\)
[baidu](http://baidu.com)

***
### pic 插入图片
\!\[name\]\(url\)\{ImgCap\}\{\/ImgCap\}

***
### bold 粗体
**\*\*bold\*\***

***
### italic 斜体

*\*italic\**


***
### bold italic 黑体斜体

***\*\*\*bold italic\*\*\****

***

### code 代码片段
\`\`\`javascript

	var nickName = 'cycjimmy';
  
\`\`\`

##### 效果如下：

```javascript
	var nickName = 'cycjimmy';
```

***

### 流程图

\`\`\`flow
st=>start: Start:>https://www.zybuluo.com
io=>inputoutput: verification
op=>operation: Your Operation
cond=>condition: Yes or No?
sub=>subroutine: Your Subroutine
e=>end

st->io->op->cond
cond(yes)->e
cond(no)->sub->io
\`\`\`

##### 效果如下：

```flow
st=>start: Start:>https://www.zybuluo.com
io=>inputoutput: verification
op=>operation: Your Operation
cond=>condition: Yes or No?
sub=>subroutine: Your Subroutine
e=>end

st->io->op->cond
cond(yes)->e
cond(no)->sub->io
```