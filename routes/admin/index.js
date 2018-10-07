const login = require('./login');

const _route = '/api/admin';

module.exports = function (app) {
    app.use(`${_route}`, login);
};
