import { createStore } from 'vuex';
import { loginUser } from '../services/apiService'; // Adjust path as necessary

export default createStore({
  state: {
    token: localStorage.getItem('authToken') || '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('authToken', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('authToken');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const result = await loginUser(credentials);
      commit('setToken', result.access);
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
