import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import {
  LayoutPlugin,
  ButtonPlugin,
  ModalPlugin,
  FormInputPlugin,
  FormGroupPlugin,
  FormCheckboxPlugin,
  SpinnerPlugin,
  AlertPlugin,
  JumbotronPlugin,
  NavbarPlugin,
} from 'bootstrap-vue';

export default class VueInitializer {
  getNewLocalVue() {
    const localVue = createLocalVue();

    // Bootstrap plugins
    localVue.use(LayoutPlugin);
    localVue.use(ButtonPlugin);
    localVue.use(ModalPlugin);
    localVue.use(FormInputPlugin);
    localVue.use(FormGroupPlugin);
    localVue.use(FormCheckboxPlugin);
    localVue.use(SpinnerPlugin);
    localVue.use(AlertPlugin);
    localVue.use(JumbotronPlugin);
    localVue.use(NavbarPlugin);
    localVue.use(NavbarPlugin);
    localVue.use(Vuex);
    return localVue;
  }
}
