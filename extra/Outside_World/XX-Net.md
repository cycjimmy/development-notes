# XX-Net

基于Google Appengine的Web代理，是goagent的升级版。

* 项目地址:[https://github.com/XX-net/XX-Net](https://github.com/XX-net/XX-Net)
* 配置相对复杂，但每天可用流量高达1G

## windows使用IPv6(win10专业版测试通过)
### 开启ipv6服务
* Win+R
* gpedit.msc
* 计算机配置
* 管理模板
* 网络
* TCPIP 设置
* IPv6 转换技术
  * 设置 ISATAP 状态 => 已启用
  * 设置 Teredo 默认限定 => 已启用
  * 设置 Teredo 服务器名称 => 已启用 **teredo.remlab.net**
  * 设置 Teredo 状态 => 已启用 **企业客户端**（内网设置）

上述步骤可利用命令行完成(可保存为批处理[bat文件](https://raw.githubusercontent.com/cycjimmy/development-notes/master/extra/Outside_World/teredo.config.bat))
```shell
@echo off

# 启用 Isatap
netsh interface isatap set state default

# Teredo重置
netsh interface teredo set state default

# Teredo设置服务器
netsh interface teredo set state server=teredo.remlab.net

# 启用 Teredo:
netsh interface ipv6 set teredo enterpriseclient

cmd
```

### 设置解析IPv6域名
* [内网ipv4<=>ipv6](http://ip-lookup.net/conversion.php)
* 修改本地连接属性中的Internet协议版本6属性
  * IPv6地址: 刚刚通过网站转换后的ipv6地址
  * 子网前缀长度: `48`
  * 默认网关不填写
  * DNS服务器
    * `2001:4860:4860::8888`
    * `2001:4860:4860::8844`

### 添加路由(重启电脑后失效，需要重新设置)
* `ipconfig /all` 查看 Teredo Tunneling Pseudo-Interface 使用的连接（如：隧道适配器 本地连接* 1）
* `netsh int ipv6 show int` 查看上面隧道适配器 本地连接* 1 使用的`Idx`，如`12`
* `route DELETE ::/0` 清空一下之前的路由信息
* `netsh int ipv6 add route ::/0 12` 添加路由(12为上面的Idx，也就是teredo 的Idx)

可以把它写入XX-Net目录中的start.bat中
```shell
@echo off
route DELETE ::/0
netsh int ipv6 add route ::/0 12 metric=1
netsh interface ipv6 set interface "以太网" routerdiscovery=disabled
SET PYTHONPATH="%~dp0%start.vbs" noconsole
```
"以太网"换成你的连接路由器的连接名，保存。发个快捷方式到桌面，修改“管理员权限”，以后用这个快捷方式启动XX-Net。
如果想修改图标，可以定位图标文件到xx-net目录下：code\default\launcher\web_ui\favicon.ico。

### 更改IPv6优先级
`netsh int ipv6 show prefix` 查询IPv6的优先级，一般显示如下：

```shell
优先顺序  标签   前缀
——————— ————— —————————
50        0    ::1/128
40        1    ::/0
30        2    2002::/16
20        3    ::/96
10        4    ::ffff:0:0/96
5         5    2001::/32
```

修改优先级：

```shell
netsh int ipv6 set prefix 2002::/16 30 1
netsh int ipv6 set prefix 2001::/32 5 1
```

### 检验IPv6设置
* 站点：[http://test-ipv6.com](http://test-ipv6.com)
  * Tests Run
    * Test IPv6 without DNS <= 这一项测试通过即可

### XX-Net中开启ipv6
* GAEPROXY
  * 配置 => 高级选项 => 使用IPv6

### 在无法连接时排查问题
```shell
# 查看网络连接
ipconfig -all

# 显示Teredo信息
netsh interface ipv6 show teredo   # 正常情况下
                                   # 类型: enterpriseclient
                                   # 状态: qualified

# 显示路由信息
netsh int ipv6 show route          # 是否有 ::/0 的记录
```

## 有效IP收集(171009更新)
```text
119.28.87.227|119.28.84.182
```

## 相关链接：
* [ipv6折腾笔记](http://www.jianshu.com/p/1433dd30f45a)
