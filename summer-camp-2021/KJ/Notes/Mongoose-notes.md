# Mongoose-notes

## 1、模式（Schemas）

**定义一个schema：**

Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。

```javascript
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```

在这之后你还想添加 keys 的话， 请使用 [Schema#add](http://www.mongoosejs.net/docs/api.html#schema_Schema-add) 方法。

**创建一个model：**

我们要把 schema 转换为一个 [Model](http://www.mongoosejs.net/docs/models.html)， 使用 `mongoose.model(modelName, schema)` 函数：

```javascript
  var Blog = mongoose.model('Blog', blogSchema);
  // ready to go!
```

**实例方法（method）：**

[documents](http://www.mongoosejs.net/docs/documents.html) 是 `Models` 的实例。 Document 有很多自带的[实例方法](http://www.mongoosejs.net/docs/api.html#document-js)， 当然也可以自定义我们自己的方法。

```javascript
  // define a schema
  var animalSchema = new Schema({ name: String, type: String });

  // assign a function to the "methods" object of our animalSchema
  animalSchema.methods.findSimilarTypes = function(cb) {
    return this.model('Animal').find({ type: this.type }, cb);
  };
```

**静态方法（static）：**

添加 `Model` 的静态方法也十分简单，继续用 `animalSchema` 举例：

```javascript
  // assign a function to the "statics" object of our animalSchema
  animalSchema.statics.findByName = function(name, cb) {
    return this.find({ name: new RegExp(name, 'i') }, cb);
  };

  var Animal = mongoose.model('Animal', animalSchema);
  Animal.findByName('fido', function(err, animals) {
    console.log(animals);
  });
```

**索引（index）：**

MongoDB 支持 [secondary indexes](http://docs.mongodb.org/manual/indexes/). 在 mongoose 中，我们在 `Schema` 中定义索引。索引分字段级别和schema级别，[复合索引](https://docs.mongodb.com/manual/core/index-compound/) 需要在 schema 级别定义。

```javascript
  var animalSchema = new Schema({
    name: String,
    type: String,
    tags: { type: [String], index: true } // field level
  });

  animalSchema.index({ name: 1, type: -1 }); // schema level
```

应用启动时， Mongoose 会自动调用 [`createIndex`](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex) 初始化你定义的索引。

