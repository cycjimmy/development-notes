# Java Beginning

## 开发环境搭建
1. 安装JDK([下载](http://www.oracle.com/technetwork/java/javase/downloads/index.html))
2. 配置环境变量(计算机属性 -> 高级系统设置 -> 环境变量 -> 系统变量)
  * `JAVA_HOME`: 配置JDK安装路径
  * `PATH`: 配置JDK命令文件的位置
  * `CLASSPATH`: 配置类库文件的位置
3. 验证
```shell
$ java
$ javac
```

## 编写一个HelloWorld
* 编辑.java源文件
```java HelloWorld.java
public class HelloWorld {
  public static void main(String[] args){
    System.out.println("Hello World!");
  }
}
```
* compiler编译器: 使用javac命令编译成字节码文件(.class)
```shell
$ javac HelloWorld.java
```
* interpreter解释器: 使用java命令
```shell
$ java HelloWorld
```

## 变量与数据类型
### 变量
(略)

### 包装类
* 常用包装类常量和方法
  * `Integer.MIN_VALUE`: int类型最小值 `-2^31`
  * `Integer.MAX_VALUE`: int类型最大值 `2^31 - 1`
  * `int Integer.parseInt(String sInteger)`: 将字符串类型的整数转换为int类型的数据
  * `String Integer.toBinaryString(int value)`: 将十进制转化为二进制，返回结果 `String` 类型
  * `String Integer.toHexString(int value)`: 将十进制转化为十六进制，返回结果 `String` 类型
  * ...

### 二进制补码
* 计算机中正数与负数的关系的取反加1
* 补码运算是封闭的，运算结果保留在补码范围之内，超范围就溢出
* 4位二进制补码最多能表示2^4(16)个数，数的范围是-8~7
* 8位二进制补码最多能表示2^8(256)个数，数的范围是-128~127
* 16位二进制补码最多能表示2^16(65536)个数，数的范围是-32768~32767
* 32位二进制补码最多能表示2^32个数，数的范围是-2^31~2^31-1

### 整数类型
* Java有四种整数类型：byte、short、int、long
* Java默认整数计算结果是int类型
* 整数的字面量是int类型
* 若字面量超过int类型的最大值，则字面量是long类型，后面要用l表示该值是long类型
* Java底层byte和short按照32位(int类型)计算

### 浮点类型
* Java的浮点类型有float和double两种
* Java默认浮点类型计算结果是double类型，字面量也是double类型
* 若要给float类型的变量赋字面量的值，则要在字面量后加f
* float类型
  * float类型共32位，1位为符号位，指数8位，尾数23位。
  * float的精度是23位，超过则被截取
  * float存储数据的范围大于int类型，但精度比int小
* double类型
  * 1位符号位，11位指数，52位尾数
  * double存储数据的范围大于long类型，但精度比long小

### 字符类型
* char类型的字面量可以是一个英文字母，字符或一个汉字，并且由单引号包括
* Java底层使用一个16位的整数来处理字符类型，该数值是一个字符的unicode编码值。
* 转义符
  * 转义字符是 `\`，通过转义字符，可表示一些特殊的字符。
    * `\n`: 回车
    * `\n`: 制表位字符
    * `\\`: 表示`\`
    * `\'`: 表示`'`
    * `\"`: 表示`"`
    * `\u4e2d`: 表示unicode编码对应的字符(汉字：中)

### 布尔类型
* boolean类型用来表示肯定或否定两种可能
* 常用在分支语句、循环语句中

## Scanner类
* Scanner类用于扫描从控制台输入的数据，可以接收字符串和基本数据类型的数据
* Scanner类位于 `java.util.Scanner` 包中
* 常用方法：
  * `String next()`: 接收控制台输入的一个字符串
  * `String nextLine()`: 接收控制台输入的一个字符串
  * `int nexInt()`: 接收控制台输入的一个int类型的数据
  * `double nextDouble()`: 接收控制台输入的一个double类型的数据
  * `boolean nextBoolean()`: 接收控制台输入的一个boolean类型的数据

## 面向对象
### 封装
* 步骤
  * 修改属性的可见值 `private`
  * 创建 `getter` / `setter` 方法，用于属性的读写
  * 在 `getter` / `setter` 方法中加入属性控制语句，对属性值的合法性进行判断

### 继承
```java
class Dog extends Animal {
  ...
}
```

### 多态
* 引用的多态
  * 父类的引用可以指向本类的对象
  * 父类的引用可以指向子类的对象
* 方法的多态
  * 创建本类对象时，调用的方法为本类方法
  * 创建子类对象时，调用的方法为子类重写的方法或者继承的方法

## UML
Unified Modeling Language 又称统一建模语言或标准建模语言。是一个支持模型化和软件系统开发的图形化语言，为软件开发的所有阶段提供模型化和可视化支持

### 常用UML图
#### The Use Case Diagram 用例图
用例图能够以可视化的方式，表达系统如何满足所收集的业务规则，以及特定的用户需求等信息。

#### The Sequence Diagram 序列图
序列图用于按照交互发生的一系列顺序，显示对象之间的这些交互。


#### The Class Diagram 类图
类图、业务逻辑和所有支持结构一同被用于定义全部的代码结构。

### UML建模工具
* Microsoft Office Visio
* Rational Rose
* PowerDesign

## 集合
数组长度固定，集合长度可变。集合可以通过任意类型查找所映射的具体对象。

* `Collection`
  * `List`
    * `ArrayList`
    * `LinkedList`
  * `Queue`
    * `LinkedList`
  * `Set`
    * `HashSet`
* `Map` -> Entry类<Key,Value>键值对
  * `HashMap`

### (Collection接口)[https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html]

#### List接口及其实现类——ArrayList
* List是元素有序并且可以重复的集合，被称为序列
* List可以精确的控制每个元素的插入位置，或删除某个位置元素
* ArrayList——数组序列，是List的一个重要实现类
* ArrayList底层是由数组实现的

#### 泛型
* 集合中的元素，可以是任意类型的对象(对象的引用)
  * 如果把某个对象放入集合，则会忽略它的类型，而把他当作Object处理。
* 泛型则是规定了某个集合只可以存放特定类型的对象
  * 会在编译期间进行类型检查
  * 可以直接按指定类型获取集合元素
  * 泛型不能是基本类型，可以使用包装类型

#### Set接口及其实现类——HashSet
* Set是元素**无序**并且**不可重复**的集合，被称为集
* HashSet——哈希集，是Set的一个重要实现类

### Map接口
* Map提供了一种映射关系，其中的元素是以键值对(key-value)的形式储存的，能够实现根据key快速查找value
* Map中的键值对以Entry类型的对象实例形式存在
* 键(key值)不可重复，value值可以，每个键最多只能映射到一个值
* Map接口提供了分别返回key值集合、value值集合以及Entry(键值对)集合的方法
* Map支持泛型，形势如：Map\<K,V\>

#### HashMap类
* HashMap 是Map的一个重要实现类，也是最常用的，基于哈希表实现
* HashMap 中的 Entry 对象是无序排列的
* Key 值和 value 值都可以为`null`，但一个 HashMap 只能有一个 key 值为 `null` 的映射( key 值不可重复)

### `Comparable` 和 `Comparator`
* `Comparable` 接口 —— 可比较的
  * 实现该接口表示：这个类的实例可以比较大小，可以进行自然排序(`Collections.sort()`)
  * 定义了默认的比较规则
  * 其实现类需实现 `compareTo()` 方法
  * `compareTo()` 方法返回正数表示大，负数表示小，`0` 表示相等
* `Comparator` 接口 —— 比较工具接口
  * 用于定义**临时**比较规则，而不是默认比较规则
  * 其实现类需要实现 `compare()` 方法
  * `Comparator` 和 `Comparable` 都是 Java 集合框架的成员

