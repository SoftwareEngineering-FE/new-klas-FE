import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';

import MainLayoutStu from '../layouts/MainLayoutStu.vue';
import MainLayoutPro from '../layouts/MainLayoutPro.vue';
import MainLayoutAdm from '../layouts/MainLayoutAdm.vue';

import HomeViewStu from '../views/student/HomeViewStu.vue';

import HomeViewAdm from '../views/admin/HomeViewAdm.vue';
import ClassViewStu from '../views/student/ClassViewStu.vue';
import ScoreViewStu from '../views/student/ScoreViewStu.vue';
import NoticeViewStu from '../views/student/components/NoticeViewStu.vue';
import SubjectViewStu from '../views/student/components/SubjectViewStu.vue';
import RegistrationViewStu from '@/views/student/RegistrationViewStu.vue';
import CourseDescViewStu from '@/views/student/components/CourseDescViewStu.vue';
import RefViewStu from '@/views/student/components/RefViewStu.vue';

import HomeViewPro from '../views/professor/HomeViewPro.vue';
import ClassViewPro from '@/views/professor/ClassViewPro.vue';
import NoticeViewPro from '../views/professor/components/NoticeViewPro.vue';
import SubjectViewPro from '../views/professor/components/SubjectViewPro.vue';
import CourseDescViewPro from '@/views/professor/components/CourseDescViewPro.vue';
import WriteNoticePro from '@/views/professor/components/WriteNoticePro.vue';
import AddSubjectPro from '@/views/professor/components/AddSubjectPro.vue';
import UpdateNoticePro from '@/views/professor/components/UpdateNoticePro.vue';
import UpdateSubjectPro from '@/views/professor/components/UpdateSubjectPro.vue';
import WriteRefPro from '@/views/professor/components/WriteRefPro.vue';
import UpdateRefPro from '@/views/professor/components/UpdateRefPro.vue';
import RefViewPro from '@/views/professor/components/RefViewPro.vue';

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
          component: HomeViewStu
        },
        {
          path: 'class',
          component: ClassViewStu
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
          path: 'reference/:id',
          component:RefViewStu,
          props:true
        },
        {
          path: 'coursedesc',
          component: CourseDescViewStu,
          props: true
        },
        {
          path: 'score',
          component: ScoreViewStu
        },
        {
          path: 'registration',
          component: RegistrationViewStu
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
          component: HomeViewPro
        },
        {
          path: 'class',
          component: ClassViewPro
        },
        {
          path: 'notice/:id',
          component: NoticeViewPro,
          props: true
        },
        {
          path: 'subject/:id',
          component: SubjectViewPro,
          props: true
        },
        {
          path: 'reference/:id',
          component: RefViewPro,
          props: true
        },
        {
          path: 'coursedesc/:id',
          component: CourseDescViewPro,
          props: true
        },
        {
          path: 'writenotice/:id',
          component: WriteNoticePro,
          props: true
        },
        {
          path: 'updatenotice/:classId/:id',
          component: UpdateNoticePro,
          props: true
        },
        {
          path: 'addsubject/:id',
          component: AddSubjectPro,
          props: true
        },
        {
          path: 'updatesubject/:classId/:id',
          component: UpdateSubjectPro,
          props: true
        },
        {
          path: 'writeref/:id',
          component: WriteRefPro,
          props: true
        },
        {
          path: 'updateref/:classId/:id',
          component: UpdateRefPro,
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
