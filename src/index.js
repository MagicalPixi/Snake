var aspect;
var pixiLib = require('pixi-lib');
var params = require('./params')
var loader = require('./loader')
var snake = require('./snake');
var currentDistance = 0
var touchStartPos=new Object(),touchEndPos=new Object();
resetSize()
var renderer = PIXI.autoDetectRenderer(640, aspect * 640, {
    antialias: true,
    transparent: true
});
document.body.appendChild(renderer.view)
document.onkeydown=function(e){
    e=window.event||e;
    var direction = {
        x:0,
        y:0
    }
    switch(e.keyCode){
        case 37: //左键
            direction.x = -1;
            snake.turnTo(direction);
            break;
        case 38: //向上键
            direction.y = -1;
            snake.turnTo(direction);
            break;
        case 39: //右键
            direction.x = 1;
            snake.turnTo(direction);
            break;
        case 40: //向下键
            direction.y = 1;
            snake.turnTo(direction);
            break;
        default:
            break;
    }
}
loader.add(params.png, 'png').load(function () {
    //var game = require('./game')
    //game.resetGame()
    var stage = new PIXI.Container()

    var background = require('./sprites/background');
    stage.addChild(background);

    //home 
    //var home = require('./sprites/home');
    //var homeContent = home.initHome();
    //stage.addChild(homeContent);

    /*
    snake.initGame();
    stage.addChild(snake);
    snake.start();

    stage.interactive = true;
    stage.on('mousedown', touchStart)
        .on('touchstart', touchStart)
        .on('mouseup', touchEnd)
        .on('mouseupoutside', touchEnd)
        .on('touchend', touchEnd)
        .on('touchendoutside', touchEnd);
*/
    stage.render = function () {
        stage.children.map(function (child) {
            if (child.render) {
                child.render()
            }
        })
    }
    requestAnimationFrame(animate)
    function animate(time) {
        renderer.render(stage)
        stage.render()
        requestAnimationFrame(animate)
    }
});

var touchStart = function(event){
    var newPosition = event.data.global;
    touchStartPos.x = newPosition.x;
    touchStartPos.y = newPosition.y;
};

var touchEnd = function(event){
    var newPosition = event.data.global;
    touchEndPos.x = newPosition.x;
    touchEndPos.y = newPosition.y;

    var temp = {
        x: touchEndPos.x - touchStartPos.x,
        y: touchEndPos.y - touchStartPos.y
    };

    var direction = {
        x:0,
        y:0
    };

    if (Math.abs(temp.x) > Math.abs(temp.y)){
        direction.x = temp.x/Math.abs(temp.x);
        direction.y = 0;
    }else if (Math.abs(temp.x) < Math.abs(temp.y)){
        direction.x = 0;
        direction.y = temp.y/Math.abs(temp.y);
    }
    snake.turnTo(direction);
};

window.onresize = function () {
    resetSize()
    renderer.resize(640, aspect * 640)
}

function resetSize() {
    aspect = document.body.clientHeight / document.body.clientWidth
}

