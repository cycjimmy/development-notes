# Homebrew
官网：https://brew.sh/

## 安装
```shell script
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 使用阿里云镜像
```shell script
# 替换brew.git:
$ cd "$(brew --repo)"
$ git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

# 替换homebrew-core.git:
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

# 应用生效
$ brew update

# 替换homebrew-bottles:
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile
```

## 常用命令
```shell script
$ brew search PKG_NAME
$ brew install PKG_NAME
$ brew info PKG_NAME
$ brew uninstall PKG_NAME
$ brew cask install APP_NAME
```

## 临时使用代理
```shell script
$ export ALL_PROXY=socks5://127.0.0.1:5555
$ brew upgrade
```

## 一些应用安装的坑
### 一些正常安装
```shell script
$ brew cask install iterm2
$ brew cask install sublime-text
$ brew cask install dash
```

### nvm
```shell script
$ brew install nvm

$ vim .bash_profile
# .bash_profile增加下面这两行
export NVM_DIR="$HOME/.nvm"
source $(brew --prefix nvm)/nvm.sh

# 更新 nvm
$ brew upgrade nvm
```

## 参考
* [使用Mac开发的程序员必会的神器Homebrew](https://www.jianshu.com/p/cff63f12e2ea)
* [阿里云Homebrew 镜像](https://developer.aliyun.com/mirror/homebrew)
