const xlsx = require('node-xlsx');
const fs = require('fs');
const obj = xlsx.parse('./excel/data.xlsx');

const hf = `https://www.wisdomwords.cn/static/wechat`;

//
const sqls = [];

let index = 1;
obj[0].data.forEach(e => {
    if (e && e.length) {
        sqls.push(`INSERT INTO huiyanbang.audio(banner,url,type,createTime,updateTime,title,author,audioAuthor,time,content)VALUES('${hf}/images/${index++}.jpg','${hf}/audio/${e[6]}/${e[0]}.mp3','${e[6]}',now(), now(),'${e[1]}', '${e[2]}',  '${e[3]}', '${e[5]}','${e[4]}');
`);
    }
});

fs.writeFileSync('./excel/sql.js', sqls.join(''));
