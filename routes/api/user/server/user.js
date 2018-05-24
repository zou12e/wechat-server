
const Service = {
    async follow (req, res, next) {
        const userId = req.body.id;
        res.success(userId);
    }
};
module.exports = Service;
