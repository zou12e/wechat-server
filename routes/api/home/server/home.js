const moment = require('moment');
const db = require('../db');
const config = require('config');
const beginDate = config.get('beginDate');
const Service = {

    async getReadSpeak (req, res, next) {
        const day = moment().diff(moment(beginDate), 'days');

        const read = await db.getReadInfo(day);
        if (!read) {
            return res.error('no data');
        }
        const speak = {
            id: 1,
            title: '即学即用的职场说话课'
        };
        const data = {
            read,
            speak,
            info: {
                time: '18:00',
                date: moment().format('YYYY-MM-DD'),
                isRead: true
            }
        };
        res.success(data);
    },
    async changeInfo  (req, res, next) {
        const type = ~~req.query.type; // 1 早读  2晚讲
        let data = {};
        if (type === 1) {
            const count = await db.getReadCount();
            const day = parseInt(Math.random() * count);
            data = await db.getReadInfo(day);
            if (!data) {
                return res.error('no data');
            }
        } else {
            data = {
                id: 1,
                title: '歌曲是有记忆的',
                date: moment().format('YYYY-MM-DD')
            };
        }
        res.success(data);
    }
};
module.exports = Service;
