const express = require('express');
const router = express.Router();

const server = require('./server/login');
const user = require('./server/user');
const auth = require('../auth');

// 登陆
router.post('/login', server.login);

// 关注
router.post('/follow', auth.checkSession, user.follow);

// 修改user
router.post('/update', auth.checkSession, user.update);

// 获取user信息
router.get('/getUserById', auth.checkSession, user.getUserById);

// 我的信息（关注，收藏，评论, 点赞， 言值分）
router.get('/getInfo', auth.checkSession, user.getInfo);

// 我的打卡记录
router.get('/getPunchInfo', auth.checkSession, user.getPunchInfo);

// 关注列表
router.get('/getFollow', auth.checkSession, user.getFollow);

module.exports = router;
