var lodash = require('lodash');
var fs = require('fs-extra');
var path = require('path');

var buildMdDev = require(path.resolve(__dirname, './build-markdown-posts'))

// process.env.DIST = true
// buildMdDev(false)
module.exports = function(watchMode) {
  buildMdDev(watchMode)
}