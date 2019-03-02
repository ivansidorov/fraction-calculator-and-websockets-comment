import Vue from 'vue'
import Router from 'vue-router'
import Comments from './views/Comments.vue'
import FractionCalc from './views/FractionCalc.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: FractionCalc
    },
    {
      path: '/comments',
      name: 'comments',
      component: Comments
    },
    {
      path: '/fraction-calculator',
      name: 'FractionCalc',
      component: FractionCalc
    }
  ]
})
