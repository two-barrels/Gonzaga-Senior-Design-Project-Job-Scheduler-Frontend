import http from "./http-helper"


export default {
  getAll() {
    return http.get('roles')
  }
}