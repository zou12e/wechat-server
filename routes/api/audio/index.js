const express = require('express');
const router = express.Router();

const server = require('./server/audio');
const auth = require('../auth');

// 通过id获取语音详情
router.get('/getAudioById', auth.checkSession, server.getAudioById);

module.exports = router;
