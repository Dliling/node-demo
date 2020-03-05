/**
 * @file file router
 */
const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const dir = path.resolve(__dirname, '../static/img');
const SIZELIMIT = 500000;

const storage = multer.diskStorage({
    // 指定文件路径,相对路径时以执行目录为准
    destination: function(req, file, cb) {
        // cb(null, './uploads');
        cb(null, dir);
    },
    // 指定文件名
    filename: function(req, file, cb) {
        // filedname指向参数key值
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

router.post('/uploadSingle', upload.single('file'), (req, res) => {
    // 即将上传图片的key值 form-data对象{key: value}
    console.log(req, '123')
    // 检查是否有文件待上传
    if (req.file === undefined) {
        return res.send({
            errno: -1,
            msg: 'no file'
        });
    }
    const {size, mimetype, filename} = req.file;
    const types = ['jpg', 'jpeg', 'png', 'gif'];
    const tmpTypes = mimetype.split('/')[1];
    if (size >= SIZELIMIT) {
        return res.send({
            errno: -1,
            msg: 'file is too large'
        });
    }
    else if (types.indexOf(tmpTypes) < 0) {
        return res.send({
            errno: -1,
            msg: 'not accepted filetype'
        });
    }
    const url = '/public/img/' + filename;
    res.json({
        errno: 0,
        msg: 'upload success',
        url
    });
});

module.exports = router;