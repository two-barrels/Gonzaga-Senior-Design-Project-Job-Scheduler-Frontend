import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import vClickOutside from 'v-click-outside'
import PrimeVue from 'primevue/config'
import { createRouter, createWebHistory } from 'vue-router'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import ToastService from 'primevue/toastservice'
import OpenLayersMap from "vue3-openlayers"
import "vue3-openlayers/styles.css"
import { setRouterInstance, signInCheck, roleCheck } from '@/services/router-helper'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const routes = [
  { 
    path: '/',
    component: () => import('@/components/NavBar.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component:  () => import('@/components/AvailableSpaces.vue')
      },
      {
        path: 'calendar/:user_id/:space_id/:space_name',
        component: () => import('@/components/CalendarComp.vue'),
        props: true
      },
      {
        path: 'edit-spaces',
        meta: {requiredRoles: ['Admin']},
        component: () => import('@/components/AdminPortal.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/components/SessionManager.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  let route = null
  if (to.meta.requiresAuth) {
    route = await signInCheck()
  }
  if(to.meta.requiredRoles?.length > 0 && route === null) {
    route = roleCheck(to.meta.requiredRoles)
  }
  next(route)
})

setRouterInstance(router)

const app = createApp(App)
app.use(OpenLayersMap);
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(store)
app.use(vClickOutside)
app.mount('#app')