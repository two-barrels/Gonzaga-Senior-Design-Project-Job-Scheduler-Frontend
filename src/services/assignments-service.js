import http from "./http-helper"

export default {
    getAll() {
        return http.get("assignments")
    },
    changeAdminStatus(params) {
        return http.post('assignments/change_admin_status', params)
    },
    create(params) {
        return http.post('assignments', params)
    },
    delete(id) {
        return http.delete(`assignments/${id} }`)
    },
    assignmentsForCurrentUser(){
        return http.get('assignments/assignments_by_user')
    }
}