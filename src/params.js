var png = ['reset', 'mask', 'start', 'success']
var json = []
var color = {
    blue: 0x415C71,
    red: 0xF06050,
    yellow: 0xF7CD1F,
    black: 0x0F0F0F,
    cyan: 0x97A581
};

var constant = {
    width: 44.5,
    topMargin: 30,
    sideMargin: 20,
    intervalTime: 1024,
    addSpeedScore: 1,
    increment: 5
};

var settings = {
    vertical: true
};

module.exports = {
    png: png,
    json: json,
    color: color,
    constant: constant,
    settings: settings
};
