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
  if(parsedContent.draft)
    return
  var outputFilePath = sourceFile.replace(mdDir, outputDir)
  var fileName = path.basename(sourceFile, '.md')
  // console.log('write file', fileName)
  if(process.env.DIST) {
    if(parsedContent._content.indexOf('(media/') > -1) {
      parsedContent._content = parsedContent._content.split('(media/').join(localConfig['markdown-media-path'])
    }
  }
  fs.writeFile(outputFilePath, new Buffer(parsedContent._content))
  var output = lodash.pick(parsedContent, ['title', 'categories', 'tags', 'date'])
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


