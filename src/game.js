var generator = require('./sprites/blockGenerator.js')
var params = require('./params')
var stage = new PIXI.Container()
var life = require('./sprites/life')
var clearGame = function() {
  stage.removeChildren()
  stage.mines = []
  stage.blocks = []
  params.mineCount = 0
  life.setLifeCount(12)
}

var initGame = function() {
  initMineArray()
  initBlocks()
}

var initMineArray = function () {
  stage.mines = []
  while(stage.mines.length < 10) {
    var mine = initMine()
    if(!checkMine(mine)) {
      stage.mines.push(mine)
    }
  }
}

var initBlocks = function() {
  for (var i = 0; i < 9; i ++) {
    stage.blocks[i] = []
    for (var j = 0; j < 9; j ++) {
      var block = generator(params.color.blue, postion(i, j), onClickBlock)
      block.indexPath = {x:i, y:j}
      stage.blocks[i][j] = block
      stage.addChild(block)
    }
  }
}

var onClickBlock = function() {
  var indexPath = this.indexPath
  if (checkMine(indexPath)) {
    this.isMine = true
    if (this.showtimer === 0) {
      params.mineCount ++
      life.setLifeCount(life.lifeCount - 1)
      if (life.lifeCount === 0) {
        stage.over()
      }
      if (params.mineCount >= 10) {
        stage.success()
      }
      this.showtimer = 500
      this.over()
    }
  } else {
    this.isMine = false
    showBlock(indexPath)
  }
}

var showBlock = function(indexPath) {
  if (!checkMine(indexPath)) {
    var block = stage.blocks[indexPath.x][indexPath.y]
    var count = caculateMine(indexPath)
    if (block.showtimer !== 0) return
    if (count === 0) {
      if (block && block.showText) {
        block.showText('')
      }
      showOtherBlock(indexPath)
    } else {
      block.showText(count + '')
    }
  }
}

var showOtherBlock = function(mine) {
  var array = [{x: -1, y: 0}, 
              {x:0, y: -1}, {x: 0, y: 1},
              {x: 1, y: 0}]
  for(var index in array) {
    var a = array[index]
    var currentMine = {x: mine.x + a.x,
                       y: mine.y + a.y}
    if(currentMine.x >= 0 && currentMine.y >= 0 && currentMine.x < 9 && currentMine.y < 9) {
      showBlock(currentMine)
    }
  }
}

var caculateMine = function(mine) {
  var count = 0
  var array = [{x:-1, y:-1}, {x: -1, y: 0}, {x: -1, y: 1},
              {x:0, y: -1}, {x: 0, y: 1},
              {x:1, y: -1}, {x: 1, y: 0}, {x: 1, y: 1}]
  for(var index in array) {
    var a = array[index]
    var currentMine = {x: mine.x + a.x,
                       y: mine.y + a.y}
    if(currentMine.x >= 0 && currentMine.y >= 0 && checkMine(currentMine)) {
        count ++ 
    }
  }
  return count
}

var checkMine = function(mine) {
  var exist = false
  for(var index in stage.mines) {
    var currentMine = stage.mines[index]
    if (currentMine.x == mine.x && currentMine.y == mine.y) {
      exist = true
      break;
    }
  }
  return exist
}

var initMine = function() {
  return {
    x: parseInt(Math.random() * 9),
    y: parseInt(Math.random() * 9)
  }
}

var postion = function(i, j) {
  return {
    x: 10 + 70 * i,
    y: 10 + 70 * j
  }
}

stage.resetGame = function() {
  clearGame()
  initGame()
  stage.render = render
}

var render = function() {
  stage.children.map(function(child) {
    if(child.render) {
      child.render()
    }
  })
}

stage.over = function () {
  this.addMask()
  document.title = '非常熟悉的扫雷游戏，真的'
  stage.render = undefined
}

stage.addMask = function() {
  stage.parent.overMask.visible = true
}

stage.removeMask = function() {
  stage.parent.overMask.visible = false
  stage.parent.successMask.visible = false
}

stage.success = function() {
  stage.parent.successMask.visible = true
  document.title = '我是扫雷小王子!不服你也扫个给我看看'
  stage.render = undefined
}

module.exports = stage
