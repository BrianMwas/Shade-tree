import axios from './api'

function login(email, password) {
    const body = JSON.stringify({email, password});
    return axios(false).post('/login', body)
}

function logout() {
   return axios(true).get('/logout')
}


function register(user) {
   return axios(false).post('/register', user)
}

export const authService = {
    login,
    logout,
    register
}