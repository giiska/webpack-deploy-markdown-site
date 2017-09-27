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

let HISTORY_MODE = false
if(DIST || BETA) {
  HISTORY_MODE = true
}

config.globalDefine = {
    HISTORY_MODE,
    'process.env': {
        'NODE_ENV' : JSON.stringify(NODE_ENV)
    },
    __PROD__: NODE_ENV === 'production',
    DEBUG: process.env.DEBUG,
    DIST,
    BETA,
    DEMO
}

module.exports = config
