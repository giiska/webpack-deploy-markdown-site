var fs = require('fs-extra')
var path = require('path')
var lodash = require('lodash')

var processMethods = require('./processMd');
var chokidar = require('chokidar');

var localConfig = require('../../.config.json')
var mdDir = localConfig.markdownPath
var outputDir = path.resolve(__dirname, '..', 'build-markdown')
var outputJsonDir = path.resolve(__dirname, '..', 'build-dev')
fs.ensureDirSync(outputDir)
fs.ensureDirSync(outputJsonDir)

var opts = {
  mdDir: mdDir,
  outputDir: outputDir
}

function proc(event, filePath) {
  // console.log(event, filePath)
  var outputFilePath = filePath.replace(mdDir, outputDir)
  if (['change', 'add'].indexOf(event) > -1 && path.extname(filePath) === '.md') {
      processMethods.processMd(filePath, opts)
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
  console.log('watching change.')
    chokidar.watch([
        mdDir + '/**/*.md', 
        '!' + mdDir + '/.*', 
        '!' + mdDir + '/**/.*'
      ], {
        name: 'watchPageHtml',
        ignoreInitial: true
    })
    .on("all", proc);
}

function buildPosts(isWatch) {
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
    if(isWatch)
      watchMd()
  }
  var walkDir = function(dir) {
    fs.readdirSync(dir).map(function(file) {
      var filePath = path.resolve(dir, file);
      if(fs.statSync(filePath).isDirectory()) {
        // 非 . 开头的目录才可以
        if(path.basename(filePath)[0] !== '.') {
          proc('addDir', filePath)
          walkDir(filePath)
        }
      }
      else if(path.extname(filePath) !== '.md') {
        proc('add', filePath)
      }
      else {
        // DIST 用同步， dev watch 用 promise
        if(isWatch)
          promiseArr.push(processMethods.processMd(filePath, opts))
        else
          contentArr.push(processMethods.processMdSync(filePath, opts))
      }
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
    buildPosts(/*isWatch*/true)
  else
    buildPosts()
}