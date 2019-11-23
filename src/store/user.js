import Vue from 'vue';
import axios from 'axios';
import config from '../config';

axios.defaults.withCredentials = true;

const deafaultUserData = {
  _id: null,
  loading: false,
  currentProjectId: null,
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
      Vue.set(state, 'currentProjectId', projectId);
      localStorage.setItem('currentProjectId', projectId);
    },
    setProjectData (state, project) {
      let pIndex = state.user.projects.findIndex(p => p._id === project._id );
      Vue.set(state.user.projects, pIndex, project);
    }
  },
  actions: {
    current ({state, commit}, force) {
      if (state.user._id && !force) {
        return Promise.resolve(state.user);
      } else {
        return axios.post(`${config.apiUrl}/user/current`)
          .then(res => {
            commit('setUserData', res.data);
            if (!localStorage.getItem('currentProjectId')) {
              commit('setCurrentProject', res.data.projects[0].short_id);
            } else {
              commit('setCurrentProject', localStorage.getItem('currentProjectId'));
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
          if (!localStorage.getItem('currentProjectId')) {
            commit('setCurrentProject', res.data.projects[0].short_id);
          } else {
            commit('setCurrentProject', localStorage.getItem('currentProjectId'));
          }
          return res.data;
        })
    },
    logout ({commit}) {
      return axios.post(`${config.apiUrl}/user/logout`)
        .then(res => {
          localStorage.removeItem('currentProjectId');
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
    createProject ({commit}, { name }) {
      return axios.post(`${config.apiUrl}/project/create`, { name })
        .then(res => {
          commit('setUserData', res.data);
          return res.data;
        })
    },
    deleteProject ({commit}, { id }) {
      return axios.post(`${config.apiUrl}/project/delete/${id}`)
        .then(res => {
          commit('setUserData', res.data);
          return res.data;
        })
    },
    getVkGroups ({state, commit}) {
      return axios.get(`${config.apiUrl}/vk/groups`)
        .then(res => {
          return res.data;
        })
    },
    createTestToken ({state, commit}, { token }) {
      return axios.post(`${config.apiUrl}/vk/test-token`, { token })
        .then(res => {
          return res.data;
        })
    },
    sortAccounts({state, commit}, { projectId, elementId, newIndex, oldIndex, type }) {
      return axios.post(`${config.apiUrl}/social/sort`, { projectId, elementId, newIndex, oldIndex, type })
        .then(res => {
          // commit('setProjectData', res.data);
        })
    },
    addAccounts ({state, commit}, { accounts, project_id }) {
      return axios.post(`${config.apiUrl}/social/add`, { accounts, project_id })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    deleteAccount ({state, commit}, { account_id }) {
      return axios.post(`${config.apiUrl}/social/remove`, { account_id })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
  },
  getters: {
    loading: state => state.loading,
    user: (state) => state.user,
    projects: (state) => {
      if (state.user.projects && state.user.projects.length) {
        return state.user.projects;
      } else {
        return [];
      }
    },
    currentProject: (state) => {
      if (state.user.projects && state.user.projects.length) {
        return state.user.projects.find((p) => {
          return p.short_id === state.currentProjectId
        })
      }
    }
  }
}