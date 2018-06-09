const db = require('../db');
const Service = {
    async punch (req, res, next) {
        const type = ~~req.query.type;
        const userId = req.id;
        let ret = {};
        if (type === 0) {
            ret = await db.getContinuePunchRanking(userId);
        } else {
            ret = await db.getAllPunchRanking(userId);
        }
        const data = {
            mine: ret.mine,
            list: ret.list
        };
        res.success(data);
    },
    async thumb (req, res, next) {
        const data = {
            list: await db.getThumbRanking()
        };
        res.success(data);
    }
};
module.exports = Service;
