# Grunt-beginner前端自动化工具

### 前端集成解决方案

* 开发团队代码风格不统一，如何强制开发规范
* 前期开发的组件库如何维护和使用
* 如何模块化前端项目
* 服务器部署前必须的压缩、检查流程如何简化，流程如何完善

### 目前主流的前端集成解决方案有

* Yeoman
* Bower
* Grunt | Gulp

***

## 安装

* Yeoman的安装
	* 官方站点：[http://yeoman.io](http://yeoman.io)
	* 安装指令：
	
		```node
		npm install -g yo
		```
		
	* 验证方法：

		```node
		yo -v
		```
		
	* Yeoman的作用：在web项目的立项阶段，使用Yeoman来生成项目的文件、代码结构，Yeoman自动将最佳实践和工具整合进来，大大加速和方便了我们后续的开发。
		
* Bower的安装
	* 官方站点：[http://bower.io](http://bower.io)
	* 安装指令：
	
		```node
		npm install -g bower
		```
		
	* 验证方法：

		```node
		bower -v
		```
	
	* Bower的作用：web的包管理器，web站点由框架、库、公共部分等组成，Bower能用来追踪管理这些。
	
* Grunt的安装
	* 官方站点：[http://gruntjs.com](http://gruntjs.com)
	* 安装指令：
	
		```node
		npm install -g grunt-cli
		```
		
	* 验证方法：

		```node
		grunt
		```
	
	* Grunt的作用：build Tool | 自动化（减少像压缩、编译、单元测试、代码校验这种重复且无业务关联的工作）


## Yeoman

### 安装[Generator](http://yeoman.io/generators/)

```node
npm install -g -generator-[generator_name]
```

### 初始化Generator

切换到项目目录

```node
yo [generator_name] [project_name]
```
