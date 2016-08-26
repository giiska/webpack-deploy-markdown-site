var express = require('express')
var path = require("path");
var webpack = require("webpack");
var setIterm2Badge = require('set-iterm2-badge');
var devConfig = require(path.resolve(__dirname, './dev'));

// watch and process markdown
require('../data/bin/build-dev')(/*watchMode=*/true)

var app = express()

var compiler = webpack(devConfig);
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: devConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(path.resolve(__dirname, '../h5')));
// app.use('/static', express.static('./src/assets'))

var port = 8078
setIterm2Badge('markdown' + port)
app.listen(port, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://0.0.0.0:' + port)
})
