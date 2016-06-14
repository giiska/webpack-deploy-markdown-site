var path = require('path')
var webpack = require('webpack')
var fs = require('fs-extra')
var text = require("extract-text-webpack-plugin")
var html = require('html-webpack-plugin')
var localConfig = require('../.config')

require('../data/bin/build-dist')()

var config = {}
config.resolve = {
  root: [],
  alias: {
    'markdownDir': path.resolve(__dirname, '../data/build-markdown/'),
    'clientData': path.resolve(__dirname, '../data/client-h5.js')
  }
}
var jqueryPath = path.resolve(__dirname, '../h5/src/lib/jquery-2.min.js')
config.entry = [
  jqueryPath,
  path.resolve(__dirname, "../h5/src/lib/jquery-scroll-to.js"), 
  path.resolve(__dirname, "../h5/src/app.js")
]
config.output = {
  path: path.resolve(__dirname, "../h5/build"),
  publicPath: '/',
  filename: "build.[hash].js"
}
if(process.env.DIST)
  config.output.publicPath = localConfig.publicPath

config.module = require('./loader')

config.vue = {
	loaders: {
		// css: text.extract("css"),
		js: 'babel'
	}
}

config.plugins = [
  function() {
    if(process.env.DIST)
      this.plugin('done', function(stats) {
        require('./upload-assets')
        require('./update-assets-version')(stats.hash)
      })
  },
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}),
  new webpack.ProvidePlugin({
    $: jqueryPath,
    jQuery: jqueryPath
  }),
  // new text('build.[hash].css'),
	// new webpack.optimize.CommonsChunkPlugin("common.[hash].js"),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: false,
		mangle: true,
		compress: {
			warnings: false
		}
	})
]
module.exports = config
