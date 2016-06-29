var param = require('../../params')
var text = new PIXI.Text('',{font : '36px Arial', fill :param.color.blue, align : 'center'})
text.y = 10
text.lifeCount = 12
text.setLifeCount = function (count) {
  this.lifeCount = count
  this.text = '剩余生命: ' + count + ' 条' 
}
module.exports = text
