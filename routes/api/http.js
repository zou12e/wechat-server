const rp = require('request-promise');
const Helper = {
    /**
     * get
     * @param {*} uri
     * @param {*} data
     */
    async get (uri, data) {
        const options = {
            uri: uri,
            headers: {
                'User-Agent': 'Request-Promise',
                'content-type': 'application/json'
            },
            qs: data,
            json: true
        };
        const result = await rp(options);
        return result;
    },
    /**
     * post
     * @param {*} uri
     * @param {*} data
     */
    async post (uri, data) {
        const options = {
            uri: uri,
            headers: {
                'User-Agent': 'Request-Promise',
                'content-type': 'application/json'
            },
            body: data,
            json: true
        };
        const result = await rp(options);
        return result;
    }

};
module.exports = Helper;
