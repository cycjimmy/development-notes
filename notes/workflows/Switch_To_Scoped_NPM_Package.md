# Switch to scoped NPM package

* 克隆老仓库
* 新仓库添加Secrets: NPM_PACKAGE_TOKEN
* 新仓库激活Actions
* 增加Github Action设置
* [travis](https://travis-ci.org/)站点设置变更
* 检查包名是否为中划线命名
* `.npmignore`更新
* `README.md`中关于老包信息变更为新包
* `package.json`变更相关信息
* `package.json`删除`prepare`任务
* 检查`.travis.yml`是否使用到`prepare`任务
* 检查Test项目路径是否正确
* 提交更新，查看是否成功
* npm废弃老包

```shell
$ npm deprecate [老包名] "This package has been migrated to [新包名] for scoped NPM package. Please switch to [新包名] to stay up to date."
```

* Github上Archived老仓库