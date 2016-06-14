var text = require("extract-text-webpack-plugin")
module.exports = {
  
  loaders: [
  {
      test: /\.css$/,
      loader: 'style!css'
      // loader: text.extract("style-loader", "css-loader")
  }, 
  {
      test: /\.less$/,
      loader: 'style!css!less'
      // loader: text.extract("style-loader", "css-loader!less-loader")
  },
  {
    test: /\.vue$/,
    loader: 'vue'
  }, 
  {
    test: /\.json$/,
    loader: 'json'
  }, 
  {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules|data\/build/
  }, 
  {
    test: /\.(ttf|eot|svg|woff)$/,
    loader: "file"
  },
  {
    test: /\.(png|jp?g|gif)$/,
    loader: 'url?limit=10000'
  },
  { 
    test: /\.md$/, 
    loader: "html!markdown"
  }]
}
