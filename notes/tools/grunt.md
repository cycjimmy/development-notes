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
	
		```shell
		$ npm install -g yo
		```
		
	* 验证方法：

		```shell
		$ yo -v
		```
		
	* Yeoman的作用：在web项目的立项阶段，使用Yeoman来生成项目的文件、代码结构，Yeoman自动将最佳实践和工具整合进来，大大加速和方便了我们后续的开发。
		
* Bower的安装
	* 官方站点：[http://bower.io](http://bower.io)
	* 安装指令：
	
		```shell
		$ npm install -g bower
		```
		
	* 验证方法：

		```shell
		$ bower -v
		```
	
	* Bower的作用：web的包管理器，web站点由框架、库、公共部分等组成，Bower能用来追踪管理这些。
	
* Grunt的安装
	* 官方站点：[http://gruntjs.com](http://gruntjs.com)
	* 安装指令：
	
		```shell
		$ npm install -g grunt-cli
		```
		
	* 验证方法：

		```shell
		$ grunt
		```
	
	* Grunt的作用：build Tool | 自动化（减少像压缩、编译、单元测试、代码校验这种重复且无业务关联的工作）


## Yeoman使用

### 安装[Generator](http://yeoman.io/generators/)模板

```shell
$ npm install -g -generator-[generator_name]
# 例如npm install -g -generator-angular
```

### 初始化Generator

* 切换到项目目录，初始化一个安装好的模板

	```shell
	$ yo [generator_name] [project_name]
	# 例如yo angular demo1
	```
* 初始化后的项目中有一个**package.json**的文件

	```javascript
	{
		"name": "demo1", //这个是刚刚初始化时候创建的project_name
		"version": "0.0.0", //版本
		"dependencies": {
			//里面是运行环境需要依赖的node包
		},
		"devDependencies": {
			//里面是开发环境用到的node包，例如
			"grunt": "^0.4.1" //包名：版本号[^：比较宽松的版本限制，只限制主版本号][~:比较严格的版本显示，限制第二位的版本号]
		},
		"engines": {
			//指定当前项目所需node的版本
			"node": ">=0.10.0"
		},
		"scripts": {
			//可以直接使用npm运行的脚本命令，例如
			"test": "grunt test", //如果在该项目目录下使用 "npm test"命令，实际上是使用"grunt test"命令
			"install": ""
		}
	}
	```

## Bower使用（包管理器）

### 安装项目中需要用到的组件包

切换到项目目录

```shell
$ bower install [package_name] 
# 如bower i jquery
```

### 如果我们需要的组件比较小众，没有在bower注册怎么办？

bower提供了多种安装方式：

1. 通过github的短写安装
	```shell
	$ bower install [GitHub shorthand]
	# 例如 bower install jquery/jquery
	```
	
2. 通过项目完整的github地址安装

	```shell
	$ bower install [Git endpoint]
	# 例如 bower install https://github.com/jquery/jquery.git
	``` 
	
3. 如果想使用的框架或组件没有在github上
	* 直接通过URL安装

		```shell
		$ bower install [url地址]
		``` 
		
### [搜索在bower注册的包文件](https://bower.io/search/)

### 如何生成bower两个配置文件：
* bower.json 
* .bowerrc
	
	```javascript
	//bowerrc文件大致内容
	{
		"directory": "bower_components", //包文件目录
		"proxy": "http://proxy.tencent.com:8080", //一些公司在开发环境下需要用到的代理
		"https-proxy": "https://proxy.tencent.com:8080", //https的代理
		"timeout": 60000 //设置过时时间，默认60000ms
	}
	```

在当前项目目录输入

```shell
$ bower init
```

根据步骤生成bower.json配置文件

### 如何使用bower下载好的组件

## Grunt
* task
* target
* options

### 初始化Grunt
* 创建一个项目目录（或者切换到老项目）
* 生成一个package.json配置

	```shell
	$ npm init
	```
	
	* 几种license：MIT BSD ISC Apache GPL（按照宽泛程度排序）
* 引入grunt

	```shell
	$ npm install grunt --save-dev
	# 加上--save-dev ，会把当前的引入存入package.json中的"devDependencies"中
	```
	
	```shell
	# 引入grunt插件load-grunt-tasks[整合任务]
	$ npm install load-grunt-tasks --save-dev
	```
	
	```shell
	# 引入grunt插件time-grunt[查看grunt任务运行时间]
	$ npm install time-grunt --save-dev
	```
	
	```shell
	# 引入grunt插件grunt-contrib-copy[文件拷贝]
	$ npm install grunt-contrib-copy --save-dev
	```
	
	```shell
	# 引入grunt插件grunt-contrib-clean[文件删除]
	$ npm install grunt-contrib-clean --save-dev
	```
	
* 配置gruntfile.js
	* 在项目根目录新建一个gruntfile.js
	* 在编辑器中打开gruntfile.js，在头部申明ES5的严格模式

		```javascript
		'use strict';
		```
		
	* grunt的基本框架

		```javascript
		module.exports = function (grunt) {
			//引入插件
			require('load-grunt-tasks')(grunt); 
			require('time-grunt')(grunt);
			
			//路径配置
			var config = {
				app: 'app',
				dist: 'dist'
			}
			
			//任务配置
			grunt.initConfig({
				config: config,
				
				//配置copy命令
				copy: {
					dist: {
						files: [
							{
								expand: true,//表示需要处理动态的src到dest的文件映射
								cwd: '<%= config.app %>/', //源文件夹设置
								src: '**/*.js', //源文件夹下需要处理的文件
								dest: '<%= config.dist %>/', //输出文件夹设置
								ext: '.min.js', //修改输出后缀
								extDot: 'first', //frist表示第一个点后开始输出后缀，last表示最后一个点后开始输出后缀
								flatten: true, //表示将去除源文件中间各目录，直接在输出文件夹中生成文件
								rename: function (dest, src) {
									//rename函数将在最后调用，可以将目标更改目录，修改名称，例如
									return dest + 'js/' + src;
								}
							}
						]
					}
				},
				
				//配置clean命令
				clean: {
					dist: {
						src: ['<%= config.dist %>/**/*'],
						//表示清除dist目录下所有文件和目录]
						
						//额外参数
						filter: function (filepath) {
							return(!grunt.file.isDir(filepath));
							//这边过滤的是非项目目录
						},
						
						dot: true, //true表示会匹配以点开头的文件
						
						matchBase: true
						//matchBase表示只去匹配路径中的basename
						//例如 a?b 现在无法匹配 XXX/abc/XXX 仍可匹配XXX/XXX/abc
					}
				}
			});
		}
		```

### grunt tasks

* grunt serve
	* 在yo创建好的项目目录中输入

		```shell
		$ grunt serve --allow-remote
		# --allow-remote表示允许远程调试，比如在手机上调试页面，可用本机ip访问站点
		```

	* 在yo创建好的项目目录中监听变化

		```shell
		$ grunt watch
		```

* grunt test
	* 在yo创建好的项目目录中输入

		```shell
		$ grunt test
		```
	
	* mocha框架

* grunt build
	* 在项目目录中输入

		```shell
		$ grunt build
		```

* grunt - plugins 开发grunt插件
	
	* 在github上新建一个仓库，命名一般为grunt-[plugin_name]-[author]
	* 在项目目录中安装Yeoman的gruntplugin模板
		
		```shell
		$ npm install -g generator-gruntplugin 
		# 在全局安装gruntplugin模板
		```
		
		```shell
		$ yo gruntplugin [github的项目名] 
		# 在项目目录生成gruntplugin模板
		```
		
	* 制作插件
	* 上传插件到github
	* 生成gh-pages，并将地址加入package.json文件的homepage中
	* 更新编写一下readme里面的配置说明，上传并重新生成gh-pages
	* 在[npmjs网站](https://www.npmjs.com)发布插件
		* 将npm账号添加到本地
			
			```shell
			$ npm adduser
			```
			
		* 复制github-pages中为我们自动生成的插件打包地址，并将其发布到npm上

			```shell
			$ npm publish [插件打包地址]
			```
			
			