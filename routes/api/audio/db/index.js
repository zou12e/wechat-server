const mydb = require('../../../../db/mysql');
const mysql = require('mysql');

const Helper = {
    /**
     * 通过id查找audio
     */
    async getAudioById (id) {
        let sql = 'select * from audio where id = ?';
        sql = mysql.format(sql, id);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    },
    /**
     * 查询类型查询audio
     */
    async getAudiosByType (type) {
        let sql = 'select * from audio where type = ? and status = 1';
        sql = mysql.format(sql, type);
        const result = await mydb.dataCenter(sql).catch(e => []);
        return result;
    }
};

module.exports = Helper;
