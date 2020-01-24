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
        unitsByQuery: [],
        savedUnits: [],
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
        updatingUnit: null,
        savingUnit: null
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
        saveUnitRequest(state) {
            state.savingUnit = true
        },

        saveUnitSuccess(state, unit) {
            state.savingUnit = false
            if(state.savedUnits.length <= 0) {
                state.savedUnits.push(unit);
                
                    window.$cookies.set("savedUnits", state.savedUnits)
                
            } else {
                for (var i = 0; i < state.savedUnits.length; i++) {
                    if(unit == state.savedUnits[i]) {
                        return
                    }
                }
                state.savedUnits.push(unit)
            }
        },
        removeSavedUnitRequest(state) {
            state.removingSavedUnit = true;
        },
        removeSavedUnitSuccess(state, unit) {
            state.removingSavedUnit = false;
            if(state.savedUnits.contains(unit)) {
                state.savedUnits.splice(
                state.savedUnits.indexOf(state.units.find(u._id == unit._id)), 1)
            } else {
                return;
            }
            
        },
        setUnitsByQuery(state, units) {
            state.unitsByQuery = units;
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
        getSingleUnitSuccess(state, unit) {
            state.unit = unit;
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
        saveUnit({ commit }, unit) {
            if(!window.$cookies.isKey("savedUnits")) {
                commit("saveUnitRequest");
                commit("saveUnitSuccess", unit);
            } else {
                commit("saveUnitSuccess", unit);
            }
        },
        removeSavedUnit({ commit }, unit) {
            commit("removeSavedUnitRequest");
            commit("removeSavedUnitSuccess", unit)
        },
        addUnitImage({ commit, dispatch }, data) {
            unitService.addUnitImages(data.companySlug, data.unitId, data.image)
            .then(response => {
                dispatch('alert/successAlert', {
                    mKey: getRandomInt(),
                    message: response.data.message,
                    type: 'success',
                    stage: true
                })

            })
            .catch(error => {
                dispatch('alert/errorAlert', {
                    mKey: getRandomInt(),
                    message: "Image add failed",
                    type: 'warning',
                    stage: true
                }, {root: true})
            })
        },
        unitsByCategory({commit, dispatch}, unitId) {
            unitService.getUnitsByCategory(category)
            .then(results => {
                if(results.data.message) {
                    dispatch('alert/successAlert', {
                    mKey: getRandomInt(),
                    message: response.data.message,
                    type: 'success',
                    stage: true
                    })
                }
                 commit("setUnitsByQuery", results.data.data)
            })
            .catch(error => {
                if(error.response) {
                        dispatch('alert/errorAlert', {
                            mKey: getRandomInt(),
                            message: error.response.data.message,
                            type: 'warning',
                            stage: true
                        }, {root: true})
                    }
                dispatch('alert/errorAlert', {
                    mKey: getRandomInt(),
                    message: "Failed to find units",
                    type: 'warning',
                    stage: true
                }, {root: true})
            })
        },
        getUnitById({ commit }, unitId) {
            commit('getSingleUnitRequest')
            unitService.getSingleUnit(unitId)
            .then(response => {
                console.log("this unit", response.data.data)
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
                console.log("error", error.response)
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
        singleUnit: state => state.unit,
        companySpecificUnits: (state) => (companyId) => {
            return state.units.results.find(unit => unit.company == companyId);
        }
    }
}

export default unit
