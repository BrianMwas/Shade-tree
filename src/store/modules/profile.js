
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
		thumbnailURL: null,
		currentUserProfile: null,
		settingUserProfile: null,
		settingUserProfileFail: null,
		savingUnit: null,
		savingUnitFail: null,
		deleteAllSavedUnitRequest: null,
		deleteAllSavedUnitSuccess: null,
		deleteAllSavedUnitFail: null,
		deleteOneSavedUnitRequest: null,
		deleteOneSavedUnitSuccess: null,
		deleteOneSavedUnitFail: null,
		messages: {},
		sendMessagetoClientRequest: null,
		sendMessagetoClientFail: null
	},
	mutations: {
		set_currentUserProfileRequest(state) {
			state.settingUserProfile = true
		},
		set_currentUserProfileSuccess(state, profile) {
			state.currentUserProfile = profile
			state.settingUserProfile = false
			state.settingUserProfileFail = false
		},
		set_currentUserProfileFail(state) {
			state.currentUserProfile = null
			state.settingUserProfile = false
			state.settingUserProfileFail = true
		},
		setUserThumbnail(state, url) {
			state.thumnailURL = url;
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
		},
		setClientsMessageRequest(state) {
			state.sendMessagetoClientRequest = true
		},
		setClientMessagesSuccess(state, messages) {
			state.messages['client'].push(messages)
			state.sendMessagetoClientRequest = false
			state.sendMessagetoClientFail = false
		},
		setClientMessagesFail(state, error) {
			state.sendMessagetoClientRequest = false;
			state.sendMessagetoClientFail = true;
		},
		setSendMessageRequest(state) {
			state.sendMessageRequest = true
		},
		setSendMessagesSuccess(state, messages) {
			[...state.messages['sent'], messages]
			state.sendMessageRequest = false
			state.sendMessageFail = false
		},
		setSendMessagesFail(state, error) {
			state.sendMessageRequest = false;
			state.sendMessageFail = true;
		}
	},
	actions: {
		initClientMessages({commit}) {
			let userId = window.$cookies.get('user')._id;

				profileService.getMessagesToMe(userId)
				.then(messages => {
					
					commit('setClientMessagesSuccess', messages.data.data)
				})
				.catch(error => {
					commit('setClientMessagesFail')
				})
		},
		initSentMessages({ commit }) {
			let userId = window.$cookies.get('user')._id;

				profileService.getMessagesFromMe(userId)
					.then(messages => {
						if(messages.message) {
							return;
						}
						commit('setSentMessagesSuccess', messages.data.data)
					})
					.catch(error => {
						commit('setSentMessagesFail', error)
					})
			
		},
		 initProfile({ commit }) {
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
		sendMessage({ dispatch, commit }, data) {
			let userId = window.$cookies.get('user')._id
			commit('setSendMessageRequest')
			profileService.sendMessage(userId, data.to, data.message)
			.then(response => {
				commit('setSendMessagesSuccess', response.data.data);
				dispatch('alert/successAlert', {
					mKey: getRandomInt(),
					message: "Message sent Succcessfully",
					type: 'success',
					stage: true
				})
			})
			.catch(error => {
				commit('setSendMessagesFail')
				dispatch('alert/errorAlert', {
					mKey: getRandomInt(),
					message: error,
					type: "error",
					stage: true
				}, { root: true })
			})
		},
		setUserProfileImage({ commit, dispatch }, payload) {
			profileService.addUserProfileImage(payload.userId, payload.file)
			.then(results => {
				if(results.data.message) {
					dispatch('alert/errorAlert', { mKey: getRandomInt(), message: results.data.message, type: 'error', stage: true, duration: 10000 }, { root: true })
				}
				commit("setUserThumbnail", results.data.data.url);
			})
			.catch(error => {
				commit('set_currentUserProfileFail');
				dispatch('alert/errorAlert', { mKey: getRandomInt(), message: error, type: 'error', stage: true, duration: 10000 }, { root: true })
			})
		},
		setUserProfile({dispatch, commit}, data) {
			commit('set_currentUserProfileRequest')
			profileService.addUserProfile(data)
			.then(profile => {
				commit('set_currentUserProfileSuccess', profile);
				dispatch('alert/success', { mKey: getRandomInt(), message: "Profile set was successful", type: 'success', stage: true, duration: 10000 }, {root: true})
			})
			.catch(error => {
				commit('set_currentUserProfileFail');
				dispatch('alert/errorAlert', { mKey: getRandomInt(), message: error, type: 'error', stage: true, duration: 10000 }, {root: true})
			})
		},
		updateUserProfile({ commit }, payload) { 
			profileService.updateProfile(payload.userId, payload.data)
			.then(results => {

			})
			.catch(error => {

			})
		},
		setCompanyProfile({dispatch, commit}, data) {
			commit('set_companyProfileRequest')
			profileService.addCompanyProfile(data.companySlug, data)
			.then(companyProfile => {
				commit('set_companyProfileSuccess', companyProfile);
				dispatch('alert/successAlert', { mKey: getRandomInt(), message: "Successfully added company profile image", type: 'success', stage: true }, { root: true })
			})
			.catch(error => {
				dispatch('alert/errorAlert', { mKey: getRandomInt(), message: error, type: error.response, stage: true })
			})
		}
	},
	getters: {
		userProfile: state => window.$cookies.get('userProfile')
	},
}


export default profile
