# MongoDB-notes

## 1、概念

### 1、数据库（database）

一个mongodb中可以建立多个数据库。

MongoDB的默认数据库为"db"，该数据库存储在data目录中。

MongoDB的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。

**"show dbs"** 命令可以显示所有数据的列表。

执行 **"db"** 命令可以显示当前数据库对象或集合。

运行"**use**"命令，可以连接到一个指定的数据库。

注：在mongo.exe中运行

**库名要求：**不能是空串、不含一些特殊字符、全部小写...

有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。

- **admin**： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
- **local:** 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
- **config**: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

### 2、文档（Document）

文档是一组键值(key-value)对(即 BSON)。MongoDB 的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大的区别，也是 MongoDB 非常突出的特点。

一个简单的文档例子如下：

```
{"site":"www.runoob.com", "name":"菜鸟教程"}
```

**注意：**

1. 文档中的键/值对是有序的。
2. 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌入的文档)。
3. MongoDB区分类型和大小写。
4. MongoDB的文档不能有重复的键。
5. 文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。

文档键命名规范：

- 键不能含有\0 (空字符)。这个字符用来表示键的结尾。
- .和$有特别的意义，只有在特定环境下才能使用。
- 以下划线"_"开头的键是保留的(不是严格要求的)。

### 3、集合（collection）

集合就是 MongoDB 文档组，集合存在于数据库中，集合没有固定的结构，这意味着你在对集合可以插入不同格式和类型的数据，但通常情况下我们插入集合的数据都会有一定的关联性。

比如，我们可以将以下不同数据结构的文档插入到集合中：

```
{"site":"www.baidu.com"}
{"site":"www.google.com","name":"Google"}
{"site":"www.runoob.com","name":"菜鸟教程","num":5}
```

当第一个文档插入时，集合就会被创建。

**合法的集合名：**

- 集合名不能是空字符串""。
- 集合名不能含有\0字符（空字符)，这个字符表示集合名的结尾。
- 集合名不能以"system."开头，这是为系统集合保留的前缀。
- 用户创建的集合名字不能含有保留字符。有些驱动程序的确支持在集合名里面包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否则千万不要在名字里出现$。　

**一种特殊的集合：**capped collections

创建：

```
db.createCollection("mycoll", {capped:true, size:100000})
```

### 4、重要数据类型

#### 1、ObjectId

ObjectId 类似唯一主键，可以很快的去生成和排序，包含 12 bytes，含义是：

- 前 4 个字节表示创建 **unix** 时间戳,格林尼治时间 **UTC** 时间，比北京时间晚了 8 个小时
- 接下来的 3 个字节是机器标识码
- 紧接的两个字节由进程 id 组成 PID
- 最后三个字节是随机数

