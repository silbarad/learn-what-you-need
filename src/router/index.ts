import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/modules/Home/Index.vue';
import store from '@/stores/index';
import NavigationStore from '@/stores/NavigationStore';
import RoleName from '@/helpers/RoleName';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      authorize: [RoleName.User],
    },
  },
  {
    path: '/desk/:url',
    name: 'Desk',
    component: () => import(/* webpackChunkName: "desk" */ '@/modules/Desk/Desk.vue'),
    meta: {
      authorize: [RoleName.User],
    },
  },
  {
    path: '/desk/:url/edit',
    name: 'DeskEdit',
    component: () => import(/* webpackChunkName: "desk-edit" */ '@/modules/DeskEdit/DeskEdit.vue'),
    meta: {
      authorize: [RoleName.User],
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "accountsLogin" */ '@/modules/Login/Index.vue'),
    meta: {
      title: 'Login',
      authorize: [],
    },
  },
  // otherwise redirect to home
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const navigationStore = getModule(NavigationStore, store);
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta as { authorize?: string[] };

  if (!(!authorize || authorize.length === 0)) {
    if (!navigationStore.getIsAuthorized) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login?', query: { returnUrl: to.path } });
    }
  }
  const metaTitle = to.meta.title;
  document.title = metaTitle
    ? `Learn what you need - Portal - ${metaTitle}`
    : 'Learn what you need - Portal';
  return next();
});

export default router;
