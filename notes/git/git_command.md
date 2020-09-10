# Git Command

##  创建版本库
```shell
$ git clone <url>        # 克隆远程版本库
$ git init               # 初始化本地版本库
```

## 修改和提交
```shell
$ git status                           # 查看状态
$ git diff                             # 查看变更内容
$ git add .                            # 跟踪所有改动过的文件
$ git add <file>                       # 跟踪指定文件
$ git mv <old> <new>                   # 文件改名
$ git rm <file>                        # 删除文件
$ git rm --cached <file>               # 停止跟踪文件但不删除
$ git commit -m "commit message"       # 提交所有更新过的文件
$ git commit --amend                   # 修改最后一次提交
```

## 查看提交历史
```shell
$ git log                 # 查看提交历史
$ git log -p <file>       # 查看指定文件的提交历史
$ git blame <file>        # 以列表方式查看指定文件的提交历史
```

## 撤销
```shell
$ git reset --hard HEAD         # 撤销工作目录中所有未提交文件的修改内容
                                # --hard要慎用
$ git reset HEAD^               # 回退所有内容到上一个版本
$ git reset HEAD^ <file>        # 回退指定文件的版本到上一个版本
$ git reset –soft HEAD~3        # 向前回退3个版本
$ git reset –hard origin/master # 将本地的状态回退到和远程的一样
$ git reset <commit>            # 回退到某个版本

$ git commit --amend            # 修改最后一次提交。
                                # 用于修改上一次的提交信息，或漏提交文件等情况。
$ git checkout -- <file>
$ git checkout HEAD <file>      # 撤销指定的未提交文件的的修改内容

$ git revert <commit>           # 撤销指定的提交
$ git revert HEAD               # 回退到上一次提交的状态
                                # 按照某一次的commit完全反向的进行一次commit
                                # 代码回滚到上个版本，并提交git
```

## 分支与标签
```shell
$ git branch                                      # 显示所有本地分支
$ git checkout <branch/tag>                       # 切换到指定分支或标签
$ git branch <new-branch>                         # 创建新分支
$ git branch -d <branch>                          # 删除本地分支
$ git branch (-m|-M) <old branch> <new branch>    # 删除本地分支
                                                  # -M: 强制重命名
                                                  # 如重命名远程分支:
                                                  # 删除远程待重命名分支，重新push本地新分支
$ git checkout -b <new-branch> <existing-branch>  # 基于已有分支，创建新分支
$ git tag                                         # 列出所有本地标签
$ git tag <tag-name>                              # 基于最新提交创建标签
$ git tag -d <tag-name>                           # 删除标签
```

## [release](https://github.com/zeit/release) 基本流程
```shell
$ git status                           # 查看状态
$ git tag <tag-name>                   # 基于最新提交创建标签
$ git push --tags                      # 上传所有标签
$ release                              # 发行版本(需事先安装release包 https://github.com/zeit/release)
```

## 合并
```shell
$ git merge <branch>          # 合并指定分支到当前分支
$ git rebase <branch>         # 衍合指定分支到当前分支
```

## 远程操作
```shell
$ git remote -v                            # 查看远程版本库信息
$ git remote show <remote>                 # 查看指定远程版本库信息
$ git remote add <remote> <url>            # 添加远程版本库
$ git fetch <remote>                       # 从远程库获取代码
$ git pull <remote> <branch>               # 下载代码及快速合并
$ git push <remote> <branch>               # 上传代码及快速合并
$ git push <remote> :<branch/tag-name>     # 删除远程分支或标签
$ git push --tags                          # 上传所有标签
```

## 自由修改提交树
```shell
$ git cherry-pick <ref> [ <ref>...]     # 复制一些提交到HEAD指针下 
¥ git rebase --interactive(-i) <ref>    # 交互式rebase
```

## 排错
```shell
# .gitignore is not working
$ git rm -r --cached .
$ git add .
$ git commit -m "fixed untracked files"
```

## 删除Git仓库中的大文件
```shell
# 查看空间占用
$ git count-objects -v    # 查看 git 相关文件占用的空间
$ du -sh .git             # 查看 .git 文件夹占用磁盘空间

# 找到仓库记录中的大文件
$ git rev-list --objects --all | grep "$(git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -10 | awk '{print$1}')"

# 重写这些大文件涉及到的所有提交
$ git filter-branch --index-filter "git rm --cached --ignore-unmatch '<file/dir>'" -- --all

# 删除引用并重新打包
$ rm -Rf .git/refs/original
$ rm -Rf .git/logs
$ git gc
$ git prune

# 同步远程仓库
$ git push origin --force --all
```

## 清空历史记录只保留最终版本(一般在归档前使用)
### 存至原仓库
```shell
# 丢掉历史记录并提交
$ git checkout --orphan latest_branch
$ git add -A
$ git commit -m "archive"

# 删除主分支
$ git branch -D master

# 将当前分支重命名
$ git branch -m master

# 强制更新存储库
$ git push -f origin master
```

### 存至新仓库
```shell
# 丢掉历史记录并提交
$ git checkout --orphan latest_branch
$ git add -A
$ git commit -m "archive"

# 建立新仓库，并新增远程地址，执行推送
$ git remote add upstream https://github.com/yourName/yourRepositoryUrl.git
$ git push upstream latest_branch:master

# 删除远程地址
$ git remote remove upstream
```
