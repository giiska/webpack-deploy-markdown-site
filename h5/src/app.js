import Vue from 'vue'

import { EventEmitter } from 'events'
window.eventBus = new EventEmitter()

import router from './router'

// 并没什么用
import './dev-before'

import 'classlist-polyfill'

document.ontouchmove = function(e) {e.preventDefault()};
document.getElementById('app').ontouchmove = function(e) {e.stopPropagation()};
window.eventBus.on('stopPropagation', (el) => {
  el.ontouchmove = function(e) {e.stopPropagation()};
})
const App = require('./app.vue');
router.start(App, '#app');