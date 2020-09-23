const config = require('config');
const path = require('path');
const fs = require('fs');
const request = require('request');
const _ = require('lodash');
const gm = require('gm').subClass({imageMagick: true});
const db = require('../db');
const host = config.get('host');
const saveFolder = '/opt/www/website/static/wechat/images2';
const logger = require('../../../../middleware/logger');
const qiniu = require('qiniu');
const accessKey = 'iyoo6yHtN_euHKaHBpRjlcnC8flcQxGzQhFV8keM';
const secretKey = 'oS3oX6SXINTp-Nw_Vqq56ZemcN0yUmF9PZG8c36m';

const Service = {
    /**
     * 查询发现， 所有微博
     */
    async list (req, res, next) {
        const userId = req.id;
        const lastId = ~~req.query.lastId;
        const size = ~~req.query.size;
        const ret = await db.getBlogList('status', 1, userId, lastId, size || 30);
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
        const size = ~~req.query.size;
        const ret = await db.getBlogList('userId', searchUserId, userId, lastId, size || 30);
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
        const size = ~~req.query.size;
        const ret = await db.getCollectionBlogList(userId, lastId, size || 30);
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
            await db.score(data.userId, data.id, data.time, data.type);
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
            await db.score(+req.id, id, blog.time, blog.type);
            return res.success({id});
        }

        res.error('add blog fail');
    },
    /**
     * 保存言值图片
     */
    async saveImage (req, res, next) {
        try {
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
                info.blog.text = repalceB(info.blog.text);
                gm()
                    .in('-page', '+0+0')
                    .in(_bg)
                    .in('-page', '+0+1159')
                    .in(_bottom)
                    .in('-page', '+188+688')
                    .in(_star)
                    .in('-page', '+252+448')
                    .in(_gw)
                    .in('-page', '+386+448')
                    .in(_sw)
                    .in('-page', '+62+880')
                    .in(_white)
                    .in('-page', '+93+905')
                    .in(_headPath)
                    .fontSize(30)
                    .fill('#ffffff')
                    .font(_font)
                    .drawText(106, 420, '经过“趣朗读”人工智能测评，你的言值分')
                    .fontSize(30)
                    .drawText(parseInt((750 - (750 / 25) * info.blog.text.length) / 2), 810, `${info.blog.text}`)
                    .fill('#999999')
                    .fontSize(28)
                    .drawText(86, 1026, '连续打卡')
                    .drawText(284, 1026, '累计打卡')
                    .drawText(486, 1026, '言值超过全国')
                    .fill('#000000')
                    .drawText(101, 1086, `${info.continuDays}天`)
                    .drawText(317, 1086, `${info.punchDays}次`)
                    .drawText(530, 1086, `${info.blog.percent || 70}%人`)
                    .drawText(164, 940, `${filteremoji(info.blog.nickName)}`)
                    .mosaic()
                    .write(_path, err => {
                        if (err) {
                            return res.error('save blogImage fail');
                        }
                        res.success(`${host}/static/wechat/images2/${_name}`);
                    });
            }
        } catch (e) {
            logger.infos(`saveImage err e:${e}`);
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
    },
    /**
     * 获取token凭证
     */
    async getUploadToken (req, res, next) {
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const options = {
            scope: 'wechat/audio3'
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        return res.success(uploadToken);
    }
};
function repalceB (str) {
    return str.replace('\b', '');
}
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
