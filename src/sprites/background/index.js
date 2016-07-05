/**
 * Created by zhouchunjie on 16/7/3.
 */
var pixiLib = require('pixi-lib')
var param = require('../../params')
var generator = require('../blockGenerator.js')
var backgroundCT = new PIXI.Container();

var rectangleBox = new PIXI.Graphics();

backgroundCT.addChild(rectangleBox);
rectangleBox.lineStyle(4, 0x0F0F0F, 1);
// 背景框
rectangleBox.moveTo(10,20);
rectangleBox.lineTo(475, 20);
rectangleBox.lineTo(475, 841);
rectangleBox.lineTo(10, 841);
rectangleBox.lineTo(10, 20);
rectangleBox.endFill();

var width = 44.5;
var topMargin = 30;
var sideMargin = 20;
//背景方块
backgroundCT.blocks = [];
var initBlocks = function(){
    for (var i = 0; i < 10; i ++) {
        backgroundCT.blocks[i] = []
        for (var j = 0; j < 18; j ++) {
            var block = generator(0x97A581, postion(i, j))
            block.indexPath = {x:i, y:j}
            backgroundCT.blocks[i][j] = block
            backgroundCT.addChild(block)
        }
    }
}

var postion = function(i, j) {
    return {
        x: sideMargin + width * i,
        y: topMargin + width * j
    }
}
initBlocks();

//

module.exports = backgroundCT;
