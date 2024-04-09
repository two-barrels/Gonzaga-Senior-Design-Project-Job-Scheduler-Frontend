import http from "./http-helper"


export default {
  create(params) {
    return http.post('floors', params)
  },
  getAll() {
    return http.get('floors')
  },
  save(id, params) {
    return http.put(`floors/${id}`, params)
  },
  delete(id) {
    return http.delete(`floors/${id}`)
  }
}