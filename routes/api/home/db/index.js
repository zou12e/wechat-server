const mydb = require('../../../../db/mysql');
const mysql = require('mysql');

const Helper = {
    async getReadInfo (diffDays) {
        let sql = 'select * from audio where  status = 1 limit ? ,1';
        sql = mysql.format(sql, diffDays);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    },
    async getAudioInfoById (id) {
        let sql = 'select * from audio where  id = ?';
        sql = mysql.format(sql, id);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    },
    async getAudioCount () {
        const sql = 'select count(1) as count from audio where status = 1';
        const result = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        return result[0].count;
    },
    async getRecommend () {
        const sql = 'select id from recommend order by sort  limit 0, 1 ;';
        const result = await mydb.dataCenter(sql).catch(e => [{id: 0}]);
        return result[0].id;
    }
//   - INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (1,1 ,now());
};

module.exports = Helper;
