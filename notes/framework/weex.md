# Weex (淘宝开源框架)

文档：[http://alibaba.github.io/weex/doc/](http://alibaba.github.io/weex/doc/)

### 安装Weex Playground

下载地址： [http://alibaba.github.io/weex/download.html](http://alibaba.github.io/weex/download.html)

### 安装 Weex 命令行

‘’‘c
npm install -g weex-toolkit
’‘’

### 查看帮助

‘’‘c
weex --help
’‘’

‘’‘c
Usage: weex foo/bar/we_file_or_dir_path  [options]
Usage: weex create [name]  [options]

Options:
  --qr          display QR code for native runtime, default action     [boolean]
  -o, --output  transform weex we file to JS Bundle, output path must specified
                (single JS bundle file or dir)
                [for create sub cmd]it specified we file output path
                                                 [default: "no JSBundle output"]
  --watch       using with -o , watch input path , auto run transform if change
                happen
  -s, --server  start a http file server, weex .we file will be transforme to JS
                bundle on the server , specify local root path using the option
                                                                 [default: null]
  --port        http listening port number ,default is 8081        [default: -1]
  --wsport      websocket listening port number ,default is 8082   [default: -1]
  -f, --force   [for create sub cmd]force to replace exsisting file(s) [boolean]
  --help        Show help                                              [boolean]
  -h, --host                                              [default: "127.0.0.1"]
’‘’


### 新建.we文件

进入相应目录

‘’‘c
weex create [name]
'''

回车即新建了一个名为\[name\].we的文件


### 测试.we文件

编写完.we后，在命令行输入

’‘’c
weex [name].we
‘’‘

运行\[name\].we，并生成一个二维码，通过Weex Playground的二维码扫描功能对页面进行加载





***

正在研究中，逐步更新……


