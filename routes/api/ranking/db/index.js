const mydb = require('../../../../db/mysql');
const mysql = require('mysql');

const Helper = {
    /**
     * 查询点赞排行榜
     */
    async getThumbRanking () {
        const sql = ` select  count(t.id) as thumbs ,t.blogId, a.title,u.id as userId,u.nickName,u.avatarUrl from thumb as t
                    left join blog as b on t.blogId = b.id 
                    left join audio as a on a.id = b.audioId
                    left join user as u on u.id = b.userId
                    where b.status = 1
                    group by t.blogId 
                    order by thumbs desc
                    limit 0, 50`;
        const list = await mydb.dataCenter(sql).catch(e => []);
        return Helper.getRanking(list);
    },
    /**
     * 累计打卡排名
     */
    async getAllPunchRanking (userId) {
        let sql = ` select u.id as userId, nickName,avatarUrl,
        (select count(1) from record as r where r.userId = u.id) days
        from user as u
        order by days desc
        limit 0, 50`;
        const list = await mydb.dataCenter(sql).catch(e => []);

        sql = `select v.* from (
            select id as userId, nickName,avatarUrl,(select count(1) from record as r where r.userId = id)  as days,(@rowno:=@rowno+1) as ranking from user,
            (select (@rowno :=0) ) b order by days desc ) as v
            where v.userId = ?`;
        sql = mysql.format(sql, [userId]);
        const mine = await mydb.dataCenter(sql).catch(e => [{}]);
        return {
            mine: mine[0],
            list: Helper.getRanking(list)
        };
    },
    /**
     * 连续打卡排名
     */
    async getContinuePunchRanking (userId) {
        let sql = ` select u.id as userId, nickName,avatarUrl, days
        from user as u
        order by days desc`;
        const list = await mydb.dataCenter(sql).catch(e => []);

        sql = `select v.* from (
            select id as userId, nickName,avatarUrl,days,(@rowno:=@rowno+1) as ranking from user,
            (select (@rowno :=0) ) b  order by days desc ) as v where v.userId = ?`;
        sql = mysql.format(sql, [userId]);
        const mine = await mydb.dataCenter(sql).catch(e => [{}]);
        return {
            mine: mine[0],
            list: Helper.getRanking(list)
        };
    },
    getRanking (list) {
        list.forEach((item, i) => {
            item.ranking = i + 1;
        });
        return list;
    }
};

module.exports = Helper;
