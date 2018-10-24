# windows 使用 nvm 管理 node 版本

> NVM (Node Version Manager): NodeJs 的版本管理工具

## 安装
* 完全卸载原先的 node
  * 使用卸载程序从程序和功能中卸载
  * 重新启动
  * 查找这些文件夹并删除它们(及其内容)(如果有的话):
    * `C:\Program Files (x86)\Nodejs`
    * `C:\Program Files\Nodejs`
    * `C:\Users\{User}\AppData\Roaming\npm` (或 `%appdata%\npm` )
    * `C:\Users\{User}\AppData\Roaming\npm-cache` (或 `%appdata%\npm-cache` )
    * `C:\Users\{User}\.npmrc` (并且可能检查没有 `.` 前缀的那个)
    * `C:\Users\{User}\AppData\Local\Temp\npm-*`
  * 检查 `%PATH%` 环境变量以确保没有引用 `Nodejs` 或 `npm`
  * 重新启动(推荐)
* 下载 windows 版本 nvm 安装程序 [nvm-setup.zip](https://github.com/coreybutler/nvm-windows/releases)
* 直接安装
  * **安装路径和 nodeJs 路径避免存在空格**
* 安装完成后在命令行输入 nvm 验证安装成功
* 常用命令
  ```shell
  # 查看已安裝的Node版本
  $ nvm list

  # 查看提供哪些Node版本
  $ nvm list available

  # 安裝指定的Node版本
  $ nvm install [version]
  $ nvm install [latest]

  # 卸载指定的Node版本
  $ nvm uninstall [version]

  # 指定使用Node版本
  $ nvm use [version]
  ```

## 卸载 nvm
直接使用 nvm 目录下的卸载程序 `unins000.exe` 进行卸载即可

