import _lodash from 'lodash'

var posts = require('./build-dev/posts')
var Store = {
  posts: posts
}

Store.isResponsiveMax600px = () => {
  const deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  return deviceWidth <= 800
}

window.Store = Store

console.log('version: 1.0.0')

// console.log(Store)
module.exports = Store