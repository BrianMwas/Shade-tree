import { unitService } from '../../services/unit.service';
import router from '../../router/index';

const MAX_RANDOM_INT = 20

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(MAX_RANDOM_INT));
}


function removeAt(arr, i) {
    arr.splice(i, 1)
}

function addAt(index, items) {
    arr.splice(index, 0, items)
}

const unit = {
    namespaced: true,
    state: {
        units: [],
        unit: {},
        gettingUnits: null,
        failedToGetUnits: null,
        reviews: {},
        addUnitRequest : null,
        addUnitFail: null,
        addUnitReviewRequest: null,
        addUnitReviewFail: null,
        getUnitReviewRequest: null,
        getUnitRequest: null,
        getUnitFail: null,
        deleteUnit : null,
        deleteUnitFail : null,
        updateUnitFail: null,
        updatingUnit: null
    },
    mutations: {
        setUnitFail(state) {
            state.failedToGetUnits = true
        },
        setUnitsSuccess(state, units) {
            state.units = units;
            state.gettingUnits = false;
            state.failedToGetUnits=  false;
        },
        setUnitRequest(state) {
            state.gettingUnits = true
        },
        addUnitRequest(state) {
            state.addUnitRequest = true
        },
        addUnitSuccess(state, unit) {
            state.units.push(unit)
            state.addUnitRequest = false;
            state.addUnitFail = false
        },
        addUnitFail(state) {
            state.addUnitFail= true
        },
        getSingleUnitRequest(state) {
            state.getUnitRequest = true
        },
        getSingleUnitFail(state) {
            state.singleUnit = {};
            state.getUnitRequest = false
        },
        getSingleUnitSuccess(state) {
            state.unit = state;
            state.getUnitFail = false;
            state.getUnitRequest = false
        },
        updateUnitRequest(state) {
            state.updatingUnit = true;
        },
        async updateUnitSuccess(state, unitUpdate) {
            state.updatingUnit = false;
            let index = state.units['units'].indexOf(state.units['units'].filter(unit => unit._id == unitUpdate._id))
            await removeAt(state.units['units'], index);
            await addAt(index, unitUpdate)
        },
        updateUnitFail (state) {
            state.updateUnitFail = true
        },
        deleteUnitRequest (state) {
            state.deletingUnit = true
        },
        deleteUnitSuccessful(state, unitId) {
            state.deletingUnit = false
            state.deleteUnitFail = false

            let i = state.units['units'].indexOf(state.units['units'].filter(unit => unit._id == unitId));
            removeAt(state.units['units'], i)
        },
        deleteUnitFail (state) {
            state.deleteUnitFail = true
        }
    },
    actions: {
    	init({ state, commit }, sortBy, pageNumber) {
            commit('setUnitRequest');
            unitService.getAllUnits(sortBy, pageNumber)
            .then(response => {
                console.log("Get all units success", response.data.data)
                commit('setUnitsSuccess', response.data.data)
            })
            .catch(error => {
                console.log("Error from getting units", error)
                commit('setUnitFail')
            })
        },
        getUnitById({ commit }, unitId) {
            commit('getSingleUnitRequest')
            unitService.getSingleUnit(unitId)
            .then(response => {
                commit('getSingleUnitSuccess', response.data.data)
            })
            .catch(error => {
                console.log("Get Single iunit error", error)
                commit('getSingleUnitFail')
            })
        },
        newUnitAdd({ dispatch, commit }, data) {
            commit('addUnitRequest')
           unitService.addNewUnit(data.url, data.info)
            .then(response => {
                dispatch('alert/successAlert', 
                    {
                        mKey: getRandomInt(),
                        message: "Successfully added the unit",
                        type: 'success',
                        stage: 'within'
                    },
                    { 
                        root: true 
                    }
                )
                console.log("yes we can", response.data)
                router.push("/dashboard")
            })
            .catch(error => {
                commit('addUnitFail')
                console.log("error", error)
                dispatch('alert/errorAlert',
                {
                    mKey: getRandomInt(),
                    message: error.response,
                    type: 'error'
                }, 
                {
                    root: true
                }
                )
            })
        },
        updateUnit({ dispatch, commit }, unitId, data) {
            commit('updateUnitRequest')
            unitService.updateUnit(unitId, data)
            .then(response => {
                commit('updateUnitSuccess', response.data.data)
                dispatch('alert/successAlert',
                {
                    mKey: getRandomInt(),
                    message: "Successfully updated the unit",
                    type: "success",
                    stage: "within"
                }, 
                {
                    root: true
                })
            })
            .catch(error => {
                dispatch('alert/errorAlert',
                {
                    mKey: getRandomInt(),
                    message: error,
                    type: 'error'
                }, { root: true } )
            })
        },
        deleteUnit({ dispatch, commit }, unitId) {
            unitService.deleteUnit(unitId)
            .then(response => {
                commit('deleteUnitSuccessful', unitId);
                dispatch('alert/successAlert',
                {
                    mKey: getRandomInt(),
                    message: response.data.message,
                    type: "success",
                    stage: "within"
                },
                {
                    root: true
                }
                )
            })
            .catch(error => {
                dispatch('alert/errorAlert',
                {
                    mKey: getRandomInt(),
                    message: error,
                    type: "error",
                    stage: "within"
                }, 
                {
                    root: true
                })
            })
        }
    },
    getters: {

    }
}

export default unit
