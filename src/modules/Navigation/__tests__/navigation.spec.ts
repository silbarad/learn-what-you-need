import Navigation from '@/modules/Navigation/Index.vue';
import FirebaseMock from '@/services/__tests__/firebase.mock';
import NavigationStore from '@/stores/NavigationStore';
import factory from './__factory';

const firebaseMock = new FirebaseMock();

const createComponent = () => {
  const component = factory(Navigation, firebaseMock);
  return component;
};

describe('modules/Navigation/Index.vue', () => {
  it('Check is not authorized on start', () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = wrap.vm as any;
    const ds = vm.ds as NavigationStore;

    expect(wrap.vm).toBeInstanceOf(Object);
    expect(ds.getIsAuthorized).toBeFalsy();
  });
  it('Check is authorized after login', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = wrap.vm as any;
    const ds = vm.ds as NavigationStore;
    ds.login({ email: '', password: '' });

    expect(ds.getIsAuthorized).toBeTruthy();
  });
  it('Check is not authorized after logout', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = wrap.vm as any;
    const ds = vm.ds as NavigationStore;
    ds.login({ email: '', password: '' });
    await vm.$nextTick();
    vm.logout();
    await vm.$nextTick();
    expect(ds.getIsAuthorized).toBeFalsy();
  });
});
