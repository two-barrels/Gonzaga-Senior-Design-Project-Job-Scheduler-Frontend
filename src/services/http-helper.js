import axios from 'axios'

axios.defaults.withCredentials = true
const BASE_URL = process.env.VUE_APP_BASE_BACKEND_URL

export default {
    get(route, params) {
        return axios.get(BASE_URL + route, params)
    },
    post(route, params) {
        return axios.post(BASE_URL + route, params)
    },
    put(route, params) {
        return axios.put(BASE_URL + route, params)
    },
    delete(route, params) {
        return axios.delete(BASE_URL + route, params)
    }

}