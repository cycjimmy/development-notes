# css 网格布局

## 重要术语
1. Grid Container: 网格容器 (元素应用 display:grid )
2. Grid Item: 网格项 (网格容器的子元素)
3. Grid Line: 网格线 (组成网格项的分界线，与网格项无关，定义完网格容器就存在)
4. Grid Track: 网格轨道 (两个相邻的网格线之间为网格轨道，网格轨道一定会顶到网格容器边缘)
5. Grid Cell: 网格单元 (两个相邻的列网格线和两个相邻的行网格线组成)
6. Grid Area: 网格区域 (四个网格线包围的总空间)

## 单位
1. `fr`: 剩余空间分配数，用于在一系列长度值中分配剩余空间，如果多个已指定了多个部门，则剩下的空间根据各自的数字按比例分配。
2. `gr`: 网格数。

## 网格中的属性
### 网格容器中的属性
* display 定义网格容器
  * `display: grid | inline-grid | subgrid`
    * `grid`: 生成块级网格
    * `inline-grid`: 生成行内网格
    * `subgrid`: 如果网格容器本身是网格项(嵌套网格容器), 此属性用来继承其父网格容器的列、行大小
* grid-template 网格模版
  * 使用以空格分隔的多个值来定义网格的列和行
    * `grid-template-columns: <track-size> ... | <line-name> <track-size> ...;` 
    * `grid-template-rows: <track-size> ... | <line-name> <track-size> ...;` 
    * track-size 轨道大小可以使用css长度(px、em等)、百分比、或用分数(fr)
    * line-name 网格线名字: 可以选择任何名字
  * grid-template-areas: 通过引用grid-area属性指定的网络区域的名称来定义网络模版。
* gap 网格空隙
* items 网格项的对齐属性
* content 对齐属性
* grid-auto
* grid
