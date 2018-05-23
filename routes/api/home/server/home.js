const Service = {

    async getReadSpeak (req, res, next) {
        const data = {
            read: {
            },
            speak: {
            }
        };
        res.success(data);
    }
};
module.exports = Service;
