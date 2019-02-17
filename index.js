const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const responseTime = require('response-time');
const helmet = require('helmet');
const http = require('http');
const path = require('path');
const config = require('config');
const i18n = require('./middleware/i18n');
const env = config.get('env');
const port = config.get('port');

const app = express();

// 请求内容解析中间件  [req.body][req.query]
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// cookie解析中间件 [res.cookies]
app.use(cookieParser());

// gzip压缩中间件
app.use(compression());

// 计算响应时间中间件 [header[X-Response-Time]]
app.use(responseTime());

// express安全中间件 XSS保护
app.use(helmet());

// 静态资源位置
app.use('/static', express.static(path.join(__dirname, 'static')));

// 使用session
// app.use(session);

// 统一接口返回格式
app.use(i18n);

// express 支持反向代理
app.enable('trust proxy');
app.disable('x-powered-by');

// 路由统一入口
require('./routes')(app);

/*
 * 捕获404
 */
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'Not Found';
    next(err);
});

/*
 * 捕获内部错误
 * next(err)执行
 */
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ code: err.status || 500, message: err.message || '内部错误' });
});

// 监听启动
function onListening () {
}

// 监听关闭
process.on('exit', function () {
});

const server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);

console.info(`env:${env} | port:${port} `);
