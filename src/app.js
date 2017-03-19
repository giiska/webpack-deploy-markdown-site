import Vue from 'vue'

import { EventEmitter } from 'events'
import eventBus from './eventBus'

import router from './router'

// 并没什么用
// import './dev-before'

import 'classlist-polyfill'

document.ontouchmove = function(e) {e.preventDefault()}
document.getElementById('app').ontouchmove = function(e) {e.stopPropagation()}
eventBus.on('stopPropagation', (el) => {
  el.ontouchmove = function(e) {e.stopPropagation()}
})
const App = require('./app.vue')

const app = new Vue({
  router,
  ...App // Object spread copying everything from App.vue
}).$mount('#app')