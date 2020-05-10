import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import RoleName from '@/helpers/RoleName';
import firebaseService from '@/services/firebaseService';
import Home from '@/views/Home.vue';

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
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "accountsLogin" */ '@/views/Login.vue'),
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
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta as { authorize?: string[] };
  const currentUserName = firebaseService.userInfo?.email ?? '';

  if (!(!authorize || authorize.length === 0)) {
    if (!currentUserName) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login?', query: { returnUrl: to.path } });
    }
  }
  const metaTitle = to.meta.title;
  document.title = metaTitle ? `Learn what you need - Portal - ${metaTitle}` : 'Learn what you need - Portal';
  return next();
});


export default router;
