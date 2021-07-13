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
    }
};
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

