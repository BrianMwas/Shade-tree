
import axios from 'axios'

export const profileService = {
	addUserProfile,
	updateUserProfile,
	addUserProfileImage,
	getUserProfile,
	addCompanyProfile,
	updateCompanyProfile,
	getCompanyProfile,
	getMessagesFromMe,
	getMessagesToMe,
	sendMessage,
	deleteMessage
}

const baseUrl = process.env.VUE_API_URL


function buildUrl(url) {
	return baseUrl + url
}

const config = {
	headers: {
		'Content-Type' : 'application/json'
	}
}

async function addUserProfile(userId, data) {
	let url = await buildUrl('user/create-profile'+userId);
	return axios.post(url, data, config);
}

function updateUserProfile(userId, data) {
	let url = buildUrl('user/profileUpdate');
}


async function getMessagesToMe(userId) {
	let url = await buildUrl(`user/messages/toMe?to=${userId}&date=${date}`);
	return axios.get(url, config);
}

async function getMessagesFromMe(userId) {
	let url = await buildUrl(`user/messages/fromMe?from=${userId}&date=${date}`);
	return axios.get(url, config)
}

async function sendMessage(from, to, message) {
	let url = await buildUrl(`user/messages/send?from=${from}&to=${to}`);
	return axios.post(url, message, config);
}

function addUserProfileImage(userId, file) {
	let url = buildUrl(`user/${userId}`);
	let formData = new FormData();
	formData.append(file, "image")
	let config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	}
	return axios.post(url, formData, config)
}


async function deleteMessage(message) {
	let url = await buildUrl(`user/message/delete?message=${message}`);
	return axios.delete(url, config);
}

async function getUserProfile(userId) {
	let url = await buildUrl(`user/${userId}/profile`);
	return axios.get(url, config);

}

async function getCompanyProfile(companySlug) {
	let url = await buildUrl(`companies/profile/${companySlug}`);
	return axios.get(url, config);
}

async function addCompanyProfile(companySlug, data) {
	let url = await buildUrl(`company/${companySlug}/add-profile`);
	return axios.post(url, data, config)
}

function updateCompanyProfile(slug, data) {
	let url = buildUrl(`companies/profiles/${slug}`);
	return axios.put(url, data, config)
}
