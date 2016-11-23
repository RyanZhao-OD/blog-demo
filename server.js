const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config');    // 自己写的模块

let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');

let app = express();
// 当渲染模板的时候，没有指定后缀名的时候自动添加此后缀名来查找模板文件
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);


// 静态文件中间件 指定静态文件存放的根目录的绝对路径
app.use(express.static(path.join(__dirname, 'public')));

// 处理post请求的请求体 吧查询字符串转成对象挂在request.body上
app.use(bodyParser.urlencoded({extended: true}));  // Content-Type application/x-www-form-urlencoded
// app.use(bodyParser.json());  // Content-Type application/json

// 使用session中间件之后会在request属性挂session属性
app.use(session({
    secret: 'blogdemo',    //加密cookie秘钥
    saveUninitialized: true,  // 保存未使用的session对象
    resave: true,  // 每次客户端访问服务器的时候都会重新保存一次会话对象
    cookie: {
        httpOnly: true
    },
    store: new MongoStore({
        url: config.dbUrl
    })
}));

app.use(function(request, response, next){
    // response.locals是真正渲染模板的对象
    response.locals.success = request.session.success;
    response.locals.error = request.session.error;
    response.locals.user = request.session.user;
    request.session.success = request.session.error = null;
    next();
});

app.use('/', index);
// 判断请求的url是否以/user开头 如果是的话 执行user中间件函数
// 如果不是 直接跳过
app.use('/user', user);
app.use('/article', article);

app.listen(8080);