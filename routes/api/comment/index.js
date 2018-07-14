const express = require('express');
const router = express.Router();

const server = require('./server/comment');
const auth = require('../auth');

// 获取评论记录
router.get('/getCommentByBlogId', auth.checkSession, server.getCommentByBlogId);

// 获取评论详情
router.get('/getCommentById', auth.checkSession, server.getCommentById);

// 评论
router.post('/add', auth.checkSession, server.add);

// 删除评论
router.post('/delete', auth.checkSession, server.delete);

// 获取我的评论
router.get('/getMineComments', auth.checkSession, server.getMineComments);

module.exports = router;
