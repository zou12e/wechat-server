const db = require('../db');
const Service = {

    async getAudioById (req, res, next) {
        const data = await db.getAudioById(~~req.query.id);
        res.success(data);
    },
    async getAudiosByType (req, res, next) {
        const data = await db.getAudiosByType(~~req.query.type);
        res.success(data);
    }
};
module.exports = Service;
