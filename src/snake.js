/**
 * Created by zhouchunjie on 16/7/2.
 */
var params = require('./params');
var blockGenerator = require('./sprites/blockGenerator.js');
var apple = require('./sprites/apple/index');
var background = require('./sprites/background/index');
var isStart = false;
// create the root of the scene graph
var stage = new PIXI.Container();

var snakeStage = new PIXI.Container();
stage.addChild(snakeStage);

var appleStage = new PIXI.Container();
stage.addChild(appleStage);

var gameOverStage = new PIXI.Container();
stage.addChild(gameOverStage);

stage.initGame = function () {
    if (!isStart) {
        isStart = true;
        initSnake();
        initApple();
        gameOverStage.removeChildren();
    }
};

stage.isStarting = function () {
    return isStart;
}

stage.move = function () {
    var snake = stage.snake;
    var direction = stage.directionTemp;
    //生成新蛇头位置
    var newHeadPosition = {
        x: snake.HEAD.x + direction.x,
        y: snake.HEAD.y + direction.y
    };
    if (newHeadPosition.x < 0 || newHeadPosition.x > 9 || newHeadPosition.y < 0 || newHeadPosition.y > 17 || stage.checkSnakePosition(newHeadPosition)) {
        isStart = false;
        gameOver();
        return;
    }
    stage.direction = direction;
    //获取苹果位置,如果蛇头与苹果重合,蛇长度+1
    var applePosition = apple.getApplePosition();
    if (newHeadPosition.x === applePosition.x && newHeadPosition.y === applePosition.y) {
        stage.length++;
        background.setLength(stage.length);
        stage.score = stage.score + params.constant.increment;
        background.setScore(stage.score);
        updateHighestScore();

        if (stage.score > 0 && stage.score % params.constant.addSpeedScore == 0) {
            clearInterval(interval);
            stage.speed++;
            background.setSpeed(stage.speed);
            stage.start(params.constant.intervalTime / (stage.speed));
        }
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

    if ((direction.x === stage.direction.x && direction.y === -stage.direction.y ) || (direction.x === -stage.direction.x && direction.y === stage.direction.y )) {
        //无视与移动方向相反的方向变换
        return;
    }
    stage.directionTemp = direction;
};

stage.start = function (intervalTime) {
    interval = setInterval(function () {
        stage.move();
    }, intervalTime == undefined ? params.constant.intervalTime : intervalTime);
};

stage.checkSnakePosition = function (position) {
    for (var key in stage.snake) {
        if (stage.snake[key].x === position.x && stage.snake[key].y === position.y) {
            return true;
        }
    }
    return false;
};

stage.setHighestScore = function (highestScore) {
    stage.highestScore = highestScore;
};

stage.getHighestScore = function () {
    return stage.highestScore;
};

var dieBody;
var gameOver = function () {
    console.log("game over");
    //闪烁蛇的位置,表示已经die
    clearInterval(interval);
    var count = 0;
    dieBody = setInterval(function () {
        if (count % 2 === 0) {
            //clear snake
            snakeStage.removeChildren();
        } else {
            var snake = stage.snake;
            for (var key in snake) {
                var snakeBlock = blockGenerator(params.color.black, realPosition(snake[key]));
                snakeStage.addChild(snakeBlock);
            }
        }
        count++;
        if (count == 4) {
            clearInterval(dieBody);
            //显示Game Over
            snakeStage.removeChildren();
            appleStage.removeChildren();
            gameOverStage.removeChildren();
            showGameOver();
        }
    }, 500);
};

var showGameOver = function () {
    var charG = [
        '0-0', '1-0', '2-0', '3-0',
        '0-1', '3-1',
        '0-2',
        '0-3', '2-3', '3-3',
        '0-4', '3-4',
        '0-5', '1-5', '2-5', '3-5'
    ];

    var charMouse = [
        '0-0', '5-0',
        '1-1', '2-1', '3-1', '4-1'
    ];

    var offsetY = 3;
    var offsetX = 0;

    for (var i in charG) {
        var splitArr = charG[i].split('-');
        var block = blockGenerator(params.color.black, realPosition({
            x: offsetX + parseInt(splitArr[0]),
            y: offsetY + parseInt(splitArr[1])
        }));
        gameOverStage.addChild(block);
    }

    offsetX = 6;
    for (var i in charG) {
        var splitArr = charG[i].split('-');
        var block = blockGenerator(params.color.black, realPosition({
            x: offsetX + parseInt(splitArr[0]),
            y: offsetY + parseInt(splitArr[1])
        }));
        gameOverStage.addChild(block);
    }

    offsetX = 2;
    offsetY = 13;
    for (var i in charMouse) {
        var splitArr = charMouse[i].split('-');
        var block = blockGenerator(params.color.black, realPosition({
            x: offsetX + parseInt(splitArr[0]),
            y: offsetY + parseInt(splitArr[1])
        }));
        gameOverStage.addChild(block);
    }


};

var updateHighestScore = function () {
    //对比最高分
    if (stage.score > stage.highestScore) {
        stage.highestScore = stage.score;
    }
    background.setHighestScore(stage.highestScore);
};

var realPosition = function (position) {
    return {
        x: params.constant.sideMargin + params.constant.width * position.x,
        y: params.constant.topMargin + params.constant.width * position.y
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

    stage.directionTemp = {
        x: stage.direction.x,
        y: stage.direction.y
    };
}
//初始化贪吃蛇开始的位置
var initSnake = function () {
    snakeStage.removeChildren();
    gameOverStage.removeChildren();
    stage.score = 0;
    stage.highestScore = stage.highestScore === undefined ? 0 : stage.highestScore;
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
    background.setHighestScore(stage.highestScore);
};

var initApple = function () {
    appleStage.removeChildren();
    var appleBlock = apple.initApple();
    appleStage.addChild(appleBlock);
};

var container = new PIXI.Container();

stage.addChild(container);

module.exports = stage;