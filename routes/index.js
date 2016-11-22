const express = require('express');

let router = express.Router();   // 创建一个路由中间件的实例,它也是一个路由的容器，里面可以定义很多路由

// let Article = require('../model').Article;
router.get('/', function(request, response){
    // populate()用来将对应的属性从ObjectId转成对应的对象
    // Article.find({}).populate('user').exec(function (error, docs) {
    //     response.render('index', {
    //         title: '首页',
    //         articles: docs
    //     });
    // });
    response.render('index', {
        title: '首页',
        articles: []
    });
});



module.exports = router;