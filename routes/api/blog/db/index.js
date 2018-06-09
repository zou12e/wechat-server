const mydb = require('../../../../db/mysql');
const mysql = require('mysql');

const Helper = {
    /**
     * 新增微博
     */
    async addBlog (blog) {
        let sql = 'insert into blog(userId,audioId,time,url,type,createTime,updateTime) VALUES(?,?,?,?,?,now(),now())';
        sql = mysql.format(sql, [+blog.userId, +blog.audioId, +blog.time, blog.url, +blog.type]);
        const result = await mydb.dataCenter(sql).catch(e => false);
        if (result && result.insertId) {
            return result.insertId;
        }
        return false;
    },
    /**
     * 查看所有微博
     * 个人微博
     * 他人微博
     * 早读微博
     * 晚讲微博
     */
    async getBlogList (condition, value, userId, lastId, size = 20) {
        let sql = `select 
        b.id, b.id as blogId,b.userId,nickName,avatarUrl,
        (select count(1) from follow where userId =  ?) as isFollow,
        title,author,audioAuthor,content,
        b.url,b.time,
        (select count(1) from comment where blogId =  b.id)  as comments,
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
        c.id,b.id as blogId,b.userId,nickName,avatarUrl,
        (select count(1) from follow where userId =  ?) as isFollow,
        title,author,audioAuthor,content,
        b.url,b.time,
        (select count(1) from comment where blogId =  b.id)  as comments,
        (select count(1) from thumb where blogId =  b.id)  as thumbs,
        b.isRecommend,
        (select count(1) from thumb where userId = ? and blogId = b.id) as isThumb,
        b.createTime as createOriginalTime,
        date_format(b.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        from collection as c
        left join blog as b on c.blogId = b.id 
        left join audio as a on b.audioId = a.id
        left join user as u on b.userId = u.id
        where c.userId = ?
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
        b.id,b.userId,nickName,avatarUrl,
        (select count(1) from follow where userId =  ?) as isFollow,
        title,author,audioAuthor,content,
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
    }
};

module.exports = Helper;
