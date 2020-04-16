import Vue from 'vue'
import Vuex from 'vuex'
import modulesCache from './modules'


Vue.use(Vuex)
const store =  new Vuex.Store({
	strict: process.env.BASE_URL.NODE_ENV !== 'production',
  	modules: modulesCache
});


for (const moduleName of Object.keys(modulesCache)) {
	if(modulesCache[moduleName].actions && modulesCache[moduleName].actions.init) {
		store.dispatch(`${moduleName}/init`)
	}
}

export default store
