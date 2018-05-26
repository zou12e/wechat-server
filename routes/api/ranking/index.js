const express = require('express');
const router = express.Router();

const server = require('./server/ranking');
const auth = require('../auth');

// 获取列表
router.get('/punch', auth.checkSession, server.punch);

// 点赞or取消点赞
router.post('/thumb', auth.checkSession, server.thumb);

// 收藏or取消收藏

module.exports = router;
