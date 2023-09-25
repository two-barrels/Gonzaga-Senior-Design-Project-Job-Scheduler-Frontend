import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:3000/'

export default {
    async get(route, params) {
        return axios.get(BASE_URL + route, params)
    },
    post(route, params) {
        return axios.post(BASE_URL + route, params)
    },
    put(route, params) {
        return axios.put(BASE_URL + route, params)
    }
}