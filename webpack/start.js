var path = require('path')
var webpack = require('webpack')
var fs = require('fs-extra')
var text = require("extract-text-webpack-plugin")
var html = require('html-webpack-plugin')
var localConfig = require('../.config.json')
var port = 8078

var globalConf = require('./config')
const {__PROD__, DIST, BETA, DEMO} = globalConf.globalDefine

if(__PROD__) {
  // require('../data/bin/build-dist')()
}
else {
  var setIterm2Badge = require('set-iterm2-badge')
  setIterm2Badge('blog' + port)
}

var config = {}
config.resolve = {
  alias: {
    'markdownDir': path.resolve(__dirname, '../data/build-markdown/'),
    'clientData': path.resolve(__dirname, '../data/client-h5.js')
  }
}
config.entry = [
  globalConf.jqueryPath,
  path.resolve(__dirname, "../src/lib/jquery-scroll-to.js"), 
  path.resolve(__dirname, "../src/app.js")
]
config.output = {
  path: path.resolve(__dirname, "../build"),
  publicPath: '/',
  filename: "build.[hash].js"
}

var hotDev = [
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://localhost:' + port
]
if(__PROD__)
  config.output.publicPath = localConfig['public-url']
else {
  config.output = {
    path: path.resolve(__dirname, "../build"),
    publicPath: "",
    filename: "build.[hash].js"
  }
}

config.module = require('./loader')

config.plugins = [
  new html({
    filename: 'index.html',
    template: './src/index.html',
    minify: {
      collapseWhitespace: true
    }
  }),
  function() {
    if(__PROD__)
      this.plugin('done', function(stats) {
        require('./upload-assets')
        require('./update-assets-version')(stats.hash)
      })
  },
  new webpack.DefinePlugin(globalConf.globalDefine),
  new webpack.ProvidePlugin(globalConf.globalProvide),
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: false,
		mangle: true,
		compress: {
			warnings: false
		}
	})
]
module.exports = config
