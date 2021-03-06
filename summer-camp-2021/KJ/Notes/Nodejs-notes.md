# Nodejs-notes

## 1、模块

在 Node 环境中，一个.js 文件就称之为一个模块（module）。

**使用模块有的好处:**

最大的好处是大大提高了代码的可维护性。其次，编写代码不必从零开始。当一个模块编写完毕，就可以被其他地方引用。我们在编写程序的时候，也经常引用其他模块，包括 Node 内置的模块和来自第三方的模块。

使用模块还可以避免函数名和变量名冲突。相同名字的函数和变量完全可以分别存在不同的模块中，因此，我们自己在编写模块时，不必考虑名字会与其他模块冲突。

**调用模块：**

```
//module.js
'use strict';//习惯
function name1(){};
function name2(){};

module.exports = {
property1:name1,
property2:name2
}//暴露接口，此处可看成含有两个函数的对象
modules.exports = name1;//另一种方式，此时传递的为一个函数


//main.js
'use strict';
var variate = require('./module');//被调用模块的相对路径
variate.property(parameter);
variate(parameter);//另一种方式
```

## 2、基本模块

### 1、fs

**异步读取文件**

```
'use strict';

var fs = require('fs');
fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});//sample.txt文件必须在当前目录下，且文件编码为utf-8
//读取二进制文件
'use strict';

var fs = require('fs');
fs.readFile('sample.png', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + ' bytes');
    }
});
//当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象
```

**同步读取文件**

```
'use strict';

var fs = require('fs');
var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);//同步读取的函数和异步函数相比，多了一个Sync后缀，并且不接收回调函数

//如果同步读取文件发生错误，则需要用try...catch捕获该错误：
try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    // 出错了
}
```

**写文件**

```
'use strict';

var fs = require('fs');
var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});
//writeFile()的参数依次为文件名、数据和回调函数。如果传入的数据是String，默认按UTF-8编码写入文本文件，如果传入的参数是Buffer，则写入的是二进制文件
```

他也有一个同步方法

```
'use strict';

var fs = require('fs');
var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);//与readFile类似
```

**stat**

如果我们要获取文件大小，创建时间等信息，可以使用`fs.stat()`，它返回一个`Stat`对象，能告诉我们文件或目录的详细信息：

```
'use strict';

var fs = require('fs');

fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
```

由于 Node 环境执行的 JavaScript 代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，**必须使用异步代码**，否则，同步代码在执行时期，服务器将停止响应，因为 JavaScript 只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。

### 2、stream

**stream**是 Node.js 提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

**流的特点**是数据是有序的，而且必须依次读取，或者依次写入，不能像 Array 那样随机定位。

在 Node.js 中，流也是一个对象，我们只需要响应流的事件就可以了：`data`事件表示流的数据已经可以读取了，`end`事件表示这个流已经到末尾了，没有数据可以读取了，`error`事件表示出错了。

下面是一个从文件流读取文本内容的示例：

```
'use strict';

var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});
```

要注意，`data`事件可能会有多次，每次传递的`chunk`是流的一部分数据。

要以流的形式写入文件，只需要不断调用`write()`方法，最后以`end()`结束：

```
'use strict';

var fs = require('fs');

var ws1 = fs.createWriteStream('output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end();
```

所有可以读取数据的流都继承自`stream.Readable`，所有可以写入的流都继承自`stream.Writable`。

**pipe**

就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在 Node.js 中，`Readable`流有一个`pipe()`方法，就是用来干这件事的。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```
'use strict';

var fs = require('fs');

var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);
```

默认情况下，当`Readable`流的数据读取完毕，`end`事件触发后，将自动关闭`Writable`流。如果我们不希望自动关闭`Writable`流，需要传入参数：

```
readable.pipe(writable, { end: false });
```

### 3、http

**HTTP 服务器**

Node.js 自带`http`模块，操作`http`模块提供的`request`和`response`对象，来开发 HTTP 服务器程序。

`request`对象封装了 HTTP 请求，我们调用`request`对象的属性和方法就可以拿到所有 HTTP 请求的信息；

`response`对象封装了 HTTP 响应，我们操作`response`对象的方法，就可以把 HTTP 响应返回给浏览器。

用 Node.js 实现一个 HTTP 服务器程序非常简单。我们来实现一个最简单的 Web 程序`hello.js`，它对于所有请求，都返回`Hello world!`：

```
'use strict';
// 导入http模块:
var http = require('http');

// 创建http server，并传入回调函数:
var server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```

在命令提示符下运行该程序，可以看到以下输出：

```
$ node hello.js
Server is running at http://127.0.0.1:8080/
```

不要关闭命令提示符，直接打开浏览器输入`http://localhost:8080`，即可看到服务器响应的内容。

**文件服务器**

实现一个文件服务器`file_server.js`：

```
'use strict';

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);

// 创建服务器:
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```

### 4、url

URL 是 Uniform Location Resource 的缩写，翻译为“统一资源定位符”，也就是描述资源位置的固定表示方法。被 URL 描述的资源可以位于互联网上，也可以位于本地。

**组成结构**

基本 URL 包含模式（或者成为协议），服务器名（或 IP 地址），路径和文件名。

#### 协议

通过协议，可以获取打开 URL 的方式，最常见的协议是 http（超文本传输协议）

#### 地址与路径

文件所在的服务器名称+端口号/用户名密码+文件的路径+文件本身的名称

