# CentOS Nginx 部署 SSL证书

## 基本操作
### 阿里云网站申请免费SSL证书
### 在证书控制台下载Nginx版本证书
下载到本地的压缩文件包解压后包含：
* .crt文件：是证书文件，crt是pem文件的扩展名。
* .key文件：证书的私钥文件（申请证书时如果没有选择自动创建CSR，则没有该文件）。

在Nginx的安装目录下创建cert目录，并且将下载的全部文件拷贝到cert目录中
```shell script
[cyc]$ cd /etc/nginx
[cyc]$ sudo mkdir cert
[cyc]$ sudo chown cyc cert/
```
```shell script
[client]$ scp -r cycTech.key cycTech.pem cyc@[server-ip]:/etc/nginx/cert
```

配置 Nginx
```shell script
[cyc]$ sudo vim /etc/nginx/nginx.conf
```

将`nginx.conf`的 TLS server 部分改成以下的样子
```apacheconf
server {
  listen       443 ssl http2 default_server;
  listen       [::]:443 ssl http2 default_server;
  server_name  www.cycjimmy.tech;
  root         /usr/www;
  
  ssl_certificate "/etc/nginx/cert/cycTech.pem";
  ssl_certificate_key "/etc/nginx/cert/cycTech.key";
  ssl_session_cache shared:SSL:1m;
  ssl_session_timeout  10m;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;
  
  # Load configuration files for the default server block.
  include /etc/nginx/default.d/*.conf;
  
  location / {
  }
}
```

如果要让用户用http协议访问时自动跳转https，则还需加上如下配置：
```apacheconf
server {
  listen 80;
  server_name www.cycjimmy.tech;
  return 301 https://$server_name$request_uri;
}
```

```shell script
# 重启 Nginx
[cyc]$ sudo nginx -s reload

# 查看443端口是否启动
[cyc]$ netstat -tlnp
```

最后在阿里云安全组规则开通443端口即可
