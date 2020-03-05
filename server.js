/**
 * @file entry
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db/connect.js');
const cors = require('cors');
const app = new express();
const userRouter = require('./router/userRouter.js');
const foodRouter = require('./router/foodRouter.js');
const fileRouter = require('./router/fileRouter.js');
// session 不可跨域
app.use(session({
    secret: 'keyboard cat',
    resave: true, // 即使session没有改变，也保存
    saveUninitialized: false, // 无论有没有session cookie，每次请求都设置个cookie，默认给个提示
    cookie: {
        secure: false, // 若为TRUE，不会将cookie携带回服务端
        maxAge: 60 * 1000 * 60
    }
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/food', (req, res, next) => {
    // 登录后才可查看
    if (req.session.login) {
        next();
    }
    else {
        res.send({
            errno: -9,
            msg: 'login first'
        });
    }
}, foodRouter);
app.use('/file', fileRouter);

// 静态目录 第一个参数为虚拟的文件前缀，实际上文件系统中不存在
// 可以用public做为前缀来加载static文件夹下的文件了
app.use('/public', express.static(path.join(__dirname, './static')));
app.use(cors());
app.listen(3000, () => {
    console.log('service start');
});