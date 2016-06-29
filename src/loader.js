var pixiLib = require('pixi-lib');
var path

if (window.NODE_ENV == 'develop') {
  path = 'games/boating/src/resource/'
} else if (window.NODE_ENV == 'production') {
  path = 'http://o8c60jr2y.bkt.clouddn.com/mine/'
} else {
  path = 'src/resource/'
}

module.exports = pixiLib.createLoader({
  publicPath: path
});
