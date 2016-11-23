const express = require('express');
const util = require('util');
const multer  = require('multer');
const auth = require('../auth');

let upload = multer({ dest: 'public/' });

let UserModel = require('../model').UserModel;    // 当require一个目录时，会自动加载目录下的index.js文件

let router = express.Router();   // 创建一个路由中间件的实例,它也是一个路由的容器，里面可以定义很多路由

router.get('/signup', auth.checkNotLogin, function(request, response){
    response.render('user/signup', {
        title: 'xxx的注册'
    });
});

router.post('/tosignup', auth.checkNotLogin, upload.single('avatar'), function(request, response){
    let user = request.body;
    user.avatar = '/' + request.file.filename;
    UserModel.findOne({
        username: user.username
    }, function(error, doc){
        if(error) {
            request.session.error = util.inspect(error);
            // response.status(500).send(error);
            response.redirect('back');
        } else {
            if(doc) {
                // response.send({
                //     code: '40001',
                //     data: '该用户已经被存在'
                // });
                request.session.error = '用户已经存在';
                response.redirect('back');

            } else {
                UserModel.create(user, function(error, doc) {
                    if(error) {
                        request.session.error = util.inspect(error);
                        response.redirect('back');
                    } else {
                        request.session.success = '恭喜你注册成功';
                        response.redirect('/user/signin');
                    }
                });
            }
        }
    });

});

router.get('/signin', auth.checkNotLogin, function(request, response){
    response.render('user/signin', {
        title: 'xxx的登录'
    });
});

router.post('/tosignin', auth.checkNotLogin, function(request, response){
    let user = request.body;
    UserModel.findOne({
        username: user.username,
        password: user.password
    }, function(error, doc){
        if(error) {
            // response.status(500).send(error);
            request.session.error = util.inspect(error);
            response.redirect('back');
        } else {
            if(doc) {
                // response.send({
                //     code: '40001',
                //     data: '该用户已经被存在'
                // });
                request.session.success = '恭喜你登录成功';
                request.session.user = doc;
                response.redirect('/');
            } else {
                request.session.error = '名户名或密码不正确';
                response.redirect('back');
            }
        }
    });
});

router.get('/signout', auth.checkLogin, function(request, response) {
    request.session.user = null;
    request.session.success = '退出成功';
    response.redirect('/');
});


module.exports = router;