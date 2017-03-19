/**
 * @version 0.0.1
 * @author John Xiao
 */

var vfs = require('vinyl-fs');
var path = require('path')
var qiniu = require('gulp-qiniu');
var cdnConfig = require(path.resolve(__dirname, '.qiniu-config'));

var uploadCdn = function (src, cdnDest) {
  if(!src || !cdnDest)
    return
  cdnConfig.dest = cdnDest
  console.log('start upload to cdn: ', cdnDest)
  vfs.src(src)
    .pipe(qiniu(cdnConfig, {
      dir: cdnDest,
      versioning: false,
      concurrent: 10
    }))
    .on('end', function () {
      console.log('to cdn end.')
    })
}

module.exports = uploadCdn