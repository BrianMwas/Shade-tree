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


async function register(userType, userData) {
    let data = JSON.stringify(userData)
    let url = await buildUrl(`auth/register?userType=${userType}`)
   return axios.post(url, data, config)
}

function changePasswordRequest(email) {
    let url = buildUrl('auth/change-password');
    const body = JSON.stringify({email})
    console.log("email", body);
    return axios.post(url, body, config)
}


function replaceForgotPassword(token, newPassword, repeatPassword) {
    let url = buildUrl('auth/forgot-password/' + token);
    let data = JSON.stringify({ newPassword, repeatPassword });
    return axios.post(url, data, config);
}


function changeOldPasswordWithNew(oldPassword, newPassword, repeatPassword) {
    let url = buildUrl("auth/change-password")
    let data = JSON.stringify({oldPassword, newPassword, repeatPassword})
    return axios.post(url, data, config)
}

export const authService = {
    login,
    logout,
    register,
    changePasswordRequest,
    replaceForgotPassword,
    changeOldPasswordWithNew
}