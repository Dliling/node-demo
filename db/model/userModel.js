/**
 * @file user
 */
const mongoose = require('mongoose');
// 创建schema对象
const Schema = mongoose.Schema;
// 创建一个和集合相关联的schema对象
const userSchema = new Schema({
    us: {
        type: String,
        required: true
    },
    ps: {
        type: String,
        required: true
    },
    age: Number,
    sex: {
        type: Number,
        default: 0
    } // 未知
});
// 将shema对象转化为数据模型
// 数据库名为复数，moogoose会自动将单数改为复数
const User = mongoose.model('users', userSchema); // 该数据对象与集合关联，('集合名'，schema对象)

module.exports = User;