![img](https://www.runoob.com/wp-content/uploads/2013/10/2875754375-5a19268f0fd9b_articlex.jpeg)

MongoDB 中存储的文档必须有一个 _id 键。这个键的值可以是任何类型的，默认是个 ObjectId 对象

由于 ObjectId 中保存了创建的时间戳，所以你不需要为你的文档保存时间戳字段，你可以通过 getTimestamp 函数来获取文档的创建时间:

```
> var newObject = ObjectId()
> newObject.getTimestamp()
ISODate("2017-11-25T07:21:10Z")
```

#### 2、时间戳

BSON 有一个特殊的时间戳类型用于 MongoDB 内部使用，与普通的 日期 类型不相关。 时间戳值是一个 64 位的值。其中：

- 前32位是一个 time_t 值（与Unix新纪元相差的秒数）
- 后32位是在某秒中操作的一个递增的`序数`

在单个 mongod 实例中，时间戳值通常是唯一的。

在复制集中， oplog 有一个 ts 字段。这个字段中的值使用BSON时间戳表示了操作时间。

#### 3、日期

表示当前距离 Unix新纪元（1970年1月1日）的毫秒数。日期类型是有符号的, 负数表示 1970 年之前的日期。

```
> var mydate1 = new Date()     //格林尼治时间
> mydate1
ISODate("2018-03-04T14:58:51.233Z")
> typeof mydate1
object
```

## 2、连接



## 3、基本操作

### 1、数据库

```
//创建数据库
>use DATABASE_NAME(runoob)
//如果数据库不存在，则创建数据库，否则切换到指定数据库。

//查看所有数据库
>show dbs
//不会显示新创建的空数据库

//插入数据
> db.runoob.insert({"name":"菜鸟教程"})
WriteResult({ "nInserted" : 1 })

```

**注意：**MongoDB 中默认的数据库为 test，如果你没有创建新的数据库，集合将存放在 test 数据库中。

在 MongoDB 中，集合只有在内容插入后才会创建! 就是说，创集合(数据表)后要再插入一个文档(记录)，集合才会真正创建。

```
//删除数据库
db.dropDatabase()
删除当前数据库，默认为 test，你可以使用 db 命令查看当前数据库名。
```

### 2、集合

```
//创建集合
db.createCollection(name, options)
```

参数说明：

- name: 要创建的集合名称
- options: 可选参数, 指定有关内存大小及索引的选项

options 可以是如下参数：

| 字段        | 类型 | 描述                                                         |
| :---------- | :--- | :----------------------------------------------------------- |
| capped      | 布尔 | （可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。 **当该值为 true 时，必须指定 size 参数。** |
| autoIndexId | 布尔 | 3.2 之后不再支持该参数。（可选）如为 true，自动在 _id 字段创建索引。默认为 false。 |
| size        | 数值 | （可选）为固定集合指定一个最大值，即字节数。 **如果 capped 为 true，也需要指定该字段。** |
| max         | 数值 | （可选）指定固定集合中包含文档的最大数量。                   |

在插入文档时，MongoDB 首先检查固定集合的 size 字段，然后检查 max 字段。

在 test 数据库中创建 runoob 集合：

```
> use test
switched to db test
> db.createCollection("runoob")
{ "ok" : 1 }
```

如果要查看已有集合，可以使用 **show collections** 或 **show tables** 命令：

```
> show collections
runoob
system.indexes
```

带有几个关键参数的 createCollection() 的用法：

创建固定集合 mycol，整个集合空间大小 6142800 B, 文档最大个数为 10000 个。

```
> db.createCollection("mycol", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )
{ "ok" : 1 }
```

在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合。

```
> db.mycol2.insert({"name" : "菜鸟教程"})
> show collections
mycol2
```

```
//删除集合
db.collection.drop()
```

在数据库 mydb 中，我们可以先通过 **show collections** 命令查看已存在的集合：

```
>use mydb
switched to db mydb
>show collections
mycol
mycol2
system.indexes
runoob
>
```

接着删除集合 mycol2 :

```
>db.mycol2.drop()
true
```

### 3、文档

**插入文档：**

MongoDB 使用 insert()  方法向集合中插入文档，语法如下：

```
db.COLLECTION_NAME.insert(document)
```

**注：**若插入的数据主键已经存在，则会抛出org.springframework.dao.DuplicateKeyException*异常，提示主键重复，不保存当前数据。

还可以使用 **db.collection.insertOne()** 或 **db.collection.replaceOne()** 来代替。

**db.collection.insertOne() 和 db.collection.insertMany()。**

db.collection.insertOne() 用于向集合插入一个新文档，语法格式如下：

```
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)
```

db.collection.insertMany() 用于向集合插入一个多个文档，语法格式如下：

```
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

参数说明：

- document：要写入的文档。
- writeConcern：写入策略，默认为 1，即要求确认写操作，0 是不要求。
- ordered：指定是否按顺序写入，默认 true，按顺序写入。

```
//查看已插入文档：
> db.col.find()
```

也可以将数据定义为一个变量，如下所示：

```
> document=({...
});
//插入
> db.col.insert(document)
WriteResult({ "nInserted" : 1 })
```

**更新文档：**

**update() 方法**

update() 方法用于更新已存在的文档。语法格式如下：

```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

**参数说明：**

- **query** : update的查询条件，类似sql update查询内where后面的。
- **update** : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- **upsert** : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi** : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern** :可选，抛出异常的级别。

**save() 方法**

save() 方法通过传入的文档来替换已有文档，_id 主键存在就更新，不存在就插入。语法格式如下：

```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```

**参数说明：**

- **document** : 文档数据。
- **writeConcern** :可选，抛出异常的级别。

**删除文档**

```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```

**参数说明：**

- **query** :（可选）删除的文档的条件。
- **justOne** : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
- **writeConcern** :（可选）抛出异常的级别。

现在官方推荐使用 deleteOne() 和 deleteMany() 方法。

如删除集合下全部文档：

```
db.inventory.deleteMany({})
```

删除 status 等于 A 的全部文档：

```
db.inventory.deleteMany({ status : "A" })
```

删除 status 等于 D 的一个文档：

```
db.inventory.deleteOne( { status: "D" } )
```

**查询文档**

MongoDB 查询数据的语法格式如下：

```
>db.collection.find(query, projection)
```

- **query** ：可选，使用查询操作符指定查询条件
- **projection** ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）。

如果你需要以易读的方式来读取数据，可以使用 pretty() 方法，语法格式如下：

```
>db.col.find().pretty()
```

pretty() 方法以格式化的方式来显示所有文档。

## 4、操作符

## 5、索引

**创建索引：**

```
db.collection.createIndex(keys, options)
//语法中 Key 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可。
//实例
db.col.createIndex({"title":1})
```

createIndex() 方法中你也可以设置使用多个字段创建索引（关系型数据库中称作复合索引）

```
db.col.createIndex({"title":1,"description":-1})
```

**相关操作：**

1、查看集合索引

```
db.col.getIndexes()
```

2、查看集合索引大小

```
db.col.totalIndexSize()
```

3、删除集合所有索引

```
db.col.dropIndexes()
```

4、删除集合指定索引

```
db.col.dropIndex("索引名称")
```

