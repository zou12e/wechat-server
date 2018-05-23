const user = require('./user');
const home = require('./home');

const _route = '/wechat/api/v1';

module.exports = function (app) {
    app.use(`${_route}/user`, user);
    app.use(`${_route}/home`, home);
};
