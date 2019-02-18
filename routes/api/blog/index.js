const express = require('express');
const router = express.Router();
const server = require('./server/blog');
const multer = require('multer');

const uploadFolder = '/opt/www/static/wechat/images1';

// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        const _tail = /\.(.*)/.exec(file.originalname)[0];
        cb(null, file.fieldname + '-' + Date.now() + _tail);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({ storage: storage });

// 上传文件
router.post('/uploadImage', upload.single('file'), server.uploadFile);

// 保存图片
router.post('/saveImage', server.saveImage);

module.exports = router;
