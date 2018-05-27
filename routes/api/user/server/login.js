const rs = require('../../http');
const config = require('config');
const wechat = config.wechat;
const Service = {

    async login (req, res, next) {
        // const uri = 'https://api.weixin.qq.com/sns/jscode2session';
        // const data = {
        //     appid: wechat.appid,
        //     secret: wechat.secret,
        //     grant_type: 'authorization_code',
        //     js_code: req.body.code
        // };
        // const ret = await rs.get(uri, data);
        // if (ret && ret.errcode) {
        //     return res.error(ret);
        // }
        const ret = {
            openid: 'oV-k24_KQDYj4_dl0-y_kuf2LCkI',
            session_key: '58NvXfnM0v+dR1eJmzvY0w==',
            id: 1,
            nickName: 'Jeff',
            gender: 1,
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132'
        };
        res.success(ret);
    }
};
module.exports = Service;
