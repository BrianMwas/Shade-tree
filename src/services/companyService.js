import axios from 'axios';

const config = {
	headers : {
		'Content-Type': 'application/json'
	}
}

const baseUrl = process.env.VUE_API_URL


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


async function addCompanyAgents(companySlug, agent) {
	let url = await buildUrl(`companies/${companySlug}/addAgents`);
	console.log("url", url)
	return axios.post(url, agent, {
		headers: {

		}
	});
}


async function removeAgents(companySlug, agent) {
	let burl = await buildUrl(`companies/${companySlug}/removeAgents`)
	return axios.post(burl, agent, config)
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
