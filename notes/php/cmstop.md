# cmstop (个人工作用笔记)

## 步骤
* 新建主栏目
  * 设置 -> 栏目 -> 新闻专题 -> 新建子栏目
  * 修改:
    * 栏目名
    * 英文名
    * 栏目首页模板(新建模板后填入)
    * 栏目首页URL规则
    * 列表页URL规则
* 新建子栏目(与区块配合)
  * 主栏目下 -> 新建子栏目
  * 修改:
    * 栏目名
    * 英文名
    * 栏目首页URL规则
    * 列表页URL规则

* 新建区块
  * 页面 -> 2017专题区块 -> 管理模式 -> 添加区块

* 新建模板
  * 模板 -> 新建模板 -> zt -> 新建模板

* 图片上传
  * ...


* 生成栏目页
  * 内容 -> 进入栏目 -> 快捷操作 -> 生成栏目页

## 静态页面制作注意点
* 标题要加链接
* ...

## 代码片段收集
### 头条(手动)
```php
<!--{loop $data $r}-->
<!--{loop $r $c}-->
  <a href="{$c[url]}" title="{$c[title]}" target="_blank">
    {str_cut($c[title],44,'')}
  </a>
  <p>
      {str_cut($c[description],300)}[
      <a href="{$c[url]}" target="_blank">详细</a>
      ]
  </p>
<!--{/loop}-->
<!--{/loop}-->
```

### 幻灯(手动)
```php
<style type="text/css">
	#AA #container {position:relative;width:570px;}                       // 修改宽
	#AA #container .image {clear:both;height:286px;overflow:hidden;}      // 修改高(-20px)
	#AA #container .number {bottom:30px;height:20px;overflow:hidden;position:absolute;right:5px;text-align:center;}
	#AA #container .number span{margin:0 1px;color:#fff;cursor:pointer;display:block;float:left;height:20px;line-height:20px;background:#000;opacity:0.5;filter:Alpha(Opacity="50");text-decoration:none;width:20px;}
	#AA #container .number span:hover{background:#ff0;color:#000;}
	#AA #container .number span.this{background:#EBEBEB;color:#000;font-weight:bold;}
	#AA #container .title {padding-left: 6px; line-height: 28px; background-color: #000; }
	#AA #container .title a {height:24px;line-height:24px;font-size:14px; font-weight:bold; text-decoration:none;color:#fff}
	#AA #container .title a:hover {color:#ff0;}
</style>
<div id=AA>
  <div id="container">
    <div class="image"></div>
    <div class="number"></div>
    <div class="title"></div>
  </div>
  <ul id="slide" style="display:none">
    <!--{loop $data $k $r}-->
      <!--{loop $r $i $c}-->
      <li>
        <a href="{$c[url]}" target="_blank">
          <img src="{thumb($c[thumb],570,306)}" width="570" height="306" border="0"/>
        </a>
        <a href="{$c[url]}" target="_blank">
          {$c[title]}
        </a>
      </li>
      <!--{/loop}-->
    <!--{/loop}-->
  </ul>
</div>

<script type="text/javascript" src="{IMG_URL}js/lib/cmstop.slider.js"></script>
<script type="text/javascript">
  $('#container').imgSlide({
    data: 'slide',
    auto: true,
    type: 'mouseover',
    speed: 3000
  });
</script>
```

### 新闻列表(自动)
* `catid`: (子)栏目ID
* `weight`: 权重
* `size`: 长度

```php
<!--{content catid="3910" weight="70" order="published desc" size="2"}-->
  <div class="">
    <a href="{$r[url]}" target="_blank">
      <img src="{thumb($r[thumb],160,106)}" width="160" height="106" />
    </a>
    <div class="">
      <a class="" href="{$r[url]}" target="_blank">
        {str_cut($r[title],50,"")}
      </a>
      <p class="">
        {str_cut(description($r[contentid]),90)}
        [<a href="{$r[url]}" target="_blank">详细</a>]
      </p>
    </div>
  </div>
<!--{/content}-->
```




