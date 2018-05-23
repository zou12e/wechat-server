const express = require('express');
const router = express.Router();

const lsver = require('./server/login');
// const auth = require('../auth');

// 登陆
router.post('/login', lsver.login);

module.exports = router;
