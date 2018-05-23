const path = require('path');

const _ = require('lodash');
const grpc = require('grpc');
const consul = require('consul');
const logger = require('./logger');

const config = require('./config');

const conns = config.proto;
const consulCli = consul(config.consul);

const protos = {};

(function () {
    for (let i = 0; i < conns.length; i++) {
        const PROTO_PATH = {
            root: path.join(__dirname, conns[i].protopath.root),
            file: conns[i].protopath.file
        };
        try {
            protos[conns[i].name] = grpc.load(PROTO_PATH)[conns[i].name];
        } catch (err) {
            logger.errors(`${conns[i].name} 服务的协议加载错误，请确认协议文件是否存在，文件路径：${conns[i].protopath.file}`);
        }
    }
})();

function getIPFromService (serivce) {
    const ipaddr = serivce.Address + ':' + serivce.Port;
    return ipaddr;
}

const _caches = {}; // 缓存所有链接
const _cachei = {}; // 缓存所有链接的索引

// 缓存所有的服务发现监听
const watches = [];

function getDirectCli (name, ipaddr) {
    let srv;
    for (let i = 0; i < conns.length; i++) {
        const c = conns[i];
        if (c.name === name) {
            srv = c.constr;
            break;
        }
    }

    if (!srv) return;
    return new protos[name][srv](ipaddr, grpc.credentials.createInsecure());
}

function watchServices () {
    for (let i = 0; i < conns.length; i++) {
        const conn = conns[i];

        (function (conn) {
            const watch = consulCli.watch({ method: consulCli.health.service, options: { service: conn.servername, passing: true } });

            watch.on('change', function (data) {
                if (data.length === 0) {
                    _caches[conn.name] = [];
                    _cachei[conn.name] = 0;
                    logger.errors('cannot run any ' + conn.name + ' grpc service');
                } else {
                    _caches[conn.name] = _caches[conn.name] || [];
                    const _nar = []; // 新的数组
                    for (let j = 0; j < data.length; j++) {
                        const ipaddr = getIPFromService(data[j].Service);
                        const cli = new protos[conn.name][conn.constr](ipaddr, grpc.credentials.createInsecure());
                        const kv = { ip: ipaddr, client: cli };

                        _nar.unshift(kv);
                    }
                    if (_caches[conn.name].length !== _nar.length) {
                        _cachei[conn.name] = 0;
                    }

                    _caches[conn.name] = _nar;
                }
            });

            watch.on('error', function (err) {
                logger.errors('cannot watch ' + conn.name + ' grpc service', err);
            });

            watches.push(watch);
        })(conn);
    }
}

module.exports = {
    consul: consulCli,
    watchServices: watchServices,
    fetch: function (uri, params, ipaddr) {
        if (uri.indexOf('.') === -1) return Promise.reject(_.assign(new Error(2900005), { code: 2900005, type: 'dynamic_error', value: uri }));
        const name = uri.substr(0, uri.indexOf('.'));
        const method = uri.replace(name + '.', '');

        return new Promise(function (resolve, reject) {
            if (config.services.length !== 0 && !config.services.includes(name)) return reject(_.assign(new Error(2900002), { code: 2900002, type: 'dynamic_error', value: name }));
            const srv = _caches[name];
            if (!srv) return reject(_.assign(new Error(2900011), { code: 2900011, type: 'dynamic_error', value: name }));

            const count = srv.length;
            if (count <= 0) return reject(_.assign(new Error(2900001), { code: 2900001, type: 'dynamic_error', value: name }));

            if (count > 0) {
                const _i = _cachei[name];
                let ip = srv[_i].ip;
                let cli = srv[_i].client;

                // 提供了 IP 地址，直连
                if (ipaddr) {
                    const _cli = getDirectCli(name, ipaddr);
                    if (_cli) {
                        ip = ipaddr;
                        cli = _cli;
                    }
                }

                if (!cli) return reject(_.assign(new Error(2900006), { code: 2900006, type: 'dynamic_error', value: `${name}.${method}` }));

                if (_i < count - 1) {
                    _cachei[name]++;
                } else {
                    _cachei[name] = 0;
                }
                if (!cli[method]) return reject(_.assign(new Error(2900005), { code: 2900005, type: 'dynamic_error', value: `${name}.${method}` }));

                const _startTime = Date.now();
                const deadline = new Date().setTime(_startTime + (30 * 1000)); // 请求超时时间设置为 30 秒
                cli[method].apply(cli, [params, { deadline }, function (err, response) {
                    if (err) {
                        err.grpcCall = `${_startTime} ${ip} ${name}.${method}`;
                        return reject(err);
                    }
                    // logger.infos(`${name}.${method} | ${JSON.stringify(response)}`);
                    return resolve(response);
                }]);
            }
        });
    },
    closeGrpc: function () {
        for (let i = 0; i < watches.length; i++) {
            const watch = watches[i];
            if (watch && watch['end']) {
                watch.end();
            }
        }

        for (const attr in _caches) {
            for (let z = 0; z < _caches[attr].length; z++) {
                grpc.getClientChannel(_caches[attr][z].client).close();
            }
            _caches[attr] = [];
        }
    }
};
