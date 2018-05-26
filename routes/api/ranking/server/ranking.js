const Service = {
    async punch (req, res, next) {
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
        res.success('success');
    }
};
module.exports = Service;
