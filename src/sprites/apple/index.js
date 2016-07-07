/**
 * Created by zhouchunjie on 16/7/7.
 */

var blockGenerator = require('../blockGenerator.js');
var snake = require('../../snake.js');
var params = require('../../params');

var stage = new PIXI.Container();

var realPosition = function (position) {
    return {
        x: params.contant.sideMargin + params.contant.width * position.x,
        y: params.contant.topMargin + params.contant.width * position.y
    }
}

//初始化苹果位置
stage.initApple = function () {
    var x = parseInt(Math.random() * 10);//x的位置为 0-9
    var y = parseInt(Math.random() * 18);//y的位置为 0-17
    stage.apple = {
        x: x,
        y: y
    }
    checkSnakePosition();

    //生成苹果
    var apple = blockGenerator(params.color.black, realPosition(stage.apple));
    console.log(realPosition(stage.apple));
    console.log(stage.apple);
    return apple;
};

var checkSnakePosition = function () {
    //TODO check snake position
    //var array = stage.snake.keys();
    //for (var i in array) {
    //    var position = stage.snake.get(array[i]);
    //    if (stage.apple.position.x === position.x && stage.apple.position.y === position.y) {
    //        initApple();
    //    }
    //}
};

module.exports = stage