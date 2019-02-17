const blog = require('./blog');
const _route = '/api/v1';

module.exports = function (app) {
    app.use(`${_route}/image`, blog);
};
