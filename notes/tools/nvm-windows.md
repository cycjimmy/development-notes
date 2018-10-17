# windows 使用 nvm 管理 node 版本

> NVM (Node Version Manager): NodeJs 的版本管理工具

## 安装
* 卸载原先的 node
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

