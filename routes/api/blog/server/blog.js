const config = require('config');
const _ = require('lodash');
const db = require('../db');
const host = config.get('host');
const Service = {
    /**
     * 查询发现， 所有微博
     */
    async list (req, res, next) {
        const userId = req.id;
        const lastId = ~~req.query.lastId;
        const ret = await db.getBlogList('status', 1, userId, lastId, 30);
        res.success({
            list: ret.list,
            count: ret.count
        });
    },
    /**
     * 查询用户发的微博
     */
    async getBlogListByUserId (req, res, next) {
        const userId = req.id;
        const searchUserId = ~~req.query.id;
        const lastId = ~~req.query.lastId;
        const ret = await db.getBlogList('userId', searchUserId, userId, lastId, 30);
        res.success({
            list: ret.list,
            count: ret.count
        });
    },
    /**
     * 收藏微博
     */
    async getCollectionBlogList (req, res, next) {
        const userId = req.id;
        const lastId = ~~req.query.lastId;
        const ret = await db.getCollectionBlogList(userId, lastId, 30);
        res.success({
            list: ret.list,
            count: ret.count
        });
    },
    /**
     * 点赞微博
     */
    async thumb (req, res, next) {
        const userId = req.id;
        const blogId = ~~req.body.id;
        const result = await db.thumb(userId, blogId);
        if (result) {
            return res.success();
        }
        res.error('thumb blog fail');
    },
    /**
     * 收藏微博
     */
    async collection (req, res, next) {
        const userId = req.id;
        const blogId = ~~req.body.id;
        const result = await db.collection(userId, blogId);
        if (result) {
            return res.success();
        }
        res.error('collection blog fail');
    },
    /**
     * 查下微博详情
     */
    async getBlogById (req, res, next) {
        const id = ~~req.query.id;
        const userId = req.id;
        const data = await db.getBlogById(id, userId);
        res.success(data);
    },
    /**
     * 上传语音
     */
    async uploadFile (req, res, next) {
        const data = {};
        if (req.file) {
            data.path = `${host}/static/wechat/audio2/${req.file.filename}`;
            return res.success(data);
        }
        res.error(data);
    },
    /**
     * 保存微博
     */
    async save (req, res, next) {
        const blog = _.assign({userId: req.id}, req.body);
        const id = await db.addBlog(blog);
        if (id) {
            return res.success({id});
        }

        res.error('add blog fail');
    },
    /**
     * 删除微博
     */
    async delete (req, res, next) {
        const id = ~~req.body.id;
        const data = await db.deleteBlog(id);
        if (data) {
            return res.success({});
        }
        res.error('delete blog fail');
    }
};
module.exports = Service;
