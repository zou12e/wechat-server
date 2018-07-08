const express = require('express');
const router = express.Router();
const multer = require('multer');

const uploadFolder = '/opt/www/static/wechat/audio2';

// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now() + '.mp3');
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
const upload = multer({ storage: storage });

const server = require('./server/blog');
const auth = require('../auth');

// 获取blog列表
router.get('/list', auth.checkSession, server.list);

// 获取用户blog列表
router.get('/getBlogListByUserId', auth.checkSession, server.getBlogListByUserId);

// 获取收藏blog列表
router.get('/getCollectionBlogList', auth.checkSession, server.getCollectionBlogList);

// 获取blog详情
router.get('/getBlogById', auth.checkSession, server.getBlogById);

// 点赞or取消点赞
router.post('/thumb', auth.checkSession, server.thumb);

// 收藏or取消收藏
router.post('/collection', auth.checkSession, server.collection);

// 上传文件
router.post('/uploadFile', auth.checkSession, upload.single('file'), server.uploadFile);

// 保存blog
router.post('/save', auth.checkSession, server.save);

// 保存blog
router.post('/delete', auth.checkSession, server.delete);

module.exports = router;
