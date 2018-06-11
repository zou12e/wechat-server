const mydb = require('../../../../db/mysql');
const mysql = require('mysql');
const moment = require('moment');

const Helper = {
    /**
     * 查询微信用户信息
     */
    async getUserInfo (openid) {
        let sql = 'select *  from  user where openid = ? and status = 1';
        sql = mysql.format(sql, openid);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    },
    /**
     * 查询微信用户信息
     */
    async getUserInfoById (userId, mineUserId) {
        let sql = 'select *,  (select count(1) from follow where userId =  ? and toUserId = ? ) as isFollow  from  user where id = ? and status = 1';
        sql = mysql.format(sql, [mineUserId, userId, userId]);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    },
    /**
     * 新增用户信息
     */
    async addUserInfo (openid) {
        let sql = 'insert into user(openid,createTime,updateTime) VALUES(?,now(),now())';
        sql = mysql.format(sql, openid);
        const result = await mydb.dataCenter(sql).catch(e => false);
        if (result && result.insertId) {
            return result.insertId;
        }
        return false;
    },
    /**
     * 修改用户信息
     */
    async updateUserInfo (user) {
        let sql = 'update user set nickName=?,avatarUrl=?,gender=?,city=?,province=?,country=?,language=?,updateTime=now() where id = ?';
        sql = mysql.format(sql, [user.nickName, user.avatarUrl, user.gender, user.city, user.province, user.country, user.language, user.id]);
        const ret = await mydb.dataCenter(sql).catch(e => false);
        return ret ? 1 : 0;
    },
    /**
     * 获取关注/被关注
     * @param {*} type 0我的关注，1关注我的
     * @param {*} id userid
     */
    async getFollow (type, id) {
        let sql = '';
        if (type === 0) {
            sql = `select f.id , f.toUserId as userId,u.openid,u.nickName, u.avatarUrl from follow as f 
            left join user as u on f.toUserId = u.id
            where f.userId = ?`;
        } else {
            sql = `select f.id , f.userId as userId,u.openid,u.nickName, u.avatarUrl from follow as f 
            left join user as u on f.userId = u.id
            where f.toUserId = ?`;
        }
        sql = mysql.format(sql, [id]);
        const result = await mydb.dataCenter(sql).catch(e => []);
        return result;
    },
    /**
     * 关注 取关
     * @param {*} userId
     * @param {*} toUserId
     */
    async follow (userId, toUserId) {
        let sql = 'select count(1) as count from follow where userId = ? and toUserId = ?';
        sql = mysql.format(sql, [userId, toUserId]);
        const ret = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        if (ret && ret[0] && ret[0].count) {
            sql = 'delete from follow where userId = ? and toUserId = ?';
        } else {
            sql = 'insert into follow(userId,toUserId,createTime) VALUES(?,?,now())';
        }
        sql = mysql.format(sql, [userId, toUserId]);
        const result = await mydb.dataCenter(sql).catch(e => false);
        return result;
    },
    async getCountInfo (userId) {
        let sql = `select 
        (select count(1) from follow where userId = ? ) as follows,
        (select count(1) from collection where userId = ? ) as collections,
        (select count(1) from comment where toUserId = ? and status = 1 ) as comments,
        (select days from user where id = ? ) as continuDays,
        (select count(1) from record where userId = ? ) as punchDays`;
        sql = mysql.format(sql, [userId, userId, userId, userId, userId]);
        const result = await mydb.dataCenter(sql).catch(e => [{follows: 0, collections: 0, comments: 0, continuDays: 0, punchDays: 0}]);
        return result[0];
    },
    async getRecordInfo (userId) {
        let sql = `select date from record where userId = ? order by date desc`;
        sql = mysql.format(sql, [userId]);
        const list = await mydb.dataCenter(sql).catch(e => []);
        const current = moment();
        // 如果当天没有打卡， 从前一天的数据开始算
        if (list && list.length && current.format('YYYY-MM-DD') !== list[0].date) {
            current.subtract(1, 'days');
        }
        list.forEach(item => {
            if (current.format('YYYY-MM-DD') === item.date) {
                item.continu = true;
                current.subtract(1, 'days');
            } else {
                return false;
            }
        });
        return list;
    },
    async maintainRecord () {
        let sql = `select u.id, u.days, count(r.date) as count from user as u
        left join ( select date, userId from record where date = ? ) as   r on u.id = r.userId
        group by u.id `;
        const ldate = moment().subtract(1, 'days').format('YYYY-MM-DD');
        sql = mysql.format(sql, [ldate]);
        const list = await mydb.dataCenter(sql).catch(e => []);
        const userIds = [];
        list.forEach(item => {
            if (!item.count && item.days) {
                userIds.push(`id = ${item.id}`);
            }
        });
        if (userIds && userIds.length) {
            const sqlWhere = userIds.join(' or ');
            sql = 'update user set days = 0 where ' + sqlWhere;
            await mydb.dataCenter(sql);
        }
    }

};

module.exports = Helper;
