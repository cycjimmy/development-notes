# aliyun 基础记录

## 个人配置
* 云镜像 CentOS 7.6
* 个人PC系统 macOS

## 基本操作
### 连接阿里云
查看个人mac公钥
```shell script
$ cd ~/.ssh
$ ls
$ cat ~/.ssh/id_rsa.pub
```
复制`id_rsa.pub`内容，然后添加到阿里云的密钥对上

如果没有`id_rsa.pub`文件，创建公钥
```shell script
$ ssh-keygen
```

通过终端 连接云：
```shell script
$ ssh root@[aliyun公IP]
```

此时我们是以root的身份，进入站点。这个身份权限太高，我们需要自己添加一个身份，平常去使用.
```shell script
# 添加用户cyc
[root]$ adduser cyc 

# 修改cyc用户的登录密码
[root]$ passwd cyc

# 将cyc添加到wheel中
[root]$ gpasswd -a cyc wheel
```

新用户登陆权限问题修复
```shell script
# 修改目标服务器中 /etc/ssh/sshd_config 中的参数：
[root]$ vim /etc/ssh/sshd_config

# 将最后一行 PasswordAuthentication no中的“no”改为“yes”
PubkeyAuthentication yes

# 重启sshd服务
[root]$ service sshd restart
```

使用新身份连接：
```shell script
$ ssh cyc@[aliyun公IP]
```
需要root权限的时候，使用`sudo`命令提升权限

设置不允许root用户连接
```shell script
# 进入配置文件
[cyc]$ sudo vim /etc/ssh/sshd_config

# 将PermitRootLogin改为no
PermitRootLogin no

# 重启sshd服务
[cyc]$ sudo systemctl reload sshd
```

### 安装 Docker
```shell script
# 检查系统的内核版本
[cyc]$ uname -r

# 确保yum最新版本
[cyc]$ sudo yum update

# 移除旧的Docker版本
[cyc]$ sudo yum remove docker \
  docker-client \
  docker-client-latest \
  docker-common \
  docker-latest \
  docker-latest-logrotate \
  docker-logrotate \
  docker-selinux \
  docker-engine-selinux \
  docker-engine

# 安装Docker所需的依赖包
[cyc]$ sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 设置Docker的yum的源
[cyc]$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 查看仓库所有Docker版本
[cyc]$ yum list docker-ce --showduplicates | sort -r

# 安装Docker
[cyc]$ sudo yum install docker-ce  # 安装最新版Docker
[cyc]$ sudo yum install <FQPN>     # 安装指定版本，例如：sudo yum install docker-ce-17.12.1.ce

# 启动Docker并添加开机自启动
[cyc]$ sudo systemctl start docker	#启动
[cyc]$ systemctl enable docker		#开机自启动

# 检查是否安装成功
[cyc]$ docker --version
```

Docker常用命令
```shell script
[cyc]$ docker --help            #Docker帮助
[cyc]$ docker --version         #查看Docker版本
[cyc]$ docker search <image>    #搜索镜像文件，如：docker search mysql
[cyc]$ docker pull <image>      #拉取镜像文件， 如：docker pull mysql
[cyc]$ docker images            #查看已经拉取下来的所以镜像文件
[cyc]$ docker rmi <image>       #删除指定镜像文件
[cyc]$ docker run --name <name> -p 80:8080 -d <image>      #发布指定镜像文件
[cyc]$ docker ps                #查看正在运行的所有镜像
[cyc]$ docker ps -a             #查看所有发布的镜像
[cyc]$ docker rm <image>        #删除执行已发布的镜像
```
* `–name` 指镜像文件发布后的镜像名称
* `-p` 端口映射，格式为：主机端口（80）:容器端口（8080）
* `-d` 后台运行容器，并返回容器ID

