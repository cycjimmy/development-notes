# Docker

* 官网：[https://www.docker.com/](https://www.docker.com/)
* 教程
	* [Docker 入门教程](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
	* [Docker 微服务教程](http://www.ruanyifeng.com/blog/2018/02/docker-wordpress-tutorial.html)
	
## 常用命令
```shell
# 搜索相关镜像
$ docker search [images_keyword]

# 拉取一个镜像
$ docker image pull [images_name]

# 查看本地镜像
$ docker image ls

# 运行镜像
$ docker container run [images_name]

# 列出本机正在运行的容器
$ docker container ls

# 列出本机所有容器，包括终止运行的容器
$ docker container ls --all

# 关闭容器
$ docker container kill [contain_ID]

# 启动之前关闭的容器
$ docker start [contain_ID]

# 删除容器
$ docker container rm [contain_ID]
```

## Docker使用MSSQL相关
```shell
# 下载mssql镜像
$ docker pull microsoft/mssql-server-linux

# 创建并运行容器
$ docker run --name mssql -m 512m -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=yourStrong(!)Password' -p 1433:1433 -d microsoft/mssql-server-linux

# 启动之前关闭的容器
$ docker start mssql

# 修改SA密码
$ docker exec -it mssql bash
$ /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "yourOld(!)Password" -Q 'ALTER LOGIN SA WITH PASSWORD="yourStrong(!)Password"'
```

