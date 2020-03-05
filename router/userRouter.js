/**
 * @file user router
 */
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../db/model/userModel.js');
const Mail = require('../utils/mail.js');
// !!!不能直接使用app.use(),将它作为参数传进去
const parser = bodyParser.urlencoded({
    extended: false
});
let codes = {};
router.post('/reg', parser, (req, res) => {
    let {us, ps, code} = req.body;
    console.log(us, code, codes[us]);
    if (!us || !ps || !code) {
        return res.send({
            errno: -1,
            msg: 'registry param is error'
        });
    }
    // 判断验证码
    if (code != codes[us].code) {
        return res.send({
            errno: -1,
            msg: 'verifyCode is error'
        });
    }
    // 用户名是否存在
    User.find({us}).then(data => {
        if (data.length) {
            res.send({
                errno: -1,
                msg: 'username is already exit'
            });
        }
        else {
            return User.insertMany({us, ps});
        }
    })
    .then(() => {
        res.send({
            errno: 0,
            msg: 'registry success'
        });
    }).catch(() => {
        res.send({
            errno: -1,
            msg: 'registry fail'
        });
    });
});
router.post('/login', parser, (req, res) => {
    let {us, ps} = req.body;
    if (!us || !ps) {
        return res.send({
            errno: -1,
            msg: 'param is error'
        });
    }
    User.find({
        us,
        ps
    }).then(data => {
        if (data.length) {
            // 用户信息存入session
            req.session.login = true;
            req.session.us = us;
            res.send({
                errno: 0,
                msg: 'login success'
            });
        }
        else {
            res.send({
                errno: -1,
                msg: 'us or ps is error'
            });
        }
    }).catch(err => {
        console.log({
            errno: -1,
            msg: 'login fail'
        });
    });
});

// 发送邮箱验证码
router.post('/getVerifyCode', parser, (req, res) => {
    const {mail} = req.body;
    const code = parseInt(Math.random() * 10000);
    Mail.send(mail, code).then(() => {
        // 设置code值有效时长、次数限制等
        codes[mail] = {
            code
        };
        res.send({
            errno: 0,
            msg: 'send verifyCode success'
        });
    }).catch(err => {
        console.log(err);
        res.send({
            errno: -1,
            msg: 'send fail'
        });
    });
});

router.post('/logout', parser, (req, res) => {
    // 销毁session
    req.session.destroy();
    res.send({
        errno: 0,
        msg: 'logout success'
    });
});

module.exports = router;