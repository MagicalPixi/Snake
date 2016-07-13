/**
 * Created by zhouchunjie on 16/7/2.
 */
var params = require('./params');
var blockGenerator = require('./sprites/blockGenerator.js');
var apple = require('./sprites/apple/index');
var background = require('./sprites/background/index');

// create the root of the scene graph
var stage = new PIXI.Container();

var snakeStage = new PIXI.Container();
stage.addChild(snakeStage);

var appleStage = new PIXI.Container();
stage.addChild(appleStage);

stage.initGame = function () {
    initSnake();
    initApple();
};

stage.move = function () {
    var snake = stage.snake;
    var direction = stage.direction;
    //生成新蛇头位置
    var newHeadPosition = {
        x: snake.HEAD.x + direction.x,
        y: snake.HEAD.y + direction.y
    };
    if (newHeadPosition.x < 0 || newHeadPosition.x > 9 || newHeadPosition.y < 0 || newHeadPosition.y > 17 || stage.checkSnakePosition(newHeadPosition)) {
        gameOver();
        return;
    }
    //获取苹果位置,如果蛇头与苹果重合,蛇长度+1
    var applePosition = apple.getApplePosition();
    if (newHeadPosition.x === applePosition.x && newHeadPosition.y === applePosition.y) {
        stage.length++;
        background.setLength(stage.length);
        stage.score = stage.score + 5;
        background.setScore(stage.score);
    }
    snakeStage.removeChildren();
    //新增头部
    var newKey = newHeadPosition.x.toString() + newHeadPosition.y.toString();
    snake[newKey] = snake.HEAD;
    snake.HEAD = newHeadPosition;

    if (stage.realLength === stage.length) {
        //减去最后一位
        for (var key in snake) {
            var position = snake[key];
            var nextPositionKey = position.x.toString() + position.y.toString();
            if (!snake.hasOwnProperty(nextPositionKey)) {
                delete snake[key];
                break;
            }
        }
    } else if (stage.realLength < stage.length) {
        stage.realLength++;
    }
    //绘制蛇
    for (var key in snake) {
        var snakeBlock = blockGenerator(params.color.black, realPosition(snake[key]));
        snakeStage.addChild(snakeBlock);
    }
    //蛇头吃完苹果,苹果重新生成
    if (newHeadPosition.x === applePosition.x && newHeadPosition.y === applePosition.y) {
        initApple();
    }
};

stage.turnTo = function (direction) {
    if (direction.x === 0 && direction.y === 0) {
        return;
    }
    stage.direction = direction;
}

stage.start = function () {
    interval = setInterval(function () {
        stage.move();
    }, 1000);
};

stage.checkSnakePosition = function (position) {
    for (var key in stage.snake) {
        if (stage.snake[key].x === position.x && stage.snake[key].y === position.y) {
            return true;
        }
    }
    return false;
};

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
            };
            break;
        case 1://下
            stage.direction = {
                x: 0,
                y: 1
            };
            break;
        case 2://左
            stage.direction = {
                x: -1,
                y: 0
            };
            break;
        case 3://上
        default:
            stage.direction = {
                x: 0,
                y: -1
            };
            break;
    }
    ;
}
//初始化贪吃蛇开始的位置
var initSnake = function () {
    snakeStage.removeChildren();
    stage.score = 0;
    stage.realLength = 1;
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

    var snakeBlock = blockGenerator(params.color.black, realPosition(position));
    snakeStage.addChild(snakeBlock);
    background.setScore(stage.score);
    background.setSpeed(stage.speed);
    background.setLength(stage.length);
};

var initApple = function () {
    appleStage.removeChildren();
    var appleBlock = apple.initApple();
    appleStage.addChild(appleBlock);
}

var container = new PIXI.Container();

stage.addChild(container);

module.exports = stage;