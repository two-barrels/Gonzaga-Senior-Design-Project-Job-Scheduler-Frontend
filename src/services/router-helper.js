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

export async function signInCheck() {
  if (!store.getters.getIsLoggedIn) {
    await store.dispatch("loginUserWithToken")
    if (!store.getters.getIsLoggedIn) {
      return '/login'
    }
  }
  return null
}

export function roleCheck(roles) {
  if(!store.getters.getUserRoles.some(desiredRole => {
    return roles.some(role => role === desiredRole.name)
  })) {
    return '/'
  }
  return null
}