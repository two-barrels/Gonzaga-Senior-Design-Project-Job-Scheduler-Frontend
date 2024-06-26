import axios from "axios"

const BASE_URL = process.env.VUE_APP_BASE_BACKEND_URL

const state = {
  spaces_arr: null
}

const getters = {
  getSpaceInfo(state) {
    return state.spaces_arr
  }
}

const actions = {
    fetchSpaceInfo({commit}) {
        new Promise((reject) => {
          axios
            .get(`${BASE_URL}spaces`)
            .then((response) => {
              commit("setSpacesInfo", response)
            })
            .catch((error) => {
              reject(error)
            })
        })
      },
}
const mutations = {
  setSpacesInfo(state, data){
    state.spaces_arr = data.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}