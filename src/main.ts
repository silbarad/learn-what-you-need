import Vue from 'vue';
import {
  LayoutPlugin,
  ModalPlugin,
  FormInputPlugin,
  FormGroupPlugin,
  FormCheckboxPlugin,
  SpinnerPlugin,
  AlertPlugin,
  JumbotronPlugin,
  NavbarPlugin,
  ButtonPlugin,
} from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import store from './stores';
import App from './App.vue';
import router from './router';

// Bootstrap plugins
Vue.use(LayoutPlugin);
Vue.use(ModalPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(SpinnerPlugin);
Vue.use(AlertPlugin);
Vue.use(JumbotronPlugin);
Vue.use(NavbarPlugin);
Vue.use(ButtonPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
