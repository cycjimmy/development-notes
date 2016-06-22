# Network Address (修改MAC地址 for win10)

***

## 查看mac地址
* 在命令行界面输入“ipconfig /all”命令

***

## 修改MAC地址
* 右击桌面任务栏右下角的“网络图标”，点击下拉框的“打开网络与共享中心”。
* 进入到“网络与中心”控制面板后，点击左侧的“更改适配器设置”。
* 进入到”网络连接“面板，在“网络连接”中对想要修改的适配器，右击，点击属性。
* 进入属性面板中点击“配置”，进入到新的面板中。
* 在新面板中点击“高级”，在属性中选择“Network Address”
* 然后再右侧的单选按钮选择“值”，填写你想要填写的mac地址。

## 修改无线网卡的MAC地址
> 并不是所有的无线网卡都有Network Address那么一项，如果没有就需要手动添加

* 搜索regedit进入注册表
* 定位到
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4D36E972-E325-11CE-BFC1-08002BE10318}\
* 在这里你会看到很多项从0000--00xx，这里面每一项对应一个网卡
* 用ctrl+f,在查找字符串中输入wireless查找无线网卡
* 我们需要在无线网卡所在Ndi下的params项，然后添加一个NetworkAddress项
    * 新建字符串default
    * 新建字符串LimitText: 12
    * 新建字符串Optional: 1
    * 新建字符串ParamDesc: Network Address
    * 新建字符串type: edit
    * 新建字符串UpperCase: 1
* 回到无线网卡---属性---高级，出现NetworkAddress这个选项卡
* 需要修改的mac地址不能随便，假如你的mac地址非原来真实的mac地址，必须遵守以02开头，按照**02X6XAXEXXXX**的形式才能生效（X=随机）










