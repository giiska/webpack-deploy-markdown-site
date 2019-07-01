// var text = require("extract-text-webpack-plugin")

module.exports = {  
  rules: [
  {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
      // loader: text.extract("style-loader", "css-loader")
  }, 
  {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
      // loader: text.extract("style-loader", "css-loader")
  }, 
  {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
      // loader: text.extract("style-loader", "css-loader!less-loader")
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  }, 
  {
    test: /\.json$/,
    loader: 'json-loader'
  }, 
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules|data\/build/
  }, 
  {
    test: /\.(ttf|eot|svg|woff)$/,
    loader: "file-loader"
  },
  {
    test: /\.(png|jpe?g|gif)$/,
    loader: 'url-loader?limit=10000'
  },
  { 
    test: /\.md$/, 
    loader: "html-loader!markdown-loader"
  }]
}
