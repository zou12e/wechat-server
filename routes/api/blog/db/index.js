const mydb = require('../../../../db/mysql');
const mysql = require('mysql');
const moment = require('moment');

const Helper = {
    /**
     * 新增微博
     */
    async addBlog (blog) {
        let sql = 'insert into blog(userId,audioId,time,url,type,createTime,updateTime) VALUES(?,?,?,?,?,now(),now())';
        sql = mysql.format(sql, [+blog.userId, +blog.audioId, +blog.time, blog.url, +blog.type]);
        const result = await mydb.dataCenter(sql).catch(e => false);

        const today = moment().format('YYYY-MM-DD');
        sql = 'select count(1) as count from record where userId = ? and date = ?';
        sql = mysql.format(sql, [+blog.userId, today]);
        const ret = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        if (ret && ret[0].count === 0) {
            sql = 'insert into record(userId,date,createTime) VALUES(?,?,now())';
            sql = mysql.format(sql, [+blog.userId, today]);
            await mydb.dataCenter(sql).catch(e => null);

            sql = 'update user set days = days + 1 where id = ?';
            sql = mysql.format(sql, [+blog.userId]);
            await mydb.dataCenter(sql).catch(e => null);
        }
        if (result && result.insertId) {
            return result.insertId;
        }
        return false;
    },
    /**
     * 查看所有微博
     * 个人微博
     * 他人微博
     */
    async getBlogList (condition, value, userId, lastId, size = 20) {
        let sql = `select 
        b.id, b.id as blogId,b.userId,nickName,avatarUrl,banner,
        (select count(1) from follow where userId =  ? and toUserId = b.userId) as isFollow,
        title,author,audioAuthor,content,
        b.url,b.time,
        (select count(1) from comment where blogId =  b.id and status = 1)  as comments,
        (select count(1) from thumb where blogId =  b.id)  as thumbs,
        b.isRecommend,
        (select count(1) from collection where userId = ? and blogId = b.id) as isCollection,
        (select count(1) from thumb where userId = ? and blogId = b.id) as isThumb,
        b.createTime as createOriginalTime,
        date_format(b.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        from blog as b 
        left join audio as a on b.audioId = a.id
        left join user as u on b.userId = u.id
        where b.status = 1 
        and ?? = ? 
        and ${lastId ? ('b.id < ' + mysql.format(lastId) + ' and b.isRecommend = 0') : 'b.id > 0'} 
        order by b.isRecommend desc, b.id desc
        limit 0 ,?`;
        sql = mysql.format(sql, [userId, userId, userId, 'b.' + condition, value, size]);
        const list = await mydb.dataCenter(sql).catch(e => []);

        sql = 'select count(1) as count from blog where status = 1 and ?? = ?';
        sql = mysql.format(sql, [condition, value]);
        const ret = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        return {
            list,
            count: ret[0].count
        };
    },
    /**
     * 查看收藏微博
     */
    async getCollectionBlogList (userId, lastId, size = 20) {
        let sql = `select 
        c.id, b.id as blogId,b.userId,nickName,avatarUrl,banner,
        (select count(1) from follow where userId =  ? and toUserId = b.userId ) as isFollow,
        title,author,audioAuthor,content,
        b.url,b.time,
        (select count(1) from comment where blogId =  b.id and status = 1)  as comments,
        (select count(1) from thumb where blogId =  b.id)  as thumbs,
        b.isRecommend,
        1 as isCollection,
        (select count(1) from thumb where userId = ? and blogId = b.id) as isThumb,
        b.createTime as createOriginalTime,
        date_format(b.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        from collection as c
        left join blog as b on c.blogId = b.id 
        left join audio as a on b.audioId = a.id
        left join user as u on b.userId = u.id
        where c.userId = ?
        and b.status = 1 
        and ${lastId ? 'c.id < ' + mysql.format(lastId) : 'c.id > 0'} 
        order  by c.id desc
        limit 0 ,?`;
        sql = mysql.format(sql, [userId, userId, userId, size]);
        const list = await mydb.dataCenter(sql).catch(e => []);

        sql = 'select count(1) as count from collection where userId = ?';
        sql = mysql.format(sql, [userId]);
        const ret = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        return {
            list,
            count: ret[0].count
        };
    },
    async getBlogById (id, userId) {
        let sql = `select 
        b.id,b.userId,nickName,avatarUrl,banner,b.audioId,score,b.type,
        (select count(1) from follow where userId =  ? and toUserId = b.userId ) as isFollow,
        title,author,audioAuthor,content,banner,
        b.url,b.time,
        (select count(1) from thumb where blogId =  b.id)  as thumbs,
        b.isRecommend,
        (select count(1) from collection where userId = ? and blogId = b.id) as isCollection,
        (select count(1) from thumb where userId = ? and blogId = b.id) as isThumb,
        b.createTime as createOriginalTime,
        date_format(b.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        from blog as b 
        left join audio as a on b.audioId = a.id
        left join user as u on b.userId = u.id
        where b.status = 1 
        and b.id = ?`;
        sql = mysql.format(sql, [userId, userId, userId, id]);
        const result = await mydb.dataCenter(sql).catch(e => [null]);

        if (result[0]) {
            sql = `select ranking from (
                select id,status,score,(@rowno:=@rowno+1) as ranking from blog ,
                (select (@rowno :=0) ) b where status = 1 order by score desc ) as v
               where id = ?`;
            sql = mysql.format(sql, [id]);
            const rank = await mydb.dataCenter(sql).catch(e => null);
            if (rank) {
                sql = 'select count(1) as count from blog where status = 1';
                const ret = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
                result[0].count = ret[0].count;
                result[0].rank = rank[0].ranking;

                if (result[0].rank === 1) {
                    result[0].percent = 99;
                } else if (result[0].count === result[0].rank) {
                    result[0].percent = 1;
                } else {
                    result[0].percent = parseInt((1 - result[0].rank / result[0].count) * 100);
                }
                // 最少超过70%
                if (result[0].percent < 70) {
                    result[0].percent = 70;
                }
            }
            if (result[0].score >= 95) {
                result[0].text = '厉害！你的声音无可挑剔！';
            } else if (result[0].score >= 90) {
                result[0].text = '厉害，你已接近专业播音员水准！';
            } else if (result[0].score >= 86) {
                result[0].text = '哇塞！你的声音像果冻一样Q弹，听了好舒服！';
            } else if (result[0].score >= 83) {
                result[0].text = '你的普通话很标准';
            } else if (result[0].score >= 80) {
                result[0].text = '你的声音很有感染力，继续保持';
            } else {
                result[0].text = '您的声音有温度，有亲和力，继续加油';
            }
        }
        return result[0];
    },
    /**
     * 收藏，取消收藏
     * @param {*} blogId
     */
    async collection (userId, blogId) {
        let sql = 'select count(1) as count from collection where userId = ? and blogId = ?';
        sql = mysql.format(sql, [userId, blogId]);
        const ret = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        if (ret && ret[0] && ret[0].count) {
            sql = 'delete from collection where userId = ? and blogId = ?';
        } else {
            sql = 'insert into collection(userId,blogId,createTime) VALUES(?,?,now())';
        }
        sql = mysql.format(sql, [userId, blogId]);
        const result = await mydb.dataCenter(sql).catch(e => false);
        return result;
    },
    /**
     * 点赞，取消点赞
     * @param {*} blogId
     */
    async thumb (userId, blogId) {
        let sql = 'select count(1) as count from thumb where userId = ? and blogId = ?';
        sql = mysql.format(sql, [userId, blogId]);
        const ret = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        if (ret && ret[0] && ret[0].count) {
            sql = 'delete from thumb where userId = ? and blogId = ?';
        } else {
            sql = 'insert into thumb(userId,blogId,createTime) VALUES(?,?,now())';
        }
        sql = mysql.format(sql, [userId, blogId]);
        const result = await mydb.dataCenter(sql).catch(e => false);
        return result;
    },
    /**
     * 删除微博
     */
    async deleteBlog (id) {
        let sql = 'update blog set status = 0 where id = ?';
        sql = mysql.format(sql, [id]);
        const result = await mydb.dataCenter(sql).catch(e => false);
        return result;
    },
    /**
     * 打言值分
     */
    async score (userId, blogId, blogTime, blogType) {
        let sql = `
        select 
        (select count(1)  from record where userId = ?) as num1,
        (select days from user where id = ?) as num2,
        (select count(1) from thumb as t left join blog as b on t.blogId = b.id where b.userId = ?) as num3,
        (select count(1) from comment where toUserId = ?) as num4
        `;
        sql = mysql.format(sql, [userId, userId, userId, userId, userId]);
        let result = await mydb.dataCenter(sql).catch(e => [{num1: 0, num2: 0, num3: 0, num4: 0, num5: 0}]);
        result = result[0];
        let _score = 75;
        Object.keys(result).forEach(key => {
            _score += result[key] > 5 ? 5 : parseInt(result[key]);
        });
        _score += parseInt(Math.random() * 5);
        _score = _score >= 100 ? 99 : _score;
        sql = 'update blog set score = ? where id = ?';
        if (blogTime < 10 && (blogType === 2 || blogType === 4)) {
            _score = 70;
        } else if (blogTime < 30 && !(blogType === 2 || blogType === 4)) {
            _score = 70;
        }
        sql = mysql.format(sql, [_score, blogId]);
        result = await mydb.dataCenter(sql).catch(e => false);
        return result;
    }
};

module.exports = Helper;
