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

        authService.login(email, password)
        .then(user => {
              //not logged in, create cookie based on username
              // this.$cookies.set('user', user, '24h');
              //save username in store by committing a mutation
            window.$cookies.set('user', user.data, '1d')

            commit('loginSuccess', window.$cookies.get('user'));
            //For alerting the user once loggedIn
            dispatch('alert/successAlert', 
              { 
                mKey: getRandomInt(), 
                message : `Welcome to Shade tree ${user.data.username}`, 
                type : 'success'}, 
                { root: true })
            Promise.all([
              dispatch('profile/initProfile', null, { root: true }),
              router.push('/dashboard')
            ])

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
        $cookies.remove('userProfile')
        commit('logout')
      }
      
    },
    registerUser({ dispatch, commit }, data) {
      commit('registerRequest')
  
      let userType = data.userType;
      delete data.userType;
      
      
      authService.register(userType, data)
      .then(user => {
        commit('registerSuccess');
        
        router.push('/login')
        setTimeout(() => {
          dispatch('alert/successAlert', { mKey: getRandomInt(), message: `${user.data.message}`, type: 'success' }, { root: true })
        }, 1000)
      })
      .catch(error => {
      
        commit('registerFailure');
        console.log("Reg fail", error.response)
        if (error.response.data.message) {
          let errorMessage = error.response.data.message;
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
    registerSuccess(state) {
      state.status = {};
    },
    registerFailure(state) {
      state.status = {};
    }
  }, 
  getters: {
    loggedInUser: state => window.$cookies.get('user'),
    loggedInUserType: (state, getters) => {
      let user = getters.loggedInUser
      if(user) {
        return user.roles[0]
      } else {
        return null
      }
    },
    logged: state => window.$cookies.isKey('user')
  }
}

export default auth
