var lodash = require('lodash');
var fs = require('fs-extra');
var path = require('path');

var buildMdDev = require(path.resolve(__dirname, './build-markdown-posts'))
var uploadCdn = require(path.resolve(__dirname, '../../tools/upload-qiniu'));

module.exports = function() {
  buildMdDev()

  uploadCdn(path.resolve(__dirname, '../build-markdown/media/**'), 'site-media/')
}