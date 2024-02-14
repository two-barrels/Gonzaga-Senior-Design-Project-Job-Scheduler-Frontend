import axios from "axios"
import { navigateToRoute } from '@/services/router-helper'

axios.defaults.withCredentials = true
const BASE_URL = process.env.VUE_APP_BASE_BACKEND_URL

const state = {
  isLoggedIn: false,
  user: {} // get user ID by indexing into this
}

const getters = {
  getUserEmail(state) {
    return state.user?.email
  },
  getUserID(state) {
    return state.user?.id
  },
  getUserRoles(state) {
    return state.user?.roles
  },
  getIsLoggedIn(state) {
    return state.isLoggedIn
  }
}
const actions = {
  registerUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}users`, payload)
        .then((response) => {
          commit("setUserInfo", response)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  loginUser({ commit }, payload) {
    new Promise((resolve) => {
      axios
        .post(`${BASE_URL}users/sign_in`, payload)
        .then((response) => {
          commit("setUserInfo", response)
          navigateToRoute('/')
          resolve(response)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  },
  logoutUser({ commit }) {
    const config = {
      headers: {
        authorization: state.auth_token,
      },
    }
    new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}users/sign_out`, config)
        .then(() => {
          commit("resetUserInfo")
          navigateToRoute('/login')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  loginUserWithToken({ commit }) {
    new Promise((resolve) => {
      axios(BASE_URL + 'member-data', {
        method: "get",
        withCredentials: true
      })
        .then((response) => {
          commit("setUserInfo", response)
          navigateToRoute('/')
          resolve(response)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  },
}
const mutations = {
  setUserInfo(state, data) {
    state.user = data.data.user
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