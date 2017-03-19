import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// create router
let routerConfig = {
  linkActiveClass: 's-current'
}
if(window.HISTORY_MODE) {
  routerConfig.root = window.HISTORY_MODE_ROOT || '/'
  routerConfig.history = true
  // routerConfig.saveScrollPosition = true
}
routerConfig.routes = [{
  path: '/',
  component: require('./views/Home.vue'),
  name: 'home'
}, {
  path: '/about',
  component: require('./views/About.vue'),
  name: 'about'
}, {
  path: '/contact',
  component: require('./views/Contact.vue'),
  name: 'contact'
}, {
  path: '/post/:detailId',
  component: require('./views/PostDetail.vue'),
  name: 'post-detail'
}, {
  path: '*',
  redirect: '/'
}]
const router = new VueRouter(routerConfig)

export default router
