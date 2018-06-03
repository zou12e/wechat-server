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
        let sql = 'select *, 0 as isFollow  from  user where id = ? and status = 1';
        sql = mysql.format(sql, id);
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
    }
};

module.exports = Helper;
