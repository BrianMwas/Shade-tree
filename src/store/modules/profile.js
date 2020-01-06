
// This is supposed to deal with profile and agents.
import { profileService } from '../../services/profile.services';

function getRandomInt() {
	return Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM))
}

const profile = {
	namespaced: true,
	state: {
		savedUnits: {
		},
		currentUserProfile: null,
		settingUserProfile: null,
		savingUnit: null,
		savingUnitFail: null,
		deleteAllSavedUnitRequest: null,
		deleteAllSavedUnitSuccess: null,
		deleteAllSavedUnitFail: null,
		deleteOneSavedUnitRequest: null,
		deleteOneSavedUnitSuccess: null,
		deleteOneSavedUnitFail: null
	},
	mutations: {
		set_currentUserProfileRequest(state) {
			state.settingUserProfile = true
		},
		set_currentUserProfileSuccess(state, profile) {
			state.currentUserProfile = profile
			state.settingUserProfile = false
		},
		set_currentUserProfileFail(state) {
			state.currentUserProfile = null
			state.settingUserProfile = false
		},
		saveUnitRequest(state) {
			state.savingUnit = true
		},
		saveUnitSuccess(state, unit) {
			state.savedUnits['units'].push(unit)
		},
		saveUnitFail(state) {
			state.savingUnitFail = true
			state.saveUnitSuccess = false
		}
	},
	actions: {
		 initProfile({ state, commit }) {
			if(!window.$cookies.isKey('userProfile')) {
				commit('set_currentUserProfileRequest')
				let userId = window.$cookies.get('user')._id;
				 profileService.getUserProfile(userId)
				.then(userProfile => {
					console.log("User profile", userProfile.data.data)
					window.$cookies.set('userProfile', userProfile.data.data)
					commit('set_currentUserProfileSuccess', window.$cookies.get('userProfile'))
				})
				.catch(error => {
					commit('set_currentUserProfileFail')
				})
			}
		},
		setUserProfile({dispatch, commit}, data) {
			commit('set_currentUserProfileRequest')
			profileService.addUserProfile(data)
			.then(profile => {
				commit('set_currentUserProfileSuccess', profile);
				dispatch('alert/success', { mKey: getRandomInt(), message: "Profile set was successful", type: 'success', source: 'profile', duration: 10000 }, {root: true})
			})
			.catch(error => {
				commit('set_currentUserProfileFail');
				dispatch('alert/errorAlert', { mKey: getRandomInt(), message: error, type: 'error', source: 'profile', duration: 10000 }, {root: true})
			})
		},
		setCompanyProfile({dispatch, commit}, data) {
			commit('set_companyProfileRequest')
			profileService.addCompanyProfile(data.companySlug, data)
			.then(companyProfile => {
				commit('set_companyProfileSuccess', companyProfile);
				dispatch('alert/successAlert', { mKey: getRandomInt(), message: "Successfully added company profile image", type: 'success', source: 'profile' }, { root: true })
			})
			.catch(error => {
				dispatch('alert/errorAlert', { mKey: getRandomInt(), message: error, type: 'error', source: 'profile' })
			})
		}
	},
	getters: {
		userProfile: state => window.$cookies.get('userProfile')
	},
}


export default profile
