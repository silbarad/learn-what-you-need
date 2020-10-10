import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/modules/Home/Index.vue';
import HomeProps from 'src/modules/Home/types/HomeProps';
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
} from 'bootstrap-vue';

// create an extended `Vue` constructor
const localVue = createLocalVue();

// Bootstrap plugins
localVue.use(LayoutPlugin);
localVue.use(ModalPlugin);
localVue.use(FormInputPlugin);
localVue.use(FormGroupPlugin);
localVue.use(FormCheckboxPlugin);
localVue.use(SpinnerPlugin);
localVue.use(AlertPlugin);
localVue.use(JumbotronPlugin);
localVue.use(NavbarPlugin);

describe('modules/Home/Index.vue', () => {
  it('Check userName is empty', () => {
    const wrapper = shallowMount(Home, {
      localVue,
    });
    const home = (wrapper.vm as unknown) as HomeProps;
    expect(home.userName).toEqual('');
  });
});
