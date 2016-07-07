# JavaScript高级程序设计(第三版)

## 前言
最近研究了很多流行的框架angularJS、React，也开始运用npm来管理项目，优化代码……

虽然正在追赶不断发展的前端脚步，知识在不断膨胀，但是半路出家的我，感觉追的越来越艰难了。

所以决定暂时放下手上正在研究的众多时髦的框架，回来再补一遍JS基础，当然选的还是这本《JavaScript高级程序设计》，原因大家应该都懂。同时做一点小笔记，当然不会太详细，毕竟我本身也是一个懒人_(:з」∠)_

***
## 1 JS简介

## 2 在html中使用JS

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Example HTML Page</title>
    </head>
    <body>
        <!-- 这里放内容 -->
        <script defer="defer" src="example1.js"></script>
        <script async src="example2.js"></script>
    </body>
</html>
```

script标签属性defer和async只适用于外部脚本：defer表示延迟，async表示异步

## 3 基本概念

### 3.1 语法（严格模式）
ECMAScript5引入了严格模式(strict mode)的概念。在严格模式下，ECMAScript3中的一些不确定的行为将得到处理，而且对某些不安全的操作也会抛出错误。要在整个脚本中启用严格模式，可以在顶部添加如下代码：

```javascript
'use strict';
```

### 3.2 关键字保留字（略）

### 3.3 变量声明
**使用`var`操作符定义的变量，将成为定义该变量的作用域中的局部变量。**

如果在函数中使用`var`定义一个变量，那么这个变量在函数退出后就会被销毁，例如：

```javascript
function test () {
    var message = 'hi'; //局部变量
}
test();
alert(message); //错误！
```

如果省略`var`操作符，message就成了全局变量。这样，只要调用过一次`test()`函 数，这个变量就有了定义，就可以在函数外部的任何地方被访问到。但不推荐，导致变量难维护。

给未经声明的变量赋住在**严格模式** 下会抛出**ReferenceError**错误。

### 3.4 数据类型
* undefined
    * 在使用`var`声明变量但未对其加以初始化时
* null
    * 特殊的object对象
    * 如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null
* boolean
    * 可以对任何数据类型的值调用`Boolean()`函数,返回的值是true还是false，取决于要转换值的数据类型及其实际值。下表给出了各种数据类型及其对应的转换规则。

        | 数据类型 | 转换为true的值 | 转换为false的值 |
        |:------:|:------:|:------:|
        | Boolean | true | false |
        | String | 任何非空字符串 | 空字符串 |
        | Number | 任何非零数字（包括无穷大） | 0和NaN |
        | Object | 任何对象 | null |
        | Undefined | n/a | undefined |
* number
    * 浮点数值的最高精度是17位小数，但在进行算术计算时其精确度远远不如整数。例如，0.1加0.2的结果不是0.3，而是0.300000000000000004
    * `parseInt()`
        * 为了消除在使用`parseInt()`函数时可能导致的困惑，可以为这个函数提供第二个参数：转换时使用的基数（即多少进制）
        * 多数情况下，我们要解析的都是十进制数，因此始终将**10**作为第二个参数是非常必要的
* string
* object
    * Object的每个实例都具有下列属性和方法:
        * `Constructor`: 保存着用于创建当前对象的函数。
        * `hasOwnProperty(propertyName)`: 用于检查给定的属性在当前对象实例中（而不是在实例的原型中）是否存在。其中，作为参数的属性名（propertyName）必须以字符串形式指定（例如：`o.hasOwnProperty('name')`）。
        * `isPrototypeOf(object)`: 用于检查传入的对象是否是另一个对象的原型
        * `propertyIsEnumerable(propertyName)`: 用于检查给定的属性是否能够使用for-in语句来枚举，与`hasOwnProperty()`方法一样，作为参数的属性名必须以字符串形式指定。
        * `toLocaleString()`: 返回对象的字符串表示，该字符串与执行环境的地区对应
        * `toString()`: 返回对象的字符串表示
        * `valueOf()`: 返回对象的字符串、数值或布尔值表示。通常与`toString()`方法的返回值相同。

### 3.5 操作符
#### 3.5.1 一元操作符（略）
#### 3.5.2 位操作符
* ECMAScript中的所有数值都以IEEE-954 64位格式存储，但位操作符并不直接操作64位的值。而是先将64位的值转换成32位的整数，然后执行操作，最后再将结果转换回64位。对于开发人员来说，由于64位存储格式是透明的，因此整个过程就像是只存在32位的整数一样。
* 按位非(NOT)
    * 按位非操作符由一个波浪钱`~`表示，执行按位非的结果就是返回数值的反码。

        ```javascript
        var num1 = 25;    //二进制00000000000000000000000000011001
        var num2 = ~num1; //二进制11111111111111111111111111100110
        alert(num2);      //-26
        ```

* 按位与(AND)
    * 按位与操作符由一个和号字符`&`表示，它有两个操作符数 。从本质上讲，按位与操作就是将两个数值的每一位对齐，然后根据下表中的规则，对相同位置上的两个数执行AND操作：按位与操作只在两个数值的对应位都是1时才返回1

        | 第一个数值的位 | 第二个数值的位 | 结果 |
        |:------:|:------:|:------:|
        | 1 | 1 | 1 |
        | 1 | 0 | 0 |
        | 0 | 1 | 0 |
        | 0 | 0 | 0 |

        ```javascript
        var result = 25 & 3;
        alert(result); //1
        ```

* 按位或(OR)
    * 按位或操作符由一个坚线符号`|`表示，同样也有两个操作数,按位或操作在有一个位是1的情况下就返回1

        | 第一个数值的位 | 第二个数值的位 | 结果 |
        |:------:|:------:|:------:|
        | 1 | 1 | 1 |
        | 1 | 0 | 1 |
        | 0 | 1 | 1 |
        | 0 | 0 | 0 |

* 按位异或（XOR）
    * 按位异或操作符由一个插入符号`^`表示，也有两个操作数，以下是按位异或的真值表。

        | 第一个数值的位 | 第二个数值的位 | 结果 |
        |:------:|:------:|:------:|
        | 1 | 1 | 0 |
        | 1 | 0 | 1 |
        | 0 | 1 | 1 |
        | 0 | 0 | 0 |

* 左移
    * 左移操作符由两个小于号`<<`表示，这个操作符会将数值的所有位向左移动指定的位数。

        ```javascript
        var oldValue = 2;                //等于二进制的10
        var newValue = oldValue << 5;    //等于二进制的1000000，十进制的64
        ```

* 有符号的右移
    * 有符号的右移操作符由两个大于号`>>`表示，这个操作符会将数值向右移动，但保留符号位(即正负号标记)，有符号的右移操作与左移操作恰好相反。

* 无符号的右移
    * 无符号的右移操作符由3个大于号`>>>`表示，这个操作符会将数值的所有32位都向右移动
    * 对正数来说，无符号的右移的结果与有符号的右移相同
    * 对负数来说，结果相差非常大

#### 3.5.3 布尔操作符
* 逻辑非
    * 逻辑非操作符由一个叹号`!`表示，可以应用于ECMAScript中的任何值。
    * 逻辑非操作符遵循下列规则：
        * 如果操作数是一个对象，返回false
        * 如果操作数是一个空字符串，返回true
        * 如果操作数是一个非空字符串，返回false
        * 如果操作数是数值0，返回true
        * 如果操作数是任意非0数值(包括Infinity)，返回false
        * 如果操作数是null，返回true
        * 如果操作数是NaN，返回true
        * 如果操作数是undefined，返回true
* 逻辑与
    * 逻辑与操作符由两个和号`&&`表示，有两个操作数，逻辑与的真值表如下：

        | 第一个操作数 | 第二个操作数 | 结果 |
        |:------:|:------:|:------:|
        | true | true | true |
        | true | false | false |
        | false | true | false |
        | false | false | false |

    * 逻辑与操作可以应用于任何类型的操作数，而不仅仅是布尔值。在有一个操作数不是布尔值的情况下， 逻辑与操作就不一定返回布尔值，此时，它遵循下列规则：
        * 如果第一个操作数是对象，则返回第二个操作数
        * 如果第二个操作数是对象，则只有在第一个操作数的求值结果为true的情况下才会返回该对象
        * 如果两个操作数都是对象，则返回第二个操作数
        * 如果有一个操作数是null，则返回null
        * 如果有一个操作数是NaN， 则返回NaN
        * 如果有一个操作数是undefined，则返回undefined
    * 逻辑与操作属于短路操作，即如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值
* 逻辑或
    * 逻辑或操作符由两个竖线符号`||`表示，有两个操作数，逻辑或的真值表如下：

        | 第一个操作数 | 第二个操作数 | 结果 |
        |:------:|:------:|:------:|
        | true | true | true |
        | true | false | true |
        | false | true | true |
        | false | false | false |

    * 如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值，此时，它遵循下列规则：
        * 如果第一个操作数是对象，则返回第一个操作数
        * 如果第一个操作数的求值结果为false，则返回第二个操作数
        * 如果两个操作数都是对象，则返回第一个操作数
        * 如果两个操作数都是null，则返回null
        * 如果两个操作数都是NaN， 则返回NaN
        * 如果两个操作数都是undefined，则返回undefined
    * 逻缉或操作符也是短路操作符，即第一个操作数的求值结果为true，就不会对第二个操作数求值

#### 3.5.4 乘性操作符（略）
#### 3.5.5 加性操作符（略）
#### 3.5.6 关系操作符（略）
#### 3.5.7 相等操作符
* 由于相等`==`和不相等`!=`操作符存在类型转换问题，而为了保持代码中数据类型的完整性，推荐使用全等`===`和不全等`!==`操作符

#### 3.5.8 条件操作符

```
variable= boolean_express1on ? true_value : false_value
```

这行代码的含义就是基于对boolean_expression求值的结果，结果为true，则给变量variable赋true_value的值，如果求值结果为false,则给变量variable赋false_value值

#### 3.5.9 赋值操作符（略）
#### 3.5.10 逗号操作符
* 逗号操作符多用于声明多个变量
* 逗号操作符还可以用于赋值，逗号操作符总会返回表达式中的最后一项

    ```javascript
    var num1 = 1, num2 = 2, num3 = 3;
    var num = (5, 1, 4, 8, 0);  //num的值为0
    ```

### 3.6 语句
#### 3.6.1 if语句（略）
#### 3.6.2 do-while语句（略）
#### 3.6.3 while语句（略）
#### 3.6.4 for语句（略）
#### 3.6.5 for-in语句
* for-in语句是一种精准的迭代语句，可以用来枚举对象的属性。以下是for-in语句的语法：

    ```
    for (property in expression) statement
    ```

    ```javascript
    //使用for-in循环来显示BOM中window对象的所有属性
    for (var propName in window) {
    document.write(propName);
    }
    ```

* ECMAScript对象的属性没有顺序，通过for-in循环输出的属性名的顺序是不可预测的
* 如果表示要迭代的对象的变量值为null或undefined,for-in语句会抛出错误。ECMAScript5更正了这一行为：对这种情况不再抛出错误，而只是不执行循环体。为了保证最大限度的兼容性，建议在使用for-in循环之前，先检测确认该对象的值不是null或undefined。
#### 3.6.6 label语句
* 使用label语句可以在代码中添加标签，以便将来使用。以下是label语句的语法：

    ```
    label: statement
    ```

* 定义的label语句可以在由break或continue语句引用
* 加标签的语句一般都与for语句等循环语句配合使用

#### 3.6.7 break和continue语句
* break和continue语句用于在循环中精确地控制代码的执行
    * break语句会立即退出循环，强制继续执行循环后面的语句
    * continue语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行
* break和continue语句和label语句联合使用

    ```javascript
    var num = 0;
    outermost: for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (i == 5 && j == 5) {
                break outermost;
            }
            num++;
        }
    }
    alert(num);  //55
    ```

    在这个例子中， outermost标签表示外部的for语句。如果每个循环正常执行10次， 则num++语句就会正常执行100次。num的值应该是100。但内部循环中的break语句带了一个参数(要返回到的标签),添加这个标签的结果将导致break语句不仅会退出内部的for语句（即使用变量j的循环），而且也会退出外部的for语句（即使用变量i的循环）。为此，当变量i和j都等于5时，num的值正好是55。同样，continue语句也可以像这样与label语句联用。

* 联用break、continue和label语句能够执行复杂的操作，但如果使用过度，也会给调试带来麻烦。建议如果使用label语句，一定要使用**描述性**的标签，同时不要嵌套过多的循环。

#### 3.6.8 with语句
* 在开发大型应用程序时，不建议使用with语句。
#### 3.6.9 switch语句（略）

### 3.7 函数
* 返回值
    * 要么让函数始终都返回一个值，要么永远都不要返回值，否则会给调试代码带来不便
* 严格模式对函数有一些限制：
    * 不能把函数命名为eval或arguments
    * 不能把参数命名为eval或arguments
    * 不能出现两个命名参数同名的情况

## 4 变量、作用域和内存问题
### 4.1 基本类型和引用类型的值
* 5种基本数据类型（Undefined、Null、Boolean、Number、String）是按值访问的，可以操作保存在变量中的实际的值
* 引用类型的值是保存在内存中的对象，保存在推内存中，是按引目访问的
* 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针
* 动态的属性
    * 可以给一个引用类型的值增加属性
    * 无法给基本类型的值添加属性
* 复制变量值
    * 从一个变量向另一个变量复制基本类型的值，会在变量对象上创建一个新值，然后把该值复制到新变量的位置上，这两个变量可以参与任何操作而不会相互影响
    * 从一个变量向另一个变量复制引用类型的值时，同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中，这个值的副本实际上是一个指针，指向存储在堆中的同一个对象，改变一个变量，会影响到另一个变量
* 传递参数
    * ECMAScript中所有函数的参数都是按值传递的（把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样）
        * 向参数传递基本类型的值时，被传递的值会被复制给一个局部变量(即命名参数)
        * 向参数传递引用类型的值时，会把这个值在内存中的地址复制给一个局部变量，因此这个局部变量的变化会反映在函数的外部
* 检测类型
    * 确定一个值是哪种基本类型可以使用typeof操作符
    * 确定一个值是哪种引用类型可以使用instanceof操作符，其语法如下所示：

        ```
        result = variable instanceof constructor
        ```

        如果变量是给定引用类型（根据它的原裂链来识别）的实例，那么 instanceof操作符就会返回true，例如：

        ```javascript
        alert(person instanceof Object);   //变量person是Object吗？
        alert(colors instanceof Array);    //变量colors是Array吗？
        alert(pattern instanceof RegExp);  //变量pattern是RegExp吗？
        ```

### 4.2 执行环境及作用域
* 执行环境（execution context）
    * 每个执行环镜都有一个与之关联的变量对象（variable object），保存了该环绕中定义的所有变量和函数
    * 每个函数都有自己的执行环境，当执行流进入一个函数时．函数的环境就会被推入一个环境栈中，而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境
* 作用域链（scope chain）
    * 当代码在一个环境中执行时，会创建变量对象的一个作用域链
    * 作用域链保证对执行环境有权访问的所有变量和函数有序的访问
    * 作用域链的前端，始终都是当前执行的代码所在环境的变量对象
    * 作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境
    * 全局执行环境的变量对象始终都是作用域链中的最后一个对象
* JavaScript没有块级作用域，作用域用ECMAScript的话来讲，就是它们自己的执行环境
    * if语句、for语句等，变量声明会将变量添加到当前的执行环境中，而不是只存在if执行体或者for的循环体中。
    * 声明变量
        * 使用var声明的变量会自动被添加到最接近的环境中
    * 查询标识符
        * 当在某个环境中为了读取或写入而引用一个标识符时，必须通过搜索来确定该标识符实际代表什么
        * 搜索过程从作用域链的前端开始，向上逐级查询与给定名字匹配的标识符。

            ```javascript
            var color= 'blue';
            function getColor () {
                var color = 'red';
                return color;
            }
            alert(getColor());       //'red'
            ```

* 变量的执行环境有助于确定应该何时释放内存

### 4.3 垃圾收集
> JavaScript具有自动垃圾收集机制，执行环境会负责管理代码执行过程中使用的内存（离开作用域的值将被自动标记为可以回收，将在垃圾收集期间被删除），开发人员一般不必操心内存管理的问题，但是系统分配给Web浏览器的可用内存数量通常要比分配给桌面应用程序的少（防止运行JavaScript的网页耗尽全部系统内存而导致系统崩溃），所以应该确保占用最少的内存可以让页面获得更好的性能。

* **优化内存占用的最佳方式：为执行中的代码只保存必畏的数据**
    * 解除引用（dereferencing）:为了确保有效地回收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用
        * 一旦数据不再有用，通过将其值设置为null来释放其引用
        * 适用于大多数全局变量和全局对象的属性
        * 局部变量会在它们离开执行环境时自动被解除引用

## 5 引用类型
### 5.1 Object类型
* 主要用来存储和传输数据

### 5.2 Array类型
> ECMAScript数组的每一项可以保存任何类型的数据，大小是可以动态调整

#### 5.2.1 检测数组
* `Array.isArray()`

#### 5.2.2 转换方法
* `toLocaleString()`
* `toString()`
* `valueOf()`

#### 5.2.3 栈方法
* 栈是一种LIFO(Last-In-First-Out 后进先出）的数据结构
* 栈中项的插入和移除，只发生在栈的顶部
* ECMAScript为数组专门提供了`push()`和`pop()`方法，以便实现类似栈的行为
    * `push()`方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度
    * `pop()`方法从数组末尾移除最后一项，减少数组的length值，然后返回移除的项

#### 5.2.4 队列方法
* 队列数据结构的访问规则是FIFO(First-In-First-Out 先进先出）
* 队列在列表的末端添加项，从列表的前端移除项
* 实现这一操作的数组方法是结合`push()`和`shift()`
    * `push()`方法在上面栈方法已经讲过
    * `shift()`方法移除数组中的第一个项并返回该项，同时将数组长度减1
* ECMAScript还为数组提供了一个`unshift()`方法，在数组前端添加任意个项并返回新数组的长度

#### 5.2.5 重排序方法
*  `reverse()`方法反转数组项的顺序
*  `sort()`方法按各项**字符串**升序排列数组项，即使各项都是数值，也并不是按照实际数值大小进行排列
* 但可以给`sort()`方法传一个比较参数（不转化为字符串排序）

    ```javascript
    //设定一个比较函数
    function compare (value1, value2) {
        if (value1 < value2) {
          return -1;
        } else if (value1 > value2) {
          return 1;
        } else {
          return 0;
        }
    }

    var values = [10, 1, 5, 10, 15];
    values.sort(compare);                 //将比较函数以参数形式传给sort方法
    alert(values);                        //0,1,5,10,15
    ```

#### 5.2.6 操作方法
* `concat()`方法先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组
* `slice()`方法基于当前数组中的一个或多个项创建一个新数组
    * 可以接受一个或两个参数，即要返回项的起始和结束位置。
    * 在只有一个参数的情况下，方法返回从该参数指定位置开始到当前数组末尾的所有项
    * 如果有两个参数，返回起始和结束位置之间的项（不包括结束位置的项）

        ```javascript
        var colors = ['red', 'green', 'blue', 'yellow', 'purple'];
        var colors2 = colors.slice(1);
        var colors3 = colors.slice(1,4);
        alert(colors2);      //green,blue,yellow,purple
        alert(colors3);      //green,blue,yellow
        ```

* `splice()`方法有很多种用法，主要用途是向数组的中部插入项，始终都会返回一个从原始数组中删除项组成的数组（如果没有删除任何项，则返回一个空数组）
    * 删除：可以删除任意数量的项，2个参数，起始位置、要删除的项数
    * 插入：可以向指定位置插入任意数量的项，3+个参数，起始位置、0（要删除的项数）、要插入的项
    * 替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，指定3+个参数，起始位置、要删除的项数、要插入的任意数量的项

        ```javascript
        var colors = ['red', 'green', 'blue'];
        var removed = colors.splice(0,1);                  //删除第一项
        alert(colors);                                     //green.blue
        alert(removed);                                    //red，返回的敛组中只包含一项

        removed = colors.splice(1,0,'yellow', 'orange');   //从位置1开始插入两项
        alert(colors);                                     //green,yellow,orange,blue
        alert(removed);                                    //返回的是一个空数组

        removed = colors.splice(1,1,'red', 'purple');      //插入两项，删除一项
        alert(colors);                                     //green,red,purple,orange,blue
        alert(removed);                                    //yellow，返回的数组中有一项
        ```

#### 5.2.7 位置方法
* `indexOf()`和`lastindexOf()`
    * 两个参数：要查找的项、表示查找起点位置的索引（可选）
    * 返回要查找的项在数组中的位置，在没找到的情况下返回-1
    * 在比较第一个参数 与数组中的每一项时，会使用金等操作符
    * `indexOf()`从数组的开头（位置0）开始向后查找
    * `lastindexOf()`从数组的末尾开始向前查找

#### 5.2.8 迭代方法
ECMAScript5为数组定义了5个迭代方法，每个方法都接收两个参数：要在每一项上运行的函数、运行该函数的作用域对象（可选，影响this的值）

传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置、数组对象本身

* `every()`：对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true

    ```javascript
    var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    var everyResult = numbers.every(function (item, index, array) {
      return (item> 2);
    });
    alert(everyResult);   //false
    ```

* `filter()`：对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组

    ```javascript
    var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    var everyResult = numbers.filter(function (item, index, array) {
      return (item> 2);
    });
    alert(everyResult);   //[3, 4, 5, 4, 3]
    ```

* `forEach()`：对数组中的每一项运行给定函数，这个方法没有返回值，本质上与使用for循环迭代数组一样

    ```javascript
    var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    var everyResult = numbers.forEach(function (item, index, array) {
      //执行某些操作
    });
    ```

* `map()`：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组

   ```javascript
       var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
       var everyResult = numbers.map(function (item, index, array) {
         return item * 2;
       });
       alert(everyResult);   //[2, 4, 6, 8, 10, 8, 6, 4, 2]
   ```

* `some()`：对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true

   ```javascript
    var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    var everyResult = numbers.some(function (item, index, array) {
      return (item> 2);
    });
    alert(everyResult);   //true
    ```

#### 5.2.9 缩小方法
* `reduce()`和`reduceRight()`这两个方法都会迭代数组的所有项，然后构建一个最终返回的值，都接收两个参数：在每一项上调用的函数、作为缩小基础的初始值（可选）

* 传给`reduce()`和`reduceRight()`的函数接收4个参数：前一个值、当前值、项的索引、数组对象，这个函数返回的任何值都会作为第一个参数自动传给下一项，第一次迭代发生在数组的第二项上
* `reduce()`方法从数组的第一项开始，逐个遍历到最后
* `reduceRight()`从数组的最后一项开始，向前遍历到第一项

    ```javascript
    //使用reduce()方法执行求和的操作
    var values = [1, 2, 3, 4, 5];
    var sum = values.reduce(function (prev, cur, index, array) {
        return prev + cur;
    });
    alert(sum);   //15
    ```

### 5.3 Date类型
Date类型使用从UTC(Coordinated Universal Time 国际协调时间）1970年1月1日午夜（零时）开始经过的毫秒数来保存日期。

* 使用new操作符和Date构造函数创建一个日期对象
    * 不传递参数的情况下，新创建的对象自动获得当前日期和时间
    
    ```javascript
    var now= new Date();
    ```

* `Date.parse()`
    * 接收一个表示日期的字符串参数，根据这个字符串返回相应日期的毫秒数

    ```js
    //创建一个日期对象:2004年5月25日
    var someDate1 = new Date(Date.parse('May 25, 2004'));
    //可直接写成下面的形式
    var someDate2 = new Date('May 25, 2004');
    ```

* `Date.UTC()`
    * 接收参数：年份（必须项）、基于0的月份（一月是0，二月是1，以此类推，必须项）、月中的哪一天 (1到31)、小时数（O到23）、 分钟、秒、毫秒数
    * 返回表示日期的毫秒数

    ```js
    //GMT时间2005年5月5日下午5:55:55
    var allfives1 = new Date(Date.UTC(2005, 4, 5, 17, 55,55));
    //本地时间2005年5月5日下午5:55:55(注意区别：日期和时间基于本地时区而非GMT来创建)
    var allfives2 = new Date(2005, 4, 5, 17, 55,55);
    ```

* `Data.now()`
    * 返回调用这个方法时的日期和时间的毫秒数

    ```js
    //取得开始时间
    var start = Date.now();
    //调用函数
    doSomething();
    //取得停止时间
    var stop = Date.now(),
        result = stop -start;
    ```

#### 5.3.1 继承的方法
* `valueOf()`返回日期的毫秒
    * 由此特性，可以方便使用比较操作符来比较日期值

    ```js
    var date1 = new Date(2007, 0, 1);
    var date2 = new Date(2007, 1, 1);
    alert(date1 < date2);               //true
    alert(date1 > date2);               //false
    ```

#### 5.3.2 日期格式化方法
* `toDateString()` 以特定于实现的格式显示星期几、月、日、年
* `toTimeString()` 以特定于实现的格式显示时、分、秒、时区
* `toLocaleDateString()` 以特定于地区的格式显示星期几、月、日、年
* `toLocaleTimeString()` 以特定于实现的格式显示时、分、秒
* `toUTCString ()` 以特定于实现的格式完整的UTC日期

**以上这些字符串格式方法的输出因浏览器而异**

#### 5.3.3 日期/时间组件方法
|方法|说明|
|---|---|
| `getTime()` | 返回表示日期的毫秒数，与`valueOf()`方法返回的值相同 |
| `setTime(毫秒)` | 以毫秒数设置日期，会改变整个日期 |
| `getFullYear()` | 取得4位数的年份 |
| `getUTCFullYear()` | 返回UTC的4位数年份 |
| `setFullYear(年)` | 设置年份 |
| `setUTCFullYear(年)` | 设置UTC年份 |
| `getMonth()` | 返回月份，其中0表示一月，11表示十二月 |
| `getUTCMonth()` | 返回UTC月份，其中0表示一月，11表示十二月 |
| `setMonth(月)` | 设置月份，0表示一月，11表示十二月 |
| `setUTCMonth(月)` | 设置UTC月份，0表示一月，11表示十二月 |
| `getDate()` | 取得天数（1到31) |
| `getUTCDate()` | 返回UTC天数（1到31) |
| `setDate(日)` | 设置天数（1到31)，如果传入的值超过了该月中应有的天数，则增加月份 |
| `setUTCDate(日)` | 设置UTC天数（1到31)，如果传入的值超过了该月中应有的天数，则增加月份  |
| `getDay()` | 返回星期（0表示星期日，6表示星期六） |
| `getUTCDay()` | 返回UTC日期的星期（0表示星期日，6表示星期六） |
| `getHours()` | 返回小时数（0到23）  |
| `getUTCHours()` | 返回UTC小时数（0到23） |
| `setHours(时)` | 设置小时数，传入的值超过23则增加天数 |
| `setUTCHours(时)` | 设置UTC小时数，传入的值超过23则增加天数 |
| `getMinutes()` | 返回分钟数（0到59） |
| `getUTCMinutes()` | 返回UTC分钟数（0到59） |
| `setMinutes(年)` | 设置分钟数，传入的值超过59则增加小时数 |
| `setUTCMinutes(年)` | 设置UTC分钟数，传入的值超过59则增加小时数 |
| `getSeconds()` | 返回秒数（0到59） |
| `getUTCSeconds()` | 返回UTC秒数（0到59） |
| `setSeconds(秒)` | 设置秒数，传入的值超过59则增加分钟数 |
| `setUTCSeconds(秒)` | 设置UTC秒数，传入的值超过59则增加分钟数 |
| `getMilliseconds()` | 返回毫秒数 |
| `getUTCMilliseconds()` | 返回UTC毫秒数 |
| `setMilliseconds(毫秒)` | 设置毫秒数 |
| `setUTCMilliseconds(毫秒)` | 设置UTC毫秒数 |
| `getTimezoneOffset()` | 返回本地时间与UTC时间相差的分钟数 |

### 5.4 RegExp类型
```
var expression = /pattern/flags;
```

* pattern是正则表达式
* flags标明正则表达式的匹配模式
    * g：全局（global）模式
    * i：不区分大小写（case-insensitive）模式
    * m：多行（multiline）模式
* 正则表达式中的元字符都有特殊用途，如果想要匹配字符串中包含的这些字符，就必须对它们进行转义
* 使用正则表达式字面量必须像直接调用RegExp构造函数一样，每次都创建新的RegExp实例

#### 5.4.1 RegExp实例属性
* RegExp的每个实例都具有下列属性
    * global：布尔值，表示是否设置了g标志
    * ignoreCase：布尔值，表示是否设置了i标志
    * lastIndex：整数，表示开始搜索下一个匹配项的字符位置（从0算起）
    * multiline：布尔值，表示是否设置了m标志
    * source：正则表达式的**字面量形式**所用的**字符串**

```javascript
var pattern1 = /\[bc\]at/i;
alert(pattern1.global);        //false
alert(pattern1.ignoreCase);    //true
alert (pattern1.multiline);    //false
alert (pattern1.lastIndex);    //0
alert (pattern1.source);      //'\[bc\]at'

