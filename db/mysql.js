
const mysql = require('mysql');
const logger = require('../middleware/logger');
const config = require('config').get('mysql');
const pool = mysql.createPool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
});

exports.dataCenter = async sql => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                logger.errors(sql, err);
                reject(err);
            } else {
                conn.query(sql, (err, res) => {
                    if (err) {
                        logger.errors(sql, err);
                        conn.release();
                        reject(err);
                    } else {
                        conn.release();
                        resolve(res);
                    }
                });
            }
        });
    });
};
