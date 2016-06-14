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
const router = new VueRouter(routerConfig)
router.map({
  '/': {
    name: 'home',
    component: require('./components/Home.vue')
  },
  '/contact': {
    name: 'contact',
    component: require('./components/Contact.vue')
  },
  '/post/:detailId': {
    name: 'post-detail',
    component: require('./components/PostDetail.vue')
  }
});

// All elements are position absolute, no need to use window scroll.
// router.beforeEach(function (transition) {
//   window.scrollTo(0, 0)
  // transition.next()
// });


router.redirect({
  '*':'/'
})

export default router
