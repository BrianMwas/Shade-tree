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

function getAllEstates() {

}

function addEstate() {

}

function deleteEstate() {

}

function updateEstate() {

}

function getEstateById() {

}

function getTotalEstates() {

}

function estateByQuery() {

}

function estateLocation() {

}

function estateBySlug() {

}

function addEstateImage() {

}


export const estateService = {
	getAllEstates,
	getEstateById,
	addEstate,
	updateEstate,
	deleteEstate,
	getTotalEstates
}