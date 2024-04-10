import http from "./http-helper"


export default {
    get(route, params) {
        return http.get(route, params)
    },
    post(route, params) {
        return http.post(route, params)
    },
    put(route, params) {
        return http.put(route, params)
    },
    delete(id) {
        return http.delete(`reservations/${id}`)
    }
}