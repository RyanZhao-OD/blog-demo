## blog
- bower init
 

- npm包依赖
```
  "dependencies": {
    "body-parser": "^1.15.2",
    "connect-mongo": "^1.3.2",
    "ejs": "^2.5.2",
    "express": "^4.14.0",
    "express-session": "^1.14.2",
    "mongoose": "^4.6.8",
    "multer": "^1.2.0"
  }
```

## MongoDB Schema

```javascript
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String
}, {
    collection: 'user'  // 指定存储在数据库中集合的名称
});

let ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    ctime: {
        type: String,
        default: new Date()
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    collection: 'article'     // 指定存储在数据库中集合的名称,如果没有指定 集合名转小写再加s  特别的情况child->children woman->women等
});
```

