# Hidden System Program

USB调试隐藏系统程序(更新时间2016/12/28)

## 步骤操作
* 注意：
  * 该方法**不适用于7.0及以上的系统**

* 准备工作
  * 电脑安装 [ADB](http://forum.xda-developers.com/showthread.php?p=48915118)
  * 手机连电脑自动安装驱动，或[安装通用驱动](https://dl.google.com/android/repository/usb_driver_r11-windows.zip)
  * 手机的开发者选项中开启USB调试
  
* 电脑上打开命令行工具
  * 输入以下命令可以列出所有包的名字package_name
    ```shell
    $ adb shell pm list packages
    ```
    
  * 输入以下命令可以清除APP数据缓存
    ```shell
    $ adb shell pm clear [package_name]
    ```
    
  * 如可删除，可以输入以下命令删除APP
    ```shell
    $ adb shell uninstall [package_name]
    ```
    
  * 输入以下命令隐藏(冻结)系统应用
    ```shell
    $ adb -d shell pm hide [package_name]
    ```
  
  * 解冻命令
    ```shell
    $ adb -d shell pm unhide [package_name]
    ```
  
## 其他可用操作
* 批量操作(win)
  * 新建记事本
  * 输入需要批量操作命令
    ```shell
    @echo off
    echo 开始批量操作
    adb -d shell pm hide package_name1
    adb -d shell pm hide package_name2
    # ...
    # ...
    
    echo 批量操作完成
    pause
    ```
    
  * 保存文件为 `bat` 格式，`ANSI` 编码
  * 运行该文件

