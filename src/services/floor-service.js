import http from "./http-helper"


export default {
  create(params) {
    return http.post('floors', params)
  },
  getAll() {
    return http.get('floors')
  },
  get(id) {
    return http.get(`buildings/${id}/floors`)
  },
  save(id, params) {
    return http.put(`floors/${id}`, params)
  },
  delete(id) {
    return http.delete(`floors/${id}`)
  },
  getByBuildings(buildingIds){
    return http.post('by_building', {building_ids: buildingIds})
  },
  getByIds(floorsIds){
    return http.post('floors_by_ids', { floor_ids: floorsIds })
  }
}