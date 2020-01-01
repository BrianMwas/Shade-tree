// import axios from './api'
import axios from 'axios'
const baseUrl = "http://localhost:8500/api/v1/"
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

function buildUrl(url) {
    return baseUrl + url;
}

function login(email, password) {
    const body = JSON.stringify({email, password});
    let url = buildUrl('auth/signin')
    return axios.post(url, body, config)
}

function logout() {
    let url = buildUrl('auth/signout')
   return axios.get(url, config)
}


function register(userData) {
    let data = JSON.stringify(userData)
    let url = buildUrl(`auth/register?userType=${data.userType}`)
   return axios.post(url, data, config)
}

export const authService = {
    login,
    logout,
    register
}