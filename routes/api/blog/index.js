const express = require('express');
const router = express.Router();

const server = require('./server/blog');
const auth = require('../auth');

// 获取列表
router.get('/list', auth.checkSession, server.list);

// 点赞or取消点赞
router.post('/thumb', auth.checkSession, server.thumb);

// 收藏or取消收藏
router.post('/collection', auth.checkSession, server.collection);

module.exports = router;
