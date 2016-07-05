var param = require('../params')
var generator = function(color, postion) {
  var container = new PIXI.Container()
  container.x = postion.x
  container.y = postion.y
  var rectangleBox = new PIXI.Graphics();
  rectangleBox.lineStyle(2, color, 1);
// draw a shape
  rectangleBox.moveTo(0,0);
  rectangleBox.lineTo(0, 44.5);
  rectangleBox.lineTo(44.5, 44.5);
  rectangleBox.lineTo(44.5, 0);
  rectangleBox.lineTo(0, 0);
  rectangleBox.endFill();
  container.addChild(rectangleBox);
  var graphics = new PIXI.Graphics()
  graphics.beginFill(color, 1)
  graphics.drawRect(4.5, 4.5, 35.5, 35.5)
  graphics.endFill()
  container.addChild(graphics)
  //container.interactive = true
  return container
}

module.exports = generator 
