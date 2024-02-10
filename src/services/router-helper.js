let routerInstance

export function setRouterInstance(router) {
  routerInstance = router
}

export function navigateToRoute(route) {
  if (routerInstance) {
    routerInstance.push(route)
  }
}