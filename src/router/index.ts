import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import MainLayout from '../layouts/MainLayout.vue';
import HomeView from '@/views/HomeView.vue';
import { useLoginStore } from '../stores/login';

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
      ],
      beforeEnter: (to, from, next) => {
        const login = useLoginStore();
        if (login.isLogin) {
          next();
        } else {
          next('/');
        }
      }
    }
  ]
});

export default router;
