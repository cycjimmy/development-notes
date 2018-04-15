# Android Beginning

## 环境搭建
* 工具
  * [Android Studio](../code_editor/Android_Studio.md)

## 控件
### `TextView` 显示文本框
* properties:
  * `android:id`
  * `android:layout_width`
    * Value:
      * `wrap_content`: 包裹实际文本内容
      * `match_parent`: 当前控件铺满父类容器
  * `android:layout_height`
  * `android:text`
  * `android:textSize`
  * `android:textColor`
  * `android:background`


### `EditText` 输入文本框
* properties:
  * `android:hint`         输入提示文本
  * `android:inputType`    类型
  * ... (与 `TextView` 类似)

### `ImageView` 显示图片
* properties:
  * `android:src`: 内容图片
  * `android:background` 背景图片/颜色
  * ...

### `Button` 按钮
* properties:
  * `android:text`: 内容文字
  * ...
* events (常用):
  * `onclick`事件(所有控件通用): 通过自身的 ``.setOnClickListener` (`OnClickListener`)方法添加

#### 监听事件实现的几种写法
1. 匿名内部类
2. 独立类
3. 实现接口的方式

### `ImageButton` 图片按钮
* properties:
  * `android:src`: 内容图片
  * ...

### `AutoCompleteTextView` 动态匹配输入内容的文本框
* properties:
  * `android:completionThreshold`: 设置输入多少字符时自动匹配
  * ...

### `AutoCompleteTextView` 动态匹配输入内容的文本框，支持选择多个值，用分隔符分开
* properties:
  * `android:completionThreshold`: 设置输入多少字符时自动匹配
  * ...
* 设置分隔符
  * `multiAutoCompleteTextView.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer())`

### `ToggleButton` 有选中状态和非选中状态，不同状态显示不同文本
* properties:
  * `android:checked`: 设置是否选中
  * `android:textOff`: 设置非选中状态的文字
  * `android:textOn`: 设置选中状态的文字
  * ...

### `CheckBox` 复选框，有选中状态和非选中状态
* properties:
  * `android:checked`: 是否被选中
  * `android:text`: 设置文本内容
  * ...

### `RadioGroup`和`RadioButton`
`RadioGroup` 是 `RadioButton` 的一个集合，提供多选一的机制

* `RadioGroup` properties:
  * `android:orientation`: 设定`RadioButton`以什么形式排布
    * `vertical`: 垂直排布
    * `horizontal`: 水平排布
  * ...

## 布局
### 线性布局(LinearLayout)
包含的子控件将以横向或纵向排列

* `LinearLayout` properties:
  * `android:orientation`: 决定子类控件的排布形式
    * `vertical`: 垂直排布
    * `horizontal`: 水平排布
  * `android:gravity`: 决定子类控件的位置
    * `center_vertical`: 垂直(Y轴)居中
    * `center_horizontal`: 水平(X轴)居中
    * `center`: 水平垂直居中
    * `right`: 子类控件位于当前布局的右边
    * `left`: 子类控件位于当前布局的左边
    * `bottom`: 子类控件位于当前布局的下面
  * ...
* `LinearLayout`的子类控件 properties:
  * `android:layout_gravity`: 决定控件本身的位置
    * ...(与 `android:gravity` 类似)
  * `android:layout_weight`: 控件本身占当前父容器的比例
  * ...

### 相对布局(RelativeLayout)
包含的子控件将以控件之间的相对位置，或者子类控件相对父容器的位置的方式排列

* `RelativeLayout`的子类控件 properties(相对父容器):
  * `android:layout_alignParentLeft`: 子类控件相对当前父类容器靠左边
  * `android:layout_alignParentTop`: 子类控件相对父类容器靠上边
  * `android:layout_marginLeft`: 子类控件距离父类容器左边的距离
  * `android:layout_marginTop`: 子类控件距离父类容器上边的距离
  * `android:layout_centerInParent`: 子类控件相对父类容器水平垂直居中
  * `android:layout_centerHorizontal`: 子类控件相对父类容器水平居中
  * `android:layout_centerVertical`: 子类控件相对父类容器垂直居中
* 子类控件相对子类控件 properties:
  * `android:layout_above`: 该控件位于给定(id)控件的上面
  * `android:layout_below`: 该控件位于给定(id)控件的底部
  * `android:layout_toLeftOf`: 该控件位于给定(id)控件的左边
  * `android:layout_toRightOf`: 该控件位于给定(id)控件的右边
  * `android:layout_alignBaseline`: 该控件的内容与给定(id)控件的内容在一条线上
  * `android:layout_alignTop`: 该控件的顶部边缘与给定(id)控件的顶部边缘对齐
  * `android:layout_alignBottom`: 该控件的底部边缘与给定(id)控件的底部边缘对齐
  * `android:layout_alignLeft`: 该控件的左边缘与给定(id)控件的左边缘对齐
  * `android:layout_alignRight`: 该控件的右边缘与给定(id)控件的右边缘对齐

### 帧布局(FrameLayout)
所有子元素都不能被指定放置位置，他们统统放于这块区域的左上角，并且后面的子元素直接覆盖在前面的子元素之上，将前面的子元素部分和全部遮挡。

### 绝对布局(AbsoluteLayout)
有可以叫做坐标布局，可以直接指定子元素的绝对位置(xy)。使用绝对定位的适应性会比较差，在屏幕的适配上有缺陷。

### 表格布局(TableLayout)
表格布局模型以行列的形式管理子控件，每一行为一个TableRow的对象，当然也可以是一个View的对象。

* `TableLayout` properties:
  * `android:collapseColumns`: 隐藏从0开始的引索列。列直接必须用逗号隔开，如`1, 2, 5`。
  * `android:shrinkColumns`: 收缩从0开始的引索列。当可收缩的列太宽（内容太多）不会被挤出屏幕，列直接必须用逗号隔开，如`1, 2, 5`，可以通过 `*` 代替收缩所有列。注意：一列能同时表示收缩和拉伸。
  * `android:stretchColumns`: 拉伸从0开始的引索列。以填满剩下的多余空白空间，列直接必须用逗号隔开，如`1, 2, 5`，可以通过 `*` 代替拉伸所有列。注意：一列能同时表示收缩和拉伸。
* `TableLayout` 的子类控件 properties:
  * `android:layout_column`: 该控件显示在第几列。例如：`"1"`表示第2列
  * `android:layout_span`: 该控件占据几列。例如：`"2"`表示占据第2列

## Activity
### 概念
Activity是一个应用程序组件，提供用户与程序交互的界面。

* Android四大组件：
  * Activity
  * Service
  * BroadcastReceiver
  * Content Provider

### Activity 如何创建使用
* 继承 Android 的 Activity 类
* 重写方法
* 设置显示布局
* 在 AndroidManifest 文件中，注册 Activity

### Activity 的生命周期
* 生命周期函数
  * `onCreate()`: 创建
  * `onStart()`: 运行
  * `onPostResume()`: 获取焦点
  * `onPause()`: 失去焦点
  * `onStop()`: 暂停
  * `onDestroy()`: 销毁
  * `onRestart()`: 重启
* Activity 的四种状态
  * 活动状态(Active/Running) Activity 处于页面最顶端获取焦点
  * 暂停状态(Paused) Activity 失去焦点，但对用户可见
  * 停止状态(Stopped) Activity 被完全遮挡，但保留所有状态和成员信息
  * 非活动状态(killed) Activity 被停止

## Intent 页面跳转
Intent可以理解为信使(意图)，由Intent来协助完成Android各个组件之间的通信

### Intent 实现页面之间跳转的2种方式
* `startActivity(intent)`： 无返回结果的跳转
* `startActivityForResult(intent, requestCode)`： 有返回结果的跳转
  * `onActivityResult(int requestCode, int resultCode, Intent data)`
  * `setResult(resultCode, data)`

