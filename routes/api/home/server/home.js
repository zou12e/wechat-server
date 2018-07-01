const moment = require('moment');
const db = require('../db');
const config = require('config');
const beginDate = config.get('beginDate');
const Service = {

    async getReadSpeak (req, res, next) {
        let read = {};
        const id = await db.getRecommend();
        if (id) {
            read = await db.getAudioInfoById(id);
        } else {
            const day = moment().diff(moment(beginDate), 'days');
            read = await db.getReadInfo(day);
        }
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
        const count = await db.getAudioCount();
        const day = parseInt(Math.random() * count);
        const data = await db.getReadInfo(day);
        if (!data) {
            return res.error('no data');
        }

        res.success(data);
    }
};
module.exports = Service;
