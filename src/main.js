import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import vClickOutside from 'v-click-outside'


import PrimeVue from 'primevue/config'
import { createRouter, createWebHistory } from 'vue-router'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import ToastService from 'primevue/toastservice'
import { setRouterInstance } from '@/services/router-helper'


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
        component: () => import('@/components/EditSpaces.vue')
      },
      {
        path: 'home-page',
        component: () => import('@/components/HomePage.vue')
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.getters.getIsLoggedIn) {
      console.log(store.getters.getIsLoggedIn)
      store.dispatch("loginUserWithToken")
      if (!store.getters.getIsLoggedIn) {
        next('/login')
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

setRouterInstance(router)

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(store)
app.use(vClickOutside)
app.mount('#app')