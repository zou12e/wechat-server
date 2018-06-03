const db = require('../db');
const Service = {

    async getAudioById (req, res, next) {
        const data = await db.getReadInfo(~~req.query.id);
        res.success(data);
    }
};
module.exports = Service;
