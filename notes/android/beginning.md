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

