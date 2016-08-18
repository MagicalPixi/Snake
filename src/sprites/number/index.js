/**
 * Created by zhouchunjie on 16/8/19.
 */
var blockGenerator = require('../blockGenerator.js');
var params = require('../../params');

var stage = new PIXI.Container();

var content = new PIXI.Container();

var realPosition = function (position) {
    return {
        x: params.constant.sideMargin + params.constant.width * position.x,
        y: params.constant.topMargin + params.constant.width * position.y
    }
}

//初始化苹果位置
stage.generateNumber = function (number) {
    generateNumberContent(number);
    //生成苹果
    return content;
};


var zero = [
    '0-0', '1-0', '2-0',
    '0-1', '2-1',
    '0-2', '2-2',
    '0-3', '2-3',
    '0-4', '1-4', '2-4'
];

var one = [
    '2-0',
    '2-1',
    '2-2',
    '2-3',
    '2-4'
];

var two = [
    '0-0', '1-0', '2-0',
    '2-1',
    '0-2', '1-2', '2-2',
    '0-3',
    '0-4', '1-4', '2-4'
];

var three = [
    '0-0', '1-0', '2-0',
    '2-1',
    '0-2', '1-2', '2-2',
    '2-3',
    '0-4', '1-4', '2-4'
];

var four = [
    '0-0', '2-0',
    '0-1', '2-1',
    '0-2', '1-2', '2-2',
    '2-3',
    '2-4'
];

var five = [
    '0-0', '1-0', '2-0',
    '0-1',
    '0-2', '1-2', '2-2',
    '2-3',
    '0-4', '1-4', '2-4'
];

var six = [
    '0-0', '1-0', '2-0',
    '0-1',
    '0-2', '1-2', '2-2',
    '0-3', '2-3',
    '0-4', '1-4', '2-4'
];

var seven = [
    '0-0', '1-0', '2-0',
    '2-1',
    '2-2',
    '2-3',
    '2-4'
];

var eight = [
    '0-0', '1-0', '2-0',
    '0-1', '2-1',
    '0-2', '1-2', '2-2',
    '0-3', '2-3',
    '0-4', '1-4', '2-4'
];

var nine = [
    '0-0', '1-0', '2-0',
    '0-1', '2-1',
    '0-2', '1-2', '2-2',
    '2-3',
    '0-4', '1-4', '2-4'
];

var temp = [
    '0-0', '1-0', '2-0',
    '0-1', '1-1', '2-1',
    '0-2', '1-2', '2-2',
    '0-3', '1-3', '2-3',
    '0-4', '1-4', '2-4'
];

var temp1 = {

}

var numbers = [zero, one, two, three, four, five, six, seven, eight, nine];

var generateNumberContent = function (number) {

    var numberStr = number + '';
    var length = numberStr.length;

    if (number < 100) {
        for (var i = 0; i < length; i++) {
            var ch = parseInt(numberStr[i]);
            var num = numbers[ch];
            var offsetX = 1 + i * 5;
            var offsetY = 3;
            for (var index in num) {
                var splitArr = num[index].split('-');
                var block = blockGenerator(params.color.black, realPosition({
                    x: offsetX + parseInt(splitArr[0]),
                    y: offsetY + parseInt(splitArr[1])
                }));
                content.addChild(block);
            }
        }
    }else {
        for (var i = 0; i < length; i++) {
            var ch = parseInt(numberStr[i]);
            var num = numbers[ch];
            var offset = 1 + i * 4;
            for (var index in num) {
                var splitArr = num[index].split('-');
                var block = blockGenerator(params.color.black, realPosition({
                    x: offset + parseInt(splitArr[0]),
                    y: parseInt(splitArr[1])
                }));
                content.addChild(block);
            }
        }
    }

};

module.exports = stage;