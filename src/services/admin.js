import axios from 'axios';

const baseUrl = "http://localhost:8500/api/v1/"
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

function buildUrl(url) {
    return baseUrl + url;
}



function getTotalAgentsActivated() {
	let url = buildUrl('agents/total-activated');

	return axios.get(url, config);
}


function getTotalAgents() {
	let url = buildUrl('agents/total');
	return axios.get(url, config);
}


function getTotalCompanies() {
	let url = buildUrl('allcompanies/total');

	return axios.get(url, config);
}



function getTotalUsers() {
	let url = buildUrl('allusers/total');

	return axios.get(url, config)
}

function totalUnits() {
	let url = buildUrl('allunits/total')
	return axios.get(url, config)
}

function totalEstates() {
	let url = buildUrl('allestates/total');
	return axios.get(url, config)
}


export const adminService = {
	getTotalUsers,
	getTotalCompanies,
	totalEstates,
	totalUnits,
	getTotalAgents
}