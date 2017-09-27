var path = require('path');

var buildMd = require(path.resolve(__dirname, './build-markdown-posts'))
var uploadCdn = require(path.resolve(__dirname, '../../tools/upload-qiniu'));

module.exports = function() {
  buildMd()

  uploadCdn(path.resolve(__dirname, '../build-markdown/media/**'), 'site-media/')
}