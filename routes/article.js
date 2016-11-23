const express = require('express');
const util = require('util');
const auth = require('../auth');

let ArticleModel = require('../model').ArticleModel;

let router = express.Router();   // 创建一个路由中间件的实例,它也是一个路由的容器，里面可以定义很多路由

router.get('/add', auth.checkLogin, function(request, response){
    response.render('article/add', {
        title: request.session.user.username + '发表文章'
    });
});

router.post('/toadd', auth.checkLogin, function(request, response){
    let article = request.body;
    article.user = request.session.user._id;
    article.ctime = new Date();
    ArticleModel.create(article, function(error, doc) {
        if(error) {
            request.session.error = util.inspect(error);
            response.redirect('back');
        } else {
            request.session.success = '文章发表成功';
            response.redirect('/');
        }
    });
});

router.get('/detail/:_id', function(request, response){
    ArticleModel.findById(request.params._id, function(error, doc){
        if(error) {

        } else {
            if (doc) {
                response.render('article/detail', {
                    title: '文章详情',
                    article: doc
                });
            } else {

            }
        }
    });
});

router.get('/delete/:_id', auth.checkLogin, function(request, response){
    let articleId = request.params._id;
    ArticleModel.findById(articleId, function(error, article) {
        if(article.user == request.session.user._id) {
            ArticleModel.remove({
                _id: request.params._id
            }, function(error, result) {
                if(error){
                    request.session.error = util.inspect(error);
                    response.redirect('back');
                }else{
                    request.session.success = '删除文章成功';
                    response.redirect('/');
                }
            });
        }else{
            request.session.error = '这不是你的文章，你无权删除';
            response.redirect('back');
        }
    })
});

module.exports = router;