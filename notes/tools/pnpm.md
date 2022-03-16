# pnpm软件包管理器

## 安装与升级

### 安装

```shell
# 使用brew安装 
$ brew install pnpm

# 使用npm安装（推荐）
$ npm install -g pnpm
# 或
$ npx pnpm add -g pnpm
```

### 升级

```shell
$ pnpm add -g pnpm
```

## 命令

```shell
# 安装项目的所有依赖项
$ pnpm install

# 安装软件包以及其依赖
# -D 保存到 devDependencies 配置项下
# -O 保存到 optionalDependencies 配置项下
# -g 安装软件包到全局环境中
$ pnpm add [package name]
$ pnpm add -D [package name]
$ pnpm add --save-peer [package name] 
$ pnpm add -O [package name]
$ pnpm add -g [package name]

# 更新软件包
# --latest 忽略 package.json 中指定的范围
$ pnpm update
$ pnpm update --latest
```

## npm迁移pnpm

几乎不用改动, 安装 `pnpm`, 移除 `node_modules` 文件夹, `pnpm install`即可
