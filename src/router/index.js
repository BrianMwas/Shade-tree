import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SingleUnit from '../views/SingleUnit.vue'
import Units from '../views/Units.vue'
import Authentication from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/units',
    name: 'units',
    component: Units
  },
  {
    path: '/single-unit',
    name: 'single-unit',
    component: SingleUnit
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: Authentication
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
