# 使用 Semantic Release
## 部署[semantic-release-action](https://github.com/cycjimmy/semantic-release-action)

## [代码提交规范](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
### 使用 Commitizen
安装
```shell
$ npm install -g commitizen cz-conventional-changelog
```

在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式
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

#### 一些提交的例子
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
* [Git 提交 message 规范](https://zyf.im/2019/06/04/git-commit-message-style-guide/)
* [Commitizen的安装和使用（标准化Git的Commit Message）](https://www.jianshu.com/p/d264f88d13a4)
* [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
