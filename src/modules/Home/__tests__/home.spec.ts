import { NavigationStoreInterface } from '@/types/NavigationStoreInterface';
import Home from '@/modules/Home/Index.vue';
import factory from './__factory';
import FirebaseMock from '@/services/__tests__/firebase.mock';
import HomeProps from '../types/HomeProps';

const firebaseMock = new FirebaseMock();

const createComponent = () => {
  const component = factory(Home, firebaseMock);
  return component;
};

describe('modules/Home/Index.vue', () => {
  it('Check is not authorized on start', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = (wrap.vm as any) as HomeProps;
    const ds = vm.ds;
    await (wrap.vm as any).$nextTick();

    expect(wrap.vm).toBeInstanceOf(Object);
    expect(ds?.getIsAuthorized).toBeFalsy();
    expect(vm.userName).toBe('');
  });
  it('Check is authorized after login', async () => {
    const userName = 'Test 123';
    const wrap = createComponent();
    const vm = (wrap.vm as any) as HomeProps;
    const ds = vm.ds;
    if (ds) {
      ds.userChange({ userName: userName, userRoles: ['User'] });
    }
    await (wrap.vm as any).$nextTick();
    expect(ds?.getIsAuthorized).toBeTruthy();
    expect(vm.userName).toBe(userName);
  });
});
