import http from "./http-helper"

export default {
    get(route, params) {
        return http.get(route, params)
    },
    changeAdminStatus(params) {
        return http.post('assignments/change_admin_status', params)
    },
    create(params) {
        return http.post('assignments', params)
    },
    delete(id,params) {
        return http.delete(`assignments/${id} }`, params)
    }
}