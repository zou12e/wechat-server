const Service = {
    async punch (req, res, next) {
        // const type = req.query.type;
        const data = {
            mine: {
                userId: 1,
                nickName: 'Jeff',
                avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                days: 0,
                ranking: 114
            },
            list: [
                {
                    userId: 1,
                    nickName: 'Jeff',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 23,
                    ranking: 1
                },
                {
                    userId: 2,
                    nickName: 'Cathy',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 14,
                    ranking: 2
                },
                {
                    userId: 3,
                    nickName: 'Boker',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 10,
                    ranking: 3
                },
                {
                    userId: 4,
                    nickName: '航盛',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 3,
                    ranking: 4
                },
                {
                    userId: 5,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 5
                },
                {
                    userId: 6,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 6
                },
                {
                    userId: 7,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 7
                },
                {
                    userId: 8,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 8
                },
                {
                    userId: 9,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 9
                },
                {
                    userId: 10,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 10
                },
                {
                    userId: 11,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 11
                },
                {
                    userId: 12,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 12
                },
                {
                    userId: 13,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 13
                },
                {
                    userId: 14,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    days: 2,
                    ranking: 14
                }
            ]
        };
        res.success(data);
    },
    async thumb (req, res, next) {
        const data = {
            mine: {
                ranking: 4
            },
            list: [
                {
                    userId: 1,
                    nickName: 'Jeff',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    blogId: 1,
                    title: '歌曲是有记忆的',
                    author: '来自网络',
                    content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                    url: 'https://www.zourunze.com/static/wechat/audio/1.mp3',
                    thumbs: 23,
                    ranking: 1
                },
                {
                    userId: 2,
                    nickName: 'Cathy',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    blogId: 3,
                    title: '一种感觉',
                    author: '来自网络',
                    content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                    url: 'https://www.zourunze.com/static/wechat/audio/1.mp3',
                    thumbs: 14,
                    ranking: 2
                },
                {
                    userId: 3,
                    nickName: 'Boker',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    blogId: 3,
                    title: '一首歌',
                    author: '来自网络',
                    content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                    url: 'https://www.zourunze.com/static/wechat/audio/1.mp3',
                    thumbs: 10,
                    ranking: 3
                },
                {
                    userId: 4,
                    nickName: '航盛',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    blogId: 4,
                    title: '歌曲是有记忆的',
                    author: '来自网络',
                    content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                    url: 'https://www.zourunze.com/static/wechat/audio/1.mp3',
                    thumbs: 3,
                    ranking: 4
                },
                {
                    userId: 5,
                    nickName: 'mindray',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    blogId: 5,
                    title: '拐角',
                    author: '来自网络',
                    content: '一种感觉。歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了。但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态。可你心里知道，这些歌曲真真切切的承载过你的记忆。',
                    url: 'https://www.zourunze.com/static/wechat/audio/1.mp3',
                    thumbs: 2,
                    ranking: 5
                }
            ]
        };
        res.success(data);
    }
};
module.exports = Service;
