import Vue from 'vue';
import axios from 'axios';
import config from '../config';

axios.defaults.withCredentials = true;

const deafaultUserData = {
  _id: null,
  email: '',
};

export default {
  namespaced: true,
  state: Object.assign({}, deafaultUserData),
  mutations: {
    setUserData (state, data) {
      state = Object.assign(state, data);
    },
  },
  actions: {
    login ({commit}, data) {
      return axios.post(`${config.apiUrl}/user/login`)
        .then(res => {
          // commit('setUserData', res.data);
          return res.data;
        })
    },
    register ({commit}, { email, password, repeatPassword }) {
      return axios.post(`${config.apiUrl}/user/register`, { email, password, repeatPassword })
        .then(res => {
          commit('setUserData', res.data);
          return res.data;
        })
    },
  },
  getters: {
    loading: state => state.loading,
  }
}