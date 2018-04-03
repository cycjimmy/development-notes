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
