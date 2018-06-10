const mydb = require('../../../../db/mysql');
const mysql = require('mysql');

const Helper = {
    /**
     * 新增评论
     */
    async addComment (info) {
        let sql = 'insert into comment(userId,toUserId,blogId,parentId,content,createTime) VALUES(?,?,?,?,?,now());';
        sql = mysql.format(sql, [+info.userId, +info.toUserId, +info.blogId, +info.parentId, info.content]);
        const result = await mydb.dataCenter(sql).catch(e => false);
        if (result && result.insertId) {
            return result.insertId;
        }
        return false;
    },
    /**
     * 获取评论记录
     */
    async getCommentByBlogId (blogId) {
        let sql = `select c.id,c.blogId,c.parentId,c.userId,u.nickName,u.avatarUrl,c.content,
        (select count(1) from comment where parentId = c.id and status = 1 ) as replys,
        c.createTime as createOriginalTime,
        date_format(c.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        FROM comment as c
        left join user as u on c.userId = u.id
        where c.blogId = ? 
        and c.parentId = 0
        and c.status = 1 
        order by c.createTime`;
        sql = mysql.format(sql, [blogId]);
        const list = await mydb.dataCenter(sql).catch(e => []);
        let cid = [];
        list.forEach(item => {
            if (item.replys) {
                cid.push('c.parentId = ' + item.id);
            }
        });
        if (cid && cid.length) {
            cid = cid.join(' or ');

            // TODO 这里查询是每条评论所有的回复，需要查询第一条回复
            sql = `select c.id,c.parentId,c.userId,u.nickName,u.avatarUrl,c.content,
            c.toUserId,
            ( select nickName from user where id = c.toUserId) as toNickName,
            c.createTime as createOriginalTime,
            date_format(c.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
            from comment as c
            left join user as u on c.userId = u.id
            where  ${cid} 
            and c.status = 1 
            order by createTime desc`;
            const replys = await mydb.dataCenter(sql).catch(e => []);
            list.forEach(item => {
                if (item.replys) {
                    replys.forEach(_item => {
                        if (item.id === _item.parentId) {
                            item.replyList = [_item];
                            return false;
                        }
                    });
                }
            });
        }

        sql = 'select count(1) as count from comment where blogId = ? and status = 1 ';
        sql = mysql.format(sql, [blogId]);
        const result = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        return {
            list,
            count: result[0].count
        };
    },
    async getCommentById (commentId) {
        let sql = `select c.id,c.blogId,c.parentId,c.userId,u.nickName,u.avatarUrl,c.content,
        (select count(1) from comment where parentId = c.id and status = 1 ) as replys,
        c.createTime as createOriginalTime,
        date_format(c.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        FROM comment as c
        left join user as u on c.userId = u.id
        where c.id = ? 
        and c.status = 1`;
        sql = mysql.format(sql, [commentId]);
        const list = await mydb.dataCenter(sql).catch(e => []);
        sql = `select c.id,c.parentId,c.userId,u.nickName,u.avatarUrl,c.content,
        c.toUserId,
        ( select nickName from user where id = c.toUserId) as toNickName,
        c.createTime as createOriginalTime,
        date_format(c.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        from comment as c
        left join user as u on c.userId = u.id
        where  c.parentId = ${list[0].id}
        and c.status = 1 
        order by c.createTime `;
        const replys = await mydb.dataCenter(sql).catch(e => []);
        list[0].replyList = replys;
        return list[0];
    },
    async getMineComments (userId) {
        let sql = `select 
        c.id, c.parentId, c.userId,c.blogId,
        u.nickName, u.avatarUrl,c.content,
        c.createTime as createOriginalTime,
        date_format(c.createTime, '%Y-%m-%d %H:%i:%s' ) as createTime
        from comment  as c
        left join user as u on c.userId = u.id
        where toUserId = ?
        order by c.createTime desc`;
        sql = mysql.format(sql, [userId]);
        const list = await mydb.dataCenter(sql).catch(e => []);
        return list;
    }
};

module.exports = Helper;
