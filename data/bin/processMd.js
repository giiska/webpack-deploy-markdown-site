var lodash = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var hexoFrontMatter = require('hexo-front-matter');
var localConfig = require('../../.config.json')

var mdDir = path.resolve(__dirname, '..', 'markdown')
var outputDir = path.resolve(__dirname, '..', 'build-markdown')
fs.ensureDirSync(outputDir)

function processMdContent(sourceFile, md) {
  var content = md.toString()
  var parsedContent = hexoFrontMatter.parse(content)
  // DIST 时不发布 draft 的文章
  if(process.env.DIST && parsedContent.draft)
    return null
  var outputFilePath = sourceFile.replace(mdDir, outputDir)
  var fileName = path.basename(sourceFile, '.md')
  // console.log('write file', fileName)
  if(process.env.DIST) {
    if(parsedContent._content.indexOf('(media/') > -1) {
      parsedContent._content = parsedContent._content.split('(media/').join('(' + localConfig['markdown-media-path'])
    }
  }
  fs.writeFile(outputFilePath, new Buffer(parsedContent._content))
  var output = lodash.pick(parsedContent, ['title', 'categories', 'tags', 'date'])
  if(parsedContent.draft) {
    output.title = '[draft] ' + output.title
  }
  var fileStat = fs.statSync(sourceFile)
  // var ctime = new Date(fileStat.ctime.getTime() + fileStat.ctime.getTimezoneOffset() * 60 * 1000);
  // console.log(ctime)
  if(!output.date)
    output.date = fileStat.ctime
  output.fileName = fileName
  return output
}
function processMdSync(sourceFile) {
  var md = fs.readFileSync(sourceFile)
  var content = processMdContent(sourceFile, md)
  return content
}
function processMd(sourceFile) {
  return new Promise(function(resolve, reject) {
    fs.readFile(sourceFile, function(err, md) {
      var output = processMdContent(sourceFile, md)
      output ? resolve(output) : reject()
    })
  }).catch(function(err) {
    console.log('err', err)
  })
}

module.exports = {
  processMd: processMd,
  processMdSync: processMdSync
}


