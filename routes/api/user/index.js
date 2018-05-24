const express = require('express');
const router = express.Router();

const server = require('./server/login');
const user = require('./server/user');
// const auth = require('../auth');

// 登陆
router.post('/login', server.login);

// 关注
router.post('/follow', user.follow);

module.exports = router;
