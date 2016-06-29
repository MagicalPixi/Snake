var pixiLib = require('pixi-lib')

var start = pixiLib.getIm({
  textures:pixiLib.getTextures('start'),
})
start.interactive = true
start.on('touchend', function() {
  this.parent.removeChild(this)
})
module.exports = start
