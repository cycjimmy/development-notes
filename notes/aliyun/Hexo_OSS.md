# 将hexo静态博客部署到阿里云OSS

## 创建并配置OSS
根据官方的指引，创建一个bucket。博客一开始不会有什么人看的，所以存储类型选择低频访问就好，读写权限要选择公共读。
设置静态页面，默认首页填index.html，404也填index.html即可。
开通RAM服务，获取用户的accesskey和secret。

## 上传博客内容至阿里云OSS
使用插件 [hexo-deployer-aliyun](https://github.com/yedaodao/hexo-deployer-aliyun)
在 `_config.yml` 中配置插件
```yaml
deploy:
  type: aliyun
  bucket: cyc-tech-site  # <yourBucketName> 
  region: oss-cn-shanghai # <yourOSSregion>
  accessKeyId: # <yourAccessKeyId>
  accessKeySecret: # <yourAccessKeySecret>
```

## 相关
* [将hexo静态博客部署到阿里云OSS上](https://yq.aliyun.com/articles/653541)