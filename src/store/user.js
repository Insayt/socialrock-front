import Vue from 'vue';
import axios from 'axios';
import config from '../config';

axios.defaults.withCredentials = true;

const deafaultUserData = {
  _id: null,
  loading: false,
  currentProject: null,
  user: {
    email_verify: false,
    projects: [],
    _id: null,
    email: null,
    trial_dt: null,
    created_at: null,
    updated_at: null
  }
};

export default {
  namespaced: true,
  state: Object.assign({}, deafaultUserData),
  mutations: {
    setLoading (state, loading) {
      Vue.set(state, 'loading', loading);
    },
    setUserData (state, data) {
      Vue.set(state, 'user', data);
    },
    setCurrentProject (state, projectId) {
      Vue.set(state, 'currentProject', projectId);
    },
  },
  actions: {
    current ({state, commit}, force) {
      if (state.user._id && !force) {
        return Promise.resolve(state.user);
      } else {
        return axios.post(`${config.apiUrl}/user/current`)
          .then(res => {
            commit('setUserData', res.data);
            if (res.data.projects && res.data.projects.length) {
              commit('setCurrentProject', res.data.projects[0].short_id);
            }
            return res.data;
          }).catch(() => {
            return null;
          })
      }
    },
    login ({commit}, { email, password }) {
      return axios.post(`${config.apiUrl}/user/login`, { email, password })
        .then(res => {
          commit('setUserData', res.data);
          if (res.data.projects && res.data.projects.length) {
            commit('setCurrentProject', res.data.projects[0].short_id);
          }
          return res.data;
        })
    },
    logout ({commit}) {
      return axios.post(`${config.apiUrl}/user/logout`)
        .then(res => {
          commit('setUserData', Object.assign({}, deafaultUserData));
          return res.data;
        })
    },
    register ({commit}, { email, password, repeatPassword }) {
      return axios.post(`${config.apiUrl}/user/register`, { email, password, repeatPassword })
        .then(res => {
          // commit('setUserData', res.data);
          return res.data;
        })
    },
  },
  getters: {
    loading: state => state.loading,
    user: (state) => state.user,
    currentProject: (state) => {
      if (state.user.projects.length) {
        return state.user.projects.find((p) => {
          return p.short_id === state.currentProject
        })
      }
    }
  }
}