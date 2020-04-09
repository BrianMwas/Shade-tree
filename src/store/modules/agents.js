import  { userService } from '../../services/user.service';
const MAX_RANDOM_NUM = 20;

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
		AgentReviews: {},
		requestingReviewAdd: null
	},
	mutations: {
		getAllAgentsRequest(state) {
			state.retrievingAgents = true
		},
		getAllAgentsError(state) {
			state.agents = {};
			state.retrievingAgents = false
		},
		getAllAgentsSuccess(state, agents) {

			state.agents = agents;
			state.retrievingAgents = false
		},
		getSpecificAgentSuccess(state, agent) {
			state.agent = agent;
		},
		getSpecificAgentRequest(state) {
			state.retrievingAgent = true
		},
		getSpecificAgentError(state) {
			state.agent = null;
			state.retrievingAgent = false
		},
		addAgentReviewSuccess(state, dataReview) {
			state.AgentsReviews = dataReview
		},
		addAgentReviewRequest(state) {
			state.requestingReviewAdd = true
		},
		addAgentReviewError(state) {
			state.requestingReviewAdd = null
		},
		set_totalAgents(state, agents) {
			state.totalAgents = agents
		}
	},
	actions: {
		initAgents({commit}) {

			
				userService.getAllAgents()
				.then(d => {
					let agents = d.data.data;
					console.log("agentsOnLoad", agents)
					commit("getAllAgentsSuccess", agents)
				})
				.catch(error => {
					commit("getAllAgentsError", error.response)
				})
			
		},
		getAgents({ dispatch, commit }) {
			commit('getAllAgentsRequest');

			userService.getAllAgents()
			.then(agents => {
				if(agents.data.message) {
				 dispatch('alert/errorAlert', 
				 	{ 
				 		mKey: getRandomInt(), 
				 		message: agents.data.message, 
				 		type: 'info' 
				 	}, 
				 	{ 
				 		root: true 
				 	})
				} else {
					console.log(agents.data.data)
					commit('getAllAgentsSuccess', agents.data.data);
				}
				
			})
			.catch(error => {
				commit('getAllAgentsError');
				dispatch('alert/errorAlert', 
					{ 
						duration: 20000, 
						mKey: getRandomInt(), 
						message: error, 
						type: 'secondary' }, 
					{ 
						root: true 
					})
			})
		},
		getSingleAgent({ dispatch, commit}, id) {
			userService.getSingleAgent(id)
			.then(response => {
				commit('getSpecificAgentRequest')
				if(response.message) {
				 dispatch('alert/errorAlert', 
				 	{ mKey: getRandomInt(), 
				 		message: response.message, 
				 		type: 'secondary' }, 
				 		{ 
				 			root: true 
				 		})
				} else {
					commit('getSpecificAgentSuccess', response.data)
				}
			})
			.catch(error => {
				let errorMessage = error.response.data.message;

				if(errorMessage) {
					dispatch('alert/errorMessage', 
						{ 
							duration: 20000, 
							mKey: getRandomInt(), 
							message: errorMessage, 
							type: 'warning' 
						}, 
						{ 
							root: true 
						})
				} else {
					dispatch('alert/errorMessage', 
						{ 
							duration: 20000, 
							mKey: getRandomInt(), 
							message: error, 
							type: 'error' 
						}, 
						{ 
							root: true 
						})

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
					dispatch('alert/errorMessage', 
					{ 
						duration: 20000, 
						mKey: getRandomInt(), 
						message: errorMessage, 
						type: 'warning' 
					}, 
					{ 
						root: true 
					})
				} else {
					dispatch('alert/errorMessage', 
						{ 
							duration: 20000, 
							mKey: getRandomInt(), 
							message: error, 
							type: 'error' 
						}, 
						{ 
							root: true 
						})

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