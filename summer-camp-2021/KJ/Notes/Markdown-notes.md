

# markdown-notes

## 1.代码

可以用 **```** 包裹**一段代码**，并指定一种语言（也可以不指定）

```javascript
//代码块语法：
​```(语言)
(注:英文状态下)
```

如果是**段落上的一个函数或片段的代码**可以用反引号把它包起来（**`**）

```javascript
`printf（）`函数
```

`printf（）`函数

## 2、标题

```javascript
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
注：#号后一个空格
(Ctrl+shift+1)显示层级结构
```

## 3、段落

```javascript
//换行
段落的换行是使用两个以上空格加上回车
//分割线
在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西，你也可以在星号或是减号中间插入空格
//脚注
脚注的格式如下:
[^要注明的文本]
```

添加脚注[^Markdown]

[^Markdown ]:   KJ的markdown笔记

## 4、字体

```javascript
//加粗
**加粗部分**
//删除线
~~删除部分~~
//斜体
*斜体内容*
//下划线
下划线可以通过 HTML 的 <u> 标签来实现：
<u>带下划线文本</u>
```

**加粗部分**

~~删除部分~~

*斜体内容*

## 5、列表

**无序列表**使用星号(*****)、加号(**+**)或是减号(**-**)作为列表标记，这些标记后面要添加一个空格，然后再填写内容：

```javascript
* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项

- 第一项
- 第二项
- 第三项
```

* 第一项
* 第二项
* 第三项

**有序列表**使用数字并加上 **.** 号来表示，如：

```javascript
1. 第一项
2. 第二项
3. 第三项
注：前面数字可以无序
```

1. 第一项
2. 第二项
3. 第三项

**列表嵌套**只需在子列表中的选项前面添加**四个空格**即可：

```javascript
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
```

1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素

## 6、Markdown 区块

**Markdown 区块引用**是在段落开头使用 **>** 符号 ，然后后面紧跟一个**空格**符号：

```javascript
>引用内容
 引用内容
```

>引用内容
> 引用内容

另外**区块是可以嵌套**的，一个 **>** 符号是最外层，两个 **>** 符号是第一层嵌套，以此类推：

```javascript
> 最外层
> > 第一层嵌套
> > > 第二层嵌套
```

> 最外层
> > 第一层嵌套
> >
> > > 第二层嵌套

**区块中使用列表**

```javascript
> 区块中使用列表
> 1. 第一项
> 2. 第二项
> + 第一项
> + 第二项
>+ 第三项
```

> 区块中使用列表
> 1. 第一项
> 2. 第二项
> + 第一项
> + 第二项
> + 第三项

如果要在列表项目内放进区块，那么就需要在 **>** 前添加**四个空格**缩进

```javascript
* 第一项
    > 冰岩作坊
    > 夏令营2021
* 第二项
```



* 第一项
    > 冰岩作坊
    > 夏令营2021
* 第二项

## 7、Markdown链接

链接使用方法

```javascript
[链接名称](链接地址)

或者

<链接地址>
```

[*markdown* - 百度百科](https://www.baidu.com/link?url=70jpf8AncrIfT59TSQfd6JUpOtQ5Ki7H3jptXhFtbvYccYo1LmW-_3NzuMZgxInvbE8M88SkAEe3bh5tUamd92K9xIM91XW0h13d33oyF63&wd=&eqid=c46d532600072eb80000000460e3ed75)

**高级链接**

我们可以通过变量来设置一个链接，变量赋值在文档末尾进行

```javascript
这个链接用 1 作为网址变量 [Google][1]
这个链接用 runoob 作为网址变量 [Runoob][runoob]
然后在文档的结尾为变量赋值（网址）
  [1]: http://www.google.com/
  [runoob]: http://www.runoob.com/
```

这个链接用 1 作为网址变量 [Google][1]
这个链接用 runoob 作为网址变量 [Runoob][runoob]
然后在文档的结尾为变量赋值（网址）
[1]: http://www.google.com/
[runoob]: http://www.runoob.com/

## 8、Markdown图片

Markdown 图片语法格式如下：

- 开头一个感叹号 !
- 接着一个方括号，里面放上图片的替代文字
- 接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上选择性的 'title' 属性的文字。

```javascript
![alt 属性文本](图片地址)

![alt 属性文本](图片地址 "可选标题")![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png)
```

![RUNOOB 图标](http://static.runoob.com/images/runoob-logo.png)

可以像网址那样对图片网址使用**变量**:

```javascript
这个链接用 1 作为网址变量 [RUNOOB][1].
然后在文档的结尾为变量赋值（网址）

[1]: http://static.runoob.com/images/runoob-logo.png
```

这个链接用 1 作为网址变量 [RUNOOB][1].
然后在文档的结尾为变量赋值（网址）

[1]: http://static.runoob.com/images/runoob-logo.png

Markdown 还没有办法指定图片的高度与宽度，需要的话，你可以使用普通的 <img> 标签

```javascript
<img src="http://static.runoob.com/images/runoob-logo.png" width="30%">
```

<img src="http://static.runoob.com/images/runoob-logo.png" width="30%">

## 9、更多

Markdown表格、流程图、时序图(顺序图)、甘特图参考菜鸟教程网

[菜鸟教程-Markdown](https://www.runoob.com/markdown/md-advance.html)

