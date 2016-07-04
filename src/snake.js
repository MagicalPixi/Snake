/**
 * Created by zhouchunjie on 16/7/2.
 */
var params = require('./params')

// create the root of the scene graph
var stage = new PIXI.Container();
var container = new PIXI.Container();

stage.addChild(container);

for (var j = 0; j < 5; j++) {

    for (var i = 0; i < 5; i++) {
        var bunny = new PIXI.Text('ABC',{font : '36px Arial', fill :"#0F0F0F", align : 'center'})
        bunny.x = 40 * i;
        bunny.y = 40 * j;
        container.addChild(bunny);
    };
};
/*
 * All the bunnies are added to the container with the addChild method
 * when you do this, all the bunnies become children of the container, and when a container moves,
 * so do all its children.
 * This gives you a lot of flexibility and makes it easier to position elements on the screen
 */
container.x = 100;
container.y = 60;

module.exports = stage