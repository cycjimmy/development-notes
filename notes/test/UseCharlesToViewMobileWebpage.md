# 使用Charles查看手机网页

## Install Charles

## Usage
* 打开Charles，选择菜单项的Proxy->Proxy Settings，设置Port端口，如8888。
* 乱码解决
  * 菜单Help->SSL Proxying->Install Charles Root Certificate
  * 信任Charles proxy CA
  * 菜单Proxy->SSL Proxy Settings
    * SSL Proxying->Add
      * Host: `*`
      * Port: `443`
    * Client Certificates->Add
      * Host: `*`
      * Port: `*`
* 手机安装SSL证书
  * 菜单Help -> SSL Proxying ->Install Charles Root Certificate on a Mobile Device…
  * 设置Wi-Fi手动HTTP代理，Host为PC的IP，Port为Charles上设置的端口号
  * 在手机浏览器打开`chls.pro/ssl`地址，下载安装证书
