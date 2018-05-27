const express = require('express');
const router = express.Router();

const server = require('./server/login');
const user = require('./server/user');
// const auth = require('../auth');

// 登陆
router.post('/login', server.login);

// 关注
router.post('/follow', user.follow);

// 修改user
router.post('/update', user.update);

// 获取user信息
router.get('/getUserById', user.getUserById);

// 我的信息（关注，收藏，评论）
router.get('/getInfo', user.getInfo);

// 我的打卡记录
router.get('/getPunchInfo', user.getPunchInfo);

// 关注列表
router.get('/getFollow', user.getFollow);

module.exports = router;
