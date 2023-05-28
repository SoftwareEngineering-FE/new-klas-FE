import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import MainLayoutStu from '../layouts/MainLayoutStu.vue';
import MainLayoutPro from '../layouts/MainLayoutPro.vue';
import MainLayoutAdm from '../layouts/MainLayoutAdm.vue';
import HomeViewStu from '../views/student/HomeViewStu.vue';
import HomeViewPro from '../views/professor/HomeViewPro.vue';
import HomeViewAdm from '../views/admin/HomeViewAdm.vue';
import ClassViewStu from '../views/student/ClassViewStu.vue';
import ScoreViewStu from '../views/student/ScoreViewStu.vue';
import NoticeViewStu from '../views/student/NoticeViewStu.vue';
import SubjectViewStu from '../views/student/SubjectViewStu.vue';
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
          component: HomeViewStu,
          props: true
        },
        {
          path: 'class',
          component: ClassViewStu,
          props: true
        },
        {
          path: 'notice/:id',
          component: NoticeViewStu,
          props: true
        },
        {
          path: 'subject/:id',
          component: SubjectViewStu,
          props: true
        },
        {
          path: 'score',
          component: ScoreViewStu,
          props: true
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
    },
    {
      path: '/professor',
      name: 'professor',
      component: MainLayoutPro,
      children: [
        {
          path: '',
          component: HomeViewPro,
          props: true
        },
        {
          path: 'class',
          component: HomeViewPro,
          props: true
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
    },
    {
      path: '/admin',
      name: 'admin',
      component: MainLayoutAdm,
      children: [
        {
          path: '',
          component: HomeViewAdm
        },
        {
          path: 'users',
          component: HomeViewAdm
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
