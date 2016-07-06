/**
 * Created by zhouchunjie on 16/7/2.
 */
var params = require('./params')
var background = require('./sprites/background');
var blockGenerator = require('./sprites/blockGenerator.js')

var width = 44.5;
var topMargin = 30;
var sideMargin = 20;
// create the root of the scene graph
var stage = new PIXI.Container();
var clearGame = function () {
    stage.removeChildren();
    stage.score = 0;
    stage.length = 5;
    stage.speed = 1;
    stage.snake = new Map();
    background.setLength(stage.length);
    background.setScore(stage.score);
    background.setSpeed(stage.speed);
};

var initGame = function () {
    initSnake();
    initApple();
};

//初始化贪吃蛇开始的位置
var initSnake = function () {
    stage.score = 0;
    stage.length = 5;
    stage.speed = 1;
    stage.snake = new Map();
    var x = parseInt(Math.random() * 8 + 1);//x的位置为 1 - 8
    var y = parseInt(Math.random() * 16 + 1);//y的位置为 1 - 16
    var position = {
        x: x,
        y: y
    };
    stage.snake.put("HEAD", position);
    randomDirection();
}

var randomDirection = function () {
    var dic = parseInt(Math.random() * 3) // 0~3
    switch (dic) {
        case 0://右
            stage.direction = {
                x: 1,
                y: 0
            };
        case 1://下
            stage.direction = {
                x: 0,
                y: 1
            };
        case 2://左
            stage.direction = {
                x: -1,
                y: 0
            };
        case 3://上
            stage.direction = {
                x: 0,
                y: -1
            }
    }
    ;
}
//初始化苹果位置
var initApple = function () {
    var x = parseInt(Math.random() * 10);//x的位置为 1 - 8
    var y = parseInt(Math.random() * 18);//y的位置为 1 - 16
    stage.apple = {
        x: x,
        y: y
    }
    checkSnakePosition();

    //生成苹果
    var apple = blockGenerator(0x0F0F0F, position(stage.apple));
    console.log(position(stage.apple));
    stage.addChild(apple);
};

var position = function (position) {
    return {
        x: topMargin + width * position.x,
        y: sideMargin + width * position.y
    }
}

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

var container = new PIXI.Container();

stage.addChild(container);

//for (var j = 0; j < 5; j++) {
//
//    for (var i = 0; i < 5; i++) {
//        var bunny = new PIXI.Text('ABC',{font : '36px Arial', fill :"#0F0F0F", align : 'center'})
//        bunny.x = 40 * i;
//        bunny.y = 40 * j;
//        container.addChild(bunny);
//    };
//};
/*
 * All the bunnies are added to the container with the addChild method
 * when you do this, all the bunnies become children of the container, and when a container moves,
 * so do all its children.
 * This gives you a lot of flexibility and makes it easier to position elements on the screen
 */
//container.x = 100;
//container.y = 60;
initApple();
module.exports = stage