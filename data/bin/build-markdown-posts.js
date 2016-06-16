var fs = require('fs-extra')
var path = require('path')
var lodash = require('lodash')

var processMethods = require('./processMd');
var chokidar = require('chokidar');

var mdDir = path.resolve(__dirname, '..', 'markdown')
var outputDir = path.resolve(__dirname, '..', 'build-markdown')
var outputJsonDir = path.resolve(__dirname, '..', 'build-dev')
fs.ensureDirSync(outputDir)
fs.ensureDirSync(outputJsonDir)

function proc(event, filePath) {
  // console.log(event, filePath)
  var outputFilePath = filePath.replace(mdDir, outputDir)
  if (['change', 'add'].indexOf(event) > -1 && path.extname(filePath) === '.md') {
      processMethods.processMd(filePath)
      buildPosts()
  }
  else if ('unlink' === event) {
      fs.remove(outputFilePath)
      if(path.extname(filePath) === '.md')
        buildPosts()
  }
  if ('addDir' === event) {
      fs.ensureDirSync(outputFilePath)
  }
  if ('add' === event && ['.jpg', '.png', '.gif'].indexOf(path.extname(filePath)) > -1) {
      fs.copySync(filePath, outputFilePath)
  }
}

function watchMd() {
  console.log('watching.')
    chokidar.watch(mdDir + '/**/*', {
        name: 'watchPageHtml',
        ignoreInitial: true
    })
    .on("all", proc);
}

function buildPosts(watchCb) {
  var promiseArr = []
  var contentArr = []

  function _createPostJson(contents) {
    contents = lodash.filter(contents, function(o) {
      return o !== null
    })
    contents = lodash.orderBy(contents, ['date'], ['desc'])
    var f = path.resolve(outputJsonDir, 'posts.json')
    fs.writeFileSync(f, JSON.stringify(contents, null, 2))
    console.log('posts build')
    watchCb && watchCb()
  }
  var walkDir = function(dir) {
    fs.readdirSync(dir).map(function(file) {
      var filePath = path.resolve(dir, file);
      if(fs.statSync(filePath).isDirectory()) {
        proc('addDir', filePath)
        walkDir(filePath)
        return
      }
      if(path.extname(filePath) !== '.md') {
        proc('add', filePath)
        return
      }
      // DIST 用同步， dev watch 用 promise
      if(watchCb)
        promiseArr.push(processMethods.processMd(filePath))
      else
        contentArr.push(processMethods.processMdSync(filePath))
    })
  }
  walkDir(mdDir)
  if(!promiseArr.length && contentArr.length) {
    _createPostJson(contentArr)
  }
  else {
    Promise.all(promiseArr).then(_createPostJson).catch(function(err) {
      console.log('err', err)
    })
  }
}

// buildPosts(watchMd)
module.exports = function(watchMode) {
  if(watchMode)
    buildPosts(watchMd)
  else
    buildPosts()
}