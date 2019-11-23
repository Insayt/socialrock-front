import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth';
import ProjectWrapper from '../views/ProjectWrapper';
import Calendar from '../views/Calendar';
import Analytics from '../views/Analytics';
import Settings from '../views/Settings';
import Projects from '../views/Projects';

import store from '../store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/p/:projectId',
      name: 'project',
      component: ProjectWrapper,
      children: [
        {
          path: 'calendar',
          name: 'calendar',
          component: Calendar,
          meta: {
            protected: true,
          },
        },
        {
          path: 'analytics',
          name: 'analytics',
          component: Analytics,
          meta: {
            protected: true,
          }
        },
        {
          path: 'editor',
          name: 'editor',
          component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
          meta: {
            protected: true,
          }
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
          meta: {
            protected: true,
          }
        },
        {
          path: 'projects',
          name: 'projects',
          component: Projects,
          meta: {
            protected: true,
          },
        },
      ]
    },
    {
      path: '*',
      redirect: '/auth'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.protected) {
    store.commit('user/setLoading', true);
    store.dispatch('user/current').then(user => {
      store.commit('user/setLoading', false);
      if (user) {
        next();
      } else {
        next('/auth');
      }
    }).catch(() => {
      next('/auth');
    })
  } else {
    next();
  }
});

export default router
