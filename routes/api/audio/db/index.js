const mydb = require('../../../../db/mysql');
const mysql = require('mysql');

const Helper = {
    /**
     * 查询早读
     */
    async getReadInfo (id) {
        let sql = 'select * from audio where id = ?';
        sql = mysql.format(sql, id);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    }
};

module.exports = Helper;
