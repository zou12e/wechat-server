
const Service = {
    // 检查session
    async checkSession (req, res, next) {
        if (req.headers['user-sessionkey'] && req.headers['user-openid']) {
            req.sessionkey = req.headers['user-sessionkey'];
            req.openid = req.headers['user-openid'];
            req.id = req.headers['user-id'];
            next();
        } else {
            res.error('no data', 'no session');
        }
    }
};
module.exports = Service;
