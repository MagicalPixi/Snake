/**
 * Created by zhouchunjie on 16/7/7.
 */

var blockGenerator = require('../blockGenerator.js');
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
    generateApplePosition();
    //生成苹果
    var apple = blockGenerator(params.color.black, realPosition(stage.apple));
    console.log(realPosition(stage.apple));
    console.log(stage.apple);
    return apple;
};

var generateApplePosition = function () {
    var snake = require('../../snake');
    var hasExisted = true;
    while (hasExisted) {
        var x = parseInt(Math.random() * 10);//x的位置为 0-9
        var y = parseInt(Math.random() * 18);//y的位置为 0-17
        stage.apple = {
            x: x,
            y: y
        }
        hasExisted = snake.checkSnakePosition(stage.apple);
    }

};

stage.getApplePosition = function(){
    return stage.apple;
}

module.exports = stage