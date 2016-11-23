//编写一个中间件函数，如果此用户未登录，则可能继续访问路由，如果已经登录，就弹回首页，并告诉他你已经登录过了，不要再重复登录了
exports.checkNotLogin = function(request, response, next){
    if(request.session.user){//则意味着已经登录了
        request.session.error = '你已经是登录状态了';
        response.redirect('/');
    } else {
        next();
    }
};

//编写一个中间件函数，如果此用户已经登录了，可以继续访问路由。如果此用户未登录，则跳过登录而让用户进行登录
exports.checkLogin = function(request, response, next){
    if(request.session.user){    //则意味着已经登录了
        next();
    } else {
        request.session.error = '请登录后再操作';
        response.redirect('/user/signin');
    }
};

