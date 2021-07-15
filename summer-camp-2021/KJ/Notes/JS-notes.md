# JS-notes

### 1、语法

### 2、变量和赋值

标识符和变量名：

一些标识符是“保留关键字”——他们是语法的一部分，不能用作变量名：

> arguments break case catch class const continue debugger default delete do else enum eval export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield

从技术上讲，下面三个标识符不是保留字，但也不应该作为变量名：

> Infinity NaN undefined

### 3、值

JavaScript有所有我们期待的编程语言值类型：布尔，数字，字符串，数组等。JavaScript中的所有值都有属性。每个属性有一个键（或名字）和一个值。参考记录的域（fields of record）。你可以使用点（.）操作符读取属性：

```
value.propKey
```

点操作符也可以用来给属性赋值：

```
 > var obj = {};  // 空对象
 > obj.foo = 123; // 创建属性“foo”，设置它为123
   123
 > obj.foo
   123
```

你也可以通过它（.）调用方法：

```
> 'hello'.toUpperCase()
  'HELLO'
```

上面，我们在值“hello”上面调用方法 toUpperCase()。

### 4、原始类型值和对象

JavaScript定义了不同值之间的区别：

- 原始值包括：boolean，number，string，null和undefined，
- 所有其他的值都是对象。实际上对象被定义为——所有不为原始值的值。

两者之间的主要区别在于他们是如何被比较的：每一个对象有一个独一无二的标志，并且仅和自己相等：

```
> var obj1 = {};  // 一个空对象
> var obj2 = {};  // 另一个空对象
> obj1 === obj2
  false
> obj1 === obj1
  true
```

相反，所有原始值只要编码值相同就被认为是相同的：

```
> var prim1 = 123;
> var prim2 = 123;
> prim1 === prim2
  true
```

#### 1、原始类型值

下面全是原始类型值（简称：原始值）：

