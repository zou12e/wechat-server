const session = require('express-session');
const config = require('config');

module.exports = session({
    // resave: false, // 即使 session 没有被修改，也保存 session 值，默认为 true。
    // saveUninitialized: false,
    // store: new MongoStore({ // session 的存储方式，默认存放在内存中,这里使用redis
    //     url: config.mongoUrl + config.Mongo.session_collection
    // }),
    // rolling: false, // 每个请求都重新设置一个 cookie，默认为 false。
    // secret: config.Session.secret, // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    // cookie: config.Cookie, // 设置存放 session id 的 cookie 的相关选项，默认为 (default: { path: ‘/’, httpOnly: true, secure: false, maxAge: null })
    // name: config.Session.name // 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
    name: config.Session.name,
    secret: config.Session.secret,
    cookie: config.Cookie,
    rolling: false,
    resave: false,
    saveUninitialized: false
});
