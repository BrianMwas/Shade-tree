import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import unit from './modules/unit'
import product from './modules/product'
import blog from './modules/blog'
import alert from './modules/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    alert: alert,
    blog: blog,
    unit: unit,
    product: product
  }
})
