# CentOS 部署 Hexo

## 基本操作
### 配置 Nginx
```shell script
# 验证 Nginx
[cyc]$ sudo nginx -t

# 配置 Nginx
[cyc]$ vim /etc/nginx/nginx.conf
```

将 nginx.conf 的server部分改成以下的样子
```config
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  cycjimmy.tech; # 域名
    index index.html;
    root         /usr/www; # 网站根目录
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    location ~* ^.+\.(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|rss|atom|jpg|jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid|midi|wav|bmp|rtf)$ {
        access_log off; log_not_found off; expires max;
    }
}
```

```shell script
# 重启 Nginx
[cyc]$ sudo nginx -s reload
```

网页根目录文件夹权限
```shell script
[cyc]$ cd /usr
[cyc]$ sudo mkdir www
[cyc]$ sudo chown git:git -R /usr/www
```

### 通过 ssh 和 git 自动部署博客
```shell script
# 添加用户git
[cyc]$ sudo adduser git 

# 修改git用户的登录密码
[cyc]$ sudo passwd git

[cyc]$ su git
[git]$ cd ~
[git]$ mkdir .ssh
[git]$ vim .ssh/authorized_keys # 填入本地密钥然后保存退出
[git]$ chmod 600 ~/.ssh/authorized_keys
[git]$ chmod 700 ~/.ssh
```

新建仓库并且配置仓库文件:在git用户下新建一个仓库
```shell script
[cyc]$ su git
[git]$ cd ~
[git]$ git init --bare blog.git
```

修改仓库的配置文件
```shell script
[git]$ cd ~/blog.git/hooks
[git]$ vim post-receive
```

写入以下内容并且保存退出
```shell script
#!/bin/bash

GIT_REPO=/home/git/blog.git #git 仓库
TMP_GIT_CLONE=/tmp/blog
PUBLIC_WWW=/usr/www         #网站目录
rm -rf ${TMP_GIT_CLONE}
git clone $GIT_REPO $TMP_GIT_CLONE
rm -rf ${PUBLIC_WWW}/*
cp -rf ${TMP_GIT_CLONE}/* ${PUBLIC_WWW}
```

赋予权限
```shell script
[git]$ chmod +x ~/blog.git/hooks/post-receive
```

### hexo
修改_config.yml文件的deploy设置
```yaml
deploy:
  type: git
  repo: git@[域名]:/home/git/blog.git
  branch: master
```