当 URL 没有给出对应的文件名是，一般访问默认的文件名，例如 index.html 或 default.html。

#### Node.js 中的 URL

**URL 对象中的成员**如下：

- href 被传入的未经解析的 URL 地址，包含协议（protocol）、主机名（host）等，都表示为小写
- protocol 请求的协议名称，表示为小写，如‘http：’
- slashes 冒号后的斜线，值为 true 或 false
- host 主机及端口的全部信息，例如‘host.com:8080’
- auth 身份验证信息，例如‘user:pass’
- hostname 主机名，例如‘host.com’
- port 端口号，例如‘8000’
- pathname 路径名，在主机名之后，查询语句之前的地址部分，包含‘/’，例如‘/p/a/t/h’
- search URL 地址的查询部分，包括开头的问号，例如‘?query=string’
- path 路径名与查询的串联，没有经过解码，例如‘/p/a/t/h?query=string’
- query 查询部分的参数，或者解析后的查询字符串，例如‘query=string’或者{'query':'string'}
- hash URL 地址中‘#’字符后的片段

**三个方法**

**1 url.parse(urlString,boolean,boolean)**

parse 这个方法可以将一个 url 的字符串解析并返回一个 url 的对象

参数：urlString 指传入一个 url 地址的字符串

第二个参数（可省）传入一个布尔值，默认为 false，为 true 时，返回的 url 对象中，query 的属性为一个对象。

第三个参数（可省）传入一个布尔值，默认为 false

![](C:\Users\13589\Desktop\Summer-Camp\BY-camp.KJ\summer-camp-2021\KJ\Notes\notes-images\11.PNG)

**2.url.format(urlObj)**
format 这个方法是将传入的 url 对象编程一个 url 字符串并返回

![](C:\Users\13589\Desktop\Summer-Camp\BY-camp.KJ\summer-camp-2021\KJ\Notes\notes-images\12.PNG)

**3.url.resolve(from,to)**
resolve(from, to)方法用于拼接 URL，它根据相对 URL 拼接成新的 URL

![](C:\Users\13589\Desktop\Summer-Camp\BY-camp.KJ\summer-camp-2021\KJ\Notes\notes-images\13.PNG)

### 5、path

nodejs 自带 path 模块，在 nodejs 中经常会用到 path 的方法处理路径 。

**常用方法：**

**path.join([..paths])**

[...path] ： 路径片段

使用平台特定的拼接符将路径片段连接到一起,返回一个路径(注意： 长度为 0 则忽略，'.'当前目录， '..' 上一级目录)

如： path.join('/first', 'second/third', 'forth', '..') ； 返回: /first/second/third

**path.resovle([...path])**

把一个路径从右往左处理成一个绝对路径，如果没有传参数，返回当前工作目录的绝对路径

![](https://img2018.cnblogs.com/common/1587873/202001/1587873-20200117141416239-1628789395.jpg)

**\_\_dirname**

获取当前文件所属目录的绝对路径

**\_\_filename**

获取当前文件的绝对路径

## 3、框架（koa2）

引入 koa：

```
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
```

核心代码:

```
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
```

每收到一个 http 请求，koa 就会调用通过`app.use()`注册的 async 函数，并传入`ctx`和`next`参数。

koa 把很多 async 函数组成一个处理链，每个 async 函数都可以做一些自己的事情，然后用`await next()`来调用下一个 async 函数。我们把每个 async 函数称为**middleware**，这些 middleware 可以组合起来，完成很多有用的功能。

`ctx`对象有一些简写的方法，例如`ctx.url`相当于`ctx.request.url`，`ctx.type`相当于`ctx.response.type`。

**koa-router**

为了处理 URL，我们需要引入`koa-router`这个 middleware，让它负责处理 URL 映射。

```
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();//导入
```

**处理 GET 请求**

使用`router.get('/path', async fn)`来注册一个 GET 请求。可以在请求路径中使用带变量的`/hello/:name`，变量可以通过`ctx.params.name`访问。

例：

```
// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

// add router middleware:
app.use(router.routes());
```

**处理 POST 请求**

同理，处理 post 请求，可以用`router.post('/path', async fn)`。

用 post 请求处理 URL 时，我们会遇到一个问题：post 请求通常会发送一个表单，或者 JSON，它作为 request 的 body 发送，但无论是 Node.js 提供的原始 request 对象，还是 koa 提供的 request 对象，都*不提供*解析 request 的 body 的功能！

所以，我们又需要引入另一个 middleware 来解析原始 request 请求，然后，把解析后的参数，绑定到`ctx.request.body`中。

`koa-bodyparser`就是用来干这个活的。

```
const bodyParser = require('koa-bodyparser');
```

在合适的位置加上：

```
app.use(bodyParser());
//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
```

**处理静态文件**

```
const Koa = require("koa");
const statics = require("koa-static");//引入新模块
const path = require("path");
const app = new Koa();

const staticPath = './目录名';
app.use(statics(path.join(__dirname, staticPath)))
//访问http://127.0.0.1:监听端口/目录下的文件名
```

**中间件符合洋葱模型**

## 4、模板引擎（Nunjucks）

使用一个模板引擎是非常简单的，因为本质上我们只需要构造这样一个函数：

```
function render(view, model) {
    // TODO:...
}
```

其中，`view`是模板的名称（又称为视图），因为可能存在多个模板，需要选择其中一个。`model`就是数据，在 JavaScript 中，它就是一个简单的 Object。`render`函数返回一个字符串，就是模板的输出。
