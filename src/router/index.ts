import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import MainLayoutStu from '../layouts/MainLayoutStu.vue';
import MainLayoutPro from '../layouts/MainLayoutPro.vue';
import HomeViewStu from '../views/student/HomeViewStu.vue';
import HomeViewPro from '../views/professor/HomeViewPro.vue';
import ClassViewStu from '../views/student/ClassViewStu.vue';
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
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/student',
      name: 'student',
      component: MainLayoutStu,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeViewStu,
          props: true
        },
        {
          path:'class',
          component:ClassViewStu,
          props: true
        }
      ],
      beforeEnter: (to, from, next) => {
        const login = useLoginStore();
        if (login.isLogin) {
          //교수, 학생 별로 나눠서
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/professor',
      name: 'professor',
      component: MainLayoutPro,
      children: [
        {
          path: '/',
          component: HomeViewPro,
          props: true
        }
      ],
      beforeEnter: (to, from, next) => {
        const login = useLoginStore();
        if (login.isLogin) {
          //교수, 학생 별로 나눠서
          next();
        } else {
          next('/');
        }
      }
    }
  ]
});

export default router;
