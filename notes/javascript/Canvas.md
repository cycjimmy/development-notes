# Canvas

## 1 创建Canvas
* HTML
    * 不指定画布宽高时，Canvas默认为300*150
    * 在canvas标签上用width属性和height属性指定画布宽高（没有单位），不建议使用CSS方式指定大小
    * 向下兼容方法，可以在canvas标签中输入内容，在支持canvas的浏览器中将不显示内容，不支持canvas的浏览器将显示该内容

    ```html
    <canvas id="canvas" width="1024" height="768">
        当前浏览器不支持canvas，请更换浏览器后再试
    </canvas>
    ```
        
* Javascript
    
    ```javascript
    var canvar = document.getElementById('canvas');
    //在JS中也可以设定canvas的宽高
    canvas.width = 1024;
    canvas.height = 768;
    
    //判断浏览器是否支持canvas
    if (canvas.getContext('2d')) {
        var context = canvas.getContext('2d');
        //使用context进行绘制
        
    } else {
        alert('当前浏览器不支持canvas，请更换浏览器后再试');
    }
    
    ```

## 2 绘制图案
* canvas的绘图是一种基于状态的绘图，先设置绘图的状态，之后调用函数进行具体的绘制
* canvas坐标系是以左上角为坐标原点，从左向右为x轴正方向，从上到下为y轴正方向

### 2.1 绘制直线
* 画一条直线

    ```javascript
    //状态设置
    context.moveTo(100,100);
    context.lineTo(700,700);
    context.lineWidth = 5;
    context.strokeStyle = '#008800';
    
    //绘制函数
    context.stroke();
    ```

* 画个三角形

    ```javascript
    
    context.beginPath(); //开始绘制
    context.moveTo(100,100);
    context.lineTo(700,700);
    context.lineTo(100,700);
    context.lineTo(100,100);
    context.closePath(); //结束绘制，自动封闭图像
    
    context.fillStyle = 'rgb(2, 100, 30)'; //填充样式
    context.fill();//着色
    
    context.lineWidth = 5; //线条宽度
    context.strokeStyle = 'red'; //线条样式
    context.stroke(); //描边
    
    ```
    
* 画一个七巧板

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        <canvas id="canvas" style="border:1px solid  #ccc;display:block;margin:50px auto;">
        当前浏览器不支持canvas，请尝试使用最新版本的浏览器。
        </canvas>
        <script>
            var tangram=[
                {p:[{x:0,y:0},{x:800,y:0},{x:400,y:400}],color:"blue"},
                {p:[{x:0,y:0},{x:400,y:400},{x:0,y:800}],color:"red"},
                {p:[{x:800,y:0},{x:800,y:400},{x:600,y:600},{x:600,y:200}],color:"yellow"},
                {p:[{x:600,y:200},{x:600,y:600},{x:400,y:400}],color:"pink"},
                {p:[{x:400,y:400},{x:600,y:600},{x:400,y:800},{x:200,y:600}],color:"white"},
                {p:[{x:200,y:600},{x:400,y:800},{x:0,y:800}],color:"black"},
                {p:[{x:800,y:400},{x:800,y:800},{x:400,y:800}],color:"gray"},
            ]
            window.onload=function(){
                var canvas=document.getElementById("canvas");
                canvas.width=800;
                canvas.height=800;
                var context=canvas.getContext('2d');
                // 绘制状态
                for (var i = 0; i < tangram.length; i++) {
                    //draw函数
                    draw(tangram[i],context);
                }
            function draw(piece,cxt){
                cxt.beginPath();
                cxt.moveTo(piece.p[0].x, piece.p[0].y);
                for (var i = 1; i < piece.p.length; i++){
                    cxt.lineTo(piece.p[i].x,piece.p[i].y);
                }
                cxt.closePath();

                cxt.fillStyle=piece.color;
                cxt.fill();

                cxt.lineWidth=5;
                cxt.strokeStyle="gold";
                cxt.stroke();
            }
            }
        </script>
    </body>
    </html>
    ```

* context内置API：矩形
    * context.rect(x, y, width, height);
        * 只规划矩形的路径
    * context.fillRect(x, y, width, height);
        * 规划矩形的路径，并用设定好的fillStyle进行填充
    * context.strokeRect(x, y, width, height);
        * 规划矩形的路径，并用设定好的strokeStyle进行描边

### 2.2 线条的属性
* lineWidth 线条宽度
* lineCap 线条两端的形状
    * butt (default)
    * round 圆头
    * square 方头
* lineJoin 线条相接点的形状
    * miter (default)
    * bevel 斜接
    * round 圆角
* miterLimit
    * 当使用lineJoin为miter时，所产生的内角与外角之间距离的最大值，默认值为10
    * 一旦超过设定值lineJoin就会以bevel(斜接)方式呈现
    


### 2.3 绘制弧线
* context.arc函数

    ``` javascript
    context.arc(
        centerx, //圆心的x坐标
        centery, //圆心的y坐标
        radius, //半径
        startingAngle, //开始弧度
        endingAngle, //结束弧度
        anticlockwise = false //可选值，默认false表示以顺时针绘制
    )
    
    //一个圆的弧度标注，0pi位置在正右侧，0.5pi在下侧，1pi在左侧，1.5pi在上侧，2pi回到右侧
    ```
    
* 示例：10个弧
    
    ``` javascript
    for (var i = 0; i < 10; i++) {
        context.beginPath();//开始绘制
        context.arc(50 + i * 100, 500, 40, 2 * Math.PI * (i + 1) / 10, true);

        context.stroke();
    }
    ```
    
### 2.4 其他上下文函数
* context.clearRect(x, y, width, height)
    * 对画布指定区域进行清除操作
* context.canvas
    * 找到上下文绘图环境所对应的画布，从而调用画布的其他属性
        * canvas.width
        * canvas.height
        * canvas.getContext('2d')
    
    
    
    
    
    
    
    