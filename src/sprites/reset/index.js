var param = require('../../params')
var pixiLib = require('pixi-lib')

var reset = pixiLib.getIm({
  textures:pixiLib.getTextures('reset'),
  x: 170,
  y:800
})
reset.interactive = true
module.exports = function(cb) {
  reset.on('touchstart', cb)
  return reset
}
