import homeVue from '@/views/home.vue'
import SigninVue from '@/views/signin.vue'
import signupVue from '@/views/signup.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ 
    { path: '', component: homeVue },
    { path: '/signin', component: SigninVue },
    { path: '/signup', component: signupVue },
  ]
})

export default router
