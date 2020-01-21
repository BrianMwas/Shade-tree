import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies'
import VueFuse from "vue-fuse";
import VueAnalytics from "vue-analytics";

import './plugins';

// Vue.use(VueAnalytics, {
//   id: "",
//   router,
//   ignoreRoutes: ["/"],
//   autoTracking: {
//     screenview: true
//   }
// })


// Validation
Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VueFuse)
Vue.$cookies.config('30d');

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
