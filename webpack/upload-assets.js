/**
 * @version 0.0.1
 * @author John Xiao
 */

var path = require('path')
var uploadCdn = require(path.resolve(__dirname, '../tools/upload-qiniu'));

uploadCdn(path.resolve(__dirname, '../h5/build/**'), 'site/')

module.exports = uploadCdn