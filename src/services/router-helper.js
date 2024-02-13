import store from "../store"

let routerInstance

export function setRouterInstance(router) {
  routerInstance = router
}

export function navigateToRoute(route) {
  if (routerInstance) {
    routerInstance.push(route)
  }
}

export function signInCheck() {
  if (!store.getters.getIsLoggedIn) {
    store.dispatch("loginUserWithToken")
    if (!store.getters.getIsLoggedIn) {
      return '/login'
    }
  }
  return null
}

export function roleCheck(roles) {
  if(!store.getters.getUserRoles.some(desiredRole => {
    roles.some(role => role === desiredRole)
  })) {
    return '/'
  }
  return null
}