var pattern2 = new RegExp('\\[bc\\]at', 'i');
alert (pattern2.source);      //'\[bc\]at'
//pattern1和pattern2表示的正则表达式其实是一样的
```

#### 5.4.2 RegExp实例方法
* `exec()`
    * 接受一个参数(要应用模式的字符串)
    * 返回包含一个匹配项信息的数组（虽然是Array的实例，但包含两个额外的属性：index和input）
        * index表示匹配项在字符串中的位置
        * input表示应用正则表达式的字符串
    * 在没有匹配项的情况下返回null

    ```js
    var text= 'mon and dad and baby';
    var pattern = /mom( and dad (and baby)?)?/gi;
    var matches = pattern.exec(text);
    alert (matches.index);       //0
    alert(matches.input);        //'mon and dad and baby'
    alert(matches[0]);           //'mon and dad and baby'
    alert(matches[1]);           //'and dad and baby'
    alert(matches[2]);           //'and baby'
    ```

* `test()`
    * 接受一个字符串参数
    * 在模式与该参数匹配的情况下返回true，否则返回false
    * 经常被用在if语句中

    ```js
    var text = '000-00-0000';
    var pattern = /\d{3}-\d{2}-\d{4}/;
    if (pattern.test(text)) {
        alert('The pattern was matched.');
    }
    ```

* 继承的方法
    * RegExp实例继承的`toLocaleString()`和`toString（）`方法都会返回正则表达式的字面量，与创建正则表达式的方式无关
    * 正则表达式的`valueOf()`方法返回正则表达式本身

    ```js
    var pattern= new RegExp('\\[bc\\]at', 'gi');
    alert(pattern.toString());              // /\[bc\]at/gi
    alert(pattern.toLocaleString());        // /\[bc\]at/gi
    ```

#### 5.4.3 RegExp构造函数属性
RegExp构造函数包含的属性适用于作用域中的所有正则表达式，并且基于所执行的最近一次正则表达式操作而变化，属性可以通过两种方式访问

|长属性名|短属性名|说明|
|---|:---:|---|
|input| $_ | 最近一次要匹配的字符串|
|lastMatch| $& | 最近一次的匹配项|
|lastParen| $+ | 最近一次匹配的捕获组|
|leftContext| $` | input字符串中lastMatch之前的文本|
|multiline| $* | 布尔值，表示是否所有表达式都使用多行模式|
|rightContext| $' | input字符串中lastMatch之后的文本|

