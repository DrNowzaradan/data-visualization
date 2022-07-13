import { createRouter, createWebHistory } from 'vue-router'

import ContactPage from '../pages/ContactPage.vue'
import Main from '../pages/Main.vue'
import LandingPage from '../pages/LandingPage.vue'
import MapPage from '../pages/MapPage.vue'
import SignPage from '../pages/SignPage.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path:'Map_graphics',
        name:'MapPage',
        component:MapPage
      },
      {
        path:'',
        component: LandingPage
      },
      {
        path:'home',
        name:'LandingPage',
        component: LandingPage
      },
      {
        path:'contact',
        name:'Contact',
        component: ContactPage
      },
      {
        path:'sign',
        name:'Sign',
        component: SignPage
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
