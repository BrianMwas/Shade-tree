
import { adminService } from '../../services/admin'
import { userService } from '../../services/user.service'
const MAX_RANDOM_NUM = 20;

const admin = {
	namespaced: true,
	state: {
		totalAgents: 0,
		totalCompanies: 0,
		totalBlogs: 0,
		totalUsers: 0,
		totalEstates : 0,
		companies: {},
		agents: {},
	},
	mutations: {
		set_totalAgents(state, agents) {
			state.totalAgents = agents
		},
		set_totalUsers(state, users) {
			state.totalUsers = users
		},
		set_totalCompanies(state, companies) {
			state.totalCompanies = companies
		},
		set_totalEstates(state, estates) {
			state.totalEstates = estates;
		}
	},
	actions: {
		getNoOfUsers({dispatch, commit}) {
			adminService.getTotalUsers()
			.then(response => {
				console.log("yes", response.data.data)
				commit('set_totalUsers', response.data.data)
			})
			.catch(error => {
				dispatch('alert/errorAlert', 
					{
						mKey: Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM)),
						message: error,
						stage: true,
						type: "error"
					},
					{
						root: true
					})
				console.log("error", error.response)
			})
		},
		getNoOfCompanies({dispatch, commit}) {
			adminService.getTotalCompanies()
			.then(total => {
				if(total.data.message) {
					dispatch('alert/errorAlert', 
						{
							mKey: Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM)),
							message: total.data.message,
							stage: true,
							type: "info"
						}, 
						{
							root: true
						})
				}
				commit('set_totalCompanies', total.data.data)
				console.log("error", error.response)
			})
			.catch(error => {
				dispatch('alert/errorAlert',
				{
					mKey: Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM)),
					message: error,
					type: 'error',
					stage: true
				},
				{
					root: true
				})
				console.log("error", error.response)

			})
		},
		getNoOfAgents({dispatch, commit}) {
			console.log("this is all agents")
			adminService.getTotalAgents()
			.then(total => {
				if(total.data.message) {
					dispatch('alert/errorAlert', 
						{
							mKey: Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM)),
							message: total.data.message,
							stage: true,
							type: "info"
						}, 
						{
							root: true
						})
				}
				console.log("total", total)
				commit('set_totalAgents', total.data.data)
			})
			.catch(error => {
				dispatch('alert/errorAlert',
				{
					mKey: Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM)),
					message: error.response.message,
					type: 'error',
					stage: true
				},
				{
					root: true
				})

				console.log("error", error.response)
			})
		},
		getNoOfEstates({dispatch, commit}) {
			adminService.totalEstates()
			.then(total => {
				if(total.data.message) {
					dispatch('alert/errorAlert', 
						{
							mKey: Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM)),
							message: total.data.message,
							stage: true,
							type: "info"
						}, 
						{
							root: true
						})
				}
				commit('set_totalEstates', total.data.data)
				console.log("error", error.response)

			})
			.catch(error => {
				dispatch('alert/errorAlert',
				{
					mKey: Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM)),
					message: error,
					type: 'error',
					stage: true
				},
				{
					root: true
				})
				console.log("error", error.response)

			})
		},
	},
	getters: {
		totalAgents :state => state.totalAgents,
		totalUsers: state =>  state.totalUsers,
		totalCompanies: state =>  state.totalCompanies,
		totalEstates: state => state.totalEstates
	},
}

export default admin;