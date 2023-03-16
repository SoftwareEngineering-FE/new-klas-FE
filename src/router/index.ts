import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'

const checkLogin = () => (to, from, next) => {}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: '/',
          component: HomeView
        }
      ]
    }
  ]
})

export default router
