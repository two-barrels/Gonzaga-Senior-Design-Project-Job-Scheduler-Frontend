import http from "./http-helper"


export default {
  getAll() {
    return http.get('buildings')
  },
  create(params) {
    return http.post('buildings', params)
  },
  save(id, params) {
    return http.put(`buildings/${id}`, params)
  },
  delete(id) {
    return http.delete(`buildings/${id}`)
  }
}
