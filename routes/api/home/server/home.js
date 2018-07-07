const moment = require('moment');
const db = require('../db');
const weeks = ['天', '一', '二', '三', '四', '五', '六'];
const Service = {

    async getReadSpeak (req, res, next) {
        const read = await db.getRecommend();
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
                day: moment().format('DD'),
                ym: moment().format('YYYY.MM'),
                week: '星期' + weeks[moment().format('d')],
                isRead: true
            }
        };
        res.success(data);
    },
    async changeInfo  (req, res, next) {
        const count = await db.getAudioCount();
        const day = parseInt(Math.random() * count);
        const data = await db.getAudioInfo(day);
        if (!data) {
            return res.error('no data');
        }

        res.success(data);
    }
};
module.exports = Service;
