## markdown editor
* local
	* for mac [macdown](http://macdown.uranusjr.com)
	* for win10 [MarkPad](http://code52.org/DownmarkerWPF/)

* online
[stackedit](https://stackedit.io) 

***

## markdown syntax
### title 标题

```markdown
# h1
## h2
### h3
#### h4
##### h5
###### h6
```

***

### list 列表
#### 无序列表
* li1
	* li1.1
	* li1.2
* li2
* li3

```markdown
* li1
	* li1.1
	* li1.2
* li2
* li3
```

#### 有序列表（可组合使用）
1. li1
	* li1.1
	* li1.2
2. li2
3. li3

```markdown
1. li1
	* li1.1
	* li1.2
2. li2
3. li3
```

***
### quote 引用
> blockquote q

```markdown
> blockquote q
```

***

### link 链接
 \[link_name\]\(url\)
 
[cycjimmy](https://github.com/cycjimmy)

```markdown
[cycjimmy](https://github.com/cycjimmy)
```

***
### pic 插入图片
\!\[name\]\(url\)\{ImgCap\}\{\/ImgCap\}

***

### bold 粗体
**bold**

```markdown
**bold**
```

***
### italic 斜体

*italic*

```markdown
*italic*
```

***

### bold italic 黑体斜体

***bold italic***

```markdown
***bold italic***
```

***

### 删除线

~~删除线~~

```markdown
~~删除线~~
```

***
### table

| 表头一   | 表头二   | 表头三  |
| ------- | -------:|:------:|
| 默认     | 右对齐   | 居中    |


```markdown
| 表头一   | 表头二   | 表头三  |
| ------- | -------:|:------:|
| 默认     | 右对齐   | 居中    |
```

***

### code 代码片段
```javascript
	var nickName = 'cycjimmy';
```

```markdown
    ```javascript
        var nickName = 'cycjimmy';
    ```
```