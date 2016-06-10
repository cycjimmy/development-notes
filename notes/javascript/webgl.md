# WebGL

> WebGL是基于OpenGL ES2.0的Web标准，
> 可以用过HTML5 Canvas元素作为DOM接口访问

## 诞生背景
1. Java applets (Java OpenGl)
2. Adobe Flash (Flash 3D, Stage 3D)
3. Canvas 3D (2006)
4. WebGL (2011.03)

## WebGL的优点
* 无需依赖第三方插件
* 跨平台
* 底层硬件加速

## 应用场景
* 游戏
* 数据可视化
* 增强网页效果
* 3D建模
* 数学绘图
* 物理仿真
* ......

## WebGL第三方库
* Three.js
* SceneJS
* BabylonJS
* GLGE
* PhiloGL
* QTEK
* ......

## WebGL相关概念
* 照相机

	> 照相机定义了三维空间到二维屏幕的投影方式
	
	* 透视投影
	* 正交投影
	
* 3D对象
	* 图形（正方体、球体、环形、多面体...）
	* 文字
	* **粒子系统**
	* **外部模型**
* 材质、纹理、光源
	* 材质
		* 基本材质(BasicMaterial) 
		
			> 不会对光源做出反应的材质
			
		* Lambert材质(MeshLambertMaterial) 

			> 对应一种着色模型，有漫反射的特性
		
		* Phong材质(MeshPhongMaterial)

			> 兼顾了漫反射和镜面反射的特性
		
	* 纹理
		* 颜色贴图 
		* 法线贴图
		* 高光贴图
	* 光源
		* 环境光
		* 点光源
		* 平行光
		* 聚光灯(一种特殊的点光源)
* 动画
	* 逐帧动画
	
	* 补间动画
		* tween.js 

	* 关节动画
	
		> 通过构建层级让独自的局部分别运动，
		> 最终组成整体运动的动画技术
	
	* 材质、光源动画
	* 纹理动画
		* 纹理坐标变换
		* 程序贴图(基于着色器)
	* 蒙皮动画

		> 蒙皮动画专注于网格顶点的变形，
		> 把模型绑定到骨骼上的技术叫做蒙皮动画
	
* 交互 
	* 点击检测、拾取
	* 鼠标移入、点击
	* 处理拖拽
	* 基于相机的交互

## WebGL学习路径
* 《WebGL入门指南》
* 《Three.js入门指南》
* [https://github.com/mrdoob/three.js](https://github.com/mrdoob/three.js)
* [https://www.reddit.com/r/threejs](https://www.reddit.com/r/threejs)
* [http://learningthreejs.com](http://learningthreejs.com)


