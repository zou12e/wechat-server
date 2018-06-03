
const db = require('../db');
const Service = {
    async follow (req, res, next) {
        const userId = req.body.id;
        res.success(userId);
    },
    async update (req, res, next) {
        const user = req.body.user;
        if (!user.id) {
            return res.error('no user');
        }
        const ret = await db.updateUserInfo(user);
        if (ret) {
            return res.success();
        }
        res.error('update user fail');
    },
    async getFollow (req, res, next) {
        const type = ~~req.query.type;
        const data = {
            type: type,
            list: [
                {
                    id: 1,
                    userId: 1,
                    nickName: 'Cathy',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132'
                },
                {
                    id: 2,
                    userId: 2,
                    nickName: 'boker',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132'
                }
            ]
        };
        if (type === 1) {
            return res.success({list: []});
        }
        res.success(data);
    },
    async getUserById (req, res, next) {
        const data = await db.getUserInfoById(~~req.query.id);
        res.success(data);
    },
    async getInfo (req, res, next) {
        const data = {
            follows: 2,
            collections: 1,
            comments: 2
        };
        res.success(data);
    },
    async getPunchInfo (req, res, next) {
        const data = {
            allDays: 30,
            punchDays: 14,
            list: [
                13, 14, 15, 21, 22, 23, 24, 25, 26, 27, 28
            ]
        };
        res.success(data);
    }
};
module.exports = Service;
