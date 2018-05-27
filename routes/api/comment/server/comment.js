
const moment = require('moment');
const Service = {
    async getCommentByBlogId (req, res, next) {
        const blogId = ~~req.query.id;
        const data = {
            blogId: blogId,
            comments: 2,
            list: [
                {
                    id: 1,
                    parentId: 0,
                    userId: 1,
                    nickName: 'pp',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    content: '你好漂亮',
                    createTime: moment().format('YYYY-MM-DD HH:mm'),
                    replys: 2,
                    replyList: [
                        {
                            id: 1,
                            parentId: 1,
                            userId: 1,
                            nickName: 'jeff',
                            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                            toUserId: 1,
                            toNickName: 'pp',
                            content: '谢谢小姐姐,谢谢小姐姐,谢谢小姐姐,谢谢小姐姐,谢谢小姐姐,谢谢小姐姐',
                            createTime: moment().format('YYYY-MM-DD HH:mm')
                        }
                    ]
                },
                {
                    id: 2,
                    parentId: 0,
                    userId: 2,
                    nickName: 'jeff',
                    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                    content: '继续加油',
                    createTime: moment().format('YYYY-MM-DD HH:mm'),
                    replys: 0,
                    replyList: []
                }
            ]
        };
        res.success(data);
    },
    async getCommentById (req, res, next) {
        const commentId = ~~req.query.id;
        const data = {
            blogId: 1,
            comment: {
                id: commentId,
                parentId: 0,
                userId: 1,
                nickName: 'pp',
                avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                content: '你好漂亮',
                createTime: moment().format('YYYY-MM-DD HH:mm'),
                replys: 2,
                replyList: [
                    {
                        id: 3,
                        parentId: commentId,
                        userId: 5,
                        nickName: 'jeff',
                        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                        toUserId: 1,
                        toNickName: 'pp',
                        content: '谢谢小姐姐谢谢小姐姐谢谢小姐姐谢谢小姐姐谢谢小姐姐谢谢小姐姐谢谢小姐姐谢谢小姐姐',
                        createTime: moment().format('YYYY-MM-DD HH:mm')
                    },
                    {
                        id: 4,
                        parentId: 3,
                        userId: 2,
                        nickName: 'boker',
                        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/ibDCFl5GOYXxGpq6BZRic6appic2BEkvUpKrItjDCxDJAuz2G7yzf1W1dXRia2ucLBdTZ6I2pVtxbhzANWOnqSuqpA/132',
                        toUserId: 5,
                        toNickName: 'jeff',
                        content: '同感',
                        createTime: moment().format('YYYY-MM-DD HH:mm')
                    }
                ]
            }
        };
        res.success(data);
    }
};
module.exports = Service;
