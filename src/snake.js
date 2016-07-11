/**
 * Created by zhouchunjie on 16/7/2.
 */
var params = require('./params');
var blockGenerator = require('./sprites/blockGenerator.js');
var apple = require('./sprites/apple/index.js');

// create the root of the scene graph
var stage = new PIXI.Container();

var snakeStage = new PIXI.Container();
stage.addChild(snakeStage);

stage.initGame = function () {
    initSnake();
    var appleBlock = apple.initApple();
    stage.addChild(appleBlock);
};

stage.move = function(){
    console.log("move");

    var snake = stage.snake;
    var direction = stage.direction;
    console.log(snake.HEAD);
    var newPosition = {
        x:snake.HEAD.x + direction.x,
        y:snake.HEAD.y + direction.y
    };
    if(newPosition.x <0 || newPosition.x >9 || newPosition.y < 0 || newPosition.y >17){
        gameOver();
        return;
    }
    snake.HEAD = newPosition;
    snakeStage.removeChildren();
    var snakeBlock = blockGenerator(params.color.black, realPosition(newPosition));
    snakeStage.addChild(snakeBlock);
};

stage.start = function () {
    interval = setInterval(function () {
        stage.move();
    },1000);
}

var gameOver = function () {
    console.log("game over");
    clearInterval(interval);
}

var realPosition = function (position) {
    return {
        x: params.contant.sideMargin + params.contant.width * position.x,
        y: params.contant.topMargin + params.contant.width * position.y
    }
}

var randomDirection = function () {
    var dic = parseInt(Math.random() * 4) // 0~3
    switch (dic) {
        case 0://右
            stage.direction = {
                x: 1,
                y: 0
            };break;
        case 1://下
            stage.direction = {
                x: 0,
                y: 1
            };break;
        case 2://左
            stage.direction = {
                x: -1,
                y: 0
            };break;
        case 3://上
        default:
            stage.direction = {
                x: 0,
                y: -1
            };break;
    };
}
//初始化贪吃蛇开始的位置
var initSnake = function () {
    snakeStage.removeChildren();
    stage.score = 0;
    stage.length = 5;
    stage.speed = 1;
    var snake = new Object();
    var x = parseInt(Math.random() * 8 + 1);//x的位置为 1 - 8
    var y = parseInt(Math.random() * 16 + 1);//y的位置为 1 - 16
    var position = {
        x: x,
        y: y
    };
    snake.HEAD = position;
    stage.snake = snake;
    randomDirection();
    console.log(position);
    var snakeBlock = blockGenerator(params.color.black, realPosition(position));
    snakeStage.addChild(snakeBlock);
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
module.exports = stage