import  { authService } from '../../services/auth.service';
import router from '../../router/index'

const auth = {
  namespaced: true,
  store: {
    user: null,
    status: '',
    loggedIn: false
  },
  mutations: {
    login_request(state) {
      state.status = 'loggingIn';
    },
    login_success(state, user) {
      state.status = 'success'
      state.user = user;
      state.loggedIn = true;
    },
    login_error(state) {
      state.status = 'error';
      state.loggedIn = false;
      state.user = null;
    },
    register_request(state) {
      state.status = 'registering';
    },
    register_success(state, user) {
      state.status = '';
    },
    register_failure(state, error) {
      state.status = '';
    },
    logout(state) {
      state.status = '';
      state.user = null;
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      // return new Promise((resolve, reject) => {
      //   commit('auth_request')
      //   axios(false).post('/signin', user).then(res => {
      //     const user = res.user;
      //     commit('auth_success', user);
      //     resolve(res)
      //   }).catch(err => {
      //     commit('auth_error');
      //     reject(err);
      //   })
      // })
      commit('login_request')
      authService.login(email, password).then(user => {
        commit('login_success', user);
        router.push('/dashboard');
      })
    },
    register ({ dispatch, commit }, user) {
      // return new Promise((resolve, reject) => {
      //   commit('auth_request')
      //   axios(false).post('/register', user).then(res => {
      //     commit('auth_success');
      //     resolve(res);
      //   }).catch(err => {
      //     commit('auth_error', err);
      //     reject(err)
      //   })
      // })
      commit('register_request', user);
      authService.register(user).then(res => {
        commit('register_success', res);
        router.push('/login')
        setTimeout(() => {
          dispatch('alert/success', res.message, { root: true })
        })
      }).catch(err => {
        commit('register_failure', err);
        dispatch('alert/error', err, { root: true })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        axios(true).get('/logout').then(res => {
          commit('logout')
          resolve();
        }).catch(err => {
          reject();
        })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    authStatus: state => !!state.status
  }
}

export default auth
