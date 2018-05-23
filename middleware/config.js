const qs = require('querystring');

module.exports = {
    env: process.env.NODE_ENV,
    services: (process.env.SERVICES && process.env.SERVICES.split(';')) || [], // 启用的服务
    consul: JSON.parse(JSON.stringify(qs.parse(process.env.CONSUL))),
    proto: [
        {
            name: 'gateway',
            pname: 'gateway',
            constr: 'GatewaySrv',
            protopath: {
                root: '/../proto/',
                file: 'gateway.proto'
            },
            servername: 'followme.srv.copytrade.gateway'
        },
        {
            name: 'account',
            pname: 'account',
            constr: 'AccountSrv',
            protopath: {
                root: '/../proto/',
                file: 'account.proto'
            },
            servername: 'followme.srv.account'
        },
        {
            name: 'trade',
            pname: 'trade',
            constr: 'TradeSrv',
            protopath: {
                root: '/../proto/',
                file: 'trade.proto'
            },
            servername: 'followme.srv.trade'
        }
    ]
};
