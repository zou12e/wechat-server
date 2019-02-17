const express = require('express');
const router = express.Router();
const server = require('./server/blog');

// 保存图片
router.post('/saveImage', server.saveImage);

module.exports = router;
