import axios from 'axios';
const baseUrl = "http://localhost:8500/api/v1/"
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8080'
    }
}

function buildUrl(url) {
    return baseUrl + url;
}

function getAllUnits() {
	const url = buildUrl('units')

	return axios.get(url, config);
}


function addNewUnit(data) {
	let body = JSON.stringify(data);
	let url = buildUrl('addNewUnit');
	return axios.post(url, body, config);
}
