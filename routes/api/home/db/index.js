const mydb = require('../../../../db/mysql');
const mysql = require('mysql');
const cache = require('memory-cache');
const beginPunch = require('config').get('beginPunch');
const moment = require('moment');

const Helper = {
    /**
     * 查找语音
     */
    async getAudioInfo (diffDays) {
        let sql = 'select * from audio where status = 1 limit ? ,1';
        sql = mysql.format(sql, diffDays);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    },
    /**
     * 查找语音
     */
    async getAudioInfoById (id) {
        let sql = 'select * from audio where  id = ?';
        sql = mysql.format(sql, id);
        const result = await mydb.dataCenter(sql).catch(e => [null]);
        return result[0];
    },
    /**
     * 获取语音总条数
     */
    async getAudioCount () {
        const sql = 'select count(1) as count from audio where status = 1';
        const result = await mydb.dataCenter(sql).catch(e => [{count: 0}]);
        return result[0].count;
    },
    /**
     * 获取推荐语音
     */
    async getRecommends () {
        const sql = 'select audioId as id from recommend order by sort;';
        const result = await mydb.dataCenter(sql).catch(e => []);
        return result;
    },
    async getRecommend () {
        let audio = cache.get('Recommend');
        if (audio) {
            return JSON.parse(audio);
        } else {
            const ids = await Helper.getRecommends();
            if (ids && ids.length) {
                const data = await Helper.getAudioInfoById(ids[0].id);
                if (data) {
                    audio = JSON.stringify(data);
                }
            } else {
                const count = await Helper.getAudioCount();
                const index = parseInt(Math.random() * count);
                const data = await Helper.getAudioInfo(index);
                audio = JSON.stringify(data);
            }
        }
        cache.put('Recommend', audio);
        return JSON.parse(audio);
    },
    async changeRecommend () {
        let id = 0;
        let sql = '';
        const ids = await Helper.getRecommends();
        const punchDay = moment().diff(moment(beginPunch), 'days') + 1;
        if (ids && ids.length) {
            sql = 'delete from recommend where audioId = ?;';
            sql = mysql.format(sql, ids[0].id);
            await mydb.dataCenter(sql).catch(e => false);

            sql = `update audio set banner = 'https://audio.wisdomwords.cn/images/?.jpg' where id = ?;`;
            sql = mysql.format(sql, [ids[0].id, ids[0].id]);
            await mydb.dataCenter(sql).catch(e => false);
        }
        if (ids.length > 1) {
            id = ids[1].id;

            // 第一期打卡图片
            if (punchDay <= 14) {
                sql = `update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/?.jpg', status = 1 where id = ?;`;
                sql = mysql.format(sql, [punchDay, id]);
                await mydb.dataCenter(sql).catch(e => false);
            }

            const data = await Helper.getAudioInfoById(id);
            if (data) {
                cache.put('Recommend', JSON.stringify(data));
            }
        } else {
            cache.put('Recommend', '');
        }
    }
//   - INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (1,1 ,now());
};

module.exports = Helper;
