const rs = require('../../http');
const config = require('config');
const _ = require('lodash');
const db = require('../db');
const wechat = config.wechat;
const Service = {

    async login (req, res, next) {
        const uri = 'https://api.weixin.qq.com/sns/jscode2session';
        const data = {
            appid: wechat.appid,
            secret: wechat.secret,
            grant_type: 'authorization_code',
            js_code: req.body.code
        };
        const ret = await rs.get(uri, data);
        if (ret && ret.errcode) {
            return res.error(ret);
        }
        // const ret = {
        //     openid: 'oV-k24_KQDYj4_dl0-y_kuf2LCkI',
        //     session_key: 1
        // };
        if (ret && ret.openid && ret.session_key) {
            const result = await db.getUserInfo(ret.openid);
            if (result) {
                return res.success(_.assign(ret, result));
            }
            const id = await db.addUserInfo(ret.openid);
            if (id) {
                return res.success(_.assign(ret, {id}));
            }
            res.error('add user fail');
        }
    }
};
module.exports = Service;
