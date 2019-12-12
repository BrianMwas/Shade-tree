import Vue from 'vue'
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconFont: 'mdi'
  },
  theme: {
    options: {
      customProperties: true
    }
  }
})
