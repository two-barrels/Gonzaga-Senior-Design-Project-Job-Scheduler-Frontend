import http from "./http-helper"


export default {
    get(route, params) {
        return http.get(route, params)
    }

}