import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import { provideVuex, provide } from 'provide-consume-decorator';
import { Component, Vue } from 'vue-property-decorator';
import { mount, VueClass } from '@vue/test-utils';
import NavigationStore from '@/stores/NavigationStore';
import FirebaseMock from '@/services/__tests__/firebase.mock';
import VueInitializer from '@/../tests/unit/VueInitializer';

const vi = new VueInitializer();

const $router = {
  push: jest.fn(),
};

export default (VueComponent: VueClass<Vue>, firebaseMock: FirebaseMock) => {
  // store mock
  @provideVuex({
    firebase: () => firebaseMock,
  })
  class NavigationStoreMock extends NavigationStore {}

  // we also provide `navigationStore` to components
  @Component
  @provide({
    navigationStore() {
      return getModule(NavigationStoreMock, this.$store);
    },
  })
  class VueComponentMock extends VueComponent {}

  const localVue = vi.getNewLocalVue();
  const store = new Vuex.Store({
    modules: {
      navigationStore: NavigationStoreMock,
    },
  });

  return mount(VueComponentMock, {
    store,
    localVue,
    mocks: {
      $router,
    },
  });
};
