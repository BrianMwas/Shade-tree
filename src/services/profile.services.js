
import axios from 'axios'

export const profileService = {
	addUserProfile,
	updateUserProfile,
	getUserProfile,
	addCompanyProfile,
	updateCompanyProfile,
	getCompanyProfile
}

const baseUrl = "http://localhost:8500/api/v1/"


function buildUrl(url) {
	return baseUrl + url
}

const config = {
	headers: {
		'Content-Type' : 'application/json'
	}
}

async function addUserProfile(data) {
	let url = await buildUrl('user/create-profile');
	let userId = window.$cookies.get('user')._id;
	return axios.post(data);
}

function updateUserProfile() {

}

async function getUserProfile(userId) {
	let url = await buildUrl(`user/${userId}/profile`);
	return axios.get(url, config);
}

function getCompanyProfile() {

}

async function addCompanyProfile(companySlug, data) {
	let url = await buildUrl(`company/${companySlug}/add-profile`);
	return axios.post(url, data, config)
}

function updateCompanyProfile() {

}
