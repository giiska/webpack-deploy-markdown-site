var lodash = require('lodash');
var fs = require('fs-extra');
var path = require('path');

var buildMdDev = require(path.resolve(__dirname, './build-markdown-posts'))

module.exports = function(watchMode) {
  buildMdDev(watchMode)
}