import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../views/Calendar';
import Analytics from '../views/Analytics';
import Settings from '../views/Settings';

Vue.use(VueRouter)

const routes = [
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: Analytics
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
});

export default router
