# 将 Socks 代理转化为 Http 代理

**本文所在环境为 macOS，其他平台类似**

## 步骤
* 安装 polipo (请确保系统安装了brew)
```shell script
$ brew install polipo
```

* 运行 polipo,设置上级socks代理的端口号.
```shell script
# 我的socks代理的端口号是5555，您需要把它改成您自己的
$ polipo socksParentProxy=127.0.0.1:5555

# 看到下面的提示说明启动成功了，polipo默认在8123端口启动了http代理，您现在可以使用8123端口进行网络配置了
Established listening socket on port 8123.
```

## Npm 使用 Http 代理
```shell script
# 设置http代理
$ npm config set proxy http://127.0.0.1:8123
$ npm config set https-proxy http://127.0.0.1:8123
$ npm config set strict-ssl false -g

# 还原设置
$ npm config delete proxy
$ npm config delete https-proxy
$ npm config delete strict-ssl
```

## Yarn 使用 Http 代理
```shell script
# 设置http代理
$ yarn config set proxy http://127.0.0.1:8123
$ yarn config set https-proxy http://127.0.0.1:8123
$ yarn config set strict-ssl false -g

# 还原设置
$ yarn config delete proxy
$ yarn config delete https-proxy
$ yarn config delete strict-ssl
```

## 参考
* [用polipo把shadowsocks转为http代理](https://io.diveinedu.com/2016/03/16/%E7%94%A8Polipo%E6%8A%8AShadowSocks%E8%BD%AC%E4%B8%BAHTTP%E4%BB%A3%E7%90%86.html)
