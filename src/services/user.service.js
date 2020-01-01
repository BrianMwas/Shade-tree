import axios from './api';

export const userService = {
    getAllAgents,
    getSingleAgent,
    addAgentReview,
  	addUserProfile
}

const baseUrl = "http://localhost:8500/api/v1/"
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

function buildUrl(url) {
    return baseUrl + url;
}

function getAllAgents() {
	let url = buildUrl('users/agents')
	return axios.get(url, config)
}

function getSingleAgent(agentId) {
	let url = buildUrl(`users/agents/${agentId}`);
	return axios.get(url, config);
}

function addAgentReview(agentId, review) {
	let rJson = JSON.stringify(review);
	let url = buildUrl(`users/agents/${agentId}`);
	return axios.post(url, rJson, config)
}

function addUserProfile(userData) {
	let url = buildUrl('auth/create-profile')
	let userProfile = JSON.stringify(userData)
	return axios.post(url, userProfile, config)
}