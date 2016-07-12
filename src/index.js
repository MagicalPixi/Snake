var aspect;
var pixiLib = require('pixi-lib');
var params = require('./params')
var loader = require('./loader')
var currentDistance = 0
resetSize()
var renderer = PIXI.autoDetectRenderer(640, aspect * 640, { 
  antialias: true,
  transparent:true
});
document.body.appendChild(renderer.view)
loader.add(params.png, 'png').load(function() {
  //var game = require('./game')
  //game.resetGame()
  var stage = new PIXI.Container()

  var background = require('./sprites/background');
  stage.addChild(background);

  var snake = require('./snake')
  snake.initGame();
  stage.addChild(snake);
  snake.start();

  stage.render = function() {
    stage.children.map(function(child) {
      if(child.render) {
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
})

window.onresize = function() {
  resetSize()
  renderer.resize(640, aspect * 640)
}

function resetSize() {
  aspect = document.body.clientHeight / document.body.clientWidth
}

