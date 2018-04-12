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