```js
var text = 'this has been a short summer';
var pattern = /(.)hort/g;

if (pattern.test(text)) {
    alert(RegExp.input);          //this has been a short summer
    alert(RegExp.leftContext);    //this has been a
    alert(RegExp.rightContext);   //summer
    alert(RegExp.lastMatch) ;     //short
    alert(RegExp.lastParen);      //s
    alert(RegExp.multiline);      //false
}
```

* 用于存储捕获组的构造函数属性
    * `RegExp.$1`、`RegExp.$2`…`RegExp.$9`，分别用于储存第一、第二…第九个匹配的捕获组
    * 调用`exec()`或`test()`方法时被自动填充

```JS
var text = 'this has been a short summer';
var pattern= /(..)or(.)/g;

if (pattern.test(text)) {
    alert(RegExp.$1);    //sh
    alert(RegExp.$2);    //t
}
```

#### 5.4.4 模式的局限性
* ECMAScript正则表达式不支持的特性
    * 匹配字符串开始和结尾的\A和\Z锚，但支持以插入符号(^)和美元符号($)来匹配字符串的开始和结尾
    * 向后查找(lookbehind)，但完全支持向前查找(lookahead)
    * 并集和交集类
    * 原子组(atomic grouping)
    * Unicode支持(单个字符除外，如\uFFFF)
    * 命名的捕获组，但支持编号的捕获组
    * s(single 单行)和x(free-spacing 无间隔)匹配模式
    * 条件匹配
    * 正则表达式注释

