import { companyService } from '../../services/companyService';

const MATH_RANDOM_INT = 20

function getRandomInt() {
	return Math.floor(Math.random() * Math.floor(MATH_RANDOM_INT))
}


const company = {
	namespaced: true,
	state: {
		companies: [],
		gettingCompany: null,
		gettingCompanyFail: null,
		company: {},
		addingCompany: null,
		addingCompanyFail:  null,
		agents: [],
		addAgentsRequest: null,
		addAgentsFail: null,
		updateCompanyRequest: null,
		updateCompanyFail: null,
		removeAgentRequest: null,
		removeAgentFail: null
	},
	mutations: {
		set_companiesRequest(state) {
			state.gettingCompany = true
		},
		set_companiesSuccess(state, companies) {
			state.companies = companies
			state.gettingCompany = false,
			state.gettingCompanyFail = false
		},
		set_companyFail (state) {
			state.gettingCompanyFail = true
		},
		set_singleCompanySuccess(state, company) {
			state.company = company
		},
		addCompanyRequest(state) {
			state.addCompanyRequest = true
		},
		addingCompanyFail(state) {
			state.addingCompanyFail = true
		},
		addCompanySuccessful(state, company) {
			state.addingCompany = false
			state.addingCompanyFail = false
			state.companies.push(company);
		},
		updateCompanySuccessful(state, company) {
			state.company = company;
			state.updateCompanyFail = false;
			state.updateCompanyRequest = false;
		},
		updateCompanyRequest(state) {
			state.updateCompanyRequest = true
		},
		updateCompanyFail(state) {
			state.updateCompanyFail = true
		},
		addAgentRequest(state) {
			state.addAgentsRequest = true
		},
		addAgentSuccessful(state, agent) {
			state.addAgentsRequest = false;
			state.addAgentsFail = false;
			state.agents.push(agent)
		},
		addAgentFail(state) {
			state.addAgentFail = true
		},
		removeAgentFail(state) {
			state.removeAgentFail = true
		},
		removeAgentRequest(state) {
			state.removeAgentRequest = true;
		},
		removeAgentSuccess(state, agentId) {
			state.addAgentsRequest = false
			state.addAgentsFail = false
			// state.agents.splice(
			// 	state.agents.indexOf(state.agents.map(agent => agent.id).filter(id => id._id == agentId)),
			// 	1)
			state.agents.splice(state.agents.indexOf(agentId), 1)
		}

	},
	actions: {
		init({ dispatch, commit }) {
			companyService.getAllCompanies()
			.then(companies => {
				
				console.log("companies", companies.data)
				commit('set_companiesSuccess', companies.data.data)
			})
			.catch(error => {
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error,
					type: 'warning',
					stage: true
				},  {
					root: true
				})
			})
		},
		getCompanyById({commit, dispatch}, companyId) {
			companyService.getCompanyById(companyId)
			.then(company => {
				if(company.data.message) {
					dispatch('alert/successAlert', {
						mKey: getRandomInt(),
						message: company.data.message,
						type: 'info',
						stage: true
					}, { root: true })
				}
				commit('set_singleCompanySuccess', company.data.data)
			})
			.catch(error => {
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error,
					type: 'warning',
					stage: true
				},  {
					root: true
				})
			})
		},
		getCompanyBySlug({commit, dispatch}, companySlug) {
			companyService.getCompanyBySlug(companySlug)
			.then(company => {
				if(company.data.message) {
					dispatch('alert/successAlert', {
						mKey: getRandomInt(),
						message: company.data.message,
						type: 'info',
						stage: true
					}, { root: true })
				}
				commit('set_singleCompanySuccess', company.data.data)
			})
			.catch(error => {
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error,
					type: 'warning',
					stage: true
				},  {
					root: true
				})
			})
		},
		addCompany({ commit, dispatch }, data) {
			commit('addCompanyRequest')
			companyService.addCompany(data)
			.then(company => {
				if(company.data.message) {
					dispatch('alert/successAlert', {
						mKey: getRandomInt(),
						message: company.data.message,
						type: 'info',
						stage: true
					}, { root: true })
				}
				commit('addCompanySuccessful', company.data.data)
			})
			.catch(error => {
				commit('addingCompanyFail');
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error,
					type: 'warning',
					stage: true
				},  {
					root: true
				})
			})
		},
		updateCompany({ commit, dispatch }, companyId, data) {
			commit('updateCompanyRequest')
			companyService.updateCompany()
			.then(company => {
				if(company.data.message)  {
					dispatch('alert/successAlert', {
						mKey: getRandomInt(),
						message: company.data.message,
						type: 'info',
						stage: true
					}, { root: true })
				}
				commit('updateCompanySuccessful', company.data.data)
			})
			.catch(error => {
				commit('updateCompanyFail')
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error,
					type: 'warning',
					stage: true
				},  {
					root: true
				})
			})
		},
		addAgent ({ dispatch, commit }, slug, agentId) {
			commit('addAgentRequest')
			companyService.addCompanyAgents()
			.then(agents => {
				if(agent.data.message)  {
					dispatch('alert/successAlert', {
						mKey: getRandomInt(),
						message: agent.data.message,
						type: 'info',
						stage: true
					}, { root: true })
				}
				commit('addAgentSuccessful', agent.data.data)
			})
			.catch(error => {
				commit('addAgentFail')
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error,
					type: 'warning',
					stage: true
				},  {
					root: true
				})
			})
		},
		removeAgents({dispatch, commit}, companySlug, agentId) {
			commit('removeAgentFail')
			companyService.removeAgents(companySlug, agentId)
			.then(agent => {
				if(agent.data.message)  {
					dispatch('alert/successAlert', {
						mKey: getRandomInt(),
						message: agent.data.message,
						type: 'info',
						stage: true
					}, { root: true })
				}
				commit('removeAgentSuccess', agent.data.agentId);
			})
			.catch(error => {
				commit('removeAgentFail')
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error,
					type: 'warning',
					stage: true
				},  {
					root: true
				})
			})
		}
	},
	getters : {
		companyByOwnerId: (state) => (userId) => {
			return state.companies.find(company => company.owner == userId);
		}
	}
}

export default company