- [布尔类型](http://yanhaijing.com/basejs/#sect_booleans)：true，false
- [数字类型](http://yanhaijing.com/basejs/#sect_numbers)：1736，1.351
- [字符串类型](http://yanhaijing.com/basejs/#sect_strings): ‘abc’，”abc”
- 两个“[无值（non-values）](http://yanhaijing.com/basejs/#sect-non-values)”：undefined，null

原始值的特征：

- **值做比较时：**“内容”做比较。

  ```
    > 3 === 3
      true
    > 'abc' === 'abc'
      true
  ```

- **无法更改：**值的属性无法更改，无法添加和移除属性。

  ```
    > var str = 'abc';
    > str.foo = 3; // try to create property `foo` ⇒ no effect
    > str.foo  // unknown property
      undefined 
  ```

  (获取未知属性总返回undefined)

- **原始值的集合是固定的（fixed set of values）：**你不能自定义原始值。

#### 2、对象

所有非原始值（non-primitive）的值都是对象。最常见的几种对象类型是：

- [简单对象](http://yanhaijing.com/basejs/#sect_objects)（类型是Object）能通过对象字面量创建：

  { firstName: ‘Jane’, lastName: ‘Doe’ }

  上面的对象有两个属性：`firstName`属性的值是“Jane”，`lastName`属性的值是“Doe”。

- [数组](http://yanhaijing.com/basejs/#sect_arrays)（类型是 Array）能通过数组字面量创建：

  [ ‘apple’, ‘banana’, ‘cherry’ ]

  上面的数组有三个元素，可以通过数字索引访问。例如“apple”的索引是0.

- [正则表达式对象](http://yanhaijing.com/basejs/#sect_regexp)（类型是 RegExp）能通过正则表达式字面量创建。

  /^a+b+$/

对象的特征：

- **比较的是引用：**比较的是标识符，每个值有自己的标识符。

  ```
    > {} === {}  // 两个不同的空对象
      false
  	
    > var obj1 = {};
    > var obj2 = obj1;
    > obj1 === obj2
      true
  ```

- **默认可以更改。**

  ```
     > var obj = {};
     > obj.foo = 123;
     > obj.foo
       123
  ```

-** 用户可扩展（user-extensible）：**你可以通过[构造函数](http://yanhaijing.com/basejs/#sect_constructors)定义新的对象类型。

所有的数据结构（如[数组](http://yanhaijing.com/basejs/#sect_arrays)）都是对象，但并不是所有的对象都是数据结构。例如：[正则表达式是对象](http://yanhaijing.com/basejs/#sect_regexp)，但不是数据结构。

####  3、undefined 和 null

多少有些不必要，JavaScript有两个“无值（non-values）”：undefined 和 null。

- undefined的意思是“没有值（no value）”。未初始化的变量是undefined：

  ```
    > var foo;
    > foo
    undefined
  ```

  读取不存在的属性时，将返回undefined：

  ```
    > var obj = {}; // 空对象
    > obj.foo
      undefined
  ```

  缺省的参数也是undefined：

  ```
    > function f(x) { return x }
    > f()
      undefined
  ```

- null的意思是“没有对象（no object）”。它被用来表示对象的无值（参数，链上的对象等）。

通常情况下你应该把undefined和null看成是等价的，如果他们代表相同意义的无值的话。检查他们的一种方式是通过严格比较：

```
if (x === undefined || x === null) {
    ...
}
```

另一种在实际中使用的方法是认为undefined 和 null 都是[false](http://yanhaijing.com/basejs/#sect_truthy_falsy)：

```
if (!x) {
    ...
}
```

**警告：**false，0，NaN 和 “” 都被当作false。

#### 4、包装类型

对象类型的实例Foo（包括内建类型，例如Array和其他自定义类型）从对象Foo.prototype上获取方法。你可以通过读取这个方法的方式（不是调用）验证这点：

```
> [].push === Array.prototype.push
  true
```

相反，原始类型是没有类型的，所以每个原始类型有一个关联类型，称之为包装类型：

- 布尔值的包装类型是 Boolean。布尔值从Boolean.prototype上获取方法：

  ```
    > true.toString === Boolean.prototype.toString
  	true
  ```

  注意包装类型名字的首字母是大写的B。如果在JavaScript中布尔值的类型可以访问，那么它可能会被转换为布尔对象。

- 数字值的包装类型是Number。

- 字符串值的包装类型是String。

包装类型也有实例（他们的实例是对象），但不常用。相反，包装类型有其他用处：如果你将他们作为函数调用，他们可以将值转换为原始类型。

```
> Number('123')
  123
> String(true)
  'true'
```

#### 5、通过typeof和instanceof将值分类

有两个操作符可以用来将值分类：typeof 主要用于原始值，instanceof 主要用于对象。

**typeof** 使用方法如下：

```
typeof «value»
```

`typeof`返回描述 value “类型”的一个字符串。例如：

```
> typeof true
  'boolean'
> typeof 'abc'
  'string'
> typeof {} // 空对象字面量
  'object'
> typeof [] // 空数组字面量
  'object'
```

下面列出了typeof操作的所有结果：

| **操作数**       | **结果**      |
| ---------------- | ------------- |
| `undefined`      | `'undefined'` |
| `null`           | `'object'`    |
| Boolean value    | `'boolean'`   |
| Number value     | `'number'`    |
| String value     | `'string'`    |
| Function         | `'function'`  |
| All other values | `'object'`    |

有两个结果和我们上面说的的原始值与对象是矛盾的：

- 函数的类型是“function”而不是“object”。鉴于函数（类型为“function”）是对象（类型是对象）的子类型，这不是一个错误。
- null的类型是“object”。这是一个bug，但从没被修复，因为修复后会破坏现有的代码。

**instanceof**使用方法如下：

```
«value» instanceof «Constr»
```

如果 value 是一个对象，并且value 是由构造函数Constr创建的（参考：类）。例如：

```
> var b = new Bar();  // 通过构造函数Bar创建对象
> b instanceof Bar
  true
> {} instanceof Object
  true
> [] instanceof Array
  true
> [] instanceof Object  // 数字是对象的子类型
  true
```

### 5、布尔

布尔类型原始值包括true和false。下面的操作符产生布尔值：

- | 二元逻辑运算符：&&（与）， |      | （或） |
  | -------------------------- | ---- | ------ |
  |                            |      |        |

- 前缀逻辑运算符：!（非）

- 等值运算符：=== !== == !=

- 比较运算符（字符串或数字）：> >= < <=

#### 1、真值和假值

每当JavaScript希望一个布尔值时（例如：if语句的条件），可以使用任何值。它将被理解（转换）为true或false。下面的值被理解为false：

- undefined, null
- 布尔: false
- 数字: -0, NaN
- 字符串: ‘’

所有其他值被认为true。被理解为false的值称为假值（falsy），被理解为true的值称为真值（truthy）。可以使用Boolean作为函数，测试值被理解为什么。

```
> Boolean(undefined)
  false
> Boolean(0)
  false
> Boolean(3)
  true
```

#### 2、二元逻辑运算符

JavaScript中的二元逻辑运算符是短路运算——如果第一个操作数可以确定结果，第二个操作数将不被验证（运算）。例如，在下面的代码中，函数foo()永远不会被调用。

```
false && foo()
true  || foo()
```

此外，二元逻辑运算符会返回操作数中的一个——可能是一个布尔值，也可能不是。一张真值表用来决定返回哪个值：

- 与：如果第一个操作数是假值，返回第一个。否则返回第二个操作数。

  ```
    > NaN && 'abc'
      NaN
    > 123 && 'abc'
      'abc'
  ```

- 或：如果第一个操作数是真值，返回第一个。否则，返回第二个操作数。

  ```
    > 'abc' || 123
      'abc'
    > '' || 123
      123
  ```

#### 3、等值运算符

在JavaScript中检测相等，你可以使用严格相等（===）和严格不等（!==）。或者你也可以使用非严格相等（==）和非严格不等（!=）。经验规则：总是用严格运算符，假装非严格运算符不存在。**严格相等**更安全。

### 6、数字

JavaScript中的所有数字都是浮点型（虽然大部分的JavaScript引擎内部也使用整数）。至于为什么这样设计，查看这里（[每一个JavaScript开发者应该了解的浮点知识](http://yanhaijing.com/javascript/2014/03/14/what-every-javascript-developer-should-know-about-floating-points)）。

```
> 1 === 1.0
  true
```

特殊数字：

- NaN (“不是一个数字 not a number”): 错误值。

  ```
    > Number('xyz')  // 'xyz' 不能被转换为数字
      NaN
  ```

- Infinity：也是最大错误值（溢出）.

  ```
    > 3 / 0
      Infinity
    > Math.pow(2, 1024)  // 数字太大了
      Infinity
  ```

  Infinity 有时很有用，因为它比任何其他数字都大。同样，-Infinity 比其他任何数字都小。

- JavaScript有[两个零](http://www.2ality.com/2012/03/signedzero.html)，+0 和 -0。它（js引擎）通常不让你看到，并简单将两个零都显示为0：

  ```
    > +0
      0
    > -0
      0
  ```

  因此最好假装只有一个零（正如我们看到假值时所做的那样：-0 和 +0 都是假值）。

**运算符**

JavaScript中有下列[算数运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)：

- 加: number1 + number2
- 减: number1 - number2
- 乘: number1 * number2
- 除: number1 / number2
- 模: number1 % number2
- 自增: ++variable, variable++
- 自减: –variable, variable–
- 负值: -value
- 正值（转换为数字）: +value

全局对象[Math](http://yanhaijing.com/basejs/#sect_math)通过函数提供更多算数运算操作。

JavaScript中也有[位运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)（例如：位与 &）。

### 7、字符串

字符串可以直接通过字符串字面量创建。这些字面量被单引号或双引号包裹。反斜线（\）转义字符并且产生一些控制字符。例如：

```
'abc'
"abc"

'Did she say "Hello"?'
"Did she say \"Hello\"?"

'That\'s nice!'
"That's nice!"

'Line 1\nLine 2'  // 换行
'Backlash: \\'
```

可以通过方括号访问单个字符：

```
> var str = 'abc';
> str[1]
  'b'
```

length属性是字符串的字符数量。

```
> 'abc'.length
  3
```

**提醒：**字符串是不可变的，如果你想改变现有字符串，你需要创建一个新的字符串。

#### 1、字符串运算符

字符串可以通过加号操作符（+）拼接，如果其中一个操作数为字符串，会将另一个操作数也转换为字符串。

```
> var messageCount = 3;
> 'You have '+messageCount+' messages'
  'You have 3 messages'
```

连续执行拼接操作可以使用 += 操作符：

```
> var str = '';
> str += 'Multiple ';
> str += 'pieces ';
> str += 'are concatenated.';
> str
  'Multiple pieces are concatenated.'
```

#### 2、字符串方法

字符串有许多有用的[方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/prototype)。例如：

```
> 'abc'.slice(1)  // 复制子字符串
  'bc'
> 'abc'.slice(1, 2)
  'b'

> '\t xyz  '.trim()  // 移除空白字符
  'xyz'

> 'mjölnir'.toUpperCase()
  'MJÖLNIR'

> 'abc'.indexOf('b')  // 查找字符串
  1
> 'abc'.indexOf('x')
  -1
```

### 8、语句

#### 1、条件

#### 2、循环

### 9、函数

定义函数的一种方法是通过函数声明：

```
function add(param1, param2) {
    return param1 + param2;
}
```

上面的代码定义一个名称叫做add的函数，有两个参数param1和param2，并且返回参数的和。下面是如何调用这个函数：

```
> add(6, 1)
  7
> add('a', 'b')
  'ab'
```

另一种定义add()函数的方法是通过函数表达式：

```
var add = function (param1, param2) {
    return param1 + param2;
};
```

函数表达式产生一个值，因此可以直接将函数作为参数传递给其他函数：

```
someOtherFunction(function (p1, p2) { ... });
```

#### 1、函数声明提升

函数声明会被提升，他们全被移动到当前作用域开始之处。这允许你在函数声明之前调用它们：

```
function foo() {
    bar();  // 没问题，bar被提升
    function bar() {
        ...
    }
}
```

注意：虽然变量声明也会被[提升](http://yanhaijing.com/basejs/#sect_var_scope_closures)，但赋值的过程不会被提升：

```
function foo() {
    bar();  // 有问题，bar是undefined
    var bar = function () {
        // ...
    };
}
```

 #### 2、特殊变量

在JavaScript中你可以调用任意函数并传递任意数量的参数——语言绝不会抱怨（参数检测）。都可以正常工作，然而，使所有参数可访问需要通过特殊变量 arguments。arguments 看起来像数组，但它没有数组的方法（称为类数组 array-like）。

```
> function f() { return arguments }
> var args = f('a', 'b', 'c');
> args.length
3
> args[0]  // 获取索引为0的元素
'a'
```

#### 3、太多或太少参数

让我们通过下面的函数探索JavaScript中传递太多或太少参数时如何处理（函数 toArray在[后面提到](http://yanhaijing.com/basejs/#sect_toarray)）

```
function f(x, y) {
    console.log(x, y);
    console.log(toArray(arguments));
}
```

多出的参数将被忽略（可以通过arguments访问）：

```
> f('a', 'b', 'c')
a b
[ 'a', 'b', 'c' ]
```

缺少的参数将会是undefined：

```
> f('a')
a undefined
[ 'a' ]
> f()
undefined undefined
[]
```

#### 4、可选参数

下面是一个常见模式，给参数设置默认值：

```
function pair(x, y) {
    x = x || 0;  // (*)
    y = y || 0;
    return [ x, y ];
}
```

在（*）这行，如果x是真值（除了：null，undefined等），操作符返回x。否则，他返回第二个操作数。

```
> pair()
[ 0, 0 ]
> pair(3)
[ 3, 0 ]
> pair(3, 5)
[ 3, 5 ] 
```

#### 5、强制数量

如果你想强制参数的数量，你可以检测arguments.length：

```
function pair(x, y) {
    if (arguments.length !== 2) {
        throw new Error('Need exactly 2 arguments');
    }
    ...
}
```

#### 6、将arguments 转换为数组

arguments 不是一个数组，它仅仅是[类数组](http://www.2ality.com/2013/05/quirk-array-like-objects.html)（array-like）：它有一个length属性，并且你可以通过方括号索引方式访问它的元素。然而，你不能移除元素，或在它上面调用任何数组方法。因此，有时你需要将其转换为数组。这就是下面函数的作用。

```
function toArray(arrayLikeObject) {
    return [].slice.call(arrayLikeObject);
}
```

#### 7、call()方法

call() 方法是预定义的 JavaScript 方法。

它可以用来调用所有者对象作为参数的方法。

通过 call()，您能够使用属于另一个对象的方法。

本例调用 person 的 fullName 方法，并用于 person1：

**实例：**

```
var person = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person1 = {
    firstName:"Bill",
    lastName: "Gates",
}
var person2 = {
    firstName:"Steve",
    lastName: "Jobs",
}
person.fullName.call(person1);  // 将返回 "Bill Gates"
```

**call() 方法可接受参数：**

**实例：**

```
var person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}
var person1 = {
  firstName:"Bill",
  lastName: "Gates"
}
person.fullName.call(person1, "Seattle", "USA");
```

#### 8、Apply()方法

apply() 方法与 call() 方法非常相似。

不同之处是：

call() 方法分别接受参数。

apply() 方法接受**数组形式**的参数。

如果要使用数组而不是参数列表，则 apply() 方法非常方便。

由于 JavaScript 数组没有 max() 方法，因此您可以应用 Math.max() 方法。

**实例：**

```
Math.max.apply(null, [1,2,3]); // 也会返回 3
```

#### 9、闭包

**JavaScript 变量属于本地或全局作用域。**

**全局变量能够通过闭包实现局部（私有）。**

函数能够访问函数*内部*定义的所有变量，但是函数也能访问函数*外部*定义的变量。

在网页中，**全局变量属于 window 对象**。

**全局变量**能够被页面中（以及窗口中）的所有脚本使用和修改。

**局部变量**只能用于其被定义的函数内部。对于其他函数和脚本代码来说它是不可见的。

拥有相同名称的全局变量和局部变量是不同的变量。修改一个，不会改变其他。

不通过关键词 var 创建的变量总是全局的，即使它们在函数中创建。

**变量的生命周期**

全局变量活得和您的应用程序（窗口、网页）一样久。

局部变量活得不长。它们在函数调用时创建，在函数完成后被删除。

**JavaScript 嵌套函数**

所有函数都有权访问全局作用域。

事实上，在 JavaScript 中，所有函数都有权访问它们“上面”的作用域。

JavaScript 支持嵌套函数。嵌套函数可以访问其上的作用域。

**JavaScript 闭包**

记得自调用函数吗？这种函数会做什么呢？

**实例**

```
var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();

add();
add();
add();

// 计数器目前是 3 
```

变量 add 的赋值是自调用函数的返回值。

这个自调用函数只运行一次。它设置计数器为零（0），并返回函数表达式。

这样 add 成为了函数。最“精彩的”部分是它能够访问父作用域中的计数器。

这被称为 JavaScript *闭包*。它使函数拥有“*私有*”变量成为可能。

计数器被这个匿名函数的作用域保护，并且只能使用 add 函数来修改。

闭包指的是有权访问父作用域的函数，即使在父函数关闭之后。

### 10、异常处理

[异常处理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)最常见的方式像下面这样：

```
function throwException() {
    throw new Error('Problem!');//程序主动抛出错误
}

try {
    throwException();
} catch (e) {
    console.log(e);  // 错误：信息
    console.log(e.stack);  // 非标准，但大部分浏览器支持
}
```

try分支包裹易出错的代码，如果try分支内部抛出异常，catch分支将会执行。

当代码块被`try { ... }`包裹的时候，就表示这部分代码执行过程中可能会发生错误，一旦发生错误，就不再继续执行后续代码，转而跳到`catch`块。`catch (e) { ... }`包裹的代码就是错误处理代码，变量`e`表示捕获到的错误。最后，无论有没有错误，`finally`一定会被执行。

所以，有错误发生时，执行流程像这样：

1. 先执行`try { ... }`的代码；
2. 执行到出错的语句时，后续语句不再继续执行，转而执行`catch (e) { ... }`代码；
3. 最后执行`finally { ... }`代码。

而没有错误发生时，执行流程像这样：

1. 先执行`try { ... }`的代码；
2. 因为没有出错，`catch (e) { ... }`代码不会被执行；
3. 最后执行`finally { ... }`代码。

最后请注意，`catch`和`finally`可以不必都出现。也就是说，`try`语句一共有三种形式。

### 11、严格模式（Strict mode）

[严格模式](http://www.2ality.com/2011/01/javascripts-strict-mode-summary.html)开启检测和一些其他措施，使JavaScript变成更整洁的语言。推荐使用严格模式。为了开启严格模式，只需在JavaScript文件或script标签第一行添加如下语句：

```
'use strict';
```

你也可以在每个函数上选择性开启严格模式，只需将上面的代码放在函数的开头：

```
function functionInStrictMode() {
    'use strict';
}
```

下面的两小节看下严格模式的三大好处。

#### 1、明确错误

让我们看一个例子，严格模式给我们明确的错误，否则JavaScript总是静默失败：下面的函数 f() 执行一些非法操作，它试图更改所有字符串都有的只读属性——length：

```
function f() {
    'abc'.length = 5;
}
```

当你调用上面的函数，它静默失败，赋值操作被简单忽略。让我们将 f() 在严格模式下运行：

```
function f_strict() {
    'use strict';
    'abc'.length = 5;
}
```

现在浏览器报给我们一些错误：

```
> f_strict()
TypeError: Cannot assign to read only property 'length' of abc
```

#### 2、不是方法的函数中的this

在严格模式下，不作为方法的函数中的this值是undefined：

```
function f_strict() {
    'use strict';
    return this;
}
console.log(f_strict() === undefined);  // true
```

在非严格模式下，this的值是被称作全局对象（global object）（在浏览器里是window）：

```
function f() {
    return this;
}
console.log(f() === window);  // true
```

#### 3、不再自动创建全局变量

在非严格模式下，如果你给不存在的变量赋值，JavaScript会自动创建一个全局变量：

```
> function f() { foo = 5 }
> f()  // 不会报错
> foo
5
```

在严格模式下，这会产生一个错误：

```
> function f_strict() { 'use strict'; foo2 = 4; }
> f_strict()
ReferenceError: foo2 is not defined
```

### 12、变量作用域和闭包

在JavaScript中，你必须使用变量之前，通过var声明变量：

```
> var x;
> x = 3;
> y = 4;
ReferenceError: y is not defined
```

你可以用一条var语句声明和初始化多个变量：

```
var x = 1, y = 2, z = 3;
```

但我建议每个变量使用一条语句。因此，我将上面的语句重写为：

```
var x = 1;
var y = 2;
var z = 3;
```

由于提升（见下文），最好在函数顶部声明变量。

#### 1、变量和函数作用域

变量的作用域总是整个函数（没有块级作用域）。例如：

```
function foo() {
    var x = -3;
    if (x < 0) {  // (*)
        var tmp = -x;
        ...
    }
    console.log(tmp);  // 3
}
```

我们可以看到tmp变量不仅在（*）所在行的语句块存在，它在整个函数内都存在。

#### 2、变量提升

变量声明会被提升：声明会被移到函数的顶部，但赋值过程不会。举个例子，在下面的函数中（*）行位置声明了一个变量。

```
function foo() {
    console.log(tmp); // undefined
    if (false) {
        var tmp = 3;  // (*)
    }
}
```

在内部，上面的函数被执行像下面这样：

```
function foo() {
    var tmp;  // declaration is hoisted
    console.log(tmp);
    if (false) {
        tmp = 3;  // assignment stays put
    }
}
```

#### 3、闭包

每个函数保持和函数体内部变量的连接，甚至离开创建它的作用域之后。例如：

```
function createIncrementor(start) {
    return function () {  // (*)
        return start++;
    }
}
```

在（*）行开始的函数在它创建时保留上下文，并在内部保存一个start活动值：

```
> var inc = createIncrementor(5);
> inc()
5
> inc()
6
> inc()
7
```

闭包是一个函数加上和其作用域链的链接。因此，createIncrementor() 返回的是一个闭包。

#### 4、IIFE：模拟块级作用域

有时你想模拟一个块，例如你想将变量从全局作用域隔离。完成这个工作的模式叫做 IIFE(立即执行函数表达式(Immediately Invoked Function Expression))：

```
(function () {  // 块开始
    var tmp = ...;  // 非全局变量
}());  // 块结束
```

上面你会看到函数表达式被立即执行。外面的括号用来阻止它被解析成函数声明；只有函数表达式能被立即调用。函数体产生一个新的作用域并使 tmp 变为局部变量。

#### 5、闭包实现变量共享

下面是个经典问题，如果你不知道，会让你费尽思量。因此，先浏览下，对问题有个大概的了解。

闭包保持和外部变量的连接，有时可能和你想像的行为不一致：

```
var result = [];
for (var i=0; i < 5; i++) {
    result.push(function () { return i });  // (*)
}
console.log(result[1]()); // 5 (不是 1)
console.log(result[3]()); // 5 (不是 3)
```

(*)行的返回值总是当前的i值，而不是当函数被创建时的i值。当循环结束后，i的值是5，这是为什么数组中的所有函数的返回值总是一样的。如果你想捕获当前变量的快照，你可以使用 IIFE：

```
for (var i=0; i < 5; i++) {
    (function (i2) {
        result.push(function () { return i2 });
    }(i));  // 复制当前的i
}
```

### 13、对象和继承

和所有的[值类型](http://yanhaijing.com/basejs/#sect_values)一样，对象有属性。事实上，你可以将对象当作一组属性的集合，每个属性都是一对（键和值）。键是字符串，值可以是任意JavaScript值。到目前为止，我们仅仅见过键是[标识符](http://yanhaijing.com/basejs/#identifiers)的属性，因为点操作符处理的键必须为标识符。在这节，你讲见到另一种访问属性的方法，能将任意字符串作为键。

#### 1、单个对象

在JavaScript中，你可以直接创建对象，通过对象字面量：

```
var jane = {
    name: 'Jane',

    describe: function () {
        'use strict';
        return 'Person named '+this.name;
    }//函数形式访问：jane.decribe()
    
    get describe() {
    'use strict';
        return 'Person named '+this.name;
};//属性形式访问：Jane.desribe
```

上面的对象有两个属性：name 和 describe。你能读（“get”）和 写（“set”）属性：

```
> jane.name  // get
'Jane'
> jane.name = 'John';  // set
> jane.newProperty = 'abc';  // 自动创建
```

属性是函数如 describe 可以被当作方法调用。当调用他们时可以在它们内部通过this引用对象。

```
> jane.describe()  // 调用方法
'Person named John'
> jane.name = 'Jane';
> jane.describe()
'Person named Jane'
```

in 操作符用来检测一个属性是否存在：

```
> 'newProperty' in jane
true
> 'foo' in jane
false
```

若读取一个不存在的属性，将会得到undefined值。因此上面的两个检查也可以像下面这样：

```
> jane.newProperty !== undefined
true
> jane.foo !== undefined
false
```

delete操作符用来删除一个属性：

```
> delete jane.newProperty
true
> 'newProperty' in jane
false
```

**for...in 循环**

JavaScript for...in 语句遍历对象的属性。

语法：

```
for (variable in object) {
    要执行的代码
}
```

for...in 循环中的代码块会为每个属性执行一次。

#### 2、任意键属性

属性的键可以是任意字符串。到目前为止，我们看到的对象字面量中的和点操作符后的属性关键字。按这种方法你只能使用[标识符](http://yanhaijing.com/basejs/#identifiers)。如果你想用其他任意字符串作为键名，你必须在对象字面量里加上引号，并使用方括号获取和设置属性。

```
> var obj = { 'not an identifier': 123 };
> obj['not an identifier']
123
> obj['not an identifier'] = 456;
```

方括号允许你动态计算属性关键字：

```
> var x = 'name';
> jane[x]
'Jane'
> jane['na'+'me']
'Jane'
```

#### 3、引用方法

如果你引用一个方法，它将失去和对象的连接。就其本身而言，函数不是方法，其中的this值为undefined（严格模式下）。

```
> var func = jane.describe;
> func()
TypeError: Cannot read property 'name' of undefined
```

解决办法是使用函数内置的bind()方法。它创建一个新函数，其this值固定为给定的值。

```
> var func2 = jane.describe.bind(jane);
> func2()
'Person named Jane'
```

#### 4、方法内部的函数

每个函数都有一个特殊变量this。如果你在方法内部嵌入函数是很不方便的，因为你不能从函数中访问方法的this。下面是一个例子，我们调用forEach循环一个数组：

```
var jane = {
    name: 'Jane',
    friends: [ 'Tarzan', 'Cheeta' ],
    logHiToFriends: function () {
        'use strict';
        this.friends.forEach(function (friend) {
            // 这里的“this”是undefined
            console.log(this.name+' says hi to '+friend);
        });
    }
}
```

调用 logHiToFriends 会产生错误：

```
> jane.logHiToFriends()
TypeError: Cannot read property 'name' of undefined
```

有两种方法修复这问题。

\#1：将this存储在不同的变量。

```
logHiToFriends: function () {
    'use strict';
    var that = this;
    this.friends.forEach(function (friend) {
        console.log(that.name+' says hi to '+friend);
    });
}
```

\#2：forEach的第二个参数允许提供this值。

```
logHiToFriends: function () {
    'use strict';
    this.friends.forEach(function (friend) {
        console.log(this.name+' says hi to '+friend);
    }, this);
}
```

在JavaScript中函数表达式经常被用作函数参数。时刻小心函数表达式中的this。

#### 5、构造函数：对象工厂

目前为止，你可能认为JavaScript的对象仅是键值的映射，通过JavaScript对象字面量可以得出这个观点，看起来很像其他语言中的地图/字典（map/dictionary）。然而，JavaScript对象也支持真正意义上的面向对象特性：继承（inheritance）。本节不会完全讲解JavaScript中继承的工作原理，但会给你以此为开始的简单模式。如果你想得到更多知识，请查阅这篇文章“[JavaScript inheritance by example](http://www.2ality.com/2012/01/js-inheritance-by-example.html)”。

构造函数可以是函数表达式，也可以是函数声明，因此以下两种形式都可以：

```
let Person = function() {}
function Person() {}
```

除了作为“真正”的函数和方法，函数还在JavaScript中扮演第三种角色：如果通过new操作符调用，他们会变为构造函数，对象的工厂。构造函数是对其他语言中的类的粗略模拟。约定俗成，构造函数的第一个字母大写。例如：

```
// 设置实例数据
function Point(x, y) {
    this.x = x;
    this.y = y;
}
// 方法
Point.prototype.dist = function () {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};
```

我们看到构造函数分为两部分：首先，Point函数设置实例数据。其次，Point.prototype属性包含对象的方法。前者的数据是每个实例私有的，后面的数据是所有实例共享的。

我们通过new操作符调用Point：

```
> var p = new Point(3, 5);
> p.x
3
> p.dist()
5.830951894845301
```

p是Point的一个实例：

```
> p instanceof Point
true
> typeof p
'object'
```

### 14、数组

数组是数组元素的序列，能通过整数索引方法数组元素，数组索引从0开始。

#### 1、数组字面量

数组字面量创建数组很方便：

```
> var arr = [ 'a', 'b', 'c' ];
```

上面的数组有三个元素：分别是字符串“a”，“b”， “c”。你可以通过整数索引访问它们：

```
> arr[0]
'a'
> arr[0] = 'x';
> arr
[ 'x', 'b', 'c' ]
```

length属性总表示一个数组有多少项元素。

```
> arr.length
3
```

除此之外它也可以用来从数组上移除尾部元素：

```
> arr.length = 2;
> arr
[ 'x', 'b' ]
```

in操作符也可以在数组上工作。

```
> 1 in arr // arr在索引为1处是否有元素？
true
> 5 in arr // arr在索引为5处是否有元素？
false
```

值得注意的是数组是对象，因此可以有对象属性：

```
> arr.foo = 123;
> arr.foo
123
```

#### 2、数组方法

数组有许多[方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype)。举些例子：

```
> var arr = [ 'a', 'b', 'c' ];

> arr.slice(1, 2)  // 复制元素
[ 'b' ]
> arr.slice(1)
[ 'b', 'c' ]

> arr.push('x')  // 在末尾添加一个元素
4
> arr
[ 'a', 'b', 'c', 'x' ]

> arr.pop()  // 移除最后一个元素
'x'
> arr
[ 'a', 'b', 'c' ]

> arr.shift()  // 移除第一个元素
'a'
> arr
[ 'b', 'c' ]

> arr.unshift('x')  // 在前面添加一个元素
3
> arr
[ 'x', 'b', 'c' ]

> arr.indexOf('b')  // 查找给定项在数组中的索引，若不存在返回-1
1
> arr.indexOf('y') 
-1

> arr.join('-')  // 将元素拼接为一个字符串
'x-b-c'
> arr.join('')
'xbc'
> arr.join()
'x,b,c'
```

#### 3、遍历数组

有几种方法可以遍历数组元素。其中两个最重要的是 forEach 和 map。

forEach遍历整个数组，并将当前元素和它的索引传递给一个函数：

```
[ 'a', 'b', 'c' ].forEach(
    function (elem, index) {  // (*)
        console.log(index + '. ' + elem);
    });
```

上面代码的输出

```
0. a
1. b
2. c
```

注意（*）行的函数参数是可省略的。例如：它可以只有一个参数 elem。

map创建一个新数组，通过给每个存在数组元素应用一个函数：

```
> [1,2,3].map(function (x) { return x*x })
[ 1, 4, 9 ]
```

### 15、正则表达式

JavaScript内建支持正则表达式。他们被双斜线分隔：

```
/^abc$/
/[A-Za-z0-9]+/
```

#### 1、方法 test()：测试是否匹配

```
> /^a+b+$/.test('aaab')
true
> /^a+b+$/.test('aaa')
false
```

#### 2、方法 exec()：匹配和捕获组

```
> /a(b+)a/.exec('_abbba_aba_')
[ 'abbba', 'bbb' ]
```

返回的数组第一项（索引为0）是完整匹配，捕获的第一个分组在第二项（索引为1），等。[有一种方法](http://www.2ality.com/2011/04/javascript-overview-of-regular.html)可以反复调用获取所有匹配。

#### 3、方法 replace()：搜索并替换

```
> '<a> <bbb>'.replace(/<(.*?)>/g, '[$1]')
'[a] [bbb]'
```

replace的第一个参数必须是正则表达式，并且开启全局搜索（/g 标记），否则仅第一个匹配项会被替换。有[一种方法](http://www.2ality.com/2011/04/javascript-overview-of-regular.html)使用一个函数来计算替换项。

### 16、数学

[Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)是一个有算数功能的对象。例如：

```
> Math.abs(-2)
2

> Math.pow(3, 2)  // 3^2
9

> Math.max(2, -1, 5)
5

> Math.round(1.9)
2

> Math.cos(Math.PI)  // 预定义常量π
-1
```

### 17、原型和原型链

```
function Person() {
this.name = 'Kevin';
}
var person = new Person();
person.name = 'Kevin';
console.log(person.name) // Kevin
```

Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person。

**prototype**

每个函数都有一个 prototype 属性。
 每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

我们**无法直接给构造函数添加新属性或者新方法**，但我们可以通过构造函数的**prototype**属性给其添加新属性。

同时切记只能修改自己的原型，不能修改JS标准对象的原型。

**proto**

每一个JavaScript对象(除了 null )都具有的一个属性，叫**proto**，这个属性会指向该对象的原型。

```
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

**constructor**

每个原型都有一个 constructor 属性指向关联的构造函数 实例原型指向构造函数

```
console.log(Person === Person.prototype.constructor); // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

![](https://upload-images.jianshu.io/upload_images/1490251-0cac772635e8a128.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

```
Person.prototype.name = 'Kevin';

var person = new Person();

person.name = 'Daisy';
console.log(person.name) // Daisy

delete person.name;
console.log(person.name) // Kevin
```

在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.**proto** ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 Kevin。

![](https://upload-images.jianshu.io/upload_images/1490251-3089c135df71c956.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

JavaScript 默认并不会**复制**对象的属性，相反，JavaScript 只是在两个对象之间创建一个**关联**，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，**委托**的说法反而更准确些。

### 18、HTML DOM

当网页被加载时，浏览器会创建页面的文档对象模型（Document Object Model）。

**HTML DOM** 模型被构造为**对象**的树：

**HTML DOM 树**

![DOM HTML tree](https://www.runoob.com/images/pic_htmltree.gif)

通过可编程的对象模型，JavaScript 获得了足够的能力来创建动态的 HTML。

#### 1、DOM HTML

**改变 HTML 输出流**

JavaScript 能够创建动态的 HTML 内容：

在 JavaScript 中，document.write() 可用于直接向 HTML 输出流写内容。

**改变 HTML 内容**

修改 HTML 内容的最简单的方法是使用 innerHTML 属性。

如需改变 HTML 元素的内容，请使用这个语法：

document.getElementById(*id*).innerHTML=*新的 HTML*

**改变 HTML 属性**

如需改变 HTML 元素的属性，请使用这个语法：

document.getElementById(*id*).*attribute=新属性值*

#### 2、DOM CSS

**改变 HTML 样式**

如需改变 HTML 元素的样式，请使用这个语法：

document.getElementById(*id*).style.*property*=*新样式*

动态添加并删除类名：
添加：document.getElementById("id").classList.add("className")；

删除：document.getElementById("id").classList.remove("className")；

#### 3、DOM 事件

**对事件做出反应**

我们可以在事件发生时执行 JavaScript，比如当用户在 HTML 元素上点击时。

如需在用户点击某个元素时执行代码，请向一个 HTML 事件属性添加 JavaScript 代码：

onclick=*JavaScript*

HTML 事件的例子：

- 当用户点击鼠标时
- 当网页已加载时
- 当图像已加载时
- 当鼠标移动到元素上时
- 当输入字段被改变时
- 当提交 HTML 表单时
- 当用户触发按键时

**HTML 事件属性**

如需向 HTML 元素分配 事件，您可以使用事件属性。

实例：

向 button 元素分配 onclick 事件：

<button **onclick**="**displayDate()**">点这里</button>

**使用 HTML DOM 来分配事件**

HTML DOM 允许您使用 JavaScript 来向 HTML 元素分配事件：

实例：

向 button 元素分配 onclick 事件：

<script>document.getElementById("myBtn").onclick=function(){displayDate()};</script>

**onload 和 onunload 事件**

onload 和 onunload 事件会在用户进入或离开页面时被触发。

onload 事件可用于检测访问者的浏览器类型和浏览器版本，并基于这些信息来加载网页的正确版本。

onload 和 onunload 事件可用于处理 cookie。

**onchange 事件**

onchange 事件常结合对输入字段的验证来使用。

下面是一个如何使用 onchange 的例子。当用户改变输入字段的内容时，会调用 upperCase() 函数。

实例：

<input type="text" id="fname" **onchange**="upperCase()">

**onmouseover 和 onmouseout 事件**

onmouseover 和 onmouseout 事件可用于在用户的鼠标移至 HTML 元素上方或移出元素时触发函数。

**onmousedown、onmouseup 以及 onclick 事件**

onmousedown, onmouseup 以及 onclick 构成了鼠标点击事件的所有部分。首先当点击鼠标按钮时，会触发 onmousedown 事件，当释放鼠标按钮时，会触发 onmouseup 事件，最后，当完成鼠标点击时，会触发 onclick 事件。

#### 4、DOM EventListener

**addEventListener() 方法**

addEventListener() 方法用于向指定元素添加事件句柄。

addEventListener() 方法添加的事件句柄不会覆盖已存在的事件句柄。

你可以向一个元素添加多个事件句柄。

你可以向同个元素添加多个同类型的事件句柄，如：两个 "click" 事件。

你可以向任何 DOM 对象添加事件监听，不仅仅是 HTML 元素。如： window 对象。

addEventListener() 方法可以更简单的控制事件（冒泡与捕获）。

当你使用 addEventListener() 方法时, JavaScript 从 HTML 标记中分离开来，可读性更强， 在没有控制HTML标记时也可以添加事件监听。

你可以使用 removeEventListener() 方法来移除事件的监听。

**语法：**

*element*.addEventListener(*event, function, useCapture*);

第一个参数是事件的类型 (如 "click" 或 "mousedown").

第二个参数是事件触发后调用的函数。

第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的。

**向 Window 对象添加事件句柄**

addEventListener() 方法允许你在 HTML DOM 对象添加事件监听， HTML DOM 对象如： HTML 元素, HTML 文档, window 对象。或者其他支持的事件对象如: xmlHttpRequest 对象。

**实例:**

当用户重置窗口大小时添加事件监听：

window.addEventListener("resize", function(){
  document.getElementById("demo").innerHTML = *sometext*;
});

**传递参数**

当传递参数值时，使用"匿名函数"调用带参数的函数：

**实例:**

*element*.addEventListener("click", function(){ myFunction(p1, p2); });

**事件冒泡或事件捕获？**

事件传递有两种方式：冒泡与捕获。

事件传递定义了元素事件触发的顺序。 如果你将 <p> 元素插入到 <div> 元素中，用户点击 <p> 元素, 哪个元素的 "click" 事件先被触发呢？

在 *冒泡* 中，内部元素的事件会先被触发，然后再触发外部元素，即： <p> 元素的点击事件先触发，然后会触发 <div> 元素的点击事件。

在 *捕获* 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。

addEventListener() 方法可以指定 "useCapture" 参数来设置传递类型：

addEventListener(*event*, *function*, ***useCapture\***);

默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。

**removeEventListener() 方法**

removeEventListener() 方法移除由 addEventListener() 方法添加的事件句柄.

#### 5、DOM 元素

**创建新的 HTML 元素 (节点) - appendChild()**

要创建新的 HTML 元素 (节点)需要先创建一个元素，然后在已存在的元素中添加它。

**实例解析**

以下代码是用于创建 <p> 元素:

```
var para = document.createElement("p");
```

为 <p> 元素创建一个新的文本节点：

```
var node = document.createTextNode("这是一个新的段落。");
```

将文本节点添加到 <p> 元素中：

```
para.appendChild(node);
```

最后，在一个已存在的元素中添加 p 元素。

查找已存在的元素：

```
var element = document.getElementById("div1");
```

添加到已存在的元素中:

```
element.appendChild(para);
```

**创建新的 HTML 元素 (节点) - insertBefore()**

以上的实例我们使用了 **appendChild()** 方法，它用于添加新元素到尾部。

如果我们需要将新元素添加到开始位置，可以使用 **insertBefore(待插元素，该元素之前)** 方法。

**移除已存在的元素**

要移除一个元素，你需要知道该元素的父元素。

```
parent.removeChild(child);
```

以下代码是已知要查找的子元素，然后查找其父元素，再删除这个子元素（删除节点必须知道父节点）：

```
var child = document.getElementById("p1");
child.parentNode.removeChild(child);
```

**替换 HTML 元素 - replaceChild()**

我们可以使用 replaceChild() 方法来替换 HTML DOM 中的元素。

**注：**同样需要知道父元素。

#### 6、HTMlCollection对象

getElementsByTagName() 方法返回 [HTMLCollection](https://www.runoob.com/jsref/dom-htmlcollection.html) 对象。

HTMLCollection 对象类似包含 HTML 元素的一个数组。

HTMLCollection 对象的 length 属性定义了集合中元素的数量。

获取 <p> 元素的集合：

```
var myCollection = document.getElementsByTagName("p");
```

显示集合元素个数：

```
document.getElementById("demo").innerHTML = myCollection.length;
```

**集合 length 属性常用于遍历集合中的元素。**

**注意:**

**HTMLCollection 不是一个数组！**

HTMLCollection 看起来可能是一个数组，但其实不是。

你可以像数组一样，使用索引来获取元素。

HTMLCollection 无法使用数组的方法： valueOf(), pop(), push(), 或 join() 。

#### 7、NodeList对象

**NodeList** 对象是一个从文档中获取的节点列表 (集合) 。

NodeList 对象类似 [HTMLCollection](https://www.runoob.com/js/js-htmldom-elements.html) 对象。

一些旧版本浏览器中的方法（如：**getElementsByClassName()**）返回的是 NodeList 对象，而不是 HTMLCollection 对象。

所有浏览器的 **childNodes** 属性返回的是 NodeList 对象。

大部分浏览器的 **querySelectorAll()** 返回 NodeList 对象。

**HTMLCollection 与 NodeList 的区别**

[HTMLCollection](https://www.runoob.com/js/js-htmldom-collections.html) 是 HTML 元素的集合。

NodeList 是一个文档节点的集合。

NodeList 与 HTMLCollection 有很多类似的地方。

NodeList 与 HTMLCollection 都与数组对象有点类似，可以使用索引 (0, 1, 2, 3, 4, ...) 来获取元素。

NodeList 与 HTMLCollection 都有 length 属性。

HTMLCollection 元素可以通过 name，id 或索引来获取。

NodeList 只能通过索引来获取。

只有 NodeList 对象有包含属性节点和文本节点。

### 19、Browser 对象

#### 1、window 对象

**Window 对象表示浏览器中打开的窗口。**

如果文档包含框架（<frame> 或 <iframe> 标签），浏览器会为 HTML 文档创建一个 window 对象，并为每个框架创建一个额外的 window 对象。

**window对象属性**

| 属性                                                         | 描述                               |
| :----------------------------------------------------------- | :--------------------------------- |
| [closed](https://www.runoob.com/jsref/prop-win-closed.html)  | 返回窗口是否已被关闭。             |
| [defaultStatus](https://www.runoob.com/jsref/prop-win-defaultstatus.html) | 设置或返回窗口状态栏中的默认文本。 |
| [name](https://www.runoob.com/jsref/prop-win-name.html)      | 设置或返回窗口的名称。             |
| [top](https://www.runoob.com/jsref/prop-win-top.html)        | 返回最顶层的父窗口。               |

**window对象方法**

| [alert()](https://www.runoob.com/jsref/met-win-alert.html) | 显示带有一段消息和一个确认按钮的警告框。 |
| ---------------------------------------------------------- | ---------------------------------------- |

#### 2、Navigator对象

Navigator 对象包含有关浏览器的信息。

**Navigator对象属性**

**Navigator对象方法**

#### 3、Screen对象

Screen 对象包含有关客户端显示屏幕的信息。

**Screen对象属性**

#### 4、History对象

History 对象包含用户（在浏览器窗口中）访问过的 URL。

History 对象是 window 对象的一部分，可通过 window.history 属性对其进行访问。

**History对象属性**

| [length](https://www.runoob.com/jsref/prop-his-length.html) | 返回历史列表中的网址数 |
| ----------------------------------------------------------- | ---------------------- |

**History对象方法**

| [back()](https://www.runoob.com/jsref/met-his-back.html)     | 加载 history 列表中的前一个 URL   |
| ------------------------------------------------------------ | --------------------------------- |
| [forward()](https://www.runoob.com/jsref/met-his-forward.html) | 加载 history 列表中的下一个 URL   |
| [go()](https://www.runoob.com/jsref/met-his-go.html)         | 加载 history 列表中的某个具体页面 |

#### 5、Location对象

Location 对象包含有关当前 URL 的信息。

Location 对象是 window 对象的一部分，可通过 window.Location 属性对其进行访问。

**Location对象属性**

| [hash](https://www.runoob.com/jsref/prop-loc-hash.html) | 返回一个URL的锚部分 |
| ------------------------------------------------------- | ------------------- |

**Location对象方法**

| [assign()](https://www.runoob.com/jsref/met-loc-assign.html) | 载入一个新的文档       |
| ------------------------------------------------------------ | ---------------------- |
| [reload()](https://www.runoob.com/jsref/met-loc-reload.html) | 重新载入当前文档       |
| [replace()](https://www.runoob.com/jsref/met-loc-replace.html) | 用新的文档替换当前文档 |

#### 6、存储对象

Web 存储 API 提供了 sessionStorage （会话存储） 和 localStorage（本地存储）两个存储对象来对网页的数据进行添加、删除、修改、查询操作。

- localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。
- sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。

### 20、异步

#### 1、同步与异步

#### 2、回调函数

回调函数是异步操作最基本的方法。

```
setTimeout(f(), 延时时间(毫秒));
```

回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护，各个部分之间高度耦合，使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。

#### 3、事件监听

这种方式下，**异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生**。

下面是两个函数f1和f2，编程的意图是f2必须等到f1执行完成，才能执行。

```
function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done');
  }, 1000);
}
```

上面代码中，f1.trigger(‘done’)表示，执行完成后，立即触发done事件，从而开始执行f2。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"，有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。

#### 4、发布订阅

假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。

首先，f2向信号中心jQuery订阅done信号。

```
jQuery.subscribe('done', f2);
```

然后，f1进行如下改写：

```
function f1() {
  setTimeout(function () {
    // ...
    jQuery.publish('done');
    
  }, 1000);
```

上面代码中，jQuery.publish(‘done’)的意思是，f1执行完成后，向信号中心jQuery发布done信号，从而引发f2的执行。
f2完成执行后，可以取消订阅（unsubscribe）:

```
jQuery.unsubscribe('done', f2);
```

这种方法的性质与“事件监听”类似，但是明显优于后者。因为可以通过查看“消息中心”，了解存在多少信号、

#### 5、Promise

##### 1、Promise的使用

Promise 构造函数只有一个参数，是一个函数，这个函数在构造之后会直接被异步运行，所以我们称之为起始函数。起始函数包含两个参数 resolve 和 reject。

resolve() 中可以放置一个参数用于向下一个 then 传递一个值，then 中的函数也可以返回一个值传递给 then。但是，如果 then 中返回的是一个 Promise 对象，那么下一个 then 将相当于对这个返回的 Promise 进行操作。

reject() 参数中一般会传递一个异常给之后的 catch 函数用于处理异常。

但是请注意以下两点：

- resolve 和 reject 的作用域只有起始函数，不包括 then 以及其他序列；
- resolve 和 reject 并不能够使起始函数停止运行，别忘了 return。

##### 2、异步函数async function

```
async function asyncFunc() {    
await print(1000, "First");    
await print(4000, "Second");    
await print(3000, "Third"); 
} 
asyncFunc();
```

异步函数 async function 中可以使用 await 指令，await 指令后必须跟着一个 Promise，异步函数会在这个 Promise 运行中暂停，直到其运行结束再继续运行。

异步函数实际上原理与 Promise 原生 API 的机制是一模一样的，只不过更便于程序员阅读。

处理异常的机制将用 try-catch 块实现：

```
async function asyncFunc() {
    try {
        await new Promise(function (resolve, reject) {
            throw "Some error"; // 或者 reject("Some error")
        });
    } catch (err) {
        console.log(err);
        // 会输出 Some error
    }
}
asyncFunc();
```

