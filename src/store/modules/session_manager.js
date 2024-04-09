import axios from "axios"
import { navigateToRoute } from '@/services/router-helper'
import http from '@/services/http-helper'

axios.defaults.withCredentials = true
const BASE_URL = process.env.VUE_APP_BASE_BACKEND_URL

const state = {
  isLoggedIn: false,
  user: {},
  signInError: false
}

const getters = {
  getUserEmail(state) {
    return state.user?.email
  },
  getUserName(state) {
    console.log(state.user)
    return state.user?.name
  },
  getUserID(state) {
    return state.user?.id
  },
  getUserRoles(state) {
    return state.user?.roles
  },
  getIfUserAdmin(state) {
    return state.user?.roles?.some(role => role.name === "Admin")
  },
  getIsLoggedIn(state) {
    return state.isLoggedIn
  },
  signInError(state) {
    return state.signInError
  }
}
const actions = {
  registerUser({ commit }, payload) {
    return new Promise((resolve) => {
      axios
        .post(`${BASE_URL}users`, payload)
        .then((response) => {
          commit("setUserInfo", response)
          navigateToRoute('/')
          resolve(response)
        })
        .catch((error) => {
          state.signInError = true
          console.error(error)
        })
    })
  },
  loginUser({ commit, state }, payload) {
    new Promise((resolve) => {
      axios
        .post(`${BASE_URL}users/sign_in`, payload)
        .then((response) => {
          commit("setUserInfo", response)
          navigateToRoute('/')
          resolve(response)
        })
        .catch((error) => {
          state.signInError = true
          console.error(error)
        })
    })
  },
  logoutUser({ commit }) {
    new Promise((resolve) => {
      axios
        .delete(`${BASE_URL}users/sign_out`)
        .then(() => {
          commit("resetUserInfo")
          navigateToRoute('/login')
          resolve()
        })
        .catch((error) => {
          console.error(error)
        })
    })
  },
  async loginUserWithToken({ commit }) {
    try {
      const response = await http.get('member-data')
      commit("setUserInfo", response)
    } catch (e) {
      console.error(e)
    }
  },
}
const mutations = {
  setUserInfo(state, data) {
    state.user = data.data
    state.isLoggedIn = true
  },
  resetUserInfo(state) {
    state.user = {
      id: null,
      username: null,
      email: null,
    }
    state.isLoggedIn = false

  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}