import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SingleUnit from '../views/SingleUnit.vue'
import Units from '../views/Units.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Products from '../views/Products.vue'
import Maps from '../views/Map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashBoard'),
    meta: {
      requiresAuth: true
    }
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
    path: '/map',
    name: 'Maps',
    component: Maps
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'single-product',
    component: Products
  },
  {
    path: '/blogs',
    name: 'Blog',
    component: () => import('../views/Blog')
  },
  {
    path: '/blogs/:slug',
    name: 'single-blog',
    component: () => import('../views/Blog')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
