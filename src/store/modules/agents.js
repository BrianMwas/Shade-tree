import  { userService } from '../../services/user.service';

function getRandomInt () {
  return Math.floor(Math.random() * Math.floor(MAX_RANDOM_NUM))
}

const agents = {
	namespaced: true,
	state: {
		retrievingAgents: null,
		retrievingAgent: null,
		agents: [],
		agent: null,
		AgentReviews: [],
		requestingReviewAdd: null,
	},
	mutations: {
		getAllAgentsRequest(state) {
			state.retrievingAgents = true
		},
		getAllAgentsError(state) {
			state.agents = [];
			state.retrievingAgents = false
		},
		getAllAgentsSuccess(state, agents) {
			[...state.agents, agents]
		},
		getSpecificAgentSuccess(state, agent) {
			state.agent = agent;
		},
		getSpecificAgentRequest(state) {
			state.retrievingAgent = true
		},
		getSpecificAgentError(state) {
			state.agent = null;
		},
		addAgentReviewSuccess(state, dataReview) {
			[...state.AgentReviews, dataReview]
		},
		addAgentReviewRequest(state) {
			state.requestingReviewAdd = true
		},
		addAgentReviewError(state) {
			state.requestingReviewAdd = null
		}
	},
	actions: {
		getAgents({ dispatch, commit }) {
			commit('getAllAgentsRequest');

			userService.getAllAgents()
			.then(response => {
				if(response.message) {
					return dispatch('alert/errorAlert', { mKey: getRandomInt(), message: response.message, type: 'secondary' }, { root: true })
				}
				commit('getAllAgentsSuccess', response.data);
			})
			.catch(error => {
				let errorMessage = error.response.data.message;
				commit('getAllAgentsError');
				dispatch('alert/errorAlert', { mKey: getRandomInt(), message: errorMessage, type: 'secondary' }, { root: true })
			})
		},
		getSingleAgent({ dispatch, commit}, id) {
			userService.getSingleAgent(id)
			.then(response => {
				commit('getSpecificAgentRequest')
				if(response.message) {
				 dispatch('alert/errorAlert', { mKey: getRandomInt(), message: response.message, type: 'secondary' }, { root: true })
				} else {
					commit('getSpecificAgentSuccess', response.data)
				}
			})
			.catch(error => {
				let errorMessage = error.response.data.message;

				if(errorMessage) {
					dispatch('alert/errorMessage', { mKey: getRandomInt(), message: errorMessage, type: 'warning' }, { root: true })
				} else {
					dispatch('alert/errorMessage', { mKey: getRandomInt(), message: error, type: 'error' }, { root: true })

				}
			})
		},
		addAgentReview({ dispatch, commit }, data) {
			userService.addAgentReview(data.id, data.message)
			.then(response => {
				commit('addAgentReviewRequest');
				if(response.message) {
					dispatch('alert/successAlert', {
						mKey: getRandomInt(),
						message: response.message,
						type: 'secondary'
					})
				} else {
					commit('addAgentReviewSuccess', response)
				}
			})
			.catch(error => {
				let errorMessage = error.response.data.message;
				if(errorMessage) {
					dispatch('alert/errorMessage', { mKey: getRandomInt(), message: errorMessage, type: 'warning' }, { root: true })
				} else {
					dispatch('alert/errorMessage', { mKey: getRandomInt(), message: error, type: 'error' }, { root: true })

				}
			})
		}
	},
	getters: {
		activatedAgents: state =>  state.agents,
		reviews: state => state.AgentReviews
	}
}


export default agents;