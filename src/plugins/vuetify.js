import Vue from 'vue'
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify)


// Custom icons.
import FilterIcon from "@/components/icons/Filter"

export default new Vuetify({
  icons: {
    iconFont: 'mdi',
    values: {
    	custom: {
    		component: FilterIcon
    	}
    }
  },
  theme: {
    options: {
      customProperties: true
    }
  }
})
