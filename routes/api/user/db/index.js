const mydb = require('../../../../db/mysql');
const mysql = require('mysql');

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
    async getUserInfoById (id) {
        let sql = 'select *,  (select count(1) from follow where userId =  ?) as isFollow  from  user where id = ? and status = 1';
        sql = mysql.format(sql, [id, id]);
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
        (select count(1) from comment where toUserId = ? and status = 1 ) as comments`;
        sql = mysql.format(sql, [userId, userId, userId]);
        const result = await mydb.dataCenter(sql).catch(e => [{follows: 0, collections: 0, comments: 0}]);
        return result[0];
    }
};

module.exports = Helper;
