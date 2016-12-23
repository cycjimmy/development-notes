# Android 7.0 Background Ignore

7.0系统阻止后台唤醒的解决方案(更新时间2016/12/23)

## 非常简单的步骤操作
* 注意：
  * 该方法**适用于7.0及以上的安卓系统**
  
* 准备工作
  * 电脑安装 [ADB](http://forum.xda-developers.com/showthread.php?p=48915118)
  * 手机连电脑自动安装驱动，或[安装通用驱动](https://dl.google.com/android/repository/usb_driver_r11-windows.zip)
  * 手机的开发者选项中开启USB调试
  
* 电脑上打开命令行工具
  * 输入以下命令可以列出所有第三方package_name
    ```shell
    $ adb shell 'pm list packages -3'
    ```
    
  * 输入以下命令可限制指定APP后台自动唤醒
    ```shell
    $ adb shell cmd appops set [package_name] RUN_IN_BACKGROUND ignore
    ```
    
  * 如想重新允许指定APP的后台唤醒，可输入以下命令还原RUN_IN_BACKGROUND状态
    ```shell
    $ adb shell cmd appops set [package_name] RUN_IN_BACKGROUND allow
    ```
    
## 其他可用操作
* 安装绿色守护app，开启全自动化休眠，比较简单，如不清楚可以看下面的相关链接查看具体步骤

## 相关链接：
* [RUN_IN_BACKGROUND说明\[Android\]](https://developer.android.com/topic/performance/background-optimization.html)
* [如何使用 Android 7 新增功能阻止 App 的相互唤醒？\[知乎\]](https://www.zhihu.com/question/50008070)
* [Jiangyiqun/android_background_ignore\[Github\]](https://github.com/Jiangyiqun/android_background_ignore)