### 5.5 Function类型
#### 5.5.1 没有重载(深入理解)
* **将函数名想象为指针**

#### 5.5.2 函数声明与函数表达式
解析器在向执行环境中加载数据时，会率先读取函数声明，并使其在执行任何代码之前可用，函数表达式则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

```js
//使用函数申明
alert(sum(10, 10));            // 20
function sum (num1, num2) {
    return num1 + num2;
}
```

```js
//使用函数表达式
alert(sum(10, 10));        //err:'unexpected identifier' 意外标识符
var sum = function (num1, num2) {
    return num1 + num2;
};
```

#### 5.5.3 作为值的函数
ECMAScript中的函数名本身就是变量，所以函数也可以作为值来使用，不仅可以像传递参数一样把一个函数传递给另一个函数，还可以将一个函数作为另一个函数的结果返回。

#### 5.5.4 函数内部属性
在函数内部，有两个特殊的对象：arguments和this。

* arguments的主要用途是保存函数参数，它有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数

    ```js
    //下面是一个定义阶乘的递归函数
    function factorial (num) {
        if (num <= 1) {
            return 1;
        } else {
            return num * arguments.callee(num-1);
            //这边的 arguments.callee(num-1) 其实就指向的是factorial(num-1)
            //为了防止这个函数的执行与函数名factorial耦合在一起
        }
    }
    ```

