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
     * @param {*} condition
     * @param {*} value
     * @param {*} lastId
     * @param {*} size
     */
    async getBlogList (condition, value, lastId, size = 20) {
        let sql = `select 
        b.id,b.userId,nickName,avatarUrl,
        0 as isFollow,
        title,author,audioAuthor,content,
        b.url,b.time,
        0 as comments,
        0 as thumbs,
        0 as isRecommend,
        0 as isCollection,
        0 as isThumb,
        b.createTime as createOriginalTime,
        date_format(b.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        from blog as b 
        left join audio as a on b.audioId = a.id
        left join user as u on b.userId = u.id
        where b.status = 1 
        and ?? = ? 
        and ${lastId ? 'b.id < ' + mysql.format(lastId) : 'b.id > 0'} 
        order by b.id desc
        limit 0 ,?`;
        sql = mysql.format(sql, ['b.' + condition, value, size]);
        const result = await mydb.dataCenter(sql).catch(e => []);
        return result;
    },
    async getBlogById (id) {
        let sql = `select 
        b.id,b.userId,nickName,avatarUrl,
        0 as isFollow,
        title,author,audioAuthor,content,
        b.url,b.time,
        0 as comments,
        0 as thumbs,
        0 as isRecommend,
        0 as isCollection,
        0 as isThumb,
        b.createTime as createOriginalTime,
        date_format(b.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        from blog as b 
        left join audio as a on b.audioId = a.id
        left join user as u on b.userId = u.id
        where b.status = 1 
        and b.id = ?`;
        sql = mysql.format(sql, [id]);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    }
};

module.exports = Helper;
