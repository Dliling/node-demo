/**
 * @file food router
 */
const express = require('express');
const bodyParser = require('body-parser');
const foodModel = require('../db/model/foodModel.js');
const router = express.Router();
const jsonParser = bodyParser.json();
const parser = bodyParser.urlencoded({
    extended: false
});

/**
 * @api {post} /food/add 添加菜品
 * @apiName addfood
 * @apiGroup food
 * 
 * @apiParam {String} name 菜品名
 * @apiParam {String} price 菜品价格
 * @apiParam {String} desc 菜品描述
 * @apiParam {String} typeName 菜品名
 * 
 * @apiSuccess {String} 
 */
router.post('/add', jsonParser, (req, res) => {
    const {
        name,
        price,
        desc,
        typeName,
        img
    } = req.body;

    foodModel.insertMany({
        name,
        price,
        desc,
        typeName,
        img
    }).then(data => {
        res.send({
            errno: 0,
            msg: 'add success'
        });
    }).catch(err => {
        console.log(err, 'err');
        res.send({
            errno: -1,
            msg: 'add fail'
        });
    });
});

/**
 * @api {post} /food/idQuery 菜品查询
 * @apiName typeQuery
 * @apiGroup food
 * 
 * @apiParam {String} typeId 菜品种类
 * 
 * @apiSuccess {String} 
 */
router.post('/idQuery', jsonParser, (req, res) => {
    const {_id} = req.body;
    foodModel.find({_id}).then(data => {
        if (data.length) {
            res.send({
                errno: 0,
                msg: 'query success',
                data
            });
        }
        else {
            res.send({
                errno: -1,
                msg: 'no food match'
            });
        }
    }).catch(err => {
        console.log(err);
        res.send({
            errno: -1,
            msg: 'typeQuery fail'
        });
    });
});

/**
 * @api {post} /food/kwQuery 菜品关键字查询
 * @apiName kwQuery
 * @apiGroup food
 * 
 * @apiParam {String} kw 关键字
 * 
 * @apiSuccess {String} 
 */
router.post('/kwQuery', parser, (req, res) => {
    const {kw} = req.body;
    const reg = new RegExp(kw);
    foodModel.find({
        // name: {$regex: reg}
        $or: [{name: {$regex: reg}}, {desc: {$regex: reg}}]
    }).then(data => {
        if (data.length) {
            res.send({
                errno: 0,
                msg: 'query success',
                data
            });
        } else {
            res.send({
                errno: 0,
                msg: 'no food match'
            });
        }
    }).catch(err => {
        console.log(err);
        res.send({
            errno: -1,
            msg: 'kwQuery fail'
        });
    });
});

/**
 * @api {post} /food/del 删除
 * @apiName del
 * @apiGroup food
 * 
 * @apiParam {String} typeId 菜品种类
 * 
 * @apiSuccess {String} 
 */

router.post('/del', parser, (req, res) => {
    const {_id} = req.body;
    // 删除多个传入数组
    foodModel.deleteOne({_id}).then(data => {
        res.send({
            errno: 0,
            msg: 'del success'
        });
    }).catch(err => {
        console.log(err, 'err');
        res.send({
            errno: -1,
            msg: 'del fail'
        });
    });
});

/**
 * @api {post} /food/update 修改
 * @apiName update
 * @apiGroup food
 * 
 * @apiParam {String} typeId 菜品种类
 * 
 * @apiSuccess {String} 
 */
router.post('/update', jsonParser, (req, res) => {
    const {
        name,
        price,
        desc,
        typeName,
        img,
        _id
    } = req.body;
    foodModel.updateOne({_id}, {
        name,
        price,
        desc,
        typeName,
        img
    }).then(() => {
        // 返回一个obj
        res.send({
            errno: 0,
            msg: 'update success'
        });
    }).catch(err => {
        console.log(err, 'err');
        res.send({
            errno: -1,
            msg: 'update fail'
        });
    });
});

/**
 * @api {post} /food/getInfoByPage 分页查询
 * @apiName getInfoByPage
 * @apiGroup food
 * 
 * @apiParam {Number} pageSize 菜品种类
 * @apiParam {Number} page 菜品种类
 * 
 * @apiSuccess {String} 
 */
router.post('/getInfoByPage', parser, (req, res) => {
    const pageSize = Number(req.body.pageSize) || 1;
    const page = Number(req.body.page) || 1;
    let allNum = null;
    // 返回总页数
    foodModel.find().then(data => {
        if (data.length) {
            allNum = data.length;
        }
    });
    // limit() 最大条数 skip() 跳过的条数
    foodModel.find().limit(pageSize).skip((page - 1) * pageSize).then(data => {
        if (data.length) {
            res.send({
                errno: 0,
                list: data,
                allNum
            });
        }
        else {
            res.send({
                errno: -1,
                msg: 'get fail'
            });
        }
    }).catch(err => {
        console.log(err, 'err');
        res.send({
            errno: -1,
            msg: 'get fail'
        });
    });
});

module.exports = router;