* this引用的是函数据以执行的环境对象

    ```js
    window.color = 'red';
    var o = {color: 'blue'};
    function sayColor () {
        alert(this.color);
    }
    sayColor();                  //'red'
    o.sayColor = sayColor;
    o.sayColor();                //'blue'
    ```

* ECMAScript5规范化了函数对象的属性：caller
    * caller保存调用当前函数的函数的引用
    * 在全局作用域中调用函数，caller值为null

    ```js
    function outer () {
      inner();
    }
    function inner () {
      alert(arguments.callee.caller);
    }
    outer();                          //警告框中显示outer()函数的源代码
    ```

* 为了安全性在严格模式下：
    * 访问`arguments.callee`会导致错误
    * 不能为函数的caller属性赋值

#### 5.5.5 函数属性和方法
* length属性表示函数希望接收的命名参数的个数

    ```js
    function sayName(name){
        alert(name);
    }

    function sum(num1, num2){
        return num1 + num2;
    }

    function sayHi(){
        alert("hi");
    }

    alert(sayName.length);  //1
    alert(sum.length);      //2
    alert(sayHi.length);    //0
    ```

* prototype属性用来保存所有实例方法
    * 诸如`toString()`和`valueOf()`等方法实际上都保存在prototype名下，只不过是通过各自对象的实例访问罢了
    * ECMAScript5中，prototype属性不可枚举，因此使用for-in无法发现

