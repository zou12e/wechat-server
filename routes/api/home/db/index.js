const mydb = require('../../../../db/mysql');
const mysql = require('mysql');

const Helper = {
    /**
     * 查询微信用户信息
     */
    async getReadInfo (diffDays) {
        let sql = 'select * from audio where type = 1 and status = 1 limit ? ,1';
        sql = mysql.format(sql, diffDays);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    },
    async getReadCount () {
        const sql = 'select count(1) as count from audio where type = 1 and status = 1';
        const result = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        return result[0].count;
    }
};

module.exports = Helper;
