import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import vClickOutside from 'v-click-outside'


import PrimeVue from 'primevue/config'
import { createRouter, createWebHistory } from 'vue-router'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import ToastService from 'primevue/toastservice'
import { setRouterInstance, signInCheck, roleCheck } from '@/services/router-helper'


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
        path: 'calendar',
        component: () => import('@/components/CalendarComp.vue')
      },
      {
        path: 'edit-spaces',
        meta: { requiredRoles: ['Admin'] },
        component: () => import('@/components/EditSpaces.vue')
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

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(store)
app.use(vClickOutside)
app.mount('#app')