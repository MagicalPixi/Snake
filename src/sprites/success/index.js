var pixiLib = require('pixi-lib')
var  mask = pixiLib.getIm({
  textures:pixiLib.getTextures('success'),
  x: 0, 
  y: 0
})
mask.interactive = true
module.exports = mask
