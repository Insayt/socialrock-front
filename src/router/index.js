import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth';
import Project from '../views/Project';
import Calendar from '../views/Calendar';
import Analytics from '../views/Analytics';
import Settings from '../views/Settings';

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
      component: Project,
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

      ]
    },
    // {
    //   path: '*',
    //   redirect: '/auth'
    // }
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
