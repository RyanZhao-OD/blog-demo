const express = require('express');
const path = require('path');
const ejs = require('ejs');


let indexRoute = require('./routes/index');
let userRoute = require('./routes/user');


let app = express();
// 当渲染模板的时候，没有指定后缀名的时候自动添加此后缀名来查找模板文件
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);

// 静态文件中间件 指定静态文件存放的根目录的绝对路径
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
// 判断请求的url是否以/user开头 如果是的话 执行user中间件函数
// 如果不是 直接跳过
app.use('/user', userRoute);

app.listen(8080);

