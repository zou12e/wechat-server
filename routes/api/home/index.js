const express = require('express');
const router = express.Router();

const server = require('./server/home');
const auth = require('../auth');

// 获取早读晚讲内容
router.get('/getReadSpeak', auth.checkSession, server.getReadSpeak);

module.exports = router;
