import { companyService } from '../../services/companyService';
import router from '../../router/index';

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
		agents: Set,
		addAgentsRequest: null,
		addAgentsFail: null,
		updateCompanyRequest: null,
		updateCompanyFail: null,
		removeAgentRequest: null,
		removeAgentFail: null
	},
	mutations: {
		set_AgentSuccess(state, agents) {
			let agentSet = new Set();
			for (var i = agents.length - 1; i >= 0; i--) {
				agentSet.add(agents[i])
			}
			state.agents = Array.from(agentSet);
		},
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
			state.agents.add(agent)
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
			let agent = state.agents.find(agent => agent._id == agentId);

			state.agents.delete(agent)
		}

	},
	actions: {
		init({ dispatch, commit }) {
			companyService.getAllCompanies()
			.then(companies => {
				
				console.log("companies", companies.data.data)
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
		initCompanyAgents({ commit, dispatch }, slug) {
			companyService.getCompanyBySlug(slug)
			.then(results => {
				let agents = results.data.data.agents;
				commit('set_AgentSuccess', agents)
			}).catch(error => {
				console.log("agentsInit", error.response)
				dispatch('alert/errorAlert', {
					mKey: getRandomInt(),
					message: "No agents yet",
					type: 'info',
					stage: true
				}, { root: true })
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
				router.push("/newunit")
			})
			.catch(error => {
				commit('addingCompanyFail');
				console.log("company error", error.response)
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error.response.data.message,
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
		addAgent ({ dispatch, commit }, payload) {
			commit('addAgentRequest')
			companyService.addCompanyAgents(payload.companySlug, payload.agent)
			.then(results => {
				if(results.data.message)  {
					dispatch('alert/successAlert', {
						mKey: getRandomInt(),
						message: results.data.message,
						type: 'info',
						stage: true
					}, { root: true })
				}
				// dispatch("initCompanyAgents", results.data.data.slug)
			})
			.catch(error => {
				commit('addAgentFail')
				console.log("error adding agent", error.response)
				
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error.response.data.message,
					type: 'warning',
					stage: true
				},  {
					root: true
				})
			})
		},
		removeAgent({dispatch, commit}, payload) {
			commit('removeAgentFail')
			companyService.removeAgents(payload.companySlug, payload.agentId)
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
				console.log("error", error.response)
				dispatch('alert/errorAlert',  {
					mKey: getRandomInt(),
					message: error.response,
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