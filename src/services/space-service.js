import http from "./http-helper"


export default {
  create(params) {
    return http.post('spaces', params)
  },
  getAll() {
    return http.get('spaces')
  },
  save(id, params) {
    return http.put(`spaces/${id}`, params)
  },
  delete(id) {
    return http.delete(`spaces/${id}`)
  }
}