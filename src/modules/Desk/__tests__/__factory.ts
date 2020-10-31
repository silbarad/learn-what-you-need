import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import { provideVuex, provide } from 'provide-consume-decorator';
import { Component, Vue } from 'vue-property-decorator';
import { mount, VueClass } from '@vue/test-utils';

import FilestoreStore from '@/stores/FilestoreStore';
import { FilestoreMock } from '@/services/__tests__';
import VueInitializer from '@/../tests/unit/VueInitializer';

const vi = new VueInitializer();

const $router = {
  push: jest.fn(),
};
const $route = {
  params: {
    url: 'test',
  },
};

export default (VueComponent: VueClass<Vue>, filestoreMock: FilestoreMock) => {
  // store mock
  @provideVuex({
    filestore: () => filestoreMock,
  })
  class FilestoreStoreMock extends FilestoreStore {}

  // we also provide `navigationStore` to components
  @Component
  @provide({
    filestoreStore() {
      return getModule(FilestoreStoreMock, this.$store);
    },
  })
  class VueComponentMock extends VueComponent {}

  const localVue = vi.getNewLocalVue();

  const store = new Vuex.Store({
    modules: {
      filestoreStore: FilestoreStoreMock,
    },
  });

  return mount(VueComponentMock, {
    store,
    localVue,
    mocks: {
      $router,
      $route,
    },
  });
};
