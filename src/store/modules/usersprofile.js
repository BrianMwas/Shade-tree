
// This is supposed to deal with profile and agents.
import {P_UPDATE_REQUEST, N_PROFILE_REQUEST, N_PROFILE_SUCCESS, N_PROFILE_ERROR, P_UPDATE_SUCCESS, P_UPDATE_ERROR } from '../mutation-types';
const users = {
	namespaced: true,
	state: {
		userprofile: {},
		userInfo: null
	},
	mutations: {},
	actions: {},
	getters: {}
}


export default users;
