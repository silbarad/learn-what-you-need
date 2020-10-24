import { NavigationStoreInterface } from '../../../../types/NavigationStoreInterface';
import Navigation from '../../Index.vue';
import factory from './__factory';
import FirebaseMock from './FirebaseMock';

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
    const ds = vm.ds as NavigationStoreInterface;

    expect(wrap.vm).toBeInstanceOf(Object);
    expect(ds.getIsAuthorized).toBeFalsy();
  });
  it('Check is authorized after login', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = wrap.vm as any;
    const ds = vm.ds as NavigationStoreInterface;
    ds.login({ email: '', password: '' });

    expect(ds.getIsAuthorized).toBeTruthy();
  });
  it('Check is not authorized after logout', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = wrap.vm as any;
    const ds = vm.ds as NavigationStoreInterface;
    ds.login({ email: '', password: '' });
    await vm.$nextTick();
    vm.logout();
    await vm.$nextTick();
    expect(ds.getIsAuthorized).toBeFalsy();
  });
});
