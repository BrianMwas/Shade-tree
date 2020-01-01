import  { authService } from '../../services/auth.service';
import router from '../../router/index';
import axios from 'axios';
const MAX_RANDOM_NUM = 20;

// const stateInit = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }
function getRandomInt () {
  return Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM))
}


const auth = {
  namespaced: true,
  state: {
    status: {
      loggedIn: null
    },
    user: {}
  },
  actions: {
    loginUser({ dispatch, commit }, { email, password }) {
      if (!window.$cookies.isKey("user")) {

        commit('loginRequest');

        authService.login(email, password).then(user => {
              //not logged in, create cookie based on username
              // this.$cookies.set('user', user, '24h');
              //save username in store by committing a mutation
              window.$cookies.set('user', user.data)
              commit('loginSuccess', window.$cookies.get('user'));

              router.push('/dashboard')
              setTimeout(() => {
                 dispatch('alert/successAlert', { mKey: getRandomInt(), message : `Welcome to Shade tree ${user.data.username}`, type : 'success'}, { root: true })
             }, 1000)
          
          
        }).catch(error => {
          let errorMessage = error.response.data.message;
          commit('loginFailure', errorMessage);
          if(errorMessage) {
            dispatch('alert/errorAlert', { mKey: getRandomInt(), message: errorMessage, type: 'warning' }, { root: true });
          } else {
            dispatch('alert/errorAlert', { mKey: getRandomInt(), message: error, type: 'warning' }, { root: true });
          }
        })
      }
    },
    logOutUser({ commit }) {
      if(!window.$cookies.isKey('user')) {
        dispatch('alert/errorAlert', { mKey: getRandomInt(), message: "You are not logged In", type: 'warning' }, { root: true })
      } else {
        authService.logout();
      //remove cookie
        router.push('/')

        $cookies.remove('user')
        commit('logout')
      }
      
    },
    registerUser({ dispatch, commit }, user) {
      commit('registerRequest', user)


      authService.register(user)
      .then(user => {
        commit('registerSuccess');
        router.push('/login')

        setTimeout(() => {
          dispatch('alert/successAlert', { mKey: getRandomInt(), message: 'Registration successful', type: 'success' }, { root: true })
        }, 1000)
      })
      .catch(error => {
        let errorMessage = error.response.data.message

        commit('registerFailure', errorMessage);
        console.log("Reg fail", error.response)
        if(errorMessage) {
          dispatch('alert/errorAlert', { mKey: getRandomInt(), message: errorMessage, type: 'info' }, { root: true });
        } else {
          dispatch('alert/errorAlert', { mKey: getRandomInt(), message: error, type: 'warning' }, { root: true });
        }
      })
    }
  },
  mutations: {
    loginRequest(state) {
      state.status = { loggingIn: true }
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true },
      state.user = user
      // state.user = user
    },
    loginFailure(state) {
      state.status = {},
      state.user = null
    },
    logout(state) {
      state.status = {
        loggedIn: false
      };
      state.user = null
    },
    registerRequest(state) {
      state.status = { registering: true };
    },
    registerSuccess(state, user) {
      state.status = {};
    },
    registerFailure(state, error) {
      state.status = {};
    }
  }, 
  getters: {
    loggedInUser: state => window.$cookies.get('user'),
    loggedInUserType: state => window.$cookies.get('user').roles[0],
    loggedIn: state => window.$cookies.isKey('user')
  }
}

export default auth
