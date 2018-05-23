
const Service = {
    // 检查session
    async checkSession (req, res, next) {
        if (req.session && req.session.user) {
            next();
        } else {
            res.error('no data', 'no session');
        }
    }
};
module.exports = Service;
