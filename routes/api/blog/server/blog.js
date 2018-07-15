const config = require('config');
const path = require('path');
const fs = require('fs');
const request = require('request');
const _ = require('lodash');
const gm = require('gm').subClass({imageMagick: true});
const db = require('../db');
const host = config.get('host');
const saveFolder = '/opt/www/static/wechat/images2';
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
        if (data && data.id && data.score === 0) {
            await db.score(data.userId, data.id, data.time);
        }
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
        const blog = _.assign({userId: +req.id}, req.body);
        const id = await db.addBlog(blog);
        if (id) {
            await db.score(+req.id, id, blog.time);
            return res.success({id});
        }

        res.error('add blog fail');
    },
    /**
     * 保存言值图片
     */
    async saveImage (req, res, next) {
        const info = req.body;
        const _ph = path.join(__dirname, '../../../../sources');
        const _font = `${_ph}/PingFang.ttc`;
        const _bg = `${_ph}/icon-score-${info.random}-jpg.jpg`;
        const _star = `${_ph}/icon-score-star${info.star}.png`;
        const _bottom = `${_ph}/icon-score-bottom.png`;
        const _gw = `${_ph}/icon-score-${parseInt(info.blog.score / 10)}.png`;
        const _sw = `${_ph}/icon-score-${info.blog.score % 10}.png`;
        const _white = `${_ph}/icon-score-white.png`;
        const _head = info.blog.avatarUrl;
        const _headPath = `${saveFolder}/heads/${info.blog.userId}.jpg`;
        const _name = `${Date.now()}.jpg`;
        const _path = `${saveFolder}/${_name}`;

        /**
         * 不存在头像先保存头像
         */
        const result = await saveHead(_head, _headPath).catch(err => {
            console.log(err);
            return res.error('save blogImage fail');
        });
        if (result) {
            gm()
                .in('-page', '+0+0')
                .in(_bg)
                .in('-page', '+0+1159')
                .in(_bottom)
                .in('-page', '+55+382')
                .in(_star)
                .in('-page', '+252+550')
                .in(_gw)
                .in('-page', '+386+550')
                .in(_sw)
                .in('-page', '+62+880')
                .in(_white)
                .in('-page', '+93+905')
                .in(_headPath)
                .fontSize(30)
                .fill('#ffffff')
                .font(_font)
                .drawText(331, 537, '言值分')
                .fontSize(34)
                .drawText(190, 805, `恭喜您，超过${info.blog.percent || 30}%朗读者`)
                .fill('#999999')
                .fontSize(28)
                .drawText(86, 1050, '连续打卡')
                .drawText(441, 1050, '累计打卡')
                .fill('#000000')
                .drawText(238, 1050, `${info.continuDays}天`)
                .drawText(593, 1050, `${info.continuDays}次`)
                .drawText(168, 940, `${filteremoji(info.blog.nickName)}`)
                .mosaic()
                .write(_path, err => {
                    if (err) {
                        return res.error('save blogImage fail');
                    }
                    res.success(`${host}/static/wechat/images2/${_name}`);
                });
        }
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

function filteremoji (emojireg) {
    const ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]'
    ];
    return emojireg.replace(new RegExp(ranges.join('|'), 'g'), '');
}

function saveHead (_head, _headPath) {
    return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(_headPath)) {
            const writeStream = fs.createWriteStream(_headPath, {autoClose: true});
            const readStream = request(_head);
            readStream.pipe(writeStream);
            readStream.on('end', response => {
                writeStream.end();
            });
            writeStream.on('finish', () => {
                gm(_headPath).resize(50, 50, '!').write(_headPath, err => {
                    if (err) {
                        reject(err);
                    }
                    resolve(_headPath);
                });
            });
        } else {
            resolve(_headPath);
        }
    });
}

module.exports = Service;
