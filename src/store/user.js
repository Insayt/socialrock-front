import Vue from 'vue';
import axios from 'axios';
import { DateTime } from 'luxon';
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
  },
  calendarDateStart: '',
  calendarDateEnd: '',
  newPost: {
    text: '',
    media: [],
    checked_accounts: []
  },
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
    },
    setNewPostParam (state, { param, value }) {
      Vue.set(state.newPost,  param, value);
      localStorage.setItem('new_post', JSON.stringify(state.newPost));
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
    register ({commit}, { email, password, repeatPassword, timezone }) {
      return axios.post(`${config.apiUrl}/user/register`, { email, password, repeatPassword, timezone })
        .then(res => {
          // commit('setUserData', res.data);
          return res.data;
        })
    },
    createProject ({commit}, { name, timezone }) {
      return axios.post(`${config.apiUrl}/project/create`, { name, timezone })
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
    editSlotCategory ({commit}, { project_id, day_number, slot_index, value }) {
      return axios.post(`${config.apiUrl}/project/change-slot-category`, {
        project_id,
        day_number,
        slot_index,
        value
      })
        .then(res => {
          return res.data;
        })
    },
    deleteSlot ({commit}, { project_id, day_number, slot_index }) {
      return axios.post(`${config.apiUrl}/project/delete-slot`, {
        project_id,
        day_number,
        slot_index,
      })
        .then(res => {
          commit('setProjectData', res.data);
          return res.data;
        })
    },
    addSlot ({commit}, { project_id, day_number, slot_index, value }) {
      return axios.post(`${config.apiUrl}/project/add-slot`, {
        project_id,
        day_number,
        slot_index,
        value
      })
        .then(res => {
          commit('setProjectData', res.data);
          return res.data;
        })
    },
    saveUtm ({ state, commit }, { project_id, utm }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/utm`, {
        utm: utm
      })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    addUserAccess ({ state, commit }, { project_id, email, access }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/add-user-access`, {
        email,
        access
      })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    deleteUserAccess ({ state, commit }, { project_id, email }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/delete-user-access`, {
        email,
      })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    changeProjectTimezone ({ state, commit }, { project_id, timezone }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/change-timezone`, {
        timezone,
      })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    changeProjectReports ({ state, commit }, { project_id, email, week, month }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/reports`, {
        email,
        week,
        month,
      })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    changeProjectCustom ({ state, commit }, { project_id, name, color }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/custom`, {
        name,
        color
      })
        .then(res => {
          commit('setProjectData', res.data);
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
    savePost ({ state, commit }, data) {
      return axios.post(`${config.apiUrl}/post/save`, data)
        .then(res => {
          // commit('setProjectData', res.data);
        })
    },
    deletePost ({ state, commit }, { post_id, project_id }) {
      return axios.post(`${config.apiUrl}/post/delete`, {
        post_id,
        project_id
      })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    getPosts ({ state, commit }, { start, end, project_id }) {
      return axios.get(`${config.apiUrl}/post/list`, {
        params: { start, end, project_id }
      })
        .then(({ data }) => {
          return data;
        })
    },
    createCategory ({ state, commit }, data) {
      return axios.post(`${config.apiUrl}/category/create`, data)
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    editCategory ({ state, commit }, data) {
      return axios.post(`${config.apiUrl}/category/edit/${data.id}`, data)
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    deleteCategory ({ state, commit }, { id }) {
      return axios.post(`${config.apiUrl}/category/delete/${id}`)
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    uploadImage ({ state, commit }, { project_id, form_data }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/upload/image`, form_data)
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    uploadPattern ({ state, commit }, { project_id, form_data }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/upload/pattern`, form_data)
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    deletePattern ({ state, commit }, { project_id, pattern }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/delete/pattern`, { pattern })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    deleteImage ({ state, commit }, { project_id, image }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/delete/image`, { image })
        .then(res => {
          commit('setProjectData', res.data);
        })
    },
    getStockImages ({ state, commit }, { category, page, orientation }) {
      return axios.get(`${config.apiUrl}/resource/stock-images`, {
        params: {
          category,
          page,
          orientation
        }
      } )
        .then(res => {
          return res.data;
        })
    },
    getOneStockImage ({ state, commit }, { url }) {
      return axios.get(`${config.apiUrl}/resource/get-photo`, {
        params: {
          url
        }
      })
        .then(res => {
          return res.data;
        })
    },
    createDesign ({ state, commit }, { project_id, format, object, image_url }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/design/create`, {
        format,
        object,
        image_url
      })
        .then(res => {
          commit('setProjectData', res.data.project);
          return res.data;
        })
    },
    saveDesign ({ state, commit }, { design_id, object, format, file }) {
      return axios.post(`${config.apiUrl}/design/${design_id}/save`, {
        object,
        format,
        file
      })
        .then(res => {
          return res.data;
        })
    },
    saveDesignImage ({ state, commit }, { project_id, design_id, file }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/upload/design/${design_id}`, file)
        .then(res => {
          commit('setProjectData', res.data);
          return res.data;
        })
    },
    getDesign ({ state, commit }, { design_id }) {
      return axios.get(`${config.apiUrl}/design/${design_id}`)
        .then(res => {
          return res.data;
        })
    },
    deleteDesign ({ state, commit }, { design_id }) {
      return axios.post(`${config.apiUrl}/design/delete`, {
        design_id: design_id
      })
        .then(res => {
          commit('setProjectData', res.data);
          return res.data;
        })
    },
    savePostImage ({ state, commit }, { project_id, file }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/upload/photo`, file)
        .then(res => {
          return res.data;
        })
    },
    savePostVideo ({ state, commit }, { project_id, file }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/upload/video`, file)
        .then(res => {
          return res.data;
        })
    },
    cropPostVideo ({ state, commit }, { project_id, ...data }) {
      return axios.post(`${config.apiUrl}/project/${project_id}/crop-video`, data)
        .then(res => {
          return res.data;
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