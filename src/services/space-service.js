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
  },
  getByFloors(floorsIds){
    return http.post('by_floor', { floor_ids: floorsIds })
  },
  getByIds(spacesIds){
    return http.post('spaces_by_ids', { space_ids: spacesIds })
  }
}