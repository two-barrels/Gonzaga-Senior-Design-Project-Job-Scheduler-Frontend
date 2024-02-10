import axios from "axios"
import { navigateToRoute } from '@/services/router-helper'

const BASE_URL = process.env.VUE_APP_BASE_BACKEND_URL

const state = {
  isLoggedIn: false,
  user: {}
};
=======
  isLoggedIn: false,
  user: {}
}
>>>>>>> Stashed changes

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
};
=======
  getIsLoggedIn(state) {
    return state.isLoggedIn
  }
}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          commit("setUserInfo", response);
          navigateToRoute('/')
          resolve(response);
        })
        .catch((error) => {
          console.error(error)
        });
    });
=======
          commit("setUserInfo", response)
          navigateToRoute('/')
          resolve(response)
        })
        .catch((error) => {
          console.error(error)
        })
    })
>>>>>>> Stashed changes
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
          commit("setUserInfo", response);
          navigateToRoute('/')
          resolve(response);
        })
        .catch((error) => {
          console.error(error)
        });
    });
=======
          commit("setUserInfo", response)
          navigateToRoute('/')
          resolve(response)
        })
        .catch((error) => {
          console.error(error)
        })
    })
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    };
    state.isLoggedIn = false;
  },
}
export default {
  state,
  getters,
  actions,
  mutations,
}