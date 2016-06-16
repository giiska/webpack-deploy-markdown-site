var path = require('path')
var webpack = require('webpack')
var text = require("extract-text-webpack-plugin");
var html = require('html-webpack-plugin')
var port = 8078;

var config = {}
config.resolve = {
  root: [],
  alias: {
    'markdownDir': path.resolve(__dirname, '../data/build-markdown/'),
    'clientData': path.resolve(__dirname, '../data/client-h5.js')
  }
}
config.devtool = 'inline-source-map'
config.entry = {
	main: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?noInfo=true&reload=true',
		path.resolve(__dirname, "../h5/src/app.js")
	]
}
config.output = {
	path: __dirname + '/__build__',
	publicPath: "/__build__/",
	filename: "[name].js"
}
config.module = require('./loader')

config.vue = {
	loaders: {
		js: 'babel'
	}
}

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
//   new text("main.css", {allChunks: true})
]
module.exports = config
