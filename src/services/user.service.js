import axios from 'axios';

export const userService = {
    getAllAgents,
    getSingleAgent,
    addAgentReview,
  	addUserProfile,
  	getTotalAgents,
  	getAllUsers
}


const baseUrl = process.env.VUE_API_URL
const config = {
	// withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
}

function buildUrl(url) {
    return baseUrl + url;
}

async function getTotalAgents() {
	let url = await buildUrl('agents/total')

	return axios.get(url, config)
}

function getAllUsers () {
	let url = buildUrl('allusers/total')
	return axios.get(url, config)
}


 async function getAllAgents() {
	let url = await buildUrl('users/agents')

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

function getTotalOwners() {
	let url = buildUrl('owners/total');
	return axios.get(url, config)
}

