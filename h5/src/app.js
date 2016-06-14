import Vue from 'vue'

import { EventEmitter } from 'events'
window.eventBus = new EventEmitter()

import router from './router'

// 并没什么用
// import './dev-before'

import 'classlist-polyfill'

const App = require('./app.vue');
router.start(App, '#app');