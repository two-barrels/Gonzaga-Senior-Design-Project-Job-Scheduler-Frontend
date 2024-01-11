import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import vClickOutside from 'v-click-outside'


import PrimeVue from 'primevue/config'
import { createRouter, createWebHistory } from 'vue-router';
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import ToastService from 'primevue/toastservice'
/**
 * Load JWT from Local Storage on Refresh.
 */
let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
  const auth_token = localStorage.getItem("auth_token");
  const authTokenExists = auth_token !== "undefined" && auth_token !== null;
  if (authTokenExists) {
    store.dispatch("loginUserWithToken", { auth_token });
  }
}

const routes = [
  { 
    path: '/',
    component: () => import('@/components/NavBar.vue'),
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


const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(store)
app.use(vClickOutside)
app.mount('#app')