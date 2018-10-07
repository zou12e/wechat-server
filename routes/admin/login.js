const express = require('express');
const md5 = require('md5');
const router = express.Router();

// 登陆
router.post('/login', (req, res, next) => {

    console.log(req.body);
    if (req.body.username === 'admin' &&
    req.body.password === md5('wangsikun888')) {
        res.success('ok');
    } else {
        res.error({}, '账号密码错误');
    }
    // res.error('add user fail');
});

module.exports = router;
