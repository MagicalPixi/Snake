var param = require('../params')
var generator = function(color, postion, ontouch) {
  ontouch = ontouch || function() {}
  var container = new PIXI.Container()
  container.x = postion.x
  container.y = postion.y
  var graphics = new PIXI.Graphics()
  graphics.make = function(color) {
    this.clear()
    this.beginFill(color, 1)
    this.drawRect(0, 0, 60, 60, 0)
    this.endFill()
  }
  var text = new PIXI.Text('',{font : '38px Arial', fill :param.color.blue, align : 'center'})
  text.anchor.set(0.5, 0.5)
  text.x = 30
  text.y = 30
  container.addChild(text)
  container.text = text
  container.addChild(graphics)
  container.graphics = graphics
  container.over = function () {
     this.graphics.make(param.color.red)
  }
  container.on('touchstart', ontouch)
  container.interactive = true
  container.showText = function(string) {
    this.isMine = false
    this.graphics.alpha = 0
    this.text.text = string
    container.showtimer = 500
  }
  graphics.make(color)
  container.showtimer = 0
  container.render = function () {
    if (this.showtimer <= 0) {
      this.graphics.alpha = 1
      this.graphics.make(param.color.blue)
      if (this.isMine) {
        param.mineCount --
      }
    } else {
      if (!this.isMine) {
        this.graphics.alpha = 0
      }
      this.showtimer --
    }
  }
  return container
}

module.exports = generator 
