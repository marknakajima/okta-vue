import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state     : {
		accessToken : ''
	},
	modules   : {},
	actions   : {
		loadAuthToken({ commit }, token) {
			commit('setAuthToken', token);
		}
	},
	mutations : {
		setAuthToken(state, accessToken) {
			state.accessToken = accessToken;
		}
	},
	getters   : {}
});
