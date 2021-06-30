# wget
官网文档：https://www.gnu.org/software/wget/manual/wget.html

## 安装(macOS)
```shell script
# 事先安装brew
$ brew install wget
```

## 使用
```shell script
# 抓取整站
$ wget --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16" --limit-rate=300k --mirror -p --convert-links -P ./ https://www.xxx.com

# 抓取第一级
$ wget -l 1 -p -np -e robots=off -k https://www.xxx.com
```

## 参考
* [wget 使用教程，整站下载 网站镜像等](https://ycb.hk/archives/160.html)
* [wget 命令_Wget命令教程](https://blog.csdn.net/cunjiu9486/article/details/109074051)
