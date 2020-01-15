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


function getUnitsTotal () {
    let url = buildUrl('units/total')
    return axios.get(url, config)
}


function getAllUnits(sortBy, pageNumber) {
    if(sortBy == undefined) {
        sortBy = 'createdAt'
    } 
    if(pageNumber == undefined) {
        pageNumber = 1
    }
    const url = buildUrl(`units?sortBy=${sortBy}&pageNumber=${pageNumber}`)

	return axios.get(url, config);
}


async function getSingleUnit(unitId) {
    let url = await buildUrl(`units/${unitId}`)
    return axios.get(url, config)
}


 function addNewUnit(companySlug, data) {
	
    let url = buildUrl(`company/${companySlug}/new-unit`);
    console.log("the data", data);
    console.log("the other info", url)
	return axios.post(url, data, config)
}

async function updateUnit(unitId, data) {
    let url = await  buildUrl(`units/${unitId}`);
    return axios.patch(url, data, config)
}


async function addUnitImages(companySlug, unitId, images) {
    let url = await buildUrl(`company/:companySlug/units/:unitId/images`);
    return axios.post(url, images, config)
}

async function addUnitReview(unitId, data) {
    let url = await buildUrl(`units/${unitId}/reviews`);
    return axios.post(url, data, config)
}


async function getUnitReviews(unitId) {
    let url = await buildUrl(`reviews/${unitId}`);
    return axios.get(url, config)
}

async function getUnitLocation(userId) {
    let url = await buildUrl(`auth/users/${userId}/units/location`);
    return axios.get(url, config)
}

function deleteUnit(unitId) {
    let url = buildUrl(`units/delete/${unitId}`);
    return axios.patch(url, config)
}



export const unitService =  {
    addNewUnit,
    getAllUnits,
    updateUnit,
    addUnitReview,
    getSingleUnit,
    getUnitReviews,
    getUnitLocation,
    addUnitImages,
    deleteUnit
}