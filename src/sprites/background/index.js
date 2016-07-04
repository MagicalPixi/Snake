/**
 * Created by zhouchunjie on 16/7/3.
 */
var pixiLib = require('pixi-lib')
var param = require('../../params')
var backgroundCT = new PIXI.Container();

var rectangleBox = new PIXI.Graphics();

backgroundCT.addChild(rectangleBox);
rectangleBox.lineStyle(4, 0x0F0F0F, 1);
// draw a shape
rectangleBox.moveTo(10,20);
rectangleBox.lineTo(475, 20);
rectangleBox.lineTo(475, 800);
rectangleBox.lineTo(10, 800);
rectangleBox.lineTo(10, 20);
rectangleBox.endFill();

var width = 44.5;
var topMargin = 15;
var sideMargin = 15;

backgroundCT.blocks = [];
var initBlocks = function(){
    for (var i = 0; i < 18; i ++) {
        stage.blocks[i] = []
        for (var j = 0; j < 10; j ++) {
            var block = generator(params.color.blue, postion(i, j), onClickBlock)
            block.indexPath = {x:i, y:j}
            stage.blocks[i][j] = block
            stage.addChild(block)
        }
    }
}

module.exports = backgroundCT;
