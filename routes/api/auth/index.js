
const Service = {
    // 检查session
    async checkSession (req, res, next) {
        if (req.headers['user-sessionkey'] && req.headers['user-opeind']) {
            req.sessionkey = req.headers['user-sessionkey'];
            req.opeind = req.headers['user-opeind'];
            next();
        } else {
            res.error('no data', 'no session');
        }
    }
};
module.exports = Service;
