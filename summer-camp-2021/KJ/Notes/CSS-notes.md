# CSS-notes

### 1、基础选择器

#### 1、类选择器（最常用）

```css
<class="类名">
.类名 {
}
//类名不能以数字开头
```

#### 2、标签选择器

```css
标签名 {
}
```

#### 3、id选择器

```css
<id="id名">
#id名 {
}
//每个id属性在每个html文档中只能被调用一次
//id名不能以数字开头
```

#### 4、通配符选择器

```css
* {
}
//选择所有标签
```

### 2、字体属性

```css
字号：font-size
//必须带单位，通常是px，谷歌默认16px
字体：font-family
//实际工作按团队要求写
字体粗细：font-weight
//加粗为700或bold 不加粗为400或normal，数字不用跟单位
字体样式：font-style
//不倾斜为normal 倾斜为italic，工作常用normal
字体连写：font
//严格按照顺序：
//style weight size/line-height family
//必须设定size和family
```

### 3、文本属性

```css
文本颜色：color
//常用十六进制形式 #ffffff
文本对齐：text-align
//水平对齐方式 center left right
文本缩进：text-indent
//首行缩进 绝对法:50px 相对法：2em
文本修饰：text-decoration
//添加下划线underline 取消下划线none
行高：line-hight=上＋下＋字体大小
//单位px
```

### 4、CSS引入方式

```css
//外部样式表(最多)
<link rel="stylesheet" href="CSS文件名"
//HTML页面<head>标签内引入，CSS文件中直接写入属性

//内部样式表
<style> 属性 </style>

//行内样式表
<p style="属性"> </p>
```









