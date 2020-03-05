/**
 * @file food
 */
const mongoose = require('mongoose');
// 创建schema对象
const Schema = mongoose.Schema;
// 创建一个和集合相关联的schema对象
const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    typeName: {
        type: String,
        required: true
    },
    typeId: {
        type: Number,
        default: 0 // 0是热菜，1是酒水
    },
    img: {
        type: String,
        required: true
    }
});
// 将shema对象转化为数据模型
// 数据库名为复数，moogoose会自动将单数改为复数
const Food = mongoose.model('foods', foodSchema); // 该数据对象与集合关联，('集合名'，schema对象)

module.exports = Food;