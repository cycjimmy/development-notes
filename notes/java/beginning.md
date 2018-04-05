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

