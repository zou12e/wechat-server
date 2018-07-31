
const db = require('../db');
const moment = require('moment');
const config = require('config');
const beginDate = config.get('beginDate');
const logger = require('../../../../middleware/logger');
const Service = {
    async follow (req, res, next) {
        const userId = req.id;
        const toUserId = req.body.id;
        const result = await db.follow(userId, toUserId);
        if (result) {
            return res.success();
        }
        res.error('follow user fail');
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
        const userId = req.id;
        const data = {
            type: type,
            list: await db.getFollow(type, userId)
        };
        res.success(data);
    },
    async getUserById (req, res, next) {
        const mineUserId = req.id;
        const userId = ~~req.query.id;
        const data = await db.getUserInfoById(userId, mineUserId);
        res.success(data);
    },
    async getInfo (req, res, next) {
        const data = await db.getCountInfo(req.id);
        data.allDays = moment().diff(moment(beginDate), 'days');
        res.success(data);
    },
    async getPunchInfo (req, res, next) {
        const userId = req.id;
        const list = await db.getRecordInfo(userId);
        res.success({list});
    },
    async err (req, res, next) {
        logger.error({
            id: req.id,
            err: req.body.err
        });
        res.success('ok');
    }
};
module.exports = Service;
