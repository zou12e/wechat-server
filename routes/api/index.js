const user = require('./user');
const home = require('./home');
const audio = require('./audio');

const _route = '/wechat/api/v1';

module.exports = function (app) {
    app.use(`${_route}/user`, user);
    app.use(`${_route}/home`, home);
    app.use(`${_route}/audio`, audio);
};
