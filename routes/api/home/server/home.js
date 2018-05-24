const moment = require('moment');
const Service = {

    async getReadSpeak (req, res, next) {
        const data = {
            read: {
                id: 1,
                title: '歌曲是有记忆的',
                author: '来自网络',
                content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                url: 'https://www.zourunze.com/wechat/audio/1.mp3',
                time: 76
            },
            speak: {
                id: 1,
                title: '即学即用的职场说话课'
            },
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
            data = {
                id: 1,
                title: '空气中的味道',
                author: '来自网络',
                content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                url: 'https://www.zourunze.com/wechat/audio/1.mp3',
                time: 76,
                date: moment().format('YYYY-MM-DD')
            };
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
