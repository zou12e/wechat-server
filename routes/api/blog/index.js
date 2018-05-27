const express = require('express');
const router = express.Router();

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

module.exports = router;
