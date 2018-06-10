const schedule = require('node-schedule');
const logger = require('./logger');
const db = require('../routes/api/user/db/index');

module.exports = async function () {
    // 每个星期一 10：00：00
    schedule.scheduleJob('0 0 10 * * 1', function () {
    });
    // TODO 每天凌晨12点算会员是否连续打卡，无连续打卡清空
    schedule.scheduleJob('1 0 0 * * *', async () => {
        logger.infos('begin maintainRecord');
        await db.maintainRecord();
    });
};
