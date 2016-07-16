/**
 * Created by zhouchunjie on 16/7/16.
 */
/**
 * Created by zhouchunjie on 16/7/7.
 */

var blockGenerator = require('../blockGenerator.js');
var params = require('../../params');

var stage = new PIXI.Container();

var content = new PIXI.Container();

var realPosition = function (position) {
    return {
        x: params.contant.sideMargin + params.contant.width * position.x,
        y: params.contant.topMargin + params.contant.width * position.y
    }
}

//初始化苹果位置
stage.initHome = function () {
    generateHomeContent();
    //生成苹果
    return content;
};

var sPosition = [
    '1-1','2-1','3-1','4-1',
    '1-2',
    '1-3','2-3','3-3','4-3',
    '4-4',
    '1-5','2-5','3-5','4-5'
];

var nPosition = [
    '5-2','6-2','7-2','8-2',
    '5-2','8-2',
    '5-3','8-3',
    '5-4','8-4',
    '5-5','8-5',
    '5-6'
];

var aPosition = [
    '4-7','5-7',
    '3-8','6-8',
    '2-9','3-9','4-9','5-9','6-9','7-9',
    '1-10','8-10'
];

var kPosition = [
    '1-11','4-11',
    '1-12','3-12',
    '1-13','2-13',
    '1-14','3-14',
    '1-15','4-15',

];

var ePosition = [
    '5-12','6-12','7-12','8-12',//'9-12',
    '5-13',
    '5-14','6-14','7-14','8-14',//'9-14',
    '5-15',
    '5-16','6-16','7-16','8-16'//,'9-16'
];

var positions = [
    sPosition,nPosition,aPosition,kPosition, ePosition
]

var generateHomeContent = function () {

    for (var i in positions){
        for (var index in positions[i]){
            var splitArr = positions[i][index].split('-');
            var block = blockGenerator(params.color.black, realPosition({x:parseInt(splitArr[0]), y:parseInt(splitArr[1])}));
            content.addChild(block);
        }
    }
};

module.exports = stage;