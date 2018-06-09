
const moment = require('moment');
const _ = require('lodash');
const db = require('../db');
const Service = {
    async getCommentByBlogId (req, res, next) {
        const blogId = ~~req.query.id;
        const ret = await db.getCommentByBlogId(blogId);
        const data = {
            blogId: blogId,
            comments: ret.count,
            list: ret.list
        };
        res.success(data);
    },
    async getCommentById (req, res, next) {
        const commentId = ~~req.query.id;
        const ret = await db.getCommentById(commentId);
        const data = {
            blogId: ret.blogId,
            comment: ret
        };
        res.success(data);
    },
    async add (req, res, next) {
        const info = _.assign({userId: req.id}, req.body);
        const id = await db.addComment(info);
        if (id) {
            return res.success({id});
        }
        res.error('add blog fail');
    }
};
module.exports = Service;
