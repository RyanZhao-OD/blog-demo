const mongoose = require('mongoose');
const config = require('../config');
let ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect(config.dbUrl);

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

let UserModel = mongoose.model('User', UserSchema);
let ArticleModel = mongoose.model('Article', ArticleSchema);

exports.UserModel = UserModel;
exports.ArticleModel = ArticleModel;