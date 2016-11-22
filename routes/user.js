const express = require('express');

let router = express.Router(); // 创建一个路由中间件的实例,它也是一个路由的容器，里面可以定义很多路由

router.get('/signup', function(request, response){
    response.send('/user/signup');
});

router.get('/signin', function(request, response){
    response.send('/user/signup');
});

router.get('/signout', function(request, response){
    response.send('/user/signup');
});

router.get('/signup', function(request, response){
    response.send('/user/signup');
});

module.exports = router;