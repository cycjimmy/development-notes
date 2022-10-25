# 在Mac上使用Nginx

## 安装
### 安装Homebrew
[详情](./homebrew.md)

### 安装Nginx
```shell
# 安装
$ brew install nginx

# 查看nginx的配置信息
$ brew info nginx
```

## 使用
### 配置
* 打开安装目录`open /usr/local/etc/nginx/`
* 使用本地编辑器打开`nginx.conf`文件
* 修改配置

### nginx服务
```shell
# 启动/重启
$ nginx

# 停止
$ nginx -s stop
```

```shell
# 启动brew服务
$ brew services start nginx

# 重启brew服务
$ brew services restart nginx

# 停止brew服务
$ brew services stop nginx
```

## 相关文档
* [Mac安装Nginx详细教程](https://juejin.cn/post/6986190222241464350)
* [How to Set Up NGINX on Mac for Testing](https://adamtheautomator.com/nginx-on-mac/)