* `apply()`和`call()`：每个函数都包含这两个非继承而来的方法，用途都是在特定的作用域中调用函数，实际上是设置函数体内this对象的值（能够扩充函数赖以运行的作用域）
    * `apply()`方法接收两个参数
        * 在其中运行函数的作用域
        * 参数数组（可以是Array的实例，也可以是arguments对象）
    * `call()`方法接收多个参数
        * 在其中运行函数的作用域
        * 其余参数为传递给函数的参数（必须逐个列举出来）
    * 使用`apply()`或`call()`来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系
* `bind()`方法会创建一个函数的实例，其this值会被绑定到传给`bind()`函数的值

### 5.6 基本包装类型
为了便于操作基本类型值，ECMAScript还提供了3个特殊的引用类型(基本包装类型)：Boolean、Number和String

引用类型与基本包装类型的主要区别就是对象的生存期。自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。

#### 5.6.1 Boolean类型
* 建议不要使用Boolean对象

#### 5.6.2 Number类型
* `toString()` 传递一个表示基数的参数，告诉它返回几进制数值的字符串形式
* `toFixed()` 按照指定的小数位返回数值的字符串表示
* `toExponential()` 返回以指数表示法（e表示法）表示的数值字符串形式，接收一个参数，指定输出结果中的小数位数
* `toPrecision()` 可能会返回固定大小（fixed）格式，也可能返回指数 (exponential）格式
* 不建议直接实例化Number类型

#### 5.6.3 String类型
* String类型的每个实例都有一个length属性，表示字符串中包含多个字符


### 5.7 单体内置对象







***


更新中……



