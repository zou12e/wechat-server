const moment = require('moment');
const Service = {
    async list (req, res, next) {
        const type = ~~req.query.type;
        const data = {
            list: [{
                id: 1,
                userId: 1,
                nickName: 'Jeff',
                avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                isFollow: false,
                title: '歌曲是有记忆的',
                author: '来自网络',
                content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                url: 'https://www.zourunze.com/static/wechat/audio/1.mp3',
                time: 76,
                comments: 4,
                thumbs: 13,
                isRecommend: true,
                isCollection: true,
                isThumb: false,
                createTime: moment().format('YYYY-MM-DD HH:mm')
            },
            {
                id: 2,
                userId: 2,
                nickName: 'Cathy',
                avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                isFollow: true,
                title: '瞬间沉寂',
                author: '来自网络',
                content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                url: 'https://www.zourunze.com/static/wechat/audio/1.mp3',
                time: 76,
                comments: 3,
                thumbs: 2,
                isRecommend: false,
                isCollection: false,
                isThumb: true,
                createTime: moment().format('YYYY-MM-DD HH:mm')
            }
            ]
        };
        if (type === 2) {
            return res.success({
                list: []
            });
        }
        res.success(data);
    },
    async thumb (req, res, next) {
        const id = req.body.id;
        res.success(id);
    },
    async collection (req, res, next) {
        const id = req.body.id;
        res.success(id);
    },
    async getBlogById (req, res, next) {
        const id = req.query.id;
        const data = {
            id: id,
            userId: id,
            nickName: 'Cathy',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
            isFollow: true,
            title: '瞬间沉寂',
            author: '来自网络',
            content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
            url: 'https://www.zourunze.com/static/wechat/audio/1.mp3',
            time: 76,
            comments: 3,
            thumbs: 2,
            isRecommend: false,
            isCollection: false,
            isThumb: true,
            createTime: moment().format('YYYY-MM-DD HH:mm')
        };
        res.success(data);
    }
};
module.exports = Service;
