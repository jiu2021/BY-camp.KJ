# Git-notes

## 1、创建版本库

创建一个版本库，首先，选择一个合适的地方，创建一个空目录：

```
$ mkdir learngit
$ cd learngit
$ pwd //pwd命令用于显示当前目录
/.../..
```

第二步，通过`git init`命令把这个目录变成Git可以管理的仓库：

```
$ git init
Initialized empty Git repository in /.../...
```

## 2、添加文件到版本库

添加文件到Git仓库，分两步：

1. 使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
2. 使用命令`git commit -m <message>`，完成。

```
$ git add 文件名
//可多次使用该命令，将文件提交到缓冲区

$ git commit -am "提交说明"
//""增强可读性
```

`commit`可以一次提交很多文件，所以可以多次`add`不同的文件

## 3、添加远程库

将github上的库与已有的本地仓库**关联**

```
$ git remote add 远程库指定名(自定义) git@github.com:ssh(推荐)或https地址
```

把本地库内容**推送**到远程库

```
$ git push -u 远程库指定名 master
//-u用于第一次推送，之后推送可省略
```

**查看**远程库信息

```
$ git remote -v
远程库指定名  git@github.com:..
origin  git@github.com:..
```

**删除**远程库

```
$ git remote rm origin
```

此处的“删除”其实是解除了本地和远程的绑定关系，并不是物理上删除了远程库。远程库本身并没有任何改动。要真正删除远程库，需要登录到GitHub，在后台页面找到删除按钮再删除。

## 4、克隆到本地库

在一目录下启动git，远程库已有，用命令`git clone`**克隆**一个本地库：

```
$ git clone git@github.com:ssh(推荐)或https地址
```

进入该目录看看

```
$ cd 目录名
$ ls
目录文件
```

## 5、本地库文件操作

### `git log`命令

显示从最近到最远的提交日志

如果嫌输出信息太多，看得眼花缭乱的，可以试试加上`--pretty=oneline`参数

穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本

### `git reflog`命令

要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

### $ git reset --hard HEAD命令

首先，Git必须知道当前版本是哪个版本，在Git中，用`HEAD`表示当前版本，也就是最新的提交`1094adb...`（上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。）

### $ git reset --hard 版本号命令

版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。

### git status 命令

git status 命令用于查看在你上次提交之后是否有对文件进行再次修改

