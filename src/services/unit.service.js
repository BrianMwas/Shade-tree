import axios from 'axios';
const baseUrl = process.env.VUE_API_URL
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
    return axios.get(url, {
        headers: {}
    })
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


async function addUnitImages(companySlug, unitId, file) {
    let url = await buildUrl(`company/${companySlug}/units/${unitId}/images`);
    let formData = new FormData()
    formData.append(file, "images");
    let config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, formData, config);
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


function getUnitsByCategory(category) {
    let url = buildUrl(`units-search?category=${category}`);
    return axios.get(url, config);
}



export const unitService =  {
    addNewUnit,
    getAllUnits,
    getUnitsByCategory,
    updateUnit,
    addUnitReview,
    getSingleUnit,
    getUnitReviews,
    getUnitLocation,
    addUnitImages,
    deleteUnit
}
