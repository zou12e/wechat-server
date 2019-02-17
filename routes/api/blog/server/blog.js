const config = require('config');
const path = require('path');
const solarlunar = require('solarlunar');
const gm = require('gm').subClass({imageMagick: true});
const host = config.get('host');
const saveFolder = '/opt/www/static/wechat/images2';
const moment = require('moment');
moment.locale('zh-cn');
let index = 1;
const Service = {
    /**
     * 保存言值图片
     */
    async saveImage (req, res, next) {
        const text = req.body.text;
        const author = req.body.author;
        let size = Number(req.body.size);
        if (isNaN(size) || size === 0) size = 1;
        if (size > 31) size = 31;
        let _size = 0;
        const data = [];
        for (let _i = 0; _i < size; _i++) {
            const _day = moment().add(_i, 'days');
            const day = _day.format('DD');
            const monthDay = _day.format('MMMDo');
            const week = _day.format('dddd');
            const lunar = '农历';
            const solar2lunarData = solarlunar.solar2lunar(_day.get('year'), _day.get('month') + 1, day);
            const lunarDay = solar2lunarData.monthCn + solar2lunarData.dayCn;

            const _ph = path.join(__dirname, '../../../../sources');
            const _font = `${_ph}/simsun.ttf`;
            const _bg = `${_ph}/bg${index}.png`;
            const _ewm = `${_ph}/ewm.png`;
            const _folder = `${_ph}/folder.png`;
            const _logo = `${_ph}/logo.png`;
            const _frame = `${_ph}/frame1.png`;
            const _name = `${Date.now()}-${_i}.jpg`;
            const _path = `${saveFolder}/${_name}`;
            const _gm = gm()
                .in('-page', '+0+0')
                .in(_bg)
                .in('-page', '+302+1065')
                .in(_ewm)
                .in('-page', '+254+1246')
                .in(_logo)
                .in('-page', '+42+101')
                .in(_frame)
                .fill('#ffffff')
                .font(_font)
                .fontSize(142);
            const _largeLeft = 65;
            const _largeTop = 120;
            _gm.drawText(_largeLeft, _largeTop, day.charAt(0), 'NorthWest');
            _gm.drawText(_largeLeft + 64 + 8, _largeTop, day.charAt(1), 'NorthWest');

            const _littleLeft = 215;
            const _littleTop = 135;
            _gm.fontSize(22);
            _gm.drawText(_littleLeft, _littleTop, monthDay, 'NorthWest');       
            _gm.drawText(_littleLeft, _littleTop + 30 * 1, week, 'NorthWest');
            _gm.drawText(_littleLeft, _littleTop + 30 * 2, lunar, 'NorthWest');
            _gm.drawText(_littleLeft, _littleTop + 30 * 3, lunarDay, 'NorthWest');

            const _textLeft = 89;
            const _textTop = 482;
            const _w = 36;
            const _h = 64;
            let w = 0;
            let h = 0;
            _gm.fontSize(31);
            for (const t of text) {
                if (_textLeft + w > 593) {
                    w = 0;
                    h += _h;
                }
                _gm.drawText(_textLeft + w, _textTop + h, t, 'NorthWest');
                w += _w;
            }
            h += _h;
            w = (14 - author.length) * _w;
            _gm.in('-page', `+${_textLeft + w - 1.5 * _w}+${_textTop + h + 13}`);
            _gm.in(_folder);
            for (const a of author) {
                w += _w;
                _gm.drawText(_textLeft + w, _textTop + h, a, 'NorthWest');
            }

            _gm.mosaic()
                .write(_path, err => {
                    if (err) {
                        console.log(err);
                        return res.error('save blogImage fail');
                    }
                    data.push(`${host}/static/wechat/images2/${_name}`);
                    if (++_size === size) {
                        res.success(data.sort());
                    }
                });
            if (++index > 3) {
                index = 1;
            }
        }
        
    }
};

module.exports = Service;
