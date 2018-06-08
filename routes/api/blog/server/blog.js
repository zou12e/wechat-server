const config = require('config');
const _ = require('lodash');
const db = require('../db');
const host = config.get('host');
const Service = {
    /**
     * 查询发现， 早读，晚讲微博
     */
    async list (req, res, next) {
        const type = ~~req.query.type;
        const userId = req.id;
        const lastId = ~~req.query.lastId;
        const list = await db.getBlogList('type', type, userId, lastId, 20);
        res.success({list});
    },
    /**
     * 查询用户发的微博
     */
    async getBlogListByUserId (req, res, next) {
        const userId = req.id;
        const searchUserId = ~~req.query.id;
        const lastId = ~~req.query.lastId;
        const list = await db.getBlogList('userId', searchUserId, userId, lastId, 20);
        res.success({list});
    },
    /**
     * 收藏微博
     */
    async getCollectionBlogList (req, res, next) {
        const userId = req.id;
        const lastId = ~~req.query.lastId;
        const list = await db.getCollectionBlogList(userId, lastId, 20);
        res.success({list});
    },
    async thumb (req, res, next) {
        const userId = req.id;
        const blogId = ~~req.body.id;
        const result = await db.thumb(userId, blogId);
        if (result) {
            return res.success();
        }
        res.error('thumb blog fail');
    },
    async collection (req, res, next) {
        const userId = req.id;
        const blogId = ~~req.body.id;
        const result = await db.collection(userId, blogId);
        if (result) {
            return res.success();
        }
        res.error('collection blog fail');
    },
    async getBlogById (req, res, next) {
        const id = ~~req.query.id;
        const userId = req.id;
        const data = await db.getBlogById(id, userId);
        res.success(data);
    },
    async uploadFile (req, res, next) {
        const data = {};
        if (req.file) {
            data.path = `${host}/static/wechat/audio2/${req.file.filename}`;
            return res.success(data);
        }
        res.error(data);
    },
    async save (req, res, next) {
        const blog = _.assign({userId: req.id}, req.body);
        const id = await db.addBlog(blog);
        if (id) {
            return res.success({id});
        }

        res.error('add fail');
    }
};
module.exports = Service;
