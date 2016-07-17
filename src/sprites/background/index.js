/**
 * Created by zhouchunjie on 16/7/3.
 */
var pixiLib = require('pixi-lib')
var params = require('../../params')
var generator = require('../blockGenerator.js')
var backgroundCT = new PIXI.Container();

var rectangleBox = new PIXI.Graphics();

backgroundCT.addChild(rectangleBox);
rectangleBox.lineStyle(4, params.color.black, 1);
// 背景框
rectangleBox.moveTo(10, 20);
rectangleBox.lineTo(475, 20);
rectangleBox.lineTo(475, 841);
rectangleBox.lineTo(10, 841);
rectangleBox.lineTo(10, 20);
rectangleBox.endFill();

//背景方块
backgroundCT.blocks = [];
var initBlocks = function () {
    for (var i = 0; i < 10; i++) {
        backgroundCT.blocks[i] = []
        for (var j = 0; j < 18; j++) {
            var block = generator(params.color.cyan, position(i, j))
            block.indexPath = {x: i, y: j}
            backgroundCT.blocks[i][j] = block
            backgroundCT.addChild(block)
        }
    }
}

var position = function (i, j) {
    return {
        x: params.contant.sideMargin + params.contant.width * i,
        y: params.contant.topMargin + params.contant.width * j
    }
}
initBlocks();

//最高分
var titleStyle = {
    font: 'bold italic 36px Arial',
    fill: '#010600',
    wordWrap: true,
    wordWrapWidth: 440
};

var highestTitle = new PIXI.Text('最高分', titleStyle);
highestTitle.x = 485;
highestTitle.y = 20;

backgroundCT.addChild(highestTitle);

var highestScore = new PIXI.Text("0", titleStyle);
highestScore.x = 500;
highestScore.y = 65;
backgroundCT.setHighestScore = function (score) {
    highestScore = new PIXI.Text(score, titleStyle);
}
backgroundCT.addChild(highestScore);

//分数
var scoreTitle = new PIXI.Text('分数', titleStyle);
scoreTitle.x = 485;
scoreTitle.y = 150;
backgroundCT.addChild(scoreTitle);

var score = new PIXI.Text("0", titleStyle);
score.x = 500;
score.y = 195;
backgroundCT.setScore = function (scoreValue) {
    score.text = scoreValue;
}
backgroundCT.addChild(score);

//长度
var lengthTitle = new PIXI.Text('长度', titleStyle);
lengthTitle.x = 485;
lengthTitle.y = 280;
backgroundCT.addChild(lengthTitle);

var length = new PIXI.Text("0", titleStyle);
length.x = 500;
length.y = 325;
backgroundCT.setLength = function (lengthValue) {
    length.text = lengthValue;
}
backgroundCT.addChild(length);

//速度
var speedTitle = new PIXI.Text('速度', titleStyle);
speedTitle.x = 485;
speedTitle.y = 410;
backgroundCT.addChild(speedTitle);

var speed = new PIXI.Text("0", titleStyle);
speed.x = 500;
speed.y = 455;
backgroundCT.setSpeed = function (speedValue) {
    //backgroundCT.removeChild(speed);
    speed.text = speedValue;
    //backgroundCT.addChild(speed);
}
backgroundCT.addChild(speed);

var buttonTextStyle = {
    font: 'italic 30px Arial',
    fill: '#010600',
    wordWrap: true,
    wordWrapWidth: 440
};

//buttons
//开始
var startButton = new PIXI.Graphics();
backgroundCT.addChild(startButton);
startButton.lineStyle(2, params.color.black, 1);
startButton.beginFill(params.color.cyan, 0.25);
startButton.drawRoundedRect(485, 671, 120, 50, 15);
startButton.endFill();

var startText = new PIXI.Text('开始', buttonTextStyle);
startText.x = 510;
startText.y = 680;
backgroundCT.addChild(startText);

startButton.interactive = true;
startButton.on('touchend',startGame)
    .on('mousedown',startGame);
var startGame = function(){
    console.log('click start');
}

//帮助
var helpButton = new PIXI.Graphics();
backgroundCT.addChild(helpButton);
helpButton.lineStyle(2, params.color.black, 1);
helpButton.beginFill(params.color.cyan, 0.25);
helpButton.drawRoundedRect(485, 731, 120, 50, 15);
helpButton.endFill();

var helpText = new PIXI.Text('帮助', buttonTextStyle);
helpText.x = 510;
helpText.y = 740;
backgroundCT.addChild(helpText);

startButton.interactive = true;

//分享
var shareButton = new PIXI.Graphics();
backgroundCT.addChild(shareButton);

shareButton.lineStyle(2, params.color.black, 1);
shareButton.beginFill(params.color.cyan, 0.25);
shareButton.drawRoundedRect(485, 791, 120, 50, 15);
shareButton.endFill();

var shareText = new PIXI.Text('分享', buttonTextStyle);
shareText.x = 510;
shareText.y = 800;
backgroundCT.addChild(shareText);

shareButton.interactive = true;
backgroundCT.interactive =true;

module.exports = backgroundCT;
