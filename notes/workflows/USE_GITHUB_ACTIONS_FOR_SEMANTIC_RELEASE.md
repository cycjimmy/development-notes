# 使用 Github Actions 进行自动化版本发布
## 配置 [semantic-release-action](https://github.com/cycjimmy/semantic-release-action)
semantic-release-action 是一个运行 [Semantic Release](https://github.com/semantic-release/semantic-release) 的 GitHub Action.

### 使用方法
#### 步骤1：在您的仓库中设置 [Semantic Release的配置文件](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration) , 如不进行设置将使用 Semantic Release 的默认配置
#### 步骤2: 在您的 Github 仓库中为 [Semantic Release 身份认证](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/ci-configuration.md#authentication) 添加 [Secrets](https://help.github.com/en/articles/virtual-environments-for-github-actions#creating-and-using-secrets-encrypted-variables) , 以保证权限正常
#### 步骤3：将 [工作流文件](https://help.github.com/en/articles/workflow-syntax-for-github-actions) 添加到您的仓库，来创建自定义的自动化流程。
* semantic-release-action 支持以下输入:
  * `branch`: [可选] 设定应该在哪个分支上进行发布。它将覆盖你配置文件中的branch属性。如果在此处或者你的配置文件中都没有配置该属性，则默认用 master 分支进行发布
  * `semantic_version`: [可选] 指定需要使用的 semantic-release 版本范围
  * `extra_plugins`: [可选] 用于预安装额外的 semantic-release 插件，可以指定插件的版本范围
  * `dry_run`: [可选] 是否在 `dry-run` 模式下运行语义发布，它将覆盖您配置文件中的 dryRun 属性
* semantic-release-action 支持输出以下变量（如需使用输出变量，需要事先给您的任务分配一个id，可以看后面的进阶例子）:
  * `new_release_published`: 是否发布了新版本，返回 `true` 或者 `false`
  * `new_release_version`: 新版本的版本号
  * `new_release_major_version`: 新版本的主要版本号
  * `new_release_minor_version`: 新版本的次要版本号
  * `new_release_patch_version`: 新版本的补丁版本号

一个简单的例子
```yaml
steps:
  - name: Semantic Release
    uses: cycjimmy/semantic-release-action@v2
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

一个进阶的例子
```yaml
steps:
  - name: Semantic Release
    uses: cycjimmy/semantic-release-action@v2
    id: semantic   # 您需要一个`id`来使用输出变量
    with:
      branch: master
      semantic_version: 15.13.28
      # 在这里，您可以为 semantic-release 插件指定版本范围，也可以不指定
      extra_plugins: |
        @semantic-release/git
        @semantic-release/changelog@3.0.0
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
      
  - name: Do something when a new release published
    if: steps.semantic.outputs.new_release_published == 'true'
    run: ...
```

### 老仓库使用 Semantic Release
手动将上次发布的版本打上tag
例如, 发布分支为 `master`, 上一次发布的版本为 `1.1.0`，该版本的提交sha值为 `1234567`，确认该提交已经打上 `v1.1.0` 的标签
```shell
# Make sure the commit 1234567 is in the release branch history
$ git branch --contains 1234567

# If the commit is not in the branch history it means that either:
# - you use a different branch than the one your release from before
# - or the commit sha has been rewritten (with git rebase)
# In both cases you need to configure your repository to have the last release commit in the history of the release branch

# List the tags for the commit 1234567
$ git tag --contains 1234567

# If v1.1.0 is not in the list you add it with
$ git tag v1.1.0 1234567
$ git push origin v1.1.0
```

## [代码提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
### 使用 Commitizen
安装
```shell
$ npm install -g commitizen cz-conventional-changelog
```

全局配置，创建一个 `.czrc` 文件在你的 `home` 目录，并将 `path` 指向上面所安装的 commitizen 适配器，使其支持 Angular 的 Commit message 格式
```shell
$ echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

如需项目级别配置，可在项目目录里，运行下面的命令
```shell
$ commitizen init cz-conventional-changelog --save --save-exact
```

用以下命令代替 `git commit -m` 命令
```shell
$ git cz
```

配置好 commitizen 后的新流程为:
```shell
# 事先拉取更新
$ git pull

# 开发修改，完成后git add
$ git add .

# 提交代码
$ git cz

# 推送代码
$ git push
```

### Commit Message 格式
```text
<type>(<scope>): <subject>
<空一行>
<body>
<空一行>
<footer>
```
* `<type>`
  * `feat`: 新功能（feature）
  * `fix`: 修补bug
  * `docs`: 文档（documentation）
  * `style`: 格式（不影响代码运行的变动）
  * `refactor`: 重构（即不是新增功能，也不是修改bug的代码变动）
  * `perf`: 更改代码以提高性能
  * `test`: 添加测试
  * `chore`: 构建过程或辅助工具的变动
* `<scope>`: 选填项，用来说明本次提交的影响的范围，如 `$location`, `$browser`。当更改影响的范围不止一个时，可以使用 `*`
* `<subject>`: 用来简要描述本次改动，尽量遵循:
  * 以动词开头，使用第一人称现在时，比如`change`，而不是`changed`或`changes`
  * 首字母不要大写
  * 结尾不用句号 `.`
* `<body>`: 对 `<subject>` 的描述
* `<footer>`: 主要放置**不兼容变更**和**关闭Issue**的信息
  * 不兼容变更: 以 `BREAKING CHANGE: ` 开头，描述变动、变动理由和迁移方法。
  * 关闭Issue: 如`close #123`

#### 特殊格式
* Revert: 此外如果需要撤销之前的Commit，那么本次Commit Message中必须以 `revert：` 开头，后面紧跟前面描述的`Header`部分，格式不变。并且，`<body>`部分的格式也是固定的，必须要记录撤销前Commit的SHA值。

#### 以下是一些提交的例子
##### feat
```text
feat($browser): onUrlChange event (popstate/hashchange/polling)

Added new event to $browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```
```text
feat(directive): ng:disabled, ng:checked, ng:multiple, ng:readonly, ng:selected

New directives for proper binding these attributes in older browsers (IE).
Added coresponding description, live examples and e2e tests.

Closes #351
```
```text
feat($compile): simplify isolate scope bindings

Changed the isolate scope binding options to:
  - @attr - attribute binding (including interpolation)
  - =model - by-directional model binding
  - &expr - expression execution binding

This change simplifies the terminology as well as
number of choices available to the developer. It
also supports local name aliasing from the parent.

BREAKING CHANGE: isolate scope bindings definition has changed and
the inject option for the directive controller injection was removed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
  myBind: 'bind',
  myExpression: 'expression',
  myEval: 'evaluate',
  myAccessor: 'accessor'
}

After:

scope: {
  myAttr: '@',
  myBind: '@',
  myExpression: '&',
  // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
  myAccessor: '=' // in directive's template change myAccessor() to myAccessor
}

The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

##### fix
```text
fix($compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```
```text
fix(package): update read-pkg-up to version 7.0.0
fix: clarify message for EGITNOPERMISSION error
```

##### docs
```text
docs(guide): updated fixed docs from Google Docs

Couple of typos fixed:
- indentation
- batchLogbatchLog -> batchLog
- start periodic checking
- missing brace
```
```text
docs: fix grammar
docs: corrections and further clarifications 
docs: update broken link
docs(README): update version number
docs(README): place badge
docs(inputs): remove redundant defaults
```

##### style
```text
style: fix table indentation
style($location): add couple of missing semi colons
```

##### refactor
```text
refactor: remove unnecessary object destructuring
refactor: use `Object.entries` rather than `Object.keys`
```

##### perf
```text
perf(*): Update network configuration
```

##### test
```text
test: clarify variables name
test(testRelease): set schedule test
```

##### chore
```text
chore(package): update xo to version 0.25.0
chore(package): remove commitizen from our dependencies
chore(*): transfer repo to cycjimmy
```

##### revert
```text
revert: "fix: do not convert ssh `repositoryUrl` to https"

This reverts commit b895231.
```

## 相关文档
* [semantic-release-action](https://github.com/cycjimmy/semantic-release-action)
* [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
