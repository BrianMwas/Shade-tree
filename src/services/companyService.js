import axios from 'axios';

const config = {
	headers : {
		'Content-Type': 'application/json'
	}
}

const baseUrl = "http://localhost:8500/api/v1/"


function buildUrl(url) {
    return baseUrl + url;
}

function getAllCompanies() {
	let url = buildUrl('companies');
	return axios.get(url, config);
}


function getCompanyByQuery(query) {
	let url = buildUrl(`companies/searchQ?${query}`) 
	return axios.get(url, config);
}


function getCompanyBySlug(slug) {
	let url = buildUrl(`company/${slug}`);
	return axios.get(url, config);
}


function getCompanyById(companyId) {
	let url = buildUrl(`company/${companyId}`);
	return axios.get(url, config);
}

function addCompany(data) {
	let url = buildUrl("companies/create");
	return axios.post(url, data, config);
}

function updateCompany(companyId, data) {	
	let url = buildUrl(`company/${companyId}`);
	return axios.put(url, data, config);
}


function addCompanyAgents(slug, agentId) {
	let url = buildUrl(`companies/${slug}/addAgents`);
	return axios.post(url, agentId, config);
}


function removeAgents(companySlug, agentId) {
	let burl = buildUrl(`companies/${companySlug}/removeAgents`)
	return axios.post(burl, agentId, config)
}

export const companyService = {
	getAllCompanies,
	getCompanyByQuery,
	getCompanyById,
	getCompanyBySlug,
	addCompany,
	addCompanyAgents,
	removeAgents,
	updateCompany
}