const express = require('express');
const router = express.Router();

const server = require('./server/comment');
const auth = require('../auth');

// 获取评论记录
router.get('/getCommentByBlogId', auth.checkSession, server.getCommentByBlogId);

// 获取评论详情
router.get('/getCommentById', auth.checkSession, server.getCommentById);

module.exports = router;
