# svg 基础
课程地址： https://www.imooc.com/learn/143

## svg简介
* W3C标准 ([http://www.w3.org/TR/SVG11/](http://www.w3.org/TR/SVG11/))
* 浏览器支持情况 ([http://caniuse.com/#cats=SVG](http://caniuse.com/#cats=SVG))

### 基本图形
#### <rect> 矩形
* fill: 填充
* stroke: 描边样式
* stroke-width: 描边粗细
* transform: 变换
* x: x坐标
* y: y坐标
* width: 宽
* height: 高
* rx: 圆角
* ry: 圆角

#### <circle> 圆形
* fill
* stroke
* stroke-width
* transform
* cx: 圆心x坐标
* cy: 圆心y坐标
* r: 半径

#### <ellipse> 椭圆
* fill
* stroke
* stroke-width
* transform
* cx
* cy
* rx: 半径
* ry: 半径

#### <line> 线段
* fill
* stroke
* stroke-width
* transform
* x1: 第一个点x坐标
* y1: 第一个点y坐标
* x2: 第二个点x坐标
* y2: 第二个点y坐标

#### <polyline> 折线
* fill
* stroke
* stroke-width
* transform
* points: 点集
  * 格式：(xi, yi)+。 如 points="x1 y1 x2 y2 x3 y3 x4 y4"
  
#### <polygon> 多边形
* fill
* stroke
* stroke-width
* transform
* points(同polyline)

### 基本API
* 创建图形: `document.createElementNS(ns, tagName)`
* 添加图形: `element.appendChild(childElement)`
* 设置属性: `element.setAttribute(name, value)`
* 设置属性: `elememt.getAttribute(name)`

## SVG的坐标系统和坐标变换
###  SVG的世界、视野、视窗
* 控制视窗: 
  * width
  * height 
* 定义世界: SVG代码 
* 控制视野:
  * viewBox: 
    * x
    * y
    * width
    * height
  * preserveAspectRatio: <align meetOrSlice>
    * align: 对齐
      * none: 会根据视野变形
      * xMinYMin
      * xMidYMin
      * xMaxYMin
      * xMinYMid
      * xMidYMid
      * xMaxYMid
      * xMinYMax
      * xMidYMax
      * xMaxYMax
    * meetOrSlice:
      * meet: 适合
      * slice: 裁切

```svg
<svg xmlns="..."
  width="800" height="600"
  viewBox="0 0 400 300"
  preserveAspectRatio="xMidYMid meet">
  <!--SVG Content-->
</svg>
```

### SVG图形分组
* <g>标签来创建分组
* 属性继承
* transform 属性定义坐标变换
* 可以嵌套使用

### SVG坐标系统
#### 坐标系统概述
* 笛卡尔直角坐标系
* 原点
* 互相垂直的两条数轴
* 角度定义

#### SVG中的四个坐标系
* 用户坐标系 (User Coordinate): 也叫原始坐标系-> svg标签定义
  * 世界的坐标系
* 自身坐标系 (Current Coordinate)
  * 每个图形元素或分组独立与生俱来
* 前驱坐标系 (Previous Coordinate)
  * 父容器的坐标系
* 参考坐标系 (Reference Coordinate)
  * 使用其它坐标系来考究自身的情况时使用

### 坐标变换
#### 坐标变换定义
* 数学上，「坐标变换」是采⽤⼀定的数学⽅法将⼀个坐标系的坐标变换为另⼀个坐标系的坐标的过程。
* SVG 中，「坐标变换」是对⼀个坐标系到另⼀个坐标系的变换的描述

#### 线性变换
* 线性变换⽅程
  * X’ = aX + cY + e
  * Y’ = bX + dY + f
* 变换矩阵
```text
⎡ a c e ⎤
⎢ b d f ⎥
⎣ 0 0 1 ⎦
```

#### transform属性
* 前驱坐标系：⽗容器的坐标系
* transform属性：定义前驱坐标系到⾃⾝坐标系的线性变换
* 语法：
  * rotate(<deg>)*
  * translate(<x>,<y>)*
  * scale(<sx>,<sy>)*
  * matrix(<a>,<b>,<c>,<d>,<e>,<f>)*

## 颜色、渐变和笔刷
### 颜色 RGB 和 HSL: 都是 CSS3 支持的颜色表示方法

#### RGB
* 红色、绿色、蓝色三个分量
* 表示方式：rgb(r, g, b) 或 #rrggbb
* 每个分量取值范围：[0, 255]
* 优劣
  * 优势：显示器容易解析
  * 劣势：不符合人类描述颜色的习惯

#### HSL
* 三个分量分别表示颜色、饱和度和亮度
* 格式：hsl(h, s%, l%)
* 取值范围：
  * h: [0, 359]
  * s, l: [0, 100]
* 优势：符合人类描述颜色的习惯
* 应⽤⽰例: http://paletton.com/

#### 透明度
* rgba(r, g, b, a) 和 hsla(h, s%, l%, a) 表示带透明度的颜色
* opacity 属性表示元素的透明度
* a 和 opacity 的取值范围：[0, 1]

#### 在 SVG 中应用颜色
```svg
<svg>
  <rect fill="rgb(255,0,0)" opacity="0.5" />
  <rect stroke="hsla(0,50%,60%, 0.5)" />
</svg>
```

### 渐变: 让图形更丰满
#### 线性渐变
* <linearGradient>和<stop>
* 定义方向
* 关键点位置及颜色
* gradientUnits
  * objectBoundingBox(包裹盒子的百分比进行计算default)
  * userSpaceOnUse(使用世界坐标系)
```svg
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1497FC"></stop>
      <stop offset="0.5" stop-color="#001122"></stop>
      <stop offset="1" stop-color="#ABCDEF"></stop>
    </linearGradient>
  </defs>
  <rect x="100" y="100" fill="url(#grad1)" ></rect>
</svg>
```

#### 径向渐变
* <radialGradient>和<stop>
* 定义方向
* 关键点位置及颜色
* gradientUnits
* 焦点位置
  * fx
  * fy
```svg
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad2" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
      <stop offset="0" stop-color="rgb(20,151,252)" />
      <stop offset="0.5" stop-color="rgb(164,105,190)" />
      <stop offset="1" stop-color="rgb(255,140,0)" />
    </radialGradient>
  </defs>
  <rect x="100" y="100" fill="url(#grad2)" width="200" height="200" />
  <circle cx="500" cy="200" r="100" fill="url(#grad3)" />
</svg>
```

### 笔刷
* 绘制纹理
* <pattern>标签
* patternUnits
* patternContentUnits
```svg
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="p1" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="5" fill="red"></circle>
      <polygon points="30 10 60 50 0 50" fill="green"></polygon>
    </pattern>
  </defs>
  <rect x="100" y="100" width="800" height="600" fill="url(#p1)" stroke="blue"></rect>
</svg>
```

## Path 教程
### Path 概述
* 强大的绘图工具
* 规范：http://www.w3.org/TR/SVG11/paths.html
* 由命令及其参数组组成的字符串

#### Path 字符串
```svg
<path d="M0,0L10,20C30-10,40,20,100,100" stroke="red" />
```
参数之间可以⽤空格或逗号隔开，有⼀种情况例外，就是下⼀个数值是负数

### Path 命令
| 命令 | 含义 |
|:---:|-----|
| M/m | (x,y)+ 移动当前位置 |
| L/l | (x,y)+ 从当前位置绘制线段到指定位置 |
| H/h | (x)+ 从当前位置绘制⽔平线到达指定的 x 坐标 |
| V/v | (x)+ 从当前位置绘制竖直线到达指定的 y 坐标 |
| Z/z | 闭合当前路径 |
| C/c | (x1,y1,x2,y2,x,y)+ 从当前位置绘制三次⻉塞尔曲线到指定位置 |
| S/s | (x2,y2,x,y)+ 从当前位置光滑绘制三次⻉塞尔曲线到指定位置 |
| Q/q | (x1,y1,x,y)+ 从当前位置绘制⼆次⻉塞尔曲线到指定位置 |
| T/t | (x,y)+ 从当前位置光滑绘制⼆次⻉塞尔曲线到指定位置 |
| A/a | (rx,ry,xr,laf,sf,x,y) 从当前位置绘制弧线到指定位置 |

* 命令基本规律
  * 区分大小写：大写表示坐标参数为绝对位置，小写则为相对位置
  * 最后的参数表示最终要到达的位置
  * 上一个命令结束的位置就是下一个命令开始的位置
  * 命令可以重复参数表示重复执行同一条命令

#### 移动和直线命令
* M (x, y)+ 移动画笔，后面如果有重复参数，会当做是 L 命令处理
* L (x, y)+ 绘制直线到指定位置
* H (x)+ 绘制水平线到指定的 x 位置
* V (y)+ 绘制竖直线到指定的 y 位置
* m、l、h、v 使用相对位置绘制

#### 弧线命令
* A(rx, ry, xr, laf, sf, x, y) - 绘制弧线
* 最复杂的命令
  * rx - （radius-x）弧线所在椭圆的 x 半轴长
  * ry - （radius-y）弧线所在椭圆的 y 半轴长
  * xr - （xAxis-rotation）弧线所在椭圆的长轴角度
  * laf - （large-arc-flag）是否选择弧长较长的那一段弧
  * sf - （sweep-flag）是否选择逆时针方向的那一段弧
  * x, y - 弧的终点位置

#### 贝塞尔曲线命令
* 贝塞尔曲线（Bezier Curve）概念

##### 二次贝塞尔曲线
```svg
<path d="M x0 y0 Q x1 y1 x y" />
```
* (x0,y0)起始点
* (x1,y1)控制点
* (x,y)结束点

##### 三次贝塞尔曲线
```svg
<path d="M x0 y0 C x1 y1 x2 y2 x y" />
```
* (x0,y0)起始点
* (x1,y1)起始控制点
* (x2,y2)结束控制点
* (x,y)结束点

##### 光滑贝塞尔曲线
* T: Q(二次贝塞尔曲线)的光滑版本
  * C1是上一段曲线的控制点关于当前曲线起始点的镜像位置
* S: C(三次贝塞尔曲线) 的简化版本
  * C1是上一段曲线的控制点2关于当前曲线起始点的镜像位置

## SVG文本
###  <text>和<tspan>标签
* x 和 y 属性 - 定位标准
* dx 和 dy 属性 - 字形偏移，可以用数组定义
* style 属性 - 设置样式
```svg
<text x="100" y="100" dx="10 10 10 10 10" dy="10" style="font-size: 50px;">ABCDE</text>
```
```svg
<text x="20" y="20" style="font-size: 14px;">
<tspan fill="red">ABC</tspan><tspan stroke="green" stroke-width="2" fill="none">DE</tspan>
</text>
```

### 居中问题
* text-anchor - 水平居中属性
* dominant-baseline 属性（http://www.w3.org/TR/SVG/text.html#DominantBaselineProperty）

### <textpath> - 路径文本
* x、text-anchor 和 startOffset 属性
  * 确定排列起始位置
* dx, dy 属性
  * 切线和法线方向的偏移

### <a> - 超链接
* 可以添加到任意的图形上
* xlink:href 指定连接地址
* xlink:title 指定连接提示
* target 指定打开目标

## 图形的引用、裁切和蒙版
### <use> 引用
* xlink:href="#id"

### <clipPath> 裁切
* clip-path="url(#clip-id)"

### <mask> 蒙版
* mask="url(#mask-id)"

## SVG 动画
### 动画原理
### SMIL for SVG
* 参考资料
  * http://www.w3.org/TR/SVG/animate.html
  * http://www.zhangxinxu.com/wordpress/?p=4333
* 动画标签
  * <animate>、<animateTransform>、<animateMotion>...
* 动画元素、属性定位以及动画参数设置
  * attributeName、attributeType
  * from、to、dur、repeatCount、fill...
  * calcMode...

#### 定位动画目标
Internal Resource Identifier 定位:
```svg
<animate xlink:href="url(#rect1)">
</animate>
```
被包含在目标元素里
```svg
<rect x="0">
 <animate></animate>
</rect>
```

#### 基本动画
设置要进行动画的属性以及变化范围、时间长度
```svg
<animate xlink:href="url(#rect1)"
  attributeType="XML"
  attributeName="x"
  from="10"
  to="110"
  dur="3s"
  fill="freeze"
  repeatCount="indefinite">
</animate>
```

#### 变换动画
设置要进行动画的属性以及变化范围、时间长度
```svg
<animateTransform xlink:href="url(#rect1)"
  attributeName="transform"
  attributeType="XML"
  type="translate"
  from="0 0"
  to="100 100"
  dur="3s">
</animateTransform>
```

#### 轨迹移动
设置轨迹路径
```svg
<animateMotion xlink:href="url(#rect1)"
  path="M0,0h100v100h-100v-100z"
  rotate="auto"
  dur="3s">
</animateMotion>
```

### 脚本动画
* 核心思想
  * requestAnimationFrame(update)
