/**
 * @file 数据库配置
 */
const mongoose = require('mongoose');
// 链接数据库
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// 数据库链接对象
const db = mongoose.connection;
// 链接失败
db.on('error', console.error.bind(console, 'connection error:'));
// 链接成功
db.once('open', function () {
    console.log('connect ok');
});