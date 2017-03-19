var path = require('path');

var jqueryPath = path.resolve(__dirname, '../src/lib/jquery-2.min.js')

const NODE_ENV = process.env.NODE_ENV || 'development'
const DIST = process.env.DIST
const BETA = process.env.BETA
const DEMO = process.env.DEMO

var config = {
  env : NODE_ENV,
  jqueryPath
}

config.globalProvide = {
  $: jqueryPath,
  jQuery: jqueryPath
}

// 测试时想使用 mock 数据，可显示申明 USE_PRODUCTION_DATA=false
const USE_PRODUCTION_DATA = process.env.USE_PRODUCTION_DATA || NODE_ENV === 'production'

config.globalDefine = {
    'process.env': {
        'NODE_ENV' : JSON.stringify(NODE_ENV)
    },
    __PROD__: NODE_ENV === 'production',
    DEBUG: process.env.DEBUG,
    DIST,
    BETA,
    DEMO,
    USE_PRODUCTION_DATA
}

module.exports = config
